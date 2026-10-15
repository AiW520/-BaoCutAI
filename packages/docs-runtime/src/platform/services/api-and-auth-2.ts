/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  FrameOfflineError,
  inFrame,
  literal,
  number,
  preloadModule,
  createLiveModuleNamespace,
  strictObject,
  string,
} from "../dependencies";
import {
  TELEMETRY_ATTRIBUTE_NAMES,
  routePattern,
  withWebSpan,
} from "../observability/telemetry-1";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  lazyZod,
} from "../data/lazy-zod";
import {
  resolvePlatformSessionAndSourcesDisplayName,
  resolvePlatformSessionAndSourcesUsers,
  unconfirmedWaitOf,
  withBusyRetry,
} from "./session-and-sources-1";
import {
  loadPlatformSessionAndSourcesFrameVersionTable,
  platformSessionAndSourcesVerdictSchema,
  resolvePlatformSessionAndSourcesResults,
  resolvePlatformSessionAndSourcesUnavailable,
  zBatchAck,
} from "./session-and-sources-2";
import {
  EditorExtensionsFrameSendError,
  editorExtensionsSet15,
} from "../../prose-editor/platform/extensions-3";
import {
  createPagesLinkReconnectEvent,
} from "../observability/browser-and-operation-events-1";
import {
  resolveObservabilityBrowserAndOperationEventsSome,
} from "../observability/browser-and-operation-events-2";
import {
  frameDoor,
  liveSupportCode,
} from "../observability/browser-and-operation-events-3";
import {
  PlatformApiAndAuthBONGOAPIBASE,
  PlatformApiAndAuthBONGOWSBASE,
} from "../observability/browser-and-operation-events-4";
import {
  api,
  correlationHeaders,
  emitAction,
  resolvePlatformApiAndAuthPathOverride,
  resolvePlatformApiAndAuthValue,
  sessionId,
  updatePlatformApiAndAuthPath,
} from "./api-and-auth-1";
import {
  PlatformApiAndAuthTOMBSTONE,
} from "./api-and-auth-4";
import {
  PlatformApiAndAuthMUTATORS,
} from "./api-and-auth-6";

function recordActivity(
  recordActivity2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  let container: Dynamic = resolvePlatformApiAndAuthPathOverride().match(
    /^\/?((?:projects|skills|users)\/[^/]+)/,
  )?.[1];
  emitAction(`ui:${recordActivity2}`, {
    container: container,
    params: {
      url: updatePlatformApiAndAuthPath(),
      ...options,
    },
  });
}

var PlatformApiAndAuthState3: Storage | undefined;

var PlatformApiAndAuthActive: Dynamic;

var PlatformApiAndAuthState4: boolean;

var resolvePlatformApiAndAuthValue3: Dynamic;

var platformApiAndAuthState3: Dynamic;

var platformApiAndAuthValue0: number;

var platformApiAndAuthState4: Dynamic;

var PlatformApiAndAuthClosed: Dynamic;

var platformApiAndAuthValue500: number;

var platformApiAndAuthValue8: number;

var platformApiAndAuthValue100: number;

var platformApiAndAuthValue250: number;

var platformApiAndAuthValue02: number;

var platformApiAndAuthValue5000: number;

var platformApiAndAuthValue2000: number;

var platformApiAndAuthValue03: number;

var resolvePlatformApiAndAuthHidden: Dynamic;

var resolvePlatformApiAndAuthIsFinite: Dynamic;

var PlatformApiAndAuthState5: Dynamic;

var PlatformApiAndAuthState6: Dynamic;

var platformApiAndAuthValue15000: number;

var platformApiAndAuthState5: Dynamic;

var platformApiAndAuthValue04: Dynamic;

var platformApiAndAuthValue05: Dynamic;

var platformApiAndAuthValue10: number;

var platformApiAndAuthValue06: Dynamic;

var platformApiAndAuthValue07: Dynamic;

var platformApiAndAuthValue08: number;

var platformApiAndAuthMap3: Dynamic;

var platformApiAndAuthMap4: Dynamic;

function getPlatformApiAndAuthEmit(
  platformApiAndAuthEmit?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let getPlatformApiAndAuthEmitResult of (platformApiAndAuthMap4.get(
    platformApiAndAuthEmit,
  ) ?? []) as Dynamic)
    getPlatformApiAndAuthEmitResult.emit(options, context);
}

var platformApiAndAuthSet2: Dynamic;

var platformApiAndAuthValues2: Dynamic;

var platformApiAndAuthMap5: Dynamic;

var platformApiAndAuthValue1: number;

var platformApiAndAuthTextEncoder: TextEncoder;

var platformApiAndAuthTextDecoder: TextDecoder;

var PlatformApiAndAuthBongoWslinkLog: string;

var platformApiAndAuthValue50: number;

var platformApiAndAuthSet3: Dynamic;

function clearPlatformApiAndAuthDelete(
  clearPlatformApiAndAuthDelete5?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformApiAndAuthSet3.add(clearPlatformApiAndAuthDelete5);
  return (..._extraArguments: unknown[]): undefined =>
    void platformApiAndAuthSet3.delete(clearPlatformApiAndAuthDelete5);
}

function resolvePlatformApiAndAuthGetItem(
  platformApiAndAuthGetItem?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolvePlatformApiAndAuthGetItemResult of platformApiAndAuthSet3 as Dynamic)
    try {
      resolvePlatformApiAndAuthGetItemResult(platformApiAndAuthGetItem);
    } catch {}
  if (!(typeof localStorage === "undefined"))
    try {
      let parse: Dynamic = JSON.parse(
        localStorage.getItem(PlatformApiAndAuthBongoWslinkLog) ?? `[]`,
      );
      parse.push(platformApiAndAuthGetItem);
      if (parse.length > platformApiAndAuthValue50) {
        parse.splice(0, parse.length - platformApiAndAuthValue50);
      }
      localStorage.setItem(
        PlatformApiAndAuthBongoWslinkLog,
        JSON.stringify(parse),
      );
    } catch {}
}

var resolvePlatformApiAndAuthValue4: (platformApiAndAuthValue42?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var platformApiAndAuthValue4: number;

var platformApiAndAuthValue_1: boolean;

async function loadPlatformApiAndAuthMethod(
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (platformApiAndAuthValue_1 || typeof document === "undefined") return;
  platformApiAndAuthValue_1 = true;
  let enabled = false;
  try {
    let response = await fetch(`/`, {
      method: `GET`,
      redirect: `manual`,
      headers: {
        "X-Requested-With": `XMLHttpRequest`,
      },
      cache: `no-store`,
    });
    enabled = response.status === 401 || response.type === `opaqueredirect`;
  } catch {
    platformApiAndAuthValue_1 = false;
    return;
  }
  console.warn(`[wsLink] IAP probe: expired=${enabled}`);
  resolvePlatformApiAndAuthGetItem({
    t: Date.now(),
    ev: `close`,
    code: enabled ? 401 : 200,
    clean: true,
    attempt: platformApiAndAuthValue0,
    online: true,
  });
  withWebSpan(
    `mux.iap_probe`,
    {
      [TELEMETRY_ATTRIBUTE_NAMES.wsAttempt]: platformApiAndAuthValue0,
      [TELEMETRY_ATTRIBUTE_NAMES.netOnline]: true,
      [TELEMETRY_ATTRIBUTE_NAMES.wsCloseCode]: enabled ? 401 : 200,
    },
    (..._extraArguments: unknown[]): undefined => {},
    `mux.iap_probe`,
  );
  if (!enabled) return;
  let element = document.createElement(`iframe`);
  element.style.display = `none`;
  element.src = `${location.origin}/?gcp-iap-mode=DO_SESSION_REFRESH`;
  let remove = (..._extraArguments: unknown[]): undefined => {
    element.remove();
    platformApiAndAuthValue_1 = false;
    resolvePlatformApiAndAuthOPEN2();
  };
  element.addEventListener(`load`, remove, {
    once: true,
  });
  document.body.appendChild(element);
  setTimeout(
    (..._extraArguments: unknown[]) => element.isConnected && remove(),
    1e4,
  );
}

function resolvePlatformApiAndAuthUid(..._extraArguments: unknown[]) {
  let location2 = typeof location !== "undefined" ? location : undefined;
  let label = location2?.protocol === `https:` ? `wss` : `ws`;
  let active: Dynamic = PlatformApiAndAuthActive.getState().active;
  let query = new URLSearchParams({
    uid: sessionId,
    sc: liveSupportCode(),
    ...(active && {
      u: active,
    }),
  });
  return `${label}://${location2?.host ?? `localhost`}${PlatformApiAndAuthBONGOWSBASE}/api/mux?${query}`;
}

function resolvePlatformApiAndAuthOPEN(
  platformApiAndAuthOPEN?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthState3?.readyState === WebSocket.OPEN) {
    platformApiAndAuthState3.send(platformApiAndAuthOPEN);
  } else {
    platformApiAndAuthValues2.push(platformApiAndAuthOPEN);
  }
}

function updatePlatformApiAndAuthEncode(
  updatePlatformApiAndAuthEncode2?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let encode = platformApiAndAuthTextEncoder.encode(
    updatePlatformApiAndAuthEncode2,
  );
  let uint8Array: Dynamic = new Uint8Array(2 + encode.length + items.length);
  uint8Array[0] = encode.length & 255;
  uint8Array[1] = (encode.length >> 8) & 255;
  uint8Array.set(encode, 2);
  uint8Array.set(items, 2 + encode.length);
  return uint8Array;
}

function clearPlatformApiAndAuthCode(
  code?: Dynamic,
  clean?: Dynamic,
  reason: Dynamic = ``,
  ..._extraArguments: unknown[]
): undefined {
  let lifeMs = platformApiAndAuthValue08
    ? Date.now() - platformApiAndAuthValue08
    : 0;
  platformApiAndAuthValue08 = 0;
  let online =
    typeof navigator !== "undefined" ? (navigator.onLine ?? true) : true;
  let matchesCode =
    code === 1006 && !clean && lifeMs < platformApiAndAuthValue500 && online;
  console.warn(
    `[wsLink] close code=${code} clean=${clean} attempt=${platformApiAndAuthValue0} lifeMs=${lifeMs} online=${online} fast=${platformApiAndAuthValue02} drain=${reason === `draining`}`,
  );
  resolvePlatformApiAndAuthGetItem({
    t: Date.now(),
    ev: `close`,
    code: code,
    clean: clean,
    attempt: platformApiAndAuthValue0,
    lifeMs: lifeMs,
    online: online,
  });
  emitTelemetryEvent(
    createPagesLinkReconnectEvent({
      code: code,
      clean: clean,
      refused:
        matchesCode && platformApiAndAuthValue02 < platformApiAndAuthValue8,
      attempt: platformApiAndAuthValue0,
    }),
  );
  if (!(clean && (code === 1001 || code === 1012))) {
    withWebSpan(
      `mux.ws_close`,
      {
        [TELEMETRY_ATTRIBUTE_NAMES.wsCloseCode]: code,
        [TELEMETRY_ATTRIBUTE_NAMES.wsCloseClean]: clean,
        [TELEMETRY_ATTRIBUTE_NAMES.wsAttempt]: platformApiAndAuthValue0,
        [TELEMETRY_ATTRIBUTE_NAMES.wsLifeMs]: lifeMs,
        [TELEMETRY_ATTRIBUTE_NAMES.netOnline]: online,
      },
      (..._extraArguments: unknown[]): undefined => {},
      `mux.ws_close`,
    );
  }
  platformApiAndAuthState3 = undefined;
  platformApiAndAuthState5 &&=
    (clearInterval(platformApiAndAuthState5), undefined);
  for (let clearPlatformApiAndAuthCodeResult2 of platformApiAndAuthMap4.values() as Dynamic)
    for (let clearPlatformApiAndAuthCodeResult3 of clearPlatformApiAndAuthCodeResult2 as Dynamic)
      clearPlatformApiAndAuthCodeResult3.emit(`close`, {
        code: code,
        wasClean: clean,
        reason: reason,
      });
  platformApiAndAuthMap4.clear();
  platformApiAndAuthValues2.length = 0;
  for (let [
    clearPlatformApiAndAuthCodeResult2,
    clearPlatformApiAndAuthCodeResult3,
  ] of platformApiAndAuthMap5 as Dynamic)
    if (clearPlatformApiAndAuthCodeResult3.sent) {
      platformApiAndAuthMap5.delete(clearPlatformApiAndAuthCodeResult2);
      clearPlatformApiAndAuthCodeResult3.reject(Error(`mux closed mid-call`));
    } else {
      platformApiAndAuthValues2.push(clearPlatformApiAndAuthCodeResult3.frame);
    }
  if (
    platformApiAndAuthMap3.size === 0 &&
    platformApiAndAuthMap4.size === 0 &&
    platformApiAndAuthMap5.size === 0
  ) {
    resolvePlatformApiAndAuthValue4(`closed`);
    return;
  }
  let clearPlatformApiAndAuthCodeResult: Dynamic;
  if (matchesCode && platformApiAndAuthValue02 < platformApiAndAuthValue8) {
    platformApiAndAuthValue02++;
    clearPlatformApiAndAuthCodeResult =
      platformApiAndAuthValue100 +
      Math.random() * (platformApiAndAuthValue250 - platformApiAndAuthValue100);
  } else {
    let amount = resolvePlatformApiAndAuthHidden()
      ? platformApiAndAuthValue5000 / 1.5
      : 3e4;
    clearPlatformApiAndAuthCodeResult =
      Math.min(250 * 2 ** platformApiAndAuthValue0++, amount) *
      (0.5 + Math.random());
    if (
      lifeMs === 0 &&
      online &&
      platformApiAndAuthValue0 === platformApiAndAuthValue4
    ) {
      loadPlatformApiAndAuthMethod();
    }
  }
  resolvePlatformApiAndAuthValue4(`reconnecting`);
  platformApiAndAuthState4 = setTimeout(
    clearPlatformApiAndAuthAttempt,
    clearPlatformApiAndAuthCodeResult,
  );
}

function resolvePlatformApiAndAuthValue5(
  platformApiAndAuthValue52?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformApiAndAuthState32: Dynamic = platformApiAndAuthState3;
  clearPlatformApiAndAuthCode(platformApiAndAuthValue52, false);
  try {
    platformApiAndAuthState32?.close(platformApiAndAuthValue52, options);
  } catch {}
}

function resolvePlatformApiAndAuthValue6(
  platformApiAndAuthValue6?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthState3) {
    resolvePlatformApiAndAuthValue5(4002, platformApiAndAuthValue6);
  }
}

function clearPlatformApiAndAuthAttempt(
  ..._extraArguments: unknown[]
): undefined {
  platformApiAndAuthState4 = undefined;
  resolvePlatformApiAndAuthValue4(
    platformApiAndAuthValue0 === 0 && platformApiAndAuthValue02 === 0
      ? `connecting`
      : `reconnecting`,
  );
  platformApiAndAuthValue03 = Date.now();
  let webSocket: Dynamic = new (WebSocket as Dynamic)(
    resolvePlatformApiAndAuthUid(),
  );
  platformApiAndAuthState3 = webSocket;
  webSocket.binaryType = `arraybuffer`;
  let setTimeout2 = setTimeout((..._extraArguments: unknown[]): undefined => {
    if (platformApiAndAuthState3 === webSocket && webSocket.readyState === 0) {
      resolvePlatformApiAndAuthValue5(4001, `connect-timeout`);
    }
  }, platformApiAndAuthValue15000);
  webSocket.addEventListener(
    `open`,
    (..._extraArguments: unknown[]): undefined => {
      clearTimeout(setTimeout2);
      if (platformApiAndAuthState3 === webSocket) {
        resolvePlatformApiAndAuthValue4(`open`);
        platformApiAndAuthValue06 = Date.now();
        platformApiAndAuthValue08 = Date.now();
        platformApiAndAuthValue05 = 0;
        platformApiAndAuthValue04 = 0;
        resolvePlatformApiAndAuthGetItem({
          t: platformApiAndAuthValue08,
          ev: `open`,
          attempt: platformApiAndAuthValue0,
          online:
            typeof navigator !== "undefined"
              ? (navigator.onLine ?? true)
              : true,
        });
        for (let topic of platformApiAndAuthMap3.keys() as Dynamic)
          webSocket.send(
            JSON.stringify({
              op: `sub`,
              topic: topic,
            }),
          );
        for (let clearPlatformApiAndAuthAttemptResult of platformApiAndAuthValues2.splice(
          0,
        ) as Dynamic)
          webSocket.send(clearPlatformApiAndAuthAttemptResult);
        for (let clearPlatformApiAndAuthAttemptResult of platformApiAndAuthMap5.values() as Dynamic)
          clearPlatformApiAndAuthAttemptResult.sent = true;
        if (platformApiAndAuthState5) {
          clearInterval(platformApiAndAuthState5);
        }
        platformApiAndAuthState5 = setInterval(
          (..._extraArguments: unknown[]): undefined => {
            if (
              platformApiAndAuthState3 !== webSocket ||
              webSocket.readyState !== WebSocket.OPEN
            )
              return;
            let lifeMs = Date.now() - platformApiAndAuthValue06;
            if (lifeMs > PlatformApiAndAuthState6) {
              let bufferedAmount: Dynamic = webSocket.bufferedAmount;
              platformApiAndAuthValue05 =
                bufferedAmount === 0 ||
                bufferedAmount < platformApiAndAuthValue04
                  ? 0
                  : platformApiAndAuthValue05 + 1;
              let matchesBufferedAmount =
                (bufferedAmount > 0 &&
                  platformApiAndAuthValue05 < platformApiAndAuthValue10) ||
                (bufferedAmount === 0 && platformApiAndAuthValue04 > 0);
              platformApiAndAuthValue04 = bufferedAmount;
              if (
                (typeof document !== "undefined" &&
                  document.visibilityState === `hidden`) ||
                Date.now() < platformApiAndAuthValue07 ||
                matchesBufferedAmount
              ) {
                webSocket.send(`{"op":"ping"}`);
                return;
              }
              withWebSpan(
                `mux.heartbeat_dead`,
                {
                  [TELEMETRY_ATTRIBUTE_NAMES.roomLastMsgAgoMs]: lifeMs,
                  [TELEMETRY_ATTRIBUTE_NAMES.wsAttempt]:
                    platformApiAndAuthValue0,
                },
                (..._extraArguments: unknown[]): undefined => {},
                `mux.heartbeat_dead`,
              );
              resolvePlatformApiAndAuthGetItem({
                t: Date.now(),
                ev: `hbdead`,
                attempt: platformApiAndAuthValue0,
                lifeMs: lifeMs,
                online:
                  typeof navigator !== "undefined"
                    ? (navigator.onLine ?? true)
                    : true,
              });
              resolvePlatformApiAndAuthValue5(4e3, `heartbeat-dead`);
              return;
            }
            webSocket.send(`{"op":"ping"}`);
          },
          PlatformApiAndAuthState5,
        );
      }
    },
  );
  webSocket.addEventListener(
    `message`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (platformApiAndAuthState3 !== webSocket) return;
      platformApiAndAuthValue0 = 0;
      platformApiAndAuthValue02 = 0;
      platformApiAndAuthValue_1 = false;
      platformApiAndAuthValue06 = Date.now();
      if (typeof event.data != `string`) {
        let uint8Array: Dynamic = new Uint8Array(event.data);
        if (uint8Array.length < 2) return;
        let amount = uint8Array[0] | (uint8Array[1] << 8);
        getPlatformApiAndAuthEmit(
          platformApiAndAuthTextDecoder.decode(
            uint8Array.subarray(2, 2 + amount),
          ),
          `message`,
          {
            data: uint8Array.buffer.slice(
              uint8Array.byteOffset + 2 + amount,
              uint8Array.byteOffset + uint8Array.byteLength,
            ),
          },
        );
        return;
      }
      let error: Dynamic;
      try {
        error = JSON.parse(event.data);
      } catch {
        return;
      }
      if (error.op === `doorack`) {
        let error2: Dynamic = error;
        if (typeof error2.rid == `number`) {
          let platformApiAndAuthMap5Entry: Dynamic = platformApiAndAuthMap5.get(
            error2.rid,
          );
          if (platformApiAndAuthMap5Entry) {
            platformApiAndAuthMap5.delete(error2.rid);
            platformApiAndAuthMap5Entry.resolve({
              status: typeof error2.status == `number` ? error2.status : 200,
              body: typeof error2.body == `string` ? error2.body : ``,
            });
          }
        }
        return;
      }
      if (error.topic) {
        if (error.op === `msg`) {
          let platformApiAndAuthMap3Entry: Dynamic = platformApiAndAuthMap3.get(
            error.topic,
          );
          if (platformApiAndAuthMap3Entry)
            for (let clearPlatformApiAndAuthAttemptResult of platformApiAndAuthMap3Entry as Dynamic)
              clearPlatformApiAndAuthAttemptResult(error.data);
          getPlatformApiAndAuthEmit(error.topic, `message`, {
            data: String(error.data),
          });
        } else if (error.op === `ack`)
          getPlatformApiAndAuthEmit(error.topic, `open`);
        else if (error.op === `err`) {
          console.warn(`[wsLink] sub rejected`, error.topic, error.error);
          platformApiAndAuthMap3.delete(error.topic);
          let code: Dynamic =
            typeof error.code == `number` ? error.code : undefined;
          let retryMs: Dynamic = error.retryMs;
          let retryMs2 =
            typeof retryMs == `number` &&
            Number.isFinite(retryMs) &&
            retryMs >= 0
              ? retryMs
              : undefined;
          getPlatformApiAndAuthEmit(
            error.topic,
            `close`,
            code !== undefined || retryMs2 !== undefined
              ? {
                  ...(code !== undefined && {
                    code: code,
                  }),
                  ...(retryMs2 !== undefined && {
                    retryMs: retryMs2,
                  }),
                }
              : undefined,
          );
          platformApiAndAuthMap4.delete(error.topic);
        }
      }
    },
  );
  webSocket.addEventListener(
    `close`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (platformApiAndAuthState3 !== webSocket) return;
      let event2: Dynamic = event;
      clearPlatformApiAndAuthCode(
        event2?.code ?? 0,
        event2?.wasClean ?? false,
        typeof event2?.reason == `string` ? event2.reason : ``,
      );
    },
  );
  webSocket.addEventListener(
    `error`,
    (..._extraArguments: unknown[]): undefined => {
      if (platformApiAndAuthState3 === webSocket)
        try {
          webSocket.close();
        } catch {}
    },
  );
}

function resolvePlatformApiAndAuthValue7(
  ..._extraArguments: unknown[]
): undefined {
  if (!inFrame()) {
    if (!platformApiAndAuthState3 && !platformApiAndAuthState4) {
      clearPlatformApiAndAuthAttempt();
    }
  }
}

function resolvePlatformApiAndAuthOPEN2(
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthState4 && !platformApiAndAuthState3) {
    clearTimeout(platformApiAndAuthState4);
    platformApiAndAuthState4 = undefined;
    clearPlatformApiAndAuthAttempt();
  } else {
    if (platformApiAndAuthState3?.readyState === WebSocket.OPEN) {
      platformApiAndAuthValue07 = Date.now() + PlatformApiAndAuthState5;
      platformApiAndAuthState3.send(`{"op":"ping"}`);
    }
  }
}

function resolvePlatformApiAndAuthValue8(
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      !platformApiAndAuthState4 ||
      platformApiAndAuthState3 ||
      Date.now() - platformApiAndAuthValue03 < platformApiAndAuthValue2000
    )
  ) {
    resolvePlatformApiAndAuthOPEN2();
  }
}

function resolvePlatformApiAndAuthState5(
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    state: PlatformApiAndAuthClosed,
    attempt: platformApiAndAuthValue0,
    fastRetries: platformApiAndAuthValue02,
    lastRecvAgoMs: platformApiAndAuthValue06
      ? Date.now() - platformApiAndAuthValue06
      : -1,
    readyState: platformApiAndAuthState3?.readyState ?? -1,
    online:
      typeof navigator !== "undefined" ? (navigator.onLine ?? true) : true,
    pending: platformApiAndAuthMap5.size,
  };
}

function updatePlatformApiAndAuthTopic(
  topic?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthMap3Entry: Dynamic = platformApiAndAuthMap3.get(topic);
  if (!platformApiAndAuthMap3Entry) {
    platformApiAndAuthMap3.set(
      topic,
      (platformApiAndAuthMap3Entry = new (Set as Dynamic)()),
    );
    resolvePlatformApiAndAuthOPEN(
      JSON.stringify({
        op: `sub`,
        topic: topic,
      }),
    );
  }
  platformApiAndAuthMap3Entry.add(options);
  resolvePlatformApiAndAuthValue7();
  return (..._extraArguments: unknown[]): undefined => {
    platformApiAndAuthMap3Entry.delete(options);
    if (platformApiAndAuthMap3Entry.size === 0) {
      platformApiAndAuthMap3.delete(topic);
      resolvePlatformApiAndAuthOPEN(
        JSON.stringify({
          op: `unsub`,
          topic: topic,
        }),
      );
    }
  };
}

function resolvePlatformApiAndAuthTopic(
  topic?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthState3?.readyState === WebSocket.OPEN) {
    platformApiAndAuthState3.send(
      JSON.stringify({
        op: `msg`,
        topic: topic,
        data: options,
      }),
    );
  }
}

var PlatformApiAndAuthStyles: string;

function updatePlatformApiAndAuthResolve(
  updatePlatformApiAndAuthResolve2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = `one`,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dependencies?.aborted === true)
    return Promise.reject(Error(`mux withdrawn`));
  let updatePlatformApiAndAuthResolveResult: number =
    platformApiAndAuthValue1++;
  let frame: Dynamic = updatePlatformApiAndAuthEncode(
    `${PlatformApiAndAuthStyles}${updatePlatformApiAndAuthResolveResult}:${context === `batch` ? `b` : `o`}:${updatePlatformApiAndAuthResolve2}`,
    platformApiAndAuthTextEncoder.encode(options),
  );
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let frameCount: Dynamic = frame.length;
      let updatePlatformApiAndAuthResolveResult2: Dynamic;
      let updatePlatformApiAndAuthResolveHandler = (
        ..._extraArguments: unknown[]
      ): undefined => {
        updatePlatformApiAndAuthResolveResult2 = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            let bufferedAmount: Dynamic =
              platformApiAndAuthState3?.bufferedAmount ?? 0;
            if (bufferedAmount > 0 || frameCount > 0) {
              frameCount = bufferedAmount;
              updatePlatformApiAndAuthResolveHandler();
              return;
            }
            let platformApiAndAuthMap5Entry: Dynamic =
              platformApiAndAuthMap5.get(updatePlatformApiAndAuthResolveResult);
            if (platformApiAndAuthMap5Entry) {
              platformApiAndAuthMap5.delete(
                updatePlatformApiAndAuthResolveResult,
              );
              let platformApiAndAuthValues2Index: Dynamic =
                platformApiAndAuthValues2.indexOf(
                  platformApiAndAuthMap5Entry.frame,
                );
              if (platformApiAndAuthValues2Index >= 0) {
                platformApiAndAuthValues2.splice(
                  platformApiAndAuthValues2Index,
                  1,
                );
              }
              reject(Error(`mux door timeout`));
            }
          },
          3e4,
        );
      };
      updatePlatformApiAndAuthResolveHandler();
      platformApiAndAuthMap5.set(updatePlatformApiAndAuthResolveResult, {
        resolve: (
          updatePlatformApiAndAuthResolve3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          clearTimeout(updatePlatformApiAndAuthResolveResult2);
          resolve(updatePlatformApiAndAuthResolve3);
        },
        reject: (
          updatePlatformApiAndAuthResolve3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          clearTimeout(updatePlatformApiAndAuthResolveResult2);
          reject(updatePlatformApiAndAuthResolve3);
        },
        frame: frame,
        sent: platformApiAndAuthState3?.readyState === WebSocket.OPEN,
      });
      dependencies?.addEventListener(
        `abort`,
        (..._extraArguments: unknown[]): undefined => {
          let platformApiAndAuthMap5Entry: Dynamic = platformApiAndAuthMap5.get(
            updatePlatformApiAndAuthResolveResult,
          );
          if (platformApiAndAuthMap5Entry === undefined) return;
          platformApiAndAuthMap5.delete(updatePlatformApiAndAuthResolveResult);
          let platformApiAndAuthValues2Index: Dynamic =
            platformApiAndAuthValues2.indexOf(
              platformApiAndAuthMap5Entry.frame,
            );
          if (platformApiAndAuthValues2Index >= 0) {
            platformApiAndAuthValues2.splice(platformApiAndAuthValues2Index, 1);
          }
          platformApiAndAuthMap5Entry.reject(Error(`mux withdrawn`));
        },
        {
          once: true,
        },
      );
      resolvePlatformApiAndAuthOPEN(frame);
      resolvePlatformApiAndAuthValue7();
    },
  );
}

function clearPlatformApiAndAuthDelete2(
  clearPlatformApiAndAuthDelete22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformApiAndAuthSet2.add(clearPlatformApiAndAuthDelete22);
  clearPlatformApiAndAuthDelete22(PlatformApiAndAuthClosed);
  return (..._extraArguments: unknown[]): undefined =>
    void platformApiAndAuthSet2.delete(clearPlatformApiAndAuthDelete22);
}

var PlatformApiAndAuthTopic: Dynamic;

function updatePlatformApiAndAuthTopic2(
  topic?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthTopic: Dynamic =
    new (PlatformApiAndAuthTopic as Dynamic)(topic);
  let platformApiAndAuthMap4Entry: Dynamic = platformApiAndAuthMap4.get(topic);
  if (platformApiAndAuthMap4Entry && platformApiAndAuthMap4Entry.size > 0) {
    let some = [...platformApiAndAuthMap4Entry].some(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item.readyState === 1,
    );
    platformApiAndAuthMap4Entry.add(platformApiAndAuthTopic);
    if (some) {
      queueMicrotask(
        (..._extraArguments: unknown[]): Dynamic =>
          platformApiAndAuthTopic.readyState !== 3 &&
          platformApiAndAuthTopic.emit(`open`),
      );
    }
    return platformApiAndAuthTopic;
  }
  platformApiAndAuthMap4.set(
    topic,
    new (Set as Dynamic)([platformApiAndAuthTopic]),
  );
  resolvePlatformApiAndAuthOPEN(
    JSON.stringify({
      op: `sub`,
      topic: topic,
      ...(options.since === undefined
        ? {}
        : {
            since: options.since,
          }),
      ...(options.base === undefined
        ? {}
        : {
            base: options.base,
          }),
      ...(options.uid === undefined
        ? {}
        : {
            uid: options.uid,
          }),
    }),
  );
  resolvePlatformApiAndAuthValue7();
  return platformApiAndAuthTopic;
}

var PlatformApiAndAuthPAGEGONEDETAIL: Dynamic;

function resolvePlatformApiAndAuthCall(
  platformApiAndAuthCall?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return container === undefined
    ? platformApiAndAuthCall
    : {
        call: (
          platformApiAndAuthCall2?: Dynamic,
          options: Dynamic = {},
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformApiAndAuthCall.call(platformApiAndAuthCall2, {
            ...options,
            container: container,
          }),
      };
}

var PlatformApiAndAuthSafeParse: Dynamic;

function resolvePlatformApiAndAuthStatus(
  { status: status, body: body }: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesCondition = typeof body != `string`;
  if (matchesCondition) {
    let safeParse: Dynamic = options.safeParse(body);
    if (safeParse.success) return safeParse.data;
  }
  let stringifySlice: Dynamic = (
    matchesCondition ? JSON.stringify(body) : body
  ).slice(0, 200);
  throw Error(
    status >= 400
      ? `${context} ${status}: ${stringifySlice}`
      : matchesCondition
        ? `${context}: malformed ack: ${stringifySlice}`
        : `${context}: non-JSON 200 body: ${stringifySlice}`,
  );
}

var ackOf: Dynamic;

var batchAckOf: Dynamic;

function bodyOf(body?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

var doorLinkStats: Dynamic;

var nudgeLiveDoor: Dynamic;

function doorRoute(items?: Dynamic, ..._extraArguments: unknown[]) {
  if (items.length === 0) throw Error(`door: empty address`);
  let itemIndex: Dynamic = items.indexOf(`/`);
  return itemIndex < 0
    ? `/api/v3/door/${items}`
    : `/api/v3/door/${items.slice(0, itemIndex)}/${encodeURIComponent(items.slice(itemIndex + 1))}`;
}

var apiFetcher: Dynamic;

function httpDoorAt(
  httpDoor?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let doorRoute2 = doorRoute(httpDoor);
  let fetcher: Dynamic = options.fetcher ?? apiFetcher;
  return {
    async call(
      verb?: Dynamic,
      options2: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let matchesVerb = verb === `batch`;
      let xBongoSess: Dynamic = options.sess?.();
      let fetcher2: Dynamic = await fetcher(
        matchesVerb ? `${doorRoute2}/batch` : doorRoute2,
        {
          method: `POST`,
          headers: {
            ...correlationHeaders(),
            "content-type": `application/json`,
            ...(xBongoSess
              ? {
                  "x-bongo-sess": xBongoSess,
                }
              : {}),
          },
          body: JSON.stringify(
            matchesVerb
              ? options2
              : {
                  ...options2,
                  verb: verb,
                },
          ),
          ...(options.signal !== undefined && {
            signal: options.signal,
          }),
        },
      );
      return {
        status: fetcher2.status,
        body: bodyOf(await fetcher2.text()),
      };
    },
  };
}

function doorAt(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) throw Error(`doorAt: empty address`);
  return {
    async call(
      verb?: Dynamic,
      options2: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let matchesVerb = verb === `batch`;
      let updatePlatformApiAndAuthResolve2: Dynamic =
        await updatePlatformApiAndAuthResolve(
          items,
          JSON.stringify(
            matchesVerb
              ? options2
              : {
                  ...options2,
                  verb: verb,
                },
          ),
          matchesVerb ? `batch` : `one`,
          options,
        );
      return {
        status: updatePlatformApiAndAuthResolve2.status,
        body: bodyOf(updatePlatformApiAndAuthResolve2.body),
      };
    },
  };
}

function liveDoorAt(
  items?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) throw Error(`liveDoorAt: empty address`);
  return resolvePlatformApiAndAuthCall(
    inFrame()
      ? frameDoor(items, options.signal)
      : resolvePlatformApiAndAuthValue3()
        ? doorAt(items, options.signal)
        : httpDoorAt(items, options),
    options.container,
  );
}

function isDoorUnreachable(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(error instanceof (Error as Dynamic))) return false;
  if (error instanceof (TypeError as Dynamic)) return true;
  if (error instanceof (EditorExtensionsFrameSendError as Dynamic))
    return (
      error.code.startsWith(`DEAD:`) || editorExtensionsSet15.has(error.code)
    );
  if (
    error.message === `mux door timeout` ||
    error.message === `mux closed mid-call` ||
    error.message === `reset`
  )
    return true;
  let match: Dynamic = /^door(?: batch)? (\d{3}):/.exec(error.message);
  if (match === null) return false;
  let number2: number = Number(match[1]);
  return number2 >= 500 || number2 === 408 || number2 === 429;
}

var platformApiAndAuthSet4: Dynamic;

var platformApiAndAuthSet5: Dynamic;

function relayFaultDeny(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(error instanceof (EditorExtensionsFrameSendError as Dynamic)) ||
    isDoorUnreachable(error) ||
    !platformApiAndAuthSet4.has(error.code)
  )
    return null;
  let code = platformApiAndAuthSet5.has(error.code)
    ? `too_large`
    : `bad_request`;
  return {
    verdict: `deny`,
    reason: `bad_request`,
    detail: `The relay refused the update before the room saw it (${error.code}).`,
    data: {
      code: code,
      was: error.code,
      layer: `relay`,
    },
  };
}

function relayBusyDeny(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !(error instanceof (EditorExtensionsFrameSendError as Dynamic)) ||
    (error.code !== `RESET_STORM` && error.code !== `INSTANCE_CHURN`) ||
    options !== `update`
    ? null
    : {
        status: 409,
        body: {
          verdict: `deny`,
          reason: `conflict`,
          detail: `ledger-busy: the page answered the same update the same retryable way on every stream instance; nothing committed, retry`,
          data: {
            code: `ledger-busy`,
            was: error.code,
            layer: `relay`,
          },
        },
      };
}

var platformApiAndAuthSet6: Dynamic;

var PlatformApiAndAuthStyles2: string;

var platformApiAndAuthSet7: Dynamic;

function relayAccessDeny(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !(error instanceof (EditorExtensionsFrameSendError as Dynamic)) ||
    !platformApiAndAuthSet6.has(error.code) ||
    !platformApiAndAuthSet7.has(options)
    ? null
    : {
        status: 403,
        body: {
          verdict: `deny`,
          reason: `forbidden`,
          detail: PlatformApiAndAuthStyles2,
          data: {
            code: `forbidden`,
            why: `role:editor`,
            was: error.code,
            layer: `relay`,
          },
        },
      };
}

function httpAccessDeny(
  status?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return status !== 403 || options !== `update`
    ? null
    : {
        status: status,
        body: {
          verdict: `deny`,
          reason: `forbidden`,
          detail: PlatformApiAndAuthStyles2,
          data: {
            code: `forbidden`,
            why: `role:editor`,
            was: `http_403`,
            layer: `http`,
          },
        },
      };
}

var platformApiAndAuthSet8: Dynamic;

var platformApiAndAuthSet9: Dynamic;

var PAGE_GONE_DETAIL: string;

var platformApiAndAuthSet10: Dynamic;

function relayGoneDeny(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(error instanceof (EditorExtensionsFrameSendError as Dynamic)) ||
    !platformApiAndAuthSet10.has(options)
  )
    return null;
  let hasCode: Dynamic = platformApiAndAuthSet8.has(error.code);
  return !hasCode && !platformApiAndAuthSet9.has(error.code)
    ? null
    : {
        status: hasCode ? 410 : 404,
        body: {
          verdict: `deny`,
          reason: `page_gone`,
          detail: PAGE_GONE_DETAIL,
          data: {
            code: `page_gone`,
            ...(hasCode
              ? {}
              : {
                  maybe: `unborn`,
                }),
            was: error.code,
            layer: `relay`,
          },
        },
      };
}

function httpGoneDeny(
  status?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (status !== 404 && status !== 410) ||
    options !== `update` ||
    typeof context != `object` ||
    !context ||
    typeof context.error != `string`
    ? null
    : {
        status: status,
        body: {
          verdict: `deny`,
          reason: `page_gone`,
          detail: PAGE_GONE_DETAIL,
          data: {
            code: `page_gone`,
            ...(status === 404
              ? {
                  maybe: `unborn`,
                }
              : {}),
            was: `http_${status}`,
            layer: `http`,
          },
        },
      };
}

function resolvePlatformApiAndAuthError(
  platformApiAndAuthError?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthError2: Dynamic =
    typeof platformApiAndAuthError == `object` &&
    platformApiAndAuthError &&
    !Array.isArray(platformApiAndAuthError)
      ? platformApiAndAuthError
      : null;
  if (
    platformApiAndAuthError2?.type !== `error` ||
    platformApiAndAuthError2.error?.type !== `rate_limit_error` ||
    typeof platformApiAndAuthError2.error.message != `string`
  )
    return null;
  try {
    let parse: Dynamic = JSON.parse(platformApiAndAuthError2.error.message);
    return typeof parse == `object` &&
      parse &&
      !Array.isArray(parse) &&
      parse.verdict === `deny` &&
      typeof parse.reason == `string`
      ? parse
      : null;
  } catch {
    return null;
  }
}

var platformApiAndAuthSet11: Dynamic;

var platformApiAndAuthSet12: Dynamic;

var transportDoorOf: Dynamic;

function isCarrierReopening(error?: Dynamic, ..._extraArguments: unknown[]) {
  return error instanceof Error && error.message === `mux closed mid-call`;
}

function onLiveReopen(
  onLiveReopen2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (inFrame() || !resolvePlatformApiAndAuthValue3())
    return (..._extraArguments: unknown[]): undefined => undefined;
  let enabled = false;
  return clearPlatformApiAndAuthDelete2(
    (onLiveReopen3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (onLiveReopen3 === `open`) {
        if (enabled) {
          onLiveReopen2();
        }
        enabled = true;
      }
    },
  );
}

function onLiveReconnecting(
  onLiveReconnecting2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (inFrame() || !resolvePlatformApiAndAuthValue3())
    return (..._extraArguments: unknown[]): undefined => undefined;
  let enabled = false;
  return clearPlatformApiAndAuthDelete2(
    (
      onLiveReconnecting3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let matchesOnLiveReconnecting = onLiveReconnecting3 === `reconnecting`;
      if (matchesOnLiveReconnecting !== enabled) {
        enabled = matchesOnLiveReconnecting;
        onLiveReconnecting2(matchesOnLiveReconnecting);
      }
    },
  );
}

function liveDoor(
  items?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) throw Error(`liveDoor: empty project id`);
  return liveDoorAt(`project/${items}`, options);
}

var platformApiAndAuthCreateUpdateReadDeleteValues: string[];

var platformApiAndAuthInternalAntsValues: string[];

var platformApiAndAuthProjectFileNodeRunValues: string[];

var platformApiAndAuthSuiteProjectValues: string[];

var platformApiAndAuthJsonBlobProseIronValues: string[];

var PlatformApiAndAuthProject: Dynamic;

var PlatformApiAndAuthParent: string;

var PlatformApiAndAuthStyles3: string;

var PlatformApiAndAuthStrictObject: Dynamic;

var PlatformApiAndAuthKind: Dynamic;

var PlatformApiAndAuthVerb: Dynamic;

var PlatformApiAndAuthIntendCallerError: Dynamic;

function resolvePlatformApiAndAuthValue9(
  platformApiAndAuthValue9?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  throw new (PlatformApiAndAuthIntendCallerError as Dynamic)(
    platformApiAndAuthValue9,
    options,
  );
}

function resolvePlatformApiAndAuthOpShape(
  platformApiAndAuthOpShape?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformApiAndAuthOpShape === undefined) return platformApiAndAuthOpShape;
  let resolvePlatformApiAndAuthOpShapeResult: Dynamic;
  try {
    resolvePlatformApiAndAuthOpShapeResult = JSON.stringify(
      platformApiAndAuthOpShape,
    );
  } catch {
    resolvePlatformApiAndAuthOpShapeResult = undefined;
  }
  if (resolvePlatformApiAndAuthOpShapeResult === undefined) {
    resolvePlatformApiAndAuthValue9(
      `op-shape`,
      `intend: the op is not JSON-serializable — nothing like it can ride the wire`,
    );
  }
  return JSON.parse(resolvePlatformApiAndAuthOpShapeResult);
}

function resolvePlatformApiAndAuthCreate(
  platformApiAndAuthCreate?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let slice = (
    platformApiAndAuthCreate2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      typeof platformApiAndAuthCreate2 == `string` &&
      platformApiAndAuthCreate2.startsWith(`$lid:`)
    ) {
      items.push(platformApiAndAuthCreate2.slice(5));
    }
  };
  slice(platformApiAndAuthCreate.ref?.id);
  slice(platformApiAndAuthCreate.container?.id);
  let payload: Dynamic = platformApiAndAuthCreate.payload;
  slice(payload?.value?.parent?.id);
  let object2: Dynamic =
    platformApiAndAuthCreate.verb === `create`
      ? typeof platformApiAndAuthCreate.object == `string`
        ? platformApiAndAuthCreate.object
        : undefined
      : typeof platformApiAndAuthCreate.ref?.object == `string`
        ? platformApiAndAuthCreate.ref.object
        : undefined;
  if (object2 === `node`) {
    slice(payload?.parent?.id);
  }
  if (object2 === `file`) {
    slice(payload?.value?.content?.id);
  }
  if (object2 === `run`) {
    slice(payload?.value?.node);
  }
  if (object2 === `run`) {
    slice(payload?.value?.routine);
  }
  if (object2 === `utterance`) {
    slice(payload?.value?.quote?.ref?.id);
  }
  return items;
}

function isPlatformApiAndAuthParent(
  platformApiAndAuthParent?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof platformApiAndAuthParent != `object` || !platformApiAndAuthParent)
    return false;
  let platformApiAndAuthParent2: Dynamic = platformApiAndAuthParent;
  return Array.isArray(platformApiAndAuthParent2.patch)
    ? platformApiAndAuthParent2.patch.some(
        (patch?: Dynamic, ..._extraArguments: unknown[]) => {
          let path: Dynamic = patch?.path;
          return Array.isArray(path) && path[0] === `parent`;
        },
      )
    : false;
}

function filterPlatformApiAndAuthUnrecognizedKeys(
  filterPlatformApiAndAuthUnrecognizedKeys2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label =
    options === undefined ? `intend(op)` : `intend.batch ops[${options}]`;
  let safeParse: Dynamic = PlatformApiAndAuthVerb.safeParse(
    filterPlatformApiAndAuthUnrecognizedKeys2,
  );
  if (!safeParse.success) {
    let flatMap: Dynamic = safeParse.error.issues
      .filter(
        (error?: Dynamic, ..._extraArguments: unknown[]) =>
          error.code === `unrecognized_keys`,
      )
      .flatMap(
        (filteredIssue?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredIssue.keys ?? [],
      );
    if (flatMap.length > 0) {
      resolvePlatformApiAndAuthValue9(
        `op-shape`,
        `${label}: illegal key(s) ${flatMap.map((rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) => JSON.stringify(rolldownNImport2)).join(`, `)} — the op is the CLIENT subset only; room-stamped truth (actor, seq, commit_ts, vid, kind, effects, epoch, meta) is unspellable here by design`,
      );
    }
    resolvePlatformApiAndAuthValue9(
      `op-shape`,
      `${label}: ${safeParse.error.issues[0]?.message ?? `malformed op`}`,
    );
  }
  let data: Dynamic = safeParse.data;
  if (data.verb === `create`) {
    if (data.object === undefined) {
      resolvePlatformApiAndAuthValue9(
        `verb-structure`,
        `${label}: create needs object (what KIND to birth)`,
      );
    }
    if (data.ref !== undefined) {
      resolvePlatformApiAndAuthValue9(
        `verb-structure`,
        `${label}: create carries NO ref — clients don't name new things; the room mints (the minted id arrives in the result)`,
      );
    }
  } else {
    if (data.object !== undefined && data.verb !== `query`) {
      resolvePlatformApiAndAuthValue9(
        `verb-structure`,
        `${label}: object is create-only — non-creates derive it from ref`,
      );
    }
    if (data.ref === undefined && data.verb !== `query`) {
      resolvePlatformApiAndAuthValue9(
        `verb-structure`,
        `${label}: ${data.verb} needs ref ({object, id})`,
      );
    }
  }
  if (data.verb !== `create` && data.container !== undefined) {
    resolvePlatformApiAndAuthValue9(
      `container-on-mutation`,
      `${label}: container is honored on CREATE only — on ${data.verb} the row's container comes from its BIRTH ROW; the ambient mount fills the wire claim. Refused loudly (never silently stripped) so drift is visible — the no-re-parenting law`,
    );
  }
  if (data.verb !== `create` && isPlatformApiAndAuthParent(data.payload)) {
    resolvePlatformApiAndAuthValue9(
      `parent-edge-patch`,
      `${label}: this patch rewrites the ${JSON.stringify(PlatformApiAndAuthParent)} edge — parentage is a birth fact and never changes (no re-parenting; conformance audit finding 1). Refused at the client so the unified path cannot spell the attack; the door refuses it too (write-acceptance unit)`,
    );
  }
  if (options === undefined) {
    if (data.$lid !== undefined) {
      resolvePlatformApiAndAuthValue9(
        `lid-outside-batch`,
        `intend(op): $lid is batch-local — use intend.batch`,
      );
    }
    if (resolvePlatformApiAndAuthCreate(data).length > 0) {
      resolvePlatformApiAndAuthValue9(
        `lid-outside-batch`,
        `intend(op): ${PlatformApiAndAuthStyles3}… references are batch-local — a single op has no earlier mint to alias; use intend.batch`,
      );
    }
  } else {
    if (data.$lid !== undefined && data.verb !== `create`) {
      resolvePlatformApiAndAuthValue9(
        `lid-misuse`,
        `${label}: $lid names a MINTED id — only a create mints`,
      );
    }
    if (data.$lid !== undefined && data.$lid.startsWith(`$lid:`)) {
      resolvePlatformApiAndAuthValue9(
        `lid-misuse`,
        `${label}: the alias name is bare ("a"), not a reference ("${PlatformApiAndAuthStyles3}a")`,
      );
    }
  }
  return data;
}

var resolvePlatformApiAndAuthIncludes: Dynamic;

function resolvePlatformApiAndAuthContainer(
  platformApiAndAuthContainer?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let object2: Dynamic =
    platformApiAndAuthContainer.verb === `create` ||
    platformApiAndAuthContainer.verb === `query`
      ? platformApiAndAuthContainer.object
      : platformApiAndAuthContainer.ref?.object;
  let engine: Dynamic =
    platformApiAndAuthContainer.engine ??
    (object2 === undefined
      ? `json`
      : (PlatformApiAndAuthProject[object2] ?? `json`));
  let container: Dynamic;
  container =
    platformApiAndAuthContainer.verb === `create`
      ? (platformApiAndAuthContainer.container ??
        (resolvePlatformApiAndAuthIncludes(platformApiAndAuthContainer.object)
          ? undefined
          : options))
      : platformApiAndAuthContainer.verb === `access` ||
          (platformApiAndAuthContainer.ref !== undefined &&
            resolvePlatformApiAndAuthIncludes(
              platformApiAndAuthContainer.ref.object,
            ))
        ? undefined
        : options;
  let payload: Dynamic =
    platformApiAndAuthContainer.payload === undefined
      ? platformApiAndAuthContainer.verb === `read` ||
        platformApiAndAuthContainer.verb === `delete`
        ? {}
        : undefined
      : platformApiAndAuthContainer.payload;
  return {
    ...(container === undefined
      ? {}
      : {
          container: container,
        }),
    ...(platformApiAndAuthContainer.ref === undefined
      ? {}
      : {
          ref: platformApiAndAuthContainer.ref,
        }),
    ...(platformApiAndAuthContainer.object === undefined
      ? {}
      : {
          object: platformApiAndAuthContainer.object,
        }),
    verb: platformApiAndAuthContainer.verb,
    engine: engine,
    ...(platformApiAndAuthContainer.branch === undefined
      ? {}
      : {
          branch: platformApiAndAuthContainer.branch,
        }),
    ...(payload === undefined
      ? {}
      : {
          payload: payload,
        }),
  };
}

function resolvePlatformApiAndAuthWhy(
  platformApiAndAuthWhy?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let why: Dynamic =
    typeof platformApiAndAuthWhy == `object` && platformApiAndAuthWhy
      ? platformApiAndAuthWhy.why
      : undefined;
  return typeof why == `string` && why !== ``
    ? {
        why: why.slice(0, 64),
      }
    : {};
}

function collectPlatformApiAndAuthVerb(
  collectPlatformApiAndAuthVerb2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let withBusyRetry2: Dynamic = withBusyRetry(collectPlatformApiAndAuthVerb2);
  let resolvePlatformApiAndAuthContainer3: Dynamic = (
    collectPlatformApiAndAuthVerb3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let {
      verb: platformApiAndAuthContainer,
      ...platformApiAndAuthContainer2
    }: Dynamic = resolvePlatformApiAndAuthContainer(
      filterPlatformApiAndAuthUnrecognizedKeys(
        resolvePlatformApiAndAuthOpShape(collectPlatformApiAndAuthVerb3),
        undefined,
      ),
      options,
    );
    return withBusyRetry2
      .call(platformApiAndAuthContainer, platformApiAndAuthContainer2)
      .then((response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let ackOf2: Dynamic = ackOf(response);
        let body: Dynamic =
          typeof response.body == `object` &&
          response.body !== null &&
          !Array.isArray(response.body)
            ? response.body
            : null;
        if (ackOf2.verdict !== `allow`) {
          let hold: Dynamic =
            body === null
              ? null
              : unconfirmedWaitOf({
                  status: response.status,
                  ...body,
                });
          return {
            verdict: `deny`,
            reason: ackOf2.reason,
            ...(ackOf2.detail === undefined
              ? {}
              : {
                  detail: ackOf2.detail,
                }),
            ...resolvePlatformApiAndAuthWhy(ackOf2.data),
            ...(hold === null
              ? {}
              : {
                  hold: hold,
                }),
          };
        }
        let minted: Dynamic = ackOf2.minted ?? ackOf2.id;
        let matchesDuplicate =
          response.duplicate === true ||
          body?.duplicate === true ||
          ackOf2.replayed === true;
        return {
          verdict: `allow`,
          ...(minted === undefined
            ? {}
            : {
                minted: minted,
              }),
          ...(matchesDuplicate
            ? {
                replayed: true,
              }
            : {}),
        };
      });
  };
  let resolvePlatformApiAndAuthContainer4: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (items.length === 0) {
      resolvePlatformApiAndAuthValue9(`batch-cap`, `intend.batch: empty batch`);
    }
    if (items.length > 64) {
      resolvePlatformApiAndAuthValue9(
        `batch-cap`,
        `intend.batch: ${items.length} ops — the cap is 64 (page 03 row 10)`,
      );
    }
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let batch: Dynamic = [];
    for (let index = 0; index < items.length; index++) {
      let filterPlatformApiAndAuthUnrecognizedKeys2: Dynamic =
        filterPlatformApiAndAuthUnrecognizedKeys(
          resolvePlatformApiAndAuthOpShape(items[index]),
          index,
        );
      for (let collectPlatformApiAndAuthVerbResult of resolvePlatformApiAndAuthCreate(
        filterPlatformApiAndAuthUnrecognizedKeys2,
      ) as Dynamic)
        if (!uniqueItems.has(collectPlatformApiAndAuthVerbResult)) {
          resolvePlatformApiAndAuthValue9(
            `lid-misuse`,
            `intend.batch ops[${index}]: ${PlatformApiAndAuthStyles3}${collectPlatformApiAndAuthVerbResult} does not name an EARLIER create's $lid (aliases resolve forward only)`,
          );
        }
      if (filterPlatformApiAndAuthUnrecognizedKeys2.$lid !== undefined) {
        if (uniqueItems.has(filterPlatformApiAndAuthUnrecognizedKeys2.$lid)) {
          resolvePlatformApiAndAuthValue9(
            `lid-misuse`,
            `intend.batch ops[${index}]: duplicate $lid ${JSON.stringify(filterPlatformApiAndAuthUnrecognizedKeys2.$lid)}`,
          );
        }
        uniqueItems.add(filterPlatformApiAndAuthUnrecognizedKeys2.$lid);
      }
      batch.push({
        ...resolvePlatformApiAndAuthContainer(
          filterPlatformApiAndAuthUnrecognizedKeys2,
          options,
        ),
        ...(filterPlatformApiAndAuthUnrecognizedKeys2.$lid === undefined
          ? {}
          : {
              $lid: filterPlatformApiAndAuthUnrecognizedKeys2.$lid,
            }),
      });
    }
    return withBusyRetry2
      .call(`batch`, {
        batch: batch,
      })
      .then(batchAckOf)
      .then((response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (response.verdict === `deny`)
          return {
            verdict: `deny`,
            index: response.index ?? 0,
            reason: response.reason,
            ...(response.detail === undefined
              ? {}
              : {
                  detail: response.detail,
                }),
            ...resolvePlatformApiAndAuthWhy(response.data),
          };
        if (response.acks.length !== batch.length)
          throw Error(
            `door batch: malformed ack — ${response.acks.length} acks for ${batch.length} ops`,
          );
        if (
          response.acks.some(
            (response2?: Dynamic, ..._extraArguments: unknown[]) =>
              response2.verdict !== `allow`,
          )
        )
          throw Error(
            `door batch: malformed ack — all-or-nothing allow carrying a per-op deny`,
          );
        return {
          verdict: `allow`,
          results: response.acks.map(
            (response2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let record2: Dynamic = {
                verdict: `allow`,
              };
              if (
                response2.verdict === `allow` &&
                response2.minted !== undefined
              ) {
                record2.minted = response2.minted;
              }
              return record2;
            },
          ),
        };
      });
  };
  let resolvePlatformApiAndAuthContainer5: Dynamic =
    resolvePlatformApiAndAuthContainer3;
  resolvePlatformApiAndAuthContainer5.batch =
    resolvePlatformApiAndAuthContainer4;
  return resolvePlatformApiAndAuthContainer5;
}

var PlatformApiAndAuthWorldLaneError: Dynamic;

var resolvePlatformApiAndAuthValue10: Dynamic;

var platformApiAndAuthPattern2: RegExp;

var resolvePlatformApiAndAuthMatch: Dynamic;

var resolvePlatformApiAndAuthValue11: Dynamic;

var platformApiAndAuthState6: Dynamic;

function resolvePlatformApiAndAuthValue12(
  platformApiAndAuthValue122?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformApiAndAuthState6 = platformApiAndAuthValue122;
}

function collectPlatformApiAndAuthJoin(
  collectPlatformApiAndAuthJoin3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    resolveObservabilityBrowserAndOperationEventsSome(
      collectPlatformApiAndAuthJoin3,
    )
  )
    throw Error(
      `refusing file read: dot segment in "${collectPlatformApiAndAuthJoin3}"`,
    );
  let label = `/api/file/${collectPlatformApiAndAuthJoin3.split(`/`).map(encodeURIComponent).join(`/`)}`;
  return PlatformApiAndAuthBONGOAPIBASE
    ? `${PlatformApiAndAuthBONGOAPIBASE}${label}`
    : `${label}?_=${Date.now()}`;
}

async function loadPlatformApiAndAuthHeaders(
  platformApiAndAuthHeaders?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let response = await fetch(
    collectPlatformApiAndAuthJoin(platformApiAndAuthHeaders),
    {
      headers: platformApiAndAuthState6?.() ?? {},
      cache: `no-store`,
    },
  );
  if (response.status === 404) return;
  if (!response.ok)
    throw Object.assign(
      Error(`readFile ${platformApiAndAuthHeaders} → ${response.status}`),
      {
        status: response.status,
      },
    );
  let normalizedTrimmedHeaderEntryPartItem = response.headers
    .get(`content-type`)
    ?.split(`;`)[0]
    ?.trim()
    .toLowerCase();
  return {
    buf: await response.arrayBuffer(),
    sha: response.headers.get(`x-bongo-sha`) ?? undefined,
    actor: response.headers.get(`x-bongo-actor`) ?? undefined,
    movedTo: response.headers.get(`x-bongo-moved-to`) ?? undefined,
    mime:
      normalizedTrimmedHeaderEntryPartItem === ``
        ? undefined
        : normalizedTrimmedHeaderEntryPartItem,
  };
}

var PlatformApiAndAuthRead: Dynamic;

var PlatformApiAndAuthCreateContext2: Dynamic;

var resolvePlatformApiAndAuthUseContext2: Dynamic;

var resolvePlatformApiAndAuthXBongoUniverse: Dynamic;

function collectPlatformApiAndAuthJoin2(
  collectPlatformApiAndAuthJoin22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    resolveObservabilityBrowserAndOperationEventsSome(
      collectPlatformApiAndAuthJoin22,
    )
  )
    throw Error(
      `refusing file url: dot segment in "${collectPlatformApiAndAuthJoin22}"`,
    );
  return resolvePlatformApiAndAuthValue(
    `/api/file/${collectPlatformApiAndAuthJoin22.split(`/`).map(encodeURIComponent).join(`/`)}`,
  );
}

var platformApiAndAuthSet13: Dynamic;

function clearPlatformApiAndAuthDelete3(
  clearPlatformApiAndAuthDelete32?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformApiAndAuthSet13.add(clearPlatformApiAndAuthDelete32);
  return (..._extraArguments: unknown[]): Dynamic =>
    platformApiAndAuthSet13.delete(clearPlatformApiAndAuthDelete32);
}

function resolvePlatformApiAndAuthValue13(
  platformApiAndAuthValue13?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolvePlatformApiAndAuthValue13Result of platformApiAndAuthSet13 as Dynamic)
    resolvePlatformApiAndAuthValue13Result(platformApiAndAuthValue13, options);
}

var updatePlatformApiAndAuthByteLength: Dynamic;

async function loadPlatformApiAndAuthValue(
  platformApiAndAuthValue?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return (await loadPlatformApiAndAuthRoomsEnabled(platformApiAndAuthValue))
    .buf;
}

async function loadPlatformApiAndAuthRoomsEnabled(
  platformApiAndAuthRoomsEnabled?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (platformApiAndAuthRoomsEnabled.startsWith(`@disk:`))
    return resolvePlatformApiAndAuthValue14(
      platformApiAndAuthRoomsEnabled.slice(6),
    );
  let {
    roomsEnabled: preloadTImport2,
    useWorkbookStore: preloadTImport3,
  }: Dynamic = await preloadModule(
    async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let {
        roomsEnabled: roomsEnabled,
        useWorkbookStore: useWorkbookStore2,
      }: Dynamic = await Promise.resolve().then(
        (..._extraArguments: unknown[]): Dynamic => PlatformApiAndAuthMUTATORS,
      );
      return {
        roomsEnabled: roomsEnabled,
        useWorkbookStore: useWorkbookStore2,
      };
    },
    undefined,
    import.meta.url,
  );
  if (preloadTImport2 && /\.(xlsx|xlsm)$/i.test(platformApiAndAuthRoomsEnabled))
    return resolvePlatformApiAndAuthValue14(platformApiAndAuthRoomsEnabled);
  let byPathItem: Dynamic =
    preloadTImport3.getState().byPath[platformApiAndAuthRoomsEnabled];
  if (byPathItem?.dirty)
    return {
      buf: updatePlatformApiAndAuthByteLength(
        byPathItem.pendingBytes ?? (await byPathItem.wb.toXlsx()),
      ),
    };
  let {
    readValidated: preloadTImport4,
    isTombstone: preloadTImport5,
  }: Dynamic = await preloadModule(
    async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let {
        readValidated: readValidated2,
        isTombstone: isTombstone2,
      }: Dynamic = await Promise.resolve().then(
        (..._extraArguments: unknown[]): Dynamic => PlatformApiAndAuthTOMBSTONE,
      );
      return {
        readValidated: readValidated2,
        isTombstone: isTombstone2,
      };
    },
    undefined,
    import.meta.url,
  );
  let preloadTImport6: Dynamic = await preloadTImport4(
    platformApiAndAuthRoomsEnabled,
  );
  return preloadTImport6 !== undefined && !preloadTImport5(preloadTImport6)
    ? {
        buf: updatePlatformApiAndAuthByteLength(preloadTImport6),
      }
    : resolvePlatformApiAndAuthValue14(platformApiAndAuthRoomsEnabled);
}

async function loadPlatformApiAndAuthValue2(
  platformApiAndAuthValue22?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return (await resolvePlatformApiAndAuthValue14(platformApiAndAuthValue22))
    .buf;
}

function resolvePlatformApiAndAuthValue14(
  platformApiAndAuthValue14?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return loadPlatformApiAndAuthStatus(platformApiAndAuthValue14);
}

var resolvePlatformApiAndAuthJoin: (platformApiAndAuthJoin?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

async function loadPlatformApiAndAuthStatus(
  platformApiAndAuthStatus?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let label: Dynamic = await PlatformApiAndAuthRead.read(
    ``,
    resolvePlatformApiAndAuthValue10(platformApiAndAuthStatus),
  );
  if (label === undefined)
    throw Object.assign(Error(`readFile ${platformApiAndAuthStatus} → 404`), {
      status: 404,
    });
  if (label.movedTo) {
    resolvePlatformApiAndAuthValue13(
      platformApiAndAuthStatus,
      resolvePlatformApiAndAuthJoin(platformApiAndAuthStatus, label.movedTo),
    );
  }
  return label;
}

async function loadPlatformApiAndAuthMethod2(
  platformApiAndAuthMethod2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = [],
  dependencies: Dynamic = {},
  argument: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let body: Dynamic = new (FormData as Dynamic)();
  body.set(`dir`, platformApiAndAuthMethod2);
  for (let [
    loadPlatformApiAndAuthMethod2Result,
    loadPlatformApiAndAuthMethod2Result2,
  ] of Object.entries(options) as Dynamic)
    body.append(
      `w:${loadPlatformApiAndAuthMethod2Result}`,
      loadPlatformApiAndAuthMethod2Result2,
    );
  for (let loadPlatformApiAndAuthMethod2Result of context as Dynamic)
    body.append(`d`, loadPlatformApiAndAuthMethod2Result);
  for (let [
    loadPlatformApiAndAuthMethod2Result,
    loadPlatformApiAndAuthMethod2Result2,
  ] of Object.entries(dependencies) as Dynamic)
    body.append(
      `sha:${loadPlatformApiAndAuthMethod2Result}`,
      loadPlatformApiAndAuthMethod2Result2,
    );
  if (argument.asEditor) {
    body.set(`origin`, `editor`);
  }
  let response = await fetch(resolvePlatformApiAndAuthValue(`/api/save`), {
    method: `POST`,
    body: body,
    headers: resolvePlatformApiAndAuthXBongoUniverse(),
  });
  if (!response.ok)
    throw Error(
      `saveFiles ${platformApiAndAuthMethod2} → ${response.status} ${await response.text()}`,
    );
  let json2: Dynamic = await response.json();
  if (json2.moved)
    for (let [
      loadPlatformApiAndAuthMethod2Result,
      loadPlatformApiAndAuthMethod2Result2,
    ] of Object.entries(json2.moved) as Dynamic)
      resolvePlatformApiAndAuthValue13(
        `${platformApiAndAuthMethod2}/${loadPlatformApiAndAuthMethod2Result}`,
        `${platformApiAndAuthMethod2}/${loadPlatformApiAndAuthMethod2Result2}`,
      );
  return json2;
}

var PlatformApiAndAuthState7: Dynamic;

async function loadPlatformApiAndAuthFiles(
  platformApiAndAuthFiles?: Dynamic,
  options: Dynamic = ``,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return (await api.projects.files(platformApiAndAuthFiles, options)).files;
}

async function loadPlatformApiAndAuthFiles2(
  platformApiAndAuthFiles2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return platformApiAndAuthFiles2.startsWith(`users/`)
    ? resolvePlatformSessionAndSourcesDisplayName(platformApiAndAuthFiles2, {
        files: [],
        versions: [],
        dirty: 0,
        updated: ``,
      })
    : api.object(platformApiAndAuthFiles2, options);
}

async function loadPlatformApiAndAuthDescription(
  platformApiAndAuthDescription?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (context !== undefined || dependencies !== undefined) {
    await api.projects.addVersion(platformApiAndAuthDescription, options, {
      description: context ?? ``,
      author: dependencies ?? ``,
    });
    return;
  }
  let platformApiAndAuthDescription2: Dynamic = platformApiAndAuthDescription;
  let name: Dynamic = options;
  if (!platformApiAndAuthDescription2)
    throw Error(`The project is still loading — try again in a moment.`);
  if (!name)
    throw Error(`newVersion: a draft needs a name (zVersionValue min(1))`);
  let fetcher: Dynamic = (
    platformApiAndAuthDescription3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    fetch(
      resolvePlatformApiAndAuthValue(platformApiAndAuthDescription3),
      options2,
    );
  let { head: base }: Dynamic =
    await loadPlatformSessionAndSourcesFrameVersionTable(
      platformApiAndAuthDescription2,
      fetcher,
    );
  let collectPlatformApiAndAuthVerb2: Dynamic =
    await collectPlatformApiAndAuthVerb(
      liveDoor(platformApiAndAuthDescription2, {
        fetcher: fetcher,
      }),
    )({
      verb: `create`,
      object: `version`,
      container: {
        kind: `project`,
        id: platformApiAndAuthDescription2,
      },
      payload: {
        value: {
          parent: null,
          base: base,
          name: name,
        },
      },
    });
  if (collectPlatformApiAndAuthVerb2.verdict === `deny`)
    throw Error(
      resolvePlatformSessionAndSourcesUnavailable(
        collectPlatformApiAndAuthVerb2.reason,
        collectPlatformApiAndAuthVerb2.why,
      ),
    );
}

var platformApiAndAuthValue50002: number;

var isPlatformApiAndAuthByteLength: (platformApiAndAuthByteLength?: Dynamic, items?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function isPlatformApiAndAuthHandoff(
  url?: Dynamic,
  onMessage?: Dynamic,
  onState?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let staleMs: Dynamic = options?.staleMs ?? 3e4;
  let drainingDeadlineMs: Dynamic = options?.drainingDeadlineMs ?? 3e4;
  let reflushDelayMs: Dynamic =
    options?.reflushDelayMs ?? platformApiAndAuthValue50002;
  let isEdit: Dynamic =
    options?.isEdit ?? ((..._extraArguments: unknown[]) => true);
  let staleCheckIntervalMs = Math.min(1e4, Math.ceil(staleMs / 3));
  let socketUrl = new URL(url);
  let roomKey =
    resolvePlatformApiAndAuthValue3() && socketUrl.host === location.host
      ? `room:` +
        decodeURIComponent(
          socketUrl.pathname.slice(
            `${PlatformApiAndAuthBONGOWSBASE}/api/room/`.length,
          ),
        )
      : undefined;
  let uid = roomKey
    ? (socketUrl.searchParams.get(`uid`) ?? undefined)
    : undefined;
  let socket: Dynamic;
  let rawMessageHandler: Dynamic;
  let pendingMessages: Dynamic = [];
  let since = 0;
  let baseSha: Dynamic;
  let handoff = false;
  let connectionCount = 0;
  let disposed = false;
  let connected = false;
  let firstFlush = true;
  let reflushScheduled = false;
  let reconnectTimer: Dynamic;
  let reflushTimer: Dynamic;
  let drainingTimer: Dynamic;
  let clearDrainingTimer = (..._extraArguments: unknown[]): undefined => {
    if (drainingTimer) {
      clearTimeout(drainingTimer);
    }
    drainingTimer = undefined;
  };
  let lastSendAt = 0;
  let lastEchoAt = 0;
  let markPendingSend = (..._extraArguments: unknown[]): undefined => {
    if (lastSendAt <= lastEchoAt) {
      lastSendAt = Date.now();
    }
  };
  let staleDetected = false;
  let roomPath: Dynamic = url.replace(/^wss?:\/\/[^/]+/, ``).split(`?`)[0];
  let staleCheckTimer = setInterval(
    (..._extraArguments: unknown[]): undefined => {
      if (
        disposed ||
        !connected ||
        socket?.readyState !== WebSocket.OPEN ||
        staleDetected ||
        lastSendAt <= lastEchoAt
      )
        return;
      let difference = Date.now() - lastSendAt;
      if (!(difference < staleMs)) {
        staleDetected = true;
        withWebSpan(
          `room.ws_stale`,
          {
            [TELEMETRY_ATTRIBUTE_NAMES.roomPath]: roomPath,
            [TELEMETRY_ATTRIBUTE_NAMES.roomLastMsgAgoMs]: difference,
          },
          (..._extraArguments: unknown[]): undefined => {},
          `room.ws_stale`,
        );
        console.warn(
          `[room] WS stale ${Math.round(difference / 1e3)}s since send with no echo — ${roomPath}`,
        );
        try {
          socket?.close();
        } catch {}
      }
    },
    staleCheckIntervalMs,
  );
  let flushPending = (..._extraArguments: unknown[]): undefined => {
    reflushTimer = undefined;
    reflushScheduled = false;
    if (!(disposed || socket?.readyState !== WebSocket.OPEN)) {
      if (pendingMessages.length) {
        markPendingSend();
      }
      for (let isPlatformApiAndAuthHandoffResult of pendingMessages as Dynamic)
        socket.send(isPlatformApiAndAuthHandoffResult);
    }
  };
  let connect = (..._extraArguments: unknown[]): undefined => {
    if (
      disposed ||
      ((reconnectTimer = undefined),
      onState(
        connectionCount === 0 ? `connecting` : `reconnecting`,
        connectionCount === 0
          ? undefined
          : {
              handoff: handoff,
            },
      ),
      disposed)
    )
      return;
    let updatePlatformApiAndAuthTopic22: Dynamic = roomKey
      ? updatePlatformApiAndAuthTopic2(roomKey, {
          since: since,
          base: baseSha,
          uid: uid,
        })
      : new (WebSocket as Dynamic)(
          `${url}${url.includes(`?`) ? `&` : `?`}since=${since}${baseSha ? `&base=${baseSha}` : ``}`,
        );
    socket = updatePlatformApiAndAuthTopic22;
    updatePlatformApiAndAuthTopic22.binaryType = `arraybuffer`;
    updatePlatformApiAndAuthTopic22.addEventListener(
      `open`,
      (..._extraArguments: unknown[]): undefined => {
        if (socket === updatePlatformApiAndAuthTopic22) {
          connected = true;
          handoff = false;
          lastSendAt = 0;
          lastEchoAt = 0;
          staleDetected = false;
          onState(`open`);
          if (firstFlush) {
            firstFlush = false;
            flushPending();
          } else {
            reflushScheduled = true;
            reflushTimer = setTimeout(flushPending, reflushDelayMs);
          }
        }
      },
    );
    updatePlatformApiAndAuthTopic22.addEventListener(
      `message`,
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (socket === updatePlatformApiAndAuthTopic22) {
          if (
            !(
              typeof event.data == `string` &&
              event.data.startsWith(`{"t":"conn"`)
            )
          ) {
            connectionCount = 0;
          }
          lastEchoAt = Date.now();
          staleDetected = false;
          if (typeof event.data == `string` && event.data.startsWith(`{"t":"`))
            try {
              let parse: Dynamic = JSON.parse(event.data);
              if (parse.t === `draining`) {
                connected = false;
                onState(`draining`);
                drainingTimer ??= setTimeout(
                  (..._extraArguments: unknown[]): undefined => {
                    drainingTimer = undefined;
                    try {
                      socket?.close();
                    } catch {}
                  },
                  drainingDeadlineMs,
                );
                return;
              }
              if (parse.t === `replayed`) {
                try {
                  options?.onReplayed?.();
                } catch {}
                if (reflushScheduled) {
                  onMessage(parse);
                  if (reflushTimer) {
                    clearTimeout(reflushTimer);
                  }
                  flushPending();
                }
                return;
              }
              if (
                parse.t === `rebase` ||
                (parse.t === `baseline` && parse.sha !== baseSha)
              ) {
                since = 0;
              }
              if (parse.t === `rebase` || parse.t === `baseline`) {
                baseSha = parse.sha;
              }
              return onMessage(parse);
            } catch {}
          if (typeof event.data != `string`) {
            since++;
            if (
              pendingMessages.length &&
              isPlatformApiAndAuthByteLength(event.data, pendingMessages[0])
            ) {
              pendingMessages.shift();
            }
          }
          rawMessageHandler?.(event.data);
        }
      },
    );
    updatePlatformApiAndAuthTopic22.addEventListener(
      `close`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (socket !== updatePlatformApiAndAuthTopic22) return;
        connected = false;
        socket = undefined;
        clearDrainingTimer();
        if (reflushTimer) {
          clearTimeout(reflushTimer);
        }
        reflushScheduled = false;
        if (disposed) {
          onState(`closed`);
          return;
        }
        let event2: Dynamic = event;
        handoff =
          (!!event2?.wasClean &&
            (event2.code === 1e3 ||
              event2.code === 1001 ||
              event2.code === 1012)) ||
          event2?.code === 4002;
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
        }
        let min = Math.min(250 * 2 ** connectionCount++, 5e3);
        onState(`reconnecting`, {
          handoff: handoff,
        });
        reconnectTimer = setTimeout(connect, min);
      },
    );
    updatePlatformApiAndAuthTopic22.addEventListener(
      `error`,
      (..._extraArguments: unknown[]): undefined => {
        try {
          updatePlatformApiAndAuthTopic22.close();
        } catch {}
      },
    );
  };
  connect();
  return {
    send: (
      platformApiAndAuthHandoff?: unknown,
      ..._extraArguments: unknown[]
    ): undefined => {
      markPendingSend();
      if (typeof platformApiAndAuthHandoff == `string`) {
        if (connected && socket?.readyState === WebSocket.OPEN) {
          socket.send(platformApiAndAuthHandoff);
        }
        return;
      }
      pendingMessages.push(platformApiAndAuthHandoff);
      if (
        !reflushScheduled &&
        connected &&
        socket?.readyState === WebSocket.OPEN
      ) {
        socket.send(platformApiAndAuthHandoff);
      }
    },
    sendVolatile: (
      platformApiAndAuthHandoff?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      disposed || !connected || socket?.readyState !== WebSocket.OPEN
        ? false
        : (markPendingSend(), socket.send(platformApiAndAuthHandoff), true),
    onMessage: (
      platformApiAndAuthHandoff?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      rawMessageHandler = platformApiAndAuthHandoff;
    },
    close: (..._extraArguments: unknown[]): undefined => {
      disposed = true;
      clearInterval(staleCheckTimer);
      clearDrainingTimer();
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      if (reflushTimer) {
        clearTimeout(reflushTimer);
      }
      socket?.close();
    },
    cycle: (..._extraArguments: unknown[]): undefined => {
      if (!disposed)
        try {
          socket?.close();
        } catch {}
    },
    drain: (..._extraArguments: unknown[]): Dynamic => (
      (disposed = true),
      clearInterval(staleCheckTimer),
      clearDrainingTimer(),
      reconnectTimer && clearTimeout(reconnectTimer),
      reflushTimer && clearTimeout(reflushTimer),
      socket?.close(),
      pendingMessages.splice(0)
    ),
    pendingEdits: (..._extraArguments: unknown[]) => {
      let index = 0;
      for (let isPlatformApiAndAuthHandoffResult of pendingMessages as Dynamic)
        if (isEdit(isPlatformApiAndAuthHandoffResult)) {
          index++;
        }
      return index;
    },
  };
}

var PlatformApiAndAuthTick: Dynamic;

var platformApiAndAuthState7: Dynamic;

var resolvePlatformApiAndAuthAnchor: (platformApiAndAuthAnchor?: Dynamic, ..._extraArguments: unknown[]) => undefined;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth2Step1(): void {
  (PlatformApiAndAuthState3 = typeof localStorage !== "undefined" ? localStorage : undefined);
  (PlatformApiAndAuthActive = create(
    (
      platformApiAndAuthActive?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      active: PlatformApiAndAuthState3?.getItem(`bongo.universe`) ?? ``,
      universes: [],
      load: async (..._extraArguments: unknown[]): Promise<undefined> => {
        let response = await fetch(
          resolvePlatformApiAndAuthValue(`/api/universes`),
        );
        let universes: Dynamic = response.ok ? await response.json() : [];
        platformApiAndAuthActive(
          (
            platformApiAndAuthActive2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            universes: universes,
            active: platformApiAndAuthActive2.active || universes[0]?.name || ``,
          }),
        );
      },
      set: (active?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        PlatformApiAndAuthState3?.setItem(`bongo.universe`, active);
        platformApiAndAuthActive({
          active: active,
        });
        location.reload();
      },
    }),
  ));
  (PlatformApiAndAuthState4 = typeof location !== "undefined");
  (resolvePlatformApiAndAuthValue3 = (
    ..._extraArguments: unknown[]
  ) => PlatformApiAndAuthState4 && typeof location !== "undefined");
  (platformApiAndAuthValue0 = 0);
  (PlatformApiAndAuthClosed = `closed`);
  (platformApiAndAuthValue500 = 500);
  (platformApiAndAuthValue8 = 8);
  (platformApiAndAuthValue100 = 100);
  (platformApiAndAuthValue250 = 250);
  (platformApiAndAuthValue02 = 0);
  (platformApiAndAuthValue5000 = 5e3);
  (platformApiAndAuthValue2000 = 2e3);
  (platformApiAndAuthValue03 = 0);
  (resolvePlatformApiAndAuthHidden = (
    ..._extraArguments: unknown[]
  ) => typeof document === "undefined" || document.visibilityState !== `hidden`);
  (resolvePlatformApiAndAuthIsFinite = (
    platformApiAndAuthIsFinite?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let number2 = Number(platformApiAndAuthIsFinite);
    return Number.isFinite(number2) && number2 > 0 ? number2 : undefined;
  });
  (PlatformApiAndAuthState5 = resolvePlatformApiAndAuthIsFinite(undefined) ?? 8e3);
  (PlatformApiAndAuthState6 = resolvePlatformApiAndAuthIsFinite(undefined) ?? 18e3);
  (platformApiAndAuthValue15000 = 15e3);
  (platformApiAndAuthValue04 = 0);
  (platformApiAndAuthValue05 = 0);
  (platformApiAndAuthValue10 = 10);
  (platformApiAndAuthValue06 = 0);
  (platformApiAndAuthValue07 = 0);
  (platformApiAndAuthValue08 = 0);
  (platformApiAndAuthMap3 = new (Map as Dynamic)());
  (platformApiAndAuthMap4 = new (Map as Dynamic)());
  (platformApiAndAuthSet2 = new (Set as Dynamic)());
  (platformApiAndAuthValues2 = []);
  (platformApiAndAuthMap5 = new (Map as Dynamic)());
  (platformApiAndAuthValue1 = 1);
  (platformApiAndAuthTextEncoder = new TextEncoder());
  (platformApiAndAuthTextDecoder = new TextDecoder());
  (PlatformApiAndAuthBongoWslinkLog = `bongo:wslink-log`);
  (platformApiAndAuthValue50 = 50);
  (platformApiAndAuthSet3 = new (Set as Dynamic)());
  (resolvePlatformApiAndAuthValue4 = (
    platformApiAndAuthValue42?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (PlatformApiAndAuthClosed !== platformApiAndAuthValue42) {
      PlatformApiAndAuthClosed = platformApiAndAuthValue42;
      for (let resolvePlatformApiAndAuthValue4Result of platformApiAndAuthSet2 as Dynamic)
        resolvePlatformApiAndAuthValue4Result(platformApiAndAuthValue42);
    }
  });
  (platformApiAndAuthValue4 = 4);
  (platformApiAndAuthValue_1 = false);
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener(`online`, resolvePlatformApiAndAuthOPEN2);
    document.addEventListener(
      `visibilitychange`,
      (..._extraArguments: unknown[]): undefined => {
        if (document.visibilityState === `visible`) {
          resolvePlatformApiAndAuthOPEN2();
        }
      },
    );
    (window as Dynamic).__wsLink = {
      state: (..._extraArguments: unknown[]): Dynamic => PlatformApiAndAuthClosed,
      kick: resolvePlatformApiAndAuthOPEN2,
      nudge: resolvePlatformApiAndAuthValue8,
      forceReconnect: resolvePlatformApiAndAuthValue6,
      lastRecvAt: (..._extraArguments: unknown[]): Dynamic =>
        platformApiAndAuthValue06,
      dump: (..._extraArguments: unknown[]): Dynamic => ({
        ...resolvePlatformApiAndAuthState5(),
        subs: [...platformApiAndAuthMap3.keys()],
        channels: [...platformApiAndAuthMap4.keys()],
        outbox: platformApiAndAuthValues2.length,
        log: JSON.parse(
          localStorage.getItem(PlatformApiAndAuthBongoWslinkLog) ?? `[]`,
        ),
      }),
    };
  }
  (PlatformApiAndAuthStyles = `~d:`);
  (PlatformApiAndAuthTopic = class {
    [key: string]: Dynamic;
    topic: Dynamic;
    binaryType: Dynamic = `arraybuffer`;
    _state: Dynamic = 0;
    listeners: Dynamic = {};
    constructor(platformApiAndAuth?: Dynamic, ..._extraArguments: unknown[]) {
      this.topic = platformApiAndAuth;
    }
    get readyState(): Dynamic {
      return this._state;
    }
    addEventListener(
      platformApiAndAuth?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      (this.listeners[platformApiAndAuth] ??= new (Set as Dynamic)()).add(
        options,
      );
    }
    emit(
      platformApiAndAuth?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (platformApiAndAuth === `open`) {
        this._state = 1;
      }
      if (platformApiAndAuth === `close`) {
        if (this._state === 3) return;
        this._state = 3;
      }
      for (let platformApiAndAuthTopicResult of (this.listeners[
        platformApiAndAuth
      ] ?? []) as Dynamic)
        platformApiAndAuthTopicResult(options ?? {});
    }
    send(platformApiAndAuth?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this._state === 1)
        if (typeof platformApiAndAuth == `string`)
          resolvePlatformApiAndAuthOPEN(
            JSON.stringify({
              op: `msg`,
              topic: this.topic,
              data: platformApiAndAuth,
            }),
          );
        else {
          let platformApiAndAuth2: Dynamic =
            platformApiAndAuth instanceof (Uint8Array as Dynamic)
              ? platformApiAndAuth
              : new (Uint8Array as Dynamic)(platformApiAndAuth);
          resolvePlatformApiAndAuthOPEN(
            updatePlatformApiAndAuthEncode(this.topic, platformApiAndAuth2),
          );
        }
    }
    close(..._extraArguments: unknown[]): undefined {
      if (this._state === 3) return;
      let platformApiAndAuth: Dynamic = platformApiAndAuthMap4.get(this.topic);
      platformApiAndAuth?.delete(this);
      if (!platformApiAndAuth || platformApiAndAuth.size === 0) {
        platformApiAndAuthMap4.delete(this.topic);
        resolvePlatformApiAndAuthOPEN(
          JSON.stringify({
            op: `unsub`,
            topic: this.topic,
          }),
        );
      }
      this.emit(`close`);
    }
  });
  (PlatformApiAndAuthPAGEGONEDETAIL = createLiveModuleNamespace({
    PAGE_GONE_DETAIL: (..._extraArguments: unknown[]) => PAGE_GONE_DETAIL,
    ackOf: (..._extraArguments: unknown[]): Dynamic => ackOf,
    apiFetcher: (..._extraArguments: unknown[]): Dynamic => apiFetcher,
    batchAckOf: (..._extraArguments: unknown[]): Dynamic => batchAckOf,
    bodyOf: (..._extraArguments: unknown[]): Dynamic => bodyOf,
    doorAt: (..._extraArguments: unknown[]): Dynamic => doorAt,
    doorLinkStats: (..._extraArguments: unknown[]): Dynamic => doorLinkStats,
    doorRoute: (..._extraArguments: unknown[]): Dynamic => doorRoute,
    httpAccessDeny: (..._extraArguments: unknown[]): Dynamic => httpAccessDeny,
    httpDoorAt: (..._extraArguments: unknown[]): Dynamic => httpDoorAt,
    httpGoneDeny: (..._extraArguments: unknown[]): Dynamic => httpGoneDeny,
    isCarrierReopening: (..._extraArguments: unknown[]): Dynamic =>
      isCarrierReopening,
    isDoorUnreachable: (..._extraArguments: unknown[]): Dynamic =>
      isDoorUnreachable,
    liveDoor: (..._extraArguments: unknown[]): Dynamic => liveDoor,
    liveDoorAt: (..._extraArguments: unknown[]): Dynamic => liveDoorAt,
    nudgeLiveDoor: (..._extraArguments: unknown[]): Dynamic => nudgeLiveDoor,
    onLiveReconnecting: (..._extraArguments: unknown[]): Dynamic =>
      onLiveReconnecting,
    onLiveReopen: (..._extraArguments: unknown[]): Dynamic => onLiveReopen,
    relayAccessDeny: (..._extraArguments: unknown[]): Dynamic => relayAccessDeny,
    relayBusyDeny: (..._extraArguments: unknown[]): Dynamic => relayBusyDeny,
    relayFaultDeny: (..._extraArguments: unknown[]): Dynamic => relayFaultDeny,
    relayGoneDeny: (..._extraArguments: unknown[]): Dynamic => relayGoneDeny,
    transportDoorOf: (..._extraArguments: unknown[]): Dynamic => transportDoorOf,
    zBatchAck: (..._extraArguments: unknown[]): Dynamic => zBatchAck,
  }));
  (PlatformApiAndAuthSafeParse = {
    safeParse: (
      platformApiAndAuthSafeParse?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      zBatchAck.safeParse(
        resolvePlatformSessionAndSourcesResults(platformApiAndAuthSafeParse),
      ),
  });
  (ackOf = (ack?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    resolvePlatformApiAndAuthStatus(
      ack,
      platformSessionAndSourcesVerdictSchema,
      `door`,
    ));
  (batchAckOf = (
    batchAck?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformApiAndAuthStatus(
      batchAck,
      PlatformApiAndAuthSafeParse,
      `door batch`,
    ));
  (doorLinkStats = resolvePlatformApiAndAuthState5);
  (nudgeLiveDoor = resolvePlatformApiAndAuthValue8);
  (apiFetcher = (
    apiFetcher2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    inFrame()
      ? Promise.reject(
          new (FrameOfflineError as Dynamic)(
            `${options?.method ?? `GET`} ${routePattern(apiFetcher2)}`,
          ),
        )
      : fetch(resolvePlatformApiAndAuthValue(apiFetcher2), options));
  (platformApiAndAuthSet4 = new (Set as Dynamic)([
    `INVALID_ARGUMENT`,
    `TOO_BIG`,
    `BAD_PAYLOAD`,
    `LOCAL`,
  ]));
  (platformApiAndAuthSet5 = new (Set as Dynamic)([
    `TOO_BIG`,
    `LOCAL`,
  ]));
  (platformApiAndAuthSet6 = new (Set as Dynamic)([
    `PERMISSION_DENIED`,
    `NOT_WRITABLE`,
    `NOT_SENDABLE`,
  ]));
  (PlatformApiAndAuthStyles2 = `You have view access to this document: it can be read here but not edited. Ask an owner for edit access.`);
  (platformApiAndAuthSet7 = new (Set as Dynamic)([
    `update`,
    `create`,
  ]));
  (platformApiAndAuthSet8 = new (Set as Dynamic)([
    `GONE`,
    `PAGE_GONE`,
    `PAGE_DELETED`,
    `DELETED`,
    `PURGED`,
  ]));
  (platformApiAndAuthSet9 = new (Set as Dynamic)([
    `FAILED_PRECONDITION`,
    `NOT_FOUND`,
  ]));
  (PAGE_GONE_DETAIL = `This document has been deleted or is no longer available.`);
  (platformApiAndAuthSet10 = new (Set as Dynamic)([
    `update`,
    `create`,
    `read`,
  ]));
  (platformApiAndAuthSet11 = new (Set as Dynamic)([
    `answer-too-large`,
    `answer-unmaskable`,
  ]));
  (platformApiAndAuthSet12 = new (Set as Dynamic)([413, 422]));
  (transportDoorOf = (transportDoor?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    async (
      transportDoor2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let { verb: transportDoor3, ...transportDoor4 }: Dynamic = transportDoor2;
      let { status: status, body: result }: Dynamic = await transportDoor
        .call(transportDoor3, transportDoor4)
        .catch((error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (isCarrierReopening(error))
            return {
              status: 0,
              body: {
                verdict: `unreachable`,
                reopens: true,
              },
            };
          let body: Dynamic = relayFaultDeny(error);
          if (body)
            return {
              status: 0,
              body: body,
            };
          let relayBusyDeny2: Dynamic = relayBusyDeny(error, transportDoor3);
          if (relayBusyDeny2) return relayBusyDeny2;
          let relayAccessDeny2: Dynamic = relayAccessDeny(error, transportDoor3);
          if (relayAccessDeny2) return relayAccessDeny2;
          let relayGoneDeny2: Dynamic = relayGoneDeny(error, transportDoor3);
          if (relayGoneDeny2) return relayGoneDeny2;
          throw error;
        });
      let result2: Dynamic = result;
      let hasTransportDoor: Dynamic = platformApiAndAuthSet7.has(transportDoor3);
      let platformApiAndAuthError: Dynamic =
        typeof result2?.verdict != `string` && status === 429
          ? resolvePlatformApiAndAuthError(result)
          : null;
      if (platformApiAndAuthError) return platformApiAndAuthError;
      if (typeof result2?.verdict != `string`) {
        if (hasTransportDoor && platformApiAndAuthSet12.has(status))
          return {
            verdict: `unreachable`,
            lost: true,
            verdictLost: true,
            status: status,
          };
        let httpAccessDeny2: Dynamic = httpAccessDeny(status, transportDoor3);
        if (httpAccessDeny2)
          return {
            ...httpAccessDeny2.body,
            status: httpAccessDeny2.status,
          };
        let httpGoneDeny2: Dynamic = httpGoneDeny(status, transportDoor3, result);
        if (httpGoneDeny2)
          return {
            ...httpGoneDeny2.body,
            status: httpGoneDeny2.status,
          };
        throw Error(`door ${status}`);
      }
      if (
        hasTransportDoor &&
        result2.verdict === `deny` &&
        typeof result2.reason == `string` &&
        platformApiAndAuthSet11.has(result2.reason)
      )
        return {
          verdict: `unreachable`,
          lost: true,
          verdictLost: true,
          ...(typeof status == `number` && status > 0
            ? {
                status: status,
              }
            : {}),
        };
      let record2: Dynamic = {
        ...result2,
        ...(typeof status == `number` && status > 0
          ? {
              status: status,
            }
          : {}),
      };
      return typeof record2.sess == `string` &&
        typeof record2.sessSecret != `string`
        ? {
            ...record2,
            sessSecret: ``,
          }
        : record2;
    });
  (platformApiAndAuthCreateUpdateReadDeleteValues = [
    `create`,
    `update`,
    `read`,
    `delete`,
    `query`,
    `access`,
    `watch`,
  ]);
  (platformApiAndAuthInternalAntsValues = [`internal`, `ants`]);
  (platformApiAndAuthProjectFileNodeRunValues = [
    `project`,
    `file`,
    `node`,
    `run`,
    `utterance`,
    `row`,
    `table`,
    `routine`,
    `enum`,
    `spec`,
    `suite`,
    `version`,
    `blob`,
    `database`,
    `access`,
    `result`,
  ]);
  (platformApiAndAuthSuiteProjectValues = [`suite`, `project`]);
  (platformApiAndAuthJsonBlobProseIronValues = [
    `json`,
    `blob`,
    `prose`,
    `iron`,
    `text`,
    `widget`,
    `database`,
  ]);
  (PlatformApiAndAuthProject = {
    project: `json`,
    file: `json`,
    node: `json`,
    run: `json`,
    utterance: `json`,
    routine: `json`,
    enum: `json`,
    spec: `json`,
    suite: `json`,
    blob: `blob`,
    database: `database`,
  });
  (PlatformApiAndAuthParent = `parent`);
  (PlatformApiAndAuthStyles3 = `$lid:`);
  (PlatformApiAndAuthStrictObject = lazyZod.strictObject({
    object: lazyZod.enum(platformApiAndAuthProjectFileNodeRunValues),
    id: lazyZod.string().min(1),
  }));
  (PlatformApiAndAuthKind = lazyZod.strictObject({
    kind: lazyZod.enum([`project`, `suite`]),
    id: lazyZod.string().min(1),
    version: lazyZod.string().min(1).optional(),
  }));
  (PlatformApiAndAuthVerb = lazyZod.strictObject({
    verb: lazyZod.enum(platformApiAndAuthCreateUpdateReadDeleteValues),
    object: lazyZod.enum(platformApiAndAuthProjectFileNodeRunValues).optional(),
    ref: PlatformApiAndAuthStrictObject.optional(),
    container: PlatformApiAndAuthKind.optional(),
    engine: lazyZod.enum(platformApiAndAuthJsonBlobProseIronValues).optional(),
    payload: lazyZod.unknown().optional(),
    branch: lazyZod.enum(platformApiAndAuthInternalAntsValues).optional(),
    $lid: lazyZod.string().min(1).optional(),
  }));
  (PlatformApiAndAuthIntendCallerError = class extends Error {
    [key: string]: Dynamic;
    rule: Dynamic;
    constructor(
      platformApiAndAuthIntendCallerError?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(options);
      this.rule = platformApiAndAuthIntendCallerError;
      this.name = `IntendCallerError`;
    }
  });
  (resolvePlatformApiAndAuthIncludes = (
    platformApiAndAuthIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthSuiteProjectValues.includes(platformApiAndAuthIncludes));
  (PlatformApiAndAuthWorldLaneError = class extends Error {
    [key: string]: Dynamic;
    constructor(
      platformApiAndAuthWorldLaneError?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        options ??
          `no live World ${platformApiAndAuthWorldLaneError} lane yet — extract the component's existing fetch funnel into src/lib/world.tsx before mounting it on the World`,
      );
      this.name = `WorldLaneError`;
    }
  });
  (resolvePlatformApiAndAuthValue10 = (
    platformApiAndAuthValue102?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformApiAndAuthValue102);
  (platformApiAndAuthPattern2 = /^([a-z]+)\/([0-9a-f]{8}-[0-9a-f]{4})$/);
  (resolvePlatformApiAndAuthMatch = (
    platformApiAndAuthMatch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match: Dynamic = platformApiAndAuthMatch.match(
      platformApiAndAuthPattern2,
    );
    return match && platformApiAndAuthProjectFileNodeRunValues.includes(match[1])
      ? match[1]
      : undefined;
  });
  (resolvePlatformApiAndAuthValue11 = (
    platformApiAndAuthValue11?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformApiAndAuthMatch(platformApiAndAuthValue11) === undefined
      ? platformApiAndAuthValue11
      : undefined);
  (PlatformApiAndAuthRead = {
    read: (
      platformApiAndAuthRead?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformApiAndAuthValue11: Dynamic =
        resolvePlatformApiAndAuthValue11(options);
      if (platformApiAndAuthValue11 === undefined) {
        let platformApiAndAuthMatch: Dynamic =
          resolvePlatformApiAndAuthMatch(options);
        return Promise.reject(
          new (PlatformApiAndAuthWorldLaneError as Dynamic)(
            `read`,
            platformApiAndAuthMatch === `file`
              ? `live file refs are path-addressed until the page-09 placement maps land — pass the v1 path verbatim, not file/<mint>`
              : `the live World read lane cannot answer '${platformApiAndAuthMatch}' refs yet — extract that family's existing fetch funnel into src/lib/world.tsx before reading it through the World`,
          ),
        );
      }
      return loadPlatformApiAndAuthHeaders(platformApiAndAuthValue11);
    },
    search: (
      platformApiAndAuthRead?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      Promise.reject(new (PlatformApiAndAuthWorldLaneError as Dynamic)(`search`)),
    children: async (
      platformApiAndAuthRead?: Dynamic,
      options?: Dynamic,
      platformApiAndAuthValue11?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (
        platformApiAndAuthRead !== `project` ||
        platformApiAndAuthValue11 !== `lobby` ||
        dependencies !== `null`
      )
        throw new (PlatformApiAndAuthWorldLaneError as Dynamic)(`children`);
      let response = await fetch(
        resolvePlatformApiAndAuthValue(`/api/v3/directory`),
      );
      if (!response.ok)
        throw Error(`project directory read failed: ${response.status}`);
      return (await response.json()).flatMap(
        (
          { id: id, ...json2 }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let safeParse: Dynamic = options.safeParse(json2);
          return safeParse.success
            ? [
                {
                  id: id,
                  v: safeParse.data,
                  room: `project/${id}`,
                },
              ]
            : [];
        },
      );
    },
    now: (..._extraArguments: unknown[]) => new Date().toISOString(),
    locale: undefined,
    timeZone: undefined,
  });
  strictObject({
    type: literal(`object`),
    object: string().min(1),
    where: strictObject({
      parent: strictObject({
        eq: strictObject({
          object: string().min(1),
          id: string().min(1),
        }).optional(),
      }).optional(),
    }).optional(),
    limit: number().int().positive().optional(),
  });
  (PlatformApiAndAuthCreateContext2 = (0, React.createContext)(
    PlatformApiAndAuthRead,
  ));
  (resolvePlatformApiAndAuthUseContext2 = (
    ..._extraArguments: unknown[]
  ): Dynamic => (0, React.useContext)(PlatformApiAndAuthCreateContext2));
  (resolvePlatformApiAndAuthXBongoUniverse = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let XBongoUniverse: Dynamic = PlatformApiAndAuthActive.getState().active;
    return XBongoUniverse
      ? {
          "X-Bongo-Universe": XBongoUniverse,
        }
      : {};
  });
  resolvePlatformApiAndAuthValue12(resolvePlatformApiAndAuthXBongoUniverse);
  (platformApiAndAuthSet13 = new (Set as Dynamic)());
  (updatePlatformApiAndAuthByteLength = (
    updatePlatformApiAndAuthByteLength2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let arrayBuffer = new ArrayBuffer(
      updatePlatformApiAndAuthByteLength2.byteLength,
    );
    new Uint8Array(arrayBuffer).set(updatePlatformApiAndAuthByteLength2);
    return arrayBuffer;
  });
  (resolvePlatformApiAndAuthJoin = (
    platformApiAndAuthJoin?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${platformApiAndAuthJoin.split(`/`).slice(0, 4).join(`/`)}/${options}`);
  (PlatformApiAndAuthState7 = resolvePlatformSessionAndSourcesUsers);
  (platformApiAndAuthValue50002 = 5e3);
  (isPlatformApiAndAuthByteLength = (
    platformApiAndAuthByteLength?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (platformApiAndAuthByteLength.byteLength !== items.length) return false;
    let uint8Array: Dynamic = new Uint8Array(platformApiAndAuthByteLength);
    for (let index = 0; index < items.length; index++)
      if (uint8Array[index] !== items[index]) return false;
    return true;
  });
  (PlatformApiAndAuthTick = create(
    (
      platformApiAndAuthTick?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      tick: 0,
      writes: [],
      touch: (..._extraArguments: unknown[]): Dynamic =>
        platformApiAndAuthTick(
          (
            platformApiAndAuthTick2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            tick: platformApiAndAuthTick2.tick + 1,
          }),
        ),
      noteWrite: (
        platformApiAndAuthTick2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformApiAndAuthTick(
          (
            platformApiAndAuthTick3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            tick: platformApiAndAuthTick3.tick + 1,
            writes: [...platformApiAndAuthTick3.writes, platformApiAndAuthTick2],
          }),
        ),
      drainWrites: (..._extraArguments: unknown[]): Dynamic => {
        let writes: Dynamic = options().writes;
        if (writes.length) {
          platformApiAndAuthTick({
            writes: [],
          });
        }
        return writes;
      },
    }),
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__fileWatchStore = PlatformApiAndAuthTick;
  }
  (resolvePlatformApiAndAuthAnchor = (
    platformApiAndAuthAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (platformApiAndAuthState7) {
      clearTimeout(platformApiAndAuthState7);
    }
    platformApiAndAuthState7 = setTimeout(
      (..._extraArguments: unknown[]) =>
        emitAction(`ui:focus`, {
          anchor: {
            path: platformApiAndAuthAnchor.path,
            ref: platformApiAndAuthAnchor.hash,
          },
        }),
      500,
    );
  });
}

export {
  PlatformApiAndAuthPAGEGONEDETAIL,
  PlatformApiAndAuthState7,
  PlatformApiAndAuthStyles3,
  PlatformApiAndAuthTick,
  ackOf,
  apiFetcher,
  batchAckOf,
  clearPlatformApiAndAuthDelete,
  clearPlatformApiAndAuthDelete2,
  clearPlatformApiAndAuthDelete3,
  collectPlatformApiAndAuthJoin,
  collectPlatformApiAndAuthJoin2,
  collectPlatformApiAndAuthVerb,
  doorLinkStats,
  isDoorUnreachable,
  isPlatformApiAndAuthHandoff,
  liveDoor,
  liveDoorAt,
  loadPlatformApiAndAuthDescription,
  loadPlatformApiAndAuthFiles,
  loadPlatformApiAndAuthFiles2,
  loadPlatformApiAndAuthMethod2,
  loadPlatformApiAndAuthRoomsEnabled,
  loadPlatformApiAndAuthValue,
  loadPlatformApiAndAuthValue2,
  nudgeLiveDoor,
  onLiveReconnecting,
  onLiveReopen,
  recordActivity,
  relayAccessDeny,
  relayFaultDeny,
  relayGoneDeny,
  resolvePlatformApiAndAuthAnchor,
  resolvePlatformApiAndAuthState5,
  resolvePlatformApiAndAuthTopic,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformApiAndAuthValue14,
  resolvePlatformApiAndAuthValue3,
  resolvePlatformApiAndAuthValue6,
  resolvePlatformApiAndAuthXBongoUniverse,
  transportDoorOf,
  updatePlatformApiAndAuthTopic,
  updatePlatformApiAndAuthTopic2,
};

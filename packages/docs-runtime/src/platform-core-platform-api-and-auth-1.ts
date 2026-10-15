/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  createStore2,
  helloCImport,
  helloXImport,
  inFrame,
  number,
  object,
  preloadTImport,
  rolldownNImport,
  string,
  useStore2,
} from "./platform-core-dependencies";
import {
  TELEMETRY_ATTRIBUTE_NAMES,
  collectObservabilityTelemetryValue,
  injectTraceparent,
  routePattern,
  withWebSpan,
} from "./platform-core-observability-telemetry-1";
import {
  lazyZod,
} from "./platform-core-data-lazy-zod";
import {
  resolvePlatformSessionAndSourcesIncludes,
} from "./platform-core-platform-session-and-sources-1";
import {
  toast,
} from "./platform-core-ui-toasts";
import {
  liveSupportCode,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  ObservabilityBrowserAndOperationEventsDefault,
  ObservabilityBrowserAndOperationEventsDisplayName,
  ObservabilityBrowserAndOperationEventsMessages,
  ObservabilityBrowserAndOperationEventsQuietAfterDays,
  PlatformApiAndAuthBONGOAPIBASE,
  PlatformApiAndAuthBONGOBASE,
  PlatformApiAndAuthBONGOWSBASE,
  resolveObservabilityBrowserAndOperationEventsValue48,
} from "./platform-core-observability-browser-and-operation-events-4";
import {
  recordActivity,
} from "./platform-core-platform-api-and-auth-2";

var resolvePlatformApiAndAuthValue: Dynamic;

var resolvePlatformApiAndAuthStartsWith: Dynamic;

var resolvePlatformApiAndAuthLocalhost: (platformApiAndAuthLocalhost?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformApiAndAuthLogError: Dynamic;

var platformApiAndAuthMap: Dynamic;

function logError(error?: Dynamic, ..._extraArguments: unknown[]): undefined {
  let enabled =
    !error.silent && error.source !== `iframe` && error.source !== `boundary`;
  let label = `${error.source}:${enabled ? `loud` : `quiet`}:${error.message}`;
  let now = Date.now();
  if (
    now - (platformApiAndAuthMap.get(label) ?? 0) < 2e3 ||
    (platformApiAndAuthMap.set(label, now),
    enabled &&
      toast.error(error.message, {
        id: `err:${error.source}:${error.path ?? error.message}`,
        description: error.detail?.slice(0, 120),
        duration: 8e3,
      }),
    typeof location === "undefined") ||
    inFrame()
  )
    return;
  let url = location.pathname + location.search + location.hash;
  preloadTImport(
    async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let { activeDebugId: activeDebugId2 }: Dynamic =
        await Promise.resolve().then(
          (..._extraArguments: unknown[]): Dynamic =>
            PlatformApiAndAuthFORCEDRELOADSIDKEY,
        );
      return {
        activeDebugId: activeDebugId2,
      };
    },
    undefined,
    import.meta.url,
  )
    .then(
      (
        { activeDebugId: activeDebugId2 }: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let Debug2: Dynamic = activeDebugId2();
        return fetch(resolvePlatformApiAndAuthValue(`/api/activity`), {
          method: `POST`,
          keepalive: true,
          headers: {
            "content-type": `application/json`,
          },
          body: JSON.stringify({
            action: `error`,
            url: url,
            ...(Debug2 && {
              _debug: Debug2,
            }),
            source: error.source,
            message: error.message,
            path: error.path,
            detail: error.detail?.slice(0, 500),
            silent: error.silent,
          }),
        });
      },
    )
    .catch((..._extraArguments: unknown[]): undefined => {});
}

var PlatformApiAndAuthFORCEDRELOADSIDKEY: Dynamic;

var PlatformApiAndAuthContainer: Dynamic;

var FORCED_RELOAD_SID_KEY: string;

var sessionId: string;

var PlatformApiAndAuthState: Dynamic;

var activeDebugId: Dynamic;

var platformApiAndAuthState: Dynamic;

var serverRev: Dynamic;

var platformApiAndAuthPattern: RegExp;

var runMetaPath: (runMetaPath2?: Dynamic, ..._extraArguments: unknown[]) => string;

var runFilePath: (runFilePath2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function correlationHeaders(..._extraArguments: unknown[]): Dynamic {
  return {
    "X-Bongo-Session": sessionId,
    "X-Client-Request-Id": liveSupportCode(),
    ...(PlatformApiAndAuthState && {
      "X-Bongo-Debug": PlatformApiAndAuthState,
    }),
  };
}

function rawReq(
  method?: Dynamic,
  options?: Dynamic,
  body?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routePattern2: Dynamic = routePattern(options);
  return inFrame()
    ? Promise.reject(
        new (helloXImport as Dynamic)(`${method} ${routePattern2}`),
      )
    : withWebSpan(
        `http.client`,
        {
          [TELEMETRY_ATTRIBUTE_NAMES.httpMethod]: method,
          [TELEMETRY_ATTRIBUTE_NAMES.httpRoute]: routePattern2,
        },
        async (
          rawReq2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => {
          let response: Dynamic = await fetch(
            resolvePlatformApiAndAuthValue(options),
            {
              method: method,
              body: body,
              headers: injectTraceparent({
                ...correlationHeaders(),
                ...(typeof body == `string` && {
                  "content-type": `application/json`,
                }),
              }),
            },
          );
          rawReq2.setTag(TELEMETRY_ATTRIBUTE_NAMES.httpStatus, response.status);
          return response;
        },
        `${method} ${routePattern2}`,
      );
}

async function loadPlatformApiAndAuthCatch(
  platformApiAndAuthCatch?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let rawReq2: Dynamic = await rawReq(`GET`, platformApiAndAuthCatch);
  if (!rawReq2.ok) {
    let result: Dynamic = await rawReq2
      .text()
      .catch((..._extraArguments: unknown[]) => ``);
    throw Error(
      `${rawReq2.status} ${rawReq2.statusText}${result ? ` — ${result.slice(0, 200)}` : ``}`,
    );
  }
  return rawReq2.arrayBuffer();
}

async function okJson(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!response.ok) {
    let result: Dynamic = await response
      .text()
      .catch((..._extraArguments: unknown[]) => ``);
    throw Error(
      `${response.status} ${response.statusText}${result ? ` — ${result.slice(0, 500)}` : ``}`,
    );
  }
  if (response.status !== 204) return response.json();
}

var resolvePlatformApiAndAuthToString: Dynamic;

var platformApiAndAuthSet: Dynamic;

var resolvePlatformApiAndAuthBusy: Dynamic;

async function requestApi(
  requestApi2?: Dynamic,
  path?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic;
  try {
    response = await rawReq(requestApi2, path, context);
  } catch (requestApiResult: Dynamic) {
    throw helloCImport(requestApiResult)
      ? requestApiResult
      : (logError({
          source: `api`,
          message: `Network error — ${requestApi2} ${path}`,
          detail: String(requestApiResult),
          silent: true,
        }),
        Object.assign(
          requestApiResult instanceof Error
            ? requestApiResult
            : Error(String(requestApiResult)),
          {
            logged: true,
          },
        ));
  }
  let headerEntry: Dynamic = response.headers.get(`x-bongo-rev`);
  if (headerEntry) {
    platformApiAndAuthState = headerEntry;
  }
  if (!response.ok) {
    let result: Dynamic = await response
      .text()
      .catch((..._extraArguments: unknown[]) => ``);
    let message = `${requestApi2} ${path} → ${response.status} ${response.statusText}`;
    let code: Dynamic;
    let serverError: Dynamic;
    let outcome: Dynamic;
    try {
      let parse: Dynamic = JSON.parse(result);
      if (typeof parse.code == `string`) {
        code = parse.code;
      }
      if (typeof parse.error == `string`) {
        serverError = parse.error;
      }
      let outcome2: Dynamic =
        parse.outcome ??
        (typeof parse.data == `object` && parse.data !== null
          ? parse.data.outcome
          : undefined);
      if (outcome2 === `unknown`) {
        outcome = outcome2;
      }
    } catch {}
    throw (
      logError({
        source: `api`,
        message: message,
        path: path,
        detail: result.slice(0, 500),
        silent:
          argument?.silent === true ||
          response.status < 500 ||
          (serverError !== undefined &&
            platformApiAndAuthSet.has(serverError)) ||
          resolvePlatformApiAndAuthBusy(response.status, serverError, code) ||
          outcome === `unknown`,
      }),
      Object.assign(Error(`${message} ${result}`), {
        logged: true,
        status: response.status,
        code: code,
        serverError: serverError,
        ...(outcome === undefined
          ? {}
          : {
              outcome: outcome,
            }),
      })
    );
  }
  if (response.status === 204) return;
  let json2: Dynamic = await response.json();
  if (!dependencies) return json2;
  let safeParse: Dynamic = dependencies.safeParse(json2);
  if (safeParse.success) return safeParse.data;
  let issueItem: Dynamic = safeParse.error.issues[0];
  logError({
    source: `api`,
    message: `Schema miss — ${requestApi2} ${path}`,
    detail: `${issueItem?.path.join(`.`)}: ${issueItem?.message}`,
    silent: true,
  });
  return json2;
}

var resolvePlatformApiAndAuthMain: (platformApiAndAuthMain?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthUsers: (platformApiAndAuthUsers?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var api: Dynamic;

var PlatformApiAndAuthPath: Dynamic;

var PlatformApiAndAuthMediaType: Dynamic;

var PlatformApiAndAuthSha: Dynamic;

var PlatformApiAndAuthPill: Dynamic;

var PlatformApiAndAuthPill2: Dynamic;

var PlatformApiAndAuthSelection: Dynamic;

var PlatformApiAndAuthAttachments: Dynamic;

function filterPlatformApiAndAuthSelection(
  filterPlatformApiAndAuthSelection2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (options.type) {
    case `select`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        selection: options.selection,
      };
    case `select-clear`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        selection: undefined,
      };
    case `select-clear-by-hash`:
      return filterPlatformApiAndAuthSelection2.selection?.path ===
        options.path &&
        filterPlatformApiAndAuthSelection2.selection?.hash === options.hash
        ? {
            ...filterPlatformApiAndAuthSelection2,
            selection: undefined,
          }
        : filterPlatformApiAndAuthSelection2;
    case `attach`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        attachments: [
          ...filterPlatformApiAndAuthSelection2.attachments,
          options.attachment,
        ],
      };
    case `attach-remove`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        attachments: filterPlatformApiAndAuthSelection2.attachments.filter(
          (
            attachment?: unknown,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => index !== options.index,
        ),
      };
    case `attach-clear`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        attachments: [],
      };
    case `selection-reset`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        selection: undefined,
        attachments: [],
      };
    case `peek`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        peek: {
          path: options.path,
          ...(options.hash === undefined
            ? {}
            : {
                hash: options.hash,
              }),
        },
      };
    case `peek-close`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        peek: undefined,
      };
    case `workspace-chat-mode`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        workspaceChatMode: options.mode,
      };
    case `home-chat-mode`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        homeChatMode: options.mode,
      };
    case `history-preview`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        historyPreview: options.preview,
      };
    case `history-preview-clear`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        historyPreview: null,
      };
    case `path-override`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        pathOverride:
          options.p === null
            ? {
                p: null,
                f: null,
              }
            : {
                ...filterPlatformApiAndAuthSelection2.pathOverride,
                p: options.p,
              },
      };
    case `path-override-file`:
      return {
        ...filterPlatformApiAndAuthSelection2,
        pathOverride: {
          ...filterPlatformApiAndAuthSelection2.pathOverride,
          f: options.f,
        },
      };
    default:
      throw Error(`tabReduce: unknown action ${JSON.stringify(options)}`);
  }
}

var filterPlatformApiAndAuthToSorted: Dynamic;

var resolvePlatformApiAndAuthSelection: Dynamic;

var resolvePlatformApiAndAuthValue2: Dynamic;

function resolvePlatformApiAndAuthState(
  platformApiAndAuthState28: Dynamic = PlatformApiAndAuthAttachments,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return createStore2(
    (
      platformApiAndAuthState29?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      state: PlatformApiAndAuthSelection.parse(platformApiAndAuthState28),
      dispatch: (
        platformApiAndAuthState30?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformApiAndAuthState29(
          (
            platformApiAndAuthState31?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let state: Dynamic = filterPlatformApiAndAuthSelection(
              platformApiAndAuthState31.state,
              platformApiAndAuthState30,
            );
            return state === platformApiAndAuthState31.state
              ? platformApiAndAuthState31
              : (options?.(platformApiAndAuthState30, state),
                {
                  state: state,
                });
          },
        ),
      restore: (
        platformApiAndAuthState30?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformApiAndAuthState29({
          state: PlatformApiAndAuthSelection.parse(platformApiAndAuthState30),
        }),
    }),
  );
}

var PlatformApiAndAuthState2: Dynamic;

var PlatformApiAndAuthCreateContext: Dynamic;

function resolvePlatformApiAndAuthUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(PlatformApiAndAuthCreateContext);
}

function resolvePlatformApiAndAuthState2(
  platformApiAndAuthState28?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return useStore2(
    resolvePlatformApiAndAuthUseContext(),
    (
      platformApiAndAuthState29?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformApiAndAuthState28(platformApiAndAuthState29.state),
  );
}

function updatePlatformApiAndAuthDeps(
  updatePlatformApiAndAuthDeps2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let metadata: Dynamic = new (WeakMap as Dynamic)();
  return (
    updatePlatformApiAndAuthDeps3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let metadataEntry: Dynamic = metadata.get(options2);
    let deps: Dynamic = updatePlatformApiAndAuthDeps2(
      updatePlatformApiAndAuthDeps3,
    );
    if (
      metadataEntry &&
      metadataEntry.deps.length === deps.length &&
      metadataEntry.deps.every(
        (dep?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
          dep === deps[index],
      )
    )
      return metadataEntry.out;
    let out2: Dynamic = options(updatePlatformApiAndAuthDeps3, options2);
    metadata.set(options2, {
      deps: deps,
      out: out2,
    });
    return out2;
  };
}

function resolvePlatformApiAndAuthState3(
  platformApiAndAuthState32?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthUseContext: Dynamic =
    resolvePlatformApiAndAuthUseContext();
  return useStore2(
    platformApiAndAuthUseContext,
    (
      platformApiAndAuthState33?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformApiAndAuthState34: Dynamic = platformApiAndAuthState32(
        platformApiAndAuthState33.state,
        platformApiAndAuthUseContext,
      );
      return options
        ? options(platformApiAndAuthState34)
        : platformApiAndAuthState34;
    },
  );
}

var resolvePlatformApiAndAuthState4: Dynamic;

var resolvePlatformApiAndAuthDispatch: Dynamic;

var resolvePlatformApiAndAuthPathOverride: Dynamic;

var getPlatformApiAndAuthPath: Dynamic;

var updatePlatformApiAndAuthPath: Dynamic;

var PlatformApiAndAuthEmitAction: Dynamic;

var platformApiAndAuthValues: Dynamic;

var platformApiAndAuthState2: Dynamic;

function resolvePlatformApiAndAuthMethod(
  ..._extraArguments: unknown[]
): undefined {
  platformApiAndAuthState2 &&=
    (clearTimeout(platformApiAndAuthState2), undefined);
  if (typeof window === "undefined")
    return void platformApiAndAuthValues.splice(0);
  if (platformApiAndAuthValues.length === 0) return;
  let body = JSON.stringify(platformApiAndAuthValues.splice(0));
  if (
    !(
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon == `function` &&
      navigator.sendBeacon(
        resolvePlatformApiAndAuthValue(`/api/activity`),
        new Blob([body], {
          type: `application/json`,
        }),
      )
    )
  ) {
    fetch(resolvePlatformApiAndAuthValue(`/api/activity`), {
      method: `POST`,
      headers: {
        "content-type": `application/json`,
      },
      body: body,
      keepalive: true,
    }).catch((..._extraArguments: unknown[]): undefined => {});
  }
}

function emitAction(
  tool?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  if (inFrame()) return;
  let Debug2: Dynamic = activeDebugId();
  platformApiAndAuthValues.push({
    tool: tool,
    ...options,
    ...(Debug2 && {
      _debug: Debug2,
    }),
  });
  platformApiAndAuthState2 ||= setTimeout(resolvePlatformApiAndAuthMethod, 2e3);
}

var platformApiAndAuthMap2: Dynamic;

function emitDebounced(
  emitDebounced2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  let platformApiAndAuthMap2Entry: Dynamic =
    platformApiAndAuthMap2.get(emitDebounced2);
  if (platformApiAndAuthMap2Entry) {
    clearTimeout(platformApiAndAuthMap2Entry);
  }
  platformApiAndAuthMap2.set(
    emitDebounced2,
    setTimeout((..._extraArguments: unknown[]): undefined => {
      platformApiAndAuthMap2.delete(emitDebounced2);
      emitAction(context, dependencies);
    }, options),
  );
}

function useActivity(..._extraArguments: unknown[]): undefined {
  let [path]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  let path2: Dynamic = getPlatformApiAndAuthPath();
  let labelRef: Dynamic = (0, React.useRef)(``);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let label = `${path}|${path2 ?? ``}`;
      if (!(path === `/` || label === labelRef.current)) {
        labelRef.current = label;
        emitAction(`ui:visit`, {
          anchor: path2
            ? {
                path: path2,
              }
            : undefined,
          params: {
            path: path,
          },
        });
      }
    },
    [path, path2],
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth1Step1(): void {
  if (typeof window !== "undefined") {
    (window as Dynamic).__BONGO_ASSET_BASE__ ??
      (window as Dynamic).__BONGO_BASE__;
  }
  `${PlatformApiAndAuthBONGOAPIBASE}`;
  (resolvePlatformApiAndAuthValue = (
    platformApiAndAuthValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthBONGOAPIBASE
      ? `${PlatformApiAndAuthBONGOAPIBASE}${platformApiAndAuthValue}`
      : platformApiAndAuthValue);
  (resolvePlatformApiAndAuthStartsWith = (
    platformApiAndAuthStarts?: Dynamic,
    items: Dynamic = PlatformApiAndAuthBONGOBASE,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items && platformApiAndAuthStarts.startsWith(items)
      ? platformApiAndAuthStarts.slice(items.length) || `/`
      : platformApiAndAuthStarts);
  (resolvePlatformApiAndAuthLocalhost = (
    platformApiAndAuthLocalhost?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let location2 = typeof location !== "undefined" ? location : undefined;
    return `${location2?.protocol === `https:` ? `wss` : `ws`}://${location2?.host ?? `localhost`}${PlatformApiAndAuthBONGOWSBASE}${platformApiAndAuthLocalhost}`;
  });
  (PlatformApiAndAuthLogError = rolldownNImport({
    logError: (..._extraArguments: unknown[]): Dynamic => logError,
  }));
  (platformApiAndAuthMap = new (Map as Dynamic)());
  (PlatformApiAndAuthFORCEDRELOADSIDKEY = rolldownNImport({
    FORCED_RELOAD_SID_KEY: (..._extraArguments: unknown[]) =>
      FORCED_RELOAD_SID_KEY,
    activeDebugId: (..._extraArguments: unknown[]): Dynamic => activeDebugId,
    api: (..._extraArguments: unknown[]): Dynamic => api,
    correlationHeaders: (..._extraArguments: unknown[]): Dynamic =>
      correlationHeaders,
    okJson: (..._extraArguments: unknown[]): Dynamic => okJson,
    rawReq: (..._extraArguments: unknown[]): Dynamic => rawReq,
    runFilePath: (..._extraArguments: unknown[]): Dynamic => runFilePath,
    runMetaPath: (..._extraArguments: unknown[]): Dynamic => runMetaPath,
    serverRev: (..._extraArguments: unknown[]): Dynamic => serverRev,
    sessionId: (..._extraArguments: unknown[]) => sessionId,
  }));
  (PlatformApiAndAuthContainer = object({
    id: string(),
    container: string(),
    displayName: string(),
    owner: string(),
    path: string(),
    mtime: number(),
  }).passthrough());
  (FORCED_RELOAD_SID_KEY = `bongo:sidBeforeForcedReload`);
  (sessionId = ((..._extraArguments: unknown[]) => {
      try {
        let item = sessionStorage.getItem(FORCED_RELOAD_SID_KEY);
        if (
          item &&
          (sessionStorage.removeItem(FORCED_RELOAD_SID_KEY),
          /^[0-9a-f]{32}$/.test(item))
        )
          return item;
      } catch {}
      return null;
    })() ??
    Array.from<Dynamic, Dynamic>(
      crypto.getRandomValues(new Uint8Array(16)),
      (sessionId2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        sessionId2.toString(16).padStart(2, `0`),
    ).join(``));
  (PlatformApiAndAuthState = null);
  (activeDebugId = (..._extraArguments: unknown[]): Dynamic =>
    PlatformApiAndAuthState);
  (serverRev = (..._extraArguments: unknown[]): Dynamic =>
    platformApiAndAuthState);
  (platformApiAndAuthPattern = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|r-[a-z0-9]+-[a-z0-9]{1,32})$/);
  (runMetaPath = (runMetaPath2?: Dynamic, ..._extraArguments: unknown[]) =>
    platformApiAndAuthPattern.test(runMetaPath2)
      ? `/api/file/runs/${runMetaPath2}/metadata.json`
      : `/api/runs/${encodeURIComponent(runMetaPath2)}`);
  (runFilePath = (
    runFilePath2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let mappedOptionsPartsText: Dynamic = options
      .split(`/`)
      .map(encodeURIComponent)
      .join(`/`);
    return platformApiAndAuthPattern.test(runFilePath2)
      ? `/api/file/runs/${runFilePath2}/${mappedOptionsPartsText}`
      : `/api/runs/${encodeURIComponent(runFilePath2)}/file/${mappedOptionsPartsText}`;
  });
  (resolvePlatformApiAndAuthToString = (
    platformApiAndAuth?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    new URLSearchParams(
      Object.entries(platformApiAndAuth).flatMap(
        (
          [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          rolldownNImportEntryEntry == null
            ? []
            : [[rolldownNImportEntry, String(rolldownNImportEntryEntry)]],
      ),
    ).toString());
  (platformApiAndAuthSet = new (Set as Dynamic)([
    `ccr_verify_failed`,
  ]));
  (resolvePlatformApiAndAuthBusy = (
    platformApiAndAuthBusy?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthBusy === 503 &&
    options === `busy` &&
    context === `ledger-busy`);
  (resolvePlatformApiAndAuthMain = (
    platformApiAndAuthMain?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `/api/${resolvePlatformSessionAndSourcesIncludes(platformApiAndAuthMain)}/versions/${options || `main`}`);
  (resolvePlatformApiAndAuthUsers = (
    platformApiAndAuthUsers?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthUsers.startsWith(`users/`)
      ? `/api/${platformApiAndAuthUsers}/workflows`
      : `${resolvePlatformApiAndAuthMain(platformApiAndAuthUsers, options)}/workflows`);
  (api = {
    health: (..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/health`),
    me: (silent: Dynamic = false, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/me`, undefined, undefined, {
        silent: silent,
      }),
    models: (..._extraArguments: unknown[]): Dynamic =>
      requestApi(
        `GET`,
        `/api/models`,
        undefined,
        ObservabilityBrowserAndOperationEventsDefault.array(),
      ),
    prefs: {
      get: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/prefs`,
          undefined,
          ObservabilityBrowserAndOperationEventsQuietAfterDays,
        ),
      put: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `PUT`,
          `/api/prefs`,
          JSON.stringify(silent),
          ObservabilityBrowserAndOperationEventsQuietAfterDays,
        ),
    },
    viewstate: {
      get: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/viewstate/${encodeURIComponent(silent)}`),
      put: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/viewstate/${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
    },
    people: {
      search: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let encodeURIComponent2 = encodeURIComponent;
        return requestApi(
          `GET`,
          `/api/people/search?q=${encodeURIComponent2(silent)}${options ? `&src=${encodeURIComponent2(options)}` : ``}${page?.pid ? `&pid=${encodeURIComponent2(page.pid)}` : ``}${page?.container ? `&container=${encodeURIComponent2(page.container)}` : ``}`,
          undefined,
          undefined,
          dependencies,
        );
      },
      agents: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/people/agents${silent ? `?container=${encodeURIComponent(silent)}` : ``}`,
        ),
      profile: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/people/profile`,
          JSON.stringify(silent),
          undefined,
          {
            silent: true,
          },
        ),
    },
    observers: {
      list: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/observers?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
      attach: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/observers`, JSON.stringify(silent)),
      createDoc: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/observers/create-doc`, JSON.stringify(silent)),
      stuck: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/observers/stuck`, JSON.stringify(silent)),
      detach: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`DELETE`, `/api/observers`, JSON.stringify(silent)),
      spawn: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/observers/spawn`, JSON.stringify(silent)),
      fanout: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/observers/fanout`, JSON.stringify(silent)),
    },
    coworkers: {
      list: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/coworkers?container=${encodeURIComponent(silent)}`,
          undefined,
          undefined,
          options,
        ),
      resolve: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/coworkers/resolve?container=${encodeURIComponent(silent)}&channel=${encodeURIComponent(options)}`,
        ),
      mention: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/coworkers/mention`, JSON.stringify(silent)),
    },
    ccSessions: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/cc-sessions`, undefined, undefined, silent),
    ccProjects: (..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/cc-projects`),
    ccMention: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`POST`, `/api/cc-sessions/mention`, JSON.stringify(silent)),
    meetBot: {
      eligibility: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/meet-bot/eligibility?project=${encodeURIComponent(silent)}`,
        ),
      invite: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/meet-bot/invite`,
          JSON.stringify({
            meetUrl: silent,
            projectSlug: options,
          }),
        ),
      transcript: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/meet-bot/${encodeURIComponent(silent)}/transcript${options ? `?after=${options}` : ``}`,
        ),
    },
    search: (
      silent?: Dynamic,
      options: Dynamic = 20,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/search?q=${encodeURIComponent(silent)}&k=${options}`,
      ),
    object: (
      silent?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/object?name=${encodeURIComponent(silent)}${options?.byId ? `&byId=1` : ``}`,
        undefined,
        ObservabilityBrowserAndOperationEventsDisplayName,
      ),
    fsMeta: {
      tree: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/fs-meta/tree?dir=${encodeURIComponent(silent)}`),
      reorder: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/reorder?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      rename: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/rename?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      move: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/move?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      folder: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/folder?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      deleteEntry: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/delete?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      lock: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/lock?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
      unlock: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/fs-meta/unlock?dir=${encodeURIComponent(silent)}`,
          JSON.stringify(options),
        ),
    },
    lfile: {
      create: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/create`,
          JSON.stringify({
            dir: silent,
            ...options,
          }),
        ),
      convert: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/convert`,
          JSON.stringify({
            dir: silent,
            ...options,
          }),
        ),
      gdocUrl: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/convert/gdoc-url?dir=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
      write: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/write`,
          JSON.stringify({
            dir: silent,
            ...options,
          }),
        ),
      widgetSession: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-session/${options}`,
          JSON.stringify({
            dir: silent,
            ...page,
          }),
        ),
      widgetCreate: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-create`,
          JSON.stringify({
            dir: silent,
            ...options,
          }),
        ),
      widgetRunMessage: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-run/message`,
          JSON.stringify({
            dir: silent,
            ...options,
          }),
        ),
      widgetBundle: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-bundle?container=${encodeURIComponent(silent)}&fsEntryId=${encodeURIComponent(options)}&nodeId=${encodeURIComponent(page)}`,
        ),
      widgetWrite: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-write`,
          JSON.stringify({
            container: silent,
            fsEntryId: options,
            nodeId: page,
            ...dependencies,
          }),
        ),
      widgetInvoke: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-invoke`,
          JSON.stringify({
            container: silent,
            fsEntryId: options,
            nodeId: page,
            ...dependencies,
          }),
        ),
      widgetLog: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/widget-log`,
          JSON.stringify({
            container: silent,
            nodeId: options,
            level: page,
            message: dependencies,
          }),
        ),
      widgetLineage: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-lineage?container=${encodeURIComponent(silent)}&ref=${encodeURIComponent(options)}`,
        ),
      widgetRoutineRead: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-routine-read?container=${encodeURIComponent(silent)}&routine=${encodeURIComponent(options)}`,
        ),
      widgetRoutineResult: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-routine-result?container=${encodeURIComponent(silent)}&routine=${encodeURIComponent(options)}`,
        ),
      widgetRunResult: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-run-result?container=${encodeURIComponent(silent)}&run=${encodeURIComponent(options)}`,
        ),
      widgetRoutineStamp: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-routine-stamp?container=${encodeURIComponent(silent)}&routine=${encodeURIComponent(options)}`,
        ),
      widgetFileRead: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-file-read?container=${encodeURIComponent(silent)}&fileId=${encodeURIComponent(options)}`,
        ),
      widgetNodeState: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-node-state?container=${encodeURIComponent(silent)}&fsEntryId=${encodeURIComponent(options)}&nodeId=${encodeURIComponent(page)}`,
        ),
      widgetNodeLog: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-node-log?container=${encodeURIComponent(silent)}&fsEntryId=${encodeURIComponent(options)}&nodeId=${encodeURIComponent(page)}`,
        ),
      widgetXlsxRange: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/lfile/widget-xlsx-range?container=${encodeURIComponent(silent)}&fileId=${encodeURIComponent(options)}&sheet=${encodeURIComponent(page)}&range=${encodeURIComponent(dependencies)}`,
        ),
      blobPut: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/lfile/${encodeURIComponent(options)}/blob?dir=${encodeURIComponent(silent)}`,
          page,
        ),
      blobGet: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadPlatformApiAndAuthCatch(
          `/api/lfile/${encodeURIComponent(options)}/blob/${page}?dir=${encodeURIComponent(silent)}`,
        ),
    },
    blob: {
      put: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/blob`, silent),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadPlatformApiAndAuthCatch(
          `/api/blob/${encodeURIComponent(options)}?container=${encodeURIComponent(silent)}`,
        ),
      getSha: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        loadPlatformApiAndAuthCatch(`/api/blob/${encodeURIComponent(silent)}`),
    },
    ldoc: {
      run: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${silent}/ldoc/run`,
          JSON.stringify({
            ref: options,
            params: page,
          }),
        ),
    },
    chat: {
      get: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/chat?${resolvePlatformApiAndAuthToString({
            after: silent || null,
          })}`,
          undefined,
          ObservabilityBrowserAndOperationEventsMessages,
        ),
      post: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/chat/message`,
          JSON.stringify({
            text: silent,
            ...options,
          }),
        ),
      runs: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/chat/runs`),
      stop: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/chat/stop`,
          JSON.stringify({
            runId: silent,
          }),
        ),
    },
    projects: {
      list: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/projects`,
          undefined,
          ObservabilityBrowserAndOperationEventsDisplayName.array(),
        ),
      recentFiles: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/recent-files`,
          undefined,
          PlatformApiAndAuthContainer.array(),
        ),
      trash: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/projects/trash`,
          undefined,
          ObservabilityBrowserAndOperationEventsDisplayName.array(),
        ),
      restore: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/restore`,
        ),
      purge: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `DELETE`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/permanent`,
        ),
      create: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/projects`,
          JSON.stringify({
            name: silent,
          }),
          ObservabilityBrowserAndOperationEventsDisplayName,
        ),
      suggestName: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/suggestions/project-name?prompt=${encodeURIComponent(silent)}`,
        )
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.name,
          )
          .catch((..._extraArguments: unknown[]) => ``),
      rename: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/rename`,
          JSON.stringify({
            name: options,
          }),
        ),
      duplicate: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/duplicate`,
          JSON.stringify({
            name: options,
          }),
        ),
      remove: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `DELETE`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}`,
        ),
      versions: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/versions`,
        ),
      setState: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/metadata`,
          JSON.stringify({
            state: options,
            dryRun: page?.dryRun,
          }),
        ),
      claimOwnership: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/metadata`,
          JSON.stringify({
            owner: options,
          }),
        ),
      claimOwnershipById: (
        silent?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/v3/project/${encodeURIComponent(silent)}/claim-ownership`,
        ),
      writeStore: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/write-store`,
        ),
      acl: {
        list: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          requestApi(
            `GET`,
            `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/acl`,
          ),
        set: (
          silent?: Dynamic,
          options?: Dynamic,
          page?: Dynamic,
          dependencies?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          requestApi(
            `POST`,
            `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/acl`,
            JSON.stringify({
              principal: options,
              role: page,
              dryRun: dependencies?.dryRun,
            }),
          ),
        convertState: (
          silent?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          requestApi(
            `POST`,
            `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/acl/convert-state`,
            JSON.stringify({
              dryRun: options?.dryRun,
            }),
          ),
        remove: (
          silent?: Dynamic,
          options?: Dynamic,
          page?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          requestApi(
            `DELETE`,
            `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/acl/${encodeURIComponent(options)}` +
              (page?.confirmSelfLockout ? `?confirmSelfLockout=1` : ``),
          ),
        convert: (
          silent?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          requestApi(
            `POST`,
            `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/acl/convert`,
            JSON.stringify({
              principal: options,
            }),
          ),
      },
      copy: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/copy`,
          `{}`,
        ),
      renameVersion: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/versions/${encodeURIComponent(options)}/rename`,
          JSON.stringify({
            to: page,
          }),
        ),
      dirty: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `${resolvePlatformApiAndAuthMain(silent, options)}/dirty`,
        ),
      discard: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthMain(silent, options)}/discard`,
          `{}`,
        ),
      files: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `${resolvePlatformApiAndAuthMain(silent, options)}/files`,
        ),
      log: (
        silent?: Dynamic,
        options?: Dynamic,
        page: Dynamic = 20,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `${resolvePlatformApiAndAuthMain(silent, options)}/log?n=${page}`,
        ),
      revert: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthMain(silent, options)}/revert`,
          JSON.stringify({
            sha: page,
          }),
        ),
      addVersion: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/versions`,
          JSON.stringify({
            version: options,
            ...page,
          }),
        ),
      removeVersion: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `DELETE`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/versions/${encodeURIComponent(options)}`,
        ),
      merge: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/versions/${encodeURIComponent(options)}/merge`,
          JSON.stringify(page),
        ),
    },
    functions: {
      list: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/functions?${resolvePlatformApiAndAuthToString({
            container: silent,
          })}`,
        ),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/functions/${encodeURIComponent(options)}?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
        ),
      run: (
        silent?: Dynamic,
        options?: Dynamic,
        page: Dynamic = {},
        dependencies: Dynamic = false,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/functions/${encodeURIComponent(options)}/run?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify({
            params: page,
            ...(dependencies && {
              confirmOverwrite: dependencies,
            }),
          }),
        ),
      patch: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PATCH`,
          `/api/functions/${encodeURIComponent(options)}?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify(page),
        ),
      remove: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `DELETE`,
          `/api/functions/${encodeURIComponent(options)}?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
        ),
      schedulePreview: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/functions/${encodeURIComponent(options)}/schedule-preview?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
        ),
      approveSchedule: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/functions/${encodeURIComponent(options)}/approve-schedule?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify({
            expectedRev: page,
          }),
        ),
      revokeSchedule: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/functions/${encodeURIComponent(options)}/revoke-schedule?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify({}),
        ),
      approveBody: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/functions/${encodeURIComponent(options)}/approve-body?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify({
            expectedBodyHash: page,
          }),
        ),
      versions: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/functions/${encodeURIComponent(options)}/versions?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
        ),
      runs: (
        silent?: Dynamic,
        options?: Dynamic,
        page: Dynamic = 50,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/runs?${resolvePlatformApiAndAuthToString({
            project: silent,
            runner: `dispatcher`,
            name: options,
            limit: String(page),
          })}`,
        ),
    },
    agents: {
      list: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/me/agents?${resolvePlatformApiAndAuthToString({
            container: silent,
          })}`,
        ),
      get: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/me/agents/${silent}`),
      create: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/me/agents`, JSON.stringify(silent)),
      patch: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(`PATCH`, `/api/me/agents/${silent}`, JSON.stringify(options)),
      remove: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`DELETE`, `/api/me/agents/${silent}`),
      run: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/me/agents/${silent}/run`,
          options ? JSON.stringify(options) : `{}`,
        ),
      runs: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/me/agents/${silent}/runs`),
    },
    topics: {
      list: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/tables?${resolvePlatformApiAndAuthToString({
            container: silent,
            kind: options,
          })}`,
        ),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/topics?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
      upsert: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/topics?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
          JSON.stringify(page),
        ),
      patchState: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/topics?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
          JSON.stringify({
            ops: page,
          }),
        ),
      refresh: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/topics/refresh?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
    },
    tables: {
      list: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/tables?${resolvePlatformApiAndAuthToString({
            container: silent,
            kind: options,
          })}`,
        ),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/tables?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
      upsert: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/topics?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
          JSON.stringify(page),
        ),
      patchState: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/topics?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
          JSON.stringify({
            ops: page,
          }),
        ),
      refresh: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/topics/refresh?container=${encodeURIComponent(silent)}&path=${encodeURIComponent(options)}`,
        ),
    },
    types: {
      define: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/types/${encodeURIComponent(options)}?${resolvePlatformApiAndAuthToString(
            {
              container: silent,
            },
          )}`,
          JSON.stringify(page),
        ),
    },
    actions: {
      list: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/actions?${resolvePlatformApiAndAuthToString(silent)}`,
        ),
      get: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/actions/${silent}`),
      head: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/actions/${silent}?head=1`),
      tree: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/actions/${encodeURIComponent(silent)}?tree=1`),
      ship: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/actions/${encodeURIComponent(silent)}/ship`,
          options === undefined
            ? undefined
            : JSON.stringify({
                fromV: options,
              }),
        ),
      revert: (
        silent?: Dynamic,
        options: Dynamic = {},
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/actions/${silent}/revert${options.tree ? `?tree=1` : ``}`,
        ),
      restore: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/actions/${silent}/restore`),
      dismiss: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/actions/${encodeURIComponent(silent)}/dismiss`,
          JSON.stringify({
            text: options,
          }),
        ),
      feedback: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/actions/${silent}/feedback`,
          JSON.stringify(options),
        ),
      artifact: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        rawReq(`GET`, `/api/actions/${silent}/artifact/${options}`).then(
          (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if (!response.ok) throw Error(`${response.status}`);
            return response.arrayBuffer();
          },
        ),
      save: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PATCH`,
          `/api/actions/${silent}`,
          JSON.stringify({
            params: options,
          }),
        ),
      patch: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(`PATCH`, `/api/actions/${silent}`, JSON.stringify(options)),
    },
    pageAliases: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/page-aliases?rel=${encodeURIComponent(silent)}`),
    v3FileHistory: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/project/${encodeURIComponent(silent)}/file/${encodeURIComponent(options)}/history${page?.before === undefined ? `` : `?before=${page.before}`}`,
      ),
    v3FileAt: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/project/${encodeURIComponent(silent)}/file/${encodeURIComponent(options)}/at/${page}`,
      ),
    v3FileRestore: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `POST`,
        `/api/v3/project/${encodeURIComponent(silent)}/file/${encodeURIComponent(options)}/restore/${page}`,
      ),
    v3Directory: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/v3/directory`, undefined, undefined, silent),
    v3DirectoryOrg: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/v3/directory/org`, undefined, undefined, silent),
    v3Recents: (..._extraArguments: unknown[]): Dynamic =>
      requestApi(`GET`, `/api/v3/recents`),
    v3WidgetDraftProjection: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/widget/${encodeURIComponent(silent)}/${encodeURIComponent(options)}/${encodeURIComponent(page)}/draft-projection`,
      ),
    manifestWidgetFilmBundle: (
      silent?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `POST`,
        `/manifest-widget-bundle`,
        JSON.stringify({
          code: silent,
          pub: options,
        }),
      ),
    manifestFilmBlob: (
      silent?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(`GET`, `/manifest-film-blob/${encodeURIComponent(silent)}`),
    manifestFilmBlobBytes: (
      silent?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadPlatformApiAndAuthCatch(
        `/manifest-film-blob/${encodeURIComponent(silent)}`,
      ),
    v3WidgetProvenance: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/widget/${encodeURIComponent(silent)}/${encodeURIComponent(options)}/${encodeURIComponent(page)}/provenance`,
      ),
    v3WidgetTrail: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/widget/${encodeURIComponent(silent)}/${encodeURIComponent(options)}/${encodeURIComponent(page)}/trail` +
          (dependencies === undefined ? `` : `?before=${dependencies}`),
      ),
    v3WidgetMount: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `POST`,
        `/api/v3/widget/${encodeURIComponent(silent)}/${encodeURIComponent(options)}/${encodeURIComponent(page)}/mount`,
      ),
    v3WidgetData: (
      silent?: Dynamic,
      options?: Dynamic,
      page?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `POST`,
        `/api/v3/widget/${encodeURIComponent(silent)}/${encodeURIComponent(options)}/${encodeURIComponent(page)}/data`,
        JSON.stringify(dependencies),
      ),
    v3RoutineStamp: (
      silent?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/project/${encodeURIComponent(silent)}/routine-stamp/${encodeURIComponent(options)}`,
      ),
    v3Databases: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(
        `GET`,
        `/api/v3/project/${encodeURIComponent(silent)}/databases`,
      ),
    comments: {
      create: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/comments`, JSON.stringify(silent)),
      edit: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PATCH`,
          `/api/comments/${silent}`,
          JSON.stringify({
            body: options,
          }),
        ),
      remove: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`DELETE`, `/api/comments/${silent}`),
      resolve: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/comments/${silent}/resolve`,
          JSON.stringify(options ?? {}),
        ),
      reopen: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/comments/${silent}/reopen`),
      unanchor: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/comments/${silent}/unanchor`),
      accept: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/comments/${silent}/accept`),
      react: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/comments/${silent}/react`,
          JSON.stringify({
            emoji: options,
          }),
        ),
      reactAt: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/comments/react-at`, JSON.stringify(silent)),
      list: async (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> =>
        (
          await preloadTImport(
            async (..._extraArguments: unknown[]): Promise<Dynamic> => {
              let { listCommentsUnder: listCommentsUnder }: Dynamic =
                await import("./platform-lazy").then(
                  (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    result.n,
                );
              return {
                listCommentsUnder: listCommentsUnder,
              };
            },
            collectObservabilityTelemetryValue([4, 1, 2, 5]),
            import.meta.url,
          )
        ).listCommentsUnder(silent, options, page),
      thread: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/comments/${silent}`),
    },
    docxOps: {
      status: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/${silent}/ops?${resolvePlatformApiAndAuthToString({
            container: options,
            fsEntryId: page,
          })}`,
        ),
      append: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(`POST`, `/api/${silent}/ops`, JSON.stringify(options)),
    },
    notifications: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(
        `GET`,
        `/api/notifications?${resolvePlatformApiAndAuthToString({
          since: silent,
        })}`,
      ),
    event: (silent?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void rawReq(`POST`, `/api/events`, JSON.stringify(silent)).catch(
        (..._extraArguments: unknown[]): undefined => {},
      ),
    feedback: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      requestApi(`POST`, `/api/feedback`, JSON.stringify(silent)),
    cosTranscript: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      rawReq(`GET`, `/api/chat/transcript/${encodeURIComponent(silent)}`).then(
        (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          response.ok ? response.text() : Promise.reject(response.status),
      ),
    workflows: {
      list: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(`GET`, resolvePlatformApiAndAuthUsers(silent, options)),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}`,
        ),
      put: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}`,
          JSON.stringify(dependencies),
        ),
      remove: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `DELETE`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}`,
        ),
      rename: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}/rename`,
          JSON.stringify({
            newName: dependencies,
          }),
        ),
      run: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}/run`,
          `{}`,
        ),
      syncRun: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}/sync`,
          JSON.stringify({
            runId: dependencies,
          }),
        ),
      loadRun: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `${resolvePlatformApiAndAuthUsers(silent, options)}/${encodeURIComponent(page)}/load`,
          JSON.stringify({
            runId: dependencies,
          }),
        ),
    },
    debug: {
      list: (silent: Dynamic = {}, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/debug?${resolvePlatformApiAndAuthToString(silent)}`,
        ),
    },
    runs: {
      list: (silent: Dynamic = ``, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/runs?${silent}`),
      get: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, runMetaPath(silent)),
      undo: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/runs/${silent}/undo`),
      file: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        rawReq(`GET`, runFilePath(silent, options)).then(
          (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if (!response.ok) throw Error(`${response.status}`);
            return response.arrayBuffer();
          },
        ),
    },
    proposals: {
      list: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/proposals`,
        ),
      get: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/proposals/${options}`,
        ),
      create: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/proposals`,
          JSON.stringify(options),
        ),
      merge: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/proposals/${options}/merge`,
          `{}`,
        ),
      close: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/${resolvePlatformSessionAndSourcesIncludes(silent)}/proposals/${options}/close`,
          `{}`,
        ),
      suggest: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/suggestions/branch-name?project=${encodeURIComponent(resolvePlatformSessionAndSourcesIncludes(silent))}&source=${encodeURIComponent(options)}`,
        ).catch((..._extraArguments: unknown[]) => ({
          title: ``,
          description: ``,
        })),
    },
    skills: {
      list: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/skills`),
    },
    suggestions: {
      askPreview: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/suggestions/ask-preview`,
          JSON.stringify(silent),
        ),
      proofread: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/suggestions/proofread`, JSON.stringify(silent)),
    },
    claudeAuth: {
      status: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/auth/claude/status`),
      start: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/auth/claude/start`,
          JSON.stringify({
            next: silent,
          }),
        ),
      disconnect: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/auth/claude/disconnect`, `{}`),
      reconnect: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`POST`, `/api/auth/claude/reconnect`, `{}`),
      connectors: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/auth/claude/connectors`),
      enabled: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/auth/claude/connectors/enabled`),
      setEnabled: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `PUT`,
          `/api/auth/claude/connectors/enabled`,
          JSON.stringify({
            ids: silent,
            trigger: options,
          }),
        ),
    },
    connectors: {
      list: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/connectors`),
      status: (
        silent?: Dynamic,
        options: Dynamic = {},
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/connectors/${encodeURIComponent(silent)}/status?${resolvePlatformApiAndAuthToString(
            {
              fresh: options.fresh ? 1 : null,
            },
          )}`,
        ),
      connectUrl: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/connectors/${encodeURIComponent(silent)}/connect-url`,
        ),
      reauthDismiss: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/connectors/${encodeURIComponent(silent)}/reauth-dismiss`,
        ),
      call: (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `POST`,
          `/api/connectors/${encodeURIComponent(silent)}/call`,
          JSON.stringify({
            tool_name: options,
            arguments: page,
          }),
        ),
    },
    data: {
      bq: {
        query: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          requestApi(`POST`, `/api/data/bq/query`, JSON.stringify(silent)),
      },
      listTools: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/data/${silent}/tools`),
      gdriveName: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `GET`,
          `/api/data/gdrive-name?id=${encodeURIComponent(silent)}`,
        )
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.name,
          )
          .catch((..._extraArguments: unknown[]) => null),
    },
    files: {
      diffSummary: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        requestApi(
          `GET`,
          `/api/diff-summary?left=${encodeURIComponent(silent)}&right=${encodeURIComponent(options)}`,
        ),
      at: (
        silent?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        rawReq(
          `GET`,
          `/api/file-at?${resolvePlatformApiAndAuthToString({
            rel: silent,
            ...options,
          })}`,
        ).then((response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (!response.ok) throw Error(`${response.status}`);
          return response.text();
        }),
      upload: async (
        silent?: Dynamic,
        options?: Dynamic,
        page?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        let encodeURIComponent2: Dynamic = options.reduce(
          (
            accumulator?: Dynamic,
            rolldownRImport2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => accumulator + rolldownRImport2.file.size,
          0,
        );
        let count: Dynamic = 0;
        let entries: Dynamic = [];
        let apiHandler: Dynamic = (
          api2?: Dynamic,
          options2?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          new (Promise as Dynamic)(
            (
              resolve?: Dynamic,
              reject?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let xMLHttpRequest: Dynamic = new (XMLHttpRequest as Dynamic)();
              xMLHttpRequest.upload.onprogress = (
                api3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => page?.(count + api3.loaded, encodeURIComponent2);
              xMLHttpRequest.onload = (
                ..._extraArguments: unknown[]
              ): undefined => {
                if (xMLHttpRequest.status < 300) {
                  resolve(xMLHttpRequest.responseText);
                } else {
                  reject(
                    Error(
                      `${api2} → ${xMLHttpRequest.status} ${xMLHttpRequest.statusText}`,
                    ),
                  );
                }
              };
              xMLHttpRequest.onerror = (..._extraArguments: unknown[]): Dynamic =>
                reject(Error(`${api2} → network error`));
              xMLHttpRequest.open(context ? `PUT` : `POST`, api2);
              for (let [apiResult, apiResult2] of Object.entries(
                context ?? {},
              ) as Dynamic)
                xMLHttpRequest.setRequestHeader(apiResult, apiResult2);
              xMLHttpRequest.send(options2);
            },
          );
        let written: Dynamic = [];
        for (let { path: path, file: apiResult } of options as Dynamic) {
          if (apiResult.size > 20 * 1024 * 1024) {
            let contentType: Dynamic =
              apiResult.type || `application/octet-stream`;
            let requestApi2: Dynamic = await requestApi(
              `POST`,
              `/api/upload-url`,
              JSON.stringify({
                dir: silent,
                path: path,
                contentType: contentType,
              }),
            );
            if (`url` in requestApi2) {
              await apiHandler(requestApi2.url, apiResult, {
                "Content-Type": contentType,
              });
              let requestApi3: Dynamic = await requestApi(
                `POST`,
                `/api/upload-complete`,
                JSON.stringify({
                  dir: silent,
                  path: path,
                  tmpKey: requestApi2.tmpKey,
                  noNudge: dependencies?.noNudge,
                  dest: dependencies?.dest,
                }),
              );
              entries = requestApi3.entries;
              (written.push as Dynamic)(...requestApi3.written);
              count += apiResult.size;
              page?.(count, encodeURIComponent2);
              continue;
            }
          }
          let label = dependencies?.noNudge ? `&noNudge=1` : ``;
          let label2 = dependencies?.dest
            ? `&dest=${encodeURIComponent(dependencies.dest)}`
            : ``;
          let platformApiAndAuthValue: Dynamic = resolvePlatformApiAndAuthValue(
            `/api/upload?dir=${encodeURIComponent(silent)}&path=${encodeURIComponent(path)}${label}${label2}`,
          );
          let parse: Dynamic = JSON.parse(
            await apiHandler(platformApiAndAuthValue, apiResult),
          );
          entries = parse.entries;
          (written.push as Dynamic)(...parse.written);
          count += apiResult.size;
          page?.(count, encodeURIComponent2);
        }
        return {
          written: written,
          entries: entries,
        };
      },
    },
    dev: {
      library: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/dev/library`),
      build: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/dev/build`,
          JSON.stringify({
            stack: silent,
          }),
        ),
      reset: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(
          `POST`,
          `/api/dev/reset`,
          JSON.stringify({
            name: silent,
          }),
        ),
      tree: (..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/dev/tree`),
      file: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`GET`, `/api/dev/file?path=${encodeURIComponent(silent)}`),
    },
    transcript: async (
      silent?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let options: Dynamic = await rawReq(
        `GET`,
        `/api/chat/transcript/${encodeURIComponent(silent)}`,
      );
      if (!options.ok)
        throw Object.assign(
          Error(`GET /api/chat/transcript/${silent} → ${options.status}`),
          {
            status: options.status,
          },
        );
      let page: Dynamic = await options.text();
      let dependencies: Dynamic = [];
      for (let apiResult of page.split(`
`) as Dynamic)
        if (apiResult)
          try {
            dependencies.push(JSON.parse(apiResult));
          } catch {}
      return dependencies;
    },
    staging: {
      put: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        fetch(resolvePlatformApiAndAuthValue(`/api/staging`), {
          method: `POST`,
          body: silent,
          headers: {
            "x-filename": silent.name,
            "X-Bongo-Session": sessionId,
          },
        }).then(
          async (
            response?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            if (!response.ok)
              throw Error(`POST /api/staging → ${response.status}`);
            return response.json();
          },
        ),
      discard: (silent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        requestApi(`DELETE`, `/api/staging/${encodeURIComponent(silent)}`),
    },
  });
  (PlatformApiAndAuthPath = lazyZod.strictObject({
    path: lazyZod.string(),
    hash: lazyZod.string(),
    text: lazyZod.string().optional(),
    block: lazyZod.string().nullable().optional(),
  }));
  (PlatformApiAndAuthMediaType = lazyZod.strictObject({
    name: lazyZod.string(),
    mediaType: lazyZod.string(),
    path: lazyZod.string(),
  }));
  (PlatformApiAndAuthSha = lazyZod.strictObject({
    id: lazyZod.string(),
    sha: lazyZod.string(),
    path: lazyZod.string(),
    prevPath: lazyZod.string().nullable(),
    at: lazyZod.string(),
    tool: lazyZod.string(),
    isCurrent: lazyZod.boolean(),
    prevSha: lazyZod.string().nullable(),
    upto: lazyZod.number().optional(),
    base: lazyZod
      .union([
        lazyZod.strictObject({
          rev: lazyZod.number(),
        }),
        lazyZod.strictObject({
          upto: lazyZod.number(),
        }),
        lazyZod.literal(`first`),
        lazyZod.literal(`empty`),
        lazyZod.literal(`none`),
        lazyZod.literal(`older`),
      ])
      .nullable()
      .optional(),
    group: lazyZod
      .strictObject({
        count: lazyZod.number().int().min(2),
        since: lazyZod.string(),
        base: lazyZod
          .union([
            lazyZod.strictObject({
              rev: lazyZod.number(),
            }),
            lazyZod.strictObject({
              upto: lazyZod.number(),
            }),
            lazyZod.literal(`first`),
            lazyZod.literal(`empty`),
            lazyZod.literal(`none`),
            lazyZod.literal(`older`),
          ])
          .nullable(),
      })
      .optional(),
  }));
  (PlatformApiAndAuthPill = lazyZod.enum([
    `pill`,
    `floating`,
    `docked`,
  ]));
  (PlatformApiAndAuthPill2 = lazyZod.enum([
    `pill`,
    `floating`,
    `docked`,
    `create`,
  ]));
  (PlatformApiAndAuthSelection = lazyZod.strictObject({
    selection: PlatformApiAndAuthPath.optional(),
    attachments: lazyZod.array(PlatformApiAndAuthMediaType),
    peek: lazyZod
      .strictObject({
        path: lazyZod.string(),
        hash: lazyZod.string().optional(),
      })
      .optional(),
    workspaceChatMode: PlatformApiAndAuthPill,
    homeChatMode: PlatformApiAndAuthPill2,
    historyPreview: PlatformApiAndAuthSha.nullable(),
    pathOverride: lazyZod.strictObject({
      p: lazyZod.string().nullable(),
      f: lazyZod.string().nullable(),
    }),
  }));
  (PlatformApiAndAuthAttachments = {
    attachments: [],
    workspaceChatMode: `pill`,
    homeChatMode: `pill`,
    historyPreview: null,
    pathOverride: {
      p: null,
      f: null,
    },
  });
  lazyZod.discriminatedUnion(`type`, [
    lazyZod.strictObject({
      type: lazyZod.literal(`select`),
      selection: PlatformApiAndAuthPath,
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`select-clear`),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`select-clear-by-hash`),
      path: lazyZod.string(),
      hash: lazyZod.string(),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`attach`),
      attachment: PlatformApiAndAuthMediaType,
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`attach-remove`),
      index: lazyZod.number().int(),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`attach-clear`),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`selection-reset`),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`peek`),
      path: lazyZod.string(),
      hash: lazyZod.string().optional(),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`peek-close`),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`workspace-chat-mode`),
      mode: PlatformApiAndAuthPill,
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`home-chat-mode`),
      mode: PlatformApiAndAuthPill2,
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`history-preview`),
      preview: PlatformApiAndAuthSha,
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`history-preview-clear`),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`path-override`),
      p: lazyZod.string().nullable(),
    }),
    lazyZod.strictObject({
      type: lazyZod.literal(`path-override-file`),
      f: lazyZod.string().nullable(),
    }),
  ]);
  (filterPlatformApiAndAuthToSorted = (
    filterPlatformApiAndAuth?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (Array.isArray(filterPlatformApiAndAuth))
      return filterPlatformApiAndAuth.map(filterPlatformApiAndAuthToSorted);
    if (typeof filterPlatformApiAndAuth == `object` && filterPlatformApiAndAuth) {
      let filterPlatformApiAndAuth2: Dynamic = filterPlatformApiAndAuth;
      return Object.fromEntries(
        Object.keys(filterPlatformApiAndAuth2)
          .filter(
            (
              filterPlatformApiAndAuthKey?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              filterPlatformApiAndAuth2[filterPlatformApiAndAuthKey] !==
              undefined,
          )
          .toSorted()
          .map(
            (toSorted?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
              toSorted,
              filterPlatformApiAndAuthToSorted(
                filterPlatformApiAndAuth2[toSorted],
              ),
            ],
          ),
      );
    }
    return filterPlatformApiAndAuth;
  });
  (resolvePlatformApiAndAuthSelection = (
    platformApiAndAuthSelection?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let parse: Dynamic = PlatformApiAndAuthSelection.parse(
      platformApiAndAuthSelection,
    );
    if (parse.selection) {
      delete parse.selection.block;
    }
    return JSON.stringify(filterPlatformApiAndAuthToSorted(parse));
  });
  (resolvePlatformApiAndAuthValue2 = (
    platformApiAndAuthValue22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthSelection.parse(JSON.parse(platformApiAndAuthValue22)));
  (PlatformApiAndAuthState2 = resolvePlatformApiAndAuthState(
    PlatformApiAndAuthAttachments,
  ));
  (PlatformApiAndAuthCreateContext = (0, React.createContext)(
    PlatformApiAndAuthState2,
  ));
  PlatformApiAndAuthCreateContext.Provider;
  (resolvePlatformApiAndAuthState4 = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformApiAndAuthState2.getState().state);
  (resolvePlatformApiAndAuthDispatch = (
    platformApiAndAuthDispatch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthState2.getState().dispatch(platformApiAndAuthDispatch));
  if (typeof window !== "undefined") {
    (window as Dynamic).__tabStateStore = {
      store: PlatformApiAndAuthState2,
      capture: (..._extraArguments: unknown[]): Dynamic =>
        resolvePlatformApiAndAuthSelection(resolvePlatformApiAndAuthState4()),
      restore: (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        PlatformApiAndAuthState2.getState().restore(
          resolvePlatformApiAndAuthValue2(callback),
        ),
    };
  }
  (resolvePlatformApiAndAuthPathOverride = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformApiAndAuthState4().pathOverride.p ??
    (typeof location === "undefined"
      ? `/`
      : resolvePlatformApiAndAuthStartsWith(location.pathname)));
  (getPlatformApiAndAuthPath = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformApiAndAuthState28: Dynamic = resolvePlatformApiAndAuthState2(
      (
        platformApiAndAuthPath?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformApiAndAuthPath.pathOverride.f,
    );
    if (!(typeof location === "undefined"))
      return (
        new URLSearchParams(location.search).get(`path`) ??
        platformApiAndAuthState28 ??
        undefined
      );
  });
  (updatePlatformApiAndAuthPath = (..._extraArguments: unknown[]) => {
    let { p: pathOverride, f: pathOverride2 }: Dynamic =
      resolvePlatformApiAndAuthState4().pathOverride;
    if (typeof location === "undefined") return `/`;
    if (!pathOverride)
      return (
        resolvePlatformApiAndAuthStartsWith(location.pathname) +
        location.search +
        location.hash
      );
    let query = new URLSearchParams(location.search);
    if (pathOverride2) {
      query.set(`path`, pathOverride2);
    }
    let queryText = query.toString();
    return pathOverride + (queryText ? `?${queryText}` : ``) + location.hash;
  });
  (PlatformApiAndAuthEmitAction = rolldownNImport({
    emitAction: (..._extraArguments: unknown[]): Dynamic => emitAction,
    emitDebounced: (..._extraArguments: unknown[]): Dynamic => emitDebounced,
    recordActivity: (..._extraArguments: unknown[]): Dynamic => recordActivity,
    useActivity: (..._extraArguments: unknown[]): Dynamic => useActivity,
  }));
  (platformApiAndAuthValues = []);
  if (typeof document !== "undefined") {
    document.addEventListener(
      `visibilitychange`,
      (..._extraArguments: unknown[]): undefined => {
        if (document.visibilityState === `hidden`) {
          emitAction(`ui:blur`);
          resolvePlatformApiAndAuthMethod();
        }
      },
    );
  }
  (platformApiAndAuthMap2 = new (Map as Dynamic)());
}

export {
  FORCED_RELOAD_SID_KEY,
  PlatformApiAndAuthEmitAction,
  PlatformApiAndAuthLogError,
  PlatformApiAndAuthState2,
  api,
  correlationHeaders,
  emitAction,
  logError,
  okJson,
  rawReq,
  resolvePlatformApiAndAuthDispatch,
  resolvePlatformApiAndAuthLocalhost,
  resolvePlatformApiAndAuthPathOverride,
  resolvePlatformApiAndAuthStartsWith,
  resolvePlatformApiAndAuthState3,
  resolvePlatformApiAndAuthState4,
  resolvePlatformApiAndAuthValue,
  runFilePath,
  runMetaPath,
  serverRev,
  sessionId,
  updatePlatformApiAndAuthDeps,
  updatePlatformApiAndAuthPath,
  useActivity,
};

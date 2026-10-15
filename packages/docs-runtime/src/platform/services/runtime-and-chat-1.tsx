import { createElement as createReactElement } from "react";
/** BaoCut: platform runtime and chat from app-core-BE6n4d7F.js. */
import type { JSX } from "react";

import type { Dynamic } from "../../interop/legacy-dynamic";

import {
  applyUpdate,
  create,
  encodeStateAsUpdate,
  encodeStateVector,
  mergeUpdates,
  preloadModule,
  readVarUint,
  readVarUint8Array,
  createLiveModuleNamespace,
  writeVarUint,
  writeVarUint8Array,
} from "../dependencies";
import {
  TELEMETRY_ATTRIBUTE_NAMES,
  collectObservabilityTelemetryValue,
  resolveObservabilityTelemetryValue4,
  withWebSpan,
} from "../observability/telemetry-1";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  resolvePlatformSessionAndSourcesMessage,
  resolvePlatformSessionAndSourcesValue9,
} from "./session-and-sources-1";
import {
  collectPlatformFrameAndCapabilitiesFilesWithMatches,
  getPlatformFrameAndCapabilitiesPattern,
  isPlatformFrameAndCapabilitiesTest,
  resolvePlatformFrameAndCapabilitiesFrom,
  resolvePlatformFrameAndCapabilitiesFromCharCode,
  resolvePlatformFrameAndCapabilitiesNext,
  resolvePlatformFrameAndCapabilitiesSplit,
  resolvePlatformFrameAndCapabilitiesTest,
} from "./frame-and-capabilities";
import {
  UiOverlaysAndIconsCustomIcon,
} from "../ui/overlays-and-icons";
import {
  toast,
} from "../ui/toasts";
import {
  resolveObservabilityBrowserAndOperationEventsIncludes5,
  resolveObservabilityBrowserAndOperationEventsLastIndexOf,
  resolveObservabilityBrowserAndOperationEventsXlsx,
} from "../observability/browser-and-operation-events-2";
import {
  ObservabilityBrowserAndOperationEventsFull,
} from "../observability/browser-and-operation-events-4";
import {
  FORCED_RELOAD_SID_KEY,
  PlatformApiAndAuthState2,
  api,
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
  runMetaPath,
  serverRev,
  sessionId,
  updatePlatformApiAndAuthDeps,
  updatePlatformApiAndAuthPath,
} from "./api-and-auth-1";
import {
  clearPlatformApiAndAuthDelete2,
  loadPlatformApiAndAuthValue,
  loadPlatformApiAndAuthValue2,
  resolvePlatformApiAndAuthTopic,
  resolvePlatformApiAndAuthValue3,
  resolvePlatformApiAndAuthValue6,
  updatePlatformApiAndAuthTopic,
} from "./api-and-auth-2";
import {
  PlatformApiAndAuthAssign,
} from "./api-and-auth-3";
import {
  PlatformApiAndAuthTOMBSTONE,
} from "./api-and-auth-4";
import {
  resolvePlatformApiAndAuthValue28,
} from "./api-and-auth-5";
import {
  PlatformApiAndAuthUser,
  getRawDirty,
  isDeletedPath,
  listRawDirty,
} from "./api-and-auth-6";
import {
  useWorkbookStore,
} from "../data/model-schemas-1";
import {
  DataModelSchemasBULKATTACHTHRESHOLD,
  collectDataModelSchemasSyncedRunId,
  resolveDataModelSchemasEmptyRef,
  resolveDataModelSchemasLimit,
  useContainerStore,
} from "../data/model-schemas-2";
import {
  resolveDataModelSchemasStartsWith2,
} from "../data/model-schemas-3";
import {
  CommentsStoreANCHORGONECARDWORDS,
} from "../../comments/store/store-2";
import {
  CommentsStoreHealth,
  installCommentsStoreMiss,
} from "../../comments/store/store-4";
import {
  createPagesMermaidLibFailedEvent,
  loadPlatformRuntimeAndChatCause,
  resolveObservabilityBootCache,
  resolveObservabilityBootCache2,
  resolveObservabilityBootChunk,
  resolveObservabilityBootExec,
  resolveObservabilityBootTech,
  resolveObservabilityBootValue7,
  resolveObservabilityBootValue8,
} from "../observability/boot";
import {
  PlatformRuntimeAndChatByPath,
} from "./runtime-and-chat-2";

var platformRuntimeAndChatState: Dynamic;

function resolvePlatformRuntimeAndChatCatch(
  ..._extraArguments: unknown[]
): Dynamic {
  return (platformRuntimeAndChatState ??= (
    resolveObservabilityTelemetryValue4()
      ? loadPlatformRuntimeAndChatCause()
      : resolveObservabilityBootExec().then(
          (result?: Dynamic, ..._extraArguments: unknown[]) =>
            new TextEncoder().encode(result),
        )
  ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    throw ((platformRuntimeAndChatState = undefined), error);
  }));
}

async function loadPlatformRuntimeAndChatMsg(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let buffer: Dynamic = (await resolvePlatformRuntimeAndChatCatch()).slice()
    .buffer;
  return {
    msg: {
      type: `loadRuntime`,
      js: buffer,
    },
    transfer: [buffer],
  };
}

var platformRuntimeAndChatState2: Dynamic;

function resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed(
  ..._extraArguments: unknown[]
): Dynamic {
  return (platformRuntimeAndChatState2 ??= (
    resolveObservabilityBootValue7()
      ? resolveObservabilityBootCache()
      : resolvePlatformRuntimeAndChatThen()
  ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    throw (
      (platformRuntimeAndChatState2 = undefined),
      emitTelemetryEvent(
        createPagesMermaidLibFailedEvent(resolveObservabilityBootChunk(error)),
      ),
      error instanceof Error ? error : Error(`mermaid library load failed`)
    );
  }));
}

var resolvePlatformRuntimeAndChatThen: Dynamic;

var platformRuntimeAndChatState3: Dynamic;

function resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild(
  ..._extraArguments: unknown[]
): Dynamic {
  return (platformRuntimeAndChatState3 ??= preloadModule(
    (..._extraArguments: unknown[]): Dynamic =>
      import("../../prose-editor/extras-source").then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (result.editorExtrasSource.length === 0)
            throw Error(`lfile extras are not in this build`);
          return result.editorExtrasSource;
        },
      ),
    [],
    import.meta.url,
  ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    throw (
      (platformRuntimeAndChatState3 = undefined),
      error instanceof Error ? error : Error(`extras chunk load failed`)
    );
  }));
}

var platformRuntimeAndChatState4: Dynamic;

function resolvePlatformRuntimeAndChatTheSpellingWordListsAreNotInThisBuild(
  ..._extraArguments: unknown[]
): Dynamic {
  return (platformRuntimeAndChatState4 ??= (
    resolveObservabilityBootValue8()
      ? resolveObservabilityBootCache2()
      : preloadModule(
          (..._extraArguments: unknown[]): Dynamic =>
            import("../../prose-editor/runtime-source").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (result.editorRuntimeSource.length === 0)
                  throw Error(`the spelling word lists are not in this build`);
                if (resolveObservabilityBootTech(result.editorRuntimeSource) === null)
                  throw Error(
                    `the spelling word lists' carrier is not a whole word file`,
                  );
                return result.editorRuntimeSource;
              },
            ),
          [],
          import.meta.url,
        )
  ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    throw (
      (platformRuntimeAndChatState4 = undefined),
      error instanceof Error ? error : Error(`spelling word lists load failed`)
    );
  }));
}

var resolvePlatformRuntimeAndChatValue: (platformRuntimeAndChatValue?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformRuntimeAndChatValue2: (platformRuntimeAndChatValue2?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformRuntimeAndChatValue3: Dynamic;

var resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate: (platformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformRuntimeAndChatValue4: (platformRuntimeAndChatValue4?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var PlatformRuntimeAndChatState: Dynamic;

var resolvePlatformRuntimeAndChatUnknownMessageType: Dynamic;

function loadPlatformRuntimeAndChatValue(
  platformRuntimeAndChatValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `
"use strict";
const __deny = (n) => function() { throw new Error("compute: " + n + " is disabled"); };
const __block = (n) => { try {
  Object.defineProperty(self, n, { value: __deny(n), configurable: false, writable: false });
} catch {} };
for (const n of ["fetch","XMLHttpRequest","WebSocket","EventSource","importScripts",
                 "Worker","indexedDB","caches","BroadcastChannel"]) __block(n);
if (self.navigator) try {
  Object.defineProperty(self.navigator, "sendBeacon",
    { value: __deny("sendBeacon"), configurable: false, writable: false });
} catch {}
self.onmessage = async (ev) => {
  // Mutable — script may add/change/delete entries; the trusted side diffs
  // the returned object against its own pre-snapshot and applies to rawDirty
  // only on clean return (throw → nothing applied).
  const files = ev.data.files;
  try {
    const __fn = async () => {
${platformRuntimeAndChatValue}
    };
    const __r = await __fn();
    self.postMessage({ ok: true, result: __r, files });
  } catch (e) {
    const m = e && e.message ? String(e.message) : String(e);
    const s = e && e.stack ? "\\n" + String(e.stack) : "";
    self.postMessage({ ok: false, error: m + s });
  }
};
`;
}

async function loadPlatformRuntimeAndChatResult(
  platformRuntimeAndChatResult?: Dynamic,
  files?: Dynamic,
  context: Dynamic = 5e3,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformRuntimeAndChatValue = loadPlatformRuntimeAndChatValue(
    platformRuntimeAndChatResult,
  );
  let blob = new Blob([platformRuntimeAndChatValue], {
    type: `text/javascript`,
  });
  let objectURL = URL.createObjectURL(blob);
  let worker: Dynamic = new (Worker as Dynamic)(objectURL, {
    type: `classic`,
  });
  try {
    return await new (Promise as Dynamic)(
      (
        resolve?: Dynamic,
        reject?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let setTimeout2 = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            worker.terminate();
            reject(Error(`compute: timed out after ${context}ms`));
          },
          context,
        );
        worker.addEventListener(
          `message`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            clearTimeout(setTimeout2);
            let data: Dynamic = event.data;
            if (!data.ok) {
              reject(Error(data.error ?? `compute: unknown error`));
              return;
            }
            let files2: Dynamic = data.files;
            if (
              typeof files2 != `object` ||
              !files2 ||
              Array.isArray(files2) ||
              Object.getPrototypeOf(files2) !== Object.prototype
            ) {
              resolve({
                result: data.result,
                files: {
                  ...files,
                },
              });
              return;
            }
            resolve({
              result: data.result,
              files: files2,
            });
          },
        );
        worker.addEventListener(
          `error`,
          (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            clearTimeout(setTimeout2);
            reject(Error(`compute: worker error — ${error.message ?? error}`));
          },
        );
        worker.postMessage({
          files: files,
        });
      },
    );
  } finally {
    worker.terminate();
    URL.revokeObjectURL(objectURL);
  }
}

var PlatformRuntimeAndChatState2: number;

function filterPlatformRuntimeAndChatPath(
  filterPlatformRuntimeAndChatPath2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let changes: Dynamic = [];
  let rejected: Dynamic = [];
  let count: number = 0;
  for (let [path, items] of Object.entries(options) as Dynamic)
    if (
      typeof items == `string` &&
      filterPlatformRuntimeAndChatPath2[path] !== items
    ) {
      count += items.length;
      if (!context(path)) {
        rejected.push(path);
        continue;
      }
      changes.push({
        path: path,
        op: `write`,
      });
    }
  if (count > PlatformRuntimeAndChatState2)
    throw Error(
      `compute: returned files total ${(count / 1e6).toFixed(0)}MB — exceeds ${PlatformRuntimeAndChatState2 / 1e6}MB cap; nothing applied`,
    );
  for (let path of Object.keys(filterPlatformRuntimeAndChatPath2) as Dynamic)
    if (!Object.hasOwn(options, path)) {
      changes.push({
        path: path,
        op: `delete`,
      });
    }
  let filteredChanges: Dynamic = changes.filter(
    (change?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      change.path.startsWith(`/`) ||
      change.path
        .split(`/`)
        .some(
          (pathPart?: Dynamic, ..._extraArguments: unknown[]) =>
            pathPart === `..`,
        ),
  );
  if (filteredChanges.length)
    throw Error(
      `compute: returned file paths escape project root: ${filteredChanges.map((filteredChange?: Dynamic, ..._extraArguments: unknown[]): Dynamic => filteredChange.path).join(`, `)}`,
    );
  return {
    changes: changes,
    rejected: rejected,
  };
}

var PlatformRuntimeAndChat000000: string;

function resolvePlatformRuntimeAndChatVersion(
  platformRuntimeAndChatVersion?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let root = resolvePlatformSessionAndSourcesValue9(
    platformRuntimeAndChatVersion,
  );
  let body = resolvePlatformSessionAndSourcesValue9(
    platformRuntimeAndChatVersion,
  );
  if (body === root) {
    body = resolvePlatformSessionAndSourcesValue9(
      platformRuntimeAndChatVersion,
    );
  }
  return {
    version: 1,
    sha: PlatformRuntimeAndChat000000,
    root: root,
    nodes: {
      [root]: {
        type: `document`,
        body: body,
      },
      [body]: {
        type: `prose`,
        json: {
          type: `doc`,
          content: [
            {
              type: `heading`,
              attrs: {
                level: 1,
                bid: `bk_000000`,
              },
            },
            {
              type: `paragraph`,
              attrs: {
                bid: `bk_000001`,
              },
            },
          ],
        },
      },
    },
  };
}

var PlatformRuntimeAndChatJoin: string;

async function loadPlatformRuntimeAndChatStartsWith(
  platformRuntimeAndChatStarts?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label: Dynamic =
    platformRuntimeAndChatStarts.startsWith(`/`) &&
    typeof window === "undefined"
      ? `file://${platformRuntimeAndChatStarts}`
      : platformRuntimeAndChatStarts;
  let response = await fetch(label);
  if (!response.ok)
    throw Error(`seedForExt: fetch ${label} → ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

function resolvePlatformRuntimeAndChatCustomSize(
  name?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformRuntimeAndChatCustomSizeHandler: Dynamic = (
    { size = 16, className: className }: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    createReactElement(UiOverlaysAndIconsCustomIcon, {
  name: name,
  customSize: size,
  className: className
})
  );
  resolvePlatformRuntimeAndChatCustomSizeHandler.displayName = `ExtIcon(${name})`;
  return resolvePlatformRuntimeAndChatCustomSizeHandler;
}

var PlatformRuntimeAndChatXlsx: Dynamic;

var PlatformRuntimeAndChatXlsx2: Dynamic;

var PlatformRuntimeAndChatXlsx3: {
    xlsx: string;
    csv: string;
    html: string;
    ldoc: string;
    docx: string;
    pdf: string;
    md: string;
    pptx: string;
    image: string;
    code: string;
    file: string;
};

var PlatformRuntimeAndChatSheet: Dynamic;

var resolvePlatformRuntimeAndChatPath: Dynamic;

function resolvePlatformRuntimeAndChatSplit(
  platformRuntimeAndChatSplit?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pop: Dynamic =
    platformRuntimeAndChatSplit.split(`/`).pop() ?? platformRuntimeAndChatSplit;
  let [observabilityBrowserAndOperationEventsLastIndexOf]: Dynamic =
    resolveObservabilityBrowserAndOperationEventsLastIndexOf(pop);
  if (!observabilityBrowserAndOperationEventsLastIndexOf) return pop;
  let trimmedReplace: Dynamic =
    observabilityBrowserAndOperationEventsLastIndexOf
      .replace(/[-_]+/g, ` `)
      .trim();
  return trimmedReplace
    ? trimmedReplace.charAt(0).toUpperCase() + trimmedReplace.slice(1)
    : pop;
}

async function loadPlatformRuntimeAndChatDefault(
  platformRuntimeAndChatDefault?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  let replace: Dynamic = platformRuntimeAndChatDefault
    .toLowerCase()
    .replace(/^\./, ``);
  return replace === `xlsx` || replace === `xls`
    ? loadPlatformRuntimeAndChatStartsWith(
        (
          await preloadModule(
            async (..._extraArguments: unknown[]): Promise<Dynamic> => {
              let { EMPTY_DOCUMENT_MODEL_URL: result }: Dynamic = await import(
                "../../embedded-widgets/model-workbook"
              );
              return {
                default: result,
              };
            },
            [],
            import.meta.url,
          )
        ).default,
      )
    : replace === `pptx`
      ? loadPlatformRuntimeAndChatStartsWith(
          (
            await preloadModule(
              async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                let { blankSlidesDataUrl: result }: Dynamic = await import(
                  "../../document/templates/blank-slides"
                );
                return {
                  default: result,
                };
              },
              [],
              import.meta.url,
            )
          ).default,
        )
      : replace === `docx`
        ? loadPlatformRuntimeAndChatStartsWith(
            (
              await preloadModule(
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let { blankDocumentDataUrl: result }: Dynamic = await import(
                    "../../document/templates/blank-document"
                  );
                  return {
                    default: result,
                  };
                },
                [],
                import.meta.url,
              )
            ).default,
          )
        : replace === `ldoc`
          ? JSON.stringify(resolvePlatformRuntimeAndChatVersion())
          : replace === `html` || replace === `htm`
            ? PlatformRuntimeAndChatJoin
            : `
`;
}

var platformRuntimeAndChatPattern: RegExp;

var resolvePlatformRuntimeAndChatValue5: (platformRuntimeAndChatValue5?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformRuntimeAndChatPill: Dynamic;

var PlatformRuntimeAndChatSet: Dynamic;

var PlatformRuntimeAndChatMode: Dynamic;

var PlatformRuntimeAndChatAssign: ((platformRuntimeAndChatAssign?: Dynamic, ..._extraArguments: unknown[]) => Dynamic) & {
    getState: (..._extraArguments: unknown[]) => Dynamic;
};

var PlatformRuntimeAndChatSet2: Dynamic;

var PlatformRuntimeAndChatMode2: Dynamic;

var PlatformRuntimeAndChatAssign2: ((platformRuntimeAndChatAssign2?: Dynamic, ..._extraArguments: unknown[]) => Dynamic) & {
    getState: (..._extraArguments: unknown[]) => Dynamic;
};

var PlatformRuntimeAndChatDISCONNECTTOASTID: Dynamic;

var DISCONNECT_TOAST_ID: string;

var PlatformRuntimeAndChatMessage: string;

var platformRuntimeAndChatValue_1: Dynamic;

var platformRuntimeAndChatValue_12: boolean;

function setDisconnectToastSuppressed(
  disconnect?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformRuntimeAndChatValue_1 = disconnect;
  if (disconnect) {
    toast.dismiss(DISCONNECT_TOAST_ID);
  } else {
    if (platformRuntimeAndChatValue_12) {
      toast.error(PlatformRuntimeAndChatMessage, {
        id: DISCONNECT_TOAST_ID,
        duration: 1 / 0,
      });
    }
  }
}

var revealChat: (..._extraArguments: unknown[]) => undefined;

function handleCommentStatusLine(
  handleCommentStatusLine2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    rootId: handleCommentStatusLine3,
    state: handleCommentStatusLine4,
    text: handleCommentStatusLine5,
  }: Dynamic = handleCommentStatusLine2 ?? {};
  return handleCommentStatusLine3
    ? preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve()
            .then(
              (..._extraArguments: unknown[]): Dynamic =>
                CommentsStoreANCHORGONECARDWORDS,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.useCommentStore
                  .getState()
                  .setWorking(
                    handleCommentStatusLine3,
                    handleCommentStatusLine4 === `done`
                      ? null
                      : (handleCommentStatusLine5 ?? `Working…`),
                  ),
            ),
        undefined,
        import.meta.url,
      )
    : Promise.resolve();
}

function clearCommentWorking(..._extraArguments: unknown[]): Dynamic {
  return preloadModule(
    (..._extraArguments: unknown[]) =>
      Promise.resolve()
        .then(
          (..._extraArguments: unknown[]): Dynamic =>
            CommentsStoreANCHORGONECARDWORDS,
        )
        .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (Object.keys(result.useCommentStore.getState().working).length) {
            result.useCommentStore.setState({
              working: {},
            });
          }
        }),
    undefined,
    import.meta.url,
  );
}

var resolvePlatformRuntimeAndChatDecode: Dynamic;

var resolvePlatformRuntimeAndChatFromCharCode: Dynamic;

async function loadPlatformRuntimeAndChatValue2(
  platformRuntimeAndChatValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (isDeletedPath(platformRuntimeAndChatValue2)) return;
  let rawDirty: Dynamic = getRawDirty(platformRuntimeAndChatValue2);
  if (rawDirty !== undefined) return rawDirty;
  try {
    return new Uint8Array(
      await loadPlatformApiAndAuthValue(platformRuntimeAndChatValue2),
    );
  } catch (response: Dynamic) {
    if (response?.status === 404) return;
    throw response;
  }
}

async function loadPlatformRuntimeAndChatEnsureSettled(
  platformRuntimeAndChatEnsureSettled?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  await (
    await preloadModule(
      async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let { ensureSettled: ensureSettled2 }: Dynamic =
          await Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              PlatformApiAndAuthTOMBSTONE,
          );
        return {
          ensureSettled: ensureSettled2,
        };
      },
      undefined,
      import.meta.url,
    )
  ).ensureSettled();
  if (platformRuntimeAndChatEnsureSettled === `read`) {
    let text = String(node.path);
    let platformRuntimeAndChatValue2: Dynamic =
      await loadPlatformRuntimeAndChatValue2(text);
    if (platformRuntimeAndChatValue2 === undefined && isDeletedPath(text))
      return ``;
    let platformRuntimeAndChatValue22: Dynamic =
      platformRuntimeAndChatValue2 ??
      new Uint8Array(await loadPlatformApiAndAuthValue(text));
    if (node.base64)
      return resolvePlatformFrameAndCapabilitiesFromCharCode(
        platformRuntimeAndChatValue22,
      );
    let decode: string = new TextDecoder().decode(
      platformRuntimeAndChatValue22,
    );
    let max =
      typeof node.offset == `number` ? Math.max(1, node.offset) : undefined;
    let limit: Dynamic = typeof node.limit == `number` ? node.limit : undefined;
    if (max === undefined && limit === undefined) return decode;
    let decodeParts: Dynamic = decode.split(`
`);
    let difference = (max ?? 1) - 1;
    let total: Dynamic = limit === undefined ? undefined : difference + limit;
    return decodeParts.slice(difference, total).join(`
`);
  }
  if (platformRuntimeAndChatEnsureSettled === `write`) {
    let text = String(node.path);
    let platformFrameAndCapabilitiesFrom: Dynamic =
      typeof node.contentBase64 == `string`
        ? resolvePlatformFrameAndCapabilitiesFrom(node.contentBase64)
        : new TextEncoder().encode(String(node.content));
    await useWorkbookStore
      .getState()
      .swap(text, platformFrameAndCapabilitiesFrom);
    return `ok`;
  }
  if (platformRuntimeAndChatEnsureSettled === `delete`) {
    let text = String(node.path);
    useWorkbookStore.getState().drop(text);
    return `ok`;
  }
  if (platformRuntimeAndChatEnsureSettled === `ls`) {
    let replace = String(node.dir).replace(/\/$/, ``);
    if (resolvePlatformFrameAndCapabilitiesTest(replace + `/`)) {
      let replaceSlice: string = replace.slice(5);
      return (
        (
          await fetch(
            resolvePlatformApiAndAuthValue(runMetaPath(replaceSlice)),
          ).then(
            (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              response.ok ? response.json() : null,
          )
        )?.result?.files ?? []
      ).map(
        (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          typeof file == `string` ? file : file.name,
      );
    }
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let mappedFilteredMappedEntries: Dynamic = replace.startsWith(activeDir)
      ? useContainerStore
          .getState()
          .entries.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]) =>
              `${activeDir}/${entry.path}`,
          )
          .filter(
            (mappedEntry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              mappedEntry.startsWith(replace + `/`) || replace === activeDir,
          )
          .map(
            (
              filteredMappedEntry?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => filteredMappedEntry.slice(replace.length + 1),
          )
      : [];
    let listRawDirty2: Dynamic = listRawDirty(replace);
    return [
      ...new (Set as Dynamic)([
        ...mappedFilteredMappedEntries,
        ...listRawDirty2,
      ]),
    ].toSorted();
  }
  if (platformRuntimeAndChatEnsureSettled === `create`) {
    let text = String(node.path);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let path: string = text.startsWith(activeDir + `/`)
      ? text.slice(activeDir.length + 1)
      : text;
    if (
      useContainerStore
        .getState()
        .entries.some(
          (entry?: Dynamic, ..._extraArguments: unknown[]) =>
            entry.path === path,
        ) ||
      getRawDirty(text) !== undefined
    )
      throw Error(
        `create: ${path} already exists — use vfs_patch or vfs_write to modify it`,
      );
    let observabilityBrowserAndOperationEventsIncludes5: Dynamic =
      resolveObservabilityBrowserAndOperationEventsIncludes5(path);
    if (
      observabilityBrowserAndOperationEventsIncludes5 === `docx` ||
      observabilityBrowserAndOperationEventsIncludes5 === `pptx`
    )
      throw Error(
        `create: .${observabilityBrowserAndOperationEventsIncludes5} creation isn't supported. Create a .ldoc document instead.`,
      );
    let replace: Dynamic = path
      .split(`/`)
      .pop()!
      .replace(/\.[^.]+$/, ``);
    let platformRuntimeAndChatDefault: Dynamic =
      await loadPlatformRuntimeAndChatDefault(
        resolveObservabilityBrowserAndOperationEventsIncludes5(path),
        replace,
      );
    let encode: Dynamic =
      typeof platformRuntimeAndChatDefault == `string`
        ? new TextEncoder().encode(platformRuntimeAndChatDefault)
        : platformRuntimeAndChatDefault;
    await useWorkbookStore.getState().swap(text, encode);
    return {
      path: path,
      size: encode.byteLength,
    };
  }
  if (platformRuntimeAndChatEnsureSettled === `pull`) {
    let text = String(node.dir);
    let text2 = String(node.src);
    let dataModelSchemasEmptyRef: Dynamic =
      resolveDataModelSchemasEmptyRef(text2);
    if (resolvePlatformApiAndAuthValue28(dataModelSchemasEmptyRef))
      throw Error(
        `pull: invalid src "${text2}" — ${dataModelSchemasEmptyRef.why}`,
      );
    let [dataModelSchemasEmptyRef2]: Dynamic = dataModelSchemasEmptyRef;
    let resource: Dynamic = dataModelSchemasEmptyRef2.resource;
    let loadPlatformRuntimeAndChatEnsureSettledResult: Dynamic;
    let loadPlatformRuntimeAndChatEnsureSettledResult2: Dynamic;
    if (
      resource?.kind === `file` &&
      dataModelSchemasEmptyRef.length === 1 &&
      !text2.includes(`#`)
    ) {
      resolveDataModelSchemasStartsWith2(text2, text2);
      loadPlatformRuntimeAndChatEnsureSettledResult = new Uint8Array(
        await loadPlatformApiAndAuthValue2(`${text}/${text2}`),
      );
      loadPlatformRuntimeAndChatEnsureSettledResult2 = text2;
    } else
      throw Error(
        `pull: src must be a plain project file path; slice/range/key refs are read-only`,
      );
    let path: Dynamic =
      typeof node.dest == `string` && node.dest
        ? node.dest
        : loadPlatformRuntimeAndChatEnsureSettledResult2;
    if (
      path
        .split(`/`)
        .some(
          (pathPart?: Dynamic, ..._extraArguments: unknown[]) =>
            pathPart === `..`,
        )
    )
      throw Error(`pull: dest escapes project: ${path}`);
    let label = `${text}/${path}`;
    if (
      useContainerStore
        .getState()
        .entries.some(
          (entry?: Dynamic, ..._extraArguments: unknown[]) =>
            entry.path === path,
        ) ||
      getRawDirty(label) !== undefined
    )
      throw Error(
        `pull: ${path} already exists — vfs_delete it first if you mean to overwrite`,
      );
    await useWorkbookStore
      .getState()
      .swap(label, loadPlatformRuntimeAndChatEnsureSettledResult);
    return {
      path: path,
      size: loadPlatformRuntimeAndChatEnsureSettledResult.byteLength,
    };
  }
  if (platformRuntimeAndChatEnsureSettled === `stat`) {
    let text = String(node.path);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let textSlice: string = text.startsWith(activeDir + `/`)
      ? text.slice(activeDir.length + 1)
      : text;
    let ext2: Dynamic =
      resolveObservabilityBrowserAndOperationEventsIncludes5(textSlice);
    let isText = isPlatformFrameAndCapabilitiesTest(textSlice);
    let rawDirty: Dynamic = getRawDirty(text);
    let loadPlatformRuntimeAndChatEnsureSettledResult: Dynamic;
    let mtime: Dynamic;
    if (isDeletedPath(text)) {
      loadPlatformRuntimeAndChatEnsureSettledResult = new Uint8Array();
      mtime = null;
    } else {
      if (rawDirty === undefined) {
        loadPlatformRuntimeAndChatEnsureSettledResult = new Uint8Array(
          await loadPlatformApiAndAuthValue(text),
        );
        mtime =
          useContainerStore
            .getState()
            .entries.find(
              (entry?: Dynamic, ..._extraArguments: unknown[]) =>
                entry.path === textSlice,
            )?.mtime ?? null;
      } else {
        loadPlatformRuntimeAndChatEnsureSettledResult = rawDirty;
        mtime = null;
      }
    }
    let lines: Dynamic;
    let tail: Dynamic;
    if (
      isText &&
      loadPlatformRuntimeAndChatEnsureSettledResult.byteLength > 0
    ) {
      let decode: string = new TextDecoder().decode(
        loadPlatformRuntimeAndChatEnsureSettledResult,
      );
      let decodeParts: Dynamic = decode.split(`
`);
      lines =
        decodeParts.length -
        +!!decode.endsWith(`
`);
      if (loadPlatformRuntimeAndChatEnsureSettledResult.byteLength <= 10240) {
        tail = decodeParts
          .filter(
            (items?: Dynamic, ..._extraArguments: unknown[]) =>
              items.length > 0,
          )
          .slice(-3).join(`
`);
      }
    } else if (isText) {
      lines = 0;
    }
    return {
      size: loadPlatformRuntimeAndChatEnsureSettledResult.byteLength,
      lines: lines,
      mtime: mtime,
      ext: ext2,
      isText: isText,
      tail: tail,
    };
  }
  if (platformRuntimeAndChatEnsureSettled === `move`) {
    let text = String(node.from);
    let text2 = String(node.to);
    if (text === text2) return `ok`;
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let textSlice: string = text2.startsWith(activeDir + `/`)
      ? text2.slice(activeDir.length + 1)
      : text2;
    if (
      useContainerStore
        .getState()
        .entries.some(
          (entry?: Dynamic, ..._extraArguments: unknown[]) =>
            entry.path === textSlice,
        ) ||
      getRawDirty(text2) !== undefined
    )
      throw Error(
        `move: ${textSlice} already exists — vfs_delete it first if you mean to overwrite`,
      );
    let useWorkbookStoreState: Dynamic = useWorkbookStore.getState();
    if (isDeletedPath(text)) {
      useWorkbookStoreState.drop(text2);
      useWorkbookStoreState.drop(text);
      return `ok`;
    }
    let rawDirty: Dynamic =
      getRawDirty(text) ??
      new Uint8Array(await loadPlatformApiAndAuthValue(text));
    await useWorkbookStoreState.swap(text2, rawDirty);
    useWorkbookStoreState.drop(text);
    return `ok`;
  }
  if (platformRuntimeAndChatEnsureSettled === `glob`) {
    let replace = String(node.dir).replace(/\/$/, ``);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let entries: Dynamic = useContainerStore.getState().entries;
    let mappedEntries: Dynamic =
      replace === activeDir
        ? entries.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              entry.path,
          )
        : [];
    let mtimeOf: Dynamic = new (Map as Dynamic)(
      entries.map(
        (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          entry.path,
          entry.mtime,
        ],
      ),
    );
    let candidates: Dynamic = [
      ...new (Set as Dynamic)([...mappedEntries, ...listRawDirty(replace)]),
    ];
    return getPlatformFrameAndCapabilitiesPattern({
      pattern: String(node.pattern),
      candidates: candidates,
      mtimeOf: mtimeOf,
    });
  }
  if (platformRuntimeAndChatEnsureSettled === `grep`) {
    let replace = String(node.dir).replace(/\/$/, ``);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let entries: Dynamic = useContainerStore.getState().entries;
    let mappedEntries: Dynamic =
      replace === activeDir
        ? entries.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              entry.path,
          )
        : [];
    let listRawDirty2: Dynamic = listRawDirty(replace);
    let filteredItems: Dynamic = [
      ...new (Set as Dynamic)([...mappedEntries, ...listRawDirty2]),
    ].filter(isPlatformFrameAndCapabilitiesTest);
    let files: Dynamic = new (Map as Dynamic)();
    for (let loadPlatformRuntimeAndChatEnsureSettledResult of filteredItems as Dynamic) {
      let label = `${replace}/${loadPlatformRuntimeAndChatEnsureSettledResult}`;
      try {
        let platformRuntimeAndChatValue2: Dynamic =
          await loadPlatformRuntimeAndChatValue2(label);
        if (platformRuntimeAndChatValue2 === undefined) continue;
        files.set(
          loadPlatformRuntimeAndChatEnsureSettledResult,
          new TextDecoder(`utf-8`, {
            fatal: false,
          }).decode(platformRuntimeAndChatValue2),
        );
      } catch {}
    }
    return collectPlatformFrameAndCapabilitiesFilesWithMatches({
      pattern: String(node.pattern),
      path: typeof node.glob == `string` ? node.glob : undefined,
      regex: node.regex !== false,
      output_mode: node.output_mode,
      "-i": !!node[`-i`],
      "-n": node[`-n`] !== false,
      head_limit: typeof node.head_limit == `number` ? node.head_limit : 100,
      files: files,
    });
  }
  if (platformRuntimeAndChatEnsureSettled === `patch`) {
    let text = String(node.path);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let textSlice: string = text.startsWith(activeDir + `/`)
      ? text.slice(activeDir.length + 1)
      : text;
    let platformRuntimeAndChatValue2: Dynamic =
      await loadPlatformRuntimeAndChatValue2(text);
    if (platformRuntimeAndChatValue2 === undefined)
      throw Error(`patch: ${textSlice} not found (deleted or missing)`);
    let {
      next: platformFrameAndCapabilitiesNext,
      replaced: replaced,
    }: Dynamic = resolvePlatformFrameAndCapabilitiesNext(
      new TextDecoder().decode(platformRuntimeAndChatValue2),
      String(node.old_string),
      String(node.new_string),
      !!node.replace_all,
      textSlice,
    );
    await useWorkbookStore
      .getState()
      .swap(text, new TextEncoder().encode(platformFrameAndCapabilitiesNext));
    return {
      replaced: replaced,
    };
  }
  if (platformRuntimeAndChatEnsureSettled === `diff`) {
    let text = String(node.path);
    let against: Dynamic =
      typeof node.against == `string` ? node.against : undefined;
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let slice: Dynamic = (
      platformRuntimeAndChatEnsureSettled2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      platformRuntimeAndChatEnsureSettled2.startsWith(activeDir + `/`)
        ? platformRuntimeAndChatEnsureSettled2.slice(activeDir.length + 1)
        : platformRuntimeAndChatEnsureSettled2;
    if (
      !isPlatformFrameAndCapabilitiesTest(text) ||
      (against && !isPlatformFrameAndCapabilitiesTest(against))
    )
      return `--- ${slice(against ?? text)}\n+++ ${slice(text)}\n(binary file — use vfs_stat or iron.* tools)`;
    let platformRuntimeAndChatValue2: Dynamic =
      await loadPlatformRuntimeAndChatValue2(text);
    if (platformRuntimeAndChatValue2 === undefined && !isDeletedPath(text))
      throw Error(`diff: ${slice(text)} not found`);
    let platformRuntimeAndChatDecode: Dynamic = platformRuntimeAndChatValue2
      ? resolvePlatformRuntimeAndChatDecode(platformRuntimeAndChatValue2)
      : ``;
    let loadPlatformRuntimeAndChatEnsureSettledResult: Dynamic;
    let loadPlatformRuntimeAndChatEnsureSettledResult2: Dynamic;
    if (against) {
      let platformRuntimeAndChatValue22: Dynamic =
        await loadPlatformRuntimeAndChatValue2(against);
      if (
        platformRuntimeAndChatValue22 === undefined &&
        !isDeletedPath(against)
      )
        throw Error(`diff: ${slice(against)} not found`);
      loadPlatformRuntimeAndChatEnsureSettledResult =
        platformRuntimeAndChatValue22
          ? resolvePlatformRuntimeAndChatDecode(platformRuntimeAndChatValue22)
          : ``;
      loadPlatformRuntimeAndChatEnsureSettledResult2 = slice(against);
    } else {
      loadPlatformRuntimeAndChatEnsureSettledResult =
        await loadPlatformApiAndAuthValue2(text).then(
          resolvePlatformRuntimeAndChatDecode,
          (..._extraArguments: unknown[]) => ``,
        );
      loadPlatformRuntimeAndChatEnsureSettledResult2 = `${slice(text)} (committed)`;
    }
    return resolvePlatformFrameAndCapabilitiesSplit(
      loadPlatformRuntimeAndChatEnsureSettledResult,
      platformRuntimeAndChatDecode,
      loadPlatformRuntimeAndChatEnsureSettledResult2,
      slice(text),
    );
  }
  if (platformRuntimeAndChatEnsureSettled === `compute`) {
    let replace = String(node.dir).replace(/\/$/, ``);
    let activeDir: Dynamic = useContainerStore.getState().activeDir();
    let entries: Dynamic = useContainerStore.getState().entries;
    let mappedEntries: Dynamic =
      replace === activeDir
        ? entries.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              entry.path,
          )
        : [];
    let listRawDirty2: Dynamic = listRawDirty(replace);
    let filteredItems: Dynamic = [
      ...new (Set as Dynamic)([...mappedEntries, ...listRawDirty2]),
    ].filter(isPlatformFrameAndCapabilitiesTest);
    let record2: Dynamic = {};
    for (let loadPlatformRuntimeAndChatEnsureSettledResult2 of filteredItems as Dynamic) {
      let label = `${replace}/${loadPlatformRuntimeAndChatEnsureSettledResult2}`;
      try {
        let platformRuntimeAndChatValue2: Dynamic =
          await loadPlatformRuntimeAndChatValue2(label);
        if (platformRuntimeAndChatValue2 === undefined) continue;
        record2[loadPlatformRuntimeAndChatEnsureSettledResult2] =
          new TextDecoder(`utf-8`, {
            fatal: false,
          }).decode(platformRuntimeAndChatValue2);
      } catch {}
    }
    let loadPlatformRuntimeAndChatEnsureSettledResult: Dynamic;
    if (typeof node.file == `string` && node.file) {
      let platformRuntimeAndChatValue2: Dynamic =
        await loadPlatformRuntimeAndChatValue2(node.file);
      if (platformRuntimeAndChatValue2 === undefined)
        throw Error(`compute: file not found (deleted or missing)`);
      loadPlatformRuntimeAndChatEnsureSettledResult = new TextDecoder().decode(
        platformRuntimeAndChatValue2,
      );
    } else loadPlatformRuntimeAndChatEnsureSettledResult = String(node.js);
    let platformRuntimeAndChatResult: Dynamic =
      await loadPlatformRuntimeAndChatResult(
        loadPlatformRuntimeAndChatEnsureSettledResult,
        record2,
        5e3,
      );
    let {
      changes: changed,
      rejected: filterPlatformRuntimeAndChatPath2,
    }: Dynamic = filterPlatformRuntimeAndChatPath(
      record2,
      platformRuntimeAndChatResult.files,
      isPlatformFrameAndCapabilitiesTest,
    );
    if (filterPlatformRuntimeAndChatPath2.length)
      throw Error(
        `compute: cannot write binary-typed paths (${filterPlatformRuntimeAndChatPath2.join(`, `)}) — compute only emits text`,
      );
    let useWorkbookStoreState: Dynamic = useWorkbookStore.getState();
    await useWorkbookStoreState.batch(
      async (..._extraArguments: unknown[]): Promise<undefined> => {
        for (let operation of changed as Dynamic) {
          let label = `${replace}/${operation.path}`;
          if (operation.op === `write`) {
            let fileItem: Dynamic =
              platformRuntimeAndChatResult.files[operation.path];
            await useWorkbookStoreState.swap(
              label,
              new TextEncoder().encode(
                fileItem.length === 0
                  ? `
`
                  : fileItem,
              ),
            );
          } else useWorkbookStoreState.drop(label);
        }
      },
    );
    return {
      result: platformRuntimeAndChatResult.result,
      changed: changed,
    };
  }
  if (platformRuntimeAndChatEnsureSettled.startsWith(`iron-`)) {
    let text = String(node.path);
    let useWorkbookStoreState: Dynamic = useWorkbookStore.getState();
    await useWorkbookStoreState.load(text);
    if (platformRuntimeAndChatEnsureSettled === `iron-get`)
      return useWorkbookStoreState.get(text, String(node.ref));
    if (platformRuntimeAndChatEnsureSettled === `iron-range`) {
      let workbook: Dynamic = useWorkbookStoreState.workbook(text);
      return workbook ? workbook.getRange(String(node.ref)) : [];
    }
    if (platformRuntimeAndChatEnsureSettled === `iron-formula`) {
      let workbook: Dynamic = useWorkbookStoreState.workbook(text);
      return workbook ? workbook.getFormula(String(node.ref)) : null;
    }
    if (platformRuntimeAndChatEnsureSettled === `iron-set`) {
      useWorkbookStoreState.set(text, String(node.ref), node.value);
      return `ok`;
    }
    if (platformRuntimeAndChatEnsureSettled === `iron-sheets`) {
      let workbook: Dynamic = useWorkbookStoreState.workbook(text);
      return workbook ? workbook.sheets() : [];
    }
    if (platformRuntimeAndChatEnsureSettled === `iron-write-cells`) {
      let cells: Dynamic = node.cells;
      let matchesRaw = node.raw === true;
      await useWorkbookStoreState.batch(
        (..._extraArguments: unknown[]): undefined => {
          for (let loadPlatformRuntimeAndChatEnsureSettledResult of cells as Dynamic) {
            let label: Dynamic =
              matchesRaw &&
              typeof loadPlatformRuntimeAndChatEnsureSettledResult.value ==
                `string`
                ? `'${loadPlatformRuntimeAndChatEnsureSettledResult.value}`
                : loadPlatformRuntimeAndChatEnsureSettledResult.value;
            useWorkbookStoreState.set(
              text,
              loadPlatformRuntimeAndChatEnsureSettledResult.ref,
              label,
            );
          }
        },
      );
      return `wrote ${cells.length}`;
    }
    if (platformRuntimeAndChatEnsureSettled === `iron-find`) {
      let workbook: Dynamic = useWorkbookStoreState.workbook(text);
      if (!workbook)
        return {
          matches: [],
        };
      let normalizedText = String(node.text).toLowerCase();
      let limit: Dynamic = typeof node.limit == `number` ? node.limit : 20;
      let matches: Dynamic = [];
      for (let sheet of workbook.sheets() as Dynamic) {
        let range: Dynamic = workbook.getRange(`'${sheet}'!A1:Z2000`);
        for (
          let index = 0;
          index < range.length && matches.length < limit;
          index++
        ) {
          let rangeItem: Dynamic = range[index] ?? [];
          for (
            let index2 = 0;
            index2 < rangeItem.length && matches.length < limit;
            index2++
          ) {
            let rangeItemItem: Dynamic = rangeItem[index2];
            if (
              rangeItemItem != null &&
              String(rangeItemItem).toLowerCase().includes(normalizedText)
            ) {
              matches.push({
                sheet: sheet,
                ref: `${sheet}!${resolvePlatformRuntimeAndChatFromCharCode(index2)}${index + 1}`,
                value: rangeItemItem,
              });
            }
          }
        }
        if (matches.length >= limit) break;
      }
      return {
        matches: matches,
      };
    }
  }
  if (
    platformRuntimeAndChatEnsureSettled === `ui-run-workflow` ||
    platformRuntimeAndChatEnsureSettled === `ui-propagate-workflow`
  ) {
    let text = String(node.name);
    let useContainerStoreState: Dynamic = useContainerStore.getState();
    let name: Dynamic = useContainerStoreState.project?.name;
    if (!name || !name.startsWith(`projects/`))
      throw Error(
        `${platformRuntimeAndChatEnsureSettled}: not on a project page`,
      );
    let activeDir: Dynamic = useContainerStoreState.activeDir();
    let label: string = ``;
    let loadPlatformRuntimeAndChatEnsureSettledResult: Dynamic;
    for (let loadPlatformRuntimeAndChatEnsureSettledResult2 of [
      `feeds`,
      `workflows`,
    ] as Dynamic) {
      let label2 = `.claude/${loadPlatformRuntimeAndChatEnsureSettledResult2}/${text}.json`;
      let rawDirty: Dynamic = isDeletedPath(`${activeDir}/${label2}`)
        ? undefined
        : getRawDirty(`${activeDir}/${label2}`);
      if (rawDirty) {
        loadPlatformRuntimeAndChatEnsureSettledResult =
          resolveDataModelSchemasLimit(
            collectDataModelSchemasSyncedRunId(
              JSON.parse(new TextDecoder().decode(rawDirty)),
            ),
          );
        label = label2;
        break;
      }
    }
    if (!loadPlatformRuntimeAndChatEnsureSettledResult) {
      let response = await fetch(
        resolvePlatformApiAndAuthValue(
          `/api/${name}/versions/${encodeURIComponent(useContainerStoreState.version || `main`)}/workflows/${text}`,
        ),
      );
      if (!response.ok)
        throw Error(
          `${platformRuntimeAndChatEnsureSettled}: workflow "${text}" not found`,
        );
      loadPlatformRuntimeAndChatEnsureSettledResult = await response.json();
      label = `.claude/feeds/${text}.json`;
    }
    let {
      runWorkflowClient: preloadTImport2,
      propagateWorkflowClient: preloadTImport3,
    }: Dynamic = await preloadModule(
      async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let {
          runWorkflowClient: runWorkflowClient,
          propagateWorkflowClient: propagateWorkflowClient,
        }: Dynamic = await import("../lazy").then(
          (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result2.workflowClientModule,
        );
        return {
          runWorkflowClient: runWorkflowClient,
          propagateWorkflowClient: propagateWorkflowClient,
        };
      },
      collectObservabilityTelemetryValue([4, 1, 2, 5]),
      import.meta.url,
    );
    let preloadTImport4: Dynamic =
      platformRuntimeAndChatEnsureSettled === `ui-propagate-workflow`
        ? await preloadTImport3(
            name,
            text,
            label,
            loadPlatformRuntimeAndChatEnsureSettledResult,
            String(
              node.runId ??
                loadPlatformRuntimeAndChatEnsureSettledResult.syncedRunId ??
                ``,
            ),
          )
        : await preloadTImport2(
            name,
            text,
            label,
            loadPlatformRuntimeAndChatEnsureSettledResult,
          );
    let result: Dynamic = preloadTImport4.meta.result;
    return {
      runId: preloadTImport4.meta.id,
      status: preloadTImport4.meta.status,
      summary: result?.summary ?? result?.error,
      code: result?.code,
      ...(preloadTImport4.sync && {
        cellsWritten: preloadTImport4.sync.cellsWritten,
      }),
    };
  }
  if (platformRuntimeAndChatEnsureSettled === `ui-inspect`) {
    let text = node.selector ? String(node.selector) : `body`;
    let matchedElement: Dynamic = document.querySelector(`iframe`);
    return matchedElement
      ? installCommentsStoreMiss(matchedElement, text)
      : {
          miss: `no dashboard iframe is currently rendered`,
        };
  }
  throw Error(`unknown tab-rpc op: ${platformRuntimeAndChatEnsureSettled}`);
}

function filterPlatformRuntimeAndChatUser(
  filterPlatformRuntimeAndChatUser2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options.role !== `user`) return filterPlatformRuntimeAndChatUser2;
  let filterPlatformRuntimeAndChatUserIndex: Dynamic =
    filterPlatformRuntimeAndChatUser2.findIndex(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.text === options.text,
    );
  return filterPlatformRuntimeAndChatUserIndex < 0
    ? filterPlatformRuntimeAndChatUser2
    : filterPlatformRuntimeAndChatUser2.filter(
        (
          rolldownNImport2?: unknown,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ) => index !== filterPlatformRuntimeAndChatUserIndex,
      );
}

var PlatformRuntimeAndChatState3: Dynamic;

var PlatformRuntimeAndChatState4: Dynamic;

var PlatformRuntimeAndChatState5: Dynamic;

function isPlatformRuntimeAndChatMessages(
  platformRuntimeAndChatMessages?: Dynamic,
  response?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  useChatStore.setState(
    (
      platformRuntimeAndChatMessages2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let filteredMessages: Dynamic =
        platformRuntimeAndChatMessages2.messages.filter(
          (message?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            message.pending,
        );
      let lookup: Dynamic = context
        ? new (Map as Dynamic)()
        : new (Map as Dynamic)(
            platformRuntimeAndChatMessages2.messages
              .filter(
                (message?: Dynamic, ..._extraArguments: unknown[]) =>
                  !message.pending,
              )
              .map(
                (
                  filteredMessage?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => [filteredMessage.ts, filteredMessage],
              ),
          );
      for (let isPlatformRuntimeAndChatMessagesResult of platformRuntimeAndChatMessages as Dynamic)
        if (isPlatformRuntimeAndChatMessagesResult.deleted) {
          lookup.delete(isPlatformRuntimeAndChatMessagesResult.ts);
        } else {
          filteredMessages = filterPlatformRuntimeAndChatUser(
            filteredMessages,
            isPlatformRuntimeAndChatMessagesResult,
          );
          lookup.set(
            isPlatformRuntimeAndChatMessagesResult.ts,
            isPlatformRuntimeAndChatMessagesResult,
          );
        }
      let isPlatformRuntimeAndChatMessagesHandler: Dynamic = (
        platformRuntimeAndChatMessages3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformRuntimeAndChatMessages3.displayTs ??
        platformRuntimeAndChatMessages3.ts;
      return {
        messages: [...lookup.values(), ...filteredMessages].toSorted(
          (
            item?: Dynamic,
            item2?: Dynamic,
            ..._extraArguments: unknown[]
          ): number =>
            isPlatformRuntimeAndChatMessagesHandler(item) -
            isPlatformRuntimeAndChatMessagesHandler(item2),
        ),
        status: response.status,
        statuses: response.statuses,
        running: response.running,
      };
    },
  );
}

function resolvePlatformRuntimeAndChatValues(
  ..._extraArguments: unknown[]
): undefined {
  PlatformRuntimeAndChatState5 = null;
  let PlatformRuntimeAndChatState32: Dynamic = PlatformRuntimeAndChatState3;
  let PlatformRuntimeAndChatState42: Dynamic = PlatformRuntimeAndChatState4;
  PlatformRuntimeAndChatState3 = null;
  PlatformRuntimeAndChatState4 = null;
  if (PlatformRuntimeAndChatState32 && PlatformRuntimeAndChatState42) {
    isPlatformRuntimeAndChatMessages(
      PlatformRuntimeAndChatState32.values(),
      PlatformRuntimeAndChatState42,
      false,
    );
  }
}

function resolvePlatformRuntimeAndChatValue6(
  ..._extraArguments: unknown[]
): undefined {
  if (
    PlatformRuntimeAndChatState5 !== null &&
    typeof cancelAnimationFrame !== "undefined"
  ) {
    cancelAnimationFrame(PlatformRuntimeAndChatState5);
  }
  PlatformRuntimeAndChatState5 = null;
  PlatformRuntimeAndChatState3 = null;
  PlatformRuntimeAndChatState4 = null;
}

function updatePlatformRuntimeAndChatHidden(
  updatePlatformRuntimeAndChatHidden2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformRuntimeAndChatState3 ??= new (Map as Dynamic)();
  for (let updatePlatformRuntimeAndChatHiddenResult of updatePlatformRuntimeAndChatHidden2 as Dynamic)
    PlatformRuntimeAndChatState3.set(
      updatePlatformRuntimeAndChatHiddenResult.ts,
      updatePlatformRuntimeAndChatHiddenResult,
    );
  PlatformRuntimeAndChatState4 = options;
  if (
    typeof requestAnimationFrame === "undefined" ||
    (typeof document !== "undefined" && document.hidden)
  ) {
    resolvePlatformRuntimeAndChatValues();
    return;
  }
  if (PlatformRuntimeAndChatState5 === null) {
    PlatformRuntimeAndChatState5 = requestAnimationFrame(
      resolvePlatformRuntimeAndChatValues,
    );
  }
}

var platformRuntimeAndChatValue15000: number;

var platformRuntimeAndChatValue60000: Dynamic;

var platformRuntimeAndChatMap: Dynamic;

var platformRuntimeAndChatValue0: number;

var PlatformRuntimeAndChatMessage2: Dynamic;

var PlatformRuntimeAndChatMessage3: Dynamic;

var wsInstance: Dynamic;

var platformRuntimeAndChatValue_13: boolean;

var platformRuntimeAndChatValue02: number;

var platformRuntimeAndChatValue30000: number;

var platformRuntimeAndChatValue90000: number;

var PlatformRuntimeAndChatBongoDraftBeforeForcedReload: string;

var PlatformRuntimeAndChatClientVersionReloaded: string;

function resolvePlatformRuntimeAndChatGetItem(..._extraArguments: unknown[]) {
  try {
    let item = sessionStorage.getItem(
      PlatformRuntimeAndChatBongoDraftBeforeForcedReload,
    );
    if (item) {
      sessionStorage.removeItem(
        PlatformRuntimeAndChatBongoDraftBeforeForcedReload,
      );
      return item;
    }
  } catch {}
  return ``;
}

var platformRuntimeAndChatSet: Dynamic;

function resolvePlatformRuntimeAndChatTrim(
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolvePlatformRuntimeAndChatTrimResult of platformRuntimeAndChatSet as Dynamic)
    try {
      let platformRuntimeAndChatTrimResult: Dynamic =
        resolvePlatformRuntimeAndChatTrimResult();
      if (platformRuntimeAndChatTrimResult.trim()) {
        items.push(platformRuntimeAndChatTrimResult);
      }
    } catch {}
  return items;
}

function hasAuxDraft(..._extraArguments: unknown[]) {
  return resolvePlatformRuntimeAndChatTrim().length > 0;
}

function buildReloadDraftStash(
  reloadDraftStash?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return [reloadDraftStash, ...resolvePlatformRuntimeAndChatTrim()].filter(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.trim(),
  ).join(`

`);
}

function forceClientReload(
  forceClientReload2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 0;
  try {
    count = Number(
      sessionStorage.getItem(PlatformRuntimeAndChatClientVersionReloaded) ?? 0,
    );
  } catch {}
  if (Date.now() - count < 3e4) return false;
  try {
    let reloadDraftStash = buildReloadDraftStash(useChatStore.getState().draft);
    if (reloadDraftStash) {
      sessionStorage.setItem(
        PlatformRuntimeAndChatBongoDraftBeforeForcedReload,
        reloadDraftStash,
      );
    }
    sessionStorage.setItem(FORCED_RELOAD_SID_KEY, sessionId);
  } catch {}
  try {
    sessionStorage.setItem(
      PlatformRuntimeAndChatClientVersionReloaded,
      String(Date.now()),
    );
  } catch {
    return false;
  }
  console.warn(`[client] forced reload (${forceClientReload2})`);
  location.reload();
  return true;
}

function updatePlatformRuntimeAndChatTimer(
  updatePlatformRuntimeAndChatTimer2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let sentAt = Date.now();
  let knownRunIds: Dynamic = new (Set as Dynamic)(Object.keys(options));
  let timer = setTimeout((..._extraArguments: unknown[]): undefined => {
    platformRuntimeAndChatMap.delete(updatePlatformRuntimeAndChatTimer2);
    withWebSpan(
      `chat.turn_watchdog`,
      {
        [TELEMETRY_ATTRIBUTE_NAMES.turnWatchdog]: `unresponsive`,
        [TELEMETRY_ATTRIBUTE_NAMES.turnWatchdogMs]:
          platformRuntimeAndChatValue15000,
        [TELEMETRY_ATTRIBUTE_NAMES.sseConnected]:
          useChatStore.getState().error !== `chat stream disconnected`,
        [TELEMETRY_ATTRIBUTE_NAMES.sseLastFrameAgoMs]:
          platformRuntimeAndChatValue0
            ? Date.now() - platformRuntimeAndChatValue0
            : -1,
        [TELEMETRY_ATTRIBUTE_NAMES.clientRev]: serverRev() ?? ``,
        [TELEMETRY_ATTRIBUTE_NAMES.sseRev]: PlatformRuntimeAndChatMessage2,
        [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
      },
      (..._extraArguments: unknown[]): undefined => {},
      `chat.turn_unresponsive`,
    );
  }, platformRuntimeAndChatValue15000);
  platformRuntimeAndChatMap.set(updatePlatformRuntimeAndChatTimer2, {
    timer: timer,
    sentAt: sentAt,
    knownRunIds: knownRunIds,
  });
  isPlatformRuntimeAndChatFirstStatus(useChatStore.getState().statuses);
}

function isPlatformRuntimeAndChatFirstStatus(
  platformRuntimeAndChatFirstStatus?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformRuntimeAndChatMap.size === 0) return;
  let platformRuntimeAndChatFirstStatusKeys = Object.keys(
    platformRuntimeAndChatFirstStatus,
  );
  for (let [
    isPlatformRuntimeAndChatFirstStatusResult,
    isPlatformRuntimeAndChatFirstStatusResult2,
  ] of platformRuntimeAndChatMap as Dynamic) {
    let platformRuntimeAndChatFirstStatusKey =
      platformRuntimeAndChatFirstStatusKeys.find(
        (
          platformRuntimeAndChatFirstStatusKey2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          !isPlatformRuntimeAndChatFirstStatusResult2.knownRunIds.has(
            platformRuntimeAndChatFirstStatusKey2,
          ),
      );
    if (!platformRuntimeAndChatFirstStatusKey) continue;
    clearTimeout(isPlatformRuntimeAndChatFirstStatusResult2.timer);
    platformRuntimeAndChatMap.delete(isPlatformRuntimeAndChatFirstStatusResult);
    let difference =
      Date.now() - isPlatformRuntimeAndChatFirstStatusResult2.sentAt;
    withWebSpan(
      `chat.turn_watchdog`,
      {
        [TELEMETRY_ATTRIBUTE_NAMES.turnWatchdog]: `first_status`,
        [TELEMETRY_ATTRIBUTE_NAMES.turnWatchdogMs]: difference,
        [TELEMETRY_ATTRIBUTE_NAMES.runId]: platformRuntimeAndChatFirstStatusKey,
        [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
      },
      (..._extraArguments: unknown[]): undefined => {},
      `chat.turn_first_status`,
    );
  }
}

var useChatStore: Dynamic;

var platformRuntimeAndChatValue03: number;

var platformRuntimeAndChatValue1: number;

var platformRuntimeAndChatValue300002: number;

var platformRuntimeAndChatValue8: number;

var platformRuntimeAndChatValue5000: number;

var platformRuntimeAndChatMap2: Dynamic;

var PlatformRuntimeAndChatState6: Dynamic;

var platformRuntimeAndChatValue1500: number;

var platformRuntimeAndChatValue10000: number;

var platformRuntimeAndChatValue50002: number;

var platformRuntimeAndChatValue100002: number;

var platformRuntimeAndChatValue150002: number;

var platformRuntimeAndChatValue50003: number;

var platformRuntimeAndChatSet2: Dynamic;

var platformRuntimeAndChatValue50004: number;

var PlatformRuntimeAndChatState7: Dynamic;

var resolvePlatformRuntimeAndChatGapMs: Dynamic;

var platformRuntimeAndChatSet3: Dynamic;

function resolvePlatformRuntimeAndChatAnon(
  platformRuntimeAndChatAnon?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let record2: Dynamic = {
    [TELEMETRY_ATTRIBUTE_NAMES.container]: platformRuntimeAndChatAnon.container,
    [TELEMETRY_ATTRIBUTE_NAMES.roomPath]: platformRuntimeAndChatAnon.room,
    [TELEMETRY_ATTRIBUTE_NAMES.userId]:
      platformRuntimeAndChatAnon.userId ??
      PlatformApiAndAuthUser.getState().user?.id ??
      `anon`,
    [TELEMETRY_ATTRIBUTE_NAMES.ldocRejoinAction]:
      platformRuntimeAndChatAnon.action,
    [TELEMETRY_ATTRIBUTE_NAMES.ldocResyncReason]:
      platformRuntimeAndChatAnon.reason,
    [TELEMETRY_ATTRIBUTE_NAMES.ldocAwayMs]: platformRuntimeAndChatAnon.awayMs,
    [TELEMETRY_ATTRIBUTE_NAMES.serverBuild]:
      platformRuntimeAndChatAnon.serverBuild,
    [TELEMETRY_ATTRIBUTE_NAMES.clientBuild]:
      platformRuntimeAndChatAnon.clientBuild,
  };
  PlatformRuntimeAndChatState6.onSpan?.(`ldoc.rejoin`, record2);
  withWebSpan(
    `ldoc.rejoin`,
    record2,
    (..._extraArguments: unknown[]): undefined => {},
    `ldoc.rejoin_${platformRuntimeAndChatAnon.action}`,
  );
}

var PlatformRuntimeAndChatBongoLdocRejoinReloadSpan: string;

var platformRuntimeAndChatValue120000: number;

function resolvePlatformRuntimeAndChatUserId(
  platformRuntimeAndChatUserId?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let userId: Dynamic = PlatformApiAndAuthUser.getState().user?.id ?? `anon`;
    sessionStorage.setItem(
      PlatformRuntimeAndChatBongoLdocRejoinReloadSpan,
      JSON.stringify({
        ...platformRuntimeAndChatUserId,
        userId: userId,
        at: Date.now(),
      }),
    );
  } catch {}
}

function resolvePlatformRuntimeAndChatRemoveItem(
  ..._extraArguments: unknown[]
): undefined {
  try {
    sessionStorage.removeItem(PlatformRuntimeAndChatBongoLdocRejoinReloadSpan);
  } catch {}
}

function isPlatformRuntimeAndChatContainer(..._extraArguments: unknown[]) {
  let isPlatformRuntimeAndChatContainerResult: Dynamic = null;
  try {
    isPlatformRuntimeAndChatContainerResult = sessionStorage.getItem(
      PlatformRuntimeAndChatBongoLdocRejoinReloadSpan,
    );
    if (isPlatformRuntimeAndChatContainerResult !== null) {
      sessionStorage.removeItem(
        PlatformRuntimeAndChatBongoLdocRejoinReloadSpan,
      );
    }
  } catch {}
  if (!isPlatformRuntimeAndChatContainerResult) return false;
  try {
    let parse: Dynamic = JSON.parse(isPlatformRuntimeAndChatContainerResult);
    if (
      typeof parse.at != `number` ||
      Date.now() - parse.at > platformRuntimeAndChatValue120000 ||
      typeof parse.reason != `string` ||
      !platformRuntimeAndChatSet3.has(parse.reason)
    )
      return false;
    let slice: Dynamic = (
      platformRuntimeAndChatContainer?: unknown,
      ..._extraArguments: unknown[]
    ) =>
      typeof platformRuntimeAndChatContainer == `string`
        ? platformRuntimeAndChatContainer.slice(0, 256)
        : ``;
    resolvePlatformRuntimeAndChatAnon({
      container: slice(parse.container),
      room: slice(parse.room),
      action: `reload`,
      reason: parse.reason,
      awayMs:
        typeof parse.awayMs == `number` && Number.isFinite(parse.awayMs)
          ? parse.awayMs
          : 0,
      serverBuild: slice(parse.serverBuild),
      clientBuild: slice(parse.clientBuild),
      userId: slice(parse.userId) || undefined,
    });
    return true;
  } catch {
    return false;
  }
}

var platformRuntimeAndChatMap3: Dynamic;

var platformRuntimeAndChatMap4: Dynamic;

var platformRuntimeAndChatMap5: Dynamic;

function isPlatformRuntimeAndChatValues(
  platformRuntimeAndChatValues?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let now = Date.now();
  for (let isPlatformRuntimeAndChatValuesResult of platformRuntimeAndChatMap5.values() as Dynamic)
    if (
      now - isPlatformRuntimeAndChatValuesResult() <
      platformRuntimeAndChatValues
    )
      return false;
  return true;
}

var resolvePlatformRuntimeAndChatValues2: (platformRuntimeAndChatValues2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

async function loadPlatformRuntimeAndChatValue3(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return okJson(await rawReq(`GET`, `/api/update-check`));
}

var resolvePlatformRuntimeAndChatAnon2: Dynamic;

function resolvePlatformRuntimeAndChatValue7(
  platformRuntimeAndChatValue7?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    platformRuntimeAndChatValue7[0] === platformRuntimeAndChatValue03 &&
    (platformRuntimeAndChatValue7[1] === 2 ||
      platformRuntimeAndChatValue7[1] === 1)
  );
}

var PlatformRuntimeAndChatState8: symbol;

var PlatformRuntimeAndChatIframe: symbol;

var platformRuntimeAndChatPattern2: RegExp;

var resolvePlatformRuntimeAndChatValue8: (platformRuntimeAndChatValue82?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var platformRuntimeAndChatMap6: Dynamic;

var platformRuntimeAndChatMap7: Dynamic;

var platformRuntimeAndChatValue600002: number;

function clearPlatformRuntimeAndChatIndexOf(
  ..._extraArguments: unknown[]
): undefined {
  let now = Date.now();
  for (let [
    clearPlatformRuntimeAndChatIndexOfResult,
    activity,
  ] of platformRuntimeAndChatMap6 as Dynamic) {
    if (now - activity.at <= platformRuntimeAndChatValue600002) continue;
    let clearPlatformRuntimeAndChatIndexOfResultIndex: Dynamic =
      clearPlatformRuntimeAndChatIndexOfResult.indexOf(`|`);
    let byPathItem: Dynamic =
      PlatformRuntimeAndChatByPath.getState().byPath[
        clearPlatformRuntimeAndChatIndexOfResult.slice(
          clearPlatformRuntimeAndChatIndexOfResultIndex + 1,
        )
      ];
    if (
      byPathItem &&
      !byPathItem.detached &&
      byPathItem.readonly &&
      byPathItem.container ===
        clearPlatformRuntimeAndChatIndexOfResult.slice(
          0,
          clearPlatformRuntimeAndChatIndexOfResultIndex,
        )
    ) {
      activity.at = now;
      continue;
    }
    platformRuntimeAndChatMap6.delete(clearPlatformRuntimeAndChatIndexOfResult);
  }
  for (let [
    clearPlatformRuntimeAndChatIndexOfResult,
    activity,
  ] of platformRuntimeAndChatMap7 as Dynamic)
    if (now - activity.at > platformRuntimeAndChatValue600002) {
      platformRuntimeAndChatMap7.delete(
        clearPlatformRuntimeAndChatIndexOfResult,
      );
    }
}

function updatePlatformRuntimeAndChatByPath(
  updatePlatformRuntimeAndChatByPath2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let byPathItem: Dynamic =
    PlatformRuntimeAndChatByPath.getState().byPath[options];
  if (
    byPathItem &&
    !byPathItem.detached &&
    byPathItem.container === updatePlatformRuntimeAndChatByPath2 &&
    !byPathItem.readonly
  ) {
    applyUpdate(byPathItem.ydoc, context);
    return;
  }
  let platformRuntimeAndChatValue82 = resolvePlatformRuntimeAndChatValue8(
    updatePlatformRuntimeAndChatByPath2,
    options,
  );
  let platformRuntimeAndChatMap6Entry: Dynamic = platformRuntimeAndChatMap6.get(
    platformRuntimeAndChatValue82,
  );
  platformRuntimeAndChatMap6.set(platformRuntimeAndChatValue82, {
    u: platformRuntimeAndChatMap6Entry
      ? mergeUpdates([platformRuntimeAndChatMap6Entry.u, context])
      : context,
    at: Date.now(),
  });
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformRuntimeAndChat1Step1(): void {
  (resolvePlatformRuntimeAndChatThen = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../prose-editor/runtime-source").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result.editorRuntimeSource,
        ),
      [],
      import.meta.url,
    ));
  (resolvePlatformRuntimeAndChatValue = (
    platformRuntimeAndChatValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    writeVarUint(platformRuntimeAndChatValue, 0);
    writeVarUint8Array(platformRuntimeAndChatValue, encodeStateVector(options));
  });
  (resolvePlatformRuntimeAndChatValue2 = (
    platformRuntimeAndChatValue2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    writeVarUint(platformRuntimeAndChatValue2, 1);
    writeVarUint8Array(
      platformRuntimeAndChatValue2,
      encodeStateAsUpdate(options, context),
    );
  });
  (resolvePlatformRuntimeAndChatValue3 = (
    platformRuntimeAndChatValue3?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformRuntimeAndChatValue2(
      options,
      context,
      readVarUint8Array(platformRuntimeAndChatValue3),
    ));
  (resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate = (
    platformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      applyUpdate(
        options,
        readVarUint8Array(
          platformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate,
        ),
        context,
      );
    } catch (resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdateResult: Dynamic) {
      dependencies?.(
        resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdateResult,
      );
      console.error(
        `Caught error while handling a Yjs update`,
        resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdateResult,
      );
    }
  });
  (resolvePlatformRuntimeAndChatValue4 = (
    platformRuntimeAndChatValue4?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    writeVarUint(platformRuntimeAndChatValue4, 2);
    writeVarUint8Array(platformRuntimeAndChatValue4, options);
  });
  (PlatformRuntimeAndChatState = resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate);
  (resolvePlatformRuntimeAndChatUnknownMessageType = (
    platformRuntimeAndChatUnknownMessageType?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let varUint: Dynamic = readVarUint(platformRuntimeAndChatUnknownMessageType);
    switch (varUint) {
      case 0:
        resolvePlatformRuntimeAndChatValue3(
          platformRuntimeAndChatUnknownMessageType,
          options,
          context,
        );
        break;
      case 1:
        resolvePlatformRuntimeAndChatCaughtErrorWhileHandlingAYjsUpdate(
          platformRuntimeAndChatUnknownMessageType,
          context,
          dependencies,
          argument,
        );
        break;
      case 2:
        PlatformRuntimeAndChatState(
          platformRuntimeAndChatUnknownMessageType,
          context,
          dependencies,
          argument,
        );
        break;
      default:
        throw Error(`Unknown message type`);
    }
    return varUint;
  });
  (PlatformRuntimeAndChatState2 = 50 * 1024 * 1024);
  (PlatformRuntimeAndChat000000 = `000000`);
  (PlatformRuntimeAndChatJoin = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  /* BGO-480: full design-system token block. The agent (and any caller) sees
     these in the file it's editing — no system-prompt text needed. The
     renderer injects @font-face for "Anthropic Sans"/"Anthropic Serif"; the
     stack falls through cleanly when not. */
  :root {
    --ink: #1f1e1d; --paper: #ffffff; --card: #ffffff; --panel: #f5f4ed;
    --line: #dbd9d4; --muted: #8a8882;
    ${[`#2a78d6`, `#eb6834`, `#1baf7a`, `#0d366b`, `#d55181`, `#008300`, `#4a3aa7`, `#e66767`].map((item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => `--series-${index + 1}: ${item};`).join(` `)} --danger: #d03b3b;
    /* legacy aliases are hue-anchored (clay=blue, sky=aqua, moss=yellow) — a
       series reorder must repoint them so old docs keep resolving the same hex;
       moss keeps its yellow literal now that no series slot is yellow */
    --clay: var(--series-1); --sky: var(--series-3); --moss: #c98500;
    --font-body: var(--cds-font-sans, "Anthropic Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif);
    --font-heading: var(--cds-font-voice, "Anthropic Serif", ui-serif, Georgia, "Times New Roman", serif);
  }
  html{background:var(--paper)}
  body{font:16px/1.65 var(--font-body);max-width:720px;margin:120px auto;padding:0 24px;color:var(--ink);background:var(--paper)}
  [data-prose] h1{font:400 32px/1.2 var(--font-heading);letter-spacing:-.01em;margin:0 0 .75em}
  [data-prose] h2{font:400 22px/1.3 var(--font-heading);letter-spacing:-.005em;margin:1.6em 0 .5em}
  [data-prose] h3{font:400 18px/1.35 var(--font-heading);margin:1.4em 0 .4em}
  [data-prose] p{margin:.6em 0}
  [data-prose] ul,[data-prose] ol{margin:.6em 0;padding-left:1.4em}
  [data-prose] li{margin:.25em 0}
  [data-prose] blockquote{margin:.8em 0;padding:.1em 1em;border-left:3px solid var(--line);color:var(--muted)}
</style>
</head>
<body>
  <div data-prose="main" data-prose-seed><h1></h1><p></p></div>
</body>
</html>
`);
  (PlatformRuntimeAndChatXlsx = Object.fromEntries(
    Object.entries({
      xlsx: `Spreadsheet`,
      csv: `Spreadsheet`,
      html: `File`,
      ldoc: `File`,
      docx: `File`,
      pdf: `File`,
      pptx: `Slides`,
      md: `CodeBrackets`,
      code: `CodeBrackets`,
      image: `Image`,
      file: `File`,
    }).map(
      (
        [recordEntry, recordEntry2]: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [
        recordEntry,
        resolvePlatformRuntimeAndChatCustomSize(recordEntry2),
      ],
    ),
  ));
  PlatformRuntimeAndChatXlsx.xlsx;
  PlatformRuntimeAndChatXlsx.html;
  PlatformRuntimeAndChatXlsx.docx;
  PlatformRuntimeAndChatXlsx.pptx;
  PlatformRuntimeAndChatXlsx.xlsx;
  (PlatformRuntimeAndChatXlsx2 = {
    xlsx: `text-file-sheet`,
    csv: `text-file-sheet`,
    html: `text-file-doc`,
    ldoc: `text-file-doc`,
    docx: `text-file-docx`,
    pdf: `text-danger`,
    md: `text-secondary`,
    pptx: `text-file-slide`,
    image: `text-file-image`,
    code: `text-secondary`,
    file: `text-muted`,
  });
  (PlatformRuntimeAndChatXlsx3 = {
    xlsx: `sheet`,
    csv: `sheet`,
    html: `doc`,
    ldoc: `doc`,
    docx: `doc`,
    pdf: `doc`,
    md: `neutral`,
    pptx: `neutral`,
    image: `neutral`,
    code: `neutral`,
    file: `neutral`,
  });
  (PlatformRuntimeAndChatSheet = {
    sheet: `#c3cfa9`,
    doc: `#b4cce4`,
    neutral: `#d8d3bd`,
  });
  Object.fromEntries(
    Object.entries(PlatformRuntimeAndChatXlsx3).map(
      (
        [
          PlatformRuntimeAndChatXlsx3Entry,
          PlatformRuntimeAndChatXlsx3Entry2,
        ]: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [
        PlatformRuntimeAndChatXlsx3Entry,
        PlatformRuntimeAndChatSheet[PlatformRuntimeAndChatXlsx3Entry2],
      ],
    ),
  );
  (resolvePlatformRuntimeAndChatPath = (
    platformRuntimeAndChatPath?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let observabilityBrowserAndOperationEventsXlsx: string =
      resolveObservabilityBrowserAndOperationEventsXlsx(
        platformRuntimeAndChatPath.path,
      );
    return createReactElement(PlatformRuntimeAndChatXlsx[observabilityBrowserAndOperationEventsXlsx], {
  size: platformRuntimeAndChatPath.size ?? 12,
  className: `shrink-0 ${PlatformRuntimeAndChatXlsx2[observabilityBrowserAndOperationEventsXlsx]} ${platformRuntimeAndChatPath.className ?? ``}`
});
  });
  (platformRuntimeAndChatPattern = /^\/(projects|skills|users)(\/|$)/);
  (resolvePlatformRuntimeAndChatValue5 = (
    platformRuntimeAndChatValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformRuntimeAndChatValue5 === `/`);
  (resolvePlatformRuntimeAndChatPill = (
    platformRuntimeAndChatPill?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformRuntimeAndChatPill === `pill`
      ? `floating`
      : platformRuntimeAndChatPill);
  (PlatformRuntimeAndChatSet = {
    set: (mode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `workspace-chat-mode`,
        mode: mode,
      }),
  });
  (PlatformRuntimeAndChatMode = updatePlatformApiAndAuthDeps(
    (
      platformRuntimeAndChatMode?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [platformRuntimeAndChatMode.workspaceChatMode],
    (
      platformRuntimeAndChatMode?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      mode: platformRuntimeAndChatMode.workspaceChatMode,
      ...PlatformRuntimeAndChatSet,
    }),
  ));
  (PlatformRuntimeAndChatAssign = Object.assign(
    function (
      platformRuntimeAndChatAssign?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolvePlatformApiAndAuthState3(
        PlatformRuntimeAndChatMode,
        platformRuntimeAndChatAssign,
      );
    },
    {
      getState: (..._extraArguments: unknown[]): Dynamic =>
        PlatformRuntimeAndChatMode(
          resolvePlatformApiAndAuthState4(),
          PlatformApiAndAuthState2,
        ),
    },
  ));
  (PlatformRuntimeAndChatSet2 = {
    set: (mode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `home-chat-mode`,
        mode: mode,
      }),
  });
  (PlatformRuntimeAndChatMode2 = updatePlatformApiAndAuthDeps(
    (
      platformRuntimeAndChatMode2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [platformRuntimeAndChatMode2.homeChatMode],
    (
      platformRuntimeAndChatMode2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      mode: platformRuntimeAndChatMode2.homeChatMode,
      ...PlatformRuntimeAndChatSet2,
    }),
  ));
  (PlatformRuntimeAndChatAssign2 = Object.assign(
    function (
      platformRuntimeAndChatAssign2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolvePlatformApiAndAuthState3(
        PlatformRuntimeAndChatMode2,
        platformRuntimeAndChatAssign2,
      );
    },
    {
      getState: (..._extraArguments: unknown[]): Dynamic =>
        PlatformRuntimeAndChatMode2(
          resolvePlatformApiAndAuthState4(),
          PlatformApiAndAuthState2,
        ),
    },
  ));
  (PlatformRuntimeAndChatDISCONNECTTOASTID = createLiveModuleNamespace({
    DISCONNECT_TOAST_ID: (..._extraArguments: unknown[]) => DISCONNECT_TOAST_ID,
    buildReloadDraftStash: (..._extraArguments: unknown[]): Dynamic =>
      buildReloadDraftStash,
    clearCommentWorking: (..._extraArguments: unknown[]): Dynamic =>
      clearCommentWorking,
    forceClientReload: (..._extraArguments: unknown[]): Dynamic =>
      forceClientReload,
    handleCommentStatusLine: (..._extraArguments: unknown[]): Dynamic =>
      handleCommentStatusLine,
    hasAuxDraft: (..._extraArguments: unknown[]): Dynamic => hasAuxDraft,
    revealChat: (..._extraArguments: unknown[]): Dynamic => revealChat,
    setDisconnectToastSuppressed: (..._extraArguments: unknown[]): Dynamic =>
      setDisconnectToastSuppressed,
    useChatStore: (..._extraArguments: unknown[]): Dynamic => useChatStore,
    wsInstance: (..._extraArguments: unknown[]): Dynamic => wsInstance,
  }));
  (DISCONNECT_TOAST_ID = `chat-disconnected`);
  (PlatformRuntimeAndChatMessage = `Lost connection to server — reconnecting…`);
  (platformRuntimeAndChatValue_1 = false);
  (platformRuntimeAndChatValue_12 = false);
  (revealChat = (..._extraArguments: unknown[]): undefined => {
    if (
      resolvePlatformRuntimeAndChatValue5(
        resolvePlatformApiAndAuthStartsWith(location.pathname),
      )
    ) {
      let PlatformRuntimeAndChatAssign2State: Dynamic =
        PlatformRuntimeAndChatAssign2.getState();
      if (PlatformRuntimeAndChatAssign2State.mode === `pill`) {
        PlatformRuntimeAndChatAssign2State.set(`floating`);
      }
      return;
    }
    if (
      platformRuntimeAndChatPattern.test(resolvePlatformApiAndAuthPathOverride())
    ) {
      let PlatformRuntimeAndChatAssignState: Dynamic =
        PlatformRuntimeAndChatAssign.getState();
      PlatformRuntimeAndChatAssignState.set(
        resolvePlatformRuntimeAndChatPill(PlatformRuntimeAndChatAssignState.mode),
      );
    }
  });
  (resolvePlatformRuntimeAndChatDecode = (
    platformRuntimeAndChatDecode?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    new TextDecoder().decode(
      platformRuntimeAndChatDecode instanceof Uint8Array
        ? platformRuntimeAndChatDecode
        : new Uint8Array(platformRuntimeAndChatDecode),
    ));
  (resolvePlatformRuntimeAndChatFromCharCode = (
    platformRuntimeAndChat?: Dynamic,
    ..._extraArguments: unknown[]
  ) => String.fromCharCode(65 + platformRuntimeAndChat));
  (PlatformRuntimeAndChatState3 = null);
  (PlatformRuntimeAndChatState4 = null);
  (PlatformRuntimeAndChatState5 = null);
  (platformRuntimeAndChatValue15000 = 15e3);
  (platformRuntimeAndChatValue60000 = 6e4);
  (platformRuntimeAndChatMap = new (Map as Dynamic)());
  (platformRuntimeAndChatValue0 = 0);
  (PlatformRuntimeAndChatMessage2 = ``);
  (PlatformRuntimeAndChatMessage3 = ``);
  (wsInstance = (..._extraArguments: unknown[]): Dynamic =>
    PlatformRuntimeAndChatMessage3);
  (platformRuntimeAndChatValue_13 = false);
  (platformRuntimeAndChatValue02 = 0);
  (platformRuntimeAndChatValue30000 = 3e4);
  (platformRuntimeAndChatValue90000 = 9e4);
  (PlatformRuntimeAndChatBongoDraftBeforeForcedReload = `bongo:draftBeforeForcedReload`);
  (PlatformRuntimeAndChatClientVersionReloaded = `clientVersionReloaded`);
  (platformRuntimeAndChatSet = new (Set as Dynamic)());
  try {
    let item = localStorage.getItem(`bongo:lastSessionAt`);
    localStorage.setItem(`bongo:lastSessionAt`, String(Date.now()));
    let number2 = Number(
      sessionStorage.getItem(PlatformRuntimeAndChatClientVersionReloaded) ?? 0,
    );
    let matchesNumber = number2 > 0 && Date.now() - number2 < 3e4;
    let difference = item ? Date.now() - Number(item) : -1;
    if (difference >= 0 && difference < 3e5 && !matchesNumber) {
      withWebSpan(
        `chat.session_reload`,
        {
          [TELEMETRY_ATTRIBUTE_NAMES.sessionReloadGapMs]: difference,
          [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
        },
        (..._extraArguments: unknown[]): undefined => {},
        `chat.session_reload`,
      );
    }
  } catch {}
  (useChatStore = create(
    (
      chatStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      messages: [],
      status: {
        text: ``,
        ts: 0,
      },
      statuses: {},
      running: false,
      draft: resolvePlatformRuntimeAndChatGetItem(),
      error: null,
      unreadAnchor: null,
      replyTo: null,
      agentFilter: `all`,
      setDraft: (draft?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        chatStore({
          draft: draft,
        }),
      setReplyTo: (replyTo?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        chatStore({
          replyTo: replyTo,
        }),
      setAgentFilter: (
        agentFilter?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        chatStore({
          agentFilter: agentFilter,
        }),
      markSeen: (..._extraArguments: unknown[]): undefined => {
        let message: Dynamic = options().messages.find(
          (message2?: Dynamic, ..._extraArguments: unknown[]) =>
            message2.role === `assistant` && !message2.read_by_user,
        );
        chatStore({
          unreadAnchor: message?.ts ?? null,
        });
        if (message) {
          fetch(resolvePlatformApiAndAuthValue(`/api/chat/seen`), {
            method: `POST`,
          }).catch((..._extraArguments: unknown[]): undefined => {});
        }
      },
      send: async (..._extraArguments: unknown[]): Promise<undefined> => {
        let text: Dynamic = options().draft.trim();
        let attachments: Dynamic =
          PlatformApiAndAuthAssign.getState().attachments;
        if (!text && !attachments.length) return;
        revealChat();
        let replyTo: Dynamic = options().replyTo?.ts;
        let url: Dynamic = updatePlatformApiAndAuthPath();
        let itemItem: Dynamic = PlatformApiAndAuthAssign.getState().items[0];
        let loc: Dynamic = itemItem
          ? {
              file: itemItem.path,
              id: itemItem.hash,
              text: itemItem.text,
              block: itemItem.block ?? undefined,
            }
          : undefined;
        let {
          RASTER_IMAGE: preloadTImport2,
          BULK_ATTACH_THRESHOLD: preloadTImport3,
        }: Dynamic = await preloadModule(
          async (..._extraArguments: unknown[]): Promise<Dynamic> => {
            let {
              RASTER_IMAGE: RASTERIMAGE,
              BULK_ATTACH_THRESHOLD: BULKATTACHTHRESHOLD,
            }: Dynamic = await Promise.resolve().then(
              (..._extraArguments: unknown[]): Dynamic =>
                DataModelSchemasBULKATTACHTHRESHOLD,
            );
            return {
              RASTER_IMAGE: RASTERIMAGE,
              BULK_ATTACH_THRESHOLD: BULKATTACHTHRESHOLD,
            };
          },
          undefined,
          import.meta.url,
        );
        let matchesAttachmentsCount = attachments.length > preloadTImport3;
        let items: Dynamic = matchesAttachmentsCount
          ? []
          : attachments.filter(
              (attachment?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                preloadTImport2.has(attachment.mediaType),
            );
        let attachments2: Dynamic = matchesAttachmentsCount
          ? attachments
          : attachments.filter(
              (attachment?: Dynamic, ..._extraArguments: unknown[]) =>
                !preloadTImport2.has(attachment.mediaType),
            );
        let images: Dynamic = items.length
          ? items.map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                path: item.path,
                name: item.name,
                mediaType: item.mediaType,
              }),
            )
          : undefined;
        let files: Dynamic = attachments2.length
          ? attachments2.map(
              (attachment?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                attachment.path,
            )
          : undefined;
        let record2: Dynamic = {
          ts: Date.now() * 1e3,
          role: `user`,
          text: text,
          url: url,
          replyTo: replyTo,
          loc: loc,
          images: images,
          files: files,
          pending: true,
        };
        chatStore(
          (chatStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            draft: ``,
            replyTo: null,
            error: null,
            messages: [...chatStore2.messages, record2],
          }),
        );
        let statuses: Dynamic = options().statuses;
        try {
          let post: Dynamic = await api.chat.post(text, {
            url: url,
            replyTo: replyTo,
            loc: loc,
            images: images,
            files: files,
          });
          if (post.kicked) {
            updatePlatformRuntimeAndChatTimer(post.ts, statuses);
          }
        } catch (useChatStoreResult: Dynamic) {
          withWebSpan(
            `chat.post_failed`,
            {
              [TELEMETRY_ATTRIBUTE_NAMES.errorType]:
                useChatStoreResult?.constructor?.name ?? `Error`,
              [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
            },
            (..._extraArguments: unknown[]): undefined => {},
            `chat.post_failed`,
          );
          chatStore(
            (chatStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              error: resolvePlatformSessionAndSourcesMessage(useChatStoreResult),
              draft: chatStore2.draft || text,
              messages: chatStore2.messages.filter(
                (message?: Dynamic, ..._extraArguments: unknown[]) =>
                  message.ts !== record2.ts || !message.pending,
              ),
            }),
          );
          return;
        }
        if (itemItem || attachments.length) {
          PlatformApiAndAuthAssign.getState().clear();
        }
      },
      sendPoint: async (
        chatStore2?: Dynamic,
        image?: Dynamic,
        loc?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        revealChat();
        chatStore({
          error: null,
        });
        let url: Dynamic = updatePlatformApiAndAuthPath();
        let statuses: Dynamic = options().statuses;
        try {
          let post: Dynamic = await api.chat.post(chatStore2, {
            url: url,
            image: image,
            loc: loc,
          });
          if (post.kicked) {
            updatePlatformRuntimeAndChatTimer(post.ts, statuses);
          }
        } catch (useChatStoreResult: Dynamic) {
          withWebSpan(
            `chat.post_failed`,
            {
              [TELEMETRY_ATTRIBUTE_NAMES.errorType]:
                useChatStoreResult?.constructor?.name ?? `Error`,
              [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
            },
            (..._extraArguments: unknown[]): undefined => {},
            `chat.post_failed`,
          );
          chatStore({
            error: resolvePlatformSessionAndSourcesMessage(useChatStoreResult),
          });
        }
      },
      sendDirect: async (
        chatStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        revealChat();
        chatStore({
          error: null,
        });
        let url: Dynamic = updatePlatformApiAndAuthPath();
        let statuses: Dynamic = options().statuses;
        try {
          let post: Dynamic = await api.chat.post(chatStore2, {
            url: url,
          });
          if (post.kicked) {
            updatePlatformRuntimeAndChatTimer(post.ts, statuses);
          }
        } catch (useChatStoreResult: Dynamic) {
          withWebSpan(
            `chat.post_failed`,
            {
              [TELEMETRY_ATTRIBUTE_NAMES.errorType]:
                useChatStoreResult?.constructor?.name ?? `Error`,
              [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
            },
            (..._extraArguments: unknown[]): undefined => {},
            `chat.post_failed`,
          );
          chatStore({
            error: resolvePlatformSessionAndSourcesMessage(useChatStoreResult),
          });
        }
      },
      connect: ((..._extraArguments: unknown[]): Dynamic => {
        let index = 0;
        let useChatStoreResult: Dynamic;
        return (..._extraArguments: unknown[]): Dynamic => (
          index++ === 0 && (useChatStoreResult = useChatStoreHandler()),
          (..._extraArguments: unknown[]): undefined => {
            if (--index === 0) {
              useChatStoreResult?.();
              useChatStoreResult = undefined;
            }
          }
        );
        function useChatStoreHandler(..._extraArguments: unknown[]): Dynamic {
          let useChatStoreResult2: Dynamic;
          let useChatStoreResult3: Dynamic;
          let useChatStoreResult4: Dynamic;
          let index2 = 0;
          let useChatStoreResult5: Dynamic;
          let count = 0;
          let enabled = false;
          let useChatStoreResult6: Dynamic;
          let useChatStoreResult7: Dynamic;
          let clearCommentWorking2 = (
            ..._extraArguments: unknown[]
          ): undefined => {
            if (options().error !== `chat stream disconnected`) {
              logError({
                source: `api`,
                message: PlatformRuntimeAndChatMessage,
                silent: true,
              });
              useChatStoreResult6 = setTimeout(
                (..._extraArguments: unknown[]): undefined => {
                  platformRuntimeAndChatValue_12 = true;
                  if (!platformRuntimeAndChatValue_1) {
                    toast.error(PlatformRuntimeAndChatMessage, {
                      id: DISCONNECT_TOAST_ID,
                      duration: 1 / 0,
                    });
                  }
                },
                1e3,
              );
            }
            resolvePlatformRuntimeAndChatValue6();
            chatStore({
              error: `chat stream disconnected`,
              running: false,
              status: {
                text: ``,
                ts: Date.now(),
              },
              statuses: {},
            });
            clearCommentWorking();
          };
          let dismiss = (..._extraArguments: unknown[]): undefined => {
            clearTimeout(useChatStoreResult6);
            platformRuntimeAndChatValue_12 = false;
            toast.dismiss(DISCONNECT_TOAST_ID);
            if (options().error === `chat stream disconnected`) {
              chatStore({
                error: null,
              });
            }
          };
          let random = (..._extraArguments: unknown[]): undefined => {
            if (enabled) return;
            clearTimeout(useChatStoreResult3);
            clearTimeout(useChatStoreResult4);
            useChatStoreResult2?.close();
            useChatStoreResult2 = undefined;
            clearCommentWorking2();
            let amount =
              Math.min(250 * 2 ** index2++, 3e4) * (0.5 + Math.random());
            let max = Math.max(count - Date.now(), amount);
            useChatStoreResult4 = setTimeout(useChatStoreHandler3, max);
          };
          let sendBeacon = (..._extraArguments: unknown[]): undefined => {
            platformRuntimeAndChatValue02 = Date.now();
            if (resolvePlatformApiAndAuthValue3()) {
              resolvePlatformApiAndAuthTopic(`chat`, `ack`);
              return;
            }
            let platformApiAndAuthValue: Dynamic = resolvePlatformApiAndAuthValue(
              `/api/chat/watch/ack?sid=${sessionId}`,
            );
            try {
              if (!navigator.sendBeacon?.(platformApiAndAuthValue)) {
                fetch(platformApiAndAuthValue, {
                  method: `POST`,
                  keepalive: true,
                })
                  .then(
                    (
                      response?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      if (!response.ok) {
                        platformRuntimeAndChatValue02 = 0;
                      }
                    },
                  )
                  .catch((..._extraArguments: unknown[]): undefined => {
                    platformRuntimeAndChatValue02 = 0;
                  });
              }
            } catch {}
          };
          let random2 = (..._extraArguments: unknown[]): undefined => {
            if (!(document.hidden || enabled)) {
              sendBeacon();
              if (count > Date.now()) {
                count = 0;
                random();
              }
            }
          };
          if (typeof document !== "undefined") {
            document.addEventListener(`visibilitychange`, random2);
          }
          let useChatStoreHandler2 = (
            ..._extraArguments: unknown[]
          ): undefined => {
            clearTimeout(useChatStoreResult3);
            useChatStoreResult3 = setTimeout(random, 45e3);
          };
          function useChatStoreHandler3(
            ..._extraArguments: unknown[]
          ): undefined {
            if (!enabled) {
              if (resolvePlatformApiAndAuthValue3()) {
                let useChatStoreResult8: Dynamic;
                let useChatStoreResult9: Dynamic;
                useChatStoreResult2 = {
                  close: (..._extraArguments: unknown[]): undefined => {
                    useChatStoreResult8?.();
                    useChatStoreResult9?.();
                  },
                  addEventListener: (
                    ..._extraArguments: unknown[]
                  ): undefined => {},
                };
                useChatStoreResult8 = updatePlatformApiAndAuthTopic(
                  `chat`,
                  (chatStore2?: Dynamic, ..._extraArguments: unknown[]) =>
                    warn({
                      data: JSON.stringify(chatStore2),
                    }),
                );
                useChatStoreResult9 = clearPlatformApiAndAuthDelete2(
                  (
                    chatStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (chatStore2 === `open`) {
                      useChatStoreHandler2();
                      dismiss();
                    }
                  },
                );
                useChatStoreHandler2();
                return;
              }
              useChatStoreResult2 = new (EventSource as Dynamic)(
                resolvePlatformApiAndAuthValue(
                  `/api/chat/watch?sid=${sessionId}`,
                ),
              );
              useChatStoreHandler2();
              useChatStoreResult2.addEventListener(`message`, warn);
              useChatStoreResult2.addEventListener(`error`, random);
              useChatStoreResult2.addEventListener(
                `open`,
                (..._extraArguments: unknown[]): undefined => {
                  useChatStoreHandler2();
                  dismiss();
                },
              );
            }
          }
          let setInterval2 = setInterval(
            (..._extraArguments: unknown[]): undefined => {
              if (
                (typeof document !== "undefined" && document.hidden) ||
                enabled ||
                !platformRuntimeAndChatValue0 ||
                platformRuntimeAndChatValue_13
              )
                return;
              let difference = Date.now() - platformRuntimeAndChatValue0;
              if (difference < 25e3) return;
              platformRuntimeAndChatValue_13 = true;
              let matchesStatusesKeysCount =
                Object.keys(options().statuses).length > 0;
              withWebSpan(
                `chat.sse_stale`,
                {
                  [TELEMETRY_ATTRIBUTE_NAMES.sseLastFrameAgoMs]: difference,
                  [TELEMETRY_ATTRIBUTE_NAMES.sseConnected]:
                    options().error !== `chat stream disconnected`,
                  [TELEMETRY_ATTRIBUTE_NAMES.clientRev]: serverRev() ?? ``,
                  [TELEMETRY_ATTRIBUTE_NAMES.sseRev]:
                    PlatformRuntimeAndChatMessage2,
                  [TELEMETRY_ATTRIBUTE_NAMES.sessionId]: sessionId,
                  [TELEMETRY_ATTRIBUTE_NAMES.turnActive]:
                    matchesStatusesKeysCount,
                },
                (..._extraArguments: unknown[]): undefined => {},
                matchesStatusesKeysCount
                  ? `chat.sse_stale_during_turn`
                  : `chat.sse_stale_idle`,
              );
              console.warn(
                `[chat] SSE stale ${Math.round(difference / 1e3)}s (turnActive=${matchesStatusesKeysCount}) — reconnecting`,
              );
              random();
            },
            1e4,
          );
          let warn = (
            chatStore2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            useChatStoreHandler2();
            platformRuntimeAndChatValue0 = Date.now();
            platformRuntimeAndChatValue_13 = false;
            if (typeof document !== "undefined") {
              let platformRuntimeAndChatValue900002 = document.hidden
                ? platformRuntimeAndChatValue90000
                : platformRuntimeAndChatValue30000;
              if (
                Date.now() - platformRuntimeAndChatValue02 >
                platformRuntimeAndChatValue900002
              ) {
                sendBeacon();
              }
            }
            try {
              let parse: Dynamic =
                ObservabilityBrowserAndOperationEventsFull.parse(
                  JSON.parse(chatStore2.data),
                );
              if (parse.rev) {
                PlatformRuntimeAndChatMessage2 = parse.rev;
              }
              if (parse.instance) {
                PlatformRuntimeAndChatMessage3 = parse.instance;
              }
              if (parse.evicted) {
                count = Date.now() + 6e4;
                return;
              }
              index2 = 0;
              if (parse.minClientVersion && parse.minClientVersion > 4) {
                forceClientReload(`min-client-version`);
                return;
              }
              let serverRev2: Dynamic = serverRev();
              if (
                parse.rev &&
                serverRev2 &&
                parse.rev !== serverRev2 &&
                parse.rev !== useChatStoreResult5
              ) {
                useChatStoreResult5 = parse.rev;
                console.warn(
                  `[chat] SSE rev ${parse.rev} ≠ server rev ${serverRev2} — reconnecting`,
                );
                if (resolvePlatformApiAndAuthValue3()) {
                  useChatStoreResult7 = setTimeout(
                    (..._extraArguments: unknown[]): undefined => {
                      if (!enabled) {
                        resolvePlatformApiAndAuthValue6(`rev-mismatch`);
                      }
                    },
                    Math.random() * platformRuntimeAndChatValue60000,
                  );
                  return;
                }
                index2 = Math.max(index2, 3);
                random();
                return;
              }
              if (parse.rev && parse.rev === serverRev2) {
                useChatStoreResult5 = undefined;
              }
              for (let entry of parse.messages as Dynamic)
                if (entry.kind === `comment-status` && entry.args) {
                  handleCommentStatusLine(entry.args);
                }
              if (!parse.full)
                for (let operation of parse.messages as Dynamic) {
                  if (operation.kind === `connector-auth` && operation.args) {
                    let args: Dynamic = operation.args;
                    if (args.name && args.code) {
                      CommentsStoreHealth.getState().promptReconnect({
                        slug: args.slug,
                        name: args.name,
                        code: args.code,
                      });
                    }
                    continue;
                  }
                  if (
                    operation.kind === `connector-auth-resolved` &&
                    operation.args
                  ) {
                    let args: Dynamic = operation.args;
                    let slug: Dynamic = args.slug ?? args.name;
                    if (slug) {
                      CommentsStoreHealth.getState().clearPromptFor(slug);
                    }
                    if (args.ok && args.slug) {
                      CommentsStoreHealth.getState().load([args.slug], {
                        fresh: true,
                      });
                    }
                    continue;
                  }
                  if (operation.kind === `comment-change` && operation.args) {
                    let args: Dynamic = operation.args;
                    if (args.container) {
                      preloadModule(
                        (..._extraArguments: unknown[]): Dynamic =>
                          Promise.resolve()
                            .then(
                              (..._extraArguments: unknown[]): Dynamic =>
                                CommentsStoreANCHORGONECARDWORDS,
                            )
                            .then(
                              (
                                result?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): Dynamic =>
                                result.useCommentStore
                                  .getState()
                                  .refetchAll(args.container),
                            ),
                        undefined,
                        import.meta.url,
                      );
                    }
                    continue;
                  }
                  if (
                    !(
                      operation.kind !== `tab-rpc` ||
                      !operation.id ||
                      !operation.op ||
                      (operation.sessionId && operation.sessionId !== sessionId)
                    )
                  ) {
                    loadPlatformRuntimeAndChatEnsureSettled(
                      operation.op,
                      operation.args ?? {},
                    ).then(
                      (result?: Dynamic, ..._extraArguments: unknown[]) =>
                        fetch(resolvePlatformApiAndAuthValue(`/api/tab/reply`), {
                          method: `POST`,
                          headers: {
                            "content-type": `application/json`,
                          },
                          body: JSON.stringify({
                            id: operation.id,
                            result: result,
                          }),
                        }),
                      (result?: Dynamic, ..._extraArguments: unknown[]) =>
                        fetch(resolvePlatformApiAndAuthValue(`/api/tab/reply`), {
                          method: `POST`,
                          headers: {
                            "content-type": `application/json`,
                          },
                          body: JSON.stringify({
                            id: operation.id,
                            error:
                              resolvePlatformSessionAndSourcesMessage(result),
                          }),
                        }),
                    );
                  }
                }
              let filteredMessages: Dynamic = parse.messages.filter(
                (entry?: Dynamic, ..._extraArguments: unknown[]) =>
                  entry.role !== `system` && entry.kind !== `files`,
              );
              let record2: Dynamic = {
                status: parse.status,
                statuses: parse.statuses ?? {},
                running: parse.running,
              };
              if (parse.full && !parse.hasOlder) {
                resolvePlatformRuntimeAndChatValue6();
                isPlatformRuntimeAndChatMessages(filteredMessages, record2, true);
              } else {
                updatePlatformRuntimeAndChatHidden(filteredMessages, record2);
              }
              if (parse.statuses) {
                isPlatformRuntimeAndChatFirstStatus(parse.statuses);
              }
            } catch (useChatStoreResult8: Dynamic) {
              console.warn(`[chat] watch frame dropped:`, useChatStoreResult8);
            }
          };
          useChatStoreHandler3();
          return (..._extraArguments: unknown[]): undefined => {
            enabled = true;
            resolvePlatformRuntimeAndChatValue6();
            clearInterval(setInterval2);
            if (typeof document !== "undefined") {
              document.removeEventListener(`visibilitychange`, random2);
            }
            clearTimeout(useChatStoreResult3);
            clearTimeout(useChatStoreResult4);
            clearTimeout(useChatStoreResult6);
            clearTimeout(useChatStoreResult7);
            useChatStoreResult2?.close();
          };
        }
      })(),
    }),
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__chatStoreTest = {
      setRevHopJitterMs: (
        callback?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        platformRuntimeAndChatValue60000 = callback;
      },
    };
  }
  (platformRuntimeAndChatValue03 = 0);
  (platformRuntimeAndChatValue1 = 1);
  (platformRuntimeAndChatValue300002 = 3e4);
  (platformRuntimeAndChatValue8 = 8);
  (platformRuntimeAndChatValue5000 = 5e3);
  (platformRuntimeAndChatMap2 = new (Map as Dynamic)());
  (PlatformRuntimeAndChatState6 = {});
  (platformRuntimeAndChatValue1500 = 1500);
  (platformRuntimeAndChatValue10000 = 1e4);
  (platformRuntimeAndChatValue50002 = 5e3);
  (platformRuntimeAndChatValue100002 = 1e4);
  (platformRuntimeAndChatValue150002 = 15e3);
  (platformRuntimeAndChatValue50003 = 5e3);
  (platformRuntimeAndChatSet2 = new (Set as Dynamic)([
    `apply-threw`,
    `behind`,
  ]));
  (platformRuntimeAndChatValue50004 = 5e3);
  (PlatformRuntimeAndChatState7 = {});
  (resolvePlatformRuntimeAndChatGapMs = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformRuntimeAndChatState7.gapMs ?? 6e4);
  (platformRuntimeAndChatSet3 = new (Set as Dynamic)([
    `reconnect`,
    `visible`,
    `clock`,
    `stale`,
  ]));
  (PlatformRuntimeAndChatBongoLdocRejoinReloadSpan = `bongo:ldocRejoinReloadSpan`);
  (platformRuntimeAndChatValue120000 = 12e4);
  (platformRuntimeAndChatMap3 = new (Map as Dynamic)());
  (platformRuntimeAndChatMap4 = new (Map as Dynamic)());
  (platformRuntimeAndChatMap5 = new (Map as Dynamic)());
  (resolvePlatformRuntimeAndChatValues2 = (
    platformRuntimeAndChatValues2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let resolvePlatformRuntimeAndChatValues2Result of platformRuntimeAndChatMap3.values() as Dynamic)
      resolvePlatformRuntimeAndChatValues2Result(
        platformRuntimeAndChatValues2,
        options,
      );
  });
  (resolvePlatformRuntimeAndChatAnon2 = (
    platformRuntimeAndChatAnon2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let email: Dynamic = PlatformApiAndAuthUser.getState().user?.email ?? `anon`;
    return resolvePlatformApiAndAuthLocalhost(
      `/api/room/${encodeURIComponent(platformRuntimeAndChatAnon2)}?uid=${encodeURIComponent(email)}`,
    );
  });
  (PlatformRuntimeAndChatState8 = Symbol(`ws`));
  (PlatformRuntimeAndChatIframe = Symbol(`iframe`));
  (platformRuntimeAndChatPattern2 = /^((?:projects|skills|users)\/[^/]+)\/versions\/main\/(.+\.html)$/);
  (resolvePlatformRuntimeAndChatValue8 = (
    platformRuntimeAndChatValue82?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${platformRuntimeAndChatValue82}|${options}`);
  (platformRuntimeAndChatMap6 = new (Map as Dynamic)());
  (platformRuntimeAndChatMap7 = new (Map as Dynamic)());
  (platformRuntimeAndChatValue600002 = 6e4);
}

export {
  PlatformRuntimeAndChatAssign,
  PlatformRuntimeAndChatDISCONNECTTOASTID,
  PlatformRuntimeAndChatIframe,
  PlatformRuntimeAndChatState6,
  PlatformRuntimeAndChatState7,
  PlatformRuntimeAndChatState8,
  PlatformRuntimeAndChatXlsx,
  clearPlatformRuntimeAndChatIndexOf,
  forceClientReload,
  handleCommentStatusLine,
  hasAuxDraft,
  isPlatformRuntimeAndChatContainer,
  isPlatformRuntimeAndChatValues,
  loadPlatformRuntimeAndChatMsg,
  loadPlatformRuntimeAndChatValue3,
  platformRuntimeAndChatMap2,
  platformRuntimeAndChatMap3,
  platformRuntimeAndChatMap4,
  platformRuntimeAndChatMap5,
  platformRuntimeAndChatMap6,
  platformRuntimeAndChatMap7,
  platformRuntimeAndChatPattern2,
  platformRuntimeAndChatSet2,
  platformRuntimeAndChatValue03,
  platformRuntimeAndChatValue1,
  platformRuntimeAndChatValue10000,
  platformRuntimeAndChatValue100002,
  platformRuntimeAndChatValue1500,
  platformRuntimeAndChatValue150002,
  platformRuntimeAndChatValue300002,
  platformRuntimeAndChatValue5000,
  platformRuntimeAndChatValue50002,
  platformRuntimeAndChatValue50003,
  platformRuntimeAndChatValue50004,
  platformRuntimeAndChatValue600002,
  platformRuntimeAndChatValue8,
  resolvePlatformRuntimeAndChatAnon,
  resolvePlatformRuntimeAndChatAnon2,
  resolvePlatformRuntimeAndChatCatch,
  resolvePlatformRuntimeAndChatCustomSize,
  resolvePlatformRuntimeAndChatGapMs,
  resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild,
  resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed,
  resolvePlatformRuntimeAndChatPath,
  resolvePlatformRuntimeAndChatPill,
  resolvePlatformRuntimeAndChatRemoveItem,
  resolvePlatformRuntimeAndChatSplit,
  resolvePlatformRuntimeAndChatTheSpellingWordListsAreNotInThisBuild,
  resolvePlatformRuntimeAndChatUnknownMessageType,
  resolvePlatformRuntimeAndChatUserId,
  resolvePlatformRuntimeAndChatValue,
  resolvePlatformRuntimeAndChatValue4,
  resolvePlatformRuntimeAndChatValue7,
  resolvePlatformRuntimeAndChatValue8,
  resolvePlatformRuntimeAndChatValues2,
  setDisconnectToastSuppressed,
  updatePlatformRuntimeAndChatByPath,
  useChatStore,
  wsInstance,
};

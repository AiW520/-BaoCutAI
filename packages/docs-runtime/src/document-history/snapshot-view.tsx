/** lfile-snapshot-view: restored from LFileSnapshotView-edTBLlnH.js. */

import type { Dynamic } from "../interop/legacy-dynamic";
import { toModuleNamespace } from "../boot/module-runtime";
import {
  EditorHostReplace3,
  EditorSelectionAndTablesDataPagesPrintSurface,
  frameProfiles,
  frameProfilesSubscribe,
  loadDataModelSchemasCss,
  loadJsxRuntime,
  loadPlatformLiveDocumentAndHistoryContainer,
  loadPlatformRuntimeAndChatMsg,
  loadReact,
  resolveEditorHostKind3,
  resolvePlatformFeatureFlagsEnabled2,
  resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild,
  resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed,
  resolvePlatformSyncAndRoutingValue16,
  updateEditorSelectionAndTablesReport,
  usePlatformSyncAndRoutingFramed,
} from "../platform/index";
import { isFrameArtifact } from "../boot/environment";
import {
  resolveLocalReference,
  resolveMentionNames,
} from "../document-app/references/chips";
import {
  documentDisplayPostState,
  documentFontsPostState,
  documentLanguageAttributes,
} from "../document-app/index";
import {
  BLOB_SHA_PATTERN,
  loadManifestFilm,
  loadManifestWidgetFilm,
  tryLoadManifestFilmBytes,
} from "../platform/lazy";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var widgetArtifactCacheByHash: Dynamic = new (Map as Dynamic)();
var compiledWidgetCacheByCode: Dynamic = new (Map as Dynamic)();
var createWidgetCacheKey = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) => `${options}:${input}`;
var getWidgetArtifactByHash: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let entry: Dynamic = widgetArtifactCacheByHash.get(input);
  if (entry) return entry;
  let value: Dynamic = (async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    try {
      let value2: Dynamic = await loadManifestFilm(input);
      return value2 &&
        typeof value2.artifact == `string` &&
        typeof value2.sourceHash == `string`
        ? value2
        : null;
    } catch {
      return null;
    }
  })();
  widgetArtifactCacheByHash.set(input, value);
  value.then((input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (input2 === null) {
      widgetArtifactCacheByHash.delete(input);
    }
  });
  return value;
};
var compileWidgetForSnapshot: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: string = createWidgetCacheKey(input, options);
  let entry: Dynamic = compiledWidgetCacheByCode.get(value);
  if (entry) return entry;
  let value2: Dynamic;
  let value3: Dynamic = loadPlatformLiveDocumentAndHistoryContainer(
    ``,
    ``,
    `film`,
    {
      read: async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let value4: Dynamic = await loadManifestWidgetFilm(input, options);
        value2 = value4.kind;
        return value4;
      },
      wait: context.wait,
    },
  );
  compiledWidgetCacheByCode.set(value, value3);
  value3.then(
    (..._extraArguments: unknown[]): undefined => undefined,
    (..._extraArguments: unknown[]): undefined => {
      if (value2 !== `compile-failed`) {
        compiledWidgetCacheByCode.delete(value);
      }
    },
  );
  return value3;
};
async function resolveWidgetSnapshotBundle(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof input.code != `string` || input.code === `` || !input.pub)
    return null;
  if (
    typeof input.bundleSha == `string` &&
    BLOB_SHA_PATTERN.test(input.bundleSha)
  ) {
    let value: Dynamic = await getWidgetArtifactByHash(input.bundleSha);
    if (value !== null) return value;
  }
  return compileWidgetForSnapshot(input.code, input.pub, options);
}
function createSnapshotPresentationGate(
  ..._extraArguments: unknown[]
): Dynamic {
  let index: number = 0;
  let value: Dynamic = null;
  return {
    posted(input?: Dynamic, ..._extraArguments: unknown[]): undefined {
      index += 1;
      value = input;
    },
    answered(..._extraArguments: unknown[]): Dynamic {
      index = Math.max(0, index - 1);
      return index === 0 ? value : null;
    },
    presented(..._extraArguments: unknown[]): Dynamic {
      return index === 0 ? value : null;
    },
    reset(..._extraArguments: unknown[]): undefined {
      index = 0;
      value = null;
    },
  };
}
var jsxRuntime: Dynamic = loadJsxRuntime();
var UNFILMED_BYTES_MESSAGE: string = `bytes not filmed`;
var finiteNumericEntries: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let state: Dynamic = {};
  if (input && typeof input == `object`)
    for (let [value, value2] of Object.entries(input) as Dynamic)
      if (typeof value2 == `number` && Number.isFinite(value2)) {
        state[value] = value2;
      }
  return state;
};
function createSnapshotFrameMessage(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return options !== null && context === `update`
    ? {
        type: `update`,
        file: input,
        ...(value.presented === true
          ? {
              presented: true,
            }
          : {}),
      }
    : {
        type: `mount`,
        file: input,
        tier: 1,
        readonly: true,
        snapshot: true,
        ...((options === null || value.placeEveryMount === true) &&
        typeof value.scrollY == `number` &&
        value.scrollY > 0
          ? {
              scrollY: value.scrollY,
            }
          : {}),
        ...(value.container
          ? {
              container: value.container,
            }
          : {}),
        ...(value.blobBridge
          ? {
              blobBridge: value.blobBridge,
            }
          : {}),
        ...(value.artifactLinkChips === true
          ? {
              artifactLinkChips: true,
            }
          : {}),
        ...(value.presented === true
          ? {
              presented: true,
            }
          : {}),
      };
}
var LIVE_DATA_PREVIEW_NOTICE: string = `Live data isn't shown while you're previewing a version.`;
function handleSnapshotBridgeRequest(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (input.verb === `widget-bundle`) {
    let value: Dynamic =
      typeof input.nodeId == `string` &&
      /^[A-Za-z0-9_-]{1,64}$/.test(input.nodeId)
        ? input.nodeId
        : ``;
    return value
      ? Promise.resolve()
          .then((..._extraArguments: unknown[]): Dynamic => context(value))
          .then(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              type: `bridge-reply`,
              id: options,
              ok: true,
              value: input2 ?? null,
            }),
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              type: `bridge-reply`,
              id: options,
              ok: false,
              error:
                input2 instanceof (Error as Dynamic) && input2.message
                  ? input2.message
                  : `bundle-read-failed`,
            }),
          )
      : Promise.resolve({
          type: `bridge-reply`,
          id: options,
          ok: true,
          value: null,
        });
  }
  return input.verb === `widget-source`
    ? Promise.resolve({
        type: `bridge-reply`,
        id: options,
        ok: true,
        value: {
          value: null,
          refused: {
            rule: `not-available`,
            message: LIVE_DATA_PREVIEW_NOTICE,
          },
        },
      })
    : null;
}
function LFileSnapshotView(
  {
    file: input,
    title: input2,
    widgets: input3,
    filmBlobs: input4,
    onCommentRects: input5,
    onCommentHover: input6,
    onCommentClick: input7,
    commentApi: input8,
    reserveCommentRail: input23 = false,
    swap: input24 = `remount`,
    scrollY: input9,
    container: input10,
    typography: input25 = null,
    display: input26 = null,
    language: input11,
    onMounted: input12,
    onError: input13,
    label: input14,
    parked: input27 = false,
    requestBlob: input15,
    requestEnums: input16,
    enumsChanged: input17,
    requestWidgetBundle: input18,
    blobMissNote: input19,
    placeEveryMount: input28 = false,
    hostLayout: input20,
    onPosted: input21,
    onPainted: input22,
    srcDoc: input29 = EditorHostReplace3,
    frameClassName: input30 = `bg-surface-popover dark:bg-surface-0`,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(false);
  let value3: Dynamic = (0, React.useRef)(false);
  let value4: Dynamic = (0, React.useRef)(null);
  let value5: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let [value6, value7]: Dynamic = (0, React.useState)(false);
  let [value8, value9]: Dynamic = (0, React.useState)(null);
  let value10: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value.current;
      if (!current || input27) return;
      let value46: Dynamic = updateEditorSelectionAndTablesReport(current, {
        mirror: isFrameArtifact(),
      });
      value4.current = value46;
      value46.report(value10.current);
      return (..._extraArguments: unknown[]): undefined => {
        value46.release();
        if (value4.current === value46) {
          value4.current = null;
        }
      };
    },
    [value8, input27],
  );
  let value11: Dynamic = (0, React.useRef)(null);
  value11.current = input;
  let value12: Dynamic = (0, React.useRef)(input3);
  value12.current = input3;
  let value13: Dynamic = (0, React.useRef)(input4);
  value13.current = input4;
  let value14: Dynamic = (0, React.useRef)(input5);
  value14.current = input5;
  let value15: Dynamic = (0, React.useRef)(input6);
  value15.current = input6;
  let value16: Dynamic = (0, React.useRef)(input7);
  value16.current = input7;
  let value17: Dynamic = (0, React.useRef)(input12);
  value17.current = input12;
  let value18: Dynamic = (0, React.useRef)(input21);
  value18.current = input21;
  let value19: Dynamic = (0, React.useRef)(input22);
  value19.current = input22;
  let value20: Dynamic = (0, React.useRef)(input15);
  value20.current = input15;
  let value21: Dynamic = (0, React.useRef)(input16);
  value21.current = input16;
  let value22: Dynamic = (0, React.useRef)(input18);
  value22.current = input18;
  let value23: Dynamic = (0, React.useRef)(input19);
  value23.current = input19;
  let value24: Dynamic = (0, React.useRef)(input13);
  value24.current = input13;
  let value25: Dynamic = (0, React.useCallback)(
    (input31?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value9(input31);
      value24.current?.(input31);
    },
    [],
  );
  let value26: Dynamic = input14 ?? `snapshot`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (input8) {
        input8.current = {
          postCommentActive: (
            input31?: Dynamic,
            options?: Dynamic,
            context: Dynamic = false,
            ..._extraArguments: unknown[]
          ): undefined => {
            let value46: Dynamic = value.current?.contentWindow;
            if (!(!value46 || value2.current)) {
              value46.postMessage(
                {
                  type: `comment-active`,
                  id: input31,
                  scroll: context,
                  focus: options,
                },
                `*`,
              );
            }
          },
        };
        return (..._extraArguments: unknown[]): undefined => {
          input8.current = null;
        };
      }
    },
    [input8],
  );
  let value27: Dynamic = usePlatformSyncAndRoutingFramed();
  let value28: Dynamic = (0, React.useRef)(value27);
  value28.current = value27;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (!(!value46 || !value6 || value2.current)) {
        value46.postMessage(
          {
            type: `theme`,
            mode: value27,
          },
          `*`,
        );
      }
    },
    [value27, value6],
  );
  let value29: Dynamic = resolvePlatformSyncAndRoutingValue16();
  let value30: Dynamic = (0, React.useRef)(value29);
  value30.current = value29;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (!(!value46 || !value6 || value2.current)) {
        value46.postMessage(
          {
            type: `page-layout`,
            layout: value29,
          },
          `*`,
        );
      }
    },
    [value29, value6],
  );
  let value31: Dynamic = (0, React.useRef)(input25);
  value31.current = input25;
  let value32: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (!value46 || !value6 || value2.current) return;
      let value47: Dynamic = documentFontsPostState(input25, value32.current);
      value32.current = value47.applied;
      if (value47.post !== null) {
        value46.postMessage(
          {
            type: `typography`,
            ...value47.post,
          },
          `*`,
        );
      }
    },
    [input25, value6],
  );
  let value33: Dynamic = (0, React.useRef)(input26);
  value33.current = input26;
  let value34: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (!value46 || !value6 || value2.current) return;
      let value47: Dynamic = documentDisplayPostState(input26, value34.current);
      value34.current = value47.applied;
      if (value47.post !== null) {
        value46.postMessage(resolveEditorHostKind3(value47.post), `*`);
      }
    },
    [input26, value6],
  );
  let value35: Dynamic = (0, React.useRef)(input2);
  value35.current = input2;
  let value36: Dynamic = (0, React.useRef)(input11);
  value36.current = input11;
  let value37: Dynamic = (0, React.useRef)(false);
  let value38: Dynamic = (0, React.useCallback)(
    (input31?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = documentLanguageAttributes(
        value36.current,
        value37.current,
      );
      value37.current = value46.declared;
      let value47: string = `${value35.current} (${value26})`;
      let value48: Dynamic =
        value46.lang === undefined
          ? {
              type: `doc-title`,
              title: value47,
            }
          : {
              type: `doc-title`,
              title: value47,
              lang: value46.lang,
            };
      input31.postMessage(value48, `*`);
    },
    [value26],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (!(!value46 || !value6 || value2.current)) {
        value38(value46);
      }
    },
    [input2, input11, value6, value38],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value46: Dynamic = (
        input31?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value49: Dynamic = value.current?.contentWindow;
        if (!value49 || input31.source !== value49 || value2.current) return;
        let data: Dynamic = input31.data;
        if (!(!data || typeof data != `object`)) {
          if (data.type === `lfile-unload`) {
            value2.current = true;
            value7(false);
            value25(`iframe navigated away`);
            return;
          }
          if (data.type === `lfile-ready`) return value7(true);
          if (data.type === `first-frame`) {
            let value50: Dynamic = value40.current.presented();
            if (value50 !== null) {
              value19.current?.(value50);
            }
            return;
          }
          if (data.type === `lfile-mounted` || data.type === `lfile-updated`) {
            let value50: Dynamic = value40.current.answered();
            value17.current?.(
              data.type === `lfile-mounted` ? `mount` : `update`,
              value50,
            );
            return;
          }
          if (data.type === `need-mermaid`) {
            resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed()
              .then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value50: Dynamic = value.current?.contentWindow;
                  if (!(!value50 || value2.current)) {
                    value50.postMessage(
                      {
                        type: `mermaid-lib`,
                        js: input32,
                      },
                      `*`,
                    );
                  }
                },
              )
              .catch((..._extraArguments: unknown[]): undefined => {
                (console as Dynamic).warn(
                  `[mermaid] library load failed (snapshot)`,
                );
                let value50: Dynamic = value.current?.contentWindow;
                if (!(!value50 || value2.current)) {
                  value50.postMessage(
                    {
                      type: `mermaid-lib-failed`,
                    },
                    `*`,
                  );
                }
              });
            return;
          }
          if (data.type === `need-extras`) {
            resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild()
              .then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value50: Dynamic = value.current?.contentWindow;
                  if (!(!value50 || value2.current)) {
                    value50.postMessage(
                      {
                        type: `extras-lib`,
                        js: input32,
                      },
                      `*`,
                    );
                  }
                },
              )
              .catch((..._extraArguments: unknown[]): undefined => {
                (console as Dynamic).warn(
                  `[extras] runtime-extras chunk load failed (snapshot)`,
                );
                let value50: Dynamic = value.current?.contentWindow;
                if (!(!value50 || value2.current)) {
                  value50.postMessage(
                    {
                      type: `extras-lib-failed`,
                    },
                    `*`,
                  );
                }
              });
            return;
          }
          if (data.type === `lfile-error`) {
            value25(
              typeof data.message == `string`
                ? data.message
                : String(data.message),
            );
            return;
          }
          if (data.type === `bridge-call`) {
            let value50: Dynamic = Number.isFinite(data.id) ? data.id : -1;
            if (data.verb === `navigate`) return;
            if (
              data.verb === `run` ||
              data.verb === `editType` ||
              data.verb === `write`
            ) {
              value49.postMessage(
                {
                  type: `bridge-reply`,
                  id: value50,
                  ok: false,
                  error: `not-allowed: snapshot view is read-only`,
                },
                `*`,
              );
              return;
            }
            if (data.verb === `widget-invoke`) {
              value49.postMessage(
                {
                  type: `bridge-reply`,
                  id: value50,
                  ok: true,
                  value: {
                    error: true,
                    rule: `not-allowed`,
                    message: `routines can't run from a snapshot view`,
                  },
                },
                `*`,
              );
              return;
            }
            if (data.verb === `people`) {
              value49.postMessage(
                {
                  type: `bridge-reply`,
                  id: value50,
                  ok: true,
                  value: [],
                },
                `*`,
              );
              return;
            }
            if (data.verb === `profiles`) {
              resolveMentionNames(
                data.ids,
                value5.current,
                isFrameArtifact() ? frameProfiles : null,
              ).then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value52: Dynamic = value.current?.contentWindow;
                  if (!(!value52 || value2.current)) {
                    value52.postMessage(
                      {
                        type: `bridge-reply`,
                        id: value50,
                        ok: true,
                        value: {
                          names: input32,
                        },
                      },
                      `*`,
                    );
                  }
                },
              );
              return;
            }
            if (data.verb === `read` || data.verb === `watch`) {
              let value52: Dynamic =
                typeof data.ref == `string` ? data.ref.slice(0, 8192) : ``;
              if (value52.startsWith(`fn:`) || value52.startsWith(`run:`)) {
                value49.postMessage(
                  {
                    type: `bridge-reply`,
                    id: value50,
                    ok: false,
                    error: `not-available: function/run state not shown in a snapshot view`,
                  },
                  `*`,
                );
                return;
              }
              let current: Dynamic = value11.current;
              let value53: Dynamic = current
                ? resolveLocalReference(current, value52)
                : {
                    ok: false,
                    error: `host-gone: file not ready`,
                  };
              let value54: Dynamic = value53.ok
                ? {
                    type: `bridge-reply`,
                    id: value50,
                    ok: true,
                    value: value53.value,
                  }
                : {
                    type: `bridge-reply`,
                    id: value50,
                    ok: false,
                    error: value53.error,
                  };
              value49.postMessage(value54, `*`);
              return;
            }
            let value51: Dynamic =
              value22.current === undefined
                ? null
                : handleSnapshotBridgeRequest(data, value50, value22.current);
            if (value51 !== null) {
              value51.then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value52: Dynamic = value.current?.contentWindow;
                  if (!(!value52 || value2.current)) {
                    value52.postMessage(input32, `*`);
                  }
                },
              );
              return;
            }
            if (data.verb === `widget-bundle` && value12.current) {
              let current: Dynamic = value12.current;
              let value52: Dynamic =
                typeof data.nodeId == `string` &&
                /^[A-Za-z0-9_-]{1,64}$/.test(data.nodeId)
                  ? data.nodeId
                  : ``;
              let value53: Dynamic =
                value52 && Object.hasOwn(current, value52)
                  ? current[value52]
                  : undefined;
              if (!value53) {
                value49.postMessage(
                  {
                    type: `bridge-reply`,
                    id: value50,
                    ok: true,
                    value: null,
                  },
                  `*`,
                );
                return;
              }
              resolveWidgetSnapshotBundle(value53).then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value54: Dynamic = value.current?.contentWindow;
                  if (!(!value54 || value2.current)) {
                    value54.postMessage(
                      {
                        type: `bridge-reply`,
                        id: value50,
                        ok: true,
                        value: input32,
                      },
                      `*`,
                    );
                  }
                },
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value54: Dynamic = value.current?.contentWindow;
                  if (!(!value54 || value2.current)) {
                    value54.postMessage(
                      {
                        type: `bridge-reply`,
                        id: value50,
                        ok: false,
                        error:
                          input32 instanceof (Error as Dynamic) &&
                          input32.message
                            ? input32.message
                            : `bundle-read-failed`,
                      },
                      `*`,
                    );
                  }
                },
              );
              return;
            }
            if (data.verb === `enums` && value21.current) {
              let value52 = (
                input32?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let value53: Dynamic = value.current?.contentWindow;
                if (!(!value53 || value2.current)) {
                  value53.postMessage(
                    {
                      type: `bridge-reply`,
                      id: value50,
                      ok: true,
                      value: input32,
                    },
                    `*`,
                  );
                }
              };
              value21.current().then(
                (input32?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  value52(
                    Array.isArray(input32)
                      ? {
                          rows: input32,
                        }
                      : null,
                  ),
                (..._extraArguments: unknown[]): Dynamic => value52(null),
              );
              return;
            }
            if (
              data.verb === `blob-bytes` &&
              value20.current &&
              !value13.current
            ) {
              let key: Dynamic = data.key;
              let value52: string =
                typeof key == `string` ? key.slice(0, 256) : ``;
              let value53 = (
                input32?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let value54: Dynamic = value.current?.contentWindow;
                if (!(!value54 || value2.current)) {
                  value54.postMessage(
                    {
                      type: `bridge-reply`,
                      id: value50,
                      ok: true,
                      value: input32,
                    },
                    `*`,
                    input32 ? [input32.buffer] : [],
                  );
                }
              };
              if (
                !/^blob\/[A-Za-z0-9_-]{1,64}$/.test(value52) &&
                !BLOB_SHA_PATTERN.test(value52)
              ) {
                value53(null);
                return;
              }
              value20.current(value52).then(
                (input32?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  value53(
                    input32 instanceof (Uint8Array as Dynamic) ? input32 : null,
                  ),
                (..._extraArguments: unknown[]): Dynamic => value53(null),
              );
              return;
            }
            if (data.verb === `blob-bytes` && value13.current) {
              let current: Dynamic = value13.current;
              let key: Dynamic = data.key;
              let value52: string =
                typeof key == `string` ? key.slice(0, 256) : ``;
              let values: Dynamic = new (Set as Dynamic)(
                Object.values(current).map(
                  (input32?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    input32.sha256,
                ),
              );
              let value53: Dynamic = Object.hasOwn(current, value52)
                ? current[value52].sha256
                : BLOB_SHA_PATTERN.test(value52) && values.has(value52)
                  ? value52
                  : undefined;
              if (value53 === undefined || !BLOB_SHA_PATTERN.test(value53)) {
                value49.postMessage(
                  {
                    type: `bridge-reply`,
                    id: value50,
                    ok: true,
                    value: null,
                  },
                  `*`,
                );
                return;
              }
              tryLoadManifestFilmBytes(value53).then(
                (
                  input32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let value54: Dynamic = value.current?.contentWindow;
                  if (!(!value54 || value2.current)) {
                    value54.postMessage(
                      {
                        type: `bridge-reply`,
                        id: value50,
                        ok: true,
                        value: input32,
                      },
                      `*`,
                    );
                  }
                },
              );
              return;
            }
            if (data.verb === `widget-source` && value12.current) {
              let value52: Dynamic =
                typeof data.ref == `string` ? data.ref.slice(0, 256) : ``;
              value49.postMessage(
                {
                  type: `bridge-reply`,
                  id: value50,
                  ok: true,
                  value: {
                    value: null,
                    refused: {
                      rule: `not-available`,
                      message: `this is a filmed snapshot — the film carries no data for this source${value52 ? ` (${value52})` : ``}`,
                    },
                  },
                },
                `*`,
              );
              return;
            }
            value49.postMessage(
              {
                type: `bridge-reply`,
                id: value50,
                ok: false,
                error: `not-available: snapshot view answers read/watch only`,
              },
              `*`,
            );
            return;
          }
          if (data.type === `comment-rects`) {
            value10.current =
              typeof data.docHeight == `number` ? data.docHeight : null;
            value4.current?.report(value10.current);
            let current: Dynamic = value14.current;
            if (current) {
              current(
                finiteNumericEntries(data.rects),
                Array.isArray(data.present)
                  ? data.present.filter(
                      (input32?: Dynamic, ..._extraArguments: unknown[]) =>
                        typeof input32 == `string`,
                    )
                  : [],
              );
            }
            return;
          }
          if (data.type === `comment-hover`) {
            value15.current?.(typeof data.id == `string` ? data.id : null);
            return;
          }
          if (data.type === `comment-click`) {
            value16.current?.(typeof data.id == `string` ? data.id : null);
            return;
          }
        }
      };
      (window as Dynamic).addEventListener(`message`, value46);
      let value47: boolean = false;
      let value48: Dynamic = frameProfilesSubscribe(
        (..._extraArguments: unknown[]): undefined => {
          if (!value47) {
            value47 = true;
            queueMicrotask((..._extraArguments: unknown[]): undefined => {
              value47 = false;
              let value49: Dynamic = value.current?.contentWindow;
              if (!(!value49 || value2.current)) {
                value49.postMessage(
                  {
                    type: `profiles-changed`,
                  },
                  `*`,
                );
              }
            });
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        (window as Dynamic).removeEventListener(`message`, value46);
        value48();
      };
    },
    [value25],
  );
  let value39: Dynamic = (0, React.useRef)(null);
  let value40: Dynamic = (0, React.useRef)(createSnapshotPresentationGate());
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!value6) {
        value39.current = null;
        value40.current.reset();
      }
    },
    [value6],
  );
  let value41: Dynamic = (0, React.useRef)(input9);
  value41.current = input9;
  let value42: Dynamic = (0, React.useRef)(input20);
  value42.current = input20;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (
        !value46 ||
        !value6 ||
        !input ||
        value2.current ||
        value39.current === input
      )
        return;
      let value47: Dynamic =
        value39.current === null || input28 ? value41.current : undefined;
      let value48: Dynamic = typeof value47 == `function` ? value47() : value47;
      let value49: Dynamic = createSnapshotFrameMessage(
        input,
        value39.current,
        input24,
        {
          scrollY: value48,
          placeEveryMount: input28,
          container: input10,
          artifactLinkChips:
            resolvePlatformFeatureFlagsEnabled2(`artifactLinkChips`),
          presented: value19.current !== undefined,
          ...(value13.current === undefined
            ? value20.current === undefined
              ? {}
              : {
                  blobBridge: {
                    miss:
                      value23.current ??
                      `Image isn’t available for this version`,
                  },
                }
            : {
                blobBridge: {
                  miss: UNFILMED_BYTES_MESSAGE,
                },
              }),
        },
      );
      let items: Dynamic = [...(value42.current?.() ?? [])];
      if (
        value49.type === `mount` &&
        input28 &&
        value39.current !== null &&
        !(typeof value48 == `number` && value48 > 0)
      ) {
        items.push({
          type: `scroll-to`,
          y: 0,
        });
      }
      for (let value50 of items as Dynamic) value46.postMessage(value50, `*`);
      value39.current = input;
      value40.current.posted(input);
      value18.current?.(input);
      value46.postMessage(value49, `*`);
    },
    [value6, input, input24, input10, input28],
  );
  let value43: Dynamic = (0, React.useRef)(input17);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        value43.current === input17 ||
        ((value43.current = input17), input17 === undefined)
      )
        return;
      let value46: Dynamic = value.current?.contentWindow;
      if (!(!value46 || !value6 || value2.current)) {
        value46.postMessage(
          {
            type: `enums-changed`,
          },
          `*`,
        );
      }
    },
    [input17, value6],
  );
  let value44: Dynamic = (0, React.useRef)(input27);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value44.current;
      value44.current = input27;
      if (input27 || !current) return;
      let value46: Dynamic = value.current?.contentWindow;
      if (
        !value46 ||
        !value6 ||
        value2.current ||
        value39.current === null ||
        value41.current === undefined
      )
        return;
      let value47: Dynamic =
        typeof value41.current == `function`
          ? value41.current()
          : value41.current;
      value46.postMessage(
        {
          type: `scroll-to`,
          y:
            typeof value47 == `number` &&
            Number.isFinite(value47) &&
            value47 > 0
              ? value47
              : 0,
        },
        `*`,
      );
    },
    [input27, value6],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value46: Dynamic = value.current?.contentWindow;
      if (
        !(
          !value46 ||
          !value6 ||
          value2.current ||
          value42.current !== undefined
        )
      ) {
        value46.postMessage(
          {
            type: `comment-rail`,
            on: input23,
          },
          `*`,
        );
      }
    },
    [value6, input23],
  );
  let value45: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (value3.current) {
        value2.current = true;
        value25(`iframe navigated away`);
        return;
      }
      value3.current = true;
      let value46: Dynamic = value.current?.contentWindow;
      if (!value46) return;
      value46.postMessage(
        {
          type: `theme`,
          mode: value28.current,
        },
        `*`,
      );
      value46.postMessage(
        {
          type: `page-layout`,
          layout: value30.current,
        },
        `*`,
      );
      let value47: Dynamic = documentFontsPostState(value31.current, false);
      value32.current = value47.applied;
      if (value47.post !== null) {
        value46.postMessage(
          {
            type: `typography`,
            ...value47.post,
          },
          `*`,
        );
      }
      let value48: Dynamic = documentDisplayPostState(value33.current, false);
      value34.current = value48.applied;
      if (value48.post !== null) {
        value46.postMessage(resolveEditorHostKind3(value48.post), `*`);
      }
      value37.current = false;
      value38(value46);
      loadDataModelSchemasCss().then(
        (input31?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let value49: Dynamic = value.current?.contentWindow;
          if (!(!value49 || value2.current || !input31)) {
            value49.postMessage(input31, `*`);
          }
        },
      );
      loadPlatformRuntimeAndChatMsg()
        .then(
          (
            { msg: input31, transfer: input32 }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let value49: Dynamic = value.current?.contentWindow;
            if (!(!value49 || value2.current)) {
              value49.postMessage(input31, `*`, input32);
            }
          },
        )
        .catch(
          (input31?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            value25(
              input31 instanceof (Error as Dynamic)
                ? input31.message
                : String(input31),
            ),
        );
    },
    [value38, value25],
  );
  return value8 ? (
    <div
      className={`flex h-full items-center justify-center p-6 text-xs text-danger`}
      data-testid={`lfile-snapshot-error`}
    >
      {input2}
      {`: `}
      {value8}
    </div>
  ) : (
    <iframe ref={value} aria-label={`${input2} (${value26})`} sandbox={`allow-scripts`} srcDoc={input29} onLoad={value45} data-testid={`lfile-snapshot-view`} className={`${input30} block size-full border-0`} {...{
  [EditorSelectionAndTablesDataPagesPrintSurface]: ``
}} />
  );
}
export { LFileSnapshotView };

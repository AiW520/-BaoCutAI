/** BaoCut: document runtime from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  DataOperationControlLnBody,
  DataOperationControlNodeGone2,
  DataOperationControlPageGone,
  DataOperationControlRoomReadDenied,
  EditorChipsAndNodeViewsDataLfileContainer,
  EditorChipsAndNodeViewsDataLfileCopiedImage,
  api,
  createPagesEditorRemountEvent4,
  editorHostPattern3,
  emitTelemetryEvent,
  hostSays,
  isEditorMediaEvery,
  isPlatformLiveDocumentAndHistoryDeny,
  liveDoor,
  loadDataModelSchemasImagePng,
  loadPlatformLiveDocumentAndHistoryStatus2,
  preloadModule,
  resolveDataModelSchemasReplace3,
  resolveDataOperationControlBadRequest,
  resolveEditorHostCenter,
  resolveEditorMediaTest,
  resolveEditorMediaTest2,
  resolveEditorMediaValue3,
  subscribeFrameHostWords,
  toast,
} from "../dependencies";
import {
  resolveWidgetBridgeValue3,
} from "../widget-bridge/widget-sample-card";

function resolveDocumentRuntimeIsArray(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let content: Dynamic = node?.content;
  if (!Array.isArray(content)) return [];
  let items: Dynamic = [];
  for (let resolveDocumentRuntimeIsArrayResult of content as Dynamic) {
    let resolveDocumentRuntimeIsArrayResult2: Dynamic =
      resolveDocumentRuntimeIsArrayResult;
    if (resolveDocumentRuntimeIsArrayResult2?.type !== `pending`) continue;
    let bid: Dynamic = resolveDocumentRuntimeIsArrayResult2.attrs?.bid;
    if (typeof bid == `string` && bid !== `` && options.has(bid)) {
      items.push(bid);
    }
  }
  return items;
}

function resolveDocumentRuntimeType(
  documentRuntimeType?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let resolveWidgetBridgeValue32 = (
    documentRuntimeType2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (typeof documentRuntimeType2 != `object` || !documentRuntimeType2)
      return;
    let documentRuntimeType3: Dynamic = documentRuntimeType2;
    if (
      documentRuntimeType3.type === `embed` ||
      documentRuntimeType3.type === `embedInline`
    ) {
      let widgetBridgeValue3: Dynamic = resolveWidgetBridgeValue3(
        documentRuntimeType3.attrs?.ref,
      );
      if (widgetBridgeValue3 !== undefined) {
        uniqueItems.add(widgetBridgeValue3);
      }
      return;
    }
    if (Array.isArray(documentRuntimeType3.content))
      for (let resolveDocumentRuntimeTypeResult of documentRuntimeType3.content as Dynamic)
        resolveWidgetBridgeValue32(resolveDocumentRuntimeTypeResult);
  };
  resolveWidgetBridgeValue32(documentRuntimeType);
  return uniqueItems;
}

function isDocumentRuntimeToken(
  documentRuntime?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof documentRuntime != `object` || !documentRuntime) return false;
  let documentRuntime2: Dynamic = documentRuntime;
  return (
    documentRuntime2.t === `confirm-detach` &&
    typeof documentRuntime2.lid == `string` &&
    typeof documentRuntime2.token == `string` &&
    documentRuntime2.token.length <= 64 &&
    Array.isArray(documentRuntime2.threads) &&
    documentRuntime2.threads.length <= 1e3 &&
    documentRuntime2.threads.every(
      (thread?: unknown, ..._extraArguments: unknown[]) =>
        typeof thread == `string`,
    ) &&
    (documentRuntime2.off === undefined ||
      typeof documentRuntime2.off == `boolean`) &&
    (documentRuntime2.typing === undefined ||
      typeof documentRuntime2.typing == `boolean`)
  );
}

function isDocumentRuntimeReason(
  documentRuntimeReason?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof documentRuntimeReason != `object` || !documentRuntimeReason)
    return false;
  let documentRuntimeReason2: Dynamic = documentRuntimeReason;
  return (
    documentRuntimeReason2.t === `toast` &&
    typeof documentRuntimeReason2.reason == `string` &&
    (documentRuntimeReason2.quote === undefined ||
      typeof documentRuntimeReason2.quote == `string`)
  );
}

function isDocumentRuntimeText(
  documentRuntimeText?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof documentRuntimeText != `object` || !documentRuntimeText)
    return false;
  let documentRuntimeText2: Dynamic = documentRuntimeText;
  return (
    documentRuntimeText2.t === `rescue` &&
    (typeof documentRuntimeText2.bid == `string` ||
      documentRuntimeText2.bid === null) &&
    typeof documentRuntimeText2.text == `string` &&
    (documentRuntimeText2.afterId === undefined ||
      documentRuntimeText2.afterId === null ||
      typeof documentRuntimeText2.afterId == `string`) &&
    (documentRuntimeText2.staged === undefined ||
      typeof documentRuntimeText2.staged == `boolean`) &&
    (documentRuntimeText2.penOff === undefined ||
      typeof documentRuntimeText2.penOff == `boolean`) &&
    (documentRuntimeText2.keyed === undefined ||
      typeof documentRuntimeText2.keyed == `boolean`)
  );
}

function filterDocumentRuntimeStale(
  filterDocumentRuntimeStale2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let stale: Dynamic = filterDocumentRuntimeStale2.stale;
  return Array.isArray(stale)
    ? stale.filter(
        (stale2?: unknown, ..._extraArguments: unknown[]) =>
          typeof stale2 == `object` && !!stale2,
      )
    : [];
}

var resolveDocumentRuntimeValue: Dynamic;

function resolveDocumentRuntimeState(
  request?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return request.state === `saving`
    ? request.checking === true
      ? options
      : options || typeof request.words == `string` || request.pageBusy === true
    : false;
}

var resolveDocumentRuntimeValue2: Dynamic;

var resolveDocumentRuntimePile: Dynamic;

var resolveDocumentRuntimeValue3: Dynamic;

var DocumentRuntime_LeftUnsent: string;

function resolveDocumentRuntimeUnsent(
  documentRuntimeUnsent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = null,
  ..._extraArguments: unknown[]
): undefined {
  if (options > 0 && dependencies === null) {
    context(DocumentRuntime_LeftUnsent);
  }
  delete documentRuntimeUnsent.dataset.lfileSave;
  delete documentRuntimeUnsent.dataset.lfilePending;
  if (dependencies !== null)
    try {
      emitTelemetryEvent(
        createPagesEditorRemountEvent4({
          ...dependencies,
          unsent: options > 0,
        }),
      );
    } catch {}
}

function resolveDocumentRuntimeIsArray2(
  documentRuntimeIsArray2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentRuntimeIsArray22: Dynamic = documentRuntimeIsArray2;
  return (
    typeof documentRuntimeIsArray22 == `object` &&
    !!documentRuntimeIsArray22 &&
    documentRuntimeIsArray22.t === `embed-refs` &&
    typeof documentRuntimeIsArray22.lid == `string` &&
    Array.isArray(documentRuntimeIsArray22.refs)
  );
}

function resolveDocumentRuntimeValue4(
  documentRuntimeValue4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let resolveDocumentRuntimeValue4Result of documentRuntimeValue4 as Dynamic) {
    let widgetBridgeValue3: Dynamic = resolveWidgetBridgeValue3(
      resolveDocumentRuntimeValue4Result,
    );
    if (widgetBridgeValue3 !== undefined) {
      uniqueItems.add(widgetBridgeValue3);
    }
  }
  return uniqueItems;
}

function resolveDocumentRuntimeValue5(
  documentRuntimeValue5?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof documentRuntimeValue5 == `object` &&
    !!documentRuntimeValue5 &&
    documentRuntimeValue5.t === `thread` &&
    typeof documentRuntimeValue5.id == `string`
  );
}

async function loadDocumentRuntimeObject(
  documentRuntimeObject?: Dynamic,
  options?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return node?.content?.kind === `node` && node.content.id
    ? resolveDocumentRuntimeFileId(options, node)
    : resolveDocumentRuntimeFileId(
        options,
        await documentRuntimeObject.read(
          {
            object: `file`,
            id: options,
          },
          `json`,
        ),
      );
}

function resolveDocumentRuntimeMessage(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentRuntimeVerdict = resolveDocumentRuntimeVerdict(error);
  return documentRuntimeVerdict === `page`
    ? DataOperationControlPageGone
    : documentRuntimeVerdict === `tab`
      ? DataOperationControlNodeGone2
      : error instanceof Error
        ? error.message
        : `room read failed`;
}

function resolveDocumentRuntimeVerdict(
  documentRuntimeVerdict?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentRuntimeVerdict instanceof
    (DataOperationControlRoomReadDenied as Dynamic)
    ? isPlatformLiveDocumentAndHistoryDeny({
        verdict: `deny`,
        reason: documentRuntimeVerdict.reason,
        data: documentRuntimeVerdict.data,
      })
      ? `page`
      : documentRuntimeVerdict.reason === `gone` ||
          resolveDataOperationControlBadRequest(
            documentRuntimeVerdict.reason,
            documentRuntimeVerdict.data,
          )
        ? `tab`
        : null
    : null;
}

function resolveDocumentRuntimeFileId(
  fileId?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let content: Dynamic = node.content;
  if (content?.kind !== `node` || !content.id)
    throw Error(
      `file ${fileId} has no {kind:"node"} content pointer (got {kind:${JSON.stringify(content?.kind)}})`,
    );
  return {
    fileId: fileId,
    nodeId: content.id,
    localId:
      typeof content.localId == `string` && content.localId.startsWith(`ln-`)
        ? content.localId
        : DataOperationControlLnBody,
    stored: {
      doc: {
        type: `doc`,
        content: [
          {
            type: `paragraph`,
          },
        ],
      },
      ydoc: ``,
    },
  };
}

function useDocumentRuntimeFsEntryId(
  documentRuntimeFsEntryId?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ref?: Dynamic,
  argument: Dynamic = true,
  ..._extraArguments: unknown[]
): Dynamic {
  let [fsEntryId, setFsEntryId]: Dynamic = (0, React.useState)(context);
  let resolvedIdRef: Dynamic = (0, React.useRef)(context);
  let optionsRef: Dynamic = (0, React.useRef)(context ? options : undefined);
  let [fsMetaErr, setFsMetaErr]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!argument) return;
      if (context) {
        if (resolvedIdRef.current && resolvedIdRef.current !== context) {
          ref.current();
        }
        resolvedIdRef.current = context;
        optionsRef.current = options;
        setFsEntryId(context);
        setFsMetaErr(null);
        return;
      }
      let enabled = true;
      setFsMetaErr(null);
      let setFsMetaErr2 = (
        documentRuntimeFsEntryId2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolvedIdRef.current && optionsRef.current !== options) {
          resolvedIdRef.current = undefined;
          optionsRef.current = undefined;
          ref.current();
          setFsEntryId(undefined);
          setFsMetaErr(documentRuntimeFsEntryId2);
        } else {
          if (!resolvedIdRef.current) {
            setFsMetaErr(documentRuntimeFsEntryId2);
          }
        }
      };
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let tree: Dynamic = await api.fsMeta.tree(documentRuntimeFsEntryId);
        if (!enabled) return;
        let readId: Dynamic = (
          documentRuntimeFsEntryId2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          for (let node of documentRuntimeFsEntryId2 as Dynamic) {
            if (node.kind === `file` && node.path === options) return node.id;
            if (node.children) {
              let id3: Dynamic = readId(node.children);
              if (id3) return id3;
            }
          }
        };
        let id2: Dynamic = readId(tree.entries);
        if (id2) {
          if (resolvedIdRef.current && resolvedIdRef.current !== id2) {
            ref.current();
          }
          resolvedIdRef.current = id2;
          optionsRef.current = options;
          setFsEntryId(id2);
        } else {
          setFsMetaErr2(`fs-meta: no entry for ${options}`);
        }
      })().catch(
        (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            setFsMetaErr2(
              `fs-meta: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [documentRuntimeFsEntryId, options, context, ref, argument],
  );
  return {
    fsEntryId: fsEntryId,
    fsMetaErr: fsMetaErr,
    resolvedIdRef: resolvedIdRef,
  };
}

function useNodeEngineNames(
  nodeEngineNames?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({});
  let toSortedText: Dynamic = context.toSorted().join(`,`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!nodeEngineNames || !options || !toSortedText) {
        setRecordState(
          (
            nodeEngineNames2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            Object.keys(nodeEngineNames2).length ? {} : nodeEngineNames2,
        );
        return;
      }
      let toSortedTextParts: Dynamic = toSortedText.split(`,`);
      let useNodeEngineNamesResult: Dynamic = liveDoor(nodeEngineNames, {
        container: {
          kind: `project`,
          id: nodeEngineNames,
        },
      });
      let enabled = false;
      let enabled2 = false;
      let enabled3 = false;
      let setRecordState2 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (enabled2) {
          enabled3 = true;
          return;
        }
        enabled2 = true;
        try {
          let all: Dynamic = await Promise.all(
            toSortedTextParts.map(
              async (
                toSortedTextPart?: Dynamic,
                ..._extraArguments: unknown[]
              ): Promise<Dynamic> => {
                try {
                  let useNodeEngineNamesResult3: Dynamic =
                    await loadPlatformLiveDocumentAndHistoryStatus2(
                      useNodeEngineNamesResult,
                      toSortedTextPart,
                    );
                  return [
                    toSortedTextPart,
                    useNodeEngineNamesResult3 === null
                      ? null
                      : useNodeEngineNamesResult3.run,
                  ];
                } catch {
                  return;
                }
              },
            ),
          );
          if (enabled) return;
          setRecordState(
            (
              nodeEngineNames2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let record: Dynamic = {};
              for (let useNodeEngineNamesResult3 of toSortedTextParts as Dynamic)
                if (useNodeEngineNamesResult3 in nodeEngineNames2) {
                  record[useNodeEngineNamesResult3] =
                    nodeEngineNames2[useNodeEngineNamesResult3];
                }
              for (let useNodeEngineNamesResult3 of all as Dynamic)
                if (useNodeEngineNamesResult3) {
                  record[useNodeEngineNamesResult3[0]] =
                    useNodeEngineNamesResult3[1];
                }
              return JSON.stringify(record) === JSON.stringify(nodeEngineNames2)
                ? nodeEngineNames2
                : record;
            },
          );
        } finally {
          enabled2 = false;
          if (enabled3 && !enabled) {
            enabled3 = false;
            setRecordState2();
          }
        }
      };
      setRecordState2();
      let useNodeEngineNamesResult2: Dynamic;
      let enabled4 = true;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic =
            await import("../../platform/index").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.PlatformApiAndAuthFEEDTOPIC,
            );
          return {
            subscribeProjectFeed: subscribeProjectFeed2,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (enabled4)
              try {
                useNodeEngineNamesResult2 = subscribeProjectFeed2(
                  nodeEngineNames,
                  (
                    entry?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (entry.kind === `live` || entry.kind === `recovered`)
                      return void setRecordState2();
                    if (
                      entry.kind === `envelope` &&
                      entry.envelope.diff.some(
                        (diff?: Dynamic, ..._extraArguments: unknown[]) =>
                          diff.address?.ref?.object === `run`,
                      )
                    ) {
                      setRecordState2();
                    }
                  },
                );
              } catch {}
          },
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
        enabled4 = false;
        useNodeEngineNamesResult2?.();
      };
    },
    [nodeEngineNames, options, toSortedText],
  );
  return recordState;
}

function useDocumentRuntimeSubscribeProjectFeed(
  documentRuntimeSubscribeProjectFeed?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({});
  let dependenciesRef: Dynamic = (0, React.useRef)(dependencies);
  dependenciesRef.current = dependencies;
  let toSortedText: Dynamic = context.toSorted().join(`,`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!documentRuntimeSubscribeProjectFeed || !options || !toSortedText) {
        setRecordState(
          (
            documentRuntimeSubscribeProjectFeed2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            Object.keys(documentRuntimeSubscribeProjectFeed2).length
              ? {}
              : documentRuntimeSubscribeProjectFeed2,
        );
        return;
      }
      let toSortedTextParts: Dynamic = toSortedText.split(`,`);
      setRecordState(
        (
          documentRuntimeSubscribeProjectFeed2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let record: Dynamic = {};
          for (let useDocumentRuntimeSubscribeProjectFeedResult3 of toSortedTextParts as Dynamic)
            if (
              useDocumentRuntimeSubscribeProjectFeedResult3 in
              documentRuntimeSubscribeProjectFeed2
            ) {
              record[useDocumentRuntimeSubscribeProjectFeedResult3] =
                documentRuntimeSubscribeProjectFeed2[
                  useDocumentRuntimeSubscribeProjectFeedResult3
                ];
            }
          return Object.keys(record).length ===
            Object.keys(documentRuntimeSubscribeProjectFeed2).length
            ? documentRuntimeSubscribeProjectFeed2
            : record;
        },
      );
      let enabled = false;
      let enabled2 = false;
      let enabled3 = false;
      let index = 0;
      let useDocumentRuntimeSubscribeProjectFeedResult: Dynamic;
      let setRecordState2 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (enabled2) {
          enabled3 = true;
          return;
        }
        enabled2 = true;
        try {
          let all: Dynamic = await Promise.all(
            toSortedTextParts.map(
              async (
                item?: Dynamic,
                ..._extraArguments: unknown[]
              ): Promise<Dynamic> => {
                try {
                  let dependencies2: Dynamic = await dependenciesRef.current(
                    documentRuntimeSubscribeProjectFeed,
                    options,
                    item,
                  );
                  return dependencies2.kind === `compile-failed`
                    ? [item, `errors`]
                    : dependencies2.kind === `bundle`
                      ? [item, `ok`]
                      : dependencies2.kind === `no-draft` ||
                          dependencies2.kind === `not-a-widget`
                        ? [item, null]
                        : undefined;
                } catch (response: Dynamic) {
                  return response?.status === 404 ? [item, null] : undefined;
                }
              },
            ),
          );
          if (enabled) return;
          setRecordState(
            (
              documentRuntimeSubscribeProjectFeed2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let record: Dynamic = {};
              for (let useDocumentRuntimeSubscribeProjectFeedResult3 of toSortedTextParts as Dynamic)
                if (
                  useDocumentRuntimeSubscribeProjectFeedResult3 in
                  documentRuntimeSubscribeProjectFeed2
                ) {
                  record[useDocumentRuntimeSubscribeProjectFeedResult3] =
                    documentRuntimeSubscribeProjectFeed2[
                      useDocumentRuntimeSubscribeProjectFeedResult3
                    ];
                }
              for (let useDocumentRuntimeSubscribeProjectFeedResult3 of all as Dynamic)
                if (useDocumentRuntimeSubscribeProjectFeedResult3) {
                  record[useDocumentRuntimeSubscribeProjectFeedResult3[0]] =
                    useDocumentRuntimeSubscribeProjectFeedResult3[1];
                }
              return JSON.stringify(record) ===
                JSON.stringify(documentRuntimeSubscribeProjectFeed2)
                ? documentRuntimeSubscribeProjectFeed2
                : record;
            },
          );
          if (
            all.some(
              (all2?: Dynamic, ..._extraArguments: unknown[]) =>
                all2 === undefined,
            ) &&
            index < 3
          ) {
            clearTimeout(useDocumentRuntimeSubscribeProjectFeedResult);
            useDocumentRuntimeSubscribeProjectFeedResult = setTimeout(
              (..._extraArguments: unknown[]): undefined =>
                void setRecordState2(),
              2e3 * 2 ** index++,
            );
          }
        } finally {
          enabled2 = false;
          if (enabled3 && !enabled) {
            enabled3 = false;
            setRecordState2();
          }
        }
      };
      setRecordState2();
      let useDocumentRuntimeSubscribeProjectFeedResult2: Dynamic;
      let enabled4 = true;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic =
            await import("../../platform/index").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.PlatformApiAndAuthFEEDTOPIC,
            );
          return {
            subscribeProjectFeed: subscribeProjectFeed2,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (enabled4)
              try {
                useDocumentRuntimeSubscribeProjectFeedResult2 =
                  subscribeProjectFeed2(
                    documentRuntimeSubscribeProjectFeed,
                    (
                      entry?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      if (entry.kind === `live` || entry.kind === `recovered`)
                        return void setRecordState2();
                      if (
                        entry.kind === `envelope` &&
                        entry.envelope.diff.some(
                          (
                            diff?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): Dynamic => {
                            let address: Dynamic = diff.address;
                            return (
                              address?.ref?.object === `node` &&
                              typeof address.ref.id == `string` &&
                              toSortedTextParts.includes(address.ref.id)
                            );
                          },
                        )
                      ) {
                        setRecordState2();
                      }
                    },
                  );
              } catch {}
          },
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
        enabled4 = false;
        clearTimeout(useDocumentRuntimeSubscribeProjectFeedResult);
        useDocumentRuntimeSubscribeProjectFeedResult2?.();
      };
    },
    [documentRuntimeSubscribeProjectFeed, options, toSortedText],
  );
  return recordState;
}

var DocumentRuntime_CopyImage: string;

var DocumentRuntimeDelete: Dynamic;

function resolveDocumentRuntimeBlob(
  documentRuntimeBlob?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let media: Dynamic = documentRuntimeBlob?.media;
  if (!documentRuntimeBlob?.container || typeof media != `object` || !media)
    return null;
  let media2: Dynamic = media;
  let resolveDocumentRuntimeBlobResult: Dynamic = resolveEditorMediaTest(
    media2.blob,
  );
  if (resolveDocumentRuntimeBlobResult === null) return null;
  let resolveDocumentRuntimeBlobResult2: Dynamic = resolveEditorMediaTest2(
    media2.mime,
  );
  let resolveDocumentRuntimeBlobResult3: Dynamic = resolveEditorMediaValue3(
    media2.dims,
  );
  let resolveDocumentRuntimeBlobResult4: Dynamic = isEditorMediaEvery(
    media2.crop,
  );
  let resolveDocumentRuntimeBlobResult5: Dynamic = resolveEditorHostCenter(
    media2.align,
  );
  return (
    `<span ${EditorChipsAndNodeViewsDataLfileCopiedImage}="" ${EditorChipsAndNodeViewsDataLfileContainer}="${resolveDataModelSchemasReplace3(documentRuntimeBlob.container)}" data-lfile-media-blob="${resolveDocumentRuntimeBlobResult}"` +
    (resolveDocumentRuntimeBlobResult2
      ? ` data-lfile-media-mime="${resolveDocumentRuntimeBlobResult2}"`
      : ``) +
    (resolveDocumentRuntimeBlobResult3
      ? ` data-lfile-media-dims="${resolveDataModelSchemasReplace3(JSON.stringify(resolveDocumentRuntimeBlobResult3))}"`
      : ``) +
    (resolveDocumentRuntimeBlobResult4
      ? ` data-lfile-media-crop="${resolveDataModelSchemasReplace3(JSON.stringify(resolveDocumentRuntimeBlobResult4))}"`
      : ``) +
    (resolveDocumentRuntimeBlobResult5
      ? ` data-align="${resolveDocumentRuntimeBlobResult5}"`
      : ``) +
    `>${options}</span>`
  );
}

async function loadDocumentRuntimeBlob(
  documentRuntimeBlob?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  try {
    await loadDataModelSchemasImagePng(
      documentRuntimeBlob,
      options,
      (
        documentRuntimeBlob2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let documentRuntimeBlob3 = resolveDocumentRuntimeBlob(
          context,
          documentRuntimeBlob2,
        );
        if (documentRuntimeBlob3 === null) return documentRuntimeBlob2;
        let loadDocumentRuntimeBlobResult: Dynamic = resolveEditorMediaTest(
          context.media.blob,
        );
        return context.known?.(loadDocumentRuntimeBlobResult) === true
          ? documentRuntimeBlob3
          : null;
      },
    );
  } catch (loadDocumentRuntimeBlobResult: Dynamic) {
    throw (
      toast.error(`Couldn’t copy the image`, {
        id: DocumentRuntime_CopyImage,
      }),
      loadDocumentRuntimeBlobResult
    );
  }
  toast.success(`Image copied`, {
    id: DocumentRuntime_CopyImage,
  });
}

function resolveDocumentRuntimeWidth(
  documentRuntimeWidth?: Dynamic,
  container?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return loadDocumentRuntimeBlob(
    documentRuntimeWidth.dataUri,
    {
      width: documentRuntimeWidth.width,
      alt: documentRuntimeWidth.alt,
    },
    {
      container: container,
      media: documentRuntimeWidth.media,
      known: (
        documentRuntimeWidth2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => context.has(container, documentRuntimeWidth2),
    },
  );
}

function resolveDocumentRuntimePort(
  documentRuntimePort?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    port: documentRuntimePort2,
    key: key,
    askedIn: documentRuntimePort3,
    resolved: documentRuntimePort4,
    live: documentRuntimePort5,
  }: Dynamic = documentRuntimePort;
  return (
    bytes?: Dynamic,
    retryable?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!documentRuntimePort5()) return;
    if (bytes && documentRuntimePort3 && editorHostPattern3.test(key)) {
      documentRuntimePort4.add(documentRuntimePort3, key);
    }
    let record: Dynamic = {
      type: `blob-ready`,
      key: key,
      bytes: bytes,
      retryable: retryable,
    };
    documentRuntimePort2.postMessage(record, bytes ? [bytes.buffer] : []);
  };
}

var resolveDocumentRuntimeValue6: Dynamic;

var isDocumentRuntimeValue: (..._extraArguments: unknown[]) => boolean;

function useDocumentRuntimeUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    subscribeFrameHostWords,
    resolveDocumentRuntimeValue6,
    isDocumentRuntimeValue,
  );
}

var documentRuntimeSet: Dynamic;

function clearDocumentRuntimeRequest(..._extraArguments: unknown[]): Dynamic {
  return {
    request: (..._extraArguments: unknown[]): undefined => {
      for (let clearDocumentRuntimeRequestResult of Array.from<Dynamic>(
        documentRuntimeSet,
      ) as Dynamic)
        clearDocumentRuntimeRequestResult();
    },
    subscribe: (
      clearDocumentRuntimeRequest2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      documentRuntimeSet.add(clearDocumentRuntimeRequest2),
      (..._extraArguments: unknown[]): undefined => {
        documentRuntimeSet.delete(clearDocumentRuntimeRequest2);
      }
    ),
  };
}

var DocumentRuntime_Styles: string;

var isDocumentRuntimeIsContentEditable: Dynamic;

function resolveDocumentRuntimeSubscribe(
  documentRuntimeSubscribe?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return clearDocumentRuntimeRequest().subscribe(
    (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          documentRuntimeSubscribe.previewUp() ||
          documentRuntimeSubscribe.viewOnly() ||
          documentRuntimeSubscribe.typing()
        )
      ) {
        documentRuntimeSubscribe.post();
      }
    },
  );
}

var DocumentRuntime_Styles2: string;

var DocumentRuntime_Styles3: string;

var DocumentRuntime_TopStackAsked: string;

var DocumentRuntime_Styles4: string;

var resolveDocumentRuntimeParentElement: Dynamic;

var documentRuntimeSet2: Dynamic;

var resolveDocumentRuntimeClosest: Dynamic;

var resolveDocumentRuntimeClosest2: Dynamic;

function isDocumentRuntimeKind(
  documentRuntimeKind?: Dynamic,
  post?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (post.kind === `handed-back`) return false;
  if (post.kind === `focusout`)
    return post.to === `editor` || post.to === `elsewhere`
      ? false
      : documentRuntimeKind;
  let focusWas: Dynamic = post.kind === `press` ? post.focusWas : post.from;
  return focusWas === `editor`
    ? true
    : focusWas === `elsewhere`
      ? false
      : documentRuntimeKind;
}

function isDocumentRuntimeFocusWas(
  documentRuntimeFocusWas?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !(
    !(
      documentRuntimeFocusWas.focusWas === `editor` ||
      (documentRuntimeFocusWas.focusWas === `stack` &&
        documentRuntimeFocusWas.fromEditor)
    ) ||
    documentRuntimeFocusWas.readOnly ||
    !documentRuntimeFocusWas.seated ||
    documentRuntimeFocusWas.button !== 0 ||
    documentRuntimeFocusWas.modified ||
    documentRuntimeFocusWas.composing ||
    resolveDocumentRuntimeClosest(
      documentRuntimeFocusWas.downTarget,
      DocumentRuntime_Styles2,
    ) ||
    resolveDocumentRuntimeClosest(
      documentRuntimeFocusWas.upTarget,
      DocumentRuntime_Styles2,
    ) ||
    resolveDocumentRuntimeClosest(
      documentRuntimeFocusWas.downTarget,
      DocumentRuntime_Styles3,
    ) ||
    documentRuntimeFocusWas.selectionChangedToRange
  );
}

var resolveDocumentRuntimeMatches: Dynamic;

var resolveDocumentRuntimeRange: Dynamic;

var resolveDocumentRuntimeRange2: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentRuntimeUseDocumentRuntimeSubscribeProjectFeedStep1(): void {
  (resolveDocumentRuntimeValue = (
    documentRuntimeValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeValue === null || documentRuntimeValue === `busy`
      ? `unsaved`
      : documentRuntimeValue);
  (resolveDocumentRuntimeValue2 = (
    documentRuntimeValue2?: Dynamic,
    options?: Dynamic,
    context: Dynamic = false,
    dependencies: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic => documentRuntimeValue2 || options || context || dependencies);
  (resolveDocumentRuntimePile = (
    documentRuntimePile?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimePile.pile &&
    documentRuntimePile.kept === 0 &&
    !documentRuntimePile.notice &&
    !documentRuntimePile.penOff);
  (resolveDocumentRuntimeValue3 = (
    documentRuntimeValue3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentRuntimeValue3 && options);
  (DocumentRuntime_LeftUnsent = `left_unsent`);
  (DocumentRuntime_CopyImage = `copy-image`);
  (DocumentRuntimeDelete = class {
    [key: string]: Dynamic;
    cap: Dynamic;
    seen: Dynamic = new (Set as Dynamic)();
    constructor(
      documentRuntimeDelete: Dynamic = 4096,
      ..._extraArguments: unknown[]
    ) {
      this.cap = documentRuntimeDelete;
    }
    add(
      documentRuntimeDelete?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let label = `${documentRuntimeDelete}\n${options}`;
      this.seen.delete(label);
      this.seen.add(label);
      if (this.seen.size > this.cap) {
        this.seen.delete(this.seen.values().next().value);
      }
    }
    has(
      documentRuntimeDelete?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (
        !!documentRuntimeDelete &&
        this.seen.has(`${documentRuntimeDelete}\n${options}`)
      );
    }
  });
  (resolveDocumentRuntimeValue6 = (
    ..._extraArguments: unknown[]
  ): Dynamic => hostSays(`selection_menu`));
  (isDocumentRuntimeValue = (..._extraArguments: unknown[]) => false);
  (documentRuntimeSet = new (Set as Dynamic)());
  (DocumentRuntime_Styles = `input, textarea, select, [contenteditable]:not([contenteditable='false'])`);
  (isDocumentRuntimeIsContentEditable = (
    documentRuntimeIsContentEditable?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let documentRuntimeIsContentEditable2: Dynamic =
      documentRuntimeIsContentEditable;
    return !documentRuntimeIsContentEditable2 ||
      typeof documentRuntimeIsContentEditable2 != `object`
      ? false
      : documentRuntimeIsContentEditable2.isContentEditable === true
        ? true
        : typeof documentRuntimeIsContentEditable2.closest == `function` &&
          documentRuntimeIsContentEditable2.closest(DocumentRuntime_Styles) !==
            null;
  });
  (DocumentRuntime_Styles2 = `button, a[href], input, textarea, select, summary, label, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"]`);
  (DocumentRuntime_Styles3 = `[data-rescue-words]`);
  (DocumentRuntime_TopStackAsked = `top-stack:asked`);
  (DocumentRuntime_Styles4 = `textarea, select, input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="image"]):not([type="range"]):not([type="color"]):not([type="hidden"]), [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="searchbox"]`);
  (resolveDocumentRuntimeParentElement = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element2: Dynamic = element;
    for (
      ;
      element2.parentElement !== null &&
      element2.parentElement !== element.ownerDocument.body;

    )
      element2 = element2.parentElement;
    return element2;
  });
  (documentRuntimeSet2 = new (Set as Dynamic)([
    `Tab`,
    `Shift`,
    `Control`,
    `Alt`,
    `AltGraph`,
    `Meta`,
  ]));
  (resolveDocumentRuntimeClosest = (
    documentRuntimeClosest?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentRuntimeClosest !== null &&
    documentRuntimeClosest.closest(options) !== null);
  (resolveDocumentRuntimeClosest2 = (
    documentRuntimeClosest2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeClosest2 !== null &&
    typeof documentRuntimeClosest2.closest == `function`
      ? documentRuntimeClosest2
      : null);
  (resolveDocumentRuntimeMatches = (
    documentRuntimeMatches?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeMatches !== null &&
    documentRuntimeMatches.matches(
      `input, textarea, select, [contenteditable]:not([contenteditable="false"])`,
    ));
  (resolveDocumentRuntimeRange = (
    documentRuntimeRange?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeRange
      ? {
          range: !documentRuntimeRange.isCollapsed,
          ranges: documentRuntimeRange.rangeCount,
          anchor: documentRuntimeRange.anchorNode,
          anchorAt: documentRuntimeRange.anchorOffset,
          focus: documentRuntimeRange.focusNode,
          focusAt: documentRuntimeRange.focusOffset,
        }
      : {
          range: false,
          ranges: 0,
          anchor: null,
          anchorAt: 0,
          focus: null,
          focusAt: 0,
        });
  (resolveDocumentRuntimeRange2 = (
    documentRuntimeRange2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentRuntimeRange2.range === options.range &&
    documentRuntimeRange2.ranges === options.ranges &&
    documentRuntimeRange2.anchor === options.anchor &&
    documentRuntimeRange2.anchorAt === options.anchorAt &&
    documentRuntimeRange2.focus === options.focus &&
    documentRuntimeRange2.focusAt === options.focusAt);
}

export {
  DocumentRuntimeDelete,
  DocumentRuntime_Styles2,
  DocumentRuntime_Styles4,
  DocumentRuntime_TopStackAsked,
  clearDocumentRuntimeRequest,
  documentRuntimeSet2,
  filterDocumentRuntimeStale,
  isDocumentRuntimeFocusWas,
  isDocumentRuntimeIsContentEditable,
  isDocumentRuntimeKind,
  isDocumentRuntimeReason,
  isDocumentRuntimeText,
  isDocumentRuntimeToken,
  loadDocumentRuntimeObject,
  resolveDocumentRuntimeClosest2,
  resolveDocumentRuntimeIsArray,
  resolveDocumentRuntimeIsArray2,
  resolveDocumentRuntimeMatches,
  resolveDocumentRuntimeMessage,
  resolveDocumentRuntimeParentElement,
  resolveDocumentRuntimePile,
  resolveDocumentRuntimePort,
  resolveDocumentRuntimeRange,
  resolveDocumentRuntimeRange2,
  resolveDocumentRuntimeState,
  resolveDocumentRuntimeSubscribe,
  resolveDocumentRuntimeType,
  resolveDocumentRuntimeUnsent,
  resolveDocumentRuntimeValue,
  resolveDocumentRuntimeValue2,
  resolveDocumentRuntimeValue3,
  resolveDocumentRuntimeValue4,
  resolveDocumentRuntimeValue5,
  resolveDocumentRuntimeVerdict,
  resolveDocumentRuntimeWidth,
  useDocumentRuntimeFsEntryId,
  useDocumentRuntimeSubscribeProjectFeed,
  useDocumentRuntimeUseSyncExternalStore,
  useNodeEngineNames,
};

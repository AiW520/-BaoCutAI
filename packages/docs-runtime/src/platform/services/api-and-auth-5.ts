/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  inFrame,
  preloadModule,
  createLiveModuleNamespace,
} from "../dependencies";
import {
  dataEnumsAndValidationAllowDenyValues,
  dataEnumsAndValidationAssistantExecutorHostValues,
  dataEnumsAndValidationHumanInternalExternalValues,
  dataEnumsAndValidationMcpValues,
} from "../data/enums-and-validation";
import {
  lazyZod,
} from "../data/lazy-zod";
import {
  dataContentAndReferencesDescribeSchema2,
  resolveDataContentAndReferencesError2,
  resolveDataContentAndReferencesValue5,
} from "../data/content-and-references";
import {
  PlatformSessionAndSourcesActor,
  PlatformSessionAndSourcesActor2,
  PlatformSessionAndSourcesPrincipal,
  PlatformSessionAndSourcesPrincipal2,
  PlatformSessionAndSourcesRef,
  PlatformSessionAndSourcesRef2,
  resolvePlatformSessionAndSourcesValue17,
} from "./session-and-sources-2";
import {
  EditorExtensionsFrameSendError,
  resolveEditorExtensionsRefusalClass,
} from "../../prose-editor/platform/extensions-3";
import {
  toast,
} from "../ui/toasts";
import {
  frameLane,
} from "../observability/browser-and-operation-events-3";
import {
  api,
  resolvePlatformApiAndAuthValue,
} from "./api-and-auth-1";
import {
  ackOf,
  resolvePlatformApiAndAuthValue14,
  resolvePlatformApiAndAuthValue3,
  updatePlatformApiAndAuthTopic2,
} from "./api-and-auth-2";
import {
  LiteUnavailableError,
  PlatformApiAndAuthWhat,
  resolvePlatformApiAndAuthReject,
  resolvePlatformApiAndAuthValue16,
  resolvePlatformApiAndAuthValue17,
} from "./api-and-auth-3";
import {
  PlatformApiAndAuthGet,
  TOMBSTONE,
  isPlatformApiAndAuthByteLength3,
  isTombstone,
} from "./api-and-auth-4";
import {
  PlatformApiAndAuthPriming,
} from "./api-and-auth-6";

function createDraftLayer(
  deps?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let drafts: Dynamic = new (Map as Dynamic)();
  let staleDrafts: Dynamic = new (Map as Dynamic)();
  let phase: string = `unstarted`;
  let openedPaths: Dynamic = new (Set as Dynamic)();
  let touchedPaths: Dynamic = new (Set as Dynamic)();
  let mutationSequence = 0;
  let pathMutations: Dynamic = new (Map as Dynamic)();
  let markTouched = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (phase !== `settled`) {
      touchedPaths.add(draftLayer);
      pathMutations.set(draftLayer, ++mutationSequence);
    }
  };
  let markOpened = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (phase !== `settled`) {
      openedPaths.add(draftLayer);
    }
  };
  let broadcastChannel: Dynamic;
  let populatePromise: Dynamic;
  let populated: Dynamic;
  let resolvePopulated = (..._extraArguments: unknown[]): undefined => {};
  let mutationTail: Dynamic = null;
  function queueMutation(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    ensurePopulating();
    if (
      mutationTail === null &&
      phase !== `unstarted` &&
      phase !== `populating`
    ) {
      draftLayer();
      return Promise.resolve();
    }
    let then: Dynamic = (mutationTail ?? populated).then(
      (..._extraArguments: unknown[]): undefined => {
        try {
          draftLayer();
        } catch (createDraftLayerResult: Dynamic) {
          console.warn(
            `[draftLayer] queued mutator threw:`,
            resolveDataContentAndReferencesError2(createDraftLayerResult),
          );
        }
      },
    );
    mutationTail = then;
    then.finally((..._extraArguments: unknown[]): undefined => {
      if (mutationTail === then) {
        mutationTail = null;
      }
    });
    return then;
  }
  let onChanged = (..._extraArguments: unknown[]): undefined => {};
  let saveRemovalReported = false;
  let POPULATETIMEOUTMS = 1e4;
  let MOVETIMEOUTMS = 15e3;
  let setChangeCallback = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    onChanged = draftLayer;
  };
  function ensurePopulating(..._extraArguments: unknown[]): Dynamic {
    if (populatePromise) return populatePromise;
    phase = `populating`;
    populated = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        resolvePopulated = resolve;
      },
    );
    openBroadcastChannel();
    let enabled = false;
    let promise: Dynamic = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        deps.setTimeoutFn(
          (..._extraArguments: unknown[]): Dynamic => resolve(`timeout`),
          POPULATETIMEOUTMS,
        ),
    );
    populatePromise = Promise.race([deps.idb.all(), promise])
      .then(
        async (
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          if (items === `timeout`) {
            enabled = true;
            degrade(`IDB restore exceeded ${POPULATETIMEOUTMS}ms`);
            resolvePopulated();
            deps.idb.all().then(
              (items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                for (let [
                  createDraftLayerResult,
                  createDraftLayerResult2,
                ] of items2 as Dynamic)
                  restoreDraft(createDraftLayerResult, createDraftLayerResult2);
                if (items2.length) {
                  onChanged();
                }
              },
              (..._extraArguments: unknown[]): undefined => {},
            );
            return;
          }
          for (let [
            createDraftLayerResult,
            createDraftLayerResult2,
          ] of items as Dynamic)
            restoreDraft(createDraftLayerResult, createDraftLayerResult2);
          resolvePopulated();
          phase = `validating`;
          if (items.length) {
            onChanged();
            let filteredMappedItems: Dynamic = [...drafts.values()]
              .map(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  item.basePending,
              )
              .filter(Boolean);
            await Promise.race([
              Promise.all(filteredMappedItems),
              new (Promise as Dynamic)(
                (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  deps.setTimeoutFn(
                    (..._extraArguments: unknown[]): Dynamic => resolve(),
                    MOVETIMEOUTMS,
                  ),
              ),
            ]);
            notifyStaleDrafts();
            if (staleDrafts.size) {
              onChanged();
            }
          }
          phase = `settled`;
          openedPaths.clear();
          touchedPaths.clear();
          pathMutations.clear();
        },
      )
      .catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!enabled) {
          degrade(resolveDataContentAndReferencesError2(error));
          deps.setTimeoutFn((..._extraArguments: unknown[]): undefined => {
            deps.idb.all().then(
              (items?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                for (let [
                  createDraftLayerResult,
                  createDraftLayerResult2,
                ] of items as Dynamic)
                  restoreDraft(createDraftLayerResult, createDraftLayerResult2);
                if (items.length) {
                  onChanged();
                }
              },
              (..._extraArguments: unknown[]): undefined => {},
            );
          }, 5e3);
        }
        resolvePopulated();
      });
    return populatePromise;
  }
  function degrade(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    phase = `degraded`;
    console.warn(`[draftLayer] degraded:`, draftLayer);
    deps.toast.warning(
      `Local drafts could not be restored in this tab (storage unavailable or slow).`,
      {
        id: `draft-layer-degraded`,
      },
    );
  }
  function restoreDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    openedPaths.add(draftLayer);
    if (drafts.has(draftLayer) || touchedPaths.has(draftLayer)) return;
    let record2: Dynamic = {
      bytes: draftBytes(options),
      baseSha: undefined,
      mtime: options.mtime,
      flushState: `dirty`,
    };
    drafts.set(draftLayer, record2);
    loadBaseSha(draftLayer, options);
  }
  let draftBytes: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    draftLayer.del || draftLayer.bytes.byteLength === 0
      ? TOMBSTONE
      : draftLayer.bytes;
  let storedBytes: Dynamic = (
    bytes?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isTombstone(bytes)
      ? {
          bytes: new Uint8Array(),
          del: true,
        }
      : {
          bytes: bytes,
        };
  let persistDraft: Dynamic = (
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    deps.idb.put(draftLayer, {
      ...storedBytes(options.bytes),
      baseSha: options.baseSha === undefined ? null : options.baseSha,
      mtime: options.mtime,
    });
  function openBroadcastChannel(..._extraArguments: unknown[]): undefined {
    if (!(broadcastChannel || deps.BroadcastChannelCtor === undefined)) {
      broadcastChannel = new (deps.BroadcastChannelCtor as Dynamic)(
        `bongo-vfs`,
      );
      broadcastChannel.addEventListener(
        `message`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let paths: Dynamic = event.data?.paths ?? [];
          if (paths.length !== 0) {
            if (event.data?.baseOnly === true) {
              Promise.all(
                paths.map(
                  (path?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    deps.idb
                      .get(path)
                      .then(
                        (
                          result?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined => {
                          if (result === undefined) return;
                          let draftEntry: Dynamic = drafts.get(path);
                          if (!draftEntry || draftEntry.basePending) return;
                          let bytes: Dynamic = draftEntry.bytes;
                          let draftBytes2: Dynamic = draftBytes(result);
                          if (
                            isTombstone(bytes)
                              ? isTombstone(draftBytes2)
                              : !isTombstone(draftBytes2) &&
                                isPlatformApiAndAuthByteLength3(
                                  bytes,
                                  draftBytes2,
                                )
                          ) {
                            draftEntry.baseSha = result.baseSha;
                          }
                        },
                      ),
                ),
              ).then((..._extraArguments: unknown[]) => onChanged());
              return;
            }
            Promise.all(
              paths.map(
                (path?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  deps.idb
                    .get(path)
                    .then(
                      (
                        result?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined => {
                        markOpened(path);
                        markTouched(path);
                        if (result === undefined) {
                          drafts.delete(path);
                        } else {
                          drafts.set(path, {
                            bytes: draftBytes(result),
                            baseSha: result.baseSha,
                            mtime: result.mtime,
                            flushState: `clean`,
                          });
                        }
                      },
                    ),
              ),
            ).then((..._extraArguments: unknown[]) => onChanged());
          }
        },
      );
    }
  }
  let broadcastPaths = (
    paths?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (paths.length) {
      broadcastChannel?.postMessage({
        paths: paths,
      });
    }
  };
  let broadcastBasePaths = (
    paths?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (paths.length) {
      broadcastChannel?.postMessage({
        paths: paths,
        baseOnly: true,
      });
    }
  };
  function loadBaseSha(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (
      !draftEntry ||
      draftEntry.baseSha !== undefined ||
      draftEntry.basePending
    )
      return;
    let result: Dynamic = deps
      .readFileDiskWithSha(draftLayer)
      .then(
        ({ sha: sha }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          sha ?? null,
        (..._extraArguments: unknown[]) => null,
      )
      .then((result2?: Dynamic, ..._extraArguments: unknown[]) =>
        reconcileDraft(draftLayer, options, result2),
      )
      .finally((..._extraArguments: unknown[]): undefined => {
        let draftEntry2: Dynamic = drafts.get(draftLayer);
        if (draftEntry2?.basePending === result) {
          draftEntry2.basePending = undefined;
          draftEntry2.lapsed = undefined;
        }
      });
    draftEntry.basePending = result;
  }
  function reconcileDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    serverSha?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (draftEntry) {
      if (
        options &&
        options.baseSha !== serverSha &&
        draftEntry.bytes === draftBytes(options) &&
        draftEntry.mtime === options.mtime
      ) {
        markTouched(draftLayer);
        if (isTombstone(draftEntry.bytes)) {
          drafts.delete(draftLayer);
          deps.idb.delIfBytesEqual(draftLayer, new Uint8Array());
        } else {
          recordStaleDraft(draftLayer, {
            bytes: draftEntry.bytes,
            mtime: draftEntry.mtime,
            serverSha: serverSha,
          });
          drafts.delete(draftLayer);
          deps.idb.delIfBytesEqual(draftLayer, draftEntry.bytes);
        }
        onChanged();
        return;
      }
      if (draftEntry.baseSha === undefined) {
        draftEntry.baseSha = serverSha;
        if (!isTombstone(draftEntry.bytes)) {
          persistDraft(draftLayer, draftEntry).then(
            (..._extraArguments: unknown[]) => broadcastBasePaths([draftLayer]),
          );
        }
      }
    }
  }
  function recordStaleDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    staleDrafts.set(draftLayer, options);
    notifyStaleDrafts();
  }
  function notifyStaleDrafts(..._extraArguments: unknown[]): undefined {
    let staleDraftsCount: Dynamic = staleDrafts.size;
    if (staleDraftsCount !== 0) {
      deps.toast.warning(
        `${staleDraftsCount} stale local draft${staleDraftsCount === 1 ? `` : `s`} skipped — the server copy changed since you last edited.`,
        {
          id: `draft-conflicts`,
          duration: 1 / 0,
          action: {
            label: `Discard`,
            onClick: (..._extraArguments: unknown[]): undefined => {
              staleDrafts.clear();
              deps.toast.dismiss(`draft-conflicts`);
            },
          },
        },
      );
    }
  }
  let staleDraftsSnapshot: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    staleDrafts;
  function discardChangedDraft(
    draftLayer?: Dynamic,
    serverSha?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (draftEntry && !isTombstone(draftEntry.bytes)) {
      recordStaleDraft(draftLayer, {
        bytes: draftEntry.bytes,
        mtime: deps.now(),
        serverSha: serverSha,
      });
    }
    markTouched(draftLayer);
    drafts.delete(draftLayer);
    deps.idb.del(draftLayer);
  }
  function waitForBaseSha(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!options.basePending || options.lapsed) return Promise.resolve();
    let basePending: Dynamic = options.basePending;
    return Promise.race([
      basePending,
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          deps.setTimeoutFn((..._extraArguments: unknown[]): undefined => {
            let draftEntry: Dynamic = drafts.get(draftLayer);
            if (draftEntry?.basePending === basePending) {
              draftEntry.lapsed = true;
            }
            resolve();
          }, MOVETIMEOUTMS),
      ),
    ]).then((..._extraArguments: unknown[]): undefined => {});
  }
  async function waitForDrafts(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> {
    ensurePopulating();
    await populated;
    if (draftLayer !== undefined) {
      let draftEntry: Dynamic = drafts.get(draftLayer);
      if (draftEntry) {
        await waitForBaseSha(draftLayer, draftEntry);
      }
    } else {
      let mappedItems = [...drafts.entries()].map(
        ([item, item2]: Dynamic, ..._extraArguments: unknown[]) =>
          waitForBaseSha(item, item2),
      );
      if (mappedItems.length) {
        await Promise.all(mappedItems);
      }
    }
  }
  async function readDraft(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> {
    await waitForDrafts(draftLayer);
    return drafts.get(draftLayer)?.bytes;
  }
  async function listDrafts(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> {
    await waitForDrafts();
    return draftNames(draftLayer);
  }
  function writeDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    ensurePopulating();
    if (options instanceof Uint8Array && options.byteLength === 0) {
      options = TOMBSTONE;
    }
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (phase === `degraded` && !openedPaths.has(draftLayer) && !draftEntry) {
      openedPaths.add(draftLayer);
      let result: Dynamic = deps.idb
        .get(draftLayer)
        .catch((..._extraArguments: unknown[]): undefined => undefined);
      putDraft(draftLayer, options, undefined);
      let promise: Dynamic = new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          deps.setTimeoutFn(
            (..._extraArguments: unknown[]): Dynamic => resolve(undefined),
            MOVETIMEOUTMS,
          ),
      );
      Promise.race([result, promise]).then(
        (result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (result2 === undefined) return;
          let bytes: Dynamic = draftBytes(result2);
          let enabled: Dynamic = isTombstone(bytes)
            ? !isTombstone(options)
            : isTombstone(options) ||
              !isPlatformApiAndAuthByteLength3(bytes, options);
          if (!isTombstone(bytes) && enabled) {
            recordStaleDraft(draftLayer, {
              bytes: bytes,
              mtime: result2.mtime,
              serverSha: null,
            });
            onChanged();
          }
        },
      );
      return Promise.resolve();
    }
    return queueMutation((..._extraArguments: unknown[]): undefined => {
      if (
        phase === `degraded` &&
        !openedPaths.has(draftLayer) &&
        !drafts.has(draftLayer)
      ) {
        writeDraft(draftLayer, options);
        return;
      }
      putDraft(draftLayer, options, drafts.get(draftLayer));
    });
  }
  function putDraft(
    draftLayer?: Dynamic,
    bytes?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let record2: Dynamic = {
      bytes: bytes,
      baseSha: context ? context.baseSha : undefined,
      mtime: deps.now(),
      basePending: context?.basePending,
      lapsed: context?.basePending ? context.lapsed : undefined,
      flushState: `dirty`,
    };
    drafts.set(draftLayer, record2);
    if (context === undefined && !isTombstone(bytes)) {
      loadBaseSha(draftLayer);
    }
    persistDraft(draftLayer, record2);
    broadcastPaths([draftLayer]);
    onChanged();
  }
  function persistOpenEdit2(
    draftLayer?: Dynamic,
    bytes?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    ensurePopulating();
    if (bytes.byteLength === 0) {
      console.warn(`[draftLayer] zero-length open-edit persist refused`);
      return;
    }
    deps.idb
      .put(draftLayer, {
        bytes: bytes,
        baseSha: ((..._extraArguments: unknown[]): Dynamic => {
          let baseSha: Dynamic = drafts.get(draftLayer)?.baseSha;
          return baseSha === undefined ? null : baseSha;
        })(),
        mtime: deps.now(),
      })
      .then((..._extraArguments: unknown[]) => broadcastPaths([draftLayer]));
  }
  function deleteDraft(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return writeDraft(draftLayer, TOMBSTONE);
  }
  function discardDraft(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    queueMutation((..._extraArguments: unknown[]) =>
      discardDraftNow(draftLayer),
    );
  }
  function discardDraftNow(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    markTouched(draftLayer);
    drafts.delete(draftLayer);
    deps.idb.del(draftLayer);
    broadcastPaths([draftLayer]);
  }
  function moveDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    ensurePopulating();
    queueMutation((..._extraArguments: unknown[]) =>
      moveDraftNow(draftLayer, options),
    );
  }
  function loadDraftBeforeMove(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let pathMutationEntry: Dynamic = pathMutations.get(options) ?? 0;
    let now: Dynamic = deps.now();
    let result: Dynamic = deps.idb
      .get(draftLayer)
      .catch((..._extraArguments: unknown[]): undefined => undefined);
    let promise: Dynamic = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        deps.setTimeoutFn(
          (..._extraArguments: unknown[]): Dynamic => resolve(undefined),
          MOVETIMEOUTMS,
        ),
    );
    Promise.race([result, promise]).then(
      (result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (result2 === undefined) return;
        let matchesPathMutationEntry =
          (pathMutations.get(options) ?? 0) !== pathMutationEntry;
        if (
          drafts.has(options) ||
          matchesPathMutationEntry ||
          drafts.has(draftLayer) ||
          result2.mtime >= now
        )
          return;
        if (isTombstone(draftBytes(result2))) {
          markTouched(draftLayer);
          deps.idb
            .delIfBytesEqual(draftLayer, new Uint8Array())
            .then(
              (result3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (result3) {
                  broadcastPaths([draftLayer]);
                }
              },
            );
          return;
        }
        let record2: Dynamic = {
          bytes: draftBytes(result2),
          baseSha: undefined,
          mtime: result2.mtime,
          flushState: `dirty`,
        };
        markTouched(draftLayer);
        drafts.set(options, record2);
        persistDraft(options, record2).then(
          (..._extraArguments: unknown[]): undefined => {
            deps.idb
              .delIfBytesEqual(
                draftLayer,
                isTombstone(record2.bytes) ? new Uint8Array() : record2.bytes,
              )
              .then(
                (
                  result3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  broadcastPaths(result3 ? [draftLayer, options] : [options]);
                },
              );
          },
        );
        onChanged();
      },
    );
  }
  function moveDraftNow(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (!draftEntry && phase !== `settled` && !openedPaths.has(draftLayer)) {
      loadDraftBeforeMove(draftLayer, options);
      return;
    }
    markTouched(draftLayer);
    drafts.delete(draftLayer);
    deps.idb.del(draftLayer);
    if (draftEntry && !isTombstone(draftEntry.bytes)) {
      let record2: Dynamic = {
        bytes: draftEntry.bytes,
        baseSha: draftEntry.basePending ? undefined : draftEntry.baseSha,
        mtime: draftEntry.mtime,
        flushState: `dirty`,
      };
      drafts.set(options, record2);
      persistDraft(options, record2);
      broadcastPaths([draftLayer, options]);
    } else broadcastPaths([draftLayer]);
    onChanged();
  }
  function moveDraftDirectory(
    draftLayer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    ensurePopulating();
    let items: Dynamic = [];
    queueMutation((..._extraArguments: unknown[]): undefined => {
      items = moveDraftDirectoryNow(draftLayer, options);
    });
    return items;
  }
  function moveDraftDirectoryNow(
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items2: Dynamic = [];
    for (let [createDraftLayerResult, createDraftLayerResult2] of [
      ...drafts,
    ] as Dynamic) {
      if (!createDraftLayerResult.startsWith(items + `/`)) continue;
      let total: Dynamic = options + createDraftLayerResult.slice(items.length);
      markTouched(createDraftLayerResult);
      drafts.delete(createDraftLayerResult);
      let record2: Dynamic = {
        bytes: createDraftLayerResult2.bytes,
        baseSha: createDraftLayerResult2.basePending
          ? undefined
          : createDraftLayerResult2.baseSha,
        mtime: createDraftLayerResult2.mtime,
        flushState: `dirty`,
      };
      drafts.set(total, record2);
      deps.idb.del(createDraftLayerResult);
      persistDraft(total, record2);
      items2.push(createDraftLayerResult, total);
    }
    broadcastPaths(items2);
    if (items2.length) {
      onChanged();
    }
    return items2;
  }
  function discardDraftDirectory(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    ensurePopulating();
    let items: Dynamic = [];
    queueMutation((..._extraArguments: unknown[]): undefined => {
      items = discardDraftDirectoryNow(draftLayer);
    });
    return items;
  }
  function discardDraftDirectoryNow(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    for (let createDraftLayerResult of [...drafts.keys()] as Dynamic)
      if (createDraftLayerResult.startsWith(draftLayer + `/`)) {
        markTouched(createDraftLayerResult);
        drafts.delete(createDraftLayerResult);
        deps.idb.del(createDraftLayerResult);
        items.push(createDraftLayerResult);
      }
    broadcastPaths(items);
    return items;
  }
  let peekDraft: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let bytes: Dynamic = drafts.get(draftLayer)?.bytes;
    return bytes === undefined || isTombstone(bytes) ? undefined : bytes;
  };
  let isDraftDeleted: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => isTombstone(drafts.get(draftLayer)?.bytes);
  let draftNames: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    [...drafts.entries()]
      .filter(
        ([item, item2]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          item.startsWith(items + `/`) && !isTombstone(item2.bytes),
      )
      .map(
        ([filteredItem]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredItem.slice(items.length + 1),
      );
  let hasDirtyDrafts: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let startsWith: Dynamic = (
      draftLayer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => !draftLayer || draftLayer2.startsWith(draftLayer + `/`);
    return [...drafts.entries()].some(
      ([item, item2]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        startsWith(item) && item2.flushState === `dirty`,
    );
  };
  let hasDraft: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => drafts.has(draftLayer);
  let draftEntries: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    [...drafts.entries()]
      .filter(
        ([item]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          item.startsWith(items + `/`),
      )
      .map(
        (
          [filteredItem, filteredItem2]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          filteredItem.slice(items.length + 1),
          filteredItem2.bytes,
        ],
      );
  let draftDebugSnapshot: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {};
    let decoder = new TextDecoder();
    for (let [
      createDraftLayerResult,
      createDraftLayerResult2,
    ] of drafts as Dynamic)
      if (createDraftLayerResult.startsWith(items + `/`)) {
        record2[createDraftLayerResult.slice(items.length + 1)] = isTombstone(
          createDraftLayerResult2.bytes,
        )
          ? `<deleted>`
          : decoder.decode(createDraftLayerResult2.bytes);
      }
    return record2;
  };
  let dirtyDraftOperations: Dynamic = (
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    for (let [path, createDraftLayerResult] of drafts as Dynamic)
      if (
        path.startsWith(draftLayer + `/`) &&
        createDraftLayerResult.flushState === `dirty`
      ) {
        if (!createDraftLayerResult.basePending) {
          items.push({
            path: path,
            bytes: createDraftLayerResult.bytes,
            cas: createDraftLayerResult.baseSha ?? `*`,
          });
        }
      }
    return items;
  };
  function updateBaseSha(
    draftLayer?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (draftEntry) {
      if (isTombstone(options)) {
        draftEntry.baseSha = undefined;
        if (isTombstone(draftEntry.bytes)) {
          markTouched(draftLayer);
          drafts.delete(draftLayer);
          deps.idb
            .delIfBytesEqual(draftLayer, new Uint8Array())
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (result) {
                  broadcastPaths([draftLayer]);
                }
              },
            );
        }
        return;
      }
      draftEntry.baseSha = context ?? undefined;
      if (draftEntry.bytes === options) {
        draftEntry.flushState = `flushAcked`;
      }
    }
  }
  function forgetDraft(
    draftLayer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    markTouched(draftLayer);
    drafts.delete(draftLayer);
    deps.idb.del(draftLayer);
  }
  function retireFlushedDraft(
    draftLayer?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let draftEntry: Dynamic = drafts.get(draftLayer);
    if (
      !draftEntry ||
      draftEntry.flushState !== `flushAcked` ||
      isTombstone(draftEntry.bytes)
    )
      return;
    let bytes: Dynamic = draftEntry.bytes;
    deps.idb
      .delIfBytesEqual(draftLayer, bytes)
      .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!result) return;
        let draftEntry2: Dynamic = drafts.get(draftLayer);
        if (
          !(
            !draftEntry2 ||
            draftEntry2.bytes !== bytes ||
            draftEntry2.flushState !== `flushAcked`
          )
        ) {
          if (options()) {
            markTouched(draftLayer);
            drafts.delete(draftLayer);
            broadcastPaths([draftLayer]);
            context();
          }
        }
      });
  }
  function notifyLegacySaveRemoved(..._extraArguments: unknown[]): undefined {
    if (!saveRemovalReported) {
      saveRemovalReported = true;
      deps.toast.error(
        `This surface can no longer save to disk (the legacy save endpoint was removed). Your unsaved changes live in this tab only.`,
      );
    }
  }
  return {
    _wireRevBump: setChangeCallback,
    ensureStarted: ensurePopulating,
    getParked: staleDraftsSnapshot,
    parkConflict: discardChangedDraft,
    ensureSettled: waitForDrafts,
    readValidated: readDraft,
    listLive: listDrafts,
    stashBytes: writeDraft,
    persistOpenEdit: persistOpenEdit2,
    dropEntry: deleteDraft,
    forgetEntry: discardDraft,
    moveEntry: moveDraft,
    moveUnder: moveDraftDirectory,
    discardUnder: discardDraftDirectory,
    getBytesSync: peekDraft,
    isDeletedSync: isDraftDeleted,
    listLiveSync: draftNames,
    anyDirtySync: hasDirtyDrafts,
    hasEntrySync: hasDraft,
    dumpSync: draftDebugSnapshot,
    flushSnapshot: dirtyDraftOperations,
    ackFlushed: updateBaseSha,
    unloadAfterAck: forgetDraft,
    purgeIfFlushAcked: retireFlushedDraft,
    markFlushDead: notifyLegacySaveRemoved,
    announce: (
      draftLayer?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      ensurePopulating();
      broadcastPaths(draftLayer);
    },
    getStage: (..._extraArguments: unknown[]): string => phase,
    listEntriesSync: draftEntries,
    _test: {
      reset(..._extraArguments: unknown[]): undefined {
        drafts.clear();
        staleDrafts.clear();
        openedPaths.clear();
        touchedPaths.clear();
        pathMutations.clear();
        mutationTail = null;
        phase = `unstarted`;
        populatePromise = undefined;
        populated = undefined;
        saveRemovalReported = false;
        broadcastChannel?.close();
        broadcastChannel = undefined;
      },
      settleAll: (..._extraArguments: unknown[]) => waitForDrafts(),
      record: (draftLayer?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        drafts.get(draftLayer),
      stageSet: (
        draftLayer?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        phase = draftLayer;
      },
    },
  };
}

var _wireRevBump: ReturnType<typeof createDraftLayer>["_wireRevBump"];
var ensureStarted: ReturnType<typeof createDraftLayer>["ensureStarted"];
var platformApiAndAuthState9: ReturnType<typeof createDraftLayer>["getParked"];
var parkConflict: ReturnType<typeof createDraftLayer>["parkConflict"];
var ensureSettled: ReturnType<typeof createDraftLayer>["ensureSettled"];
var readValidated: ReturnType<typeof createDraftLayer>["readValidated"];
var platformApiAndAuthState10: ReturnType<typeof createDraftLayer>["listLive"];
var stashBytes: ReturnType<typeof createDraftLayer>["stashBytes"];
var persistOpenEdit: ReturnType<typeof createDraftLayer>["persistOpenEdit"];
var dropEntry: ReturnType<typeof createDraftLayer>["dropEntry"];
var forgetEntry: ReturnType<typeof createDraftLayer>["forgetEntry"];
var moveEntry: ReturnType<typeof createDraftLayer>["moveEntry"];
var moveUnder: ReturnType<typeof createDraftLayer>["moveUnder"];
var discardUnder: ReturnType<typeof createDraftLayer>["discardUnder"];
var getBytesSync: ReturnType<typeof createDraftLayer>["getBytesSync"];
var isDeletedSync: ReturnType<typeof createDraftLayer>["isDeletedSync"];
var listLiveSync: ReturnType<typeof createDraftLayer>["listLiveSync"];
var anyDirtySync: ReturnType<typeof createDraftLayer>["anyDirtySync"];
var hasEntrySync: ReturnType<typeof createDraftLayer>["hasEntrySync"];
var platformApiAndAuthState11: ReturnType<typeof createDraftLayer>["dumpSync"];
var flushSnapshot: ReturnType<typeof createDraftLayer>["flushSnapshot"];
var ackFlushed: ReturnType<typeof createDraftLayer>["ackFlushed"];
var unloadAfterAck: ReturnType<typeof createDraftLayer>["unloadAfterAck"];
var purgeIfFlushAcked: ReturnType<typeof createDraftLayer>["purgeIfFlushAcked"];
var markFlushDead: ReturnType<typeof createDraftLayer>["markFlushDead"];
var announce: ReturnType<typeof createDraftLayer>["announce"];
var platformApiAndAuthState12: ReturnType<typeof createDraftLayer>["getStage"];
var listEntriesSync: ReturnType<typeof createDraftLayer>["listEntriesSync"];
var platformApiAndAuthState13: ReturnType<typeof createDraftLayer>["_test"];

var PlatformApiAndAuthCodeModal: Dynamic;

var PlatformApiAndAuthThisFileType: Dynamic;

var preload: Dynamic;

var SheetEditor: Dynamic;

var RoomSheetView: Dynamic;

var InlineSheetView: Dynamic;

var ModalSheetView: Dynamic;

var DocxEditor: Dynamic;

var SlidesEditor: Dynamic;

var PdfViewer: Dynamic;

var CodeViewer: Dynamic;

var MarkdownRenderer: Dynamic;

var HtmlViewer: Dynamic;

var DiffView: Dynamic;

var VersionPreview: Dynamic;

var DocxDiffPane: Dynamic;

var PptxDiffPane: Dynamic;

var RoutineEditor: Dynamic;

var WidgetConsolePanel: Dynamic;

var WidgetPanel: Dynamic;

var CodeModal: (..._extraArguments: unknown[]) => null;

var parseSelection: (..._extraArguments: unknown[]) => null;

var blockEmbedCaption: (..._extraArguments: unknown[]) => string;

var IronAbortError: Dynamic;

var ironLoadDebug: Dynamic;

var ironLoadOffThread: Dynamic;

var recalcOffThread: Dynamic;

var toastManualCalc: Dynamic;

var warmIronWorker: Dynamic;

var parseLFile: Dynamic;

function resolvePlatformApiAndAuthSplit(
  platformApiAndAuthSplit?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolvePlatformApiAndAuthSplitResult of platformApiAndAuthSplit.split(
    `/`,
  ) as Dynamic)
    if (
      !(
        resolvePlatformApiAndAuthSplitResult === `` ||
        resolvePlatformApiAndAuthSplitResult === `.`
      )
    ) {
      if (resolvePlatformApiAndAuthSplitResult === `..`) {
        items.pop();
      } else {
        items.push(resolvePlatformApiAndAuthSplitResult);
      }
    }
  return items.join(`/`);
}

var referenceError: Dynamic;

var resolvePlatformApiAndAuthValue28: Dynamic;

var platformApiAndAuthPattern3: RegExp;

var platformApiAndAuthPattern4: RegExp;

function resolvePlatformApiAndAuthBook(
  platformApiAndAuthBook?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = platformApiAndAuthPattern3.exec(platformApiAndAuthBook);
  if (match)
    return {
      book: match[1],
      rest: `'${match[2]}'${match[3]}`,
    };
  let match2 = platformApiAndAuthPattern4.exec(platformApiAndAuthBook);
  return match2
    ? {
        book: match2[1],
        rest: match2[2],
      }
    : null;
}

var platformApiAndAuthPattern5: RegExp;

function resolvePlatformApiAndAuthRawModel(
  platformApiAndAuthRawModel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let rawModel: Dynamic = platformApiAndAuthRawModel.rawModel;
  let sheetsCount: Dynamic = platformApiAndAuthRawModel.sheets().length;
  for (let index = 0; index < sheetsCount; index++) {
    let sheetDimension: Dynamic = rawModel.getSheetDimension(index);
    let sheetDimensionItem: Dynamic = sheetDimension[0];
    let sheetDimensionItem2: Dynamic = sheetDimension[1];
    let sheetDimensionItem3: Dynamic = sheetDimension[2];
    let sheetDimensionItem4: Dynamic = sheetDimension[3];
    if (!(sheetDimensionItem2 < sheetDimensionItem))
      for (
        let sheetDimensionItem5: Dynamic = sheetDimensionItem;
        sheetDimensionItem5 <= sheetDimensionItem2;
        sheetDimensionItem5++
      )
        for (
          let sheetDimensionItem6: Dynamic = sheetDimensionItem3;
          sheetDimensionItem6 <= sheetDimensionItem4;
          sheetDimensionItem6++
        ) {
          let cellContent: Dynamic = rawModel.getCellContent(
            index,
            sheetDimensionItem5,
            sheetDimensionItem6,
          );
          if (!(!cellContent || cellContent[0] !== `=`))
            for (let resolvePlatformApiAndAuthRawModelResult of (cellContent.match(
              platformApiAndAuthPattern5,
            ) ?? []) as Dynamic) {
              let platformApiAndAuthBook = resolvePlatformApiAndAuthBook(
                resolvePlatformApiAndAuthRawModelResult,
              );
              if (platformApiAndAuthBook) {
                uniqueItems.add(platformApiAndAuthBook.book);
              }
            }
        }
  }
  return uniqueItems;
}

var platformApiAndAuthPattern6: RegExp;

function resolvePlatformApiAndAuthLastIndexOf(
  platformApiAndAuthLastIndex?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic = platformApiAndAuthLastIndex.lastIndexOf(`/`);
  return lastIndexOf < 0
    ? ``
    : platformApiAndAuthLastIndex.slice(0, lastIndexOf);
}

function resolvePlatformApiAndAuthMatchAll(
  platformApiAndAuthMatchAll?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolvePlatformApiAndAuthMatchAllResult of platformApiAndAuthMatchAll as Dynamic)
    if (typeof resolvePlatformApiAndAuthMatchAllResult == `string`)
      for (let resolvePlatformApiAndAuthMatchAllResult2 of resolvePlatformApiAndAuthMatchAllResult.matchAll(
        /(^|[^A-Za-z0-9_.\]])\[(\d+|[^\][]*\.[A-Za-z0-9]{1,8})\][^!'[\]]{0,31}'?!/g,
      ) as Dynamic)
        items.push(resolvePlatformApiAndAuthMatchAllResult2[2]);
  return items;
}

function resolvePlatformApiAndAuthInvalidChar(
  platformApiAndAuthInvalidChar?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    platformApiAndAuthInvalidChar.includes(`\0`) ||
    platformApiAndAuthInvalidChar.includes(`\\`)
  )
    return referenceError(`invalid char`);
  if (platformApiAndAuthPattern6.test(platformApiAndAuthInvalidChar))
    return referenceError(`absolute path`);
  let platformApiAndAuthSplit: Dynamic = resolvePlatformApiAndAuthSplit(
    `${resolvePlatformApiAndAuthLastIndexOf(options)}/${platformApiAndAuthInvalidChar}`,
  );
  let replace: Dynamic = resolvePlatformApiAndAuthSplit(context).replace(
    /\/+$/,
    ``,
  );
  return platformApiAndAuthSplit !== replace &&
    !platformApiAndAuthSplit.startsWith(`${replace}/`)
    ? referenceError(`outside workspace`)
    : platformApiAndAuthSplit.toLowerCase().endsWith(`.xlsx`)
      ? platformApiAndAuthSplit
      : referenceError(`not xlsx`);
}

function resolvePlatformApiAndAuthValue29(
  platformApiAndAuthValue29?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformApiAndAuthValue29 == null
    ? null
    : `n` in platformApiAndAuthValue29
      ? platformApiAndAuthValue29.n
      : `s` in platformApiAndAuthValue29
        ? platformApiAndAuthValue29.s
        : `b` in platformApiAndAuthValue29
          ? platformApiAndAuthValue29.b
          : platformApiAndAuthValue29.err;
}

var resolvePlatformApiAndAuthSelf: Dynamic;

function resolvePlatformApiAndAuthRest(
  platformApiAndAuthRest?: Dynamic,
  rest?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthBook = resolvePlatformApiAndAuthBook(rest);
  return platformApiAndAuthBook
    ? {
        wb: platformApiAndAuthRest.external(platformApiAndAuthBook.book),
        rest: platformApiAndAuthBook.rest,
      }
    : {
        wb: platformApiAndAuthRest.self,
        rest: rest,
      };
}

function resolvePlatformApiAndAuthRest2(
  platformApiAndAuthRest2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { wb: platformApiAndAuthRest, rest: platformApiAndAuthRest3 }: Dynamic =
    resolvePlatformApiAndAuthRest(
      resolvePlatformApiAndAuthSelf(platformApiAndAuthRest2),
      options,
    );
  if (!platformApiAndAuthRest) return `#REF!`;
  try {
    let resolve: Dynamic = platformApiAndAuthRest.resolve(
      platformApiAndAuthRest3,
    );
    return resolvePlatformApiAndAuthValue29(
      platformApiAndAuthRest.getCell(
        resolve.sheet,
        resolve.startRow,
        resolve.startCol,
      ),
    );
  } catch {
    return `#REF!`;
  }
}

function resolvePlatformApiAndAuthAntspace(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return typeof window !== "undefined"
      ? (window as Dynamic).antspace?.user()
      : undefined;
  } catch {
    return;
  }
}

var PlatformApiAndAuthFEEDTOPIC: Dynamic;

var platformApiAndAuthMap6: Dynamic;

var FEED_TOPIC: (fEEDTOPIC?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthWarn: (platformApiAndAuthWarn?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformApiAndAuthEntries: (platformApiAndAuthEntries?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolvePlatformApiAndAuthKind3(
  platformApiAndAuthKind3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (platformApiAndAuthKind3.ev) {
    case `envelope`: {
      if (typeof platformApiAndAuthKind3.seq == `number`) {
        options.lastSeq = platformApiAndAuthKind3.seq;
      }
      let safeParse: Dynamic = PlatformSessionAndSourcesActor.safeParse(
        platformApiAndAuthKind3.data,
      );
      return safeParse.success
        ? {
            kind: `envelope`,
            envelope: safeParse.data,
            ...(typeof platformApiAndAuthKind3.seq == `number`
              ? {
                  seq: platformApiAndAuthKind3.seq,
                }
              : {}),
          }
        : undefined;
    }
    case `access-changed`:
      if (typeof platformApiAndAuthKind3.seq == `number`) {
        options.lastSeq = platformApiAndAuthKind3.seq;
      }
      return {
        kind: `access-changed`,
      };
    case `position`:
      if (typeof platformApiAndAuthKind3.seq == `number`) {
        options.lastSeq = platformApiAndAuthKind3.seq;
      }
      return;
    case `relay`: {
      let resolvePlatformApiAndAuthKind3Result: Dynamic;
      try {
        resolvePlatformApiAndAuthKind3Result = JSON.parse(
          String(platformApiAndAuthKind3.data),
        );
      } catch {
        return;
      }
      let safeParse: Dynamic = PlatformSessionAndSourcesActor2.safeParse(
        resolvePlatformApiAndAuthKind3Result,
      );
      return safeParse.success
        ? {
            kind: `relay`,
            relay: safeParse.data,
          }
        : undefined;
    }
    case `reset`:
      return {
        kind: `recovered`,
      };
    case `revoked`:
      return {
        kind: `revoked`,
      };
    case `presence`: {
      let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal.safeParse(
        platformApiAndAuthKind3.data,
      );
      return safeParse.success
        ? {
            kind: `presence`,
            frame: safeParse.data,
          }
        : undefined;
    }
    case `presence-leave`: {
      let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal2.safeParse(
        platformApiAndAuthKind3.data,
      );
      return safeParse.success
        ? {
            kind: `presence-leave`,
            ...safeParse.data,
          }
        : undefined;
    }
    case `stream`: {
      let safeParse: Dynamic = PlatformSessionAndSourcesRef.safeParse(
        platformApiAndAuthKind3.data,
      );
      return safeParse.success
        ? {
            kind: `stream`,
            frame: safeParse.data,
          }
        : undefined;
    }
    case `stream-refused`: {
      let safeParse: Dynamic = PlatformSessionAndSourcesRef2.safeParse(
        platformApiAndAuthKind3.data,
      );
      return safeParse.success
        ? {
            kind: `stream-refused`,
            frame: safeParse.data,
          }
        : undefined;
    }
    default:
      return;
  }
}

var platformApiAndAuthState14: Dynamic;

function clearPlatformApiAndAuthLastSeq(
  clearPlatformApiAndAuthLastSeq2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let enabled = false;
  let enabled2 = false;
  let enabled3 = false;
  let index = 0;
  let clearPlatformApiAndAuthLastSeqResult: Dynamic;
  let clearPlatformApiAndAuthLastSeqResult2: Dynamic;
  let record2 = {
    lastSeq: -1,
  };
  let clearPlatformApiAndAuthLastSeqResult3: Dynamic;
  let addEventListener3 = (..._extraArguments: unknown[]): undefined => {
    if (enabled) return;
    let record3: Dynamic =
      record2.lastSeq >= 0
        ? {
            since: record2.lastSeq,
          }
        : {};
    let channel: Dynamic = (
      platformApiAndAuthState14?.channel ?? updatePlatformApiAndAuthTopic2
    )(FEED_TOPIC(clearPlatformApiAndAuthLastSeq2), record3);
    clearPlatformApiAndAuthLastSeqResult3 = channel;
    channel.addEventListener(
      `open`,
      (..._extraArguments: unknown[]): undefined => {
        clearTimeout(clearPlatformApiAndAuthLastSeqResult2);
        clearPlatformApiAndAuthLastSeqResult2 = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            index = 0;
          },
          3e3,
        );
        if (options.sawOpen) {
          resolvePlatformApiAndAuthEntries(options, {
            kind: `recovered`,
          });
        } else {
          options.sawOpen = true;
          resolvePlatformApiAndAuthEntries(options, {
            kind: `live`,
          });
        }
      },
    );
    channel.addEventListener(
      `message`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let data: Dynamic = event.data;
        if (typeof data != `string`) return;
        let clearPlatformApiAndAuthLastSeqResult4: Dynamic;
        try {
          clearPlatformApiAndAuthLastSeqResult4 = JSON.parse(data);
        } catch {
          return;
        }
        if (clearPlatformApiAndAuthLastSeqResult4.ev === `revoked`) {
          enabled2 = true;
          if (
            platformApiAndAuthMap6.get(clearPlatformApiAndAuthLastSeq2) ===
            options
          ) {
            platformApiAndAuthMap6.delete(clearPlatformApiAndAuthLastSeq2);
          }
          clearPlatformApiAndAuthLastSeqResult3?.close();
        }
        let platformApiAndAuthKind3: Dynamic = resolvePlatformApiAndAuthKind3(
          clearPlatformApiAndAuthLastSeqResult4,
          record2,
        );
        if (
          platformApiAndAuthKind3 &&
          platformApiAndAuthKind3.kind !== `revoked`
        ) {
          resolvePlatformApiAndAuthEntries(options, platformApiAndAuthKind3);
        }
      },
    );
    channel.addEventListener(
      `close`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        clearTimeout(clearPlatformApiAndAuthLastSeqResult2);
        if (enabled) return;
        let { code: event2, reason: event3 }: Dynamic = event;
        if (enabled2 || event2 === 1008) {
          if (
            platformApiAndAuthMap6.get(clearPlatformApiAndAuthLastSeq2) ===
            options
          ) {
            platformApiAndAuthMap6.delete(clearPlatformApiAndAuthLastSeq2);
          }
          if (!enabled3) {
            enabled3 = true;
            queueMicrotask((..._extraArguments: unknown[]) =>
              resolvePlatformApiAndAuthEntries(options, {
                kind: `revoked`,
              }),
            );
          }
          return;
        }
        if (
          options.sawOpen &&
          event2 === 1012 &&
          (event3 === `draining` || event3 === `room-moving`)
        ) {
          resolvePlatformApiAndAuthEntries(options, {
            kind: `moving`,
          });
        }
        if (options.sawOpen) {
          resolvePlatformApiAndAuthEntries(options, {
            kind: `down`,
          });
        }
        let min = Math.min(3e4, 250 * 2 ** index++);
        clearPlatformApiAndAuthLastSeqResult = setTimeout(
          addEventListener3,
          min / 2 + Math.random() * min,
        );
      },
    );
  };
  addEventListener3();
  options.reportPresence = (
    clearPlatformApiAndAuthLastSeq3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearPlatformApiAndAuthLastSeqResult3?.readyState === 1) {
      clearPlatformApiAndAuthLastSeqResult3.send(
        JSON.stringify(clearPlatformApiAndAuthLastSeq3),
      );
    }
  };
  options.close = (..._extraArguments: unknown[]): undefined => {
    enabled = true;
    if (clearPlatformApiAndAuthLastSeqResult !== undefined) {
      clearTimeout(clearPlatformApiAndAuthLastSeqResult);
    }
    clearTimeout(clearPlatformApiAndAuthLastSeqResult2);
    clearPlatformApiAndAuthLastSeqResult3?.close();
  };
}

var platformApiAndAuthState15: Dynamic;

function presenceOnFile(
  presenceOnFile2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let body: Dynamic = presenceOnFile2.body;
  if (typeof body != `object` || !body) return presenceOnFile2;
  let ref: Dynamic = body.ref;
  if (!ref || typeof ref.object != `string` || typeof ref.id != `string`)
    return presenceOnFile2;
  let record2: Dynamic = {
    object: ref.object,
    id: ref.id,
  };
  if (record2.object === `project`) {
    record2 = resolvePlatformApiAndAuthFile(options);
  }
  for (
    let index = 0;
    record2 !== undefined && record2.object !== `file` && index < 8;
    index++
  )
    record2 = options.get(`${record2.object}/${record2.id}`)?.parent;
  return record2 === undefined ||
    record2.object !== `file` ||
    record2.id === ref.id
    ? presenceOnFile2
    : {
        ...presenceOnFile2,
        body: {
          ...body,
          ref: {
            object: `file`,
            id: record2.id,
          },
        },
      };
}

function resolvePlatformApiAndAuthFile(
  platformApiAndAuthFile?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformApiAndAuthFileResult: Dynamic;
  for (let resolvePlatformApiAndAuthFileResult2 of platformApiAndAuthFile.keys() as Dynamic)
    if (resolvePlatformApiAndAuthFileResult2.startsWith(`file/`)) {
      if (resolvePlatformApiAndAuthFileResult !== undefined) return;
      resolvePlatformApiAndAuthFileResult =
        resolvePlatformApiAndAuthFileResult2.slice(5);
    }
  return resolvePlatformApiAndAuthFileResult === undefined
    ? undefined
    : {
        object: `file`,
        id: resolvePlatformApiAndAuthFileResult,
      };
}

var PlatformApiAndAuthState8: Dynamic;

var PlatformApiAndAuthState9: Dynamic;

function resolvePlatformApiAndAuthThen2(
  ..._extraArguments: unknown[]
): Dynamic {
  PlatformApiAndAuthState9 ??= preloadModule(
    (..._extraArguments: unknown[]): Dynamic =>
      import("../../assistant/refusal-shadow").then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (PlatformApiAndAuthState8 = result.LAW),
        (..._extraArguments: unknown[]) => (
          (PlatformApiAndAuthState9 = null),
          null
        ),
      ),
    [],
    import.meta.url,
  );
  return PlatformApiAndAuthState9;
}

function loadPlatformApiAndAuthKind(
  platformApiAndAuthKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let lane: Dynamic = (platformApiAndAuthState15?.lane ?? frameLane)(
    `project/${platformApiAndAuthKind}`,
  );
  let enabled = false;
  let subscribe: Dynamic = lane.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      switch (entry.kind) {
        case `live`:
          if (options.sawOpen) {
            resolvePlatformApiAndAuthEntries(options, {
              kind: `recovered`,
            });
          } else {
            options.sawOpen = true;
            resolvePlatformApiAndAuthEntries(options, {
              kind: `live`,
            });
          }
          return;
        case `down`:
          if (!entry.terminal)
            return void (
              options.sawOpen &&
              resolvePlatformApiAndAuthEntries(options, {
                kind: `down`,
              })
            );
          if (enabled) return;
          enabled = true;
          if (platformApiAndAuthMap6.get(platformApiAndAuthKind) === options) {
            platformApiAndAuthMap6.delete(platformApiAndAuthKind);
          }
          queueMicrotask((..._extraArguments: unknown[]) =>
            resolvePlatformApiAndAuthEntries(options, {
              kind: `revoked`,
            }),
          );
          return;
        case `envelope`:
          resolvePlatformApiAndAuthEntries(options, {
            kind: `envelope`,
            envelope: entry.envelope,
            ...(typeof entry.seq == `number`
              ? {
                  seq: entry.seq,
                }
              : {}),
          });
          return;
        case `writable`:
        case `commentable`:
        case `viewer`:
          return;
        case `presence`:
          resolvePlatformApiAndAuthEntries(options, {
            kind: `presence`,
            frame: presenceOnFile(entry.frame, lane.refs()),
          });
          return;
        default:
          if (entry.kind === `access-changed` || entry.kind === `recovered`) {
            loadPlatformApiAndAuthKindHandler2();
          }
          resolvePlatformApiAndAuthEntries(options, entry);
      }
    },
  );
  if (resolveEditorExtensionsRefusalClass()) {
    resolvePlatformApiAndAuthThen2();
  }
  let loadPlatformApiAndAuthKindHandler: Dynamic = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    response === null ||
    response.verdict !== `deny` ||
    response.reason === `conflict` ||
    response.reason === `forbidden`;
  let ackOf2: Dynamic = (
    platformApiAndAuthKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      let ackOf3: Dynamic = ackOf(platformApiAndAuthKind2);
      let data: Dynamic =
        typeof ackOf3.data == `object` && ackOf3.data !== null
          ? ackOf3.data
          : {};
      return (
        ackOf3.verdict === `deny` &&
        (ackOf3.reason === `gone` || data.code === `gone`) &&
        data.object === `project`
      );
    } catch {
      return false;
    }
  };
  let loadPlatformApiAndAuthKindResult: Dynamic = null;
  let enabled2 = false;
  let enabled3 = false;
  let index = 0;
  let info = (
    platformApiAndAuthKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled3) {
      enabled3 = true;
      loadPlatformApiAndAuthKindResult = null;
      console.info(
        `clientFeed: presence reports stopped for this page —`,
        platformApiAndAuthKind2,
      );
    }
  };
  function loadPlatformApiAndAuthKindHandler2(
    ..._extraArguments: unknown[]
  ): undefined {
    index = 0;
    enabled3 = false;
  }
  let result = (..._extraArguments: unknown[]): undefined => {
    if (enabled3 || enabled2 || loadPlatformApiAndAuthKindResult === null)
      return;
    if (resolveDataContentAndReferencesValue5(lane.viewerClass)) {
      loadPlatformApiAndAuthKindResult = null;
      return;
    }
    let loadPlatformApiAndAuthKindResult2: Dynamic =
      loadPlatformApiAndAuthKindResult;
    loadPlatformApiAndAuthKindResult = null;
    enabled2 = true;
    let call: Dynamic = lane.call({
      verb: `presence`,
      connId: loadPlatformApiAndAuthKindResult2.connId,
      body: loadPlatformApiAndAuthKindResult2.body,
      opId: crypto.randomUUID(),
    });
    (resolveEditorExtensionsRefusalClass()
      ? call.then(
          async (
            result2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            index = 0;
            let PlatformApiAndAuthState82: Dynamic =
              PlatformApiAndAuthState8 ??
              (await resolvePlatformApiAndAuthThen2());
            if (PlatformApiAndAuthState82 === null) return;
            let response: Dynamic;
            try {
              response = ackOf(result2);
            } catch {
              return;
            }
            if (response.verdict !== `deny`) return;
            let k10: Dynamic = PlatformApiAndAuthState82.classify(response, {
              road: `presence`,
            }).k;
            if (k10 === `page_terminal` || k10 === `link_terminal`) {
              info(`refused ${response.reason ?? ``} (${k10})`);
            }
          },
          async (
            error?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            let PlatformApiAndAuthState82: Dynamic =
              PlatformApiAndAuthState8 ??
              (await resolvePlatformApiAndAuthThen2());
            if (
              PlatformApiAndAuthState82 !== null &&
              !loadPlatformApiAndAuthKindHandler(
                PlatformApiAndAuthState82.ofThrow(error, `update`),
              ) &&
              ++index >= PlatformApiAndAuthState82.UNKNOWN_RETRY_MAX
            ) {
              info(
                `rejected ${index}× (${error instanceof (EditorExtensionsFrameSendError as Dynamic) ? error.code : `?`})`,
              );
            }
          },
        )
      : call.then(
          (result2?: Dynamic, ..._extraArguments: unknown[]): undefined =>
            void (
              ackOf2(result2) && info(`refused gone (the page was deleted)`)
            ),
          (..._extraArguments: unknown[]): undefined => {},
        )
    ).finally((..._extraArguments: unknown[]): undefined => {
      enabled2 = false;
      result();
    });
  };
  options.reportPresence = (
    platformApiAndAuthKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled3) {
      loadPlatformApiAndAuthKindResult = platformApiAndAuthKind2;
      result();
    }
  };
  options.close = subscribe;
}

function clearPlatformApiAndAuthKind(
  clearPlatformApiAndAuthKind2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let eventSource: Dynamic = new (EventSource as Dynamic)(
    resolvePlatformApiAndAuthValue(
      resolvePlatformSessionAndSourcesValue17(clearPlatformApiAndAuthKind2),
    ),
  );
  let enabled = false;
  options.close = (..._extraArguments: unknown[]): Dynamic =>
    eventSource.close();
  options.isDead = (..._extraArguments: unknown[]) =>
    eventSource.readyState === 2;
  eventSource.addEventListener(
    `message`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let clearPlatformApiAndAuthKindResult: Dynamic;
      try {
        clearPlatformApiAndAuthKindResult = JSON.parse(event.data);
      } catch {
        return;
      }
      let safeParse: Dynamic = PlatformSessionAndSourcesActor.safeParse(
        clearPlatformApiAndAuthKindResult,
      );
      let seq = Number(event.lastEventId);
      if (safeParse.success) {
        resolvePlatformApiAndAuthEntries(options, {
          kind: `envelope`,
          envelope: safeParse.data,
          ...(Number.isInteger(seq) && event.lastEventId !== ``
            ? {
                seq: seq,
              }
            : {}),
        });
      }
    },
  );
  eventSource.addEventListener(
    `relay`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let clearPlatformApiAndAuthKindResult: Dynamic;
      try {
        clearPlatformApiAndAuthKindResult = JSON.parse(event.data);
      } catch {
        return;
      }
      let safeParse: Dynamic = PlatformSessionAndSourcesActor2.safeParse(
        clearPlatformApiAndAuthKindResult,
      );
      if (safeParse.success) {
        resolvePlatformApiAndAuthEntries(options, {
          kind: `relay`,
          relay: safeParse.data,
        });
      }
    },
  );
  eventSource.addEventListener(`reset`, (..._extraArguments: unknown[]) =>
    resolvePlatformApiAndAuthEntries(options, {
      kind: `recovered`,
    }),
  );
  eventSource.addEventListener(
    `access-changed`,
    (..._extraArguments: unknown[]) =>
      resolvePlatformApiAndAuthEntries(options, {
        kind: `access-changed`,
      }),
  );
  eventSource.addEventListener(
    `presence`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal.safeParse(
        JSON.parse(event.data),
      );
      if (safeParse.success) {
        resolvePlatformApiAndAuthEntries(options, {
          kind: `presence`,
          frame: safeParse.data,
        });
      }
    },
  );
  eventSource.addEventListener(
    `presence-leave`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal2.safeParse(
        JSON.parse(event.data),
      );
      if (safeParse.success) {
        resolvePlatformApiAndAuthEntries(options, {
          kind: `presence-leave`,
          ...safeParse.data,
        });
      }
    },
  );
  eventSource.addEventListener(
    `revoked`,
    (..._extraArguments: unknown[]): undefined => {
      if (
        platformApiAndAuthMap6.get(clearPlatformApiAndAuthKind2) === options
      ) {
        platformApiAndAuthMap6.delete(clearPlatformApiAndAuthKind2);
      }
      eventSource.close();
      resolvePlatformApiAndAuthEntries(options, {
        kind: `revoked`,
      });
    },
  );
  eventSource.addEventListener(
    `error`,
    (..._extraArguments: unknown[]): undefined => {
      enabled = true;
      if (
        eventSource.readyState === 2 &&
        platformApiAndAuthMap6.get(clearPlatformApiAndAuthKind2) === options
      ) {
        platformApiAndAuthMap6.delete(clearPlatformApiAndAuthKind2);
      } else {
        if (options.sawOpen) {
          resolvePlatformApiAndAuthEntries(options, {
            kind: `down`,
          });
        }
      }
    },
  );
  eventSource.addEventListener(
    `open`,
    (..._extraArguments: unknown[]): undefined => {
      if (options.sawOpen) {
        if (enabled) {
          enabled = false;
          resolvePlatformApiAndAuthEntries(options, {
            kind: `recovered`,
          });
        }
      } else {
        options.sawOpen = true;
        enabled = false;
        resolvePlatformApiAndAuthEntries(options, {
          kind: `live`,
        });
      }
    },
  );
}

function subscribeProjectFeed(
  projectFeed?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthMap6Entry: Dynamic =
    platformApiAndAuthMap6.get(projectFeed);
  if (platformApiAndAuthMap6Entry?.isDead?.()) {
    platformApiAndAuthMap6.delete(projectFeed);
    platformApiAndAuthMap6Entry = undefined;
  }
  if (!platformApiAndAuthMap6Entry) {
    platformApiAndAuthMap6Entry = {
      entries: new (Set as Dynamic)(),
      sawOpen: false,
      close: (..._extraArguments: unknown[]): undefined => {},
    };
    platformApiAndAuthMap6.set(projectFeed, platformApiAndAuthMap6Entry);
    if (
      platformApiAndAuthState15 !== undefined ||
      (platformApiAndAuthState14 === undefined && inFrame())
    ) {
      loadPlatformApiAndAuthKind(projectFeed, platformApiAndAuthMap6Entry);
    } else {
      if (
        resolvePlatformApiAndAuthValue3() ||
        platformApiAndAuthState14 !== undefined
      ) {
        clearPlatformApiAndAuthLastSeq(
          projectFeed,
          platformApiAndAuthMap6Entry,
        );
      } else {
        clearPlatformApiAndAuthKind(projectFeed, platformApiAndAuthMap6Entry);
      }
    }
  }
  let platformApiAndAuthMap6Entry2: Dynamic = platformApiAndAuthMap6Entry;
  let record2: Dynamic = {
    fn: options,
  };
  platformApiAndAuthMap6Entry2.entries.add(record2);
  let enabled = true;
  if (platformApiAndAuthMap6Entry2.sawOpen) {
    queueMicrotask((..._extraArguments: unknown[]): undefined => {
      if (enabled) {
        resolvePlatformApiAndAuthWarn(record2, {
          kind: `live`,
        });
      }
    });
  }
  return (..._extraArguments: unknown[]): undefined => {
    if (enabled) {
      enabled = false;
      platformApiAndAuthMap6Entry2.entries.delete(record2);
      if (
        platformApiAndAuthMap6Entry2.entries.size === 0 &&
        platformApiAndAuthMap6.get(projectFeed) === platformApiAndAuthMap6Entry2
      ) {
        platformApiAndAuthMap6.delete(projectFeed);
        platformApiAndAuthMap6Entry2.close();
      }
    }
  };
}

function reportPresence(
  reportPresence2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformApiAndAuthMap6.get(reportPresence2)?.reportPresence?.(options);
}

var platformApiAndAuthPattern7: RegExp;

var resolvePlatformApiAndAuthTest: Dynamic;

// BaoCut: 智能体光标旗子上的名字叫 Agent，不叫 Claude。
var PlatformApiAndAuthColor: {
    name: string;
    color: string;
    connId: string;
};

var PlatformApiAndAuthLdocCaretFlagFlip: string;

var PlatformApiAndAuthLdocAgentCaretParked: string;

var platformApiAndAuthValue150002: number;

var PlatformApiAndAuthLdocAgentSweeping: string;

var PlatformApiAndAuthDataClaudeLive: string;

var resolvePlatformApiAndAuthValue30: (platformApiAndAuthValue30?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformApiAndAuthStyles4: string;

var PlatformApiAndAuthStyles5: string;

var platformApiAndAuthValue4000: number;

var resolvePlatformApiAndAuthValue31: (platformApiAndAuthValue31?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformApiAndAuthColor2: string;

var PlatformApiAndAuthState10: string;

var PlatformApiAndAuthState11: string;

var resolvePlatformApiAndAuthValue32: (platformApiAndAuthValue32?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthValue33: (platformApiAndAuthValue33?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthValue34: (platformApiAndAuthValue34?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthValue35: (platformApiAndAuthValue35?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthValue36: (platformApiAndAuthValue36?: Dynamic, ..._extraArguments: unknown[]) => string;

var platformApiAndAuthDescribeSchema: Dynamic;

var platformApiAndAuthDescribeSchema2: Dynamic;

var resolvePlatformApiAndAuthPrincipal: Dynamic;

var PlatformApiAndAuthPrincipal: Dynamic;

var platformApiAndAuthDescribeSchema3: Dynamic;

var resolvePlatformApiAndAuthHuman: Dynamic;

var resolvePlatformApiAndAuthHuman2: (platformApiAndAuthHuman2?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformApiAndAuthInternal: (platformApiAndAuthInternal?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformApiAndAuthExternal: (platformApiAndAuthExternal?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformApiAndAuthHuman3: (platformApiAndAuthHuman3?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformApiAndAuthPrincipal2: Dynamic;

var resolvePlatformApiAndAuthAssistant: Dynamic;

var resolvePlatformApiAndAuthAssistant2: Dynamic;

var resolvePlatformApiAndAuthSafeParse: Dynamic;

// BaoCut: @ 菜单里的智能体叫 Agent（批注正文里写作「@Agent」）；id 不变，发给智能体按 id 判断。
var PlatformApiAndAuthLabel: {
    id: string;
    label: string;
};

var PlatformApiAndAuthBongoPeoplePicked: string;

var PlatformApiAndAuthBongoPeopleSeenV2: string;

var PlatformApiAndAuthBongoPeopleLru: string;

var platformApiAndAuthValue502: number;

var platformApiAndAuthValue200: number;

var platformApiAndAuthValue150: number;

var resolvePlatformApiAndAuthSplit2: Dynamic;

var resolvePlatformApiAndAuthLabel: Dynamic;

var resolvePlatformApiAndAuthEmail: Dynamic;

var collectPlatformApiAndAuthDir: Dynamic;

var resolvePlatformApiAndAuthValue37: Dynamic;

var resolvePlatformApiAndAuthSetItem: (platformApiAndAuthSetItem?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformApiAndAuthGetItem2: Dynamic;

function resolvePlatformApiAndAuthPicked(
  ..._extraArguments: unknown[]
): Dynamic {
  let picked: Dynamic = resolvePlatformApiAndAuthGetItem2(
    PlatformApiAndAuthBongoPeoplePicked,
    platformApiAndAuthValue502,
  );
  let seen: Dynamic = resolvePlatformApiAndAuthGetItem2(
    PlatformApiAndAuthBongoPeopleSeenV2,
    platformApiAndAuthValue200,
  );
  if (picked.length || seen.length)
    return {
      picked: picked,
      seen: seen,
    };
  let platformApiAndAuthGetItem2: Dynamic = resolvePlatformApiAndAuthGetItem2(
    PlatformApiAndAuthBongoPeopleLru,
    platformApiAndAuthValue502,
  );
  if (!platformApiAndAuthGetItem2.length)
    return {
      picked: [],
      seen: [],
    };
  resolvePlatformApiAndAuthSetItem(
    PlatformApiAndAuthBongoPeoplePicked,
    platformApiAndAuthGetItem2,
    platformApiAndAuthValue502,
  );
  try {
    localStorage.removeItem(PlatformApiAndAuthBongoPeopleLru);
  } catch {}
  return {
    picked: platformApiAndAuthGetItem2.slice(0, platformApiAndAuthValue502),
    seen: [],
  };
}

var isPlatformApiAndAuthToLowerCase: (platformApiAndAuth?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var getPlatformApiAndAuthPicked: Dynamic;

var resolvePlatformApiAndAuthPush2: Dynamic;

var updatePlatformApiAndAuthLabel: Dynamic;

var platformApiAndAuthState16: Dynamic;

var platformApiAndAuthValue09: number;

var resolvePlatformApiAndAuthValue38: Dynamic;

function updatePlatformApiAndAuthSettled(
  ..._extraArguments: unknown[]
): undefined {
  platformApiAndAuthValue09++;
  platformApiAndAuthMap8.clear();
  platformApiAndAuthMap9.clear();
  PlatformApiAndAuthPriming.setState({
    settled: {},
  });
}

function resolvePlatformApiAndAuthContainer2(
  page?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let page2: Dynamic = page && (page.pid || page.container) ? page : undefined;
  if (!resolvePlatformApiAndAuthValue38(platformApiAndAuthState16, page2)) {
    platformApiAndAuthState16 = page2;
    updatePlatformApiAndAuthSettled();
  }
}

var platformApiAndAuthMap7: Dynamic;

var resolvePlatformApiAndAuthPriming: Dynamic;

var platformApiAndAuthValue60000: number;

var platformApiAndAuthValue600000: number;

var platformApiAndAuthValue6000002: number;

var platformApiAndAuthMap8: Dynamic;

var platformApiAndAuthMap9: Dynamic;

var clearPlatformApiAndAuthDelete4: Dynamic;

var isPlatformApiAndAuthDelete: (platformApiAndAuthDelete?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var platformApiAndAuthValue8000: number;

var resolvePlatformApiAndAuthPrimeTimeout: Dynamic;

var resolvePlatformApiAndAuthReplace: Dynamic;

var filterPlatformApiAndAuthLabel: Dynamic;

var platformApiAndAuthValue_12: boolean;

var PlatformApiAndAuthState12: number[];

var platformApiAndAuthValue010: number;

var platformApiAndAuthState17: Dynamic;

function resolvePlatformApiAndAuthPhotoUrl(
  platformApiAndAuthPhotoUrl?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthValue_12) return;
  let platformApiAndAuthAntspace: Dynamic = resolvePlatformApiAndAuthAntspace();
  if (
    !platformApiAndAuthAntspace ||
    !platformApiAndAuthPhotoUrl ||
    !platformApiAndAuthAntspace.email ||
    platformApiAndAuthAntspace.email.toLowerCase() !==
      platformApiAndAuthPhotoUrl.toLowerCase()
  )
    return;
  let name: Dynamic = platformApiAndAuthAntspace.name;
  let photoUrl: Dynamic = platformApiAndAuthAntspace.photoUrl?.startsWith(
    `https://lh3.googleusercontent.com/`,
  )
    ? platformApiAndAuthAntspace.photoUrl
    : undefined;
  if (!name && !photoUrl) return;
  platformApiAndAuthValue_12 = true;
  let resolvePlatformApiAndAuthPhotoUrlHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    platformApiAndAuthValue_12 = false;
    if (platformApiAndAuthValue010 >= PlatformApiAndAuthState12.length) return;
    let PlatformApiAndAuthState12Item =
      PlatformApiAndAuthState12[platformApiAndAuthValue010++];
    if (platformApiAndAuthState17 !== undefined) {
      clearTimeout(platformApiAndAuthState17);
    }
    platformApiAndAuthState17 = setTimeout(
      (..._extraArguments: unknown[]): undefined => {
        platformApiAndAuthState17 = undefined;
        resolvePlatformApiAndAuthPhotoUrl(platformApiAndAuthPhotoUrl);
      },
      PlatformApiAndAuthState12Item,
    );
  };
  api.people
    .profile({
      ...(name
        ? {
            name: name,
          }
        : {}),
      ...(photoUrl
        ? {
            photoUrl: photoUrl,
          }
        : {}),
    })
    .then((response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(response && typeof response == `object` && response.ok === true)) {
        resolvePlatformApiAndAuthPhotoUrlHandler();
      }
    }, resolvePlatformApiAndAuthPhotoUrlHandler);
}

var platformApiAndAuthSet20: Dynamic;

var platformApiAndAuthMap10: Dynamic;

var installPlatformApiAndAuthLoad: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth5Step1(): void {
  ({
    _wireRevBump: _wireRevBump,
    ensureStarted: ensureStarted,
    getParked: platformApiAndAuthState9,
    parkConflict: parkConflict,
    ensureSettled: ensureSettled,
    readValidated: readValidated,
    listLive: platformApiAndAuthState10,
    stashBytes: stashBytes,
    persistOpenEdit: persistOpenEdit,
    dropEntry: dropEntry,
    forgetEntry: forgetEntry,
    moveEntry: moveEntry,
    moveUnder: moveUnder,
    discardUnder: discardUnder,
    getBytesSync: getBytesSync,
    isDeletedSync: isDeletedSync,
    listLiveSync: listLiveSync,
    anyDirtySync: anyDirtySync,
    hasEntrySync: hasEntrySync,
    dumpSync: platformApiAndAuthState11,
    flushSnapshot: flushSnapshot,
    ackFlushed: ackFlushed,
    unloadAfterAck: unloadAfterAck,
    purgeIfFlushAcked: purgeIfFlushAcked,
    markFlushDead: markFlushDead,
    announce: announce,
    getStage: platformApiAndAuthState12,
    listEntriesSync: listEntriesSync,
    _test: platformApiAndAuthState13,
  } = createDraftLayer({
    idb: {
      get: (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        PlatformApiAndAuthGet.get(callback),
      put: (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => PlatformApiAndAuthGet.put(callback, options),
      del: (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        PlatformApiAndAuthGet.del(callback),
      delIfBytesEqual: (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => PlatformApiAndAuthGet.delIfBytesEqual(callback, options),
      all: (..._extraArguments: unknown[]): Dynamic =>
        PlatformApiAndAuthGet.all(),
    },
    readFileDiskWithSha: (
      callback?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => resolvePlatformApiAndAuthValue14(callback),
    toast: {
      warning: (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => void toast.warning(callback, options),
      error: (callback?: Dynamic, ..._extraArguments: unknown[]): undefined =>
        void toast.error(callback),
      dismiss: (callback?: Dynamic, ..._extraArguments: unknown[]): undefined =>
        void toast.dismiss(callback),
    },
    BroadcastChannelCtor:
      typeof BroadcastChannel !== "undefined" ? BroadcastChannel : undefined,
    now: Date.now,
    setTimeoutFn: (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(callback, options),
  }));
  (PlatformApiAndAuthCodeModal = createLiveModuleNamespace({
    CodeModal: (..._extraArguments: unknown[]): Dynamic => CodeModal,
    CodeViewer: (..._extraArguments: unknown[]): Dynamic => CodeViewer,
    DiffView: (..._extraArguments: unknown[]): Dynamic => DiffView,
    DocxDiffPane: (..._extraArguments: unknown[]): Dynamic => DocxDiffPane,
    DocxEditor: (..._extraArguments: unknown[]): Dynamic => DocxEditor,
    HtmlViewer: (..._extraArguments: unknown[]): Dynamic => HtmlViewer,
    InlineSheetView: (..._extraArguments: unknown[]): Dynamic => InlineSheetView,
    IronAbortError: (..._extraArguments: unknown[]): Dynamic => IronAbortError,
    LiteUnavailableError: (..._extraArguments: unknown[]): Dynamic =>
      LiteUnavailableError,
    MarkdownRenderer: (..._extraArguments: unknown[]): Dynamic =>
      MarkdownRenderer,
    ModalSheetView: (..._extraArguments: unknown[]): Dynamic => ModalSheetView,
    PdfViewer: (..._extraArguments: unknown[]): Dynamic => PdfViewer,
    PptxDiffPane: (..._extraArguments: unknown[]): Dynamic => PptxDiffPane,
    RoomSheetView: (..._extraArguments: unknown[]): Dynamic => RoomSheetView,
    RoutineEditor: (..._extraArguments: unknown[]): Dynamic => RoutineEditor,
    SheetEditor: (..._extraArguments: unknown[]): Dynamic => SheetEditor,
    SlidesEditor: (..._extraArguments: unknown[]): Dynamic => SlidesEditor,
    VersionPreview: (..._extraArguments: unknown[]): Dynamic => VersionPreview,
    WidgetConsolePanel: (..._extraArguments: unknown[]): Dynamic =>
      WidgetConsolePanel,
    WidgetPanel: (..._extraArguments: unknown[]): Dynamic => WidgetPanel,
    blockEmbedCaption: (..._extraArguments: unknown[]): Dynamic =>
      blockEmbedCaption,
    default: (..._extraArguments: unknown[]): Dynamic =>
      PlatformApiAndAuthThisFileType,
    ironLoadDebug: (..._extraArguments: unknown[]): Dynamic => ironLoadDebug,
    ironLoadOffThread: (..._extraArguments: unknown[]): Dynamic =>
      ironLoadOffThread,
    parseLFile: (..._extraArguments: unknown[]): Dynamic => parseLFile,
    parseSelection: (..._extraArguments: unknown[]): Dynamic => parseSelection,
    preload: (..._extraArguments: unknown[]): Dynamic => preload,
    recalcOffThread: (..._extraArguments: unknown[]): Dynamic => recalcOffThread,
    toastManualCalc: (..._extraArguments: unknown[]): Dynamic => toastManualCalc,
    warmIronWorker: (..._extraArguments: unknown[]): Dynamic => warmIronWorker,
  }));
  (PlatformApiAndAuthThisFileType = PlatformApiAndAuthWhat(`This file type`));
  (preload = resolvePlatformApiAndAuthValue17);
  (SheetEditor = PlatformApiAndAuthWhat(`Spreadsheets`));
  (RoomSheetView = PlatformApiAndAuthWhat(`Spreadsheets`));
  (InlineSheetView = PlatformApiAndAuthWhat(`Spreadsheets`));
  (ModalSheetView = PlatformApiAndAuthWhat(`Spreadsheets`));
  (DocxEditor = PlatformApiAndAuthWhat(`Word documents`));
  (SlidesEditor = PlatformApiAndAuthWhat(`Slides`));
  (PdfViewer = PlatformApiAndAuthWhat(`PDF files`));
  (CodeViewer = PlatformApiAndAuthWhat(`Code files`));
  (MarkdownRenderer = PlatformApiAndAuthWhat(`Markdown files`));
  (HtmlViewer = PlatformApiAndAuthWhat(`HTML files`));
  (DiffView = PlatformApiAndAuthWhat(`Diffs`));
  (VersionPreview = PlatformApiAndAuthWhat(`Version preview`));
  (DocxDiffPane = PlatformApiAndAuthWhat(`Diffs`));
  (PptxDiffPane = PlatformApiAndAuthWhat(`Diffs`));
  (RoutineEditor = PlatformApiAndAuthWhat(`Routines`));
  (WidgetConsolePanel = PlatformApiAndAuthWhat(`The widget console`));
  (WidgetPanel = PlatformApiAndAuthWhat(`The widget panel`));
  (CodeModal = (..._extraArguments: unknown[]) => null);
  (parseSelection = (..._extraArguments: unknown[]) => null);
  (blockEmbedCaption = (..._extraArguments: unknown[]) => ``);
  (IronAbortError = class extends Error {
    [key: string]: Dynamic;
  });
  (ironLoadDebug = {
    enabled: false,
    log: resolvePlatformApiAndAuthValue17,
  });
  (ironLoadOffThread = resolvePlatformApiAndAuthReject(`spreadsheet engine`));
  (recalcOffThread = resolvePlatformApiAndAuthReject(`spreadsheet engine`));
  (toastManualCalc = resolvePlatformApiAndAuthValue17);
  (warmIronWorker = resolvePlatformApiAndAuthValue17);
  (parseLFile = resolvePlatformApiAndAuthValue16(`version preview`));
  (referenceError = (
    why?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    err: `#REF!`,
    why: why,
  }));
  (resolvePlatformApiAndAuthValue28 = (
    platformApiAndAuthValue28?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    typeof platformApiAndAuthValue28 == `object` &&
    !!platformApiAndAuthValue28 &&
    platformApiAndAuthValue28.err === `#REF!`);
  (platformApiAndAuthPattern3 = /^'\[([^\]]+)\]([^']*)'(!.+)$/);
  (platformApiAndAuthPattern4 = /^\[([^\]]+)\](.+)$/);
  (platformApiAndAuthPattern5 = /'\[[^\]]+\][^']*'![$A-Z]+\$?\d+(?::[$A-Z]+\$?\d+)?|\[[^\]]+\][^!]+![$A-Z]+\$?\d+(?::[$A-Z]+\$?\d+)?/g);
  (platformApiAndAuthPattern6 = /^([/\\~]|[A-Za-z]:)/);
  (resolvePlatformApiAndAuthSelf = (
    self?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    `self` in self
      ? self
      : {
          self: self,
          external: (..._extraArguments: unknown[]) => null,
        });
  (PlatformApiAndAuthFEEDTOPIC = createLiveModuleNamespace({
    FEED_TOPIC: (..._extraArguments: unknown[]): Dynamic => FEED_TOPIC,
    presenceOnFile: (..._extraArguments: unknown[]): Dynamic => presenceOnFile,
    reportPresence: (..._extraArguments: unknown[]): Dynamic => reportPresence,
    subscribeProjectFeed: (..._extraArguments: unknown[]): Dynamic =>
      subscribeProjectFeed,
  }));
  (platformApiAndAuthMap6 = new (Map as Dynamic)());
  (FEED_TOPIC = (fEEDTOPIC?: Dynamic, ..._extraArguments: unknown[]) =>
    `feed:project/${fEEDTOPIC}`);
  (resolvePlatformApiAndAuthWarn = (
    platformApiAndAuthWarn?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      platformApiAndAuthWarn.fn(options);
    } catch (resolvePlatformApiAndAuthWarnResult: Dynamic) {
      console.warn(
        `[projectFeed] listener error —`,
        resolveDataContentAndReferencesError2(
          resolvePlatformApiAndAuthWarnResult,
        ),
      );
    }
  });
  (resolvePlatformApiAndAuthEntries = (
    platformApiAndAuthEntries?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let resolvePlatformApiAndAuthEntriesResult of [
      ...platformApiAndAuthEntries.entries,
    ] as Dynamic)
      resolvePlatformApiAndAuthWarn(
        resolvePlatformApiAndAuthEntriesResult,
        options,
      );
  });
  (PlatformApiAndAuthState8 = null);
  (PlatformApiAndAuthState9 = null);
  (platformApiAndAuthPattern7 = /^(?:#[0-9a-f]{6}|hsl\(\d{1,3} \d{1,3}% \d{1,3}%\))$/i);
  (resolvePlatformApiAndAuthTest = (
    platformApiAndAuthTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformApiAndAuthTest == `string` &&
    platformApiAndAuthPattern7.test(platformApiAndAuthTest));
  (PlatformApiAndAuthColor = {
    name: `Agent`,
    color: `#d97757`,
    connId: `claude-agent`,
  });
  (PlatformApiAndAuthLdocCaretFlagFlip = `ldoc-caret-flag-flip`);
  (PlatformApiAndAuthLdocAgentCaretParked = `ldoc-agent-caret-parked`);
  (platformApiAndAuthValue150002 = 15e3);
  (PlatformApiAndAuthLdocAgentSweeping = `ldoc-agent-sweeping`);
  (PlatformApiAndAuthDataClaudeLive = `data-claude-live`);
  Math.ceil(platformApiAndAuthValue150002 / 70) + 1;
  (resolvePlatformApiAndAuthValue30 = (
    platformApiAndAuthValue30?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `content:${platformApiAndAuthValue30};content:${platformApiAndAuthValue30}/""`);
  (PlatformApiAndAuthStyles4 = `display:inline-block;width:0;height:1.1em;vertical-align:text-bottom`);
  (PlatformApiAndAuthStyles5 = `position:absolute;top:-1.35em;padding:1px 5px;border-radius:3px;font:500 11px/1.2 ui-sans-serif,system-ui;color:#fff;white-space:nowrap;user-select:none;pointer-events:none`);
  (platformApiAndAuthValue4000 = 4e3);
  (resolvePlatformApiAndAuthValue31 = (
    platformApiAndAuthValue31?: Dynamic,
    options?: Dynamic,
    context: Dynamic = ``,
    ..._extraArguments: unknown[]
  ) =>
    `${platformApiAndAuthValue31}{${context}opacity:0;transition:opacity .12s;animation:ldoc-caret-flash ${platformApiAndAuthValue4000 / 1e3}s ease-out}${options}{opacity:1}`);
  (PlatformApiAndAuthColor2 = `.ProseMirror-yjs-cursor{position:relative;${PlatformApiAndAuthStyles4};margin:0 -1px;border-left:2px solid;border-color:inherit;word-break:normal;pointer-events:auto}.ProseMirror-yjs-cursor::after{content:"";position:absolute;top:0;left:-7px;width:12px;height:100%;cursor:text;z-index:-1}` +
    resolvePlatformApiAndAuthValue31(
      `.ProseMirror-yjs-cursor>div`,
      `.ProseMirror-yjs-cursor:hover>div`,
      `${PlatformApiAndAuthStyles5};left:-2px;`,
    ) +
    `@keyframes ldoc-caret-flash{0%,80%{opacity:1}100%{opacity:0}}.${PlatformApiAndAuthLdocCaretFlagFlip}>div,.${PlatformApiAndAuthLdocCaretFlagFlip}>.op-peer-caret-label{transform:translateX(calc(2px - 100%))}.ProseMirror-yjs-selection{pointer-events:none}.ldoc-agent-word{position:relative;animation:ldoc-agent-word 160ms ease-out both}@keyframes ldoc-agent-word{from{color:transparent;text-decoration-color:transparent}}.ldoc-agent-word :is(.misspelled,.proofread){animation:ldoc-agent-word-line 160ms ease-out both;animation-delay:var(--sweep-delay,0ms)}@keyframes ldoc-agent-word-line{from{text-decoration-color:transparent}}.ldoc-agent-word::after{content:"";${PlatformApiAndAuthStyles4};margin-right:-2px;border-right:2px solid ${PlatformApiAndAuthColor.color};opacity:0;animation:ldoc-agent-word-caret var(--sweep-step,160ms) linear;animation-delay:var(--sweep-delay,0ms)}.ldoc-agent-word::before{${resolvePlatformApiAndAuthValue30(`"${PlatformApiAndAuthColor.name.replace(/[\\"]/g, `\\$&`)}"`)};${PlatformApiAndAuthStyles5};left:100%;margin-left:-2px;background:${PlatformApiAndAuthColor.color};opacity:0;animation:ldoc-agent-word-caret var(--sweep-step,160ms) linear;animation-delay:var(--sweep-delay,0ms)}@keyframes ldoc-agent-word-caret{0%,100%{opacity:1}}.ldoc-agent-block{animation:ldoc-agent-block var(--sweep-dur,160ms) ease-out both}.ldoc-agent-atom{animation:ldoc-agent-block 160ms ease-out both}:is(.ldoc-agent-block,.ldoc-agent-atom).ldoc-agent-alt{animation-name:ldoc-agent-block-alt}@keyframes ldoc-agent-block{from{opacity:0}}@keyframes ldoc-agent-block-alt{from{opacity:0}}tr.ldoc-agent-block>:is(td,th){animation:ldoc-agent-cell var(--sweep-dur,160ms) ease-out both;animation-delay:var(--sweep-delay,0ms)}tr.ldoc-agent-block.ldoc-agent-alt>:is(td,th){animation-name:ldoc-agent-cell-alt}@keyframes ldoc-agent-cell{from{border-color:transparent}}@keyframes ldoc-agent-cell-alt{from{border-color:transparent}}:is(td,th).ldoc-agent-block{animation-name:ldoc-agent-owncell}:is(td,th).ldoc-agent-block.ldoc-agent-alt{animation-name:ldoc-agent-owncell-alt}@keyframes ldoc-agent-owncell{from{opacity:0;border-color:transparent}}@keyframes ldoc-agent-owncell-alt{from{opacity:0;border-color:transparent}}.ldoc-agent-caret-arriving{animation:ldoc-agent-arrive var(--sweep-end,0ms) step-end both}@keyframes ldoc-agent-arrive{from{opacity:0}to{opacity:1}}.${PlatformApiAndAuthLdocAgentCaretParked}{animation:ldoc-agent-caret-blink 1.06s step-end infinite}.${PlatformApiAndAuthLdocAgentCaretParked}>div{opacity:1;animation:none}@keyframes ldoc-agent-caret-blink{50%{border-color:transparent}}@media (prefers-reduced-motion:reduce){.${PlatformApiAndAuthLdocAgentCaretParked}{animation:none}}`);
  (PlatformApiAndAuthState10 = `.ProseMirror .op-peer-cell,.ProseMirror .op-peer-block{position:relative}.ProseMirror .op-peer-cell[data-op-peer-name]::before,.ProseMirror .op-peer-block[data-op-peer-name]::before{${resolvePlatformApiAndAuthValue30(`attr(data-op-peer-name)`)};${PlatformApiAndAuthStyles5};top:auto;bottom:100%;right:-1px;background:var(--op-peer,#888);z-index:3}`);
  (PlatformApiAndAuthState11 = `.ProseMirror .op-peer-caret{cursor:text}.ProseMirror .op-peer-caret-label::before{${resolvePlatformApiAndAuthValue30(`attr(data-op-peer-name)`)}}` +
    resolvePlatformApiAndAuthValue31(
      `.ProseMirror .op-peer-caret-label`,
      `.ProseMirror .op-peer-caret:hover>.op-peer-caret-label,.ProseMirror .op-peer-selection:hover+.op-peer-caret>.op-peer-caret-label,.ProseMirror .op-peer-selection:hover+.op-peer-flag>.op-peer-caret-label`,
    ) +
    `.ProseMirror [data-ldoc-pending]>.op-peer-caret[data-agent]>.op-peer-caret-label{opacity:1;animation:none}` +
    resolvePlatformApiAndAuthValue31(
      `.ProseMirror .op-peer-cell[data-op-peer-name]::before,.ProseMirror .op-peer-block[data-op-peer-name]::before`,
      `.ProseMirror .op-peer-cell[data-op-peer-name]:hover::before,.ProseMirror .op-peer-block[data-op-peer-name]:hover::before`,
    ));
  (resolvePlatformApiAndAuthValue32 = (
    platformApiAndAuthValue32?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `presence:${platformApiAndAuthValue32}@${options}`);
  (resolvePlatformApiAndAuthValue33 = (
    platformApiAndAuthValue33?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `state:${platformApiAndAuthValue33}/${options}`);
  (resolvePlatformApiAndAuthValue34 = (
    platformApiAndAuthValue34?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `ldoc:${platformApiAndAuthValue34}/${options}`);
  (resolvePlatformApiAndAuthValue35 = (
    platformApiAndAuthValue35?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${resolvePlatformApiAndAuthValue36(platformApiAndAuthValue35)}${options}`);
  (resolvePlatformApiAndAuthValue36 = (
    platformApiAndAuthValue36?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `lfile:${platformApiAndAuthValue36}/`);
  lazyZod
    .enum(dataEnumsAndValidationAllowDenyValues)
    .describe(
      `Binary verdict. No third state: staging/propose is a shape of request, not a verdict.`,
    );
  lazyZod
    .enum(dataEnumsAndValidationHumanInternalExternalValues)
    .describe(
      `Which trust domain acted for the principal: human = the person themselves; internal = the product's own first-party machinery (via assistant|executor|host); external = a third-party surface with their delegation (via mcp).`,
    );
  (platformApiAndAuthDescribeSchema = lazyZod
    .enum(dataEnumsAndValidationAssistantExecutorHostValues)
    .describe(`Which first-party machinery acted — assistant | executor | host.`));
  (platformApiAndAuthDescribeSchema2 = lazyZod
    .enum(dataEnumsAndValidationMcpValues)
    .describe(`Which external surface acted — mcp.`));
  (resolvePlatformApiAndAuthPrincipal = (
    platformApiAndAuthPrincipal?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof platformApiAndAuthPrincipal != `object` ||
      !platformApiAndAuthPrincipal ||
      Array.isArray(platformApiAndAuthPrincipal)
    )
      return platformApiAndAuthPrincipal;
    let platformApiAndAuthPrincipal2: Dynamic = platformApiAndAuthPrincipal;
    return platformApiAndAuthPrincipal2.channel === `human` ||
      platformApiAndAuthPrincipal2.via !== undefined
      ? platformApiAndAuthPrincipal
      : platformApiAndAuthPrincipal2.channel === `host`
        ? {
            principal: platformApiAndAuthPrincipal2.principal,
            channel: `internal`,
            via: `host`,
          }
        : platformApiAndAuthPrincipal2.channel === `agent` ||
            platformApiAndAuthPrincipal2.channel === `external`
          ? platformApiAndAuthPrincipal2.principal ===
            `executor@runs.bongo.internal`
            ? {
                principal: platformApiAndAuthPrincipal2.principal,
                channel: `internal`,
                via: `executor`,
              }
            : {
                principal: platformApiAndAuthPrincipal2.principal,
                channel: `external`,
                via: `mcp`,
              }
          : platformApiAndAuthPrincipal;
  });
  (PlatformApiAndAuthPrincipal = lazyZod.discriminatedUnion(
    `channel`,
    [
      lazyZod.strictObject({
        principal: dataContentAndReferencesDescribeSchema2,
        channel: lazyZod.literal(`human`),
      }),
      lazyZod.strictObject({
        principal: dataContentAndReferencesDescribeSchema2,
        channel: lazyZod.literal(`internal`),
        via: platformApiAndAuthDescribeSchema,
      }),
      lazyZod.strictObject({
        principal: dataContentAndReferencesDescribeSchema2,
        channel: lazyZod.literal(`external`),
        via: platformApiAndAuthDescribeSchema2,
      }),
    ],
  ));
  (platformApiAndAuthDescribeSchema3 = lazyZod
    .preprocess(resolvePlatformApiAndAuthPrincipal, PlatformApiAndAuthPrincipal)
    .describe(
      `Who acted = principal × channel (× via for machinery). The channel varies per action; the principal never does. ROOM-STAMPED from the authenticated request context — never read from the wire.`,
    ));
  (resolvePlatformApiAndAuthHuman = (
    platformApiAndAuthHuman?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformApiAndAuthHuman.channel === `human`
      ? undefined
      : platformApiAndAuthHuman.via);
  (resolvePlatformApiAndAuthHuman2 = (
    platformApiAndAuthHuman2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthHuman2.channel === `human`);
  (resolvePlatformApiAndAuthInternal = (
    platformApiAndAuthInternal?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthInternal === `internal`);
  (resolvePlatformApiAndAuthExternal = (
    platformApiAndAuthExternal?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthExternal === `external`);
  (resolvePlatformApiAndAuthHuman3 = (
    platformApiAndAuthHuman3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthHuman3 === `human`);
  (resolvePlatformApiAndAuthPrincipal2 = (
    actor?: Dynamic,
    actor2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    actor.principal === actor2.principal &&
    actor.channel === actor2.channel &&
    resolvePlatformApiAndAuthHuman(actor) ===
      resolvePlatformApiAndAuthHuman(actor2));
  (resolvePlatformApiAndAuthAssistant = (
    platformApiAndAuthAssistant?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformApiAndAuthHuman(platformApiAndAuthAssistant) === `mcp` ||
    resolvePlatformApiAndAuthHuman(platformApiAndAuthAssistant) === `assistant`);
  (resolvePlatformApiAndAuthAssistant2 = (
    platformApiAndAuthAssistant2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformApiAndAuthHuman(platformApiAndAuthAssistant2) ===
      `assistant` ||
    resolvePlatformApiAndAuthHuman(platformApiAndAuthAssistant2) === `host`);
  (resolvePlatformApiAndAuthSafeParse = (
    platformApiAndAuthSafeParse?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let safeParse: Dynamic = platformApiAndAuthDescribeSchema3.safeParse(
      platformApiAndAuthSafeParse,
    );
    return safeParse.success ? safeParse.data : undefined;
  });
  (PlatformApiAndAuthLabel = {
    id: `claude`,
    label: `Agent`,
  });
  (PlatformApiAndAuthBongoPeoplePicked = `bongo.people.picked`);
  (PlatformApiAndAuthBongoPeopleSeenV2 = `bongo.people.seen.v2`);
  (PlatformApiAndAuthBongoPeopleLru = `bongo.people.lru`);
  (platformApiAndAuthValue502 = 50);
  (platformApiAndAuthValue200 = 200);
  (platformApiAndAuthValue150 = 150);
  (resolvePlatformApiAndAuthSplit2 = (
    platformApiAndAuthSplit2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformApiAndAuthSplit2.split(`@`)[0]);
  (resolvePlatformApiAndAuthLabel = (
    contributor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: contributor.email,
    label: contributor.name,
    email: contributor.email,
    handle: resolvePlatformApiAndAuthSplit2(contributor.email),
    photoUrl: contributor.photoUrl,
    dir: contributor.dir,
    ...(contributor.guest
      ? {
          guest: true,
        }
      : {}),
  }));
  (resolvePlatformApiAndAuthEmail = (
    platformApiAndAuthEmail?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let contributor of platformApiAndAuthEmail as Dynamic)
      if (contributor.email && !contributor.handle) {
        contributor.handle = resolvePlatformApiAndAuthSplit2(contributor.email);
      }
    return platformApiAndAuthEmail;
  });
  (collectPlatformApiAndAuthDir = (
    collectPlatformApiAndAuthDir2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectPlatformApiAndAuthDir2.map(
      (
        { dir: dir, photoUrl: photoUrl, ...dir2 }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => dir2,
    ));
  (resolvePlatformApiAndAuthValue37 = (
    platformApiAndAuthValue37?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformApiAndAuthEmail(
      collectPlatformApiAndAuthDir(platformApiAndAuthValue37),
    ));
  (resolvePlatformApiAndAuthSetItem = (
    platformApiAndAuthSetItem?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      localStorage.setItem(
        platformApiAndAuthSetItem,
        JSON.stringify(collectPlatformApiAndAuthDir(options.slice(0, context))),
      );
    } catch {}
  });
  (resolvePlatformApiAndAuthGetItem2 = (
    platformApiAndAuthGetItem2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let item = localStorage.getItem(platformApiAndAuthGetItem2);
      if (!item) return [];
      let parse: Dynamic = JSON.parse(item);
      let platformApiAndAuthValue37: Dynamic =
        resolvePlatformApiAndAuthValue37(parse);
      if (
        parse.some(
          (parse2?: Dynamic, ..._extraArguments: unknown[]) =>
            parse2.photoUrl !== undefined,
        )
      ) {
        resolvePlatformApiAndAuthSetItem(
          platformApiAndAuthGetItem2,
          platformApiAndAuthValue37,
          options,
        );
      }
      return platformApiAndAuthValue37;
    } catch {
      return [];
    }
  });
  (isPlatformApiAndAuthToLowerCase = (
    platformApiAndAuth?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !platformApiAndAuth || !options
      ? false
      : platformApiAndAuth.trim().toLowerCase() !==
        options.split(`@`)[0].toLowerCase());
  (getPlatformApiAndAuthPicked = (
    platformApiAndAuthPicked?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)(
      options.map(
        (contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          contributor.email.toLowerCase(),
          contributor,
        ],
      ),
    );
    let changed = false;
    return {
      picked: platformApiAndAuthPicked.map(
        (contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let lookupEntry: Dynamic = contributor.email
            ? lookup.get(contributor.email.toLowerCase())
            : undefined;
          if (!lookupEntry) return contributor;
          let label: Dynamic =
            isPlatformApiAndAuthToLowerCase(
              lookupEntry.name,
              lookupEntry.email,
            ) ||
            !isPlatformApiAndAuthToLowerCase(contributor.label, lookupEntry.email)
              ? lookupEntry.name
              : contributor.label;
          let photoUrl: Dynamic = lookupEntry.photoUrl ?? contributor.photoUrl;
          if (
            label === contributor.label &&
            photoUrl === contributor.photoUrl &&
            contributor.guest === lookupEntry.guest
          )
            return contributor;
          changed = true;
          let { guest: contributor2, ...contributor3 }: Dynamic = contributor;
          return {
            ...contributor3,
            label: label,
            ...(photoUrl === undefined
              ? {}
              : {
                  photoUrl: photoUrl,
                }),
            ...(lookupEntry.guest
              ? {
                  guest: true,
                }
              : {}),
          };
        },
      ),
      changed: changed,
    };
  });
  (resolvePlatformApiAndAuthPush2 = (
    platformApiAndAuthPush2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    for (let resolvePlatformApiAndAuthPush2Result of platformApiAndAuthPush2 as Dynamic)
      for (let resolvePlatformApiAndAuthPush2Result2 of resolvePlatformApiAndAuthPush2Result as Dynamic)
        if (!uniqueItems.has(resolvePlatformApiAndAuthPush2Result2.id)) {
          uniqueItems.add(resolvePlatformApiAndAuthPush2Result2.id);
          items.push(resolvePlatformApiAndAuthPush2Result2);
        }
    return items;
  });
  (updatePlatformApiAndAuthLabel = (
    updatePlatformApiAndAuthLabel2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let updatePlatformApiAndAuthLabelResult of options as Dynamic)
      lookup.set(
        updatePlatformApiAndAuthLabelResult.id,
        updatePlatformApiAndAuthLabelResult,
      );
    return resolvePlatformApiAndAuthPush2([
      updatePlatformApiAndAuthLabel2.map(
        (contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let lookupEntry: Dynamic = lookup.get(contributor.id);
          if (!lookupEntry) return contributor;
          let photoUrl: Dynamic = contributor.photoUrl ?? lookupEntry.photoUrl;
          let record2: Dynamic =
            !isPlatformApiAndAuthToLowerCase(
              contributor.label,
              contributor.email,
            ) &&
            isPlatformApiAndAuthToLowerCase(lookupEntry.label, lookupEntry.email)
              ? {
                  ...contributor,
                  label: lookupEntry.label,
                  dir: contributor.dir ?? lookupEntry.dir,
                }
              : {
                  ...contributor,
                };
          if (photoUrl !== undefined) {
            record2.photoUrl = photoUrl;
          }
          return record2;
        },
      ),
      [...options],
    ]).slice(0, platformApiAndAuthValue200);
  });
  (platformApiAndAuthValue09 = 0);
  (resolvePlatformApiAndAuthValue38 = (
    page?: Dynamic,
    page2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => page?.pid === page2?.pid && page?.container === page2?.container);
  (platformApiAndAuthMap7 = new (Map as Dynamic)());
  (resolvePlatformApiAndAuthPriming = (
    platformApiAndAuthPriming?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformApiAndAuthPriming({
      priming: platformApiAndAuthMap7.size > 0,
    }));
  (platformApiAndAuthValue60000 = 6e4);
  (platformApiAndAuthValue600000 = 6e5);
  (platformApiAndAuthValue6000002 = 6e5);
  (platformApiAndAuthMap8 = new (Map as Dynamic)());
  (platformApiAndAuthMap9 = new (Map as Dynamic)());
  (clearPlatformApiAndAuthDelete4 = (
    clearPlatformApiAndAuthDelete42?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let platformApiAndAuthMap8Entry: Dynamic = platformApiAndAuthMap8.get(
      clearPlatformApiAndAuthDelete42,
    );
    return platformApiAndAuthMap8Entry === undefined
      ? false
      : Date.now() < platformApiAndAuthMap8Entry
        ? true
        : (platformApiAndAuthMap8.delete(clearPlatformApiAndAuthDelete42), false);
  });
  (isPlatformApiAndAuthDelete = (
    platformApiAndAuthDelete?: Dynamic,
    options?: Dynamic,
    context: Dynamic = false,
    ..._extraArguments: unknown[]
  ) => {
    if (!options) {
      platformApiAndAuthMap9.delete(platformApiAndAuthDelete);
      platformApiAndAuthMap8.set(
        platformApiAndAuthDelete,
        context ? Date.now() + platformApiAndAuthValue6000002 : 1 / 0,
      );
      return true;
    }
    let platformApiAndAuthMap8Entry: Dynamic =
      platformApiAndAuthMap8.get(platformApiAndAuthDelete) ?? 0;
    if (
      platformApiAndAuthMap8Entry === 1 / 0 ||
      platformApiAndAuthMap8Entry > Date.now()
    )
      return false;
    let total: Dynamic =
      (platformApiAndAuthMap9.get(platformApiAndAuthDelete) ?? 0) + 1;
    platformApiAndAuthMap9.set(platformApiAndAuthDelete, total);
    platformApiAndAuthMap8.set(
      platformApiAndAuthDelete,
      Date.now() +
        Math.min(
          platformApiAndAuthValue60000 * 2 ** (total - 1),
          platformApiAndAuthValue600000,
        ),
    );
    return true;
  });
  (platformApiAndAuthValue8000 = 8e3);
  (resolvePlatformApiAndAuthPrimeTimeout = (
    platformApiAndAuthPrimeTimeout?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Promise.race([
      platformApiAndAuthPrimeTimeout,
      new (Promise as Dynamic)(
        (resolve?: unknown, reject?: Dynamic, ..._extraArguments: unknown[]) =>
          setTimeout(
            (..._extraArguments: unknown[]): Dynamic =>
              reject(Error(`prime timeout`)),
            options,
          ),
      ),
    ]));
  (resolvePlatformApiAndAuthReplace = (
    platformApiAndAuthReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformApiAndAuthReplace.toLowerCase().replace(/['"‘’“”]/g, ``));
  (filterPlatformApiAndAuthLabel = (
    contributor?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformApiAndAuthReplace: Dynamic = resolvePlatformApiAndAuthReplace(
      contributor.label,
    );
    let platformApiAndAuthReplace2: Dynamic = contributor.email
      ? resolvePlatformApiAndAuthReplace(contributor.email)
      : ``;
    let filteredPlatformApiAndAuthReplaceParts: Dynamic =
      resolvePlatformApiAndAuthReplace(options)
        .split(/[\s-]+/)
        .filter(Boolean);
    return (
      filteredPlatformApiAndAuthReplaceParts.length > 0 &&
      filteredPlatformApiAndAuthReplaceParts.every(
        (
          filteredPlatformApiAndAuthReplacePart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformApiAndAuthReplace.includes(
            filteredPlatformApiAndAuthReplacePart,
          ) ||
          platformApiAndAuthReplace2.includes(
            filteredPlatformApiAndAuthReplacePart,
          ),
      )
    );
  });
  (platformApiAndAuthValue_12 = false);
  (PlatformApiAndAuthState12 = [4e3, 15e3, 6e4]);
  (platformApiAndAuthValue010 = 0);
  (platformApiAndAuthSet20 = new (Set as Dynamic)());
  (platformApiAndAuthMap10 = new (Map as Dynamic)());
  (installPlatformApiAndAuthLoad = (
    installPlatformApiAndAuthLoad2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)(
      (
        resolve?: Dynamic,
        reject?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let fileReader = new FileReader();
        fileReader.addEventListener(
          `load`,
          (..._extraArguments: unknown[]): Dynamic => resolve(fileReader.result),
        );
        fileReader.addEventListener(
          `error`,
          (..._extraArguments: unknown[]): Dynamic =>
            reject(fileReader.error ?? Error(`FileReader`)),
        );
        fileReader.readAsDataURL(installPlatformApiAndAuthLoad2);
      },
    ));
}

export {
  PlatformApiAndAuthBongoPeoplePicked,
  PlatformApiAndAuthBongoPeopleSeenV2,
  PlatformApiAndAuthCodeModal,
  PlatformApiAndAuthColor,
  PlatformApiAndAuthColor2,
  PlatformApiAndAuthDataClaudeLive,
  PlatformApiAndAuthFEEDTOPIC,
  PlatformApiAndAuthLabel,
  PlatformApiAndAuthLdocAgentSweeping,
  PlatformApiAndAuthState10,
  PlatformApiAndAuthState11,
  _wireRevBump,
  ackFlushed,
  announce,
  anyDirtySync,
  clearPlatformApiAndAuthDelete4,
  createDraftLayer,
  discardUnder,
  dropEntry,
  ensureSettled,
  ensureStarted,
  filterPlatformApiAndAuthLabel,
  flushSnapshot,
  forgetEntry,
  getBytesSync,
  getPlatformApiAndAuthPicked,
  hasEntrySync,
  installPlatformApiAndAuthLoad,
  ironLoadDebug,
  ironLoadOffThread,
  isDeletedSync,
  isPlatformApiAndAuthDelete,
  listEntriesSync,
  listLiveSync,
  markFlushDead,
  moveEntry,
  moveUnder,
  parkConflict,
  persistOpenEdit,
  platformApiAndAuthMap10,
  platformApiAndAuthMap7,
  platformApiAndAuthMap8,
  platformApiAndAuthSet20,
  platformApiAndAuthState16,
  platformApiAndAuthValue09,
  platformApiAndAuthValue150,
  platformApiAndAuthValue200,
  platformApiAndAuthValue502,
  platformApiAndAuthValue60000,
  platformApiAndAuthValue8000,
  purgeIfFlushAcked,
  readValidated,
  recalcOffThread,
  referenceError,
  reportPresence,
  resolvePlatformApiAndAuthAntspace,
  resolvePlatformApiAndAuthAssistant,
  resolvePlatformApiAndAuthAssistant2,
  resolvePlatformApiAndAuthContainer2,
  resolvePlatformApiAndAuthExternal,
  resolvePlatformApiAndAuthHuman,
  resolvePlatformApiAndAuthHuman2,
  resolvePlatformApiAndAuthHuman3,
  resolvePlatformApiAndAuthInternal,
  resolvePlatformApiAndAuthInvalidChar,
  resolvePlatformApiAndAuthLabel,
  resolvePlatformApiAndAuthMatchAll,
  resolvePlatformApiAndAuthPhotoUrl,
  resolvePlatformApiAndAuthPicked,
  resolvePlatformApiAndAuthPrimeTimeout,
  resolvePlatformApiAndAuthPriming,
  resolvePlatformApiAndAuthPrincipal2,
  resolvePlatformApiAndAuthPush2,
  resolvePlatformApiAndAuthRawModel,
  resolvePlatformApiAndAuthRest2,
  resolvePlatformApiAndAuthSafeParse,
  resolvePlatformApiAndAuthSetItem,
  resolvePlatformApiAndAuthSplit2,
  resolvePlatformApiAndAuthTest,
  resolvePlatformApiAndAuthValue28,
  resolvePlatformApiAndAuthValue30,
  resolvePlatformApiAndAuthValue32,
  resolvePlatformApiAndAuthValue33,
  resolvePlatformApiAndAuthValue34,
  resolvePlatformApiAndAuthValue35,
  stashBytes,
  subscribeProjectFeed,
  toastManualCalc,
  unloadAfterAck,
  updatePlatformApiAndAuthLabel,
};

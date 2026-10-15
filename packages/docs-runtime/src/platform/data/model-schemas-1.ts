/** BaoCut: data model schemas from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  create,
  preloadModule,
} from "../dependencies";
import {
  resolveDataContentAndReferencesError2,
} from "./content-and-references";
import {
  UiToastsTOASTHARDMAXMS,
} from "../ui/toasts";
import {
  PlatformApiAndAuthEmitAction,
} from "../services/api-and-auth-1";
import {
  loadPlatformApiAndAuthMethod2,
  loadPlatformApiAndAuthValue2,
  resolvePlatformApiAndAuthValue14,
} from "../services/api-and-auth-2";
import {
  resolvePlatformApiAndAuthResolve,
  resolvePlatformApiAndAuthValue18,
} from "../services/api-and-auth-3";
import {
  TOMBSTONE,
  isTombstone,
} from "../services/api-and-auth-4";
import {
  _wireRevBump,
  ackFlushed,
  announce,
  anyDirtySync,
  discardUnder,
  dropEntry,
  ensureSettled,
  flushSnapshot,
  forgetEntry,
  hasEntrySync,
  ironLoadDebug,
  ironLoadOffThread,
  listEntriesSync,
  markFlushDead,
  moveEntry,
  moveUnder,
  parkConflict,
  persistOpenEdit,
  purgeIfFlushAcked,
  recalcOffThread,
  resolvePlatformApiAndAuthInvalidChar,
  resolvePlatformApiAndAuthRawModel,
  resolvePlatformApiAndAuthRest2,
  resolvePlatformApiAndAuthValue28,
  stashBytes,
  toastManualCalc,
  unloadAfterAck,
} from "../services/api-and-auth-5";
import {
  _byName,
  _clearOutgoingDeps,
  _dependents,
  _iterativeCount,
  _noteDep,
  _rekeyDeps,
  _resolveExternal,
  _slowPaths,
  isPlatformApiAndAuthSha,
  listRawDirty,
  platformApiAndAuthMap11,
  platformApiAndAuthMap12,
  platformApiAndAuthMap13,
  platformApiAndAuthValue300002,
  resolvePlatformApiAndAuthRawModel2,
  resolvePlatformApiAndAuthSlice2,
  resolvePlatformApiAndAuthSplit3,
  treeListingExempt,
} from "../services/api-and-auth-6";
import {
  _recalcLinked,
} from "../services/api-and-auth-7";
import {
  DataModelSchemasParseLineParam,
  updateDataModelSchemasUndo,
} from "./model-schemas-2";

var platformApiAndAuthValue_13: Dynamic;

var useWorkbookStore: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas1Step1(): void {
  (platformApiAndAuthValue_13 = false);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas1Step2(): void {
  (useWorkbookStore = create(
    (
      workbookStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let find: Dynamic = (
        workbookStore4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        Object.entries(options().byPath).find(
          ([, byPathEntry]: Dynamic, ..._extraArguments: unknown[]) =>
            byPathEntry.wb === workbookStore4,
        );
      let record2: Dynamic = {};
      let index = 0;
      let enabled = false;
      let enabled2 = false;
      let workbookStore2 = (..._extraArguments: unknown[]): undefined => {
        if (index > 0) {
          enabled = true;
          return;
        }
        workbookStore(
          (workbookStore4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            rev: workbookStore4.rev + 1,
          }),
        );
      };
      _wireRevBump(workbookStore2);
      let onData = (..._extraArguments: unknown[]): undefined => {
        if (index > 0) {
          enabled2 = true;
          return;
        }
        workbookStore(
          (workbookStore4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            dataRev: workbookStore4.dataRev + 1,
          }),
        );
      };
      let enabled3 = false;
      let workbookStore3: Dynamic = (
        workbookStore4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        workbookStore(
          (workbookStore5?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let byPathItem: Dynamic = workbookStore5.byPath[workbookStore4];
            return byPathItem
              ? {
                  byPath: {
                    ...workbookStore5.byPath,
                    [workbookStore4]: {
                      ...byPathItem,
                      roomRev: byPathItem.roomRev + 1,
                    },
                  },
                }
              : workbookStore5;
          },
        );
      let useWorkbookStoreHandler: Dynamic = (
        workbookStore4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        onRemote: (..._extraArguments: unknown[]): Dynamic =>
          workbookStore3(workbookStore4),
        onData: onData,
        onState: (roomState?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let byPathItem: Dynamic = workbookStore5.byPath[workbookStore4];
              return byPathItem
                ? {
                    byPath: {
                      ...workbookStore5.byPath,
                      [workbookStore4]: {
                        ...byPathItem,
                        roomState: roomState,
                      },
                    },
                  }
                : workbookStore5;
            },
          ),
        onIronOp: (ironOp?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let byPathItem: Dynamic = workbookStore5.byPath[workbookStore4];
              return byPathItem
                ? {
                    byPath: {
                      ...workbookStore5.byPath,
                      [workbookStore4]: {
                        ...byPathItem,
                        ironOp: ironOp,
                      },
                    },
                  }
                : workbookStore5;
            },
          ),
        onMismatch: (
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (items.length) {
            platformApiAndAuthMap11.set(workbookStore4, items);
          }
          _slowPaths.delete(workbookStore4);
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let { [workbookStore4]: byPath, ...byPath2 }: Dynamic =
                workbookStore5.byPath;
              return {
                byPath: byPath2,
              };
            },
          );
          options().load(workbookStore4);
        },
      });
      let bump = (
        workbookStore4?: Dynamic,
        options2: Dynamic = true,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (enabled3) return;
        let entry: Dynamic = find(workbookStore4);
        if (entry && options2 && !_slowPaths.has(entry[0])) {
          if (ironLoadDebug) {
            console.info(`[ironLoad] bump→_recalcLinked in-host: ${entry[0]}`);
          }
          enabled3 = true;
          try {
            _recalcLinked(
              entry[0],
              (
                workbookStore5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => options().byPath[workbookStore5]?.wb,
            );
          } finally {
            enabled3 = false;
          }
        }
        if (entry?.[1].room) {
          workbookStore3(entry[0]);
          onData();
          return;
        }
        workbookStore2();
        if (!options2 || !entry) return;
        let [, setEntry]: Dynamic = entry;
        if (setEntry.saveTimer) {
          clearTimeout(setEntry.saveTimer);
        }
        setEntry.dirty = true;
        announce([entry[0]]);
      };
      let close = (
        workbookStore4?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let byPathItem: Dynamic = options().byPath[workbookStore4];
        if (byPathItem) {
          if (byPathItem.saveTimer) {
            clearTimeout(byPathItem.saveTimer);
          }
          if (byPathItem.serializeTimer) {
            clearTimeout(byPathItem.serializeTimer);
          }
          byPathItem.room?.close();
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let { [workbookStore4]: byPath, ...byPath2 }: Dynamic =
                workbookStore5.byPath;
              return {
                byPath: byPath2,
                rev: workbookStore5.rev + 1,
              };
            },
          );
        } else {
          workbookStore2();
        }
      };
      let slice = async (
        items?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let record3: Dynamic = {};
        let items2: Dynamic = [];
        let items3: Dynamic = [];
        for (let [path, useWorkbookStoreResult5] of Object.entries(
          options().byPath,
        ) as Dynamic) {
          if (!path.startsWith(items + `/`) || !useWorkbookStoreResult5.dirty)
            continue;
          if (useWorkbookStoreResult5.serializeTimer) {
            clearTimeout(useWorkbookStoreResult5.serializeTimer);
          }
          useWorkbookStoreResult5.serializeTimer = null;
          let pendingBytes: Dynamic =
            useWorkbookStoreResult5.pendingBytes ??
            (await useWorkbookStoreResult5.wb.toXlsx());
          useWorkbookStoreResult5.pendingBytes = null;
          record3[path.slice(items.length + 1)] = new Blob([pendingBytes]);
          items3.push({
            path: path,
            e: useWorkbookStoreResult5,
          });
        }
        let record4: Dynamic = {};
        for (let {
          path: useWorkbookStoreResult5,
          e: useWorkbookStoreResult6,
        } of items3 as Dynamic) {
          if (!useWorkbookStoreResult6) continue;
          let sha: Dynamic = useWorkbookStoreResult6.room?.sha();
          if (sha) {
            record4[useWorkbookStoreResult5.slice(items.length + 1)] = sha;
          }
        }
        let lookup2: Dynamic = new (Map as Dynamic)();
        for (let {
          path: path,
          bytes: useWorkbookStoreResult5,
          cas: useWorkbookStoreResult6,
        } of flushSnapshot(items) as Dynamic) {
          if (options().byPath[path]) continue;
          let pathSlice: Dynamic = path.slice(items.length + 1);
          lookup2.set(path, useWorkbookStoreResult5);
          if (isTombstone(useWorkbookStoreResult5)) {
            items2.push(pathSlice);
          } else {
            record3[pathSlice] = new Blob([useWorkbookStoreResult5]);
            items3.push({
              path: path,
            });
            record4[pathSlice] = useWorkbookStoreResult6;
          }
        }
        if (Object.keys(record3).length === 0 && items2.length === 0) return;
        let useWorkbookStoreResult: Dynamic;
        try {
          useWorkbookStoreResult = await loadPlatformApiAndAuthMethod2(
            items,
            record3,
            items2,
            record4,
          );
        } catch (useWorkbookStoreResult5: Dynamic) {
          markFlushDead();
          console.warn(
            `[save] bulk flush failed (legacy endpoint removed):`,
            resolveDataContentAndReferencesError2(useWorkbookStoreResult5),
          );
          return;
        }
        let {
          mtimes: useWorkbookStoreResult2,
          shas: useWorkbookStoreResult3,
          conflicts: useWorkbookStoreResult4,
        }: Dynamic = useWorkbookStoreResult;
        let uniqueItems: Dynamic = new (Set as Dynamic)(
          (useWorkbookStoreResult4 ?? []).map(
            (useWorkbookStoreResult5?: Dynamic, ..._extraArguments: unknown[]) =>
              `${items}/${useWorkbookStoreResult5}`,
          ),
        );
        for (let useWorkbookStoreResult5 of uniqueItems as Dynamic) {
          console.warn(`[save] CAS conflict, parked as draft conflict`);
          parkConflict(useWorkbookStoreResult5, null);
        }
        for (let {
          path: useWorkbookStoreResult5,
          e: useWorkbookStoreResult6,
        } of items3 as Dynamic) {
          if (uniqueItems.has(useWorkbookStoreResult5)) continue;
          let useWorkbookStoreResultSlice: Dynamic =
            useWorkbookStoreResult5.slice(items.length + 1);
          let useWorkbookStoreResultItem: Dynamic =
            useWorkbookStoreResult2?.[useWorkbookStoreResultSlice];
          if (useWorkbookStoreResultItem) {
            record2[useWorkbookStoreResult5] = useWorkbookStoreResultItem;
          }
          if (useWorkbookStoreResult6) {
            useWorkbookStoreResult6.dirty = false;
            unloadAfterAck(useWorkbookStoreResult5);
          } else {
            ackFlushed(
              useWorkbookStoreResult5,
              lookup2.get(useWorkbookStoreResult5),
              useWorkbookStoreResult3?.[useWorkbookStoreResultSlice] ?? null,
            );
          }
        }
        for (let useWorkbookStoreResult5 of items2 as Dynamic) {
          let label = `${items}/${useWorkbookStoreResult5}`;
          if (!uniqueItems.has(label)) {
            ackFlushed(label, TOMBSTONE, null);
          }
        }
        announce(
          items3
            .filter(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                item.e && !uniqueItems.has(item.path),
            )
            .map(
              (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                filteredItem.path,
            ),
        );
        workbookStore(
          (workbookStore4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            rev: workbookStore4.rev + 1,
          }),
        );
      };
      let lookup: Dynamic = new (Map as Dynamic)();
      return {
        rev: 0,
        dataRev: 0,
        byPath: {},
        workbook: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => options().byPath[workbookStore4]?.wb,
        load: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let byPathItem: Dynamic = options().byPath[workbookStore4];
          if (byPathItem) return Promise.resolve(byPathItem.wb);
          let lookupEntry: Dynamic = lookup.get(workbookStore4);
          if (lookupEntry) return lookupEntry;
          let result: Dynamic = (async (
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            await ensureSettled(workbookStore4);
            resolvePlatformApiAndAuthResolve()
              .then(
                (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  Promise.all([result2.init(), result2.ensureXlsx()]),
              )
              .catch((..._extraArguments: unknown[]): undefined => {});
            let {
              buf: platformApiAndAuthValue14,
              sha: platformApiAndAuthValue142,
            }: Dynamic = await resolvePlatformApiAndAuthValue14(workbookStore4);
            let { bytes: recalcOffThread2, slow: recalcOffThread3 }: Dynamic =
              await recalcOffThread(
                workbookStore4,
                new Uint8Array(platformApiAndAuthValue14),
              );
            console.info(`[ironLoad] host fromXlsx start: ${workbookStore4}`);
            let fromXlsx: Dynamic = await (
              await resolvePlatformApiAndAuthResolve()
            ).Workbook.fromXlsx(recalcOffThread2, workbookStore4);
            console.info(
              `[ironLoad] host fromXlsx ok (slow=${recalcOffThread3}): ${workbookStore4}`,
            );
            fromXlsx.rawModel.pauseEvaluation();
            resolvePlatformApiAndAuthRawModel2(fromXlsx);
            if (recalcOffThread3) {
              _slowPaths.add(workbookStore4);
              toastManualCalc(
                workbookStore4,
                (..._extraArguments: unknown[]): undefined => {
                  let entry: Dynamic = find(fromXlsx);
                  if (entry) {
                    _slowPaths.delete(entry[0]);
                    fromXlsx.rawModel.resumeEvaluation();
                    fromXlsx.recalc();
                    workbookStore2();
                  }
                },
              );
            }
            updateDataModelSchemasUndo(fromXlsx, {
              find: find,
              bump: bump,
              onEdit: (
                path?: Dynamic,
                options2?: Dynamic,
                context?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined =>
                void preloadModule(
                  (..._extraArguments: unknown[]): Dynamic =>
                    Promise.resolve()
                      .then(
                        (..._extraArguments: unknown[]): Dynamic =>
                          PlatformApiAndAuthEmitAction,
                      )
                      .then(
                        (
                          result2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          result2.emitDebounced(`edit:${path}`, 1e3, `ui:edit`, {
                            anchor: {
                              path: path,
                            },
                            params: {
                              op: options2,
                              args: context
                                .slice(0, 8)
                                .map(resolvePlatformApiAndAuthSlice2),
                            },
                          }),
                      ),
                  undefined,
                  import.meta.url,
                ).catch((..._extraArguments: unknown[]): undefined => {}),
            });
            let useContainerStoreState: Dynamic = (
              await preloadModule(
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let { useContainerStore: useContainerStore2 }: Dynamic =
                    await Promise.resolve().then(
                      (..._extraArguments: unknown[]): Dynamic =>
                        DataModelSchemasParseLineParam,
                    );
                  return {
                    useContainerStore: useContainerStore2,
                  };
                },
                undefined,
                import.meta.url,
              )
            ).useContainerStore.getState();
            let matchesState =
              useContainerStoreState.project?.state === `live` &&
              !useContainerStoreState.version;
            let role: Dynamic = useContainerStoreState.project?.role;
            let state: Dynamic = useContainerStoreState.project?.state;
            let enabled4 =
              (!(state === `shared` || state === `live`) && role === `viewer`) ||
              (role === null && state === `shared-view`);
            console.info(`[ironLoad] connectRoom: ${workbookStore4}`);
            let room: Dynamic = matchesState
              ? null
              : isPlatformApiAndAuthSha(
                  workbookStore4,
                  fromXlsx,
                  platformApiAndAuthValue142,
                  useWorkbookStoreHandler(workbookStore4),
                );
            console.info(`[ironLoad] set byPath: ${workbookStore4}`);
            workbookStore(
              (
                workbookStore5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                byPath: {
                  ...workbookStore5.byPath,
                  [workbookStore4]: {
                    wb: fromXlsx,
                    dirty: hasEntrySync(workbookStore4),
                    saveTimer: null,
                    serializeTimer: null,
                    pendingBytes: null,
                    room: room,
                    roomRev: 0,
                    roomState: room ? `connecting` : `closed`,
                    readonly: matchesState || enabled4,
                    ironOp: false,
                  },
                },
              }),
            );
            let platformApiAndAuthMap11Entry: Dynamic =
              platformApiAndAuthMap11.get(workbookStore4);
            if (platformApiAndAuthMap11Entry && room) {
              platformApiAndAuthMap11.delete(workbookStore4);
              for (let useWorkbookStoreResult of platformApiAndAuthMap11Entry as Dynamic)
                if (typeof useWorkbookStoreResult == `string`) {
                  room.sendControl(useWorkbookStoreResult);
                } else {
                  room.send(useWorkbookStoreResult);
                }
            }
            _byName.set(
              resolvePlatformApiAndAuthSplit3(workbookStore4),
              fromXlsx,
            );
            platformApiAndAuthValue_13 ||=
              (resolvePlatformApiAndAuthValue18().registerExternalWorkbookResolver(
                _resolveExternal,
              ),
              true);
            console.info(
              `[ironLoad] scanExternalBooks${recalcOffThread3 ? ` skipped (slow)` : ``}: ${workbookStore4}`,
            );
            let uniqueItems: Dynamic = recalcOffThread3
              ? new (Set as Dynamic)()
              : resolvePlatformApiAndAuthRawModel(fromXlsx);
            console.info(
              `[ironLoad] scanExternalBooks ok (${uniqueItems.size}): ${workbookStore4}`,
            );
            if (uniqueItems.size) {
              let { useContainerStore: preloadTImport2 }: Dynamic =
                await preloadModule(
                  async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                    let { useContainerStore: useContainerStore2 }: Dynamic =
                      await Promise.resolve().then(
                        (..._extraArguments: unknown[]): Dynamic =>
                          DataModelSchemasParseLineParam,
                      );
                    return {
                      useContainerStore: useContainerStore2,
                    };
                  },
                  undefined,
                  import.meta.url,
                );
              let activeDir: Dynamic = preloadTImport2.getState().activeDir();
              let items: Dynamic = [];
              for (let useWorkbookStoreResult of uniqueItems as Dynamic) {
                let platformApiAndAuthInvalidChar: Dynamic =
                  resolvePlatformApiAndAuthInvalidChar(
                    useWorkbookStoreResult,
                    workbookStore4,
                    activeDir,
                  );
                if (
                  !resolvePlatformApiAndAuthValue28(platformApiAndAuthInvalidChar)
                ) {
                  _noteDep(workbookStore4, platformApiAndAuthInvalidChar);
                  if (
                    !(
                      options().byPath[platformApiAndAuthInvalidChar] ||
                      lookup.has(platformApiAndAuthInvalidChar)
                    )
                  ) {
                    items.push(platformApiAndAuthInvalidChar);
                  }
                }
              }
              if (items.length) {
                await Promise.all(
                  items.map(
                    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      options()
                        .load(item)
                        .catch((..._extraArguments: unknown[]): undefined => {}),
                  ),
                );
              }
              if (ironLoadOffThread) {
                console.info(
                  `[ironLoad] _recalcLinked skipped (${uniqueItems.size} ext books): ${workbookStore4}`,
                );
              } else {
                _recalcLinked(
                  workbookStore4,
                  (
                    workbookStore5?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => options().byPath[workbookStore5]?.wb,
                );
              }
            }
            if (ironLoadOffThread) {
              console.info(
                `[ironLoad] in-host recalc skipped (worker did it): ${workbookStore4}`,
              );
            } else {
              fromXlsx.recalc();
            }
            if (!recalcOffThread3) {
              fromXlsx.rawModel.resumeEvaluation();
            }
            return fromXlsx;
          })().finally(
            (..._extraArguments: unknown[]): Dynamic =>
              lookup.delete(workbookStore4),
          );
          lookup.set(workbookStore4, result);
          return result;
        },
        loadDisk: async (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => {
          let platformApiAndAuthValue22: Dynamic =
            await loadPlatformApiAndAuthValue2(workbookStore4);
          let fromXlsx: Dynamic = await (
            await resolvePlatformApiAndAuthResolve()
          ).Workbook.fromXlsx(
            new Uint8Array(platformApiAndAuthValue22),
            workbookStore4,
          );
          resolvePlatformApiAndAuthRawModel2(fromXlsx);
          return fromXlsx;
        },
        get: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let wb2: Dynamic = options().byPath[workbookStore4]?.wb;
          return wb2 ? resolvePlatformApiAndAuthRest2(wb2, options2) : undefined;
        },
        resolver: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          self: options().byPath[workbookStore4].wb,
          external: (
            workbookStore5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let platformApiAndAuthInvalidChar: Dynamic =
              resolvePlatformApiAndAuthInvalidChar(
                workbookStore5,
                workbookStore4,
                options2,
              );
            return resolvePlatformApiAndAuthValue28(platformApiAndAuthInvalidChar)
              ? null
              : (_noteDep(workbookStore4, platformApiAndAuthInvalidChar),
                options().byPath[platformApiAndAuthInvalidChar]?.wb ?? null);
          },
        }),
        set: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let byPathItem: Dynamic = options().byPath[workbookStore4];
          if (!byPathItem) throw Error(`not loaded: ${workbookStore4}`);
          byPathItem.wb.set(options2, context);
          bump(byPathItem.wb);
        },
        flushDir: (workbookStore4?: Dynamic, ..._extraArguments: unknown[]) =>
          slice(workbookStore4),
        setViewing: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let platformApiAndAuthMap12Entry: Dynamic =
            platformApiAndAuthMap12.get(workbookStore4) ?? 0;
          let total: Dynamic = options2
            ? platformApiAndAuthMap12Entry + 1
            : Math.max(0, platformApiAndAuthMap12Entry - 1);
          if (total === 0) {
            platformApiAndAuthMap12.delete(workbookStore4);
          } else {
            platformApiAndAuthMap12.set(workbookStore4, total);
          }
          let platformApiAndAuthMap13Entry: Dynamic =
            platformApiAndAuthMap13.get(workbookStore4);
          if (platformApiAndAuthMap13Entry) {
            clearTimeout(platformApiAndAuthMap13Entry);
            platformApiAndAuthMap13.delete(workbookStore4);
          }
          let room: Dynamic = options().byPath[workbookStore4]?.room;
          if (room) {
            if (platformApiAndAuthMap12Entry === 0 && total > 0) {
              room.show();
            } else {
              if (platformApiAndAuthMap12Entry > 0 && total === 0) {
                room.hide();
                platformApiAndAuthMap13.set(
                  workbookStore4,
                  setTimeout((..._extraArguments: unknown[]): undefined => {
                    platformApiAndAuthMap13.delete(workbookStore4);
                    let byPathItem: Dynamic = options().byPath[workbookStore4];
                    if (
                      !(
                        !byPathItem?.room ||
                        byPathItem.dirty ||
                        (platformApiAndAuthMap12.get(workbookStore4) ?? 0) > 0 ||
                        (_dependents.get(workbookStore4)?.size ?? 0) > 0
                      )
                    ) {
                      options().invalidate(workbookStore4);
                    }
                  }, platformApiAndAuthValue300002),
                );
              }
            }
          }
        },
        invalidate: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let byPathItem: Dynamic = options().byPath[workbookStore4];
          if (!byPathItem || byPathItem.dirty) return;
          if (byPathItem.saveTimer) {
            clearTimeout(byPathItem.saveTimer);
          }
          if (byPathItem.serializeTimer) {
            clearTimeout(byPathItem.serializeTimer);
          }
          byPathItem.room?.close();
          let items: Dynamic = [...(_dependents.get(workbookStore4) ?? [])];
          _clearOutgoingDeps(workbookStore4);
          _byName.delete(resolvePlatformApiAndAuthSplit3(workbookStore4));
          _iterativeCount.delete(workbookStore4);
          _slowPaths.delete(workbookStore4);
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let { [workbookStore4]: byPath, ...byPath2 }: Dynamic =
                workbookStore5.byPath;
              return {
                byPath: byPath2,
                rev: workbookStore5.rev + 1,
              };
            },
          );
          if (items.length > 0) {
            (async (..._extraArguments: unknown[]): Promise<undefined> => {
              try {
                await options().load(workbookStore4);
              } catch {
                for (let useWorkbookStoreResult of items as Dynamic)
                  if (!_slowPaths.has(useWorkbookStoreResult)) {
                    options().byPath[useWorkbookStoreResult]?.wb.recalc();
                  }
                workbookStore(
                  (
                    workbookStore5?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    rev: workbookStore5.rev + 1,
                  }),
                );
                return;
              }
              enabled3 = true;
              try {
                _recalcLinked(
                  workbookStore4,
                  (
                    workbookStore5?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => options().byPath[workbookStore5]?.wb,
                );
              } finally {
                enabled3 = false;
              }
              workbookStore(
                (
                  workbookStore5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  rev: workbookStore5.rev + 1,
                }),
              );
            })();
          }
        },
        invalidateIfExternal: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let byPathItem: Dynamic = options().byPath[workbookStore4];
          if (!byPathItem) {
            if (options2 <= (record2[workbookStore4] ?? 0)) return;
            if (
              [...(_dependents.get(workbookStore4) ?? [])].some(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  options().byPath[item],
              )
            ) {
              (async (..._extraArguments: unknown[]): Promise<undefined> => {
                await ensureSettled(workbookStore4);
                if (!hasEntrySync(workbookStore4)) {
                  try {
                    await options().load(workbookStore4);
                  } catch {
                    return;
                  }
                  enabled3 = true;
                  try {
                    _recalcLinked(
                      workbookStore4,
                      (
                        workbookStore5?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => options().byPath[workbookStore5]?.wb,
                    );
                  } finally {
                    enabled3 = false;
                  }
                  workbookStore(
                    (
                      workbookStore5?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => ({
                      rev: workbookStore5.rev + 1,
                    }),
                  );
                }
              })();
            }
            return;
          }
          if (!(byPathItem.dirty || options2 <= (record2[workbookStore4] ?? 0))) {
            options().invalidate(workbookStore4);
          }
        },
        dirtyBytes: async (
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => {
          let record3: Dynamic = {};
          for (let [
            useWorkbookStoreResult,
            useWorkbookStoreResult2,
          ] of Object.entries(options().byPath) as Dynamic)
            if (
              !(
                !useWorkbookStoreResult.startsWith(items + `/`) ||
                !useWorkbookStoreResult2.dirty
              )
            ) {
              record3[useWorkbookStoreResult.slice(items.length + 1)] =
                useWorkbookStoreResult2.pendingBytes ??
                (await useWorkbookStoreResult2.wb.toXlsx());
            }
          await ensureSettled();
          for (let [
            useWorkbookStoreResult,
            useWorkbookStoreResult2,
          ] of listEntriesSync(items) as Dynamic) {
            let label = `${items}/${useWorkbookStoreResult}`;
            if (!options().byPath[label]) {
              record3[useWorkbookStoreResult] = isTombstone(
                useWorkbookStoreResult2,
              )
                ? new Uint8Array()
                : useWorkbookStoreResult2;
            }
          }
          return record3;
        },
        swap: async (
          workbookStore4?: Dynamic,
          pendingBytes?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          let byPathItem: Dynamic = options().byPath[workbookStore4];
          if (!byPathItem) {
            await stashBytes(workbookStore4, pendingBytes);
            return;
          }
          persistOpenEdit(workbookStore4, pendingBytes);
          byPathItem.room?.close();
          let fromXlsx: Dynamic = await (
            await resolvePlatformApiAndAuthResolve()
          ).Workbook.fromXlsx(pendingBytes, workbookStore4);
          if (_slowPaths.has(workbookStore4)) {
            fromXlsx.rawModel.pauseEvaluation();
          }
          resolvePlatformApiAndAuthRawModel2(fromXlsx);
          updateDataModelSchemasUndo(fromXlsx, {
            find: find,
            bump: bump,
          });
          let room: Dynamic = byPathItem.room
            ? isPlatformApiAndAuthSha(
                workbookStore4,
                fromXlsx,
                undefined,
                useWorkbookStoreHandler(workbookStore4),
              )
            : null;
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              byPath: {
                ...workbookStore5.byPath,
                [workbookStore4]: {
                  ...byPathItem,
                  wb: fromXlsx,
                  dirty: true,
                  pendingBytes: pendingBytes,
                  room: room,
                  roomRev: 0,
                  roomState: room ? `connecting` : `closed`,
                },
              },
              rev: workbookStore5.rev + 1,
            }),
          );
        },
        drop: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          dropEntry(workbookStore4);
          close(workbookStore4);
        },
        forget: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          forgetEntry(workbookStore4);
          close(workbookStore4);
        },
        rekey: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          moveEntry(workbookStore4, options2);
          close(workbookStore4);
        },
        reconcileDeleted: (
          workbookStore4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          for (let useWorkbookStoreResult of listRawDirty(
            workbookStore4,
          ) as Dynamic) {
            if (
              treeListingExempt(useWorkbookStoreResult) ||
              options2.has(useWorkbookStoreResult)
            )
              continue;
            let label = `${workbookStore4}/${useWorkbookStoreResult}`;
            if (!options().byPath[label]?.dirty) {
              purgeIfFlushAcked(
                label,
                (..._extraArguments: unknown[]) =>
                  !options().byPath[label]?.dirty,
                (..._extraArguments: unknown[]) => close(label),
              );
            }
          }
        },
        batch: async (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => {
          index++;
          try {
            return await workbookStore4();
          } finally {
            index--;
            if (index === 0 && (enabled || enabled2)) {
              let enabled4 = enabled;
              let enabled5 = enabled2;
              enabled = false;
              enabled2 = false;
              workbookStore(
                (
                  workbookStore5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  ...(enabled4
                    ? {
                        rev: workbookStore5.rev + 1,
                      }
                    : {}),
                  ...(enabled5
                    ? {
                        dataRev: workbookStore5.dataRev + 1,
                      }
                    : {}),
                }),
              );
            }
          }
        },
        saveAll: async (..._extraArguments: unknown[]): Promise<undefined> => {
          let { useContainerStore: preloadTImport2 }: Dynamic =
            await preloadModule(
              async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                let { useContainerStore: useContainerStore2 }: Dynamic =
                  await Promise.resolve().then(
                    (..._extraArguments: unknown[]): Dynamic =>
                      DataModelSchemasParseLineParam,
                  );
                return {
                  useContainerStore: useContainerStore2,
                };
              },
              undefined,
              import.meta.url,
            );
          await preloadTImport2.getState().forkIfLocked({
            explicit: true,
          });
          let preloadTImportState: Dynamic = preloadTImport2.getState();
          if (
            preloadTImportState.project?.state === `live` &&
            !preloadTImportState.version
          ) {
            let { toast: preloadTImport3 }: Dynamic = await preloadModule(
              async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                let { toast: toast2 }: Dynamic = await Promise.resolve().then(
                  (..._extraArguments: unknown[]): Dynamic =>
                    UiToastsTOASTHARDMAXMS,
                );
                return {
                  toast: toast2,
                };
              },
              undefined,
              import.meta.url,
            );
            preloadTImport3.error(
              `This project is published — direct saves are disabled until v3 drafts are wired. Copy your changes before leaving this page.`,
            );
            return;
          }
          await slice(preloadTImportState.activeDir());
        },
        anyDirty: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let startsWith: Dynamic = (
            workbookStore5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !workbookStore4 || workbookStore5.startsWith(workbookStore4 + `/`);
          return (
            Object.entries(options().byPath).some(
              (
                [byPathEntry, byPathEntry2]: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => byPathEntry2.dirty && startsWith(byPathEntry),
            ) || anyDirtySync(workbookStore4)
          );
        },
        retarget: (
          items?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          workbookStore(
            (
              workbookStore4?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let byPath: Dynamic = {};
              for (let [
                useWorkbookStoreResult,
                useWorkbookStoreResult2,
              ] of Object.entries(workbookStore4.byPath) as Dynamic) {
                if (useWorkbookStoreResult2.saveTimer) {
                  clearTimeout(useWorkbookStoreResult2.saveTimer);
                }
                if (useWorkbookStoreResult2.serializeTimer) {
                  clearTimeout(useWorkbookStoreResult2.serializeTimer);
                }
                useWorkbookStoreResult2.room?.close();
                byPath[
                  useWorkbookStoreResult.startsWith(items + `/`)
                    ? options2 + useWorkbookStoreResult.slice(items.length)
                    : useWorkbookStoreResult
                ] = {
                  ...useWorkbookStoreResult2,
                  saveTimer: null,
                  serializeTimer: null,
                  pendingBytes: null,
                  room: null,
                  readonly: false,
                };
              }
              _rekeyDeps(items, options2);
              for (let [useWorkbookStoreResult, useWorkbookStoreResult2] of [
                ..._iterativeCount,
              ] as Dynamic)
                if (useWorkbookStoreResult.startsWith(items + `/`)) {
                  _iterativeCount.delete(useWorkbookStoreResult);
                  _iterativeCount.set(
                    options2 + useWorkbookStoreResult.slice(items.length),
                    useWorkbookStoreResult2,
                  );
                }
              for (let useWorkbookStoreResult of [..._slowPaths] as Dynamic)
                if (useWorkbookStoreResult.startsWith(items + `/`)) {
                  _slowPaths.delete(useWorkbookStoreResult);
                  _slowPaths.add(
                    options2 + useWorkbookStoreResult.slice(items.length),
                  );
                }
              return {
                byPath: byPath,
              };
            },
          );
          for (let [
            useWorkbookStoreResult,
            useWorkbookStoreResult2,
          ] of Object.entries(options().byPath) as Dynamic) {
            if (
              !useWorkbookStoreResult.startsWith(options2 + `/`) ||
              useWorkbookStoreResult2.room
            )
              continue;
            let room: Dynamic = isPlatformApiAndAuthSha(
              useWorkbookStoreResult,
              useWorkbookStoreResult2.wb,
              undefined,
              useWorkbookStoreHandler(useWorkbookStoreResult),
            );
            if (room) {
              workbookStore(
                (
                  workbookStore4?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  byPath: {
                    ...workbookStore4.byPath,
                    [useWorkbookStoreResult]: {
                      ...workbookStore4.byPath[useWorkbookStoreResult],
                      room: room,
                      roomState: `connecting`,
                    },
                  },
                }),
              );
            }
          }
          moveUnder(items, options2);
        },
        discardPrefix: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          discardUnder(workbookStore4);
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let byPath: Dynamic = {};
              for (let [
                useWorkbookStoreResult,
                useWorkbookStoreResult2,
              ] of Object.entries(workbookStore5.byPath) as Dynamic)
                if (useWorkbookStoreResult.startsWith(workbookStore4 + `/`)) {
                  if (useWorkbookStoreResult2.saveTimer) {
                    clearTimeout(useWorkbookStoreResult2.saveTimer);
                  }
                  if (useWorkbookStoreResult2.serializeTimer) {
                    clearTimeout(useWorkbookStoreResult2.serializeTimer);
                  }
                  useWorkbookStoreResult2.room?.close();
                } else {
                  byPath[useWorkbookStoreResult] = useWorkbookStoreResult2;
                }
              return {
                byPath: byPath,
                rev: workbookStore5.rev + 1,
              };
            },
          );
        },
        invalidatePrefix: (
          workbookStore4?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          workbookStore(
            (
              workbookStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let byPath: Dynamic = {};
              for (let [
                useWorkbookStoreResult,
                useWorkbookStoreResult2,
              ] of Object.entries(workbookStore5.byPath) as Dynamic)
                if (
                  useWorkbookStoreResult.startsWith(workbookStore4) &&
                  !useWorkbookStoreResult2.dirty
                ) {
                  if (useWorkbookStoreResult2.saveTimer) {
                    clearTimeout(useWorkbookStoreResult2.saveTimer);
                  }
                  if (useWorkbookStoreResult2.serializeTimer) {
                    clearTimeout(useWorkbookStoreResult2.serializeTimer);
                  }
                  useWorkbookStoreResult2.room?.close();
                  _byName.delete(
                    resolvePlatformApiAndAuthSplit3(useWorkbookStoreResult),
                  );
                  _iterativeCount.delete(useWorkbookStoreResult);
                  _slowPaths.delete(useWorkbookStoreResult);
                } else {
                  byPath[useWorkbookStoreResult] = useWorkbookStoreResult2;
                }
              return {
                byPath: byPath,
                rev: workbookStore5.rev + 1,
              };
            },
          );
        },
      };
    },
  ));
}

export { useWorkbookStore };

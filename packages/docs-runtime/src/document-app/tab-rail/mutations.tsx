// BaoCut: extracted tab rail mutations callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateTabRailRenameDraftContext {
  elementRef14: Dynamic;
}

export function createTabRailRenameDraft(tabRailLiveContext: CreateTabRailRenameDraftContext): Dynamic {
  return ((tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = tabRailLiveContext.elementRef14.current;
      let tabRail2: Dynamic =
        element === null
          ? tabRail
          : element.then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                tabRail.then(
                  (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    result && result2,
                ),
            );
      tabRailLiveContext.elementRef14.current = tabRail2;
      let updateElement6 = (..._extraArguments: unknown[]): undefined => {
        if (tabRailLiveContext.elementRef14.current === tabRail2) {
          tabRailLiveContext.elementRef14.current = null;
        }
      };
      tabRail2.then(updateElement6, updateElement6);
      return tabRail2;
    });
}

export interface CreateTabRailRenameCommitContext {
  apiFetcher: Dynamic;
  createDocumentFile: Dynamic;
  elementRef14: Dynamic;
  errorRef: Dynamic;
  loadPlatformSessionAndSourcesAckOf: Dynamic;
  pid: Dynamic;
  resolveObservabilityBrowserAndOperationEventsReplace2: Dynamic;
  resolvePlatformSessionAndSourcesData: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable: Dynamic;
  resolvePlatformSyncAndRoutingName: Dynamic;
  resolvePlatformSyncAndRoutingPath3: Dynamic;
  setError: Dynamic;
  tabRailState: Dynamic;
  take2: Dynamic;
  updateElement2: Dynamic;
}

export function createTabRailRenameCommit(tabRailLiveContext: CreateTabRailRenameCommitContext): Dynamic {
  return (async (
      { id: id3, draft: draft, seed: seed }: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let items: Dynamic =
        (0, tabRailLiveContext.resolveObservabilityBrowserAndOperationEventsReplace2)(draft, seed);
      if (items === null) return;
      let tabRailStateEntry: Dynamic = tabRailLiveContext.tabRailState?.get(id3);
      if (
        items.length === 0 ||
        tabRailStateEntry === undefined ||
        items === tabRailStateEntry.name ||
        items === seed
      )
        return;
      let element: Dynamic = tabRailLiveContext.elementRef14.current;
      if (element !== null) {
        await element;
        let take3: Dynamic = await (0, tabRailLiveContext.take2)(true);
        if (
          take3 === null ||
          ((tabRailStateEntry = take3.get(id3)),
          tabRailStateEntry === undefined || items === tabRailStateEntry.name)
        )
          return;
      }
      let tabRailResult4: Dynamic = (0, tabRailLiveContext.resolvePlatformSyncAndRoutingName)(
        tabRailStateEntry,
        items,
      );
      await (0, tabRailLiveContext.updateElement2)(
        (async (..._extraArguments: unknown[]) => {
          try {
            let response: Dynamic = await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
              tabRailLiveContext.pid,
              (0, tabRailLiveContext.createDocumentFile)(
                tabRailLiveContext.pid,
                (0, tabRailLiveContext.resolvePlatformSyncAndRoutingPath3)(id3, tabRailResult4),
              ),
              tabRailLiveContext.apiFetcher,
            );
            return response.verdict === `allow`
              ? ((0, tabRailLiveContext.take2)(true), true)
              : ((0, tabRailLiveContext.setError)(
                  (tabRailLiveContext.errorRef.current =
                    (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                      response.reason,
                      (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
                    )),
                ),
                false);
          } catch (error2: Dynamic) {
            (0, tabRailLiveContext.setError)(
              (tabRailLiveContext.errorRef.current =
                error2 instanceof Error ? error2.message : `rename failed`),
            );
            return false;
          }
        })(),
      );
    });
}

export interface CreateTabRailApplyPendingPlacementContext {
  TABS_MOVED_TO_PAGE_MESSAGE: Dynamic;
  callback: Dynamic;
  disabled: Dynamic;
  disabledRef: Dynamic;
  editing: Dynamic;
  elementRef8: Dynamic;
  enabledRef: Dynamic;
  enabledRef8: Dynamic;
  enabledState2: Dynamic;
  enabledStateRef: Dynamic;
  error: Dynamic;
  errorRef: Dynamic;
  getTabsPlacementEpoch3: Dynamic;
  latestStyle2: Dynamic;
  mapPreloadDependencies: Dynamic;
  preloadModule: Dynamic;
  resolvePlatformAnnouncementsValue: Dynamic;
  seatRef: Dynamic;
  setTabRailState3: Dynamic;
  sourceModuleUrl: Dynamic;
  tabRailState: Dynamic;
  tabRailState3: Dynamic;
  tabsListShownRef: Dynamic;
}

export function createTabRailApplyPendingPlacement(tabRailLiveContext: CreateTabRailApplyPendingPlacementContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (
        tabRailLiveContext.tabRailState3 === null ||
        tabRailLiveContext.enabledState2 ||
        tabRailLiveContext.editing !== null ||
        tabRailLiveContext.disabled ||
        tabRailLiveContext.error !== null
      )
        return;
      let tabRailState5: Dynamic = tabRailLiveContext.tabRailState3;
      let latestStyle3: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        (0, tabRailLiveContext.getTabsPlacementEpoch3)(tabRailState5) && (0, tabRailLiveContext.latestStyle2)();
      let tabRailHandler: Dynamic = (
        tabRail?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        tabRail !== null && tabRail.has(tabRailState5.id) && tabRail.size >= 2;
      if (!latestStyle3()) {
        (0, tabRailLiveContext.setTabRailState3)(null);
        return;
      }
      if (!tabRailHandler(tabRailLiveContext.tabRailState)) return;
      (0, tabRailLiveContext.setTabRailState3)(null);
      let seat2: Dynamic = tabRailLiveContext.seatRef.current;
      if (seat2 !== null) {
        (async (..._extraArguments: unknown[]): Promise<undefined> => {
          let tabRailResult4: Dynamic = await (0, tabRailLiveContext.preloadModule)(
            (..._extraArguments: unknown[]): Dynamic =>
              import("../../document-tabs/place-write"),
            (0, tabRailLiveContext.mapPreloadDependencies)([19, 0, 1, 2, 3, 15]),
            tabRailLiveContext.sourceModuleUrl,
          );
          await (0, tabRailLiveContext.callback)();
          if (!(!tabRailLiveContext.enabledRef.current || !latestStyle3())) {
            if (
              tabRailLiveContext.enabledStateRef.current ||
              tabRailLiveContext.disabledRef.current ||
              tabRailLiveContext.errorRef.current !== null ||
              !tabRailHandler(tabRailLiveContext.elementRef8.current)
            ) {
              (0, tabRailLiveContext.setTabRailState3)(tabRailState5);
              return;
            }
            if (
              !(
                (await tabRailResult4.writeTabsPlaceUnseen(
                  (..._extraArguments: unknown[]): Dynamic =>
                    tabRailLiveContext.seatRef.current ?? seat2,
                  `left`,
                )) !== `allowed` ||
                !tabRailLiveContext.enabledRef.current ||
                tabRailLiveContext.enabledStateRef.current
              )
            ) {
              if (tabRailLiveContext.tabsListShownRef.current) {
                (0, tabRailLiveContext.resolvePlatformAnnouncementsValue)(
                  document,
                  tabRailLiveContext.TABS_MOVED_TO_PAGE_MESSAGE,
                  {
                    key: `tabs-place`,
                  },
                );
              } else {
                tabRailLiveContext.enabledRef8.current = true;
              }
            }
          }
        })().catch((..._extraArguments: unknown[]): undefined => {});
      }
    });
}

export interface CreateTabRailCreateTabContext {
  apiFetcher: Dynamic;
  createDocumentFile: Dynamic;
  createTab: Dynamic;
  editing: Dynamic;
  elementRef14: Dynamic;
  elementRef2: Dynamic;
  enabledRef: Dynamic;
  enabledStateRef: Dynamic;
  getTabsPlacementEpoch2: Dynamic;
  loadPlatformSessionAndSourcesAckOf: Dynamic;
  onNavigate2: Dynamic;
  pid: Dynamic;
  resolvePlatformSessionAndSourcesData: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable: Dynamic;
  room: Dynamic;
  setDisabled: Dynamic;
  setEditing: Dynamic;
  setError: Dynamic;
  setExpanded: Dynamic;
  setTabRailState: Dynamic;
  setTabRailState4: Dynamic;
  tabRailState: Dynamic;
  take2: Dynamic;
  updateDataOperationControlEntry: Dynamic;
  updateElement4: Dynamic;
}

export function createTabRailCreateTab(tabRailLiveContext: CreateTabRailCreateTabContext): Dynamic {
  return (async (
      tabRail?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (!tabRailLiveContext.room) return;
      if (tabRailLiveContext.editing !== null) {
        (0, tabRailLiveContext.updateElement4)();
      }
      let tabsPlacementEpoch: Dynamic = (0, tabRailLiveContext.getTabsPlacementEpoch2)();
      (0, tabRailLiveContext.setDisabled)(true);
      try {
        let tabRailState5: Dynamic = tabRailLiveContext.tabRailState ?? new (Map as Dynamic)();
        let tabRailResult4: Dynamic = (0, tabRailLiveContext.updateDataOperationControlEntry)(
          tabRailState5,
          options,
        );
        if (tabRailResult4 !== null) {
          let element: Dynamic = tabRailLiveContext.elementRef14.current;
          if (element !== null && !(await element)) return;
          let take3: Dynamic = await (0, tabRailLiveContext.take2)(true);
          if (take3 === null) return;
          tabRailState5 = take3;
          tabRailResult4 = (0, tabRailLiveContext.updateDataOperationControlEntry)(
            tabRailState5,
            options,
          );
        }
        (0, tabRailLiveContext.setError)(null);
        if (tabRailResult4 !== null) {
          let response: Dynamic = await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
            tabRailLiveContext.pid,
            (0, tabRailLiveContext.createDocumentFile)(tabRailLiveContext.pid, tabRailResult4.patch),
            tabRailLiveContext.apiFetcher,
          );
          if (response.verdict !== `allow`) {
            (0, tabRailLiveContext.setError)(
              (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                response.reason,
                (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
              ),
            );
            return;
          }
          tabRailState5 = tabRailResult4.view;
        }
        let tabRailStateCount: Dynamic = tabRailState5.size;
        let { fileId: tab, entry: tab2 }: Dynamic = await (0, tabRailLiveContext.createTab)(
          tabRailLiveContext.room,
          tabRailState5,
          tabRail,
          options,
        );
        if (options !== undefined) {
          (0, tabRailLiveContext.setExpanded)(
            (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              tabRail2.has(options)
                ? tabRail2
                : new (Set as Dynamic)(tabRail2).add(options),
          );
        }
        if (tabRailLiveContext.enabledRef.current && (tabRailLiveContext.enabledStateRef.current || context)) {
          if (
            !context &&
            (document.activeElement === null ||
              document.activeElement === document.body)
          ) {
            tabRailLiveContext.elementRef2.current?.focus();
          }
          (0, tabRailLiveContext.setTabRailState)(
            (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let lookup: Dynamic = new (Map as Dynamic)(tabRail2 ?? []);
              if (tabRailResult4 !== null)
                for (let operation of tabRailResult4.patch as Dynamic) {
                  if (operation.op !== `set`) continue;
                  let pathItem: Dynamic = operation.path[1];
                  if (
                    lookup.has(pathItem) &&
                    lookup.get(pathItem).order === undefined
                  ) {
                    lookup.set(pathItem, tabRailResult4.view.get(pathItem));
                  }
                }
              if (!lookup.has(tab)) {
                lookup.set(tab, tab2);
              }
              return lookup;
            },
          );
          if (!context) {
            (0, tabRailLiveContext.setEditing)({
              id: tab,
              draft: tab2.name,
              seed: tab2.name,
            });
          }
        }
        (0, tabRailLiveContext.take2)(true);
        if (tabRailLiveContext.enabledRef.current) {
          (0, tabRailLiveContext.onNavigate2)(tab);
          (0, tabRailLiveContext.setTabRailState4)(tabRailStateCount, tabsPlacementEpoch, tab);
        }
        return {
          id: tab,
          name: tab2.name,
        };
      } catch (error2: Dynamic) {
        (0, tabRailLiveContext.setError)(error2 instanceof Error ? error2.message : `create failed`);
      } finally {
        (0, tabRailLiveContext.setDisabled)(false);
      }
    });
}

export interface CreateTabRailDuplicateProbeContext {
  enabledRef: Dynamic;
  filePresentationKind: Dynamic;
  kinds: Dynamic;
  readDuplicateSourceFile: Dynamic;
  room: Dynamic;
  setKinds: Dynamic;
}

export function createTabRailDuplicateProbe(tabRailLiveContext: CreateTabRailDuplicateProbeContext): Dynamic {
  return ((tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(!tabRailLiveContext.room || tabRailLiveContext.kinds.has(tabRail))) {
        (0, tabRailLiveContext.readDuplicateSourceFile)(tabRailLiveContext.room, tabRail)
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!tabRailLiveContext.enabledRef.current) return;
              let filePresentationKind2 = (0, tabRailLiveContext.filePresentationKind)(result);
              (0, tabRailLiveContext.setKinds)(
                (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  tabRail2.get(tabRail) === filePresentationKind2
                    ? tabRail2
                    : new (Map as Dynamic)(tabRail2).set(
                        tabRail,
                        filePresentationKind2,
                      ),
              );
            },
          )
          .catch((..._extraArguments: unknown[]): undefined => {});
      }
    });
}

export interface CreateTabRailDuplicateTabContext {
  duplicateDocumentTab: Dynamic;
  enabledRef: Dynamic;
  getTabsPlacementEpoch2: Dynamic;
  onNavigate2: Dynamic;
  room: Dynamic;
  setDisabled: Dynamic;
  setError: Dynamic;
  setTabRailState4: Dynamic;
  tabRailState: Dynamic;
  take2: Dynamic;
}

export function createTabRailDuplicateTab(tabRailLiveContext: CreateTabRailDuplicateTabContext): Dynamic {
  return (async (
      tabRail?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (!tabRailLiveContext.room || tabRailLiveContext.tabRailState === null) return;
      let tabsPlacementEpoch: Dynamic = (0, tabRailLiveContext.getTabsPlacementEpoch2)();
      (0, tabRailLiveContext.setDisabled)(true);
      (0, tabRailLiveContext.setError)(null);
      try {
        let tabRailStateCount: Dynamic = tabRailLiveContext.tabRailState.size;
        let { fileId: duplicateDocumentTab2 }: Dynamic =
          await (0, tabRailLiveContext.duplicateDocumentTab)(tabRailLiveContext.room, tabRailLiveContext.tabRailState, tabRail);
        (0, tabRailLiveContext.take2)(true);
        if (tabRailLiveContext.enabledRef.current) {
          (0, tabRailLiveContext.onNavigate2)(duplicateDocumentTab2);
        }
        if (tabRailLiveContext.enabledRef.current) {
          (0, tabRailLiveContext.setTabRailState4)(
            tabRailStateCount,
            tabsPlacementEpoch,
            duplicateDocumentTab2,
          );
        }
      } catch (error2: Dynamic) {
        (0, tabRailLiveContext.setError)(error2 instanceof Error ? error2.message : `duplicate failed`);
      } finally {
        (0, tabRailLiveContext.setDisabled)(false);
      }
    });
}

export interface CreateTabRailDeleteTabContext {
  activeId: Dynamic;
  apiFetcher: Dynamic;
  createDocumentFile: Dynamic;
  enabledRef: Dynamic;
  enabledState3: Dynamic;
  getDataOperationControlPatch: Dynamic;
  loadPlatformSessionAndSourcesAckOf: Dynamic;
  onNavigate2: Dynamic;
  pid: Dynamic;
  resolveDataOperationControlAbsent: Dynamic;
  resolveDataOperationControlEngineBound: Dynamic;
  resolveDataOperationControlSize: Dynamic;
  resolvePlatformSessionAndSourcesData: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable2: Dynamic;
  room: Dynamic;
  roots: Dynamic;
  setDisabled: Dynamic;
  setError: Dynamic;
  setTabRailState2: Dynamic;
  setTabRailState3: Dynamic;
  tabRailState: Dynamic;
  tabRailState2: Dynamic;
  tabRailState3: Dynamic;
  take2: Dynamic;
  updateDataOperationControlTabs: Dynamic;
  updatePlatformSyncAndRoutingEntry: Dynamic;
}

export function createTabRailDeleteTab(tabRailLiveContext: CreateTabRailDeleteTabContext): Dynamic {
  return (async (..._extraArguments: unknown[]): Promise<undefined> => {
      if (tabRailLiveContext.tabRailState2 === null || tabRailLiveContext.tabRailState === null) return;
      let tabRailState5: Dynamic = tabRailLiveContext.tabRailState2;
      let matchesRootsCount =
        tabRailLiveContext.roots.length === 1 &&
        tabRailLiveContext.roots[0].id === tabRailState5 &&
        tabRailLiveContext.roots[0].children.length > 0;
      let tabRailResult4: Dynamic = (0, tabRailLiveContext.getDataOperationControlPatch)(
        tabRailState5,
        tabRailLiveContext.tabRailState,
        tabRailLiveContext.enabledState3 || matchesRootsCount,
      );
      (0, tabRailLiveContext.setTabRailState2)(null);
      if (
        !(
          tabRailResult4.patch.length === 0 &&
          tabRailResult4.deleteFileIds.length === 0
        )
      ) {
        if ((0, tabRailLiveContext.resolveDataOperationControlSize)(tabRailLiveContext.tabRailState, tabRailResult4)) {
          (0, tabRailLiveContext.setError)((0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(`last_tab`));
          return;
        }
        if (tabRailLiveContext.tabRailState3 !== null) {
          let tabRailResult5: Dynamic = (0, tabRailLiveContext.updateDataOperationControlTabs)(
            tabRailLiveContext.tabRailState,
            tabRailResult4.patch,
          );
          if (
            !tabRailResult5.has(tabRailLiveContext.tabRailState3.id) ||
            tabRailResult5.size < 2
          ) {
            (0, tabRailLiveContext.setTabRailState3)(null);
          }
        }
        (0, tabRailLiveContext.setDisabled)(true);
        (0, tabRailLiveContext.setError)(null);
        try {
          if (tabRailResult4.deleteFileIds.length === 0 || !tabRailLiveContext.room) {
            let response: Dynamic = await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
              tabRailLiveContext.pid,
              (0, tabRailLiveContext.createDocumentFile)(tabRailLiveContext.pid, tabRailResult4.patch),
              tabRailLiveContext.apiFetcher,
            );
            if (response.verdict !== `allow`)
              throw Error(
                (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                  response.reason,
                  (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
                ),
              );
          } else {
            let lookup: Dynamic = new (Map as Dynamic)();
            let uniqueItems: Dynamic = new (Set as Dynamic)(
              tabRailResult4.deleteFileIds,
            );
            let total =
              tabRailResult4.deleteFileIds.length * 2 +
              Math.ceil(tabRailResult4.deleteFileIds.length / 63) +
              2;
            let index = 0;
            for (;;) {
              if (index++ >= total) throw Error(`delete did not converge`);
              let itemsSlice: Dynamic = [...uniqueItems].slice(0, 63);
              let matchesItemsSliceCount =
                itemsSlice.length === uniqueItems.size;
              let items: Dynamic = [
                ...(matchesItemsSliceCount
                  ? [
                      {
                        ref: {
                          object: `project`,
                          id: tabRailLiveContext.pid,
                        },
                        verb: `update`,
                        engine: `json`,
                        payload: {
                          engine: `json`,
                          kind: `patch`,
                          patch: tabRailResult4.patch,
                        },
                      },
                    ]
                  : []),
                ...itemsSlice.map(
                  (
                    itemsSlice2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let engine: Dynamic = lookup.get(itemsSlice2) ?? `json`;
                    return {
                      verb: `delete`,
                      engine: engine,
                      ref: {
                        object: `file`,
                        id: itemsSlice2,
                      },
                      payload: {
                        engine: engine,
                      },
                    };
                  },
                ),
              ];
              let batch: Dynamic =
                itemsSlice.length > 0 ? await tabRailLiveContext.room.batch(items) : undefined;
              if (batch === undefined) {
                let response: Dynamic =
                  await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
                    tabRailLiveContext.pid,
                    (0, tabRailLiveContext.createDocumentFile)(tabRailLiveContext.pid, tabRailResult4.patch),
                    tabRailLiveContext.apiFetcher,
                  );
                if (response.verdict !== `allow`)
                  throw Error(
                    (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                      response.reason,
                      (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
                    ),
                  );
                break;
              }
              if (batch.verdict === `allow`) {
                for (let tabRailResult6 of itemsSlice as Dynamic)
                  uniqueItems.delete(tabRailResult6);
                if (matchesItemsSliceCount) break;
                continue;
              }
              let tabRailResult5 = +!!matchesItemsSliceCount;
              let index2: Dynamic = batch.index;
              let itemsSliceItem: Dynamic =
                index2 !== undefined &&
                index2 >= tabRailResult5 &&
                index2 < tabRailResult5 + itemsSlice.length
                  ? itemsSlice[index2 - tabRailResult5]
                  : undefined;
              if (
                itemsSliceItem !== undefined &&
                (0, tabRailLiveContext.resolveDataOperationControlEngineBound)(batch.reason) &&
                !lookup.has(itemsSliceItem)
              ) {
                lookup.set(itemsSliceItem, `text`);
                continue;
              }
              if (
                itemsSliceItem !== undefined &&
                (0, tabRailLiveContext.resolveDataOperationControlAbsent)(batch.reason)
              ) {
                uniqueItems.delete(itemsSliceItem);
                continue;
              }
              let reason: Dynamic = batch.reason ?? `unknown`;
              throw Error(
                (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable2)(reason)
                  ? (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                      reason,
                      (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(batch),
                    )
                  : `deny at op ${index2 ?? `envelope`} — ${reason}`,
              );
            }
          }
          (0, tabRailLiveContext.take2)(true);
          if (
            tabRailLiveContext.enabledRef.current &&
            tabRailLiveContext.activeId !== undefined &&
            (tabRailLiveContext.activeId === tabRailState5 ||
              tabRailResult4.deleteFileIds.includes(tabRailLiveContext.activeId))
          ) {
            (0, tabRailLiveContext.onNavigate2)(
              (0, tabRailLiveContext.updatePlatformSyncAndRoutingEntry)(
                (0, tabRailLiveContext.updateDataOperationControlTabs)(
                  tabRailLiveContext.tabRailState,
                  tabRailResult4.patch,
                ),
              )[0]?.id,
            );
          }
        } catch (error2: Dynamic) {
          (0, tabRailLiveContext.setError)(error2 instanceof Error ? error2.message : `delete failed`);
        } finally {
          (0, tabRailLiveContext.setDisabled)(false);
        }
      }
    });
}

export interface CreateTabRailMoveTabContext {
  apiFetcher: Dynamic;
  createDocumentFile: Dynamic;
  elementRef14: Dynamic;
  errorRef: Dynamic;
  getDataOperationControlEntry2: Dynamic;
  loadPlatformSessionAndSourcesAckOf: Dynamic;
  pid: Dynamic;
  resolvePlatformSessionAndSourcesData: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable: Dynamic;
  setError: Dynamic;
  setExpanded: Dynamic;
  tabPositionAnnouncement: Dynamic;
  tabRailState: Dynamic;
  take2: Dynamic;
  updateDataOperationControlEntry: Dynamic;
  updateElement2: Dynamic;
  updatePlatformSyncAndRoutingEntry: Dynamic;
}

export function createTabRailMoveTab(tabRailLiveContext: CreateTabRailMoveTabContext): Dynamic {
  return (async (
      tabRail?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (tabRailLiveContext.tabRailState === null) return false;
      let tabRailState5: Dynamic = tabRailLiveContext.tabRailState;
      if ((0, tabRailLiveContext.updateDataOperationControlEntry)(tabRailState5, options) !== null) {
        let element: Dynamic = tabRailLiveContext.elementRef14.current;
        if (element !== null && !(await element)) return false;
        let take3: Dynamic = await (0, tabRailLiveContext.take2)(true);
        if (take3 === null) return false;
        tabRailState5 = take3;
      }
      let tabRailResult4: Dynamic = (0, tabRailLiveContext.getDataOperationControlEntry2)(
        tabRailState5,
        tabRail,
        options,
        context,
      );
      if (tabRailResult4 === null) return false;
      (0, tabRailLiveContext.setError)(null);
      let enabled2: false | "accepted" | "unmoved" | "moved" = false;
      await (0, tabRailLiveContext.updateElement2)(
        (async (..._extraArguments: unknown[]) => {
          try {
            let response: Dynamic = await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
              tabRailLiveContext.pid,
              (0, tabRailLiveContext.createDocumentFile)(tabRailLiveContext.pid, tabRailResult4),
              tabRailLiveContext.apiFetcher,
            );
            if (response.verdict !== `allow`) {
              (0, tabRailLiveContext.setError)(
                (tabRailLiveContext.errorRef.current = (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
                  response.reason,
                  (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
                )),
              );
              return false;
            }
            if (options !== undefined) {
              (0, tabRailLiveContext.setExpanded)(
                (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  tabRail2.has(options)
                    ? tabRail2
                    : new (Set as Dynamic)(tabRail2).add(options),
              );
            }
            let take3: Dynamic = await (0, tabRailLiveContext.take2)(true);
            let tabPositionAnnouncement2 = (0, tabRailLiveContext.tabPositionAnnouncement)(
              (0, tabRailLiveContext.updatePlatformSyncAndRoutingEntry)(tabRailState5),
              tabRail,
            );
            let tabPositionAnnouncement3 =
              take3 === null
                ? undefined
                : (0, tabRailLiveContext.tabPositionAnnouncement)(
                    (0, tabRailLiveContext.updatePlatformSyncAndRoutingEntry)(take3),
                    tabRail,
                  );
            enabled2 =
              take3 === null
                ? `accepted`
                : tabPositionAnnouncement3 !== undefined &&
                    tabPositionAnnouncement2 !== undefined &&
                    tabPositionAnnouncement3.parentId ===
                      tabPositionAnnouncement2.parentId &&
                    tabPositionAnnouncement3.pos ===
                      tabPositionAnnouncement2.pos
                  ? `unmoved`
                  : `moved`;
            return true;
          } catch (error2: Dynamic) {
            (0, tabRailLiveContext.setError)(
              (tabRailLiveContext.errorRef.current =
                error2 instanceof Error ? error2.message : `move failed`),
            );
            return false;
          }
        })(),
      );
      return enabled2;
    });
}

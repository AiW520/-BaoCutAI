// BaoCut: extracted tab rail sync callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateTabRailStyleWriterContext {
  countRef: Dynamic;
  countRef2: Dynamic;
  elementRef9: Dynamic;
  enabledRef5: Dynamic;
  fontSettingsKey: Dynamic;
  readDisplaySettings: Dynamic;
  setStyle: Dynamic;
}

export function createTabRailStyleWriter(tabRailLiveContext: CreateTabRailStyleWriterContext): Dynamic {
  return ((
      tabRail?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined => {
      let displaySettings =
        tabRail === undefined ? undefined : (0, tabRailLiveContext.readDisplaySettings)(tabRail);
      let element: Dynamic = tabRailLiveContext.elementRef9.current;
      let element2: Dynamic =
        element !== undefined &&
        displaySettings !== undefined &&
        (0, tabRailLiveContext.fontSettingsKey)(element) === (0, tabRailLiveContext.fontSettingsKey)(displaySettings)
          ? element
          : displaySettings;
      if (element2 !== element) {
        tabRailLiveContext.countRef2.current++;
      }
      tabRailLiveContext.elementRef9.current = element2;
      tabRailLiveContext.enabledRef5.current = options;
      if (!options) {
        tabRailLiveContext.countRef.current++;
      }
      (0, tabRailLiveContext.setStyle)(element2);
    });
}

export interface CreateTabRailProjectDiffContext {
  AGENT_ADDED_TAB_TOAST_ID: Dynamic;
  addedTabs: Dynamic;
  agentAddedTabsMessage: Dynamic;
  createTabNavigationSourceFenceState: Dynamic;
  createTabNavigationSourceFenceState2: Dynamic;
  elementRef11: Dynamic;
  elementRef8: Dynamic;
  enabledRef: Dynamic;
  fontSettingsKey: Dynamic;
  fontSettingsKey2: Dynamic;
  isRealTabFile: Dynamic;
  onNavigateRef: Dynamic;
  pid: Dynamic;
  readDisplaySettings: Dynamic;
  readDocumentLanguage: Dynamic;
  resolveDataOperationControlValue: Dynamic;
  setError: Dynamic;
  setLanguage2: Dynamic;
  setSlice2: Dynamic;
  setStyle2: Dynamic;
  setTabRailState: Dynamic;
  tabIdentityKey: Dynamic;
  tabIdentityKey2: Dynamic;
  toast: Dynamic;
  updateElement: Dynamic;
  updatePlatformSyncAndRoutingDirectory: Dynamic;
}

export function createTabRailProjectDiff(tabRailLiveContext: CreateTabRailProjectDiffContext): Dynamic {
  return ((envelope?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      for (let tabRailResult4 of envelope.diff as Dynamic)
        if (
          (0, tabRailLiveContext.resolveDataOperationControlValue)(tabRailResult4.address) ===
          `project/` + tabRailLiveContext.pid
        ) {
          if (
            tabRailResult4.after === undefined ||
            tabRailResult4.after === null
          ) {
            (0, tabRailLiveContext.setTabRailState)(new (Map as Dynamic)());
            (0, tabRailLiveContext.setSlice2)(null);
            (0, tabRailLiveContext.setStyle2)(null);
            (0, tabRailLiveContext.setLanguage2)(null);
            (0, tabRailLiveContext.setError)(`This document was deleted.`);
          } else if (typeof tabRailResult4.after == `object`) {
            let tabRailResult5: Dynamic = (0, tabRailLiveContext.updatePlatformSyncAndRoutingDirectory)(
              tabRailResult4.after,
            );
            let element: Dynamic = tabRailLiveContext.elementRef11.current;
            if (element !== null && (0, tabRailLiveContext.isRealTabFile)(envelope.actor)) {
              let addedTabs2: Dynamic = (0, tabRailLiveContext.addedTabs)(element, tabRailResult5);
              let addedTabItem: Dynamic = addedTabs2[addedTabs2.length - 1];
              if (addedTabItem !== undefined) {
                (0, tabRailLiveContext.toast)((0, tabRailLiveContext.agentAddedTabsMessage)(addedTabs2), {
                  id: tabRailLiveContext.AGENT_ADDED_TAB_TOAST_ID,
                  action: {
                    label: `Open`,
                    onClick: (..._extraArguments: unknown[]): undefined => {
                      if (tabRailLiveContext.enabledRef.current) {
                        if (
                          tabRailLiveContext.elementRef8.current?.has(addedTabItem.id) === false
                        ) {
                          (0, tabRailLiveContext.toast)(`That tab has since been deleted.`, {
                            id: tabRailLiveContext.AGENT_ADDED_TAB_TOAST_ID,
                          });
                          return;
                        }
                        tabRailLiveContext.onNavigateRef.current(addedTabItem.id);
                      }
                    },
                  },
                });
              }
            }
            (0, tabRailLiveContext.updateElement)(tabRailResult5);
            (0, tabRailLiveContext.setTabRailState)(tabRailResult5);
            (0, tabRailLiveContext.setSlice2)(tabRailResult4.after);
            if (
              tabRailLiveContext.createTabNavigationSourceFenceState.take(
                `lane`,
                (0, tabRailLiveContext.fontSettingsKey)((0, tabRailLiveContext.readDisplaySettings)(tabRailResult4.after)),
                (0, tabRailLiveContext.fontSettingsKey2)(),
              )
            ) {
              (0, tabRailLiveContext.setStyle2)(tabRailResult4.after);
            }
            let documentLanguage: Dynamic = (0, tabRailLiveContext.readDocumentLanguage)(
              tabRailResult4.after,
            );
            if (
              tabRailLiveContext.createTabNavigationSourceFenceState2.take(
                `lane`,
                (0, tabRailLiveContext.tabIdentityKey)(documentLanguage),
                (0, tabRailLiveContext.tabIdentityKey2)(),
              )
            ) {
              (0, tabRailLiveContext.setLanguage2)(documentLanguage);
            }
            (0, tabRailLiveContext.setError)(null);
          }
        }
    });
}

export interface CreateTabRailProjectLoaderContext {
  apiFetcher: Dynamic;
  countRef3: Dynamic;
  createTabNavigationSourceFenceState: Dynamic;
  createTabNavigationSourceFenceState2: Dynamic;
  enabledRef6: Dynamic;
  fontSettingsKey: Dynamic;
  fontSettingsKey2: Dynamic;
  frameProjectAck: Dynamic;
  isFrameArtifact: Dynamic;
  itemsRef: Dynamic;
  loadPlatformSessionAndSourcesAckOf: Dynamic;
  pid: Dynamic;
  readDisplaySettings: Dynamic;
  readDocumentLanguage: Dynamic;
  resolvePlatformSessionAndSourcesData: Dynamic;
  resolvePlatformSessionAndSourcesUnavailable: Dynamic;
  resolvePlatformSessionAndSourcesVerb4: Dynamic;
  setError: Dynamic;
  setLanguage2: Dynamic;
  setSlice2: Dynamic;
  setStyle2: Dynamic;
  setTabRailState: Dynamic;
  tabIdentityKey: Dynamic;
  tabIdentityKey2: Dynamic;
  tabTreeAuthority: Dynamic;
  take: Dynamic;
  updateElement: Dynamic;
  updatePlatformSyncAndRoutingDirectory: Dynamic;
}

export function createTabRailProjectLoader(tabRailLiveContext: CreateTabRailProjectLoaderContext): Dynamic {
  return (async (
      fresh: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let tabRailResult4: number = ++tabRailLiveContext.countRef3.current;
      tabRailLiveContext.enabledRef6.current = true;
      tabRailLiveContext.itemsRef.current = [];
      let take3 = (..._extraArguments: unknown[]): undefined => {
        tabRailLiveContext.enabledRef6.current = false;
        let items: Dynamic = tabRailLiveContext.itemsRef.current;
        tabRailLiveContext.itemsRef.current = [];
        for (let tabRailResult5 of items as Dynamic) (0, tabRailLiveContext.take)(tabRailResult5);
      };
      try {
        let tabTreeAuthority2 = (0, tabRailLiveContext.tabTreeAuthority)({
          frame: (0, tabRailLiveContext.isFrameArtifact)(),
          fresh: fresh,
        });
        let response: Dynamic =
          tabTreeAuthority2 === `lane`
            ? await (0, tabRailLiveContext.frameProjectAck)(tabRailLiveContext.pid)
            : await (0, tabRailLiveContext.loadPlatformSessionAndSourcesAckOf)(
                tabRailLiveContext.pid,
                (0, tabRailLiveContext.resolvePlatformSessionAndSourcesVerb4)(tabRailLiveContext.pid),
                tabRailLiveContext.apiFetcher,
              );
        if (tabRailResult4 !== tabRailLiveContext.countRef3.current) return null;
        if (response.verdict === `deny`) {
          (0, tabRailLiveContext.setTabRailState)(new (Map as Dynamic)());
          (0, tabRailLiveContext.setSlice2)(null);
          (0, tabRailLiveContext.setStyle2)(null, true);
          (0, tabRailLiveContext.setLanguage2)(undefined);
          (0, tabRailLiveContext.setError)(
            (0, tabRailLiveContext.resolvePlatformSessionAndSourcesUnavailable)(
              response.reason,
              (0, tabRailLiveContext.resolvePlatformSessionAndSourcesData)(response),
            ),
          );
          take3();
          return null;
        }
        let lookup: Dynamic =
          response.value === undefined
            ? new (Map as Dynamic)()
            : (0, tabRailLiveContext.updatePlatformSyncAndRoutingDirectory)(response.value);
        if (response.value !== undefined) {
          (0, tabRailLiveContext.updateElement)(lookup);
        }
        (0, tabRailLiveContext.setTabRailState)(lookup);
        (0, tabRailLiveContext.setSlice2)(response.value === undefined ? null : response.value);
        if (
          response.value === undefined ||
          tabRailLiveContext.createTabNavigationSourceFenceState.take(
            tabTreeAuthority2,
            (0, tabRailLiveContext.fontSettingsKey)((0, tabRailLiveContext.readDisplaySettings)(response.value)),
            (0, tabRailLiveContext.fontSettingsKey2)(),
          )
        ) {
          (0, tabRailLiveContext.setStyle2)(
            response.value === undefined ? null : response.value,
            response.value === undefined,
          );
        }
        if (response.value === undefined) (0, tabRailLiveContext.setLanguage2)(undefined);
        else {
          let documentLanguage: Dynamic = (0, tabRailLiveContext.readDocumentLanguage)(response.value);
          if (
            tabRailLiveContext.createTabNavigationSourceFenceState2.take(
              tabTreeAuthority2,
              (0, tabRailLiveContext.tabIdentityKey)(documentLanguage),
              (0, tabRailLiveContext.tabIdentityKey2)(),
            )
          ) {
            (0, tabRailLiveContext.setLanguage2)(documentLanguage);
          }
        }
        (0, tabRailLiveContext.setError)(null);
        take3();
        return lookup;
      } catch (error2: Dynamic) {
        return tabRailResult4 === tabRailLiveContext.countRef3.current
          ? ((0, tabRailLiveContext.setTabRailState)(
              (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                tabRail ?? new (Map as Dynamic)(),
            ),
            (0, tabRailLiveContext.setError)(
              error2 instanceof Error ? error2.message : `document read failed`,
            ),
            take3(),
            null)
          : null;
      }
    });
}

export interface CreateTabRailResetProjectContext {
  AGENT_ADDED_TAB_TOAST_ID: Dynamic;
  clearActiveTabRename: Dynamic;
  countRef3: Dynamic;
  createTabNavigationSourceFenceState: Dynamic;
  createTabNavigationSourceFenceState2: Dynamic;
  elementRef11: Dynamic;
  elementRef13: Dynamic;
  elementRef14: Dynamic;
  elementRef4: Dynamic;
  elementRef6: Dynamic;
  elementRef9: Dynamic;
  enabledRef4: Dynamic;
  enabledRef5: Dynamic;
  lookupRef: Dynamic;
  setDragging: Dynamic;
  setEditing: Dynamic;
  setEnabledState2: Dynamic;
  setEnabledState3: Dynamic;
  setError: Dynamic;
  setExpanded: Dynamic;
  setHint: Dynamic;
  setKinds: Dynamic;
  setLanguage2: Dynamic;
  setSlice: Dynamic;
  setStyle: Dynamic;
  setTabRailState: Dynamic;
  setTabRailState2: Dynamic;
  toast: Dynamic;
}

export function createTabRailResetProject(tabRailLiveContext: CreateTabRailResetProjectContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      tabRailLiveContext.countRef3.current++;
      (0, tabRailLiveContext.setTabRailState)(null);
      (0, tabRailLiveContext.setSlice)(undefined);
      (0, tabRailLiveContext.setStyle)(undefined);
      tabRailLiveContext.elementRef9.current = undefined;
      tabRailLiveContext.enabledRef5.current = false;
      tabRailLiveContext.createTabNavigationSourceFenceState.forget();
      (0, tabRailLiveContext.setLanguage2)(undefined);
      tabRailLiveContext.createTabNavigationSourceFenceState2.forget();
      tabRailLiveContext.elementRef11.current = null;
      tabRailLiveContext.toast.dismiss(tabRailLiveContext.AGENT_ADDED_TAB_TOAST_ID);
      (0, tabRailLiveContext.setError)(null);
      (0, tabRailLiveContext.setExpanded)(new (Set as Dynamic)());
      (0, tabRailLiveContext.setEditing)(null);
      (0, tabRailLiveContext.setTabRailState2)(null);
      (0, tabRailLiveContext.setDragging)(null);
      (0, tabRailLiveContext.setHint)(null);
      (0, tabRailLiveContext.setKinds)(new (Map as Dynamic)());
      (0, tabRailLiveContext.setEnabledState3)(false);
      tabRailLiveContext.elementRef4.current = null;
      (0, tabRailLiveContext.setEnabledState2)();
      tabRailLiveContext.elementRef6.current = null;
      tabRailLiveContext.enabledRef4.current = false;
      (0, tabRailLiveContext.clearActiveTabRename)();
      tabRailLiveContext.elementRef13.current = undefined;
      tabRailLiveContext.elementRef14.current = null;
      tabRailLiveContext.lookupRef.current = new (Map as Dynamic)();
    });
}

export interface CreateTabRailRestoreMenuFocusContext {
  elementRef2: Dynamic;
  elementRef7: Dynamic;
  enabledRef4: Dynamic;
  enabledState2: Dynamic;
  setEnabledState3: Dynamic;
  tabRailState2: Dynamic;
}

export function createTabRailRestoreMenuFocus(tabRailLiveContext: CreateTabRailRestoreMenuFocusContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!tabRailLiveContext.enabledState2 || tabRailLiveContext.tabRailState2 !== null) return;
      let focus4 = (..._extraArguments: unknown[]): undefined => {
        if (
          tabRailLiveContext.enabledRef4.current &&
          document.activeElement?.tagName === `IFRAME`
        ) {
          tabRailLiveContext.enabledRef4.current = false;
          let element: Dynamic = tabRailLiveContext.elementRef7.current;
          (element !== null &&
          element.isConnected &&
          tabRailLiveContext.elementRef2.current?.contains(element)
            ? element
            : tabRailLiveContext.elementRef2.current
          )?.focus();
          return;
        }
        (0, tabRailLiveContext.setEnabledState3)(false);
      };
      let updateEnabled = (..._extraArguments: unknown[]): undefined => {
        tabRailLiveContext.enabledRef4.current = false;
      };
      window.addEventListener(`blur`, focus4);
      window.addEventListener(`keydown`, updateEnabled, true);
      window.addEventListener(`pointerdown`, updateEnabled, true);
      return (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`blur`, focus4);
        window.removeEventListener(`keydown`, updateEnabled, true);
        window.removeEventListener(`pointerdown`, updateEnabled, true);
        tabRailLiveContext.enabledRef4.current = false;
      };
    });
}

export interface CreateTabRailProjectSubscriptionContext {
  createTabNavigationSourceFenceState: Dynamic;
  createTabNavigationSourceFenceState2: Dynamic;
  enabledRef6: Dynamic;
  itemsRef: Dynamic;
  pid: Dynamic;
  setError: Dynamic;
  subscribeProjectFeed: Dynamic;
  take: Dynamic;
  take2: Dynamic;
}

export function createTabRailProjectSubscription(tabRailLiveContext: CreateTabRailProjectSubscriptionContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (tabRailLiveContext.pid.length === 0) return;
      let tabRailResult4: Dynamic = (0, tabRailLiveContext.subscribeProjectFeed)(
        tabRailLiveContext.pid,
        (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          switch (entry.kind) {
            case `envelope`: {
              let envelope: Dynamic = entry.envelope;
              if (tabRailLiveContext.enabledRef6.current) {
                tabRailLiveContext.itemsRef.current.push(envelope);
              } else {
                (0, tabRailLiveContext.take)(envelope);
              }
              break;
            }
            case `recovered`:
              tabRailLiveContext.createTabNavigationSourceFenceState.forget();
              tabRailLiveContext.createTabNavigationSourceFenceState2.forget();
              // BaoCut: 根 tsconfig 开着 noFallthroughCasesInSwitch（TS7029）。原代码从这里落进下一个 case，
              // 改成显式做下一个 case 的事，行为不变。
              (0, tabRailLiveContext.take2)();
              break;
            case `live`:
            case `access-changed`:
              (0, tabRailLiveContext.take2)();
              break;
            case `revoked`:
              (0, tabRailLiveContext.setError)(`Your access to this document ended.`);
              break;
            default:
              break;
          }
        },
      );
      (0, tabRailLiveContext.take2)();
      return tabRailResult4;
    });
}

export interface CreateTabRailExpandActiveAncestorsContext {
  activeId: Dynamic;
  elementRef13: Dynamic;
  getPlatformSyncAndRoutingValue2: Dynamic;
  setExpanded: Dynamic;
  tabRailState: Dynamic;
}

export function createTabRailExpandActiveAncestors(tabRailLiveContext: CreateTabRailExpandActiveAncestorsContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (tabRailLiveContext.activeId === undefined || tabRailLiveContext.elementRef13.current === tabRailLiveContext.activeId) return;
      let uniqueItems: Dynamic =
        tabRailLiveContext.tabRailState === null
          ? new (Set as Dynamic)()
          : (0, tabRailLiveContext.getPlatformSyncAndRoutingValue2)(tabRailLiveContext.activeId, tabRailLiveContext.tabRailState);
      if (uniqueItems.size !== 0) {
        tabRailLiveContext.elementRef13.current = tabRailLiveContext.activeId;
        (0, tabRailLiveContext.setExpanded)(
          (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let enabled2 = false;
            for (let tabRailResult4 of uniqueItems as Dynamic)
              if (!tabRail.has(tabRailResult4)) {
                enabled2 = true;
              }
            if (!enabled2) return tabRail;
            let uniqueItems2: Dynamic = new (Set as Dynamic)(tabRail);
            for (let tabRailResult4 of uniqueItems as Dynamic)
              uniqueItems2.add(tabRailResult4);
            return uniqueItems2;
          },
        );
      }
    });
}

export interface CreateTabRailPresenceIndexContext {
  presence: Dynamic;
  resolvePlatformSyncAndRoutingPush2: Dynamic;
  tabRailState: Dynamic;
}

export function createTabRailPresenceIndex(tabRailLiveContext: CreateTabRailPresenceIndexContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (
        tabRailLiveContext.presence === undefined ||
        tabRailLiveContext.presence.size === 0 ||
        tabRailLiveContext.tabRailState === null
      )
        return [undefined, undefined];
      let lookup: Dynamic = new (Map as Dynamic)();
      let lookup2: Dynamic = new (Map as Dynamic)();
      for (let [tabRailResult4, tabRailResult5] of tabRailLiveContext.presence as Dynamic) {
        let items: Dynamic = [
          tabRailResult4,
          ...(0, tabRailLiveContext.resolvePlatformSyncAndRoutingPush2)(tabRailResult4, tabRailLiveContext.tabRailState),
        ];
        for (let tabRailResult6 of tabRailResult5 as Dynamic) {
          for (let tabRailResult7 of items as Dynamic) {
            let lookupEntry: Dynamic =
              lookup.get(tabRailResult7) ??
              lookup
                .set(tabRailResult7, new (Map as Dynamic)())
                .get(tabRailResult7);
            let lookupEntryEntry: Dynamic = lookupEntry.get(tabRailResult6.who);
            if (lookupEntryEntry === undefined) {
              lookupEntry.set(tabRailResult6.who, tabRailResult6);
            } else {
              if (
                (tabRailResult6.lastWriteTs ?? 0) >
                (lookupEntryEntry.lastWriteTs ?? 0)
              ) {
                lookupEntry.set(tabRailResult6.who, {
                  ...lookupEntryEntry,
                  lastWriteTs: tabRailResult6.lastWriteTs,
                });
              }
            }
          }
          if (tabRailResult6.lastWriteTs !== undefined) {
            let lastWriteTs: Dynamic = tabRailResult6.lastWriteTs;
            for (let tabRailResult7 of items as Dynamic)
              if (lastWriteTs > (lookup2.get(tabRailResult7) ?? 0)) {
                lookup2.set(tabRailResult7, lastWriteTs);
              }
          }
        }
      }
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let [tabRailResult4, tabRailResult5] of lookup as Dynamic)
        lookup3.set(tabRailResult4, [...tabRailResult5.values()]);
      return [lookup3, lookup2];
    });
}

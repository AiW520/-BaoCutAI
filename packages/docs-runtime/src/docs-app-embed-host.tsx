// BaoCut: extracted embed host callbacks; state stays with the component.
import type { Dynamic } from "./types";

export interface CreateRoomViewEmbedPageChooseInitialTabContext {
  callback: Dynamic;
  container2: Dynamic;
  contentPending: Dynamic;
  elementRef4: Dynamic;
  elementRef5: Dynamic;
  elementRef7: Dynamic;
  frame: Dynamic;
  getSessionNavigationValue2: Dynamic;
  memoized9: Dynamic;
  navigate: Dynamic;
  nodeId: Dynamic;
  placement: Dynamic;
  queryEntry: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolveDataContentAndReferencesKind2: Dynamic;
  resolvePlatformSessionAndSourcesRest: Dynamic;
  roomViewEmbedPageResult16: Dynamic;
  routineId: Dynamic;
  tabOfPage2: Dynamic;
}

export function createRoomViewEmbedPageChooseInitialTab(embedPageLiveContext: CreateRoomViewEmbedPageChooseInitialTabContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (
        embedPageLiveContext.routineId !== undefined ||
        embedPageLiveContext.queryEntry !== undefined ||
        embedPageLiveContext.contentPending ||
        embedPageLiveContext.roomViewEmbedPageResult16
      )
        return;
      if (embedPageLiveContext.nodeId !== undefined) {
        embedPageLiveContext.elementRef5.current = null;
        if (embedPageLiveContext.elementRef4.current === embedPageLiveContext.nodeId && !embedPageLiveContext.placement.has(embedPageLiveContext.nodeId)) {
          embedPageLiveContext.elementRef4.current = embedPageLiveContext.memoized9;
          (0, embedPageLiveContext.navigate)(
            (embedPageLiveContext.memoized9 === undefined
              ? (0, embedPageLiveContext.resolveDataContentAndReferencesKind2)(embedPageLiveContext.container2)
              : (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
                  container: embedPageLiveContext.container2,
                  ref: {
                    noun: `file`,
                    id: embedPageLiveContext.memoized9,
                  },
                })) + location.search,
            {
              replace: true,
            },
          );
        }
        return;
      }
      let getSessionNavigationValue3: Dynamic = embedPageLiveContext.getSessionNavigationValue2;
      let label2: Dynamic = ``;
      let roomViewEmbedPageResult37: Dynamic =
        embedPageLiveContext.elementRef5.current === null
          ? (0, embedPageLiveContext.resolvePlatformSessionAndSourcesRest)(location.hash)
          : null;
      let element: Dynamic =
        embedPageLiveContext.elementRef5.current ??
        (roomViewEmbedPageResult37 === null
          ? null
          : (0, embedPageLiveContext.callback)(roomViewEmbedPageResult37));
      if (element?.kind === `land`) {
        getSessionNavigationValue3 = element.fileId;
        label2 = element.restHash;
      } else {
        if (element === null) {
          getSessionNavigationValue3 =
            (0, embedPageLiveContext.tabOfPage2)(location.hash) ?? getSessionNavigationValue3;
        }
      }
      if (roomViewEmbedPageResult37 !== null && element !== null) {
        embedPageLiveContext.elementRef7.current =
          element.kind === `land`
            ? {
                kind: `land`,
                fileId: element.fileId,
                ...(element.restHash
                  ? {
                      rest: element.restHash.slice(1),
                    }
                  : {}),
              }
            : {
                kind: element.kind,
              };
      }
      if (getSessionNavigationValue3 !== undefined) {
        if (
          element !== null &&
          element.kind !== `keep` &&
          embedPageLiveContext.elementRef5.current === null
        ) {
          history.replaceState(
            history.state,
            ``,
            location.pathname + location.search + label2,
          );
          if (element.kind === `land`) {
            embedPageLiveContext.elementRef5.current = element;
          }
        }
        embedPageLiveContext.elementRef4.current = getSessionNavigationValue3;
        (0, embedPageLiveContext.navigate)(
          (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
            container: embedPageLiveContext.container2,
            ref: {
              noun: `file`,
              id: getSessionNavigationValue3,
            },
          }) +
            location.search +
            (embedPageLiveContext.frame ? `` : label2),
          {
            replace: true,
          },
        );
      }
    });
}

export interface CreateRoomViewEmbedPageDeletedTabNavigationContext {
  SessionNavigation_TheTabYouWereOnHasBeenDeletedOrIsNoLongerAvailable: Dynamic;
  container2: Dynamic;
  contentPending: Dynamic;
  elementRef4: Dynamic;
  fileId: Dynamic;
  memoized9: Dynamic;
  navigate: Dynamic;
  nodeId: Dynamic;
  placement: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  roomViewEmbedPageResult16: Dynamic;
  toast: Dynamic;
}

export function createRoomViewEmbedPageDeletedTabNavigation(embedPageLiveContext: CreateRoomViewEmbedPageDeletedTabNavigationContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (
        embedPageLiveContext.fileId === undefined ||
        embedPageLiveContext.fileId !== embedPageLiveContext.nodeId ||
        embedPageLiveContext.contentPending ||
        embedPageLiveContext.roomViewEmbedPageResult16 ||
        embedPageLiveContext.placement.has(embedPageLiveContext.nodeId) ||
        embedPageLiveContext.memoized9 === undefined
      )
        return;
      embedPageLiveContext.elementRef4.current = embedPageLiveContext.memoized9;
      embedPageLiveContext.toast.info(
        embedPageLiveContext.SessionNavigation_TheTabYouWereOnHasBeenDeletedOrIsNoLongerAvailable,
        {
          id: `tab-deleted`,
        },
      );
      let query = new URLSearchParams(location.search);
      query.delete(`path`);
      let queryText = query.toString();
      (0, embedPageLiveContext.navigate)(
        (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
          container: embedPageLiveContext.container2,
          ref: {
            noun: `file`,
            id: embedPageLiveContext.memoized9,
          },
        }) + (queryText ? `?${queryText}` : ``),
        {
          replace: true,
        },
      );
    });
}

export interface CreateRoomViewEmbedPageLandingFocusContext {
  callback: Dynamic;
  container2: Dynamic;
  elementRef6: Dynamic;
  elementRef8: Dynamic;
  elementRef9: Dynamic;
  frameCurrentAnchor: Dynamic;
  navigate: Dynamic;
  nodeId: Dynamic;
  placement: Dynamic;
  queryEntry: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolveDataContentAndReferencesTest5: Dynamic;
  resolvePlatformSessionAndSourcesRest: Dynamic;
  resolvePlatformSessionAndSourcesTab6: Dynamic;
  routineId: Dynamic;
  tabOfPage2: Dynamic;
}

export function createRoomViewEmbedPageLandingFocus(embedPageLiveContext: CreateRoomViewEmbedPageLandingFocusContext): Dynamic {
  return ((landed?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        embedPageLiveContext.nodeId === undefined ||
        embedPageLiveContext.routineId !== undefined ||
        embedPageLiveContext.queryEntry !== undefined
      )
        return;
      let fileId3: Dynamic;
      let roomViewEmbedPageResult37: Dynamic;
      let intent: Dynamic;
      let roomViewEmbedPageResult38: Dynamic =
        (0, embedPageLiveContext.resolvePlatformSessionAndSourcesRest)(landed);
      if (roomViewEmbedPageResult38 !== null) {
        let callback2: Dynamic = (0, embedPageLiveContext.callback)(roomViewEmbedPageResult38);
        if (callback2.kind !== `land`) return;
        fileId3 = callback2.fileId;
        roomViewEmbedPageResult37 = callback2.restHash;
        intent = {
          kind: `goto`,
          ...(roomViewEmbedPageResult37 === ``
            ? {}
            : {
                heading: roomViewEmbedPageResult37.slice(1),
              }),
        };
      } else {
        let element: Dynamic = embedPageLiveContext.elementRef8.current;
        fileId3 =
          (0, embedPageLiveContext.tabOfPage2)(landed) ??
          (landed === embedPageLiveContext.elementRef6.current &&
          element !== undefined &&
          embedPageLiveContext.placement.has(element) &&
          (0, embedPageLiveContext.resolveDataContentAndReferencesTest5)(element)
            ? element
            : embedPageLiveContext.nodeId);
        roomViewEmbedPageResult37 = `#${landed}`;
        intent = {
          kind: `goto`,
          landed: landed,
        };
      }
      if (fileId3 !== embedPageLiveContext.nodeId) {
        embedPageLiveContext.elementRef9.current = {
          fileId: fileId3,
          intent: intent,
        };
        history.replaceState(
          history.state,
          ``,
          location.pathname + location.search + roomViewEmbedPageResult37,
        );
        (0, embedPageLiveContext.navigate)(
          (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
            container: embedPageLiveContext.container2,
            ref: {
              noun: `file`,
              id: fileId3,
            },
          }) + location.search,
          {
            replace: true,
          },
        );
        return;
      }
      if (roomViewEmbedPageResult37 === ``) {
        (0, embedPageLiveContext.frameCurrentAnchor)({
          tab: embedPageLiveContext.nodeId,
        });
        return;
      }
      let oldURL = location.href;
      history.replaceState(
        history.state,
        ``,
        location.pathname + location.search + roomViewEmbedPageResult37,
      );
      window.dispatchEvent(
        new (HashChangeEvent as Dynamic)(`hashchange`, {
          oldURL: oldURL,
          newURL: location.href,
        }),
      );
      if (roomViewEmbedPageResult38 === null) {
        (0, embedPageLiveContext.frameCurrentAnchor)(
          (0, embedPageLiveContext.resolvePlatformSessionAndSourcesTab6)(embedPageLiveContext.nodeId, intent),
        );
      }
    });
}

export interface CreateRoomViewEmbedPageOpenTabContext {
  container2: Dynamic;
  elementRef9: Dynamic;
  navigate: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
}

export function createRoomViewEmbedPageOpenTab(embedPageLiveContext: CreateRoomViewEmbedPageOpenTabContext): Dynamic {
  return ((fileId3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      embedPageLiveContext.elementRef9.current = {
        fileId: fileId3,
        intent: {
          kind: `goto`,
          landed: location.hash.replace(/^#/, ``),
        },
      };
      (0, embedPageLiveContext.navigate)(
        (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
          container: embedPageLiveContext.container2,
          ref: {
            noun: `file`,
            id: fileId3,
          },
        }) + location.search,
        {
          replace: true,
        },
      );
    });
}

export interface CreateRoomViewEmbedPageSetupVisibilityContext {
  documentPreviewLimit2000: Dynamic;
  sawSettingUp: Dynamic;
  setEnabledState3: Dynamic;
  setSawSettingUp: Dynamic;
  settingUp: Dynamic;
}

export function createRoomViewEmbedPageSetupVisibility(embedPageLiveContext: CreateRoomViewEmbedPageSetupVisibilityContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (embedPageLiveContext.settingUp) {
        (0, embedPageLiveContext.setSawSettingUp)(true);
        (0, embedPageLiveContext.setEnabledState3)(true);
        return;
      }
      if (!embedPageLiveContext.sawSettingUp) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => (0, embedPageLiveContext.setEnabledState3)(false),
        embedPageLiveContext.documentPreviewLimit2000,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    });
}

export interface CreateRoomViewEmbedPageSlowPreviewContext {
  documentPreviewLimit8000: Dynamic;
  faceUp: Dynamic;
  setSlow: Dynamic;
  usePageSkillSeat2: Dynamic;
}

export function createRoomViewEmbedPageSlowPreview(embedPageLiveContext: CreateRoomViewEmbedPageSlowPreviewContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      (0, embedPageLiveContext.setSlow)(false);
      if (!embedPageLiveContext.faceUp) return;
      let pictureSince: Dynamic = embedPageLiveContext.usePageSkillSeat2.pictureSince;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => (0, embedPageLiveContext.setSlow)(true),
        pictureSince === undefined
          ? embedPageLiveContext.documentPreviewLimit8000
          : Math.max(0, embedPageLiveContext.documentPreviewLimit8000 - (Date.now() - pictureSince)),
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    });
}

export interface CreateRoomViewEmbedPageVisualizeContext {
  PlatformLiveDocumentAndHistoryDocReady: Dynamic;
  container2: Dynamic;
  countRef: Dynamic;
  getDataOperationControlKeys: Dynamic;
  getDoorDialect: Dynamic;
  loadDataOperationControlDialect: Dynamic;
  navigate: Dynamic;
  onRenamed: Dynamic;
  placement: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolvePlatformSyncAndRoutingTab: Dynamic;
  room: Dynamic;
  setDoorDialect: Dynamic;
  toast: Dynamic;
}

export function createRoomViewEmbedPageVisualize(embedPageLiveContext: CreateRoomViewEmbedPageVisualizeContext): Dynamic {
  return (async (
      roomViewEmbedPage?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let storeState: Dynamic =
        embedPageLiveContext.PlatformLiveDocumentAndHistoryDocReady.getState();
      let docReady: Dynamic = storeState.docReady;
      if (docReady) {
        storeState.requestInsert(docReady.fileId, roomViewEmbedPage);
        return;
      }
      if (!embedPageLiveContext.room) {
        embedPageLiveContext.toast.error(`The room isn't ready yet — try again in a moment.`);
        return;
      }
      let count: Dynamic = embedPageLiveContext.countRef.current;
      try {
        let name = (0, embedPageLiveContext.resolvePlatformSyncAndRoutingTab)(
          embedPageLiveContext.placement ?? new (Map as Dynamic)(),
        );
        let { fileId: roomViewEmbedPageResult37 }: Dynamic =
          await (0, embedPageLiveContext.loadDataOperationControlDialect)(embedPageLiveContext.room, {
            birthName: name + `.ldoc`,
            placement: {
              name: name,
              order: (0, embedPageLiveContext.getDataOperationControlKeys)(embedPageLiveContext.placement),
            },
            peekDialect: embedPageLiveContext.getDoorDialect,
            learn: embedPageLiveContext.setDoorDialect,
          });
        storeState.requestInsert(roomViewEmbedPageResult37, roomViewEmbedPage);
        if (embedPageLiveContext.countRef.current !== count) return;
        (0, embedPageLiveContext.onRenamed)();
        (0, embedPageLiveContext.navigate)(
          (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
            container: embedPageLiveContext.container2,
            ref: {
              noun: `file`,
              id: roomViewEmbedPageResult37,
            },
          }),
        );
      } catch (error: Dynamic) {
        if (embedPageLiveContext.countRef.current !== count) return;
        embedPageLiveContext.toast.error(
          error instanceof Error
            ? error.message
            : `The tab for the chart couldn't be created.`,
        );
      }
    });
}

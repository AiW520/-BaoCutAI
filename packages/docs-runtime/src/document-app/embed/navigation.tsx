// BaoCut: extracted embed navigation callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateRoomViewEmbedPageSwitchPrefetchContext {
  container: Dynamic;
  enabledRef: Dynamic;
  frame: Dynamic;
  frameLane: Dynamic;
  getSessionNavigationValue: Dynamic;
  guardAsyncDocumentCall: Dynamic;
  installDocumentSwitchPrefetch: Dynamic;
  liveDoor: Dynamic;
  loadPlatformLiveDocumentAndHistoryLimit: Dynamic;
  pid2: Dynamic;
}

export function createRoomViewEmbedPageSwitchPrefetch(embedPageLiveContext: CreateRoomViewEmbedPageSwitchPrefetchContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (embedPageLiveContext.frame)
        return (0, embedPageLiveContext.installDocumentSwitchPrefetch)(embedPageLiveContext.pid2, {
          lane: (0, embedPageLiveContext.frameLane)(`project/${embedPageLiveContext.pid2}`),
          door: (0, embedPageLiveContext.liveDoor)(embedPageLiveContext.pid2, {
            container: embedPageLiveContext.container,
          }),
          remembered: (..._extraArguments: unknown[]): Dynamic =>
            (0, embedPageLiveContext.getSessionNavigationValue)(embedPageLiveContext.pid2),
          hash: (..._extraArguments: unknown[]) => location.hash,
          probe: (0, embedPageLiveContext.guardAsyncDocumentCall)(
            (..._extraArguments: unknown[]): Dynamic => embedPageLiveContext.enabledRef.current,
            embedPageLiveContext.loadPlatformLiveDocumentAndHistoryLimit,
          ),
        });
    });
}

export interface CreateRoomViewEmbedPageLoadFailureTelemetryContext {
  createPagesFaceUnavailableEvent: Dynamic;
  emitTelemetryEvent: Dynamic;
  failed: Dynamic;
  failed2: Dynamic;
  page2: Dynamic;
  pid2: Dynamic;
  resolveObservabilityBrowserAndOperationEventsTIMEOUT: Dynamic;
  resolveObservabilityBrowserAndOperationEventsValue3: Dynamic;
  resolveSessionNavigationFrame2: Dynamic;
}

export function createRoomViewEmbedPageLoadFailureTelemetry(embedPageLiveContext: CreateRoomViewEmbedPageLoadFailureTelemetryContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (!(!embedPageLiveContext.failed || embedPageLiveContext.failed2 || !embedPageLiveContext.pid2 || embedPageLiveContext.page2.state !== `failed`))
        try {
          (0, embedPageLiveContext.emitTelemetryEvent)(
            (0, embedPageLiveContext.createPagesFaceUnavailableEvent)({
              host: (0, embedPageLiveContext.resolveSessionNavigationFrame2)(),
              why: (0, embedPageLiveContext.resolveObservabilityBrowserAndOperationEventsTIMEOUT)(
                embedPageLiveContext.page2.message,
              ),
              vis: document.visibilityState,
              plat: (0, embedPageLiveContext.resolveObservabilityBrowserAndOperationEventsValue3)(),
            }),
          );
        } catch {}
    });
}

export interface CreateRoomViewEmbedPageAccessFailureTelemetryContext {
  createPagesFaceGoneEvent: Dynamic;
  denied: Dynamic;
  emitTelemetryEvent: Dynamic;
  gone: Dynamic;
  pid2: Dynamic;
  resolveObservabilityBrowserAndOperationEventsValue3: Dynamic;
  resolveSessionNavigationFrame2: Dynamic;
  tooLarge: Dynamic;
}

export function createRoomViewEmbedPageAccessFailureTelemetry(embedPageLiveContext: CreateRoomViewEmbedPageAccessFailureTelemetryContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (!(!embedPageLiveContext.denied || !embedPageLiveContext.pid2))
        try {
          let why = embedPageLiveContext.tooLarge ? `too_large` : embedPageLiveContext.gone ? `gone` : `denied`;
          let vis = document.visibilityState;
          (0, embedPageLiveContext.emitTelemetryEvent)(
            (0, embedPageLiveContext.createPagesFaceGoneEvent)({
              host: (0, embedPageLiveContext.resolveSessionNavigationFrame2)(),
              why: why,
              vis: vis,
              plat: (0, embedPageLiveContext.resolveObservabilityBrowserAndOperationEventsValue3)(),
            }),
          );
        } catch {}
    });
}

export interface CreateRoomViewEmbedPagePreviewStateContext {
  latestSidebarVisibility: Dynamic;
  setRoomViewEmbedPageState4: Dynamic;
}

export function createRoomViewEmbedPagePreviewState(embedPageLiveContext: CreateRoomViewEmbedPagePreviewStateContext): Dynamic {
  return ((
      key?: Dynamic,
      serial?: Dynamic,
      state?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, embedPageLiveContext.setRoomViewEmbedPageState4)(
        (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (0, embedPageLiveContext.latestSidebarVisibility)(roomViewEmbedPage, {
            key: key,
            serial: serial,
            state: state,
          }),
      ));
}

export interface CreateRoomViewEmbedPageOutlineFeedContext {
  enabledRef2: Dynamic;
  feed: Dynamic;
  setOneTabList: Dynamic;
}

export function createRoomViewEmbedPageOutlineFeed(embedPageLiveContext: CreateRoomViewEmbedPageOutlineFeedContext): Dynamic {
  return ((
      fileId3?: Dynamic,
      outline?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      embedPageLiveContext.feed.send({
        type: `outline`,
        fileId: fileId3,
        outline: outline,
      });
      (0, embedPageLiveContext.setOneTabList)({
        type: `said`,
        fileId: fileId3,
        outline: outline,
        shown: embedPageLiveContext.enabledRef2.current,
      });
    });
}

export interface CreateRoomViewEmbedPageOutlineDeliveryContext {
  feed: Dynamic;
}

export function createRoomViewEmbedPageOutlineDelivery(embedPageLiveContext: CreateRoomViewEmbedPageOutlineDeliveryContext): Dynamic {
  return ((
      fileId3?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      embedPageLiveContext.feed.send({
        type: `at`,
        fileId: fileId3,
        at: options,
      });
      if (context) {
        embedPageLiveContext.feed.send({
          type: `personScrolled`,
          fileId: fileId3,
          now: Date.now(),
        });
      }
    });
}

export interface CreateRoomViewEmbedPageOutlineRevealContext {
  feed: Dynamic;
}

export function createRoomViewEmbedPageOutlineReveal(embedPageLiveContext: CreateRoomViewEmbedPageOutlineRevealContext): Dynamic {
  return ((
      fileId3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      embedPageLiveContext.feed.send(
        options === `page`
          ? {
              type: `pageScrolled`,
              fileId: fileId3,
            }
          : {
              type: `personScrolled`,
              fileId: fileId3,
              now: Date.now(),
            },
      ));
}

export interface CreateRoomViewEmbedPageJumpHeadingContext {
  ApplicationRoutesSet: Dynamic;
  TABS_OUTLINE_HOLD_MS: Dynamic;
  feed: Dynamic;
  fileId2: Dynamic;
  memoized3: Dynamic;
  resolveDataOperationControlSlug: Dynamic;
  resolveDataOperationControlSlug2: Dynamic;
  setOutlineJump: Dynamic;
}

export function createRoomViewEmbedPageJumpHeading(embedPageLiveContext: CreateRoomViewEmbedPageJumpHeadingContext): Dynamic {
  return ((
      roomViewEmbedPage?: Dynamic,
      focus: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (embedPageLiveContext.fileId2 === undefined) return;
      (0, embedPageLiveContext.memoized3)((0, embedPageLiveContext.resolveDataOperationControlSlug)(roomViewEmbedPage), focus);
      let now2 = Date.now();
      embedPageLiveContext.feed.send({
        type: `pick`,
        fileId: embedPageLiveContext.fileId2,
        id: (0, embedPageLiveContext.resolveDataOperationControlSlug)(roomViewEmbedPage),
        now: now2,
      });
      embedPageLiveContext.ApplicationRoutesSet.set(
        (..._extraArguments: unknown[]): Dynamic =>
          embedPageLiveContext.feed.send({
            type: `expire`,
            when: now2,
          }),
        embedPageLiveContext.TABS_OUTLINE_HOLD_MS,
      );
      (0, embedPageLiveContext.setOutlineJump)(
        (
          roomViewEmbedPage2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          fileId: embedPageLiveContext.fileId2,
          frag: (0, embedPageLiveContext.resolveDataOperationControlSlug2)(roomViewEmbedPage),
          n: (roomViewEmbedPage2?.n ?? 0) + 1,
          focus: focus,
        }),
      );
    });
}

export interface CreateRoomViewEmbedPageHoldTabListContext {
  ApplicationRoutesSet: Dynamic;
  ONE_TAB_OUTLINE_HOLD_MS: Dynamic;
  oneTabList: Dynamic;
  setOneTabList: Dynamic;
}

export function createRoomViewEmbedPageHoldTabList(embedPageLiveContext: CreateRoomViewEmbedPageHoldTabListContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.oneTabList.holding) return;
      let set4: Dynamic = embedPageLiveContext.ApplicationRoutesSet.set(
        (..._extraArguments: unknown[]): Dynamic =>
          (0, embedPageLiveContext.setOneTabList)({
            type: `holdOver`,
          }),
        embedPageLiveContext.ONE_TAB_OUTLINE_HOLD_MS,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        embedPageLiveContext.ApplicationRoutesSet.clear(set4);
    });
}

export interface CreateRoomViewEmbedPageProjectFeedContext {
  foldOn: Dynamic;
  frame: Dynamic;
  onRenamed: Dynamic;
  pid2: Dynamic;
  subscribeProjectFeed: Dynamic;
}

export function createRoomViewEmbedPageProjectFeed(embedPageLiveContext: CreateRoomViewEmbedPageProjectFeedContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (embedPageLiveContext.pid2)
        return (0, embedPageLiveContext.subscribeProjectFeed)(
          embedPageLiveContext.pid2,
          (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            switch (entry.kind) {
              case `envelope`:
                if (embedPageLiveContext.foldOn) break;
                if (
                  entry.envelope.diff.some(
                    (diff?: Dynamic, ..._extraArguments: unknown[]) =>
                      diff.address?.ref?.object === `project`,
                  )
                ) {
                  (0, embedPageLiveContext.onRenamed)();
                }
                break;
              case `live`:
                if (embedPageLiveContext.frame) break;
                (0, embedPageLiveContext.onRenamed)();
                break;
              case `recovered`:
              case `access-changed`:
              case `revoked`:
                (0, embedPageLiveContext.onRenamed)();
                break;
              default:
                break;
            }
          },
        );
    });
}

export interface CreateRoomViewEmbedPageProjectItemsContext {
  apiFetcher: Dynamic;
  foldOn: Dynamic;
  pid3: Dynamic;
  setItemsState: Dynamic;
}

export function createRoomViewEmbedPageProjectItems(embedPageLiveContext: CreateRoomViewEmbedPageProjectItemsContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (embedPageLiveContext.foldOn) return;
      if (!embedPageLiveContext.pid3) {
        (0, embedPageLiveContext.setItemsState)([]);
        return;
      }
      let enabled3 = false;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let result: Dynamic = await (0, embedPageLiveContext.apiFetcher)(
          `/api/v3/files/${encodeURIComponent(embedPageLiveContext.pid3)}`,
        ).catch((..._extraArguments: unknown[]) => null);
        if (enabled3 || !result?.ok) return;
        let json: Dynamic = await result.json();
        if (!enabled3) {
          (0, embedPageLiveContext.setItemsState)(
            (json.files ?? []).map(
              (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                file.id,
            ),
          );
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        enabled3 = true;
      };
    });
}

export interface CreateRoomViewEmbedPageFileChoicesContext {
  placement: Dynamic;
  resolveSessionNavigationPath: Dynamic;
  roomViewEmbedPageResult18: Dynamic;
  roomViewEmbedPageResult19: Dynamic;
}

export function createRoomViewEmbedPageFileChoices(embedPageLiveContext: CreateRoomViewEmbedPageFileChoicesContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.roomViewEmbedPageResult18) return [];
      let sessionNavigationPath: Dynamic =
        (0, embedPageLiveContext.resolveSessionNavigationPath)(embedPageLiveContext.placement);
      let uniqueItems: Dynamic = new (Set as Dynamic)();
      let roomViewEmbedPageHandler3: Dynamic = (
        roomViewEmbedPage?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let roomViewEmbedPage2: Dynamic = roomViewEmbedPage;
        let count: number = 1;
        for (; uniqueItems.has(roomViewEmbedPage2); )
          roomViewEmbedPage2 = `${roomViewEmbedPage} (${(count += 1)})`;
        uniqueItems.add(roomViewEmbedPage2);
        return roomViewEmbedPage2;
      };
      for (let roomViewEmbedPageResult37 of sessionNavigationPath as Dynamic)
        if (
          (roomViewEmbedPageResult37.path.split(`/`).pop() ?? ``).length !== 0
        ) {
          if (uniqueItems.has(roomViewEmbedPageResult37.path)) {
            roomViewEmbedPageResult37.path = roomViewEmbedPageHandler3(
              roomViewEmbedPageResult37.path,
            );
          } else {
            uniqueItems.add(roomViewEmbedPageResult37.path);
          }
        }
      for (let roomViewEmbedPageResult37 of sessionNavigationPath as Dynamic)
        if (
          (roomViewEmbedPageResult37.path.split(`/`).pop() ?? ``).length === 0
        ) {
          roomViewEmbedPageResult37.path = roomViewEmbedPageHandler3(
            roomViewEmbedPageResult37.path + `Untitled`,
          );
        }
      for (let pageId of embedPageLiveContext.roomViewEmbedPageResult19 as Dynamic)
        if (!embedPageLiveContext.placement.has(pageId)) {
          sessionNavigationPath.push({
            path: roomViewEmbedPageHandler3(`Untitled`),
            size: 0,
            mtime: 0,
            pageId: pageId,
          });
        }
      return sessionNavigationPath;
    });
}

export interface CreateRoomViewEmbedPageInitialOutlineContext {
  feed: Dynamic;
  fileId2: Dynamic;
  getTabOutline: Dynamic;
  setOneTabList: Dynamic;
  shownForRoute: Dynamic;
}

export function createRoomViewEmbedPageInitialOutline(embedPageLiveContext: CreateRoomViewEmbedPageInitialOutlineContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (embedPageLiveContext.shownForRoute !== true || embedPageLiveContext.fileId2 === undefined) return;
      let outline: Dynamic = (0, embedPageLiveContext.getTabOutline)(embedPageLiveContext.feed.store.getState(), embedPageLiveContext.fileId2);
      if (outline !== null) {
        (0, embedPageLiveContext.setOneTabList)({
          type: `said`,
          fileId: embedPageLiveContext.fileId2,
          outline: outline,
          shown: true,
        });
      }
    });
}

export interface CreateRoomViewEmbedPagePreviewDelayContext {
  ApplicationRoutesSet: Dynamic;
  ONE_TAB_OUTLINE_SILENCE_MS: Dynamic;
  setOneTabList: Dynamic;
  silent: Dynamic;
}

export function createRoomViewEmbedPagePreviewDelay(embedPageLiveContext: CreateRoomViewEmbedPagePreviewDelayContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.silent) return;
      let set4: Dynamic = embedPageLiveContext.ApplicationRoutesSet.set(
        (..._extraArguments: unknown[]): Dynamic =>
          (0, embedPageLiveContext.setOneTabList)({
            type: `silentOver`,
          }),
        embedPageLiveContext.ONE_TAB_OUTLINE_SILENCE_MS,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        embedPageLiveContext.ApplicationRoutesSet.clear(set4);
    });
}

export interface CreateRoomViewEmbedPageFollowParticipantContext {
  following: Dynamic;
  roomViewEmbedPageResult24: Dynamic;
  toast: Dynamic;
}

export function createRoomViewEmbedPageFollowParticipant(embedPageLiveContext: CreateRoomViewEmbedPageFollowParticipantContext): Dynamic {
  return (({ ["onFollow"]: (
    roomViewEmbedPage?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (embedPageLiveContext.following === roomViewEmbedPage) {
      (0, embedPageLiveContext.roomViewEmbedPageResult24)(null);
      embedPageLiveContext.toast.dismiss(`follow`);
    } else {
      (0, embedPageLiveContext.roomViewEmbedPageResult24)(roomViewEmbedPage);
      (0, embedPageLiveContext.toast)(`Following ${options}`, {
        id: `follow`,
        duration: 5e3,
      });
    }
  } })["onFollow"]);
}

export interface CreateRoomViewEmbedPageFollowNavigationContext {
  container2: Dynamic;
  enabled: Dynamic;
  enabledRef3: Dynamic;
  following: Dynamic;
  id2: Dynamic;
  memoized4: Dynamic;
  navigate: Dynamic;
  nodeId: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
}

export function createRoomViewEmbedPageFollowNavigation(embedPageLiveContext: CreateRoomViewEmbedPageFollowNavigationContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.following || !embedPageLiveContext.id2 || embedPageLiveContext.id2 === embedPageLiveContext.nodeId || !embedPageLiveContext.memoized4.has(embedPageLiveContext.id2)) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          embedPageLiveContext.enabledRef3.current = true;
          (0, embedPageLiveContext.navigate)(
            (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
              container: embedPageLiveContext.container2,
              ref: {
                noun: `file`,
                id: embedPageLiveContext.id2,
              },
            }) + (embedPageLiveContext.enabled ? `?chrome=embed` : ``),
            {
              replace: true,
            },
          );
        },
        250,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    });
}

export interface CreateRoomViewEmbedPagePresenceContext {
  elementRef2: Dynamic;
  isDocumentHostStateKind: Dynamic;
  nameOf: Dynamic;
  resolveDocumentHostStateValue8: Dynamic;
  resolvePlatformApiAndAuthFile2: Dynamic;
  roomViewEmbedPageResult23: Dynamic;
  updatePlatformApiAndAuthSize: Dynamic;
}

export function createRoomViewEmbedPagePresence(embedPageLiveContext: CreateRoomViewEmbedPagePresenceContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      let roomViewEmbedPageResult37: Dynamic = (0, embedPageLiveContext.updatePlatformApiAndAuthSize)(
        embedPageLiveContext.elementRef2.current,
        (0, embedPageLiveContext.resolvePlatformApiAndAuthFile2)(embedPageLiveContext.roomViewEmbedPageResult23, {
          nameOf: embedPageLiveContext.nameOf,
          colorOf: embedPageLiveContext.resolveDocumentHostStateValue8,
          named: embedPageLiveContext.isDocumentHostStateKind,
        }),
      );
      embedPageLiveContext.elementRef2.current = roomViewEmbedPageResult37;
      return roomViewEmbedPageResult37;
    });
}

export interface CreateRoomViewEmbedPageSelectFileContext {
  container2: Dynamic;
  navigate: Dynamic;
  objectFiles: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
}

export function createRoomViewEmbedPageSelectFile(embedPageLiveContext: CreateRoomViewEmbedPageSelectFileContext): Dynamic {
  return ((roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let pageId: Dynamic = embedPageLiveContext.objectFiles.find(
        (objectFile?: Dynamic, ..._extraArguments: unknown[]) =>
          objectFile.path === roomViewEmbedPage,
      )?.pageId;
      if (pageId) {
        (0, embedPageLiveContext.navigate)(
          (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
            container: embedPageLiveContext.container2,
            ref: {
              noun: `file`,
              id: pageId,
            },
          }),
        );
      }
    });
}

export interface CreateRoomViewEmbedPageOpenFileContext {
  container2: Dynamic;
  navigate: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolveDataContentAndReferencesKind2: Dynamic;
  resolveDataContentAndReferencesTest5: Dynamic;
}

export function createRoomViewEmbedPageOpenFile(embedPageLiveContext: CreateRoomViewEmbedPageOpenFileContext): Dynamic {
  return ((roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        roomViewEmbedPage !== undefined &&
        !(0, embedPageLiveContext.resolveDataContentAndReferencesTest5)(roomViewEmbedPage)
      )
        return;
      let query = new URLSearchParams(location.search);
      query.delete(`path`);
      let queryText = query.toString();
      (0, embedPageLiveContext.navigate)(
        (roomViewEmbedPage === undefined
          ? (0, embedPageLiveContext.resolveDataContentAndReferencesKind2)(embedPageLiveContext.container2)
          : (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
              container: embedPageLiveContext.container2,
              ref: {
                noun: `file`,
                id: roomViewEmbedPage,
              },
            })) + (queryText ? `?${queryText}` : ``),
        {
          replace: true,
        },
      );
    });
}

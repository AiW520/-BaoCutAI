// BaoCut: extracted embed sources callbacks; state stays with the component.
import type { Dynamic } from "./types";

export interface CreateRoomViewEmbedPageSourceDrillContext {
  collectPlatformLiveDocumentAndHistoryKind: Dynamic;
  navigate: Dynamic;
  resolvePlatformApiAndAuthStartsWith: Dynamic;
  resolvePlatformLiveDocumentAndHistoryKind4: Dynamic;
}

export function createRoomViewEmbedPageSourceDrill(embedPageLiveContext: CreateRoomViewEmbedPageSourceDrillContext): Dynamic {
  return ((entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let queryEntry2 = new URLSearchParams(window.location.search).get(`src`);
      let roomViewEmbedPageResult37 =
        entry === null || entry.kind === `routines` || entry.kind === `sources`
          ? null
          : (0, embedPageLiveContext.collectPlatformLiveDocumentAndHistoryKind)(entry);
      if (
        (roomViewEmbedPageResult37 === null
          ? null
          : decodeURIComponent(roomViewEmbedPageResult37)) === queryEntry2
      )
        return;
      let query = new URLSearchParams(window.location.search);
      query.delete(`src`);
      let filteredItemsText = [
        query.toString(),
        roomViewEmbedPageResult37 === null
          ? ``
          : `src=${roomViewEmbedPageResult37}`,
      ]
        .filter((item?: Dynamic, ..._extraArguments: unknown[]) => item !== ``)
        .join(`&`);
      (0, embedPageLiveContext.navigate)(
        (0, embedPageLiveContext.resolvePlatformApiAndAuthStartsWith)(window.location.pathname) +
          (filteredItemsText === `` ? `` : `?${filteredItemsText}`) +
          window.location.hash,
        {
          replace: !(
            roomViewEmbedPageResult37 !== null &&
            (0, embedPageLiveContext.resolvePlatformLiveDocumentAndHistoryKind4)(queryEntry2) === null
          ),
        },
      );
    });
}

export interface CreateRoomViewEmbedPageSourceAvailabilityContext {
  apiFetcher: Dynamic;
  enabled2: Dynamic;
  loadApplicationRootRows: Dynamic;
  pid3: Dynamic;
  resolveApplicationRootKind: Dynamic;
  setEnabledState2: Dynamic;
  subscribeProjectFeed: Dynamic;
}

export function createRoomViewEmbedPageSourceAvailability(embedPageLiveContext: CreateRoomViewEmbedPageSourceAvailabilityContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      (0, embedPageLiveContext.setEnabledState2)(false);
      if (!embedPageLiveContext.pid3 || embedPageLiveContext.enabled2) return;
      let enabled3 = true;
      let enabled4 = false;
      let enabled5 = false;
      let readRowsCount: Dynamic = async (
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        let response: Dynamic = await (0, embedPageLiveContext.apiFetcher)(
          `/api/v3/project/${encodeURIComponent(embedPageLiveContext.pid3)}/staged-runs`,
        );
        if (!response.ok)
          throw Error(`staged-runs read failed (${response.status})`);
        return (await response.json()).rows.length;
      };
      let result = (..._extraArguments: unknown[]): undefined => {
        if (enabled4) {
          enabled5 = true;
          return;
        }
        enabled4 = true;
        let enabled6 = false;
        let enabled7 = false;
        Promise.all([
          (0, embedPageLiveContext.loadApplicationRootRows)(embedPageLiveContext.pid3).then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              (enabled6 = true),
              result2.rows.length
            ),
            (..._extraArguments: unknown[]) => 0,
          ),
          readRowsCount().then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              (enabled7 = true),
              result2
            ),
            (..._extraArguments: unknown[]) => 0,
          ),
        ])
          .then(
            (
              [result2, result3]: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (enabled3 && (enabled6 || enabled7)) {
                (0, embedPageLiveContext.setEnabledState2)(result2 > 0 || result3 > 0);
              }
            },
          )
          .finally((..._extraArguments: unknown[]): undefined => {
            enabled4 = false;
            if (enabled5 && enabled3) {
              enabled5 = false;
              result();
            }
          });
      };
      result();
      let roomViewEmbedPageResult37: Dynamic = (0, embedPageLiveContext.subscribeProjectFeed)(
        embedPageLiveContext.pid3,
        (
          roomViewEmbedPage?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if ((0, embedPageLiveContext.resolveApplicationRootKind)(roomViewEmbedPage)) {
            result();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled3 = false;
        roomViewEmbedPageResult37();
      };
    });
}

export interface CreateRoomViewEmbedPageSourceSubscriptionContext {
  enabled2: Dynamic;
  onOpenSources: Dynamic;
  resolveCommentsActionsAndSelectionValue3: Dynamic;
}

export function createRoomViewEmbedPageSourceSubscription(embedPageLiveContext: CreateRoomViewEmbedPageSourceSubscriptionContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.enabled2) {
        (0, embedPageLiveContext.resolveCommentsActionsAndSelectionValue3)(
          (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (0, embedPageLiveContext.onOpenSources)(
              entry.kind === `routine`
                ? {
                    kind: `routine`,
                    ref: entry.ref,
                  }
                : {
                    kind: `database`,
                    ref: entry.ref,
                  },
            ),
        );
        return (..._extraArguments: unknown[]) =>
          (0, embedPageLiveContext.resolveCommentsActionsAndSelectionValue3)(null);
      }
    });
}

export interface CreateRoomViewEmbedPageSourceNavigationContext {
  collectPlatformLiveDocumentAndHistoryKind: Dynamic;
  isPlatformLiveDocumentAndHistoryDelete: Dynamic;
  navigate: Dynamic;
  platformLiveDocumentAndHistoryModalModalRefValues: Dynamic;
  resolvePlatformApiAndAuthStartsWith: Dynamic;
}

export function createRoomViewEmbedPageSourceNavigation(embedPageLiveContext: CreateRoomViewEmbedPageSourceNavigationContext): Dynamic {
  return ((roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let query = new URLSearchParams(window.location.search);
      if (
        !embedPageLiveContext.platformLiveDocumentAndHistoryModalModalRefValues.some(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            query.get(item) !== null,
        ) &&
        roomViewEmbedPage === null
      )
        return;
      (0, embedPageLiveContext.isPlatformLiveDocumentAndHistoryDelete)(query, null);
      if (roomViewEmbedPage !== null) {
        query.delete(`src`);
      }
      let filteredItemsText = [
        query.toString(),
        roomViewEmbedPage === null
          ? ``
          : `src=${(0, embedPageLiveContext.collectPlatformLiveDocumentAndHistoryKind)(roomViewEmbedPage)}`,
      ]
        .filter((item?: Dynamic, ..._extraArguments: unknown[]) => item !== ``)
        .join(`&`);
      (0, embedPageLiveContext.navigate)(
        (0, embedPageLiveContext.resolvePlatformApiAndAuthStartsWith)(window.location.pathname) +
          (filteredItemsText === `` ? `` : `?${filteredItemsText}`) +
          window.location.hash,
        {
          replace: true,
        },
      );
    });
}

export interface CreateRoomViewEmbedPageChipNavigationContext {
  ObservabilityBrowserAndOperationEventsRoutine: Dynamic;
  container2: Dynamic;
  countRef: Dynamic;
  loadApplicationRootRows: Dynamic;
  navigate: Dynamic;
  objectFiles: Dynamic;
  onOpenSources: Dynamic;
  pid2: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolveEditorAnchorsAndMentionsValue10: Dynamic;
  toast: Dynamic;
}

export function createRoomViewEmbedPageChipNavigation(embedPageLiveContext: CreateRoomViewEmbedPageChipNavigationContext): Dynamic {
  return ((
      { file: file, hash: hash }: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let label2 = hash ? `#${encodeURIComponent(hash)}` : ``;
      let pageId: Dynamic = embedPageLiveContext.objectFiles.find(
        (objectFile?: Dynamic, ..._extraArguments: unknown[]) =>
          objectFile.path === file,
      )?.pageId;
      if (pageId !== undefined) {
        (0, embedPageLiveContext.navigate)(
          (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
            container: embedPageLiveContext.container2,
            ref: {
              noun: `file`,
              id: pageId,
            },
          }) + label2,
        );
        return;
      }
      if (file.startsWith(`.routine/`)) {
        let fileSlice: Dynamic = file.slice(
          embedPageLiveContext.ObservabilityBrowserAndOperationEventsRoutine.length,
        );
        let count: Dynamic = embedPageLiveContext.countRef.current;
        (async (..._extraArguments: unknown[]): Promise<undefined> => {
          let { rows: result }: Dynamic = await (0, embedPageLiveContext.loadApplicationRootRows)(
            embedPageLiveContext.pid2,
          ).catch(
            (..._extraArguments: unknown[]): Dynamic => ({
              rows: [],
            }),
          );
          if (embedPageLiveContext.countRef.current !== count) return;
          let result2: Dynamic = result.find(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              item.id === fileSlice,
          );
          let items: Dynamic = result2
            ? [result2]
            : result.filter(
                (item?: Dynamic, ..._extraArguments: unknown[]) =>
                  item.name === fileSlice,
              );
          let itemItem: Dynamic = items.length === 1 ? items[0] : undefined;
          if (itemItem?.id === undefined) {
            embedPageLiveContext.toast.error(`That routine isn't available in this project`);
          } else {
            (0, embedPageLiveContext.navigate)(
              (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
                container: embedPageLiveContext.container2,
                ref: {
                  noun: `routine`,
                  id: itemItem.id,
                },
              }) + label2,
            );
          }
        })();
        return;
      }
      if ((0, embedPageLiveContext.resolveEditorAnchorsAndMentionsValue10)(file) === `routine`) {
        (0, embedPageLiveContext.onOpenSources)({
          kind: `routine`,
          ref: file.replace(/^(?:routines\/|routine[:/])/, ``),
        });
        return;
      }
      if ((0, embedPageLiveContext.resolveEditorAnchorsAndMentionsValue10)(file) === `file`) {
        let replace: Dynamic = file.replace(/^files?\//, ``);
        if (
          embedPageLiveContext.objectFiles.some(
            (objectFile?: Dynamic, ..._extraArguments: unknown[]) =>
              objectFile.pageId === replace,
          )
        ) {
          (0, embedPageLiveContext.navigate)(
            (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
              container: embedPageLiveContext.container2,
              ref: {
                noun: `file`,
                id: replace,
              },
            }) + label2,
          );
          return;
        }
        embedPageLiveContext.toast.error(`That file isn't in this project`);
        return;
      }
      embedPageLiveContext.toast.error(`That link isn't available here yet`);
    });
}

export interface CreateRoomViewEmbedPageQueryNavigationContext {
  container2: Dynamic;
  matchesQueryEntry: Dynamic;
  navigate: Dynamic;
  objectFiles: Dynamic;
  queryEntry: Dynamic;
  resolveDataContentAndReferencesKind: Dynamic;
  resolveDataContentAndReferencesTest5: Dynamic;
  set2: Dynamic;
}

export function createRoomViewEmbedPageQueryNavigation(embedPageLiveContext: CreateRoomViewEmbedPageQueryNavigationContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (embedPageLiveContext.set2?.fileId || embedPageLiveContext.queryEntry === undefined || embedPageLiveContext.matchesQueryEntry) return;
      let pageId: Dynamic = embedPageLiveContext.objectFiles.find(
        (objectFile?: Dynamic, ..._extraArguments: unknown[]) =>
          objectFile.path === embedPageLiveContext.queryEntry,
      )?.pageId;
      if (!pageId || !(0, embedPageLiveContext.resolveDataContentAndReferencesTest5)(pageId)) return;
      let query = new URLSearchParams(location.search);
      query.delete(`path`);
      let queryText = query.toString();
      (0, embedPageLiveContext.navigate)(
        (0, embedPageLiveContext.resolveDataContentAndReferencesKind)({
          container: embedPageLiveContext.container2,
          ref: {
            noun: `file`,
            id: pageId,
          },
        }) + (queryText ? `?${queryText}` : ``),
        {
          replace: true,
        },
      );
    });
}

export interface CreateRoomViewEmbedPageReferenceLookupContext {
  placement: Dynamic;
  resolveDataContentAndReferencesTest5: Dynamic;
  resolvePlatformSessionAndSourcesKind: Dynamic;
  roomViewEmbedPageResult8: Dynamic;
}

export function createRoomViewEmbedPageReferenceLookup(embedPageLiveContext: CreateRoomViewEmbedPageReferenceLookupContext): Dynamic {
  return ((roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let storeEntry: Dynamic = embedPageLiveContext.roomViewEmbedPageResult8.store.get(
        embedPageLiveContext.roomViewEmbedPageResult8.refIndexAtom,
      );
      return (0, embedPageLiveContext.resolvePlatformSessionAndSourcesKind)(
        roomViewEmbedPage,
        (
          roomViewEmbedPage2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          embedPageLiveContext.placement.has(roomViewEmbedPage2) &&
          (0, embedPageLiveContext.resolveDataContentAndReferencesTest5)(roomViewEmbedPage2),
        (
          roomViewEmbedPage2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => storeEntry.get(roomViewEmbedPage2),
      );
    });
}

export interface CreateRoomViewEmbedPagePageLookupContext {
  frame: Dynamic;
  resolveEditorSelectionAndTablesHash: Dynamic;
  resolvePlatformLiveDocumentAndHistoryByPage: Dynamic;
  tabOfPage: Dynamic;
}

export function createRoomViewEmbedPagePageLookup(embedPageLiveContext: CreateRoomViewEmbedPagePageLookupContext): Dynamic {
  return ((hash?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (!embedPageLiveContext.frame) return;
      let roomViewEmbedPageResult37: Dynamic =
        (0, embedPageLiveContext.resolveEditorSelectionAndTablesHash)({
          hash: hash,
        });
      let roomViewEmbedPageResult38: Dynamic =
        roomViewEmbedPageResult37 === null
          ? null
          : (0, embedPageLiveContext.resolvePlatformLiveDocumentAndHistoryByPage)(
              roomViewEmbedPageResult37,
            );
      return roomViewEmbedPageResult38 === null
        ? undefined
        : (0, embedPageLiveContext.tabOfPage)(roomViewEmbedPageResult38);
    });
}

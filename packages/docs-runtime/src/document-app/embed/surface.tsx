// BaoCut: extracted embed surface callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateRoomViewEmbedPageExportContext {
  beginDocumentExport: Dynamic;
  nodeId: Dynamic;
  placement: Dynamic;
  role: Dynamic;
  room: Dynamic;
  roomViewEmbedPageResult29: Dynamic;
  viewerClass: Dynamic;
}

export function createRoomViewEmbedPageExport(embedPageLiveContext: CreateRoomViewEmbedPageExportContext): Dynamic {
  return (({ ["roomViewEmbedPageHandler"]: (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]) =>
      (0, embedPageLiveContext.beginDocumentExport)(
        {
          room: embedPageLiveContext.room,
          fileId: embedPageLiveContext.nodeId,
          tabName:
            embedPageLiveContext.nodeId === undefined ? `` : (embedPageLiveContext.placement.get(embedPageLiveContext.nodeId)?.name ?? ``),
          role: embedPageLiveContext.role,
          viewerClass: embedPageLiveContext.viewerClass,
          inFlight: embedPageLiveContext.roomViewEmbedPageResult29.inFlight,
          setInFlight: embedPageLiveContext.roomViewEmbedPageResult29.setInFlight,
        },
        roomViewEmbedPage,
      ) })["roomViewEmbedPageHandler"]);
}

export interface CreateRoomViewEmbedPagePrintContext {
  createRequestedDownloadAction: Dynamic;
  frameDeclineExport: Dynamic;
  roomViewEmbedPageHandler: Dynamic;
}

export function createRoomViewEmbedPagePrint(embedPageLiveContext: CreateRoomViewEmbedPagePrintContext): Dynamic {
  return (({ ["roomViewEmbedPageHandler2"]: (
    roomViewEmbedPage?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(0, embedPageLiveContext.roomViewEmbedPageHandler)(
        (0, embedPageLiveContext.createRequestedDownloadAction)(
          roomViewEmbedPage,
          options,
          embedPageLiveContext.frameDeclineExport,
          context,
        ),
      )()
    ) {
      (0, embedPageLiveContext.frameDeclineExport)(options);
    }
  } })["roomViewEmbedPageHandler2"]);
}

export interface CreateRoomViewEmbedPagePlacementWaiterContext {
  createFilePlacementWaiter: Dynamic;
  onRenamedRef: Dynamic;
  recordRef: Dynamic;
  resolveSessionNavigationValue2: Dynamic;
}

export function createRoomViewEmbedPagePlacementWaiter(embedPageLiveContext: CreateRoomViewEmbedPagePlacementWaiterContext): Dynamic {
  return ((..._extraArguments: unknown[]) =>
      (0, embedPageLiveContext.createFilePlacementWaiter)({
        post: embedPageLiveContext.resolveSessionNavigationValue2,
        onNamed: (
          roomViewEmbedPage?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (embedPageLiveContext.recordRef.current.pid === roomViewEmbedPage) {
            embedPageLiveContext.onRenamedRef.current();
          }
        },
      }));
}

export interface CreateRoomViewEmbedPageTitleCommitContext {
  filePlacementWaiterState: Dynamic;
  frameTitlePropose: Dynamic;
  recordRef: Dynamic;
  updatePlatformSyncAndRoutingEntry: Dynamic;
}

export function createRoomViewEmbedPageTitleCommit(embedPageLiveContext: CreateRoomViewEmbedPageTitleCommitContext): Dynamic {
  return ((
      page3?: Dynamic,
      title?: Dynamic,
      was?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let record2: Dynamic = embedPageLiveContext.recordRef.current;
      if (!(record2.pid === `` || page3.pid !== record2.pid)) {
        (0, embedPageLiveContext.filePlacementWaiterState)(record2.pid, {
          title: title,
          canRename: record2.canRename,
          projectName: record2.projectName,
          placement: record2.placement,
          fileId: page3.fileId,
          was: was,
        });
        (0, embedPageLiveContext.frameTitlePropose)(record2.pid, {
          canRename: record2.canRename,
          role: record2.viewerRole,
          firstTab:
            (0, embedPageLiveContext.updatePlatformSyncAndRoutingEntry)(record2.placement)[0]?.id ===
            page3.fileId,
          title: title,
          was: was,
        });
      }
    });
}

export interface CreateRoomViewEmbedPageFirstHeadingContext {
  frameTitleFromContent: Dynamic;
  recordRef: Dynamic;
  updatePlatformSyncAndRoutingEntry: Dynamic;
}

export function createRoomViewEmbedPageFirstHeading(embedPageLiveContext: CreateRoomViewEmbedPageFirstHeadingContext): Dynamic {
  return ((
      page3?: Dynamic,
      title?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let record2: Dynamic = embedPageLiveContext.recordRef.current;
      if (!(record2.pid === `` || page3.pid !== record2.pid)) {
        (0, embedPageLiveContext.frameTitleFromContent)(record2.pid, {
          canRename: record2.canRename,
          role: record2.viewerRole,
          firstTab:
            (0, embedPageLiveContext.updatePlatformSyncAndRoutingEntry)(record2.placement)[0]?.id ===
            page3.fileId,
          title: title,
        });
      }
    });
}

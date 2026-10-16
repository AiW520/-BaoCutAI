/** BaoCut: ask cards from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Badge,
  Button,
  EditorHostBadge,
  PlatformSyncAndRoutingDialog,
  Popover,
  QUICK_EMOJI,
  Tooltip,
  clearPlatformFeatureFlagsDelete,
  emitTelemetryEvent,
  frameAskDriveConsent,
  frameAskNotionConsent,
  frameConnectorsWithheld,
  frameCreateNotionPage,
  frameDownloadsAvailable,
  frameDownloadsAvailableWithin,
  frameDriveFileArgs,
  frameEdgeNow,
  frameExportViaMcp,
  frameSaveDownload,
  frameUploadToDrive,
  recordFramePhase,
  resolveCommentsStoreLayer,
  resolveDataContentAndReferencesTest5,
  resolveEditorExtensionsValue6,
  resolveObservabilityBootPaint2,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolvePlatformAnnouncementsToUpperCase,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSessionAndSourcesKind,
  resolvePlatformSessionAndSourcesRest,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingValue10,
  toast,
  updatePlatformSyncAndRoutingDirectory,
  updatePlatformSyncAndRoutingEntry,
  useCommentStore,
  viewerLanguages,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  DOCUMENT_EXPORT_FORMATS,
  EXPORT_AS_WORD_LABEL,
  GOOGLE_DOCS_EXPORTING_MESSAGE,
  NOTION_EXPORTING_MESSAGE,
  canExportForRole,
  canFallbackGoogleDocsExport,
  documentDownloadError,
  downloadDroppedPictureNotice,
  downloadExportTelemetry,
  downloadSuccessToast,
  exportDocumentDownload,
  exportToGoogleDocs,
  exportToNotion,
  googleDocsConsentNotice,
  googleDocsDroppedPictureNotice,
  googleDocsExportError,
  googleDocsExportSuccess,
  googleDocsExportTelemetry,
  googleDocsReconnectAction,
  googleDocsToolError,
  notionConsentNotice,
  notionExportError,
  notionExportSuccess,
  notionExportTelemetry,
  notionToolError,
  preferredPaperSize,
  simplifiedDownloadNotice,
} from "../document-export/export-to-google-docs";
import {
  documentExportTelemetryEvent,
} from "../document-export/telemetry-event";
import type * as ReactComponentTypes from "react";

export const DocumentPosturePopover: ReactComponentTypes.FC<Dynamic> = ({
  chip: chip,
  tip: tip,
}) => {
  let [open, setOpen]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) return;
      let setOpen2: Dynamic = (..._extraArguments: unknown[]): Dynamic => setOpen(false);
      let documentPosturePopoverResult: Dynamic =
        clearPlatformFeatureFlagsDelete(setOpen2);
      window.addEventListener(`blur`, setOpen2);
      return (..._extraArguments: unknown[]): undefined => {
        documentPosturePopoverResult();
        window.removeEventListener(`blur`, setOpen2);
      };
    },
    [open],
  );
  return (
    <Popover.Root
      open={open}
      onOpenChange={(
        documentPosturePopover?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => setOpen(documentPosturePopover)}
    >
      <Popover.Trigger nativeButton={false} render={chip} />
      <Popover.Popup
        side={`bottom`}
        align={`start`}
        padding={`md`}
        className={`w-64`}
        data-testid={`phone-comment-popover`}
      >
        <Popover.Description className={`text-footnote text-secondary`}>
          {tip}
        </Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
};

export const DocumentPostureBadge: ReactComponentTypes.FC<Dynamic> = ({
  className = ``,
  posture = `view`,
  reason: reason,
  chrome = `plate`,
  size: size,
}) => {
  let matchesPosture: boolean = posture === `comment`;
  let matchesPosture2: Dynamic = matchesPosture && reason === `phone`;
  let ariaDescription: Dynamic = matchesPosture
    ? matchesPosture2
      ? PHONE_COMMENT_ONLY_MESSAGE
      : COMMENT_ONLY_RESTRICTION_MESSAGE
    : VIEW_ONLY_RESTRICTION;
  let ariaLabel: Dynamic = matchesPosture2
    ? COMMENT_ONLY_LABEL
    : DOCUMENT_POSTURE_LABELS[posture];
  let record: Dynamic = matchesPosture2
    ? {}
    : {
        role: `status`,
      };
  let documentPostureBadgeResult: Dynamic = resolvePlatformSyncAndRoutingValue10();
  let matchesChrome: boolean = chrome === `plate`;
  let size2: Dynamic =
    size ??
    (matchesChrome && documentPostureBadgeResult ? EditorHostBadge.badge : undefined);
  let chip: Dynamic = (
    <Badge
      variant={`neutral`}
      size={size2}
      icon={matchesPosture ? `Chat` : `Lock`}
      {...record}
      aria-label={ariaLabel}
      aria-description={ariaDescription}
      data-testid={`roomview-view-only`}
      data-posture={posture}
      className={matchesChrome ? `select-none` : `select-none ${className}`}
    >
      {ariaLabel}
    </Badge>
  );
  let jsx: Dynamic = matchesPosture2 ? (
    <DocumentPosturePopover chip={chip} tip={ariaDescription} />
  ) : (
    <Tooltip content={ariaDescription} side={`bottom`}>
      {chip}
    </Tooltip>
  );
  return matchesChrome ? (
    <span
      data-size={size2}
      data-testid={`roomview-view-only-plate`}
      className={`bg-surface-popover rounded-chip inline-flex shrink-0 self-center ${className}`}
    >
      {jsx}
    </span>
  ) : (
    jsx
  );
};

export const ImagePreview: ReactComponentTypes.FC<Dynamic> = ({ src: src }) => {
  return (
    <div className={`flex h-full items-center justify-center overflow-auto p-4`}>
      <img src={src} alt={``} className={`max-h-full max-w-full object-contain`} />
    </div>
  );
};

function exportToolTelemetryLabel(
  result?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (result.tool !== undefined)
    return result.shape === undefined || result.failClass === undefined
      ? result.tool
      : `${result.tool}:${result.shape}:${result.failClass}`;
}

function sendExportTelemetry(
  sendExportTelemetry2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = emitTelemetryEvent,
  ..._extraArguments: unknown[]
): undefined {
  try {
    context(
      documentExportTelemetryEvent(
        sendExportTelemetry2,
        options,
        resolveObservabilityBrowserAndOperationEventsValue3(),
      ),
    );
  } catch {}
}

var googleDocsExportReporter: Dynamic;

var downloadExportReporter: Dynamic;

var notionExportReporter: Dynamic;

function showExportOutcome(
  showExportOutcome2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let storeState: Dynamic = PlatformSyncAndRoutingDialog.getState();
  if (showExportOutcome2.said === null) {
    if (showExportOutcome2.hint) {
      storeState.done(showExportOutcome2.hint);
    } else {
      if (showExportOutcome2.notice) {
        storeState.done(showExportOutcome2.notice);
      } else {
        if (showExportOutcome2.done) {
          storeState.done({
            ...showExportOutcome2.done,
            ...(showExportOutcome2.url === undefined
              ? {}
              : {
                  url: showExportOutcome2.url,
                }),
          });
        } else {
          storeState.clear();
          if (showExportOutcome2.spoken) {
            resolvePlatformAnnouncementsValue(
              typeof document === "undefined" ? null : document,
              showExportOutcome2.spoken,
              {
                key: `export`,
              },
            );
          }
        }
      }
    }
  } else {
    storeState.done({
      title: `Couldn't export ${showExportOutcome2.lead}`,
      description: showExportOutcome2.detail
        ? `${showExportOutcome2.said} ${showExportOutcome2.detail}`
        : showExportOutcome2.said,
      ...(showExportOutcome2.link
        ? {
            url: showExportOutcome2.link.url,
            urlLabel: showExportOutcome2.link.label,
          }
        : {}),
      ...(showExportOutcome2.action === undefined
        ? {}
        : {
            action: showExportOutcome2.action,
          }),
    });
  }
}

var googleDocsExportAction: (options: Dynamic, ..._extraArguments: unknown[]) => Promise<undefined>;

var EXPORT_OUTCOME_DELAY_MS: number;

function wordExportFallbackAction(
  wordExportFallbackAction2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      options === undefined ||
      !context ||
      !canFallbackGoogleDocsExport(wordExportFallbackAction2)
    )
  )
    return {
      label: EXPORT_AS_WORD_LABEL,
      run: (..._extraArguments: unknown[]): Dynamic => options(exportAsWord),
    };
}

var createDownloadExportAction: Dynamic;

var exportAsWord: Dynamic;

var exportAsPdf: Dynamic;

var exportAsMarkdown: Dynamic;

var createRequestedDownloadAction: Dynamic;

var notionExportAction: (options: Dynamic, ..._extraArguments: unknown[]) => Promise<undefined>;

function beginDocumentExport(
  beginDocumentExport2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let { room: room, fileId: fileId }: Dynamic = beginDocumentExport2;
  if (
    room === undefined ||
    fileId === undefined ||
    beginDocumentExport2.inFlight !== null ||
    !canExportForRole(
      beginDocumentExport2.role,
      beginDocumentExport2.viewerClass,
    )
  )
    return false;
  beginDocumentExport2.setInFlight(fileId);
  let setInFlight: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    beginDocumentExport2.setInFlight(null);
  if (PlatformSyncAndRoutingDialog.getState().dialog?.phase === `done`) {
    PlatformSyncAndRoutingDialog.getState().clear();
  }
  options({
    room: room,
    fileId: fileId,
    tabName: beginDocumentExport2.tabName,
    startAnother: (
      beginDocumentExport3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      beginDocumentExport(
        {
          ...beginDocumentExport2,
          inFlight: null,
        },
        beginDocumentExport3,
      );
    },
  }).then(setInFlight, setInFlight);
  return true;
}

var VIEW_ONLY_RESTRICTION: Dynamic;

var COMMENT_ONLY_RESTRICTION_MESSAGE: string;

var PHONE_COMMENT_ONLY_MESSAGE: string;

var DOCUMENT_POSTURE_LABELS: Dynamic;

var COMMENT_ONLY_LABEL: string;

var documentPosture: (documentPosture2?: Dynamic, ..._extraArguments: unknown[]) => "comment" | "edit" | "view";

var MAX_SCROLL_MEMORY_ENTRIES: number;

var DOCUMENT_SCROLL_STORAGE_KEY: string;

var documentScrollPositions: Dynamic;

var documentScrollStorage: Dynamic;

var documentScrollStorageInitialized: boolean;

function getDocumentScrollStorage(..._extraArguments: unknown[]): Dynamic {
  if (!documentScrollStorageInitialized) {
    documentScrollStorageInitialized = true;
    try {
      documentScrollStorage ??=
        typeof sessionStorage !== "undefined" ? sessionStorage : undefined;
    } catch {
      documentScrollStorage = undefined;
    }
  }
  return documentScrollStorage;
}

var documentScrollPositionsLoaded: boolean;

function loadDocumentScrollPositions(..._extraArguments: unknown[]): undefined {
  if (documentScrollPositionsLoaded) return;
  documentScrollPositionsLoaded = true;
  let loadDocumentScrollPositionsResult: Dynamic = null;
  try {
    loadDocumentScrollPositionsResult =
      getDocumentScrollStorage()?.getItem(DOCUMENT_SCROLL_STORAGE_KEY) ?? null;
  } catch {
    return;
  }
  if (!loadDocumentScrollPositionsResult) return;
  let loadDocumentScrollPositionsResult2: Dynamic;
  try {
    loadDocumentScrollPositionsResult2 = JSON.parse(
      loadDocumentScrollPositionsResult,
    );
  } catch {
    return;
  }
  if (
    !(
      !loadDocumentScrollPositionsResult2 ||
      typeof loadDocumentScrollPositionsResult2 != `object` ||
      Array.isArray(loadDocumentScrollPositionsResult2)
    )
  ) {
    for (let [
      loadDocumentScrollPositionsResult3,
      loadDocumentScrollPositionsResult4,
    ] of Object.entries(loadDocumentScrollPositionsResult2) as Dynamic)
      if (
        !(
          typeof loadDocumentScrollPositionsResult4 != `number` ||
          !Number.isFinite(loadDocumentScrollPositionsResult4) ||
          loadDocumentScrollPositionsResult4 <= 0
        ) &&
        (documentScrollPositions.set(
          loadDocumentScrollPositionsResult3,
          loadDocumentScrollPositionsResult4,
        ),
        documentScrollPositions.size >= MAX_SCROLL_MEMORY_ENTRIES)
      )
        break;
  }
}

function saveDocumentScrollPositions(..._extraArguments: unknown[]): undefined {
  let documentScrollStorage2: Dynamic = getDocumentScrollStorage();
  if (documentScrollStorage2)
    try {
      if (documentScrollPositions.size === 0) {
        documentScrollStorage2.removeItem(DOCUMENT_SCROLL_STORAGE_KEY);
      } else {
        documentScrollStorage2.setItem(
          DOCUMENT_SCROLL_STORAGE_KEY,
          JSON.stringify(Object.fromEntries(documentScrollPositions)),
        );
      }
    } catch {}
}

var documentScrollKey: (documentScrollKey2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function rememberDocumentScroll(
  rememberDocumentScroll2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!Number.isFinite(options)) return;
  loadDocumentScrollPositions();
  let documentScrollPositionEntry: Dynamic = documentScrollPositions.get(
    rememberDocumentScroll2,
  );
  documentScrollPositions.delete(rememberDocumentScroll2);
  if (options <= 0) {
    if (documentScrollPositionEntry !== undefined) {
      saveDocumentScrollPositions();
    }
    return;
  }
  documentScrollPositions.set(rememberDocumentScroll2, options);
  if (documentScrollPositions.size > MAX_SCROLL_MEMORY_ENTRIES) {
    let value: Dynamic = documentScrollPositions.keys().next().value;
    if (value !== undefined) {
      documentScrollPositions.delete(value);
    }
  }
  if (documentScrollPositionEntry !== options) {
    saveDocumentScrollPositions();
  }
}

function getDocumentScroll(
  documentScroll?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  loadDocumentScrollPositions();
  return documentScrollPositions.get(documentScroll);
}

var commentListReturnState: Dynamic;

var commentListReturnSubscription: Dynamic;

function rememberCommentListReturn(
  ring?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  clearCommentListReturn();
  commentListReturnState = {
    ring: ring,
  };
  commentListReturnSubscription = useCommentStore.subscribe(
    (
      rememberCommentListReturn2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (rememberCommentListReturn2.commentMode !== `list`) {
        clearCommentListReturn();
      }
    },
  );
}

function takeCommentListReturn(..._extraArguments: unknown[]): Dynamic {
  let commentListReturnState2: Dynamic = commentListReturnState;
  clearCommentListReturn();
  return commentListReturnState2;
}

function clearCommentListReturn(..._extraArguments: unknown[]): undefined {
  commentListReturnSubscription?.();
  commentListReturnSubscription = null;
  commentListReturnState = null;
}

var DOCUMENT_VIEW_WITH_COMMENTS_PAYLOAD: {
    kind: string;
    comments: boolean;
};

function isDocumentViewWithComments(
  documentView?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof documentView != `object` ||
    !documentView ||
    Array.isArray(documentView)
  )
    return false;
  let documentView2: Dynamic = documentView;
  return (
    Object.keys(documentView2).length === 2 &&
    documentView2.kind === `view` &&
    documentView2.comments === true
  );
}

function documentViewWithCommentsRequest(
  documentView?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    payload: {
      ...DOCUMENT_VIEW_WITH_COMMENTS_PAYLOAD,
    },
    ref: {
      object: `node`,
      id: documentView,
    },
    container: container,
  };
}

function prefetchDocumentViewWithComments(
  prefetchDocumentView?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let call: Dynamic = prefetchDocumentView.call(
    `read`,
    documentViewWithCommentsRequest(options, context),
  );
  call.catch((..._extraArguments: unknown[]): undefined => undefined);
  return call;
}

function doorWithPrefetchedDocumentView(
  door?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    call: (
      door2?: Dynamic,
      options2: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (context.pre !== null && door2 === `read`) {
        let ref: Dynamic = options2.ref;
        if (
          ref?.object === `node` &&
          ref.id === options &&
          isDocumentViewWithComments(options2.payload)
        ) {
          let pre: Dynamic = context.pre;
          context.pre = null;
          return pre;
        }
      }
      return door.call(door2, options2);
    },
  };
}

function initialDocumentFileId(
  initialDocumentFileId2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let initialDocumentFileIdHandler: Dynamic = (
    initialDocumentFileId3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    initialDocumentFileId2.placement.has(initialDocumentFileId3) &&
    resolveDataContentAndReferencesTest5(initialDocumentFileId3);
  let initialDocumentFileIdResult: Dynamic =
    resolvePlatformSessionAndSourcesRest(initialDocumentFileId2.hash);
  if (initialDocumentFileIdResult !== null) {
    let entry: Dynamic = resolvePlatformSessionAndSourcesKind(
      initialDocumentFileIdResult,
      initialDocumentFileIdHandler,
      initialDocumentFileId2.refOf,
    );
    if (entry.kind === `land`) return entry.fileId;
  }
  return initialDocumentFileId2.remembered !== undefined &&
    initialDocumentFileIdHandler(initialDocumentFileId2.remembered)
    ? initialDocumentFileId2.remembered
    : updatePlatformSyncAndRoutingEntry(initialDocumentFileId2.placement).find(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataContentAndReferencesTest5(item.id),
      )?.id;
}

function readDocumentSwitchPicture(
  documentSwitchPicture?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = documentSwitchPicture.read({
    object: `project`,
    id: options,
  });
  if (record === undefined) return null;
  let fileId: Dynamic = initialDocumentFileId({
    placement: updatePlatformSyncAndRoutingDirectory(record),
    remembered: context.remembered,
    hash: context.hash,
    refOf: (
      documentSwitchPicture2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentSwitchPicture.refs().get(documentSwitchPicture2),
  });
  if (fileId === undefined) return null;
  let content: Dynamic = documentSwitchPicture.read({
    object: `file`,
    id: fileId,
  })?.content;
  return content?.kind !== `node` ||
    typeof content.id != `string` ||
    content.id.length === 0
    ? null
    : {
        fileId: fileId,
        nodeId: content.id,
      };
}

var documentSwitchPictures: Dynamic;

function takeDocumentSwitchPicture(
  documentSwitchPicture?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentSwitchPictureEntry: Dynamic = documentSwitchPictures.get(
    documentSwitchPicture,
  );
  return documentSwitchPictureEntry === undefined
    ? null
    : (documentSwitchPictures.delete(documentSwitchPicture),
      documentSwitchPictureEntry.nodeId === options
        ? documentSwitchPictureEntry
        : null);
}

function rememberDocumentSwitchPicture(
  rememberDocumentSwitchPicture2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  documentSwitchPictures.set(rememberDocumentSwitchPicture2, options);
  resolveCommentsStoreLayer(`host`, `switch-picture`, {
    armed: true,
    head: options.head,
  });
}

function clearDocumentSwitchPicture(
  clearDocumentSwitchPicture2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    documentSwitchPictures.get(clearDocumentSwitchPicture2)?.pre === options
  ) {
    documentSwitchPictures.delete(clearDocumentSwitchPicture2);
  }
}

function prefetchDocumentSwitchPicture(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentSwitchPicture: Dynamic = readDocumentSwitchPicture(
    options.lane,
    pid,
    {
      remembered: options.remembered(),
      hash: options.hash(),
    },
  );
  if (documentSwitchPicture === null) {
    resolveCommentsStoreLayer(`host`, `fence-picture`, {
      armed: false,
    });
    return null;
  }
  recordFramePhase(`bodyAsk`);
  let pre: Dynamic = prefetchDocumentViewWithComments(
    options.door,
    documentSwitchPicture.nodeId,
    {
      kind: `project`,
      id: pid,
    },
  );
  documentSwitchPictures.set(pid, {
    ...documentSwitchPicture,
    pre: pre,
    head: options.lane.head,
  });
  pre.then(
    (..._extraArguments: unknown[]) =>
      resolveObservabilityBootPaint2(`bodyRead`),
    (..._extraArguments: unknown[]) =>
      resolveObservabilityBootPaint2(`bodyRead`),
  );
  options
    .probe({
      pid: pid,
      fileId: documentSwitchPicture.fileId,
    })
    .catch((..._extraArguments: unknown[]): undefined => undefined);
  resolveCommentsStoreLayer(`host`, `fence-picture`, {
    armed: true,
    head: options.lane.head,
  });
  return documentSwitchPicture;
}

function guardAsyncDocumentCall(
  guardAsyncDocumentCall2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    guardAsyncDocumentCall3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    guardAsyncDocumentCall2()
      ? options(guardAsyncDocumentCall3)
      : Promise.resolve(false);
}

function installDocumentSwitchPrefetch(
  installDocumentSwitchPrefetch2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let subscribe: Dynamic = options.lane.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(entry.kind !== `live` || enabled)) {
        enabled = true;
        prefetchDocumentSwitchPicture(installDocumentSwitchPrefetch2, options);
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    subscribe();
    documentSwitchPictures.delete(installDocumentSwitchPrefetch2);
  };
}

var ReactionPicker: Dynamic;

function isExternalSelectionTarget(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    event.target.resolved !== undefined &&
    event.target.resolved.object !== `node`
  );
}

var DESKTOP_HOVER_QUERY: string;

var SELECTION_ACTIONS_PADDING: number;

var SELECTION_ACTIONS_RADIUS: number;

var SELECTION_ACTIONS_INNER_STYLE: {
    borderRadius: number;
};

var SELECTION_ACTIONS_MIN_TOP_ROOM: number;

var SELECTION_ACTIONS_GAP: number;

function selectionActionsPlacement(
  selectionActionsPlacement2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return selectionActionsPlacement2 === null ||
    selectionActionsPlacement2.w === undefined ||
    selectionActionsPlacement2.h === undefined
    ? {
        side: `bottom`,
        align: `start`,
        sideOffset: 4,
      }
    : {
        side: (
          selectionActionsPlacement2.room === undefined
            ? selectionActionsPlacement2.within === undefined ||
              selectionActionsPlacement2.y -
                selectionActionsPlacement2.within.top >=
                SELECTION_ACTIONS_MIN_TOP_ROOM
            : selectionActionsPlacement2.room === `above`
        )
          ? `top`
          : `bottom`,
        align: `center`,
        sideOffset: 28,
      };
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeAskCardsDocumentPostureBadgeStep1(): void {
  (googleDocsExportReporter = (
      googleDocsExportReporter2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      googleDocsExportReporter3?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      sendExportTelemetry(
        googleDocsExportTelemetry(googleDocsExportReporter3, options2),
        googleDocsExportReporter2,
        options,
      ));
  (downloadExportReporter = (
      downloadExportReporter2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      downloadExportReporter3?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      sendExportTelemetry(
        downloadExportTelemetry(
          downloadExportReporter2,
          downloadExportReporter3,
          options2,
        ),
        options,
        context,
      ));
  (notionExportReporter = (
      notionExportReporter2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      notionExportReporter3?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      sendExportTelemetry(
        notionExportTelemetry(notionExportReporter3, options2),
        notionExportReporter2,
        options,
      ));
  (googleDocsExportAction = async (
    {
      room: room,
      fileId: fileId,
      tabName: tabName,
      startAnother: startAnother,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let exportToGoogleDocs2: Dynamic = await exportToGoogleDocs({
      container: room.container,
      fileId: fileId,
      tabName: tabName,
      exportViaMcp: frameExportViaMcp,
      withheld: frameConnectorsWithheld,
      consent: frameAskDriveConsent,
      upload: frameUploadToDrive,
      fileArgs: frameDriveFileArgs,
      downloads: frameDownloadsAvailable,
      report: googleDocsExportReporter(fileId),
      now: frameEdgeNow,
      proceeding: (..._extraArguments: unknown[]): Dynamic =>
        PlatformSyncAndRoutingDialog.getState().working(
          GOOGLE_DOCS_EXPORTING_MESSAGE,
        ),
    });
    let matchesStartAnother: Dynamic =
      startAnother !== undefined &&
      canFallbackGoogleDocsExport(exportToGoogleDocs2) &&
      (await frameDownloadsAvailableWithin(EXPORT_OUTCOME_DELAY_MS));
    showExportOutcome({
      lead: `to Google Docs`,
      said: googleDocsExportError(exportToGoogleDocs2),
      detail: googleDocsToolError(exportToGoogleDocs2),
      link: googleDocsReconnectAction(exportToGoogleDocs2),
      action: wordExportFallbackAction(
        exportToGoogleDocs2,
        startAnother,
        matchesStartAnother,
      ),
      hint: googleDocsConsentNotice(exportToGoogleDocs2),
      notice: googleDocsDroppedPictureNotice(exportToGoogleDocs2),
      done: googleDocsExportSuccess(exportToGoogleDocs2),
      url: exportToGoogleDocs2.ok ? exportToGoogleDocs2.url : undefined,
    });
  });
  (EXPORT_OUTCOME_DELAY_MS = 1e3);
  (createDownloadExportAction = (downloadExportAction?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    async (
      { room: room, fileId: fileId, tabName: tabName }: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let DOCUMENTEXPORTFORMATSItem: Dynamic =
        DOCUMENT_EXPORT_FORMATS[downloadExportAction];
      PlatformSyncAndRoutingDialog.getState().working(
        DOCUMENTEXPORTFORMATSItem.busyLabel,
      );
      let exportDocumentDownload2: Dynamic = await exportDocumentDownload(
        DOCUMENTEXPORTFORMATSItem,
        {
          container: room.container,
          fileId: fileId,
          tabName: tabName,
          paper: preferredPaperSize(viewerLanguages()),
          exportViaMcp: frameExportViaMcp,
          save: frameSaveDownload,
          report: downloadExportReporter(downloadExportAction, fileId),
          now: frameEdgeNow,
        },
      );
      showExportOutcome({
        lead: DOCUMENTEXPORTFORMATSItem.asWords,
        said: documentDownloadError(
          DOCUMENTEXPORTFORMATSItem,
          exportDocumentDownload2,
        ),
        notice:
          downloadDroppedPictureNotice(
            DOCUMENTEXPORTFORMATSItem,
            exportDocumentDownload2,
          ) ??
          simplifiedDownloadNotice(
            DOCUMENTEXPORTFORMATSItem,
            exportDocumentDownload2,
          ),
        spoken: downloadSuccessToast(
          DOCUMENTEXPORTFORMATSItem,
          exportDocumentDownload2,
        ),
      });
    });
  (exportAsWord = createDownloadExportAction(`docx`));
  (exportAsPdf = createDownloadExportAction(`pdf`));
  (exportAsMarkdown = createDownloadExportAction(`markdown`));
  (createRequestedDownloadAction = (
      requestedDownloadAction?: Dynamic,
      request?: Dynamic,
      context?: Dynamic,
      dependencies: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    async (
      { room: room, fileId: fileId, tabName: tabName }: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let DOCUMENTEXPORTFORMATSItem: Dynamic =
        DOCUMENT_EXPORT_FORMATS[requestedDownloadAction];
      let enabled: boolean = false;
      let exportDocumentDownload2: Dynamic = await exportDocumentDownload(
        DOCUMENTEXPORTFORMATSItem,
        {
          container: room.container,
          fileId: fileId,
          tabName: tabName,
          paper: preferredPaperSize(viewerLanguages()),
          exportViaMcp: frameExportViaMcp,
          save: (
            requestedDownloadAction2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => (
            (enabled = true),
            frameSaveDownload({
              ...requestedDownloadAction2,
              request: request,
            })
          ),
          report: downloadExportReporter(requestedDownloadAction, fileId),
          now: frameEdgeNow,
        },
      );
      if (!enabled) {
        if (
          !exportDocumentDownload2.ok &&
          exportDocumentDownload2.code === `withheld`
        ) {
          context(request, dependencies);
          showExportOutcome({
            lead: DOCUMENTEXPORTFORMATSItem.asWords,
            said: documentDownloadError(
              DOCUMENTEXPORTFORMATSItem,
              exportDocumentDownload2,
            ),
          });
          return;
        }
        context(request);
        let documentDownloadError2: Dynamic = documentDownloadError(
          DOCUMENTEXPORTFORMATSItem,
          exportDocumentDownload2,
        );
        if (documentDownloadError2 !== null) {
          toast.error(documentDownloadError2, {
            id: DOCUMENTEXPORTFORMATSItem.toastId,
          });
        }
        return;
      }
      let simplifiedDownloadNotice2: Dynamic = simplifiedDownloadNotice(
        DOCUMENTEXPORTFORMATSItem,
        exportDocumentDownload2,
      );
      if (simplifiedDownloadNotice2 !== null) {
        toast.info(simplifiedDownloadNotice2.title, {
          id: DOCUMENTEXPORTFORMATSItem.toastId,
          ...(simplifiedDownloadNotice2.description === undefined
            ? {}
            : {
                description: simplifiedDownloadNotice2.description,
              }),
        });
      }
      let downloadDroppedPictureNotice2: Dynamic = downloadDroppedPictureNotice(
        DOCUMENTEXPORTFORMATSItem,
        exportDocumentDownload2,
      );
      if (downloadDroppedPictureNotice2 !== null) {
        PlatformSyncAndRoutingDialog.getState().done(
          downloadDroppedPictureNotice2,
        );
      }
    });
  (notionExportAction = async (
    { room: room, fileId: fileId, tabName: tabName }: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let exportToNotion2: Dynamic = await exportToNotion({
      container: room.container,
      fileId: fileId,
      tabName: tabName,
      withheld: frameConnectorsWithheld,
      consent: frameAskNotionConsent,
      exportViaMcp: frameExportViaMcp,
      create: frameCreateNotionPage,
      report: notionExportReporter(fileId),
      now: frameEdgeNow,
      proceeding: (..._extraArguments: unknown[]): Dynamic =>
        PlatformSyncAndRoutingDialog.getState().working(NOTION_EXPORTING_MESSAGE),
    });
    showExportOutcome({
      lead: `to Notion`,
      said: notionExportError(exportToNotion2),
      detail: notionToolError(exportToNotion2),
      hint: notionConsentNotice(exportToNotion2),
      done: notionExportSuccess(exportToNotion2),
      url: exportToNotion2.ok ? exportToNotion2.url : undefined,
    });
  });
  (VIEW_ONLY_RESTRICTION = resolvePlatformAnnouncementsToUpperCase(
    `forbidden`,
    {
      why: `role`,
      need: `editor`,
    },
  ));
  (COMMENT_ONLY_RESTRICTION_MESSAGE = `You can read and leave comments. Ask the owner for edit access.`);
  (PHONE_COMMENT_ONLY_MESSAGE = `You can read and comment on your phone. To edit, open this document on a computer.`);
  (DOCUMENT_POSTURE_LABELS = {
    comment: `Viewer`,
    view: `View only`,
  });
  (COMMENT_ONLY_LABEL = `Comment only`);
  (documentPosture = (
    documentPosture2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentPosture2.frameWritable &&
    !documentPosture2.viewerReadOnly &&
    !documentPosture2.doorViewOnly
      ? `edit`
      : (documentPosture2.frameCommentable ?? documentPosture2.frameWritable) &&
          !documentPosture2.frameWritable
        ? `comment`
        : `view`);
  (MAX_SCROLL_MEMORY_ENTRIES = 64);
  (DOCUMENT_SCROLL_STORAGE_KEY = `bongo.doc-scroll`);
  (documentScrollPositions = new (Map as Dynamic)());
  (documentScrollStorageInitialized = false);
  (documentScrollPositionsLoaded = false);
  (documentScrollKey = (
    documentScrollKey2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${documentScrollKey2}/${options}`);
  (commentListReturnState = null);
  (commentListReturnSubscription = null);
  (DOCUMENT_VIEW_WITH_COMMENTS_PAYLOAD = {
    kind: `view`,
    comments: true,
  });
  (documentSwitchPictures = new (Map as Dynamic)());
  (ReactionPicker = (0, React.forwardRef)(function (
    { onPick: onPick, ...reactionPicker }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let reactionPickerResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
    return (
      <Popover.Popup ref={options} {...reactionPicker} padding={`xs`} className={`flex gap-1`} data-testid={`reaction-picker`}>{QUICK_EMOJI.map((dataEmoji?: Dynamic, ..._extraArguments: unknown[]) => <Button variant={`ghost`} size={reactionPickerResult(`xs`)} iconOnly={true} icon={<span aria-hidden={true} className={`leading-none`} style={{
    fontSize: 16
  }}>
                      {dataEmoji}
                    </span>} aria-label={resolveEditorExtensionsValue6(dataEmoji)} tooltip={false} data-emoji={dataEmoji} onClick={(..._extraArguments: unknown[]): Dynamic => onPick(dataEmoji)} key={dataEmoji} />)}</Popover.Popup>
    );
  }));
  (DESKTOP_HOVER_QUERY = `(hover: hover) and (pointer: fine)`);
  (SELECTION_ACTIONS_PADDING = 16);
  (SELECTION_ACTIONS_RADIUS = 8);
  (SELECTION_ACTIONS_INNER_STYLE = {
    borderRadius: SELECTION_ACTIONS_RADIUS - 2,
  });
  (SELECTION_ACTIONS_MIN_TOP_ROOM = 86);
  (SELECTION_ACTIONS_GAP = 8);
}

export { DESKTOP_HOVER_QUERY, ReactionPicker, SELECTION_ACTIONS_GAP, SELECTION_ACTIONS_INNER_STYLE, SELECTION_ACTIONS_PADDING, SELECTION_ACTIONS_RADIUS, beginDocumentExport, clearDocumentSwitchPicture, createRequestedDownloadAction, documentPosture, documentScrollKey, doorWithPrefetchedDocumentView, exportAsMarkdown, exportAsPdf, exportAsWord, exportToolTelemetryLabel, getDocumentScroll, googleDocsExportAction, guardAsyncDocumentCall, installDocumentSwitchPrefetch, isExternalSelectionTarget, notionExportAction, prefetchDocumentViewWithComments, rememberCommentListReturn, rememberDocumentScroll, rememberDocumentSwitchPicture, selectionActionsPlacement, takeCommentListReturn, takeDocumentSwitchPicture };

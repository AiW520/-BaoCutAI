/** BaoCut: document preview from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  PlatformSyncAndRoutingState5,
  UiOverlaysAndIconsCustomIcon,
  clearPlatformKeyboardAndSaveStatusDelete,
  clearPlatformLiveDocumentAndHistoryDelete,
  clearPlatformLiveDocumentAndHistoryDelete2,
  collectDataModelSchemasBuf,
  collectPlatformApiAndAuthJoin2,
  frameLane,
  getPlatformLiveDocumentAndHistorySome,
  getPlatformLiveDocumentAndHistoryValue,
  isEditorHostCode,
  isEditorHostProse,
  isPlatformLiveDocumentAndHistoryReadFrom,
  liveDoor,
  platformKeyboardAndSaveStatusValue2500,
  platformLiveDocumentAndHistoryValue3000,
  preloadModule,
  resolveEditorSelectionAndTablesValue6,
  resolvePlatformKeyboardAndSaveStatusValue3,
  resolvePlatformLiveDocumentAndHistoryClear,
  resolvePlatformLiveDocumentAndHistoryHeld,
  resolvePlatformLiveDocumentAndHistoryNode2,
  resolvePlatformLiveDocumentAndHistoryPicture,
  resolvePlatformLiveDocumentAndHistoryUnsaved,
  resolvePlatformLiveDocumentAndHistoryValue4,
  resolvePlatformLiveDocumentAndHistoryValue5,
  resolvePlatformLiveDocumentAndHistoryValue6,
  resolvePlatformSyncAndRoutingList,
  resolvePlatformSyncAndRoutingValue15,
  resolvePlatformSyncAndRoutingValue22,
  resolveUiProviderAndLayersUseContext11,
  subscribeProjectFeed,
  updateEditorHostTier,
  updatePlatformLiveDocumentAndHistoryDelete,
  usePlatformSyncAndRoutingFramed,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  ReactDom,
} from "../connection-and-errors/connector-permission-dialog";
import {
  clearDocumentSwitchPicture,
  documentScrollKey,
  prefetchDocumentViewWithComments,
  rememberDocumentSwitchPicture,
} from "../ask-cards/document-posture-badge";
import {
  getFrameGesturesValue2,
} from "../frame/gestures-state-1";
import {
  UseDocumentContextHtmlComponent,
  useDocumentContextUseSyncExternalStore2,
} from "../document-context/create-widget-writing-coordinator";
import {
  DocumentCommentsHeadless,
} from "../room-document-page/document-comments-headless";
import type * as ReactComponentTypes from "react";

export const DocumentUnavailablePage: ReactComponentTypes.FC<Dynamic> = ({
  dir: dir,
  path: path,
  title: title,
  language: language,
  reason: reason,
  container: container,
  version: version,
  fsEntryId: fsEntryId,
}) => {
  let [documentUnavailablePageState, setDocumentUnavailablePageState]: Dynamic = (0,
  React.useState)(null);
  let [documentUnavailablePageState2, setDocumentUnavailablePageState2]: Dynamic = (0,
  React.useState)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  elementRef.current = documentUnavailablePageState;
  let nodeName: Dynamic = (0, React.useCallback)(
    (documentUnavailablePage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveEditorSelectionAndTablesValue6(
        elementRef.current?.nodes,
        documentUnavailablePage,
      ),
    [],
  );
  let [fontCss, setFontCss]: Dynamic = (0, React.useState)(``);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let enabled = true;
    collectDataModelSchemasBuf().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        enabled && setFontCss(result),
    );
    return (..._extraArguments: unknown[]): undefined => {
      enabled = false;
    };
  }, []);
  useDocumentContextUseSyncExternalStore2();
  let mode: Dynamic = usePlatformSyncAndRoutingFramed();
  let zoom = resolvePlatformSyncAndRoutingValue15(
    PlatformSyncAndRoutingState5(
      (documentUnavailablePage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        documentUnavailablePage.value,
    ),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled = true;
      setDocumentUnavailablePageState(null);
      setDocumentUnavailablePageState2(null);
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let response = await fetch(collectPlatformApiAndAuthJoin2(`${dir}/${path}`));
        if (!response.ok) throw Error(String(response.status));
        let parse: Dynamic = JSON.parse(await response.text());
        if (enabled) {
          setDocumentUnavailablePageState(parse);
        }
      })().catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          setDocumentUnavailablePageState2(
            error instanceof Error ? error.message : String(error),
          );
        }
      });
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [dir, path],
  );
  let documentUnavailablePageResult: Dynamic;
  let html: Dynamic;
  if (documentUnavailablePageState2)
    documentUnavailablePageResult = (
      <pre
        className={`text-danger p-4 font-mono text-xs`}
        data-testid={`ldoc-tier0-error`}
      >
        {`failed to load `}
        {path}
        {`: `}
        {documentUnavailablePageState2}
        {reason ? ` (room: ${reason})` : ``}
      </pre>
    );
  else if (documentUnavailablePageState === null)
    documentUnavailablePageResult = (
      <div className={`text-muted p-4 text-xs`}>{`Loading…`}</div>
    );
  else
    try {
      if (
        !documentUnavailablePageState.root ||
        !documentUnavailablePageState.nodes ||
        typeof documentUnavailablePageState.nodes != `object`
      )
        throw Error(`not an LFile (missing root/nodes)`);
      isEditorHostCode(documentUnavailablePageState.nodes);
      isEditorHostProse(documentUnavailablePageState.nodes);
      html = updateEditorHostTier(documentUnavailablePageState);
    } catch (error: Dynamic) {
      documentUnavailablePageResult = (
        <pre
          className={`text-danger p-4 font-mono text-xs`}
          data-testid={`ldoc-tier0-error`}
        >
          {path}
          {`: invalid LFile shape (`}
          {error instanceof Error ? error.message : String(error)}
          {`)`}
          {reason ? ` (room: ${reason})` : ``}
          {`

`}
          {JSON.stringify(documentUnavailablePageState, null, 2).slice(0, 4e3)}
        </pre>
      );
    }
  if (html !== undefined && documentUnavailablePageState) {
    documentUnavailablePageResult = (
      <jsxRuntime.Fragment>
        <UseDocumentContextHtmlComponent
          title={title}
          html={html}
          fontCss={fontCss}
          mode={mode}
          zoom={zoom}
          language={language}
        />
        {reason && (
          <div
            className={`text-muted bg-surface-1 absolute right-2 bottom-2 left-2 rounded p-2 font-mono text-xs`}
            data-testid={`ldoc-error`}
          >
            {`read-only fallback — room `}
            {reason}
          </div>
        )}
      </jsxRuntime.Fragment>
    );
  }
  return (
    <div className={`@container relative flex h-full`} data-testid={`ldoc-tier0`}>
      <div className={`relative min-w-0 flex-1`}>{documentUnavailablePageResult}</div>
      <DocumentCommentsHeadless
        container={container}
        version={version}
        fsEntryId={fsEntryId}
        path={path}
        forceList={true}
        nodeName={nodeName}
        key={fsEntryId}
      />
    </div>
  );
};

export const PdfPreview: ReactComponentTypes.FC<Dynamic> = ({ src: src }) => {
  let [src2, setSrc]: Dynamic = (0, React.useState)();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let pdfPreviewResult: Dynamic;
      fetch(src)
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result.arrayBuffer(),
        )
        .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          pdfPreviewResult = URL.createObjectURL(
            new Blob([result], {
              type: `application/pdf`,
            }),
          );
          setSrc(pdfPreviewResult);
        });
      return (..._extraArguments: unknown[]): undefined => {
        if (pdfPreviewResult) {
          URL.revokeObjectURL(pdfPreviewResult);
        }
      };
    },
    [src],
  );
  return src2 ? (
    <embed src={src2} type={`application/pdf`} className={`h-full w-full`} />
  ) : (
    <div className={`bg-alpha-0 h-full w-full animate-pulse`} />
  );
};

export const UseDocumentPreviewSlotEl2Component: ReactComponentTypes.FC<Dynamic> = ({
  slotEl: slotEl,
  inSlot: inSlot,
  onInSlot: onInSlot,
  ...documentPreviewSlotEl2
}) => {
  let slotEl2: Dynamic = inSlot ? slotEl : null;
  let [metadataState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => new (WeakMap as Dynamic)(),
  );
  let [useDocumentPreviewSlotEl2State]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]) => {
      let element = document.createElement(`div`);
      element.style.display = `contents`;
      element.addEventListener(
        `scroll`,
        (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          metadataState.set(event.target, event.target.scrollTop),
        {
          capture: true,
          passive: true,
        },
      );
      return element;
    },
  );
  let slotElRef: Dynamic = (0, React.useRef)(slotEl2);
  slotElRef.current = slotEl2;
  let elementRef: Dynamic = (0, React.useRef)(null);
  let appendChild: Dynamic = (0, React.useCallback)(
    (documentPreviewSlotEl22?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef.current = documentPreviewSlotEl22;
      if (documentPreviewSlotEl22 && !useDocumentPreviewSlotEl2State.parentNode) {
        (slotElRef.current ?? documentPreviewSlotEl22).appendChild(
          useDocumentPreviewSlotEl2State,
        );
      }
    },
    [useDocumentPreviewSlotEl2State],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let slotEl3: Dynamic = slotEl2 ?? elementRef.current;
      if (!slotEl3 || useDocumentPreviewSlotEl2State.parentNode === slotEl3) return;
      let activeElement = useDocumentPreviewSlotEl2State.contains(document.activeElement)
        ? document.activeElement
        : null;
      slotEl3.appendChild(useDocumentPreviewSlotEl2State);
      for (let useDocumentPreviewSlotEl2Result of useDocumentPreviewSlotEl2State.querySelectorAll(
        `*`,
      ) as Dynamic) {
        let metadataStateEntry: Dynamic = metadataState.get(
          useDocumentPreviewSlotEl2Result,
        );
        if (metadataStateEntry) {
          useDocumentPreviewSlotEl2Result.scrollTop = metadataStateEntry;
        }
      }
      if (activeElement instanceof HTMLElement) {
        activeElement.focus({
          preventScroll: true,
        });
      }
    },
    [slotEl2, useDocumentPreviewSlotEl2State, metadataState],
  );
  let matchesSlotEl = slotEl2 !== null;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      onInSlot?.(matchesSlotEl),
      (..._extraArguments: unknown[]): Dynamic => onInSlot?.(false)
    ),
    [matchesSlotEl, onInSlot],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        useDocumentPreviewSlotEl2State.remove(),
    [useDocumentPreviewSlotEl2State],
  );
  return (
    <jsxRuntime.Fragment>
      <div ref={appendChild} className={`contents`} />
      {(0, ReactDom.createPortal)(
        <div {...documentPreviewSlotEl2} />,
        useDocumentPreviewSlotEl2State,
      )}
    </jsxRuntime.Fragment>
  );
};

export const UseDocumentPreviewStatusComponent: ReactComponentTypes.FC<Dynamic> = ({
  status: status,
  running: running,
}) => {
  return (
    <span
      className={`mr-0.5 inline-block size-1.5 shrink-0 rounded-full ${running ? `bg-fill-accent animate-pulse` : status === `error` ? `bg-fill-danger` : status === `warning` ? `bg-fill-warning` : status === undefined ? `bg-fill-tertiary` : `bg-fill-success`}`}
    />
  );
};

export const PageLoadingFace: ReactComponentTypes.FC<{
  matchShell?: boolean;
  caption?: string;
  captionTestId?: string;
  hint?: string;
}> = ({
  matchShell: matchShell,
  caption: caption,
  captionTestId: captionTestId,
  hint: hint,
}) => {
  let jsx = (
    <div
      className={`animate-shell-ring size-5 shrink-0 rounded-full border-2 border-transparent motion-reduce:animate-none`}
      style={DocumentPreviewBackground}
    />
  );
  return (
    <div
      role={`status`}
      aria-label={[caption, hint].filter(Boolean).join(` `) || `Loading`}
      data-testid={`page-loading-face`}
      className={`${DOCUMENT_PREVIEW_POPOVER_CLASS} absolute inset-0 z-10`}
    >
      <div
        className={`${matchShell ? `fixed` : `absolute`} gap-sm px-lg inset-x-0 top-1/2 flex -translate-y-2.5 flex-col items-center`}
      >
        {jsx}
        <p
          className={`text-footnote text-secondary flex min-h-5 items-center text-center`}
          data-testid={caption ? captionTestId : undefined}
        >
          {caption ?? ``}
        </p>
        {hint && (
          <p
            className={`text-footnote text-secondary max-w-md text-center`}
            data-testid={`frame-setting-up-long`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export const UseDocumentPreviewSlotElComponent: ReactComponentTypes.FC<Dynamic> = ({
  slotEl: slotEl,
  inSlot: inSlot,
  onInSlot: onInSlot,
  ...documentPreviewSlotEl
}) => {
  let [matchesSlotElState, setMatchesSlotElState]: Dynamic = (0, React.useState)(
    slotEl !== null,
  );
  if (slotEl !== null && !matchesSlotElState) {
    setMatchesSlotElState(true);
  }
  return matchesSlotElState ? (
    <UseDocumentPreviewSlotEl2Component
      slotEl={slotEl}
      inSlot={inSlot}
      onInSlot={onInSlot}
      {...documentPreviewSlotEl}
    />
  ) : (
    <div {...documentPreviewSlotEl} />
  );
};

var DocumentPreview_Message: string;

function resolveDocumentPreviewFailed(
  documentPreviewFailed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentPreviewFailed.failed
    ? false
    : documentPreviewFailed.contentPending ||
        documentPreviewFailed.redirecting ||
        documentPreviewFailed.awaitingFirstTab ||
        (documentPreviewFailed.onFile && !documentPreviewFailed.surfaceShown);
}

var documentPreviewLimit2000: number;

function resolveDocumentPreviewShown(
  documentPreviewShown?: Dynamic,
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentPreviewShown !== undefined &&
    event?.key === documentPreviewShown &&
    event.shown
  );
}

function documentPreviewKey(
  documentPreviewKey2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${documentPreviewKey2}/${options}${context ? `@${context}` : ``}`;
}

var resolveDocumentPreviewFileId: Dynamic;

function resolveDocumentPreviewShown2(
  documentPreviewShown2?: Dynamic,
  page2?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {
    shown: page2.surface,
    heldSince: undefined,
  };
  if (documentPreviewShown2.shown === undefined) return record;
  if (
    page2.surface !== undefined &&
    resolveDocumentPreviewFileId(page2.surface) ===
      resolveDocumentPreviewFileId(documentPreviewShown2.shown)
  )
    return {
      shown: documentPreviewShown2.shown,
      heldSince: undefined,
    };
  if (
    page2.surface === undefined ||
    page2.pid !== documentPreviewShown2.shown.pid ||
    context === undefined
  )
    return record;
  let heldSince: Dynamic = documentPreviewShown2.heldSince ?? dependencies;
  if (!context.unsaved || !context.draining)
    return (argument ?? dependencies - heldSince >= 50)
      ? record
      : documentPreviewShown2.heldSince !== undefined &&
          documentPreviewShown2.beat !== true
        ? documentPreviewShown2
        : {
            shown: documentPreviewShown2.shown,
            heldSince: heldSince,
            beat: true,
          };
  let progress: Dynamic =
    documentPreviewShown2.heldSince === undefined ||
    documentPreviewShown2.progress === undefined ||
    documentPreviewShown2.progress.settled !== context.settled
      ? {
          settled: context.settled,
          at: dependencies,
        }
      : documentPreviewShown2.progress;
  return dependencies - heldSince >= 2e4 || dependencies - progress.at >= 5e3
    ? record
    : {
        shown: documentPreviewShown2.shown,
        heldSince: heldSince,
        progress: progress,
      };
}

var resolveDocumentPreviewHeldSince: Dynamic;

function useDocumentPreviewShown(
  pid?: Dynamic,
  shown?: Dynamic,
  clock: Dynamic = Date.now,
  ..._extraArguments: unknown[]
): Dynamic {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({
    shown: shown,
    heldSince: undefined,
  });
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let onProbe: Dynamic = (0, React.useCallback)(
    (
      documentPreviewShown?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (options) {
        lookupRef.current.set(documentPreviewShown, options);
      } else {
        lookupRef.current.delete(documentPreviewShown);
      }
    },
    [],
  );
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  let elementRef2: Dynamic = (0, React.useRef)(undefined);
  let judge: Dynamic = (
    documentPreviewShown?: Dynamic,
    options?: Dynamic,
    context: Dynamic = 0,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element: Dynamic = elementRef.current;
    let shown2: Dynamic =
      documentPreviewShown.shown &&
      lookupRef.current.get(
        resolveDocumentPreviewFileId(documentPreviewShown.shown),
      )?.();
    let max = Math.max(clock(), context);
    let heldSince: Dynamic = documentPreviewShown.heldSince;
    let matchesHeldSince: Dynamic =
      heldSince !== undefined && element?.since === heldSince && element.over;
    if (heldSince === undefined || shown2 === undefined)
      elementRef2.current = undefined;
    else {
      let element2: Dynamic = elementRef2.current ?? {
        settled: shown2.settled,
        at: heldSince,
      };
      let activity: Dynamic = (elementRef2.current =
        element2.settled === shown2.settled
          ? element2
          : {
              settled: shown2.settled,
              at: max,
            });
      if (
        matchesHeldSince &&
        shown2.unsaved &&
        !shown2.draining &&
        max - heldSince < 2e4
      ) {
        matchesHeldSince = max - activity.at >= 50;
      }
    }
    let documentPreviewShown2: Dynamic = resolveDocumentPreviewShown2(
      documentPreviewShown,
      options,
      shown2,
      max,
      matchesHeldSince,
    );
    return resolveDocumentPreviewHeldSince(
      documentPreviewShown2,
      documentPreviewShown,
    )
      ? documentPreviewShown
      : documentPreviewShown2;
  };
  let live: Dynamic = judge(recordState, {
    pid: pid,
    surface: shown,
  });
  if (live !== recordState) {
    setRecordState(live);
  }
  let recordRef: Dynamic = (0, React.useRef)({
    live: live,
    pid: pid,
    routed: shown,
    judge: judge,
    clock: clock,
  });
  recordRef.current = {
    live: live,
    pid: pid,
    routed: shown,
    judge: judge,
    clock: clock,
  };
  let held = live.heldSince !== undefined;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!held) return;
      let setInterval2 = setInterval(
        (..._extraArguments: unknown[]): undefined => {
          let record: Dynamic = recordRef.current;
          let judge2: Dynamic = record.judge(
            record.live,
            {
              pid: record.pid,
              surface: record.routed,
            },
            elementRef.current === undefined ? 0 : elementRef.current.told + 50,
          );
          if (judge2 !== record.live) {
            setRecordState(judge2);
          }
        },
        100,
      );
      return (..._extraArguments: unknown[]) => clearInterval(setInterval2);
    },
    [held],
  );
  let since: Dynamic = live.heldSince;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (since === undefined) return;
      let record: Dynamic = {
        since: since,
        told: recordRef.current.clock(),
        over: false,
      };
      elementRef.current = record;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          record.over = true;
          let record2: Dynamic = recordRef.current;
          let judge2: Dynamic = record2.judge(
            record2.live,
            {
              pid: record2.pid,
              surface: record2.routed,
            },
            record.told + 50,
          );
          if (judge2 !== record2.live) {
            setRecordState(judge2);
          }
        },
        50,
      );
      return (..._extraArguments: unknown[]): undefined => {
        clearTimeout(setTimeout2);
        if (elementRef.current === record) {
          elementRef.current = undefined;
        }
      };
    },
    [since],
  );
  let wordOf: Dynamic = (0, React.useCallback)(
    (documentPreviewShown?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      lookupRef.current.get(documentPreviewShown)?.(),
    [],
  );
  return {
    seat: live.shown,
    held: held,
    onProbe: onProbe,
    wordOf: wordOf,
  };
}

function useDocumentPreviewState(
  documentPreviewState?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!documentPreviewState) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
        100,
      );
      return (..._extraArguments: unknown[]): undefined => {
        clearTimeout(setTimeout2);
        setEnabledState(false);
      };
    },
    [documentPreviewState],
  );
  return documentPreviewState && enabledState;
}

function resolveDocumentPreviewChromeShown(
  documentPreviewChromeShown?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    chromeShown:
      documentPreviewChromeShown.validated &&
      (documentPreviewChromeShown.clearedOnce ||
        !documentPreviewChromeShown.faceUp ||
        (documentPreviewChromeShown.slow &&
          !documentPreviewChromeShown.settingUp)),
    matchShell:
      documentPreviewChromeShown.frame &&
      !documentPreviewChromeShown.clearedOnce,
  };
}

var documentPreviewLimit8000: number;

var DocumentPreview_StillLoadingThisMayTakeAMomentOnSlowerConnections: string;

// BaoCut: 文档还在建时的提示称「the agent」，不称 Claude。
var DocumentPreviewSettingUp: {
    settingUp: string;
    long: string;
};

var documentPreviewLimit30000: number;

function resolveDocumentPreviewFrame(
  documentPreviewFrame?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentPreviewFrame.frame &&
    documentPreviewFrame.foldOn &&
    documentPreviewFrame.sawSettingUp &&
    !documentPreviewFrame.projectKnown
  );
}

function resolveDocumentPreviewCaption(
  documentPreviewCaption?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentPreviewCaption.settingUp
    ? {
        caption: DocumentPreviewSettingUp.settingUp,
        testId: `frame-setting-up`,
        hint: documentPreviewCaption.unbornLong
          ? DocumentPreviewSettingUp.long
          : undefined,
      }
    : documentPreviewCaption.slow
      ? {
          caption:
            DocumentPreview_StillLoadingThisMayTakeAMomentOnSlowerConnections,
          testId: `page-loading-slow`,
          hint: undefined,
        }
      : {
          caption: undefined,
          testId: undefined,
          hint: undefined,
        };
}

var DOCUMENT_PREVIEW_POPOVER_CLASS: string;

var DocumentPreview_Message2: string;

var DocumentPreviewBackground: {
    background: string;
    WebkitMask: string;
    mask: string;
};

var resolveDocumentPreviewValue2: Dynamic;

var DocumentPreviewLane: Dynamic;

function UseDocumentPreviewUseLayoutEffectComponent(
  { onError: onError }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledRef.current) {
        onError();
      }
      enabledRef.current = true;
    },
    [onError],
  );
  return null;
}

function usePageSkillSeat(
  pageSkillSeat?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { on: pageSkillSeat2, pid: pid }: Dynamic = pageSkillSeat;
  let record: Dynamic = {
    ...DocumentPreviewLane,
    ...pageSkillSeat.deps,
  };
  let [, setCountState]: Dynamic = (0, React.useState)(0);
  let setCountState2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      setCountState(
        (pageSkillSeat3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          pageSkillSeat3 + 1,
      ),
    [],
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let uniqueItemsRef: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let uniqueItemsRef2: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let countRef: Dynamic = (0, React.useRef)(0);
  let countRef2: Dynamic = (0, React.useRef)(0);
  let [countState, setCountState3]: Dynamic = (0, React.useState)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      clearPlatformLiveDocumentAndHistoryDelete2(setCountState2),
    [setCountState2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!pageSkillSeat2) return;
      resolvePlatformLiveDocumentAndHistoryClear(pid);
      uniqueItemsRef2.current.clear();
      uniqueItemsRef.current.clear();
      lookupRef.current.clear();
      elementRef.current = null;
      elementRef2.current = null;
      setEnabledState(false);
      setEnabledState2(false);
      countRef.current = 0;
      countRef2.current = 0;
      let usePageSkillSeatResult: Dynamic =
        resolvePlatformLiveDocumentAndHistoryValue6(
          (pageSkillSeat3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            record.subscribe(pid, pageSkillSeat3),
        );
      return (..._extraArguments: unknown[]): undefined => {
        usePageSkillSeatResult();
        resolvePlatformLiveDocumentAndHistoryClear(``);
      };
    },
    [pageSkillSeat2, pid],
  );
  let slice: Dynamic = (
    pageSkillSeat3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    uniqueItemsRef.current.has(pageSkillSeat3) ||
    getFrameGesturesValue2(
      documentScrollKey(pid, pageSkillSeat3.slice(pid.length + 1)),
    ).length > 0;
  let seatKeyRef: Dynamic = (0, React.useRef)(pageSkillSeat.seatKey);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  if (pageSkillSeat.seatKey !== seatKeyRef.current) {
    let key: Dynamic = seatKeyRef.current;
    seatKeyRef.current = pageSkillSeat.seatKey;
    elementRef3.current =
      pageSkillSeat2 && key !== undefined && !key.includes(`@`)
        ? {
            key: key,
            clean: resolvePlatformLiveDocumentAndHistoryUnsaved(
              pageSkillSeat.leaveWordOf(key),
            ),
          }
        : null;
  }
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef3.current;
      elementRef3.current = null;
      if (element !== null) {
        clearPlatformLiveDocumentAndHistoryDelete(element.key);
        if (element.clean) {
          uniqueItemsRef2.current.add(element.key);
          uniqueItemsRef.current.delete(element.key);
        } else {
          uniqueItemsRef.current.add(element.key);
          uniqueItemsRef2.current.delete(element.key);
        }
      }
    },
    [pageSkillSeat.seatKey],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!pageSkillSeat2 || !pageSkillSeat.shownForRoute) return;
      let filteredItems: Dynamic = [...uniqueItemsRef2.current].filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          item !== pageSkillSeat.routeKey,
      );
      if (filteredItems.length === 0) return;
      for (let usePageSkillSeatResult of filteredItems as Dynamic)
        uniqueItemsRef2.current.delete(usePageSkillSeatResult);
      let uniqueItems: Dynamic = new (Set as Dynamic)(filteredItems);
      let uniqueItems2: Dynamic = uniqueItemsRef2.current;
      let enabled = true;
      let lane2: Dynamic = record.lane(pid);
      resolveDocumentPreviewValue2().then(
        async (
          { readTabPicture: readTabPicture, tabOf: tabOf }: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          for (let usePageSkillSeatResult of filteredItems as Dynamic) {
            if (!enabled) return;
            let fileId: Dynamic = usePageSkillSeatResult.slice(pid.length + 1);
            let nodeId: Dynamic = tabOf(lane2, fileId)?.nodeId;
            let items: Dynamic =
              nodeId === undefined ? [fileId] : [nodeId, fileId];
            let lookupEntry: Dynamic = lookupRef.current.get(
              usePageSkillSeatResult,
            );
            if (
              lookupEntry !== undefined &&
              !getPlatformLiveDocumentAndHistorySome(lookupEntry, items)
            ) {
              uniqueItems.delete(usePageSkillSeatResult);
              continue;
            }
            resolvePlatformLiveDocumentAndHistoryValue4(nodeId, fileId);
            let readFrom = resolvePlatformLiveDocumentAndHistoryValue5();
            let container: Dynamic = {
              kind: `project`,
              id: pid,
            };
            let tabPicture: Dynamic = await readTabPicture({
              pid: pid,
              fileId: fileId,
              container: container,
              lane: lane2,
              readFrom: readFrom,
              read: (
                pageSkillSeat3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                record.prefetch(
                  liveDoor(pid, {
                    container: container,
                  }),
                  pageSkillSeat3,
                  container,
                ),
            });
            if (!enabled) return;
            uniqueItems.delete(usePageSkillSeatResult);
            if (uniqueItemsRef.current.has(usePageSkillSeatResult)) continue;
            if (typeof tabPicture == `string`) {
              if (
                tabPicture === `paged` ||
                tabPicture === `embeds` ||
                tabPicture === `unknown`
              ) {
                lookupRef.current.set(usePageSkillSeatResult, readFrom);
              }
              continue;
            }
            let usePageSkillSeatResult2: Dynamic =
              getPlatformLiveDocumentAndHistoryValue(usePageSkillSeatResult);
            if (
              usePageSkillSeatResult2 === undefined ||
              usePageSkillSeatResult2.nodeId !== tabPicture.nodeId ||
              usePageSkillSeatResult2.rev <= tabPicture.rev
            ) {
              updatePlatformLiveDocumentAndHistoryDelete(tabPicture);
            }
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        for (let usePageSkillSeatResult of uniqueItems as Dynamic)
          uniqueItems2.add(usePageSkillSeatResult);
      };
    },
    [pageSkillSeat2, pid, pageSkillSeat.shownForRoute, pageSkillSeat.routeKey],
  );
  let seatKeyRef2: Dynamic = (0, React.useRef)(pageSkillSeat.seatKey);
  let recordRef: Dynamic = (0, React.useRef)({
    key: undefined,
    seq: 0,
    prevKey: undefined,
    seatBefore: undefined,
    held: undefined,
    at: 0,
    liveShown: false,
    spoiled: false,
  });
  if (recordRef.current.key !== pageSkillSeat.routeKey) {
    let key: Dynamic = pageSkillSeat.routeKey;
    let prevKey: Dynamic = recordRef.current.key?.startsWith(`${pid}/`)
      ? recordRef.current.key
      : undefined;
    let pageSkillSeat3: Dynamic =
      pageSkillSeat2 &&
      key !== undefined &&
      prevKey !== undefined &&
      key !== seatKeyRef2.current;
    let pageSkillSeat4: Dynamic =
      pageSkillSeat3 &&
      enabledState2 &&
      !enabledState &&
      !(countRef2.current !== 0 && countState !== countRef2.current) &&
      ++countRef.current >= 10;
    let held: Dynamic = pageSkillSeat3
      ? getPlatformLiveDocumentAndHistoryValue(key)
      : undefined;
    let lane2: Dynamic = pageSkillSeat2 ? record.lane(pid) : undefined;
    let fresh =
      held !== undefined &&
      lane2 !== undefined &&
      isPlatformLiveDocumentAndHistoryReadFrom(
        held,
        resolvePlatformLiveDocumentAndHistoryNode2(
          lane2.read.bind(lane2),
          held.nodeId,
        ),
      );
    let usePageSkillSeatResult: Dynamic =
      key === undefined || pageSkillSeat4
        ? null
        : resolvePlatformLiveDocumentAndHistoryHeld({
            held: held,
            fresh: fresh,
            posted: elementRef.current,
            painted: elementRef2.current,
            refused: slice(key),
          });
    recordRef.current = {
      key: key,
      seq: recordRef.current.seq + 1,
      prevKey: prevKey,
      seatBefore: seatKeyRef2.current,
      held: usePageSkillSeatResult === null ? undefined : held,
      at: Date.now(),
      liveShown: false,
      spoiled: false,
    };
    if (pageSkillSeat4) {
      countRef.current = 0;
      countRef2.current = recordRef.current.seq;
      elementRef.current = null;
      elementRef2.current = null;
    }
  }
  seatKeyRef2.current = pageSkillSeat.seatKey;
  if (pageSkillSeat.shownForRoute) {
    recordRef.current.liveShown = true;
  }
  if (!pageSkillSeat2 || pageSkillSeat.failed) {
    recordRef.current.spoiled = true;
  }
  let count: Dynamic = countRef2.current;
  let leaveWordOfRef: Dynamic = (0, React.useRef)(pageSkillSeat.leaveWordOf);
  leaveWordOfRef.current = pageSkillSeat.leaveWordOf;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (count === 0) return;
      let usePageSkillSeatResult: Dynamic;
      let enabled = true;
      let sinceActivity: Dynamic = (..._extraArguments: unknown[]) => {
        let record2: Dynamic = recordRef.current;
        let seatKey: Dynamic = seatKeyRef.current;
        return !record2.liveShown ||
          !resolvePlatformLiveDocumentAndHistoryUnsaved(
            seatKey ? leaveWordOfRef.current(seatKey) : undefined,
          )
          ? 0
          : Math.min(record.sinceActivity(), Date.now() - record2.at);
      };
      let usePageSkillSeatHandler = (
        pageSkillSeat3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        clearTimeout(usePageSkillSeatResult);
        usePageSkillSeatResult = setTimeout((..._extraArguments: unknown[]) => {
          let sinceActivity2: Dynamic = sinceActivity();
          if (sinceActivity2 < record.quietMs)
            return usePageSkillSeatHandler(
              Math.max(record.quietMs - sinceActivity2, record.quietMs / 5),
            );
          let seq2: Dynamic = recordRef.current.seq;
          record.idle((..._extraArguments: unknown[]) => {
            if (enabled) {
              if (
                recordRef.current.seq !== seq2 ||
                sinceActivity() < record.quietMs
              )
                return usePageSkillSeatHandler(record.quietMs);
              setCountState3(count);
            }
          });
        }, pageSkillSeat3);
      };
      usePageSkillSeatHandler(record.quietMs);
      let onActivity: Dynamic = record.onActivity(
        (..._extraArguments: unknown[]) =>
          usePageSkillSeatHandler(record.quietMs),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        onActivity();
        clearTimeout(usePageSkillSeatResult);
      };
    },
    [count],
  );
  let matchesCount = count !== 0 && countState !== count;
  let seq: Dynamic = recordRef.current.seq;
  let [countState2, setCountState4]: Dynamic = (0, React.useState)(0);
  let [countState3, setCountState5]: Dynamic = (0, React.useState)(0);
  let [usePageSkillSeatState, setUsePageSkillSeatState]: Dynamic = (0,
  React.useState)(null);
  let covers: Dynamic =
    !enabledState &&
    countState3 !== seq &&
    resolvePlatformLiveDocumentAndHistoryPicture({
      picture: recordRef.current.held?.file ?? null,
      liveShownOnce: recordRef.current.liveShown,
      failed: recordRef.current.spoiled,
      ceilingOver: countState2 === seq,
    });
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!covers) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setCountState4(seq),
        record.ceilingMs,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [covers, seq],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let routeKey: Dynamic = pageSkillSeat.routeKey;
      let fileId: Dynamic = pageSkillSeat.routeFileId;
      let keyboardState: Dynamic = recordRef.current;
      if (
        !pageSkillSeat2 ||
        routeKey === undefined ||
        fileId === undefined ||
        keyboardState.prevKey === undefined ||
        routeKey === keyboardState.seatBefore
      )
        return;
      let lane2: Dynamic = record.lane(pid);
      let content: Dynamic = lane2.read({
        object: `file`,
        id: fileId,
      })?.content;
      let nodeId: Dynamic =
        content?.kind === `node` && typeof content.id == `string`
          ? content.id
          : undefined;
      if (
        nodeId === undefined ||
        lane2.refs().get(`node/${nodeId}`)?.engine !== `prose`
      )
        return;
      resolvePlatformLiveDocumentAndHistoryValue4(nodeId, fileId);
      let readFrom = resolvePlatformLiveDocumentAndHistoryValue5();
      let container: Dynamic = {
        kind: `project`,
        id: pid,
      };
      let pre: Dynamic = record.prefetch(
        liveDoor(pid, {
          container: container,
        }),
        nodeId,
        container,
      );
      rememberDocumentSwitchPicture(pid, {
        fileId: fileId,
        nodeId: nodeId,
        pre: pre,
        head: lane2.head,
      });
      let seq2: Dynamic = keyboardState.seq;
      let held: Dynamic = keyboardState.held;
      let enabled = true;
      let setCountState6 = (..._extraArguments: unknown[]): undefined => {
        setCountState5(seq2);
        clearPlatformLiveDocumentAndHistoryDelete(routeKey);
      };
      Promise.all([pre, resolveDocumentPreviewValue2()]).then(
        (
          [result, { pictureFromReply: result2, tabOf: result3 }]: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!enabled || held === undefined) return;
          let pic2: Dynamic = result2(result, {
            pid: pid,
            fileId: fileId,
            nodeId: nodeId,
            lane: lane2,
            readFrom: readFrom,
            ...result3(lane2, fileId),
          });
          if (pic2 !== `behind`) {
            if (
              typeof pic2 == `string` ||
              uniqueItemsRef.current.has(routeKey) ||
              pic2.nodeId !== held.nodeId
            ) {
              setCountState6();
            } else {
              if (pic2.rev > held.rev) {
                updatePlatformLiveDocumentAndHistoryDelete(pic2);
                setUsePageSkillSeatState({
                  seq: seq2,
                  pic: pic2,
                });
              }
            }
          }
        },
        (..._extraArguments: unknown[]): undefined => {
          if (enabled && held !== undefined) {
            setCountState6();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        clearDocumentSwitchPicture(pid, pre);
      };
    },
    [pageSkillSeat.routeKey],
  );
  let [usePageSkillSeatState2, setUsePageSkillSeatState2]: Dynamic = (0,
  React.useState)(null);
  let elementRef4: Dynamic = (0, React.useRef)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]) =>
        clearTimeout(elementRef4.current),
    [],
  );
  let hoverTab: Dynamic = (0, React.useCallback)(
    (pageSkillSeat3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!pageSkillSeat2) return;
      clearTimeout(elementRef4.current);
      let documentPreviewKey2 =
        pageSkillSeat3 === null
          ? null
          : documentPreviewKey(pid, pageSkillSeat3);
      elementRef4.current = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          if (documentPreviewKey2 !== null) {
            setEnabledState2(true);
          }
          setUsePageSkillSeatState2(documentPreviewKey2);
        },
        60,
      );
    },
    [pageSkillSeat2, pid],
  );
  let lane: Dynamic = pageSkillSeat2 ? record.lane(pid) : undefined;
  let event: Dynamic =
    usePageSkillSeatState2 !== null &&
    usePageSkillSeatState2 !== pageSkillSeat.routeKey
      ? getPlatformLiveDocumentAndHistoryValue(usePageSkillSeatState2)
      : undefined;
  let event2: Dynamic =
    event !== undefined &&
    lane !== undefined &&
    !slice(event.key) &&
    isPlatformLiveDocumentAndHistoryReadFrom(
      event,
      resolvePlatformLiveDocumentAndHistoryNode2(
        lane.read.bind(lane),
        event.nodeId,
      ),
    )
      ? event
      : null;
  let pic: Dynamic = covers
    ? usePageSkillSeatState?.seq === seq
      ? usePageSkillSeatState.pic
      : (recordRef.current.held ?? null)
    : null;
  return {
    covers: covers,
    pictureSince:
      pageSkillSeat2 &&
      recordRef.current.held !== undefined &&
      !recordRef.current.liveShown
        ? recordRef.current.at
        : undefined,
    layer:
      pageSkillSeat2 && enabledState2 && !enabledState && !matchesCount
        ? {
            picture: pic ?? event2,
            drawn: covers,
            onPosted: (
              pageSkillSeat3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              elementRef.current = pageSkillSeat3;
              elementRef2.current = null;
            },
            onPainted: (
              pageSkillSeat3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                !(
                  elementRef.current !== pageSkillSeat3 ||
                  elementRef2.current === pageSkillSeat3
                )
              ) {
                elementRef2.current = pageSkillSeat3;
                setCountState2();
              }
            },
            onError: (..._extraArguments: unknown[]): Dynamic =>
              setEnabledState(true),
          }
        : null,
    hoverTab: hoverTab,
  };
}

function isPopupScrollBoundary(
  popupScrollBoundary?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !popupScrollBoundary || !options || options.scrollTop <= 0
    ? false
    : options.getBoundingClientRect().top -
        popupScrollBoundary.getBoundingClientRect().bottom <
        1;
}

function resolveDocumentPreviewStacked(
  documentPreviewStacked?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentPreviewStacked.railOverlay && documentPreviewStacked.v2
    ? {
        stacked: true,
        listCovers: documentPreviewStacked.view === `list`,
        ...(documentPreviewStacked.view === `list`
          ? {
              seatClass: `absolute inset-0 flex`,
              seatStyle: {
                zIndex: documentPreviewStacked.z.list,
              },
            }
          : {
              seatClass: `hidden`,
            }),
        overlayClass: `bg-surface-popover dark:bg-surface-0 absolute inset-0 flex flex-col`,
        overlayStyle: {
          zIndex: documentPreviewStacked.z.preview,
        },
      }
    : {
        stacked: false,
      };
}

function resolveDocumentPreviewRailOverlay(
  railOverlay?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDocumentPreviewStacked({
    railOverlay: railOverlay,
    v2: resolvePlatformSyncAndRoutingValue22(),
    view: resolvePlatformSyncAndRoutingList(),
    z: {
      preview: resolveUiProviderAndLayersUseContext11(10),
      list: resolveUiProviderAndLayersUseContext11(20),
    },
  });
}

function isDocumentPreviewHistoryRoad(
  documentPreviewHistoryRoad?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !documentPreviewHistoryRoad.historyRoad ||
    !documentPreviewHistoryRoad.historyOpen
    ? `off`
    : documentPreviewHistoryRoad.pinned
      ? documentPreviewHistoryRoad.warmed
        ? `keep`
        : `now`
      : documentPreviewHistoryRoad.warmed
        ? `keep`
        : documentPreviewHistoryRoad.intent
          ? `now`
          : documentPreviewHistoryRoad.shown
            ? `quiet`
            : `idle`;
}

var resolveDocumentPreviewTrim: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentPreviewUsePageSkillSeatStep1(): void {
  (DocumentPreview_Message = `bg-surface-0 text-secondary text-caption shadow-xs inline-flex h-6 items-center gap-1 rounded-md border px-1.5`);
  (0, React.forwardRef)(function (
    {
      icon: icon,
      children: children,
      onClick: onClick,
      dashed: dashed,
      className: className,
      ...callback
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let label = dashed
      ? `text-secondary hover:text-primary hover:bg-alpha-1 border-strong text-caption inline-flex h-6 items-center gap-1 rounded-md border border-dashed bg-transparent px-2`
      : DocumentPreview_Message;
    let jsxs = (
      <jsxRuntime.Fragment>
      {icon && (
          <UiOverlaysAndIconsCustomIcon
            name={icon}
            size={`xs`}
            className={`text-secondary`}
          />
        )}
      {children}
    </jsxRuntime.Fragment>
    );
    let callback2: Dynamic = callback;
    let matchesOnClick =
      onClick !== undefined ||
      Object.keys(callback2).some(
        (callbackKey?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          callbackKey.startsWith(`on`) && callback2[callbackKey] != null,
      );
    let className2 = `${matchesOnClick && !dashed ? `${label} hover:bg-alpha-2` : label}${className ? ` ${className}` : ``}`;
    return matchesOnClick ? (
      <button ref={options} type={`button`} onClick={onClick} className={className2} {...callback}>{jsxs}</button>
    ) : (
      <span ref={options} className={className2} {...callback}>{jsxs}</span>
    );
  });
  (documentPreviewLimit2000 = 2e3);
  (resolveDocumentPreviewFileId = (
    page2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => documentPreviewKey(page2.pid, page2.fileId, page2.version));
  (resolveDocumentPreviewHeldSince = (
    documentPreviewHeldSince?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentPreviewHeldSince.heldSince === options.heldSince &&
    documentPreviewHeldSince.beat === options.beat &&
    documentPreviewHeldSince.progress?.settled === options.progress?.settled &&
    documentPreviewHeldSince.progress?.at === options.progress?.at &&
    (documentPreviewHeldSince.shown === options.shown ||
      (documentPreviewHeldSince.shown !== undefined &&
        options.shown !== undefined &&
        resolveDocumentPreviewFileId(documentPreviewHeldSince.shown) ===
          resolveDocumentPreviewFileId(options.shown))));
  (documentPreviewLimit8000 = 8e3);
  (DocumentPreview_StillLoadingThisMayTakeAMomentOnSlowerConnections = `Still loading. This may take a moment on slower connections.`);
  (DocumentPreviewSettingUp = {
    settingUp: `Setting up this document…`,
    long: `If the agent has stopped responding, ask it to finish setting up this document — it’ll open here automatically.`,
  });
  (documentPreviewLimit30000 = 3e4);
  (DOCUMENT_PREVIEW_POPOVER_CLASS = `bg-surface-popover dark:bg-surface-0`);
  (DocumentPreview_Message2 = `radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))`);
  (DocumentPreviewBackground = {
    background: `conic-gradient(transparent 40%, var(--cds-text-muted)) border-box, linear-gradient(var(--cds-border), var(--cds-border)) border-box`,
    WebkitMask: DocumentPreview_Message2,
    mask: DocumentPreview_Message2,
  });
  (resolveDocumentPreviewValue2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic => import("../../document-tabs/tab-picture-read"),
      mapPreloadDependencies([35, 0, 1, 2, 3, 10]),
      import.meta.url,
    ));
  (DocumentPreviewLane = {
    lane: (
      documentPreviewLane?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => frameLane(`project/${documentPreviewLane}`),
    subscribe: (
      documentPreviewLane?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => subscribeProjectFeed(documentPreviewLane, options),
    prefetch: prefetchDocumentViewWithComments,
    ceilingMs: platformLiveDocumentAndHistoryValue3000,
    quietMs: platformKeyboardAndSaveStatusValue2500,
    sinceActivity: resolvePlatformKeyboardAndSaveStatusValue3,
    onActivity: clearPlatformKeyboardAndSaveStatusDelete,
    idle: (
      documentPreviewLane?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let options: Dynamic = (globalThis as Dynamic).requestIdleCallback;
      if (options) {
        options(documentPreviewLane, {
          timeout: 1e3,
        });
      } else {
        setTimeout(documentPreviewLane, 0);
      }
    },
  });
  (resolveDocumentPreviewTrim = (
    documentPreviewTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentPreviewTrim
      .replace(/[`\r\n]/g, ` `)
      .slice(0, 128)
      .trim());
}

export { DOCUMENT_PREVIEW_POPOVER_CLASS, UseDocumentPreviewUseLayoutEffectComponent, documentPreviewKey, documentPreviewLimit2000, documentPreviewLimit30000, documentPreviewLimit8000, isDocumentPreviewHistoryRoad, isPopupScrollBoundary, resolveDocumentPreviewCaption, resolveDocumentPreviewChromeShown, resolveDocumentPreviewFailed, resolveDocumentPreviewFrame, resolveDocumentPreviewRailOverlay, resolveDocumentPreviewShown, resolveDocumentPreviewTrim, useDocumentPreviewShown, useDocumentPreviewState, usePageSkillSeat };

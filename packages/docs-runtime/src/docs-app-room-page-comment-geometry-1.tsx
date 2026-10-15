import { React } from "./docs-app-bootstrap";
import { useFrameGesturesWanted } from "./docs-app-frame-gestures-state-1";
import { DocumentRuntimeAdd, DocumentRuntimeGranted, DocumentRuntimeState6, DocumentRuntime_Styles6, resolveDocumentRuntimeValue9 } from "./docs-app-document-runtime-widget-provenance-gutter";
import { resolveCommentAnchorsOpenedDirectly, resolveCommentAnchorsPush, resolveCommentAnchorsText, resolveCommentAnchorsValue } from "./docs-app-comment-anchors-use-comment-anchors-sheets-component";
import { CommentComponentsState5, CommentComponentsState6, isCommentComponentsPreventScroll, resolveCommentComponentsDocked, resolveCommentComponentsOffered, updateCommentComponentsDismissed } from "./docs-app-comment-components-state-5";
import { isCommentSessionFeatureDisabled, isElementAttachedComment, isWholeDocumentComment, shouldReleaseGoneAskCard } from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import { classifyFocusLocation } from "./docs-app-document-recovery";
import { clampSidebarToViewport, classifyDocumentLayoutTier, classifyTabsSidebarVisibility, hasDocumentSidebarHeight, parseTabsSidebarWidth, sidebarTotalWidth } from "./docs-app-document-chrome";
import { isDocumentSelectionJoin } from "./docs-app-document-selection-map-document-selection-tops";
import { resolveWidgetBridgeLineY, resolveWidgetBridgeTarget } from "./docs-app-widget-bridge-widget-sample-card";
import { classifyFrameFocusReturn } from "./docs-app-document-display";
import { clearCommentAnchorsDelete } from "./docs-app-comment-anchors-create-comment-mention-search";
import { DocumentFrameFrag } from "./docs-app-document-frame-use-document-frame-key";

/** BaoCut: room document comment geometry; live accessors preserve closure state. */
import type { Dynamic } from "./types";
import { Cf as isSelbarDraft, En as resolvePlatformLiveDocumentAndHistoryNodeId, Gf as useCommentStore, HA as resolvePlatformSessionAndSourcesToLowerCase, Hl as collectEditorHostJoin2, Wm as DataModelSchemasFreeze, eN as isObservabilityTelemetryValue3, mN as resolveObservabilityTelemetryReady3, mn as updatePlatformLiveDocumentAndHistoryCommentRail, ui as updateEditorSelectionAndTablesResolved, vx as toast, wf as isTmpId, wi as updateEditorSelectionAndTablesReport } from "./platform-core";
export function runRoomPage150Send6(roomPageContext: {
  frameMessengerRef: Dynamic;
  maxStateRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (options !== roomPageContext.maxStateRef.current) {
      roomPageContext.maxStateRef.current = options;
      roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
        type: `edge-min`,
        left: options ?? 0
      });
    }
  }, []);
}
export function runRoomPage151Effect(roomPageContext: {
  edgeLeft: Dynamic;
  iframeRef: Dynamic;
  maxStateRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  send6: Dynamic;
}): Dynamic {
  return (0, React.useLayoutEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      if ((roomPageContext.edgeLeft ?? 0) < (roomPageContext.maxStateRef.current ?? 0)) {
        (0, roomPageContext.send6)(contentWindow, roomPageContext.edgeLeft);
      }
    }
  }, [roomPageContext.ready, roomPageContext.edgeLeft, roomPageContext.send6]);
}
export function runRoomPage152UseFrameGesturesWanted2(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  onOutline: Dynamic;
  onOutlineAt: Dynamic;
  outlineJump: Dynamic;
  outlineWanted: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return useFrameGesturesWanted({
    wanted: roomPageContext.outlineWanted,
    jump: roomPageContext.outlineJump,
    ready: roomPageContext.ready,
    post: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      return !contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current ? false : roomPageContext.frameMessengerRef.current.send(contentWindow, roomDocumentPage) !== `dropped`;
    },
    focusFrame: (..._extraArguments: unknown[]) => {
      let iframe: Dynamic = roomPageContext.iframeRef.current;
      return !iframe?.contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current ? false : (iframe.focus({
        preventScroll: true
      }), iframe.ownerDocument.activeElement === iframe);
    },
    onOutline: roomPageContext.onOutline,
    onOutlineAt: roomPageContext.onOutlineAt
  });
}
export function runRoomPage153AskOffer(roomPageContext: {
  blank: Dynamic;
  commentOnly: Dynamic;
  displayName: Dynamic;
  enabledRef7: Dynamic;
  useDocumentInteractionOverlays19: Dynamic;
  useDocumentInteractionOverlays20: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): Dynamic => DocumentRuntimeGranted.offer(roomDocumentPage, {
    ...options,
    title: roomPageContext.displayName || undefined,
    outline: resolveCommentAnchorsPush(roomPageContext.useDocumentInteractionOverlays19.current),
    pageShape: resolveCommentAnchorsValue(roomPageContext.useDocumentInteractionOverlays20, roomPageContext.blank) ?? resolveCommentAnchorsText(roomPageContext.useDocumentInteractionOverlays19.current),
    seat: roomPageContext.commentOnly ? `commenter` : roomPageContext.enabledRef7.current ? `viewer` : `editor`
  }), [roomPageContext.useDocumentInteractionOverlays19, roomPageContext.displayName, roomPageContext.commentOnly, roomPageContext.useDocumentInteractionOverlays20, roomPageContext.blank]);
}
export function runRoomPage154Suggestions(roomPageContext: {
  askOffer: Dynamic;
  commentAnchorsValue: Dynamic;
  useDocumentInteractionOverlays19: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.askOffer)(resolveCommentAnchorsOpenedDirectly(null, {
    inlineAsk: true,
    pageShape: roomPageContext.commentAnchorsValue ?? resolveCommentAnchorsText(roomPageContext.useDocumentInteractionOverlays19.current),
    openedDirectly: resolveDocumentRuntimeValue9()
  }), {
    surface: `inline`
  }), [roomPageContext.askOffer, roomPageContext.commentAnchorsValue, roomPageContext.useDocumentInteractionOverlays19]);
}
export function runRoomPage155Effect(roomPageContext: {
  countRef10: Dynamic;
  countState2: Dynamic;
  elementRef24: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      if (roomPageContext.countState2 !== roomPageContext.countRef10.current) {
        roomPageContext.countRef10.current = roomPageContext.countState2;
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `bottom-inset`,
          px: roomPageContext.countState2
        });
        updatePlatformLiveDocumentAndHistoryCommentRail(roomPageContext.elementRef24.current, {
          type: `bottom-inset`,
          px: roomPageContext.countState2
        });
      }
    }
  }, [roomPageContext.ready, roomPageContext.countState2]);
}
export function runRoomPage156Effect(roomPageContext: {
  countRef11: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  useSyncExternalStore2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let max = Math.max(0, window.innerHeight - (roomPageContext.iframeRef.current?.getBoundingClientRect().bottom ?? window.innerHeight));
    let max2 = Math.max(0, roomPageContext.useSyncExternalStore2 - Math.round(max));
    if (max2 !== roomPageContext.countRef11.current) {
      roomPageContext.countRef11.current = max2;
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `keyboard-inset`,
        px: max2
      });
    }
  }, [roomPageContext.ready, roomPageContext.useSyncExternalStore2]);
}
export function runRoomPage157Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askLifecycleRef: Dynamic;
  openAskCard: Dynamic;
  suppressed: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let askLifecycle: Dynamic = roomPageContext.askLifecycleRef.current;
    if (!(askLifecycle === null || roomPageContext.suppressed || roomPageContext.openAskCard?.nonce !== askLifecycle)) {
      roomPageContext.askLifecycleRef.current = null;
      if (roomPageContext.askCardDeskRef.current?.mayFocus(askLifecycle) !== false) {
        (document as Dynamic).querySelector(`[data-inline-ask="${askLifecycle}"] [contenteditable="true"]`)?.focus();
      }
    }
  }, [roomPageContext.suppressed, roomPageContext.openAskCard]);
}
export function runRoomPage158ToText(roomPageContext: {
  askLifecyclePromiseRef: Dynamic;
  askLifecycleRef: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]): undefined => {
    window.clearTimeout(roomPageContext.askLifecyclePromiseRef.current);
    roomPageContext.askLifecycleRef.current = null;
    if (!roomPageContext.navigatedRef.current) {
      isCommentComponentsPreventScroll(roomPageContext.iframeRef.current, (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.iframeRef.current?.contentWindow, roomDocumentPage));
    }
  }, []);
}
export function runRoomPage159CommentComponentsOffered(roomPageContext: {
  blank: Dynamic;
  chatBeside: Dynamic;
  dismissed: Dynamic;
  enabled3: Dynamic;
  enabledRef19: Dynamic;
  enabledRef20: Dynamic;
  inlineAskHost: Dynamic;
  labelRef9: Dynamic;
  offered: Dynamic;
  openAskCard: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return resolveCommentComponentsOffered({
    offered: roomPageContext.offered,
    ready: roomPageContext.ready,
    blank: roomPageContext.blank,
    chatBeside: roomPageContext.chatBeside,
    dismissed: roomPageContext.dismissed,
    askOpen: roomPageContext.openAskCard !== null || roomPageContext.inlineAskHost.isSending(),
    dockedOnce: roomPageContext.labelRef9.current === `done`,
    phone: roomPageContext.enabledRef20.current,
    writes: roomPageContext.enabled3 || roomPageContext.enabledRef19.current
  });
}
export function runRoomPage160Effect(roomPageContext: {
  commentComponentsOffered: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef9: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      if (roomPageContext.commentComponentsOffered && roomPageContext.labelRef9.current === `idle`) {
        roomPageContext.labelRef9.current = `asked`;
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `inline-ask-dock`
        });
      } else {
        if (!roomPageContext.commentComponentsOffered && roomPageContext.labelRef9.current === `asked`) {
          roomPageContext.labelRef9.current = `idle`;
          roomPageContext.frameMessengerRef.current.send(contentWindow, {
            type: `inline-ask-dock`,
            cancel: true
          });
        }
      }
    }
  }, [roomPageContext.ready, roomPageContext.commentComponentsOffered]);
}
export function runRoomPage161Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askModuleTick: Dynamic;
  chatBeside: Dynamic;
  docked: Dynamic;
  enabled3: Dynamic;
  holdingDraft: Dynamic;
  inlineAskHost2: Dynamic;
  settled: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (resolveCommentComponentsDocked({
      docked: roomPageContext.docked,
      chatBeside: roomPageContext.chatBeside,
      settled: roomPageContext.settled,
      dirty: roomPageContext.holdingDraft,
      writes: roomPageContext.enabled3 && roomPageContext.askCardDeskRef.current !== null && roomPageContext.AskCardFaceRef.current !== null
    })) {
      (0, roomPageContext.inlineAskHost2)(false);
    }
  }, [roomPageContext.docked, roomPageContext.chatBeside, roomPageContext.settled, roomPageContext.holdingDraft, roomPageContext.enabled3, roomPageContext.askModuleTick]);
}
export function runRoomPage162Effect(roomPageContext: {
  docked: Dynamic;
  holdingDraft: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  inlineAskHost2: Dynamic;
  openAskCard: Dynamic;
  toText: Dynamic;
  useSyncExternalStore: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (shouldReleaseGoneAskCard(roomPageContext.initialAskCardRecoveryStateRef.current, {
      gone: isCommentSessionFeatureDisabled(),
      docked: roomPageContext.docked,
      holding: roomPageContext.holdingDraft
    })) {
      if (classifyFocusLocation(document.querySelector(`[data-inline-ask="${roomPageContext.openAskCard?.nonce}"]`), document) === `box`) {
        (0, roomPageContext.toText)();
      }
      (0, roomPageContext.inlineAskHost2)(false);
    }
  }, [roomPageContext.docked, roomPageContext.useSyncExternalStore]);
}
export function runRoomPage163OnCancel(roomPageContext: {
  inlineAskHost: Dynamic;
  inlineAskHost2: Dynamic;
  toText: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.inlineAskHost.isSending()) {
      (0, roomPageContext.toText)();
      (0, roomPageContext.inlineAskHost2)(false);
      if (!isCommentSessionFeatureDisabled()) {
        updateCommentComponentsDismissed({
          dismissed: isObservabilityTelemetryValue3(CommentComponentsState5, DocumentRuntimeAdd, `ask_dock_dismissed`),
          hintShown: isObservabilityTelemetryValue3(CommentComponentsState6, DocumentRuntimeAdd, `ask_dock_hint_shown`),
          toast: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => toast.info(roomDocumentPage, {
            id: `ask-dock`
          })
        });
      }
    }
  }, [roomPageContext.inlineAskHost2, roomPageContext.inlineAskHost, roomPageContext.toText]);
}
export function runRoomPage164Effect(roomPageContext: {
  askPromptMountedRef: Dynamic;
  elementRef73: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.ready) {
      roomPageContext.elementRef73.current = null;
    }
    if (!roomPageContext.ready) {
      roomPageContext.askPromptMountedRef.current = false;
    }
  }, [roomPageContext.ready]);
}
export function runRoomPage165Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askInputDirtyRef: Dynamic;
  askModuleTick: Dynamic;
  askPromptMountedRef: Dynamic;
  askUsageRef: Dynamic;
  docked: Dynamic;
  elementRef73: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  road: Dynamic;
  wants: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    if (!roomPageContext.askPromptMountedRef.current && ((0, roomPageContext.wants)() || roomPageContext.askUsageRef.current)) {
      roomPageContext.askInputDirtyRef.current = true;
      return;
    }
    if (roomPageContext.road === `write` && (roomPageContext.askCardDeskRef.current === null || roomPageContext.AskCardFaceRef.current === null)) return;
    let label2 = `${roomPageContext.road}:${roomPageContext.docked}`;
    if (label2 !== roomPageContext.elementRef73.current) {
      roomPageContext.elementRef73.current = label2;
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `ask-ghost`,
        road: roomPageContext.road,
        docked: roomPageContext.docked
      });
    }
  }, [roomPageContext.ready, roomPageContext.road, roomPageContext.docked, roomPageContext.askModuleTick]);
}
export function runRoomPage166Effect(roomPageContext: {
  elementRef43: Dynamic;
  iconsOn: Dynamic;
  leftOverlayHost: Dynamic;
  leftOverlayStickPx: Dynamic;
  matchesReason: Dynamic;
  pageRef: Dynamic;
  round: Dynamic;
  setLane: Dynamic;
  setMeasuredPageWidth: Dynamic;
  setTall: Dynamic;
  setTier: Dynamic;
  useWidgetBridgeStickPx2: Dynamic;
  useWidgetBridgeStickPx3: Dynamic;
  useWidgetBridgeStickPx4: Dynamic;
  useWidgetBridgeStickPx6: Dynamic;
  wide: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    roomPageContext.useWidgetBridgeStickPx2.seat(roomPageContext.leftOverlayHost);
    let page2: Dynamic = roomPageContext.pageRef.current;
    if (!roomPageContext.leftOverlayHost || !page2) {
      roomPageContext.useWidgetBridgeStickPx3.current = null;
      roomPageContext.elementRef43.current = null;
      (0, roomPageContext.setLane)(null);
      (0, roomPageContext.setTier)(null);
      (0, roomPageContext.setMeasuredPageWidth)(null);
      return (..._extraArguments: unknown[]): Dynamic => roomPageContext.useWidgetBridgeStickPx2.seat(null);
    }
    let count = roomPageContext.iconsOn ? 36 : 0;
    let floor = (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, roomPageContext.setTier)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]) => classifyDocumentLayoutTier(roomDocumentPage - count, roomDocumentPage2));
      (0, roomPageContext.setTall)(hasDocumentSidebarHeight(options, roomPageContext.leftOverlayStickPx));
      (0, roomPageContext.setMeasuredPageWidth)(Math.floor(roomDocumentPage / 16) * 16);
      if ((0, roomPageContext.round)()) {
        (0, roomPageContext.useWidgetBridgeStickPx6)(roomPageContext.useWidgetBridgeStickPx4.current);
      }
    };
    floor(page2.offsetWidth, page2.offsetHeight);
    let resizeObserver = new ResizeObserver(([roomDocumentPage]: Dynamic, ..._extraArguments: unknown[]) => floor(roomDocumentPage?.borderBoxSize?.[0]?.inlineSize ?? page2.offsetWidth, roomDocumentPage?.borderBoxSize?.[0]?.blockSize ?? page2.offsetHeight));
    resizeObserver.observe(page2);
    return (..._extraArguments: unknown[]): undefined => {
      resizeObserver.disconnect();
      roomPageContext.useWidgetBridgeStickPx2.seat(null);
    };
  }, [roomPageContext.leftOverlayHost, roomPageContext.matchesReason, roomPageContext.iconsOn, roomPageContext.wide, roomPageContext.leftOverlayStickPx, roomPageContext.useWidgetBridgeStickPx2, roomPageContext.round, roomPageContext.useWidgetBridgeStickPx6, roomPageContext.useWidgetBridgeStickPx3, roomPageContext.useWidgetBridgeStickPx4]);
}
export function runRoomPage167Effect(roomPageContext: {
  elementRef74: Dynamic;
  lane: Dynamic;
  leftOverlayHost: Dynamic;
  pageWidth: Dynamic;
}): Dynamic {
  return (0, React.useLayoutEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.leftOverlayHost) {
      roomPageContext.elementRef74.current = null;
      return;
    }
    let clampSidebarToViewport2: Dynamic = clampSidebarToViewport(roomPageContext.pageWidth, roomPageContext.elementRef74.current ?? parseTabsSidebarWidth(roomPageContext.leftOverlayHost.style.width), roomPageContext.lane);
    roomPageContext.elementRef74.current = clampSidebarToViewport2;
    roomPageContext.leftOverlayHost.style.width = clampSidebarToViewport2 + `px`;
  }, [roomPageContext.leftOverlayHost, roomPageContext.pageWidth, roomPageContext.lane]);
}
export function runRoomPage168ClassifyTabsSidebarVisibility2(roomPageContext: {
  fits: Dynamic;
  frameError: Dynamic;
  lane: Dynamic;
  leftOverlayHost: Dynamic;
  matchesReason: Dynamic;
  pageWidth: Dynamic;
  tier: Dynamic;
}): Dynamic {
  return classifyTabsSidebarVisibility({
    host: roomPageContext.leftOverlayHost !== null,
    error: roomPageContext.matchesReason || roomPageContext.frameError !== null,
    tier: roomPageContext.tier,
    fits: roomPageContext.fits,
    lane: roomPageContext.lane,
    need: sidebarTotalWidth(roomPageContext.pageWidth)
  });
}
export function runRoomPage169Send7(roomPageContext: {
  elementRef76: Dynamic;
  frameMessengerRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    roomPageContext.elementRef76.current = collectEditorHostJoin2(options);
    roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
      type: `card-spans`,
      spans: options.map((option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        top: option.top,
        bottom: option.bottom
      }))
    });
  }, []);
}
export function runRoomPage170Effect(roomPageContext: {
  DocumentSourcePrompt_Other: Dynamic;
  documentSourcePromptLimit0: Dynamic;
  elementRef24: Dynamic;
  elementRef75: Dynamic;
  elementRef76: Dynamic;
  elementRef78: Dynamic;
  frameMessengerRef: Dynamic;
  icons: Dynamic;
  iconsRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  railDocked: Dynamic;
  railDockedRef: Dynamic;
  railSync: Dynamic;
  ready: Dynamic;
  send7: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let matchesRailDocked = roomPageContext.railDockedRef.current !== roomPageContext.railDocked;
    roomPageContext.railDockedRef.current = roomPageContext.railDocked;
    if (matchesRailDocked || roomPageContext.iconsRef.current !== roomPageContext.icons) {
      roomPageContext.railSync.hold();
    }
    roomPageContext.iconsRef.current = roomPageContext.icons;
    let matchesDocumentSourcePromptLimit0 = roomPageContext.documentSourcePromptLimit0 > 0 && roomPageContext.DocumentSourcePrompt_Other === `prose` || isSelbarDraft(useCommentStore.getState().draftAnchor);
    let record4: Dynamic = matchesRailDocked && matchesDocumentSourcePromptLimit0 ? {
      type: `comment-rail`,
      on: roomPageContext.railDocked,
      anchorScroll: true,
      icons: roomPageContext.icons
    } : {
      type: `comment-rail`,
      on: roomPageContext.railDocked,
      icons: roomPageContext.icons
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
    updatePlatformLiveDocumentAndHistoryCommentRail(roomPageContext.elementRef24.current, {
      type: `comment-rail`,
      on: roomPageContext.railDocked,
      icons: roomPageContext.icons
    });
    roomPageContext.elementRef78.current = -1;
    roomPageContext.elementRef76.current = null;
    if (!roomPageContext.railDocked) {
      roomPageContext.elementRef75.current = null;
    }
    let element4: Dynamic = roomPageContext.elementRef75.current;
    if (roomPageContext.railDocked && element4 !== null) {
      (0, roomPageContext.send7)(contentWindow, element4);
    }
  }, [roomPageContext.railDocked, roomPageContext.icons, roomPageContext.ready, roomPageContext.railSync, roomPageContext.send7]);
}
export function runRoomPage171Effect(roomPageContext: {
  edgeLeft: Dynamic;
  elementRef24: Dynamic;
  elementRef72: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  send6: Dynamic;
  zoom: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      if (roomPageContext.zoom !== roomPageContext.elementRef72.current) {
        roomPageContext.elementRef72.current = roomPageContext.zoom;
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `zoom`,
          level: roomPageContext.zoom
        });
      }
      updatePlatformLiveDocumentAndHistoryCommentRail(roomPageContext.elementRef24.current, {
        type: `zoom`,
        level: roomPageContext.zoom
      });
      (0, roomPageContext.send6)(contentWindow, roomPageContext.edgeLeft);
    }
  }, [roomPageContext.ready, roomPageContext.edgeLeft, roomPageContext.zoom, roomPageContext.send6]);
}
export function runRoomPage172Effect(roomPageContext: {
  elementRef77: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult17: Dynamic;
  roomDocumentPageResult27: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.elementRef77.current = null;
      return;
    }
    let items2: Dynamic = [];
    for (let roomDocumentPageResult34 of roomPageContext.roomDocumentPageResult17 as Dynamic) if (!(isTmpId(roomDocumentPageResult34.id) || isElementAttachedComment(roomDocumentPageResult34) || isWholeDocumentComment(roomDocumentPageResult34))) {
      items2.push(roomDocumentPageResult34.id);
    }
    let isDocumentSelectionJoin2 = isDocumentSelectionJoin(items2, roomPageContext.roomDocumentPageResult27);
    if (!(isDocumentSelectionJoin2 === null || isDocumentSelectionJoin2 === roomPageContext.elementRef77.current)) {
      roomPageContext.elementRef77.current = isDocumentSelectionJoin2;
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `comment-census`
      });
    }
  }, [roomPageContext.ready, roomPageContext.roomDocumentPageResult17, roomPageContext.roomDocumentPageResult27]);
}
export function runRoomPage173Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult28: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(roomPageContext.roomDocumentPageResult28 === null || !contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `comment-census`
      });
    }
  }, [roomPageContext.ready, roomPageContext.roomDocumentPageResult28]);
}
export function runRoomPage174OnOverhang(roomPageContext: {
  elementRef24: Dynamic;
  elementRef78: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, keep?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let label2 = `${roomDocumentPage}|${keep ?? ``}`;
    if (roomPageContext.elementRef78.current === label2) return;
    roomPageContext.elementRef78.current = label2;
    let record4: Dynamic = keep === undefined ? {
      type: `rail-overhang`,
      px: roomDocumentPage
    } : {
      type: `rail-overhang`,
      px: roomDocumentPage,
      keep: keep
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
    updatePlatformLiveDocumentAndHistoryCommentRail(roomPageContext.elementRef24.current, record4);
  }, [roomPageContext.ready]);
}
export function runRoomPage175OnCardSpans(roomPageContext: {
  elementRef75: Dynamic;
  elementRef76: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  send7: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    roomPageContext.elementRef75.current = roomDocumentPage;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      if (roomPageContext.elementRef76.current !== collectEditorHostJoin2(roomDocumentPage)) {
        (0, roomPageContext.send7)(contentWindow, roomDocumentPage);
      }
    }
  }, [roomPageContext.ready, roomPageContext.send7]);
}
export function runRoomPage176OnScrollDoc(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  onOutlineScrolledRef: Dynamic;
  outlineWantedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    return !contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current || roomDocumentPage === 0 ? false : (roomPageContext.frameMessengerRef.current.send(contentWindow, {
      type: `scroll-by`,
      dy: roomDocumentPage
    }), roomPageContext.outlineWantedRef.current && roomPageContext.onOutlineScrolledRef.current?.(`page`), true);
  }, [roomPageContext.ready]);
}
export function runRoomPage177AddEventListener2(roomPageContext: {
  memoized: Dynamic;
  onScrollDocRef: Dynamic;
  railSync: Dynamic;
  railWheelMountedRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    if (!roomDocumentPage) return;
    let register: Dynamic = roomPageContext.memoized.register(roomDocumentPage);
    let closest: Dynamic = roomDocumentPage.closest(`[data-testid="ldoc-view"]`);
    let getState3 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => void resolveWidgetBridgeTarget(roomDocumentPage2, roomDocumentPage, closest ?? roomDocumentPage, DocumentRuntime_Styles6, roomPageContext.railSync.docY() ?? useCommentStore.getState().docScrollY, (roomDocumentPage3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.onScrollDocRef.current(roomDocumentPage3), roomPageContext.railWheelMountedRef.current);
    (closest ?? roomDocumentPage).addEventListener(`wheel`, getState3, {
      passive: false
    });
    return (..._extraArguments: unknown[]): undefined => {
      (closest ?? roomDocumentPage).removeEventListener(`wheel`, getState3);
      register();
    };
  }, [roomPageContext.memoized, roomPageContext.railSync]);
}
export function runRoomPage178Effect(roomPageContext: {
  elementRef78: Dynamic;
  elementRef79: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  onOverhang: Dynamic;
  onScrollDoc: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef79.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let inlineAskHost4: Dynamic = roomPageContext.inlineAskHost.current();
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    if (!inlineAskHost4 || !iframe) return;
    let top2: Dynamic = iframe.getBoundingClientRect().top;
    let bandBottom = window.innerHeight - roomDocumentPage - top2 - 16;
    let storeState: Dynamic = useCommentStore.getState();
    let widgetBridgeLineY = resolveWidgetBridgeLineY({
      lineY: inlineAskHost4.rect.line ?? inlineAskHost4.rect.top,
      bandBottom: bandBottom,
      docScrollY: storeState.docScrollY
    });
    if (widgetBridgeLineY !== 0) {
      if (widgetBridgeLineY > 0) {
        roomPageContext.elementRef78.current = -1;
        (0, roomPageContext.onOverhang)(widgetBridgeLineY);
        roomPageContext.elementRef78.current = -1;
      }
      if ((0, roomPageContext.onScrollDoc)(widgetBridgeLineY)) {
        storeState.predictDocScroll(widgetBridgeLineY);
        roomPageContext.inlineAskHost.moved(inlineAskHost4.nonce, {
          ...inlineAskHost4.rect,
          top: inlineAskHost4.rect.top - widgetBridgeLineY,
          ...(inlineAskHost4.rect.line !== undefined && {
            line: inlineAskHost4.rect.line - widgetBridgeLineY
          })
        });
      }
    }
  };
}
export function runRoomPage179OnComposeExit(roomPageContext: {
  enabledRef3: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  selbarPortRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((nodeId2?: Dynamic, ..._extraArguments: unknown[]) => {
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    return !iframe || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current || classifyFrameFocusReturn({
      hasFocus: document.hasFocus(),
      activeElement: document.activeElement,
      body: document.body,
      iframe: iframe,
      inDraftCard: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => roomDocumentPage.closest(`[data-testid="ldoc-comment-draft"]`) !== null
    }) !== `hand-back` ? false : (iframe.focus(), roomPageContext.selbarPortRef.current?.postMessage({
      type: `compose-exit`,
      nodeId: nodeId2
    }), true);
  }, []);
}
export function runRoomPage180HandFocusOut(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  onEscapeToChromeRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
    if (roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current) return false;
    if (roomDocumentPage === `tabs` && roomPageContext.onEscapeToChromeRef.current) {
      let activeElement = document.activeElement;
      roomPageContext.onEscapeToChromeRef.current();
      if (document.activeElement !== activeElement) return true;
    }
    return isCommentComponentsPreventScroll(roomPageContext.iframeRef.current, (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.iframeRef.current?.contentWindow, roomDocumentPage2));
  }, []);
}
export function runRoomPage181Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult29: Dynamic;
  roomDocumentPageResult30: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `comment-mark-hidden`,
      ids: roomPageContext.roomDocumentPageResult30 ? [] : [...roomPageContext.roomDocumentPageResult29],
      resolved: roomPageContext.roomDocumentPageResult30 ? [...roomPageContext.roomDocumentPageResult29] : []
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.ready, roomPageContext.roomDocumentPageResult29, roomPageContext.roomDocumentPageResult30]);
}
export function runRoomPage182Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef10: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult10: Dynamic;
  roomDocumentPageResult30: Dynamic;
  roomDocumentPageResult31: Dynamic;
  threads: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.labelRef10.current = ``;
      return;
    }
    let roomDocumentPageResult34: Dynamic = roomPageContext.roomDocumentPageResult10;
    let roomDocumentPageResult35: Dynamic = updateEditorSelectionAndTablesResolved(roomPageContext.threads, roomPageContext.roomDocumentPageResult30 ? roomPageContext.roomDocumentPageResult31 : null, roomDocumentPageResult34 !== null && roomDocumentPageResult34.autopost === undefined ? roomDocumentPageResult34 : null);
    let stringify = JSON.stringify(roomDocumentPageResult35);
    if (stringify === roomPageContext.labelRef10.current) return;
    roomPageContext.labelRef10.current = stringify;
    let record4: Dynamic = {
      type: `widget-datum-marks`,
      byNode: roomDocumentPageResult35.byNode,
      draft: roomDocumentPageResult35.draft
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.threads, roomPageContext.roomDocumentPageResult31, roomPageContext.roomDocumentPageResult30, roomPageContext.roomDocumentPageResult10, roomPageContext.ready]);
}
export function runRoomPage183Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult32: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4 = {
      type: `comment-pending`,
      ids: Object.keys(roomPageContext.roomDocumentPageResult32)
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.ready, roomPageContext.roomDocumentPageResult32]);
}
export function runRoomPage184Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult30: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => clearCommentAnchorsDelete((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current || roomPageContext.roomDocumentPageResult30) return;
    let record4: Dynamic = {
      type: `comment-resolving`,
      id: roomDocumentPage
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }), [roomPageContext.ready, roomPageContext.roomDocumentPageResult30]);
}
export function runRoomPage185Effect(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageResultRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let send9 = (..._extraArguments: unknown[]): undefined => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
      let hashSlice = location.hash.slice(1);
      if (!hashSlice || resolvePlatformSessionAndSourcesToLowerCase(hashSlice)) return;
      let roomDocumentPageResult34: Dynamic = resolvePlatformLiveDocumentAndHistoryNodeId(hashSlice);
      if (roomDocumentPageResult34) {
        if (!roomPageContext.roomDocumentPageResultRef.current && Object.keys(roomDocumentPageResult34.vs).length) {
          let record4: Dynamic = {
            type: `widget-vs-seed`,
            nodeId: roomDocumentPageResult34.nodeId,
            vs: roomDocumentPageResult34.vs
          };
          roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
        }
        return;
      }
      roomPageContext.frameMessengerRef.current.send(contentWindow, DocumentFrameFrag.jumpFor(hashSlice, false));
    };
    window.addEventListener(`hashchange`, send9);
    return (..._extraArguments: unknown[]) => window.removeEventListener(`hashchange`, send9);
  }, []);
}
export function runRoomPage186Effect(roomPageContext: {
  countRef2: Dynamic;
  elementRef12: Dynamic;
  elementRef34: Dynamic;
  elementRef35: Dynamic;
  elementRef38: Dynamic;
  elementRef39: Dynamic;
  elementRef49: Dynamic;
  elementRef50: Dynamic;
  elementRef51: Dynamic;
  elementRef52: Dynamic;
  elementRef6: Dynamic;
  enabledRef3: Dynamic;
  enabledRef4: Dynamic;
  enabledRef5: Dynamic;
  frameMessengerRef: Dynamic;
  isDocumentSelectionRandomUUIDRef: Dynamic;
  itemsRef: Dynamic;
  labelRef: Dynamic;
  lookupRef3: Dynamic;
  lookupRef4: Dynamic;
  lookupRef5: Dynamic;
  lookupRef7: Dynamic;
  memoized: Dynamic;
  navigatedRef: Dynamic;
  onClose: Dynamic;
  railSync: Dynamic;
  reason: Dynamic;
  recordRef3: Dynamic;
  recordRef4: Dynamic;
  selbarPortRef: Dynamic;
  setEnumEditDialog: Dynamic;
  setFrameError: Dynamic;
  setLane: Dynamic;
  setLinkPopover: Dynamic;
  setMentionPopover2: Dynamic;
  setOpenUrl: Dynamic;
  setReady: Dynamic;
  uniqueItemsRef10: Dynamic;
  uniqueItemsRef6: Dynamic;
  uniqueItemsRef7: Dynamic;
  useDocumentInteractionOverlays11: Dynamic;
  useDocumentManifestState2: Dynamic;
  useWidgetBridgeStickPx3: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.reason) return;
    roomPageContext.navigatedRef.current = false;
    roomPageContext.enabledRef3.current = false;
    roomPageContext.elementRef38.current = -1;
    roomPageContext.elementRef39.current?.drop();
    roomPageContext.enabledRef5.current = false;
    roomPageContext.enabledRef4.current = false;
    roomPageContext.isDocumentSelectionRandomUUIDRef.current.reset();
    roomPageContext.elementRef6.current?.reset();
    roomPageContext.useDocumentInteractionOverlays11.current(null);
    roomPageContext.elementRef49.current?.close();
    roomPageContext.elementRef49.current = null;
    roomPageContext.selbarPortRef.current?.close();
    roomPageContext.selbarPortRef.current = null;
    roomPageContext.frameMessengerRef.current.drop();
    roomPageContext.elementRef12.current?.dispose();
    roomPageContext.elementRef50.current?.release();
    roomPageContext.elementRef51.current?.close();
    roomPageContext.elementRef51.current = null;
    roomPageContext.elementRef52.current?.close();
    roomPageContext.elementRef52.current = null;
    roomPageContext.labelRef.current = ``;
    roomPageContext.useDocumentManifestState2.clearAll();
    roomPageContext.lookupRef3.current = new (Map as Dynamic)();
    roomPageContext.countRef2.current = 0;
    roomPageContext.elementRef34.current?.dispose();
    roomPageContext.elementRef34.current = null;
    roomPageContext.uniqueItemsRef6.current = new (Set as Dynamic)();
    roomPageContext.uniqueItemsRef7.current = new (Set as Dynamic)();
    roomPageContext.lookupRef4.current = new (Map as Dynamic)();
    roomPageContext.lookupRef5.current = new (Map as Dynamic)();
    roomPageContext.uniqueItemsRef10.current = new (Set as Dynamic)();
    roomPageContext.itemsRef.current = [];
    roomPageContext.elementRef35.current = null;
    roomPageContext.lookupRef7.current = new (Map as Dynamic)();
    roomPageContext.recordRef3.current = {
      n: 0,
      last: 0
    };
    roomPageContext.recordRef4.current = {
      n: 0,
      last: 0
    };
    (0, roomPageContext.setOpenUrl)(null);
    (0, roomPageContext.setEnumEditDialog)(null);
    let storeState: Dynamic = useCommentStore.getState();
    storeState.setPresent(null);
    storeState.setFolded(DataModelSchemasFreeze);
    storeState.setRects({}, []);
    storeState.setDocExtent(null);
    storeState.setDocScrollMax(null);
    roomPageContext.railSync.reset();
    roomPageContext.memoized.reset();
    roomPageContext.useWidgetBridgeStickPx3.current = null;
    (0, roomPageContext.setLane)(null);
    (0, roomPageContext.setLinkPopover)(null);
    (0, roomPageContext.setMentionPopover2)();
    (0, roomPageContext.onClose)();
    (0, roomPageContext.setReady)(false);
    (0, roomPageContext.setFrameError)(null);
  }, [roomPageContext.reason, roomPageContext.useDocumentManifestState2, roomPageContext.useDocumentInteractionOverlays11, roomPageContext.railSync, roomPageContext.memoized, roomPageContext.onClose, roomPageContext.useWidgetBridgeStickPx3]);
}
export function runRoomPage187Effect(roomPageContext: {
  elementRef80: Dynamic;
  frameMountEpoch: Dynamic;
  iframeRef: Dynamic;
  reason: Dynamic;
  useDocumentContextWarm2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    if (!iframe) return;
    let roomDocumentPageResult34: Dynamic = updateEditorSelectionAndTablesReport(iframe, {
      mirror: DocumentRuntimeState6
    });
    roomPageContext.elementRef80.current = roomDocumentPageResult34;
    return (..._extraArguments: unknown[]): undefined => {
      roomDocumentPageResult34.release();
      if (roomPageContext.elementRef80.current === roomDocumentPageResult34) {
        roomPageContext.elementRef80.current = null;
      }
    };
  }, [roomPageContext.frameMountEpoch, roomPageContext.reason, roomPageContext.useDocumentContextWarm2.warm]);
}
export function runRoomPage188Effect(roomPageContext: {
  elementRef23: Dynamic;
  elementRef29: Dynamic;
  elementRef30: Dynamic;
  elementRef31: Dynamic;
  navigatedRef: Dynamic;
  seated: Dynamic;
  setReady: Dynamic;
  useDocumentContextWarm2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let handoff: Dynamic = roomPageContext.useDocumentContextWarm2.handoff({
      sealed: (..._extraArguments: unknown[]): Dynamic => roomPageContext.navigatedRef.current,
      onBootError: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef31.current(roomDocumentPage)
    });
    if (handoff === null) return;
    let seated2: Dynamic = (0, roomPageContext.seated)();
    if (seated2 === null) return;
    roomPageContext.elementRef23.current.adopt({
      loaded: handoff.loaded,
      booted: handoff.booted
    });
    let element4: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef30.current();
    seated2.addEventListener(`load`, element4);
    let contentWindow: Dynamic = seated2.contentWindow;
    if (handoff.ready) {
      (0, roomPageContext.setReady)(true);
      if (contentWindow) {
        resolveObservabilityTelemetryReady3(contentWindow);
      }
    } else {
      if (handoff.booted && contentWindow) {
        roomPageContext.elementRef29.current(contentWindow);
      }
    }
    return (..._extraArguments: unknown[]): Dynamic => seated2.removeEventListener(`load`, element4);
  }, []);
}

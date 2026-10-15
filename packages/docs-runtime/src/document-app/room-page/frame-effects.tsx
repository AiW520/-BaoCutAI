import { React } from "../bootstrap";
import { resolveDocumentCommandsSaid2 } from "../document-commands/create-selection-ask-coordinator";
import { askCardRecoveryLostMessage, isCommentSessionFeatureDisabled, takeAskCardLoweringDebt } from "../comment-notifications/create-comment-notice-coordinator";
import { handleHostDropFiles, resolveDocumentUploadsThen2, resolveDocumentUploadsValue } from "../document-uploads";
import { resolveFrameGesturesOpen } from "../frame/gestures-state-1";
import { RecoveryTextPanel } from "../document-recovery";

/** BaoCut: room document frame effects; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  DataModelSchemasDragging,
  DataOperationControlNodeGone2,
  DataOperationControlPageGone,
  EditorSelectionAndTablesAsk,
  resolveCommentsStoreValue30,
  resolvePlatformFeatureFlagsEnabled2,
} from "../../platform/index";
export function runRoomPage195Effect(roomPageContext: {
  documentCommandsSaidRef: Dynamic;
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult33: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current) return;
    let documentCommandsSaid2: Dynamic = resolveDocumentCommandsSaid2(roomPageContext.documentCommandsSaidRef.current, roomPageContext.roomDocumentPageResult33, resolvePlatformFeatureFlagsEnabled2(`artifactLinkChips`));
    if (documentCommandsSaid2 !== null) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, documentCommandsSaid2);
    }
  }, [roomPageContext.roomDocumentPageResult33, roomPageContext.ready]);
}
export function runRoomPage196Effect(roomPageContext: {
  enabledRef3: Dynamic;
  flipAskCardRecovery2: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  setInlineAskNotice: Dynamic;
  useSyncExternalStore: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    (0, roomPageContext.flipAskCardRecovery2)();
    if (isCommentSessionFeatureDisabled()) {
      (0, roomPageContext.setInlineAskNotice)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => askCardRecoveryLostMessage(roomPageContext.initialAskCardRecoveryStateRef.current, true, roomDocumentPage));
    }
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current) return;
    let takeAskCardLoweringDebt2 = takeAskCardLoweringDebt(roomPageContext.initialAskCardRecoveryStateRef.current, isCommentSessionFeatureDisabled());
    if (takeAskCardLoweringDebt2 !== null) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, takeAskCardLoweringDebt2);
    }
  }, [roomPageContext.useSyncExternalStore, roomPageContext.ready]);
}
export function runRoomPage197Effect(roomPageContext: {
  elementRef6: Dynamic;
  enabled4: Dynamic;
  enabledRef3: Dynamic;
  enabledRef4: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  isDocumentSelectionRandomUUIDRef: Dynamic;
  navigatedRef: Dynamic;
  primeAuthoritySettled: Dynamic;
  readOnly2: Dynamic;
  response: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.enabledRef4.current || !(roomPageContext.enabled4 ? roomPageContext.response.verdict !== undefined : roomPageContext.primeAuthoritySettled)) return;
    roomPageContext.enabledRef4.current = false;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!roomPageContext.enabled4 || roomPageContext.response.verdict === `writer`) || roomPageContext.readOnly2 || !contentWindow) {
      roomPageContext.elementRef6.current?.noPrime();
      return;
    }
    if (!roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) {
      roomPageContext.elementRef6.current?.noPrime();
      return;
    }
    roomPageContext.isDocumentSelectionRandomUUIDRef.current.arm();
    roomPageContext.frameMessengerRef.current.send(contentWindow, {
      type: `prime-caret`
    });
  }, [roomPageContext.response.verdict, roomPageContext.readOnly2, roomPageContext.enabled4, roomPageContext.primeAuthoritySettled]);
}
export function runRoomPage198Effect(roomPageContext: {
  dirRef: Dynamic;
  elementRef51: Dynamic;
  elementRef54: Dynamic;
  elementRef55: Dynamic;
  frameMountEpoch: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  readOnly2: Dynamic;
  ready: Dynamic;
  recordRef6: Dynamic;
  roomDocumentPageHandler2: Dynamic;
  useDocumentContextWarm2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    if (!roomPageContext.ready || roomPageContext.readOnly2 || !iframe) return;
    let setIntercept: Dynamic = DataModelSchemasDragging.getState().setIntercept;
    let postMessage: Dynamic = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef51.current?.postMessage(roomDocumentPage);
    let postMessage2 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!roomPageContext.navigatedRef.current) {
        postMessage(roomDocumentPage);
      }
    };
    let onDrop = (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let element4: Dynamic = roomPageContext.elementRef51.current;
      if (roomPageContext.navigatedRef.current || !element4) return void resolveDocumentUploadsThen2(roomDocumentPage);
      let iframeBounds: Dynamic = iframe.getBoundingClientRect();
      let difference: number = options.clientX - iframeBounds.left;
      let difference2: number = options.clientY - iframeBounds.top;
      let frameGesturesOpen = resolveFrameGesturesOpen(roomPageContext.recordRef6.current, roomDocumentPage, resolveDocumentUploadsValue(), postMessage2);
      let g5: Dynamic = frameGesturesOpen.g;
      postMessage({
        type: `drop-pending`,
        x: difference,
        y: difference2,
        g: g5
      });
      handleHostDropFiles(roomDocumentPage, {
        dir: roomPageContext.dirRef.current,
        fileRef: roomPageContext.elementRef54.current,
        rev: roomPageContext.elementRef55.current,
        room: (0, roomPageContext.roomDocumentPageHandler2)()
      }).then((items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        frameGesturesOpen();
        if (!roomPageContext.navigatedRef.current) {
          postMessage({
            type: `host-drop`,
            items: items2,
            x: difference,
            y: difference2,
            g: g5
          });
        }
      }, (..._extraArguments: unknown[]): undefined => {
        frameGesturesOpen();
        if (!roomPageContext.navigatedRef.current) {
          postMessage({
            type: `host-drop`,
            items: [],
            x: difference,
            y: difference2,
            g: g5
          });
        }
      });
    };
    let onHover = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.navigatedRef.current) return;
      let iframeBounds: Dynamic = iframe.getBoundingClientRect();
      postMessage({
        type: `drag-at`,
        x: roomDocumentPage.clientX - iframeBounds.left,
        y: roomDocumentPage.clientY - iframeBounds.top
      });
    };
    let onHoverEnd = (..._extraArguments: unknown[]): undefined => {
      if (!roomPageContext.navigatedRef.current) {
        postMessage({
          type: `drag-end`
        });
      }
    };
    let onPick = (items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.navigatedRef.current || !roomPageContext.elementRef51.current || items2.length === 0) return;
      let frameGesturesOpen = resolveFrameGesturesOpen(roomPageContext.recordRef6.current, items2, resolveDocumentUploadsValue(), postMessage2);
      let g5: Dynamic = frameGesturesOpen.g;
      postMessage({
        type: `drop-pending`,
        x: null,
        y: null,
        after: true,
        g: g5
      });
      handleHostDropFiles(items2, {
        dir: roomPageContext.dirRef.current,
        fileRef: roomPageContext.elementRef54.current,
        rev: roomPageContext.elementRef55.current,
        room: (0, roomPageContext.roomDocumentPageHandler2)()
      }).then((items3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        frameGesturesOpen();
        if (!roomPageContext.navigatedRef.current) {
          postMessage({
            type: `host-drop`,
            items: items3,
            x: null,
            y: null,
            after: true,
            g: g5
          });
        }
      }, (..._extraArguments: unknown[]): undefined => {
        frameGesturesOpen();
        if (!roomPageContext.navigatedRef.current) {
          postMessage({
            type: `host-drop`,
            items: [],
            x: null,
            y: null,
            g: g5
          });
        }
      });
    };
    let getBoundingClientRect: Dynamic = (..._extraArguments: unknown[]): Dynamic => setIntercept({
      rect: iframe.getBoundingClientRect(),
      onDrop: onDrop,
      onHover: onHover,
      onHoverEnd: onHoverEnd,
      onPick: onPick
    });
    getBoundingClientRect();
    let resizeObserver = new ResizeObserver(getBoundingClientRect);
    resizeObserver.observe(iframe);
    window.addEventListener(`resize`, getBoundingClientRect);
    return (..._extraArguments: unknown[]): undefined => {
      resizeObserver.disconnect();
      window.removeEventListener(`resize`, getBoundingClientRect);
      setIntercept(null);
    };
  }, [roomPageContext.ready, roomPageContext.readOnly2, roomPageContext.frameMountEpoch, roomPageContext.useDocumentContextWarm2.warm]);
}
export function runRoomPage199OnRevealNode(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((frag?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `jump-to`,
      frag: frag
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, []);
}
export function runRoomPage200OnOpenNodeLog(roomPageContext: {
  enabledRef13: Dynamic;
  onOpenWidgetPanelRef: Dynamic;
  onRevealNode: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.enabledRef13.current && roomPageContext.onOpenWidgetPanelRef.current) {
      roomPageContext.onOpenWidgetPanelRef.current(roomDocumentPage, `log`);
    } else {
      (0, roomPageContext.onRevealNode)(roomDocumentPage);
    }
  }, [roomPageContext.onRevealNode]);
}
export function runRoomPage201Effect(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => EditorSelectionAndTablesAsk.subscribe((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!roomDocumentPage.ask || roomDocumentPage.ask === options.ask) return;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let ask: Dynamic = {
      type: `reveal-block`,
      bid: roomDocumentPage.ask.bid,
      flash: true
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, ask);
  }), []);
}
export function runRoomPage202Unavailable(roomPageContext: {
  gone: Dynamic;
  items: Dynamic;
  onDismiss: Dynamic;
  openDebugReportDialog2: Dynamic;
  readOnly2: Dynamic;
  reason: Dynamic;
}): Dynamic {
  return <div className={`p-lg text-body`} data-testid={`room-ldoc-error`}>
        {roomPageContext.items.length > 0 && <div className={`mb-md`}>
            <RecoveryTextPanel items={roomPageContext.items} onDismiss={roomPageContext.onDismiss} onCopyReport={resolveCommentsStoreValue30() ? roomPageContext.openDebugReportDialog2 : undefined} viewOnly={roomPageContext.readOnly2} gone={roomPageContext.gone} errorFace={true} />
          </div>}
        {roomPageContext.reason === DataOperationControlNodeGone2 || roomPageContext.reason === DataOperationControlPageGone ? <div className={`text-footnote text-secondary`} role={`status`} data-testid={`room-ldoc-gone`}>
            {roomPageContext.reason}
          </div> : <div className={`text-danger`}>{roomPageContext.reason}</div>}
      </div>;
}

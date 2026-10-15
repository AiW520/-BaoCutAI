import { React, mapPreloadDependencies } from "../bootstrap";
import { resolveDocumentContextTest2 } from "../document-context/create-widget-writing-coordinator";
import { useDocumentRuntimeRoom } from "../document-runtime/use-document-runtime-room";
import { isDocumentRuntimeIsContentEditable, resolveDocumentRuntimeSubscribe } from "../document-runtime/use-document-runtime-subscribe-project-feed";
import { installDocumentSelectionHasFocus } from "../document-selection/create-heading-normalization-plugin";
import { rememberAgentWriteCursor } from "../comment-notifications/create-comment-notice-coordinator";

/** BaoCut: room document document state; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  api,
  collectDataModelSchemasValue,
  DataModelSchemasDragging,
  DataModelSchemasFreeze,
  EditorHostTell,
  isDataModelSchemasKind3,
  isPlatformApiAndAuthHandoff,
  PlatformSyncAndRoutingAssign2,
  resolvePlatformApiAndAuthLocalhost,
  resolvePlatformKeyboardAndSaveStatusOpening,
  useCommentStore,
} from "../../platform/index";
import { isFrameArtifact } from "../../boot/environment";
import { preloadModule } from "../../boot/preload";
export function runRoomPage73Element(roomPageContext: {
  containerRef: Dynamic;
  projectContainerRef: Dynamic;
}): Dynamic {
  return (0, React.useRef)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let documentContextTest2: Dynamic = resolveDocumentContextTest2(roomPageContext.containerRef.current, roomPageContext.projectContainerRef.current?.name);
    if (documentContextTest2 === null) return null;
    let mappedItems: Dynamic = collectDataModelSchemasValue(documentContextTest2, roomDocumentPage).map((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => isPlatformApiAndAuthHandoff(resolvePlatformApiAndAuthLocalhost(`/api/room/${encodeURIComponent(item)}`), (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (roomDocumentPage2.t === `state`) {
        options();
      }
    }, (..._extraArguments: unknown[]): undefined => {}));
    return (..._extraArguments: unknown[]): undefined => {
      for (let roomDocumentPageResult34 of mappedItems as Dynamic) roomDocumentPageResult34.close();
    };
  }).current;
}
export function runRoomPage74OnClose(roomPageContext: {
  frameGesturesOpenedAtRef: Dynamic;
  setInsertMenuAnchor: Dynamic;
  updateEnabled: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.frameGesturesOpenedAtRef.current.openedAt === null) return;
    let closedAt = performance.now();
    roomPageContext.frameGesturesOpenedAtRef.current = {
      openedAt: null,
      closedAt: closedAt
    };
    (0, roomPageContext.updateEnabled)(closedAt);
    (0, roomPageContext.setInsertMenuAnchor)(null);
  }, [roomPageContext.updateEnabled]);
}
export function runRoomPage75Effect(roomPageContext: {
  elementRef51: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => DataModelSchemasDragging.subscribe((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (roomDocumentPage.imagePicker != null != (options.imagePicker != null)) {
      roomPageContext.elementRef51.current?.postMessage({
        type: `image-picker`,
        available: roomDocumentPage.imagePicker != null
      });
    }
  }), []);
}
export function runRoomPage76Drop(roomPageContext: {
  bumpFrameMountEpoch: Dynamic;
  countRef2: Dynamic;
  countRef3: Dynamic;
  DocumentSourcePromptState: Dynamic;
  elementRef12: Dynamic;
  elementRef21: Dynamic;
  elementRef22: Dynamic;
  elementRef34: Dynamic;
  elementRef35: Dynamic;
  elementRef38: Dynamic;
  elementRef39: Dynamic;
  elementRef44: Dynamic;
  elementRef45: Dynamic;
  elementRef49: Dynamic;
  elementRef50: Dynamic;
  elementRef51: Dynamic;
  elementRef52: Dynamic;
  elementRef6: Dynamic;
  elementRef67: Dynamic;
  enabledRef3: Dynamic;
  enabledRef4: Dynamic;
  enabledRef5: Dynamic;
  frameMessengerRef: Dynamic;
  inlineAskHostRef: Dynamic;
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
  recordRef3: Dynamic;
  recordRef4: Dynamic;
  resetAskStateRef: Dynamic;
  selbarPortRef: Dynamic;
  setEnumEditDialog: Dynamic;
  setFrameError: Dynamic;
  setLane: Dynamic;
  setLinkPopover: Dynamic;
  setMentionPopover2: Dynamic;
  setOpenUrl: Dynamic;
  setReady: Dynamic;
  setWritingPreview: Dynamic;
  uniqueItemsRef10: Dynamic;
  uniqueItemsRef6: Dynamic;
  uniqueItemsRef7: Dynamic;
  useDocumentContextWarm2: Dynamic;
  useDocumentInteractionOverlays11: Dynamic;
  useDocumentManifestState2: Dynamic;
  useWidgetBridgeStickPx3: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  return {
    ["drop"]: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.railSync.reset();
      roomPageContext.memoized.reset();
      roomPageContext.useWidgetBridgeStickPx3.current = null;
      (0, roomPageContext.setLane)(null);
      roomPageContext.navigatedRef.current = false;
      roomPageContext.enabledRef3.current = false;
      roomPageContext.enabledRef4.current = false;
      roomPageContext.isDocumentSelectionRandomUUIDRef.current.reset();
      roomPageContext.elementRef6.current?.reset();
      roomPageContext.elementRef21.current?.();
      roomPageContext.elementRef21.current = null;
      roomPageContext.elementRef22.current?.();
      roomPageContext.elementRef22.current = null;
      roomPageContext.useDocumentInteractionOverlays11.current(null);
      roomPageContext.elementRef49.current?.close();
      roomPageContext.elementRef49.current = null;
      roomPageContext.selbarPortRef.current?.close();
      roomPageContext.selbarPortRef.current = null;
      if (!roomDocumentPage?.orphan) {
        roomPageContext.elementRef39.current?.drop();
        roomPageContext.enabledRef5.current = false;
      }
      roomPageContext.frameMessengerRef.current.drop();
      roomPageContext.elementRef12.current?.dispose();
      roomPageContext.elementRef50.current?.release();
      roomPageContext.resetAskStateRef.current();
      roomPageContext.inlineAskHostRef.current?.reset();
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
      roomPageContext.elementRef67.current?.abandon();
      (0, roomPageContext.setWritingPreview)(null);
      let storeState: Dynamic = useCommentStore.getState();
      storeState.setPresent(null);
      storeState.setFolded(DataModelSchemasFreeze);
      storeState.setRects({}, []);
      storeState.setDocExtent(null);
      storeState.setDocScrollMax(null);
      storeState.setDraftAnchor(null);
      storeState.setDraftY(null);
      roomPageContext.DocumentSourcePromptState = null;
      (0, roomPageContext.setLinkPopover)(null);
      (0, roomPageContext.setMentionPopover2)();
      (0, roomPageContext.onClose)();
      roomPageContext.widgetPlacingRef.current = false;
      roomPageContext.countRef3.current = 0;
      roomPageContext.elementRef44.current = undefined;
      roomPageContext.elementRef45.current = undefined;
      (0, roomPageContext.setReady)(false);
      (0, roomPageContext.setFrameError)(null);
      roomPageContext.useDocumentContextWarm2.drop();
      (0, roomPageContext.bumpFrameMountEpoch)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let total: Dynamic = roomDocumentPage2 + 1;
        if (roomDocumentPage?.orphan) {
          roomPageContext.elementRef38.current = total;
        }
        return total;
      });
    }
  }["drop"];
}
export function runRoomPage77State(roomPageContext: {
  container: Dynamic;
  countRef3: Dynamic;
  drop: Dynamic;
  elementRef44: Dynamic;
  elementRef45: Dynamic;
  fsEntryId2: Dynamic;
  room: Dynamic;
}): Dynamic {
  return useDocumentRuntimeRoom(roomPageContext.room ? undefined : roomPageContext.container, roomPageContext.fsEntryId2, (..._extraArguments: unknown[]): undefined => {
    let element4: Dynamic = roomPageContext.elementRef44.current ?? roomPageContext.countRef3.current;
    let element5: Dynamic = roomPageContext.elementRef45.current ?? location.hash;
    (0, roomPageContext.drop)();
    if (element4 > 0) {
      roomPageContext.elementRef44.current = element4;
    }
    roomPageContext.elementRef45.current = element5;
  });
}
export function runRoomPage78Effect(roomPageContext: {
  elementRef37: Dynamic;
  elementRef39: Dynamic;
  enabledRef5: Dynamic;
  iframeRef: Dynamic;
  useDocumentInteractionOverlays21: Dynamic;
  useDocumentInteractionOverlaysRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.useDocumentInteractionOverlaysRef.current === roomPageContext.useDocumentInteractionOverlays21) return;
    roomPageContext.useDocumentInteractionOverlaysRef.current = roomPageContext.useDocumentInteractionOverlays21;
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    let matchesIframe = iframe !== null && iframe.ownerDocument.activeElement === iframe;
    roomPageContext.enabledRef5.current = matchesIframe;
    try {
      roomPageContext.elementRef39.current?.drop();
      if (matchesIframe) {
        roomPageContext.elementRef39.current?.arm();
      }
    } catch {}
    if (matchesIframe) {
      iframe.blur();
    }
    roomPageContext.elementRef37.current({
      orphan: true
    });
  }, [roomPageContext.useDocumentInteractionOverlays21]);
}
export function runRoomPage79Focus(roomPageContext: {
  enabledRef5: Dynamic;
  iframeRef: Dynamic;
}): Dynamic {
  return {
    ["focus"]: (..._extraArguments: unknown[]): undefined => {
      let iframe: Dynamic = roomPageContext.iframeRef.current;
      if (!roomPageContext.enabledRef5.current || iframe === null || iframe.name !== `lfile-orphan-remount`) return;
      roomPageContext.enabledRef5.current = false;
      let activeElement: Dynamic = iframe.ownerDocument.activeElement;
      if (iframe.ownerDocument.hasFocus() && (activeElement === null || activeElement === iframe.ownerDocument.body || activeElement === iframe.ownerDocument.documentElement)) {
        iframe.focus();
      }
    }
  }["focus"];
}
export function runRoomPage80Send2(roomPageContext: {
  send: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((nodeId2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    roomPageContext.widgetPlacingRef.current = true;
    (0, roomPageContext.send)({
      type: `widget-comment-placement`,
      nodeId: nodeId2
    });
  }, [roomPageContext.send]);
}
export function runRoomPage81Effect(roomPageContext: {
  iframeRef: Dynamic;
  send: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let send9: Dynamic = (..._extraArguments: unknown[]) => roomPageContext.widgetPlacingRef.current ? (roomPageContext.widgetPlacingRef.current = false, (0, roomPageContext.send)({
      type: `widget-comment-placement`,
      nodeId: null
    }), true) : false;
    let closest = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (event.key === `Escape`) {
        if (send9()) {
          event.preventDefault();
        }
      } else if (event.key === `Enter` && roomPageContext.widgetPlacingRef.current && !event.isComposing) {
        if (event.target?.closest?.(`input,textarea,select,[contenteditable='true'],[contenteditable=''],button,a[href],[role='menu'],[role='menuitem'],[role='button']`)) return;
        event.preventDefault();
        roomPageContext.widgetPlacingRef.current = false;
        (0, roomPageContext.send)({
          type: `widget-comment-placement`,
          nodeId: null,
          commit: true
        });
      }
    };
    let contains = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(event.target instanceof Node && roomPageContext.iframeRef.current?.contains(event.target))) {
        send9();
      }
    };
    window.addEventListener(`keydown`, closest, true);
    window.addEventListener(`pointerdown`, contains, true);
    return (..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`keydown`, closest, true);
      window.removeEventListener(`pointerdown`, contains, true);
    };
  }, [roomPageContext.send]);
}
export function runRoomPage82Effect(roomPageContext: {
  enabledRef9: Dynamic;
  roomDocumentPageResult10: Dynamic;
  send: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.roomDocumentPageResult10) {
      roomPageContext.enabledRef9.current = true;
      return;
    }
    if (roomPageContext.enabledRef9.current) {
      roomPageContext.enabledRef9.current = false;
      (0, roomPageContext.send)({
        type: `widget-comment-placement`,
        clearTarget: true
      });
    }
  }, [roomPageContext.roomDocumentPageResult10, roomPageContext.send]);
}
export function runRoomPage83Effect(roomPageContext: {
  commentsReadOnlyRef: Dynamic;
  send: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => resolveDocumentRuntimeSubscribe({
    previewUp: (..._extraArguments: unknown[]) => !!PlatformSyncAndRoutingAssign2.getState().preview,
    viewOnly: (..._extraArguments: unknown[]): Dynamic => roomPageContext.commentsReadOnlyRef.current,
    typing: (..._extraArguments: unknown[]): Dynamic => isDocumentRuntimeIsContentEditable(document.activeElement),
    post: (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.send)({
      type: `comment-key`
    })
  }), [roomPageContext.send]);
}
export function runRoomPage84Effect(roomPageContext: {
  folds: Dynamic;
  send: Dynamic;
  useDocumentRuntimeUseSyncExternalStore2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    (0, roomPageContext.send)({
      type: `host-selection-menu`,
      on: roomPageContext.useDocumentRuntimeUseSyncExternalStore2,
      folds: roomPageContext.folds
    });
  }, [roomPageContext.useDocumentRuntimeUseSyncExternalStore2, roomPageContext.folds, roomPageContext.send]);
}
export function runRoomPage85RoomDocumentPageResult11(roomPageContext: {
  frameError: Dynamic;
  items: Dynamic;
  readOnly2: Dynamic;
  reason: Dynamic;
  room: Dynamic;
  save: Dynamic;
  useDocumentInteractionOverlays22: Dynamic;
  useDocumentInteractionOverlays24: Dynamic;
  words: Dynamic;
}): boolean {
  return resolvePlatformKeyboardAndSaveStatusOpening({
    error: roomPageContext.reason !== null,
    iframeError: roomPageContext.frameError !== null,
    loud: (roomPageContext.room ? roomPageContext.items.length > 0 || roomPageContext.words !== null : false) || roomPageContext.useDocumentInteractionOverlays24 !== null,
    hasState: roomPageContext.useDocumentInteractionOverlays22 !== null,
    room: !!roomPageContext.room,
    bound: !!roomPageContext.room || !roomPageContext.readOnly2,
    saveWord: roomPageContext.save?.word ?? null
  });
}
export function runRoomPage86Effect(roomPageContext: {
  mentionPopover: Dynamic;
  readOnly3: Dynamic;
  selbarPortRef: Dynamic;
  setMentionPopover2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.readOnly3 || !roomPageContext.mentionPopover) return;
    let enabled5 = !!document.activeElement?.closest?.(`[data-testid="ldoc-altpop"]`);
    (0, roomPageContext.setMentionPopover2)();
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `alt-cancel`,
      nodeId: roomPageContext.mentionPopover.nodeId,
      ...(enabled5 ? {} : {
        keepFocus: true
      })
    });
  }, [roomPageContext.readOnly3, roomPageContext.mentionPopover]);
}
export function runRoomPage87Effect(roomPageContext: {
  enabledRef3: Dynamic;
  enabledRef7: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  responseRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => installDocumentSelectionHasFocus({
    win: window,
    live: (..._extraArguments: unknown[]): Dynamic => roomPageContext.enabledRef3.current && !roomPageContext.navigatedRef.current && !PlatformSyncAndRoutingAssign2.getState().preview,
    readOnly: (..._extraArguments: unknown[]): Dynamic => roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly,
    post: (..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.iframeRef.current?.contentWindow, {
      type: `caret-focus`
    })
  }), []);
}
export function runRoomPage88SetTarget2(roomPageContext: {
  setTarget: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    (0, roomPageContext.setTarget)({
      nodeId: event.nodeId,
      target: event.target,
      warmOnly: true,
      ...(event.rows === undefined ? {} : {
        rows: event.rows
      }),
      ...(event.rowsPin === undefined ? {} : {
        rowsPin: event.rowsPin
      }),
      ...(event.fed === undefined ? {} : {
        fed: event.fed
      }),
      ...(event.fedPath === undefined ? {} : {
        fedPath: event.fedPath
      }),
      ...(event.inline === undefined ? {} : {
        inline: event.inline
      }),
      ...(event.at === undefined ? {} : {
        at: event.at
      }),
      ...(event.status === undefined ? {} : {
        status: event.status
      })
    });
  }, []);
}
export function runRoomPage89OnPressOutside(roomPageContext: {
  elementRef58: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let nodeId2: Dynamic = roomPageContext.elementRef58.current;
    if (nodeId2 === undefined) return;
    let tell = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`click`, tell);
      window.removeEventListener(`pointercancel`, tell, true);
      if (!(!(roomDocumentPage2 instanceof MouseEvent) || roomDocumentPage2.type !== `click`)) {
        if (!(Math.abs(roomDocumentPage2.clientX - roomDocumentPage.x) > 4 || Math.abs(roomDocumentPage2.clientY - roomDocumentPage.y) > 4)) {
          EditorHostTell.tell({
            nodeId: nodeId2,
            x: roomDocumentPage.x,
            y: roomDocumentPage.y
          });
        }
      }
    };
    window.addEventListener(`click`, tell);
    window.addEventListener(`pointercancel`, tell, true);
  }, []);
}
export function runRoomPage90Effect(roomPageContext: {
  room: Dynamic;
  setProjectContainer: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.room) {
      (0, roomPageContext.setProjectContainer)(null);
      return;
    }
    (0, roomPageContext.setProjectContainer)(null);
    if (isFrameArtifact()) {
      (0, roomPageContext.setProjectContainer)({
        name: `projects/${roomPageContext.room.pid}`,
        pid: roomPageContext.room.pid
      });
      return;
    }
    let enabled5 = true;
    let roomDocumentPageResult34: Dynamic;
    let count: number = 500;
    let object = (..._extraArguments: unknown[]): undefined => void api.object(`projects/${roomPageContext.room.pid}`, {
      byId: true
    }).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (enabled5) {
        (0, roomPageContext.setProjectContainer)({
          name: result.name,
          pid: roomPageContext.room.pid
        });
      }
    }, (response2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!enabled5 || count > 8e3) return;
      let status: Dynamic = response2?.status;
      if (status === 404) {
        if (enabled5) {
          (0, roomPageContext.setProjectContainer)({
            name: `projects/${roomPageContext.room.pid}`,
            pid: roomPageContext.room.pid
          });
        }
        return;
      }
      if (!(status !== undefined && status < 500 && status !== 401 && status !== 408 && status !== 429)) {
        roomDocumentPageResult34 = setTimeout(object, count);
        count *= 2;
      }
    });
    object();
    return (..._extraArguments: unknown[]): undefined => {
      enabled5 = false;
      if (roomDocumentPageResult34 !== undefined) {
        clearTimeout(roomDocumentPageResult34);
      }
    };
  }, [roomPageContext.room?.pid]);
}
export function runRoomPage91Effect(roomPageContext: {
  fsEntryId2: Dynamic;
  path: Dynamic;
  projectContainer: Dynamic;
  room: Dynamic;
  roomNodeId: Dynamic;
  routePageRef: Dynamic;
}): Dynamic {
  return roomPageContext.routePageRef.current = {
    tab: roomPageContext.room?.fileId,
    pid: roomPageContext.projectContainer?.pid,
    roomNodeId: roomPageContext.roomNodeId,
    path: roomPageContext.path,
    pageId: roomPageContext.fsEntryId2 ?? ``
  };
}
export function runRoomPage92Effect(roomPageContext: {
  fsEntryId2: Dynamic;
  room: Dynamic;
  roomNodeIdRef: Dynamic;
  roomPageModuleUrl: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.room || !roomPageContext.fsEntryId2 || !isFrameArtifact()) return;
    let enabled5 = true;
    let roomDocumentPageResult34: Dynamic;
    preloadModule(async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let {
        subscribeProjectFeed: subscribeProjectFeed2
      }: Dynamic = await import("../../platform/index").then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformApiAndAuthFEEDTOPIC);
      return {
        subscribeProjectFeed: subscribeProjectFeed2
      };
    }, mapPreloadDependencies([0, 1, 2, 3]), roomPageContext.roomPageModuleUrl).then(({
      subscribeProjectFeed: subscribeProjectFeed2
    }: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (enabled5) {
        roomDocumentPageResult34 = subscribeProjectFeed2(roomPageContext.room.pid, (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (entry.kind === `envelope`) {
            rememberAgentWriteCursor(roomPageContext.fsEntryId2, roomPageContext.roomNodeIdRef.current, isDataModelSchemasKind3(entry.envelope), entry.envelope, entry.seq);
          }
        });
      }
    });
    return (..._extraArguments: unknown[]): undefined => {
      enabled5 = false;
      roomDocumentPageResult34?.();
    };
  }, [roomPageContext.room?.pid, roomPageContext.fsEntryId2]);
}

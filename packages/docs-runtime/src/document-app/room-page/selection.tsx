import { React, mapPreloadDependencies } from "../bootstrap";
import { DocumentRuntimeSearch, DocumentRuntimeState6, DocumentRuntimeState7, resolveDocumentRuntimeActiveId, resolveDocumentRuntimeActiveId2, resolveDocumentRuntimeFocusId } from "../document-runtime/widget-provenance-gutter";
import { resolveWidgetBridgeEntries, resolveWidgetBridgeLabel } from "../widget-bridge/widget-sample-card";
import { documentRuntimeLimit250, documentRuntimeLimit2500 } from "../document-runtime/use-document-runtime-room";
import { resolveDocumentCommandsCurrent } from "../document-commands/create-ask-card-request-pool";

/** BaoCut: room document selection; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { B_ as frameAskClaude, Bl as resolveEditorHostValue22, Ci as resolveEditorSelectionAndTablesQuote, Dx as resolvePlatformKeyboardAndSaveStatusSaving, Gf as useCommentStore, Lj as resolveDataContentAndReferencesValue3, Ll as resolveEditorHostValue24, Mn as loadPlatformLiveDocumentAndHistoryContainer, TO as resolveEditorAnchorsAndMentionsValue7, Vr as updateEditorSelectionAndTablesChat, Xs as updatePlatformSyncAndRoutingHeadEmbedNodes, ap as resolveCommentsStoreNode, bf as heldThreads, cj as resolvePlatformSessionAndSourcesTest4, dj as PlatformSessionAndSourcesAddedToYourMessageToClaude, fj as PlatformSessionAndSourcesMessage4, hj as resolvePlatformSessionAndSourcesPath, kp as resolvePlatformAnnouncementsValue, lg as isPlatformApiAndAuthAnon, m_ as api, mg as resolvePlatformApiAndAuthCharCodeAt, np as resolveCommentsStoreKind2, qr as EditorSelectionAndTablesByFile2, sg as installPlatformApiAndAuthPagehide, vx as toast } from "../../platform/index";
import { S as isFrameArtifact } from "../../boot/environment";
import { t as preloadModule } from "../../boot/preload";
import { D as watchReferenceChanges, w as resolveLocalReference } from "../references/chips";
export function runRoomPage93Effect(roomPageContext: {
  room: Dynamic;
  roomPageModuleUrl: Dynamic;
  send: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.room) return;
    let enabled5 = true;
    let roomDocumentPageResult34: Dynamic;
    preloadModule(async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let {
        subscribeProjectFeed: subscribeProjectFeed2
      }: Dynamic = await import("../../platform/index").then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.Fg);
      return {
        subscribeProjectFeed: subscribeProjectFeed2
      };
    }, mapPreloadDependencies([0, 1, 2, 3]), roomPageContext.roomPageModuleUrl).then(({
      subscribeProjectFeed: subscribeProjectFeed2
    }: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (enabled5) try {
        roomDocumentPageResult34 = watchReferenceChanges((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => subscribeProjectFeed2(roomPageContext.room.pid, roomDocumentPage), (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.send)({
          type: `enums-changed`
        }));
      } catch {}
    }).catch((..._extraArguments: unknown[]): undefined => {});
    return (..._extraArguments: unknown[]): undefined => {
      enabled5 = false;
      roomDocumentPageResult34?.();
    };
  }, [roomPageContext.room?.pid]);
}
export function runRoomPage94Effect(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  lookupRef7: Dynamic;
  navigatedRef: Dynamic;
  useDocumentInteractionOverlays22: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.useDocumentInteractionOverlays22 || roomPageContext.lookupRef7.current.size === 0) return;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current)) for (let [roomDocumentPageResult34, roomDocumentPageResult35] of roomPageContext.lookupRef7.current as Dynamic) {
      let response2: Dynamic = resolveLocalReference(roomPageContext.useDocumentInteractionOverlays22.file, roomDocumentPageResult35.ref);
      if (!response2.ok) {
        if (roomDocumentPageResult35.lastErr === response2.error) continue;
        roomDocumentPageResult35.lastErr = response2.error;
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `bridge-reply`,
          id: roomDocumentPageResult34,
          ok: false,
          error: response2.error
        });
        continue;
      }
      roomDocumentPageResult35.lastErr = undefined;
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `bridge-reply`,
        id: roomDocumentPageResult34,
        ok: true,
        value: response2.value
      });
    }
  }, [roomPageContext.useDocumentInteractionOverlays22]);
}
export function runRoomPage95Memoized2(roomPageContext: {
  roomDocumentPageResult13: Dynamic;
  roomDocumentPageResult14: Dynamic;
  roomDocumentPageResult15: Dynamic;
}): Dynamic {
  return (0, React.useMemo)((..._extraArguments: unknown[]): Dynamic => {
    let connId: Dynamic = installPlatformApiAndAuthPagehide();
    return roomPageContext.roomDocumentPageResult15.id !== null || roomPageContext.roomDocumentPageResult15.name !== `` ? {
      name: roomPageContext.roomDocumentPageResult15.name || roomPageContext.roomDocumentPageResult15.id || `anon`,
      color: roomPageContext.roomDocumentPageResult15.color || resolvePlatformApiAndAuthCharCodeAt(isPlatformApiAndAuthAnon(roomPageContext.roomDocumentPageResult15.id ?? undefined, connId)),
      connId: connId
    } : {
      name: roomPageContext.roomDocumentPageResult13 ?? `anon`,
      color: resolvePlatformApiAndAuthCharCodeAt(isPlatformApiAndAuthAnon(roomPageContext.roomDocumentPageResult14, connId)),
      connId: connId
    };
  }, [roomPageContext.roomDocumentPageResult13, roomPageContext.roomDocumentPageResult14, roomPageContext.roomDocumentPageResult15]);
}
export function runRoomPage96Effect(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  memoizedRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageResult13: Dynamic;
  roomDocumentPageResult15: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `user`,
      user: roomPageContext.memoizedRef.current
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.roomDocumentPageResult13, roomPageContext.roomDocumentPageResult15]);
}
export function runRoomPage97Effect(roomPageContext: {
  enabledRef3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageResult16: Dynamic;
  roomDocumentPageResultRef5: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `follow`,
      uid: roomPageContext.roomDocumentPageResultRef5.current
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.roomDocumentPageResult16]);
}
export function runRoomPage98Effect(roomPageContext: {
  elementRef59: Dynamic;
  enabledRef3: Dynamic;
  fileIdRef: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  send: Dynamic;
  sheetScrollRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let send9 = (roomDocumentPage?: Dynamic, scroll?: Dynamic, focus3?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!contentWindow || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
      let record4: Dynamic = {
        type: `comment-active`,
        id: roomDocumentPage,
        scroll: scroll,
        focus: focus3,
        peers: [...dependencies]
      };
      roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
    };
    let subscribe: Dynamic = useCommentStore.subscribe((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let documentRuntimeActiveId: Dynamic = resolveDocumentRuntimeActiveId(roomDocumentPage);
      let documentRuntimeActiveId2: Dynamic = resolveDocumentRuntimeActiveId(options);
      let documentRuntimeFocusId: Dynamic = resolveDocumentRuntimeFocusId(roomDocumentPage);
      let documentRuntimeFocusId2: Dynamic = resolveDocumentRuntimeFocusId(options);
      let documentRuntimeActiveId22: Dynamic = resolveDocumentRuntimeActiveId2(roomDocumentPage);
      if (documentRuntimeActiveId !== documentRuntimeActiveId2 || documentRuntimeFocusId !== documentRuntimeFocusId2 || documentRuntimeActiveId22 !== resolveDocumentRuntimeActiveId2(options)) {
        send9(documentRuntimeActiveId, false, documentRuntimeFocusId, documentRuntimeActiveId22);
      }
      if (roomDocumentPage.scrollToId && roomDocumentPage.scrollToId !== options.scrollToId) {
        let matchesSheetScroll = roomPageContext.sheetScrollRef.current?.(roomDocumentPage.scrollToId) === true;
        send9(roomDocumentPage.scrollToId, !matchesSheetScroll, resolveDocumentRuntimeFocusId(roomDocumentPage), resolveDocumentRuntimeActiveId2(roomDocumentPage));
        roomPageContext.elementRef59.current?.();
        if (!matchesSheetScroll && !Object.hasOwn(roomDocumentPage.rects, roomDocumentPage.scrollToId) && roomDocumentPage.focusId === roomDocumentPage.scrollToId) {
          let scrollToId: Dynamic = roomDocumentPage.scrollToId;
          let frag: string = ``;
          let enabled5 = false;
          for (let event of heldThreads(roomDocumentPage) as Dynamic) if (event.id === scrollToId) {
            frag = event.target?.pageId ?? ``;
            enabled5 = resolveWidgetBridgeLabel(event) !== undefined;
          }
          let useDocumentRuntimeFsEntryId5: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
          if (useDocumentRuntimeFsEntryId5 && frag && EditorSelectionAndTablesByFile2.getState().byFile[useDocumentRuntimeFsEntryId5]?.[frag]) {
            let roomDocumentPageResult34: Dynamic;
            let updateElement = (..._extraArguments: unknown[]): undefined => {
              clearTimeout(roomDocumentPageResult34);
              clearTimeout(setTimeout2);
              subscribe2();
              subscribe3();
              if (roomPageContext.elementRef59.current === updateElement) {
                roomPageContext.elementRef59.current = null;
              }
            };
            let sheetScroll: Dynamic = (roomDocumentPage2: Dynamic = false, ..._extraArguments: unknown[]) => {
              if (!roomDocumentPage2 && !roomPageContext.enabledRef3.current) return roomDocumentPageHandler6();
              updateElement();
              if (useCommentStore.getState().focusId === scrollToId) {
                if (!(enabled5 && Object.hasOwn(useCommentStore.getState().rects, scrollToId) || (roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current) !== useDocumentRuntimeFsEntryId5 || roomPageContext.sheetScrollRef.current?.(scrollToId) === true)) {
                  (0, roomPageContext.send)({
                    type: `jump-to`,
                    frag: frag
                  });
                }
              }
            };
            let setTimeout2 = setTimeout((..._extraArguments: unknown[]): Dynamic => sheetScroll(true), documentRuntimeLimit2500);
            let roomDocumentPageHandler6 = (..._extraArguments: unknown[]): undefined => {
              clearTimeout(roomDocumentPageResult34);
              roomDocumentPageResult34 = setTimeout(sheetScroll, documentRuntimeLimit250);
            };
            let subscribe2: Dynamic = EditorSelectionAndTablesByFile2.subscribe(roomDocumentPageHandler6);
            let subscribe3: Dynamic = useCommentStore.subscribe((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (roomDocumentPage2.focusId !== scrollToId) {
                updateElement();
              }
            });
            roomPageContext.elementRef59.current = updateElement;
            roomDocumentPageHandler6();
          }
        }
        let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
        let byPageItem: Dynamic = (useDocumentRuntimeFsEntryId4 ? useCommentStore.getState().byPage[useDocumentRuntimeFsEntryId4] : undefined)?.find((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]) => roomDocumentPage2.id === roomDocumentPage.scrollToId);
        let anchor: Dynamic = byPageItem?.target?.anchor;
        let match = anchor?.kind === `lfile` && typeof anchor.ref == `string` ? /#(ln-[A-Za-z0-9_-]{1,64})~el:/.exec(anchor.ref) : null;
        let vs2: Dynamic = byPageItem?.target?.vs;
        if (match && vs2 && Object.keys(vs2).length) {
          let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
          if (contentWindow && roomPageContext.enabledRef3.current && !roomPageContext.navigatedRef.current) {
            let record4: Dynamic = {
              type: `widget-vs-seed`,
              nodeId: match[1],
              vs: vs2
            };
            roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
          }
        }
        useCommentStore.getState().scrollTo(null);
      }
    });
    return (..._extraArguments: unknown[]): undefined => {
      subscribe();
      roomPageContext.elementRef59.current?.();
    };
  }, [roomPageContext.useDocumentRuntimeFsEntryId3, roomPageContext.send]);
}
export function runRoomPage99Effect(roomPageContext: {
  label: Dynamic;
  nodes: Dynamic;
  roomDocumentPageResult18: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.roomDocumentPageResult18 || roomPageContext.nodes === undefined || roomPageContext.label === null) return;
    let widgetBridgeEntries: Dynamic = resolveWidgetBridgeEntries(roomPageContext.nodes);
    if (Object.keys(widgetBridgeEntries).length !== 0) {
      updatePlatformSyncAndRoutingHeadEmbedNodes(roomPageContext.label, widgetBridgeEntries);
      return (..._extraArguments: unknown[]) => updatePlatformSyncAndRoutingHeadEmbedNodes(roomPageContext.label, null);
    }
  }, [roomPageContext.roomDocumentPageResult18, roomPageContext.nodes, roomPageContext.label]);
}
export function runRoomPage100Record3(roomPageContext: {
  alarmOwed: Dynamic;
  items: Dynamic;
  overdue: Dynamic;
  save: Dynamic;
  saveWords: Dynamic;
}): Dynamic {
  return {
    save: roomPageContext.save,
    saveWords: roomPageContext.saveWords,
    rescues: roomPageContext.items.length,
    alarmOwed: roomPageContext.alarmOwed,
    overdue: roomPageContext.overdue
  };
}
export function runRoomPage101Turned(roomPageContext: {
  held: Dynamic;
  leaving: Dynamic;
  quiet: Dynamic;
  readOnly2: Dynamic;
  save: Dynamic;
}): Dynamic {
  return resolvePlatformKeyboardAndSaveStatusSaving({
    held: roomPageContext.held,
    readOnly: roomPageContext.readOnly2,
    covered: roomPageContext.leaving,
    quiet: roomPageContext.quiet,
    judged: roomPageContext.save?.word ?? null
  });
}
export function runRoomPage102Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askReconcilePendingRef: Dynamic;
  elementRef9: Dynamic;
  record: Dynamic;
  record2: Dynamic;
  roomDocumentPageResult20: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!resolveDataContentAndReferencesValue3(roomPageContext.roomDocumentPageResult20) || roomPageContext.record.closed) return;
    resolveDocumentCommandsCurrent(roomPageContext.record);
    roomPageContext.askReconcilePendingRef.current = true;
    let inHand: Dynamic = roomPageContext.askCardDeskRef.current?.inHand() ?? null;
    if (inHand !== null) {
      roomPageContext.elementRef9.current(inHand);
    }
    roomPageContext.record2.changed();
  }, [roomPageContext.roomDocumentPageResult20]);
}
export function runRoomPage103Observe(roomPageContext: {
  elementRef60: Dynamic;
  elementRef61: Dynamic;
  setEnabledState2: Dynamic;
  setPhone: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    roomPageContext.elementRef60.current?.disconnect();
    roomPageContext.elementRef60.current = null;
    roomPageContext.elementRef61.current?.();
    roomPageContext.elementRef61.current = null;
    if (!roomDocumentPage) return;
    let matchMedia2 = window.matchMedia?.(`(pointer: coarse)`) ?? null;
    let roomDocumentPageHandler6: Dynamic = (..._extraArguments: unknown[]) => matchMedia2?.matches ?? false;
    if (matchMedia2?.addEventListener) {
      let setPhone2: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setPhone)(resolveEditorHostValue22(roomDocumentPage.offsetWidth, roomDocumentPageHandler6()));
      matchMedia2.addEventListener(`change`, setPhone2);
      roomPageContext.elementRef61.current = (..._extraArguments: unknown[]) => matchMedia2.removeEventListener(`change`, setPhone2);
    }
    (0, roomPageContext.setEnabledState2)(resolveEditorHostValue24(roomDocumentPage.offsetWidth, null));
    (0, roomPageContext.setPhone)(resolveEditorHostValue22(roomDocumentPage.offsetWidth, roomDocumentPageHandler6()));
    let resizeObserver = new ResizeObserver(([roomDocumentPage2]: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let inlineSize: Dynamic = roomDocumentPage2?.borderBoxSize?.[0]?.inlineSize ?? roomDocumentPage.offsetWidth;
      (0, roomPageContext.setEnabledState2)((roomDocumentPage3?: Dynamic, ..._extraArguments: unknown[]) => resolveEditorHostValue24(inlineSize, roomDocumentPage3));
      (0, roomPageContext.setPhone)(resolveEditorHostValue22(inlineSize, roomDocumentPageHandler6()));
    });
    resizeObserver.observe(roomDocumentPage);
    roomPageContext.elementRef60.current = resizeObserver;
  }, []);
}
export function runRoomPage104LoadHandlers(roomPageContext: {
  containerRef: Dynamic;
  enabledRef13: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return (0, React.useCallback)(async (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => {
    let roomDocumentPageResult34: Dynamic = resolvePlatformSessionAndSourcesTest4(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)());
    if (!roomDocumentPageResult34 || !roomPageContext.enabledRef13.current) return [];
    let room2: Dynamic = roomPageContext.roomRef.current;
    let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
    try {
      return resolveEditorAnchorsAndMentionsValue7((room2 ? await loadPlatformLiveDocumentAndHistoryContainer(room2.pid, room2.fileId, roomDocumentPageResult34) : useDocumentRuntimeFsEntryId4 ? await api.lfile.widgetBundle(roomPageContext.containerRef.current, useDocumentRuntimeFsEntryId4, roomDocumentPageResult34) : null)?.effects);
    } catch {
      return [];
    }
  }, [roomPageContext.useDocumentRuntimeFsEntryId3]);
}
export function runRoomPage105OnRun(roomPageContext: {
  containerRef: Dynamic;
  enabledRef13: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return (0, React.useCallback)(async (roomDocumentPage?: Dynamic, routine?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => {
    let roomDocumentPageResult34: Dynamic = resolvePlatformSessionAndSourcesTest4(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)());
    if (!roomDocumentPageResult34 || !roomPageContext.enabledRef13.current) return {
      error: true,
      rule: `not-allowed`,
      message: `This action isn't available here.`
    };
    let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
    return useDocumentRuntimeFsEntryId4 ? await api.lfile.widgetInvoke(roomPageContext.containerRef.current, useDocumentRuntimeFsEntryId4, roomDocumentPageResult34, {
      routine: routine
    }) : {
      error: true,
      rule: `bad-request`,
      message: `Running isn't available for this block yet.`
    };
  }, [roomPageContext.useDocumentRuntimeFsEntryId3]);
}
export function runRoomPage106OnEscape(roomPageContext: {
  enabledRef3: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  selbarPortRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    return !iframe || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current ? false : (iframe.focus(), roomPageContext.selbarPortRef.current?.postMessage({
      type: `widget-toolbar-exit`,
      nodeId: resolvePlatformSessionAndSourcesTest4(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)())
    }), true);
  }, []);
}
export function runRoomPage107OnDelete(roomPageContext: {
  enabledRef3: Dynamic;
  fileIdRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageHandler4: Dynamic;
  selbarPortRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let nodeId2: Dynamic = (0, roomPageContext.roomDocumentPageHandler4)(roomDocumentPage);
    if (!nodeId2) return;
    let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
    if (!selbarPort || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
    let byFileItemItem: Dynamic = useDocumentRuntimeFsEntryId4 ? EditorSelectionAndTablesByFile2.getState().byFile[useDocumentRuntimeFsEntryId4]?.[nodeId2] : undefined;
    if (!byFileItemItem) {
      toast.error(`Couldn't delete the widget — try again.`);
      return;
    }
    let record4: Dynamic = {
      type: `widget-delete`,
      nodeId: nodeId2,
      box: {
        top: byFileItemItem.top,
        left: byFileItemItem.left,
        width: byFileItemItem.width
      },
      ...(options ? {
        at: options
      } : {})
    };
    selbarPort.postMessage(record4);
  }, [roomPageContext.useDocumentRuntimeFsEntryId3, roomPageContext.roomDocumentPageHandler4]);
}
export function runRoomPage108OnOpenWidgetPanel4(roomPageContext: {
  onOpenWidgetCode2: Dynamic;
  onOpenWidgetCodeRef: Dynamic;
  onOpenWidgetPanel3: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.onOpenWidgetCodeRef.current) {
      (0, roomPageContext.onOpenWidgetCode2)(roomDocumentPage);
    } else {
      (0, roomPageContext.onOpenWidgetPanel3)(roomDocumentPage, `code`);
    }
  }, [roomPageContext.onOpenWidgetCode2, roomPageContext.onOpenWidgetPanel3]);
}
export function runRoomPage109Callback(roomPageContext: {}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    frameAskClaude(roomDocumentPage).then((response2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (response2.ok) {
        resolvePlatformAnnouncementsValue(document, PlatformSessionAndSourcesAddedToYourMessageToClaude, {
          key: `toolbar`
        });
      } else {
        toast(PlatformSessionAndSourcesMessage4, {
          id: `ask-claude-frame`,
          duration: 4e3
        });
      }
    });
  }, []);
}
export function runRoomPage110Callback2(roomPageContext: {
  judge: Dynamic;
  roomNodeIdRef: Dynamic;
  roomRef: Dynamic;
  title2: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]): Dynamic => resolveEditorSelectionAndTablesQuote({
    framed: isFrameArtifact(),
    file: roomPageContext.roomRef.current?.fileId,
    node: roomPageContext.roomNodeIdRef.current,
    judge: roomPageContext.judge,
    title: roomPageContext.title2,
    post: frameAskClaude
  }, roomDocumentPage, options, context), [roomPageContext.judge, roomPageContext.title2]);
}
export function runRoomPage111Callback3(roomPageContext: {
  callback: Dynamic;
  judge: Dynamic;
  lookupRef8: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomRef: Dynamic;
  title2: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let node: Dynamic = resolvePlatformSessionAndSourcesTest4(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)());
    if (!node) return;
    let room2: Dynamic = roomPageContext.roomRef.current;
    if (!room2) return;
    if (isFrameArtifact()) {
      let judge2: Dynamic = (0, roomPageContext.judge)(roomPageContext.lookupRef8.current.get(node));
      if (!judge2) {
        toast(PlatformSessionAndSourcesMessage4, {
          id: `ask-claude-frame`,
          duration: 4e3
        });
        return;
      }
      (0, roomPageContext.callback)({
        text: resolveCommentsStoreNode(resolveCommentsStoreKind2(node)) || `Widget ${node}`,
        ref: resolvePlatformSessionAndSourcesPath({
          file: room2.fileId,
          node: node,
          bid: judge2.bid
        }),
        kind: `widget`,
        title: (0, roomPageContext.title2)(judge2.bid)
      });
      return;
    }
    let anchor: Dynamic = resolveCommentsStoreKind2(node);
    updateEditorSelectionAndTablesChat(DocumentRuntimeSearch, {
      fileId: room2.fileId,
      anchor: anchor,
      nodeId: node
    });
  }, [roomPageContext.callback, roomPageContext.judge, roomPageContext.title2]);
}
export function runRoomPage112Memoized3(roomPageContext: {
  callback3: Dynamic;
  lastDataTarget: Dynamic;
  loadHandlers: Dynamic;
  onComment: Dynamic;
  onDelete: Dynamic;
  onEscape: Dynamic;
  onOpenWidgetCode2: Dynamic;
  onOpenWidgetPanel3: Dynamic;
  onOpenWidgetPanel4: Dynamic;
  onReact: Dynamic;
  onRun: Dynamic;
  onViewData: Dynamic;
}): Dynamic {
  return (0, React.useMemo)((..._extraArguments: unknown[]): Dynamic => ({
    loadHandlers: roomPageContext.loadHandlers,
    onRun: roomPageContext.onRun,
    onOpenPanel: DocumentRuntimeState7 ? undefined : roomPageContext.onOpenWidgetPanel3,
    onOpenCode: DocumentRuntimeState7 ? undefined : roomPageContext.onOpenWidgetCode2,
    onViewData: roomPageContext.onViewData,
    viewDataFor: roomPageContext.lastDataTarget?.nodeId ?? null,
    onAskClaude: DocumentRuntimeState6 ? undefined : roomPageContext.callback3,
    onComment: roomPageContext.onComment,
    onReact: roomPageContext.onReact,
    onDelete: roomPageContext.onDelete,
    onEdit: DocumentRuntimeState7 ? undefined : roomPageContext.onOpenWidgetPanel4,
    onEscape: roomPageContext.onEscape,
    chord: true
  }), [roomPageContext.loadHandlers, roomPageContext.onRun, roomPageContext.onOpenWidgetPanel3, roomPageContext.onOpenWidgetCode2, roomPageContext.onViewData, roomPageContext.lastDataTarget?.nodeId, roomPageContext.callback3, roomPageContext.onComment, roomPageContext.onReact, roomPageContext.onDelete, roomPageContext.onOpenWidgetPanel4, roomPageContext.onEscape]);
}

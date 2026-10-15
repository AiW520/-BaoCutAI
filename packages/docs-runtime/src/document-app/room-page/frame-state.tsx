import { React } from "../bootstrap";
import { resolveWidgetBridgeCite } from "../widget-bridge/state";
import { documentDisplayPostState, documentFontsPostState, documentLanguageAttributes } from "../document-display";
import { resolveFrameGesturesIds } from "../frame/gestures-state-1";
import { documentRuntimeLimit10000, documentRuntimeLimit2000, documentRuntimeLimit24 } from "../document-runtime/widget-provenance-gutter";

/** BaoCut: room document frame state; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { Av as frameSamplePermission, Br as EditorSelectionAndTablesPrefs, Fr as EditorSelectionAndTablesRoads, Ir as EditorSelectionAndTablesState8, Mr as filterEditorSelectionAndTablesText, Nr as resolveEditorSelectionAndTablesSpellWords, Oi as resolveEditorSelectionAndTablesHasOwn, Ov as frameSampleAvailable, Pr as EditorSelectionAndTablesState7, Rr as EditorSelectionAndTablesState6, Ry as clearObservabilityBrowserAndOperationEventsDelete, Sn as PlatformLiveDocumentAndHistoryDocReady, Tv as frameProofreadRound, Wl as resolveEditorHostKind3, di as isEditorSelectionAndTablesRowIndex, jr as filterEditorSelectionAndTablesValue, ki as resolveEditorSelectionAndTablesCreate, li as resolveEditorSelectionAndTablesNull, mh as isDatumPinThread, wh as widgetAnchorOfThread, wv as frameProofreadEnabled, zr as isEditorSelectionAndTablesSpelling } from "../../platform/index";
import { S as isFrameArtifact } from "../../boot/environment";
export function runRoomPage130Effect(roomPageContext: {
  enabledState5: Dynamic;
  setEnabledState4: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.enabledState5) return;
    let setEnabledState5: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setEnabledState4)(false);
    document.addEventListener(`pointerdown`, setEnabledState5, {
      capture: true
    });
    return (..._extraArguments: unknown[]) => document.removeEventListener(`pointerdown`, setEnabledState5, {
      capture: true
    });
  }, [roomPageContext.enabledState5]);
}
export function runRoomPage131Slice(roomPageContext: {
  recordState2: Dynamic;
  recordState3: Dynamic;
  roomDocumentPageResult17: Dynamic;
}): Dynamic {
  return (0, React.useMemo)((..._extraArguments: unknown[]): Dynamic => {
    let record4: Dynamic = {};
    for (let roomDocumentPageResult34 of Object.keys(roomPageContext.recordState3) as Dynamic) {
      let activity: Dynamic = null;
      for (let event of roomPageContext.roomDocumentPageResult17 as Dynamic) {
        let anchor: Dynamic = event.target?.anchor;
        if (!(anchor?.kind === `lfile` && typeof anchor.ref == `string` ? anchor.ref : ``).endsWith(`#${roomDocumentPageResult34}`)) continue;
        let body: Dynamic = event.root?.body;
        if (typeof body != `string` || !body.trim()) continue;
        let at2: Dynamic = event.root?.at ?? ``;
        if (!activity || at2 < activity.at) {
          activity = {
            at: at2,
            body: body
          };
        }
      }
      if (activity) {
        record4[roomDocumentPageResult34] = activity.body.slice(0, 400);
      } else {
        if (roomPageContext.recordState2[roomDocumentPageResult34]) {
          record4[roomDocumentPageResult34] = roomPageContext.recordState2[roomDocumentPageResult34].prompt.slice(0, 400);
        }
      }
    }
    return record4;
  }, [roomPageContext.recordState3, roomPageContext.roomDocumentPageResult17, roomPageContext.recordState2]);
}
export function runRoomPage132Effect(roomPageContext: {
  enabled2: Dynamic;
  fileId3: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!roomPageContext.fileId3 || !roomPageContext.enabled2 || !roomPageContext.ready) return;
    let {
      registerDoc: storeState,
      unregisterDoc: storeState2
    }: Dynamic = PlatformLiveDocumentAndHistoryDocReady.getState();
    storeState(roomPageContext.fileId3);
    return (..._extraArguments: unknown[]): Dynamic => storeState2(roomPageContext.fileId3);
  }, [roomPageContext.fileId3, roomPageContext.enabled2, roomPageContext.ready]);
}
export function runRoomPage133Effect(roomPageContext: {
  countRef6: Dynamic;
  countState: Dynamic;
  enabledRef13: Dynamic;
  fileId3: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult25: Dynamic;
  selbarPortRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.fileId3 || !roomPageContext.roomDocumentPageResult25 || roomPageContext.roomDocumentPageResult25.fileId !== roomPageContext.fileId3 || roomPageContext.roomDocumentPageResult25.seq === roomPageContext.countRef6.current) return;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef13.current)) {
      if (roomPageContext.roomDocumentPageResult25.prompt !== undefined) {
        let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
        if (!selbarPort) return;
        roomPageContext.countRef6.current = roomPageContext.roomDocumentPageResult25.seq;
        PlatformLiveDocumentAndHistoryDocReady.getState().consumed(roomPageContext.roomDocumentPageResult25.seq);
        let record4: Dynamic = {
          type: `widget-ghost-seed`,
          prompt: roomPageContext.roomDocumentPageResult25.prompt
        };
        selbarPort.postMessage(record4);
        return;
      }
      roomPageContext.countRef6.current = roomPageContext.roomDocumentPageResult25.seq;
      PlatformLiveDocumentAndHistoryDocReady.getState().consumed(roomPageContext.roomDocumentPageResult25.seq);
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `widget-ghost-open`
      });
    }
  }, [roomPageContext.fileId3, roomPageContext.roomDocumentPageResult25, roomPageContext.ready, roomPageContext.countState]);
}
export function runRoomPage134Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef5: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult17: Dynamic;
  threads: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.labelRef5.current = ``;
      return;
    }
    let byNode: Dynamic = resolveEditorSelectionAndTablesCreate();
    let record4: Dynamic = {};
    let record5: Dynamic = {};
    for (let event of roomPageContext.roomDocumentPageResult17 as Dynamic) {
      if (event.resolved || event.deleted) continue;
      let anchor: Dynamic = event.target?.anchor;
      let ref: Dynamic = anchor?.kind === `lfile` && typeof anchor.ref == `string` ? anchor.ref : ``;
      let match = /#(ln-[A-Za-z0-9_-]{1,64})~el:([A-Za-z0-9_-]{1,128})$/.exec(ref);
      if (match) {
        resolveEditorSelectionAndTablesHasOwn(byNode, match[1], match[2], event.id);
        record4[event.id] = match[1];
        record5[event.id] = match[2];
      }
    }
    let threadNodes: Dynamic = {
      ...record4
    };
    let threadElements: Dynamic = {
      ...record5
    };
    for (let event of roomPageContext.threads as Dynamic) {
      if (event.resolved || event.deleted) continue;
      let pageId: Dynamic = event.target?.pageId ?? ``;
      if (!pageId || (threadNodes[event.id] = pageId, isDatumPinThread(event))) continue;
      let roomDocumentPageResult34 = widgetAnchorOfThread(event);
      if (roomDocumentPageResult34) {
        threadElements[event.id] = roomDocumentPageResult34.element;
        resolveEditorSelectionAndTablesHasOwn(byNode, pageId, roomDocumentPageResult34.element, event.id);
      }
    }
    let stringify = JSON.stringify({
      byNode: byNode,
      threadNodes: threadNodes,
      threadElements: threadElements
    });
    if (stringify === roomPageContext.labelRef5.current) return;
    roomPageContext.labelRef5.current = stringify;
    let record6: Dynamic = {
      type: `widget-segment-threads`,
      byNode: byNode,
      threadNodes: threadNodes,
      threadElements: threadElements
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record6);
  }, [roomPageContext.roomDocumentPageResult17, roomPageContext.threads, roomPageContext.ready]);
}
export function runRoomPage135Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef6: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  threads: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.labelRef6.current = ``;
      return;
    }
    let byNode: Dynamic = {};
    let record4: Dynamic = {};
    for (let event of roomPageContext.threads as Dynamic) {
      if (event.resolved || event.deleted) continue;
      let pin: Dynamic = event.target?.pin;
      if (!pin) continue;
      let node: Dynamic = pin.node || event.target?.pageId || ``;
      let component: Dynamic = pin.component;
      let source: Dynamic = pin.source?.name;
      let resolved: Dynamic = pin.resolved;
      if (!node || !component || !source || !resolved) continue;
      let field: Dynamic;
      let rowIndex: Dynamic;
      let roomDocumentPageResult34: Dynamic;
      let matchesDatum = pin.datum !== undefined && resolved.path === undefined && resolved.pk === undefined && resolved.column === undefined;
      if (matchesDatum) field = ``;else if (resolved.object === `database`) {
        if (!resolved.pk || typeof resolved.column != `string`) continue;
        field = resolved.column;
        roomDocumentPageResult34 = {
          source: resolved.pk.source,
          index: resolved.pk.index
        };
      } else {
        let roomDocumentPageResult37: Dynamic = isEditorSelectionAndTablesRowIndex(resolved.path);
        if (roomDocumentPageResult37 === null) continue;
        ({
          rowIndex: rowIndex,
          field: field
        } = roomDocumentPageResult37);
      }
      if (field === undefined) continue;
      let roomDocumentPageResult35 = resolveEditorSelectionAndTablesNull(pin.datum);
      let label2 = matchesDatum ? `${component}|${source}|g:${roomDocumentPageResult35}` : rowIndex === undefined ? `${component}|${source}|${field}|pk:${roomDocumentPageResult34.source}:${roomDocumentPageResult34.index}` : `${component}|${source}|${field}|r:${rowIndex}|k:${roomDocumentPageResult35}|v:${JSON.stringify(pin.value ?? null)}`;
      let roomDocumentPageResult36: Dynamic = record4[node] ??= new (Map as Dynamic)();
      let roomDocumentPageResultEntry: Dynamic = roomDocumentPageResult36.get(label2);
      if (roomDocumentPageResultEntry) {
        roomDocumentPageResultEntry.n++;
        roomDocumentPageResultEntry.ids.push(event.id);
      } else {
        roomDocumentPageResult36.set(label2, {
          component: component,
          source: source,
          field: field,
          n: 1,
          ids: [event.id],
          ...(rowIndex === undefined ? {} : {
            rowIndex: rowIndex
          }),
          ...(roomDocumentPageResult34 === undefined ? {} : {
            pk: roomDocumentPageResult34
          }),
          ...(pin.datum === undefined ? {} : {
            datum: pin.datum
          }),
          ...(pin.value === undefined ? {} : {
            value: pin.value
          }),
          ...(matchesDatum ? {
            group: true
          } : {})
        });
      }
    }
    for (let [roomDocumentPageResult34, roomDocumentPageResult35] of Object.entries(record4) as Dynamic) byNode[roomDocumentPageResult34] = [...roomDocumentPageResult35.values()];
    let stringify = JSON.stringify(byNode);
    if (stringify === roomPageContext.labelRef6.current) return;
    roomPageContext.labelRef6.current = stringify;
    let record5: Dynamic = {
      type: `widget-datum-chips`,
      byNode: byNode
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record5);
  }, [roomPageContext.threads, roomPageContext.ready]);
}
export function runRoomPage136Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  threads: Dynamic;
  told: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.told.current = ``;
      return;
    }
    return resolveWidgetBridgeCite({
      threads: roomPageContext.threads,
      told: roomPageContext.told,
      tell: ({
        byNode: byNode,
        cite: cite
      }: Dynamic, ..._extraArguments: unknown[]) => {
        if (roomPageContext.navigatedRef.current || roomPageContext.iframeRef.current?.contentWindow !== contentWindow) return false;
        let record4: Dynamic = {
          type: `widget-origin-quotes`,
          byNode: byNode,
          cite: cite
        };
        roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
        return true;
      }
    });
  }, [roomPageContext.threads, roomPageContext.ready]);
}
export function runRoomPage137Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  mode2: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `theme`,
      mode: roomPageContext.mode2
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.mode2, roomPageContext.ready]);
}
export function runRoomPage138Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  layout: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `page-layout`,
        layout: roomPageContext.layout
      });
    }
  }, [roomPageContext.layout, roomPageContext.ready]);
}
export function runRoomPage139Effect(roomPageContext: {
  enabledRef15: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  useDocumentFonts2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let documentFontsPostState2 = documentFontsPostState(roomPageContext.useDocumentFonts2, roomPageContext.enabledRef15.current);
    roomPageContext.enabledRef15.current = documentFontsPostState2.applied;
    if (documentFontsPostState2.post !== null) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `typography`,
        ...documentFontsPostState2.post
      });
    }
  }, [roomPageContext.useDocumentFonts2, roomPageContext.ready]);
}
export function runRoomPage140Effect(roomPageContext: {
  enabledRef16: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  useDocumentDisplay2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let documentDisplayPostState2: Dynamic = documentDisplayPostState(roomPageContext.useDocumentDisplay2, roomPageContext.enabledRef16.current);
    roomPageContext.enabledRef16.current = documentDisplayPostState2.applied;
    if (documentDisplayPostState2.post !== null) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, resolveEditorHostKind3(documentDisplayPostState2.post));
    }
  }, [roomPageContext.useDocumentDisplay2, roomPageContext.ready]);
}
export function runRoomPage141Effect(roomPageContext: {
  displayOn: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  key: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResultRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    let frameGesturesIds = contentWindow ? resolveFrameGesturesIds({
      ready: roomPageContext.ready,
      navigated: roomPageContext.navigatedRef.current,
      displayOn: roomPageContext.displayOn,
      filmed: roomPageContext.roomDocumentPageResultRef.current,
      key: roomPageContext.key
    }) : null;
    if (contentWindow && frameGesturesIds) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, frameGesturesIds);
    }
  }, [roomPageContext.displayOn, roomPageContext.ready, roomPageContext.key]);
}
export function runRoomPage142Send5(roomPageContext: {
  enabledRef11: Dynamic;
  frameMessengerRef: Dynamic;
  titleRef: Dynamic;
  useDocumentLanguageRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let documentLanguageAttributes2 = documentLanguageAttributes(roomPageContext.useDocumentLanguageRef.current, roomPageContext.enabledRef11.current);
    roomPageContext.enabledRef11.current = documentLanguageAttributes2.declared;
    let title3: Dynamic = roomPageContext.titleRef.current;
    let record4: Dynamic = documentLanguageAttributes2.lang === undefined ? {
      type: `doc-title`,
      title: title3
    } : {
      type: `doc-title`,
      title: title3,
      lang: documentLanguageAttributes2.lang
    };
    roomPageContext.frameMessengerRef.current.send(roomDocumentPage, record4);
  }, []);
}
export function runRoomPage143Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef7: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  tabNames: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.labelRef7.current = ``;
      return;
    }
    let names: Dynamic = roomPageContext.tabNames ?? {};
    let stringify = JSON.stringify(names);
    if (stringify !== roomPageContext.labelRef7.current) {
      roomPageContext.labelRef7.current = stringify;
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `tab-names`,
        names: names
      });
    }
  }, [roomPageContext.tabNames, roomPageContext.ready]);
}
export function runRoomPage144Callback4(roomPageContext: {
  countRef7: Dynamic;
  elementRef69: Dynamic;
  enabledRef17: Dynamic;
  enabledRef18: Dynamic;
}): Dynamic {
  return (0, React.useCallback)(async (..._extraArguments: unknown[]) => {
    if (!isFrameArtifact()) return `granted`;
    if (!frameProofreadEnabled() || roomPageContext.enabledRef17.current || !(await frameSampleAvailable())) return `off`;
    let roomDocumentPageResult34: Dynamic = await frameSamplePermission();
    if (roomDocumentPageResult34 === `granted`) return `granted`;
    if (roomDocumentPageResult34 === `denied` || roomDocumentPageResult34 === `unavailable`) return `off`;
    if (roomDocumentPageResult34 === null && roomPageContext.enabledRef18.current) return `granted`;
    if (roomPageContext.countRef7.current > 0) return `wait`;
    let element4: Dynamic = roomPageContext.elementRef69.current;
    return element4 !== null && Date.now() < element4.until ? `wait` : `ask`;
  }, []);
}
export function runRoomPage145Element3(roomPageContext: {
  elementRef71: Dynamic;
  itemsRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]): undefined => {
    let items2: Dynamic = roomPageContext.itemsRef.current;
    if (items2.length !== 0) {
      roomPageContext.itemsRef.current = [];
      for (let roomDocumentPageResult34 of items2 as Dynamic) roomPageContext.elementRef71.current(roomDocumentPageResult34.reqId, roomDocumentPageResult34.paragraphs, false, true);
    }
  }, []);
}
export function runRoomPage146Version2(roomPageContext: {
  callback5: Dynamic;
  countRef9: Dynamic;
  frameMessengerRef: Dynamic;
  fsEntryId: Dynamic;
  labelRef8: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)(async (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Promise<undefined> => {
    let getState3 = (claude?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let roomDocumentPageResult35: Dynamic = isFrameArtifact();
      let value: Dynamic = EditorSelectionAndTablesState6.getState().value;
      roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
        type: `spellcheck`,
        on: value,
        builtinAutocorrect: EditorSelectionAndTablesState7.getState().value,
        claude: claude,
        userWords: roomDocumentPageResult35 ? filterEditorSelectionAndTablesValue() : value ? resolveEditorSelectionAndTablesSpellWords() : [],
        ...(roomDocumentPageResult35 ? {
          cadence: `paced`
        } : {})
      });
      if (roomPageContext.fsEntryId) {
        EditorSelectionAndTablesRoads.getState().set(roomPageContext.fsEntryId, claude);
      }
    };
    getState3(roomPageContext.labelRef8.current);
    let roomDocumentPageResult34: number = ++roomPageContext.countRef9.current;
    let callback6: Dynamic = await (0, roomPageContext.callback5)();
    if (!(roomDocumentPageResult34 !== roomPageContext.countRef9.current || roomPageContext.navigatedRef.current || callback6 === roomPageContext.labelRef8.current)) {
      roomPageContext.labelRef8.current = callback6;
      getState3(callback6);
    }
  }, [roomPageContext.callback5, roomPageContext.fsEntryId]);
}
export function runRoomPage147Effect(roomPageContext: {
  enabledRef17: Dynamic;
  enabledRef18: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  roomDocumentPageResult26: Dynamic;
  version2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let version3 = (..._extraArguments: unknown[]): undefined => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
        (0, roomPageContext.version2)(contentWindow);
      }
    };
    version3();
    let subscribe: Dynamic = EditorSelectionAndTablesState6.subscribe(version3);
    let subscribe2: Dynamic = EditorSelectionAndTablesState7.subscribe(version3);
    let subscribe3: Dynamic = EditorSelectionAndTablesPrefs.subscribe(version3);
    let subscribe4: Dynamic = EditorSelectionAndTablesState8.subscribe(version3);
    let roomDocumentPageResult34: Dynamic = clearObservabilityBrowserAndOperationEventsDelete((..._extraArguments: unknown[]): undefined => {
      roomPageContext.enabledRef18.current = true;
      roomPageContext.enabledRef17.current = false;
      version3();
    });
    return (..._extraArguments: unknown[]): undefined => {
      subscribe();
      subscribe2();
      subscribe3();
      subscribe4();
      roomDocumentPageResult34();
    };
  }, [roomPageContext.ready, roomPageContext.version2, roomPageContext.roomDocumentPageResult26]);
}
export function runRoomPage148GetState2(roomPageContext: {
  countRef8: Dynamic;
  element3: Dynamic;
  elementRef69: Dynamic;
  elementRef70: Dynamic;
  enabledRef17: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  labelRef8: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  version2: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]) => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    return !contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current ? false : (roomPageContext.elementRef69.current = {
      until: Date.now() + documentRuntimeLimit10000
    }, roomPageContext.countRef8.current = Date.now(), roomPageContext.enabledRef17.current || (roomPageContext.labelRef8.current = `on`), window.clearTimeout(roomPageContext.elementRef70.current), roomPageContext.elementRef70.current = window.setTimeout((..._extraArguments: unknown[]): undefined => {
      let contentWindow2: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (contentWindow2 && !roomPageContext.navigatedRef.current) {
        (0, roomPageContext.version2)(contentWindow2);
      }
      (0, roomPageContext.element3)();
    }, 10050), roomPageContext.frameMessengerRef.current.send(contentWindow, {
      type: `proofread-check`
    }), EditorSelectionAndTablesState6.getState().set(true), (0, roomPageContext.version2)(contentWindow), true);
  }, [roomPageContext.ready, roomPageContext.version2, roomPageContext.element3]);
}
export function runRoomPage149Effect(roomPageContext: {
  callback4: Dynamic;
  countRef7: Dynamic;
  countRef8: Dynamic;
  element3: Dynamic;
  elementRef69: Dynamic;
  elementRef71: Dynamic;
  enabledRef17: Dynamic;
  enabledRef18: Dynamic;
  enabledRef7: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  itemsRef: Dynamic;
  navigatedRef: Dynamic;
  resolveDocumentSelectionShiftState: Dynamic;
  responseRef: Dynamic;
  uniqueItemsRef10: Dynamic;
  version2: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef71.current = async (reqId?: Dynamic, paragraphs?: Dynamic, context?: Dynamic, dependencies: Dynamic = false, ..._extraArguments: unknown[]): Promise<undefined> => {
    let uniqueItems: Dynamic = roomPageContext.uniqueItemsRef10.current;
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow ?? null;
    let roomDocumentPageHandler6: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.navigatedRef.current ? null : roomPageContext.iframeRef.current?.contentWindow ?? null;
    let roomDocumentPageHandler7: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let roomDocumentPageHandler9: Dynamic = roomDocumentPageHandler6();
      return roomDocumentPageHandler9 !== null && roomDocumentPageHandler9 === contentWindow ? roomDocumentPageHandler9 : null;
    };
    let dependencies2: Dynamic = dependencies || Date.now() - roomPageContext.countRef8.current < documentRuntimeLimit2000;
    let enabled5 = false;
    let enabled6 = false;
    let send9 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let roomDocumentPageHandler9: Dynamic = roomDocumentPageHandler7();
      if (roomDocumentPageHandler9) {
        roomPageContext.frameMessengerRef.current.send(roomDocumentPageHandler9, roomDocumentPage);
      }
    };
    let send10: Dynamic = (..._extraArguments: unknown[]) => send9({
      type: `proofread-res`,
      reqId: reqId,
      issues: [],
      failed: true
    });
    let roomDocumentPageHandler8: Dynamic = (..._extraArguments: unknown[]) => roomPageContext.itemsRef.current.length >= documentRuntimeLimit24 ? false : (roomPageContext.itemsRef.current.push({
      reqId: reqId,
      paragraphs: paragraphs
    }), enabled5 = true, true);
    try {
      let label2: Dynamic = roomPageContext.enabledRef17.current ? `off` : context ? `press` : await (0, roomPageContext.callback4)();
      if (!roomDocumentPageHandler7()) return;
      if (roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly) {
        send10();
        return;
      }
      if (label2 === `ask` || label2 === `off`) {
        send10();
        let roomDocumentPageHandler9: Dynamic = roomDocumentPageHandler6();
        if (roomDocumentPageHandler9) {
          (0, roomPageContext.version2)(roomDocumentPageHandler9);
        }
        return;
      }
      if (label2 === `wait`) {
        if (!roomDocumentPageHandler8()) {
          send10();
        }
        return;
      }
      if (!roomPageContext.resolveDocumentSelectionShiftState.admit()) {
        if (dependencies2 && roomPageContext.resolveDocumentSelectionShiftState.fullButOpen() && roomDocumentPageHandler8()) return;
        send10();
        return;
      }
      if (context) {
        roomPageContext.countRef7.current += 1;
      }
      enabled6 = true;
      let element4: Dynamic = roomPageContext.elementRef69.current;
      let label3 = context || dependencies2 || roomPageContext.countRef7.current > 0 || element4 !== null && Date.now() < element4.until ? `click` : `granted`;
      let result: Dynamic = await frameProofreadRound(paragraphs, filterEditorSelectionAndTablesText(paragraphs, filterEditorSelectionAndTablesValue()), label3).finally((..._extraArguments: unknown[]): undefined => {
        roomPageContext.resolveDocumentSelectionShiftState.settle();
        if (context) {
          --roomPageContext.countRef7.current;
        }
      });
      if (result.unavailable) {
        roomPageContext.enabledRef17.current = true;
        for (let roomDocumentPageResult34 of roomPageContext.itemsRef.current as Dynamic) roomPageContext.uniqueItemsRef10.current.delete(roomDocumentPageResult34.reqId);
        roomPageContext.itemsRef.current = [];
        let roomDocumentPageHandler9: Dynamic = roomDocumentPageHandler6();
        if (roomDocumentPageHandler9) {
          (0, roomPageContext.version2)(roomDocumentPageHandler9);
        }
        return;
      }
      if (!result.failed) {
        roomPageContext.enabledRef18.current = true;
      }
      send9({
        type: `proofread-res`,
        reqId: reqId,
        issues: isEditorSelectionAndTablesSpelling(result.issues, filterEditorSelectionAndTablesValue()),
        failed: result.failed || undefined
      });
    } finally {
      if (!enabled5) {
        uniqueItems.delete(reqId);
      }
      if (enabled6) {
        (0, roomPageContext.element3)();
      }
    }
  };
}

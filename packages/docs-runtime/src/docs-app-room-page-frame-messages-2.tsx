import { DocumentRuntimeState10, resolveDocumentRuntimeTop } from "./docs-app-document-runtime-use-document-runtime-room";
import { isCommentSessionFeatureDisabled } from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import { createCommentMentionSearch } from "./docs-app-comment-anchors-create-comment-mention-search";
import { CommentAnchorsState5 } from "./docs-app-comment-anchors-use-comment-anchors-sheets-component";
import { DocumentRuntimeLoad2 } from "./docs-app-document-runtime-use-document-iframe-focus";
import { classifyTitleClick } from "./docs-app-document-display";
import { resolveWidgetBridgeClickX, updateWidgetBridgeTop } from "./docs-app-widget-bridge-widget-sample-card";
import { documentRuntimeLimit120, documentRuntimeLimit300, documentRuntimeLimit40, documentRuntimeLimit48000, resolveDocumentRuntimeEntries } from "./docs-app-document-runtime-widget-provenance-gutter";
import { documentScrollKey, rememberDocumentScroll } from "./docs-app-ask-cards-document-posture-badge";
import { resolveDocumentSourcePromptTop } from "./docs-app-room-document-page-state-3";
import { resolveFrameGesturesAccept } from "./docs-app-frame-gestures-state-1";
import { cancelTabNavigation, cancelTabRename, markActiveTabRename, registerTabNavigationWaiter, registerTabRename } from "./docs-app-document-context-actions-duplicate-document-tab";
import { isDocumentSelectionReadOnly } from "./docs-app-document-selection-create-heading-normalization-plugin";

/** BaoCut: room document frame messages; live accessors preserve closure state. */
import type { Dynamic } from "./types";
import { Cg as PlatformApiAndAuthPriming, Cn as isPlatformLiveDocumentAndHistoryFragAtQueue, Dn as resolvePlatformLiveDocumentAndHistoryTest2, Gf as useCommentStore, Nr as resolveEditorSelectionAndTablesSpellWords, Nv as frameSearchPeople, Qm as resolveDataModelSchemasBid3, RM as resolvePlatformFeatureFlagsValue, Rl as resolveEditorHostValue23, Tk as resolveEditorExtensionsChart, Tn as resolvePlatformLiveDocumentAndHistoryEntries, Xm as dataModelSchemasPattern16, Xr as EditorSelectionAndTablesByKey, YM as emitTelemetryEvent, Yr as EditorSelectionAndTablesByFile, Zm as resolveDataModelSchemasTop, kj as resolvePlatformSessionAndSourcesValue, lh as coerceCellsMeta, lj as resolvePlatformSessionAndSourcesTest6, m_ as api, mv as frameKnownProfiles, ny as frameViewerWithFace, pv as frameInlineAvatar, qm as resolveDataModelSchemasEntries, qr as EditorSelectionAndTablesByFile2, sx as resolveEditorProofreadingIncludes, uh as coerceMediaMeta, uj as resolvePlatformSessionAndSourcesTest3, vg as PlatformApiAndAuthUser, wS as resolvePlatformKeyboardAndSaveStatusValue2, wn as resolvePlatformLiveDocumentAndHistoryNodeId2, xf as hiddenResolvedThread } from "./platform-core";
import { S as isFrameArtifact } from "./hello-early";
export function runRoomPage24DataVerbPerson(roomPageContext: {
  data: Dynamic;
  frameMessengerRef: Dynamic;
  lookupRef3: Dynamic;
  lookupRef4: Dynamic;
  lookupRef5: Dynamic;
  navigatedRef: Dynamic;
  uniqueItemsRef7: Dynamic;
  win: Dynamic;
}): Dynamic {
  let normalizedTrimmedEmailSlice: Dynamic = (typeof roomPageContext.data.email == `string` ? roomPageContext.data.email : ``).trim().toLowerCase().slice(0, 254);
  let send9: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
    type: `bridge-reply`,
    id: roomPageContext.data.id,
    ok: true,
    value: roomDocumentPage2
  });
  let normalizedTrimmedEmailSliceIndex: Dynamic = normalizedTrimmedEmailSlice.indexOf(`@`);
  if (normalizedTrimmedEmailSliceIndex <= 0 || normalizedTrimmedEmailSliceIndex === normalizedTrimmedEmailSlice.length - 1) return {
    value: void send9(null)
  };
  let normalizedTrimmedEmailSliceSlice: Dynamic = normalizedTrimmedEmailSlice.slice(0, normalizedTrimmedEmailSliceIndex);
  let toLowerCase: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let storeState: Dynamic = PlatformApiAndAuthPriming.getState();
    for (let contributor of [...storeState.picked, ...storeState.seen] as Dynamic) if (contributor.email?.toLowerCase() === normalizedTrimmedEmailSlice && contributor.label && contributor.label.trim().toLowerCase() !== normalizedTrimmedEmailSliceSlice) return {
      id: normalizedTrimmedEmailSlice,
      label: contributor.label
    };
    return null;
  };
  let normalizedText: Dynamic = toLowerCase();
  if (normalizedText) return {
    value: void send9(normalizedText)
  };
  let uniqueItems: Dynamic = roomPageContext.uniqueItemsRef7.current;
  let lookup: Dynamic = roomPageContext.lookupRef4.current;
  let lookupEntry: Dynamic = lookup.get(normalizedTrimmedEmailSlice);
  if (lookupEntry) {
    lookupEntry.then((..._extraArguments: unknown[]): undefined => {
      if (!roomPageContext.navigatedRef.current) {
        send9(toLowerCase());
      }
    });
    return {
      value: void 0
    };
  }
  let lookup2: Dynamic = roomPageContext.lookupRef5.current;
  let now: Dynamic = Date.now();
  if (uniqueItems.has(normalizedTrimmedEmailSlice) && now - (lookup2.get(normalizedTrimmedEmailSlice) ?? 0) < DocumentRuntimeState10) return {
    value: void send9(null)
  };
  if (!uniqueItems.has(normalizedTrimmedEmailSlice)) {
    if (uniqueItems.size >= 200) return {
      value: void send9(null)
    };
    let lookup3: Dynamic = roomPageContext.lookupRef3.current;
    let total: Dynamic = `@` + normalizedTrimmedEmailSliceSlice.slice(0, 1);
    let lookupEntry2: Dynamic = lookup3.get(total);
    if (!lookupEntry2) {
      if (lookup3.size >= 50) return {
        value: void send9(null)
      };
      lookupEntry2 = new (Set as Dynamic)();
      lookup3.set(total, lookupEntry2);
    }
    if (lookupEntry2.size >= 30) return {
      value: void send9(null)
    };
    lookupEntry2.add(normalizedTrimmedEmailSlice);
    uniqueItems.add(normalizedTrimmedEmailSlice);
  }
  lookup2.set(normalizedTrimmedEmailSlice, now);
  let result: Dynamic = PlatformApiAndAuthPriming.getState().primeExact([normalizedTrimmedEmailSlice]).catch((..._extraArguments: unknown[]): undefined => undefined).finally((..._extraArguments: unknown[]): Dynamic => lookup.delete(normalizedTrimmedEmailSlice));
  lookup.set(normalizedTrimmedEmailSlice, result);
  result.then((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.navigatedRef.current) {
      send9(toLowerCase());
    }
  });
  return {
    value: void 0
  };
}
export function runRoomPage25DataVerbPeople(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askPermission: Dynamic;
  askUsageRef: Dynamic;
  countRef2: Dynamic;
  data: Dynamic;
  elementRef34: Dynamic;
  enabledRef12: Dynamic;
  enabledRef7: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  lookupRef3: Dynamic;
  navigatedRef: Dynamic;
  responseRef: Dynamic;
  win: Dynamic;
}): Dynamic {
  let qSlice: Dynamic = (typeof roomPageContext.data.q == `string` ? roomPageContext.data.q : ``).slice(0, 64);
  let enabled6: Dynamic = !!roomPageContext.askUsageRef.current && roomPageContext.askCardDeskRef.current !== null && roomPageContext.AskCardFaceRef.current !== null && !(roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly);
  let record4: Dynamic = !isFrameArtifact() || isCommentSessionFeatureDisabled() || roomPageContext.enabledRef12.current ? null : (0, roomPageContext.askPermission)() ? {
    claude: true
  } : enabled6 ? {
    claude: `write`
  } : null;
  let send9: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
    type: `bridge-reply`,
    id: roomPageContext.data.id,
    ok: true,
    value: {
      ...roomDocumentPage2,
      ...record4
    }
  });
  let lookup: Dynamic = roomPageContext.lookupRef3.current;
  let normalizedQSliceSlice: Dynamic = qSlice.slice(0, 2).toLowerCase();
  let lookupEntry: Dynamic = lookup.get(normalizedQSliceSlice);
  if (!lookupEntry) {
    if (lookup.size >= 50) {
      send9({
        hits: [],
        priming: false,
        declined: true
      });
      return {
        value: void 0
      };
    }
    lookupEntry = new (Set as Dynamic)();
    lookup.set(normalizedQSliceSlice, lookupEntry);
  }
  let enabled7: Dynamic = false;
  for (let roomDocumentPageResult36 of lookupEntry as Dynamic) if (roomDocumentPageResult36.startsWith(qSlice)) {
    enabled7 = true;
  } else {
    if (qSlice.startsWith(roomDocumentPageResult36)) {
      lookupEntry.delete(roomDocumentPageResult36);
    }
  }
  if (!enabled7) {
    if (lookupEntry.size >= 30) {
      send9({
        hits: [],
        priming: false,
        declined: true
      });
      return {
        value: void 0
      };
    }
    lookupEntry.add(qSlice);
  }
  if (isFrameArtifact()) {
    if (roomPageContext.elementRef34.current === null) {
      let commentMentionSearch: Dynamic = createCommentMentionSearch(frameSearchPeople, (..._extraArguments: unknown[]): undefined => {
        if (roomPageContext.elementRef34.current !== commentMentionSearch) return;
        let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
        if (!(!contentWindow || roomPageContext.navigatedRef.current)) {
          roomPageContext.frameMessengerRef.current.send(contentWindow, {
            type: `people-settled`
          });
        }
      }, {
        viewer: frameViewerWithFace,
        known: frameKnownProfiles,
        inlinePhoto: frameInlineAvatar,
        channel: CommentAnchorsState5,
        onSearch: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => emitTelemetryEvent({
          name: `pages.mention.search`,
          key: `doc:${roomDocumentPage2.outcome}`,
          fields: {
            ...roomDocumentPage2,
            src: `doc`
          }
        })
      });
      roomPageContext.elementRef34.current = commentMentionSearch;
    }
    let {
      hits: qSlice2,
      priming: priming
    }: Dynamic = roomPageContext.elementRef34.current.read(qSlice);
    send9({
      hits: qSlice2.map(({
        id: id3,
        label: label2,
        photoData: photoData
      }: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        id: id3,
        label: label2,
        photoData: photoData
      })),
      priming: priming
    });
    return {
      value: void 0
    };
  }
  let storeState: Dynamic = PlatformApiAndAuthPriming.getState();
  let enabled8: Dynamic = enabled7 || roomPageContext.countRef2.current >= 1500 ? false : storeState.prime(qSlice);
  if (enabled8) {
    roomPageContext.countRef2.current++;
    enabled8.finally((..._extraArguments: unknown[]): undefined => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!contentWindow || roomPageContext.navigatedRef.current)) {
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `people-settled`
        });
      }
    });
  }
  let email: Dynamic = PlatformApiAndAuthUser.getState().user?.email;
  let filteredSearchSlice: Dynamic = storeState.search(qSlice).filter((search?: Dynamic, ..._extraArguments: unknown[]) => search.id !== `claude`).slice(0, 12);
  if (qSlice === `` && email !== undefined && !filteredSearchSlice.some((filteredSearchSlice3?: Dynamic, ..._extraArguments: unknown[]) => filteredSearchSlice3.id === email)) {
    filteredSearchSlice.unshift({
      id: email,
      label: resolvePlatformSessionAndSourcesValue(email)
    });
  }
  let filteredSearchSlice2: Dynamic = email === undefined ? filteredSearchSlice : [...filteredSearchSlice.filter((filteredSearchSlice3?: Dynamic, ..._extraArguments: unknown[]) => filteredSearchSlice3.id === email), ...filteredSearchSlice.filter((filteredSearchSlice3?: Dynamic, ..._extraArguments: unknown[]) => filteredSearchSlice3.id !== email)];
  storeState.primePhotos(filteredSearchSlice2);
  send9({
    hits: filteredSearchSlice2.map((filteredSearchSlice3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      id: filteredSearchSlice3.id,
      label: filteredSearchSlice3.label,
      photoData: storeState.photoData[filteredSearchSlice3.id],
      dir: filteredSearchSlice3.dir,
      guest: filteredSearchSlice3.guest
    })),
    priming: enabled8 !== false || enabled7 && storeState.isPriming(qSlice)
  });
  return {
    value: void 0
  };
}
export function runRoomPage26DataTypeWidgetVsSave(roomPageContext: {
  data: Dynamic;
  recordRef2: Dynamic;
  roomDocumentPageResultRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  if (roomPageContext.roomDocumentPageResultRef.current) return {
    value: void 0
  };
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` && resolvePlatformSessionAndSourcesTest6(roomPageContext.data.nodeId) ? roomPageContext.data.nodeId : ``;
  let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
  if (!nodeId2 || !useDocumentRuntimeFsEntryId4) return {
    value: void 0
  };
  let record4: Dynamic = {};
  if (roomPageContext.data.vs && typeof roomPageContext.data.vs == `object`) {
    let index: Dynamic = 0;
    for (let [roomDocumentPageResult37, roomDocumentPageResult38] of Object.entries(roomPageContext.data.vs) as Dynamic) {
      if (index >= 32) break;
      if (resolvePlatformLiveDocumentAndHistoryTest2(roomDocumentPageResult37, roomDocumentPageResult38)) {
        record4[roomDocumentPageResult37] = roomDocumentPageResult38;
        index++;
      }
    }
  }
  DocumentRuntimeLoad2.save(useDocumentRuntimeFsEntryId4, nodeId2, Object.keys(record4).length ? record4 : null);
  let record5: Dynamic = roomPageContext.recordRef2.current;
  let roomDocumentPageResult36: Dynamic = resolvePlatformLiveDocumentAndHistoryNodeId2({
    nodeId: nodeId2,
    frag: resolvePlatformLiveDocumentAndHistoryEntries(nodeId2, record4),
    fragNow: location.hash.slice(1),
    base: location.pathname + location.search,
    pending: record5.pending
  });
  record5.pending = roomDocumentPageResult36.pending;
  if (roomDocumentPageResult36.url) {
    let replaceState = (..._extraArguments: unknown[]): undefined => {
      record5.timer = undefined;
      let pending: Dynamic = record5.pending;
      record5.pending = undefined;
      if (!(!pending || location.pathname + location.search !== pending.base) && isPlatformLiveDocumentAndHistoryFragAtQueue(pending, location.hash.slice(1))) {
        record5.at = Date.now();
        try {
          (history as Dynamic).replaceState((history as Dynamic).state, ``, pending.url);
        } catch {}
      }
    };
    let difference: Dynamic = Date.now() - record5.at;
    if (difference >= 1e3) {
      replaceState();
    } else {
      record5.timer ||= setTimeout(replaceState, 1e3 - difference);
    }
  }
  return {
    value: void 0
  };
}
export function runRoomPage27DataTypeCommentClick(roomPageContext: {
  collapsedRef: Dynamic;
  data: Dynamic;
  DocumentSourcePromptState4: Dynamic;
  elementRef62: Dynamic;
  elementRef63: Dynamic;
  iframeRef: Dynamic;
  wideRef: Dynamic;
}): Dynamic {
  resolvePlatformFeatureFlagsValue(`press`);
  let id2: Dynamic = typeof roomPageContext.data.id == `string` ? roomPageContext.data.id : null;
  let storeState: Dynamic = useCommentStore.getState();
  let id3: Dynamic = id2 && hiddenResolvedThread(id2, storeState) ? null : id2;
  if (id3) {
    let matchesCommentMode: Dynamic = storeState.commentMode === `hidden`;
    if (matchesCommentMode) {
      storeState.setCommentMode(`margin`);
    }
    (0, roomPageContext.DocumentSourcePromptState4)?.();
    storeState.setActive(id3);
    let collapsed2: Dynamic = roomPageContext.collapsedRef.current && storeState.commentMode !== `list`;
    let filteredStack: Dynamic = Array.isArray(roomPageContext.data.stack) ? roomPageContext.data.stack.filter((stack?: Dynamic, ..._extraArguments: unknown[]) => typeof stack == `string`) : [id3];
    let detail: Dynamic = typeof roomPageContext.data.detail == `number` ? roomPageContext.data.detail : 1;
    let selecting: Dynamic = roomPageContext.data.selecting === true;
    let collapsed3: Dynamic = collapsed2 && roomPageContext.data.caret === true && !matchesCommentMode;
    let classifyTitleClick2: Dynamic = collapsed3 ? classifyTitleClick({
      detail: detail,
      selecting: selecting
    }) : `open`;
    let key2: Dynamic = filteredStack.join(`
`);
    if (classifyTitleClick2 === `ignore`) {
      if (detail > 1) {
        let element4: Dynamic = roomPageContext.elementRef62.current;
        let element5: Dynamic = roomPageContext.elementRef63.current;
        if (element4 && element4.key === key2 && storeState.focusId && !storeState.draftAnchor && storeState.dirtyEditors.size === 0) {
          roomPageContext.elementRef62.current = null;
          storeState.setFocus(null);
        } else {
          if (element5 && element5.key === key2 && storeState.focusId == null && !storeState.draftAnchor && storeState.dirtyEditors.size === 0) {
            storeState.setFocus(element5.focusId);
            roomPageContext.elementRef63.current = null;
          }
        }
      } else {
        roomPageContext.elementRef62.current = null;
        roomPageContext.elementRef63.current = null;
      }
      return {
        value: void 0
      };
    }
    roomPageContext.elementRef62.current = collapsed2 && (collapsed3 || matchesCommentMode && roomPageContext.data.caret === true) && storeState.focusId == null ? {
      key: key2
    } : null;
    roomPageContext.elementRef63.current = null;
    if (storeState.focusId == null || storeState.focusId === id3 || storeState.dirtyEditors.size === 0) {
      let anchorTop: Dynamic = storeState.rects[id3];
      let count: Dynamic = 0;
      if (collapsed2 && roomPageContext.data.caret === true && anchorTop !== undefined && typeof roomPageContext.data.x == `number` && Number.isFinite(roomPageContext.data.x) && typeof roomPageContext.data.lineBottom == `number` && Number.isFinite(roomPageContext.data.lineBottom)) {
        let clientWidth: Dynamic = roomPageContext.iframeRef.current?.clientWidth;
        if (clientWidth !== undefined) {
          count = resolveWidgetBridgeClickX({
            clickX: roomPageContext.data.x,
            lineBottom: roomPageContext.data.lineBottom,
            anchorTop: anchorTop,
            bandLeft: clientWidth - resolveEditorHostValue23(clientWidth, roomPageContext.wideRef.current) - documentRuntimeLimit300
          });
        }
      }
      let matchesFocusId: Dynamic = storeState.focusId === id3;
      storeState.setFocus(id3, count);
      if (storeState.commentMode === `list`) {
        storeState.revealInList(id3, matchesFocusId);
      }
    }
  } else {
    let filteredStack: Dynamic = Array.isArray(roomPageContext.data.stack) ? roomPageContext.data.stack.filter((stack?: Dynamic, ..._extraArguments: unknown[]) => typeof stack == `string`) : [];
    let detail: Dynamic = typeof roomPageContext.data.detail == `number` ? roomPageContext.data.detail : 1;
    let enabled6: Dynamic = false;
    let collapsed2: Dynamic = roomPageContext.collapsedRef.current && storeState.commentMode !== `list`;
    if (collapsed2 && detail > 1) {
      let filteredStackText: Dynamic = filteredStack.join(`
`);
      let element4: Dynamic = roomPageContext.elementRef62.current;
      let element5: Dynamic = roomPageContext.elementRef63.current;
      roomPageContext.elementRef63.current = null;
      if (element4 && element4.key === filteredStackText && storeState.focusId && !storeState.draftAnchor && storeState.dirtyEditors.size === 0) {
        roomPageContext.elementRef62.current = null;
        storeState.setFocus(null);
        enabled6 = true;
      } else {
        if (element5 && element5.key === filteredStackText && storeState.focusId == null && !storeState.draftAnchor && storeState.dirtyEditors.size === 0) {
          storeState.setFocus(element5.focusId);
          enabled6 = true;
        }
      }
    }
    let collapsed3: Dynamic = collapsed2 && detail > 1 && !enabled6 && !!storeState.focusId;
    let collapsed4: Dynamic = collapsed2 && storeState.focusId != null && filteredStack.includes(storeState.focusId);
    let matchesDirtyEditorsCount: Dynamic = storeState.dirtyEditors.size === 0 && !!storeState.focusId && !collapsed3 && !collapsed4;
    if (collapsed2 && detail === 1) {
      roomPageContext.elementRef63.current = matchesDirtyEditorsCount && storeState.focusId ? {
        key: filteredStack.join(`
`),
        focusId: storeState.focusId
      } : null;
      roomPageContext.elementRef62.current = null;
    }
    if (matchesDirtyEditorsCount) {
      roomPageContext.elementRef62.current = null;
      storeState.setFocus(null);
    }
  }
  return {
    value: void 0
  };
}
export function runRoomPage28DataTypeCommentRects(roomPageContext: {
  countRef3: Dynamic;
  data: Dynamic;
  displayOnRef: Dynamic;
  elementRef40: Dynamic;
  elementRef41: Dynamic;
  elementRef80: Dynamic;
  enabledRef6: Dynamic;
  fileIdRef: Dynamic;
  getStateRef: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  labelRef3: Dynamic;
  labelRef4: Dynamic;
  lookupRef8: Dynamic;
  memoized: Dynamic;
  railSync: Dynamic;
  recordStateRef: Dynamic;
  recordStateRef2: Dynamic;
  roomDocumentPage: Dynamic;
  roomRef: Dynamic;
  round2: Dynamic;
  setBlockContextMenu: Dynamic;
  setItemsState: Dynamic;
  setRecordState3: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  let rects: Dynamic = roomPageContext.data.rects && typeof roomPageContext.data.rects == `object` ? roomPageContext.data.rects : {};
  let present: Dynamic = Array.isArray(roomPageContext.data.present) ? roomPageContext.data.present.filter((present2?: Dynamic, ..._extraArguments: unknown[]) => typeof present2 == `string`) : [];
  if (typeof roomPageContext.data.scrollY == `number` && Number.isFinite(roomPageContext.data.scrollY) && roomPageContext.data.scrollY >= 0) {
    if (roomPageContext.data.scrollY !== roomPageContext.countRef3.current) {
      (0, roomPageContext.setBlockContextMenu)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2 && null);
      resolvePlatformKeyboardAndSaveStatusValue2();
    }
    roomPageContext.countRef3.current = roomPageContext.data.scrollY;
    let room2: Dynamic = roomPageContext.roomRef.current;
    if (room2 && roomPageContext.data.placeSettled === true) {
      rememberDocumentScroll(documentScrollKey(room2.pid, room2.fileId), roomPageContext.data.scrollY);
    }
  }
  let docExtent: Dynamic = roomPageContext.data.docExtent;
  let docExtent2: Dynamic = docExtent && Number.isFinite(docExtent.top) && Number.isFinite(docExtent.bottom) && docExtent.bottom >= docExtent.top ? {
    top: docExtent.top,
    bottom: docExtent.bottom
  } : null;
  let record4: Dynamic = {
    scrollY: roomPageContext.countRef3.current,
    rects: rects,
    present: present,
    widgetTops: resolveDocumentRuntimeEntries(roomPageContext.data.widgetBoxes),
    docExtent: docExtent2
  };
  roomPageContext.railSync.scroll(record4.scrollY);
  if (!roomPageContext.enabledRef6.current) {
    (0, roomPageContext.round2)(docExtent, record4.scrollY);
  }
  let documentSourcePromptTop: Dynamic = roomPageContext.data.inlineAsk && typeof roomPageContext.data.inlineAsk == `object` ? resolveDocumentSourcePromptTop(roomPageContext.data.inlineAsk) : null;
  let nonce4: Dynamic = roomPageContext.data.inlineAsk?.nonce;
  {
    let scrollY: Dynamic = typeof roomPageContext.data.scrollY == `number` && Number.isFinite(roomPageContext.data.scrollY) && roomPageContext.data.scrollY >= 0 ? roomPageContext.data.scrollY : undefined;
    if (scrollY !== undefined && !roomPageContext.enabledRef6.current) {
      roomPageContext.memoized.scroll(scrollY);
    }
    if (documentSourcePromptTop && typeof nonce4 == `number`) {
      roomPageContext.memoized.measured(nonce4, documentSourcePromptTop.top, scrollY);
    } else {
      roomPageContext.memoized.unmeasured();
    }
  }
  if (!roomPageContext.enabledRef6.current && roomPageContext.railSync.classify(record4) === `defer`) {
    if (roomPageContext.elementRef40.current) {
      clearTimeout(roomPageContext.elementRef40.current.timer);
    }
    roomPageContext.elementRef40.current = {
      ev: roomPageContext.roomDocumentPage,
      timer: setTimeout((..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef41.current?.(), documentRuntimeLimit120)
    };
    return {
      value: void 0
    };
  }
  roomPageContext.elementRef40.current &&= (clearTimeout(roomPageContext.elementRef40.current.timer), null);
  roomPageContext.railSync.applied(record4);
  let storeState: Dynamic = useCommentStore.getState();
  storeState.setRects(rects, []);
  storeState.setPresent(present);
  storeState.setFolded(resolveDataModelSchemasEntries(roomPageContext.data.folded, present, roomPageContext.displayOnRef.current));
  storeState.setCellsMeta(coerceCellsMeta(roomPageContext.data.cellsMeta));
  storeState.setMediaMeta(coerceMediaMeta(roomPageContext.data.mediaMeta));
  storeState.setBlockGeometry(resolveDataModelSchemasBid3(roomPageContext.data.anchors), resolveDataModelSchemasTop(roomPageContext.data.blocks), resolveDocumentRuntimeTop(roomPageContext.iframeRef.current));
  storeState.setDocScrollY(roomPageContext.countRef3.current);
  storeState.setDocScrollMax(typeof roomPageContext.data.scrollMax == `number` && Number.isFinite(roomPageContext.data.scrollMax) ? roomPageContext.data.scrollMax : null);
  storeState.setDocExtent(docExtent2);
  roomPageContext.elementRef80.current?.report(typeof roomPageContext.data.docHeight == `number` ? roomPageContext.data.docHeight : null);
  let top2: Dynamic = storeState.draftAnchor && roomPageContext.data.widgetBoxes && typeof roomPageContext.data.widgetBoxes == `object` ? roomPageContext.data.widgetBoxes[storeState.draftAnchor.nodeId]?.top : undefined;
  storeState.followDraft({
    blockTop: typeof roomPageContext.data.draftNodeTop == `number` && Number.isFinite(roomPageContext.data.draftNodeTop) ? roomPageContext.data.draftNodeTop : undefined,
    widgetTop: typeof top2 == `number` && Number.isFinite(top2) ? top2 : undefined
  });
  if (documentSourcePromptTop && typeof nonce4 == `number`) {
    roomPageContext.inlineAskHost.moved(nonce4, documentSourcePromptTop);
  }
  if (!roomPageContext.data.widgetBoxes) {
    let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
    if (useDocumentRuntimeFsEntryId4) {
      EditorSelectionAndTablesByFile2.getState().set(useDocumentRuntimeFsEntryId4, {});
    }
  }
  if (!roomPageContext.data.widgetBoxes && roomPageContext.labelRef4.current === `{}` && roomPageContext.labelRef3.current === `[]`) return {
    value: void 0
  };
  let record5: Dynamic = {};
  let updateWidgetBridgeTop2: Dynamic = updateWidgetBridgeTop(roomPageContext.data.widgetMounts, resolvePlatformSessionAndSourcesTest3);
  {
    let widgetMounts: Dynamic = roomPageContext.data.widgetMounts;
    if (Array.isArray(widgetMounts)) {
      let lookup: Dynamic = new (Map as Dynamic)();
      for (let ask of widgetMounts as Dynamic) if (ask && typeof ask == `object` && typeof ask.id == `string` && resolvePlatformSessionAndSourcesTest3(ask.id) && typeof ask.bid == `string` && dataModelSchemasPattern16.test(ask.bid)) {
        lookup.set(ask.id, ask.bid);
      }
      roomPageContext.lookupRef8.current = lookup;
    }
  }
  if (roomPageContext.data.widgetBoxes && typeof roomPageContext.data.widgetBoxes == `object`) {
    {
      let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
      if (useDocumentRuntimeFsEntryId4) {
        EditorSelectionAndTablesByFile.getState().set(useDocumentRuntimeFsEntryId4, new (Set as Dynamic)(Object.keys(roomPageContext.data.widgetBoxes).filter(resolvePlatformSessionAndSourcesTest6)));
      }
    }
    {
      let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
      if (useDocumentRuntimeFsEntryId4) {
        let record6: Dynamic = {};
        for (let [roomDocumentPageResult36, roomDocumentPageResult37] of Object.entries(roomPageContext.data.widgetBoxes) as Dynamic) {
          if (!resolvePlatformSessionAndSourcesTest3(roomDocumentPageResult36) || !roomDocumentPageResult37) continue;
          let {
            top: top3,
            left: roomDocumentPageResult38,
            width: roomDocumentPageResult39,
            noun: roomDocumentPageResult40
          }: Dynamic = roomDocumentPageResult37;
          if (!(typeof top3 != `number` || !Number.isFinite(top3))) {
            record6[roomDocumentPageResult36] = {
              top: top3,
              left: typeof roomDocumentPageResult38 == `number` && Number.isFinite(roomDocumentPageResult38) ? roomDocumentPageResult38 : -1,
              width: typeof roomDocumentPageResult39 == `number` && Number.isFinite(roomDocumentPageResult39) ? roomDocumentPageResult39 : -1,
              noun: resolveEditorExtensionsChart(roomDocumentPageResult40)
            };
          }
        }
        EditorSelectionAndTablesByFile2.getState().set(useDocumentRuntimeFsEntryId4, record6);
      }
    }
    for (let [roomDocumentPageResult36, roomDocumentPageResult37] of Object.entries(roomPageContext.data.widgetBoxes) as Dynamic) {
      if (!resolvePlatformSessionAndSourcesTest3(roomDocumentPageResult36) || !roomDocumentPageResult37 || roomDocumentPageResult37.state !== `placeholder`) continue;
      let {
        top: top3,
        left: left,
        width: width,
        height: height
      }: Dynamic = roomDocumentPageResult37;
      if (!(typeof top3 != `number` || !Number.isFinite(top3) || typeof left != `number` || !Number.isFinite(left) || typeof width != `number` || !Number.isFinite(width) || typeof height != `number` || !Number.isFinite(height))) {
        record5[roomDocumentPageResult36] = {
          top: top3,
          left: left,
          width: width,
          height: height,
          draft: roomDocumentPageResult37.draft === true
        };
      }
    }
  }
  {
    let stringify2: Dynamic = JSON.stringify(updateWidgetBridgeTop2);
    if (stringify2 !== roomPageContext.labelRef3.current) {
      roomPageContext.labelRef3.current = stringify2;
      (0, roomPageContext.setItemsState)(updateWidgetBridgeTop2);
    }
  }
  {
    let recordState4: Dynamic = roomPageContext.recordStateRef2.current;
    for (let [roomDocumentPageResult36, roomDocumentPageResult37] of Object.entries(roomPageContext.recordStateRef.current) as Dynamic) if (!(!roomDocumentPageResult37.runId || roomDocumentPageResult37.checked)) {
      if (recordState4[roomDocumentPageResult36]?.draft && record5[roomDocumentPageResult36] && !record5[roomDocumentPageResult36].draft) {
        roomPageContext.getStateRef.current(roomDocumentPageResult36);
      }
    }
  }
  {
    let fileId4: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
    if (fileId4) {
      let storeState2: Dynamic = EditorSelectionAndTablesByKey.getState();
      let label2: Dynamic = `${fileId4}#`;
      for (let roomDocumentPageResult36 of Object.keys(storeState2.byKey) as Dynamic) {
        if (!roomDocumentPageResult36.startsWith(label2)) continue;
        let roomDocumentPageResultSlice: Dynamic = roomDocumentPageResult36.slice(label2.length);
        let widgetBoxeItem: Dynamic = roomPageContext.data.widgetBoxes?.[roomDocumentPageResultSlice];
        if (widgetBoxeItem && (widgetBoxeItem.draft === true || widgetBoxeItem.state !== `placeholder`)) {
          storeState2.clear(roomDocumentPageResult36);
        }
      }
    }
  }
  let stringify: Dynamic = JSON.stringify(record5);
  if (stringify !== roomPageContext.labelRef4.current) {
    roomPageContext.labelRef4.current = stringify;
    (0, roomPageContext.setRecordState3)(record5);
  }
  return {
    value: void 0
  };
}
export function runRoomPage29DataTypeProofreadReq(roomPageContext: {
  data: Dynamic;
  elementRef69: Dynamic;
  elementRef71: Dynamic;
  enabledRef7: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  responseRef: Dynamic;
  uniqueItemsRef10: Dynamic;
  win: Dynamic;
}): Dynamic {
  let reqId: Dynamic = typeof roomPageContext.data.reqId == `string` ? roomPageContext.data.reqId : ``;
  let paragraphs: Dynamic = Array.isArray(roomPageContext.data.paragraphs) ? roomPageContext.data.paragraphs.flatMap((paragraph?: Dynamic, ..._extraArguments: unknown[]): Dynamic => typeof paragraph == `object` && paragraph && typeof paragraph.id == `string` && paragraph.id.length <= 16 && typeof paragraph.text == `string` && typeof paragraph.hash == `string` && paragraph.hash.length <= 16 ? [{
    id: paragraph.id,
    text: paragraph.text,
    hash: paragraph.hash,
    role: resolveEditorProofreadingIncludes(paragraph.role)
  }] : []) : [];
  if (!reqId || paragraphs.length === 0) return {
    value: void 0
  };
  if (isFrameArtifact()) {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly) return {
      value: void 0
    };
    let send9: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomDocumentPage2, {
      type: `proofread-res`,
      reqId: reqId,
      issues: [],
      failed: true
    });
    let encoder: Dynamic = new (TextEncoder as Dynamic)();
    let reduce: Dynamic = paragraphs.reduce((accumulator?: Dynamic, item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => accumulator + encoder.encode(item.text).length, 0);
    if (reqId.length > 16 || paragraphs.length > documentRuntimeLimit40 || reduce > documentRuntimeLimit48000 || roomPageContext.uniqueItemsRef10.current.has(reqId)) {
      send9(contentWindow);
      return {
        value: void 0
      };
    }
    roomPageContext.uniqueItemsRef10.current.add(reqId);
    let element4: Dynamic = roomPageContext.elementRef69.current;
    let matchesElement: Dynamic = element4 !== null && Date.now() < element4.until;
    if (matchesElement) {
      roomPageContext.elementRef69.current = null;
    }
    roomPageContext.elementRef71.current(reqId, paragraphs, matchesElement);
    return {
      value: void 0
    };
  }
  api.suggestions.proofread({
    paragraphs: paragraphs,
    userWords: resolveEditorSelectionAndTablesSpellWords()
  }).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.navigatedRef.current) {
      roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
        type: `proofread-res`,
        reqId: reqId,
        issues: result.issues
      });
    }
  }).catch((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.navigatedRef.current) {
      roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
        type: `proofread-res`,
        reqId: reqId,
        issues: [],
        failed: true
      });
    }
  });
  return {
    value: void 0
  };
}
export function runRoomPage30DataTypeCaretPrimed(roomPageContext: {
  data: Dynamic;
  elementRef21: Dynamic;
  elementRef22: Dynamic;
  elementRef6: Dynamic;
  enabledRef3: Dynamic;
  enabledRef7: Dynamic;
  fileIdRef: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  isDocumentSelectionRandomUUIDRef: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  responseRef: Dynamic;
  win: Dynamic;
}): Dynamic {
  if (!resolveFrameGesturesAccept(roomPageContext.data, roomPageContext.isDocumentSelectionRandomUUIDRef.current, roomPageContext.elementRef6.current)) return {
    value: void 0
  };
  let seed: Dynamic = roomPageContext.data.seed === true;
  let label2: Dynamic = roomPageContext.pidRef.current && roomPageContext.fileIdRef.current ? `room:${roomPageContext.pidRef.current}/${roomPageContext.fileIdRef.current}` : null;
  let matchesLabel: Dynamic = label2 !== null && cancelTabRename(label2);
  let yielded: Dynamic = label2 !== null && cancelTabNavigation(label2) && seed || matchesLabel;
  if (isDocumentSelectionReadOnly({
    hasFocus: (document as Dynamic).hasFocus(),
    activeElement: (document as Dynamic).activeElement,
    body: (document as Dynamic).body,
    iframe: roomPageContext.iframeRef.current,
    readOnly: roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly,
    seed: seed,
    yielded: yielded
  })) {
    roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
      type: `caret-focus`
    });
    if (matchesLabel) {
      markActiveTabRename(label2);
    }
  }
  roomPageContext.elementRef22.current?.();
  roomPageContext.elementRef22.current = null;
  if (label2 !== null) {
    roomPageContext.elementRef22.current = registerTabRename(label2, (..._extraArguments: unknown[]): Dynamic => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      return !contentWindow || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current || !isDocumentSelectionReadOnly({
        hasFocus: (document as Dynamic).hasFocus(),
        activeElement: (document as Dynamic).activeElement,
        body: (document as Dynamic).body,
        iframe: roomPageContext.iframeRef.current,
        readOnly: roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly,
        seed: seed,
        yielded: true
      }) ? false : (roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `caret-focus`,
        resume: true
      }), markActiveTabRename(label2), true);
    });
  }
  roomPageContext.elementRef21.current?.();
  roomPageContext.elementRef21.current = null;
  if (seed && label2 !== null) {
    roomPageContext.elementRef21.current = registerTabNavigationWaiter(label2, (..._extraArguments: unknown[]): Dynamic => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      return !contentWindow || roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current || !isDocumentSelectionReadOnly({
        hasFocus: (document as Dynamic).hasFocus(),
        activeElement: (document as Dynamic).activeElement,
        body: (document as Dynamic).body,
        iframe: roomPageContext.iframeRef.current,
        readOnly: roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly,
        seed: true,
        yielded: true
      }) ? false : (roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `caret-focus`
      }), true);
    });
  }
  return {
    value: void 0
  };
}

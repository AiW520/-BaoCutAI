import { DocumentRuntimeOffered, DocumentRuntimePid, DocumentRuntimeSearch, DocumentRuntimeState6, resolveDocumentRuntimeCatch2 } from "../document-runtime/widget-provenance-gutter";
import { mapPreloadDependencies } from "../bootstrap";
import { getDocumentLinksKind, resolveDocumentLinksLevel, resolveDocumentLinksOpen } from "../document-links";
import { hasKeyboardFrameFocus } from "../document-display";
import { documentSourcePromptLimit400, resolveDocumentSourcePromptTop } from "../room-document-page/state";
import { resolveCommentSessionHost } from "../comment-session/clear-comment-session-thread-id";
import { askCardRecoveryDisposition, askCardRecoveryOffer, askCardWriteUnavailableMessage, ensureSessionRouteModule, isCommentSessionFeatureDisabled } from "../comment-notifications/create-comment-notice-coordinator";
import { resolveDocumentCommandsLoad, resolveDocumentCommandsResolve, resolveDocumentCommandsViaSession } from "../document-commands/create-selection-ask-coordinator";

/** BaoCut: room document frame initialization; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { $m as resolveDataModelSchemasBid2, Ap as resolvePlatformAnnouncementsValue2, Bg as PlatformApiAndAuthAssign, Gf as useCommentStore, Hh as resolveDataModelSchemasPathname, Id as resolveCommentsStoreLayer, NM as resolvePlatformFeatureFlagsValue5, Vr as updateEditorSelectionAndTablesChat, Wr as isEditorSelectionAndTablesIsActive, Xy as resolveObservabilityBrowserAndOperationEventsValue16, Yy as resolveObservabilityBrowserAndOperationEventsSpotUnk, _O as editorAnchorsAndMentionsPattern2, _i as resolveEditorSelectionAndTablesComponent2, cj as resolvePlatformSessionAndSourcesTest4, da as resolveCommentsEditorIncludes, dj as PlatformSessionAndSourcesAddedToYourMessageToClaude, ej as resolvePlatformSessionAndSourcesOpen, fj as PlatformSessionAndSourcesMessage4, hj as resolvePlatformSessionAndSourcesPath, jM as resolvePlatformFeatureFlagsEnabled2, kp as resolvePlatformAnnouncementsValue, lj as resolvePlatformSessionAndSourcesTest6, mp as dataOperationEnginePattern5, nm as resolveDataModelSchemasLabel2, oi as resolveEditorSelectionAndTablesText3, op as resolveCommentsStoreKind, pp as dataOperationEngineCodeSchema3, sf as admitReanchor, sj as resolvePlatformSessionAndSourcesTest5, sp as resolveCommentsStoreLabel, tj as platformSessionAndSourcesPattern12, tm as resolveDataModelSchemasValue32, up as resolveCommentsStoreValue, vO as editorAnchorsAndMentionsPattern3, vx as toast, xy as observabilityBrowserAndOperationEventsPattern22 } from "../../platform/index";
import { S as isFrameArtifact } from "../../boot/environment";
import { commentSummonHost } from "../../host/docs-host";
import { t as preloadModule } from "../../boot/preload";
export function runRoomPage1DataTypeAskClaude(roomPageContext: {
  callback: Dynamic;
  commentsReadOnlyRef: Dynamic;
  countRef4: Dynamic;
  data: Dynamic;
  iframeRef: Dynamic;
  judge: Dynamic;
  labelRef2: Dynamic;
  room: Dynamic;
  roomNodeIdRef: Dynamic;
  roomPageModuleUrl: Dynamic;
  send: Dynamic;
  title2: Dynamic;
}): Dynamic {
  if (DocumentRuntimeState6) return {
    value: void 0
  };
  let text: Dynamic = typeof roomPageContext.data.text == `string` ? roomPageContext.data.text.slice(0, 2e3) : ``;
  let block: Dynamic = typeof roomPageContext.data.block == `string` ? roomPageContext.data.block.slice(0, 1e4) : null;
  if (!text.trim()) return {
    value: void 0
  };
  // BaoCut: 选中文字后工具栏的「Ask Agent」。独立页面没有原版的对话栏（下面加进对话栏的那条路在 BaoCut 里什么也不出现）；
  // 装了 docsHost.comments 时照 Frame 的做法打开批注框，这条批注当作问智能体的（ask），发给智能体。交不出去时提示。
  if (roomPageContext.room && !isFrameArtifact() && commentSummonHost()) {
    if (useCommentStore.getState().frameSummon !== null && !roomPageContext.commentsReadOnlyRef.current) {
      roomPageContext.countRef4.current = Date.now();
      (0, roomPageContext.send)({
        type: `comment-key`
      });
    } else {
      toast(PlatformSessionAndSourcesMessage4, {
        id: `ask-claude-frame`,
        duration: 4e3
      });
    }
    return {
      value: void 0
    };
  }
  if (roomPageContext.room && isFrameArtifact()) {
    if (useCommentStore.getState().frameSummon !== null && !roomPageContext.commentsReadOnlyRef.current) {
      roomPageContext.countRef4.current = Date.now();
      (0, roomPageContext.send)({
        type: `comment-key`
      });
      return {
        value: void 0
      };
    }
    let judge2: Dynamic = (0, roomPageContext.judge)(roomPageContext.data.bid, roomPageContext.data.start, roomPageContext.data.end);
    let node: Dynamic = roomPageContext.roomNodeIdRef.current;
    if (!judge2 || !node) {
      toast(PlatformSessionAndSourcesMessage4, {
        id: `ask-claude-frame`,
        duration: 4e3
      });
      return {
        value: void 0
      };
    }
    (0, roomPageContext.callback)({
      text: text,
      ref: resolvePlatformSessionAndSourcesPath({
        file: roomPageContext.room.fileId,
        node: node,
        ...judge2
      }),
      kind: `selection`,
      title: (0, roomPageContext.title2)(judge2.bid)
    });
    return {
      value: void 0
    };
  }
  if (roomPageContext.room) {
    if (DocumentRuntimeSearch && !isEditorSelectionAndTablesIsActive((document as Dynamic).activeElement, roomPageContext.iframeRef.current, (navigator as Dynamic).userActivation)) return {
      value: void 0
    };
    updateEditorSelectionAndTablesChat(DocumentRuntimeSearch, {
      fileId: roomPageContext.room.fileId,
      anchor: resolveCommentsStoreKind({
        exact: text,
        block: block
      }),
      text: text
    });
    resolvePlatformAnnouncementsValue(document, PlatformSessionAndSourcesAddedToYourMessageToClaude, {
      key: `toolbar`
    });
    return {
      value: void 0
    };
  }
  PlatformApiAndAuthAssign.getState().add({
    path: roomPageContext.labelRef2.current,
    hash: ``,
    text: text,
    block: block
  });
  resolvePlatformAnnouncementsValue(document, PlatformSessionAndSourcesAddedToYourMessageToClaude, {
    key: `toolbar`
  });
  preloadModule(async (..._extraArguments: unknown[]): Promise<Dynamic> => {
    let {
      revealChat: revealChat
    }: Dynamic = await import("../../platform/index").then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.ed);
    return {
      revealChat: revealChat
    };
  }, mapPreloadDependencies([0, 1, 2, 3]), roomPageContext.roomPageModuleUrl).then(({
    revealChat: revealChat
  }: Dynamic, ..._extraArguments: unknown[]): undefined => {
    revealChat();
    setTimeout((..._extraArguments: unknown[]): Dynamic => (window as Dynamic).dispatchEvent(new (Event as Dynamic)(`bongo:focusChat`)), 0);
  });
}
export function runRoomPage2DataTypeLinkHit(roomPageContext: {
  data: Dynamic;
  enabledRef7: Dynamic;
  iframeRef: Dynamic;
  resolveDocumentLinksToLowerCase2: Dynamic;
  selbarPortRef: Dynamic;
  setLinkPopover: Dynamic;
  setMentionPopover2: Dynamic;
}): Dynamic {
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
  let nodeId3: Dynamic = resolvePlatformSessionAndSourcesTest6(nodeId2) ? nodeId2 : ``;
  if (!nodeId3) return {
    value: void 0
  };
  let isFinite2: Dynamic = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): number => typeof roomDocumentPage == `number` && Number.isFinite(roomDocumentPage) ? roomDocumentPage : 0;
  let rect: Dynamic = roomPageContext.data.rect ?? {};
  let iframeBounds: Dynamic = roomPageContext.iframeRef.current?.getBoundingClientRect();
  let width: Dynamic = iframeBounds?.width ?? 0;
  let height: Dynamic = iframeBounds?.height ?? 0;
  let roomDocumentPageHandler6: Dynamic = (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): number => Math.min(Math.max(roomDocumentPage, 0), options);
  let left: Dynamic = roomDocumentPageHandler6(isFinite2(rect.left), width);
  let top2: Dynamic = roomDocumentPageHandler6(isFinite2(rect.top), height);
  let width2: Dynamic = roomDocumentPageHandler6(isFinite2(rect.width), width - left);
  let height2: Dynamic = roomDocumentPageHandler6(isFinite2(rect.height), height - top2);
  if (width2 < 1 || height2 < 4) return {
    value: void 0
  };
  let href: Dynamic = typeof roomPageContext.data.href == `string` ? roomPageContext.data.href.slice(0, 4e3) : ``;
  if (href.replace(platformSessionAndSourcesPattern12, ``).length > 2048) {
    toast.warning(`Link too long`);
  }
  let documentLinksKind: Dynamic = getDocumentLinksKind(href);
  let postMessage: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.selbarPortRef.current?.postMessage({
    type: `link-cancel`,
    nodeId: nodeId3
  });
  if (roomPageContext.data.mode === `open`) {
    if (documentLinksKind) {
      (window as Dynamic).open(documentLinksKind.abs, `_blank`, `noopener`);
      postMessage();
      return {
        value: void 0
      };
    }
    let roomDocumentPageResult37: Dynamic = resolvePlatformSessionAndSourcesOpen(href);
    if (roomDocumentPageResult37) {
      resolveDocumentLinksOpen(roomDocumentPageResult37.open);
      postMessage();
      return {
        value: void 0
      };
    }
  } else if (roomPageContext.enabledRef7.current && roomPageContext.data.editable !== true && documentLinksKind && roomPageContext.data.mode !== `actions`) {
    resolveDataModelSchemasPathname(documentLinksKind.route);
    postMessage();
    return {
      value: void 0
    };
  }
  let roomDocumentPageResult36: Dynamic = resolveEditorSelectionAndTablesText3(typeof roomPageContext.data.text == `string` ? roomPageContext.data.text.replace(platformSessionAndSourcesPattern12, ``) : ``);
  (0, roomPageContext.setMentionPopover2)();
  (0, roomPageContext.setLinkPopover)({
    nodeId: nodeId3,
    from: isFinite2(roomPageContext.data.from),
    to: isFinite2(roomPageContext.data.to),
    href: href,
    text: roomDocumentPageResult36.text,
    textCapped: roomDocumentPageResult36.textCapped || roomPageContext.data.textCapped === true,
    editable: roomPageContext.data.editable === true,
    rect: {
      top: top2,
      left: left,
      width: width2,
      height: height2
    },
    mode: roomPageContext.data.mode === `edit` || !href ? `edit` : `actions`,
    kbd: hasKeyboardFrameFocus({
      kbd: roomPageContext.data.kbd === true,
      hasFocus: (document as Dynamic).hasFocus(),
      activeElement: (document as Dynamic).activeElement,
      iframe: roomPageContext.iframeRef.current
    }),
    openedAt: Date.now(),
    ...(roomPageContext.data.anchors ? {
      headings: resolveDocumentLinksLevel(roomPageContext.data.anchors),
      ...(0, roomPageContext.resolveDocumentLinksToLowerCase2)()
    } : {})
  });
}
export function runRoomPage3DataTypeWidgetDefinitionTextEdit(roomPageContext: {
  data: Dynamic;
  enabledRef13: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  selbarPortRef: Dynamic;
  sessionRef2: Dynamic;
}): Dynamic {
  let nodeId2: Dynamic = resolvePlatformSessionAndSourcesTest4(roomPageContext.data.nodeId, (0, roomPageContext.roomDocumentPageHandler3)());
  let roomDocumentPageResult36: Dynamic = resolveEditorSelectionAndTablesComponent2(roomPageContext.data);
  if (!nodeId2 || !roomDocumentPageResult36) return {
    value: void 0
  };
  let {
    id: roomDocumentPageResult37,
    component: roomDocumentPageResult38,
    path: roomDocumentPageResult39,
    value: roomDocumentPageResult40,
    basePub: roomDocumentPageResult41
  }: Dynamic = roomDocumentPageResult36;
  let postMessage: Dynamic = (reason2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.selbarPortRef.current?.postMessage({
    type: `widget-text-edit-refused`,
    nodeId: nodeId2,
    id: roomDocumentPageResult37,
    value: roomDocumentPageResult40 ?? ``,
    reason: reason2
  });
  if (!roomPageContext.enabledRef13.current) return {
    value: void postMessage(`access`)
  };
  if (roomDocumentPageResult41 === null) return {
    value: void postMessage(`The chart re-rendered while you typed — click the text and try again.`)
  };
  resolveDocumentRuntimeCatch2().then(({
    displayTextValueProblem: displayTextValueProblem
  }: Dynamic, ..._extraArguments: unknown[]): Dynamic => displayTextValueProblem(roomDocumentPageResult40, roomDocumentPageResult39), (..._extraArguments: unknown[]): undefined => undefined).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (result !== undefined) return void postMessage(result);
    roomPageContext.sessionRef2.current(nodeId2, roomDocumentPageResult37, roomDocumentPageResult38, roomDocumentPageResult39, roomDocumentPageResult40, roomDocumentPageResult41);
  });
}
export function runRoomPage4DataTypeWidgetDatumComment(roomPageContext: {
  countRef3: Dynamic;
  data: Dynamic;
  iframeRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  setActiveDataTarget: Dynamic;
  setDraftAnchor: Dynamic;
  setLastDataTarget: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  let nodeId2: Dynamic = resolvePlatformSessionAndSourcesTest4(typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``, (0, roomPageContext.roomDocumentPageHandler3)());
  let component: Dynamic = typeof roomPageContext.data.component == `string` && editorAnchorsAndMentionsPattern2.test(roomPageContext.data.component) ? roomPageContext.data.component : ``;
  let safeParse: Dynamic = dataOperationEngineCodeSchema3.safeParse({
    kind: `component`,
    component: component,
    ...(roomPageContext.data.source === undefined ? {} : {
      source: roomPageContext.data.source
    }),
    ...(roomPageContext.data.resolved === undefined ? {} : {
      resolved: roomPageContext.data.resolved
    }),
    ...(roomPageContext.data.value === undefined ? {} : {
      value: roomPageContext.data.value
    }),
    ...(roomPageContext.data.datum === undefined ? {} : {
      datum: roomPageContext.data.datum
    }),
    ...(roomPageContext.data.origin === undefined ? {} : {
      origin: roomPageContext.data.origin
    })
  });
  if (!nodeId2 || !component || !safeParse.success || safeParse.data.resolved?.object === `node` && safeParse.data.resolved.id !== nodeId2 || roomPageContext.data.pub !== undefined) return {
    value: void 0
  };
  let record5: Dynamic = {};
  if (roomPageContext.data.vs && typeof roomPageContext.data.vs == `object`) {
    let index: number = 0;
    for (let [items2, items3] of Object.entries(roomPageContext.data.vs) as Dynamic) {
      if (index >= 32) break;
      if (typeof items3 == `string` && items3.length <= 256 && items2.length <= 64 && editorAnchorsAndMentionsPattern3.test(items2) && (items3 === `` || editorAnchorsAndMentionsPattern3.test(items3))) {
        record5[items2] = items3;
        index++;
      }
    }
  }
  let y5: Dynamic = typeof roomPageContext.data.y == `number` && Number.isFinite(roomPageContext.data.y) ? roomPageContext.data.y : 0;
  let words2: Dynamic = resolveCommentsStoreLabel(roomPageContext.data.words);
  if (roomPageContext.data.placing === true) {
    roomPageContext.widgetPlacingRef.current = false;
    (0, roomPageContext.setDraftAnchor)(nodeId2, component, record5, y5, safeParse.data, words2 ?? undefined);
    return {
      value: void 0
    };
  }
  let rows: Dynamic = roomPageContext.data.rows;
  let rows2: Dynamic = Array.isArray(rows) ? rows.filter((row?: Dynamic, ..._extraArguments: unknown[]): boolean => typeof row == `object` && !!row && !Array.isArray(row)) : undefined;
  let rowsPin: Dynamic = roomPageContext.data.rowsPin;
  let rowsPin2: Dynamic = typeof rowsPin == `object` && rowsPin && Number.isInteger(rowsPin.row) && typeof rowsPin.column == `string` ? rowsPin : undefined;
  let fed: Dynamic = roomPageContext.data.fed;
  let fedPath: Dynamic = roomPageContext.data.fedPath;
  let fedPath2: Dynamic = Array.isArray(fedPath) && fedPath.every((fedPath3?: Dynamic, ..._extraArguments: unknown[]) => typeof fedPath3 == `string`) ? fedPath : undefined;
  let inline: Dynamic = roomPageContext.data.inline;
  let inline2: Dynamic = typeof inline == `object` && inline && typeof inline.name == `string` && dataOperationEnginePattern5.test(inline.name) && Number.isInteger(inline.rows) && inline.rows >= 0 && inline.rows <= 2 ** 53 - 1 ? {
    name: inline.name,
    rows: Math.max(0, inline.rows)
  } : undefined;
  let iframeBounds: Dynamic = roomPageContext.iframeRef.current?.getBoundingClientRect();
  let rect: Dynamic = roomPageContext.data.rect;
  let roomDocumentPageResult36: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
    if (iframeBounds === undefined || typeof rect != `object` || !rect) return null;
    let {
      x: rect2,
      y: rect3,
      w: rect4,
      h: rect5
    }: Dynamic = rect;
    if (typeof rect2 != `number` || typeof rect3 != `number` || typeof rect4 != `number` || typeof rect5 != `number` || !Number.isFinite(rect2) || !Number.isFinite(rect3) || !Number.isFinite(rect4) || !Number.isFinite(rect5) || rect4 < 0 || rect5 < 0 || rect2 < -1 || rect3 < -1 || rect2 > iframeBounds.width + 1 || rect3 > iframeBounds.height + 1 || rect4 > iframeBounds.width + 1 || rect5 > iframeBounds.height + 1) return null;
    let within: Dynamic = {
      left: iframeBounds.left,
      top: iframeBounds.top,
      right: iframeBounds.right,
      bottom: iframeBounds.bottom
    };
    let room2: Dynamic = roomPageContext.data.room;
    let room3: Dynamic = room2 === `above` || room2 === `below` ? room2 : undefined;
    return {
      x: iframeBounds.left + rect2,
      y: iframeBounds.top + rect3,
      w: rect4,
      h: rect5,
      within: within,
      ...(room3 && {
        room: room3
      })
    };
  })();
  let anchor: Dynamic = roomDocumentPageResult36 ?? {
    x: (iframeBounds?.left ?? 0) + (iframeBounds?.width ?? 0) / 2,
    y: (iframeBounds?.top ?? 0) + y5
  };
  let at2: Dynamic = roomPageContext.data.at;
  let status: Dynamic = roomPageContext.data.status;
  (0, roomPageContext.setLastDataTarget)(rows2 !== undefined || fed !== undefined ? {
    nodeId: nodeId2,
    target: safeParse.data,
    ...(rows2 === undefined ? {} : {
      rows: rows2
    }),
    ...(rowsPin2 === undefined ? {} : {
      rowsPin: rowsPin2
    }),
    ...(fed === undefined ? {} : {
      fed: fed
    }),
    ...(fedPath2 === undefined ? {} : {
      fedPath: fedPath2
    }),
    ...(inline2 === undefined ? {} : {
      inline: inline2
    }),
    ...(typeof at2 == `string` ? {
      at: at2
    } : {}),
    ...(typeof status == `string` ? {
      status: status
    } : {}),
    ...(roomDocumentPageResult36 !== null && iframeBounds !== undefined ? {
      rect: {
        x: roomDocumentPageResult36.x - iframeBounds.left,
        y: roomDocumentPageResult36.y - iframeBounds.top,
        w: roomDocumentPageResult36.w,
        h: roomDocumentPageResult36.h
      }
    } : {}),
    scrollY: roomPageContext.countRef3.current
  } : (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage?.nodeId === nodeId2 ? null : roomDocumentPage);
  (0, roomPageContext.setActiveDataTarget)({
    nodeId: nodeId2,
    target: safeParse.data,
    vs: record5,
    y: y5,
    ...(words2 === null ? {} : {
      words: words2
    }),
    ...(rows2 === undefined ? {} : {
      rows: rows2
    }),
    ...(rowsPin2 === undefined ? {} : {
      rowsPin: rowsPin2
    }),
    ...(fed === undefined ? {} : {
      fed: fed
    }),
    ...(fedPath2 === undefined ? {} : {
      fedPath: fedPath2
    }),
    ...(inline2 === undefined ? {} : {
      inline: inline2
    }),
    ...(typeof roomPageContext.data.at == `string` ? {
      at: roomPageContext.data.at
    } : {}),
    ...(typeof roomPageContext.data.status == `string` ? {
      status: roomPageContext.data.status
    } : {}),
    anchor: anchor
  });
}
export function runRoomPage5DataTypeWidgetSegmentComment(roomPageContext: {
  data: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  setDraftAnchor: Dynamic;
}): Dynamic {
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
  let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTest4(nodeId2, (0, roomPageContext.roomDocumentPageHandler3)());
  let segment: Dynamic = typeof roomPageContext.data.segment == `string` && editorAnchorsAndMentionsPattern2.test(roomPageContext.data.segment) ? roomPageContext.data.segment : ``;
  let matchesWhole: boolean = roomPageContext.data.whole === true && segment === ``;
  let roomDocumentPageResult37: Dynamic = matchesWhole ? resolvePlatformSessionAndSourcesTest5(nodeId2, (0, roomPageContext.roomDocumentPageHandler3)()) : roomDocumentPageResult36;
  if (!roomDocumentPageResult37 || !segment && !matchesWhole) return {
    value: void 0
  };
  let record5: Dynamic = {};
  if (roomPageContext.data.vs && typeof roomPageContext.data.vs == `object`) {
    let index: number = 0;
    for (let [items2, items3] of Object.entries(roomPageContext.data.vs) as Dynamic) {
      if (index >= 32) break;
      if (typeof items3 == `string` && items3.length <= 256 && items2.length <= 64 && editorAnchorsAndMentionsPattern3.test(items2) && (items3 === `` || editorAnchorsAndMentionsPattern3.test(items3))) {
        record5[items2] = items3;
        index++;
      }
    }
  }
  let y5: Dynamic = typeof roomPageContext.data.y == `number` && Number.isFinite(roomPageContext.data.y) ? roomPageContext.data.y : 0;
  let targetWords: Dynamic = resolveCommentsStoreValue(roomPageContext.data.words);
  (0, roomPageContext.setDraftAnchor)(roomDocumentPageResult37, segment, record5, y5, undefined, targetWords === undefined ? undefined : {
    targetWords: targetWords
  });
}
export function runRoomPage6DataTypeCommentAdd(roomPageContext: {
  amountRef: Dynamic;
  askHeightObserverRef: Dynamic;
  commentsReadOnlyRef: Dynamic;
  countRef4: Dynamic;
  data: Dynamic;
  DocumentSourcePromptState: Dynamic;
  enabledRef3: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  inlineAskHost2: Dynamic;
  navigatedRef: Dynamic;
  room: Dynamic;
  selbarPortRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
  sessionRouteSendRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionSendingRef: Dynamic;
}): Dynamic {
  if (roomPageContext.commentsReadOnlyRef.current) return {
    value: void 0
  };
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
  let nodeId3: Dynamic = resolvePlatformSessionAndSourcesTest6(nodeId2) ? nodeId2 : ``;
  if (!nodeId3) return {
    value: void 0
  };
  let quote: Dynamic = typeof roomPageContext.data.quote == `string` ? roomPageContext.data.quote.slice(0, 2e3) : ``;
  let prefix: Dynamic = typeof roomPageContext.data.prefix == `string` ? roomPageContext.data.prefix.slice(-64) : ``;
  let suffix: Dynamic = typeof roomPageContext.data.suffix == `string` ? roomPageContext.data.suffix.slice(0, 64) : ``;
  let nonce4: Dynamic = typeof roomPageContext.data.nonce == `number` && Number.isFinite(roomPageContext.data.nonce) ? roomPageContext.data.nonce : 0;
  let y5: Dynamic = typeof roomPageContext.data.y == `number` && Number.isFinite(roomPageContext.data.y) ? roomPageContext.data.y : 0;
  let atom: boolean = roomPageContext.data.atom === true;
  let storeState: Dynamic = useCommentStore.getState();
  let matchesReanchor: boolean = roomPageContext.data.reanchor === true;
  let draftAnchor: Dynamic = matchesReanchor ? storeState.draftAnchor : null;
  let idRange: Dynamic = Array.isArray(roomPageContext.data.idRange) && typeof roomPageContext.data.idRange[0] == `string` && typeof roomPageContext.data.idRange[1] == `string` ? [roomPageContext.data.idRange[0].slice(0, 200), roomPageContext.data.idRange[1].slice(0, 200)] : undefined;
  let cellIds: Dynamic = Array.isArray(roomPageContext.data.cellIds) && roomPageContext.data.cellIds.length > 0 && roomPageContext.data.cellIds.length <= 400 && roomPageContext.data.cellIds.every((cellId?: Dynamic, ..._extraArguments: unknown[]) => typeof cellId == `string`) ? roomPageContext.data.cellIds.map((cellId?: Dynamic, ..._extraArguments: unknown[]): Dynamic => cellId.slice(0, 200)) : undefined;
  if (matchesReanchor) {
    if (!admitReanchor(draftAnchor, storeState.dirtyEditors, {
      idRange: idRange,
      cellIds: cellIds
    })) return {
      value: void 0
    };
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `reanchor-taken`,
      nonce: nonce4
    });
  }
  let block: Dynamic = resolveDataModelSchemasBid2(roomPageContext.data);
  let react: Dynamic = matchesReanchor ? undefined : resolveCommentsEditorIncludes(roomPageContext.data.react);
  if (react !== undefined) {
    let now: number = performance.now();
    if (now - roomPageContext.amountRef.current < documentSourcePromptLimit400) return {
      value: void 0
    };
    roomPageContext.amountRef.current = now;
  }
  let matchCommentAdd: Dynamic = !react && !matchesReanchor && typeof roomPageContext.data.inlineAsk == `number` ? roomPageContext.inlineAskHost.matchCommentAdd(roomPageContext.data.inlineAsk) : undefined;
  if (matchCommentAdd === `drop`) return {
    value: void 0
  };
  let matchesMatchCommentAdd: boolean = matchCommentAdd !== undefined && roomPageContext.sessionSendingRef.current === matchCommentAdd.nonce;
  let matchesMatchCommentAdd2: Dynamic = matchCommentAdd !== undefined && roomPageContext.sessionRouteSendRef.current?.card === matchCommentAdd.nonce && roomPageContext.sessionRouteSendRef.current.fellBack && typeof roomPageContext.room?.fileId == `string` && roomPageContext.room.fileId !== ``;
  let autopost: Dynamic = matchCommentAdd !== undefined && matchesMatchCommentAdd ? {
    ...(roomPageContext.sessionModRef.current?.carrierPostOf(matchCommentAdd) ?? {
      ...matchCommentAdd,
      quiet: true
    }),
    ...(matchesMatchCommentAdd2 && {
      summonOwedTo: roomPageContext.room.fileId
    })
  } : matchCommentAdd;
  if (matchesMatchCommentAdd && matchCommentAdd !== undefined) {
    if (typeof block?.bid == `string`) {
      roomPageContext.sessionRunsRef.current?.lineIs(matchCommentAdd.nonce, block.bid);
    }
    if (roomPageContext.sessionLineRef.current?.card === matchCommentAdd.nonce) {
      roomPageContext.sessionLineRef.current = {
        ...roomPageContext.sessionLineRef.current,
        ...(block && {
          block: block
        }),
        y: y5
      };
    }
  }
  let inlineAskHost4: Dynamic = roomPageContext.inlineAskHost.current();
  if (!react && !matchesReanchor && autopost === undefined && inlineAskHost4 !== null) {
    if (roomPageContext.inlineAskHost.isSending() || !inlineAskHost4.docked && storeState.dirtyEditors.has(`inline-ask`)) {
      roomPageContext.inlineAskHost.commentRefused();
      if ((document as Dynamic).activeElement === roomPageContext.iframeRef.current) {
        roomPageContext.iframeRef.current?.blur();
      }
      return {
        value: void 0
      };
    }
    try {
      roomPageContext.askHeightObserverRef.current = `page`;
      if (!inlineAskHost4.docked) {
        (0, roomPageContext.inlineAskHost2)(false);
      }
    } finally {
      roomPageContext.askHeightObserverRef.current = null;
    }
  }
  if (!matchesMatchCommentAdd) {
    storeState.setDraftY(y5);
  }
  roomPageContext.DocumentSourcePromptState = (threadId?: Dynamic, nonce5?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
    if (!selbarPort || !roomPageContext.enabledRef3.current || roomPageContext.navigatedRef.current) return;
    let record6: Dynamic = threadId === null ? {
      type: `draft-left`,
      nonce: nonce5
    } : {
      type: `comment-mark`,
      threadId: threadId,
      nonce: nonce5
    };
    selbarPort.postMessage(record6);
  };
  if (storeState.commentMode === `hidden` && !matchesMatchCommentAdd) {
    storeState.setCommentMode(`margin`);
  }
  let matchesAutopost: boolean = autopost !== undefined || (draftAnchor ? draftAnchor.ask === true : !react && (roomPageContext.data.askClaude === true || resolveDataModelSchemasValue32(roomPageContext.countRef4.current, Date.now())));
  if (!react && !matchesReanchor && !autopost) {
    roomPageContext.countRef4.current = 0;
  }
  let record5: Dynamic = {
    nodeId: nodeId3,
    quote: quote,
    prefix: prefix,
    suffix: suffix,
    nonce: nonce4,
    atom: atom,
    ...(idRange && {
      idRange: idRange
    }),
    ...(cellIds && {
      cellIds: cellIds
    }),
    ...(roomPageContext.data.clamped === true && {
      clamped: true
    }),
    ...(block && {
      block: block
    }),
    ...(react && {
      react: react
    }),
    ...(matchesAutopost && {
      ask: true
    }),
    ...(autopost && {
      autopost: autopost
    })
  };
  if (matchesMatchCommentAdd) {
    storeState.setQuietPost(record5, y5);
  } else {
    storeState.setDraftAnchor(record5);
  }
}
export function runRoomPage7DataTypeInlineAskGoneDataTypeInlineAskFailed(roomPageContext: {
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  data: Dynamic;
  elementRef10: Dynamic;
  elementRef12: Dynamic;
  elementRef20: Dynamic;
  enabledRef21: Dynamic;
  inlineAskHost: Dynamic;
  leavingAskCardRef: Dynamic;
  selectionCardRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionSendingRef: Dynamic;
  setInlineAskNotice: Dynamic;
  uniqueItemsRef4: Dynamic;
}): Dynamic {
  let nonce4: Dynamic = typeof roomPageContext.data.nonce == `number` ? roomPageContext.data.nonce : null;
  if (nonce4 === null) return {
    value: void 0
  };
  roomPageContext.elementRef20.current(nonce4);
  if (roomPageContext.elementRef10.current?.nonce === nonce4) {
    roomPageContext.elementRef10.current = null;
  }
  if (roomPageContext.sessionRunsRef.current?.live() === nonce4) {
    roomPageContext.sessionRunsRef.current.spotGone(nonce4);
  }
  if (roomPageContext.leavingAskCardRef.current === nonce4 && roomPageContext.sessionCardsRef.current.has(nonce4)) {
    if (roomPageContext.askCardDeskRef.current?.inHand() === nonce4) {
      roomPageContext.askCardDeskRef.current.written(nonce4);
    }
    return {
      value: void 0
    };
  }
  if (roomPageContext.askCardDeskRef.current?.inHand() === nonce4 && roomPageContext.leavingAskCardRef.current === nonce4) roomPageContext.askCardDeskRef.current.written(nonce4);else if (roomPageContext.askCardDeskRef.current?.inHand() === nonce4 && ((window as Dynamic).clearTimeout(roomPageContext.askFailureTimerRef.current), roomPageContext.elementRef12.current?.stopDeciding(nonce4), roomPageContext.data.type === `inline-ask-failed` && roomPageContext.data.why === `run_live` && roomPageContext.askCardDeskRef.current.refusedStart(nonce4), roomPageContext.askCardDeskRef.current.unsent(nonce4, roomPageContext.data.type === `inline-ask-gone` ? `gone` : `no_spot`), resolvePlatformAnnouncementsValue2(document, `inline-ask`), roomPageContext.data.type === `inline-ask-failed`)) {
    let matchesWhy: boolean = roomPageContext.data.why === `run_live`;
    if (matchesWhy) {
      roomPageContext.elementRef12.current?.unspent(nonce4);
    }
    if (matchesWhy) {
      resolveCommentSessionHost(`refused`, `run_live`);
    } else {
      resolveCommentSessionHost(`refused`, resolveObservabilityBrowserAndOperationEventsSpotUnk(roomPageContext.data.spot), resolveObservabilityBrowserAndOperationEventsValue16(roomPageContext.data.who));
    }
    (0, roomPageContext.setInlineAskNotice)((matchesWhy ? roomPageContext.askCardModRef.current?.ASK_CARD_WORDS.run_live : roomPageContext.askCardModRef.current?.ASK_CARD_WORDS.no_spot) ?? null);
    if (roomPageContext.sessionSendingRef.current === nonce4) {
      roomPageContext.inlineAskHost.abandon(nonce4);
    }
    try {
      roomPageContext.selectionCardRef.current.ended(nonce4, `failed`);
    } catch {}
    return {
      value: void 0
    };
  }
  if (roomPageContext.data.type === `inline-ask-gone` && roomPageContext.sessionCardsRef.current.has(nonce4)) {
    roomPageContext.uniqueItemsRef4.current.add(nonce4);
  }
  roomPageContext.inlineAskHost.documentSays(roomPageContext.data.type === `inline-ask-gone` ? `gone` : `failed`, nonce4, typeof roomPageContext.data.why == `string` ? roomPageContext.data.why : undefined, useCommentStore.getState().dirtyEditors.has(`inline-ask`) && roomPageContext.askCardDeskRef.current?.mayFocus(nonce4) !== false || roomPageContext.enabledRef21.current);
  try {
    if (roomPageContext.data.type === `inline-ask-failed`) {
      roomPageContext.selectionCardRef.current.ended(nonce4, `failed`);
    }
  } catch {}
  return {
    value: void 0
  };
}
export function runRoomPage8DataTypeInlineAskWritingDataTypeInlineAskUnsent(roomPageContext: {
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askInvitationKinds: Dynamic;
  askPermission: Dynamic;
  closedCardsRef: Dynamic;
  data: Dynamic;
  elementRef12: Dynamic;
  elementRef8: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  leavingAskCardRef: Dynamic;
  setInlineAskNotice: Dynamic;
  setLeavingAskCard: Dynamic;
}): Dynamic {
  let nonce4: Dynamic = typeof roomPageContext.data.nonce == `number` && Number.isFinite(roomPageContext.data.nonce) ? roomPageContext.data.nonce : null;
  let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
  let askCardMod: Dynamic = roomPageContext.askCardModRef.current;
  if (nonce4 === null || !askCardDesk || !askCardMod) return {
    value: void 0
  };
  if (roomPageContext.data.type === `inline-ask-writing`) {
    if (!askCardDesk.mayClose(nonce4)) return {
      value: void 0
    };
    (window as Dynamic).clearTimeout(roomPageContext.askFailureTimerRef.current);
    if (askCardMod.easeOutKeyboardAt(document, nonce4) !== `elsewhere`) {
      roomPageContext.iframeRef.current?.focus({
        preventScroll: true
      });
    }
    roomPageContext.leavingAskCardRef.current = nonce4;
    (0, roomPageContext.setLeavingAskCard)(nonce4);
    (window as Dynamic).clearTimeout(roomPageContext.elementRef8.current);
    roomPageContext.elementRef8.current = (window as Dynamic).setTimeout((..._extraArguments: unknown[]): undefined => {
      askCardDesk.written(nonce4);
      roomPageContext.askInvitationKinds.current.delete(nonce4);
      if (roomPageContext.leavingAskCardRef.current === nonce4) {
        roomPageContext.leavingAskCardRef.current = null;
      }
      (0, roomPageContext.setLeavingAskCard)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === nonce4 ? null : roomDocumentPage);
      if (roomPageContext.inlineAskHost.current()?.nonce === nonce4) {
        roomPageContext.inlineAskHost.cancel({
          restoreCaret: false
        });
      }
    }, (window as Dynamic).matchMedia?.(`(prefers-reduced-motion: reduce)`).matches ? 0 : askCardMod.ASK_CARD_OUT_MS);
    return {
      value: void 0
    };
  }
  let why: Dynamic = typeof roomPageContext.data.why == `string` ? roomPageContext.data.why : `failed`;
  if (roomPageContext.leavingAskCardRef.current === nonce4 && !askCardDesk.handedAway(nonce4)) {
    (window as Dynamic).clearTimeout(roomPageContext.elementRef8.current);
    roomPageContext.leavingAskCardRef.current = null;
    (0, roomPageContext.setLeavingAskCard)(null);
  }
  if (askCardDesk.inHand() === nonce4) {
    roomPageContext.elementRef12.current?.stopDeciding(nonce4);
  }
  let answered: Dynamic = askCardDesk.answered(nonce4);
  if (!askCardDesk.unsent(nonce4, why)) return {
    value: void 0
  };
  (window as Dynamic).clearTimeout(roomPageContext.askFailureTimerRef.current);
  if (roomPageContext.closedCardsRef.current.has(nonce4)) {
    if ((0, roomPageContext.askPermission)()) {
      roomPageContext.announcedAskCards.current.add(nonce4);
    }
    (0, roomPageContext.setInlineAskNotice)((0, roomPageContext.askPermission)() ? askCardMod.ASK_CARD_WORDS.comment_instead : askCardMod.ASK_CARD_WORDS.closed);
  } else {
    (0, roomPageContext.setInlineAskNotice)(why === `stopped` ? null : why === `gone` ? askCardMod.ASK_CARD_WORDS.spot_gone : why === `refused` && answered ? askCardMod.ASK_CARD_WORDS.declined : askCardMod.ASK_CARD_WORDS.unsent);
  }
  return {
    value: void 0
  };
}
export function runRoomPage9DataTypeInlineAskOpen(roomPageContext: {
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askCardModRef: Dynamic;
  askCardRecoveryPreviousNotice2: Dynamic;
  askCardSeqRef: Dynamic;
  askInvitationKinds: Dynamic;
  askLineBidRef: Dynamic;
  askModulesPromiseRef: Dynamic;
  askPermission: Dynamic;
  askReconcilePendingRef: Dynamic;
  askUsageRef: Dynamic;
  closedCardsRef: Dynamic;
  createRouteSideRef: Dynamic;
  data: Dynamic;
  elementRef: Dynamic;
  elementRef10: Dynamic;
  elementRef2: Dynamic;
  elementRef7: Dynamic;
  enabledRef: Dynamic;
  enabledRef12: Dynamic;
  ensureSessionRunsLoaded: Dynamic;
  fsEntryId2: Dynamic;
  goneRef: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  inlineAskHost: Dynamic;
  isAskCardRecoveryAlive2: Dynamic;
  labelRef9: Dynamic;
  leavingAskCardRef: Dynamic;
  lookupRef: Dynamic;
  mapPreloadDependencies2: Dynamic;
  memoized: Dynamic;
  messageChannel2: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  refreshWaitingSideRef: Dynamic;
  routeSideRef: Dynamic;
  selbarPortRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionStoppedRef: Dynamic;
  setAskCardDraft: Dynamic;
  setInlineAskNotice: Dynamic;
  uniqueItemsRef: Dynamic;
  uniqueItemsRef2: Dynamic;
  uniqueItemsRef3: Dynamic;
  uniqueItemsRef4: Dynamic;
}): Dynamic {
  let nonce4: Dynamic = typeof roomPageContext.data.nonce == `number` && Number.isFinite(roomPageContext.data.nonce) ? roomPageContext.data.nonce : null;
  if (nonce4 === null) return {
    value: void 0
  };
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
  let nodeId3: Dynamic = resolvePlatformSessionAndSourcesTest6(nodeId2) ? nodeId2 : ``;
  let rect: Dynamic = resolveDocumentSourcePromptTop(roomPageContext.data);
  let matchesVia: boolean = roomPageContext.data.via === `dock`;
  let reannounce: boolean = roomPageContext.inlineAskHost.current()?.nonce === nonce4;
  let moved: Dynamic = roomPageContext.data.moved;
  let askCardRecoveryDisposition2: string = askCardRecoveryDisposition({
    gone: isCommentSessionFeatureDisabled(),
    lives: (0, roomPageContext.isAskCardRecoveryAlive2)(),
    reannounce: reannounce,
    moved: typeof moved == `number`,
    movedFromOpen: typeof moved == `number` && roomPageContext.inlineAskHost.current()?.nonce === moved,
    undoKept: roomPageContext.data.via === `undo` && roomPageContext.askCardDeskRef.current?.keeps() === true
  });
  if (askCardRecoveryDisposition2 !== `on`) {
    roomPageContext.elementRef10.current = null;
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `inline-ask-cancel`,
      nonce: nonce4,
      ...(askCardRecoveryDisposition2 === `move_refused` && {
        moveRefused: true
      })
    });
    return {
      value: void 0
    };
  }
  let matchesVia2: boolean = roomPageContext.data.via === `write` || roomPageContext.data.via === `undo`;
  let matchesVia3: boolean = roomPageContext.data.via === `comment`;
  let matchesAskCardDesk: boolean = roomPageContext.askCardDeskRef.current !== null && roomPageContext.AskCardFaceRef.current !== null;
  let element4: Dynamic = roomPageContext.elementRef10.current;
  let matchesElement3: boolean = element4 !== null && element4.m === roomPageContext.data;
  if (element4 !== null && !reannounce) {
    roomPageContext.elementRef10.current = null;
  }
  let askCardRecoveryOffer2: Dynamic = askCardRecoveryOffer(roomPageContext.initialAskCardRecoveryStateRef.current, {
    gone: isCommentSessionFeatureDisabled(),
    back: roomPageContext.data.via === `undo`,
    kept: roomPageContext.askCardDeskRef.current?.keeps() === true,
    offer: (0, roomPageContext.askPermission)(),
    told: !!(0, roomPageContext.askCardRecoveryPreviousNotice2)(),
    closed: roomPageContext.askReconcilePendingRef.current
  });
  let verdict: Dynamic = (matchesVia2 || matchesVia3) && !reannounce ? resolveDocumentCommandsLoad({
    kind: matchesVia3 ? `comment` : `write`,
    told: askCardRecoveryOffer2.told,
    closed: askCardRecoveryOffer2.closed,
    offer: askCardRecoveryOffer2.offer,
    load: matchesAskCardDesk ? `ready` : !matchesElement3 && (roomPageContext.askUsageRef.current || roomPageContext.askReconcilePendingRef.current) && roomPageContext.askModulesPromiseRef.current !== null ? `pending` : `failed`
  }) : null;
  let writeCard: Dynamic = matchesVia2 && verdict === `card`;
  let matchesVia4: Dynamic = matchesVia2 && resolveDocumentCommandsViaSession({
    kind: `write`,
    told: askCardRecoveryOffer2.told,
    offer: (0, roomPageContext.askPermission)(),
    verdict: verdict,
    viaSession: resolvePlatformFeatureFlagsEnabled2(`askViaSession`)
  });
  if (matchesVia4 && resolvePlatformFeatureFlagsEnabled2(`askNoCommentSend`)) {
    ensureSessionRouteModule().then((..._extraArguments: unknown[]): Dynamic => roomPageContext.createRouteSideRef.current()?.probe());
  }
  if (matchesVia4 && resolvePlatformFeatureFlagsEnabled2(`askWaitingMarks`)) {
    resolveDocumentCommandsResolve().then((..._extraArguments: unknown[]): Dynamic => roomPageContext.refreshWaitingSideRef.current());
  }
  if (matchesVia2) {
    let bid: Dynamic = roomPageContext.data.bid;
    if (typeof bid == `string` && observabilityBrowserAndOperationEventsPattern22.test(bid)) {
      roomPageContext.askLineBidRef.current.set(nonce4, bid);
    } else {
      roomPageContext.askLineBidRef.current.delete(nonce4);
    }
  }
  let matchesVia5: Dynamic = matchesVia2 && verdict === `comment`;
  let moved2: Dynamic = !reannounce && !matchesVia && typeof roomPageContext.data.moved == `number` ? roomPageContext.data.moved : null;
  if (moved2 !== null) {
    let matchesVia8: Dynamic = matchesVia3 && verdict === `card` || matchesVia5;
    if (roomPageContext.askInvitationKinds.current.has(moved2) && roomPageContext.AskCardFaceRef.current !== null && !roomPageContext.enabledRef12.current && roomPageContext.askCardDeskRef.current?.inHand() !== moved2 && roomPageContext.leavingAskCardRef.current !== moved2 && roomPageContext.elementRef7.current !== moved2 && (writeCard || matchesVia8) && nodeId3 && rect && roomPageContext.inlineAskHost.movedTo(moved2, {
      nonce: nonce4,
      nodeId: nodeId3,
      rect: rect
    })) {
      roomPageContext.lookupRef.current = new (Map as Dynamic)([[nonce4, roomPageContext.lookupRef.current.get(moved2) ?? moved2]]);
      if (roomPageContext.askCardDeskRef.current?.mayFocus(moved2) === false) {
        roomPageContext.askCardDeskRef.current.released(moved2);
        roomPageContext.lookupRef.current = new (Map as Dynamic)();
      }
      roomPageContext.askInvitationKinds.current.delete(moved2);
      roomPageContext.askInvitationKinds.current.set(nonce4, writeCard ? `write` : `comment`);
      if (roomPageContext.uniqueItemsRef2.current.delete(moved2)) {
        roomPageContext.uniqueItemsRef2.current.add(nonce4);
      } else {
        roomPageContext.uniqueItemsRef2.current.delete(nonce4);
      }
      if (roomPageContext.uniqueItemsRef3.current.delete(moved2) && roomPageContext.lookupRef.current.has(nonce4)) {
        roomPageContext.uniqueItemsRef3.current.add(nonce4);
      } else {
        roomPageContext.uniqueItemsRef3.current.delete(nonce4);
      }
      roomPageContext.uniqueItemsRef.current.delete(moved2);
      if (matchesVia5) {
        roomPageContext.uniqueItemsRef.current.add(nonce4);
      } else {
        roomPageContext.uniqueItemsRef.current.delete(nonce4);
      }
      roomPageContext.announcedAskCards.current.delete(moved2);
      roomPageContext.announcedAskCards.current.delete(nonce4);
      roomPageContext.sessionCardsRef.current.delete(moved2);
      roomPageContext.sessionCardsRef.current.delete(nonce4);
      roomPageContext.sessionRunsRef.current?.forget(moved2);
      roomPageContext.routeSideRef.current?.movedFrom(moved2);
      if (roomPageContext.sessionLineRef.current?.card === moved2) {
        roomPageContext.sessionLineRef.current = null;
      }
      if (roomPageContext.sessionLateRef.current === moved2) {
        roomPageContext.sessionLateRef.current = null;
      }
      if (roomPageContext.sessionStoppedRef.current === moved2) {
        roomPageContext.sessionStoppedRef.current = null;
      }
      if (roomPageContext.elementRef2.current?.card === moved2) {
        roomPageContext.elementRef2.current = null;
      }
      if (roomPageContext.elementRef.current?.card === moved2) {
        roomPageContext.elementRef.current = null;
      }
      roomPageContext.uniqueItemsRef4.current.delete(moved2);
      if (matchesVia4) {
        (0, roomPageContext.ensureSessionRunsLoaded)().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => void (result && !roomPageContext.goneRef.current && roomPageContext.askInvitationKinds.current.get(nonce4) === `write` && roomPageContext.sessionCardsRef.current.add(nonce4)));
      }
      roomPageContext.askCardDeskRef.current?.moved(moved2, nonce4);
      roomPageContext.memoized.measured(nonce4, rect.top, undefined);
      return {
        value: void 0
      };
    }
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `inline-ask-cancel`,
      nonce: nonce4,
      moveRefused: true
    });
    return {
      value: void 0
    };
  }
  if (verdict === `hold`) {
    roomPageContext.elementRef10.current = {
      nonce: nonce4,
      m: roomPageContext.data
    };
    roomPageContext.askModulesPromiseRef.current?.then((..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.elementRef10.current?.m === roomPageContext.data && !roomPageContext.goneRef.current && !roomPageContext.navigatedRef.current && roomPageContext.selbarPortRef.current === roomPageContext.messageChannel2.port1) {
        roomPageContext.messageChannel2.port1.dispatchEvent(new (MessageEvent as Dynamic)(`message`, {
          data: roomPageContext.data
        }));
      }
    });
    return {
      value: void 0
    };
  }
  if (verdict === `older` && matchesElement3) {
    resolveCommentsStoreLayer(`host`, `claude_writing_probe`, {
      what: `card_load_failed`
    });
    if (!roomPageContext.enabledRef.current) {
      roomPageContext.enabledRef.current = true;
      roomPageContext.askModulesPromiseRef.current = null;
      (0, roomPageContext.mapPreloadDependencies2)();
    }
  }
  let matchesVia6: Dynamic = matchesVia3 && verdict === `card` || matchesVia5;
  if (!reannounce) {
    let pid2: Dynamic = roomPageContext.pidRef.current;
    if (pid2 && resolvePlatformFeatureFlagsValue5(`askWhy`) === true) {
      DocumentRuntimePid.pid = pid2;
      DocumentRuntimeOffered.prime();
    }
    roomPageContext.lookupRef.current.clear();
    if (writeCard) {
      roomPageContext.askInvitationKinds.current.set(nonce4, roomPageContext.data.via);
    } else {
      if (matchesVia6) {
        roomPageContext.askInvitationKinds.current.set(nonce4, `comment`);
      } else {
        roomPageContext.askInvitationKinds.current.delete(nonce4);
      }
    }
    if (matchesVia5) {
      roomPageContext.uniqueItemsRef.current.add(nonce4);
    } else {
      roomPageContext.uniqueItemsRef.current.delete(nonce4);
    }
    if ((writeCard || matchesVia6) && roomPageContext.data.via === `undo`) {
      roomPageContext.uniqueItemsRef2.current.add(nonce4);
    } else {
      roomPageContext.uniqueItemsRef2.current.delete(nonce4);
    }
    roomPageContext.uniqueItemsRef3.current.delete(nonce4);
    roomPageContext.sessionCardsRef.current.delete(nonce4);
    if (matchesVia4) {
      (0, roomPageContext.ensureSessionRunsLoaded)().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => void (result && !roomPageContext.goneRef.current && roomPageContext.askInvitationKinds.current.has(nonce4) && roomPageContext.sessionCardsRef.current.add(nonce4)));
    }
    roomPageContext.announcedAskCards.current.delete(nonce4);
    roomPageContext.closedCardsRef.current.delete(nonce4);
  }
  if (matchesVia && !reannounce && roomPageContext.labelRef9.current !== `asked`) {
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `inline-ask-cancel`,
      nonce: nonce4
    });
    return {
      value: void 0
    };
  }
  if (verdict === `release` || roomPageContext.enabledRef12.current && !reannounce || !matchesVia && !reannounce && !writeCard && !(0, roomPageContext.askPermission)() && roomPageContext.askUsageRef.current) {
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `inline-ask-cancel`,
      nonce: nonce4
    });
    return {
      value: void 0
    };
  }
  let matchesVia7: Dynamic = matchesVia && !reannounce && roomPageContext.labelRef9.current === `asked`;
  if (matchesVia7) {
    roomPageContext.labelRef9.current = `done`;
  }
  if (rect) {
    roomPageContext.memoized.measured(nonce4, rect.top, undefined);
  }
  roomPageContext.inlineAskHost.opened({
    nonce: nonce4,
    nodeId: nodeId3,
    rect: nodeId3 && rect ? rect : {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    ...(matchesVia7 && nodeId3 ? {
      docked: true
    } : {})
  });
  if (!reannounce) {
    let accepted: boolean = roomPageContext.inlineAskHost.current()?.nonce === nonce4;
    roomPageContext.createRouteSideRef.current()?.cardOpened({
      nonce: nonce4,
      bid: roomPageContext.data.bid,
      accepted: accepted,
      writeCard: writeCard
    });
    let takeKept: Dynamic = accepted && (writeCard || matchesVia5) && roomPageContext.data.via === `undo` ? roomPageContext.askCardDeskRef.current?.takeKept(nonce4) ?? null : null;
    if (takeKept && matchesVia5 && isCommentSessionFeatureDisabled()) {
      (0, roomPageContext.setInlineAskNotice)(askCardWriteUnavailableMessage(roomPageContext.initialAskCardRecoveryStateRef.current, (0, roomPageContext.askPermission)()));
    }
    if (takeKept) {
      let key2: string = `claude-ask-card:${roomPageContext.askCardSeqRef.current += 1}`;
      let json: Dynamic = resolveDataModelSchemasLabel2();
      let contentItem: Dynamic = json.content?.[0];
      let askOfCardBody: Dynamic = roomPageContext.askCardModRef.current?.askOfCardBody(takeKept.body) ?? ``;
      if (contentItem?.content && askOfCardBody !== ``) {
        let items2: Dynamic = [];
        askOfCardBody.split(`
`).forEach((askOfCardBodyPart?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (index > 0) {
            items2.push({
              type: `hardBreak`
            });
          }
          if (askOfCardBodyPart !== ``) {
            items2.push({
              type: `text`,
              text: (index === 0 ? ` ` : ``) + askOfCardBodyPart
            });
          }
        });
        contentItem.content = [contentItem.content[0], ...items2];
        useCommentStore.getState().stashReplyDraft(key2, null);
        useCommentStore.getState().stashReplyDraft(key2, {
          json: json,
          pageId: roomPageContext.fsEntryId2 ?? ``
        });
        (0, roomPageContext.setAskCardDraft)({
          nonce: nonce4,
          key: key2
        });
        roomPageContext.uniqueItemsRef3.current.add(nonce4);
      }
    }
    let how: Dynamic = roomPageContext.data.how;
    if (accepted && (writeCard || matchesVia6) && typeof how == `string`) {
      resolveCommentSessionHost(`open`, how);
    }
  }
  return {
    value: void 0
  };
}

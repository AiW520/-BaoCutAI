import { React } from "../bootstrap";
import { DocumentRuntime_Message, DocumentRuntime_Message2, resolveDocumentRuntimeError } from "../document-runtime/use-document-runtime-room";
import { COMMENT_DRAFT_BLOCKING_MESSAGE } from "../comment-notifications/create-comment-notice-coordinator";
import { documentSourcePromptLimit400 } from "../room-document-page/state";
import { resolveWidgetBridgeValue4 } from "../widget-bridge/widget-sample-card";

/** BaoCut: room document comments; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  api,
  EditorSelectionAndTablesByFile2,
  EditorSelectionAndTablesByKey,
  frameSampleAvailable,
  frameSampler,
  loadDataOperationControlKind,
  loadPlatformLiveDocumentAndHistoryNodeId,
  PlatformLiveDocumentAndHistoryCreate,
  PlatformLiveDocumentAndHistorySession,
  PlatformLiveDocumentAndHistoryWidgetBundle,
  platformSessionAndSourcesPattern9,
  resolveCommentsEditorIncludes,
  resolveCommentsStoreSource3,
  resolveEditorAnchorsAndMentionsReads,
  resolvePlatformLiveDocumentAndHistoryTest,
  resolvePlatformSessionAndSourcesTest3,
  resolvePlatformSessionAndSourcesTest4,
  resolvePlatformSessionAndSourcesTest5,
  toast,
  useCommentStore,
} from "../../platform/index";
import { isFrameArtifact } from "../../boot/environment";
export function runRoomPage113Memoized4(roomPageContext: {
  lastDataTarget: Dynamic;
  loadHandlers: Dynamic;
  onComment: Dynamic;
  onEscape: Dynamic;
  onReact: Dynamic;
  onRun: Dynamic;
  onViewData: Dynamic;
}): Dynamic {
  return (0, React.useMemo)((..._extraArguments: unknown[]): Dynamic => ({
    loadHandlers: roomPageContext.loadHandlers,
    onRun: roomPageContext.onRun,
    onViewData: roomPageContext.onViewData,
    viewDataFor: roomPageContext.lastDataTarget?.nodeId ?? null,
    onComment: roomPageContext.onComment,
    onReact: roomPageContext.onReact,
    onEscape: roomPageContext.onEscape
  }), [roomPageContext.loadHandlers, roomPageContext.onRun, roomPageContext.onViewData, roomPageContext.lastDataTarget?.nodeId, roomPageContext.onComment, roomPageContext.onReact, roomPageContext.onEscape]);
}
export function runRoomPage114Session(roomPageContext: {
  dirRef: Dynamic;
  room: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  selbarPortRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return {
    ["session"]: async (nodeId2?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]) => {
      let postMessage = (reason2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
        if (!selbarPort) {
          resolveDocumentRuntimeError(reason2);
          return;
        }
        selbarPort.postMessage({
          type: `widget-text-edit-refused`,
          nodeId: nodeId2,
          id: options,
          value: context,
          reason: reason2
        });
      };
      if (roomPageContext.room) {
        try {
          let session3: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(roomPageContext.roomDocumentPageResultRef3.current, nodeId2, dependencies ? `text-draft` : `text`, {
            id: options,
            value: context
          });
          if (!session3.ok) {
            postMessage(session3.reason);
          }
        } catch {
          postMessage(DocumentRuntime_Message);
        }
        return;
      }
      let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
      if (!useDocumentRuntimeFsEntryId4) return postMessage(DocumentRuntime_Message2);
      try {
        let session3: Dynamic = await PlatformLiveDocumentAndHistorySession.session(roomPageContext.dirRef.current, dependencies ? `text-draft` : `text`, {
          ref: `f-${useDocumentRuntimeFsEntryId4}#${nodeId2}`,
          id: options,
          value: context
        });
        if (`error` in session3) {
          postMessage(session3.message || DocumentRuntime_Message2);
        }
      } catch {
        postMessage(DocumentRuntime_Message);
      }
    }
  }["session"];
}
export function runRoomPage115Error(roomPageContext: {
  room: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
}): Dynamic {
  return {
    ["error"]: async (roomDocumentPage?: Dynamic, chartId?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]): Promise<undefined> => {
      if (!roomPageContext.room) {
        toast.info(`Chart titles are editable on room docs — this doc predates rooms.`);
        return;
      }
      try {
        let session3: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(roomPageContext.roomDocumentPageResultRef3.current, roomDocumentPage, dependencies ? `chart-title-draft` : `chart-title`, {
          chartId: chartId,
          value: context
        });
        if (!session3.ok) {
          toast.error(`The title didn't save` + resolvePlatformLiveDocumentAndHistoryTest(session3.reason));
        }
      } catch {
        toast.error(`The edit didn't reach the server — try again.`);
      }
    }
  }["error"];
}
export function runRoomPage116Session2(roomPageContext: {
  room: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  selbarPortRef: Dynamic;
}): Dynamic {
  return {
    ["session2"]: async (nodeId2?: Dynamic, options?: Dynamic, component?: Dynamic, path2?: Dynamic, argument?: Dynamic, basePub?: Dynamic, ..._extraArguments: unknown[]) => {
      let postMessage = (reason2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
        if (!selbarPort) {
          resolveDocumentRuntimeError(reason2);
          return;
        }
        selbarPort.postMessage({
          type: `widget-text-edit-refused`,
          nodeId: nodeId2,
          id: options,
          value: argument ?? ``,
          reason: reason2
        });
      };
      if (!roomPageContext.room) return postMessage(`Chart text is editable on room docs — this doc predates rooms.`);
      try {
        let session3: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(roomPageContext.roomDocumentPageResultRef3.current, nodeId2, `definition`, {
          ...(component === undefined ? {} : {
            component: component
          }),
          path: path2,
          value: argument,
          basePub: basePub
        });
        if (!session3.ok) {
          postMessage(session3.reason);
        }
      } catch {
        postMessage(DocumentRuntime_Message);
      }
    }
  }["session2"];
}
export function runRoomPage117Error2(roomPageContext: {
  enabledRef13: Dynamic;
  onOpenWidgetCodeRef: Dynamic;
  onOpenWidgetPanelRef: Dynamic;
  room: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  selbarPortRef: Dynamic;
  setRecordState: Dynamic;
}): Dynamic {
  return {
    ["error2"]: async (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
      let nodeId2: Dynamic = resolvePlatformSessionAndSourcesTest4(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)());
      if (!nodeId2 || !roomPageContext.enabledRef13.current) return;
      (0, roomPageContext.setRecordState)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2[nodeId2] ? roomDocumentPage2 : {
        ...roomDocumentPage2,
        [nodeId2]: true
      });
      let setRecordState4: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setRecordState)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!roomDocumentPage2[nodeId2]) return roomDocumentPage2;
        let {
          [nodeId2]: roomDocumentPage3,
          ...roomDocumentPage4
        }: Dynamic = roomDocumentPage2;
        return roomDocumentPage4;
      });
      let postMessage: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.selbarPortRef.current?.postMessage({
        type: `widget-republished`,
        nodeId: nodeId2
      });
      let onOpenWidgetPanel5 = (..._extraArguments: unknown[]): undefined => {
        if (roomPageContext.onOpenWidgetCodeRef.current) {
          roomPageContext.onOpenWidgetCodeRef.current(nodeId2);
        } else {
          roomPageContext.onOpenWidgetPanelRef.current?.(nodeId2, `code`);
        }
      };
      if (!roomPageContext.room) {
        setRecordState4();
        return onOpenWidgetPanel5();
      }
      let read: Dynamic = (..._extraArguments: unknown[]): Dynamic => loadDataOperationControlKind({
        kind: `project`,
        id: roomPageContext.room.pid
      }).read({
        object: `node`,
        id: nodeId2
      }, `widget`);
      try {
        let error4: Dynamic;
        try {
          error4 = (await read()) ?? {};
        } catch {
          toast.error(`The block couldn't be read — try reloading the page.`);
          return;
        }
        if (error4.draft != null) {
          toast.info(`This block has an unpublished draft — review it in the code view and publish from there.`);
          return onOpenWidgetPanel5();
        }
        if (typeof error4.code != `string` || typeof error4.pub != `number`) {
          toast.error(`The block couldn't be read — try reloading the page.`);
          return;
        }
        let basePub: Dynamic = error4.pub;
        let session3: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(roomPageContext.roomDocumentPageResultRef3.current, nodeId2, `draft`, {
          code: error4.code,
          basePub: basePub,
          state: `publish`
        });
        if (!session3.ok) {
          toast.error(`The block didn't publish` + resolvePlatformLiveDocumentAndHistoryTest(session3.reason));
          return;
        }
        let roomDocumentPageResult34: Dynamic;
        try {
          roomDocumentPageResult34 = (await read()) ?? undefined;
        } catch {
          roomDocumentPageResult34 = undefined;
        }
        if (roomDocumentPageResult34 && typeof roomDocumentPageResult34.pub == `number` && roomDocumentPageResult34.pub <= basePub) {
          toast.error(`This block's current code no longer passes validation, so it can't be republished as-is — it's staged in the code view with the diagnostics; fix it there and publish.`);
          return onOpenWidgetPanel5();
        }
        postMessage();
      } catch {
        toast.error(`The publish didn't reach the server — try again.`);
      } finally {
        setRecordState4();
      }
    }
  }["error2"];
}
export function runRoomPage118GetState(roomPageContext: {
  recordStateRef: Dynamic;
  roomRef: Dynamic;
  setRecordState2: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return {
    ["getState"]: async (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Promise<undefined> => {
      let recordStateItem: Dynamic = roomPageContext.recordStateRef.current[roomDocumentPage];
      if (!(!recordStateItem?.runId || recordStateItem.checked)) {
        (0, roomPageContext.setRecordState2)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2[roomDocumentPage] ? {
          ...roomDocumentPage2,
          [roomDocumentPage]: {
            ...roomDocumentPage2[roomDocumentPage],
            checked: true
          }
        } : roomDocumentPage2);
        try {
          let status: Dynamic = (await PlatformLiveDocumentAndHistoryWidgetBundle.runsGet(recordStateItem.runId)).status;
          if (status === `error` || status === `cancelled`) {
            (0, roomPageContext.setRecordState2)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2[roomDocumentPage] ? {
              ...roomDocumentPage2,
              [roomDocumentPage]: {
                ...roomDocumentPage2[roomDocumentPage],
                failed: true
              }
            } : roomDocumentPage2);
          } else {
            if (status === `blocked`) {
              (0, roomPageContext.setRecordState2)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2[roomDocumentPage] ? {
                ...roomDocumentPage2,
                [roomDocumentPage]: {
                  ...roomDocumentPage2[roomDocumentPage],
                  blocked: true
                }
              } : roomDocumentPage2);
            }
          }
          if (status && status !== `running`) {
            let fileId4: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
            if (fileId4) {
              EditorSelectionAndTablesByKey.getState().clear(`${fileId4}#${roomDocumentPage}`);
            }
          }
        } catch {}
      }
    }
  }["getState"];
}
export function runRoomPage119SetDraftAnchor(roomPageContext: {
  commentsReadOnlyRef: Dynamic;
  fileIdRef: Dynamic;
  lookupRef8: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return {
    ["setDraftAnchor"]: (nodeId2?: Dynamic, segment?: Dynamic, context?: Dynamic, dependencies?: Dynamic, argument?: Dynamic, words2?: Dynamic, react?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.commentsReadOnlyRef.current) return;
      let storeState: Dynamic = useCommentStore.getState();
      let draftAnchor: Dynamic = storeState.draftAnchor;
      if (react === undefined && segment === `` && draftAnchor && draftAnchor.nodeId === nodeId2 && (draftAnchor.segment ?? ``) === `` && storeState.dirtyEditors.size > 0) return;
      if (react !== undefined && draftAnchor && storeState.dirtyEditors.has(`__compose`)) {
        toast.info(COMMENT_DRAFT_BLOCKING_MESSAGE, {
          id: `react-busy-draft`
        });
        return;
      }
      if (storeState.focusId && storeState.dirtyEditors.size === 0) {
        storeState.setFocus(null);
      }
      let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
      let top2: Dynamic = useDocumentRuntimeFsEntryId4 ? EditorSelectionAndTablesByFile2.getState().byFile[useDocumentRuntimeFsEntryId4]?.[nodeId2]?.top : undefined;
      let bid: Dynamic = roomPageContext.lookupRef8.current.get(nodeId2);
      let record4: Dynamic = {
        nodeId: nodeId2,
        segment: segment,
        vs: Object.keys(context).length ? context : undefined,
        quote: ``,
        prefix: ``,
        suffix: ``,
        nonce: 0,
        ...(bid === undefined ? {} : {
          block: {
            bid: bid
          }
        }),
        ...(platformSessionAndSourcesPattern9.test(nodeId2) ? {
          roomWidget: true
        } : {}),
        ...(argument !== undefined && platformSessionAndSourcesPattern9.test(nodeId2) ? {
          citation: resolveCommentsStoreSource3(argument)
        } : {}),
        ...(words2 !== undefined && platformSessionAndSourcesPattern9.test(nodeId2) ? {
          words: words2
        } : {}),
        ...(top2 === undefined ? {} : {
          boxDy: dependencies - top2
        }),
        ...(react === undefined ? {} : {
          react: react
        })
      };
      storeState.setDraftY(dependencies);
      if (storeState.commentMode === `hidden`) {
        storeState.setCommentMode(`margin`);
      }
      storeState.setDraftAnchor(record4);
    }
  }["setDraftAnchor"];
}
export function runRoomPage120UpdateAmount(roomPageContext: {
  amountRef: Dynamic;
}): Dynamic {
  return {
    ["updateAmount"]: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
      let roomDocumentPageResult34 = resolveCommentsEditorIncludes(roomDocumentPage);
      if (roomDocumentPageResult34 === undefined) return;
      let now = performance.now();
      if (!(now - roomPageContext.amountRef.current < documentSourcePromptLimit400)) {
        roomPageContext.amountRef.current = now;
        return roomDocumentPageResult34;
      }
    }
  }["updateAmount"];
}
export function runRoomPage121Effect(roomPageContext: {
  elementRef66: Dynamic;
  fileIdRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  setDraftAnchor: Dynamic;
  updateAmount: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef66.current = (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let roomDocumentPageResult34: Dynamic = resolvePlatformSessionAndSourcesTest5(roomDocumentPage, (0, roomPageContext.roomDocumentPageHandler3)());
    if (!roomDocumentPageResult34) return;
    let updateAmount2: Dynamic = (0, roomPageContext.updateAmount)(options);
    if (updateAmount2 === undefined) return;
    let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current;
    (0, roomPageContext.setDraftAnchor)(roomDocumentPageResult34, ``, {}, (useDocumentRuntimeFsEntryId4 ? EditorSelectionAndTablesByFile2.getState().byFile[useDocumentRuntimeFsEntryId4]?.[roomDocumentPageResult34]?.top : undefined) ?? 0, undefined, undefined, updateAmount2);
  };
}
export function runRoomPage122Send4(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return {
    ["send4"]: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!contentWindow || roomPageContext.navigatedRef.current) return;
      let record4: Dynamic = {
        type: `widget-create-result`,
        ok: roomDocumentPage
      };
      roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
    }
  }["send4"];
}
export function runRoomPage123Error3(roomPageContext: {
  dirRef: Dynamic;
  element2: Dynamic;
  getStateRef: Dynamic;
  onOpenWidgetPanelRef: Dynamic;
  pathRef2: Dynamic;
  room: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  roomRef: Dynamic;
  selbarPortRef: Dynamic;
  send4: Dynamic;
  setRecordState2: Dynamic;
  uniqueItemsRef8: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return {
    ["error3"]: async (nodeId2?: Dynamic, after?: Dynamic, request?: Dynamic, context: Dynamic = ``, ..._extraArguments: unknown[]): Promise<undefined> => {
      let done: Dynamic = roomPageContext.send4;
      if (roomPageContext.room && (await frameSampler())) {
        roomPageContext.element2.start({
          after: after,
          request: request,
          context: context
        });
        return;
      }
      if (isFrameArtifact()) {
        toast.info(`Building a widget needs Claude for this document, and it isn't available in this view.`);
        done(false);
        return;
      }
      if (roomPageContext.room) {
        await loadPlatformLiveDocumentAndHistoryNodeId({
          intend: roomPageContext.roomDocumentPageResultRef3.current,
          fileId: roomPageContext.room.fileId,
          prompt: request,
          queued: (roomDocumentPage?: Dynamic, runId?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setRecordState2)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            ...roomDocumentPage2,
            [roomDocumentPage]: {
              prompt: request,
              runId: runId,
              queued: true
            }
          })),
          postChip: (nodeId3?: Dynamic, ..._extraArguments: unknown[]) => {
            roomPageContext.uniqueItemsRef8.current.add(nodeId3);
            let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
            if (!selbarPort) return false;
            let record4: Dynamic = {
              type: `widget-chip-insert`,
              nodeId: nodeId3,
              at: {
                after: after
              }
            };
            selbarPort.postMessage(record4);
            return true;
          },
          note: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => toast.info(roomDocumentPage),
          fatal: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => toast.error(roomDocumentPage.startsWith(`The widget couldn't be created`) ? roomDocumentPage : `The widget couldn't be created` + resolvePlatformLiveDocumentAndHistoryTest(roomDocumentPage)),
          done: done,
          openPanel: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            roomPageContext.uniqueItemsRef8.current.add(roomDocumentPage);
            roomPageContext.onOpenWidgetPanelRef.current?.(roomDocumentPage, `log`);
          }
        });
        return;
      }
      try {
        let create2: Dynamic = await PlatformLiveDocumentAndHistorySession.create(roomPageContext.dirRef.current, {
          path: roomPageContext.pathRef2.current,
          prompt: request,
          prose: {
            nodeId: nodeId2,
            at: {
              after: after
            }
          }
        });
        if (`error` in create2) {
          toast.error(create2.message || `The block couldn't be created.`);
          done(false);
          return;
        }
        if (create2.note) {
          toast.info(create2.note);
        }
        (0, roomPageContext.setRecordState2)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          ...roomDocumentPage,
          [create2.nodeId]: {
            prompt: request,
            runId: create2.runId
          }
        }));
        {
          let fileId4: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
          if (fileId4) {
            EditorSelectionAndTablesByKey.getState().mark(`${fileId4}#${create2.nodeId}`);
          }
        }
        setTimeout((..._extraArguments: unknown[]): undefined => void roomPageContext.getStateRef.current(create2.nodeId), 12e4);
        done(true);
        roomPageContext.onOpenWidgetPanelRef.current?.(create2.nodeId, `log`);
      } catch (error4: Dynamic) {
        toast.error(error4 instanceof Error ? error4.message : String(error4));
        done(false);
      }
    }
  }["error3"];
}
export function runRoomPage124Effect(roomPageContext: {
  enabled2: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4 = {
      type: `widget-authoring`,
      on: roomPageContext.enabled2
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.enabled2, roomPageContext.ready]);
}
export function runRoomPage125Effect(roomPageContext: {
  setEnabledState3: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!isFrameArtifact()) return;
    let enabled5 = false;
    frameSampleAvailable().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!enabled5) {
        (0, roomPageContext.setEnabledState3)(result);
      }
    });
    return (..._extraArguments: unknown[]): undefined => {
      enabled5 = true;
    };
  }, []);
}
export function runRoomPage126Effect(roomPageContext: {
  enabledState4: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `widget-sample`,
      on: roomPageContext.enabledState4
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.enabledState4, roomPageContext.ready]);
}
export function runRoomPage127Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  widgetPanelNodeId: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current) return;
    let record4: Dynamic = {
      type: `widget-subject`,
      nodeId: roomPageContext.widgetPanelNodeId ?? null
    };
    roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
  }, [roomPageContext.widgetPanelNodeId, roomPageContext.ready]);
}
export function runRoomPage128Ensure(roomPageContext: {
  countRef5: Dynamic;
  elementRef68: Dynamic;
  navigatedRef: Dynamic;
}): Dynamic {
  return {
    ["ensure"]: (page2?: Dynamic, options?: Dynamic, force: Dynamic = false, ..._extraArguments: unknown[]): Dynamic => {
      let count: Dynamic = roomPageContext.countRef5.current;
      return roomPageContext.elementRef68.current.ensure(resolveWidgetBridgeValue4(page2.fileId, undefined, options), (..._extraArguments: unknown[]): Dynamic => api.v3WidgetMount(page2.pid, page2.fileId, options), {
        force: force,
        live: (..._extraArguments: unknown[]) => count === roomPageContext.countRef5.current && !roomPageContext.navigatedRef.current
      });
    }
  }["ensure"];
}
export function runRoomPage129Effect(roomPageContext: {
  countRef5: Dynamic;
  DocumentRuntimeFreeze2: Dynamic;
  documentRuntimeState2: Dynamic;
  elementRef68: Dynamic;
  ensureRef: Dynamic;
  lookupRef10: Dynamic;
  lookupRef11: Dynamic;
  lookupRef9: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
  recordRef7: Dynamic;
  roomDocumentPageResult23: Dynamic;
  roomRef: Dynamic;
  selbarPortRef: Dynamic;
  useDocumentInteractionOverlays12: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.ready || roomPageContext.navigatedRef.current) {
      roomPageContext.recordRef7.current = {};
      roomPageContext.lookupRef9.current.clear();
      roomPageContext.lookupRef10.current.clear();
      roomPageContext.elementRef68.current?.clear();
      roomPageContext.lookupRef11.current.clear();
      roomPageContext.countRef5.current++;
      {
        let fileId5: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
        if (fileId5 && roomPageContext.documentRuntimeState2 !== undefined) {
          roomPageContext.documentRuntimeState2.then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.forgetStampedAddresses(fileId5), (..._extraArguments: unknown[]): undefined => {});
        }
      }
      return;
    }
    let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
    let fileId4: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
    if (!selbarPort || !fileId4) return;
    let label2 = `${fileId4}#`;
    let uniqueItems: Dynamic = new (Set as Dynamic)([...Object.keys(roomPageContext.DocumentRuntimeFreeze2), ...Object.keys(roomPageContext.roomDocumentPageResult23)].filter((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.startsWith(label2)));
    for (let roomDocumentPageResult34 of uniqueItems as Dynamic) {
      let nodeId2: Dynamic = roomDocumentPageResult34.slice(label2.length);
      if (!resolvePlatformSessionAndSourcesTest3(nodeId2)) continue;
      let render: Dynamic = roomPageContext.DocumentRuntimeFreeze2[roomDocumentPageResult34] === `draft` ? roomPageContext.roomDocumentPageResult23[roomDocumentPageResult34] ?? null : null;
      let nonce4: Dynamic = render ? render.nonce : null;
      if (roomPageContext.recordRef7.current[nodeId2] === nonce4) continue;
      roomPageContext.recordRef7.current[nodeId2] = nonce4;
      let items2: Dynamic = [];
      if (render) {
        let uniqueItems2: Dynamic = new (Set as Dynamic)();
        roomPageContext.lookupRef10.current.set(roomDocumentPageResult34, uniqueItems2);
        for (let roomDocumentPageResult35 of resolveEditorAnchorsAndMentionsReads(render.effects).reads as Dynamic) uniqueItems2.add(roomDocumentPageResult35);
        let embeds: Dynamic = render.embeds;
        if (Array.isArray(embeds)) for (let roomDocumentPageResult35 of embeds as Dynamic) if (roomDocumentPageResult35 && typeof roomDocumentPageResult35.ref == `string`) {
          uniqueItems2.add(roomDocumentPageResult35.ref);
          items2.push(roomDocumentPageResult35.ref);
        }
      } else {
        roomPageContext.lookupRef10.current.delete(roomDocumentPageResult34);
        if (roomPageContext.roomRef.current) {
          roomPageContext.useDocumentInteractionOverlays12.current(`draft:${roomDocumentPageResult34}`, []);
        }
      }
      let record4: Dynamic = {
        type: `widget-draft-render`,
        nodeId: nodeId2,
        render: render
      };
      let room2: Dynamic = roomPageContext.roomRef.current;
      if (render && room2) {
        let count: Dynamic = roomPageContext.countRef5.current;
        let index = 0;
        let useDocumentInteractionOverlays25 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!(count !== roomPageContext.countRef5.current || roomPageContext.navigatedRef.current || roomPageContext.recordRef7.current[nodeId2] !== nonce4)) {
            if (roomDocumentPage?.pending) {
              if (index++ < 3) {
                setTimeout((..._extraArguments: unknown[]): undefined => void roomPageContext.ensureRef.current(room2, nodeId2, true).then(useDocumentInteractionOverlays25), 800);
              }
              return;
            }
            roomPageContext.useDocumentInteractionOverlays12.current(`draft:${roomDocumentPageResult34}`, roomDocumentPage ? items2.filter((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage.grants.has(item)) : []);
          }
        };
        roomPageContext.ensureRef.current(room2, nodeId2, true).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!(count !== roomPageContext.countRef5.current || roomPageContext.navigatedRef.current)) {
            useDocumentInteractionOverlays25(result);
            selbarPort.postMessage(record4);
          }
        });
      } else selbarPort.postMessage(record4);
    }
  }, [roomPageContext.DocumentRuntimeFreeze2, roomPageContext.roomDocumentPageResult23, roomPageContext.ready, roomPageContext.useDocumentRuntimeFsEntryId3, roomPageContext.useDocumentInteractionOverlays12]);
}

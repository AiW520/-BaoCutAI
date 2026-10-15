import { React } from "../bootstrap";
import { isFrameGesturesPhase, resolveFrameGesturesCls, resolveFrameGesturesPending, resolveFrameGesturesRoad } from "../frame/gestures-state-2";
import { isWidgetBridgeWhere } from "../widget-bridge/widget-sample-card";
import { DocumentFrameFrag } from "../document-frame-use-document-frame-key";
import { isFrameGesturesDisplayOn } from "../frame/gestures-state-1";
import { documentScrollKey } from "../ask-cards/document-posture-badge";
import { resolveDocumentLinksSlice } from "../document-links";
import { canReleasePeekFocus, documentDisplayPostState, documentFontsPostState } from "../document-display";
import { runRoomPage10DataVerbReadDataVerbWatch, runRoomPage11DataVerbWidgetInvoke, runRoomPage12DataVerbWidgetWrite, runRoomPage13DataVerbWidgetSource, runRoomPage14DataVerbWidgetVsLoad, runRoomPage15DataVerbWidgetBundle, runRoomPage16DataVerbEditType, runRoomPage17DataVerbNavigate, runRoomPage18DataVerbRun, runRoomPage19DataVerbEnumUpdate, runRoomPage20DataVerbEnumCreate, runRoomPage21DataVerbProjects, runRoomPage22DataVerbRef, runRoomPage23DataVerbObjects } from "./frame-messages-1";
import { runRoomPage24DataVerbPerson, runRoomPage25DataVerbPeople, runRoomPage26DataTypeWidgetVsSave, runRoomPage27DataTypeCommentClick, runRoomPage28DataTypeCommentRects, runRoomPage29DataTypeProofreadReq, runRoomPage30DataTypeCaretPrimed } from "./frame-messages-2";
/** BaoCut: room document frame messages; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  api,
  createPagesWidgetRelayDroppedEvent,
  EditorSelectionAndTablesSelection,
  emitTelemetryEvent,
  frameCurrentAnchor,
  frameEnumRows,
  frameHotTouched,
  frameProfiles,
  frameProfilesSubscribe,
  hiddenResolvedThread,
  installObservabilityTelemetryPagehide,
  loadDataModelSchemasCss,
  loadPlatformApiAndAuthValue,
  loadPlatformRuntimeAndChatMsg,
  ObservabilityBootOptraceSink,
  PlatformApiAndAuthParticipants,
  PlatformApiAndAuthPriming,
  PlatformLiveDocumentAndHistorySession,
  rawReq,
  resolveCommentsActionsAndSelectionFrame,
  resolveCommentsStoreValue27,
  resolveEditorHostKind3,
  resolveEditorSelectionAndTablesValue13,
  resolveObservabilityBootMark,
  resolveObservabilityBootOpen,
  resolveObservabilityTelemetryFailed,
  resolveObservabilityTelemetryReady3,
  resolvePlatformFeatureFlagsValue,
  resolvePlatformKeyboardAndSaveStatusValue2,
  resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild,
  resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed,
  resolvePlatformRuntimeAndChatTheSpellingWordListsAreNotInThisBuild,
  resolvePlatformSessionAndSourcesTab3,
  resolvePlatformSessionAndSourcesTab4,
  resolvePlatformSyncAndRoutingSource,
  toast,
  updateEditorSelectionAndTablesSpellWords,
  updatePlatformSyncAndRoutingDirectory,
  useCommentStore,
} from "../../platform/index";
import {
  isFrameArtifact,
  isFrameOfflineError,
  recordFramePhase,
} from "../../boot/environment";
import {
  readEnumDefinition,
  resolveMentionNames,
  searchTabs,
} from "../references/chips";
export function runRoomPage189Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askPermission: Dynamic;
  askUsageRef: Dynamic;
  askWhyRef: Dynamic;
  collapsedRef: Dynamic;
  containerRef: Dynamic;
  countRef2: Dynamic;
  countRef3: Dynamic;
  countRef5: Dynamic;
  dirRef: Dynamic;
  displayOnRef: Dynamic;
  DocumentSourcePromptState4: Dynamic;
  elementRef12: Dynamic;
  elementRef21: Dynamic;
  elementRef22: Dynamic;
  elementRef23: Dynamic;
  elementRef25: Dynamic;
  elementRef26: Dynamic;
  elementRef27: Dynamic;
  elementRef28: Dynamic;
  elementRef33: Dynamic;
  elementRef34: Dynamic;
  elementRef35: Dynamic;
  elementRef36: Dynamic;
  elementRef40: Dynamic;
  elementRef41: Dynamic;
  elementRef42: Dynamic;
  elementRef46: Dynamic;
  elementRef47: Dynamic;
  elementRef48: Dynamic;
  elementRef50: Dynamic;
  elementRef53: Dynamic;
  elementRef6: Dynamic;
  elementRef62: Dynamic;
  elementRef63: Dynamic;
  elementRef68: Dynamic;
  elementRef69: Dynamic;
  elementRef71: Dynamic;
  elementRef80: Dynamic;
  enabledRef12: Dynamic;
  enabledRef3: Dynamic;
  enabledRef6: Dynamic;
  enabledRef7: Dynamic;
  ensureRef: Dynamic;
  enumEditDialogRef: Dynamic;
  fileIdRef: Dynamic;
  frameMessengerRef: Dynamic;
  getStateRef: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  inlineAskHostLatestRef: Dynamic;
  inlineAskHostRef: Dynamic;
  isDocumentSelectionRandomUUIDRef: Dynamic;
  labelRef: Dynamic;
  labelRef3: Dynamic;
  labelRef4: Dynamic;
  lookupRef11: Dynamic;
  lookupRef3: Dynamic;
  lookupRef4: Dynamic;
  lookupRef5: Dynamic;
  lookupRef6: Dynamic;
  lookupRef7: Dynamic;
  lookupRef8: Dynamic;
  lookupRef9: Dynamic;
  memoized: Dynamic;
  navigatedRef: Dynamic;
  objectFilesRef: Dynamic;
  onClose: Dynamic;
  onFirstHeadingRef: Dynamic;
  onOutlineScrolledRef: Dynamic;
  onTitleCommitRef: Dynamic;
  outlineWantedRef: Dynamic;
  pidRef: Dynamic;
  railSync: Dynamic;
  recordRef2: Dynamic;
  recordRef3: Dynamic;
  recordRef4: Dynamic;
  recordRef5: Dynamic;
  recordStateRef: Dynamic;
  recordStateRef2: Dynamic;
  resetAskStateRef: Dynamic;
  responseRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomDocumentPageHandler5: Dynamic;
  roomDocumentPageResultRef: Dynamic;
  roomDocumentPageResultRef2: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  roomDocumentPageResultRef4: Dynamic;
  roomRef: Dynamic;
  round2: Dynamic;
  saveRef: Dynamic;
  setBlank: Dynamic;
  setBlockContextMenu: Dynamic;
  setEnabledState4: Dynamic;
  setEnumEditDialog: Dynamic;
  setFrameError: Dynamic;
  setFromMention: Dynamic;
  setItemsState: Dynamic;
  setOpenUrl: Dynamic;
  setReady: Dynamic;
  setRecordState3: Dynamic;
  setRunModal: Dynamic;
  tabNamesRef: Dynamic;
  uniqueItemsRef10: Dynamic;
  uniqueItemsRef6: Dynamic;
  uniqueItemsRef7: Dynamic;
  useDocumentInteractionOverlays12: Dynamic;
  useDocumentInteractionOverlays14: Dynamic;
  useDocumentInteractionOverlays15: Dynamic;
  useDocumentInteractionOverlaysRef2: Dynamic;
  useDocumentManifestState2: Dynamic;
  useDocumentManifestStateRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  useFrameGesturesWanted2: Dynamic;
  useWidgetBridgeStickPx6: Dynamic;
  version2: Dynamic;
  wideRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let updateElement: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef46.current ??= loadPlatformApiAndAuthValue(`${roomPageContext.dirRef.current}/.claude/claude.json`).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => JSON.parse(new (TextDecoder as Dynamic)().decode(result))).catch((..._extraArguments: unknown[]): Dynamic => ({}));
    roomPageContext.elementRef48.current = updateElement;
    roomPageContext.elementRef47.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.elementRef46.current = null;
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!contentWindow || roomPageContext.navigatedRef.current)) for (let [roomDocumentPageResult35, roomDocumentPageResult36] of roomPageContext.useDocumentManifestState2.typeWatchEntries() as Dynamic) if (!(roomDocumentPageResult36 !== roomDocumentPage && roomDocumentPageResult36 !== ``)) {
        (roomDocumentPageResult36 === `` ? updateElement().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.types ?? {}) : readEnumDefinition(updateElement, roomDocumentPageResult36)).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!(roomPageContext.navigatedRef.current || !roomPageContext.useDocumentManifestState2.hasTypeWatch(roomDocumentPageResult35))) {
            roomPageContext.frameMessengerRef.current.send(contentWindow, {
              type: `bridge-reply`,
              id: roomDocumentPageResult35,
              ok: true,
              value: result
            });
          }
        }, (..._extraArguments: unknown[]): undefined => {});
      }
    };
    let frameMessenger: Dynamic = roomPageContext.frameMessengerRef.current;
    let reset = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.navigatedRef.current = true;
      frameMessenger.drop();
      roomPageContext.useDocumentManifestState2.clearAll();
      (0, roomPageContext.setReady)(false);
      roomPageContext.elementRef50.current?.release();
      if (roomPageContext.roomRef.current) {
        EditorSelectionAndTablesSelection.getState().clear(roomPageContext.roomRef.current.fileId);
      }
      roomPageContext.elementRef12.current?.dispose();
      roomPageContext.resetAskStateRef.current();
      roomPageContext.inlineAskHostRef.current?.reset();
      (0, roomPageContext.onClose)();
      (0, roomPageContext.setFrameError)(`iframe navigated away — refusing to re-mount (close & reopen the file)`);
      resolveObservabilityTelemetryFailed(roomDocumentPage);
    };
    roomPageContext.elementRef27.current = reset;
    roomPageContext.elementRef25.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let source: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!source || roomPageContext.navigatedRef.current)) {
        unwatch({
          data: roomDocumentPage,
          source: source
        }, `port`);
      }
    };
    roomPageContext.elementRef26.current = (..._extraArguments: unknown[]): undefined => {
      if (!roomPageContext.navigatedRef.current) {
        resolveFrameGesturesCls({
          where: `mount`,
          cls: `TimeoutError`,
          road: `host`
        });
        reset(roomPageContext.iframeRef.current?.contentWindow);
      }
    };
    let unwatch: Dynamic = (roomDocumentPage?: Dynamic, options: Dynamic = `window`, ..._extraArguments: unknown[]): Dynamic => {
      let win: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!win || roomDocumentPage.source !== win || roomPageContext.navigatedRef.current) return;
      let data: Dynamic = roomDocumentPage.data;
      if (!data || typeof data != `object`) return;
      let roomDocumentPageResult35: Dynamic = resolvePlatformSyncAndRoutingSource(roomDocumentPage, win);
      if (roomDocumentPageResult35 !== null) {
        resolveCommentsStoreValue27(roomDocumentPageResult35);
        installObservabilityTelemetryPagehide(roomDocumentPageResult35, `iframe`);
        return;
      }
      if (!(options === `window` && typeof data.type == `string` && !roomPageContext.frameMessengerRef.current.admitsOnWindow(data.type))) {
        if (data.type === `lfile-port-live`) {
          roomPageContext.frameMessengerRef.current.live();
          return;
        }
        if (data.type === `lfile-unload`) {
          reset(win);
          return;
        }
        if (data.type === `lfile-prelude-ready`) {
          if (roomPageContext.elementRef23.current.preludeReady()) {
            roomPageContext.elementRef28.current();
          }
          return;
        }
        if (data.type === `lfile-ready`) {
          recordFramePhase(`runtimeReady`);
          (0, roomPageContext.setReady)(true);
          resolveObservabilityTelemetryReady3(win);
          (0, roomPageContext.setEnabledState4)(false);
          return;
        }
        if (data.type === `first-frame`) {
          resolveObservabilityBootOpen(data.t);
          return;
        }
        if (data.type === `need-mermaid`) {
          resolvePlatformRuntimeAndChatMermaidLibraryLoadFailed().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `mermaid-lib`,
                js: result
              });
            }
          }).catch((..._extraArguments: unknown[]): undefined => {
            (console as Dynamic).warn(`[mermaid] library load failed`);
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `mermaid-lib-failed`
              });
            }
          });
          return;
        }
        if (data.type === `need-extras`) {
          resolvePlatformRuntimeAndChatLfileExtrasAreNotInThisBuild().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `extras-lib`,
                js: result
              });
            }
          }).catch((..._extraArguments: unknown[]): undefined => {
            (console as Dynamic).warn(`[extras] runtime-extras chunk load failed`);
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `extras-lib-failed`
              });
            }
          });
          return;
        }
        if (data.type === `need-spell-words`) {
          resolvePlatformRuntimeAndChatTheSpellingWordListsAreNotInThisBuild().then((text?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `spell-words`,
                text: text
              });
            }
          }).catch((..._extraArguments: unknown[]): undefined => {
            (console as Dynamic).warn(`[spellcheck] word lists load failed`);
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(win, {
                type: `spell-words-failed`
              });
            }
          });
          return;
        }
        if (data.type === `typeahead-open`) {
          (0, roomPageContext.setEnabledState4)(data.open);
          return;
        }
        if (data.type === `caret-primed`) {
          const roomPageResult = runRoomPage30DataTypeCaretPrimed({
            get data() {
              return data;
            },
            get elementRef21() {
              return roomPageContext.elementRef21;
            },
            get elementRef22() {
              return roomPageContext.elementRef22;
            },
            get elementRef6() {
              return roomPageContext.elementRef6;
            },
            get enabledRef3() {
              return roomPageContext.enabledRef3;
            },
            get enabledRef7() {
              return roomPageContext.enabledRef7;
            },
            get fileIdRef() {
              return roomPageContext.fileIdRef;
            },
            get frameMessengerRef() {
              return roomPageContext.frameMessengerRef;
            },
            get iframeRef() {
              return roomPageContext.iframeRef;
            },
            get isDocumentSelectionRandomUUIDRef() {
              return roomPageContext.isDocumentSelectionRandomUUIDRef;
            },
            get navigatedRef() {
              return roomPageContext.navigatedRef;
            },
            get pidRef() {
              return roomPageContext.pidRef;
            },
            get responseRef() {
              return roomPageContext.responseRef;
            },
            get win() {
              return win;
            }
          });
          if (roomPageResult) return roomPageResult.value;
        }
        if (data.type === `manualScroll`) {
          PlatformApiAndAuthParticipants.getState().follow(null);
          return;
        }
        if (data.type === `lfile-error`) {
          (0, roomPageContext.setFrameError)(typeof data.message == `string` ? data.message : String(data.message));
          isWidgetBridgeWhere(data, win);
          return;
        }
        if (data.type === `lfile-crash`) {
          resolveFrameGesturesRoad(data, win, undefined, resolveFrameGesturesPending(roomPageContext.saveRef.current));
          return;
        }
        if (data.type === `widget-fault`) {
          isFrameGesturesPhase(data, win);
          return;
        }
        if (data.type === `write-integrity`) {
          roomPageContext.useDocumentInteractionOverlays14.current(data);
          return;
        }
        if (data.type === `comment-unanchored`) {
          if (!Array.isArray(data.ids)) return;
          let filteredIds: Dynamic = data.ids.filter((id2?: Dynamic, ..._extraArguments: unknown[]) => typeof id2 == `string`);
          let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
          if (!filteredIds.length || !useDocumentRuntimeFsEntryId4) return;
          api.comments.list(roomPageContext.containerRef.current, useDocumentRuntimeFsEntryId4, true).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let uniqueItems: Dynamic = new (Set as Dynamic)(result.map((result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result2.id));
            for (let roomDocumentPageResult36 of filteredIds as Dynamic) if (uniqueItems.has(roomDocumentPageResult36)) {
              api.comments.unanchor(roomDocumentPageResult36).catch((..._extraArguments: unknown[]): Dynamic => (console as Dynamic).warn(`[comments] unanchor failed`));
            }
          }).catch((..._extraArguments: unknown[]): Dynamic => (console as Dynamic).warn(`[comments] unanchor clamp fetch failed`));
          return;
        }
        if (data.type === `widget-delete-refused`) {
          toast.error(`Couldn't delete the widget — try again.`);
          return;
        }
        if (data.type === `anchor-judged`) {
          DocumentFrameFrag.judged(data.frag);
          return;
        }
        if (data.type === `anchor-landed`) {
          let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTab3(data, roomPageContext.fileIdRef.current);
          if (roomDocumentPageResult36 !== null) {
            frameCurrentAnchor(roomDocumentPageResult36);
          }
          return;
        }
        if (data.type === `collapsed-headings`) {
          let room2: Dynamic = roomPageContext.roomRef.current;
          isFrameGesturesDisplayOn({
            displayOn: roomPageContext.displayOnRef.current,
            filmed: roomPageContext.roomDocumentPageResultRef.current,
            key: room2 ? documentScrollKey(room2.pid, room2.fileId) : null
          }, data.ids);
          return;
        }
        if (data.type === `outline` || data.type === `outline-at`) {
          roomPageContext.useFrameGesturesWanted2.heard(data);
          return;
        }
        if (data.type === `caret-heading`) {
          let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTab4(data, roomPageContext.fileIdRef.current);
          if (roomDocumentPageResult36 !== null) {
            frameCurrentAnchor(roomDocumentPageResult36);
          }
          return;
        }
        if (data.type === `anchor-miss`) {
          let documentLinksSlice: Dynamic = resolveDocumentLinksSlice(data.frag);
          if (documentLinksSlice) {
            toast.info(documentLinksSlice, {
              id: `anchor-miss`
            });
          }
          return;
        }
        if (data.type === `spell-dict-add`) {
          if (typeof data.word == `string` && resolveEditorSelectionAndTablesValue13().length < 500) {
            updateEditorSelectionAndTablesSpellWords(data.word);
          }
          return;
        }
        if (data.type === `proofread-req`) {
          const roomPageResult = runRoomPage29DataTypeProofreadReq({
            get data() {
              return data;
            },
            get elementRef69() {
              return roomPageContext.elementRef69;
            },
            get elementRef71() {
              return roomPageContext.elementRef71;
            },
            get enabledRef7() {
              return roomPageContext.enabledRef7;
            },
            get frameMessengerRef() {
              return roomPageContext.frameMessengerRef;
            },
            get iframeRef() {
              return roomPageContext.iframeRef;
            },
            get navigatedRef() {
              return roomPageContext.navigatedRef;
            },
            get responseRef() {
              return roomPageContext.responseRef;
            },
            get uniqueItemsRef10() {
              return roomPageContext.uniqueItemsRef10;
            },
            get win() {
              return win;
            }
          });
          if (roomPageResult) return roomPageResult.value;
        }
        if (data.type === `proofread-check-done`) {
          roomPageContext.elementRef69.current = null;
          let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
          if (contentWindow && !roomPageContext.navigatedRef.current) {
            (0, roomPageContext.version2)(contentWindow);
          }
          let trunc: number = typeof data.fixed == `number` && Number.isFinite(data.fixed) && data.fixed >= 0 ? Math.trunc(data.fixed) : 0;
          let trunc2: number = typeof data.remaining == `number` && Number.isFinite(data.remaining) && data.remaining >= 0 ? Math.trunc(data.remaining) : 0;
          let label2: string = trunc === 0 && trunc2 === 0 ? `No issues found` : `Fixed ${trunc} issue${trunc === 1 ? `` : `s`} · ${trunc2} suggestion${trunc2 === 1 ? `` : `s`} remain`;
          toast(data.failed === true ? `Couldn't check spelling and grammar with Claude right now` : data.short === true ? `${label2} — some very long passages were skipped` : trunc === 0 && trunc2 === 0 ? `No issues found` : `Fixed ${trunc} issue${trunc === 1 ? `` : `s`} · ${trunc2} suggestion${trunc2 === 1 ? `` : `s`} remain`, {
            id: `proofread-check`,
            duration: 5e3
          });
          return;
        }
        if (data.type === `doc-scroll`) {
          if (typeof data.y == `number`) {
            roomPageContext.railSync.scroll(data.y);
            roomPageContext.memoized.scroll(data.y);
            if (roomPageContext.elementRef42.current && Number.isFinite(data.y) && data.y >= 0) {
              (0, roomPageContext.useWidgetBridgeStickPx6)(data.y);
            }
          }
          if (data.user === true && roomPageContext.outlineWantedRef.current) {
            roomPageContext.onOutlineScrolledRef.current?.(`person`);
          }
          roomPageContext.elementRef50.current?.docAt(data.y);
          resolvePlatformFeatureFlagsValue(`scroll`);
          if (data.user === true) {
            frameHotTouched();
          }
          return;
        }
        if (data.type === `comment-rects`) {
          const roomPageResult = runRoomPage28DataTypeCommentRects({
            get countRef3() {
              return roomPageContext.countRef3;
            },
            get data() {
              return data;
            },
            get displayOnRef() {
              return roomPageContext.displayOnRef;
            },
            get elementRef40() {
              return roomPageContext.elementRef40;
            },
            get elementRef41() {
              return roomPageContext.elementRef41;
            },
            get elementRef80() {
              return roomPageContext.elementRef80;
            },
            get enabledRef6() {
              return roomPageContext.enabledRef6;
            },
            get fileIdRef() {
              return roomPageContext.fileIdRef;
            },
            get getStateRef() {
              return roomPageContext.getStateRef;
            },
            get iframeRef() {
              return roomPageContext.iframeRef;
            },
            get inlineAskHost() {
              return roomPageContext.inlineAskHost;
            },
            get labelRef3() {
              return roomPageContext.labelRef3;
            },
            get labelRef4() {
              return roomPageContext.labelRef4;
            },
            get lookupRef8() {
              return roomPageContext.lookupRef8;
            },
            get memoized() {
              return roomPageContext.memoized;
            },
            get railSync() {
              return roomPageContext.railSync;
            },
            get recordStateRef() {
              return roomPageContext.recordStateRef;
            },
            get recordStateRef2() {
              return roomPageContext.recordStateRef2;
            },
            get roomDocumentPage() {
              return roomDocumentPage;
            },
            get roomRef() {
              return roomPageContext.roomRef;
            },
            get round2() {
              return roomPageContext.round2;
            },
            get setBlockContextMenu() {
              return roomPageContext.setBlockContextMenu;
            },
            get setItemsState() {
              return roomPageContext.setItemsState;
            },
            get setRecordState3() {
              return roomPageContext.setRecordState3;
            },
            get useDocumentRuntimeFsEntryId3() {
              return roomPageContext.useDocumentRuntimeFsEntryId3;
            }
          });
          if (roomPageResult) return roomPageResult.value;
        }
        if (data.type === `comment-click`) {
          const roomPageResult = runRoomPage27DataTypeCommentClick({
            get collapsedRef() {
              return roomPageContext.collapsedRef;
            },
            get data() {
              return data;
            },
            get DocumentSourcePromptState4() {
              return roomPageContext.DocumentSourcePromptState4;
            },
            get elementRef62() {
              return roomPageContext.elementRef62;
            },
            get elementRef63() {
              return roomPageContext.elementRef63;
            },
            get iframeRef() {
              return roomPageContext.iframeRef;
            },
            get wideRef() {
              return roomPageContext.wideRef;
            }
          });
          if (roomPageResult) return roomPageResult.value;
        }
        if (data.type === `doc-blank`) {
          if (typeof data.blank == `boolean`) {
            (0, roomPageContext.setBlank)(data.blank);
          }
          return;
        }
        if (data.type === `doc-typing`) {
          resolvePlatformKeyboardAndSaveStatusValue2();
          if (roomPageContext.askWhyRef.current?.current()) {
            roomPageContext.inlineAskHostLatestRef.current(`typing`, false);
          }
          roomPageContext.elementRef63.current = null;
          roomPageContext.elementRef62.current = null;
          let storeState: Dynamic = useCommentStore.getState();
          if (canReleasePeekFocus({
            peekSurface: roomPageContext.collapsedRef.current && storeState.commentMode !== `list`,
            focusId: storeState.focusId,
            draftAnchor: storeState.draftAnchor,
            dirtyCount: storeState.dirtyEditors.size
          })) {
            storeState.setFocus(null);
          }
          return;
        }
        if (data.type === `comment-hover`) {
          let id2: Dynamic = typeof data.id == `string` ? data.id : null;
          useCommentStore.getState().setActive(id2 && hiddenResolvedThread(id2, useCommentStore.getState()) ? null : id2);
          return;
        }
        if (data.type === `widget-log`) {
          if (roomPageContext.roomDocumentPageResultRef.current) return;
          let record4: Dynamic = roomPageContext.recordRef5.current;
          let now: number = Date.now();
          if (now - record4.start > 6e4) {
            record4.start = now;
            record4.n = 0;
          }
          let label2: string = data.level === `error` ? `error` : `warn`;
          let messageSlice: Dynamic = typeof data.message == `string` ? data.message.slice(0, 2e3) : ``;
          let nodeIdSlice: Dynamic = typeof data.nodeId == `string` ? data.nodeId.slice(0, 64) : ``;
          let label3: string = `${nodeIdSlice}|${label2}|${messageSlice}`;
          if (messageSlice && label3 !== record4.last && record4.n < 30) {
            record4.n++;
            record4.last = label3;
            PlatformLiveDocumentAndHistorySession.log(roomPageContext.containerRef.current, nodeIdSlice, label2, messageSlice).catch((error4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (isFrameOfflineError(error4)) {
                let roomDocumentPageResult36: Dynamic = createPagesWidgetRelayDroppedEvent();
                if (roomDocumentPageResult36 !== null) {
                  emitTelemetryEvent(roomDocumentPageResult36);
                }
              }
            });
          }
          return;
        }
        if (data.type === `widget-reread`) {
          let nodeIdSlice: Dynamic = typeof data.nodeId == `string` ? data.nodeId.slice(0, 64) : ``;
          if (nodeIdSlice && roomPageContext.roomRef.current) {
            roomPageContext.useDocumentInteractionOverlays15.current(nodeIdSlice);
          }
          return;
        }
        if (data.type === `widget-vs-save`) {
          const roomPageResult = runRoomPage26DataTypeWidgetVsSave({
            get data() {
              return data;
            },
            get recordRef2() {
              return roomPageContext.recordRef2;
            },
            get roomDocumentPageResultRef() {
              return roomPageContext.roomDocumentPageResultRef;
            },
            get useDocumentRuntimeFsEntryId3() {
              return roomPageContext.useDocumentRuntimeFsEntryId3;
            }
          });
          if (roomPageResult) return roomPageResult.value;
        }
        if (data.type === `title-commit`) {
          let title3: Dynamic = typeof data.title == `string` ? data.title : ``;
          let was: Dynamic = typeof data.was == `string` ? data.was : undefined;
          if (title3) {
            roomPageContext.onTitleCommitRef.current?.(title3, was);
          }
          return;
        }
        if (data.type === `title-first-heading`) {
          let title3: Dynamic = typeof data.title == `string` ? data.title : ``;
          if (title3) {
            roomPageContext.onFirstHeadingRef.current?.(title3);
          }
          return;
        }
        if (data.type === `bridge-call`) {
          let roomDocumentPageHandler6: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (roomDocumentPage3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let win2: Dynamic = win;
            if (!(!win2 || roomPageContext.navigatedRef.current)) {
              roomPageContext.frameMessengerRef.current.send(win2, {
                type: `bridge-reply`,
                id: roomDocumentPage2,
                ok: true,
                value: roomDocumentPage3
              });
            }
          };
          if (data.verb === `people`) {
            const roomPageResult = runRoomPage25DataVerbPeople({
              get askCardDeskRef() {
                return roomPageContext.askCardDeskRef;
              },
              get AskCardFaceRef() {
                return roomPageContext.AskCardFaceRef;
              },
              get askPermission() {
                return roomPageContext.askPermission;
              },
              get askUsageRef() {
                return roomPageContext.askUsageRef;
              },
              get countRef2() {
                return roomPageContext.countRef2;
              },
              get data() {
                return data;
              },
              get elementRef34() {
                return roomPageContext.elementRef34;
              },
              get enabledRef12() {
                return roomPageContext.enabledRef12;
              },
              get enabledRef7() {
                return roomPageContext.enabledRef7;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get lookupRef3() {
                return roomPageContext.lookupRef3;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get responseRef() {
                return roomPageContext.responseRef;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `profiles`) {
            let uniqueItems: Dynamic = roomPageContext.uniqueItemsRef6.current;
            let roomDocumentPageHandler7: Dynamic = roomDocumentPageHandler6(data.id);
            resolveMentionNames(data.ids, uniqueItems, isFrameArtifact() ? frameProfiles : null).then((names?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (roomPageContext.uniqueItemsRef6.current === uniqueItems) {
                roomDocumentPageHandler7({
                  names: names
                });
              }
            });
            return;
          }
          if (data.verb === `person`) {
            const roomPageResult = runRoomPage24DataVerbPerson({
              get data() {
                return data;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get lookupRef3() {
                return roomPageContext.lookupRef3;
              },
              get lookupRef4() {
                return roomPageContext.lookupRef4;
              },
              get lookupRef5() {
                return roomPageContext.lookupRef5;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get uniqueItemsRef7() {
                return roomPageContext.uniqueItemsRef7;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `objects`) {
            const roomPageResult = runRoomPage23DataVerbObjects({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get elementRef35() {
                return roomPageContext.elementRef35;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get objectFilesRef() {
                return roomPageContext.objectFilesRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          let readAck: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let lookup: Dynamic = roomPageContext.lookupRef6.current;
            let lookupEntry: Dynamic = lookup.get(roomDocumentPage2);
            let now: number = Date.now();
            if (lookupEntry && now - lookupEntry.at < 3e4) return lookupEntry.ack;
            let ack: Dynamic = resolveCommentsActionsAndSelectionFrame(roomDocumentPage2);
            lookup.set(roomDocumentPage2, {
              at: now,
              ack: ack
            });
            ack.catch((..._extraArguments: unknown[]): undefined => {
              if (lookup.get(roomDocumentPage2)?.ack === ack) {
                lookup.delete(roomDocumentPage2);
              }
            });
            return ack;
          };
          if (data.verb === `ref`) {
            const roomPageResult = runRoomPage22DataVerbRef({
              get data() {
                return data;
              },
              get fileIdRef() {
                return roomPageContext.fileIdRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get readAck() {
                return readAck;
              },
              get roomDocumentPageHandler6() {
                return roomDocumentPageHandler6;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `tabs`) {
            let textSlice: string = String(data.pid ?? ``).slice(0, 256);
            let qSlice: Dynamic = (typeof data.q == `string` ? data.q : ``).slice(0, 64);
            let roomDocumentPageHandler7: Dynamic = roomDocumentPageHandler6(data.id);
            let roomDocumentPageHandler8: Dynamic = (hits?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler7({
              hits: hits
            });
            if (textSlice.length === 0 || !/^[A-Za-z0-9][A-Za-z0-9-]{0,127}$/.test(textSlice)) {
              roomDocumentPageHandler8([]);
              return;
            }
            (async (..._extraArguments: unknown[]): Promise<undefined> => {
              try {
                let ack: Dynamic = await readAck(textSlice);
                if (ack.verdict !== `allow` || ack.value === undefined) {
                  roomDocumentPageHandler8([]);
                  return;
                }
                roomDocumentPageHandler8(searchTabs(updatePlatformSyncAndRoutingDirectory(ack.value), qSlice));
              } catch {
                roomDocumentPageHandler8([]);
              }
            })();
            return;
          }
          if (data.verb === `projects`) {
            const roomPageResult = runRoomPage21DataVerbProjects({
              get data() {
                return data;
              },
              get elementRef36() {
                return roomPageContext.elementRef36;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `enums`) {
            let roomDocumentPageHandler7: Dynamic = roomDocumentPageHandler6(data.id);
            let roomDocumentPageHandler8: Dynamic = (rows?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler7({
              rows: rows
            });
            let roomDocumentPageHandler9: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler7(null);
            let pid2: Dynamic = roomPageContext.pidRef.current;
            if (!pid2) return roomDocumentPageHandler9();
            if (isFrameArtifact()) {
              frameEnumRows(pid2).then(roomDocumentPageHandler8, roomDocumentPageHandler9);
              return;
            }
            rawReq(`GET`, `/api/v3/project/${encodeURIComponent(pid2)}/enums`).then(async (response2?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => {
              if (!response2.ok) return roomDocumentPageHandler9();
              let json: Dynamic = await response2.json();
              roomDocumentPageHandler8(Array.isArray(json.rows) ? json.rows : []);
            }).catch(roomDocumentPageHandler9);
            return;
          }
          if (data.verb === `enumCreate`) {
            const roomPageResult = runRoomPage20DataVerbEnumCreate({
              get data() {
                return data;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get roomDocumentPageHandler6() {
                return roomDocumentPageHandler6;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `enumUpdate`) {
            const roomPageResult = runRoomPage19DataVerbEnumUpdate({
              get data() {
                return data;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get roomDocumentPageHandler6() {
                return roomDocumentPageHandler6;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          let id2: Dynamic = Number.isFinite(data.id) ? data.id : -1;
          let reply = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let win2: Dynamic = win;
            if (!(!win2 || roomPageContext.navigatedRef.current)) {
              roomPageContext.frameMessengerRef.current.send(win2, {
                type: `bridge-reply`,
                id: id2,
                ...roomDocumentPage2
              });
            }
          };
          if (data.verb === `run`) {
            const roomPageResult = runRoomPage18DataVerbRun({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get reply() {
                return reply;
              },
              get roomDocumentPageResultRef2() {
                return roomPageContext.roomDocumentPageResultRef2;
              },
              get roomDocumentPageResultRef3() {
                return roomPageContext.roomDocumentPageResultRef3;
              },
              get roomDocumentPageResultRef4() {
                return roomPageContext.roomDocumentPageResultRef4;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `navigate`) {
            const roomPageResult = runRoomPage17DataVerbNavigate({
              get data() {
                return data;
              },
              get enabledRef3() {
                return roomPageContext.enabledRef3;
              },
              get fileIdRef() {
                return roomPageContext.fileIdRef;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get recordRef3() {
                return roomPageContext.recordRef3;
              },
              get roomDocumentPageResultRef() {
                return roomPageContext.roomDocumentPageResultRef;
              },
              get setFromMention() {
                return roomPageContext.setFromMention;
              },
              get setOpenUrl() {
                return roomPageContext.setOpenUrl;
              },
              get setRunModal() {
                return roomPageContext.setRunModal;
              },
              get tabNamesRef() {
                return roomPageContext.tabNamesRef;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `editType`) {
            const roomPageResult = runRoomPage16DataVerbEditType({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get enumEditDialogRef() {
                return roomPageContext.enumEditDialogRef;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get recordRef4() {
                return roomPageContext.recordRef4;
              },
              get setEnumEditDialog() {
                return roomPageContext.setEnumEditDialog;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `widget-bundle`) {
            const roomPageResult = runRoomPage15DataVerbWidgetBundle({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get countRef5() {
                return roomPageContext.countRef5;
              },
              get data() {
                return data;
              },
              get ensureRef() {
                return roomPageContext.ensureRef;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get lookupRef11() {
                return roomPageContext.lookupRef11;
              },
              get lookupRef9() {
                return roomPageContext.lookupRef9;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get roomDocumentPageHandler3() {
                return roomPageContext.roomDocumentPageHandler3;
              },
              get roomRef() {
                return roomPageContext.roomRef;
              },
              get useDocumentInteractionOverlays12() {
                return roomPageContext.useDocumentInteractionOverlays12;
              },
              get useDocumentRuntimeFsEntryId3() {
                return roomPageContext.useDocumentRuntimeFsEntryId3;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `widget-vs-load`) {
            const roomPageResult = runRoomPage14DataVerbWidgetVsLoad({
              get data() {
                return data;
              },
              get elementRef33() {
                return roomPageContext.elementRef33;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get roomDocumentPageResultRef() {
                return roomPageContext.roomDocumentPageResultRef;
              },
              get useDocumentRuntimeFsEntryId3() {
                return roomPageContext.useDocumentRuntimeFsEntryId3;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `widget-source`) {
            const roomPageResult = runRoomPage13DataVerbWidgetSource({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get ensureRef() {
                return roomPageContext.ensureRef;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get roomDocumentPageHandler3() {
                return roomPageContext.roomDocumentPageHandler3;
              },
              get roomDocumentPageHandler5() {
                return roomPageContext.roomDocumentPageHandler5;
              },
              get roomRef() {
                return roomPageContext.roomRef;
              },
              get updateElement() {
                return updateElement;
              },
              get useDocumentRuntimeFsEntryId3() {
                return roomPageContext.useDocumentRuntimeFsEntryId3;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `widget-write`) {
            const roomPageResult = runRoomPage12DataVerbWidgetWrite({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get roomRef() {
                return roomPageContext.roomRef;
              },
              get useDocumentRuntimeFsEntryId3() {
                return roomPageContext.useDocumentRuntimeFsEntryId3;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `widget-invoke`) {
            const roomPageResult = runRoomPage11DataVerbWidgetInvoke({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get iframeRef() {
                return roomPageContext.iframeRef;
              },
              get labelRef() {
                return roomPageContext.labelRef;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get useDocumentRuntimeFsEntryId3() {
                return roomPageContext.useDocumentRuntimeFsEntryId3;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          if (data.verb === `write`) {
            reply({
              ok: false,
              error: `not-allowed: the in-file write facade was removed`
            });
            return;
          }
          if (data.verb === `read` || data.verb === `watch`) {
            const roomPageResult = runRoomPage10DataVerbReadDataVerbWatch({
              get containerRef() {
                return roomPageContext.containerRef;
              },
              get data() {
                return data;
              },
              get elementRef53() {
                return roomPageContext.elementRef53;
              },
              get elementRef68() {
                return roomPageContext.elementRef68;
              },
              get frameMessengerRef() {
                return roomPageContext.frameMessengerRef;
              },
              get id2() {
                return id2;
              },
              get lookupRef7() {
                return roomPageContext.lookupRef7;
              },
              get navigatedRef() {
                return roomPageContext.navigatedRef;
              },
              get pidRef() {
                return roomPageContext.pidRef;
              },
              get reply() {
                return reply;
              },
              get roomRef() {
                return roomPageContext.roomRef;
              },
              get updateElement() {
                return updateElement;
              },
              get useDocumentInteractionOverlaysRef2() {
                return roomPageContext.useDocumentInteractionOverlaysRef2;
              },
              get useDocumentManifestState2() {
                return roomPageContext.useDocumentManifestState2;
              },
              get win() {
                return win;
              }
            });
            if (roomPageResult) return roomPageResult.value;
          }
          roomPageContext.frameMessengerRef.current.send(win, {
            type: `bridge-reply`,
            id: id2,
            ok: false,
            error: `not-allowed: unknown bridge verb`
          });
          return;
        }
        if (data.type === `bridge-unwatch` && Number.isFinite(data.id)) {
          let id2: Dynamic = data.id;
          roomPageContext.useDocumentManifestState2.unwatch(id2);
          roomPageContext.lookupRef7.current.delete(id2);
        }
      }
    };
    (window as Dynamic).addEventListener(`message`, unwatch);
    roomPageContext.elementRef41.current = (..._extraArguments: unknown[]): undefined => {
      let element4: Dynamic = roomPageContext.elementRef40.current;
      if (element4) {
        clearTimeout(element4.timer);
        roomPageContext.elementRef40.current = null;
        roomPageContext.enabledRef6.current = true;
        try {
          unwatch(element4.ev, `flush`);
        } finally {
          roomPageContext.enabledRef6.current = false;
        }
      }
    };
    let frameMessenger2 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      resolveCommentsStoreValue27(roomDocumentPage);
      installObservabilityTelemetryPagehide(roomDocumentPage, `host`);
      let Optrace: Dynamic = (window as Dynamic).__optrace;
      if (typeof Optrace == `function`) {
        Optrace(roomDocumentPage);
      }
    };
    let window2: Dynamic = window;
    window2[ObservabilityBootOptraceSink] = frameMessenger2;
    let subscribe: Dynamic = PlatformApiAndAuthPriming.subscribe((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (roomDocumentPage.photoData === options.photoData) return;
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!contentWindow || roomPageContext.navigatedRef.current)) {
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `people-settled`
        });
      }
    });
    let enabled5: boolean = false;
    let roomDocumentPageResult34: Dynamic = frameProfilesSubscribe((..._extraArguments: unknown[]): undefined => {
      if (!enabled5) {
        enabled5 = true;
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          enabled5 = false;
          let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
          if (!(!contentWindow || roomPageContext.navigatedRef.current)) {
            roomPageContext.frameMessengerRef.current.send(contentWindow, {
              type: `profiles-changed`
            });
          }
        });
      }
    });
    return (..._extraArguments: unknown[]): undefined => {
      (window as Dynamic).removeEventListener(`message`, unwatch);
      frameMessenger.drop();
      roomPageContext.elementRef41.current = null;
      if (roomPageContext.elementRef40.current) {
        clearTimeout(roomPageContext.elementRef40.current.timer);
      }
      roomPageContext.elementRef40.current = null;
      roomPageContext.elementRef21.current?.();
      roomPageContext.elementRef21.current = null;
      roomPageContext.elementRef22.current?.();
      roomPageContext.elementRef22.current = null;
      if (window2.__optrace_sink === frameMessenger2) {
        delete window2[ObservabilityBootOptraceSink];
      }
      subscribe();
      roomDocumentPageResult34();
      roomPageContext.useDocumentManifestStateRef.current.clearAll();
    };
  }, []);
}
export function runRoomPage190Send8(roomPageContext: {
  enabledRef11: Dynamic;
  enabledRef15: Dynamic;
  enabledRef16: Dynamic;
  frameMessengerRef: Dynamic;
  layoutRef: Dynamic;
  modeRef: Dynamic;
  send5: Dynamic;
  useDocumentDisplayRef: Dynamic;
  useDocumentFontsRef: Dynamic;
  version2: Dynamic;
}): Dynamic {
  return {
    ["send8"]: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
        type: `theme`,
        mode: roomPageContext.modeRef.current
      });
      roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
        type: `page-layout`,
        layout: roomPageContext.layoutRef.current
      });
      let documentFontsPostState2 = documentFontsPostState(roomPageContext.useDocumentFontsRef.current, false);
      roomPageContext.enabledRef15.current = documentFontsPostState2.applied;
      if (documentFontsPostState2.post !== null) {
        roomPageContext.frameMessengerRef.current.send(roomDocumentPage, {
          type: `typography`,
          ...documentFontsPostState2.post
        });
      }
      let documentDisplayPostState2: Dynamic = documentDisplayPostState(roomPageContext.useDocumentDisplayRef.current, false);
      roomPageContext.enabledRef16.current = documentDisplayPostState2.applied;
      if (documentDisplayPostState2.post !== null) {
        roomPageContext.frameMessengerRef.current.send(roomDocumentPage, resolveEditorHostKind3(documentDisplayPostState2.post));
      }
      roomPageContext.enabledRef11.current = false;
      (0, roomPageContext.send5)(roomDocumentPage);
      (0, roomPageContext.version2)(roomDocumentPage);
    }
  }["send8"];
}
export function runRoomPage191ResolveFrameGesturesCls2(roomPageContext: {
  iframeRef: Dynamic;
  setFrameError: Dynamic;
}): Dynamic {
  return {
    ["resolveFrameGesturesCls2"]: (cls?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, roomPageContext.setFrameError)(cls instanceof Error ? cls.message : String(cls));
      resolveFrameGesturesCls({
        where: `boot`,
        cls: cls,
        road: `host`
      });
      resolveObservabilityTelemetryFailed(roomPageContext.iframeRef.current?.contentWindow);
    }
  }["resolveFrameGesturesCls2"];
}
export function runRoomPage192Focus2(roomPageContext: {
  focus: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  resolveFrameGesturesCls2: Dynamic;
  send8: Dynamic;
}): Dynamic {
  return {
    ["focus2"]: (..._extraArguments: unknown[]): undefined => {
      recordFramePhase(`editorFrameLoaded`);
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (contentWindow) {
        (0, roomPageContext.send8)(contentWindow);
      }
      (0, roomPageContext.focus)();
      loadDataModelSchemasCss().then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let contentWindow2: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
        if (!(!contentWindow2 || contentWindow2 !== contentWindow || roomPageContext.navigatedRef.current || !result)) {
          contentWindow2.postMessage(result, `*`);
        }
      });
      loadPlatformRuntimeAndChatMsg().then(({
        msg: msg,
        transfer: transfer
      }: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let contentWindow2: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
        if (!(!contentWindow2 || roomPageContext.navigatedRef.current)) {
          if (!recordFramePhase(`runtimePost`)) {
            resolveObservabilityBootMark(`pages:runtimePost`);
          }
          roomPageContext.frameMessengerRef.current.send(contentWindow2, msg, transfer);
        }
      }).catch(roomPageContext.resolveFrameGesturesCls2);
    }
  }["focus2"];
}

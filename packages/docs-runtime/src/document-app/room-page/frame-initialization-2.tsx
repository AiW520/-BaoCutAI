import { React } from "../bootstrap";
import { DocumentRuntimeSearch, DocumentRuntimeState6, documentRuntimeSet3, getDocumentRuntimeHoldMs, resolveDocumentRuntimeActiveId, resolveDocumentRuntimeActiveId2, resolveDocumentRuntimeCatch3, resolveDocumentRuntimeFocusId, resolveDocumentRuntimeReadOnly3, resolveDocumentRuntimeTier } from "../document-runtime/widget-provenance-gutter";
import { DocumentFrameFrag, isDocumentFrameValue } from "../document-frame-use-document-frame-key";
import { documentScrollKey, getDocumentScroll } from "../ask-cards/document-posture-badge";
import { getFrameGesturesValue, resolveFrameGesturesExec, resolveFrameGesturesIsActive, resolveFrameGesturesIsFinite, resolveFrameGesturesLayer2, resolveFrameGesturesOpen, resolveFrameGesturesStale, resolveFrameGesturesValue10 } from "../frame/gestures-state-1";
import { DocumentRuntimeDelete, resolveDocumentRuntimePort, resolveDocumentRuntimeWidth } from "../document-runtime/use-document-runtime-subscribe-project-feed";
import { DocumentSelectionState, filterDocumentSelectionNodeId } from "../document-selection/create-heading-normalization-plugin";
import { classifyTitleEscape, hasKeyboardFrameFocus, openKeyboardHelp } from "../document-display";
import { installWidgetBridgeResume } from "../widget-bridge/widget-sample-card";
import { resolveDocumentRuntimePreventScroll } from "../document-runtime/use-document-iframe-focus";
import { isDocumentSourcePromptFsId } from "../room-document-page/document-comments-headless";
import { resolveDocumentCommandsArtifactLinkChips, resolveDocumentCommandsNodeId, resolveDocumentCommandsNonce } from "../document-commands/create-selection-ask-coordinator";
import { resolveCommentSessionCard, resolveCommentSessionHost } from "../comment-session/clear-comment-session-thread-id";
import { CLAUDE_REQUEST_REFUSAL_MESSAGES, CLAUDE_REQUEST_STOP_MESSAGES, claudeBusyMessage, isCommentSessionFeatureDisabled, markAskCardLoweringDebt } from "../comment-notifications/create-comment-notice-coordinator";
import { resolveDocumentRuntimeError } from "../document-runtime/use-document-runtime-room";
import { handleHostDropFiles, resolveDocumentUploadsError, resolveDocumentUploadsValue } from "../document-uploads";
import { clearPendingTabRename } from "../document-context-actions/duplicate-document-tab";
import { runRoomPage1DataTypeAskClaude, runRoomPage2DataTypeLinkHit, runRoomPage3DataTypeWidgetDefinitionTextEdit, runRoomPage4DataTypeWidgetDatumComment, runRoomPage5DataTypeWidgetSegmentComment, runRoomPage6DataTypeCommentAdd, runRoomPage7DataTypeInlineAskGoneDataTypeInlineAskFailed, runRoomPage8DataTypeInlineAskWritingDataTypeInlineAskUnsent, runRoomPage9DataTypeInlineAskOpen } from "./frame-initialization-1";
/** BaoCut: room document frame initialization; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  api,
  clickAwayDraftVerdict,
  CopyLinkFallbackUrl,
  createPagesEditorRemountEvent as createPagesEditorRemountEvent3,
  DataModelSchemasDragging,
  editorAnchorsAndMentionsPattern2,
  editorHostPattern3,
  EditorSelectionAndTablesSelection,
  emitTelemetryEvent,
  frameBlobBytesResult,
  frameCurrentAnchor,
  frameMentioned,
  isDataOperationControlLabel,
  isEditorSelectionAndTablesIsActive,
  isPlatformFrameAndCapabilitiesWindow,
  isPlatformSyncAndRoutingTextarea,
  loadPlatformSyncAndRoutingClipboard,
  PlatformLiveDocumentAndHistoryMessage,
  resolveCommentsActionsAndSelectionContainer,
  resolveCommentsActionsAndSelectionLocalhost,
  resolveCommentsActionsAndSelectionUrl,
  resolveCommentsStoreChart,
  resolveDataContentAndReferencesError2,
  resolveEditorSelectionAndTablesFind,
  resolveEditorSelectionAndTablesSlice,
  resolveObservabilityBrowserAndOperationEventsTest9,
  resolvePlatformFeatureFlagsEnabled2,
  resolvePlatformFeatureFlagsValue,
  resolvePlatformFeatureFlagsValue5,
  resolvePlatformKeyboardAndSaveStatusValue2,
  resolvePlatformSessionAndSourcesTest13,
  resolvePlatformSessionAndSourcesTest3,
  resolvePlatformSessionAndSourcesTest4,
  resolvePlatformSessionAndSourcesTest6,
  settleClickAway,
  toast,
  useCommentStore,
} from "../../platform/index";
import { isFrameArtifact } from "../../boot/environment";
export function runRoomPage194Effect(roomPageContext: {
  amountRef: Dynamic;
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askCardModRef: Dynamic;
  askCardRecoveryPreviousNotice2: Dynamic;
  askCardSeqRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askHeightObserverRef: Dynamic;
  askInvitationKinds: Dynamic;
  askLineBidRef: Dynamic;
  askModulesPromiseRef: Dynamic;
  askPermission: Dynamic;
  askReconcilePendingRef: Dynamic;
  askUsageRef: Dynamic;
  askWhyKeysRef: Dynamic;
  askWhyRef: Dynamic;
  bornHereRef: Dynamic;
  bumpAskModuleTick2: Dynamic;
  callback: Dynamic;
  closedCardsRef: Dynamic;
  collapsedRef: Dynamic;
  commentOnly: Dynamic;
  commentOnlyRef: Dynamic;
  commentsReadOnly2: Dynamic;
  commentsReadOnlyRef: Dynamic;
  container: Dynamic;
  countRef3: Dynamic;
  countRef4: Dynamic;
  createRouteSideRef: Dynamic;
  dirRef: Dynamic;
  documentCommandsSaidRef: Dynamic;
  DocumentRuntimeState9: Dynamic;
  DocumentSourcePromptState: Dynamic;
  elementRef: Dynamic;
  elementRef10: Dynamic;
  elementRef12: Dynamic;
  elementRef19: Dynamic;
  elementRef2: Dynamic;
  elementRef20: Dynamic;
  elementRef22: Dynamic;
  elementRef25: Dynamic;
  elementRef26: Dynamic;
  elementRef32: Dynamic;
  elementRef38: Dynamic;
  elementRef39: Dynamic;
  elementRef44: Dynamic;
  elementRef45: Dynamic;
  elementRef49: Dynamic;
  elementRef50: Dynamic;
  elementRef51: Dynamic;
  elementRef52: Dynamic;
  elementRef53: Dynamic;
  elementRef54: Dynamic;
  elementRef55: Dynamic;
  elementRef56: Dynamic;
  elementRef57: Dynamic;
  elementRef6: Dynamic;
  elementRef62: Dynamic;
  elementRef63: Dynamic;
  elementRef64: Dynamic;
  elementRef7: Dynamic;
  elementRef8: Dynamic;
  elementRef81: Dynamic;
  enabledRef: Dynamic;
  enabledRef10: Dynamic;
  enabledRef12: Dynamic;
  enabledRef13: Dynamic;
  enabledRef14: Dynamic;
  enabledRef21: Dynamic;
  enabledRef22: Dynamic;
  enabledRef3: Dynamic;
  enabledRef4: Dynamic;
  enabledRef7: Dynamic;
  enabledRef8: Dynamic;
  ensureSessionRunsLoaded: Dynamic;
  errorRef: Dynamic;
  errorRef3: Dynamic;
  frameGesturesOpenedAtRef: Dynamic;
  frameMessengerRef: Dynamic;
  frameMountEpoch: Dynamic;
  fsEntryId2: Dynamic;
  goneRef: Dynamic;
  idRef: Dynamic;
  iframeRef: Dynamic;
  imagePicker: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  inlineAskHost: Dynamic;
  inlineAskHost2: Dynamic;
  isAskCardRecoveryAlive2: Dynamic;
  isDocumentSelectionRandomUUIDRef: Dynamic;
  judge: Dynamic;
  labelRef: Dynamic;
  labelRef2: Dynamic;
  labelRef9: Dynamic;
  leavingAskCardRef: Dynamic;
  linkPopRef: Dynamic;
  lookupRef: Dynamic;
  mapPreloadDependencies2: Dynamic;
  memoized: Dynamic;
  memoizedRef: Dynamic;
  mentionPopoverRef: Dynamic;
  navigatedRef: Dynamic;
  onClose: Dynamic;
  onEscapeToChromeRef: Dynamic;
  pageRef: Dynamic;
  path: Dynamic;
  phoneRef: Dynamic;
  pidRef: Dynamic;
  primeAuthoritySettledRef: Dynamic;
  readOnly2: Dynamic;
  ready: Dynamic;
  recordRef: Dynamic;
  recordRef6: Dynamic;
  refreshWaitingSideRef: Dynamic;
  resolveDocumentLinksToLowerCase2: Dynamic;
  responseRef: Dynamic;
  room: Dynamic;
  roomDocumentPageHandler2: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomDocumentPageResultRef5: Dynamic;
  roomNodeIdRef: Dynamic;
  roomPageModuleUrl: Dynamic;
  roomRef: Dynamic;
  routeSideRef: Dynamic;
  selbarPortRef: Dynamic;
  selectionCardRef: Dynamic;
  send: Dynamic;
  sendRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
  sessionRef: Dynamic;
  sessionRef2: Dynamic;
  sessionRouteSendRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionSendingRef: Dynamic;
  sessionStoppedRef: Dynamic;
  setActiveDataTarget: Dynamic;
  setAskCardDraft: Dynamic;
  setBlockContextMenu: Dynamic;
  setCountState: Dynamic;
  setDraftAnchor: Dynamic;
  setInlineAskNotice: Dynamic;
  setInsertMenuAnchor: Dynamic;
  setLastDataTarget: Dynamic;
  setLeavingAskCard: Dynamic;
  setLinkPopover: Dynamic;
  setMentionPopover: Dynamic;
  setMentionPopover2: Dynamic;
  shortcutSheetRef: Dynamic;
  title2: Dynamic;
  uniqueItemsRef: Dynamic;
  uniqueItemsRef2: Dynamic;
  uniqueItemsRef3: Dynamic;
  uniqueItemsRef4: Dynamic;
  useDocumentInteractionOverlays11: Dynamic;
  useDocumentInteractionOverlays13: Dynamic;
  useDocumentInteractionOverlays22: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  version: Dynamic;
  waitingSideRef: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!contentWindow || !roomPageContext.ready || !roomPageContext.useDocumentInteractionOverlays22 || roomPageContext.navigatedRef.current) return;
    let documentRuntimeReadOnly3: Dynamic = resolveDocumentRuntimeReadOnly3({
      readOnly: roomPageContext.readOnly2,
      commentsReadOnly: roomPageContext.commentsReadOnly2,
      laneCommentOnly: roomPageContext.commentOnly,
      room: !!roomPageContext.roomRef.current
    });
    let tier2: Dynamic = documentRuntimeReadOnly3.tier;
    let documentRuntimeTier: string = resolveDocumentRuntimeTier(documentRuntimeReadOnly3);
    let enabled5: boolean = !roomPageContext.enabledRef3.current || roomPageContext.elementRef81.current !== documentRuntimeTier;
    if (roomPageContext.enabledRef3.current) {
      if (enabled5 && roomPageContext.elementRef81.current !== undefined) {
        emitTelemetryEvent(createPagesEditorRemountEvent3(roomPageContext.elementRef81.current, documentRuntimeTier, roomPageContext.enabledRef22.current));
      }
    } else {
      roomPageContext.enabledRef22.current = false;
    }
    if (!documentRuntimeReadOnly3.readonly) {
      roomPageContext.enabledRef22.current = true;
    }
    roomPageContext.elementRef81.current = documentRuntimeTier;
    roomPageContext.enabledRef3.current = true;
    let hashSlice: string = location.hash.slice(1);
    let isDocumentFrameValue2: boolean = isDocumentFrameValue(hashSlice);
    let roomDocumentPageResult34: Dynamic;
    if (roomPageContext.room && !roomPageContext.elementRef49.current && !isDocumentFrameValue2 && roomPageContext.elementRef44.current === undefined && roomPageContext.elementRef45.current === undefined) {
      let documentScrollKey2: string = documentScrollKey(roomPageContext.room.pid, roomPageContext.room.fileId);
      let documentScroll: Dynamic = getDocumentScroll(documentScrollKey2);
      if (documentScroll !== undefined) {
        roomPageContext.elementRef44.current = documentScroll;
      }
      roomDocumentPageResult34 = getFrameGesturesValue(documentScrollKey2);
    }
    let matchesElement: boolean = roomPageContext.elementRef45.current !== undefined && location.hash !== roomPageContext.elementRef45.current;
    let matchesElement2: Dynamic = (roomPageContext.elementRef44.current === undefined || matchesElement) && isDocumentFrameValue2;
    if (enabled5) {
      let roomDocumentPageResult35: Dynamic;
      if (!roomPageContext.elementRef49.current) {
        roomPageContext.labelRef.current = crypto.randomUUID();
        let messageChannel: Dynamic = new (MessageChannel as Dynamic)();
        roomPageContext.elementRef49.current = messageChannel.port1;
        roomPageContext.useDocumentInteractionOverlays11.current(messageChannel.port1);
        if (roomPageContext.roomRef.current) {
          if (DocumentRuntimeState6) {
            roomPageContext.useDocumentInteractionOverlays13.current(`armed`);
          }
        } else {
          roomPageContext.elementRef56.current = performance.now();
          if (DocumentRuntimeState6) {
            roomPageContext.useDocumentInteractionOverlays13.current(`mount_before_room`);
          }
        }
        let resolved: Dynamic = new (DocumentRuntimeDelete as Dynamic)();
        let messageChannel2: Dynamic = new (MessageChannel as Dynamic)();
        roomPageContext.selbarPortRef.current = messageChannel2.port1;
        roomPageContext.createRouteSideRef.current()?.portMade();
        roomPageContext.waitingSideRef.current?.frameReady();
        roomPageContext.elementRef50.current?.release();
        roomPageContext.elementRef50.current = DocumentSelectionState.getState().register((cmd?: Dynamic, ..._extraArguments: unknown[]): Dynamic => messageChannel2.port1.postMessage({
          type: `format-cmd`,
          cmd: cmd
        }), (..._extraArguments: unknown[]): undefined => {
          let iframe: Dynamic = roomPageContext.iframeRef.current;
          if (iframe && iframe.ownerDocument.activeElement !== iframe) {
            iframe.focus();
          }
        });
        (0, roomPageContext.setCountState)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage + 1);
        messageChannel2.port1.addEventListener(`message`, (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (roomPageContext.navigatedRef.current) return;
          let data: Dynamic = event.data;
          if (!(!data || typeof data != `object`)) {
            if (data.type === `widget-placement-exit`) {
              roomPageContext.widgetPlacingRef.current = false;
              return;
            }
            if (data.type === `doc-escape`) {
              roomPageContext.elementRef63.current = null;
              roomPageContext.elementRef62.current = null;
              if (roomPageContext.askWhyRef.current?.current()) {
                (0, roomPageContext.inlineAskHost2)(true);
                return;
              }
              if (roomPageContext.routeSideRef.current?.docEscape() === true) return;
              let storeState: Dynamic = useCommentStore.getState();
              let classifyTitleEscape2: string = classifyTitleEscape({
                peekSurface: roomPageContext.collapsedRef.current && storeState.commentMode !== `list`,
                focusId: storeState.focusId,
                draftAnchor: storeState.draftAnchor,
                dirtyCount: storeState.dirtyEditors.size,
                listPopover: roomPageContext.collapsedRef.current && storeState.commentMode === `list`,
                hostPopoverOpen: roomPageContext.linkPopRef.current !== null || roomPageContext.widgetPlacingRef.current,
                docFocused: (document as Dynamic).activeElement === roomPageContext.iframeRef.current,
                quietAskCard: ((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage !== null && roomPageContext.askInvitationKinds.current.has(roomDocumentPage.nonce) && roomPageContext.askCardDeskRef.current?.mayFocus(roomDocumentPage.nonce) === false)(roomPageContext.inlineAskHost.current())
              });
              if (classifyTitleEscape2 === `close-ask`) {
                roomPageContext.inlineAskHost.cancel({
                  restoreCaret: true
                });
              } else {
                if (classifyTitleEscape2 === `release-peek`) {
                  storeState.setFocus(null);
                } else {
                  if (classifyTitleEscape2 === `close-list`) {
                    storeState.setCommentMode(`margin`);
                  } else {
                    if (classifyTitleEscape2 === `exit`) {
                      roomPageContext.onEscapeToChromeRef.current?.();
                    }
                  }
                }
              }
              return;
            }
            if (data.type === `doc-shortcuts`) {
              if (!roomPageContext.shortcutSheetRef.current) return;
              openKeyboardHelp();
              installWidgetBridgeResume({
                iframe: (..._extraArguments: unknown[]): Dynamic => roomPageContext.iframeRef.current,
                alive: (..._extraArguments: unknown[]) => !roomPageContext.navigatedRef.current,
                post: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.iframeRef.current?.contentWindow, roomDocumentPage)
              });
              return;
            }
            if (data.type === `widget-toolbar`) {
              let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTest4(typeof data.nodeId == `string` ? data.nodeId : ``, (0, roomPageContext.roomDocumentPageHandler3)());
              if (!roomDocumentPageResult36 || !roomPageContext.enabledRef13.current) return;
              let iframe: Dynamic = roomPageContext.iframeRef.current;
              if (!iframe || (document as Dynamic).activeElement !== iframe) return;
              let roomDocumentPageHandler6: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomPageContext.pageRef.current ?? document;
              let count: number = 30;
              let requestAnimationFrame2 = (..._extraArguments: unknown[]): undefined => {
                if (!(roomPageContext.navigatedRef.current || !roomPageContext.enabledRef3.current)) {
                  if ((document as Dynamic).activeElement === iframe) {
                    if (!resolveDocumentRuntimePreventScroll(roomDocumentPageHandler6(), roomDocumentPageResult36)) {
                      if (--count > 0) {
                        requestAnimationFrame(requestAnimationFrame2);
                      }
                    }
                  }
                }
              };
              requestAnimationFrame2();
              return;
            }
            if (data.type === `comment-open-key`) {
              isDocumentSourcePromptFsId({
                id: data.id,
                live: !roomPageContext.navigatedRef.current && roomPageContext.enabledRef3.current,
                frame: roomPageContext.iframeRef.current,
                fsId: roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current
              });
              return;
            }
            if (data.type === `click-away`) {
              resolvePlatformFeatureFlagsValue(`press`);
              let storeState: Dynamic = useCommentStore.getState();
              roomPageContext.elementRef63.current = null;
              roomPageContext.elementRef62.current = null;
              roomPageContext.elementRef64.current = null;
              if (storeState.dirtyEditors.size > 0) return;
              if (storeState.focusId) {
                storeState.setFocus(null);
              }
              let roomDocumentPageResult36: string = clickAwayDraftVerdict(storeState.draftAnchor, storeState.dirtyEditors, {
                addressable: data.addressable === true,
                selecting: data.selecting === true
              });
              if (roomDocumentPageResult36 === `defer`) {
                roomPageContext.elementRef64.current = storeState.draftAnchor;
              } else {
                if (roomDocumentPageResult36 === `drop`) {
                  storeState.setDraftAnchor(null);
                  storeState.setDraftY(null);
                }
              }
              let inlineAskHost4: Dynamic = roomPageContext.inlineAskHost.current();
              if (inlineAskHost4 && !inlineAskHost4.docked) {
                (0, roomPageContext.inlineAskHost2)(false);
              }
              let element4: Dynamic = roomPageContext.elementRef10.current;
              if (element4 !== null) {
                roomPageContext.elementRef10.current = null;
                roomPageContext.selbarPortRef.current?.postMessage({
                  type: `inline-ask-cancel`,
                  nonce: element4.nonce
                });
              }
              return;
            } else if (data.type === `click-away-settle`) {
              let element4: Dynamic = roomPageContext.elementRef64.current;
              roomPageContext.elementRef64.current = null;
              let storeState: Dynamic = useCommentStore.getState();
              if (settleClickAway(element4, storeState.draftAnchor, storeState.dirtyEditors) === `drop`) {
                storeState.setDraftAnchor(null);
                storeState.setDraftY(null);
              }
              return;
            }
            if (data.type === `inline-ask-open`) {
              const roomPageResult = runRoomPage9DataTypeInlineAskOpen({
                get announcedAskCards() {
                  return roomPageContext.announcedAskCards;
                },
                get askCardDeskRef() {
                  return roomPageContext.askCardDeskRef;
                },
                get AskCardFaceRef() {
                  return roomPageContext.AskCardFaceRef;
                },
                get askCardModRef() {
                  return roomPageContext.askCardModRef;
                },
                get askCardRecoveryPreviousNotice2() {
                  return roomPageContext.askCardRecoveryPreviousNotice2;
                },
                get askCardSeqRef() {
                  return roomPageContext.askCardSeqRef;
                },
                get askInvitationKinds() {
                  return roomPageContext.askInvitationKinds;
                },
                get askLineBidRef() {
                  return roomPageContext.askLineBidRef;
                },
                get askModulesPromiseRef() {
                  return roomPageContext.askModulesPromiseRef;
                },
                get askPermission() {
                  return roomPageContext.askPermission;
                },
                get askReconcilePendingRef() {
                  return roomPageContext.askReconcilePendingRef;
                },
                get askUsageRef() {
                  return roomPageContext.askUsageRef;
                },
                get closedCardsRef() {
                  return roomPageContext.closedCardsRef;
                },
                get createRouteSideRef() {
                  return roomPageContext.createRouteSideRef;
                },
                get data() {
                  return data;
                },
                get elementRef() {
                  return roomPageContext.elementRef;
                },
                get elementRef10() {
                  return roomPageContext.elementRef10;
                },
                get elementRef2() {
                  return roomPageContext.elementRef2;
                },
                get elementRef7() {
                  return roomPageContext.elementRef7;
                },
                get enabledRef() {
                  return roomPageContext.enabledRef;
                },
                get enabledRef12() {
                  return roomPageContext.enabledRef12;
                },
                get ensureSessionRunsLoaded() {
                  return roomPageContext.ensureSessionRunsLoaded;
                },
                get fsEntryId2() {
                  return roomPageContext.fsEntryId2;
                },
                get goneRef() {
                  return roomPageContext.goneRef;
                },
                get initialAskCardRecoveryStateRef() {
                  return roomPageContext.initialAskCardRecoveryStateRef;
                },
                get inlineAskHost() {
                  return roomPageContext.inlineAskHost;
                },
                get isAskCardRecoveryAlive2() {
                  return roomPageContext.isAskCardRecoveryAlive2;
                },
                get labelRef9() {
                  return roomPageContext.labelRef9;
                },
                get leavingAskCardRef() {
                  return roomPageContext.leavingAskCardRef;
                },
                get lookupRef() {
                  return roomPageContext.lookupRef;
                },
                get mapPreloadDependencies2() {
                  return roomPageContext.mapPreloadDependencies2;
                },
                get memoized() {
                  return roomPageContext.memoized;
                },
                get messageChannel2() {
                  return messageChannel2;
                },
                get navigatedRef() {
                  return roomPageContext.navigatedRef;
                },
                get pidRef() {
                  return roomPageContext.pidRef;
                },
                get refreshWaitingSideRef() {
                  return roomPageContext.refreshWaitingSideRef;
                },
                get routeSideRef() {
                  return roomPageContext.routeSideRef;
                },
                get selbarPortRef() {
                  return roomPageContext.selbarPortRef;
                },
                get sessionCardsRef() {
                  return roomPageContext.sessionCardsRef;
                },
                get sessionLateRef() {
                  return roomPageContext.sessionLateRef;
                },
                get sessionLineRef() {
                  return roomPageContext.sessionLineRef;
                },
                get sessionRunsRef() {
                  return roomPageContext.sessionRunsRef;
                },
                get sessionStoppedRef() {
                  return roomPageContext.sessionStoppedRef;
                },
                get setAskCardDraft() {
                  return roomPageContext.setAskCardDraft;
                },
                get setInlineAskNotice() {
                  return roomPageContext.setInlineAskNotice;
                },
                get uniqueItemsRef() {
                  return roomPageContext.uniqueItemsRef;
                },
                get uniqueItemsRef2() {
                  return roomPageContext.uniqueItemsRef2;
                },
                get uniqueItemsRef3() {
                  return roomPageContext.uniqueItemsRef3;
                },
                get uniqueItemsRef4() {
                  return roomPageContext.uniqueItemsRef4;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            }
            if (data.type === `inline-ask-writing` || data.type === `inline-ask-unsent`) {
              const roomPageResult = runRoomPage8DataTypeInlineAskWritingDataTypeInlineAskUnsent({
                get announcedAskCards() {
                  return roomPageContext.announcedAskCards;
                },
                get askCardDeskRef() {
                  return roomPageContext.askCardDeskRef;
                },
                get askCardModRef() {
                  return roomPageContext.askCardModRef;
                },
                get askFailureTimerRef() {
                  return roomPageContext.askFailureTimerRef;
                },
                get askInvitationKinds() {
                  return roomPageContext.askInvitationKinds;
                },
                get askPermission() {
                  return roomPageContext.askPermission;
                },
                get closedCardsRef() {
                  return roomPageContext.closedCardsRef;
                },
                get data() {
                  return data;
                },
                get elementRef12() {
                  return roomPageContext.elementRef12;
                },
                get elementRef8() {
                  return roomPageContext.elementRef8;
                },
                get iframeRef() {
                  return roomPageContext.iframeRef;
                },
                get inlineAskHost() {
                  return roomPageContext.inlineAskHost;
                },
                get leavingAskCardRef() {
                  return roomPageContext.leavingAskCardRef;
                },
                get setInlineAskNotice() {
                  return roomPageContext.setInlineAskNotice;
                },
                get setLeavingAskCard() {
                  return roomPageContext.setLeavingAskCard;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            }
            if (data.type === `inline-ask-line`) {
              let documentCommandsNonce: Dynamic = resolveDocumentCommandsNonce(data, roomPageContext.inlineAskHost.current()?.nonce ?? null, resolveObservabilityBrowserAndOperationEventsTest9);
              if (documentCommandsNonce === null) return;
              if (documentCommandsNonce.bid === null) {
                roomPageContext.askLineBidRef.current.delete(documentCommandsNonce.nonce);
              } else {
                roomPageContext.askLineBidRef.current.set(documentCommandsNonce.nonce, documentCommandsNonce.bid);
              }
              roomPageContext.routeSideRef.current?.lineSaid(documentCommandsNonce.nonce, documentCommandsNonce.bid);
              return;
            }
            if (data.type === `inline-ask-reopen-refused`) {
              roomPageContext.createRouteSideRef.current()?.reopenRefused(data);
              return;
            }
            if (data.type === `inline-ask-probed`) {
              if (typeof data.nonce == `number` && roomPageContext.elementRef19.current?.card === data.nonce) {
                roomPageContext.elementRef19.current.go();
              }
              return;
            }
            if (data.type === `ask-waiting-known`) {
              roomPageContext.waitingSideRef.current?.frameKnows();
              return;
            }
            if (data.type === `ask-waiting-said`) {
              roomPageContext.waitingSideRef.current?.frameSaid(data.bid, data.what, data.mine === true);
              return;
            }
            if (data.type === `inline-ask-gone` || data.type === `inline-ask-failed`) {
              const roomPageResult = runRoomPage7DataTypeInlineAskGoneDataTypeInlineAskFailed({
                get askCardDeskRef() {
                  return roomPageContext.askCardDeskRef;
                },
                get askCardModRef() {
                  return roomPageContext.askCardModRef;
                },
                get askFailureTimerRef() {
                  return roomPageContext.askFailureTimerRef;
                },
                get data() {
                  return data;
                },
                get elementRef10() {
                  return roomPageContext.elementRef10;
                },
                get elementRef12() {
                  return roomPageContext.elementRef12;
                },
                get elementRef20() {
                  return roomPageContext.elementRef20;
                },
                get enabledRef21() {
                  return roomPageContext.enabledRef21;
                },
                get inlineAskHost() {
                  return roomPageContext.inlineAskHost;
                },
                get leavingAskCardRef() {
                  return roomPageContext.leavingAskCardRef;
                },
                get selectionCardRef() {
                  return roomPageContext.selectionCardRef;
                },
                get sessionCardsRef() {
                  return roomPageContext.sessionCardsRef;
                },
                get sessionRunsRef() {
                  return roomPageContext.sessionRunsRef;
                },
                get sessionSendingRef() {
                  return roomPageContext.sessionSendingRef;
                },
                get setInlineAskNotice() {
                  return roomPageContext.setInlineAskNotice;
                },
                get uniqueItemsRef4() {
                  return roomPageContext.uniqueItemsRef4;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            }
            if (data.type === `inline-ask-enter`) {
              roomPageContext.askWhyKeysRef.current?.reported(data.nonce);
              return;
            }
            if (data.type === `inline-ask-dismiss`) {
              if (typeof data.nonce == `number` && Number.isFinite(data.nonce)) {
                roomPageContext.inlineAskHost.dismissed(data.nonce);
              }
              return;
            }
            if (data.type === `inline-ask-line-typed`) {
              try {
                let landed: Dynamic = roomPageContext.selectionCardRef.current.landed(data.nonce);
                if (landed !== null) {
                  resolveCommentSessionCard(landed, typeof data.whose == `string` ? data.whose : ``, typeof data.count == `number` ? data.count : 0);
                }
              } catch {}
              return;
            }
            if (data.type === `inline-ask-refused`) {
              let why: Dynamic = data.why;
              let matchesWhy: boolean = why === `failed` || why === `failed_closed` || why === `failed_partway` || why === `refused` || why === `withdrawn`;
              if (matchesWhy && !(0, roomPageContext.askCardRecoveryPreviousNotice2)() || !matchesWhy && isCommentSessionFeatureDisabled()) return;
              let matchesCard: boolean = data.card === true;
              let claudeBusyMessage2: Dynamic = why === `busy` ? claudeBusyMessage(data.typed, roomPageContext.waitingSideRef.current !== null && data.waits) : matchesWhy ? matchesCard && why === `withdrawn` ? CLAUDE_REQUEST_STOP_MESSAGES.withdrawn : CLAUDE_REQUEST_REFUSAL_MESSAGES[why] : `Asking Claude here needs edit access to this document.`;
              toast.info(claudeBusyMessage2, {
                id: `inline-ask`
              });
              if (why === `busy` || why === `readonly`) {
                resolveCommentSessionHost(`refused`, why);
              }
              return;
            }
            if (data.type === `claude-run-start` || data.type === `claude-run-stop`) {
              if (data.type === `claude-run-stop` && roomPageContext.askCardModRef.current) {
                (0, roomPageContext.setInlineAskNotice)(roomPageContext.askCardModRef.current.lineAfterRunEnd);
              }
              roomPageContext.elementRef12.current?.onMessage(data);
              return;
            }
            if (data.type === `comment-add`) {
              const roomPageResult = runRoomPage6DataTypeCommentAdd({
                get amountRef() {
                  return roomPageContext.amountRef;
                },
                get askHeightObserverRef() {
                  return roomPageContext.askHeightObserverRef;
                },
                get commentsReadOnlyRef() {
                  return roomPageContext.commentsReadOnlyRef;
                },
                get countRef4() {
                  return roomPageContext.countRef4;
                },
                get data() {
                  return data;
                },
                get DocumentSourcePromptState() {
                  return roomPageContext.DocumentSourcePromptState;
                },
                set DocumentSourcePromptState(roomPageValue: Dynamic) {
                  roomPageContext.DocumentSourcePromptState = roomPageValue;
                },
                get enabledRef3() {
                  return roomPageContext.enabledRef3;
                },
                get iframeRef() {
                  return roomPageContext.iframeRef;
                },
                get inlineAskHost() {
                  return roomPageContext.inlineAskHost;
                },
                get inlineAskHost2() {
                  return roomPageContext.inlineAskHost2;
                },
                get navigatedRef() {
                  return roomPageContext.navigatedRef;
                },
                get room() {
                  return roomPageContext.room;
                },
                get selbarPortRef() {
                  return roomPageContext.selbarPortRef;
                },
                get sessionLineRef() {
                  return roomPageContext.sessionLineRef;
                },
                get sessionModRef() {
                  return roomPageContext.sessionModRef;
                },
                get sessionRouteSendRef() {
                  return roomPageContext.sessionRouteSendRef;
                },
                get sessionRunsRef() {
                  return roomPageContext.sessionRunsRef;
                },
                get sessionSendingRef() {
                  return roomPageContext.sessionSendingRef;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            } else if (data.type === `copy-heading-link`) {
              let slug: Dynamic = typeof data.slug == `string` ? data.slug : ``;
              let bid: Dynamic = typeof data.bid == `string` ? data.bid : undefined;
              let room2: Dynamic = roomPageContext.room;
              if (!room2 || !slug) return;
              let record5: Dynamic = {
                kind: `project`,
                id: room2.pid,
                ...(roomPageContext.version && roomPageContext.version !== `main` ? {
                  version: roomPageContext.version
                } : {})
              };
              let heading: Dynamic = resolvePlatformSessionAndSourcesTest13(bid);
              let {
                url: record6,
                exact: record7
              }: Dynamic = heading === null ? {
                url: resolveCommentsActionsAndSelectionContainer(record5, room2.fileId),
                exact: false
              } : resolveCommentsActionsAndSelectionUrl(record5, room2.fileId, heading);
              CopyLinkFallbackUrl(record6).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (result && !record7) {
                  toast.info(`Copied the tab's link — this heading's title can't ride a claude.ai link`, {
                    id: `copy-link`
                  });
                }
              });
              frameCurrentAnchor({
                tab: room2.fileId,
                ...(record7 && heading !== null ? {
                  heading: heading
                } : {})
              });
            } else if (data.type === `copy-text`) {
              if (!roomPageContext.commentOnlyRef.current) return;
              roomPageContext.elementRef32.current &&= (clearTimeout(roomPageContext.elementRef32.current), null);
              let success = (..._extraArguments: unknown[]): undefined => {
                toast.success(`Copied`, {
                  id: `copy-text`,
                  duration: 1500
                });
                roomPageContext.elementRef32.current = setTimeout((..._extraArguments: unknown[]): Dynamic => toast.dismiss(`copy-text`), 1500);
              };
              let error4: Dynamic = (..._extraArguments: unknown[]): Dynamic => toast.error(`Couldn’t copy the selection`, {
                id: `copy-text`,
                duration: 4e3
              });
              if (data.copied === true) return success();
              let textSlice: Dynamic = typeof data.text == `string` ? data.text.slice(0, 2e5) : ``;
              let userActivation: Dynamic = (navigator as Dynamic).userActivation;
              if (!textSlice || !userActivation || userActivation.isActive !== true) return error4();
              if (isPlatformSyncAndRoutingTextarea(textSlice)) return success();
              loadPlatformSyncAndRoutingClipboard(textSlice).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result ? success() : error4());
            } else if (data.type === `copy-image`) resolveDocumentRuntimeWidth(data, roomPageContext.pidRef.current, resolved).catch((error4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              (console as Dynamic).warn(`[lfile] copy image:`, resolveDataContentAndReferencesError2(error4));
            });else if (data.type === `widget-segment-menu`) {
              let nodeId2: Dynamic = resolvePlatformSessionAndSourcesTest4(typeof data.nodeId == `string` ? data.nodeId : ``, (0, roomPageContext.roomDocumentPageHandler3)());
              if (!nodeId2 || typeof data.segment == `string` && data.segment !== `` && !editorAnchorsAndMentionsPattern2.test(data.segment)) return;
              let iframeBounds: Dynamic = roomPageContext.iframeRef.current?.getBoundingClientRect();
              let isFinite2: Dynamic = (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): number => typeof roomDocumentPage == `number` && Number.isFinite(roomDocumentPage) ? Math.min(Math.max(roomDocumentPage, 0), options) : 0;
              let isFinite3: Dynamic = isFinite2(data.x, iframeBounds?.width ?? 0);
              let isFinite4: Dynamic = isFinite2(data.y, iframeBounds?.height ?? 0);
              (0, roomPageContext.setBlockContextMenu)({
                nodeId: nodeId2,
                x: (iframeBounds?.left ?? 0) + isFinite3,
                y: (iframeBounds?.top ?? 0) + isFinite4,
                gx: isFinite3,
                gy: isFinite4
              });
            } else if (data.type === `widget-segment-comment`) {
              const roomPageResult = runRoomPage5DataTypeWidgetSegmentComment({
                get data() {
                  return data;
                },
                get roomDocumentPageHandler3() {
                  return roomPageContext.roomDocumentPageHandler3;
                },
                get setDraftAnchor() {
                  return roomPageContext.setDraftAnchor;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            } else if (data.type === `widget-datum-comment`) {
              const roomPageResult = runRoomPage4DataTypeWidgetDatumComment({
                get countRef3() {
                  return roomPageContext.countRef3;
                },
                get data() {
                  return data;
                },
                get iframeRef() {
                  return roomPageContext.iframeRef;
                },
                get roomDocumentPageHandler3() {
                  return roomPageContext.roomDocumentPageHandler3;
                },
                get setActiveDataTarget() {
                  return roomPageContext.setActiveDataTarget;
                },
                get setDraftAnchor() {
                  return roomPageContext.setDraftAnchor;
                },
                get setLastDataTarget() {
                  return roomPageContext.setLastDataTarget;
                },
                get widgetPlacingRef() {
                  return roomPageContext.widgetPlacingRef;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            } else if (data.type === `widget-pin-words`) {
              let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTest4(typeof data.nodeId == `string` ? data.nodeId : ``, (0, roomPageContext.roomDocumentPageHandler3)());
              if (!roomDocumentPageResult36) return;
              let uniqueItems2: Dynamic = new (Set as Dynamic)((useCommentStore.getState().byPage[roomDocumentPageResult36] ?? []).map((byPageItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => byPageItem.id));
              let roomDocumentPageResult37: Dynamic = resolveCommentsStoreChart(data, (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => uniqueItems2.has(roomDocumentPage));
              if (roomDocumentPageResult37 === null) return;
              useCommentStore.getState().setPinWords(roomDocumentPageResult36, roomDocumentPageResult37.component, {
                ...(roomDocumentPageResult37.chart === undefined ? {} : {
                  chart: roomDocumentPageResult37.chart
                }),
                byId: roomDocumentPageResult37.byId
              });
            } else if (data.type === `widget-stamped-addresses`) {
              let fileId4: Dynamic = roomPageContext.roomRef.current?.fileId ?? roomPageContext.useDocumentRuntimeFsEntryId3.current;
              if (!fileId4) return;
              let roomDocumentPageHandler6: Dynamic = (0, roomPageContext.roomDocumentPageHandler3)();
              resolveDocumentRuntimeCatch3().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.takeStampedAddresses(fileId4, data, roomDocumentPageHandler6), (..._extraArguments: unknown[]): undefined => {});
            } else if (data.type === `widget-datum-chip-open`) {
              let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTest4(typeof data.nodeId == `string` ? data.nodeId : ``, (0, roomPageContext.roomDocumentPageHandler3)());
              if (!roomDocumentPageResult36) return;
              let ids: Dynamic = data.ids;
              let filteredIds: Dynamic = Array.isArray(ids) ? ids.filter((items2?: Dynamic, ..._extraArguments: unknown[]): boolean => typeof items2 == `string` && items2.length > 0 && items2.length <= 128) : [];
              if (filteredIds.length === 0) return;
              let storeState: Dynamic = useCommentStore.getState();
              let roomDocumentPageResult37: Dynamic = resolveEditorSelectionAndTablesFind(storeState.byPage[roomDocumentPageResult36] ?? [], filteredIds);
              if (!roomDocumentPageResult37) return;
              if (storeState.commentMode === `hidden`) {
                storeState.setCommentMode(`margin`);
              }
              let matchesFocusId: boolean = storeState.focusId === roomDocumentPageResult37;
              storeState.setActive(roomDocumentPageResult37);
              storeState.setFocus(roomDocumentPageResult37);
              if (storeState.commentMode === `list`) {
                storeState.revealInList(roomDocumentPageResult37, matchesFocusId);
              }
            } else if (data.type === `widget-chip-result`) {
              if (data.inserted !== true) {
                toast.info(PlatformLiveDocumentAndHistoryMessage);
              }
            } else if (data.type === `people-mentioned`) {
              let ids: Dynamic = data.ids;
              let filteredIds: Dynamic = Array.isArray(ids) ? ids.filter((items2?: Dynamic, ..._extraArguments: unknown[]): boolean => typeof items2 == `string` && items2.length > 0 && items2.length <= 128) : [];
              if (filteredIds.length > 0) {
                frameMentioned(filteredIds, roomPageContext.idRef.current);
              }
            } else if (data.type === `widget-create-request`) {
              let nodeId2: Dynamic = typeof data.nodeId == `string` ? data.nodeId : ``;
              let nodeId3: Dynamic = resolvePlatformSessionAndSourcesTest6(nodeId2) ? nodeId2 : ``;
              let after: Dynamic = data.at?.after;
              let after2: Dynamic = typeof after == `number` && Number.isInteger(after) && after >= 0 ? after : null;
              let trimmedPromptSlice: Dynamic = typeof data.prompt == `string` ? data.prompt.trim().slice(0, 8e3) : ``;
              let contextSlice: Dynamic = typeof data.context == `string` ? data.context.slice(-12e3) : ``;
              if (nodeId3 && after2 !== null && trimmedPromptSlice && roomPageContext.enabledRef13.current && (!DocumentRuntimeState6 || roomPageContext.enabledRef14.current)) {
                roomPageContext.errorRef3.current(nodeId3, after2, trimmedPromptSlice, contextSlice);
              } else {
                roomPageContext.sendRef.current(false);
              }
            } else if (data.type === `widget-text-edit`) {
              let nodeId2: Dynamic = resolvePlatformSessionAndSourcesTest4(data.nodeId, (0, roomPageContext.roomDocumentPageHandler3)());
              let id2: Dynamic = typeof data.id == `string` && editorAnchorsAndMentionsPattern2.test(data.id) ? data.id : ``;
              let value: Dynamic = typeof data.value == `string` ? data.value : null;
              if (!nodeId2 || !id2 || value === null) return;
              if (!roomPageContext.enabledRef13.current) {
                roomPageContext.selbarPortRef.current?.postMessage({
                  type: `widget-text-edit-refused`,
                  nodeId: nodeId2,
                  id: id2,
                  value: value,
                  reason: `access`
                });
                return;
              }
              roomPageContext.sessionRef.current(nodeId2, id2, value, data.draft === true);
            } else if (data.type === `widget-text-edit-unhandled`) resolveDocumentRuntimeError(typeof data.reason == `string` ? data.reason.slice(0, 500) : ``);else if (data.type === `widget-definition-text-edit`) {
              const roomPageResult = runRoomPage3DataTypeWidgetDefinitionTextEdit({
                get data() {
                  return data;
                },
                get enabledRef13() {
                  return roomPageContext.enabledRef13;
                },
                get roomDocumentPageHandler3() {
                  return roomPageContext.roomDocumentPageHandler3;
                },
                get selbarPortRef() {
                  return roomPageContext.selbarPortRef;
                },
                get sessionRef2() {
                  return roomPageContext.sessionRef2;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            } else if (data.type === `widget-chart-title-edit`) {
              let roomDocumentPageResult36: Dynamic = resolvePlatformSessionAndSourcesTest4(data.nodeId, (0, roomPageContext.roomDocumentPageHandler3)());
              let chartId: Dynamic = typeof data.chartId == `string` && /^[A-Za-z0-9_-]{1,128}$/.test(data.chartId) ? data.chartId : ``;
              let roomDocumentPageResult37: Dynamic = typeof data.value == `string` ? resolveEditorSelectionAndTablesSlice(data.value) : null;
              if (!roomDocumentPageResult36 || !chartId || roomDocumentPageResult37 === null || roomDocumentPageResult37.trim().length === 0 || !roomPageContext.enabledRef13.current) return;
              roomPageContext.errorRef.current(roomDocumentPageResult36, chartId, roomDocumentPageResult37, data.draft === true);
            } else if (data.type === `link-hit`) {
              const roomPageResult = runRoomPage2DataTypeLinkHit({
                get data() {
                  return data;
                },
                get enabledRef7() {
                  return roomPageContext.enabledRef7;
                },
                get iframeRef() {
                  return roomPageContext.iframeRef;
                },
                get resolveDocumentLinksToLowerCase2() {
                  return roomPageContext.resolveDocumentLinksToLowerCase2;
                },
                get selbarPortRef() {
                  return roomPageContext.selbarPortRef;
                },
                get setLinkPopover() {
                  return roomPageContext.setLinkPopover;
                },
                get setMentionPopover2() {
                  return roomPageContext.setMentionPopover2;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            } else if (data.type === `link-dismiss`) (0, roomPageContext.setLinkPopover)(null);else if (data.type === `alt-hit`) {
              if (roomPageContext.mentionPopoverRef.current) return;
              let documentCommandsNodeId: Dynamic = roomPageContext.enabledRef7.current || roomPageContext.responseRef.current.readOnly ? null : resolveDocumentCommandsNodeId(data, roomPageContext.iframeRef.current?.getBoundingClientRect(), Date.now());
              if (!documentCommandsNodeId) {
                let keepFocus: boolean = !hasKeyboardFrameFocus({
                  kbd: true,
                  hasFocus: (document as Dynamic).hasFocus(),
                  activeElement: (document as Dynamic).activeElement,
                  iframe: roomPageContext.iframeRef.current
                });
                roomPageContext.selbarPortRef.current?.postMessage({
                  type: `alt-cancel`,
                  nodeId: typeof data.nodeId == `string` ? data.nodeId : ``,
                  ...(keepFocus ? {
                    keepFocus: keepFocus
                  } : {})
                });
                return;
              }
              (0, roomPageContext.setLinkPopover)(null);
              roomPageContext.mentionPopoverRef.current = documentCommandsNodeId;
              (0, roomPageContext.setMentionPopover)(documentCommandsNodeId);
            } else if (data.type === `alt-dismiss`) (0, roomPageContext.setMentionPopover2)();else if (data.type === `format-state`) roomPageContext.elementRef50.current?.setState(filterDocumentSelectionNodeId(data.state));else if (data.type === `sel-update`) {
              resolvePlatformKeyboardAndSaveStatusValue2();
              if (!roomPageContext.room) return;
              let sel: Dynamic = data.sel;
              if (sel === null) {
                EditorSelectionAndTablesSelection.getState().collapse(roomPageContext.room.fileId);
                return;
              }
              if (typeof sel != `object`) return;
              let text: Dynamic = typeof sel.text == `string` ? sel.text.slice(0, 2e3) : ``;
              if (!text.trim()) {
                EditorSelectionAndTablesSelection.getState().collapse(roomPageContext.room.fileId);
                return;
              }
              if (sel.userGesture !== true || !isEditorSelectionAndTablesIsActive((document as Dynamic).activeElement, roomPageContext.iframeRef.current, (navigator as Dynamic).userActivation)) {
                EditorSelectionAndTablesSelection.getState().collapse(roomPageContext.room.fileId);
                return;
              }
              let nodeId2: Dynamic = sel.nodeId;
              EditorSelectionAndTablesSelection.getState().set({
                fileId: roomPageContext.room.fileId,
                text: text,
                userGesture: true,
                ...(typeof nodeId2 == `string` && resolvePlatformSessionAndSourcesTest3(nodeId2) ? {
                  nodeId: nodeId2
                } : {})
              });
            } else if (data.type === `ask-claude`) {
              const roomPageResult = runRoomPage1DataTypeAskClaude({
                get callback() {
                  return roomPageContext.callback;
                },
                get commentsReadOnlyRef() {
                  return roomPageContext.commentsReadOnlyRef;
                },
                get countRef4() {
                  return roomPageContext.countRef4;
                },
                get data() {
                  return data;
                },
                get iframeRef() {
                  return roomPageContext.iframeRef;
                },
                get judge() {
                  return roomPageContext.judge;
                },
                get labelRef2() {
                  return roomPageContext.labelRef2;
                },
                get room() {
                  return roomPageContext.room;
                },
                get roomNodeIdRef() {
                  return roomPageContext.roomNodeIdRef;
                },
                get roomPageModuleUrl() {
                  return roomPageContext.roomPageModuleUrl;
                },
                get send() {
                  return roomPageContext.send;
                },
                get title2() {
                  return roomPageContext.title2;
                }
              });
              if (roomPageResult) return roomPageResult.value;
            }
          }
        });
        messageChannel2.port1.start();
        let messageChannel3: Dynamic = new (MessageChannel as Dynamic)();
        roomPageContext.elementRef51.current = messageChannel3.port1;
        let uniqueItems: Dynamic = new (Set as Dynamic)();
        messageChannel3.port1.addEventListener(`message`, (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (roomPageContext.navigatedRef.current) return;
          let message: Dynamic = event.data;
          let port: Dynamic = roomPageContext.elementRef51.current;
          if (message?.type === `need-blob`) {
            if (!port || typeof message.key != `string`) return;
            let key2: Dynamic = message.key;
            if (uniqueItems.has(key2)) return;
            let documentRuntimePort: Dynamic = resolveDocumentRuntimePort({
              port: port,
              key: key2,
              askedIn: roomPageContext.pidRef.current,
              resolved: resolved,
              live: (..._extraArguments: unknown[]): boolean => !roomPageContext.navigatedRef.current && roomPageContext.elementRef51.current === port
            });
            let resolveFrameGesturesLayer22 = (road2?: Dynamic, lane2?: Dynamic, status?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let pid2: Dynamic = roomPageContext.pidRef.current ?? null;
              let session3: Dynamic = null;
              try {
                session3 = pid2 ? isDataOperationControlLabel(sessionStorage, pid2).get()?.label ?? null : null;
              } catch {
                session3 = null;
              }
              resolveFrameGesturesLayer2({
                key: key2,
                road: road2,
                lane: lane2,
                status: status,
                pid: pid2,
                session: session3
              });
            };
            let warn: Dynamic = (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ((console as Dynamic).warn(`[lfile] blob hydrate:`, resolveDataContentAndReferencesError2(error4).replace(/\?[^\s]*/g, `?[redacted]`)), error4 instanceof (Error as Dynamic) ? error4.message : String(error4));
            if (editorHostPattern3.test(key2)) {
              let pid2: Dynamic = roomPageContext.pidRef.current;
              if (!pid2) return documentRuntimePort(null, false);
              uniqueItems.add(key2);
              if (isFrameArtifact()) {
                frameBlobBytesResult(pid2, key2).then((response2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                  if (response2.ok) return documentRuntimePort(response2.bytes, false);
                  if (response2.miss === `transient`) {
                    uniqueItems.delete(key2);
                    return documentRuntimePort(null, true);
                  }
                  resolveFrameGesturesLayer22(`live`, `ref`, null);
                  documentRuntimePort(null, false);
                }, (..._extraArguments: unknown[]): undefined => {
                  uniqueItems.delete(key2);
                  documentRuntimePort(null, true);
                });
                return;
              }
              (async (..._extraArguments: unknown[]): Promise<undefined> => {
                documentRuntimePort(new (Uint8Array as Dynamic)(await api.blob.get(`project/` + pid2, key2)));
              })().catch((error4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                let warn2: Dynamic = warn(error4);
                let frameGesturesValue10: Dynamic = resolveFrameGesturesValue10(warn2);
                if (frameGesturesValue10) {
                  resolveFrameGesturesLayer22(`rest`, `ref`, resolveFrameGesturesExec(warn2));
                } else {
                  uniqueItems.delete(key2);
                }
                documentRuntimePort(null, !frameGesturesValue10);
              });
              return;
            }
            if (!/^[0-9a-f]{64}$/.test(key2)) return documentRuntimePort(null, false);
            let element4: Dynamic = roomPageContext.elementRef53.current;
            if (!element4) return documentRuntimePort(null, !roomPageContext.pidRef.current);
            uniqueItems.add(key2);
            api.lfile.blobGet(roomPageContext.dirRef.current, element4, key2).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => documentRuntimePort(new (Uint8Array as Dynamic)(result)), (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let warn2: Dynamic = warn(result);
              let frameGesturesValue10: Dynamic = resolveFrameGesturesValue10(warn2);
              if (frameGesturesValue10) {
                resolveFrameGesturesLayer22(`rest`, `sha`, resolveFrameGesturesExec(warn2));
              } else {
                uniqueItems.delete(key2);
              }
              documentRuntimePort(null, !frameGesturesValue10);
            });
            return;
          }
          if (message?.type === `host-drop-refused`) return resolveDocumentUploadsError(message.refs);
          if (message?.type === `pick-image`) {
            let iframe: Dynamic = roomPageContext.iframeRef.current;
            let hasFocus: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
              let storeState: Dynamic = DataModelSchemasDragging.getState();
              return {
                stale: roomPageContext.navigatedRef.current || roomPageContext.elementRef51.current !== messageChannel3.port1,
                canServe: storeState.intercept?.onPick != null && storeState.imagePicker != null,
                frameIsActive: iframe !== null && (document as Dynamic).activeElement === iframe,
                pageHasFocus: (document as Dynamic).hasFocus()
              };
            };
            let now: number = performance.now();
            if (resolveFrameGesturesStale({
              message: message,
              ...hasFocus(),
              gate: roomPageContext.frameGesturesOpenedAtRef.current,
              now: now,
              frame: iframe?.getBoundingClientRect() ?? null,
              view: {
                width: (window as Dynamic).innerWidth,
                height: (window as Dynamic).innerHeight
              }
            }) === null) return;
            roomPageContext.frameGesturesOpenedAtRef.current = {
              openedAt: now,
              closedAt: roomPageContext.frameGesturesOpenedAtRef.current.closedAt
            };
            let drop2 = (..._extraArguments: unknown[]): undefined => {
              if (roomPageContext.frameGesturesOpenedAtRef.current.openedAt === now) {
                (0, roomPageContext.onClose)();
              }
            };
            let userActivation: Dynamic = (navigator as Dynamic).userActivation;
            resolveFrameGesturesIsActive({
              isActive: userActivation === undefined ? null : (..._extraArguments: unknown[]): Dynamic => userActivation.isActive,
              popupClosedAt: roomPageContext.DocumentRuntimeState9,
              stillOffered: (..._extraArguments: unknown[]): Dynamic => {
                let hasFocus2: Dynamic = hasFocus();
                return !hasFocus2.stale && hasFocus2.canServe && hasFocus2.frameIsActive && hasFocus2.pageHasFocus;
              },
              open: (..._extraArguments: unknown[]): Dynamic => {
                let imagePicker2: Dynamic = (0, roomPageContext.imagePicker)(true);
                if (imagePicker2) {
                  drop2();
                }
                return imagePicker2;
              },
              showButton: (..._extraArguments: unknown[]): Dynamic => {
                let frameGesturesIsFinite: Dynamic = iframe === null ? null : resolveFrameGesturesIsFinite(message, iframe.getBoundingClientRect(), {
                  width: (window as Dynamic).innerWidth,
                  height: (window as Dynamic).innerHeight
                });
                if (frameGesturesIsFinite === null || roomPageContext.frameGesturesOpenedAtRef.current.openedAt !== now) return drop2();
                roomPageContext.enabledRef8.current = true;
                (0, roomPageContext.setInsertMenuAnchor)(frameGesturesIsFinite);
              },
              drop: drop2,
              now: (..._extraArguments: unknown[]): number => performance.now(),
              later: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => void setTimeout(roomDocumentPage, options)
            });
            return;
          }
          if (message?.type !== `paste-files` || !Array.isArray(message.files)) return;
          let filteredFiles: Dynamic = message.files.filter((file?: Dynamic, ..._extraArguments: unknown[]) => file instanceof (File as Dynamic));
          let g5: Dynamic = typeof message.g == `number` && Number.isSafeInteger(message.g) && message.g < 0 ? message.g : undefined;
          let postMessage = (items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (roomPageContext.navigatedRef.current || !port) return;
            let record5: Dynamic = {
              type: `host-drop`,
              items: items2,
              x: null,
              y: null,
              g: g5
            };
            port.postMessage(record5);
          };
          if (!filteredFiles.length) return postMessage([]);
          let frameGesturesOpen: Dynamic = resolveFrameGesturesOpen(roomPageContext.recordRef6.current, filteredFiles, resolveDocumentUploadsValue(), (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!roomPageContext.navigatedRef.current && port) {
              port.postMessage(roomDocumentPage);
            }
          }, undefined, g5);
          let postMessage2 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            frameGesturesOpen();
            postMessage(roomDocumentPage);
          };
          handleHostDropFiles(filteredFiles, {
            dir: roomPageContext.dirRef.current,
            fileRef: roomPageContext.elementRef54.current,
            rev: roomPageContext.elementRef55.current,
            room: (0, roomPageContext.roomDocumentPageHandler2)()
          }).then(postMessage2, (..._extraArguments: unknown[]): Dynamic => postMessage2([]));
        });
        messageChannel3.port1.start();
        messageChannel3.port1.postMessage({
          type: `image-picker`,
          available: DataModelSchemasDragging.getState().imagePicker != null
        });
        let messageChannel4: Dynamic = new (MessageChannel as Dynamic)();
        roomPageContext.elementRef52.current = messageChannel4.port1;
        messageChannel4.port1.addEventListener(`message`, (..._extraArguments: unknown[]): undefined => {
          if (!roomPageContext.navigatedRef.current) {
            DataModelSchemasDragging.getState().iframeDragEnter();
          }
        });
        messageChannel4.port1.start();
        let issue: Dynamic = roomPageContext.frameMessengerRef.current.issue(contentWindow, (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef25.current(roomDocumentPage), (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef26.current());
        roomDocumentPageResult35 = [messageChannel.port2, messageChannel2.port2, messageChannel3.port2, messageChannel4.port2, issue];
      }
      let label2: string = roomPageContext.room ? `room:${roomPageContext.room.pid}/${roomPageContext.room.fileId}` : `fs:${roomPageContext.container}/${roomPageContext.elementRef53.current ?? roomPageContext.path}`;
      if (roomDocumentPageResult35 && roomPageContext.room && roomPageContext.elementRef22.current === null) {
        roomPageContext.elementRef22.current = (..._extraArguments: unknown[]): Dynamic => clearPendingTabRename(label2);
      }
      let enabled6: boolean = !!roomDocumentPageResult35 && !roomPageContext.readOnly2 && roomPageContext.elementRef57.current !== label2 && !(!roomPageContext.room && roomPageContext.elementRef53.current === undefined && roomPageContext.elementRef57.current !== null) && roomPageContext.elementRef45.current === undefined && roomPageContext.elementRef44.current === undefined && !matchesElement2;
      let matchesRoomDocumentPageResult: boolean = roomDocumentPageResult34 !== undefined && !documentRuntimeReadOnly3.readonly;
      let enabled7: Dynamic = enabled6 || matchesRoomDocumentPageResult;
      let matchesVerdict: Dynamic = roomPageContext.room ? roomPageContext.responseRef.current.verdict === `writer` : roomPageContext.primeAuthoritySettledRef.current;
      let matchesVerdict2: boolean = roomPageContext.room ? roomPageContext.responseRef.current.verdict === undefined : !roomPageContext.primeAuthoritySettledRef.current;
      if (roomDocumentPageResult35) {
        roomPageContext.elementRef57.current = label2;
        roomPageContext.enabledRef10.current = !roomPageContext.room && roomPageContext.elementRef53.current === undefined;
      }
      let bornHere2: Dynamic = roomPageContext.bornHereRef.current && !documentRuntimeSet3.has(roomPageContext.container);
      if (roomDocumentPageResult35 && roomPageContext.bornHereRef.current) {
        documentRuntimeSet3.add(roomPageContext.container);
      }
      let bornHere3: Dynamic = bornHere2 || (window as Dynamic).__LFILE_GHOST_CARET === true;
      let bumpAskModuleTick3: Dynamic = roomDocumentPageResult35 ? (0, roomPageContext.bumpAskModuleTick2)() : null;
      let matchesBumpAskModuleTick: Dynamic = bumpAskModuleTick3 !== null && markAskCardLoweringDebt(roomPageContext.initialAskCardRecoveryStateRef.current, isCommentSessionFeatureDisabled());
      let record4: Dynamic = {
        type: `mount`,
        file: roomPageContext.useDocumentInteractionOverlays22.file,
        tier: tier2,
        readonly: documentRuntimeReadOnly3.readonly,
        viewOnly: documentRuntimeReadOnly3.viewOnly || undefined,
        commentOnly: documentRuntimeReadOnly3.commentOnly || undefined,
        phone: documentRuntimeReadOnly3.commentOnly && roomPageContext.phoneRef.current || undefined,
        hostMenu: roomPageContext.recordRef.current.on || undefined,
        hostMenuFolds: roomPageContext.recordRef.current.folds || undefined,
        phoneEdit: !documentRuntimeReadOnly3.readonly && roomPageContext.phoneRef.current ? `always` : undefined,
        user: roomPageContext.memoizedRef.current,
        sig: roomDocumentPageResult35 ? roomPageContext.labelRef.current : undefined,
        primeNonce: roomDocumentPageResult35 ? roomPageContext.isDocumentSelectionRandomUUIDRef.current.mint() : undefined,
        hostKeys: roomDocumentPageResult35 && roomPageContext.frameMountEpoch === roomPageContext.elementRef38.current ? roomPageContext.elementRef39.current?.take() : undefined,
        scrollY: matchesElement2 ? undefined : roomPageContext.elementRef44.current,
        restoreSel: matchesRoomDocumentPageResult ? roomDocumentPageResult34 : undefined,
        restoreLate: matchesRoomDocumentPageResult && isPlatformFrameAndCapabilitiesWindow() ? true : undefined,
        ...getDocumentRuntimeHoldMs(),
        ...(resolvePlatformFeatureFlagsEnabled2(`untieLateRows`) ? {} : {
          untieLateRows: false
        }),
        ...(resolvePlatformFeatureFlagsEnabled2(`widgetGuard`) ? {} : {
          widgetGuard: false
        }),
        ...resolveDocumentCommandsArtifactLinkChips(roomPageContext.documentCommandsSaidRef.current, resolvePlatformFeatureFlagsEnabled2(`artifactLinkChips`), resolvePlatformFeatureFlagsValue5(`artifactLinkChips`)),
        hostOrigin: resolveCommentsActionsAndSelectionLocalhost(),
        container: roomPageContext.pidRef.current,
        emitAmbientSel: roomDocumentPageResult35 && (DocumentRuntimeSearch || DocumentRuntimeState6) && roomPageContext.room ? true : undefined,
        // BaoCut: 独立工具栏（三处之三）。让编辑器回报光标处的格式（format-state），工具栏按钮的可用 / 选中状态靠它；
        // 原版只在 Frame 里打开（DocumentRuntimeState6 是 Frame 判断），这里去掉这个条件。
        emitFormatState: roomDocumentPageResult35 && roomPageContext.room ? true : undefined,
        askClaude: roomDocumentPageResult35 && !DocumentRuntimeState6 ? true : undefined,
        shortcutSheet: roomDocumentPageResult35 && roomPageContext.shortcutSheetRef.current ? true : undefined,
        primeCaret: enabled7 && matchesVerdict ? true : undefined,
        ghostCaret: enabled6 && bornHere3 ? true : undefined,
        frameChrome: roomDocumentPageResult35 && DocumentRuntimeState6 ? true : undefined,
        devTrace: roomDocumentPageResult35 && (window as Dynamic).__OPTRACE_ON === true ? true : undefined,
        shadow: roomDocumentPageResult35 && (window as Dynamic).__LFILE_SHADOW === true ? true : undefined,
        claudeWriting: bumpAskModuleTick3?.claudeWriting,
        claudeWritingLater: bumpAskModuleTick3?.later ? true : undefined,
        ...(matchesBumpAskModuleTick && {
          pageLowered: true
        })
      };
      if (roomDocumentPageResult35) {
        roomPageContext.enabledRef4.current = enabled7 && matchesVerdict2;
      }
      if (roomDocumentPageResult35 && !(enabled7 && (matchesVerdict || matchesVerdict2))) {
        roomPageContext.elementRef6.current?.noPrime();
      }
      if (record4.primeCaret) {
        roomPageContext.isDocumentSelectionRandomUUIDRef.current.arm();
      }
      if (roomDocumentPageResult35) {
        contentWindow.postMessage(record4, `*`, roomDocumentPageResult35);
      } else {
        roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
      }
    } else {
      let record4: Dynamic = {
        type: `update`,
        file: roomPageContext.useDocumentInteractionOverlays22.file
      };
      roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
    }
    if (enabled5) {
      let record4: Dynamic = {
        type: `follow`,
        uid: roomPageContext.roomDocumentPageResultRef5.current
      };
      roomPageContext.frameMessengerRef.current.send(contentWindow, record4);
      if (matchesElement2) {
        roomPageContext.frameMessengerRef.current.send(contentWindow, DocumentFrameFrag.jumpFor(hashSlice, true));
      }
      if (roomPageContext.elementRef44.current !== undefined && !matchesElement2) {
        roomPageContext.countRef3.current = roomPageContext.elementRef44.current;
      }
      roomPageContext.elementRef44.current = undefined;
      roomPageContext.elementRef45.current = undefined;
      let storeState: Dynamic = useCommentStore.getState();
      let documentRuntimeActiveId: Dynamic = resolveDocumentRuntimeActiveId(storeState);
      if (documentRuntimeActiveId) {
        let record5: Dynamic = {
          type: `comment-active`,
          id: documentRuntimeActiveId,
          focus: resolveDocumentRuntimeFocusId(storeState),
          peers: [...resolveDocumentRuntimeActiveId2(storeState)]
        };
        roomPageContext.frameMessengerRef.current.send(contentWindow, record5);
      }
    }
  }, [roomPageContext.useDocumentInteractionOverlays22, roomPageContext.ready, roomPageContext.readOnly2, roomPageContext.commentsReadOnly2, roomPageContext.commentOnly]);
}

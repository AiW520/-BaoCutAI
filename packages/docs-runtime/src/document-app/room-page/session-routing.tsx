import { CLAUDE_REQUEST_STOP_MESSAGES, CLAUDE_WAITING_FOR_ANSWER_MESSAGE, CLAUDE_WRITING_OUTCOME_MESSAGES, notifyClaudeReplied } from "../comment-notifications/create-comment-notice-coordinator";
import { commentSessionIdentity, getCommentSessionValue } from "../comment-session/ask-suggestions-measure";
import { updateCommentNotificationsSet } from "../comment-notifications/state";
import { React } from "../bootstrap";
import { useDocumentContextWarm } from "../document-context/create-widget-writing-coordinator";
import { WidgetBridgeHost } from "../widget-bridge/widget-sample-card";
import { measureTabsSidebarViewport } from "../document-chrome";
import { DocumentRuntime_Styles5 } from "../document-runtime/widget-provenance-gutter";

/** BaoCut: room document session routing; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { Af as quietCarrierThreads, Ap as resolvePlatformAnnouncementsValue2, Cm as DataModelSchemasPending, Di as EditorSelectionAndTablesDataPagesPrintSurface, En as resolvePlatformLiveDocumentAndHistoryNodeId, Gf as useCommentStore, Hm as resolveDataModelSchemasTarget, Id as resolveCommentsStoreLayer, Rl as resolveEditorHostValue23, Tf as landedSummon, bf as heldThreads, df as carrierSettled, gj as PlatformSessionAndSourcesClaudeRepliedInTheComments, jf as quietCarrierWritten, kp as resolvePlatformAnnouncementsValue, lf as carrierBaselineOf, rm as resolveDataModelSchemasAgentRows, sm as filterDataModelSchemasFilter3, uf as carrierBooked, vm as resolveDataModelSchemasSent, yj as PlatformSessionAndSourcesSent } from "../../platform/index";
import { _ as recordFramePhase } from "../../boot/environment";
export function runRoomPage57RoomDocumentPageHandler(roomPageContext: {}): Dynamic {
  return {
    ["roomDocumentPageHandler"]: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => {
      let count = 0;
      for (let roomDocumentPageResult34 of heldThreads(roomDocumentPage) as Dynamic) if (roomDocumentPageResult34.id === options) {
        count = Math.max(count, filterDataModelSchemasFilter3(roomDocumentPageResult34));
      }
      return count;
    }
  }["roomDocumentPageHandler"];
}
export function runRoomPage58Effect(roomPageContext: {
  askCardModRef: Dynamic;
  elementRef: Dynamic;
  elementRef15: Dynamic;
  elementRef17: Dynamic;
  elementRef18: Dynamic;
  elementRef4: Dynamic;
  inlineAskHost: Dynamic;
  lookupRef2: Dynamic;
  sessionLineRef: Dynamic;
  sessionRunsRef: Dynamic;
  setInlineAskNotice: Dynamic;
  uniqueItemsRef4: Dynamic;
  uniqueItemsRef5: Dynamic;
  waitingSideRef: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef17.current = (..._extraArguments: unknown[]): Dynamic => {
    let storeState: Dynamic = useCommentStore.getState();
    let sessionRuns: Dynamic = roomPageContext.sessionRunsRef.current;
    let roomDocumentPageHandler6 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => {
      let record4: Dynamic = {
        agentRows: carrierBaselineOf(roomDocumentPage)
      };
      for (let roomDocumentPageResult34 of heldThreads(storeState) as Dynamic) if (roomDocumentPageResult34.id === roomDocumentPage && resolveDataModelSchemasAgentRows(record4, roomDocumentPageResult34)) return true;
      return false;
    };
    let element4: Dynamic = roomPageContext.elementRef.current;
    if (element4 !== null && (sessionRuns?.live() ?? null) === null && roomDocumentPageHandler6(element4.threadId)) {
      roomPageContext.elementRef.current = null;
      roomPageContext.elementRef18.current(element4.threadId);
      if (roomPageContext.inlineAskHost.current()?.nonce === element4.card && !roomPageContext.uniqueItemsRef4.current.has(element4.card) && roomPageContext.elementRef15.current(element4.card)) {
        roomPageContext.elementRef4.current(element4.card, `replied`);
      }
      let ASKCARDWORDS: Dynamic = roomPageContext.askCardModRef.current?.ASK_CARD_WORDS;
      if (ASKCARDWORDS !== undefined) {
        (0, roomPageContext.setInlineAskNotice)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === ASKCARDWORDS.waiting_on_you || roomDocumentPage === ASKCARDWORDS.no_answer ? null : roomDocumentPage);
      }
      return;
    }
    if (element4 !== null && (sessionRuns?.live() ?? null) === null && storeState.summonNotes[element4.threadId] !== `needs_user`) {
      let ASKCARDWORDS: Dynamic = roomPageContext.askCardModRef.current?.ASK_CARD_WORDS;
      if (ASKCARDWORDS !== undefined) {
        (0, roomPageContext.setInlineAskNotice)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === ASKCARDWORDS.waiting_on_you ? ASKCARDWORDS.no_answer : roomDocumentPage);
      }
    }
    let live: Dynamic = sessionRuns?.live() ?? null;
    let threadOf: Dynamic = sessionRuns && live !== null ? sessionRuns.threadOf(live) : null;
    for (let roomDocumentPageResult34 of quietCarrierThreads as Dynamic) {
      if (roomDocumentPageResult34 === threadOf || quietCarrierWritten.has(roomDocumentPageResult34) || roomPageContext.uniqueItemsRef5.current.has(roomDocumentPageResult34) || !roomDocumentPageHandler6(roomDocumentPageResult34) || roomPageContext.waitingSideRef.current?.holdsReply(roomDocumentPageResult34) === true) continue;
      if (roomPageContext.elementRef.current?.threadId === roomDocumentPageResult34) {
        roomPageContext.elementRef.current = null;
      }
      roomPageContext.elementRef18.current(roomDocumentPageResult34);
      let nonce4: Dynamic = roomPageContext.inlineAskHost.current()?.nonce;
      if (nonce4 !== undefined && !roomPageContext.uniqueItemsRef4.current.has(nonce4) && roomPageContext.sessionLineRef.current?.card === nonce4 && roomPageContext.lookupRef2.current.get(nonce4) === roomDocumentPageResult34 && (sessionRuns?.live() ?? null) === null && roomPageContext.elementRef15.current(nonce4)) {
        roomPageContext.elementRef4.current(nonce4, `replied`);
      }
    }
    if (!sessionRuns || threadOf === null) return;
    {
      let summonNoteItem2: Dynamic = storeState.summonNotes[threadOf];
      if (summonNoteItem2 === `needs_user`) {
        (0, roomPageContext.setInlineAskNotice)(CLAUDE_WAITING_FOR_ANSWER_MESSAGE);
      } else {
        if (summonNoteItem2 === `queued`) {
          (0, roomPageContext.setInlineAskNotice)(PlatformSessionAndSourcesSent.queued);
        } else {
          if (summonNoteItem2 !== undefined) {
            (0, roomPageContext.setInlineAskNotice)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === `Claude is waiting for your answer in your session.` || roomDocumentPage === PlatformSessionAndSourcesSent.queued ? null : roomDocumentPage);
          }
        }
      }
    }
    if (roomDocumentPageHandler6(threadOf)) return sessionRuns.threadSaid(threadOf, `replied`);
    let summonNoteItem: Dynamic = storeState.summonNotes[threadOf];
    if (summonNoteItem !== undefined) {
      if (summonNoteItem === `ended` || summonNoteItem === `stopped` || summonNoteItem === `no_reply`) return sessionRuns.threadSaid(threadOf, `over`);
      if (resolveDataModelSchemasSent(summonNoteItem)) return sessionRuns.threadSaid(threadOf, `refused`, roomPageContext.askCardModRef.current?.askCardReasonOf(summonNoteItem, getCommentSessionValue(threadOf)));
      sessionRuns.delivered(threadOf);
    }
  };
}
export function runRoomPage59Effect(roomPageContext: {
  elementRef19: Dynamic;
  elementRef20: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef20.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let element4: Dynamic = roomPageContext.elementRef19.current;
    if (!(element4 === null || roomDocumentPage !== undefined && element4.card !== roomDocumentPage)) {
      window.clearTimeout(element4.timer);
      roomPageContext.elementRef19.current = null;
    }
  };
}
export function runRoomPage60Effect(roomPageContext: {
  elementRef18: Dynamic;
  uniqueItemsRef5: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef18.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.uniqueItemsRef5.current.has(roomDocumentPage)) {
      roomPageContext.uniqueItemsRef5.current.add(roomDocumentPage);
      carrierSettled(roomDocumentPage);
      useCommentStore.getState().setSurfaceCarrier(roomDocumentPage);
      resolvePlatformAnnouncementsValue(document, PlatformSessionAndSourcesClaudeRepliedInTheComments, {
        key: `summon:${roomDocumentPage}`
      });
      notifyClaudeReplied(roomDocumentPage, {
        openList: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => updateCommentNotificationsSet().set(true, roomDocumentPage2)
      });
    }
  };
}
export function runRoomPage61Effect(roomPageContext: {
  resummonSessionRef: Dynamic;
  roomDocumentPageHandler: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
}): Dynamic {
  return roomPageContext.resummonSessionRef.current = (roomDocumentPage?: Dynamic, threadId?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let sessionLine: Dynamic = roomPageContext.sessionLineRef.current;
    if (!(sessionLine === null || sessionLine.card !== roomDocumentPage)) {
      carrierBooked(threadId, Date.now(), (0, roomPageContext.roomDocumentPageHandler)(useCommentStore.getState(), threadId));
      useCommentStore.getState().setSummonNote(threadId, null);
      landedSummon({
        threadId: threadId,
        body: roomPageContext.sessionModRef.current?.carrierBodyOf(sessionLine.words.body) ?? sessionLine.words.body,
        to: sessionLine.words.to,
        summon: true,
        sendFirst: true,
        ...(sessionLine.block && {
          block: sessionLine.block
        }),
        ...(sessionLine.y !== undefined && {
          y: sessionLine.y
        })
      });
    }
  };
}
export function runRoomPage62Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askInvitationKinds: Dynamic;
  elementRef20: Dynamic;
  elementRef3: Dynamic;
  elementRef4: Dynamic;
  elementRef8: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  leavingAskCardRef: Dynamic;
  navigatedRef: Dynamic;
  selbarPortRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionSendingRef: Dynamic;
  setInlineAskNotice: Dynamic;
  setLeavingAskCard: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef4.current = (nonce4?: Dynamic, how?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
    let askCardMod: Dynamic = roomPageContext.askCardModRef.current;
    if (!(!askCardDesk || !askCardMod || roomPageContext.inlineAskHost.current()?.nonce !== nonce4)) {
      window.clearTimeout(roomPageContext.askFailureTimerRef.current);
      if (how === `marked`) {
        askCardDesk.handedOn(nonce4);
      }
      if ((how === `written` || how === `replied` || how === `marked`) && askCardMod.easeOutTakesKeyboard({
        how: how,
        at: askCardMod.easeOutKeyboardAt(document, nonce4),
        pageHasFocus: document.hasFocus()
      })) {
        roomPageContext.iframeRef.current?.focus({
          preventScroll: true
        });
      }
      if (!roomPageContext.navigatedRef.current) {
        roomPageContext.selbarPortRef.current?.postMessage({
          type: `inline-ask-fold`,
          nonce: nonce4,
          ...(how === `written` && {
            landed: true
          })
        });
      }
      (0, roomPageContext.setInlineAskNotice)(null);
      roomPageContext.leavingAskCardRef.current = nonce4;
      (0, roomPageContext.setLeavingAskCard)(nonce4);
      window.clearTimeout(roomPageContext.elementRef8.current);
      roomPageContext.elementRef8.current = window.setTimeout((..._extraArguments: unknown[]): undefined => {
        let finish = (..._extraArguments: unknown[]): undefined => {
          askCardDesk.written(nonce4);
          roomPageContext.askInvitationKinds.current.delete(nonce4);
          roomPageContext.sessionCardsRef.current.delete(nonce4);
          roomPageContext.elementRef20.current(nonce4);
          if (roomPageContext.leavingAskCardRef.current === nonce4) {
            roomPageContext.leavingAskCardRef.current = null;
          }
          (0, roomPageContext.setLeavingAskCard)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === nonce4 ? null : roomDocumentPage);
          if (roomPageContext.inlineAskHost.current()?.nonce === nonce4) {
            roomPageContext.inlineAskHost.cancel({
              restoreCaret: false
            });
          }
          if (roomPageContext.inlineAskHost.current()?.nonce === nonce4) {
            let firstElementChild = document.querySelector(`[data-inline-ask="${nonce4}"]`)?.firstElementChild;
            if (firstElementChild instanceof HTMLElement) {
              roomPageContext.inlineAskHost.height(nonce4, firstElementChild.offsetHeight);
            }
          }
        };
        if (roomPageContext.sessionSendingRef.current === nonce4 && roomPageContext.inlineAskHost.isSending()) {
          roomPageContext.elementRef3.current = {
            card: nonce4,
            finish: finish
          };
        } else {
          finish();
        }
      }, window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches ? 0 : askCardMod.ASK_CARD_OUT_MS);
      if (how === `written`) {
        resolvePlatformAnnouncementsValue(document, CLAUDE_WRITING_OUTCOME_MESSAGES.finished, {
          key: `inline-ask`
        });
      }
    }
  };
}
export function runRoomPage63Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  elementRef: Dynamic;
  elementRef16: Dynamic;
  elementRef18: Dynamic;
  elementRef4: Dynamic;
  inlineAskHost: Dynamic;
  lookupRef2: Dynamic;
  navigatedRef: Dynamic;
  routeSideRef: Dynamic;
  selbarPortRef: Dynamic;
  sessionEndedRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionRouteSendRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionStoppedRef: Dynamic;
  sessionWaitRef: Dynamic;
  setInlineAskNotice: Dynamic;
}): Dynamic {
  return roomPageContext.sessionEndedRef.current = (nonce4?: Dynamic, how?: Dynamic, threadId?: Dynamic, delivered?: Dynamic, argument?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
    let askCardMod: Dynamic = roomPageContext.askCardModRef.current;
    if (roomPageContext.sessionWaitRef.current?.card === nonce4) {
      roomPageContext.sessionWaitRef.current = null;
    }
    resolveCommentsStoreLayer(`host`, `claude_session_run`, {
      what: `ended`,
      how: how,
      delivered: delivered
    });
    if (threadId !== null) {
      roomPageContext.lookupRef2.current.set(nonce4, threadId);
    }
    if (threadId === null && how !== `stopped` && how !== `written` && how !== `reset` && roomPageContext.sessionRouteSendRef.current?.card === nonce4 && !roomPageContext.sessionRouteSendRef.current.fellBack) {
      roomPageContext.sessionRouteSendRef.current.dead = true;
      if (how === `timeout`) {
        roomPageContext.sessionRouteSendRef.current.bound = true;
      }
    }
    if (how === `written` && argument && threadId !== null) {
      quietCarrierWritten.add(threadId);
    }
    if (threadId !== null && !threadId.startsWith(`route:`) && (how === `written` && argument || !delivered && (how === `failed` || how === `timeout` || how === `stopped` || how === `ended`))) {
      carrierSettled(threadId);
    }
    if ((how === `failed` || how === `timeout` || how === `stopped` || how === `ended`) && !roomPageContext.navigatedRef.current) {
      roomPageContext.selbarPortRef.current?.postMessage({
        type: `inline-ask-revert`,
        nonce: nonce4
      });
    }
    if (how === `timeout` || how === `ended`) {
      roomPageContext.sessionLateRef.current = nonce4;
      if (threadId !== null) {
        roomPageContext.elementRef.current = {
          card: nonce4,
          threadId: threadId
        };
      }
    } else {
      if (how === `stopped`) {
        roomPageContext.sessionStoppedRef.current = nonce4;
        if (roomPageContext.sessionRouteSendRef.current?.card === nonce4) {
          roomPageContext.sessionRouteSendRef.current.stopped = true;
        }
      } else {
        if (roomPageContext.sessionRunsRef.current?.live() === null) {
          roomPageContext.elementRef16.current(false);
        }
      }
    }
    if (how === `stopped`) {
      resolvePlatformAnnouncementsValue(document, CLAUDE_REQUEST_STOP_MESSAGES.stopped_waiting, {
        key: `inline-ask`
      });
    }
    if (how === `failed` || how === `timeout` || how === `ended`) {
      resolvePlatformAnnouncementsValue2(document, `inline-ask`);
    }
    if (how === `failed`) {
      roomPageContext.inlineAskHost.abandon(nonce4);
    }
    if (!(!askCardDesk || !askCardMod)) {
      if (how === `failed` || how === `timeout` || how === `ended`) {
        let matchesHow: Dynamic = how === `timeout` && delivered && threadId !== null && commentSessionIdentity(threadId) === `needs_user` && useCommentStore.getState().summonNotes[threadId] === `needs_user`;
        if (askCardDesk.unsent(nonce4, how)) {
          (0, roomPageContext.setInlineAskNotice)(how === `failed` && roomPageContext.routeSideRef.current?.lineLost(nonce4) === true ? askCardMod.ASK_CARD_WORDS.no_spot : how === `failed` ? askCardMod.askCardReasonLine(roomPageContext.sessionRunsRef.current?.failedWhy(nonce4, threadId)) : delivered ? matchesHow ? askCardMod.ASK_CARD_WORDS.waiting_on_you : askCardMod.ASK_CARD_WORDS.no_answer : askCardMod.ASK_CARD_WORDS.unsent);
        }
        return;
      }
      if (!(how !== `written` && how !== `replied`)) {
        if (askCardDesk.inHand() === nonce4) {
          roomPageContext.elementRef4.current(nonce4, how);
          if (how === `replied` && threadId !== null) {
            roomPageContext.elementRef18.current(threadId);
          }
        }
      }
    }
  };
}
export function runRoomPage64Effect(roomPageContext: {
  inlineAskHost: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => DataModelSchemasPending.subscribe((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (roomDocumentPage.pending !== options.pending) for (let roomDocumentPageResult34 of roomPageContext.inlineAskHost.tracking().keys() as Dynamic) {
      let pendingItem: Dynamic = options.pending[roomDocumentPageResult34];
      if (roomDocumentPage.pending[roomDocumentPageResult34] !== undefined || pendingItem === undefined) continue;
      let enabled5 = false;
      for (let roomDocumentPageResult35 of heldThreads(useCommentStore.getState()) as Dynamic) if (roomDocumentPageResult35.id === roomDocumentPageResult34) {
        enabled5 = resolveDataModelSchemasAgentRows(pendingItem, roomDocumentPageResult35);
        break;
      }
      roomPageContext.inlineAskHost.threadSettled(roomDocumentPageResult34, enabled5 ? `answered` : `no_reply`);
    }
  }), [roomPageContext.inlineAskHost]);
}
export function runRoomPage65Seat(roomPageContext: {
  elementRef23: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    roomPageContext.iframeRef.current = roomDocumentPage;
    if (roomDocumentPage) {
      roomPageContext.elementRef23.current.reset();
    }
    if (roomDocumentPage) {
      roomPageContext.frameMessengerRef.current.reset();
    }
    if (roomDocumentPage) {
      recordFramePhase(`editorFrameCreated`);
    }
  }, []);
}
export function runRoomPage66UseDocumentContextWarm2(roomPageContext: {
  room: Dynamic;
  seat: Dynamic;
  titleRef: Dynamic;
}): Dynamic {
  return useDocumentContextWarm({
    pid: roomPageContext.room?.pid,
    seat: roomPageContext.seat,
    dress: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomDocumentPage.setAttribute(`aria-label`, roomPageContext.titleRef.current);
      roomDocumentPage.setAttribute(`data-testid`, `ldoc-iframe`);
      roomDocumentPage.setAttribute(EditorSelectionAndTablesDataPagesPrintSurface, ``);
    }
  });
}
export function runRoomPage67Effect(roomPageContext: {
  elementRef33: Dynamic;
  recordRef2: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let record4: Dynamic = roomPageContext.recordRef2.current;
    let updatePending = (..._extraArguments: unknown[]): undefined => {
      record4.pending = undefined;
    };
    window.addEventListener(`hashchange`, updatePending);
    let setTimeout2 = setTimeout((..._extraArguments: unknown[]): undefined => {
      roomPageContext.elementRef33.current = {
        frag: resolvePlatformLiveDocumentAndHistoryNodeId(location.hash.slice(1))
      };
    }, 0);
    return (..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`hashchange`, updatePending);
      clearTimeout(setTimeout2);
      clearTimeout(record4.timer);
    };
  }, []);
}
export function runRoomPage68RailSync(roomPageContext: {
  elementRef40: Dynamic;
  elementRef41: Dynamic;
}): Dynamic {
  return (0, React.useMemo)((..._extraArguments: unknown[]): Dynamic => new (WidgetBridgeHost as Dynamic)({
    dropPending: (..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.elementRef40.current) {
        clearTimeout(roomPageContext.elementRef40.current.timer);
      }
      roomPageContext.elementRef40.current = null;
    },
    flushPending: (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef41.current?.()
  }), []);
}
export function runRoomPage69Round(roomPageContext: {
  elementRef42: Dynamic;
  elementRef43: Dynamic;
  iframeRef: Dynamic;
  useWidgetBridgeStickPx5: Dynamic;
  wideRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((..._extraArguments: unknown[]) => {
    let element4: Dynamic = roomPageContext.elementRef42.current;
    let parentElement: Dynamic = element4?.parentElement;
    let iframe: Dynamic = roomPageContext.iframeRef.current;
    if (!element4 || !parentElement || !iframe) {
      roomPageContext.elementRef43.current = null;
      return false;
    }
    let iframeBounds: Dynamic = iframe.getBoundingClientRect();
    let parentElementBounds: Dynamic = parentElement.getBoundingClientRect();
    roomPageContext.useWidgetBridgeStickPx5.current = {
      top: iframeBounds.top - parentElementBounds.top,
      height: iframeBounds.height
    };
    roomPageContext.elementRef43.current = {
      width: iframeBounds.width,
      height: iframeBounds.height
    };
    element4.style.left = Math.round(iframeBounds.left - parentElementBounds.left + resolveEditorHostValue23(iframeBounds.width, roomPageContext.wideRef.current) + 24) + `px`;
    return true;
  }, [roomPageContext.useWidgetBridgeStickPx5]);
}
export function runRoomPage70Round2(roomPageContext: {
  elementRef42: Dynamic;
  elementRef43: Dynamic;
  round: Dynamic;
  setLane: Dynamic;
  useWidgetBridgeStickPx3: Dynamic;
  useWidgetBridgeStickPx6: Dynamic;
  wideRef: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!roomPageContext.elementRef42.current) return;
    if (roomPageContext.elementRef43.current === null) {
      (0, roomPageContext.round)();
    }
    let element4: Dynamic = roomPageContext.elementRef43.current;
    let measureTabsSidebarViewport2 = element4 ? measureTabsSidebarViewport(roomDocumentPage, options, element4.width, element4.height) : null;
    if (!element4 || !measureTabsSidebarViewport2) {
      roomPageContext.useWidgetBridgeStickPx3.current = null;
      (0, roomPageContext.setLane)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2 === null ? roomDocumentPage2 : null);
      return;
    }
    roomPageContext.useWidgetBridgeStickPx3.current = measureTabsSidebarViewport2.docTop;
    let difference = measureTabsSidebarViewport2.left - Math.round(resolveEditorHostValue23(element4.width, roomPageContext.wideRef.current));
    (0, roomPageContext.setLane)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2 === difference ? roomDocumentPage2 : difference);
    (0, roomPageContext.useWidgetBridgeStickPx6)(options);
  }, [roomPageContext.round, roomPageContext.useWidgetBridgeStickPx6, roomPageContext.useWidgetBridgeStickPx3]);
}
export function runRoomPage71Effect(roomPageContext: {
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  lane: Dynamic;
  matchesLeftOverlayHost: Dynamic;
  navigatedRef: Dynamic;
  ready: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
    if (!(roomPageContext.matchesLeftOverlayHost || roomPageContext.lane !== null || !contentWindow || !roomPageContext.ready || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `comment-census`
      });
    }
  }, [roomPageContext.matchesLeftOverlayHost, roomPageContext.lane, roomPageContext.ready]);
}
export function runRoomPage72Effect(roomPageContext: {
  leftOverlayHost: Dynamic;
  onScrollDocRef: Dynamic;
  useWidgetBridgeStickPx4: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let leftOverlayHost2: Dynamic = roomPageContext.leftOverlayHost;
    if (!leftOverlayHost2) return;
    let roomDocumentPageHandler6 = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => void resolveDataModelSchemasTarget(roomDocumentPage, leftOverlayHost2, leftOverlayHost2, DocumentRuntime_Styles5, roomPageContext.useWidgetBridgeStickPx4.current, (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.onScrollDocRef.current(roomDocumentPage2));
    leftOverlayHost2.addEventListener(`wheel`, roomDocumentPageHandler6, {
      passive: false
    });
    return (..._extraArguments: unknown[]): Dynamic => leftOverlayHost2.removeEventListener(`wheel`, roomDocumentPageHandler6);
  }, [roomPageContext.leftOverlayHost, roomPageContext.useWidgetBridgeStickPx4]);
}

import { React, mapPreloadDependencies } from "../bootstrap";
import { updateDocumentSourcePromptDelete } from "../room-document-page/state";
import { ensureSessionRouteModule, getSessionRouteModule, isCommentSessionFeatureDisabled } from "../comment-notifications/create-comment-notice-coordinator";
import { resolveDocumentCommandsValue3 } from "../document-commands/create-selection-ask-coordinator";
import { updateCommentNotificationsSet } from "../comment-notifications/state";
import { reportCommentSessionEvent } from "../comment-session/clear-comment-session-thread-id";

/** BaoCut: room document ask commands; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  frameFenceAuthor,
  isDataModelSchemasKind3,
  observabilityBrowserAndOperationEventsPattern22,
  quietCarrierWritten,
  resolveCommentsStoreLayer,
  resolvePlatformFeatureFlagsEnabled2,
} from "../../platform/index";
import { preloadModule } from "../../boot/preload";
export function runRoomPage50Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  elementRef7: Dynamic;
  elementRef9: Dynamic;
  inlineAskHost: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element4 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (event.key !== `Escape` || event.defaultPrevented || event.isComposing) return;
      let element5: Dynamic = roomPageContext.elementRef7.current;
      if (element5 !== null) {
        let activeElement2 = document.activeElement;
        if (activeElement2 === null || activeElement2 === document.body || activeElement2 instanceof HTMLElement && activeElement2.closest(`[data-inline-ask="${element5}"]`) !== null) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      let inHand: Dynamic = roomPageContext.askCardDeskRef.current?.inHand() ?? null;
      if (inHand === null || roomPageContext.inlineAskHost.current()?.nonce !== inHand) return;
      let activeElement = document.activeElement;
      let amount = activeElement instanceof HTMLElement && activeElement.closest(`[data-inline-ask="${inHand}"]`) !== null;
      if (!(activeElement !== null && activeElement !== document.body && !amount)) {
        event.preventDefault();
        event.stopPropagation();
        roomPageContext.elementRef9.current(inHand);
      }
    };
    window.addEventListener(`keydown`, element4, true);
    return (..._extraArguments: unknown[]) => window.removeEventListener(`keydown`, element4, true);
  }, [roomPageContext.inlineAskHost]);
}
export function runRoomPage51Effect(roomPageContext: {
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  elementRef11: Dynamic;
  inlineAskHost: Dynamic;
  onPost: Dynamic;
  selbarPortRef: Dynamic;
  setInlineAskNotice: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef11.current = (nonce4?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
    let askCardMod: Dynamic = roomPageContext.askCardModRef.current;
    if (!askCardDesk || !askCardMod) return;
    askCardDesk.decided(nonce4, options);
    if (options === `write`) {
      roomPageContext.selbarPortRef.current?.postMessage({
        type: `inline-ask-write`,
        nonce: nonce4
      });
      window.clearTimeout(roomPageContext.askFailureTimerRef.current);
      roomPageContext.askFailureTimerRef.current = window.setTimeout((..._extraArguments: unknown[]): undefined => {
        if (!askCardDesk.answered(nonce4) && askCardDesk.unsent(nonce4, `no_answer`)) {
          (0, roomPageContext.setInlineAskNotice)(askCardMod.ASK_CARD_WORDS.unsent);
        }
      }, askCardMod.CARD_WRITE_ANSWER_MAX_MS);
      return;
    }
    let handoff: Dynamic = askCardDesk.handoff(nonce4);
    if (handoff) {
      window.clearTimeout(roomPageContext.askFailureTimerRef.current);
      if (handoff.kind === `late`) {
        roomPageContext.announcedAskCards.current.add(nonce4);
        (0, roomPageContext.setInlineAskNotice)(askCardMod.ASK_CARD_WORDS.late_handoff);
        return;
      }
      if (roomPageContext.inlineAskHost.current()?.nonce !== nonce4) return handoff.settle.reject(Error(`card gone`));
      (0, roomPageContext.onPost)(handoff.words.body, handoff.words.to, handoff.words.cc, {}).then(handoff.settle.resolve, handoff.settle.reject);
    }
  };
}
export function runRoomPage52Effect(roomPageContext: {
  DocumentSourcePromptState2: Dynamic;
  DocumentSourcePromptState3: Dynamic;
  elementRef13: Dynamic;
  elementRef14: Dynamic;
  elementRef3: Dynamic;
  inlineAskHost: Dynamic;
  routeCarrierRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionSendingRef: Dynamic;
}): Dynamic {
  return roomPageContext.routeCarrierRef.current = (roomDocumentPage?: Dynamic, post?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    if (roomPageContext.sessionLineRef.current === null || roomPageContext.sessionLineRef.current.card !== roomDocumentPage || roomPageContext.sessionLineRef.current.words !== post || roomPageContext.inlineAskHost.current()?.nonce !== roomDocumentPage) return Promise.reject(Error(`card gone`));
    roomPageContext.sessionSendingRef.current = roomDocumentPage;
    let finish = (..._extraArguments: unknown[]): undefined => {
      if (roomPageContext.sessionSendingRef.current === roomDocumentPage) {
        roomPageContext.sessionSendingRef.current = null;
      }
      let element4: Dynamic = roomPageContext.elementRef3.current;
      roomPageContext.elementRef3.current = null;
      if (element4 !== null && element4.card === roomDocumentPage) {
        element4.finish();
      }
    };
    roomPageContext.DocumentSourcePromptState2 = roomPageContext.elementRef13.current;
    roomPageContext.DocumentSourcePromptState3 = roomPageContext.elementRef14.current;
    updateDocumentSourcePromptDelete(roomDocumentPage, post.via.pressedAt);
    return roomPageContext.inlineAskHost.send(post.body, post.to, post.cc, {
      quiet: true,
      emptyOnly: true
    }).then((result?: unknown, ..._extraArguments: unknown[]) => (finish(), context?.(), typeof result == `string` ? result : ``), (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      throw finish(), result;
    });
  };
}
export function runRoomPage53CreateRouteSide(roomPageContext: {
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askCardSeqRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askLineBidRef: Dynamic;
  closedCardsRef: Dynamic;
  collapsedRef: Dynamic;
  elementRef16: Dynamic;
  elementRef17: Dynamic;
  elementRef9: Dynamic;
  ensureSessionRunsLoaded: Dynamic;
  goneRef: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  linkPopRef: Dynamic;
  roomNodeIdRef: Dynamic;
  routeBlockedRef: Dynamic;
  routeCarrierRef: Dynamic;
  routePageRef: Dynamic;
  routeSideRef: Dynamic;
  selbarPortRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
  sessionRouteSendRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionStoppedRef: Dynamic;
  sessionWaitRef: Dynamic;
  setAskCardDraft: Dynamic;
  setBusyAskCard: Dynamic;
  setInlineAskNotice: Dynamic;
  widgetPlacingRef: Dynamic;
}): Dynamic {
  return {
    ["createRouteSide"]: (..._extraArguments: unknown[]): Dynamic => {
      if (roomPageContext.routeSideRef.current !== null || roomPageContext.goneRef.current) return roomPageContext.routeSideRef.current;
      if (isCommentSessionFeatureDisabled()) return null;
      let sessionRouteModule2: Dynamic = getSessionRouteModule();
      return sessionRouteModule2 === null ? null : (roomPageContext.routeSideRef.current = sessionRouteModule2.createRouteSide({
        sessionRouteSendRef: roomPageContext.sessionRouteSendRef,
        sessionLineRef: roomPageContext.sessionLineRef,
        sessionRunsRef: roomPageContext.sessionRunsRef,
        sessionModRef: roomPageContext.sessionModRef,
        askCardModRef: roomPageContext.askCardModRef,
        askCardDeskRef: roomPageContext.askCardDeskRef,
        sessionCardsRef: roomPageContext.sessionCardsRef,
        askLineBidRef: roomPageContext.askLineBidRef,
        sessionLateRef: roomPageContext.sessionLateRef,
        sessionStoppedRef: roomPageContext.sessionStoppedRef,
        sessionWaitRef: roomPageContext.sessionWaitRef,
        closedCardsRef: roomPageContext.closedCardsRef,
        cardWatchRef: roomPageContext.askFailureTimerRef,
        goneRef: roomPageContext.goneRef,
        selbarPortRef: roomPageContext.selbarPortRef,
        roomNodeIdRef: roomPageContext.roomNodeIdRef,
        askCardSeqRef: roomPageContext.askCardSeqRef,
        collapsedRef: roomPageContext.collapsedRef,
        widgetPlacingRef: roomPageContext.widgetPlacingRef,
        linkPopRef: roomPageContext.linkPopRef,
        iframeRef: roomPageContext.iframeRef,
        inlineAskHost: roomPageContext.inlineAskHost,
        now: (..._extraArguments: unknown[]): Dynamic => roomPageContext.routePageRef.current,
        carrierSend: (roomDocumentPage?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.routeCarrierRef.current(roomDocumentPage, options, context),
        setInlineAskNotice: roomPageContext.setInlineAskNotice,
        setAskCardBusy: roomPageContext.setBusyAskCard,
        setAskCardDraft: roomPageContext.setAskCardDraft,
        feedWatch: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef16.current(roomDocumentPage),
        threadCheck: (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef17.current(),
        stopAskCard: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef9.current(roomDocumentPage),
        ensureSessionRunsLoaded: roomPageContext.ensureSessionRunsLoaded,
        blocked: (..._extraArguments: unknown[]): Dynamic => roomPageContext.routeBlockedRef.current()
      }), roomPageContext.routeSideRef.current);
    }
  }["createRouteSide"];
}
export function runRoomPage54Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askOnSheetRef: Dynamic;
  elementRef17: Dynamic;
  elementRef4: Dynamic;
  goneRef: Dynamic;
  inlineAskHost: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  refreshWaitingSideRef: Dynamic;
  selbarPortRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionSendingRef: Dynamic;
  waitingSideRef: Dynamic;
}): Dynamic {
  return roomPageContext.refreshWaitingSideRef.current = (..._extraArguments: unknown[]): Dynamic => {
    if (roomPageContext.waitingSideRef.current !== null || roomPageContext.goneRef.current) return roomPageContext.waitingSideRef.current;
    if (isCommentSessionFeatureDisabled()) return null;
    let documentCommandsValue3: Dynamic = resolveDocumentCommandsValue3();
    return documentCommandsValue3 === null ? null : (roomPageContext.waitingSideRef.current = documentCommandsValue3.createWaitingSide({
      sessionRunsRef: roomPageContext.sessionRunsRef,
      askCardDeskRef: roomPageContext.askCardDeskRef,
      sessionLineRef: roomPageContext.sessionLineRef,
      sessionSendingRef: roomPageContext.sessionSendingRef,
      askOnSheetRef: roomPageContext.askOnSheetRef,
      selbarPortRef: roomPageContext.selbarPortRef,
      navigatedRef: roomPageContext.navigatedRef,
      goneRef: roomPageContext.goneRef,
      openCard: (..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHost.current(),
      pid: (..._extraArguments: unknown[]): Dynamic => roomPageContext.pidRef.current,
      easeOut: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef4.current(roomDocumentPage, `marked`),
      threadCheck: (..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef17.current(),
      openList: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => updateCommentNotificationsSet().set(true, roomDocumentPage)
    }), roomPageContext.waitingSideRef.current);
  };
}
export function runRoomPage55Effect(roomPageContext: {
  createRouteSide: Dynamic;
  inlineAskHost: Dynamic;
  postSessionCarrierRef: Dynamic;
  routeCarrierRef: Dynamic;
  sessionLineRef: Dynamic;
}): Dynamic {
  return roomPageContext.postSessionCarrierRef.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let sessionLine: Dynamic = roomPageContext.sessionLineRef.current;
    if (sessionLine === null || sessionLine.card !== roomDocumentPage || roomPageContext.inlineAskHost.current()?.nonce !== roomDocumentPage) return Promise.reject(Error(`card gone`));
    if (!resolvePlatformFeatureFlagsEnabled2(`askNoCommentSend`)) return roomPageContext.routeCarrierRef.current(roomDocumentPage, sessionLine.words, null);
    let routeSide: Dynamic = (0, roomPageContext.createRouteSide)();
    return routeSide === null ? (ensureSessionRouteModule(), roomPageContext.routeCarrierRef.current(roomDocumentPage, sessionLine.words, (..._extraArguments: unknown[]) => reportCommentSessionEvent(`carrier`, `not_warm`))) : routeSide.start(roomDocumentPage, sessionLine);
  };
}
export function runRoomPage56Effect(roomPageContext: {
  askCardModRef: Dynamic;
  elementRef: Dynamic;
  elementRef15: Dynamic;
  elementRef16: Dynamic;
  elementRef2: Dynamic;
  elementRef4: Dynamic;
  goneRef: Dynamic;
  inlineAskHost: Dynamic;
  lookupRef2: Dynamic;
  room: Dynamic;
  roomPageModuleUrl: Dynamic;
  routeSideRef: Dynamic;
  sessionFeedRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionStoppedRef: Dynamic;
  setInlineAskNotice: Dynamic;
  waitingSideRef: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef16.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let sessionFeed: Dynamic = roomPageContext.sessionFeedRef.current;
    if (!roomDocumentPage) {
      sessionFeed.want = false;
      sessionFeed.unsub?.();
      sessionFeed.unsub = null;
      return;
    }
    if (sessionFeed.want || !roomPageContext.room) return;
    sessionFeed.want = true;
    let pid2: Dynamic = roomPageContext.room.pid;
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
      if (!(!sessionFeed.want || sessionFeed.unsub !== null || roomPageContext.goneRef.current)) {
        sessionFeed.unsub = subscribeProjectFeed2(pid2, (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let sessionRuns: Dynamic = roomPageContext.sessionRunsRef.current;
          let sessionMod: Dynamic = roomPageContext.sessionModRef.current;
          let sessionLine: Dynamic = roomPageContext.sessionLineRef.current;
          if (entry.kind !== `envelope` || sessionRuns === null || sessionMod === null || sessionLine === null) return;
          let matchesLive = sessionRuns.live() === null && roomPageContext.sessionLateRef.current === sessionLine.card && roomPageContext.inlineAskHost.current()?.nonce === sessionLine.card;
          let matchesLive2 = sessionRuns.live() === null && roomPageContext.sessionStoppedRef.current === sessionLine.card && roomPageContext.inlineAskHost.current()?.nonce === sessionLine.card;
          if (sessionRuns.live() === null && !matchesLive && !matchesLive2) return void roomPageContext.elementRef16.current(false);
          if (!matchesLive && !matchesLive2 && sessionRuns.live() !== sessionLine.card || isDataModelSchemasKind3(entry.envelope)?.kind !== `agent` || roomPageContext.waitingSideRef.current?.heard(entry) === true) return;
          if (!matchesLive && !matchesLive2 && sessionMod.envelopeCommentsOutside(entry.envelope, sessionRuns.threadOf(sessionLine.card))) {
            sessionRuns.agentCommentedElsewhere();
          }
          if (!matchesLive && !matchesLive2 && sessionRuns.lineOf() !== null && sessionMod.envelopeWritesNothing(entry.envelope) && sessionMod.envelopeNamesBlock(entry.envelope, sessionRuns.lineOf(), (roomDocumentPage2?: unknown, ..._extraArguments: unknown[]) => typeof roomDocumentPage2 == `string` && observabilityBrowserAndOperationEventsPattern22.test(roomDocumentPage2)) === `named`) {
            sessionRuns.agentEmptiedLine(entry.seq);
          }
          if (sessionMod.envelopeWritesNothing(entry.envelope)) return void resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `agent_row`,
            names: `writes_nothing`
          });
          let lineOf: Dynamic = sessionRuns.lineOf() ?? sessionLine.block?.bid ?? null;
          let names: Dynamic = lineOf === null ? `none` : sessionMod.envelopeNamesBlock(entry.envelope, lineOf, (roomDocumentPage2?: unknown, ..._extraArguments: unknown[]) => typeof roomDocumentPage2 == `string` && observabilityBrowserAndOperationEventsPattern22.test(roomDocumentPage2));
          let onNode: Dynamic = entry.envelope.diff.some((diff?: Dynamic, ..._extraArguments: unknown[]) => {
            let ref: Dynamic = diff.address?.ref;
            return ref?.object === `node` && (sessionLine.node === `` || ref.id === sessionLine.node);
          });
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `agent_row`,
            names: names,
            onNode: onNode
          });
          if (!(names === `named` || onNode) && sessionMod.envelopeOnOtherNode(entry.envelope, sessionLine.node) && !matchesLive && !matchesLive2) {
            sessionRuns.agentWroteElsewhere();
          }
          if (!(names === `named` || onNode) || matchesLive2 && !sessionRuns.heardAfterStop(sessionLine.card, names) || matchesLive2 && roomPageContext.routeSideRef.current?.unanswered(sessionLine) === true) return;
          let whoseRow: Dynamic = sessionMod.whoseRow({
            via: entry.envelope.actor?.via,
            writer: isDataModelSchemasKind3(entry.envelope)?.principal,
            viewer: frameFenceAuthor(`project/` + pid2)
          });
          let element4: Dynamic = roomPageContext.elementRef2.current?.card === sessionLine.card && roomPageContext.elementRef2.current.names !== `others` ? roomPageContext.elementRef2.current : null;
          if (matchesLive2) return void (roomPageContext.elementRef2.current = {
            card: sessionLine.card,
            names: element4?.names ?? names,
            whose: element4?.whose ?? whoseRow
          });
          if (!matchesLive && roomPageContext.routeSideRef.current?.pending(sessionLine) === true) return void resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `agent_row_held`,
            names: names
          });
          if (!matchesLive && roomPageContext.waitingSideRef.current?.holdsRow(names) === true) return void resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `agent_row_held_waiting`,
            names: names
          });
          if (!matchesLive) return void sessionRuns.agentWrote(names, whoseRow);
          if (sessionRuns.heardAfterStop(sessionLine.card, names)) {
            sessionRuns.lateHeard(sessionLine.card);
            roomPageContext.sessionLateRef.current = null;
            roomPageContext.elementRef16.current(false);
            {
              let lookupEntry: Dynamic = roomPageContext.lookupRef2.current.get(sessionLine.card);
              if (lookupEntry !== undefined && names !== `others`) {
                quietCarrierWritten.add(lookupEntry);
              }
              if (roomPageContext.elementRef.current?.card === sessionLine.card && names !== `others`) {
                roomPageContext.elementRef.current = null;
              }
            }
            if (roomPageContext.elementRef15.current(sessionLine.card)) roomPageContext.elementRef4.current(sessionLine.card, `written`);else {
              let ASKCARDWORDS: Dynamic = roomPageContext.askCardModRef.current?.ASK_CARD_WORDS;
              (0, roomPageContext.setInlineAskNotice)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ASKCARDWORDS !== undefined && (roomDocumentPage2 === ASKCARDWORDS.no_answer || roomDocumentPage2 === ASKCARDWORDS.unsent || roomDocumentPage2 === ASKCARDWORDS.waiting_on_you) ? null : roomDocumentPage2);
            }
          }
        });
      }
    });
  };
}

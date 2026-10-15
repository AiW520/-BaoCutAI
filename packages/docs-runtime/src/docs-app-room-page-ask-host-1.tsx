import { React, mapPreloadDependencies } from "./docs-app-bootstrap";
import { createAskCardRequestPool, resolveDocumentCommandsCurrent, resolveDocumentCommandsGetPrototypeOf, updateDocumentCommandsDuration } from "./docs-app-document-commands-create-ask-card-request-pool";
import { resolveCommentSessionHost } from "./docs-app-comment-session-clear-comment-session-thread-id";
import { isCommentComponentsOwnerDocument } from "./docs-app-comment-components-state-5";
import { updateDocumentSourcePromptDelete } from "./docs-app-room-document-page-state-3";
import { CLAUDE_ASKED_WAITING_MESSAGE, askCardRecoverySendDisposition, askCardRecoverySendMessage } from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import { loadDocumentCommandsLook } from "./docs-app-document-commands-create-selection-ask-coordinator";

/** BaoCut: room document ask host; live accessors preserve closure state. */
import type { Dynamic } from "./types";
import { Av as frameSamplePermission, Dj as resolvePlatformSessionAndSourcesCode, Id as resolveCommentsStoreLayer, jv as frameSampler, kp as resolvePlatformAnnouncementsValue } from "./platform-core";
import { t as preloadModule } from "./preload";
export function runRoomPage40ResetAskStateRef(roomPageContext: {
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askInvitationKinds: Dynamic;
  askOnSheetRef: Dynamic;
  closedCardsRef: Dynamic;
  elementRef: Dynamic;
  elementRef10: Dynamic;
  elementRef12: Dynamic;
  elementRef2: Dynamic;
  elementRef20: Dynamic;
  elementRef3: Dynamic;
  elementRef7: Dynamic;
  goneRef: Dynamic;
  inlineAskHostRef: Dynamic;
  leavingAskCardRef: Dynamic;
  routeSideRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionSendingRef: Dynamic;
  sessionStoppedRef: Dynamic;
  sessionWaitRef: Dynamic;
  setParkedAskCard: Dynamic;
  uniqueItemsRef: Dynamic;
  uniqueItemsRef2: Dynamic;
  uniqueItemsRef3: Dynamic;
  uniqueItemsRef4: Dynamic;
}): Dynamic {
  return (0, React.useRef)((..._extraArguments: unknown[]): undefined => {
    let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
    let inHand: Dynamic = askCardDesk?.inHand() ?? null;
    let roomDocumentPageResult34: Dynamic = null;
    try {
      let inlineAskHost4: Dynamic = roomPageContext.inlineAskHostRef.current?.current() ?? null;
      let typed: Dynamic = inlineAskHost4 === null ? null : (document as Dynamic).querySelector(`[data-inline-ask="${inlineAskHost4.nonce}"] [contenteditable]`)?.innerText ?? null;
      roomDocumentPageResult34 = inlineAskHost4 === null ? null : roomPageContext.askCardModRef.current?.resetNotice({
        docked: inlineAskHost4.docked === true,
        gone: roomPageContext.goneRef.current,
        own: roomPageContext.askInvitationKinds.current.has(inlineAskHost4.nonce),
        mayFocus: askCardDesk?.mayFocus(inlineAskHost4.nonce) === true,
        onSheet: roomPageContext.askOnSheetRef.current,
        entered: roomPageContext.uniqueItemsRef3.current.has(inlineAskHost4.nonce),
        typed: typed
      }) ?? null;
      if (roomDocumentPageResult34 === null && inHand !== null) {
        roomDocumentPageResult34 = roomPageContext.askCardModRef.current?.resetUnansweredNotice({
          docked: inlineAskHost4 !== null && inlineAskHost4.nonce === inHand && inlineAskHost4.docked === true,
          gone: roomPageContext.goneRef.current,
          own: roomPageContext.askInvitationKinds.current.has(inHand),
          onSheet: roomPageContext.askOnSheetRef.current,
          inHand: true,
          quickRoad: askCardDesk?.roadInHand(inHand) === `quick`,
          handoff: askCardDesk?.handoffInHand(inHand) === true,
          leaving: roomPageContext.leavingAskCardRef.current === inHand,
          words: askCardDesk?.wordsInHand(inHand) ?? null
        }) ?? null;
      }
    } catch {
      roomDocumentPageResult34 = null;
    }
    (window as Dynamic).clearTimeout(roomPageContext.askFailureTimerRef.current);
    if (inHand !== null) {
      roomPageContext.elementRef12.current?.stopDeciding(inHand);
    }
    if (askCardDesk && inHand !== null) {
      askCardDesk.unsent(inHand, `reset`);
    }
    askCardDesk?.forget();
    roomPageContext.closedCardsRef.current.clear();
    roomPageContext.askInvitationKinds.current.clear();
    roomPageContext.uniqueItemsRef.current.clear();
    roomPageContext.uniqueItemsRef2.current.clear();
    roomPageContext.uniqueItemsRef3.current.clear();
    roomPageContext.announcedAskCards.current.clear();
    roomPageContext.elementRef10.current = null;
    roomPageContext.sessionRunsRef.current?.reset();
    roomPageContext.elementRef20.current();
    roomPageContext.sessionCardsRef.current.clear();
    roomPageContext.sessionSendingRef.current = null;
    roomPageContext.sessionWaitRef.current = null;
    roomPageContext.sessionLineRef.current = null;
    roomPageContext.routeSideRef.current?.detach();
    roomPageContext.sessionLateRef.current = null;
    roomPageContext.sessionStoppedRef.current = null;
    roomPageContext.elementRef2.current = null;
    roomPageContext.elementRef3.current = null;
    roomPageContext.uniqueItemsRef4.current.clear();
    roomPageContext.elementRef.current = null;
    roomPageContext.elementRef7.current = null;
    (0, roomPageContext.setParkedAskCard)(null);
    try {
      if (roomDocumentPageResult34 !== null) {
        updateDocumentCommandsDuration(roomDocumentPageResult34);
      }
    } catch {}
  });
}
export function runRoomPage41Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askFailureTimerRef: Dynamic;
  elementRef12: Dynamic;
  elementRef20: Dynamic;
  elementRef9: Dynamic;
  selbarPortRef: Dynamic;
  sessionRunsRef: Dynamic;
  setInlineAskNotice: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef9.current = (nonce4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    window.clearTimeout(roomPageContext.askFailureTimerRef.current);
    roomPageContext.elementRef12.current?.stopDeciding(nonce4);
    roomPageContext.sessionRunsRef.current?.stop(nonce4);
    roomPageContext.elementRef20.current(nonce4);
    roomPageContext.askCardDeskRef.current?.unsent(nonce4, `stopped`);
    (0, roomPageContext.setInlineAskNotice)(null);
    roomPageContext.selbarPortRef.current?.postMessage({
      type: `inline-ask-stop`,
      nonce: nonce4
    });
  };
}
export function runRoomPage42Effect(roomPageContext: {
  askCardDeskRef: Dynamic;
  askCardRecoveryPreviousNotice2: Dynamic;
  askReconcilePendingRef: Dynamic;
  closedCardsRef: Dynamic;
  elementRef12: Dynamic;
  navigatedRef: Dynamic;
  record: Dynamic;
  roomPageModuleUrl: Dynamic;
  selbarPortRef: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef12.current ??= createAskCardRequestPool({
    post: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let selbarPort: Dynamic = roomPageContext.selbarPortRef.current;
      if (!(!selbarPort || roomPageContext.navigatedRef.current)) {
        selbarPort.postMessage(roomDocumentPage);
      }
    },
    timers: {
      setTimeout: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options),
      clearTimeout: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => window.clearTimeout(roomDocumentPage)
    },
    now: (..._extraArguments: unknown[]) => performance.now(),
    told: (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.askCardRecoveryPreviousNotice2)(),
    gestureLive: (..._extraArguments: unknown[]) => {
      let userActivation = navigator.userActivation;
      return userActivation ? userActivation.isActive === true : null;
    },
    knobs: (..._extraArguments: unknown[]): Dynamic => resolveDocumentCommandsGetPrototypeOf(window),
    sampler: (..._extraArguments: unknown[]): Dynamic => frameSampler(),
    loadSample: (..._extraArguments: unknown[]): Dynamic => preloadModule((..._extraArguments: unknown[]): Dynamic => import("./claude-writing-sample"), mapPreloadDependencies([33, 0, 1, 2, 3]), roomPageContext.roomPageModuleUrl),
    loadSim: (..._extraArguments: unknown[]): Dynamic => preloadModule((..._extraArguments: unknown[]): Dynamic => import("./claude-writing-sim"), [], roomPageContext.roomPageModuleUrl),
    loadVerdict: (..._extraArguments: unknown[]): Dynamic => preloadModule((..._extraArguments: unknown[]): Dynamic => import("./claude-verdict"), mapPreloadDependencies([34, 0, 1, 2, 3]), roomPageContext.roomPageModuleUrl),
    verdictWords: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.askCardDeskRef.current?.verdictWords(roomDocumentPage) ?? null,
    takeAsk: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.askCardDeskRef.current?.takeAsk(roomDocumentPage) ?? null,
    onStrayVerdict: (..._extraArguments: unknown[]) => resolveCommentsStoreLayer(`host`, `claude_verdict`, {
      what: `stray`
    }),
    allowed: (..._extraArguments: unknown[]): Dynamic => frameSamplePermission(),
    onNotAllowed: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => void roomPageContext.closedCardsRef.current.add(roomDocumentPage),
    onClosed: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.closedCardsRef.current.add(roomDocumentPage);
      resolveDocumentCommandsCurrent(roomPageContext.record);
      roomPageContext.askReconcilePendingRef.current = true;
    }
  });
}
export function runRoomPage43InlineAskHost2(roomPageContext: {
  askCardDeskRef: Dynamic;
  askHeightObserverRef: Dynamic;
  askInvitationKinds: Dynamic;
  askKeySequenceRef: Dynamic;
  askOnSheetRef: Dynamic;
  askWhyLeaveRef: Dynamic;
  askWhyModuleRef: Dynamic;
  askWhyRef: Dynamic;
  closeAskRef: Dynamic;
  elementRef9: Dynamic;
  iframeRef: Dynamic;
  inlineAskHost: Dynamic;
  uniqueItemsRef2: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((restoreCaret?: Dynamic, held2: Dynamic = false, ..._extraArguments: unknown[]): undefined => {
    let inHand: Dynamic = roomPageContext.askCardDeskRef.current?.inHand() ?? null;
    if (inHand !== null && roomPageContext.inlineAskHost.current()?.nonce === inHand) {
      roomPageContext.elementRef9.current(inHand);
      return;
    }
    if (restoreCaret) {
      roomPageContext.iframeRef.current?.focus({
        preventScroll: true
      });
    }
    let inlineAskHost4: Dynamic = roomPageContext.inlineAskHost.current();
    let counted: Dynamic = inlineAskHost4 !== null && roomPageContext.askInvitationKinds.current.has(inlineAskHost4.nonce) && !roomPageContext.uniqueItemsRef2.current.has(inlineAskHost4.nonce);
    let askWhy: Dynamic = roomPageContext.askWhyRef.current?.current() ?? null;
    let label2: Dynamic = inlineAskHost4 === null || roomPageContext.askWhyModuleRef.current === null ? `close` : roomPageContext.askWhyModuleRef.current.askWhyCloseVerdict({
      asking: askWhy !== null && askWhy.nonce === inlineAskHost4.nonce,
      by: roomPageContext.askHeightObserverRef.current ?? (restoreCaret ? `escape` : `press`),
      sinceUpMs: performance.now() - roomPageContext.askKeySequenceRef.current,
      counted: counted,
      held: held2,
      docked: inlineAskHost4.docked === true,
      onSheet: roomPageContext.askOnSheetRef.current
    });
    if (label2 !== `hold`) {
      if (label2 === `ask` && inlineAskHost4 !== null && roomPageContext.askWhyRef.current?.closedEmpty(inlineAskHost4.nonce) === true) {
        resolveCommentSessionHost(`closed`, `empty`);
        roomPageContext.askKeySequenceRef.current = performance.now();
        resolvePlatformAnnouncementsValue(document, roomPageContext.askWhyModuleRef.current?.ASK_WHY_QUESTION ?? ``, {
          key: `inline-ask`
        });
        if (restoreCaret) {
          roomPageContext.closeAskRef.current();
        }
        return;
      }
      if (label2 === `release` && inlineAskHost4 !== null) {
        roomPageContext.askWhyRef.current?.ending(inlineAskHost4.nonce);
        if (roomPageContext.askWhyLeaveRef.current) {
          roomPageContext.askWhyLeaveRef.current.leave(inlineAskHost4.nonce);
        } else {
          roomPageContext.inlineAskHost.cancel({
            restoreCaret: false
          });
        }
        return;
      }
      roomPageContext.inlineAskHost.cancel({
        restoreCaret: restoreCaret
      });
      if (counted && roomPageContext.inlineAskHost.current() === null) {
        resolveCommentSessionHost(`closed`, held2 ? `words` : `empty`);
      }
    }
  }, [roomPageContext.inlineAskHost]);
}
export function runRoomPage44InlineAskHost3(roomPageContext: {
  askHeightObserverRef: Dynamic;
  inlineAskHost2: Dynamic;
}): Dynamic {
  return {
    ["inlineAskHost3"]: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.askHeightObserverRef.current = roomDocumentPage;
      try {
        (0, roomPageContext.inlineAskHost2)(options);
      } finally {
        roomPageContext.askHeightObserverRef.current = null;
      }
    }
  }["inlineAskHost3"];
}
export function runRoomPage45Effect(roomPageContext: {
  closeAskRef: Dynamic;
  inlineAskHost: Dynamic;
  inlineAskHost3: Dynamic;
  releaseAskRef: Dynamic;
}): Dynamic {
  return roomPageContext.releaseAskRef.current = (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.inlineAskHost.current()?.nonce !== roomDocumentPage) return;
    let activeElement = document.activeElement;
    if (activeElement instanceof Element && activeElement.closest(`[data-inline-ask="${roomDocumentPage}"]`) !== null) {
      roomPageContext.closeAskRef.current();
    }
    (0, roomPageContext.inlineAskHost3)(`release`, false);
  };
}
export function runRoomPage46Effect(roomPageContext: {
  askOnSheetRef: Dynamic;
  DocumentSourcePromptState2: Dynamic;
  DocumentSourcePromptState3: Dynamic;
  elementRef13: Dynamic;
  enabledRef2: Dynamic;
  inlineAskHost: Dynamic;
  sessionSendingRef: Dynamic;
}): Dynamic {
  return roomPageContext.elementRef13.current = (roomDocumentPage?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let matchedElement: Dynamic = roomPageContext.inlineAskHost.current()?.nonce === roomDocumentPage ? document.querySelector(`[data-inline-ask="${roomDocumentPage}"]`) : null;
    let activeElement = document.activeElement;
    let matchesMatchedElement: Dynamic = matchedElement !== null && document.hasFocus() && (!activeElement || activeElement === document.body || matchedElement.contains(activeElement));
    if (options !== null && roomPageContext.sessionSendingRef.current === roomDocumentPage) {
      roomPageContext.inlineAskHost.carried(roomDocumentPage, options);
    } else {
      roomPageContext.inlineAskHost.outcome(roomDocumentPage, options, context);
    }
    if (options !== null && matchesMatchedElement && !roomPageContext.askOnSheetRef.current && roomPageContext.inlineAskHost.current() === null) {
      roomPageContext.enabledRef2.current = true;
    }
    if (!roomPageContext.inlineAskHost.isSending() && roomPageContext.DocumentSourcePromptState2 === roomPageContext.elementRef13.current) {
      roomPageContext.DocumentSourcePromptState2 = null;
      roomPageContext.DocumentSourcePromptState3 = null;
    }
  };
}
export function runRoomPage47Effect(roomPageContext: {
  DocumentSourcePromptState2: Dynamic;
  DocumentSourcePromptState3: Dynamic;
  elementRef13: Dynamic;
  elementRef14: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => (..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.DocumentSourcePromptState2 === roomPageContext.elementRef13.current) {
      roomPageContext.DocumentSourcePromptState2 = null;
    }
    if (roomPageContext.DocumentSourcePromptState3 === roomPageContext.elementRef14.current) {
      roomPageContext.DocumentSourcePromptState3 = null;
    }
  }, []);
}
export function runRoomPage48Effect(roomPageContext: {
  enabledRef2: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  openAskCard: Dynamic;
  parkedAskCard: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let enabled5: Dynamic = roomPageContext.enabledRef2.current;
    roomPageContext.enabledRef2.current = false;
    if (enabled5 && roomPageContext.parkedAskCard !== null) return void (roomPageContext.enabledRef2.current = true);
    if (!(!enabled5 || roomPageContext.openAskCard !== null || roomPageContext.navigatedRef.current)) {
      isCommentComponentsOwnerDocument(roomPageContext.iframeRef.current, (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.iframeRef.current?.contentWindow, roomDocumentPage));
    }
  }, [roomPageContext.openAskCard, roomPageContext.parkedAskCard]);
}
export function runRoomPage49OnPost2(roomPageContext: {
  announcedAskCards: Dynamic;
  askCardDeskRef: Dynamic;
  askCardModRef: Dynamic;
  askFailureTimerRef: Dynamic;
  askInvitationKinds: Dynamic;
  askPermission: Dynamic;
  closedCardsRef: Dynamic;
  countRef: Dynamic;
  elementRef: Dynamic;
  elementRef11: Dynamic;
  elementRef12: Dynamic;
  elementRef16: Dynamic;
  elementRef17: Dynamic;
  elementRef19: Dynamic;
  elementRef2: Dynamic;
  elementRef20: Dynamic;
  elementRef7: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  inlineAskHost: Dynamic;
  lookupRef2: Dynamic;
  noticeRef: Dynamic;
  onPost: Dynamic;
  roomNodeIdRef: Dynamic;
  routeSideRef: Dynamic;
  selbarPortRef: Dynamic;
  selectionCardRef: Dynamic;
  sessionCardsRef: Dynamic;
  sessionEndedRef: Dynamic;
  sessionKindRef: Dynamic;
  sessionLateRef: Dynamic;
  sessionLineRef: Dynamic;
  sessionModRef: Dynamic;
  sessionRouteSendRef: Dynamic;
  sessionRunsRef: Dynamic;
  sessionStoppedRef: Dynamic;
  sessionWaitRef: Dynamic;
  setBusyAskCard: Dynamic;
  setInlineAskNotice: Dynamic;
  setLeavingAskCard: Dynamic;
  setParkedAskCard: Dynamic;
  uniqueItemsRef: Dynamic;
  uniqueItemsRef2: Dynamic;
  uniqueItemsRef3: Dynamic;
  uniqueItemsRef4: Dynamic;
}): Dynamic {
  return (0, React.useCallback)((body?: Dynamic, options?: Dynamic, context?: Dynamic, via?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let card: Dynamic = roomPageContext.inlineAskHost.current()?.nonce;
    let askCardDesk: Dynamic = roomPageContext.askCardDeskRef.current;
    let askCardMod: Dynamic = roomPageContext.askCardModRef.current;
    updateDocumentSourcePromptDelete(card, via.pressedAt);
    if (card !== undefined) {
      roomPageContext.uniqueItemsRef3.current.add(card);
    }
    if (card !== undefined && roomPageContext.askInvitationKinds.current.has(card) && roomPageContext.announcedAskCards.current.has(card)) {
      resolveCommentSessionHost(`sent`, roomPageContext.sessionKindRef.current(card));
    }
    if (card === undefined || !askCardDesk || !askCardMod || !roomPageContext.askInvitationKinds.current.has(card) || roomPageContext.announcedAskCards.current.has(card)) return (0, roomPageContext.onPost)(body, options, context, via);
    if (roomPageContext.askInvitationKinds.current.get(card) === `comment`) {
      let askCardRecoverySendDisposition2 = askCardRecoverySendDisposition(roomPageContext.initialAskCardRecoveryStateRef.current, {
        came: roomPageContext.uniqueItemsRef2.current.has(card),
        offer: (0, roomPageContext.askPermission)(),
        line: roomPageContext.noticeRef.current
      });
      return askCardRecoverySendDisposition2 === `send` ? ((0, roomPageContext.setInlineAskNotice)(null), resolveCommentSessionHost(`sent`, `comment`), loadDocumentCommandsLook({
        send: (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.onPost)(body, options, context, via),
        look: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          roomPageContext.elementRef7.current = roomDocumentPage === `idle` ? null : card;
          if (roomDocumentPage === `busy`) return (0, roomPageContext.setBusyAskCard)(card);
          if (roomDocumentPage === `leaving`) return (0, roomPageContext.setLeavingAskCard)(card);
          (0, roomPageContext.setBusyAskCard)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2 === card ? null : roomDocumentPage2);
          (0, roomPageContext.setLeavingAskCard)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2 === card ? null : roomDocumentPage2);
          (0, roomPageContext.setParkedAskCard)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2?.nonce === card ? null : roomDocumentPage2);
        },
        outMs: roomPageContext.uniqueItemsRef.current.has(card) || window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches ? 0 : askCardMod.ASK_CARD_OUT_MS,
        setTimeout: (roomDocumentPage?: Dynamic, options2?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options2)
      })) : ((0, roomPageContext.setInlineAskNotice)(askCardRecoverySendMessage(roomPageContext.initialAskCardRecoveryStateRef.current, askCardRecoverySendDisposition2)), Promise.reject(Error(`off`)));
    }
    let sessionRuns: Dynamic = roomPageContext.sessionRunsRef.current;
    if (sessionRuns !== null && roomPageContext.sessionCardsRef.current.has(card) && (0, roomPageContext.askPermission)()) {
      let sessionWait: Dynamic = roomPageContext.sessionWaitRef.current;
      if ((sessionRuns.live() === card || roomPageContext.elementRef19.current?.card === card) && sessionWait !== null && sessionWait.card === card) return sessionWait.settled;
      if (roomPageContext.uniqueItemsRef4.current.has(card)) return Promise.reject(Error(`gone`));
      if (roomPageContext.sessionModRef.current?.askIsEmpty(body) === true) {
        (0, roomPageContext.setInlineAskNotice)(askCardMod.ASK_CARD_WORDS.unsent);
        return Promise.reject(Error(`empty`));
      }
      {
        let response2: Dynamic = roomPageContext.sessionModRef.current === null ? null : resolvePlatformSessionAndSourcesCode(roomPageContext.sessionModRef.current.carrierBodyOf(body));
        if (response2 !== null && !response2.ok && response2.code === `too_long`) {
          (0, roomPageContext.setInlineAskNotice)(askCardMod.ASK_CARD_WORDS.too_long);
          return Promise.reject(Error(`too_long`));
        }
      }
      (0, roomPageContext.setInlineAskNotice)(null);
      (0, roomPageContext.setBusyAskCard)(card);
      resolveCommentSessionHost(`sent`, roomPageContext.sessionKindRef.current(card));
      let setBusyAskCard3: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setBusyAskCard)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === card ? null : roomDocumentPage);
      let settled2: Dynamic = new (Promise as Dynamic)((resolve?: Dynamic, reject?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        roomPageContext.closedCardsRef.current.delete(card);
        askCardDesk.sent(card, {
          body: body,
          to: options,
          cc: context
        }, {
          resolve: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (setBusyAskCard3(), resolve(roomDocumentPage)),
          reject: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (setBusyAskCard3(), reject(roomDocumentPage))
        });
        askCardDesk.road(card, `session`);
        window.clearTimeout(roomPageContext.askFailureTimerRef.current);
        roomPageContext.countRef.current += 1;
        roomPageContext.sessionLateRef.current = null;
        roomPageContext.elementRef16.current(true);
        resolvePlatformAnnouncementsValue(document, CLAUDE_ASKED_WAITING_MESSAGE, {
          key: `inline-ask`
        });
        let sessionLine: Dynamic = roomPageContext.sessionLineRef.current;
        let names: Dynamic = roomPageContext.elementRef2.current?.card === card ? roomPageContext.elementRef2.current.names : null;
        let whose: Dynamic = roomPageContext.elementRef2.current?.card === card ? roomPageContext.elementRef2.current.whose : undefined;
        roomPageContext.sessionStoppedRef.current = null;
        if (roomPageContext.sessionRouteSendRef.current?.card === card) {
          roomPageContext.sessionRouteSendRef.current.stopped = false;
        }
        roomPageContext.elementRef2.current = null;
        let matchesSessionLine = sessionLine !== null && sessionLine.card === card && sessionLine.words.body === body;
        roomPageContext.elementRef.current = null;
        let sessionRouteSend: Dynamic = roomPageContext.sessionRouteSendRef.current;
        let matchesSessionRouteSend: Dynamic = sessionRouteSend !== null && sessionRouteSend.card === card && sessionRouteSend.dead && !sessionRouteSend.accepted && !sessionRouteSend.fellBack;
        if (matchesSessionRouteSend) {
          sessionRuns.forget(card);
        }
        if (matchesSessionLine && !matchesSessionRouteSend && sessionRuns.resume(card)) {
          roomPageContext.elementRef17.current();
          window.setTimeout((..._extraArguments: unknown[]): undefined => {
            let sessionRouteSend2: Dynamic = roomPageContext.sessionRouteSendRef.current;
            if (sessionRouteSend2 !== null && sessionRouteSend2.card === card) {
              sessionRouteSend2.view?.apply();
            }
          }, 0);
          if (names !== null && roomPageContext.routeSideRef.current?.unanswered(roomPageContext.sessionLineRef.current) !== true) {
            sessionRuns.agentWrote(names, whose);
          }
        } else if (matchesSessionLine && !matchesSessionRouteSend && sessionRuns.retryable(card) && roomPageContext.lookupRef2.current.get(card)?.startsWith(`route:`) !== true) {
          let sent = (..._extraArguments: unknown[]): undefined => {
            if (roomPageContext.elementRef19.current?.card === card && (roomPageContext.elementRef20.current(card), roomPageContext.askCardDeskRef.current?.inHand() === card)) {
              if (!sessionRuns.retry(card) && sessionRuns.live() !== card) {
                roomPageContext.sessionEndedRef.current(card, `failed`, null, false, false);
              }
              if (sessionRuns.live() === card) {
                roomPageContext.elementRef16.current(true);
              }
              try {
                roomPageContext.selectionCardRef.current.sent(card, roomPageContext.sessionKindRef.current(card), sessionRuns.live() === card);
              } catch {}
            }
          };
          roomPageContext.elementRef20.current();
          roomPageContext.elementRef19.current = {
            card: card,
            go: sent,
            timer: window.setTimeout(sent, 3e3)
          };
          roomPageContext.selbarPortRef.current?.postMessage({
            type: `inline-ask-commit`,
            nonce: card,
            anchor: `nearby`,
            emptyOnly: true,
            probe: true
          });
        } else {
          roomPageContext.sessionLineRef.current = {
            card: card,
            node: roomPageContext.roomNodeIdRef.current ?? ``,
            words: {
              body: body,
              to: options,
              cc: context,
              via: via
            }
          };
          roomPageContext.lookupRef2.current.delete(card);
          roomPageContext.routeSideRef.current?.letGo();
          sessionRuns.start(card, null);
          {
            let sessionRouteSend2: Dynamic = roomPageContext.sessionRouteSendRef.current;
            if (sessionRouteSend2 !== null && sessionRouteSend2.card === card && sessionRouteSend2.words === roomPageContext.sessionLineRef.current?.words && !sessionRouteSend2.fellBack) {
              sessionRuns.lineIs(card, sessionRouteSend2.bid);
            }
          }
        }
      });
      roomPageContext.sessionWaitRef.current = {
        card: card,
        settled: settled2
      };
      try {
        roomPageContext.selectionCardRef.current.sent(card, roomPageContext.sessionKindRef.current(card), sessionRuns.live() === card);
      } catch {}
      return settled2;
    }
    (0, roomPageContext.setInlineAskNotice)(null);
    (0, roomPageContext.setBusyAskCard)(card);
    let sentOnce: Dynamic = askCardMod.sentOnce(roomPageContext.sessionKindRef.current(card), (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolveCommentSessionHost(`sent`, roomDocumentPage));
    let setBusyAskCard2: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setBusyAskCard)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage === card ? null : roomDocumentPage);
    return new (Promise as Dynamic)((resolve?: Dynamic, reject?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      roomPageContext.closedCardsRef.current.delete(card);
      askCardDesk.sent(card, {
        body: body,
        to: options,
        cc: context
      }, {
        resolve: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (sentOnce.settled(), setBusyAskCard2(), resolve(roomDocumentPage)),
        reject: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (sentOnce.settled(), setBusyAskCard2(), reject(roomDocumentPage))
      });
      askCardDesk.tell(card, sentOnce);
      askCardDesk.road(card, `quick`);
      window.clearTimeout(roomPageContext.askFailureTimerRef.current);
      let roomDocumentPageResult34: Dynamic = roomPageContext.countRef.current += 1;
      let element4: Dynamic = roomPageContext.elementRef12.current;
      if (!element4) return void askCardDesk.unsent(card, `failed`);
      element4.decide(card).then((response2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!(roomPageContext.countRef.current !== roomDocumentPageResult34 || askCardDesk.inHand() !== card)) {
          if (`failed` in response2) {
            resolveCommentsStoreLayer(`host`, `claude_verdict`, {
              what: `failed`,
              code: response2.failed
            });
            if (!askCardDesk.unsent(card, response2.failed)) return;
            if (roomPageContext.closedCardsRef.current.has(card) || response2.failed === `off`) {
              if ((0, roomPageContext.askPermission)()) {
                roomPageContext.announcedAskCards.current.add(card);
              }
              (0, roomPageContext.setInlineAskNotice)((0, roomPageContext.askPermission)() ? askCardMod.ASK_CARD_WORDS.comment_instead : askCardMod.ASK_CARD_WORDS.closed);
            } else {
              (0, roomPageContext.setInlineAskNotice)(response2.failed === `stopped` ? null : response2.failed === `too_long` ? askCardMod.ASK_CARD_WORDS.too_long : response2.failed === `refused` ? askCardMod.ASK_CARD_WORDS.declined : askCardMod.ASK_CARD_WORDS.unsent);
            }
            return;
          }
          resolveCommentsStoreLayer(`host`, `claude_verdict`, {
            what: response2.verdict,
            ...(response2.verdict === `handoff` && !(0, roomPageContext.askPermission)() && {
              road: false
            })
          });
          if (response2.verdict === `handoff` && !(0, roomPageContext.askPermission)()) {
            if (askCardDesk.unsent(card, `write_only`)) {
              (0, roomPageContext.setInlineAskNotice)(askCardMod.ASK_CARD_WORDS.write_only);
            }
            return;
          }
          roomPageContext.elementRef11.current(card, response2.verdict);
        }
      });
    });
  }, [roomPageContext.inlineAskHost, roomPageContext.onPost]);
}

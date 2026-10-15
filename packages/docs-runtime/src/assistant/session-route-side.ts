/** session-route-side: restored from sessionRouteSide-BNkod0w8.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  frameHotProvide,
  frameViewerDirtyNow,
  observabilityBrowserAndOperationEventsPattern22,
  quietCarrierThreads,
  resolveCommentsStoreLayer,
  resolveDataModelSchemasLabel2,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSessionAndSourcesFailed,
  useCommentStore,
} from "../platform/index";
import { isFrameArtifact } from "../boot/environment";
import {
  CLAUDE_ASKED_WAITING_MESSAGE,
  claudeAskRoute,
  INLINE_ASK_TOAST_ID,
  reportCommentSessionEvent,
} from "../document-app/index";
import {
  buildClaudeRequest,
  createClaudeSessionSender,
  createCommentAnchorRetryQueue as createOwedSummons,
} from "../platform/lazy";
var INTERACTIVE_OVERLAY_SELECTOR: string = `[role="dialog"],[role="alertdialog"],[role="menu"],[role="listbox"],[role="tooltip"],[role="combobox"],[popover],dialog[open],[aria-modal="true"],[data-radix-popper-content-wrapper],[data-state="open"],[data-comment-stop][data-expanded],[data-testid="ldoc-comment-draft"],[data-testid="ldoc-comments"]`;
var TEXT_ENTRY_SELECTOR: string = `input,textarea,select,[contenteditable=""],[contenteditable="true"],[contenteditable="plaintext-only"],[role="textbox"],[role="searchbox"],[role="spinbutton"]`;
function pageTargetIsIdle(
  target?: Dynamic,
  body?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (target == null || target === body) return true;
  let candidate: Dynamic = target;
  if (
    typeof candidate.closest != `function` ||
    typeof candidate.getAttribute != `function`
  )
    return true;
  let element: Dynamic = candidate;
  return !(
    element.closest(TEXT_ENTRY_SELECTOR) !== null ||
    element.closest(INTERACTIVE_OVERLAY_SELECTOR) !== null ||
    element.getAttribute(`aria-expanded`) === `true`
  );
}
function pageHasActiveEdits(
  state?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    (state.focusId !== null && state.focusId !== undefined) ||
    (state.draftAnchor !== null && state.draftAnchor !== undefined)
  )
    return true;
  for (let pageHasActiveEditsResult of state.dirtyEditors as Dynamic)
    if (pageHasActiveEditsResult !== state.askBoxId) return true;
  return state.listPopover || state.widgetPlacing || state.linkPopover;
}
function maySummonAtPage(
  eventState?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    !eventState.pageHadUse &&
    !eventState.defaultPrevented &&
    !eventState.keyboardInDocument &&
    pageTargetIsIdle(eventState.target, eventState.body)
  );
}
var RETRYABLE_SUMMON_REASONS: Dynamic = [
  `line_changed`,
  `busy`,
  `not_ready`,
  `narrow`,
  `not_found`,
  `error`,
];
var SUMMON_RETRY_LADDER_MS: Dynamic = [300, 1e3, 3e3, 1e4];
function summonRetryVerdict(
  shown?: Dynamic,
  result?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return shown ? `shown` : result === `refuse` ? `give_up` : `retry`;
}
function makeSummonRetry(
  deps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let retryLadder: Dynamic = deps.ladderMs ?? SUMMON_RETRY_LADDER_MS;
  let unansweredMs: Dynamic = deps.unansweredMs ?? 5e3;
  let requestKey: Dynamic = null;
  let attempt: number = 0;
  let retryTimer: Dynamic = null;
  let attemptNonce: number = 0;
  let unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
  let disposed: boolean = false;
  let openedRequest: Dynamic = null;
  let clearOpenedRequest = (..._extraArguments: unknown[]): undefined =>
    void (openedRequest = null);
  let tryPendingRequest = (..._extraArguments: unknown[]): undefined => {
    if (disposed) return;
    let pending: Dynamic = deps.pending();
    if (pending === null) {
      if (openedRequest === null) {
        unsubscribeRequest();
        unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
      }
      requestKey = null;
      return;
    }
    if (
      (requestKey !== null && requestKey.bid === pending.bid) ||
      (unsubscribeRequest(),
      (unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {}),
      clearOpenedRequest(),
      pending.bid !== retryTimer && ((retryTimer = pending.bid), (attempt = 0)),
      attempt > retryLadder.length)
    )
      return;
    let nonce: Dynamic = attemptNonce + 1;
    if (
      deps.post({
        type: `inline-ask-reopen`,
        bid: pending.bid,
        req: nonce,
      })
    ) {
      attemptNonce = nonce;
      requestKey = {
        req: nonce,
        bid: pending.bid,
      };
      openedRequest = {
        bid: pending.bid,
        req: nonce,
      };
      unsubscribeRequest = deps.wait(
        (..._extraArguments: unknown[]): undefined => {
          if (openedRequest !== null && openedRequest.req === nonce) {
            openedRequest = null;
          }
          if (!(requestKey === null || requestKey.req !== nonce)) {
            requestKey = null;
            attempt += 1;
            tryPendingRequest();
          }
        },
        unansweredMs,
      );
    }
  };
  return {
    kick: tryPendingRequest,
    retry(..._extraArguments: unknown[]): undefined {
      if (!disposed) {
        unsubscribeRequest();
        unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
        clearOpenedRequest();
        requestKey = null;
        attempt += 1;
        if (attempt <= retryLadder.length) {
          unsubscribeRequest = deps.wait(
            tryPendingRequest,
            retryLadder[attempt - 1],
          );
        }
      }
    },
    nudge(..._extraArguments: unknown[]): undefined {
      if (!disposed) {
        unsubscribeRequest();
        unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
        clearOpenedRequest();
        requestKey = null;
        attempt = 0;
        tryPendingRequest();
      }
    },
    fresh(..._extraArguments: unknown[]): undefined {
      unsubscribeRequest();
      unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
      requestKey = null;
      clearOpenedRequest();
      tryPendingRequest();
    },
    refused(
      requestId?: Dynamic,
      bid?: Dynamic,
      why?: Dynamic,
      ..._extraArguments: unknown[]
    ): string {
      return disposed ||
        requestKey === null ||
        typeof requestId != `number` ||
        requestId !== requestKey.req ||
        bid !== requestKey.bid ||
        typeof why != `string` ||
        !RETRYABLE_SUMMON_REASONS.includes(why)
        ? `ignored`
        : (unsubscribeRequest(),
          (unsubscribeRequest = (
            ..._extraArguments: unknown[]
          ): undefined => {}),
          (requestKey = null),
          clearOpenedRequest(),
          why === `line_changed`
            ? `kill`
            : ((attempt += 1),
              attempt <= retryLadder.length &&
                (unsubscribeRequest = deps.wait(
                  tryPendingRequest,
                  retryLadder[attempt - 1],
                )),
              `retry`));
    },
    opened(bid?: Dynamic, ..._extraArguments: unknown[]): boolean {
      let matchesOpened: boolean =
        openedRequest !== null && openedRequest.bid === bid;
      if (matchesOpened) {
        clearOpenedRequest();
      }
      if (requestKey !== null && requestKey.bid === bid) {
        unsubscribeRequest();
        unsubscribeRequest = (..._extraArguments: unknown[]): undefined => {};
        requestKey = null;
      }
      return matchesOpened;
    },
    outstanding: (..._extraArguments: unknown[]): Dynamic => requestKey,
    dispose(..._extraArguments: unknown[]): undefined {
      disposed = true;
      unsubscribeRequest();
      requestKey = null;
      clearOpenedRequest();
    },
  };
}
function createSessionCarrierComment(
  carrier?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentStore: Dynamic = useCommentStore.getState();
  return commentStore
    .create(carrier.container, carrier.page, {
      docId: carrier.page,
      body: carrier.post.body,
      to: carrier.post.to,
      path: carrier.path,
      y: carrier.y,
      focus: false,
      roomNode: carrier.roomNode,
      summonBlock: {
        bid: carrier.bid,
      },
      summon: true,
      toClaude: true,
      quietCarrier: true,
      summonText: carrier.post.summonText,
      summonOwedTo: carrier.page,
      target: {
        pageId: carrier.page,
        anchor: {
          kind: `lfile`,
          ref: `${carrier.path}#${carrier.docNode}`,
        },
      },
    })
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        commentStore
          .resolve(carrier.container, carrier.page, result)
          .catch(
            (..._extraArguments: unknown[]): undefined =>
              void quietCarrierThreads.delete(result),
          ),
        result
      ),
    );
}
function postHasOtherRecipients(
  post?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    post.cc.length > 0 ||
    post.to.some(
      (to?: Dynamic, ..._extraArguments: unknown[]) => to !== `claude`,
    )
  );
}
function samePendingCard(
  current?: Dynamic,
  request?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    current !== null &&
    request !== null &&
    current.card === request.card &&
    current.words === request.words &&
    !current.accepted &&
    !current.fellBack
  );
}
function isLivePendingCard(
  current?: Dynamic,
  request?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return samePendingCard(current, request) && current !== null && !current.dead;
}
function killCurrentRoute(
  routeRef?: Dynamic,
  clearTimer?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let route: Dynamic = routeRef.current;
  if (route !== null) {
    route.dead = true;
    clearTimer(route.failTimer);
    routeRef.current = null;
  }
}
var routeDispatchListeners: Dynamic = new (Map as Dynamic)();
function registerRouteDispatch(
  card?: Dynamic,
  listener?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  routeDispatchListeners.set(card, listener);
}
function unregisterRouteDispatch(
  card?: Dynamic,
  listener?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (routeDispatchListeners.get(card) === listener) {
    routeDispatchListeners.delete(card);
  }
}
var routeCarrierDispatched = (
  card?: Dynamic,
  ..._extraArguments: unknown[]
): undefined => {
  let listener: Dynamic = routeDispatchListeners.get(card);
  if (listener !== undefined) {
    listener.filed = true;
  }
};
var detachedRoutes: Dynamic = new (Set as Dynamic)();
function detachCurrentRoute(
  routeRef?: Dynamic,
  clearTimer?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let route: Dynamic = routeRef.current;
  if (route !== null) {
    if (route.accepted || route.filed) {
      route.dead = true;
    }
    route.detached = true;
    route.view = null;
    clearTimer(route.failTimer);
    routeRef.current = null;
    if (!route.dead) {
      detachedRoutes.add(route);
    }
  }
}
function findDetachedRoute(
  tab?: Dynamic,
  bid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match: Dynamic = null;
  for (let route of Array.from<Dynamic>(detachedRoutes) as Dynamic)
    if (
      route.dead ||
      route.stopped ||
      route.accepted ||
      route.filed ||
      !route.detached
    ) {
      detachedRoutes.delete(route);
    } else {
      if (!route.fellBack && route.tab === tab && route.bid === bid) {
        match = route;
      }
    }
  return match;
}
function detachedRoutesForTab(
  tab?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routes: Dynamic = [];
  for (let route of Array.from<Dynamic>(detachedRoutes) as Dynamic)
    if (
      route.dead ||
      route.stopped ||
      route.accepted ||
      route.filed ||
      !route.detached
    ) {
      detachedRoutes.delete(route);
    } else {
      if (!route.fellBack && route.tab === tab) {
        routes.push(route);
      }
    }
  return routes;
}
function reattachRoute(
  route?: Dynamic,
  routeRef?: Dynamic,
  card?: Dynamic,
  view?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  detachedRoutes.delete(route);
  route.card = card;
  route.detached = false;
  route.view = view;
  routeRef.current = route;
}
function forgetDetachedTab(
  tab?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let route of Array.from<Dynamic>(detachedRoutes) as Dynamic)
    if (route.tab === tab) {
      route.dead = true;
      detachedRoutes.delete(route);
    }
}
function routeStillWanted(
  route?: Dynamic,
  cardUp?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    !route.dead &&
    !route.stopped &&
    route.lineChanged !== true &&
    (route.detached || cardUp)
  );
}
var newDeliveryState: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
  last: null,
  holding: false,
  refused: false,
});
function deliveryTransition(
  status?: Dynamic,
  word?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  status.last = word;
  if (word === `failed`)
    return status.refused || status.holding
      ? {
          hold: false,
          unhold: false,
          unfail: false,
          delivered: false,
        }
      : ((status.holding = true),
        {
          hold: true,
          unhold: false,
          unfail: false,
          delivered: false,
        });
  let wasHolding: Dynamic = status.holding;
  let wasRefused: Dynamic = status.refused;
  status.holding = false;
  status.refused = false;
  return {
    hold: false,
    unhold: wasHolding,
    unfail: wasRefused,
    delivered: word === `sent`,
  };
}
function refuseFailedDelivery(
  status?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  status.holding = false;
  return status.last !== `failed` || status.refused
    ? false
    : ((status.refused = true), true);
}
var routeHolds: Dynamic = new (Set as Dynamic)();
var emptyRouteBag: Dynamic = {
  collect: (..._extraArguments: unknown[]) => null,
  restore: (..._extraArguments: unknown[]): undefined => {},
  carriedUnsaved: (..._extraArguments: unknown[]) => false,
  hold: (..._extraArguments: unknown[]): boolean =>
    Array.from<Dynamic>(routeHolds).some(
      (routeHold?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        routeHold.counts(),
    ),
};
function dispatchRouteOrCarrier(
  dispatch?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dispatch.road !== `route`) return dispatch.carrier();
  let fallback: Dynamic = (
    reason?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      dispatch.fellBack(reason);
    } catch {}
    return dispatch.carrier();
  };
  let bag: Dynamic = dispatch.bag;
  if (bag === null) return fallback(dispatch.noBag);
  let sent: Dynamic = dispatch.sendNow(bag, dispatch.status);
  if (sent === null) return fallback(`no_namespace`);
  let hold: Dynamic = {
    counts: dispatch.counts ?? ((..._extraArguments: unknown[]) => true),
  };
  routeHolds.add(hold);
  let releaseHold = (..._extraArguments: unknown[]): undefined =>
    void routeHolds.delete(hold);
  return sent
    .then((response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (response.ok) {
        dispatch.took(response.sent.to);
        return dispatch.id;
      }
      if (response.code === `invalid_argument`) {
        dispatch.invalid();
      }
      if (response.code === `no_gesture`) {
        dispatch.noGesture();
      }
      if (
        response.code === `claude_unavailable` ||
        response.code === `no_gesture`
      ) {
        dispatch.reprobe();
      }
      if (!dispatch.live()) {
        try {
          dispatch.dropped();
        } catch {}
        throw Error(`stopped`);
      }
      return fallback(response.code);
    })
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        releaseHold(),
        result
      ),
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw (releaseHold(), result);
      },
    );
}
frameHotProvide(`askRouteSend`, emptyRouteBag);
var claudeHost: Dynamic = createClaudeSessionSender(
  (..._extraArguments: unknown[]): Dynamic =>
    isFrameArtifact() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null,
);
var routeSides: Dynamic = new (Map as Dynamic)();
function _resetRouteSideForTest(..._extraArguments: unknown[]): undefined {
  routeSides.clear();
}
function fileCarrierWithoutView(
  route?: Dynamic,
  announceFallback?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return route.noView === null || route.filed
    ? Promise.reject(Error(`card gone`))
    : ((route.filed = true),
      resolveCommentsStoreLayer(`host`, `claude_session_run`, {
        what: `route_carrier_no_view`,
      }),
      createSessionCarrierComment(route.noView).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          announceFallback &&
            reportCommentSessionEvent(`carrier`, route.why ?? `unknown`),
          result
        ),
      ));
}
function createRouteSide(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routeSequence: number = 0;
  let disposed: boolean = false;
  let deliveryPromises: Dynamic = new (Set as Dynamic)();
  let currentOwedSummons: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let tab: Dynamic = host.now().tab;
    return tab ? (routeSides.get(tab) ?? null) : null;
  };
  let setOwedSummons = (
    summons?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let tab: Dynamic = host.now().tab;
    if (tab) {
      if (summons === null) {
        routeSides.delete(tab);
      } else {
        routeSides.set(tab, summons);
      }
    }
  };
  let clearTimer: Dynamic = (
    timer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (window as Dynamic).clearTimeout(timer);
  let pendingSummons: Dynamic = null;
  let summonRetry: Dynamic = makeSummonRetry({
    pending: (..._extraArguments: unknown[]): Dynamic => {
      let tab: Dynamic = host.now().tab;
      let at: Dynamic = tab ? detachedRoutesForTab(tab).at(-1) : undefined;
      let currentOwedSummons2: Dynamic = currentOwedSummons();
      return at === undefined
        ? currentOwedSummons2 === null
          ? null
          : {
              bid: currentOwedSummons2.bid,
            }
        : {
            bid: at.bid,
          };
    },
    post: (routeSide?: Dynamic, ..._extraArguments: unknown[]): boolean => {
      let selbarPort: Dynamic = host.selbarPortRef.current;
      return selbarPort === null || host.goneRef.current
        ? false
        : ((pendingSummons =
            typeof document === "undefined"
              ? null
              : (document as Dynamic).activeElement),
          selbarPort.postMessage(routeSide),
          true);
    },
    wait: (
      routeSide?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let setTimeout: Dynamic = (window as Dynamic).setTimeout(
        routeSide,
        options,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        (window as Dynamic).clearTimeout(setTimeout);
    },
  });
  let unsubscribeStore: Dynamic = useCommentStore.subscribe(
    (..._extraArguments: unknown[]): undefined => {
      let currentOwedSummons2: Dynamic = currentOwedSummons();
      if (
        !(
          currentOwedSummons2 === null ||
          !currentOwedSummons2.waiting ||
          host.blocked() !== null ||
          host.inlineAskHost.current() !== null
        )
      ) {
        setOwedSummons({
          ...currentOwedSummons2,
          waiting: false,
        });
        summonRetry.nudge();
      }
    },
  );
  let handleEscape = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.key !== `Escape` || event.isComposing) return;
    let inHandCard: Dynamic = host.askCardDeskRef.current?.inHand() ?? null;
    if (
      inHandCard === null ||
      host.inlineAskHost.current()?.nonce !== inHandCard
    )
      return;
    let commentState: Dynamic = useCommentStore.getState();
    let hasActiveEdits: Dynamic = pageHasActiveEdits({
      focusId: commentState.focusId,
      draftAnchor: commentState.draftAnchor,
      dirtyEditors: commentState.dirtyEditors,
      askBoxId: INLINE_ASK_TOAST_ID,
      listPopover:
        host.collapsedRef.current && commentState.commentMode === `list`,
      widgetPlacing: host.widgetPlacingRef.current,
      linkPopover: host.linkPopRef.current !== null,
    });
    let frameHasFocus: boolean =
      (document as Dynamic).activeElement === host.iframeRef.current;
    let target: Dynamic = event.target;
    (window as Dynamic).setTimeout(
      (..._extraArguments: unknown[]): undefined => {
        if (
          maySummonAtPage({
            pageHadUse: hasActiveEdits,
            defaultPrevented: event.defaultPrevented,
            keyboardInDocument: frameHasFocus,
            target: target,
            body: (document as Dynamic).body,
          })
        ) {
          if (
            !(
              host.askCardDeskRef.current?.inHand() !== inHandCard ||
              host.inlineAskHost.current()?.nonce !== inHandCard
            )
          ) {
            host.stopAskCard(inHandCard);
          }
        }
      },
      0,
    );
  };
  (window as Dynamic).addEventListener(`keydown`, handleEscape, true);
  let postCard = (
    card?: Dynamic,
    words?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let desk: Dynamic = host.askCardDeskRef.current;
    if (!desk || host.inlineAskHost.current()?.nonce !== card) return false;
    host.setInlineAskNotice(null);
    host.setAskCardBusy(card);
    let clearBusy: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      host.setAskCardBusy(
        (routeSide?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          routeSide === card ? null : routeSide,
      );
    let settled: Dynamic = new (Promise as Dynamic)(
      (
        resolve?: Dynamic,
        reject?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        host.closedCardsRef.current.delete(card);
        desk.sent(
          card,
          {
            body: words.body,
            to: words.to,
            cc: words.cc,
          },
          {
            resolve: (
              routeSide?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (clearBusy(), resolve(routeSide)),
            reject: (
              routeSide?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (clearBusy(), reject(routeSide)),
          },
        );
        (window as Dynamic).clearTimeout(host.cardWatchRef.current);
        host.sessionLateRef.current = null;
        host.sessionStoppedRef.current = null;
        host.feedWatch(true);
        resolvePlatformAnnouncementsValue(
          document,
          CLAUDE_ASKED_WAITING_MESSAGE,
          {
            key: `inline-ask`,
          },
        );
        host.threadCheck();
      },
    );
    settled.catch((..._extraArguments: unknown[]): undefined => {});
    host.sessionWaitRef.current = {
      card: card,
      settled: settled,
    };
    return true;
  };
  let applyDeliveryStatus = (
    route?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let sessionRuns: Dynamic = host.sessionRunsRef.current;
    let isCurrentRoute: Dynamic = (..._extraArguments: unknown[]): boolean =>
      host.sessionRouteSendRef.current === route && !route.dead;
    if (!isCurrentRoute() || sessionRuns === null) return;
    let { card: card, id: routeId }: Dynamic = route;
    let lastStatus: Dynamic = route.last;
    if (
      lastStatus !== null &&
      lastStatus.state !== `failed` &&
      route.status.refused
    ) {
      route.last = null;
      let transition2: Dynamic = deliveryTransition(
        route.status,
        lastStatus.state,
      );
      resolveCommentsStoreLayer(`host`, `claude_session_run`, {
        what: `route_unfailed`,
        state: lastStatus.state,
      });
      if (
        host.inlineAskHost.current()?.nonce !== card ||
        !sessionRuns.unfail(card, routeId) ||
        !sessionRuns.resume(card)
      )
        return;
      postCard(card, route.words);
      if (transition2.delivered) {
        sessionRuns.delivered(routeId);
      }
      return;
    }
    if (
      sessionRuns.threadOf(card) !== routeId ||
      (route.accepted && sessionRuns.delivered(routeId), lastStatus === null)
    )
      return;
    route.last = null;
    let transition: Dynamic = deliveryTransition(
      route.status,
      lastStatus.state,
    );
    if (transition.unhold) {
      (window as Dynamic).clearTimeout(route.failTimer);
      route.failTimer = undefined;
    }
    if (transition.delivered) {
      sessionRuns.delivered(routeId);
    }
    if (lastStatus.state === `failed`) {
      route.held = lastStatus;
    }
    if (transition.hold) {
      route.failTimer = (window as Dynamic).setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          route.failTimer = undefined;
          let sessionRuns2: Dynamic = host.sessionRunsRef.current;
          if (
            !isCurrentRoute() ||
            sessionRuns2 === null ||
            sessionRuns2.threadOf(route.card) !== routeId
          )
            return void ((route.status.holding = false),
            (route.last ??=
              route.status.last === `failed`
                ? (route.held ?? lastStatus)
                : null));
          if (refuseFailedDelivery(route.status)) {
            sessionRuns2.threadSaid(
              routeId,
              `refused`,
              resolvePlatformSessionAndSourcesFailed(
                `failed`,
                (route.held ?? lastStatus).reason,
              ),
            );
          }
        },
        1500,
      );
    }
  };
  let carrierView: Dynamic = (
    route?: Dynamic,
    noView?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let isCurrentRoute: Dynamic = (..._extraArguments: unknown[]): boolean =>
      host.sessionRouteSendRef.current === route && !route.dead;
    return {
      cardUp: (..._extraArguments: unknown[]): Dynamic =>
        isCurrentRoute() &&
        host.sessionLineRef.current !== null &&
        host.sessionLineRef.current.card === route.card &&
        host.sessionLineRef.current.words === route.words &&
        host.inlineAskHost.current()?.nonce === route.card,
      carrierSend: (..._extraArguments: unknown[]): Dynamic =>
        host.carrierSend(
          route.card,
          route.words,
          noView()
            ? (..._extraArguments: unknown[]): Dynamic =>
                reportCommentSessionEvent(
                  `carrier`,
                  route.why ?? claudeHost.last(),
                )
            : null,
        ),
      apply: (..._extraArguments: unknown[]): Dynamic =>
        applyDeliveryStatus(route),
      accepted: (..._extraArguments: unknown[]): undefined =>
        void (
          isCurrentRoute() &&
          (window as Dynamic).setTimeout(
            (..._extraArguments: unknown[]): Dynamic =>
              applyDeliveryStatus(route),
            0,
          )
        ),
      lateAccepted: (..._extraArguments: unknown[]): undefined => {
        let sessionRuns: Dynamic = host.sessionRunsRef.current;
        if (
          !(
            sessionRuns === null ||
            host.sessionRouteSendRef.current !== route ||
            host.inlineAskHost.current()?.nonce !== route.card ||
            host.sessionLineRef.current?.words !== route.words
          )
        ) {
          if (sessionRuns.lateAccepted(route.card, route.bid, route.id)) {
            host.setInlineAskNotice(null);
            host.sessionLateRef.current = route.card;
            host.feedWatch(true);
          }
        }
      },
    };
  };
  let restoreAskDraft = (
    card?: Dynamic,
    body?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let request: Dynamic =
      host.askCardModRef.current?.askOfCardBody(body) ??
      host.sessionModRef.current?.askWordsOf(body) ??
      ``;
    let documentJson: Dynamic = resolveDataModelSchemasLabel2();
    let firstBlock: Dynamic = documentJson.content?.[0];
    if (!firstBlock?.content || request === ``) return;
    let draftKey: string = `claude-ask-card:${(host.askCardSeqRef.current += 1)}`;
    let mentionMarks: Dynamic = [];
    request
      .split(
        `
`,
      )
      .forEach(
        (
          requestPart?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (index > 0) {
            mentionMarks.push({
              type: `hardBreak`,
            });
          }
          if (requestPart !== ``) {
            mentionMarks.push({
              type: `text`,
              text: (index === 0 ? ` ` : ``) + requestPart,
            });
          }
        },
      );
    firstBlock.content = [firstBlock.content[0], ...mentionMarks];
    useCommentStore.getState().stashReplyDraft(draftKey, null);
    useCommentStore.getState().stashReplyDraft(draftKey, {
      json: documentJson,
      pageId: host.now().pageId,
    });
    host.setAskCardDraft({
      nonce: card,
      key: draftKey,
    });
  };
  let routeNotTaken = (
    card?: Dynamic,
    why?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    host.setAskCardDraft(null);
    resolveCommentsStoreLayer(`host`, `claude_session_run`, {
      what: `route_not_taken_back`,
      asked: why,
    });
    if (!why || host.inlineAskHost.current()?.nonce !== card) return;
    let activeElement: Dynamic =
      typeof document === "undefined"
        ? null
        : (document as Dynamic).activeElement;
    let cardHasFocus: boolean =
      activeElement instanceof (HTMLElement as Dynamic) &&
      activeElement.closest(`[data-inline-ask="${card}"]`) !== null;
    host.inlineAskHost.cancel({
      restoreCaret: false,
    });
    let summons: Dynamic = pendingSummons;
    if (
      (cardHasFocus ||
        activeElement === null ||
        activeElement === (document as Dynamic).body) &&
      summons instanceof (HTMLElement as Dynamic) &&
      summons.isConnected &&
      summons !== (document as Dynamic).body
    ) {
      summons.focus({
        preventScroll: true,
      });
    }
  };
  let beginRoute = (
    card?: Dynamic,
    request?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    restoreAskDraft(card, request.words.body);
    host
      .ensureSessionRunsLoaded()
      .then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let sessionRuns: Dynamic = host.sessionRunsRef.current;
        if (
          !(
            host.goneRef.current || host.inlineAskHost.current()?.nonce !== card
          )
        ) {
          if (
            !result ||
            sessionRuns === null ||
            request.promise === null ||
            request.dead ||
            request.stopped ||
            request.accepted ||
            request.fellBack ||
            request.filed ||
            !request.detached ||
            sessionRuns.live() !== null
          )
            return routeNotTaken(card, options);
          (window as Dynamic).clearTimeout(request.boundTimer);
          request.boundTimer = undefined;
          reattachRoute(
            request,
            host.sessionRouteSendRef,
            card,
            carrierView(request, (..._extraArguments: unknown[]) => true),
          );
          deliveryPromises.add(card);
          host.sessionCardsRef.current.add(card);
          host.askLineBidRef.current.set(card, request.bid);
          host.sessionLineRef.current = {
            card: card,
            node: host.roomNodeIdRef.current ?? ``,
            words: request.words,
            block: {
              bid: request.bid,
            },
          };
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_taken_back`,
          });
          if (sessionRuns.join(card, request.bid, request.promise)) {
            sessionRuns.lineIs(card, request.bid);
          }
          postCard(card, request.words);
        }
      });
  };
  return {
    probe: (..._extraArguments: unknown[]): undefined =>
      void claudeHost.probe(),
    start(
      card?: Dynamic,
      request?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let sessionModule: Dynamic = host.sessionModRef.current;
      let road: string =
        sessionModule === null
          ? `carrier`
          : claudeAskRoute({
              noCommentSwitch: true,
              probe: claudeHost.last(),
            });
      if (road !== `route` || sessionModule === null)
        return host.carrierSend(
          card,
          request.words,
          (..._extraArguments: unknown[]): Dynamic =>
            reportCommentSessionEvent(`carrier`, claudeHost.last()),
        );
      let requestText: Dynamic = sessionModule.askWordsOf(request.words.body);
      let bid: Dynamic = frameViewerDirtyNow()
        ? null
        : (host.askLineBidRef.current.get(card) ?? null);
      let page: Dynamic = host.now();
      let tab: Dynamic = page.tab ?? null;
      let hasPeople: Dynamic = postHasOtherRecipients(request.words);
      let routeBag: Dynamic =
        hasPeople || bid === null || tab === null || tab === ``
          ? null
          : buildClaudeRequest({
              request: requestText,
              instruction: sessionModule.SESSION_ROUTE_INSTRUCTION,
              tab: tab,
              nodeId: request.node,
              blockId: bid,
            });
      let routeId: string = `route:${(routeSequence += 1)}`;
      let nodeId: Dynamic = host.inlineAskHost.current()?.nodeId ?? null;
      let noViewCarrier: Dynamic =
        bid === null ||
        !page.pid ||
        tab === null ||
        tab === `` ||
        !page.roomNodeId ||
        nodeId === null
          ? null
          : {
              container: `projects/${page.pid}`,
              page: tab,
              path: page.path,
              docNode: nodeId,
              roomNode: page.roomNodeId,
              bid: bid,
              y: host.inlineAskHost.current()?.rect.top ?? 0,
              post: sessionModule.carrierPostOf({
                body: request.words.body,
                to: request.words.to,
              }),
            };
      let route: Dynamic = {
        card: card,
        id: routeId,
        words: request.words,
        tab: tab ?? ``,
        bid: bid ?? ``,
        why: undefined,
        promise: null,
        noView: noViewCarrier,
        accepted: false,
        fellBack: false,
        filed: false,
        dead: false,
        stopped: false,
        detached: false,
        bound: false,
        last: null,
        held: null,
        status: newDeliveryState(),
        failTimer: undefined,
        view: null,
        at: Date.now(),
        boundTimer: undefined,
      };
      route.view = carrierView(route, (..._extraArguments: unknown[]) => true);
      let onStatus = (
        status?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!route.dead) {
          route.last = status;
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_status`,
            state: status.state,
          });
          route.view?.apply();
        }
      };
      if (routeBag !== null && routeBag.bag !== null && bid !== null) {
        host.sessionRouteSendRef.current = route;
        host.sessionLineRef.current = {
          ...request,
          block: {
            bid: bid,
          },
        };
      }
      let dispatchResult: Dynamic = dispatchRouteOrCarrier({
        road: road,
        bag: routeBag === null ? null : routeBag.bag,
        noBag: hasPeople
          ? `has_people`
          : bid === null
            ? `no_line`
            : routeBag === null
              ? `no_tab`
              : routeBag.bag === null
                ? routeBag.why
                : `too_long`,
        id: routeId,
        sendNow: (
          routeSide?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => claudeHost.send(routeSide, options),
        carrier: (..._extraArguments: unknown[]): Dynamic => {
          if (route.view === null) return fileCarrierWithoutView(route, true);
          let card2: Dynamic = route.card;
          registerRouteDispatch(card2, route);
          return route.view.carrierSend().then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              unregisterRouteDispatch(card2, route),
              (route.filed = true),
              result
            ),
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              unregisterRouteDispatch(card2, route);
              if (
                route.detached &&
                !route.filed &&
                routeStillWanted(route, false)
              )
                return fileCarrierWithoutView(route, true);
              throw result;
            },
          );
        },
        live: (..._extraArguments: unknown[]): Dynamic =>
          routeStillWanted(route, route.view?.cardUp() ?? false),
        dropped: (..._extraArguments: unknown[]): undefined => {
          let dead: Dynamic = route.dead;
          route.dead = true;
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_dropped`,
          });
          if (
            route.lineChanged === true &&
            route.view === null &&
            !dead &&
            !route.stopped &&
            route.tab !== ``
          ) {
            routeSides.set(route.tab, {
              bid: route.bid,
              body: route.words.body,
              say: `no_spot`,
              card: null,
              waiting: false,
            });
          }
        },
        counts: (..._extraArguments: unknown[]): boolean =>
          !route.dead && !route.stopped,
        took: (
          routeSide?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_sent`,
            to: routeSide,
            view: route.view !== null,
          });
          if (!(route.dead && !route.bound)) {
            route.accepted = true;
            (window as Dynamic).clearTimeout(route.boundTimer);
            route.boundTimer = undefined;
            if (
              route.bound &&
              route.view === null &&
              routeSides.get(route.tab)?.body === route.words.body &&
              routeSides.get(route.tab)?.bid === route.bid
            ) {
              routeSides.delete(route.tab);
            }
            reportCommentSessionEvent(
              routeSide === `session` || routeSide === `new`
                ? `route_${routeSide}`
                : `route_other`,
            );
            if (routeSide !== `session` && routeSide !== `new`) {
              claudeHost.probe();
            }
            if (route.bound) {
              route.view?.lateAccepted();
            } else {
              route.view?.accepted();
            }
          }
        },
        status: onStatus,
        fellBack: (
          routeSide?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          route.fellBack = true;
          route.why = routeSide;
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_fell_back`,
            why: routeSide,
          });
        },
        reprobe: (..._extraArguments: unknown[]): undefined =>
          void claudeHost.probe(),
        invalid: (..._extraArguments: unknown[]): Dynamic =>
          reportCommentSessionEvent(`invalid_bag`),
        noGesture: (..._extraArguments: unknown[]): Dynamic =>
          reportCommentSessionEvent(`no_gesture`),
      });
      route.promise = dispatchResult;
      return dispatchResult;
    },
    pending: (routeSide?: Dynamic, ..._extraArguments: unknown[]): boolean =>
      isLivePendingCard(host.sessionRouteSendRef.current, routeSide),
    unanswered: (routeSide?: Dynamic, ..._extraArguments: unknown[]): boolean =>
      samePendingCard(host.sessionRouteSendRef.current, routeSide),
    letGo(..._extraArguments: unknown[]): undefined {
      killCurrentRoute(host.sessionRouteSendRef, clearTimer);
      let tab: Dynamic = host.now().tab;
      if (tab) {
        forgetDetachedTab(tab);
      }
    },
    movedFrom(summons?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (host.sessionRouteSendRef.current?.card === summons) {
        killCurrentRoute(host.sessionRouteSendRef, clearTimer);
      }
      let tab: Dynamic = host.now().tab;
      if (tab) {
        forgetDetachedTab(tab);
      }
    },
    detach(..._extraArguments: unknown[]): undefined {
      let currentRoute: Dynamic = host.sessionRouteSendRef.current;
      detachCurrentRoute(host.sessionRouteSendRef, clearTimer);
      deliveryPromises.clear();
      let owedSummons: Dynamic = currentOwedSummons();
      if (owedSummons !== null) {
        setOwedSummons({
          ...owedSummons,
          card: null,
          waiting: false,
        });
      }
      if (currentRoute === null || currentRoute.dead) return;
      if (currentRoute.fellBack && !currentRoute.filed) {
        let storeState: Dynamic = useCommentStore.getState();
        if (storeState.quietPost?.autopost?.nonce === currentRoute.card) {
          storeState.setQuietPost(null);
        }
        host.inlineAskHost.abandon(currentRoute.card);
        return;
      }
      if (currentRoute.accepted || currentRoute.fellBack) return;
      let maxRunMs: Dynamic =
        host.sessionModRef.current?.SESSION_RUN_MAX_MS ?? 6e5;
      currentRoute.boundTimer = (window as Dynamic).setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          currentRoute.boundTimer = undefined;
          if (
            !(
              !currentRoute.detached ||
              currentRoute.dead ||
              currentRoute.accepted ||
              currentRoute.fellBack ||
              currentRoute.stopped
            )
          ) {
            currentRoute.dead = true;
            currentRoute.bound = true;
            resolveCommentsStoreLayer(`host`, `claude_session_run`, {
              what: `route_bound_no_view`,
            });
            if (currentRoute.tab !== ``) {
              routeSides.set(currentRoute.tab, {
                bid: currentRoute.bid,
                body: currentRoute.words.body,
                say: currentRoute.lineChanged === true ? `no_spot` : `unsent`,
                card: null,
                waiting: false,
              });
            }
          }
        },
        Math.max(0, maxRunMs - (Date.now() - currentRoute.at)),
      );
    },
    kick: (..._extraArguments: unknown[]): Dynamic => summonRetry.kick(),
    portMade: (..._extraArguments: unknown[]): Dynamic => summonRetry.fresh(),
    cardOpened(request?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (disposed) return;
      let tab: Dynamic = host.now().tab;
      let bid: Dynamic =
        typeof request.bid == `string` &&
        observabilityBrowserAndOperationEventsPattern22.test(request.bid)
          ? request.bid
          : null;
      let opened: Dynamic = bid !== null && summonRetry.opened(bid);
      let detached: Dynamic =
        request.accepted && request.writeCard && bid !== null && tab
          ? findDetachedRoute(tab, bid)
          : null;
      if (detached !== null) return beginRoute(request.nonce, detached, opened);
      let owedSummons: Dynamic = currentOwedSummons();
      if (
        owedSummons !== null &&
        (owedSummons.card === request.nonce ||
          (owedSummons.card === null && opened && owedSummons.bid === bid))
      ) {
        let summonRetryVerdict2: string = summonRetryVerdict(
          request.accepted,
          host.blocked(),
        );
        resolveCommentsStoreLayer(`host`, `claude_session_run`, {
          what: `route_words_return`,
          fate: summonRetryVerdict2,
        });
        if (summonRetryVerdict2 === `shown`) {
          setOwedSummons(null);
          restoreAskDraft(request.nonce, owedSummons.body);
          host.setInlineAskNotice(
            host.askCardModRef.current?.ASK_CARD_WORDS[owedSummons.say] ?? null,
          );
        } else {
          if (summonRetryVerdict2 === `give_up`) {
            setOwedSummons(null);
          } else {
            setOwedSummons({
              ...owedSummons,
              card: null,
              waiting: true,
            });
            summonRetry.retry();
          }
        }
        return;
      }
      if (opened && request.accepted && request.writeCard) {
        routeNotTaken(request.nonce, true);
      }
    },
    lineSaid(
      card?: Dynamic,
      why?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        disposed ||
        (why !== null &&
          !observabilityBrowserAndOperationEventsPattern22.test(why))
      )
        return;
      let currentRoute: Dynamic = host.sessionRouteSendRef.current;
      if (
        !(
          currentRoute === null ||
          currentRoute.card !== card ||
          host.inlineAskHost.current()?.nonce !== card
        )
      ) {
        if (
          !currentRoute.accepted &&
          !currentRoute.fellBack &&
          !currentRoute.dead &&
          currentRoute.lineChanged !== true &&
          currentRoute.bid !== why
        ) {
          currentRoute.lineChanged = true;
          resolveCommentsStoreLayer(`host`, `claude_session_run`, {
            what: `route_line_changed`,
          });
        }
      }
    },
    lineLost: (routeSide?: Dynamic, ..._extraArguments: unknown[]): boolean =>
      host.sessionRouteSendRef.current?.card === routeSide &&
      host.sessionRouteSendRef.current.lineChanged === true,
    reopenRefused(refusal?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let bid: Dynamic = refusal.bid;
      if (
        disposed ||
        typeof bid != `string` ||
        !observabilityBrowserAndOperationEventsPattern22.test(bid)
      )
        return;
      let result: Dynamic = summonRetry.refused(refusal.req, bid, refusal.why);
      resolveCommentsStoreLayer(`host`, `claude_session_run`, {
        what: `route_reopen_refused`,
        heard: result,
      });
      let tab: Dynamic = host.now().tab;
      let detached: Dynamic =
        result === `kill` && tab ? findDetachedRoute(tab, bid) : null;
      let owedSummons: Dynamic = currentOwedSummons();
      if (
        result === `kill` &&
        detached === null &&
        owedSummons !== null &&
        owedSummons.bid === bid
      ) {
        let card: Dynamic = refusal.card;
        setOwedSummons(
          typeof card == `number` && Number.isFinite(card)
            ? {
                ...owedSummons,
                say: `no_spot`,
                card: card,
                waiting: false,
              }
            : null,
        );
      }
      if (detached !== null) {
        detached.dead = true;
        let card: Dynamic = refusal.card;
        if (typeof card == `number` && Number.isFinite(card)) {
          setOwedSummons({
            bid: bid,
            body: detached.words.body,
            say: `no_spot`,
            card: card,
            waiting: false,
          });
        }
      }
    },
    docEscape(..._extraArguments: unknown[]): boolean {
      let card: Dynamic = host.askCardDeskRef.current?.inHand() ?? null;
      return card === null ||
        host.inlineAskHost.current()?.nonce !== card ||
        !deliveryPromises.has(card)
        ? false
        : (host.stopAskCard(card), true);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      disposed = true;
      summonRetry.dispose();
      unsubscribeStore();
      (window as Dynamic).removeEventListener(`keydown`, handleEscape, true);
    },
  };
}
export { _resetRouteSideForTest, createOwedSummons, createRouteSide, routeCarrierDispatched };

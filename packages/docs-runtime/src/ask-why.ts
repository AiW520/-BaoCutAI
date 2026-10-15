/** ask-why: restored from askWhy-CqPqfGyi.js. */
import type {
  FeedbackChoice,
  CloseState,
  CloseVerdict,
  KeysDueState,
  PageEvent,
  PageDecision,
  ChipPosition,
  ChipRest,
  ChipEvent,
  ChipStepResult,
  TypedChipResult,
  KeyReport,
  FeedbackKeyDependencies,
  FeedbackKeyController,
  OfferedState,
  StorageReader,
  StorageStatus,
  FeedbackDependencies,
  FeedbackController,
  FeedbackOffer,
  FeedbackLeaveDependencies,
  FeedbackLeaveController,
  PageWatchHost,
  PageWatchCallbacks,
  PageInteraction,
  ClosestTarget,
} from "./type-models/feedback";
import type { Dispose } from "./type-models/common";
var ASK_WHY_QUESTION = `What made you close Ask Agent?`;
var ASK_WHY_CHIPS: readonly {
  word: FeedbackChoice;
  label: string;
}[] = [
  {
    word: `by_hand`,
    label: `Faster by hand`,
  },
  {
    word: `not_sure`,
    label: `Not sure what it would do`,
  },
  {
    word: `looking`,
    label: `Just looking`,
  },
  {
    word: `usage`,
    label: `Saving my usage`,
  },
  {
    word: `other`,
    label: `Other`,
  },
];
var ASK_WHY_THANKS = `Thanks for the feedback.`;
var ASK_WHY_THANKS_MS = 1500;
var ASK_WHY_IDLE_MS = 15e3;
var ASK_WHY_EASES_OUT = true;
var ASK_WHY_SETTLE_MS = 500;
function askWhyCloseVerdict(state: CloseState): CloseVerdict {
  return !state.asking && (state.by === `release` || state.by === `typing`)
    ? `hold`
    : state.asking
      ? state.by === `press` && state.sinceUpMs < 500
        ? `hold`
        : `release`
      : state.by === `page` ||
          !state.counted ||
          state.held ||
          state.docked ||
          state.onSheet
        ? `close`
        : `ask`;
}
var askWhyKeyTypes = (key: string): boolean =>
  key.length === 1 ||
  key === `Enter` ||
  key === `Backspace` ||
  key === `Delete`;
function askWhyPageEvent(event: PageEvent): PageDecision {
  let decision = {
    dismiss: false,
    claim: false,
    toText: false,
  };
  return event.trusted
    ? event.type === `mousedown`
      ? event.onCard || !event.settled
        ? decision
        : {
            ...decision,
            dismiss: true,
          }
      : event.composing === true || event.defaultPrevented === true
        ? decision
        : event.key === `Escape`
          ? event.focus === `other`
            ? decision
            : {
                dismiss: true,
                claim: true,
                toText: true,
              }
          : event.key === undefined ||
              event.chord === true ||
              !askWhyKeyTypes(event.key) ||
              event.onCard ||
              !event.settled
            ? decision
            : {
                ...decision,
                dismiss: true,
              }
    : decision;
}
function watchAskWhyPage(
  host: PageWatchHost,
  card: string,
  readState: number,
  onEvent: PageWatchCallbacks,
): Dispose {
  let isOnCard: (target: EventTarget | null) => boolean = (askWhyPage) => {
    let askWhyPage2: ClosestTarget | null = askWhyPage;
    return (
      typeof askWhyPage2 == `object` &&
      !!askWhyPage2 &&
      typeof askWhyPage2.closest == `function` &&
      askWhyPage2.closest(`[data-inline-ask="${card}"]`) !== null
    );
  };
  let handleEvent: (
    event: PageInteraction,
    type: "keydown" | "mousedown",
  ) => void = (event, options) => {
    let activeElement = host.document.activeElement;
    let key = options === `keydown` ? event.key : undefined;
    let askWhyPageEvent2 = askWhyPageEvent({
      type: options,
      trusted: event.isTrusted,
      ...(key !== undefined && {
        key: key,
        chord: event.metaKey || event.ctrlKey,
        composing: event.isComposing,
      }),
      defaultPrevented: event.defaultPrevented,
      onCard: isOnCard(event.target),
      focus: isOnCard(activeElement)
        ? `card`
        : activeElement === null || activeElement === host.document.body
          ? `none`
          : `other`,
      settled: host.performance.now() - readState >= 500,
    });
    if (askWhyPageEvent2.claim) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (askWhyPageEvent2.dismiss) {
      onEvent.close(key === `Escape` ? `escape` : `press`);
    }
    if (askWhyPageEvent2.toText) {
      onEvent.toText();
    }
  };
  let onKeyDown: (event: KeyboardEvent) => void = (askWhyPage) =>
    handleEvent(askWhyPage, `keydown`);
  let onMouseDown: (event: MouseEvent) => void = (askWhyPage) =>
    handleEvent(askWhyPage, `mousedown`);
  host.addEventListener(`keydown`, onKeyDown, true);
  host.addEventListener(`mousedown`, onMouseDown, true);
  return () => {
    host.removeEventListener(`keydown`, onKeyDown, true);
    host.removeEventListener(`mousedown`, onMouseDown, true);
  };
}
function askWhyKeysDueMs(state: KeysDueState): number | null {
  return !state.asking || state.picked || state.leaving
    ? null
    : Math.max(0, 500 - state.sinceUpMs);
}
var ASK_WHY_LIVE_CHIPS = `[data-testid="ask-why"] button:not(:disabled)`;
var ASK_WHY_GROUP = `[data-face="why"][tabindex="-1"]`;
function focusAskWhyGroup(document: Document, card: string): boolean {
  let group = document.querySelector<HTMLElement>(
    `[data-inline-ask="${card}"]${ASK_WHY_GROUP}`,
  );
  return group === null ? false : (group.focus(), true);
}
var ASK_WHY_GROUP_KEYS: {
  readonly ArrowRight: "first";
  readonly Home: "first";
  readonly ArrowLeft: "last";
  readonly End: "last";
} = {
  ArrowRight: `first`,
  Home: `first`,
  ArrowLeft: `last`,
  End: `last`,
};
function askWhyGroupStep(key: string, shift: boolean): "first" | "last" | null {
  return key === `Tab`
    ? shift
      ? `last`
      : `first`
    : shift || !Object.hasOwn(ASK_WHY_GROUP_KEYS, key)
      ? null
      : ASK_WHY_GROUP_KEYS[key as keyof typeof ASK_WHY_GROUP_KEYS];
}
var ASK_WHY_CHIP_KEYS: {
  readonly ArrowRight: 1;
  readonly ArrowDown: 1;
  readonly ArrowLeft: -1;
  readonly ArrowUp: "group";
  readonly Home: "first";
  readonly End: "last";
} = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: `group`,
  Home: `first`,
  End: `last`,
};
function askWhyChipArrow(
  key: string,
  index: number,
  count: number,
): number | "group" | null {
  if (!Object.hasOwn(ASK_WHY_CHIP_KEYS, key) || index < 0 || index >= count)
    return null;
  let step = ASK_WHY_CHIP_KEYS[key as keyof typeof ASK_WHY_CHIP_KEYS];
  return step === `group`
    ? step
    : step === `first`
      ? 0
      : step === `last`
        ? count - 1
        : Math.max(0, Math.min(count - 1, index + step));
}
var ASK_WHY_DWELL_MS = 1200;
var ASK_WHY_UNRESTED: ChipRest = {
  since: 1 / 0,
  held: null,
};
function askWhyChipStep(
  state: ChipPosition,
  event: ChipEvent,
  rest: ChipRest = ASK_WHY_UNRESTED,
  now: number = NaN,
): ChipStepResult {
  let result: (
    state: ChipPosition,
    rest?: ChipRest,
    hold?: string | null,
  ) => ChipStepResult = (whyChipStep, options = rest, context = null) => ({
    state: whyChipStep,
    spent: false,
    typed: false,
    rest: options,
    hold: context,
  });
  let typedResult: (hold: string | null) => TypedChipResult = (
    whyChipStep,
  ) => ({
    state: `typed`,
    spent: true,
    typed: true,
    rest: {
      since: now,
      held: null,
    },
    hold: whyChipStep,
  });
  let dwelled = Math.min(event.stamp, now) - rest.since >= ASK_WHY_DWELL_MS;
  if (event.type === `press`)
    return event.pointer
      ? result(state)
      : state === `typed`
        ? {
            state: state,
            spent: true,
            typed: false,
            rest: rest,
            hold: null,
          }
        : rest.held === null
          ? result(state)
          : result(state, rest, rest.held.code === `` ? null : rest.held.code);
  if (state === `typed`) return result(state);
  let activation = event.key === `Enter` || event.key === ` `;
  let code = event.code === `` ? null : event.code;
  let newRest = {
    since: now,
    held: null,
  };
  let modifiedActivation = activation && (event.chord || event.composing);
  if (event.at < 0)
    return activation && (event.repeat || modifiedActivation)
      ? typedResult(code)
      : event.composing || event.chord
        ? result(`group`, ASK_WHY_UNRESTED)
        : !event.alt && askWhyGroupStep(event.key, event.shift) !== null
          ? result(`entered`, newRest)
          : !event.shift &&
              !event.alt &&
              (event.key === `ArrowUp` || event.key === `ArrowDown`)
            ? {
                state: `group`,
                spent: true,
                typed: false,
                rest: ASK_WHY_UNRESTED,
                hold: null,
                leaves: event.key === `ArrowUp` ? `up` : `down`,
              }
            : askWhyKeyTypes(event.key)
              ? typedResult(code)
              : result(`group`, ASK_WHY_UNRESTED);
  let position = state === `away` ? `own` : state;
  let nextRest = position === `group` ? ASK_WHY_UNRESTED : newRest;
  if (activation && event.repeat)
    return rest.held?.key === event.key
      ? result(position, {
          since: now,
          held: rest.held,
        })
      : typedResult(code);
  if (modifiedActivation) return typedResult(code);
  if (event.composing || event.chord) return result(position, nextRest);
  if (event.key === `Tab`) {
    let total = event.at + (event.shift ? -1 : 1);
    return event.alt || total < 0 || total >= event.count
      ? result(position, nextRest)
      : result(position === `group` ? `entered` : position, newRest);
  }
  let nextChip =
    event.shift || event.alt
      ? null
      : askWhyChipArrow(event.key, event.at, event.count);
  return nextChip === `group`
    ? result(`group`, ASK_WHY_UNRESTED)
    : nextChip === null
      ? askWhyKeyTypes(event.key)
        ? activation &&
          (position === `own` || (position === `entered` && dwelled))
          ? result(position, {
              since: now,
              held: {
                key: event.key,
                code: event.code,
              },
            })
          : typedResult(code)
        : result(position, nextRest)
      : position === `group` && event.key === `ArrowDown`
        ? result(position, nextRest)
        : result(position === `group` ? `entered` : position, newRest);
}
function askWhyKeyReported<Card extends string>(
  state: KeyReport<Card>,
): boolean {
  let frame = state.frame;
  return !frame ||
    state.doc.activeElement !== frame ||
    state.up === null ||
    state.up.nonce !== state.nonce ||
    state.granted !== state.up.nonce ||
    askWhyKeysDueMs({
      asking: true,
      picked: state.up.picked !== null,
      leaving: state.leaving,
      sinceUpMs: state.sinceUpMs,
    }) !== 0
    ? false
    : (state.spend(state.up.nonce),
      focusAskWhyGroup(state.doc, state.up.nonce));
}
function makeAskWhyKeys<Card extends string, Handle>(
  deps: FeedbackKeyDependencies<Card, Handle>,
): FeedbackKeyController<Card> {
  let heldNonce: Card | null = null;
  let focusTimer: {
    nonce: Card;
    h: Handle;
  } | null = null;
  let position: ChipPosition = `away`;
  let rest: ChipRest = ASK_WHY_UNRESTED;
  let postHeld: (card: Card, held: boolean, code?: string) => void = (
    askWhyKeys,
    options,
    context,
  ) => {
    if (options) {
      heldNonce = askWhyKeys;
    } else {
      if (heldNonce === askWhyKeys) {
        heldNonce = null;
      }
    }
    if (context === undefined) {
      deps.post(askWhyKeys, options);
    } else {
      deps.post(askWhyKeys, options, context);
    }
  };
  let handleKey: (backInText: boolean) => void = (askWhyKeys) => {
    if (deps.doc().activeElement === deps.frame()) {
      position = `away`;
      rest = ASK_WHY_UNRESTED;
    }
    let up = deps.up();
    if (up !== null) {
      if (!askWhyKeys)
        return void (heldNonce === up.nonce && postHeld(up.nonce, false));
      if (
        askWhyKeysDueMs({
          asking: true,
          picked: up.picked !== null,
          leaving: deps.leaving(up.nonce),
          sinceUpMs: deps.sinceUpMs(),
        }) === 0
      ) {
        postHeld(up.nonce, true);
      }
    }
  };
  return {
    watch: (askWhyKeys) => {
      position = `away`;
      rest = ASK_WHY_UNRESTED;
      let setTimeout = deps.setTimeout(
        () => {
          focusTimer = null;
          postHeld(askWhyKeys, true);
        },
        askWhyKeysDueMs({
          asking: true,
          picked: false,
          leaving: false,
          sinceUpMs: deps.sinceUpMs(),
        }) ?? 0,
      );
      focusTimer = {
        nonce: askWhyKeys,
        h: setTimeout,
      };
      return () => {
        deps.clearTimeout(setTimeout);
        if (focusTimer?.h === setTimeout) {
          focusTimer = null;
        }
        postHeld(askWhyKeys, false);
      };
    },
    revoke: (askWhyKeys) => {
      if (focusTimer?.nonce === askWhyKeys) {
        deps.clearTimeout(focusTimer.h);
        focusTimer = null;
      }
      if (heldNonce === askWhyKeys) {
        postHeld(askWhyKeys, false);
      }
    },
    backInText: () => handleKey(true),
    reported: (askWhyKeys) => {
      let up = deps.up();
      let askWhyKeyReported2 = askWhyKeyReported({
        doc: deps.doc(),
        frame: deps.frame(),
        nonce: askWhyKeys,
        granted: heldNonce,
        up: up,
        leaving: up !== null && deps.leaving(up.nonce),
        sinceUpMs: deps.sinceUpMs(),
        spend: (askWhyKeys2) => postHeld(askWhyKeys2, false),
      });
      if (askWhyKeyReported2) {
        position = `group`;
        rest = ASK_WHY_UNRESTED;
        deps.heard();
      }
      return askWhyKeyReported2;
    },
    chip: (askWhyKeys) => {
      let up = deps.up();
      let askWhyChipStep2 = askWhyChipStep(
        position,
        askWhyKeys,
        rest,
        deps.now(),
      );
      position = askWhyChipStep2.state;
      rest = askWhyChipStep2.rest;
      if (askWhyKeys.type === `key`) {
        deps.heard();
      }
      if (askWhyChipStep2.typed || askWhyChipStep2.leaves !== undefined) {
        deps.toText();
      }
      if (askWhyChipStep2.hold !== null && up !== null) {
        postHeld(up.nonce, false, askWhyChipStep2.hold);
      }
      if (askWhyChipStep2.typed) {
        deps.typing();
      }
      if (askWhyChipStep2.leaves !== undefined) {
        handleKey(askWhyChipStep2.leaves === `up`);
      }
      return askWhyChipStep2.spent;
    },
    chips: () => position,
    rest: () => rest,
    granted: () => heldNonce,
  };
}
function askWhyOffered(state: OfferedState): boolean {
  return (
    state.served === true &&
    state.marks === true &&
    typeof state.viewerId == `string` &&
    state.viewerId.length > 0 &&
    state.outside === false
  );
}
var ASK_WHY_ASKED_KEY = `bongo.ask.whyAsked`;
function askWhyAsked(getStorage: StorageReader): StorageStatus {
  try {
    let storage = getStorage();
    return storage
      ? storage.getItem(`bongo.ask.whyAsked`) === null
        ? `not_asked`
        : `asked`
      : `unavailable`;
  } catch {
    return `unavailable`;
  }
}
function unmarkAskWhyAsked(getStorage: StorageReader): void {
  try {
    getStorage()?.removeItem(ASK_WHY_ASKED_KEY);
  } catch {}
}
function markAskWhyAsked(getStorage: StorageReader): boolean {
  try {
    let storage = getStorage();
    return storage
      ? (storage.setItem(ASK_WHY_ASKED_KEY, `1`),
        storage.getItem(ASK_WHY_ASKED_KEY) === `1`)
      : false;
  } catch {
    return false;
  }
}
var hasFacedFeedback = false;
var feedbackOfferOwner: object | null = null;
function _resetAskWhyFacedForTests(): void {
  hasFacedFeedback = false;
  feedbackOfferOwner = null;
}
function makeAskWhy<Card, Handle>(
  deps: FeedbackDependencies<Card, Handle>,
): FeedbackController<Card> {
  let owner = {};
  let idleMs = deps.idleMs === undefined ? ASK_WHY_IDLE_MS : deps.idleMs;
  let offer: FeedbackOffer<Card> | null = null;
  let disposed = false;
  let nonce = 0;
  let thanksTimer: Handle | null = null;
  let leaveTimer: Handle | null = null;
  let idleTimer: Handle | null = null;
  let restartIdle: (card: Card) => void = (askWhy) => {
    if (idleTimer !== null) {
      deps.clearTimeout(idleTimer);
    }
    idleTimer = null;
    if (idleMs !== null) {
      idleTimer = deps.setTimeout(() => {
        idleTimer = null;
        if (offer?.nonce === askWhy && offer.picked === null) {
          deps.release(askWhy);
        }
      }, idleMs);
    }
  };
  let clearTimers = () => {
    if (thanksTimer !== null) {
      deps.clearTimeout(thanksTimer);
    }
    thanksTimer = null;
    if (!disposed) {
      disposed = true;
      hasFacedFeedback = true;
      deps.say(`shown`);
      try {
        deps.keep?.();
      } catch {}
    }
  };
  let splitCard: NonNullable<FeedbackDependencies<Card, Handle>["split"]> = (
    askWhy,
  ) => {
    try {
      deps.split?.(askWhy);
    } catch {}
  };
  let disableKeys: (card: Card) => void = (askWhy) => {
    try {
      deps.keysOff?.(askWhy);
    } catch {}
  };
  let isRemoteStrict = () => {
    try {
      return deps.remoteStrict?.() === true;
    } catch {
      return false;
    }
  };
  let finishLeave = () => {
    if (thanksTimer !== null) {
      deps.clearTimeout(thanksTimer);
    }
    thanksTimer = null;
    if (leaveTimer !== null) {
      deps.clearTimeout(leaveTimer);
    }
    leaveTimer = null;
    if (idleTimer !== null) {
      deps.clearTimeout(idleTimer);
    }
    idleTimer = null;
    if (offer !== null) {
      disableKeys(offer.nonce);
      if (!disposed) {
        unmarkAskWhyAsked(deps.storage);
      }
      offer = null;
      if (feedbackOfferOwner === owner) {
        feedbackOfferOwner = null;
      }
      deps.show(null);
    }
    disposed = false;
  };
  return {
    closedEmpty: (askWhy) => {
      if (offer !== null || !deps.offered()) return false;
      let remoteSeen = deps.remoteSeen?.() ?? `unknown`;
      let askWhyAsked2 = askWhyAsked(deps.storage);
      return remoteSeen === `seen`
        ? (splitCard(askWhyAsked2 === `not_asked` ? `host` : `both`), false)
        : askWhyAsked2 === `asked`
          ? (splitCard(`local`), false)
          : (remoteSeen === `unknown` && isRemoteStrict()) ||
              askWhyAsked2 !== `not_asked` ||
              hasFacedFeedback ||
              feedbackOfferOwner !== null ||
              !markAskWhyAsked(deps.storage)
            ? false
            : (splitCard(remoteSeen === `unseen` ? `fresh` : `blind`),
              (offer = {
                nonce: askWhy,
                picked: null,
              }),
              (disposed = false),
              (nonce = deps.now()),
              (feedbackOfferOwner = owner),
              deps.show(offer),
              (thanksTimer = deps.setTimeout(() => {
                thanksTimer = null;
                if (offer?.nonce === askWhy && deps.offered()) {
                  clearTimers();
                }
              }, 500)),
              restartIdle(askWhy),
              true);
    },
    heard: () => {
      if (offer !== null && offer.picked === null && idleTimer !== null) {
        restartIdle(offer.nonce);
      }
    },
    pick: (askWhy) => {
      let offer2 = offer;
      if (!(!offer2 || offer2.picked !== null)) {
        disableKeys(offer2.nonce);
        if (!deps.offered()) return deps.release(offer2.nonce);
        if (idleTimer !== null) {
          deps.clearTimeout(idleTimer);
        }
        idleTimer = null;
        clearTimers();
        deps.say(askWhy);
        offer = {
          ...offer2,
          picked: askWhy,
          thanks: true,
        };
        deps.show(offer);
        try {
          deps.thank?.(ASK_WHY_THANKS);
        } catch {}
        leaveTimer = deps.setTimeout(() => {
          leaveTimer = null;
          deps.release(offer2.nonce);
        }, ASK_WHY_THANKS_MS);
      }
    },
    ending: (askWhy) => {
      if (offer?.nonce === askWhy && (disableKeys(askWhy), !disposed)) {
        if (deps.now() - nonce >= 500 && deps.offered()) return clearTimers();
        if (thanksTimer !== null) {
          deps.clearTimeout(thanksTimer);
        }
        thanksTimer = null;
      }
    },
    cardGone: (askWhy) => {
      if (offer !== null && (askWhy === undefined || askWhy === offer.nonce)) {
        finishLeave();
      }
    },
    reset: finishLeave,
    current: () => offer,
  };
}
function makeAskWhyLeave<Card, Handle>(
  deps: FeedbackLeaveDependencies<Card, Handle>,
): FeedbackLeaveController<Card> {
  let leavingCard: Card | null = null;
  let timer: Handle | null = null;
  let clearTimer = () => {
    if (timer !== null) {
      deps.clearTimeout(timer);
    }
    timer = null;
  };
  return {
    leave: (askWhyLeave) => {
      if (leavingCard === askWhyLeave) return;
      if (leavingCard !== null) {
        let leavingCard2 = leavingCard;
        leavingCard = null;
        clearTimer();
        deps.mark(leavingCard2, false);
        deps.cancel(leavingCard2);
      }
      let easeMs = deps.easeMs(askWhyLeave);
      if (easeMs <= 0) return deps.cancel(askWhyLeave);
      clearTimer();
      deps.fold(askWhyLeave);
      leavingCard = askWhyLeave;
      deps.mark(askWhyLeave, true);
      timer = deps.setTimeout(() => {
        timer = null;
        if (leavingCard === askWhyLeave) {
          leavingCard = null;
          deps.mark(askWhyLeave, false);
          if (deps.focusInCard(askWhyLeave)) {
            deps.toText();
          }
          deps.cancel(askWhyLeave);
        }
      }, easeMs);
    },
    stay: (askWhyLeave) => {
      if (leavingCard === askWhyLeave) {
        leavingCard = null;
        clearTimer();
        deps.mark(askWhyLeave, false);
      }
    },
    reset: () => {
      clearTimer();
      leavingCard = null;
    },
    going: () => leavingCard,
  };
}
export {
  ASK_WHY_ASKED_KEY,
  ASK_WHY_CHIPS,
  ASK_WHY_CHIP_KEYS,
  ASK_WHY_DWELL_MS,
  ASK_WHY_EASES_OUT,
  ASK_WHY_GROUP,
  ASK_WHY_GROUP_KEYS,
  ASK_WHY_IDLE_MS,
  ASK_WHY_LIVE_CHIPS,
  ASK_WHY_QUESTION,
  ASK_WHY_SETTLE_MS,
  ASK_WHY_THANKS,
  ASK_WHY_THANKS_MS,
  ASK_WHY_UNRESTED,
  _resetAskWhyFacedForTests,
  askWhyAsked,
  askWhyChipArrow,
  askWhyChipStep,
  askWhyCloseVerdict,
  askWhyGroupStep,
  askWhyKeyReported,
  askWhyKeyTypes,
  askWhyKeysDueMs,
  askWhyOffered,
  askWhyPageEvent,
  focusAskWhyGroup,
  makeAskWhy,
  makeAskWhyKeys,
  makeAskWhyLeave,
  markAskWhyAsked,
  unmarkAskWhyAsked,
  watchAskWhyPage,
};

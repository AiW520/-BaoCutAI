/** shell-hot: restored from shellHot-rPjAOjg8.js. */
import type { Dynamic } from "./types";
var HOT_DIRTY_ORDER: Dynamic = [
  `doc`,
  `staged`,
  `post`,
  `outbox`,
  `box`,
  `carried`,
];
var HOT_UNREADY_ORDER: Dynamic = [`port`, `viewer`];
var HOT_SAID_ORDER: Dynamic = [
  `doc`,
  `staged`,
  `port`,
  `viewer`,
  `post`,
  `outbox`,
  `box`,
  `carried`,
];
var QUIET_MS: Dynamic = 3e4;
var DEFER_WHILE_PRESENT: Dynamic = true;
var HIDDEN_DWELL_MS: Dynamic = 12e4;
var RETURN_EDGE_MS: Dynamic = 3e3;
var IDLE_MS: Dynamic = 10 * 6e4;
var SWAP_BUDGET_MS: Dynamic = 120 * 6e4;
var DEFER_CAP_MS: Dynamic = 240 * 6e4;
var DEFER_CAP_GRACE_MS: Dynamic = 10 * 6e4;
var SWAP_AT_KEY: Dynamic = `pages.hot.swapAt`;
var STALE_AT_KEY: Dynamic = `pages.hot.staleAt`;
var STALE_SWAP_WINDOW_MS: Dynamic = 6e4;
var SWAP_NOTE_AFTER_MS: Dynamic = 3e3;
var SWAP_NOTE_AGAIN_MS: Dynamic = [1e4, 3e4];
var CARRY_CAP_MS: Dynamic = 30 * 6e4;
var COMPOSER_PAUSE_MS: Dynamic = 2e3;
var CARRY_CAP_GRACE_MS: Dynamic = 6e4;
var RESTART_SPACING_MS: Dynamic = 9e4;
var RESTART_MAX: Dynamic = 3;
var LEFT_AS_KEY: Dynamic = `pages.hot.leftAs`;
var DEFER_TICK_MS: Dynamic = 1e3;
var MIN_HOST_REVISION: Dynamic = 1;
var PAUSABLE_COMPOSERS: Dynamic = new (Set as Dynamic)([`comments`]);
var MAX_READINESS_CHECKS: Dynamic = 2e5;
var hotNoteWords: Dynamic = {
  "docs.hidden": `hidden`,
  "docs.return": `return`,
  "docs.idle": `idle`,
  "docs.cap": `cap`,
  "docs.carry-cap": `carried`,
  "docs.deadline": `deadline`,
  "docs.required": `required`,
  "docs.go": `go`,
  "docs.saved": `saved`,
};
var isRecord: Dynamic = (
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof candidate == `object` && !!candidate && !Array.isArray(candidate);
var DIRTY_WORDS: Dynamic = new (Set as Dynamic)([
  `bar`,
  `link`,
  `unsynced`,
  `denied`,
  `stale`,
  `pending`,
]);
var SAVED_STATE_WORDS: Dynamic = new (Set as Dynamic)([
  `saved`,
  `unsaved:bar`,
  `unsaved:link`,
  `unsaved:unsynced`,
  `unsaved:denied`,
  `unsaved:stale`,
  `unsaved:pending`,
]);
var HOT_COMPONENT_KEYS: Dynamic = new (Set as Dynamic)([
  `doc`,
  `staged`,
  `port`,
  `viewer`,
  `post`,
  `outbox`,
  `box`,
]);
var UNREADY_WORDS: Dynamic = new (Set as Dynamic)(HOT_UNREADY_ORDER);
var RESTART_REASON_WORDS: Dynamic = new (Set as Dynamic)([
  `hidden`,
  `return`,
  `idle`,
  `cap`,
  `carried`,
  `deadline`,
  `required`,
  `go`,
]);
var hotNoteWord: Dynamic = (
  from?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let note: Dynamic = from.note;
  return note === undefined
    ? `unasked`
    : typeof note == `string` && Object.hasOwn(hotNoteWords, note)
      ? hotNoteWords[note]
      : `other`;
};
var hotFromWordOf: Dynamic = (
  from?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (isRecord(from) ? hotNoteWord(from) : null);
var PRESENCE_EVENTS: Dynamic = [
  `pointerdown`,
  `pointermove`,
  `wheel`,
  `scroll`,
  `keydown`,
  `selectionchange`,
];
var PRESENCE_THROTTLE_MS: Dynamic = 1e3;
function watchPresence(
  window?: Dynamic,
  now?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastPresence: Dynamic = 0;
  let onPresence = (..._extraArguments: unknown[]): undefined => {
    let now2: Dynamic = now();
    if (now2 - lastPresence >= PRESENCE_THROTTLE_MS || now2 < lastPresence) {
      lastPresence = now2;
    }
  };
  try {
    for (let watchPresenceResult of PRESENCE_EVENTS as Dynamic)
      window?.addEventListener(watchPresenceResult, onPresence, {
        passive: true,
        capture: true,
      });
  } catch {}
  return {
    at: (..._extraArguments: unknown[]): Dynamic => lastPresence,
    touch: onPresence,
    off: (..._extraArguments: unknown[]): undefined => {
      try {
        for (let watchPresenceResult of PRESENCE_EVENTS as Dynamic)
          window?.removeEventListener?.(watchPresenceResult, onPresence, {
            capture: true,
          });
      } catch {}
    },
  };
}
function isShellHotHost(
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return isRecord(candidate)
    ? typeof candidate.snapshot == `function` &&
        typeof candidate.accept == `function` &&
        typeof candidate.restart == `function`
    : false;
}
function installShellHot(
  host?: Dynamic,
  deps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let holders: Dynamic = new (Map as Dynamic)();
  let carriedStates: Dynamic = null;
  let accepted: Dynamic = false;
  let deferredAt: Dynamic = null;
  let lastRestart: Dynamic = -1 / 0;
  let nextRestartAt: Dynamic = 0;
  let hiddenAt: Dynamic = null;
  let wasHidden: Dynamic = false;
  let returnedAt: Dynamic = null;
  let fromReported: Dynamic = false;
  let required: Dynamic = false;
  let abortCleanup: Dynamic;
  let clockNow: Dynamic = 0;
  try {
    clockNow = deps.now();
  } catch {}
  let clockOffset: Dynamic = 0;
  let startedAt: Dynamic = clockNow;
  let deadline: Dynamic = null;
  let idleTimer: Dynamic = null;
  let lastRestartOfferAt: Dynamic = -1 / 0;
  let lastReason: Dynamic = null;
  let restartCount: Dynamic = 0;
  let restartTimer: Dynamic = null;
  let safelyTrue = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      return installShellHot2() === true;
    } catch {
      return false;
    }
  };
  let monotonicNow: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      let now: Dynamic = deps.now();
      if (now < clockNow) {
        clockOffset += clockNow - now;
      }
      clockNow = now;
    } catch {}
    return clockNow + clockOffset;
  };
  let elapsedSince: Dynamic = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    installShellHot2 > 0 ? Math.max(0, clockNow - installShellHot2) : 1 / 0;
  let idleFor: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      return elapsedSince(deps.presenceAt?.() ?? 0);
    } catch {
      return 1 / 0;
    }
  };
  let carriedHolderStates: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (carriedStates !== null) return carriedStates;
    carriedStates = new (Map as Dynamic)();
    try {
      if (host.from?.handoff !== `ok`) return carriedStates;
      let data: Dynamic = host.data;
      let docs: Dynamic = isRecord(data) ? data.docs : undefined;
      if (!isRecord(docs) || docs.v !== MIN_HOST_REVISION) return carriedStates;
      let page: Dynamic = deps.page();
      if (page === undefined || docs.page !== page) return carriedStates;
      for (let installShellHotResult of PAUSABLE_COMPOSERS as Dynamic) {
        let docItem: Dynamic = docs[installShellHotResult];
        if (
          docItem !== undefined &&
          JSON.stringify(docItem).length <= MAX_READINESS_CHECKS
        ) {
          carriedStates.set(installShellHotResult, docItem);
        }
      }
    } catch {
      carriedStates = new (Map as Dynamic)();
    }
    return carriedStates;
  };
  let unsavedCarriedStates: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let carriedHolderStates2: Dynamic = carriedHolderStates();
    if (
      carriedHolderStates2.size > 0 &&
      !safelyTrue(
        (..._extraArguments: unknown[]) => host.from?.handoff === `ok`,
      )
    ) {
      carriedHolderStates2.clear();
    }
    return carriedHolderStates2;
  };
  let clearCarriedHolder = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let holderEntry: Dynamic = holders.get(installShellHot2);
    let unsavedCarriedStates2: Dynamic = unsavedCarriedStates();
    if (
      holderEntry === undefined ||
      !unsavedCarriedStates2.has(installShellHot2)
    )
      return;
    let unsavedCarriedStateEntry: Dynamic =
      unsavedCarriedStates2.get(installShellHot2);
    unsavedCarriedStates2.delete(installShellHot2);
    try {
      holderEntry.restore(unsavedCarriedStateEntry);
    } catch {}
  };
  let isAborted: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    safelyTrue(
      (..._extraArguments: unknown[]) => host.signal?.aborted === true,
    );
  let saveTerm = (..._extraArguments: unknown[]) => {
    try {
      let saveTerm2: Dynamic = deps.saveTerm?.();
      return typeof saveTerm2 == `string` && DIRTY_WORDS.has(saveTerm2)
        ? `unsaved:${saveTerm2}`
        : `saved`;
    } catch {
      return `saved`;
    }
  };
  let saveLeftState: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let saveTerm2: Dynamic = saveTerm();
    try {
      deps.store?.()?.setItem(LEFT_AS_KEY, saveTerm2);
    } catch {}
    return saveTerm2;
  };
  let readLeftState: Dynamic = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let store: Dynamic = deps.store?.();
      let item: Dynamic = store?.getItem(LEFT_AS_KEY);
      if (typeof item != `string` || item === ``) return;
      try {
        store?.setItem(LEFT_AS_KEY, ``);
      } catch {}
      return installShellHot2 !== undefined &&
        RESTART_REASON_WORDS.has(installShellHot2) &&
        SAVED_STATE_WORDS.has(item)
        ? item
        : undefined;
    } catch {
      return;
    }
  };
  let reportEvent = (
    installShellHot2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      let leftState: Dynamic =
        installShellHot2 === `swapped`
          ? readLeftState(options)
          : installShellHot2.startsWith(`self_restart:`)
            ? saveLeftState()
            : undefined;
      deps.say?.(installShellHot2, options, leftState);
    } catch {}
  };
  let isFocused: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      return deps.focused === undefined || deps.focused() !== false;
    } catch {
      return true;
    }
  };
  let readStaleState = (..._extraArguments: unknown[]) => {
    try {
      let store: Dynamic = deps.store?.();
      let item: Dynamic = store?.getItem(STALE_AT_KEY);
      if (typeof item != `string`) return `unasked`;
      try {
        store?.removeItem(STALE_AT_KEY);
      } catch {}
      let number: Dynamic = /^[0-9]{1,16}$/.test(item) ? Number(item) : NaN;
      return number > 0 && number <= startedAt && startedAt - number < 6e4
        ? `stale`
        : `unasked`;
    } catch {
      return `unasked`;
    }
  };
  let reportFrom = (..._extraArguments: unknown[]): undefined => {
    if (!fromReported)
      try {
        let from: Dynamic = host.from;
        if (!isRecord(from)) return;
        fromReported = true;
        let hotNoteWord2: Dynamic = hotNoteWord(from);
        reportEvent(
          `swapped`,
          hotNoteWord2 === `unasked` ? readStaleState() : hotNoteWord2,
        );
        deps.store?.()?.setItem(SWAP_AT_KEY, String(startedAt));
      } catch {}
  };
  let fromState: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (fromReported) return null;
    try {
      let from: Dynamic = host.from;
      if (!isRecord(from)) return null;
      fromReported = true;
      try {
        deps.store?.()?.setItem(SWAP_AT_KEY, String(startedAt));
      } catch {}
      return from;
    } catch {
      return null;
    }
  };
  let reportSwapped = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      let hotNoteWord2: Dynamic = hotNoteWord(installShellHot2);
      reportEvent(
        `swapped`,
        hotNoteWord2 === `unasked` ? readStaleState() : hotNoteWord2,
      );
    } catch {}
  };
  let swapState: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      let item: Dynamic = deps.store?.()?.getItem(SWAP_AT_KEY);
      let number: Dynamic =
        typeof item == `string` && /^[0-9]{1,16}$/.test(item)
          ? Number(item)
          : NaN;
      return number > 0 && number <= clockNow
        ? Math.max(0, number + SWAP_BUDGET_MS - clockNow)
        : 0;
    } catch {
      return 0;
    }
  };
  let holderReason: Dynamic = (
    installShellHot2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let installShellHotResult: Dynamic;
    try {
      installShellHotResult = options.why?.();
    } catch {
      installShellHotResult = undefined;
    }
    let installShellHotResult2: Dynamic =
      typeof installShellHotResult == `string` &&
      HOT_COMPONENT_KEYS.has(installShellHotResult)
        ? installShellHotResult
        : installShellHot2;
    return HOT_COMPONENT_KEYS.has(installShellHotResult2)
      ? installShellHotResult2
      : null;
  };
  let holderMustHold = (
    installShellHot2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      return installShellHot2.hold(options) === true;
    } catch {
      return options === `required`;
    }
  };
  let readiness: Dynamic = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let enabled: Dynamic = false;
    let enabled2: Dynamic = false;
    let enabled3: Dynamic = false;
    let items: Dynamic = [];
    for (let [
      installShellHotResult,
      installShellHotResult2,
    ] of holders as Dynamic) {
      if (holderMustHold(installShellHotResult2, installShellHot2)) {
        items.push([installShellHotResult, installShellHotResult2]);
      }
      enabled2 ||= safelyTrue(
        (..._extraArguments: unknown[]): Dynamic =>
          installShellHotResult2.carriedUnsaved(),
      );
      enabled3 ||= safelyTrue(
        (..._extraArguments: unknown[]): Dynamic =>
          installShellHotResult2.active?.(),
      );
    }
    enabled = items.length > 0;
    let enabled4: Dynamic = false;
    if (isAborted()) {
      enabled4 = enabled2;
      if (!enabled)
        for (let installShellHotResult of holders.values() as Dynamic)
          enabled4 ||= safelyTrue(
            (..._extraArguments: unknown[]) =>
              installShellHotResult.collect() !== null,
          );
      enabled ||= enabled4;
    }
    let monotonicNow2: Dynamic = monotonicNow();
    if (enabled) {
      lastRestartOfferAt = monotonicNow2;
    }
    let min: Dynamic = Math.min(
      elapsedSince(deps.docActivityAt()),
      elapsedSince(deps.composerActivityAt()),
      monotonicNow2 - lastRestartOfferAt,
    );
    enabled3 ||= min < QUIET_MS;
    if (!enabled2 || enabled) {
      deadline = null;
    } else {
      deadline ??= monotonicNow2;
    }
    return {
      hold: enabled,
      carriedUnsaved: enabled2,
      active: enabled3,
      now: monotonicNow2,
      worked: min,
      holders: items,
      stranded: enabled4,
    };
  };
  let readinessReason = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      installShellHot2.holders.map(
        ([holder, holder2]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          holderReason(holder, holder2),
      ),
    );
    if (installShellHot2.carriedUnsaved || installShellHot2.stranded) {
      uniqueItems.add(`carried`);
    }
    let HOTSAIDORDER: Dynamic = HOT_SAID_ORDER.find(
      (HOTSAIDORDER2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.has(HOTSAIDORDER2),
    );
    return HOTSAIDORDER === undefined
      ? `dirty`
      : UNREADY_WORDS.has(HOTSAIDORDER)
        ? `unready_${HOTSAIDORDER}`
        : `dirty_${HOTSAIDORDER}`;
  };
  let restart = (
    installShellHot2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let label: Dynamic =
      installShellHot2 === `carried`
        ? `docs.carry-cap`
        : `docs.${installShellHot2}`;
    lastReason = options;
    restartCount += 1;
    if (hiddenAt !== null) {
      wasHidden = true;
    }
    reportEvent(`self_restart:${installShellHot2}`);
    try {
      host.restart({
        note: label,
      });
    } catch {}
  };
  let deferReason = (
    installShellHot2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let difference: Dynamic =
      installShellHot2.now -
      ((deferredAt ?? installShellHot2.now) + DEFER_CAP_MS);
    return !options && wasHidden
      ? null
      : required && !installShellHot2.active
        ? `required`
        : options
          ? returnedAt !== null && installShellHot2.now - returnedAt < 3e3
            ? `return`
            : !installShellHot2.active &&
                Math.min(
                  installShellHot2.worked,
                  idleFor(),
                  installShellHot2.now - lastRestart,
                ) >= 6e5
              ? `idle`
              : difference >= 0 &&
                  (!installShellHot2.active || difference >= 6e5)
                ? `cap`
                : null
          : installShellHot2.now - (hiddenAt ?? installShellHot2.now) >= 12e4
            ? `hidden`
            : difference >= 0
              ? `cap`
              : null;
  };
  let check = (..._extraArguments: unknown[]): undefined => {
    let readiness2: Dynamic = readiness(required ? `required` : `ordinary`);
    let visible: Dynamic = deps.visible();
    if (visible) {
      if (hiddenAt !== null) {
        returnedAt = readiness2.now - hiddenAt >= 12e4 ? readiness2.now : null;
        hiddenAt = null;
        wasHidden = false;
      }
    } else {
      hiddenAt ??= readiness2.now;
      returnedAt = null;
    }
    let matchesLastReason: Dynamic =
      lastReason === null || readiness2.now - lastReason >= 9e4;
    if (readiness2.hold || !deps.online() || !matchesLastReason) {
      idleTimer = null;
      return;
    }
    if (!readiness2.carriedUnsaved) {
      let deferReason2: Dynamic = deferReason(readiness2, visible);
      if (deferReason2 !== null) {
        restart(deferReason2, readiness2.now);
      }
      return;
    }
    let difference: Dynamic = readiness2.now - (deadline ?? readiness2.now);
    if (
      !visible ||
      difference < 18e5 ||
      Math.min(
        elapsedSince(deps.docActivityAt()),
        readiness2.now - lastRestartOfferAt,
      ) < 3e4
    ) {
      idleTimer = null;
      return;
    }
    idleTimer ??= readiness2.now;
    if (
      elapsedSince(deps.composerActivityAt()) >= 2e3 ||
      readiness2.now - idleTimer >= 6e4
    ) {
      restart(`carried`, readiness2.now);
    }
  };
  let clearDeferral = (..._extraArguments: unknown[]): undefined => {
    hiddenAt = null;
    wasHidden = false;
    returnedAt = null;
  };
  let scheduleRestart: Dynamic = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let total: Dynamic = monotonicNow() + installShellHot2;
    return deps.schedule((..._extraArguments: unknown[]): undefined => {
      let monotonicNow2: Dynamic = monotonicNow();
      if (monotonicNow2 < total) {
        clockOffset += total - monotonicNow2;
      }
      tryRestart();
    }, installShellHot2);
  };
  let tryRestart = (..._extraArguments: unknown[]): undefined => {
    restartTimer = null;
    if (!accepted || isAborted() || restartCount >= 3) return;
    let monotonicNow2: Dynamic = monotonicNow();
    if (monotonicNow2 < nextRestartAt) {
      restartTimer = scheduleRestart(nextRestartAt - monotonicNow2);
      return;
    }
    if (nextRestartAt > 0) {
      lastRestart = Math.max(lastRestart, nextRestartAt);
      if (deadline !== null) {
        deadline = Math.max(deadline, nextRestartAt);
      }
      nextRestartAt = 0;
      clearDeferral();
    }
    restartTimer = scheduleRestart(DEFER_TICK_MS);
    try {
      check();
    } catch {}
  };
  let queueRestart = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (restartTimer === null) {
      clearDeferral();
      restartTimer = scheduleRestart(
        Math.max(DEFER_TICK_MS, nextRestartAt - installShellHot2),
      );
    }
  };
  let deferHolder = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      if (typeof installShellHot2.defer == `function`) {
        installShellHot2.defer();
      }
    } catch {}
    return `deferred`;
  };
  let acceptOffer: Dynamic = (
    post?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let installShellHotResult: Dynamic = null;
    let enabled: Dynamic = false;
    let installShellHotHandler = (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        enabled = true;
        if (installShellHotResult === null) {
          reportFrom();
        } else {
          reportSwapped(installShellHotResult);
        }
        reportEvent(`offered`);
      }
    };
    let enabled2: Dynamic = false;
    try {
      if (post.deadline?.now === true) {
        installShellHotHandler();
        lastReason = monotonicNow();
        reportEvent(`self_restart:deadline`);
        return post.restart({
          note: `docs.deadline`,
        });
      }
      installShellHotResult = fromState();
      let ver: Dynamic = post.to?.ver;
      if (typeof ver == `string` && ver !== abortCleanup) {
        abortCleanup = ver;
        restartCount = 0;
      }
      let required2: Dynamic =
        required ||
        post.required === `hot-restart` ||
        post.required === `hard-reload`;
      let readiness2: Dynamic = readiness(required2 ? `required` : `ordinary`);
      let swapState2: Dynamic = swapState();
      let visible: Dynamic = deps.visible() && (isFocused() || idleFor() < 6e5);
      let enabled3: Dynamic = !required2 && restartCount < 3;
      let label: Dynamic =
        enabled3 && swapState2 > 0
          ? `budget`
          : readiness2.hold || readiness2.carriedUnsaved
            ? `dirty`
            : readiness2.active
              ? `quiet`
              : enabled3 && visible
                ? `present`
                : null;
      if (label === null) {
        installShellHotHandler();
        lastReason = readiness2.now;
        let required3: Dynamic = required2 && (swapState2 > 0 || visible);
        if (required3) {
          reportEvent(`self_restart:required`);
        } else {
          saveLeftState();
        }
        return post.restart({
          note: required3 ? `docs.required` : `docs.go`,
        });
      }
      enabled2 = true;
      let deferHolder2: Dynamic = deferHolder(post);
      accepted = true;
      deferredAt ??= readiness2.now;
      lastRestart = readiness2.now;
      if (required2) {
        required = true;
        nextRestartAt = 0;
        if (restartTimer !== null) {
          restartTimer();
        }
        restartTimer = null;
      } else {
        if (enabled3 && swapState2 > 0) {
          nextRestartAt = Math.max(nextRestartAt, readiness2.now + swapState2);
        }
      }
      queueRestart(readiness2.now);
      installShellHotHandler();
      reportEvent(
        `deferred:${label === `dirty` ? readinessReason(readiness2) : label}`,
      );
      return deferHolder2;
    } catch {
      if (!enabled2) {
        deferHolder(post);
      }
      accepted = true;
      try {
        lastRestart = monotonicNow();
        deferredAt ??= lastRestart;
        queueRestart(lastRestart);
      } catch {}
      installShellHotHandler();
      reportEvent(`deferred:dirty`);
      return `deferred`;
    }
  };
  let carryState: Dynamic = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let page: Dynamic = deps.page();
      if (installShellHot2?.handoff === false || page === undefined) return {};
      for (let installShellHotResult of holders.keys() as Dynamic)
        clearCarriedHolder(installShellHotResult);
      let record: Dynamic = {
        v: MIN_HOST_REVISION,
        page: page,
      };
      for (let [
        installShellHotResult,
        installShellHotResult2,
      ] of holders as Dynamic)
        try {
          let collect: Dynamic = installShellHotResult2.collect();
          if (collect !== null) {
            record[installShellHotResult] = collect;
          }
        } catch {}
      for (let [
        installShellHotResult,
        installShellHotResult2,
      ] of unsavedCarriedStates() as Dynamic)
        if (!(installShellHotResult in record)) {
          record[installShellHotResult] = installShellHotResult2;
        }
      return {
        docs: record,
      };
    } catch {
      return {};
    }
  };
  try {
    host.snapshot(carryState);
  } catch {}
  try {
    host.accept(acceptOffer);
  } catch {}
  try {
    let early: Dynamic = deps.early?.();
    if (
      isRecord(early) &&
      typeof early.since == `number` &&
      typeof early.at == `number` &&
      Number.isFinite(early.since) &&
      Number.isFinite(early.at) &&
      early.since > 0 &&
      early.at > 0
    ) {
      reportFrom();
      let monotonicNow2: Dynamic = monotonicNow();
      accepted = true;
      deferredAt = monotonicNow2 - elapsedSince(early.since);
      lastRestart = monotonicNow2 - elapsedSince(early.at);
      if (typeof early.ver == `string`) {
        abortCleanup = early.ver;
      }
      let swapState2: Dynamic = swapState();
      if (
        early.required === `hot-restart` ||
        early.required === `hard-reload`
      ) {
        required = true;
        lastRestartOfferAt = monotonicNow2;
      } else {
        if (swapState2 > 0) {
          nextRestartAt = monotonicNow2 + swapState2;
        }
      }
      queueRestart(monotonicNow2);
    }
  } catch {}
  try {
    deps.afterPaint(reportFrom);
  } catch {}
  let noteDelays: Dynamic = [SWAP_NOTE_AFTER_MS, ...SWAP_NOTE_AGAIN_MS];
  let scheduleFromNote = (
    installShellHot2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let noteDelayItem: Dynamic = noteDelays[installShellHot2];
    if (noteDelayItem !== undefined)
      try {
        deps.schedule(
          (..._extraArguments: unknown[]): undefined => {
            reportFrom();
            if (!fromReported) {
              scheduleFromNote(installShellHot2 + 1);
            }
          },
          noteDelayItem - (noteDelays[installShellHot2 - 1] ?? 0),
        );
      } catch {}
  };
  scheduleFromNote(0);
  return {
    accept: acceptOffer,
    provide(
      installShellHot2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      holders.set(installShellHot2, options);
      try {
        deps.afterPaint(
          (..._extraArguments: unknown[]): Dynamic =>
            clearCarriedHolder(installShellHot2),
        );
      } catch {}
    },
  };
}
export {
  CARRY_CAP_GRACE_MS,
  CARRY_CAP_MS,
  COMPOSER_PAUSE_MS,
  DEFER_CAP_GRACE_MS,
  DEFER_CAP_MS,
  DEFER_WHILE_PRESENT,
  HIDDEN_DWELL_MS,
  HOT_DIRTY_ORDER,
  HOT_SAID_ORDER,
  HOT_UNREADY_ORDER,
  IDLE_MS,
  LEFT_AS_KEY,
  PRESENCE_EVENTS,
  QUIET_MS,
  RESTART_MAX,
  RESTART_SPACING_MS,
  RETURN_EDGE_MS,
  STALE_AT_KEY,
  STALE_SWAP_WINDOW_MS,
  SWAP_AT_KEY,
  SWAP_BUDGET_MS,
  SWAP_NOTE_AFTER_MS,
  SWAP_NOTE_AGAIN_MS,
  hotFromWordOf,
  installShellHot,
  isShellHotHost,
  watchPresence,
};

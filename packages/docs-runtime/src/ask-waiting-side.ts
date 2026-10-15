/** ask-waiting-side: restored from askWaitingSide-HseWJ14z.js. */
import type { Dynamic } from "./types";
const mapPreloadDependencies: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => [];
import {
  Gf as useCommentStore,
  Up as isDataModelSchemasKind3,
  Xm as dataModelSchemasPattern16,
  av as frameFenceAuthor,
  bf as heldThreads,
  df as carrierSettled,
  jM as resolvePlatformFeatureFlagsEnabled2,
  jf as quietCarrierWritten,
  kp as resolvePlatformAnnouncementsValue,
  lf as carrierBaselineOf,
  rm as resolveDataModelSchemasAgentRows,
  vm as resolveDataModelSchemasSent,
  vx as toast,
  xy as observabilityBrowserAndOperationEventsPattern22,
} from "./platform-core";
import { t as preloadModule } from "./preload";
import {
  A as notifyClaudeReplied,
  D as registerCommentSessionHost,
  I as CLAUDE_WRITING_OUTCOME_MESSAGES,
  N as CLAUDE_COMMENT_WAITING_MESSAGES,
  O as commentSessionIdentity,
  T as reportCommentSessionEnd,
  j as hasMintedContent,
} from "./docs-app";
import { easeOutKeyboardAt, easeOutTakesKeyboard } from "./claude-ask-card";
import {
  SESSION_RUN_MAX_MS,
  envelopeNamesBlock,
  whoseRow,
} from "./claude-session-run";
var WAITING_MARK_TIMEOUT_MS: Dynamic = 5e3;
var LIVE_WAITING_WORDS: Dynamic = [`working`, `queued`, `needs_user`];
var ENDED_WAITING_WORDS: Dynamic = [
  `stopped`,
  `timeout`,
  `ended`,
  `replied`,
  `failed`,
];
var KEPT_WAITING_WORD: Dynamic = `kept`;
var WAITING_RETENTION_MS: Dynamic = 6e5;
var liveWaitingWords: Dynamic = new (Set as Dynamic)(LIVE_WAITING_WORDS);
var knownRowWhose: Dynamic = new (Set as Dynamic)([`m`, `o`, `u`]);
var endedWaitingWords: Dynamic = new (Set as Dynamic)(ENDED_WAITING_WORDS);
var isNonemptyWord: Dynamic = (
  nonemptyWord?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof nonemptyWord == `string` && nonemptyWord !== ``;
function makeWaitingRetention(
  deps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let asks: Dynamic = [];
  let askMetadata: Dynamic = new (WeakMap as Dynamic)();
  let personWaits: Dynamic = new (Set as Dynamic)();
  let keptLines: Dynamic = [];
  let expiryTimer: Dynamic;
  let safely = (
    callback?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      callback();
    } catch {}
  };
  let metadataFor: Dynamic = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let metadata: Dynamic = askMetadata.get(ask);
    if (metadata === undefined) {
      askMetadata.set(
        ask,
        (metadata = {
          emptiedAt: null,
          bare: false,
          repliedAt: null,
          grace: undefined,
        }),
      );
    }
    return metadata;
  };
  let currentMarks: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    asks.map(
      (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        bid: ask.bid,
        word: ask.word,
      }),
    );
  let isRetained = (
    line?: Dynamic,
    now?: Dynamic,
    ..._extraArguments: unknown[]
  ) => now - line.at < WAITING_RETENTION_MS;
  let allMarks: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let now: Dynamic = deps.now();
    return [
      ...currentMarks(),
      ...keptLines
        .filter(
          (keptLine?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isRetained(keptLine, now),
        )
        .map(
          (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            bid: ask.bid,
            word: KEPT_WAITING_WORD,
          }),
        ),
    ];
  };
  let notifyChanged: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    safely(
      (..._extraArguments: unknown[]): Dynamic => deps.changed(allMarks()),
    );
  let keepLine = (bid?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let now: Dynamic = deps.now();
    keptLines = [
      ...keptLines.filter(
        (keptLine?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isRetained(keptLine, now),
      ),
      {
        bid: bid,
        at: now,
      },
    ].slice(-8);
  };
  let scheduleExpiry = (..._extraArguments: unknown[]): undefined => {
    deps.clearTimeout(expiryTimer);
    expiryTimer = undefined;
    if (asks.length === 0 && keptLines.length === 0) return;
    let nextExpiry: Dynamic = (Math.min as Dynamic)(
      ...asks.map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          item.sentAt + deps.boundMs,
      ),
      ...keptLines.map(
        (activity?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          activity.at + WAITING_RETENTION_MS,
      ),
    );
    expiryTimer = deps.setTimeout(
      expireAsks,
      Math.max(0, nextExpiry - deps.now()),
    );
  };
  let endAsk = (
    ask?: Dynamic,
    word?: Dynamic,
    checkThread?: Dynamic,
    options: Dynamic = {},
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!asks.includes(ask)) return;
    let previousCount: Dynamic = asks.length;
    asks = asks.filter(
      (ask2?: Dynamic, ..._extraArguments: unknown[]) => ask2 !== ask,
    );
    personWaits.delete(ask.bid);
    deps.clearTimeout(metadataFor(ask).grace);
    if (endedWaitingWords.has(word)) {
      keepLine(ask.bid);
    }
    safely(
      (..._extraArguments: unknown[]): Dynamic =>
        (deps.ended as Dynamic)(
          {
            ...ask,
          },
          word,
          checkThread,
          previousCount,
          ...(options.whose === undefined ? [] : [options.whose]),
        ),
    );
    if (options.quiet !== true) {
      scheduleExpiry();
      notifyChanged();
    }
  };
  function expireAsks(..._extraArguments: unknown[]): undefined {
    expiryTimer = undefined;
    let now: Dynamic = deps.now();
    keptLines = keptLines.filter(
      (keptLine?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isRetained(keptLine, now),
    );
    for (let ask of asks as Dynamic)
      if (now - ask.sentAt >= deps.boundMs) {
        endAsk(ask, `timeout`, true, {
          quiet: true,
        });
      }
    scheduleExpiry();
    notifyChanged();
  }
  return {
    size: (..._extraArguments: unknown[]): Dynamic => asks.length,
    mayTake: (..._extraArguments: unknown[]) => asks.length < 3,
    marks: currentMarks,
    kept: (..._extraArguments: unknown[]): Dynamic =>
      keptLines.map(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ask.bid,
      ),
    set: allMarks,
    asks: (..._extraArguments: unknown[]): Dynamic =>
      asks.map(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          ...ask,
        }),
      ),
    wouldTake: (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      asks.length < 3 &&
      isNonemptyWord(ask?.bid) &&
      isNonemptyWord(ask?.threadId) &&
      !ask.threadId.startsWith(`route:`) &&
      !asks.some(
        (ask2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          ask2.bid === ask.bid || ask2.threadId === ask.threadId,
      ),
    holds: (
      waitingRetention?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      asks.some(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          ask.threadId === waitingRetention &&
          metadataFor(ask).repliedAt !== null,
      ),
    take(request?: Dynamic, word?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        typeof request != `object` ||
        !request ||
        !liveWaitingWords.has(word) ||
        asks.length >= 3 ||
        !isNonemptyWord(request.bid) ||
        !isNonemptyWord(request.threadId) ||
        request.threadId.startsWith(`route:`) ||
        typeof request.sentAt != `number` ||
        !Number.isFinite(request.sentAt) ||
        asks.some(
          (ask2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            ask2.bid === request.bid || ask2.threadId === request.threadId,
        )
      )
        return false;
      let ask: Dynamic = {
        bid: request.bid,
        node: isNonemptyWord(request.node) ? request.node : ``,
        threadId: request.threadId,
        sentAt: request.sentAt,
        kind: isNonemptyWord(request.kind) ? request.kind : null,
        word: word,
      };
      asks = [...asks, ask];
      keptLines = keptLines.filter(
        (ask2?: Dynamic, ..._extraArguments: unknown[]) => ask2.bid !== ask.bid,
      );
      if (word === `needs_user`) {
        personWaits.add(ask.bid);
        safely(
          (..._extraArguments: unknown[]): Dynamic =>
            deps.waitsOnPerson({
              ...ask,
            }),
        );
      }
      scheduleExpiry();
      notifyChanged();
      return true;
    },
    heardRow(row?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (typeof row != `object` || !row || typeof row.names != `function`)
        return false;
      let whose: Dynamic = knownRowWhose.has(row.whose) ? row.whose : undefined;
      let heardNamedRow: Dynamic = false;
      for (let ask of asks as Dynamic) {
        let makeWaitingRetentionResult: Dynamic;
        let enabled: Dynamic = false;
        try {
          makeWaitingRetentionResult = row.names(ask.bid);
          enabled = row.queued(ask.threadId) === true;
        } catch {
          continue;
        }
        if (makeWaitingRetentionResult === `named`) {
          if (row.writesNothing === true) {
            if (!enabled) {
              metadataFor(ask).emptiedAt = deps.now();
            }
            continue;
          }
          heardNamedRow = true;
          if (enabled) continue;
          endAsk(ask, `written`, whose !== `o`, {
            ...(whose !== undefined && {
              whose: whose,
            }),
          });
          continue;
        }
        if (
          makeWaitingRetentionResult === `none` &&
          row.writesNothing !== true &&
          !enabled &&
          ask.node !== `` &&
          asks.filter(
            (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
              ask2.node === ask.node,
          ).length === 1
        ) {
          let enabled2: Dynamic = false;
          try {
            enabled2 = row.onNode?.(ask.node) === true;
          } catch {
            enabled2 = false;
          }
          if (enabled2) {
            metadataFor(ask).bare = true;
          }
        }
      }
      return heardNamedRow;
    },
    threadSaid(
      threadId?: Dynamic,
      word?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let ask: Dynamic = asks.find(
        (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
          ask2.threadId === threadId,
      );
      if (ask === undefined) return;
      let metadata: Dynamic = metadataFor(ask);
      if (word === `replied`) {
        if (metadata.repliedAt !== null) return;
        metadata.repliedAt = deps.now();
        metadata.grace = deps.setTimeout(
          (..._extraArguments: unknown[]): Dynamic =>
            endAsk(ask, `replied`, true),
          WAITING_MARK_TIMEOUT_MS,
        );
        return;
      }
      if (
        !(
          metadata.repliedAt !== null &&
          (word === `over` || word === `refused`)
        )
      ) {
        if (word === `over`)
          return endAsk(
            ask,
            metadata.bare ? `written` : `ended`,
            !metadata.bare,
          );
        if (word === `refused`) return endAsk(ask, `failed`, true);
        if (liveWaitingWords.has(word)) {
          if (word === `needs_user` && !personWaits.has(ask.bid)) {
            personWaits.add(ask.bid);
            safely(
              (..._extraArguments: unknown[]): Dynamic =>
                deps.waitsOnPerson({
                  ...ask,
                  word: word,
                }),
            );
          }
          if (ask.word !== word) {
            ask.word = word;
            notifyChanged();
          }
        }
      }
    },
    frameSaid(
      bid?: Dynamic,
      word?: Dynamic,
      timestamp?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let ask: Dynamic = asks.find(
        (ask2?: Dynamic, ..._extraArguments: unknown[]) => ask2.bid === bid,
      );
      if (ask === undefined) {
        if (
          word === `gone` &&
          keptLines.some(
            (ask2?: Dynamic, ..._extraArguments: unknown[]) => ask2.bid === bid,
          )
        ) {
          keptLines = keptLines.filter(
            (ask2?: Dynamic, ..._extraArguments: unknown[]) => ask2.bid !== bid,
          );
          scheduleExpiry();
          notifyChanged();
        }
        return;
      }
      if (word === `landed`) return endAsk(ask, `written`, false);
      if (word === `gone`) {
        let emptiedAt: Dynamic = metadataFor(ask).emptiedAt;
        let min: Dynamic =
          typeof timestamp == `number` && Number.isFinite(timestamp)
            ? Math.min(timestamp, deps.now())
            : deps.now();
        return endAsk(
          ask,
          emptiedAt !== null && min - emptiedAt <= 1e4 ? `written` : `gone`,
          false,
        );
      }
      if (word === `dismiss`) return endAsk(ask, `stopped`, false);
    },
    reset(..._extraArguments: unknown[]): undefined {
      if (!(asks.length === 0 && keptLines.length === 0)) {
        keptLines = [];
        for (let makeWaitingRetentionResult of asks as Dynamic)
          endAsk(makeWaitingRetentionResult, `reset`, true, {
            quiet: true,
          });
        scheduleExpiry();
        notifyChanged();
      }
    },
  };
}
var TAKE_WORDS: Dynamic = new (Set as Dynamic)([
  `sent`,
  `queued`,
  `needs_user`,
]);
var markWordOf = (markWord?: Dynamic, ..._extraArguments: unknown[]) =>
  markWord === `queued`
    ? `queued`
    : markWord === `needs_user`
      ? `needs_user`
      : markWord === `sent` || markWord === `working`
        ? `working`
        : null;
var ENDED_LINE_HOLD_MS: Dynamic = 3e4;
var GONE_HOLD_MS: Dynamic = 5e3;
var ENDED_LINES_MAX: Dynamic = 8;
function mayShrink(state?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return state.switchOn !== true ||
    state.frameKnows !== true ||
    typeof state.raw != `string` ||
    !TAKE_WORDS.has(state.raw) ||
    typeof state.live != `number` ||
    state.liveThread === null ||
    state.liveThread !== state.threadId ||
    state.open === null ||
    state.open.nonce !== state.live ||
    state.open.docked !== false ||
    state.onSheet !== false ||
    state.inHand !== state.live ||
    state.sendOut !== false
    ? false
    : typeof state.line == `string` &&
        state.line !== `` &&
        state.wouldTake === true;
}
var WAITING_ROW_LIMIT: Dynamic = 256;
function rowKey(
  envelope?: Dynamic,
  sequence?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let row: Dynamic = envelope;
  if (typeof row == `object` && row) {
    if (typeof row.opId == `string` && row.opId !== ``) return `o:` + row.opId;
    if (typeof row.at == `string` && row.at !== ``) return `a:` + row.at;
  }
  return typeof sequence == `number` && Number.isFinite(sequence)
    ? `s:` + sequence
    : null;
}
function makeWaitingSide(
  deps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let disposed: Dynamic = false;
  let feedWanted: Dynamic = false;
  let feedActive: Dynamic = false;
  let frameKnows: Dynamic = false;
  let processingEnvelope: Dynamic = false;
  let recheckPending: Dynamic = false;
  let keyboardStepBid: Dynamic = null;
  let toastIds: Dynamic = new (Set as Dynamic)();
  let endedLines: Dynamic = [];
  let takenThreads: Dynamic = [];
  let rowFirstSeen: Dynamic = new (Map as Dynamic)();
  let askStartedAt: Dynamic = new (Map as Dynamic)();
  let goneTimers: Dynamic = new (Map as Dynamic)();
  let removedByYou: Dynamic = new (Set as Dynamic)();
  let repliedThreads: Dynamic = new (Set as Dynamic)();
  let envelopeResults: Dynamic = new (WeakMap as Dynamic)();
  let rowResults: Dynamic = new (Map as Dynamic)();
  let clearSequenceCaches = (..._extraArguments: unknown[]): undefined => {
    for (let rowKey2 of rowFirstSeen.keys() as Dynamic)
      if (rowKey2.startsWith(`s:`)) {
        rowFirstSeen.delete(rowKey2);
      }
    for (let rowKey2 of rowResults.keys() as Dynamic)
      if (rowKey2.startsWith(`s:`)) {
        rowResults.delete(rowKey2);
      }
  };
  let safely = (
    callback?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      callback();
    } catch {}
  };
  let setFeed = (
    enabled?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    feedWanted = enabled;
    if ((enabled && feedActive) || (!enabled && !feedActive)) return;
    let attached: Dynamic = false;
    safely(
      (..._extraArguments: unknown[]): undefined =>
        void (attached =
          deps.feed(
            enabled,
            (waitingSide?: Dynamic, ..._extraArguments: unknown[]): undefined =>
              void hearEnvelope(waitingSide),
          ) === true),
    );
    feedActive = enabled ? attached : false;
  };
  let showToast: Dynamic = (
    message?: Dynamic,
    threadId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    safely((..._extraArguments: unknown[]): undefined => {
      let toast2: Dynamic = deps.toast(message, threadId);
      if (typeof toast2 == `string` && toast2 !== ``) {
        toastIds.add(toast2);
      }
    });
  let retention: Dynamic = makeWaitingRetention({
    now: deps.now,
    setTimeout: deps.setTimeout,
    clearTimeout: deps.clearTimeout,
    boundMs: deps.boundMs,
    ended(
      ask?: Dynamic,
      word?: Dynamic,
      checkThread?: Dynamic,
      previousCount?: Dynamic,
      whose?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      endedLines = [
        ...endedLines.filter(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            ask2.bid !== ask.bid,
        ),
        {
          bid: ask.bid,
          until: deps.now() + ENDED_LINE_HOLD_MS,
        },
      ].slice(-8);
      askStartedAt.delete(ask.bid);
      safely(
        (..._extraArguments: unknown[]): Dynamic =>
          (deps.row as Dynamic)(
            word,
            ask,
            previousCount,
            Math.max(0, deps.now() - ask.sentAt),
            ...(whose === undefined ? [] : [whose]),
          ),
      );
      let hadReply: Dynamic = repliedThreads.delete(ask.threadId);
      let removedByYou2: Dynamic = removedByYou.delete(ask.bid);
      deps.clearTimeout(goneTimers.get(ask.bid));
      goneTimers.delete(ask.bid);
      if (word === `written`) {
        if (checkThread) {
          safely(
            (..._extraArguments: unknown[]): Dynamic =>
              deps.answeredInPage(ask.threadId),
          );
        }
        safely(
          (..._extraArguments: unknown[]): Dynamic =>
            deps.say(
              CLAUDE_WRITING_OUTCOME_MESSAGES.finished,
              `ask-waiting:${ask.threadId}`,
            ),
        );
      } else {
        if (word === `ended` || word === `timeout` || word === `failed`) {
          safely(
            (..._extraArguments: unknown[]): Dynamic =>
              deps.surface(ask.threadId),
          );
          showToast(
            word === `failed`
              ? CLAUDE_COMMENT_WAITING_MESSAGES.failed
              : word === `timeout` && ask.word === `needs_user`
                ? CLAUDE_COMMENT_WAITING_MESSAGES.nothing_needs_you
                : CLAUDE_COMMENT_WAITING_MESSAGES.nothing,
            ask.threadId,
          );
        } else {
          if (word === `stopped`) {
            showToast(CLAUDE_COMMENT_WAITING_MESSAGES.dismissed, null);
          } else {
            if (word === `gone`) {
              safely(
                (..._extraArguments: unknown[]): Dynamic =>
                  deps.surface(ask.threadId),
              );
              showToast(
                removedByYou2
                  ? CLAUDE_COMMENT_WAITING_MESSAGES.removed_by_you
                  : CLAUDE_COMMENT_WAITING_MESSAGES.removed_by_someone,
                ask.threadId,
              );
            }
          }
        }
      }
      if (
        hadReply &&
        word !== `reset` &&
        !(word === `written` && checkThread)
      ) {
        safely((..._extraArguments: unknown[]): Dynamic => deps.threadCheck());
      }
    },
    changed(marks?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (retention.size() === 0) {
        setFeed(false);
      }
      let keyboardStep: Dynamic =
        keyboardStepBid !== null &&
        retention
          .marks()
          .some(
            (ask?: Dynamic, ..._extraArguments: unknown[]) =>
              ask.bid === keyboardStepBid,
          )
          ? keyboardStepBid
          : null;
      keyboardStepBid = null;
      safely(
        (..._extraArguments: unknown[]): Dynamic =>
          keyboardStep === null
            ? deps.sendMarks(marks)
            : deps.sendMarks(marks, keyboardStep),
      );
      if (!disposed) {
        recheck();
      }
    },
    waitsOnPerson: (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      showToast(
        CLAUDE_COMMENT_WAITING_MESSAGES.nothing_needs_you,
        ask.threadId,
      ),
  });
  function sendCurrentMarks(..._extraArguments: unknown[]): undefined {
    let enabled: Dynamic = false;
    safely(
      (..._extraArguments: unknown[]): undefined =>
        void (enabled = deps.switchOn() === true),
    );
    let marks: Dynamic = retention.set();
    if (!(!enabled && marks.length === 0)) {
      safely((..._extraArguments: unknown[]): Dynamic => deps.sendMarks(marks));
    }
  }
  function tryTake(
    threadId?: Dynamic,
    word?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    if (disposed) return;
    if (processingEnvelope) return void (recheckPending = true);
    let liveCard: Dynamic = deps.live();
    let liveThread: Dynamic =
      liveCard === null ? null : deps.threadOf(liveCard);
    let rawState: Dynamic = word ?? deps.rawStateOf(threadId);
    let line: Dynamic = deps.lineOf();
    if (
      !mayShrink({
        switchOn: deps.switchOn(),
        frameKnows: frameKnows,
        raw: rawState,
        live: liveCard,
        liveThread: liveThread,
        threadId: threadId,
        open: deps.openCard(),
        onSheet: deps.onSheet(),
        inHand: deps.deskInHand(),
        sendOut: liveCard === null ? true : deps.sendOut(liveCard),
        line: line,
        wouldTake: retention.wouldTake({
          bid: line,
          threadId: threadId,
        }),
      }) ||
      liveCard === null
    )
      return;
    let markWord: Dynamic = markWordOf(rawState);
    if (markWord === null) return;
    let nodeId: Dynamic = deps.nodeOf(liveCard);
    let mark: Dynamic = deps.mark(liveCard);
    if (mark === null) return;
    setFeed(true);
    askStartedAt.set(mark.bid, deps.now());
    let takesKeyboard: Dynamic = false;
    safely(
      (..._extraArguments: unknown[]): undefined =>
        void (takesKeyboard = deps.keyboardGoes(mark.card) === true),
    );
    keyboardStepBid = takesKeyboard ? mark.bid : null;
    let taken: Dynamic = retention.take(
      {
        bid: mark.bid,
        node: nodeId,
        threadId: mark.threadId,
        sentAt: mark.startedAt,
        kind: mark.kind,
      },
      markWord,
    );
    keyboardStepBid = null;
    if (!taken) {
      askStartedAt.delete(mark.bid);
      setFeed(retention.size() > 0);
      return;
    }
    safely((..._extraArguments: unknown[]): Dynamic => deps.shrink(mark.card));
    safely(
      (..._extraArguments: unknown[]): Dynamic =>
        deps.say(CLAUDE_COMMENT_WAITING_MESSAGES.taken, `inline-ask`),
    );
  }
  function recheck(..._extraArguments: unknown[]): undefined {
    if (disposed) return;
    if (feedWanted && !feedActive) {
      setFeed(true);
    }
    let liveCard: Dynamic = deps.live();
    let threadId: Dynamic = liveCard === null ? null : deps.threadOf(liveCard);
    if (threadId !== null) {
      tryTake(threadId);
    }
  }
  let threadReplied = (
    threadId?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    repliedThreads.add(threadId);
    retention.threadSaid(threadId, `replied`);
  };
  let recentEndedBids: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let now: Dynamic = deps.now();
    endedLines = endedLines.filter(
      (endedLine?: Dynamic, ..._extraArguments: unknown[]) =>
        endedLine.until >= now,
    );
    return endedLines.map(
      (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ask.bid,
    );
  };
  function hearEnvelope(
    feedEvent?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (disposed || typeof feedEvent != `object` || !feedEvent) return false;
    let { kind: kind, envelope: envelope, seq: sequence }: Dynamic = feedEvent;
    if (kind === `recovered`) {
      clearSequenceCaches();
    }
    if (kind !== `envelope` || typeof envelope != `object` || !envelope)
      return false;
    let rowKey2: Dynamic = rowKey(envelope, sequence);
    let firstSeenAt: Dynamic =
      rowKey2 === null ? null : (rowFirstSeen.get(rowKey2) ?? null);
    if (rowKey2 !== null && firstSeenAt === null) {
      rowFirstSeen.set(rowKey2, deps.now());
      if (rowFirstSeen.size > WAITING_ROW_LIMIT * 2) {
        rowFirstSeen.delete(rowFirstSeen.keys().next().value);
      }
    }
    let isOlderThanAsk: Dynamic = (
      bid?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      firstSeenAt !== null && firstSeenAt < (askStartedAt.get(bid) ?? -1 / 0);
    let cachedResult: Dynamic =
      envelopeResults.get(envelope) ??
      (rowKey2 === null ? undefined : rowResults.get(rowKey2));
    if (cachedResult !== undefined) return cachedResult;
    let recentBids: Dynamic = recentEndedBids();
    if (retention.size() === 0 && recentBids.length === 0) return false;
    let heard: Dynamic = false;
    processingEnvelope = true;
    try {
      if (deps.isAgent(envelope)) {
        let watchLine: Dynamic = deps.watchLine();
        let namesCurrentLine: Dynamic =
          watchLine !== null && deps.names(envelope, watchLine) === `named`;
        let writesNothing: Dynamic = deps.writesNothing(envelope);
        let whose: Dynamic = deps.whoseOf(envelope);
        let namesRecentLine: Dynamic =
          !writesNothing &&
          recentBids.some(
            (recentBid?: Dynamic, ..._extraArguments: unknown[]) =>
              deps.names(envelope, recentBid) === `named`,
          );
        let staleAskSeen: Dynamic = false;
        heard =
          (retention.heardRow({
            names: (
              waitingSide?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              isOlderThanAsk(waitingSide)
                ? ((staleAskSeen = true), `others`)
                : deps.names(envelope, waitingSide),
            writesNothing: writesNothing,
            queued: (waitingSide?: Dynamic, ..._extraArguments: unknown[]) =>
              deps.rawStateOf(waitingSide) === `queued`,
            ...(whose !== undefined && {
              whose: whose,
            }),
            onNode: (
              waitingSide?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => !staleAskSeen && deps.onNode(envelope, waitingSide),
          }) ||
            namesRecentLine) &&
          !namesCurrentLine;
      }
    } catch {
      heard = false;
    } finally {
      processingEnvelope = false;
    }
    envelopeResults.set(envelope, heard);
    if (rowKey2 !== null) {
      rowResults.set(rowKey2, heard);
      if (rowResults.size > WAITING_ROW_LIMIT) {
        rowResults.delete(rowResults.keys().next().value);
      }
    }
    if (recheckPending) {
      recheckPending = false;
      deps.setTimeout(recheck, 0);
    }
    return heard;
  }
  return {
    waiting: (..._extraArguments: unknown[]): Dynamic => retention.size(),
    taken(
      threadId?: Dynamic,
      rawState?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (disposed || typeof threadId != `string` || threadId === ``) return;
      let word: Dynamic = markWordOf(rawState);
      if (word !== null) {
        retention.threadSaid(threadId, word);
      }
      if (TAKE_WORDS.has(rawState)) {
        if (!takenThreads.includes(threadId)) {
          takenThreads.push(threadId);
          if (takenThreads.length > WAITING_ROW_LIMIT) {
            takenThreads.shift();
          }
        }
        if (
          !frameKnows &&
          deps.live() !== null &&
          deps.threadOf(deps.live()) === threadId
        ) {
          sendCurrentMarks();
        }
        tryTake(threadId, rawState);
      }
    },
    storeChanged(..._extraArguments: unknown[]): undefined {
      if (!disposed) {
        for (let ask of retention.asks() as Dynamic) {
          let enabled: Dynamic = false;
          let makeWaitingSideResult: Dynamic;
          try {
            enabled = deps.claudeAnswered(ask.threadId) === true;
            makeWaitingSideResult = deps.noteOf(ask.threadId);
          } catch {
            continue;
          }
          if (enabled) {
            threadReplied(ask.threadId);
          } else {
            if (
              makeWaitingSideResult === `ended` ||
              makeWaitingSideResult === `stopped` ||
              makeWaitingSideResult === `no_reply`
            ) {
              retention.threadSaid(ask.threadId, `over`);
            } else {
              if (
                makeWaitingSideResult !== undefined &&
                deps.refused(makeWaitingSideResult)
              ) {
                retention.threadSaid(ask.threadId, `refused`);
              }
            }
          }
        }
        recheck();
      }
    },
    heard: hearEnvelope,
    holdsRow(rowNames?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        disposed ||
        rowNames === `named` ||
        (rowNames !== `others` && rowNames !== `none`)
      )
        return false;
      try {
        if (deps.switchOn() !== true) return false;
        let live: Dynamic = deps.live();
        if (
          live === null ||
          (retention.size() === 0 && recentEndedBids().length === 0)
        )
          return false;
        let threadOf: Dynamic = deps.threadOf(live);
        if (
          (threadOf !== null && threadOf.startsWith(`route:`)) ||
          (threadOf !== null && takenThreads.includes(threadOf))
        )
          return false;
        let rawStateOf: Dynamic =
          threadOf === null ? undefined : deps.rawStateOf(threadOf);
        return !(
          typeof rawStateOf == `string` &&
          (TAKE_WORDS.has(rawStateOf) || rawStateOf === `ended`)
        );
      } catch {
        return false;
      }
    },
    holdsReply(threadId?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (disposed || typeof threadId != `string`) return false;
      try {
        if (
          !retention.holds(threadId) &&
          retention
            .asks()
            .some(
              (ask?: Dynamic, ..._extraArguments: unknown[]) =>
                ask.threadId === threadId,
            ) &&
          deps.claudeAnswered(threadId) === true
        ) {
          threadReplied(threadId);
        }
      } catch {
        return false;
      }
      return retention.holds(threadId);
    },
    frameSaid(
      bid?: Dynamic,
      word?: Dynamic,
      removedByYou2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          disposed ||
          typeof bid != `string` ||
          (word !== `landed` && word !== `gone` && word !== `dismiss`)
        )
      ) {
        if (word === `gone` && removedByYou2 !== true) {
          if (goneTimers.has(bid)) return;
          if (
            !retention
              .asks()
              .some(
                (ask?: Dynamic, ..._extraArguments: unknown[]) =>
                  ask.bid === bid,
              )
          )
            return void retention.frameSaid(bid, `gone`);
          goneTimers.set(
            bid,
            ((waitingSide?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              deps.setTimeout((..._extraArguments: unknown[]): undefined => {
                goneTimers.delete(bid);
                if (!disposed) {
                  retention.frameSaid(bid, `gone`, waitingSide);
                }
              }, GONE_HOLD_MS))(deps.now()),
          );
          return;
        }
        if (
          word === `gone` &&
          retention
            .asks()
            .some(
              (ask?: Dynamic, ..._extraArguments: unknown[]) => ask.bid === bid,
            )
        ) {
          removedByYou.add(bid);
        }
        if (word === `landed`) {
          let ask: Dynamic = retention
            .asks()
            .find(
              (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
                ask2.bid === bid,
            );
          let enabled: Dynamic = false;
          try {
            enabled =
              ask !== undefined && deps.rawStateOf(ask.threadId) === `queued`;
          } catch {
            enabled = false;
          }
          if (enabled) return;
        }
        retention.frameSaid(bid, word);
        removedByYou.delete(bid);
      }
    },
    frameReady(..._extraArguments: unknown[]): undefined {
      if (!disposed) {
        frameKnows = false;
        sendCurrentMarks();
      }
    },
    frameKnows(..._extraArguments: unknown[]): undefined {
      if (!(disposed || frameKnows)) {
        frameKnows = true;
        recheck();
      }
    },
    dispose(..._extraArguments: unknown[]): undefined {
      if (!disposed) {
        disposed = true;
        for (let makeWaitingSideResult of goneTimers.values() as Dynamic)
          deps.clearTimeout(makeWaitingSideResult);
        goneTimers.clear();
        retention.reset();
        setFeed(false);
        for (let makeWaitingSideResult of toastIds as Dynamic)
          safely(
            (..._extraArguments: unknown[]): Dynamic =>
              deps.dismiss(makeWaitingSideResult),
          );
        toastIds.clear();
      }
    },
  };
}
var validWaitingRowId: Dynamic = (
  validWaitingRowId2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof validWaitingRowId2 == `string` &&
  dataModelSchemasPattern16.test(validWaitingRowId2)
    ? validWaitingRowId2
    : null;
function createWaitingSide(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let feedWanted: Dynamic = false;
  let unsubscribeFeed: Dynamic = null;
  let isUserRowId: Dynamic = (
    rowId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof rowId == `string` &&
    observabilityBrowserAndOperationEventsPattern22.test(rowId);
  let raiseToast: Dynamic =
    host.raise ??
    ((
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void toast(waitingSide2, options));
  let waitingSide: Dynamic = makeWaitingSide({
    now: (..._extraArguments: unknown[]): Dynamic => performance.now(),
    setTimeout: (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (window as Dynamic).setTimeout(waitingSide2, options),
    clearTimeout: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (window as Dynamic).clearTimeout(waitingSide2),
    boundMs: SESSION_RUN_MAX_MS,
    switchOn:
      host.switchOn ??
      ((..._extraArguments: unknown[]): Dynamic =>
        resolvePlatformFeatureFlagsEnabled2(`askWaitingMarks`)),
    live: (..._extraArguments: unknown[]): Dynamic =>
      host.sessionRunsRef.current?.live() ?? null,
    threadOf: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => host.sessionRunsRef.current?.threadOf(waitingSide2) ?? null,
    lineOf: (..._extraArguments: unknown[]): Dynamic =>
      validWaitingRowId(host.sessionRunsRef.current?.lineOf()),
    watchLine: (..._extraArguments: unknown[]): Dynamic =>
      host.sessionRunsRef.current?.lineOf() ??
      host.sessionLineRef.current?.block?.bid ??
      null,
    mark: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      host.sessionRunsRef.current?.mark(waitingSide2) ?? null,
    openCard: (..._extraArguments: unknown[]): Dynamic => {
      let openCard: Dynamic = host.openCard();
      return openCard === null
        ? null
        : {
            nonce: openCard.nonce,
            docked: openCard.docked === true,
          };
    },
    onSheet: (..._extraArguments: unknown[]) =>
      host.askOnSheetRef.current === true,
    deskInHand: (..._extraArguments: unknown[]): Dynamic =>
      host.askCardDeskRef.current?.inHand() ?? null,
    sendOut: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]) =>
      host.sessionSendingRef.current === waitingSide2,
    nodeOf: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      host.sessionLineRef.current?.card === waitingSide2
        ? host.sessionLineRef.current.node
        : ``,
    rawStateOf: commentSessionIdentity,
    noteOf: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      useCommentStore.getState().summonNotes[waitingSide2],
    claudeAnswered: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]) => {
      let record: Dynamic = {
        agentRows: carrierBaselineOf(waitingSide2),
      };
      for (let createWaitingSideResult of heldThreads(
        useCommentStore.getState(),
      ) as Dynamic)
        if (
          createWaitingSideResult.id === waitingSide2 &&
          resolveDataModelSchemasAgentRows(record, createWaitingSideResult)
        )
          return true;
      return false;
    },
    refused: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveDataModelSchemasSent(waitingSide2),
    isAgent: (waitingSide2?: Dynamic, ..._extraArguments: unknown[]) =>
      isDataModelSchemasKind3(waitingSide2)?.kind === `agent`,
    writesNothing: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => hasMintedContent(waitingSide2),
    names: (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => envelopeNamesBlock(waitingSide2, options, isUserRowId),
    whoseOf: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let pid: Dynamic = host.pid();
      return whoseRow({
        via: waitingSide2?.actor?.via,
        writer: isDataModelSchemasKind3(waitingSide2)?.principal,
        viewer: pid === undefined ? null : frameFenceAuthor(`project/` + pid),
      });
    },
    onNode: (
      envelope?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let diff: Dynamic = envelope?.diff;
      return !Array.isArray(diff) || options === ``
        ? false
        : diff.some(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let ref: Dynamic = item?.address?.ref;
              return ref?.object === `node` && ref.id === options;
            },
          );
    },
    shrink: host.easeOut,
    keyboardGoes:
      host.keyboardGoes ??
      ((waitingSide2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        easeOutTakesKeyboard({
          how: `marked`,
          at: easeOutKeyboardAt(document, waitingSide2),
          pageHasFocus: (document as Dynamic).hasFocus(),
        })),
    sendMarks: (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!(host.navigatedRef.current || host.goneRef.current)) {
        host.selbarPortRef.current?.postMessage({
          type: `ask-waiting`,
          marks: waitingSide2,
          ...(options !== undefined && {
            step: options,
          }),
        });
      }
    },
    feed: (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      feedWanted = waitingSide2;
      if (!waitingSide2) {
        unsubscribeFeed?.();
        unsubscribeFeed = null;
        return true;
      }
      let pid: Dynamic = host.pid();
      if (pid === undefined) return false;
      if (unsubscribeFeed !== null) return true;
      let createWaitingSideHandler = (
        remainingAttempts?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void preloadModule(
          async (..._extraArguments: unknown[]): Promise<Dynamic> => {
            let { subscribeProjectFeed: then }: Dynamic = await import(
              "./platform-core"
            ).then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.Fg,
            );
            return {
              subscribeProjectFeed: then,
            };
          },
          mapPreloadDependencies([0, 1, 2, 3]),
          import.meta.url,
        ).then(
          (
            { subscribeProjectFeed: subscribeProjectFeed }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              !(!feedWanted || unsubscribeFeed !== null || host.goneRef.current)
            ) {
              unsubscribeFeed = subscribeProjectFeed(pid, options);
            }
          },
          (..._extraArguments: unknown[]): undefined =>
            void (
              remainingAttempts > 0 &&
              feedWanted &&
              !host.goneRef.current &&
              (window as Dynamic).setTimeout(
                (..._extraArguments: unknown[]): Dynamic =>
                  feedWanted &&
                  unsubscribeFeed === null &&
                  createWaitingSideHandler(remainingAttempts - 1),
                5e3,
              )
            ),
        );
      createWaitingSideHandler(3);
      return true;
    },
    answeredInPage: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      quietCarrierWritten.add(waitingSide2);
      carrierSettled(waitingSide2);
    },
    surface: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      carrierSettled(waitingSide2);
      useCommentStore.getState().setSurfaceCarrier(waitingSide2);
    },
    threadCheck: host.threadCheck,
    toast: (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (options === null) {
        raiseToast(waitingSide2, {
          id: `ask-waiting`,
        });
        return `ask-waiting`;
      }
      let label: Dynamic = `ask-waiting:${options}`;
      notifyClaudeReplied(options, {
        openList: host.openList,
        raise: (
          waitingSide3?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          raiseToast(
            waitingSide3 === `Claude replied` ? waitingSide2 : waitingSide3,
            {
              ...options2,
              id: label,
            },
          ),
      });
      return label;
    },
    dismiss: (
      waitingSide2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void toast.dismiss(waitingSide2),
    say:
      host.announce ??
      ((
        waitingSide2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolvePlatformAnnouncementsValue(document, waitingSide2, {
          key: options,
        })),
    row: (
      waitingSide2?: Dynamic,
      entry?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      reportCommentSessionEnd(
        waitingSide2,
        entry.kind,
        context,
        dependencies,
        argument,
      ),
  });
  let unsubscribeTaken: Dynamic = registerCommentSessionHost(
    (
      waitingSide2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => waitingSide.taken(waitingSide2, options),
  );
  let unsubscribeStore: Dynamic = useCommentStore.subscribe(
    (..._extraArguments: unknown[]): Dynamic => waitingSide.storeChanged(),
  );
  if (host.selbarPortRef.current !== null) {
    waitingSide.frameReady();
  }
  return {
    ...waitingSide,
    dispose(..._extraArguments: unknown[]): undefined {
      waitingSide.dispose();
      unsubscribeStore();
      unsubscribeTaken();
    },
  };
}
export {
  ENDED_LINES_MAX,
  ENDED_LINE_HOLD_MS,
  GONE_HOLD_MS,
  TAKE_WORDS,
  createWaitingSide,
  makeWaitingSide,
  markWordOf,
  mayShrink,
  rowKey,
};

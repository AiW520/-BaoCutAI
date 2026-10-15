/** BaoCut: comment notifications from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  Avatar,
  DataModelSchemasPending,
  PlatformFeatureFlagsState5,
  create,
  filterDataModelSchemasFilter3,
  heldThreads,
  preloadModule,
  resolveDataModelSchemasSent,
  resolveEditorAnchorsAndMentionsValue,
  resolvePlatformFeatureFlagsEnabled2,
  resolvePlatformSessionAndSourcesValue,
  toast,
  useCommentStore,
} from "../dependencies";

function clampPopoverArrow(
  clampPopoverArrow2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 8,
  argument: Dynamic = 0,
  ..._extraArguments: unknown[]
) {
  return Math.max(
    Math.min(clampPopoverArrow2, context - options / 2 - dependencies),
    argument + options / 2 + dependencies,
  );
}

function CollaboratorAvatar(
  {
    email: email,
    name: name,
    photoUrl: photoUrl,
    size = 16,
    className = ``,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let collaboratorAvatarResult: Dynamic = resolvePlatformSessionAndSourcesValue(
    email?.trim(),
  );
  let name2: Dynamic = name?.trim() || collaboratorAvatarResult || `?`;
  let background = resolveEditorAnchorsAndMentionsValue(email, name);
  return (
    <Avatar
      src={photoUrl}
      name={name2}
      size={size <= 20 ? `sm` : size <= 28 ? `md` : `lg`}
      className={`shrink-0 overflow-hidden select-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.45,
        ...(background
          ? {
              background: background,
              color: `white`,
            }
          : {}),
      }}
    />
  );
}

var CLAUDE_WRITING_OUTCOME_MESSAGES: {
    finished: string;
    stopped: string;
    stopped_early: string;
    gone: string;
    undone: string;
};

var CLAUDE_ASKED_WAITING_MESSAGE: string;

var CLAUDE_WAITING_FOR_ANSWER_MESSAGE: string;

var CLAUDE_REQUEST_STOP_MESSAGES: Dynamic;

var CLAUDE_WRITE_UNAVAILABLE_MESSAGE: string;

var CLAUDE_COMMENT_FALLBACK_MESSAGE: string;

var CLAUDE_REQUEST_UNSENDABLE_MESSAGE: string;

var CLAUDE_REQUEST_REFUSAL_MESSAGES: Dynamic;

var CLAUDE_COMMENT_WAITING_MESSAGES: {
    taken: string;
    nothing: string;
    nothing_needs_you: string;
    failed: string;
    dismissed: string;
    removed_by_you: string;
    removed_by_someone: string;
};

var ASK_NOTICE_TIMEOUT_MS: number;

var ASK_NOTICE_HOLD_MS: number;

var MAX_ASK_NOTICE_RETRIES: number;

var INLINE_ASK_TOAST_ID: string;

var ASK_LINE_REMOVED_MESSAGE: string;

var ASK_DOCUMENT_CHANGED_MESSAGE: string;

var COMMENT_DRAFT_BLOCKING_MESSAGE: string;

var CLAUDE_BUSY_MESSAGE: string;

var CLAUDE_BUSY_REQUEST_KEPT_MESSAGE: string;

var CLAUDE_LINE_ALREADY_BUSY_MESSAGE: string;

var claudeBusyMessage: Dynamic;

function createCommentNoticeCoordinator(
  timers?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let createCommentNoticeCoordinatorResult: Dynamic = null;
  let createCommentNoticeCoordinatorResult2: Dynamic = null;
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let notice = (
    commentNoticeCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    createCommentNoticeCoordinatorResult = commentNoticeCoordinator;
    timers.show(commentNoticeCoordinator);
    if (commentNoticeCoordinator === null) {
      timers.notice(null);
    }
  };
  let createCommentNoticeCoordinatorHandler = (
    commentNoticeCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    timers.clearTimeout(commentNoticeCoordinator.timer);
    if (createCommentNoticeCoordinatorResult2 === commentNoticeCoordinator) {
      createCommentNoticeCoordinatorResult2 = null;
    }
  };
  return {
    current: (..._extraArguments: unknown[]): Dynamic =>
      createCommentNoticeCoordinatorResult,
    isSending: (..._extraArguments: unknown[]) =>
      createCommentNoticeCoordinatorResult2 !== null,
    opened(request?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (createCommentNoticeCoordinatorResult?.nonce === request.nonce) {
        createCommentNoticeCoordinatorResult = {
          ...createCommentNoticeCoordinatorResult,
          rect: request.rect,
        };
        timers.show(createCommentNoticeCoordinatorResult);
        timers.refocus(request.nonce);
        return;
      }
      if (
        createCommentNoticeCoordinatorResult !== null ||
        createCommentNoticeCoordinatorResult2 !== null
      ) {
        timers.post({
          type: `inline-ask-cancel`,
          nonce: request.nonce,
        });
        if (createCommentNoticeCoordinatorResult !== null) {
          timers.refocus(createCommentNoticeCoordinatorResult.nonce);
        }
        return;
      }
      let blocked: Dynamic = timers.blocked();
      if (
        blocked !== null ||
        (!request.docked && request.rect.width < MAX_ASK_NOTICE_RETRIES)
      ) {
        timers.post({
          type: `inline-ask-cancel`,
          nonce: request.nonce,
        });
        if (blocked === `dirty` && !request.docked) {
          timers.toast(COMMENT_DRAFT_BLOCKING_MESSAGE);
        }
        return;
      }
      timers.prepareRail();
      notice(request);
    },
    movedTo(
      commentNoticeCoordinator?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return createCommentNoticeCoordinatorResult === null ||
        createCommentNoticeCoordinatorResult.nonce !==
          commentNoticeCoordinator ||
        createCommentNoticeCoordinatorResult.docked === true ||
        createCommentNoticeCoordinatorResult2 !== null ||
        options.docked === true ||
        options.rect.width < MAX_ASK_NOTICE_RETRIES
        ? false
        : (timers.refocus(commentNoticeCoordinator),
          (createCommentNoticeCoordinatorResult = options),
          timers.show(options),
          timers.notice(null),
          true);
    },
    commentRefused(..._extraArguments: unknown[]) {
      timers.toast(COMMENT_DRAFT_BLOCKING_MESSAGE);
      return createCommentNoticeCoordinatorResult === null
        ? false
        : (timers.refocus(createCommentNoticeCoordinatorResult.nonce), true);
    },
    moved(
      commentNoticeCoordinator?: Dynamic,
      rect?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !createCommentNoticeCoordinatorResult ||
        createCommentNoticeCoordinatorResult.nonce !== commentNoticeCoordinator
      )
        return;
      let rect2: Dynamic = createCommentNoticeCoordinatorResult.rect;
      if (
        !(
          rect2.top === rect.top &&
          rect2.left === rect.left &&
          rect2.width === rect.width &&
          rect2.height === rect.height &&
          rect2.line === rect.line
        )
      ) {
        notice({
          ...createCommentNoticeCoordinatorResult,
          rect: rect,
        });
      }
    },
    height(
      nonce?: Dynamic,
      height?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      timers.post({
        type: `inline-ask-slot`,
        nonce: nonce,
        height: height,
      });
    },
    cancel(
      commentNoticeCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (createCommentNoticeCoordinatorResult) {
        if (
          !(
            createCommentNoticeCoordinatorResult2 &&
            createCommentNoticeCoordinatorResult2.nonce ===
              createCommentNoticeCoordinatorResult.nonce
          )
        ) {
          timers.post({
            type: `inline-ask-cancel`,
            nonce: createCommentNoticeCoordinatorResult.nonce,
            ...(commentNoticeCoordinator.restoreCaret && {
              restoreCaret: true,
            }),
          });
          notice(null);
        }
      }
    },
    send(
      body?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult;
      return !createCommentNoticeCoordinatorResult3 ||
        createCommentNoticeCoordinatorResult2
        ? Promise.reject(Error(`inline ask: not open`))
        : dependencies?.quiet !== true && timers.blocked() === `dirty`
          ? (timers.toast(COMMENT_DRAFT_BLOCKING_MESSAGE),
            Promise.reject(
              Error(`inline ask: another comment is being written`),
            ))
          : (uniqueItems.delete(createCommentNoticeCoordinatorResult3.nonce),
            new (Promise as Dynamic)(
              (
                resolve?: Dynamic,
                reject?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let offer: Dynamic = {
                  nonce: createCommentNoticeCoordinatorResult3.nonce,
                  body: body,
                  to: options,
                  cc: context,
                  resolve: resolve,
                  reject: reject,
                  matched: false,
                  timer: timers.setTimeout(
                    (..._extraArguments: unknown[]): undefined => {
                      if (
                        !(
                          createCommentNoticeCoordinatorResult2 !== offer ||
                          offer.matched
                        )
                      ) {
                        createCommentNoticeCoordinatorHandler(offer);
                        uniqueItems.add(offer.nonce);
                        timers.post({
                          type: `inline-ask-revert`,
                          nonce: offer.nonce,
                        });
                        reject(
                          Error(`inline ask: the document did not answer`),
                        );
                      }
                    },
                    ASK_NOTICE_TIMEOUT_MS,
                  ),
                };
                createCommentNoticeCoordinatorResult2 = offer;
                timers.notice(null);
                timers.post({
                  type: `inline-ask-commit`,
                  nonce: createCommentNoticeCoordinatorResult3.nonce,
                  ...(dependencies?.emptyOnly === true && {
                    emptyOnly: true,
                  }),
                });
              },
            ));
    },
    matchCommentAdd(
      commentNoticeCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (uniqueItems.has(commentNoticeCoordinator)) return `drop`;
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (
        !(
          !createCommentNoticeCoordinatorResult3 ||
          createCommentNoticeCoordinatorResult3.nonce !==
            commentNoticeCoordinator ||
          createCommentNoticeCoordinatorResult3.matched
        )
      ) {
        createCommentNoticeCoordinatorResult3.matched = true;
        timers.clearTimeout(createCommentNoticeCoordinatorResult3.timer);
        createCommentNoticeCoordinatorResult3.timer = timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            if (
              !(
                createCommentNoticeCoordinatorResult2 !==
                  createCommentNoticeCoordinatorResult3 ||
                createCommentNoticeCoordinatorResult3.started
              )
            ) {
              createCommentNoticeCoordinatorHandler(
                createCommentNoticeCoordinatorResult3,
              );
              uniqueItems.add(createCommentNoticeCoordinatorResult3.nonce);
              timers.post({
                type: `inline-ask-revert`,
                nonce: createCommentNoticeCoordinatorResult3.nonce,
              });
              createCommentNoticeCoordinatorResult3.reject(
                Error(`inline ask: the post never started`),
              );
            }
          },
          ASK_NOTICE_HOLD_MS,
        );
        return {
          nonce: createCommentNoticeCoordinatorResult3.nonce,
          body: createCommentNoticeCoordinatorResult3.body,
          to: createCommentNoticeCoordinatorResult3.to,
          cc: createCommentNoticeCoordinatorResult3.cc,
        };
      }
    },
    started(
      commentNoticeCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (
        !(
          !createCommentNoticeCoordinatorResult3 ||
          createCommentNoticeCoordinatorResult3.nonce !==
            commentNoticeCoordinator ||
          !createCommentNoticeCoordinatorResult3.matched
        )
      ) {
        createCommentNoticeCoordinatorResult3.started = true;
        timers.clearTimeout(createCommentNoticeCoordinatorResult3.timer);
      }
    },
    documentSays(
      commentNoticeCoordinator?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (
        createCommentNoticeCoordinatorResult3 &&
        createCommentNoticeCoordinatorResult3.nonce === options &&
        !createCommentNoticeCoordinatorResult3.matched
      ) {
        createCommentNoticeCoordinatorHandler(
          createCommentNoticeCoordinatorResult3,
        );
        createCommentNoticeCoordinatorResult3.reject(
          Error(
            commentNoticeCoordinator === `gone`
              ? `inline ask: the spot left the page`
              : `inline ask: ${context ?? `failed`}`,
          ),
        );
        if (
          commentNoticeCoordinator === `gone` &&
          createCommentNoticeCoordinatorResult?.nonce === options
        ) {
          timers.notice(
            createCommentNoticeCoordinatorResult.docked
              ? ASK_DOCUMENT_CHANGED_MESSAGE
              : ASK_LINE_REMOVED_MESSAGE,
          );
        }
        return;
      }
      if (
        commentNoticeCoordinator === `gone` &&
        createCommentNoticeCoordinatorResult?.nonce === options
      ) {
        if (dependencies) {
          timers.notice(
            createCommentNoticeCoordinatorResult.docked
              ? ASK_DOCUMENT_CHANGED_MESSAGE
              : ASK_LINE_REMOVED_MESSAGE,
          );
        } else {
          notice(null);
        }
      }
    },
    outcome(
      nonce?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        uniqueItems.has(nonce) &&
        createCommentNoticeCoordinatorResult2?.nonce !== nonce
      )
        return;
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (options === null && context?.restored === false) {
        if (
          createCommentNoticeCoordinatorResult3 &&
          createCommentNoticeCoordinatorResult3.nonce === nonce
        ) {
          createCommentNoticeCoordinatorHandler(
            createCommentNoticeCoordinatorResult3,
          );
          timers.post({
            type: `inline-ask-revert`,
            nonce: nonce,
          });
          createCommentNoticeCoordinatorResult3.reject(
            Error(`inline ask: the comment could not be created`),
          );
        }
        return;
      }
      if (
        createCommentNoticeCoordinatorResult3 &&
        createCommentNoticeCoordinatorResult3.nonce === nonce
      ) {
        createCommentNoticeCoordinatorHandler(
          createCommentNoticeCoordinatorResult3,
        );
        createCommentNoticeCoordinatorResult3.resolve(options ?? ``);
      }
      if (options !== null && timers.pendingFor(options)) {
        lookup.set(options, nonce);
      } else {
        timers.post({
          type: `inline-ask-done`,
          nonce: nonce,
        });
      }
      if (createCommentNoticeCoordinatorResult?.nonce === nonce) {
        notice(null);
      }
    },
    carried(
      commentNoticeCoordinator?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (
        !(
          !createCommentNoticeCoordinatorResult3 ||
          createCommentNoticeCoordinatorResult3.nonce !==
            commentNoticeCoordinator
        )
      ) {
        createCommentNoticeCoordinatorHandler(
          createCommentNoticeCoordinatorResult3,
        );
        createCommentNoticeCoordinatorResult3.resolve(options);
      }
    },
    abandon(
      commentNoticeCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (
        !(
          !createCommentNoticeCoordinatorResult3 ||
          createCommentNoticeCoordinatorResult3.nonce !==
            commentNoticeCoordinator
        )
      ) {
        createCommentNoticeCoordinatorHandler(
          createCommentNoticeCoordinatorResult3,
        );
        uniqueItems.add(commentNoticeCoordinator);
        createCommentNoticeCoordinatorResult3.reject(
          Error(`inline ask: abandoned`),
        );
      }
    },
    dismissed(
      commentNoticeCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let [
        createCommentNoticeCoordinatorResult3,
        createCommentNoticeCoordinatorResult4,
      ] of lookup as Dynamic)
        if (
          createCommentNoticeCoordinatorResult4 === commentNoticeCoordinator
        ) {
          timers.endWait(createCommentNoticeCoordinatorResult3);
          return;
        }
    },
    threadSettled(
      commentNoticeCoordinator?: Dynamic,
      reason?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let nonce: Dynamic = lookup.get(commentNoticeCoordinator);
      if (nonce !== undefined) {
        lookup.delete(commentNoticeCoordinator);
        timers.post({
          type: `inline-ask-done`,
          nonce: nonce,
          reason: reason,
        });
      }
    },
    tracking: (..._extraArguments: unknown[]): Dynamic => lookup,
    reset(..._extraArguments: unknown[]): undefined {
      let createCommentNoticeCoordinatorResult3: Dynamic =
        createCommentNoticeCoordinatorResult2;
      if (createCommentNoticeCoordinatorResult3) {
        createCommentNoticeCoordinatorHandler(
          createCommentNoticeCoordinatorResult3,
        );
        createCommentNoticeCoordinatorResult3.reject(
          Error(`inline ask: the page reloaded`),
        );
      }
      lookup.clear();
      uniqueItems.clear();
      notice(null);
    },
  };
}

var commentSessionFeatureCached: Dynamic;

var isCommentSessionFeatureDisabled: Dynamic;

var initialAskCardRecoveryState: Dynamic;

var hasAskCardRecoveryContent: Dynamic;

function flipAskCardRecovery(
  flipAskCardRecovery2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!(!options || flipAskCardRecovery2.flipped)) {
    flipAskCardRecovery2.flipped = true;
    flipAskCardRecovery2.lives = context.alive();
    flipAskCardRecovery2.was = flipAskCardRecovery2.lives
      ? (context.record.told.current ?? undefined)
      : undefined;
    context.closes(context.record);
    context.changed();
    context.says();
  }
}

function isAskCardRecoveryAlive(
  askCardRecoveryAlive?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (askCardRecoveryAlive.lives && !options()) {
    askCardRecoveryAlive.lives = false;
    askCardRecoveryAlive.was = undefined;
  }
  return askCardRecoveryAlive.lives;
}

var askCardRecoveryPreviousNotice: Dynamic;

var hasAskCardRecoveryGone: Dynamic;

function markAskCardLoweringDebt(
  markAskCardLoweringDebt2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  markAskCardLoweringDebt2.owes = !options;
  return options;
}

function takeAskCardLoweringDebt(
  askCardLoweringDebt?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !options || !askCardLoweringDebt.owes
    ? null
    : ((askCardLoweringDebt.owes = false),
      {
        type: `page-lower`,
      });
}

function askCardRecoveryDisposition(
  cardRecoveryDisposition?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !cardRecoveryDisposition.gone ||
    cardRecoveryDisposition.reannounce ||
    (cardRecoveryDisposition.lives &&
      (cardRecoveryDisposition.movedFromOpen ||
        cardRecoveryDisposition.undoKept))
    ? `on`
    : cardRecoveryDisposition.moved
      ? `move_refused`
      : `release`;
}

function askCardRecoveryOffer(
  cardRecovery?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.gone && (options.back || cardRecovery.back)
    ? ((cardRecovery.back = true),
      {
        told: false,
        closed: true,
        offer: options.offer || (options.back && options.kept),
      })
    : {
        told: options.told,
        closed: options.closed,
        offer: options.offer,
      };
}

function askCardWriteUnavailableMessage(
  cardWriteUnavailableMessage?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  cardWriteUnavailableMessage.lost = false;
  return options
    ? CLAUDE_COMMENT_FALLBACK_MESSAGE
    : CLAUDE_WRITE_UNAVAILABLE_MESSAGE;
}

function askCardRecoverySendDisposition(
  cardRecoverySendDisposition?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return cardRecoverySendDisposition.lost
    ? `mute`
    : !cardRecoverySendDisposition.back || !options.came
      ? `send`
      : options.offer
        ? options.line ===
          `Claude can’t write here. Press Enter in your request to ask Claude in a comment others can see.`
          ? `send`
          : `turn`
        : `mute`;
}

var askCardRecoverySendMessage: Dynamic;

function askCardRecoveryLostMessage(
  cardRecoveryLostMessage?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !options ||
    (context !==
      `That line was removed — copy your text, or close this and pick @Agent again.` &&
      context !==
        `The document changed under this — copy your text, or close this and type @Agent in the document.`)
    ? context
    : ((cardRecoveryLostMessage.lost = true),
      CLAUDE_REQUEST_UNSENDABLE_MESSAGE);
}

function shouldReleaseGoneAskCard(
  shouldReleaseGoneAskCard2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !options.gone || !options.docked || shouldReleaseGoneAskCard2.judged
    ? false
    : ((shouldReleaseGoneAskCard2.judged = true), !options.holding);
}

var sessionRouteModule: Dynamic;

var sessionRouteModuleFailed: boolean;

var sessionRouteModulePromise: Dynamic;

var loadSessionRouteModule: Dynamic;

var getSessionRouteModule: Dynamic;

function ensureSessionRouteModule(..._extraArguments: unknown[]): Dynamic {
  return sessionRouteModule === null
    ? sessionRouteModuleFailed || isCommentSessionFeatureDisabled()
      ? Promise.resolve(null)
      : ((sessionRouteModulePromise ??= loadSessionRouteModule().then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (sessionRouteModule = result),
          (..._extraArguments: unknown[]) => (
            (sessionRouteModuleFailed = true),
            null
          ),
        )),
        sessionRouteModulePromise)
    : Promise.resolve(sessionRouteModule);
}

function hasMintedContent(
  mintedContent?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let count: number = 0;
  let count2: number = 0;
  let enabled = false;
  let flat = (
    mintedContent2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        enabled ||
        options > 14 ||
        (count += 1) > 2e4 ||
        typeof mintedContent2 != `object` ||
        !mintedContent2
      )
    ) {
      if (Array.isArray(mintedContent2))
        return void mintedContent2.forEach(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            flat(item, options + 1),
        );
      for (let [
        hasMintedContentResult,
        hasMintedContentResult2,
      ] of Object.entries(mintedContent2) as Dynamic)
        if (
          !(
            hasMintedContentResult === `actor` ||
            hasMintedContentResult === `address`
          )
        ) {
          if (hasMintedContentResult === `minted`) {
            count2 += 1;
            if (
              Array.isArray(hasMintedContentResult2)
                ? hasMintedContentResult2.flat(4).length > 0
                : hasMintedContentResult2 != null &&
                  hasMintedContentResult2 !== false
            ) {
              enabled = true;
            }
            if (mintedContent2.elided === true) {
              enabled = true;
            }
          } else {
            flat(hasMintedContentResult2, options + 1);
          }
        }
    }
  };
  flat(mintedContent, 0);
  return count2 > 0 && !enabled;
}

function eventChangesNode(
  envelope?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let diff: Dynamic = envelope?.diff;
  return Array.isArray(diff)
    ? diff.some((item?: Dynamic, ..._extraArguments: unknown[]) => {
        let ref: Dynamic = item?.address?.ref;
        return ref?.object === `node` && ref.id === options;
      })
    : false;
}

function isAgentWriteToNode(
  entry?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    entry?.kind === `agent` &&
    !hasMintedContent(options) &&
    eventChangesNode(options, context)
  );
}

var MAX_WRITE_CURSOR_ENTRIES: number;

var writeCursors: Dynamic;

function eventEditRevision(
  eventEditRevision2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let eventEditRevisionResult of [
    eventEditRevision2?.edit,
    eventEditRevision2?.applied,
  ] as Dynamic) {
    let rev: Dynamic = eventEditRevisionResult?.rev;
    if (typeof rev == `number` && Number.isFinite(rev)) return rev;
  }
}

function rememberAgentWriteCursor(
  rememberAgentWriteCursor2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  let axis: Dynamic;
  let rememberAgentWriteCursorResult: Dynamic;
  if (typeof argument == `number` && Number.isFinite(argument))
    [axis, rememberAgentWriteCursorResult] = [`seq`, argument];
  else {
    let eventEditRevision2 =
      options !== undefined && eventChangesNode(dependencies, options)
        ? eventEditRevision(dependencies)
        : undefined;
    if (eventEditRevision2 === undefined) return;
    [axis, rememberAgentWriteCursorResult] = [`rev`, eventEditRevision2];
  }
  let writeCursorEntry: Dynamic = writeCursors.get(
    rememberAgentWriteCursor2,
  ) ?? {
    axis: axis,
    at: 0,
    wrote: 0,
  };
  if (writeCursorEntry.axis === axis) {
    writeCursors.delete(rememberAgentWriteCursor2);
    writeCursors.set(rememberAgentWriteCursor2, writeCursorEntry);
    if (writeCursors.size > MAX_WRITE_CURSOR_ENTRIES) {
      writeCursors.delete(writeCursors.keys().next().value);
    }
    if (rememberAgentWriteCursorResult > writeCursorEntry.at) {
      writeCursorEntry.at = rememberAgentWriteCursorResult;
    }
    if (
      rememberAgentWriteCursorResult > writeCursorEntry.wrote &&
      options !== undefined &&
      isAgentWriteToNode(context, dependencies, options)
    ) {
      writeCursorEntry.wrote = rememberAgentWriteCursorResult;
    }
  }
}

function getAgentWriteCursor(
  agentWriteCursor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let writeCursorEntry: Dynamic = writeCursors.get(agentWriteCursor);
  return writeCursorEntry === undefined
    ? {
        axis: null,
        at: 0,
      }
    : {
        axis: writeCursorEntry.axis,
        at: writeCursorEntry.at,
      };
}

function hasAgentWrittenSince(
  agentWrittenSince?: Dynamic,
  activity?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let writeCursorEntry: Dynamic = writeCursors.get(agentWrittenSince);
  return (
    writeCursorEntry !== undefined &&
    (activity.axis === null || activity.axis === writeCursorEntry.axis) &&
    writeCursorEntry.wrote > activity.at
  );
}

function isElementAttachedComment(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let anchor: Dynamic = event.target?.anchor;
  return (
    anchor?.kind === `lfile` &&
    typeof anchor.ref == `string` &&
    anchor.ref.includes(`~el:`)
  );
}

function isWholeDocumentComment(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let anchor: Dynamic = event.target?.anchor;
  return (
    anchor?.kind === `lfile` &&
    typeof anchor.ref == `string` &&
    !anchor.ref.includes(`~el:`) &&
    event.target.quote === undefined &&
    event.target.cells === undefined &&
    event.target.atomAnchor !== true &&
    event.target.anchorDropped !== true
  );
}

function commentAttachmentState(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return isWholeDocumentComment(event)
    ? `page`
    : isElementAttachedComment(event) || context(event.id)
      ? `attached`
      : options === null
        ? event.target.anchorDropped === true
          ? `detached`
          : `pending`
        : options.has(event.id)
          ? `attached`
          : `detached`;
}

function isDetachedResolvedComment(
  detachedResolvedComment?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return detachedResolvedComment.resolved &&
    dependencies.has(detachedResolvedComment.id)
    ? false
    : commentAttachmentState(detachedResolvedComment, options, context) ===
        `detached`;
}

function canDisplayCommentUnanchored(
  displayCommentUnanchored?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentAttachmentState2 = commentAttachmentState(
    displayCommentUnanchored,
    options,
    context,
  );
  return (
    commentAttachmentState2 === `page` || commentAttachmentState2 === `detached`
  );
}

function hasAttachedComment(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.some(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      commentAttachmentState(item, options, context) !== `detached`,
  );
}

function resolveCommentNotificationsCommentMode(
  commentNotificationsCommentMode?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    commentNotificationsCommentMode.commentMode === `list` &&
    !commentNotificationsCommentMode.collapsed
  );
}

function resolveCommentNotificationsIconsOn(
  commentNotificationsIconsOn?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    iconsOn:
      commentNotificationsIconsOn.collapsed &&
      commentNotificationsIconsOn.commentMode !== `hidden` &&
      commentNotificationsIconsOn.railSeated &&
      !commentNotificationsIconsOn.phone,
    iconLane: !commentNotificationsIconsOn.phone,
  };
}

var CLAUDE_REPLIED_MESSAGE: string;

var CommentNotifications_Open: string;

var CommentNotifications_ThatCommentIsNoLongerAvailable: string;

var CommentNotifications_ClaudeReplied2: string;

var commentNotificationsLimit642: number;

function resolveCommentNotificationsPush(
  commentNotificationsPush?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveCommentNotificationsPushResult of heldThreads(
    commentNotificationsPush,
  ) as Dynamic)
    if (resolveCommentNotificationsPushResult.id === options) {
      items.push(resolveCommentNotificationsPushResult);
    }
  return items;
}

function resolveCommentNotificationsSome2(
  commentNotificationsSome2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentNotificationsPush: Dynamic = resolveCommentNotificationsPush(
    commentNotificationsSome2,
    options,
  );
  let commentNotificationsPushItem: Dynamic = commentNotificationsPush[0];
  if (commentNotificationsPushItem === undefined) return `seated`;
  if (
    commentNotificationsPush.some(
      (
        commentNotificationsPush2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => commentNotificationsPush2.resolved,
    ) ||
    commentNotificationsSome2.resolvedIds.has(options)
  ) {
    let resolvedBy: Dynamic = commentNotificationsPush.find(
      (commentNotificationsPush2?: Dynamic, ..._extraArguments: unknown[]) =>
        commentNotificationsPush2.resolvedBy !== undefined,
    )?.resolvedBy;
    return resolvedBy === undefined
      ? `unknown`
      : resolvedBy.actor.startsWith(`agent`)
        ? `gone`
        : `closed`;
  }
  return commentNotificationsSome2.present === null
    ? `seated`
    : commentAttachmentState(
          commentNotificationsPushItem,
          commentNotificationsSome2.present,
          (
            commentNotificationsSome22?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            commentNotificationsSome22 in commentNotificationsSome2.optimisticY,
        ) === `detached`
      ? `gone`
      : `seated`;
}

var CommentNotificationsThreadId: Dynamic;

function resolveCommentNotificationsListFilter(
  commentNotificationsListFilter?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let listFilter: Dynamic = CommentNotificationsThreadId.getState().listFilter;
  return (
    listFilter === `all` ||
    listFilter === (commentNotificationsListFilter ? `resolved` : `open`)
  );
}

function resolveCommentNotificationsRaise(
  commentNotificationsRaise?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    resolveCommentNotificationsPush(
      useCommentStore.getState(),
      commentNotificationsRaise,
    ).length === 0
  ) {
    options.raise(CommentNotifications_ThatCommentIsNoLongerAvailable, {
      id: CommentNotifications_ClaudeReplied2,
    });
    return;
  }
  let detail: Dynamic = context?.detail;
  options.openList(typeof detail == `number` ? detail === 0 : undefined);
  CommentNotificationsThreadId.getState().ask(commentNotificationsRaise);
}

function notifyClaudeReplied(
  notifyClaudeReplied2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let record: Dynamic = {
    raise: toast,
    ...options,
  };
  record.raise(CLAUDE_REPLIED_MESSAGE, {
    id: CommentNotifications_ClaudeReplied2,
    action: {
      label: CommentNotifications_Open,
      onClick: (
        notifyClaudeReplied3?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        resolveCommentNotificationsRaise(
          notifyClaudeReplied2,
          record,
          notifyClaudeReplied3,
        ),
    },
  });
}

function updateCommentNotificationsRaise(
  updateCommentNotificationsRaise2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {
    raise: toast,
    ...updateCommentNotificationsRaise2,
  };
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let next = (
    updateCommentNotificationsRaise3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updateCommentNotificationsRaise3.size > commentNotificationsLimit642) {
      updateCommentNotificationsRaise3.delete(
        updateCommentNotificationsRaise3.keys().next().value,
      );
    }
  };
  let raise = (
    updateCommentNotificationsRaise3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let [
      updateCommentNotificationsRaiseResult,
      updateCommentNotificationsRaiseResult2,
    ] of lookup as Dynamic) {
      let commentNotificationsPushItem: Dynamic =
        resolveCommentNotificationsPush(
          updateCommentNotificationsRaise3,
          updateCommentNotificationsRaiseResult,
        )[0];
      if (
        !(
          commentNotificationsPushItem === undefined ||
          filterDataModelSchemasFilter3(commentNotificationsPushItem) <=
            updateCommentNotificationsRaiseResult2
        )
      ) {
        lookup.delete(updateCommentNotificationsRaiseResult);
        uniqueItems.add(updateCommentNotificationsRaiseResult);
        next(uniqueItems);
      }
    }
    for (let updateCommentNotificationsRaiseResult of uniqueItems as Dynamic) {
      let commentNotificationsSome2 = resolveCommentNotificationsSome2(
        updateCommentNotificationsRaise3,
        updateCommentNotificationsRaiseResult,
      );
      if (
        !(
          commentNotificationsSome2 === `seated` ||
          commentNotificationsSome2 === `unknown`
        )
      ) {
        uniqueItems.delete(updateCommentNotificationsRaiseResult);
        if (commentNotificationsSome2 !== `closed`) {
          if (
            !resolveCommentNotificationsListFilter(
              updateCommentNotificationsRaise3.resolvedIds.has(
                updateCommentNotificationsRaiseResult,
              ) ||
                resolveCommentNotificationsPush(
                  updateCommentNotificationsRaise3,
                  updateCommentNotificationsRaiseResult,
                ).some(
                  (
                    commentNotificationsPush?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => commentNotificationsPush.resolved,
                ),
            )
          ) {
            record.raise(CLAUDE_REPLIED_MESSAGE, {
              id: CommentNotifications_ClaudeReplied2,
              action: {
                label: CommentNotifications_Open,
                onClick: (
                  updateCommentNotificationsRaise4?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  resolveCommentNotificationsRaise(
                    updateCommentNotificationsRaiseResult,
                    record,
                    updateCommentNotificationsRaise4,
                  ),
              },
            });
          }
        }
      }
    }
  };
  let subscribe: Dynamic = DataModelSchemasPending.subscribe(
    (
      updateCommentNotificationsRaise3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let [
        updateCommentNotificationsRaiseResult,
        updateCommentNotificationsRaiseResult2,
      ] of Object.entries(updateCommentNotificationsRaise3.pending) as Dynamic)
        if (
          options.pending[updateCommentNotificationsRaiseResult] !==
          updateCommentNotificationsRaiseResult2
        ) {
          lookup.delete(updateCommentNotificationsRaiseResult);
          lookup.set(
            updateCommentNotificationsRaiseResult,
            updateCommentNotificationsRaiseResult2.agentRows,
          );
          next(lookup);
          uniqueItems.delete(updateCommentNotificationsRaiseResult);
        }
      let summonNotes: Dynamic = useCommentStore.getState().summonNotes;
      for (let updateCommentNotificationsRaiseResult of Object.keys(
        options.pending,
      ) as Dynamic)
        if (
          !Object.hasOwn(
            updateCommentNotificationsRaise3.pending,
            updateCommentNotificationsRaiseResult,
          ) &&
          resolveDataModelSchemasSent(
            summonNotes[updateCommentNotificationsRaiseResult],
          )
        ) {
          lookup.delete(updateCommentNotificationsRaiseResult);
        }
    },
  );
  let subscribe2: Dynamic = useCommentStore.subscribe(
    (
      updateCommentNotificationsRaise3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        options.present !== null &&
        updateCommentNotificationsRaise3.present === null
      ) {
        uniqueItems.clear();
      }
      if (!(lookup.size === 0 && uniqueItems.size === 0)) {
        if (
          !(
            updateCommentNotificationsRaise3.byPage === options.byPage &&
            updateCommentNotificationsRaise3.allByPage === options.allByPage &&
            updateCommentNotificationsRaise3.resolvedIds ===
              options.resolvedIds &&
            updateCommentNotificationsRaise3.present === options.present
          )
        ) {
          raise(updateCommentNotificationsRaise3);
        }
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    subscribe();
    subscribe2();
    lookup.clear();
    uniqueItems.clear();
    toast.dismiss(CommentNotifications_ClaudeReplied2);
    CommentNotificationsThreadId.getState().done();
  };
}

function useCommentNotificationsMode(
  commentNotificationsMode?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let CommentNotificationsThreadId2: Dynamic = CommentNotificationsThreadId(
    (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ask.threadId,
  );
  let {
    mode: commentNotificationsMode2,
    filter: commentNotificationsMode3,
    showAll: commentNotificationsMode4,
  }: Dynamic = commentNotificationsMode;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      CommentNotificationsThreadId.getState().setListFilter(
        commentNotificationsMode2 === `list` ? commentNotificationsMode3 : null,
      ),
      (..._extraArguments: unknown[]): Dynamic =>
        CommentNotificationsThreadId.getState().setListFilter(null)
    ),
    [commentNotificationsMode2, commentNotificationsMode3],
  );
  let [
    useCommentNotificationsModeState,
    setUseCommentNotificationsModeState,
  ]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        CommentNotificationsThreadId2 === null ||
        commentNotificationsMode2 !== `list` ||
        (commentNotificationsMode4(), commentNotificationsMode3 !== `all`)
      )
        return;
      CommentNotificationsThreadId.getState().done();
      let storeState: Dynamic = useCommentStore.getState();
      storeState.setFocus(CommentNotificationsThreadId2);
      storeState.setActive(CommentNotificationsThreadId2);
      setUseCommentNotificationsModeState(CommentNotificationsThreadId2);
    },
    [
      CommentNotificationsThreadId2,
      commentNotificationsMode2,
      commentNotificationsMode3,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (useCommentNotificationsModeState !== null) {
        setUseCommentNotificationsModeState(null);
        for (let useCommentNotificationsModeResult of document.querySelectorAll(
          `[data-testid="ldoc-comments"] [data-thread-id]`,
        ) as Dynamic)
          if (
            useCommentNotificationsModeResult.dataset.threadId ===
            useCommentNotificationsModeState
          ) {
            useCommentNotificationsModeResult.scrollIntoView?.({
              block: `nearest`,
            });
          }
      }
    },
    [useCommentNotificationsModeState],
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentNotificationsCreateCommentNoticeCoordinatorStep1(): void {
  (CLAUDE_WRITING_OUTCOME_MESSAGES = {
    finished: `Claude finished writing.`,
    stopped: `Stopped. What Claude wrote so far is kept.`,
    stopped_early: `Stopped. Your request is still in the document. Press Enter at the end of it to ask again.`,
    gone: `Claude stopped. The line it was working on was changed or removed.`,
    undone: `Removed Claude's text that nobody changed or commented on. Your request is back. Press Enter at its end to ask again.`,
  });
  (CLAUDE_ASKED_WAITING_MESSAGE = `Asked Claude. Press Escape to stop waiting.`);
  (CLAUDE_WAITING_FOR_ANSWER_MESSAGE = `Claude is waiting for your answer in your session.`);
  (CLAUDE_REQUEST_STOP_MESSAGES = {
    stopped_early: `Stopped. Your request is back in the box.`,
    stopped_waiting: `Claude may finish anyway. Your request is still here.`,
    undone: `Removed Claude's text that nobody changed or commented on. Your request is back in the box.`,
    withdrawn: `Claude declined this request and removed what it had written. Lines someone changed or commented on were kept. Your request is back in the box.`,
  });
  (CLAUDE_WRITE_UNAVAILABLE_MESSAGE = `Claude can’t write in this document right now. Copy your request if you want to keep it.`);
  (CLAUDE_COMMENT_FALLBACK_MESSAGE = `Claude can’t write here. Press Enter in your request to ask Claude in a comment others can see.`);
  (CLAUDE_REQUEST_UNSENDABLE_MESSAGE = `This request can’t be sent from here. Copy it to keep it.`);
  (CLAUDE_REQUEST_REFUSAL_MESSAGES = {
    refused: `Claude declined this request. Your request is still in the document. Edit your request, then press Enter at its end to try again.`,
    withdrawn: `Claude declined this request and removed what it had written. Lines someone changed or commented on were kept. Your request is back in the document: edit it, then press Enter at its end to try again.`,
    failed_closed: `Claude can’t write directly in this document. Your request is still in the document. To ask another way, type @ and pick Claude.`,
    failed: `Claude couldn’t start writing. Your request is still in the document. Press Enter at the end of it to try again.`,
    failed_partway: `Claude couldn’t finish writing. What it wrote so far is kept.`,
  });
  (CLAUDE_COMMENT_WAITING_MESSAGES = {
    taken: `Claude has your request. You can ask on another line.`,
    nothing: `No answer from Claude on one of your requests yet. That request is in the comments.`,
    nothing_needs_you: `Claude is waiting for your answer in your session. Your request is in the comments.`,
    failed: `Claude didn’t finish one of your requests. Part of an answer may be in the document. That request is in the comments.`,
    dismissed: `Claude may finish this request anyway.`,
    removed_by_you: `You removed the line for one of your requests. Claude may finish anyway. That request is in the comments.`,
    removed_by_someone: `Someone removed the line for one of your requests. Claude may finish anyway. That request is in the comments.`,
  });
  (ASK_NOTICE_TIMEOUT_MS = 1e4);
  (ASK_NOTICE_HOLD_MS = 4e3);
  (MAX_ASK_NOTICE_RETRIES = 40);
  (INLINE_ASK_TOAST_ID = `inline-ask`);
  (ASK_LINE_REMOVED_MESSAGE = `That line was removed — copy your text, or close this and pick @Agent again.`);
  (ASK_DOCUMENT_CHANGED_MESSAGE = `The document changed under this — copy your text, or close this and type @Agent in the document.`);
  (COMMENT_DRAFT_BLOCKING_MESSAGE = `Finish or discard the comment you're writing first.`);
  (CLAUDE_BUSY_MESSAGE = `Claude is busy with an earlier request. Ask again once that request is done.`);
  (CLAUDE_BUSY_REQUEST_KEPT_MESSAGE = `Claude is busy with an earlier request, so what you typed stays in the document as text. Ask again once that request is done.`);
  (CLAUDE_LINE_ALREADY_BUSY_MESSAGE = `Claude already has a request on this line. You can ask on another line.`);
  (claudeBusyMessage = (
    claudeBusyMessage2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options === true
      ? CLAUDE_LINE_ALREADY_BUSY_MESSAGE
      : claudeBusyMessage2 === true
        ? CLAUDE_BUSY_REQUEST_KEPT_MESSAGE
        : CLAUDE_BUSY_MESSAGE);
  (commentSessionFeatureCached = false);
  (isCommentSessionFeatureDisabled = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (commentSessionFeatureCached ||=
      resolvePlatformFeatureFlagsEnabled2(`petrelSchist`)));
  PlatformFeatureFlagsState5((..._extraArguments: unknown[]): undefined => {
    try {
      isCommentSessionFeatureDisabled();
    } catch {}
  });
  (initialAskCardRecoveryState = (..._extraArguments: unknown[]) => ({
    flipped: false,
    owes: false,
    lives: false,
    was: undefined,
    judged: false,
    back: false,
    lost: false,
  }));
  (hasAskCardRecoveryContent = (
    request?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    request.card ||
    request.sending ||
    request.inHand ||
    request.run ||
    request.kept);
  (askCardRecoveryPreviousNotice = (
    cardRecoveryPreviousNotice?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options ??
    (isAskCardRecoveryAlive(cardRecoveryPreviousNotice, context.alive) &&
    !context.barred
      ? cardRecoveryPreviousNotice.was
      : undefined));
  (hasAskCardRecoveryGone = (
    askCardRecoveryGone?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => options && !isAskCardRecoveryAlive(askCardRecoveryGone, context));
  (askCardRecoverySendMessage = (
    cardRecoverySendMessage?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options === `turn`
      ? CLAUDE_COMMENT_FALLBACK_MESSAGE
      : cardRecoverySendMessage.lost
        ? CLAUDE_REQUEST_UNSENDABLE_MESSAGE
        : CLAUDE_WRITE_UNAVAILABLE_MESSAGE);
  (sessionRouteModule = null);
  (sessionRouteModuleFailed = false);
  (sessionRouteModulePromise = null);
  (loadSessionRouteModule = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic => import("../../assistant/session-route-side"),
      mapPreloadDependencies([21, 0, 1, 2, 3, 10]),
      import.meta.url,
    ));
  (getSessionRouteModule = (..._extraArguments: unknown[]): Dynamic =>
    sessionRouteModule);
  (MAX_WRITE_CURSOR_ENTRIES = 64);
  (writeCursors = new (Map as Dynamic)());
  (CLAUDE_REPLIED_MESSAGE = `Claude replied`);
  (CommentNotifications_Open = `Open`);
  (CommentNotifications_ThatCommentIsNoLongerAvailable = `That comment is no longer available.`);
  (CommentNotifications_ClaudeReplied2 = `claude-replied`);
  (commentNotificationsLimit642 = 64);
  (CommentNotificationsThreadId = create(
    (
      commentNotificationsThreadId?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      threadId: null,
      listFilter: null,
      ask: (threadId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        commentNotificationsThreadId({
          threadId: threadId,
        }),
      done: (..._extraArguments: unknown[]): Dynamic =>
        commentNotificationsThreadId(
          (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            ask.threadId === null
              ? ask
              : {
                  threadId: null,
                },
        ),
      setListFilter: (
        listFilter?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        commentNotificationsThreadId(
          (
            commentNotificationsThreadId2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            commentNotificationsThreadId2.listFilter === listFilter
              ? commentNotificationsThreadId2
              : {
                  listFilter: listFilter,
                },
        ),
    }),
  ));
}

export {
  CLAUDE_ASKED_WAITING_MESSAGE,
  CLAUDE_COMMENT_WAITING_MESSAGES,
  CLAUDE_REPLIED_MESSAGE,
  CLAUDE_REQUEST_REFUSAL_MESSAGES,
  CLAUDE_REQUEST_STOP_MESSAGES,
  CLAUDE_WAITING_FOR_ANSWER_MESSAGE,
  CLAUDE_WRITE_UNAVAILABLE_MESSAGE,
  CLAUDE_WRITING_OUTCOME_MESSAGES,
  COMMENT_DRAFT_BLOCKING_MESSAGE,
  CollaboratorAvatar,
  INLINE_ASK_TOAST_ID,
  askCardRecoveryDisposition,
  askCardRecoveryLostMessage,
  askCardRecoveryOffer,
  askCardRecoveryPreviousNotice,
  askCardRecoverySendDisposition,
  askCardRecoverySendMessage,
  askCardWriteUnavailableMessage,
  canDisplayCommentUnanchored,
  clampPopoverArrow,
  claudeBusyMessage,
  commentAttachmentState,
  createCommentNoticeCoordinator,
  ensureSessionRouteModule,
  flipAskCardRecovery,
  getAgentWriteCursor,
  getSessionRouteModule,
  hasAgentWrittenSince,
  hasAskCardRecoveryContent,
  hasAskCardRecoveryGone,
  hasAttachedComment,
  hasMintedContent,
  initialAskCardRecoveryState,
  isAskCardRecoveryAlive,
  isCommentSessionFeatureDisabled,
  isDetachedResolvedComment,
  isElementAttachedComment,
  isWholeDocumentComment,
  markAskCardLoweringDebt,
  notifyClaudeReplied,
  rememberAgentWriteCursor,
  resolveCommentNotificationsCommentMode,
  resolveCommentNotificationsIconsOn,
  shouldReleaseGoneAskCard,
  takeAskCardLoweringDebt,
  updateCommentNotificationsRaise,
  useCommentNotificationsMode,
};

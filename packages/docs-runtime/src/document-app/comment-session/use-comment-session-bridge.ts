/** BaoCut: comment session from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  capsSettled,
  clearCommentsActionsAndSelectionDelete2,
  clearPlatformLoadingAndStatusDelete,
  commentSummonHost,
  filterDataModelSchemasFilter3,
  frameResolveCommentThread,
  frameSendCommentToClaude,
  frameSendToClaudeVerdict,
  frameSendToClaudeVerdictAtPress,
  heldThreads,
  landedSummon,
  loadCommentsEditorNow,
  loadDataModelSchemasKind,
  loadDataModelSchemasResolve,
  parkedSummons,
  platformSessionAndSourcesSet6,
  reportOperationEvent,
  resolveDataModelSchemasLeft2,
  resolveDataModelSchemasResolve,
  resolveDataModelSchemasSummon,
  resolveDataModelSchemasValue33,
  resolveDataModelSchemasValue7,
  resolveDataModelSchemasValue8,
  resolveObservabilityBrowserAndOperationEventsValue18,
  resolvePlatformSessionAndSourcesConsentRequired,
  summonAskAcked,
  summonAskSettled,
  summonAsked,
  updateDataModelSchemasSentAs,
  updatePlatformFrameAndCapabilitiesCbs,
  useCommentStore,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  getSessionRouteModule,
  updateCommentNotificationsRaise,
} from "../comment-notifications/create-comment-notice-coordinator";
import {
  CommentNotificationsTickMs,
  installCommentNotificationsVisibilityState,
  updateCommentNotificationsSet,
} from "../comment-notifications/state";
import {
  CommentSessionState13,
  clearCommentSessionDelete3,
  clearCommentSessionEnd,
  clearCommentSessionSubscribe,
  clearCommentSessionThreadId,
  getCommentSessionCancel,
  isCommentSessionAcked,
  isCommentSessionFilter,
  resolveCommentSessionFailed,
  resolveCommentSessionFrom,
  resolveCommentSessionFrom3,
  resolveCommentSessionLanded,
  resolveCommentSessionNow,
  resolveCommentSessionReason,
  resolveCommentSessionShell,
  resolveCommentSessionSource,
  resolveCommentSessionSubscribe,
  resolveCommentSessionValue4,
  resolveCommentSessionValue6,
  resolveCommentSessionValues,
  resolveCommentSessionValues2,
  resolveCommentSessionVia,
  updateCommentSessionFile,
  updateCommentSessionQuiet,
  updateCommentSessionQuiet2,
  updateCommentSessionState,
  updateCommentSessionTake,
} from "./clear-comment-session-thread-id";
import {
  CommentSessionState14,
  clearCommentSessionKey,
  clearCommentSessionSize,
  commentSessionLimit2564,
  commentSessionMap11,
  commentSessionMap9,
  getCommentSessionWaited,
  getCommentSessionWaited2,
  loadCommentSessionCanSend,
  resolveCommentSessionSubscribe2,
  updateCommentSessionCarrier,
  updateCommentSessionSince2,
} from "./ask-suggestions-measure";

var CommentNotificationsResolve: Dynamic;

var CommentNotificationsState5: boolean;

var commentNotificationsLimit0: Dynamic;

var CommentSessionState: Dynamic;

var resolveCommentSessionValue7: (..._extraArguments: unknown[]) => undefined;

function useCommentSessionBridge(
  commentSessionBridge?: Dynamic,
  ref?: Dynamic,
  ref2?: Dynamic,
  ref3?: Dynamic,
  ref4?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      // BaoCut: 原版只在 Frame 里接上「批注发给 Claude」；独立页面装了 docsHost.comments 时也接上（docs-host.ts）。
      if (!commentSummonHost()) return;
      let enabled = false;
      parkedSummons.arm();
      let useCommentSessionBridgeHandler: Dynamic = (
        commentSessionBridge2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        commentSessionBridge2.file !== undefined &&
        argument != null &&
        commentSessionBridge2.file !== argument;
      let useCommentSessionBridgeResult: Dynamic = null;
      let useCommentSessionBridgeResult2: Dynamic = null;
      let label: string = CommentNotificationsState5 ? `off` : `unknown`;
      let useCommentSessionBridgeResult3: Dynamic = null;
      let resolveCommentSessionReason2 = (
        commentSessionBridge2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (commentSessionBridge2 !== `unknown`) {
          if (commentSessionBridge2 === `available`) {
            useCommentSessionBridgeResult3 = null;
            return;
          }
          if (commentSessionBridge2 !== useCommentSessionBridgeResult3) {
            useCommentSessionBridgeResult3 = commentSessionBridge2;
            resolveCommentSessionReason(commentSessionBridge2);
          }
        }
      };
      resolveDataModelSchemasValue33(
        (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let summonNoteItem: Dynamic =
            useCommentStore.getState().summonNotes[commentSessionBridge2];
          if (
            summonNoteItem === `needs_user` ||
            (summonNoteItem === `sent` &&
              resolveCommentSessionVia(commentSessionBridge2, `give_up`))
          )
            return;
          let commentSessionValue7 = resolveCommentSessionValue7(
            commentSessionBridge2,
          );
          if (summonNoteItem === `queued` || commentSessionValue7 === `queued`)
            return void updateCommentSessionSince2(
              commentSessionBridge2,
              options,
              `queued`,
            );
          if (commentSessionValue7 === `working`)
            return void updateCommentSessionSince2(
              commentSessionBridge2,
              options,
              `working`,
            );
          if (
            getCommentSessionWaited2(commentSessionBridge2) &&
            updateCommentSessionSince2(commentSessionBridge2, options, `taken`)
          )
            return;
          let since: Dynamic = commentSessionMap11.get(
            commentSessionBridge2,
          )?.since;
          resolveCommentSessionSource(`no_reply`, `pending`, {
            ms: options,
            heldMs:
              since === undefined
                ? options
                : Math.max(options, Date.now() - since),
            hold: since === undefined ? `bare` : `held`,
          });
          resolveCommentSessionFailed(commentSessionBridge2, `no_reply`);
          clearCommentSessionEnd(commentSessionBridge2, `gave_up`);
        },
      );
      useCommentStore.setState({
        summonFile: argument ?? null,
        frameSummonDark: (ask?: Dynamic, ..._extraArguments: unknown[]) => {
          if (ask.left === true)
            return updateCommentSessionQuiet(ask.threadId, `replay`);
          if (
            useCommentSessionBridgeHandler(ask) ||
            (ask.owed === true && !enabled2)
          )
            return void parkedSummons.park(ask, Date.now());
          if (ask.owed === true && useCommentSessionBridgeResult !== null)
            return createOwedSummons2(ask);
          let useCommentSessionBridgeResult8: Dynamic =
            resolveDataModelSchemasValue8(ask, label);
          if (useCommentSessionBridgeResult8 === null) return;
          let useCommentSessionBridgeResult9: Dynamic =
            useCommentSessionBridgeResult2;
          if (
            CommentNotificationsState5 ||
            useCommentSessionBridgeResult9 === null
          ) {
            clearCommentSessionThreadId(
              ask.threadId,
              useCommentSessionBridgeResult8,
              `dark`,
            );
            return;
          }
          clearCommentSessionThreadId(
            ask.threadId,
            useCommentSessionBridgeResult8,
            `dark`,
            {
              quiet: true,
            },
          );
          resolveCommentSessionValue6(ask.threadId);
          resolveCommentSessionLanded(ask);
          loadCommentSessionCanSend(
            ask,
            useCommentSessionBridgeResult8,
            (..._extraArguments: unknown[]): Dynamic =>
              useCommentSessionBridgeResult9.ask(),
            (
              commentSessionBridge2?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              loadDataModelSchemasKind(
                {
                  ...record2,
                  ...commentSessionBridge2,
                },
                options,
              ),
            {
              note: (
                commentSessionBridge2?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ) => note(commentSessionBridge2, options),
              pinDark: (
                commentSessionBridge2?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                clearCommentSessionThreadId(
                  commentSessionBridge2,
                  options,
                  `dark`,
                  {
                    quiet: true,
                  },
                ),
              say: (
                threadId?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                resolveCommentSessionSource(options, `dark`, {
                  threadId: threadId,
                }),
              arm: resolveCommentSessionNow,
            },
          );
        },
      });
      let useCommentSessionBridgeHandler2 = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let useCommentSessionBridgeHandler3 = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let promise: Dynamic = new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          useCommentSessionBridgeHandler3 = resolve;
        },
      );
      let CommentNotificationsResolve2: Dynamic = CommentNotificationsResolve;
      CommentNotificationsResolve = promise;
      document.body.setAttribute(`data-uncommentable`, ``);
      let useCommentSessionBridgeResult4: Dynamic =
        updatePlatformFrameAndCapabilitiesCbs(
          (bid?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            commentSessionBridge({
              type: `reveal-block`,
              bid: bid,
            }),
          updateCommentNotificationsSet(),
        );
      let useCommentSessionBridgeResult5: Dynamic =
        updateDataModelSchemasSentAs({
          state: (
            commentSessionBridge2?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            commentSessionMap9.delete(commentSessionBridge2);
            if (context !== undefined) {
              commentSessionMap9.set(commentSessionBridge2, context);
            }
            if (commentSessionMap9.size > commentSessionLimit2564) {
              commentSessionMap9.delete(commentSessionMap9.keys().next().value);
            }
            getCommentSessionWaited(commentSessionBridge2, options);
            if (platformSessionAndSourcesSet6.has(options)) {
              summonAskSettled(commentSessionBridge2);
            }
            try {
              CommentSessionState14?.(commentSessionBridge2, options);
            } catch {}
          },
          said: updateCommentSessionState,
          note: updateCommentSessionQuiet2,
          open: (
            commentSessionBridge2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            useCommentStore
              .getState()
              .setSummonOpen(
                commentSessionBridge2,
                options !== null &&
                  typeof CommentSessionState?.openClaude == `function`
                  ? options
                  : null,
              ),
        });
      resolveCommentSessionValue7 = useCommentSessionBridgeResult5.last;
      let useCommentSessionBridgeResult6: Dynamic = loadDataModelSchemasResolve(
        {
          resolve: (
            commentSessionBridge2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => frameResolveCommentThread(commentSessionBridge2),
          live: (
            commentSessionBridge2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveDataModelSchemasValue7(
              useCommentSessionBridgeResult5.carrier(commentSessionBridge2),
            ),
          whenAnswered: clearPlatformLoadingAndStatusDelete,
          trace: (
            step?: Dynamic,
            waiting?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            reportOperationEvent(`summon.tidy`, {
              step: step,
              waiting: waiting,
            }),
        },
      );
      let record: Dynamic = {
        ...useCommentSessionBridgeResult4.cbs,
        mode: resolveCommentSessionValue4(
          `mode`,
          useCommentSessionBridgeResult4.cbs.mode,
        ),
        threads: resolveCommentSessionValue4(
          `threads`,
          useCommentSessionBridgeResult4.cbs.threads,
        ),
        reveal: resolveCommentSessionValue4(
          `reveal`,
          useCommentSessionBridgeResult4.cbs.reveal,
        ),
        claude: (
          commentSessionBridge2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          resolveCommentSessionFrom3(`claude`);
          if (
            typeof commentSessionBridge2 == `object` &&
            commentSessionBridge2 &&
            commentSessionBridge2.state === `working`
          ) {
            CommentSessionState13.reset();
          }
          if (
            typeof commentSessionBridge2 == `object` &&
            commentSessionBridge2
          ) {
            resolveCommentSessionShell(commentSessionBridge2.shell);
          }
          if (
            typeof commentSessionBridge2 == `object` &&
            commentSessionBridge2 &&
            typeof commentSessionBridge2.id == `string` &&
            typeof commentSessionBridge2.state == `string`
          ) {
            clearCommentSessionSize(
              commentSessionBridge2.id,
              commentSessionBridge2.state,
            );
          }
          useCommentSessionBridgeResult5.heard(commentSessionBridge2);
        },
      };
      let getBoundingClientRect: Dynamic = (
        commentSessionBridge2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        dependencies?: Dynamic,
        argument2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveDataModelSchemasLeft2(
          commentSessionBridge2,
          options,
          useCommentStore.getState(),
          {
            docRef: ref2.current,
            frameBox: ref.current?.getBoundingClientRect() ?? null,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            known: ref3.current,
            host: ref4.current,
          },
          context,
          dependencies,
          argument2,
        );
      let clearCommentSessionKey2: Dynamic = clearCommentSessionKey();
      let updateCommentNotificationsRaise2: Dynamic =
        updateCommentNotificationsRaise({
          openList: (
            commentSessionBridge2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            updateCommentNotificationsSet().set(true, commentSessionBridge2),
        });
      let commentSessionSubscribe2: Dynamic = resolveCommentSessionSubscribe2();
      let clearCommentSessionSubscribe2: Dynamic =
        clearCommentSessionSubscribe();
      let commentSessionSubscribe: Dynamic = resolveCommentSessionSubscribe();
      let note = (
        commentSessionBridge2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        clearCommentSessionThreadId(commentSessionBridge2, options, `runner`);
        if (enabled) {
          getCommentSessionCancel(commentSessionBridge2);
        }
      };
      let record2: Dynamic = {
        canSend: (..._extraArguments: unknown[]): Dynamic =>
          useCommentSessionBridgeResult2
            ? useCommentSessionBridgeResult2.ask()
            : frameSendToClaudeVerdict(),
        anchorOf: (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          context?: Dynamic,
          dependencies?: Dynamic,
          argument2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          resolveDataModelSchemasResolve(
            (..._extraArguments: unknown[]): Dynamic =>
              enabled
                ? null
                : getBoundingClientRect(
                    commentSessionBridge2,
                    options,
                    context,
                    dependencies,
                    argument2,
                  ),
            (
              commentSessionBridge3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let subscribe: Dynamic = useCommentStore.subscribe(
                commentSessionBridge3,
              );
              let useCommentSessionBridgeResult8: Dynamic =
                clearCommentsActionsAndSelectionDelete2(commentSessionBridge3);
              let setInterval2 = setInterval(
                (..._extraArguments: unknown[]): undefined => {
                  if (enabled) {
                    clearInterval(setInterval2);
                  } else {
                    commentSessionBridge3();
                  }
                },
                CommentNotificationsTickMs.tickMs,
              );
              return (..._extraArguments: unknown[]): undefined => {
                subscribe();
                useCommentSessionBridgeResult8();
                clearInterval(setInterval2);
              };
            },
            (
              commentSessionBridge3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let setTimeout2 = setTimeout(
                commentSessionBridge3,
                CommentNotificationsTickMs.ms,
              );
              return (..._extraArguments: unknown[]) =>
                clearTimeout(setTimeout2);
            },
          ),
        asked: (
          commentSessionBridge2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let count = 0;
          for (let useCommentSessionBridgeResult8 of heldThreads(
            useCommentStore.getState(),
          ) as Dynamic)
            if (useCommentSessionBridgeResult8.id === commentSessionBridge2) {
              count = Math.max(
                count,
                filterDataModelSchemasFilter3(useCommentSessionBridgeResult8),
              );
            }
          updateCommentSessionTake(commentSessionBridge2, Date.now());
          summonAsked(commentSessionBridge2, Date.now(), count);
          updateCommentSessionFile(commentSessionBridge2, count, argument);
        },
        send: (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => frameSendCommentToClaude(commentSessionBridge2, options),
        note: note,
        retire: (
          commentSessionBridge2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (commentSessionBridge2 === `no_capability`) {
            commentNotificationsLimit0 += 1;
          }
          if (
            commentSessionBridge2 === `claude_unavailable` ||
            (commentSessionBridge2 === `no_capability` &&
              commentNotificationsLimit0 < 3)
          ) {
            useCommentSessionBridgeResult2?.standDown();
            useCommentSessionBridgeResult2?.soon();
          } else {
            label = `off`;
            resolveCommentSessionReason2(`off`);
            CommentNotificationsState5 = true;
            useCommentSessionBridgeResult2?.retire();
          }
        },
        resolve: (
          commentSessionBridge2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          useCommentSessionBridgeResult6.resolve(commentSessionBridge2),
        sentAs: (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          commentNotificationsLimit0 = 0;
          summonAskAcked(commentSessionBridge2);
          clearCommentSessionDelete3(commentSessionBridge2);
          updateCommentSessionCarrier(commentSessionBridge2, options);
          useCommentSessionBridgeResult5.sentAs(commentSessionBridge2, options);
        },
        wait: (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2 = setTimeout(commentSessionBridge2, options);
          return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
        },
        trace: (
          commentSessionBridge2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ) => reportOperationEvent(`summon.${commentSessionBridge2}`, options),
      };
      let useCommentSessionBridgeResult7: Dynamic = null;
      let createOwedSummons: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (useCommentSessionBridgeResult7 !== null)
          return useCommentSessionBridgeResult7;
        let sessionRouteModule2: Dynamic = getSessionRouteModule();
        return sessionRouteModule2 === null
          ? null
          : (useCommentSessionBridgeResult7 =
              sessionRouteModule2.createOwedSummons({
                attempt: (
                  commentSessionBridge2?: Dynamic,
                  claim?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  loadDataModelSchemasKind(
                    {
                      ...record2,
                      claim: claim,
                    },
                    commentSessionBridge2,
                  ),
                alive: (..._extraArguments: unknown[]) => !enabled,
                repark: (
                  commentSessionBridge2?: Dynamic,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined =>
                  void parkedSummons.park(
                    commentSessionBridge2,
                    Date.now(),
                    options === `exhausted`,
                  ),
                gone: (
                  commentSessionBridge2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  ref3.current !== null &&
                  ref3.current.size > 0 &&
                  commentSessionBridge2.block != null &&
                  !ref3.current.has(commentSessionBridge2.block.bid),
                sayNoAnchor: (ask?: Dynamic, ..._extraArguments: unknown[]) =>
                  note(
                    ask.threadId,
                    resolvePlatformSessionAndSourcesConsentRequired(
                      `no_anchor`,
                    ),
                  ),
                onReady: (
                  commentSessionBridge2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let subscribe: Dynamic = useCommentStore.subscribe(
                    commentSessionBridge2,
                  );
                  let useCommentSessionBridgeResult8: Dynamic =
                    clearCommentsActionsAndSelectionDelete2(
                      commentSessionBridge2,
                    );
                  return (..._extraArguments: unknown[]): Dynamic => (
                    subscribe(),
                    useCommentSessionBridgeResult8()
                  );
                },
                wait: (
                  commentSessionBridge2?: Dynamic,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let setTimeout2 = setTimeout(commentSessionBridge2, options);
                  return (..._extraArguments: unknown[]) =>
                    clearTimeout(setTimeout2);
                },
              }));
      };
      let createOwedSummons2 = (
        commentSessionBridge2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let owedSummons: Dynamic = createOwedSummons();
        if (owedSummons === null) {
          loadDataModelSchemasKind(record2, commentSessionBridge2);
        } else {
          owedSummons.run(commentSessionBridge2);
        }
      };
      let enabled2 = false;
      let onParked: Dynamic = parkedSummons.onParked(
        (ask?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            enabled ||
            !enabled2 ||
            useCommentSessionBridgeResult === null ||
            ask.owed !== true ||
            useCommentSessionBridgeHandler(ask)
          )
            return;
          let takeOwed: Dynamic = parkedSummons.takeOwed(ask.threadId);
          if (takeOwed !== null) {
            createOwedSummons2(takeOwed);
          }
        },
      );
      let useCommentSessionBridgeHandler4 = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let useCommentSessionBridgeHandler5 = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let take = (..._extraArguments: unknown[]): undefined => {
        if (enabled) return;
        useCommentSessionBridgeHandler4();
        useCommentSessionBridgeHandler4 = isCommentSessionAcked();
        useCommentSessionBridgeHandler5();
        useCommentSessionBridgeHandler5 = isCommentSessionFilter();
        enabled2 = true;
        let { send: take2, left: take3 }: Dynamic = parkedSummons.take(
          Date.now(),
          (commentSessionBridge2?: Dynamic, ..._extraArguments: unknown[]) =>
            !useCommentSessionBridgeHandler(commentSessionBridge2),
        );
        for (let ask of take3 as Dynamic)
          updateCommentSessionQuiet(
            ask.threadId,
            ask.left === true ? `replay` : `parked`,
          );
        for (let useCommentSessionBridgeResult8 of take2 as Dynamic)
          if (
            useCommentSessionBridgeResult8.owed === true &&
            useCommentSessionBridgeResult !== null
          ) {
            createOwedSummons2(useCommentSessionBridgeResult8);
          } else {
            landedSummon(useCommentSessionBridgeResult8);
          }
      };
      CommentNotificationsResolve2.then(
        (..._extraArguments: unknown[]): Dynamic =>
          enabled ? null : capsSettled(record),
      ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          result?.release();
          useCommentSessionBridgeHandler3();
          return;
        }
        useCommentSessionBridgeResult = result;
        useCommentStore.setState({
          frameAnchorsLive: result !== null,
        });
        if (result === null) {
          label = `off`;
          resolveCommentSessionReason2(`off`);
          useCommentSessionBridgeHandler3();
          take();
          return;
        }
        CommentSessionState = result;
        resolveCommentSessionFrom();
        useCommentSessionBridgeResult4.attach(result);
        let useCommentSessionBridgeResult8: Dynamic = loadCommentsEditorNow({
          ask: (..._extraArguments: unknown[]): Dynamic =>
            frameSendToClaudeVerdict(),
          pressAsk: (..._extraArguments: unknown[]): Dynamic =>
            frameSendToClaudeVerdictAtPress(
              (why?: Dynamic, ..._extraArguments: unknown[]) =>
                reportOperationEvent(`summon.reask`, {
                  why: why,
                }),
            ),
          apply: (
            commentSessionBridge2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!(enabled || useCommentSessionBridgeResult !== result)) {
              resolveObservabilityBrowserAndOperationEventsValue18(
                commentSessionBridge2,
              );
              useCommentStore.setState({
                frameSummon: commentSessionBridge2
                  ? (
                      ask?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      if (ask.left === true) {
                        updateCommentSessionQuiet(ask.threadId, `replay`);
                      } else {
                        if (useCommentSessionBridgeHandler(ask)) {
                          parkedSummons.park(ask, Date.now());
                        } else {
                          if (ask.owed === true) {
                            createOwedSummons2(ask);
                          } else {
                            if (resolveDataModelSchemasSummon(ask)) {
                              resolveCommentSessionValue6(ask.threadId);
                            }
                            resolveCommentSessionLanded(ask);
                            loadDataModelSchemasKind(record2, ask);
                          }
                        }
                      }
                    }
                  : null,
              });
            }
          },
          wait: (
            commentSessionBridge2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let setTimeout2 = setTimeout(commentSessionBridge2, options);
            return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
          },
          heard: (
            commentSessionBridge2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (commentSessionBridge2 !== `unknown`) {
              label = commentSessionBridge2;
            }
            resolveCommentSessionReason2(commentSessionBridge2);
          },
        });
        useCommentSessionBridgeResult2 = useCommentSessionBridgeResult8;
        if (CommentNotificationsState5) {
          useCommentSessionBridgeResult8.retire();
          take();
          return;
        }
        useCommentSessionBridgeHandler2 =
          installCommentNotificationsVisibilityState(
            useCommentSessionBridgeResult8.soon,
          );
        useCommentSessionBridgeResult8.now();
        take();
      });
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
        onParked();
        useCommentSessionBridgeResult7?.dispose();
        useCommentSessionBridgeResult2?.dispose();
        useCommentSessionBridgeHandler2();
        clearCommentSessionKey2();
        updateCommentNotificationsRaise2();
        commentSessionSubscribe2();
        clearCommentSessionSubscribe2();
        commentSessionSubscribe();
        useCommentSessionBridgeHandler4();
        useCommentSessionBridgeHandler5();
        if (useCommentSessionBridgeResult !== null) {
          if (CommentSessionState === useCommentSessionBridgeResult) {
            CommentSessionState = null;
          }
          useCommentSessionBridgeResult.release();
          useCommentSessionBridgeResult = null;
          useCommentSessionBridgeHandler3();
        }
        useCommentSessionBridgeResult4.dispose();
        useCommentSessionBridgeResult6.dispose();
        useCommentSessionBridgeResult5.reset();
        resolveCommentSessionValues2();
        resolveCommentSessionValues();
        resolveObservabilityBrowserAndOperationEventsValue18(false);
        useCommentStore.setState({
          frameAnchorsLive: false,
          frameSummon: null,
          frameSummonDark: null,
          summonFile: null,
          summonOpen: {},
        });
        document.body.removeAttribute(`data-uncommentable`);
      };
    },
    [ref, ref2, ref3, ref4, commentSessionBridge, argument],
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionUseCommentSessionBridgeStep1(): void {
  (CommentNotificationsResolve = Promise.resolve());
  (CommentNotificationsState5 = false);
  (commentNotificationsLimit0 = 0);
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionUseCommentSessionBridgeStep2(): void {
  (CommentSessionState = null);
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionUseCommentSessionBridgeStep3(): void {
  (resolveCommentSessionValue7 = (..._extraArguments: unknown[]): undefined =>
    undefined);
}

export { CommentSessionState, resolveCommentSessionValue7, useCommentSessionBridge };

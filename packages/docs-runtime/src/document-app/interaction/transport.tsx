/** BaoCut: extracted document interaction transport expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";

export function createDocumentInteractionError213(__documentClosure: Pick<DocumentInteractionContext, "String2" | "resolveDataOperationControlValue11" | "halted" | "retrying" | "haltWords" | "resolvePlatformAnnouncementsToUpperCase" | "quoteRecoveryPreview" | "resolveCommentsStoreAround" | "resolveCommentsStoreLayer" | "resolvePlatformKeyboardAndSaveStatusShow" | "request2" | "resolvePlatformLiveDocumentAndHistoryValue20" | "toast" | "resolveCommentsStoreValue30" | "openDebugReportDialog">): Dynamic {
  return (({ ["error2"]: ((
              reason?: Dynamic,
              detail?: Dynamic,
              context2?: Dynamic,
              quiet: Dynamic = false,
              ..._extraArguments: unknown[]
            ): undefined => {
              let documentElement: Dynamic = (document as Dynamic)
                .documentElement;
              (0, __documentClosure.String2)(reason);
              if (!quiet) {
                (0, __documentClosure.resolveDataOperationControlValue11)(reason);
              }
              try {
                documentElement.dataset.lfileDeniedWords =
                  (__documentClosure.halted || __documentClosure.retrying) &&
                  __documentClosure.haltWords &&
                  reason === `unsupported` &&
                  detail === `not_editable`
                    ? __documentClosure.haltWords
                    : context2
                      ? `${(0, __documentClosure.resolvePlatformAnnouncementsToUpperCase)(reason, detail)} — ${(0, __documentClosure.quoteRecoveryPreview)(context2)}`
                      : (0, __documentClosure.resolvePlatformAnnouncementsToUpperCase)(reason, detail);
                (0, __documentClosure.resolveCommentsStoreAround)({
                  layer: `host`,
                  name: `refusal`,
                  reason: reason,
                  ...(detail === undefined
                    ? {}
                    : {
                        detail: detail,
                      }),
                  words: documentElement.dataset.lfileDeniedWords,
                  ...(quiet
                    ? {
                        quiet: true,
                      }
                    : {}),
                });
                (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `refusal`, {
                  reason: reason,
                  quiet: quiet,
                });
                if (quiet) return;
                let useDocumentInteractionOverlaysResult47: Dynamic =
                  (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusShow)(
                    __documentClosure.request2,
                    documentElement.dataset.lfileDeniedWords,
                    Date.now(),
                  );
                __documentClosure.request2 = useDocumentInteractionOverlaysResult47.last;
                if (useDocumentInteractionOverlaysResult47.show) {
                  (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryValue20)(reason, detail);
                }
                if (useDocumentInteractionOverlaysResult47.show) {
                  __documentClosure.toast.error(documentElement.dataset.lfileDeniedWords, {
                    id: `prose-refused`,
                    duration: 8e3,
                    ...((0, __documentClosure.resolveCommentsStoreValue30)()
                      ? {
                          action: {
                            label: `Copy debug report`,
                            onClick: __documentClosure.openDebugReportDialog,
                          },
                        }
                      : {}),
                  });
                }
              } catch {
                documentElement.dataset.lfileDeniedWords = `!toast-failed`;
              }
            }) })["error2"]);
}

export function createDocumentInteractionString314(__documentClosure: Pick<DocumentInteractionContext, "useDocumentInteractionOverlaysResult31" | "resolveCommentsStoreLayer" | "linkSaving" | "linkUnsaved" | "setSave">): Dynamic {
  return (({ ["String3"]: ((
              word2?: Dynamic,
              pending?: Dynamic,
              named?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (word2 !== __documentClosure.useDocumentInteractionOverlaysResult31) {
                __documentClosure.useDocumentInteractionOverlaysResult31 = word2;
                (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `save`, {
                  word: word2,
                  pending: pending,
                  linkSaving: __documentClosure.linkSaving,
                  linkUnsaved: __documentClosure.linkUnsaved,
                });
              }
              (0, __documentClosure.setSave)(
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  documentInteractionOverlays &&
                  documentInteractionOverlays.word === word2 &&
                  documentInteractionOverlays.pending === pending &&
                  documentInteractionOverlays.named === named
                    ? documentInteractionOverlays
                    : {
                        word: word2,
                        pending: pending,
                        ...(named
                          ? {
                              named: named,
                            }
                          : {}),
                      },
              );
              let documentElement: Dynamic = (document as Dynamic)
                .documentElement;
              documentElement.dataset.lfileSave = word2;
              documentElement.dataset.lfilePending = String(pending);
            }) })["String3"]);
}

export function createDocumentInteractionReport215(__documentClosure: Pick<DocumentInteractionContext, "useDocumentInteractionOverlaysResult28" | "useDocumentInteractionOverlaysResult29" | "resolvePlatformKeyboardAndSaveStatusWhy" | "pileOwed" | "resolvePlatformKeyboardAndSaveStatusPending" | "halted" | "retrying" | "openFailed" | "linkSaving" | "linkUnsaved" | "useDocumentInteractionOverlaysResult27" | "quoteRecoveryPreview" | "setEnabledState3" | "useDocumentInteractionOverlaysResult30" | "String3" | "frameViewerSaveWord" | "isPlatformKeyboardAndSaveStatusSaved" | "isPlatformKeyboardAndSaveStatusClear" | "elementRef7" | "fileId" | "useDocumentInteractionOverlaysResult32" | "useDocumentInteractionOverlaysResult21" | "emitTelemetryEvent" | "setBar" | "setRescues" | "documentRuntimeLimit0" | "labelRef" | "resolveDocumentInteractionsValue3" | "resolveDocumentRuntimeValue" | "useDocumentInteractionOverlaysResult25" | "settled" | "enabled" | "report2">): Dynamic {
  return (({ ["report2"]: ((
              pending?: Dynamic,
              denied?: Dynamic,
              items2?: Dynamic,
              waiting5?: Dynamic,
              argument?: Dynamic,
              argument2?: Dynamic,
              argument3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              __documentClosure.useDocumentInteractionOverlaysResult28 = [
                pending,
                denied,
                items2,
                waiting5,
                argument,
                argument2,
                argument3,
              ];
              __documentClosure.useDocumentInteractionOverlaysResult29 =
                (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy)(
                  __documentClosure.useDocumentInteractionOverlaysResult29,
                  waiting5,
                  argument,
                  Date.now(),
                );
              (0, __documentClosure.pileOwed)();
              let useDocumentInteractionOverlaysResult47: Dynamic =
                (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusPending)({
                  pending: pending,
                  denied: denied,
                  stale: items2.length,
                  unsynced: argument2 ?? 0,
                  waiting: waiting5,
                  waitingSince:
                    __documentClosure.useDocumentInteractionOverlaysResult29?.heardAt ?? argument,
                  now: Date.now(),
                  halted: __documentClosure.halted || __documentClosure.retrying,
                  openFailed: __documentClosure.openFailed,
                  linkSaving: __documentClosure.linkSaving,
                  linkUnsaved: __documentClosure.linkUnsaved,
                  linkBusy: __documentClosure.useDocumentInteractionOverlaysResult27.busy,
                  busySince: __documentClosure.useDocumentInteractionOverlaysResult27.since,
                  linkBusyUnknown:
                    __documentClosure.useDocumentInteractionOverlaysResult27.unknown === true,
                  composingOnly: argument3 === true,
                });
              let word2: Dynamic = useDocumentInteractionOverlaysResult47.word;
              let quoteRecoveryPreview2: Dynamic = items2[0]?.preview
                ? (0, __documentClosure.quoteRecoveryPreview)(items2[0].preview)
                : undefined;
              (0, __documentClosure.setEnabledState3)(
                __documentClosure.useDocumentInteractionOverlaysResult30.judge(
                  {
                    word: word2,
                    pending: pending,
                    linkSaving: __documentClosure.linkSaving,
                    readOnly: __documentClosure.halted || __documentClosure.retrying,
                    composingOnly: argument3 === true,
                  },
                  Date.now(),
                ),
              );
              (0, __documentClosure.String3)(word2, pending, quoteRecoveryPreview2);
              (0, __documentClosure.frameViewerSaveWord)(
                (0, __documentClosure.isPlatformKeyboardAndSaveStatusSaved)({
                  word: word2,
                  barUp: (0, __documentClosure.isPlatformKeyboardAndSaveStatusClear)(
                    useDocumentInteractionOverlaysResult47.banner,
                    __documentClosure.elementRef7.current === `unsaved`,
                    __documentClosure.halted || __documentClosure.retrying,
                  ),
                  pending: pending,
                  denied: denied,
                  stale: items2.length,
                  unsynced: argument2 ?? 0,
                  linkSaving: __documentClosure.linkSaving,
                  linkUnsaved: __documentClosure.linkUnsaved,
                }),
                __documentClosure.fileId,
              );
              let judge: Dynamic = __documentClosure.useDocumentInteractionOverlaysResult32.judge(
                {
                  now: Date.now(),
                  word: word2,
                  pending: pending,
                  linkSaving: __documentClosure.linkSaving,
                  inputs: {
                    unsynced: argument2 ?? 0,
                    stale: items2.length,
                    ...__documentClosure.useDocumentInteractionOverlaysResult21.unsavedInputs(),
                  },
                },
              );
              if (judge) {
                (0, __documentClosure.emitTelemetryEvent)({
                  name: `pages.save.stuck`,
                  key: judge.component,
                  fields: {
                    component: judge.component,
                    count: judge.seconds,
                    code: judge.counts,
                  },
                });
              }
              (document as Dynamic).documentElement.dataset.lfileStale = String(
                items2.length,
              );
              if (__documentClosure.halted || __documentClosure.retrying) return void (0, __documentClosure.setBar)(null);
              (0, __documentClosure.setRescues)(
                (items3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                  let filteredItems: Dynamic = items3.filter(
                    (item?: Dynamic, ..._extraArguments: unknown[]) =>
                      !item.armed,
                  );
                  let mappedFilteredItems: Dynamic = items2
                    .filter(
                      (
                        item?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): boolean =>
                        typeof item.preview == `string` && item.preview !== ``,
                    )
                    .map(
                      (
                        ask?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => ({
                        id: ++__documentClosure.documentRuntimeLimit0,
                        bid: ask.bid ?? ``,
                        text: ask.preview,
                        armed: true,
                      }),
                    );
                  return filteredItems.length === items3.length &&
                    mappedFilteredItems.length === 0
                    ? items3
                    : [...filteredItems, ...mappedFilteredItems];
                },
              );
              let banner: Dynamic =
                useDocumentInteractionOverlaysResult47.banner;
              if (banner === `clear`) {
                (0, __documentClosure.setBar)(
                  (
                    documentInteractionOverlays?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    documentInteractionOverlays === `unsaved` ||
                    documentInteractionOverlays === `busy`
                      ? null
                      : documentInteractionOverlays,
                );
              } else {
                if (banner === `now`) {
                  __documentClosure.labelRef.current = (0, __documentClosure.resolveDocumentInteractionsValue3)(word2);
                  (0, __documentClosure.setBar)(__documentClosure.resolveDocumentRuntimeValue);
                } else {
                  if (banner === `busy`) {
                    (0, __documentClosure.setBar)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => documentInteractionOverlays ?? `busy`,
                    );
                  }
                }
              }
              __documentClosure.useDocumentInteractionOverlaysResult25.report(
                banner,
                __documentClosure.settled,
                (..._extraArguments: unknown[]): undefined => {
                  if (!(__documentClosure.enabled || typeof banner != `object`)) {
                    if (banner.recheck) {
                      (0, __documentClosure.report2)(
                        pending,
                        denied,
                        items2,
                        waiting5,
                        argument,
                        argument2,
                        argument3,
                      );
                    } else {
                      __documentClosure.labelRef.current = `send_timeout`;
                      (0, __documentClosure.setBar)(__documentClosure.resolveDocumentRuntimeValue);
                    }
                  }
                },
              );
            }) })["report2"]);
}

export function createDocumentInteractionDocumentHostStateSeen16(__documentClosure: Pick<DocumentInteractionContext, "createDocumentHostCoordinator" | "fileId" | "node" | "DocumentInteractionsState8" | "documentHostStateKnown" | "installPlatformApiAndAuthPagehide" | "PlatformApiAndAuthParticipants" | "resolveDocumentHostStateFeedUp" | "feedUp" | "frameLaneLink" | "pid" | "resolvePlatformAnnouncementsValue" | "DocumentInteractionsHere" | "resolvePlatformAnnouncementsValue2" | "resolveDocumentInteractionsValue4">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.createDocumentHostCoordinator)({
                  tab: `${__documentClosure.fileId}/${__documentClosure.node}`,
                  memory: __documentClosure.DocumentInteractionsState8,
                  isSelf: __documentClosure.documentHostStateKnown.isSelf,
                  identityKnown: __documentClosure.documentHostStateKnown.known,
                  linkUp: (..._extraArguments: unknown[]): Dynamic => {
                    let ownEchoAt: Dynamic = null;
                    let useDocumentInteractionOverlaysResult47: Dynamic =
                      (0, __documentClosure.installPlatformApiAndAuthPagehide)();
                    for (let useDocumentInteractionOverlaysResult48 of __documentClosure.PlatformApiAndAuthParticipants.getState().participants.values() as Dynamic)
                      if (
                        useDocumentInteractionOverlaysResult48.who.kind ===
                          `human` &&
                        useDocumentInteractionOverlaysResult48.who.connId ===
                          useDocumentInteractionOverlaysResult47
                      ) {
                        ownEchoAt = Math.max(
                          ownEchoAt ?? 0,
                          useDocumentInteractionOverlaysResult48.ts,
                        );
                      }
                    return (0, __documentClosure.resolveDocumentHostStateFeedUp)({
                      feedUp: __documentClosure.feedUp,
                      lane: (0, __documentClosure.frameLaneLink)(`project/${__documentClosure.pid}`),
                      ownEchoAt: ownEchoAt,
                      now: Date.now(),
                    });
                  },
                  say: (
                    documentInteractionOverlays?: Dynamic,
                    options2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    (0, __documentClosure.resolvePlatformAnnouncementsValue)(
                      document,
                      documentInteractionOverlays,
                      {
                        key: __documentClosure.DocumentInteractionsHere[options2],
                      },
                    ),
                  unsay: (..._extraArguments: unknown[]): undefined => {
                    (0, __documentClosure.resolvePlatformAnnouncementsValue2)(
                      document,
                      __documentClosure.DocumentInteractionsHere.here,
                    );
                    (0, __documentClosure.resolvePlatformAnnouncementsValue2)(
                      document,
                      __documentClosure.DocumentInteractionsHere.left,
                    );
                  },
                  now: (..._extraArguments: unknown[]): number => Date.now(),
                  schedule: __documentClosure.resolveDocumentInteractionsValue4,
                  cancel: (
                    documentInteractionOverlays?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): void => clearTimeout(documentInteractionOverlays),
                }));
}

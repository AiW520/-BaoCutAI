/** BaoCut: extracted document interaction messages expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";

export function createDocumentInteractionOnDown17(__documentClosure: Pick<DocumentInteractionContext, "resolveCommentsStoreLayer" | "resolveCommentsStoreBlocks" | "settled" | "DocumentInteractionsState4" | "wholeDocRef" | "documentHostHealthMonitor" | "useDocumentInteractionOverlaysResult33" | "frameViewerEdit" | "frameViewerRev" | "record" | "down" | "useDocumentInteractionOverlaysResult42" | "useDocumentInteractionOverlaysResult37" | "error2" | "resolvePlatformLiveDocumentAndHistoryPartial" | "updatePlatformLiveDocumentAndHistorySeated" | "resolvePlatformLiveDocumentAndHistoryValue24" | "pid" | "fileId" | "useDocumentInteractionOverlaysResult24" | "resolvePlatformKeyboardAndSaveStatusAssert" | "resolveCommentsStoreAround" | "resolvePlatformKeyboardAndSaveStatusCount" | "halted" | "labelRef" | "setBar" | "resolveDocumentRuntimeValue" | "resolvePlatformKeyboardAndSaveStatusWhy2" | "isPlatformKeyboardAndSaveStatusLimit" | "resolvePlatformKeyboardAndSaveStatusKeptAsText" | "info" | "resolvePlatformAnnouncementsToUpperCase" | "setRescues" | "isPlatformKeyboardAndSaveStatusText" | "documentRuntimeLimit0" | "DocumentHostStateLines" | "isPlatformKeyboardAndSaveStatusFilter" | "DocumentHostStateHanded" | "resolvePlatformKeyboardAndSaveStatusBid2" | "resolvePlatformKeyboardAndSaveStatusFolds" | "resolvePlatformKeyboardAndSaveStatusUnknownId" | "resolveDataOperationControlValue12" | "resolvePlatformKeyboardAndSaveStatusFace" | "retrying" | "haltWords" | "setBar2" | "useDocumentInteractionOverlaysResult25" | "String3" | "DataOperationControlNodeGone2" | "setNodeGone" | "useDocumentInteractionOverlaysHandler3" | "setNotice3" | "setError" | "setSaveWords" | "setEnabledState2" | "resolveDocumentRuntimeState" | "linkSaving" | "linkUnsaved" | "enabledRef" | "elementRef7" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise" | "resolvePlatformKeyboardAndSaveStatusMoved" | "useDocumentInteractionOverlaysResult27" | "resolvePlatformKeyboardAndSaveStatusBusy" | "useDocumentInteractionOverlaysResult28" | "report2" | "resolvePlatformKeyboardAndSaveStatusNotice" | "matchesWaiting" | "waiting" | "useDocumentInteractionOverlaysResult21" | "pageGoneWhy2" | "openFailed" | "setNotice2" | "enabled4" | "setNotice" | "setUseDocumentInteractionOverlaysState" | "retryNow" | "resolveDataModelSchemasBlock" | "useDocumentInteractionOverlaysResult35" | "useDocumentInteractionOverlaysResult34" | "resolveCommentsActionsAndSelectionFrom" | "elementRef18" | "resolveDocumentRuntimeIsArray" | "map" | "useDocumentInteractionOverlaysResult39" | "useDocumentInteractionOverlaysResult40" | "DocumentHostStatePictured" | "setPageShape" | "resolveCommentAnchorsWhole" | "updateDocumentHostStatePictured2" | "isDocumentHostStateIsArray" | "seatDoorList">): Dynamic {
  return ((
                request3?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                (0, __documentClosure.resolveCommentsStoreLayer)(
                  `link`,
                  `down.${request3.t}`,
                  (0, __documentClosure.resolveCommentsStoreBlocks)(request3),
                );
                if (request3.t === `ack` || request3.t === `deny`) {
                  __documentClosure.settled += 1;
                }
                if (request3.t === `ack`) {
                  __documentClosure.DocumentInteractionsState4.acked();
                } else {
                  if (request3.t === `deny`) {
                    __documentClosure.DocumentInteractionsState4.denied();
                  }
                }
                if (
                  request3.t === `snapshot` &&
                  request3.partial !== true &&
                  request3.delta !== true &&
                  __documentClosure.wholeDocRef.current !== null
                ) {
                  __documentClosure.documentHostHealthMonitor.snapshot(`reseat`, Date.now());
                }
                try {
                  if (__documentClosure.useDocumentInteractionOverlaysResult33) {
                    if (
                      request3.t === `ack` &&
                      request3.provisional !== true &&
                      request3.rev >= 0
                    ) {
                      (0, __documentClosure.frameViewerEdit)();
                    }
                    if (request3.t === `snapshot`) {
                      (0, __documentClosure.frameViewerRev)(
                        request3.rev,
                        request3.partial !== true && request3.whole !== false,
                      );
                    } else {
                      if (request3.t === `ack` || request3.t === `threads`) {
                        (0, __documentClosure.frameViewerRev)(request3.rev);
                      } else {
                        if (request3.t === `row`) {
                          (0, __documentClosure.frameViewerRev)(request3.row.rev);
                        }
                      }
                    }
                  }
                  if (request3.t === `session` && __documentClosure.record.schemaHash) {
                    (0, __documentClosure.down)({
                      ...request3,
                      caps: {
                        ...request3.caps,
                        schemaHash: __documentClosure.record.schemaHash,
                      },
                    });
                  } else {
                    if (
                      (request3.t === `snapshot` &&
                        __documentClosure.useDocumentInteractionOverlaysResult42 &&
                        __documentClosure.useDocumentInteractionOverlaysResult37.reveals(
                          request3,
                        )) ||
                      (request3.t === `row` &&
                        __documentClosure.useDocumentInteractionOverlaysResult42 &&
                        __documentClosure.useDocumentInteractionOverlaysResult37.revealsRow(
                          request3.row.rev,
                        ))
                    ) {
                      (0, __documentClosure.down)({
                        ...request3,
                        reveal: true,
                      });
                    } else {
                      (0, __documentClosure.down)(request3);
                    }
                  }
                  if (request3.t === `ack` || request3.t === `deny`) {
                    __documentClosure.documentHostHealthMonitor.settledDown(
                      Date.now(),
                      request3.opId,
                    );
                  }
                } catch {
                  if (request3.t === `ack` || request3.t === `deny`) {
                    __documentClosure.documentHostHealthMonitor.downFailed(
                      Date.now(),
                      request3.opId,
                    );
                  }
                  (0, __documentClosure.error2)(`relay_failed`);
                }
                if (
                  request3.t === `snapshot` &&
                  (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryPartial)(request3)
                ) {
                  (0, __documentClosure.updatePlatformLiveDocumentAndHistorySeated)(
                    (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryValue24)(__documentClosure.pid, __documentClosure.fileId),
                    request3.rev,
                  );
                }
                try {
                  let down3: Dynamic =
                    __documentClosure.useDocumentInteractionOverlaysResult24.down(request3);
                  let detail: Dynamic =
                    request3.t === `deny`
                      ? (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusAssert)(
                          request3.detail,
                        )
                      : null;
                  if (request3.t === `deny` && detail !== null) {
                    let documentElement: Dynamic = (document as Dynamic)
                      .documentElement;
                    documentElement.dataset.lfileZeroError = String(
                      Number(documentElement.dataset.lfileZeroError ?? 0) + 1,
                    );
                    documentElement.dataset.lfileZeroErrorLast =
                      request3.reason;
                    (0, __documentClosure.resolveCommentsStoreAround)({
                      layer: `host`,
                      name: `zero_error`,
                      reason: request3.reason,
                      detail: detail,
                      quiet: true,
                    });
                    (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `zero_error`, {
                      reason: request3.reason,
                      klass: detail,
                    });
                    let useDocumentInteractionOverlaysResult48: Dynamic =
                      (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusCount)(
                        request3.reason,
                        request3.detail,
                        __documentClosure.halted,
                        down3,
                      );
                    if (useDocumentInteractionOverlaysResult48?.bar) {
                      __documentClosure.labelRef.current = `unsynced`;
                      (0, __documentClosure.setBar)(__documentClosure.resolveDocumentRuntimeValue);
                    }
                    if (useDocumentInteractionOverlaysResult48?.say) {
                      (0, __documentClosure.error2)(
                        useDocumentInteractionOverlaysResult48.say.word,
                        useDocumentInteractionOverlaysResult48.say.refine,
                        undefined,
                        useDocumentInteractionOverlaysResult48.say.quiet,
                      );
                    }
                  } else if (request3.t === `deny`) {
                    (0, __documentClosure.error2)(
                      request3.reason,
                      (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy2)(request3.detail),
                      undefined,
                      !(0, __documentClosure.isPlatformKeyboardAndSaveStatusLimit)(
                        request3.reason,
                        request3.detail,
                      ),
                    );
                  }
                  if (
                    request3.t === `ack` &&
                    (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusKeptAsText)(
                      request3.notices,
                    ) > 0
                  ) {
                    (0, __documentClosure.info)(
                      (0, __documentClosure.resolvePlatformAnnouncementsToUpperCase)(
                        `kept_as_text`,
                        `image`,
                      ),
                      `kept_as_text`,
                    );
                  }
                  if (
                    request3.t === `state` &&
                    Array.isArray(request3.staged)
                  ) {
                    let filteredStaged: Dynamic = (
                      request3.staged ?? []
                    ).filter(
                      (ask?: Dynamic, ..._extraArguments: unknown[]): boolean =>
                        typeof ask == `object` &&
                        !!ask &&
                        typeof ask.bid == `string` &&
                        typeof ask.text == `string` &&
                        ask.text !== ``,
                    );
                    (0, __documentClosure.setRescues)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        (0, __documentClosure.isPlatformKeyboardAndSaveStatusText)(
                          documentInteractionOverlays,
                          filteredStaged.map(
                            (
                              ask?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): Dynamic => ({
                              bid: ask.bid,
                              afterId:
                                typeof ask.afterId == `string`
                                  ? ask.afterId
                                  : null,
                              text: ask.text,
                              cut: ask.cut,
                            }),
                          ),
                          (..._extraArguments: unknown[]): number =>
                            ++__documentClosure.documentRuntimeLimit0,
                        ),
                    );
                    try {
                      if (filteredStaged.length > 0) {
                        (0, __documentClosure.DocumentHostStateLines)(__documentClosure.pid);
                      }
                    } catch {}
                  }
                  if (
                    request3.t === `staged` &&
                    Array.isArray(request3.staged)
                  ) {
                    (0, __documentClosure.setRescues)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        (0, __documentClosure.isPlatformKeyboardAndSaveStatusFilter)(
                          documentInteractionOverlays,
                          request3.staged,
                        ),
                    );
                  }
                  try {
                    if (request3.t === `staged`) {
                      (0, __documentClosure.DocumentHostStateHanded)(__documentClosure.pid, request3);
                    }
                  } catch {}
                  if (
                    request3.t === `snapshot` &&
                    !request3.incomplete &&
                    request3.compare !== true
                  ) {
                    (0, __documentClosure.setRescues)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        documentInteractionOverlays.some(
                          (
                            item?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): Dynamic => item.staged && !item.penOff,
                        )
                          ? documentInteractionOverlays.filter(
                              (
                                item?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): Dynamic => !item.staged || item.penOff,
                            )
                          : documentInteractionOverlays,
                    );
                  }
                  if (request3.t === `deny`)
                    for (let useDocumentInteractionOverlaysResult48 of (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusBid2)(
                      request3.detail,
                    ) as Dynamic) {
                      (0, __documentClosure.setRescues)(
                        (
                          documentInteractionOverlays?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusFolds)(
                            documentInteractionOverlays,
                            useDocumentInteractionOverlaysResult48,
                            ++__documentClosure.documentRuntimeLimit0,
                            (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusUnknownId)(
                              request3.reason,
                            ),
                          ),
                      );
                      if (!__documentClosure.halted) {
                        __documentClosure.labelRef.current = `refused`;
                        (0, __documentClosure.setBar)(__documentClosure.resolveDocumentRuntimeValue);
                      }
                    }
                  if (request3.t === `state`) {
                    (0, __documentClosure.resolveDataOperationControlValue12)(request3);
                  }
                  let useDocumentInteractionOverlaysResult47: Dynamic =
                    request3.t === `state`
                      ? (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusFace)(
                          {
                            halted: __documentClosure.halted,
                            retrying: __documentClosure.retrying,
                            haltWords: __documentClosure.haltWords,
                          },
                          request3,
                        )
                      : null;
                  if (useDocumentInteractionOverlaysResult47) {
                    ({
                      halted: __documentClosure.halted,
                      retrying: __documentClosure.retrying,
                      haltWords: __documentClosure.haltWords,
                    } = useDocumentInteractionOverlaysResult47.face);
                  }
                  if (request3.t === `state` && request3.halt === true) {
                    (0, __documentClosure.setBar2)();
                    __documentClosure.useDocumentInteractionOverlaysResult25.drop();
                    (0, __documentClosure.setBar)(null);
                    (0, __documentClosure.String3)(`readonly`, 0);
                    if (request3.words === __documentClosure.DataOperationControlNodeGone2) {
                      (0, __documentClosure.setNodeGone)(true);
                    }
                    if (typeof request3.words == `string`) {
                      (0, __documentClosure.useDocumentInteractionOverlaysHandler3)();
                      if (request3.shown === true) {
                        (0, __documentClosure.setNotice3)(request3.words);
                      } else {
                        (0, __documentClosure.setError)(request3.words);
                      }
                    }
                  } else if (
                    request3.t === `state` &&
                    request3.retrying === true
                  ) {
                    (0, __documentClosure.setBar2)();
                    __documentClosure.useDocumentInteractionOverlaysResult25.drop();
                    (0, __documentClosure.setBar)(null);
                    (0, __documentClosure.String3)(`readonly`, 0);
                    if (typeof request3.words == `string`) {
                      (0, __documentClosure.useDocumentInteractionOverlaysHandler3)();
                      (0, __documentClosure.setNotice3)(request3.words);
                    }
                  } else if (request3.t === `state`) {
                    (0, __documentClosure.setSaveWords)(
                      request3.state === `saving` &&
                        request3.checking === true &&
                        typeof request3.words == `string`
                        ? request3.words
                        : null,
                    );
                    (0, __documentClosure.setEnabledState2)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        (0, __documentClosure.resolveDocumentRuntimeState)(
                          request3,
                          documentInteractionOverlays,
                        ),
                    );
                    let matchesState: boolean = request3.state === `saving`;
                    let matchesState2: boolean = request3.state === `unsaved`;
                    let matchesMatchesState: boolean =
                      matchesState !== __documentClosure.linkSaving ||
                      matchesState2 !== __documentClosure.linkUnsaved;
                    if (
                      __documentClosure.linkSaving &&
                      (request3.state === `saved` ||
                        request3.state === `live`) &&
                      __documentClosure.enabledRef.current
                    ) {
                      __documentClosure.elementRef7.current = null;
                    }
                    if (
                      __documentClosure.linkSaving &&
                      (request3.state === `saved` || request3.state === `live`)
                    ) {
                      (0, __documentClosure.setEnabledState)(
                        (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`link_saved`),
                      );
                    }
                    __documentClosure.linkSaving = matchesState;
                    __documentClosure.linkUnsaved = matchesState2;
                    let {
                      moved: useDocumentInteractionOverlaysResult48,
                      ...useDocumentInteractionOverlaysResult49
                    }: Dynamic = (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusMoved)(
                      request3,
                      __documentClosure.useDocumentInteractionOverlaysResult27,
                      Date.now(),
                    );
                    __documentClosure.useDocumentInteractionOverlaysResult27 =
                      useDocumentInteractionOverlaysResult49;
                    if (
                      useDocumentInteractionOverlaysResult48 &&
                      !(0, __documentClosure.resolvePlatformKeyboardAndSaveStatusBusy)(
                        __documentClosure.useDocumentInteractionOverlaysResult27,
                      )
                    ) {
                      (0, __documentClosure.setBar)(
                        (
                          documentInteractionOverlays?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          documentInteractionOverlays === `busy`
                            ? null
                            : documentInteractionOverlays,
                      );
                    }
                    if (
                      (useDocumentInteractionOverlaysResult47?.cleared ||
                        matchesMatchesState ||
                        useDocumentInteractionOverlaysResult48) &&
                      __documentClosure.useDocumentInteractionOverlaysResult28
                    ) {
                      (__documentClosure.report2 as Dynamic)(
                        ...__documentClosure.useDocumentInteractionOverlaysResult28,
                      );
                    }
                    let useDocumentInteractionOverlaysResult50: Dynamic =
                      (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusNotice)(
                        request3,
                        __documentClosure.matchesWaiting,
                        {
                          halted: __documentClosure.halted,
                          retrying: __documentClosure.retrying,
                          standing: (0, __documentClosure.waiting)(),
                          linkDown:
                            __documentClosure.useDocumentInteractionOverlaysResult21.paused(),
                          viewer:
                            __documentClosure.useDocumentInteractionOverlaysResult21.viewOnly(),
                        },
                      );
                    __documentClosure.matchesWaiting =
                      useDocumentInteractionOverlaysResult50.linkNotice;
                    if (
                      useDocumentInteractionOverlaysResult50.notice !==
                      undefined
                    ) {
                      (0, __documentClosure.setNotice3)(useDocumentInteractionOverlaysResult50.notice);
                    }
                    if (request3.state === `saving`) {
                      if (request3.storeShed === true) {
                        __documentClosure.DocumentInteractionsState4.shed();
                      }
                    } else {
                      if (
                        request3.state === `saved` ||
                        request3.state === `live`
                      ) {
                        __documentClosure.DocumentInteractionsState4.landed();
                      } else {
                        __documentClosure.DocumentInteractionsState4.drop();
                      }
                    }
                    if (!__documentClosure.halted && !__documentClosure.retrying) {
                      (0, __documentClosure.pageGoneWhy2)(request3.state);
                    }
                    if (request3.openFailed === true && !__documentClosure.openFailed) {
                      __documentClosure.openFailed = true;
                      (0, __documentClosure.setNotice2)();
                      if (__documentClosure.useDocumentInteractionOverlaysResult28) {
                        (__documentClosure.report2 as Dynamic)(
                          ...__documentClosure.useDocumentInteractionOverlaysResult28,
                        );
                      }
                    }
                    if (
                      request3.openBusy === true &&
                      typeof request3.words == `string` &&
                      !__documentClosure.matchesWaiting
                    ) {
                      __documentClosure.enabled4 = true;
                      (0, __documentClosure.setNotice)(request3.words);
                      let stage: Dynamic = request3.stage;
                      (0, __documentClosure.setUseDocumentInteractionOverlaysState)(
                        stage === `still` || stage === `slow`
                          ? stage
                          : `crowded`,
                      );
                    }
                  }
                  if (request3.t === `snapshot`) {
                    __documentClosure.openFailed = false;
                    (0, __documentClosure.setNotice2)();
                    (0, __documentClosure.retryNow)();
                  }
                  if (
                    request3.t === `snapshot` &&
                    (request3.delta === true || request3.partial === true) &&
                    typeof request3.block == `string` &&
                    request3.gone !== true
                  ) {
                    let useDocumentInteractionOverlaysResult48: Dynamic =
                      (0, __documentClosure.resolveDataModelSchemasBlock)(request3);
                    if (useDocumentInteractionOverlaysResult48 !== null) {
                      __documentClosure.useDocumentInteractionOverlaysResult37.delta(
                        useDocumentInteractionOverlaysResult48,
                      );
                    }
                  }
                  if (
                    request3.t === `snapshot` &&
                    request3.partial !== true &&
                    request3.whole !== false
                  ) {
                    __documentClosure.useDocumentInteractionOverlaysResult35 = {
                      json: request3.docJson,
                      rev:
                        typeof request3.rev == `number` ||
                        typeof request3.rev == `string`
                          ? request3.rev
                          : undefined,
                    };
                    __documentClosure.wholeDocRef.current = request3.docJson;
                  }
                  if (__documentClosure.useDocumentInteractionOverlaysResult34.hear(request3)) {
                    if (__documentClosure.useDocumentInteractionOverlaysResult33) {
                      (0, __documentClosure.resolveCommentsActionsAndSelectionFrom)();
                    }
                    __documentClosure.elementRef18.current?.learned();
                  }
                  if (
                    request3.t === `snapshot` &&
                    request3.partial !== true &&
                    request3.whole !== false
                  ) {
                    let documentRuntimeIsArrayCount: Dynamic =
                      (0, __documentClosure.resolveDocumentRuntimeIsArray)(
                        __documentClosure.wholeDocRef.current,
                        __documentClosure.map,
                      ).length;
                    __documentClosure.useDocumentInteractionOverlaysResult39.pictured(
                      documentRuntimeIsArrayCount,
                    );
                    __documentClosure.useDocumentInteractionOverlaysResult40.pictured(
                      documentRuntimeIsArrayCount,
                    );
                  }
                  try {
                    if (
                      request3.t === `snapshot` &&
                      request3.partial !== true &&
                      request3.whole !== false
                    ) {
                      (0, __documentClosure.DocumentHostStatePictured)(__documentClosure.pid, request3);
                    }
                  } catch {}
                  if (request3.t === `snapshot`) {
                    let hasText: boolean = false;
                    for (let useDocumentInteractionOverlaysResult48 of __documentClosure.map.values() as Dynamic)
                      if (
                        useDocumentInteractionOverlaysResult48.text &&
                        useDocumentInteractionOverlaysResult48.size > 0
                      ) {
                        hasText = true;
                        break;
                      }
                    let whole: boolean =
                      request3.partial !== true && request3.whole !== false;
                    (0, __documentClosure.setPageShape)(
                      (
                        documentInteractionOverlays?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        (0, __documentClosure.resolveCommentAnchorsWhole)(
                          documentInteractionOverlays,
                          {
                            whole: whole,
                            docJson: request3.docJson,
                            hasText: hasText,
                          },
                        ),
                    );
                  }
                  if (request3.t === `snapshot`) {
                    let whole: boolean =
                      request3.partial !== true &&
                      request3.whole !== false &&
                      request3.incomplete === undefined;
                    __documentClosure.updateDocumentHostStatePictured2.pictured({
                      whole: whole,
                      outline: whole
                        ? (0, __documentClosure.isDocumentHostStateIsArray)(request3.docJson)
                        : null,
                    });
                  }
                  if (
                    (request3.t === `snapshot` ||
                      request3.t === `comments` ||
                      request3.t === `threads`) &&
                    request3.comments
                  ) {
                    (0, __documentClosure.seatDoorList)(request3.comments);
                  }
                } catch {}
              });
}

/** BaoCut: extracted document interaction bridge expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";

export function createDocumentInteractionHasFocus18(__documentClosure: Pick<DocumentInteractionContext, "isDocumentRuntimeReason" | "resolvePlatformAnnouncementsValue10" | "info" | "resolvePlatformAnnouncementsToUpperCase" | "isPlatformAnnouncementsValue" | "error2" | "createPagesFaceUndoEvent" | "emitTelemetryEvent" | "createPagesEditorLockedEvent" | "isDocumentRuntimeText" | "createPagesOutboxDroppedEvent" | "lookup4" | "resolvePlatformKeyboardAndSaveStatusKept" | "setRescues" | "isPlatformKeyboardAndSaveStatusPenOff" | "documentRuntimeLimit0" | "resolveDocumentRuntimeValue5" | "useCommentStore" | "resolveDocumentRuntimeIsArray2" | "body" | "shed2" | "resolveDocumentRuntimeValue4" | "isDocumentRuntimeToken" | "elementRef5" | "setDetachAsk" | "of2" | "resolveEditorMediaValue2" | "request" | "resolveCommentsStoreLayer" | "resolveCommentsStoreBlocks" | "nudgeLiveDoor" | "elementRef21" | "elementRef22" | "elementRef6" | "isDocumentInteractionsValue" | "filterPlatformLiveDocumentAndHistoryRevive" | "request2" | "toast" | "useDocumentInteractionOverlaysResult24" | "documentHostHealthMonitor" | "resolveObservabilityBootPaint2" | "moved" | "documentHostStateValue2" | "resolvePlatformKeyboardAndSaveStatusBid" | "resolveDocumentInteractionsTray" | "createPagesWriteGateRefusedCappedEvent" | "setEnabledState5" | "heard" | "resolveObservabilityBrowserAndOperationEventsWork" | "report" | "resolveObservabilityBrowserAndOperationEventsComplete" | "label" | "resolveObservabilityBrowserAndOperationEventsValue8" | "report2" | "filterDocumentRuntimeStale" | "useDocumentInteractionOverlaysResult43" | "down2" | "useDocumentInteractionOverlaysResult33" | "frameViewerDirty" | "frameViewerSelection" | "node" | "updateObservabilityBrowserAndOperationEventsSelected" | "map" | "resolveDocumentHostStateNode" | "PlatformApiAndAuthParticipants" | "fileId" | "contextRef" | "updateFrameGesturesAnchor" | "documentScrollKey" | "pid" | "useDocumentInteractionOverlaysResult46" | "resolvePlatformKeyboardAndSaveStatusKeys" | "DocumentInteractionsState7">): Dynamic {
  return (({ ["hasFocus"]: ((
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let data: Dynamic = documentInteractionOverlays.data;
              if (
                (0, __documentClosure.isDocumentRuntimeReason)(data) &&
                (0, __documentClosure.resolvePlatformAnnouncementsValue10)(data.reason)
              )
                return (0, __documentClosure.info)(
                  (0, __documentClosure.resolvePlatformAnnouncementsToUpperCase)(
                    data.reason,
                    data.refine,
                  ),
                  data.reason,
                );
              if ((0, __documentClosure.isDocumentRuntimeReason)(data)) {
                let useDocumentInteractionOverlaysResult47: Dynamic =
                  (0, __documentClosure.isPlatformAnnouncementsValue)(data.reason, data.refine);
                (0, __documentClosure.error2)(
                  data.reason,
                  data.refine,
                  data.quote,
                  useDocumentInteractionOverlaysResult47,
                );
                try {
                  let useDocumentInteractionOverlaysResult48: Dynamic =
                    useDocumentInteractionOverlaysResult47
                      ? null
                      : (0, __documentClosure.createPagesFaceUndoEvent)(
                          data.reason,
                          data.refine,
                          data.mark,
                        );
                  if (useDocumentInteractionOverlaysResult48) {
                    (0, __documentClosure.emitTelemetryEvent)(useDocumentInteractionOverlaysResult48);
                  }
                  let useDocumentInteractionOverlaysResult49: Dynamic =
                    (0, __documentClosure.createPagesEditorLockedEvent)(data.reason, data.refine);
                  if (useDocumentInteractionOverlaysResult49 !== null) {
                    (0, __documentClosure.emitTelemetryEvent)(useDocumentInteractionOverlaysResult49);
                  }
                } catch {}
                return;
              }
              if ((0, __documentClosure.isDocumentRuntimeText)(data)) {
                if (data.dropped === true) {
                  (0, __documentClosure.emitTelemetryEvent)(
                    (0, __documentClosure.createPagesOutboxDroppedEvent)(`carry`, `seat`),
                  );
                }
                let bid: Dynamic =
                  data.keyed === true && typeof data.bid == `string`
                    ? data.bid
                    : null;
                let cut: Dynamic =
                  bid !== null && __documentClosure.lookup4.has(bid)
                    ? __documentClosure.lookup4.get(bid)
                    : (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusKept)(data.cut);
                if (bid !== null) {
                  __documentClosure.lookup4.delete(bid);
                }
                (0, __documentClosure.setRescues)(
                  (
                    documentInteractionOverlays2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    if (data.text === ``) {
                      if (typeof data.bid != `string` || data.bid === ``)
                        return documentInteractionOverlays2;
                      let afterId: Dynamic = data.afterId ?? null;
                      let documentInteractionOverlayIndex2: Dynamic =
                        documentInteractionOverlays2.findIndex(
                          (
                            ask?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): boolean =>
                            ask.bid === data.bid &&
                            (ask.keyed === true ||
                              ((ask.drops === true || ask.staged === true) &&
                                (ask.afterId ?? null) === afterId)),
                        );
                      return documentInteractionOverlayIndex2 < 0
                        ? documentInteractionOverlays2
                        : documentInteractionOverlays2.toSpliced(
                            documentInteractionOverlayIndex2,
                            1,
                          );
                    }
                    let documentInteractionOverlayIndex: Dynamic =
                      bid === null
                        ? -1
                        : documentInteractionOverlays2.findIndex(
                            (
                              ask?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): boolean => ask.bid === bid && ask.keyed === true,
                          );
                    if (documentInteractionOverlayIndex >= 0) {
                      let {
                        cut: documentInteractionOverlayItem,
                        ...documentInteractionOverlayItem2
                      }: Dynamic =
                        documentInteractionOverlays2[
                          documentInteractionOverlayIndex
                        ];
                      return documentInteractionOverlays2.with(
                        documentInteractionOverlayIndex,
                        {
                          ...documentInteractionOverlayItem2,
                          text: data.text,
                          ...(cut
                            ? {
                                cut: cut,
                              }
                            : {}),
                        },
                      );
                    }
                    return (0, __documentClosure.isPlatformKeyboardAndSaveStatusPenOff)(
                      documentInteractionOverlays2,
                      {
                        ...data,
                        cut: cut,
                      },
                      ++__documentClosure.documentRuntimeLimit0,
                    );
                  },
                );
                return;
              }
              if ((0, __documentClosure.resolveDocumentRuntimeValue5)(data))
                return __documentClosure.useCommentStore.getState().setFocus(data.id);
              if ((0, __documentClosure.resolveDocumentRuntimeIsArray2)(data)) {
                if (data.lid === __documentClosure.body) {
                  (0, __documentClosure.shed2)((0, __documentClosure.resolveDocumentRuntimeValue4)(data.refs));
                }
                return;
              }
              if ((0, __documentClosure.isDocumentRuntimeToken)(data)) {
                if (data.off === true) {
                  if (__documentClosure.elementRef5.current?.token === data.token) {
                    __documentClosure.elementRef5.current = null;
                  }
                  (0, __documentClosure.setDetachAsk)(
                    (
                      documentInteractionOverlays2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      documentInteractionOverlays2?.token === data.token
                        ? null
                        : documentInteractionOverlays2,
                  );
                  return;
                }
                if (data.typing === true) {
                  (0, __documentClosure.setDetachAsk)(
                    (
                      documentInteractionOverlays2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      documentInteractionOverlays2?.token === data.token
                        ? {
                            ...documentInteractionOverlays2,
                            pulse: documentInteractionOverlays2.pulse + 1,
                          }
                        : documentInteractionOverlays2,
                  );
                  return;
                }
                __documentClosure.elementRef5.current?.reply(false);
                __documentClosure.elementRef5.current = {
                  token: data.token,
                  reply: (
                    documentInteractionOverlays2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    __documentClosure.of2.postMessage({
                      t: `detach-answer`,
                      token: data.token,
                      ok: documentInteractionOverlays2,
                    }),
                };
                (0, __documentClosure.setDetachAsk)({
                  token: data.token,
                  count: new (Set as Dynamic)(data.threads).size,
                  pulse: 0,
                });
                return;
              }
              if ((0, __documentClosure.resolveEditorMediaValue2)(data)) {
                if (data.node !== __documentClosure.body || !__documentClosure.request) {
                  if (data.t === `ops` || data.t === `words`) {
                    (0, __documentClosure.emitTelemetryEvent)(
                      (0, __documentClosure.createPagesOutboxDroppedEvent)(
                        `port`,
                        __documentClosure.request ? `node` : `no_link`,
                      ),
                    );
                    (console as Dynamic).error(
                      `useDoorLfile: a "${data.t}" frame arrived with ${__documentClosure.request ? `another node's id` : `no open link`} — nothing of it was sent or staged`,
                    );
                  }
                  return;
                }
                if (
                  data.t === `ops` ||
                  data.t === `need` ||
                  data.t === `words` ||
                  (data.t === `painted` && data.ok === false)
                ) {
                  (0, __documentClosure.resolveCommentsStoreLayer)(
                    `link`,
                    `up.${data.t}`,
                    (0, __documentClosure.resolveCommentsStoreBlocks)(data),
                  );
                }
                if (data.t === `ops` || data.t === `words`) {
                  (0, __documentClosure.nudgeLiveDoor)();
                }
                if (data.t === `ops` || data.t === `words`) {
                  __documentClosure.elementRef21.current?.drop();
                }
                if (data.t === `ops` || data.t === `words`) {
                  __documentClosure.elementRef22.current?.drop();
                }
                if (data.t === `ops` && data.tele) {
                  let isInteger: Dynamic = (
                    documentInteractionOverlays2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): number =>
                    typeof documentInteractionOverlays2 == `number` &&
                    Number.isInteger(documentInteractionOverlays2)
                      ? Math.max(
                          1,
                          Math.min(65535, documentInteractionOverlays2),
                        )
                      : 0;
                  if (isInteger(data.tele.remintByValue) > 0) {
                    (0, __documentClosure.emitTelemetryEvent)({
                      name: `pages.undo.revive`,
                      key: `container_skipped`,
                      fields: {
                        code: `container_skipped`,
                        count: isInteger(data.tele.remintByValue),
                        road: `host`,
                      },
                    });
                  }
                  if (isInteger(data.tele.reviveBoxes) > 0) {
                    (0, __documentClosure.emitTelemetryEvent)({
                      name: `pages.undo.revive`,
                      key: `container`,
                      fields: {
                        code: `container`,
                        count: isInteger(data.tele.reviveBoxes),
                        road: `host`,
                      },
                    });
                  }
                }
                if (data.t === `ops`) {
                  __documentClosure.elementRef6.current?.note(
                    data.opId,
                    (0, __documentClosure.isDocumentInteractionsValue)()
                      ? {
                          g: `other`,
                          ...data.tele,
                          sh: (0, __documentClosure.filterPlatformLiveDocumentAndHistoryRevive)(data),
                        }
                      : data.tele,
                  );
                }
                try {
                  if (
                    data.t === `ops` &&
                    data.undo === true &&
                    __documentClosure.request2?.words ===
                      (0, __documentClosure.resolvePlatformAnnouncementsToUpperCase)(
                        `undo_blocked`,
                        `spent`,
                      )
                  ) {
                    __documentClosure.request2 = null;
                    __documentClosure.toast.dismiss(`prose-refused`);
                  }
                } catch {}
                __documentClosure.useDocumentInteractionOverlaysResult24.up(data);
                if (data.t === `ops`) {
                  __documentClosure.documentHostHealthMonitor.handed(Date.now(), data.opId);
                  __documentClosure.request.send(
                    data.opId,
                    data.ops,
                    undefined,
                    data.predicted,
                    data.homes,
                    data.assert,
                    data.undo === true,
                  );
                } else if (data.t === `need`) {
                  if (data.why === `mount`) {
                    (0, __documentClosure.resolveObservabilityBootPaint2)(`editor`);
                  }
                  __documentClosure.request.need({
                    why: data.why,
                    block: data.block,
                    pen: data.again === true,
                    ...(typeof data.inst == `string`
                      ? {
                          inst: data.inst,
                        }
                      : {}),
                    readonly: data.readonly === true,
                  });
                  if (
                    data.why === `mount` &&
                    (__documentClosure.moved || __documentClosure.documentHostStateValue2.spend())
                  ) {
                    __documentClosure.moved = false;
                    __documentClosure.request.need();
                    __documentClosure.request.need({
                      why: `comments`,
                    });
                  }
                } else if (data.t === `words`) {
                  let words: Dynamic = __documentClosure.request.words(
                    (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusBid)(data),
                  );
                  if (
                    data.tray === true &&
                    data.quiet !== true &&
                    data.text !== ``
                  )
                    for (
                      __documentClosure.lookup4.set(data.bid, words ?? undefined);
                      __documentClosure.lookup4.size > 8;

                    )
                      __documentClosure.lookup4.delete(__documentClosure.lookup4.keys().next().value);
                  try {
                    let documentInteractionsTray: Dynamic =
                      (0, __documentClosure.resolveDocumentInteractionsTray)(data);
                    if (documentInteractionsTray) {
                      (0, __documentClosure.emitTelemetryEvent)(documentInteractionsTray);
                    }
                  } catch {}
                } else if (data.t === `hold`)
                  __documentClosure.request.hold(data.opId, data.ops, data.predicted, data.homes);
                else if (data.t === `unhold`) __documentClosure.request.unhold(data.opId);
                else if (data.t === `gated`) {
                  let useDocumentInteractionOverlaysResult47: Dynamic =
                    (0, __documentClosure.createPagesWriteGateRefusedCappedEvent)(data);
                  if (useDocumentInteractionOverlaysResult47) {
                    (0, __documentClosure.emitTelemetryEvent)(useDocumentInteractionOverlaysResult47);
                  }
                } else if (data.t === `painted`) {
                  __documentClosure.elementRef21.current?.painted(data);
                  __documentClosure.elementRef22.current?.painted(data);
                  __documentClosure.request.painted({
                    block: data.block,
                    rev: data.rev,
                    ok: data.ok,
                    row: data.row,
                    compare: data.compare,
                    held: data.held,
                    order: data.order,
                  });
                } else if (data.t === `pending`) {
                  (0, __documentClosure.setEnabledState5)(data);
                  __documentClosure.request.wordsHeld(
                    typeof data.held == `number` ? data.held : 0,
                  );
                  __documentClosure.heard = (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsWork)(
                    data.pending,
                    __documentClosure.documentHostHealthMonitor.verdictsDown().settled,
                  );
                  __documentClosure.documentHostHealthMonitor.reported();
                  __documentClosure.report =
                    (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsComplete)(
                      data.orphan,
                    ) ?? __documentClosure.report;
                  __documentClosure.label = (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsValue8)(
                    __documentClosure.label,
                    data.imeWhy,
                  );
                  (0, __documentClosure.report2)(
                    data.pending,
                    data.denied,
                    (0, __documentClosure.filterDocumentRuntimeStale)(data),
                    data.waiting,
                    data.waitingSince,
                    data.unsynced ?? 0,
                    data.composingOnly === true,
                  );
                  (document as Dynamic).documentElement.dataset.lfileStrayed =
                    String(data.strayed ?? 0);
                  (document as Dynamic).documentElement.dataset.lfileTrayed =
                    String(data.trayed ?? 0);
                  (document as Dynamic).documentElement.dataset.lfileUnsynced =
                    String(data.unsynced ?? 0);
                  (
                    document as Dynamic
                  ).documentElement.dataset.lfileZeroErrors = String(
                    data.zeroErrors ?? 0,
                  );
                  (document as Dynamic).documentElement.dataset.lfileNoReseat =
                    String(data.noReseat ?? 0);
                  if (
                    data.owed === true &&
                    __documentClosure.useDocumentInteractionOverlaysResult43 === undefined
                  ) {
                    __documentClosure.useDocumentInteractionOverlaysResult43 = setTimeout(
                      (..._extraArguments: unknown[]): Dynamic => (
                        (__documentClosure.useDocumentInteractionOverlaysResult43 = undefined),
                        (0, __documentClosure.down2)()
                      ),
                      250,
                    );
                  }
                  if (__documentClosure.useDocumentInteractionOverlaysResult33) {
                    (0, __documentClosure.frameViewerDirty)(
                      data.pending > 0 ||
                        (0, __documentClosure.filterDocumentRuntimeStale)(data).length > 0,
                    );
                  }
                } else if (
                  data.t === `view` &&
                  __documentClosure.useDocumentInteractionOverlaysResult33
                )
                  (0, __documentClosure.frameViewerSelection)({
                    node: __documentClosure.node,
                    ...(0, __documentClosure.updateObservabilityBrowserAndOperationEventsSelected)(
                      data.blocks,
                      data.range,
                      __documentClosure.map,
                    ),
                  });
                else if (data.t === `presence`) {
                  let documentHostStateNode: Dynamic =
                    (0, __documentClosure.resolveDocumentHostStateNode)(data.sel, __documentClosure.node);
                  if (documentHostStateNode !== null) {
                    __documentClosure.PlatformApiAndAuthParticipants.getState().setCursor(
                      documentHostStateNode,
                      __documentClosure.fileId,
                    );
                  }
                  let context2: Dynamic = __documentClosure.contextRef.current?.current;
                  if (
                    context2 &&
                    context2.ownerDocument.hasFocus() &&
                    context2.ownerDocument.activeElement === context2
                  ) {
                    (0, __documentClosure.updateFrameGesturesAnchor)(
                      (0, __documentClosure.documentScrollKey)(__documentClosure.pid, __documentClosure.fileId),
                      data.sel,
                    );
                    __documentClosure.useDocumentInteractionOverlaysResult46 =
                      (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusKeys)(
                        __documentClosure.useDocumentInteractionOverlaysResult46,
                      );
                    __documentClosure.DocumentInteractionsState7 = true;
                  }
                }
              }
            }) })["hasFocus"]);
}

/** BaoCut: extracted document interaction shutdown expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";

export function createDocumentInteractionQuerySelector19(__documentClosure: Pick<DocumentInteractionContext, "halted" | "retrying" | "resolvePlatformKeyboardAndSaveStatusKey" | "resolvePlatformKeyboardAndSaveStatusBody" | "filterPlatformKeyboardAndSaveStatusNext" | "useDocumentInteractionOverlaysResult46" | "dependenciesRef" | "DocumentInteractionsState7" | "isDocumentFocusedElsewhere" | "down" | "error2">): Dynamic {
  return (({ ["querySelector"]: ((
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                __documentClosure.halted ||
                __documentClosure.retrying ||
                !(0, __documentClosure.resolvePlatformKeyboardAndSaveStatusKey)(event) ||
                !(0, __documentClosure.resolvePlatformKeyboardAndSaveStatusBody)(
                  event.composedPath()[0] ?? event.target,
                  document,
                  event.key,
                )
              )
                return;
              let matchedElement: Dynamic = (document as Dynamic).querySelector(
                `dialog[open], [role=dialog]`,
              );
              if (
                matchedElement instanceof (HTMLElement as Dynamic) &&
                matchedElement.offsetParent !== null
              )
                return;
              let useDocumentInteractionOverlaysResult47: Dynamic =
                (0, __documentClosure.filterPlatformKeyboardAndSaveStatusNext)(
                  __documentClosure.useDocumentInteractionOverlaysResult46,
                  Date.now(),
                  __documentClosure.dependenciesRef.current?.leaving === true,
                );
              __documentClosure.useDocumentInteractionOverlaysResult46 =
                useDocumentInteractionOverlaysResult47.next;
              if (__documentClosure.useDocumentInteractionOverlaysResult46.swapBorn !== true) {
                __documentClosure.DocumentInteractionsState7 = true;
              }
              if (
                useDocumentInteractionOverlaysResult47.refocus &&
                !(0, __documentClosure.isDocumentFocusedElsewhere)(document)
              ) {
                (0, __documentClosure.down)({
                  t: `focus`,
                });
              }
              if (useDocumentInteractionOverlaysResult47.say) {
                (0, __documentClosure.error2)(
                  `dead_input`,
                  useDocumentInteractionOverlaysResult47.say,
                );
              }
            }) })["querySelector"]);
}

export function createDocumentInteractionClose20(__documentClosure: Pick<DocumentInteractionContext, "waiting4" | "word" | "waiting3" | "resolveDocumentRuntimeUnsent" | "useDocumentInteractionOverlaysResult28" | "error2" | "elementRef3" | "report" | "querySelector" | "useDocumentInteractionOverlaysResult26" | "useDocumentInteractionOverlaysResult25" | "setInterval3" | "setEnabledState3" | "setEnabledState4" | "useDocumentInteractionOverlaysResult43" | "uniqueItems7" | "need" | "useDocumentInteractionOverlaysResult44" | "uniqueItems8" | "feed" | "useDocumentInteractionOverlaysResult36" | "onDown" | "clearDocumentHostStateDelete2" | "subscribe" | "useDocumentInteractionOverlaysResult38" | "useDocumentInteractionOverlaysResult41" | "connected" | "documentHostStateSeen" | "elementRef19" | "useDocumentInteractionOverlaysResult37" | "elementRef18" | "useDocumentInteractionOverlaysResult39" | "elementRef20" | "drop" | "updateDocumentInteractionsRang2" | "elementRef21" | "drop2" | "updateDocumentHostStatePictured2" | "elementRef22" | "useDocumentInteractionOverlaysResult40" | "elementRef23" | "of2" | "hasFocus" | "label" | "heard" | "ObservabilityBrowserAndOperationEventsWork" | "documentHostHealthMonitor" | "elementRef5" | "setDetachAsk" | "enabledRef" | "elementRef7" | "useDocumentInteractionOverlaysResult21" | "frameViewerSaveWord" | "fileId" | "useDocumentInteractionOverlaysResult45" | "useDocumentInteractionOverlaysResult33" | "frameViewerSelection" | "frameViewerDirty" | "frameViewerRev" | "useDocumentInteractionOverlaysResult24" | "request" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise">): Dynamic {
  return (({ ["close"]: ((..._extraArguments: unknown[]): undefined => {
                (window as Dynamic).removeEventListener(
                  `beforeunload`,
                  __documentClosure.waiting4,
                );
                if (__documentClosure.word?.current === __documentClosure.waiting3) {
                  __documentClosure.word.current = null;
                }
                (0, __documentClosure.resolveDocumentRuntimeUnsent)(
                  (document as Dynamic).documentElement,
                  __documentClosure.useDocumentInteractionOverlaysResult28?.[0] ?? 0,
                  __documentClosure.error2,
                  __documentClosure.elementRef3.current && {
                    ...__documentClosure.elementRef3.current,
                    report: __documentClosure.report,
                  },
                );
                (document as Dynamic).removeEventListener(
                  `keydown`,
                  __documentClosure.querySelector,
                  true,
                );
                (0, __documentClosure.useDocumentInteractionOverlaysResult26)();
                __documentClosure.useDocumentInteractionOverlaysResult25.drop();
                clearInterval(__documentClosure.setInterval3);
                (0, __documentClosure.setEnabledState3)(false);
                (0, __documentClosure.setEnabledState4)(false);
                clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult43);
                __documentClosure.uniqueItems7.delete(__documentClosure.need);
                (0, __documentClosure.useDocumentInteractionOverlaysResult44)();
                __documentClosure.uniqueItems8.delete(__documentClosure.feed);
                (0, __documentClosure.useDocumentInteractionOverlaysResult36)();
                (0, __documentClosure.onDown)();
                (0, __documentClosure.clearDocumentHostStateDelete2)();
                (0, __documentClosure.subscribe)();
                (0, __documentClosure.useDocumentInteractionOverlaysResult38)();
                __documentClosure.useDocumentInteractionOverlaysResult41.cancel();
                __documentClosure.uniqueItems8.delete(__documentClosure.connected);
                __documentClosure.documentHostStateSeen.close();
                if (__documentClosure.elementRef19.current === __documentClosure.documentHostStateSeen) {
                  __documentClosure.elementRef19.current = null;
                }
                __documentClosure.useDocumentInteractionOverlaysResult37.dispose();
                if (
                  __documentClosure.elementRef18.current ===
                  __documentClosure.useDocumentInteractionOverlaysResult37
                ) {
                  __documentClosure.elementRef18.current = null;
                }
                __documentClosure.useDocumentInteractionOverlaysResult39.dispose();
                if (
                  __documentClosure.elementRef20.current ===
                  __documentClosure.useDocumentInteractionOverlaysResult39
                ) {
                  __documentClosure.elementRef20.current = null;
                }
                (document as Dynamic).removeEventListener(
                  `visibilitychange`,
                  __documentClosure.drop,
                );
                __documentClosure.updateDocumentInteractionsRang2.dispose();
                if (__documentClosure.elementRef21.current === __documentClosure.updateDocumentInteractionsRang2) {
                  __documentClosure.elementRef21.current = null;
                }
                (document as Dynamic).removeEventListener(
                  `visibilitychange`,
                  __documentClosure.drop2,
                );
                __documentClosure.updateDocumentHostStatePictured2.dispose();
                if (__documentClosure.elementRef22.current === __documentClosure.updateDocumentHostStatePictured2) {
                  __documentClosure.elementRef22.current = null;
                }
                __documentClosure.useDocumentInteractionOverlaysResult40.dispose();
                if (
                  __documentClosure.elementRef23.current ===
                  __documentClosure.useDocumentInteractionOverlaysResult40
                ) {
                  __documentClosure.elementRef23.current = null;
                }
                __documentClosure.of2.removeEventListener(`message`, __documentClosure.hasFocus);
                __documentClosure.label = `none`;
                __documentClosure.heard = __documentClosure.ObservabilityBrowserAndOperationEventsWork;
                __documentClosure.documentHostHealthMonitor.portClosed();
                if (__documentClosure.elementRef5.current) {
                  __documentClosure.elementRef5.current.reply(false);
                  __documentClosure.elementRef5.current = null;
                  (0, __documentClosure.setDetachAsk)(null);
                }
                if (__documentClosure.enabledRef.current) {
                  __documentClosure.elementRef7.current = null;
                }
                let label4: Dynamic =
                  __documentClosure.elementRef7.current === `unsaved`
                    ? `bar`
                    : __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                          `saving` ||
                        __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                          `unsaved` ||
                        __documentClosure.useDocumentInteractionOverlaysResult21.paused()
                      ? `link`
                      : null;
                if (label4 !== null) {
                  (0, __documentClosure.frameViewerSaveWord)(label4, __documentClosure.fileId);
                }
                (0, __documentClosure.useDocumentInteractionOverlaysResult45)();
                if (__documentClosure.useDocumentInteractionOverlaysResult33) {
                  (0, __documentClosure.frameViewerSelection)(null);
                  (0, __documentClosure.frameViewerDirty)(false);
                  (0, __documentClosure.frameViewerRev)(null);
                }
                __documentClosure.useDocumentInteractionOverlaysResult24.clear();
                __documentClosure.request?.close();
                __documentClosure.request = null;
                (0, __documentClosure.setEnabledState)(
                  (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`port_closed`),
                );
              }) })["close"]);
}

export function createDocumentInteractionUpdateuseDocumentInteractionOverlaysResult221(__documentClosure: Pick<DocumentInteractionContext, "enabled" | "isDataModelSchemasUtterance" | "node" | "request" | "filterDataOperationControlSeq" | "isDataModelSchemasKind3" | "known" | "resolveDocumentHostStateValue7" | "elementRef19" | "resolveDataModelSchemasBlock2" | "elementRef18" | "elementRef21" | "elementRef20" | "elementRef23" | "elementRef22" | "resolveDocumentInteractionsValue" | "filterDocumentInteractionsTarget" | "resolveDataModelSchemasResults" | "sentOp" | "handed2" | "uniqueItems" | "shed" | "uniqueItems3" | "settle" | "resolveCommentsStoreLayer" | "useDocumentInteractionOverlaysResult5" | "isFrameArtifact" | "useDocumentInteractionOverlaysResult21" | "handed3" | "retryNow" | "documentInteractionsLimit1000">): Dynamic {
  return ((actor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!__documentClosure.enabled)
                if (actor.kind === `envelope`)
                  for (let useDocumentInteractionOverlaysResult24 of actor
                    .envelope.diff as Dynamic) {
                    let ref: Dynamic =
                      useDocumentInteractionOverlaysResult24.address?.ref;
                    if (ref?.object === `utterance`) {
                      if (
                        (0, __documentClosure.isDataModelSchemasUtterance)(
                          useDocumentInteractionOverlaysResult24,
                          __documentClosure.node,
                        )
                      ) {
                        __documentClosure.request?.need({
                          why: `comments`,
                        });
                      }
                      continue;
                    }
                    if (
                      !(ref?.object !== `node` || typeof ref.id != `string`)
                    ) {
                      if (ref.id === __documentClosure.node) {
                        let useDocumentInteractionOverlaysResult25: Dynamic =
                          (0, __documentClosure.filterDataOperationControlSeq)(
                            actor.envelope,
                            useDocumentInteractionOverlaysResult24.after,
                            __documentClosure.node,
                            actor.seq,
                          );
                        let actor2: Dynamic = (0, __documentClosure.isDataModelSchemasKind3)(
                          actor.envelope,
                        );
                        let rev: Dynamic = actor.envelope.edit?.rev;
                        let rev2: Dynamic =
                          typeof rev == `number`
                            ? rev
                            : typeof useDocumentInteractionOverlaysResult25?.rev ==
                                `number`
                              ? useDocumentInteractionOverlaysResult25.rev
                              : undefined;
                        try {
                          let matchesActor: Dynamic =
                            actor2 !== null && (0, __documentClosure.known)(actor.envelope, actor2);
                          if (actor2 !== null && !matchesActor) {
                            if (actor2.kind === `human`) {
                              (0, __documentClosure.resolveDocumentHostStateValue7)(actor2.principal);
                              __documentClosure.elementRef19.current?.wrote(actor2.principal);
                            }
                            let useDocumentInteractionOverlaysResult26: Dynamic =
                              (0, __documentClosure.resolveDataModelSchemasBlock2)(
                                actor.envelope,
                                useDocumentInteractionOverlaysResult25?.told,
                              );
                            __documentClosure.elementRef18.current?.landed(
                              actor2,
                              useDocumentInteractionOverlaysResult26.block,
                              rev2,
                              useDocumentInteractionOverlaysResult26.after,
                            );
                            if (actor2.kind === `agent`) {
                              __documentClosure.elementRef21.current?.rang(rev2);
                              __documentClosure.elementRef20.current?.landed();
                              __documentClosure.elementRef23.current?.landed();
                            }
                            __documentClosure.elementRef22.current?.rang(
                              [
                                rev2,
                                (0, __documentClosure.resolveDocumentInteractionsValue)(
                                  useDocumentInteractionOverlaysResult25?.told,
                                ),
                              ],
                              actor2.kind === `agent`,
                              (0, __documentClosure.filterDocumentInteractionsTarget)(
                                (0, __documentClosure.resolveDataModelSchemasResults)(
                                  actor.envelope,
                                  useDocumentInteractionOverlaysResult25?.told,
                                ),
                              ),
                            );
                            if (rev2 === undefined) {
                              __documentClosure.elementRef18.current?.gap();
                            }
                          } else if (rev2 === undefined) {
                            __documentClosure.elementRef18.current?.gap();
                          } else {
                            if (actor2 === null || !(0, __documentClosure.sentOp)(actor.envelope)) {
                              __documentClosure.elementRef18.current?.foreign(rev2);
                            } else {
                              __documentClosure.elementRef18.current?.heard(rev2);
                            }
                          }
                        } finally {
                          (0, __documentClosure.handed2)(useDocumentInteractionOverlaysResult25);
                        }
                      }
                      if (__documentClosure.uniqueItems.has(ref.id)) {
                        (0, __documentClosure.shed)(ref.id);
                      }
                      if (__documentClosure.uniqueItems3.has(ref.id)) {
                        (0, __documentClosure.settle)(ref.id);
                      }
                    }
                  }
                else if (actor.kind === `live` || actor.kind === `recovered`) {
                  (0, __documentClosure.resolveCommentsStoreLayer)(`feed`, actor.kind);
                  let askFacts = (..._extraArguments: unknown[]): undefined => {
                    __documentClosure.useDocumentInteractionOverlaysResult5 = undefined;
                    if (!__documentClosure.enabled) {
                      if (actor.kind === `recovered` && (0, __documentClosure.isFrameArtifact)()) {
                        __documentClosure.useDocumentInteractionOverlaysResult21.askFacts();
                      }
                      for (let useDocumentInteractionOverlaysResult24 of __documentClosure.uniqueItems as Dynamic)
                        (0, __documentClosure.shed)(useDocumentInteractionOverlaysResult24);
                      for (let useDocumentInteractionOverlaysResult24 of __documentClosure.uniqueItems3 as Dynamic)
                        (0, __documentClosure.settle)(useDocumentInteractionOverlaysResult24);
                      (0, __documentClosure.handed2)();
                    }
                  };
                  __documentClosure.elementRef18.current?.gap();
                  if (actor.kind === `recovered` && (0, __documentClosure.isFrameArtifact)()) {
                    __documentClosure.useDocumentInteractionOverlaysResult21.recovered();
                  }
                  (0, __documentClosure.handed3)(true);
                  (0, __documentClosure.retryNow)();
                  clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult5);
                  if (actor.kind === `live`) {
                    askFacts();
                  } else {
                    __documentClosure.useDocumentInteractionOverlaysResult5 = setTimeout(
                      askFacts,
                      __documentClosure.documentInteractionsLimit1000,
                    );
                  }
                } else if (actor.kind === `access-changed`) {
                  (0, __documentClosure.resolveCommentsStoreLayer)(`feed`, actor.kind);
                  __documentClosure.useDocumentInteractionOverlaysResult21.accessChanged();
                } else {
                  if (
                    actor.kind === `down` ||
                    actor.kind === `moving` ||
                    actor.kind === `revoked`
                  ) {
                    (0, __documentClosure.resolveCommentsStoreLayer)(`feed`, actor.kind);
                    clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult5);
                    __documentClosure.useDocumentInteractionOverlaysResult5 = undefined;
                    (0, __documentClosure.handed3)(false);
                  } else {
                    if (actor.kind === `presence`) {
                      __documentClosure.elementRef18.current?.presence(actor.frame);
                    } else {
                      if (actor.kind === `presence-leave`) {
                        __documentClosure.elementRef18.current?.left(
                          actor.principal,
                          actor.connId,
                        );
                      } else {
                        if (actor.kind === `stream`) {
                          if (
                            actor.frame.ref.object === `node` &&
                            actor.frame.ref.id === __documentClosure.node
                          ) {
                            __documentClosure.request?.stream(actor.frame);
                          }
                        } else {
                          if (
                            actor.kind === `stream-refused` &&
                            actor.frame.ref.object === `node` &&
                            actor.frame.ref.id === __documentClosure.node
                          ) {
                            __documentClosure.request?.streamRefused(actor.frame);
                          }
                        }
                      }
                    }
                  }
                }
            });
}

export function createDocumentInteractionRender22(__documentClosure: Pick<DocumentInteractionContext, "enabled" | "DocumentHostStateClosed" | "pid" | "useDocumentInteractionOverlaysHandler3" | "useDocumentInteractionOverlaysResult3" | "useDocumentInteractionOverlaysResult2" | "useDocumentInteractionOverlaysResult4" | "useDocumentInteractionOverlaysResult5" | "useDocumentInteractionOverlaysHandler" | "DocumentInteractionsState4" | "useDocumentInteractionOverlaysResult6" | "items" | "mountGen" | "elementRef4" | "setRescues" | "isDocumentInteractionsStringify" | "resolveCommentsStoreLayer" | "elementRef3" | "elementRef11" | "setItems" | "elementRef13" | "elementRef16" | "elementRef12" | "graftEmbedProse" | "rereadWidget">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
        __documentClosure.enabled = true;
        try {
          (0, __documentClosure.DocumentHostStateClosed)(__documentClosure.pid);
        } catch {}
        (0, __documentClosure.useDocumentInteractionOverlaysHandler3)();
        (0, __documentClosure.useDocumentInteractionOverlaysResult3)?.();
        (0, __documentClosure.useDocumentInteractionOverlaysResult2)?.();
        clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult4);
        clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult5);
        (0, __documentClosure.useDocumentInteractionOverlaysHandler)();
        __documentClosure.DocumentInteractionsState4.drop();
        clearTimeout(__documentClosure.useDocumentInteractionOverlaysResult6);
        let take: Dynamic = __documentClosure.items?.take(__documentClosure.mountGen) ?? null;
        if (take !== null) {
          let element: Dynamic = __documentClosure.elementRef4.current(take.to);
          if (element.moved.length > 0) {
            (0, __documentClosure.setRescues)(
              (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                (0, __documentClosure.isDocumentInteractionsStringify)(
                  documentInteractionOverlays,
                  element.moved,
                ),
            );
          }
          (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `orphan_remount`, {
            carried: element.moved.length,
            found: element.found,
          });
          __documentClosure.elementRef3.current = {
            found: element.found,
            moved: element.moved.length,
          };
        }
        try {
          __documentClosure.elementRef11.current?.close();
        } finally {
          __documentClosure.elementRef11.current = null;
          __documentClosure.elementRef3.current = null;
        }
        if (take !== null) {
          __documentClosure.setItems?.drop(__documentClosure.mountGen);
        }
        __documentClosure.elementRef13.current();
        __documentClosure.elementRef13.current = (..._extraArguments: unknown[]): undefined => {};
        __documentClosure.elementRef16.current = (..._extraArguments: unknown[]): undefined => {};
        __documentClosure.elementRef12.current = (..._extraArguments: unknown[]): undefined => {};
        __documentClosure.graftEmbedProse.current = (
          ..._extraArguments: unknown[]
        ): undefined => {};
        __documentClosure.rereadWidget.current = (..._extraArguments: unknown[]): undefined => {};
        __documentClosure.elementRef4.current = (..._extraArguments: unknown[]): Dynamic => ({
          found: 0,
          moved: [],
        });
      });
}

/** BaoCut: extracted document interaction connection expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";

export function createDocumentInteractionUpdategraftEmbedProse_current8(__documentClosure: Pick<DocumentInteractionContext, "enabled" | "resolveWidgetBridgeValue3" | "lookup3" | "uniqueItems3" | "lookup2" | "useDocumentInteractionOverlaysHandler5" | "settle">): Dynamic {
  return ((
            documentInteractionOverlays?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (__documentClosure.enabled) return;
            let uniqueItems9: Dynamic = new (Set as Dynamic)();
            for (let useDocumentInteractionOverlaysResult24 of options2 as Dynamic) {
              let widgetBridgeValue3: Dynamic = (0, __documentClosure.resolveWidgetBridgeValue3)(
                useDocumentInteractionOverlaysResult24,
              );
              if (widgetBridgeValue3 !== undefined) {
                uniqueItems9.add(widgetBridgeValue3);
              }
            }
            __documentClosure.lookup3.set(documentInteractionOverlays, uniqueItems9);
            let uniqueItems10: Dynamic = new (Set as Dynamic)();
            for (let useDocumentInteractionOverlaysResult24 of __documentClosure.lookup3.values() as Dynamic)
              for (let useDocumentInteractionOverlaysResult25 of useDocumentInteractionOverlaysResult24 as Dynamic)
                uniqueItems10.add(useDocumentInteractionOverlaysResult25);
            let enabled4 = false;
            for (let useDocumentInteractionOverlaysResult24 of __documentClosure.uniqueItems3 as Dynamic)
              if (
                !uniqueItems10.has(useDocumentInteractionOverlaysResult24) &&
                __documentClosure.lookup2.delete(useDocumentInteractionOverlaysResult24)
              ) {
                enabled4 = true;
              }
            let items2: Dynamic = [];
            for (let useDocumentInteractionOverlaysResult24 of uniqueItems10 as Dynamic)
              if (!__documentClosure.uniqueItems3.has(useDocumentInteractionOverlaysResult24)) {
                items2.push(useDocumentInteractionOverlaysResult24);
              }
            __documentClosure.uniqueItems3.clear();
            for (let useDocumentInteractionOverlaysResult24 of uniqueItems10 as Dynamic)
              __documentClosure.uniqueItems3.add(useDocumentInteractionOverlaysResult24);
            if (enabled4) {
              (0, __documentClosure.useDocumentInteractionOverlaysHandler5)();
            }
            for (let useDocumentInteractionOverlaysResult24 of items2 as Dynamic)
              (0, __documentClosure.settle)(useDocumentInteractionOverlaysResult24);
          });
}

export function createDocumentInteractionUpdateListLevelsMax9(__documentClosure: Pick<DocumentInteractionContext, "record" | "caps" | "resolvePlatformSyncAndRoutingVerb2" | "useDocumentInteractionOverlaysResult18">): Dynamic {
  return (({ ["updateListLevelsMax"]: ((
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            Object.assign(__documentClosure.record, documentInteractionOverlays);
            for (let useDocumentInteractionOverlaysResult24 of [
              `oneOrder`,
              `arm`,
              `stream`,
              `opsOnFeed`,
            ] as Dynamic)
              if (
                documentInteractionOverlays[
                  useDocumentInteractionOverlaysResult24
                ] === undefined
              ) {
                delete __documentClosure.caps[useDocumentInteractionOverlaysResult24];
              } else {
                __documentClosure.caps[useDocumentInteractionOverlaysResult24] =
                  documentInteractionOverlays[
                    useDocumentInteractionOverlaysResult24
                  ];
              }
            if (documentInteractionOverlays.reviveChars) {
              __documentClosure.caps.reviveChars = true;
            } else {
              delete __documentClosure.caps.reviveChars;
            }
            if (documentInteractionOverlays.reviveText) {
              __documentClosure.caps.reviveText = true;
            } else {
              delete __documentClosure.caps.reviveText;
            }
            if (documentInteractionOverlays.reviveBlocks) {
              __documentClosure.caps.reviveBlocks = true;
            } else {
              delete __documentClosure.caps.reviveBlocks;
            }
            if (documentInteractionOverlays.splitResurrect) {
              __documentClosure.caps.splitResurrect = true;
            } else {
              delete __documentClosure.caps.splitResurrect;
            }
            if (documentInteractionOverlays.idsInline) {
              __documentClosure.caps.idsInline = true;
            } else {
              delete __documentClosure.caps.idsInline;
            }
            if (documentInteractionOverlays.idsRequired) {
              __documentClosure.caps.idsRequired = true;
            } else {
              delete __documentClosure.caps.idsRequired;
            }
            if (documentInteractionOverlays.markIds) {
              __documentClosure.caps.markIds = true;
            } else {
              delete __documentClosure.caps.markIds;
            }
            for (let useDocumentInteractionOverlaysResult24 of [
              `wrapFinal`,
              `joinDir`,
              `splitBeforeAtom`,
              `insertEach`,
            ] as Dynamic)
              if (
                documentInteractionOverlays[
                  useDocumentInteractionOverlaysResult24
                ]
              ) {
                __documentClosure.caps[useDocumentInteractionOverlaysResult24] = true;
              } else {
                delete __documentClosure.caps[useDocumentInteractionOverlaysResult24];
              }
            if (documentInteractionOverlays.mentionLabel) {
              __documentClosure.caps.mentionLabel = true;
            } else {
              delete __documentClosure.caps.mentionLabel;
            }
            if (documentInteractionOverlays.personLabel) {
              __documentClosure.caps.personLabel = true;
            } else {
              delete __documentClosure.caps.personLabel;
            }
            if (documentInteractionOverlays.highlightColour) {
              __documentClosure.caps.highlightColour = true;
            } else {
              delete __documentClosure.caps.highlightColour;
            }
            if (documentInteractionOverlays.hrefFragment) {
              __documentClosure.caps.hrefFragment = true;
            } else {
              delete __documentClosure.caps.hrefFragment;
            }
            if (documentInteractionOverlays.atRevPaging === undefined) {
              delete __documentClosure.caps.atRevPaging;
            } else {
              __documentClosure.caps.atRevPaging = documentInteractionOverlays.atRevPaging;
            }
            if (documentInteractionOverlays.depthMax === undefined) {
              delete __documentClosure.caps.depthMax;
            } else {
              __documentClosure.caps.depthMax = documentInteractionOverlays.depthMax;
            }
            if (documentInteractionOverlays.listLevelsMax === undefined) {
              delete __documentClosure.caps.listLevelsMax;
            } else {
              __documentClosure.caps.listLevelsMax = documentInteractionOverlays.listLevelsMax;
            }
            (0, __documentClosure.resolvePlatformSyncAndRoutingVerb2)(
              {
                clientEvent: documentInteractionOverlays.clientEvent,
                clientEventFields:
                  documentInteractionOverlays.clientEventFields,
                clientEventCodes: documentInteractionOverlays.clientEventCodes,
              },
              `card`,
            );
            __documentClosure.useDocumentInteractionOverlaysResult18 =
              documentInteractionOverlays.landed === true;
          }) })["updateListLevelsMax"]);
}

export function createDocumentInteractionShadow10(__documentClosure: Pick<DocumentInteractionContext, "DocumentInteractionsThen" | "useDocumentInteractionOverlaysResult20" | "isFrameArtifact" | "pid" | "ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c" | "liveSupportCode" | "session" | "births" | "isDocumentInteractionsValue" | "resolveObservabilityBrowserAndOperationEventsValue2" | "resolveEditorExtensionsTest2" | "serverRev" | "record" | "frameLane" | "emitTelemetryEvent">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic =>
              (0, __documentClosure.DocumentInteractionsThen)().then(
                (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                  (__documentClosure.useDocumentInteractionOverlaysResult20 = result.LAW),
                  result.openRefusalShadow(
                    {
                      surface: (0, __documentClosure.isFrameArtifact)() ? `frame` : `standalone`,
                      page: __documentClosure.pid,
                      feBuild:
                        __documentClosure.ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
                      supportCode: (0, __documentClosure.liveSupportCode)(),
                      session: (..._extraArguments: unknown[]): Dynamic =>
                        __documentClosure.session.get()?.label,
                      births: __documentClosure.births,
                      now: (..._extraArguments: unknown[]) => Date.now(),
                      loweringShadow: __documentClosure.isDocumentInteractionsValue,
                      browser:
                        __documentClosure.resolveObservabilityBrowserAndOperationEventsValue2,
                      doorBuild: (..._extraArguments: unknown[]) =>
                        (0, __documentClosure.resolveEditorExtensionsTest2)(
                          (0, __documentClosure.serverRev)(),
                          __documentClosure.record.schemaHash,
                        ),
                      weather: (..._extraArguments: unknown[]): Dynamic => {
                        let navigator2: Dynamic = (globalThis as Dynamic)
                          .navigator;
                        let record3: Dynamic =
                          typeof navigator2?.onLine == `boolean`
                            ? {
                                online: navigator2.onLine,
                              }
                            : {};
                        if ((0, __documentClosure.isFrameArtifact)()) {
                          let useDocumentInteractionOverlaysResult24: Dynamic =
                            (0, __documentClosure.frameLane)(`project/${__documentClosure.pid}`);
                          record3.laneOpen =
                            !useDocumentInteractionOverlaysResult24.connecting &&
                            useDocumentInteractionOverlaysResult24.state !==
                              `dead`;
                        }
                        return record3;
                      },
                    },
                    __documentClosure.emitTelemetryEvent,
                  )
                ),
              ));
}

export function createDocumentInteractionClaimed11(__documentClosure: Pick<DocumentInteractionContext, "DocumentHostStateClaimed" | "pid" | "resolveObservabilityBrowserAndOperationEventsRenamed" | "emitTelemetryEvent" | "createPagesCustodyClaimedEvent" | "frameHotFrom" | "useDocumentInteractionOverlaysResult12" | "isPlatformFrameAndCapabilitiesWindow">): Dynamic {
  return (({ ["claimed"]: ((
                documentInteractionOverlays?: Dynamic,
                options2?: Dynamic,
                context2?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                try {
                  if (context2 !== `renamed`) {
                    (0, __documentClosure.DocumentHostStateClaimed)(
                      __documentClosure.pid,
                      documentInteractionOverlays,
                      options2,
                      context2,
                    );
                  }
                } catch {}
                if (
                  !(0, __documentClosure.resolveObservabilityBrowserAndOperationEventsRenamed)(
                    context2,
                    documentInteractionOverlays,
                  )
                )
                  return;
                if (context2 !== undefined)
                  return void (0, __documentClosure.emitTelemetryEvent)(
                    (0, __documentClosure.createPagesCustodyClaimedEvent)(
                      context2,
                      documentInteractionOverlays,
                      options2,
                    ),
                  );
                let useDocumentInteractionOverlaysResult24: Dynamic =
                  (0, __documentClosure.frameHotFrom)();
                if (
                  __documentClosure.useDocumentInteractionOverlaysResult12 ||
                  (0, __documentClosure.isPlatformFrameAndCapabilitiesWindow)() ||
                  (useDocumentInteractionOverlaysResult24 !== null &&
                    useDocumentInteractionOverlaysResult24 !== `boot`)
                ) {
                  (0, __documentClosure.emitTelemetryEvent)(
                    (0, __documentClosure.createPagesCustodyClaimedEvent)(
                      useDocumentInteractionOverlaysResult24,
                      documentInteractionOverlays,
                      options2,
                    ),
                  );
                }
              }) })["claimed"]);
}

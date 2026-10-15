/** BaoCut: extracted document interaction connection-2 expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentInteractionContext } from "./docs-app-interaction-context";
import { createDocumentInteractionError213, createDocumentInteractionString314, createDocumentInteractionReport215, createDocumentInteractionDocumentHostStateSeen16 } from "./docs-app-interaction-transport";
import { createDocumentInteractionOnDown17 } from "./docs-app-interaction-messages";
import { createDocumentInteractionHasFocus18 } from "./docs-app-interaction-bridge";
import { createDocumentInteractionQuerySelector19, createDocumentInteractionClose20 } from "./docs-app-interaction-shutdown";

export function createDocumentInteractionUpdateelementRef12_current12(__documentClosure: Pick<DocumentInteractionContext, "setItems" | "mountGen" | "enabled" | "elementRef11" | "waiting" | "setNotice" | "setUseDocumentInteractionOverlaysState" | "setRescues" | "request" | "useDocumentInteractionOverlaysResult21" | "node" | "elementRef9" | "body" | "isPlatformKeyboardAndSaveStatusDown" | "resolveDataOperationControlValue11" | "resolvePlatformAnnouncementsToUpperCase" | "quoteRecoveryPreview" | "resolveCommentsStoreAround" | "resolveCommentsStoreLayer" | "resolvePlatformKeyboardAndSaveStatusShow" | "resolvePlatformLiveDocumentAndHistoryValue20" | "toast" | "resolveCommentsStoreValue30" | "openDebugReportDialog" | "resolvePlatformKeyboardAndSaveStatusDrop" | "onLiveReconnecting" | "PlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusJudge" | "filterPlatformKeyboardAndSaveStatusJudge" | "setSave" | "resolvePlatformKeyboardAndSaveStatusWhy" | "pileOwed" | "resolvePlatformKeyboardAndSaveStatusPending" | "setEnabledState3" | "frameViewerSaveWord" | "isPlatformKeyboardAndSaveStatusSaved" | "isPlatformKeyboardAndSaveStatusClear" | "elementRef7" | "fileId" | "emitTelemetryEvent" | "setBar" | "documentRuntimeLimit0" | "labelRef" | "resolveDocumentInteractionsValue3" | "resolveDocumentRuntimeValue" | "resolveDataModelSchemasResolved" | "useCommentStore" | "commentSummonHost" | "isCommentsEditorRank" | "knownBlocksRef" | "summonHostRef" | "resolveEditorExtensionsAnchor2" | "frameLane" | "pid" | "resolveCommentsStoreValue33" | "resolveCommentsStoreBid" | "resolveDocumentHostStateValue10" | "useDocumentInteractionOverlaysHandler6" | "resolveDocumentHostStateValue8" | "resolveDocumentHostStateKnown" | "isFrameArtifact" | "frameFenceAuthor" | "viewerId2" | "email" | "resolvePlatformApiAndAuthAnon" | "resolveDocumentHostStateSeen" | "createDocumentHostCoordinator" | "DocumentInteractionsState8" | "installPlatformApiAndAuthPagehide" | "PlatformApiAndAuthParticipants" | "resolveDocumentHostStateFeedUp" | "feedUp" | "frameLaneLink" | "resolvePlatformAnnouncementsValue" | "DocumentInteractionsHere" | "resolvePlatformAnnouncementsValue2" | "resolveDocumentInteractionsValue4" | "resolveDocumentHostStateValue" | "uniqueItems8" | "isDataModelSchemasColor" | "resolveDocumentRuntimeIsArray" | "wholeDocRef" | "elementRef18" | "elementRef19" | "subscribeDataModelSchemasWorking" | "frameClaudeWorking" | "subscribeFrameClaudeActivity" | "resolvePlatformAnnouncementsPictured" | "resolveObservabilityBootChat" | "isEditorExtensionsValue" | "isEditorExtensionsLocation" | "frameHostChromeWitnessed" | "frameConversationPane" | "hostSays" | "resolvePlatformAnnouncementsFind" | "elementRef20" | "updateDocumentInteractionsRang" | "resolveObservabilityBrowserAndOperationEventsValue13" | "resolveObservabilityBrowserAndOperationEventsValue3" | "elementRef21" | "updateDocumentHostStatePictured" | "resolveDocumentInteractionsValue2" | "resolveObservabilityBrowserAndOperationEventsValue14" | "elementRef22" | "resolvePlatformAnnouncementsPictured2" | "resolvePlatformFeatureFlagsEnabled2" | "resolvePlatformAnnouncementsFloor" | "elementRef23" | "resolvePlatformLiveDocumentAndHistoryCancel" | "resolveDocumentHostStateKey" | "resolveDocumentHostStateValue7" | "resolvePlatformAnnouncementsPrincipal" | "clearDocumentHostStateDelete" | "resolveCommentsStoreBlocks" | "DocumentInteractionsState4" | "documentHostHealthMonitor" | "frameViewerEdit" | "frameViewerRev" | "record" | "resolvePlatformLiveDocumentAndHistoryPartial" | "updatePlatformLiveDocumentAndHistorySeated" | "resolvePlatformLiveDocumentAndHistoryValue24" | "resolvePlatformKeyboardAndSaveStatusAssert" | "resolvePlatformKeyboardAndSaveStatusCount" | "resolvePlatformKeyboardAndSaveStatusWhy2" | "isPlatformKeyboardAndSaveStatusLimit" | "resolvePlatformKeyboardAndSaveStatusKeptAsText" | "isPlatformKeyboardAndSaveStatusText" | "DocumentHostStateLines" | "isPlatformKeyboardAndSaveStatusFilter" | "DocumentHostStateHanded" | "resolvePlatformKeyboardAndSaveStatusBid2" | "resolvePlatformKeyboardAndSaveStatusFolds" | "resolvePlatformKeyboardAndSaveStatusUnknownId" | "resolveDataOperationControlValue12" | "resolvePlatformKeyboardAndSaveStatusFace" | "setBar2" | "DataOperationControlNodeGone2" | "setNodeGone" | "useDocumentInteractionOverlaysHandler3" | "setError" | "setSaveWords" | "setEnabledState2" | "resolveDocumentRuntimeState" | "enabledRef" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise" | "resolvePlatformKeyboardAndSaveStatusMoved" | "resolvePlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusNotice" | "pageGoneWhy2" | "retryNow" | "resolveDataModelSchemasBlock" | "resolveCommentsActionsAndSelectionFrom" | "DocumentHostStatePictured" | "setPageShape" | "resolveCommentAnchorsWhole" | "isDocumentHostStateIsArray" | "isDocumentRuntimeReason" | "resolvePlatformAnnouncementsValue10" | "isPlatformAnnouncementsValue" | "createPagesFaceUndoEvent" | "createPagesEditorLockedEvent" | "isDocumentRuntimeText" | "createPagesOutboxDroppedEvent" | "resolvePlatformKeyboardAndSaveStatusKept" | "isPlatformKeyboardAndSaveStatusPenOff" | "resolveDocumentRuntimeValue5" | "resolveDocumentRuntimeIsArray2" | "shed2" | "resolveDocumentRuntimeValue4" | "isDocumentRuntimeToken" | "elementRef5" | "setDetachAsk" | "resolveEditorMediaValue2" | "nudgeLiveDoor" | "elementRef6" | "isDocumentInteractionsValue" | "filterPlatformLiveDocumentAndHistoryRevive" | "resolveObservabilityBootPaint2" | "moved" | "documentHostStateValue2" | "resolvePlatformKeyboardAndSaveStatusBid" | "resolveDocumentInteractionsTray" | "createPagesWriteGateRefusedCappedEvent" | "heard" | "resolveObservabilityBrowserAndOperationEventsWork" | "resolveObservabilityBrowserAndOperationEventsComplete" | "label" | "resolveObservabilityBrowserAndOperationEventsValue8" | "filterDocumentRuntimeStale" | "frameViewerDirty" | "frameViewerSelection" | "updateObservabilityBrowserAndOperationEventsSelected" | "resolveDocumentHostStateNode" | "contextRef" | "updateFrameGesturesAnchor" | "documentScrollKey" | "resolvePlatformKeyboardAndSaveStatusKeys" | "DocumentInteractionsState7" | "PlatformAnnouncementsLive" | "useDocumentInteractionOverlaysResult17" | "uniqueItems7" | "updatePlatformLiveDocumentAndHistoryNobody" | "PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision" | "useDocumentInteractionOverlaysHandler7" | "resolvePlatformKeyboardAndSaveStatusUnsaved2" | "dependenciesRef" | "frameViewerSaveLive" | "resolvePlatformKeyboardAndSaveStatusLink" | "elementRef14" | "setSaveLive" | "resolveDocumentHostStateReadonly" | "DocumentInteractionsOpened" | "resolvePlatformKeyboardAndSaveStatusValue6" | "isPlatformFrameAndCapabilitiesWindow" | "resolvePlatformKeyboardAndSaveStatusKey" | "resolvePlatformKeyboardAndSaveStatusBody" | "filterPlatformKeyboardAndSaveStatusNext" | "isDocumentFocusedElsewhere" | "resolveDocumentRuntimeUnsent" | "elementRef3" | "setEnabledState4" | "ObservabilityBrowserAndOperationEventsWork">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
            let of2: Dynamic = __documentClosure.setItems?.of(__documentClosure.mountGen) ?? null;
            if (__documentClosure.enabled || !of2 || __documentClosure.elementRef11.current) return;
            let waiting2: Dynamic = (0, __documentClosure.waiting)();
            (0, __documentClosure.setNotice)(waiting2);
            (0, __documentClosure.setUseDocumentInteractionOverlaysState)(null);
            (0, __documentClosure.setRescues)(
              (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                documentInteractionOverlays.some(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    item.penOff,
                )
                  ? documentInteractionOverlays.filter(
                      (item?: Dynamic, ..._extraArguments: unknown[]) =>
                        !item.penOff,
                    )
                  : documentInteractionOverlays,
            );
            __documentClosure.request = __documentClosure.useDocumentInteractionOverlaysResult21.open(__documentClosure.node);
            __documentClosure.elementRef9.current = (
              bid?: Dynamic,
              afterId?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              __documentClosure.request?.words({
                bid: bid,
                afterId: afterId,
                text: ``,
                only: true,
              });
            let down: Dynamic = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              of2.postMessage({
                ...documentInteractionOverlays,
                node: __documentClosure.body,
              });
            let request2: Dynamic = null;
            let useDocumentInteractionOverlaysResult24: Dynamic =
              (0, __documentClosure.isPlatformKeyboardAndSaveStatusDown)();
            let String2 = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let documentElement: Dynamic = (document as Dynamic)
                .documentElement;
              documentElement.dataset.lfileDenied = String(
                Number(documentElement.dataset.lfileDenied ?? 0) + 1,
              );
              documentElement.dataset.lfileDeniedLast =
                documentInteractionOverlays;
            };
            let error2 = createDocumentInteractionError213({
  get String2() { return String2; },
  get resolveDataOperationControlValue11() { return __documentClosure.resolveDataOperationControlValue11; },
  get halted() { return halted; }, set halted(__nextDocumentClosureValue: Dynamic) { halted = __nextDocumentClosureValue; },
  get retrying() { return retrying; }, set retrying(__nextDocumentClosureValue: Dynamic) { retrying = __nextDocumentClosureValue; },
  get haltWords() { return haltWords; }, set haltWords(__nextDocumentClosureValue: Dynamic) { haltWords = __nextDocumentClosureValue; },
  get resolvePlatformAnnouncementsToUpperCase() { return __documentClosure.resolvePlatformAnnouncementsToUpperCase; },
  get quoteRecoveryPreview() { return __documentClosure.quoteRecoveryPreview; },
  get resolveCommentsStoreAround() { return __documentClosure.resolveCommentsStoreAround; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get resolvePlatformKeyboardAndSaveStatusShow() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusShow; },
  get request2() { return request2; }, set request2(__nextDocumentClosureValue: Dynamic) { request2 = __nextDocumentClosureValue; },
  get resolvePlatformLiveDocumentAndHistoryValue20() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryValue20; },
  get toast() { return __documentClosure.toast; },
  get resolveCommentsStoreValue30() { return __documentClosure.resolveCommentsStoreValue30; },
  get openDebugReportDialog() { return __documentClosure.openDebugReportDialog; },
});
            let info = (
              documentInteractionOverlays?: Dynamic,
              reason?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              (document as Dynamic).documentElement.dataset.lfileNotice =
                documentInteractionOverlays;
              (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `notice`, {
                reason: reason,
              });
              try {
                __documentClosure.toast.info(documentInteractionOverlays, {
                  id: `prose-notice`,
                  duration: 6e3,
                });
              } catch {}
            };
            let useDocumentInteractionOverlaysResult25: Dynamic =
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusDrop)({
                setTimeout: (
                  documentInteractionOverlays?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => setTimeout(documentInteractionOverlays, options2),
                clearTimeout: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => clearTimeout(documentInteractionOverlays),
              });
            let useDocumentInteractionOverlaysResult26: Dynamic =
              (0, __documentClosure.onLiveReconnecting)(
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (!__documentClosure.enabled) {
                    useDocumentInteractionOverlaysResult25.hold(
                      documentInteractionOverlays,
                    );
                  }
                },
              );
            let settled: Dynamic = 0;
            let halted: Dynamic = false;
            let openFailed: Dynamic = false;
            let enabled4: Dynamic = false;
            let useDocumentInteractionOverlaysResult27: Dynamic =
              __documentClosure.PlatformKeyboardAndSaveStatusBusy;
            let setNotice2 = (..._extraArguments: unknown[]): undefined => {
              if (enabled4) {
                enabled4 = false;
                (0, __documentClosure.setUseDocumentInteractionOverlaysState)(null);
                (0, __documentClosure.setNotice)(matchesWaiting ? (0, __documentClosure.waiting)() : null);
              }
            };
            let setNotice3 = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              enabled4 = false;
              (0, __documentClosure.setUseDocumentInteractionOverlaysState)(null);
              (0, __documentClosure.setNotice)(documentInteractionOverlays);
            };
            let retrying: Dynamic = false;
            let haltWords: Dynamic = null;
            let matchesWaiting: Dynamic = waiting2 !== null;
            let useDocumentInteractionOverlaysResult28: Dynamic = null;
            let report: Dynamic = null;
            let useDocumentInteractionOverlaysResult29: Dynamic = null;
            let linkSaving: Dynamic =
              __documentClosure.useDocumentInteractionOverlaysResult21.state() === `saving`;
            let linkUnsaved: Dynamic =
              __documentClosure.useDocumentInteractionOverlaysResult21.state() === `unsaved`;
            let useDocumentInteractionOverlaysResult30: Dynamic =
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusJudge)();
            let useDocumentInteractionOverlaysResult31: Dynamic = null;
            let useDocumentInteractionOverlaysResult32: Dynamic =
              (0, __documentClosure.filterPlatformKeyboardAndSaveStatusJudge)();
            let String3 = createDocumentInteractionString314({
  get useDocumentInteractionOverlaysResult31() { return useDocumentInteractionOverlaysResult31; }, set useDocumentInteractionOverlaysResult31(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult31 = __nextDocumentClosureValue; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get linkSaving() { return linkSaving; }, set linkSaving(__nextDocumentClosureValue: Dynamic) { linkSaving = __nextDocumentClosureValue; },
  get linkUnsaved() { return linkUnsaved; }, set linkUnsaved(__nextDocumentClosureValue: Dynamic) { linkUnsaved = __nextDocumentClosureValue; },
  get setSave() { return __documentClosure.setSave; },
});
            let report2 = createDocumentInteractionReport215({
  get useDocumentInteractionOverlaysResult28() { return useDocumentInteractionOverlaysResult28; }, set useDocumentInteractionOverlaysResult28(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult28 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult29() { return useDocumentInteractionOverlaysResult29; }, set useDocumentInteractionOverlaysResult29(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult29 = __nextDocumentClosureValue; },
  get resolvePlatformKeyboardAndSaveStatusWhy() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy; },
  get pileOwed() { return __documentClosure.pileOwed; },
  get resolvePlatformKeyboardAndSaveStatusPending() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusPending; },
  get halted() { return halted; }, set halted(__nextDocumentClosureValue: Dynamic) { halted = __nextDocumentClosureValue; },
  get retrying() { return retrying; }, set retrying(__nextDocumentClosureValue: Dynamic) { retrying = __nextDocumentClosureValue; },
  get openFailed() { return openFailed; }, set openFailed(__nextDocumentClosureValue: Dynamic) { openFailed = __nextDocumentClosureValue; },
  get linkSaving() { return linkSaving; }, set linkSaving(__nextDocumentClosureValue: Dynamic) { linkSaving = __nextDocumentClosureValue; },
  get linkUnsaved() { return linkUnsaved; }, set linkUnsaved(__nextDocumentClosureValue: Dynamic) { linkUnsaved = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult27() { return useDocumentInteractionOverlaysResult27; }, set useDocumentInteractionOverlaysResult27(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult27 = __nextDocumentClosureValue; },
  get quoteRecoveryPreview() { return __documentClosure.quoteRecoveryPreview; },
  get setEnabledState3() { return __documentClosure.setEnabledState3; },
  get useDocumentInteractionOverlaysResult30() { return useDocumentInteractionOverlaysResult30; },
  get String3() { return String3; },
  get frameViewerSaveWord() { return __documentClosure.frameViewerSaveWord; },
  get isPlatformKeyboardAndSaveStatusSaved() { return __documentClosure.isPlatformKeyboardAndSaveStatusSaved; },
  get isPlatformKeyboardAndSaveStatusClear() { return __documentClosure.isPlatformKeyboardAndSaveStatusClear; },
  get elementRef7() { return __documentClosure.elementRef7; },
  get fileId() { return __documentClosure.fileId; },
  get useDocumentInteractionOverlaysResult32() { return useDocumentInteractionOverlaysResult32; },
  get useDocumentInteractionOverlaysResult21() { return __documentClosure.useDocumentInteractionOverlaysResult21; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
  get setBar() { return __documentClosure.setBar; },
  get setRescues() { return __documentClosure.setRescues; },
  get documentRuntimeLimit0() { return __documentClosure.documentRuntimeLimit0; }, set documentRuntimeLimit0(__nextDocumentClosureValue: Dynamic) { __documentClosure.documentRuntimeLimit0 = __nextDocumentClosureValue; },
  get labelRef() { return __documentClosure.labelRef; },
  get resolveDocumentInteractionsValue3() { return __documentClosure.resolveDocumentInteractionsValue3; },
  get resolveDocumentRuntimeValue() { return __documentClosure.resolveDocumentRuntimeValue; },
  get useDocumentInteractionOverlaysResult25() { return useDocumentInteractionOverlaysResult25; },
  get settled() { return settled; }, set settled(__nextDocumentClosureValue: Dynamic) { settled = __nextDocumentClosureValue; },
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get report2() { return report2; },
});
            let seatDoorList = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let useDocumentInteractionOverlaysResult47: Dynamic =
                (0, __documentClosure.resolveDataModelSchemasResolved)(
                  documentInteractionOverlays,
                  __documentClosure.fileId,
                  `f-${__documentClosure.fileId}#${__documentClosure.body}`,
                );
              __documentClosure.useCommentStore
                .getState()
                .seatDoorList(__documentClosure.fileId, useDocumentInteractionOverlaysResult47);
            };
            // BaoCut: 批注发给智能体时用来定位块（anchor.path 与 x / y），独立页面装了 docsHost.comments 时也提供。
            // 独立页面里 anchorStartOf 照样从本地的批注缓存读到起点，path 形如 `f-<标签页>#<节点>/<块>@0-6;thread=<批注 id>`。
            let useDocumentInteractionOverlaysResult33: Dynamic =
              (0, __documentClosure.commentSummonHost)();
            let useDocumentInteractionOverlaysResult34: Dynamic =
              (0, __documentClosure.isCommentsEditorRank)();
            let map: Dynamic = useDocumentInteractionOverlaysResult34.map;
            __documentClosure.knownBlocksRef.current = useDocumentInteractionOverlaysResult33
              ? map
              : null;
            __documentClosure.summonHostRef.current = useDocumentInteractionOverlaysResult33
              ? {
                  blockOfChar:
                    useDocumentInteractionOverlaysResult34.blockOfChar,
                  anchorStartOf: (
                    documentInteractionOverlays?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    try {
                      let anchor: Dynamic = (0, __documentClosure.resolveEditorExtensionsAnchor2)(
                        (0, __documentClosure.frameLane)(`project/${__documentClosure.pid}`).read({
                          object: `utterance`,
                          id: documentInteractionOverlays,
                        }),
                      )?.anchor;
                      let range: Dynamic =
                        typeof anchor == `object` &&
                        anchor &&
                        anchor.kind === `chars`
                          ? anchor.range
                          : undefined;
                      return Array.isArray(range) && typeof range[0] == `string`
                        ? range[0]
                        : null;
                    } catch {
                      return null;
                    }
                  },
                }
              : null;
            let useDocumentInteractionOverlaysResult35: Dynamic = null;
            let useDocumentInteractionOverlaysResult36: Dynamic =
              (0, __documentClosure.resolveCommentsStoreValue33)(
                (..._extraArguments: unknown[]): Dynamic =>
                  useDocumentInteractionOverlaysResult35
                    ? {
                        rev: useDocumentInteractionOverlaysResult35.rev,
                        blocks: (0, __documentClosure.resolveCommentsStoreBid)(
                          useDocumentInteractionOverlaysResult35.json,
                        ),
                      }
                    : null,
              );
            let label2: Dynamic = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (0, __documentClosure.resolveDocumentHostStateValue10)(
                (0, __documentClosure.useDocumentInteractionOverlaysHandler6)(
                  documentInteractionOverlays,
                ),
              );
            let shellColor: Dynamic = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (0, __documentClosure.resolveDocumentHostStateValue8)(
                (0, __documentClosure.useDocumentInteractionOverlaysHandler6)(
                  documentInteractionOverlays,
                ),
              );
            let documentHostStateKnown: Dynamic = (0, __documentClosure.resolveDocumentHostStateKnown)(
              {
                inFrame: (0, __documentClosure.isFrameArtifact)(),
                fenceAuthor: (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.frameFenceAuthor)(`project/${__documentClosure.pid}`),
                viewerId: (..._extraArguments: unknown[]): Dynamic => __documentClosure.viewerId2,
                email: (..._extraArguments: unknown[]): Dynamic => {
                  let email2: Dynamic =
                    __documentClosure.email === `` ? (0, __documentClosure.resolvePlatformApiAndAuthAnon)() : __documentClosure.email;
                  return email2 === `anon` ? null : email2;
                },
              },
            );
            let documentHostStateSeen: Dynamic = (0, __documentClosure.resolveDocumentHostStateSeen)(
              createDocumentInteractionDocumentHostStateSeen16({
  get createDocumentHostCoordinator() { return __documentClosure.createDocumentHostCoordinator; },
  get fileId() { return __documentClosure.fileId; },
  get node() { return __documentClosure.node; },
  get DocumentInteractionsState8() { return __documentClosure.DocumentInteractionsState8; },
  get documentHostStateKnown() { return documentHostStateKnown; },
  get installPlatformApiAndAuthPagehide() { return __documentClosure.installPlatformApiAndAuthPagehide; },
  get PlatformApiAndAuthParticipants() { return __documentClosure.PlatformApiAndAuthParticipants; },
  get resolveDocumentHostStateFeedUp() { return __documentClosure.resolveDocumentHostStateFeedUp; },
  get feedUp() { return __documentClosure.feedUp; }, set feedUp(__nextDocumentClosureValue: Dynamic) { __documentClosure.feedUp = __nextDocumentClosureValue; },
  get frameLaneLink() { return __documentClosure.frameLaneLink; },
  get pid() { return __documentClosure.pid; },
  get resolvePlatformAnnouncementsValue() { return __documentClosure.resolvePlatformAnnouncementsValue; },
  get DocumentInteractionsHere() { return __documentClosure.DocumentInteractionsHere; },
  get resolvePlatformAnnouncementsValue2() { return __documentClosure.resolvePlatformAnnouncementsValue2; },
  get resolveDocumentInteractionsValue4() { return __documentClosure.resolveDocumentInteractionsValue4; },
}),
            );
            let documentHostStateValue: Dynamic =
              (0, __documentClosure.resolveDocumentHostStateValue)();
            let enabled5: Dynamic = false;
            let connected = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (documentInteractionOverlays) {
                documentHostStateValue.afterReturn();
              }
              documentHostStateSeen.connected(documentInteractionOverlays);
            };
            __documentClosure.uniqueItems8.add(connected);
            documentHostStateSeen.connected(__documentClosure.feedUp === true);
            let useDocumentInteractionOverlaysResult37: Dynamic =
              (0, __documentClosure.isDataModelSchemasColor)({
                fileId: __documentClosure.fileId,
                label: label2,
                shellColor: shellColor,
                isSelf: documentHostStateKnown.isSelf,
                post: (
                  peers?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  down({
                    t: `peers`,
                    peers: peers,
                    ...(options2
                      ? {
                          live: true,
                        }
                      : {}),
                  });
                  documentHostStateSeen.seen(peers, enabled5);
                },
                lastTextblock: (..._extraArguments: unknown[]): Dynamic => {
                  let useDocumentInteractionOverlaysResult47: Dynamic = null;
                  let useDocumentInteractionOverlaysResult48: Dynamic = -1;
                  for (let [
                    useDocumentInteractionOverlaysResult49,
                    useDocumentInteractionOverlaysResult50,
                  ] of map as Dynamic)
                    if (
                      useDocumentInteractionOverlaysResult50.text &&
                      useDocumentInteractionOverlaysResult50.rank >
                        useDocumentInteractionOverlaysResult48
                    ) {
                      [
                        useDocumentInteractionOverlaysResult47,
                        useDocumentInteractionOverlaysResult48,
                      ] = [
                        useDocumentInteractionOverlaysResult49,
                        useDocumentInteractionOverlaysResult50.rank,
                      ];
                    }
                  return useDocumentInteractionOverlaysResult47;
                },
                pendingBlocks: (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.resolveDocumentRuntimeIsArray)(__documentClosure.wholeDocRef.current, map),
                schedule: (
                  documentInteractionOverlays?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => setTimeout(documentInteractionOverlays, options2),
                cancel: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => clearTimeout(documentInteractionOverlays),
                now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
              });
            __documentClosure.elementRef18.current = useDocumentInteractionOverlaysResult37;
            __documentClosure.elementRef19.current = documentHostStateSeen;
            let useDocumentInteractionOverlaysResult38: Dynamic =
              (0, __documentClosure.subscribeDataModelSchemasWorking)(
                useDocumentInteractionOverlaysResult37,
                {
                  working: __documentClosure.frameClaudeWorking,
                  subscribe: __documentClosure.subscribeFrameClaudeActivity,
                },
              );
            let useDocumentInteractionOverlaysResult39: Dynamic =
              (0, __documentClosure.resolvePlatformAnnouncementsPictured)({
                fileId: __documentClosure.fileId,
                say: (
                  key?: Dynamic,
                  options2?: Dynamic,
                  word2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (0, __documentClosure.emitTelemetryEvent)({
                    name: `pages.agent.seed`,
                    key: key,
                    ...(word2 !== undefined && {
                      wire: {
                        word: word2,
                      },
                    }),
                    fields: {
                      outcome: key,
                      host: (0, __documentClosure.resolveObservabilityBootChat)({
                        frame: (0, __documentClosure.isFrameArtifact)(),
                        shell: (0, __documentClosure.isEditorExtensionsValue)(),
                        hostPane: (0, __documentClosure.isEditorExtensionsLocation)(),
                        poked: (0, __documentClosure.frameHostChromeWitnessed)(),
                        pane: (0, __documentClosure.frameConversationPane)(),
                        chatBeside: (0, __documentClosure.hostSays)(`chat_beside`),
                      }),
                      ...(options2 !== undefined && {
                        ms: Math.round(options2),
                        count:
                          key === `late`
                            ? (0, __documentClosure.resolvePlatformAnnouncementsFind)(options2)
                            : Math.min(
                                65535,
                                Math.max(2, Math.round(options2)),
                              ),
                      }),
                    },
                  }),
                schedule: (
                  documentInteractionOverlays?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => setTimeout(documentInteractionOverlays, options2),
                cancel: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => clearTimeout(documentInteractionOverlays),
                now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
              });
            __documentClosure.elementRef20.current = useDocumentInteractionOverlaysResult39;
            let updateDocumentInteractionsRang2: Dynamic =
              (0, __documentClosure.updateDocumentInteractionsRang)({
                now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
                visible: (..._extraArguments: unknown[]) =>
                  (document as Dynamic).visibilityState === `visible`,
                ownOut: (..._extraArguments: unknown[]) =>
                  (useDocumentInteractionOverlaysResult28?.[0] ?? 0) > 0,
                say: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let useDocumentInteractionOverlaysResult47: Dynamic =
                    (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsValue13)({
                      ms: documentInteractionOverlays,
                      host: (0, __documentClosure.resolveObservabilityBootChat)({
                        frame: (0, __documentClosure.isFrameArtifact)(),
                        shell: (0, __documentClosure.isEditorExtensionsValue)(),
                        hostPane: (0, __documentClosure.isEditorExtensionsLocation)(),
                        poked: (0, __documentClosure.frameHostChromeWitnessed)(),
                        pane: (0, __documentClosure.frameConversationPane)(),
                        chatBeside: (0, __documentClosure.hostSays)(`chat_beside`),
                      }),
                      plat: (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsValue3)(),
                    });
                  if (useDocumentInteractionOverlaysResult47 !== null) {
                    (0, __documentClosure.emitTelemetryEvent)(useDocumentInteractionOverlaysResult47);
                  }
                },
              });
            __documentClosure.elementRef21.current = updateDocumentInteractionsRang2;
            let drop = (..._extraArguments: unknown[]): undefined => {
              if ((document as Dynamic).visibilityState !== `visible`) {
                updateDocumentInteractionsRang2.drop();
              }
            };
            (document as Dynamic).addEventListener(`visibilitychange`, drop);
            let updateDocumentHostStatePictured2: Dynamic =
              (0, __documentClosure.updateDocumentHostStatePictured)({
                now: (..._extraArguments: unknown[]): Dynamic =>
                  performance.now(),
                visible: (..._extraArguments: unknown[]) =>
                  (document as Dynamic).visibilityState === `visible`,
                firstOfDoc: (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.resolveDocumentInteractionsValue2)(__documentClosure.fileId),
                say: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let useDocumentInteractionOverlaysResult47: Dynamic =
                    (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsValue14)({
                      ms: documentInteractionOverlays,
                      host: (0, __documentClosure.resolveObservabilityBootChat)({
                        frame: (0, __documentClosure.isFrameArtifact)(),
                        shell: (0, __documentClosure.isEditorExtensionsValue)(),
                        hostPane: (0, __documentClosure.isEditorExtensionsLocation)(),
                        poked: (0, __documentClosure.frameHostChromeWitnessed)(),
                        pane: (0, __documentClosure.frameConversationPane)(),
                        chatBeside: (0, __documentClosure.hostSays)(`chat_beside`),
                      }),
                      plat: (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsValue3)(),
                    });
                  if (useDocumentInteractionOverlaysResult47 !== null) {
                    (0, __documentClosure.emitTelemetryEvent)(useDocumentInteractionOverlaysResult47);
                  }
                },
              });
            __documentClosure.elementRef22.current = updateDocumentHostStatePictured2;
            let drop2 = (..._extraArguments: unknown[]): undefined => {
              if ((document as Dynamic).visibilityState !== `visible`) {
                updateDocumentHostStatePictured2.drop();
              }
            };
            (document as Dynamic).addEventListener(`visibilitychange`, drop2);
            let useDocumentInteractionOverlaysResult40: Dynamic =
              (0, __documentClosure.resolvePlatformAnnouncementsPictured2)({
                fileId: __documentClosure.fileId,
                on: (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.resolvePlatformFeatureFlagsEnabled2)(`pendingCaretInfer`),
                firstSeenAt: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  try {
                    return (0, __documentClosure.resolvePlatformAnnouncementsFloor)(
                      (globalThis as Dynamic).localStorage,
                      __documentClosure.fileId,
                      documentInteractionOverlays,
                    );
                  } catch {
                    return null;
                  }
                },
                stand: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  useDocumentInteractionOverlaysResult37.promised(
                    documentInteractionOverlays,
                  ),
                say: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  useDocumentInteractionOverlaysResult39.inferred(
                    documentInteractionOverlays,
                  ),
                schedule: (
                  documentInteractionOverlays?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => setTimeout(documentInteractionOverlays, options2),
                cancel: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => clearTimeout(documentInteractionOverlays),
                now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
              });
            __documentClosure.elementRef23.current = useDocumentInteractionOverlaysResult40;
            let myConnId: Dynamic = (0, __documentClosure.installPlatformApiAndAuthPagehide)();
            let useDocumentInteractionOverlaysResult41: Dynamic =
              (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryCancel)(
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let documentHostStateKey: Dynamic =
                    (0, __documentClosure.resolveDocumentHostStateKey)(
                      documentInteractionOverlays.values(),
                      {
                        fileId: __documentClosure.fileId,
                        nodeId: __documentClosure.node,
                        myConnId: myConnId,
                        label: label2,
                        shellColor: shellColor,
                      },
                    );
                  for (let event of documentHostStateKey as Dynamic)
                    (0, __documentClosure.resolveDocumentHostStateValue7)(
                      event.key.slice(6).split(`#`)[0],
                    );
                  if (!documentHostStateValue.changed(documentHostStateKey))
                    return;
                  let enabled6: Dynamic = enabled5;
                  enabled5 = true;
                  try {
                    useDocumentInteractionOverlaysResult37.reported(
                      documentHostStateKey,
                    );
                  } finally {
                    enabled5 = enabled6;
                  }
                },
                100,
                (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.resolvePlatformFeatureFlagsEnabled2)(`peerCaretThrottle`),
              );
            useDocumentInteractionOverlaysResult41(
              __documentClosure.PlatformApiAndAuthParticipants.getState().participants,
            );
            let label3: Dynamic = ``;
            let presence = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let useDocumentInteractionOverlaysResult47: Dynamic =
                (0, __documentClosure.resolvePlatformAnnouncementsPrincipal)(
                  documentInteractionOverlays,
                );
              let stringify: Dynamic = JSON.stringify(
                useDocumentInteractionOverlaysResult47,
              );
              if (stringify !== label3) {
                label3 = stringify;
                useDocumentInteractionOverlaysResult39.frames(
                  useDocumentInteractionOverlaysResult47,
                );
                useDocumentInteractionOverlaysResult40.frames(
                  useDocumentInteractionOverlaysResult47,
                );
                for (let useDocumentInteractionOverlaysResult48 of useDocumentInteractionOverlaysResult47 as Dynamic)
                  useDocumentInteractionOverlaysResult37.presence(
                    useDocumentInteractionOverlaysResult48,
                  );
              }
            };
            presence(__documentClosure.PlatformApiAndAuthParticipants.getState().participants);
            let subscribe: Dynamic = __documentClosure.PlatformApiAndAuthParticipants.subscribe(
              (
                documentInteractionOverlays?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  documentInteractionOverlays.participants !==
                  options2.participants
                ) {
                  useDocumentInteractionOverlaysResult41(
                    documentInteractionOverlays.participants,
                  );
                  presence(documentInteractionOverlays.participants);
                }
              },
            );
            let useDocumentInteractionOverlaysResult42: Dynamic =
              (0, __documentClosure.resolvePlatformFeatureFlagsEnabled2)(`agentSweep`);
            let clearDocumentHostStateDelete2: Dynamic =
              (0, __documentClosure.clearDocumentHostStateDelete)(
                (..._extraArguments: unknown[]): Dynamic =>
                  useDocumentInteractionOverlaysResult37.refresh(),
              );
            let onDown: Dynamic = __documentClosure.request.onDown(
              createDocumentInteractionOnDown17({
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get resolveCommentsStoreBlocks() { return __documentClosure.resolveCommentsStoreBlocks; },
  get settled() { return settled; }, set settled(__nextDocumentClosureValue: Dynamic) { settled = __nextDocumentClosureValue; },
  get DocumentInteractionsState4() { return __documentClosure.DocumentInteractionsState4; },
  get wholeDocRef() { return __documentClosure.wholeDocRef; },
  get documentHostHealthMonitor() { return __documentClosure.documentHostHealthMonitor; },
  get useDocumentInteractionOverlaysResult33() { return useDocumentInteractionOverlaysResult33; },
  get frameViewerEdit() { return __documentClosure.frameViewerEdit; },
  get frameViewerRev() { return __documentClosure.frameViewerRev; },
  get record() { return __documentClosure.record; },
  get down() { return down; },
  get useDocumentInteractionOverlaysResult42() { return useDocumentInteractionOverlaysResult42; },
  get useDocumentInteractionOverlaysResult37() { return useDocumentInteractionOverlaysResult37; },
  get error2() { return error2; },
  get resolvePlatformLiveDocumentAndHistoryPartial() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryPartial; },
  get updatePlatformLiveDocumentAndHistorySeated() { return __documentClosure.updatePlatformLiveDocumentAndHistorySeated; },
  get resolvePlatformLiveDocumentAndHistoryValue24() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryValue24; },
  get pid() { return __documentClosure.pid; },
  get fileId() { return __documentClosure.fileId; },
  get useDocumentInteractionOverlaysResult24() { return useDocumentInteractionOverlaysResult24; },
  get resolvePlatformKeyboardAndSaveStatusAssert() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusAssert; },
  get resolveCommentsStoreAround() { return __documentClosure.resolveCommentsStoreAround; },
  get resolvePlatformKeyboardAndSaveStatusCount() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusCount; },
  get halted() { return halted; }, set halted(__nextDocumentClosureValue: Dynamic) { halted = __nextDocumentClosureValue; },
  get labelRef() { return __documentClosure.labelRef; },
  get setBar() { return __documentClosure.setBar; },
  get resolveDocumentRuntimeValue() { return __documentClosure.resolveDocumentRuntimeValue; },
  get resolvePlatformKeyboardAndSaveStatusWhy2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy2; },
  get isPlatformKeyboardAndSaveStatusLimit() { return __documentClosure.isPlatformKeyboardAndSaveStatusLimit; },
  get resolvePlatformKeyboardAndSaveStatusKeptAsText() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKeptAsText; },
  get info() { return info; },
  get resolvePlatformAnnouncementsToUpperCase() { return __documentClosure.resolvePlatformAnnouncementsToUpperCase; },
  get setRescues() { return __documentClosure.setRescues; },
  get isPlatformKeyboardAndSaveStatusText() { return __documentClosure.isPlatformKeyboardAndSaveStatusText; },
  get documentRuntimeLimit0() { return __documentClosure.documentRuntimeLimit0; }, set documentRuntimeLimit0(__nextDocumentClosureValue: Dynamic) { __documentClosure.documentRuntimeLimit0 = __nextDocumentClosureValue; },
  get DocumentHostStateLines() { return __documentClosure.DocumentHostStateLines; },
  get isPlatformKeyboardAndSaveStatusFilter() { return __documentClosure.isPlatformKeyboardAndSaveStatusFilter; },
  get DocumentHostStateHanded() { return __documentClosure.DocumentHostStateHanded; },
  get resolvePlatformKeyboardAndSaveStatusBid2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBid2; },
  get resolvePlatformKeyboardAndSaveStatusFolds() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusFolds; },
  get resolvePlatformKeyboardAndSaveStatusUnknownId() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusUnknownId; },
  get resolveDataOperationControlValue12() { return __documentClosure.resolveDataOperationControlValue12; },
  get resolvePlatformKeyboardAndSaveStatusFace() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusFace; },
  get retrying() { return retrying; }, set retrying(__nextDocumentClosureValue: Dynamic) { retrying = __nextDocumentClosureValue; },
  get haltWords() { return haltWords; }, set haltWords(__nextDocumentClosureValue: Dynamic) { haltWords = __nextDocumentClosureValue; },
  get setBar2() { return __documentClosure.setBar2; },
  get useDocumentInteractionOverlaysResult25() { return useDocumentInteractionOverlaysResult25; },
  get String3() { return String3; },
  get DataOperationControlNodeGone2() { return __documentClosure.DataOperationControlNodeGone2; },
  get setNodeGone() { return __documentClosure.setNodeGone; },
  get useDocumentInteractionOverlaysHandler3() { return __documentClosure.useDocumentInteractionOverlaysHandler3; },
  get setNotice3() { return setNotice3; },
  get setError() { return __documentClosure.setError; },
  get setSaveWords() { return __documentClosure.setSaveWords; },
  get setEnabledState2() { return __documentClosure.setEnabledState2; },
  get resolveDocumentRuntimeState() { return __documentClosure.resolveDocumentRuntimeState; },
  get linkSaving() { return linkSaving; }, set linkSaving(__nextDocumentClosureValue: Dynamic) { linkSaving = __nextDocumentClosureValue; },
  get linkUnsaved() { return linkUnsaved; }, set linkUnsaved(__nextDocumentClosureValue: Dynamic) { linkUnsaved = __nextDocumentClosureValue; },
  get enabledRef() { return __documentClosure.enabledRef; },
  get elementRef7() { return __documentClosure.elementRef7; },
  get setEnabledState() { return __documentClosure.setEnabledState; },
  get resolvePlatformKeyboardAndSaveStatusRise() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusRise; },
  get resolvePlatformKeyboardAndSaveStatusMoved() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusMoved; },
  get useDocumentInteractionOverlaysResult27() { return useDocumentInteractionOverlaysResult27; }, set useDocumentInteractionOverlaysResult27(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult27 = __nextDocumentClosureValue; },
  get resolvePlatformKeyboardAndSaveStatusBusy() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBusy; },
  get useDocumentInteractionOverlaysResult28() { return useDocumentInteractionOverlaysResult28; }, set useDocumentInteractionOverlaysResult28(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult28 = __nextDocumentClosureValue; },
  get report2() { return report2; },
  get resolvePlatformKeyboardAndSaveStatusNotice() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusNotice; },
  get matchesWaiting() { return matchesWaiting; }, set matchesWaiting(__nextDocumentClosureValue: Dynamic) { matchesWaiting = __nextDocumentClosureValue; },
  get waiting() { return __documentClosure.waiting; },
  get useDocumentInteractionOverlaysResult21() { return __documentClosure.useDocumentInteractionOverlaysResult21; },
  get pageGoneWhy2() { return __documentClosure.pageGoneWhy2; },
  get openFailed() { return openFailed; }, set openFailed(__nextDocumentClosureValue: Dynamic) { openFailed = __nextDocumentClosureValue; },
  get setNotice2() { return setNotice2; },
  get enabled4() { return enabled4; }, set enabled4(__nextDocumentClosureValue: Dynamic) { enabled4 = __nextDocumentClosureValue; },
  get setNotice() { return __documentClosure.setNotice; },
  get setUseDocumentInteractionOverlaysState() { return __documentClosure.setUseDocumentInteractionOverlaysState; },
  get retryNow() { return __documentClosure.retryNow; },
  get resolveDataModelSchemasBlock() { return __documentClosure.resolveDataModelSchemasBlock; },
  get useDocumentInteractionOverlaysResult35() { return useDocumentInteractionOverlaysResult35; }, set useDocumentInteractionOverlaysResult35(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult35 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult34() { return useDocumentInteractionOverlaysResult34; },
  get resolveCommentsActionsAndSelectionFrom() { return __documentClosure.resolveCommentsActionsAndSelectionFrom; },
  get elementRef18() { return __documentClosure.elementRef18; },
  get resolveDocumentRuntimeIsArray() { return __documentClosure.resolveDocumentRuntimeIsArray; },
  get map() { return map; },
  get useDocumentInteractionOverlaysResult39() { return useDocumentInteractionOverlaysResult39; },
  get useDocumentInteractionOverlaysResult40() { return useDocumentInteractionOverlaysResult40; },
  get DocumentHostStatePictured() { return __documentClosure.DocumentHostStatePictured; },
  get setPageShape() { return __documentClosure.setPageShape; },
  get resolveCommentAnchorsWhole() { return __documentClosure.resolveCommentAnchorsWhole; },
  get updateDocumentHostStatePictured2() { return updateDocumentHostStatePictured2; },
  get isDocumentHostStateIsArray() { return __documentClosure.isDocumentHostStateIsArray; },
  get seatDoorList() { return seatDoorList; },
}),
            );
            let down2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
              down({
                t: `tick`,
                now: Date.now(),
              });
            let useDocumentInteractionOverlaysResult43: Dynamic;
            let lookup4: Dynamic = new (Map as Dynamic)();
            let setEnabledState5 = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (!(documentInteractionOverlays.pending > 0)) {
                (0, __documentClosure.setEnabledState)(
                  (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`pending_zero`),
                );
              }
              if (
                !(documentInteractionOverlays.pending > 0) &&
                __documentClosure.enabledRef.current
              ) {
                __documentClosure.elementRef7.current = null;
              }
            };
            let hasFocus: Dynamic = createDocumentInteractionHasFocus18({
  get isDocumentRuntimeReason() { return __documentClosure.isDocumentRuntimeReason; },
  get resolvePlatformAnnouncementsValue10() { return __documentClosure.resolvePlatformAnnouncementsValue10; },
  get info() { return info; },
  get resolvePlatformAnnouncementsToUpperCase() { return __documentClosure.resolvePlatformAnnouncementsToUpperCase; },
  get isPlatformAnnouncementsValue() { return __documentClosure.isPlatformAnnouncementsValue; },
  get error2() { return error2; },
  get createPagesFaceUndoEvent() { return __documentClosure.createPagesFaceUndoEvent; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
  get createPagesEditorLockedEvent() { return __documentClosure.createPagesEditorLockedEvent; },
  get isDocumentRuntimeText() { return __documentClosure.isDocumentRuntimeText; },
  get createPagesOutboxDroppedEvent() { return __documentClosure.createPagesOutboxDroppedEvent; },
  get lookup4() { return lookup4; },
  get resolvePlatformKeyboardAndSaveStatusKept() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKept; },
  get setRescues() { return __documentClosure.setRescues; },
  get isPlatformKeyboardAndSaveStatusPenOff() { return __documentClosure.isPlatformKeyboardAndSaveStatusPenOff; },
  get documentRuntimeLimit0() { return __documentClosure.documentRuntimeLimit0; }, set documentRuntimeLimit0(__nextDocumentClosureValue: Dynamic) { __documentClosure.documentRuntimeLimit0 = __nextDocumentClosureValue; },
  get resolveDocumentRuntimeValue5() { return __documentClosure.resolveDocumentRuntimeValue5; },
  get useCommentStore() { return __documentClosure.useCommentStore; },
  get resolveDocumentRuntimeIsArray2() { return __documentClosure.resolveDocumentRuntimeIsArray2; },
  get body() { return __documentClosure.body; },
  get shed2() { return __documentClosure.shed2; },
  get resolveDocumentRuntimeValue4() { return __documentClosure.resolveDocumentRuntimeValue4; },
  get isDocumentRuntimeToken() { return __documentClosure.isDocumentRuntimeToken; },
  get elementRef5() { return __documentClosure.elementRef5; },
  get setDetachAsk() { return __documentClosure.setDetachAsk; },
  get of2() { return of2; },
  get resolveEditorMediaValue2() { return __documentClosure.resolveEditorMediaValue2; },
  get request() { return __documentClosure.request; }, set request(__nextDocumentClosureValue: Dynamic) { __documentClosure.request = __nextDocumentClosureValue; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get resolveCommentsStoreBlocks() { return __documentClosure.resolveCommentsStoreBlocks; },
  get nudgeLiveDoor() { return __documentClosure.nudgeLiveDoor; },
  get elementRef21() { return __documentClosure.elementRef21; },
  get elementRef22() { return __documentClosure.elementRef22; },
  get elementRef6() { return __documentClosure.elementRef6; },
  get isDocumentInteractionsValue() { return __documentClosure.isDocumentInteractionsValue; },
  get filterPlatformLiveDocumentAndHistoryRevive() { return __documentClosure.filterPlatformLiveDocumentAndHistoryRevive; },
  get request2() { return request2; }, set request2(__nextDocumentClosureValue: Dynamic) { request2 = __nextDocumentClosureValue; },
  get toast() { return __documentClosure.toast; },
  get useDocumentInteractionOverlaysResult24() { return useDocumentInteractionOverlaysResult24; },
  get documentHostHealthMonitor() { return __documentClosure.documentHostHealthMonitor; },
  get resolveObservabilityBootPaint2() { return __documentClosure.resolveObservabilityBootPaint2; },
  get moved() { return __documentClosure.moved; }, set moved(__nextDocumentClosureValue: Dynamic) { __documentClosure.moved = __nextDocumentClosureValue; },
  get documentHostStateValue2() { return __documentClosure.documentHostStateValue2; },
  get resolvePlatformKeyboardAndSaveStatusBid() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBid; },
  get resolveDocumentInteractionsTray() { return __documentClosure.resolveDocumentInteractionsTray; },
  get createPagesWriteGateRefusedCappedEvent() { return __documentClosure.createPagesWriteGateRefusedCappedEvent; },
  get setEnabledState5() { return setEnabledState5; },
  get heard() { return __documentClosure.heard; }, set heard(__nextDocumentClosureValue: Dynamic) { __documentClosure.heard = __nextDocumentClosureValue; },
  get resolveObservabilityBrowserAndOperationEventsWork() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsWork; },
  get report() { return report; }, set report(__nextDocumentClosureValue: Dynamic) { report = __nextDocumentClosureValue; },
  get resolveObservabilityBrowserAndOperationEventsComplete() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsComplete; },
  get label() { return __documentClosure.label; }, set label(__nextDocumentClosureValue: Dynamic) { __documentClosure.label = __nextDocumentClosureValue; },
  get resolveObservabilityBrowserAndOperationEventsValue8() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue8; },
  get report2() { return report2; },
  get filterDocumentRuntimeStale() { return __documentClosure.filterDocumentRuntimeStale; },
  get useDocumentInteractionOverlaysResult43() { return useDocumentInteractionOverlaysResult43; }, set useDocumentInteractionOverlaysResult43(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult43 = __nextDocumentClosureValue; },
  get down2() { return down2; },
  get useDocumentInteractionOverlaysResult33() { return useDocumentInteractionOverlaysResult33; },
  get frameViewerDirty() { return __documentClosure.frameViewerDirty; },
  get frameViewerSelection() { return __documentClosure.frameViewerSelection; },
  get node() { return __documentClosure.node; },
  get updateObservabilityBrowserAndOperationEventsSelected() { return __documentClosure.updateObservabilityBrowserAndOperationEventsSelected; },
  get map() { return map; },
  get resolveDocumentHostStateNode() { return __documentClosure.resolveDocumentHostStateNode; },
  get PlatformApiAndAuthParticipants() { return __documentClosure.PlatformApiAndAuthParticipants; },
  get fileId() { return __documentClosure.fileId; },
  get contextRef() { return __documentClosure.contextRef; },
  get updateFrameGesturesAnchor() { return __documentClosure.updateFrameGesturesAnchor; },
  get documentScrollKey() { return __documentClosure.documentScrollKey; },
  get pid() { return __documentClosure.pid; },
  get useDocumentInteractionOverlaysResult46() { return useDocumentInteractionOverlaysResult46; }, set useDocumentInteractionOverlaysResult46(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult46 = __nextDocumentClosureValue; },
  get resolvePlatformKeyboardAndSaveStatusKeys() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKeys; },
  get DocumentInteractionsState7() { return __documentClosure.DocumentInteractionsState7; }, set DocumentInteractionsState7(__nextDocumentClosureValue: Dynamic) { __documentClosure.DocumentInteractionsState7 = __nextDocumentClosureValue; },
});
            of2.addEventListener(`message`, hasFocus);
            of2.start();
            let state2: Dynamic =
              __documentClosure.useDocumentInteractionOverlaysResult21.state();
            down({
              t: `state`,
              state: state2,
              words: __documentClosure.PlatformAnnouncementsLive[state2],
            });
            let caps2 = (..._extraArguments: unknown[]): undefined => {
              let known2: Dynamic =
                __documentClosure.useDocumentInteractionOverlaysResult21.known();
              if (!known2) return;
              let caps3: Dynamic = {
                ...__documentClosure.useDocumentInteractionOverlaysResult21.caps(),
                ...(__documentClosure.record.schemaHash
                  ? {
                      schemaHash: __documentClosure.record.schemaHash,
                    }
                  : {}),
              };
              down({
                t: `session`,
                sess: known2.label,
                hwm: known2.hwm,
                ...(Object.keys(caps3).length > 0
                  ? {
                      caps: caps3,
                    }
                  : {}),
              });
            };
            caps2();
            __documentClosure.useDocumentInteractionOverlaysResult17 = (
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (__documentClosure.record.schemaHash !== undefined ||
                __documentClosure.record.reviveChars ||
                __documentClosure.record.idsInline ||
                __documentClosure.record.idsRequired ||
                __documentClosure.record.markIds ||
                __documentClosure.record.wrapFinal ||
                __documentClosure.record.joinDir ||
                __documentClosure.record.mentionLabel ||
                __documentClosure.record.personLabel ||
                __documentClosure.record.highlightColour ||
                __documentClosure.record.hrefFragment ||
                __documentClosure.record.depthMax !== undefined ||
                __documentClosure.record.listLevelsMax !== undefined) &&
              caps2();
            let need: Dynamic = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              documentInteractionOverlays
                ? __documentClosure.request?.row(documentInteractionOverlays)
                : __documentClosure.request?.need();
            __documentClosure.uniqueItems7.add(need);
            let useDocumentInteractionOverlaysResult44: Dynamic =
              (0, __documentClosure.updatePlatformLiveDocumentAndHistoryNobody)(
                (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryValue24)(__documentClosure.pid, __documentClosure.fileId),
                (rev?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  __documentClosure.request?.need({
                    why: __documentClosure.PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision,
                    rev: rev,
                  }),
              );
            if (
              (0, __documentClosure.isFrameArtifact)() &&
              __documentClosure.documentHostStateValue2.bell(
                (0, __documentClosure.useDocumentInteractionOverlaysHandler7)(),
              )
            ) {
              (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `fence-picture`, {
                movedAtBell: true,
              });
            }
            let feed: Dynamic = (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => __documentClosure.request?.feed(documentInteractionOverlays);
            __documentClosure.uniqueItems8.add(feed);
            feed(__documentClosure.feedUp ?? false);
            let setInterval3: Dynamic = setInterval(
              (..._extraArguments: unknown[]): undefined => {
                down2();
                readsRefused();
                (0, __documentClosure.setEnabledState3)(
                  useDocumentInteractionOverlaysResult30.said(Date.now()),
                );
                __documentClosure.documentHostHealthMonitor.beat();
              },
              1e3,
            );
            let waiting3: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusUnsaved2)({
                linkSaving:
                  __documentClosure.useDocumentInteractionOverlaysResult21.state() === `saving`,
                word: (document as Dynamic).documentElement.dataset.lfileSave,
                pending: Number(
                  (document as Dynamic).documentElement.dataset.lfilePending ??
                    0,
                ),
                stopped:
                  __documentClosure.useDocumentInteractionOverlaysResult21.paused() ||
                  __documentClosure.useDocumentInteractionOverlaysResult21.viewOnly() ||
                  __documentClosure.useDocumentInteractionOverlaysResult21.readsRefused() ||
                  __documentClosure.useDocumentInteractionOverlaysResult21.pageGone() ||
                  __documentClosure.useDocumentInteractionOverlaysResult21.waiting() ||
                  halted ||
                  retrying,
                settled: settled,
              });
            let waiting4 = (
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (waiting3().unsaved) {
                event.preventDefault();
                event.returnValue = ``;
              }
            };
            (window as Dynamic).addEventListener(`beforeunload`, waiting4);
            let word: Dynamic = __documentClosure.dependenciesRef.current?.word;
            if (word) {
              word.current = waiting3;
            }
            let useDocumentInteractionOverlaysResult45: Dynamic =
              (0, __documentClosure.frameViewerSaveLive)(
                (..._extraArguments: unknown[]): Dynamic =>
                  (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusLink)({
                    barUp: __documentClosure.elementRef7.current === `unsaved`,
                    leave: waiting3(),
                    linkSaving:
                      __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                      `saving`,
                    linkUnsaved:
                      __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                      `unsaved`,
                    word: (document as Dynamic).documentElement.dataset
                      .lfileSave,
                  }),
              );
            __documentClosure.elementRef14.current();
            let readsRefused: Dynamic = (
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (0, __documentClosure.setSaveLive)(
                (0, __documentClosure.resolveDocumentHostStateReadonly)({
                  term: (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusLink)({
                    barUp: __documentClosure.elementRef7.current === `unsaved`,
                    leave: waiting3(),
                    linkSaving:
                      __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                      `saving`,
                    linkUnsaved:
                      __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                      `unsaved`,
                    word: (document as Dynamic).documentElement.dataset
                      .lfileSave,
                  }),
                  linkUnsaved:
                    __documentClosure.useDocumentInteractionOverlaysResult21.state() ===
                    `unsaved`,
                  readonly:
                    halted ||
                    retrying ||
                    __documentClosure.useDocumentInteractionOverlaysResult21.viewOnly() ||
                    __documentClosure.useDocumentInteractionOverlaysResult21.readsRefused(),
                }),
              );
            (0, __documentClosure.DocumentInteractionsOpened)();
            let useDocumentInteractionOverlaysResult46: Dynamic =
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusValue6)(
                (0, __documentClosure.isPlatformFrameAndCapabilitiesWindow)(),
                __documentClosure.DocumentInteractionsState7,
              );
            let querySelector = createDocumentInteractionQuerySelector19({
  get halted() { return halted; }, set halted(__nextDocumentClosureValue: Dynamic) { halted = __nextDocumentClosureValue; },
  get retrying() { return retrying; }, set retrying(__nextDocumentClosureValue: Dynamic) { retrying = __nextDocumentClosureValue; },
  get resolvePlatformKeyboardAndSaveStatusKey() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKey; },
  get resolvePlatformKeyboardAndSaveStatusBody() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBody; },
  get filterPlatformKeyboardAndSaveStatusNext() { return __documentClosure.filterPlatformKeyboardAndSaveStatusNext; },
  get useDocumentInteractionOverlaysResult46() { return useDocumentInteractionOverlaysResult46; }, set useDocumentInteractionOverlaysResult46(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult46 = __nextDocumentClosureValue; },
  get dependenciesRef() { return __documentClosure.dependenciesRef; },
  get DocumentInteractionsState7() { return __documentClosure.DocumentInteractionsState7; }, set DocumentInteractionsState7(__nextDocumentClosureValue: Dynamic) { __documentClosure.DocumentInteractionsState7 = __nextDocumentClosureValue; },
  get isDocumentFocusedElsewhere() { return __documentClosure.isDocumentFocusedElsewhere; },
  get down() { return down; },
  get error2() { return error2; },
});
            (document as Dynamic).addEventListener(
              `keydown`,
              querySelector,
              true,
            );
            if (__documentClosure.dependenciesRef.current?.leaving === true)
              try {
                down({
                  t: `leaving`,
                });
              } catch {}
            __documentClosure.elementRef11.current = {
              down: down,
              close: createDocumentInteractionClose20({
  get waiting4() { return waiting4; },
  get word() { return word; },
  get waiting3() { return waiting3; },
  get resolveDocumentRuntimeUnsent() { return __documentClosure.resolveDocumentRuntimeUnsent; },
  get useDocumentInteractionOverlaysResult28() { return useDocumentInteractionOverlaysResult28; }, set useDocumentInteractionOverlaysResult28(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult28 = __nextDocumentClosureValue; },
  get error2() { return error2; },
  get elementRef3() { return __documentClosure.elementRef3; },
  get report() { return report; }, set report(__nextDocumentClosureValue: Dynamic) { report = __nextDocumentClosureValue; },
  get querySelector() { return querySelector; },
  get useDocumentInteractionOverlaysResult26() { return useDocumentInteractionOverlaysResult26; },
  get useDocumentInteractionOverlaysResult25() { return useDocumentInteractionOverlaysResult25; },
  get setInterval3() { return setInterval3; },
  get setEnabledState3() { return __documentClosure.setEnabledState3; },
  get setEnabledState4() { return __documentClosure.setEnabledState4; },
  get useDocumentInteractionOverlaysResult43() { return useDocumentInteractionOverlaysResult43; }, set useDocumentInteractionOverlaysResult43(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult43 = __nextDocumentClosureValue; },
  get uniqueItems7() { return __documentClosure.uniqueItems7; },
  get need() { return need; },
  get useDocumentInteractionOverlaysResult44() { return useDocumentInteractionOverlaysResult44; },
  get uniqueItems8() { return __documentClosure.uniqueItems8; },
  get feed() { return feed; },
  get useDocumentInteractionOverlaysResult36() { return useDocumentInteractionOverlaysResult36; },
  get onDown() { return onDown; },
  get clearDocumentHostStateDelete2() { return clearDocumentHostStateDelete2; },
  get subscribe() { return subscribe; },
  get useDocumentInteractionOverlaysResult38() { return useDocumentInteractionOverlaysResult38; },
  get useDocumentInteractionOverlaysResult41() { return useDocumentInteractionOverlaysResult41; },
  get connected() { return connected; },
  get documentHostStateSeen() { return documentHostStateSeen; },
  get elementRef19() { return __documentClosure.elementRef19; },
  get useDocumentInteractionOverlaysResult37() { return useDocumentInteractionOverlaysResult37; },
  get elementRef18() { return __documentClosure.elementRef18; },
  get useDocumentInteractionOverlaysResult39() { return useDocumentInteractionOverlaysResult39; },
  get elementRef20() { return __documentClosure.elementRef20; },
  get drop() { return drop; },
  get updateDocumentInteractionsRang2() { return updateDocumentInteractionsRang2; },
  get elementRef21() { return __documentClosure.elementRef21; },
  get drop2() { return drop2; },
  get updateDocumentHostStatePictured2() { return updateDocumentHostStatePictured2; },
  get elementRef22() { return __documentClosure.elementRef22; },
  get useDocumentInteractionOverlaysResult40() { return useDocumentInteractionOverlaysResult40; },
  get elementRef23() { return __documentClosure.elementRef23; },
  get of2() { return of2; },
  get hasFocus() { return hasFocus; },
  get label() { return __documentClosure.label; }, set label(__nextDocumentClosureValue: Dynamic) { __documentClosure.label = __nextDocumentClosureValue; },
  get heard() { return __documentClosure.heard; }, set heard(__nextDocumentClosureValue: Dynamic) { __documentClosure.heard = __nextDocumentClosureValue; },
  get ObservabilityBrowserAndOperationEventsWork() { return __documentClosure.ObservabilityBrowserAndOperationEventsWork; },
  get documentHostHealthMonitor() { return __documentClosure.documentHostHealthMonitor; },
  get elementRef5() { return __documentClosure.elementRef5; },
  get setDetachAsk() { return __documentClosure.setDetachAsk; },
  get enabledRef() { return __documentClosure.enabledRef; },
  get elementRef7() { return __documentClosure.elementRef7; },
  get useDocumentInteractionOverlaysResult21() { return __documentClosure.useDocumentInteractionOverlaysResult21; },
  get frameViewerSaveWord() { return __documentClosure.frameViewerSaveWord; },
  get fileId() { return __documentClosure.fileId; },
  get useDocumentInteractionOverlaysResult45() { return useDocumentInteractionOverlaysResult45; },
  get useDocumentInteractionOverlaysResult33() { return useDocumentInteractionOverlaysResult33; },
  get frameViewerSelection() { return __documentClosure.frameViewerSelection; },
  get frameViewerDirty() { return __documentClosure.frameViewerDirty; },
  get frameViewerRev() { return __documentClosure.frameViewerRev; },
  get useDocumentInteractionOverlaysResult24() { return useDocumentInteractionOverlaysResult24; },
  get request() { return __documentClosure.request; }, set request(__nextDocumentClosureValue: Dynamic) { __documentClosure.request = __nextDocumentClosureValue; },
  get setEnabledState() { return __documentClosure.setEnabledState; },
  get resolvePlatformKeyboardAndSaveStatusRise() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusRise; },
}),
            };
          });
}

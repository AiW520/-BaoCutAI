/** BaoCut: extracted document interaction boot expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentInteractionContext } from "./docs-app-interaction-context";
import { createDocumentInteractionEffect5 } from "./docs-app-interaction-boot-2";
import { createDocumentInteractionRender22 } from "./docs-app-interaction-shutdown";

export function createDocumentInteractionEffect3(__documentClosure: Pick<DocumentInteractionContext, "pid" | "fileId" | "resolveObservabilityBootKey" | "docRef" | "knownBlocksRef" | "summonHostRef" | "wholeDocRef" | "setPageShape" | "elementRef2" | "elementRef10" | "setBar" | "documentInteractionsLimit4000" | "resolveCommentsStoreLayer" | "setViewOnly" | "setPageGone" | "setPageGoneWhy" | "setState" | "setError" | "setNotice" | "setUseDocumentInteractionOverlaysState" | "setTabGone" | "setNodeGone" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise" | "setSave" | "setSaveWords" | "setEnabledState2" | "setSaveAlarmOwed" | "setSaveLive" | "setEnabledState3" | "setEnabledState4" | "setPile" | "loadDataOperationControlKind" | "doorLinkStats" | "withWebSpan" | "TELEMETRY_ATTRIBUTE_NAMES" | "serverRev" | "documentInteractionsLimit8000" | "elementRef" | "fileValueRef" | "loadDocumentRuntimeObject" | "resolvePlatformSessionAndSourcesValue5" | "resolveCommentsStoreValue31" | "DocumentInteractions_LnDoc" | "uniqueItemsRef" | "lookupRef2" | "loadPlatformLiveDocumentAndHistoryRun" | "updatePlatformLiveDocumentAndHistoryShed" | "resolveWidgetBridgeJson2" | "resolveWidgetBridgeCode3" | "resolveWidgetBridgeCode2" | "updateWidgetBridgeDelete" | "resolvePlatformLiveDocumentAndHistoryReason" | "WidgetBridgeCode" | "resolveWidgetBridgeCode" | "rereadWidget" | "resolveWidgetBridgeJson" | "graftEmbedProse" | "resolveWidgetBridgeValue3" | "resolveDocumentRuntimeType" | "isDataOperationControlLabel" | "PlatformApiAndAuthUser" | "documentInteractionsLimit10000" | "isPlatformFrameAndCapabilitiesNavigation" | "isPlatformFrameAndCapabilitiesWindow" | "isFrameArtifact" | "frameViewer" | "DocumentHostStateUnscoped" | "resolveObservabilityBrowserAndOperationEventsIndexedDB" | "resolveDocumentInteractionsWarn" | "resolveDataOperationControlLocks" | "DocumentHostStateFaulted" | "loadDataOperationControlReady" | "documentInteractionsLimit3000" | "resolveDocumentInteractionsWarn2" | "loadDataOperationControlBid" | "frameEdgeNow" | "resolveDataOperationControlEndsWith" | "resolveDataOperationControlValue33" | "elementRef4" | "resolveDocumentInteractionsFound" | "resolvePlatformLiveDocumentAndHistoryPid" | "elementRef15" | "resolvePlatformAnnouncementsSess" | "isPlatformSessionAndSourcesToLowerCase" | "resolvePlatformSyncAndRoutingVerb2" | "resolveDataModelSchemasValue27" | "liveDoor" | "resolveDocumentHostStateValue2" | "frameLane" | "resolveObservabilityTelemetryRing" | "resolveObservabilityTelemetryEntries" | "resolvePlatformSyncAndRoutingValue8" | "updatePlatformLiveDocumentAndHistoryNote" | "elementRef6" | "resolveEditorExtensionsThrew" | "DocumentInteractionsThen" | "ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c" | "liveSupportCode" | "isDocumentInteractionsValue" | "resolveObservabilityBrowserAndOperationEventsValue2" | "resolveEditorExtensionsTest2" | "emitTelemetryEvent" | "clearPlatformLoadingAndStatusDelete" | "clearPlatformSyncAndRoutingDispose" | "ObservabilityBrowserAndOperationEventsWork" | "resolveObservabilityBrowserAndOperationEventsWire" | "isObservabilityBrowserAndOperationEventsPort" | "elementRef11" | "resolveObservabilityBrowserAndOperationEventsVisible" | "contextRef" | "createDocumentHostHealthMonitor" | "resolvePlatformKeyboardAndSaveStatusValue4" | "resolveObservabilityBrowserAndOperationEventsFields" | "resolveObservabilityTelemetryValue19" | "enabledRef" | "resolveDocumentHostStateNotice" | "elementRef7" | "elementRef8" | "elementRef17" | "loadDataOperationControlVerdict" | "resolveEditorExtensionsRefusalClass" | "resolvePlatformFeatureFlagsEnabled2" | "resolveDataOperationControlHold" | "frameFenceAuthor" | "DocumentHostStateClaimed" | "resolveObservabilityBrowserAndOperationEventsRenamed" | "createPagesCustodyClaimedEvent" | "frameHotFrom" | "DocumentHostStateLooked" | "loadCommentsStoreVerb2" | "transportDoorOf" | "doorWithPrefetchedDocumentView" | "nudgeLiveDoor" | "resolveCommentsStoreAround" | "resolvePlatformFeatureFlagsName" | "resolveDataModelSchemasDoorFactsListenerError" | "updateCommentsActionsAndSelectionEmail" | "elementRef16" | "onLiveReopen" | "installDocumentHostStateVisibilityState" | "DataOperationControlMessage10" | "elementRef12" | "mountGen" | "setRescues" | "elementRef9" | "isPlatformKeyboardAndSaveStatusDown" | "resolveDataOperationControlValue11" | "resolvePlatformAnnouncementsToUpperCase" | "quoteRecoveryPreview" | "resolvePlatformKeyboardAndSaveStatusShow" | "resolvePlatformLiveDocumentAndHistoryValue20" | "toast" | "resolveCommentsStoreValue30" | "openDebugReportDialog" | "resolvePlatformKeyboardAndSaveStatusDrop" | "onLiveReconnecting" | "PlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusJudge" | "filterPlatformKeyboardAndSaveStatusJudge" | "resolvePlatformKeyboardAndSaveStatusWhy" | "resolvePlatformKeyboardAndSaveStatusPending" | "frameViewerSaveWord" | "isPlatformKeyboardAndSaveStatusSaved" | "isPlatformKeyboardAndSaveStatusClear" | "documentRuntimeLimit0" | "labelRef" | "resolveDocumentInteractionsValue3" | "resolveDocumentRuntimeValue" | "resolveDataModelSchemasResolved" | "useCommentStore" | "commentSummonHost" | "isCommentsEditorRank" | "resolveEditorExtensionsAnchor2" | "resolveCommentsStoreValue33" | "resolveCommentsStoreBid" | "resolveDocumentHostStateValue10" | "resolveDocumentHostStateValue8" | "resolveDocumentHostStateKnown" | "resolvePlatformApiAndAuthAnon" | "resolveDocumentHostStateSeen" | "createDocumentHostCoordinator" | "DocumentInteractionsState8" | "installPlatformApiAndAuthPagehide" | "PlatformApiAndAuthParticipants" | "resolveDocumentHostStateFeedUp" | "frameLaneLink" | "resolvePlatformAnnouncementsValue" | "DocumentInteractionsHere" | "resolvePlatformAnnouncementsValue2" | "resolveDocumentInteractionsValue4" | "resolveDocumentHostStateValue" | "isDataModelSchemasColor" | "resolveDocumentRuntimeIsArray" | "elementRef18" | "elementRef19" | "subscribeDataModelSchemasWorking" | "frameClaudeWorking" | "subscribeFrameClaudeActivity" | "resolvePlatformAnnouncementsPictured" | "resolveObservabilityBootChat" | "isEditorExtensionsValue" | "isEditorExtensionsLocation" | "frameHostChromeWitnessed" | "frameConversationPane" | "hostSays" | "resolvePlatformAnnouncementsFind" | "elementRef20" | "updateDocumentInteractionsRang" | "resolveObservabilityBrowserAndOperationEventsValue13" | "resolveObservabilityBrowserAndOperationEventsValue3" | "elementRef21" | "updateDocumentHostStatePictured" | "resolveDocumentInteractionsValue2" | "resolveObservabilityBrowserAndOperationEventsValue14" | "elementRef22" | "resolvePlatformAnnouncementsPictured2" | "resolvePlatformAnnouncementsFloor" | "elementRef23" | "resolvePlatformLiveDocumentAndHistoryCancel" | "resolveDocumentHostStateKey" | "resolveDocumentHostStateValue7" | "resolvePlatformAnnouncementsPrincipal" | "clearDocumentHostStateDelete" | "resolveCommentsStoreBlocks" | "DocumentInteractionsState4" | "frameViewerEdit" | "frameViewerRev" | "resolvePlatformLiveDocumentAndHistoryPartial" | "updatePlatformLiveDocumentAndHistorySeated" | "resolvePlatformLiveDocumentAndHistoryValue24" | "resolvePlatformKeyboardAndSaveStatusAssert" | "resolvePlatformKeyboardAndSaveStatusCount" | "resolvePlatformKeyboardAndSaveStatusWhy2" | "isPlatformKeyboardAndSaveStatusLimit" | "resolvePlatformKeyboardAndSaveStatusKeptAsText" | "isPlatformKeyboardAndSaveStatusText" | "DocumentHostStateLines" | "isPlatformKeyboardAndSaveStatusFilter" | "DocumentHostStateHanded" | "resolvePlatformKeyboardAndSaveStatusBid2" | "resolvePlatformKeyboardAndSaveStatusFolds" | "resolvePlatformKeyboardAndSaveStatusUnknownId" | "resolveDataOperationControlValue12" | "resolvePlatformKeyboardAndSaveStatusFace" | "DataOperationControlNodeGone2" | "resolveDocumentRuntimeState" | "resolvePlatformKeyboardAndSaveStatusMoved" | "resolvePlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusNotice" | "resolveDataModelSchemasBlock" | "resolveCommentsActionsAndSelectionFrom" | "DocumentHostStatePictured" | "resolveCommentAnchorsWhole" | "isDocumentHostStateIsArray" | "isDocumentRuntimeReason" | "resolvePlatformAnnouncementsValue10" | "isPlatformAnnouncementsValue" | "createPagesFaceUndoEvent" | "createPagesEditorLockedEvent" | "isDocumentRuntimeText" | "createPagesOutboxDroppedEvent" | "resolvePlatformKeyboardAndSaveStatusKept" | "isPlatformKeyboardAndSaveStatusPenOff" | "resolveDocumentRuntimeValue5" | "resolveDocumentRuntimeIsArray2" | "resolveDocumentRuntimeValue4" | "isDocumentRuntimeToken" | "elementRef5" | "setDetachAsk" | "resolveEditorMediaValue2" | "filterPlatformLiveDocumentAndHistoryRevive" | "resolveObservabilityBootPaint2" | "resolvePlatformKeyboardAndSaveStatusBid" | "resolveDocumentInteractionsTray" | "createPagesWriteGateRefusedCappedEvent" | "resolveObservabilityBrowserAndOperationEventsWork" | "resolveObservabilityBrowserAndOperationEventsComplete" | "resolveObservabilityBrowserAndOperationEventsValue8" | "filterDocumentRuntimeStale" | "frameViewerDirty" | "frameViewerSelection" | "updateObservabilityBrowserAndOperationEventsSelected" | "resolveDocumentHostStateNode" | "updateFrameGesturesAnchor" | "documentScrollKey" | "resolvePlatformKeyboardAndSaveStatusKeys" | "DocumentInteractionsState7" | "PlatformAnnouncementsLive" | "updatePlatformLiveDocumentAndHistoryNobody" | "PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision" | "resolvePlatformKeyboardAndSaveStatusUnsaved2" | "dependenciesRef" | "frameViewerSaveLive" | "resolvePlatformKeyboardAndSaveStatusLink" | "elementRef14" | "resolveDocumentHostStateReadonly" | "DocumentInteractionsOpened" | "resolvePlatformKeyboardAndSaveStatusValue6" | "resolvePlatformKeyboardAndSaveStatusKey" | "resolvePlatformKeyboardAndSaveStatusBody" | "filterPlatformKeyboardAndSaveStatusNext" | "isDocumentFocusedElsewhere" | "resolveDocumentRuntimeUnsent" | "elementRef3" | "elementRef13" | "subscribeProjectFeed" | "isDataModelSchemasUtterance" | "filterDataOperationControlSeq" | "isDataModelSchemasKind3" | "resolveDataModelSchemasBlock2" | "resolveDocumentInteractionsValue" | "filterDocumentInteractionsTarget" | "resolveDataModelSchemasResults" | "documentInteractionsLimit1000" | "takeDocumentSwitchPicture" | "prefetchDocumentViewWithComments" | "resolveDocumentRuntimeMessage" | "resolveDocumentRuntimeVerdict" | "DocumentHostStateClosed" | "isDocumentInteractionsStringify">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.pid || !__documentClosure.fileId) return;
      (0, __documentClosure.resolveObservabilityBootKey)(__documentClosure.pid);
      __documentClosure.docRef.current = null;
      __documentClosure.knownBlocksRef.current = null;
      __documentClosure.summonHostRef.current = null;
      __documentClosure.wholeDocRef.current = null;
      (0, __documentClosure.setPageShape)(null);
      let enabled = false;
      let [items, setItems]: Dynamic = [
        __documentClosure.elementRef2.current,
        __documentClosure.elementRef10.current,
      ];
      let useDocumentInteractionOverlaysResult2: Dynamic;
      let useDocumentInteractionOverlaysResult3: Dynamic;
      let useDocumentInteractionOverlaysResult4: Dynamic;
      let useDocumentInteractionOverlaysResult5: Dynamic;
      let useDocumentInteractionOverlaysHandler = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let useDocumentInteractionOverlaysResult6: Dynamic;
      let useDocumentInteractionOverlaysHandler2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(enabled || useDocumentInteractionOverlaysResult6 !== undefined)) {
          useDocumentInteractionOverlaysResult6 = setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              useDocumentInteractionOverlaysResult6 = undefined;
              if (!enabled) {
                (0, __documentClosure.setBar)(`offline`);
              }
            },
            __documentClosure.documentInteractionsLimit4000,
          );
        }
      };
      let setBar2 = (..._extraArguments: unknown[]): undefined => {
        clearTimeout(useDocumentInteractionOverlaysResult6);
        useDocumentInteractionOverlaysResult6 = undefined;
        (0, __documentClosure.setBar)(
          (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            documentInteractionOverlays === `offline`
              ? null
              : documentInteractionOverlays,
        );
      };
      let useDocumentInteractionOverlaysResult7: Dynamic = null;
      let enabled2 = false;
      let enabled3 = false;
      let pageGoneWhy2 = createDocumentInteractionPageGoneWhy24({
  get enabled() { return enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { enabled = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult7() { return useDocumentInteractionOverlaysResult7; }, set useDocumentInteractionOverlaysResult7(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult7 = __nextDocumentClosureValue; },
  get enabled3() { return enabled3; }, set enabled3(__nextDocumentClosureValue: Dynamic) { enabled3 = __nextDocumentClosureValue; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get setViewOnly() { return __documentClosure.setViewOnly; },
  get setPageGone() { return __documentClosure.setPageGone; },
  get setPageGoneWhy() { return __documentClosure.setPageGoneWhy; },
  get enabled2() { return enabled2; }, set enabled2(__nextDocumentClosureValue: Dynamic) { enabled2 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysHandler2() { return useDocumentInteractionOverlaysHandler2; },
  get setBar2() { return setBar2; },
});
      (0, __documentClosure.setState)(null);
      (0, __documentClosure.setError)(null);
      (0, __documentClosure.setNotice)(null);
      (0, __documentClosure.setUseDocumentInteractionOverlaysState)(null);
      (0, __documentClosure.setViewOnly)(false);
      (0, __documentClosure.setPageGone)(false);
      (0, __documentClosure.setPageGoneWhy)(null);
      (0, __documentClosure.setTabGone)(false);
      (0, __documentClosure.setNodeGone)(false);
      (0, __documentClosure.setBar)(null);
      (0, __documentClosure.setEnabledState)((0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`torn_down`));
      (0, __documentClosure.setSave)(null);
      (0, __documentClosure.setSaveWords)(null);
      (0, __documentClosure.setEnabledState2)(false);
      (0, __documentClosure.setSaveAlarmOwed)(false);
      (0, __documentClosure.setSaveLive)(null);
      (0, __documentClosure.setEnabledState3)(false);
      (0, __documentClosure.setEnabledState4)(false);
      (0, __documentClosure.setPile)(false);
      let container: Dynamic = {
        kind: `project`,
        id: __documentClosure.pid,
      };
      let useDocumentInteractionOverlaysResult8: Dynamic =
        (0, __documentClosure.loadDataOperationControlKind)(container);
      let now = Date.now();
      let setTimeout2: Dynamic = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          setTimeout2 = undefined;
          if (enabled) return;
          let useDocumentInteractionOverlaysResult9: Dynamic = (0, __documentClosure.doorLinkStats)();
          (0, __documentClosure.withWebSpan)(
            `lfile.boot_hang`,
            {
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.container]: __documentClosure.pid,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.fsEntryId]: __documentClosure.fileId,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.muxState]:
                useDocumentInteractionOverlaysResult9.state,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.wsAttempt]:
                useDocumentInteractionOverlaysResult9.attempt,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.wsReadyState]:
                useDocumentInteractionOverlaysResult9.readyState,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.roomLastMsgAgoMs]:
                useDocumentInteractionOverlaysResult9.lastRecvAgoMs,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.netOnline]:
                useDocumentInteractionOverlaysResult9.online,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.muxPending]:
                useDocumentInteractionOverlaysResult9.pending,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.clientRev]: (0, __documentClosure.serverRev)() ?? ``,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.lfileBootMs]: Date.now() - now,
            },
            (..._extraArguments: unknown[]): undefined => {},
            `lfile.boot_hang`,
          );
        },
        __documentClosure.documentInteractionsLimit8000,
      );
      let useDocumentInteractionOverlaysHandler3 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        clearTimeout(setTimeout2);
        setTimeout2 = undefined;
      };
      (createDocumentInteractionEffect5({
  get elementRef() { return __documentClosure.elementRef; },
  get fileValueRef() { return __documentClosure.fileValueRef; },
  get loadDocumentRuntimeObject() { return __documentClosure.loadDocumentRuntimeObject; },
  get useDocumentInteractionOverlaysResult8() { return useDocumentInteractionOverlaysResult8; },
  get fileId() { return __documentClosure.fileId; },
  get enabled() { return enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { enabled = __nextDocumentClosureValue; },
  get docRef() { return __documentClosure.docRef; },
  get resolvePlatformSessionAndSourcesValue5() { return __documentClosure.resolvePlatformSessionAndSourcesValue5; },
  get useDocumentInteractionOverlaysResult3() { return useDocumentInteractionOverlaysResult3; }, set useDocumentInteractionOverlaysResult3(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult3 = __nextDocumentClosureValue; },
  get resolveCommentsStoreValue31() { return __documentClosure.resolveCommentsStoreValue31; },
  get pid() { return __documentClosure.pid; },
  get DocumentInteractions_LnDoc() { return __documentClosure.DocumentInteractions_LnDoc; },
  get setState() { return __documentClosure.setState; },
  get useDocumentInteractionOverlaysHandler3() { return useDocumentInteractionOverlaysHandler3; },
  get withWebSpan() { return __documentClosure.withWebSpan; },
  get TELEMETRY_ATTRIBUTE_NAMES() { return __documentClosure.TELEMETRY_ATTRIBUTE_NAMES; },
  get serverRev() { return __documentClosure.serverRev; },
  get now() { return now; },
  get uniqueItemsRef() { return __documentClosure.uniqueItemsRef; },
  get lookupRef2() { return __documentClosure.lookupRef2; },
  get loadPlatformLiveDocumentAndHistoryRun() { return __documentClosure.loadPlatformLiveDocumentAndHistoryRun; },
  get updatePlatformLiveDocumentAndHistoryShed() { return __documentClosure.updatePlatformLiveDocumentAndHistoryShed; },
  get useDocumentInteractionOverlaysHandler() { return useDocumentInteractionOverlaysHandler; }, set useDocumentInteractionOverlaysHandler(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysHandler = __nextDocumentClosureValue; },
  get resolveWidgetBridgeJson2() { return __documentClosure.resolveWidgetBridgeJson2; },
  get resolveWidgetBridgeCode3() { return __documentClosure.resolveWidgetBridgeCode3; },
  get useDocumentInteractionOverlaysResult4() { return useDocumentInteractionOverlaysResult4; }, set useDocumentInteractionOverlaysResult4(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult4 = __nextDocumentClosureValue; },
  get resolveWidgetBridgeCode2() { return __documentClosure.resolveWidgetBridgeCode2; },
  get updateWidgetBridgeDelete() { return __documentClosure.updateWidgetBridgeDelete; },
  get resolvePlatformLiveDocumentAndHistoryReason() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryReason; },
  get WidgetBridgeCode() { return __documentClosure.WidgetBridgeCode; },
  get resolveWidgetBridgeCode() { return __documentClosure.resolveWidgetBridgeCode; },
  get rereadWidget() { return __documentClosure.rereadWidget; },
  get resolveWidgetBridgeJson() { return __documentClosure.resolveWidgetBridgeJson; },
  get graftEmbedProse() { return __documentClosure.graftEmbedProse; },
  get resolveWidgetBridgeValue3() { return __documentClosure.resolveWidgetBridgeValue3; },
  get resolveDocumentRuntimeType() { return __documentClosure.resolveDocumentRuntimeType; },
  get isDataOperationControlLabel() { return __documentClosure.isDataOperationControlLabel; },
  get PlatformApiAndAuthUser() { return __documentClosure.PlatformApiAndAuthUser; },
  get documentInteractionsLimit10000() { return __documentClosure.documentInteractionsLimit10000; },
  get isPlatformFrameAndCapabilitiesNavigation() { return __documentClosure.isPlatformFrameAndCapabilitiesNavigation; },
  get isPlatformFrameAndCapabilitiesWindow() { return __documentClosure.isPlatformFrameAndCapabilitiesWindow; },
  get isFrameArtifact() { return __documentClosure.isFrameArtifact; },
  get frameViewer() { return __documentClosure.frameViewer; },
  get DocumentHostStateUnscoped() { return __documentClosure.DocumentHostStateUnscoped; },
  get resolveObservabilityBrowserAndOperationEventsIndexedDB() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsIndexedDB; },
  get resolveDocumentInteractionsWarn() { return __documentClosure.resolveDocumentInteractionsWarn; },
  get resolveDataOperationControlLocks() { return __documentClosure.resolveDataOperationControlLocks; },
  get DocumentHostStateFaulted() { return __documentClosure.DocumentHostStateFaulted; },
  get loadDataOperationControlReady() { return __documentClosure.loadDataOperationControlReady; },
  get documentInteractionsLimit3000() { return __documentClosure.documentInteractionsLimit3000; },
  get resolveDocumentInteractionsWarn2() { return __documentClosure.resolveDocumentInteractionsWarn2; },
  get loadDataOperationControlBid() { return __documentClosure.loadDataOperationControlBid; },
  get frameEdgeNow() { return __documentClosure.frameEdgeNow; },
  get resolveDataOperationControlEndsWith() { return __documentClosure.resolveDataOperationControlEndsWith; },
  get resolveDataOperationControlValue33() { return __documentClosure.resolveDataOperationControlValue33; },
  get elementRef4() { return __documentClosure.elementRef4; },
  get resolveDocumentInteractionsFound() { return __documentClosure.resolveDocumentInteractionsFound; },
  get resolvePlatformLiveDocumentAndHistoryPid() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryPid; },
  get elementRef15() { return __documentClosure.elementRef15; },
  get resolvePlatformAnnouncementsSess() { return __documentClosure.resolvePlatformAnnouncementsSess; },
  get isPlatformSessionAndSourcesToLowerCase() { return __documentClosure.isPlatformSessionAndSourcesToLowerCase; },
  get resolvePlatformSyncAndRoutingVerb2() { return __documentClosure.resolvePlatformSyncAndRoutingVerb2; },
  get resolveDataModelSchemasValue27() { return __documentClosure.resolveDataModelSchemasValue27; },
  get useDocumentInteractionOverlaysResult7() { return useDocumentInteractionOverlaysResult7; }, set useDocumentInteractionOverlaysResult7(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult7 = __nextDocumentClosureValue; },
  get liveDoor() { return __documentClosure.liveDoor; },
  get container() { return container; },
  get resolveDocumentHostStateValue2() { return __documentClosure.resolveDocumentHostStateValue2; },
  get frameLane() { return __documentClosure.frameLane; },
  get resolveObservabilityTelemetryRing() { return __documentClosure.resolveObservabilityTelemetryRing; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get resolveObservabilityTelemetryEntries() { return __documentClosure.resolveObservabilityTelemetryEntries; },
  get resolvePlatformSyncAndRoutingValue8() { return __documentClosure.resolvePlatformSyncAndRoutingValue8; },
  get updatePlatformLiveDocumentAndHistoryNote() { return __documentClosure.updatePlatformLiveDocumentAndHistoryNote; },
  get elementRef6() { return __documentClosure.elementRef6; },
  get resolveEditorExtensionsThrew() { return __documentClosure.resolveEditorExtensionsThrew; },
  get DocumentInteractionsThen() { return __documentClosure.DocumentInteractionsThen; },
  get ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c() { return __documentClosure.ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c; },
  get liveSupportCode() { return __documentClosure.liveSupportCode; },
  get isDocumentInteractionsValue() { return __documentClosure.isDocumentInteractionsValue; },
  get resolveObservabilityBrowserAndOperationEventsValue2() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue2; },
  get resolveEditorExtensionsTest2() { return __documentClosure.resolveEditorExtensionsTest2; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
  get clearPlatformLoadingAndStatusDelete() { return __documentClosure.clearPlatformLoadingAndStatusDelete; },
  get clearPlatformSyncAndRoutingDispose() { return __documentClosure.clearPlatformSyncAndRoutingDispose; },
  get ObservabilityBrowserAndOperationEventsWork() { return __documentClosure.ObservabilityBrowserAndOperationEventsWork; },
  get resolveObservabilityBrowserAndOperationEventsWire() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsWire; },
  get isObservabilityBrowserAndOperationEventsPort() { return __documentClosure.isObservabilityBrowserAndOperationEventsPort; },
  get elementRef11() { return __documentClosure.elementRef11; },
  get resolveObservabilityBrowserAndOperationEventsVisible() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsVisible; },
  get contextRef() { return __documentClosure.contextRef; },
  get createDocumentHostHealthMonitor() { return __documentClosure.createDocumentHostHealthMonitor; },
  get resolvePlatformKeyboardAndSaveStatusValue4() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusValue4; },
  get resolveObservabilityBrowserAndOperationEventsFields() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsFields; },
  get resolveObservabilityTelemetryValue19() { return __documentClosure.resolveObservabilityTelemetryValue19; },
  get enabledRef() { return __documentClosure.enabledRef; },
  get setEnabledState() { return __documentClosure.setEnabledState; },
  get resolvePlatformKeyboardAndSaveStatusRise() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusRise; },
  get resolveDocumentHostStateNotice() { return __documentClosure.resolveDocumentHostStateNotice; },
  get elementRef7() { return __documentClosure.elementRef7; },
  get elementRef8() { return __documentClosure.elementRef8; },
  get elementRef17() { return __documentClosure.elementRef17; },
  get setSaveAlarmOwed() { return __documentClosure.setSaveAlarmOwed; },
  get setEnabledState4() { return __documentClosure.setEnabledState4; },
  get setPile() { return __documentClosure.setPile; },
  get loadDataOperationControlVerdict() { return __documentClosure.loadDataOperationControlVerdict; },
  get resolveEditorExtensionsRefusalClass() { return __documentClosure.resolveEditorExtensionsRefusalClass; },
  get resolvePlatformFeatureFlagsEnabled2() { return __documentClosure.resolvePlatformFeatureFlagsEnabled2; },
  get resolveDataOperationControlHold() { return __documentClosure.resolveDataOperationControlHold; },
  get frameFenceAuthor() { return __documentClosure.frameFenceAuthor; },
  get DocumentHostStateClaimed() { return __documentClosure.DocumentHostStateClaimed; },
  get resolveObservabilityBrowserAndOperationEventsRenamed() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsRenamed; },
  get createPagesCustodyClaimedEvent() { return __documentClosure.createPagesCustodyClaimedEvent; },
  get frameHotFrom() { return __documentClosure.frameHotFrom; },
  get DocumentHostStateLooked() { return __documentClosure.DocumentHostStateLooked; },
  get loadCommentsStoreVerb2() { return __documentClosure.loadCommentsStoreVerb2; },
  get transportDoorOf() { return __documentClosure.transportDoorOf; },
  get doorWithPrefetchedDocumentView() { return __documentClosure.doorWithPrefetchedDocumentView; },
  get nudgeLiveDoor() { return __documentClosure.nudgeLiveDoor; },
  get resolveCommentsStoreAround() { return __documentClosure.resolveCommentsStoreAround; },
  get resolvePlatformFeatureFlagsName() { return __documentClosure.resolvePlatformFeatureFlagsName; },
  get resolveDataModelSchemasDoorFactsListenerError() { return __documentClosure.resolveDataModelSchemasDoorFactsListenerError; },
  get updateCommentsActionsAndSelectionEmail() { return __documentClosure.updateCommentsActionsAndSelectionEmail; },
  get pageGoneWhy2() { return pageGoneWhy2; },
  get elementRef16() { return __documentClosure.elementRef16; },
  get onLiveReopen() { return __documentClosure.onLiveReopen; },
  get installDocumentHostStateVisibilityState() { return __documentClosure.installDocumentHostStateVisibilityState; },
  get DataOperationControlMessage10() { return __documentClosure.DataOperationControlMessage10; },
  get elementRef12() { return __documentClosure.elementRef12; },
  get setItems() { return setItems; },
  get mountGen() { return __documentClosure.mountGen; },
  get setNotice() { return __documentClosure.setNotice; },
  get setUseDocumentInteractionOverlaysState() { return __documentClosure.setUseDocumentInteractionOverlaysState; },
  get setRescues() { return __documentClosure.setRescues; },
  get elementRef9() { return __documentClosure.elementRef9; },
  get isPlatformKeyboardAndSaveStatusDown() { return __documentClosure.isPlatformKeyboardAndSaveStatusDown; },
  get resolveDataOperationControlValue11() { return __documentClosure.resolveDataOperationControlValue11; },
  get resolvePlatformAnnouncementsToUpperCase() { return __documentClosure.resolvePlatformAnnouncementsToUpperCase; },
  get quoteRecoveryPreview() { return __documentClosure.quoteRecoveryPreview; },
  get resolvePlatformKeyboardAndSaveStatusShow() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusShow; },
  get resolvePlatformLiveDocumentAndHistoryValue20() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryValue20; },
  get toast() { return __documentClosure.toast; },
  get resolveCommentsStoreValue30() { return __documentClosure.resolveCommentsStoreValue30; },
  get openDebugReportDialog() { return __documentClosure.openDebugReportDialog; },
  get resolvePlatformKeyboardAndSaveStatusDrop() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusDrop; },
  get onLiveReconnecting() { return __documentClosure.onLiveReconnecting; },
  get PlatformKeyboardAndSaveStatusBusy() { return __documentClosure.PlatformKeyboardAndSaveStatusBusy; },
  get resolvePlatformKeyboardAndSaveStatusJudge() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusJudge; },
  get filterPlatformKeyboardAndSaveStatusJudge() { return __documentClosure.filterPlatformKeyboardAndSaveStatusJudge; },
  get setSave() { return __documentClosure.setSave; },
  get resolvePlatformKeyboardAndSaveStatusWhy() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy; },
  get resolvePlatformKeyboardAndSaveStatusPending() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusPending; },
  get setEnabledState3() { return __documentClosure.setEnabledState3; },
  get frameViewerSaveWord() { return __documentClosure.frameViewerSaveWord; },
  get isPlatformKeyboardAndSaveStatusSaved() { return __documentClosure.isPlatformKeyboardAndSaveStatusSaved; },
  get isPlatformKeyboardAndSaveStatusClear() { return __documentClosure.isPlatformKeyboardAndSaveStatusClear; },
  get setBar() { return __documentClosure.setBar; },
  get documentRuntimeLimit0() { return __documentClosure.documentRuntimeLimit0; }, set documentRuntimeLimit0(__nextDocumentClosureValue: Dynamic) { __documentClosure.documentRuntimeLimit0 = __nextDocumentClosureValue; },
  get labelRef() { return __documentClosure.labelRef; },
  get resolveDocumentInteractionsValue3() { return __documentClosure.resolveDocumentInteractionsValue3; },
  get resolveDocumentRuntimeValue() { return __documentClosure.resolveDocumentRuntimeValue; },
  get resolveDataModelSchemasResolved() { return __documentClosure.resolveDataModelSchemasResolved; },
  get useCommentStore() { return __documentClosure.useCommentStore; },
  get commentSummonHost() { return __documentClosure.commentSummonHost; },
  get isCommentsEditorRank() { return __documentClosure.isCommentsEditorRank; },
  get knownBlocksRef() { return __documentClosure.knownBlocksRef; },
  get summonHostRef() { return __documentClosure.summonHostRef; },
  get resolveEditorExtensionsAnchor2() { return __documentClosure.resolveEditorExtensionsAnchor2; },
  get resolveCommentsStoreValue33() { return __documentClosure.resolveCommentsStoreValue33; },
  get resolveCommentsStoreBid() { return __documentClosure.resolveCommentsStoreBid; },
  get resolveDocumentHostStateValue10() { return __documentClosure.resolveDocumentHostStateValue10; },
  get resolveDocumentHostStateValue8() { return __documentClosure.resolveDocumentHostStateValue8; },
  get resolveDocumentHostStateKnown() { return __documentClosure.resolveDocumentHostStateKnown; },
  get resolvePlatformApiAndAuthAnon() { return __documentClosure.resolvePlatformApiAndAuthAnon; },
  get resolveDocumentHostStateSeen() { return __documentClosure.resolveDocumentHostStateSeen; },
  get createDocumentHostCoordinator() { return __documentClosure.createDocumentHostCoordinator; },
  get DocumentInteractionsState8() { return __documentClosure.DocumentInteractionsState8; },
  get installPlatformApiAndAuthPagehide() { return __documentClosure.installPlatformApiAndAuthPagehide; },
  get PlatformApiAndAuthParticipants() { return __documentClosure.PlatformApiAndAuthParticipants; },
  get resolveDocumentHostStateFeedUp() { return __documentClosure.resolveDocumentHostStateFeedUp; },
  get frameLaneLink() { return __documentClosure.frameLaneLink; },
  get resolvePlatformAnnouncementsValue() { return __documentClosure.resolvePlatformAnnouncementsValue; },
  get DocumentInteractionsHere() { return __documentClosure.DocumentInteractionsHere; },
  get resolvePlatformAnnouncementsValue2() { return __documentClosure.resolvePlatformAnnouncementsValue2; },
  get resolveDocumentInteractionsValue4() { return __documentClosure.resolveDocumentInteractionsValue4; },
  get resolveDocumentHostStateValue() { return __documentClosure.resolveDocumentHostStateValue; },
  get isDataModelSchemasColor() { return __documentClosure.isDataModelSchemasColor; },
  get resolveDocumentRuntimeIsArray() { return __documentClosure.resolveDocumentRuntimeIsArray; },
  get wholeDocRef() { return __documentClosure.wholeDocRef; },
  get elementRef18() { return __documentClosure.elementRef18; },
  get elementRef19() { return __documentClosure.elementRef19; },
  get subscribeDataModelSchemasWorking() { return __documentClosure.subscribeDataModelSchemasWorking; },
  get frameClaudeWorking() { return __documentClosure.frameClaudeWorking; },
  get subscribeFrameClaudeActivity() { return __documentClosure.subscribeFrameClaudeActivity; },
  get resolvePlatformAnnouncementsPictured() { return __documentClosure.resolvePlatformAnnouncementsPictured; },
  get resolveObservabilityBootChat() { return __documentClosure.resolveObservabilityBootChat; },
  get isEditorExtensionsValue() { return __documentClosure.isEditorExtensionsValue; },
  get isEditorExtensionsLocation() { return __documentClosure.isEditorExtensionsLocation; },
  get frameHostChromeWitnessed() { return __documentClosure.frameHostChromeWitnessed; },
  get frameConversationPane() { return __documentClosure.frameConversationPane; },
  get hostSays() { return __documentClosure.hostSays; },
  get resolvePlatformAnnouncementsFind() { return __documentClosure.resolvePlatformAnnouncementsFind; },
  get elementRef20() { return __documentClosure.elementRef20; },
  get updateDocumentInteractionsRang() { return __documentClosure.updateDocumentInteractionsRang; },
  get resolveObservabilityBrowserAndOperationEventsValue13() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue13; },
  get resolveObservabilityBrowserAndOperationEventsValue3() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue3; },
  get elementRef21() { return __documentClosure.elementRef21; },
  get updateDocumentHostStatePictured() { return __documentClosure.updateDocumentHostStatePictured; },
  get resolveDocumentInteractionsValue2() { return __documentClosure.resolveDocumentInteractionsValue2; },
  get resolveObservabilityBrowserAndOperationEventsValue14() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue14; },
  get elementRef22() { return __documentClosure.elementRef22; },
  get resolvePlatformAnnouncementsPictured2() { return __documentClosure.resolvePlatformAnnouncementsPictured2; },
  get resolvePlatformAnnouncementsFloor() { return __documentClosure.resolvePlatformAnnouncementsFloor; },
  get elementRef23() { return __documentClosure.elementRef23; },
  get resolvePlatformLiveDocumentAndHistoryCancel() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryCancel; },
  get resolveDocumentHostStateKey() { return __documentClosure.resolveDocumentHostStateKey; },
  get resolveDocumentHostStateValue7() { return __documentClosure.resolveDocumentHostStateValue7; },
  get resolvePlatformAnnouncementsPrincipal() { return __documentClosure.resolvePlatformAnnouncementsPrincipal; },
  get clearDocumentHostStateDelete() { return __documentClosure.clearDocumentHostStateDelete; },
  get resolveCommentsStoreBlocks() { return __documentClosure.resolveCommentsStoreBlocks; },
  get DocumentInteractionsState4() { return __documentClosure.DocumentInteractionsState4; },
  get frameViewerEdit() { return __documentClosure.frameViewerEdit; },
  get frameViewerRev() { return __documentClosure.frameViewerRev; },
  get resolvePlatformLiveDocumentAndHistoryPartial() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryPartial; },
  get updatePlatformLiveDocumentAndHistorySeated() { return __documentClosure.updatePlatformLiveDocumentAndHistorySeated; },
  get resolvePlatformLiveDocumentAndHistoryValue24() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryValue24; },
  get resolvePlatformKeyboardAndSaveStatusAssert() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusAssert; },
  get resolvePlatformKeyboardAndSaveStatusCount() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusCount; },
  get resolvePlatformKeyboardAndSaveStatusWhy2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusWhy2; },
  get isPlatformKeyboardAndSaveStatusLimit() { return __documentClosure.isPlatformKeyboardAndSaveStatusLimit; },
  get resolvePlatformKeyboardAndSaveStatusKeptAsText() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKeptAsText; },
  get isPlatformKeyboardAndSaveStatusText() { return __documentClosure.isPlatformKeyboardAndSaveStatusText; },
  get DocumentHostStateLines() { return __documentClosure.DocumentHostStateLines; },
  get isPlatformKeyboardAndSaveStatusFilter() { return __documentClosure.isPlatformKeyboardAndSaveStatusFilter; },
  get DocumentHostStateHanded() { return __documentClosure.DocumentHostStateHanded; },
  get resolvePlatformKeyboardAndSaveStatusBid2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBid2; },
  get resolvePlatformKeyboardAndSaveStatusFolds() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusFolds; },
  get resolvePlatformKeyboardAndSaveStatusUnknownId() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusUnknownId; },
  get resolveDataOperationControlValue12() { return __documentClosure.resolveDataOperationControlValue12; },
  get resolvePlatformKeyboardAndSaveStatusFace() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusFace; },
  get setBar2() { return setBar2; },
  get DataOperationControlNodeGone2() { return __documentClosure.DataOperationControlNodeGone2; },
  get setNodeGone() { return __documentClosure.setNodeGone; },
  get setError() { return __documentClosure.setError; },
  get setSaveWords() { return __documentClosure.setSaveWords; },
  get setEnabledState2() { return __documentClosure.setEnabledState2; },
  get resolveDocumentRuntimeState() { return __documentClosure.resolveDocumentRuntimeState; },
  get resolvePlatformKeyboardAndSaveStatusMoved() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusMoved; },
  get resolvePlatformKeyboardAndSaveStatusBusy() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBusy; },
  get resolvePlatformKeyboardAndSaveStatusNotice() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusNotice; },
  get resolveDataModelSchemasBlock() { return __documentClosure.resolveDataModelSchemasBlock; },
  get resolveCommentsActionsAndSelectionFrom() { return __documentClosure.resolveCommentsActionsAndSelectionFrom; },
  get DocumentHostStatePictured() { return __documentClosure.DocumentHostStatePictured; },
  get setPageShape() { return __documentClosure.setPageShape; },
  get resolveCommentAnchorsWhole() { return __documentClosure.resolveCommentAnchorsWhole; },
  get isDocumentHostStateIsArray() { return __documentClosure.isDocumentHostStateIsArray; },
  get isDocumentRuntimeReason() { return __documentClosure.isDocumentRuntimeReason; },
  get resolvePlatformAnnouncementsValue10() { return __documentClosure.resolvePlatformAnnouncementsValue10; },
  get isPlatformAnnouncementsValue() { return __documentClosure.isPlatformAnnouncementsValue; },
  get createPagesFaceUndoEvent() { return __documentClosure.createPagesFaceUndoEvent; },
  get createPagesEditorLockedEvent() { return __documentClosure.createPagesEditorLockedEvent; },
  get isDocumentRuntimeText() { return __documentClosure.isDocumentRuntimeText; },
  get createPagesOutboxDroppedEvent() { return __documentClosure.createPagesOutboxDroppedEvent; },
  get resolvePlatformKeyboardAndSaveStatusKept() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKept; },
  get isPlatformKeyboardAndSaveStatusPenOff() { return __documentClosure.isPlatformKeyboardAndSaveStatusPenOff; },
  get resolveDocumentRuntimeValue5() { return __documentClosure.resolveDocumentRuntimeValue5; },
  get resolveDocumentRuntimeIsArray2() { return __documentClosure.resolveDocumentRuntimeIsArray2; },
  get resolveDocumentRuntimeValue4() { return __documentClosure.resolveDocumentRuntimeValue4; },
  get isDocumentRuntimeToken() { return __documentClosure.isDocumentRuntimeToken; },
  get elementRef5() { return __documentClosure.elementRef5; },
  get setDetachAsk() { return __documentClosure.setDetachAsk; },
  get resolveEditorMediaValue2() { return __documentClosure.resolveEditorMediaValue2; },
  get filterPlatformLiveDocumentAndHistoryRevive() { return __documentClosure.filterPlatformLiveDocumentAndHistoryRevive; },
  get resolveObservabilityBootPaint2() { return __documentClosure.resolveObservabilityBootPaint2; },
  get resolvePlatformKeyboardAndSaveStatusBid() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBid; },
  get resolveDocumentInteractionsTray() { return __documentClosure.resolveDocumentInteractionsTray; },
  get createPagesWriteGateRefusedCappedEvent() { return __documentClosure.createPagesWriteGateRefusedCappedEvent; },
  get resolveObservabilityBrowserAndOperationEventsWork() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsWork; },
  get resolveObservabilityBrowserAndOperationEventsComplete() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsComplete; },
  get resolveObservabilityBrowserAndOperationEventsValue8() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue8; },
  get filterDocumentRuntimeStale() { return __documentClosure.filterDocumentRuntimeStale; },
  get frameViewerDirty() { return __documentClosure.frameViewerDirty; },
  get frameViewerSelection() { return __documentClosure.frameViewerSelection; },
  get updateObservabilityBrowserAndOperationEventsSelected() { return __documentClosure.updateObservabilityBrowserAndOperationEventsSelected; },
  get resolveDocumentHostStateNode() { return __documentClosure.resolveDocumentHostStateNode; },
  get updateFrameGesturesAnchor() { return __documentClosure.updateFrameGesturesAnchor; },
  get documentScrollKey() { return __documentClosure.documentScrollKey; },
  get resolvePlatformKeyboardAndSaveStatusKeys() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKeys; },
  get DocumentInteractionsState7() { return __documentClosure.DocumentInteractionsState7; }, set DocumentInteractionsState7(__nextDocumentClosureValue: Dynamic) { __documentClosure.DocumentInteractionsState7 = __nextDocumentClosureValue; },
  get PlatformAnnouncementsLive() { return __documentClosure.PlatformAnnouncementsLive; },
  get updatePlatformLiveDocumentAndHistoryNobody() { return __documentClosure.updatePlatformLiveDocumentAndHistoryNobody; },
  get PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision() { return __documentClosure.PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision; },
  get resolvePlatformKeyboardAndSaveStatusUnsaved2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusUnsaved2; },
  get dependenciesRef() { return __documentClosure.dependenciesRef; },
  get frameViewerSaveLive() { return __documentClosure.frameViewerSaveLive; },
  get resolvePlatformKeyboardAndSaveStatusLink() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusLink; },
  get elementRef14() { return __documentClosure.elementRef14; },
  get setSaveLive() { return __documentClosure.setSaveLive; },
  get resolveDocumentHostStateReadonly() { return __documentClosure.resolveDocumentHostStateReadonly; },
  get DocumentInteractionsOpened() { return __documentClosure.DocumentInteractionsOpened; },
  get resolvePlatformKeyboardAndSaveStatusValue6() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusValue6; },
  get resolvePlatformKeyboardAndSaveStatusKey() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKey; },
  get resolvePlatformKeyboardAndSaveStatusBody() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBody; },
  get filterPlatformKeyboardAndSaveStatusNext() { return __documentClosure.filterPlatformKeyboardAndSaveStatusNext; },
  get isDocumentFocusedElsewhere() { return __documentClosure.isDocumentFocusedElsewhere; },
  get resolveDocumentRuntimeUnsent() { return __documentClosure.resolveDocumentRuntimeUnsent; },
  get elementRef3() { return __documentClosure.elementRef3; },
  get elementRef13() { return __documentClosure.elementRef13; },
  get useDocumentInteractionOverlaysResult2() { return useDocumentInteractionOverlaysResult2; }, set useDocumentInteractionOverlaysResult2(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult2 = __nextDocumentClosureValue; },
  get subscribeProjectFeed() { return __documentClosure.subscribeProjectFeed; },
  get isDataModelSchemasUtterance() { return __documentClosure.isDataModelSchemasUtterance; },
  get filterDataOperationControlSeq() { return __documentClosure.filterDataOperationControlSeq; },
  get isDataModelSchemasKind3() { return __documentClosure.isDataModelSchemasKind3; },
  get resolveDataModelSchemasBlock2() { return __documentClosure.resolveDataModelSchemasBlock2; },
  get resolveDocumentInteractionsValue() { return __documentClosure.resolveDocumentInteractionsValue; },
  get filterDocumentInteractionsTarget() { return __documentClosure.filterDocumentInteractionsTarget; },
  get resolveDataModelSchemasResults() { return __documentClosure.resolveDataModelSchemasResults; },
  get useDocumentInteractionOverlaysResult5() { return useDocumentInteractionOverlaysResult5; }, set useDocumentInteractionOverlaysResult5(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult5 = __nextDocumentClosureValue; },
  get documentInteractionsLimit1000() { return __documentClosure.documentInteractionsLimit1000; },
  get takeDocumentSwitchPicture() { return __documentClosure.takeDocumentSwitchPicture; },
  get prefetchDocumentViewWithComments() { return __documentClosure.prefetchDocumentViewWithComments; },
  get resolveDocumentRuntimeMessage() { return __documentClosure.resolveDocumentRuntimeMessage; },
  get resolveDocumentRuntimeVerdict() { return __documentClosure.resolveDocumentRuntimeVerdict; },
  get setTabGone() { return __documentClosure.setTabGone; },
}))();
      return createDocumentInteractionRender22({
  get enabled() { return enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { enabled = __nextDocumentClosureValue; },
  get DocumentHostStateClosed() { return __documentClosure.DocumentHostStateClosed; },
  get pid() { return __documentClosure.pid; },
  get useDocumentInteractionOverlaysHandler3() { return useDocumentInteractionOverlaysHandler3; },
  get useDocumentInteractionOverlaysResult3() { return useDocumentInteractionOverlaysResult3; }, set useDocumentInteractionOverlaysResult3(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult3 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult2() { return useDocumentInteractionOverlaysResult2; }, set useDocumentInteractionOverlaysResult2(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult2 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult4() { return useDocumentInteractionOverlaysResult4; }, set useDocumentInteractionOverlaysResult4(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult4 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult5() { return useDocumentInteractionOverlaysResult5; }, set useDocumentInteractionOverlaysResult5(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult5 = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysHandler() { return useDocumentInteractionOverlaysHandler; }, set useDocumentInteractionOverlaysHandler(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysHandler = __nextDocumentClosureValue; },
  get DocumentInteractionsState4() { return __documentClosure.DocumentInteractionsState4; },
  get useDocumentInteractionOverlaysResult6() { return useDocumentInteractionOverlaysResult6; }, set useDocumentInteractionOverlaysResult6(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult6 = __nextDocumentClosureValue; },
  get items() { return items; },
  get mountGen() { return __documentClosure.mountGen; },
  get elementRef4() { return __documentClosure.elementRef4; },
  get setRescues() { return __documentClosure.setRescues; },
  get isDocumentInteractionsStringify() { return __documentClosure.isDocumentInteractionsStringify; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get elementRef3() { return __documentClosure.elementRef3; },
  get elementRef11() { return __documentClosure.elementRef11; },
  get setItems() { return setItems; },
  get elementRef13() { return __documentClosure.elementRef13; },
  get elementRef16() { return __documentClosure.elementRef16; },
  get elementRef12() { return __documentClosure.elementRef12; },
  get graftEmbedProse() { return __documentClosure.graftEmbedProse; },
  get rereadWidget() { return __documentClosure.rereadWidget; },
});
    });
}

export function createDocumentInteractionPageGoneWhy24(__documentClosure: Pick<DocumentInteractionContext, "enabled" | "useDocumentInteractionOverlaysResult7" | "enabled3" | "resolveCommentsStoreLayer" | "setViewOnly" | "setPageGone" | "setPageGoneWhy" | "enabled2" | "useDocumentInteractionOverlaysHandler2" | "setBar2">): Dynamic {
  return (({ ["pageGoneWhy2"]: ((
        documentInteractionOverlays?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (__documentClosure.enabled) return;
        let matchesViewOnly =
          __documentClosure.useDocumentInteractionOverlaysResult7?.viewOnly() === true;
        let matchesReadsRefused =
          __documentClosure.useDocumentInteractionOverlaysResult7?.readsRefused() === true;
        if (matchesReadsRefused !== __documentClosure.enabled3) {
          __documentClosure.enabled3 = matchesReadsRefused;
          (0, __documentClosure.resolveCommentsStoreLayer)(
            `host`,
            matchesReadsRefused ? `transport_stopped` : `transport_resumed`,
            {
              why: `access`,
            },
          );
        }
        let matchesPageGone =
          __documentClosure.useDocumentInteractionOverlaysResult7?.pageGone() === true;
        (0, __documentClosure.setViewOnly)(matchesViewOnly);
        (0, __documentClosure.setPageGone)(matchesPageGone);
        (0, __documentClosure.setPageGoneWhy)(
          matchesPageGone
            ? (__documentClosure.useDocumentInteractionOverlaysResult7?.pageGoneWhy() ??
                `deleted`)
            : null,
        );
        if (matchesPageGone && !__documentClosure.enabled2) {
          __documentClosure.enabled2 = true;
          (0, __documentClosure.resolveCommentsStoreLayer)(`host`, `transport_stopped`, {
            why: `page_gone`,
            kind:
              __documentClosure.useDocumentInteractionOverlaysResult7?.pageGoneWhy() ?? `deleted`,
          });
        }
        if (
          documentInteractionOverlays === `readonly` &&
          !matchesViewOnly &&
          !matchesPageGone &&
          !matchesReadsRefused
        ) {
          (0, __documentClosure.useDocumentInteractionOverlaysHandler2)();
        } else {
          (0, __documentClosure.setBar2)();
        }
      }) })["pageGoneWhy2"]);
}

export function createDocumentInteractionShed6(__documentClosure: Pick<DocumentInteractionContext, "uniqueItems2" | "uniqueItems6" | "resolveWidgetBridgeCode2" | "useDocumentInteractionOverlaysHandler4" | "useDocumentInteractionOverlaysResult8" | "updateWidgetBridgeDelete" | "lookup" | "uniqueItems" | "resolvePlatformLiveDocumentAndHistoryReason" | "WidgetBridgeCode" | "enabled" | "useDocumentInteractionOverlaysResult10" | "shed" | "resolveWidgetBridgeCode" | "useDocumentInteractionOverlaysHandler5">): Dynamic {
  return (({ ["shed"]: (async (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            if (__documentClosure.uniqueItems2.has(documentInteractionOverlays)) {
              __documentClosure.uniqueItems6.add(documentInteractionOverlays);
              return;
            }
            __documentClosure.uniqueItems2.add(documentInteractionOverlays);
            let enabled4: Dynamic = false;
            let useDocumentInteractionOverlaysResult24: Dynamic;
            try {
              let widgetBridgeCode2: Dynamic = (0, __documentClosure.resolveWidgetBridgeCode2)(
                await (0, __documentClosure.useDocumentInteractionOverlaysHandler4)(
                  (..._extraArguments: unknown[]): Dynamic =>
                    __documentClosure.useDocumentInteractionOverlaysResult8.read(
                      {
                        object: `node`,
                        id: documentInteractionOverlays,
                      },
                      `widget`,
                    ),
                ),
              );
              (0, __documentClosure.updateWidgetBridgeDelete)(
                __documentClosure.lookup,
                __documentClosure.uniqueItems,
                documentInteractionOverlays,
                widgetBridgeCode2,
              );
            } catch (error2: Dynamic) {
              let message = error2 instanceof Error ? error2.message : ``;
              enabled4 = (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryReason)(error2);
              if (enabled4) {
                useDocumentInteractionOverlaysResult24 = error2.retryAfterMs;
              }
              if (
                !enabled4 &&
                (message.includes(`: deny `) ||
                  message.includes(`allow with NO value`))
              ) {
                (0, __documentClosure.updateWidgetBridgeDelete)(
                  __documentClosure.lookup,
                  __documentClosure.uniqueItems,
                  documentInteractionOverlays,
                  __documentClosure.WidgetBridgeCode,
                );
              }
            } finally {
              __documentClosure.uniqueItems2.delete(documentInteractionOverlays);
            }
            if (!__documentClosure.enabled) {
              if (!enabled4)
                __documentClosure.useDocumentInteractionOverlaysResult10.settle(
                  `w:${documentInteractionOverlays}`,
                );
              else if (
                !__documentClosure.uniqueItems6.has(documentInteractionOverlays) &&
                __documentClosure.uniqueItems.has(documentInteractionOverlays) &&
                __documentClosure.useDocumentInteractionOverlaysResult10.shed(
                  `w:${documentInteractionOverlays}`,
                  (..._extraArguments: unknown[]): undefined =>
                    void (0, __documentClosure.shed)(documentInteractionOverlays),
                  useDocumentInteractionOverlaysResult24,
                ) === `gave-up`
              ) {
                let lookupEntry: Dynamic = __documentClosure.lookup.get(
                  documentInteractionOverlays,
                );
                if (lookupEntry === undefined || lookupEntry.stalled === true) {
                  (0, __documentClosure.updateWidgetBridgeDelete)(
                    __documentClosure.lookup,
                    __documentClosure.uniqueItems,
                    documentInteractionOverlays,
                    (0, __documentClosure.resolveWidgetBridgeCode)(),
                  );
                }
              }
              (0, __documentClosure.useDocumentInteractionOverlaysHandler5)();
              if (__documentClosure.uniqueItems6.delete(documentInteractionOverlays)) {
                (0, __documentClosure.shed)(documentInteractionOverlays);
              }
            }
          }) })["shed"]);
}

export function createDocumentInteractionSettle7(__documentClosure: Pick<DocumentInteractionContext, "uniqueItems4" | "uniqueItems5" | "resolveWidgetBridgeJson" | "useDocumentInteractionOverlaysHandler4" | "useDocumentInteractionOverlaysResult8" | "uniqueItems3" | "lookup2" | "resolvePlatformLiveDocumentAndHistoryReason" | "enabled" | "useDocumentInteractionOverlaysResult10" | "settle" | "useDocumentInteractionOverlaysHandler5">): Dynamic {
  return (({ ["settle"]: (async (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            if (__documentClosure.uniqueItems4.has(documentInteractionOverlays)) {
              __documentClosure.uniqueItems5.add(documentInteractionOverlays);
              return;
            }
            __documentClosure.uniqueItems4.add(documentInteractionOverlays);
            let enabled4: Dynamic = false;
            let useDocumentInteractionOverlaysResult24: Dynamic;
            try {
              let widgetBridgeJson: Dynamic = (0, __documentClosure.resolveWidgetBridgeJson)(
                await (0, __documentClosure.useDocumentInteractionOverlaysHandler4)(
                  (..._extraArguments: unknown[]): Dynamic =>
                    __documentClosure.useDocumentInteractionOverlaysResult8.read(
                      {
                        object: `node`,
                        id: documentInteractionOverlays,
                      },
                      `prose`,
                    ),
                ),
              );
              if (
                widgetBridgeJson !== undefined &&
                __documentClosure.uniqueItems3.has(documentInteractionOverlays)
              ) {
                __documentClosure.lookup2.set(documentInteractionOverlays, widgetBridgeJson);
              } else {
                if (widgetBridgeJson === undefined) {
                  __documentClosure.lookup2.delete(documentInteractionOverlays);
                }
              }
            } catch (error2: Dynamic) {
              let message = error2 instanceof Error ? error2.message : ``;
              enabled4 = (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryReason)(error2);
              if (enabled4) {
                useDocumentInteractionOverlaysResult24 = error2.retryAfterMs;
              }
              if (
                !enabled4 &&
                (message.includes(`: deny `) ||
                  message.includes(`allow with NO value`))
              ) {
                __documentClosure.lookup2.delete(documentInteractionOverlays);
              }
            } finally {
              __documentClosure.uniqueItems4.delete(documentInteractionOverlays);
            }
            if (!__documentClosure.enabled) {
              if (enabled4) {
                if (
                  !__documentClosure.uniqueItems5.has(documentInteractionOverlays) &&
                  __documentClosure.uniqueItems3.has(documentInteractionOverlays)
                ) {
                  __documentClosure.useDocumentInteractionOverlaysResult10.shed(
                    `p:${documentInteractionOverlays}`,
                    (..._extraArguments: unknown[]): undefined => {
                      if (__documentClosure.uniqueItems3.has(documentInteractionOverlays)) {
                        (0, __documentClosure.settle)(documentInteractionOverlays);
                      }
                    },
                    useDocumentInteractionOverlaysResult24,
                  );
                }
              } else {
                __documentClosure.useDocumentInteractionOverlaysResult10.settle(
                  `p:${documentInteractionOverlays}`,
                );
              }
              (0, __documentClosure.useDocumentInteractionOverlaysHandler5)();
              if (__documentClosure.uniqueItems5.delete(documentInteractionOverlays)) {
                (0, __documentClosure.settle)(documentInteractionOverlays);
              }
            }
          }) })["settle"]);
}

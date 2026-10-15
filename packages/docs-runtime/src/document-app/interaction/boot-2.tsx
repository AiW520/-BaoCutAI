/** BaoCut: extracted document interaction boot-2 expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentInteractionContext } from "./context";
import { createDocumentInteractionShed6, createDocumentInteractionSettle7 } from "./boot";
import { createDocumentInteractionUpdategraftEmbedProse_current8, createDocumentInteractionUpdateListLevelsMax9, createDocumentInteractionShadow10, createDocumentInteractionClaimed11 } from "./connection";
import { createDocumentInteractionUpdateelementRef12_current12 } from "./connection-2";
import { createDocumentInteractionUpdateuseDocumentInteractionOverlaysResult221 } from "./shutdown";

export function createDocumentInteractionEffect5(__documentClosure: Pick<DocumentInteractionContext, "elementRef" | "fileValueRef" | "loadDocumentRuntimeObject" | "useDocumentInteractionOverlaysResult8" | "fileId" | "enabled" | "docRef" | "resolvePlatformSessionAndSourcesValue5" | "useDocumentInteractionOverlaysResult3" | "resolveCommentsStoreValue31" | "pid" | "DocumentInteractions_LnDoc" | "setState" | "useDocumentInteractionOverlaysHandler3" | "withWebSpan" | "TELEMETRY_ATTRIBUTE_NAMES" | "serverRev" | "now" | "uniqueItemsRef" | "lookupRef2" | "loadPlatformLiveDocumentAndHistoryRun" | "updatePlatformLiveDocumentAndHistoryShed" | "useDocumentInteractionOverlaysHandler" | "resolveWidgetBridgeJson2" | "resolveWidgetBridgeCode3" | "useDocumentInteractionOverlaysResult4" | "resolveWidgetBridgeCode2" | "updateWidgetBridgeDelete" | "resolvePlatformLiveDocumentAndHistoryReason" | "WidgetBridgeCode" | "resolveWidgetBridgeCode" | "rereadWidget" | "resolveWidgetBridgeJson" | "graftEmbedProse" | "resolveWidgetBridgeValue3" | "resolveDocumentRuntimeType" | "isDataOperationControlLabel" | "PlatformApiAndAuthUser" | "documentInteractionsLimit10000" | "isPlatformFrameAndCapabilitiesNavigation" | "isPlatformFrameAndCapabilitiesWindow" | "isFrameArtifact" | "frameViewer" | "DocumentHostStateUnscoped" | "resolveObservabilityBrowserAndOperationEventsIndexedDB" | "resolveDocumentInteractionsWarn" | "resolveDataOperationControlLocks" | "DocumentHostStateFaulted" | "loadDataOperationControlReady" | "documentInteractionsLimit3000" | "resolveDocumentInteractionsWarn2" | "loadDataOperationControlBid" | "frameEdgeNow" | "resolveDataOperationControlEndsWith" | "resolveDataOperationControlValue33" | "elementRef4" | "resolveDocumentInteractionsFound" | "resolvePlatformLiveDocumentAndHistoryPid" | "elementRef15" | "resolvePlatformAnnouncementsSess" | "isPlatformSessionAndSourcesToLowerCase" | "resolvePlatformSyncAndRoutingVerb2" | "resolveDataModelSchemasValue27" | "useDocumentInteractionOverlaysResult7" | "liveDoor" | "container" | "resolveDocumentHostStateValue2" | "frameLane" | "resolveObservabilityTelemetryRing" | "resolveCommentsStoreLayer" | "resolveObservabilityTelemetryEntries" | "resolvePlatformSyncAndRoutingValue8" | "updatePlatformLiveDocumentAndHistoryNote" | "elementRef6" | "resolveEditorExtensionsThrew" | "DocumentInteractionsThen" | "ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c" | "liveSupportCode" | "isDocumentInteractionsValue" | "resolveObservabilityBrowserAndOperationEventsValue2" | "resolveEditorExtensionsTest2" | "emitTelemetryEvent" | "clearPlatformLoadingAndStatusDelete" | "clearPlatformSyncAndRoutingDispose" | "ObservabilityBrowserAndOperationEventsWork" | "resolveObservabilityBrowserAndOperationEventsWire" | "isObservabilityBrowserAndOperationEventsPort" | "elementRef11" | "resolveObservabilityBrowserAndOperationEventsVisible" | "contextRef" | "createDocumentHostHealthMonitor" | "resolvePlatformKeyboardAndSaveStatusValue4" | "resolveObservabilityBrowserAndOperationEventsFields" | "resolveObservabilityTelemetryValue19" | "enabledRef" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise" | "resolveDocumentHostStateNotice" | "elementRef7" | "elementRef8" | "elementRef17" | "setSaveAlarmOwed" | "setEnabledState4" | "setPile" | "loadDataOperationControlVerdict" | "resolveEditorExtensionsRefusalClass" | "resolvePlatformFeatureFlagsEnabled2" | "resolveDataOperationControlHold" | "frameFenceAuthor" | "DocumentHostStateClaimed" | "resolveObservabilityBrowserAndOperationEventsRenamed" | "createPagesCustodyClaimedEvent" | "frameHotFrom" | "DocumentHostStateLooked" | "loadCommentsStoreVerb2" | "transportDoorOf" | "doorWithPrefetchedDocumentView" | "nudgeLiveDoor" | "resolveCommentsStoreAround" | "resolvePlatformFeatureFlagsName" | "resolveDataModelSchemasDoorFactsListenerError" | "updateCommentsActionsAndSelectionEmail" | "pageGoneWhy2" | "elementRef16" | "onLiveReopen" | "installDocumentHostStateVisibilityState" | "DataOperationControlMessage10" | "elementRef12" | "setItems" | "mountGen" | "setNotice" | "setUseDocumentInteractionOverlaysState" | "setRescues" | "elementRef9" | "isPlatformKeyboardAndSaveStatusDown" | "resolveDataOperationControlValue11" | "resolvePlatformAnnouncementsToUpperCase" | "quoteRecoveryPreview" | "resolvePlatformKeyboardAndSaveStatusShow" | "resolvePlatformLiveDocumentAndHistoryValue20" | "toast" | "resolveCommentsStoreValue30" | "openDebugReportDialog" | "resolvePlatformKeyboardAndSaveStatusDrop" | "onLiveReconnecting" | "PlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusJudge" | "filterPlatformKeyboardAndSaveStatusJudge" | "setSave" | "resolvePlatformKeyboardAndSaveStatusWhy" | "resolvePlatformKeyboardAndSaveStatusPending" | "setEnabledState3" | "frameViewerSaveWord" | "isPlatformKeyboardAndSaveStatusSaved" | "isPlatformKeyboardAndSaveStatusClear" | "setBar" | "documentRuntimeLimit0" | "labelRef" | "resolveDocumentInteractionsValue3" | "resolveDocumentRuntimeValue" | "resolveDataModelSchemasResolved" | "useCommentStore" | "commentSummonHost" | "isCommentsEditorRank" | "knownBlocksRef" | "summonHostRef" | "resolveEditorExtensionsAnchor2" | "resolveCommentsStoreValue33" | "resolveCommentsStoreBid" | "resolveDocumentHostStateValue10" | "resolveDocumentHostStateValue8" | "resolveDocumentHostStateKnown" | "resolvePlatformApiAndAuthAnon" | "resolveDocumentHostStateSeen" | "createDocumentHostCoordinator" | "DocumentInteractionsState8" | "installPlatformApiAndAuthPagehide" | "PlatformApiAndAuthParticipants" | "resolveDocumentHostStateFeedUp" | "frameLaneLink" | "resolvePlatformAnnouncementsValue" | "DocumentInteractionsHere" | "resolvePlatformAnnouncementsValue2" | "resolveDocumentInteractionsValue4" | "resolveDocumentHostStateValue" | "isDataModelSchemasColor" | "resolveDocumentRuntimeIsArray" | "wholeDocRef" | "elementRef18" | "elementRef19" | "subscribeDataModelSchemasWorking" | "frameClaudeWorking" | "subscribeFrameClaudeActivity" | "resolvePlatformAnnouncementsPictured" | "resolveObservabilityBootChat" | "isEditorExtensionsValue" | "isEditorExtensionsLocation" | "frameHostChromeWitnessed" | "frameConversationPane" | "hostSays" | "resolvePlatformAnnouncementsFind" | "elementRef20" | "updateDocumentInteractionsRang" | "resolveObservabilityBrowserAndOperationEventsValue13" | "resolveObservabilityBrowserAndOperationEventsValue3" | "elementRef21" | "updateDocumentHostStatePictured" | "resolveDocumentInteractionsValue2" | "resolveObservabilityBrowserAndOperationEventsValue14" | "elementRef22" | "resolvePlatformAnnouncementsPictured2" | "resolvePlatformAnnouncementsFloor" | "elementRef23" | "resolvePlatformLiveDocumentAndHistoryCancel" | "resolveDocumentHostStateKey" | "resolveDocumentHostStateValue7" | "resolvePlatformAnnouncementsPrincipal" | "clearDocumentHostStateDelete" | "resolveCommentsStoreBlocks" | "DocumentInteractionsState4" | "frameViewerEdit" | "frameViewerRev" | "resolvePlatformLiveDocumentAndHistoryPartial" | "updatePlatformLiveDocumentAndHistorySeated" | "resolvePlatformLiveDocumentAndHistoryValue24" | "resolvePlatformKeyboardAndSaveStatusAssert" | "resolvePlatformKeyboardAndSaveStatusCount" | "resolvePlatformKeyboardAndSaveStatusWhy2" | "isPlatformKeyboardAndSaveStatusLimit" | "resolvePlatformKeyboardAndSaveStatusKeptAsText" | "isPlatformKeyboardAndSaveStatusText" | "DocumentHostStateLines" | "isPlatformKeyboardAndSaveStatusFilter" | "DocumentHostStateHanded" | "resolvePlatformKeyboardAndSaveStatusBid2" | "resolvePlatformKeyboardAndSaveStatusFolds" | "resolvePlatformKeyboardAndSaveStatusUnknownId" | "resolveDataOperationControlValue12" | "resolvePlatformKeyboardAndSaveStatusFace" | "setBar2" | "DataOperationControlNodeGone2" | "setNodeGone" | "setError" | "setSaveWords" | "setEnabledState2" | "resolveDocumentRuntimeState" | "resolvePlatformKeyboardAndSaveStatusMoved" | "resolvePlatformKeyboardAndSaveStatusBusy" | "resolvePlatformKeyboardAndSaveStatusNotice" | "resolveDataModelSchemasBlock" | "resolveCommentsActionsAndSelectionFrom" | "DocumentHostStatePictured" | "setPageShape" | "resolveCommentAnchorsWhole" | "isDocumentHostStateIsArray" | "isDocumentRuntimeReason" | "resolvePlatformAnnouncementsValue10" | "isPlatformAnnouncementsValue" | "createPagesFaceUndoEvent" | "createPagesEditorLockedEvent" | "isDocumentRuntimeText" | "createPagesOutboxDroppedEvent" | "resolvePlatformKeyboardAndSaveStatusKept" | "isPlatformKeyboardAndSaveStatusPenOff" | "resolveDocumentRuntimeValue5" | "resolveDocumentRuntimeIsArray2" | "resolveDocumentRuntimeValue4" | "isDocumentRuntimeToken" | "elementRef5" | "setDetachAsk" | "resolveEditorMediaValue2" | "filterPlatformLiveDocumentAndHistoryRevive" | "resolveObservabilityBootPaint2" | "resolvePlatformKeyboardAndSaveStatusBid" | "resolveDocumentInteractionsTray" | "createPagesWriteGateRefusedCappedEvent" | "resolveObservabilityBrowserAndOperationEventsWork" | "resolveObservabilityBrowserAndOperationEventsComplete" | "resolveObservabilityBrowserAndOperationEventsValue8" | "filterDocumentRuntimeStale" | "frameViewerDirty" | "frameViewerSelection" | "updateObservabilityBrowserAndOperationEventsSelected" | "resolveDocumentHostStateNode" | "updateFrameGesturesAnchor" | "documentScrollKey" | "resolvePlatformKeyboardAndSaveStatusKeys" | "DocumentInteractionsState7" | "PlatformAnnouncementsLive" | "updatePlatformLiveDocumentAndHistoryNobody" | "PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision" | "resolvePlatformKeyboardAndSaveStatusUnsaved2" | "dependenciesRef" | "frameViewerSaveLive" | "resolvePlatformKeyboardAndSaveStatusLink" | "elementRef14" | "setSaveLive" | "resolveDocumentHostStateReadonly" | "DocumentInteractionsOpened" | "resolvePlatformKeyboardAndSaveStatusValue6" | "resolvePlatformKeyboardAndSaveStatusKey" | "resolvePlatformKeyboardAndSaveStatusBody" | "filterPlatformKeyboardAndSaveStatusNext" | "isDocumentFocusedElsewhere" | "resolveDocumentRuntimeUnsent" | "elementRef3" | "elementRef13" | "useDocumentInteractionOverlaysResult2" | "subscribeProjectFeed" | "isDataModelSchemasUtterance" | "filterDataOperationControlSeq" | "isDataModelSchemasKind3" | "resolveDataModelSchemasBlock2" | "resolveDocumentInteractionsValue" | "filterDocumentInteractionsTarget" | "resolveDataModelSchemasResults" | "useDocumentInteractionOverlaysResult5" | "documentInteractionsLimit1000" | "takeDocumentSwitchPicture" | "prefetchDocumentViewWithComments" | "resolveDocumentRuntimeMessage" | "resolveDocumentRuntimeVerdict" | "setTabGone">): Dynamic {
  return (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let handed: Dynamic = __documentClosure.elementRef.current
            ? __documentClosure.elementRef.current.handed(__documentClosure.fileValueRef.current)
            : __documentClosure.fileValueRef.current;
          let documentRuntimeObject: Dynamic = await (0, __documentClosure.loadDocumentRuntimeObject)(
            __documentClosure.useDocumentInteractionOverlaysResult8,
            __documentClosure.fileId,
            handed,
          );
          if (__documentClosure.enabled) return;
          __documentClosure.elementRef.current?.mounted(
            handed !== undefined &&
              handed === __documentClosure.fileValueRef.current &&
              handed.content?.kind === `node` &&
              handed.content.id
              ? `handed`
              : `door`,
          );
          let {
            nodeId: node,
            localId: body,
            stored: documentRuntimeObject2,
          }: Dynamic = documentRuntimeObject;
          __documentClosure.docRef.current = (0, __documentClosure.resolvePlatformSessionAndSourcesValue5)(__documentClosure.fileId, node);
          __documentClosure.useDocumentInteractionOverlaysResult3 = (0, __documentClosure.resolveCommentsStoreValue31)(
            (..._extraArguments: unknown[]): Dynamic => ({
              pid: __documentClosure.pid,
              fileId: __documentClosure.fileId,
              node: node,
            }),
          );
          let root =
            body === `ln-doc`
              ? `${__documentClosure.DocumentInteractions_LnDoc}-root`
              : __documentClosure.DocumentInteractions_LnDoc;
          let file: Dynamic = {
            version: 1,
            sha: `000000`,
            root: root,
            nodes: {
              [root]: {
                type: `document`,
                body: body,
              },
              [body]: {
                type: `prose`,
                json: documentRuntimeObject2.doc,
              },
            },
          };
          (0, __documentClosure.setState)({
            file: file,
            rev: `door:${node}`,
            gen: 1,
          });
          (0, __documentClosure.useDocumentInteractionOverlaysHandler3)();
          (0, __documentClosure.withWebSpan)(
            `lfile.first_paint`,
            {
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.container]: __documentClosure.pid,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.fsEntryId]: __documentClosure.fileId,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.clientRev]: (0, __documentClosure.serverRev)() ?? ``,
              [__documentClosure.TELEMETRY_ATTRIBUTE_NAMES.lfileBootMs]: Date.now() - __documentClosure.now,
            },
            (..._extraArguments: unknown[]): undefined => {},
            `lfile.first_paint`,
          );
          let lookup: Dynamic = new (Map as Dynamic)();
          let uniqueItems: Dynamic = new (Set as Dynamic)();
          let uniqueItems2: Dynamic = new (Set as Dynamic)();
          let lookup2: Dynamic = new (Map as Dynamic)();
          let uniqueItems3: Dynamic = __documentClosure.uniqueItemsRef.current;
          let lookup3: Dynamic = __documentClosure.lookupRef2.current;
          let uniqueItems4: Dynamic = new (Set as Dynamic)();
          let uniqueItems5: Dynamic = new (Set as Dynamic)();
          let uniqueItems6: Dynamic = new (Set as Dynamic)();
          let useDocumentInteractionOverlaysResult9: Dynamic =
            (0, __documentClosure.loadPlatformLiveDocumentAndHistoryRun)(24);
          let useDocumentInteractionOverlaysHandler4: Dynamic = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            useDocumentInteractionOverlaysResult9.run(
              (..._extraArguments: unknown[]): Dynamic => {
                if (__documentClosure.enabled) throw Error(`unmounted`);
                return documentInteractionOverlays();
              },
            );
          let useDocumentInteractionOverlaysResult10: Dynamic =
            (0, __documentClosure.updatePlatformLiveDocumentAndHistoryShed)({
              now: (..._extraArguments: unknown[]) => Date.now(),
              random: (..._extraArguments: unknown[]) => Math.random(),
              setTimeout: (
                documentInteractionOverlays?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => setTimeout(documentInteractionOverlays, options2),
              clearTimeout: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ) => clearTimeout(documentInteractionOverlays),
            });
          __documentClosure.useDocumentInteractionOverlaysHandler = (
            ..._extraArguments: unknown[]
          ): Dynamic => useDocumentInteractionOverlaysResult10.dispose();
          let file2: Dynamic = file;
          let setState2 = (..._extraArguments: unknown[]): undefined => {
            if (__documentClosure.enabled) return;
            let file3: Dynamic = (0, __documentClosure.resolveWidgetBridgeJson2)(
              (0, __documentClosure.resolveWidgetBridgeCode3)(file, file2, lookup),
              file2,
              lookup2,
            );
            let nodes: Dynamic = file2.nodes;
            let nodesKeys = Object.keys(file3.nodes);
            if (
              !(
                Object.keys(nodes).length === nodesKeys.length &&
                nodesKeys.every(
                  (nodesKey?: Dynamic, ..._extraArguments: unknown[]) =>
                    nodes[nodesKey] === file3.nodes[nodesKey],
                )
              )
            ) {
              file2 = file3;
              (0, __documentClosure.setState)(
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  documentInteractionOverlays && {
                    ...documentInteractionOverlays,
                    file: file3,
                    gen: documentInteractionOverlays.gen + 1,
                  },
              );
            }
          };
          let useDocumentInteractionOverlaysHandler5 = (
            ..._extraArguments: unknown[]
          ): undefined => {
            if (__documentClosure.useDocumentInteractionOverlaysResult4 === undefined) {
              __documentClosure.useDocumentInteractionOverlaysResult4 = setTimeout(
                (..._extraArguments: unknown[]): undefined => {
                  __documentClosure.useDocumentInteractionOverlaysResult4 = undefined;
                  setState2();
                },
                50,
              );
            }
          };
          let shed = createDocumentInteractionShed6({
  get uniqueItems2() { return uniqueItems2; },
  get uniqueItems6() { return uniqueItems6; },
  get resolveWidgetBridgeCode2() { return __documentClosure.resolveWidgetBridgeCode2; },
  get useDocumentInteractionOverlaysHandler4() { return useDocumentInteractionOverlaysHandler4; },
  get useDocumentInteractionOverlaysResult8() { return __documentClosure.useDocumentInteractionOverlaysResult8; },
  get updateWidgetBridgeDelete() { return __documentClosure.updateWidgetBridgeDelete; },
  get lookup() { return lookup; },
  get uniqueItems() { return uniqueItems; }, set uniqueItems(__nextDocumentClosureValue: Dynamic) { uniqueItems = __nextDocumentClosureValue; },
  get resolvePlatformLiveDocumentAndHistoryReason() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryReason; },
  get WidgetBridgeCode() { return __documentClosure.WidgetBridgeCode; },
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult10() { return useDocumentInteractionOverlaysResult10; },
  get shed() { return shed; },
  get resolveWidgetBridgeCode() { return __documentClosure.resolveWidgetBridgeCode; },
  get useDocumentInteractionOverlaysHandler5() { return useDocumentInteractionOverlaysHandler5; },
});
          __documentClosure.rereadWidget.current = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!(__documentClosure.enabled || !uniqueItems.has(documentInteractionOverlays))) {
              useDocumentInteractionOverlaysResult10.settle(
                `w:${documentInteractionOverlays}`,
              );
              shed(documentInteractionOverlays);
            }
          };
          let shed2 = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (__documentClosure.enabled) return;
            uniqueItems = documentInteractionOverlays;
            let enabled4 = false;
            for (let useDocumentInteractionOverlaysResult24 of lookup.keys() as Dynamic)
              if (!uniqueItems.has(useDocumentInteractionOverlaysResult24)) {
                lookup.delete(useDocumentInteractionOverlaysResult24);
                enabled4 = true;
              }
            if (enabled4) {
              useDocumentInteractionOverlaysHandler5();
            }
            for (let useDocumentInteractionOverlaysResult24 of uniqueItems as Dynamic) {
              let lookupEntry: Dynamic = lookup.get(
                useDocumentInteractionOverlaysResult24,
              );
              if (
                lookupEntry === undefined ||
                lookupEntry.gone === true ||
                lookupEntry.stalled === true
              ) {
                shed(useDocumentInteractionOverlaysResult24);
              }
            }
          };
          let settle = createDocumentInteractionSettle7({
  get uniqueItems4() { return uniqueItems4; },
  get uniqueItems5() { return uniqueItems5; },
  get resolveWidgetBridgeJson() { return __documentClosure.resolveWidgetBridgeJson; },
  get useDocumentInteractionOverlaysHandler4() { return useDocumentInteractionOverlaysHandler4; },
  get useDocumentInteractionOverlaysResult8() { return __documentClosure.useDocumentInteractionOverlaysResult8; },
  get uniqueItems3() { return uniqueItems3; },
  get lookup2() { return lookup2; },
  get resolvePlatformLiveDocumentAndHistoryReason() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryReason; },
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult10() { return useDocumentInteractionOverlaysResult10; },
  get settle() { return settle; },
  get useDocumentInteractionOverlaysHandler5() { return useDocumentInteractionOverlaysHandler5; },
});
          __documentClosure.graftEmbedProse.current = createDocumentInteractionUpdategraftEmbedProse_current8({
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get resolveWidgetBridgeValue3() { return __documentClosure.resolveWidgetBridgeValue3; },
  get lookup3() { return lookup3; },
  get uniqueItems3() { return uniqueItems3; },
  get lookup2() { return lookup2; },
  get useDocumentInteractionOverlaysHandler5() { return useDocumentInteractionOverlaysHandler5; },
  get settle() { return settle; },
});
          shed2((0, __documentClosure.resolveDocumentRuntimeType)(documentRuntimeObject2.doc));
          for (let useDocumentInteractionOverlaysResult24 of uniqueItems3 as Dynamic)
            settle(useDocumentInteractionOverlaysResult24);
          let uniqueItems7: Dynamic = new (Set as Dynamic)();
          let useDocumentInteractionOverlaysHandler6: Dynamic = (
            uid?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            who: {
              kind: `human`,
              uid: uid,
              connId: uid,
              email: uid,
            },
            path: ``,
            ts: 0,
            color: ``,
          });
          let handed2 = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            for (let useDocumentInteractionOverlaysResult24 of uniqueItems7 as Dynamic)
              useDocumentInteractionOverlaysResult24(
                documentInteractionOverlays,
              );
          };
          let feedUp: Dynamic = null;
          let uniqueItems8: Dynamic = new (Set as Dynamic)();
          let handed3 = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            feedUp = documentInteractionOverlays;
            for (let useDocumentInteractionOverlaysResult24 of uniqueItems8 as Dynamic)
              useDocumentInteractionOverlaysResult24(
                documentInteractionOverlays,
              );
          };
          let session: Dynamic = (0, __documentClosure.isDataOperationControlLabel)(
            sessionStorage,
            __documentClosure.pid,
          );
          let email: Dynamic =
            __documentClosure.PlatformApiAndAuthUser.getState().user?.email ?? ``;
          let amount = -1 / 0;
          let retryNow = (..._extraArguments: unknown[]): undefined => {
            if (email !== `` || __documentClosure.PlatformApiAndAuthUser.getState().user) return;
            let now2 = Date.now();
            if (!(now2 - amount < __documentClosure.documentInteractionsLimit10000)) {
              amount = now2;
              __documentClosure.PlatformApiAndAuthUser.getState().retryNow();
            }
          };
          let useDocumentInteractionOverlaysResult11 =
            (0, __documentClosure.isPlatformFrameAndCapabilitiesNavigation)();
          let useDocumentInteractionOverlaysResult12 =
            (0, __documentClosure.isPlatformFrameAndCapabilitiesWindow)();
          let viewerId2: Dynamic = null;
          let useDocumentInteractionOverlaysResult13: Dynamic =
            (0, __documentClosure.isFrameArtifact)() ? (0, __documentClosure.frameViewer)() : null;
          useDocumentInteractionOverlaysResult13?.then(
            (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (viewerId2 = documentInteractionOverlays.id),
          );
          useDocumentInteractionOverlaysResult13?.catch(
            (..._extraArguments: unknown[]): undefined => {
              try {
                (0, __documentClosure.DocumentHostStateUnscoped)(__documentClosure.pid);
              } catch {}
            },
          );
          let useDocumentInteractionOverlaysResult14: Dynamic =
            (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsIndexedDB)();
          if (useDocumentInteractionOverlaysResult14 === null) {
            (0, __documentClosure.resolveDocumentInteractionsWarn)();
          }
          let useDocumentInteractionOverlaysResult15: Dynamic =
            (0, __documentClosure.resolveDataOperationControlLocks)(
              (globalThis as Dynamic).navigator?.locks,
              (..._extraArguments: unknown[]) => Math.random(),
              {
                setTimeout: (
                  documentInteractionOverlays?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => setTimeout(documentInteractionOverlays, options2),
                clearTimeout: (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => clearTimeout(documentInteractionOverlays),
              },
            );
          let DocumentHostStateFaulted2 = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            try {
              (0, __documentClosure.DocumentHostStateFaulted)(__documentClosure.pid, documentInteractionOverlays);
            } catch {}
          };
          let wal: Dynamic = useDocumentInteractionOverlaysResult13
            ? (0, __documentClosure.loadDataOperationControlReady)(
                Promise.race([
                  useDocumentInteractionOverlaysResult13.then(
                    (
                      result?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => result.id ?? ``,
                  ),
                  new (Promise as Dynamic)(
                    (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
                      setTimeout(
                        (..._extraArguments: unknown[]): Dynamic => resolve(``),
                        __documentClosure.documentInteractionsLimit3000,
                      ),
                  ),
                ]).then((result?: Dynamic, ..._extraArguments: unknown[]) => {
                  if (result === ``) {
                    (0, __documentClosure.resolveDocumentInteractionsWarn2)();
                  }
                  try {
                    if (result === ``) {
                      (0, __documentClosure.DocumentHostStateUnscoped)(__documentClosure.pid);
                    }
                  } catch {}
                  return result === `` ? `` : `frame:${result}|${__documentClosure.pid}`;
                }),
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (0, __documentClosure.loadDataOperationControlBid)(
                    useDocumentInteractionOverlaysResult14,
                    documentInteractionOverlays,
                    sessionStorage,
                    useDocumentInteractionOverlaysResult11 ||
                      useDocumentInteractionOverlaysResult12 ||
                      (0, __documentClosure.isPlatformFrameAndCapabilitiesWindow)(),
                    DocumentHostStateFaulted2,
                    useDocumentInteractionOverlaysResult15,
                    __documentClosure.frameEdgeNow,
                  ),
                (0, __documentClosure.resolveDataOperationControlEndsWith)(
                  sessionStorage,
                  __documentClosure.pid,
                  useDocumentInteractionOverlaysResult11 ||
                    useDocumentInteractionOverlaysResult12,
                ),
              )
            : (0, __documentClosure.resolveDataOperationControlValue33)(
                email,
                __documentClosure.pid,
                useDocumentInteractionOverlaysResult14,
                sessionStorage,
                useDocumentInteractionOverlaysResult11 ||
                  useDocumentInteractionOverlaysResult12,
                DocumentHostStateFaulted2,
                useDocumentInteractionOverlaysResult15,
              );
          __documentClosure.elementRef4.current = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            (0, __documentClosure.resolveDocumentInteractionsFound)(
              wal,
              node,
              documentInteractionOverlays,
            );
          let useDocumentInteractionOverlaysResult16: Dynamic =
            (0, __documentClosure.resolvePlatformLiveDocumentAndHistoryPid)(
              {
                pid: __documentClosure.pid,
                node: node,
                email: email,
              },
              useDocumentInteractionOverlaysResult13,
              (..._extraArguments: unknown[]): Dynamic => viewerId2,
              __documentClosure.documentInteractionsLimit3000,
              (
                documentInteractionOverlays?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => setTimeout(documentInteractionOverlays, options2),
            );
          if (!__documentClosure.enabled) {
            __documentClosure.elementRef15.current = useDocumentInteractionOverlaysResult16;
          }
          let sentOp: Dynamic = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let sess: Dynamic = documentInteractionOverlays?.actor?.sess;
            let opId: Dynamic = documentInteractionOverlays?.opId;
            let label2: Dynamic =
              useDocumentInteractionOverlaysResult21.known()?.label ?? null;
            return typeof sess == `string` && sess !== ``
              ? label2 !== null && sess === label2
              : typeof opId == `string` &&
                  opId !== `` &&
                  request?.sentOp(opId) === true;
          };
          let known: Dynamic = (
            documentInteractionOverlays?: Dynamic,
            actor?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (actor.kind !== `human`) return false;
            let actor2: Dynamic = documentInteractionOverlays?.actor;
            let opId: Dynamic = documentInteractionOverlays?.opId;
            return (0, __documentClosure.resolvePlatformAnnouncementsSess)(
              {
                sess: typeof actor2?.sess == `string` ? actor2.sess : null,
                opId: typeof opId == `string` ? opId : null,
                principal: actor.principal,
              },
              {
                sess:
                  useDocumentInteractionOverlaysResult21.known()?.label ?? null,
                viewerId: viewerId2,
                email: email,
                sentOp: (
                  documentInteractionOverlays2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => request?.sentOp(documentInteractionOverlays2) === true,
                sameEmail: __documentClosure.isPlatformSessionAndSourcesToLowerCase,
              },
            );
          };
          if (!useDocumentInteractionOverlaysResult13 && email === ``) {
            (0, __documentClosure.resolveDocumentInteractionsWarn2)();
          }
          try {
            if (!useDocumentInteractionOverlaysResult13 && email === ``) {
              (0, __documentClosure.DocumentHostStateUnscoped)(__documentClosure.pid);
            }
          } catch {}
          let record: Dynamic = {};
          let caps: Dynamic = {};
          let useDocumentInteractionOverlaysResult17: Dynamic;
          let useDocumentInteractionOverlaysResult18: Dynamic = null;
          let updateListLevelsMax = createDocumentInteractionUpdateListLevelsMax9({
  get record() { return record; },
  get caps() { return caps; },
  get resolvePlatformSyncAndRoutingVerb2() { return __documentClosure.resolvePlatformSyncAndRoutingVerb2; },
  get useDocumentInteractionOverlaysResult18() { return useDocumentInteractionOverlaysResult18; }, set useDocumentInteractionOverlaysResult18(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult18 = __nextDocumentClosureValue; },
});
          (0, __documentClosure.resolveDataModelSchemasValue27)().then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!__documentClosure.enabled) {
                updateListLevelsMax(result);
                useDocumentInteractionOverlaysResult17?.();
                __documentClosure.useDocumentInteractionOverlaysResult7?.capsChanged();
              }
            },
          );
          let useDocumentInteractionOverlaysResult19: Dynamic = (0, __documentClosure.liveDoor)(__documentClosure.pid, {
            sess: (..._extraArguments: unknown[]): Dynamic =>
              session.get()?.secret,
            container: __documentClosure.container,
          });
          let record2 = {
            pre: null,
          };
          let documentHostStateValue2: Dynamic =
            (0, __documentClosure.resolveDocumentHostStateValue2)();
          let useDocumentInteractionOverlaysHandler7: Dynamic = (
            ..._extraArguments: unknown[]
          ): Dynamic => (0, __documentClosure.frameLane)(`project/${__documentClosure.pid}`).head;
          (0, __documentClosure.resolveObservabilityTelemetryRing)(
            (
              documentInteractionOverlays?: Dynamic,
              options2?: Dynamic,
              context2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              (0, __documentClosure.resolveCommentsStoreLayer)(
                documentInteractionOverlays,
                options2,
                context2,
              ),
          );
          (0, __documentClosure.resolveObservabilityTelemetryEntries)({
            page: (..._extraArguments: unknown[]): Dynamic => __documentClosure.pid,
            sess: (..._extraArguments: unknown[]): Dynamic =>
              session.get()?.label ?? ``,
          });
          (0, __documentClosure.resolvePlatformSyncAndRoutingValue8)(__documentClosure.pid);
          let useDocumentInteractionOverlaysResult20: Dynamic = null;
          let births: Dynamic = (0, __documentClosure.updatePlatformLiveDocumentAndHistoryNote)();
          __documentClosure.elementRef6.current = births;
          let shadow: Dynamic = (0, __documentClosure.resolveEditorExtensionsThrew)(
            createDocumentInteractionShadow10({
  get DocumentInteractionsThen() { return __documentClosure.DocumentInteractionsThen; },
  get useDocumentInteractionOverlaysResult20() { return useDocumentInteractionOverlaysResult20; }, set useDocumentInteractionOverlaysResult20(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult20 = __nextDocumentClosureValue; },
  get isFrameArtifact() { return __documentClosure.isFrameArtifact; },
  get pid() { return __documentClosure.pid; },
  get ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c() { return __documentClosure.ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c; },
  get liveSupportCode() { return __documentClosure.liveSupportCode; },
  get session() { return session; },
  get births() { return births; },
  get isDocumentInteractionsValue() { return __documentClosure.isDocumentInteractionsValue; },
  get resolveObservabilityBrowserAndOperationEventsValue2() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue2; },
  get resolveEditorExtensionsTest2() { return __documentClosure.resolveEditorExtensionsTest2; },
  get serverRev() { return __documentClosure.serverRev; },
  get record() { return record; },
  get frameLane() { return __documentClosure.frameLane; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
}),
            __documentClosure.clearPlatformLoadingAndStatusDelete,
          );
          let timers: Dynamic = {
            setTimeout: (
              documentInteractionOverlays?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => setTimeout(documentInteractionOverlays, options2),
            clearTimeout: (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ) => clearTimeout(documentInteractionOverlays),
          };
          let visibility: Dynamic = (0, __documentClosure.clearPlatformSyncAndRoutingDispose)(
            typeof document === "undefined" ? undefined : document,
            timers,
          );
          let label: string = `none`;
          let heard: Dynamic = __documentClosure.ObservabilityBrowserAndOperationEventsWork;
          let useDocumentInteractionOverlaysHandler8: Dynamic = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            try {
              return (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsWire)(
                (..._extraArguments: unknown[]) =>
                  (0, __documentClosure.isObservabilityBrowserAndOperationEventsPort)(
                    {
                      port: __documentClosure.elementRef11.current !== null,
                      heard: heard,
                      ...documentHostHealthMonitor.verdictsDown(),
                    },
                    Date.now(),
                  ),
                (..._extraArguments: unknown[]) =>
                  (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsVisible)(
                    typeof document === "undefined" ? undefined : document,
                    __documentClosure.contextRef.current?.current,
                  ),
                documentInteractionOverlays,
                (..._extraArguments: unknown[]): Dynamic =>
                  documentHostHealthMonitor.tailThird(),
              );
            } catch {
              return documentInteractionOverlays;
            }
          };
          let documentHostHealthMonitor: Dynamic =
            (0, __documentClosure.createDocumentHostHealthMonitor)(
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusValue4)(
                (
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => {
                  let documentInteractionOverlays2: Dynamic =
                    documentInteractionOverlays;
                  try {
                    documentInteractionOverlays2 =
                      (0, __documentClosure.resolveObservabilityBrowserAndOperationEventsFields)(
                        label,
                        documentInteractionOverlays,
                      );
                  } catch {}
                  documentInteractionOverlays2 =
                    useDocumentInteractionOverlaysHandler8(
                      documentInteractionOverlays2,
                    );
                  return (0, __documentClosure.resolveObservabilityTelemetryValue19)(
                    documentInteractionOverlays2,
                  );
                },
                (
                  documentInteractionOverlays?: Dynamic,
                  options2: Dynamic = __documentClosure.enabledRef.current,
                  context2: Dynamic = typeof document !== "undefined" &&
                    document.documentElement.dataset.lfileSave === `busy`,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (0, __documentClosure.setEnabledState)(
                    (
                      documentInteractionOverlays2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(
                        documentInteractionOverlays,
                        documentInteractionOverlays2,
                        options2,
                        context2,
                      ),
                  ),
              ),
              (..._extraArguments: unknown[]) =>
                (0, __documentClosure.resolveDocumentHostStateNotice)({
                  bar: __documentClosure.elementRef7.current,
                  notice: __documentClosure.elementRef8.current,
                  word:
                    typeof document === "undefined"
                      ? undefined
                      : document.documentElement.dataset.lfileSave,
                }),
            );
          __documentClosure.elementRef17.current = {
            w: documentHostHealthMonitor,
            lid: body,
          };
          let pileOwed = (..._extraArguments: unknown[]): undefined => {
            if (__documentClosure.elementRef17.current?.w === documentHostHealthMonitor) {
              (0, __documentClosure.setSaveAlarmOwed)(documentHostHealthMonitor.gapOwed());
            }
            if (__documentClosure.elementRef17.current?.w === documentHostHealthMonitor) {
              (0, __documentClosure.setEnabledState4)(documentHostHealthMonitor.answerHeld());
            }
            if (__documentClosure.elementRef17.current?.w === documentHostHealthMonitor) {
              (0, __documentClosure.setPile)(documentHostHealthMonitor.pileOwed());
            }
          };
          let useDocumentInteractionOverlaysHandler9: Dynamic =
            (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
            async (
              documentInteractionOverlays2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Promise<Dynamic> => {
              let matchesCondition: boolean =
                typeof documentInteractionOverlays2 == `object` &&
                !!documentInteractionOverlays2 &&
                documentInteractionOverlays2.verb === `update`;
              if (matchesCondition) {
                documentHostHealthMonitor.sent(Date.now());
              }
              let documentInteractionOverlays3: Dynamic =
                await documentInteractionOverlays(documentInteractionOverlays2);
              if (
                matchesCondition &&
                typeof documentInteractionOverlays3 == `object` &&
                documentInteractionOverlays3 &&
                documentInteractionOverlays3.verdict === `allow`
              ) {
                documentHostHealthMonitor.acked(Date.now());
                pileOwed();
              }
              if (
                matchesCondition &&
                typeof documentInteractionOverlays3 == `object` &&
                documentInteractionOverlays3 &&
                documentInteractionOverlays3.verdict === `allow` &&
                __documentClosure.elementRef17.current?.w === documentHostHealthMonitor
              ) {
                (0, __documentClosure.setEnabledState)(
                  (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`acked`),
                );
              }
              return documentInteractionOverlays3;
            };
          let lane = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            documentHostHealthMonitor.lane(
              documentInteractionOverlays,
              Date.now(),
            );
            if (!documentInteractionOverlays) {
              (0, __documentClosure.setEnabledState)(
                (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`lane_down`),
              );
            }
          };
          uniqueItems8.add(lane);
          if (feedUp !== null) {
            lane(feedUp);
          }
          let setInterval2 = setInterval(
            (..._extraArguments: unknown[]): undefined =>
              void (documentHostHealthMonitor.tick(Date.now()), pileOwed()),
            5e3,
          );
          let snapshot = (..._extraArguments: unknown[]): undefined => {
            if (
              typeof document !== "undefined" &&
              document.visibilityState === `hidden`
            ) {
              documentHostHealthMonitor.snapshot(`hidden`, Date.now());
            }
            pileOwed();
          };
          let close = (..._extraArguments: unknown[]): undefined =>
            void (documentHostHealthMonitor.snapshot(`hidden`, Date.now()),
            documentHostHealthMonitor.close(Date.now()));
          if (typeof document !== "undefined") {
            document.addEventListener(`visibilitychange`, snapshot);
          }
          if (typeof window !== "undefined") {
            window.addEventListener(`pagehide`, close);
          }
          let useDocumentInteractionOverlaysResult21: Dynamic =
            (0, __documentClosure.loadDataOperationControlVerdict)({
              container: __documentClosure.container,
              session: session,
              ...(shadow
                ? {
                    shadow: shadow,
                  }
                : {}),
              refusalClass: (..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.resolveEditorExtensionsRefusalClass)()
                  ? useDocumentInteractionOverlaysResult20
                  : null,
              caps: caps,
              capsSettled: (..._extraArguments: unknown[]): Dynamic =>
                useDocumentInteractionOverlaysResult18,
              honourOpsOnFeed: (..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.resolvePlatformFeatureFlagsEnabled2)(`opsOnFeed`),
              wal: wal,
              timers: timers,
              random: (..._extraArguments: unknown[]) => Math.random(),
              lifeLocks: (0, __documentClosure.resolveDataOperationControlHold)(
                (globalThis as Dynamic).navigator?.locks,
              ),
              author: (..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.frameFenceAuthor)(`project/${__documentClosure.pid}`),
              claimed: createDocumentInteractionClaimed11({
  get DocumentHostStateClaimed() { return __documentClosure.DocumentHostStateClaimed; },
  get pid() { return __documentClosure.pid; },
  get resolveObservabilityBrowserAndOperationEventsRenamed() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsRenamed; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
  get createPagesCustodyClaimedEvent() { return __documentClosure.createPagesCustodyClaimedEvent; },
  get frameHotFrom() { return __documentClosure.frameHotFrom; },
  get useDocumentInteractionOverlaysResult12() { return useDocumentInteractionOverlaysResult12; },
  get isPlatformFrameAndCapabilitiesWindow() { return __documentClosure.isPlatformFrameAndCapabilitiesWindow; },
}),
              looked: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                try {
                  (0, __documentClosure.DocumentHostStateLooked)(__documentClosure.pid, documentInteractionOverlays);
                } catch {}
              },
              swappedIn: (..._extraArguments: unknown[]) =>
                useDocumentInteractionOverlaysResult12 ||
                (0, __documentClosure.isPlatformFrameAndCapabilitiesWindow)(),
              visibility: visibility,
              door: useDocumentInteractionOverlaysHandler9(
                (0, __documentClosure.loadCommentsStoreVerb2)(
                  (0, __documentClosure.transportDoorOf)(
                    (0, __documentClosure.doorWithPrefetchedDocumentView)(
                      useDocumentInteractionOverlaysResult19,
                      node,
                      record2,
                    ),
                  ),
                ),
              ),
              redial: (..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.nudgeLiveDoor)(),
              onOrphanNode: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined =>
                void __documentClosure.elementRef.current?.signal(documentInteractionOverlays),
              onZeroError: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let documentElement = document.documentElement;
                if (documentInteractionOverlays.klass === `no_reseat`) {
                  documentElement.dataset.lfileNoReseatLink = String(
                    Number(documentElement.dataset.lfileNoReseatLink ?? 0) + 1,
                  );
                  console.warn(
                    `lfile: no_reseat (link) why=${documentInteractionOverlays.reason}`,
                  );
                  (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `no_reseat`, {
                    reason: documentInteractionOverlays.reason,
                  });
                  return;
                }
                documentElement.dataset.lfileZeroErrorTelemetry = String(
                  Number(documentElement.dataset.lfileZeroErrorTelemetry ?? 0) +
                    1,
                );
                console.error(
                  `lfile: zero_error_fallback ${documentInteractionOverlays.klass} reason=${documentInteractionOverlays.reason}${documentInteractionOverlays.room ? ` room=${documentInteractionOverlays.room}` : ``}${documentInteractionOverlays.law ? ` law=${documentInteractionOverlays.law}` : ``} ops=${documentInteractionOverlays.ops} verbs=${documentInteractionOverlays.verbs.join(`,`)}${documentInteractionOverlays.opIndex === undefined ? `` : ` at=${documentInteractionOverlays.opIndex}`} op=${documentInteractionOverlays.opId}`,
                );
                (0, __documentClosure.resolveCommentsStoreAround)({
                  layer: `link`,
                  name: `zero_error`,
                  reason: documentInteractionOverlays.reason,
                  klass: documentInteractionOverlays.klass,
                  ops: documentInteractionOverlays.ops,
                  quiet: true,
                });
                (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `zero_error`, {
                  reason: documentInteractionOverlays.reason,
                  klass: documentInteractionOverlays.klass,
                  ops: documentInteractionOverlays.ops,
                  law: documentInteractionOverlays.law ?? null,
                });
              },
              onServerFlags: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ) => (0, __documentClosure.resolvePlatformFeatureFlagsName)(documentInteractionOverlays),
              onRoad: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `road`, {
                  ...documentInteractionOverlays,
                }),
              now: (..._extraArguments: unknown[]) => Date.now(),
              onLawFacts: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                (0, __documentClosure.resolveDataModelSchemasDoorFactsListenerError)(
                  documentInteractionOverlays,
                );
                (0, __documentClosure.resolvePlatformSyncAndRoutingVerb2)(
                  documentInteractionOverlays,
                  `sess`,
                );
              },
              onFaces: (
                documentInteractionOverlays?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                (0, __documentClosure.updateCommentsActionsAndSelectionEmail)(
                  documentInteractionOverlays,
                ),
            });
          let onState: Dynamic =
            useDocumentInteractionOverlaysResult21.onState(__documentClosure.pageGoneWhy2);
          __documentClosure.useDocumentInteractionOverlaysResult7 =
            useDocumentInteractionOverlaysResult21;
          __documentClosure.elementRef16.current = (
            documentInteractionOverlays?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            useDocumentInteractionOverlaysResult21.accessChanged(
              documentInteractionOverlays,
            );
          let useDocumentInteractionOverlaysResult22: Dynamic = (0, __documentClosure.onLiveReopen)(
            (..._extraArguments: unknown[]) =>
              queueMicrotask(
                (..._extraArguments: unknown[]): Dynamic =>
                  useDocumentInteractionOverlaysResult21.reopened(),
              ),
          );
          let installDocumentHostStateVisibilityState2: Dynamic =
            (0, __documentClosure.installDocumentHostStateVisibilityState)(
              (..._extraArguments: unknown[]): Dynamic =>
                useDocumentInteractionOverlaysResult21.woke(),
            );
          let useDocumentInteractionOverlaysResult23: Dynamic = null;
          let onState2: Dynamic =
            useDocumentInteractionOverlaysResult21.onState(
              (..._extraArguments: unknown[]): undefined => {
                let waiting2: Dynamic =
                  useDocumentInteractionOverlaysResult21.waiting() &&
                  !useDocumentInteractionOverlaysResult21.pageGone();
                if (
                  waiting2 &&
                  useDocumentInteractionOverlaysResult23 === null
                ) {
                  useDocumentInteractionOverlaysResult23 = setInterval(
                    (..._extraArguments: unknown[]): undefined => {
                      (0, __documentClosure.resolveDataModelSchemasValue27)(true).then(
                        (
                          result?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined => {
                          if (!__documentClosure.enabled) {
                            updateListLevelsMax(result);
                            useDocumentInteractionOverlaysResult21.capsChanged();
                          }
                        },
                      );
                    },
                    2e4,
                  );
                } else {
                  if (
                    !waiting2 &&
                    useDocumentInteractionOverlaysResult23 !== null
                  ) {
                    clearInterval(useDocumentInteractionOverlaysResult23);
                    useDocumentInteractionOverlaysResult23 = null;
                  }
                }
              },
            );
          let request: Dynamic = null;
          let moved = false;
          let waiting: Dynamic = (..._extraArguments: unknown[]) =>
            useDocumentInteractionOverlaysResult21.waiting()
              ? __documentClosure.DataOperationControlMessage10
              : null;
          __documentClosure.elementRef12.current = createDocumentInteractionUpdateelementRef12_current12({
  get setItems() { return __documentClosure.setItems; },
  get mountGen() { return __documentClosure.mountGen; },
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get elementRef11() { return __documentClosure.elementRef11; },
  get waiting() { return waiting; },
  get setNotice() { return __documentClosure.setNotice; },
  get setUseDocumentInteractionOverlaysState() { return __documentClosure.setUseDocumentInteractionOverlaysState; },
  get setRescues() { return __documentClosure.setRescues; },
  get request() { return request; }, set request(__nextDocumentClosureValue: Dynamic) { request = __nextDocumentClosureValue; },
  get useDocumentInteractionOverlaysResult21() { return useDocumentInteractionOverlaysResult21; },
  get node() { return node; },
  get elementRef9() { return __documentClosure.elementRef9; },
  get body() { return body; },
  get isPlatformKeyboardAndSaveStatusDown() { return __documentClosure.isPlatformKeyboardAndSaveStatusDown; },
  get resolveDataOperationControlValue11() { return __documentClosure.resolveDataOperationControlValue11; },
  get resolvePlatformAnnouncementsToUpperCase() { return __documentClosure.resolvePlatformAnnouncementsToUpperCase; },
  get quoteRecoveryPreview() { return __documentClosure.quoteRecoveryPreview; },
  get resolveCommentsStoreAround() { return __documentClosure.resolveCommentsStoreAround; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
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
  get pileOwed() { return pileOwed; },
  get resolvePlatformKeyboardAndSaveStatusPending() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusPending; },
  get setEnabledState3() { return __documentClosure.setEnabledState3; },
  get frameViewerSaveWord() { return __documentClosure.frameViewerSaveWord; },
  get isPlatformKeyboardAndSaveStatusSaved() { return __documentClosure.isPlatformKeyboardAndSaveStatusSaved; },
  get isPlatformKeyboardAndSaveStatusClear() { return __documentClosure.isPlatformKeyboardAndSaveStatusClear; },
  get elementRef7() { return __documentClosure.elementRef7; },
  get fileId() { return __documentClosure.fileId; },
  get emitTelemetryEvent() { return __documentClosure.emitTelemetryEvent; },
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
  get frameLane() { return __documentClosure.frameLane; },
  get pid() { return __documentClosure.pid; },
  get resolveCommentsStoreValue33() { return __documentClosure.resolveCommentsStoreValue33; },
  get resolveCommentsStoreBid() { return __documentClosure.resolveCommentsStoreBid; },
  get resolveDocumentHostStateValue10() { return __documentClosure.resolveDocumentHostStateValue10; },
  get useDocumentInteractionOverlaysHandler6() { return useDocumentInteractionOverlaysHandler6; },
  get resolveDocumentHostStateValue8() { return __documentClosure.resolveDocumentHostStateValue8; },
  get resolveDocumentHostStateKnown() { return __documentClosure.resolveDocumentHostStateKnown; },
  get isFrameArtifact() { return __documentClosure.isFrameArtifact; },
  get frameFenceAuthor() { return __documentClosure.frameFenceAuthor; },
  get viewerId2() { return viewerId2; }, set viewerId2(__nextDocumentClosureValue: Dynamic) { viewerId2 = __nextDocumentClosureValue; },
  get email() { return email; },
  get resolvePlatformApiAndAuthAnon() { return __documentClosure.resolvePlatformApiAndAuthAnon; },
  get resolveDocumentHostStateSeen() { return __documentClosure.resolveDocumentHostStateSeen; },
  get createDocumentHostCoordinator() { return __documentClosure.createDocumentHostCoordinator; },
  get DocumentInteractionsState8() { return __documentClosure.DocumentInteractionsState8; },
  get installPlatformApiAndAuthPagehide() { return __documentClosure.installPlatformApiAndAuthPagehide; },
  get PlatformApiAndAuthParticipants() { return __documentClosure.PlatformApiAndAuthParticipants; },
  get resolveDocumentHostStateFeedUp() { return __documentClosure.resolveDocumentHostStateFeedUp; },
  get feedUp() { return feedUp; }, set feedUp(__nextDocumentClosureValue: Dynamic) { feedUp = __nextDocumentClosureValue; },
  get frameLaneLink() { return __documentClosure.frameLaneLink; },
  get resolvePlatformAnnouncementsValue() { return __documentClosure.resolvePlatformAnnouncementsValue; },
  get DocumentInteractionsHere() { return __documentClosure.DocumentInteractionsHere; },
  get resolvePlatformAnnouncementsValue2() { return __documentClosure.resolvePlatformAnnouncementsValue2; },
  get resolveDocumentInteractionsValue4() { return __documentClosure.resolveDocumentInteractionsValue4; },
  get resolveDocumentHostStateValue() { return __documentClosure.resolveDocumentHostStateValue; },
  get uniqueItems8() { return uniqueItems8; },
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
  get resolvePlatformFeatureFlagsEnabled2() { return __documentClosure.resolvePlatformFeatureFlagsEnabled2; },
  get resolvePlatformAnnouncementsFloor() { return __documentClosure.resolvePlatformAnnouncementsFloor; },
  get elementRef23() { return __documentClosure.elementRef23; },
  get resolvePlatformLiveDocumentAndHistoryCancel() { return __documentClosure.resolvePlatformLiveDocumentAndHistoryCancel; },
  get resolveDocumentHostStateKey() { return __documentClosure.resolveDocumentHostStateKey; },
  get resolveDocumentHostStateValue7() { return __documentClosure.resolveDocumentHostStateValue7; },
  get resolvePlatformAnnouncementsPrincipal() { return __documentClosure.resolvePlatformAnnouncementsPrincipal; },
  get clearDocumentHostStateDelete() { return __documentClosure.clearDocumentHostStateDelete; },
  get resolveCommentsStoreBlocks() { return __documentClosure.resolveCommentsStoreBlocks; },
  get DocumentInteractionsState4() { return __documentClosure.DocumentInteractionsState4; },
  get documentHostHealthMonitor() { return documentHostHealthMonitor; },
  get frameViewerEdit() { return __documentClosure.frameViewerEdit; },
  get frameViewerRev() { return __documentClosure.frameViewerRev; },
  get record() { return record; },
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
  get setBar2() { return __documentClosure.setBar2; },
  get DataOperationControlNodeGone2() { return __documentClosure.DataOperationControlNodeGone2; },
  get setNodeGone() { return __documentClosure.setNodeGone; },
  get useDocumentInteractionOverlaysHandler3() { return __documentClosure.useDocumentInteractionOverlaysHandler3; },
  get setError() { return __documentClosure.setError; },
  get setSaveWords() { return __documentClosure.setSaveWords; },
  get setEnabledState2() { return __documentClosure.setEnabledState2; },
  get resolveDocumentRuntimeState() { return __documentClosure.resolveDocumentRuntimeState; },
  get enabledRef() { return __documentClosure.enabledRef; },
  get setEnabledState() { return __documentClosure.setEnabledState; },
  get resolvePlatformKeyboardAndSaveStatusRise() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusRise; },
  get resolvePlatformKeyboardAndSaveStatusMoved() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusMoved; },
  get resolvePlatformKeyboardAndSaveStatusBusy() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBusy; },
  get resolvePlatformKeyboardAndSaveStatusNotice() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusNotice; },
  get pageGoneWhy2() { return __documentClosure.pageGoneWhy2; },
  get retryNow() { return retryNow; },
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
  get shed2() { return shed2; },
  get resolveDocumentRuntimeValue4() { return __documentClosure.resolveDocumentRuntimeValue4; },
  get isDocumentRuntimeToken() { return __documentClosure.isDocumentRuntimeToken; },
  get elementRef5() { return __documentClosure.elementRef5; },
  get setDetachAsk() { return __documentClosure.setDetachAsk; },
  get resolveEditorMediaValue2() { return __documentClosure.resolveEditorMediaValue2; },
  get nudgeLiveDoor() { return __documentClosure.nudgeLiveDoor; },
  get elementRef6() { return __documentClosure.elementRef6; },
  get isDocumentInteractionsValue() { return __documentClosure.isDocumentInteractionsValue; },
  get filterPlatformLiveDocumentAndHistoryRevive() { return __documentClosure.filterPlatformLiveDocumentAndHistoryRevive; },
  get resolveObservabilityBootPaint2() { return __documentClosure.resolveObservabilityBootPaint2; },
  get moved() { return moved; }, set moved(__nextDocumentClosureValue: Dynamic) { moved = __nextDocumentClosureValue; },
  get documentHostStateValue2() { return documentHostStateValue2; },
  get resolvePlatformKeyboardAndSaveStatusBid() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBid; },
  get resolveDocumentInteractionsTray() { return __documentClosure.resolveDocumentInteractionsTray; },
  get createPagesWriteGateRefusedCappedEvent() { return __documentClosure.createPagesWriteGateRefusedCappedEvent; },
  get heard() { return heard; }, set heard(__nextDocumentClosureValue: Dynamic) { heard = __nextDocumentClosureValue; },
  get resolveObservabilityBrowserAndOperationEventsWork() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsWork; },
  get resolveObservabilityBrowserAndOperationEventsComplete() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsComplete; },
  get label() { return label; }, set label(__nextDocumentClosureValue: Dynamic) { label = __nextDocumentClosureValue; },
  get resolveObservabilityBrowserAndOperationEventsValue8() { return __documentClosure.resolveObservabilityBrowserAndOperationEventsValue8; },
  get filterDocumentRuntimeStale() { return __documentClosure.filterDocumentRuntimeStale; },
  get frameViewerDirty() { return __documentClosure.frameViewerDirty; },
  get frameViewerSelection() { return __documentClosure.frameViewerSelection; },
  get updateObservabilityBrowserAndOperationEventsSelected() { return __documentClosure.updateObservabilityBrowserAndOperationEventsSelected; },
  get resolveDocumentHostStateNode() { return __documentClosure.resolveDocumentHostStateNode; },
  get contextRef() { return __documentClosure.contextRef; },
  get updateFrameGesturesAnchor() { return __documentClosure.updateFrameGesturesAnchor; },
  get documentScrollKey() { return __documentClosure.documentScrollKey; },
  get resolvePlatformKeyboardAndSaveStatusKeys() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKeys; },
  get DocumentInteractionsState7() { return __documentClosure.DocumentInteractionsState7; }, set DocumentInteractionsState7(__nextDocumentClosureValue: Dynamic) { __documentClosure.DocumentInteractionsState7 = __nextDocumentClosureValue; },
  get PlatformAnnouncementsLive() { return __documentClosure.PlatformAnnouncementsLive; },
  get useDocumentInteractionOverlaysResult17() { return useDocumentInteractionOverlaysResult17; }, set useDocumentInteractionOverlaysResult17(__nextDocumentClosureValue: Dynamic) { useDocumentInteractionOverlaysResult17 = __nextDocumentClosureValue; },
  get uniqueItems7() { return uniqueItems7; },
  get updatePlatformLiveDocumentAndHistoryNobody() { return __documentClosure.updatePlatformLiveDocumentAndHistoryNobody; },
  get PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision() { return __documentClosure.PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision; },
  get useDocumentInteractionOverlaysHandler7() { return useDocumentInteractionOverlaysHandler7; },
  get resolvePlatformKeyboardAndSaveStatusUnsaved2() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusUnsaved2; },
  get dependenciesRef() { return __documentClosure.dependenciesRef; },
  get frameViewerSaveLive() { return __documentClosure.frameViewerSaveLive; },
  get resolvePlatformKeyboardAndSaveStatusLink() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusLink; },
  get elementRef14() { return __documentClosure.elementRef14; },
  get setSaveLive() { return __documentClosure.setSaveLive; },
  get resolveDocumentHostStateReadonly() { return __documentClosure.resolveDocumentHostStateReadonly; },
  get DocumentInteractionsOpened() { return __documentClosure.DocumentInteractionsOpened; },
  get resolvePlatformKeyboardAndSaveStatusValue6() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusValue6; },
  get isPlatformFrameAndCapabilitiesWindow() { return __documentClosure.isPlatformFrameAndCapabilitiesWindow; },
  get resolvePlatformKeyboardAndSaveStatusKey() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusKey; },
  get resolvePlatformKeyboardAndSaveStatusBody() { return __documentClosure.resolvePlatformKeyboardAndSaveStatusBody; },
  get filterPlatformKeyboardAndSaveStatusNext() { return __documentClosure.filterPlatformKeyboardAndSaveStatusNext; },
  get isDocumentFocusedElsewhere() { return __documentClosure.isDocumentFocusedElsewhere; },
  get resolveDocumentRuntimeUnsent() { return __documentClosure.resolveDocumentRuntimeUnsent; },
  get elementRef3() { return __documentClosure.elementRef3; },
  get setEnabledState4() { return __documentClosure.setEnabledState4; },
  get ObservabilityBrowserAndOperationEventsWork() { return __documentClosure.ObservabilityBrowserAndOperationEventsWork; },
});
          __documentClosure.elementRef13.current = (..._extraArguments: unknown[]): undefined => {
            onState();
            useDocumentInteractionOverlaysResult22();
            installDocumentHostStateVisibilityState2();
            onState2();
            documentHostHealthMonitor.close(Date.now(), true);
            clearInterval(setInterval2);
            (0, __documentClosure.setEnabledState)(
              (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`torn_down`),
            );
            uniqueItems8.delete(lane);
            if (typeof document !== "undefined") {
              document.removeEventListener(`visibilitychange`, snapshot);
            }
            if (typeof window !== "undefined") {
              window.removeEventListener(`pagehide`, close);
            }
            pileOwed();
            if (__documentClosure.elementRef17.current?.w === documentHostHealthMonitor) {
              __documentClosure.elementRef17.current = null;
            }
            if (useDocumentInteractionOverlaysResult23 !== null) {
              clearInterval(useDocumentInteractionOverlaysResult23);
            }
            useDocumentInteractionOverlaysResult21.close();
            visibility.dispose();
            shadow?.close();
          };
          __documentClosure.elementRef12.current();
          __documentClosure.useDocumentInteractionOverlaysResult2 = (0, __documentClosure.subscribeProjectFeed)(
            __documentClosure.pid,
            createDocumentInteractionUpdateuseDocumentInteractionOverlaysResult221({
  get enabled() { return __documentClosure.enabled; }, set enabled(__nextDocumentClosureValue: Dynamic) { __documentClosure.enabled = __nextDocumentClosureValue; },
  get isDataModelSchemasUtterance() { return __documentClosure.isDataModelSchemasUtterance; },
  get node() { return node; },
  get request() { return request; }, set request(__nextDocumentClosureValue: Dynamic) { request = __nextDocumentClosureValue; },
  get filterDataOperationControlSeq() { return __documentClosure.filterDataOperationControlSeq; },
  get isDataModelSchemasKind3() { return __documentClosure.isDataModelSchemasKind3; },
  get known() { return known; },
  get resolveDocumentHostStateValue7() { return __documentClosure.resolveDocumentHostStateValue7; },
  get elementRef19() { return __documentClosure.elementRef19; },
  get resolveDataModelSchemasBlock2() { return __documentClosure.resolveDataModelSchemasBlock2; },
  get elementRef18() { return __documentClosure.elementRef18; },
  get elementRef21() { return __documentClosure.elementRef21; },
  get elementRef20() { return __documentClosure.elementRef20; },
  get elementRef23() { return __documentClosure.elementRef23; },
  get elementRef22() { return __documentClosure.elementRef22; },
  get resolveDocumentInteractionsValue() { return __documentClosure.resolveDocumentInteractionsValue; },
  get filterDocumentInteractionsTarget() { return __documentClosure.filterDocumentInteractionsTarget; },
  get resolveDataModelSchemasResults() { return __documentClosure.resolveDataModelSchemasResults; },
  get sentOp() { return sentOp; },
  get handed2() { return handed2; },
  get uniqueItems() { return uniqueItems; }, set uniqueItems(__nextDocumentClosureValue: Dynamic) { uniqueItems = __nextDocumentClosureValue; },
  get shed() { return shed; },
  get uniqueItems3() { return uniqueItems3; },
  get settle() { return settle; },
  get resolveCommentsStoreLayer() { return __documentClosure.resolveCommentsStoreLayer; },
  get useDocumentInteractionOverlaysResult5() { return __documentClosure.useDocumentInteractionOverlaysResult5; }, set useDocumentInteractionOverlaysResult5(__nextDocumentClosureValue: Dynamic) { __documentClosure.useDocumentInteractionOverlaysResult5 = __nextDocumentClosureValue; },
  get isFrameArtifact() { return __documentClosure.isFrameArtifact; },
  get useDocumentInteractionOverlaysResult21() { return useDocumentInteractionOverlaysResult21; },
  get handed3() { return handed3; },
  get retryNow() { return retryNow; },
  get documentInteractionsLimit1000() { return __documentClosure.documentInteractionsLimit1000; },
}),
          );
          if ((0, __documentClosure.isFrameArtifact)()) {
            let takeDocumentSwitchPicture2: Dynamic = (0, __documentClosure.takeDocumentSwitchPicture)(
              __documentClosure.pid,
              node,
            );
            if (takeDocumentSwitchPicture2 !== null) {
              record2.pre = takeDocumentSwitchPicture2.pre;
              documentHostStateValue2.issued(takeDocumentSwitchPicture2.head);
              moved =
                (0, __documentClosure.frameLane)(`project/${__documentClosure.pid}`).head !==
                takeDocumentSwitchPicture2.head;
              (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `fence-picture`, {
                taken: true,
                moved: moved,
              });
            } else {
              (0, __documentClosure.resolveCommentsStoreLayer)(`link`, `fence-picture`, {
                taken: false,
              });
              documentHostStateValue2.issued(
                useDocumentInteractionOverlaysHandler7(),
              );
              let prefetchDocumentViewWithComments2: Dynamic =
                (0, __documentClosure.prefetchDocumentViewWithComments)(
                  useDocumentInteractionOverlaysResult19,
                  node,
                  __documentClosure.container,
                );
              record2.pre = prefetchDocumentViewWithComments2;
              prefetchDocumentViewWithComments2.then(
                (..._extraArguments: unknown[]) =>
                  (0, __documentClosure.resolveObservabilityBootPaint2)(`bodyRead`),
                (..._extraArguments: unknown[]) =>
                  (0, __documentClosure.resolveObservabilityBootPaint2)(`bodyRead`),
              );
            }
          }
        } catch (useDocumentInteractionOverlaysResult9: Dynamic) {
          (0, __documentClosure.useDocumentInteractionOverlaysHandler3)();
          if (!__documentClosure.enabled) {
            __documentClosure.elementRef14.current();
            (0, __documentClosure.setError)(
              (0, __documentClosure.resolveDocumentRuntimeMessage)(
                useDocumentInteractionOverlaysResult9,
              ),
            );
            if (
              (0, __documentClosure.resolveDocumentRuntimeVerdict)(
                useDocumentInteractionOverlaysResult9,
              ) === `tab`
            ) {
              (0, __documentClosure.setTabGone)(true);
            }
          }
        }
      });
}

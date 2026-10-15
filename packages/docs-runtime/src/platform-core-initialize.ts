/** BaoCut: preserve the original bundle initialization order across module cycles. */
import {
  initializeObservabilityTelemetry1Step1,
} from "./platform-core-observability-telemetry-1";
import {
  initializeObservabilityTelemetry2Step1,
} from "./platform-core-observability-telemetry-2";
import {
  initializeObservabilityTelemetry3Step1,
} from "./platform-core-observability-telemetry-3";
import { initializePlatformFeatureFlagsStep1 } from "./platform-core-platform-feature-flags";
import { initializePlatformArtifactLinksStep1 } from "./platform-core-platform-artifact-links";
import {
  initializePlatformImagesAndBlobsStep1,
} from "./platform-core-platform-images-and-blobs";
import {
  initializeDataEnumsAndValidationStep1,
} from "./platform-core-data-enums-and-validation";
import { initializeDataLazyZodStep1 } from "./platform-core-data-lazy-zod";
import {
  initializeDataContentAndReferencesStep1,
} from "./platform-core-data-content-and-references";
import {
  initializePlatformSessionAndSources1Step1,
} from "./platform-core-platform-session-and-sources-1";
import {
  initializePlatformSessionAndSources2Step1,
} from "./platform-core-platform-session-and-sources-2";
import { initializeEditorExtensions1Step1 } from "./platform-core-editor-extensions-1";
import { initializeEditorExtensions2Step1 } from "./platform-core-editor-extensions-2";
import { initializeEditorExtensions3Step1 } from "./platform-core-editor-extensions-3";
import { initializeEditorExtensions4Step1 } from "./platform-core-editor-extensions-4";
import { initializeEditorExtensions5Step1 } from "./platform-core-editor-extensions-5";
import {
  initializeEditorAnchorsAndMentions1Step1,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  initializeEditorAnchorsAndMentions2Step1,
} from "./platform-core-editor-anchors-and-mentions-2";
import {
  initializePlatformFrameAndCapabilitiesStep1,
} from "./platform-core-platform-frame-and-capabilities";
import {
  initializePlatformLoadingAndStatusStep1,
} from "./platform-core-platform-loading-and-status";
import { initializeUiDesignSystemStep1 } from "./platform-core-ui-design-system";
import { initializeUiLinksAndFoundationStep1 } from "./platform-core-ui-links-and-foundation";
import { initializeUiVendorAdaptersStep1 } from "./platform-core-ui-vendor-adapters";
import { initializeUiProviderAndLayersStep1 } from "./platform-core-ui-provider-and-layers";
import { initializeUiOverlaysAndIconsStep1 } from "./platform-core-ui-overlays-and-icons";
import { initializeUiShortcutsAndSizingStep1 } from "./platform-core-ui-shortcuts-and-sizing";
import {
  initializeUiTooltipsAndControlsStep1,
} from "./platform-core-ui-tooltips-and-controls";
import { initializeUiDialogsStep1 } from "./platform-core-ui-dialogs";
import {
  initializePlatformKeyboardAndSaveStatusStep1,
} from "./platform-core-platform-keyboard-and-save-status";
import { initializeUiToastsStep1 } from "./platform-core-ui-toasts";
import { initializePlatformChunkLoadingStep1 } from "./platform-core-platform-chunk-loading";
import { initializeExportMcpConnectorsStep1 } from "./platform-core-export-mcp-connectors";
import { initializeEditorProofreadingStep1 } from "./platform-core-editor-proofreading";
import {
  initializeObservabilityBrowserAndOperationEvents1Step1,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  initializeObservabilityBrowserAndOperationEvents2Step1,
} from "./platform-core-observability-browser-and-operation-events-2";
import {
  initializeObservabilityBrowserAndOperationEvents3Step1,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  initializeObservabilityBrowserAndOperationEvents4Step1,
} from "./platform-core-observability-browser-and-operation-events-4";
import { initializePlatformApiAndAuth1Step1 } from "./platform-core-platform-api-and-auth-1";
import { initializePlatformApiAndAuth2Step1 } from "./platform-core-platform-api-and-auth-2";
import { initializePlatformApiAndAuth3Step1 } from "./platform-core-platform-api-and-auth-3";
import { initializePlatformApiAndAuth4Step1 } from "./platform-core-platform-api-and-auth-4";
import { initializePlatformApiAndAuth5Step1 } from "./platform-core-platform-api-and-auth-5";
import { initializePlatformApiAndAuth6Step1 } from "./platform-core-platform-api-and-auth-6";
import {
  initializeDataModelSchemas1Step1,
  initializeDataModelSchemas1Step2,
} from "./platform-core-data-model-schemas-1";
import { initializePlatformApiAndAuth7Step1 } from "./platform-core-platform-api-and-auth-7";
import {
  initializeDataModelSchemas2Step1,
  initializeDataModelSchemas2Step2,
} from "./platform-core-data-model-schemas-2";
import { initializeDataModelSchemas3Step1 } from "./platform-core-data-model-schemas-3";
import { initializeDataModelSchemas4Step1 } from "./platform-core-data-model-schemas-4";
import { initializeDataModelSchemas5Step1 } from "./platform-core-data-model-schemas-5";
import { initializePlatformAnnouncementsStep1 } from "./platform-core-platform-announcements";
import { initializeDataOperationEngine1Step1 } from "./platform-core-data-operation-engine-1";
import { initializeDataOperationEngine2Step1 } from "./platform-core-data-operation-engine-2";
import { initializeDataOperationEngine3Step1 } from "./platform-core-data-operation-engine-3";
import { initializeDataOperationEngine4Step1 } from "./platform-core-data-operation-engine-4";
import { initializeCommentsStore1Step1 } from "./platform-core-comments-store-1";
import { initializeCommentsStore2Step1 } from "./platform-core-comments-store-2";
import {
  initializeCommentsStore3Step1,
  initializeCommentsStore3Step2,
  initializeCommentsStore3Step3,
  initializeCommentsStore3Step4,
  initializeCommentsStore3Step5,
  initializeCommentsStore3Step6,
  initializeCommentsStore3Step7,
  initializeCommentsStore3Step8,
  initializeCommentsStore3Step9,
} from "./platform-core-comments-store-3";
import {
  initializeCommentsStore4Step1,
  initializeCommentsStore4Step2,
  initializeCommentsStore4Step3,
  initializeCommentsStore4Step4,
  initializeCommentsStore4Step5,
  initializeCommentsStore4Step6,
  initializeCommentsStore4Step7,
  initializeCommentsStore4Step8,
  initializeCommentsStore4Step9,
} from "./platform-core-comments-store-4";
import { initializeCommentsStore5Step1 } from "./platform-core-comments-store-5";
import { initializeObservabilityBootStep1 } from "./platform-core-observability-boot";
import {
  initializePlatformRuntimeAndChat1Step1,
} from "./platform-core-platform-runtime-and-chat-1";
import {
  initializePlatformRuntimeAndChat2Step1,
} from "./platform-core-platform-runtime-and-chat-2";
import {
  initializePlatformRuntimeAndChat3Step1,
} from "./platform-core-platform-runtime-and-chat-3";
import { initializeEditorHost1Step1 } from "./platform-core-editor-host-1";
import { initializeEditorHost2Step1 } from "./platform-core-editor-host-2";
import {
  initializePlatformSyncAndRouting1Step1,
} from "./platform-core-platform-sync-and-routing-1";
import {
  initializePlatformSyncAndRouting2Step1,
} from "./platform-core-platform-sync-and-routing-2";
import {
  initializeDataOperationControl1Step1,
} from "./platform-core-data-operation-control-1";
import {
  initializeDataOperationControl2Step1,
} from "./platform-core-data-operation-control-2";
import {
  initializeDataOperationControl3Step1,
} from "./platform-core-data-operation-control-3";
import {
  initializeDataOperationControl4Step1,
} from "./platform-core-data-operation-control-4";
import {
  initializeDataOperationControl5Step1,
} from "./platform-core-data-operation-control-5";
import {
  initializeCommentsActionsAndSelectionStep1,
} from "./platform-core-comments-actions-and-selection";
import { initializeCommentsEditorStep1 } from "./platform-core-comments-editor";
import {
  initializeEditorSelectionAndTables1Step1,
} from "./platform-core-editor-selection-and-tables-1";
import {
  initializeEditorSelectionAndTables2Step1,
} from "./platform-core-editor-selection-and-tables-2";
import {
  initializeEditorSelectionAndTables3Step1,
} from "./platform-core-editor-selection-and-tables-3";
import {
  initializeEditorChipsAndNodeViews1Step1,
} from "./platform-core-editor-chips-and-node-views-1";
import {
  initializeEditorChipsAndNodeViews2Step1,
} from "./platform-core-editor-chips-and-node-views-2";
import {
  initializeEditorChipsAndNodeViews3Step1,
} from "./platform-core-editor-chips-and-node-views-3";
import { initializeEditorTableControls1Step1 } from "./platform-core-editor-table-controls-1";
import { initializeEditorTableControls2Step1 } from "./platform-core-editor-table-controls-2";
import { initializeEditorTableControls3Step1 } from "./platform-core-editor-table-controls-3";
import { initializeEditorMedia1Step1 } from "./platform-core-editor-media-1";
import { initializeEditorMedia2Step1 } from "./platform-core-editor-media-2";
import {
  initializePlatformLiveDocumentAndHistory1Step1,
} from "./platform-core-platform-live-document-and-history-1";
import {
  initializePlatformLiveDocumentAndHistory2Step1,
} from "./platform-core-platform-live-document-and-history-2";
import {
  initializePlatformLiveDocumentAndHistory3Step1,
} from "./platform-core-platform-live-document-and-history-3";
import {
  initializePlatformLiveDocumentAndHistory4Step1,
} from "./platform-core-platform-live-document-and-history-4";

initializeObservabilityTelemetry1Step1();
initializeObservabilityTelemetry2Step1();
initializeObservabilityTelemetry3Step1();
initializePlatformFeatureFlagsStep1();
initializePlatformArtifactLinksStep1();
initializePlatformImagesAndBlobsStep1();
initializeDataEnumsAndValidationStep1();
initializeDataLazyZodStep1();
initializeDataContentAndReferencesStep1();
initializePlatformSessionAndSources1Step1();
initializePlatformSessionAndSources2Step1();
initializeEditorExtensions1Step1();
initializeEditorExtensions2Step1();
initializeEditorExtensions3Step1();
initializeEditorExtensions4Step1();
initializeEditorExtensions5Step1();
initializeEditorAnchorsAndMentions1Step1();
initializeEditorAnchorsAndMentions2Step1();
initializePlatformFrameAndCapabilitiesStep1();
initializePlatformLoadingAndStatusStep1();
initializeUiDesignSystemStep1();
initializeUiLinksAndFoundationStep1();
initializeUiVendorAdaptersStep1();
initializeUiProviderAndLayersStep1();
initializeUiOverlaysAndIconsStep1();
initializeUiShortcutsAndSizingStep1();
initializeUiTooltipsAndControlsStep1();
initializeUiDialogsStep1();
initializePlatformKeyboardAndSaveStatusStep1();
initializeUiToastsStep1();
initializePlatformChunkLoadingStep1();
initializeExportMcpConnectorsStep1();
initializeEditorProofreadingStep1();
initializeObservabilityBrowserAndOperationEvents1Step1();
initializeObservabilityBrowserAndOperationEvents2Step1();
initializeObservabilityBrowserAndOperationEvents3Step1();
initializeObservabilityBrowserAndOperationEvents4Step1();
initializePlatformApiAndAuth1Step1();
initializePlatformApiAndAuth2Step1();
initializePlatformApiAndAuth3Step1();
initializePlatformApiAndAuth4Step1();
initializePlatformApiAndAuth5Step1();
initializePlatformApiAndAuth6Step1();
initializeDataModelSchemas1Step1();
initializePlatformApiAndAuth7Step1();
initializeDataModelSchemas2Step1();
initializeDataModelSchemas1Step2();
initializeDataModelSchemas2Step2();
initializeDataModelSchemas3Step1();
initializeDataModelSchemas4Step1();
initializeDataModelSchemas5Step1();
initializePlatformAnnouncementsStep1();
initializeDataOperationEngine1Step1();
initializeDataOperationEngine2Step1();
initializeDataOperationEngine3Step1();
initializeDataOperationEngine4Step1();
initializeCommentsStore1Step1();
initializeCommentsStore2Step1();
initializeCommentsStore3Step1();
initializeCommentsStore4Step1();
initializeCommentsStore3Step2();
initializeCommentsStore4Step2();
initializeCommentsStore3Step3();
initializeCommentsStore4Step3();
initializeCommentsStore3Step4();
initializeCommentsStore4Step4();
initializeCommentsStore3Step5();
initializeCommentsStore4Step5();
initializeCommentsStore3Step6();
initializeCommentsStore4Step6();
initializeCommentsStore3Step7();
initializeCommentsStore4Step7();
initializeCommentsStore3Step8();
initializeCommentsStore4Step8();
initializeCommentsStore3Step9();
initializeCommentsStore4Step9();
initializeCommentsStore5Step1();
initializeObservabilityBootStep1();
initializePlatformRuntimeAndChat1Step1();
initializePlatformRuntimeAndChat2Step1();
initializePlatformRuntimeAndChat3Step1();
initializeEditorHost1Step1();
initializeEditorHost2Step1();
initializePlatformSyncAndRouting1Step1();
initializePlatformSyncAndRouting2Step1();
initializeDataOperationControl1Step1();
initializeDataOperationControl2Step1();
initializeDataOperationControl3Step1();
initializeDataOperationControl4Step1();
initializeDataOperationControl5Step1();
initializeCommentsActionsAndSelectionStep1();
initializeCommentsEditorStep1();
initializeEditorSelectionAndTables1Step1();
initializeEditorSelectionAndTables2Step1();
initializeEditorSelectionAndTables3Step1();
initializeEditorChipsAndNodeViews1Step1();
initializeEditorChipsAndNodeViews2Step1();
initializeEditorChipsAndNodeViews3Step1();
initializeEditorTableControls1Step1();
initializeEditorTableControls2Step1();
initializeEditorTableControls3Step1();
initializeEditorMedia1Step1();
initializeEditorMedia2Step1();
initializePlatformLiveDocumentAndHistory1Step1();
initializePlatformLiveDocumentAndHistory2Step1();
initializePlatformLiveDocumentAndHistory3Step1();
initializePlatformLiveDocumentAndHistory4Step1();

/** BaoCut: session navigation from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  createRoomViewEmbedPageAccessFailureTelemetry,
  createRoomViewEmbedPageChipNavigation,
  createRoomViewEmbedPageChooseInitialTab,
  createRoomViewEmbedPageDeletedTabNavigation,
  createRoomViewEmbedPageExport,
  createRoomViewEmbedPageFileChoices,
  createRoomViewEmbedPageFirstHeading,
  createRoomViewEmbedPageFollowNavigation,
  createRoomViewEmbedPageFollowParticipant,
  createRoomViewEmbedPageHoldTabList,
  createRoomViewEmbedPageInitialOutline,
  createRoomViewEmbedPageJumpHeading,
  createRoomViewEmbedPageLandingFocus,
  createRoomViewEmbedPageLoadFailureTelemetry,
  createRoomViewEmbedPageOpenFile,
  createRoomViewEmbedPageOpenTab,
  createRoomViewEmbedPageOutlineDelivery,
  createRoomViewEmbedPageOutlineFeed,
  createRoomViewEmbedPageOutlineReveal,
  createRoomViewEmbedPagePageLookup,
  createRoomViewEmbedPagePlacementWaiter,
  createRoomViewEmbedPagePresence,
  createRoomViewEmbedPagePreviewDelay,
  createRoomViewEmbedPagePreviewState,
  createRoomViewEmbedPagePrint,
  createRoomViewEmbedPageProjectFeed,
  createRoomViewEmbedPageProjectItems,
  createRoomViewEmbedPageQueryNavigation,
  createRoomViewEmbedPageReferenceLookup,
  createRoomViewEmbedPageSelectFile,
  createRoomViewEmbedPageSetupVisibility,
  createRoomViewEmbedPageSlowPreview,
  createRoomViewEmbedPageSourceAvailability,
  createRoomViewEmbedPageSourceDrill,
  createRoomViewEmbedPageSourceNavigation,
  createRoomViewEmbedPageSourceSubscription,
  createRoomViewEmbedPageSwitchPrefetch,
  createRoomViewEmbedPageTitleCommit,
  createRoomViewEmbedPageVisualize,
  renderRoomViewEmbedPageView,
} from "../closure-factories";
import {
  Button,
  DataModelSchemasDragging,
  DataModelSchemasDragging2,
  EditorSelectionAndTablesRequested,
  EditorSelectionAndTablesRoads,
  EditorSelectionAndTablesSelection2,
  EditorSelectionAndTablesState6,
  EditorSelectionAndTablesState7,
  FrameUnavailable,
  LanguagePickerSkeleton,
  ObservabilityBrowserAndOperationEventsRoutine,
  PlatformApiAndAuthParticipants,
  PlatformApiAndAuthUser,
  PlatformLiveDocumentAndHistoryDeclare2,
  PlatformLiveDocumentAndHistoryDocReady,
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingCanRename,
  ResolvePlatformSyncAndRoutingValue18Component,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  apiFetcher,
  collectPlatformLiveDocumentAndHistoryKind,
  createPagesFaceGoneEvent,
  createPagesFaceUnavailableEvent,
  createPagesTocJumpEvent,
  emitTelemetryEvent,
  frameCurrentAnchor,
  frameDeclineExport,
  frameLane,
  frameOpenExternal,
  frameSignInHref,
  frameTitleFromContent,
  frameTitlePropose,
  getDataOperationControlKeys,
  isDataContentAndReferencesVersion,
  isEditorExtensionsLocation,
  isEditorHostTaken,
  isFrameArtifact,
  isPlatformLiveDocumentAndHistoryDelete,
  isPlatformLiveDocumentAndHistoryKind,
  isPlatformLiveDocumentAndHistorySurface,
  liveDoor,
  liveSupportCode,
  loadDataOperationControlDialect,
  loadDataOperationControlKind,
  loadPlatformLiveDocumentAndHistoryLimit,
  onFrameGotoAnchor,
  platformLiveDocumentAndHistoryModalModalRefValues,
  resolveCommentsActionsAndSelectionValue3,
  resolveCommentsEditorStore,
  resolveCommentsEditorStore2,
  resolveCommentsEditorStore3,
  resolveCommentsEditorUseContext2,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataContentAndReferencesTest5,
  resolveDataModelSchemasValue3,
  resolveDataOperationControlSlug,
  resolveDataOperationControlSlug2,
  resolveEditorAnchorsAndMentionsValue10,
  resolveEditorHostTabs,
  resolveEditorHostTabs2,
  resolveEditorSelectionAndTablesHash,
  resolveObservabilityBootKey,
  resolveObservabilityBootPaint2,
  resolveObservabilityBootValue4,
  resolveObservabilityBrowserAndOperationEventsParser,
  resolveObservabilityBrowserAndOperationEventsSearchHook,
  resolveObservabilityBrowserAndOperationEventsTIMEOUT,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthAgent,
  resolvePlatformApiAndAuthContainer2,
  resolvePlatformApiAndAuthFile2,
  resolvePlatformApiAndAuthStartsWith,
  resolvePlatformLiveDocumentAndHistoryByPage,
  resolvePlatformLiveDocumentAndHistoryDrew,
  resolvePlatformLiveDocumentAndHistoryKind4,
  resolvePlatformRuntimeAndChatCatch,
  resolvePlatformSessionAndSourcesKind,
  resolvePlatformSessionAndSourcesRest,
  resolvePlatformSessionAndSourcesTab6,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingTab,
  resolvePlatformSyncAndRoutingTaken,
  resolvePlatformSyncAndRoutingTest,
  resolvePlatformSyncAndRoutingValue10,
  resolvePlatformSyncAndRoutingValue20,
  resolvePlatformSyncAndRoutingValue22,
  resolveUiProviderAndLayersUseContext11,
  setDisconnectToastSuppressed,
  subscribeProjectFeed,
  tabNameDirectory,
  toast,
  updatePlatformAnnouncementsTimers,
  updatePlatformApiAndAuthSize,
  updatePlatformSyncAndRoutingDirectory,
  updatePlatformSyncAndRoutingEntry,
  useCommentStore,
  useCommentsEditorState,
  useCommentsEditorState2,
  useCommentsEditorState3,
  useCommentsEditorState4,
  useCommentsEditorThen,
  useCommentsEditorThen2,
  useCommentsStoreOwnerOrg,
  useCommentsStoreUseSyncExternalStore,
  useEditorSelectionAndTablesPid,
  useEditorSelectionAndTablesUseSyncExternalStore,
  usePlatformFeatureFlagsUseSyncExternalStore,
  usePlatformLiveDocumentAndHistoryBeat,
  usePlatformLiveDocumentAndHistoryCurrent,
  usePlatformLiveDocumentAndHistoryCurrent2,
  usePlatformLiveDocumentAndHistoryDeadReason,
  usePlatformLiveDocumentAndHistoryDisabled,
  usePlatformLiveDocumentAndHistoryDownloadsOk,
  usePlatformLiveDocumentAndHistoryEnabled,
  usePlatformLiveDocumentAndHistoryEnabled2,
  usePlatformLiveDocumentAndHistoryFormat,
  usePlatformLiveDocumentAndHistoryPid3,
  usePlatformLiveDocumentAndHistoryState,
  usePlatformLiveDocumentAndHistoryState2,
  usePlatformSyncAndRoutingPhone,
  versionHistoryOffered,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  RouteErrorBoundary,
} from "../connection-and-errors/connector-permission-dialog";
import {
  DebugReportFloatingButton,
  IconButton,
  SUPPORT_SLACK_URL,
  getDoorDialect,
  setDoorDialect,
} from "../run-review";
import {
  DOCUMENT_LANGUAGE_COPY,
  DOCUMENT_LANGUAGE_FEATURE,
  DocFontControlGate,
  DocLayoutControlGate,
  KeyboardHelpDialog,
  PageSkillBulbGate,
  ProjectDoorProvider,
  useDocumentDisplayFeed,
  useDocumentFontFeed,
  useDocumentLanguageFeed,
  withoutLanguagePost,
  withoutSkillPost,
  withoutTypographyPost,
} from "../document-display";
import {
  TABS_OUTLINE_HOLD_MS,
  TabsLeftListGate,
  canShowTabsList,
  getTabOutline,
  isTabsLocationFeatureEnabled,
  latestSidebarVisibility,
  rememberSidebarVisibility,
  sidebarVisibilityForKey,
  tabsSidebarDrawingState,
  useStableDocumentIdentity,
  useTabsPlacement,
} from "../document-chrome";
import {
  EMPTY_ONE_TAB_LIST_STATE,
  ONE_TAB_OUTLINE_HOLD_MS,
  ONE_TAB_OUTLINE_SILENCE_MS,
  createTabsOutlineStore,
  reduceOneTabListState,
  tabsOutlineReadPlan,
} from "../presence-and-chat";
import {
  HomeButton,
} from "../document-context-actions/duplicate-document-tab";
import {
  MemoizedTabRail,
} from "../document-context-actions/tab-tree-rows";
import {
  DocumentPostureBadge,
  beginDocumentExport,
  createRequestedDownloadAction,
  documentPosture,
  documentScrollKey,
  exportAsMarkdown,
  exportAsPdf,
  exportAsWord,
  getDocumentScroll,
  googleDocsExportAction,
  guardAsyncDocumentCall,
  installDocumentSwitchPrefetch,
  notionExportAction,
} from "../ask-cards/document-posture-badge";
import {
  updateCommentNotificationsSet,
} from "../comment-notifications/state";
import {
  UseDocumentHostStateParticipantsComponent,
  isDocumentHostStateKind,
  resolveDocumentHostStateValue8,
  useDocumentHostStateValues,
} from "../document-host-state/create-document-host-health-monitor";
import {
  clearDocumentRuntimeRequest,
} from "../document-runtime/use-document-runtime-subscribe-project-feed";
import {
  DOCUMENT_PREVIEW_POPOVER_CLASS,
  PageLoadingFace,
  UseDocumentPreviewUseLayoutEffectComponent,
  documentPreviewKey,
  documentPreviewLimit2000,
  documentPreviewLimit30000,
  documentPreviewLimit8000,
  resolveDocumentPreviewCaption,
  resolveDocumentPreviewChromeShown,
  resolveDocumentPreviewFailed,
  resolveDocumentPreviewFrame,
  resolveDocumentPreviewShown,
  useDocumentPreviewShown,
  useDocumentPreviewState,
  usePageSkillSeat,
} from "../document-preview/use-page-skill-seat";
import {
  RoomviewFrameToolbar,
} from "../document-preview/roomview-frame-toolbar";
import {
  Pagebar,
  PagebarImageInput,
  resolveDocumentTabsCanUndo,
  resolveDocumentTabsCommentSelectionDisabled,
  resolveDocumentTabsFormat,
  resolveDocumentTabsProseOpen,
  resolveDocumentTabsShell,
  resolveDocumentTabsValue5,
  resolveDocumentTabsValue6,
  useDocumentTabsFocusVisible,
  useDocumentTabsPreventScroll,
  useDocumentTabsUseSyncExternalStore,
} from "../document-tabs/pagebar";
import {
  buildPagebarExportActions,
  mapDocumentTabsFormat,
  resolveDocumentTabsDrive,
} from "../document-tabs/build-pagebar-export-actions";
import {
  FileTabNavigation,
  RoomDeniedScreen,
  RoomSigninFace,
  createFilePlacementWaiter,
  getSessionNavigationValue,
  resolveSessionNavigationValue2,
  updateSessionNavigationDelete,
} from "./create-file-placement-waiter";
import {
  LdocCommentsBtn,
  RoomviewEmbedCommentsSeat,
  SessionNavigationDefault4,
  SessionNavigationDocLanguageDialog,
  SessionNavigationThen3,
  SessionNavigation_TheTabYouWereOnHasBeenDeletedOrIsNoLongerAvailable,
  resolveSessionNavigationClosest,
  resolveSessionNavigationFrame2,
  resolveSessionNavigationMatches,
  resolveSessionNavigationPath,
  resolveSessionNavigationValue5,
} from "./ldoc-comments-btn";
import {
  ApplicationRoutesSet,
  ChatPill,
  FilmedProsePage,
} from "../application/routes-filmed-prose-page";
import {
  HeaderPath,
  RoutinesDialog,
} from "../application/routes-routines-dialog";
import {
  HistoryRailToggle,
  RoomviewAuthorityFailed,
  RoutinePage,
  UseApplicationRootHasFilesComponent,
  loadApplicationRootRows,
  resolveApplicationRootKind,
  updateApplicationRootValue,
} from "../application/root-routine-detail";

function RoomViewEmbedPage(..._extraArguments: unknown[]) {
  // BaoCut: per-render live bindings preserve callback timing and local state ownership.
  const embedPageLiveContext = {
    get ApplicationRoutesSet(): Dynamic { return ApplicationRoutesSet; },
    get Button(): Dynamic { return Button; },
    get ChatPill(): Dynamic { return ChatPill; },
    get DOCUMENT_LANGUAGE_COPY(): Dynamic { return DOCUMENT_LANGUAGE_COPY; },
    get DataModelSchemasDragging2(): Dynamic { return DataModelSchemasDragging2; },
    get DebugReportFloatingButton(): Dynamic { return DebugReportFloatingButton; },
    get DocFontControlGate(): Dynamic { return DocFontControlGate; },
    get DocLayoutControlGate(): Dynamic { return DocLayoutControlGate; },
    get DocumentPostureBadge(): Dynamic { return DocumentPostureBadge; },
    get FileTabNavigation(): Dynamic { return FileTabNavigation; },
    get FilmedProsePage(): Dynamic { return FilmedProsePage; },
    get FrameUnavailable(): Dynamic { return FrameUnavailable; },
    get HeaderPath(): Dynamic { return HeaderPath; },
    get HistoryRailToggle(): Dynamic { return HistoryRailToggle; },
    get HomeButton(): Dynamic { return HomeButton; },
    get IconButton(): Dynamic { return IconButton; },
    get KeyboardHelpDialog(): Dynamic { return KeyboardHelpDialog; },
    get LanguagePickerSkeleton(): Dynamic { return LanguagePickerSkeleton; },
    get LdocCommentsBtn(): Dynamic { return LdocCommentsBtn; },
    get MemoizedTabRail(): Dynamic { return MemoizedTabRail; },
    get ONE_TAB_OUTLINE_HOLD_MS(): number { return ONE_TAB_OUTLINE_HOLD_MS; },
    get ONE_TAB_OUTLINE_SILENCE_MS(): number { return ONE_TAB_OUTLINE_SILENCE_MS; },
    get ObservabilityBrowserAndOperationEventsRoutine(): string { return ObservabilityBrowserAndOperationEventsRoutine; },
    get PageLoadingFace(): Dynamic { return PageLoadingFace; },
    get PageSkillBulbGate(): Dynamic { return PageSkillBulbGate; },
    get Pagebar(): Dynamic { return Pagebar; },
    get PagebarImageInput(): Dynamic { return PagebarImageInput; },
    get PlatformLiveDocumentAndHistoryDocReady(): Dynamic { return PlatformLiveDocumentAndHistoryDocReady; },
    get ProjectDoorProvider(): Dynamic { return ProjectDoorProvider; },
    get React(): Dynamic { return React; },
    get ResolvePlatformSyncAndRoutingValue18Component(): Dynamic { return ResolvePlatformSyncAndRoutingValue18Component; },
    get RoomDeniedScreen(): Dynamic { return RoomDeniedScreen; },
    get RoomSigninFace(): Dynamic { return RoomSigninFace; },
    get RoomviewAuthorityFailed(): Dynamic { return RoomviewAuthorityFailed; },
    get RoomviewEmbedCommentsSeat(): Dynamic { return RoomviewEmbedCommentsSeat; },
    get RoomviewFrameToolbar(): Dynamic { return RoomviewFrameToolbar; },
    get RouteErrorBoundary(): Dynamic { return RouteErrorBoundary; },
    get RoutinePage(): Dynamic { return RoutinePage; },
    get RoutinesDialog(): Dynamic { return RoutinesDialog; },
    get SessionNavigationDefault4(): Dynamic { return SessionNavigationDefault4; },
    get SessionNavigationDocLanguageDialog(): Dynamic { return SessionNavigationDocLanguageDialog; },
    get SessionNavigationThen3(): Dynamic { return SessionNavigationThen3; },
    get SessionNavigation_TheTabYouWereOnHasBeenDeletedOrIsNoLongerAvailable(): string { return SessionNavigation_TheTabYouWereOnHasBeenDeletedOrIsNoLongerAvailable; },
    get TABS_OUTLINE_HOLD_MS(): number { return TABS_OUTLINE_HOLD_MS; },
    get TabsLeftListGate(): Dynamic { return TabsLeftListGate; },
    get Tooltip(): Dynamic { return Tooltip; },
    get UiDialogsRoot(): Dynamic { return UiDialogsRoot; },
    get UiOverlaysAndIconsCustomIcon(): Dynamic { return UiOverlaysAndIconsCustomIcon; },
    get UseApplicationRootHasFilesComponent(): Dynamic { return UseApplicationRootHasFilesComponent; },
    get UseDocumentHostStateParticipantsComponent(): Dynamic { return UseDocumentHostStateParticipantsComponent; },
    get UseDocumentPreviewUseLayoutEffectComponent(): Dynamic { return UseDocumentPreviewUseLayoutEffectComponent; },
    get apiFetcher(): Dynamic { return apiFetcher; },
    get bar(): Dynamic { return bar; },
    get bar2(): Dynamic { return bar2; },
    get beginDocumentExport(): Dynamic { return beginDocumentExport; },
    get callback(): Dynamic { return callback; },
    get chipNav(): Dynamic { return chipNav; },
    get className(): string { return className; },
    get collectPlatformLiveDocumentAndHistoryKind(): Dynamic { return collectPlatformLiveDocumentAndHistoryKind; },
    get container(): Dynamic { return container; },
    get container2(): Dynamic { return container2; },
    get contentPending(): Dynamic { return contentPending; },
    get countRef(): Dynamic { return countRef; },
    get createFilePlacementWaiter(): Dynamic { return createFilePlacementWaiter; },
    get createPagesFaceGoneEvent(): Dynamic { return createPagesFaceGoneEvent; },
    get createPagesFaceUnavailableEvent(): Dynamic { return createPagesFaceUnavailableEvent; },
    get createRequestedDownloadAction(): Dynamic { return createRequestedDownloadAction; },
    get denied(): boolean { return denied; },
    get displayName(): Dynamic { return displayName; },
    get docked(): Dynamic { return docked; },
    get documentPreviewCaption(): Dynamic { return documentPreviewCaption; },
    get documentPreviewChromeShown(): Dynamic { return documentPreviewChromeShown; },
    get documentPreviewKey(): Dynamic { return documentPreviewKey; },
    get documentPreviewLimit2000(): number { return documentPreviewLimit2000; },
    get documentPreviewLimit8000(): number { return documentPreviewLimit8000; },
    get documentScrollKey(): Dynamic { return documentScrollKey; },
    get documentTabsFormat(): Dynamic { return documentTabsFormat; },
    get edgeMinLeft(): number | undefined { return edgeMinLeft; },
    get elementRef2(): Dynamic { return elementRef2; },
    get elementRef3(): Dynamic { return elementRef3; },
    get elementRef4(): Dynamic { return elementRef4; },
    get elementRef5(): Dynamic { return elementRef5; },
    get elementRef6(): Dynamic { return elementRef6; },
    get elementRef7(): Dynamic { return elementRef7; },
    get elementRef8(): Dynamic { return elementRef8; },
    get elementRef9(): Dynamic { return elementRef9; },
    get emitTelemetryEvent(): Dynamic { return emitTelemetryEvent; },
    get enabled(): boolean { return enabled; },
    get enabled2(): Dynamic { return enabled2; },
    get enabledRef(): Dynamic { return enabledRef; },
    get enabledRef2(): Dynamic { return enabledRef2; },
    get enabledRef3(): Dynamic { return enabledRef3; },
    get enabledState3(): Dynamic { return enabledState3; },
    get enabledState4(): Dynamic { return enabledState4; },
    get enabledState5(): Dynamic { return enabledState5; },
    get faceUp(): Dynamic { return faceUp; },
    get failed(): boolean { return failed; },
    get failed2(): boolean { return failed2; },
    get feed(): Dynamic { return feed; },
    get fileId(): Dynamic { return fileId; },
    get fileId2(): Dynamic { return fileId2; },
    get filePath(): Dynamic { return filePath; },
    get filePlacementWaiterState(): Dynamic { return filePlacementWaiterState; },
    get foldOn(): Dynamic { return foldOn; },
    get following(): Dynamic { return following; },
    get frame(): Dynamic { return frame; },
    get frameCurrentAnchor(): Dynamic { return frameCurrentAnchor; },
    get frameDeclineExport(): Dynamic { return frameDeclineExport; },
    get frameLane(): Dynamic { return frameLane; },
    get frameSignInHref(): Dynamic { return frameSignInHref; },
    get frameTitleFromContent(): Dynamic { return frameTitleFromContent; },
    get frameTitlePropose(): Dynamic { return frameTitlePropose; },
    get getDataOperationControlKeys(): Dynamic { return getDataOperationControlKeys; },
    get getDocumentScroll(): Dynamic { return getDocumentScroll; },
    get getDoorDialect(): Dynamic { return getDoorDialect; },
    get getSessionNavigationValue(): Dynamic { return getSessionNavigationValue; },
    get getSessionNavigationValue2(): Dynamic { return getSessionNavigationValue2; },
    get getTabOutline(): Dynamic { return getTabOutline; },
    get gone(): boolean { return gone; },
    get guardAsyncDocumentCall(): Dynamic { return guardAsyncDocumentCall; },
    get hostCommentOffered(): Dynamic { return hostCommentOffered; },
    get id2(): Dynamic { return id2; },
    get image(): Dynamic { return image; },
    get initialFocus(): Dynamic { return initialFocus; },
    get inputRef(): Dynamic { return inputRef; },
    get installDocumentSwitchPrefetch(): Dynamic { return installDocumentSwitchPrefetch; },
    get isDocumentHostStateKind(): Dynamic { return isDocumentHostStateKind; },
    get isPlatformLiveDocumentAndHistoryDelete(): Dynamic { return isPlatformLiveDocumentAndHistoryDelete; },
    get isTabsLocationFeatureEnabled2(): boolean { return isTabsLocationFeatureEnabled2; },
    get join2(): Dynamic { return join2; },
    get jsxRuntime(): Dynamic { return jsxRuntime; },
    get kind2(): Dynamic { return kind2; },
    get latestSidebarVisibility(): Dynamic { return latestSidebarVisibility; },
    get liveDoor(): Dynamic { return liveDoor; },
    get liveSupportCode(): Dynamic { return liveSupportCode; },
    get loadApplicationRootRows(): Dynamic { return loadApplicationRootRows; },
    get loadDataOperationControlDialect(): Dynamic { return loadDataOperationControlDialect; },
    get loadPlatformLiveDocumentAndHistoryLimit(): Dynamic { return loadPlatformLiveDocumentAndHistoryLimit; },
    get matchShell(): Dynamic { return matchShell; },
    get matchesQueryEntry(): boolean { return matchesQueryEntry; },
    get measureKey(): string | undefined { return measureKey; },
    get memoized(): Dynamic { return memoized; },
    get memoized3(): Dynamic { return memoized3; },
    get memoized4(): Dynamic { return memoized4; },
    get memoized5(): Dynamic { return memoized5; },
    get memoized7(): Dynamic { return memoized7; },
    get memoized9(): Dynamic { return memoized9; },
    get nameOf(): Dynamic { return nameOf; },
    get navigate(): Dynamic { return navigate; },
    get nodeId(): Dynamic { return nodeId; },
    get objectFiles(): Dynamic { return objectFiles; },
    get onDocFont(): Dynamic { return onDocFont; },
    get onDocLanguage(): Dynamic { return onDocLanguage; },
    get onDrillChange(): Dynamic { return onDrillChange; },
    get onEscapeToChrome(): Dynamic { return onEscapeToChrome; },
    get onFirstHeading(): Dynamic { return onFirstHeading; },
    get onFollow(): Dynamic { return onFollow; },
    get onHeadKind(): Dynamic { return onHeadKind; },
    get onJumpHeading(): Dynamic { return onJumpHeading; },
    get onLeft(): Dynamic { return onLeft; },
    get onLost(): Dynamic { return onLost; },
    get onOpenChange(): Dynamic { return onOpenChange; },
    get onOpenChange2(): Dynamic { return onOpenChange2; },
    get onOpenFile(): Dynamic { return onOpenFile; },
    get onOpenFile2(): Dynamic { return onOpenFile2; },
    get onOpenSources(): Dynamic { return onOpenSources; },
    get onPage(): Dynamic { return onPage; },
    get onPageGone(): Dynamic { return onPageGone; },
    get onPageSkill(): Dynamic { return onPageSkill; },
    get onPanelOpen(): Dynamic { return onPanelOpen; },
    get onRailInSlot(): Dynamic { return onRailInSlot; },
    get onRenamed(): Dynamic { return onRenamed; },
    get onRenamedRef(): Dynamic { return onRenamedRef; },
    get onRenaming(): Dynamic { return onRenaming; },
    get onSelect(): Dynamic { return onSelect; },
    get onShown(): Dynamic { return onShown; },
    get onSurfaceKind(): Dynamic { return onSurfaceKind; },
    get onTabGone(): Dynamic { return onTabGone; },
    get onTitleCommit(): Dynamic { return onTitleCommit; },
    get onUp(): Dynamic { return onUp; },
    get onUserNavigate(): Dynamic { return onUserNavigate; },
    get onViewOnly(): Dynamic { return onViewOnly; },
    get onVisualize(): Dynamic { return onVisualize; },
    get oneTabList(): Dynamic { return oneTabList; },
    get open(): Dynamic { return open; },

    get outlineFeed(): Dynamic { return outlineFeed; },
    get outlineJump(): Dynamic { return outlineJump; },
    get outlineWanted(): Dynamic { return outlineWanted; },
    get page2(): Dynamic { return page2; },
    get participants(): Dynamic { return participants; },
    get pid2(): Dynamic { return pid2; },
    get pid3(): Dynamic { return pid3; },
    get place(): string { return place; },
    get placement(): Dynamic { return placement; },
    get platformLiveDocumentAndHistoryModalModalRefValues(): Dynamic { return platformLiveDocumentAndHistoryModalModalRefValues; },
    get posture(): string { return posture; },
    get posture2(): string { return posture2; },
    get presence(): Dynamic { return presence; },
    get previewUp(): Dynamic { return previewUp; },
    get previewUpRef(): Dynamic { return previewUpRef; },
    get projectName2(): Dynamic { return projectName2; },
    get proseSurface(): boolean { return proseSurface; },
    get queryEntry(): string | undefined { return queryEntry; },
    get railSlot(): Dynamic { return railSlot; },
    get readOnly(): Dynamic { return readOnly; },
    get readOnly2(): boolean { return readOnly2; },
    get reason(): string | undefined { return reason; },
    get recordRef(): Dynamic { return recordRef; },
    get resolveApplicationRootKind(): Dynamic { return resolveApplicationRootKind; },
    get resolveCommentsActionsAndSelectionValue3(): Dynamic { return resolveCommentsActionsAndSelectionValue3; },
    get resolveDataContentAndReferencesKind(): Dynamic { return resolveDataContentAndReferencesKind; },
    get resolveDataContentAndReferencesKind2(): Dynamic { return resolveDataContentAndReferencesKind2; },
    get resolveDataContentAndReferencesTest5(): Dynamic { return resolveDataContentAndReferencesTest5; },
    get resolveDataOperationControlSlug(): Dynamic { return resolveDataOperationControlSlug; },
    get resolveDataOperationControlSlug2(): Dynamic { return resolveDataOperationControlSlug2; },
    get resolveDocumentHostStateValue8(): Dynamic { return resolveDocumentHostStateValue8; },
    get resolveEditorAnchorsAndMentionsValue10(): Dynamic { return resolveEditorAnchorsAndMentionsValue10; },
    get resolveEditorSelectionAndTablesHash(): Dynamic { return resolveEditorSelectionAndTablesHash; },
    get resolveObservabilityBrowserAndOperationEventsTIMEOUT(): Dynamic { return resolveObservabilityBrowserAndOperationEventsTIMEOUT; },
    get resolveObservabilityBrowserAndOperationEventsValue3(): Dynamic { return resolveObservabilityBrowserAndOperationEventsValue3; },
    get resolvePlatformApiAndAuthFile2(): Dynamic { return resolvePlatformApiAndAuthFile2; },
    get resolvePlatformApiAndAuthStartsWith(): Dynamic { return resolvePlatformApiAndAuthStartsWith; },
    get resolvePlatformLiveDocumentAndHistoryByPage(): Dynamic { return resolvePlatformLiveDocumentAndHistoryByPage; },
    get resolvePlatformLiveDocumentAndHistoryKind4(): Dynamic { return resolvePlatformLiveDocumentAndHistoryKind4; },
    get resolvePlatformSessionAndSourcesKind(): Dynamic { return resolvePlatformSessionAndSourcesKind; },
    get resolvePlatformSessionAndSourcesRest(): Dynamic { return resolvePlatformSessionAndSourcesRest; },
    get resolvePlatformSessionAndSourcesTab6(): Dynamic { return resolvePlatformSessionAndSourcesTab6; },
    get resolvePlatformSyncAndRoutingTab(): Dynamic { return resolvePlatformSyncAndRoutingTab; },
    get resolveSessionNavigationClosest(): Dynamic { return resolveSessionNavigationClosest; },
    get resolveSessionNavigationFrame2(): Dynamic { return resolveSessionNavigationFrame2; },
    get resolveSessionNavigationPath(): Dynamic { return resolveSessionNavigationPath; },
    get resolveSessionNavigationValue2(): Dynamic { return resolveSessionNavigationValue2; },
    get role(): Dynamic { return role; },
    get room(): Dynamic { return room; },
    get roomViewEmbedPageHandler(): Dynamic { return roomViewEmbedPageHandler; },
    get roomViewEmbedPageResult(): Dynamic { return roomViewEmbedPageResult; },
    get roomViewEmbedPageResult13(): Dynamic { return roomViewEmbedPageResult13; },
    get roomViewEmbedPageResult15(): Dynamic { return roomViewEmbedPageResult15; },
    get roomViewEmbedPageResult16(): Dynamic { return roomViewEmbedPageResult16; },
    get roomViewEmbedPageResult17(): Dynamic { return roomViewEmbedPageResult17; },
    get roomViewEmbedPageResult18(): Dynamic { return roomViewEmbedPageResult18; },
    get roomViewEmbedPageResult19(): Dynamic { return roomViewEmbedPageResult19; },
    get roomViewEmbedPageResult20(): Dynamic { return roomViewEmbedPageResult20; },
    get roomViewEmbedPageResult23(): Dynamic { return roomViewEmbedPageResult23; },
    get roomViewEmbedPageResult24(): Dynamic { return roomViewEmbedPageResult24; },
    get roomViewEmbedPageResult29(): Dynamic { return roomViewEmbedPageResult29; },
    get roomViewEmbedPageResult3(): Dynamic { return roomViewEmbedPageResult3; },
    get roomViewEmbedPageResult31(): Dynamic { return roomViewEmbedPageResult31; },
    get roomViewEmbedPageResult32(): Dynamic { return roomViewEmbedPageResult32; },
    get roomViewEmbedPageResult4(): Dynamic { return roomViewEmbedPageResult4; },
    get roomViewEmbedPageResult8(): Dynamic { return roomViewEmbedPageResult8; },
    get roomViewEmbedPageState(): Dynamic { return roomViewEmbedPageState; },
    get roomViewEmbedPageState13(): Dynamic { return roomViewEmbedPageState13; },
    get roomViewEmbedPageState7(): Dynamic { return roomViewEmbedPageState7; },
    get roomViewEmbedPageState9(): Dynamic { return roomViewEmbedPageState9; },
    get routineId(): Dynamic { return routineId; },
    get sawSettingUp(): Dynamic { return sawSettingUp; },
    get seat(): Dynamic { return seat; },
    get seat2(): Dynamic { return seat2; },
    get seat3(): Dynamic { return seat3; },
    get seat4(): Dynamic { return seat4; },
    get seats(): Dynamic { return seats; },
    get send(): Dynamic { return send; },
    get send2(): Dynamic { return send2; },
    get send3(): Dynamic { return send3; },
    get set2(): Dynamic { return set2; },
    get setDoorDialect(): Dynamic { return setDoorDialect; },
    get setEnabledState2(): Dynamic { return setEnabledState2; },
    get setEnabledState3(): Dynamic { return setEnabledState3; },
    get setItemsState(): Dynamic { return setItemsState; },
    get setOneTabList(): Dynamic { return setOneTabList; },
    get setOutlineJump(): Dynamic { return setOutlineJump; },
    get setRailSlot(): Dynamic { return setRailSlot; },
    get setRoomViewEmbedPageState2(): Dynamic { return setRoomViewEmbedPageState2; },
    get setRoomViewEmbedPageState3(): Dynamic { return setRoomViewEmbedPageState3; },
    get setRoomViewEmbedPageState4(): Dynamic { return setRoomViewEmbedPageState4; },
    get setRoomViewEmbedPageState5(): Dynamic { return setRoomViewEmbedPageState5; },
    get setSawSettingUp(): Dynamic { return setSawSettingUp; },
    get setSlow(): Dynamic { return setSlow; },
    get settingUp(): Dynamic { return settingUp; },
    get shownForRoute(): Dynamic { return shownForRoute; },
    get silent(): Dynamic { return silent; },
    get snapshotHead(): Dynamic { return snapshotHead; },
    get snapshotReady(): Dynamic { return snapshotReady; },
    get subscribeProjectFeed(): Dynamic { return subscribeProjectFeed; },
    get tabNames(): Dynamic { return tabNames; },
    get tabOfPage(): Dynamic { return tabOfPage; },
    get tabOfPage2(): Dynamic { return tabOfPage2; },
    get tabsOnPage(): Dynamic { return tabsOnPage; },
    get tabsSidebarDrawingState2(): Dynamic { return tabsSidebarDrawingState2; },
    get toast(): Dynamic { return toast; },
    get tooLarge(): boolean { return tooLarge; },
    get triggerHidden(): Dynamic { return triggerHidden; },
    get updatePlatformApiAndAuthSize(): Dynamic { return updatePlatformApiAndAuthSize; },
    get updatePlatformSyncAndRoutingEntry(): Dynamic { return updatePlatformSyncAndRoutingEntry; },
    get useDocumentPreviewShown2(): Dynamic { return useDocumentPreviewShown2; },
    get useDocumentPreviewState2(): Dynamic { return useDocumentPreviewState2; },
    get usePageSkillSeat2(): Dynamic { return usePageSkillSeat2; },
    get useStableDocumentIdentity2(): Dynamic { return useStableDocumentIdentity2; },
    get version(): Dynamic { return version; },
    get versionHistoryOffered(): Dynamic { return versionHistoryOffered; },
    get versionHistoryV2(): Dynamic { return versionHistoryV2; },
    get viewerClass(): Dynamic { return viewerClass; },
    get viewerReadOnly(): Dynamic { return viewerReadOnly; },
    get zIndex(): Dynamic { return zIndex; },
    get zIndex2(): Dynamic { return zIndex2; },
  };
  let roomViewEmbedPageResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [, set]: Dynamic =
    resolveObservabilityBrowserAndOperationEventsParser(`/project/:pid`);
  let [, set2]: Dynamic = resolveObservabilityBrowserAndOperationEventsParser(
    `/project/:pid/file/:fileId`,
  );
  let [, set3]: Dynamic = resolveObservabilityBrowserAndOperationEventsParser(
    `/project/:pid/routine/:rid`,
  );
  let [roomViewEmbedPageResult2, navigate]: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue48();
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    updatePlatformAnnouncementsTimers(document, {
      timers: ApplicationRoutesSet,
    });
  }, []);
  let pid: Dynamic = set3?.pid ?? set2?.pid ?? set?.pid ?? ``;
  let { id: pid2, version: version }: Dynamic =
    isDataContentAndReferencesVersion(pid) ?? {
      id: pid,
    };
  let queryEntry =
    new URLSearchParams(location.search).get(`path`) ?? undefined;
  let matchesQueryEntry =
    queryEntry !== undefined && /^[0-9a-f]{8}-[0-9a-f]{4}$/.test(queryEntry);
  let nodeId: Dynamic =
    set2?.fileId ?? (matchesQueryEntry ? queryEntry : undefined);
  let routineId: Dynamic = set3?.rid;
  let container: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      kind: `project`,
      id: pid2,
    }),
    [pid2],
  );
  let container2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      kind: `project`,
      id: pid2,
      ...(version
        ? {
            version: version,
          }
        : {}),
    }),
    [pid2, version],
  );
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      pid2 ? liveDoor(pid2) : undefined,
    [pid2],
  );
  let [itemsState, setItemsState]: Dynamic = (0, React.useState)([]);
  let [roomViewEmbedPageState, setRoomViewEmbedPageState]: Dynamic = (0,
  React.useState)(null);
  let [open, onOpenChange]: Dynamic = (0, React.useState)(false);
  let roomViewEmbedPageResult3: Dynamic =
    usePlatformLiveDocumentAndHistoryState2(open);
  let countRef: Dynamic = (0, React.useRef)(0);
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      countRef.current++,
      setRoomViewEmbedPageState(null),
      elementRef.current !== undefined &&
        elementRef.current !== pid2 &&
        onOpenChange(false),
      (elementRef.current = pid2),
      (..._extraArguments: unknown[]): undefined => {
        countRef.current++;
      }
    ),
    [pid2],
  );
  let roomViewEmbedPageResult4: Dynamic = PlatformApiAndAuthUser(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.user?.email,
  );
  let enabled =
    !isFrameArtifact() &&
    new URLSearchParams(location.search).get(`chrome`) === `embed`;
  let frame: Dynamic = isFrameArtifact();
  let roomViewEmbedPageResult5: Dynamic = isEditorExtensionsLocation();
  let enabled2: Dynamic = enabled || frame;
  let phone: Dynamic = resolvePlatformSyncAndRoutingValue20();
  let roomViewEmbedPageResult6 = usePlatformSyncAndRoutingPhone();
  let roomViewEmbedPageResult7: Dynamic = useCommentsEditorState(pid2);
  let frameWritable: Dynamic =
    roomViewEmbedPageResult7 && !roomViewEmbedPageResult6;
  let frameCommentable: Dynamic = useCommentsEditorState2(pid2);
  let foldOn: Dynamic =
    usePlatformFeatureFlagsUseSyncExternalStore(`foldCore`) ||
    isFrameArtifact();
  useCommentsEditorThen2(foldOn ? pid2 : undefined);
  let roomViewEmbedPageResult8: Dynamic = resolveCommentsEditorUseContext2();
  let roomViewEmbedPageResult9: Dynamic = resolveCommentsEditorStore(
    `project/${pid2}`,
  );
  let roomViewEmbedPageResult10: Dynamic = resolveCommentsEditorStore2();
  let roomViewEmbedPageResult11: Dynamic = resolveCommentsEditorStore3();
  let frame2: Dynamic =
    frame &&
    foldOn &&
    roomViewEmbedPageResult11 &&
    roomViewEmbedPageResult9 !== undefined;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      resolveObservabilityBootKey(pid2);
    },
    [pid2],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (frame2) {
        resolveObservabilityBootPaint2(`snapshot`);
      }
    },
    [frame2],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (frame) {
        isEditorHostTaken(pid2);
        return (..._extraArguments: unknown[]) =>
          resolvePlatformSyncAndRoutingTaken(`unmount`, pid2);
      }
    },
    [frame, pid2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (frame) {
        resolvePlatformRuntimeAndChatCatch().catch(
          (..._extraArguments: unknown[]): undefined => {},
        );
      }
    },
    [frame],
  );
  let enabledRef: Dynamic = (0, React.useRef)(false);
  enabledRef.current = resolvePlatformSyncAndRoutingValue22();
  (0, React.useEffect)(
    createRoomViewEmbedPageSwitchPrefetch(embedPageLiveContext),
    [frame, pid2, container],
  );
  let {
    authority: page2,
    validatedPid: pid3,
    value: roomViewEmbedPageResult12,
    refresh: onRenamed,
    staleRefresh: roomViewEmbedPageResult13,
    gone: roomViewEmbedPageResult14,
    reconnecting: roomViewEmbedPageResult15,
  }: Dynamic = usePlatformLiveDocumentAndHistoryState(
    memoized,
    pid2,
    frame2,
    (0, React.useCallback)(
      (..._extraArguments: unknown[]) => {
        if (!frame) return null;
        let roomViewEmbedPageResult37: Dynamic = frameLane(`project/${pid2}`);
        return roomViewEmbedPageResult37.regranting
          ? `regranting`
          : roomViewEmbedPageResult37.connecting
            ? `connecting`
            : null;
      },
      [frame, pid2],
    ),
  );
  let [roomViewEmbedPageState2, onPageGone]: Dynamic = (0, React.useState)();
  let [fileId, setFileId]: Dynamic = (0, React.useState)();
  let onTabGone: Dynamic = (0, React.useCallback)(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      setFileId(roomViewEmbedPage.fileId),
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => setFileId(undefined),
    [nodeId],
  );
  let roomViewEmbedPageResult16: Dynamic =
    roomViewEmbedPageResult14 ||
    (pid3 !== undefined &&
      nodeId !== undefined &&
      roomViewEmbedPageState2?.fileId === nodeId &&
      roomViewEmbedPageState2.gone);
  let roomViewEmbedPageResult17: Dynamic =
    roomViewEmbedPageResult16 &&
    (roomViewEmbedPageResult14 ||
      (roomViewEmbedPageState2?.why !== `not_governed` &&
        roomViewEmbedPageState2?.why !== `cmek`));
  let failed = page2.state === `failed` && page2.pid === pid2;
  let failed2 = usePlatformLiveDocumentAndHistoryDeadReason(pid2) && failed;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (failed) {
        setDisconnectToastSuppressed(true);
        return (..._extraArguments: unknown[]) =>
          setDisconnectToastSuppressed(false);
      }
    },
    [failed],
  );
  let denied = page2.state === `denied` && page2.pid === pid2;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (denied) {
        resolvePlatformSyncAndRoutingTaken(`denied`, pid2);
      } else {
        if (failed) {
          resolvePlatformSyncAndRoutingTaken(`failed`, pid2);
        }
      }
    },
    [denied, failed, pid2],
  );
  let gone = denied && page2.state === `denied` && page2.reason === `gone`;
  let tooLarge =
    denied && page2.state === `denied` && page2.reason === `answer-too-large`;
  (0, React.useEffect)(
    createRoomViewEmbedPageLoadFailureTelemetry(embedPageLiveContext),
    [failed, failed2, pid2, page2],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageAccessFailureTelemetry(embedPageLiveContext),
    [denied, gone, tooLarge, pid2],
  );
  let roomViewEmbedPageResult18: Dynamic =
    page2.state === `denied`
      ? null
      : foldOn
        ? (roomViewEmbedPageResult9 ?? null)
        : (roomViewEmbedPageResult12 ?? null);
  let contentPending: Dynamic =
    !pid3 ||
    (foldOn &&
      roomViewEmbedPageResult9 === undefined &&
      page2.state === `validated` &&
      !roomViewEmbedPageResult16);
  let settingUp: Dynamic =
    frame &&
    foldOn &&
    roomViewEmbedPageResult11 &&
    roomViewEmbedPageResult9 === undefined &&
    page2.state === `pending`;
  let room: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      memoized && pid3
        ? loadDataOperationControlKind(container, memoized)
        : undefined,
    [container, memoized, pid3],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (pid3 && roomViewEmbedPageResult12) {
        setRoomViewEmbedPageState(null);
      }
    },
    [pid3, roomViewEmbedPageResult12],
  );
  useCommentsStoreOwnerOrg(
    roomViewEmbedPageResult18,
    useCommentsEditorThen().id,
  );
  let [roomViewEmbedPageState3, onPageSkill]: Dynamic = (0, React.useState)(
    null,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onPageSkill(null);
    },
    [pid2],
  );
  let [roomViewEmbedPageState4, onDocFont]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onDocFont(null);
    },
    [pid2],
  );
  useDocumentFontFeed(
    pid2,
    roomViewEmbedPageState4,
    pid3 === undefined ? null : roomViewEmbedPageResult18,
  );
  useDocumentDisplayFeed(
    pid2,
    roomViewEmbedPageState4,
    pid3 === undefined ? null : roomViewEmbedPageResult18,
  );
  let [roomViewEmbedPageState5, onDocLanguage]: Dynamic = (0, React.useState)(
    null,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onDocLanguage(null);
    },
    [pid2],
  );
  useDocumentLanguageFeed(
    pid2,
    roomViewEmbedPageState5,
    pid3 === undefined ? null : roomViewEmbedPageResult18,
  );
  let isTabsLocationFeatureEnabled2 = isTabsLocationFeatureEnabled();
  let [roomViewEmbedPageState6, setRoomViewEmbedPageState2]: Dynamic = (0,
  React.useState)(null);
  let seat: Dynamic =
    isTabsLocationFeatureEnabled2 && roomViewEmbedPageState6?.pid === pid2
      ? roomViewEmbedPageState6
      : null;
  let [roomViewEmbedPageState7, setRoomViewEmbedPageState3]: Dynamic = (0,
  React.useState)(null);
  let roomViewEmbedPageStateRef: Dynamic = (0, React.useRef)(
    roomViewEmbedPageState7,
  );
  roomViewEmbedPageStateRef.current = roomViewEmbedPageState7;
  let [enabledState, onUp]: Dynamic = (0, React.useState)(false);
  let [useStableDocumentIdentity2, onLost]: Dynamic =
    useStableDocumentIdentity(pid2);
  let [renaming, onRenaming]: Dynamic = (0, React.useState)(false);
  let [roomViewEmbedPageState8, setRoomViewEmbedPageState4]: Dynamic = (0,
  React.useState)();
  let setRoomViewEmbedPageState5: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPagePreviewState(embedPageLiveContext),
    [],
  );
  let [sure, setSure]: Dynamic = (0, React.useState)(null);
  let place = useTabsPlacement(
    pid2,
    roomViewEmbedPageState4?.pid === pid2
      ? roomViewEmbedPageState4.style
      : null,
  );
  let [recordState, setRecordState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => ({
      pid: pid2,
      feed: createTabsOutlineStore(),
    }),
  );
  if (recordState.pid !== pid2) {
    setRecordState({
      pid: pid2,
      feed: createTabsOutlineStore(),
    });
  }
  let feed: Dynamic = recordState.feed;
  let [oneTabList, setOneTabList]: Dynamic =
    usePlatformLiveDocumentAndHistoryCurrent(
      reduceOneTabListState,
      EMPTY_ONE_TAB_LIST_STATE,
    );
  let [enabledState2, setEnabledState]: Dynamic = (0, React.useState)(false);
  let panelHeadings: Dynamic = isTabsLocationFeatureEnabled2 && frame;
  let onPanelOpen: Dynamic = panelHeadings ? setEnabledState : undefined;
  let menuOpen: Dynamic = enabledState2 && panelHeadings;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!panelHeadings) {
        setEnabledState(false);
      }
    },
    [panelHeadings],
  );
  let [outlineJump, setOutlineJump]: Dynamic = (0, React.useState)(null);
  let memoized2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryDrew(pid2),
    [pid2],
  );
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let {
    wanted: outlineWanted,
    tab: fileId2,
    outlined: tabsOutlineReadPlan2,
    remember: tabsOutlineReadPlan3,
  }: Dynamic = tabsOutlineReadPlan({
    on: isTabsLocationFeatureEnabled2,
    frame: frame,
    seat: seat,
    place: place,
    menuOpen: menuOpen,
    version: version,
    shown: enabledRef2.current,
    oneTabList: oneTabList,
    drew: memoized2.use(),
    renaming: renaming,
  });
  let outlineFeed: Dynamic =
    outlineWanted || (panelHeadings && version === undefined) ? feed : null;
  let send: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageOutlineFeed(embedPageLiveContext),
    [feed, setOneTabList],
  );
  let send2: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageOutlineDelivery(embedPageLiveContext),
    [feed],
  );
  let send3: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageOutlineReveal(embedPageLiveContext),
    [feed],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      feed.send({
        type: `tab`,
        fileId: fileId2,
      });
      setOneTabList({
        type: `tab`,
        fileId: fileId2,
      });
    },
    [feed, fileId2, setOneTabList],
  );
  let memoized3: Dynamic = (0, React.useMemo)(createPagesTocJumpEvent, []);
  let onJumpHeading: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageJumpHeading(embedPageLiveContext),
    [feed, fileId2, memoized3],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (tabsOutlineReadPlan3 !== undefined) {
        memoized2.set(tabsOutlineReadPlan3);
      }
    },
    [tabsOutlineReadPlan3, memoized2],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageHoldTabList(embedPageLiveContext),
    [oneTabList.holding, oneTabList.tab, setOneTabList],
  );
  let onPage: Dynamic =
    frame &&
    !useStableDocumentIdentity2 &&
    canShowTabsList(seat, place, tabsOutlineReadPlan2);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      resolvePlatformSyncAndRoutingTest(pid2),
      (..._extraArguments: unknown[]) => resolvePlatformSyncAndRoutingTest(null)
    ),
    [pid2],
  );
  let internal: Dynamic = useCommentsStoreUseSyncExternalStore();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (pid3) {
        resolvePlatformApiAndAuthContainer2({
          pid: pid3,
        });
        return (..._extraArguments: unknown[]) =>
          resolvePlatformApiAndAuthContainer2(undefined);
      }
    },
    [pid3],
  );
  let test = /^(1|true)$/i.test(
    new URLSearchParams(location.search).get(`share`) ?? ``,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!pid3 || !test) return;
      onOpenChange(true);
      let url = new URL(location.href);
      url.searchParams.delete(`share`);
      history.replaceState(null, ``, url);
    },
    [pid3, test],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageProjectFeed(embedPageLiveContext),
    [pid2, onRenamed, foldOn, frame],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageProjectItems(embedPageLiveContext),
    [pid3, roomViewEmbedPageResult12, foldOn],
  );
  let roomViewEmbedPageResult19: Dynamic = foldOn
    ? roomViewEmbedPageResult10
    : itemsState;
  let placement: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPageResult18 === null
        ? new (Map as Dynamic)()
        : updatePlatformSyncAndRoutingDirectory(roomViewEmbedPageResult18),
    [roomViewEmbedPageResult18],
  );
  let tabNames: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPageResult18 === null
        ? tabNameDirectory(undefined)
        : tabNameDirectory(placement, roomViewEmbedPageResult19),
    [roomViewEmbedPageResult18, placement, roomViewEmbedPageResult19],
  );
  let objectFiles: Dynamic = (0, React.useMemo)(
    createRoomViewEmbedPageFileChoices(embedPageLiveContext),
    [roomViewEmbedPageResult18, placement, roomViewEmbedPageResult19],
  );
  let memoized4: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookup: Dynamic = new (Map as Dynamic)();
      for (let roomViewEmbedPageResult37 of objectFiles as Dynamic)
        if (roomViewEmbedPageResult37.pageId) {
          lookup.set(
            roomViewEmbedPageResult37.pageId,
            roomViewEmbedPageResult37.path,
          );
        }
      return lookup;
    },
    [objectFiles],
  );
  let filePath: Dynamic = nodeId ? (memoized4.get(nodeId) ?? ``) : ``;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      EditorSelectionAndTablesSelection2.getState().clear();
    },
    [nodeId],
  );
  let pop: Dynamic = filePath
    ? (filePath.split(`/`).pop() ?? filePath)
    : undefined;
  let projectName2: Dynamic = roomViewEmbedPageResult18
    ? roomViewEmbedPageResult18.name || `Untitled`
    : undefined;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (projectName2 !== undefined) {
        document.title = pop ? `${pop} | ${projectName2}` : projectName2;
      }
    },
    [projectName2, pop],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        document.title = `Bongo`;
      },
    [],
  );
  let { close: roomViewEmbedPageResult20 }: Dynamic =
    usePlatformLiveDocumentAndHistoryEnabled({
      enabled: enabled,
      routeProjectId: pid2,
      projectId: pid3,
      tab: nodeId
        ? {
            nodeId: nodeId,
            title: pop ?? ``,
          }
        : null,
    });
  let [roomViewEmbedPageState9, onSurfaceKind]: Dynamic = (0, React.useState)();
  let [roomViewEmbedPageState10, setRoomViewEmbedPageState6]: Dynamic = (0,
  React.useState)();
  let onHeadKind: Dynamic = (0, React.useCallback)(
    (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      setRoomViewEmbedPageState6(
        (entry2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          entry2?.fileId === entry.fileId && entry2.kind === entry.kind
            ? entry2
            : entry,
      ),
    [],
  );
  let proseSurface =
    nodeId !== undefined &&
    roomViewEmbedPageState9?.fileId === nodeId &&
    roomViewEmbedPageState9.kind === `prose`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        frame &&
        roomViewEmbedPageState9 !== undefined &&
        roomViewEmbedPageState9.kind !== `prose`
      ) {
        resolvePlatformSyncAndRoutingTaken(`surface`, pid2);
      }
    },
    [frame, roomViewEmbedPageState9, pid2],
  );
  let [roomViewEmbedPageState11, onShown]: Dynamic = (0, React.useState)();
  let measureKey =
    nodeId === undefined
      ? undefined
      : documentPreviewKey(pid2, nodeId, version);
  let shownForRoute: Dynamic = resolveDocumentPreviewShown(
    measureKey,
    roomViewEmbedPageState11,
  );
  enabledRef2.current = shownForRoute === true;
  let silent: Dynamic = tabsOutlineReadPlan({
    on: isTabsLocationFeatureEnabled2,
    frame: frame,
    seat: seat,
    place: place,
    menuOpen: menuOpen,
    version: version,
    shown: shownForRoute === true,
    oneTabList: oneTabList,
    drew: null,
  }).silent;
  (0, React.useEffect)(
    createRoomViewEmbedPageInitialOutline(embedPageLiveContext),
    [shownForRoute, fileId2, feed, setOneTabList],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPagePreviewDelay(embedPageLiveContext),
    [silent, oneTabList.tab, setOneTabList],
  );
  let useDocumentPreviewShown2: Dynamic = useDocumentPreviewShown(
    pid2,
    nodeId !== undefined && routineId === undefined
      ? {
          pid: pid2,
          fileId: nodeId,
          version: version,
        }
      : undefined,
  );
  let seat2: Dynamic = useDocumentPreviewShown2.seat;
  let mounted = !!pid3 && !routineId && seat2 != null && room != null;
  let seatKey = mounted
    ? documentPreviewKey(seat2.pid, seat2.fileId, seat2.version)
    : undefined;
  let now: Dynamic = sidebarVisibilityForKey(roomViewEmbedPageState8, seatKey);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      setSure(
        (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          rememberSidebarVisibility(roomViewEmbedPage, now, pid2),
      ),
    [now, pid2],
  );
  let { drawn: tabsOnPage, noRoom: tabsSidebarDrawingState2 }: Dynamic =
    tabsSidebarDrawingState({
      onPage: onPage,
      mounted: mounted,
      now: now,
      sure: sure,
      pid: pid2,
    });
  useDocumentTabsPreventScroll(tabsOnPage, roomViewEmbedPageStateRef);
  let useDocumentPreviewState2: Dynamic = useDocumentPreviewState(
    useDocumentPreviewShown2.held,
  );
  let [resolveSessionNavigationMatchesState]: Dynamic = (0, React.useState)(
    resolveSessionNavigationMatches,
  );
  let usePageSkillSeat2: Dynamic = usePageSkillSeat({
    on:
      frame &&
      objectFiles.length >= 2 &&
      resolveSessionNavigationMatchesState &&
      tabsOnPage &&
      enabledState,
    pid: pid2,
    routeKey:
      version === undefined && routineId === undefined ? measureKey : undefined,
    routeFileId: nodeId,
    seatKey: seatKey,
    leaveWordOf: useDocumentPreviewShown2.wordOf,
    shownForRoute: shownForRoute,
    failed: failed,
  });
  let displayName: Dynamic =
    (seat2 && memoized4.get(seat2.fileId)?.split(`/`).pop()) || undefined;
  let roomViewEmbedPageResult21: Dynamic = resolveCommentsEditorStore(
    nodeId === undefined ? `file/-` : `file/${nodeId}`,
  );
  let snapshotHead: Dynamic =
    frame && foldOn && nodeId !== undefined
      ? roomViewEmbedPageResult21
      : undefined;
  let snapshotReady: Dynamic = frame && foldOn && roomViewEmbedPageResult11;
  let roomViewEmbedPageResult22: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.connectV3,
  );
  let roomViewEmbedPageResult23: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.participants,
  );
  let following: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.following,
  );
  let roomViewEmbedPageResult24: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.follow,
  );
  let roomViewEmbedPageResult25: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.heartbeat,
  );
  let roomViewEmbedPageResult26: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.registerRefResolver,
  );
  let roomViewEmbedPageResult27: Dynamic = PlatformApiAndAuthParticipants(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.unregisterRefResolver,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      pid2 && !roomViewEmbedPageResult16
        ? roomViewEmbedPageResult22(pid2)
        : undefined,
    [roomViewEmbedPageResult22, pid2, roomViewEmbedPageResult16],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let roomViewEmbedPageHandler3: Dynamic = (
        roomViewEmbedPage?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => memoized4.get(roomViewEmbedPage.id) ?? ``;
      roomViewEmbedPageResult26(roomViewEmbedPageHandler3);
      return (..._extraArguments: unknown[]): Dynamic =>
        roomViewEmbedPageResult27(roomViewEmbedPageHandler3);
    },
    [roomViewEmbedPageResult26, roomViewEmbedPageResult27, memoized4],
  );
  usePlatformLiveDocumentAndHistoryBeat(
    (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic =>
        roomViewEmbedPageResult25(
          filePath,
          nodeId
            ? {
                object: `file`,
                id: nodeId,
              }
            : undefined,
        ),
      [roomViewEmbedPageResult25, filePath, nodeId],
    ),
  );
  let enabledRef3: Dynamic = (0, React.useRef)(false);
  let participants: Dynamic = [...roomViewEmbedPageResult23.values()];
  let onFollow = createRoomViewEmbedPageFollowParticipant(embedPageLiveContext);
  let participant: Dynamic = following
    ? participants.find(
        (participant2?: Dynamic, ..._extraArguments: unknown[]) =>
          resolvePlatformApiAndAuthAgent(participant2) === following,
      )
    : undefined;
  let id2: Dynamic =
    participant?.fileRef?.object === `file`
      ? participant.fileRef.id
      : undefined;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (enabledRef3.current) {
        enabledRef3.current = false;
        return;
      }
      if (following) {
        roomViewEmbedPageResult24(null);
      }
    },
    [roomViewEmbedPageResult2],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageFollowNavigation(embedPageLiveContext),
    [following, id2, nodeId, memoized4, container2, enabled, navigate],
  );
  let nameOf: Dynamic = useDocumentHostStateValues(roomViewEmbedPageResult23);
  let elementRef2: Dynamic = (0, React.useRef)(undefined);
  let presence: Dynamic = (0, React.useMemo)(
    createRoomViewEmbedPagePresence(embedPageLiveContext),
    [roomViewEmbedPageResult23, nameOf],
  );
  let onSelect: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageSelectFile(embedPageLiveContext),
    [objectFiles, container2, navigate],
  );
  let onOpenFile: Dynamic = (0, React.useCallback)(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      navigate(
        resolveDataContentAndReferencesKind({
          container: container2,
          ref: {
            noun: `file`,
            id: roomViewEmbedPage,
          },
        }),
      ),
    [container2, navigate],
  );
  let onOpenFile2: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageOpenFile(embedPageLiveContext),
    [container2, navigate],
  );
  let { readOnly: viewerReadOnly }: Dynamic =
    useEditorSelectionAndTablesPid(pid3);
  let readOnly: Dynamic = enabled && viewerReadOnly;
  let seat3: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      withoutSkillPost(roomViewEmbedPageState3, viewerReadOnly),
    [roomViewEmbedPageState3, viewerReadOnly],
  );
  let seat4: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      withoutTypographyPost(
        roomViewEmbedPageState4?.pid === pid2 ? roomViewEmbedPageState4 : null,
        viewerReadOnly,
      ),
    [roomViewEmbedPageState4, pid2, viewerReadOnly],
  );
  let withoutLanguagePost2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      withoutLanguagePost(
        roomViewEmbedPageState5?.pid === pid2 ? roomViewEmbedPageState5 : null,
        viewerReadOnly,
      ),
    [roomViewEmbedPageState5, pid2, viewerReadOnly],
  );
  let [roomViewEmbedPageState12, onViewOnly]: Dynamic = (0, React.useState)();
  let doorViewOnly: Dynamic =
    nodeId !== undefined &&
    roomViewEmbedPageState12?.fileId === nodeId &&
    roomViewEmbedPageState12.viewOnly;
  let onEscapeToChrome: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      resolveDocumentTabsValue5(
        document,
        roomViewEmbedPageStateRef.current,
      )?.focus({
        focusVisible: true,
      });
    },
    [],
  );
  let posture = documentPosture({
    frameWritable: frameWritable,
    frameCommentable: frameCommentable,
    viewerReadOnly: viewerReadOnly,
    doorViewOnly: doorViewOnly,
  });
  let readOnly2 = posture !== `edit`;
  let commentsListOpen: Dynamic = useCommentStore(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]) =>
      roomViewEmbedPage.commentMode === `list`,
  );
  let previewUp: Dynamic = PlatformSyncAndRoutingAssign2(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]) =>
      isPlatformLiveDocumentAndHistoryKind(roomViewEmbedPage.preview, true)
        .kind === `pinned`,
  );
  let [updateCommentNotificationsSetState]: Dynamic = (0, React.useState)(
    updateCommentNotificationsSet,
  );
  let versionHistoryV2: Dynamic = resolvePlatformSyncAndRoutingValue22();
  let roomViewEmbedPageResult28: Dynamic =
    usePlatformLiveDocumentAndHistoryPid3(
      versionHistoryV2 ? pid2 : ``,
      versionHistoryV2 ? nodeId : undefined,
    );
  let roomViewEmbedPageResult29: Dynamic =
    usePlatformLiveDocumentAndHistoryDownloadsOk();
  let role: Dynamic = useCommentsEditorState3(pid2);
  let viewerClass: Dynamic = useCommentsEditorState4(pid2);
  let kind: Dynamic =
    nodeId !== undefined && roomViewEmbedPageState10?.fileId === nodeId
      ? roomViewEmbedPageState10.kind
      : undefined;
  let roomViewEmbedPageHandler: Dynamic =
    createRoomViewEmbedPageExport(embedPageLiveContext);
  let label: Dynamic =
    nodeId === undefined
      ? frame && routineId === undefined && queryEntry === undefined
        ? `booting`
        : null
      : {
          roads: roomViewEmbedPageResult29.roads,
          roadsPending: roomViewEmbedPageResult29.roadsPending,
          role: role,
          kind: kind,
          exporting: roomViewEmbedPageResult29.inFlight !== null,
        };
  let roomViewEmbedPageHandler2 = createRoomViewEmbedPagePrint(embedPageLiveContext);
  let showOn: Dynamic = EditorSelectionAndTablesState6(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.value,
  );
  let autocorrectOn: Dynamic = EditorSelectionAndTablesState7(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomViewEmbedPage.value,
  );
  let roomViewEmbedPageResult30: Dynamic =
    usePlatformFeatureFlagsUseSyncExternalStore(DOCUMENT_LANGUAGE_FEATURE);
  let [enabledState3, onOpenChange2]: Dynamic = (0, React.useState)(false);
  let roomViewEmbedPageResult31: Dynamic =
    roomViewEmbedPageResult30 &&
    withoutLanguagePost2?.post !== undefined &&
    nodeId !== undefined &&
    proseSurface &&
    !previewUp &&
    posture === `edit`;
  let previewUpRef: Dynamic = (0, React.useRef)(previewUp);
  previewUpRef.current = previewUp;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (roomViewEmbedPageResult31) {
        resolveSessionNavigationValue5().catch(
          (..._extraArguments: unknown[]): undefined => {},
        );
      } else {
        onOpenChange2(false);
      }
    },
    [roomViewEmbedPageResult31],
  );
  let roomViewEmbedPageResult32: Dynamic =
    usePlatformLiveDocumentAndHistoryState2(enabledState3);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let initialFocus: Dynamic = (0, React.useRef)(null);
  if (withoutLanguagePost2 === null) {
    if (elementRef3.current?.pid !== pid2) {
      elementRef3.current = null;
    }
  } else {
    elementRef3.current = withoutLanguagePost2;
  }
  let claude: Dynamic = EditorSelectionAndTablesRoads(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      nodeId === undefined ? undefined : roomViewEmbedPage.roads[nodeId],
  );
  let documentTabsCanUndo: Dynamic = resolveDocumentTabsCanUndo();
  let record: Dynamic = {
    phone: phone,
    frameCommentable: frameCommentable,
    frameWritable: frameWritable,
    commentSelectionDisabled:
      nodeId === undefined || previewUp || !proseSurface,
  };
  let pagebarExportActions: Dynamic = buildPagebarExportActions({
    docLanguage: roomViewEmbedPageResult31
      ? (..._extraArguments: unknown[]): Dynamic => onOpenChange2(true)
      : null,
    commentsListOpen: commentsListOpen,
    showCommentsDisabled: nodeId === undefined || previewUp || !proseSurface,
    showAllComments: (
      roomViewEmbedPage?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      updateCommentNotificationsSetState.set(true, roomViewEmbedPage),
    hideComments: (..._extraArguments: unknown[]): Dynamic =>
      updateCommentNotificationsSetState.set(false),
    internal: internal,
    sendFeedback: (..._extraArguments: unknown[]): undefined =>
      void frameOpenExternal(SUPPORT_SLACK_URL),
    ...record,
    commentSelection: (..._extraArguments: unknown[]): Dynamic =>
      clearDocumentRuntimeRequest().request(),
    versionHistoryV2: versionHistoryV2,
    historyReady: resolveDocumentTabsValue6(roomViewEmbedPageResult28, posture),
    versionHistory: updateApplicationRootValue,
    viewerClass: viewerClass,
    exports:
      label === null || label === `booting`
        ? label
        : {
            ...label,
            exportDocx: roomViewEmbedPageHandler(exportAsWord),
            exportPdf: roomViewEmbedPageHandler(exportAsPdf),
            exportMarkdown: roomViewEmbedPageHandler(exportAsMarkdown),
            exportGoogleDocs: roomViewEmbedPageHandler(googleDocsExportAction),
            exportNotion: roomViewEmbedPageHandler(notionExportAction),
          },
    undoRedo: resolveDocumentTabsProseOpen({
      proseOpen: nodeId !== undefined && proseSurface,
      previewUp: previewUp,
      posture: posture,
    })
      ? documentTabsCanUndo
      : null,
    spelling:
      nodeId !== undefined && proseSurface && !previewUp && posture === `edit`
        ? {
            claude: claude,
            showOn: showOn,
            autocorrectOn: autocorrectOn,
            check: (..._extraArguments: unknown[]): Dynamic =>
              EditorSelectionAndTablesRequested.getState().request(nodeId),
            setShow: (
              roomViewEmbedPage?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              EditorSelectionAndTablesState6.getState().set(roomViewEmbedPage),
            setAutocorrect: (
              roomViewEmbedPage?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              EditorSelectionAndTablesState7.getState().set(roomViewEmbedPage),
          }
        : null,
  });
  let roomViewEmbedPageResult33: Dynamic =
    useEditorSelectionAndTablesUseSyncExternalStore();
  let documentTabsShell: Dynamic = resolveDocumentTabsShell({
    shell: roomViewEmbedPageResult5 || roomViewEmbedPageResult33,
    denied: denied,
    failed: failed,
  });
  usePlatformLiveDocumentAndHistoryDisabled(
    documentTabsShell,
    pagebarExportActions,
  );
  usePlatformLiveDocumentAndHistoryFormat(
    documentTabsShell,
    mapDocumentTabsFormat(label, roomViewEmbedPageHandler2, viewerClass),
  );
  usePlatformLiveDocumentAndHistoryDisabled(
    documentTabsShell,
    resolveDocumentTabsDrive(
      label,
      {
        googleDocs: roomViewEmbedPageHandler(googleDocsExportAction),
        notion: roomViewEmbedPageHandler(notionExportAction),
      },
      viewerClass,
    ),
    PlatformLiveDocumentAndHistoryDeclare2,
  );
  let hostCommentOffered: Dynamic =
    documentTabsShell && resolveDocumentTabsCommentSelectionDisabled(record);
  let recordRef: Dynamic = (0, React.useRef)({
    pid: ``,
    canRename: false,
    projectName: undefined,
    placement: placement,
    viewerRole: null,
  });
  recordRef.current = {
    pid: pid3 && roomViewEmbedPageResult18 ? pid2 : ``,
    canRename: posture === `edit` && version === undefined,
    projectName: roomViewEmbedPageResult18?.name,
    placement: placement,
    viewerRole: role,
  };
  let onRenamedRef: Dynamic = (0, React.useRef)(onRenamed);
  onRenamedRef.current = onRenamed;
  let [filePlacementWaiterState]: Dynamic = (0, React.useState)(
    createRoomViewEmbedPagePlacementWaiter(embedPageLiveContext),
  );
  let pid4: Dynamic = recordRef.current.canRename ? recordRef.current.pid : ``;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (pid4 !== ``) {
        filePlacementWaiterState.observe(pid4, placement);
      }
    },
    [filePlacementWaiterState, pid4, placement],
  );
  let onTitleCommit: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageTitleCommit(embedPageLiveContext),
    [filePlacementWaiterState],
  );
  let onFirstHeading: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageFirstHeading(embedPageLiveContext),
    [],
  );
  let posture2 = posture === `comment` ? `comment` : `view`;
  let reason =
    roomViewEmbedPageResult6 &&
    roomViewEmbedPageResult7 &&
    posture === `comment`
      ? `phone`
      : undefined;
  // BaoCut: 独立工具栏（三处之一）。原版只在嵌进 claude.ai 的 Frame 里显示文档工具栏（标签页、字体、版式、清单、插入菜单），
  // BaoCut 的页面不是 Frame，这里去掉 frame 条件（手机宽度上仍然不显示）。
  let bar: Dynamic = useDocumentTabsUseSyncExternalStore(true);
  let triggerHidden: Dynamic = bar && readOnly2 && tabsOnPage && enabledState;
  let onLeft: Dynamic = tabsOnPage && enabledState;
  let canRename: Dynamic = onLeft && seat !== null && !seat.readOnly;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      PlatformSyncAndRoutingCanRename.getState().set({
        onLeft: onLeft,
        canRename: canRename,
        panelHeadings: panelHeadings,
      }),
      (..._extraArguments: unknown[]): Dynamic =>
        PlatformSyncAndRoutingCanRename.getState().set({
          onLeft: false,
        })
    ),
    [onLeft, canRename, panelHeadings],
  );
  useDocumentTabsFocusVisible(triggerHidden, roomViewEmbedPageStateRef);
  let [railSlot, setRailSlot]: Dynamic = (0, React.useState)(null);
  let [enabledState4, onRailInSlot]: Dynamic = (0, React.useState)(false);
  let seats: Dynamic = resolveEditorHostTabs({
    frame: frame,
    bar: bar,
  });
  let roomViewEmbedPageResult34: Dynamic =
    resolvePlatformSyncAndRoutingValue10();
  let docked: Dynamic = frame && roomViewEmbedPageResult34 && !bar;
  let documentTabsFormat: Dynamic = resolveDocumentTabsFormat();
  let inputRef: Dynamic = (0, React.useRef)(null);
  let roomViewEmbedPageResult35: Dynamic = DataModelSchemasDragging(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]) =>
      roomViewEmbedPage.intercept?.onPick != null,
  );
  let image: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      onPick: (..._extraArguments: unknown[]): Dynamic =>
        inputRef.current?.click(),
      whyNot: roomViewEmbedPageResult35
        ? null
        : `Images can’t be uploaded in this view`,
    }),
    [roomViewEmbedPageResult35],
  );
  let zIndex: Dynamic = resolveUiProviderAndLayersUseContext11(20);
  let zIndex2: Dynamic = resolveUiProviderAndLayersUseContext11(11);
  let edgeMinLeft = frame ? resolveEditorHostTabs2(seats) : undefined;
  let roomViewEmbedPageResult36: Dynamic =
    resolveObservabilityBrowserAndOperationEventsSearchHook();
  let memoized5: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]) =>
      new URLSearchParams(roomViewEmbedPageResult36).get(`src`),
    [roomViewEmbedPageResult36],
  );
  let memoized6: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]) =>
      enabled2 ? null : resolvePlatformLiveDocumentAndHistoryKind4(memoized5),
    [memoized5, enabled2],
  );
  let [kind2, setKind]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => setKind(null),
    [pid2],
  );
  let memoized7: Dynamic =
    memoized6 ??
    (kind2 === null
      ? null
      : {
          kind: kind2,
        });
  let join: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageSourceDrill(embedPageLiveContext),
    [navigate],
  );
  let onOpenSources: Dynamic = (0, React.useCallback)(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `routines` || entry.kind === `sources`) {
        setKind(entry.kind);
      } else {
        setKind(null);
        join(entry);
      }
    },
    [join],
  );
  let onDrillChange: Dynamic = (0, React.useCallback)(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      setKind(null);
      join(roomViewEmbedPage);
    },
    [join],
  );
  let [enabledState5, setEnabledState2]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    createRoomViewEmbedPageSourceAvailability(embedPageLiveContext),
    [pid3, enabled2],
  );
  let join2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      setKind(null);
      join(null);
    },
    [join],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageSourceSubscription(embedPageLiveContext),
    [enabled2, onOpenSources],
  );
  let memoized8: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      enabled2
        ? null
        : isPlatformLiveDocumentAndHistorySurface(
            new URLSearchParams(roomViewEmbedPageResult36),
          ),
    [roomViewEmbedPageResult36, enabled2],
  );
  let join3: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageSourceNavigation(embedPageLiveContext),
    [navigate],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (memoized8?.surface === `data-sources`) {
        join3(resolvePlatformLiveDocumentAndHistoryKind4(memoized8.ref));
      }
    },
    [memoized8, join3],
  );
  let chipNav: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageChipNavigation(embedPageLiveContext),
    [pid2, objectFiles, container2, navigate, onOpenSources],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(routineId || enabled)) {
        resolveDataModelSchemasValue3(chipNav);
        return (..._extraArguments: unknown[]) =>
          resolveDataModelSchemasValue3(null);
      }
    },
    [routineId, enabled, chipNav],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageQueryNavigation(embedPageLiveContext),
    [
      set2?.fileId,
      queryEntry,
      matchesQueryEntry,
      objectFiles,
      container2,
      navigate,
    ],
  );
  let memoized9: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      updatePlatformSyncAndRoutingEntry(placement).find(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataContentAndReferencesTest5(item.id),
      )?.id,
    [placement],
  );
  let getSessionNavigationValue2: Dynamic =
    (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic => {
        let sessionNavigationValue: Dynamic = getSessionNavigationValue(pid2);
        return sessionNavigationValue !== undefined &&
          placement.has(sessionNavigationValue) &&
          resolveDataContentAndReferencesTest5(sessionNavigationValue)
          ? sessionNavigationValue
          : undefined;
      },
      [pid2, placement],
    ) ?? memoized9;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (nodeId !== undefined && placement.has(nodeId)) {
        updateSessionNavigationDelete(pid2, nodeId);
      }
    },
    [pid2, nodeId, placement],
  );
  let elementRef4: Dynamic = (0, React.useRef)(undefined);
  let elementRef5: Dynamic = (0, React.useRef)(null);
  let elementRef6: Dynamic = (0, React.useRef)(null);
  if (elementRef6.current === null) {
    elementRef6.current =
      frame && typeof location !== "undefined"
        ? location.hash.replace(/^#/, ``)
        : ``;
  }
  let elementRef7: Dynamic = (0, React.useRef)(null);
  let memoized10: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      inbound: elementRef6.current ?? ``,
      landing: (..._extraArguments: unknown[]): Dynamic => elementRef7.current,
    }),
    [],
  );
  let elementRef8: Dynamic = (0, React.useRef)(undefined);
  if (
    elementRef8.current === undefined &&
    nodeId !== undefined &&
    placement.has(nodeId) &&
    resolveDataContentAndReferencesTest5(nodeId)
  ) {
    elementRef8.current = nodeId;
  }
  let callback: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageReferenceLookup(embedPageLiveContext),
    [placement, roomViewEmbedPageResult8],
  );
  let tabOfPage: Dynamic = (0, React.useCallback)(
    (roomViewEmbedPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let callback2: Dynamic = callback({
        id: roomViewEmbedPage,
      });
      return callback2.kind === `land` ? callback2.fileId : undefined;
    },
    [callback],
  );
  let tabOfPage2: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPagePageLookup(embedPageLiveContext),
    [frame, tabOfPage],
  );
  let elementRef9: Dynamic = (0, React.useRef)(null);
  let memoized11: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      take(request?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        let element: Dynamic = elementRef9.current;
        elementRef9.current = null;
        return element !== null && element.fileId === request
          ? element.intent
          : null;
      },
    }),
    [],
  );
  let onUserNavigate: Dynamic = (0, React.useCallback)(
    (fileId3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef9.current = {
        fileId: fileId3,
        intent: {
          kind: `user`,
        },
      };
    },
    [],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageChooseInitialTab(embedPageLiveContext),
    [
      nodeId,
      routineId,
      queryEntry,
      contentPending,
      roomViewEmbedPageResult16,
      memoized9,
      getSessionNavigationValue2,
      placement,
      callback,
      tabOfPage2,
      container2,
      navigate,
      frame,
    ],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageDeletedTabNavigation(embedPageLiveContext),
    [
      fileId,
      nodeId,
      contentPending,
      roomViewEmbedPageResult16,
      placement,
      memoized9,
      container2,
      navigate,
    ],
  );
  usePlatformLiveDocumentAndHistoryCurrent2(
    frame,
    nodeId,
    nodeId !== undefined &&
      placement.has(nodeId) &&
      resolveDataContentAndReferencesTest5(nodeId),
    memoized10,
    memoized11,
  );
  let dispatchEvent: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageLandingFocus(embedPageLiveContext),
    [
      nodeId,
      routineId,
      queryEntry,
      placement,
      callback,
      tabOfPage2,
      container2,
      navigate,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      frame ? onFrameGotoAnchor(dispatchEvent) : undefined,
    [frame, dispatchEvent],
  );
  let openTab: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageOpenTab(embedPageLiveContext),
    [container2, navigate],
  );
  usePlatformLiveDocumentAndHistoryEnabled2({
    enabled: frame && routineId === undefined && queryEntry === undefined,
    pid: pid2,
    fileId: nodeId,
    tabOfPage: tabOfPage,
    openTab: openTab,
  });
  let [sawSettingUp, setSawSettingUp]: Dynamic = (0, React.useState)(false);
  let [enabledState6, setEnabledState3]: Dynamic = (0, React.useState)(true);
  let settingUp2: Dynamic =
    settingUp && page2.state === `pending` && page2.pid === pid2;
  let [roomViewEmbedPageState13, setRoomViewEmbedPageState7]: Dynamic = (0,
  React.useState)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (settingUp2) {
        setRoomViewEmbedPageState7(pid2);
        resolveObservabilityBootValue4();
      }
    },
    [settingUp2, pid2],
  );
  (0, React.useEffect)(
    createRoomViewEmbedPageSetupVisibility(embedPageLiveContext),
    [settingUp, sawSettingUp],
  );
  let matchesNodeId =
    nodeId === undefined && routineId === undefined && queryEntry === undefined;
  let faceUp: Dynamic = resolveDocumentPreviewFailed({
    failed: failed,
    contentPending: contentPending,
    redirecting: matchesNodeId && getSessionNavigationValue2 !== undefined,
    awaitingFirstTab:
      frame &&
      sawSettingUp &&
      enabledState6 &&
      !contentPending &&
      matchesNodeId &&
      getSessionNavigationValue2 === undefined,
    onFile: nodeId !== undefined && routineId === undefined,
    surfaceShown: shownForRoute || usePageSkillSeat2.covers,
  });
  let [slow, setSlow]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    createRoomViewEmbedPageSlowPreview(embedPageLiveContext),
    [faceUp, settingUp, usePageSkillSeat2.pictureSince],
  );
  let [unbornLong, setUnbornLong]: Dynamic = (0, React.useState)(false);
  let documentPreviewFrame: Dynamic = resolveDocumentPreviewFrame({
    frame: frame,
    foldOn: foldOn,
    sawSettingUp: sawSettingUp,
    projectKnown: roomViewEmbedPageResult9 !== undefined,
  });
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      setUnbornLong(false);
      if (!documentPreviewFrame) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setUnbornLong(true),
        documentPreviewLimit30000,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [documentPreviewFrame],
  );
  let documentPreviewCaption = resolveDocumentPreviewCaption({
    settingUp: settingUp,
    unbornLong: unbornLong,
    slow: slow,
  });
  let [roomViewEmbedPageState14, setRoomViewEmbedPageState8]: Dynamic = (0,
  React.useState)();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!faceUp && pid3 !== undefined) {
        setRoomViewEmbedPageState8(pid3);
      }
    },
    [faceUp, pid3],
  );
  let {
    chromeShown: documentPreviewChromeShown,
    matchShell: matchShell,
  }: Dynamic = resolveDocumentPreviewChromeShown({
    frame: frame,
    validated: pid3 !== undefined,
    clearedOnce: pid3 !== undefined && roomViewEmbedPageState14 === pid3,
    faceUp: faceUp,
    slow: slow,
    settingUp: settingUp,
  });
  let onVisualize: Dynamic = (0, React.useCallback)(
    createRoomViewEmbedPageVisualize(embedPageLiveContext),
    [room, placement, onRenamed, navigate, container2],
  );
  if (!pid2) return null;
  if (denied && !enabled)
    return (
      <RoomDeniedScreen
        goHome={!frame}
        frame={frame}
        gone={gone}
        tooLarge={tooLarge}
        pid={pid2}
      />
    );
  let bar2: Dynamic = bar || docked;
  let className = frame
    ? `${DOCUMENT_PREVIEW_POPOVER_CLASS} relative min-h-0 flex-1 overflow-clip${bar2 ? ` flex flex-col` : ``}`
    : // BaoCut: 独立工具栏（三处之二）。有工具栏时内容容器要 flex flex-col，编辑器 iframe 才填满工具栏下方；
      // 原版只有 Frame 分支加了，独立分支不加时 iframe 缩成默认的 150px 高。
      `relative min-h-0 flex-1 overflow-hidden md:bg-surface-popover dark:md:bg-surface-0 md:rounded-t-xl md:border md:border-b-0 md:shadow-lg${bar2 ? ` flex flex-col` : ``}`;
  return renderRoomViewEmbedPageView(embedPageLiveContext);
}

export { RoomViewEmbedPage };

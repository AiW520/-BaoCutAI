/** BaoCut: document frame from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  createDocumentFrameAddEventListener257,
  createDocumentFrameCallback510,
  createDocumentFrameCallback611,
  createDocumentFrameCallback867,
  createDocumentFrameCallback969,
  createDocumentFrameCeil59,
  createDocumentFrameCommentAttachmentState270,
  createDocumentFrameCommentAttachmentState372,
  createDocumentFrameDocumentFrameHandler13102,
  createDocumentFrameDocumentFrameHandler14103,
  createDocumentFrameDocumentFrameHandler15105,
  createDocumentFrameDocumentFrameHandler16106,
  createDocumentFrameDocumentFrameHandler18,
  createDocumentFrameDocumentFrameHandler320,
  createDocumentFrameDocumentFrameHandler421,
  createDocumentFrameDocumentFrameHandler536,
  createDocumentFrameDocumentFrameHandler637,
  createDocumentFrameDocumentFrameHandler738,
  createDocumentFrameDocumentFrameHandler840,
  createDocumentFrameDocumentFrameHandler942,
  createDocumentFrameDocumentSelectionIds75,
  createDocumentFrameEffect1,
  createDocumentFrameEffect14,
  createDocumentFrameEffect15,
  createDocumentFrameEffect26,
  createDocumentFrameEffect32,
  createDocumentFrameEffect41,
  createDocumentFrameEffect43,
  createDocumentFrameEffect44,
  createDocumentFrameEffect47,
  createDocumentFrameEffect48,
  createDocumentFrameEffect5,
  createDocumentFrameEffect51,
  createDocumentFrameEffect52,
  createDocumentFrameEffect53,
  createDocumentFrameEffect54,
  createDocumentFrameEffect55,
  createDocumentFrameEffect56,
  createDocumentFrameEffect6,
  createDocumentFrameEffect61,
  createDocumentFrameEffect62,
  createDocumentFrameEffect63,
  createDocumentFrameEffect64,
  createDocumentFrameEffect65,
  createDocumentFrameEffect8,
  createDocumentFrameEffect82,
  createDocumentFrameEffect83,
  createDocumentFrameEffect87,
  createDocumentFrameEffect88,
  createDocumentFrameEffect91,
  createDocumentFrameEffect94,
  createDocumentFrameEffect95,
  createDocumentFrameEffect96,
  createDocumentFrameEffect98,
  createDocumentFrameFileThreads7,
  createDocumentFrameFlatMap2117,
  createDocumentFrameFlatMap22,
  createDocumentFrameFocus24,
  createDocumentFrameFocus246,
  createDocumentFrameFsEntryId2109,
  createDocumentFrameFsEntryId3110,
  createDocumentFrameFsEntryId4115,
  createDocumentFrameGetAttribute120,
  createDocumentFrameGetState2118,
  createDocumentFrameGetState80,
  createDocumentFrameIndexOf121,
  createDocumentFrameIsDetachedResolvedComment271,
  createDocumentFrameIsWholeDocumentComment273,
  createDocumentFrameJsxs2100,
  createDocumentFrameJsxs3101,
  createDocumentFrameJsxs4111,
  createDocumentFrameJsxs5112,
  createDocumentFrameJsxs7113,
  createDocumentFrameJsxs8116,
  createDocumentFrameJsxs9123,
  createDocumentFrameLookup114,
  createDocumentFrameMapDocumentSelectionTops286,
  createDocumentFrameMappedItems97,
  createDocumentFrameMemoized412,
  createDocumentFrameMemoized519,
  createDocumentFrameNodeName29,
  createDocumentFrameObserve260,
  createDocumentFrameObserve385,
  createDocumentFrameObserve58,
  createDocumentFrameOnChange2,
  createDocumentFrameOnClose122,
  createDocumentFrameOnClose126,
  createDocumentFrameOnEdit28,
  createDocumentFrameOnExpand2119,
  createDocumentFrameOnExpand25,
  createDocumentFrameOnFocus39,
  createDocumentFrameOnKeyDown108,
  createDocumentFrameOnNavigate34,
  createDocumentFrameOnOpenChange107,
  createDocumentFrameOnPost92,
  createDocumentFrameOnReact29,
  createDocumentFrameOnReply27,
  createDocumentFrameOnSelect89,
  createDocumentFrameOnUnreactRoot30,
  createDocumentFramePredict235,
  createDocumentFramePredict33,
  createDocumentFrameQuerySelectorAll249,
  createDocumentFrameQuerySelectorAll350,
  createDocumentFrameQuerySelectorAll45,
  createDocumentFrameReadId13,
  createDocumentFrameReadId377,
  createDocumentFrameRecord274,
  createDocumentFrameRecord31,
  createDocumentFrameRender124,
  createDocumentFrameRender127,
  createDocumentFrameRender128,
  createDocumentFrameRender129,
  createDocumentFrameRender130,
  createDocumentFrameRender131,
  createDocumentFrameScrollTo16,
  createDocumentFrameScrollTo217,
  createDocumentFrameSetDocumentFrameSet2State266,
  createDocumentFrameSetDocumentFrameState43,
  createDocumentFrameSetDraftY293,
  createDocumentFrameSetDraftY90,
  createDocumentFrameShouldClose125,
  createDocumentFrameSlots84,
  createDocumentFrameSuggestions4,
  createDocumentFrameTitle99,
  createDocumentFrameToSorted104,
  createDocumentFrameUpdateCeiling81,
  createDocumentFrameUpdateElement376,
  createDocumentFrameUpdateElement479,
  createDocumentFrameUpdateelementRef22_current68,
  createDocumentFrameUpdateelementRef23_current78,
  createDocumentFrameUpdatelookupRef_current23,
} from "./closure-factories";
import {
  Collapsible,
  CommentQueuedError,
  CopyLinkFallbackUrl,
  DataModelSchemasAddAComment,
  DataModelSchemasPending,
  DataModelSchemasState22,
  EditorHostState33,
  EditorSelectionAndTablesByFile,
  EditorSelectionAndTablesByFile2,
  Menu,
  PaneResizeHandle,
  PlatformAnnouncementsCommentPosted,
  REACTION_NOT_REMOVED_WORDS,
  Surface,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  api,
  clearObservabilityTelemetryDelete,
  collectEditorHostJoin2,
  collectPlatformKeyboardAndSaveStatusMods,
  commentSummonHost,
  filterCommentsStoreTargetWords,
  filterCorrectionReady,
  focusMoveLosesEdit,
  foldOwnsPage,
  heldThreads,
  isBuildConversation,
  isDataModelSchemasHeading,
  isDataOperationControlRoot,
  isDatumPinThread,
  isPlatformKeyboardAndSaveStatusKeyCode,
  isRunProgress,
  isSelbarDraft,
  listFilterSaid,
  listTitleCount,
  mintedThreadId,
  otherEditorDirty,
  quietCarrierThreads,
  quoteWords,
  renderMenuItems,
  resolveCommentsEditorAgent,
  resolveCommentsEditorReactionOnly,
  resolveCommentsEditorStore4,
  resolveCommentsEditorToClaude,
  resolveCommentsEditorUser,
  resolveCommentsStoreComponent,
  resolveCommentsStoreStored,
  resolveDataModelSchemasCardTop2,
  resolveDataModelSchemasChecked2,
  resolveDataModelSchemasComment,
  resolveDataModelSchemasDocScrollMax,
  resolveDataModelSchemasHasOwn3,
  resolveDataModelSchemasIosApp,
  resolveDataModelSchemasRailTop,
  resolveDataModelSchemasReduce,
  resolveDataModelSchemasSent,
  resolveDataModelSchemasTarget,
  resolveDataModelSchemasValue11,
  resolveDataModelSchemasValue28,
  resolveDataModelSchemasValue30,
  resolveEditorAnchorsAndMentionsValue8,
  resolveEditorHostTop,
  resolveEditorSelectionAndTablesFallback,
  resolveEditorSelectionAndTablesStaged,
  resolveEditorSelectionAndTablesSummon,
  resolveEditorSelectionAndTablesValue5,
  resolveObservabilityTelemetryValue6,
  resolvePlatformAnnouncementsValue,
  resolvePlatformAnnouncementsValue2,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformKeyboardAndSaveStatusFind,
  resolveUiDesignSystemValue2,
  resolveUiTooltipsAndControlsValue3,
  toast,
  unconfirmedCreateInDoc,
  updateEditorSelectionAndTablesNodeId,
  updatePlatformAnnouncementsTimers,
  useAllThreadsJoined,
  useCommentStore,
  useDataOperationControlRawStart,
  useOpenThreadCount,
  usePlatformFeatureFlagsUseSyncExternalStore,
  useThreads,
  useThreadsJoined,
  widgetAnchorOfThread,
} from "./dependencies";
import {
  BOTTOM_SHEET_SCRIM_CLASS,
  PHONE_EDIT_BUTTON_CLASS,
  PHONE_TOUCH_TARGET_CLASS,
  React,
  jsxRuntime,
} from "./bootstrap";
import {
  ReactDom,
} from "./connection-and-errors/connector-permission-dialog";
import {
  BottomSheet,
  PhoneConfirmationDialog,
  isDocumentFocusedElsewhere,
} from "./phone-overlays/export-progress-dialog";
import {
  IconButton,
} from "./run-review";
import {
  takeCommentListReturn,
} from "./ask-cards/document-posture-badge";
import {
  COMMENT_DRAFT_BLOCKING_MESSAGE,
  canDisplayCommentUnanchored,
  commentAttachmentState,
  getSessionRouteModule,
  isDetachedResolvedComment,
  isElementAttachedComment,
  isWholeDocumentComment,
  useCommentNotificationsMode,
} from "./comment-notifications/create-comment-notice-coordinator";
import {
  resolveCommentSessionSource,
} from "./comment-session/clear-comment-session-thread-id";
import {
  loadCommentAnchorsList,
  resolveCommentAnchorsOpenedDirectly,
} from "./comment-anchors/use-comment-anchors-sheets-component";
import {
  CommentAnchors_Resolved,
  CommentAnchors_SentToClaude,
  useCommentAnchorsFlatMap,
} from "./comment-anchors/create-comment-mention-search";
import {
  ReactionChip,
} from "./comment-anchors/see-more-pill";
import {
  WhoReacted,
} from "./comment-composer";
import {
  CommentComponents_CommentCollapsed,
  CommentComponents_FirstPressEscapeToGoBackToTheText,
  CommentComponents_Message2,
  CommentComponents_Message3,
  CommentReplyComposer,
  resolveCommentComponentsCount,
} from "./comment-components/comment-reply-composer";
import {
  UseCommentComponentsRouteComponent,
} from "./comment-components/comment-reply-sheet";
import {
  CiteOutcomeChip,
} from "./comment-components/shared";
import {
  NodeThreadsCard,
  resolveCommentComponentsIsConnected,
  resolveCommentComponentsKey,
  resolveCommentComponentsValue3,
} from "./comment-components/state";
import {
  isDocumentSelectionSlots,
  isDocumentSelectionValue,
  mapDocumentSelectionTops,
  resolveDocumentSelectionIds,
  resolveDocumentSelectionTop,
  resolveDocumentSelectionUnknownPad,
  resolveDocumentSelectionValue,
} from "./document-selection/map-document-selection-tops";
import {
  isWidgetBridgeLastDocPos,
  resolveWidgetBridgeFlatMap,
  resolveWidgetBridgeLabel,
  resolveWidgetBridgeRailH,
  resolveWidgetBridgeRailH2,
  resolveWidgetBridgeSlack,
  resolveWidgetBridgeValue,
  useWidgetBridgeCurrent,
  widgetBridgeLimit1000,
  widgetBridgeLimit10000,
  widgetBridgeLimit10002,
} from "./widget-bridge/widget-sample-card";
import {
  DocumentRuntimeSearch,
  DocumentRuntimeState4,
  DocumentRuntimeState5,
  DocumentRuntimeState6,
  DocumentRuntime_Styles6,
  documentRuntimeLimit284,
  documentRuntimeLimit48,
  documentRuntimeLimit75,
  resolveDocumentRuntimeValue9,
} from "./document-runtime/widget-provenance-gutter";
import {
  resolveDocumentRuntimeValue10,
} from "./document-runtime/use-document-runtime-room";
import {
  LdocCommentDraftClamped,
  UseDocumentSourcePromptDraftComponent,
  resolveDocumentSourcePromptComponent,
} from "./room-document-page/use-document-source-prompt-draft-component";
import {
  DocumentSourcePromptState,
  DocumentSourcePromptState2,
  DocumentSourcePromptState3,
  assignDocumentSourcePromptState,
  assignDocumentSourcePromptState2,
  assignDocumentSourcePromptState3,
} from "./source-prompt-cache";
import {
  clearDocumentSourcePromptPressedAt,
  documentSourcePromptLimit250,
} from "./room-document-page/state";
import {
  DocumentSourcePrompt_WholeDocument,
  documentSourcePromptSet,
  isDocumentSourcePromptIsCollapsed,
  resolveDocumentSourcePromptCells,
  resolveDocumentSourcePromptTarget3,
  resolveDocumentSourcePromptValue2,
} from "./room-document-page/document-comments-headless";
import {
  DocumentFrame_Comments,
  DocumentFrame_Message,
  DocumentFrame_Message2,
  documentFrameLimit16,
  documentFrameSet2,
  isDocumentFrameCurrentTarget,
  isDocumentFrameMatches,
  isDocumentFrameTarget,
  resolveDocumentFrameNodeId,
  resolveDocumentFrameTarget,
  resolveDocumentFrameValue,
  useDocumentFrameKey,
} from "./document-frame-use-document-frame-key";

var documentSourcePromptLimit0: Dynamic;

var DocumentSourcePrompt_Other: string;

var DocumentSourcePromptState4: Dynamic;

var documentSourcePromptLimit02: number;

function DocumentFrame(
  {
    container: container,
    fsEntryId: fsEntryId,
    path: path,
    mode: mode,
    peek = false,
    iconLane = true,
    phone = false,
    composeFloat = false,
    railSeated = false,
    listPopover = false,
    forceList = false,
    readOnly = false,
    commentOnly = false,
    resolveOwnOnly: resolveOwnOnly,
    covered = false,
    seeded: seeded,
    initialFilter = `open`,
    room: room,
    widgetNodes: widgetNodes,
    nodeName: nodeName,
    widgetBlockOf: widgetBlockOf,
    blockKindOf: blockKindOf,
    askOffer: askOffer,
    onOpenNodeLog: onOpenNodeLog,
    onRevealNode: onRevealNode,
    onOverhang: onOverhang,
    onCardSpans: onCardSpans,
    onScrollDoc: onScrollDoc,
    sheetScrollRef: sheetScrollRef,
    onComposeExit: onComposeExit,
    handFocusOut: handFocusOut,
    onStageForClaude: onStageForClaude,
    railSync: railSync,
    railWheelMountedRef: railWheelMountedRef,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  // BaoCut: accessors preserve each render closure and delayed callback reads.
  const documentFrameContext = {
  get key() { return key; },
  get elementRef() { return elementRef; },
  get setDocumentFrameState2() { return setDocumentFrameState2; },
  get setDocumentFrameState3() { return setDocumentFrameState3; },
  get React() { return React; },
  get DataModelSchemasState22() { return DataModelSchemasState22; },
  get draft() { return draft; },
  get enabled() { return enabled; },
  get resolveCommentAnchorsOpenedDirectly() { return resolveCommentAnchorsOpenedDirectly; },
  get blockKindOf() { return blockKindOf; },
  get commentOnly() { return commentOnly; },
  get resolveDocumentRuntimeValue9() { return resolveDocumentRuntimeValue9; },
  get askOffer() { return askOffer; },
  get loadCommentAnchorsList() { return loadCommentAnchorsList; },
  get enabledRef2() { return enabledRef2; },
  get enabledRef() { return enabledRef; },
  get filterCorrectionReady() { return filterCorrectionReady; },
  get seeded() { return seeded; },
  get foldOwnsThisPage() { return foldOwnsThisPage; },
  get foldReady() { return foldReady; },
  get documentFrameResult17() { return documentFrameResult17; },
  get filter() { return filter; },
  get setFilter() { return setFilter; },
  get documentFrameResult20() { return documentFrameResult20; },
  get api() { return api; },
  get container() { return container; },
  get fsEntryId() { return fsEntryId; },
  get widgetNodes2() { return widgetNodes2; },
  get setFilteredFlat() { return setFilteredFlat; },
  get items() { return items; },
  get documentFrameResult16() { return documentFrameResult16; },
  get mode() { return mode; },
  get documentFrameResult22() { return documentFrameResult22; },
  get memoized() { return memoized; },
  get DocumentRuntimeState5() { return DocumentRuntimeState5; },
  get fileThreads() { return fileThreads; },
  get callback() { return callback; },
  get isRunProgress() { return isRunProgress; },
  get isBuildConversation() { return isBuildConversation; },
  get callback2() { return callback2; },
  get nodeName() { return nodeName; },
  get documentFrameResult24() { return documentFrameResult24; },
  get filterCommentsStoreTargetWords() { return filterCommentsStoreTargetWords; },
  get resolveWidgetBridgeLabel() { return resolveWidgetBridgeLabel; },
  get resolveCommentsStoreStored() { return resolveCommentsStoreStored; },
  get resolveCommentsEditorReactionOnly() { return resolveCommentsEditorReactionOnly; },
  get callback4() { return callback4; },
  get callback5() { return callback5; },
  get nodeName2() { return nodeName2; },
  get isDatumPinThread() { return isDatumPinThread; },
  get widgetAnchorOfThread() { return widgetAnchorOfThread; },
  get documentFrameResult5() { return documentFrameResult5; },
  get documentFrameResult9() { return documentFrameResult9; },
  get memoized4() { return memoized4; },
  get documentFrameResult18() { return documentFrameResult18; },
  get useCommentStore() { return useCommentStore; },
  get documentFrameResult8() { return documentFrameResult8; },
  get widgetBridgeLimit10002() { return widgetBridgeLimit10002; },
  get focusMoveLosesEdit() { return focusMoveLosesEdit; },
  get isDocumentSourcePromptIsCollapsed() { return isDocumentSourcePromptIsCollapsed; },
  get readId() { return readId; },
  get onRevealNode() { return onRevealNode; },
  get scrollTo() { return scrollTo; },
  get memoized2() { return memoized2; },
  get documentFrameResult15() { return documentFrameResult15; },
  get documentFrameResult13() { return documentFrameResult13; },
  get documentFrameHandler4() { return documentFrameHandler4; },
  get storeState2() { return storeState2; },
  get toast() { return toast; },
  get COMMENT_DRAFT_BLOCKING_MESSAGE() { return COMMENT_DRAFT_BLOCKING_MESSAGE; },
  get focus() { return focus; },
  get recordRef() { return recordRef; },
  get railSync() { return railSync; },
  get resolveDataModelSchemasDocScrollMax() { return resolveDataModelSchemasDocScrollMax; },
  get lookupRef() { return lookupRef; },
  get readOnly() { return readOnly; },
  get documentRuntimeLimit48() { return documentRuntimeLimit48; },
  get documentRuntimeLimit75() { return documentRuntimeLimit75; },
  get onScrollDocRef() { return onScrollDocRef; },
  get elementRef2() { return elementRef2; },
  get storeState() { return storeState; },
  get widgetBlockOf() { return widgetBlockOf; },
  get EditorSelectionAndTablesByFile2() { return EditorSelectionAndTablesByFile2; },
  get mintedThreadId() { return mintedThreadId; },
  get canDisplayCommentUnanchored() { return canDisplayCommentUnanchored; },
  get resolveCommentsEditorToClaude() { return resolveCommentsEditorToClaude; },
  get storeState5() { return storeState5; },
  get callback7() { return callback7; },
  get CommentQueuedError() { return CommentQueuedError; },
  get storeState6() { return storeState6; },
  get storeState10() { return storeState10; },
  get REACTION_NOT_REMOVED_WORDS() { return REACTION_NOT_REMOVED_WORDS; },
  get resolveCommentsEditorAgent() { return resolveCommentsEditorAgent; },
  get room() { return room; },
  get commentOnly2() { return commentOnly2; },
  get onExpand() { return onExpand; },
  get onReply() { return onReply; },
  get onEdit() { return onEdit; },
  get onDelete() { return onDelete; },
  get onReact() { return onReact; },
  get onCopyLink() { return onCopyLink; },
  get onResolve() { return onResolve; },
  get onReopen() { return onReopen; },
  get updatePlatformAnnouncementsTimers() { return updatePlatformAnnouncementsTimers; },
  get railSyncRef() { return railSyncRef; },
  get resolveDataModelSchemasRailTop() { return resolveDataModelSchemasRailTop; },
  get documentFrameLimit16() { return documentFrameLimit16; },
  get enabledRef3() { return enabledRef3; },
  get predict() { return predict; },
  get enabledRef4() { return enabledRef4; },
  get enabledRef5() { return enabledRef5; },
  get setStopId() { return setStopId; },
  get predict2() { return predict2; },
  get flatMap() { return flatMap; },
  get elementRef3() { return elementRef3; },
  get takeCommentListReturn() { return takeCommentListReturn; },
  get documentFrameHandler9() { return documentFrameHandler9; },
  get isDocumentFrameMatches() { return isDocumentFrameMatches; },
  get iconLaneRef() { return iconLaneRef; },
  get elementRef4() { return elementRef4; },
  get elementRef5() { return elementRef5; },
  get handFocusOutRef() { return handFocusOutRef; },
  get resolvePlatformAnnouncementsValue() { return resolvePlatformAnnouncementsValue; },
  get listFilterSaid() { return listFilterSaid; },
  get elementRef10() { return elementRef10; },
  get elementRef11() { return elementRef11; },
  get querySelectorAll() { return querySelectorAll; },
  get elementRef6() { return elementRef6; },
  get focusRef() { return focusRef; },
  get documentFrameResult25() { return documentFrameResult25; },
  get elementRef8() { return elementRef8; },
  get setDocumentFrameState5() { return setDocumentFrameState5; },
  get documentFrameState4() { return documentFrameState4; },
  get elementRef7() { return elementRef7; },
  get resolveDataModelSchemasCardTop2() { return resolveDataModelSchemasCardTop2; },
  get documentFrameResult26() { return documentFrameResult26; },
  get DocumentRuntime_Styles6() { return DocumentRuntime_Styles6; },
  get memoizedRef() { return memoizedRef; },
  get querySelectorAll2() { return querySelectorAll2; },
  get CommentComponents_Message3() { return CommentComponents_Message3; },
  get isPlatformKeyboardAndSaveStatusKeyCode() { return isPlatformKeyboardAndSaveStatusKeyCode; },
  get CommentComponents_FirstPressEscapeToGoBackToTheText() { return CommentComponents_FirstPressEscapeToGoBackToTheText; },
  get documentSourcePromptLimit02() { return documentSourcePromptLimit02; }, set documentSourcePromptLimit02(__nextDocumentClosureValue: Dynamic) { documentSourcePromptLimit02 = __nextDocumentClosureValue; },
  get elementRef12() { return elementRef12; },
  get elementRef9() { return elementRef9; },
  get enabledRef6() { return enabledRef6; },
  get isDocumentFocusedElsewhere() { return isDocumentFocusedElsewhere; },
  get querySelectorAll3() { return querySelectorAll3; },
  get iconLane() { return iconLane; },
  get CommentComponents_CommentCollapsed() { return CommentComponents_CommentCollapsed; },
  get elementRef14() { return elementRef14; },
  get railWheelMountedRef() { return railWheelMountedRef; },
  get resolveDataModelSchemasTarget() { return resolveDataModelSchemasTarget; },
  get addEventListener2() { return addEventListener2; },
  get elementRef15() { return elementRef15; },
  get setRailH() { return setRailH; },
  get elementRef17() { return elementRef17; },
  get setDocumentFrameState6() { return setDocumentFrameState6; },
  get elementRef16() { return elementRef16; },
  get ceil() { return ceil; },
  get documentFrameState6() { return documentFrameState6; },
  get setDocumentFrameState7() { return setDocumentFrameState7; },
  get listPopover() { return listPopover; },
  get elementRef19() { return elementRef19; },
  get isDocumentFrameTarget() { return isDocumentFrameTarget; },
  get peek() { return peek; },
  get elementRef13() { return elementRef13; },
  get elementRef20() { return elementRef20; },
  get documentSourcePromptLimit250() { return documentSourcePromptLimit250; },
  get composeFloat() { return composeFloat; },
  get DocumentSourcePromptState4() { return DocumentSourcePromptState4; }, set DocumentSourcePromptState4(__nextDocumentClosureValue: Dynamic) { DocumentSourcePromptState4 = __nextDocumentClosureValue; },
  get setHeights() { return setHeights; },
  get setDocumentFrameSet2State() { return setDocumentFrameSet2State; },
  get recordRef2() { return recordRef2; },
  get resolveDocumentFrameValue() { return resolveDocumentFrameValue; },
  get setDocumentFrameSet2State2() { return setDocumentFrameSet2State2; },
  get elementRef22() { return elementRef22; },
  get commentAttachmentState() { return commentAttachmentState; },
  get documentFrameResult10() { return documentFrameResult10; },
  get documentFrameHandler11() { return documentFrameHandler11; },
  get isDetachedResolvedComment() { return isDetachedResolvedComment; },
  get documentSourcePromptSet2() { return documentSourcePromptSet2; },
  get commentAttachmentState2() { return commentAttachmentState2; },
  get isWholeDocumentComment() { return isWholeDocumentComment; },
  get documentSelectionValue() { return documentSelectionValue; },
  get rail() { return rail; },
  get isDataModelSchemasHeading() { return isDataModelSchemasHeading; },
  get resolveDataModelSchemasHasOwn3() { return resolveDataModelSchemasHasOwn3; },
  get documentFrameResult11() { return documentFrameResult11; },
  get isElementAttachedComment() { return isElementAttachedComment; },
  get resolveDocumentSelectionIds() { return resolveDocumentSelectionIds; },
  get isWholeDocumentComment2() { return isWholeDocumentComment2; },
  get isDetachedResolvedComment2() { return isDetachedResolvedComment2; },
  get readId2() { return readId2; },
  get elementRef24() { return elementRef24; },
  get memoized3() { return memoized3; },
  get readId3() { return readId3; },
  get fromScrollY() { return fromScrollY; },
  get resolveWidgetBridgeSlack() { return resolveWidgetBridgeSlack; },
  get elementRef25() { return elementRef25; },
  get heldThreads() { return heldThreads; },
  get updateElement4() { return updateElement4; },
  get elementRef23() { return elementRef23; },
  get widgetBridgeLimit1000() { return widgetBridgeLimit1000; },
  get sheetScrollRef() { return sheetScrollRef; },
  get peekRef() { return peekRef; },
  get getState() { return getState; },
  get widgetBridgeLimit10000() { return widgetBridgeLimit10000; },
  get readIdRef() { return readIdRef; },
  get isWidgetBridgeLastDocPos() { return isWidgetBridgeLastDocPos; },
  get updateCeiling() { return updateCeiling; },
  get updateElement3() { return updateElement3; },
  get documentFrameResult29() { return documentFrameResult29; },
  get docPos() { return docPos; },
  get fromScrollYRef() { return fromScrollYRef; },
  get rail2() { return rail2; },
  get documentFrameHandler10() { return documentFrameHandler10; },
  get elementRef26() { return elementRef26; },
  get setBodyH() { return setBodyH; },
  get mapDocumentSelectionTops() { return mapDocumentSelectionTops; },
  get slots() { return slots; },
  get heights() { return heights; },
  get pivotKey() { return pivotKey; },
  get band() { return band; },
  get onOverhang() { return onOverhang; },
  get max() { return max; },
  get ceil2() { return ceil2; },
  get labelRef() { return labelRef; },
  get handFocusOut() { return handFocusOut; },
  get setDraftY() { return setDraftY; },
  get ReactDom() { return ReactDom; },
  get storeState4() { return storeState4; },
  get resolveCommentComponentsIsConnected() { return resolveCommentComponentsIsConnected; },
  get resolveCommentComponentsKey() { return resolveCommentComponentsKey; },
  get documentFrameState() { return documentFrameState; },
  get setDocumentFrameState() { return setDocumentFrameState; },
  get onCancel() { return onCancel; },
  get BOTTOM_SHEET_SCRIM_CLASS() { return BOTTOM_SHEET_SCRIM_CLASS; },
  get setDraftY2() { return setDraftY2; },
  get elementRef27() { return elementRef27; },
  get DocumentSourcePromptState() { return DocumentSourcePromptState; }, set DocumentSourcePromptState(__nextDocumentClosureValue: Dynamic) { assignDocumentSourcePromptState(__nextDocumentClosureValue); },
  get documentSourcePromptLimit0() { return documentSourcePromptLimit0; }, set documentSourcePromptLimit0(__nextDocumentClosureValue: Dynamic) { documentSourcePromptLimit0 = __nextDocumentClosureValue; },
  get DocumentSourcePrompt_Other() { return DocumentSourcePrompt_Other; }, set DocumentSourcePrompt_Other(__nextDocumentClosureValue: Dynamic) { DocumentSourcePrompt_Other = __nextDocumentClosureValue; },
  get isSelbarDraft() { return isSelbarDraft; },
  get otherEditorDirty() { return otherEditorDirty; },
  get useWidgetBridgeCurrent3() { return useWidgetBridgeCurrent3; },
  get resolveEditorSelectionAndTablesSummon() { return resolveEditorSelectionAndTablesSummon; },
  get matchesOnStageForClaude() { return matchesOnStageForClaude; },
  get resolveEditorSelectionAndTablesValue5() { return resolveEditorSelectionAndTablesValue5; },
  get onStageForClaude() { return onStageForClaude; },
  get resolveCommentsStoreComponent() { return resolveCommentsStoreComponent; },
  get resolveDataModelSchemasValue28() { return resolveDataModelSchemasValue28; },
  get resolveDataModelSchemasSent() { return resolveDataModelSchemasSent; },
  get DataModelSchemasPending() { return DataModelSchemasPending; },
  get documentFrameResult3() { return documentFrameResult3; },
  get quietCarrierThreads() { return quietCarrierThreads; },
  get CommentAnchors_SentToClaude() { return CommentAnchors_SentToClaude; },
  get PlatformAnnouncementsCommentPosted() { return PlatformAnnouncementsCommentPosted; },
  get resolveEditorSelectionAndTablesStaged() { return resolveEditorSelectionAndTablesStaged; },
  get resolveCommentSessionSource() { return resolveCommentSessionSource; },
  get setEnabledState() { return setEnabledState; },
  get getSessionRouteModule() { return getSessionRouteModule; },
  get path() { return path; },
  get resolveEditorAnchorsAndMentionsValue8() { return resolveEditorAnchorsAndMentionsValue8; },
  get DocumentSourcePromptState2() { return DocumentSourcePromptState2; }, set DocumentSourcePromptState2(__nextDocumentClosureValue: Dynamic) { assignDocumentSourcePromptState2(__nextDocumentClosureValue); },
  get fsEntryIdRef() { return fsEntryIdRef; },
  get resolveDocumentFrameNodeId() { return resolveDocumentFrameNodeId; },
  get DocumentSourcePromptState3() { return DocumentSourcePromptState3; }, set DocumentSourcePromptState3(__nextDocumentClosureValue: Dynamic) { assignDocumentSourcePromptState3(__nextDocumentClosureValue); },
  get clearDocumentSourcePromptPressedAt() { return clearDocumentSourcePromptPressedAt; },
  get setUseReducer() { return setUseReducer; },
  get useReducer() { return useReducer; },
  get countRef() { return countRef; },
  get documentFrameResult33() { return documentFrameResult33; },
  get jsxRuntime() { return jsxRuntime; },
  get n5() { return n5; },
  get request() { return request; },
  get Menu() { return Menu; },

  get documentFrameState8() { return documentFrameState8; },
  get Tooltip() { return Tooltip; },
  get IconButton() { return IconButton; },
  get elementRef28() { return elementRef28; },
  get returnAddsLine() { return returnAddsLine; },
  get PHONE_TOUCH_TARGET_CLASS() { return PHONE_TOUCH_TARGET_CLASS; },
  get UiOverlaysAndIconsCustomIcon() { return UiOverlaysAndIconsCustomIcon; },
  get elementRef29() { return elementRef29; },
  get renderMenuItems() { return renderMenuItems; },
  get mappedItems() { return mappedItems; },
  get documentFrameState9() { return documentFrameState9; },
  get elementRef30() { return elementRef30; },
  get elementRef31() { return elementRef31; },
  get collectPlatformKeyboardAndSaveStatusMods() { return collectPlatformKeyboardAndSaveStatusMods; },
  get resolvePlatformKeyboardAndSaveStatusFind() { return resolvePlatformKeyboardAndSaveStatusFind; },
  get onSelect() { return onSelect; },
  get ariaLabelledby() { return ariaLabelledby; },
  get title() { return title; },
  get jsxs2() { return jsxs2; },
  get forceList() { return forceList; },
  get elementRef33() { return elementRef33; },
  get documentFrameResult34() { return documentFrameResult34; },
  get documentFrameHandler13() { return documentFrameHandler13; },
  get documentFrameHandler() { return documentFrameHandler; },
  get documentFrameHandler2() { return documentFrameHandler2; },
  get documentFrameHandler14() { return documentFrameHandler14; },
  get toSorted() { return toSorted; },
  get documentFrameHandler15() { return documentFrameHandler15; },
  get documentFrameHandler16() { return documentFrameHandler16; },
  get stopId() { return stopId; },
  get fsEntryId2() { return fsEntryId2; },
  get open() { return open; },
  get UseDocumentSourcePromptDraftComponent() { return UseDocumentSourcePromptDraftComponent; },
  get LdocCommentDraftClamped() { return LdocCommentDraftClamped; },
  get CommentReplyComposer() { return CommentReplyComposer; },

  get placeholder() { return placeholder; },
  get ariaLabel() { return ariaLabel; },
  get claudeRoute() { return claudeRoute; },
  get suggestions() { return suggestions; },
  get sendHeld() { return sendHeld; },
  get onPost() { return onPost; },
  get controlId() { return controlId; },
  get Collapsible() { return Collapsible; },
  get onOpenChange() { return onOpenChange; },
  get onKeyDown() { return onKeyDown; },
  get CommentAnchors_Resolved() { return CommentAnchors_Resolved; },
  get onOpen() { return onOpen; },
  get documentFrameHandler7() { return documentFrameHandler7; },
  get documentFrameHandler8() { return documentFrameHandler8; },
  get NodeThreadsCard() { return NodeThreadsCard; },
  get memoized5() { return memoized5; },
  get documentFrameHandler3() { return documentFrameHandler3; },
  get onNavigate() { return onNavigate; },
  get fsEntryId3() { return fsEntryId3; },
  get commentAttachmentState3() { return commentAttachmentState3; },
  get storeState3() { return storeState3; },
  get documentFrameHandler6() { return documentFrameHandler6; },
  get isDocumentFrameCurrentTarget() { return isDocumentFrameCurrentTarget; },
  get elementRef32() { return elementRef32; },
  get resolveDocumentFrameTarget() { return resolveDocumentFrameTarget; },
  get documentFrameHandler5() { return documentFrameHandler5; },
  get ReactionChip() { return ReactionChip; },
  get callback6() { return callback6; },
  get resolveDocumentSourcePromptValue2() { return resolveDocumentSourcePromptValue2; },
  get documentFrameResult6() { return documentFrameResult6; },
  get documentFrameResult7() { return documentFrameResult7; },
  get DocumentSourcePrompt_WholeDocument() { return DocumentSourcePrompt_WholeDocument; },
  get quoteWords() { return quoteWords; },
  get onUnreactRoot() { return onUnreactRoot; },
  get hintId2() { return hintId2; },
  get CiteOutcomeChip() { return CiteOutcomeChip; },
  get record() { return record; },
  get resolveDocumentSourcePromptTarget3() { return resolveDocumentSourcePromptTarget3; },
  get hintId() { return hintId; },
  get setDocumentFrameState4() { return setDocumentFrameState4; },
  get jsxs6() { return jsxs6; },
  get matchesCds() { return matchesCds; },
  get elementRef21() { return elementRef21; },
  get Surface() { return Surface; },
  get jsxs5() { return jsxs5; },
  get icons() { return icons; },
  get mapDocumentSelectionTops2() { return mapDocumentSelectionTops2; },
  get lookup() { return lookup; },
  get rectless() { return rectless; },
  get lookup2() { return lookup2; },
  get resolveDataModelSchemasValue11() { return resolveDataModelSchemasValue11; },
  get tops() { return tops; },
  get bodyH() { return bodyH; },
  get observe3() { return observe3; },
  get height() { return height; },
  get setDocumentFrameState8() { return setDocumentFrameState8; },
  get callback9() { return callback9; },
  get isDocumentSelectionValue() { return isDocumentSelectionValue; },
  get documentFrameResult4() { return documentFrameResult4; },
  get jsxs7() { return jsxs7; },
  get resolveDataModelSchemasReduce() { return resolveDataModelSchemasReduce; },
  get useDocumentFrameKey2() { return useDocumentFrameKey2; },
  get useDocumentFrameKey3() { return useDocumentFrameKey3; },
  get resolveDocumentRuntimeValue10() { return resolveDocumentRuntimeValue10; },
  get resolveCommentComponentsCount() { return resolveCommentComponentsCount; },
  get resolveDocumentSourcePromptCells() { return resolveDocumentSourcePromptCells; },
  get fsEntryId4() { return fsEntryId4; },
  get documentFrameHandler12() { return documentFrameHandler12; },
  get compact() { return compact; },
  get elementRef18() { return elementRef18; },
  get covered() { return covered; },
  get documentRuntimeLimit284() { return documentRuntimeLimit284; },
  get EditorHostState33() { return EditorHostState33; },
  get addEventListener3() { return addEventListener3; },
  get DocumentFrame_Comments() { return DocumentFrame_Comments; },
  get jsxs() { return jsxs; },
  get DocumentRuntimeSearch() { return DocumentRuntimeSearch; },
  get railSeated() { return railSeated; },
  get jsxs8() { return jsxs8; },
  get BottomSheet() { return BottomSheet; },
  get setId() { return setId; },
  get PHONE_EDIT_BUTTON_CLASS() { return PHONE_EDIT_BUTTON_CLASS; },
  get updateElement2() { return updateElement2; },
  get jsxs4() { return jsxs4; },
  get PhoneConfirmationDialog() { return PhoneConfirmationDialog; },
  get id2() { return id2; },
  get jsxs3() { return jsxs3; },
  get updateElement() { return updateElement; },
  get documentFrameResult28() { return documentFrameResult28; },
  get PaneResizeHandle() { return PaneResizeHandle; },
};

  let commentOnly2: Dynamic = resolveOwnOnly ?? commentOnly;
  let [filter, setFilter]: Dynamic = (0, React.useState)(initialFilter);
  let [documentFrameState, setDocumentFrameState]: Dynamic = (0,
  React.useState)(null);
  let fsEntryIdRef: Dynamic = (0, React.useRef)(fsEntryId);
  fsEntryIdRef.current = fsEntryId;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (fsEntryIdRef.current = fsEntryId),
      (..._extraArguments: unknown[]): undefined =>
        void (fsEntryIdRef.current = null)
    ),
    [],
  );
  let documentFrameResult: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.draftAnchor,
  );
  let draft: Dynamic =
    documentFrameResult?.react === undefined &&
    documentFrameResult?.autopost === undefined
      ? documentFrameResult
      : null;
  let documentFrameResult2: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]) =>
      documentFrame.frameSummon !== null,
  );
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let matchesOnStageForClaude = onStageForClaude !== undefined && !enabledState;
  // BaoCut: 批注框的「发给智能体」勾选，独立页面装了 docsHost.comments 时也提供（下面的 framed 同）。
  let offered: Dynamic = resolveEditorSelectionAndTablesFallback(
    commentSummonHost(),
    documentFrameResult2,
    matchesOnStageForClaude &&
      resolveEditorSelectionAndTablesValue5(draft?.block),
  );
  let documentFrameResult3: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let [documentFrameState2, setDocumentFrameState2]: Dynamic = (0,
  React.useState)(null);
  let [documentFrameState3, setDocumentFrameState3]: Dynamic = (0,
  React.useState)(null);
  let key = draft ? resolveDocumentFrameNodeId(draft) : null;
  let choice: Dynamic =
    key !== null && documentFrameState2?.key === key
      ? documentFrameState2.checked
      : null;
  let elementRef: Dynamic = (0, React.useRef)(null);
  if (key !== null && elementRef.current?.key !== key) {
    elementRef.current = {
      key: key,
      remembered: resolveDataModelSchemasValue30(
        DataModelSchemasState22.getState().value,
      ),
    };
  }
  (0, React.useEffect)(
    createDocumentFrameEffect1(documentFrameContext),
    [key],
  );
  let onChange: Dynamic = createDocumentFrameOnChange2(documentFrameContext);
  let setDocumentFrameState4: Dynamic = (0, React.useCallback)(
    createDocumentFrameSetDocumentFrameState43(documentFrameContext),
    [key],
  );
  let claudeRoute: Dynamic = draft
    ? resolveDataModelSchemasChecked2({
        offered: offered,
        framed: commentSummonHost(),
        ask: draft.ask === true,
        choice: choice,
        remembered: elementRef.current?.remembered ?? null,
        rest: resolveDataModelSchemasIosApp(),
        onChange: onChange,
      })
    : undefined;
  // BaoCut: 直接发给智能体的批注框（claudeRoute 为 always）称「the agent」，不称 Claude（下面的 ariaLabel 同）。
  let placeholder =
    claudeRoute === `always`
      ? `Ask the agent…`
      : resolveDataModelSchemasComment(
          `comment`,
          typeof claudeRoute == `object` && claudeRoute.checked,
        );
  let ariaLabel =
    claudeRoute === `always` ? `Ask the agent` : DataModelSchemasAddAComment;
  let sendHeld: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      unconfirmedCreateInDoc(documentFrame, room?.pid, fsEntryId),
  );
  let enabled = !!draft && claudeRoute === `always`;
  let suggestions: Dynamic = createDocumentFrameSuggestions4(documentFrameContext);
  let documentFrameResult4: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.draftY,
  );
  let documentFrameResult5: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.rects,
  );
  let documentFrameResult6: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.cellsMeta,
  );
  let documentFrameResult7: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.mediaMeta,
  );
  let documentFrameResult8: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.optimisticY,
  );
  let documentFrameResult9: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.renderKey,
  );
  let documentFrameResult10: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.present,
  );
  let documentSourcePromptSet2: Dynamic =
    useCommentStore(
      (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        documentFrame.doorStanding[fsEntryId],
    ) ?? documentSourcePromptSet;
  let documentFrameResult11: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.folded,
  );
  let fromScrollY: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.docScrollY,
  );
  let documentFrameResult12: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.draftFollows,
  );
  let docExtent: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.docExtent,
  );
  let documentFrameResult13: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.focusId,
  );
  let documentFrameResult14: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.peekDrop,
  );
  let documentFrameResult15: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.activeId,
  );
  let documentFrameResult16: Dynamic = useThreads(fsEntryId);
  let widgetNodes2: Dynamic = widgetNodes ?? DocumentRuntimeState4;
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      new (Set as Dynamic)(widgetNodes2),
    [widgetNodes2],
  );
  let items: Dynamic = useThreadsJoined(widgetNodes2);
  let documentFrameResult17: Dynamic = useOpenThreadCount(
    fsEntryId,
    widgetNodes2,
  );
  let documentFrameResult18: Dynamic = EditorSelectionAndTablesByFile2(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.byFile[fsEntryId],
  );
  let callback: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      memoized.has(event.target?.pageId ?? ``),
    [memoized],
  );
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let foldOwnsThisPage: Dynamic = foldOwnsPage(
    usePlatformFeatureFlagsUseSyncExternalStore(`foldCore`),
    room?.pid,
  );
  let foldReady: Dynamic = resolveCommentsEditorStore4(room?.pid);
  (0, React.useEffect)(
    createDocumentFrameEffect5(documentFrameContext),
    [seeded, foldOwnsThisPage, foldReady, documentFrameResult17, filter],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      useCommentStore
        .getState()
        .setShowResolvedMarks(mode === `list` && filter !== `open`);
    },
    [mode, filter],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        useCommentStore.getState().setShowResolvedMarks(false),
    [],
  );
  useCommentNotificationsMode({
    mode: mode,
    filter: filter,
    showAll: (..._extraArguments: unknown[]): undefined => {
      enabledRef.current = true;
      setFilter(`all`);
    },
  });
  let documentFrameResult19: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.mutGen,
  );
  let documentFrameResult20: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.foldConnected,
  );
  let documentFrameResult21: Dynamic = useAllThreadsJoined(
    (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic => [fsEntryId, ...widgetNodes2],
      [fsEntryId, widgetNodes2],
    ),
  );
  let [filteredFlat, setFilteredFlat]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    createDocumentFrameEffect6(documentFrameContext),
    [
      documentFrameResult20,
      filter,
      container,
      fsEntryId,
      widgetNodes2,
      documentFrameResult16,
      items,
      documentFrameResult19,
    ],
  );
  let documentFrameResult22: Dynamic = documentFrameResult20
    ? documentFrameResult21
    : filteredFlat;
  let fileThreads: Dynamic = createDocumentFrameFileThreads7(documentFrameContext);
  useCommentAnchorsFlatMap(fileThreads);
  let documentFrameResult23: Dynamic = EditorSelectionAndTablesByFile(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.byFile[fsEntryId],
  );
  let { widgetThreads: callback2, fileThreads: callback3 }: Dynamic = createDocumentFrameEffect8(documentFrameContext);
  let { groups: memoized2, rest: memoized3 }: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      updateEditorSelectionAndTablesNodeId(
        callback3,
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrameResult23?.has(documentFrame) ?? false,
      ),
    [callback3, documentFrameResult23],
  );
  let nodeName2: Dynamic = createDocumentFrameNodeName29(documentFrameContext);
  let callback4: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]) => {
      let element = widgetAnchorOfThread(event)?.element;
      if (element) return `re: ${element}`;
      let nodeNameEntry: Dynamic = nodeName2.get(event.target?.pageId ?? ``);
      return nodeNameEntry ? `re: ${nodeNameEntry}` : undefined;
    },
    [nodeName2],
  );
  let documentFrameResult24: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.pinWords,
  );
  let callback5: Dynamic = createDocumentFrameCallback510(documentFrameContext);
  let callback6: Dynamic = createDocumentFrameCallback611(documentFrameContext);
  let memoized4: Dynamic = createDocumentFrameMemoized412(documentFrameContext);
  let readId: Dynamic = createDocumentFrameReadId13(documentFrameContext);
  let readId2: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let id3: Dynamic = readId(event);
      return id3 === undefined
        ? (documentFrameResult8[event.id] ??
            documentFrameResult18?.[event.target?.pageId ?? ``]?.top)
        : documentFrameResult5[id3];
    },
    [readId, documentFrameResult5, documentFrameResult8, documentFrameResult18],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect14(documentFrameContext),
    [documentFrameResult18, callback2],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect15(documentFrameContext),
    [callback2, documentFrameResult8],
  );
  let scrollTo: Dynamic = (0, React.useCallback)(
    createDocumentFrameScrollTo16(documentFrameContext),
    [readId, onRevealNode],
  );
  let scrollTo2 = createDocumentFrameScrollTo217(documentFrameContext);
  let documentFrameHandler: Dynamic = createDocumentFrameDocumentFrameHandler18(documentFrameContext);
  let documentFrameHandler2: Dynamic = (
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentFrame.latest?.at ?? documentFrame.threads[0]?.root?.at ?? ``;
  let onOpen: Dynamic = onOpenNodeLog ?? onRevealNode;
  let memoized5: Dynamic = createDocumentFrameMemoized519(documentFrameContext);
  let documentFrameHandler3: Dynamic = createDocumentFrameDocumentFrameHandler320(documentFrameContext);
  let documentFrameHandler4: Dynamic = createDocumentFrameDocumentFrameHandler421(documentFrameContext);
  let {
    setFocus: storeState,
    setActive: storeState2,
    scrollTo: storeState3,
    setCommentMode: storeState4,
    reply: storeState5,
    edit: storeState6,
    remove: storeState7,
    resolve: storeState8,
    reopen: storeState9,
    react: storeState10,
  }: Dynamic = useCommentStore.getState();
  let flatMap = createDocumentFrameFlatMap22(documentFrameContext);
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  lookupRef.current = new (Map as Dynamic)(
    callback2.flatMap(
      createDocumentFrameUpdatelookupRef_current23(documentFrameContext),
    ),
  );
  let callback7: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      lookupRef.current.get(documentFrame) ?? fsEntryId,
    [fsEntryId],
  );
  let recordRef: Dynamic = (0, React.useRef)({
    live: false,
    ys: {},
    tops: {},
    heights: {},
    bodyH: 0,
    fullHeights: {},
  });
  let onScrollDocRef: Dynamic = (0, React.useRef)(onScrollDoc);
  onScrollDocRef.current = onScrollDoc;
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let onComposeExitRef: Dynamic = (0, React.useRef)(onComposeExit);
  onComposeExitRef.current = onComposeExit;
  let handFocusOutRef: Dynamic = (0, React.useRef)(handFocusOut);
  handFocusOutRef.current = handFocusOut;
  let iconLaneRef: Dynamic = (0, React.useRef)(iconLane);
  iconLaneRef.current = iconLane;
  let railSyncRef: Dynamic = (0, React.useRef)(railSync);
  railSyncRef.current = railSync;
  let focus: Dynamic = (0, React.useCallback)(
    createDocumentFrameFocus24(documentFrameContext),
    [],
  );
  let onExpand: Dynamic = (0, React.useCallback)(
    createDocumentFrameOnExpand25(documentFrameContext),
    [storeState, storeState2, readOnly, railSync, focus],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect26(documentFrameContext),
    [documentFrameResult13],
  );
  let onReply: Dynamic = (0, React.useCallback)(
    createDocumentFrameOnReply27(documentFrameContext),
    [storeState5, container, callback7, fileThreads, widgetBlockOf, fsEntryId],
  );
  let onEdit: Dynamic = (0, React.useCallback)(
    createDocumentFrameOnEdit28(documentFrameContext),
    [storeState6, container, callback7, fileThreads, widgetBlockOf, fsEntryId],
  );
  let onDelete: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      storeState7(container, callback7(documentFrame), documentFrame),
    [storeState7, container, callback7],
  );
  let onReact: Dynamic = createDocumentFrameOnReact29(documentFrameContext);
  let onUnreactRoot: Dynamic = (0, React.useCallback)(
    createDocumentFrameOnUnreactRoot30(documentFrameContext),
    [storeState6, storeState10, container, callback7],
  );
  let onCopyLink: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void CopyLinkFallbackUrl(resolveCommentComponentsValue3(documentFrame)),
    [],
  );
  let onResolve: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      storeState8(container, callback7(documentFrame), documentFrame).catch(
        (..._extraArguments: unknown[]): undefined => {},
      ),
    [storeState8, container, callback7],
  );
  let onReopen: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      storeState9(container, callback7(documentFrame), documentFrame).catch(
        (..._extraArguments: unknown[]): undefined => {},
      ),
    [storeState9, container, callback7],
  );
  let record: Dynamic = createDocumentFrameRecord31(documentFrameContext);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let updateElement: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef3.current = documentFrame;
    },
    [],
  );
  let hintId: Dynamic = (0, React.useId)();
  let hintId2: Dynamic = (0, React.useId)();
  let jsxs = (
    <jsxRuntime.Fragment>
      <p id={hintId} hidden={true}>
        {DocumentFrame_Message}
      </p>
      <p id={hintId2} hidden={true}>
        {DocumentFrame_Message2}
      </p>
    </jsxRuntime.Fragment>
  );
  (0, React.useEffect)(createDocumentFrameEffect32(documentFrameContext), []);
  let predict: Dynamic = (0, React.useCallback)(
    createDocumentFramePredict33(documentFrameContext),
    [],
  );
  let onNavigate: Dynamic = createDocumentFrameOnNavigate34(documentFrameContext);
  let enabledRef3: Dynamic = (0, React.useRef)(false);
  let enabledRef4: Dynamic = (0, React.useRef)(false);
  let predict2 = createDocumentFramePredict235(documentFrameContext);
  let documentFrameHandler5: Dynamic =
    createDocumentFrameDocumentFrameHandler536(documentFrameContext);
  let [stopId, setStopId]: Dynamic = (0, React.useState)(null);
  let documentFrameHandler6: Dynamic =
    createDocumentFrameDocumentFrameHandler637(documentFrameContext);
  let documentFrameHandler7: Dynamic =
    createDocumentFrameDocumentFrameHandler738(documentFrameContext);
  let onFocus = createDocumentFrameOnFocus39(documentFrameContext);
  let documentFrameHandler8: Dynamic =
    createDocumentFrameDocumentFrameHandler840(documentFrameContext);
  let enabledRef5: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(createDocumentFrameEffect41(documentFrameContext), []);
  let ariaLabelledby: Dynamic = (0, React.useId)();
  let documentFrameHandler9: Dynamic = createDocumentFrameDocumentFrameHandler942(documentFrameContext);
  (0, React.useLayoutEffect)(
    createDocumentFrameEffect43(documentFrameContext),
    [
      mode,
      useCommentStore(
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrame.commentMode,
      ),
    ],
  );
  let elementRef4: Dynamic = (0, React.useRef)(null);
  let elementRef5: Dynamic = (0, React.useRef)(-1);
  (0, React.useEffect)(createDocumentFrameEffect44(documentFrameContext), []);
  let querySelectorAll: Dynamic = createDocumentFrameQuerySelectorAll45(documentFrameContext);
  let focus2 = createDocumentFrameFocus246(documentFrameContext);
  let focusRef: Dynamic = (0, React.useRef)(focus2);
  focusRef.current = focus2;
  let elementRef6: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(createDocumentFrameEffect47(documentFrameContext));
  (0, React.useLayoutEffect)(
    createDocumentFrameEffect48(documentFrameContext),
    [],
  );
  let querySelectorAll2: Dynamic = createDocumentFrameQuerySelectorAll249(documentFrameContext);
  let querySelectorAll3: Dynamic = createDocumentFrameQuerySelectorAll350(documentFrameContext);
  let elementRef7: Dynamic = (0, React.useRef)(null);
  let documentFrameResult25: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.listRevealAsk,
  );
  let [documentFrameState4, setDocumentFrameState5]: Dynamic = (0,
  React.useState)(null);
  let elementRef8: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    createDocumentFrameEffect51(documentFrameContext),
    [
      documentFrameResult25,
      mode,
      draft,
      filter,
      fileThreads,
      documentFrameResult16,
      items,
      documentFrameResult22,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        useCommentStore.getState().revealInList(null),
    [],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect52(documentFrameContext),
    [documentFrameState4],
  );
  let elementRef9: Dynamic = (0, React.useRef)(null);
  let enabledRef6: Dynamic = (0, React.useRef)(false);
  let elementRef10: Dynamic = (0, React.useRef)(null);
  let elementRef11: Dynamic = (0, React.useRef)(null);
  let memoizedRef: Dynamic = (0, React.useRef)(memoized2);
  memoizedRef.current = memoized2;
  let documentFrameResult26: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.cardKeyAsk,
  );
  (0, React.useEffect)(
    createDocumentFrameEffect53(documentFrameContext),
    [documentFrameResult26],
  );
  (0, React.useEffect)(createDocumentFrameEffect54(documentFrameContext), []);
  (0, React.useEffect)(
    createDocumentFrameEffect55(documentFrameContext),
    [],
  );
  let elementRef12: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    createDocumentFrameEffect56(documentFrameContext),
    [documentFrameResult13],
  );
  let elementRef13: Dynamic = (0, React.useRef)(null);
  let elementRef14: Dynamic = (0, React.useRef)(null);
  let addEventListener2: Dynamic = (0, React.useCallback)(
    createDocumentFrameAddEventListener257(documentFrameContext),
    [railWheelMountedRef],
  );
  let addEventListener3: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      addEventListener2(documentFrame);
      elementRef3.current = documentFrame;
    },
    [addEventListener2],
  );
  let [railH, setRailH]: Dynamic = (0, React.useState)(0);
  let elementRef15: Dynamic = (0, React.useRef)(null);
  let observe: Dynamic = createDocumentFrameObserve58(documentFrameContext);
  let [documentFrameState5, setDocumentFrameState6]: Dynamic = (0,
  React.useState)(null);
  let elementRef16: Dynamic = (0, React.useRef)(null);
  let elementRef17: Dynamic = (0, React.useRef)(null);
  let ceil: Dynamic = createDocumentFrameCeil59(documentFrameContext);
  let observe2: Dynamic = createDocumentFrameObserve260(documentFrameContext);
  let [documentFrameState6, setDocumentFrameState7]: Dynamic = (0,
  React.useState)(null);
  (0, React.useEffect)(
    createDocumentFrameEffect61(documentFrameContext),
    [documentFrameState6, documentFrameResult13],
  );
  let documentFrameResult27: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]) =>
      documentFrame.dirtyEditors.size > 0,
  );
  let useWidgetBridgeCurrent2: Dynamic = useWidgetBridgeCurrent(
    phone,
    documentFrameResult27,
  );
  let useWidgetBridgeCurrent3: Dynamic = useWidgetBridgeCurrent(phone, !!draft);
  let returnAddsLine: Dynamic = useWidgetBridgeCurrent(
    phone,
    mode === `list` && (documentFrameResult27 || !!draft),
  );
  let bottomInset: Dynamic = (0, React.useSyncExternalStore)(
    clearObservabilityTelemetryDelete,
    resolveObservabilityTelemetryValue6,
    (..._extraArguments: unknown[]) => 0,
  );
  let [id2, setId]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => setId(null),
    [documentFrameResult13, draft, mode],
  );
  let elementRef18: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      ceil();
    },
    [ceil, documentFrameResult13, documentFrameState6],
  );
  let elementRef19: Dynamic = (0, React.useRef)(null);
  let updateElement2: Dynamic = (0, React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef19.current = documentFrame;
      elementRef3.current = documentFrame;
    },
    [],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect62(documentFrameContext),
    [listPopover],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect63(documentFrameContext),
    [peek],
  );
  let elementRef20: Dynamic = (0, React.useRef)(null);
  let elementRef21: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    createDocumentFrameEffect64(documentFrameContext),
    [draft, readOnly],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect65(documentFrameContext),
    [composeFloat],
  );
  let documentFrameResult28: Dynamic = useDataOperationControlRawStart({
    key: `lfile-comments`,
    initial: 320,
    min: 240,
    max: 600,
    edge: `left`,
  });
  let [heights, setHeights]: Dynamic = (0, React.useState)({});
  let [documentFrameSet2State, setDocumentFrameSet2State]: Dynamic = (0,
  React.useState)(documentFrameSet2);
  let recordRef2: Dynamic = (0, React.useRef)({});
  let setDocumentFrameSet2State2: Dynamic = createDocumentFrameSetDocumentFrameSet2State266(documentFrameContext);
  let callback8: Dynamic = createDocumentFrameCallback867(documentFrameContext);
  let elementRef22: Dynamic = (0, React.useRef)(null);
  elementRef22.current ||= new ResizeObserver(
    createDocumentFrameUpdateelementRef22_current68(documentFrameContext),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        elementRef22.current?.disconnect(),
    [],
  );
  let callback9: Dynamic = createDocumentFrameCallback969(documentFrameContext);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setDocumentFrameSet2State2(callback8());
    },
    [
      fileThreads,
      documentFrameResult13,
      draft,
      filter,
      documentFrameResult11,
      setDocumentFrameSet2State2,
      callback8,
    ],
  );
  let documentFrameHandler10: Dynamic = (
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentFrameResult9[documentFrame.id] ?? documentFrame.id;
  let documentFrameHandler11 = (
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) => documentFrame in documentFrameResult8;
  let commentAttachmentState2: Dynamic = createDocumentFrameCommentAttachmentState270(documentFrameContext);
  let isDetachedResolvedComment2: Dynamic = createDocumentFrameIsDetachedResolvedComment271(documentFrameContext);
  let commentAttachmentState3: Dynamic = createDocumentFrameCommentAttachmentState372(documentFrameContext);
  let documentSelectionValue =
    documentFrameResult10 === null
      ? undefined
      : resolveDocumentSelectionValue(fromScrollY);
  let isWholeDocumentComment2: Dynamic = createDocumentFrameIsWholeDocumentComment273(documentFrameContext);
  let rail: Dynamic = memoized3.filter(
    (memoized6?: Dynamic, ..._extraArguments: unknown[]) =>
      !commentAttachmentState3(memoized6),
  );
  let record2: Dynamic = createDocumentFrameRecord274(documentFrameContext);
  let rail2: Dynamic = record2.rail;
  let icons: Dynamic = record2.icons;
  let documentFrameHandler12: Dynamic = (
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => record2.hidden.has(documentFrame.id);
  let documentSelectionIds: Dynamic = createDocumentFrameDocumentSelectionIds75(documentFrameContext);
  let elementRef23: Dynamic = (0, React.useRef)(
    (..._extraArguments: unknown[]): undefined => {},
  );
  let elementRef24: Dynamic = (0, React.useRef)(null);
  let updateElement3 = createDocumentFrameUpdateElement376(documentFrameContext);
  let readId3: Dynamic = createDocumentFrameReadId377(documentFrameContext);
  let readIdRef: Dynamic = (0, React.useRef)(readId3);
  readIdRef.current = readId3;
  elementRef23.current = createDocumentFrameUpdateelementRef23_current78(documentFrameContext);
  let peek2: Dynamic = peek && useWidgetBridgeCurrent2;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(!peek2 || documentFrameResult13 == null)) {
        elementRef23.current(documentFrameResult13);
      }
    },
    [peek2, documentFrameResult13],
  );
  let elementRef25: Dynamic = (0, React.useRef)(null);
  let updateElement4: Dynamic = createDocumentFrameUpdateElement479(documentFrameContext);
  let peekRef: Dynamic = (0, React.useRef)(peek2);
  peekRef.current = peek2;
  let getState: Dynamic = (0, React.useCallback)(
    createDocumentFrameGetState80(documentFrameContext),
    [fsEntryId],
  );
  let updateCeiling: Dynamic = createDocumentFrameUpdateCeiling81(documentFrameContext);
  (0, React.useEffect)(
    createDocumentFrameEffect82(documentFrameContext),
    [sheetScrollRef, updateElement4, updateCeiling, getState],
  );
  let documentFrameResult29: Dynamic =
    peek2 && documentFrameResult13 != null ? documentFrameResult13 : null;
  let y5: Dynamic =
    documentFrameResult29 === null
      ? undefined
      : readId3(documentFrameResult29)?.y;
  let docPos: Dynamic = y5 === undefined ? undefined : y5 + fromScrollY;
  let fromScrollYRef: Dynamic = (0, React.useRef)(fromScrollY);
  fromScrollYRef.current = fromScrollY;
  (0, React.useEffect)(
    createDocumentFrameEffect83(documentFrameContext),
    [documentFrameResult29, docPos, updateElement4, updateCeiling],
  );
  let slots: Dynamic = createDocumentFrameSlots84(documentFrameContext);
  if (!peek) {
    for (let documentFrameResult36 of memoized2 as Dynamic)
      slots.push({
        key: `node:${documentFrameResult36.nodeId}`,
        y: documentFrameHandler(documentFrameResult36),
        at: documentFrameHandler2(documentFrameResult36),
      });
    for (let file of callback2 as Dynamic)
      slots.push({
        key: documentFrameHandler10(file),
        y: readId2(file),
        at: file.root?.at ?? ``,
      });
    for (let documentFrameResult36 of icons as Dynamic)
      slots.push({
        key: `folded:${documentFrameResult36.heading}`,
        y: documentFrameResult36.y,
        at: ``,
      });
    if (draft && documentFrameResult4 != null) {
      slots.push({
        key: `__draft`,
        y: documentFrameResult4,
        at: ``,
      });
    }
  }
  let rectless = documentFrameResult10 === null;
  let [bodyH, setBodyH]: Dynamic = (0, React.useState)(0);
  let elementRef26: Dynamic = (0, React.useRef)(null);
  let observe3: Dynamic = createDocumentFrameObserve385(documentFrameContext);
  let documentFrameResult30: Dynamic = null;
  if (documentFrameResult13) {
    let memoized6: Dynamic = memoized2.find(
      (memoized7?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        memoized7.threads.some(
          (thread?: Dynamic, ..._extraArguments: unknown[]) =>
            thread.id === documentFrameResult13,
        ),
    );
    documentFrameResult30 = memoized6
      ? `node:${memoized6.nodeId}`
      : (documentFrameResult9[documentFrameResult13] ?? documentFrameResult13);
  }
  let pivotKey: Dynamic =
    draft && documentFrameResult4 != null ? `__draft` : documentFrameResult30;
  let band: Dynamic = resolveDocumentSelectionTop({
    rectless: rectless,
    peek: peek,
    bodyH: bodyH,
    docExtent: docExtent,
  });
  let recordRef3: Dynamic = (0, React.useRef)({});
  let uniqueItemsRef: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let enabledRef7: Dynamic = (0, React.useRef)(false);
  recordRef3.current = resolveDocumentSelectionUnknownPad({
    full: recordRef3.current,
    known: uniqueItemsRef.current,
    heights: heights,
    open: [pivotKey, documentFrameResult30, ...documentFrameSet2State],
    compact: enabledRef7.current,
  });
  if (band) {
    enabledRef7.current = isDocumentSelectionSlots({
      slots: slots,
      fullHeights: recordRef3.current,
      docExtent: docExtent,
      gap: 8,
      estH: 56,
    });
  }
  let compact: Dynamic = enabledRef7.current;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setDocumentFrameSet2State2(callback8());
    },
    [compact, setDocumentFrameSet2State2, callback8],
  );
  let mapDocumentSelectionTops2: Dynamic = createDocumentFrameMapDocumentSelectionTops286(documentFrameContext);
  let tops: Dynamic = mapDocumentSelectionTops2.tops;
  let height: Dynamic = mapDocumentSelectionTops2.bottom;
  let [documentFrameState7, setDocumentFrameState8]: Dynamic = (0,
  React.useState)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!railSync || !documentFrameState7 || composeFloat || rectless))
        return railSync.register(documentFrameState7);
    },
    [railSync, documentFrameState7, composeFloat, rectless],
  );
  (0, React.useLayoutEffect)(
    createDocumentFrameEffect87(documentFrameContext),
    [railSync, draft, composeFloat, peek, documentFrameResult13],
  );
  let record3: Dynamic = {};
  for (let event of slots as Dynamic) record3[event.key] = event.y;
  recordRef.current = {
    live:
      mode === `margin` &&
      !peek &&
      !composeFloat &&
      !rectless &&
      !(draft && documentFrameResult4 != null),
    ys: record3,
    tops: tops,
    heights: heights,
    bodyH: bodyH,
    fullHeights: recordRef3.current,
  };
  let {
    slideClsOf: useDocumentFrameKey2,
    slideStyleOf: useDocumentFrameKey3,
  }: Dynamic = useDocumentFrameKey(pivotKey ?? ``, tops, record3);
  let matchesMode =
    mode === `margin` && !peek && !composeFloat && !rectless && bodyH > 0;
  let max = matchesMode ? Math.max(0, Math.ceil(height - 8 - bodyH)) : 0;
  let mapDocumentSelectionTops3: Dynamic = mapDocumentSelectionTops2;
  if (
    matchesMode &&
    band &&
    slots.some(
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        event.key === `__draft` || event.y === undefined,
    )
  ) {
    let matchesPivotKey: Dynamic =
      pivotKey === `__draft` && documentFrameResult12 && !readOnly;
    let slots2: Dynamic = slots.filter(
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        event.y !== undefined && (matchesPivotKey || event.key !== `__draft`),
    );
    let pivotKey2: Dynamic =
      pivotKey === `__draft` && !matchesPivotKey
        ? documentFrameResult30
        : pivotKey;
    mapDocumentSelectionTops3 = mapDocumentSelectionTops({
      slots: slots2,
      heights: matchesPivotKey
        ? {
            ...heights,
            __draft: (heights.__draft ?? 56) + 8,
          }
        : heights,
      pivotKey: pivotKey2,
      pivotOffset:
        pivotKey2 !== null && elementRef2.current?.key === pivotKey2
          ? elementRef2.current.offset
          : 0,
      band: band,
      floatMax: 400,
      draftFloor: -1 / 0,
      gap: 8,
      estH: 56,
    });
  }
  let ceil2 =
    matchesMode && band ? Math.ceil(mapDocumentSelectionTops3.overflow) : 0;
  let order: Dynamic =
    pivotKey === `__draft` &&
    !(documentFrameResult12 && !readOnly && (tops.__draft ?? 0) > 0)
      ? []
      : mapDocumentSelectionTops2.order.filter(
          (order2?: Dynamic, ..._extraArguments: unknown[]) =>
            slots.find(
              (event?: Dynamic, ..._extraArguments: unknown[]) =>
                event.key === order2,
            )?.y !== undefined,
        );
  let documentFrameResult31: Dynamic =
    matchesMode && band && order.length > 0
      ? resolveEditorHostTop({
          order: order,
          tops: tops,
          heights: heights,
          estH: 56,
          docScrollY: fromScrollY,
        })
      : null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (documentFrameResult31 !== null) {
        onCardSpans?.(documentFrameResult31);
      }
    },
    [
      documentFrameResult31 === null
        ? null
        : collectEditorHostJoin2(documentFrameResult31),
      onCardSpans,
    ],
  );
  let labelRef: Dynamic = (0, React.useRef)(``);
  (0, React.useEffect)(
    createDocumentFrameEffect88(documentFrameContext),
    [max, ceil2, onOverhang],
  );
  let onSelect = createDocumentFrameOnSelect89(documentFrameContext);
  let setDraftY = createDocumentFrameSetDraftY90(documentFrameContext);
  let onCancel = (..._extraArguments: unknown[]): undefined => {
    let draftAnchor: Dynamic = useCommentStore.getState().draftAnchor;
    setDraftY();
    if (draftAnchor) {
      onComposeExitRef.current?.(draftAnchor.nodeId);
    }
  };
  (0, React.useEffect)(
    createDocumentFrameEffect91(documentFrameContext),
    [documentFrameResult13, draft],
  );
  let onPost: Dynamic = createDocumentFrameOnPost92(documentFrameContext);
  let setDraftY2 = createDocumentFrameSetDraftY293(documentFrameContext);
  (0, React.useLayoutEffect)(
    createDocumentFrameEffect94(documentFrameContext),
    [documentFrameResult],
  );
  (0, React.useEffect)(
    createDocumentFrameEffect95(documentFrameContext),
    [
      useCommentStore(
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrame.surfaceCarrier,
      ),
    ],
  );
  let documentFrameResult32: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.quietPost,
  );
  let elementRef27: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    createDocumentFrameEffect96(documentFrameContext),
    [documentFrameResult32],
  );
  let elementRef28: Dynamic = (0, React.useRef)(null);
  let elementRef29: Dynamic = (0, React.useRef)(null);
  let elementRef30: Dynamic = (0, React.useRef)(null);
  let elementRef31: Dynamic = (0, React.useRef)(null);
  let [documentFrameState8]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      isDataOperationControlRoot(elementRef29, elementRef28),
  );
  let [documentFrameState9]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      isDataOperationControlRoot(elementRef31, elementRef30),
  );
  let [useReducer, setUseReducer]: Dynamic = (0, React.useReducer)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame + 1,
    0,
  );
  let countRef: Dynamic = (0, React.useRef)(0);
  let mappedItems: Dynamic = createDocumentFrameMappedItems97(documentFrameContext);
  let request: Dynamic = listTitleCount(
    filter,
    documentFrameResult17,
    callback3.length + callback2.length,
  );
  let n5: Dynamic = DocumentRuntimeState6 ? request.n : 0;
  let documentFrameResult33 = listFilterSaid(filter, request.n);
  (0, React.useEffect)(
    createDocumentFrameEffect98(documentFrameContext),
    [useReducer, filter, documentFrameResult22, documentFrameResult33, mode],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (mode === `list`)
        return (..._extraArguments: unknown[]) =>
          resolvePlatformAnnouncementsValue2(document, `comment-list`);
    },
    [mode],
  );
  let title = (
    createDocumentFrameTitle99(documentFrameContext)
  );
  let jsxs2 = (
    createDocumentFrameJsxs2100(documentFrameContext)
  );
  let jsxs3 = (
    createDocumentFrameJsxs3101(documentFrameContext)
  );
  let elementRef32: Dynamic = (0, React.useRef)(null);
  let documentFrameResult34: Dynamic = useCommentStore(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentFrame.resolvedFoldOpen,
  );
  let elementRef33: Dynamic = (0, React.useRef)(null);
  if (
    elementRef33.current === null ||
    elementRef33.current.filter !== filter ||
    elementRef33.current.mode !== mode
  ) {
    elementRef33.current = {
      filter: filter,
      mode: mode,
      by: new (Map as Dynamic)(),
    };
  }
  let documentFrameHandler13 = createDocumentFrameDocumentFrameHandler13102(documentFrameContext);
  let documentFrameHandler14: Dynamic = createDocumentFrameDocumentFrameHandler14103(documentFrameContext);
  let toSorted: Dynamic = createDocumentFrameToSorted104(documentFrameContext);
  let documentFrameHandler15: Dynamic = createDocumentFrameDocumentFrameHandler15105(documentFrameContext);
  let documentFrameHandler16: Dynamic = createDocumentFrameDocumentFrameHandler16106(documentFrameContext);
  let documentFrameResult35: Dynamic =
    !documentFrameResult34 &&
    documentFrameResult13 != null &&
    documentFrameHandler16(documentFrameResult13)
      ? documentFrameResult13
      : null;
  let open: Dynamic = documentFrameResult34 || documentFrameResult35 !== null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (documentFrameResult35 !== null) {
        useCommentStore.getState().setResolvedFoldOpen(true);
      }
    },
    [documentFrameResult35],
  );
  let onOpenChange = createDocumentFrameOnOpenChange107(documentFrameContext);
  let controlId: Dynamic = (0, React.useId)();
  let onKeyDown = createDocumentFrameOnKeyDown108(documentFrameContext);
  let fsEntryId2: Dynamic = createDocumentFrameFsEntryId2109(documentFrameContext);
  let fsEntryId3: Dynamic = createDocumentFrameFsEntryId3110(documentFrameContext);
  let jsxs4 = (
    createDocumentFrameJsxs4111(documentFrameContext)
  );
  let jsxs5: Dynamic = createDocumentFrameJsxs5112(documentFrameContext);
  let jsxs6: Dynamic = jsxs5(`flush`);
  let matchesDraft =
    draft !== null &&
    (resolveDocumentSourcePromptComponent(draft) !== null ||
      draft.clamped === true);
  if (key === null) {
    elementRef21.current = null;
  } else {
    if (elementRef21.current?.key !== key) {
      elementRef21.current = {
        key: key,
        cds:
          (typeof claudeRoute == `object` && claudeRoute.disabled !== true) ||
          claudeRoute === `always` ||
          (claudeRoute === undefined && draft?.ask !== true && !matchesDraft),
        framed: matchesDraft || claudeRoute === `always`,
      };
    }
  }
  let matchesCds = elementRef21.current?.cds === true;
  let jsxs7: Dynamic =
    createDocumentFrameJsxs7113(documentFrameContext);
  let lookup: Dynamic = createDocumentFrameLookup114(documentFrameContext);
  let lookup2: Dynamic = new (Map as Dynamic)(
    [...lookup].map(
      ([item, item2]: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        item2,
        item,
      ],
    ),
  );
  let fsEntryId4: Dynamic = createDocumentFrameFsEntryId4115(documentFrameContext);
  let jsxs8 = (
    createDocumentFrameJsxs8116(documentFrameContext)
  );
  if (peek) {
    let lookup3: Dynamic = new (Map as Dynamic)();
    for (let documentFrameResult36 of memoized3 as Dynamic)
      lookup3.set(documentFrameResult36.id, documentFrameResult36);
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    for (let documentFrameResult36 of callback2 as Dynamic) {
      lookup3.set(documentFrameResult36.id, documentFrameResult36);
      uniqueItems.add(documentFrameResult36.id);
    }
    let lookupEntry: Dynamic =
      documentFrameResult13 == null
        ? undefined
        : lookup3.get(documentFrameResult13);
    let lookupEntry2: Dynamic =
      lookupEntry && !commentAttachmentState3(lookupEntry) ? lookupEntry : null;
    let matchesLookupEntry: Dynamic =
      lookupEntry2 !== null && uniqueItems.has(lookupEntry2.id);
    let dy2: Dynamic =
      lookupEntry2 !== null && documentFrameResult14?.id === lookupEntry2.id
        ? documentFrameResult14.dy
        : 0;
    let max2 = lookupEntry2
      ? Math.max(
          8,
          ((matchesLookupEntry
            ? readId2(lookupEntry2)
            : isWholeDocumentComment2(lookupEntry2)) ?? 80) + dy2,
        )
      : 0;
    let documentSelectionId: Dynamic = lookupEntry2
      ? (documentSelectionIds.find(
          (
            documentSelectionId2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            documentSelectionId2.ids.length > 1 &&
            documentSelectionId2.ids.includes(lookupEntry2.id),
        ) ?? null)
      : null;
    let flatMap2: Dynamic = createDocumentFrameFlatMap2117({
  get documentFrameState6() { return documentFrameState6; },
  get lookupEntry2() { return lookupEntry2; },
  get documentSelectionId() { return documentSelectionId; },
  get lookup3() { return lookup3; },
  get commentAttachmentState3() { return commentAttachmentState3; },
});
    let fsEntryId5: Dynamic = fsEntryId2(
      flatMap2.map(
        ({ mt: mt2 }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          mt2.id,
      ),
    );
    let top = resolveWidgetBridgeRailH({
      y: max2,
      stackH: documentFrameState5 ?? 160,
      railH: railH,
    });
    let maxHeight = resolveWidgetBridgeRailH2({
      top: top,
      railH: railH,
    });
    let getState2: Dynamic = createDocumentFrameGetState2118(documentFrameContext);
    let onExpand2: Dynamic = createDocumentFrameOnExpand2119({
  get getState2() { return getState2; },
  get useCommentStore() { return useCommentStore; },
});
    let getAttribute = createDocumentFrameGetAttribute120({
  get getState2() { return getState2; },
  get scrollTo2() { return scrollTo2; },
});
    let widgetBridgeFlatMap: Dynamic = useWidgetBridgeCurrent2
      ? resolveWidgetBridgeFlatMap(documentSelectionIds)
      : [];
    let widgetBridgeFlatMapIndex: Dynamic = lookupEntry2
      ? widgetBridgeFlatMap.indexOf(lookupEntry2.id)
      : -1;
    let documentFrameHandler17 = (
      documentFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ) => `Comment ${documentFrame + 1} of ${widgetBridgeFlatMap.length}`;
    let widgetBridgeValue: Dynamic = resolveWidgetBridgeValue(
      widgetBridgeFlatMap,
      widgetBridgeFlatMapIndex,
      -1,
    );
    let widgetBridgeValue2: Dynamic = resolveWidgetBridgeValue(
      widgetBridgeFlatMap,
      widgetBridgeFlatMapIndex,
      1,
    );
    let indexOf = createDocumentFrameIndexOf121({
  get widgetBridgeValue() { return widgetBridgeValue; },
  get widgetBridgeValue2() { return widgetBridgeValue2; },
  get onExpand2() { return onExpand2; },
  get resolvePlatformAnnouncementsValue() { return resolvePlatformAnnouncementsValue; },
  get CommentComponents_Message2() { return CommentComponents_Message2; },
  get storeState2() { return storeState2; },
  get documentFrameHandler17() { return documentFrameHandler17; },
  get widgetBridgeFlatMap() { return widgetBridgeFlatMap; },
});
    let shouldClose: Dynamic = (
      documentFrame?: unknown,
      ..._extraArguments: unknown[]
    ) =>
      useCommentStore.getState().dirtyEditors.size === 0
        ? ((elementRef18.current = lookupEntry2.id), true)
        : (setId(lookupEntry2.id), false);
    let onClose = createDocumentFrameOnClose122(documentFrameContext);
    let jsxs9 =
      createDocumentFrameJsxs9123({
  get useWidgetBridgeCurrent2() { return useWidgetBridgeCurrent2; },
  get lookupEntry2() { return lookupEntry2; },
  get covered() { return covered; },
  get BottomSheet() { return BottomSheet; },
  get shouldClose() { return shouldClose; },
  get onClose() { return onClose; },
  get widgetBridgeFlatMapIndex() { return widgetBridgeFlatMapIndex; },
  get jsxRuntime() { return jsxRuntime; },
  get widgetBridgeFlatMap() { return widgetBridgeFlatMap; },
  get IconButton() { return IconButton; },
  get UiOverlaysAndIconsCustomIcon() { return UiOverlaysAndIconsCustomIcon; },
  get widgetBridgeValue() { return widgetBridgeValue; },
  get resolveUiDesignSystemValue2() { return resolveUiDesignSystemValue2; },
  get PHONE_TOUCH_TARGET_CLASS() { return PHONE_TOUCH_TARGET_CLASS; },
  get indexOf() { return indexOf; },
  get widgetBridgeValue2() { return widgetBridgeValue2; },
  get PHONE_EDIT_BUTTON_CLASS() { return PHONE_EDIT_BUTTON_CLASS; },
  get uniqueItems() { return uniqueItems; },
  get resolveCommentsEditorReactionOnly() { return resolveCommentsEditorReactionOnly; },

  get WhoReacted() { return WhoReacted; },
  get resolveCommentsEditorUser() { return resolveCommentsEditorUser; },
  get ReactionChip() { return ReactionChip; },
  get isWholeDocumentComment() { return isWholeDocumentComment; },
  get callback6() { return callback6; },
  get resolveDocumentSourcePromptValue2() { return resolveDocumentSourcePromptValue2; },
  get documentFrameResult6() { return documentFrameResult6; },
  get documentFrameResult7() { return documentFrameResult7; },
  get DocumentSourcePrompt_WholeDocument() { return DocumentSourcePrompt_WholeDocument; },
  get hintId2() { return hintId2; },
  get onReact() { return onReact; },
  get onDelete() { return onDelete; },
  get onUnreactRoot() { return onUnreactRoot; },
  get onResolve() { return onResolve; },
  get onReopen() { return onReopen; },
  get readOnly() { return readOnly; },
  get commentOnly2() { return commentOnly2; },
  get documentFrameHandler10() { return documentFrameHandler10; },
  get CiteOutcomeChip() { return CiteOutcomeChip; },
  get record() { return record; },
  get onExpand2() { return onExpand2; },
  get resolveDocumentSourcePromptTarget3() { return resolveDocumentSourcePromptTarget3; },
  get callback5() { return callback5; },
  get hintId() { return hintId; },
  get PhoneConfirmationDialog() { return PhoneConfirmationDialog; },
  get id2() { return id2; },
  get setId() { return setId; },
  get elementRef18() { return elementRef18; },
});
    let iconLane2: Dynamic =
      iconLane || (lookupEntry2 !== null && flatMap2.length > 0);
    return (
      createDocumentFrameRender124({
  get observe() { return observe; },
  get iconLane2() { return iconLane2; },
  get DocumentFrame_Comments() { return DocumentFrame_Comments; },
  get covered() { return covered; },
  get jsxs() { return jsxs; },
  get EditorHostState33() { return EditorHostState33; },
  get setDocumentFrameState8() { return setDocumentFrameState8; },
  get iconLane() { return iconLane; },
  get documentSelectionIds() { return documentSelectionIds; },
  get lookup3() { return lookup3; },
  get uniqueItems() { return uniqueItems; },
  get isWholeDocumentComment() { return isWholeDocumentComment; },
  get resolveDocumentRuntimeValue10() { return resolveDocumentRuntimeValue10; },
  get resolveCommentComponentsCount() { return resolveCommentComponentsCount; },
  get callback5() { return callback5; },
  get callback6() { return callback6; },
  get resolveDocumentSourcePromptCells() { return resolveDocumentSourcePromptCells; },
  get documentFrameResult6() { return documentFrameResult6; },
  get documentFrameResult7() { return documentFrameResult7; },
  get Tooltip() { return Tooltip; },

  get useCommentStore() { return useCommentStore; },
  get onExpand2() { return onExpand2; },
  get resolvePlatformAnnouncementsValue() { return resolvePlatformAnnouncementsValue; },
  get setDocumentFrameState7() { return setDocumentFrameState7; },
  get scrollTo2() { return scrollTo2; },
  get querySelectorAll2() { return querySelectorAll2; },
  get elementRef9() { return elementRef9; },
  get predict2() { return predict2; },
  get documentFrameHandler8() { return documentFrameHandler8; },
  get UiOverlaysAndIconsCustomIcon() { return UiOverlaysAndIconsCustomIcon; },
  get useWidgetBridgeCurrent2() { return useWidgetBridgeCurrent2; },
  get jsxs9() { return jsxs9; },
  get lookupEntry2() { return lookupEntry2; },
  get flatMap2() { return flatMap2; },
  get elementRef13() { return elementRef13; },
  get top() { return top; },
  get maxHeight() { return maxHeight; },
  get observe2() { return observe2; },
  get onFocus() { return onFocus; },
  get getAttribute() { return getAttribute; },
  get documentFrameHandler5() { return documentFrameHandler5; },
  get resolveCommentsEditorReactionOnly() { return resolveCommentsEditorReactionOnly; },
  get resolveUiTooltipsAndControlsValue3() { return resolveUiTooltipsAndControlsValue3; },
  get ReactionChip() { return ReactionChip; },
  get resolveDocumentSourcePromptValue2() { return resolveDocumentSourcePromptValue2; },
  get DocumentSourcePrompt_WholeDocument() { return DocumentSourcePrompt_WholeDocument; },
  get fsEntryId5() { return fsEntryId5; },
  get onNavigate() { return onNavigate; },
  get hintId2() { return hintId2; },
  get onReact() { return onReact; },
  get onDelete() { return onDelete; },
  get onUnreactRoot() { return onUnreactRoot; },
  get onResolve() { return onResolve; },
  get onReopen() { return onReopen; },
  get readOnly() { return readOnly; },
  get commentOnly2() { return commentOnly2; },
  get documentFrameHandler10() { return documentFrameHandler10; },
  get CiteOutcomeChip() { return CiteOutcomeChip; },
  get record() { return record; },
  get documentSelectionId() { return documentSelectionId; },
  get resolveDocumentSourcePromptTarget3() { return resolveDocumentSourcePromptTarget3; },
  get hintId() { return hintId; },
})
    );
  }
  if (mode === `margin`) {
    if (composeFloat && useWidgetBridgeCurrent3 && jsxs6 && !covered) {
      let label = `draft:${draft.nodeId}|${draft.nonce}`;
      let shouldClose: Dynamic = createDocumentFrameShouldClose125({
  get useCommentStore() { return useCommentStore; },
  get setId() { return setId; },
  get label() { return label; },
});
      let onClose = createDocumentFrameOnClose126(documentFrameContext);
      return (
        createDocumentFrameRender127({
  get BottomSheet() { return BottomSheet; },
  get shouldClose() { return shouldClose; },
  get onClose() { return onClose; },
  get ariaLabel() { return ariaLabel; },
  get claudeRoute() { return claudeRoute; },
  get UseCommentComponentsRouteComponent() { return UseCommentComponentsRouteComponent; },
  get key() { return key; },
  get documentFrameState3() { return documentFrameState3; },
  get elementRef20() { return elementRef20; },
  get bottomInset() { return bottomInset; },
  get jsxs() { return jsxs; },
  get jsxs5() { return jsxs5; },
  get PhoneConfirmationDialog() { return PhoneConfirmationDialog; },
  get id2() { return id2; },
  get label() { return label; },
  get setId() { return setId; },
  get draft() { return draft; },
})
      );
    }
    return (
      createDocumentFrameRender128(documentFrameContext)
    );
  }
  return listPopover && returnAddsLine && !forceList ? (
    createDocumentFrameRender129(documentFrameContext)
  ) : listPopover ? (
    createDocumentFrameRender130(documentFrameContext)
  ) : (
    createDocumentFrameRender131(documentFrameContext)
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentFrame1Step1(): void {
  (documentSourcePromptLimit0 = 0);
  (DocumentSourcePrompt_Other = `other`);
  (DocumentSourcePromptState4 = null);
  (documentSourcePromptLimit02 = 0);
}

export {
  DocumentFrame,
  DocumentSourcePromptState4,
  DocumentSourcePrompt_Other,
  documentSourcePromptLimit0,
  documentSourcePromptLimit02,
};

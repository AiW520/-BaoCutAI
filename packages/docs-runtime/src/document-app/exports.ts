/** BaoCut: Semantic public exports; internal implementation exports stay private. */
export {
  useRepeatedTabShortcut,
  overflowTitle,
  TabsHeadingRow,
  tabOutlineToggleLabel,
  tabsOutlineStore,
  useTabOutline,
  useSelectedTabHeading,
} from "./presence-and-chat";
export {
  notifyClaudeReplied,
  CLAUDE_ASKED_WAITING_MESSAGE,
  CLAUDE_WRITING_OUTCOME_MESSAGES,
  CollaboratorAvatar,
  INLINE_ASK_TOAST_ID,
  CLAUDE_COMMENT_WAITING_MESSAGES,
  CLAUDE_WRITE_UNAVAILABLE_MESSAGE,
  hasMintedContent,
  CLAUDE_REPLIED_MESSAGE,
} from "./comment-notifications/create-comment-notice-coordinator";
export { DISPLAY_PROPERTY, UntippedIconButton, IconButton, isFontSettingsObject, runSourceOf } from "./run-review";
export {
  tabRowMenuItems,
  tabMoveAvailability,
  tabOpenedAnnouncement,
  tabMoveAnnouncement,
} from "./document-context-actions/tab-tree-rows";
export { isDocumentFocusedElsewhere, PhoneDialogPopup } from "./phone-overlays/export-progress-dialog";
export { CommentReplyComposer } from "./comment-components/comment-reply-composer";
export {
  serializeDocumentLayout,
  useDocumentLanguage,
  documentLanguageAttributes,
  writeDocumentLanguage,
  equalDocumentLayouts,
  DOCUMENT_LANGUAGE_COPY,
  getDocumentDisplayGeneration,
  pickDocumentLayout,
  documentDisplayPostState,
  PAGE_WIDTH_PROPERTY,
  SKILL_PROPERTY,
  clearDocumentLayoutPickIfCurrent,
  useDocumentDisplay,
  applyDocumentLayoutIfCurrent,
  parseDocumentLayout,
  readDisplaySettings,
  fontSettingsKey,
  parseDocumentFonts,
  serializeDocumentFonts,
  equalDocumentFonts,
  withoutTypographyPost,
  useDocumentFontFeed,
  useDocumentFonts,
  getDocumentFontGeneration,
  setDocumentFonts,
  applyDocumentFontsIfCurrent,
  getDocumentFonts,
  subscribeDocumentFonts,
  documentFontsPostState,
  classifyTitleClick,
  canReleasePeekFocus,
  classifyTitleEscape,
  classifyFrameFocusReturn,
  hasKeyboardFrameFocus,
  classifyTitleFocusRequest,
  reduceKeyboardHelpVisibility,
} from "./document-display";
export { registerCommentSessionHost, commentSessionIdentity } from "./comment-session/ask-suggestions-measure";
export { reportCommentSessionEvent, reportCommentSessionEnd } from "./comment-session/clear-comment-session-thread-id";
export {
  resolveTabNavigation,
  DuplicateUnsupported,
  DuplicateStructureInvalid,
  TabRailButton,
  duplicateVersionTab,
  DuplicateTooLarge,
} from "./document-context-actions/duplicate-document-tab";
export { BOTTOM_SHEET_CLEAR_PROPERTY, BOTTOM_SHEET_SCRIM_CLASS, PHONE_TOUCH_TARGET_CLASS } from "./bootstrap";
export { prefetchDocumentViewWithComments } from "./ask-cards/document-posture-badge";
export { COMMENT_PROSE_CLASS } from "./comment-composer";
export {
  isEmptyClaudeRequest,
  ASK_RETRY_DELAY_MS,
  normalizeClaudeRequestText,
} from "./document-commands/create-ask-card-request-pool";
export {
  PagebarSeparator,
  canClosePagebarOnFocusLeave,
  PagebarStrip,
  PagebarMenuTrigger,
  PagebarCommandItem,
} from "./document-tabs/pagebar";
export {
  useTabsPlacement,
  isTabsLocationFeatureEnabled,
  isTabsPlacementObject,
  parseTabsPlacement,
  shouldOfferTabsPlacement,
  serializeTabsPlacement,
  tabsPlacementUnavailableReason,
  notifyTabsPlacement,
  getTabsPlacementEpoch,
  pickTabsPlacement,
  commitTabsPlacementPick,
  releaseTabsPlacementPick,
  clearTabsPlacementPick,
  getTabsPlacementPick,
  getTabsPlacement,
  subscribeTabsPlacement,
  countTabTree,
  flattenTabTree,
  collapseTabChildren,
  tabTreeLayoutKey,
  canShowTabsList,
  tabDropPlacement,
  findTabSiblingSet,
  tabKeyboardMovePlacement,
  tabPositionAnnouncement,
  tabDescendantIds,
  zoomedProseWidth,
  shouldEstimateZoomedSidebar,
  measureTabsSidebarViewport,
} from "./document-chrome";
export { InlineAskNotice, INLINE_ASK_COMPOSER_LAYOUT } from "./comment-components/state";
export {
  documentPreviewKey,
  isPopupScrollBoundary,
  DOCUMENT_PREVIEW_POPOVER_CLASS,
} from "./document-preview/use-page-skill-seat";
export {
  useProvenanceTimeFormat,
  isWidgetBuildRunning,
  WidgetProvenanceTrigger,
  widgetProvenanceAuthors,
} from "./document-runtime/use-document-iframe-focus";
export { documentFrameStyleAttributes } from "./document-context/create-widget-writing-coordinator";
export { CLAUDE_LOGO_DATA_URI } from "./document-host-state/create-document-host-health-monitor";
export { useNodeEngineNames } from "./document-runtime/use-document-runtime-subscribe-project-feed";
export { ClaudeTypingIndicator } from "./comment-anchors/use-comment-anchors-sheets-component";
export { claudeAskRoute } from "./document-commands/create-selection-ask-coordinator";
export { TabRenameInput } from "./document-context-actions/tab-rail";
export {
  resolveFrameGesturesKeyboard,
  resolveFrameGesturesHasFocus,
  resolveFrameGesturesValue,
  resolveFrameGesturesKeyboard2,
  resolveFrameGesturesAccept,
  resolveFrameGesturesRoom,
  resolveFrameGesturesIsArray,
  resolveFrameGesturesValue2,
  updateFrameGesturesParse,
  updateFrameGesturesSize,
  installFrameGesturesValue,
  getFrameGesturesValue2,
  updateFrameGesturesDelete,
  resolveFrameGesturesIds,
  isFrameGesturesDisplayOn,
  resolveFrameGesturesRowsPin,
  resolveFrameGesturesIsFinite,
  resolveFrameGesturesOpenedAt,
  resolveFrameGesturesOpenedAt2,
  resolveFrameGesturesValue3,
  resolveFrameGesturesValue4,
} from "./frame/gestures-state-1";
export { extractErrorDetails } from "./connection-and-errors/connector-permission-dialog";

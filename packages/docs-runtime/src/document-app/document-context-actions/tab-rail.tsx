/** BaoCut: document context actions from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  createTabRailApplyPendingPlacement,
  createTabRailCreateTab,
  createTabRailDeleteTab,
  createTabRailDuplicateProbe,
  createTabRailDuplicateTab,
  createTabRailExpandActiveAncestors,
  createTabRailHeadingExpansion,
  createTabRailKeyboardMoveAnnounce,
  createTabRailKeyboardMoveCommit,
  createTabRailKeyboardMoveStart,
  createTabRailMenuKeyDown,
  createTabRailMoveTab,
  createTabRailOutlineFocus,
  createTabRailOutlineRefresh,
  createTabRailOutlineScroll,
  createTabRailPlacementSeat,
  createTabRailPresenceIndex,
  createTabRailProjectDiff,
  createTabRailProjectLoader,
  createTabRailProjectSubscription,
  createTabRailRenameCommit,
  createTabRailRenameDraft,
  createTabRailResetProject,
  createTabRailRestoreMenuFocus,
  createTabRailStyleWriter,
  renderTabRailView,
} from "../closure-factories";
import {
  Button,
  Checkbox,
  CopyLinkFallbackUrl,
  EditorHostBadge,
  EditorHostGlyph,
  Menu,
  PaneResizeHandle,
  Popover,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  apiFetcher,
  collectDataOperationControlFindIndex,
  collectDataOperationControlPos,
  frameProjectAck,
  getDataOperationControlEntry2,
  getDataOperationControlPatch,
  getPlatformSyncAndRoutingValue2,
  isDataOperationControlIndent,
  isFrameArtifact,
  loadPlatformSessionAndSourcesAckOf,
  loadPlatformSessionAndSourcesAckOf2,
  preloadModule,
  resolveCommentsActionsAndSelectionContainer,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataOperationControlAbsent,
  resolveDataOperationControlDataBaseUiFocusGuard,
  resolveDataOperationControlEngineBound,
  resolveDataOperationControlSize,
  resolveDataOperationControlValue,
  resolveDataOperationControlValue8,
  resolveObservabilityBrowserAndOperationEventsReplace2,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSessionAndSourcesData,
  resolvePlatformSessionAndSourcesUnavailable,
  resolvePlatformSessionAndSourcesUnavailable2,
  resolvePlatformSessionAndSourcesVerb4,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingName,
  resolvePlatformSyncAndRoutingPath3,
  resolvePlatformSyncAndRoutingPush2,
  resolvePlatformSyncAndRoutingValue10,
  subscribeProjectFeed,
  toast,
  updateCommentsActionsAndSelectionValue,
  updateDataOperationControlChildren,
  updateDataOperationControlEntry,
  updateDataOperationControlTabs,
  updatePlatformSyncAndRoutingDirectory,
  updatePlatformSyncAndRoutingEntry,
  useDataOperationControlRawStart,
  useDataOperationControlWidth,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  PhoneConfirmationDialog,
  PhoneDialogPopup,
} from "../phone-overlays/export-progress-dialog";
import {
  IconButton,
} from "../run-review";
import {
  fontSettingsKey,
  parseDocumentFonts,
  readDisplaySettings,
  readDocumentLanguage,
  readPageSkillSettings,
  skillSettingsKey,
} from "../document-display";
import {
  countTabTree,
  getTabsPlacement,
  getTabsPlacementEpoch,
  shouldOfferTabsPlacement,
  tabDescendantIds,
  tabKeyboardMovePlacement,
  tabPositionAnnouncement,
  tabTreeLayoutKey,
  tabsPlacementUnavailableReason,
} from "../document-chrome";
import {
  TabsPlaceRowGate,
  createTabNavigationSourceFence,
  filePresentationKind,
  isFocusVisible,
  nearestScrollContainer,
  scrollTabRowIntoView,
  tabTreeAuthority,
  tabsOutlineStore,
  useRepeatedTabShortcut,
  useSelectedTabHeading,
  useTabOutline,
} from "../presence-and-chat";
import {
  AGENT_ADDED_TAB_TOAST_ID,
  BOXED_HOME_BUTTON_CLASS,
  DISABLED_TAB_CLASS,
  TABS_MOVED_TO_PAGE_MESSAGE,
  TAB_DRAG_MIME_TYPE,
  TAB_OUTLINE_REFRESH_MS,
  TabCaretIcon,
  addedTabs,
  agentAddedTabsMessage,
  canCreateSpreadsheetTabs,
  canRestoreTabMenuFocus,
  clearActiveTabRename,
  clearPendingTabRename,
  createDocumentFile,
  createTab,
  duplicateDocumentTab,
  findTabTreeNode,
  hasTabMenuFocusTargets,
  isRealTabFile,
  isSpreadsheetTab,
  isTabDropBelowLabel,
  readDuplicateSourceFile,
  releaseActiveTabRename,
  requestTabRename,
  resolveTabNavigation,
  tabIdentityKey,
  tabSubtreeIds,
} from "./duplicate-document-tab";
import {
  TabTreeRows,
  tabMoveAnnouncement,
} from "./tab-tree-rows";

function TabRail(
  {
    pid: pid,
    activeId: activeId,
    version: version,
    room: room,
    presence: presence,
    onNavigate: onNavigate,
    onUserNavigate: onUserNavigate,
    readOnly = false,
    onPageSkill: onPageSkill,
    onDocFont: onDocFont,
    onDocLanguage: onDocLanguage,
    pageName: pageName,
    onTabsSeat: onTabsSeat,
    tabsPlaceOffered = false,
    tabsPlace = `default`,
    tabsOnPage = false,
    tabsListShown = tabsOnPage,
    triggerHidden = false,
    tabsNoRoom = false,
    outlineFeed = null,
    onJumpHeading: onJumpHeading,
    onPanelOpen: onPanelOpen,
    timers: timers,
    triggerChrome = `boxed`,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  // BaoCut: per-render live bindings preserve callback timing and local state ownership.
  const tabRailLiveContext = {
    get AGENT_ADDED_TAB_TOAST_ID(): string { return AGENT_ADDED_TAB_TOAST_ID; },
    get BOXED_HOME_BUTTON_CLASS(): string { return BOXED_HOME_BUTTON_CLASS; },
    get Button(): Dynamic { return Button; },
    get Checkbox(): Dynamic { return Checkbox; },
    get DISABLED_TAB_CLASS(): string { return DISABLED_TAB_CLASS; },
    get EditorHostBadge(): Dynamic { return EditorHostBadge; },
    get EditorHostGlyph(): Dynamic { return EditorHostGlyph; },
    get IconButton(): Dynamic { return IconButton; },
    get Menu(): Dynamic { return Menu; },
    get PaneResizeHandle(): Dynamic { return PaneResizeHandle; },
    get PhoneConfirmationDialog(): Dynamic { return PhoneConfirmationDialog; },
    get PhoneDialogPopup(): Dynamic { return PhoneDialogPopup; },
    get Popover(): Dynamic { return Popover; },
    get TABS_MENU_ICON_STYLE(): Dynamic { return TABS_MENU_ICON_STYLE; },
    get TABS_MENU_LABEL(): string { return TABS_MENU_LABEL; },
    get TABS_MOVED_TO_PAGE_MESSAGE(): string { return TABS_MOVED_TO_PAGE_MESSAGE; },
    get TAB_DRAG_MIME_TYPE(): string { return TAB_DRAG_MIME_TYPE; },
    get TAB_OUTLINE_REFRESH_MS(): number { return TAB_OUTLINE_REFRESH_MS; },
    get TabCaretIcon(): Dynamic { return TabCaretIcon; },
    get TabTreeRows(): Dynamic { return TabTreeRows; },
    get TabsPlaceRowGate(): Dynamic { return TabsPlaceRowGate; },
    get Tooltip(): Dynamic { return Tooltip; },
    get UiDialogsRoot(): Dynamic { return UiDialogsRoot; },
    get UiOverlaysAndIconsCustomIcon(): Dynamic { return UiOverlaysAndIconsCustomIcon; },
    get activeId(): Dynamic { return activeId; },
    get activeIdRef(): Dynamic { return activeIdRef; },
    get addedTabs(): Dynamic { return addedTabs; },
    get agentAddedTabsMessage(): Dynamic { return agentAddedTabsMessage; },
    get apiFetcher(): Dynamic { return apiFetcher; },
    get busy(): Dynamic { return busy; },
    get callback(): Dynamic { return callback; },
    get canCreateSpreadsheetTabs(): Dynamic { return canCreateSpreadsheetTabs; },
    get canRestoreTabMenuFocus(): Dynamic { return canRestoreTabMenuFocus; },
    get clearActiveTabRename(): Dynamic { return clearActiveTabRename; },
    get clearPendingTabRename(): Dynamic { return clearPendingTabRename; },
    get closest(): Dynamic { return closest; },
    get contains(): Dynamic { return contains; },
    get copyLink(): Dynamic { return copyLink; },
    get countRef(): Dynamic { return countRef; },
    get countRef2(): Dynamic { return countRef2; },
    get countRef3(): Dynamic { return countRef3; },
    get countRef4(): Dynamic { return countRef4; },
    get createDocumentFile(): Dynamic { return createDocumentFile; },
    get createTab(): Dynamic { return createTab; },
    get createTabNavigationSourceFenceState(): Dynamic { return createTabNavigationSourceFenceState; },
    get createTabNavigationSourceFenceState2(): Dynamic { return createTabNavigationSourceFenceState2; },
    get deny(): Dynamic { return deny; },
    get disabled(): Dynamic { return disabled; },
    get disabled2(): boolean { return disabled2; },
    get disabledRef(): Dynamic { return disabledRef; },
    get displayNameEntry(): Dynamic { return displayNameEntry; },
    get displayNames(): Dynamic { return displayNames; },
    get dragging(): Dynamic { return dragging; },
    get duplicateDocumentTab(): Dynamic { return duplicateDocumentTab; },
    get editing(): Dynamic { return editing; },
    get elementRef(): Dynamic { return elementRef; },
    get elementRef11(): Dynamic { return elementRef11; },
    get elementRef12(): Dynamic { return elementRef12; },
    get elementRef13(): Dynamic { return elementRef13; },
    get elementRef14(): Dynamic { return elementRef14; },
    get elementRef16(): Dynamic { return elementRef16; },
    get elementRef17(): Dynamic { return elementRef17; },
    get elementRef18(): Dynamic { return elementRef18; },
    get elementRef2(): Dynamic { return elementRef2; },
    get elementRef3(): Dynamic { return elementRef3; },
    get elementRef4(): Dynamic { return elementRef4; },
    get elementRef5(): Dynamic { return elementRef5; },
    get elementRef6(): Dynamic { return elementRef6; },
    get elementRef7(): Dynamic { return elementRef7; },
    get elementRef8(): Dynamic { return elementRef8; },
    get elementRef9(): Dynamic { return elementRef9; },
    get enabledRef(): Dynamic { return enabledRef; },
    get enabledRef2(): Dynamic { return enabledRef2; },
    get enabledRef3(): Dynamic { return enabledRef3; },
    get enabledRef4(): Dynamic { return enabledRef4; },
    get enabledRef5(): Dynamic { return enabledRef5; },
    get enabledRef6(): Dynamic { return enabledRef6; },
    get enabledRef7(): Dynamic { return enabledRef7; },
    get enabledRef8(): Dynamic { return enabledRef8; },
    get enabledRef9(): Dynamic { return enabledRef9; },
    get enabledState(): Dynamic { return enabledState; },
    get enabledState2(): Dynamic { return enabledState2; },
    get enabledState3(): Dynamic { return enabledState3; },
    get enabledState6(): Dynamic { return enabledState6; },
    get enabledState7(): Dynamic { return enabledState7; },
    get enabledStateRef(): Dynamic { return enabledStateRef; },
    get error(): Dynamic { return error; },
    get errorRef(): Dynamic { return errorRef; },
    get expanded(): Dynamic { return expanded; },
    get filePresentationKind(): Dynamic { return filePresentationKind; },
    get focus(): Dynamic { return focus; },
    get focus2(): Dynamic { return focus2; },
    get focus3(): Dynamic { return focus3; },
    get fontSettingsKey(): Dynamic { return fontSettingsKey; },
    get fontSettingsKey2(): Dynamic { return fontSettingsKey2; },
    get frameProjectAck(): Dynamic { return frameProjectAck; },
    get getDataOperationControlEntry2(): Dynamic { return getDataOperationControlEntry2; },
    get getDataOperationControlPatch(): Dynamic { return getDataOperationControlPatch; },
    get getPlatformSyncAndRoutingValue2(): Dynamic { return getPlatformSyncAndRoutingValue2; },
    get getTabsPlacementEpoch2(): Dynamic { return getTabsPlacementEpoch2; },
    get getTabsPlacementEpoch3(): Dynamic { return getTabsPlacementEpoch3; },
    get headings(): Dynamic { return headings; },
    get hint(): Dynamic { return hint; },
    get isFocusVisible(): Dynamic { return isFocusVisible; },
    get isFrameArtifact(): Dynamic { return isFrameArtifact; },
    get isRealTabFile(): Dynamic { return isRealTabFile; },
    get isTabDropBelowLabel(): Dynamic { return isTabDropBelowLabel; },
    get itemsRef(): Dynamic { return itemsRef; },
    get jsxRuntime(): Dynamic { return jsxRuntime; },
    get kinds(): Dynamic { return kinds; },
    get latestStyle2(): Dynamic { return latestStyle2; },
    get loadPlatformSessionAndSourcesAckOf(): Dynamic { return loadPlatformSessionAndSourcesAckOf; },
    get lookupRef(): Dynamic { return lookupRef; },
    get mapPreloadDependencies(): Dynamic { return mapPreloadDependencies; },
    get matchesOnTabsSeat(): boolean { return matchesOnTabsSeat; },
    get matchesTabRailState(): boolean { return matchesTabRailState; },
    get moveSavingIds(): Dynamic { return moveSavingIds; },
    get nearestScrollContainer(): Dynamic { return nearestScrollContainer; },
    get onClick(): Dynamic { return onClick; },
    get onClick2(): Dynamic { return onClick2; },
    get onJumpHeading(): Dynamic { return onJumpHeading; },
    get onKeyDown(): Dynamic { return onKeyDown; },
    get onKeyUp(): Dynamic { return onKeyUp; },
    get onMouseDown(): Dynamic { return onMouseDown; },
    get onNavigate2(): Dynamic { return onNavigate2; },
    get onNavigateRef(): Dynamic { return onNavigateRef; },
    get onOpen(): Dynamic { return onOpen; },
    get onToggle(): Dynamic { return onToggle; },
    get open(): Dynamic { return open; },
    get ops(): Dynamic { return ops; },

    get pid(): Dynamic { return pid; },
    get preloadModule(): Dynamic { return preloadModule; },
    get presence(): Dynamic { return presence; },
    get presenceBy(): Dynamic { return presenceBy; },
    get probeKind(): Dynamic { return probeKind; },
    get querySelector(): Dynamic { return querySelector; },
    get readDisplaySettings(): Dynamic { return readDisplaySettings; },
    get readDocumentLanguage(): Dynamic { return readDocumentLanguage; },
    get readDuplicateSourceFile(): Dynamic { return readDuplicateSourceFile; },
    get readOnly(): Dynamic { return readOnly; },
    get recordRef2(): Dynamic { return recordRef2; },
    get releaseActiveTabRename(): Dynamic { return releaseActiveTabRename; },
    get requestTabRename(): Dynamic { return requestTabRename; },
    get resolveDataOperationControlAbsent(): Dynamic { return resolveDataOperationControlAbsent; },
    get resolveDataOperationControlDataBaseUiFocusGuard(): Dynamic { return resolveDataOperationControlDataBaseUiFocusGuard; },
    get resolveDataOperationControlEngineBound(): Dynamic { return resolveDataOperationControlEngineBound; },
    get resolveDataOperationControlSize(): Dynamic { return resolveDataOperationControlSize; },
    get resolveDataOperationControlValue(): Dynamic { return resolveDataOperationControlValue; },
    get resolveObservabilityBrowserAndOperationEventsReplace2(): Dynamic { return resolveObservabilityBrowserAndOperationEventsReplace2; },
    get resolvePlatformAnnouncementsValue(): Dynamic { return resolvePlatformAnnouncementsValue; },
    get resolvePlatformSessionAndSourcesData(): Dynamic { return resolvePlatformSessionAndSourcesData; },
    get resolvePlatformSessionAndSourcesUnavailable(): Dynamic { return resolvePlatformSessionAndSourcesUnavailable; },
    get resolvePlatformSessionAndSourcesUnavailable2(): Dynamic { return resolvePlatformSessionAndSourcesUnavailable2; },
    get resolvePlatformSessionAndSourcesVerb4(): Dynamic { return resolvePlatformSessionAndSourcesVerb4; },
    get resolvePlatformSyncAndRoutingName(): Dynamic { return resolvePlatformSyncAndRoutingName; },
    get resolvePlatformSyncAndRoutingPath3(): Dynamic { return resolvePlatformSyncAndRoutingPath3; },
    get resolvePlatformSyncAndRoutingPush2(): Dynamic { return resolvePlatformSyncAndRoutingPush2; },
    get room(): Dynamic { return room; },
    get roots(): Dynamic { return roots; },
    get rootsRef(): Dynamic { return rootsRef; },
    get rows(): Dynamic { return rows; },
    get scrollTabRowIntoView(): Dynamic { return scrollTabRowIntoView; },
    get seat(): Dynamic { return seat; },
    get seatRef(): Dynamic { return seatRef; },
    get setDisabled(): Dynamic { return setDisabled; },
    get setDisabled2(): Dynamic { return setDisabled2; },
    get setDisabled3(): Dynamic { return setDisabled3; },
    get setDragging(): Dynamic { return setDragging; },
    get setEditing(): Dynamic { return setEditing; },
    get setEnabledState(): Dynamic { return setEnabledState; },
    get setEnabledState2(): Dynamic { return setEnabledState2; },
    get setEnabledState3(): Dynamic { return setEnabledState3; },
    get setEnabledState4(): Dynamic { return setEnabledState4; },
    get setEnabledState5(): Dynamic { return setEnabledState5; },
    get setEnabledState8(): Dynamic { return setEnabledState8; },
    get setError(): Dynamic { return setError; },
    get setExpanded(): Dynamic { return setExpanded; },
    get setHint(): Dynamic { return setHint; },
    get setKinds(): Dynamic { return setKinds; },
    get setLanguage2(): Dynamic { return setLanguage2; },
    get setSlice(): Dynamic { return setSlice; },
    get setSlice2(): Dynamic { return setSlice2; },
    get setStyle(): Dynamic { return setStyle; },
    get setStyle2(): Dynamic { return setStyle2; },
    get setTabRailState(): Dynamic { return setTabRailState; },
    get setTabRailState2(): Dynamic { return setTabRailState2; },
    get setTabRailState3(): Dynamic { return setTabRailState3; },
    get setTabRailState4(): Dynamic { return setTabRailState4; },
    get setTabRailState5(): Dynamic { return setTabRailState5; },
    get sourceModuleUrl(): string { return import.meta.url; },
    get splashTs(): Dynamic { return splashTs; },
    get subscribeProjectFeed(): Dynamic { return subscribeProjectFeed; },
    get tabIdentityKey(): Dynamic { return tabIdentityKey; },
    get tabIdentityKey2(): Dynamic { return tabIdentityKey2; },
    get tabKeyboardMovePlacement(): Dynamic { return tabKeyboardMovePlacement; },
    get tabMoveAnnouncement(): Dynamic { return tabMoveAnnouncement; },
    get tabPositionAnnouncement(): Dynamic { return tabPositionAnnouncement; },
    get tabRailResult(): Dynamic { return tabRailResult; },
    get tabRailResult2(): Dynamic { return tabRailResult2; },
    get tabRailResult3(): Dynamic { return tabRailResult3; },
    get tabRailState(): Dynamic { return tabRailState; },
    get tabRailState2(): Dynamic { return tabRailState2; },
    get tabRailState3(): Dynamic { return tabRailState3; },
    get tabRailState4(): Dynamic { return tabRailState4; },
    get tabTreeAuthority(): Dynamic { return tabTreeAuthority; },
    get tabTreeLayoutKey(): Dynamic { return tabTreeLayoutKey; },
    get tabsListShownRef(): Dynamic { return tabsListShownRef; },
    get tabsOnPage(): Dynamic { return tabsOnPage; },
    get tabsPlace(): Dynamic { return tabsPlace; },
    get tabsPlaceOffered3(): Dynamic { return tabsPlaceOffered3; },
    get tabsPlaceOffered4(): Dynamic { return tabsPlaceOffered4; },
    get tabsPlaceOffered5(): Dynamic { return tabsPlaceOffered5; },
    get take(): Dynamic { return take; },
    get take2(): Dynamic { return take2; },
    get timers(): Dynamic { return timers; },
    get toast(): Dynamic { return toast; },
    get triggerChrome(): Dynamic { return triggerChrome; },
    get triggerHidden(): Dynamic { return triggerHidden; },
    get updateDataOperationControlEntry(): Dynamic { return updateDataOperationControlEntry; },
    get updateDataOperationControlTabs(): Dynamic { return updateDataOperationControlTabs; },
    get updateElement(): Dynamic { return updateElement; },
    get updateElement2(): Dynamic { return updateElement2; },
    get updateElement4(): Dynamic { return updateElement4; },
    get updateElement5(): Dynamic { return updateElement5; },
    get updatePlatformSyncAndRoutingDirectory(): Dynamic { return updatePlatformSyncAndRoutingDirectory; },
    get updatePlatformSyncAndRoutingEntry(): Dynamic { return updatePlatformSyncAndRoutingEntry; },
    get updateWait(): Dynamic { return updateWait; },
    get useRepeatedTabShortcut2(): Dynamic { return useRepeatedTabShortcut2; },
    get why(): string | undefined { return why; },
  };
  updateCommentsActionsAndSelectionValue(`TabRail`);
  let tabRailResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let tabRailResult2: Dynamic = resolvePlatformSyncAndRoutingValue10();
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [, set]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  let container: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      kind: `project`,
      id: pid,
      ...(version === undefined
        ? {}
        : {
            version: version,
          }),
    }),
    [pid, version],
  );
  let enabledRef: Dynamic = (0, React.useRef)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (enabledRef.current = true),
      (..._extraArguments: unknown[]): undefined => {
        enabledRef.current = false;
        toast.dismiss(AGENT_ADDED_TAB_TOAST_ID);
      }
    ),
    [],
  );
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let querySelector: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef2.current;
      let closest2: Dynamic = element?.closest(`[role="dialog"]`);
      return tabRail === `mouse` || tabRail === `pen`
        ? hasTabMenuFocusTargets(element)
          ? true
          : (closest2 ?? true)
        : tabRail === `touch`
          ? (closest2 ?? true)
          : (element?.querySelector(
              `[role="treeitem"][aria-selected="true"]`,
            ) ??
            element?.querySelector(`[role="treeitem"]`) ??
            element ??
            true);
    },
    [],
  );
  let closest: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef2.current;
      let closest2: Dynamic = element?.closest(`[role="dialog"]`);
      return tabRail === `touch`
        ? (closest2 ?? true)
        : hasTabMenuFocusTargets(element)
          ? true
          : tabRail === `mouse` || tabRail === `pen`
            ? (closest2 ?? true)
            : (element ?? true);
    },
    [],
  );
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let elementRef4: Dynamic = (0, React.useRef)(null);
  let elementRef5: Dynamic = (0, React.useRef)(null);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let enabledRef3: Dynamic = (0, React.useRef)(false);
  let setEnabledState2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      elementRef5.current = null;
      if (enabledRef3.current) {
        enabledRef3.current = false;
        setEnabledState(false);
      }
    },
    [],
  );
  let elementRef6: Dynamic = (0, React.useRef)(null);
  let enabledRef4: Dynamic = (0, React.useRef)(false);
  let elementRef7: Dynamic = (0, React.useRef)(null);
  let onNavigate2: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (onNavigate) {
        onNavigate(tabRail);
      } else {
        set(
          tabRail === undefined
            ? resolveDataContentAndReferencesKind2(container)
            : resolveDataContentAndReferencesKind({
                container: container,
                ref: {
                  noun: `file`,
                  id: tabRail,
                },
              }),
        );
      }
    },
    [onNavigate, set, container],
  );
  let onOpen: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      onUserNavigate?.(tabRail);
      onNavigate2(tabRail);
    },
    [onUserNavigate, onNavigate2],
  );
  let onNavigateRef: Dynamic = (0, React.useRef)(onNavigate2);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onNavigateRef.current = onNavigate2;
    },
    [onNavigate2],
  );
  let [enabledState2, setEnabledState3]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (triggerHidden) {
        setEnabledState3(false);
      }
    },
    [triggerHidden],
  );
  let enabledStateRef: Dynamic = (0, React.useRef)(enabledState2);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      enabledStateRef.current = enabledState2;
    },
    [enabledState2],
  );
  let activeIdRef: Dynamic = (0, React.useRef)(activeId);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      activeIdRef.current = activeId;
    },
    [activeId],
  );
  let [tabRailState, setTabRailState]: Dynamic = (0, React.useState)(null);
  let elementRef8: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      elementRef8.current = tabRailState;
    },
    [tabRailState],
  );
  let [slice, setSlice]: Dynamic = (0, React.useState)(undefined);
  let setSlice2: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let pageSkillSettings: Dynamic =
        tabRail === undefined ? undefined : readPageSkillSettings(tabRail);
      setSlice(
        (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          tabRail2 !== undefined &&
          pageSkillSettings !== undefined &&
          skillSettingsKey(tabRail2) === skillSettingsKey(pageSkillSettings)
            ? tabRail2
            : pageSkillSettings,
      );
    },
    [],
  );
  let [style, setStyle]: Dynamic = (0, React.useState)(undefined);
  let elementRef9: Dynamic = (0, React.useRef)(undefined);
  let countRef: Dynamic = (0, React.useRef)(0);
  let countRef2: Dynamic = (0, React.useRef)(0);
  let enabledRef5: Dynamic = (0, React.useRef)(false);
  let setStyle2: Dynamic = (0, React.useCallback)(
    createTabRailStyleWriter(tabRailLiveContext),
    [],
  );
  let [createTabNavigationSourceFenceState]: Dynamic = (0, React.useState)(
    createTabNavigationSourceFence,
  );
  let fontSettingsKey2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]) =>
      enabledRef5.current || elementRef9.current === undefined
        ? undefined
        : fontSettingsKey(elementRef9.current),
    [],
  );
  let latestStyle: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      enabledRef5.current ? undefined : (elementRef9.current ?? null),
    [],
  );
  let styleReads: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => countRef.current,
    [],
  );
  let [language, setLanguage]: Dynamic = (0, React.useState)(undefined);
  let elementRef10: Dynamic = (0, React.useRef)(undefined);
  let setLanguage2: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef10.current = tabRail;
      setLanguage(tabRail);
    },
    [],
  );
  let [createTabNavigationSourceFenceState2]: Dynamic = (0, React.useState)(
    createTabNavigationSourceFence,
  );
  let tabIdentityKey2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      elementRef10.current === undefined
        ? undefined
        : tabIdentityKey(elementRef10.current),
    [],
  );
  let [error, setError]: Dynamic = (0, React.useState)(null);
  let errorRef: Dynamic = (0, React.useRef)(error);
  errorRef.current = error;
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  let disabledRef: Dynamic = (0, React.useRef)(disabled);
  disabledRef.current = disabled;
  let [expanded, setExpanded]: Dynamic = (0, React.useState)(
    new (Set as Dynamic)(),
  );
  let [editing, setEditing]: Dynamic = (0, React.useState)(null);
  let [tabRailState2, setTabRailState2]: Dynamic = (0, React.useState)(null);
  let [enabledState3, setEnabledState4]: Dynamic = (0, React.useState)(false);
  let [kinds, setKinds]: Dynamic = (0, React.useState)(new (Map as Dynamic)());
  let [dragging, setDragging]: Dynamic = (0, React.useState)(null);
  let [hint, setHint]: Dynamic = (0, React.useState)(null);
  let tabRailResult3: Dynamic = useDataOperationControlRawStart({
    key: `v3TabRail.v2`,
    initial: 256,
    min: 224,
    max: 480,
    edge: `right`,
    cap: useDataOperationControlWidth().width - 32,
  });
  let countRef3: Dynamic = (0, React.useRef)(0);
  let enabledRef6: Dynamic = (0, React.useRef)(false);
  let itemsRef: Dynamic = (0, React.useRef)([]);
  let elementRef11: Dynamic = (0, React.useRef)(null);
  let updateElement: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let tabRailResult4: Dynamic = (elementRef11.current ??=
        new (Set as Dynamic)());
      for (let tabRailResult5 of tabRail.keys() as Dynamic)
        tabRailResult4.add(tabRailResult5);
    },
    [],
  );
  let take: Dynamic = (0, React.useCallback)(
    createTabRailProjectDiff(tabRailLiveContext),
    [
      pid,
      updateElement,
      setSlice2,
      setStyle2,
      createTabNavigationSourceFenceState,
      fontSettingsKey2,
      createTabNavigationSourceFenceState2,
      tabIdentityKey2,
      setLanguage2,
    ],
  );
  let take2: Dynamic = (0, React.useCallback)(
    createTabRailProjectLoader(tabRailLiveContext),
    [
      pid,
      take,
      updateElement,
      setSlice2,
      setStyle2,
      createTabNavigationSourceFenceState,
      fontSettingsKey2,
      createTabNavigationSourceFenceState2,
      tabIdentityKey2,
      setLanguage2,
    ],
  );
  (0, React.useEffect)(
    createTabRailResetProject(tabRailLiveContext),
    [
      pid,
      createTabNavigationSourceFenceState,
      createTabNavigationSourceFenceState2,
      setLanguage2,
      setEnabledState2,
    ],
  );
  let createDocumentFile2: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      loadPlatformSessionAndSourcesAckOf(
        pid,
        createDocumentFile(pid, tabRail),
        apiFetcher,
      ),
    [pid],
  );
  let config: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      loadPlatformSessionAndSourcesAckOf2(pid, tabRail, apiFetcher),
    [pid],
  );
  let onWritten: Dynamic = (0, React.useCallback)(
    async (..._extraArguments: unknown[]): Promise<undefined> => {
      await take2(true);
    },
    [take2],
  );
  let onWritten2: Dynamic = (0, React.useCallback)(
    async (..._extraArguments: unknown[]) =>
      (await take2(true)) !== null && !enabledRef5.current,
    [take2],
  );
  let enabled = !readOnly && room !== undefined;
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      slice === undefined
        ? null
        : {
            pid: pid,
            slice: slice,
            post: enabled ? createDocumentFile2 : undefined,
            config: config,
            onWritten: onWritten,
          },
    [pid, slice, enabled, createDocumentFile2, config, onWritten],
  );
  let onPageSkillRef: Dynamic = (0, React.useRef)(onPageSkill);
  onPageSkillRef.current = onPageSkill;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onPageSkillRef.current?.(memoized);
    },
    [memoized],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onPageSkillRef.current?.(null),
    [],
  );
  let seat: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      style === undefined
        ? null
        : {
            pid: pid,
            typography: parseDocumentFonts(style),
            style: style,
            latestStyle: latestStyle,
            styleReads: styleReads,
            post: enabled ? createDocumentFile2 : undefined,
            onWritten: onWritten2,
          },
    [
      pid,
      style,
      latestStyle,
      styleReads,
      enabled,
      createDocumentFile2,
      onWritten2,
    ],
  );
  let onDocFontRef: Dynamic = (0, React.useRef)(onDocFont);
  onDocFontRef.current = onDocFont;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onDocFontRef.current?.(seat);
    },
    [seat],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onDocFontRef.current?.(null),
    [],
  );
  let memoized2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      language === undefined
        ? null
        : {
            pid: pid,
            language: language,
            post: enabled ? createDocumentFile2 : undefined,
            onWritten: onWritten,
          },
    [pid, language, enabled, createDocumentFile2, onWritten],
  );
  let onDocLanguageRef: Dynamic = (0, React.useRef)(onDocLanguage);
  onDocLanguageRef.current = onDocLanguage;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onDocLanguageRef.current?.(memoized2);
    },
    [memoized2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onDocLanguageRef.current?.(null),
    [],
  );
  (0, React.useEffect)(
    createTabRailRestoreMenuFocus(tabRailLiveContext),
    [enabledState2, tabRailState2],
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let clearActiveTabRename2 = (..._extraArguments: unknown[]): undefined => {
      if (!enabledStateRef.current) {
        clearActiveTabRename();
      }
    };
    window.addEventListener(`blur`, clearActiveTabRename2);
    return (..._extraArguments: unknown[]) =>
      window.removeEventListener(`blur`, clearActiveTabRename2);
  }, []);
  let enabledRef7: Dynamic = (0, React.useRef)(false);
  let elementRef12: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (editing !== null || !enabledRef7.current) return;
      enabledRef7.current = false;
      let element: Dynamic = elementRef12.current;
      elementRef12.current = null;
      if (
        !(
          element !== null &&
          element === activeId &&
          resolveTabNavigation(`room:${pid}/${element}`)
        ) &&
        enabledState2 &&
        (document.activeElement === null ||
          document.activeElement === document.body)
      ) {
        elementRef2.current?.focus();
      }
    },
    [editing, enabledState2, activeId, pid],
  );
  (0, React.useEffect)(
    createTabRailProjectSubscription(tabRailLiveContext),
    [
      pid,
      take2,
      take,
      createTabNavigationSourceFenceState,
      createTabNavigationSourceFenceState2,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (pid.length === 0) return;
      let take3 = (..._extraArguments: unknown[]): undefined => {
        if (document.visibilityState === `visible`) {
          take2();
        }
      };
      window.addEventListener(`focus`, take3);
      document.addEventListener(`visibilitychange`, take3);
      return (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`focus`, take3);
        document.removeEventListener(`visibilitychange`, take3);
      };
    },
    [pid, take2],
  );
  let elementRef13: Dynamic = (0, React.useRef)(undefined);
  (0, React.useEffect)(
    createTabRailExpandActiveAncestors(tabRailLiveContext),
    [activeId, tabRailState],
  );
  let roots: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      tabRailState === null
        ? []
        : updatePlatformSyncAndRoutingEntry(tabRailState),
    [tabRailState],
  );
  let displayNames: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      updateDataOperationControlChildren(roots, pageName),
    [roots, pageName],
  );
  let [presenceBy, splashTs]: Dynamic = (0, React.useMemo)(
    createTabRailPresenceIndex(tabRailLiveContext),
    [presence, tabRailState],
  );
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let deny: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (dragging === null) return null;
      let findTabTreeNode2: Dynamic = findTabTreeNode(roots, dragging);
      return findTabTreeNode2 === undefined
        ? new (Set as Dynamic)([dragging])
        : tabSubtreeIds(findTabTreeNode2);
    },
    [dragging, roots],
  );
  let elementRef14: Dynamic = (0, React.useRef)(null);
  let updateElement2: Dynamic = (0, React.useCallback)(
    createTabRailRenameDraft(tabRailLiveContext),
    [],
  );
  let updateElement3: Dynamic = (0, React.useCallback)(
    createTabRailRenameCommit(tabRailLiveContext),
    [tabRailState, pid, take2, updateElement2],
  );
  let elementRef15: Dynamic = (0, React.useRef)(null);
  let updateElement4: Dynamic = (0, React.useCallback)(
    async (..._extraArguments: unknown[]): Promise<undefined> => {
      if (editing === null) return;
      setEditing(null);
      let updateElement6: Dynamic = updateElement3(editing);
      elementRef15.current = updateElement6;
      try {
        await updateElement6;
      } finally {
        if (elementRef15.current === updateElement6) {
          elementRef15.current = null;
        }
      }
    },
    [editing, updateElement3],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledState2) {
        updateElement4();
      }
    },
    [enabledState2, updateElement4],
  );
  let tabsPlaceOffered2: Dynamic =
    tabsPlaceOffered &&
    !readOnly &&
    !canCreateSpreadsheetTabs() &&
    !tabRailResult2;
  let tabsPlaceOfferedRef: Dynamic = (0, React.useRef)(tabsPlaceOffered2);
  tabsPlaceOfferedRef.current = tabsPlaceOffered2;
  let seatRef: Dynamic = (0, React.useRef)(seat);
  seatRef.current = seat;
  let getTabsPlacementEpoch2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => ({
      picks: getTabsPlacementEpoch(),
      changes: countRef2.current,
    }),
    [],
  );
  let getTabsPlacementEpoch3: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]) =>
      getTabsPlacementEpoch() === tabRail.picks &&
      countRef2.current === tabRail.changes,
    [],
  );
  let [tabRailState3, setTabRailState3]: Dynamic = (0, React.useState)(null);
  let latestStyle2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let seat2: Dynamic = seatRef.current;
      return (
        tabsPlaceOfferedRef.current &&
        seat2 !== null &&
        seat2.post !== undefined &&
        shouldOfferTabsPlacement(seat2.latestStyle(), getTabsPlacement(pid))
      );
    },
    [pid],
  );
  let setTabRailState4: Dynamic = (0, React.useCallback)(
    (
      tabRail?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (tabRail === 1 && getTabsPlacementEpoch3(options) && latestStyle2()) {
        setTabRailState3({
          ...options,
          id: context,
        });
      }
    },
    [getTabsPlacementEpoch3, latestStyle2],
  );
  let callback: Dynamic = (0, React.useCallback)(
    async (..._extraArguments: unknown[]): Promise<undefined> => {
      for (;;) {
        let element: Dynamic = elementRef15.current ?? elementRef14.current;
        if (element === null) return;
        await element;
      }
    },
    [],
  );
  let enabledRef8: Dynamic = (0, React.useRef)(false);
  let tabsListShownRef: Dynamic = (0, React.useRef)(tabsListShown);
  tabsListShownRef.current = tabsListShown;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (enabledRef8.current) {
        if (enabledState2) {
          enabledRef8.current = false;
        } else {
          if (tabsListShown) {
            enabledRef8.current = false;
            resolvePlatformAnnouncementsValue(
              document,
              TABS_MOVED_TO_PAGE_MESSAGE,
              {
                key: `tabs-place`,
              },
            );
          }
        }
      }
    },
    [tabsListShown, enabledState2],
  );
  (0, React.useEffect)(
    createTabRailApplyPendingPlacement(tabRailLiveContext),
    [
      tabRailState3,
      enabledState2,
      editing,
      disabled,
      error,
      getTabsPlacementEpoch3,
      latestStyle2,
      tabRailState,
      callback,
    ],
  );
  let focus: Dynamic = (0, React.useCallback)(
    createTabRailCreateTab(tabRailLiveContext),
    [
      room,
      pid,
      tabRailState,
      take2,
      onNavigate2,
      editing,
      updateElement4,
      getTabsPlacementEpoch2,
      setTabRailState4,
    ],
  );
  let copyLink: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void CopyLinkFallbackUrl(
        resolveCommentsActionsAndSelectionContainer(container, tabRail),
      ),
    [container],
  );
  let probeKind: Dynamic = (0, React.useCallback)(
    createTabRailDuplicateProbe(tabRailLiveContext),
    [room, kinds],
  );
  let setDisabled2: Dynamic = (0, React.useCallback)(
    createTabRailDuplicateTab(tabRailLiveContext),
    [
      room,
      tabRailState,
      take2,
      onNavigate2,
      getTabsPlacementEpoch2,
      setTabRailState4,
    ],
  );
  let setDisabled3: Dynamic = (0, React.useCallback)(
    createTabRailDeleteTab(tabRailLiveContext),
    [
      tabRailState2,
      tabRailState,
      roots,
      enabledState3,
      room,
      pid,
      activeId,
      take2,
      onNavigate2,
      tabRailState3,
    ],
  );
  let updateElement5: Dynamic = (0, React.useCallback)(
    createTabRailMoveTab(tabRailLiveContext),
    [tabRailState, pid, take2, updateElement2],
  );
  let [tabRailState4, setTabRailState5]: Dynamic = (0, React.useState)(null);
  let countRef4: Dynamic = (0, React.useRef)(0);
  let enabledRef9: Dynamic = (0, React.useRef)(false);
  let id2: Dynamic = tabRailState4?.id;
  let moveSavingIds: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]) =>
      id2 === undefined ? null : tabDescendantIds(roots, id2),
    [id2, roots],
  );
  let rootsRef: Dynamic = (0, React.useRef)(roots);
  rootsRef.current = roots;
  let focus2: Dynamic = (0, React.useCallback)(
    createTabRailKeyboardMoveStart(tabRailLiveContext),
    [],
  );
  let focus3: Dynamic = (0, React.useCallback)(
    createTabRailKeyboardMoveCommit(tabRailLiveContext),
    [disabled, editing, room, roots, updateElement5, focus2],
  );
  (0, React.useLayoutEffect)(
    createTabRailKeyboardMoveAnnounce(tabRailLiveContext),
    [tabRailState4, roots, error, enabledState2, focus2],
  );
  let open: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (tabRail !== activeId) {
        onOpen(tabRail);
      }
    },
    [activeId, onOpen],
  );
  let elementRef16: Dynamic = (0, React.useRef)(null);
  elementRef16.current = {
    rename: (
      tabRail?: Dynamic,
      draft?: Dynamic,
      seed?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void updateElement3({
        id: tabRail,
        draft: draft,
        seed: seed,
      }),
    duplicate: (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void setDisabled2(tabRail),
    newTab: (tabRail?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      focus(`doc`, tabRail, true),
    copyLink: copyLink,
    requestDelete: (
      tabRail?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let rootItem: Dynamic = roots.length === 1 ? roots[0] : undefined;
      setEnabledState4(
        rootItem !== undefined &&
          rootItem.id === tabRail &&
          rootItem.children.length > 0,
      );
      setTabRailState2(tabRail);
    },
    move: (
      tabRail?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => updateElement5(tabRail, options, context),
    probeKind: probeKind,
    retry: (..._extraArguments: unknown[]): undefined => void take2(true),
  };
  let ops: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      rename: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.rename as Dynamic)(...tabRail),
      duplicate: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.duplicate as Dynamic)(...tabRail),
      newTab: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.newTab as Dynamic)(...tabRail),
      copyLink: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.copyLink as Dynamic)(...tabRail),
      requestDelete: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.requestDelete as Dynamic)(...tabRail),
      move: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.move as Dynamic)(...tabRail),
      probeKind: (...tabRail: Dynamic[]): Dynamic =>
        (elementRef16.current.probeKind as Dynamic)(...tabRail),
      retry: (..._extraArguments: unknown[]): Dynamic =>
        elementRef16.current.retry(),
    }),
    [],
  );
  let elementRef17: Dynamic = (0, React.useRef)(null);
  let busy: Dynamic = disabled || !room;
  let matchesOnTabsSeat = onTabsSeat !== undefined;
  let Seat: Dynamic = (0, React.useMemo)(
    createTabRailPlacementSeat(tabRailLiveContext),
    [
      matchesOnTabsSeat,
      pid,
      tabRailState,
      roots,
      displayNames,
      activeId,
      readOnly,
      busy,
      kinds,
      error,
      open,
      ops,
    ],
  );
  let onTabsSeatRef: Dynamic = (0, React.useRef)(onTabsSeat);
  onTabsSeatRef.current = onTabsSeat;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onTabsSeatRef.current?.(Seat);
    },
    [Seat],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onTabsSeatRef.current?.(null),
    [],
  );
  let tabsPlaceOffered3: Dynamic =
    tabsPlaceOffered &&
    !readOnly &&
    seat !== null &&
    seat.post !== undefined &&
    !canCreateSpreadsheetTabs();
  let tabsPlaceOffered4: Dynamic = tabsPlaceOffered3 && !tabRailResult2;
  let tabsPlaceOffered5: Dynamic = tabsPlaceOffered3 && tabsOnPage;
  let [enabledState4, setEnabledState5]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (enabledState2) {
        setEnabledState5(true);
      }
    },
    [enabledState2],
  );
  let enabledState5: Dynamic = enabledState4 && !enabledState2;
  let outlineFeed2: Dynamic =
    enabledState2 && !tabsPlaceOffered5 && outlineFeed != null
      ? outlineFeed
      : tabsOutlineStore;
  let matchesActiveId: Dynamic =
    activeId !== undefined &&
    expanded.has(activeId) &&
    (tabRailState === null ||
      [...getPlatformSyncAndRoutingValue2(activeId, tabRailState)].every(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          expanded.has(item),
      ));
  let said: Dynamic = useTabOutline(outlineFeed2, activeId);
  let useSelectedTabHeading2: Dynamic = useSelectedTabHeading(
    matchesActiveId ? outlineFeed2 : tabsOutlineStore,
    activeId,
  );
  let recordRef: Dynamic = (0, React.useRef)({
    tab: undefined,
    said: null,
    at: null,
  });
  if (enabledState2) {
    recordRef.current = {
      tab: activeId,
      said: said,
      at: useSelectedTabHeading2,
    };
  }
  let tabId: Dynamic = enabledState2
    ? activeId
    : enabledState5
      ? recordRef.current.tab
      : undefined;
  let said2: Dynamic = enabledState2
    ? said
    : enabledState5
      ? recordRef.current.said
      : null;
  let useSelectedTabHeading3: Dynamic = enabledState2
    ? useSelectedTabHeading2
    : enabledState5
      ? recordRef.current.at
      : null;
  let rows: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      said2 !== null &&
      onJumpHeading !== undefined &&
      resolveDataOperationControlValue8(said2)
        ? isDataOperationControlIndent(said2)
        : [],
    [said2, onJumpHeading],
  );
  let setEnabledState6: Dynamic = (0, React.useCallback)(
    createTabRailHeadingExpansion(tabRailLiveContext),
    [activeId],
  );
  let onJumpHeading2: Dynamic = (0, React.useCallback)(
    (
      tabRail?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (enabledStateRef.current) {
        if (!options) return onJumpHeading?.(tabRail);
        if (isSpreadsheetTab(elementRef.current))
          return setEnabledState6(tabRail, true);
        onJumpHeading?.(tabRail, true);
      }
    },
    [onJumpHeading, setEnabledState6],
  );
  let onPick: Dynamic = (0, React.useCallback)(
    (
      tabRail?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!(onJumpHeading === undefined || !enabledStateRef.current)) {
        if (!isSpreadsheetTab(elementRef.current))
          return onJumpHeading(tabRail, options);
        onJumpHeading(tabRail);
        setEnabledState6(tabRail, options);
      }
    },
    [onJumpHeading, setEnabledState6],
  );
  let useRepeatedTabShortcut2: Dynamic = useRepeatedTabShortcut(
    onJumpHeading === undefined ? undefined : onJumpHeading2,
  );
  let elementRef18: Dynamic = (0, React.useRef)(null);
  let onRowFocus: Dynamic = (0, React.useCallback)(
    (
      tabRail?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      elementRef18.current = {
        id: tabRail,
        index: index,
      };
      useRepeatedTabShortcut2.arrivedOn(tabRail);
    },
    [useRepeatedTabShortcut2],
  );
  let onRowBlur: Dynamic = (0, React.useCallback)(
    (tabRail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (tabRail) {
        elementRef18.current = null;
      }
      useRepeatedTabShortcut2.drop();
    },
    [useRepeatedTabShortcut2],
  );
  let count: Dynamic =
    tabId === undefined
      ? 0
      : (findTabTreeNode(roots, tabId)?.children.length ?? 0);
  let places: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      collectDataOperationControlPos(rows, count),
    [rows, count],
  );
  let headings: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      tabId === undefined ||
      said2 === null ||
      rows.length === 0 ||
      onJumpHeading === undefined
        ? null
        : {
            tabId: tabId,
            rows: rows,
            places: places,
            marked: collectDataOperationControlFindIndex(
              rows,
              said2,
              useSelectedTabHeading3,
            ),
            onPick: onPick,
            onRowFocus: onRowFocus,
            onRowBlur: onRowBlur,
          },
    [
      tabId,
      said2,
      rows,
      places,
      useSelectedTabHeading3,
      onJumpHeading,
      onPick,
      onRowFocus,
      onRowBlur,
    ],
  );
  let [enabledState6, setEnabledState7]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledState2 && !enabledState5) {
        setEnabledState7(false);
      } else {
        if (enabledState2 && headings !== null) {
          setEnabledState7(true);
        }
      }
    },
    [enabledState2, enabledState5, headings],
  );
  (0, React.useEffect)(createTabRailOutlineFocus(tabRailLiveContext));
  let enabledState7: Dynamic =
    enabledState2 && matchesActiveId && headings !== null;
  let recordRef2: Dynamic = (0, React.useRef)({
    armed: false,
    wait: undefined,
    top: null,
  });
  let timersRef: Dynamic = (0, React.useRef)(timers);
  timersRef.current = timers;
  let updateWait = (..._extraArguments: unknown[]): undefined => {
    timersRef.current?.clear(recordRef2.current.wait);
    recordRef2.current.armed = false;
    recordRef2.current.wait = undefined;
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => updateWait,
    [],
  );
  let contains = createTabRailOutlineScroll(tabRailLiveContext);
  (0, React.useEffect)(
    createTabRailOutlineRefresh(tabRailLiveContext),
    [headings?.marked ?? null],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (enabledState7) {
        contains();
      }
    },
    [enabledState7],
  );
  let onPanelOpenRef: Dynamic = (0, React.useRef)(onPanelOpen);
  onPanelOpenRef.current = onPanelOpen;
  let enabledState8: Dynamic = enabledState2 || enabledState4;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onPanelOpenRef.current?.(enabledState8);
    },
    [enabledState8],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onPanelOpenRef.current?.(false),
    [],
  );
  let onToggle: Dynamic = (
    tabRail?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    setExpanded(
      (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let uniqueItems: Dynamic = new (Set as Dynamic)(tabRail2);
        if (uniqueItems.has(tabRail)) {
          uniqueItems.delete(tabRail);
        } else {
          uniqueItems.add(tabRail);
        }
        return uniqueItems;
      },
    );
  let setEnabledState8 = (
    tabRail?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    setEnabledState2();
    elementRef4.current = tabRail;
    enabledRef2.current = true;
    if (tabRail !== activeId) {
      onOpen(tabRail);
    }
    setEnabledState3(false);
  };
  let onKeyUp = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let outlineRow: Dynamic =
      event.target instanceof Element
        ? event.target.closest(`[role=treeitem]`)?.dataset.outlineRow
        : undefined;
    if (
      outlineRow !== undefined &&
      (event.key === ` ` || event.key === `Enter`)
    ) {
      event.preventDefault();
    }
    useRepeatedTabShortcut2.keyUp(event.key, outlineRow);
  };
  let onKeyDown = createTabRailMenuKeyDown(tabRailLiveContext);
  let elementRef19: Dynamic = (0, React.useRef)(null);
  let onMouseDown = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let closest2: Dynamic =
      event.target instanceof Element
        ? event.target.closest(`[role=treeitem]`)
        : null;
    elementRef19.current =
      editing !== null &&
      closest2 !== null &&
      closest2.dataset.tabId === editing.id
        ? editing.id
        : null;
  };
  let onClick = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef19.current;
    elementRef19.current = null;
    let target: Dynamic = event.target instanceof Element ? event.target : null;
    let closest2: Dynamic = target?.closest(`[role=treeitem]`) ?? null;
    if (
      closest2 === null ||
      !event.currentTarget.contains(closest2) ||
      (target !== closest2 && target?.closest(`button, input, label`) !== null)
    )
      return;
    let tabId2: Dynamic = closest2.dataset.tabId ?? ``;
    if (!(tabId2.length === 0 || tabId2 === element || closest2.tabIndex < 0)) {
      closest2.focus();
      if (tabId2 !== activeId) {
        onOpen(tabId2);
      }
    }
  };
  if (pid.length === 0) return null;
  let matchesTabRailState =
    tabRailState2 !== null &&
    (findTabTreeNode(roots, tabRailState2)?.children.length ?? 0) > 0;
  let disabled2 =
    matchesTabRailState && roots.length === 1 && roots[0].id === tabRailState2;
  let onClick2 = (..._extraArguments: unknown[]): undefined => {
    if (!disabled) {
      focus(`doc`);
    }
  };
  let displayNameEntry: Dynamic =
    triggerChrome === `readout` && activeId !== undefined && !tabsPlaceOffered5
      ? displayNames.get(activeId)
      : undefined;
  let why = tabsPlaceOffered3
    ? tabsPlacementUnavailableReason({
        place: tabsPlace,
        onPage: tabsOnPage,
        tabs: tabRailState === null ? null : countTabTree(roots),
        noRoom: tabsNoRoom,
      })
    : undefined;
  return (
    renderTabRailView(tabRailLiveContext)
  );
}

var TAB_PRESENCE_ANIMATION_MIN: number;

var TAB_PRESENCE_ANIMATION_DURATION: number;

function TabPresenceSplash(
  { rowId: rowId, ts: ts2, played: played }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [playedEntryState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => played.get(rowId) ?? 0,
  );
  return ts2 <= Math.max(playedEntryState, played.get(rowId) ?? 0) ? null : (
    <span onAnimationEnd={(..._extraArguments: unknown[]): undefined => {
  if (ts2 > (played.get(rowId) ?? 0)) {
    played.set(rowId, ts2);
  }
}} className={`animate-presence-splash pointer-events-none absolute inset-0 rounded-md`} key={Math.floor(ts2 / 500)} />
  );
}

function TabRenameInput(
  tabRenameInput?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let uniqueItemsRef: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    elementRef.current?.focus();
    elementRef.current?.select();
    elementRef.current?.parentElement?.scrollIntoView?.({
      block: `nearest`,
    });
  }, []);
  return (
    <input ref={elementRef} type={`text`} autoComplete={`off`} spellCheck={false} className={`-my-0.5 min-w-0 flex-1 border-0 bg-transparent p-0 leading-[calc(1lh+4px)] outline-none`} {...tabRenameInput} onKeyDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  let code: Dynamic = event.code || event.key;
  let isComposing: Dynamic = event.nativeEvent.isComposing;
  if (event.repeat && !isComposing && !uniqueItemsRef.current.has(code)) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (!(isComposing && (code === `Enter` || code === `NumpadEnter`))) {
    uniqueItemsRef.current.add(code);
  }
  tabRenameInput.onKeyDown?.(event);
}} />
  );
}

var TABS_MENU_LABEL: string;

var TABS_MENU_ICON_STYLE: {
    fontVariationSettings: string;
};

var LAST_TAB_DELETE_MESSAGE: string;

var MOVE_TAB_LABEL: string;

var TAB_MOVE_DIRECTIONS: string[];

var TAB_MOVE_LABELS: Dynamic;

var moveIntoTabLabel: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentContextActionsTabRailStep1(): void {
  (TAB_PRESENCE_ANIMATION_MIN = 1);
  (TAB_PRESENCE_ANIMATION_DURATION = 1.5);
  (TABS_MENU_LABEL = `Tabs`);
  (TABS_MENU_ICON_STYLE = {
    fontVariationSettings: `"opsz" 16`,
  });
  (LAST_TAB_DELETE_MESSAGE = `A document needs at least one tab`);
  (MOVE_TAB_LABEL = `Move`);
  (TAB_MOVE_DIRECTIONS = [`up`, `down`, `into`, `out`]);
  (TAB_MOVE_LABELS = {
    up: `Move up`,
    down: `Move down`,
    into: `Move into a tab`,
    out: `Move out one level`,
  });
  (moveIntoTabLabel = (
    moveIntoTabLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    moveIntoTabLabel2 === undefined
      ? TAB_MOVE_LABELS.into
      : `Move into “${moveIntoTabLabel2}”`);
}

export {
  LAST_TAB_DELETE_MESSAGE,
  MOVE_TAB_LABEL,
  TAB_MOVE_DIRECTIONS,
  TAB_MOVE_LABELS,
  TAB_PRESENCE_ANIMATION_DURATION,
  TAB_PRESENCE_ANIMATION_MIN,
  TabPresenceSplash,
  TabRail,
  TabRenameInput,
  moveIntoTabLabel,
};

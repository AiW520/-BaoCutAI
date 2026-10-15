/** BaoCut: document chrome from index-CX4IZqzA.js. */
import type { SidebarEstimateState, SidebarViewport } from "../interop/recovered-contracts";
import type { TabsPlacement } from "../document/style-contracts";
import type { DisplayRecord, TabsPick, FontListener, TabTreeNode, FlatTab, TabMove, TabSiblings, TabPosition, TabDrop, TabKeyboardMove } from "./contracts";
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  mapPreloadDependencies,
} from "./bootstrap";
import {
  EditorHostSize,
  collectDataOperationControlTitle,
  preloadModule,
  resolveDataOperationControlFields3,
  resolvePlatformChunkLoadingLazy2,
  usePlatformFeatureFlagsUseSyncExternalStore,
} from "./dependencies";
import {
  RouteErrorBoundary,
} from "./connection-and-errors/connector-permission-dialog";
import {
  DOC_FONTS_FEATURE,
} from "./run-review";

function TabsListLoadFailure(
  { onLost: onLost }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledRef.current) {
        onLost?.(true);
      }
      enabledRef.current = true;
    },
    [onLost],
  );
  return null;
}

function useStableDocumentIdentity(
  stableDocumentIdentity?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    useStableDocumentIdentityState,
    setUseStableDocumentIdentityState,
  ]: Dynamic = (0, React.useState)(null);
  return [
    useStableDocumentIdentityState === stableDocumentIdentity,
    (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic =>
        setUseStableDocumentIdentityState(stableDocumentIdentity),
      [stableDocumentIdentity],
    ),
  ];
}

var LazyTabsLeftList: Dynamic;

function TabsLeftListGate(
  {
    seat: seat,
    onUp: onUp,
    onLost: onLost,
    onRenaming: onRenaming,
    feed = null,
    onJump: onJump,
    timers: timers,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <RouteErrorBoundary
      component={`tabslist`}
      fallback={<TabsListLoadFailure onLost={onLost} />}
    >
      <React.Suspense fallback={null}>
        <LazyTabsLeftList
          seat={seat}
          onUp={onUp}
          onRenaming={onRenaming}
          feed={feed}
          onJump={onJump}
          timers={timers}
          onLost={onLost}
        />
      </React.Suspense>
    </RouteErrorBoundary>
  );
}

var MAX_TABS_SIDEBAR_WIDTH: number;

function parseTabsSidebarWidth(
  tabsSidebarWidth?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let number = Number.parseFloat(tabsSidebarWidth ?? ``);
  return Number.isFinite(number) &&
    number >= 176 &&
    number <= MAX_TABS_SIDEBAR_WIDTH
    ? number
    : 176;
}

var TABS_SIDEBAR_EXTRA_WIDTH: number;

var sidebarTotalWidth: Dynamic;

function clampSidebarToViewport(
  clampSidebar?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return clampSidebar <= options ||
    (context !== null && context >= sidebarTotalWidth(clampSidebar) - 1)
    ? clampSidebar
    : options;
}

var DEFAULT_TABS_SIDEBAR_TOTAL_WIDTH: Dynamic;

var TABS_SIDEBAR_WIDTH_STEP: number;

function zoomedProseWidth(
  zoomedProseWidth2?: unknown,
  ..._extraArguments: unknown[]
): number | null {
  return typeof zoomedProseWidth2 == `number`
    ? (672 * zoomedProseWidth2) / 100
    : null;
}

function shouldEstimateZoomedSidebar(
  shouldEstimateZoomedSidebar2: SidebarEstimateState,
  ..._extraArguments: unknown[]
): boolean {
  return (
    !shouldEstimateZoomedSidebar2.wide &&
    !shouldEstimateZoomedSidebar2.railDocked &&
    shouldEstimateZoomedSidebar2.layout !== `left` &&
    typeof shouldEstimateZoomedSidebar2.zoom == `number`
  );
}

function estimateTabsSidebarWidth(
  estimateTabsSidebarWidth2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !context ||
    !Number.isFinite(estimateTabsSidebarWidth2) ||
    !Number.isFinite(options)
  )
    return 176;
  let difference =
    (estimateTabsSidebarWidth2 - options) / 2 -
    24 -
    TABS_SIDEBAR_EXTRA_WIDTH -
    48;
  return Math.max(
    176,
    Math.min(
      MAX_TABS_SIDEBAR_WIDTH,
      Math.floor(difference / TABS_SIDEBAR_WIDTH_STEP) *
        TABS_SIDEBAR_WIDTH_STEP,
    ),
  );
}

var BARE_DOCUMENT_WIDTH_THRESHOLD: Dynamic;

var RAIL_DOCUMENT_WIDTH_THRESHOLD: Dynamic;

var LAYOUT_TIER_HYSTERESIS: number;

function classifyDocumentLayoutTier(
  classifyDocumentLayoutTier2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let classifyDocumentLayoutTierHandler = (
    classifyDocumentLayoutTier3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options === null
      ? classifyDocumentLayoutTier2 >= classifyDocumentLayoutTier3
      : options2
        ? classifyDocumentLayoutTier2 >=
          classifyDocumentLayoutTier3 - LAYOUT_TIER_HYSTERESIS
        : classifyDocumentLayoutTier2 >=
          classifyDocumentLayoutTier3 + LAYOUT_TIER_HYSTERESIS;
  return classifyDocumentLayoutTierHandler(
    RAIL_DOCUMENT_WIDTH_THRESHOLD,
    options === `rail`,
  )
    ? `rail`
    : classifyDocumentLayoutTierHandler(
          BARE_DOCUMENT_WIDTH_THRESHOLD,
          options === `rail` || options === `bare`,
        )
      ? `bare`
      : `none`;
}

function canDrawDocumentSidebar(
  drawDocumentSidebar?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    drawDocumentSidebar === `rail` ||
    (drawDocumentSidebar === `bare` && !options)
  );
}

function shouldTakeBareDocumentRail(
  shouldTakeBareDocumentRail2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    shouldTakeBareDocumentRail2.host &&
    shouldTakeBareDocumentRail2.tier === `bare` &&
    shouldTakeBareDocumentRail2.tall &&
    shouldTakeBareDocumentRail2.commentMode !== `list`
  );
}

function shouldShowDocumentRail(
  shouldShowDocumentRail2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    shouldShowDocumentRail2.railOn &&
    !(shouldShowDocumentRail2.takesRail && !shouldShowDocumentRail2.draftHeld)
  );
}

var MIN_DOCUMENT_CHROME_HEIGHT: number;

function hasDocumentSidebarHeight(
  documentSidebarHeight?: Dynamic,
  options: Dynamic = 24,
  ..._extraArguments: unknown[]
) {
  return (
    documentSidebarHeight -
      Math.max(options, MIN_DOCUMENT_CHROME_HEIGHT) -
      24 >=
    96
  );
}

function classifyTabsSidebarVisibility(
  classifyTabsSidebarVisibility2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !classifyTabsSidebarVisibility2.host ||
    classifyTabsSidebarVisibility2.error
    ? `off`
    : classifyTabsSidebarVisibility2.tier === null
      ? `pending`
      : classifyTabsSidebarVisibility2.fits
        ? classifyTabsSidebarVisibility2.lane === null ||
          classifyTabsSidebarVisibility2.lane <
            (classifyTabsSidebarVisibility2.need ??
              DEFAULT_TABS_SIDEBAR_TOTAL_WIDTH) -
              1
          ? `pending`
          : `shown`
        : `noRoom`;
}

function measureTabsSidebarViewport(
  measureTabsSidebarViewport2: unknown,
  options: unknown,
  context: number,
  dependencies: number,
  ..._extraArguments: unknown[]
): SidebarViewport | null {
  if (
    typeof measureTabsSidebarViewport2 != `object` ||
    !measureTabsSidebarViewport2
  )
    return null;
  let { top: measureTabsSidebarViewport3, left: measureTabsSidebarViewport4 } =
    measureTabsSidebarViewport2 as Record<string, unknown>;
  let isFinite2: (value: unknown) => value is number = (
    measureTabsSidebarViewport5?: unknown,
    ..._extraArguments: unknown[]
  ): measureTabsSidebarViewport5 is number =>
    typeof measureTabsSidebarViewport5 == `number` &&
    Number.isFinite(measureTabsSidebarViewport5);
  if (
    !isFinite2(measureTabsSidebarViewport3) ||
    !isFinite2(measureTabsSidebarViewport4) ||
    !isFinite2(options) ||
    options < 0 ||
    !(context > 0) ||
    !(dependencies > 0) ||
    measureTabsSidebarViewport4 < 0 ||
    measureTabsSidebarViewport4 > context / 2
  )
    return null;
  let total = measureTabsSidebarViewport3 + options;
  return total < 0 || total > dependencies - 24 - 96
    ? null
    : {
        left: Math.round(measureTabsSidebarViewport4),
        docTop: Math.round(total),
      };
}

function latestSidebarVisibility(
  event?: Dynamic,
  event2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return event !== undefined &&
    event.key === event2.key &&
    (event.serial > event2.serial ||
      (event.serial === event2.serial && event.state === event2.state))
    ? event
    : event2;
}

function sidebarVisibilityForKey(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return event !== undefined && options !== undefined && event.key === options
    ? event.state
    : `pending`;
}

function rememberSidebarVisibility(
  page2?: Dynamic,
  state?: Dynamic,
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return state === `shown` || state === `noRoom`
    ? page2 !== null && page2.pid === pid && page2.state === state
      ? page2
      : {
          pid: pid,
          state: state,
        }
    : state === `off`
      ? null
      : page2 !== null && page2.pid === pid
        ? page2
        : null;
}

function tabsSidebarDrawingState(
  page2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!page2.onPage || !page2.mounted)
    return {
      drawn: false,
      noRoom: false,
    };
  let state: Dynamic =
    page2.now === `pending` &&
    page2.sure !== null &&
    page2.sure.pid === page2.pid
      ? page2.sure.state
      : null;
  return {
    drawn: page2.now === `shown` || state === `shown`,
    noRoom: page2.now === `noRoom` || state === `noRoom`,
  };
}

var TABS_LOCATION_PROPERTY: "tabsLocation";

var LEFT_TABS_LOCATION: "left";

function isTabsLocationFeatureEnabled(): boolean {
  return usePlatformFeatureFlagsUseSyncExternalStore(DOC_FONTS_FEATURE);
}

function tabsPlacementUnavailableReason(tabsPlacementUnavailableReason2: {
  place: TabsPlacement;
  onPage: boolean;
  noRoom: boolean;
  tabs: number | null;
}): "oneTab" | undefined {
  if (
    !(
      tabsPlacementUnavailableReason2.place !== `left` ||
      tabsPlacementUnavailableReason2.onPage ||
      tabsPlacementUnavailableReason2.noRoom
    )
  )
    return tabsPlacementUnavailableReason2.tabs !== null &&
      tabsPlacementUnavailableReason2.tabs < 2
      ? `oneTab`
      : undefined;
}

var isTabsPlacementObject: (tabsPlacementObject: unknown) => tabsPlacementObject is DisplayRecord;

function parseTabsPlacement(tabsPlacement: unknown): TabsPlacement {
  return isTabsPlacementObject(tabsPlacement) &&
    tabsPlacement.tabsLocation === LEFT_TABS_LOCATION
    ? `left`
    : `default`;
}

function shouldOfferTabsPlacement(
  should: DisplayRecord | null | undefined,
  options: TabsPlacement | null,
): boolean {
  return should === undefined || options !== null
    ? false
    : should === null || !(`tabsLocation` in should);
}

function serializeTabsPlacement(tabsPlacement: TabsPlacement): {
  tabsLocation: "left" | undefined;
} {
  return {
    [TABS_LOCATION_PROPERTY]:
      tabsPlacement === `left` ? LEFT_TABS_LOCATION : undefined,
  };
}

var tabsPlacementPicks: Map<string, TabsPick>;

var tabsPlacementPickEpoch: number;

var tabsPlacementListeners: Set<FontListener>;

var notifyTabsPlacement: () => void;

var getTabsPlacementEpoch: () => number;

function pickTabsPlacement(
  pickTabsPlacement2: string,
  place: TabsPlacement,
): number {
  let token = ++tabsPlacementPickEpoch;
  tabsPlacementPicks.set(pickTabsPlacement2, {
    place: place,
    token: token,
    kept: false,
  });
  notifyTabsPlacement();
  return token;
}

function commitTabsPlacementPick(
  commitTabsPlacementPick2: string,
  options: number,
  context?: TabsPlacement,
): void {
  let tabsPlacementPickEntry = tabsPlacementPicks.get(commitTabsPlacementPick2);
  if (tabsPlacementPickEntry?.token === options) {
    if (context !== undefined && context !== tabsPlacementPickEntry.place) {
      tabsPlacementPicks.delete(commitTabsPlacementPick2);
    } else {
      tabsPlacementPicks.set(commitTabsPlacementPick2, {
        ...tabsPlacementPickEntry,
        kept: true,
      });
    }
    notifyTabsPlacement();
  }
}

function releaseTabsPlacementPick(
  releaseTabsPlacementPick2: string,
  options: number,
): boolean {
  let tabsPlacementPickEntry = tabsPlacementPicks.get(
    releaseTabsPlacementPick2,
  );
  return tabsPlacementPickEntry === undefined
    ? true
    : tabsPlacementPickEntry.token === options
      ? (tabsPlacementPicks.delete(releaseTabsPlacementPick2),
        notifyTabsPlacement(),
        true)
      : false;
}

function clearTabsPlacementPick(clearTabsPlacementPick2: string): void {
  if (tabsPlacementPicks.delete(clearTabsPlacementPick2)) {
    notifyTabsPlacement();
  }
}

var getTabsPlacementPick: (tabsPlacementPick?: string) => TabsPick | null;

var getTabsPlacement: (tabsPlacement?: string) => TabsPlacement | null;

var subscribeTabsPlacement: (tabsPlacement: FontListener) => (() => boolean);

function useTabsPlacement(
  tabsPlacement: string | undefined,
  options: unknown,
): TabsPlacement {
  let isTabsLocationFeatureEnabled2 = isTabsLocationFeatureEnabled();
  let useSyncExternalStore = (0,
  (React as typeof import("react")).useSyncExternalStore)(
    subscribeTabsPlacement,
    () => getTabsPlacementPick(tabsPlacement),
    () => null,
  );
  let tabsPlacement2 = parseTabsPlacement(options);
  (0, (React as typeof import("react")).useEffect)(() => {
    if (isTabsLocationFeatureEnabled2) {
      resolveDataOperationControlFields3();
    }
  }, [isTabsLocationFeatureEnabled2]);
  (0, (React as typeof import("react")).useEffect)(() => {
    if (
      tabsPlacement !== undefined &&
      useSyncExternalStore !== null &&
      useSyncExternalStore.kept &&
      tabsPlacement2 === useSyncExternalStore.place
    ) {
      releaseTabsPlacementPick(tabsPlacement, useSyncExternalStore.token);
    }
  }, [tabsPlacement, tabsPlacement2, useSyncExternalStore]);
  (0, (React as typeof import("react")).useEffect)(() => {
    if (tabsPlacement !== undefined)
      return () => clearTabsPlacementPick(tabsPlacement);
  }, [tabsPlacement]);
  return isTabsLocationFeatureEnabled2
    ? (useSyncExternalStore?.place ?? tabsPlacement2)
    : `default`;
}

var TABS_OUTLINE_STALE_MS: number;

function shouldReadTabsOutline(
  shouldReadTabsOutline2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    shouldReadTabsOutline2.on &&
    shouldReadTabsOutline2.frame &&
    shouldReadTabsOutline2.seat !== null &&
    (shouldReadTabsOutline2.place === `left` ||
      shouldReadTabsOutline2.menuOpen === true)
  );
}

function canShowTabsList(
  showTabsList: {
    roots: readonly TabTreeNode[];
  } | null,
  options: TabsPlacement,
  context: boolean = false,
): boolean {
  if (options !== `left` || showTabsList === null) return false;
  let countTabTree2 = countTabTree(showTabsList.roots);
  return countTabTree2 >= 2 || (countTabTree2 === 1 && context);
}

function countTabTree(countTabTree2: readonly TabTreeNode[]): number {
  let count = 0;
  for (let node of countTabTree2) count += 1 + countTabTree(node.children);
  return count;
}

function flattenTabTree(
  flattenTabTree2: readonly TabTreeNode[],
  depth: number = 0,
  parentId: string | undefined = undefined,
): FlatTab[] {
  return flattenTabTree2.flatMap((node) => [
    {
      node: node,
      depth: depth,
      parentId: parentId,
    },
    ...flattenTabTree(node.children, depth + 1, node.id),
  ]);
}

function collapseTabChildren(
  collapseTabChildren2: readonly TabTreeNode[],
  options: ReadonlySet<string>,
): readonly TabTreeNode[] {
  return options.size === 0
    ? collapseTabChildren2
    : collapseTabChildren2.map((node) =>
        node.children.length === 0
          ? node
          : {
              ...node,
              children: options.has(node.id)
                ? []
                : [...collapseTabChildren(node.children, options)],
            },
      );
}

function tabTreeLayoutKey(
  tabTreeLayoutKey2: readonly TabTreeNode[],
  options: ReadonlyMap<string, string>,
): string {
  return JSON.stringify(
    flattenTabTree(tabTreeLayoutKey2).map(({ node: node, depth: depth }) => [
      depth,
      node.id,
      options.get(node.id) ?? ``,
      node.entry.name ?? ``,
    ]),
  );
}

function tabDropPlacement(
  tabDropPlacement2: readonly TabTreeNode[],
  parent: string,
  context: TabDrop,
): TabMove | undefined {
  let flattenTabTree2 = flattenTabTree(tabDropPlacement2);
  let flattenTabTree3 = flattenTabTree2.find(
    (flattenTabTree4) => flattenTabTree4.node.id === parent,
  );
  if (!flattenTabTree3) return;
  if (context === `into`)
    return {
      parent: parent,
      beforeId: undefined,
    };
  if (context === `before`)
    return {
      parent: flattenTabTree3.parentId,
      beforeId: parent,
    };
  if (flattenTabTree3.node.children.length > 0)
    return {
      parent: parent,
      beforeId: flattenTabTree3.node.children[0].id,
    };
  let mappedFilteredFlattenTabTree = flattenTabTree2
    .filter(
      (flattenTabTree4) =>
        flattenTabTree4.parentId === flattenTabTree3.parentId &&
        flattenTabTree4.depth === flattenTabTree3.depth,
    )
    .map((filteredFlattenTabTree) => filteredFlattenTabTree.node.id);
  return {
    parent: flattenTabTree3.parentId,
    beforeId:
      mappedFilteredFlattenTabTree[
        mappedFilteredFlattenTabTree.indexOf(parent) + 1
      ],
  };
}

function findTabSiblingSet(
  sibs: readonly TabTreeNode[],
  options: string,
  parentId: string | undefined = undefined,
): TabSiblings | undefined {
  let sibIndex = sibs.findIndex((item) => item.id === options);
  if (sibIndex >= 0)
    return {
      sibs: sibs,
      i: sibIndex,
      parentId: parentId,
    };
  for (let node of sibs) {
    let findTabSiblingSet2 = findTabSiblingSet(node.children, options, node.id);
    if (findTabSiblingSet2) return findTabSiblingSet2;
  }
}

function tabKeyboardMovePlacement(
  tabKeyboardMovePlacement2: readonly TabTreeNode[],
  options: string,
  context: TabKeyboardMove,
): TabMove | undefined {
  let findTabSiblingSet2 = findTabSiblingSet(
    tabKeyboardMovePlacement2,
    options,
  );
  if (!findTabSiblingSet2) return;
  let {
    sibs: findTabSiblingSet3,
    i: findTabSiblingSet4,
    parentId: parent,
  } = findTabSiblingSet2;
  if (context === `up`)
    return findTabSiblingSet4 > 0
      ? {
          parent: parent,
          beforeId: findTabSiblingSet3[findTabSiblingSet4 - 1].id,
        }
      : undefined;
  if (context === `down`)
    return findTabSiblingSet4 < findTabSiblingSet3.length - 1
      ? {
          parent: parent,
          beforeId: findTabSiblingSet3[findTabSiblingSet4 + 2]?.id,
        }
      : undefined;
  if (context === `into`)
    return findTabSiblingSet4 > 0
      ? {
          parent: findTabSiblingSet3[findTabSiblingSet4 - 1].id,
          beforeId: undefined,
        }
      : undefined;
  if (parent === undefined) return;
  let findTabSiblingSet5 = findTabSiblingSet(tabKeyboardMovePlacement2, parent);
  return findTabSiblingSet5
    ? {
        parent: findTabSiblingSet5.parentId,
        beforeId: findTabSiblingSet5.sibs[findTabSiblingSet5.i + 1]?.id,
      }
    : undefined;
}

function tabPositionAnnouncement(
  tabPositionAnnouncement2: readonly TabTreeNode[],
  options: string,
): TabPosition | undefined {
  let findTabSiblingSet2 = findTabSiblingSet(tabPositionAnnouncement2, options);
  return findTabSiblingSet2
    ? {
        parentId: findTabSiblingSet2.parentId,
        pos: findTabSiblingSet2.i + 1,
        size: findTabSiblingSet2.sibs.length,
      }
    : undefined;
}

function tabDescendantIds(
  tabDescendantIds2: readonly TabTreeNode[],
  options: string,
): Set<string> {
  let uniqueItems = new Set([options]);
  let tabDescendantIdsHandler: (node: TabTreeNode, active: boolean) => void = (
    node,
    options2,
  ) => {
    let options3 = options2 || node.id === options;
    if (options3) {
      uniqueItems.add(node.id);
    }
    node.children.forEach((children) =>
      tabDescendantIdsHandler(children, options3),
    );
  };
  tabDescendantIds2.forEach((item) => tabDescendantIdsHandler(item, false));
  return uniqueItems;
}

var TABS_OUTLINE_HOLD_MS: number;

var TABS_OUTLINE_RETRY_MS: number;

var EMPTY_TABS_OUTLINE_STATE: {
    open: undefined;
    said: null;
    at: null;
    pick: null;
};

var clearTabsOutlinePick: Dynamic;

function reduceTabsOutline(
  activity?: Dynamic,
  activity2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (activity2.type) {
    case `outline`: {
      if (activity2.fileId !== activity.open) return activity;
      let key: Dynamic = collectDataOperationControlTitle(activity2.outline);
      return activity.said !== null &&
        activity.said.fileId === activity2.fileId &&
        activity.said.key === key
        ? activity
        : {
            ...activity,
            said: {
              fileId: activity2.fileId,
              outline: activity2.outline,
              key: key,
            },
            pick: null,
          };
    }
    case `at`:
      return activity2.fileId !== activity.open ||
        (activity.at !== null &&
          activity.at.fileId === activity2.fileId &&
          activity.at.at === activity2.at)
        ? activity
        : {
            ...activity,
            at: {
              fileId: activity2.fileId,
              at: activity2.at,
            },
          };
    case `pick`:
      return activity2.fileId === activity.open
        ? {
            ...activity,
            pick: {
              fileId: activity2.fileId,
              id: activity2.id,
              when: activity2.now,
            },
          }
        : activity;
    case `personScrolled`:
      return activity2.fileId === activity.open &&
        activity.pick !== null &&
        activity2.now - activity.pick.when >= TABS_OUTLINE_RETRY_MS
        ? clearTabsOutlinePick(activity)
        : activity;
    case `pageScrolled`:
      return activity2.fileId === activity.open
        ? clearTabsOutlinePick(activity)
        : activity;
    case `expire`:
      return activity.pick !== null && activity.pick.when === activity2.when
        ? clearTabsOutlinePick(activity)
        : activity;
    case `tab`:
      return activity2.fileId === activity.open
        ? activity
        : {
            ...activity,
            open: activity2.fileId,
            pick: null,
          };
  }
}

var getTabOutline: Dynamic;

function getSelectedHeading(
  activity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return activity.pick !== null && activity.pick.fileId === options
    ? activity.pick.id
    : activity.at !== null && activity.at.fileId === options
      ? activity.at.at
      : null;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentChromeStep1(): void {
  (LazyTabsLeftList = resolvePlatformChunkLoadingLazy2(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../document-tabs/left-list").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.TabsLeftListFed,
            }),
          ),
        mapPreloadDependencies([17, 1, 6, 2, 0, 3]),
        import.meta.url,
      ),
    TabsListLoadFailure,
  ));
  (MAX_TABS_SIDEBAR_WIDTH = 320);
  (TABS_SIDEBAR_EXTRA_WIDTH = 48);
  (sidebarTotalWidth = (
    sidebar?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => 24 + sidebar + TABS_SIDEBAR_EXTRA_WIDTH);
  (DEFAULT_TABS_SIDEBAR_TOTAL_WIDTH = sidebarTotalWidth(176));
  (TABS_SIDEBAR_WIDTH_STEP = 8);
  (BARE_DOCUMENT_WIDTH_THRESHOLD = DEFAULT_TABS_SIDEBAR_TOTAL_WIDTH + 672 + EditorHostSize);
  (RAIL_DOCUMENT_WIDTH_THRESHOLD = DEFAULT_TABS_SIDEBAR_TOTAL_WIDTH + 672 + 32 + 320);
  (LAYOUT_TIER_HYSTERESIS = 20);
  (MIN_DOCUMENT_CHROME_HEIGHT = 64);
  (TABS_LOCATION_PROPERTY = `tabsLocation`);
  (LEFT_TABS_LOCATION = `left`);
  (isTabsPlacementObject = (
    tabsPlacementObject: unknown,
  ): tabsPlacementObject is DisplayRecord =>
    typeof tabsPlacementObject == `object` &&
    !!tabsPlacementObject &&
    !Array.isArray(tabsPlacementObject));
  (tabsPlacementPicks = new Map());
  (tabsPlacementPickEpoch = 0);
  (tabsPlacementListeners = new Set());
  (notifyTabsPlacement = (): void => {
    for (let notifyTabsPlacementResult of tabsPlacementListeners)
      notifyTabsPlacementResult();
  });
  (getTabsPlacementEpoch = (): number => tabsPlacementPickEpoch);
  (getTabsPlacementPick = (tabsPlacementPick?: string): TabsPick | null =>
    (tabsPlacementPick === undefined
      ? undefined
      : tabsPlacementPicks.get(tabsPlacementPick)) ?? null);
  (getTabsPlacement = (tabsPlacement?: string): TabsPlacement | null =>
    getTabsPlacementPick(tabsPlacement)?.place ?? null);
  (subscribeTabsPlacement = (tabsPlacement: FontListener): (() => boolean) => (
    tabsPlacementListeners.add(tabsPlacement),
    () => tabsPlacementListeners.delete(tabsPlacement)
  ));
  (TABS_OUTLINE_STALE_MS = 1e3);
  (TABS_OUTLINE_HOLD_MS = 4e3);
  (TABS_OUTLINE_RETRY_MS = TABS_OUTLINE_STALE_MS);
  (EMPTY_TABS_OUTLINE_STATE = {
    open: undefined,
    said: null,
    at: null,
    pick: null,
  });
  (clearTabsOutlinePick = (
    clearTabsOutlinePick2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    clearTabsOutlinePick2.pick === null
      ? clearTabsOutlinePick2
      : {
          ...clearTabsOutlinePick2,
          pick: null,
        });
  (getTabOutline = (
    tabOutline?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    tabOutline.said !== null && tabOutline.said.fileId === options
      ? tabOutline.said.outline
      : null);
}

export {
  EMPTY_TABS_OUTLINE_STATE,
  TABS_OUTLINE_HOLD_MS,
  TabsLeftListGate,
  canDrawDocumentSidebar,
  canShowTabsList,
  clampSidebarToViewport,
  classifyDocumentLayoutTier,
  classifyTabsSidebarVisibility,
  clearTabsPlacementPick,
  collapseTabChildren,
  commitTabsPlacementPick,
  countTabTree,
  estimateTabsSidebarWidth,
  findTabSiblingSet,
  flattenTabTree,
  getSelectedHeading,
  getTabOutline,
  getTabsPlacement,
  getTabsPlacementEpoch,
  getTabsPlacementPick,
  hasDocumentSidebarHeight,
  isTabsLocationFeatureEnabled,
  isTabsPlacementObject,
  latestSidebarVisibility,
  measureTabsSidebarViewport,
  notifyTabsPlacement,
  parseTabsPlacement,
  parseTabsSidebarWidth,
  pickTabsPlacement,
  reduceTabsOutline,
  releaseTabsPlacementPick,
  rememberSidebarVisibility,
  serializeTabsPlacement,
  shouldEstimateZoomedSidebar,
  shouldOfferTabsPlacement,
  shouldReadTabsOutline,
  shouldShowDocumentRail,
  shouldTakeBareDocumentRail,
  sidebarTotalWidth,
  sidebarVisibilityForKey,
  subscribeTabsPlacement,
  tabDescendantIds,
  tabDropPlacement,
  tabKeyboardMovePlacement,
  tabPositionAnnouncement,
  tabTreeLayoutKey,
  tabsPlacementUnavailableReason,
  tabsSidebarDrawingState,
  useStableDocumentIdentity,
  useTabsPlacement,
  zoomedProseWidth,
};

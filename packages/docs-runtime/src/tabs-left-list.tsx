/** tabs-left-list: restored from TabsLeftList-c8GRwyIM.js. */
import { originalJsxsProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  HM as loadReact,
  Q as resolvePlatformLiveDocumentAndHistoryShown,
  UE as loadJsxRuntime,
  Z as resolvePlatformLiveDocumentAndHistoryGet2,
  _k as EditorExtensionsMoreActions,
  as as isDataOperationControlIndent,
  do as resolveDataOperationControlDataBaseUiFocusGuard,
  es as collectDataOperationControlFindIndex,
  hC as Button,
  iE as UiOverlaysAndIconsCustomIcon,
  is as resolveDataOperationControlValue8,
  kp as resolvePlatformAnnouncementsValue,
  os as collectDataOperationControlPos,
  pl as resolvePlatformSyncAndRoutingCompact,
  po as resolveDataOperationControlByKey,
  xC as Tooltip,
  ys as resolvePlatformSyncAndRoutingUntitled,
} from "./platform-core";
import { L as fieldSurfaceClasses, j as Menu } from "./cds";
import {
  $ as useRepeatedTabShortcut,
  B as tabRowMenuItems,
  G as resolveTabNavigation,
  H as tabMoveAvailability,
  Q as overflowTitle,
  U as tabOpenedAnnouncement,
  V as tabMoveAnnouncement,
  X as TabsHeadingRow,
  Z as tabOutlineToggleLabel,
  at as tabKeyboardMovePlacement,
  ct as collapseTabChildren,
  et as tabsOutlineStore,
  it as tabDropPlacement,
  nt as useTabOutline,
  ot as tabPositionAnnouncement,
  rt as flattenTabTree,
  st as tabDescendantIds,
  tt as useSelectedTabHeading,
  z as TabRenameInput,
  zt as IconButton,
} from "./docs-app";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var TAB_DRAG_MIME_TYPE: Dynamic = `application/x-bongo-v3-tab-left`;
var TAB_ICON_SCALE: Dynamic = 0.875;
var TAB_EDGE_PADDING: Dynamic = `calc(0.75rem * var(--cds-rem-scale, 1))`;
var TAB_ROOT_PADDING_STYLE: Dynamic = {
  paddingLeft: TAB_EDGE_PADDING,
};
var TAB_INDENT_STEP: Dynamic = 3;
var TAB_HOVER_OPEN_MS: Dynamic = 230;
var TAB_ICON_WIDTH: Dynamic = 20;
var TAB_BRANCH_GUTTER: Dynamic = `calc(${TAB_ICON_WIDTH}px + 0.125rem)`;
var ROW_ACTIONS_HIDDEN_CLASS: Dynamic = `flex w-0 flex-none overflow-hidden`;
var ROW_ACTIONS_SHOWN_CLASSES: Dynamic = [
  `group-hover/row:-ml-1.5 group-hover/row:w-auto group-hover/row:overflow-visible`,
  `group-focus-within/row:-ml-1.5 group-focus-within/row:w-auto group-focus-within/row:overflow-visible`,
  `has-[[data-popup-open]]:-ml-1.5 has-[[data-popup-open]]:w-auto has-[[data-popup-open]]:overflow-visible`,
  `pointer-coarse:-ml-1.5 pointer-coarse:w-auto pointer-coarse:overflow-visible`,
].join(` `);
var dropPositionOf = (event?: Dynamic, ..._extraArguments: unknown[]) => {
  let rowBounds: Dynamic = event.currentTarget.getBoundingClientRect();
  let offsetY: Dynamic = event.clientY - rowBounds.top;
  return offsetY < rowBounds.height * 0.25
    ? `before`
    : offsetY > rowBounds.height * 0.75
      ? `after`
      : `into`;
};
function scrollRowIntoView(
  container?: Dynamic,
  row?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (container.clientHeight === 0) return false;
  let rowBounds: Dynamic = row.getBoundingClientRect();
  let containerBounds: Dynamic = container.getBoundingClientRect();
  if (rowBounds.top < containerBounds.top) {
    container.scrollTop -= containerBounds.top - rowBounds.top + 4;
  } else {
    if (rowBounds.bottom > containerBounds.bottom) {
      container.scrollTop += rowBounds.bottom - containerBounds.bottom + 4;
    }
  }
  return true;
}
function watchScrollEdges(
  container?: Dynamic,
  enabled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let clearEdges = (..._extraArguments: unknown[]): undefined => {
    container.removeAttribute(`data-more-above`);
    container.removeAttribute(`data-more-below`);
  };
  if (!enabled) {
    clearEdges();
    return clearEdges;
  }
  let updateEdges = (..._extraArguments: unknown[]): undefined => {
    container.toggleAttribute(`data-more-above`, container.scrollTop > 1);
    container.toggleAttribute(
      `data-more-below`,
      container.scrollTop + container.clientHeight < container.scrollHeight - 1,
    );
  };
  updateEdges();
  container.addEventListener(`scroll`, updateEdges, {
    passive: true,
  });
  return (..._extraArguments: unknown[]): undefined => {
    container.removeEventListener(`scroll`, updateEdges);
    clearEdges();
  };
}
function TabsLeftList(
  {
    seat: seat,
    onUp: onUp,
    onRenaming: onRenaming,
    outline = null,
    timers: timers,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mode: Dynamic = resolvePlatformSyncAndRoutingCompact();
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      onUp?.(true),
      (..._extraArguments: unknown[]): Dynamic => onUp?.(false)
    ),
    [onUp],
  );
  let {
    roots: roots,
    displayNames: displayNames,
    activeId: activeId,
    readOnly: readOnly,
    busy: busy,
    kinds: kinds,
    ops: ops,
  }: Dynamic = seat;
  let expandedTabsStore: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryGet2(seat.pid),
    [seat.pid],
  );
  let expandedTabs: Dynamic = expandedTabsStore.use();
  let allRows: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => flattenTabTree(roots),
    [roots],
  );
  let branchIds: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      new (Set as Dynamic)(
        allRows
          .filter(
            (allRow?: Dynamic, ..._extraArguments: unknown[]) =>
              allRow.node.children.length > 0,
          )
          .map(
            (
              filteredAllRow?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => filteredAllRow.node.id,
          ),
      ),
    [allRows],
  );
  let branchIdsRef: Dynamic = (0, React.useRef)(branchIds);
  branchIdsRef.current = branchIds;
  let expandedBranchIds: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      new (Set as Dynamic)(
        [...expandedTabs].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            branchIds.has(item),
        ),
      ),
    [expandedTabs, branchIds],
  );
  let visibleTree: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      collapseTabChildren(roots, expandedBranchIds),
    [roots, expandedBranchIds],
  );
  let visibleRows: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => flattenTabTree(visibleTree),
    [visibleTree],
  );
  let activeTabVisible: Dynamic = visibleRows.some(
    (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
      visibleRow.node.id === activeId,
  );
  let setBranchExpanded: Dynamic = (0, React.useCallback)(
    (
      tabsLeftList?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let expandedTabsStoreEntry: Dynamic = expandedTabsStore.get();
      if (
        expandedTabsStoreEntry.has(tabsLeftList) === options ||
        (options && !branchIdsRef.current.has(tabsLeftList))
      )
        return;
      let uniqueItems: Dynamic = new (Set as Dynamic)(
        [...expandedTabsStoreEntry].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item !== tabsLeftList && branchIdsRef.current.has(item),
        ),
      );
      if (options) {
        uniqueItems.add(tabsLeftList);
      }
      expandedTabsStore.set(uniqueItems);
    },
    [expandedTabsStore],
  );
  let activeAncestors: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookup: Dynamic = new (Map as Dynamic)(
        allRows.map(
          (allRow?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
            allRow.node.id,
            allRow,
          ],
        ),
      );
      let items: Dynamic = [];
      let lookupEntry: Dynamic =
        activeId === undefined ? undefined : lookup.get(activeId);
      for (
        ;
        lookupEntry !== undefined && !items.includes(lookupEntry.node.id);

      ) {
        items.push(lookupEntry.node.id);
        lookupEntry =
          lookupEntry.parentId === undefined
            ? undefined
            : lookup.get(lookupEntry.parentId);
      }
      return items.length > 0 ? items : undefined;
    },
    [allRows, activeId],
  );
  let [renameFailure, setRenameFailure]: Dynamic = (0, React.useState)();
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let label: Dynamic =
        activeAncestors === undefined
          ? undefined
          : `${seat.pid}/${activeAncestors.join(`/`)}`;
      if (!(activeAncestors === undefined || label === renameFailure)) {
        setRenameFailure(label);
        for (let tabsLeftListResult of activeAncestors.slice(1) as Dynamic)
          setBranchExpanded(tabsLeftListResult, false);
      }
    },
    [activeAncestors, seat.pid, renameFailure, setBranchExpanded],
  );
  let siblingDirectory: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookup: Dynamic = new (Map as Dynamic)();
      for (let tabsLeftListResult of visibleRows as Dynamic) {
        let parentId: Dynamic = tabsLeftListResult.parentId ?? ``;
        let lookupEntry: Dynamic = lookup.get(parentId);
        if (lookupEntry) {
          lookupEntry.push(tabsLeftListResult.node.id);
        } else {
          lookup.set(parentId, [tabsLeftListResult.node.id]);
        }
      }
      let lookup2: Dynamic = new (Map as Dynamic)();
      for (let items of lookup.values() as Dynamic)
        items.forEach(
          (
            item?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            lookup2.set(item, {
              size: items.length,
              pos: index + 1,
              prev: items[index - 1],
            }),
        );
      return lookup2;
    },
    [visibleRows],
  );
  let previousSiblingName: Dynamic = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let previousSibling: Dynamic = siblingDirectory.get(tabId)?.prev;
    return previousSibling === undefined
      ? undefined
      : (displayNames.get(previousSibling) ?? ``);
  };
  let canEdit: Dynamic = !readOnly;
  let singleTab: Dynamic = allRows.length === 1;
  let listRef: Dynamic = (0, React.useRef)(null);
  let treeRef: Dynamic = (0, React.useRef)(null);
  let outlineDocument: Dynamic = outline?.outline ?? null;
  let outlineRows: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      outlineDocument === null
        ? []
        : isDataOperationControlIndent(outlineDocument),
    [outlineDocument],
  );
  let hasActiveOutline: Dynamic =
    activeId !== undefined &&
    resolveDataOperationControlValue8(outlineDocument);
  let outlineExpandedStore: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryShown(seat.pid),
    [seat.pid],
  );
  let expandedOutlineTab: Dynamic = outlineExpandedStore.use();
  let activeOutlineExpanded: Dynamic =
    hasActiveOutline && expandedOutlineTab === activeId && activeTabVisible;
  let outlineCursor: Dynamic = outline?.at ?? null;
  let activeOutlineId: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      outlineDocument === null
        ? null
        : collectDataOperationControlFindIndex(
            outlineRows,
            outlineDocument,
            outlineCursor,
          ),
    [outlineRows, outlineDocument, outlineCursor],
  );
  let activeChildCount: Dynamic = visibleRows.filter(
    (visibleRow?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      visibleRow.parentId === activeId && activeId !== undefined,
  ).length;
  let visibleOutlineRows: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      collectDataOperationControlPos(outlineRows, activeChildCount),
    [outlineRows, activeChildCount],
  );
  let outlineRootCount: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      outlineRows.filter(
        (outlineRow?: Dynamic, ..._extraArguments: unknown[]) =>
          outlineRow.indent === 0,
      ).length,
    [outlineRows],
  );
  let listId: Dynamic = (0, React.useId)();
  let outlineScrollRef: Dynamic = (0, React.useRef)(null);
  let [outlineRowLimit, setOutlineRowLimit]: Dynamic = (0, React.useState)(
    null,
  );
  let activeIdRef: Dynamic = (0, React.useRef)(activeId);
  activeIdRef.current = activeId;
  let hasOutlineRef: Dynamic = (0, React.useRef)(hasActiveOutline);
  hasOutlineRef.current = hasActiveOutline;
  let toggleActiveOutline: Dynamic = (0, React.useCallback)(
    (tabsLeftList?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let activeId2: Dynamic = activeIdRef.current;
      if (
        activeId2 === undefined ||
        !hasOutlineRef.current ||
        (tabsLeftList !== undefined && tabsLeftList !== activeId2)
      )
        return;
      let matchesOutlineExpandedStoreEntry: Dynamic =
        outlineExpandedStore.get() === activeId2;
      let activeElement: Dynamic = (document as Dynamic).activeElement;
      if (
        matchesOutlineExpandedStoreEntry &&
        activeElement instanceof (HTMLElement as Dynamic) &&
        activeElement.closest(`[data-outline-row]`) !== null &&
        listRef.current?.contains(activeElement)
      ) {
        listRef.current
          .querySelector(`[data-tab-row="${CSS.escape(activeId2)}"]`)
          ?.focus({
            preventScroll: true,
          });
      }
      outlineExpandedStore.set(
        matchesOutlineExpandedStoreEntry ? null : activeId2,
      );
    },
    [outlineExpandedStore],
  );
  let rowExpansion: Dynamic = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let hasOutline: Dynamic = tabId === activeId && hasActiveOutline;
    let hasChildren: Dynamic = branchIds.has(tabId);
    if (!hasOutline && !hasChildren) return null;
    let outlineExpanded: Dynamic = hasOutline && activeOutlineExpanded;
    let childrenCollapsed: Dynamic =
      hasChildren && !expandedBranchIds.has(tabId);
    let allClosed: Dynamic =
      outlineExpanded === hasOutline && childrenCollapsed === hasChildren;
    let [nextOutlineExpanded, nextChildrenExpanded]: Dynamic = allClosed
      ? [outlineExpanded, childrenCollapsed]
      : [hasOutline && !outlineExpanded, hasChildren && !childrenCollapsed];
    return {
      expanded: allClosed,
      names:
        nextOutlineExpanded && nextChildrenExpanded
          ? `both`
          : nextOutlineExpanded
            ? `headings`
            : `subtabs`,
    };
  };
  let toggleRow = (
    tabId?: Dynamic,
    expanded?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      tabId === activeId &&
      hasActiveOutline &&
      activeOutlineExpanded !== expanded
    ) {
      toggleActiveOutline(tabId);
    }
    setBranchExpanded(tabId, !expanded);
  };
  let previousPageRef: Dynamic = (0, React.useRef)({
    pid: seat.pid,
    id: activeId,
  });
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let previousPage: Dynamic = previousPageRef.current;
      if (!(activeId === undefined && previousPage.pid === seat.pid)) {
        previousPageRef.current = {
          pid: seat.pid,
          id: activeId,
        };
        setFocusedOutlineId(null);
        if (
          !(
            previousPage.pid !== seat.pid ||
            previousPage.id === undefined ||
            activeId === undefined ||
            previousPage.id === activeId
          ) &&
          outlineExpandedStore.get() === previousPage.id
        ) {
          outlineExpandedStore.set(null);
        }
      }
    },
    [activeId, seat.pid, outlineExpandedStore],
  );
  let outlineHoverState: Dynamic = (0, React.useRef)({});
  let timersRef: Dynamic = (0, React.useRef)(timers);
  timersRef.current = timers;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        timersRef.current?.clear(outlineHoverState.current.wait),
    [],
  );
  let clearOutlineHover: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    outlineHoverState.current.did = undefined;
    let { wait: timer }: Dynamic = outlineHoverState.current;
    return timer === undefined
      ? false
      : (timersRef.current?.clear(timer),
        (outlineHoverState.current.wait = undefined),
        true);
  };
  let hoverOutline: Dynamic = (
    tabId?: Dynamic,
    depth?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (depth >= 2) {
      if (outlineHoverState.current.wait !== undefined) {
        timers?.clear(outlineHoverState.current.wait);
      }
      outlineHoverState.current.wait = undefined;
      return;
    }
    let expandOutline = (..._extraArguments: unknown[]): undefined => {
      outlineHoverState.current.wait = undefined;
      let previousExpandedId: Dynamic = outlineExpandedStore.get();
      toggleActiveOutline(tabId);
      outlineHoverState.current.did =
        outlineExpandedStore.get() === previousExpandedId
          ? undefined
          : {
              id: tabId,
              was: previousExpandedId,
            };
    };
    clearOutlineHover();
    if (!canEdit || timers === undefined) return expandOutline();
    outlineHoverState.current.wait = timers.set(
      expandOutline,
      TAB_HOVER_OPEN_MS,
    );
  };
  let undoOutlineHover = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let { did: previousHover }: Dynamic = outlineHoverState.current;
    clearOutlineHover();
    if (canEdit && previousHover !== undefined && previousHover.id === tabId) {
      outlineExpandedStore.set(previousHover.was);
    }
  };
  let [renameDraft, setRenameDraft]: Dynamic = (0, React.useState)(null);
  let renameDraftRef: Dynamic = (0, React.useRef)(null);
  let updateRenameDraft = (
    draft?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    renameDraftRef.current = draft;
    setRenameDraft(draft);
  };
  let renamingVisibleRow: Dynamic =
    renameDraft !== null &&
    visibleRows.some(
      (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
        visibleRow.node.id === renameDraft.id,
    );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onRenaming?.(renamingVisibleRow);
    },
    [renamingVisibleRow, onRenaming],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        onRenaming?.(false),
    [onRenaming],
  );
  let [draggedId, setDraggedId]: Dynamic = (0, React.useState)(null);
  let [dropTarget, setDropTarget]: Dynamic = (0, React.useState)(null);
  let draggedSubtreeIds: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      draggedId === null ? null : tabDescendantIds(roots, draggedId),
    [draggedId, roots],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          draggedId === null ||
          visibleRows.some(
            (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
              visibleRow.node.id === draggedId,
          )
        )
      ) {
        setDraggedId(null);
        setDropTarget(null);
      }
    },
    [draggedId, visibleRows],
  );
  let [focusedTabId, setFocusedTabId]: Dynamic = (0, React.useState)(null);
  let isVisibleTab: Dynamic = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    tabId != null &&
    visibleRows.some(
      (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
        visibleRow.node.id === tabId,
    );
  let tabStopId: Dynamic = isVisibleTab(focusedTabId)
    ? focusedTabId
    : isVisibleTab(activeId)
      ? activeId
      : visibleRows[0]?.node.id;
  let [focusedOutlineId, setFocusedOutlineId]: Dynamic = (0, React.useState)(
    null,
  );
  let outlineTabStopId: Dynamic =
    activeOutlineExpanded &&
    focusedOutlineId !== null &&
    outlineRows.some(
      (outlineRow?: Dynamic, ..._extraArguments: unknown[]) =>
        outlineRow.id === focusedOutlineId,
    )
      ? focusedOutlineId
      : null;
  let focusedElementRef: Dynamic = (0, React.useRef)(null);
  let outlineJumpTracker: Dynamic = useRepeatedTabShortcut(outline?.jump);
  let outlineUnsubscribeRef: Dynamic = (0, React.useRef)(null);
  let [moveFailure, setMoveFailure]: Dynamic = (0, React.useState)(null);
  let moveSequenceRef: Dynamic = (0, React.useRef)(0);
  let movePendingRef: Dynamic = (0, React.useRef)(false);
  let rootsRef: Dynamic = (0, React.useRef)(roots);
  rootsRef.current = roots;
  let tabElement: Dynamic = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    listRef.current?.querySelector(`[data-tab-row="${CSS.escape(tabId)}"]`) ??
    null;
  let focusableRows: Dynamic = (..._extraArguments: unknown[]): Dynamic => [
    ...(listRef.current?.querySelectorAll(
      `[data-tab-row], [data-outline-row], [data-tab-add]`,
    ) ?? []),
  ];
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let tree: Dynamic = treeRef.current;
      if (!tree) return;
      let tabsLeftListHandler: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let activeElement: Dynamic = tree.querySelector(
          `[aria-current="page"]`,
        );
        return activeElement === null
          ? tree.clientHeight > 0
          : scrollRowIntoView(tree, activeElement);
      };
      if (tabsLeftListHandler()) return;
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        (..._extraArguments: unknown[]): undefined => {
          if (tabsLeftListHandler()) {
            resizeObserver.disconnect();
          }
        },
      );
      resizeObserver.observe(tree);
      return (..._extraArguments: unknown[]): Dynamic =>
        resizeObserver.disconnect();
    },
    [renameFailure, allRows.length],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let tree: Dynamic = treeRef.current;
      let outlineScroll: Dynamic = outlineScrollRef.current;
      let parentElement: Dynamic = listRef.current?.parentElement;
      if (!activeOutlineExpanded || !tree || !outlineScroll || !parentElement)
        return setOutlineRowLimit(null);
      let tabsLeftListHandler: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let outlineRow: Dynamic =
          outlineScroll.querySelector(`[data-outline-row]`);
        let maxHeight2: Dynamic = parseFloat(
          getComputedStyle(parentElement).maxHeight,
        );
        if (
          outlineRow === null ||
          outlineRow.offsetHeight === 0 ||
          !Number.isFinite(maxHeight2)
        )
          return setOutlineRowLimit(null);
        let rowHeight: Dynamic = outlineRow.offsetHeight + 1;
        let containerStyle: Dynamic = getComputedStyle(outlineScroll);
        let verticalPadding: Dynamic =
          parseFloat(containerStyle.paddingTop) +
          parseFloat(containerStyle.paddingBottom);
        let nonOutlineHeight: Dynamic =
          tree.scrollHeight -
          outlineScroll.offsetHeight +
          (listRef.current.offsetHeight - tree.offsetHeight);
        let rowLimit: Dynamic = Math.max(
          TAB_INDENT_STEP,
          Math.floor(
            (maxHeight2 - nonOutlineHeight + 1 - verticalPadding) / rowHeight,
          ),
        );
        setOutlineRowLimit(
          rowLimit >= outlineRows.length
            ? null
            : rowLimit * rowHeight - 1 + verticalPadding,
        );
      };
      tabsLeftListHandler();
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        tabsLeftListHandler,
      );
      resizeObserver.observe(parentElement);
      let maxHeight: Dynamic = parentElement.style.maxHeight;
      let mutationObserver: Dynamic = new (MutationObserver as Dynamic)(
        (..._extraArguments: unknown[]): undefined => {
          if (parentElement.style.maxHeight !== maxHeight) {
            maxHeight = parentElement.style.maxHeight;
            tabsLeftListHandler();
          }
        },
      );
      mutationObserver.observe(parentElement, {
        attributes: true,
        attributeFilter: [`style`],
      });
      return (..._extraArguments: unknown[]): undefined => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    },
    [activeOutlineExpanded, outlineRows.length, visibleRows.length, seat.error],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let outlineScroll: Dynamic = outlineScrollRef.current;
      return outlineScroll
        ? watchScrollEdges(outlineScroll, outlineRowLimit !== null)
        : undefined;
    },
    [outlineRowLimit, outlineRows.length, activeOutlineExpanded],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!activeOutlineExpanded || activeOutlineId === null) return;
      let matchedElement: Dynamic = outlineScrollRef.current?.querySelector(
        `[aria-current="location"]`,
      );
      let tree: Dynamic =
        outlineRowLimit === null ? treeRef.current : outlineScrollRef.current;
      if (matchedElement && tree) {
        scrollRowIntoView(tree, matchedElement);
      }
    },
    [activeOutlineExpanded, activeOutlineId, outlineRowLimit],
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let outlineUnsubscribe: Dynamic = outlineUnsubscribeRef.current;
    if (outlineUnsubscribe === null || isVisibleTab(outlineUnsubscribe)) return;
    outlineUnsubscribeRef.current = null;
    let activeElement: Dynamic = (document as Dynamic).activeElement;
    if (
      activeElement === null ||
      activeElement === (document as Dynamic).body
    ) {
      (tabStopId ? tabElement(tabStopId) : null)?.focus({
        preventScroll: true,
      });
    }
  });
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    let focusedElement: Dynamic = focusedElementRef.current;
    if (focusedElement === null) return;
    let activeElement: Dynamic = (document as Dynamic).activeElement;
    if (
      activeElement !== null &&
      activeElement !== (document as Dynamic).body
    ) {
      if (
        !(
          activeElement instanceof (HTMLElement as Dynamic) &&
          activeElement.dataset.outlineRow === focusedElement.id
        )
      ) {
        focusedElementRef.current = null;
      }
      return;
    }
    focusedElementRef.current = null;
    outlineJumpTracker.drop();
    if (
      listRef.current?.querySelector(
        `[data-outline-row="${CSS.escape(focusedElement.id)}"]`,
      )
    )
      return;
    let items: Dynamic = [
      ...(listRef.current?.querySelectorAll(`[data-outline-row]`) ?? []),
    ];
    (
      items[Math.min(focusedElement.index, items.length - 1)] ??
      (activeId === undefined ? null : tabElement(activeId))
    )?.focus({
      preventScroll: true,
    });
  });
  let focusTabRow: Dynamic = (0, React.useCallback)(
    (
      tabsLeftList?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let matchedElement: Dynamic =
        listRef.current?.querySelector(
          `[data-tab-row="${CSS.escape(tabsLeftList)}"]`,
        ) ?? null;
      if (
        matchedElement !== null &&
        resolveDataOperationControlDataBaseUiFocusGuard(
          (document as Dynamic).activeElement,
          matchedElement,
          matchedElement.querySelector(`[data-tab-menu]`),
          options.menus,
        )
      ) {
        matchedElement.focus({
          preventScroll: true,
          focusVisible: options.byKey,
        });
        if (treeRef.current) {
          scrollRowIntoView(treeRef.current, matchedElement);
        }
      }
    },
    [],
  );
  let moveTab = async (
    tabId?: Dynamic,
    target?: Dynamic,
    byKey?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (
      !canEdit ||
      busy ||
      movePendingRef.current ||
      renameDraftRef.current !== null
    )
      return;
    let placement: Dynamic = tabKeyboardMovePlacement(roots, tabId, target);
    let oldPlacement: Dynamic = tabPositionAnnouncement(roots, tabId);
    if (placement === undefined || oldPlacement === undefined) return;
    let sequence: Dynamic = ++moveSequenceRef.current;
    movePendingRef.current = true;
    setMoveFailure({
      token: sequence,
      id: tabId,
      step: target,
      from: oldPlacement,
      pick: byKey,
      written: null,
    });
    if (placement.parent !== undefined) {
      setBranchExpanded(placement.parent, false);
    }
    let result: Dynamic = await ops.move(
      tabId,
      placement.parent,
      placement.beforeId,
    );
    if (result === `moved` || result === `accepted`) {
      setMoveFailure(
        (tabsLeftList?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          tabsLeftList?.token === sequence
            ? {
                ...tabsLeftList,
                written: rootsRef.current,
              }
            : tabsLeftList,
      );
      return;
    }
    movePendingRef.current = false;
    setMoveFailure(
      (tabsLeftList?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        tabsLeftList?.token === sequence ? null : tabsLeftList,
    );
    focusTabRow(tabId, byKey);
  };
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (moveFailure === null || moveFailure.written === null) return;
      let tabsLeftListResult: Dynamic = tabPositionAnnouncement(
        roots,
        moveFailure.id,
      );
      let matchesTabsLeftListResult: Dynamic =
        tabsLeftListResult !== undefined &&
        tabsLeftListResult.parentId === moveFailure.from.parentId &&
        tabsLeftListResult.pos === moveFailure.from.pos;
      if (
        !(
          matchesTabsLeftListResult &&
          roots === moveFailure.written &&
          seat.error === null
        )
      ) {
        movePendingRef.current = false;
        setMoveFailure(null);
        if (!(tabsLeftListResult === undefined || matchesTabsLeftListResult)) {
          focusTabRow(moveFailure.id, moveFailure.pick);
          resolvePlatformAnnouncementsValue(
            listRef.current?.ownerDocument ?? document,
            tabMoveAnnouncement(moveFailure.step, tabsLeftListResult),
            {
              key: `tab-move`,
            },
          );
        }
      }
    },
    [moveFailure, roots, seat.error, focusTabRow],
  );
  let renameInputRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let renameInput: Dynamic = renameInputRef.current;
      renameInputRef.current = null;
      if (renameInput === null || renameInput !== activeId) return;
      let list: Dynamic = listRef.current;
      if (list === null || !list.contains(list.ownerDocument.activeElement))
        return;
      let tabsLeftListResult: Dynamic = tabPositionAnnouncement(
        rootsRef.current,
        renameInput,
      );
      if (tabsLeftListResult !== undefined) {
        resolvePlatformAnnouncementsValue(
          list.ownerDocument,
          tabOpenedAnnouncement(tabsLeftListResult),
          {
            key: `tab-open`,
          },
        );
      }
    },
    [activeId],
  );
  let renameFocusRequestRef: Dynamic = (0, React.useRef)(null);
  let finishRename: Dynamic = (0, React.useCallback)(
    (
      tabsLeftList?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let renameDraft2: Dynamic = renameDraftRef.current;
      if (renameDraft2 !== null) {
        updateRenameDraft(null);
        renameFocusRequestRef.current = {
          id: renameDraft2.id,
          byKey: options,
        };
        if (tabsLeftList) {
          ops.rename(renameDraft2.id, renameDraft2.draft, renameDraft2.seed);
        }
      }
    },
    [ops],
  );
  let finishRenameRef: Dynamic = (0, React.useRef)(finishRename);
  finishRenameRef.current = finishRename;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        finishRenameRef.current(true, false),
    [],
  );
  let renamingCollapsedRow: Dynamic =
    renameDraft !== null &&
    !renamingVisibleRow &&
    allRows.some(
      (allRow?: Dynamic, ..._extraArguments: unknown[]) =>
        allRow.node.id === renameDraft.id,
    );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (renamingCollapsedRow) {
        finishRename(true, false);
      }
    },
    [renamingCollapsedRow, finishRename],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (renameDraft !== null || renameFocusRequestRef.current === null)
        return;
      let { id: renameFocusRequest, byKey: renameFocusRequest2 }: Dynamic =
        renameFocusRequestRef.current;
      renameFocusRequestRef.current = null;
      if (renameFocusRequest2) {
        if (
          !(
            renameFocusRequest === activeId &&
            resolveTabNavigation(`room:${seat.pid}/${renameFocusRequest}`)
          )
        ) {
          tabElement(renameFocusRequest)?.focus({
            preventScroll: true,
          });
        }
      }
    },
    [renameDraft, activeId, seat.pid],
  );
  let beginRename = (
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!canEdit || busy || moveFailure?.id === tabId) return;
    if (
      renameDraftRef.current !== null &&
      renameDraftRef.current.id !== tabId
    ) {
      finishRename(true, false);
    }
    let displayName: Dynamic = displayNames.get(tabId) ?? ``;
    let savedName: Dynamic = visibleRows.find(
      (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
        visibleRow.node.id === tabId,
    )?.node.entry.name;
    updateRenameDraft({
      id: tabId,
      draft: displayName,
      seed: resolvePlatformSyncAndRoutingUntitled(savedName)
        ? displayName
        : (savedName ?? displayName),
    });
  };
  let createPendingRef: Dynamic = (0, React.useRef)(false);
  let createTab = async (
    parentId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (!(!canEdit || busy || createPendingRef.current)) {
      createPendingRef.current = true;
      try {
        finishRename(true, false);
        if (parentId !== undefined) {
          setBranchExpanded(parentId, false);
        }
        let result: Dynamic = await ops.newTab(parentId);
        if (result) {
          updateRenameDraft({
            id: result.id,
            draft: result.name,
            seed: result.name,
          });
        }
      } finally {
        createPendingRef.current = false;
      }
    }
  };
  let handleOutlineKey = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let outlineRowId: Dynamic =
      event.target.closest(`[data-outline-row]`)?.dataset.outlineRow;
    if (
      outlineRowId !== undefined &&
      (event.key === ` ` || event.key === `Enter`)
    ) {
      event.preventDefault();
    }
    outlineJumpTracker.keyUp(event.key, outlineRowId);
  };
  let handleTreeKey: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    outlineJumpTracker.anyKeyDown(event);
    let target: Dynamic = event.target;
    if (
      (event.key === `Enter` || event.key === ` `) &&
      (event.altKey || event.ctrlKey || event.metaKey)
    ) {
      let outlineRow: Dynamic = target.closest(`[data-outline-row]`);
      if (outlineRow !== null && target !== outlineRow) {
        event.preventDefault();
      }
    }
    if (
      event.nativeEvent.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    let row: Dynamic = target.closest(
      `[data-tab-row], [data-outline-row], [data-tab-add]`,
    );
    if (!row || (target !== row && row.dataset.outlineRow === undefined))
      return;
    let rows: Dynamic = focusableRows();
    let rowIndex: Dynamic = rows.indexOf(row);
    let focusRow = (
      row2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (row2) {
        event.preventDefault();
        row2.focus({
          preventScroll: true,
        });
        row2.scrollIntoView?.({
          block: `nearest`,
        });
      }
    };
    if (event.key === `ArrowDown`)
      return focusRow(rows[Math.min(rows.length - 1, rowIndex + 1)]);
    if (event.key === `ArrowUp`)
      return focusRow(rows[Math.max(0, rowIndex - 1)]);
    if (event.key === `Home`) return focusRow(rows[0]);
    if (event.key === `End`) return focusRow(rows[rows.length - 1]);
    let outlineId: Dynamic = row.dataset.outlineRow;
    if (outlineId !== undefined) {
      if (event.key === `ArrowLeft`) {
        let outlineIndex: Dynamic = outlineRows.findIndex(
          (outlineRow?: Dynamic, ..._extraArguments: unknown[]) =>
            outlineRow.id === outlineId,
        );
        let parentOutline: Dynamic =
          outlineIndex < 0
            ? undefined
            : outlineRows
                .slice(0, outlineIndex)
                .findLast(
                  (outlineRowsSlice?: Dynamic, ..._extraArguments: unknown[]) =>
                    outlineRowsSlice.indent < outlineRows[outlineIndex].indent,
                );
        return focusRow(
          parentOutline === undefined
            ? activeId === undefined
              ? null
              : tabElement(activeId)
            : listRef.current?.querySelector(
                `[data-outline-row="${CSS.escape(parentOutline.id)}"]`,
              ),
        );
      }
      if (event.key === `Enter` || event.key === ` `) {
        event.preventDefault();
        let headingLevel: Dynamic = outlineRows.find(
          (outlineRow?: Dynamic, ..._extraArguments: unknown[]) =>
            outlineRow.id === outlineId,
        )?.h;
        if (event.repeat || headingLevel === undefined || outline === null)
          return;
        outlineJumpTracker.press(outlineId, headingLevel, event.key);
      }
      return;
    }
    let tabId: Dynamic = row.dataset.tabRow;
    if (tabId === undefined) return;
    let tabRow: Dynamic = visibleRows.find(
      (visibleRow?: Dynamic, ..._extraArguments: unknown[]) =>
        visibleRow.node.id === tabId,
    );
    let hasOutline: Dynamic = tabId === activeId && hasActiveOutline;
    let expansion: Dynamic = rowExpansion(tabId);
    if (
      event.key === `ArrowRight` ||
      event.key === `ArrowLeft` ||
      event.key === `F2`
    ) {
      clearOutlineHover();
    }
    if (event.key === `ArrowRight`) {
      if (expansion === null || (event.preventDefault(), event.repeat)) return;
      if (!expansion.expanded) return toggleRow(tabId, true);
      if (hasOutline && activeOutlineExpanded)
        return focusRow(listRef.current?.querySelector(`[data-outline-row]`));
      let firstChild: Dynamic = tabRow?.node.children[0];
      return focusRow(
        firstChild === undefined ? null : tabElement(firstChild.id),
      );
    }
    if (event.key === `ArrowLeft`) {
      if (expansion?.expanded === true) {
        event.preventDefault();
        if (!event.repeat) {
          toggleRow(tabId, false);
        }
        return;
      }
      return expansion !== null && event.repeat
        ? event.preventDefault()
        : focusRow(
            tabRow?.parentId === undefined ? null : tabElement(tabRow.parentId),
          );
    }
    if (event.key === `Enter` || event.key === ` `) {
      event.preventDefault();
      clearOutlineHover();
      if (hasOutline) {
        if (!event.repeat) {
          toggleActiveOutline();
        }
        return;
      }
      if (event.repeat) return;
      if (tabId !== activeId) {
        renameInputRef.current = tabId;
      }
      seat.open(tabId);
    } else if (event.key === `F2`) {
      event.preventDefault();
      beginRename(tabId);
    } else {
      if (
        event.key === `ContextMenu` ||
        (event.key === `F10` && event.shiftKey)
      ) {
        event.preventDefault();
        row.querySelector(`[data-tab-menu]`)?.click();
      }
    }
  };
  let isInsideIconGutter = (event?: Dynamic, ..._extraArguments: unknown[]) =>
    event.clientX <
    (treeRef.current?.getBoundingClientRect().left ?? 0) + TAB_ICON_WIDTH;
  let dropOnRow = (
    event?: Dynamic,
    tabId?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let draggedTab: Dynamic =
      event.dataTransfer.getData(TAB_DRAG_MIME_TYPE) || draggedId;
    let position: Dynamic = dropPositionOf(event);
    setDropTarget(null);
    setDraggedId(null);
    if (
      !draggedTab ||
      draggedId === null ||
      !canEdit ||
      busy ||
      renameDraftRef.current !== null ||
      draggedSubtreeIds?.has(tabId)
    )
      return;
    let dropPlacement: Dynamic = tabDropPlacement(visibleTree, tabId, position);
    if (dropPlacement) {
      if (position === `into`) {
        setBranchExpanded(tabId, false);
      }
      ops.move(draggedTab, dropPlacement.parent, dropPlacement.beforeId);
    }
  };
  let dropAtRoot = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let draggedTab: Dynamic =
      event.dataTransfer.getData(TAB_DRAG_MIME_TYPE) || draggedId;
    setDropTarget(null);
    setDraggedId(null);
    if (
      draggedTab &&
      draggedId !== null &&
      canEdit &&
      !busy &&
      renameDraftRef.current === null
    ) {
      ops.move(draggedTab, undefined);
    }
  };
  let handleRootDragOver = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        !event.dataTransfer.types.includes(TAB_DRAG_MIME_TYPE) ||
        draggedId === null
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = `move`;
      if (dropTarget !== `tail`) {
        setDropTarget(`tail`);
      }
    }
  };
  return (
    <nav
      ref={listRef}
      aria-label={`Tabs`}
      className={`relative flex min-h-0 flex-col`}
      onKeyDown={handleTreeKey}
      onKeyUp={handleOutlineKey}
      data-testid={`tabs-left-list`}
    >
      <div
        ref={treeRef}
        className={`flex min-h-0 flex-col overflow-y-auto overscroll-contain p-0.5 pb-2 forced-colors:scroll-py-1 forced-colors:px-1 forced-colors:pt-1`}
        style={{
          marginLeft: -20,
          paddingLeft: TAB_BRANCH_GUTTER,
        }}
        onDragOver={(
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (event.target === event.currentTarget) {
            if (isInsideIconGutter(event)) {
              setDropTarget(null);
            } else {
              handleRootDragOver(event);
            }
          }
        }}
        onDrop={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            !(event.target !== event.currentTarget || isInsideIconGutter(event))
          ) {
            event.preventDefault();
            dropAtRoot(event);
          }
        }}
      >
        <div
          role={`tree`}
          aria-label={`Tabs`}
          className={`flex flex-col gap-px`}
        >
          {visibleRows.map(
            (
              { node: node, depth: depth, parentId: parentId }: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let id: Dynamic = node.id;
              let outlineRootCount2: Dynamic =
                activeOutlineExpanded &&
                parentId !== undefined &&
                parentId === activeId
                  ? outlineRootCount
                  : 0;
              let displayNameEntry: Dynamic = displayNames.get(id) ?? ``;
              let matchesId: Dynamic = id === activeId;
              let matchesId2: Dynamic = renameDraft?.id === id;
              let zone: Dynamic =
                dropTarget !== null &&
                dropTarget !== `tail` &&
                dropTarget.id === id
                  ? dropTarget.zone
                  : null;
              let jsx: Dynamic = (
                <button
                  type={`button`}
                  tabIndex={-1}
                  draggable={false}
                  className={`gap-sm text-body min-h-control compact:px-2 comfortable:px-2.5 flex min-w-0 flex-1 items-center rounded text-left focus-visible:outline-none ${matchesId ? `text-primary font-medium` : `text-secondary`}`}
                  onClick={(
                    tabsLeftList?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    tabElement(id)?.focus({
                      preventScroll: true,
                    });
                    renameInputRef.current = null;
                    if (matchesId && hasActiveOutline)
                      return hoverOutline(id, tabsLeftList.detail);
                    clearOutlineHover();
                    seat.open(id);
                  }}
                  onDoubleClick={(..._extraArguments: unknown[]): undefined => {
                    undoOutlineHover(id);
                    beginRename(id);
                  }}
                  data-testid={`tabs-left-tab-${id}`}
                >
                  <span
                    data-tab-name={id}
                    className={`-my-0.5 min-w-0 flex-1 truncate py-0.5`}
                    style={TAB_ROOT_PADDING_STYLE}
                  >
                    {displayNameEntry}
                  </span>
                </button>
              );
              let matchesId3: Dynamic = matchesId && hasActiveOutline;
              let rowExpansion2: Dynamic = rowExpansion(id);
              return (
                <React.Fragment
                  {...originalJsxsProps(
                    {
                      children: [
                        <div
                          role={`treeitem`}
                          aria-expanded={rowExpansion2?.expanded}
                          aria-owns={
                            matchesId3 && activeOutlineExpanded
                              ? listId
                              : undefined
                          }
                          aria-level={depth + 1}
                          aria-setsize={
                            (siblingDirectory.get(id)?.size ?? 0) +
                              outlineRootCount2 || undefined
                          }
                          aria-posinset={
                            (siblingDirectory.get(id)?.pos ?? 0) +
                              outlineRootCount2 || undefined
                          }
                          aria-current={matchesId ? `page` : undefined}
                          aria-label={displayNameEntry}
                          tabIndex={
                            id === tabStopId &&
                            !matchesId2 &&
                            outlineTabStopId === null
                              ? 0
                              : -1
                          }
                          data-tab-row={id}
                          onFocus={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (event.target === event.currentTarget) {
                              setFocusedTabId(id);
                              setFocusedOutlineId(null);
                            }
                          }}
                          className={`group/row focus-visible:ring-fill-accent relative flex items-center rounded focus-visible:ring-1 focus-visible:outline-hidden focus-visible:ring-inset ${matchesId2 ? `` : matchesId ? `bg-fill-ghost-selected` : `hover:bg-fill-ghost-hover`} ${zone === `into` ? `ring-strong ring-1` : ``} ${draggedId === id ? `opacity-40` : ``}`}
                          style={
                            depth > 0
                              ? {
                                  paddingLeft: `${depth * TAB_ICON_SCALE}rem`,
                                }
                              : undefined
                          }
                          draggable={canEdit && !matchesId2 && !busy}
                          onDragStart={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): Dynamic => {
                            if (isInsideIconGutter(event))
                              return event.preventDefault();
                            clearOutlineHover();
                            event.dataTransfer.setData(TAB_DRAG_MIME_TYPE, id);
                            event.dataTransfer.effectAllowed = `move`;
                            setDraggedId(id);
                          }}
                          onDragEnd={(
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            setDraggedId(null);
                            setDropTarget(null);
                          }}
                          onDragOver={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (
                              !event.dataTransfer.types.includes(
                                TAB_DRAG_MIME_TYPE,
                              ) ||
                              draggedId === null
                            )
                              return;
                            event.preventDefault();
                            event.stopPropagation();
                            if (draggedSubtreeIds?.has(id)) {
                              event.dataTransfer.dropEffect = `none`;
                              if (zone !== null) {
                                setDropTarget(null);
                              }
                              return;
                            }
                            event.dataTransfer.dropEffect = `move`;
                            let dropPositionOf2: Dynamic =
                              dropPositionOf(event);
                            if (zone !== dropPositionOf2) {
                              setDropTarget({
                                id: id,
                                zone: dropPositionOf2,
                              });
                            }
                          }}
                          onDragLeave={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (
                              !event.currentTarget.contains(
                                event.relatedTarget,
                              ) &&
                              zone !== null
                            ) {
                              setDropTarget(null);
                            }
                          }}
                          onDrop={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (
                              event.dataTransfer.types.includes(
                                TAB_DRAG_MIME_TYPE,
                              )
                            ) {
                              event.preventDefault();
                              event.stopPropagation();
                              dropOnRow(event, id);
                            }
                          }}
                        >
                          {rowExpansion2 !== null && !matchesId2 ? (
                            <button
                              type={`button`}
                              tabIndex={-1}
                              draggable={false}
                              aria-label={tabOutlineToggleLabel(
                                rowExpansion2.names,
                                rowExpansion2.expanded,
                                displayNameEntry,
                              )}
                              className={`text-muted hover:text-primary absolute inset-y-0 flex items-center justify-center ${draggedId === null ? `` : `pointer-events-none`}`}
                              style={{
                                left: `calc(-1 * ${TAB_BRANCH_GUTTER})`,
                                width: TAB_ICON_WIDTH,
                              }}
                              onClick={(
                                ..._extraArguments: unknown[]
                              ): undefined => {
                                tabElement(id)?.focus({
                                  preventScroll: true,
                                });
                                clearOutlineHover();
                                toggleRow(id, !rowExpansion2.expanded);
                              }}
                              data-testid={`tabs-left-toggle-${id}`}
                            >
                              <UiOverlaysAndIconsCustomIcon
                                name={
                                  rowExpansion2.expanded
                                    ? `CaretDown`
                                    : `CaretRight`
                                }
                                size={`xs`}
                              />
                            </button>
                          ) : null}
                          {matchesId2 ? (
                            <label
                              className={`gap-sm text-body text-primary min-h-control compact:px-2 comfortable:px-2.5 flex min-w-0 flex-1 cursor-text items-center self-stretch rounded ${fieldSurfaceClasses} focus-within:shadow-focus ${matchesId ? `font-medium` : ``}`}
                              onMouseDown={(
                                event?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): undefined => {
                                if (
                                  !(
                                    event.target instanceof
                                    (HTMLInputElement as Dynamic)
                                  )
                                ) {
                                  event.preventDefault();
                                }
                              }}
                            >
                              <TabRenameInput
                                aria-label={`Tab name`}
                                style={TAB_ROOT_PADDING_STYLE}
                                value={renameDraft.draft}
                                onChange={(
                                  event?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): undefined => {
                                  let renameDraft2: Dynamic =
                                    renameDraftRef.current;
                                  if (renameDraft2 !== null) {
                                    updateRenameDraft({
                                      ...renameDraft2,
                                      draft: event.target.value,
                                    });
                                  }
                                }}
                                onBlur={(
                                  ..._extraArguments: unknown[]
                                ): Dynamic => finishRename(true, false)}
                                onKeyDown={(
                                  event?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): undefined => {
                                  if (!event.nativeEvent.isComposing) {
                                    event.stopPropagation();
                                    if (event.key === `Enter`) {
                                      event.preventDefault();
                                      finishRename(true, true);
                                    } else {
                                      if (event.key === `Escape`) {
                                        event.preventDefault();
                                        event.nativeEvent.stopImmediatePropagation();
                                        finishRename(false, true);
                                      }
                                    }
                                  }
                                }}
                                data-testid={`tabs-left-rename-${id}`}
                              />
                            </label>
                          ) : (
                            <Tooltip
                              lazy={true}
                              content={(
                                ..._extraArguments: unknown[]
                              ): Dynamic =>
                                overflowTitle(
                                  listRef.current?.querySelector(
                                    `[data-tab-name="${CSS.escape(id)}"]`,
                                  ),
                                  displayNameEntry,
                                )
                              }
                              side={`right`}
                            >
                              {jsx}
                            </Tooltip>
                          )}
                          <span
                            className={`${ROW_ACTIONS_HIDDEN_CLASS} ${matchesId2 ? `invisible` : ROW_ACTIONS_SHOWN_CLASSES}`}
                          >
                            <Menu
                              align={`start`}
                              renderTrigger={
                                <IconButton
                                  icon={
                                    <UiOverlaysAndIconsCustomIcon
                                      name={`DotsVertical`}
                                      size={`xs`}
                                    />
                                  }
                                  size={24}
                                  aria-label={`${EditorExtensionsMoreActions} for ${displayNameEntry}`}
                                  tabIndex={-1}
                                  data-tab-menu={``}
                                  data-testid={`tabs-left-menu-${id}`}
                                />
                              }
                              onOpenChange={(
                                tabsLeftList?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): undefined => {
                                if (tabsLeftList) {
                                  if (canEdit) {
                                    ops.probeKind(id);
                                  }
                                  return;
                                }
                                requestAnimationFrame(
                                  (
                                    ..._extraArguments: unknown[]
                                  ): undefined => {
                                    let activeElement: Dynamic = (
                                      document as Dynamic
                                    ).activeElement;
                                    if (
                                      activeElement === null ||
                                      activeElement ===
                                        (document as Dynamic).body ||
                                      (activeElement instanceof
                                        (HTMLElement as Dynamic) &&
                                        activeElement.hasAttribute(
                                          `data-tab-menu`,
                                        ))
                                    ) {
                                      tabElement(id)?.focus({
                                        preventScroll: true,
                                      });
                                    }
                                  },
                                );
                              }}
                              items={tabRowMenuItems({
                                id: id,
                                readOnly: readOnly,
                                busy: busy,
                                kind: kinds.get(id),
                                onRename: (
                                  ..._extraArguments: unknown[]
                                ): Dynamic => beginRename(id),
                                onDuplicate: (
                                  ..._extraArguments: unknown[]
                                ): Dynamic => ops.duplicate(id),
                                onNewSubtab: (
                                  ..._extraArguments: unknown[]
                                ): undefined => void createTab(id),
                                onCopyLink: (
                                  ..._extraArguments: unknown[]
                                ): Dynamic => ops.copyLink(id),
                                onDelete: (
                                  ..._extraArguments: unknown[]
                                ): undefined => {
                                  outlineUnsubscribeRef.current = id;
                                  ops.requestDelete(id);
                                },
                                onlyTab: singleTab,
                                moves: tabMoveAvailability(
                                  siblingDirectory.get(id)?.pos ?? 1,
                                  siblingDirectory.get(id)?.size ?? 1,
                                  depth,
                                  moveFailure !== null,
                                ),
                                intoName: previousSiblingName(id),
                                moveSaving: moveFailure?.id === id,
                                onMove: (
                                  tabsLeftList?: Dynamic,
                                  options?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): undefined =>
                                  void moveTab(
                                    id,
                                    tabsLeftList,
                                    resolveDataOperationControlByKey(
                                      document,
                                      options,
                                    ),
                                  ),
                              })}
                            />
                          </span>
                          {(zone === `before` ||
                            (zone === `after` &&
                              !(matchesId3 && activeOutlineExpanded))) && (
                            <span
                              aria-hidden={`true`}
                              className={`bg-fill-primary pointer-events-none absolute inset-x-1 h-0.5 rounded-full ${zone === `before` ? `-top-px` : `-bottom-px`}`}
                            />
                          )}
                        </div>,
                        matchesId3 && activeOutlineExpanded ? (
                          <TabsHeadingRow
                            boxRef={outlineScrollRef}
                            id={listId}
                            tabName={displayNameEntry}
                            rows={outlineRows}
                            places={visibleOutlineRows}
                            marked={activeOutlineId}
                            stop={outlineTabStopId}
                            level={depth + 2}
                            indentRem={depth * TAB_ICON_SCALE + 0.875}
                            lead={TAB_EDGE_PADDING}
                            cap={outlineRowLimit}
                            restTone={`text-secondary`}
                            onPick={(
                              tabsLeftList?: Dynamic,
                              options?: Dynamic,
                              context?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): Dynamic =>
                              outline?.jump(
                                tabsLeftList,
                                options ||
                                  (canEdit &&
                                    (context === `mouse` || context === `pen`)),
                              )
                            }
                            onRowFocus={(
                              tabsLeftList?: Dynamic,
                              options?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): undefined => {
                              setFocusedOutlineId(tabsLeftList);
                              focusedElementRef.current = {
                                id: tabsLeftList,
                                index: options,
                              };
                              outlineJumpTracker.arrivedOn(tabsLeftList);
                            }}
                            onRowBlur={(
                              tabsLeftList?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): undefined => {
                              if (tabsLeftList) {
                                focusedElementRef.current = null;
                              }
                              outlineJumpTracker.drop();
                            }}
                          />
                        ) : null,
                        matchesId3 &&
                        activeOutlineExpanded &&
                        zone === `after` ? (
                          <span
                            aria-hidden={`true`}
                            className={`relative block h-0`}
                          >
                            <span
                              className={`bg-fill-primary pointer-events-none absolute inset-x-1 -top-px h-0.5 rounded-full`}
                            />
                          </span>
                        ) : null,
                      ],
                    },
                    id,
                  )}
                />
              );
            },
          )}
        </div>
        {canEdit ? (
          <Button
            variant={`ghost`}
            tabIndex={-1}
            aria-disabled={busy || undefined}
            data-tab-add={``}
            data-testid={`tabs-left-add`}
            className={`text-muted relative w-full justify-start aria-disabled:opacity-50 ${dropTarget === `tail` ? `ring-strong ring-1` : ``}`}
            icon={<UiOverlaysAndIconsCustomIcon name={`Add`} size={`xs`} />}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void createTab()
            }
            onDragOver={handleRootDragOver}
            onDrop={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              event.preventDefault();
              event.stopPropagation();
              dropAtRoot(event);
            }}
          >{`New tab`}</Button>
        ) : null}
      </div>
      {seat.error === null ? null : (
        <div
          className={`gap-xs flex items-center pt-1 pl-2`}
          data-testid={`tabs-left-error`}
        >
          <span
            role={`alert`}
            className={`text-footnote text-danger min-w-0 flex-1`}
          >
            {seat.error}
          </span>
          <Button
            size={mode(`sm`)}
            variant={`ghost`}
            onClick={(..._extraArguments: unknown[]): Dynamic => ops.retry()}
          >{`Retry`}</Button>
        </div>
      )}
    </nav>
  );
}
function TabsLeftListFed(
  {
    seat: seat,
    onUp: onUp,
    onRenaming: onRenaming,
    feed: feed,
    onJump: onJump,
    timers: timers,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let outlineFeed: Dynamic = feed ?? tabsOutlineStore;
  let outlineState: Dynamic = useTabOutline(outlineFeed, seat.activeId);
  let cursorState: Dynamic = useSelectedTabHeading(outlineFeed, seat.activeId);
  return (
    <TabsLeftList
      seat={seat}
      onUp={onUp}
      onRenaming={onRenaming}
      outline={(0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          outlineState === null || onJump === undefined
            ? null
            : {
                outline: outlineState,
                at: cursorState,
                jump: onJump,
              },
        [outlineState, cursorState, onJump],
      )}
      timers={timers}
    />
  );
}
export { TabsLeftListFed };

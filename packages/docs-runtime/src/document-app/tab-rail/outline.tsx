// BaoCut: extracted tab rail outline callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateTabRailHeadingExpansionContext {
  activeId: Dynamic;
  elementRef5: Dynamic;
  enabledRef2: Dynamic;
  enabledRef3: Dynamic;
  enabledStateRef: Dynamic;
  setEnabledState: Dynamic;
  setEnabledState3: Dynamic;
}

export function createTabRailHeadingExpansion(tabRailLiveContext: CreateTabRailHeadingExpansionContext): Dynamic {
  return ((
      tabRail?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (tabRailLiveContext.enabledStateRef.current) {
        tabRailLiveContext.elementRef5.current =
          options && tabRailLiveContext.activeId !== undefined
            ? {
                tab: tabRailLiveContext.activeId,
                h: tabRail,
              }
            : null;
        if (tabRailLiveContext.elementRef5.current !== null) {
          tabRailLiveContext.enabledRef3.current = true;
          (0, tabRailLiveContext.setEnabledState)(true);
        }
        tabRailLiveContext.enabledRef2.current = true;
        (0, tabRailLiveContext.setEnabledState3)(false);
      }
    });
}

export interface CreateTabRailOutlineFocusContext {
  activeId: Dynamic;
  elementRef18: Dynamic;
  elementRef2: Dynamic;
  enabledState2: Dynamic;
  useRepeatedTabShortcut2: Dynamic;
}

export function createTabRailOutlineFocus(tabRailLiveContext: CreateTabRailOutlineFocusContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = tabRailLiveContext.elementRef18.current;
    if (element === null) return;
    if (!tabRailLiveContext.enabledState2) {
      tabRailLiveContext.elementRef18.current = null;
      tabRailLiveContext.useRepeatedTabShortcut2.drop();
      return;
    }
    let element2: Dynamic = tabRailLiveContext.elementRef2.current;
    let activeElement: Dynamic = element2?.ownerDocument.activeElement ?? null;
    if (
      !(
        activeElement === null ||
        activeElement === element2?.ownerDocument.body ||
        (element2 != null &&
          activeElement !== element2 &&
          activeElement.contains(element2))
      )
    ) {
      if (
        !(
          activeElement instanceof HTMLElement &&
          activeElement.dataset.outlineRow === element.id
        )
      ) {
        tabRailLiveContext.elementRef18.current = null;
      }
      return;
    }
    tabRailLiveContext.elementRef18.current = null;
    tabRailLiveContext.useRepeatedTabShortcut2.drop();
    let items: Dynamic = [
      ...(element2?.querySelectorAll(`[data-outline-row]`) ?? []),
    ];
    if (
      items.some(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          item2.dataset.outlineRow === element.id,
      )
    )
      return;
    let item: Dynamic = [
      ...(element2?.querySelectorAll(`[role=treeitem][data-tab-id]`) ?? []),
    ].find(
      (item2?: Dynamic, ..._extraArguments: unknown[]) =>
        item2.dataset.tabId === tabRailLiveContext.activeId,
    );
    (
      items[Math.min(element.index, items.length - 1)] ??
      item ??
      element2
    )?.focus({
      preventScroll: true,
    });
  });
}

export interface CreateTabRailOutlineScrollContext {
  elementRef2: Dynamic;
  isFocusVisible: Dynamic;
  nearestScrollContainer: Dynamic;
  recordRef2: Dynamic;
  scrollTabRowIntoView: Dynamic;
}

export function createTabRailOutlineScroll(tabRailLiveContext: CreateTabRailOutlineScrollContext): Dynamic {
  return (({ ["contains"]: (..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = tabRailLiveContext.elementRef2.current;
    let matchedElement: Dynamic = element?.querySelector(
      `[data-outline-row][aria-current="location"]`,
    );
    if (!element || !matchedElement) return;
    (0, tabRailLiveContext.scrollTabRowIntoView)(matchedElement, element);
    let activeElement = document.activeElement;
    let closest2: Dynamic =
      activeElement instanceof HTMLElement &&
      element.contains(activeElement) &&
      (0, tabRailLiveContext.isFocusVisible)(activeElement)
        ? activeElement.closest(`[role="treeitem"]`)
        : null;
    if (
      closest2 !== null &&
      closest2 !== matchedElement &&
      element.contains(closest2)
    ) {
      (0, tabRailLiveContext.scrollTabRowIntoView)(closest2, element);
    }
    tabRailLiveContext.recordRef2.current.top =
      (0, tabRailLiveContext.nearestScrollContainer)(matchedElement, element)?.scrollTop ?? null;
  } })["contains"]);
}

export interface CreateTabRailOutlineRefreshContext {
  contains: Dynamic;
  elementRef2: Dynamic;
  enabledState7: Dynamic;
  nearestScrollContainer: Dynamic;
  recordRef2: Dynamic;
  updateWait: Dynamic;
}

export function createTabRailOutlineRefresh(tabRailLiveContext: CreateTabRailOutlineRefreshContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let record: Dynamic = tabRailLiveContext.recordRef2.current;
      if (!record.armed || ((0, tabRailLiveContext.updateWait)(), !tabRailLiveContext.enabledState7)) return;
      let element: Dynamic = tabRailLiveContext.elementRef2.current;
      let matchedElement: Dynamic = element?.querySelector(
        `[data-outline-row][aria-current="location"]`,
      );
      let nearestScrollContainer2: Dynamic =
        element && matchedElement
          ? (0, tabRailLiveContext.nearestScrollContainer)(matchedElement, element)
          : null;
      if (
        !(
          nearestScrollContainer2 !== null &&
          record.top !== null &&
          Math.abs(nearestScrollContainer2.scrollTop - record.top) > 1
        )
      ) {
        (0, tabRailLiveContext.contains)();
      }
    });
}

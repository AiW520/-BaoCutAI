// BaoCut: extracted tab rail movement callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface CreateTabRailKeyboardMoveStartContext {
  elementRef2: Dynamic;
  enabledStateRef: Dynamic;
  resolveDataOperationControlDataBaseUiFocusGuard: Dynamic;
}

export function createTabRailKeyboardMoveStart(tabRailLiveContext: CreateTabRailKeyboardMoveStartContext): Dynamic {
  return ((
      tabRail?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let element: Dynamic = tabRailLiveContext.elementRef2.current;
      if (element === null || !tabRailLiveContext.enabledStateRef.current) return;
      let matchedElement: Dynamic = Array.from<Dynamic>(
        element.querySelectorAll(`[role="treeitem"]`),
      ).find(
        (matchedElement3?: Dynamic, ..._extraArguments: unknown[]) =>
          matchedElement3.dataset.tabId === tabRail,
      );
      if (matchedElement === undefined) return;
      let activeElement = document.activeElement;
      let closest2: Dynamic = element.closest(`[role="dialog"]`);
      let matchesActiveElement: Dynamic =
        activeElement !== null &&
        closest2 !== null &&
        closest2.contains(activeElement) &&
        !element.contains(activeElement);
      let matchedElement2: Dynamic = matchedElement.querySelector(
        `[data-testid^="tab-rail-menu-"]`,
      );
      if (
        matchesActiveElement ||
        (0, tabRailLiveContext.resolveDataOperationControlDataBaseUiFocusGuard)(
          activeElement,
          matchedElement,
          matchedElement2,
          options.menus,
        )
      ) {
        matchedElement.focus({
          focusVisible: options.byKey,
        });
      }
    });
}

export interface CreateTabRailKeyboardMoveCommitContext {
  countRef4: Dynamic;
  disabled: Dynamic;
  editing: Dynamic;
  enabledRef9: Dynamic;
  focus2: Dynamic;
  room: Dynamic;
  roots: Dynamic;
  rootsRef: Dynamic;
  setTabRailState5: Dynamic;
  tabKeyboardMovePlacement: Dynamic;
  tabPositionAnnouncement: Dynamic;
  updateElement5: Dynamic;
}

export function createTabRailKeyboardMoveCommit(tabRailLiveContext: CreateTabRailKeyboardMoveCommitContext): Dynamic {
  return (async (
      tabRail?: Dynamic,
      step?: Dynamic,
      pick?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (tabRailLiveContext.enabledRef9.current || tabRailLiveContext.disabled || tabRailLiveContext.editing !== null || !tabRailLiveContext.room) return;
      let tabKeyboardMovePlacement2 = (0, tabRailLiveContext.tabKeyboardMovePlacement)(
        tabRailLiveContext.roots,
        tabRail,
        step,
      );
      let from = (0, tabRailLiveContext.tabPositionAnnouncement)(tabRailLiveContext.roots, tabRail);
      if (tabKeyboardMovePlacement2 === undefined || from === undefined) return;
      let token: number = ++tabRailLiveContext.countRef4.current;
      tabRailLiveContext.enabledRef9.current = true;
      (0, tabRailLiveContext.setTabRailState5)({
        token: token,
        id: tabRail,
        step: step,
        from: from,
        pick: pick,
        written: null,
      });
      let updateElement6: Dynamic = await (0, tabRailLiveContext.updateElement5)(
        tabRail,
        tabKeyboardMovePlacement2.parent,
        tabKeyboardMovePlacement2.beforeId,
      );
      if (updateElement6 === `moved` || updateElement6 === `accepted`) {
        (0, tabRailLiveContext.setTabRailState5)(
          (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            tabRail2?.token === token
              ? {
                  ...tabRail2,
                  written: tabRailLiveContext.rootsRef.current,
                }
              : tabRail2,
        );
        return;
      }
      tabRailLiveContext.enabledRef9.current = false;
      (0, tabRailLiveContext.setTabRailState5)(
        (tabRail2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          tabRail2?.token === token ? null : tabRail2,
      );
      (0, tabRailLiveContext.focus2)(tabRail, pick);
    });
}

export interface CreateTabRailKeyboardMoveAnnounceContext {
  elementRef2: Dynamic;
  enabledRef9: Dynamic;
  enabledState2: Dynamic;
  error: Dynamic;
  focus2: Dynamic;
  resolvePlatformAnnouncementsValue: Dynamic;
  roots: Dynamic;
  setTabRailState5: Dynamic;
  tabMoveAnnouncement: Dynamic;
  tabPositionAnnouncement: Dynamic;
  tabRailState4: Dynamic;
}

export function createTabRailKeyboardMoveAnnounce(tabRailLiveContext: CreateTabRailKeyboardMoveAnnounceContext): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (tabRailLiveContext.tabRailState4 === null || tabRailLiveContext.tabRailState4.written === null) return;
      let tabPositionAnnouncement2 = (0, tabRailLiveContext.tabPositionAnnouncement)(
        tabRailLiveContext.roots,
        tabRailLiveContext.tabRailState4.id,
      );
      let matchesTabPositionAnnouncement =
        tabPositionAnnouncement2 !== undefined &&
        tabPositionAnnouncement2.parentId === tabRailLiveContext.tabRailState4.from.parentId &&
        tabPositionAnnouncement2.pos === tabRailLiveContext.tabRailState4.from.pos;
      if (
        !(
          matchesTabPositionAnnouncement &&
          tabRailLiveContext.roots === tabRailLiveContext.tabRailState4.written &&
          tabRailLiveContext.error === null
        )
      ) {
        tabRailLiveContext.enabledRef9.current = false;
        (0, tabRailLiveContext.setTabRailState5)(null);
        if (
          !(
            tabPositionAnnouncement2 === undefined ||
            matchesTabPositionAnnouncement ||
            !tabRailLiveContext.enabledState2
          )
        ) {
          (0, tabRailLiveContext.focus2)(tabRailLiveContext.tabRailState4.id, tabRailLiveContext.tabRailState4.pick);
          (0, tabRailLiveContext.resolvePlatformAnnouncementsValue)(
            tabRailLiveContext.elementRef2.current?.ownerDocument ?? document,
            (0, tabRailLiveContext.tabMoveAnnouncement)(tabRailLiveContext.tabRailState4.step, tabPositionAnnouncement2),
            {
              key: `tab-move`,
            },
          );
        }
      }
    });
}

export interface CreateTabRailPlacementSeatContext {
  activeId: Dynamic;
  busy: Dynamic;
  displayNames: Dynamic;
  elementRef17: Dynamic;
  error: Dynamic;
  kinds: Dynamic;
  matchesOnTabsSeat: Dynamic;
  open: Dynamic;
  ops: Dynamic;
  pid: Dynamic;
  readOnly: Dynamic;
  roots: Dynamic;
  tabRailState: Dynamic;
  tabTreeLayoutKey: Dynamic;
}

export function createTabRailPlacementSeat(tabRailLiveContext: CreateTabRailPlacementSeatContext): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!tabRailLiveContext.matchesOnTabsSeat || tabRailLiveContext.tabRailState === null) return null;
      let key = [
        tabRailLiveContext.pid,
        tabRailLiveContext.activeId ?? ``,
        +!!tabRailLiveContext.readOnly,
        +!!tabRailLiveContext.busy,
        tabRailLiveContext.error ?? ``,
        (0, tabRailLiveContext.tabTreeLayoutKey)(tabRailLiveContext.roots, tabRailLiveContext.displayNames),
      ].join(`#`);
      let element: Dynamic = tabRailLiveContext.elementRef17.current;
      if (
        element !== null &&
        element.key === key &&
        element.seat.open === tabRailLiveContext.open &&
        element.seat.kinds === tabRailLiveContext.kinds
      )
        return element.seat;
      let seat2: Dynamic = {
        pid: tabRailLiveContext.pid,
        roots: tabRailLiveContext.roots,
        displayNames: tabRailLiveContext.displayNames,
        activeId: tabRailLiveContext.activeId,
        open: tabRailLiveContext.open,
        readOnly: tabRailLiveContext.readOnly,
        busy: tabRailLiveContext.busy,
        kinds: tabRailLiveContext.kinds,
        error: tabRailLiveContext.error,
        ops: tabRailLiveContext.ops,
      };
      tabRailLiveContext.elementRef17.current = {
        key: key,
        seat: seat2,
      };
      return seat2;
    });
}

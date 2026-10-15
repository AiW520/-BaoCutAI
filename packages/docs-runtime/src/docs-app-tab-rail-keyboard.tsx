// BaoCut: extracted tab rail keyboard callbacks; state stays with the component.
import type { Dynamic } from "./types";

export interface CreateTabRailMenuKeyDownContext {
  onToggle: Dynamic;
  rows: Dynamic;
  setEnabledState8: Dynamic;
  useRepeatedTabShortcut2: Dynamic;
}

export function createTabRailMenuKeyDown(tabRailLiveContext: CreateTabRailMenuKeyDownContext): Dynamic {
  return (({ ["onKeyDown"]: (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    tabRailLiveContext.useRepeatedTabShortcut2.anyKeyDown(event);
    if (
      (event.key === `Enter` || event.key === ` `) &&
      (event.altKey || event.ctrlKey || event.metaKey) &&
      event.target instanceof Element
    ) {
      let closest3: Dynamic = event.target.closest(`[data-outline-row]`);
      if (closest3 !== null && event.target !== closest3) {
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
    let currentTarget: Dynamic = event.currentTarget;
    let target: Dynamic = event.target instanceof Element ? event.target : null;
    let closest2: Dynamic = target?.closest(`[role=treeitem]`) ?? null;
    if (
      closest2 === null ||
      !currentTarget.contains(closest2) ||
      (target !== closest2 &&
        !(
          target instanceof HTMLElement &&
          (`tabName` in target.dataset || `outlineRow` in closest2.dataset)
        ))
    )
      return;
    let matchedElements: Dynamic = Array.from<Dynamic>(
      currentTarget.querySelectorAll(
        `[role=treeitem]:not([tabindex="-1"]), [role=treeitem][data-outline-row]`,
      ),
    );
    let matchedElementIndex: Dynamic = matchedElements.indexOf(closest2);
    if (matchedElementIndex < 0) return;
    let tabId2: Dynamic = closest2.dataset.tabId ?? ``;
    let number = Number(closest2.getAttribute(`aria-level`) ?? `1`);
    let focus4 = (
      tabRail?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (tabRail !== undefined) {
        tabRail.focus();
      }
    };
    switch (event.key) {
      case `ArrowDown`:
        event.preventDefault();
        focus4(matchedElements[matchedElementIndex + 1]);
        return;
      case `ArrowUp`:
        event.preventDefault();
        focus4(matchedElements[matchedElementIndex - 1]);
        return;
      case `Home`:
        event.preventDefault();
        focus4(matchedElements[0]);
        return;
      case `End`:
        event.preventDefault();
        focus4(matchedElements[matchedElements.length - 1]);
        return;
      case `ArrowRight`: {
        let attribute: Dynamic = closest2.getAttribute(`aria-expanded`);
        if (attribute === null) return;
        event.preventDefault();
        if (attribute === `false`) {
          (0, tabRailLiveContext.onToggle)(tabId2);
        } else {
          focus4(matchedElements[matchedElementIndex + 1]);
        }
        return;
      }
      case `ArrowLeft`:
        if (
          (event.preventDefault(),
          closest2.getAttribute(`aria-expanded`) === `true`)
        ) {
          (0, tabRailLiveContext.onToggle)(tabId2);
          return;
        }
        for (
          let difference = matchedElementIndex - 1;
          difference >= 0;
          difference--
        )
          if (
            Number(
              matchedElements[difference].getAttribute(`aria-level`) ?? `1`,
            ) < number
          ) {
            focus4(matchedElements[difference]);
            return;
          }
        return;
      case `Enter`:
      case ` `: {
        event.preventDefault();
        let outlineRow: Dynamic = closest2.dataset.outlineRow;
        let h5: Dynamic =
          outlineRow === undefined
            ? undefined
            : tabRailLiveContext.rows.find(
                (row?: Dynamic, ..._extraArguments: unknown[]) =>
                  row.id === outlineRow,
              )?.h;
        if (outlineRow !== undefined) {
          if (!event.repeat && h5 !== undefined) {
            tabRailLiveContext.useRepeatedTabShortcut2.press(outlineRow, h5, event.key);
          }
          return;
        }
        if (tabId2.length > 0 && !event.repeat) {
          (0, tabRailLiveContext.setEnabledState8)(tabId2);
        }
        return;
      }
      default: {
        if (event.key.length !== 1) return;
        let normalizedKey: Dynamic = event.key.toLowerCase();
        let startsWith: Dynamic = (
          element?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (element.querySelector(`[data-tab-label]`)?.textContent ?? ``)
            .trim()
            .toLowerCase()
            .startsWith(normalizedKey);
        let matchedElementsSlice: Dynamic =
          matchedElements.slice(matchedElementIndex + 1).find(startsWith) ??
          matchedElements.slice(0, matchedElementIndex + 1).find(startsWith);
        if (
          matchedElementsSlice !== undefined &&
          matchedElementsSlice !== closest2
        ) {
          event.preventDefault();
          focus4(matchedElementsSlice);
        }
      }
    }
  } })["onKeyDown"]);
}

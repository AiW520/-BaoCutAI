/** BaoCut: sheet popup modal from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  resolveUiProviderAndLayersUseContext10,
  useUiOverlaysAndIconsUseInsertionEffect,
} from "./cds-dependencies";
import { isPointerPresentation, isReducedMotion } from "./cds-presentation";
import { SheetsDataCdsSheetDrilled } from "./cds-sheets-geometry";

var sheetPopupSet: Dynamic;

var SheetPopupStyles: Dynamic;

var sheetPopupWeakMap: Dynamic;

function updateSheetPopupInert(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let value = (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let value4: Dynamic = sheetPopupWeakMap.get(input) ?? 0;
    if (value4 === 0) {
      if (input.hasAttribute(`inert`)) return;
      input.setAttribute(`inert`, ``);
      input.setAttribute(`data-cds-sheet-inert`, ``);
    }
    sheetPopupWeakMap.set(input, value4 + 1);
    items.push(input);
  };
  let value2 = (
    element2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        sheetPopupSet.has(element2.tagName) ||
        element2.matches(SheetPopupStyles)
      )
    ) {
      if (element2.querySelector(SheetPopupStyles) === null) {
        value(element2);
        return;
      }
      for (let value4 of Array.from<Dynamic>(element2.children) as Dynamic)
        value2(value4);
    }
  };
  let value3: Dynamic = element;
  let body: Dynamic = element.ownerDocument.body;
  for (
    ;
    value3 !== null && value3 !== body && value3.parentElement !== null;

  ) {
    let parentElement: Dynamic = value3.parentElement;
    let value4: Dynamic = value3;
    for (let value5 of Array.from<Dynamic>(parentElement.children) as Dynamic)
      if (value5 !== value4) {
        value2(value5);
      }
    value3 = parentElement;
  }
  return (..._extraArguments: unknown[]): undefined => {
    for (let value4 of items as Dynamic) {
      let value5: Dynamic = (sheetPopupWeakMap.get(value4) ?? 1) - 1;
      if (value5 <= 0) {
        sheetPopupWeakMap.delete(value4);
        if (value4.hasAttribute(`data-cds-sheet-inert`)) {
          value4.removeAttribute(`inert`);
          value4.removeAttribute(`data-cds-sheet-inert`);
        }
      } else {
        sheetPopupWeakMap.set(value4, value5);
      }
    }
  };
}

function useSheetPopupNode(
  { node: input, open: input2, liftOnClose: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiProviderAndLayersUseContext10();
  let value2: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(input3);
  let value3: Dynamic = (0, React.useRef)(null);
  let value4: Dynamic = (0, React.useRef)(null);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!input2 || input === null || value === undefined) return;
      let value5: Dynamic = value.requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          if (value3.current === null) {
            let value6: Dynamic = resolveSheetPopupDataBaseUiPortal(input);
            if (value6 !== null) {
              value3.current = updateSheetPopupInert(value6);
            }
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        value.cancelAnimationFrame(value5);
        let current: Dynamic = value3.current;
        value3.current = null;
        if (current === null) return;
        if ((value2?.() ?? `now`) === `now` || !isSheetPopupHidden(value)) {
          current();
          return;
        }
        let value6: Dynamic = installSheetPopupPointerdown(
          value,
          current,
          (..._extraArguments: unknown[]): undefined => {
            if (value4.current === value6) {
              value4.current = null;
            }
          },
        );
        value4.current = value6;
      };
    },
    [input, input2, value, value2],
  );
  return (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => value4.current?.(),
    [],
  );
}

function isSheetPopupHidden(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    !isPointerPresentation(input) &&
    !isReducedMotion() &&
    input.document.visibilityState !== `hidden`
  );
}

function installSheetPopupPointerdown(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let document2: Dynamic = input.document;
  let value: Dynamic = false;
  let value2 = (..._extraArguments: unknown[]): undefined => {
    if (!value) {
      value = true;
      input.cancelAnimationFrame(value4);
      input.removeEventListener(`pointerdown`, value2, true);
      input.removeEventListener(`keydown`, value2, true);
      input.removeEventListener(`pagehide`, value2);
      document2.removeEventListener(`visibilitychange`, value3);
      options();
      context();
    }
  };
  let value3 = (..._extraArguments: unknown[]): undefined => {
    if (document2.visibilityState === `hidden`) {
      value2();
    }
  };
  let value4: Dynamic = input.requestAnimationFrame(
    (..._extraArguments: unknown[]): undefined => {
      value4 = input.requestAnimationFrame(value2);
    },
  );
  input.addEventListener(`pointerdown`, value2, true);
  input.addEventListener(`keydown`, value2, true);
  input.addEventListener(`pagehide`, value2);
  document2.addEventListener(`visibilitychange`, value3);
  return value2;
}

function resolveSheetPopupDataBaseUiPortal(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let body: Dynamic = element.ownerDocument.body;
  let value: Dynamic = element;
  let value2: Dynamic = null;
  for (; value !== null && value !== body; ) {
    if (
      value.hasAttribute(`data-base-ui-portal`) ||
      value.hasAttribute(`data-cds-portal`)
    )
      return value;
    value2 = value;
    value = value.parentElement;
  }
  return value2;
}

function resolveSheetPopupPreventDefault(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (event.key === `Tab`) {
    event.preventDefault();
    event.stopPropagation();
  }
}

var sheetPopupWeakMap2: Dynamic;

function updateSheetPopupAriaHidden(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let entry: Dynamic = sheetPopupWeakMap2.get(input);
  if (entry === undefined) {
    entry = new (Set as Dynamic)();
    sheetPopupWeakMap2.set(input, entry);
  }
  entry.add(options);
  input.setAttribute(`aria-hidden`, `true`);
  input.setAttribute(SheetsDataCdsSheetDrilled, ``);
}

function clearSheetPopupAriaHidden(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let entry: Dynamic = sheetPopupWeakMap2.get(input);
  entry?.delete(options);
  if (entry === undefined || entry.size === 0) {
    input.removeAttribute(`aria-hidden`);
    input.removeAttribute(SheetsDataCdsSheetDrilled);
  }
}

function resolveSheetPopupOutsidePress(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (input?.reason === `outside-press`) return `after-paint`;
  let value: Dynamic = input?.event;
  if (
    input?.reason !== `item-press` ||
    value === undefined ||
    !(`detail` in value) ||
    value.detail === 0
  )
    return `now`;
  let target: Dynamic = value.target;
  return (target !== null && `closest` in target
    ? target.closest(`[role^="menuitem"]`)
    : null
  )?.hasAttribute(`data-cds-focuses-nothing`) === true
    ? `after-paint`
    : `now`;
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetPopupModalStep1(): void {
  sheetPopupSet = new (Set as Dynamic)([
    `SCRIPT`,
    `STYLE`,
    `LINK`,
    `TEMPLATE`,
    `NOSCRIPT`,
  ]);
  SheetPopupStyles = `[aria-live]:not([aria-live="off"]), [role="status"], [role="alert"], [role="log"], [data-cds="Toast"]`;
  sheetPopupWeakMap = new (WeakMap as Dynamic)();
  sheetPopupWeakMap2 = new (WeakMap as Dynamic)();
}

export {
  clearSheetPopupAriaHidden,
  resolveSheetPopupOutsidePress,
  resolveSheetPopupPreventDefault,
  updateSheetPopupAriaHidden,
  useSheetPopupNode,
};

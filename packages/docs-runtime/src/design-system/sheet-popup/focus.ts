/** BaoCut: sheet popup focus from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { React, resolveUiOverlaysAndIconsValue } from "../dependencies";
import {
  SheetsDataCdsSheetCovered,
  SheetsDataCdsSheetScroll,
} from "../sheets/geometry";
import { collectShimmerThen } from "../activity-status";

function isSheetPopupTarget(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (!options) return false;
  let value: string = `[${SheetsDataCdsSheetScroll}]`;
  let index: number = 0;
  let index2: number = 0;
  for (let value2 of input as Dynamic) {
    let target: Dynamic = value2.target;
    let value3: Dynamic =
      target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
    if (value3 === null || value3.closest(value) === null) return false;
    index += value2.addedNodes.length;
    index2 += value2.removedNodes.length;
  }
  return index > 0 && index2 > 0 && index2 <= index;
}

function resolveSheetPopupHeight(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let height: Dynamic = element.getBoundingClientRect().height;
  let value: Dynamic = Array.from<Dynamic>(
    element.querySelectorAll(`[${SheetsDataCdsSheetScroll}]`),
  );
  if (value.length === 0) return height;
  let value2: Dynamic = height;
  for (let value3 of value as Dynamic) {
    let firstElementChild: Dynamic = value3.firstElementChild;
    for (
      ;
      firstElementChild !== null &&
      firstElementChild.getClientRects().length === 0;

    )
      firstElementChild = firstElementChild.nextElementSibling;
    let lastElementChild: Dynamic = value3.lastElementChild;
    for (
      ;
      lastElementChild !== null &&
      lastElementChild.getClientRects().length === 0;

    )
      lastElementChild = lastElementChild.previousElementSibling;
    let value4: Dynamic =
      element.ownerDocument.defaultView?.getComputedStyle(value3);
    let value5: number =
      parseFloat(value4?.paddingTop ?? `0`) +
      parseFloat(value4?.paddingBottom ?? `0`);
    let value6: Dynamic =
      firstElementChild !== null && lastElementChild !== null
        ? lastElementChild.getBoundingClientRect().bottom -
          firstElementChild.getBoundingClientRect().top +
          value5
        : value5;
    value2 += value6 - value3.clientHeight;
  }
  return Math.max(0, value2);
}

function isSheetPopupReady(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (defaultView === null || defaultView.MutationObserver === undefined)
    return {
      ready: (..._extraArguments: unknown[]) => true,
      dispose: (..._extraArguments: unknown[]): undefined => undefined,
    };
  let value: boolean = false;
  let value2: Dynamic = null;
  let value3 = (..._extraArguments: unknown[]): undefined => {
    value2 = null;
    if (value) {
      value = false;
      options();
    }
  };
  let value4: Dynamic = new (defaultView.MutationObserver as Dynamic)(
    (..._extraArguments: unknown[]): undefined => {
      value2?.();
      if (element.hasAttribute(`data-cds-sheet-covered`)) {
        value2 = null;
        return;
      }
      value2 =
        typeof element.getAnimations == `function`
          ? collectShimmerThen(element, value3)
          : collectSheetPopupGetComputedStyle(element, defaultView, value3);
    },
  );
  value4.observe(element, {
    attributes: true,
    attributeFilter: [SheetsDataCdsSheetCovered],
  });
  return {
    ready: (..._extraArguments: unknown[]): boolean =>
      element.hasAttribute(`data-cds-sheet-covered`) || value2 !== null
        ? ((value = true), false)
        : true,
    dispose: (..._extraArguments: unknown[]): undefined => {
      value4.disconnect();
      value2?.();
      value2 = null;
    },
  };
}

function collectSheetPopupGetComputedStyle(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = options.getComputedStyle(input);
  let value2: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input2
      .split(`,`)
      .map((input3?: Dynamic, ..._extraArguments: unknown[]): number => {
        let value6: number = parseFloat(input3);
        return Number.isFinite(value6)
          ? input3.trim().endsWith(`ms`)
            ? value6
            : value6 * 1e3
          : 0;
      });
  let value3: Dynamic = value2(value.transitionDelay ?? ``);
  let value4: Dynamic = (Math.max as Dynamic)(
    ...value2(value.transitionDuration ?? ``).map(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => input2 + (value3[options2 % value3.length] ?? 0),
    ),
  );
  let value5: Dynamic = options.setTimeout(context, value4 + 34);
  return (..._extraArguments: unknown[]): Dynamic =>
    options.clearTimeout(value5);
}

function resolveSheetPopupVisible(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let index: number = 0;
  let index2: number = 0;
  for (let value of Array.from<Dynamic>(
    input.querySelectorAll(`[${SheetsDataCdsSheetScroll}]`),
  ) as Dynamic) {
    index += value.clientHeight;
    if (value.scrollHeight > value.clientHeight + 1) {
      index2 += value.scrollHeight;
    }
  }
  return {
    visible: index,
    overflowContent: index2,
  };
}

function resolveSheetPopupAbsolute(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (defaultView === null || options === null || !element.contains(options))
    return 0;
  let position: Dynamic = defaultView.getComputedStyle(options).position;
  if (position === `absolute` || position === `fixed`) return 0;
  let index: number = 0;
  for (let value: Dynamic = options; value !== element; ) {
    let parentElement: Dynamic = value.parentElement;
    if (parentElement === null) break;
    let value2: Dynamic = defaultView.getComputedStyle(parentElement);
    let value3: number =
      parentElement.getBoundingClientRect().bottom -
      parseFloat(value2.paddingBottom) -
      parseFloat(value2.borderBottomWidth);
    let value4: number = parseFloat(
      defaultView.getComputedStyle(value).marginBottom,
    );
    index += Math.max(
      0,
      value.getBoundingClientRect().bottom +
        Math.max(0, value4) -
        value3 +
        parentElement.scrollTop,
    );
    value = parentElement;
  }
  return index;
}

function useSheetPopupFocusout(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = (0, React.useRef)(context);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      value.current = context;
    },
    [context],
  );
  let value2: Dynamic = options?.open ?? false;
  let value3: Dynamic = options?.dismiss;
  let value4: Dynamic = options?.treeId;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        element === null ||
        !value2 ||
        value3 === undefined ||
        value4 === undefined
      )
        return;
      let ownerDocument: Dynamic = element.ownerDocument;
      let defaultView: Dynamic = ownerDocument.defaultView;
      let index: number = 0;
      let value5 = (..._extraArguments: unknown[]): undefined => {
        if (!(index !== 0 || defaultView === null)) {
          index = defaultView.requestAnimationFrame(
            (..._extraArguments: unknown[]): undefined => {
              index = 0;
              let activeElement: Dynamic = ownerDocument.activeElement;
              if (
                !(
                  value.current ||
                  activeElement === null ||
                  activeElement === ownerDocument.body ||
                  element.contains(activeElement) ||
                  activeElement.closest(
                    `[data-sheet-tree="${CSS.escape(value4)}"]`,
                  ) !== null ||
                  activeElement.closest(
                    `[aria-modal="true"], [data-cds="Dialog"]`,
                  ) === null
                )
              ) {
                value3();
              }
            },
          );
        }
      };
      element.addEventListener(`focusout`, value5);
      return (..._extraArguments: unknown[]): undefined => {
        element.removeEventListener(`focusout`, value5);
        if (index !== 0) {
          defaultView?.cancelAnimationFrame(index);
        }
      };
    },
    [element, value2, value3, value4],
  );
}

function resolveSheetPopupContentHeight(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: number = Math.round(options);
  let value2: number = options - resolveSheetPopupVisible(input).visible;
  return {
    contentHeight: value,
    written: value,
    chromeAtPin: value2,
    chromeSettled: value2,
    grows: context,
  };
}

function useSheetPopupHeight(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value: Dynamic = resolveUiOverlaysAndIconsValue(input);
      if (input === null || value === undefined) return;
      let value2: Dynamic = new (value as Dynamic)(
        (..._extraArguments: unknown[]): undefined => {
          let height: Dynamic = input.getBoundingClientRect().height;
          if (height > 0) {
            value2.disconnect();
            options(input, height);
          }
        },
      );
      value2.observe(input);
      return (..._extraArguments: unknown[]): Dynamic => value2.disconnect();
    },
    [input, options],
  );
}

export {
  isSheetPopupReady,
  isSheetPopupTarget,
  resolveSheetPopupAbsolute,
  resolveSheetPopupContentHeight,
  resolveSheetPopupHeight,
  resolveSheetPopupVisible,
  useSheetPopupFocusout,
  useSheetPopupHeight,
};

/** BaoCut: sheet popup host from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersUseContext10,
} from "./cds-dependencies";
import { usePresentationCapture } from "./cds-presentation";
import {
  SheetsDataCdsSheetCovered,
  SheetsState2,
  SheetsState3,
  isSheetsFrom,
  resolveSheetsBottom,
  resolveSheetsFloor,
  resolveSheetsInnerHeight,
  resolveSheetsValue2,
  resolveSheetsValue3,
  sheetsValue0_5,
  sheetsValue0_9,
} from "./cds-sheets-geometry";
import { SheetsCreateContext, resolveSheetsTall3 } from "./cds-sheets-gestures";
import {
  SheetsCreateContext2,
  SheetsCreateContext3,
  SheetsState4,
  resolveSheetsUseContext2,
} from "./cds-sheets-stack";
import { resolveLabeledFieldsTransition } from "./cds-sheet-popup-height";
import {
  SheetPopupHandle,
  useSheetPopupClick,
  useSheetPopupTall,
} from "./cds-sheet-popup-layout";
import {
  isSheetPopupReady,
  isSheetPopupTarget,
  resolveSheetPopupAbsolute,
  resolveSheetPopupContentHeight,
  resolveSheetPopupHeight,
  resolveSheetPopupVisible,
  useSheetPopupFocusout,
  useSheetPopupHeight,
} from "./cds-sheet-popup-focus";

function useSheetPopupHost(..._extraArguments: unknown[]): Dynamic {
  "use no memo";
  let value: Dynamic = resolveSheetsUseContext2();
  let [value2, value3]: Dynamic = (0, React.useState)(false);
  let value4: Dynamic = (0, React.useRef)(false);
  let value5: Dynamic = (0, React.useRef)(null);
  let value6: Dynamic = (0, React.useRef)(null);
  let value7: Dynamic = (0, React.useRef)(null);
  let value8: Dynamic = (0, React.useCallback)(
    (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value4.current = input;
      value3(input);
    },
    [],
  );
  let [value9, value10]: Dynamic = (0, React.useState)(null);
  let { sheet: value11 }: Dynamic = value;
  let value12: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let value13: Dynamic = (0, React.useContext)(SheetsCreateContext2);
  let value14: Dynamic = (0, React.useRef)(null);
  let value15: Dynamic = value12?.pinHeight;
  let value16: Dynamic = (0, React.useCallback)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value27: Dynamic = isSheetsFrom(input);
      value15?.(options, value27);
      value6.current = input;
      value5.current = resolveSheetPopupContentHeight(input, options, value27);
    },
    [value15],
  );
  let value17: Dynamic = (0, React.useCallback)(
    (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value7.current;
      value7.current =
        input === null && value14.current !== null
          ? {
              node: value14.current,
              half: value4.current,
            }
          : null;
      value14.current = value11 ? input : null;
      value10(value11 ? input : null);
      if (value11 && input !== null && current?.node === input) {
        value8(current.half);
        if (value6.current !== input) {
          value6.current = input;
          value5.current = resolveSheetPopupContentHeight(
            input,
            input.getBoundingClientRect().height,
            isSheetsFrom(input),
          );
        }
        return;
      }
      if (input === null || !value11) {
        value8(false);
      }
      if (input !== null && value11) {
        let value27: Dynamic = resolveSheetsValue2(input);
        if (value27) {
          let value28: Dynamic = `min(${SheetsState3}, ${SheetsState2})`;
          input.style.minHeight = value28;
          input.style.maxHeight = value28;
        }
        value8(value27);
        value16(input, input.getBoundingClientRect().height);
      }
    },
    [value11, value16, value8],
  );
  let value18: Dynamic = value12?.height;
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value14.current;
      if (!(!value11 || value18 !== undefined || current === null)) {
        resolveLabeledFieldsTransition(current);
        value16(current, current.getBoundingClientRect().height);
      }
    },
    [value11, value18, value16],
  );
  let value19: Dynamic = value12?.open ?? false;
  useSheetPopupHeight(
    value11 && value19 && value18 === undefined ? value9 : null,
    value16,
  );
  let value20: Dynamic = value12?.repinHeight;
  let value21: Dynamic = value12?.drag;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value11 || !value19 || value9 === null || value20 === undefined)
        return;
      let defaultView: Dynamic = value9.ownerDocument.defaultView;
      if (defaultView === null || defaultView.MutationObserver === undefined)
        return;
      let index: Dynamic = 0;
      let value27: Dynamic = false;
      let value28: Dynamic = false;
      let value29: Dynamic = null;
      let value30: Dynamic =
        defaultView.ResizeObserver === undefined
          ? null
          : new (defaultView.ResizeObserver as Dynamic)(
              (..._extraArguments: unknown[]): undefined => {
                value34();
              },
            );
      let value31 = (..._extraArguments: unknown[]): undefined => {
        let element: Dynamic = value9.querySelector(`[data-cds-sheet-control]`);
        if (!(element === value29 || value30 === null)) {
          if (value29 !== null) {
            value30.unobserve(value29);
          }
          value29 = element;
          if (element !== null) {
            value30.observe(element);
          }
        }
      };
      let value32 = (
        input?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value37: Dynamic = resolveSheetsValue3(
          defaultView.innerHeight,
          value4.current,
        );
        value20(Math.max(input, value37), options);
      };
      let value33 = (..._extraArguments: unknown[]): undefined => {
        index = 0;
        if (value21 !== undefined && value21.get() !== null) {
          index = defaultView.requestAnimationFrame(value33);
          return;
        }
        if (!value35.ready()) return;
        value31();
        if (resolveSheetsValue2(value9)) {
          if (!value4.current) {
            value8(true);
            value20(defaultView.innerHeight * sheetsValue0_5, true);
          }
          value28 = false;
          return;
        }
        let value37: Dynamic = resolveSheetPopupAbsolute(value9, value29);
        let value38: Dynamic = resolveSheetPopupVisible(value9);
        let value39: Dynamic =
          value9.getBoundingClientRect().height + value37 - value38.visible;
        let value40: Dynamic =
          resolveSheetsInnerHeight(defaultView, value9) * sheetsValue0_9;
        if (value28) {
          value28 = false;
          let value42: Dynamic = Math.round(
            Math.max(
              resolveSheetPopupHeight(value9) + value37,
              value38.overflowContent > 0
                ? value39 + value38.overflowContent
                : 0,
            ),
          );
          value27 = value42 > value40;
          value5.current = {
            contentHeight: value42,
            written: Math.min(value42, value40),
            chromeAtPin: value39,
            chromeSettled: value39,
            grows: value27,
          };
          value32(Math.min(value42, value40), value27);
          return;
        }
        let current: Dynamic = value5.current;
        if (current === null || Math.abs(value39 - current.chromeSettled) < 1)
          return;
        current.chromeSettled = value39;
        if (Math.abs(value39 - current.chromeAtPin) < 1) {
          value32(current.written, current.grows);
          return;
        }
        let value41: Dynamic =
          current.contentHeight + value39 - current.chromeAtPin;
        value32(Math.min(value41, value40), value41 > value40 || current.grows);
      };
      let value34 = (..._extraArguments: unknown[]): undefined => {
        if (index === 0) {
          index = defaultView.requestAnimationFrame(value33);
        }
      };
      let value35: Dynamic = isSheetPopupReady(value9, value34);
      value31();
      let value36: Dynamic = new (defaultView.MutationObserver as Dynamic)(
        (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            !((index !== 0 && value28) || isSheetPopupTarget(input, value27))
          ) {
            value28 = true;
            value34();
          }
        },
      );
      value36.observe(value9, {
        childList: true,
        subtree: true,
      });
      return (..._extraArguments: unknown[]): undefined => {
        value36.disconnect();
        value35.dispose();
        value30?.disconnect();
        if (index !== 0) {
          defaultView.cancelAnimationFrame(index);
        }
        if (value6.current === value9) {
          value5.current = null;
          value6.current = null;
        }
      };
    },
    [value11, value19, value9, value20, value21, value8],
  );
  useSheetPopupTall(value9, value12);
  useSheetPopupClick(value9);
  useSheetPopupFocusout(value9, value12, value.covered);
  usePresentationCapture(value11 && (value12?.open ?? false), value12?.dismiss);
  let value22: Dynamic = (0, React.useContext)(SheetsCreateContext3);
  let value23: Dynamic = resolveSheetsTall3(
    value12,
    resolveUiProviderAndLayersUseContext10(),
    value9,
  );
  let value24: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      value11 && value22 !== null
        ? {
            depth: value.depth,
            frameHeight: value23,
            cover: value22,
          }
        : null,
    [value11, value22, value.depth, value23],
  );
  let value25: Dynamic = value11 && value.covered;
  let value26: Dynamic = value11 && value.inert;
  return {
    sheet: value11,
    concealed: false,
    chrome: SheetPopupHandle,
    ref: value17,
    style: value11
      ? resolveSheetsFloor(value12, {
          floor: value2 ? `half` : `content`,
          parentFrameHeight: value13?.frameHeight,
        })
      : undefined,
    positionerStyle: value11 ? resolveSheetsBottom(value12) : undefined,
    attrs: {
      ...(value11 ? resolveUiProviderAndLayersDataSize(`lg`) : {}),
      "data-presentation": value11 ? `sheet` : undefined,
      "data-sheet-tree": value11 ? value12?.treeId : undefined,
      [SheetsDataCdsSheetCovered]: value25 ? `` : undefined,
      "data-cds-sheet-depth": value11 ? String(value.depth) : undefined,
      "data-cds-sheet-detent": value11 ? value12?.detent : undefined,
      "aria-hidden": value26 ? `true` : undefined,
      ...(value26 ? SheetsState4 : {}),
    },
    frame: value12,
    state: value,
    stack: value24,
  };
}

function SheetPopupHost(
  { children: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input(useSheetPopupHost());
}

export { SheetPopupHost };

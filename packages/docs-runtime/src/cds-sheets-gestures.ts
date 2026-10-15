/** BaoCut: sheets gestures from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  resolveUiTooltipsAndControlsClose,
  useUiOverlaysAndIconsUseInsertionEffect,
  useUiTooltipsAndControlsUnpan,
} from "./cds-dependencies";
import {
  resolveSheetsGet,
  resolveSheetsInnerHeight,
  sheetsValue0_9,
  useSheetsShowing,
} from "./cds-sheets-geometry";

var SheetsCreateContext: Dynamic;

function resolveSheetsTall3(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (input !== null)
    return input.detent === `tall` && options !== undefined
      ? Math.round(resolveSheetsInnerHeight(options, context) * sheetsValue0_9)
      : input.height;
}

var resolveSheetsValue4: Dynamic;

function resolveSheetsHeight2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input[0];
  let value2: Dynamic = input.at(-1);
  return value === undefined || value2 === undefined
    ? undefined
    : Math.max(value2.height, value.height);
}

function useSheetsUnpan(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value2: Dynamic = (0, React.useRef)(null);
  resolveUiTooltipsAndControlsClose(value2, options);
  let value3: Dynamic = (0, React.useId)();
  let [value4, value5]: Dynamic = (0, React.useState)();
  let [value6, value7]: Dynamic = (0, React.useState)(true);
  let value8: Dynamic = (0, React.useRef)([]);
  let [value9, value10]: Dynamic = (0, React.useState)(`default`);
  let value11: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let [value12, value13]: Dynamic = (0, React.useState)(false);
  let [value14, value15]: Dynamic = (0, React.useState)(null);
  let [value16, value17]: Dynamic = (0, React.useState)(input);
  if (input !== value16) {
    value17(input);
    if (input) {
      value5(undefined);
      value7(true);
      value10(`default`);
      value13(false);
    }
  }
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (!input) {
        value8.current = [];
        value11.current = new (Set as Dynamic)();
      }
    },
    [input],
  );
  useUiTooltipsAndControlsUnpan(input && value12, value15, {
    unpan: true,
  });
  let { showing: value18, onOpenChangeComplete: value19 }: Dynamic =
    useSheetsShowing(input);
  let value20: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(context);
  let value21: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      value21.current = null;
    },
    [input],
  );
  let value22: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value19(input2);
      if (value21.current !== input2) {
        value21.current = input2;
        value20?.(input2);
      }
    },
    [value19, value20],
  );
  let value23: Dynamic = (0, React.useCallback)(
    (
      input2?: Dynamic,
      options2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!(value8.current.length > 0 || !(input2 > 0))) {
        value8.current = [
          {
            height: Math.round(input2),
            grows: options2,
          },
        ];
        value5(Math.round(input2));
        value7(options2);
      }
    },
    [],
  );
  let value24: Dynamic = (0, React.useCallback)(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let current: Dynamic = value8.current;
      let value30: Dynamic = current[0];
      if (!(value30 === undefined || !(input2 > 0))) {
        value30.height = Math.round(input2);
        if (options2 !== undefined) {
          value30.grows = options2;
        }
        value5(resolveSheetsHeight2(current));
        value7(resolveSheetsValue4(current));
      }
    },
    [],
  );
  let value25: Dynamic = (0, React.useCallback)(
    (
      input2?: Dynamic,
      options2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let state: Dynamic = {
        height: Math.round(input2),
        grows: options2,
      };
      let current: Dynamic = value8.current;
      current.push(state);
      value5(resolveSheetsHeight2(current));
      value7(resolveSheetsValue4(current));
      let value30: Dynamic = false;
      let value31: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        !value30 && current === value8.current;
      return {
        set: (
          input3?: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (value31()) {
            state.height = Math.round(input3);
            if (options3 !== undefined) {
              state.grows = options3;
            }
            value5(resolveSheetsHeight2(current));
            value7(resolveSheetsValue4(current));
          }
        },
        release: (..._extraArguments: unknown[]): undefined => {
          if (value30) return;
          let value32: Dynamic = current.indexOf(state);
          value30 = true;
          if (value32 >= 0) {
            current.splice(value32, 1);
          }
          if (current === value8.current) {
            value5(resolveSheetsHeight2(current));
            value7(resolveSheetsValue4(current));
          }
        },
      };
    },
    [],
  );
  let value26: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let state: Dynamic = {};
      let current: Dynamic = value11.current;
      current.add(state);
      value13(true);
      return (..._extraArguments: unknown[]): undefined => {
        current.delete(state);
        if (current === value11.current) {
          value13(current.size > 0);
        }
      };
    },
    [],
  );
  let value27: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(value);
  let value28: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (value27 === undefined) {
        value2.current?.close?.();
      } else {
        value27();
      }
    },
    [value27],
  );
  let [value29]: Dynamic = (0, React.useState)(resolveSheetsGet);
  return {
    showing: value18,
    frame: (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic => ({
        treeId: value3,
        open: input,
        showing: value18,
        height: value4,
        pinHeight: value23,
        repinHeight: value24,
        pushLevelHeight: value25,
        canGrow: value6,
        detent: value9,
        setDetent: value10,
        holdTextEntryFocus: value26,
        keyboard: value14,
        dismiss: value28,
        drag: value29,
      }),
      [
        value3,
        input,
        value18,
        value4,
        value6,
        value23,
        value24,
        value25,
        value9,
        value26,
        value14,
        value28,
        value29,
      ],
    ),
    actionsRef: value2,
    onOpenChangeComplete: value22,
  };
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetsGesturesStep1(): void {
  SheetsCreateContext = (0, React.createContext)(null);
  resolveSheetsValue4 = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => input.at(-1)?.grows ?? true;
}

export { SheetsCreateContext, resolveSheetsTall3, useSheetsUnpan };

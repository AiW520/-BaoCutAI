/** BaoCut: sheets stack from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsSurface,
  appKDImport,
  originalJsxProps,
  resolveUiLinksAndFoundationValue17,
  resolveUiLinksAndFoundationValue18,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue3,
  useUiLinksAndFoundationUseSyncExternalStore3,
  useUiLinksAndFoundationUseSyncExternalStore4,
  useUiLinksAndFoundationUseSyncExternalStore5,
  useUiOverlaysAndIconsUseInsertionEffect,
} from "../dependencies";
import { usePresentationCapture } from "../presentation";
import { AvatarsState } from "../avatars";
import { inertProps } from "../field-foundation";
import {
  resolveSheetsAuto,
  resolveSheetsUseContext,
  resolveSheetsValue,
  useSheetsSheet,
  useSheetsState,
} from "./geometry";
import { SheetsCreateContext, useSheetsUnpan } from "./gestures";

var SheetsCreateContext2: Dynamic;

var SheetsSheet: Dynamic;

var SheetsState4: Dynamic;

var sheetsValue600: Dynamic;

var sheetsValue_1: Dynamic;

var sheetsSet: Dynamic;

function resolveSheetsSheet(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(SheetsSheet).sheet;
}

function resolveSheetsUseContext2(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(SheetsSheet);
}

var sheetsSet2: Dynamic;

var sheetsValue120: Dynamic;

var SheetsStyles: Dynamic;

function resolveSheetsClosest(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let value: Dynamic = input?.target;
  return (
    value instanceof (Element as Dynamic) &&
    value.closest(SheetsStyles) !== null
  );
}

function useSheetsOpen(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    open: value,
    actionsRef: value2,
    close: value3,
    onOpenChange: value4,
    onOpenChangeComplete: value5,
    structurallyAnchored: value7 = false,
    closable: value8 = true,
    refuseClose: value6,
  }: Dynamic = input;
  let value9: Dynamic = (0, React.useContext)(SheetsCreateContext2);
  let value10: Dynamic = resolveSheetsUseContext();
  let value11: Dynamic = resolveSheetsValue();
  let value12: Dynamic = useSheetsUnpan(value, value2, value5, value3);
  let value13: Dynamic = useUiLinksAndFoundationUseSyncExternalStore3();
  let value14: Dynamic = useUiLinksAndFoundationUseSyncExternalStore4();
  let value15: Dynamic = useSheetsSheet();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value15 && !value13 && !value14) {
        resolveUiLinksAndFoundationValue17();
      }
    },
    [value15, value13, value14, value],
  );
  let value16: Dynamic = useSheetsState(
    resolveSheetsAuto(value10, false, value11) &&
      (value8 || value10 === `sheet`),
    value,
    value12.showing,
  );
  let [value17, value18]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      (sheetsValue_1 || value14) && !value13,
  );
  let [value19, value20]: Dynamic = (0, React.useState)(value);
  if (value !== value19) {
    value20(value);
    let value47: Dynamic = (sheetsValue_1 || value14) && !value13;
    if (value && value17 !== value47) {
      value18(value47);
    }
  }
  if (value && value14 && !value13 && !value17) {
    value18(true);
  }
  let value21: Dynamic = value16 && !value7 && !value13 && !value17;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value21 || !value) return;
      let value47 = (..._extraArguments: unknown[]): undefined => {
        if (!resolveUiLinksAndFoundationValue18()) {
          sheetsValue_1 = true;
          value18(true);
        }
      };
      sheetsSet.add(value47);
      let value48: Dynamic = setTimeout(value47, sheetsValue600);
      return (..._extraArguments: unknown[]): undefined => {
        sheetsSet.delete(value47);
        clearTimeout(value48);
      };
    },
    [value21, value],
  );
  let value22: Dynamic = value16 && !value7 && !value17;
  usePresentationCapture(
    value && value16 && !value7 && value17,
    value12.frame.dismiss,
  );
  let value23: Dynamic = value22 && value12.showing && (!value13 || !value);
  let value24: Dynamic = value22 && value9 !== null ? value9.depth + 1 : 0;
  let value25: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let value26: Dynamic = (0, React.useRef)(0);
  let [value27, value28]: Dynamic = (0, React.useState)(false);
  let value29: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      value25.current.add(input2),
      value28(true),
      (..._extraArguments: unknown[]): undefined => {
        value25.current.delete(input2);
        value26.current = Date.now();
        value28(value25.current.size > 0);
      }
    ),
    [],
  );
  let [value30]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => ({}),
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!value22 || !value || value9 === null))
        return value9.cover(value30);
    },
    [value22, value, value9, value30],
  );
  let value31: Dynamic = resolveUiProviderAndLayersUseContext10();
  let treeId: Dynamic = value12.frame.treeId;
  let [value32, value33]: Dynamic = (0, React.useState)(false);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value27 || value31 === undefined) return;
      let index: number = 0;
      let value47 = (..._extraArguments: unknown[]): undefined => {
        let activeElement: Dynamic = value31.document.activeElement;
        if (
          activeElement !== null &&
          activeElement.closest(`[data-sheet-tree="${CSS.escape(treeId)}"]`) !==
            null
        ) {
          index = value31.requestAnimationFrame(value47);
          return;
        }
        value33(true);
      };
      index = value31.requestAnimationFrame(value47);
      return (..._extraArguments: unknown[]): undefined => {
        value31.cancelAnimationFrame(index);
        value33(false);
      };
    },
    [value27, treeId, value31],
  );
  let value34: Dynamic = value27 && value32;
  let value35: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(value4);
  let value36: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(value6);
  let value37: Dynamic = (0, React.useRef)(value22);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      value37.current = value22;
    },
    [value22],
  );
  let value38: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      input2.reason === undefined
        ? false
        : (value25.current.size > 0 ||
              Date.now() - value26.current < sheetsValue120) &&
            sheetsSet2.has(input2.reason)
          ? true
          : value37.current &&
            input2.reason === `outside-press` &&
            resolveSheetsClosest(input2.event),
    [],
  );
  let value39: Dynamic = (0, React.useRef)(null);
  let value40: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value39.current;
      value39.current = null;
      return current?.isCanceled === true ? null : current;
    },
    [],
  );
  let value41: Dynamic = (0, React.useCallback)(
    (
      input2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value47: Dynamic = options;
      if (!input2 && value38(value47)) {
        value47.cancel?.();
        return;
      }
      if (!input2 && value37.current && value36?.(options, treeId) === true) {
        value47.cancel?.();
        return;
      }
      value39.current = input2 ? null : value47;
      if (!input2) {
        value31?.requestAnimationFrame(
          (..._extraArguments: unknown[]): undefined => {
            if (value39.current === value47) {
              value39.current = null;
            }
          },
        );
      }
      if (input2 && value15) {
        resolveUiLinksAndFoundationValue17();
      }
      value35?.(input2, options);
    },
    [value35, value36, value38, treeId, value15, value31],
  );
  let value42: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      sheet: value22,
      pending: value23,
      covered: value27,
      inert: value34,
      depth: value24,
    }),
    [value22, value23, value27, value34, value24],
  );
  let value43: Dynamic = value9?.frameHeight;
  let value44: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value47: Dynamic =
        value12.frame.height !== undefined && value43 !== undefined
          ? Math.max(value12.frame.height, value43)
          : value12.frame.height;
      return value47 === value12.frame.height
        ? value12.frame
        : {
            ...value12.frame,
            height: value47,
          };
    },
    [value12.frame, value43],
  );
  let value45: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      ...value44,
      refusesAmbientClose: value38,
      takeCloseRequest: value40,
    }),
    [value44, value38, value40],
  );
  let value46: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      cover: value29,
    }),
    [value29],
  );
  return {
    sheet: value22,
    showing: value12.showing,
    frame: value45,
    actionsRef: value12.actionsRef,
    onOpenChange: value41,
    onOpenChangeComplete: value12.onOpenChangeComplete,
    modal: value22 ? true : undefined,
    state: value42,
    stack: value46,
  };
}

var SheetsSheet2: Dynamic;

function SheetsValue(
  { children: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <SheetsSheet.Provider value={SheetsSheet2}>
      <SheetsCreateContext2.Provider value={null}>
        <SheetsCreateContext3.Provider value={null}>
          <SheetsCreateContext.Provider value={null}>
            {input}
          </SheetsCreateContext.Provider>
        </SheetsCreateContext3.Provider>
      </SheetsCreateContext2.Provider>
    </SheetsSheet.Provider>
  );
}

function SheetsValue2(
  { value: input, children: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <SheetsSheet.Provider value={input.state}>
      <SheetsCreateContext3.Provider value={input.stack.cover}>
        <SheetsCreateContext.Provider value={input.frame}>
          {input2}
        </SheetsCreateContext.Provider>
      </SheetsCreateContext3.Provider>
    </SheetsSheet.Provider>
  );
}

function useSheetsOpen2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(
    input.defaultOpen ?? false,
  );
  let value3: Dynamic = input.open ?? value;
  let value4: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    input.onOpenChange,
  );
  return {
    open: value3,
    onOpenChange: (0, React.useCallback)(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        value4?.(input2, options);
        if (!options.isCanceled) {
          value2(input2);
        }
      },
      [value4],
    ),
  };
}

var SheetsSheet3: Dynamic;

var SheetsConcealed: Dynamic;

function resolveSheetsUseContext3(..._extraArguments: unknown[]) {
  return (0, React.useContext)(SheetsCreateContext) !== null;
}

function resolveSheetsUseContext4(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = useSheetsSheet();
  let value2: boolean = (0, React.useContext)(SheetsCreateContext) !== null;
  return value || value2;
}

function useSheetsSheet2(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = useUiLinksAndFoundationUseSyncExternalStore5();
  let value2: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let value3: Dynamic = value2?.showing ?? false;
  let value4: Dynamic = value2?.open ?? false;
  let { sheet: value5 }: Dynamic = resolveSheetsUseContext2();
  let value6: Dynamic = !value3 || (value5 && value4);
  let [value7, value8]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      value !== null && value6 ? value : null,
  );
  return value7 === null && value !== null && value6
    ? (value8(value), value)
    : value7;
}

var SheetsCreateContext3: Dynamic;

var SheetsDurationSheetEaseOutMotionReduceTransitionNone: Dynamic;

var SheetsState5: Dynamic;

var SheetsMessage2: Dynamic;

var SheetsState6: Dynamic;

var SheetsState7: Dynamic;

var SheetsDraggableNoneFixedInset0BgTransparent: Dynamic;

var SheetsStyles2: Dynamic;

var SheetsStyles3: Dynamic;

var SheetsStyles4: Dynamic;

var SheetsDataCdsSheetPending: Dynamic;

var SheetsVisibility: Dynamic;

function useSheetsPreventScroll(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(input);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value2.current && !input) {
        value.current?.focus({
          preventScroll: true,
        });
      }
      value2.current = input;
    },
    [input],
  );
  return (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value.current = input2;
    },
    [],
  );
}

var resolveSheetsPreventDefault: (
  event?: Dynamic,
  ..._extraArguments: unknown[]
) => undefined;

function SheetsKind(
  { kind: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let value2: Dynamic = resolveUiProviderAndLayersUseContext9();
  let value3: Dynamic = resolveUiProviderAndLayersValue3(input);
  usePresentationCapture(value?.open ?? false, value?.dismiss);
  let [value4, value5]: Dynamic = (0, React.useState)(false);
  let value6: Dynamic = (0, React.useRef)(false);
  let value7: Dynamic = resolveUiProviderAndLayersUseContext10();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (value7 === undefined) return;
      let value9: Dynamic = value7.requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          value5(true);
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        value7.cancelAnimationFrame(value9);
      };
    },
    [value7],
  );
  let value8: Dynamic =
    value2 ??
    (typeof document === "undefined" ? null : (document as Dynamic).body);
  return value8 === null || value === null || !value.open
    ? null
    : (0, AvatarsState.createPortal)(
        <UiOverlaysAndIconsSurface
          {...originalJsxProps({
            ...value3.portalProps,
            children: (
              <div
                {...originalJsxProps({
                  role: `presentation`,
                  [SheetsDataCdsSheetPending]: ``,
                  className: appKDImport(SheetsState7, !value4 && `opacity-0`),
                  style: value3.style,
                  onPointerDown: (
                    input2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    value6.current = true;
                    resolveSheetsPreventDefault(input2);
                  },
                  onPointerCancel: (
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    value6.current = false;
                  },
                  onMouseDown: resolveSheetsPreventDefault,
                  onClick: (..._extraArguments: unknown[]): undefined => {
                    if (value6.current) {
                      value6.current = false;
                      value.dismiss();
                    }
                  },
                })}
              />
            ),
          })}
        />,
        value8,
      );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetsStackStep1(): void {
  SheetsCreateContext2 = (0, React.createContext)(null);
  SheetsSheet = (0, React.createContext)({
    sheet: false,
    pending: false,
    covered: false,
    inert: false,
    depth: 0,
  });
  SheetsState4 = inertProps(true);
  sheetsValue600 = 600;
  sheetsValue_1 = false;
  sheetsSet = new (Set as Dynamic)();
  sheetsSet2 = new (Set as Dynamic)([
    `outside-press`,
    `focus-out`,
    `escape-key`,
  ]);
  sheetsValue120 = 120;
  SheetsStyles = `[data-cds="Toast"], [aria-live]:not([aria-live="off"]), [role="status"], [role="alert"], [role="log"]`;
  SheetsSheet2 = {
    sheet: false,
    pending: false,
    covered: false,
    inert: false,
    depth: 0,
  };
  SheetsSheet3 = {
    sheet: false,
    concealed: false,
    chrome: null,
    ref: (..._extraArguments: unknown[]): undefined => undefined,
    style: undefined,
    positionerStyle: undefined,
    attrs: {},
    frame: null,
    state: SheetsSheet2,
    stack: null,
  };
  SheetsConcealed = {
    ...SheetsSheet3,
    concealed: true,
  };
  SheetsCreateContext3 = (0, React.createContext)(null);
  SheetsDurationSheetEaseOutMotionReduceTransitionNone = `duration-sheet ease-out motion-reduce:transition-none`;
  SheetsState5 = `group/sheet relative w-full min-w-0 max-w-none overflow-hidden rounded-t-card rounded-b-none pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-[translate,height,scale] ${SheetsDurationSheetEaseOutMotionReduceTransitionNone} [&_[data-cds-sheet-scroll]]:overscroll-contain [&[data-cds-sheet-pressed]_[data-cds-sheet-scroll]]:[scroll-padding-block:0px]`;
  SheetsMessage2 = `calc(100% + 1.5rem)`;
  SheetsState6 = `flex min-h-0 flex-1 flex-col transition-[translate] ${SheetsDurationSheetEaseOutMotionReduceTransitionNone} group-data-[cds-sheet-drilled]/sheet:-translate-x-full rtl:group-data-[cds-sheet-drilled]/sheet:translate-x-full`;
  SheetsState7 = `draggable-none fixed inset-0 bg-backdrop transition-opacity ${SheetsDurationSheetEaseOutMotionReduceTransitionNone} data-[starting-style]:opacity-0 data-[ending-style]:opacity-0`;
  SheetsDraggableNoneFixedInset0BgTransparent = `draggable-none fixed inset-0 bg-transparent`;
  SheetsStyles2 = `after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-[100dvh] after:bg-surface-3`;
  SheetsStyles3 = `[clip-path:inset(0_0_-200vh_0)]`;
  SheetsStyles4 = `[&_[role=separator]]:-mx-1 [&_[role=separator]]:mt-0`;
  SheetsDataCdsSheetPending = `data-cds-sheet-pending`;
  SheetsVisibility = {
    visibility: `hidden`,
    opacity: 0,
  };
  resolveSheetsPreventDefault = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    event.preventDefault();
  };
}

export {
  SheetsConcealed,
  SheetsCreateContext2,
  SheetsCreateContext3,
  SheetsDraggableNoneFixedInset0BgTransparent,
  SheetsKind,
  SheetsMessage2,
  SheetsSheet3,
  SheetsState4,
  SheetsState5,
  SheetsState6,
  SheetsState7,
  SheetsStyles2,
  SheetsStyles3,
  SheetsStyles4,
  SheetsValue,
  SheetsValue2,
  SheetsVisibility,
  resolveSheetsSheet,
  resolveSheetsUseContext2,
  resolveSheetsUseContext3,
  resolveSheetsUseContext4,
  useSheetsOpen,
  useSheetsOpen2,
  useSheetsPreventScroll,
  useSheetsSheet2,
};

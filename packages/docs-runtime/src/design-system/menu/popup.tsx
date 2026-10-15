/** BaoCut: menu popup from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseMenuPopup,
  BaseMenuPortal,
  BaseMenuPositioner,
  React,
  TooltipImplProvider,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiShortcutsAndSizingCreateContext3,
  UiShortcutsAndSizingKeys,
  UiShortcutsAndSizingOverride,
  UiTooltipsAndControlsPanel,
  jsxRuntime,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue4,
  resolveUiOverlaysAndIconsValue5,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  updateUiTooltipsAndControlsValue,
  useUiOverlaysAndIconsUseInsertionEffect2,
  useUiTooltipsAndControlsFinalFocus,
} from "../dependencies";
import { SheetsCreateContext } from "../sheets/gestures";
import {
  SheetsKind,
  SheetsVisibility,
  resolveSheetsUseContext2,
  resolveSheetsUseContext3,
  useSheetsPreventScroll,
  useSheetsSheet2,
} from "../sheets/stack";
import {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext2,
  MenuInteractionsCreateContext3,
  MenuInteractionsCreateContext5,
  MenuInteractionsCreateContext6,
  MenuInteractionsHeader,
  MenuInteractionsLabel,
  resolveMenuInteractionsContextElement,
  resolveMenuInteractionsWarn,
  resolveMenuInteractionsWarn2,
  useMenuInteractionsIsOpen2,
} from "./interactions";
import { MenuPopupsPopover } from "./popup-frame";
import {
  MenuPopupsCell,
  MenuPopupsCreateContext,
  resolveMenuPopupsCell,
} from "./focus";

var menuPopupsSet2: Dynamic;

var resolveMenuPopupsValue3: Dynamic;

var resolveMenuPopupsValue4: (..._extraArguments: unknown[]) => string;

var resolveMenuPopupsValue5: Dynamic;

var MenuPopupsCreateContext3: Dynamic;

function isMenuPopupsCancelOpen(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (input.reason !== `cancel-open`) return false;
  let value: Dynamic = input.trigger ?? null;
  let value2: Dynamic = input.event?.target ?? null;
  if (value === null || value2 === null || !(`nodeType` in value2))
    return false;
  let value3: Dynamic = value2;
  if (value.contains(value3)) return true;
  let attribute: Dynamic = value.getAttribute(`aria-controls`);
  return (
    (attribute
      ? value.ownerDocument.getElementById(attribute)
      : null
    )?.contains(value3) ?? false
  );
}

function useMenuPopupsTriggerRef(
  input?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  return {
    triggerRef: value,
    onOpenChange: useUiOverlaysAndIconsUseInsertionEffect2(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!input2 && options && isMenuPopupsCancelOpen(options2)) {
          options2.cancel?.();
          return;
        }
        value.current = options2.trigger ?? null;
        input?.(input2, options2);
      },
    ),
  };
}

function resolveMenuPopupsUseContext2(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(MenuPopupsCreateContext3);
}

var MenuPopupsProvider: Dynamic;

function useMenuPopupsUseContext(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useContext)(MenuPopupsCreateContext3);
  let value2: Dynamic = (0, React.useRef)(options);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      value2.current = options;
    },
    [options],
  );
  let value3: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value4: Dynamic =
        input === undefined ? (value?.current ?? null) : input.current;
      let current: Dynamic = value2.current;
      return current === false || typeof current == `function`
        ? null
        : current === undefined || current === true || current === null
          ? value4
          : (current.current ?? value4);
    },
    [input, value],
  );
  return (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (input2 !== null) {
        updateUiTooltipsAndControlsValue(input2, value3);
      }
    },
    [value3],
  );
}

function MenuPopupsValue(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let value2: Dynamic = (
    <MenuPopupsCreateContext.Provider value={options}>
      <MenuInteractionsCreateContext5.Provider value={context}>
        <MenuInteractionsCreateContext6.Provider value={null}>
          <MenuInteractionsCreateContext.Provider value={null}>
            <MenuInteractionsCreateContext2.Provider
              value={MenuInteractionsLabel}
            >
              <MenuInteractionsCreateContext3.Provider value={value}>
                {value ? (
                  input
                ) : (
                  <TooltipImplProvider>{input}</TooltipImplProvider>
                )}
              </MenuInteractionsCreateContext3.Provider>
            </MenuInteractionsCreateContext2.Provider>
          </MenuInteractionsCreateContext.Provider>
        </MenuInteractionsCreateContext6.Provider>
      </MenuInteractionsCreateContext5.Provider>
    </MenuPopupsCreateContext.Provider>
  );
  return value ? (
    <MenuPopupsProvider value={undefined}>{value2}</MenuPopupsProvider>
  ) : (
    value2
  );
}

var MenuPopupsAnchoredWithoutFinalFocus: Dynamic;

function isMenuPopupsDataSheetTree(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let value: Dynamic =
    resolveUiProviderAndLayersValue2(input)?.closest(`[data-nested]`) ?? null;
  if (value === null) return false;
  if (options === undefined) return true;
  let value2: Dynamic = resolveUiProviderAndLayersValue2(
    value.closest(`[data-sheet-tree]`),
  );
  return value2 !== null && value2.getAttribute(`data-sheet-tree`) === options;
}

function resolveMenuPopupsRelatedTarget(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    input !== undefined && `relatedTarget` in input && input.type === `focusout`
  );
}

function isMenuPopupsReason(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (input) return false;
  let { reason: value, event: value2 }: Dynamic = options;
  if (value === `outside-press`)
    return isMenuPopupsDataSheetTree(value2?.target, context);
  if (value === `focus-out` && resolveMenuPopupsRelatedTarget(value2)) {
    let value3: Dynamic = resolveUiProviderAndLayersValue2(
      value2.relatedTarget,
    );
    let value4: boolean =
      value2.relatedTarget === null ||
      (value3 !== null &&
        (value3 === value3.ownerDocument.body || !value3.isConnected));
    return (
      isMenuPopupsDataSheetTree(value2.relatedTarget, context) ||
      (value4 && isMenuPopupsDataSheetTree(value2.target, context))
    );
  }
  return false;
}

function resolveMenuPopupsCancel(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return isMenuPopupsReason(input, options, context)
    ? (options.cancel(), true)
    : false;
}

var MenuPopupsPointerEventsNone: Dynamic;

var MenuPopupsPointerEventsAuto: Dynamic;

var menuPopupsValue2: Dynamic;

function resolveMenuPopupsSide(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    side: element.getAttribute(`data-side`) || undefined,
    align: element.getAttribute(`data-align`) || undefined,
  };
}

function resolveMenuPopupsSide2(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    input !== null &&
    input.side === options.side &&
    input.align === options.align
  );
}

function resolveMenuPopupsBottom(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    input?.side === `top` ||
    (input?.side !== undefined &&
      input.side !== `bottom` &&
      input.align === `end`)
  );
}

function useMenuPopupsEnabled(
  { enabled: input, side: input2, align: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(null);
  let [value3, value4]: Dynamic = (0, React.useState)(null);
  let [value5, value6]: Dynamic = (0, React.useState)();
  let value7: Dynamic = (0, React.useRef)(null);
  let value8: Dynamic = (0, React.useRef)(false);
  let value9: Dynamic = (0, React.useRef)(null);
  let value10: Dynamic = (0, React.useCallback)(
    (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value9.current?.();
      value9.current = null;
      if (!element) {
        value2(null);
        value4(null);
        value8.current = false;
        return;
      }
      let value14: Dynamic = element.ownerDocument.defaultView ?? window;
      let value15: boolean = typeof value14.requestAnimationFrame == `function`;
      let index: number = 0;
      let index2: number = 0;
      let value16 = (..._extraArguments: unknown[]): undefined => {
        index2 += 1;
        if (index2 < menuPopupsValue2) {
          index = value14.requestAnimationFrame(value16);
          return;
        }
        index = 0;
        let value18: Dynamic = resolveMenuPopupsSide(element);
        value2(
          (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveMenuPopupsSide2(input4, value18) ? input4 : value18,
        );
      };
      let value17 = (..._extraArguments: unknown[]): undefined => {
        let value18: Dynamic = resolveMenuPopupsSide(element);
        value4(
          (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveMenuPopupsSide2(input4, value18) ? input4 : value18,
        );
        value8.current = resolveMenuPopupsBottom(value18);
        if (!value8.current) {
          let value19: Dynamic = value7.current?.getBoundingClientRect().height;
          value6(value19 !== undefined && value19 > 0 ? value19 : undefined);
        }
        index2 = 0;
        if (value15 && index === 0) {
          index = value14.requestAnimationFrame(value16);
        }
      };
      value17();
      let observer: Dynamic = new (MutationObserver as Dynamic)(value17);
      observer.observe(element, {
        attributes: true,
        attributeFilter: [`data-side`, `data-align`],
      });
      value9.current = (..._extraArguments: unknown[]): undefined => {
        observer.disconnect();
        if (index !== 0) {
          value14.cancelAnimationFrame(index);
        }
      };
    },
    [],
  );
  let value11: Dynamic = (0, React.useRef)(null);
  let value12: Dynamic = (0, React.useCallback)(
    (input4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value11.current?.disconnect();
      value11.current = null;
      value7.current = input4;
      if (!input4) {
        value6(undefined);
        return;
      }
      if (!input) return;
      let value14 = (..._extraArguments: unknown[]): undefined => {
        let height: Dynamic = input4.getBoundingClientRect().height;
        if (height > 0) {
          value6(
            (input5?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              value8.current && input5 !== undefined && height <= input5
                ? input5
                : height,
          );
        }
      };
      value14();
      if (typeof ResizeObserver !== "undefined") {
        let observer: Dynamic = new (ResizeObserver as Dynamic)(value14);
        observer.observe(input4);
        value11.current = observer;
      }
    },
    [input],
  );
  let value13: Dynamic =
    input && resolveMenuPopupsBottom(value3) && value5 !== undefined
      ? {
          positionerStyle: {
            minHeight: `min(${Math.floor(value5)}px, var(--available-height))`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `flex-end`,
          },
          positionerClassName: MenuPopupsPointerEventsNone,
          popupClassName: MenuPopupsPointerEventsAuto,
        }
      : null;
  return {
    positionerRef: input ? value10 : undefined,
    popupRef: value12,
    side: input ? (value?.side ?? input2) : input2,
    align: input ? (value?.align ?? input3) : input3,
    held: value13,
  };
}

function resolveMenuPopupsValue6(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined {
  if (typeof input == `string`) return input;
  if (typeof input == `number`) return String(input);
  if (input == null || typeof input == `boolean`) return ``;
  if (!Array.isArray(input)) return;
  let value: string = ``;
  for (let value2 of input as Dynamic) {
    let value3: Dynamic = resolveMenuPopupsValue6(value2);
    if (value3 === undefined) return;
    value += value3;
  }
  return value;
}

function resolveMenuPopupsTrim(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.replace(/\s+/g, ` `).trim();
}

function useMenuPopupsLabel(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(null);
  let [value3, value4]: Dynamic = (0, React.useState)();
  let value5: Dynamic =
    (options === undefined &&
      resolveMenuPopupsTrim(resolveMenuPopupsValue6(input) ?? ``)) ||
    undefined;
  let value6: boolean = options === undefined && value5 === undefined;
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): undefined => {
    if (!value6) return;
    let value7: Dynamic = resolveMenuPopupsTrim(
      value.current?.textContent ?? ``,
    );
    let value8: Dynamic = (value2.current?.textContent ?? ``).startsWith(
      value7,
    );
    let value9: Dynamic =
      value7 === `` || (value8 && value3 !== value7) ? undefined : value7;
    if (value9 !== value3) {
      value4(value9);
    }
  });
  return {
    label: options ?? value5 ?? (value6 ? value3 : undefined),
    labelSpanRef: value,
    rowRef: value2,
  };
}

var menuPopupsPattern: Dynamic;

function resolveMenuPopupsTabularNums(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return menuPopupsPattern.test(input) ? `tabular-nums` : ``;
}

function MenuPopupsKeys(
  { keys: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <UiShortcutsAndSizingKeys
      keys={input}
      variant={`text`}
      aria-hidden={true}
      className={resolveUiDesignSystemValue2(
        `pointer-coarse:hidden text-footnote`,
        resolveMenuPopupsTabularNums(input),
      )}
    />
  );
}

function MenuPopupsSide(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    side: value2,
    align: value16 = `start`,
    sideOffset: value3,
    collisionPadding: value4,
    collisionAvoidance: value5,
    anchor: value6,
    container: value7,
    className: value8,
    children: value9,
    header: value10,
    footer: value11,
    maxVisibleItems: value12,
    layerOffset: value13,
    stableWhileOpen: value17 = false,
    "data-cds": value18 = `Menu`,
    initialFocus: value14,
    ...value15
  }: Dynamic = input;
  let value19: Dynamic = resolveUiProviderAndLayersUseContext9();
  let value20: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext);
  let value21: Dynamic =
    (0, React.useContext)(MenuInteractionsCreateContext3) && value20 === null;
  let value22: Dynamic = (0, React.useContext)(
    UiShortcutsAndSizingCreateContext3,
  );
  let value23: Dynamic = value4 ?? value22?.collisionPadding;
  let value24: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      value6 !== undefined || !value20
        ? value6
        : resolveMenuInteractionsContextElement(value20),
    [value6, value20],
  );
  let value25: Dynamic =
    value3 ?? (value21 ? undefined : value20 && value6 === undefined ? 2 : 6);
  let value26: Dynamic = useMenuPopupsEnabled({
    enabled: value17 && !value21,
    side: value2,
    align: value16,
  });
  let value27: Dynamic = useMenuPopupsUseContext(
    value20?.triggerRef,
    value15.finalFocus,
  );
  let value28: boolean = value21
    ? value15.finalFocus === undefined || value15.finalFocus === null
    : value6 != null && value20 === null && value15.finalFocus === undefined;
  let value29: Dynamic = resolveMenuPopupsCell(value20 === null);
  value29.root?.declareFocusProps(value14, value15.finalFocus);
  if (context && value20 !== null && value14 !== undefined) {
    resolveMenuInteractionsWarn2();
  }
  let value30: Dynamic = useSheetsPreventScroll(value);
  let value31: Dynamic = resolveUiOverlaysAndIconsValue5(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value26.popupRef(input2);
      value27(input2);
      value30(input2);
      value29.root?.registerPopup(input2);
    },
    options,
  );
  if (context && value20 !== null && value13 !== undefined) {
    resolveMenuInteractionsWarn();
  }
  let value32: Dynamic = resolveUiProviderAndLayersBase2(
    value21 ? `contextmenu` : `menu`,
    value20 === null ? value13 : undefined,
  );
  return (
    <BaseMenuPortal container={value7 ?? value19}>
      <UiOverlaysAndIconsSurface
        {...originalJsxProps({
          ...value32.portalProps,
          style: value
            ? {
                ...value32.portalProps.style,
                ...SheetsVisibility,
              }
            : value32.portalProps.style,
          surface: UiTooltipsAndControlsPanel.popover,
          companionModalCatcher: true,
          closeOnActivityHide: true,
          children: (
            <UiShortcutsAndSizingOverride
              override={value23}
              container={value7 ?? value19}
              provideInherit={true}
            >
              {(input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                <UiProviderAndLayersCreateContext13.Provider
                  value={value32.base}
                >
                  <BaseMenuPositioner
                    ref={value26.positionerRef}
                    className={value26.held?.positionerClassName}
                    style={
                      value26.held === null
                        ? value32.style
                        : {
                            ...value32.style,
                            ...value26.held.positionerStyle,
                          }
                    }
                    side={value26.side}
                    align={value26.align}
                    sideOffset={value25}
                    collisionPadding={input2}
                    collisionAvoidance={value5}
                    anchor={value24}
                  >
                    <MenuPopupsCell
                      cell={value29.cell}
                      nested={value20 !== null}
                    >
                      {(
                        input3?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => (
                        <MenuPopupsAnchoredWithoutFinalFocus
                          {...originalJsxProps({
                            anchoredWithoutFinalFocus: value28,
                            cursorAnchored: value21,
                            "data-cds": value18,
                            ref: value31,
                            ...input3(value15),
                            className: resolveUiDesignSystemValue2(
                              MenuPopupsPopover,
                              value26.held?.popupClassName,
                              value8,
                            ),
                            children: (
                              <MenuInteractionsHeader
                                header={value10}
                                footer={value11}
                                maxVisibleItems={value12}
                              >
                                {value9}
                              </MenuInteractionsHeader>
                            ),
                          })}
                        />
                      )}
                    </MenuPopupsCell>
                  </BaseMenuPositioner>
                </UiProviderAndLayersCreateContext13.Provider>
              )}
            </UiShortcutsAndSizingOverride>
          ),
        })}
      />
    </BaseMenuPortal>
  );
}

var MenuPopupsAlign: Dynamic;

var MenuPopupsPending: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuPopupStep1(): void {
  menuPopupsSet2 = new (Set as Dynamic)([
    `Shift`,
    `Control`,
    `Alt`,
    `Meta`,
    `AltGraph`,
    `CapsLock`,
    `NumLock`,
    `ScrollLock`,
    `Fn`,
    `FnLock`,
    `Hyper`,
    `Super`,
    `Symbol`,
    `SymbolLock`,
  ]);
  resolveMenuPopupsValue3 =
    (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined =>
      undefined;
  resolveMenuPopupsValue4 = (..._extraArguments: unknown[]) => `off`;
  resolveMenuPopupsValue5 = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => input;
  MenuPopupsCreateContext3 = (0, React.createContext)(undefined);
  MenuPopupsProvider = MenuPopupsCreateContext3.Provider;
  MenuPopupsAnchoredWithoutFinalFocus = (0, React.forwardRef)(
    (
      {
        anchoredWithoutFinalFocus: input,
        cursorAnchored: input4 = false,
        finalFocus: input2,
        ...input3
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic =
        (0, React.useContext)(SheetsCreateContext)?.open ?? true;
      let { elementRef: value2, overlayAttrs: value3 }: Dynamic =
        useMenuInteractionsIsOpen2();
      let value4: Dynamic = useUiTooltipsAndControlsFinalFocus({
        open: value,
        skipRestoreOnOutsideFocus: !input4,
        registerOpenerReturn: input,
        triggerRef: resolveMenuPopupsUseContext2(),
      });
      let value5: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        value2,
        input ? value4.popupRef : undefined,
      );
      return (
        <BaseMenuPopup
          {...originalJsxProps({
            ...value3,
            ref: value5,
            finalFocus:
              (input2 === undefined || (input4 && input2 === null)) && input
                ? value4.finalFocus
                : input2,
            ...input3,
          })}
        />
      );
    },
  );
  MenuPopupsAnchoredWithoutFinalFocus.displayName = `MenuPopupElement`;
  MenuPopupsPointerEventsNone = `pointer-events-none`;
  MenuPopupsPointerEventsAuto = `pointer-events-auto`;
  menuPopupsValue2 = 2;
  menuPopupsPattern = /^\d+$/;
  MenuPopupsAlign = (0, React.forwardRef)(
    (
      {
        align: input2 = `start`,
        stableWhileOpen: input3 = false,
        "data-cds": input4 = `Menu`,
        ...input
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let state: Dynamic = {
        align: input2,
        stableWhileOpen: input3,
        "data-cds": input4,
        ...input,
      };
      let value: boolean = resolveSheetsUseContext3();
      let value2: Dynamic = MenuPopupsSide(state, options, !value, false);
      return value ? (
        <MenuPopupsPending
          {...originalJsxProps({
            ...state,
            ref: options,
          })}
        />
      ) : (
        value2
      );
    },
  );
  MenuPopupsAlign.displayName = `Menu.Popup`;
  MenuPopupsPending = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = useSheetsSheet2();
      let { pending: value2 }: Dynamic = resolveSheetsUseContext2();
      let value3: Dynamic = (0, React.useContext)(
        MenuInteractionsCreateContext,
      );
      let value4: string =
        (0, React.useContext)(MenuInteractionsCreateContext3) && value3 === null
          ? `contextmenu`
          : `menu`;
      let value5: Dynamic = MenuPopupsSide(
        input,
        options,
        value === null,
        value === null && value2,
      );
      return value === null ? (
        <jsxRuntime.Fragment>
        {value5}
        {value2 && value3 === null ? <SheetsKind kind={value4} /> : null}
      </jsxRuntime.Fragment>
      ) : (
        <value.MenuSheetPopup
          {...originalJsxProps({
            ...input,
            ref: options,
          })}
        />
      );
    },
  );
  MenuPopupsPending.displayName = `MenuSheetCapablePopup`;
}

export {
  MenuPopupsAlign,
  MenuPopupsAnchoredWithoutFinalFocus,
  MenuPopupsKeys,
  MenuPopupsProvider,
  MenuPopupsValue,
  isMenuPopupsReason,
  menuPopupsSet2,
  resolveMenuPopupsCancel,
  resolveMenuPopupsTabularNums,
  resolveMenuPopupsValue3,
  resolveMenuPopupsValue4,
  resolveMenuPopupsValue5,
  useMenuPopupsEnabled,
  useMenuPopupsLabel,
  useMenuPopupsTriggerRef,
  useMenuPopupsUseContext,
};

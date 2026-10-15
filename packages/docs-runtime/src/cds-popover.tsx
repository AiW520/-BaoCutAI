/** BaoCut: popover from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  BasePopoverArrow,
  BasePopoverClose,
  BasePopoverDescription,
  BasePopoverPopup,
  BasePopoverPortal,
  BasePopoverPositioner,
  BasePopoverRoot,
  BasePopoverTitle,
  BasePopoverTrigger,
  BasePopovercreateHandle,
  React,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsActionsRef,
  UiOverlaysAndIconsDataCdsOverlay,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiTooltipsAndControlsPanel,
  jsxRuntime,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiTooltipsAndControlsClose,
  resolveUiTooltipsAndControlsMatches,
  resolveUiTooltipsAndControlsValue3,
  useUiTooltipsAndControlsFinalFocus,
} from "./cds-dependencies";
import {
  SheetsComfortable,
  SheetsDataCdsSheetScroll,
  SheetsDisableAnchorTracking,
  useSheetsWasOpen,
} from "./cds-sheets-geometry";
import { SheetsCreateContext } from "./cds-sheets-gestures";
import {
  SheetsSheet3,
  SheetsState5,
  SheetsStyles2,
  SheetsValue2,
  SheetsVisibility,
  resolveSheetsUseContext3,
  resolveSheetsUseContext4,
  useSheetsOpen,
  useSheetsOpen2,
  useSheetsPreventScroll,
} from "./cds-sheets-stack";
import {
  MenuInteractionsCreateContext7,
  isMenuInteractionsEscapeKey,
  resolveMenuInteractionsRegister,
} from "./cds-menu-interactions";
import { resolveMenuPopupsDraggable } from "./cds-menu-focus";
import { MenuPopupsKind } from "./cds-menu-search";

var PopoverPopover: Dynamic;

var PopoverStyles: Dynamic;

var PopoverNone: Dynamic;

function usePopoverState(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [input, options],
  );
}

function resolvePopoverIsValidElement(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.isValidElement)(input) && input.type === BasePopoverArrow;
}

var PopoverAnchored: Dynamic;

var PopoverSide: Dynamic;

var PopoverKind: Dynamic;

var PopoverSheetPopup: Dynamic;

var PopoverCreateContext: Dynamic;

var PopoverCreateContext2: Dynamic;

function usePopoverInnerOverlays(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value]: Dynamic = (0, React.useState)(resolveMenuInteractionsRegister);
  return {
    innerOverlays: value,
    onOpenChange: (0, React.useCallback)(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!isMenuInteractionsEscapeKey(value, input2, options)) {
          input?.(input2, options);
        }
      },
      [value, input],
    ),
  };
}

function resolvePopoverCurrent(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let anchor: Dynamic = input.anchor;
  if (anchor == null) return input.triggerEl;
  if (anchor instanceof (Element as Dynamic)) return anchor;
  if (typeof anchor == `object` && `current` in anchor) {
    let current: Dynamic = anchor.current;
    return current instanceof (Element as Dynamic) ? current : null;
  }
  return `virtual`;
}

function isPopoverVirtual(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!input.popupMounted || !input.declinesFocus) return false;
  let value: Dynamic = resolvePopoverCurrent(input);
  return value === `virtual`
    ? true
    : value === null
      ? false
      : resolveUiTooltipsAndControlsMatches(value) ||
        value.querySelector(
          `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`,
        ) !== null ||
        value.closest(
          `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`,
        ) !== null;
}

function PopoverActionsRef(
  { onOpenChange: input, actionsRef: input2, ...input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = usePopoverInnerOverlays(input);
  let value2: Dynamic = resolveSheetsUseContext4();
  let value3: Dynamic = (0, React.useRef)(null);
  resolveUiTooltipsAndControlsClose(value3, input2);
  return (
    <PopoverCreateContext2.Provider value={value.innerOverlays}>
      <UiOverlaysAndIconsActionsRef actionsRef={value3}>
        {value2 ? (
          <PopoverConsumerHandlesOpenChange
            {...originalJsxProps({
              ...input3,
              actionsRef: value3,
              onOpenChange: value.onOpenChange,
              consumerHandlesOpenChange: input !== undefined,
            })}
          />
        ) : (
          <BasePopoverRoot
            {...originalJsxProps({
              ...input3,
              actionsRef: value3,
              onOpenChange: value.onOpenChange,
            })}
          />
        )}
      </UiOverlaysAndIconsActionsRef>
    </PopoverCreateContext2.Provider>
  );
}

function PopoverConsumerHandlesOpenChange(
  { consumerHandlesOpenChange: input, ...input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = useSheetsOpen2(input2);
  let value2: Dynamic = (0, React.useRef)({
    popupMounted: false,
    declinesFocus: false,
    anchor: undefined,
    triggerEl: null,
  });
  let value3: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      update: (input3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        Object.assign(value2.current, input3);
      },
      read: (..._extraArguments: unknown[]): Dynamic => value2.current,
    }),
    [],
  );
  let value4: Dynamic = useSheetsWasOpen(
    value.open,
    (..._extraArguments: unknown[]): Dynamic => {
      let value6: Dynamic = value3.read();
      return !value6.popupMounted || isPopoverVirtual(value6);
    },
    false,
  );
  let value5: Dynamic = useSheetsOpen({
    open: value.open,
    actionsRef: input2.actionsRef,
    onOpenChange: value.onOpenChange,
    onOpenChangeComplete: input2.onOpenChangeComplete,
    structurallyAnchored: value4,
    closable: !(input2.open !== undefined && !input),
  });
  return (
    <PopoverCreateContext.Provider value={value3}>
      <SheetsValue2 value={value5}>
        <BasePopoverRoot
          {...originalJsxProps({
            ...input2,
            modal: value5.modal ?? input2.modal,
            actionsRef: value5.actionsRef,
            onOpenChange: value5.onOpenChange,
            onOpenChangeComplete: value5.onOpenChangeComplete,
          })}
        />
      </SheetsValue2>
    </PopoverCreateContext.Provider>
  );
}

var PopoverTriggerEl: Dynamic;

var Popover: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializePopoverStep1(): void {
  PopoverPopover = `draggable-none max-w-[320px] max-h-[var(--available-height)] ${resolveUiTooltipsAndControlsValue3(`popover`)} cds-reset text-body font-normal text-primary outline-none focus-visible:outline-hidden`;
  PopoverStyles = `[display:inherit] [flex-direction:inherit] [flex-wrap:inherit] [align-items:inherit] [justify-content:inherit] [justify-items:inherit] [gap:inherit] [grid-template-columns:inherit] [grid-template-rows:inherit] [grid-auto-flow:inherit] [grid-auto-columns:inherit] [grid-auto-rows:inherit] col-span-full row-span-full self-stretch justify-self-stretch max-h-[inherit] min-h-0 min-w-0 flex-auto overflow-y-auto rounded-[inherit] outline-none focus-visible:outline-hidden`;
  PopoverNone = {
    none: `p-0`,
    xs: `p-xs`,
    sm: `p-sm`,
    md: `p-md`,
    lg: `p-lg`,
  };
  PopoverAnchored = (0, React.forwardRef)(
    (
      {
        anchored: input,
        finalFocus: input2,
        className: input3,
        children: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic =
        (0, React.useContext)(SheetsCreateContext)?.open ?? true;
      let value2: Dynamic = input && input2 === undefined;
      let value3: Dynamic = useUiTooltipsAndControlsFinalFocus({
        skipRestoreOnOutsideFocus: true,
        open: value,
        registerOpenerReturn: value2,
      });
      let value4: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        value3.popupRef,
      );
      return (
        <BasePopoverPopup
          {...originalJsxProps({
            "data-cds": `Popover`,
            [UiOverlaysAndIconsDataCdsOverlay]: ``,
            ref: value4,
            finalFocus: value2 ? value3.finalFocus : input2,
            ...input5,
            className: input3,
            children: input4,
          })}
        />
      );
    },
  );
  PopoverAnchored.displayName = `Popover.PopupInner`;
  PopoverSide = (0, React.forwardRef)(
    (
      {
        side: input2 = `bottom`,
        align: input3 = `center`,
        sideOffset: input4 = 6,
        padding: input5 = `lg`,
        scrollFade: input6 = true,
        ...input
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let state: Dynamic = {
        side: input2,
        align: input3,
        sideOffset: input4,
        padding: input5,
        scrollFade: input6,
        ...input,
      };
      return resolveSheetsUseContext3() ? (
        <PopoverKind
          {...originalJsxProps({
            ...state,
            ref: options,
          })}
        />
      ) : (
        <PopoverSheetPopup
          {...originalJsxProps({
            ...state,
            ref: options,
            sheetPopup: SheetsSheet3,
            sheetParts: null,
          })}
        />
      );
    },
  );
  PopoverSide.displayName = `Popover.Popup`;
  PopoverKind = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <MenuPopupsKind kind={`popover`}>
      {(
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => (
          <PopoverSheetPopup
            {...originalJsxProps({
              ...input,
              ref: options,
              sheetPopup: input2,
              sheetParts: options2,
            })}
          />
        )}
    </MenuPopupsKind>
    ),
  );
  PopoverKind.displayName = `PopoverSheetCapablePopup`;
  PopoverSheetPopup = (0, React.forwardRef)(function (
    { sheetPopup: input, sheetParts: input2, ...input3 }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let {
      side: value12 = `bottom`,
      align: value13 = `center`,
      sideOffset: value14 = 6,
      alignOffset: value,
      anchor: value2,
      collisionPadding: value3,
      padding: value15 = `lg`,
      scrollFade: value16 = true,
      layerOffset: value4,
      closeLabel: value5,
      sheetHeight: value6,
      className: value7,
      children: value8,
      onFocus: value9,
      onMouseDown: value10,
      keepFocus: value17 = false,
      ...value11
    }: Dynamic = input3;
    let value18: Dynamic = (0, React.useRef)(null);
    let sheet: Dynamic = input.sheet;
    let value19: Dynamic = (0, React.useContext)(SheetsCreateContext);
    let value20: Dynamic =
      (value19?.open ?? false) && value19?.height !== undefined;
    let value21: Dynamic = value19?.setDetent;
    UiDesignSystemUseLayoutEffect(
      (..._extraArguments: unknown[]): undefined => {
        let current: Dynamic = value18.current;
        if (
          sheet &&
          value20 &&
          value6 === `tall` &&
          current !== null &&
          current.querySelector(
            `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`,
          ) !== null
        ) {
          value21?.(`tall`);
        }
      },
      [sheet, value20, value6, value21],
    );
    let value22: Dynamic = input.sheet && input2 !== null ? input2 : null;
    let value23: Dynamic = (0, React.useContext)(PopoverCreateContext);
    let value24: Dynamic = value11.initialFocus === false;
    let value25 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value32: Dynamic = resolveUiProviderAndLayersValue2(event.target);
      if (
        !(
          !value17 ||
          value32 === null ||
          !event.currentTarget.contains(value32) ||
          resolveMenuPopupsDraggable(event, {
            draggable: true,
          })
        )
      ) {
        event.preventDefault();
      }
    };
    let value26: Dynamic = (0, React.useContext)(PopoverCreateContext2);
    UiDesignSystemUseLayoutEffect(
      (..._extraArguments: unknown[]): Dynamic => {
        if (value23 !== null) {
          value23.update({
            popupMounted: true,
            declinesFocus: value24,
            anchor: value2,
          });
          return (..._extraArguments: unknown[]): undefined => {
            value23.update({
              popupMounted: false,
            });
          };
        }
      },
      [value23, value24, value2],
    );
    let value27: Dynamic = useSheetsPreventScroll(input.concealed && !value24);
    let value28: Dynamic = resolveUiOverlaysAndIconsValue4(
      options,
      input.ref,
      value27,
    );
    let value29: Dynamic = resolveUiProviderAndLayersBase2(`popover`, value4);
    usePopoverState(value7, value11.style);
    let value30: Dynamic = React.Children.toArray(value8);
    let filtered: Dynamic = value30.filter(resolvePopoverIsValidElement);
    let value31: Dynamic = (
      <MenuInteractionsCreateContext7.Provider value={value26}>
      {value30.filter(
          (input4?: Dynamic, ..._extraArguments: unknown[]) =>
            !resolvePopoverIsValidElement(input4),
        )}
    </MenuInteractionsCreateContext7.Provider>
    );
    return (
      <BasePopoverPortal container={resolveUiProviderAndLayersUseContext9()}>
      <UiOverlaysAndIconsSurface
          {...originalJsxsProps({
            ...value29.portalProps,
            style: input.concealed
              ? {
                  ...value29.portalProps.style,
                  ...SheetsVisibility,
                }
              : value29.portalProps.style,
            surface: UiTooltipsAndControlsPanel.popover,
            density: sheet ? SheetsComfortable : undefined,
            companionModalCatcher: !sheet,
            closeOnActivityHide: true,
            children: [
              value22 !== null && input.sheet && (
                <value22.PopoverSheetBackdrop sheetPopup={input} />
              ),
              <UiProviderAndLayersCreateContext13.Provider value={value29.base}>
              <BasePopoverPositioner
                  {...originalJsxProps({
                    style:
                      input.positionerStyle === undefined
                        ? value29.style
                        : {
                            ...value29.style,
                            ...input.positionerStyle,
                          },
                    side: value12,
                    align: value13,
                    sideOffset: value14,
                    alignOffset: value,
                    anchor: value2,
                    collisionPadding: value3,
                    ...(sheet ? SheetsDisableAnchorTracking : {}),
                    className:
                      sheet && input.state.depth === 0
                        ? SheetsStyles2
                        : undefined,
                    children: (
                      <PopoverAnchored
                        {...originalJsxProps({
                          anchored: value2 != null,
                          ref: value28,
                          ...input.attrs,
                          ...value11,
                          ...(sheet
                            ? {
                                initialFocus: undefined,
                              }
                            : {}),
                          onMouseDown: sheet
                            ? value10
                            : (
                                input4?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): undefined => {
                                value10?.(input4);
                                value25(input4);
                              },
                          style:
                            input.style === undefined
                              ? value11.style
                              : typeof value11.style == `function`
                                ? (
                                    input4?: Dynamic,
                                    ..._extraArguments: unknown[]
                                  ): Dynamic => ({
                                    ...value11.style(input4),
                                    ...input.style,
                                  })
                                : {
                                    ...value11.style,
                                    ...input.style,
                                  },
                          onFocus: (
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            value9?.(event);
                            let currentTarget: Dynamic = event.currentTarget;
                            if (
                              event.target === currentTarget &&
                              currentTarget.ownerDocument.activeElement ===
                                currentTarget
                            ) {
                              value18.current?.focus({
                                preventScroll: true,
                              });
                            }
                          },
                          className: resolveUiDesignSystemValue2(
                            PopoverPopover,
                            sheet && SheetsState5,
                            sheet &&
                              `data-[starting-style]:translate-y-[calc(100%+1.5rem)] data-[ending-style]:translate-y-[calc(100%+1.5rem)]`,
                            sheet &&
                              `origin-top [&[data-cds-sheet-covered]:not([data-starting-style]):not([data-ending-style])]:-translate-y-3 data-[cds-sheet-covered]:scale-[0.94] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-backdrop after:opacity-0 after:transition-opacity after:duration-sheet motion-reduce:after:transition-none data-[cds-sheet-covered]:after:opacity-100`,
                            sheet && `flex flex-col`,
                            !sheet && value7,
                          ),
                          children:
                            value22 !== null && input.sheet ? (
                              <value22.PopoverSheetContent
                                sheetPopup={input}
                                className={value7}
                                bodyRef={value18}
                                bodyClassName={resolveUiDesignSystemValue2(
                                  PopoverStyles,
                                  value16 && `scroll-fade-y`,
                                  PopoverNone[value15],
                                )}
                                closeLabel={value5}
                              >
                              {value31}
                            </value22.PopoverSheetContent>
                            ) : (
                              <jsxRuntime.Fragment>
                              <div
                                  {...originalJsxProps({
                                    ref: value18,
                                    tabIndex: -1,
                                    "data-cds-popover-body": ``,
                                    [SheetsDataCdsSheetScroll]: ``,
                                    className: resolveUiDesignSystemValue2(
                                      PopoverStyles,
                                      value16 && `scroll-fade-y`,
                                      PopoverNone[value15],
                                    ),
                                    children: value31,
                                  })}
                                />
                              {filtered}
                            </jsxRuntime.Fragment>
                            ),
                        })}
                      />
                    ),
                  })}
                />
            </UiProviderAndLayersCreateContext13.Provider>,
            ],
          })}
        />
    </BasePopoverPortal>
    );
  });
  PopoverSheetPopup.displayName = `PopoverPopupView`;
  PopoverCreateContext = (0, React.createContext)(null);
  PopoverCreateContext2 = (0, React.createContext)(null);
  (PopoverActionsRef as Dynamic).displayName = `Popover.Root`;
  PopoverTriggerEl = (0, React.forwardRef)(function (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (0, React.useContext)(PopoverCreateContext);
    let value2: Dynamic = resolveUiOverlaysAndIconsValue4(
      options,
      (0, React.useCallback)(
        (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value?.update({
            triggerEl: input2,
          });
        },
        [value],
      ),
    );
    return (
      <BasePopoverTrigger
        {...originalJsxProps({
          ...input,
          ref: value2,
        })}
      />
    );
  });
  PopoverTriggerEl.displayName = `Popover.Trigger`;
  Popover = {
    Root: PopoverActionsRef,
    Trigger: PopoverTriggerEl,
    Popup: PopoverSide,
    Title: BasePopoverTitle,
    Description: BasePopoverDescription,
    Close: BasePopoverClose,
    Arrow: BasePopoverArrow,
    createHandle: BasePopovercreateHandle,
  };
}

export { Popover };

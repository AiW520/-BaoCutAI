/** BaoCut: menu search from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseMenuGroup,
  BaseMenuTrigger,
  BaseMenubar,
  BaseSeparator,
  React,
  UiDesignSystemUseLayoutEffect,
  UiLinksAndFoundationStyles2,
  jsxRuntime,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue3,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersValue2,
  useUiLinksAndFoundationUseSyncExternalStore,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "../dependencies";
import { isPresentationInline } from "../presentation";
import { ShimmerContainer, Skeleton } from "../skeleton";
import { TextInput } from "../text-input";
import {
  SheetsConcealed,
  SheetsKind,
  SheetsSheet3,
  resolveSheetsSheet,
  resolveSheetsUseContext2,
  useSheetsSheet2,
} from "../sheets/stack";
import {
  installSheetsCapture,
  resolveSheetsEnter,
  resolveSheetsIsComposing,
  resolveSheetsValue5,
} from "../sheets/keyboard";
import {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext4,
  MenuInteractionsCreateContext5,
  MenuInteractionsCreateContext6,
} from "./interactions";
import { MenuPopupsAlign } from "./popup";
import {
  MenuPopupsActionsRef,
  MenuPopupsIcon,
  MenuPopupsIcon2,
  MenuPopupsLabel,
  MenuPopupsView,
  MenuPopupsView2,
} from "./items";
import {
  MenuPopupsDisabled,
  MenuPopupsSheetTitle,
  MenuPopupsTriggerRef,
} from "./root";

function UseMenuPopupsResetComponent(
  { reset: input }: Dynamic,
  ..._extraArguments: unknown[]
) {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        input(),
    [input],
  );
  return null;
}

function resolveMenuPopupsAltGraph(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.getModifierState(`AltGraph`);
  return (
    ((input.key.length === 1 && input.key !== ` `) ||
      input.key === `Backspace` ||
      (input.key === `Delete` && !input.shiftKey)) &&
    (!input.ctrlKey || value) &&
    !input.metaKey &&
    (!input.altKey || value) &&
    input.keyCode !== 229
  );
}

function UseMenuPopupsInputRefComponent(
  { inputRef: input, applyKey: input2 }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let value: Dynamic = (0, React.useContext)(
    MenuInteractionsCreateContext,
  )?.triggerRef;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value2: Dynamic = value?.current;
      if (!value2) return;
      let value3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(event.isComposing || !resolveMenuPopupsAltGraph(event))) {
          event.preventDefault();
          event.stopPropagation();
          input.current?.focus({
            preventScroll: true,
          });
          input2(event.key);
        }
      };
      value2.addEventListener(`keydown`, value3, true);
      return (..._extraArguments: unknown[]): Dynamic =>
        value2.removeEventListener(`keydown`, value3, true);
    },
    [value, input, input2],
  );
  return null;
}

function UseMenuPopupsInputRef2Component(
  { inputRef: input }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let value: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value2: Dynamic = value?.triggerRef.current;
      if (!value || !value2) return;
      let { openRef: value3 }: Dynamic = value;
      let value4 = (
        input2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let current: Dynamic = input.current;
        let value5: Dynamic = resolveUiProviderAndLayersValue2(
          input2.relatedTarget,
        );
        if (
          current &&
          value5 &&
          value3.current &&
          current.closest(`[role="menu"]`)?.contains(value5)
        ) {
          current.focus({
            preventScroll: true,
          });
        }
      };
      value2.addEventListener(`focus`, value4);
      return (..._extraArguments: unknown[]): Dynamic =>
        value2.removeEventListener(`focus`, value4);
    },
    [value, input],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value2 = (..._extraArguments: unknown[]): undefined => {
        let current: Dynamic = input.current;
        if (!current) return;
        let value4: Dynamic = current.closest(`[role="menu"]`);
        let activeElement: Dynamic = current.ownerDocument.activeElement;
        if (!(value4?.contains(activeElement) && activeElement !== value4)) {
          current.focus({
            preventScroll: true,
          });
        }
      };
      value2();
      let index: number = 0;
      let index2: number = 0;
      let value3 = (..._extraArguments: unknown[]): undefined => {
        value2();
        index += 1;
        if (index < 2) {
          index2 = requestAnimationFrame(value3);
        }
      };
      index2 = requestAnimationFrame(value3);
      return (..._extraArguments: unknown[]): void =>
        cancelAnimationFrame(index2);
    },
    [input],
  );
  return null;
}

function MenuPopupsSearchLabel(
  {
    children: input,
    searchLabel: input2,
    query: input3,
    onQueryChange: input4,
    resetQueryOnClose: input10 = true,
    onSubmitQuery: input5,
    beforeSearch: input6,
    onKeyDown: input7,
    onFocus: input8,
    stableWhileOpen: input11 = true,
    ...input9
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(``);
  let value3: Dynamic = input3 ?? value;
  let value4: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
    (input12?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value2(input12);
      input4?.(input12);
    },
  );
  let value5: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
    (..._extraArguments: unknown[]): undefined => {
      if (value3 !== ``) {
        value4(``);
      }
    },
  );
  (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [input3, input4],
  );
  let value6: Dynamic = resolveSheetsSheet();
  let value7: Dynamic = useUiLinksAndFoundationUseSyncExternalStore(
    resolveUiProviderAndLayersUseContext10(),
    UiLinksAndFoundationStyles2,
  );
  let value8: boolean = !value6 && !value7;
  let value9: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext6);
  let value10: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext5);
  let value11: Dynamic = value9 ?? value10;
  let value12: Dynamic = (0, React.useRef)(null);
  let value13: Dynamic = (0, React.useRef)(null);
  let value14: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        value14.current?.(),
    [],
  );
  let value15: Dynamic = (0, React.useCallback)(
    (input12?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value13.current;
      if (!current) return;
      let { value: value17 }: Dynamic = current;
      let value18: Dynamic = current.selectionStart ?? value17.length;
      let value19: Dynamic = current.selectionEnd ?? value17.length;
      let value20: boolean = input12 === `Backspace` || input12 === `Delete`;
      let value21: Dynamic = value20 ? `` : input12;
      if (value20 && value18 === value19)
        if (input12 === `Backspace`) {
          let value24: boolean =
            (value17.codePointAt(value18 - 2) ?? 0) > 65535;
          value18 = Math.max(0, value18 - (value24 ? 2 : 1));
        } else {
          let value24: boolean = (value17.codePointAt(value19) ?? 0) > 65535;
          value19 = Math.min(value17.length, value19 + (value24 ? 2 : 1));
        }
      let value22: Dynamic =
        value17.slice(0, value18) + value21 + value17.slice(value19);
      let value23: Dynamic = current.ownerDocument.defaultView ?? window;
      Object.getOwnPropertyDescriptor(
        value23.HTMLInputElement.prototype,
        `value`,
      )?.set?.call(current, value22);
      current.setSelectionRange(
        value18 + value21.length,
        value18 + value21.length,
      );
      current.dispatchEvent(
        new (Event as Dynamic)(`input`, {
          bubbles: true,
        }),
      );
    },
    [],
  );
  let value16: Dynamic = (..._extraArguments: unknown[]): boolean => {
    let current: Dynamic = value12.current;
    let value17: Dynamic =
      current?.querySelector(`[tabindex="0"]`) ??
      current?.querySelector(`input, button, [role="radio"]`);
    return value17 ? (value17.focus(), true) : false;
  };
  return (
    <MenuPopupsAlign
      {...originalJsxsProps({
        ...input9,
        stableWhileOpen: input11,
        onKeyDown: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let current: Dynamic = value13.current;
          if (
            !current ||
            event.target.closest?.(`input, textarea, [contenteditable]`) ||
            event.nativeEvent.isComposing ||
            !resolveMenuPopupsAltGraph(event)
          ) {
            input7?.(event);
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          event.preventBaseUIHandler();
          current.focus({
            preventScroll: true,
          });
          value15(event.key);
        },
        onFocus: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          input8?.(event);
          let currentTarget: Dynamic = event.currentTarget;
          let ownerDocument: Dynamic = currentTarget.ownerDocument;
          if (
            !value8 ||
            event.target !== currentTarget ||
            ownerDocument.activeElement !== currentTarget
          )
            return;
          let value17: Dynamic = resolveUiProviderAndLayersValue2(
            event.relatedTarget,
          );
          if (
            !(
              value17?.hasAttribute(`data-popup-open`) &&
              currentTarget.contains(value17)
            )
          ) {
            value13.current?.focus({
              preventScroll: true,
            });
            return;
          }
          value14.current?.();
          let value18 = (
            event2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let value19: Dynamic = resolveUiProviderAndLayersValue2(
              event2.target,
            );
            let value20: Dynamic = value19?.closest(`[role="menu"]`);
            let bounds: Dynamic = currentTarget.getBoundingClientRect();
            let value21: boolean =
              event2.clientX >= bounds.left &&
              event2.clientX < bounds.right &&
              event2.clientY >= bounds.top &&
              event2.clientY < bounds.bottom;
            if (!(!value20 && value21)) {
              value14.current?.();
              if (
                !(
                  value20 &&
                  (value20 !== currentTarget ||
                    value19?.closest(`[role^="menuitem"]`))
                ) &&
                ownerDocument.activeElement === currentTarget
              ) {
                value13.current?.focus({
                  preventScroll: true,
                });
              }
            }
          };
          ownerDocument.addEventListener(`mousemove`, value18);
          value14.current = (..._extraArguments: unknown[]): undefined => {
            ownerDocument.removeEventListener(`mousemove`, value18);
            value14.current = null;
          };
        },
        onMouseDown: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let target: Dynamic = event.target;
          if (
            !(
              (resolveUiOverlaysAndIconsValue3(target) &&
                target.localName === `input`) ||
              target === event.currentTarget ||
              (target.classList.contains(`overflow-y-auto`) &&
                isPresentationInline(
                  event.nativeEvent.offsetX,
                  event.nativeEvent.offsetY,
                  target,
                ))
            )
          ) {
            event.preventDefault();
          }
        },
        header: (
          <jsxRuntime.Fragment>
            {input6 !== undefined && (
              <div
                ref={value12}
                role={`presentation`}
                className={`px-sm pt-sm`}
                onKeyDown={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (event.key !== `Escape`) {
                    event.stopPropagation();
                    if (event.key === `Tab`) {
                      event.preventDefault();
                      value13.current?.focus();
                    }
                  }
                }}
              >
                {input6}
              </div>
            )}
            <TextInput
              ref={value13}
              value={value3}
              onChange={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => value4(event.target.value)}
              onCompositionEnd={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => resolveSheetsValue5(event.nativeEvent.timeStamp)}
              onKeyDown={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                resolveSheetsEnter(event);
                if (event.nativeEvent.isComposing || event.keyCode === 229) {
                  event.stopPropagation();
                  return;
                }
                if (event.key === `Enter`) {
                  let value17: Dynamic = value3.trim();
                  if (
                    input5 !== undefined &&
                    value17 !== `` &&
                    !event.repeat &&
                    !event.shiftKey &&
                    !event.altKey
                  ) {
                    let value18 = (
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      input5(value17);
                      value11?.current?.close?.();
                    };
                    if (resolveSheetsIsComposing(event.nativeEvent)) {
                      installSheetsCapture(
                        event.nativeEvent,
                        event.currentTarget,
                        value18,
                      );
                    } else {
                      event.preventDefault();
                      value18();
                    }
                  }
                  event.stopPropagation();
                  return;
                }
                if (event.key === `ArrowDown` || event.key === `ArrowUp`) {
                  let value17: Dynamic = event.currentTarget
                    .closest(`[role="menu"]`)
                    ?.querySelectorAll(
                      `[role^="menuitem"]:not([aria-disabled="true"])`,
                    );
                  let value18: Dynamic =
                    event.key === `ArrowDown`
                      ? value17?.[0]
                      : value17?.[value17.length - 1];
                  if (value18 !== undefined) {
                    event.preventDefault();
                    event.stopPropagation();
                    value18.focus();
                  }
                  return;
                }
                if (event.key === `Tab` && !event.shiftKey && value16()) {
                  event.preventDefault();
                  event.stopPropagation();
                  return;
                }
                if (!(event.key === `Escape` || event.key === `Tab`)) {
                  event.stopPropagation();
                }
              }}
              placeholder={input2}
              aria-label={input2}
              autoComplete={`off`}
              data-1p-ignore={true}
              autoFocus={value8}
              tabIndex={value8 ? undefined : -1}
              className={`!border-transparent !bg-transparent !shadow-none compact:!pl-2 comfortable:!pl-2.5`}
            />
            <BaseSeparator className={`-mx-1 my-1 h-px bg-border`} />
          </jsxRuntime.Fragment>
        ),
        children: [
          input10 && <UseMenuPopupsResetComponent reset={value5} />,
          value8 && <UseMenuPopupsInputRef2Component inputRef={value13} />,
          <UseMenuPopupsInputRefComponent
            inputRef={value13}
            applyKey={value15}
          />,
          input(value3.trim().toLowerCase(), value3.trim()),
        ],
      })}
    />
  );
}

var menuPopupsValue20: Dynamic;

var MenuPopupsWidth: Dynamic;

var MenuPopupsStyles3: Dynamic;

function useMenuPopupsPreventScroll(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = (0, React.useRef)(options);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let value2: Dynamic = input.current?.closest(`[role="menu"]`);
      if (!options || value.current || !value2?.hasAttribute(`data-open`))
        return;
      let activeElement: Dynamic = value2.ownerDocument.activeElement;
      if (
        activeElement === null ||
        activeElement === value2.ownerDocument.body
      ) {
        value2.focus({
          preventScroll: true,
        });
      }
    },
    [input, options],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value2: Dynamic = value.current && !options;
      value.current = options;
      let current: Dynamic = input.current;
      if (!value2 || !current) return;
      let value3: number = requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          let element: Dynamic = current.querySelector(MenuPopupsStyles3);
          let value4: Dynamic = current.closest(`[role="menu"]`);
          if (
            element &&
            value4 &&
            current.ownerDocument.activeElement === value4
          ) {
            element.focus({
              preventScroll: true,
            });
          }
        },
      );
      return (..._extraArguments: unknown[]): void =>
        cancelAnimationFrame(value3);
    },
    [input, options],
  );
}

function MenuPopupsPending2(
  {
    pending: input2 = false,
    loading: input3 = false,
    placeholderRows: input4 = 3,
    icon: input5 = false,
    children: input,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(MenuPopupsWidth);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let current: Dynamic = value.current;
    if (!current || typeof ResizeObserver === "undefined") return;
    let observer: Dynamic = new (ResizeObserver as Dynamic)(
      (..._extraArguments: unknown[]): undefined => {
        value2.current = {
          width: current.offsetWidth,
          height: current.offsetHeight,
        };
      },
    );
    observer.observe(current);
    return (..._extraArguments: unknown[]): Dynamic => observer.disconnect();
  }, []);
  let value3: Dynamic = input2 || input3;
  let [value4, value5]: Dynamic = (0, React.useState)(MenuPopupsWidth);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value.current;
      if (!value3 || !current) {
        value5(MenuPopupsWidth);
        return;
      }
      value5(
        input3 && value2.current.height > 0
          ? value2.current
          : {
              width: current.offsetWidth,
              height: current.offsetHeight,
            },
      );
    },
    [value3, input3],
  );
  let value6: Dynamic = value3 && value4.height > 0;
  useMenuPopupsPreventScroll(value, input3);
  return (
    <div
      ref={value}
      aria-busy={value3 || undefined}
      style={
        value6
          ? {
              minWidth: value4.width,
              height: value4.height,
            }
          : undefined
      }
      className={value6 ? `overflow-hidden` : undefined}
    >
      {input3 ? (
        <ShimmerContainer>
          <Skeleton.Rows
            icon={input5}
            rows={
              value6 ? Math.ceil(value4.height / menuPopupsValue20) : input4
            }
          />
        </ShimmerContainer>
      ) : (
        input
      )}
    </div>
  );
}

var MenuPopupsValue2: Dynamic;

var Menu: Dynamic;

function MenuPopupsKind(
  { kind: input, children: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = useSheetsSheet2();
  let { pending: value2 }: Dynamic = resolveSheetsUseContext2();
  return value === null ? (
    <jsxRuntime.Fragment>
      {input2(value2 ? SheetsConcealed : SheetsSheet3, null)}
      {value2 ? <SheetsKind kind={input} /> : null}
    </jsxRuntime.Fragment>
  ) : (
    <value.SheetPopupHost>
      {(input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2(input3, value)
      }
    </value.SheetPopupHost>
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuSearchStep1(): void {
  (MenuPopupsSearchLabel as Dynamic).displayName = `Menu.SearchablePopup`;
  menuPopupsValue20 = 20;
  MenuPopupsWidth = {
    width: 0,
    height: 0,
  };
  MenuPopupsStyles3 = `[data-highlighted][tabindex="0"]`;
  (MenuPopupsPending2 as Dynamic).displayName = `Menu.PendingList`;
  MenuPopupsValue2 = (0, React.forwardRef)(function (
    { className: input, ...input2 }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return (
      <MenuInteractionsCreateContext4.Provider value={true}>
      <BaseMenubar
          {...originalJsxProps({
            ref: options,
            "data-cds": `MenuBar`,
            ...input2,
            className: resolveUiDesignSystemValue2(
              `flex items-center gap-xs`,
              input,
            ),
          })}
        />
    </MenuInteractionsCreateContext4.Provider>
    );
  });
  MenuPopupsValue2.displayName = `Menu.Bar`;
  Menu = Object.assign(MenuPopupsTriggerRef, {
    Root: MenuPopupsSheetTitle,
    Bar: MenuPopupsValue2,
    Trigger: BaseMenuTrigger,
    TriggerButton: MenuPopupsDisabled,
    Popup: MenuPopupsAlign,
    Item: MenuPopupsIcon,
    Separator: MenuPopupsView,
    Group: BaseMenuGroup,
    GroupLabel: MenuPopupsView2,
    Header: MenuPopupsLabel,
    Submenu: MenuPopupsActionsRef,
    SubmenuTrigger: MenuPopupsIcon2,
    SearchablePopup: MenuPopupsSearchLabel,
    PendingList: MenuPopupsPending2,
  });
}

export { Menu, MenuPopupsKind };

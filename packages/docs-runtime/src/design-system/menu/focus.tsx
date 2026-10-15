/** BaoCut: menu focus from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  installUiTooltipsAndControlsValue,
  resolveUiProviderAndLayersValue2,
  resolveUiTooltipsAndControlsMatches,
} from "../dependencies";
import { isPresentationInline } from "../presentation";
import { AvatarsState } from "../avatars";
import {
  menuPopupsSet2,
  resolveMenuPopupsValue3,
  resolveMenuPopupsValue4,
  resolveMenuPopupsValue5,
} from "./popup";

var MenuPopupsStyles: Dynamic;

var MenuPopupsSelect: Dynamic;

var MenuPopupsStyles2: Dynamic;

function resolveMenuPopupsDraggable(
  event?: Dynamic,
  { draggable: options = false }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiProviderAndLayersValue2(event.target);
  return value === null
    ? false
    : resolveUiTooltipsAndControlsMatches(value) ||
        value.matches(MenuPopupsStyles) ||
        resolveMenuPopupsClosest(
          value,
          MenuPopupsSelect,
          event.currentTarget,
        ) ||
        (options &&
          resolveMenuPopupsClosest(
            value,
            MenuPopupsStyles2,
            event.currentTarget,
          )) ||
        isPresentationInline(
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY,
          value,
        );
}

function resolveMenuPopupsClosest(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.closest(options);
  return value !== null && context.contains(value);
}

var MenuPopupsTriggerHover: Dynamic;

var MenuPopupsFocusOut: Dynamic;

function useMenuPopupsRenderedWith(
  input?: Dynamic,
  options?: Dynamic,
  context: Dynamic = true,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value]: Dynamic = (0, React.useState)(clearMenuPopupsCell);
  value.renderedWith(options, input, context);
  return value;
}

function clearMenuPopupsCell(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic;
  let value2: boolean = true;
  let value3: string = `off`;
  let value4: Dynamic = null;
  let value5: Dynamic = null;
  let value6: boolean = false;
  let value7: Dynamic;
  let value8: Dynamic;
  let value9: boolean = false;
  let value10: Dynamic = null;
  let value11: Dynamic = null;
  let value12: Dynamic = null;
  let value13: Dynamic;
  let value14: boolean = false;
  let value15: boolean = false;
  let values: Dynamic = new (Set as Dynamic)();
  let value16 = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (input !== value3) {
      value3 = input;
      if (options) {
        values.forEach(
          (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            input2();
          },
        );
      }
    }
  };
  let value17 = (..._extraArguments: unknown[]): undefined => {
    value9 = false;
    value10 = null;
    value11 = null;
    value12 = null;
    value6 = false;
  };
  return {
    cell: {
      getLevel: (..._extraArguments: unknown[]): string => value3,
      subscribe(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        values.add(input);
        return (..._extraArguments: unknown[]): undefined => {
          values.delete(input);
        };
      },
      engage(..._extraArguments: unknown[]): undefined {
        if (value3 === `declared`) {
          value9 = false;
        }
        value16(`off`, true);
      },
      registerPopup(
        element?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        value4 = element;
        if (element !== null) {
          if (value6) {
            value6 = false;
            value10 = resolveMenuPopupsValue2(element.ownerDocument);
          }
        } else if (!value15 && (value16(`off`, false), value5 !== null)) {
          let value18: Dynamic = value5;
          value5 = null;
          resolveMenuPopupsPreventScroll(
            value18.ownerDocument,
            null,
            value18,
            false,
          );
        }
      },
      declareFocusProps(
        input?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        value7 = options;
        let value18: boolean = input !== value8;
        value8 = input;
        if (!value18 || !value15 || value4 !== null || value12 === null) return;
        let value19: Dynamic = isMenuPopupsValue(input, value12.type);
        if (value19 === (value3 === `declared`)) return;
        let value20: string = value19
          ? `declared`
          : value12.byHover
            ? `hover`
            : `off`;
        value9 = value20 !== `off`;
        value16(value20, false);
      },
      getPopup: (..._extraArguments: unknown[]): Dynamic => value4,
      getTrigger: (..._extraArguments: unknown[]): Dynamic => value11,
    },
    renderedWith(
      input?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      value = options;
      value2 = context;
      if (value13 !== true && input === true && !value14) {
        value15 = true;
        value5 = null;
        if (value4 === null) {
          value10 = null;
          value6 = true;
        } else {
          value10 = resolveMenuPopupsValue2(value4.ownerDocument);
        }
        value11 = null;
        value12 = {
          type: ``,
          byHover: false,
        };
        value9 = isMenuPopupsValue(value8, ``);
        value16(value9 ? `declared` : `off`, false);
      } else {
        if (value13 === true && input === false) {
          value15 = false;
          value14 = false;
          value5 =
            value3 === `declared` && value9
              ? resolveMenuPopupsCurrent(value7, value10)
              : null;
          value17();
          if (value3 === `hover`) {
            value16(`off`, false);
          }
        }
      }
      value13 = input;
    },
    onOpenChange(
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      value?.(input, options);
      if (options.isCanceled === true) return;
      value6 = false;
      let value18: Dynamic =
        value2 && options.reason === MenuPopupsTriggerHover;
      let value19: Dynamic =
        options.trigger?.ownerDocument ??
        value4?.ownerDocument ??
        resolveMenuPopupsValue();
      if (!input) {
        value15 = false;
        value14 = false;
        if (value9 && value19 !== undefined) {
          let value23: Dynamic = resolveMenuPopupsCurrent(
            value7,
            options.reason === MenuPopupsFocusOut && value11 !== null
              ? value11
              : value10,
          );
          if (value23 !== null) {
            resolveMenuPopupsPreventScroll(value19, value4, value23, !value18);
          }
        }
        value17();
        if (value3 === `hover`) {
          value16(`off`, true);
        }
        return;
      }
      value15 = true;
      value14 = true;
      value5 = null;
      let value20: Dynamic =
        value19 !== undefined &&
        resolveMenuPopupsContains(value19.activeElement, value4);
      let value21: string = resolveMenuPopupsKeyboard(options.event);
      let value22: string = value20
        ? `off`
        : isMenuPopupsValue(value8, value21)
          ? `declared`
          : value18
            ? `hover`
            : `off`;
      if (!(value18 && value20)) {
        value10 = resolveMenuPopupsValue2(value19);
        value11 = resolveUiProviderAndLayersValue2(options.trigger ?? null);
        value12 = value20
          ? null
          : {
              type: value21,
              byHover: value18,
            };
        value9 = value22 !== `off`;
      }
      value16(value22, true);
    },
  };
}

function resolveMenuPopupsKeyboard(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (input === undefined) return ``;
  if (`key` in input) return `keyboard`;
  let { type: value }: Dynamic = input;
  return value === `click` && input.detail === 0
    ? `keyboard`
    : value === `click` ||
        value === `contextmenu` ||
        value.startsWith(`mouse`) ||
        value.startsWith(`pointer`) ||
        value.startsWith(`touch`)
      ? `mouse`
      : ``;
}

function isMenuPopupsValue(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (input === undefined || input === true) return false;
  if (input === false) return true;
  let value: Dynamic = input(options);
  return value === false || value === undefined;
}

function resolveMenuPopupsValue(..._extraArguments: unknown[]): Dynamic {
  return typeof document === "undefined" ? undefined : document;
}

function resolveMenuPopupsCurrent(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input === false
    ? null
    : input === undefined ||
        input === true ||
        input === null ||
        typeof input == `function`
      ? options
      : (input.current ?? options);
}

function resolveMenuPopupsValue2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiProviderAndLayersValue2(
    input?.activeElement ?? null,
  );
  return value === null || value === input?.body ? null : value;
}

function resolveMenuPopupsContains(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input !== null && options !== null && options.contains(input);
}

function resolveMenuPopupsPreventScroll(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  queueMicrotask((..._extraArguments: unknown[]): undefined => {
    let activeElement: Dynamic = input.activeElement;
    let value2: Dynamic = resolveMenuPopupsContains(activeElement, options);
    if (
      (activeElement === null || activeElement === input.body || value2) &&
      context.isConnected &&
      context !== activeElement
    ) {
      let value3: Dynamic =
        value && value2
          ? resolveUiProviderAndLayersValue2(activeElement)
          : null;
      if (value3 !== null) {
        installUiTooltipsAndControlsValue(value3);
      }
      context.focus({
        preventScroll: true,
      });
    }
  });
}

var MenuPopupsCreateContext: Dynamic;

function resolveMenuPopupsCell(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useContext)(MenuPopupsCreateContext);
  return input
    ? {
        cell: value,
        root: value,
      }
    : {
        cell: value,
        root: null,
      };
}

var MenuPopupsCreateContext2: Dynamic;

function resolveMenuPopupsUseContext(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(MenuPopupsCreateContext2)
    ? MenuPopupsTabIndex
    : MenuPopupsState;
}

var MenuPopupsTabIndex: Dynamic;

var MenuPopupsState: Dynamic;

var menuPopupsSet: Dynamic;

function MenuPopupsCell(
  { cell: input, nested: input2, children: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useSyncExternalStore)(
    input === null ? resolveMenuPopupsValue3 : input.subscribe,
    input === null ? resolveMenuPopupsValue4 : input.getLevel,
    resolveMenuPopupsValue4,
  );
  let value2: Dynamic =
    input === null || (input2 && value === `hover`) ? `off` : value;
  return (
    <MenuPopupsCreateContext2.Provider value={value2 === `declared`}>
      {value2 === `declared` && !input2 && input !== null ? (
        <UseMenuPopupsCellComponent cell={input} />
      ) : null}
      {input3(
        input === null || value2 === `off`
          ? resolveMenuPopupsValue5
          : value2 === `hover`
            ? (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                ...input4,
                tabIndex: undefined,
                onFocus(
                  input5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined {
                  input4.onFocus?.(input5);
                  input.engage();
                },
              })
            : (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                ...input4,
                tabIndex: undefined,
                finalFocus: false,
                onMouseDown(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined {
                  input4.onMouseDown?.(event);
                  if (!resolveMenuPopupsDraggable(event)) {
                    event.preventDefault();
                  }
                },
                onKeyDown(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined {
                  input4.onKeyDown?.(event);
                  if (
                    !event.nativeEvent.isComposing &&
                    menuPopupsSet.has(event.key)
                  ) {
                    input.engage();
                  }
                },
              }),
      )}
    </MenuPopupsCreateContext2.Provider>
  );
}

function UseMenuPopupsCellComponent(
  { cell: input }: Dynamic,
  ..._extraArguments: unknown[]
) {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value: Dynamic = input.getTrigger();
      if (value === null) return;
      let value2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          event.isComposing ||
          event.key === `Tab` ||
          menuPopupsSet2.has(event.key) ||
          ((0, AvatarsState.flushSync)(
            (..._extraArguments: unknown[]): undefined => {
              input.engage();
            },
          ),
          (event.key !== `ArrowDown` && event.key !== `ArrowUp`) ||
            value.ownerDocument.activeElement !== value)
        )
          return;
        let value3: Dynamic = input.getPopup();
        let value4: Dynamic =
          value3 === null
            ? []
            : Array.from<Dynamic>(
                value3.querySelectorAll(
                  `[role^="menuitem"]:not([data-disabled])`,
                ),
              );
        let value5: Dynamic = resolveUiProviderAndLayersValue2(
          (event.key === `ArrowDown` ? value4[0] : value4[value4.length - 1]) ??
            null,
        );
        if (value5 !== null && value5.hasAttribute(`data-highlighted`)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          value5.focus({
            preventScroll: true,
          });
        }
      };
      value.addEventListener(`keydown`, value2);
      return (..._extraArguments: unknown[]): undefined => {
        value.removeEventListener(`keydown`, value2);
      };
    },
    [input],
  );
  return null;
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuFocusStep1(): void {
  MenuPopupsStyles = `input[type="range"], select, input[readonly], textarea[readonly]`;
  MenuPopupsSelect = `select`;
  MenuPopupsStyles2 = `[draggable="true"]`;
  MenuPopupsTriggerHover = `trigger-hover`;
  MenuPopupsFocusOut = `focus-out`;
  MenuPopupsCreateContext = (0, React.createContext)(null);
  MenuPopupsCreateContext2 = (0, React.createContext)(false);
  MenuPopupsTabIndex = {
    tabIndex: undefined,
  };
  MenuPopupsState = {};
  menuPopupsSet = new (Set as Dynamic)([`ArrowDown`, `ArrowUp`, `Home`, `End`]);
  (MenuPopupsCell as Dynamic).displayName = `PassiveOpenGate`;
}

export {
  MenuPopupsCell,
  MenuPopupsCreateContext,
  resolveMenuPopupsCell,
  resolveMenuPopupsDraggable,
  resolveMenuPopupsUseContext,
  useMenuPopupsRenderedWith,
};

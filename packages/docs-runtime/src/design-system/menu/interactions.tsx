/** BaoCut: menu interactions from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsDataCdsOverlay,
  appKDImport,
  originalJsxProps,
  resolveUiDesignSystemValue2,
} from "../dependencies";
import { SheetsDataCdsSheetScroll } from "../sheets/geometry";

var MenuInteractionsCreateContext: Dynamic;

var MenuInteractionsLabel: Dynamic;

var MenuInteractionsCreateContext2: Dynamic;

var MenuInteractionsDataCdsFocusesNothing: Dynamic;

var MenuInteractionsCreateContext3: Dynamic;

var MenuInteractionsCreateContext4: Dynamic;

var MenuInteractionsSheetTitle: Dynamic;

var MenuInteractionsStyles: Dynamic;

function resolveMenuInteractionsContextElement(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    get contextElement(): Dynamic {
      return input.triggerRef.current ?? undefined;
    },
    getBoundingClientRect: (..._extraArguments: unknown[]): Dynamic => {
      let value: Dynamic = input.triggerRef.current?.getBoundingClientRect();
      let value2: Dynamic = input.triggerRef.current
        ?.closest(MenuInteractionsStyles)
        ?.getBoundingClientRect();
      let value3: Dynamic = value2?.x ?? value?.x ?? 0;
      let value4: Dynamic = value?.y ?? 0;
      let value5: Dynamic = value2?.width ?? value?.width ?? 0;
      let value6: Dynamic = value?.height ?? 0;
      return {
        x: value3,
        y: value4,
        width: value5,
        height: value6,
        top: value4,
        left: value3,
        right: value3 + value5,
        bottom: value4 + value6,
      };
    },
  };
}

function resolveMenuInteractionsWarn(..._extraArguments: unknown[]): undefined {
  (console as Dynamic).warn(
    "cds: layerOffset is ignored on nested `Menu.Popup` / `ContextMenu.SubmenuPopup` — a submenu's parent band is the root menu's own band, where the root's click shield sits; joining it would interleave the submenu with the root's own popup and shield — below them at low offsets. Set layerOffset on the root popup instead.",
  );
}

function resolveMenuInteractionsWarn2(
  ..._extraArguments: unknown[]
): undefined {
  (console as Dynamic).warn(
    "cds: initialFocus is ignored on nested `Menu.Popup` / `ContextMenu.SubmenuPopup` — whether an open moves focus is the root popup's decision and its submenus follow it. Set initialFocus on the root Menu.Popup instead.",
  );
}

var MenuInteractionsCreateContext5: Dynamic;

var MenuInteractionsCreateContext6: Dynamic;

function useMenuInteractionsCurrent(..._extraArguments: unknown[]): Dynamic {
  let [value]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => ({
      current: null,
    }),
  );
  return value;
}

var menuInteractionsWeakMap: Dynamic;

function isMenuInteractionsButton(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (input === undefined || input.type !== `contextmenu`) return false;
  let { button: value, pointerType: value2 }: Dynamic = input;
  return value === -1 && value2 !== `touch` && value2 !== `pen`;
}

function updateMenuInteractionsIsCanceled(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!context.isCanceled) {
    if (options && isMenuInteractionsButton(context.event)) {
      menuInteractionsWeakMap.set(input, true);
    } else {
      menuInteractionsWeakMap.delete(input);
    }
  }
}

function useMenuInteractionsPreventScroll(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext5);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (value === null || !menuInteractionsWeakMap.has(value)) return;
      let index: number = 0;
      let count: number = 3;
      let value2 = (..._extraArguments: unknown[]): undefined => {
        let current: Dynamic = input.current;
        let value3: Dynamic = current?.ownerDocument.activeElement ?? null;
        if (
          current !== null &&
          value3 !== null &&
          !current.contains(value3) &&
          count > 0
        ) {
          --count;
          index = requestAnimationFrame(value2);
          return;
        }
        menuInteractionsWeakMap.delete(value);
        if (current !== null && value3 === current) {
          current
            .querySelector(`[role^="menuitem"]:not([data-disabled])`)
            ?.focus({
              preventScroll: true,
            });
        }
      };
      index = requestAnimationFrame(value2);
      return (..._extraArguments: unknown[]): undefined => {
        cancelAnimationFrame(index);
      };
    },
    [value, input],
  );
}

var MenuInteractionsStyles2: Dynamic;

var MenuInteractionsStyles3: Dynamic;

var MenuInteractionsShrink0Px1Pt1: Dynamic;

var MenuInteractionsMt1Shrink0Px1Pb1: Dynamic;

var MenuInteractionsMessage: Dynamic;

function MenuInteractionsHeader(
  {
    header: input,
    headerClassName: input2,
    footer: input3,
    maxVisibleItems: input4,
    fill: input6 = false,
    children: input5,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic =
    input4 === undefined
      ? undefined
      : `calc(${input4} * ${MenuInteractionsMessage} + 0.5rem)`;
  return input || input3 ? (
    <div
      className={appKDImport(
        `flex min-h-0 flex-col overflow-hidden rounded-[inherit]`,
        input6 && `flex-1`,
      )}
    >
      {input && (
        <div
          className={resolveUiDesignSystemValue2(
            MenuInteractionsShrink0Px1Pt1,
            input2,
          )}
        >
          {input}
        </div>
      )}
      <div
        {...originalJsxProps({
          style: {
            maxHeight: value,
          },
          className: `${MenuInteractionsStyles3}${input ? ` pt-0` : ``}`,
          [SheetsDataCdsSheetScroll]: ``,
          children: input5,
        })}
      />
      {input3 && (
        <div className={MenuInteractionsMt1Shrink0Px1Pb1}>{input3}</div>
      )}
    </div>
  ) : (
    <div
      {...originalJsxProps({
        style: {
          maxHeight: value,
        },
        className: appKDImport(MenuInteractionsStyles2, input6 && `flex-1`),
        [SheetsDataCdsSheetScroll]: ``,
        children: input5,
      })}
    />
  );
}

var MenuInteractionsCreateContext7: Dynamic;

function resolveMenuInteractionsRegister(
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  return {
    register: (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      items.push(input),
      (..._extraArguments: unknown[]): undefined => {
        let value: Dynamic = items.lastIndexOf(input);
        if (value !== -1) {
          items.splice(value, 1);
        }
      }
    ),
    topmostOpen: (..._extraArguments: unknown[]): Dynamic => {
      for (let value: number = items.length - 1; value >= 0; --value) {
        let value2: Dynamic = items[value];
        if (value2?.isOpen()) return value2;
      }
    },
  };
}

function useMenuInteractionsIsOpen(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext7);
  let value2: Dynamic = (0, React.useRef)(input);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      value2.current = input;
    },
    [input],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (value !== null)
        return value.register({
          isOpen: (..._extraArguments: unknown[]): Dynamic =>
            value2.current.isOpen(),
          close: (..._extraArguments: unknown[]): Dynamic =>
            value2.current.close(),
        });
    },
    [value],
  );
}

var menuInteractionsValue9: Dynamic;

function resolveMenuInteractionsValue(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input?.currentTarget?.nodeType === menuInteractionsValue9;
}

function isMenuInteractionsEscapeKey(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let value: Dynamic = context;
  if (options || value.reason !== `escape-key`) return false;
  let value2: Dynamic = input.topmostOpen();
  if (value2 === undefined) return false;
  value.cancel?.();
  let event: Dynamic = value.event;
  if (resolveMenuInteractionsValue(event)) {
    (event?.currentTarget?.defaultView ?? globalThis).setTimeout(
      (..._extraArguments: unknown[]): undefined => {
        if (value2.isOpen()) {
          value2.close();
        }
      },
      0,
    );
  } else {
    event?.preventDefault();
    value2.close();
  }
  return true;
}

function useMenuInteractionsIsOpen2(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext5);
  useMenuInteractionsIsOpen({
    isOpen: (..._extraArguments: unknown[]): boolean =>
      value2 !== null && value.current?.hasAttribute(`data-open`) === true,
    close: (..._extraArguments: unknown[]): Dynamic =>
      value2?.current?.close?.(),
  });
  return {
    elementRef: value,
    overlayAttrs: MenuInteractionsState,
  };
}

var MenuInteractionsState: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuInteractionsStep1(): void {
  MenuInteractionsCreateContext = (0, React.createContext)(null);
  MenuInteractionsLabel = {
    label: null,
    open: false,
  };
  MenuInteractionsCreateContext2 = (0, React.createContext)(
    MenuInteractionsLabel,
  );
  MenuInteractionsDataCdsFocusesNothing = `data-cds-focuses-nothing`;
  MenuInteractionsCreateContext3 = (0, React.createContext)(false);
  MenuInteractionsCreateContext4 = (0, React.createContext)(false);
  MenuInteractionsSheetTitle = (0, React.createContext)({
    sheetTitle: undefined,
    backLabel: undefined,
    closeLabel: undefined,
  });
  MenuInteractionsStyles = `[data-cds="Menu"], [data-cds="ContextMenu"], [data-cds="DropdownButton"], [data-cds="SplitDropdownButton"], [data-cds="ModelSelector"]`;
  MenuInteractionsCreateContext5 = (0, React.createContext)(null);
  MenuInteractionsCreateContext6 = (0, React.createContext)(null);
  menuInteractionsWeakMap = new (WeakMap as Dynamic)();
  MenuInteractionsStyles2 = `min-h-0 overflow-y-auto scroll-fade-y rounded-[inherit] border-b-[length:var(--cds-ring-inner)] border-transparent p-1`;
  MenuInteractionsStyles3 = `min-h-0 flex-1 overflow-y-auto scroll-fade-y border-b-[length:var(--cds-ring-inner)] border-transparent p-1`;
  MenuInteractionsShrink0Px1Pt1 = `shrink-0 px-1 pt-1`;
  MenuInteractionsMt1Shrink0Px1Pb1 = `-mt-1 shrink-0 px-1 pb-1`;
  MenuInteractionsMessage = `max(var(--cds-h-control), var(--cds-leading-body))`;
  MenuInteractionsCreateContext7 = (0, React.createContext)(null);
  menuInteractionsValue9 = 9;
  MenuInteractionsState = {
    [UiOverlaysAndIconsDataCdsOverlay]: ``,
  };
}

export {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext2,
  MenuInteractionsCreateContext3,
  MenuInteractionsCreateContext4,
  MenuInteractionsCreateContext5,
  MenuInteractionsCreateContext6,
  MenuInteractionsCreateContext7,
  MenuInteractionsDataCdsFocusesNothing,
  MenuInteractionsHeader,
  MenuInteractionsLabel,
  MenuInteractionsSheetTitle,
  isMenuInteractionsEscapeKey,
  resolveMenuInteractionsContextElement,
  resolveMenuInteractionsRegister,
  resolveMenuInteractionsWarn,
  resolveMenuInteractionsWarn2,
  updateMenuInteractionsIsCanceled,
  useMenuInteractionsCurrent,
  useMenuInteractionsIsOpen2,
  useMenuInteractionsPreventScroll,
};

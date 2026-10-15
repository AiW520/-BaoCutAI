/** BaoCut: menu items from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseMenuCheckboxItem,
  BaseMenuGroupLabel,
  BaseMenuItem,
  BaseMenuSubmenuRoot,
  BaseMenuSubmenuTrigger,
  BaseSeparator,
  React,
  Tooltip,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsIcon,
  UiShortcutsAndSizingReason,
  UiTooltipsAndControlsChecked,
  clsx,
  collectUiShortcutsAndSizingModifiers2,
  isUiShortcutsAndSizingValue,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationValue3,
  resolveUiLinksAndFoundationValue4,
  resolveUiOverlaysAndIconsValue4,
  resolveUiTooltipsAndControlsClose,
  useUiOverlaysAndIconsUseInsertionEffect,
  useUiShortcutsAndSizingUseSyncExternalStore,
} from "../dependencies";
import { TextInputStyles4, menuItemVariants } from "./variants";
import { SheetsCreateContext } from "../sheets/gestures";
import {
  resolveSheetsSheet,
  resolveSheetsUseContext2,
} from "../sheets/stack";
import {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext2,
  MenuInteractionsCreateContext5,
  MenuInteractionsCreateContext6,
  MenuInteractionsDataCdsFocusesNothing,
} from "./interactions";
import { resolveMenuPopupsUseContext } from "./focus";
import {
  MenuPopupsKeys,
  resolveMenuPopupsCancel,
  resolveMenuPopupsTabularNums,
  useMenuPopupsLabel,
} from "./popup";

var MenuPopupsIcon: Dynamic;

var MenuPopupsIcon2: Dynamic;

function MenuPopupsActionsRef(
  { actionsRef: input, ...input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(
    input2.open ?? input2.defaultOpen ?? false,
  );
  let value3: Dynamic = (0, React.useRef)(value);
  let value4: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    input2.onOpenChange,
  );
  let { sheet: value5 }: Dynamic = resolveSheetsUseContext2();
  let value6: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let value7: Dynamic = value6?.treeId;
  let value8: Dynamic = (0, React.useRef)(null);
  let value9: Dynamic = (0, React.useCallback)(
    (input3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value8.current = input3;
    },
    [],
  );
  let [value10, value11]: Dynamic = (0, React.useState)(null);
  let value12: Dynamic = (0, React.useCallback)(
    (
      input3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!(value5 && resolveMenuPopupsCancel(input3, options, value7))) {
        if (
          value5 &&
          !input3 &&
          value6?.refusesAmbientClose(options) === true
        ) {
          options.cancel();
          return;
        }
        value4?.(input3, options);
        if (!options.isCanceled) {
          value3.current = input3;
          value2(input3);
          if (input3) {
            value11(value8.current);
          }
        }
      }
    },
    [value4, value5, value6, value7],
  );
  let value13: Dynamic = (0, React.useRef)(null);
  let value14: Dynamic = (0, React.useCallback)(
    (input3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value13.current = input3;
    },
    [],
  );
  let value15: Dynamic = (0, React.useRef)(null);
  resolveUiTooltipsAndControlsClose(value15, input);
  let value16: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      value15.current?.close();
    },
    [],
  );
  let value17: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext6);
  let value18: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext5);
  let value19: Dynamic = value17 ?? value18;
  let value20: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      triggerRef: value13,
      setTriggerNode: value14,
      openRef: value3,
      close: value16,
      stashLabel: value9,
    }),
    [value14, value16, value9],
  );
  let value21: Dynamic = input2.open ?? value;
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      value3.current = value21;
      if (value21) {
        let current: Dynamic = value8.current;
        value11(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input3 === current ? input3 : current,
        );
      }
    },
    [value21],
  );
  let value22: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      label: value10,
      open: value21,
    }),
    [value10, value21],
  );
  return (
    <MenuInteractionsCreateContext.Provider value={value20}>
      <MenuInteractionsCreateContext2.Provider value={value22}>
        <MenuInteractionsCreateContext6.Provider value={value19}>
          <MenuInteractionsCreateContext5.Provider value={value15}>
            <BaseMenuSubmenuRoot {...input2} actionsRef={value15} onOpenChange={value12} />
          </MenuInteractionsCreateContext5.Provider>
        </MenuInteractionsCreateContext6.Provider>
      </MenuInteractionsCreateContext2.Provider>
    </MenuInteractionsCreateContext.Provider>
  );
}

function MenuPopupsView(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
): Dynamic {
  return (
    <BaseSeparator
      className={`compact:mx-2 comfortable:mx-2.5 my-1 h-px bg-border`}
    />
  );
}

var MenuPopupsCompactPx2ComfortablePx25Py1TextFootnoteFontMediumTextMuted: Dynamic;

function MenuPopupsLabel(
  { children: input, className: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveSheetsSheet();
  let value2: boolean =
    (0, React.useContext)(MenuInteractionsCreateContext) !== null;
  let { label: value3 }: Dynamic = (0, React.useContext)(
    MenuInteractionsCreateContext2,
  );
  return (
    <div
      role={`presentation`}
      className={resolveUiDesignSystemValue2(
        MenuPopupsCompactPx2ComfortablePx25Py1TextFootnoteFontMediumTextMuted,
        value &&
          value2 &&
          typeof input == `string` &&
          typeof value3 == `string` &&
          input.trim() === value3.trim() &&
          `first:hidden`,
        input2,
      )}
    >
      {input}
    </div>
  );
}

function MenuPopupsView2(
  { children: input, className: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <BaseMenuGroupLabel
      className={resolveUiDesignSystemValue2(
        MenuPopupsCompactPx2ComfortablePx25Py1TextFootnoteFontMediumTextMuted,
        input2,
      )}
    >
      {input}
    </BaseMenuGroupLabel>
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuItemsStep1(): void {
  MenuPopupsIcon = (0, React.forwardRef)(
    (
      {
        variant: input,
        icon: input2,
        shortcut: input3,
        checked: input4,
        checkedRole: input5,
        checkPosition: input6,
        indicator: input23 = `check`,
        indeterminate: input7,
        hint: input8,
        description: input9,
        disabledReason: input10,
        href: input11,
        routerOptions: input12,
        target: input13,
        rel: input14,
        download: input15,
        keepOpen: input16,
        focusesNothing: input17,
        leading: input18,
        trailing: input19,
        className: input20,
        children: input21,
        ...input22
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: boolean = input23 === `checkbox`;
      let value2: Dynamic = value
        ? input11 === undefined
          ? (input4 ?? false)
          : undefined
        : input4;
      let value3: Dynamic = value ? `checkbox` : (input5 ?? `checkbox`);
      let value4: Dynamic = input6 ?? (value ? `leading` : `trailing`);
      let value5: Dynamic = useUiShortcutsAndSizingUseSyncExternalStore();
      let value6: Dynamic = (0, React.useId)();
      let {
        label: value7,
        labelSpanRef: value8,
        rowRef: value9,
      }: Dynamic = useMenuPopupsLabel(input21, input22.label);
      let value10: Dynamic = resolveUiOverlaysAndIconsValue4(options, value9);
      let value11: boolean =
        input22.disabled === true && isUiShortcutsAndSizingValue(input10);
      let state: Dynamic = {
        "aria-keyshortcuts": input3
          ? collectUiShortcutsAndSizingModifiers2(input3, value5)
          : undefined,
        "data-cds-icon-row":
          input2 !== undefined &&
          !(value2 !== undefined && value4 === `leading`)
            ? ``
            : undefined,
        [MenuInteractionsDataCdsFocusesNothing]: input17 ? `` : undefined,
        ...input22,
        label: value7,
        "aria-describedby":
          [value11 ? value6 : undefined, input22[`aria-describedby`]]
            .filter(Boolean)
            .join(` `) || undefined,
      };
      let value12: Dynamic = resolveMenuPopupsUseContext();
      let value13: Dynamic = (
        input24?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        input10 === undefined ? (
          input24
        ) : (
          <Tooltip
            content={value11 ? input10 : undefined}
            side={`right`}
            multiline={true}
            closeOnClick={false}
          >
          <div role={`none`}>
            {input24}
            <UiShortcutsAndSizingReason
                id={value6}
                reason={value11 ? input10 : undefined}
              />
          </div>
        </Tooltip>
        );
      let value14: Dynamic = resolveUiLinksAndFoundationHref({
        href: input11,
        routerOptions: input12,
        target: input13,
        rel: input14,
        download: input15,
        ...resolveUiLinksAndFoundationValue3(input22),
      });
      let value15: Dynamic = resolveUiDesignSystemValue2(
        menuItemVariants({
          variant: input,
        }),
        input9 ? `${TextInputStyles4} ` : ``,
        input20,
      );
      let value16: Dynamic = value2 !== undefined && (
        <span
          className={clsx(
            `flex size-icon shrink-0 items-center justify-center`,
            value4 === `trailing` && !input8 && !input3 && `-mr-1`,
            !!(value4 === `trailing` && input3 && !input8) &&
              `pointer-coarse:-mr-1`,
            value &&
              value4 === `leading` &&
              `-ml-1 group-has-[[data-cds-icon-row]]/menu-popup:ml-0`,
          )}
          style={
            value
              ? undefined
              : {
                  color: `var(--cds-fill-accent)`,
                }
          }
        >
        {value ? (
            <span data-size={`xs`} className={`flex shrink-0`}>
            <UiTooltipsAndControlsChecked
                checked={value2}
                indeterminate={input7}
              />
          </span>
          ) : (
            value2 && (
              <UiOverlaysAndIconsCustomIcon
                name={`Check`}
                size={`auto`}
                bold={true}
              />
            )
          )}
      </span>
      );
      let value17: Dynamic = (
        <jsxRuntime.Fragment>
        {input18}
        {value4 === `leading` && value16}
        {input2 !== undefined && <UiOverlaysAndIconsIcon icon={input2} />}
        {input9 ? (
            <span className={`flex min-w-0 flex-1 flex-col`}>
            <span ref={value8} className={`truncate`}>
              {input21}
            </span>
            <span
                className={`truncate py-[0.125em] -my-[0.125em] text-footnote text-muted group-data-[highlighted]/menu-danger:text-on-danger`}
              >
              {input9}
            </span>
          </span>
          ) : (
            <span ref={value8} className={`min-w-0 flex-1 truncate`}>
            {input21}
          </span>
          )}
        {!!(
            input19 ||
            (value2 !== undefined && value4 === `trailing`) ||
            input8 ||
            input3
          ) && (
            <span
              className={clsx(
                `ml-md flex shrink-0 items-center gap-xs`,
                !!(
                  input3 &&
                  !input19 &&
                  !(value2 !== undefined && value4 === `trailing`) &&
                  !input8
                ) && `pointer-coarse:hidden`,
              )}
            >
            {input19}
            {value4 === `trailing` && value16}
            {input8 && (
                <span
                  className={`max-w-[160px] shrink-0 truncate py-[0.125em] -my-[0.125em] text-footnote text-muted group-data-[highlighted]/menu-danger:text-on-danger ${resolveMenuPopupsTabularNums(input8)}`}
                >
                {input8}
              </span>
              )}
            {input3 && <MenuPopupsKeys keys={input3} />}
          </span>
          )}
      </jsxRuntime.Fragment>
      );
      if (input11 !== undefined) {
        let value18: Dynamic = resolveUiLinksAndFoundationValue4(state);
        return value13(
          <BaseMenuItem
            ref={value10}
            {...value18}
            {...value12}
            closeOnClick={input16 ? false : undefined}
            className={value15}
            render={<a {...value14} />}
          >{value17}</BaseMenuItem>,
        );
      }
      return value13(
        value2 === undefined ? (
          <BaseMenuItem ref={value10} {...state} {...value12} closeOnClick={input16 ? false : undefined} className={value15}>{value17}</BaseMenuItem>
        ) : value3 === `radio` ? (
          <BaseMenuItem
            ref={value10}
            {...state}
            {...value12}
            role={`menuitemradio`}
            aria-checked={value2}
            closeOnClick={input16 ? false : undefined}
            className={value15}
          >{value17}</BaseMenuItem>
        ) : (
          <BaseMenuCheckboxItem ref={value10} {...state} {...value && input7 ? {
  "aria-checked": `mixed`
} : {}} {...value12} checked={value2} closeOnClick={value ? false : !input16} className={value15}>{value17}</BaseMenuCheckboxItem>
        ),
      );
    },
  );
  MenuPopupsIcon.displayName = `Menu.Item`;
  MenuPopupsIcon2 = (0, React.forwardRef)(
    (
      {
        icon: input,
        leading: input2,
        hint: input3,
        trailing: input4,
        className: input5,
        children: input6,
        openOnHover: input7,
        ...input8
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext);
      let value2: Dynamic = resolveSheetsSheet();
      let value3: Dynamic = resolveMenuPopupsUseContext();
      let {
        label: value4,
        labelSpanRef: value5,
        rowRef: value6,
      }: Dynamic = useMenuPopupsLabel(input6, input8.label);
      let value7: Dynamic = resolveUiOverlaysAndIconsValue4(
        value?.setTriggerNode,
        options,
        value6,
      );
      let value8: Dynamic = value?.stashLabel;
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          if (value2) {
            value8?.(input6);
          }
        },
        [value2, value8, input6],
      );
      return (
        <BaseMenuSubmenuTrigger ref={value7} data-cds-icon-row={input === undefined ? undefined : ``} {...input8} label={value4} {...value3} openOnHover={value2 ? false : input7} className={resolveUiDesignSystemValue2(menuItemVariants({
  variant: `default`
}), `justify-between data-[popup-open]:bg-fill-ghost-hover`, input5)}>{input2}{input !== undefined && <UiOverlaysAndIconsIcon icon={input} />}{<span ref={value5} className={`min-w-0 flex-1 truncate`}>
              {input6}
            </span>}{input4 || input3 ? <span className={`ml-md flex shrink-0 items-center gap-xs`}>
                {input4}
                {input3 && <span className={`max-w-[160px] shrink-0 truncate py-[0.125em] -my-[0.125em] text-footnote text-muted ${resolveMenuPopupsTabularNums(input3)}`}>
                    {input3}
                  </span>}
                <UiOverlaysAndIconsCustomIcon name={`CaretRight`} size={`sm`} className={`-mr-1 shrink-0 text-muted`} />
              </span> : <UiOverlaysAndIconsCustomIcon name={`CaretRight`} size={`sm`} className={`-mr-1 shrink-0 text-muted`} />}</BaseMenuSubmenuTrigger>
      );
    },
  );
  MenuPopupsIcon2.displayName = `Menu.SubmenuTrigger`;
  (MenuPopupsActionsRef as Dynamic).displayName = `Menu.Submenu`;
  (MenuPopupsView as Dynamic).displayName = `Menu.Separator`;
  MenuPopupsCompactPx2ComfortablePx25Py1TextFootnoteFontMediumTextMuted = `compact:px-2 comfortable:px-2.5 py-1 text-footnote font-medium text-muted`;
  (MenuPopupsLabel as Dynamic).displayName = `Menu.Header`;
  (MenuPopupsView2 as Dynamic).displayName = `Menu.GroupLabel`;
}

export { MenuPopupsActionsRef, MenuPopupsIcon, MenuPopupsIcon2, MenuPopupsLabel, MenuPopupsView, MenuPopupsView2 };

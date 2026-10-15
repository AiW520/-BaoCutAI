/** BaoCut: menu root from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseContextMenuRoot,
  BaseContextMenuTrigger,
  BaseMenuPortal,
  BaseMenuRoot,
  BaseMenuTrigger,
  Button,
  DisabledReasonTooltip,
  React,
  Tooltip,
  UiOverlaysAndIconsActionsRef,
  UiOverlaysAndIconsCustomIcon,
  jsxRuntime,
  originalJsxProps,
  originalJsxsProps,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersUseContext2,
  resolveUiProviderAndLayersUseContext9,
  resolveUiTooltipsAndControlsClose,
  resolveUiTooltipsAndControlsUseContext2,
} from "../dependencies";
import { useSheetsWasOpen } from "../sheets/geometry";
import {
  SheetsValue2,
  resolveSheetsUseContext4,
  useSheetsOpen,
  useSheetsOpen2,
} from "../sheets/stack";
import {
  MenuInteractionsCreateContext4,
  MenuInteractionsCreateContext5,
  MenuInteractionsSheetTitle,
  updateMenuInteractionsIsCanceled,
  useMenuInteractionsCurrent,
} from "./interactions";
import { MenuPopupsAnchor } from "./popup-frame";
import { useMenuPopupsRenderedWith } from "./focus";
import {
  MenuPopupsAlign,
  MenuPopupsProvider,
  MenuPopupsValue,
  isMenuPopupsReason,
  useMenuPopupsTriggerRef,
} from "./popup";
import {
  MenuPopupsActionsRef,
  MenuPopupsIcon,
  MenuPopupsIcon2,
  MenuPopupsView,
} from "./items";

function resolveMenuPopupsValue7(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return Array.isArray(input);
}

function renderMenuItems(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveMenuPopupsValue7(input)
    ? input.map(
        (
          event?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          event === `separator` ? (
            <MenuPopupsView {...originalJsxProps({}, options)} />
          ) : event.label === undefined ||
            event.label === null ||
            event.label === `` ||
            event.label === false ? null : event.items ? (
            <React.Fragment
              {...originalJsxsProps(
                {
                  children: [
                    event.separatorBefore && <MenuPopupsView />,
                    <MenuPopupsActionsRef disabled={event.disabled}>
                      <MenuPopupsIcon2 icon={event.icon} hint={event.hint}>
                        {event.label}
                      </MenuPopupsIcon2>
                      <MenuPopupsAlign>
                        {renderMenuItems(event.items)}
                      </MenuPopupsAlign>
                    </MenuPopupsActionsRef>,
                  ],
                },
                options,
              )}
            />
          ) : (
            <React.Fragment
              {...originalJsxsProps(
                {
                  children: [
                    event.separatorBefore && <MenuPopupsView />,
                    <MenuPopupsIcon
                      icon={event.icon}
                      shortcut={event.shortcut}
                      variant={event.variant}
                      disabled={event.disabled}
                      checked={event.checked}
                      checkedRole={event.checkedRole}
                      indicator={event.indicator}
                      indeterminate={event.indeterminate}
                      hint={event.hint}
                      description={event.description}
                      disabledReason={event.disabledReason}
                      keepOpen={event.keepOpen}
                      leading={event.leading}
                      trailing={event.trailing}
                      href={event.href}
                      routerOptions={event.routerOptions}
                      target={event.target}
                      onClick={event.onSelect}
                    >
                      {event.label}
                    </MenuPopupsIcon>,
                  ],
                },
                options,
              )}
            />
          ),
      )
    : input;
}

function resolveMenuPopupsValue8(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveUiProviderAndLayersBase(input, options) >= 4 ? `sm` : `xs`;
}

function MenuPopupsPart(
  { size: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiProviderAndLayersUseContext2();
  let value2: Dynamic = resolveUiTooltipsAndControlsUseContext2();
  return (
    <UiOverlaysAndIconsCustomIcon
      name={`CaretDown`}
      size={resolveMenuPopupsValue8(value, input ?? value2?.size)}
      data-cds-part={`menu-caret`}
      className={`shrink-0 opacity-60`}
    />
  );
}

function MenuPopupsSide2(
  {
    side: input,
    align: input2,
    sideOffset: input3,
    collisionPadding: input4,
    finalFocus: input5,
    dataCds: input6,
    items: input7,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <MenuPopupsAnchor
      side={input}
      align={input2}
      sideOffset={input3}
      collisionPadding={input4}
      finalFocus={input5}
      data-cds={input6 ?? `Menu`}
    >
      {renderMenuItems(input7)}
    </MenuPopupsAnchor>
  );
}

function MenuPopupsTriggerRef(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveSheetsUseContext4();
  let value2: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext4);
  let value3: Dynamic = useMenuInteractionsCurrent();
  let onOpenChange: Dynamic = input.onOpenChange;
  let { onOpenChange: value4, triggerRef: value5 }: Dynamic =
    useMenuPopupsTriggerRef(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        onOpenChange?.(input2, options);
        updateMenuInteractionsIsCanceled(value3, input2, options);
      },
      value2,
    );
  let value6: Dynamic = resolveUiProviderAndLayersUseContext9();
  return value ? (
    <MenuPopupsOpen
      {...originalJsxProps({
        ...input,
      })}
    />
  ) : (
    MenuPopupsItems(input, value6, {
      triggerRef: value5,
      onOpenChange: value4,
      actionsRef: value3,
      contextMenuOnOpenChange: value4,
      inMenuBar: value2,
    })
  );
}

function MenuPopupsOpen(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    open: value,
    sheetTitle: value2,
    backLabel: value3,
    closeLabel: value4,
  }: Dynamic = input;
  let value5: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      sheetTitle: value2,
      backLabel: value3,
      closeLabel: value4,
    }),
    [value2, value3, value4],
  );
  let value6: Dynamic = resolveUiProviderAndLayersUseContext9();
  let value7: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext4);
  let { onOpenChange: value8, triggerRef: value9 }: Dynamic =
    useMenuPopupsTriggerRef(input.onOpenChange, value7);
  let value10: Dynamic = useSheetsOpen2({
    open: value,
    onOpenChange: value8,
  });
  let open: Dynamic = value10.open;
  let value11: Dynamic = useSheetsOpen({
    open: open,
    onOpenChange: value10.onOpenChange,
    closable: !(value !== undefined && input.onOpenChange === undefined),
    refuseClose: resolveMenuPopupsValue9,
  });
  let value12: Dynamic = MenuPopupsItems(input, value6, {
    triggerRef: value9,
    onOpenChange: value11.onOpenChange,
    onOpenChangeComplete: value11.onOpenChangeComplete,
    actionsRef: value11.actionsRef,
    sheetCapable: true,
    inMenuBar: value7,
  });
  return (
    <SheetsValue2 value={value11}>
      <MenuInteractionsSheetTitle.Provider value={value5}>
        {value12}
      </MenuInteractionsSheetTitle.Provider>
    </SheetsValue2>
  );
}

function MenuPopupsItems(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    items: value,
    side: value2,
    align: value3,
    sideOffset: value4,
    collisionPadding: value5,
    finalFocus: value6,
    open: value7,
    disabled: value8,
    className: value9,
    style: value10,
    "data-cds": value11,
  }: Dynamic = input;
  if (input.trigger === `context-menu`)
    return value8 ? (
      <div data-disabled={``} className={value9}>
        {input.children}
      </div>
    ) : context.sheetCapable ? (
      <UiOverlaysAndIconsActionsRef actionsRef={context.actionsRef}>
        <BaseContextMenuRoot
          open={value7}
          onOpenChange={context.onOpenChange}
          onOpenChangeComplete={context.onOpenChangeComplete}
          actionsRef={context.actionsRef}
        >
          {MenuPopupsValue(
            <jsxRuntime.Fragment>
              <BaseContextMenuTrigger className={value9}>
                {input.children}
              </BaseContextMenuTrigger>
              <MenuPopupsAlign
                side={value2}
                align={value3}
                sideOffset={value4}
                collisionPadding={value5}
                finalFocus={value6}
                data-cds={value11 ?? `Menu`}
              >
                {renderMenuItems(value)}
              </MenuPopupsAlign>
            </jsxRuntime.Fragment>,
            null,
            context.actionsRef,
            true,
          )}
        </BaseContextMenuRoot>
      </UiOverlaysAndIconsActionsRef>
    ) : (
      <UiOverlaysAndIconsActionsRef actionsRef={context.actionsRef}>
        <BaseContextMenuRoot
          open={value7}
          onOpenChange={context.contextMenuOnOpenChange}
          actionsRef={context.actionsRef}
        >
          <BaseContextMenuTrigger className={value9}>
            {input.children}
          </BaseContextMenuTrigger>
          <BaseMenuPortal container={options}>
            <MenuInteractionsCreateContext5.Provider value={context.actionsRef}>
              <MenuPopupsSide2
                side={value2}
                align={value3}
                sideOffset={value4}
                collisionPadding={value5}
                finalFocus={value6}
                dataCds={value11}
                items={value}
              />
            </MenuInteractionsCreateContext5.Provider>
          </BaseMenuPortal>
        </BaseContextMenuRoot>
      </UiOverlaysAndIconsActionsRef>
    );
  let value12: Dynamic;
  if (input.renderTrigger !== undefined)
    value12 = (
      <BaseMenuTrigger
        disabled={value8}
        className={value9}
        style={value10}
        render={input.renderTrigger}
      />
    );
  else if (input.iconOnly) {
    let value13: Dynamic =
      input.tooltip === false
        ? undefined
        : typeof input.tooltip == `string`
          ? input.tooltip
          : input[`aria-label`];
    let value14: Dynamic = (
      <BaseMenuTrigger
        disabled={value8}
        render={
          <Button
            variant={input.variant}
            size={input.size}
            iconOnly={true}
            icon={input.icon || `DotsVertical`}
            aria-label={input[`aria-label`]}
            pressed={input.pressed}
            tooltip={false}
            className={value9}
            style={value10}
          />
        }
      />
    );
    let value15: Dynamic = value13 ? (
      <Tooltip content={value13}>{value14}</Tooltip>
    ) : (
      value14
    );
    value12 =
      input.disabledReason === undefined ? (
        value15
      ) : (
        <DisabledReasonTooltip
          side={input.disabledReasonSide}
          reason={value8 ? input.disabledReason : undefined}
        >
          {value15}
        </DisabledReasonTooltip>
      );
  } else
    value12 = (
      <BaseMenuTrigger
        disabled={value8}
        render={
          <Button
            variant={input.variant}
            size={input.size}
            icon={input.icon}
            iconPosition={input.iconPosition}
            aria-label={input[`aria-label`]}
            className={value9}
            style={value10}
          >
            {input.label}
            <MenuPopupsPart size={input.size} />
          </Button>
        }
      />
    );
  return (
    <MenuPopupsProvider value={context.triggerRef}>
      <UiOverlaysAndIconsActionsRef actionsRef={context.actionsRef}>
        <BaseMenuRoot
          open={value7}
          onOpenChange={context.onOpenChange}
          onOpenChangeComplete={context.onOpenChangeComplete}
          actionsRef={context.actionsRef}
          modal={context.inMenuBar ? undefined : true}
        >
          {MenuPopupsValue(
            <jsxRuntime.Fragment>
              {value12}
              <MenuPopupsAlign
                side={value2}
                align={value3}
                sideOffset={value4}
                collisionPadding={value5}
                finalFocus={value6}
                data-cds={value11}
              >
                {renderMenuItems(value)}
              </MenuPopupsAlign>
            </jsxRuntime.Fragment>,
            null,
            context.actionsRef,
          )}
        </BaseMenuRoot>
      </UiOverlaysAndIconsActionsRef>
    </MenuPopupsProvider>
  );
}

function resolveMenuPopupsValue9(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return isMenuPopupsReason(false, input, options);
}

function MenuPopupsSheetTitle(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    children: value,
    sheetTitle: value2,
    backLabel: value3,
    closeLabel: value4,
    ...value5
  }: Dynamic = input;
  let value6: Dynamic = resolveSheetsUseContext4();
  let value7: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext4);
  let { onOpenChange: value8, triggerRef: value9 }: Dynamic =
    useMenuPopupsTriggerRef(value5.onOpenChange, value7);
  let value10: Dynamic = useMenuPopupsRenderedWith(
    value8,
    value5.open,
    !value7,
  );
  let value11: Dynamic = useMenuInteractionsCurrent();
  resolveUiTooltipsAndControlsClose(value11, value5.actionsRef);
  return value6 ? (
    <UiOverlaysAndIconsActionsRef actionsRef={value11}>
      <MenuPopupsSheetTitle2
        {...originalJsxProps({
          ...input,
          actionsRef: value11,
        })}
      />
    </UiOverlaysAndIconsActionsRef>
  ) : (
    <MenuPopupsProvider value={value9}>
      <UiOverlaysAndIconsActionsRef actionsRef={value11}>
        <BaseMenuRoot
          {...originalJsxProps({
            ...value5,
            modal: value7 ? undefined : value5.modal,
            actionsRef: value11,
            onOpenChange: value10.onOpenChange,
            children:
              typeof value == `function`
                ? (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    MenuPopupsValue(value(input2), value10.cell, value11)
                : MenuPopupsValue(value, value10.cell, value11),
          })}
        />
      </UiOverlaysAndIconsActionsRef>
    </MenuPopupsProvider>
  );
}

function MenuPopupsSheetTitle2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    children: value,
    sheetTitle: value2,
    backLabel: value3,
    closeLabel: value4,
    ...value5
  }: Dynamic = input;
  let value6: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      sheetTitle: value2,
      backLabel: value3,
      closeLabel: value4,
    }),
    [value2, value3, value4],
  );
  let value7: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext4);
  let { onOpenChange: value8, triggerRef: value9 }: Dynamic =
    useMenuPopupsTriggerRef(input.onOpenChange, value7);
  let value10: Dynamic = useMenuPopupsRenderedWith(value8, input.open, !value7);
  let value11: Dynamic = useSheetsOpen2({
    ...input,
    onOpenChange: value10.onOpenChange,
  });
  let value12: Dynamic = useSheetsWasOpen(
    value11.open,
    (..._extraArguments: unknown[]) => value10.cell.getLevel() === `declared`,
    false,
  );
  let value13: Dynamic = useSheetsOpen({
    open: value11.open,
    actionsRef: input.actionsRef,
    onOpenChange: value11.onOpenChange,
    onOpenChangeComplete: input.onOpenChangeComplete,
    structurallyAnchored: value12,
    closable: !(input.open !== undefined && input.onOpenChange === undefined),
    refuseClose: resolveMenuPopupsValue9,
  });
  return (
    <MenuPopupsProvider value={value9}>
      <SheetsValue2 value={value13}>
        <MenuInteractionsSheetTitle.Provider value={value6}>
          <BaseMenuRoot
            {...originalJsxProps({
              ...value5,
              modal: value7 ? undefined : (value13.modal ?? value5.modal),
              actionsRef: value13.actionsRef,
              onOpenChange: value13.onOpenChange,
              onOpenChangeComplete: value13.onOpenChangeComplete,
              children:
                typeof value == `function`
                  ? (
                      input2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      MenuPopupsValue(
                        value(input2),
                        value10.cell,
                        value13.actionsRef,
                      )
                  : MenuPopupsValue(value, value10.cell, value13.actionsRef),
            })}
          />
        </MenuInteractionsSheetTitle.Provider>
      </SheetsValue2>
    </MenuPopupsProvider>
  );
}

var MenuPopupsDisabled: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuRootStep1(): void {
  (MenuPopupsTriggerRef as Dynamic).displayName = `Menu`;
  (MenuPopupsSheetTitle as Dynamic).displayName = `Menu.Root`;
  MenuPopupsDisabled = (0, React.forwardRef)(function (
    { children: input, id: input2, ...input3 }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return (
      <BaseMenuTrigger
        id={input2}
        disabled={input3.disabled || input3.busy}
        render={
          <Button
            {...originalJsxsProps({
              ref: options,
              ...input3,
              ...(input3.busy
                ? {
                    disabled: input3.disabled,
                  }
                : undefined),
              children: [input, <MenuPopupsPart size={input3.size} />],
            })}
          />
        }
      />
    );
  });
  MenuPopupsDisabled.displayName = `Menu.TriggerButton`;
}

export {
  MenuPopupsDisabled,
  MenuPopupsSheetTitle,
  MenuPopupsTriggerRef,
  renderMenuItems,
};

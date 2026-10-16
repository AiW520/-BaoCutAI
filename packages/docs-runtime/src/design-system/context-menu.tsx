/** BaoCut: context menu from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseContextMenuRoot,
  BaseContextMenuTrigger,
  BaseMenuPortal,
  React,
  UiOverlaysAndIconsActionsRef,
  resolveUiProviderAndLayersUseContext9,
  resolveUiTooltipsAndControlsClose,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./dependencies";
import {
  SheetsValue2,
  resolveSheetsUseContext3,
  resolveSheetsUseContext4,
  useSheetsOpen,
  useSheetsOpen2,
} from "./sheets/stack";
import {
  MenuInteractionsCreateContext5,
  MenuInteractionsSheetTitle,
  updateMenuInteractionsIsCanceled,
} from "./menu/interactions";
import { MenuPopupsAnchor } from "./menu/popup-frame";
import { MenuPopupsValue, isMenuPopupsReason } from "./menu/popup";
import { Menu } from "./menu/search";
import type * as ReactComponentTypes from "react";
import type {
  ContextMenuRootProps,
  ContextMenuRootChangeEventDetails,
} from "@base-ui/react/context-menu";

export interface ContextMenuProps extends ContextMenuRootProps {
  sheetTitle?: ReactComponentTypes.ReactNode;
  backLabel?: string;
  closeLabel?: string;
}

export const ContextMenuSheetTitle: ReactComponentTypes.FC<ContextMenuProps> = (input) => {
  let {
    sheetTitle: value,
    backLabel: value2,
    closeLabel: value3,
    ...value4
  } = input;
  let value5: Dynamic = resolveSheetsUseContext4();
  let value6: Dynamic = (0, React.useRef)(null);
  resolveUiTooltipsAndControlsClose(value6, value4.actionsRef);
  let value7: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
    (input2: boolean, options: ContextMenuRootChangeEventDetails, ..._extraArguments: unknown[]): undefined => {
      value4.onOpenChange?.(input2, options);
      updateMenuInteractionsIsCanceled(value6, input2, options);
    },
  );
  return value5 ? (
    <UiOverlaysAndIconsActionsRef actionsRef={value6}>
      <ContextMenuSheetTitle2 {...input} actionsRef={value6} />
    </UiOverlaysAndIconsActionsRef>
  ) : (
    <UiOverlaysAndIconsActionsRef actionsRef={value6}>
      <MenuInteractionsCreateContext5.Provider value={value6}>
        <BaseContextMenuRoot {...value4} actionsRef={value6} onOpenChange={value7} />
      </MenuInteractionsCreateContext5.Provider>
    </UiOverlaysAndIconsActionsRef>
  );
};

export const ContextMenuSheetTitle2: ReactComponentTypes.FC<ContextMenuProps> = (input) => {
  let {
    children: value,
    sheetTitle: value2,
    backLabel: value3,
    closeLabel: value4,
    ...value5
  } = input;
  let value6: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      sheetTitle: value2,
      backLabel: value3,
      closeLabel: value4,
    }),
    [value2, value3, value4],
  );
  let value7: Dynamic = useSheetsOpen2(input);
  let value8: Dynamic = useSheetsOpen({
    open: value7.open,
    actionsRef: input.actionsRef,
    onOpenChange: value7.onOpenChange,
    onOpenChangeComplete: input.onOpenChangeComplete,
    closable: !(input.open !== undefined && input.onOpenChange === undefined),
    refuseClose: resolveContextMenuValue,
  });
  return (
    <SheetsValue2 value={value8}>
      <MenuInteractionsSheetTitle.Provider value={value6}>
        <BaseContextMenuRoot
          {...value5}
          actionsRef={value8.actionsRef}
          onOpenChange={value8.onOpenChange}
          onOpenChangeComplete={value8.onOpenChangeComplete}
        >
          {MenuPopupsValue(value, null, value8.actionsRef, true)}
        </BaseContextMenuRoot>
      </MenuInteractionsSheetTitle.Provider>
    </SheetsValue2>
  );
};

var ContextMenuRef: Dynamic;

var ContextMenuDataCds: Dynamic;

var ContextMenuRef2: Dynamic;

function resolveContextMenuValue(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return isMenuPopupsReason(false, input, options);
}

var ContextMenu: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeContextMenuStep1(): void {
  ContextMenuRef = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <MenuPopupsAnchor ref={options} data-cds={`ContextMenu`} {...input} />
    ),
  );
  ContextMenuRef.displayName = `ContextMenu.PopupInner`;
  ContextMenuDataCds = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <Menu.Popup data-cds={`ContextMenu`} {...input} ref={options} />
    ),
  );
  ContextMenuDataCds.displayName = `ContextMenu.SheetCapablePopup`;
  ContextMenuRef2 = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: boolean = resolveSheetsUseContext3();
      let value2: Dynamic = resolveUiProviderAndLayersUseContext9();
      return value ? (
        <ContextMenuDataCds {...input} ref={options} />
      ) : (
        <BaseMenuPortal container={value2}>
        <ContextMenuRef ref={options} {...input} />
      </BaseMenuPortal>
      );
    },
  );
  ContextMenuRef2.displayName = `ContextMenu.Popup`;
  ContextMenuSheetTitle.displayName = `ContextMenu.Root`;
  ContextMenu = {
    Root: ContextMenuSheetTitle,
    Trigger: BaseContextMenuTrigger,
    Popup: ContextMenuRef2,
    Item: Menu.Item,
    Separator: Menu.Separator,
    Group: Menu.Group,
    Header: Menu.Header,
    Submenu: Menu.Submenu,
    SubmenuTrigger: Menu.SubmenuTrigger,
    SubmenuPopup: Menu.Popup,
  };
}

export { ContextMenu };

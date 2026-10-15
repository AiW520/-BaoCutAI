/** BaoCut: sheet popup content from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseComboboxBackdrop,
  BaseMenuItem,
  BasePopoverBackdrop,
  BasePopoverClose,
  React,
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsIcon,
  moduleNamespace,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
} from "../dependencies";
import { menuItemVariants } from "../menu/variants";
import { SheetsDataCdsSheetScroll } from "../sheets/geometry";
import { SheetsCreateContext } from "../sheets/gestures";
import {
  SheetsCreateContext2,
  SheetsDraggableNoneFixedInset0BgTransparent,
  SheetsState7,
} from "../sheets/stack";
import {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext2,
  MenuInteractionsSheetTitle,
} from "../menu/interactions";
import { SheetPopupLeading } from "./layout";
import { SheetPopupHost } from "./host";
import { MenuSheetPopup } from "./menu";

function SheetBackMenuItem(
  { nested: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useContext)(MenuInteractionsCreateContext);
  let { label: value2 }: Dynamic = (0, React.useContext)(
    MenuInteractionsCreateContext2,
  );
  let value3: Dynamic = (0, React.useContext)(MenuInteractionsSheetTitle);
  let value4: Dynamic = resolveUiLinksAndFoundationUseContext3(`back`, `Back`);
  let value5: Dynamic = value3.backLabel ?? value4;
  return (
    <SheetPopupLeading
      title={input ? value2 : value3.sheetTitle}
      leading={
        input ? (
          <BaseMenuItem
            closeOnClick={false}
            onClick={(..._extraArguments: unknown[]): Dynamic => value?.close()}
            aria-label={value5}
            label={value5}
            className={resolveUiDesignSystemValue2(
              menuItemVariants({
                variant: `default`,
              }),
              `min-h-control w-auto py-0`,
            )}
          >
            <UiOverlaysAndIconsIcon
              icon={
                <UiOverlaysAndIconsCustomIcon
                  name={`ArrowLeft`}
                  size={`md`}
                  className={`rtl:-scale-x-100`}
                />
              }
            />
          </BaseMenuItem>
        ) : undefined
      }
    />
  );
}

function SheetCloseMenuItem(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
): Dynamic {
  let value: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `close`,
    `Close`,
  );
  let value3: Dynamic =
    (0, React.useContext)(MenuInteractionsSheetTitle).closeLabel ?? value2;
  return (
    <BaseMenuItem
      closeOnClick={false}
      onClick={(..._extraArguments: unknown[]): Dynamic => value?.dismiss()}
      aria-label={value3}
      label={value3}
      data-cds-sheet-control={``}
      className={`group/sheet-close cds-reset block w-full rounded outline-none select-none focus-visible:outline-hidden [&:not(:focus-visible):not([data-highlighted]):not([data-cds-sheet-control-held])]:sr-only`}
    >
      <span
        className={resolveUiDesignSystemValue2(
          menuItemVariants({
            variant: `default`,
          }),
          `group-data-[highlighted]/sheet-close:bg-fill-ghost-hover`,
        )}
      >
        <UiOverlaysAndIconsIcon icon={`X`} />
        <span className={`min-w-0 flex-1 truncate`}>{value3}</span>
      </span>
    </BaseMenuItem>
  );
}

function PopoverSheetBackdrop(
  { sheetPopup: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <BasePopoverBackdrop
      data-presentation={`sheet`}
      data-sheet-scrim={input.frame?.treeId}
      className={
        input.state.depth > 0
          ? SheetsDraggableNoneFixedInset0BgTransparent
          : SheetsState7
      }
    />
  );
}

function PopoverSheetContent(
  {
    sheetPopup: input,
    className: input2,
    bodyRef: input3,
    bodyClassName: input4,
    closeLabel: input5,
    children: input6,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { chrome: value }: Dynamic = input;
  return (
    <SheetsCreateContext2.Provider value={input.stack}>
      <value.Handle />
      <value.Body
        className={resolveUiDesignSystemValue2(
          input2,
          `h-auto max-h-none min-h-0 w-full min-w-0 max-w-none flex-auto`,
        )}
      >
        <div
          {...originalJsxProps({
            ref: input3,
            tabIndex: -1,
            "data-cds-popover-body": ``,
            [SheetsDataCdsSheetScroll]: ``,
            className: input4,
            children: input6,
          })}
        />
        <value.DismissButton as={BasePopoverClose} label={input5} />
      </value.Body>
    </SheetsCreateContext2.Provider>
  );
}

function ComboboxSheetBackdrop(
  { sheetPopup: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <BaseComboboxBackdrop
      data-presentation={`sheet`}
      data-sheet-scrim={input.frame?.treeId}
      className={
        input.state.depth > 0
          ? SheetsDraggableNoneFixedInset0BgTransparent
          : SheetsState7
      }
    />
  );
}

var sheetPopupModule: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetPopupContentStep1(): void {
  sheetPopupModule = moduleNamespace({
    ComboboxSheetBackdrop: (..._extraArguments: unknown[]): Dynamic =>
      ComboboxSheetBackdrop,
    MenuSheetPopup: (..._extraArguments: unknown[]): Dynamic => MenuSheetPopup,
    PopoverSheetBackdrop: (..._extraArguments: unknown[]): Dynamic =>
      PopoverSheetBackdrop,
    PopoverSheetContent: (..._extraArguments: unknown[]): Dynamic =>
      PopoverSheetContent,
    SheetPopupHost: (..._extraArguments: unknown[]): Dynamic => SheetPopupHost,
  });
}

export { SheetBackMenuItem, SheetCloseMenuItem, sheetPopupModule };

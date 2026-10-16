/** BaoCut: sheet popup layout from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  clsx,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiTooltipsAndControlsMatches,
} from "../dependencies";
import {
  SheetsDataCdsSheetControlHeld,
  SheetsDataCdsSheetPressed,
} from "../sheets/geometry";
import { useLabeledFieldsHeight } from "./height";
import type * as ReactComponentTypes from "react";

export const SheetPopupDrawPill: ReactComponentTypes.FC<Dynamic> = ({
  drawPill: input = true,
}) => {
  return (
    <div
      aria-hidden={true}
      data-cds-sheet-handle={``}
      {...useLabeledFieldsHeight()}
      className={`flex min-h-8 shrink-0 touch-none items-center justify-center select-none`}
    >
      {<div className={clsx(`h-1 w-9 rounded-full bg-border`, !input && `opacity-0`)} />}
    </div>
  );
};

export const SheetPopupLeading: ReactComponentTypes.FC<Dynamic> = ({
  leading: input,
  title: input2,
}) => {
  let value: Dynamic = useLabeledFieldsHeight();
  let value2: boolean = input != null && input !== false;
  return !value2 && !(input2 != null && input2 !== false && input2 !== ``) ? null : (
    <div
      {...value}
      className={`order-first flex min-h-control shrink-0 touch-none items-center gap-xs px-1 pb-1 select-none`}
    >
      {value2 && <span className={`-me-2.5 shrink-0`}>{input}</span>}
      {
        <span
          aria-hidden={true}
          className={clsx(
            `min-w-0 flex-1 truncate text-start text-heading font-semibold text-primary`,
            !value2 && `ps-2.5`,
          )}
        >
          {input2}
        </span>
      }
    </div>
  );
};

export const SheetPopupView: ReactComponentTypes.FC<Dynamic> = ({
  className: input,
  children: input2,
}) => {
  return (
    <div
      className={resolveUiDesignSystemValue2(`flex min-h-0 flex-auto flex-col`, input)}
    >
      {input2}
    </div>
  );
};

var SheetPopupLabel: Dynamic;

var SheetPopupHandle: Dynamic;

function useSheetPopupTall(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = options?.setDetent;
  let value2: Dynamic = options?.holdTextEntryFocus;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (element === null || value === undefined || value2 === undefined)
        return;
      let value3: Dynamic = null;
      let value4 = (..._extraArguments: unknown[]): undefined => {
        if (value3 === null) {
          value3 = value2();
        }
      };
      let value5 = (..._extraArguments: unknown[]): undefined => {
        value3?.();
        value3 = null;
      };
      let index: number = 0;
      let value6: Dynamic = (
        input?: Dynamic,
        ..._extraArguments: unknown[]
      ): boolean => {
        if (!(input instanceof (Element as Dynamic))) return false;
        if (resolveUiTooltipsAndControlsMatches(input)) return true;
        let value11: Dynamic = input.closest(`[data-cds="TextInput"], label`);
        return value11 === null
          ? false
          : resolveUiTooltipsAndControlsMatches(
              value11 instanceof (HTMLLabelElement as Dynamic)
                ? value11.control
                : null,
            ) ||
              value11.querySelector(
                `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`,
              ) !== null;
      };
      let value7 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (value6(event.target)) {
          index = event.timeStamp || Date.now();
        }
      };
      let value8 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveUiTooltipsAndControlsMatches(event.target)) {
          value4();
          if (index > 0 && (event.timeStamp || Date.now()) - index < 1e3) {
            index = 0;
            value(`tall`);
          }
        }
      };
      let value9 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (index > 0 && value6(event.target)) {
          index = 0;
          value(`tall`);
        }
      };
      let value10 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveUiTooltipsAndControlsMatches(event.target)) {
          value5();
        }
      };
      element.addEventListener(`pointerdown`, value7);
      element.addEventListener(`focusin`, value8);
      element.addEventListener(`focusout`, value10);
      element.addEventListener(`click`, value9);
      if (
        element.contains(element.ownerDocument.activeElement) &&
        resolveUiTooltipsAndControlsMatches(element.ownerDocument.activeElement)
      ) {
        value4();
      }
      return (..._extraArguments: unknown[]): undefined => {
        element.removeEventListener(`pointerdown`, value7);
        element.removeEventListener(`focusin`, value8);
        element.removeEventListener(`focusout`, value10);
        element.removeEventListener(`click`, value9);
        value5();
      };
    },
    [element, value, value2],
  );
}

function useSheetPopupClick(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (element === null) return;
      let ownerDocument: Dynamic = element.ownerDocument;
      let value: Dynamic = null;
      let value2 = (..._extraArguments: unknown[]): undefined => {
        element.removeAttribute(SheetsDataCdsSheetPressed);
        value?.removeAttribute(SheetsDataCdsSheetControlHeld);
        value = null;
        ownerDocument.removeEventListener(`click`, value2, true);
        ownerDocument.removeEventListener(`pointercancel`, value2, true);
        ownerDocument.removeEventListener(`keydown`, value2, true);
      };
      let value3 = (..._extraArguments: unknown[]): undefined => {
        ownerDocument.addEventListener(`click`, value2, true);
        ownerDocument.addEventListener(`pointercancel`, value2, true);
        ownerDocument.addEventListener(`keydown`, value2, true);
        element.setAttribute(SheetsDataCdsSheetPressed, ``);
        let element2: Dynamic = element.querySelector(
          `[data-cds-sheet-control]`,
        );
        if (element2?.matches(`:focus-visible, [data-highlighted]`)) {
          value = element2;
          element2.setAttribute(SheetsDataCdsSheetControlHeld, ``);
        }
      };
      element.addEventListener(`pointerdown`, value3, true);
      return (..._extraArguments: unknown[]): undefined => {
        element.removeEventListener(`pointerdown`, value3, true);
        value2();
      };
    },
    [element],
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetPopupLayoutStep1(): void {
  SheetPopupLabel = (0, React.forwardRef)(function (
    {
      as: Input5Component = `button`,
      onDismiss: input,
      label: input2,
      className: input3,
      ...input4
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `close`,
      `Close`,
    );
    let value2: Dynamic = input2 ?? value;
    return (
      <Input5Component
        ref={options}
        type={`button`}
        data-cds-sheet-control={``}
        onClick={input}
        {...input4}
        className={resolveUiDesignSystemValue2(`cds-reset mx-1 mb-1 block shrink-0 rounded px-2 text-start text-body font-normal text-primary outline-none select-none focus-visible:bg-fill-ghost-hover focus-visible:outline-hidden [&:not(:focus-visible):not([data-cds-sheet-control-held])]:sr-only`, `min-h-control`, input3)}
      >{value2}</Input5Component>
    );
  });
  SheetPopupHandle = {
    Handle: SheetPopupDrawPill,
    TitleBar: SheetPopupLeading,
    DismissButton: SheetPopupLabel,
    Body: SheetPopupView,
  };
}

export { SheetPopupHandle, useSheetPopupClick, useSheetPopupTall };

/** BaoCut: text area from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  BaseFieldControl,
  React,
  UiDesignSystemUseLayoutEffect,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersDataSize,
} from "./cds-dependencies";
import { textAreaSurfaceClasses } from "./cds-field-foundation";
import { isFieldInvalid } from "./cds-text-input";

var ShimmerFieldSizing: Dynamic;

function resolveShimmerOverflowY(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    input.clientWidth === 0 ||
    (input.style.height !== options.current && input.style.height !== ``)
  )
    return;
  let offsetHeight: Dynamic = input.offsetHeight;
  let value: Dynamic = offsetHeight - input.clientHeight;
  let { overflowY: style, marginBottom: style2 }: Dynamic = input.style;
  input.style.height = `0px`;
  input.style.marginBottom = `${offsetHeight}px`;
  input.style.overflowY = `hidden`;
  options.current = `${input.scrollHeight + value}px`;
  input.style.height = options.current;
  input.style.marginBottom = style2;
  input.style.overflowY = style;
}

function resolveShimmerSet(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = Object.getOwnPropertyDescriptor(input, `value`);
  let value2: Dynamic =
    value ??
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), `value`);
  if (!value2?.set || !value2.configurable) return;
  let value3: Dynamic = true;
  let value4 = (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    value2.set?.call(input, input2);
    if (value3) {
      options();
    }
  };
  Object.defineProperty(input, "value", {
    ...value2,
    set: value4,
  });
  return (..._extraArguments: unknown[]): undefined => {
    value3 = false;
    if (Object.getOwnPropertyDescriptor(input, `value`)?.set === value4) {
      if (value) {
        Object.defineProperty(input, "value", value);
      } else {
        Reflect.deleteProperty(input, `value`);
      }
    }
  };
}

function useShimmerAutosize(
  { autosize: input, value: input2, defaultValue: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input && !ShimmerFieldSizing;
  let value2: Dynamic = input2 !== undefined;
  let value3: Dynamic = (0, React.useRef)(null);
  let value4: Dynamic = (0, React.useRef)(``);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value3.current;
      let value5: Dynamic = current?.ownerDocument.defaultView;
      if (!value || !current || !value5) return;
      let value6: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        resolveShimmerOverflowY(current, value4);
      let index: Dynamic = 0;
      let value7 = (..._extraArguments: unknown[]): undefined => {
        value5.cancelAnimationFrame(index);
        index = value5.requestAnimationFrame(value6);
      };
      let value8: Dynamic = new (value5.ResizeObserver as Dynamic)(value7);
      value8.observe(current);
      value5.document.fonts.addEventListener(`loadingdone`, value6);
      let value9 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.target === current.form) {
          value7();
        }
      };
      let value10: Dynamic = current.getRootNode();
      let value11: Dynamic =
        value10 instanceof (value5.ShadowRoot as Dynamic)
          ? value10
          : value5.document;
      let value12: Dynamic;
      if (!value2) {
        value12 = resolveShimmerSet(current, value6);
        current.addEventListener(`input`, value6);
        value11.addEventListener(`reset`, value9, true);
      }
      return (..._extraArguments: unknown[]): undefined => {
        value12?.();
        value11.removeEventListener(`reset`, value9, true);
        value8.disconnect();
        value5.cancelAnimationFrame(index);
        value5.document.fonts.removeEventListener(`loadingdone`, value6);
        current.removeEventListener(`input`, value6);
        if (current.style.height === value4.current) {
          current.style.height = ``;
        }
      };
    },
    [value, value2],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (value && value3.current) {
        resolveShimmerOverflowY(value3.current, value4);
      }
    },
    [value, value ? input2 : null, value ? input3 : null],
  );
  return value3;
}

var TextArea: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeTextAreaStep1(): void {
  ShimmerFieldSizing =
    typeof CSS === "undefined" ||
    typeof CSS.supports != `function` ||
    CSS.supports(`field-sizing`, `content`);
  TextArea = (0, React.forwardRef)(
    (
      {
        className: input,
        rows: input2,
        resize: input10 = `none`,
        autosize: input11 = false,
        bare: input12 = false,
        size: input3,
        fullWidth: input13 = true,
        id: input4,
        "aria-describedby": input5,
        "aria-invalid": input6,
        disabled: input7,
        style: input8,
        ...input9
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = isFieldInvalid();
      let value2: Dynamic = input2 ?? 3;
      let value3: Dynamic = input11 && input2 !== undefined;
      let value4: Dynamic = input10 === `y` ? `resize-y` : `resize-none`;
      let value5: Dynamic = input11 ? `[field-sizing:content]` : ``;
      let value6: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        useShimmerAutosize({
          autosize: input11,
          value: input9.value,
          defaultValue: input9.defaultValue,
        }),
      );
      let value7: Dynamic = value3
        ? input12
          ? `min-h-[calc(var(--cds-textarea-rows)*1lh)]`
          : `min-h-[calc(var(--cds-textarea-rows)*1lh+2*var(--cds-pad-sm))]`
        : ``;
      let value8: Dynamic = value3
        ? {
            ...input8,
            "--cds-textarea-rows": value2,
          }
        : input8;
      let value9: Dynamic = input13 ? `w-full` : ``;
      return (
        <BaseFieldControl
          id={input4}
          aria-describedby={input5}
          disabled={input7}
          render={
            <textarea
              {...originalJsxProps({
                ref: value6,
                "data-cds": `TextArea`,
                rows: value2,
                style: value8,
                ...resolveUiProviderAndLayersDataSize(input3),
                "data-invalid": value || undefined,
                "aria-invalid": value || input6,
                ...input9,
                className: resolveUiDesignSystemValue2(
                  `cds-reset`,
                  value9,
                  input12
                    ? `block resize-none border-0 bg-transparent p-0 shadow-none`
                    : `cds-input font-normal ${textAreaSurfaceClasses} enabled:[&:hover:not(:focus):not([data-invalid])]:shadow-field-hover focus-visible:shadow-focus data-[invalid]:focus-visible:shadow-focus-danger ${value4}`,
                  `font-sans text-body text-primary placeholder:text-muted outline-none focus-visible:outline-hidden disabled:opacity-disabled`,
                  value5,
                  value7,
                  input,
                ),
              })}
            />
          }
        />
      );
    },
  );
  TextArea.displayName = `TextArea`;
}

export { TextArea };

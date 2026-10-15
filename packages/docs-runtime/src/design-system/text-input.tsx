/** BaoCut: text input from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseFieldControl,
  Button,
  React,
  useLabelableContext,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersDataSize,
} from "./dependencies";
import { useClickToFocus } from "./presentation";
import {
  FieldStylesState,
  FieldStylesStyles,
  fieldHoverClasses,
} from "./field-foundation";

var FieldStatesCreateContext: Dynamic;

function isFieldInvalid(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(FieldStatesCreateContext)?.invalid ?? false;
}

function isFieldDisabled(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(FieldStatesCreateContext)?.disabled ?? false;
}

function fieldLabelId(..._extraArguments: unknown[]): Dynamic {
  let { labelId: value, controlId: value2 }: Dynamic = useLabelableContext();
  return value ?? (value2 ? `${value2}-label` : undefined);
}

function isInsideField(..._extraArguments: unknown[]) {
  return (0, React.useContext)(FieldStatesCreateContext) !== null;
}

var TextInputState: Dynamic;

var TextInputState2: Dynamic;

var TextInputStyles: Dynamic;

var TextInputStyles2: Dynamic;

var TextInputStyles3: Dynamic;

var TextInput: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeTextInputStep1(): void {
  FieldStatesCreateContext = (0, React.createContext)(null);
  TextInputState = FieldStylesState;
  TextInputState2 = FieldStylesStyles;
  TextInputStyles = `[&_[data-cds=Button]:not([data-cds-ghost])]:h-[var(--fhn)] [&_[data-cds=Button]:not([data-cds-ghost])]:rounded-[calc(var(--fr)-(var(--fh)-var(--fhn))/2)] [&_[data-cds=Button][data-cds-icon-only]:not([data-cds-ghost])]:w-[var(--fhn)]`;
  TextInputStyles2 = `has-[[data-cds-end-slot]_[data-cds=Button]:not([data-cds-ghost])]:pr-[calc((var(--cds-h-control)-var(--cds-h-control-nested))/2)]`;
  TextInputStyles3 = `pr-[calc((var(--cds-h-control)-var(--cds-h-control-nested))/2)]`;
  TextInput = (0, React.forwardRef)(
    (
      {
        className: input,
        size: input2,
        fullWidth: input10 = true,
        slotStart: input3,
        slotEnd: input4,
        clearable: input11 = false,
        onClear: input5,
        clearLabel: input6,
        onChange: input7,
        onKeyDown: input8,
        ...input9
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let {
        id: value,
        "aria-describedby": value2,
        "aria-invalid": value3,
        disabled: value4,
        ...value5
      }: Dynamic = input9;
      let state: Dynamic = {
        id: value,
        "aria-describedby": value2,
        disabled: value4,
      };
      let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `clear`,
        `Clear`,
      );
      let value7: Dynamic = input6 ?? value6;
      let value8: Dynamic = isFieldInvalid();
      let value9: Dynamic = value8 || value3;
      let value10: Dynamic = isFieldDisabled();
      let value11: Dynamic = value4 || value10;
      let value12: string = input10 ? `w-full` : ``;
      let value13: string = input10 ? `w-full min-w-0` : ``;
      let value14: Dynamic = (0, React.useRef)(null);
      let { clickToFocusProps: value15 }: Dynamic = useClickToFocus(
        (..._extraArguments: unknown[]): Dynamic => value14.current?.focus(),
        {
          disabled: value11,
          readOnly: value5.readOnly,
        },
      );
      let value16: Dynamic = resolveUiOverlaysAndIconsValue4(value14, options);
      let value17: boolean = value5.value !== undefined;
      let [value18, value19]: Dynamic = (0, React.useState)(
        (..._extraArguments: unknown[]): boolean =>
          value5.defaultValue !== undefined &&
          String(value5.defaultValue).length > 0,
      );
      let value20: Dynamic = value17
        ? value5.value !== undefined && String(value5.value).length > 0
        : value18;
      let value21 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (input11 && !value17) {
          value19(event.target.value.length > 0);
        }
        input7?.(event);
      };
      let value22 = (..._extraArguments: unknown[]): undefined => {
        let current: Dynamic = value14.current;
        if (!value17 && current) {
          Object.getOwnPropertyDescriptor(
            (window as Dynamic).HTMLInputElement.prototype,
            `value`,
          )?.set?.call(current, ``);
          current.dispatchEvent(
            new (Event as Dynamic)(`input`, {
              bubbles: true,
            }),
          );
          value19(false);
        }
        input5?.();
        current?.focus();
      };
      let value23: Dynamic =
        (input11 === `always` || (input11 && value20)) && !value11;
      let value24: Dynamic =
        value23 &&
        value20 &&
        (!value17 || input5 !== undefined) &&
        !value5.readOnly;
      let value25: Dynamic = value23 ? (
        <Button
          iconOnly={true}
          variant={`ghost`}
          size={input2 === `sm` || input2 === `xs` ? `xs` : `sm`}
          className={`!size-[var(--fhn)] !rounded-[calc(var(--fr)-(var(--fh)-var(--fhn))/2)]`}
          icon={`X`}
          aria-label={value7}
          tooltip={false}
          tabIndex={value24 ? -1 : undefined}
          onMouseDown={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => event.preventDefault()}
          onClick={value22}
        />
      ) : null;
      let value26: Dynamic = (0, React.useRef)(false);
      let value27 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      };
      let value28 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        input8?.(event);
        if (event.key === `Escape` && !event.repeat) {
          value26.current = false;
        }
        if (
          event.key === `Escape` &&
          !(event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) &&
          !event.nativeEvent.isComposing &&
          event.nativeEvent.keyCode !== 229 &&
          !event.defaultPrevented &&
          !event.isPropagationStopped()
        ) {
          if (event.repeat) {
            if (value26.current) {
              value27(event);
            }
            return;
          }
          value26.current = value24 && event.currentTarget.value !== ``;
          if (value26.current) {
            value27(event);
            value22();
          }
        }
      };
      if (input3 || input4 || input11) {
        let value29: Dynamic = value25 ? TextInputStyles3 : `pr-md`;
        let value30: string = `flex shrink-0 items-center gap-[var(--cds-pad-sm,6px)] text-muted [--fh:var(--cds-h-control)] [--fr:var(--cds-radius)] [--fhn:var(--cds-h-control-nested)] ${TextInputStyles}`;
        return (
          <div
            data-cds={`TextInput`}
            {...resolveUiProviderAndLayersDataSize(input2)}
            data-invalid={value8 || undefined}
            onMouseDown={value15.onMouseDown}
            className={resolveUiDesignSystemValue2(TextInputState, value29, TextInputStyles2, `inline-flex`, value13, value11 ? `cursor-default` : `cursor-text`, `items-center gap-[var(--cds-pad-sm,6px)] has-[:focus-visible]:shadow-focus`, `has-[input:disabled]:opacity-disabled`, value11 ? undefined : fieldHoverClasses, input)}
          >{input3 ? <span className={`flex shrink-0 items-center text-muted`}>
                  {input3}
                </span> : null}{<BaseFieldControl
                  {...state}
                  render={<input ref={value16} aria-invalid={value9} {...value5} onChange={value21} onKeyDown={value28} className={resolveUiDesignSystemValue2(TextInputState2, `disabled:opacity-100`)} />}
                />}{value25 || input4 ? <span data-cds-end-slot={``} className={value30}>
                  {input4}
                  {value25}
                </span> : null}</div>
        );
      }
      return (
        <BaseFieldControl
          ref={options}
          {...state}
          render={<input data-cds={`TextInput`} {...resolveUiProviderAndLayersDataSize(input2)} data-invalid={value8 || undefined} aria-invalid={value9} {...value5} onChange={value21} onKeyDown={value28} className={resolveUiDesignSystemValue2(`cds-input cds-reset`, TextInputState, `pr-md`, value12, `placeholder:text-muted outline-none focus-visible:outline-hidden enabled:[&:hover:not(:focus):not([data-invalid])]:shadow-field-hover focus-visible:shadow-focus disabled:opacity-disabled`, input)} />}
        />
      );
    },
  );
  TextInput.displayName = `TextInput`;
}

export { FieldStatesCreateContext, TextInput, fieldLabelId, isFieldInvalid, isInsideField };

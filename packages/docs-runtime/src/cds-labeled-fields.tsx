/** BaoCut: labeled fields from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  BaseFieldDescription,
  BaseFieldError,
  BaseFieldLabel,
  BaseFieldRoot,
  React,
  UiOverlaysAndIconsCustomIcon,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
} from "./cds-dependencies";
import {
  FieldStatesCreateContext,
  TextInput,
  fieldLabelId,
} from "./cds-text-input";
import { TextArea } from "./cds-text-area";

var ToastFalse: Dynamic;

var Field: Dynamic;

var FieldLabel: Dynamic;

var LabeledFieldsRef: Dynamic;

var FieldError: Dynamic;

var LabeledField: Dynamic;

var LabeledTextInput: Dynamic;

var LabeledTextArea: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeLabeledFieldsStep1(): void {
  ToastFalse = {
    false: {
      false: {
        invalid: false,
        disabled: false,
      },
      true: {
        invalid: true,
        disabled: false,
      },
    },
    true: {
      false: {
        invalid: false,
        disabled: true,
      },
      true: {
        invalid: true,
        disabled: true,
      },
    },
  };
  Field = (0, React.forwardRef)(
    (
      {
        className: input,
        validationMode: input3 = `onBlur`,
        ...input2
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <BaseFieldRoot
        {...originalJsxProps({
          ref: options,
          "data-cds": `Field`,
          validationMode: input3,
          ...input2,
          className: resolveUiDesignSystemValue2(
            `flex flex-col gap-xs font-sans`,
            input,
          ),
          render: (
            input4?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => (
            <FieldStatesCreateContext.Provider
              value={
                ToastFalse[`${options2.disabled}`][
                  `${options2.valid === false}`
                ]
              }
            >
            <div
                {...originalJsxProps({
                  ...input4,
                })}
              />
          </FieldStatesCreateContext.Provider>
          ),
        })}
      />
    ),
  );
  Field.displayName = `Field.Root`;
  FieldLabel = (0, React.forwardRef)(
    (
      { className: input, id: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = fieldLabelId();
      return (
        <BaseFieldLabel
          {...originalJsxProps({
            ref: options,
            id: input2 ?? value,
            ...input3,
            className: resolveUiDesignSystemValue2(
              `text-body font-medium leading-none text-primary`,
              input,
            ),
          })}
        />
      );
    },
  );
  FieldLabel.displayName = `Field.Label`;
  LabeledFieldsRef = (0, React.forwardRef)(
    (
      { className: input, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <BaseFieldDescription
        {...originalJsxProps({
          ref: options,
          ...input2,
          className: resolveUiDesignSystemValue2(
            `text-footnote font-normal leading-snug text-muted`,
            input,
          ),
        })}
      />
    ),
  );
  LabeledFieldsRef.displayName = `Field.Description`;
  FieldError = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <BaseFieldError
        {...originalJsxProps({
          ref: options,
          ...input3,
          className: resolveUiDesignSystemValue2(
            `flex items-start gap-1 text-footnote font-normal leading-snug text-danger`,
            input,
          ),
          render: (
            input4?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => (
            <div
              {...originalJsxsProps({
                ...input4,
                children: [
                  <UiOverlaysAndIconsCustomIcon
                    name={`WarningCircle`}
                    size={`sm`}
                    className={`mt-px shrink-0`}
                  />,
                  <span>{input2 ?? input4.children}</span>,
                ],
              })}
            />
          ),
        })}
      />
    ),
  );
  FieldError.displayName = `Field.Error`;
  LabeledField = (
    {
      label: input,
      hint: input2,
      error: input3,
      fieldClassName: input4,
      children: input5,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    <Field invalid={!!input3 || undefined} className={input4}>
    {input != null && <FieldLabel>{input}</FieldLabel>}
    {input5}
    {input2 != null && <LabeledFieldsRef>{input2}</LabeledFieldsRef>}
    {!!input3 && <FieldError match={true}>{input3}</FieldError>}
  </Field>
  );
  LabeledTextInput = (0, React.forwardRef)(
    (
      {
        label: input,
        hint: input2,
        error: input3,
        required: input4,
        fieldClassName: input5,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <LabeledField
        label={input}
        hint={input2}
        error={input3}
        fieldClassName={input5}
      >
      <TextInput
          {...originalJsxProps({
            ref: options,
            required: input4,
            ...input6,
          })}
        />
    </LabeledField>
    ),
  );
  LabeledTextInput.displayName = `Field.TextInput`;
  LabeledTextArea = (0, React.forwardRef)(
    (
      {
        label: input,
        hint: input2,
        error: input3,
        required: input4,
        fieldClassName: input5,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <LabeledField
        label={input}
        hint={input2}
        error={input3}
        fieldClassName={input5}
      >
      <TextArea
          {...originalJsxProps({
            ref: options,
            required: input4,
            ...input6,
          })}
        />
    </LabeledField>
    ),
  );
  LabeledTextArea.displayName = `Field.TextArea`;
}

export { Field, FieldError, FieldLabel, LabeledTextArea, LabeledTextInput };

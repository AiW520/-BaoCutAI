/** BaoCut: counter from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiProviderAndLayersDataSize,
} from "./cds-dependencies";

function isCommentsIsValidElement(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !(0, React.isValidElement)(input) || typeof input.type == `string`
    ? false
    : isCommentsIsCdsPictogram(input.type);
}

var CommentsState2: Dynamic;

var CommentsState3: Dynamic;

function isCommentsIsCdsPictogram(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let value: Dynamic = input;
  for (let index: Dynamic = 0; index < 4 && value != null; index++) {
    if (value.isCdsPictogram === true) return true;
    let value2: Dynamic = value;
    if (value2.$$typeof === CommentsState2) value = value2.type;
    else if (value2.$$typeof === CommentsState3) value = value2.render;
    else return false;
  }
  return false;
}

var CommentsRoundedComposer: Dynamic;

var CommentsNeutral3: Dynamic;

var CommentsNeutral4: Dynamic;

var Counter: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCounterStep1(): void {
  CommentsState2 = Symbol.for(`react.memo`);
  CommentsState3 = Symbol.for(`react.forward_ref`);
  CommentsRoundedComposer = `rounded-composer`;
  CommentsNeutral3 = {
    neutral: `bg-neutral text-secondary`,
    accent: `bg-fill-accent text-on-accent`,
    success: `bg-green-500 text-gray-0`,
    warning: `bg-fill-warning text-yellow-750`,
    danger: `bg-fill-danger text-on-danger`,
  };
  CommentsNeutral4 = {
    neutral: `bg-fill-control`,
    accent: `bg-fill-accent`,
    success: `bg-fill-success`,
    warning: `bg-fill-warning`,
    danger: `bg-fill-danger`,
  };
  Counter = (0, React.forwardRef)(
    (
      {
        value: input,
        max: input5 = 99,
        showZero: input6 = false,
        dot: input7 = false,
        variant: input8 = `danger`,
        size: input2,
        className: input3,
        ...input4
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (input7)
        return (
          <span
            {...originalJsxProps({
              ref: options,
              "data-cds": `Counter`,
              "aria-hidden": `true`,
              ...input4,
              className: resolveUiDesignSystemValue2(
                `inline-block size-2 shrink-0 rounded-full align-middle`,
                CommentsNeutral4[input8],
                input3,
              ),
            })}
          />
        );
      if (!Number.isFinite(input)) return null;
      let value: Dynamic = Math.max(0, Math.floor(input));
      if (value === 0 && !input6) return null;
      let value2: Dynamic = value > input5 ? `${input5}+` : `${value}`;
      return (
        <span
          {...originalJsxProps({
            ref: options,
            "data-cds": `Counter`,
            ...resolveUiProviderAndLayersDataSize(input2),
            ...input4,
            className: resolveUiDesignSystemValue2(
              `inline-flex shrink-0 items-center justify-center align-middle`,
              `h-control-nested min-w-[var(--cds-h-control-nested)] rounded-full`,
              value2.length === 1
                ? `px-0`
                : `px-[calc(var(--cds-h-control-nested)*0.3)]`,
              `font-sans text-caption font-medium proportional-nums`,
              CommentsNeutral3[input8],
              input3,
            ),
            children: value2,
          })}
        />
      );
    },
  );
  Counter.displayName = `Counter`;
}

export { CommentsRoundedComposer, Counter, isCommentsIsValidElement };

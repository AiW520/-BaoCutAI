/** BaoCut: switch from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseSwitchRoot,
  BaseSwitchThumb,
  DisabledReasonTooltip,
  React,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue2,
  resolveUiProviderAndLayersDataSize,
} from "./dependencies";

var SwitchStylesStyles: Dynamic;

var SwitchStylesStyles2: Dynamic;

var SwitchStylesStyles3: Dynamic;

var SwitchStylesStyles4: Dynamic;

function resolveSwitchStylesEnter(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (event.repeat && event.key === `Enter`) {
    event.preventDefault();
  }
}

var Switch: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSwitchStep1(): void {
  SwitchStylesStyles = `cds-reset relative inline-flex shrink-0 rounded-full border-0 outline-none focus-visible:outline-hidden bg-[var(--cds-switch-track)] hover:bg-[var(--cds-switch-track-hover)] data-[checked]:bg-fill-accent data-[checked]:hover:bg-fill-accent-hover data-[disabled]:opacity-disabled data-[disabled]:hover:bg-[var(--cds-switch-track)] data-[checked]:data-[disabled]:hover:bg-fill-accent focus-visible:shadow-focus`;
  SwitchStylesStyles2 = `block rounded-full bg-[var(--cds-switch-knob)] shadow-sm transition-transform duration-snap ease-overshoot motion-reduce:transition-none`;
  SwitchStylesStyles3 = `h-[var(--cds-switch-h)] w-[calc(var(--cds-switch-h,1.25rem)*1.8)] p-[2px]`;
  SwitchStylesStyles4 = `size-[calc(var(--cds-switch-h,1.25rem)-4px)] data-[checked]:translate-x-[calc(var(--cds-switch-h,1.25rem)*0.8)]`;
  Switch = (0, React.forwardRef)(
    (
      {
        className: input,
        size: input2,
        disabledReason: input3,
        disabledReasonSide: input4,
        onKeyDown: input5,
        onMouseDown: input6,
        ...input7
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (
        <BaseSwitchRoot ref={options} data-cds={`Switch`} {...input7} {...resolveUiProviderAndLayersDataSize(input2)} onMouseDown={resolveUiOverlaysAndIconsValue2(input6)} onKeyDown={(input8?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  resolveSwitchStylesEnter(input8);
  input5?.(input8);
}} className={resolveUiDesignSystemValue2(SwitchStylesStyles, SwitchStylesStyles3, input)}>{<BaseSwitchThumb className={`${SwitchStylesStyles2} ${SwitchStylesStyles4}`} />}</BaseSwitchRoot>
      );
      return input3 === undefined ? (
        value
      ) : (
        <DisabledReasonTooltip
          side={input4}
          reason={input7.disabled ? input3 : undefined}
        >
        {value}
      </DisabledReasonTooltip>
      );
    },
  );
  Switch.displayName = `Switch`;
}

export { Switch };

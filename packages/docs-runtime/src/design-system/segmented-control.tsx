/** BaoCut: segmented control from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseLabelableProvider,
  BaseRadioGroup,
  BaseRadioRoot,
  DisabledReasonTooltip,
  React,
  Tooltip,
  TooltipGroup,
  UiOverlaysAndIconsCustomIcon,
  collectUiShortcutsAndSizingModifiers2,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationValue5,
  resolveUiLinksAndFoundationValue9,
  resolveUiLinksAndFoundationWindow,
  resolveUiOverlaysAndIconsValue,
  resolveUiOverlaysAndIconsValue2,
  resolveUiProviderAndLayersDataSize,
  useTooltipGroup,
  useUiShortcutsAndSizingUseSyncExternalStore,
  useUiTooltipsAndControlsState,
} from "./dependencies";
import { isInsideField } from "./text-input";
import {
  resolveLanguagePickerCorrection,
  resolveLanguagePickerFlipAt,
  resolveLanguagePickerFlipAt2,
  updateLanguagePickerTransform,
} from "./language-picker-motion";
import type * as ReactComponentTypes from "react";

export const SegmentedControl: ReactComponentTypes.FC<Dynamic> = ({
  segments: input,
  value: input2,
  onChange: input3,
  variant: input14 = `contained`,
  size: input4,
  fullWidth: input15 = false,
  disabled: input5,
  tooltipSide: input6,
  tooltipClassName: input7,
  "aria-label": input8,
  "aria-required": input9,
  "aria-invalid": input10,
  "aria-describedby": input11,
  thumbPosition: input12,
  className: input13,
}) => {
  let value: Dynamic = (0, React.useRef)(null);
  useUiTooltipsAndControlsState(value, `SegmentedControl`);
  let value2: Dynamic = (0, React.useRef)(null);
  let value3: boolean = isInsideField();
  let value4: Dynamic = useUiShortcutsAndSizingUseSyncExternalStore();
  let value5: Dynamic = (0, React.useRef)({
    live: false,
    poll: null,
  });
  let value6: Dynamic = (0, React.useCallback)(function value11(
    input16: Dynamic = false,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let current: Dynamic = value.current;
    let current2: Dynamic = value2.current;
    if (!current || !current2) return;
    let element: Dynamic = current.querySelector(`[data-checked]`);
    let value12: Dynamic = element ? resolveSegmentedControlWidth(current) : null;
    let value13: Dynamic = null;
    if (!input16 || !(value12?.scaled || resolveLanguagePickerFlipAt2(current2))) {
      value13 = resolveLanguagePickerCorrection(
        current2,
        current,
        element ? resolveSegmentedControlLeft(element, current) : null,
        {
          correction: input16,
        },
      );
    }
    let value14 = (..._extraArguments: unknown[]): undefined => {
      value13?.();
      if (!value5.current.live) return;
      let poll: Dynamic = value5.current.poll;
      poll?.cancel();
      value5.current.poll = null;
      if (!value12 || (!input16 && !poll && !value12.scaled)) return;
      let {
        width: value15,
        still: value16,
        frames: value17,
      }: Dynamic = poll ?? {
        width: value12.width,
        still: 0,
        frames: 0,
      };
      if (
        input16 &&
        ((value16 = value15 === value12.width ? value16 + 1 : 0),
        (value15 = value12.width),
        (value17 += 1),
        value16 >= (value12.scaled ? segmentedControlValue30 : segmentedControlValue2) ||
          value17 >= segmentedControlValue600)
      )
        return;
      let value18: Dynamic = resolveSegmentedControlRequestAnimationFrame(
        current,
        (..._extraArguments: unknown[]): Dynamic => value11(true),
      );
      if (value18) {
        value5.current.poll = {
          cancel: value18,
          width: value15,
          still: value16,
          frames: value17,
        };
      }
    };
    if (options) {
      options.push(value14);
    } else {
      value14();
    }
  }, []);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value.current;
      let current2: Dynamic = value2.current;
      let value11: Dynamic = resolveUiOverlaysAndIconsValue(current);
      let value12: boolean = current !== null && value11 !== undefined;
      let current3: Dynamic = value5.current;
      current3.live = true;
      if (!value12 || (current2 !== null && resolveLanguagePickerFlipAt(current2))) {
        value6();
      }
      let value13: Dynamic = value12
        ? updateSegmentedControlObserver(current, value11, value6)
        : null;
      return (..._extraArguments: unknown[]): undefined => {
        value13?.();
        current3.live = false;
        current3.poll?.cancel();
      };
    },
    [
      input2,
      input14,
      input15,
      input
        .map((input16?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input16.value)
        .join(`\0`),
      value6,
    ],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!input12) return;
      let value11 = (input16?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let current: Dynamic = value.current;
        let current2: Dynamic = value2.current;
        if (!(!current || !current2)) {
          if (input16 === null) {
            if (resolveLanguagePickerFlipAt2(current2)) {
              value6();
            }
            return;
          }
          updateLanguagePickerTransform(
            current2,
            input16,
            (..._extraArguments: unknown[]): Dynamic =>
              Array.from<Dynamic, Dynamic>(
                current.querySelectorAll(`[role="radio"]`),
                (input17?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  resolveSegmentedControlLeft(input17, current),
              ),
          );
        }
      };
      value11(input12.get());
      let value12: Dynamic = input12.on(`change`, value11);
      return (..._extraArguments: unknown[]): undefined => {
        value12();
        value11(null);
      };
    },
    [input12, value6],
  );
  let value7: Dynamic = (0, React.useCallback)(
    (input16?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      input3(input16);
    },
    [input3],
  );
  let value8: boolean = input14 === `contained`;
  let value9: Dynamic = useTooltipGroup();
  let value10: Dynamic = (
    <BaseRadioGroup
      ref={value}
      data-cds={`SegmentedControl`}
      aria-label={input8}
      aria-required={input9}
      aria-invalid={input10}
      aria-describedby={input11}
      value={input2}
      onValueChange={value7}
      disabled={input5}
      {...resolveUiProviderAndLayersDataSize(input4)}
      className={resolveUiDesignSystemValue2(
        `relative inline-flex`,
        input15 ? `w-full` : `w-fit`,
        `shrink-0 items-stretch h-control font-sans`,
        value8 ? `rounded bg-[var(--cds-segmented-control-track)] p-px` : `gap-[1px]`,
        input13,
      )}
    >
      {
        <div
          aria-hidden={true}
          className={`pointer-events-none absolute inset-0 overflow-clip ${value8 ? `rounded` : ``}`}
        >
          <div
            ref={value2}
            className={`${SegmentedControlStyles5} ${value8 ? SegmentedControlStyles6 : SegmentedControlStyles7}`}
          />
        </div>
      }
      {input.map((input16?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let value11: Dynamic = input16.icon && input16.label === undefined;
        let value12: Dynamic = value11
          ? (input16.tooltip ?? String(input16.value))
          : input16.tooltip;
        let value13: Dynamic =
          typeof input16.tooltip == `string` ? input16.tooltip : String(input16.value);
        let value14: Dynamic = input16.icon ? (
          <UiOverlaysAndIconsCustomIcon name={input16.icon} size={`auto`} />
        ) : null;
        let value15: Dynamic = (
          <BaseRadioRoot
            value={input16.value}
            disabled={input16.disabled}
            aria-label={value11 ? value13 : undefined}
            aria-keyshortcuts={
              input16.shortcut
                ? collectUiShortcutsAndSizingModifiers2(input16.shortcut, value4)
                : undefined
            }
            onMouseDown={resolveUiOverlaysAndIconsValue2(undefined)}
            className={`${SegmentedControlStyles} ${value8 ? SegmentedControlTextSecondary : SegmentedControlStyles4} ${value11 ? SegmentedControlAspectSquare : SegmentedControlPxMd}${input15 ? ` flex-1` : ``}`}
          >
            {value14 && input16.indicator ? (
              <span className={`grid`}>
                <span
                  className={`col-start-1 row-start-1 [--seg-dot-r:calc(0.1875rem*var(--cds-rem-scale,1))] [--seg-dot-x:calc(100%_-_var(--seg-dot-r)_+_1px)] [&:dir(rtl)]:[--seg-dot-x:calc(var(--seg-dot-r)_-_1px)] not-forced-colors:has-[~[data-cds-part=indicator]>*]:[mask-image:radial-gradient(circle_at_var(--seg-dot-x)_calc(var(--seg-dot-r)_-_1px),transparent_calc(var(--seg-dot-r)_+_2px),black_calc(var(--seg-dot-r)_+_2.5px))]`}
                >
                  {value14}
                </span>
                <span
                  aria-hidden={true}
                  data-cds-part={`indicator`}
                  className={`relative col-start-1 row-start-1 -me-px -mt-px self-start justify-self-end has-[>[data-cds=Pulse]]:[--cds-page-bg:transparent]`}
                >
                  {input16.indicator}
                </span>
              </span>
            ) : (
              value14
            )}
            {input16.label}
          </BaseRadioRoot>
        );
        let value16: Dynamic =
          input16.disabled && input16.disabledReason ? (
            <DisabledReasonTooltip
              reason={input16.disabledReason}
              side={input6}
              hoverable={false}
              wrapperClassName={
                input15
                  ? `${SegmentedControlStyles2} ${value11 ? SegmentedControlFlex1 : SegmentedControlStyles3}`
                  : SegmentedControlStyles2
              }
            >
              {value15}
            </DisabledReasonTooltip>
          ) : value12 === undefined ? (
            value15
          ) : (
            <Tooltip
              content={value12}
              detail={input16.tooltipDetail}
              shortcut={input16.shortcut}
              side={input6}
              hoverable={input16.tooltipHoverable ?? false}
              className={input7}
            >
              {value15}
            </Tooltip>
          );
        return value3 ? (
          <BaseLabelableProvider key={input16.value}>{value16}</BaseLabelableProvider>
        ) : (
          <React.Fragment key={input16.value}>{value16}</React.Fragment>
        );
      })}
    </BaseRadioGroup>
  );
  return value9 ? value10 : <TooltipGroup>{value10}</TooltipGroup>;
};

var SegmentedControlStyles: Dynamic;

var SegmentedControlPxMd: Dynamic;

var SegmentedControlAspectSquare: Dynamic;

var SegmentedControlStyles2: Dynamic;

var SegmentedControlStyles3: Dynamic;

var SegmentedControlFlex1: Dynamic;

var SegmentedControlTextSecondary: Dynamic;

var SegmentedControlStyles4: Dynamic;

var SegmentedControlStyles5: Dynamic;

var SegmentedControlStyles6: Dynamic;

var SegmentedControlStyles7: Dynamic;

var segmentedControlValue30: Dynamic;

var segmentedControlValue2: Dynamic;

var segmentedControlValue600: Dynamic;

var segmentedControlWeakMap: Dynamic;

function updateSegmentedControlObserver(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiLinksAndFoundationWindow(input) ?? window;
  let entry: Dynamic = segmentedControlWeakMap.get(value);
  if (entry?.Observer !== options) {
    let entries: Dynamic = new (Map as Dynamic)();
    entry = {
      Observer: options,
      observer: new (options as Dynamic)(
        (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let items: Dynamic = [];
          for (let value4 of input2 as Dynamic) {
            let entry2: Dynamic = entries.get(value4.target);
            if (entry2) {
              resolveUiLinksAndFoundationValue9(
                (..._extraArguments: unknown[]): Dynamic =>
                  entry2(false, items),
              );
            }
          }
          for (let value4 of items as Dynamic)
            resolveUiLinksAndFoundationValue9(value4);
        },
      ),
      measures: entries,
    };
    segmentedControlWeakMap.set(value, entry);
  }
  let { observer: value2, measures: value3 }: Dynamic = entry;
  value3.set(input, context);
  value2.observe(input);
  return (..._extraArguments: unknown[]): undefined => {
    value2.unobserve(input);
    value3.delete(input);
  };
}

function resolveSegmentedControlLeft(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let bounds: Dynamic = options.getBoundingClientRect();
  let value: Dynamic = resolveSegmentedControlBorderBox(options);
  let value2: number =
    Math.abs(bounds.width - value) < 0.01 ? 1 : bounds.width / value;
  if (!(value2 > 0) || !Number.isFinite(value2))
    return {
      left: input.offsetLeft,
      width: input.offsetWidth,
    };
  let bounds2: Dynamic = input.getBoundingClientRect();
  let value3: Dynamic =
    resolveUiLinksAndFoundationWindow(options)?.devicePixelRatio || 1;
  let value4: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): number => Math.round(input2 * value3) / value3;
  return {
    left: (value4(bounds2.left) - value4(bounds.left)) / value2,
    width: (value4(bounds2.right) - value4(bounds2.left)) / value2,
  };
}

function resolveSegmentedControlWidth(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let width: Dynamic = input.getBoundingClientRect().width;
  return {
    width: width,
    scaled:
      input.offsetWidth > 0 &&
      Math.abs(width - resolveSegmentedControlBorderBox(input)) >= 0.01,
  };
}

function resolveSegmentedControlRequestAnimationFrame(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiLinksAndFoundationValue5(input);
  if (!value || typeof value.requestAnimationFrame != `function`) return null;
  let value2: Dynamic = value.requestAnimationFrame(options);
  return (..._extraArguments: unknown[]): undefined => {
    try {
      value.cancelAnimationFrame(value2);
    } catch {}
  };
}

function resolveSegmentedControlBorderBox(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let value: Dynamic = (
    resolveUiLinksAndFoundationWindow(input) ?? window
  ).getComputedStyle(input);
  let value2: number = parseFloat(value.width);
  return value.boxSizing === `border-box`
    ? value2
    : value2 +
        parseFloat(value.paddingLeft) +
        parseFloat(value.paddingRight) +
        parseFloat(value.borderLeftWidth) +
        parseFloat(value.borderRightWidth);
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSegmentedControlStep1(): void {
  SegmentedControlStyles = `cds-reset relative z-[1] inline-flex h-full items-center justify-center gap-1.5 select-none border-0 bg-transparent outline-none focus-visible:outline-hidden rounded-[calc(var(--cds-radius)-2px)] text-body font-normal [&:not([data-disabled])]:hover:text-primary data-[checked]:text-primary data-[disabled]:opacity-disabled transition-shadow duration-fast focus-visible:shadow-focus`;
  SegmentedControlPxMd = `px-md`;
  SegmentedControlAspectSquare = `aspect-square`;
  SegmentedControlStyles2 = `h-full relative z-[1] rounded-[calc(var(--cds-radius)-2px)]`;
  SegmentedControlStyles3 = `grow basis-[calc(var(--cds-pad-md)*2)]`;
  SegmentedControlFlex1 = `flex-1`;
  SegmentedControlTextSecondary = `text-secondary`;
  SegmentedControlStyles4 = `text-secondary [&:not([data-checked]):not([data-disabled])]:hover:bg-fill-ghost-hover`;
  SegmentedControlStyles5 = `invisible absolute left-0 origin-left rounded-[calc(var(--cds-radius)-1px)] bg-[var(--cds-segmented-control-thumb)]`;
  SegmentedControlStyles6 = `top-px bottom-px [box-shadow:inset_0_0_0_1px_var(--cds-border),0_1px_2px_0_rgb(0_0_0/0.05)]`;
  SegmentedControlStyles7 = `inset-y-0 [box-shadow:inset_0_0_0_1px_var(--cds-border)]`;
  segmentedControlValue30 = 30;
  segmentedControlValue2 = 2;
  segmentedControlValue600 = 600;
  segmentedControlWeakMap = new (WeakMap as Dynamic)();
}

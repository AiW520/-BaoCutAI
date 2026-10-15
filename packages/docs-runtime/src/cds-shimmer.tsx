/** BaoCut: shimmer from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  createSafeResizeObserver,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue4,
} from "./cds-dependencies";
import { AvatarsState } from "./cds-avatars";
import { inertProps } from "./cds-field-foundation";

var ShimmerDataFindOmitted: Dynamic;

var ShimmerDefault: Dynamic;

var ShimmerStyles: Dynamic;

var ShimmerStyles2: Dynamic;

var resolveShimmerSupports: Dynamic;

var resolveShimmerValue: (..._extraArguments: unknown[]) => undefined;

var resolveShimmerValue2: Dynamic;

function useShimmerUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    resolveShimmerValue2,
    resolveShimmerSupports,
    (..._extraArguments: unknown[]) => false,
  );
}

var shimmerSet: Dynamic;

var shimmerValue16: Dynamic;

var shimmerSet2: Dynamic;

var shimmerSet3: Dynamic;

var resolveShimmerNone: (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) => boolean;

function isShimmerOwnerDocument(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView) return false;
  let value: Dynamic = defaultView.getComputedStyle(element);
  if (!shimmerSet.has(value.display) || resolveShimmerNone(value)) return false;
  let parentElement: Dynamic = element.parentElement;
  for (
    let index: Dynamic = 0;
    parentElement && index < shimmerValue16;
    index++
  ) {
    let value2: Dynamic = defaultView.getComputedStyle(parentElement);
    if (resolveShimmerNone(value2)) return false;
    if (!shimmerSet2.has(value2.display) && !shimmerSet3.has(value2.display))
      break;
    parentElement = parentElement.parentElement;
  }
  return true;
}

function resolveShimmerSubtree(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof input.getAnimations == `function`)
    return input
      .getAnimations({
        subtree: true,
      })
      .find((input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let effect: Dynamic = input2.effect;
        return effect?.target === input && effect.pseudoElement === `::after`;
      });
}

var ShimmerStyles3: Dynamic;

var ShimmerDefault2: Dynamic;

var ShimmerShimmerClone: Dynamic;

var Shimmer: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeShimmerStep1(): void {
  ShimmerDataFindOmitted = `data-find-omitted`;
  ShimmerDefault = {
    default: `[background-image:linear-gradient(120deg,var(--cds-text-primary)_37.5%,color-mix(in_srgb,var(--cds-text-primary)_30%,white)_50%,var(--cds-text-primary)_62.5%)] dark:[background-image:linear-gradient(120deg,var(--cds-text-secondary)_37.5%,var(--cds-text-primary)_50%,var(--cds-text-secondary)_62.5%)] motion-reduce:text-primary dark:motion-reduce:text-secondary`,
    secondary: `[background-image:linear-gradient(120deg,var(--cds-text-secondary)_37.5%,color-mix(in_srgb,var(--cds-text-secondary)_30%,white)_50%,var(--cds-text-secondary)_62.5%)] dark:[background-image:linear-gradient(120deg,var(--cds-text-muted)_37.5%,color-mix(in_srgb,var(--cds-text-muted)_30%,white)_50%,var(--cds-text-muted)_62.5%)] motion-reduce:text-secondary dark:motion-reduce:text-muted`,
    muted: `[background-image:linear-gradient(120deg,var(--cds-text-muted)_37.5%,color-mix(in_srgb,var(--cds-text-muted)_30%,white)_50%,var(--cds-text-muted)_62.5%)] motion-reduce:text-muted`,
  };
  ShimmerStyles = `bg-clip-text [-webkit-text-fill-color:transparent] bg-no-repeat [background-size:400%_100%] [background-position:83.333%_0%] animate-[cds-shimmer-text-shine_3s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none dark:motion-reduce:bg-none motion-reduce:[-webkit-text-fill-color:currentcolor] forced-colors:animate-none forced-colors:bg-none forced-colors:[-webkit-text-fill-color:CanvasText]`;
  ShimmerStyles2 = `(-webkit-mask-clip: text) and (-webkit-app-region: drag)`;
  resolveShimmerSupports = (..._extraArguments: unknown[]): Dynamic =>
    typeof CSS !== "undefined" &&
    typeof CSS.supports == `function` &&
    CSS.supports(ShimmerStyles2);
  resolveShimmerValue = (..._extraArguments: unknown[]): undefined => undefined;
  resolveShimmerValue2 = (..._extraArguments: unknown[]): Dynamic =>
    resolveShimmerValue;
  shimmerSet = new (Set as Dynamic)([
    `block`,
    `inline-block`,
    `flow-root`,
    `list-item`,
  ]);
  shimmerValue16 = 16;
  shimmerSet2 = new (Set as Dynamic)([`block`, `flow-root`, `list-item`]);
  shimmerSet3 = new (Set as Dynamic)([`contents`, `inline`]);
  resolveShimmerNone = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    input.getPropertyValue(`-webkit-line-clamp`) !== `none`;
  ShimmerStyles3 = `relative forced-colors:[-webkit-text-fill-color:CanvasText]`;
  ShimmerDefault2 = {
    default: `[-webkit-text-fill-color:var(--cds-text-primary)] dark:[-webkit-text-fill-color:var(--cds-text-secondary)] [--cds-shimmer-text-peak:color-mix(in_srgb,var(--cds-text-primary)_30%,white)] dark:[--cds-shimmer-text-peak:var(--cds-text-primary)]`,
    secondary: `[-webkit-text-fill-color:var(--cds-text-secondary)] dark:[-webkit-text-fill-color:var(--cds-text-muted)] [--cds-shimmer-text-peak:color-mix(in_srgb,var(--cds-text-secondary)_30%,white)] dark:[--cds-shimmer-text-peak:color-mix(in_srgb,var(--cds-text-muted)_30%,white)]`,
    muted: `[-webkit-text-fill-color:var(--cds-text-muted)] [--cds-shimmer-text-peak:color-mix(in_srgb,var(--cds-text-muted)_30%,white)]`,
  };
  ShimmerShimmerClone = {
    "data-cds-shimmer-clone": ``,
    "aria-hidden": true,
    [ShimmerDataFindOmitted]: ``,
    ...inertProps(true),
  };
  Shimmer = (0, React.forwardRef)(function (
    {
      children: input,
      active: input7 = true,
      variant: input8 = `default`,
      delay: input2,
      paused: input3,
      className: input4,
      style: input5,
      ...input6
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = useShimmerUseSyncExternalStore();
    let value2: Dynamic = (0, React.useRef)(null);
    let value3: Dynamic = (0, React.useRef)(null);
    let value4: Dynamic = resolveUiOverlaysAndIconsValue4(value2, options);
    let [value5, value6]: Dynamic = (0, React.useState)(true);
    UiDesignSystemUseLayoutEffect(
      (..._extraArguments: unknown[]): Dynamic => {
        let current: Dynamic = value2.current;
        if (!input7 || !value || !current) return;
        let value15: Dynamic =
          current.ownerDocument.defaultView?.ResizeObserver;
        if (!value15) {
          value6(false);
          return;
        }
        let value16: Dynamic = createSafeResizeObserver(
          value15,
          (..._extraArguments: unknown[]): undefined => {
            value16.disconnect();
            (0, AvatarsState.flushSync)(
              (..._extraArguments: unknown[]): Dynamic =>
                value6(isShimmerOwnerDocument(current)),
            );
          },
        );
        if (value16.observe(current)) {
          if (value3.current) {
            value16.observe(value3.current);
          }
        } else {
          value6(false);
        }
        return (..._extraArguments: unknown[]): Dynamic => value16.disconnect();
      },
      [input7, value, input4],
    );
    let value7: Dynamic = input7 && value && value5;
    let [value8, value9]: Dynamic = (0, React.useState)(0);
    let value10: Dynamic = (0, React.useRef)(null);
    let value11: Dynamic = (0, React.useRef)(null);
    UiDesignSystemUseLayoutEffect(
      (..._extraArguments: unknown[]): undefined => {
        if (!value7) {
          value10.current = null;
          value11.current = null;
          return;
        }
        let current: Dynamic = value2.current;
        if (!current) return;
        let current2: Dynamic = value3.current;
        let current3: Dynamic = value11.current;
        if (current3 !== null && current2 !== null) {
          value11.current = null;
          let value16: Dynamic = resolveShimmerSubtree(current2);
          if (value16) {
            if (current3.start !== null && value16.playState === `running`) {
              value16.startTime = current3.start;
            } else {
              if (current3.time !== null) {
                value16.currentTime = current3.time;
              }
            }
          }
        }
        let value15: Dynamic = ``;
        for (let value16 of current.childNodes as Dynamic)
          if (value16 !== current2) {
            value15 += value16.textContent ?? ``;
          }
        if (value10.current !== null && value10.current !== value15) {
          let value16: Dynamic = current2
            ? resolveShimmerSubtree(current2)
            : undefined;
          let value17: Dynamic = value16?.startTime;
          let value18: Dynamic = value16?.currentTime;
          value11.current = value16
            ? {
                start: typeof value17 == `number` ? value17 : null,
                time: typeof value18 == `number` ? value18 : null,
              }
            : null;
          value9(
            (input9?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input9 + 1,
          );
        }
        value10.current = value15;
      },
    );
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {},
      [input, value7],
    );
    let value12: Dynamic = input7
      ? value7
        ? `composited`
        : `fallback`
      : `inactive`;
    let value13: Dynamic =
      value12 === `fallback`
        ? {
            ...(input2 !== undefined && {
              animationDelay: `${input2}ms`,
            }),
            ...(input3 && {
              animationPlayState: `paused`,
            }),
          }
        : value12 === `composited`
          ? {
              ...(input2 !== undefined && {
                "--cds-shimmer-text-delay": `${input2}ms`,
              }),
              ...(input3 && {
                "--cds-shimmer-text-play-state": `paused`,
              }),
            }
          : {};
    let value14: Dynamic =
      input5 || Object.keys(value13).length > 0
        ? {
            ...input5,
            ...value13,
          }
        : undefined;
    return (
      <span
        {...originalJsxsProps({
          ...input6,
          ref: value4,
          "data-cds": `ShimmerText`,
          "data-shimmering": input7 ? `true` : `false`,
          className:
            value12 === `inactive`
              ? input4
              : value12 === `composited`
                ? resolveUiDesignSystemValue2(
                    ShimmerStyles3,
                    ShimmerDefault2[input8],
                    input4,
                  )
                : resolveUiDesignSystemValue2(
                    ShimmerStyles,
                    ShimmerDefault[input8],
                    input4,
                  ),
          style: value14,
          children: [
            input,
            value12 === `composited` ? (
              <span
                {...originalJsxProps(
                  {
                    ref: value3,
                    ...ShimmerShimmerClone,
                    children: input,
                  },
                  value8,
                )}
              />
            ) : null,
          ],
        })}
      />
    );
  });
  Shimmer.displayName = `ShimmerText`;
}

export { Shimmer };

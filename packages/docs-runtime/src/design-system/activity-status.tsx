/** BaoCut: activity status from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  clsx,
  resolveUiLinksAndFoundationUseContext3,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./dependencies";
import { designTokens } from "./design-tokens";
import { isReducedMotion } from "./presentation";
import {
  ShimmerMemo2,
  resolveShimmerAnimate,
  resolveShimmerValue3,
  resolveShimmerValue4,
  resolveShimmerValue6,
} from "./spark";
import type * as ReactComponentTypes from "react";

export const ShimmerMotion: ReactComponentTypes.FC<Dynamic> = ({
  motion: input,
  leading: input2,
  onLeft: input3,
}) => {
  let value: Dynamic = resolveShimmerValue6(input2);
  let [value2, value3]: Dynamic = (0, React.useState)(!value);
  if (!value && !value2) {
    value3(true);
  }
  let value4: Dynamic = value2;
  let value5: Dynamic = (0, React.useRef)(null);
  let value6: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
    (..._extraArguments: unknown[]): Dynamic => input3?.(),
  );
  let value7: boolean = input === `leaving` || input === `leaving-still`;
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value7) return;
      let current: Dynamic = value5.current;
      if (!current || typeof current.animate != `function` || isReducedMotion()) {
        value6();
        return;
      }
      let value9: string = current.parentElement
        ? getComputedStyle(current.parentElement).columnGap
        : `0px`;
      let value10: string = `calc(-1 * ${value9 === `normal` ? `0px` : value9})`;
      let marginInlineEnd: string = getComputedStyle(current).marginInlineEnd;
      let width: Dynamic = current.getBoundingClientRect().width;
      let parentElement: Dynamic = current.parentElement;
      let value11: Dynamic = parentElement?.style.getPropertyValue(
        ShimmerCdsTurnStatusHang,
      )
        ? parentElement
        : null;
      let value12: Dynamic =
        (value11 && parseFloat(getComputedStyle(value11).marginInlineStart)) || 0;
      let value13: Dynamic =
        width + (parseFloat(value9) || 0) + (parseFloat(marginInlineEnd) || 0);
      let value14: Dynamic;
      let value15: Dynamic;
      let value16: boolean = false;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        if (!value16) {
          if (value11) {
            value15 = resolveShimmerAnimate(
              value11,
              [
                {
                  marginInlineStart: `${value12}px`,
                },
                {
                  marginInlineStart: `${value12 + value13}px`,
                },
              ],
              {
                duration: 400,
                easing: ShimmerMessage2,
                fill: `forwards`,
              },
            );
          }
          value14 = resolveShimmerValue3(
            current,
            [
              {
                offset: 0,
                width: `${width}px`,
                marginInlineEnd: marginInlineEnd,
                opacity: 1,
                transform: `scale(1)`,
              },
              {
                offset: 0.6,
                opacity: 1,
              },
              {
                offset: 1,
                width: `0px`,
                marginInlineEnd: value10,
                opacity: 0,
                transform: `scale(0)`,
              },
            ],
            {
              duration: 400,
              easing: ShimmerMessage2,
              fill: `forwards`,
            },
          );
          if (!value14 || (value11 && !value15)) {
            resolveShimmerValue4(value14);
            resolveShimmerValue4(value15);
            value14 = value15 = undefined;
            value6();
            return;
          }
          value14.finished.then(
            value6,
            (..._extraArguments: unknown[]): undefined => undefined,
          );
        }
      });
      return (..._extraArguments: unknown[]): undefined => {
        value16 = true;
        resolveShimmerValue4(value14);
        resolveShimmerValue4(value15);
      };
    },
    [value7, value6],
  );
  let value8: boolean = input === `busy` || input === `pending` || input === `leaving`;
  return (
    <span
      ref={value5}
      aria-hidden={`true`}
      data-cds-row-mark={``}
      className={clsx(
        `relative flex h-[1lh] shrink-0 items-center justify-center`,
        ShimmerStyles6,
      )}
    >
      <span
        className={clsx(
          `absolute top-1/2 left-1/2 flex size-icon -translate-x-1/2 -translate-y-1/2 items-center justify-center motion-reduce:transition-none`,
          value
            ? `opacity-0 transition-opacity delay-150 duration-200 ease-out`
            : `opacity-100`,
        )}
      >
        {input === `pending` && !value ? (
          <ShimmerMemo2
            state={`thinking`}
            size={`160%`}
            className={`absolute top-1/2 left-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2`}
          />
        ) : (
          <ShimmerMemo2
            state={value8 && !value ? `thinking` : undefined}
            size={`100%`}
            className={`shrink-0`}
          />
        )}
      </span>
      {value && (
        <span
          className={clsx(
            `absolute inset-0 flex items-center justify-center [&>*]:max-h-full [&>*]:max-w-full`,
            value4 &&
              `transition-opacity delay-150 duration-200 ease-out motion-reduce:transition-none starting:opacity-0`,
          )}
        >
          {input2}
        </span>
      )}
    </span>
  );
};

export const ShimmerValue: ReactComponentTypes.FC<Dynamic> = ({
  value: input,
  prose: input2 = false,
}) => {
  return typeof input == `string` ? (
    <bdi>{input2 ? resolveShimmerReplace2(input) : resolveShimmerReplace(input)}</bdi>
  ) : (
    input
  );
};

var shimmerState3: Dynamic;

var resolveShimmerValue7: Dynamic;

var ShimmerMessage: Dynamic;

function resolveShimmerReplace(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.replace(resolveShimmerValue7(), ShimmerMessage);
}

function resolveShimmerReplace2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input
    .replace(/[\t\n\v\f\r\u0085\u2028\u2029]+/g, ` `)
    .replace(
      /[\uD800-\uDBFF]*(?:(?!\u200C|\u200D|\uFE0E|\uFE0F)[\p{Cc}\p{Cf}\p{Zl}\p{Zp}\p{Default_Ignorable_Code_Point}\u2800\uFFFC\u{1D159}\u{13441}\u{13442}\u{16910}\uFDD0-\uFDEF\uFFFE\uFFFF\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}])+[\uDC00-\uDFFF]*|([\uD800-\uDBFF]+)/gu,
      ShimmerMessage,
    );
}

function resolveShimmerTest(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveShimmerReplace(input);
  if (
    !(
      value === `` ||
      /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}\uFFFD]/u.test(
        value,
      ) ||
      /[\uD800-\uDFFF]/u.test(input)
    )
  )
    return value;
}

function resolveShimmerValue8(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input === undefined ? undefined : resolveShimmerTest(input);
}

function filterShimmerGetAnimations(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof input.getAnimations == `function`
    ? input.getAnimations().filter(isShimmerRunning)
    : [];
}

function isShimmerRunning(input?: Dynamic, ..._extraArguments: unknown[]) {
  if (
    input.playState !== `running` ||
    input.effect?.getTiming().iterations === 1 / 0
  )
    return false;
  let timeline: Dynamic = input.timeline;
  return !(typeof timeline == `object` && timeline && `source` in timeline);
}

function collectShimmerThen(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: boolean = true;
  let value2: number = requestAnimationFrame(
    (..._extraArguments: unknown[]): undefined => {
      value2 = requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          let value3: Dynamic = filterShimmerGetAnimations(input);
          if (value3.length === 0) {
            options();
            return;
          }
          Promise.allSettled(
            value3.map(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                input2.finished,
            ),
          ).then((..._extraArguments: unknown[]): undefined => {
            if (value) {
              options();
            }
          });
        },
      );
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    value = false;
    cancelAnimationFrame(value2);
  };
}

var ShimmerFailed: Dynamic;

function resolveShimmerBusy(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return typeof options == `string`
    ? `${input}|${resolveShimmerReplace2(input === `busy` ? resolveShimmerTest2(options) : options)}`
    : `${input}|`;
}

function resolveShimmerFailed(..._extraArguments: unknown[]): Dynamic {
  return {
    failed: resolveUiLinksAndFoundationUseContext3(
      `failed`,
      ShimmerFailed.failed,
    ),
    stopped: resolveUiLinksAndFoundationUseContext3(
      `stopped`,
      ShimmerFailed.stopped,
    ),
    denied: resolveUiLinksAndFoundationUseContext3(
      `denied`,
      ShimmerFailed.denied,
    ),
    blocked: resolveUiLinksAndFoundationUseContext3(
      `blocked`,
      ShimmerFailed.blocked,
    ),
    busy: resolveUiLinksAndFoundationUseContext3(`busy`, ShimmerFailed.busy),
  };
}

var ShimmerCdsOutsetX: Dynamic;

var ShimmerStyles4: Dynamic;

var ShimmerFlexMinW0ItemsCenterGapXsTextStartFontSansTextBodyFontNormal: Dynamic;

var ShimmerStyles5: Dynamic;

function resolveShimmerValue9(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveShimmerReplace2(resolveShimmerForEach(input));
}

function resolveShimmerForEach(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let value: string = ``;
  React.Children.forEach(
    input,
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (typeof input2 == `string`) {
        value += input2;
      } else {
        if (typeof input2 == `number`) {
          value += String(input2);
        } else {
          if ((0, React.isValidElement)(input2)) {
            value += resolveShimmerForEach(input2.props.children);
          }
        }
      }
    },
  );
  return value;
}

function resolveShimmerTest2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let length: Dynamic = input.length;
  for (; length > 0 && /[\s\p{Cf}]/u.test(input.charAt(length - 1)); ) length--;
  let value: Dynamic = length;
  for (; value > 0; ) {
    let value3: Dynamic = input.charAt(value - 1);
    if (value3 === `…`) {
      value--;
      continue;
    }
    if (value3 === `.`) {
      let value4: Dynamic = value;
      for (; value4 > 0 && input[value4 - 1] === `.`; ) value4--;
      if (value - value4 >= 3) {
        value = value4;
        continue;
      }
      break;
    }
    break;
  }
  let value2: Dynamic = value === length ? input : input.slice(0, value);
  return value2.trim() === `` ? input : value2;
}

var ShimmerMessage2: Dynamic;

var ShimmerMessage3: Dynamic;

var ShimmerCdsTurnStatusHang: Dynamic;

var ShimmerState3: Dynamic;

var ShimmerTransition: Dynamic;

var ShimmerTransition2: Dynamic;

function resolveShimmerValue10(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input
    ? options
      ? ShimmerState3
      : ShimmerTransition2
    : options
      ? ShimmerCdsOutsetX
      : ShimmerTransition;
}

var ShimmerStyles6: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeActivityStatusStep1(): void {
  resolveShimmerValue7 = (..._extraArguments: unknown[]): Dynamic =>
    (shimmerState3 ??=
      /[\uD800-\uDBFF]*[\p{Cc}\p{Cf}\p{Zl}\p{Zp}\p{Default_Ignorable_Code_Point}\u2800\uFFFC\u{1D159}\u{13441}\u{13442}\u{16910}\uFDD0-\uFDEF\uFFFE\uFFFF\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]+[\uDC00-\uDFFF]*|([\uD800-\uDBFF]+)/gu);
  ShimmerMessage = `$1`;
  ShimmerFailed = {
    failed: `Failed`,
    stopped: `Stopped`,
    denied: `Denied`,
    blocked: `Needs approval`,
    busy: `running`,
  };
  ShimmerCdsOutsetX = {
    "--cds-outset-x": designTokens.pad.xs.cssVar,
  };
  ShimmerStyles4 = `w-stretch px-xs ms-[calc(var(--cds-assistant-message-text-inset,0px)_-_var(--cds-outset-x,0px)_-_var(--cds-turn-status-hang,0px))] me-[calc(var(--cds-assistant-message-text-stop,0px)_-_var(--cds-outset-x,0px))]`;
  ShimmerFlexMinW0ItemsCenterGapXsTextStartFontSansTextBodyFontNormal = `flex min-w-0 items-center gap-xs text-start font-sans text-body font-normal`;
  ShimmerStyles5 = `py-[calc((var(--cds-h-control)_-_1lh)_/_2)]`;
  ShimmerMessage2 = `cubic-bezier(0.22, 1, 0.36, 1)`;
  ShimmerMessage3 = `calc(20px + 12px)`;
  ShimmerCdsTurnStatusHang = `--cds-turn-status-hang`;
  ShimmerState3 = {
    ...ShimmerCdsOutsetX,
    [ShimmerCdsTurnStatusHang]: ShimmerMessage3,
  };
  ShimmerTransition = {
    ...ShimmerCdsOutsetX,
    transition: `none`,
  };
  ShimmerTransition2 = {
    ...ShimmerState3,
    transition: `none`,
  };
  ShimmerStyles6 = `w-[20px] me-[calc(12px_-_var(--cds-gap-xs))]`;
}

export { ShimmerFlexMinW0ItemsCenterGapXsTextStartFontSansTextBodyFontNormal, ShimmerStyles4, ShimmerStyles5, collectShimmerThen, resolveShimmerBusy, resolveShimmerFailed, resolveShimmerTest2, resolveShimmerValue10, resolveShimmerValue8, resolveShimmerValue9 };

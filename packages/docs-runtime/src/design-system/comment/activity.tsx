/** BaoCut: comment activity from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiTooltipsAndControlsValue5,
} from "../dependencies";
import { Avatar } from "../avatars";
import { Shimmer } from "../shimmer";
import {
  ShimmerFlexMinW0ItemsCenterGapXsTextStartFontSansTextBodyFontNormal,
  ShimmerMotion,
  ShimmerStyles4,
  ShimmerStyles5,
  ShimmerValue,
  resolveShimmerBusy,
  resolveShimmerFailed,
  resolveShimmerTest2,
  resolveShimmerValue10,
  resolveShimmerValue8,
  resolveShimmerValue9,
} from "../activity-status";
import { ShimmerSwapKey } from "../activity-transitions";
import type * as ReactComponentTypes from "react";

export const CommentsLabel: ReactComponentTypes.FC<Dynamic> = ({
  label: input,
  leading: input2,
}) => {
  let value: string = typeof input == `string` ? input : ``;
  let value2: string = value === `` ? `pending` : `busy`;
  resolveUiTooltipsAndControlsValue5(
    value2 === `pending`,
    'cds: <TurnStatus state="busy"> needs a host-supplied `label` (CDS ships no status copy); rendering the pending mark instead.',
  );
  resolveUiTooltipsAndControlsValue5(
    value2 === `pending` && input2 === null,
    'cds: <TurnStatus state="pending" leading={null}>: a pending row is only its mark, so `null` is ignored and the Spark renders; pass `null` from the first busy state.',
  );
  let { state: value3, label: value4 }: Dynamic = useCommentsMinMs(
    (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic => ({
        state: value2,
        label: value,
      }),
      [value2, value],
    ),
    resolveShimmerBusy(value2, value),
    {
      minMs: (input3?: Dynamic, ..._extraArguments: unknown[]) =>
        input3.state === `busy` && value2 === `busy` ? undefined : 0,
      settleMs: 250,
      restretch: true,
    },
  );
  let value5: boolean = value3 === `busy`;
  let value6: boolean = !value5 || input2 !== null;
  let value7: Dynamic = resolveShimmerTest2(value4);
  let { busy: value8 }: Dynamic = resolveShimmerFailed();
  let value9: Dynamic = (0, React.useId)();
  return (
    <div
      data-closed={``}
      data-cds={`TurnStatus`}
      data-state={value3}
      className={`group/status flex w-full min-w-0 flex-col`}
    >
      <div
        tabIndex={-1}
        className={resolveUiDesignSystemValue2(
          ShimmerFlexMinW0ItemsCenterGapXsTextStartFontSansTextBodyFontNormal,
          `items-center`,
          ShimmerStyles5,
          ShimmerStyles4,
          value5 &&
            value6 &&
            `transition-[margin-inline-start] duration-200 ease-out motion-reduce:transition-none`,
          `rounded outline-none focus-visible:[box-shadow:inset_0_0_0_1px_var(--cds-fill-accent)] focus-visible:outline-hidden`,
        )}
        style={resolveShimmerValue10(false, true)}
        title={value5 ? resolveShimmerValue8(value4) : undefined}
      >
        {value6 && (
          <ShimmerMotion motion={value5 ? `busy` : `pending`} leading={input2} />
        )}
        <span id={`${value9}-text`} className={`flex min-w-0 gap-xs items-center`}>
          {value5 && (
            <ShimmerSwapKey
              swapKey={resolveShimmerBusy(value3, value4)}
              id={`${value9}-label`}
              className={`min-w-0 max-w-full`}
            >
              <Shimmer
                variant={`secondary`}
                className={`min-w-0 overflow-x-clip text-ellipsis whitespace-nowrap py-[0.125em] -my-[0.125em]`}
              >
                <ShimmerValue value={value7} prose={true} />
              </Shimmer>
            </ShimmerSwapKey>
          )}
        </span>
        {value5 && (
          <span id={`${value9}-busy`} className={`sr-only`}>
            {value8}
          </span>
        )}
      </div>
      <span className={`sr-only`} role={`status`} aria-live={`polite`}>
        {value5 ? resolveShimmerValue9(value7) : ``}
      </span>
    </div>
  );
};

var commentsValue650: Dynamic;

function resolveCommentsValue2(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.type === `shown`
    ? Object.is(options.value, input.value) && options.line === input.line
      ? input
      : {
          ...input,
          value: options.value,
          line: options.line,
        }
    : options.key === input.key
      ? input
      : {
          key: options.key,
          value: options.value,
          line: options.line,
          armed: options.armed,
        };
}

function useCommentsMinMs(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    minMs: value,
    settleMs: value3 = 0,
    line: value2,
    restretch: value4 = false,
  }: Dynamic = typeof context == `object`
    ? context
    : {
        minMs: context,
      };
  let [value5, value6]: Dynamic = (0, React.useReducer)(
    resolveCommentsValue2,
    undefined,
    (..._extraArguments: unknown[]): Dynamic => ({
      key: options,
      value: input,
      line: value2,
      armed: false,
    }),
  );
  let value7: Dynamic =
    (typeof value == `function` ? value(value5.value) : value) ??
    commentsValue650;
  let value8: boolean = !(value4 && value7 === 0);
  if (
    options !== value5.key &&
    (value7 === 0 || (!value5.armed && value3 === 0))
  ) {
    value6({
      type: `swap`,
      key: options,
      value: input,
      line: value2,
      armed: value8,
    });
  }
  let value9: boolean = options !== value5.key;
  let value10: Dynamic = (0, React.useRef)(null);
  let value11: Dynamic = (0, React.useRef)(null);
  let value12: Dynamic = (0, React.useRef)({
    value: input,
    line: value2,
  });
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (!value9) {
        value12.current = {
          value: input,
          line: value2,
        };
      }
    },
    [value9, input, value2],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value12.current;
      if (
        value9 &&
        !(
          Object.is(value5.value, current.value) && value5.line === current.line
        )
      ) {
        value6({
          type: `shown`,
          value: current.value,
          line: current.line,
        });
      }
    },
    [value9, value5.value, value5.line],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (value10.current?.key !== value5.key) {
        value10.current = {
          key: value5.key,
          at: performance.now(),
        };
      }
    },
    [value5.key],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (value9) {
        if (value11.current?.key !== options) {
          value11.current = {
            key: options,
            at: performance.now(),
          };
        }
      } else {
        value11.current = null;
      }
    },
    [value9, options],
  );
  let value13: boolean = value2 !== undefined && value2 === value5.line;
  let value14: Dynamic = value5.armed && !value13;
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value9) return;
      let value15: number = performance.now();
      let value16: Dynamic = (value11.current?.at ?? value15) + value3;
      let current: Dynamic = value10.current;
      let value17: Dynamic =
        value14 && current !== null ? current.at + value7 : value15;
      let value18: number = Math.max(value16, value17);
      let value19: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        value6({
          type: `swap`,
          key: options,
          value: input,
          line: value2,
          armed: value8,
        });
      if (value15 >= value18) {
        value19();
        return;
      }
      let value20: Dynamic = setTimeout(value19, value18 - value15);
      return (..._extraArguments: unknown[]): void => clearTimeout(value20);
    },
    [value9, options, input, value2, value7, value3, value14, value8],
  );
  return value9 ? value5.value : input;
}

var CommentsLabel2: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentActivityStep1(): void {
  commentsValue650 = 650;
  CommentsLabel2 = (0, React.forwardRef)(
    (
      {
        label: input,
        byline: input5 = false,
        leading: input2,
        className: input3,
        ...input4
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `claude`,
        // BaoCut: 批注卡片上智能体活动行（「… is working on it」上方的署名）显示的名字
        `Agent`,
      );
      return (
        <div ref={options} data-cds-part={`activity`} className={resolveUiDesignSystemValue2(`flex flex-col gap-xs`, input3)} {...input4}>{input5 && <div className={`flex items-center gap-xs text-footnote font-normal`}>
                <span aria-hidden={`true`} className={`inline-flex shrink-0`}>
                  <Avatar variant={`claude`} name={value} size={`sm`} />
                </span>
                <span className={`font-semibold`}>{value}</span>
              </div>}{<CommentsLabel label={input} leading={input2} />}</div>
      );
    },
  );
  CommentsLabel2.displayName = `CommentCard.Activity`;
}

export { CommentsLabel2 };

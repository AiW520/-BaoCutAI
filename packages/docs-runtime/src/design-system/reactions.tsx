import { jsx as renderReactJsx } from "react/jsx-runtime";
/** BaoCut: reactions from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  Tooltip,
  TooltipGroup,
  UiLinksAndFoundationCreateContext3,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationValue19,
  resolveUiOverlaysAndIconsValue4,
  useTooltipGroup,
} from "./dependencies";
import { useReducedMotion } from "./presentation";
import { inertProps, useCommentCardContext } from "./field-foundation";
import {
  CommentMotionCreateContext2,
  resolveCommentMotionStandDown,
} from "./comment/motion";

var commentMotionMap: Dynamic;

var commentMotionValue250: Dynamic;

var commentMotionValue170: Dynamic;

var commentMotionValue200: Dynamic;

var resolveCommentMotionQuiet: Dynamic;

function isCommentMotionKey(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let entries: Dynamic = new (Map as Dynamic)();
  let value: Dynamic = null;
  let mapped: Dynamic = input
    .filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        !options.some(
          (input3?: Dynamic, ..._extraArguments: unknown[]) =>
            input3.emoji === input2.emoji,
        ),
    )
    .map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        ...input2,
        key: `copy${context}:${input2.emoji}`,
      }),
    );
  let length: Dynamic = mapped.length;
  for (let value3 of options as Dynamic) {
    let match: Dynamic = input.find(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2.emoji === value3.emoji,
    );
    if (!match) {
      length += 1;
      let value4: Dynamic = value3.mine && value3.count === 1;
      value = value4 ? value3.emoji : value;
      entries.set(
        value3.emoji,
        value4
          ? {
              seq: context,
              enter: `own`,
              face: `pop`,
            }
          : {
              seq: context,
              enter: `quiet`,
            },
      );
    } else if (
      (match.count !== value3.count || match.mine !== value3.mine) &&
      ((length += 1), match.count !== value3.count)
    ) {
      let value4: boolean = value3.count > match.count;
      let value5: boolean =
        match.mine !== value3.mine && value3.mine === value4;
      value = value5 ? value3.emoji : value;
      entries.set(value3.emoji, {
        seq: context,
        roll: {
          from: match.count,
          up: value4,
        },
        face: value5 ? (value3.mine ? `pop` : `dip`) : undefined,
      });
    }
  }
  let [value2]: Dynamic = mapped;
  return length > 1
    ? {
        motions: commentMotionMap,
        gone: [],
        resync: true,
        press: null,
      }
    : {
        motions: entries,
        gone: mapped,
        resync: false,
        press: value2 ? (value2.mine ? value2.emoji : null) : value,
      };
}

function isCommentMotionKey2(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mapped: Dynamic = options.map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      key: input2.emoji,
    }),
  );
  let value: number = -1;
  for (let value2 of input as Dynamic) {
    let value3: Dynamic = value2.copy?.emoji ?? value2.key;
    let index: Dynamic = mapped.findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]): boolean =>
        !input2.copy && input2.key === value3,
    );
    if (index !== -1) {
      value = value2.copy ? value : index;
      continue;
    }
    let value4: Dynamic =
      value2.copy ??
      context.find(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.emoji === value3,
      );
    if (value4) {
      value += 1;
      mapped.splice(value, 0, {
        key: value4.key,
        copy: value4,
      });
    }
  }
  return mapped;
}

function filterCommentMotionRow(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filtered: Dynamic = input.row.filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) => input2.key !== options,
  );
  return filtered.length === input.row.length
    ? input
    : {
        ...input,
        row: filtered,
      };
}

function resolveCommentMotionEvery(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    input.length === options.length &&
    input.every(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): boolean =>
        input2.emoji === options[options2]?.emoji &&
        input2.count === options[options2]?.count &&
        input2.mine === options[options2]?.mine &&
        input2.tinted === options[options2]?.tinted,
    )
  );
}

function useAnimatedReactions(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  "use no memo";
  let value: Dynamic = useReducedMotion();
  let value2: Dynamic = (0, React.useContext)(CommentMotionCreateContext2);
  let [value3, value4]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => {
      let [value8, ...value9]: Dynamic = input;
      let value10: Dynamic =
        value2 !== null &&
        value8?.count === 1 &&
        value9.length === 0 &&
        (value2.current || (value8.mine && value2.answers(value8.emoji)))
          ? []
          : input;
      return {
        shown: value10,
        motions: commentMotionMap,
        row: value10.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            key: input2.emoji,
          }),
        ),
        seq: 0,
      };
    },
  );
  if (!resolveCommentMotionEvery(value3.shown, input)) {
    let value8: Dynamic = value3.seq + 1;
    let state: Dynamic = {
      motions: commentMotionMap,
      gone: [],
      resync: true,
      press: null,
    };
    let state2: Dynamic = {
      ...state,
      resync: false,
    };
    let value9: Dynamic = value
      ? state
      : isCommentMotionKey(value3.shown, input, value8);
    if (
      value2 !== null &&
      !value2.current &&
      !value9.resync &&
      (value9.press === null || !value2.answers(value9.press))
    ) {
      value9 = state2;
    }
    let entries: Dynamic = new (Map as Dynamic)(value9.motions);
    if (!value9.resync)
      for (let [value10, value11] of value3.motions as Dynamic) {
        let match: Dynamic = input.find(
          (input2?: Dynamic, ..._extraArguments: unknown[]) =>
            input2.emoji === value10,
        );
        if (!entries.has(value10) && match) {
          let match2: Dynamic = value3.shown.find(
            (input2?: Dynamic, ..._extraArguments: unknown[]) =>
              input2.emoji === value10,
          );
          entries.set(
            value10,
            value11.roll && match2?.count !== match.count
              ? {
                  ...value11,
                  roll: undefined,
                }
              : value11,
          );
        }
      }
    value4({
      shown: input,
      motions: entries,
      row: value9.resync
        ? input.map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              key: input2.emoji,
            }),
          )
        : isCommentMotionKey2(value3.row, input, value9.gone),
      seq: value8,
    });
  }
  let { motions: value5, row: value6 }: Dynamic = value3;
  let value7: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value8 = (
        input2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!value7.current.has(input2)) {
          value7.current.set(
            input2,
            setTimeout((..._extraArguments: unknown[]): undefined => {
              value7.current.delete(input2);
              context();
            }, options),
          );
        }
      };
      for (let [value9, value10] of value5 as Dynamic)
        value8(
          `${value9}:${value10.seq}`,
          resolveCommentMotionQuiet(value10),
          (..._extraArguments: unknown[]): undefined => {
            value4(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (input2.motions.get(value9)?.seq !== value10.seq)
                  return input2;
                let entries: Dynamic = new (Map as Dynamic)(input2.motions);
                entries.delete(value9);
                return {
                  ...input2,
                  motions: entries,
                };
              },
            );
          },
        );
      for (let { copy: value9 } of value6 as Dynamic)
        if (value9) {
          value8(
            value9.key,
            commentMotionValue200,
            (..._extraArguments: unknown[]): undefined => {
              value4(
                (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  filterCommentMotionRow(input2, value9.key),
              );
            },
          );
        }
    },
    [value5, value6],
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let current: Dynamic = value7.current;
    return (..._extraArguments: unknown[]): undefined => {
      for (let value8 of current.values() as Dynamic) clearTimeout(value8);
      current.clear();
    };
  }, []);
  return {
    motions: value5,
    row: value6,
    releaseCopy: (0, React.useCallback)(
      (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        value4(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            filterCommentMotionRow(input3, input2),
        );
      },
      [],
    ),
  };
}

var CommentMotionRef: Dynamic;

var CommentMotionStyles7: Dynamic;

var resolveCommentMotionBorderAccentBgAccentMutedTextAccent: Dynamic;

function CommentMotionAriaHidden(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = context?.roll;
  return (
    <jsxRuntime.Fragment>
      <span
        aria-hidden={`true`}
        className={resolveUiDesignSystemValue2(`text-body font-normal leading-none`, context?.face === `pop` && `cds-pill-pop`, context?.face === `dip` && `cds-pill-dip`)}
        key={context?.face ? `emoji${context.seq}` : `emoji`}
      >{input}</span>
      <span
        aria-hidden={`true`}
        data-cds-roll-from={value?.from}
        className={resolveUiDesignSystemValue2(`relative block tabular-nums`, value && (value.up ? `cds-pill-roll-out-up` : `cds-pill-roll-out-down`))}
        key={value ? `count${context.seq}` : `count`}
      >{<span className={resolveUiDesignSystemValue2(`inline-block`, value && (value.up ? `cds-pill-roll-in-up` : `cds-pill-roll-in-down`))}>
                {options}
              </span>}</span>
    </jsxRuntime.Fragment>
  );
}

var Reactions: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeReactionsStep1(): void {
  commentMotionMap = new (Map as Dynamic)();
  commentMotionValue250 = 250;
  commentMotionValue170 = 170;
  commentMotionValue200 = 200;
  resolveCommentMotionQuiet = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.enter === `quiet` && !input.roll
      ? commentMotionValue170
      : commentMotionValue250;
  CommentMotionRef = (0, React.forwardRef)(
    (
      { onKeyDown: input, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionStandDown(value, `pill`);
      return (
        <button ref={resolveUiOverlaysAndIconsValue4(value, options)} {...input2} onKeyDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  if (event.repeat && (event.key === `Enter` || event.key === ` `)) {
    event.preventDefault();
  }
  input?.(event);
}} />
      );
    },
  );
  CommentMotionRef.displayName = `Reactions.Pill`;
  CommentMotionStyles7 = `cds-reset inline-flex items-center gap-1 rounded-full border px-2 py-1 font-sans text-caption font-normal leading-none focus-visible:outline-hidden focus-visible:shadow-focus aria-pressed:forced-colors:outline`;
  resolveCommentMotionBorderAccentBgAccentMutedTextAccent = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input
      ? `border-accent bg-accent-muted text-accent`
      : resolveUiDesignSystemValue2(
          `border-transparent bg-neutral text-secondary`,
          options && `hover:bg-neutral-hover`,
        );
  Reactions = (0, React.forwardRef)(
    (
      { items: input, onToggle: input2, className: input3, ...input4 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { readOnly: value }: Dynamic = useCommentCardContext();
      let value2: Dynamic = (0, React.useContext)(
        UiLinksAndFoundationCreateContext3,
      );
      let value3: Dynamic = (0, React.useId)();
      let value4: Dynamic = value ? undefined : input2;
      let value5: Dynamic = (0, React.useContext)(CommentMotionCreateContext2);
      let value6: Dynamic = useTooltipGroup();
      let filtered: Dynamic = input.filter(
        (input5?: Dynamic, ..._extraArguments: unknown[]) => input5.count > 0,
      );
      let {
        motions: value7,
        row: value8,
        releaseCopy: value9,
      }: Dynamic = useAnimatedReactions(
        filtered.map(
          (input5?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            emoji: input5.emoji,
            count: input5.count,
            mine: value4 !== undefined && (input5.mine ?? false),
            tinted: input5.mine ?? false,
          }),
        ),
      );
      if (
        filtered.length === 0 &&
        !value8.some(
          (input5?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input5.copy,
        )
      )
        return null;
      let entries: Dynamic = new (Map as Dynamic)(
        filtered.map(
          (
            input5?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let value12: Dynamic =
              resolveCommentMotionBorderAccentBgAccentMutedTextAccent(
                input5.mine ?? false,
                value4 !== undefined,
              );
            let entry: Dynamic = value7.get(input5.emoji);
            let value13: Dynamic = CommentMotionAriaHidden(
              input5.emoji,
              input5.count,
              entry,
            );
            let value14: Dynamic =
              entry?.enter === `own`
                ? `cds-pill-in-own`
                : entry?.enter === `quiet`
                  ? `cds-pill-in-quiet`
                  : undefined;
            let value15: Dynamic = resolveUiLinksAndFoundationValue19(
              value2,
              `reactionCount`,
              `{emoji} reactions: {count}`,
              {
                emoji: input5.emoji,
                count: input5.count,
              },
            );
            let value16: Dynamic = value4 ? (
              <CommentMotionRef
                type={`button`}
                aria-pressed={input5.mine ?? false}
                aria-label={value15}
                aria-describedby={
                  input5.names ? `${value3}-${options2}` : undefined
                }
                onClick={(..._extraArguments: unknown[]): undefined => {
                  value5?.note(input5.emoji);
                  value4(input5.emoji);
                }}
                className={resolveUiDesignSystemValue2(
                  CommentMotionStyles7,
                  value12,
                  value14,
                )}
              >
              {value13}
              {input5.names && (
                  <span id={`${value3}-${options2}`} className={`sr-only`}>
                  {input5.names}
                </span>
                )}
            </CommentMotionRef>
            ) : (
              <span
                role={`img`}
                aria-label={
                  input5.names ? `${value15}, ${input5.names}` : value15
                }
                className={resolveUiDesignSystemValue2(
                  CommentMotionStyles7,
                  value12,
                  value14,
                )}
              >
              {value13}
            </span>
            );
            return [
              input5.emoji,
              <Tooltip content={input5.names || undefined} side={`top`} multiline={true} key={input5.emoji}>{value16}</Tooltip>,
            ];
          },
        ),
      );
      let value10: Dynamic = value8.flatMap(
        (
          { key: input5, copy: input6 }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          input6
            ? [
                renderReactJsx("span", {
  "aria-hidden": `true`,
  ...inertProps(true),
  className: resolveUiDesignSystemValue2(CommentMotionStyles7, resolveCommentMotionBorderAccentBgAccentMutedTextAccent(input6.tinted ?? false, false), `pointer-events-none cds-pill-out`),
  onAnimationEnd: (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (event.target === event.currentTarget) {
      value9(input5);
    }
  },
  children: CommentMotionAriaHidden(input6.emoji, input6.count)
}, input5),
              ]
            : entries.has(input5)
              ? [entries.get(input5)]
              : [],
      );
      let value11: Dynamic = (
        <div
          ref={options}
          data-cds={`Reactions`}
          data-cds-part={`reactions`}
          className={resolveUiDesignSystemValue2(`flex flex-wrap gap-xs`, input3)}
          {...input4}
        >{value10}</div>
      );
      return value6 ? value11 : <TooltipGroup>{value11}</TooltipGroup>;
    },
  );
  Reactions.displayName = `Reactions`;
}

export { Reactions };

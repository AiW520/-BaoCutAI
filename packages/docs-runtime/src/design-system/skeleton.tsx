/** BaoCut: skeleton from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsCreateContext,
  UiOverlaysAndIconsCreateContext2,
  UiOverlaysAndIconsCreateContext3,
  UiOverlaysAndIconsCreateContext4,
  createSafeMutationObserver,
  createSafeResizeObserver,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue9,
  resolveUiOverlaysAndIconsValue,
} from "./dependencies";
import type * as ReactComponentTypes from "react";
import { useContext, useState } from "react";

export interface SkeletonGroupProps {
  children?: ReactComponentTypes.ReactNode;
  hold?: "delayed" | { none: string };
  label?: string;
  className?: string;
  decorative?: boolean;
  onShown?: () => void;
  onHidden?: () => void;
  as?: "div" | "span";
  motion?: "wave" | "sweep" | "lockstep";
}

export interface SkeletonProps {
  width?: ReactComponentTypes.CSSProperties["width"];
  height?: ReactComponentTypes.CSSProperties["height"];
  className?: string;
  decorative?: boolean;
  as?: "div" | "span";
}

export const ShimmerContainer: ReactComponentTypes.FC<SkeletonGroupProps> = ({
  children: input,
  hold: input7 = `delayed`,
  label: input2,
  className: input3,
  decorative: input8 = false,
  onShown: input4,
  onHidden: input5,
  as: input6,
  motion: input9 = CommentMotionWave,
}) => {
  let value: Dynamic = (0, React.useContext)(UiOverlaysAndIconsCreateContext);
  let value2 = useContext(UiOverlaysAndIconsCreateContext2);
  let [value3] = useState(input6 ?? value2);
  let Value4Component: Dynamic = CommentMotionDiv[value3];
  let value5: boolean = value3 === `span`;
  let value6: Dynamic = (0, React.useContext)(UiOverlaysAndIconsCreateContext3);
  let value7: Dynamic = (0, React.useContext)(UiOverlaysAndIconsCreateContext4);
  let [value8]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value26: Dynamic = clearCommentMotionGetSnapshot();
      if (value ? value7?.getSnapshot().shown === true : input7 !== `delayed`) {
        value26.markShown();
      }
      return value26;
    },
  );
  let [value9]: Dynamic = (0, React.useState)(value6);
  let [value10, value11]: Dynamic = (0, React.useState)(false);
  let value12: Dynamic = (0, React.useRef)(false);
  let value13: Dynamic = value && !value10;
  let value14: Dynamic = (0, React.useCallback)(
    (input10?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        input10 !== null &&
        input10.parentElement !== null &&
        input10.parentElement.closest(`[data-cds="SkeletonGroup"]`) === null
      ) {
        value12.current = true;
        value8.reset();
        value11(true);
      }
    },
    [value8],
  );
  let value15: Dynamic = resolveUiLinksAndFoundationUseContext3(`loading`, `Loading`);
  let [value16]: Dynamic = (0, React.useState)(input7);
  let value17: boolean = value16 === `delayed`;
  let value18: Dynamic = input2 ?? value15;
  let value19: Dynamic = (0, React.useRef)(null);
  let value20: Dynamic = (0, React.useCallback)(
    (input10?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value19.current = input10;
    },
    [],
  );
  let value21: Dynamic = (0, React.useRef)(false);
  let value22: Dynamic = (0, React.useRef)({
    onShown: input4,
    onHidden: input5,
    labelText: value18,
  });
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      value22.current = {
        onShown: input4,
        onHidden: input5,
        labelText: value18,
      };
      if (value21.current && value19.current !== null) {
        let element: Dynamic = value19.current.querySelector(`[data-skeleton-label]`);
        if (element !== null && element.textContent !== value18) {
          element.textContent = value18;
        }
      }
    },
    [input4, input5, value18, input8],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!value13 && !value17 && !value21.current) {
        value21.current = true;
        resolveCommentMotionMarkShown(value22.current.onShown, value8);
      }
    },
    [value13, value17, value8],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value13 || value12.current || value7 === null) return;
      let value26 = (..._extraArguments: unknown[]): undefined => {
        if (value7.getSnapshot().shown) {
          if (value21.current) {
            value8.markShown();
          } else {
            value21.current = true;
            resolveCommentMotionMarkShown(value22.current.onShown, value8);
          }
        } else {
          value8.reset();
        }
      };
      value26();
      return value7.subscribe(value26);
    },
    [value13, value7, value8],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        value21.current &&= (value22.current.onHidden?.(), false);
        value8.reset();
      },
    [value8],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value19.current;
      if (current === null || value13 || !value17 || value9 === null) return;
      let value26: number = performance.now() - value9;
      if (!(!Number.isFinite(value26) || value26 <= 0)) {
        current.style.setProperty(`--cds-skel-elapsed`, `${value26}ms`);
        return (..._extraArguments: unknown[]): Dynamic =>
          resolveCommentMotionRemoveProperty(current);
      }
    },
    [value13, value17, value9],
  );
  let value23: Dynamic = (0, React.useRef)(null);
  let value24: Dynamic = (0, React.useCallback)(
    (input10?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value23.current = input10;
    },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value23.current;
      let current2: Dynamic = value19.current;
      if (input9 !== `sweep` || value13 || current === null || current2 === null) return;
      let value26: Dynamic = resolveCommentMotionStatic(current2);
      let value27 = (..._extraArguments: unknown[]): undefined => {
        let items: Dynamic = [];
        let value29: Dynamic = current2.querySelectorAll(`[data-cds="Skeleton"]`);
        resolveCommentMotionMotion(current2, value29.length === 0 ? `lockstep` : `sweep`);
        for (let value30 of value29 as Dynamic) {
          let index: number = 0;
          let index2: number = 0;
          let value31: Dynamic = value30;
          for (; value31 !== null && value31 !== current2; ) {
            index += value31.offsetLeft;
            index2 += value31.offsetTop;
            value31 = value31.offsetParent;
            if (value31 !== null && value31 !== current2) {
              index += value31.clientLeft - value31.scrollLeft;
              index2 += value31.clientTop - value31.scrollTop;
            }
          }
          if (value31 === current2) {
            items.push(
              `M${index},${index2}h${value30.offsetWidth}v${value30.offsetHeight}h${-value30.offsetWidth}Z`,
            );
          }
        }
        current.style.clipPath = items.length ? `path("${items.join(` `)}")` : ``;
        current.style.visibility = items.length ? `visible` : `hidden`;
      };
      value27();
      let value28: Dynamic = createSafeResizeObserver(
        resolveUiOverlaysAndIconsValue(current2) ?? ResizeObserver,
        value27,
      );
      value28.observe(current2);
      return (..._extraArguments: unknown[]): undefined => {
        value28.disconnect();
        if (value26) {
          current2.style.removeProperty(`position`);
        }
      };
    },
    [input9, value13],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value19.current;
      if (input9 !== `wave` || value13 || current === null) return;
      let value26 = (..._extraArguments: unknown[]): undefined => {
        let value28: Dynamic = current.querySelectorAll(`[data-cds="Skeleton"]`);
        let value29: number = Math.floor(commentMotionValue20002 / commentMotionValue90);
        let index: number = 0;
        for (let value30 of value28 as Dynamic)
          if (value30.style.getPropertyValue(`--cds-skel-i`) !== ``) {
            index += 1;
          }
        for (let value30 of value28 as Dynamic)
          if (value30.style.getPropertyValue(`--cds-skel-i`) === ``) {
            value30.style.setProperty(`--cds-skel-i`, String(index % value29));
            index += 1;
          }
        resolveCommentMotionMotion(current, value28.length === 0 ? `lockstep` : `wave`);
      };
      value26();
      let value27: Dynamic = createSafeMutationObserver(MutationObserver, value26);
      value27.observe(current, {
        childList: true,
        subtree: true,
      });
      return (..._extraArguments: unknown[]): Dynamic => value27.disconnect();
    },
    [input9, value13],
  );
  let value25: Dynamic = value5 ? resolveUiDesignSystemValue2(`block`, input3) : input3;
  return value13 ? (
    <Value4Component ref={value14} data-cds={`SkeletonGroup`} className={value25}>
      <UiOverlaysAndIconsCreateContext2.Provider value={value3}>
        <UiOverlaysAndIconsCreateContext4.Provider value={value8}>
          {input}
        </UiOverlaysAndIconsCreateContext4.Provider>
      </UiOverlaysAndIconsCreateContext2.Provider>
    </Value4Component>
  ) : (
    <Value4Component
      ref={value20}
      data-cds={`SkeletonGroup`}
      data-motion={input9}
      data-hold={value17 ? `delayed` : `none`}
      data-hold-reason={value17 ? undefined : value16.none}
      data-shown={value17 ? undefined : ``}
      role={input8 ? undefined : `status`}
      aria-hidden={input8 ? true : undefined}
      className={value25}
      onAnimationEnd={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          event.animationName === `cds-placeholder-reveal` &&
          event.target === event.currentTarget
        ) {
          event.currentTarget.style.setProperty(
            `--cds-skel-settled`,
            `${commentMotionValue100000}ms`,
          );
          event.currentTarget.setAttribute(`data-settled`, ``);
        }
      }}
      onAnimationStart={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          event.animationName === `cds-placeholder-reveal` &&
          event.target === event.currentTarget
        ) {
          event.currentTarget.setAttribute(`data-shown`, ``);
          let element: Dynamic =
            event.currentTarget.querySelector(`[data-skeleton-label]`);
          if (element !== null && element.textContent === ``) {
            element.textContent = value22.current.labelText;
          }
          if (!value21.current) {
            value21.current = true;
            resolveCommentMotionMarkShown(value22.current.onShown, value8);
          }
        } else if (
          (event.animationName === CommentMotionCdsSkeletonBreathe &&
            event.target === event.currentTarget) ||
          (event.animationName === CommentMotionCdsSkeletonSweep &&
            typeof event.target?.getAnimations == `function`)
        )
          updateCommentMotionGetAnimations(event.target, event.animationName);
        else if (
          event.animationName === CommentMotionCdsSkeletonBreathe &&
          input9 === `wave` &&
          typeof event.target?.getAnimations == `function`
        ) {
          let target: Dynamic = event.target;
          updateCommentMotionGetAnimations(
            target,
            CommentMotionCdsSkeletonBreathe,
            (Number.parseInt(target.style.getPropertyValue(`--cds-skel-i`), 10) || 0) *
              commentMotionValue90,
          );
        }
      }}
    >
      {input8 ? null : (
        <span className={`sr-only`} data-skeleton-label={true}>
          {value17 ? `` : value18}
        </span>
      )}
      {input9 === `sweep` ? (
        <Value4Component
          aria-hidden={true}
          ref={value24}
          className={`cds-skel-sweep-clip`}
          style={{
            visibility: `hidden`,
          }}
        >
          <Value4Component className={`cds-skel-sweep-band`} />
        </Value4Component>
      ) : null}
      <UiOverlaysAndIconsCreateContext.Provider value={true}>
        <UiOverlaysAndIconsCreateContext2.Provider value={value3}>
          <UiOverlaysAndIconsCreateContext4.Provider value={value8}>
            <Value4Component aria-hidden={true} className={`contents`}>
              {input}
            </Value4Component>
          </UiOverlaysAndIconsCreateContext4.Provider>
        </UiOverlaysAndIconsCreateContext2.Provider>
      </UiOverlaysAndIconsCreateContext.Provider>
    </Value4Component>
  );
};

export const SkeletonRows: ReactComponentTypes.FC<{
  rows?: number | readonly number[];
  icon?: boolean;
}> = ({
  rows: input = 3,
  icon: input2 = true,
}) => {
  let ValueComponent: "div" | "span" =
    CommentMotionDiv[useContext(UiOverlaysAndIconsCreateContext2)];
  let value2 = ValueComponent === `span` ? `block` : undefined;
  let value3 = input2 ? CommentMotionState : CommentMotionState2;
  let filtered = (typeof input == `number` ? [input] : input).filter(
    (input3, ..._extraArguments: unknown[]) => input3 > 0,
  );
  let value4 = filtered.length > 0 ? filtered : [3];
  let items: ReactComponentTypes.ReactNode[] = [];
  let index: number = 0;
  for (let [value5, value6] of value4.entries()) {
    if (value5 > 0) {
      items.push(
        <ValueComponent
          aria-hidden={true}
          data-slot={`menu-skeleton-separator`}
          className={resolveUiDesignSystemValue2(
            value2,
            `compact:mx-2 comfortable:mx-2.5 my-1 h-px bg-border`,
          )}
          key={`separator-${value5}`}
        />,
      );
    }
    for (let value7 = index + value6; index < value7; index++)
      items.push(
        <ValueComponent
          aria-hidden={index > 0 ? true : undefined}
          className={`flex h-control items-center gap-xs compact:px-2 comfortable:px-2.5`}
          key={index}
        >
          {input2 && <Skeleton width={20} height={20} />}
          {
            <span aria-hidden={input2 ? true : undefined} className={`contents`}>
              <Skeleton width={value3[index % value3.length]} height={16} />
            </span>
          }
        </ValueComponent>,
      );
  }
  return <ValueComponent className={value2}>{items}</ValueComponent>;
};

export const SkeletonLines: ReactComponentTypes.FC<{
  lines?: number;
  className?: string;
}> = ({
  lines: input2 = 8,
  className: input,
}) => {
  let ValueComponent2: "div" | "span" =
    CommentMotionDiv[useContext(UiOverlaysAndIconsCreateContext2)];
  return (
    <ValueComponent2
      className={resolveUiDesignSystemValue2(`flex flex-col gap-sm`, input)}
    >
      {Array.from(
        {
          length: input2,
        },
        (input3, options, ..._extraArguments: unknown[]) => (
          <span
            aria-hidden={options > 0 ? true : undefined}
            className={`contents`}
            key={options}
          >
            {
              <Skeleton
                width={
                  commentMotion921009658Values[
                    options % commentMotion921009658Values.length
                  ]
                }
                height={14}
              />
            }
          </span>
        ),
      )}
    </ValueComponent2>
  );
};

export const SkeletonElement: ReactComponentTypes.FC<SkeletonProps> = ({
  width: input,
  height: input2,
  className: input3,
  decorative: input5 = false,
  as: input4,
}) => {
  let value: Dynamic = (0, React.useContext)(UiOverlaysAndIconsCreateContext);
  let value2: "div" | "span" = useContext(UiOverlaysAndIconsCreateContext2);
  let Value3Component: "div" | "span" = CommentMotionDiv[input4 ?? value2];
  let value4 = Value3Component === `span` ? `block` : undefined;
  let value5: Dynamic = resolveUiLinksAndFoundationUseContext3(`loading`, `Loading`);
  return value ? (
    <Value3Component
      data-cds={`Skeleton`}
      className={resolveUiDesignSystemValue2(
        value4,
        `h-[1em] max-w-full rounded bg-[var(--cds-skeleton-base)]`,
        input3,
      )}
      style={{
        width: input,
        height: input2,
      }}
    />
  ) : (
    <Value3Component
      ref={resolveCommentMotionGetAnimations}
      data-cds={`Skeleton`}
      role={input5 ? undefined : `status`}
      aria-hidden={input5 ? true : undefined}
      className={resolveUiDesignSystemValue2(
        value4,
        `relative h-[1em] max-w-full overflow-hidden rounded bg-[var(--cds-skeleton-base)] after:absolute after:inset-0 after:animate-[cds-shimmer_2s_linear_infinite] after:bg-[linear-gradient(90deg,transparent,var(--cds-skeleton-sheen),transparent)] motion-reduce:after:hidden`,
        input3,
      )}
      style={{
        width: input,
        height: input2,
      }}
    >
      {input5 ? null : <span className={`sr-only`}>{value5}</span>}
    </Value3Component>
  );
};

export const SkeletonChip: ReactComponentTypes.FC<{
  width?: ReactComponentTypes.CSSProperties["width"];
  shape?: string;
}> = ({
  width: input = 120,
  shape: input2 = `pill`,
}) => {
  return (
    <Skeleton
      className={
        input2 === `pill`
          ? `h-control shrink-0 rounded-full`
          : `h-control shrink-0 rounded`
      }
      width={input}
    />
  );
};

export const SkeletonBlock: ReactComponentTypes.FC<{
  height?: ReactComponentTypes.CSSProperties["height"];
  className?: string;
}> = ({
  height: input,
  className: input2,
}) => {
  return <Skeleton className={input2} width={`100%`} height={input} />;
};

var CommentMotionDiv: Record<"div" | "span", "div" | "span">;

function resolveCommentMotionCdsShimmer(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input.animationName === `cds-shimmer`;
}

var commentMotionSet2: Dynamic;

var commentMotionWeakMap: Dynamic;

function updateCommentMotionStartTime(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic;
  let items: Dynamic = [];
  for (let value3 of input.getAnimations() as Dynamic) {
    if (!resolveCommentMotionCdsShimmer(value3)) continue;
    let { startTime: value4 }: Dynamic = value3;
    if (typeof value4 == `number` && (value === undefined || value4 < value)) {
      value = value4;
    }
    let value5: Dynamic = value3.effect?.target;
    if (
      value5 != null &&
      commentMotionSet2.has(value5) &&
      value3.playState === `running`
    ) {
      items.push(value3);
    }
  }
  let value2: Dynamic = value ?? commentMotionWeakMap.get(input) ?? 0;
  for (let value3 of items as Dynamic) value3.startTime = value2;
  commentMotionWeakMap.set(input, value2);
}

function resolveCommentMotionOwnerDocument(
  ..._extraArguments: unknown[]
): undefined {
  try {
    let values: Dynamic = new (Set as Dynamic)();
    for (let value of commentMotionSet2 as Dynamic)
      values.add(value.ownerDocument);
    for (let value of values as Dynamic) updateCommentMotionStartTime(value);
  } finally {
    commentMotionSet2.clear();
  }
}

function resolveCommentMotionGetAnimations(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      element === null ||
      typeof element.ownerDocument.getAnimations != `function`
    )
  ) {
    if (commentMotionSet2.size === 0) {
      queueMicrotask(resolveCommentMotionOwnerDocument);
    }
    commentMotionSet2.add(element);
  }
}

var CommentMotionShown: Dynamic;

var CommentMotionShown2: Dynamic;

function clearCommentMotionGetSnapshot(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = CommentMotionShown;
  let values: Dynamic = new (Set as Dynamic)();
  let value2 = (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (value !== input) {
      value = input;
      for (let value3 of values as Dynamic)
        resolveUiLinksAndFoundationValue9(value3);
    }
  };
  return {
    getSnapshot: (..._extraArguments: unknown[]): Dynamic => value,
    subscribe: (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      values.add(input),
      (..._extraArguments: unknown[]): undefined => {
        values.delete(input);
      }
    ),
    markShown: (..._extraArguments: unknown[]): Dynamic =>
      value2(CommentMotionShown2),
    reset: (..._extraArguments: unknown[]): Dynamic =>
      value2(CommentMotionShown),
  };
}

function resolveCommentMotionMarkShown(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    input?.();
  } finally {
    options.markShown();
  }
}

var CommentMotionCdsSkeletonBreathe: Dynamic;

var CommentMotionCdsSkeletonSweep: Dynamic;

var commentMotionValue20002: Dynamic;

var CommentMotionWave: "wave";

var commentMotionValue90: Dynamic;

var commentMotionValue100000: Dynamic;

var commentMotionValue1: Dynamic;

var commentMotionWeakMap2: Dynamic;

function resolveCommentMotionRemoveProperty(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input.style.removeProperty(`--cds-skel-elapsed`);
}

function resolveCommentMotionMotion(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input.dataset.motion = options;
}

function resolveCommentMotionStatic(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let position: string = getComputedStyle(input).position;
  return position === `static` || position === ``
    ? ((input.style.position = `relative`), true)
    : false;
}

function updateCommentMotionGetAnimations(
  element?: Dynamic,
  options: Dynamic = CommentMotionCdsSkeletonBreathe,
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof element.getAnimations != `function`) return;
  let match: Dynamic = element
    .getAnimations()
    .find(
      (input?: Dynamic, ..._extraArguments: unknown[]) =>
        input.animationName === options,
    );
  if (match === undefined || typeof match.startTime != `number`) return;
  let value: Dynamic = match.effect?.getComputedTiming();
  if (value?.duration !== commentMotionValue20002 || value.iterations !== 1 / 0)
    return;
  let value2: Dynamic = match.startTime + (value.delay ?? 0);
  let value3: number = value2 - context;
  let ownerDocument: Dynamic = element.ownerDocument;
  let entry: Dynamic = commentMotionWeakMap2.get(ownerDocument);
  if (entry === undefined) {
    commentMotionWeakMap2.set(ownerDocument, value3);
    return;
  }
  let value4: number =
    (((value3 - entry) % commentMotionValue20002) + commentMotionValue20002) %
    commentMotionValue20002;
  if (value4 < commentMotionValue1 || value4 > 1999) return;
  let value5: Dynamic =
    typeof match.currentTime == `number`
      ? match.startTime + match.currentTime
      : value2;
  let value6: number = Math.ceil(
    (Math.max(value5, value2) - (entry + context)) / commentMotionValue20002,
  );
  match.startTime =
    entry + context + value6 * commentMotionValue20002 - (value.delay ?? 0);
}

var CommentMotionState: readonly number[];

var CommentMotionState2: readonly number[];

var commentMotion921009658Values: readonly string[];

var Skeleton: typeof SkeletonElement & {
  Rows: typeof SkeletonRows;
  Chip: typeof SkeletonChip;
  Lines: typeof SkeletonLines;
  Block: typeof SkeletonBlock;
};

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSkeletonStep1(): void {
  CommentMotionDiv = {
    div: `div`,
    span: `span`,
  };
  commentMotionSet2 = new (Set as Dynamic)();
  commentMotionWeakMap = new (WeakMap as Dynamic)();
  CommentMotionShown = Object.freeze({
    shown: false,
  });
  CommentMotionShown2 = Object.freeze({
    shown: true,
  });
  CommentMotionCdsSkeletonBreathe = `cds-skeleton-breathe`;
  CommentMotionCdsSkeletonSweep = `cds-skeleton-sweep`;
  commentMotionValue20002 = 2e3;
  CommentMotionWave = `wave`;
  commentMotionValue90 = 90;
  commentMotionValue100000 = 1e5;
  commentMotionValue1 = 1;
  commentMotionWeakMap2 = new (WeakMap as Dynamic)();
  CommentMotionState = [160, 128, 144];
  CommentMotionState2 = [120, 88, 104];
  SkeletonRows.displayName = `Skeleton.Rows`;
  SkeletonChip.displayName = `Skeleton.Chip`;
  commentMotion921009658Values = [`92%`, `100%`, `96%`, `58%`];
  SkeletonLines.displayName = `Skeleton.Lines`;
  SkeletonBlock.displayName = `Skeleton.Block`;
  SkeletonElement.displayName = `Skeleton`;
  ShimmerContainer.displayName = `SkeletonGroup`;
  Skeleton = Object.assign(SkeletonElement, {
    Rows: SkeletonRows,
    Chip: SkeletonChip,
    Lines: SkeletonLines,
    Block: SkeletonBlock,
  });
}

export { Skeleton };

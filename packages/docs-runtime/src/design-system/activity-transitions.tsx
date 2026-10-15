/** BaoCut: activity transitions from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  clsx,
  resolveUiDesignSystemValue2,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./dependencies";
import { useReducedMotion } from "./presentation";
import { resolveShimmerAnimate } from "./spark";
import { collectShimmerThen } from "./activity-status";

var shimmerValue180: Dynamic;

var ShimmerJoin: Dynamic;

var ShimmerStyles7: Dynamic;

var shimmerValue40: Dynamic;

var ShimmerOpacity: Dynamic;

var ShimmerOpacity2: Dynamic;

var resolveShimmerOpacity: Dynamic;

function resolveShimmerOpacity2(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic =
    element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!value) return null;
  let value2: Dynamic = /,\s*(-?[\d.]+)\)$/.exec(value.transform)?.[1];
  return {
    opacity: value.opacity === `` ? 1 : Number(value.opacity),
    y: value2 === undefined ? 0 : Number(value2),
  };
}

function resolveShimmerFinished(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input?.playState === `finished`
    ? 1
    : input?.playState === `running`
      ? (input.effect?.getComputedTiming?.().progress ?? null)
      : null;
}

function resolveShimmerAnimate2(..._extraArguments: unknown[]): boolean {
  return (
    typeof HTMLElement !== "undefined" &&
    typeof HTMLElement.prototype.animate == `function`
  );
}

function resolveShimmerOwnerDocument(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let value: Dynamic =
    element.ownerDocument.defaultView?.getComputedStyle(element).opacity;
  return value === undefined || value === `` ? 1 : Number(value);
}

function resolveShimmerHidden(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input.style.visibility = options ? `hidden` : ``;
  input.style.width = options ? `0px` : ``;
  input.style.overflow = options ? `hidden` : ``;
}

var ShimmerMemo3: Dynamic;

function ShimmerFaceKey(
  {
    faceKey: input,
    leaving: input2,
    initialEnters: input3,
    easesBack: input4,
    onLeft: input5,
    children: input6,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
    (..._extraArguments: unknown[]): Dynamic => input5(input),
  );
  let value3: Dynamic = (0, React.useRef)(null);
  let value4: Dynamic = (0, React.useRef)(input3);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value.current;
      let current2: Dynamic = value3.current;
      value3.current = null;
      if (!current || typeof current.animate != `function`) {
        if (input2) {
          value2();
        }
        return;
      }
      if (!input2 && (current2 === null || !input4)) return;
      let value11: Dynamic =
        current2 ??
        (input2 && value4.current ? resolveShimmerOpacity2(current) : null);
      let value12: Dynamic = input2 ? ShimmerOpacity2 : ShimmerOpacity;
      let value13: Dynamic = resolveShimmerAnimate(
        current,
        value11
          ? [resolveShimmerOpacity(value11), resolveShimmerOpacity(value12)]
          : [resolveShimmerOpacity(value12)],
        {
          duration: shimmerValue180,
          easing: ShimmerJoin,
          fill: input2 ? `both` : `backwards`,
        },
      );
      let value14: Dynamic = value13?.finished;
      if (input2 && typeof value14?.then != `function`) {
        value13?.cancel?.();
        value2();
        return;
      }
      let value15: boolean = true;
      let value16 = (..._extraArguments: unknown[]): undefined => {
        value13?.finished?.then(
          (..._extraArguments: unknown[]): Dynamic =>
            value15 && input2 && value2(),
          (..._extraArguments: unknown[]): undefined => undefined,
        );
      };
      let defaultView: Dynamic = current.ownerDocument.defaultView;
      let value17: number = performance.now();
      let value18: Dynamic;
      if (value13 && defaultView) {
        value13.startTime = value17;
        value18 = defaultView.requestAnimationFrame(
          (..._extraArguments: unknown[]): undefined => {
            if (!value15) return;
            let value20: number = performance.now();
            if (value20 - value17 > shimmerValue40) {
              value13.startTime = value20;
            }
            value16();
          },
        );
      } else {
        value16();
      }
      let value19: Dynamic = value11 ?? ShimmerOpacity;
      return (..._extraArguments: unknown[]): undefined => {
        value15 = false;
        if (value18 !== undefined) {
          defaultView?.cancelAnimationFrame(value18);
        }
        let value20: Dynamic = resolveShimmerFinished(value13);
        if (value20 !== null) {
          value3.current = {
            opacity:
              value19.opacity + (value12.opacity - value19.opacity) * value20,
            y: value19.y + (value12.y - value19.y) * value20,
          };
        }
        value13?.cancel?.();
      };
    },
    [input2, input4, value2],
  );
  let [value5, value6]: Dynamic = (0, React.useState)(input3);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      value4.current = value5;
    },
    [value5],
  );
  let [value7, value8]: Dynamic = (0, React.useState)(0);
  let [value9, value10]: Dynamic = (0, React.useState)(input2);
  if (value9 !== input2) {
    value10(input2);
    if (!input2) {
      value8(value7 + 1);
    }
  }
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value.current;
      if (!(!value5 || !current))
        return collectShimmerThen(
          current,
          (..._extraArguments: unknown[]): Dynamic => value6(false),
        );
    },
    [value5],
  );
  return (
    <span
      ref={value}
      data-morph-key={input}
      aria-hidden={input2 ? true : undefined}
      className={clsx(
        `col-start-1 row-start-1 flex min-w-0 max-w-full items-center group-data-[gliding]/morph:max-w-none`,
        value5 && value7 === 0 && ShimmerStyles7,
      )}
    >
      <ShimmerMemo3 frozen={input2} key={value7}>{input6}</ShimmerMemo3>
    </span>
  );
}

function ShimmerSwapKey(
  {
    swapKey: input,
    id: input2,
    attrs: input3,
    className: input4,
    children: input5,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = useReducedMotion();
  let value2: Dynamic = (0, React.useRef)(null);
  let [value3, value4]: Dynamic = (0, React.useState)(input);
  let [value5, value6]: Dynamic = (0, React.useState)(false);
  let [value7, value8]: Dynamic = (0, React.useState)([]);
  if (value3 !== input) {
    value4(input);
    value6(true);
    value8(
      value || !resolveShimmerAnimate2()
        ? []
        : [
            ...value7.filter(
              (input6?: Dynamic, ..._extraArguments: unknown[]): boolean =>
                input6 !== input && input6 !== value3,
            ),
            value3,
          ].slice(-2),
    );
  }
  let value9: Dynamic = (0, React.useCallback)(
    (input6?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value8(
        (input7?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input7.includes(input6)
            ? input7.filter(
                (input8?: Dynamic, ..._extraArguments: unknown[]) =>
                  input8 !== input6,
              )
            : input7,
      );
    },
    [],
  );
  let value10: Dynamic = (0, React.useRef)(null);
  let value11: Dynamic = (0, React.useRef)(input);
  let value12: Dynamic = (0, React.useRef)(null);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (value11.current !== input) {
        value12.current = value11.current;
        value11.current = input;
      }
      let current: Dynamic = value2.current;
      if (!current) return;
      let value13: Dynamic;
      let value14: Dynamic;
      let items: Dynamic = [];
      for (let value22 of Array.from<Dynamic>(current.children) as Dynamic)
        if (value22.dataset.morphKey === input) {
          resolveShimmerHidden(value22, false);
          value13 = value22;
        } else {
          items.push(value22);
          if (value22.dataset.morphKey === value12.current || !value14) {
            value14 = value22;
          }
        }
      let value15: Dynamic = value14?.getBoundingClientRect().width ?? 0;
      let value16: Dynamic = value14;
      for (let value22 of items as Dynamic)
        if (
          value16 !== undefined &&
          resolveShimmerOwnerDocument(value22) >
            resolveShimmerOwnerDocument(value16)
        ) {
          value16 = value22;
        }
      let value17: boolean =
        !value &&
        !!value13 &&
        !!value14 &&
        typeof current.animate == `function`;
      let current2: Dynamic = value10.current;
      let value18: Dynamic =
        value17 && current2 ? current.getBoundingClientRect().width : value15;
      let index: number = 0;
      if (value17 && value13) {
        current2?.release();
        index = value13.getBoundingClientRect().width;
      }
      for (let value22 of items as Dynamic)
        resolveShimmerHidden(value22, value22 !== value16);
      if (!value17 || !value13 || !value14 || Math.abs(value18 - index) < 0.5)
        return;
      let value19: Dynamic = resolveShimmerAnimate(
        current,
        [
          {
            width: `${value18}px`,
          },
          {
            width: `${index}px`,
          },
        ],
        {
          duration: shimmerValue180,
          easing: ShimmerJoin,
          fill: index < value18 ? `forwards` : `none`,
        },
      );
      if (!value19) return;
      let value20: Dynamic = value19;
      let dataset: Dynamic = current.dataset;
      dataset.gliding = ``;
      let morphKey: Dynamic = value14.dataset.morphKey;
      function value21(..._extraArguments: unknown[]): undefined {
        value20.cancel();
        delete dataset.gliding;
        if (value10.current?.release === value21) {
          value10.current = null;
        }
      }
      if (morphKey === undefined) {
        if (index < value18) {
          value20.cancel();
          delete dataset.gliding;
        }
        return;
      }
      value10.current = {
        owner: morphKey,
        release: value21,
      };
    },
    [input, value],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value10.current;
      if (current && !value7.includes(current.owner)) {
        current.release();
      }
    },
    [value7],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        value10.current?.release(),
    [],
  );
  return (
    <span
      {...input3}
      id={input2}
      ref={value2}
      className={resolveUiDesignSystemValue2(`group/morph inline-grid min-w-0 items-center justify-items-start data-[gliding]:overflow-x-clip`, input4)}
    >{[...value7.filter((input6?: Dynamic, ..._extraArguments: unknown[]) => input6 !== input), input].map((input6?: Dynamic, ..._extraArguments: unknown[]): Dynamic => <ShimmerFaceKey
      faceKey={input6}
      leaving={input6 !== input}
      initialEnters={value5 && !value}
      easesBack={!value}
      onLeft={value9}
      key={input6}
    >{input6 === input ? input5 : null}</ShimmerFaceKey>)}</span>
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeActivityTransitionsStep1(): void {
  shimmerValue180 = 180;
  ShimmerJoin = `cubic-bezier(${[0.2, 0, 0, 1].join(`,`)})`;
  ShimmerStyles7 = `motion-safe:animate-[cds-morph-in_0.18s_cubic-bezier(.2,0,0,1)]`;
  shimmerValue40 = 40;
  ShimmerOpacity = {
    opacity: 1,
    y: 0,
  };
  ShimmerOpacity2 = {
    opacity: 0,
    y: -3,
  };
  resolveShimmerOpacity = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    opacity: input.opacity,
    transform: `translateY(${input.y}px)`,
  });
  ShimmerMemo3 = (0, React.memo)(
    function (
      { children: input }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return input;
    },
    (
      input?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => options.frozen,
  );
}

export { ShimmerSwapKey };

/** BaoCut: spark from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  originalJsxProps,
  preloadModule,
  resolvePlatformLoadingAndStatusResolve,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue6,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./dependencies";
import { isReducedMotion, useReducedMotion } from "./presentation";
import { AvatarsMemo, AvatarsMessage2 } from "./avatars";

function resolveShimmerAnimate(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return input.animate(options, context);
  } catch {
    return;
  }
}

function resolveShimmerValue3(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveShimmerAnimate(input, options, context);
  if (typeof value?.finished?.then == `function`) return value;
  resolveShimmerValue4(value);
}

function resolveShimmerValue4(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input?.cancel?.();
}

var shimmerState: Dynamic;

var shimmerState2: Dynamic;

function resolveShimmerValue5(..._extraArguments: unknown[]): Dynamic {
  return shimmerState;
}

function resolveShimmerCdsSparkSprites(..._extraArguments: unknown[]): Dynamic {
  return shimmerState
    ? Promise.resolve(shimmerState)
    : ((shimmerState2 ??= resolvePlatformLoadingAndStatusResolve(
        `cds_spark_sprites`,
        (..._extraArguments: unknown[]): Dynamic =>
          preloadModule(
            (..._extraArguments: unknown[]): Dynamic => import("./animations"),
            [],
            import.meta.url,
          ),
      )
        .then(
          (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            (shimmerState = input?.animations),
            shimmerState
          ),
        )
        .catch((..._extraArguments: unknown[]): undefined => undefined)),
      shimmerState2);
}

var shimmerSet4: Dynamic;

var ShimmerState: Dynamic;

var ShimmerMemo: Dynamic;

var ShimmerState2: Dynamic;

var ShimmerMemo2: Dynamic;

function resolveShimmerValue6(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return input != null && typeof input != `boolean`;
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSparkStep1(): void {
  shimmerSet4 = new (Set as Dynamic)([`entrance`, `exit`, `tickle`]);
  ShimmerState = (
    {
      size: input4 = 32,
      state: input,
      color: input5 = AvatarsMessage2,
      className: input2,
      onEnd: input3,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = (0, React.useRef)(null);
    let value2: Dynamic = shimmerSet4.has(input) ? input : null;
    let value3: boolean = value2 !== null;
    let value4: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(
      (..._extraArguments: unknown[]): Dynamic => input3?.(),
    );
    let [value5, value6]: Dynamic = (0, React.useState)(
      (..._extraArguments: unknown[]): Dynamic =>
        resolveShimmerValue5() ?? null,
    );
    let value7: Dynamic = useReducedMotion();
    let [value8, value9]: Dynamic = (0, React.useState)(false);
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): Dynamic => {
        if (value7 || value5 || isReducedMotion()) return;
        let value16: boolean = true;
        resolveShimmerCdsSparkSprites().then(
          (input6?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (value16) {
              value6(input6 ?? `failed`);
            }
          },
        );
        return (..._extraArguments: unknown[]): undefined => {
          value16 = false;
        };
      },
      [value7, value5],
    );
    let value10: Dynamic =
      !value7 && !value8 && value5 && value5 !== `failed`
        ? value5[input]
        : null;
    let value11: Dynamic = value7 || value5 === `failed` || value8;
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (value2 && value11) {
          value4();
        }
      },
      [value2, value11, value4],
    );
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): Dynamic => {
        let current: Dynamic = value.current;
        if (!value10 || !current || typeof current.animate != `function`)
          return;
        let { frameCount: value16, speed: value17 }: Dynamic = value10;
        let value18: Dynamic = resolveShimmerAnimate(
          current,
          Array.from<Dynamic, Dynamic>(
            {
              length: value16,
            },
            (
              input6?: unknown,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              transform: `translateY(-${(100 / value16) * options}%)`,
            }),
          ),
          {
            duration: value17 * value16,
            iterations: value3 ? 1 : 1 / 0,
            easing: `steps(${value16}, jump-none)`,
            fill: `forwards`,
          },
        );
        if (!value18) {
          value9(true);
          return;
        }
        if (value3) {
          value18.addEventListener(`finish`, value4);
        }
        return (..._extraArguments: unknown[]): Dynamic => value18.cancel();
      },
      [value10, input, value3, value4],
    );
    if (!value10)
      return <AvatarsMemo size={input4} color={input5} className={input2} />;
    let { svg: value12, width: value13, height: value14 }: Dynamic = value10;
    let value15: Dynamic =
      typeof input4 == `number`
        ? {
            width: resolveUiOverlaysAndIconsValue6(input4),
            height: resolveUiOverlaysAndIconsValue6(
              (value14 / value13) * input4,
            ),
          }
        : {
            width: input4,
            aspectRatio: value13 / value14,
          };
    return (
      <span
        data-cds={`Spark`}
        aria-hidden={true}
        className={resolveUiDesignSystemValue2(
          `relative inline-block overflow-hidden select-none`,
          `[@media(max-resolution:1.99dppx)]:[clip-path:inset(1px_0)]`,
          input2,
        )}
        style={{
          ...value15,
          color: input5,
        }}
      >
      <span
          ref={value}
          data-cds-spark-strip={``}
          className={`absolute inset-x-0 top-0 block [&>svg]:block [&>svg]:w-full [&>svg]:fill-current`}
          dangerouslySetInnerHTML={{
            __html: value12,
          }}
        />
    </span>
    );
  };
  ShimmerState.displayName = `SparkAnimated`;
  ShimmerMemo = (0, React.memo)(ShimmerState);
  ShimmerState2 = (
    { state: input, onEnd: input2, className: input3, ...input4 }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic =
      typeof input4.size == `string`
        ? input3
        : resolveUiDesignSystemValue2(`shrink-0`, input3);
    return input === undefined || input === `idle` ? (
      <AvatarsMemo
        {...originalJsxProps({
          ...input4,
          className: value,
        })}
      />
    ) : (
      <ShimmerMemo
        {...originalJsxProps({
          state: input,
          onEnd: input2,
          ...input4,
          className: value,
        })}
      />
    );
  };
  ShimmerState2.displayName = `Spark`;
  ShimmerMemo2 = (0, React.memo)(ShimmerState2);
}

export {
  ShimmerMemo2,
  resolveShimmerAnimate,
  resolveShimmerValue3,
  resolveShimmerValue4,
  resolveShimmerValue6,
};

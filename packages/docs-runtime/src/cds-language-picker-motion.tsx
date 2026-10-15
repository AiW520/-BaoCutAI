/** BaoCut: language picker motion from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import { resolveUiDesignSystemValue2 } from "./cds-dependencies";
import { isReducedMotion } from "./cds-presentation";

function Dots(
  { className: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <span
      data-cds={`Dots`}
      className={resolveUiDesignSystemValue2(
        `inline-flex size-[calc(1rem*var(--cds-rem-scale,1))] items-center justify-center gap-[calc(0.125rem*var(--cds-rem-scale,1))] px-[calc(0.125rem*var(--cds-rem-scale,1))] leading-none`,
        input,
      )}
      aria-hidden={true}
    >
      <span className={`cds-dot`} />
      <span className={`cds-dot`} />
      <span className={`cds-dot`} />
    </span>
  );
}

var resolveLanguagePickerValue: (..._extraArguments: unknown[]) => undefined;

function resolveLanguagePickerCorrection(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  { correction: value = false }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (context === null || context.width <= 0) {
    let value9: Dynamic = resolveLanguagePickerGetAnimations(input);
    return (..._extraArguments: unknown[]): undefined => {
      resolveLanguagePickerCancel(value9);
      input.style.visibility = ``;
      input.style.willChange = ``;
      delete input.dataset.flipAt;
    };
  }
  let value2: Dynamic = `${context.left},${context.width}`;
  let flipAt: Dynamic = input.dataset.flipAt;
  if (flipAt === value2) return resolveLanguagePickerValue;
  let bounds: Dynamic = input.getBoundingClientRect();
  let left: Dynamic = options.getBoundingClientRect().left;
  let value3: Dynamic = getComputedStyle(input);
  let value4: Dynamic = resolveLanguagePickerTrim(value3, `--cds-dur-base`);
  let value5: Dynamic =
    value3.getPropertyValue(`--cds-ease-snap`).trim() || `linear`;
  let value6: Dynamic = resolveLanguagePickerTest(value3);
  let value7: Dynamic = value && !resolveLanguagePickerRunning(input);
  let value8: Dynamic = resolveLanguagePickerGetAnimations(input);
  return (..._extraArguments: unknown[]): undefined => {
    resolveLanguagePickerCancel(value8);
    input.dataset.flipAt = value2;
    input.style.width = `${context.width}px`;
    input.style.transform = `translateX(${context.left}px)`;
    input.style.visibility = `inherit`;
    if (!value6) {
      input.style.willChange = ``;
    }
    if (
      !(
        flipAt === undefined ||
        !resolveLanguagePickerAnimate(input) ||
        isReducedMotion()
      ) &&
      !value7
    )
      try {
        input.animate(
          {
            transform: [
              `translateX(${bounds.left - left}px) scaleX(${bounds.width / context.width})`,
              `translateX(${context.left}px) scaleX(1)`,
            ],
          },
          {
            duration: value4,
            easing: value5,
          },
        );
        if (value4 > 0) {
          resolveLanguagePickerTransform(input, value6);
        }
      } catch {}
  };
}

function resolveLanguagePickerTrim(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.getPropertyValue(options).trim();
  let value2: Dynamic = value.endsWith(`ms`)
    ? 1
    : value.endsWith(`s`)
      ? 1e3
      : 0;
  return Math.max(0, parseFloat(value) * value2) || 0;
}

function resolveLanguagePickerAnimate(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof input.animate == `function` &&
    typeof input.getAnimations == `function`
  );
}

function resolveLanguagePickerTest(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return /^rgba\(|\//.test(input.backgroundColor);
}

function resolveLanguagePickerTransform(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input.style.willChange = options ? `transform` : ``;
}

function resolveLanguagePickerRunning(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveLanguagePickerAnimate(input) &&
    input
      .getAnimations()
      .some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.playState === `running`,
      )
  );
}

function resolveLanguagePickerGetAnimations(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveLanguagePickerAnimate(input) ? input.getAnimations() : [];
}

function resolveLanguagePickerCancel(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let value of input as Dynamic) value.cancel();
}

function resolveLanguagePickerFlipAt(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input.dataset.flipAt !== undefined;
}

var LanguagePickerHeld: Dynamic;

var languagePickerValue1000: Dynamic;

var languagePickerWeakMap: Dynamic;

function updateLanguagePickerTransform(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !Number.isFinite(options) ||
    !resolveLanguagePickerFlipAt(input) ||
    !resolveLanguagePickerAnimate(input)
  )
    return;
  let entry: Dynamic = languagePickerWeakMap.get(input);
  if (entry?.playState !== `paused`) {
    let value: Dynamic = context();
    if (
      value.length < 2 ||
      value.some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) => input2.width <= 0,
      )
    )
      return;
    let value2: Dynamic = parseFloat(input.style.width);
    let value3: Dynamic = resolveLanguagePickerTest(getComputedStyle(input));
    entry = input.animate(
      value.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          transform: `translateX(${input2.left}px) scaleX(${input2.width / value2})`,
        }),
      ),
      {
        duration: (value.length - 1) * languagePickerValue1000,
        fill: `both`,
      },
    );
    entry.pause();
    resolveLanguagePickerTransform(input, value3);
    languagePickerWeakMap.set(input, entry);
    input.dataset.flipAt = LanguagePickerHeld;
  }
  entry.currentTime = options * languagePickerValue1000;
}

function resolveLanguagePickerFlipAt2(
  input?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input.dataset.flipAt === LanguagePickerHeld;
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeLanguagePickerMotionStep1(): void {
  resolveLanguagePickerValue = (..._extraArguments: unknown[]): undefined =>
    undefined;
  LanguagePickerHeld = `held`;
  languagePickerValue1000 = 1e3;
  languagePickerWeakMap = new (WeakMap as Dynamic)();
}

export {
  Dots,
  resolveLanguagePickerCorrection,
  resolveLanguagePickerFlipAt,
  resolveLanguagePickerFlipAt2,
  updateLanguagePickerTransform,
};

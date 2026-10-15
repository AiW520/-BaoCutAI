/** BaoCut: badge from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsCustomIcon,
  clsx,
  mergeProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue9,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersUseContext2,
} from "./dependencies";

var CommentsNeutral: Dynamic;

var CommentsNeutral2: Dynamic;

var CommentsRed: Dynamic;

var CommentsRed2: Dynamic;

function resolveCommentsHasOwn(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return Object.hasOwn(CommentsNeutral, input);
}

var CommentsState: Dynamic;

var CommentsStyles10: Dynamic;

var CommentsComfortable: Dynamic;

var Badge: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeBadgeStep1(): void {
  CommentsNeutral = {
    neutral: `bg-neutral text-secondary`,
    accent: `bg-tint-blue text-accent`,
    success: `bg-tint-green text-tint-green`,
    warning: `bg-tint-yellow text-warning`,
    danger: `bg-tint-red text-danger`,
    pro: `bg-tint-violet text-pro`,
  };
  CommentsNeutral2 = {
    neutral: `bg-gray-700 dark:bg-gray-550 text-gray-0`,
    accent: `bg-blue-500 text-gray-0`,
    success: `bg-green-500 text-gray-0`,
    warning: `bg-yellow-500 text-gray-0`,
    danger: `bg-red-450 text-gray-0`,
    pro: `bg-violet-450 text-gray-0`,
  };
  CommentsRed = {
    red: `bg-red-450 text-gray-0`,
    orange: `bg-orange-450 text-gray-0`,
    yellow: `bg-yellow-500 text-gray-0`,
    green: `bg-green-500 text-gray-0`,
    aqua: `bg-aqua-500 text-gray-0`,
    blue: `bg-blue-500 text-gray-0`,
    violet: `bg-violet-450 text-gray-0`,
    magenta: `bg-magenta-450 text-gray-0`,
  };
  CommentsRed2 = {
    red: `bg-tint-red text-tint-red`,
    orange: `bg-tint-orange text-tint-orange`,
    yellow: `bg-tint-yellow text-tint-yellow`,
    green: `bg-tint-green text-tint-green`,
    aqua: `bg-tint-aqua text-tint-aqua`,
    blue: `bg-tint-blue text-tint-blue`,
    violet: `bg-tint-violet text-tint-violet`,
    magenta: `bg-tint-magenta text-tint-magenta`,
  };
  CommentsState = {
    xs: `ml-[calc((var(--cds-h-control-nested)-calc(0.75rem*var(--cds-rem-scale,1)))/2-var(--cds-pad-sm)+1px)] mr-[-0.8px] shrink-0`,
    sm: `ml-[calc((var(--cds-h-control-nested)-calc(1rem*var(--cds-rem-scale,1)))/2-var(--cds-pad-sm)+1px)] mr-[-0.8px] shrink-0`,
    md: `ml-[calc((var(--cds-h-control-nested)-calc(1.25rem*var(--cds-rem-scale,1)))/2-var(--cds-pad-sm)+1px)] mr-[-0.8px] shrink-0`,
  };
  CommentsStyles10 = `leading-[calc(0.75rem*var(--cds-rem-scale,1))] py-[0.125em] -my-[0.125em]`;
  CommentsComfortable = {
    comfortable: {
      lg: `md`,
      base: `sm`,
      sm: `sm`,
      xs: `xs`,
      xxs: `xs`,
    },
    compact: {
      lg: `sm`,
      base: `xs`,
      sm: `xs`,
      xs: `xs`,
      xxs: `xs`,
    },
  };
  Badge = (0, React.forwardRef)(
    (
      {
        variant: input,
        icon: input2,
        iconOnly: input12 = false,
        onRemove: input3,
        removeLabel: input4,
        removeRender: input5,
        bold: input6,
        size: input7,
        truncate: input8,
        className: input9,
        children: input10,
        ...input11
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = input ?? `accent`;
      let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `removeItem`,
        `Remove {item}`,
        {
          item: typeof input10 == `string` ? input10 : `item`,
        },
      );
      let value3: Dynamic = resolveUiProviderAndLayersUseContext2();
      let value4: Dynamic = CommentsComfortable[value3][input7 ?? `base`];
      let length: Dynamic = React.Children.toArray(input10).length;
      let value5: Dynamic =
        !input12 && (length > 0 || input3 !== undefined || input5 !== undefined)
          ? CommentsState[value4]
          : `shrink-0`;
      let value6: Dynamic =
        (input7 === `xxs`
          ? 1
          : resolveUiProviderAndLayersBase(value3, input7)) === 1
          ? CommentsStyles10
          : `pb-[0.05em]`;
      let value7: Dynamic = input4 || value2;
      let value8: Dynamic = clsx(
        `cds-reset relative inline-flex shrink-0 items-center justify-center`,
        `before:absolute before:left-[-2px] before:top-1/2 before:-translate-y-1/2 before:content-['']`,
        `before:h-[max(24px,100%)] before:w-[max(24px,calc(100%+2px))]`,
        `size-[max(calc(var(--cds-h-control-nested)-calc(0.375rem*var(--cds-rem-scale,1))),calc(0.75rem*var(--cds-rem-scale,1)))]`,
        `rounded-[calc(var(--cds-h-control-nested)/4-min(calc(0.1875rem*var(--cds-rem-scale,1)),(var(--cds-h-control-nested)-calc(0.75rem*var(--cds-rem-scale,1)))/2))]`,
        `-ml-0.5 mr-[calc(min(calc(0.1875rem*var(--cds-rem-scale,1)),(var(--cds-h-control-nested)-calc(0.75rem*var(--cds-rem-scale,1)))/2)-var(--cds-pad-sm))]`,
        `text-current outline-none focus-visible:outline-hidden`,
        `[--cds-badge-x-wght:577.8] hover:[--cds-badge-x-wght:700]`,
        `transition-[color,background-color,box-shadow,--cds-badge-x-wght]`,
        input6 === true
          ? `hover:bg-[color-mix(in_srgb,currentColor_20%,transparent)]`
          : `hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]`,
        `focus-visible:shadow-focus`,
      );
      let { className: value9, ...value10 }: Dynamic = Object.fromEntries(
        Object.entries(input5?.props ?? {}).filter(
          ([, input13]: Dynamic, ..._extraArguments: unknown[]) =>
            input13 !== undefined,
        ),
      );
      let value11: Dynamic = (
        <UiOverlaysAndIconsCustomIcon
          name={`X`}
          size={`xs`}
          style={{
            fontVariationSettings: `'opsz' 12, 'wght' var(--cds-badge-x-wght, 577.8)`,
          }}
        />
      );
      let value12: Dynamic =
        input5 === undefined
          ? input3 !== undefined && (
              <button
                type={`button`}
                aria-label={value7}
                onClick={(
                  input13?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  input13.stopPropagation();
                  input3();
                }}
                onKeyDown={(
                  input13?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (input13.key === `Enter` || input13.key === ` `) {
                    input13.stopPropagation();
                  }
                }}
                onKeyUp={(
                  input13?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (input13.key === `Enter` || input13.key === ` `) {
                    input13.stopPropagation();
                  }
                }}
                className={value8}
              >
              {value11}
            </button>
            )
          : (0, React.cloneElement)(
              input5,
              mergeProps(
                {
                  className: resolveUiDesignSystemValue2(value8, value9),
                  "aria-label": value7,
                  children: value11,
                },
                value10,
              ),
            );
      let value13: Dynamic = resolveCommentsHasOwn(value);
      let value14: Dynamic =
        input6 === true
          ? value13
            ? CommentsNeutral2[value]
            : CommentsRed[value]
          : value13
            ? CommentsNeutral[value]
            : CommentsRed2[value];
      return (
        <span ref={options} data-cds={`Badge`} role={input12 ? `img` : undefined} {...input7 === `xxs` ? {
  "data-step": `1`
} : resolveUiProviderAndLayersDataSize(input7)} {...input11} className={resolveUiDesignSystemValue2(`inline-flex items-center gap-1 align-middle h-control-nested whitespace-nowrap rounded-chip`, input12 ? `aspect-square w-control-nested justify-center px-0` : `px-sm`, `font-sans text-caption font-medium leading-[round(1.25em,1px)]`, input8 ? `min-w-0` : `shrink-0`, value14, input9)}>{typeof input2 != `number` && input2 && (resolveUiOverlaysAndIconsValue9(input2) ? <UiOverlaysAndIconsCustomIcon name={input2} size={value4} className={value5} /> : <span aria-hidden={true} className={resolveUiDesignSystemValue2(`inline-flex`, value5)}>
                  {input2}
                </span>)}{input8 ? <span className={resolveUiDesignSystemValue2(value6, `min-w-0 overflow-x-clip text-ellipsis whitespace-nowrap`)}>
                {input10}
              </span> : length === 1 ? <span className={value6}>{input10}</span> : input10}{value12}</span>
      );
    },
  );
  Badge.displayName = `Badge`;
}

export { Badge };

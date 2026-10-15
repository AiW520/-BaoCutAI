/** BaoCut: avatars from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  Tooltip,
  TooltipGroup,
  appTImport2,
  loadReactDom,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue6,
  resolveUiProviderAndLayersUseContext7,
  toModuleNamespace,
} from "./cds-dependencies";
import {
  PresentationCreateContext,
  resolvePresentationUseContext,
} from "./cds-presentation";

var AvatarsState: Dynamic;

var AvatarsMessage: Dynamic;

var AvatarsMessage2: Dynamic;

var AvatarsStyles: Dynamic;

var AvatarsColor: Dynamic;

var AvatarsMemo: Dynamic;

var AvatarsVariants: Dynamic;

function avatarInitials(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let parts: Dynamic = input.trim().split(/\s+/);
  let value: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (input2 ? ([...input2][0] ?? ``) : ``);
  return (
    (
      value(parts[0]) +
      (context === 2 && parts.length > 1 ? value(parts[parts.length - 1]) : ``)
    ).toLocaleUpperCase(options) || `?`
  );
}

var Avatar: Dynamic;

var avatarStackOverlapClasses: Dynamic;

var avatarSizeClasses: Dynamic;

var avatarsValue4: Dynamic;

var AvatarsStyles2: Dynamic;

function resolveAvatarsMarginInlineStart(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    marginInlineStart: options
      ? undefined
      : `calc(-1 * var(--cds-stack-overlap))`,
    zIndex: input,
  };
}

function resolveAvatarsIsValidElement(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(0, React.isValidElement)(input)) return;
  let value: Dynamic = input;
  if (typeof value.props.name == `string`) return value.props.name;
  let children: Dynamic = value.props.children;
  if ((0, React.isValidElement)(children)) {
    let name: Dynamic = children.props.name;
    if (typeof name == `string`) return name;
  }
}

var AvatarGroup: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeAvatarsStep1(): void {
  AvatarsState = toModuleNamespace(loadReactDom());
  AvatarsMessage = `m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z`;
  AvatarsMessage2 = `var(--cds-clay, #d97757)`;
  AvatarsStyles = `h-[var(--cds-spark-size)] w-[var(--cds-spark-size)]`;
  AvatarsColor = (
    {
      size: input2 = 32,
      color: input3 = AvatarsMessage2,
      className: input,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = typeof input2 == `number`;
    return (
      <svg
        data-cds={`Spark`}
        xmlns={`http://www.w3.org/2000/svg`}
        viewBox={`0 0 100 100`}
        width={input2}
        height={input2}
        className={
          value ? resolveUiDesignSystemValue2(AvatarsStyles, input) : input
        }
        style={
          value
            ? {
                "--cds-spark-size": resolveUiOverlaysAndIconsValue6(input2),
              }
            : undefined
        }
        fill={input3}
        aria-hidden={true}
      >
      <path d={AvatarsMessage} />
    </svg>
    );
  };
  AvatarsColor.displayName = `StaticSpark`;
  AvatarsMemo = (0, React.memo)(AvatarsColor);
  AvatarsVariants = appTImport2(
    `inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-sans font-medium leading-none`,
    {
      variants: {
        size: {
          xs: `size-[var(--cds-avatar-xs)] text-[length:var(--cds-avatar-text-xs)]`,
          sm: `size-[var(--cds-avatar-sm)] text-[calc(0.5625rem*var(--cds-rem-scale,1))]`,
          md: `size-[var(--cds-avatar-md)] text-footnote`,
          lg: `size-[var(--cds-avatar-lg)] text-body`,
        },
        variant: {
          default: `bg-fill-control text-primary`,
          pro: `bg-fill-pro text-on-pro`,
          claude: `bg-fill-brand text-on-brand`,
        },
      },
      defaultVariants: {
        size: `md`,
        variant: `default`,
      },
    },
  );
  Avatar = (0, React.forwardRef)(
    (
      {
        src: input,
        name: input2,
        size: input3,
        variant: input4,
        className: input5,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolvePresentationUseContext();
      if (value) {
        input3 = value.size;
      }
      let value2: Dynamic = resolveUiProviderAndLayersUseContext7();
      let [value3, value4]: Dynamic = (0, React.useState)(false);
      let [value5, value6]: Dynamic = (0, React.useState)(input);
      if (value5 !== input) {
        value6(input);
        value4(false);
      }
      let value7: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          avatarInitials(input2, value2, input3 === `xs` ? 1 : 2),
        [input2, value2, input3],
      );
      let value8: Dynamic = !!input && !value3;
      return (
        <span
          {...originalJsxProps({
            ref: options,
            "data-cds": `Avatar`,
            ...input6,
            className: resolveUiDesignSystemValue2(
              AvatarsVariants({
                size: input3,
                variant: input4,
              }),
              input5,
            ),
            role: value8 ? undefined : `img`,
            "aria-label": value8 ? undefined : input2,
            children: value8 ? (
              <img
                src={input}
                alt={input2}
                className={`size-full object-cover`}
                draggable={false}
                onError={(..._extraArguments: unknown[]): Dynamic =>
                  value4(true)
                }
              />
            ) : input4 === `claude` ? (
              <AvatarsMemo size={`60%`} color={`currentColor`} />
            ) : (
              value7
            ),
          })}
        />
      );
    },
  );
  Avatar.displayName = `Avatar`;
  avatarStackOverlapClasses = {
    xs: `[--cds-stack-overlap:calc(var(--cds-avatar-xs)*0.25)]`,
    sm: `[--cds-stack-overlap:calc(var(--cds-avatar-sm)*0.25)]`,
    md: `[--cds-stack-overlap:calc(var(--cds-avatar-md)*0.25)]`,
    lg: `[--cds-stack-overlap:calc(var(--cds-avatar-lg)*0.25)]`,
  };
  avatarSizeClasses = {
    xs: `h-[var(--cds-avatar-xs)] min-w-[var(--cds-avatar-xs)] px-1 text-[length:var(--cds-avatar-text-xs)]`,
    sm: `h-[var(--cds-avatar-sm)] min-w-[var(--cds-avatar-sm)] px-1.5 text-[calc(0.5625rem*var(--cds-rem-scale,1))]`,
    md: `h-[var(--cds-avatar-md)] min-w-[var(--cds-avatar-md)] px-2 text-footnote`,
    lg: `h-[var(--cds-avatar-lg)] min-w-[var(--cds-avatar-lg)] px-3 text-body`,
  };
  avatarsValue4 = 4;
  AvatarsStyles2 = `relative inline-flex rounded-full bg-[var(--cds-page-bg)] [box-shadow:0_0_0_2px_var(--cds-page-bg)]`;
  AvatarGroup = (0, React.forwardRef)(
    (
      {
        children: input,
        max: input6 = 5,
        total: input2,
        size: input7 = `md`,
        surplusTooltip: input8 = true,
        noun: input3,
        "aria-label": input4,
        className: input5,
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = React.Children.toArray(input);
      let value2: Dynamic = input2 ?? value.length;
      let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `avatarGroup`,
        `{count} {noun}`,
        {
          count: value2,
          noun: input3 ?? ``,
        },
      );
      let value4: Dynamic = input4 ?? value3;
      let value5: Dynamic = Math.max(0, Math.min(input6, value.length));
      let slice: Dynamic = value.slice(0, value5);
      let slice2: Dynamic = value.slice(value5);
      let value6: Dynamic = Math.max(0, value2 - value5);
      let slice3: Dynamic = slice2
        .map(resolveAvatarsIsValidElement)
        .filter(
          (input9?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            !!input9 && input9.length > 0,
        )
        .slice(0, avatarsValue4);
      let value7: Dynamic = value6 - slice3.length;
      let value8: Dynamic =
        slice3.length > 0
          ? slice3.join(`, `) +
            (value7 > 0
              ? `, and ${value7} other${value7 === 1 ? `` : `s`}`
              : ``)
          : undefined;
      let value9: Dynamic = input8 ? value8 : undefined;
      let value10: Dynamic =
        resolveUiLinksAndFoundationUseContext3(
          `overflowCount`,
          `and {count} more`,
          {
            count: value6,
          },
        ) + (value8 ? `: ${value8}` : ``);
      let value11: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic => ({
          size: input7,
        }),
        [input7],
      );
      let value12: Dynamic = slice.length + +(value6 > 0);
      return (
        <div
          ref={options}
          data-cds={`AvatarStack`}
          role={`group`}
          aria-label={value4}
          className={resolveUiDesignSystemValue2(
            `isolate inline-flex shrink-0 items-center`,
            avatarStackOverlapClasses[input7],
            input5,
          )}
        >
        <PresentationCreateContext.Provider value={value11}>
          <TooltipGroup>
            {slice.map(
                (
                  input9?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  <span
                    {...originalJsxProps(
                      {
                        "data-stack-item": true,
                        className: AvatarsStyles2,
                        style: resolveAvatarsMarginInlineStart(
                          value12 - 1 - options2,
                          options2 === 0,
                        ),
                        children: input9,
                      },
                      (0, React.isValidElement)(input9)
                        ? (input9.key ?? options2)
                        : options2,
                    )}
                  />
                ),
              )}
            {value6 > 0 && (
                <Tooltip content={value9}>
                <span
                    data-stack-item={true}
                    data-surplus={true}
                    className={AvatarsStyles2}
                    style={resolveAvatarsMarginInlineStart(
                      0,
                      slice.length === 0,
                    )}
                  >
                  <span
                      role={`img`}
                      aria-label={value10}
                      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full bg-fill-control font-sans font-medium leading-none text-secondary ${avatarSizeClasses[input7]}`}
                    >{`+${value6}`}</span>
                </span>
              </Tooltip>
              )}
          </TooltipGroup>
        </PresentationCreateContext.Provider>
      </div>
      );
    },
  );
  AvatarGroup.displayName = `AvatarStack`;
}

export { Avatar, AvatarGroup, AvatarsMemo, AvatarsMessage2, AvatarsState };

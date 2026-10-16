/** BaoCut: link from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseButton,
  React,
  UiOverlaysAndIconsCreateContext6,
  UiOverlaysAndIconsCustomIcon,
  clsx,
  useRender,
  isUiLinksAndFoundationToLowerCase,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationItContainsAControlCharacter,
  resolveUiLinksAndFoundationNoreferrer,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationValue3,
  resolveUiOverlaysAndIconsValue9,
  uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues,
} from "./dependencies";
import type * as ReactComponentTypes from "react";

export const BadgeAndLinkStamp: ReactComponentTypes.FC<Dynamic> = ({
  stamp: input,
  forwardedRef: input2,
  linkInput: input3,
  render: input4,
  body: input5,
  className: input6,
  actionClassName: input7,
  actionDisabled: input8,
  rest: input9,
}) => {
  let value: Dynamic = (0, React.isValidElement)(input4);
  let value2: Dynamic = resolveUiLinksAndFoundationHref({
    ...input3,
    ...resolveUiLinksAndFoundationValue3(input9),
    href: value ? undefined : input3.href,
  });
  let value3: Dynamic = useRender({
    enabled: value,
    render: input4,
    ref: input2,
    props: {
      ...resolveBadgeAndLinkKeys(input9, [
        ...badgeAndLinkHrefRouterOptionsTargetRelValues,
        `disabled`,
      ]),
      ...input,
      className: input6,
      children: input5,
    },
  });
  if (value) return value3;
  if (input3.href !== undefined) {
    let value5: Dynamic = resolveBadgeAndLinkKeys(input9, [
      ...badgeAndLinkHrefRouterOptionsTargetRelValues,
      ...uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues,
    ]);
    return (
      <a ref={input2} {...input} {...value5} {...value2} className={input6}>
        {input5}
      </a>
    );
  }
  let value4: Dynamic = resolveBadgeAndLinkKeys(input9, [`href`, `disabled`]);
  return (
    <BaseButton
      render={<span {...input} />}
      nativeButton={false}
      {...(input8 === undefined
        ? {}
        : {
            disabled: input8,
          })}
      ref={input2}
      {...value4}
      className={input7}
    >
      {input5}
    </BaseButton>
  );
};

export const BadgeAndLinkHidden: ReactComponentTypes.FC<Dynamic> = ({ id: input }) => {
  return (
    <span id={input} hidden={true} className={`sr-only`}>
      {resolveUiLinksAndFoundationUseContext3(`opensInNewTab`, `(opens in new tab)`)}
    </span>
  );
};

export const BadgeAndLinkFontSize: ReactComponentTypes.FC<Dynamic> = (input) => {
  return resolveUiOverlaysAndIconsValue9(input) ? (
    <UiOverlaysAndIconsCustomIcon
      name={input}
      size={`sm`}
      className={`self-center`}
      style={{
        fontSize: `1lh`,
      }}
    />
  ) : (
    <span className={`self-center`}>{input}</span>
  );
};

var badgeAndLinkHrefRouterOptionsTargetRelValues: Dynamic;

function resolveBadgeAndLinkKeys(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input;
  let state: Dynamic = {};
  for (let value2 of Object.keys(value) as Dynamic)
    if (!options.includes(value2)) {
      state[value2] = value[value2];
    }
  return state;
}

var BadgeAndLinkCdsResetCdsTextLink: Dynamic;

var BadgeAndLinkCdsTextLinkUnderline: Dynamic;

var BadgeAndLinkState: Dynamic;

var BadgeAndLinkStyles: Dynamic;

var BadgeAndLinkStyles2: Dynamic;

var BadgeAndLinkState2: Dynamic;

var BadgeAndLinkState3: Dynamic;

var Link: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeLinkStep1(): void {
  badgeAndLinkHrefRouterOptionsTargetRelValues = [
    `href`,
    `routerOptions`,
    `target`,
    `rel`,
    `download`,
  ];
  BadgeAndLinkCdsResetCdsTextLink = `cds-reset cds-text-link`;
  BadgeAndLinkCdsTextLinkUnderline = `cds-text-link-underline`;
  BadgeAndLinkState = `${BadgeAndLinkCdsResetCdsTextLink} ${BadgeAndLinkCdsTextLinkUnderline} inline`;
  BadgeAndLinkStyles = `text-inherit [transition-property:text-decoration-color,box-shadow]`;
  BadgeAndLinkStyles2 = `[transition-property:text-decoration-color]`;
  BadgeAndLinkState2 = `${BadgeAndLinkCdsResetCdsTextLink} inline-flex items-baseline`;
  BadgeAndLinkState3 = BadgeAndLinkCdsTextLinkUnderline;
  Link = (0, React.forwardRef)(
    (
      {
        className: input,
        children: input2,
        icon: input3,
        iconPosition: input8 = `end`,
        external: input4,
        inheritColor: input5,
        render: input6,
        "aria-describedby": input7,
        ...event
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: boolean = `href` in event && event.href !== undefined;
      let value2: Dynamic = (0, React.useContext)(
        UiOverlaysAndIconsCreateContext6,
      );
      let value3: Dynamic = input5 ?? value2;
      let value4: Dynamic =
        input4 &&
        !(
          value &&
          !(0, React.isValidElement)(input6) &&
          resolveUiLinksAndFoundationValue(
            event.href,
            resolveUiLinksAndFoundationItContainsAControlCharacter(event.href),
          )
        )
          ? input4
          : false;
      let value5: Dynamic = value
        ? (event.target ?? (value4 ? `_blank` : undefined))
        : undefined;
      let value6: Dynamic = value
        ? (event.rel ??
          (value4 &&
          value5 !== undefined &&
          !isUiLinksAndFoundationToLowerCase(value5)
            ? resolveUiLinksAndFoundationNoreferrer(event.href, value5)
            : undefined))
        : undefined;
      let value7: Dynamic = (0, React.useId)();
      let value8: Dynamic = <BadgeAndLinkHidden id={value7} />;
      let value9: Dynamic =
        input3 || (value4 === `with-icon` ? `ArrowUpRight` : undefined);
      let value10: boolean = !!value9;
      let value11: string = `${resolveUiDesignSystemValue2(value10 ? clsx(BadgeAndLinkState2, input3 ? `gap-[0.25em]` : `gap-0`) : BadgeAndLinkState, value3 && BadgeAndLinkStyles)}`;
      let value12: Dynamic = value10 ? (
        <jsxRuntime.Fragment>
        {input8 === `start` && BadgeAndLinkFontSize(value9)}
        <span
            className={clsx(
              BadgeAndLinkState3,
              value3 && BadgeAndLinkStyles2,
            )}
          >
          {input2}
        </span>
        {input8 === `end` && BadgeAndLinkFontSize(value9)}
        {value4 && value8}
      </jsxRuntime.Fragment>
      ) : value4 ? (
        <jsxRuntime.Fragment>
        {input2}
        {value8}
      </jsxRuntime.Fragment>
      ) : (
        input2
      );
      let value13: Dynamic = resolveUiDesignSystemValue2(
        value11,
        `cursor-pointer`,
        input,
      );
      let value14: Dynamic = event.disabled ?? false;
      return (
        <BadgeAndLinkStamp
          stamp={{
            "data-cds": `TextLink`,
          }}
          forwardedRef={options}
          linkInput={{
            href: value ? event.href : undefined,
            routerOptions: value ? event.routerOptions : undefined,
            target: value5,
            rel: value6,
            download: value ? event.download : undefined,
          }}
          render={input6}
          body={value12}
          className={value13}
          actionClassName={resolveUiDesignSystemValue2(
            value11,
            value14 ? `cursor-default opacity-disabled` : `cursor-pointer`,
            input,
          )}
          actionDisabled={value14}
          rest={{
            ...event,
            ...(value3 && {
              "data-inherit-color": ``,
            }),
            "aria-describedby":
              [input7, value4 ? value7 : undefined].filter(Boolean).join(` `) ||
              undefined,
          }}
        />
      );
    },
  );
  Link.displayName = `TextLink`;
}

export { Link };

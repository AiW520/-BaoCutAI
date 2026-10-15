/** BaoCut: alert from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  Button,
  React,
  UiOverlaysAndIconsCustomIcon,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersUseContext2,
} from "./dependencies";
import { Collapsible } from "./collapsible";
import {
  CommentsRoundedComposer,
  isCommentsIsValidElement,
} from "./counter";

var BadgeAndLinkGlyph: Dynamic;

var BadgeAndLinkGlyph2: Dynamic;

var BadgeAndLinkGlyph3: Dynamic;

var BadgeAndLinkGlyph4: Dynamic;

var BadgeAndLinkComfortable: Dynamic;

var badgeAndLinkValue64: Dynamic;

var BadgeAndLinkNeutral: Dynamic;

var BadgeAndLinkNeutral2: Dynamic;

var BadgeAndLinkNeutral3: Dynamic;

function Alert(
  {
    variant: input,
    icon: input2,
    action: input3,
    actionAlign: input14 = `first-line`,
    details: input4,
    defaultDetailsOpen: input15 = false,
    detailsOpen: input5,
    onDetailsOpenChange: input6,
    onDismiss: input7,
    dismissLabel: input8,
    role: input9,
    composerCalibration: input10,
    className: input11,
    "data-testid": input12,
    children: input13,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `dismiss`,
    `Dismiss`,
  );
  let value2: Dynamic = input8 ?? value;
  let value3: Dynamic = resolveUiProviderAndLayersUseContext2();
  let state: Dynamic = {
    "data-step": resolveUiProviderAndLayersBase(
      value3,
      BadgeAndLinkComfortable[value3],
    ),
  };
  let value4: Dynamic = input ?? `neutral`;
  let value5: Dynamic =
    input10 === true ? `glyph` : input10 === false ? undefined : input10;
  let value6: boolean = value5 !== undefined;
  let value7: boolean = input2 != null && typeof input2 != `boolean`;
  let value8: Dynamic = isCommentsIsValidElement(input2);
  let value9: boolean = input4 != null && typeof input4 != `boolean`;
  let value10: Dynamic = input9 ?? (value9 ? `none` : `status`);
  let [value11, value12]: Dynamic = (0, React.useState)(input15);
  let [value13, value14]: Dynamic = (0, React.useState)(false);
  let value15: Dynamic = (0, React.useRef)(null);
  let value16: Dynamic = (0, React.useRef)(null);
  let value17: Dynamic = (0, React.useRef)(null);
  let value18: Dynamic = (0, React.useRef)(0);
  let value19: boolean = input3 != null && typeof input3 != `boolean`;
  let value20: Dynamic =
    !value9 && (value8 || (input14 === `center` && !value6));
  let value21: Dynamic = value20;
  let value22: Dynamic = !value9 && value19;
  let value23: Dynamic = value22 && value13;
  let value24: Dynamic = value6 && value23 && !value20;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value6 || !value22 || value21) {
        value18.current = 0;
      }
      if (!value22) return;
      let current: Dynamic = value15.current;
      let value29: Dynamic = resolveUiOverlaysAndIconsValue(current);
      if (current === null || value29 === undefined) return;
      let value30 = (..._extraArguments: unknown[]): undefined => {
        if (value24) {
          if (current.offsetWidth > value18.current + badgeAndLinkValue64) {
            value14(false);
          }
          return;
        }
        let current3: Dynamic = value16.current;
        let current4: Dynamic = value17.current;
        if (current3 === null || current4 === null) return;
        let value32: number = Number.parseFloat(
          getComputedStyle(current3).lineHeight,
        );
        if (!Number.isFinite(value32) || value32 <= 0) return;
        let top: Dynamic = current4.getBoundingClientRect().top;
        let bounds: Dynamic = current3.getBoundingClientRect();
        if (value21 && bounds.height === 0) return;
        let value33: boolean = value21
          ? top >= bounds.bottom - 1
          : top - bounds.top > value32 / 2;
        if (value33 && value6 && !value21) {
          value18.current = current.offsetWidth;
        }
        value14(value33);
      };
      value30();
      let value31: Dynamic = new (value29 as Dynamic)(value30);
      value31.observe(current);
      let current2: Dynamic = value16.current;
      if (value21 && current2 !== null) {
        value31.observe(current2);
      }
      return (..._extraArguments: unknown[]): Dynamic => value31.disconnect();
    },
    [value22, value6, value24, value21],
  );
  let value25: Dynamic = input5 ?? value11;
  let value26 = (
    input16?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    value12(input16);
    input6?.(input16);
  };
  let value27: Dynamic = value9 || !value8;
  let value28: Dynamic = input3 ? (
    <span
      {...originalJsxProps({
        ref: value17,
        ...state,
        className: resolveUiDesignSystemValue2(
          `flex shrink-0 items-center gap-xs`,
          !value23 && `h-[1lh]`,
          value24 && `basis-full`,
          !value23 && `-ms-[2px]`,
          value24 && value5 && BadgeAndLinkGlyph2[value5],
          value5 !== undefined && !input7 && BadgeAndLinkGlyph4[value5],
          !value6 && !input7 && `-me-[calc(var(--cds-pad-md)-2px)]`,
        ),
        children: input3,
      })}
    />
  ) : null;
  return (
    <div
      data-cds={`Banner`}
      data-icon-layout={value27 ? `first-line` : `centered`}
      data-cta-layout={value24 ? `stacked` : value23 ? `wrapped` : `inline`}
      data-action-align={value20 ? `center` : `first-line`}
      data-composer-keyline={value5}
      data-testid={input12}
      role={value10 === `none` ? undefined : value10}
      ref={value15}
      className={resolveUiDesignSystemValue2(
        `flex`,
        value27 ? `items-start` : `items-center`,
        `gap-xs py-md font-sans text-body font-normal`,
        value6 ? `px-md` : `px-lg`,
        value23 && !value24 && `pb-lg`,
        value6 ? CommentsRoundedComposer : `rounded-card`,
        BadgeAndLinkNeutral[value4],
        input11,
      )}
    >
      {input2 !== null && !value24 && (
        <span
          className={resolveUiDesignSystemValue2(
            value27 ? `flex min-h-[1lh] shrink-0 items-center` : `shrink-0`,
            BadgeAndLinkNeutral2[value4],
            value6 && `ms-[4px] -me-[4px]`,
          )}
        >
          {value7 ? (
            input2
          ) : (
            <UiOverlaysAndIconsCustomIcon
              name={BadgeAndLinkNeutral3[value4]}
              size={`auto`}
            />
          )}
        </span>
      )}
      {value9 ? (
        <div
          className={resolveUiDesignSystemValue2(
            `flex min-w-0 flex-1 flex-col`,
            value5 && BadgeAndLinkGlyph[value5],
          )}
        >
          <Collapsible.Root
            className={`contents`}
            open={value25}
            onOpenChange={value26}
          >
            <div
              className={`flex min-w-0 flex-wrap items-start gap-y-sm gap-x-md`}
            >
              <Collapsible.Trigger
                render={
                  <button
                    type={`button`}
                    className={`cds-reset flex min-w-0 grow select-none items-center gap-x-[2px] border-0 text-start outline-none focus-visible:shadow-focus focus-visible:outline-hidden rounded transition-shadow duration-fast`}
                  >
                    <div className={`min-w-0`}>{input13}</div>
                    <UiOverlaysAndIconsCustomIcon
                      name={`CaretDown`}
                      size={`sm`}
                      className={`shrink-0 text-secondary transition-transform ${value25 ? `rotate-0` : `-rotate-90 rtl:rotate-90`}`}
                    />
                  </button>
                }
              />
              {value28}
            </div>
            <Collapsible.Panel className={`w-full text-secondary`}>
              <div className={`pt-[var(--cds-gap-sm)]`}>{input4}</div>
            </Collapsible.Panel>
          </Collapsible.Root>
        </div>
      ) : (
        <div
          className={resolveUiDesignSystemValue2(
            `flex min-w-0 flex-wrap`,
            value20 ? `items-center` : `items-start`,
            `gap-y-sm gap-x-md flex-1`,
            value24 && `gap-y-xs`,
            value5 && BadgeAndLinkGlyph[value5],
          )}
        >
          <div
            ref={value16}
            className={
              value20
                ? value6 && value8
                  ? `min-w-[min(40ch,100%)] flex-1`
                  : `min-w-[min(20ch,100%)] flex-1`
                : `max-w-full min-w-0 flex-auto`
            }
          >
            {input13}
          </div>
          {value28}
        </div>
      )}
      {input7 && (
        <span
          {...originalJsxProps({
            ...state,
            className: `${value5 === undefined ? `-me-[calc(var(--cds-pad-md)-2px)]` : BadgeAndLinkGlyph3[value5]} flex h-[1lh] shrink-0 items-center`,
            children: (
              <Button
                variant={`ghost`}
                iconOnly={true}
                icon={`X`}
                aria-label={value2}
                tooltip={false}
                onClick={input7}
              />
            ),
          })}
        />
      )}
    </div>
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeAlertStep1(): void {
  BadgeAndLinkGlyph = {
    glyph: `ml-[6px] compact:ml-[6px] comfortable:ml-[4px]`,
    text: `ml-[4px] compact:ml-[4px] comfortable:ml-[2px]`,
  };
  BadgeAndLinkGlyph2 = {
    glyph: `-ml-[6px] compact:-ml-[6px] comfortable:-ml-[4px]`,
    text: `-ml-[4px] compact:-ml-[4px] comfortable:-ml-[2px]`,
  };
  BadgeAndLinkGlyph.glyph;
  BadgeAndLinkGlyph3 = {
    glyph: `-mr-[4px]`,
    text: `-mr-[2px] compact:-mr-[2px] comfortable:-mr-[4px]`,
  };
  BadgeAndLinkGlyph3.glyph;
  BadgeAndLinkGlyph4 = {
    glyph: `me-[calc(8px-var(--cds-pad-md))] compact:me-[calc(8px-var(--cds-pad-md))] comfortable:me-[calc(4px-var(--cds-pad-md))]`,
    text: `me-[calc(6px-var(--cds-pad-md))] compact:me-[calc(6px-var(--cds-pad-md))] comfortable:me-[calc(5px-var(--cds-pad-md))]`,
  };
  BadgeAndLinkGlyph4.glyph;
  BadgeAndLinkComfortable = {
    comfortable: `sm`,
    compact: `base`,
  };
  badgeAndLinkValue64 = 64;
  BadgeAndLinkNeutral = {
    neutral: `bg-surface-1 text-primary shadow-card-ring [--cds-prose-code-color:var(--cds-text-danger)] [--cds-prose-marker-color:var(--cds-text-secondary)]`,
    warning: `bg-warning text-warning shadow-ring-warning [--cds-prose-code-color:currentColor] [--cds-prose-marker-color:currentColor]`,
    danger: `bg-danger text-danger shadow-ring-danger [--cds-prose-code-color:currentColor] [--cds-prose-marker-color:currentColor]`,
  };
  BadgeAndLinkNeutral2 = {
    neutral: `text-secondary`,
    warning: ``,
    danger: ``,
  };
  BadgeAndLinkNeutral3 = {
    neutral: `Info`,
    warning: `Warning`,
    danger: `Warning`,
  };
}

export { Alert };

/** BaoCut: tables from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsCustomIcon,
  clsx,
  isUiLinksAndFoundationToLowerCase,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationItContainsAControlCharacter,
  resolveUiOverlaysAndIconsValue2,
  resolveUiOverlaysAndIconsValue4,
} from "./dependencies";
import { BadgeAndLinkHidden } from "./link";
import type * as ReactComponentTypes from "react";

export const TablesLink: ReactComponentTypes.FC<Dynamic> = ({
  Link: InputComponent,
  linkOptions: input2,
  "aria-current": input3,
  ...input4
}) => {
  let value: Dynamic = input4[`aria-hidden`]
    ? {
        ...input4,
        onMouseDown: resolveTablesPreventDefault,
      }
    : input4;
  if (InputComponent) {
    let { href: value2, ...value3 }: Dynamic = value;
    return (
      <InputComponent
        href={resolveUiLinksAndFoundationItContainsAControlCharacter(value2) ?? value2}
        {...value3}
      />
    );
  }
  return <TablesHref linkOptions={input2} aria-current={input3} {...value} />;
};

export const TablesHref: ReactComponentTypes.FC<Dynamic> = ({
  href: input,
  linkOptions: input2,
  ...input3
}) => {
  let value: Dynamic = resolveUiLinksAndFoundationHref({
    ...input2,
    href: input,
  });
  let value2: Dynamic = (0, React.useId)();
  let value3: boolean =
    isUiLinksAndFoundationToLowerCase(value.target) && !input3[`aria-hidden`];
  return (
    <jsxRuntime.Fragment>
      <a {...input3} {...value} aria-describedby={value3 ? value2 : undefined} />
      {value3 && <BadgeAndLinkHidden id={value2} />}
    </jsxRuntime.Fragment>
  );
};

function resolveTablesPreventDefault(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  event.preventDefault();
}

var TablesZ10: Dynamic;

var TablesStyles: Dynamic;

var Table: Dynamic;

var TableHead: Dynamic;

var TableBody: Dynamic;

var TablesStyles2: Dynamic;

var TablesH7BoxContentPxMdPySm: Dynamic;

var TablesGroupCdsrow: Dynamic;

var TablesStyles3: Dynamic;

var TablesStyles4: Dynamic;

var TablesStyles5: Dynamic;

var TableRow: Dynamic;

var TablesHref2: Dynamic;

var TablesHoverable: Dynamic;

var TablesCreateContext: Dynamic;

var TablesHControlTruncatePxMdTextFootnoteFontMediumTextSecondary: Dynamic;

var TableHeaderCell: Dynamic;

var TablesSortDirection: Dynamic;

var TableCell: Dynamic;

var TablesStyles6: Dynamic;

var TablesRef: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeTablesStep1(): void {
  TablesZ10 = `z-10`;
  TablesStyles = `cds-reset absolute inset-0 z-[1] cursor-[inherit]`;
  Table = (0, React.forwardRef)(
    (
      {
        className: input,
        fixed: input3 = false,
        flush: input4 = true,
        ...input2
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (
        <table
          data-cds={`Table`}
          ref={options}
          className={resolveUiDesignSystemValue2(`w-full border-separate border-spacing-0 whitespace-nowrap font-sans text-body font-normal text-primary`, input3 ? `table-fixed` : `table-auto`, input)}
          {...input2}
        />
      );
      return input4 ? (
        <div
          style={{
            "--cds-outset-x": `var(--cds-pad-md)`,
          }}
          className={`mx-outset w-stretch`}
        >
        {value}
      </div>
      ) : (
        value
      );
    },
  );
  Table.displayName = `Table`;
  TableHead = (0, React.forwardRef)(
    (
      { className: input, stickyHeader: input3 = false, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useRef)(null);
      (0, React.useRef)(false);
      (0, React.useRef)(false);
      (0, React.useEffect)(
        (..._extraArguments: unknown[]): undefined => {},
        [input3],
      );
      return (
        <thead
          ref={resolveUiOverlaysAndIconsValue4(value, options)}
          className={resolveUiDesignSystemValue2(`text-left`, input3 && `[&_th]:sticky [&_th]:top-(--cds-sticky-header-top,0px) [&_th]:z-20 [&_th]:bg-(--cds-sticky-header-bg,var(--cds-scroll-fade-strip-color,var(--cds-surface-1))) [&_tr]:transform-none`, input3 && `[&_th]:border-b [&_th]:border-alpha-1 [&+tbody>tr:first-child>td]:border-t-0 [&:has(+tbody>tr[data-hoverable]:first-child:hover)_th]:border-b-transparent`, input)}
          {...input2}
        />
      );
    },
  );
  TableHead.displayName = `TableHead`;
  TableBody = (0, React.forwardRef)(
    (
      { className: input, includeBorder: input3 = `both`, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <tbody
        ref={options}
        className={resolveUiDesignSystemValue2((input3 === `trailing` || input3 === `none`) && `[&>tr:first-child>td]:border-t-0`, (input3 === `leading` || input3 === `none`) && `[&>tr:last-child>td]:border-b-0`, input)}
        {...input2}
      />
    ),
  );
  TableBody.displayName = `TableBody`;
  TablesStyles2 = `relative [transform:translate(0,0)] text-body font-normal text-primary`;
  TablesH7BoxContentPxMdPySm = `h-7 box-content px-md py-sm`;
  TablesGroupCdsrow = `group/cdsrow`;
  TablesStyles3 = `[cursor:var(--cds-cursor-interactive)]`;
  TablesStyles4 = `border-b border-alpha-1 [tr:first-child_&]:border-t [thead_&]:border-b-0 [tr[data-selected=true]_&]:border-transparent [tr:has(+tr[data-selected=true])_&]:border-b-transparent [tr[data-active=true]_&]:border-transparent [tr:has(+tr[data-active=true])_&]:border-b-transparent group-hover/cdsrow:border-transparent [tr:has(+tr[data-hoverable]:hover)_&]:border-b-transparent`;
  TablesStyles5 = `bg-clip-padding group-hover/cdsrow:first:rounded-l group-hover/cdsrow:last:rounded-r [tr[data-selected=true]_&]:first:rounded-l [tr[data-selected=true]_&]:last:rounded-r [tr[data-active=true]_&]:first:rounded-l [tr[data-active=true]_&]:last:rounded-r group-hover/cdsrow:bg-fill-ghost-hover [tr[data-selected=true]_&]:bg-fill-ghost-hover [tr[data-active=true]_&]:bg-alpha-2`;
  TableRow = (0, React.forwardRef)(
    (
      {
        className: input,
        hoverable: input4 = true,
        clickable: input2,
        ...input3
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = input2 ?? input3.onClick !== undefined;
      return (
        <tr
          ref={options}
          data-hoverable={input4 ? `` : undefined}
          data-clickable={value ? `` : undefined}
          className={resolveUiDesignSystemValue2(TablesStyles2, input4 && TablesGroupCdsrow, value && TablesStyles3, input)}
          {...input3}
          onMouseDown={value ? resolveUiOverlaysAndIconsValue2(input3.onMouseDown) : input3.onMouseDown}
        />
      );
    },
  );
  TableRow.displayName = `TableRow`;
  TablesHref2 = (0, React.forwardRef)(
    (
      {
        className: input,
        href: input2,
        routerOptions: input3,
        target: input4,
        rel: input5,
        download: input6,
        linkComponent: input7,
        hoverable: input10 = true,
        children: input8,
        ...input9
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { "aria-current": value }: Dynamic = input9;
      let value2: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic => ({
          href: input2,
          linkOptions: {
            routerOptions: input3,
            target: input4,
            rel: input5,
            download: input6,
          },
          Link: input7,
          ariaCurrent: value,
        }),
        [input2, input3, input4, input5, input6, input7, value],
      );
      return (
        <tr
          ref={options}
          data-hoverable={input10 ? `` : undefined}
          data-clickable={``}
          className={resolveUiDesignSystemValue2(TablesStyles2, input10 && TablesGroupCdsrow, TablesStyles3, input)}
          {...input9}
          onMouseDown={resolveUiOverlaysAndIconsValue2(input9.onMouseDown)}
        >{<TablesCreateContext.Provider value={value2}>
              {input8}
            </TablesCreateContext.Provider>}</tr>
      );
    },
  );
  TablesHref2.displayName = `TableRowLink`;
  TablesHoverable = (0, React.forwardRef)(
    (
      {
        className: input,
        onActivate: input2,
        hoverable: input5 = true,
        children: input3,
        ...input4
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { "aria-current": value }: Dynamic = input4;
      let value2: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic => ({
          onActivate: input2,
          ariaCurrent: value,
        }),
        [input2, value],
      );
      return (
        <tr
          ref={options}
          data-hoverable={input5 ? `` : undefined}
          data-clickable={``}
          className={resolveUiDesignSystemValue2(TablesStyles2, input5 && TablesGroupCdsrow, `cursor-[var(--cds-cursor-interactive)]`, input)}
          {...input4}
          onClick={input2}
          onMouseDown={resolveUiOverlaysAndIconsValue2(input4.onMouseDown)}
        >{<TablesCreateContext.Provider value={value2}>
              {input3}
            </TablesCreateContext.Provider>}</tr>
      );
    },
  );
  TablesHoverable.displayName = `TableRowButton`;
  TablesCreateContext = (0, React.createContext)(null);
  TablesHControlTruncatePxMdTextFootnoteFontMediumTextSecondary = `h-control truncate px-md text-footnote font-medium text-secondary`;
  TableHeaderCell = (0, React.forwardRef)(
    (
      { className: input, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <th
        ref={options}
        scope={`col`}
        className={resolveUiDesignSystemValue2(TablesHControlTruncatePxMdTextFootnoteFontMediumTextSecondary, input)}
        {...input2}
      />
    ),
  );
  TableHeaderCell.displayName = `TableHeader`;
  TablesSortDirection = (0, React.forwardRef)(
    (
      {
        className: input,
        sortDirection: input2,
        firstSortDir: input3,
        onClick: input4,
        align: input7 = `start`,
        children: input5,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let [value, value2]: Dynamic = (0, React.useState)(false);
      let value3: Dynamic = (
        <UiOverlaysAndIconsCustomIcon
          name={
            input2
              ? input2 === `asc`
                ? `CaretUp`
                : `CaretDown`
              : input3 === `desc`
                ? `CaretDown`
                : `CaretUp`
          }
          size={`sm`}
          className={
            input2
              ? `shrink-0`
              : value
                ? `shrink-0 text-transparent`
                : `shrink-0 text-transparent group-hover/cdsth:text-disabled`
          }
        />
      );
      return (
        <th
          ref={options}
          scope={`col`}
          aria-sort={input2 === `asc` ? `ascending` : input2 === `desc` ? `descending` : `none`}
          className={resolveUiDesignSystemValue2(`h-control text-footnote font-medium text-secondary`, input)}
          {...input6}
        >{<button type={`button`} onClick={(input8?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    value2(true);
    input4?.(input8);
  }} onMouseLeave={(..._extraArguments: unknown[]): Dynamic => value2(false)} className={clsx(`cds-reset group/cdsth flex h-full w-full select-none items-center gap-1 rounded px-md outline-none focus-visible:outline-hidden hover:text-primary focus-visible:shadow-focus`, input7 === `end` ? `justify-end text-right` : `text-left`)}>
              {input7 === `end` && value3}
              <span className={`min-w-0 truncate py-[0.125em] -my-[0.125em]`}>
                {input5}
              </span>
              {input7 !== `end` && value3}
            </button>}</th>
      );
    },
  );
  TablesSortDirection.displayName = `TableHeaderSortable`;
  TableCell = (0, React.forwardRef)(
    (
      {
        className: input,
        interactive: input2,
        isLinkCell: input3,
        linkLabel: input4,
        contained: input5,
        linkOverlayCopy: input6,
        children: input7,
        ...input8
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useContext)(TablesCreateContext);
      let value2: Dynamic = (0, React.useId)();
      let value3: Dynamic = resolveUiDesignSystemValue2(
        TablesH7BoxContentPxMdPySm,
        TablesStyles4,
        TablesStyles5,
        input5 && `overflow-hidden`,
        input,
      );
      if (input3 && value) {
        let {
          href: value5,
          linkOptions: value6,
          Link: value7,
          ariaCurrent: value8,
        }: Dynamic = value;
        if (value5 !== undefined) {
          let value9: string =
            TablesStyles +
            ` rounded outline-none focus-visible:outline-hidden focus-visible:shadow-focus`;
          let value10: Dynamic = input4
            ? {
                "aria-label": input4,
              }
            : {
                "aria-labelledby": value2,
              };
          return (
            <td ref={options} className={value3} {...input8}>{<TablesLink href={value5} linkOptions={value6} Link={value7} {...value10} aria-current={value8} className={value9} />}{<span id={value2} className={`contents`}>
                  {input7}
                </span>}</td>
          );
        }
        return (
          <td ref={options} className={value3} {...input8}>{<button type={`button`} {...input4 ? {
    "aria-label": input4
  } : {
    "aria-labelledby": value2
  }} aria-current={value8} className={`cds-reset pointer-events-none absolute inset-0 rounded outline-none focus-visible:outline-hidden focus-visible:shadow-focus`} />}{<span id={value2} className={`contents`}>
                {input7}
              </span>}</td>
        );
      }
      let value4: Dynamic = input2 ? (
        <span
          className={clsx(
            `relative inline-flex max-w-full align-middle`,
            value && TablesZ10,
          )}
          onClick={(input9?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input9.stopPropagation()
          }
          onMouseDown={(
            input9?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (input9.detail > 1 && input9.button === 0) {
              input9.stopPropagation();
            }
          }}
        >
        {input7}
      </span>
      ) : (
        input7
      );
      return (
        <td ref={options} className={value3} {...input8}>{input6 && value?.href !== undefined && <TablesLink href={value.href} linkOptions={value.linkOptions} Link={value.Link} aria-hidden={true} tabIndex={-1} className={TablesStyles} />}{value4}</td>
      );
    },
  );
  TableCell.displayName = `TableCell`;
  TablesStyles6 = `opacity-0 group-hover/cdsrow:opacity-100 pointer-coarse:opacity-100 group-has-[:focus-visible]/cdsrow:opacity-100 has-[:focus-visible]:opacity-100 has-[[data-popup-open]]:opacity-100`;
  TablesRef = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useContext)(TablesCreateContext);
      return (
        <td
          ref={options}
          data-cds={`TableRowActions`}
          className={resolveUiDesignSystemValue2(TablesH7BoxContentPxMdPySm, `text-right`, TablesStyles4, TablesStyles5, input)}
          {...input3}
        >{<span className={clsx(`relative inline-flex max-w-full align-middle`, value && TablesZ10, TablesStyles6)} onClick={(input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input4.stopPropagation()} onMouseDown={(input4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (input4.detail > 1 && input4.button === 0) {
      input4.stopPropagation();
    }
  }}>
              {input2}
            </span>}</td>
      );
    },
  );
  TablesRef.displayName = `TableRowActions`;
}

export { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow };

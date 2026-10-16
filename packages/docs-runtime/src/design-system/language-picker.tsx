/** BaoCut: language picker from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsCustomIcon,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue4,
} from "./dependencies";
import { Skeleton } from "./skeleton";
import { TextInput } from "./text-input";
import type * as ReactComponentTypes from "react";

export const LanguagePickerOption: ReactComponentTypes.FC<Dynamic> = ({
  option: input,
  checked: input2,
  isTabStop: input3,
  lang: input4,
  disabled: input5,
  descriptionLang: input6,
  onSelect: input7,
  onKeyDown: input8,
}) => {
  return (
    <button
      type={`button`}
      role={`radio`}
      aria-checked={input2}
      tabIndex={input3 ? 0 : -1}
      lang={input4}
      disabled={input5}
      onClick={(..._extraArguments: unknown[]): Dynamic => input7(input.value)}
      onKeyDown={input8}
      className={resolveUiDesignSystemValue2(
        LanguagePickerPxMdPySm,
        `flex items-start justify-between gap-sm rounded-lg text-left disabled:opacity-disabled`,
        input2 ? `bg-accent-muted` : `hover:bg-fill-ghost-hover`,
      )}
    >
      <span className={`flex min-w-0 flex-col`}>
        <span className={`truncate text-body font-medium first-letter:uppercase`}>
          {input.label}
        </span>
        {input.description !== undefined && (
          <span
            className={`truncate text-footnote font-normal text-secondary`}
            lang={input6}
          >
            {input.description}
          </span>
        )}
      </span>
      {input2 && (
        <UiOverlaysAndIconsCustomIcon
          name={`Check`}
          size={`sm`}
          className={`mt-0.5 shrink-0 text-accent`}
        />
      )}
    </button>
  );
};

export const LanguagePickerSkeleton: ReactComponentTypes.FC<{
  count: number;
  className?: string;
}> = ({
  count: input,
  className: input2,
}) => {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(null);
  let { overflowing: value3 }: Dynamic = useLanguagePickerContainerRef({
    containerRef: value,
    contentRef: value2,
    frozen: false,
  });
  return (
    <div
      data-cds={`LanguagePickerSkeleton`}
      className={resolveUiDesignSystemValue2(LanguagePickerFlexMinH0FlexColGapMd, input2)}
    >
      {value3 ? (
        <Skeleton className={`h-control shrink-0 rounded`} />
      ) : (
        <div className={`sr-only`}>
          <Skeleton />
        </div>
      )}
      <div
        ref={value}
        aria-hidden={true}
        className={resolveUiDesignSystemValue2(
          LanguagePickerM1MinH24,
          value3 && `h-96`,
          `overflow-hidden`,
        )}
        style={LanguagePickerMaxHeight}
      >
        <div ref={value2} className={`p-1`}>
          <div className={LanguagePickerGridGridCols1GapXMdGapYXsSmGridCols2MdGridCols3}>
            {Array.from(
              {
                length: input,
              },
              (
                input3,
                options,
                ..._extraArguments: unknown[]
              ) => (
                <div
                  className={resolveUiDesignSystemValue2(
                    LanguagePickerPxMdPySm,
                    `flex flex-col`,
                  )}
                  key={options}
                >
                  {<Skeleton width={96} className={`h-[1lh] text-body`} />}
                  {<Skeleton width={64} className={`h-[1lh] text-footnote`} />}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

var LanguagePickerSearchLanguages: Dynamic;

var LanguagePickerFlexMinH0FlexColGapMd: Dynamic;

var LanguagePickerGridGridCols1GapXMdGapYXsSmGridCols2MdGridCols3: Dynamic;

var LanguagePickerPxMdPySm: Dynamic;

var LanguagePickerM1MinH24: Dynamic;

var LanguagePicker24rem: Dynamic;

var LanguagePickerMaxHeight: Dynamic;

var languagePickerValue1: Dynamic;

var LanguagePickerOverflowing: Dynamic;

function useLanguagePickerContainerRef(
  { containerRef: input, contentRef: input2, frozen: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(0);
  let [value3, value4]: Dynamic = (0, React.useState)(
    LanguagePickerOverflowing,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = input.current;
      let current2: Dynamic = input2.current;
      if (!current || !current2 || typeof ResizeObserver === "undefined")
        return;
      let observer: Dynamic = new (ResizeObserver as Dynamic)(
        (..._extraArguments: unknown[]): Dynamic =>
          value2(
            (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input4 + 1,
          ),
      );
      observer.observe(current, {
        box: `border-box`,
      });
      observer.observe(current2, {
        box: `border-box`,
      });
      return (..._extraArguments: unknown[]): Dynamic => observer.disconnect();
    },
    [input, input2],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (input3) return;
      let value5: Dynamic = input.current?.getBoundingClientRect().height;
      let value6: Dynamic = input2.current?.getBoundingClientRect().height;
      let value7: boolean =
        value5 !== undefined &&
        value6 !== undefined &&
        value6 > value5 + languagePickerValue1;
      value4(
        (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input4.measured && input4.overflowing === value7
            ? input4
            : {
                overflowing: value7,
                measured: true,
              },
      );
    },
    [input3, value, input, input2],
  );
  return value3;
}

function resolveLanguagePickerToLowerCase(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.normalize(`NFD`).replace(/\p{M}/gu, ``).toLowerCase();
}

function resolveLanguagePickerSome(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return [options.label, options.description, options.value].some(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      input2 !== undefined &&
      resolveLanguagePickerToLowerCase(input2).includes(input),
  );
}

var LanguagePickerStyles: Dynamic;

var LanguagePicker: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeLanguagePickerStep1(): void {
  LanguagePickerSearchLanguages = {
    searchLanguages: `Search languages`,
    noLanguagesFound: `No languages found`,
    language: `Language`,
    oneLanguageFound: `1 language found`,
    nLanguagesFound: `{count} languages found`,
  };
  LanguagePickerFlexMinH0FlexColGapMd = `flex min-h-0 flex-col gap-md`;
  LanguagePickerGridGridCols1GapXMdGapYXsSmGridCols2MdGridCols3 = `grid grid-cols-1 gap-x-md gap-y-xs sm:grid-cols-2 md:grid-cols-3`;
  LanguagePickerPxMdPySm = `px-md py-sm`;
  LanguagePickerM1MinH24 = `-m-1 min-h-24`;
  LanguagePicker24rem = `24rem`;
  LanguagePickerMaxHeight = {
    maxHeight: `min(${LanguagePicker24rem}, var(--language-picker-results-max-h, ${LanguagePicker24rem}))`,
  };
  languagePickerValue1 = 1;
  LanguagePickerOverflowing = {
    overflowing: false,
    measured: false,
  };
  LanguagePickerStyles = `[role="radio"]:not([disabled])`;
  LanguagePicker = (0, React.forwardRef)(function (
    {
      options: input,
      groups: input2,
      value: input3,
      onSelect: input4,
      disabled: input9 = false,
      descriptionLang: input10 = `en`,
      searchLabel: input5,
      emptyLabel: input6,
      groupLabel: input7,
      className: input8,
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `searchLanguages`,
      LanguagePickerSearchLanguages.searchLanguages,
    );
    let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `noLanguagesFound`,
      LanguagePickerSearchLanguages.noLanguagesFound,
    );
    let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `language`,
      LanguagePickerSearchLanguages.language,
    );
    let value4: Dynamic = input5 ?? value;
    let value5: Dynamic = input6 ?? value2;
    let value6: Dynamic = input7 ?? value3;
    let [value7, value8]: Dynamic = (0, React.useState)(``);
    let value9: Dynamic = (0, React.useRef)(null);
    let value10: Dynamic = resolveUiOverlaysAndIconsValue4(options, value9);
    let value11: Dynamic = (0, React.useRef)(null);
    let value12: Dynamic = (0, React.useRef)(null);
    let { overflowing: value13, measured: value14 }: Dynamic =
      useLanguagePickerContainerRef({
        containerRef: value11,
        contentRef: value12,
        frozen: value7 !== ``,
      });
    let value15: Dynamic = value7 !== `` || value13;
    let value16: Dynamic = (0, React.useRef)(null);
    let value17: Dynamic = (0, React.useRef)(false);
    UiDesignSystemUseLayoutEffect(
      (..._extraArguments: unknown[]): undefined => {
        if (!(!value14 || value17.current)) {
          value17.current = true;
          if (value15) {
            value16.current?.focus();
          }
        }
      },
      [value14, value15],
    );
    let value18: Dynamic = (0, React.useRef)(value15);
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (
          value18.current &&
          !value15 &&
          (document as Dynamic).activeElement === (document as Dynamic).body
        ) {
          value9.current
            ?.querySelector(`[role="radio"][tabindex="0"]`)
            ?.focus();
        }
        value18.current = value15;
      },
      [value15],
    );
    let value19: Dynamic = resolveLanguagePickerToLowerCase(value7.trim());
    let value20: Dynamic = (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic =>
        value19 === ``
          ? input
          : input.filter(
              (input11?: Dynamic, ..._extraArguments: unknown[]): boolean =>
                resolveLanguagePickerSome(value19, input11),
            ),
      [input, value19],
    );
    let value21: Dynamic = (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic =>
        (input2 ?? [])
          .map(
            (input11?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              ...input11,
              options:
                value19 === ``
                  ? input11.options
                  : input11.options.filter(
                      (
                        input12?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): boolean => resolveLanguagePickerSome(value19, input12),
                    ),
            }),
          )
          .filter(
            (input11?: Dynamic, ..._extraArguments: unknown[]) =>
              input11.options.length > 0,
          ),
      [input2, value19],
    );
    let value22: Dynamic =
      value20.length +
      value21.reduce(
        (
          input11?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => input11 + options2.options.length,
        0,
      );
    let value23: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `oneLanguageFound`,
      LanguagePickerSearchLanguages.oneLanguageFound,
    );
    let value24: Dynamic = resolveUiLinksAndFoundationUseContext3(
      `nLanguagesFound`,
      LanguagePickerSearchLanguages.nLanguagesFound,
      {
        count: value22,
      },
    );
    let value25: Dynamic =
      value22 === 0 ? value5 : value22 === 1 ? value23 : value24;
    let value26: Dynamic = (
      input11?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      input11.some(
        (input12?: Dynamic, ..._extraArguments: unknown[]) =>
          input12.value === input3,
      )
        ? input3
        : input11[0]?.value;
    let value27 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value30: boolean =
        event.key === `ArrowRight` || event.key === `ArrowDown`;
      let value31: boolean =
        event.key === `ArrowLeft` || event.key === `ArrowUp`;
      let value32: boolean = event.key === `Home` || event.key === `End`;
      if (!value30 && !value31 && !value32) return;
      let items: Dynamic = [
        ...(value9.current?.querySelectorAll(LanguagePickerStyles) ?? []),
      ];
      let value33: Dynamic = items.indexOf(event.currentTarget);
      if (value33 !== -1) {
        event.preventDefault();
        if (value32) {
          items[event.key === `Home` ? 0 : items.length - 1]?.focus();
          return;
        }
        items[
          (value33 + (value30 ? 1 : -1) + items.length) % items.length
        ]?.focus();
      }
    };
    let value28 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        event.nativeEvent.isComposing ||
        event.keyCode === 229 ||
        event.key !== `ArrowDown`
      )
        return;
      let value30: Dynamic =
        value9.current?.querySelector(LanguagePickerStyles);
      if (value30) {
        event.preventDefault();
        value30.focus();
      }
    };
    let value29: Dynamic = value26(value20);
    return (
      <div
        ref={value10}
        data-cds={`LanguagePicker`}
        className={resolveUiDesignSystemValue2(
          LanguagePickerFlexMinH0FlexColGapMd,
          input8,
        )}
      >
      {value15 && (
          <TextInput
            ref={value16}
            className={`shrink-0`}
            clearable={true}
            type={`search`}
            value={value7}
            onChange={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => value8(event.target.value)}
            onClear={(..._extraArguments: unknown[]): Dynamic => value8(``)}
            onKeyDown={value28}
            placeholder={value4}
            aria-label={value4}
            slotStart={
              <UiOverlaysAndIconsCustomIcon
                name={`Search`}
                size={`sm`}
                className={`text-muted`}
              />
            }
          />
        )}
      {value15 && (
          <div role={`status`} aria-live={`polite`} className={`sr-only`}>
          {value25}
        </div>
        )}
      <div
          ref={value11}
          className={resolveUiDesignSystemValue2(
            LanguagePickerM1MinH24,
            value15 && `h-96`,
            `overflow-y-auto`,
          )}
          style={LanguagePickerMaxHeight}
          data-testid={`language-picker-results`}
        >
        <div
            ref={value12}
            className={resolveUiDesignSystemValue2(
              `p-1`,
              value22 === 0 && `h-full`,
            )}
          >
          {value22 === 0 ? (
              <div
                className={`flex h-full items-center justify-center text-body font-normal text-secondary`}
              >
              {value5}
            </div>
            ) : (
              <jsxRuntime.Fragment>
              {value20.length > 0 && (
                  <div
                    role={`radiogroup`}
                    aria-label={value6}
                    className={`grid grid-cols-1 gap-x-md gap-y-xs sm:grid-cols-2 md:grid-cols-3`}
                  >
                  {value20.map(
                      (
                        input11?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => (
                        <LanguagePickerOption
                          option={input11}
                          checked={input11.value === input3}
                          isTabStop={input11.value === value29}
                          lang={input11.value}
                          disabled={input9}
                          descriptionLang={input10}
                          onSelect={input4}
                          onKeyDown={value27}
                          key={input11.value}
                        />
                      ),
                    )}
                </div>
                )}
              {value21.map(
                  (
                    input11?: Dynamic,
                    options2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let value30: Dynamic = value26(input11.options);
                    return (
                      <React.Fragment key={`${options2}:${input11.label}`}>{<div className={`mx-pad-md mt-md border-t`} />}{<div className={`mt-pad-md flex flex-col gap-xs`}>
                              <span className={`px-md text-footnote font-normal text-muted`}>
                                {input11.label}
                              </span>
                              <div role={`radiogroup`} aria-label={input11.label} className={LanguagePickerGridGridCols1GapXMdGapYXsSmGridCols2MdGridCols3}>
                                {input11.options.map((input12?: Dynamic, ..._extraArguments: unknown[]): Dynamic => <LanguagePickerOption
                                  option={input12}
                                  checked={input12.value === input3}
                                  isTabStop={input12.value === value30}
                                  lang={input11.lang ?? input12.value}
                                  disabled={input9}
                                  descriptionLang={input10}
                                  onSelect={input4}
                                  onKeyDown={value27}
                                  key={input12.value}
                                />)}
                              </div>
                            </div>}</React.Fragment>
                    );
                  },
                )}
            </jsxRuntime.Fragment>
            )}
        </div>
      </div>
    </div>
    );
  });
  LanguagePicker.displayName = `LanguagePicker`;
}

export { LanguagePicker };

/** BaoCut: composer from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  Button,
  React,
  UiDesignSystemUseLayoutEffect,
  jsxRuntime,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue4,
  resolveUiTooltipsAndControlsValue5,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./cds-dependencies";
import { isUnfocusedEmbeddedDocument } from "./cds-roving-toolbar";
import {
  isPointerPresentation,
  subscribePresentationChanges,
} from "./cds-presentation";
import {
  commentCardSurfaceClasses,
  isElevatedSurface,
} from "./cds-field-foundation";
import { CommentMotionCreateContext4 } from "./cds-comment-motion";
import { Surface } from "./cds-surface";
import { resolveShimmerValue6 } from "./cds-spark";
import { CommentsValue } from "./cds-comment-editor";
import {
  CommentsBox,
  CommentsStyles4,
  resolveCommentsDisabledReason,
} from "./cds-comment-edit";
import { Badge } from "./cds-badge";

function useCommentsDisabled(
  { disabled: input, to: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(input2);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value.current;
      if (!input || !current || !current.isConnected) return;
      value.current = null;
      let ownerDocument: Dynamic = current.ownerDocument;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        let activeElement: Dynamic = ownerDocument.activeElement;
        if (
          (activeElement === null ||
            activeElement === ownerDocument.body ||
            (activeElement === current && current.matches(`:disabled`))) &&
          !isUnfocusedEmbeddedDocument(ownerDocument)
        ) {
          value2()?.focus({
            preventScroll: true,
          });
        }
      });
    },
    [input, value2],
  );
  return {
    onFocus: (input3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value.current = input3.currentTarget;
    },
    onBlur: (..._extraArguments: unknown[]): undefined => {
      value.current = null;
    },
  };
}

var CommentsStyles11: Dynamic;

var CommentsStyles12: Dynamic;

var CommentsStyles13: Dynamic;

var CommentsStyles14: Dynamic;

var CommentsInvisibleOpacity0: Dynamic;

var CommentsStyles15: Dynamic;

var Composer: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeComposerStep1(): void {
  CommentsStyles11 = `grid-rows-[1fr] pt-md opacity-100`;
  CommentsStyles12 = `[--cc-tuck:calc((var(--cds-h-control)_-_var(--cds-checkbox--sm))/2)] -me-[var(--cc-tuck)] -mb-[var(--cc-tuck)]`;
  CommentsStyles13 = `-mb-[calc(var(--cc-tuck)_-_var(--cds-pad-md)_+_var(--cds-pad-sm))]`;
  CommentsStyles14 = `invisible grid-rows-[0fr] opacity-0 group-focus-within/cc:visible group-focus-within/cc:grid-rows-[1fr] group-focus-within/cc:pt-md group-focus-within/cc:opacity-100`;
  CommentsInvisibleOpacity0 = `invisible opacity-0`;
  CommentsStyles15 = `text-body cds-text-entry-floored py-[calc((var(--cds-h-control)_-_1lh)_/_2)]`;
  Composer = (0, React.forwardRef)(
    (
      {
        value: input,
        defaultValue: input18 = ``,
        onValueChange: input2,
        onSubmit: input3,
        onCancel: input4,
        submitOnPlainEnter: input5,
        placeholder: input6,
        "aria-label": input7,
        "aria-labelledby": input8,
        form: input9,
        sendToClaude: input10,
        busy: input19 = false,
        disabled: input20 = false,
        autoFocus: input21 = false,
        sendLabel: input11,
        editor: input12,
        canSubmit: input13,
        editorRef: input14,
        className: input15,
        onMouseDown: input16,
        ...input17
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `send`,
        `Send`,
      );
      let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `claudeMention`,
        // BaoCut: 批注框开头提及智能体的徽标
        `@Agent`,
      );
      let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `checkboxUnchecked`,
        `{label} unchecked`,
        {
          label: resolveUiLinksAndFoundationUseContext3(
            `sendToClaude`,
            // BaoCut: 同上，复选框未勾选时的无障碍名称
            `Send to agent`,
          ),
        },
      );
      let value4: Dynamic = resolveShimmerValue6(input12);
      resolveUiTooltipsAndControlsValue5(
        !value4 && !input7 && !input8,
        "cds: <CommentComposer> needs an `aria-label` or `aria-labelledby`; the placeholder is not a name.",
      );
      let value5: Dynamic = (0, React.useContext)(CommentMotionCreateContext4);
      let value6: Dynamic = isElevatedSurface();
      let value7: Dynamic = value5 || input9 === `reply`;
      let value8: Dynamic = !value5 && !value6;
      let value9: Dynamic = (0, React.useSyncExternalStore)(
        subscribePresentationChanges,
        isPointerPresentation,
        (..._extraArguments: unknown[]) => true,
      );
      let value10: Dynamic = input5 ?? value9;
      let value11: Dynamic = input !== undefined;
      let [value12, value13]: Dynamic = (0, React.useState)(input18);
      let value14: Dynamic = value11 ? input : value12;
      let [value15, value16]: Dynamic = (0, React.useState)(false);
      let value17: Dynamic = (0, React.useRef)(false);
      let value18 = (
        input22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!value11) {
          value13(input22);
        }
        value17.current = false;
        value16(false);
        input2?.(input22);
      };
      let value19: Dynamic = (0, React.useRef)(null);
      let value20: Dynamic = (0, React.useRef)(null);
      let value21: Dynamic = resolveUiOverlaysAndIconsValue4(value19, options);
      let value22: Dynamic = resolveUiOverlaysAndIconsValue4(
        value20,
        input14 ?? null,
      );
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          if (input21) {
            value20.current?.focus({
              preventScroll: true,
            });
          }
        },
        [input21],
      );
      let value23: Dynamic = value14.trim().length > 0;
      let value24: Dynamic = !input20 && !input19 && (input13 ?? value23);
      let value25 = (
        input22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (value24) {
          input3(value14.trim(), input22);
          value16(false);
          if (!value11) {
            value18(``);
          }
        }
      };
      let value26: Dynamic = input10?.checked === true;
      let value27: Dynamic =
        input10 !== undefined && resolveCommentsDisabledReason(input10);
      let value28: Dynamic = !value4 && !value7 && input10 !== undefined;
      let value29: Dynamic = value28 && value26;
      let value30: Dynamic = value29 && !value27 && !input20 && !input19;
      let value31: Dynamic = (0, React.useId)();
      let value32: Dynamic = (0, React.useRef)(null);
      let value33: Dynamic = (0, React.useRef)(null);
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): Dynamic => {
          let current: Dynamic = value33.current;
          let current2: Dynamic = value32.current;
          if (!current || !current2) return;
          let value48: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
            current2.style.setProperty(
              `--cc-tag-w`,
              `${current.offsetWidth}px`,
            );
          value48();
          let value49: Dynamic =
            current.ownerDocument.defaultView?.ResizeObserver;
          if (value49 === undefined) return;
          let value50: Dynamic = new (value49 as Dynamic)(value48);
          value50.observe(current);
          return (..._extraArguments: unknown[]): Dynamic =>
            value50.disconnect();
        },
        [value29],
      );
      let [value34, value35]: Dynamic = (0, React.useState)(value26);
      if (value26 !== value34) {
        value35(value26);
        if (value26) {
          value16(false);
        }
      }
      let value36 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let nativeEvent: Dynamic = event.nativeEvent;
        if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return;
        if (event.key === `Escape` && input4) {
          let value48: Dynamic = value23 && !value17.current;
          value17.current = value48;
          if (value48) {
            event.preventDefault();
            event.stopPropagation();
          }
          input4();
          return;
        }
        value17.current = false;
        let currentTarget: Dynamic = event.currentTarget;
        if (
          event.key === `Backspace` &&
          !event.repeat &&
          value30 &&
          currentTarget.selectionStart === 0 &&
          currentTarget.selectionEnd === 0
        ) {
          event.preventDefault();
          value16(true);
          input10?.onCheckedChange(false);
        }
      };
      let value37 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        input16?.(event);
        if (event.defaultPrevented) return;
        let target: Dynamic = event.target;
        if (!value19.current?.contains(target)) return;
        let value48: Dynamic = target.closest(`[role="checkbox"]`);
        if (value48 && value48.getAttribute(`aria-disabled`) !== `true`) {
          event.preventDefault();
          return;
        }
        let value49: Dynamic = target.closest(
          `${CommentsStyles4}, button, input, [tabindex="0"]`,
        );
        if (
          !(
            value49 &&
            value49 !== value19.current &&
            value19.current.contains(value49)
          )
        ) {
          event.preventDefault();
          value19.current?.querySelector(CommentsStyles4)?.focus();
        }
      };
      let value38: Dynamic = !value24 && !input19;
      let value39: Dynamic = useCommentsDisabled({
        disabled: value38,
        to: (..._extraArguments: unknown[]): Dynamic =>
          value19.current?.querySelector(
            `textarea, [contenteditable="true"], [role="textbox"]`,
          ) ?? null,
      });
      let value40: Dynamic = (
        <Button
          {...originalJsxProps({
            variant: `ghost`,
            iconOnly: true,
            icon: `ArrowUp`,
            "aria-label": input11 ?? value,
            shortcut: value10 ? `enter` : `cmd+enter`,
            disabled: value38,
            busy: input19,
            onMouseDown: (
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => event.preventDefault(),
            onClick: (
              input22?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              value25({
                modifierKey: input22.metaKey || input22.ctrlKey,
                source: `send`,
              });
              value19.current?.querySelector(CommentsStyles4)?.focus({
                preventScroll: true,
              });
            },
            className: `shrink-0`,
            "data-cds-part": `send`,
            ...value39,
          })}
        />
      );
      let value41: Dynamic = value4 ? (
        input12
      ) : (
        <CommentsValue
          ref={value22}
          value={value14}
          onChange={value18}
          onSubmit={(
            input22?: unknown,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => value25(options2)}
          submitOnPlainEnter={value10}
          onKeyDown={value36}
          onBlur={(..._extraArguments: unknown[]): undefined => {
            value17.current = false;
            value16(false);
          }}
          placeholder={value29 ? undefined : input6}
          aria-label={input7}
          aria-labelledby={input8}
          aria-describedby={value29 ? value31 : undefined}
          readOnly={input20}
          aria-disabled={input20 || undefined}
          className={resolveUiDesignSystemValue2(
            `min-h-[1lh] placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap`,
            value29 && `indent-[calc(var(--cc-tag-w,0px)+var(--cds-gap-xs))]`,
          )}
        />
      );
      let value42: Dynamic = (
        <div
          ref={value32}
          className={resolveUiDesignSystemValue2(
            `grid min-w-0`,
            value28 && `text-body font-normal`,
          )}
        >
        {value28 && value29 && (
            <span
              ref={value33}
              id={value31}
              aria-hidden={true}
              data-cds-part={`mention`}
              className={`flex h-[1lh] items-center justify-self-start [grid-area:1/1]`}
            >
            <Badge variant={`accent`}>{value2}</Badge>
          </span>
          )}
        <div className={`min-w-0 [grid-area:1/1]`}>{value41}</div>
      </div>
      );
      let value43: Dynamic = input10 !== undefined;
      let value44: Dynamic = value5 && !input19 && !value23 && input13 !== true;
      let value45: Dynamic = value44 && value43;
      let value46: Dynamic =
        value5 && !value43 ? (
          <span
            data-cds-part={`send-rest`}
            data-idle={value44 || undefined}
            className={resolveUiDesignSystemValue2(
              `flex shrink-0 transition-[opacity,visibility] duration-fast ease-out motion-reduce:transition-none`,
              value44 && CommentsInvisibleOpacity0,
            )}
          >
          {value40}
        </span>
        ) : (
          value40
        );
      let value47: Dynamic = (
        <jsxRuntime.Fragment>
        <div
            className={resolveUiDesignSystemValue2(
              value43
                ? `flex min-h-control min-w-0 flex-col justify-center`
                : `flex min-w-0 items-end gap-sm`,
              !value43 &&
                value5 &&
                `-me-[calc(var(--cds-pad-md)-var(--cds-pad-sm))]`,
            )}
          >
          <div
              className={resolveUiDesignSystemValue2(
                `min-w-0`,
                CommentsStyles15,
                !value43 && `flex-1 self-center`,
              )}
            >
            {value42}
          </div>
          {value43 ? null : value46}
        </div>
        {value43 ? (
            <div
              data-cds-part={`footer`}
              data-idle={value45 || undefined}
              className={resolveUiDesignSystemValue2(
                `grid transition-[grid-template-rows,padding,opacity,visibility] duration-fast ease-out motion-reduce:transition-none`,
                value45 ? CommentsStyles14 : CommentsStyles11,
              )}
            >
            <div
                className={resolveUiDesignSystemValue2(
                  `flex min-h-0 min-w-0 items-center justify-between gap-sm`,
                  CommentsStyles12,
                  value5 && CommentsStyles13,
                  value45 &&
                    `overflow-hidden group-focus-within/cc:overflow-visible`,
                )}
              >
              <div className={`flex min-w-0`}>
                <CommentsBox box={input10} disabled={input20 || input19} />
              </div>
              {value40}
            </div>
          </div>
          ) : null}
        {value28 && (
            <span role={`status`} className={`sr-only`}>
            {value15 && !value26 ? value3 : null}
          </span>
          )}
      </jsxRuntime.Fragment>
      );
      let state: Dynamic = {
        ref: value21,
        "data-cds": `CommentComposer`,
        "data-form": value7 ? `reply` : undefined,
        "data-disabled": input20 || undefined,
        onMouseDown: value37,
        ...input17,
      };
      return value8 ? (
        <Surface
          {...originalJsxProps({
            elevation: `panel`,
            ...state,
            className: resolveUiDesignSystemValue2(
              commentCardSurfaceClasses(true),
              `group/cc flex min-w-0 flex-col p-lg font-sans text-body font-normal text-primary`,
              input15,
            ),
            children: value47,
          })}
        />
      ) : (
        <div
          {...originalJsxProps({
            ...state,
            className: resolveUiDesignSystemValue2(
              `group/cc flex min-w-0 flex-col`,
              input15,
            ),
            children: value47,
          })}
        />
      );
    },
  );
  Composer.displayName = `CommentComposer`;
}

export { Composer };

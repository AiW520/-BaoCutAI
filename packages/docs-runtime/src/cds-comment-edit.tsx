/** BaoCut: comment edit from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  Button,
  Checkbox,
  DisabledReasonTooltip,
  React,
  Tooltip,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue4,
} from "./cds-dependencies";
import {
  isPointerPresentation,
  subscribePresentationChanges,
  useClickToFocus,
} from "./cds-presentation";
import { FieldStylesState2 } from "./cds-field-foundation";
import {
  resolveCommentMotionPreventScroll,
  useCommentMotionPartRef,
} from "./cds-comment-motion";
import { resolveShimmerValue6 } from "./cds-spark";
import { CommentsValue } from "./cds-comment-editor";

var CommentsStyles4: Dynamic;

function resolveCommentsDisabledReason(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.disabledReason !== undefined && input.disabledReason !== ``;
}

function CommentsBox(
  { box: input, disabled: input2 = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `sendToClaude`,
    // BaoCut: 批注框里「发给智能体」复选框的文字（应用不给 CDS 传 labels，用的就是这个默认值）
    `Send to agent`,
  );
  let value2: Dynamic = resolveCommentsDisabledReason(input);
  return (
    <DisabledReasonTooltip
      reason={value2 ? input.disabledReason : undefined}
      side={`bottom`}
    >
      <Tooltip
        content={value2 ? undefined : input.tooltip}
        multiline={true}
        side={`bottom`}
      >
        <Checkbox
          size={`sm`}
          label={value}
          checked={input.checked}
          disabled={value2 || input2}
          aria-describedby={input[`aria-describedby`]}
          onCheckedChange={(
            input3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => input.onCheckedChange(input3 === true)}
        />
      </Tooltip>
    </DisabledReasonTooltip>
  );
}

var CommentsValue2: Dynamic;

var CommentsBusy: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentEditStep1(): void {
  CommentsStyles4 = `textarea, [contenteditable="true"], [role="textbox"]`;
  CommentsValue2 = (0, React.forwardRef)(
    (
      {
        value: input,
        savedValue: input2,
        onValueChange: input3,
        onSave: input4,
        onCancel: input5,
        busy: input12 = false,
        saveDisabled: input13 = false,
        sendToClaude: input6,
        editor: input7,
        label: input8,
        className: input9,
        onMouseDown: input10,
        ...input11
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = input !== undefined;
      let [value2, value3]: Dynamic = (0, React.useState)(input2);
      let value4: Dynamic = value ? input : value2;
      let value5 = (
        input14?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!value) {
          value3(input14);
        }
        input3?.(input14);
      };
      let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `editComment`,
        `Edit comment`,
      );
      let value7: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `cancel`,
        `Cancel`,
      );
      let value8: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `save`,
        `Save`,
      );
      let value9: Dynamic = (0, React.useRef)(null);
      let value10: Dynamic = (0, React.useRef)(null);
      let value11: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionPreventScroll(value9, value11);
      let value12: Dynamic = (0, React.useSyncExternalStore)(
        subscribePresentationChanges,
        isPointerPresentation,
        (..._extraArguments: unknown[]) => true,
      );
      let value13: Dynamic = resolveUiOverlaysAndIconsValue4(value9, options);
      let [value14]: Dynamic = (0, React.useState)(input6?.checked);
      let value15 = (..._extraArguments: unknown[]): undefined => {
        if (input12 || input13) return;
        let value22: Dynamic = value4.trim();
        let value23: Dynamic =
          value22 === input2.trim() && input6?.checked === value14;
        if (value22 === `` || value23) {
          input5();
        } else {
          input4(value22);
        }
      };
      let value16: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        value10.current?.querySelector(
          `textarea, [contenteditable="true"], [role="textbox"]`,
        ) ?? null;
      let { clickToFocusProps: value17 }: Dynamic = useClickToFocus(
        (..._extraArguments: unknown[]): Dynamic => value16()?.focus(),
        {
          readOnly: input12,
        },
      );
      let value18 = (
        input14?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        input10?.(input14);
        if (!(input14.defaultPrevented || !value16())) {
          value17.onMouseDown(input14);
        }
      };
      let value19: Dynamic = input13 && !input12;
      let value20: Dynamic = useCommentMotionPartRef({
        partRef: value9,
        disabled: value19,
        to: value16,
      });
      let value21: Dynamic = input8 ?? value6;
      return (
        <div
          {...originalJsxsProps({
            ref: value13,
            "data-cds-part": `edit-field`,
            className: resolveUiDesignSystemValue2(
              `flex flex-col gap-xs`,
              input9,
            ),
            onMouseDown: value18,
            ...input11,
            children: [
              <div
                ref={value10}
                className={resolveUiDesignSystemValue2(
                  FieldStylesState2,
                  `forced-colors:border`,
                )}
              >
              {resolveShimmerValue6(input7) ? (
                  input7
                ) : (
                  <CommentsValue
                    ref={value11}
                    aria-label={value21}
                    value={value4}
                    onChange={value5}
                    onSubmit={value15}
                    submitOnPlainEnter={value12}
                    readOnly={input12}
                    onKeyDown={(
                      event?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      if (
                        event.key === `Escape` &&
                        !event.nativeEvent.isComposing &&
                        event.nativeEvent.keyCode !== 229
                      ) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!input12) {
                          input5();
                        }
                      }
                    }}
                  />
                )}
            </div>,
              <div className={`flex flex-wrap items-center gap-sm`}>
              {input6 && <CommentsBox box={input6} disabled={input12} />}
              <div className={`ms-auto flex items-center gap-sm`}>
                <Button
                    variant={`secondary`}
                    aria-disabled={input12 || undefined}
                    onClick={input12 ? undefined : input5}
                  >
                  {value7}
                </Button>
                <Button
                    {...originalJsxProps({
                      variant: `primary`,
                      busy: input12,
                      disabled: value19,
                      onClick: value15,
                      ...value20,
                      children: value8,
                    })}
                  />
              </div>
            </div>,
            ],
          })}
        />
      );
    },
  );
  CommentsValue2.displayName = `CommentCard.EditField`;
  CommentsBusy = (0, React.forwardRef)(
    (
      {
        onDelete: input,
        onCancel: input2,
        busy: input6 = false,
        label: input3,
        className: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `deleteCommentConfirm`,
        `Delete this comment?`,
      );
      let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `cancel`,
        `Cancel`,
      );
      let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `delete`,
        `Delete`,
      );
      let value4: Dynamic = (0, React.useId)();
      let value5: Dynamic = (0, React.useRef)(null);
      let value6: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionPreventScroll(value5, value6);
      return (
        <div
          {...originalJsxsProps({
            ref: resolveUiOverlaysAndIconsValue4(value5, options),
            role: `group`,
            "aria-labelledby": value4,
            "data-cds-part": `delete-confirm`,
            className: resolveUiDesignSystemValue2(
              `flex flex-col gap-sm border-t pt-sm`,
              input4,
            ),
            ...input5,
            children: [
              <span
                id={value4}
                className={`text-body font-normal text-primary`}
              >
              {input3 ?? value}
            </span>,
              <div className={`flex justify-end gap-sm`}>
              <Button
                  ref={value6}
                  variant={`secondary`}
                  aria-disabled={input6 || undefined}
                  onClick={input6 ? undefined : input2}
                >
                {value2}
              </Button>
              <Button variant={`danger`} busy={input6} onClick={input}>
                {value3}
              </Button>
            </div>,
            ],
          })}
        />
      );
    },
  );
  CommentsBusy.displayName = `CommentCard.DeleteConfirm`;
}

export {
  CommentsBox,
  CommentsBusy,
  CommentsStyles4,
  CommentsValue2,
  resolveCommentsDisabledReason,
};

/** BaoCut: comment editor from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import { React, originalJsxProps } from "./cds-dependencies";
import {
  installSheetsCapture,
  resolveSheetsEnter,
  resolveSheetsEnter2,
  resolveSheetsIsComposing,
  resolveSheetsModifierKey,
  resolveSheetsValue5,
} from "./cds-sheets-keyboard";
import { TextArea } from "./cds-text-area";

var CommentsValue: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentEditorStep1(): void {
  CommentsValue = (0, React.forwardRef)(
    (
      {
        value: input,
        onChange: input2,
        onSubmit: input3,
        submitOnPlainEnter: input7 = true,
        onKeyDown: input4,
        onCompositionEnd: input5,
        rows: input8 = 1,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useCallback)(
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          input5?.(event);
          resolveSheetsValue5(event.nativeEvent.timeStamp);
        },
        [input5],
      );
      return (
        <TextArea
          {...originalJsxProps({
            ref: options,
            "data-cds": `PlainEditor`,
            bare: true,
            autosize: true,
            rows: input8,
            value: input,
            onChange: (
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => input2(event.target.value),
            onKeyDown: (0, React.useCallback)(
              (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                resolveSheetsEnter(event);
                input4?.(event);
                if (
                  !(event.defaultPrevented || event.currentTarget.readOnly) &&
                  !(input3 === undefined || event.key !== `Enter`)
                ) {
                  if (
                    event.altKey &&
                    !event.shiftKey &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    let currentTarget: Dynamic = event.currentTarget;
                    let ownerDocument: Dynamic = currentTarget.ownerDocument;
                    if (
                      !(
                        typeof ownerDocument.execCommand == `function` &&
                        ownerDocument.execCommand(
                          `insertText`,
                          false,
                          `
`,
                        )
                      )
                    ) {
                      currentTarget.setRangeText(
                        `
`,
                        currentTarget.selectionStart,
                        currentTarget.selectionEnd,
                        `end`,
                      );
                      input2(currentTarget.value);
                    }
                    return;
                  }
                  if (
                    !event.shiftKey &&
                    !event.altKey &&
                    resolveSheetsIsComposing(event.nativeEvent)
                  ) {
                    if (resolveSheetsEnter2(event.nativeEvent, input7)) {
                      let currentTarget: Dynamic = event.currentTarget;
                      let value2: Dynamic = resolveSheetsModifierKey(
                        event,
                        `enter`,
                      );
                      installSheetsCapture(
                        event.nativeEvent,
                        currentTarget,
                        (..._extraArguments: unknown[]): Dynamic =>
                          input3(currentTarget.value, value2),
                      );
                    }
                    return;
                  }
                  if (resolveSheetsEnter2(event.nativeEvent, input7)) {
                    event.preventDefault();
                    input3(
                      event.currentTarget.value,
                      resolveSheetsModifierKey(event, `enter`),
                    );
                  }
                }
              },
              [input2, input4, input3, input7],
            ),
            onCompositionEnd: value,
            ...input6,
          })}
        />
      );
    },
  );
  CommentsValue.displayName = `PlainEditor`;
}

export { CommentsValue };

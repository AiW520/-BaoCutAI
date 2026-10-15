/** BaoCut: comment motion from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "../dependencies";
import { isUnfocusedEmbeddedDocument } from "../roving-toolbar";
import { isPointerPresentation } from "../presentation";

var CommentMotionCreateContext: Dynamic;

var commentMotionValue2000: Dynamic;

var commentMotionValue1000: Dynamic;

function createReactionSettledTracker(..._extraArguments: unknown[]): Dynamic {
  let value: boolean = false;
  let entries: Dynamic = new (Map as Dynamic)();
  return {
    get current(): boolean {
      return value;
    },
    settle: (..._extraArguments: unknown[]): undefined => {
      value = true;
    },
    note: (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let value2: number = performance.now();
      for (let [value3, value4] of entries as Dynamic)
        if (value2 - value4 > commentMotionValue1000) {
          entries.delete(value3);
        }
      entries.set(input, value2);
    },
    answers: (input?: Dynamic, ..._extraArguments: unknown[]): boolean => {
      let entry: Dynamic = entries.get(input);
      return (
        entry !== undefined &&
        performance.now() - entry <= commentMotionValue1000
      );
    },
  };
}

var CommentMotionCreateContext2: Dynamic;

var CommentMotionCreateContext3: Dynamic;

var CommentMotionCreateContext4: Dynamic;

var CommentMotionCreateContext5: Dynamic;

var CommentMotionFloat: Dynamic;

var CommentMotionCreateContext6: Dynamic;

var commentMotionValue500: Dynamic;

var commentMotionValue10002: Dynamic;

var commentMotionSet: Dynamic;

function installCommentMotionEnter(
  input?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = performance.now() + commentMotionValue500;
  let value2 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let value6: boolean = !(
      event.shiftKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    );
    if (
      event.key === `Enter` &&
      (event.repeat || (value6 && performance.now() < value))
    ) {
      event.preventDefault();
      event.stopPropagation();
      if (event.repeat) {
        value = performance.now() + commentMotionValue500;
      }
    } else {
      if (!event.repeat && !commentMotionSet.has(event.key)) {
        value5();
      }
    }
  };
  let value3: number = performance.now();
  let value4 = (..._extraArguments: unknown[]): undefined => {
    if (performance.now() - value3 <= commentMotionValue10002) {
      value = performance.now() + commentMotionValue500;
    }
    input.removeEventListener(`focusin`, value4, true);
  };
  let value5 = (..._extraArguments: unknown[]): undefined => {
    input.removeEventListener(`keydown`, value2, true);
    input.removeEventListener(`focusin`, value4, true);
    input.defaultView?.removeEventListener(`blur`, value5);
  };
  input.addEventListener(`keydown`, value2, true);
  if (options) {
    input.addEventListener(`focusin`, value4, true);
  }
  input.defaultView?.addEventListener(`blur`, value5);
  return value5;
}

var CommentMotionStyles: Dynamic;

var CommentMotionStyles2: Dynamic;

var CommentMotionStyles3: Dynamic;

var CommentMotionStyles4: Dynamic;

var CommentMotionStyles5: Dynamic;

var CommentMotionStyles6: Dynamic;

function resolveCommentMotionFocus(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof input == `object` &&
    !!input &&
    `focus` in input &&
    `isConnected` in input
  );
}

function restoreFocus(
  input?: Dynamic,
  options?: Dynamic,
  { standDown: context, stranded: context2, onMoved: context3 }: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  queueMicrotask((..._extraArguments: unknown[]): undefined => {
    let activeElement: Dynamic = input.activeElement;
    if (
      !(
        isUnfocusedEmbeddedDocument(input) ||
        (activeElement !== null &&
          activeElement !== input.body &&
          !(activeElement === context2 && context2.matches(`:disabled`))) ||
        context?.()
      )
    )
      for (let value of options as Dynamic) {
        let value2: Dynamic = typeof value == `function` ? value() : value;
        if (
          resolveCommentMotionFocus(value2) &&
          value2.isConnected &&
          (value2.focus({
            preventScroll: true,
          }),
          input.activeElement === value2)
        ) {
          context3?.();
          return;
        }
      }
  });
}

function resolveCommentMotionButton(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.closest(CommentMotionStyles5);
  let value2: number = (
    value ? [...value.querySelectorAll(`button`)] : []
  ).indexOf(input);
  return (..._extraArguments: unknown[]): Dynamic => {
    let value3: Dynamic = value?.isConnected
      ? value.querySelectorAll(`button`)
      : null;
    return value3?.[Math.min(value2, value3.length - 1)] ?? null;
  };
}

function resolveCommentMotionValue(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (..._extraArguments: unknown[]): Dynamic =>
    input?.querySelector(`article${CommentMotionStyles2}`) ?? null;
}

function resolveCommentMotionPreventScroll(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = input.current;
      if (!current) return;
      let ownerDocument: Dynamic = current.ownerDocument;
      let activeElement: Dynamic = ownerDocument.activeElement;
      let value: Dynamic =
        activeElement !== null &&
        activeElement !== ownerDocument.body &&
        !current.contains(activeElement)
          ? activeElement
          : null;
      let current2: Dynamic = options.current;
      if (
        current2 &&
        (current2.focus({
          preventScroll: true,
        }),
        `setSelectionRange` in current2 && `value` in current2)
      ) {
        let value2: Dynamic = current2;
        value2.setSelectionRange(value2.value.length, value2.value.length);
      }
      return (..._extraArguments: unknown[]): undefined => {
        if (current.contains(ownerDocument.activeElement)) {
          restoreFocus(ownerDocument, [
            value,
            current
              .closest(CommentMotionStyles2)
              ?.querySelector(CommentMotionStyles3),
            current.closest(CommentMotionStyles),
          ]);
        }
      };
    },
    [input, options],
  );
}

function resolveCommentMotionStandDown(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = input.current;
      return (..._extraArguments: unknown[]): undefined => {
        let value: Dynamic = input.current ?? current;
        if (value && value === value.ownerDocument.activeElement) {
          let value2: Dynamic =
            options === `actions` ? value.closest(`[role="toolbar"]`) : null;
          restoreFocus(
            value.ownerDocument,
            [
              options === `more`
                ? value
                    .closest(CommentMotionStyles2)
                    ?.querySelector(CommentMotionStyles3)
                : null,
              options === `replies`
                ? resolveCommentMotionValue(value.closest(CommentMotionStyles4))
                : null,
              options === `pill` ? resolveCommentMotionButton(value) : null,
              options === `pill`
                ? value
                    .closest(CommentMotionStyles2)
                    ?.querySelector(CommentMotionStyles6)
                : null,
              value.closest(CommentMotionStyles),
            ],
            {
              standDown: value2
                ? (..._extraArguments: unknown[]): Dynamic =>
                    value2.isConnected &&
                    value2.matches(`[role="toolbar"]`) &&
                    value2.querySelector(`button`) !== null
                : undefined,
            },
          );
        }
      };
    },
    [input, options],
  );
}

function useCommentMotionPartRef(
  { partRef: input, disabled: input2, to: input3 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = useUiOverlaysAndIconsUseInsertionEffect2(input3);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value.current;
      let current2: Dynamic = input.current;
      if (!input2 || !current || !current2) return;
      value.current = null;
      let ownerDocument: Dynamic = current2.ownerDocument;
      restoreFocus(
        ownerDocument,
        [
          isPointerPresentation(ownerDocument.defaultView ?? undefined)
            ? value2
            : null,
          current2.closest(CommentMotionStyles),
        ],
        {
          stranded: current,
          onMoved: (..._extraArguments: unknown[]): undefined =>
            void installCommentMotionEnter(ownerDocument),
        },
      );
    },
    [input, input2, value2],
  );
  return {
    onFocus: (input4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value.current = input4.currentTarget;
    },
    onBlur: (..._extraArguments: unknown[]): undefined => {
      value.current = null;
    },
  };
}

function resolveCommentMotionCurrent(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = input.current;
      return (..._extraArguments: unknown[]): undefined => {
        let value: Dynamic = input.current ?? current;
        if (value && value.contains(value.ownerDocument.activeElement)) {
          restoreFocus(value.ownerDocument, [
            value.closest(CommentMotionStyles),
          ]);
        }
      };
    },
    [input],
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentMotionStep1(): void {
  CommentMotionCreateContext = (0, React.createContext)(false);
  commentMotionValue2000 = 2e3;
  commentMotionValue1000 = 1e3;
  CommentMotionCreateContext2 = (0, React.createContext)(null);
  CommentMotionCreateContext3 = (0, React.createContext)(null);
  CommentMotionCreateContext4 = (0, React.createContext)(false);
  CommentMotionCreateContext5 = (0, React.createContext)(null);
  CommentMotionFloat = (0, React.createContext)(`float`);
  CommentMotionCreateContext6 = (0, React.createContext)(`all`);
  commentMotionValue500 = 500;
  commentMotionValue10002 = 1e3;
  commentMotionSet = new (Set as Dynamic)([`Shift`, `Control`, `Alt`, `Meta`]);
  CommentMotionStyles = `[data-cds="CommentCard"]`;
  CommentMotionStyles2 = `[data-cds-part="comment"]`;
  CommentMotionStyles3 = `[data-cds-part="more"]`;
  CommentMotionStyles4 = `[data-cds-part="replies"]`;
  CommentMotionStyles5 = `[data-cds-part="reactions"]`;
  CommentMotionStyles6 = `[data-cds-part="react"]`;
}

export {
  CommentMotionCreateContext,
  CommentMotionCreateContext2,
  CommentMotionCreateContext3,
  CommentMotionCreateContext4,
  CommentMotionCreateContext5,
  CommentMotionCreateContext6,
  CommentMotionFloat,
  commentMotionValue2000,
  createReactionSettledTracker,
  resolveCommentMotionCurrent,
  resolveCommentMotionPreventScroll,
  resolveCommentMotionStandDown,
  useCommentMotionPartRef,
};

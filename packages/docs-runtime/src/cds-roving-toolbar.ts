/** BaoCut: roving toolbar from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  createSafeMutationObserver,
  createSafeResizeObserver,
  resolveUiOverlaysAndIconsValue,
  resolveUiProviderAndLayersValue2,
} from "./cds-dependencies";

var rovingToolbarWeakMap: Dynamic;

function isUnfocusedEmbeddedDocument(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let defaultView: Dynamic = input.defaultView;
  return (
    defaultView !== null &&
    defaultView.top !== defaultView.self &&
    !input.hasFocus()
  );
}

var RovingToolbarStyles: Dynamic;

var RovingToolbarState: Dynamic;

var RovingToolbarStyles2: Dynamic;

var RovingToolbarStyles3: Dynamic;

function resolveRovingToolbarClosest(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = options.closest(`[inert]`);
  return value !== null && value !== input && input.contains(value);
}

var RovingToolbarStyles4: Dynamic;

var RovingToolbarState2: Dynamic;

var rovingToolbarPattern: Dynamic;

function resolveRovingToolbarClosest2(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = options.closest(RovingToolbarStyles3);
  return (
    options.matches(RovingToolbarStyles2) ||
    (value !== null && value !== input && input.contains(value))
  );
}

function resolveRovingToolbarVisibilityProperty(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof input.checkVisibility != `function` ||
    input.checkVisibility({
      visibilityProperty: true,
    })
  );
}

function isRovingToolbarSoftDisabled(
  input: Dynamic,
  options: Dynamic,
  { softDisabled: context = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filtered: Dynamic = Array.from<Dynamic>(
    input.querySelectorAll(RovingToolbarState),
  ).filter(
    (element?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      !element.hasAttribute(`data-base-ui-focus-guard`) &&
      !resolveRovingToolbarClosest2(input, element) &&
      element.getAttribute(`aria-hidden`) !== `true` &&
      !element.matches(`:disabled`) &&
      !resolveRovingToolbarClosest(input, element) &&
      !(context && element.matches(RovingToolbarStyles4)) &&
      (element.matches(RovingToolbarStyles) ||
        element.tabIndex >= 0 ||
        options.has(element)),
  );
  return filtered.filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      !filtered.some(
        (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input3 !== input2 && input2.contains(input3),
      ),
  );
}

function resolveRovingToolbarIndexOf(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.indexOf(options);
  let value2: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value7: Dynamic = input[input2];
    return value7 === undefined ? -1 : context.indexOf(value7);
  };
  let value3: Dynamic = value - 1;
  for (; value3 >= 0 && value2(value3) === -1; ) value3--;
  let value4: Dynamic = value + 1;
  for (; value4 < input.length && value2(value4) === -1; ) value4++;
  let value5: Dynamic = context.length - 1;
  if (value3 < 0 && value4 < input.length)
    return context[Math.max(value2(value4) - (value4 - value), 0)];
  let value6: Dynamic = value4 < input.length ? value2(value4) : value5;
  return context[Math.min(value2(value3) + (value - value3), value6, value5)];
}

function useRovingToolbar(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  let value2: Dynamic = (0, React.useRef)(null);
  let value3: Dynamic = (0, React.useRef)(null);
  let value4: Dynamic = (0, React.useRef)(null);
  let value5: Dynamic = (0, React.useRef)(null);
  let value6: Dynamic = (0, React.useRef)(null);
  let value7: Dynamic = (0, React.useRef)([]);
  let value8: Dynamic = (0, React.useRef)(new (WeakSet as Dynamic)());
  let value9: Dynamic = (0, React.useRef)(false);
  let value10: Dynamic = (0, React.useRef)(false);
  let value11: Dynamic = (0, React.useRef)(new (WeakSet as Dynamic)());
  let value12: Dynamic = (0, React.useRef)(null);
  let value13: Dynamic = (0, React.useRef)(null);
  let value14: Dynamic = (0, React.useRef)(RovingToolbarState2);
  let value15: Dynamic = (0, React.useCallback)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      value6.current = options;
      value7.current = input;
      input.forEach(
        (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value8.current.add(input2);
          input2.tabIndex = input2 === options ? 0 : -1;
        },
      );
      let current: Dynamic = value.current;
      if (value4.current !== null && current !== null) {
        value4.current.disconnect();
        value4.current.observe(current);
        value4.current.observe(options);
        input.forEach(
          (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (value11.current.has(input2)) {
              value4.current?.observe(input2);
            }
          },
        );
      }
    },
    [],
  );
  let value16: Dynamic = (0, React.useCallback)(
    (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value6.current;
      let value23: Dynamic = value14.current.firstUntilFocused === true;
      if (
        current === null ||
        (!(value23 && !value10.current) &&
          resolveRovingToolbarVisibilityProperty(current))
      )
        return;
      let value24: Dynamic = isRovingToolbarSoftDisabled(
        element,
        value8.current,
        value14.current,
      );
      let match: Dynamic = value24.find(resolveRovingToolbarVisibilityProperty);
      let slice: Dynamic = value24.slice(
        0,
        match ? value24.indexOf(match) : undefined,
      );
      slice.forEach(
        (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!value11.current.has(input)) {
            value4.current?.observe(input);
          }
        },
      );
      value11.current = new (WeakSet as Dynamic)(slice);
      if (match === undefined) return;
      let activeElement: Dynamic = element.ownerDocument.activeElement;
      if (
        !element.contains(activeElement) &&
        activeElement?.matches(`body`) === false
      ) {
        value10.current = false;
      }
      let value25: Dynamic =
        value23 && !value10.current
          ? match
          : resolveRovingToolbarIndexOf(
              value7.current,
              current,
              value24.filter(resolveRovingToolbarVisibilityProperty),
            );
      if (value25 !== undefined && value25 !== current) {
        value15(value24, value25);
      }
    },
    [value15],
  );
  let value17: Dynamic = (0, React.useCallback)(
    (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let value23: Dynamic = isRovingToolbarSoftDisabled(
        element,
        value8.current,
        value14.current,
      );
      let [value24]: Dynamic = value23;
      let current: Dynamic = value6.current;
      let ownerDocument: Dynamic = element.ownerDocument;
      if (value24 === undefined) {
        value6.current = null;
        value7.current = value23;
        value10.current = false;
        value12.current = null;
        value4.current?.disconnect();
      } else {
        let value25: Dynamic = current !== null && !value23.includes(current);
        let activeElement: Dynamic = ownerDocument.activeElement;
        let current2: Dynamic = value7.current;
        let value26: Dynamic =
          value12.current?.to === current ? value12.current : null;
        let value27: Dynamic =
          value26 !== null && element.contains(value26.field);
        let value28: Dynamic = value26?.prev
          ? value23.indexOf(value26.prev)
          : null;
        let value29: Dynamic = value26?.next
          ? value23.indexOf(value26.next)
          : null;
        let value30: Dynamic =
          value26 === null ||
          value27 ||
          value25 ||
          value28 === -1 ||
          value29 === -1
            ? undefined
            : value23
                .slice((value28 ?? -1) + 1, value29 ?? undefined)
                .find(
                  (input?: Dynamic, ..._extraArguments: unknown[]) =>
                    !current2.includes(input),
                );
        let value31: Dynamic =
          current === null
            ? value24
            : value25
              ? (resolveRovingToolbarIndexOf(current2, current, value23) ??
                value24)
              : (value30 ?? current);
        let value32: Dynamic = value27
          ? value26.field
          : value25 && value14.current.standInFields === true
            ? activeElement
            : null;
        value12.current = null;
        if (
          value32 !== null &&
          element.contains(value32) &&
          resolveRovingToolbarClosest2(element, value32)
        ) {
          let index: Dynamic = value23.findIndex(
            (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              value32.compareDocumentPosition(input) &
              value32.DOCUMENT_POSITION_FOLLOWING,
          );
          let value35: Dynamic = value23[index] ?? null;
          let value36: Dynamic =
            index === 0
              ? null
              : (value23.at(index === -1 ? -1 : index - 1) ?? null);
          if (
            value27 ||
            (value32 === value13.current &&
              (value31 === value35 || value31 === value36))
          ) {
            value12.current = {
              field: value32,
              to: value31,
              prev: value36,
              next: value35,
            };
          }
        }
        if (value25 && !value9.current && current2.includes(value31)) {
          value10.current = false;
        }
        let value33: Dynamic =
          value14.current.firstUntilFocused === true && !value10.current;
        let value34: Dynamic =
          current === null || (value33 && !(value25 && value4.current !== null))
            ? (value23.find(
                (input?: Dynamic, ..._extraArguments: unknown[]) =>
                  !value11.current.has(input),
              ) ?? value24)
            : value31;
        value15(value23, value34);
        if (
          value25 &&
          value9.current &&
          !isUnfocusedEmbeddedDocument(ownerDocument) &&
          (activeElement === null ||
            activeElement === ownerDocument.body ||
            activeElement === element ||
            (activeElement === current &&
              (current.matches(`:disabled`) ||
                (value14.current.softDisabled === true &&
                  (current.matches(RovingToolbarStyles4) ||
                    resolveRovingToolbarClosest(element, current))))))
        ) {
          let value35: Dynamic = resolveRovingToolbarVisibilityProperty(value34)
            ? value34
            : resolveRovingToolbarIndexOf(
                value23,
                value34,
                value23.filter(resolveRovingToolbarVisibilityProperty),
              );
          if (value35 !== undefined && value35 !== value34) {
            value15(value23, value35);
          }
          value35?.focus({
            preventScroll: true,
          });
        }
      }
      value9.current = element.contains(ownerDocument.activeElement);
      if (value9.current) {
        value10.current = true;
      }
    },
    [value15],
  );
  let value18: Dynamic = (0, React.useCallback)(
    (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value3.current?.disconnect();
      value3.current = null;
      value4.current?.disconnect();
      value4.current = null;
      value5.current?.abort();
      value5.current = null;
      value.current = element;
      if (!element) return;
      if (element !== value2.current) {
        value2.current = element;
        value6.current = null;
        value7.current = [];
        value9.current = false;
        value10.current = false;
        value12.current = null;
        value11.current = new (WeakSet as Dynamic)();
      }
      value14.current =
        rovingToolbarWeakMap.get(element) ?? RovingToolbarState2;
      value5.current = new ((element.ownerDocument.defaultView
        ?.AbortController ?? AbortController) as Dynamic)();
      let { signal: current }: Dynamic = value5.current;
      element.addEventListener(
        `focusin`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value9.current = true;
          value10.current = true;
          if (value14.current.standInFields !== true) return;
          if (event.target !== value12.current?.field) {
            value12.current = null;
          }
          let { target: value24 }: Dynamic = event;
          value13.current = value24;
          queueMicrotask((..._extraArguments: unknown[]): undefined => {
            if (value13.current === value24) {
              value13.current = null;
            }
          });
        },
        {
          signal: current,
        },
      );
      element.addEventListener(
        `focusout`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let value24: Dynamic = resolveUiProviderAndLayersValue2(
            event.relatedTarget,
          );
          if (value24 !== null) {
            value9.current = element.contains(value24);
            return;
          }
          let value25: Dynamic = resolveUiProviderAndLayersValue2(event.target);
          queueMicrotask((..._extraArguments: unknown[]): undefined => {
            if (value.current === element) {
              if (
                value25 !== null &&
                isRovingToolbarSoftDisabled(
                  element,
                  value8.current,
                  value14.current,
                ).includes(value25)
              ) {
                value9.current = element.contains(
                  element.ownerDocument.activeElement,
                );
              } else {
                value17(element);
              }
            }
          });
        },
        {
          signal: current,
        },
      );
      let defaultView: Dynamic = element.ownerDocument.defaultView;
      let value23: Dynamic = resolveUiOverlaysAndIconsValue(element);
      if (
        defaultView !== null &&
        value23 !== undefined &&
        value14.current.watchHidden === true
      ) {
        let index: Dynamic = 0;
        value4.current = createSafeResizeObserver(
          value23,
          (..._extraArguments: unknown[]): undefined => {
            defaultView.cancelAnimationFrame(index);
            index = defaultView.requestAnimationFrame(
              (..._extraArguments: unknown[]): Dynamic => value16(element),
            );
          },
        );
        current.addEventListener(
          `abort`,
          (..._extraArguments: unknown[]): Dynamic =>
            defaultView.cancelAnimationFrame(index),
        );
      }
      value17(element);
      value3.current = createSafeMutationObserver(
        MutationObserver,
        (..._extraArguments: unknown[]): Dynamic => value17(element),
      );
      value3.current.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter:
          value14.current.softDisabled === true
            ? [`disabled`, `inert`, `data-disabled`]
            : [`disabled`, `inert`],
      });
    },
    [value17, value16],
  );
  let value19: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value.current;
      if (!current) return;
      let target: Dynamic = event.target;
      if (target === value6.current) return;
      let value23: Dynamic = isRovingToolbarSoftDisabled(
        current,
        value8.current,
        value14.current,
      );
      if (value23.includes(target)) {
        value15(value23, target);
      }
    },
    [value15],
  );
  let value20: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value.current;
      if (
        !current ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !current.contains(event.target) ||
        resolveRovingToolbarClosest2(current, event.target)
      )
        return;
      let value23: Dynamic = isRovingToolbarSoftDisabled(
        current,
        value8.current,
        value14.current,
      );
      let filtered: Dynamic = value23.filter(
        resolveRovingToolbarVisibilityProperty,
      );
      let value24: Dynamic = value23.indexOf(
        current.ownerDocument.activeElement,
      );
      let value25: Dynamic = (
        input?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        value24 === -1
          ? filtered[0]
          : value23
              .map(
                (
                  input2?: unknown,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  value23[
                    (value24 +
                      input * (options + 1) +
                      value23.length * (options + 1)) %
                      value23.length
                  ],
              )
              .find(
                (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  input2 !== undefined && filtered.includes(input2),
              );
      let value26: Dynamic =
        current.ownerDocument.defaultView?.getComputedStyle(current)
          .direction === `rtl`
          ? -1
          : 1;
      let value27: Dynamic;
      switch (event.key) {
        case `ArrowRight`:
          value27 = value25(value26);
          break;
        case `ArrowLeft`:
          value27 = value25(-value26);
          break;
        case `Home`:
          value27 = filtered[0];
          break;
        case `End`:
          value27 = filtered.at(-1);
          break;
        default:
          return;
      }
      if (value27 !== undefined) {
        event.preventDefault();
        value15(value23, value27);
        value27.focus();
      }
    },
    [value15],
  );
  let value21: Dynamic = (0, React.useRef)(null);
  let value22: Dynamic = (0, React.useRef)(null);
  return {
    ref: (0, React.useCallback)(
      (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        value18(element);
        value21.current?.abort();
        value21.current = null;
        if (
          element === null ||
          rovingToolbarWeakMap.get(element)?.portaledItems !== true
        )
          return;
        let ownerDocument: Dynamic = element.ownerDocument;
        let value23: Dynamic =
          ownerDocument.defaultView?.AbortController ?? AbortController;
        value21.current = new (value23 as Dynamic)();
        let { signal: current }: Dynamic = value21.current;
        element.addEventListener(`focusin`, value19, {
          signal: current,
        });
        let value24 = (
          input?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (element.contains(ownerDocument.activeElement)) {
            value20(input);
          }
        };
        ownerDocument.addEventListener(
          `keydown`,
          (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!input.cancelBubble) {
              value24(input);
            }
          },
          {
            signal: current,
          },
        );
        let value25: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          value22.current?.abort();
        let value26 = (
          input?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (input.cancelBubble) {
            value25();
            value24(input);
          } else {
            if (input.currentTarget === element) {
              value25();
            }
          }
        };
        element.addEventListener(
          `keydown`,
          (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            value25();
            if (!rovingToolbarPattern.test(input.key)) return;
            value22.current = new (value23 as Dynamic)();
            let value27: Dynamic = input.composedPath();
            for (let value28 of value27.slice(
              0,
              value27.indexOf(element) + 1,
            ) as Dynamic)
              value28.addEventListener(`keydown`, value26, {
                signal: value22.current.signal,
              });
          },
          {
            capture: true,
            signal: current,
          },
        );
      },
      [value18, value19, value20],
    ),
    onKeyDown: value20,
    onFocus: value19,
  };
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeRovingToolbarStep1(): void {
  rovingToolbarWeakMap = new (WeakMap as Dynamic)();
  RovingToolbarStyles = `button:not([disabled]), a[href], [role="button"]`;
  RovingToolbarState = `${RovingToolbarStyles}, [tabindex]`;
  RovingToolbarStyles2 = `input:not([type="checkbox"], [type="button"], [type="submit"], [type="reset"], [type="image"]), textarea, select, [role="textbox"], [role="searchbox"], [role="spinbutton"], [role="slider"]`;
  RovingToolbarStyles3 = `[role="tablist"], [role="radiogroup"], [role="menubar"], [role="toolbar"], [contenteditable]:not([contenteditable="false"]), [data-cds="TextInput"], [data-cds="NumberInput"], [data-cds="DateInput"]`;
  RovingToolbarStyles4 = `:is([role="switch"], [role="checkbox"])[data-disabled]:not([data-disabled="false"], button)`;
  RovingToolbarState2 = {};
  rovingToolbarPattern = /^(?:ArrowLeft|ArrowRight|Home|End)$/;
}

export { isUnfocusedEmbeddedDocument, useRovingToolbar };

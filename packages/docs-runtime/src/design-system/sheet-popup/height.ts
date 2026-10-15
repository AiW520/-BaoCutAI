/** BaoCut: sheet popup height from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { React, UiDesignSystemUseLayoutEffect } from "../dependencies";
import { isReducedMotion } from "../presentation";
import {
  SheetsState2,
  resolveSheetsGet,
  resolveSheetsHeight,
  resolveSheetsInnerHeight,
  resolveSheetsRest,
  resolveSheetsSlide,
  resolveSheetsTall2,
  sheetsValue0_9,
} from "../sheets/geometry";
import { SheetsCreateContext } from "../sheets/gestures";
import { SheetsMessage2 } from "../sheets/stack";

function resolveLabeledFieldsTransition(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  input.style.transition = ``;
  input.style.translate = ``;
}

function useLabeledFieldsHeight(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = (0, React.useContext)(SheetsCreateContext);
  let [value2]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => ({}),
  );
  let [value3]: Dynamic = (0, React.useState)(resolveSheetsGet);
  let value4: Dynamic = value?.drag ?? value3;
  let value5: Dynamic = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    value === null
      ? []
      : Array.from<Dynamic>(
          element.ownerDocument.querySelectorAll(
            `[data-presentation="sheet"][data-sheet-tree="${CSS.escape(value.treeId)}"]:not([data-ending-style])`,
          ),
        );
  let value6 = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let {
      height: value13,
      slide: value14,
      shown: value15,
    }: Dynamic = resolveSheetsHeight(input, input.raw - options);
    for (let { el: value17 } of input.sheets as Dynamic) {
      value17.style.height = `${value13}px`;
      value17.style.translate = value14 > 0 ? `0 ${value14}px` : ``;
    }
    let value16: Dynamic = value15 < 1 ? value15.toFixed(3) : ``;
    for (let value17 of input.scrims as Dynamic)
      if (value17.style.opacity !== value16) {
        value17.style.opacity = value16;
      }
  };
  let value7 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (
      value === null ||
      !value.open ||
      event.button !== 0 ||
      value4.get() !== null ||
      value.keyboard !== null ||
      (event.target instanceof (Element as Dynamic) &&
        event.target.closest(
          `button, a, input, textarea, [role="menuitem"], [role="option"], [data-cds-sheet-control]`,
        ) !== null) ||
      event.currentTarget.closest(`[data-cds-sheet-covered]`) !== null
    )
      return;
    let value13: Dynamic = event.currentTarget.closest(
      `[data-presentation="sheet"]`,
    );
    if (value13 === null) return;
    let bounds: Dynamic = value13.getBoundingClientRect();
    let height: Dynamic = bounds.height;
    let value14: Dynamic =
      value13.parentElement?.getBoundingClientRect().bottom;
    let value15: number = Math.max(
      0,
      bounds.bottom - (value14 ?? bounds.bottom),
    );
    let defaultView: Dynamic = value13.ownerDocument.defaultView;
    let value16: Dynamic =
      defaultView === null
        ? height
        : resolveSheetsInnerHeight(defaultView, value13);
    event.currentTarget.setPointerCapture(event.pointerId);
    let mapped: Dynamic = value5(value13).map(
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let height2: Dynamic = input.style.height;
        input.style.transition = `none`;
        input.style.height = `${height}px`;
        return {
          el: input,
          height: height2,
        };
      },
    );
    let value17: Dynamic = value.canGrow || value.detent === `tall`;
    let value18: Dynamic = resolveSheetsRest(
      Math.min(value.height ?? height, height),
      value16,
      sheetsValue0_9,
      value17,
    );
    let value19: Dynamic =
      isReducedMotion() || !value17
        ? {
            ...value18,
            room: 0,
          }
        : value18;
    let value20: Dynamic = Array.from<Dynamic>(
      value13.ownerDocument.querySelectorAll(
        `[data-presentation="sheet"][data-sheet-scrim="${CSS.escape(value.treeId)}"]`,
      ),
    );
    for (let value21 of value20 as Dynamic) value21.style.transition = `none`;
    let state: Dynamic = {
      owner: value2,
      pointerId: event.pointerId,
      startY: event.clientY,
      lastY: event.clientY,
      lastT: event.timeStamp,
      velocity: 0,
      detent: value.detent,
      raw: resolveSheetsTall2(value19, height, value15),
      caughtSlide: value15,
      ...value19,
      sheets: mapped,
      doc: value13.ownerDocument,
      scrims: value20,
    };
    value4.set(state);
    value6(state, 0);
  };
  let value8 = (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let entry: Dynamic = value4.get();
    if (
      entry === null ||
      entry.owner !== value2 ||
      input.pointerId !== entry.pointerId
    )
      return;
    let value13: number = input.timeStamp - entry.lastT;
    if (value13 > 0) {
      entry.velocity = (input.clientY - entry.lastY) / value13;
    }
    entry.lastY = input.clientY;
    entry.lastT = input.timeStamp;
    value6(entry, input.clientY - entry.startY);
  };
  let value9 = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let { el: value13, height: value14 } of input.sheets as Dynamic) {
      value13.style.transition = ``;
      if (options) {
        value13.style.translate = `0 ${SheetsMessage2}`;
      } else {
        value13.style.height = value14;
        value13.style.translate = ``;
      }
    }
    for (let value13 of input.scrims as Dynamic) {
      value13.style.transition = ``;
      value13.style.opacity = ``;
    }
  };
  let value10: Dynamic = value?.open ?? false;
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let entry: Dynamic = value4.get();
      if (!value10 && entry !== null && entry.owner === value2) {
        value4.set(null);
        value9(entry, false);
      }
    },
    [value10, value4, value2],
  );
  let value11: Dynamic = (0, React.useRef)({
    open: false,
    height: undefined,
    detent: `default`,
  });
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      value11.current = {
        open: value?.open ?? false,
        height: value?.height,
        detent: value?.detent ?? `default`,
      };
    },
    [value],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        let entry: Dynamic = value4.get();
        if (entry !== null && entry.owner === value2) {
          value4.set(null);
          value9(entry, false);
        }
      },
    [value4, value2],
  );
  let value12 = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let entry: Dynamic = value4.get();
    if (
      entry === null ||
      entry.owner !== value2 ||
      value === null ||
      input.pointerId !== entry.pointerId
    )
      return;
    value4.set(null);
    if (input.currentTarget.hasPointerCapture(input.pointerId)) {
      input.currentTarget.releasePointerCapture(input.pointerId);
    }
    let value13: number = entry.lastY - entry.startY;
    let value14: Dynamic =
      input.timeStamp - entry.lastT > 100 ? 0 : entry.velocity;
    let { dismiss: value15, detent: value16 }: Dynamic = resolveSheetsSlide(
      entry,
      {
        detent: entry.detent,
        rawAtGrab: entry.raw,
        rawAtRelease: entry.raw - value13,
        caughtSlide: entry.caughtSlide,
        velocity: value14,
        commit: options,
      },
    );
    value9(entry, value15);
    if (value15) {
      value.dismiss();
      let { doc: value17 }: Dynamic = entry;
      value17.defaultView?.requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          let current: Dynamic = value11.current;
          if (!current.open) return;
          let value18: Dynamic =
            current.detent === `tall`
              ? SheetsState2
              : current.height === undefined
                ? ``
                : `${current.height}px`;
          for (let value19 of value17.querySelectorAll(
            `[data-sheet-tree="${CSS.escape(value.treeId)}"][data-presentation="sheet"]`,
          ) as Dynamic) {
            resolveLabeledFieldsTransition(value19);
            value19.style.height = value18;
          }
        },
      );
    } else if (value16 !== entry.detent) {
      value.setDetent(value16);
    }
  };
  return {
    onPointerDown: value7,
    onPointerMove: value8,
    onPointerUp: (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      value12(input, true),
    onPointerCancel: (
      input?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => value12(input, false),
    onLostPointerCapture: (
      input?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => value12(input, false),
  };
}

export { resolveLabeledFieldsTransition, useLabeledFieldsHeight };

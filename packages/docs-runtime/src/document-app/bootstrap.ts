/** BaoCut: bootstrap from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  loadJsxRuntime,
  loadReact,
  loadReactDomClient,
  toModuleNamespace as weather,
} from "./dependencies";

const mapPreloadDependencies: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => [];

var React: Dynamic;

var jsxRuntime: Dynamic;

var ReactRouter: Dynamic;

var BOTTOM_SHEET_SCRIM_CLASS: string;

var PHONE_TOUCH_TARGET_CLASS: string;

var PHONE_EDIT_BUTTON_CLASS: string;

var BOTTOM_SHEET_CLEAR_PROPERTY: string;

var PHONE_TOAST_POSITION_CLASS: string;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeBootstrapStep1(): void {
  (function (..._extraArguments: unknown[]): undefined {
    let relList = document.createElement(`link`).relList;
    if (relList && relList.supports && relList.supports(`modulepreload`)) return;
    for (let localResult of document.querySelectorAll(
      `link[rel="modulepreload"]`,
    ) as Dynamic)
      localHandler2(localResult);
    new MutationObserver(
      (callback?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        for (let localResult of callback as Dynamic)
          if (localResult.type === `childList`)
            for (let localResult2 of localResult.addedNodes as Dynamic)
              if (
                localResult2.tagName === `LINK` &&
                localResult2.rel === `modulepreload`
              ) {
                localHandler2(localResult2);
              }
      },
    ).observe(document, {
      childList: true,
      subtree: true,
    });
    function localHandler(
      callback?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let record: Dynamic = {};
      if (callback.integrity) {
        record.integrity = callback.integrity;
      }
      if (callback.referrerPolicy) {
        record.referrerPolicy = callback.referrerPolicy;
      }
      if (callback.crossOrigin === `use-credentials`) {
        record.credentials = `include`;
      } else {
        if (callback.crossOrigin === `anonymous`) {
          record.credentials = `omit`;
        } else {
          record.credentials = `same-origin`;
        }
      }
      return record;
    }
    function localHandler2(
      callback?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (callback.ep) return;
      callback.ep = true;
      let localHandler3: Dynamic = localHandler(callback);
      fetch(callback.href, localHandler3);
    }
  })();
  (React = weather(loadReact(), 1));
  (jsxRuntime = loadJsxRuntime());
  (ReactRouter = loadReactDomClient());
  (BOTTOM_SHEET_SCRIM_CLASS = `bottom-sheet-scrim`);
  (PHONE_TOUCH_TARGET_CLASS = `size-11`);
  (PHONE_EDIT_BUTTON_CLASS = `[&_:is([data-cds-part=edit-field],[data-cds-part=delete-confirm])_[data-cds=Button]:not([data-cds-icon-only])]:min-h-11`);
  (BOTTOM_SHEET_CLEAR_PROPERTY = `--bottom-sheet-clear`);
  (PHONE_TOAST_POSITION_CLASS = `top-auto! bottom-[max(1rem,min(calc(var(--bottom-sheet-clear,0px)+0.5rem),calc(100dvh-6rem)))]!`);
}

export {
  BOTTOM_SHEET_CLEAR_PROPERTY,
  BOTTOM_SHEET_SCRIM_CLASS,
  PHONE_EDIT_BUTTON_CLASS,
  PHONE_TOAST_POSITION_CLASS,
  PHONE_TOUCH_TARGET_CLASS,
  React,
  ReactRouter,
  jsxRuntime,
  mapPreloadDependencies,
};

/** BaoCut: connection and errors from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  mapPreloadDependencies,
} from "../bootstrap";
import {
  preloadModule,
  resolvePlatformLoadingAndStatusCatch,
} from "../dependencies";

var loadBottomSheetModule: Dynamic;

var REACT_FORWARD_REF_SYMBOL: symbol;

var REACT_MEMO_SYMBOL: symbol;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeConnectionAndErrorsShared2Step1(): void {
  (loadBottomSheetModule = resolvePlatformLoadingAndStatusCatch(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic => import("../../design-system/sheets/bottom-sheet"),
        mapPreloadDependencies([11, 1, 0, 2, 3]),
        import.meta.url,
      ),
  ));
  (REACT_FORWARD_REF_SYMBOL = Symbol.for(`react.forward_ref`));
  (REACT_MEMO_SYMBOL = Symbol.for(`react.memo`));
}

export {
  REACT_FORWARD_REF_SYMBOL,
  REACT_MEMO_SYMBOL,
  loadBottomSheetModule,
};

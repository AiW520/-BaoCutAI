/** BaoCut: phone overlays from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  loadBottomSheetModule,
} from "../connection-and-errors/shared";
import {
  validateBottomSheetModule,
} from "./export-progress-dialog";

var loadedBottomSheetModule: Dynamic;

var bottomSheetLoadPromise: Dynamic;

var ensureBottomSheetLoaded: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializePhoneOverlaysShared1Step1(): void {
  (ensureBottomSheetLoaded = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (bottomSheetLoadPromise ??= loadBottomSheetModule()
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (loadedBottomSheetModule = validateBottomSheetModule(result)),
      )
      .catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw ((bottomSheetLoadPromise = undefined), error);
      })));
}

export {
  ensureBottomSheetLoaded,
  loadedBottomSheetModule,
};

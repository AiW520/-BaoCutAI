/** BaoCut: phone overlays from index-CX4IZqzA.js. */
import {
  loadBottomSheetModule,
} from "../connection-and-errors/shared";
import {
  validateBottomSheetModule,
} from "./export-progress-dialog";

import type { BottomSheetModule } from "./export-progress-dialog";

var loadedBottomSheetModule: BottomSheetModule | undefined;

var bottomSheetLoadPromise: Promise<BottomSheetModule> | undefined;

var ensureBottomSheetLoaded: (...args: unknown[]) => Promise<BottomSheetModule>;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializePhoneOverlaysShared1Step1(): void {
  (ensureBottomSheetLoaded = (
    ..._extraArguments: unknown[]
  ): Promise<BottomSheetModule> =>
    (bottomSheetLoadPromise ??= loadBottomSheetModule()
      .then(
        (result, ..._extraArguments: unknown[]) =>
          (loadedBottomSheetModule = validateBottomSheetModule(result)),
      )
      .catch((error: unknown, ..._extraArguments: unknown[]): never => {
        throw ((bottomSheetLoadPromise = undefined), error);
      })));
}

export { ensureBottomSheetLoaded, loadedBottomSheetModule };

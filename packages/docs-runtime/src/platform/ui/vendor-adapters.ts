/** BaoCut: ui vendor adapters from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  clearUiLinksAndFoundationSubscribers,
} from "./links-and-foundation";

var resolveUiVendorAdaptersValue: Dynamic;

var resolveUiVendorAdaptersValue2: (..._extraArguments: unknown[]) => string;

var isUiVendorAdaptersValue: (..._extraArguments: unknown[]) => boolean;

var resolveUiVendorAdaptersValue3: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiVendorAdaptersStep1(): void {
  (resolveUiVendorAdaptersValue = (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined => {});
  (resolveUiVendorAdaptersValue2 = (..._extraArguments: unknown[]) => `web`);
  (isUiVendorAdaptersValue = (..._extraArguments: unknown[]) => false);
  (resolveUiVendorAdaptersValue3 = (
    uiVendorAdaptersValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let clearUiLinksAndFoundationSubscribers2: Dynamic =
      clearUiLinksAndFoundationSubscribers(uiVendorAdaptersValue3);
    queueMicrotask(uiVendorAdaptersValue3);
    return clearUiLinksAndFoundationSubscribers2;
  });
}

export {
  isUiVendorAdaptersValue,
  resolveUiVendorAdaptersValue,
  resolveUiVendorAdaptersValue2,
  resolveUiVendorAdaptersValue3,
};

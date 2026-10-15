import type { Dynamic } from "./types";

/** BaoCut: keep class method descriptors and original prototype key order. */
export function installOperationNodeMethods(
  prototype: Dynamic,
  groups: Record<string, Dynamic>[],
): void {
  for (const methods of groups) {
    const descriptors = Object.getOwnPropertyDescriptors(methods);
    for (const descriptor of Object.values(descriptors))
      descriptor.enumerable = false;
    Object.defineProperties(prototype, descriptors);
  }
}

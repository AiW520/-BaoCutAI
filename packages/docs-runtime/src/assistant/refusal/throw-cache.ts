import { isRecord } from "./reply-facts";

/** Correlate one thrown transport error with its request and optional operation ID. */
export function createRefusalThrowCache() {
  const requests = new WeakMap<object, unknown>();
  const operations = new Map<string, unknown>();
  return {
    remember(request: unknown, error: unknown): void {
      if (!isRecord(request)) return;
      requests.set(request, error);
      if (typeof request.opId === "string") operations.set(request.opId, error);
    },
    consume(request: unknown, opId: string | undefined): unknown {
      let error: unknown;
      if (isRecord(request) && requests.has(request)) {
        error = requests.get(request);
        requests.delete(request);
      }
      if (opId !== undefined && operations.has(opId)) {
        error ??= operations.get(opId);
        operations.delete(opId);
      }
      return error;
    },
    clear(): void {
      operations.clear();
    },
  };
}

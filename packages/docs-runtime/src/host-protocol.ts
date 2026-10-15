import type { BridgeReply, BridgeWatch } from "./type-models/host";
import type { UnknownRecord } from "./type-models/common";

/** Route a one-shot reply or a persistent watch notification without trusting its payload. */
export function deliverBridgeReply(
  input: unknown,
  pending: Map<number, (reply: BridgeReply) => void>,
  watches: Map<number, BridgeWatch>,
): void {
  if (!input || typeof input !== "object") return;
  const record = input as UnknownRecord;
  if (typeof record.id !== "number") return;
  const watch = watches.get(record.id);
  if (watch) {
    const value = record.ok ? record.value : undefined;
    // JS property lookup boxes primitives; preserve the original optional __err convention.
    const error = record.ok
      ? value == null
        ? undefined
        : (value as { readonly __err?: unknown }).__err
      : record.error;
    watch(error ? undefined : value, error);
    return;
  }
  const receive = pending.get(record.id);
  if (!receive) return;
  pending.delete(record.id);
  receive(
    record.ok
      ? { ok: true, value: record.value }
      : {
          ok: false,
          error: typeof record.error === "string" ? record.error : "malformed",
        },
  );
}

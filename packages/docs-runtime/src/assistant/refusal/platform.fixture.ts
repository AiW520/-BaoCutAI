import type { OperationBirth, RefusalReply, WriteSampler } from "./contracts";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Headless platform ports for refusal-policy and observer tests. */
export function isDataOperationControlDeny2(reply: RefusalReply): boolean {
  const data = record(reply.data) ? reply.data : {};
  return (
    reply.verdict === "deny" &&
    (data.outcome === "unknown" ||
      ("outcome" in reply && reply.outcome === "unknown") ||
      ((reply.status === 503 || reply.status === 504) &&
        typeof data.was === "string" &&
        ["ledger-busy", "forward-timeout", "hop-timeout"].includes(data.was)))
  );
}
export function resolveDataOperationControlIdInvalid(
  reply: RefusalReply,
  data: Record<string, unknown>,
): boolean {
  return (
    reply.reason === "id_invalid" ||
    data.code === "id_invalid" ||
    data.was === "id_invalid" ||
    /\bproposed ids: [a-z_]+/.test(`${String(data.detail)} ${String(reply.detail)}`)
  );
}
export const observabilityTelemetryPattern27 = /^[a-z0-9_:.-]{1,32}$/;
export const observabilityTelemetryPattern28 = /^[a-z0-9_:.-]{1,48}$/;
export const observabilityTelemetrySet22 = new Set(["none", "other"]);
export const observabilityTelemetrySet18 = new Set([
  "dead",
  "network",
  "timeout",
  "reset",
  "http_4xx",
  "http_5xx",
  "unknown",
]);
export const PlatformLiveDocumentAndHistoryValues: readonly string[] = [];
export const PlatformLiveDocumentAndHistoryUnsaid = "unsaid";
export const PlatformLiveDocumentAndHistoryOther = "other";
export const isPlatformAnnouncementsFlatMap = () => new Set<string>();
export const updatePlatformLiveDocumentAndHistoryTake = (): WriteSampler => ({
  take: () => undefined,
});
export const collectPlatformLiveDocumentAndHistoryAutoLift = () => undefined;
export const resolvePlatformLiveDocumentAndHistoryNone = () => undefined;
export const resolvePlatformLiveDocumentAndHistoryTest4 = () => undefined;
export const isPlatformLiveDocumentAndHistoryInsert = () => undefined;
export const resolvePlatformLiveDocumentAndHistoryAsking = () => "anchors_affected";
export const resolvePlatformLiveDocumentAndHistoryPayload3 = () => undefined;
export const resolvePlatformLiveDocumentAndHistoryValue9 = () => "unsaid";
export function filterPlatformLiveDocumentAndHistoryPayload(
  value: unknown,
): readonly unknown[] {
  return record(value) && Array.isArray(value.payload) ? value.payload : [];
}
export function resolvePlatformLiveDocumentAndHistoryCell(
  value: unknown,
): OperationBirth | undefined {
  if (!record(value) || typeof value.g !== "string") return undefined;
  return { g: value.g, cell: value.cell === true, cross: value.cross === true };
}
export function resolvePlatformLiveDocumentAndHistoryValue8(
  value: OperationBirth | undefined,
): boolean {
  return value?.cell === true;
}
export function resolvePlatformLiveDocumentAndHistoryGesture(value: {
  gesture: string;
  need: string;
  ops: number;
}): string {
  return `${value.gesture}:${value.need}:${value.ops}`;
}

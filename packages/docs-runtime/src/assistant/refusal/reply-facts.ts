import { isDataOperationControlDeny2 } from "../../platform/index";
import type { RefusalReply } from "./contracts";
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value == `object` && !!value && !Array.isArray(value);
const stringOrUndefined = (value: unknown): string | undefined =>
  typeof value == `string` ? value : undefined;
const pageGoneCertainty = (reply: RefusalReply) => {
  if (reply.verdict !== `deny`) return null;
  const data = isRecord(reply.data) ? reply.data : {};
  return (reply.reason === `gone` || data.code === `gone`) && data.object === `project`
    ? {
        sure: true,
      }
    : data.code !== `page_gone` && reply.reason !== `page_gone`
      ? null
      : {
          sure: data.maybe !== `unborn`,
        };
};
const isNodeGoneReply = (reply: RefusalReply, nodeId: string | undefined): boolean => {
  if (reply.verdict !== `deny`) return false;
  const data = isRecord(reply.data) ? reply.data : {};
  return (
    (reply.reason === `gone` || data.code === `gone`) &&
    data.object === `node` &&
    (data.id === undefined || data.id === nodeId)
  );
};
const ledgerConflictDetail = (reply: RefusalReply): null | number => {
  if (reply.verdict !== `deny` || isDataOperationControlDeny2(reply)) return null;
  const data = isRecord(reply.data) ? reply.data : {};
  const detail: string = [reply.detail, data.detail, data.message]
    .filter((input2) => typeof input2 == `string`)
    .join(` `)
    .trim();
  const code: string = String(data.code ?? reply.code ?? ``);
  if (
    !(
      (reply.reason === `conflict` && /^ledger[-_]busy/.test(detail)) ||
      /^ledger[-_]busy$/.test(code) ||
      (reply.error === `busy` && /ledger[-_]busy/.test(code))
    )
  )
    return null;
  const retryAfterMs: number = Number(data.retryAfterMs ?? reply.retryAfterMs ?? 0);
  return Number.isFinite(retryAfterMs) && retryAfterMs > 0 ? retryAfterMs : 0;
};
export {
  isNodeGoneReply,
  isRecord,
  ledgerConflictDetail,
  pageGoneCertainty,
  stringOrUndefined,
};

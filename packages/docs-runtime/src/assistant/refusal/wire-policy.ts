import type {
  RefusalClassification,
  RefusalContext,
  RefusalReply,
  RefusalScope,
  RetryKind,
} from "./contracts";
import { stringOrUndefined } from "./reply-facts";
import {
  adaptClassificationToRoad,
  attachRefusalMetadata,
  classifyRetryContract,
  defaultRetryLimit,
} from "./retry-policy";
import { resolveReasonAlias, TRANSIENT_RETRY_MAX } from "./row-index";
const frontendTransportLayers = new Set([`relay`, `http`, `link`, `lane`]);
const allowedRetryKinds = new Set([
  `never`,
  `reread`,
  `rehandshake`,
  `counter`,
  `bounded`,
  `transient`,
  `lost`,
]);
const allowedRefusalScopes = new Set([`op`, `node`, `link`, `page`, `session`]);
function isRetryKind(value: string): value is RetryKind {
  return allowedRetryKinds.has(value);
}
function isRefusalScope(value: string): value is RefusalScope {
  return allowedRefusalScopes.has(value);
}
export function classifyWireContract(
  reply: RefusalReply,
  data: Record<string, unknown>,
  context: RefusalContext,
  reason: string,
  layer: string | undefined,
): RefusalClassification | null {
  const road = context.road;
  const doorLayer: boolean = layer === undefined || !frontendTransportLayers.has(layer);
  if (
    doorLayer &&
    typeof data.retry != `string` &&
    (data.transient === true || reply.transient === true)
  ) {
    const value7 = resolveReasonAlias(reason, data);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        {
          k: `transient`,
          max: TRANSIENT_RETRY_MAX,
          redial: false,
        },
        `link`,
        road,
        reason,
      ),
      value7?.row ?? {
        scope: `link`,
        words: null,
        surfaces: `quiet`,
      },
      reason,
      `wire`,
      `transient`,
    );
  }
  if (doorLayer && typeof data.retry == `string` && isRetryKind(data.retry)) {
    const value7 =
      typeof data.scope == `string` && isRefusalScope(data.scope) ? data.scope : `op`;
    const retry = data.retry;
    const value8 =
      typeof data.max == `number` && data.max > 0
        ? data.max
        : typeof data.retryMax == `number` && data.retryMax > 0
          ? data.retryMax
          : defaultRetryLimit(retry);
    const value9 = resolveReasonAlias(reason, data);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract({
          retry,
          scope: value7,
          max: value8,
          redial: data.redial === true,
          face: stringOrUndefined(data.face),
          custody: stringOrUndefined(data.custody),
        }),
        value7,
        road,
        reason,
      ),
      value9?.row ?? {
        scope: value7,
        words: null,
        surfaces: `generic`,
      },
      reason,
      `wire`,
      value9?.sub,
    );
  }
  return null;
}

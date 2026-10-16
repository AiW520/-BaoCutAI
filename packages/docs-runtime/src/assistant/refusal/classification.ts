import { resolveDataOperationControlIdInvalid } from "../../platform/index";
import { classifyAvailability } from "./availability-policy";
import type {
  RefusalClassification,
  RefusalContext,
  RefusalReply,
  RefusalSource,
} from "./contracts";
import { isRecord, stringOrUndefined } from "./reply-facts";
import {
  adaptClassificationToRoad,
  adjustReplayedWriteCustody,
  attachRefusalMetadata,
  classifyRetryContract,
} from "./retry-policy";
import {
  fallbackRefusalRow,
  getReasonMatch,
  refusalAliases,
  resolveReasonAlias,
} from "./row-index";
import {
  classifyInvalidIds,
  classifySessionRefusal,
  sessionRefusalPattern,
} from "./session-refusals";
import { classifyUnreachable } from "./unreachable-policy";
import { classifyWireContract } from "./wire-policy";
function classifyRefusal(
  reply: RefusalReply,
  context: RefusalContext,
): RefusalClassification {
  const classification = classifyRefusalCore(reply, context);
  return context.road === `write` && context.replayed === true
    ? {
        ...classification,
        ...adjustReplayedWriteCustody(classification),
      }
    : classification;
}
function classifyRefusalCore(
  reply: RefusalReply,
  context: RefusalContext,
): RefusalClassification {
  const road = context.road;
  const data = isRecord(reply.data) ? reply.data : {};
  if (reply.verdict === `allow`)
    return attachRefusalMetadata(
      {
        k: `op_terminal`,
        custody: `none`,
      },
      null,
      `allow`,
      `local`,
    );
  if (reply.verdict !== "deny") return classifyUnreachable(reply, context);
  const reason = stringOrUndefined(reply.reason) ?? `denied`;
  const layer = stringOrUndefined(data.layer);
  const wire = classifyWireContract(reply, data, context, reason, layer);
  if (wire !== null) return wire;
  const availability = classifyAvailability(reply, data, context, reason, layer);
  if (availability !== null) return availability;
  if (sessionRefusalPattern.test(`${reason} ${String(data.code)}`))
    return classifySessionRefusal(reply, data, context, reason);
  if (resolveDataOperationControlIdInvalid(reply, data))
    return classifyInvalidIds(reply, data, context);
  if (
    reason === `index_gap` ||
    data.code === `index_gap` ||
    refusalAliases.get(reason)?.reason === `index_gap`
  ) {
    const entry = getReasonMatch(`index_gap`, `*`);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        [data.nextIndex, reply.nextIndex].some((input) => typeof input == `number`)
          ? {
              k: `counter`,
            }
          : {
              k: `reread_once`,
              after: `assert`,
            },
        `op`,
        road,
        `index_gap`,
      ),
      entry.row,
      `index_gap`,
      `table`,
    );
  }
  let match =
    (reason === `bad_request`
      ? resolveReasonAlias(stringOrUndefined(data.was), data)
      : null) ??
    resolveReasonAlias(stringOrUndefined(data.code), data) ??
    resolveReasonAlias(reason, data);
  if (
    match &&
    match.row.reason === `unavailable` &&
    match.sub === `room` &&
    /^busy:/i.test(
      stringOrUndefined(reply.detail) ?? stringOrUndefined(data.detail) ?? ``,
    )
  ) {
    const entry = getReasonMatch(`unavailable`, `busy`);
    if (entry) {
      match = {
        ...match,
        row: entry.row,
        sub: `busy`,
      };
    }
  }
  if (match) {
    const value7: RefusalSource =
      layer === `relay`
        ? `relay`
        : layer === `http`
          ? `http`
          : match.local
            ? `local`
            : `table`;
    let value8 = classifyRetryContract(match.row);
    if (
      match.row.reason === `gone` &&
      match.row.sub === `*` &&
      typeof data.object != `string`
    ) {
      value8 = {
        k: `reread_once`,
        after: `assert`,
      };
    }
    return match.row.reason === `gone` && match.row.sub === `node`
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `op_terminal`,
              custody: `tray`,
            },
            `op`,
            road,
            `gone`,
            value7,
          ),
          getReasonMatch(`gone`, `*`)?.row ?? match.row,
          `gone`,
          value7,
          stringOrUndefined(data.object),
        )
      : attachRefusalMetadata(
          adaptClassificationToRoad(
            value8,
            match.row.scope,
            road,
            match.row.reason,
            value7,
          ),
          match.row,
          match.row.reason,
          value7,
          match.sub,
        );
  }
  return attachRefusalMetadata(
    adaptClassificationToRoad(
      classifyRetryContract(fallbackRefusalRow),
      `op`,
      road,
      reason,
      `default`,
    ),
    {
      scope: `op`,
      words: null,
      surfaces: `generic`,
    },
    reason,
    `default`,
  );
}
export { classifyRefusal };

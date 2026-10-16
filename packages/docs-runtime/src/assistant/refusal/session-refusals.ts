import type {
  RefusalClassification,
  RefusalContext,
  RefusalPolicy,
  RefusalReply,
} from "./contracts";
import { stringOrUndefined } from "./reply-facts";
import { adaptClassificationToRoad, attachRefusalMetadata } from "./retry-policy";
import {
  getReasonMatch,
  reasonSubreasonKey,
  refusalRowsByReason,
  REHANDSHAKE_MAX,
} from "./row-index";
const sessionRefusalPattern = /not_your_session|unknown_secret|unknown_session/;
const askedIdHasSession = (
  reply: RefusalReply,
  data: Record<string, unknown>,
): boolean => {
  const asked =
    data.asked ??
    data.newBid ??
    (data.field === `ids` ? data.start : undefined) ??
    reply.asked;
  return typeof asked == `string`
    ? /^[^.\s]+\.\d+$/.test(asked) && !asked.startsWith(`_.`)
    : typeof asked == `object` &&
        !!asked &&
        "sess" in asked &&
        typeof asked.sess == `string`;
};
function classifySessionRefusal(
  reply: RefusalReply,
  data: Record<string, unknown>,
  context: RefusalContext,
  reason: string,
): RefusalClassification {
  const why = data.why ?? reply.why;
  const recoverable: boolean =
    why == null || why === `unknown_secret` || why === `unknown_session`;
  const replayedSession =
    context.replayed === true &&
    /not_your_session/.test(reason + ` ` + String(data.code)) &&
    askedIdHasSession(reply, data);
  const sub =
    typeof why == `string`
      ? why
      : reason !== `not_your_session` &&
          refusalRowsByReason.has(reasonSubreasonKey(`not_your_session`, reason))
        ? reason
        : undefined;
  const match =
    (sub !== undefined &&
      refusalRowsByReason.get(reasonSubreasonKey(`not_your_session`, sub))) ||
    getReasonMatch(`not_your_session`, recoverable ? `unknown_secret` : `*`);
  return attachRefusalMetadata(
    adaptClassificationToRoad(
      recoverable || replayedSession
        ? {
            k: `rehandshake`,
            max: REHANDSHAKE_MAX,
            after: {
              k: `op_terminal`,
              custody: `tray`,
            },
          }
        : {
            k: `op_terminal`,
            custody: `tray`,
          },
      `op`,
      context.road,
      `not_your_session`,
    ),
    match.row,
    `not_your_session`,
    `table`,
    sub,
  );
}
function classifyInvalidIds(
  reply: RefusalReply,
  data: Record<string, unknown>,
  context: RefusalContext,
): RefusalClassification {
  const road = context.road;
  const details: string = `${String(data.detail)} ${String(reply.detail)} ${String(data.message)} ${String(reply.reason)}`;
  const sub =
    stringOrUndefined(data.why) ?? /\bproposed ids: ([a-z_]+)/.exec(details)?.[1];
  const match =
    (sub !== undefined &&
      refusalRowsByReason.get(reasonSubreasonKey(`id_invalid`, sub))) ||
    getReasonMatch(`id_invalid`, `*`);
  const classifyPolicy = (input2: RefusalPolicy) =>
    attachRefusalMetadata(
      adaptClassificationToRoad(input2, `op`, road, `id_invalid`),
      match.row,
      `id_invalid`,
      `table`,
      sub,
    );
  const shapeMismatch: boolean = sub === `count` || sub === `order`;
  if (
    !shapeMismatch &&
    ((sub === `prefix` && typeof data.want_prefix == `string`) ||
      (sub === `shape` && typeof data.got == `string` && data.got.startsWith(`_.`)) ||
      /proposed ids: prefix/.test(details))
  )
    return classifyPolicy({
      k: `rehandshake`,
      max: REHANDSHAKE_MAX,
      after: {
        k: `reread_once`,
        after: `assert`,
      },
    });
  if (shapeMismatch)
    return context.replayed === true
      ? classifyPolicy({
          k: `op_terminal`,
          custody: `tray`,
        })
      : (context.kStart ?? 0) > 0
        ? classifyPolicy({
            k: `reread_once`,
            after: `assert`,
          })
        : attachRefusalMetadata(
            adaptClassificationToRoad(
              {
                k: `op_terminal`,
                custody: `tray`,
              },
              `op`,
              road,
              `id_invalid`,
            ),
            {
              ...match.row,
              words: `id_refused`,
            },
            `id_invalid`,
            `table`,
            sub,
          );
  if (sub === `shape` && context.lost === true)
    return classifyPolicy({
      k: `op_terminal`,
      custody: `tray`,
    });
  if (sub === `used` || sub === `gap`) {
    const value6 = data.next_free ?? reply.next_free;
    const value7 = typeof data.got == `string` ? parseBlockId(data.got) : null;
    const value8 = typeof value6 == `string` ? parseBlockId(value6) : null;
    const value9: boolean =
      sub === `used` &&
      !!value7 &&
      !!value8 &&
      value7.sess === value8.sess &&
      value8.i <= value7.i;
    if (value6 !== undefined && !value9)
      return classifyPolicy({
        k: `counter`,
      });
  }
  return classifyPolicy(
    context.replayed === true
      ? {
          k: `op_terminal`,
          custody: `tray`,
        }
      : {
          k: `reread_once`,
          after: `assert`,
        },
  );
}
const parseBlockId = (id: string) => {
  const value = id.lastIndexOf(`.`);
  if (value <= 0) return null;
  const value2: number = Number(id.slice(value + 1));
  return Number.isInteger(value2)
    ? {
        sess: id.slice(0, value),
        i: value2,
      }
    : null;
};
export { classifyInvalidIds, classifySessionRefusal, sessionRefusalPattern };

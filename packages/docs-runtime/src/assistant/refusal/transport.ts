import type { RefusalReply, TransportRefusal, TransportRow } from "./contracts";
import { isRecord } from "./reply-facts";
import {
  httpRefusalRows,
  reasonSubreasonKey,
  refusalRowsByReason,
  relayRefusalRows,
  resolveReasonAlias,
} from "./row-index";
function relayRowForCode(code: string, verb: string | undefined): TransportRow {
  const isDead = code.startsWith(`DEAD:`);
  let fallbackRow: TransportRow | undefined;
  for (const value3 of relayRefusalRows)
    if (!(value3.verbs && (verb === undefined || !value3.verbs.includes(verb)))) {
      if (value3.code === `*`) fallbackRow ??= value3;
      else if (value3.code === code || (isDead && value3.code === `DEAD:*`))
        return value3;
    }
  if (fallbackRow === undefined) throw new Error("Missing default relay refusal row");
  return fallbackRow;
}
function httpRowForStatus(
  status: number,
  body: unknown,
  verb: string | undefined,
): TransportRow {
  const hasError = isRecord(body) && typeof body.error == `string`;
  let fallbackRow: TransportRow | undefined;
  for (const value3 of httpRefusalRows)
    if (
      !(value3.verbs && (verb === undefined || !value3.verbs.includes(verb))) &&
      !(value3.error !== undefined && !hasError)
    ) {
      if (value3.status === status) return value3;
      if (value3.status === `4xx` && status >= 400 && status < 500) {
        fallbackRow ??= value3;
      }
    }
  const row = fallbackRow ?? httpRefusalRows.find((state) => state.status === 0);
  if (row === undefined) throw new Error("Missing default HTTP refusal row");
  return row;
}
function relayRowToReply(row: TransportRow, code: string): RefusalReply {
  return row.as === `unreachable`
    ? {
        verdict: `unreachable`,
      }
    : row.as === `lost`
      ? {
          verdict: `unreachable`,
          lost: true,
        }
      : createDenyReply(
          row.as,
          row.sub,
          {
            was: code,
            layer: `relay`,
          },
          row.as === `conflict` ? 409 : 0,
        );
}
function httpRowToReply(row: TransportRow, status: number): RefusalReply {
  return row.as === `unreachable`
    ? {
        verdict: `unreachable`,
      }
    : createDenyReply(
        row.as,
        row.sub,
        {
          was: `http_${status}`,
          layer: `http`,
        },
        status,
      );
}
const createDenyReply = (
  reason: string,
  sub: string | undefined,
  extraData: Record<string, unknown>,
  status: number = 0,
): RefusalReply => {
  const specificRow =
    sub === undefined
      ? undefined
      : refusalRowsByReason.get(reasonSubreasonKey(reason, sub))?.row;
  const row =
    specificRow ?? refusalRowsByReason.get(reasonSubreasonKey(reason, `*`))?.row;
  const subIsAlias: boolean =
    sub !== undefined &&
    specificRow === undefined &&
    resolveReasonAlias(sub, {}) !== null;
  const subFields =
    sub === undefined || subIsAlias
      ? {}
      : {
          [row?.subKey ?? `why`]: sub,
        };
  return {
    verdict: `deny`,
    reason,
    ...(status > 0
      ? {
          status,
        }
      : {}),
    ...(reason === `conflict`
      ? {
          detail: `ledger-busy: relay reset storm`,
        }
      : {}),
    data: {
      code: reason === `conflict` ? `ledger-busy` : subIsAlias ? sub : reason,
      ...subFields,
      ...extraData,
    },
  };
};
const doorHTTPErrorPattern = /^door(?: batch)? (\d{1,3})$/;
const transportCodeFromThrow = (error: unknown): null | string => {
  if (!(error instanceof Error)) return `THROWN`;
  const code = "code" in error ? error.code : undefined;
  return error.name === `FrameSendError` && typeof code == `string`
    ? code
    : error instanceof TypeError
      ? `DEAD:NETWORK`
      : error.message === `mux door timeout` ||
          error.message === `mux closed mid-call` ||
          error.message === `reset`
        ? `MUX_CLOSED`
        : doorHTTPErrorPattern.test(error.message)
          ? null
          : `THROWN`;
};
function classifyTransportThrow(
  error: unknown,
  verb: string | undefined,
): TransportRefusal {
  const relayCode = transportCodeFromThrow(error);
  if (relayCode !== null) {
    const value4 = relayRowForCode(relayCode, verb);
    return {
      rep: relayRowToReply(value4, relayCode),
      rowKey: value4.key,
      relay: value4.code === `*` ? `unrowed` : relayCode,
    };
  }
  const match = error instanceof Error ? doorHTTPErrorPattern.exec(error.message) : null;
  if (match === null) throw new Error("Expected an HTTP transport error");
  const status: number = Number(match[1]);
  const httpRow = httpRowForStatus(status, null, verb);
  return {
    rep: httpRowToReply(httpRow, status),
    rowKey: httpRow.key,
    http: status,
  };
}
export { classifyTransportThrow };

import { refusalContractSeed } from "./contract-seed";
import type { ReasonMatch, ReasonRow, RefusalClassification } from "./contracts";
const UNKNOWN_RETRY_MAX = refusalContractSeed.constants.UNKNOWN_RETRY_MAX;
const TRANSIENT_RETRY_MAX = refusalContractSeed.constants.TRANSIENT_RETRY_MAX;
const LOST_RETRY_MAX = refusalContractSeed.constants.LOST_RETRY_MAX;
const BREAKER_N = refusalContractSeed.constants.BREAKER_N;
const REDIAL_AT = refusalContractSeed.constants.REDIAL_AT;
const REHANDSHAKE_MAX = refusalContractSeed.constants.REHANDSHAKE_MAX;
const refusalReasonRows = refusalContractSeed.reasons;
const frontendRefusalRows = refusalContractSeed.feLocal;
const relayRefusalRows = refusalContractSeed.relay;
const httpRefusalRows = refusalContractSeed.http;
const fallbackRefusalRow = refusalContractSeed.fallback;
const doorSubreasons: Readonly<Record<string, readonly string[]>> =
  refusalContractSeed.door.subs;
const reasonSubreasonKey = (reason: string, subreason?: string) =>
  `${reason}\u0000${subreason}`;
const refusalRowsByReason = new Map<string, ReasonMatch>();
const refusalAliases = new Map<
  string,
  {
    reason: string;
    sub?: string;
  }
>();
const rowGroups: readonly (readonly [readonly ReasonRow[], boolean])[] = [
  [refusalReasonRows, false],
  [frontendRefusalRows, true],
];
for (const [value, value2] of rowGroups)
  for (const value3 of value) {
    if (!refusalRowsByReason.has(reasonSubreasonKey(value3.reason, value3.sub))) {
      refusalRowsByReason.set(reasonSubreasonKey(value3.reason, value3.sub), {
        row: value3,
        local: value2,
      });
    }
    for (const value4 of value3.aliases ?? [])
      if (!refusalAliases.has(value4)) {
        refusalAliases.set(value4, {
          reason: value3.reason,
          ...(value3.sub === `*`
            ? {}
            : {
                sub: value3.sub,
              }),
        });
      }
  }
const subreasonFieldOrder = [
  `why`,
  `problem`,
  `object`,
  `kind`,
  `need`,
  `dim`,
  `maybe`,
  `room`,
];
const resolveReasonRow = (
  reason: string,
  data: Record<string, unknown>,
  explicitSub?: string,
): ReasonMatch | null => {
  if (explicitSub !== undefined) {
    const entry2 = refusalRowsByReason.get(reasonSubreasonKey(reason, explicitSub));
    if (entry2)
      return {
        ...entry2,
        sub: explicitSub,
      };
  }
  if (typeof data.was == `string`) {
    const entry2 = refusalRowsByReason.get(reasonSubreasonKey(reason, data.was));
    if (entry2 && entry2.row.subKey === `was`)
      return {
        ...entry2,
        sub: data.was,
      };
  }
  if (typeof data.why == `string` && typeof data.need == `string`) {
    const entry2 = refusalRowsByReason.get(
      reasonSubreasonKey(reason, `${data.why}:${data.need}`),
    );
    if (entry2)
      return {
        ...entry2,
        sub: `${data.why}:${data.need}`,
      };
  }
  for (const value of subreasonFieldOrder) {
    const value2 = data[value];
    if (typeof value2 != `string` && typeof value2 != `number`) continue;
    const entry2 = refusalRowsByReason.get(reasonSubreasonKey(reason, String(value2)));
    if (entry2 && (entry2.row.subKey ?? `why`) === value)
      return {
        ...entry2,
        sub: String(value2),
      };
  }
  const fallbackMatch = refusalRowsByReason.get(reasonSubreasonKey(reason, `*`));
  return fallbackMatch
    ? {
        ...fallbackMatch,
      }
    : null;
};
const resolveReasonAlias = (
  candidate: string | undefined,
  data: Record<string, unknown>,
): ReasonMatch | null => {
  if (candidate === undefined || candidate === ``) return null;
  const match = resolveReasonRow(candidate, data);
  if (match)
    return {
      ...match,
      via: candidate,
    };
  const alias = refusalAliases.get(candidate);
  if (!alias) return null;
  const aliasMatch = resolveReasonRow(alias.reason, data, alias.sub);
  return aliasMatch
    ? {
        ...aliasMatch,
        via: candidate,
      }
    : null;
};
function allReasonRows(): ReasonMatch[] {
  return [...refusalRowsByReason.values()];
}
const shadowReasonKey = (reason: string, sub: string) => `${reason} ${sub}`;
let shadowRowLookup: Map<string, ReasonRow> | null = null;
const shadowRowForReason = (reason: string, sub: string): ReasonRow | undefined => (
  (shadowRowLookup ??= new Map<string, ReasonRow>(
    allReasonRows().map(({ row }) => [shadowReasonKey(row.reason, row.sub), row]),
  )),
  shadowRowLookup.get(shadowReasonKey(reason, sub))
);
const shadowSubreasonFields = [
  `why`,
  `problem`,
  `object`,
  `kind`,
  `need`,
  `dim`,
  `maybe`,
  `room`,
];
const shadowRowFromReply = (
  classification: RefusalClassification,
  data: Record<string, unknown>,
): ReasonRow | undefined => {
  if (classification.sub !== undefined) {
    const value = shadowRowForReason(classification.reason, classification.sub);
    if (value) return value;
  }
  for (const value of shadowSubreasonFields) {
    const value2 = data[value];
    if (typeof value2 != `string` && typeof value2 != `number`) continue;
    const value3 = shadowRowForReason(classification.reason, String(value2));
    if (value3 && (value3.subKey ?? `why`) === value) return value3;
  }
  return shadowRowForReason(classification.reason, `*`);
};
export {
  allReasonRows,
  BREAKER_N,
  doorSubreasons,
  fallbackRefusalRow,
  httpRefusalRows,
  LOST_RETRY_MAX,
  reasonSubreasonKey,
  REDIAL_AT,
  refusalAliases,
  refusalRowsByReason,
  REHANDSHAKE_MAX,
  relayRefusalRows,
  resolveReasonAlias,
  shadowRowFromReply,
  TRANSIENT_RETRY_MAX,
  UNKNOWN_RETRY_MAX,
};
export function getReasonMatch(reason: string, sub: string): ReasonMatch {
  const match = refusalRowsByReason.get(reasonSubreasonKey(reason, sub));
  if (match === undefined)
    throw new Error(`Missing refusal contract row: ${reason}/${sub}`);
  return match;
}

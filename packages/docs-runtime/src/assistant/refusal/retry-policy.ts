import type {
  LinkTerminalFace,
  OperationCustody,
  PageTerminalFace,
  RefusalClassification,
  RefusalPolicy,
  RefusalRoad,
  RefusalScope,
  RefusalSource,
  RetryContract,
} from "./contracts";
import {
  LOST_RETRY_MAX,
  REHANDSHAKE_MAX,
  TRANSIENT_RETRY_MAX,
  UNKNOWN_RETRY_MAX,
} from "./row-index";
const accessTerminalReasons = new Set([
  `access`,
  `forbidden`,
  `not_allowed`,
  `read_only`,
]);
const normalizePageTerminalFace = (face: unknown): PageTerminalFace =>
  face === `unreached` ||
  face === `view_only` ||
  face === `not_governed` ||
  face === `cmek`
    ? face
    : `deleted`;
const normalizeLinkTerminalFace = (face: unknown): LinkTerminalFace =>
  face === `node_gone` || face === `unreached` || face === `session` || face === `too_old`
    ? face
    : `readonly`;
const normalizeOperationCustody = (custody: unknown): OperationCustody =>
  custody === `unsynced` || custody === `none` ? custody : `tray`;
const defaultRetryLimit = (retry: string) =>
  retry === `transient`
    ? TRANSIENT_RETRY_MAX
    : retry === `lost`
      ? LOST_RETRY_MAX
      : retry === `rehandshake`
        ? REHANDSHAKE_MAX
        : retry === `counter`
          ? 1
          : UNKNOWN_RETRY_MAX;
const normalizeAfterRetry = (
  after: RetryContract | "assert" | undefined,
  scope: RefusalScope | undefined,
): RefusalPolicy =>
  classifyRetryContract(
    after === undefined || after === `assert`
      ? {
          retry: `never`,
          scope,
          custody: `tray`,
        }
      : after,
  );
const classifyRetryContract = (contract: RetryContract): RefusalPolicy => {
  switch (contract.retry) {
    case `never`:
      return contract.scope === `page`
        ? {
            k: `page_terminal`,
            face: normalizePageTerminalFace(contract.face),
          }
        : contract.scope === `link` || contract.scope === `session`
          ? {
              k: `link_terminal`,
              face: normalizeLinkTerminalFace(contract.face),
            }
          : contract.scope === `node`
            ? {
                k: `link_terminal`,
                face: `node_gone`,
              }
            : {
                k: `op_terminal`,
                custody: normalizeOperationCustody(contract.custody),
              };
    case `reread`:
      return {
        k: `reread_once`,
        after: `assert`,
      };
    case `counter`:
      return {
        k: `counter`,
      };
    case `rehandshake`:
      return {
        k: `rehandshake`,
        max: contract.max ?? REHANDSHAKE_MAX,
        after: normalizeAfterRetry(contract.after, `op`),
      };
    case `bounded`:
      return {
        k: `bounded`,
        max: contract.max ?? UNKNOWN_RETRY_MAX,
        floorMs: contract.floorMs ?? 0,
        after: normalizeAfterRetry(contract.after, contract.scope),
        redial: contract.redial === true,
      };
    case `transient`:
      return {
        k: `transient`,
        max: contract.max ?? TRANSIENT_RETRY_MAX,
        redial: contract.redial === true,
      };
    case `lost`:
      return {
        k: `lost`,
        max: contract.max ?? LOST_RETRY_MAX,
      };
  }
};
const scopeOfClassification = (
  policy: RefusalPolicy,
  fallbackScope: RefusalScope,
): RefusalScope =>
  policy.k === `page_terminal`
    ? `page`
    : policy.k === `link_terminal`
      ? policy.face === `node_gone`
        ? `node`
        : `link`
      : policy.k === `rehandshake`
        ? `session`
        : policy.k === `transient` || policy.k === `lost`
          ? `link`
          : fallbackScope;
const isTerminalScope = (scope: RefusalScope | undefined): boolean =>
  scope === `page` || scope === `link` || scope === `node`;
const adaptClassificationToRoad = (
  policy: RefusalPolicy,
  scope: RefusalScope | undefined,
  road: RefusalRoad,
  reason: string,
  source: RefusalSource = `table`,
): RefusalPolicy => {
  if (road === `write`) return policy;
  const terminal =
    isTerminalScope(scope) &&
    (policy.k === `page_terminal` || policy.k === `link_terminal`);
  const retryable: boolean =
    policy.k === `transient` || policy.k === `lost` || policy.k === `bounded`;
  switch (road) {
    case `mint`:
      return policy.k === `page_terminal`
        ? policy
        : accessTerminalReasons.has(reason) && source !== `http` && source !== `relay`
          ? {
              k: `page_terminal`,
              face: `view_only`,
            }
          : reason === `unreachable` ||
              reason === `page_gone` ||
              ((source === `http` || source === `relay`) &&
                (retryable || policy.k === `rehandshake`))
            ? policy.k === `rehandshake`
              ? policy
              : {
                  k: `transient`,
                  max: TRANSIENT_RETRY_MAX,
                  redial: policy.k === `transient` && policy.redial,
                }
            : terminal
              ? policy
              : {
                  k: `op_terminal`,
                  custody: `none`,
                };
    case `read`:
      return terminal
        ? policy
        : reason === `gone` || reason === `page_gone`
          ? {
              k: `op_terminal`,
              custody: `none`,
            }
          : reason === `forbidden` && policy.k === `op_terminal`
            ? {
                k: `link_terminal`,
                face: `readonly`,
              }
            : {
                k: `transient`,
                max: TRANSIENT_RETRY_MAX,
                redial: policy.k === `transient` && policy.redial,
              };
    case `presence`:
      return terminal
        ? policy
        : {
            k: `op_terminal`,
            custody: `none`,
          };
    case `stream`:
      return terminal
        ? policy
        : policy.k === `transient` || policy.k === `lost`
          ? {
              k: `transient`,
              max: TRANSIENT_RETRY_MAX,
              redial: policy.k === `transient` && policy.redial,
            }
          : policy.k === `bounded`
            ? policy
            : {
                k: `op_terminal`,
                custody: `none`,
              };
    case `oneshot`:
      return retryable
        ? {
            k: `transient`,
            max: 1,
            redial: false,
          }
        : terminal
          ? policy
          : {
              k: `op_terminal`,
              custody: `none`,
            };
  }
};
const attachRefusalMetadata = (
  policy: RefusalPolicy,
  row: Pick<RetryContract, "scope" | "words" | "surfaces"> | null,
  reason: string,
  source: RefusalSource,
  sub?: string,
): RefusalClassification => ({
  ...policy,
  reason,
  ...(sub === undefined
    ? {}
    : {
        sub,
      }),
  source,
  scope: scopeOfClassification(policy, row?.scope ?? `op`),
  words: row?.words ?? null,
  surfaces: row?.surfaces ?? `generic`,
});
const adjustReplayedWriteCustody = (policy: RefusalPolicy): RefusalPolicy =>
  policy.k === `reread_once` ||
  (policy.k === `op_terminal` && policy.custody === `unsynced`)
    ? {
        k: `op_terminal`,
        custody: `tray`,
      }
    : policy.k === `rehandshake` || policy.k === `bounded`
      ? {
          ...policy,
          after: adjustReplayedWriteCustody(policy.after),
        }
      : policy;
export {
  adaptClassificationToRoad,
  adjustReplayedWriteCustody,
  attachRefusalMetadata,
  classifyRetryContract,
  defaultRetryLimit,
};

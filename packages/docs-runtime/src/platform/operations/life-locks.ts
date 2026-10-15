/** BaoCut: operation controller life locks. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { reportOperationEvent } from "../observability/boot";
import {
  dataOperationControlValue40000,
  filterDataOperationControlDeny,
} from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlDeny,
  resolveDataOperationControlSure,
} from "../data/operation-control-4";
export function createOperationLifeLocks(
  operationScope: Pick<
    OperationControllerScope,
    | "dataOperationControlVerdict"
    | "lookup2"
    | "lifeLocks"
    | "promise"
    | "uniqueItems2"
    | "enabled"
    | "lookup"
    | "uniqueItems3"
    | "loadDataOperationControlVerdictResult3"
    | "life2"
    | "index2"
    | "test"
    | "isFinite2"
    | "count"
    | "loadDataOperationControlVerdictHandler8"
    | "isFinite3"
    | "loadDataOperationControlVerdictHandler9"
    | "race"
  >,
) {
  return {
    author: (..._extraArguments: unknown[]): Dynamic => {
      if (operationScope.dataOperationControlVerdict.author === undefined)
        return {};
      try {
        let author2: Dynamic =
          operationScope.dataOperationControlVerdict.author();
        return {
          author: typeof author2 == `string` && author2 !== `` ? author2 : null,
        };
      } catch {
        return {
          author: null,
        };
      }
    },
    claim: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let lookupEntry: Dynamic = operationScope.lookup2.get(
        dataOperationControlVerdict2,
      );
      if (lookupEntry) return lookupEntry;
      let then: Dynamic = operationScope.lifeLocks
        .claim(dataOperationControlVerdict2, operationScope.promise)
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            result !== true &&
              operationScope.lookup2.delete(dataOperationControlVerdict2),
            result
          ),
          (..._extraArguments: unknown[]) => (
            operationScope.lookup2.delete(dataOperationControlVerdict2),
            null
          ),
        );
      operationScope.lookup2.set(dataOperationControlVerdict2, then);
      return then;
    },
    claimed: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      try {
        let left: Dynamic =
          context === undefined
            ? null
            : (operationScope.dataOperationControlVerdict.wal.left?.(
                context,
                dataOperationControlVerdict2,
              ) ?? null);
        if (left === null) {
          operationScope.dataOperationControlVerdict.claimed?.(
            dataOperationControlVerdict2,
            options,
          );
        } else {
          operationScope.dataOperationControlVerdict.claimed?.(
            dataOperationControlVerdict2,
            options,
            left,
          );
        }
      } catch {}
    },
    looked: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      try {
        operationScope.dataOperationControlVerdict.looked?.(
          dataOperationControlVerdict2,
        );
      } catch {}
    },
    wait: (life3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          operationScope.uniqueItems2.has(life3) ||
          typeof operationScope.lifeLocks?.wait != `function`
        )
      ) {
        operationScope.uniqueItems2.add(life3);
        operationScope.lifeLocks.wait(life3, operationScope.promise).then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!operationScope.enabled) {
              if (!result) {
                operationScope.uniqueItems2.delete(life3);
                for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
                  loadDataOperationControlVerdictResult22.wordsWaitOver(life3);
                return;
              }
              operationScope.uniqueItems3.add(life3);
              operationScope.lookup2.set(life3, Promise.resolve(true));
              reportOperationEvent(`wal.heir_late`, {
                life: life3,
              });
              for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
                loadDataOperationControlVerdictResult22.inherit(life3);
            }
          },
          (..._extraArguments: unknown[]): undefined => undefined,
        );
      }
    },
    loadDataOperationControlVerdictHandler8: (
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      verb: `create`,
      object: `session`,
      container: operationScope.dataOperationControlVerdict.container,
      opId: (operationScope.loadDataOperationControlVerdictResult3 ??= `sc.${operationScope.life2}.${++operationScope.index2}`),
    }),
    loadDataOperationControlVerdictHandler9: (
      dataOperationControlVerdict2?: Dynamic,
      response?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        dataOperationControlVerdict2 ===
          operationScope.loadDataOperationControlVerdictResult3 &&
        (response.verdict === `allow` || response.verdict === `deny`)
      ) {
        operationScope.loadDataOperationControlVerdictResult3 = null;
      }
    },
    isFinite2: (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (
        (0, operationScope.test)(response) ||
        resolveDataOperationControlSure(response) !== null
      )
        return null;
      if (
        response.verdict === `busy` ||
        (response.verdict === `deny` &&
          (response.reason === `busy` ||
            (isPlainRecord(response.data) && response.data.code === `busy`)))
      ) {
        let number2 = Number(
          (isPlainRecord(response.data)
            ? response.data.retryAfterMs
            : undefined) ??
            response.retryAfterMs ??
            0,
        );
        return Number.isFinite(number2) && number2 > 0 ? number2 : 0;
      }
      return response.verdict === `deny`
        ? (filterDataOperationControlDeny(response) ??
            resolveDataOperationControlDeny(response))
        : null;
    },
    isFinite3: (said?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let retryAfterMs: Dynamic = (0, operationScope.isFinite2)(said);
      return retryAfterMs === null
        ? ((said.verdict === `allow` || said.verdict === `deny`) &&
            (operationScope.count = 0),
          said)
        : ((operationScope.count = Math.min(
            dataOperationControlValue40000,
            retryAfterMs,
          )),
          {
            verdict: `unreachable`,
            busy: true,
            retryAfterMs: retryAfterMs,
            said: said,
          });
    },
    race2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let body: Dynamic = (0,
      operationScope.loadDataOperationControlVerdictHandler8)();
      let loadDataOperationControlVerdictHandler30: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let isFinite4: Dynamic = (0, operationScope.isFinite3)(
          dataOperationControlVerdict3,
        );
        (0, operationScope.loadDataOperationControlVerdictHandler9)(
          body.opId,
          isFinite4,
        );
        return isFinite4;
      };
      return {
        body: body,
        rep: (0, operationScope.race)(
          body,
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined =>
            void dataOperationControlVerdict3.then(
              (result?: Dynamic, ..._extraArguments: unknown[]): undefined =>
                void (
                  isPlainRecord(result) &&
                  dataOperationControlVerdict2(
                    loadDataOperationControlVerdictHandler30(result),
                  )
                ),
              (..._extraArguments: unknown[]): undefined => undefined,
            ),
        ).then(loadDataOperationControlVerdictHandler30),
      };
    },
  };
}

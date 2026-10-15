/** BaoCut: operation controller transport. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { resolveEditorExtensionsValue25 } from "../../prose-editor/platform/extensions-3";
import { dataOperationControlValue8000 } from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlSure,
} from "../data/operation-control-4";
export function createOperationTransport(
  operationScope: Pick<
    OperationControllerScope,
    | "dataOperationControlVerdict"
    | "loadDataOperationControlVerdictResult10"
    | "resolveDataOperationControlWhy4"
    | "record2"
    | "threw"
    | "refusalClass"
    | "loadDataOperationControlVerdictHandler26"
    | "pageStopped"
  >,
) {
  return {
    loadDataOperationControlVerdictHandler: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined =>
          void operationScope.dataOperationControlVerdict.timers.setTimeout(
            resolve,
            dataOperationControlVerdict2,
          ),
      ),
    threw: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      try {
        operationScope.dataOperationControlVerdict.shadow?.threw(
          dataOperationControlVerdict2,
          options,
        );
      } catch {}
    },
    judged: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      try {
        operationScope.dataOperationControlVerdict.shadow?.judged(
          dataOperationControlVerdict2,
          options,
          context,
          dependencies,
        );
      } catch {}
    },
    refusalClass: (..._extraArguments: unknown[]): Dynamic => {
      try {
        return (
          operationScope.dataOperationControlVerdict.refusalClass?.() ?? null
        );
      } catch {
        return null;
      }
    },
    onFaces: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let loadDataOperationControlVerdictResult22: Dynamic;
      try {
        loadDataOperationControlVerdictResult22 = (
          operationScope.dataOperationControlVerdict.parseView ??
          resolveEditorExtensionsValue25
        )(dataOperationControlVerdict2);
      } catch {
        return null;
      }
      if (
        loadDataOperationControlVerdictResult22.faces &&
        operationScope.dataOperationControlVerdict.onFaces &&
        Object.keys(loadDataOperationControlVerdictResult22.faces).length > 0
      ) {
        operationScope.dataOperationControlVerdict.onFaces(
          loadDataOperationControlVerdictResult22.faces,
        );
      }
      return loadDataOperationControlVerdictResult22;
    },
    race: async (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (operationScope.loadDataOperationControlVerdictResult10 !== null)
        return (0, operationScope.resolveDataOperationControlWhy4)();
      let loadDataOperationControlVerdictResult22: Dynamic = null;
      let promise2: Dynamic = new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          loadDataOperationControlVerdictResult22 =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): Dynamic =>
                resolve(operationScope.record2),
              dataOperationControlValue8000,
            );
        },
      );
      let door: Dynamic = operationScope.dataOperationControlVerdict.door(
        dataOperationControlVerdict2,
      );
      let result: Dynamic = await Promise.race([door, promise2]).catch(
        (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          (0, operationScope.threw)(dataOperationControlVerdict2, error),
          (0, operationScope.refusalClass)()?.ofThrow(
            error,
            isPlainRecord(dataOperationControlVerdict2) &&
              typeof dataOperationControlVerdict2.verb == `string`
              ? dataOperationControlVerdict2.verb
              : `update`,
          ) ?? {
            verdict: `unreachable`,
          }
        ),
      );
      operationScope.dataOperationControlVerdict.timers.clearTimeout(
        loadDataOperationControlVerdictResult22,
      );
      let dataOperationControlSure: Dynamic = isPlainRecord(result)
        ? resolveDataOperationControlSure(result)
        : null;
      if (
        dataOperationControlSure !== null &&
        (dataOperationControlSure.sure ||
          (0, operationScope.loadDataOperationControlVerdictHandler26)())
      ) {
        (0, operationScope.pageStopped)(`deleted`);
      }
      if (result === operationScope.record2 && options) {
        options(door);
      }
      return isPlainRecord(result)
        ? result
        : {
            verdict: `unreachable`,
          };
    },
  };
}

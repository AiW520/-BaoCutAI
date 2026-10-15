/** BaoCut: operation controller access. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { reportOperationEvent } from "./platform-core-observability-boot";
import {
  DataOperationControlWhy,
  dataOperationControlValue3000003,
  dataOperationControlValue300004,
} from "./platform-core-data-operation-control-2";
export function createOperationAccess(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled16"
    | "loadDataOperationControlVerdictResult12"
    | "loadDataOperationControlVerdictResult11"
    | "dataOperationControlVerdict"
    | "emit4"
    | "ObservabilityTelemetryState123"
    | "enabled"
    | "loadDataOperationControlVerdictResult10"
    | "loadDataOperationControlVerdictHandler19"
    | "ObservabilityTelemetryUnmatched2"
    | "enabled17"
    | "count5"
    | "lookup"
    | "loadDataOperationControlVerdictHandler22"
    | "readsResume2"
    | "loadDataOperationControlVerdictHandler20"
    | "emit7"
    | "state"
  >,
) {
  return {
    loadDataOperationControlVerdictHandler18: (..._extraArguments: unknown[]) =>
      operationScope.enabled16 ||
      operationScope.loadDataOperationControlVerdictResult12 !== null,
    loadDataOperationControlVerdictHandler19: (
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let loadDataOperationControlVerdictResult22: Dynamic =
        operationScope.loadDataOperationControlVerdictResult12;
      return loadDataOperationControlVerdictResult22 === null
        ? null
        : ((operationScope.loadDataOperationControlVerdictResult12 = null),
          operationScope.loadDataOperationControlVerdictResult11 !== null &&
            operationScope.dataOperationControlVerdict.timers.clearTimeout(
              operationScope.loadDataOperationControlVerdictResult11,
            ),
          (operationScope.loadDataOperationControlVerdictResult11 = null),
          loadDataOperationControlVerdictResult22);
    },
    ObservabilityTelemetryUnmatched2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      (0, operationScope.emit4)(dataOperationControlVerdict2);
      (0, operationScope.ObservabilityTelemetryState123)(undefined, true);
    },
    ObservabilityTelemetryUnmatched3: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (operationScope.loadDataOperationControlVerdictResult12 === null)
        return;
      operationScope.loadDataOperationControlVerdictResult12.owed.delete(
        dataOperationControlVerdict2,
      );
      for (let loadDataOperationControlVerdictResult22 of operationScope
        .loadDataOperationControlVerdictResult12.owed as Dynamic)
        if (
          loadDataOperationControlVerdictResult22.dead ||
          loadDataOperationControlVerdictResult22.nodeGone ||
          loadDataOperationControlVerdictResult22.halted
        ) {
          operationScope.loadDataOperationControlVerdictResult12.owed.delete(
            loadDataOperationControlVerdictResult22,
          );
        }
      if (
        operationScope.loadDataOperationControlVerdictResult12.owed.size > 0 ||
        operationScope.enabled ||
        operationScope.loadDataOperationControlVerdictResult10 !== null
      )
        return;
      let dataOperationControlVerdictHandler: Dynamic = (0,
      operationScope.loadDataOperationControlVerdictHandler19)();
      if (dataOperationControlVerdictHandler !== null) {
        (0, operationScope.ObservabilityTelemetryUnmatched2)(
          dataOperationControlVerdictHandler.why,
        );
      }
    },
    loadDataOperationControlVerdictHandler20: (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      t: `state`,
      node: node,
      state: `readonly`,
      words: DataOperationControlWhy,
      readsRefused: true,
    }),
    loadDataOperationControlVerdictHandler21: (..._extraArguments: unknown[]) =>
      operationScope.loadDataOperationControlVerdictResult10 !== null ||
      operationScope.enabled16,
    loadDataOperationControlVerdictHandler22: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        operationScope.loadDataOperationControlVerdictResult11 !== null ||
        operationScope.enabled17 ||
        !operationScope.enabled16 ||
        operationScope.enabled
      )
        return;
      let min2 = Math.min(
        dataOperationControlValue3000003,
        dataOperationControlValue300004 *
          2 ** Math.min(operationScope.count5, 8),
      );
      operationScope.loadDataOperationControlVerdictResult11 =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): Dynamic => {
            operationScope.loadDataOperationControlVerdictResult11 = null;
            if (
              !operationScope.enabled16 ||
              operationScope.enabled ||
              operationScope.loadDataOperationControlVerdictResult10 !== null
            )
              return;
            let filteredItems: Dynamic = [
              ...operationScope.lookup.values(),
            ].filter(
              (item?: Dynamic, ..._extraArguments: unknown[]) =>
                !item.dead && !item.nodeGone,
            );
            let filteredItem: Dynamic =
              filteredItems.find(
                (
                  rolldownNImport2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => rolldownNImport2.accessRefused,
              ) ?? filteredItems[0];
            if (!filteredItem)
              return void (0,
              operationScope.loadDataOperationControlVerdictHandler22)();
            if (filteredItem.knockBlind) {
              reportOperationEvent(`access.reask`, {
                n: operationScope.count5 + 1,
                word: `trial`,
              });
              return (0, operationScope.readsResume2)(
                `a probe read was answered: the access moved`,
              );
            }
            operationScope.enabled17 = true;
            filteredItem.accessKnock().then(
              (word?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                operationScope.enabled17 = false;
                if (!(!operationScope.enabled16 || operationScope.enabled)) {
                  reportOperationEvent(`access.reask`, {
                    n: operationScope.count5 + 1,
                    word: word,
                  });
                  if (word === `allowed`)
                    return (0, operationScope.readsResume2)(
                      `a probe read was answered: the access moved`,
                    );
                  if (word === `refused`) {
                    operationScope.count5 += 1;
                  }
                  (0,
                  operationScope.loadDataOperationControlVerdictHandler22)();
                }
              },
              (..._extraArguments: unknown[]): undefined => {
                operationScope.enabled17 = false;
                (0, operationScope.loadDataOperationControlVerdictHandler22)();
              },
            );
          },
          min2,
        );
    },
    emit3: (..._extraArguments: unknown[]): undefined => {
      if (
        operationScope.enabled16 ||
        operationScope.loadDataOperationControlVerdictResult10 !== null ||
        operationScope.enabled
      )
        return;
      let dataOperationControlVerdictHandler: Dynamic = (0,
      operationScope.loadDataOperationControlVerdictHandler19)();
      operationScope.enabled16 = true;
      operationScope.count5 =
        dataOperationControlVerdictHandler === null
          ? 0
          : dataOperationControlVerdictHandler.asks + 1;
      if (dataOperationControlVerdictHandler === null) {
        console.info(
          `opTransport: the door refused this person a read of the page for access — read-only, nothing more is read until the access moves`,
        );
      }
      let enabled26: Dynamic = false;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        enabled26 =
          loadDataOperationControlVerdictResult22.pageStopped(!enabled26) ||
          enabled26;
      reportOperationEvent(`link.stopped`, {
        why: `access`,
        links: operationScope.lookup.size,
        ...(dataOperationControlVerdictHandler === null
          ? {}
          : {
              trial: true,
            }),
      });
      if (dataOperationControlVerdictHandler === null) {
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          if (!loadDataOperationControlVerdictResult22.nodeGone) {
            loadDataOperationControlVerdictResult22.emit(
              (0, operationScope.loadDataOperationControlVerdictHandler20)(
                loadDataOperationControlVerdictResult22.node,
              ),
            );
          }
        (0, operationScope.emit7)();
      }
      (0, operationScope.loadDataOperationControlVerdictHandler22)();
    },
    emit4: (why?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      reportOperationEvent(`link.resumed`, {
        why: why,
      });
      console.info(`opTransport: ${why} — the page is read again`);
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (!loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.emit({
            t: `state`,
            node: loadDataOperationControlVerdictResult22.node,
            state: (0, operationScope.state)(),
            readsRefused: false,
          });
        }
      (0, operationScope.emit7)();
    },
    readsResume: (
      why?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !options &&
        (0, operationScope.loadDataOperationControlVerdictHandler19)() !== null
      ) {
        if (
          !operationScope.enabled &&
          operationScope.loadDataOperationControlVerdictResult10 === null
        ) {
          (0, operationScope.emit4)(why);
        }
        return;
      }
      if (
        !(
          !operationScope.enabled16 ||
          operationScope.enabled ||
          operationScope.loadDataOperationControlVerdictResult10 !== null
        )
      ) {
        operationScope.enabled16 = false;
        if (operationScope.loadDataOperationControlVerdictResult11 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult11,
          );
        }
        operationScope.loadDataOperationControlVerdictResult11 = null;
        if (options) {
          let owed: Dynamic = new (Set as Dynamic)(
            [...operationScope.lookup.values()].filter(
              (item?: Dynamic, ..._extraArguments: unknown[]) =>
                !item.dead &&
                !item.nodeGone &&
                !item.halted &&
                !(item.cooling && !item.served),
            ),
          );
          let asks2: Dynamic = operationScope.count5;
          operationScope.count5 = 0;
          reportOperationEvent(`access.trial`, {
            links: owed.size,
          });
          if (owed.size > 0) {
            operationScope.loadDataOperationControlVerdictResult12 = {
              why: why,
              asks: asks2,
              owed: owed,
            };
            operationScope.loadDataOperationControlVerdictResult11 =
              operationScope.dataOperationControlVerdict.timers.setTimeout(
                (..._extraArguments: unknown[]): undefined => {
                  operationScope.loadDataOperationControlVerdictResult11 = null;
                  let dataOperationControlVerdictHandler: Dynamic =
                    operationScope.enabled ||
                    operationScope.loadDataOperationControlVerdictResult10 !==
                      null
                      ? null
                      : (0,
                        operationScope.loadDataOperationControlVerdictHandler19)();
                  if (dataOperationControlVerdictHandler !== null) {
                    reportOperationEvent(`access.trial.lapsed`, {
                      owed: owed.size,
                    });
                    (0, operationScope.ObservabilityTelemetryUnmatched2)(
                      dataOperationControlVerdictHandler.why,
                    );
                  }
                },
                Math.min(
                  dataOperationControlValue3000003,
                  dataOperationControlValue300004 * 2 ** Math.min(asks2 + 1, 8),
                ),
              );
          } else {
            (0, operationScope.emit4)(why);
          }
          for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.readsResume();
          if (owed.size === 0) {
            (0, operationScope.ObservabilityTelemetryState123)(undefined, true);
          }
          return;
        }
        operationScope.count5 = 0;
        (0, operationScope.emit4)(why);
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.readsResume();
      }
    },
  };
}

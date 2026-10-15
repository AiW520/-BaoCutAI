/** BaoCut: data operation engine from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  resolvePlatformApiAndAuthHuman,
  resolvePlatformApiAndAuthPrincipal2,
} from "../services/api-and-auth-5";
import {
  FOLD_LAZY_ENGINES,
  FOLD_REPLAY_SKIP_ENGINES,
  foldParentOf,
  isRootRef,
  liveScope,
  resolveDataOperationEngineEngine2,
  resolveDataOperationEngineValue27,
  updateDataOperationEnginePending,
} from "./operation-engine-4";
import {
  dataOperationEngineValue0,
} from "../../comments/store/store-1";

function updateDataOperationEngineEngine(
  updateDataOperationEngineEngine2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = `preserve`,
  ..._extraArguments: unknown[]
): undefined {
  let storeEntry: Dynamic = updateDataOperationEngineEngine2.store.get(
    updateDataOperationEngineEngine2.refIndexAtom,
  );
  let storeEntryEntry: Dynamic = storeEntry.get(options);
  let parent: Dynamic = isRootRef(options)
    ? undefined
    : argument === `authoritative`
      ? dependencies
      : (dependencies ?? storeEntryEntry?.parent);
  let record2: Dynamic = {
    engine: storeEntryEntry?.engine ?? context,
    ...(parent === undefined
      ? {}
      : {
          parent: parent,
        }),
  };
  if (!resolveDataOperationEngineEngine2(storeEntryEntry, record2)) {
    updateDataOperationEngineEngine2.store.set(
      updateDataOperationEngineEngine2.refIndexAtom,
      new (Map as Dynamic)(storeEntry).set(options, record2),
    );
  }
}

function updateDataOperationEngineStore(
  updateDataOperationEngineStore2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let storeEntry: Dynamic = updateDataOperationEngineStore2.store.get(
    updateDataOperationEngineStore2.refIndexAtom,
  );
  if (!storeEntry.has(options)) return;
  let lookup: Dynamic = new (Map as Dynamic)(storeEntry);
  lookup.delete(options);
  updateDataOperationEngineStore2.store.set(
    updateDataOperationEngineStore2.refIndexAtom,
    lookup,
  );
}

function resolveDataOperationEngineValue28(
  dataOperationEngineValue28?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      typeof dataOperationEngineValue28 != `object` ||
      !dataOperationEngineValue28
    )
  )
    return (
      foldParentOf(dataOperationEngineValue28.value) ??
      foldParentOf(dataOperationEngineValue28)
    );
}

async function loadDataOperationEngineRef(
  dataOperationEngineRef?: Dynamic,
  activity?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    ref: activity2,
    engine: activity3,
    verb: verb,
    payload: payload,
  }: Dynamic = activity;
  let matchesDataOperationEngineRef = dataOperationEngineRef === liveScope;
  if (verb === `create`) {
    updateDataOperationEngineEngine(
      dataOperationEngineRef,
      activity2,
      activity3,
      resolveDataOperationEngineValue28(payload),
    );
    if (activity2.startsWith(`utterance/`)) {
      dataOperationEngineRef.store.set(
        dataOperationEngineRef.bornAtom(activity2),
        {
          seq: activity.seq,
          at: activity.at,
          actor: activity.actor,
          ...(activity.container === undefined
            ? {}
            : {
                container: activity.container,
              }),
          ...(activity.buildRun === undefined
            ? {}
            : {
                buildRun: activity.buildRun,
              }),
        },
      );
    }
  }
  if (verb === `delete`) {
    updateDataOperationEngineStore(dataOperationEngineRef, activity2);
    dataOperationEngineRef.store.set(
      dataOperationEngineRef.refAtom(activity2),
      undefined,
    );
    dataOperationEngineRef.refAtom.remove(activity2);
    dataOperationEngineRef.store.set(
      dataOperationEngineRef.bornAtom(activity2),
      undefined,
    );
    dataOperationEngineRef.bornAtom.remove(activity2);
    dataOperationEngineRef.proseDocs.delete(activity2);
    if (matchesDataOperationEngineRef) {
      updateDataOperationEnginePending(activity2, activity.minted);
    }
    return `folded`;
  }
  if (verb === `update` && activity2.startsWith(`utterance/`)) {
    let storeEntry2: Dynamic = dataOperationEngineRef.store.get(
      dataOperationEngineRef.bornAtom(activity2),
    );
    if (storeEntry2 !== undefined) {
      let matchesCrossActorEdit =
        storeEntry2.crossActorEdit !== true &&
        !resolvePlatformApiAndAuthPrincipal2(storeEntry2.actor, activity.actor);
      let matchesEdited =
        storeEntry2.edited !== true &&
        resolvePlatformApiAndAuthHuman(activity.actor) !== `host`;
      if (matchesCrossActorEdit || matchesEdited) {
        dataOperationEngineRef.store.set(
          dataOperationEngineRef.bornAtom(activity2),
          {
            ...storeEntry2,
            ...(matchesCrossActorEdit
              ? {
                  crossActorEdit: true,
                }
              : {}),
            ...(matchesEdited
              ? {
                  edited: true,
                }
              : {}),
          },
        );
      }
    }
  }
  let storeEntry: Dynamic = dataOperationEngineRef.store.get(
    dataOperationEngineRef.refAtom(activity2),
  );
  if (
    storeEntry === undefined &&
    (verb !== `create` || FOLD_LAZY_ENGINES.includes(activity3))
  ) {
    if (matchesDataOperationEngineRef) {
      updateDataOperationEnginePending(activity2, activity.minted);
    }
    return `folded`;
  }
  if (
    !matchesDataOperationEngineRef &&
    FOLD_REPLAY_SKIP_ENGINES.includes(activity3)
  )
    return `dropped`;
  let dataOperationEngineValue27: Dynamic =
    resolveDataOperationEngineValue27(activity3);
  if (!dataOperationEngineValue27) return `dropped`;
  let dataOperationEngineValue02 = dataOperationEngineValue0;
  let apply: Dynamic = await dataOperationEngineValue27.apply(storeEntry, {
    verb: verb,
    payload: payload,
  });
  return matchesDataOperationEngineRef &&
    dataOperationEngineValue02 !== dataOperationEngineValue0
    ? `folded`
    : (verb === `update` &&
        dataOperationEngineRef.store
          .get(dataOperationEngineRef.refIndexAtom)
          .has(activity2) &&
        updateDataOperationEngineEngine(
          dataOperationEngineRef,
          activity2,
          activity3,
          foldParentOf(apply.after),
          `authoritative`,
        ),
      dataOperationEngineRef.store.set(
        dataOperationEngineRef.refAtom(activity2),
        apply.after,
      ),
      matchesDataOperationEngineRef &&
        updateDataOperationEnginePending(activity2, activity.minted),
      `folded`);
}

export { loadDataOperationEngineRef, updateDataOperationEngineEngine };

/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  bornAtom,
  dataOperationEngineMap2,
  foldStore,
  foldSyncedAtom,
  liveScope,
  overlayAtom,
  refAtom,
  refIndexAtom,
} from "./platform-core-data-operation-engine-4";
import {
  commentsStoreValues,
  updateCommentsStoreRef,
} from "./platform-core-comments-store-2";

var DataOperationEngineResolve: Dynamic;

var dataOperationEngineValue0: number;

function applyFrame(
  applyFrame2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (applyFrame2.v !== 1) return DataOperationEngineResolve;
  let dataOperationEngineValue02 = dataOperationEngineValue0;
  DataOperationEngineResolve = DataOperationEngineResolve.then(
    (..._extraArguments: unknown[]) =>
      dataOperationEngineValue02 === dataOperationEngineValue0
        ? updateCommentsStoreRef(liveScope, applyFrame2)
        : undefined,
  ).catch((..._extraArguments: unknown[]): undefined => {});
  return DataOperationEngineResolve;
}

function _resetFold(..._extraArguments: unknown[]): undefined {
  for (let ResetFoldResult of Array.from<Dynamic>(refAtom.keys()) as Dynamic) {
    foldStore.set(refAtom(ResetFoldResult), undefined);
    refAtom.remove(ResetFoldResult);
  }
  for (let ResetFoldResult of Array.from<Dynamic>(bornAtom.keys()) as Dynamic) {
    foldStore.set(bornAtom(ResetFoldResult), undefined);
    bornAtom.remove(ResetFoldResult);
  }
  foldStore.set(refIndexAtom, new (Map as Dynamic)());
  foldStore.set(foldSyncedAtom, false);
  foldStore.set(overlayAtom, {});
  dataOperationEngineMap2.clear();
  dataOperationEngineValue0++;
  DataOperationEngineResolve = Promise.resolve();
  for (let ResetFoldResult of commentsStoreValues as Dynamic) ResetFoldResult();
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore1Step1(): void {
  (DataOperationEngineResolve = Promise.resolve());
  (dataOperationEngineValue0 = 0);
}

export {
  _resetFold,
  applyFrame,
  dataOperationEngineValue0,
};

/** BaoCut: document host state from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";


function updateDocumentHostStatePictured(
  updateDocumentHostStatePictured2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `waiting`;
  let count: Dynamic = 0;
  let enabled = false;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let updateDocumentHostStatePicturedHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    label = `done`;
    lookup.clear();
  };
  return {
    pictured: (
      updateDocumentHostStatePictured3?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (updateDocumentHostStatePictured3.whole && !enabled) {
        enabled = true;
        let firstOfDoc: Dynamic = updateDocumentHostStatePictured2.firstOfDoc();
        if (label !== `waiting`) return;
        if (
          !firstOfDoc ||
          updateDocumentHostStatePictured3.outline === null ||
          !updateDocumentHostStatePictured2.visible()
        )
          return updateDocumentHostStatePicturedHandler();
        label = `armed`;
        count = updateDocumentHostStatePictured2.now();
        uniqueItems = new (Set as Dynamic)(
          updateDocumentHostStatePictured3.outline,
        );
        return;
      }
      if (label === `armed`) {
        if (
          updateDocumentHostStatePictured3.whole &&
          updateDocumentHostStatePictured3.outline !== null
        ) {
          uniqueItems = new (Set as Dynamic)(
            updateDocumentHostStatePictured3.outline,
          );
        } else {
          updateDocumentHostStatePicturedHandler();
        }
      }
    },
    rang: (
      updateDocumentHostStatePictured3?: Dynamic,
      agent?: Dynamic,
      filled?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (label !== `done`)
        for (let updateDocumentHostStatePicturedResult of updateDocumentHostStatePictured3 as Dynamic)
          if (
            !(
              typeof updateDocumentHostStatePicturedResult != `number` ||
              !Number.isFinite(updateDocumentHostStatePicturedResult) ||
              lookup.has(updateDocumentHostStatePicturedResult)
            )
          ) {
            lookup.set(updateDocumentHostStatePicturedResult, {
              agent: agent,
              filled: filled,
            });
            if (lookup.size > 32) {
              lookup.delete(lookup.keys().next().value);
            }
          }
    },
    painted: (response?: Dynamic, ..._extraArguments: unknown[]) => {
      if (label !== `armed`) return;
      if (response.held === true)
        return updateDocumentHostStatePicturedHandler();
      if (response.row !== true || response.ok !== true) return;
      let lookupEntry: Dynamic = lookup.get(response.rev);
      if (lookupEntry === undefined || !lookupEntry.agent)
        return updateDocumentHostStatePicturedHandler();
      if (
        !lookupEntry.filled.some(
          (filled?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems.has(filled),
        )
      )
        return;
      updateDocumentHostStatePicturedHandler();
      let difference: Dynamic = updateDocumentHostStatePictured2.now() - count;
      if (Number.isFinite(difference) && difference >= 0) {
        updateDocumentHostStatePictured2.say(difference);
      }
    },
    drop: (..._extraArguments: unknown[]) =>
      updateDocumentHostStatePicturedHandler(),
    state: (..._extraArguments: unknown[]) => label,
    dispose: (..._extraArguments: unknown[]) =>
      updateDocumentHostStatePicturedHandler(),
  };
}

var resolveDocumentHostStateValue13: Dynamic;

var resolveDocumentHostStateContent: Dynamic;

var resolveDocumentHostStateType: Dynamic;

function isDocumentHostStateIsArray(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let content: Dynamic =
    resolveDocumentHostStateValue13(node) && Array.isArray(node.content)
      ? node.content
      : null;
  if (content === null || !content.every(resolveDocumentHostStateValue13))
    return null;
  let contentIndex: Dynamic = content.findIndex(
    (content2?: Dynamic, ..._extraArguments: unknown[]) =>
      content2.type === `pending`,
  );
  if (contentIndex === -1) return null;
  let contentSlice: Dynamic = content.slice(0, contentIndex);
  return !contentSlice.every(resolveDocumentHostStateType) ||
    contentSlice.filter(
      (contentSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
        !resolveDocumentHostStateContent(contentSlice2),
    ).length > 3 ||
    !content
      .slice(contentIndex)
      .every(
        (contentSlice2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          contentSlice2.type === `pending` ||
          (contentSlice2.type === `paragraph` &&
            resolveDocumentHostStateContent(contentSlice2)),
      )
    ? null
    : content
        .filter(
          (content2?: Dynamic, ..._extraArguments: unknown[]) =>
            content2.type === `pending` &&
            typeof content2.attrs?.bid == `string`,
        )
        .map(
          (filteredContent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            filteredContent.attrs.bid,
        );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentHostStateState3Step1(): void {
  (resolveDocumentHostStateValue13 = (
    documentHostStateValue13?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof documentHostStateValue13 == `object` && !!documentHostStateValue13);
  (resolveDocumentHostStateContent = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    node.content === undefined ||
    (Array.isArray(node.content) && node.content.length === 0));
  (resolveDocumentHostStateType = (
    documentHostStateType?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentHostStateType.type === `paragraph` &&
    [undefined, null, 1].includes(documentHostStateType.attrs?.heading));
}

export {
  isDocumentHostStateIsArray,
  updateDocumentHostStatePictured,
};

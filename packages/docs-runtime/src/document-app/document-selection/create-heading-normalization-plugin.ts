/** BaoCut: document selection from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Decoration,
  DecorationSet,
  EditorHostState12,
  EditorSelectionAndTablesByFile2,
  Extension,
  Plugin,
  PluginKey,
  Selection,
  TextSelection,
  create,
  heldThreads,
  isDatumPinThread,
  isFrameArtifact,
  resolveEditorMediaAppendedTransaction2,
  resolveEditorMediaOpRemote,
  resolveEditorMediaParagraph,
  resolveEditorSelectionAndTablesHash,
  resolveEditorSelectionAndTablesRoot,
  resolvePlatformAnnouncementsValue,
  resolvePlatformKeyboardAndSaveStatusFind,
  useCommentStore,
  widgetAnchorOfThread,
} from "../dependencies";
import {
  React,
} from "../bootstrap";

function resolveDocumentSelectionName(
  documentSelectionName?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentSelectionName.name
    ? documentSelectionName.name
    : `pasted-${options}.${(documentSelectionName.type.split(`/`)[1] ?? `png`).replace(/\+.*$/, ``)}`;
}

function resolveDocumentSelectionIsFinite(
  documentSelectionIsFinite?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof documentSelectionIsFinite != `number` ||
    !Number.isFinite(documentSelectionIsFinite) ||
    documentSelectionIsFinite < 0
    ? null
    : documentSelectionIsFinite > 0;
}

var DocumentSelectionState: Dynamic;

function useDocumentSelectionPanelAt(
  documentSelectionPanel?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let [SymbolState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]) => Symbol(`docked-panel`),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      DocumentSelectionState.getState().panelAt(
        SymbolState,
        documentSelectionPanel,
      );
    },
    [SymbolState, documentSelectionPanel],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        DocumentSelectionState.getState().panelAt(SymbolState, false),
    [SymbolState],
  );
}

var DocumentSelectionState2: string[];

var DocumentSelection_Message: string;

var DocumentSelection_ClickIntoTheDocumentFirst: string;

var documentSelectionSet: Dynamic;

var DocumentSelection_NotAvailableAtTheCursor: string;

var DocumentSelectionLabel: {
    id: string;
    label: string;
    cmd: {
        k: string;
        kind: string;
    };
};

var DocumentSelectionLabel2: {
    id: string;
    label: string;
    cmd: {
        k: string;
        kind: string;
    };
}[];

var resolveDocumentSelectionLabel: (documentSelectionLabel?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => number;

var DocumentSelectionLabel3: Dynamic;

var DocumentSelectionLabel4: ({
    id: string;
    label: string;
    cmd: {
        k: string;
        kind: string;
    };
} | {
    id: string;
    label: string;
    cmd: {
        k: string;
        id: string;
    };
})[];

function filterDocumentSelectionNodeId(
  filterDocumentSelectionNodeId2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof filterDocumentSelectionNodeId2 != `object` ||
    !filterDocumentSelectionNodeId2
  )
    return null;
  let filterDocumentSelectionNodeId3: Dynamic = filterDocumentSelectionNodeId2;
  if (typeof filterDocumentSelectionNodeId3.nodeId != `string`) return null;
  let style: Dynamic = filterDocumentSelectionNodeId3.style;
  if (
    typeof style != `number` ||
    !Number.isInteger(style) ||
    style < 0 ||
    style > 6
  )
    return null;
  let list: Dynamic =
    filterDocumentSelectionNodeId3.list === null
      ? null
      : typeof filterDocumentSelectionNodeId3.list == `string` &&
          documentSelectionSet.has(filterDocumentSelectionNodeId3.list)
        ? filterDocumentSelectionNodeId3.list
        : undefined;
  if (
    list === undefined ||
    (filterDocumentSelectionNodeId3.inserts !== undefined &&
      !Array.isArray(filterDocumentSelectionNodeId3.inserts))
  )
    return null;
  let inserts: Dynamic = Array.isArray(filterDocumentSelectionNodeId3.inserts)
    ? filterDocumentSelectionNodeId3.inserts
    : [];
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    inserts.filter(
      (insert?: unknown, ..._extraArguments: unknown[]) =>
        typeof insert == `string`,
    ),
  );
  let inserts2: Dynamic = DocumentSelectionState2.filter(
    (
      DocumentSelectionState22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => uniqueItems.has(DocumentSelectionState22),
  );
  return {
    nodeId: filterDocumentSelectionNodeId3.nodeId,
    editable: filterDocumentSelectionNodeId3.editable === true,
    selEmpty: filterDocumentSelectionNodeId3.selEmpty === true,
    formattable: filterDocumentSelectionNodeId3.formattable === true,
    style: style,
    headings: filterDocumentSelectionNodeId3.headings === true,
    bold: filterDocumentSelectionNodeId3.bold === true,
    italic: filterDocumentSelectionNodeId3.italic === true,
    underline: filterDocumentSelectionNodeId3.underline === true,
    strike: filterDocumentSelectionNodeId3.strike === true,
    code: filterDocumentSelectionNodeId3.code === true,
    list: list,
    canUndo: filterDocumentSelectionNodeId3.canUndo === true,
    canRedo: filterDocumentSelectionNodeId3.canRedo === true,
    inserts: inserts2,
    caret: filterDocumentSelectionNodeId3.caret === true,
  };
}

function resolveDocumentSelectionCard(..._extraArguments: unknown[]): Dynamic {
  let request: Dynamic = null;
  return {
    sent(
      card?: Dynamic,
      kind?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (options === true) {
        request = {
          card: card,
          kind: kind,
        };
      }
    },
    ended(
      documentSelectionCard?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        options !== `written` &&
        request !== null &&
        request.card === documentSelectionCard
      ) {
        request = null;
      }
    },
    landed(
      documentSelectionCard?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (
        request === null ||
        typeof documentSelectionCard != `number` ||
        request.card !== documentSelectionCard
      )
        return null;
      let kind: Dynamic = request.kind;
      request = null;
      return kind;
    },
  };
}

function resolveDocumentSelectionCommentMode(
  documentSelectionCommentMode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (documentSelectionCommentMode.commentMode === `hidden`) {
    documentSelectionCommentMode.setCommentMode(`margin`);
  }
  documentSelectionCommentMode.setFocus(options);
  documentSelectionCommentMode.setActive(options);
}

function resolveDocumentSelectionHash(
  documentSelectionHash?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentSelectionHashResult: Dynamic =
    resolveEditorSelectionAndTablesHash({
      hash: location.hash,
      search: location.search,
    });
  if (resolveDocumentSelectionHashResult === null)
    return (..._extraArguments: unknown[]): undefined => {};
  let resolveDocumentSelectionHashResult2: Dynamic = null;
  let label: string = ``;
  let enabled = false;
  let enabled2 = false;
  let resolveDocumentSelectionHashHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  let scrollTo = (..._extraArguments: unknown[]): undefined => {
    if (enabled2) return;
    let storeState: Dynamic = useCommentStore.getState();
    if (resolveDocumentSelectionHashResult2 === null) {
      resolveDocumentSelectionHashResult2 = resolveEditorSelectionAndTablesRoot(
        heldThreads(storeState),
        resolveDocumentSelectionHashResult,
      );
      if (resolveDocumentSelectionHashResult2 === null) return;
      for (let event of heldThreads(storeState) as Dynamic)
        if (
          event.id === resolveDocumentSelectionHashResult2 &&
          (isDatumPinThread(event) || !widgetAnchorOfThread(event))
        ) {
          label = event.target?.pageId ?? ``;
        }
      resolveDocumentSelectionCommentMode(
        storeState,
        resolveDocumentSelectionHashResult2,
      );
      storeState = useCommentStore.getState();
    }
    let matchesLabel =
      label !== `` &&
      storeState.focusId === resolveDocumentSelectionHashResult2 &&
      documentSelectionHash?.(label) === true;
    if (
      !enabled &&
      (Object.hasOwn(storeState.rects, resolveDocumentSelectionHashResult2) ||
        matchesLabel)
    ) {
      enabled = true;
      storeState.scrollTo(resolveDocumentSelectionHashResult2);
      resolveDocumentSelectionHashHandler();
    }
  };
  let subscribe: Dynamic = useCommentStore.subscribe(scrollTo);
  let subscribe2: Dynamic = documentSelectionHash
    ? EditorSelectionAndTablesByFile2.subscribe(scrollTo)
    : (..._extraArguments: unknown[]): undefined => {};
  resolveDocumentSelectionHashHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    enabled2 = true;
    subscribe();
    subscribe2();
  };
  queueMicrotask(scrollTo);
  return (..._extraArguments: unknown[]) =>
    resolveDocumentSelectionHashHandler();
}

function useDocumentSelectionHash(
  documentSelectionHash?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!isFrameArtifact() || typeof location === "undefined") return;
      let documentSelectionHash2: Dynamic = resolveDocumentSelectionHash(
        documentSelectionHash,
      );
      let resolveDocumentSelectionHash2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          resolveEditorSelectionAndTablesHash({
            hash: location.hash,
            search: location.search,
          }) !== null
        ) {
          documentSelectionHash2();
          documentSelectionHash2 = resolveDocumentSelectionHash(
            documentSelectionHash,
          );
        }
      };
      window.addEventListener(`hashchange`, resolveDocumentSelectionHash2);
      return (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`hashchange`, resolveDocumentSelectionHash2);
        documentSelectionHash2();
      };
    },
    [documentSelectionHash],
  );
}

var DocumentSelectionState3: string[];

var resolveDocumentSelectionIncludes: Dynamic;

var documentSelectionLimit2000: number;

function resolveDocumentSelectionKind(
  documentSelectionKind?: Dynamic,
  name?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentSelectionKind === `mine`
    ? {
        kind: `marks`,
        op: `mine`,
      }
    : resolveDocumentSelectionIncludes(name)
      ? {
          kind: `marks`,
          op: `add`,
          name: name,
        }
      : null;
}

function resolveDocumentSelectionIsArray(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentSelectionIsArrayHandler: Dynamic = (
    documentSelectionIsArray?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof documentSelectionIsArray == `object` &&
    !!documentSelectionIsArray &&
    !Array.isArray(documentSelectionIsArray);
  if (
    !resolveDocumentSelectionIsArrayHandler(response) ||
    response.verdict !== `allow` ||
    !resolveDocumentSelectionIsArrayHandler(response.data)
  )
    return null;
  let data: Dynamic = response.data;
  let record: Dynamic = {};
  let resolveDocumentSelectionIncludes2 = (
    documentSelectionIsArray?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      resolveDocumentSelectionIncludes(documentSelectionIsArray) &&
      record[documentSelectionIsArray] !== `saturated`
    ) {
      record[documentSelectionIsArray] =
        options === true ? `saturated` : `seen`;
    }
  };
  if (Array.isArray(data.names) || Array.isArray(data.marks)) {
    if (
      (data.names !== undefined && !Array.isArray(data.names)) ||
      (data.marks !== undefined && !Array.isArray(data.marks))
    )
      return null;
    for (let resolveDocumentSelectionIsArrayResult of (data.names ??
      []) as Dynamic)
      resolveDocumentSelectionIncludes2(
        resolveDocumentSelectionIsArrayResult,
        false,
      );
    for (let resolveDocumentSelectionIsArrayResult of (data.marks ??
      []) as Dynamic)
      if (
        resolveDocumentSelectionIsArrayHandler(
          resolveDocumentSelectionIsArrayResult,
        )
      ) {
        resolveDocumentSelectionIncludes2(
          resolveDocumentSelectionIsArrayResult.name,
          resolveDocumentSelectionIsArrayResult.saturated,
        );
      }
    return record;
  }
  return resolveDocumentSelectionIncludes(data.name) &&
    (data.seen === true || data.saturated === true)
    ? (resolveDocumentSelectionIncludes2(data.name, data.saturated), record)
    : null;
}

function isDocumentSelectionPrime(
  timers?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let now: Dynamic =
    timers.now ?? ((..._extraArguments: unknown[]) => Date.now());
  let setTimeout2: Dynamic =
    timers.setTimeout ??
    ((
      documentSelectionPrime?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (globalThis as Dynamic).setTimeout(documentSelectionPrime, options));
  let clearTimeout2: Dynamic =
    timers.clearTimeout ??
    ((
      documentSelectionPrime?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (globalThis as Dynamic).clearTimeout(documentSelectionPrime));
  let resolveDocumentSelectionIncludes2: Dynamic = (
    documentSelectionPrime?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDocumentSelectionIncludes(documentSelectionPrime) &&
    (timers.names === undefined ||
      timers.names.includes(documentSelectionPrime));
  let matchesOffered = (..._extraArguments: unknown[]) => {
    try {
      return timers.offered() === true;
    } catch {
      return false;
    }
  };
  let label = `idle`;
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let timers2 = (..._extraArguments: unknown[]): undefined => {
    for (let isDocumentSelectionPrimeResult of uniqueItems2 as Dynamic)
      try {
        isDocumentSelectionPrimeResult();
      } catch {}
  };
  let isDocumentSelectionPrimeHandler = (
    documentSelectionPrime?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let [
      isDocumentSelectionPrimeResult,
      isDocumentSelectionPrimeResult2,
    ] of Object.entries(documentSelectionPrime) as Dynamic)
      if (lookup.get(isDocumentSelectionPrimeResult) !== `saturated`) {
        lookup.set(
          isDocumentSelectionPrimeResult,
          isDocumentSelectionPrimeResult2,
        );
      }
  };
  let isDocumentSelectionPrimeHandler2: Dynamic = (
    documentSelectionPrime?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return Promise.resolve(timers.call(documentSelectionPrime, options));
    } catch (isDocumentSelectionPrimeResult: Dynamic) {
      return Promise.reject(isDocumentSelectionPrimeResult);
    }
  };
  let resolveDocumentSelectionIsArray2: Dynamic = (
    documentSelectionPrime?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return resolveDocumentSelectionIsArray(documentSelectionPrime);
    } catch {
      return null;
    }
  };
  return {
    prime: (..._extraArguments: unknown[]): undefined => {
      if (label !== `idle` || !matchesOffered()) return;
      let documentSelectionKind: Dynamic = resolveDocumentSelectionKind(`mine`);
      if (documentSelectionKind === null) return;
      label = `out`;
      let now2: Dynamic = now();
      let abortController =
        typeof AbortController == `function` ? new AbortController() : null;
      let isDocumentSelectionPrimeResult: Dynamic = null;
      let timers3 = (
        documentSelectionPrime?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (isDocumentSelectionPrimeResult !== null) {
          clearTimeout2(isDocumentSelectionPrimeResult);
        }
        isDocumentSelectionPrimeResult = null;
        if (label === `out`) {
          if (documentSelectionPrime === null || now() - now2 > 2e3) {
            label = `failed`;
          } else {
            label = `in`;
            isDocumentSelectionPrimeHandler(documentSelectionPrime);
          }
          timers2();
        }
      };
      isDocumentSelectionPrimeResult = setTimeout2(
        (..._extraArguments: unknown[]): undefined => {
          isDocumentSelectionPrimeResult = null;
          if (label === `out`) {
            label = `failed`;
            try {
              abortController?.abort();
            } catch {}
            timers2();
          }
        },
        documentSelectionLimit2000,
      );
      isDocumentSelectionPrimeHandler2(
        documentSelectionKind,
        abortController?.signal,
      ).then(
        (result?: Dynamic, ..._extraArguments: unknown[]) =>
          timers3(resolveDocumentSelectionIsArray2(result)),
        (..._extraArguments: unknown[]) => timers3(null),
      );
    },
    read: (documentSelectionPrime?: Dynamic, ..._extraArguments: unknown[]) =>
      !resolveDocumentSelectionIncludes2(documentSelectionPrime) ||
      !matchesOffered()
        ? `unknown`
        : lookup.has(documentSelectionPrime)
          ? `seen`
          : label === `in`
            ? `unseen`
            : `unknown`,
    add: (
      documentSelectionPrime?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !resolveDocumentSelectionIncludes2(documentSelectionPrime) ||
        !matchesOffered() ||
        lookup.has(documentSelectionPrime) ||
        uniqueItems.has(documentSelectionPrime)
      )
        return;
      let documentSelectionKind: Dynamic = resolveDocumentSelectionKind(
        `add`,
        documentSelectionPrime,
      );
      if (documentSelectionKind !== null) {
        uniqueItems.add(documentSelectionPrime);
        isDocumentSelectionPrimeHandler2(documentSelectionKind).then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let documentSelectionIsArray: Dynamic =
              resolveDocumentSelectionIsArray2(result);
            if (
              !(
                documentSelectionIsArray === null ||
                documentSelectionIsArray[documentSelectionPrime] === undefined
              )
            ) {
              isDocumentSelectionPrimeHandler(documentSelectionIsArray);
              timers2();
            }
          },
          (..._extraArguments: unknown[]): undefined => {},
        );
      }
    },
    subscribe: (
      documentSelectionPrime?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      uniqueItems2.add(documentSelectionPrime),
      (..._extraArguments: unknown[]): undefined =>
        void uniqueItems2.delete(documentSelectionPrime)
    ),
    keeps: (
      documentSelectionPrime?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolveDocumentSelectionIncludes2(documentSelectionPrime) &&
      matchesOffered(),
  };
}

function resolveDocumentSelectionShift(
  documentSelectionShift: Dynamic = (..._extraArguments: unknown[]) =>
    Date.now(),
  ..._extraArguments: unknown[]
): Dynamic {
  let index: number = 0;
  let count: number = 0;
  let items: Dynamic = [];
  return {
    admit(..._extraArguments: unknown[]) {
      let documentSelectionShift2: Dynamic = documentSelectionShift();
      for (; items.length > 0 && documentSelectionShift2 - items[0] >= 6e4; )
        items.shift();
      return index >= 4 || items.length >= 20 || count >= 2e3
        ? false
        : ((index += 1),
          (count += 1),
          items.push(documentSelectionShift2),
          true);
    },
    settle(..._extraArguments: unknown[]): undefined {
      if (index > 0) {
        --index;
      }
    },
    fullButOpen(..._extraArguments: unknown[]) {
      let documentSelectionShift2: Dynamic = documentSelectionShift();
      for (; items.length > 0 && documentSelectionShift2 - items[0] >= 6e4; )
        items.shift();
      return index >= 4 && items.length < 20 && count < 2e3;
    },
  };
}

var DocumentSelection_LfileGhostCaret: string;

var DocumentSelectionState4: number;

var documentSelectionT_: Dynamic;

var resolveDocumentSelectionClassName: Dynamic;

function isDocumentSelectionSelection(
  documentSelectionSelection?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = documentSelectionSelection.selection;
  return !(selection instanceof (TextSelection as Dynamic)) ||
    !selection.empty ||
    !selection.$head.parent.inlineContent
    ? null
    : selection.head;
}

function resolveDocumentSelectionKey(..._extraArguments: unknown[]): Dynamic {
  return new (Plugin as Dynamic)({
    key: documentSelectionT_,
    state: {
      init: (..._extraArguments: unknown[]) => ({
        on: false,
      }),
      apply(
        documentSelectionKey?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let meta: Dynamic = documentSelectionKey.getMeta(documentSelectionT_);
        return meta === undefined || meta.on === options.on
          ? options
          : {
              on: meta.on,
            };
      },
    },
    props: {
      decorations(
        documentSelectionKey?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (documentSelectionT_.getState(documentSelectionKey)?.on !== true)
          return null;
        let isDocumentSelectionSelection2: Dynamic =
          isDocumentSelectionSelection(documentSelectionKey);
        return isDocumentSelectionSelection2 === null
          ? null
          : DecorationSet.create(documentSelectionKey.doc, [
              Decoration.widget(
                isDocumentSelectionSelection2,
                resolveDocumentSelectionClassName,
                {
                  key: DocumentSelection_LfileGhostCaret,
                  side: DocumentSelectionState4,
                  marks: [],
                  ignoreSelection: true,
                },
              ),
            ]);
      },
      handleDOMEvents: {
        focus(documentSelectionKey?: Dynamic, ..._extraArguments: unknown[]) {
          resolveDocumentSelectionState(documentSelectionKey);
          return false;
        },
      },
    },
  });
}

function resolveDocumentSelectionState(
  documentSelectionState2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    documentSelectionT_.getState(documentSelectionState2.state)?.on === true
  ) {
    documentSelectionState2.dispatch(
      documentSelectionState2.state.tr
        .setMeta(documentSelectionT_, {
          on: false,
        })
        .setMeta(`addToHistory`, false),
    );
  }
}

var DocumentSelectionSetTimeout: Dynamic;

var documentSelectionT_2: Dynamic;

var DocumentSelection_LfileTitleSeed: string;

var resolveDocumentSelectionIsTextblock: Dynamic;

function isDocumentSelectionChildCount(
  documentSelectionChildCount?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let childCount: Dynamic = documentSelectionChildCount.childCount;
  if (childCount < 1 || childCount > 2) return false;
  for (let index = 0; index < childCount; index++)
    if (
      !resolveDocumentSelectionIsTextblock(
        documentSelectionChildCount.child(index),
      )
    )
      return false;
  return true;
}

var resolveDocumentSelectionName2: Dynamic;

var resolveDocumentSelectionGetMeta: Dynamic;

function isDocumentSelectionSteps(
  documentSelectionSteps?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let isDocumentSelectionStepsResult of documentSelectionSteps as Dynamic)
    for (
      let index = 0;
      index < isDocumentSelectionStepsResult.steps.length;
      index++
    ) {
      let docItem: Dynamic = isDocumentSelectionStepsResult.docs[index];
      let firstChild: Dynamic = docItem?.firstChild;
      if (!docItem || !firstChild) return false;
      let nodeSize: Dynamic = firstChild.nodeSize;
      let enabled = true;
      isDocumentSelectionStepsResult.steps[index]
        .getMap()
        .forEach(
          (
            map?: Dynamic,
            index2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (map < 0 || index2 > nodeSize) {
              enabled = false;
            }
          },
        );
      if (!enabled) return false;
    }
  return true;
}

function resolveDocumentSelectionReplace(
  documentSelectionReplace?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let replace: Dynamic = documentSelectionReplace.replace(/\u00a0/g, ` `);
  return replace.trim() === `` || /^[/@#]/.test(replace.trimStart())
    ? false
    : !/^\s*(?:[-+*]|\d+[.)]|>|\[[ xX]?\]|`{3}[\w-]*)\s*$/.test(replace);
}

function resolveDocumentSelectionFirstChild(
  documentSelectionFirstChild?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic = documentSelectionFirstChild.firstChild;
  if (
    firstChild &&
    (firstChild.type.name === `heading` ||
      resolveEditorMediaParagraph(firstChild)) &&
    documentSelectionFirstChild.childCount > 1
  ) {
    let findFrom: Dynamic = Selection.findFrom(
      documentSelectionFirstChild.resolve(firstChild.nodeSize),
      1,
      true,
    );
    if (
      findFrom &&
      findFrom.from <
        firstChild.nodeSize + documentSelectionFirstChild.child(1).nodeSize
    )
      return findFrom;
  }
  return Selection.atStart(documentSelectionFirstChild);
}

var resolveDocumentSelectionSelectionSet: Dynamic;

var documentSelectionSet2: Dynamic;

function createHeadingNormalizationPlugin(
  ..._extraArguments: unknown[]
): Dynamic {
  let createHeadingNormalizationPluginResult: Dynamic = null;
  let enabled = false;
  let setMeta: Dynamic = (
    headingNormalizationPlugin?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let firstChild: Dynamic = headingNormalizationPlugin.doc.firstChild;
    return !firstChild ||
      firstChild.type.name !== `paragraph` ||
      resolveEditorMediaParagraph(firstChild) ||
      firstChild.attrs.heading != null
      ? null
      : headingNormalizationPlugin.tr
          .setNodeMarkup(0, undefined, {
            ...firstChild.attrs,
            heading: 1,
          })
          .setMeta(documentSelectionT_2, `done`);
  };
  let DocumentSelectionSetTimeout3: Dynamic = (
    headingNormalizationPlugin?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    DocumentSelectionSetTimeout((..._extraArguments: unknown[]): undefined => {
      if (
        createHeadingNormalizationPluginResult !== headingNormalizationPlugin ||
        headingNormalizationPlugin.isDestroyed ||
        headingNormalizationPlugin.composing
      )
        return;
      let documentSelectionT2State: Dynamic = documentSelectionT_2.getState(
        headingNormalizationPlugin.state,
      );
      if (!documentSelectionT2State?.armed || !documentSelectionT2State.pending)
        return;
      let firstChild: Dynamic = headingNormalizationPlugin.state.doc.firstChild;
      let setMeta2: Dynamic =
        firstChild && resolveDocumentSelectionReplace(firstChild.textContent)
          ? setMeta(headingNormalizationPlugin.state)
          : null;
      headingNormalizationPlugin.dispatch(
        setMeta2 ??
          headingNormalizationPlugin.state.tr
            .setMeta(documentSelectionT_2, `spend`)
            .setMeta(`addToHistory`, false),
      );
    }, 0),
    false
  );
  return new (Plugin as Dynamic)({
    key: documentSelectionT_2,
    view(
      headingNormalizationPlugin?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      createHeadingNormalizationPluginResult = headingNormalizationPlugin;
      let getState = (..._extraArguments: unknown[]): undefined => {
        if (
          documentSelectionT_2.getState(headingNormalizationPlugin.state)?.armed
        ) {
          documentSelectionSet2.add(headingNormalizationPlugin);
        } else {
          documentSelectionSet2.delete(headingNormalizationPlugin);
        }
      };
      getState();
      return {
        update(
          headingNormalizationPlugin2?: unknown,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          getState();
          if (
            documentSelectionT_2.getState(headingNormalizationPlugin.state)
              ?.done &&
            !documentSelectionT_2.getState(options)?.done &&
            headingNormalizationPlugin.state.selection.$from.index(0) === 0
          ) {
            resolvePlatformAnnouncementsValue(
              headingNormalizationPlugin.dom.ownerDocument,
              resolvePlatformKeyboardAndSaveStatusFind(`heading1`).label,
              {
                key: `title-seed`,
              },
            );
          }
        },
        destroy(..._extraArguments: unknown[]): undefined {
          documentSelectionSet2.delete(headingNormalizationPlugin);
          if (
            createHeadingNormalizationPluginResult ===
            headingNormalizationPlugin
          ) {
            createHeadingNormalizationPluginResult = null;
          }
        },
      };
    },
    state: {
      init: (..._extraArguments: unknown[]) => ({
        armed: false,
        done: false,
        pending: false,
        placing: false,
      }),
      apply(
        headingNormalizationPlugin?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let meta: Dynamic =
          headingNormalizationPlugin.getMeta(documentSelectionT_2);
        return meta === `arm`
          ? ((enabled = false),
            {
              armed: true,
              done: false,
              pending: false,
              placing: false,
            })
          : meta === `spend`
            ? {
                armed: false,
                done: false,
                pending: false,
                placing: false,
              }
            : meta === `yield`
              ? ((enabled = false),
                {
                  armed: false,
                  done: false,
                  pending: false,
                  placing: true,
                })
              : meta === `placed`
                ? {
                    ...options,
                    placing: false,
                  }
                : meta === `done`
                  ? {
                      ...options,
                      done: true,
                      pending: false,
                    }
                  : meta === `pending`
                    ? {
                        ...options,
                        pending: true,
                      }
                    : options.placing &&
                        !resolveEditorMediaOpRemote(
                          headingNormalizationPlugin,
                        ) &&
                        !resolveEditorMediaAppendedTransaction2(
                          headingNormalizationPlugin,
                        )
                      ? {
                          ...options,
                          placing: false,
                        }
                      : options.armed &&
                          options.done &&
                          headingNormalizationPlugin.docChanged &&
                          isDocumentSelectionChildCount(
                            headingNormalizationPlugin.doc,
                          )
                        ? {
                            ...options,
                            done: false,
                          }
                        : options;
      },
    },
    appendTransaction(
      headingNormalizationPlugin?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let documentSelectionT2State: Dynamic =
        documentSelectionT_2.getState(context);
      if (!documentSelectionT2State) return null;
      if (!documentSelectionT2State.armed) {
        if (
          !documentSelectionT2State.placing ||
          enabled ||
          !headingNormalizationPlugin.some(resolveDocumentSelectionSelectionSet)
        )
          return null;
        let documentSelectionFirstChild: Dynamic =
          resolveDocumentSelectionFirstChild(context.doc);
        let setMeta3: Dynamic = context.tr
          .setMeta(documentSelectionT_2, `placed`)
          .setMeta(`addToHistory`, false);
        return context.selection.eq(documentSelectionFirstChild)
          ? setMeta3
          : setMeta3.setSelection(documentSelectionFirstChild);
      }
      let filteredHeadingNormalizationPlugin: Dynamic =
        headingNormalizationPlugin.filter(
          (
            headingNormalizationPlugin2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => headingNormalizationPlugin2.docChanged,
        );
      if (
        filteredHeadingNormalizationPlugin.some(
          (
            filteredHeadingNormalizationPlugin2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorMediaOpRemote(filteredHeadingNormalizationPlugin2) ||
            resolveEditorMediaAppendedTransaction2(
              filteredHeadingNormalizationPlugin2,
            ),
        )
      )
        return isDocumentSelectionChildCount(context.doc)
          ? null
          : resolveDocumentSelectionName2(options.doc) &&
              options.selection.empty
            ? context.tr
                .setMeta(documentSelectionT_2, `yield`)
                .setMeta(`addToHistory`, false)
                .setSelection(resolveDocumentSelectionFirstChild(context.doc))
            : context.tr
                .setMeta(documentSelectionT_2, `spend`)
                .setMeta(`addToHistory`, false);
      if (documentSelectionT2State.done) return null;
      let matchesComposing =
        createHeadingNormalizationPluginResult?.composing === true;
      let firstChild: Dynamic = context.doc.firstChild;
      let enabled2 =
        !!firstChild &&
        firstChild.type.name === `paragraph` &&
        !resolveEditorMediaParagraph(firstChild) &&
        firstChild.attrs.heading == null;
      let setMeta2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        context.tr
          .setMeta(documentSelectionT_2, `spend`)
          .setMeta(`addToHistory`, false);
      if (documentSelectionT2State.pending)
        return matchesComposing ||
          headingNormalizationPlugin.some(
            (
              headingNormalizationPlugin2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolveEditorMediaOpRemote(headingNormalizationPlugin2) ||
              resolveEditorMediaAppendedTransaction2(
                headingNormalizationPlugin2,
              ),
          )
          ? null
          : (enabled2 &&
              resolveDocumentSelectionReplace(firstChild.textContent) &&
              setMeta(context)) ||
              setMeta2();
      if (filteredHeadingNormalizationPlugin.length === 0) return null;
      let enabled3 =
        enabled2 &&
        !filteredHeadingNormalizationPlugin.some(
          resolveDocumentSelectionGetMeta,
        ) &&
        isDocumentSelectionSteps(filteredHeadingNormalizationPlugin);
      let enabled4 =
        enabled3 && resolveDocumentSelectionReplace(firstChild.textContent);
      let enabled5 =
        enabled3 &&
        context.doc.childCount > options.doc.childCount &&
        firstChild.content.size === 0 &&
        (options.doc.firstChild?.content.size ?? 1) === 0;
      return enabled4 || enabled5
        ? matchesComposing
          ? context.tr.setMeta(documentSelectionT_2, `pending`)
          : setMeta(context)
        : isDocumentSelectionChildCount(context.doc) ||
            (enabled3 && context.doc.childCount === options.doc.childCount)
          ? null
          : setMeta2();
    },
    props: {
      handleDOMEvents: {
        compositionend: (
          headingNormalizationPlugin?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => DocumentSelectionSetTimeout3(headingNormalizationPlugin),
        mousedown: (..._extraArguments: unknown[]) => ((enabled = true), false),
        touchstart: (..._extraArguments: unknown[]) => (
          (enabled = true),
          false
        ),
        keydown: (..._extraArguments: unknown[]) => ((enabled = true), false),
      },
      decorations(
        headingNormalizationPlugin?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (
          !documentSelectionT_2.getState(headingNormalizationPlugin)?.armed ||
          !resolveDocumentSelectionName2(headingNormalizationPlugin.doc)
        )
          return null;
        let child: Dynamic = headingNormalizationPlugin.doc.child(0);
        return DecorationSet.create(headingNormalizationPlugin.doc, [
          Decoration.node(0, child.nodeSize, {
            class: DocumentSelection_LfileTitleSeed,
          }),
        ]);
      },
    },
  });
}

var DocumentSelectionSetTimeout2: Dynamic;

function isDocumentSelectionReadOnly(
  document2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (document2.readOnly || !document2.hasFocus) return false;
  let activeElement: Dynamic = document2.activeElement;
  return activeElement === null ||
    activeElement === document2.body ||
    activeElement === document2.body?.parentElement ||
    activeElement === document2.iframe
    ? true
    : document2.yielded === true
      ? !isDocumentSelectionClosest(activeElement)
      : document2.seed === true && isDocumentSelectionClosest2(activeElement);
}

function installDocumentSelectionHasFocus(
  installDocumentSelectionHasFocus2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let defer: Dynamic =
    installDocumentSelectionHasFocus2.defer ??
    ((
      installDocumentSelectionHasFocus3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void DocumentSelectionSetTimeout2(installDocumentSelectionHasFocus3, 0));
  let document2: Dynamic = installDocumentSelectionHasFocus2.win.document;
  let enabled = true;
  let enabled2 = false;
  let defer2 = (..._extraArguments: unknown[]): undefined => {
    enabled2 = true;
    defer((..._extraArguments: unknown[]): undefined => {
      enabled2 = false;
    });
  };
  let defer3 = (..._extraArguments: unknown[]): undefined => {
    if (!enabled2) {
      defer((..._extraArguments: unknown[]): undefined => {
        if (enabled2 || !enabled || !installDocumentSelectionHasFocus2.live())
          return;
        let matchedElement: Dynamic = document2.querySelector(
          `dialog[open], [role=dialog]`,
        );
        if (
          !(matchedElement !== null && matchedElement.offsetParent !== null)
        ) {
          if (
            isDocumentSelectionReadOnly({
              hasFocus: document2.hasFocus(),
              activeElement: document2.activeElement,
              body: document2.body,
              iframe: null,
              readOnly: installDocumentSelectionHasFocus2.readOnly(),
            })
          ) {
            installDocumentSelectionHasFocus2.post();
          }
        }
      });
    }
  };
  let record = {
    capture: true,
    passive: true,
  };
  for (let installDocumentSelectionHasFocusResult of [
    `pointerdown`,
    `mousedown`,
    `touchstart`,
  ] as Dynamic)
    installDocumentSelectionHasFocus2.win.addEventListener(
      installDocumentSelectionHasFocusResult,
      defer2,
      record,
    );
  installDocumentSelectionHasFocus2.win.addEventListener(`focus`, defer3);
  return (..._extraArguments: unknown[]): undefined => {
    enabled = false;
    for (let installDocumentSelectionHasFocusResult of [
      `pointerdown`,
      `mousedown`,
      `touchstart`,
    ] as Dynamic)
      installDocumentSelectionHasFocus2.win.removeEventListener(
        installDocumentSelectionHasFocusResult,
        defer2,
        record,
      );
    installDocumentSelectionHasFocus2.win.removeEventListener(`focus`, defer3);
  };
}

function isDocumentSelectionClosest(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    element.closest(
      `[role=menu],[role=menubar],[role=listbox],[role=combobox],[role=grid],[contenteditable]:not([contenteditable=false])`,
    )
  )
    return true;
  let tagName: Dynamic = element.tagName;
  if (tagName === `TEXTAREA` || tagName === `SELECT`) return true;
  if (tagName === `INPUT`) {
    let normalizedAttribute: Dynamic = (
      element.getAttribute(`type`) ?? `text`
    ).toLowerCase();
    return ![
      `button`,
      `submit`,
      `reset`,
      `checkbox`,
      `radio`,
      `range`,
      `color`,
      `file`,
      `image`,
    ].includes(normalizedAttribute);
  }
  let attribute: Dynamic = element.getAttribute(`role`);
  return (
    attribute === `textbox` ||
    attribute === `searchbox` ||
    attribute === `combobox`
  );
}

function isDocumentSelectionClosest2(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    element.closest(
      `[role=menu],[role=menubar],[role=listbox],[role=combobox],[role=grid]`,
    )
  )
    return false;
  let tagName: Dynamic = element.tagName;
  if (
    tagName === `BUTTON` ||
    tagName === `SUMMARY` ||
    (tagName === `A` && element.hasAttribute(`href`))
  )
    return true;
  let attribute: Dynamic = element.getAttribute(`role`);
  return (
    attribute === `button` || attribute === `tab` || attribute === `treeitem`
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentSelectionCreateHeadingNormalizationPluginStep1(): void {
  (DocumentSelectionState = create(
    (
      documentSelectionState2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      state: null,
      send: null,
      focusDoc: null,
      scrolled: false,
      panel: false,
      panelSeats: new (Set as Dynamic)(),
      panelAt: (
        documentSelectionState3?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (options().panelSeats.has(documentSelectionState3) === options2)
          return;
        let panelSeats: Dynamic = new (Set as Dynamic)(options().panelSeats);
        if (options2) {
          panelSeats.add(documentSelectionState3);
        } else {
          panelSeats.delete(documentSelectionState3);
        }
        documentSelectionState2({
          panelSeats: panelSeats,
          panel: panelSeats.size > 0,
        });
      },
      register: (
        send?: Dynamic,
        focusDoc?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (
        documentSelectionState2({
          send: send,
          focusDoc: focusDoc,
          state: null,
          scrolled: false,
        }),
        {
          setState: (
            state?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (options().send === send) {
              documentSelectionState2({
                state: state,
              });
            }
          },
          docAt: (
            documentSelectionState3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let scrolled = resolveDocumentSelectionIsFinite(
              documentSelectionState3,
            );
            if (
              !(
                scrolled === null ||
                options().send !== send ||
                options().scrolled === scrolled
              )
            ) {
              documentSelectionState2({
                scrolled: scrolled,
              });
            }
          },
          release: (..._extraArguments: unknown[]): undefined => {
            if (options().send === send) {
              documentSelectionState2({
                send: null,
                focusDoc: null,
                state: null,
                scrolled: false,
              });
            }
          },
        }
      ),
    }),
  ));
  (DocumentSelectionState2 = [
    `table`,
    `dropdown`,
    `code`,
    `date`,
    `divider`,
    `quote`,
  ]);
  (DocumentSelection_Message = `Read-only — locked file or view-only access`);
  (DocumentSelection_ClickIntoTheDocumentFirst = `Click into the document first`);
  (documentSelectionSet = new (Set as Dynamic)([
    `bullet`,
    `ordered`,
    `check`,
  ]));
  new (Set as Dynamic)(DocumentSelectionState2);
  (DocumentSelection_NotAvailableAtTheCursor = `Not available at the cursor`);
  (DocumentSelectionLabel = {
    id: `checkbox`,
    label: `Checklist`,
    cmd: {
      k: `list`,
      kind: `check`,
    },
  });
  (DocumentSelectionLabel2 = [
    {
      id: `bullet-list`,
      label: `Bulleted list`,
      cmd: {
        k: `list`,
        kind: `bullet`,
      },
    },
    {
      id: `ordered-list`,
      label: `Numbered list`,
      cmd: {
        k: `list`,
        kind: `ordered`,
      },
    },
    DocumentSelectionLabel,
  ]);
  (resolveDocumentSelectionLabel = (
    documentSelectionLabel?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentSelectionLabel.label < options.label
      ? -1
      : +(documentSelectionLabel.label > options.label));
  (DocumentSelectionLabel3 = [
    ...DocumentSelectionLabel2,
    {
      id: `code`,
      label: `Code block`,
      cmd: {
        k: `insert`,
        id: `code`,
      },
    },
    {
      id: `date`,
      label: `Date`,
      cmd: {
        k: `insert`,
        id: `date`,
      },
    },
    {
      id: `divider`,
      label: `Divider`,
      cmd: {
        k: `insert`,
        id: `divider`,
      },
    },
    {
      id: `dropdown`,
      label: `Dropdown`,
      cmd: {
        k: `insert`,
        id: `dropdown`,
      },
    },
    {
      id: `quote`,
      label: `Quote`,
      cmd: {
        k: `insert`,
        id: `quote`,
      },
    },
    ...EditorHostState12.map(
      (level?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        id: `h${level}`,
        label: `Heading ${level}`,
        cmd: {
          k: `style`,
          level: level,
        },
      }),
    ),
  ].toSorted(resolveDocumentSelectionLabel));
  (DocumentSelectionLabel4 = [
    {
      id: `table`,
      label: `Table`,
      cmd: {
        k: `insert`,
        id: `table`,
      },
    },
    DocumentSelectionLabel,
  ]);
  (DocumentSelectionState3 = [
    `ask_why_asked`,
    `ask_dock_dismissed`,
    `ask_dock_hint_shown`,
  ]);
  (resolveDocumentSelectionIncludes = (
    documentSelectionIncludes?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof documentSelectionIncludes == `string` &&
    DocumentSelectionState3.includes(documentSelectionIncludes));
  (documentSelectionLimit2000 = 2e3);
  (DocumentSelection_LfileGhostCaret = `lfile-ghost-caret`);
  (DocumentSelectionState4 = 2 ** 53 - 1);
  (documentSelectionT_ = new (PluginKey as Dynamic)(
    `lfileGhostCaret`,
  ));
  (resolveDocumentSelectionClassName = (
    ..._extraArguments: unknown[]
  ) => {
    let element = document.createElement(`span`);
    element.className = DocumentSelection_LfileGhostCaret;
    element.setAttribute(`aria-hidden`, `true`);
    element.setAttribute(`data-testid`, DocumentSelection_LfileGhostCaret);
    return element;
  });
  Extension.create({
    name: `lfileGhostCaret`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [resolveDocumentSelectionKey()];
    },
  });
  (DocumentSelectionSetTimeout = (globalThis as Dynamic).setTimeout);
  (documentSelectionT_2 = new (PluginKey as Dynamic)(
    `lfileTitleSeed`,
  ));
  (DocumentSelection_LfileTitleSeed = `lfile-title-seed`);
  (resolveDocumentSelectionIsTextblock = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    node.isTextblock &&
    (node.type.name === `paragraph` || node.type.name === `heading`) &&
    node.content.size === 0);
  (resolveDocumentSelectionName2 = (
    documentSelectionName2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    isDocumentSelectionChildCount(documentSelectionName2) &&
    documentSelectionName2.child(0).type.name === `paragraph` &&
    !resolveEditorMediaParagraph(documentSelectionName2.child(0)));
  (resolveDocumentSelectionGetMeta = (
    documentSelectionGetMeta?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentSelectionGetMeta.getMeta(`uiEvent`) === `paste` ||
    documentSelectionGetMeta.getMeta(`uiEvent`) === `drop` ||
    documentSelectionGetMeta.getMeta(`paste`) === true);
  (resolveDocumentSelectionSelectionSet = (
    documentSelectionSelectionSet?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentSelectionSelectionSet.selectionSet &&
    !documentSelectionSelectionSet.docChanged &&
    (resolveEditorMediaOpRemote(documentSelectionSelectionSet) ||
      resolveEditorMediaAppendedTransaction2(documentSelectionSelectionSet)));
  (documentSelectionSet2 = new (Set as Dynamic)());
  Extension.create({
    name: `lfileTitleSeed`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [createHeadingNormalizationPlugin()];
    },
  });
  (DocumentSelectionSetTimeout2 = (globalThis as Dynamic).setTimeout);
  (globalThis as Dynamic).clearTimeout;
  Date.now;
}

export {
  DocumentSelectionLabel3,
  DocumentSelectionLabel4,
  DocumentSelectionState,
  DocumentSelection_ClickIntoTheDocumentFirst,
  DocumentSelection_Message,
  DocumentSelection_NotAvailableAtTheCursor,
  filterDocumentSelectionNodeId,
  installDocumentSelectionHasFocus,
  isDocumentSelectionPrime,
  isDocumentSelectionReadOnly,
  resolveDocumentSelectionCard,
  resolveDocumentSelectionName,
  resolveDocumentSelectionShift,
  useDocumentSelectionHash,
  useDocumentSelectionPanelAt,
};

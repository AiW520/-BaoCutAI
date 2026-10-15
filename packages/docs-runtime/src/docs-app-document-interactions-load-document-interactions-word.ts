/** BaoCut: document interactions from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  React,
  mapPreloadDependencies,
} from "./docs-app-bootstrap";
import {
  PlatformSyncAndRoutingAssign2,
  createPagesEditorRemountEvent,
  createPagesEditorRemountEvent2,
  emitTelemetryEvent,
  isObservabilityBrowserAndOperationEventsArmed,
  isPlatformFrameAndCapabilitiesWindow,
  observabilityTelemetryReadSlowSendTimeoutRefusedTrayValues,
  preloadModule,
  reportOperationEvent,
  resolveCommentsStorePaint,
  resolveCommentsStoreValue24,
  resolveDataOperationControlShed,
  resolveEditorHostValue19,
  resolveObservabilityBrowserAndOperationEventsTest,
  resolvePlatformApiAndAuthHuman4,
  resolvePlatformChunkLoadingEnv,
  resolvePlatformKeyboardAndSaveStatusBody,
  resolvePlatformKeyboardAndSaveStatusKey,
  resolvePlatformLoadingAndStatusMod,
  toast,
} from "./docs-app-dependencies";

function filterDocumentInteractionsTarget(
  filterDocumentInteractionsTarget2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let final: Dynamic = Array.isArray(filterDocumentInteractionsTarget2?.final)
    ? filterDocumentInteractionsTarget2.final
    : Array.isArray(filterDocumentInteractionsTarget2?.ops)
      ? filterDocumentInteractionsTarget2.ops
      : [];
  let flat: Dynamic = (
    filterDocumentInteractionsTarget3?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof filterDocumentInteractionsTarget3 == `string`
      ? [filterDocumentInteractionsTarget3]
      : Array.isArray(filterDocumentInteractionsTarget3)
        ? filterDocumentInteractionsTarget3
            .flat(3)
            .filter(
              (flat2?: unknown, ..._extraArguments: unknown[]) =>
                typeof flat2 == `string`,
            )
        : [];
  let flatMap: Dynamic = (
    filterDocumentInteractionsTarget3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    final.flatMap((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let { op: item2, target: item3 }: Dynamic = item ?? {};
      return item2 === filterDocumentInteractionsTarget3 &&
        item3?.kind === `blocks`
        ? flat(item3.ids)
        : [];
    });
  let uniqueItems: Dynamic = new (Set as Dynamic)(flatMap(`insert`));
  return [
    ...flatMap(`replace`),
    ...flatMap(`delete`).filter(
      (flatMap2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.has(flatMap2),
    ),
  ];
}

var resolveDocumentInteractionsValue: Dynamic;

var documentInteractionsSet: Dynamic;

function resolveDocumentInteractionsValue2(
  documentInteractionsValue2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentInteractionsSet.has(documentInteractionsValue2)
    ? false
    : (documentInteractionsSet.add(documentInteractionsValue2), true);
}

function updateDocumentInteractionsRang(
  updateDocumentInteractionsRang2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  return {
    rang: (
      updateDocumentInteractionsRang3?: unknown,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          typeof updateDocumentInteractionsRang3 != `number` ||
          !Number.isFinite(updateDocumentInteractionsRang3) ||
          !updateDocumentInteractionsRang2.visible() ||
          updateDocumentInteractionsRang2.ownOut() ||
          lookup.has(updateDocumentInteractionsRang3)
        )
      ) {
        lookup.set(
          updateDocumentInteractionsRang3,
          updateDocumentInteractionsRang2.now(),
        );
        if (lookup.size > 32) {
          lookup.delete(lookup.keys().next().value);
        }
      }
    },
    painted: (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (response.held === true) return void lookup.clear();
      let lookupEntry: Dynamic = lookup.get(response.rev);
      if (
        lookupEntry === undefined ||
        response.row !== true ||
        response.ok !== true
      )
        return;
      lookup.delete(response.rev);
      let difference: Dynamic =
        updateDocumentInteractionsRang2.now() - lookupEntry;
      if (Number.isFinite(difference) && difference >= 0 && difference <= 1e4) {
        updateDocumentInteractionsRang2.say(difference);
      }
    },
    drop: (..._extraArguments: unknown[]): Dynamic => lookup.clear(),
    inFlight: (..._extraArguments: unknown[]): Dynamic => lookup.size,
    dispose: (..._extraArguments: unknown[]): Dynamic => lookup.clear(),
  };
}

function loadDocumentInteractionsWord(
  documentInteractionsWord?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let loadDocumentInteractionsWordResult: Dynamic;
  let from: Dynamic = `door`;
  let enabled2 = false;
  let enabled3 = false;
  let amount: Dynamic = -1 / 0;
  let loadDocumentInteractionsWordHandler: Dynamic = (
    word?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    reportOperationEvent(`orphan.remount`, {
      word: word,
      from: from,
      same: word === `same`,
    }),
    word
  );
  return {
    handed(
      documentInteractionsWord2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (!enabled) return documentInteractionsWord2;
      let loadDocumentInteractionsWordResult2: Dynamic =
        loadDocumentInteractionsWordResult;
      loadDocumentInteractionsWordResult = undefined;
      return loadDocumentInteractionsWordResult2;
    },
    mounted: (
      documentInteractionsWord2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void (from = documentInteractionsWord2),
    dispose: (..._extraArguments: unknown[]): undefined =>
      void ((enabled3 = true),
      (loadDocumentInteractionsWordResult = undefined)),
    async signal(
      { node: node }: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      enabled = true;
      if (enabled3) return `gone`;
      if (enabled2) return loadDocumentInteractionsWordHandler(`busy`);
      if (documentInteractionsWord.now() - amount < 3e4)
        return loadDocumentInteractionsWordHandler(`again`);
      enabled2 = true;
      let loadDocumentInteractionsWordResult2: Dynamic;
      try {
        loadDocumentInteractionsWordResult2 =
          await documentInteractionsWord.readHead();
      } catch {
        return loadDocumentInteractionsWordHandler(`read_failed`);
      } finally {
        enabled2 = false;
      }
      if (enabled3) return `gone`;
      if (loadDocumentInteractionsWordResult2.node === null)
        return loadDocumentInteractionsWordHandler(`unbound`);
      if (loadDocumentInteractionsWordResult2.node === node)
        return loadDocumentInteractionsWordHandler(`same`);
      amount = documentInteractionsWord.now();
      let documentInteractionsWordHandler: Dynamic =
        loadDocumentInteractionsWordHandler(`remount`);
      loadDocumentInteractionsWordResult =
        loadDocumentInteractionsWordResult2.head;
      documentInteractionsWord.remount({
        from: node,
        to: loadDocumentInteractionsWordResult2.node,
      });
      try {
        emitTelemetryEvent(createPagesEditorRemountEvent());
      } catch {}
      return documentInteractionsWordHandler;
    },
  };
}

function resolveDocumentInteractionsDecide(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentInteractionsDecideResult: Dynamic = null;
  return {
    decide: (
      documentInteractionsDecide?: Dynamic,
      gen?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (resolveDocumentInteractionsDecideResult = {
        to: documentInteractionsDecide,
        gen: gen,
      }),
    take(request?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (
        resolveDocumentInteractionsDecideResult === null ||
        resolveDocumentInteractionsDecideResult.gen !== request
      )
        return null;
      let { to: resolveDocumentInteractionsDecideResult2 }: Dynamic =
        resolveDocumentInteractionsDecideResult;
      resolveDocumentInteractionsDecideResult = null;
      return {
        to: resolveDocumentInteractionsDecideResult2,
      };
    },
  };
}

function resolveDocumentInteractionsHand(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentInteractionsHandResult: Dynamic = null;
  return {
    hand: (
      port?: Dynamic,
      gen?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (resolveDocumentInteractionsHandResult =
        port === null
          ? null
          : {
              port: port,
              gen: gen,
            }),
    of: (
      documentInteractionsHand?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolveDocumentInteractionsHandResult !== null &&
      resolveDocumentInteractionsHandResult.gen === documentInteractionsHand
        ? resolveDocumentInteractionsHandResult.port
        : null,
    drop: (
      documentInteractionsHand?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (resolveDocumentInteractionsHandResult =
        resolveDocumentInteractionsHandResult !== null &&
        resolveDocumentInteractionsHandResult.gen === documentInteractionsHand
          ? null
          : resolveDocumentInteractionsHandResult),
  };
}

function isDocumentInteractionsStringify(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items2.length === 0) return items;
  let isDocumentInteractionsStringifyHandler: Dynamic = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ) => JSON.stringify([ask.bid, ask.afterId ?? null]);
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    items2.map(isDocumentInteractionsStringifyHandler),
  );
  let filteredItems: Dynamic = items.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      !uniqueItems.has(isDocumentInteractionsStringifyHandler(item)),
  );
  return filteredItems.length === items.length ? items : filteredItems;
}

function resolveDocumentInteractionsFound(
  documentInteractionsFound?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options === context ||
    !documentInteractionsFound.stagedWords ||
    !documentInteractionsFound.stageWords
  )
    return {
      found: 0,
      moved: [],
    };
  let items: Dynamic;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  try {
    items = documentInteractionsFound.stagedWords(options);
    for (let ask of documentInteractionsFound.stagedWords(context) as Dynamic)
      uniqueItems.add(ask.bid);
  } catch {
    return {
      found: 0,
      moved: [],
    };
  }
  let index = 0;
  let startsWith: Dynamic = (
    documentInteractionsFound2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let documentInteractionsFound3: Dynamic = documentInteractionsFound2;
    if (
      !documentInteractionsFound3.startsWith(`tray:`) ||
      uniqueItems.has(documentInteractionsFound3)
    )
      do documentInteractionsFound3 = `tray:moved.${index++}`;
      while (uniqueItems.has(documentInteractionsFound3));
    uniqueItems.add(documentInteractionsFound3);
    return documentInteractionsFound3;
  };
  let moved: Dynamic = [];
  for (let ask of items as Dynamic) {
    if (ask.text === ``) continue;
    let afterId: Dynamic = ask.afterId ?? null;
    let startsWith2: Dynamic =
      ask.bid.startsWith(`tray:`) && !uniqueItems.has(ask.bid);
    try {
      if (
        documentInteractionsFound.stageWords(context, {
          bid: startsWith(ask.bid),
          afterId: startsWith2 ? afterId : null,
          text: ask.text,
          tray: true,
          ...(ask.cut
            ? {
                cut: ask.cut,
              }
            : {}),
        }) === false
      )
        continue;
    } catch {
      continue;
    }
    moved.push(ask);
    try {
      documentInteractionsFound.stageWords(options, {
        bid: ask.bid,
        afterId: afterId,
        text: ``,
        only: true,
      });
    } catch {}
  }
  reportOperationEvent(`orphan.carried`, {
    found: items.length,
    moved: moved.length,
  });
  return {
    found: items.length,
    moved: moved,
  };
}

function resolveDocumentInteractionsTray(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return ask.tray !== true ||
    typeof ask.bid != `string` ||
    !ask.bid.startsWith(`tray:boot.`) ||
    typeof ask.text != `string` ||
    ask.text === ``
    ? null
    : createPagesEditorRemountEvent2(resolveEditorHostValue19(ask.text.length));
}

function resolveDocumentInteractionsValue3(
  documentInteractionsValue3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentInteractionsValue3 === `trayed`
    ? `tray`
    : documentInteractionsValue3 === `unsaved`
      ? `refused`
      : documentInteractionsValue3 === `waiting` ||
          documentInteractionsValue3 === `syncing` ||
          documentInteractionsValue3 === `opening`
        ? `read_slow`
        : `other`;
}

function resolveDocumentInteractionsIsFinite(
  documentInteractionsIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let floor = Number.isFinite(documentInteractionsIsFinite)
    ? Math.floor(documentInteractionsIsFinite)
    : 1;
  return floor >= 10
    ? `e10p`
    : floor >= 4
      ? `e4_9`
      : floor >= 2
        ? `e2_3`
        : `e1`;
}

function resolveDocumentInteractionsKind(
  documentInteractionsKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let resolveDocumentInteractionsKindResult of documentInteractionsKind as Dynamic)
    if (
      resolveDocumentInteractionsKindResult.who.kind === `human` &&
      resolveDocumentInteractionsKindResult.fileRef?.id === options
    ) {
      uniqueItems.add(
        resolvePlatformApiAndAuthHuman4(resolveDocumentInteractionsKindResult),
      );
    }
  return Math.max(1, uniqueItems.size);
}

var DocumentInteractionsState: (string | number)[][];

function resolveDocumentInteractionsIsFinite2(
  documentInteractionsIsFinite2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      !Number.isFinite(documentInteractionsIsFinite2) ||
      documentInteractionsIsFinite2 < 0
    )
  ) {
    for (let [
      resolveDocumentInteractionsIsFinite2Result,
      resolveDocumentInteractionsIsFinite2Result2,
    ] of DocumentInteractionsState as Dynamic)
      if (
        documentInteractionsIsFinite2 <
        resolveDocumentInteractionsIsFinite2Result2
      )
        return resolveDocumentInteractionsIsFinite2Result;
  }
}

function resolveDocumentInteractionsShown(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentInteractionsShownResult: Dynamic = null;
  let why: Dynamic = `other`;
  return {
    judge(
      { shown: shown, why: why2, now: now }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (shown)
        return resolveDocumentInteractionsShownResult === null
          ? ((resolveDocumentInteractionsShownResult = now),
            (why = why2),
            {
              phase: `shown`,
              why: why2,
            })
          : null;
      if (resolveDocumentInteractionsShownResult === null) return null;
      let max = Math.max(0, now - resolveDocumentInteractionsShownResult);
      let record: Dynamic = {
        phase: `cleared`,
        why: why,
        ms: max,
      };
      resolveDocumentInteractionsShownResult = null;
      why = `other`;
      return record;
    },
  };
}

function resolveDocumentInteractionsPhase(
  documentInteractionsPhase?: Dynamic,
  editors?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (documentInteractionsPhase.phase === `shown`)
    return {
      phase: `shown`,
      why: documentInteractionsPhase.why,
      editors: editors,
    };
  let max = Math.max(0, Math.round(documentInteractionsPhase.ms));
  let dur: Dynamic = resolveDocumentInteractionsIsFinite2(max);
  return {
    phase: `cleared`,
    why: documentInteractionsPhase.why,
    editors: editors,
    ms: max,
    count: Math.min(65535, Math.max(1, max)),
    ...(dur === undefined
      ? {}
      : {
          dur: dur,
        }),
  };
}

function resolveDocumentInteractionsKey(
  documentInteractionsKey?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let plat: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(context);
  return {
    name: `pages.face.sync_lost`,
    key: documentInteractionsKey.phase,
    fields: {
      ...resolveDocumentInteractionsPhase(documentInteractionsKey, options),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function useDocumentInteractionsOff(
  documentInteractions?: Dynamic,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (documentInteractions !== enabledRef.current) {
        enabledRef.current = documentInteractions;
        try {
          ref.current?.down(
            documentInteractions
              ? {
                  t: `leaving`,
                }
              : {
                  t: `leaving`,
                  off: true,
                },
          );
        } catch {}
      }
    },
    [documentInteractions, ref],
  );
}

var DocumentInteractionsState2: string[];

function resolveDocumentInteractionsKey2(
  documentInteractionsKey2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (documentInteractionsKey2 === 0) return null;
  let key =
    DocumentInteractionsState2[
      documentInteractionsKey2 === 1
        ? 0
        : documentInteractionsKey2 === 2
          ? 1
          : Number.isInteger(documentInteractionsKey2) &&
              documentInteractionsKey2 >= 3
            ? 2
            : 3
    ];
  return {
    name: `pages.host.untold_keys`,
    key: key,
    fields: {
      component: key,
    },
  };
}

function isDocumentInteractionsComposedPath(
  event?: Dynamic,
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !resolvePlatformKeyboardAndSaveStatusKey(event) ||
    !resolvePlatformKeyboardAndSaveStatusBody(
      event.composedPath()[0] ?? event.target,
      element,
      event.key,
    )
    ? false
    : (element.querySelector(`dialog[open], [role=dialog]`)?.offsetParent ??
        null) === null;
}

function installDocumentInteractionsCapture(
  installDocumentInteractionsCapture2?: Dynamic,
  options: Dynamic = {
    n: 0,
  },
  ..._extraArguments: unknown[]
): Dynamic {
  let index = 0;
  let installDocumentInteractionsCaptureResult: Dynamic = null;
  let counts = (
    installDocumentInteractionsCapture3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      if (
        options.n >= 0 &&
        installDocumentInteractionsCaptureResult !== null &&
        installDocumentInteractionsCapture2.counts() &&
        isDocumentInteractionsComposedPath(
          installDocumentInteractionsCapture3,
          installDocumentInteractionsCaptureResult,
        )
      ) {
        options.n = Math.min(3, options.n + 1);
      }
    } catch {}
  };
  let removeEventListener = (..._extraArguments: unknown[]): undefined => {
    index = 0;
    try {
      installDocumentInteractionsCaptureResult?.removeEventListener(
        `keydown`,
        counts,
        true,
      );
    } catch {}
    installDocumentInteractionsCaptureResult = null;
  };
  return {
    arm(..._extraArguments: unknown[]): Dynamic {
      let enabled = false;
      try {
        if (options.n >= 0) {
          if (index === 0) {
            (installDocumentInteractionsCaptureResult =
              installDocumentInteractionsCapture2.doc()).addEventListener(
              `keydown`,
              counts,
              {
                capture: true,
                passive: true,
              },
            );
          }
          index++;
          enabled = true;
        }
      } catch {
        installDocumentInteractionsCaptureResult = null;
      }
      return (..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          enabled = false;
          if (index > 0 && --index === 0) {
            removeEventListener();
          }
        }
      };
    },
    opened(..._extraArguments: unknown[]): undefined {
      let n5: Dynamic = options.n;
      if (!(n5 < 0)) {
        options.n = -1;
        removeEventListener();
        try {
          let documentInteractionsKey2 =
            n5 > 0 && installDocumentInteractionsCapture2.swappedIn()
              ? resolveDocumentInteractionsKey2(n5)
              : null;
          if (documentInteractionsKey2 !== null) {
            installDocumentInteractionsCapture2.emit(documentInteractionsKey2);
          }
        } catch {}
      }
    },
  };
}

var DocumentInteractionsDoc: Dynamic;

var DocumentInteractionsState3: Dynamic;

var DocumentInteractionsOpened: Dynamic;

var DocumentInteractionsThen: Dynamic;

var DocumentInteractionsState4: Dynamic;

var isDocumentInteractionsValue: Dynamic;

var DocumentInteractions_LnDoc: string;

var documentInteractionsLimit4000: number;

var documentInteractionsLimit8000: number;

var documentInteractionsLimit1000: number;

var DocumentInteractionsState5: boolean;

var documentInteractionsLimit3000: number;

var documentInteractionsLimit10000: number;

var DocumentInteractionsState6: boolean;

var resolveDocumentInteractionsWarn: (..._extraArguments: unknown[]) => undefined;

var resolveDocumentInteractionsWarn2: (..._extraArguments: unknown[]) => undefined;

var DocumentInteractionsRandom: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentInteractionsLoadDocumentInteractionsWordStep1(): void {
  (resolveDocumentInteractionsValue = (
    documentInteractionsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let rev: Dynamic =
      typeof documentInteractionsValue == `object` && documentInteractionsValue
        ? documentInteractionsValue.rev
        : undefined;
    return typeof rev == `number` ? rev : undefined;
  });
  (documentInteractionsSet = new (Set as Dynamic)());
  new (Set as Dynamic)(
    observabilityTelemetryReadSlowSendTimeoutRefusedTrayValues,
  );
  (DocumentInteractionsState = [
    [`s2`, 2e3],
    [`s5`, 5e3],
    [`s15`, 15e3],
    [`m1`, 6e4],
    [`m5`, 3e5],
    [`m30`, 18e5],
    [`h`, 1 / 0],
  ]);
  (DocumentInteractionsState2 = [
    `untold:n1`,
    `untold:n2`,
    `untold:n3p`,
    `untold:unrowed`,
  ]);
  (DocumentInteractionsDoc = installDocumentInteractionsCapture(
    {
      doc: (..._extraArguments: unknown[]) => document,
      counts: (..._extraArguments: unknown[]) =>
        PlatformSyncAndRoutingAssign2.getState().preview === null,
      swappedIn: isPlatformFrameAndCapabilitiesWindow,
      emit: (documentInteractionsDoc?: Dynamic, ..._extraArguments: unknown[]) =>
        emitTelemetryEvent(documentInteractionsDoc),
    },
    {
      n: 0,
    },
  ));
  (DocumentInteractionsState3 = DocumentInteractionsDoc.arm);
  (DocumentInteractionsOpened = DocumentInteractionsDoc.opened);
  (DocumentInteractionsThen = resolvePlatformLoadingAndStatusMod(
    resolvePlatformChunkLoadingEnv(
      (..._extraArguments: unknown[]): Dynamic =>
        resolveCommentsStorePaint().then(
          (..._extraArguments: unknown[]): Dynamic =>
            preloadModule(
              (..._extraArguments: unknown[]): Dynamic =>
                import("./refusal-shadow"),
              mapPreloadDependencies([26, 0, 1, 2, 3]),
              import.meta.url,
            ),
        ),
    ),
  ));
  (DocumentInteractionsState4 = resolveDataOperationControlShed(toast));
  (isDocumentInteractionsValue = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return resolveCommentsStoreValue24();
    } catch {
      return false;
    }
  });
  (DocumentInteractions_LnDoc = `ln-doc`);
  (documentInteractionsLimit4000 = 4e3);
  (documentInteractionsLimit8000 = 8e3);
  (documentInteractionsLimit1000 = 1e3);
  (DocumentInteractionsState5 = false);
  (documentInteractionsLimit3000 = 3e3);
  (documentInteractionsLimit10000 = 1e4);
  (DocumentInteractionsState6 = false);
  (resolveDocumentInteractionsWarn = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!DocumentInteractionsState6) {
      DocumentInteractionsState6 = true;
      console.warn(
        `prose: this browser has no IndexedDB — unsent edits are kept in memory (and this tab's session storage) only; they survive a reload of this tab, not a crash or a closed tab`,
      );
    }
  });
  (resolveDocumentInteractionsWarn2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!DocumentInteractionsState5) {
      DocumentInteractionsState5 = true;
      console.warn(
        `prose: a document opened before it is known who is looking at it (not signed in yet, or a host page that does not say) keeps its unsent edits in memory only; open it again once that is known for them to survive a reload`,
      );
    }
  });
  (DocumentInteractionsRandom = isObservabilityBrowserAndOperationEventsArmed(
      (..._extraArguments: unknown[]) => Math.random(),
    ));
}

export {
  DocumentInteractionsOpened,
  DocumentInteractionsRandom,
  DocumentInteractionsState3,
  DocumentInteractionsState4,
  DocumentInteractionsThen,
  DocumentInteractions_LnDoc,
  documentInteractionsLimit1000,
  documentInteractionsLimit10000,
  documentInteractionsLimit3000,
  documentInteractionsLimit4000,
  documentInteractionsLimit8000,
  filterDocumentInteractionsTarget,
  isDocumentInteractionsStringify,
  isDocumentInteractionsValue,
  loadDocumentInteractionsWord,
  resolveDocumentInteractionsDecide,
  resolveDocumentInteractionsFound,
  resolveDocumentInteractionsHand,
  resolveDocumentInteractionsIsFinite,
  resolveDocumentInteractionsKey,
  resolveDocumentInteractionsKind,
  resolveDocumentInteractionsShown,
  resolveDocumentInteractionsTray,
  resolveDocumentInteractionsValue,
  resolveDocumentInteractionsValue2,
  resolveDocumentInteractionsValue3,
  resolveDocumentInteractionsWarn,
  resolveDocumentInteractionsWarn2,
  updateDocumentInteractionsRang,
  useDocumentInteractionsOff,
};

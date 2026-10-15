/** BaoCut: editor extensions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Decoration,
  DecorationSet,
  Plugin,
  PluginKey,
  escapeForRegEx,
  canContactShell,
  knownShellOrigin,
  isTrustedClaudeOrigin,
  waitForShellOrigin,
  shellOriginFromWindow,
  inFrame,
} from "../../platform/dependencies";

function isEditorExtensionsLocation(
  editorExtensionsLocation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let window2: Dynamic =
      editorExtensionsLocation === undefined
        ? typeof window !== "undefined"
          ? window
          : null
        : editorExtensionsLocation;
    if (window2 == null || !inFrame(window2)) return false;
    let ancestorOrigins: Dynamic = window2.location?.ancestorOrigins;
    if (
      ancestorOrigins == null ||
      typeof ancestorOrigins.length != `number` ||
      ancestorOrigins.length < 2
    )
      return false;
    let ancestorOriginItem: Dynamic = ancestorOrigins[1];
    return (
      typeof ancestorOriginItem == `string` && isTrustedClaudeOrigin(ancestorOriginItem)
    );
  } catch {
    return false;
  }
}

function isEditorExtensionsValue(
  editorExtensionsValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return isEditorExtensionsLocation2(editorExtensionsValue, options);
  } catch {
    return false;
  }
}

function isEditorExtensionsLocation2(
  editorExtensionsLocation2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let window2: Dynamic =
    editorExtensionsLocation2 === undefined
      ? typeof window !== "undefined"
        ? window
        : null
      : editorExtensionsLocation2;
  if (window2 == null || !inFrame(window2)) return false;
  let ancestorOrigins: Dynamic = window2.location?.ancestorOrigins;
  let ancestorOriginItem: Dynamic =
    ancestorOrigins != null &&
    typeof ancestorOrigins.length == `number` &&
    ancestorOrigins.length >= 1
      ? ancestorOrigins[0]
      : undefined;
  return typeof ancestorOriginItem == `string` &&
    ancestorOriginItem !== EditorExtensionsNull
    ? isTrustedClaudeOrigin(ancestorOriginItem)
    : options === undefined
      ? editorExtensionsLocation2 === undefined &&
        shellOriginFromWindow(window2) !== null
      : options() !== null;
}

var EditorExtensionsNull: string;

var EditorExtensionsFrameChromeReport: string;

var EditorExtensionsSaved: Dynamic;

var editorExtensionsValue9999: number;

var EditorExtensionsByKey: string;

var EditorExtensionsActions: Dynamic;

var editorExtensionsPattern14: RegExp;

var EditorExtensionsExports: Dynamic;

var editorExtensionsPattern15: RegExp;

var EditorExtensionsDestinations: Dynamic;

var editorExtensionsPattern16: RegExp;

var EditorExtensionsFrameChromeDecline: string;

var EditorExtensionsInteractive: string;

var EditorExtensionsCancelled: string;

var EditorExtensionsCommentSelection: string;

var editorExtensionsSet25: Dynamic;

function resolveEditorExtensionsDisabled(
  editorExtensionsDisabled?: Dynamic,
  options: Dynamic = 16,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(editorExtensionsDisabled)) return;
  let items: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let resolveEditorExtensionsDisabledResult of editorExtensionsDisabled as Dynamic) {
    if (items.length >= options) break;
    if (
      !(
        typeof resolveEditorExtensionsDisabledResult != `object` ||
        !resolveEditorExtensionsDisabledResult ||
        typeof resolveEditorExtensionsDisabledResult.id != `string` ||
        !editorExtensionsPattern14.test(
          resolveEditorExtensionsDisabledResult.id,
        ) ||
        uniqueItems.has(resolveEditorExtensionsDisabledResult.id)
      )
    ) {
      uniqueItems.add(resolveEditorExtensionsDisabledResult.id);
      items.push(
        resolveEditorExtensionsDisabledResult.disabled === true
          ? {
              id: resolveEditorExtensionsDisabledResult.id,
              disabled: true,
            }
          : {
              id: resolveEditorExtensionsDisabledResult.id,
            },
      );
    }
  }
  return items.length === 0 ? undefined : items;
}

function resolveEditorExtensionsFormat(
  editorExtensions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(editorExtensions)) return;
  let items: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let resolveEditorExtensionsFormatResult of editorExtensions as Dynamic) {
    if (items.length >= 8) break;
    if (
      typeof resolveEditorExtensionsFormatResult != `object` ||
      !resolveEditorExtensionsFormatResult ||
      typeof resolveEditorExtensionsFormatResult.format != `string` ||
      !editorExtensionsPattern15.test(
        resolveEditorExtensionsFormatResult.format,
      ) ||
      uniqueItems.has(resolveEditorExtensionsFormatResult.format)
    )
      continue;
    uniqueItems.add(resolveEditorExtensionsFormatResult.format);
    let record2: Dynamic =
      resolveEditorExtensionsFormatResult.disabled === true
        ? {
            format: resolveEditorExtensionsFormatResult.format,
            disabled: true,
          }
        : {
            format: resolveEditorExtensionsFormatResult.format,
          };
    if (resolveEditorExtensionsFormatResult.interactive === true) {
      record2.interactive = true;
    }
    items.push(record2);
  }
  return items.length === 0 ? undefined : items;
}

function resolveEditorExtensionsSaved(
  editorExtensionsSaved?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    v: 1,
  };
  if (
    editorExtensionsSaved.saved !== undefined &&
    editorExtensionsSet25.has(editorExtensionsSaved.saved)
  ) {
    record2[EditorExtensionsSaved.saved] = editorExtensionsSaved.saved;
  }
  if (
    typeof editorExtensionsSaved.unresolved == `number` &&
    Number.isInteger(editorExtensionsSaved.unresolved) &&
    editorExtensionsSaved.unresolved >= 0
  ) {
    record2[EditorExtensionsSaved.unresolved] = Math.min(
      editorExtensionsSaved.unresolved,
      editorExtensionsValue9999,
    );
  }
  let editorExtensionsDisabled: Dynamic = resolveEditorExtensionsDisabled(
    editorExtensionsSaved.actions,
  );
  if (editorExtensionsDisabled !== undefined) {
    record2[EditorExtensionsActions] = editorExtensionsDisabled;
  }
  let editorExtensionsFormat: Dynamic = resolveEditorExtensionsFormat(
    editorExtensionsSaved.exports,
  );
  if (editorExtensionsFormat !== undefined) {
    record2[EditorExtensionsExports] = editorExtensionsFormat;
  }
  let editorExtensionsDisabled2: Dynamic = resolveEditorExtensionsDisabled(
    editorExtensionsSaved.destinations,
    8,
  );
  if (editorExtensionsDisabled2 !== undefined) {
    record2[EditorExtensionsDestinations] = editorExtensionsDisabled2;
  }
  return Object.keys(record2).length === 1 ? null : record2;
}

function updateEditorExtensionsActions(
  updateEditorExtensionsActions2?: Dynamic,
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let helloDImport2: Dynamic = canContactShell(updateEditorExtensionsActions2);
  let updateEditorExtensionsActionsResult: Dynamic = null;
  let updateEditorExtensionsActionsResult2: Dynamic;
  let amount: number = -1 / 0;
  let updateEditorExtensionsActionsResult3: Dynamic = null;
  let updateEditorExtensionsActionsResult4: Dynamic = null;
  let enabled = false;
  let updateEditorExtensionsActionsResult5: Dynamic = null;
  let updateEditorExtensionsActionsResult6: Dynamic = null;
  let updateEditorExtensionsActionsResult7: Dynamic = null;
  let updateEditorExtensionsActionsResult8: Dynamic = null;
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let resolveEditorExtensionsSaved2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsSaved({
      ...updateEditorExtensionsActionsResult5,
      actions: updateEditorExtensionsActionsResult6 ?? undefined,
      exports: updateEditorExtensionsActionsResult7 ?? undefined,
      destinations: updateEditorExtensionsActionsResult8 ?? undefined,
    });
  let updateEditorExtensionsActionsHandler: Dynamic = (
    updateEditorExtensionsActions3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updateEditorExtensionsActions3 === null
      ? undefined
      : updateEditorExtensionsActions3[EditorExtensionsSaved.saved];
  let postMessage = (..._extraArguments: unknown[]): undefined => {
    updateEditorExtensionsActionsResult4 = null;
    if (updateEditorExtensionsActionsResult3 === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(updateEditorExtensionsActions2);
    if (helloLImport2 === null) return;
    let updateEditorExtensionsActionsResult9: Dynamic =
      updateEditorExtensionsActionsResult3;
    updateEditorExtensionsActionsResult3 = null;
    if (
      updateEditorExtensionsActionsResult9.key !==
      updateEditorExtensionsActionsResult
    ) {
      updateEditorExtensionsActionsResult =
        updateEditorExtensionsActionsResult9.key;
      updateEditorExtensionsActionsResult2 =
        updateEditorExtensionsActionsResult9.saved;
      amount = scheduler.now();
      updateEditorExtensionsActions2.parent.postMessage(
        {
          [EditorExtensionsFrameChromeReport]: true,
          snapshot: updateEditorExtensionsActionsResult9.wire,
        },
        helloLImport2,
      );
    }
  };
  let schedule = (wire?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let key = JSON.stringify(wire);
    if (
      key === updateEditorExtensionsActionsResult &&
      updateEditorExtensionsActionsResult3 === null
    )
      return;
    updateEditorExtensionsActionsResult3 = {
      wire: wire,
      key: key,
      saved: updateEditorExtensionsActionsHandler(wire),
    };
    let matchesSaved =
      updateEditorExtensionsActionsResult3.saved !==
      updateEditorExtensionsActionsResult2;
    let difference = 250 - (scheduler.now() - amount);
    if (wire === null || matchesSaved || difference <= 0) {
      updateEditorExtensionsActionsResult4?.();
      postMessage();
      return;
    }
    if (updateEditorExtensionsActionsResult4 === null) {
      updateEditorExtensionsActionsResult4 = scheduler.schedule(
        postMessage,
        difference,
      );
    }
  };
  let flatMap: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (updateEditorExtensionsActionsResult === null)
      return new (Set as Dynamic)();
    let parse: Dynamic = JSON.parse(updateEditorExtensionsActionsResult);
    if (parse === null) return new (Set as Dynamic)();
    let flatMap2: Dynamic = [
      EditorExtensionsActions,
      EditorExtensionsDestinations,
    ].flatMap(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        parse[item] ?? [],
    );
    return new (Set as Dynamic)(
      flatMap2.map(
        (flatMap3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          flatMap3.id,
      ),
    );
  };
  let postMessage2 = (
    request?: unknown,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    let helloLImport2: Dynamic = knownShellOrigin(updateEditorExtensionsActions2);
    if (
      enabled ||
      updateEditorExtensionsActions2 === null ||
      helloLImport2 === null ||
      typeof request != `string` ||
      !editorExtensionsPattern16.test(request)
    )
      return;
    let record2: Dynamic =
      options === true
        ? {
            [EditorExtensionsFrameChromeDecline]: true,
            request: request,
            [EditorExtensionsCancelled]: true,
          }
        : {
            [EditorExtensionsFrameChromeDecline]: true,
            request: request,
          };
    updateEditorExtensionsActions2.parent.postMessage(record2, helloLImport2);
  };
  let updateEditorExtensionsActionsHandler2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (updateEditorExtensionsActionsResult === null)
      return new (Set as Dynamic)();
    let parse: Dynamic = JSON.parse(updateEditorExtensionsActionsResult);
    let parseItem: Dynamic =
      parse === null ? undefined : parse[EditorExtensionsExports];
    return new (Set as Dynamic)(
      (parseItem ?? [])
        .filter(
          (parseItem2?: Dynamic, ..._extraArguments: unknown[]) =>
            parseItem2.disabled !== true,
        )
        .map(
          (
            filteredParseItem?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredParseItem.format,
        ),
    );
  };
  let test = (
    updateEditorExtensionsActions3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updateEditorExtensionsActions3.__frame_chrome_cmd === true) {
      if (updateEditorExtensionsActions3.cmd === `action`) {
        let id: Dynamic = updateEditorExtensionsActions3.id;
        if (
          typeof id != `string` ||
          !editorExtensionsPattern14.test(id) ||
          !flatMap().has(id)
        )
          return;
        let updateEditorExtensionsActionItem: Dynamic =
          updateEditorExtensionsActions3[EditorExtensionsByKey];
        lookup.get(id)?.(
          id,
          typeof updateEditorExtensionsActionItem == `boolean`
            ? updateEditorExtensionsActionItem
            : undefined,
        );
        return;
      }
      if (updateEditorExtensionsActions3.cmd === `export`) {
        let {
          format: updateEditorExtensionsActions4,
          request: updateEditorExtensionsActions5,
        }: Dynamic = updateEditorExtensionsActions3;
        if (
          typeof updateEditorExtensionsActions4 != `string` ||
          !editorExtensionsPattern15.test(updateEditorExtensionsActions4) ||
          typeof updateEditorExtensionsActions5 != `string` ||
          !editorExtensionsPattern16.test(updateEditorExtensionsActions5)
        )
          return;
        let lookupEntry: Dynamic = lookup2.get(updateEditorExtensionsActions4);
        if (
          !updateEditorExtensionsActionsHandler2().has(
            updateEditorExtensionsActions4,
          ) ||
          lookupEntry === undefined
        ) {
          postMessage2(updateEditorExtensionsActions5);
          return;
        }
        lookupEntry(
          updateEditorExtensionsActions4,
          updateEditorExtensionsActions5,
          updateEditorExtensionsActions3[EditorExtensionsInteractive] === true,
        );
      }
    }
  };
  let postMessage3 = (
    updateEditorExtensionsActions3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled || updateEditorExtensionsActions2 === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(updateEditorExtensionsActions2);
    if (
      helloLImport2 === null ||
      updateEditorExtensionsActions3.source !==
        updateEditorExtensionsActions2.parent ||
      updateEditorExtensionsActions3.origin !== helloLImport2
    )
      return;
    let data: Dynamic = updateEditorExtensionsActions3.data;
    if (typeof data != `object` || !data) return;
    if (data.__frame_chrome_cmd === true) {
      test(data);
      return;
    }
    if (
      data.__frame_chrome_poke !== true ||
      (updateEditorExtensionsActionsResult3 === null &&
        updateEditorExtensionsActionsResult === null)
    )
      return;
    let wire: Dynamic =
      updateEditorExtensionsActionsResult3 === null
        ? JSON.parse(updateEditorExtensionsActionsResult)
        : updateEditorExtensionsActionsResult3.wire;
    updateEditorExtensionsActionsResult = null;
    updateEditorExtensionsActionsResult4?.();
    updateEditorExtensionsActionsResult3 = {
      wire: wire,
      key: JSON.stringify(wire),
      saved: updateEditorExtensionsActionsHandler(wire),
    };
    postMessage();
  };
  if (updateEditorExtensionsActions2 !== null && helloDImport2) {
    updateEditorExtensionsActions2.self.addEventListener(
      `message`,
      postMessage3,
    );
  }
  let helloSImport2: Dynamic = waitForShellOrigin(
    updateEditorExtensionsActions2,
    (..._extraArguments: unknown[]): undefined => {
      if (!(enabled || updateEditorExtensionsActionsResult3 === null)) {
        updateEditorExtensionsActionsResult4?.();
        postMessage();
      }
    },
  );
  return {
    set(
      updateEditorExtensionsActions3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || updateEditorExtensionsActions2 === null || !helloDImport2)
      ) {
        if (updateEditorExtensionsActions3 === null) {
          updateEditorExtensionsActionsResult5 = null;
          schedule(resolveEditorExtensionsSaved2());
          return;
        }
        if (
          resolveEditorExtensionsSaved({
            saved: updateEditorExtensionsActions3.saved,
            unresolved: updateEditorExtensionsActions3.unresolved,
          }) !== null
        ) {
          updateEditorExtensionsActionsResult5 = {
            saved: updateEditorExtensionsActions3.saved,
            unresolved: updateEditorExtensionsActions3.unresolved,
          };
          schedule(resolveEditorExtensionsSaved2());
        }
      }
    },
    setActions(
      updateEditorExtensionsActions3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || updateEditorExtensionsActions2 === null || !helloDImport2)
      ) {
        updateEditorExtensionsActionsResult6 =
          updateEditorExtensionsActions3 === null
            ? null
            : (resolveEditorExtensionsDisabled(
                updateEditorExtensionsActions3,
              ) ?? null);
        if (
          !(
            updateEditorExtensionsActionsResult6 === null &&
            updateEditorExtensionsActionsResult7 === null &&
            updateEditorExtensionsActionsResult5 === null &&
            updateEditorExtensionsActionsResult === null &&
            updateEditorExtensionsActionsResult3 === null
          )
        ) {
          schedule(resolveEditorExtensionsSaved2());
        }
      }
    },
    onAction(
      updateEditorExtensionsActions3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      lookup.set(updateEditorExtensionsActions3, options);
      return (..._extraArguments: unknown[]): undefined => {
        if (lookup.get(updateEditorExtensionsActions3) === options) {
          lookup.delete(updateEditorExtensionsActions3);
        }
      };
    },
    setDestinations(
      updateEditorExtensionsActions3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || updateEditorExtensionsActions2 === null || !helloDImport2)
      ) {
        updateEditorExtensionsActionsResult8 =
          updateEditorExtensionsActions3 === null
            ? null
            : (resolveEditorExtensionsDisabled(
                updateEditorExtensionsActions3,
                8,
              ) ?? null);
        if (
          !(
            updateEditorExtensionsActionsResult8 === null &&
            updateEditorExtensionsActionsResult === null &&
            updateEditorExtensionsActionsResult3 === null
          )
        ) {
          schedule(resolveEditorExtensionsSaved2());
        }
      }
    },
    setExports(
      updateEditorExtensionsActions3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || updateEditorExtensionsActions2 === null || !helloDImport2)
      ) {
        updateEditorExtensionsActionsResult7 =
          updateEditorExtensionsActions3 === null
            ? null
            : (resolveEditorExtensionsFormat(updateEditorExtensionsActions3) ??
              null);
        if (
          !(
            updateEditorExtensionsActionsResult7 === null &&
            updateEditorExtensionsActionsResult6 === null &&
            updateEditorExtensionsActionsResult5 === null &&
            updateEditorExtensionsActionsResult === null &&
            updateEditorExtensionsActionsResult3 === null
          )
        ) {
          schedule(resolveEditorExtensionsSaved2());
        }
      }
    },
    onExport(
      updateEditorExtensionsActions3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      lookup2.set(updateEditorExtensionsActions3, options);
      return (..._extraArguments: unknown[]): undefined => {
        if (lookup2.get(updateEditorExtensionsActions3) === options) {
          lookup2.delete(updateEditorExtensionsActions3);
        }
      };
    },
    declineExport(
      updateEditorExtensionsActions3?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      postMessage2(updateEditorExtensionsActions3, options === true);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled = true;
      updateEditorExtensionsActionsResult4?.();
      updateEditorExtensionsActionsResult4 = null;
      updateEditorExtensionsActionsResult3 = null;
      lookup.clear();
      lookup2.clear();
      helloSImport2();
      if (updateEditorExtensionsActions2 !== null && helloDImport2) {
        updateEditorExtensionsActions2.self.removeEventListener(
          `message`,
          postMessage3,
        );
      }
    },
  };
}

var EditorExtensionsFrameChromeHello: string;

function isEditorExtensionsNAe(
  editorExtensionsNAe?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let helloDImport2: Dynamic = canContactShell(editorExtensionsNAe);
  let enabled = false;
  let enabled2 = false;
  let enabled3 = false;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let removeEventListener2 = (
    editorExtensionsNAe2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled || editorExtensionsNAe === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(editorExtensionsNAe);
    if (
      helloLImport2 === null ||
      editorExtensionsNAe2.source !== editorExtensionsNAe.parent ||
      editorExtensionsNAe2.origin !== helloLImport2
    )
      return;
    let data: Dynamic = editorExtensionsNAe2.data;
    if (typeof data != `object` || !data) return;
    let data2: Dynamic = data;
    if (data2.__frame_chrome_poke === true) {
      if (data2.rows === false) return;
    } else if (data2.__frame_chrome_cmd === true) {
      if (data2.id === `comment_selection` || data2.rows === false) return;
    } else return;
    enabled = true;
    editorExtensionsNAe.self.removeEventListener(
      `message`,
      removeEventListener2,
    );
    let uniqueItems2: Dynamic = Array.from<Dynamic>(uniqueItems);
    uniqueItems.clear();
    for (let isEditorExtensionsNAeResult of uniqueItems2 as Dynamic)
      isEditorExtensionsNAeResult();
  };
  if (editorExtensionsNAe !== null && helloDImport2) {
    editorExtensionsNAe.self.addEventListener(`message`, removeEventListener2);
  }
  let hello: Dynamic = (..._extraArguments: unknown[]) => {
    if (enabled2 || enabled || editorExtensionsNAe === null || !helloDImport2)
      return false;
    let helloLImport2: Dynamic = knownShellOrigin(editorExtensionsNAe);
    return helloLImport2 === null
      ? ((enabled3 = true), false)
      : ((enabled2 = true),
        editorExtensionsNAe.parent.postMessage(
          {
            [EditorExtensionsFrameChromeHello]: true,
          },
          helloLImport2,
        ),
        true);
  };
  let helloSImport2: Dynamic = waitForShellOrigin(
    editorExtensionsNAe,
    (..._extraArguments: unknown[]): undefined => {
      if (enabled3) {
        enabled3 = false;
        hello();
      }
    },
  );
  return {
    seen: (..._extraArguments: unknown[]) => enabled,
    subscribe(
      editorExtensionsNAe2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return enabled
        ? (..._extraArguments: unknown[]): undefined => {}
        : (uniqueItems.add(editorExtensionsNAe2),
          (..._extraArguments: unknown[]): Dynamic =>
            uniqueItems.delete(editorExtensionsNAe2));
    },
    hello: hello,
    dispose(..._extraArguments: unknown[]): undefined {
      uniqueItems.clear();
      helloSImport2();
      if (!enabled && editorExtensionsNAe !== null && helloDImport2) {
        editorExtensionsNAe.self.removeEventListener(
          `message`,
          removeEventListener2,
        );
      }
    },
  };
}

var editorExtensionsSet26: Dynamic;

var resolveEditorExtensionsValue37: Dynamic;

function resolveEditorExtensionsIncludes3(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(items) || items.length > 8) return null;
  let items2: Dynamic = [];
  for (let resolveEditorExtensionsIncludes3Result of items as Dynamic) {
    if (typeof resolveEditorExtensionsIncludes3Result != `string`) return null;
    if (
      resolveEditorExtensionsValue37(resolveEditorExtensionsIncludes3Result) &&
      !items2.includes(resolveEditorExtensionsIncludes3Result)
    ) {
      items2.push(resolveEditorExtensionsIncludes3Result);
    }
  }
  return items2;
}

var resolveEditorExtensionsEvery2: Dynamic;

function clearEditorExtensionsWords(
  clearEditorExtensionsWords2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let clearEditorExtensionsWordsResult: Dynamic = null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let clearEditorExtensionsWords3 = (
    clearEditorExtensionsWords4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearEditorExtensionsWords2 === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(clearEditorExtensionsWords2);
    if (
      helloLImport2 === null ||
      clearEditorExtensionsWords4.source !==
        clearEditorExtensionsWords2.parent ||
      clearEditorExtensionsWords4.origin !== helloLImport2
    )
      return;
    let data: Dynamic = clearEditorExtensionsWords4.data;
    if (typeof data != `object` || !data) return;
    let data2: Dynamic = data;
    if (data2.__frame_chrome_poke !== true) return;
    let editorExtensionsIncludes3: Dynamic = resolveEditorExtensionsIncludes3(
      data2.words,
    );
    if (
      !resolveEditorExtensionsEvery2(
        clearEditorExtensionsWordsResult,
        editorExtensionsIncludes3,
      )
    ) {
      clearEditorExtensionsWordsResult = editorExtensionsIncludes3;
      for (let clearEditorExtensionsWordsResult2 of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic)
        clearEditorExtensionsWordsResult2();
    }
  };
  let matchesClearEditorExtensionsWords: Dynamic =
    clearEditorExtensionsWords2 !== null &&
    canContactShell(clearEditorExtensionsWords2);
  if (matchesClearEditorExtensionsWords) {
    clearEditorExtensionsWords2.self.addEventListener(
      `message`,
      clearEditorExtensionsWords3,
    );
  }
  let enabled = false;
  return {
    words: (..._extraArguments: unknown[]): Dynamic =>
      clearEditorExtensionsWordsResult,
    says: (
      clearEditorExtensionsWords4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      clearEditorExtensionsWordsResult !== null &&
      clearEditorExtensionsWordsResult.includes(clearEditorExtensionsWords4),
    subscribe(
      clearEditorExtensionsWords4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(clearEditorExtensionsWords4);
      return (..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.delete(clearEditorExtensionsWords4);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      uniqueItems.clear();
      if (matchesClearEditorExtensionsWords && !enabled) {
        clearEditorExtensionsWords2.self.removeEventListener(
          `message`,
          clearEditorExtensionsWords3,
        );
      }
      enabled = true;
    },
  };
}

var EditorExtensionsBottomInset: {
    bottomInset: string;
};

var editorExtensionsValue99992: number;

function resolveEditorExtensionsIsFinite(
  editorExtensionsIsFinite?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof editorExtensionsIsFinite == `number` &&
    Number.isFinite(editorExtensionsIsFinite) &&
    editorExtensionsIsFinite > 0
    ? Math.round(editorExtensionsIsFinite)
    : 0;
}

function clearEditorExtensionsBottomInset(
  clearEditorExtensionsBottomInset2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let helloDImport2: Dynamic = canContactShell(clearEditorExtensionsBottomInset2);
  let count = 0;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let ceil = (
    clearEditorExtensionsBottomInset3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearEditorExtensionsBottomInset2 === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(
      clearEditorExtensionsBottomInset2,
    );
    if (
      helloLImport2 === null ||
      clearEditorExtensionsBottomInset3.source !==
        clearEditorExtensionsBottomInset2.parent ||
      clearEditorExtensionsBottomInset3.origin !== helloLImport2
    )
      return;
    let data: Dynamic = clearEditorExtensionsBottomInset3.data;
    if (typeof data != `object` || !data) return;
    let data2: Dynamic = data;
    if (data2.__frame_viewport !== true) return;
    let ceiling: Dynamic = options.ceiling();
    let difference =
      typeof ceiling == `number` && Number.isFinite(ceiling) && ceiling > 0
        ? Math.ceil(ceiling) - 1
        : editorExtensionsValue99992;
    let min = Math.min(
      resolveEditorExtensionsIsFinite(
        data2[EditorExtensionsBottomInset.bottomInset],
      ),
      difference,
    );
    if (min !== count) {
      count = min;
      for (let clearEditorExtensionsBottomInsetResult of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic)
        clearEditorExtensionsBottomInsetResult();
    }
  };
  if (clearEditorExtensionsBottomInset2 !== null && helloDImport2) {
    clearEditorExtensionsBottomInset2.self.addEventListener(`message`, ceil);
  }
  return {
    bottomInset: (..._extraArguments: unknown[]) => count,
    subscribe(
      clearEditorExtensionsBottomInset3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(clearEditorExtensionsBottomInset3);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(clearEditorExtensionsBottomInset3);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      uniqueItems.clear();
      if (clearEditorExtensionsBottomInset2 !== null && helloDImport2) {
        clearEditorExtensionsBottomInset2.self.removeEventListener(
          `message`,
          ceil,
        );
      }
    },
  };
}

var EditorExtensionsFrameClaudeActivityAsk: string;

function clearEditorExtensionsWAe(
  clearEditorExtensionsWAe2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let helloDImport2: Dynamic = canContactShell(clearEditorExtensionsWAe2);
  let clearEditorExtensionsWAeResult: Dynamic = null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let clearEditorExtensionsWAe3 = (
    clearEditorExtensionsWAe4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearEditorExtensionsWAe2 === null) return;
    let helloLImport2: Dynamic = knownShellOrigin(clearEditorExtensionsWAe2);
    if (
      helloLImport2 === null ||
      clearEditorExtensionsWAe4.source !== clearEditorExtensionsWAe2.parent ||
      clearEditorExtensionsWAe4.origin !== helloLImport2
    )
      return;
    let data: Dynamic = clearEditorExtensionsWAe4.data;
    if (typeof data != `object` || !data) return;
    let data2: Dynamic = data;
    if (
      !(
        data2.__frame_claude_activity !== true ||
        typeof data2.working != `boolean` ||
        data2.working === clearEditorExtensionsWAeResult
      )
    ) {
      clearEditorExtensionsWAeResult = data2.working;
      for (let clearEditorExtensionsWAeResult2 of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic)
        clearEditorExtensionsWAeResult2();
    }
  };
  let postMessage = (..._extraArguments: unknown[]): undefined => {
    let helloLImport2: Dynamic =
      clearEditorExtensionsWAe2 === null
        ? null
        : knownShellOrigin(clearEditorExtensionsWAe2);
    if (clearEditorExtensionsWAe2 !== null && helloLImport2 !== null) {
      clearEditorExtensionsWAe2.parent.postMessage(
        {
          [EditorExtensionsFrameClaudeActivityAsk]: true,
        },
        helloLImport2,
      );
    }
  };
  if (clearEditorExtensionsWAe2 !== null && helloDImport2) {
    clearEditorExtensionsWAe2.self.addEventListener(
      `message`,
      clearEditorExtensionsWAe3,
    );
  }
  postMessage();
  let helloSImport2: Dynamic = waitForShellOrigin(
    clearEditorExtensionsWAe2,
    postMessage,
  );
  return {
    working: (..._extraArguments: unknown[]): Dynamic =>
      clearEditorExtensionsWAeResult,
    subscribe(
      clearEditorExtensionsWAe4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(clearEditorExtensionsWAe4);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(clearEditorExtensionsWAe4);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      uniqueItems.clear();
      helloSImport2();
      if (clearEditorExtensionsWAe2 !== null && helloDImport2) {
        clearEditorExtensionsWAe2.self.removeEventListener(
          `message`,
          clearEditorExtensionsWAe3,
        );
      }
    },
  };
}

function resolveEditorExtensionsChar(
  editorExtensionsChar?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    char: editorExtensionsChar2,
    allowSpaces: editorExtensionsChar3,
    allowToIncludeChar: editorExtensionsChar4,
    allowedPrefixes: editorExtensionsChar5,
    startOfLine: editorExtensionsChar6,
    $position: editorExtensionsChar7,
  }: Dynamic = editorExtensionsChar;
  let editorExtensionsChar8: Dynamic =
    editorExtensionsChar3 && !editorExtensionsChar4;
  let escapeForRegEx2: Dynamic = escapeForRegEx(editorExtensionsChar2);
  let RegExp2 = RegExp(`\\s${escapeForRegEx2}$`);
  let label = editorExtensionsChar6 ? `^` : ``;
  let label2: Dynamic = editorExtensionsChar4 ? `` : escapeForRegEx2;
  let RegExp3 = RegExp(
    editorExtensionsChar8
      ? `${label}${escapeForRegEx2}.*?(?=\\s${label2}|$)`
      : `${label}(?:^)?${escapeForRegEx2}[^\\s${label2}]*`,
    `gm`,
  );
  let isText: Dynamic =
    editorExtensionsChar7.nodeBefore?.isText &&
    editorExtensionsChar7.nodeBefore.text;
  if (!isText) return null;
  let difference: number = editorExtensionsChar7.pos - isText.length;
  let pop: Dynamic = Array.from<Dynamic>(isText.matchAll(RegExp3)).pop();
  if (!pop || pop.input === undefined || pop.index === undefined) return null;
  let inputSlice: Dynamic = pop.input.slice(
    Math.max(0, pop.index - 1),
    pop.index,
  );
  let test = RegExp(`^[${editorExtensionsChar5?.join(``)}\0]?$`).test(
    inputSlice,
  );
  if (editorExtensionsChar5 !== null && !test) return null;
  let from: Dynamic = difference + pop.index;
  let total: Dynamic = from + pop[0].length;
  if (
    editorExtensionsChar8 &&
    RegExp2.test(isText.slice(total - 1, total + 1))
  ) {
    pop[0] += ` `;
    total += 1;
  }
  return from < editorExtensionsChar7.pos && total >= editorExtensionsChar7.pos
    ? {
        range: {
          from: from,
          to: total,
        },
        query: pop[0].slice(editorExtensionsChar2.length),
        text: pop[0],
      }
    : null;
}

function isEditorExtensionsDocChanged(
  editorExtensionsDocChanged?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsDocChanged.docChanged
    ? editorExtensionsDocChanged.steps.some(
        (step?: Dynamic, ..._extraArguments: unknown[]) => {
          let slice: Dynamic = step.slice;
          if (!slice?.content) return false;
          let textBetween: Dynamic = slice.content.textBetween(
            0,
            slice.content.size,
            `
`,
          );
          return /\s/.test(textBetween);
        },
      )
    : false;
}

var SuggestionPluginKey: Dynamic;

function loadEditorExtensionsPluginKey(
  {
    pluginKey = SuggestionPluginKey,
    editor: editor,
    char = `@`,
    allowSpaces = false,
    allowToIncludeChar = false,
    allowedPrefixes = [` `],
    startOfLine = false,
    decorationTag = `span`,
    decorationClass = `suggestion`,
    decorationContent = ``,
    decorationEmptyClass = `is-empty`,
    command = (..._extraArguments: unknown[]) => null,
    items = (..._extraArguments: unknown[]): Dynamic => [],
    render = (..._extraArguments: unknown[]): Dynamic => ({}),
    allow = (..._extraArguments: unknown[]) => true,
    findSuggestionMatch = resolveEditorExtensionsChar,
    shouldShow: shouldShow,
    shouldResetDismissed: shouldResetDismissed,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let loadEditorExtensionsPluginKeyResult: Dynamic;
  let render2: Dynamic = render?.();
  let allowSpaces2: Dynamic = allowSpaces && !allowToIncludeChar;
  let coordsAtPos: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let pos: Dynamic = editor.state.selection.$anchor.pos;
    let {
      top: coordsAtPos2,
      right: coordsAtPos3,
      bottom: coordsAtPos4,
      left: coordsAtPos5,
    }: Dynamic = editor.view.coordsAtPos(pos);
    try {
      return new (DOMRect as Dynamic)(
        coordsAtPos5,
        coordsAtPos2,
        coordsAtPos3 - coordsAtPos5,
        coordsAtPos4 - coordsAtPos2,
      );
    } catch {
      return null;
    }
  };
  let loadEditorExtensionsPluginKeyHandler: Dynamic = (
    editorExtensionsPluginKey?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options
      ? (..._extraArguments: unknown[]): Dynamic => {
          let decorationId: Dynamic = pluginKey.getState(
            editor.state,
          )?.decorationId;
          return (
            editorExtensionsPluginKey.dom
              .querySelector(`[data-decoration-id="${decorationId}"]`)
              ?.getBoundingClientRect() || null
          );
        }
      : coordsAtPos;
  let isEditorExtensionsDocChanged2: Dynamic = (
    {
      match: match,
      dismissedRange: dismissedRange,
      state: state,
      transaction: transaction,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    shouldResetDismissed?.({
      editor: editor,
      state: state,
      range: dismissedRange,
      match: match,
      transaction: transaction,
      allowSpaces: allowSpaces2,
    })
      ? false
      : allowSpaces2
        ? match.range.from === dismissedRange.from
        : match.range.from === dismissedRange.from &&
          !isEditorExtensionsDocChanged(transaction);
  function loadEditorExtensionsPluginKeyHandler2(
    editorExtensionsPluginKey?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    var loadEditorExtensionsPluginKeyResult2: Dynamic;
    try {
      let pluginKeyState: Dynamic = pluginKey.getState(
        editorExtensionsPluginKey.state,
      );
      let decorationNode: Dynamic = pluginKeyState?.decorationId
        ? editorExtensionsPluginKey.dom.querySelector(
            `[data-decoration-id="${pluginKeyState.decorationId}"]`,
          )
        : null;
      let record2: Dynamic = {
        editor: editor,
        range: pluginKeyState?.range || {
          from: 0,
          to: 0,
        },
        query: pluginKeyState?.query || null,
        text: pluginKeyState?.text || null,
        items: [],
        command: (
          editorExtensionsPluginKey2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          command({
            editor: editor,
            range: pluginKeyState?.range || {
              from: 0,
              to: 0,
            },
            props: editorExtensionsPluginKey2,
          }),
        decorationNode: decorationNode,
        clientRect: loadEditorExtensionsPluginKeyHandler(
          editorExtensionsPluginKey,
          decorationNode,
        ),
      };
      if (!((loadEditorExtensionsPluginKeyResult2 = render2?.onExit) == null)) {
        loadEditorExtensionsPluginKeyResult2.call(render2, record2);
      }
    } catch {}
    let setMeta: Dynamic = editorExtensionsPluginKey.state.tr.setMeta(options, {
      exit: true,
    });
    editorExtensionsPluginKey.dispatch(setMeta);
  }
  let plugin: Dynamic = new (Plugin as Dynamic)({
    key: pluginKey,
    view(..._extraArguments: unknown[]): Dynamic {
      return {
        update: async (
          editorExtensionsPluginKey?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          var loadEditorExtensionsPluginKeyResult2: Dynamic;
          var loadEditorExtensionsPluginKeyResult3: Dynamic;
          var loadEditorExtensionsPluginKeyResult4: Dynamic;
          var loadEditorExtensionsPluginKeyResult5: Dynamic;
          var loadEditorExtensionsPluginKeyResult6: Dynamic;
          let keyState: Dynamic = this.key?.getState(options);
          let keyState2: Dynamic = this.key?.getState(
            editorExtensionsPluginKey.state,
          );
          let active: Dynamic =
            keyState.active &&
            keyState2.active &&
            keyState.range.from !== keyState2.range.from;
          let enabled: Dynamic = !keyState.active && keyState2.active;
          let active2: Dynamic = keyState.active && !keyState2.active;
          let enabled2 =
            !enabled && !active2 && keyState.query !== keyState2.query;
          let enabled3: Dynamic = enabled || (active && enabled2);
          let enabled4: Dynamic = enabled2 || active;
          let active3: Dynamic = active2 || (active && enabled2);
          if (!enabled3 && !enabled4 && !active3) return;
          let keyState3: Dynamic = active3 && !enabled3 ? keyState : keyState2;
          let decorationNode: Dynamic =
            editorExtensionsPluginKey.dom.querySelector(
              `[data-decoration-id="${keyState3.decorationId}"]`,
            );
          loadEditorExtensionsPluginKeyResult = {
            editor: editor,
            range: keyState3.range,
            query: keyState3.query,
            text: keyState3.text,
            items: [],
            command: (
              editorExtensionsPluginKey2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              command({
                editor: editor,
                range: keyState3.range,
                props: editorExtensionsPluginKey2,
              }),
            decorationNode: decorationNode,
            clientRect: loadEditorExtensionsPluginKeyHandler(
              editorExtensionsPluginKey,
              decorationNode,
            ),
          };
          if (enabled3) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult2 =
                  render2?.onBeforeStart) == null
              )
            ) {
              loadEditorExtensionsPluginKeyResult2.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
          if (enabled4) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult3 =
                  render2?.onBeforeUpdate) == null
              )
            ) {
              loadEditorExtensionsPluginKeyResult3.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
          if (enabled4 || enabled3) {
            loadEditorExtensionsPluginKeyResult.items = await items({
              editor: editor,
              query: keyState3.query,
            });
          }
          if (active3) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult4 = render2?.onExit) == null
              )
            ) {
              loadEditorExtensionsPluginKeyResult4.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
          if (enabled4) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult5 = render2?.onUpdate) ==
                null
              )
            ) {
              loadEditorExtensionsPluginKeyResult5.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
          if (enabled3) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult6 = render2?.onStart) ==
                null
              )
            ) {
              loadEditorExtensionsPluginKeyResult6.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
        },
        destroy: (..._extraArguments: unknown[]): undefined => {
          var loadEditorExtensionsPluginKeyResult2: Dynamic;
          if (loadEditorExtensionsPluginKeyResult) {
            if (
              !(
                (loadEditorExtensionsPluginKeyResult2 = render2?.onExit) == null
              )
            ) {
              loadEditorExtensionsPluginKeyResult2.call(
                render2,
                loadEditorExtensionsPluginKeyResult,
              );
            }
          }
        },
      };
    },
    state: {
      init(..._extraArguments: unknown[]) {
        return {
          active: false,
          range: {
            from: 0,
            to: 0,
          },
          query: null,
          text: null,
          composing: false,
          dismissedRange: null,
        };
      },
      apply(
        transaction?: Dynamic,
        options?: Dynamic,
        context?: unknown,
        state?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let { isEditable: editor2 }: Dynamic = editor;
        let { composing: view }: Dynamic = editor.view;
        let { selection: transaction2 }: Dynamic = transaction;
        let { empty: transaction3, from: transaction4 }: Dynamic = transaction2;
        let record2: Dynamic = {
          ...options,
        };
        let meta: Dynamic = transaction.getMeta(pluginKey);
        if (meta && meta.exit) {
          record2.active = false;
          record2.decorationId = null;
          record2.range = {
            from: 0,
            to: 0,
          };
          record2.query = null;
          record2.text = null;
          record2.dismissedRange = options.active
            ? {
                ...options.range,
              }
            : options.dismissedRange;
          return record2;
        }
        record2.composing = view;
        if (transaction.docChanged && record2.dismissedRange !== null) {
          record2.dismissedRange = {
            from: transaction.mapping.map(record2.dismissedRange.from),
            to: transaction.mapping.map(record2.dismissedRange.to),
          };
        }
        if (editor2 && (transaction3 || editor.view.composing)) {
          if (
            (transaction4 < options.range.from ||
              transaction4 > options.range.to) &&
            !view &&
            !options.composing
          ) {
            record2.active = false;
          }
          let match: Dynamic = findSuggestionMatch({
            char: char,
            allowSpaces: allowSpaces,
            allowToIncludeChar: allowToIncludeChar,
            allowedPrefixes: allowedPrefixes,
            startOfLine: startOfLine,
            $position: transaction2.$from,
          });
          let label = `id_${Math.floor(Math.random() * 4294967295)}`;
          if (
            match &&
            allow({
              editor: editor,
              state: state,
              range: match.range,
              isActive: options.active,
            }) &&
            (!shouldShow ||
              shouldShow({
                editor: editor,
                range: match.range,
                query: match.query,
                text: match.text,
                transaction: transaction,
              }))
          ) {
            if (
              record2.dismissedRange !== null &&
              !isEditorExtensionsDocChanged2({
                match: match,
                dismissedRange: record2.dismissedRange,
                state: state,
                transaction: transaction,
              })
            ) {
              record2.dismissedRange = null;
            }
            if (record2.dismissedRange === null) {
              record2.active = true;
              record2.decorationId = options.decorationId
                ? options.decorationId
                : label;
              record2.range = match.range;
              record2.query = match.query;
              record2.text = match.text;
            } else {
              record2.active = false;
            }
          } else {
            if (!match) {
              record2.dismissedRange = null;
            }
            record2.active = false;
          }
        } else record2.active = false;
        if (!record2.active) {
          record2.decorationId = null;
          record2.range = {
            from: 0,
            to: 0,
          };
          record2.query = null;
          record2.text = null;
        }
        return record2;
      },
    },
    props: {
      handleKeyDown(
        view?: Dynamic,
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        var loadEditorExtensionsPluginKeyResult2: Dynamic;
        let { active: pluginState, range: range }: Dynamic = plugin.getState(
          view.state,
        );
        if (!pluginState) return false;
        if (event.key === `Escape` || event.key === `Esc`) {
          let pluginState2: Dynamic = plugin.getState(view.state);
          if (
            !(
              (loadEditorExtensionsPluginKeyResult2 = render2?.onKeyDown) ==
              null
            )
          ) {
            loadEditorExtensionsPluginKeyResult2.call(render2, {
              view: view,
              event: event,
              range: pluginState2.range,
            });
          }
          loadEditorExtensionsPluginKeyHandler2(view, pluginKey);
          return true;
        }
        return (
          render2?.onKeyDown?.call(render2, {
            view: view,
            event: event,
            range: range,
          }) || false
        );
      },
      decorations(
        editorExtensionsPluginKey?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let {
          active: pluginState,
          range: pluginState2,
          decorationId: dataDecorationId,
          query: pluginState3,
        }: Dynamic = plugin.getState(editorExtensionsPluginKey);
        if (!pluginState) return null;
        let enabled = !pluginState3?.length;
        let items2: Dynamic = [decorationClass];
        if (enabled) {
          items2.push(decorationEmptyClass);
        }
        return DecorationSet.create(editorExtensionsPluginKey.doc, [
          Decoration.inline(pluginState2.from, pluginState2.to, {
            nodeName: decorationTag,
            class: items2.join(` `),
            "data-decoration-id": dataDecorationId,
            "data-decoration-content": decorationContent,
          }),
        ]);
      },
    },
  });
  return plugin;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorExtensions5Step1(): void {
  (EditorExtensionsNull = `null`);
  (EditorExtensionsFrameChromeReport = `__frame_chrome_report`);
  (EditorExtensionsSaved = {
    saved: `saved`,
    unresolved: `unresolved`,
  });
  (editorExtensionsValue9999 = 9999);
  (EditorExtensionsByKey = `byKey`);
  (EditorExtensionsActions = `actions`);
  (editorExtensionsPattern14 = /^[a-z][a-z0-9_-]{0,31}$/);
  (EditorExtensionsExports = `exports`);
  (editorExtensionsPattern15 = /^[a-z0-9]{1,8}$/);
  (EditorExtensionsDestinations = `destinations`);
  (editorExtensionsPattern16 = /^[A-Za-z0-9_-]{16,64}$/);
  (EditorExtensionsFrameChromeDecline = `__frame_chrome_decline`);
  (EditorExtensionsInteractive = `interactive`);
  (EditorExtensionsCancelled = `cancelled`);
  (EditorExtensionsCommentSelection = `comment_selection`);
  (editorExtensionsSet25 = new (Set as Dynamic)([
    `saved`,
    `saving`,
    `unsaved`,
    `reconnecting`,
    `readonly`,
  ]));
  (EditorExtensionsFrameChromeHello = `__frame_chrome_hello`);
  (editorExtensionsSet26 = new (Set as Dynamic)([
    `readonly`,
    `selection_menu`,
    `chat_beside`,
  ]));
  (resolveEditorExtensionsValue37 = (
    editorExtensionsValue37?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorExtensionsSet26.has(editorExtensionsValue37));
  (resolveEditorExtensionsEvery2 = (
    items?: Dynamic,
    items2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items === null || items2 === null
      ? items === items2
      : items.length === items2.length &&
        items.every(
          (
            rolldownNImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => rolldownNImport2 === items2[index],
        ));
  (EditorExtensionsBottomInset = {
    bottomInset: `bottomInset`,
  });
  (editorExtensionsValue99992 = 9999);
  (EditorExtensionsFrameClaudeActivityAsk = `__frame_claude_activity_ask`);
  (SuggestionPluginKey = new (PluginKey as Dynamic)(`suggestion`));
}

export {
  EditorExtensionsCommentSelection,
  SuggestionPluginKey,
  clearEditorExtensionsBottomInset,
  clearEditorExtensionsWAe,
  clearEditorExtensionsWords,
  isEditorExtensionsLocation,
  isEditorExtensionsNAe,
  isEditorExtensionsValue,
  loadEditorExtensionsPluginKey,
  resolveEditorExtensionsChar,
  updateEditorExtensionsActions,
};

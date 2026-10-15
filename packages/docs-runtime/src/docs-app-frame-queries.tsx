/** BaoCut: extracted comment frame queries expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameEffect1(__documentClosure: Pick<DocumentFrameContext, "key" | "elementRef" | "setDocumentFrameState2" | "setDocumentFrameState3">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (__documentClosure.key === null) {
        __documentClosure.elementRef.current = null;
      }
      (0, __documentClosure.setDocumentFrameState2)(
        (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          event !== null && event.key !== __documentClosure.key ? null : event,
      );
      (0, __documentClosure.setDocumentFrameState3)(
        (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          event !== null && event.key !== __documentClosure.key ? null : event,
      );
    });
}

export function createDocumentFrameOnChange2(__documentClosure: Pick<DocumentFrameContext, "React" | "key" | "setDocumentFrameState2" | "DataModelSchemasState22">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (
      checked?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (__documentClosure.key !== null) {
        (0, __documentClosure.setDocumentFrameState2)({
          key: __documentClosure.key,
          checked: checked,
        });
        if (options?.remember !== false) {
          __documentClosure.DataModelSchemasState22.getState().set(checked);
        }
      }
    },
    [__documentClosure.key],
  ));
}

export function createDocumentFrameSetDocumentFrameState43(__documentClosure: Pick<DocumentFrameContext, "key" | "setDocumentFrameState3">): Dynamic {
  return ((named?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (__documentClosure.key !== null) {
        (0, __documentClosure.setDocumentFrameState3)({
          key: __documentClosure.key,
          named: named,
        });
      }
    });
}

export function createDocumentFrameSuggestions4(__documentClosure: Pick<DocumentFrameContext, "React" | "draft" | "enabled" | "resolveCommentAnchorsOpenedDirectly" | "blockKindOf" | "commentOnly" | "resolveDocumentRuntimeValue9" | "askOffer" | "loadCommentAnchorsList">): Dynamic {
  return ((0, __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      __documentClosure.draft && __documentClosure.enabled
        ? (..._extraArguments: unknown[]): Dynamic => {
            let commentAnchorsOpenedDirectly: Dynamic =
              (0, __documentClosure.resolveCommentAnchorsOpenedDirectly)(__documentClosure.draft, {
                blockKind: __documentClosure.draft.block
                  ? (0, __documentClosure.blockKindOf)?.(__documentClosure.draft.block.bid)
                  : undefined,
                commentOnly: __documentClosure.commentOnly,
                openedDirectly: (0, __documentClosure.resolveDocumentRuntimeValue9)(),
              });
            return !__documentClosure.askOffer || commentAnchorsOpenedDirectly.kind === `widget`
              ? (0, __documentClosure.loadCommentAnchorsList)(commentAnchorsOpenedDirectly)
              : (0, __documentClosure.askOffer)(commentAnchorsOpenedDirectly, {
                  surface: `margin`,
                  selectedText: __documentClosure.draft.quote,
                });
          }
        : undefined,
    [__documentClosure.draft, __documentClosure.enabled, __documentClosure.blockKindOf, __documentClosure.commentOnly, __documentClosure.askOffer],
  ));
}

export function createDocumentFrameEffect5(__documentClosure: Pick<DocumentFrameContext, "enabledRef2" | "enabledRef" | "filterCorrectionReady" | "seeded" | "foldOwnsThisPage" | "foldReady" | "documentFrameResult17" | "filter" | "setFilter">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (
        __documentClosure.enabledRef2.current ||
        __documentClosure.enabledRef.current ||
        !(0, __documentClosure.filterCorrectionReady)({
          seeded: __documentClosure.seeded,
          foldOwnsThisPage: __documentClosure.foldOwnsThisPage,
          foldReady: __documentClosure.foldReady,
        })
      )
        return;
      __documentClosure.enabledRef2.current = true;
      let label = __documentClosure.documentFrameResult17 > 0 ? `open` : `all`;
      if (__documentClosure.filter !== label) {
        (0, __documentClosure.setFilter)(label);
      }
    });
}

export function createDocumentFrameEffect6(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult20" | "filter" | "api" | "container" | "fsEntryId" | "widgetNodes2" | "setFilteredFlat">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.documentFrameResult20 || __documentClosure.filter === `open`) return;
      let enabled2 = true;
      Promise.all([
        __documentClosure.api.comments.list(__documentClosure.container, __documentClosure.fsEntryId, true),
        ...__documentClosure.widgetNodes2.map(
          (widgetNode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            __documentClosure.api.comments
              .list(__documentClosure.container, widgetNode, true)
              .catch((..._extraArguments: unknown[]): Dynamic => []),
        ),
      ]).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled2) {
            (0, __documentClosure.setFilteredFlat)(
              result
                .flat()
                .filter(
                  (flat?: Dynamic, ..._extraArguments: unknown[]) =>
                    !flat.deleted,
                ),
            );
          }
        },
        (..._extraArguments: unknown[]): undefined => {},
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled2 = false;
      };
    });
}

export function createDocumentFrameFileThreads7(__documentClosure: Pick<DocumentFrameContext, "React" | "items" | "documentFrameResult16" | "mode" | "filter" | "documentFrameResult22">): Dynamic {
  return ((0, __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let items2: Dynamic = __documentClosure.items.length
        ? [...__documentClosure.documentFrameResult16, ...__documentClosure.items]
        : __documentClosure.documentFrameResult16;
      return __documentClosure.mode === `margin` || __documentClosure.filter === `open`
        ? items2
        : __documentClosure.filter === `resolved`
          ? (__documentClosure.documentFrameResult22?.filter(
              (
                documentFrame?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => documentFrame.resolved,
            ) ?? [])
          : __documentClosure.documentFrameResult22 === null
            ? items2
            : [
                ...items2,
                ...__documentClosure.documentFrameResult22.filter(
                  (
                    documentFrameResult36?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) =>
                    !items2.some(
                      (item?: Dynamic, ..._extraArguments: unknown[]) =>
                        item.id === documentFrameResult36.id,
                    ),
                ),
              ];
    },
    [__documentClosure.mode, __documentClosure.filter, __documentClosure.documentFrameResult22, __documentClosure.documentFrameResult16, __documentClosure.items],
  ));
}

export function createDocumentFrameEffect8(__documentClosure: Pick<DocumentFrameContext, "React" | "memoized" | "DocumentRuntimeState5" | "fileThreads" | "callback" | "isRunProgress" | "isBuildConversation">): Dynamic {
  return ((0,
  __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.memoized.size === 0)
        return {
          widgetThreads: __documentClosure.DocumentRuntimeState5,
          fileThreads: __documentClosure.fileThreads,
        };
      let widgetThreads: Dynamic = [];
      let fileThreads2: Dynamic = [];
      for (let documentFrameResult36 of __documentClosure.fileThreads as Dynamic)
        if ((0, __documentClosure.callback)(documentFrameResult36)) {
          if (
            !(0, __documentClosure.isRunProgress)(documentFrameResult36) &&
            !(0, __documentClosure.isBuildConversation)(documentFrameResult36)
          ) {
            widgetThreads.push(documentFrameResult36);
          }
        } else {
          fileThreads2.push(documentFrameResult36);
        }
      return {
        widgetThreads: widgetThreads,
        fileThreads: fileThreads2,
      };
    },
    [__documentClosure.fileThreads, __documentClosure.memoized, __documentClosure.callback],
  ));
}

export function createDocumentFrameNodeName29(__documentClosure: Pick<DocumentFrameContext, "React" | "callback2" | "nodeName">): Dynamic {
  return ((0, __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let event of __documentClosure.callback2 as Dynamic) {
        let pageId: Dynamic = event.target?.pageId ?? ``;
        if (!pageId || lookup3.has(pageId)) continue;
        let nodeName3: Dynamic = (0, __documentClosure.nodeName)?.(pageId);
        lookup3.set(
          pageId,
          nodeName3 && nodeName3 !== pageId ? nodeName3 : undefined,
        );
      }
      return lookup3;
    },
    [__documentClosure.callback2, __documentClosure.nodeName],
  ));
}

export function createDocumentFrameCallback510(__documentClosure: Pick<DocumentFrameContext, "React" | "documentFrameResult24" | "filterCommentsStoreTargetWords">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let pin: Dynamic = event.target?.pin;
      let component: Dynamic = pin?.component;
      if (!component) return;
      let documentFrameResultItem: Dynamic =
        __documentClosure.documentFrameResult24[
          `${pin.node || event.target?.pageId || ``}|${component}`
        ];
      if (documentFrameResultItem === undefined) return;
      let byIdItem: Dynamic = documentFrameResultItem.byId[event.id];
      if (
        byIdItem === undefined &&
        (pin.resolved !== undefined || pin.datum !== undefined)
      )
        return;
      let text: Dynamic = (0, __documentClosure.filterCommentsStoreTargetWords)({
        ...(documentFrameResultItem.chart === undefined
          ? {}
          : {
              chart: documentFrameResultItem.chart,
            }),
        ...byIdItem,
      });
      if (text === null) return;
      let color: Dynamic = byIdItem?.row?.color;
      return {
        text: text,
        ...(color === undefined
          ? {}
          : {
              color: color,
            }),
      };
    },
    [__documentClosure.documentFrameResult24],
  ));
}

export function createDocumentFrameCallback611(__documentClosure: Pick<DocumentFrameContext, "React" | "resolveWidgetBridgeLabel" | "resolveCommentsStoreStored" | "resolveCommentsEditorReactionOnly" | "callback4" | "callback5" | "nodeName2">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (
      event?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let widgetBridgeLabel: Dynamic = options
        ? undefined
        : (0, __documentClosure.resolveWidgetBridgeLabel)(event);
      if (widgetBridgeLabel !== undefined) return widgetBridgeLabel;
      let documentFrameResult36 = event.target?.pin?.component
        ? undefined
        : (0, __documentClosure.resolveCommentsStoreStored)({
            stored: event.storedLabel,
          });
      if (!(0, __documentClosure.resolveCommentsEditorReactionOnly)(event))
        return documentFrameResult36 ?? (0, __documentClosure.callback4)(event);
      let text: Dynamic = (0, __documentClosure.callback5)(event)?.text;
      if (text !== undefined) return text;
      if (documentFrameResult36 !== undefined) return documentFrameResult36;
      if (!event.target?.pin?.component) return (0, __documentClosure.callback4)(event);
      let nodeNameEntry: Dynamic = __documentClosure.nodeName2.get(event.target?.pageId ?? ``);
      return nodeNameEntry ? `re: ${nodeNameEntry}` : undefined;
    },
    [__documentClosure.callback4, __documentClosure.callback5, __documentClosure.nodeName2],
  ));
}

export function createDocumentFrameMemoized412(__documentClosure: Pick<DocumentFrameContext, "React" | "callback2" | "isDatumPinThread" | "widgetAnchorOfThread">): Dynamic {
  return ((0, __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let event of __documentClosure.callback2 as Dynamic) {
        if (event.resolved || event.deleted || (0, __documentClosure.isDatumPinThread)(event))
          continue;
        let documentFrameResult36 = (0, __documentClosure.widgetAnchorOfThread)(event);
        if (!documentFrameResult36) continue;
        let label = `${event.target?.pageId ?? ``}.${documentFrameResult36.element}`;
        if (!lookup3.has(label)) {
          lookup3.set(label, event.id);
        }
      }
      return lookup3;
    },
    [__documentClosure.callback2],
  ));
}

export function createDocumentFrameReadId13(__documentClosure: Pick<DocumentFrameContext, "React" | "documentFrameResult5" | "resolveWidgetBridgeLabel" | "documentFrameResult9" | "widgetAnchorOfThread" | "memoized4">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.documentFrameResult5[event.id] !== undefined) return event.id;
      let documentFrameResultItem: Dynamic =
        (0, __documentClosure.resolveWidgetBridgeLabel)(event) === undefined
          ? undefined
          : __documentClosure.documentFrameResult9[event.id];
      if (
        documentFrameResultItem !== undefined &&
        __documentClosure.documentFrameResult5[documentFrameResultItem] !== undefined
      )
        return documentFrameResultItem;
      let documentFrameResult36 = (0, __documentClosure.widgetAnchorOfThread)(event);
      if (!documentFrameResult36) return;
      let memoizedEntry: Dynamic = __documentClosure.memoized4.get(
        `${event.target?.pageId ?? ``}.${documentFrameResult36.element}`,
      );
      return memoizedEntry !== undefined &&
        __documentClosure.documentFrameResult5[memoizedEntry] !== undefined
        ? memoizedEntry
        : undefined;
    },
    [__documentClosure.documentFrameResult5, __documentClosure.documentFrameResult9, __documentClosure.memoized4],
  ));
}

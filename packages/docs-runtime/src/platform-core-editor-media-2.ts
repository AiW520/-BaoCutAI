/** BaoCut: editor media from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Extension,
  InputRule,
  Node2,
  NodeSelection,
  Plugin,
  PluginKey,
  Selection,
  TextSelection,
  keymap,
  mergeAttributes,
} from "./platform-core-dependencies";
import {
  resolvePlatformSessionAndSourcesValue,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsClaude,
  resolveEditorExtensionsLabel,
  resolveEditorExtensionsRole,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsValue13,
} from "./platform-core-editor-extensions-2";
import {
  EditorAnchorsAndMentionsMessage,
  EditorAnchorsAndMentionsSomeone,
  getEditorAnchorsAndMentionsValue,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsPlatform,
  resolveEditorAnchorsAndMentionsValue10,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  resolveObservabilityBrowserAndOperationEventsImagePng,
  resolveObservabilityBrowserAndOperationEventsVideoWebm,
} from "./platform-core-observability-browser-and-operation-events-2";
import {
  EditorHostCeil,
  EditorHostState11,
  filterEditorHostSlice,
  resolveEditorHostCenter,
  resolveEditorHostGray,
  resolveEditorHostIsInteger,
} from "./platform-core-editor-host-1";
import {
  ParagraphNode,
} from "./platform-core-comments-editor";
import {
  HorizontalRuleNode,
  isEditorSelectionAndTablesHead,
} from "./platform-core-editor-selection-and-tables-1";
import {
  clearEditorChipsAndNodeViewsDelete,
  collectEditorChipsAndNodeViewsInline,
  getEditorChipsAndNodeViewsValue,
  resolveEditorChipsAndNodeViewsPickDate,
  resolveEditorChipsAndNodeViewsValue3,
  resolveEditorChipsAndNodeViewsValue5,
  updateEditorChipsAndNodeViewsDom,
  updateEditorChipsAndNodeViewsNode,
  updateEditorChipsAndNodeViewsResolve,
} from "./platform-core-editor-chips-and-node-views-1";
import {
  loadEditorChipsAndNodeViewsDom,
  resolveEditorChipsAndNodeViewsFind,
  resolveEditorChipsAndNodeViewsKind,
  updateEditorChipsAndNodeViewsLabel,
} from "./platform-core-editor-chips-and-node-views-2";
import {
  EditorTableControlsBoundaryMarker,
  TableRowNode,
} from "./platform-core-editor-table-controls-1";
import {
  EditorMediaDataLfileMediaFluid,
  EditorMediaDraggable,
  EditorMediaGroup,
  EditorMediaMaster16,
  EditorMediaMessage2,
  EditorMediaMessage3,
  EditorMediaOpReminted,
  editorMediaWeakMap2,
  editorMediaWeakMap3,
  editorMediaWeakMap4,
  isEditorMediaAppendedTransaction,
  isEditorMediaArrowLeft,
  isEditorMediaBottom,
  isEditorMediaCurrentSrc,
  isEditorMediaDrag,
  isEditorMediaEvery,
  isEditorMediaLeft,
  isEditorMediaRight,
  isEditorMediaValue,
  resolveEditorMediaAddAttributes,
  resolveEditorMediaDecode,
  resolveEditorMediaIsFinite3,
  resolveEditorMediaLfilePmMediaCropped,
  resolveEditorMediaSafeParse,
  resolveEditorMediaScope,
  resolveEditorMediaTest,
  resolveEditorMediaTest2,
  resolveEditorMediaValue3,
  resolveEditorMediaValue4,
  resolveEditorMediaWidth,
} from "./platform-core-editor-media-1";

function resolveEditorMediaSpan(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let EditorMediaMessage32 = context
    ? EditorMediaMessage3
    : EditorMediaMessage2;
  let ownerDocument2: Dynamic = element.ownerDocument;
  element.replaceChildren();
  let element2: Dynamic = ownerDocument2.createElement(`span`);
  element2.textContent = EditorMediaMessage32;
  element.append(element2);
  element.setAttribute(`data-lfile-media-gone`, context ? `video` : `image`);
  element.setAttribute(`role`, `img`);
  element.setAttribute(
    `aria-label`,
    options ? `${EditorMediaMessage32} (${options})` : EditorMediaMessage32,
  );
  element.title = EditorMediaMessage32;
}

var editorMediaWeakMap5: Dynamic;

var updateEditorMediaUrl: Dynamic;

var clearEditorMediaHolds: (clearEditorMediaHolds2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var MediaNode: Dynamic;

var editorMediaValue512: number;

var resolveEditorMediaValue5: Dynamic;

var editorMediaPattern: RegExp;

function resolveEditorMediaExec(
  editorMediaExec?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof editorMediaExec != `string`) return null;
  let match = editorMediaPattern.exec(editorMediaExec);
  if (!match) return null;
  let [items, setItems]: Dynamic = [Number(match[1]), Number(match[2])];
  return items < 1 ||
    items > 12 ||
    setItems < 1 ||
    setItems > 31 ||
    (match[3] !== undefined && (Number(match[3]) > 23 || Number(match[4]) > 59))
    ? null
    : editorMediaExec;
}

var editorMediaSet2: Dynamic;

var editorMediaSet3: Dynamic;

function isEditorMediaContainer(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof items != `string` ||
    items.length === 0 ||
    [...items].length > editorMediaValue512 ||
    items.includes(`#`)
  )
    return null;
  let itemsParts = items.split(`/`);
  return !itemsParts.every(
    (items2?: Dynamic, ..._extraArguments: unknown[]) =>
      items2.length > 0 && !/[\s\u0085]/u.test(items2),
  ) || itemsParts.length !== 2
    ? null
    : editorMediaSet2.has(itemsParts[0])
      ? `container`
      : editorMediaSet3.has(itemsParts[0])
        ? `ref`
        : null;
}

var resolveEditorMediaPrincipal: Dynamic;

var EditorMediaUnknown: string;

var EditorMediaMessage4: string;

var EditorMediaSelectable: Dynamic;

function resolveEditorMediaPrincipal2(
  actor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let principal: Dynamic = actor.principal;
  let editorChipsAndNodeViewsValue: Dynamic =
    typeof principal == `string` &&
    resolveEditorAnchorsAndMentionsPlatform(principal)
      ? getEditorChipsAndNodeViewsValue(principal)
      : null;
  return (
    (resolveEditorExtensionsClaude(actor)
      ? editorChipsAndNodeViewsValue || resolveEditorExtensionsLabel(actor)
      : null) || resolveEditorMediaClaude(principal)
  );
}

var resolveEditorMediaValue6: Dynamic;

var EditorMediaClaude: string;

var EditorMediaMessage5: string;

function resolveEditorMediaClaude(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items.length === 0) return EditorMediaUnknown;
  if (items === `claude`) return EditorMediaClaude;
  if (resolveEditorAnchorsAndMentionsPlatform(items)) {
    let editorChipsAndNodeViewsValue: Dynamic =
      getEditorChipsAndNodeViewsValue(items);
    return (
      editorChipsAndNodeViewsValue ??
      (editorChipsAndNodeViewsValue === null ? `Someone` : EditorMediaMessage5)
    );
  }
  return items.includes(`@`)
    ? resolvePlatformSessionAndSourcesValue(items)
    : items;
}

var editorMediaMap: Dynamic;

var EditorMediaResolve: Promise<null>;

function updateEditorMediaThen(
  updateEditorMediaThen2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof updateEditorMediaThen2 == `string` &&
    resolveEditorAnchorsAndMentionsPlatform(updateEditorMediaThen2)
  )
    return updateEditorChipsAndNodeViewsResolve(updateEditorMediaThen2).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        result || null,
    );
  let editorChipsAndNodeViewsValue3: Dynamic =
    resolveEditorChipsAndNodeViewsValue3();
  if (
    typeof updateEditorMediaThen2 != `string` ||
    !updateEditorMediaThen2.includes(`@`) ||
    !editorChipsAndNodeViewsValue3
  )
    return EditorMediaResolve;
  if (!editorMediaMap.has(updateEditorMediaThen2)) {
    let then: Dynamic = resolveEditorChipsAndNodeViewsValue5(
      updateEditorMediaThen2,
    ).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        result ??
        editorChipsAndNodeViewsValue3(updateEditorMediaThen2).then(
          (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result2.hits.find(
              (hit2?: Dynamic, ..._extraArguments: unknown[]) =>
                hit2.id.toLowerCase() === updateEditorMediaThen2.toLowerCase(),
            )?.label ?? null,
          (..._extraArguments: unknown[]) => null,
        ),
      (..._extraArguments: unknown[]) => null,
    );
    editorMediaMap.set(updateEditorMediaThen2, then);
    then.then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        result === null &&
        editorMediaMap.get(updateEditorMediaThen2) === then
      ) {
        editorMediaMap.delete(updateEditorMediaThen2);
      }
    });
  }
  return editorMediaMap.get(updateEditorMediaThen2);
}

var resolveEditorMediaTrim: Dynamic;

var resolveEditorMediaIsConnected: Dynamic;

var resolveEditorMediaGetAttrs: Dynamic;

var EditorMediaAddAttributes: Dynamic;

var EditorMediaAddAttributes2: Dynamic;

function isEditorMediaBackspace(..._extraArguments: unknown[]): Dynamic {
  let isEditorMediaBackspaceHandler: Dynamic = (
    editorMediaBackspace?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaBackspace.selection instanceof (NodeSelection as Dynamic) &&
    editorMediaBackspace.selection.node.type.name === `pending`;
  let scrollIntoView: Dynamic = (
    editorMediaBackspace?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    isEditorMediaBackspaceHandler(editorMediaBackspace)
      ? (options?.(editorMediaBackspace.tr.deleteSelection().scrollIntoView()),
        true)
      : false;
  let isEditorMediaBackspaceHandler2: Dynamic =
    (
      editorMediaBackspace?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      editorMediaBackspace2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let selection: Dynamic = editorMediaBackspace2.selection;
      if (
        !(selection instanceof (TextSelection as Dynamic)) ||
        !selection.empty
      )
        return false;
      let $from: Dynamic = selection.$from;
      if (!$from.parent.isTextblock || ($from.depth !== 1 && !context))
        return false;
      for (let difference2 = $from.depth - 1; difference2 >= 1; difference2--) {
        let node: Dynamic = $from.node(difference2);
        if (
          node.type.spec.isolating ||
          $from.index(difference2) !==
            (editorMediaBackspace ? 0 : node.childCount - 1)
        )
          return false;
      }
      if (
        !(editorMediaBackspace
          ? $from.parentOffset === 0
          : $from.parentOffset === $from.parent.content.size) &&
        !(
          options !== null &&
          context2 !== undefined &&
          context2.endOfTextblock(options)
        )
      )
        return false;
      let before: Dynamic = editorMediaBackspace
        ? $from.before(1)
        : $from.after(1);
      let resolve: Dynamic = editorMediaBackspace2.doc.resolve(before);
      let nodeBefore: Dynamic = editorMediaBackspace
        ? resolve.nodeBefore
        : resolve.nodeAfter;
      if (!nodeBefore || nodeBefore.type.name !== `pending`) return false;
      let difference: Dynamic = editorMediaBackspace
        ? before - nodeBefore.nodeSize
        : before;
      options2?.(
        editorMediaBackspace2.tr
          .setSelection(
            NodeSelection.create(editorMediaBackspace2.doc, difference),
          )
          .scrollIntoView(),
      );
      return true;
    };
  let isEditorMediaBackspaceHandler3: Dynamic =
    (editorMediaBackspace?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (
      editorMediaBackspace2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (!isEditorMediaBackspaceHandler(editorMediaBackspace2)) return false;
      let selection: Dynamic = editorMediaBackspace2.selection;
      let $from: Dynamic =
        editorMediaBackspace < 0 ? selection.$from : selection.$to;
      let findFrom: Dynamic =
        Selection.findFrom($from, editorMediaBackspace, true) ??
        Selection.findFrom($from, editorMediaBackspace);
      let parent: Dynamic = $from.parent;
      let pos: Dynamic = $from.pos;
      for (
        let difference: Dynamic = $from.index() - +(editorMediaBackspace < 0);
        difference >= 0 && difference < parent.childCount;
        difference += editorMediaBackspace
      ) {
        let child: Dynamic = parent.child(difference);
        let difference2: Dynamic =
          editorMediaBackspace < 0 ? pos - child.nodeSize : pos;
        if (
          findFrom &&
          (editorMediaBackspace < 0
            ? findFrom.from >= difference2
            : findFrom.from < difference2 + child.nodeSize)
        )
          break;
        if (child.type.name === `pending`) {
          options?.(
            editorMediaBackspace2.tr
              .setSelection(
                NodeSelection.create(editorMediaBackspace2.doc, difference2),
              )
              .scrollIntoView(),
          );
          return true;
        }
        pos =
          editorMediaBackspace < 0 ? difference2 : difference2 + child.nodeSize;
      }
      if (findFrom) {
        options?.(
          editorMediaBackspace2.tr.setSelection(findFrom).scrollIntoView(),
        );
      }
      return true;
    };
  let Enter = (
    editorMediaBackspace?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorMediaBackspaceHandler(editorMediaBackspace)) return false;
    let to: Dynamic = editorMediaBackspace.selection.to;
    let paragraph: Dynamic = editorMediaBackspace.schema.nodes.paragraph;
    if (!paragraph) return false;
    let insert: Dynamic = editorMediaBackspace.tr.insert(
      to,
      paragraph.create(),
    );
    insert
      .setSelection(TextSelection.create(insert.doc, to + 1))
      .scrollIntoView();
    options?.(insert);
    return true;
  };
  let isEditorMediaBackspaceHandler4: Dynamic =
    (...editorMediaBackspace: Dynamic[]): Dynamic =>
    (
      editorMediaBackspace2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      editorMediaBackspace.some(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          rolldownNImport2(editorMediaBackspace2, options, context),
      );
  return [
    keymap({
      Backspace: isEditorMediaBackspaceHandler4(
        scrollIntoView,
        isEditorMediaBackspaceHandler2(true, null),
      ),
      Delete: isEditorMediaBackspaceHandler4(
        scrollIntoView,
        isEditorMediaBackspaceHandler2(false, null),
      ),
      ArrowUp: isEditorMediaBackspaceHandler4(
        isEditorMediaBackspaceHandler3(-1),
        isEditorMediaBackspaceHandler2(true, `up`, true),
      ),
      ArrowLeft: isEditorMediaBackspaceHandler4(
        isEditorMediaBackspaceHandler3(-1),
        isEditorMediaBackspaceHandler2(true, null, true),
      ),
      ArrowDown: isEditorMediaBackspaceHandler4(
        isEditorMediaBackspaceHandler3(1),
        isEditorMediaBackspaceHandler2(false, `down`, true),
      ),
      ArrowRight: isEditorMediaBackspaceHandler4(
        isEditorMediaBackspaceHandler3(1),
        isEditorMediaBackspaceHandler2(false, null, true),
      ),
      Enter: Enter,
    }),
    new (Plugin as Dynamic)({
      key: new (PluginKey as Dynamic)(`ldocPendingPick`),
      props: {
        handleClickOn: (
          editorMediaBackspace?: Dynamic,
          options?: unknown,
          context?: Dynamic,
          dependencies?: Dynamic,
          argument?: unknown,
          argument2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          context.type.name !== `pending` || !argument2
            ? false
            : (editorMediaBackspace.dispatch(
                editorMediaBackspace.state.tr.setSelection(
                  NodeSelection.create(
                    editorMediaBackspace.state.doc,
                    dependencies,
                  ),
                ),
              ),
              true),
        handleKeyDown: (
          editorMediaBackspace?: Dynamic,
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          isEditorMediaBackspaceHandler(editorMediaBackspace.state)
            ? event.key === `Enter`
              ? Enter(editorMediaBackspace.state, editorMediaBackspace.dispatch)
              : event.key.length === 1 &&
                  !event.metaKey &&
                  !event.ctrlKey &&
                  !event.altKey
                ? (getEditorAnchorsAndMentionsValue(editorMediaBackspace), true)
                : false
            : false,
        handleTextInput: (
          editorMediaBackspace?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          isEditorMediaBackspaceHandler(editorMediaBackspace.state)
            ? (getEditorAnchorsAndMentionsValue(editorMediaBackspace), true)
            : false,
      },
    }),
  ];
}

var PendingKeysExtension: Dynamic;

var PendingNode: Dynamic;

function isEditorMediaCell(
  editorMediaCell?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolve: Dynamic = editorMediaCell.resolve(options);
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--) {
    let tableRole: Dynamic = resolve.node(depth).type.spec.tableRole;
    if (tableRole === `cell` || tableRole === `header_cell`) return true;
  }
  return false;
}

var EditorMediaAddCommands: Dynamic;

var resolveEditorMediaParagraph: Dynamic;

var resolveEditorMediaOpRemote2: Dynamic;

var EditorMediaAddProseMirrorPlugins: Dynamic;

var EditorMediaAddAttributes3: Dynamic;

var PlatformLiveDocumentAndHistoryExtend: Dynamic;

var PlatformLiveDocumentAndHistoryDefault: Dynamic;

var PlatformLiveDocumentAndHistoryEnum: Dynamic;

var LdocStoredMarksExtension: Dynamic;

var PlatformLiveDocumentAndHistoryAddCommands: Dynamic;

var LdocCheckedLawExtension: Dynamic;

var resolvePlatformLiveDocumentAndHistorySinkListItemSameKind: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorMedia2Step1(): void {
  (editorMediaWeakMap5 = new (WeakMap as Dynamic)());
  (updateEditorMediaUrl = (
    updateEditorMediaUrl2?: Dynamic,
    type?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorMediaWeakMap5Entry: Dynamic = editorMediaWeakMap5.get(
      updateEditorMediaUrl2,
    );
    if (!editorMediaWeakMap5Entry) {
      editorMediaWeakMap5.set(
        updateEditorMediaUrl2,
        (editorMediaWeakMap5Entry = new (Map as Dynamic)()),
      );
    }
    let editorMediaWeakMap5EntryEntry: Dynamic =
      editorMediaWeakMap5Entry.get(type);
    if (editorMediaWeakMap5EntryEntry) {
      editorMediaWeakMap5EntryEntry.holds++;
      return editorMediaWeakMap5EntryEntry;
    }
    let record2: Dynamic = {
      url: URL.createObjectURL(
        type
          ? new Blob([updateEditorMediaUrl2], {
              type: type,
            })
          : new Blob([updateEditorMediaUrl2]),
      ),
      holds: 1,
      type: type,
      of: editorMediaWeakMap5Entry,
    };
    editorMediaWeakMap5Entry.set(type, record2);
    return record2;
  });
  (clearEditorMediaHolds = (
    clearEditorMediaHolds2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (--clearEditorMediaHolds2.holds > 0) return;
    let revokeObjectURL = (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          clearEditorMediaHolds2.holds > 0 ||
          clearEditorMediaHolds2.of.get(clearEditorMediaHolds2.type) !==
            clearEditorMediaHolds2
        )
      ) {
        clearEditorMediaHolds2.of.delete(clearEditorMediaHolds2.type);
        try {
          URL.revokeObjectURL(clearEditorMediaHolds2.url);
        } catch {}
      }
    };
    let editorExtensionsValue13: Dynamic = resolveEditorExtensionsValue13();
    try {
      if (editorExtensionsValue13)
        return void editorExtensionsValue13.schedule(revokeObjectURL, 0);
    } catch {}
    revokeObjectURL();
  });
  (MediaNode = Node2.create({
    name: `media`,
    inline: true,
    group: `inline`,
    atom: true,
    draggable: true,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        requestBlob: null,
        missNote: null,
        HTMLAttributes: {},
      };
    },
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        src: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            try {
              return resolveEditorMediaSafeParse(
                JSON.parse(element.getAttribute(`data-lfile-media-src`) ?? ``),
              );
            } catch {
              return null;
            }
          },
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editorMediaSafeParse: Dynamic = resolveEditorMediaSafeParse(
              mediaNode.src,
            );
            return editorMediaSafeParse
              ? {
                  "data-lfile-media-src": JSON.stringify(editorMediaSafeParse),
                }
              : {};
          },
        },
        name: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            element.getAttribute(`data-lfile-media-name`)?.slice(0, 512) || null,
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            mediaNode.name
              ? {
                  "data-lfile-media-name": String(mediaNode.name).slice(0, 512),
                }
              : {},
        },
        blob: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorMediaTest(element.getAttribute(`data-lfile-media-blob`)),
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataLfileMediaBlob: Dynamic = resolveEditorMediaTest(
              mediaNode.blob,
            );
            return dataLfileMediaBlob
              ? {
                  "data-lfile-media-blob": dataLfileMediaBlob,
                }
              : {};
          },
        },
        mime: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorMediaTest2(
              element.getAttribute(`data-lfile-media-mime`),
            ),
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataLfileMediaMime: Dynamic = resolveEditorMediaTest2(
              mediaNode.mime,
            );
            return dataLfileMediaMime
              ? {
                  "data-lfile-media-mime": dataLfileMediaMime,
                }
              : {};
          },
        },
        dims: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            try {
              return resolveEditorMediaValue3(
                JSON.parse(element.getAttribute(`data-lfile-media-dims`) ?? ``),
              );
            } catch {
              return null;
            }
          },
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editorMediaValue3: Dynamic = resolveEditorMediaValue3(
              mediaNode.dims,
            );
            return editorMediaValue3
              ? {
                  "data-lfile-media-dims": JSON.stringify(editorMediaValue3),
                }
              : {};
          },
        },
        crop: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            try {
              return isEditorMediaEvery(
                JSON.parse(element.getAttribute(`data-lfile-media-crop`) ?? ``),
              );
            } catch {
              return null;
            }
          },
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let isEditorMediaEvery2: Dynamic = isEditorMediaEvery(mediaNode.crop);
            return isEditorMediaEvery2
              ? {
                  "data-lfile-media-crop": JSON.stringify(isEditorMediaEvery2),
                }
              : {};
          },
        },
        alt: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorMediaValue4(
              element.getAttribute(`alt`) ??
                element.getAttribute(`data-lfile-media-alt`) ??
                element.querySelector(`img[alt]`)?.getAttribute(`alt`),
            ),
          renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
        },
        width: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (element.hasAttribute(`data-lfile-media-blob`)) return null;
            let editorMediaIsFinite3: Dynamic = resolveEditorMediaIsFinite3(
              element.getAttribute(`width`) ??
                /(?:^|;)\s*width:\s*(\d+(?:\.\d+)?)px/.exec(
                  element.getAttribute(`style`) ?? ``,
                )?.[1],
            );
            return editorMediaIsFinite3 > 0 ? editorMediaIsFinite3 : null;
          },
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let width: Dynamic = resolveEditorMediaIsFinite3(mediaNode.width);
            return width > 0
              ? {
                  width: width,
                }
              : {};
          },
        },
        commentIds: {
          default: null,
          renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
        },
        align: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorHostCenter(element.getAttribute(`data-align`)),
          renderHTML: (
            mediaNode?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataAlign: Dynamic = resolveEditorHostCenter(mediaNode.align);
            return dataAlign
              ? {
                  "data-align": dataAlign,
                }
              : {};
          },
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]): Dynamic {
      return [
        {
          tag: `img[data-lfile-media-src]`,
        },
        {
          tag: `span[data-lfile-media-src]`,
        },
        {
          tag: `video[data-lfile-media-src]`,
        },
        {
          tag: `span[data-lfile-media-blob]`,
        },
        {
          tag: `img[src]`,
          getAttrs: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let url: Dynamic = element.getAttribute(`src`) ?? ``;
            return !/^data:/i.test(url) || url.length > EditorHostCeil
              ? false
              : {
                  src: {
                    kind: `data`,
                    url: url,
                  },
                  alt: element.getAttribute(`alt`),
                };
          },
        },
      ];
    },
    addNodeView(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let options: Dynamic = this.options;
      return (
        { node: node, editor: editor, getPos: getPos }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let ownerDocument2: Dynamic =
          editor.options.element?.ownerDocument ??
          (globalThis as Dynamic).document;
        let dom: Dynamic = ownerDocument2.createElement(`span`);
        dom.className = `lfile-pm-media`;
        let enabled = false;
        let index = 0;
        let mediaNodeResult: Dynamic = null;
        let clearEditorMediaHolds2 = (
          ..._extraArguments: unknown[]
        ): undefined => {
          mediaNodeResult &&= (clearEditorMediaHolds(mediaNodeResult), null);
        };
        let mediaNodeResult2: Dynamic = null;
        let mediaNodeResult3: Dynamic = null;
        let removeAttribute = (..._extraArguments: unknown[]): undefined => {
          mediaNodeResult3 = null;
          dom.removeAttribute(EditorMediaDataLfileMediaFluid);
          mediaNodeResult2 &&=
            (editorMediaWeakMap2.delete(mediaNodeResult2),
            editorMediaWeakMap3.delete(mediaNodeResult2),
            editorMediaWeakMap4.delete(mediaNodeResult2),
            null);
        };
        let startsWith: Dynamic = (
          mediaNode?: Dynamic,
          options2?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (options2.startsWith(`image/`)) {
            let element: Dynamic = ownerDocument2.createElement(`img`);
            element.src = mediaNode;
            let src: Dynamic = element.src;
            element.alt = context;
            element.className = `lfile-pm-media-img`;
            removeAttribute();
            mediaNodeResult2 = element;
            editorMediaWeakMap2.set(element, dom);
            editorMediaWeakMap4.set(element, src);
            element.addEventListener(
              `load`,
              (..._extraArguments: unknown[]): undefined => {
                if (
                  editorMediaWeakMap2.get(element) === dom &&
                  element.currentSrc === src &&
                  !element.getAttribute(`srcset`)
                ) {
                  editorMediaWeakMap3.set(element, {
                    w: element.naturalWidth,
                    h: element.naturalHeight,
                  });
                }
              },
            );
            return element;
          }
          if (options2.startsWith(`video/`)) {
            let element: Dynamic = ownerDocument2.createElement(`video`);
            element.src = mediaNode;
            element.playsInline = true;
            element.preload = `metadata`;
            return isEditorMediaArrowLeft(ownerDocument2, element, context, {
              editable: (..._extraArguments: unknown[]): Dynamic =>
                editor.isEditable,
              leave: (..._extraArguments: unknown[]): undefined => {
                let pos: Dynamic = getPos();
                if (typeof pos == `number`) {
                  editor
                    .chain()
                    .setNodeSelection(pos)
                    .focus(null, {
                      scrollIntoView: false,
                    })
                    .run();
                }
              },
            });
          }
          return null;
        };
        let append: Dynamic = (
          mediaNode?: Dynamic,
          options2?: unknown,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let element: Dynamic = ownerDocument2.createElement(`span`);
          element.className = `lfile-pm-media-card`;
          let element2: Dynamic = ownerDocument2.createElement(`span`);
          element2.textContent = String(mediaNode || `file`);
          let element3: Dynamic = ownerDocument2.createElement(`span`);
          element3.className = `lfile-file-meta`;
          element3.textContent =
            typeof options2 == `number` && Number.isFinite(options2)
              ? ` ${options2 < 1024 ? `${options2} B` : options2 < 1048576 ? `${(options2 / 1024).toFixed(1)} KB` : `${(options2 / 1048576).toFixed(1)} MB`} `
              : ` `;
          element3.append(
            resolveEditorAnchorsAndMentionsGrid2(
              ownerDocument2,
              EditorMediaMaster16,
              14,
            ),
          );
          element.append(element2, element3);
          return element;
        };
        let dom2: Dynamic = dom;
        let setAttribute = (
          mediaNode?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let editorMediaWidth: Dynamic = resolveEditorMediaWidth(
            mediaNode.attrs,
          );
          if (editorMediaWidth > 0) {
            dom.style.width = `${editorMediaWidth}px`;
          } else {
            dom.style.removeProperty(`width`);
          }
          let editorHostCenter: Dynamic = resolveEditorHostCenter(
            mediaNode.attrs.align,
          );
          if (editorHostCenter) {
            dom.setAttribute(`data-align`, editorHostCenter);
          } else {
            dom.removeAttribute(`data-align`);
          }
          let record2: Dynamic = {
            "data-lfile-media-blob": resolveEditorMediaTest(mediaNode.attrs.blob),
            "data-lfile-media-mime": resolveEditorMediaTest2(
              mediaNode.attrs.mime,
            ),
            "data-lfile-media-dims": ((
              mediaNode2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => (mediaNode2 ? JSON.stringify(mediaNode2) : null))(
              resolveEditorMediaValue3(mediaNode.attrs.dims),
            ),
            "data-lfile-media-crop": ((
              mediaNode2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => (mediaNode2 ? JSON.stringify(mediaNode2) : null))(
              isEditorMediaEvery(mediaNode.attrs.crop),
            ),
            "data-lfile-media-alt": resolveEditorMediaValue4(mediaNode.attrs.alt),
          };
          for (let [mediaNodeResult4, mediaNodeResult5] of Object.entries(
            record2,
          ) as Dynamic)
            if (mediaNodeResult5 === null) {
              dom.removeAttribute(mediaNodeResult4);
            } else {
              dom.setAttribute(mediaNodeResult4, mediaNodeResult5);
            }
          resolveEditorMediaLfilePmMediaCropped(
            dom,
            mediaNodeResult2,
            mediaNode.attrs,
          );
        };
        let append2 = (
          mediaNode?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (enabled) return;
          let mediaNodeResult4: Dynamic = ++index;
          clearEditorMediaHolds2();
          removeAttribute();
          dom.replaceChildren();
          dom2 = dom;
          for (let mediaNodeResult5 of filterEditorHostSlice(
            mediaNode.attrs.commentIds,
          ) as Dynamic) {
            let element: Dynamic = ownerDocument2.createElement(`span`);
            element.className = `lfile-comment-anchor`;
            element.setAttribute(`data-comment-id`, mediaNodeResult5);
            dom2.append(element);
            dom2 = element;
          }
          let editorMediaSafeParse: Dynamic = resolveEditorMediaSafeParse(
            mediaNode.attrs.src,
          );
          let text = String(mediaNode.attrs.alt ?? mediaNode.attrs.name ?? ``);
          setAttribute(mediaNode);
          if (editorMediaSafeParse?.kind === `data`) {
            let matchItem =
              /^data:([^;,]*)/i.exec(editorMediaSafeParse.url)?.[1] ?? ``;
            let startsWith2: Dynamic = startsWith(
              editorMediaSafeParse.url,
              matchItem,
              text,
            );
            dom2.append(
              startsWith2 ?? append(String(mediaNode.attrs.name || text)),
            );
            setAttribute(mediaNode);
            dom.removeAttribute(`data-lfile-media-src-pending`);
            return;
          }
          let editorMediaTest: Dynamic = editorMediaSafeParse
            ? null
            : resolveEditorMediaTest(mediaNode.attrs.blob);
          if (editorMediaSafeParse?.kind === `blob` || editorMediaTest) {
            let sha: Dynamic =
              editorMediaSafeParse?.kind === `blob`
                ? editorMediaSafeParse.sha
                : editorMediaTest;
            let mime: Dynamic =
              (editorMediaSafeParse?.kind === `blob`
                ? editorMediaSafeParse.mime
                : resolveEditorMediaTest2(mediaNode.attrs.mime)) ?? ``;
            dom2.append(
              append(
                String(mediaNode.attrs.name || text),
                editorMediaSafeParse?.kind === `blob`
                  ? editorMediaSafeParse.size
                  : undefined,
              ),
            );
            let label: Dynamic = mime === `application/octet-stream` ? `` : mime;
            let label2: Dynamic =
              label || (editorMediaTest ? `image/unknown` : ``);
            let requestBlob: Dynamic = options.requestBlob;
            let lastElementChild: Dynamic = dom2.lastElementChild;
            if (
              requestBlob &&
              (label2.startsWith(`image/`) || label2.startsWith(`video/`))
            ) {
              dom.setAttribute(`data-lfile-media-src-pending`, `blob:${sha}`);
              requestBlob(
                sha,
                (
                  mediaNode2?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (enabled || index !== mediaNodeResult4) return;
                  if (!mediaNode2) {
                    if (!options2 || lastElementChild === null) return;
                    if (options.missNote !== null) {
                      let matchedElement: Dynamic =
                        lastElementChild.querySelector(`.lfile-file-meta`);
                      if (matchedElement) {
                        matchedElement.textContent = ` · ${options.missNote}`;
                      }
                      lastElementChild.setAttribute(
                        `data-lfile-media-miss`,
                        options.missNote,
                      );
                      lastElementChild.title = `${options.missNote} — the film records this blob's ADDRESS; its bytes were never captured`;
                    } else
                      resolveEditorMediaSpan(
                        lastElementChild,
                        text,
                        label2.startsWith(`video/`),
                      );
                    dom.removeAttribute(`data-lfile-media-src-pending`);
                    return;
                  }
                  clearEditorMediaHolds2();
                  let observabilityBrowserAndOperationEventsVideoWebm =
                    label === ``
                      ? resolveObservabilityBrowserAndOperationEventsVideoWebm(
                          mediaNode2,
                        )
                      : undefined;
                  let label3: Dynamic =
                    label ||
                    observabilityBrowserAndOperationEventsVideoWebm ||
                    resolveObservabilityBrowserAndOperationEventsImagePng(
                      mediaNode2,
                    ) ||
                    (resolveEditorMediaDecode(mediaNode2) ? `image/svg+xml` : ``);
                  mediaNodeResult = updateEditorMediaUrl(mediaNode2, label3);
                  let startsWith2: Dynamic = startsWith(
                    mediaNodeResult.url,
                    observabilityBrowserAndOperationEventsVideoWebm ?? label2,
                    text,
                  );
                  if (startsWith2) {
                    let matchedElement: Dynamic =
                      startsWith2.querySelector(`video`) ?? startsWith2;
                    if (label === `` || matchedElement.tagName === `VIDEO`) {
                      matchedElement.addEventListener(
                        `error`,
                        (..._extraArguments: unknown[]): undefined => {
                          if (!(enabled || index !== mediaNodeResult4)) {
                            clearEditorMediaHolds2();
                            removeAttribute();
                            dom2.replaceChildren(
                              append(
                                String(
                                  node2.attrs.name || (node2.attrs.alt ?? ``),
                                ),
                                editorMediaSafeParse?.kind === `blob`
                                  ? editorMediaSafeParse.size
                                  : undefined,
                              ),
                            );
                            setAttribute(node2);
                            dom.removeAttribute(`data-lfile-media-src-pending`);
                          }
                        },
                      );
                    }
                    if (label3.toLowerCase() === `image/svg+xml`) {
                      let enabled2 = false;
                      let setAttribute2 = (
                        ..._extraArguments: unknown[]
                      ): undefined => {
                        if (
                          !(
                            enabled ||
                            mediaNodeResult2 !== startsWith2 ||
                            !enabled2
                          )
                        ) {
                          if (
                            startsWith2.offsetParent !== null &&
                            startsWith2.getBoundingClientRect().width < 1
                          ) {
                            dom.setAttribute(EditorMediaDataLfileMediaFluid, ``);
                          }
                        }
                      };
                      mediaNodeResult3 = setAttribute2;
                      startsWith2.addEventListener(
                        `load`,
                        (..._extraArguments: unknown[]): undefined => {
                          if (index === mediaNodeResult4) {
                            enabled2 = true;
                            setAttribute2();
                          }
                        },
                      );
                      startsWith2.addEventListener(
                        `error`,
                        (..._extraArguments: unknown[]): undefined => {
                          if (
                            !(
                              enabled ||
                              index !== mediaNodeResult4 ||
                              mediaNodeResult2 !== startsWith2
                            )
                          ) {
                            dom.removeAttribute(EditorMediaDataLfileMediaFluid);
                          }
                        },
                      );
                    }
                    dom2.replaceChildren(startsWith2);
                    setAttribute(node2);
                    dom.removeAttribute(`data-lfile-media-src-pending`);
                  }
                },
              );
            }
            return;
          }
          dom2.append(append(String(mediaNode.attrs.name || text || `media`)));
        };
        let node2: Dynamic = node;
        append2(node);
        let items: Dynamic = [`src`, `blob`, `mime`, `alt`, `name`, `commentIds`];
        return {
          dom: dom,
          stopEvent: isEditorMediaDrag,
          update: (mediaNode?: Dynamic, ..._extraArguments: unknown[]) => {
            if (mediaNode.type.name !== `media`) return false;
            let node3: Dynamic = node2;
            node2 = mediaNode;
            let mediaNodeHandler: Dynamic = (
              mediaNode2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              node3.attrs[mediaNode2] === mediaNode.attrs[mediaNode2] ||
              JSON.stringify(node3.attrs[mediaNode2] ?? null) ===
                JSON.stringify(mediaNode.attrs[mediaNode2] ?? null);
            if (items.every(mediaNodeHandler)) {
              setAttribute(mediaNode);
              mediaNodeResult3?.();
              return true;
            }
            let mediaNodeResult4: Dynamic = mediaNodeResult2;
            let get2: Dynamic = Object.getOwnPropertyDescriptor(
              (globalThis as Dynamic).Node.prototype,
              `parentNode`,
            )?.get;
            if (
              mediaNodeResult4 &&
              get2 &&
              Reflect.apply(get2, mediaNodeResult4, []) === dom2 &&
              isEditorMediaCurrentSrc(mediaNodeResult4) &&
              items.every(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  item === `alt` || mediaNodeHandler(item),
              )
            )
              try {
                Reflect.apply(
                  (Element as Dynamic).prototype.setAttribute,
                  mediaNodeResult4,
                  [
                    `alt`,
                    String(mediaNode.attrs.alt ?? mediaNode.attrs.name ?? ``),
                  ],
                );
                setAttribute(mediaNode);
                mediaNodeResult3?.();
                return true;
              } catch {}
            append2(mediaNode);
            return true;
          },
          destroy: (..._extraArguments: unknown[]): undefined => {
            enabled = true;
            clearEditorMediaHolds2();
            removeAttribute();
            dom.replaceChildren();
          },
        };
      };
    },
    renderHTML(
      { node: options, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let editorMediaSafeParse: Dynamic = resolveEditorMediaSafeParse(
        options.attrs.src,
      );
      let alt2 = String(options.attrs.alt ?? options.attrs.name ?? ``);
      let mediaNodeResult: Dynamic;
      mediaNodeResult =
        editorMediaSafeParse?.kind === `data` &&
        /^data:(image|video)\//i.test(editorMediaSafeParse.url)
          ? /^data:video\//i.test(editorMediaSafeParse.url)
            ? [
                `video`,
                mergeAttributes(HTMLAttributes, {
                  src: editorMediaSafeParse.url,
                  controls: ``,
                  class: `lfile-pm-media`,
                }),
              ]
            : [
                `img`,
                mergeAttributes(HTMLAttributes, {
                  src: editorMediaSafeParse.url,
                  alt: alt2,
                  class: `lfile-pm-media`,
                }),
              ]
          : [
              `span`,
              mergeAttributes(HTMLAttributes, {
                class: `lfile-pm-media lfile-pm-media-card`,
                ...(editorMediaSafeParse?.kind === `blob`
                  ? {
                      "data-lfile-media-sha": editorMediaSafeParse.sha,
                    }
                  : {}),
              }),
              String(options.attrs.name || alt2 || `file`),
            ];
      return filterEditorHostSlice(options.attrs.commentIds).reduceRight(
        (
          mediaNode?: Dynamic,
          dataCommentId?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          `span`,
          {
            class: `lfile-comment-anchor`,
            "data-comment-id": dataCommentId,
          },
          mediaNode,
        ],
        mediaNodeResult,
      );
    },
  }));
  (editorMediaValue512 = 512);
  (resolveEditorMediaValue5 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string` &&
    items.length > 0 &&
    [...items].length <= editorMediaValue512
      ? items
      : null);
  (editorMediaPattern = /^\d{4}-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?:\[[A-Za-z0-9/_+-]+\])?)?$/);
  (editorMediaSet2 = new (Set as Dynamic)([`project`, `suite`]));
  (editorMediaSet3 = new (Set as Dynamic)([
    `project`,
    `file`,
    `node`,
    `run`,
    `utterance`,
    `routine`,
    `enum`,
    `spec`,
    `suite`,
    `blob`,
    `database`,
    `table`,
    `row`,
    `version`,
  ]));
  (resolveEditorMediaPrincipal = (
    actor?: Dynamic,
    ..._extraArguments: unknown[]
  ) => typeof actor.ref == `string` && typeof actor.principal != `string`);
  (EditorMediaUnknown = `Unknown`);
  (EditorMediaMessage4 = `This mention names no one — click it to pick a person, or delete it`);
  (EditorMediaSelectable = EditorTableControlsBoundaryMarker.extend({
    selectable: true,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        principal: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            element.getAttribute(`data-principal`) ??
            element.getAttribute(`data-mention-id`),
          renderHTML: (
            actor?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            typeof actor.principal == `string`
              ? {
                  ...(resolveEditorMediaValue5(actor.principal) === null
                    ? {}
                    : {
                        "data-atom": `mention`,
                      }),
                  "data-principal": actor.principal,
                  "data-mention-id": actor.principal,
                }
              : {},
        },
        ref: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => element.getAttribute(`data-ref`),
          renderHTML: (
            editorMediaSelectable?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            typeof editorMediaSelectable.ref == `string`
              ? {
                  "data-ref": editorMediaSelectable.ref,
                }
              : {},
        },
        label: {
          default: null,
          parseHTML: (element?: Dynamic, ..._extraArguments: unknown[]) =>
            element.hasAttribute(`data-ref`)
              ? resolveEditorExtensionsTrim(element.getAttribute(`data-label`))
              : null,
          renderHTML: (
            editorMediaSelectable?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataLabel =
              typeof editorMediaSelectable.ref == `string`
                ? resolveEditorExtensionsTrim(editorMediaSelectable.label)
                : null;
            return dataLabel === null
              ? {}
              : {
                  "data-label": dataLabel,
                };
          },
        },
      };
    },
    parseHTML(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return [
        ...(this.parent?.() ?? []),
        {
          tag: `span[data-atom="mention"][data-principal]`,
        },
        {
          tag: `a[data-atom="ref"][data-ref]`,
        },
        {
          tag: `a[data-atom="container"][data-ref]`,
        },
        {
          tag: `span.ldoc-chip[data-ref]`,
        },
      ];
    },
    renderText({ node: node }: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return resolveEditorMediaPrincipal(node.attrs)
        ? resolveEditorChipsAndNodeViewsKind(node.attrs.ref, node.attrs.label)
        : `@${resolveEditorMediaPrincipal2(node.attrs)}`;
    },
    addNodeView(..._extraArguments: unknown[]): Dynamic {
      let node: Dynamic = updateEditorChipsAndNodeViewsNode(
        `mention`,
        (
          editorMediaSelectable?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => resolveEditorMediaValue6(editorMediaSelectable.ref),
        (
          { dom: dom, attrs: attrs, on: on2 }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (typeof attrs.ref == `string`) {
            dom.dataset.ref = attrs.ref;
          }
          let editorExtensionsTrim = resolveEditorExtensionsTrim(attrs.label);
          if (editorExtensionsTrim === null) {
            delete dom.dataset.label;
          } else {
            dom.dataset.label = editorExtensionsTrim;
          }
          return updateEditorChipsAndNodeViewsLabel(
            dom,
            attrs.ref,
            on2,
            editorExtensionsTrim,
          );
        },
      );
      return (
        editorMediaSelectable?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (resolveEditorMediaPrincipal(editorMediaSelectable.node.attrs)) {
          let node2: Dynamic = node(editorMediaSelectable);
          let bind: Dynamic = node2.update?.bind(node2);
          return {
            ...node2,
            update: (
              editorMediaSelectable2?: Dynamic,
              options?: Dynamic,
              context?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolveEditorMediaPrincipal(editorMediaSelectable2.attrs) &&
              (bind ? bind(editorMediaSelectable2, options, context) : true),
          };
        }
        let dom = document.createElement(`span`);
        dom.className = `ldoc-mention`;
        dom.contentEditable = `false`;
        let element = document.createElement(`span`);
        element.className = `t`;
        dom.append(element);
        let removeAttribute = (
          items?: unknown,
          options?: Dynamic,
          context: Dynamic = null,
          ..._extraArguments: unknown[]
        ): undefined => {
          let options2: Dynamic =
            options ||
            (typeof items == `string` &&
            resolveEditorAnchorsAndMentionsPlatform(items)
              ? getEditorChipsAndNodeViewsValue(items)
              : null);
          element.textContent = `@${options2 || context || resolveEditorMediaClaude(items)}`;
          let enabled = !(typeof items == `string` && items.length > 0);
          let matchesCondition: Dynamic =
            typeof items == `string` &&
            resolveEditorAnchorsAndMentionsPlatform(items);
          let enabled2: Dynamic =
            enabled || (matchesCondition && !(options2 || context));
          if (enabled2) {
            dom.dataset.unnamed = ``;
          } else {
            delete dom.dataset.unnamed;
          }
          if (matchesCondition && !options2 && context) {
            dom.dataset.face = `label`;
          } else {
            delete dom.dataset.face;
          }
          if (enabled) {
            dom.title = EditorMediaMessage4;
            dom.setAttribute(
              `aria-label`,
              `@${EditorMediaUnknown}, ${EditorMediaMessage4}`,
            );
          } else {
            if (enabled2 && getEditorChipsAndNodeViewsValue(items) === null) {
              dom.title = EditorAnchorsAndMentionsMessage;
              dom.setAttribute(
                `aria-label`,
                `@${EditorAnchorsAndMentionsSomeone}, ${EditorAnchorsAndMentionsMessage}`,
              );
            } else {
              dom.removeAttribute(`title`);
              dom.removeAttribute(`aria-label`);
            }
          }
        };
        let editorMediaSelectableResult: Dynamic = null;
        let updateEditorMediaThen2 = (
          editorMediaSelectable2?: unknown,
          ..._extraArguments: unknown[]
        ): undefined => {
          removeAttribute(
            editorMediaSelectable2,
            null,
            editorMediaSelectableResult,
          );
          if (typeof editorMediaSelectable2 == `string`) {
            dom.dataset.principal = editorMediaSelectable2;
          } else {
            delete dom.dataset.principal;
          }
          updateEditorMediaThen(editorMediaSelectable2).then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (dom.dataset.principal === editorMediaSelectable2) {
                removeAttribute(
                  editorMediaSelectable2,
                  result,
                  editorMediaSelectableResult,
                );
              }
            },
          );
        };
        editorMediaSelectableResult = resolveEditorExtensionsLabel(
          editorMediaSelectable.node.attrs,
        );
        updateEditorMediaThen2(editorMediaSelectable.node.attrs.principal);
        return {
          dom: dom,
          ignoreMutation: (..._extraArguments: unknown[]) => true,
          update: (
            editorMediaSelectable2?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            editorMediaSelectable2.type.name === `mention` &&
            !resolveEditorMediaPrincipal(editorMediaSelectable2.attrs) &&
            ((editorMediaSelectableResult = resolveEditorExtensionsLabel(
              editorMediaSelectable2.attrs,
            )),
            updateEditorMediaThen2(editorMediaSelectable2.attrs.principal),
            true),
          destroy: clearEditorChipsAndNodeViewsDelete(
            (..._extraArguments: unknown[]): undefined => {
              if (
                dom.dataset.unnamed !== undefined ||
                dom.dataset.face === `label`
              ) {
                updateEditorMediaThen2(dom.dataset.principal);
              }
            },
          ),
        };
      };
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (resolveEditorMediaPrincipal(node.attrs)) {
        let dataChip: Dynamic = resolveEditorMediaValue6(node.attrs.ref);
        let dataAtom = node.marks.some(
          (mark?: Dynamic, ..._extraArguments: unknown[]) =>
            mark.type.name === `link`,
        )
          ? null
          : isEditorMediaContainer(node.attrs.ref);
        return [
          dataAtom === null ? `span` : `a`,
          mergeAttributes(HTMLAttributes, {
            class: `ldoc-chip`,
            "data-chip": dataChip,
            ...(dataAtom === null
              ? {}
              : {
                  "data-atom": dataAtom,
                }),
          }),
          resolveEditorChipsAndNodeViewsKind(node.attrs.ref, node.attrs.label),
        ];
      }
      return [
        `span`,
        mergeAttributes(HTMLAttributes, {
          class: `ldoc-mention`,
        }),
        `@${resolveEditorMediaPrincipal2(node.attrs)}`,
      ];
    },
  }));
  (resolveEditorMediaValue6 = (
    editorMediaValue6?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (typeof editorMediaValue6 == `string`
      ? resolveEditorAnchorsAndMentionsValue10(editorMediaValue6)
      : null) ?? `ref`);
  (EditorMediaClaude = `Claude`);
  (EditorMediaMessage5 = `…`);
  (editorMediaMap = new (Map as Dynamic)());
  (EditorMediaResolve = Promise.resolve(null));
  (resolveEditorMediaTrim = (
    editorMediaTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!editorMediaTrim) return null;
    let resolveEditorMediaTrimResult: Dynamic;
    try {
      resolveEditorMediaTrimResult = new URL(
        editorMediaTrim.trim(),
        `https://paste.invalid/`,
      );
    } catch {
      return null;
    }
    if (
      resolveEditorMediaTrimResult.protocol !== `https:` &&
      resolveEditorMediaTrimResult.protocol !== `http:`
    )
      return null;
    let pathnameSlice: Dynamic = resolveEditorMediaTrimResult.pathname.slice(
      resolveEditorMediaTrimResult.pathname.lastIndexOf(`/`) + 1,
    );
    try {
      pathnameSlice = decodeURIComponent(pathnameSlice);
    } catch {}
    pathnameSlice = pathnameSlice.trim();
    return /[/\\]/.test(pathnameSlice)
      ? null
      : pathnameSlice.length > 0 &&
          pathnameSlice.length <= 120 &&
          /\.[A-Za-z0-9]{2,5}$/.test(pathnameSlice)
        ? pathnameSlice
        : null;
  });
  (resolveEditorMediaIsConnected = (
    editorMediaIsConnected?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaIsConnected.isConnected === true &&
    typeof editorMediaIsConnected.closest == `function` &&
    editorMediaIsConnected.closest(`.ProseMirror`) !== null);
  (resolveEditorMediaGetAttrs = (
    editorMediaGet?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...editorMediaGet,
    getAttrs: (
      editorMediaGet2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolveEditorMediaIsConnected(editorMediaGet2)
        ? false
        : editorMediaGet.getAttrs
          ? editorMediaGet.getAttrs(editorMediaGet2)
          : null,
  }));
  (EditorMediaAddAttributes = MediaNode.extend({
    addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let parent: Dynamic = this.parent?.() ?? {};
      let items = [`blob`, `mime`, `alt`, `dims`, `crop`, `align`];
      let record2: Dynamic = {};
      for (let editorMediaAddAttributesResult of items as Dynamic)
        record2[editorMediaAddAttributesResult] = parent[
          editorMediaAddAttributesResult
        ] ?? {
          default: null,
        };
      return record2;
    },
    parseHTML(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return [
        ...(this.parent?.() ?? []).map(
          (parent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            parent.tag === `span[data-lfile-media-blob]`
              ? parent
              : resolveEditorMediaGetAttrs(parent),
        ),
        resolveEditorMediaGetAttrs({
          tag: `img`,
          getAttrs: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            alt: element.hasAttribute(`alt`)
              ? null
              : resolveEditorMediaTrim(element.getAttribute(`src`)),
          }),
        }),
      ];
    },
    renderHTML(
      this: Dynamic,
      parent?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let items: Dynamic = this.parent?.(parent) ?? [
        `span`,
        {
          class: `lfile-pm-media lfile-pm-media-card`,
        },
        `file`,
      ];
      let { attrs: record2 }: Dynamic = parent.node;
      let src: Dynamic = resolveEditorMediaTest(record2.blob);
      if (src === null || !Array.isArray(items) || items[0] !== `span`)
        return items;
      let itemItem: Dynamic = items[1];
      if (itemItem[`data-lfile-media-blob`] !== src) return items;
      let record3: Dynamic = {
        src: src,
      };
      if (typeof record2.alt == `string` && record2.alt.length > 0) {
        record3.alt = [...record2.alt].slice(0, 2048).join(``);
      }
      let editorMediaTest2: Dynamic = resolveEditorMediaTest2(record2.mime);
      if (editorMediaTest2 !== null) {
        record3[`data-mime`] = editorMediaTest2;
      }
      let editorMediaValue3: Dynamic = resolveEditorMediaValue3(record2.dims);
      if (editorMediaValue3 !== null) {
        [record3.width, record3.height] = [
          String(editorMediaValue3.w),
          String(editorMediaValue3.h),
        ];
      }
      return [`span`, itemItem, [`img`, record3]];
    },
  }));
  (EditorMediaAddAttributes2 = EditorMediaGroup.extend({
    addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let parent: Dynamic = this.parent?.() ?? {};
      return {
        ref: parent.ref ?? {
          default: null,
        },
        width: parent.width ?? {
          default: null,
        },
        align: parent.align ?? {
          default: null,
        },
        caption: parent.caption ?? {
          default: null,
        },
      };
    },
  }));
  (PendingKeysExtension = Extension.create({
    name: `pendingKeys`,
    priority: 150,
    addProseMirrorPlugins: (..._extraArguments: unknown[]): Dynamic =>
      isEditorMediaBackspace(),
  }));
  (PendingNode = Node2.create({
    name: `pending`,
    group: `block`,
    content: `block*`,
    isolating: true,
    defining: false,
    selectable: true,
    draggable: false,
    addAttributes(..._extraArguments: unknown[]) {
      return {
        intent: {
          default: ``,
          rendered: false,
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]): Dynamic {
      return [];
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let dataIntent: Dynamic =
        typeof node.attrs.intent == `string` ? node.attrs.intent : ``;
      return [
        `div`,
        mergeAttributes(HTMLAttributes, {
          "data-ldoc-pending": ``,
          "data-intent": dataIntent,
          ...resolveEditorExtensionsRole(dataIntent),
          contenteditable: `false`,
        }),
        0,
      ];
    },
  }));
  (EditorMediaAddCommands = ParagraphNode.extend({
    addCommands(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        ...this.parent?.(),
        setParagraphHeading:
          (
            editorMediaAddCommands?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { tr: tr2, state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let heading: Dynamic = resolveEditorHostIsInteger(
              editorMediaAddCommands,
            );
            let paragraph: Dynamic = state.schema.nodes.paragraph;
            let isEditorMediaCell2: Dynamic = (
              editorMediaAddCommands2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              heading === null ||
              !isEditorMediaCell(state.doc, editorMediaAddCommands2);
            let enabled = false;
            let setNodeMarkup = (
              editorMediaAddCommands2?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (isEditorMediaCell2(options)) {
                enabled = true;
                if (dispatch) {
                  tr2.setNodeMarkup(options, undefined, {
                    ...editorMediaAddCommands2.attrs,
                    heading: heading,
                  });
                }
              }
            };
            for (let editorMediaAddCommandsResult of tr2.selection
              .ranges as Dynamic) {
              let pos: Dynamic = editorMediaAddCommandsResult.$from.pos;
              let pos2: Dynamic = editorMediaAddCommandsResult.$to.pos;
              let editorMediaAddCommandsResult2: Dynamic = null;
              state.doc.nodesBetween(
                pos,
                pos2,
                (
                  node?: Dynamic,
                  pos3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (node.type === paragraph) {
                    if (tr2.selection.empty || pos3 < pos) {
                      editorMediaAddCommandsResult2 = {
                        node: node,
                        pos: pos3,
                      };
                    } else {
                      if (pos3 <= pos2) {
                        setNodeMarkup(node, pos3);
                      }
                    }
                  }
                },
              );
              if (editorMediaAddCommandsResult2 !== null) {
                setNodeMarkup(
                  editorMediaAddCommandsResult2.node,
                  editorMediaAddCommandsResult2.pos,
                );
              }
            }
            return enabled;
          },
      };
    },
    addKeyboardShortcuts(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        ...this.parent?.(),
        "Mod-Alt-0": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.setParagraphHeading(null),
        ...Object.fromEntries(
          EditorHostState11.map(
            (
              EditorHostState112?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => [
              `Mod-Alt-${EditorHostState112}`,
              (..._extraArguments: unknown[]): Dynamic =>
                this.editor.commands.setParagraphHeading(EditorHostState112),
            ],
          ),
        ),
      };
    },
    addInputRules(..._extraArguments: unknown[]): Dynamic {
      return [
        new (InputRule as Dynamic)({
          find: /^(#{1,6})\s$/,
          handler: (
            { state: state, range: range, match: match }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let resolve: Dynamic = state.doc.resolve(range.from);
            if (
              resolve.parent.type.name !== `paragraph` ||
              isEditorSelectionAndTablesHead(state)
            )
              return null;
            state.tr
              .delete(range.from, range.to)
              .setNodeMarkup(resolve.before(), undefined, {
                ...resolve.parent.attrs,
                heading: match[1].length,
              });
          },
        }),
      ];
    },
    addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        ...this.parent?.(),
        heading: {
          default: null,
          keepOnSplit: false,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let match = /^H([1-6])$/.exec(element.tagName);
            return match
              ? Number(match[1])
              : resolveEditorHostIsInteger(
                  Number(element.getAttribute(`data-heading`)),
                );
          },
          renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `p`,
        },
        ...EditorHostState11.map(
          (EditorHostState112?: Dynamic, ..._extraArguments: unknown[]) => ({
            tag: `h${EditorHostState112}`,
          }),
        ),
      ];
    },
    renderHTML(
      this: Dynamic,
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let editorHostIsInteger: Dynamic = resolveEditorHostIsInteger(
        node.attrs.heading,
      );
      return [
        editorHostIsInteger === null ? `p` : `h${editorHostIsInteger}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },
  }));
  (resolveEditorMediaParagraph = (
    editorMediaParagraph?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaParagraph.type.name === `paragraph` &&
    resolveEditorHostIsInteger(editorMediaParagraph.attrs.heading) !== null);
  (resolveEditorMediaOpRemote2 = (
    editorMediaOpRemote2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaOpRemote2.getMeta(`op-remote`) !== undefined ||
    editorMediaOpRemote2.getMeta(`op-snapshot`) !== undefined ||
    editorMediaOpRemote2.getMeta(`op$`) !== undefined);
  (EditorMediaAddProseMirrorPlugins = EditorMediaDraggable.extend({
    content: `tableRow+`,
    addProseMirrorPlugins(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return (this.parent?.() ?? []).map(
        (parent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isEditorMediaAppendedTransaction(parent, resolveEditorMediaOpRemote2),
      );
    },
    addCommands(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        ...this.parent?.(),
        addColumnBefore:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorMediaLeft(state, dispatch),
        addColumnAfter:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorMediaRight(state, dispatch),
        addRowBefore:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorMediaValue(state, dispatch),
        addRowAfter:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorMediaBottom(state, dispatch),
      };
    },
  }));
  (EditorMediaAddAttributes3 = resolveEditorMediaAddAttributes().extend({
      name: `cell`,
      content: `(paragraph | list)+`,
      addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        let parent: Dynamic = this.parent?.() ?? {};
        return {
          header: {
            default: false,
            parseHTML: (
              editorMediaAdd?: Dynamic,
              ..._extraArguments: unknown[]
            ) => editorMediaAdd.tagName === `TH`,
            renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
          },
          colspan: parent.colspan ?? {
            default: 1,
          },
          rowspan: parent.rowspan ?? {
            default: 1,
          },
          colwidth: parent.colwidth ?? {
            default: null,
          },
          align: {
            default: null,
            parseHTML: (
              element?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let attribute: Dynamic =
                element.getAttribute(`data-align`) ??
                element.style.textAlign ??
                null;
              return attribute === `left` ||
                attribute === `center` ||
                attribute === `right`
                ? attribute
                : null;
            },
            renderHTML: (
              editorMediaAdd?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              editorMediaAdd.align === `left` ||
              editorMediaAdd.align === `center` ||
              editorMediaAdd.align === `right`
                ? {
                    "data-align": editorMediaAdd.align,
                    style: `text-align:${editorMediaAdd.align}`,
                  }
                : {},
          },
          background: {
            default: null,
            parseHTML: (
              element?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let attribute: Dynamic =
                element.getAttribute(`data-bg`) ??
                element.style.backgroundColor ??
                null;
              return attribute && /^#[0-9a-fA-F]{6}$/.test(attribute)
                ? attribute.toLowerCase()
                : null;
            },
            renderHTML: (
              editorMediaAdd?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              typeof editorMediaAdd.background == `string` &&
              /^#[0-9a-fA-F]{6}$/.test(editorMediaAdd.background)
                ? {
                    "data-bg": editorMediaAdd.background,
                    "data-bg-hue": resolveEditorHostGray(
                      editorMediaAdd.background,
                    ),
                    style: `background-color:${editorMediaAdd.background}`,
                  }
                : {},
          },
        };
      },
      parseHTML(..._extraArguments: unknown[]) {
        return [
          {
            tag: `td`,
          },
          {
            tag: `th`,
          },
        ];
      },
      addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
        return [resolveEditorMediaScope()];
      },
      renderHTML(
        this: Dynamic,
        { node: parent, HTMLAttributes: HTMLAttributes }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return [
          parent.attrs.header === true ? `th` : `td`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ];
      },
    }));
  (PlatformLiveDocumentAndHistoryExtend = TableRowNode.extend({
    content: `cell+`,
  }));
  (PlatformLiveDocumentAndHistoryDefault = collectEditorChipsAndNodeViewsInline({
      name: `date`,
      attrs: {
        ts: {
          default: null,
        },
      },
      copyText: (
        platformLiveDocumentAndHistoryDefault?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveEditorChipsAndNodeViewsPickDate(
          typeof platformLiveDocumentAndHistoryDefault.ts == `string`
            ? platformLiveDocumentAndHistoryDefault.ts
            : ``,
        ),
      render: (
        platformLiveDocumentAndHistoryDefault?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        updateEditorChipsAndNodeViewsDom(
          platformLiveDocumentAndHistoryDefault,
          typeof platformLiveDocumentAndHistoryDefault.attrs.ts == `string`
            ? platformLiveDocumentAndHistoryDefault.attrs.ts
            : ``,
          (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            platformLiveDocumentAndHistoryDefault.setAttrs({
              ts: items.length > 0 ? items : null,
            }),
        ),
    }).extend({
      addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        let platformLiveDocumentAndHistoryDefault: Dynamic =
          this.parent?.() ?? {};
        let ts2: Dynamic = platformLiveDocumentAndHistoryDefault.ts ?? {};
        let parseHTML: Dynamic = ts2.parseHTML;
        return {
          ...platformLiveDocumentAndHistoryDefault,
          ts: {
            ...ts2,
            parseHTML: (
              platformLiveDocumentAndHistoryDefault2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let hTML: Dynamic = parseHTML
                ? parseHTML(platformLiveDocumentAndHistoryDefault2)
                : null;
              return typeof hTML == `string` && hTML.trim() === `` ? null : hTML;
            },
          },
        };
      },
      parseHTML(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        return [
          ...(this.parent?.() ?? []),
          {
            tag: `time[data-atom="date"]`,
            getAttrs: (
              element?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              ts: element.getAttribute(`datetime`)?.trim() || null,
            }),
          },
        ];
      },
      renderHTML(
        this: Dynamic,
        platformLiveDocumentAndHistoryDefault?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (this.parent == null)
          throw Error(`LdocDate.extend lost chipNode's renderHTML`);
        let ts2: Dynamic = this.parent(platformLiveDocumentAndHistoryDefault);
        let parseHTML =
          platformLiveDocumentAndHistoryDefault.node.attrs.ts == null ||
          platformLiveDocumentAndHistoryDefault.node.attrs.ts === ``;
        let datetime = parseHTML
          ? null
          : resolveEditorMediaExec(
              platformLiveDocumentAndHistoryDefault.node.attrs.ts,
            );
        if (!parseHTML && datetime === null) return ts2;
        let [, setTs, ...ts3]: Dynamic = ts2;
        return [
          `time`,
          {
            ...setTs,
            "data-atom": `date`,
            ...(datetime === null
              ? {}
              : {
                  datetime: datetime,
                }),
          },
          ...ts3,
        ];
      },
    }));
  (PlatformLiveDocumentAndHistoryEnum = collectEditorChipsAndNodeViewsInline({
      name: `dropdown`,
      attrs: {
        enum: {
          default: null,
        },
        index: {
          default: null,
        },
      },
      copyText: (
        platformLiveDocumentAndHistoryEnum?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveEditorChipsAndNodeViewsFind(
          platformLiveDocumentAndHistoryEnum.enum,
          platformLiveDocumentAndHistoryEnum.index,
        ),
      render: (
        platformLiveDocumentAndHistoryEnum?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadEditorChipsAndNodeViewsDom(
          platformLiveDocumentAndHistoryEnum,
          typeof platformLiveDocumentAndHistoryEnum.attrs.enum == `string`
            ? platformLiveDocumentAndHistoryEnum.attrs.enum
            : ``,
          typeof platformLiveDocumentAndHistoryEnum.attrs.index == `number`
            ? platformLiveDocumentAndHistoryEnum.attrs.index
            : null,
          (index?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            platformLiveDocumentAndHistoryEnum.setAttrs({
              index: index,
            }),
        ),
    }));
  (LdocStoredMarksExtension = Extension.create({
    name: `ldocStoredMarks`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`ldocStoredMarks`),
          appendTransaction: (
            ldocStoredMarksExtension?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (options.storedMarks === null || context.storedMarks !== null)
              return null;
            let some: Dynamic = ldocStoredMarksExtension.some(
              (
                rolldownNImport2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                rolldownNImport2.docChanged &&
                rolldownNImport2.getMeta(`addToHistory`) === false,
            );
            let some2: Dynamic = ldocStoredMarksExtension.some(
              (
                rolldownNImport2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                rolldownNImport2.docChanged &&
                rolldownNImport2.getMeta(`addToHistory`) !== false,
            );
            return !some || some2 || !context.selection.empty
              ? null
              : context.tr.setStoredMarks(options.storedMarks);
          },
        }),
      ];
    },
  }));
  (PlatformLiveDocumentAndHistoryAddCommands = HorizontalRuleNode.extend({
      addCommands(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        let parent: Dynamic = this.parent?.();
        return {
          ...parent,
          setHorizontalRule:
            (..._extraArguments: unknown[]): Dynamic =>
            (
              platformLiveDocumentAndHistoryAddCommands?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              isEditorSelectionAndTablesHead(
                platformLiveDocumentAndHistoryAddCommands.state,
              )
                ? false
                : (parent?.setHorizontalRule?.()(
                    platformLiveDocumentAndHistoryAddCommands,
                  ) ?? false),
        };
      },
      addInputRules(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        return (this.parent?.() ?? []).map(
          (parent?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            new (InputRule as Dynamic)({
              find: parent.find,
              undoable: parent.undoable,
              handler: (
                platformLiveDocumentAndHistoryAddCommands?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                isEditorSelectionAndTablesHead(
                  platformLiveDocumentAndHistoryAddCommands.state,
                )
                  ? null
                  : parent.handler(platformLiveDocumentAndHistoryAddCommands),
            }),
        );
      },
    }));
  (LdocCheckedLawExtension = Extension.create({
    name: `ldocCheckedLaw`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`ldocCheckedLaw`),
          appendTransaction: (
            ldocCheckedLawExtension?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let getMeta: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              ldocCheckedLawExtension2.getMeta(`history$`) !== undefined ||
              ldocCheckedLawExtension2
                .getMeta(`appendedTransaction`)
                ?.getMeta(`history$`) !== undefined;
            let getMeta2: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              ldocCheckedLawExtension2.docChanged &&
              !ldocCheckedLawExtension2.getMeta(`op-remote`) &&
              ldocCheckedLawExtension2.getMeta(`addToHistory`) !== false &&
              !getMeta(ldocCheckedLawExtension2);
            let getMeta3: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              ldocCheckedLawExtension2.docChanged &&
              !!ldocCheckedLawExtension2.getMeta(`op-remote`) &&
              !getMeta(ldocCheckedLawExtension2);
            if (
              !ldocCheckedLawExtension.some(getMeta2) &&
              !ldocCheckedLawExtension.some(getMeta3)
            )
              return null;
            let doc: Dynamic = context.doc;
            let items: Dynamic = [];
            for (let ldocCheckedLawExtensionResult2 of ldocCheckedLawExtension as Dynamic)
              if (
                !(
                  !getMeta2(ldocCheckedLawExtensionResult2) &&
                  !getMeta3(ldocCheckedLawExtensionResult2)
                )
              ) {
                ldocCheckedLawExtensionResult2.steps.forEach(
                  (
                    step?: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    step
                      .getMap()
                      .forEach(
                        (
                          map?: Dynamic,
                          index2?: unknown,
                          map2?: Dynamic,
                          map3?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined => {
                          let mappingSlice: Dynamic =
                            ldocCheckedLawExtensionResult2.mapping.slice(
                              index + 1,
                            );
                          items.push([
                            mappingSlice.map(map2, -1),
                            mappingSlice.map(map3, 1),
                            !getMeta2(ldocCheckedLawExtensionResult2),
                          ]);
                        },
                      );
                  },
                );
              }
            items.sort(
              (item?: Dynamic, item2?: Dynamic, ..._extraArguments: unknown[]) =>
                Number(item[2]) - Number(item2[2]),
            );
            if (!items.length) return null;
            let items2: Dynamic = [];
            let uniqueItems: Dynamic = new (Set as Dynamic)();
            let ldocCheckedLawExtensionResult: Dynamic = null;
            let lookup: Dynamic = new (Map as Dynamic)();
            let descendants: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (
              ldocCheckedLawExtensionResult ||
                ((ldocCheckedLawExtensionResult = new (Map as Dynamic)()),
                options.doc.descendants(
                  (
                    ldocCheckedLawExtension3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => (
                    ldocCheckedLawExtension3.type.name === `list` &&
                      ldocCheckedLawExtension3.forEach(
                        (
                          ldocCheckedLawExtension4?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined =>
                          void (
                            typeof ldocCheckedLawExtension4.attrs.bid ==
                              `string` &&
                            (ldocCheckedLawExtensionResult.set(
                              ldocCheckedLawExtension4.attrs.bid,
                              ldocCheckedLawExtension3,
                            ),
                            lookup.set(
                              ldocCheckedLawExtension4.attrs.bid,
                              ldocCheckedLawExtension4,
                            ))
                          ),
                      ),
                    !ldocCheckedLawExtension3.isTextblock
                  ),
                )),
              ldocCheckedLawExtensionResult.get(ldocCheckedLawExtension2)
            );
            let getMeta4: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              for (let ldocCheckedLawExtensionResult2 of ldocCheckedLawExtension as Dynamic) {
                let metaEntry: Dynamic = ldocCheckedLawExtensionResult2
                  .getMeta(EditorMediaOpReminted)
                  ?.get(ldocCheckedLawExtension2);
                if (metaEntry !== undefined) return metaEntry;
              }
              return ldocCheckedLawExtension2;
            };
            let descendants2: Dynamic = (
              ldocCheckedLawExtension2?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let descendants3: Dynamic =
                typeof ldocCheckedLawExtension2.attrs.bid == `string`
                  ? descendants(getMeta4(ldocCheckedLawExtension2.attrs.bid))
                  : undefined;
              return descendants3
                ? descendants3.attrs.kind === `check`
                  ? typeof descendants3.attrs.bid == `string` &&
                    typeof options2.attrs.bid == `string` &&
                    descendants3.attrs.bid !== options2.attrs.bid
                  : true
                : false;
            };
            let getMeta5 = (
              ldocCheckedLawExtension2?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let descendants3: Dynamic =
                typeof ldocCheckedLawExtension2.attrs.bid == `string`
                  ? descendants(getMeta4(ldocCheckedLawExtension2.attrs.bid))
                  : undefined;
              return !descendants3 ||
                descendants3.attrs.kind === `check` ||
                typeof descendants3.attrs.bid != `string` ||
                descendants3.attrs.bid !== options2.attrs.bid
                ? false
                : lookup.get(getMeta4(ldocCheckedLawExtension2.attrs.bid))?.attrs
                    .checked === true;
            };
            let getMeta6 = (
              ldocCheckedLawExtension2?: Dynamic,
              options2?: Dynamic,
              context2?: Dynamic,
              dependencies?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                ldocCheckedLawExtension2.type.name !== `listItem` ||
                context2.type.name !== `list` ||
                uniqueItems.has(options2)
              )
                return;
              uniqueItems.add(options2);
              if (dependencies) {
                if (
                  context2.attrs.kind === `check` &&
                  ldocCheckedLawExtension2.attrs.checked === true &&
                  getMeta5(ldocCheckedLawExtension2, context2) &&
                  lookup.get(ldocCheckedLawExtension2.attrs.bid) ===
                    ldocCheckedLawExtension2
                ) {
                  items2.push([options2, false]);
                }
                return;
              }
              let checked: Dynamic =
                context2.attrs.kind === `check`
                  ? (ldocCheckedLawExtension2.attrs.checked ?? false)
                  : null;
              if (
                !(
                  checked === null &&
                  typeof ldocCheckedLawExtension2.attrs.checked == `boolean` &&
                  descendants2(ldocCheckedLawExtension2, context2)
                )
              ) {
                if (
                  checked === true &&
                  getMeta5(ldocCheckedLawExtension2, context2)
                ) {
                  checked = false;
                }
                if (
                  (ldocCheckedLawExtension2.attrs.checked ?? null) !== checked
                ) {
                  items2.push([options2, checked]);
                }
              }
            };
            for (let [
              ldocCheckedLawExtensionResult2,
              ldocCheckedLawExtensionResult3,
              ldocCheckedLawExtensionResult4,
            ] of items as Dynamic) {
              let max = Math.max(
                0,
                Math.min(ldocCheckedLawExtensionResult2, doc.content.size),
              );
              let max2 = Math.max(
                max,
                Math.min(ldocCheckedLawExtensionResult3, doc.content.size),
              );
              doc.nodesBetween(
                max,
                max2,
                (
                  ldocCheckedLawExtension2?: Dynamic,
                  options2?: Dynamic,
                  context2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  ldocCheckedLawExtension2.isTextblock
                    ? false
                    : (ldocCheckedLawExtension2.type.name === `list`
                        ? ldocCheckedLawExtension2.forEach(
                            (
                              ldocCheckedLawExtension3?: Dynamic,
                              index?: Dynamic,
                              ..._extraArguments: unknown[]
                            ) =>
                              getMeta6(
                                ldocCheckedLawExtension3,
                                options2 + 1 + index,
                                ldocCheckedLawExtension2,
                                ldocCheckedLawExtensionResult4,
                              ),
                          )
                        : context2 &&
                          getMeta6(
                            ldocCheckedLawExtension2,
                            options2,
                            context2,
                            ldocCheckedLawExtensionResult4,
                          ),
                      true),
              );
            }
            if (!items2.length) return null;
            let tr2: Dynamic = context.tr;
            for (let [
              ldocCheckedLawExtensionResult2,
              ldocCheckedLawExtensionResult3,
            ] of items2 as Dynamic)
              tr2.setNodeAttribute(
                ldocCheckedLawExtensionResult2,
                `checked`,
                ldocCheckedLawExtensionResult3,
              );
            return tr2.setMeta(`addToHistory`, false);
          },
        }),
      ];
    },
  }));
  (resolvePlatformLiveDocumentAndHistorySinkListItemSameKind = (
    platformLiveDocumentAndHistorySinkListItemSameKind?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistorySinkListItemSameKind.sinkListItemSameKind());
}

export {
  EditorMediaAddAttributes,
  EditorMediaAddAttributes2,
  EditorMediaAddAttributes3,
  EditorMediaAddCommands,
  EditorMediaAddProseMirrorPlugins,
  EditorMediaSelectable,
  LdocCheckedLawExtension,
  LdocStoredMarksExtension,
  PendingKeysExtension,
  PendingNode,
  PlatformLiveDocumentAndHistoryAddCommands,
  PlatformLiveDocumentAndHistoryDefault,
  PlatformLiveDocumentAndHistoryEnum,
  PlatformLiveDocumentAndHistoryExtend,
  resolveEditorMediaParagraph,
  resolvePlatformLiveDocumentAndHistorySinkListItemSameKind,
};

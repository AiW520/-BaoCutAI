/** BaoCut: editor media from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Decoration,
  DecorationSet,
  Extension,
  Fragment,
  Node2,
  NodeSelection,
  Plugin,
  PluginKey,
  TextSelection,
  mergeAttributes,
} from "./platform-core-dependencies";
import {
  resolvePlatformSessionAndSourcesNode,
} from "./platform-core-platform-session-and-sources-1";
import {
  collectEditorExtensionsSlice,
  isEditorExtensionsFloor,
  isEditorExtensionsTrim,
  resolveEditorExtensionsDataColwidth,
  resolveEditorExtensionsIsInteger,
  resolveEditorExtensionsMintId,
} from "./platform-core-editor-extensions-2";
import {
  resolveEditorAnchorsAndMentionsEscape,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsValue3,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  EditorHostDataLdocClip,
  EditorHostDataLfileEmbedCaption,
  EditorHostDataLfileEmbedGrip,
  EditorHostDataLfileEmbedGripDrag,
  EditorHostDataLfileEmbedGripNub,
  EditorHostDataLfileEmbedHover,
  EditorHostKind2,
  EditorHostLfileEmbedReveal,
  editorHostPattern3,
  filterEditorHostSlice,
  resolveEditorHostCenter,
  resolveEditorHostError,
  resolveEditorHostTest,
  resolveEditorHostTrim,
} from "./platform-core-editor-host-1";
import {
  EditorSelectionAndTablesLeft,
  SelectingCellsPluginKey,
  isEditorSelectionAndTablesHead,
  resolveEditorSelectionAndTablesColspan3,
  resolveEditorSelectionAndTablesDepth,
  resolveEditorSelectionAndTablesTableNodeTypes,
} from "./platform-core-editor-selection-and-tables-1";
import {
  EditorSelectionAndTablesRowspan,
  TableColumnResizingPluginKey,
  getEditorSelectionAndTablesTableStart,
} from "./platform-core-editor-selection-and-tables-2";
import {
  EditorTableControlsTableWrapper,
  TableCellNode,
  getEditorTableControlsHead,
  resolveEditorTableControlsDragging,
} from "./platform-core-editor-table-controls-1";
import {
  TableNode,
  getEditorTableControlsKey,
  isEditorTableControlsKey2,
  isEditorTableControlsMap,
  isEditorTableControlsState2,
  resolveEditorTableControlsKey,
  resolveEditorTableControlsKey2,
} from "./platform-core-editor-table-controls-2";
import {
  getEditorTableControlsKey2,
} from "./platform-core-editor-table-controls-3";

var editorMediaValue_1: Dynamic;

var resolveEditorMediaValue: (editorMediaValue?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function isEditorMediaTable(
  editorMediaTable?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (editorMediaValue_1) return true;
  let slice: Dynamic = editorMediaTable.dragging?.slice;
  return (
    !!slice &&
    slice.content.childCount === 1 &&
    slice.content.firstChild.type.spec.tableRole === `table`
  );
}

function isEditorMediaTable2(
  editorMediaTable2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolve: Dynamic = editorMediaTable2.doc.resolve(
    Math.min(Math.max(options, 0), editorMediaTable2.doc.content.size),
  );
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--)
    if (resolve.node(depth).type.spec.tableRole === `table`) return true;
  return false;
}

var TableBlockDropGuardExtension: Dynamic;

var TableColumnResizeFocusPluginKey: Dynamic;

function resolveEditorMediaOwnerDocument(
  editorMediaOwnerDocument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic = editorMediaOwnerDocument.dom.ownerDocument;
  let activeElement2: Dynamic = ownerDocument2.activeElement;
  return (
    ownerDocument2.hasFocus() &&
    activeElement2 !== null &&
    editorMediaOwnerDocument.dom.contains(activeElement2)
  );
}

function getEditorMediaKey(..._extraArguments: unknown[]): Dynamic {
  return new (Plugin as Dynamic)({
    key: TableColumnResizeFocusPluginKey,
    view(editorMediaKey?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (!TableColumnResizingPluginKey.get(editorMediaKey.state)) return {};
      let enabled = false;
      return {
        update(
          editorMediaKey2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          let dragging: Dynamic =
            TableColumnResizingPluginKey.getState(options)?.dragging;
          if (!dragging) {
            enabled = false;
            return;
          }
          let TableColumnResizingPluginKeyState: Dynamic =
            TableColumnResizingPluginKey.getState(editorMediaKey2.state);
          if (TableColumnResizingPluginKeyState?.dragging) {
            if (
              TableColumnResizingPluginKeyState.activeHandle < 0 ||
              options.doc.eq(editorMediaKey2.state.doc)
            )
              return;
            let colwidth: Dynamic = editorMediaKey2.state.doc.nodeAt(
              TableColumnResizingPluginKeyState.activeHandle,
            )?.attrs.colwidth;
            let number2 = Array.isArray(colwidth)
              ? Number(colwidth[colwidth.length - 1])
              : 0;
            if (number2 && number2 !== dragging.startWidth) {
              enabled = true;
            }
            return;
          }
          let enabled2: Dynamic =
            enabled &&
            editorMediaKey2.editable &&
            !resolveEditorMediaOwnerDocument(editorMediaKey2);
          enabled = false;
          if (enabled2) {
            queueMicrotask((..._extraArguments: unknown[]): undefined => {
              if (
                !(
                  editorMediaKey2.isDestroyed ||
                  !editorMediaKey2.dom.isConnected ||
                  !editorMediaKey2.editable ||
                  resolveEditorMediaOwnerDocument(editorMediaKey2)
                )
              ) {
                editorMediaKey2.focus();
              }
            });
          }
        },
      };
    },
  });
}

function resolveEditorMediaFirstChild(
  editorMediaFirstChild?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  editorMediaFirstChild.firstChild?.forEach(
    (
      editorMediaFirstChild2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let number2 = Number(editorMediaFirstChild2.attrs.colspan) || 1;
      let colwidth: Dynamic = editorMediaFirstChild2.attrs.colwidth;
      for (let index = 0; index < number2; index++)
        items.push((Array.isArray(colwidth) && Number(colwidth[index])) || 0);
    },
  );
  return items;
}

var resolveEditorMediaScrollWidth: Dynamic;

var EditorMediaWidth: Dynamic;

var EditorMediaTabindex: string[][];

var editorMediaMouseupDragstartContextmenuValues: string[];

function collectEditorMediaTabindex(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic = element.ownerDocument;
  let ResizeObserver: Dynamic =
    ownerDocument2.defaultView?.ResizeObserver ??
    (globalThis as Dynamic).ResizeObserver;
  if (typeof ResizeObserver != `function`)
    return (..._extraArguments: unknown[]): undefined => {};
  let collectEditorMediaTabindexHandler = (..._extraArguments: unknown[]) =>
    ownerDocument2.activeElement === element;
  let enabled = false;
  let enabled2 = false;
  let removeAttribute = (..._extraArguments: unknown[]): undefined => {
    if (element.hasAttribute(`tabindex`)) {
      enabled2 = true;
      removeEventListener2(true);
      if (collectEditorMediaTabindexHandler()) {
        element.blur();
      }
      element.removeAttribute(`tabindex`);
    }
  };
  let helloHImport2 = (..._extraArguments: unknown[]): undefined => {
    if (enabled2) {
      enabled2 = false;
      removeEventListener2(false);
      setAttribute();
    }
  };
  let helloHImport3 = (
    collectEditorMediaTabindex2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (collectEditorMediaTabindex2.buttons === 0) {
      helloHImport2();
    }
  };
  let removeEventListener2 = (
    collectEditorMediaTabindex2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let items: Dynamic = [
      ...editorMediaMouseupDragstartContextmenuValues.map(
        (
          editorMediaMouseupDragstartContextmenuValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          ownerDocument2,
          editorMediaMouseupDragstartContextmenuValue,
          helloHImport2,
          true,
        ],
      ),
      [ownerDocument2, `mousemove`, helloHImport3, true],
      [element, `mouseleave`, helloHImport2, false],
      [ownerDocument2.defaultView, `blur`, helloHImport2, false],
    ];
    for (let [
      collectEditorMediaTabindexResult,
      collectEditorMediaTabindexResult2,
      collectEditorMediaTabindexResult3,
      collectEditorMediaTabindexResult4,
    ] of items as Dynamic)
      if (collectEditorMediaTabindex2) {
        collectEditorMediaTabindexResult?.addEventListener(
          collectEditorMediaTabindexResult2,
          collectEditorMediaTabindexResult3,
          collectEditorMediaTabindexResult4,
        );
      } else {
        collectEditorMediaTabindexResult?.removeEventListener(
          collectEditorMediaTabindexResult2,
          collectEditorMediaTabindexResult3,
          collectEditorMediaTabindexResult4,
        );
      }
  };
  let addEventListener3 = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      element.addEventListener(`blur`, setAttribute);
      element.addEventListener(`mousedown`, removeAttribute, true);
    }
  };
  let removeAttribute2 = (..._extraArguments: unknown[]): undefined => {
    if (enabled) {
      enabled = false;
      if (enabled2) {
        removeEventListener2(false);
      }
      enabled2 = false;
      element.removeEventListener(`blur`, setAttribute);
      element.removeEventListener(`mousedown`, removeAttribute, true);
      for (let [
        collectEditorMediaTabindexResult,
      ] of EditorMediaTabindex as Dynamic)
        element.removeAttribute(collectEditorMediaTabindexResult);
    }
  };
  let setAttribute = (..._extraArguments: unknown[]): undefined => {
    if (!options() && resolveEditorMediaScrollWidth(element) > 1) {
      addEventListener3();
      for (let [
        collectEditorMediaTabindexResult,
        collectEditorMediaTabindexResult2,
      ] of EditorMediaTabindex as Dynamic)
        if (!(enabled2 && collectEditorMediaTabindexResult === `tabindex`)) {
          if (
            element.getAttribute(collectEditorMediaTabindexResult) !==
            collectEditorMediaTabindexResult2
          ) {
            element.setAttribute(
              collectEditorMediaTabindexResult,
              collectEditorMediaTabindexResult2,
            );
          }
        }
    } else if (options() || !collectEditorMediaTabindexHandler()) {
      removeAttribute2();
    }
  };
  let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(setAttribute);
  if (
    typeof resizeObserver.observe != `function` ||
    typeof resizeObserver.disconnect != `function`
  )
    return (..._extraArguments: unknown[]): undefined => {};
  resizeObserver.observe(element);
  let matchedElement: Dynamic = element.querySelector(`:scope>table`);
  if (matchedElement) {
    resizeObserver.observe(matchedElement);
  }
  return (..._extraArguments: unknown[]): undefined => {
    resizeObserver.disconnect();
    removeAttribute2();
  };
}

function resolveEditorMediaNodeType(
  editorMediaNodeType?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dom: Dynamic = editorMediaNodeType.dom;
  if (dom.nodeType !== 1) return editorMediaNodeType;
  let collectEditorMediaTabindex2: Dynamic = collectEditorMediaTabindex(
    dom,
    options,
  );
  let destroy: Dynamic = editorMediaNodeType.destroy;
  editorMediaNodeType.destroy = (..._extraArguments: unknown[]): undefined => {
    collectEditorMediaTabindex2();
    destroy?.call(editorMediaNodeType);
  };
  let stopEvent2: Dynamic = editorMediaNodeType.stopEvent;
  editorMediaNodeType.stopEvent = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (event.target === dom && event.type.startsWith(`key`)) ||
    (stopEvent2?.call(editorMediaNodeType, event) ?? false);
  return editorMediaNodeType;
}

var isEditorMediaColwidth: (editorMediaColwidth?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveEditorMediaAppendedTransaction: Dynamic;

var resolveEditorMediaAppendTransaction: Dynamic;

var collectEditorMediaTable: Dynamic;

var isEditorMediaAppendedTransaction: Dynamic;

var EditorMediaDefault: Dynamic;

var ThScopePluginKey: Dynamic;

function resolveEditorMediaScope(..._extraArguments: unknown[]): Dynamic {
  let create2: Dynamic = (
    editorMediaScope?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    editorMediaScope.descendants(
      (
        editorMediaScope2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (editorMediaScope2.type.name !== `tableRow`) return;
        let enabled = true;
        let resolveEditorMediaScopeHandler: Dynamic = (
          editorMediaScope3?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          editorMediaScope3.type.name === `tableHeader` ||
          editorMediaScope3.attrs.header === true;
        editorMediaScope2.forEach(
          (
            rolldownNImport2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!resolveEditorMediaScopeHandler(rolldownNImport2)) {
              enabled = false;
            }
          },
        );
        let scope = enabled ? `col` : `row`;
        editorMediaScope2.forEach(
          (
            node?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (resolveEditorMediaScopeHandler(node)) {
              items.push(
                Decoration.node(
                  options + 1 + index,
                  options + 1 + index + node.nodeSize,
                  {
                    scope: scope,
                  },
                ),
              );
            }
          },
        );
        return false;
      },
    );
    return DecorationSet.create(editorMediaScope, items);
  };
  return new (Plugin as Dynamic)({
    key: ThScopePluginKey,
    state: {
      init: (
        editorMediaScope?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => create2(options.doc),
      apply: (
        editorMediaScope?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorMediaScope.docChanged ? create2(editorMediaScope.doc) : options,
    },
    props: {
      decorations: (
        editorMediaScope?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ThScopePluginKey.getState(editorMediaScope),
    },
  });
}

var IntraCellSelectionGuardPluginKey: Dynamic;

function isEditorMediaMove(..._extraArguments: unknown[]): Dynamic {
  let record2 = {
    x: 0,
    y: 0,
    move: false,
    seen: false,
  };
  let isEditorMediaMoveResult: Dynamic = null;
  return new (Plugin as Dynamic)({
    key: IntraCellSelectionGuardPluginKey,
    view(editorMediaMove?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      isEditorMediaMoveResult = editorMediaMove;
      let ownerDocument2: Dynamic = editorMediaMove.dom.ownerDocument;
      let updateSeen = (
        editorMediaMove2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        record2.x = editorMediaMove2.clientX;
        record2.y = editorMediaMove2.clientY;
        record2.move = editorMediaMove2.type === `mousemove`;
        record2.seen = true;
      };
      ownerDocument2.addEventListener(`mousedown`, updateSeen, true);
      ownerDocument2.addEventListener(`mousemove`, updateSeen, true);
      return {
        destroy(..._extraArguments: unknown[]): undefined {
          isEditorMediaMoveResult = null;
          ownerDocument2.removeEventListener(`mousedown`, updateSeen, true);
          ownerDocument2.removeEventListener(`mousemove`, updateSeen, true);
        },
      };
    },
    filterTransaction(
      editorMediaMove?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let meta: Dynamic = editorMediaMove.getMeta(SelectingCellsPluginKey);
      if (typeof meta != `number` || meta < 0) return true;
      let selection: Dynamic = editorMediaMove.selection;
      if (
        !(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) ||
        selection.$anchorCell.pos !== selection.$headCell.pos ||
        !isEditorMediaMoveResult ||
        !record2.seen ||
        !record2.move
      )
        return true;
      let nodeDOM: Dynamic = isEditorMediaMoveResult.nodeDOM(
        selection.$anchorCell.pos,
      );
      if (!(nodeDOM instanceof HTMLElement)) return true;
      let nodeDOMBounds = nodeDOM.getBoundingClientRect();
      return nodeDOMBounds.width === 0 && nodeDOMBounds.height === 0
        ? true
        : !(
            record2.x >= nodeDOMBounds.left - 1 &&
            record2.x <= nodeDOMBounds.right + 1 &&
            record2.y >= nodeDOMBounds.top - 1 &&
            record2.y <= nodeDOMBounds.bottom + 1
          );
    },
  });
}

var ReadOnlyTableViewPluginKey: Dynamic;

var TableClipEdgePluginKey: Dynamic;

var resolveEditorMediaFrom: Dynamic;

function updateEditorMediaKey(..._extraArguments: unknown[]): Dynamic {
  return new (Plugin as Dynamic)({
    key: TableClipEdgePluginKey,
    view(
      updateEditorMediaKey2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let ResizeObserver: Dynamic =
        updateEditorMediaKey2.dom.ownerDocument.defaultView?.ResizeObserver ??
        (globalThis as Dynamic).ResizeObserver;
      if (typeof ResizeObserver != `function`) return {};
      let updateEditorMediaKeyHandler: Dynamic = (
        updateEditorMediaKey3?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        typeof updateEditorMediaKey3.observe == `function` &&
        typeof updateEditorMediaKey3.unobserve == `function` &&
        typeof updateEditorMediaKey3.disconnect == `function`;
      let removeAttribute = (
        element?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveEditorMediaScrollWidth(element) - element.scrollLeft > 1) {
          if (element.getAttribute(`data-ldoc-clip`) !== `right`) {
            element.setAttribute(EditorHostDataLdocClip, `right`);
          }
        } else {
          if (element.hasAttribute(`data-ldoc-clip`)) {
            element.removeAttribute(EditorHostDataLdocClip);
          }
        }
      };
      let lookup: Dynamic = new (Map as Dynamic)();
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        (
          updateEditorMediaKey3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let uniqueItems: Dynamic = new (Set as Dynamic)();
          for (let event of updateEditorMediaKey3 as Dynamic) {
            let closest: Dynamic =
              event.target instanceof HTMLElement
                ? event.target.closest(`.tableWrapper`)
                : null;
            if (closest instanceof HTMLElement && lookup.has(closest)) {
              uniqueItems.add(closest);
            }
          }
          for (let updateEditorMediaKeyResult of uniqueItems as Dynamic)
            removeAttribute(updateEditorMediaKeyResult);
        },
      );
      if (!updateEditorMediaKeyHandler(resizeObserver)) return {};
      let update = (..._extraArguments: unknown[]): undefined => {
        let uniqueItems: Dynamic = new (Set as Dynamic)(
          resolveEditorMediaFrom(updateEditorMediaKey2.dom),
        );
        for (let [
          updateEditorMediaKeyResult,
          updateEditorMediaKeyResult2,
        ] of lookup as Dynamic)
          if (!uniqueItems.has(updateEditorMediaKeyResult)) {
            updateEditorMediaKeyResult2();
            lookup.delete(updateEditorMediaKeyResult);
          }
        for (let element of uniqueItems as Dynamic) {
          if (lookup.has(element)) continue;
          let matchedElement: Dynamic = element.querySelector(`:scope>table`);
          let removeAttribute2: Dynamic = (..._extraArguments: unknown[]) =>
            removeAttribute(element);
          resizeObserver.observe(element);
          if (matchedElement) {
            resizeObserver.observe(matchedElement);
          }
          element.addEventListener(`scroll`, removeAttribute2, {
            passive: true,
          });
          lookup.set(element, (..._extraArguments: unknown[]): undefined => {
            resizeObserver.unobserve(element);
            if (matchedElement) {
              resizeObserver.unobserve(matchedElement);
            }
            element.removeEventListener(`scroll`, removeAttribute2);
            element.removeAttribute(EditorHostDataLdocClip);
          });
        }
      };
      update();
      return {
        update: update,
        destroy(..._extraArguments: unknown[]): undefined {
          for (let updateEditorMediaKeyResult of lookup.values() as Dynamic)
            updateEditorMediaKeyResult();
          lookup.clear();
          resizeObserver.disconnect();
        },
      };
    },
  });
}

var EditorMediaDraggable: Dynamic;

var resolveEditorMediaAddAttributes: Dynamic;

var EditorMediaOpReminted: string;

var editorMediaSet: Dynamic;

function resolveEditorMediaNode(
  editorMediaNode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorMediaNode2: Dynamic = editorMediaNode;
  return (
    typeof editorMediaNode2 == `object` &&
    !!editorMediaNode2 &&
    options.has(editorMediaNode2.t) &&
    typeof editorMediaNode2.node == `string`
  );
}

var resolveEditorMediaValue2: Dynamic;

var EditorMediaOpSnapshot: string;

var resolveEditorMediaOpRemote: Dynamic;

var resolveEditorMediaAppendedTransaction2: Dynamic;

var resolveEditorMediaHeaderCell: Dynamic;

function resolveEditorMediaChildCount(
  editorMediaChildCount?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let index = 0;
  for (; index < editorMediaChildCount.childCount; index++) {
    let child: Dynamic = editorMediaChildCount.child(index);
    let matchesChildCount = child.childCount > 0;
    child.forEach(
      (child2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!resolveEditorMediaHeaderCell(child2)) {
          matchesChildCount = false;
        }
      },
    );
    if (!matchesChildCount) break;
  }
  return index;
}

function collectEditorMediaMap(
  collectEditorMediaMap2: Dynamic,
  { map: map, tableStart: tableStart, table: table }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesTableNodeTypes: Dynamic =
    resolveEditorSelectionAndTablesTableNodeTypes(table.type.schema);
  let editorMediaChildCount = resolveEditorMediaChildCount(table);
  for (let index: Dynamic = 0; index < map.height; index++) {
    let total: Dynamic = index * map.width + context;
    if (
      context > 0 &&
      context < map.width &&
      map.map[total - 1] === map.map[total]
    ) {
      let mapItem: Dynamic = map.map[total];
      let nodeAt: Dynamic = table.nodeAt(mapItem);
      collectEditorMediaMap2.setNodeMarkup(
        collectEditorMediaMap2.mapping.map(tableStart + mapItem),
        null,
        resolveEditorSelectionAndTablesColspan3(
          nodeAt.attrs,
          context - map.colCount(mapItem),
        ),
      );
      index += nodeAt.attrs.rowspan - 1;
    } else {
      let header = index < editorMediaChildCount;
      let headerCell: Dynamic =
        header && editorSelectionAndTablesTableNodeTypes.header_cell
          ? editorSelectionAndTablesTableNodeTypes.header_cell
          : editorSelectionAndTablesTableNodeTypes.cell;
      let record2 =
        headerCell.spec.attrs && `header` in headerCell.spec.attrs
          ? {
              header: header,
            }
          : null;
      let positionAt: Dynamic = map.positionAt(index, context, table);
      collectEditorMediaMap2.insert(
        collectEditorMediaMap2.mapping.map(tableStart + positionAt),
        headerCell.createAndFill(record2),
      );
    }
  }
  return collectEditorMediaMap2;
}

var isEditorMediaLeft: (editorMediaLeft?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var isEditorMediaRight: (editorMediaRight?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveEditorMediaDropdown(
  editorMediaDropdown?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorMediaDropdown.childCount !== 1) return null;
  let firstChild: Dynamic = editorMediaDropdown.firstChild;
  if (firstChild.type !== editorMediaDropdown.type.contentMatch.defaultType)
    return null;
  let resolveEditorMediaDropdownResult: Dynamic = null;
  for (let index = 0; index < firstChild.childCount; index++) {
    let child: Dynamic = firstChild.child(index);
    if (child.isText) {
      if (/\S/.test(child.text)) return null;
    } else if (
      child.type.name === `dropdown` &&
      resolveEditorMediaDropdownResult === null &&
      typeof child.attrs.enum == `string` &&
      child.attrs.enum
    )
      resolveEditorMediaDropdownResult = child.attrs.enum;
    else return null;
  }
  return resolveEditorMediaDropdownResult;
}

function resolveEditorMediaEnum(
  editorMediaEnum?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dropdown: Dynamic = options.type.schema.nodes.dropdown;
  let nodeSize: Dynamic = options.child(0).nodeSize;
  let nodeAt: Dynamic = (
    editorMediaEnum2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let resolveEditorMediaEnumResult: Dynamic = null;
    for (let count = 1; count < editorMediaEnum.height; count++) {
      let total: Dynamic = count * editorMediaEnum.width + editorMediaEnum2;
      let mapItem: Dynamic = editorMediaEnum.map[total];
      if (mapItem === editorMediaEnum.map[total - editorMediaEnum.width]) {
        if (mapItem < nodeSize) return null;
        continue;
      }
      let nodeAt2: Dynamic = options.nodeAt(mapItem);
      let editorMediaDropdown: Dynamic =
        nodeAt2 && nodeAt2.attrs.colspan === 1
          ? resolveEditorMediaDropdown(nodeAt2)
          : null;
      if (
        editorMediaDropdown === null ||
        (resolveEditorMediaEnumResult !== null &&
          resolveEditorMediaEnumResult !== editorMediaDropdown)
      )
        return null;
      resolveEditorMediaEnumResult = editorMediaDropdown;
    }
    return resolveEditorMediaEnumResult;
  };
  return Array.from<Dynamic, Dynamic>(
    {
      length: editorMediaEnum.width,
    },
    (
      editorMediaEnum2?: unknown,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!dropdown) return null;
      let result: Dynamic = nodeAt(options2);
      return result === null
        ? null
        : dropdown.create({
            enum: result,
            index: null,
          });
    },
  );
}

function resolveEditorMediaMap(
  editorMediaMap2: Dynamic,
  { map: map, tableStart: tableStart, table: table }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesTableNodeTypes: Dynamic =
    resolveEditorSelectionAndTablesTableNodeTypes(table.type.schema);
  let cell: Dynamic = editorSelectionAndTablesTableNodeTypes.cell;
  let defaultType: Dynamic = cell.contentMatch.defaultType;
  let editorMediaEnum: Dynamic =
    context > 0 ? resolveEditorMediaEnum(map, table) : [];
  let tableStart2: Dynamic = tableStart;
  for (let index = 0; index < context; index++)
    tableStart2 += table.child(index).nodeSize;
  let items: Dynamic = [];
  for (
    let index: Dynamic = 0, amount: Dynamic = map.width * context;
    index < map.width;
    index++, amount++
  )
    if (
      context > 0 &&
      context < map.height &&
      map.map[amount] === map.map[amount - map.width]
    ) {
      let mapItem: Dynamic = map.map[amount];
      let attrs: Dynamic = table.nodeAt(mapItem).attrs;
      editorMediaMap2.setNodeMarkup(tableStart + mapItem, null, {
        ...attrs,
        rowspan: attrs.rowspan + 1,
      });
      index += attrs.colspan - 1;
      amount += attrs.colspan - 1;
    } else {
      let editorMediaEnumItem: Dynamic = editorMediaEnum[index];
      items.push(
        editorMediaEnumItem
          ? cell.create(null, defaultType.create(null, editorMediaEnumItem))
          : cell.createAndFill(),
      );
    }
  editorMediaMap2.insert(
    tableStart2,
    editorSelectionAndTablesTableNodeTypes.row.create(null, items),
  );
  return editorMediaMap2;
}

var isEditorMediaValue: (editorMediaValue?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var isEditorMediaBottom: (editorMediaBottom?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveEditorMediaKind(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  element.ownerDocument.defaultView?.parent?.postMessage(
    {
      kind: EditorHostLfileEmbedReveal,
      ...options,
    },
    `*`,
  );
}

function resolveEditorMediaNode2(
  editorMediaNode2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof editorMediaNode2 != `string`) return;
  let platformSessionAndSourcesNode: Dynamic =
    resolvePlatformSessionAndSourcesNode(editorMediaNode2);
  if (platformSessionAndSourcesNode !== undefined)
    return platformSessionAndSourcesNode;
  let editorHostError: Dynamic = resolveEditorHostError(editorMediaNode2);
  if (!editorHostError.ok || editorHostError.ref.file !== undefined) return;
  let target: Dynamic = editorHostError.ref.target;
  return target.kind === `node` && !target.field && !target.selector
    ? target.id
    : undefined;
}

var editorMediaWeakSet: Dynamic;

function installEditorMediaRef(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  element.addEventListener(
    `pointerover`,
    (..._extraArguments: unknown[]): undefined => {
      if (!element.hasAttribute(`data-lfile-embed-hover`)) {
        element.setAttribute(EditorHostDataLfileEmbedHover, ``);
        resolveEditorMediaKind(element, {
          ref: options,
          hover: true,
        });
      }
    },
  );
  element.addEventListener(
    `pointerleave`,
    (..._extraArguments: unknown[]): undefined => {
      element.removeAttribute(EditorHostDataLfileEmbedHover);
      resolveEditorMediaKind(element, {
        ref: options,
        hover: false,
      });
    },
  );
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView || editorMediaWeakSet.has(defaultView)) return;
  editorMediaWeakSet.add(defaultView);
  let requestAnimationFrame2 = (
    installEditorMediaRef2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let {
      clientX: installEditorMediaRef3,
      clientY: installEditorMediaRef4,
    }: Dynamic = installEditorMediaRef2;
    defaultView.requestAnimationFrame(
      (..._extraArguments: unknown[]): undefined => {
        let closest: Dynamic = defaultView.document
          .elementFromPoint(installEditorMediaRef3, installEditorMediaRef4)
          ?.closest(`div[data-lfile-embed]`);
        for (let installEditorMediaRefResult of defaultView.document.querySelectorAll(
          `div[data-lfile-embed][${EditorHostDataLfileEmbedHover}]`,
        ) as Dynamic)
          if (installEditorMediaRefResult !== closest) {
            installEditorMediaRefResult.removeAttribute(
              EditorHostDataLfileEmbedHover,
            );
          }
        if (closest && !closest.hasAttribute(`data-lfile-embed-hover`)) {
          closest.setAttribute(EditorHostDataLfileEmbedHover, ``);
        }
      },
    );
  };
  defaultView.addEventListener(`drop`, requestAnimationFrame2);
  defaultView.addEventListener(`dragend`, requestAnimationFrame2);
}

var EditorMediaStyles: string;

function isEditorMediaClosest(
  editorMediaClosest?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let closest: Dynamic =
    options instanceof Element ? options.closest(EditorMediaStyles) : null;
  return (
    !!closest &&
    closest !== editorMediaClosest &&
    editorMediaClosest.contains(closest)
  );
}

function isEditorMediaDragover(
  editorMediaDragover?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    if (event.type === `dragover` || event.type === `drop`) return false;
    if (event.type === `dragstart` || event.type === `dragend`) {
      let target2: Dynamic = event.target;
      return target2 === null ||
        target2 === options ||
        !options.contains(target2)
        ? false
        : options.hasAttribute(`data-lfile-widget`)
          ? true
          : isEditorMediaClosest(editorMediaDragover, event.target);
    }
    let target: Dynamic = event.target;
    return !(target === editorMediaDragover || target === options);
  };
}

var editorMediaWeakMap: Dynamic;

function updateEditorMediaValue(
  updateEditorMediaValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorMediaWeakMapEntry: Dynamic = editorMediaWeakMap.get(
    updateEditorMediaValue2,
  );
  if (!editorMediaWeakMapEntry) {
    editorMediaWeakMapEntry = new (Map as Dynamic)();
    editorMediaWeakMap.set(updateEditorMediaValue2, editorMediaWeakMapEntry);
  }
  return editorMediaWeakMapEntry;
}

function isEditorMediaGroup(
  editorMediaGroup?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesGroup = editorMediaGroup.group === `block`;
  return Node2.create({
    name: editorMediaGroup.name,
    group: editorMediaGroup.group,
    inline: editorMediaGroup.inline,
    atom: true,
    selectable: true,
    draggable: true,
    addOptions(..._extraArguments: unknown[]) {
      return {
        renderChild: undefined,
      };
    },
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        ref: {
          default: null,
        },
        width: {
          default: null,
        },
        align: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorHostCenter(element.getAttribute(`data-align`)),
          renderHTML: (
            editorMediaGroup2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataAlign: Dynamic = resolveEditorHostCenter(
              editorMediaGroup2.align,
            );
            return dataAlign
              ? {
                  "data-align": dataAlign,
                }
              : {};
          },
        },
        caption: {
          default: null,
          parseHTML: (element?: Dynamic, ..._extraArguments: unknown[]) =>
            resolveEditorHostTrim(element.getAttribute(`caption`)),
        },
        commentIds: {
          default: null,
          parseHTML: (..._extraArguments: unknown[]) => null,
          renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]): Dynamic {
      return [
        {
          tag: `${editorMediaGroup.tag}[data-lfile-embed]`,
          getAttrs: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let number2 = Number(element.getAttribute(`data-width`));
            return {
              ref: element.getAttribute(`data-lfile-embed`),
              width:
                Number.isFinite(number2) && number2 > 0
                  ? Math.round(number2)
                  : null,
            };
          },
        },
      ];
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let dataLfileEmbed = String(node.attrs.ref ?? ``);
      let number2 = Number(node.attrs.width);
      return [
        editorMediaGroup.tag,
        mergeAttributes(
          HTMLAttributes,
          {
            "data-lfile-embed": dataLfileEmbed,
          },
          Number.isFinite(number2) && number2 > 0
            ? {
                "data-width": String(Math.round(number2)),
              }
            : {},
        ),
        `[embed: ${dataLfileEmbed}]`,
      ];
    },
    addNodeView(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let { renderChild: options }: Dynamic = this.options;
      let name: Dynamic = editorMediaGroup.name;
      let tag: Dynamic = editorMediaGroup.tag;
      return (
        { node: node, editor: editor, getPos: getPos }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let text = String(node.attrs.ref ?? ``);
        let dom: Dynamic = document.createElement(tag);
        dom.setAttribute(`data-lfile-embed`, text);
        dom.contentEditable = `false`;
        let updateEditorMediaValue2: Dynamic = matchesGroup
          ? updateEditorMediaValue(editor)
          : null;
        let updateEditorMediaValueEntry: Dynamic =
          updateEditorMediaValue2?.get(text);
        if (updateEditorMediaValueEntry) {
          updateEditorMediaValue2.delete(text);
        }
        let body: Dynamic =
          updateEditorMediaValueEntry?.body ??
          (matchesGroup ? document.createElement(tag) : dom);
        if (matchesGroup) {
          body.setAttribute(`data-lfile-embed-body`, ``);
          dom.append(body);
          let element = document.createElement(`div`);
          element.setAttribute(EditorHostDataLfileEmbedGrip, ``);
          element.setAttribute(`aria-hidden`, `true`);
          let element2 = document.createElement(`div`);
          element2.setAttribute(EditorHostDataLfileEmbedGripNub, ``);
          element.append(element2);
          dom.append(element);
          dom.addEventListener(
            `dragstart`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (event.target === dom) {
                element2.setAttribute(EditorHostDataLfileEmbedGripDrag, ``);
              }
            },
          );
          dom.addEventListener(
            `dragend`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (event.target === dom) {
                element2.removeAttribute(EditorHostDataLfileEmbedGripDrag);
              }
            },
          );
          body.addEventListener(
            `mousedown`,
            (..._extraArguments: unknown[]): undefined => {
              if (!editor.isEditable || !body.hasAttribute(`data-lfile-widget`))
                return;
              dom.draggable = false;
              let removeEventListener2 = (
                ..._extraArguments: unknown[]
              ): undefined => {
                dom.draggable = true;
                window.removeEventListener(
                  `mouseup`,
                  removeEventListener2,
                  true,
                );
                window.removeEventListener(
                  `dragend`,
                  removeEventListener2,
                  true,
                );
              };
              window.addEventListener(`mouseup`, removeEventListener2, true);
              window.addEventListener(`dragend`, removeEventListener2, true);
            },
            true,
          );
        }
        let handle: Dynamic = updateEditorMediaValueEntry?.handle;
        let removeAttribute = (
          editorMediaGroup2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!matchesGroup) return;
          let number2 = Number(editorMediaGroup2.attrs.width);
          if (Number.isFinite(number2) && number2 > 0) {
            dom.style.width = `${Math.round(number2)}px`;
            dom.style.setProperty(`--embed-w`, `${Math.round(number2)}px`);
            dom.setAttribute(`data-lfile-embed-sized`, ``);
          } else {
            dom.style.width = ``;
            dom.style.removeProperty(`--embed-w`);
            dom.removeAttribute(`data-lfile-embed-sized`);
          }
        };
        removeAttribute(node);
        let removeAttribute2 = (
          editorMediaGroup2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!matchesGroup) return;
          let editorHostCenter: Dynamic = resolveEditorHostCenter(
            editorMediaGroup2.attrs.align,
          );
          if (editorHostCenter) {
            dom.setAttribute(`data-align`, editorHostCenter);
          } else {
            dom.removeAttribute(`data-align`);
          }
        };
        removeAttribute2(node);
        let removeAttribute3 = (
          editorMediaGroup2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!matchesGroup) return;
          let bid: Dynamic = editorMediaGroup2.attrs.bid;
          if (typeof bid == `string` && bid !== ``) {
            dom.setAttribute(`data-bid`, bid);
          } else {
            dom.removeAttribute(`data-bid`);
          }
        };
        removeAttribute3(node);
        let append = (
          editorMediaGroup2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (matchesGroup) {
            for (let isEditorMediaGroupResult2 of dom.querySelectorAll(
              `:scope>.lfile-embed-anchor`,
            ) as Dynamic)
              isEditorMediaGroupResult2.remove();
            for (let isEditorMediaGroupResult2 of filterEditorHostSlice(
              editorMediaGroup2.attrs.commentIds,
            ) as Dynamic) {
              let element = document.createElement(`span`);
              element.className = `lfile-embed-anchor`;
              element.setAttribute(
                `data-comment-id`,
                isEditorMediaGroupResult2,
              );
              dom.append(element);
            }
          }
        };
        append(node);
        let isEditorMediaGroupResult: Dynamic = null;
        let setAttribute = (
          editorMediaGroup2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!matchesGroup) return;
          let editorHostTest = resolveEditorHostTest(
            editorMediaGroup2.attrs.caption,
          );
          if (editorHostTest === null) {
            isEditorMediaGroupResult?.remove();
            isEditorMediaGroupResult = null;
            dom.removeAttribute(`aria-describedby`);
            return;
          }
          if (!isEditorMediaGroupResult) {
            isEditorMediaGroupResult = document.createElement(`div`);
            isEditorMediaGroupResult.setAttribute(
              EditorHostDataLfileEmbedCaption,
              ``,
            );
            isEditorMediaGroupResult.hidden = true;
            isEditorMediaGroupResult.style.setProperty(
              `display`,
              `none`,
              `important`,
            );
            isEditorMediaGroupResult.id = `lfile-embed-caption-${resolveEditorExtensionsMintId()}`;
          }
          if (isEditorMediaGroupResult.previousSibling !== body) {
            body.after(isEditorMediaGroupResult);
          }
          if (isEditorMediaGroupResult.textContent !== editorHostTest) {
            isEditorMediaGroupResult.textContent = editorHostTest;
          }
          if (
            dom.getAttribute(`aria-describedby`) !== isEditorMediaGroupResult.id
          ) {
            dom.setAttribute(`aria-describedby`, isEditorMediaGroupResult.id);
          }
        };
        setAttribute(node);
        let editorMediaNode2: Dynamic = resolveEditorMediaNode2(node.attrs.ref);
        if (!updateEditorMediaValueEntry)
          if (editorMediaNode2 && options)
            try {
              handle = options(editorMediaNode2, body);
            } catch (error: Dynamic) {
              body.textContent = `[embed error: ${error?.message ?? String(error)}]`;
            }
          else body.textContent = `⬚ embed: ${text || `(no ref)`}`;
        dom.addEventListener(
          `lfile-embed-remove`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.stopPropagation();
            if (!editor.isEditable) return;
            let pos: Dynamic = getPos();
            if (pos == null) return;
            let nodeAt: Dynamic = editor.state.doc.nodeAt(pos);
            if (!(!nodeAt || nodeAt.type.name !== name)) {
              editor.view.dispatch(
                editor.state.tr.delete(pos, pos + nodeAt.nodeSize),
              );
            }
          },
        );
        if (matchesGroup) {
          installEditorMediaRef(dom, text);
          dom.addEventListener(
            `click`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!editor.isEditable || isEditorMediaClosest(dom, event.target))
                return;
              let pos: Dynamic = getPos();
              if (pos == null) return;
              let { state: editor2, view: editor3 }: Dynamic = editor;
              if (
                !(
                  editor2.selection instanceof (NodeSelection as Dynamic) &&
                  editor2.selection.from === pos
                )
              ) {
                editor3.dispatch(
                  editor2.tr.setSelection(
                    NodeSelection.create(editor2.doc, pos),
                  ),
                );
              }
            },
          );
        }
        return {
          dom: dom,
          ...(matchesGroup
            ? {
                selectNode: (..._extraArguments: unknown[]): undefined => {
                  dom.classList.add(`ProseMirror-selectednode`);
                  resolveEditorMediaKind(dom, {
                    ref: text,
                    select: true,
                  });
                },
                deselectNode: (..._extraArguments: unknown[]): undefined => {
                  dom.classList.remove(`ProseMirror-selectednode`);
                  resolveEditorMediaKind(dom, {
                    ref: text,
                    select: false,
                  });
                },
              }
            : {}),
          update: (
            editorMediaGroup2?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            editorMediaGroup2.type.name !== name ||
            editorMediaGroup2.attrs.ref !== node.attrs.ref
              ? false
              : (removeAttribute(editorMediaGroup2),
                removeAttribute2(editorMediaGroup2),
                removeAttribute3(editorMediaGroup2),
                append(editorMediaGroup2),
                setAttribute(editorMediaGroup2),
                true),
          destroy: (..._extraArguments: unknown[]): undefined => {
            if (
              matchesGroup &&
              handle &&
              resolveEditorMediaNode2(node.attrs.ref)
            ) {
              let handle2: Dynamic = handle;
              let updateEditorMediaValue3: Dynamic =
                updateEditorMediaValue(editor);
              updateEditorMediaValue3.get(text)?.handle.unmount();
              updateEditorMediaValue3.set(text, {
                body: body,
                handle: handle2,
              });
              setTimeout((..._extraArguments: unknown[]): undefined => {
                let updateEditorMediaValueEntry2: Dynamic =
                  updateEditorMediaValue3.get(text);
                if (
                  updateEditorMediaValueEntry2 &&
                  updateEditorMediaValueEntry2.handle === handle2
                ) {
                  updateEditorMediaValue3.delete(text);
                  updateEditorMediaValueEntry2.handle.unmount();
                  resolveEditorMediaKind(dom, {
                    ref: text,
                    clear: true,
                  });
                }
              }, 0);
              return;
            }
            if (matchesGroup) {
              resolveEditorMediaKind(dom, {
                ref: text,
                clear: true,
              });
            }
            handle?.unmount();
          },
          ignoreMutation: (..._extraArguments: unknown[]) => true,
          stopEvent: isEditorMediaDragover(dom, body),
        };
      };
    },
  });
}

var EditorMediaGroup: Dynamic;

var EditorMediaMaster16: {
    name: string;
    master16: ({
        d?: undefined;
        points: number[][];
        rx: number;
    } | {
        points?: undefined;
        rx?: undefined;
        d: string;
    })[];
    master20: ({
        points?: undefined;
        rx?: undefined;
        d: string;
    } | {
        d?: undefined;
        points: number[][];
        rx: number;
    })[];
};

var EditorMediaMaster162: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        x: number;
        y: number;
        width: number;
        height: number;
        rx: number;
        fixedCorners: boolean;
    }[];
};

var EditorMediaMaster163: {
    name: string;
    master16: {
        d: string;
        filled: boolean;
    }[];
    master20: {
        d: string;
        filled: boolean;
    }[];
};

var EditorMediaMaster164: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

function resolveEditorMediaIsFinite(
  editorMediaIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let floor =
    Number.isFinite(editorMediaIsFinite) && editorMediaIsFinite > 0
      ? Math.floor(editorMediaIsFinite)
      : 0;
  let floor2 = Math.floor(floor / 3600);
  let floor3 = Math.floor((floor % 3600) / 60);
  let padStart: Dynamic = (
    editorMediaIsFinite2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => String(editorMediaIsFinite2).padStart(2, `0`);
  return floor2 > 0
    ? `${floor2}:${padStart(floor3)}:${padStart(floor % 60)}`
    : `${floor3}:${padStart(floor % 60)}`;
}

function filterEditorMediaHour(
  filterEditorMediaHour2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let floor =
    Number.isFinite(filterEditorMediaHour2) && filterEditorMediaHour2 > 0
      ? Math.floor(filterEditorMediaHour2)
      : 0;
  let filterEditorMediaHourHandler = (
    filterEditorMediaHour3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    filterEditorMediaHour3 > 0
      ? `${filterEditorMediaHour3} ${options}${filterEditorMediaHour3 === 1 ? `` : `s`}`
      : ``;
  return (
    [
      filterEditorMediaHourHandler(Math.floor(floor / 3600), `hour`),
      filterEditorMediaHourHandler(Math.floor((floor % 3600) / 60), `minute`),
      filterEditorMediaHourHandler(floor % 60, `second`),
    ]
      .filter(Boolean)
      .join(` `) || `0 seconds`
  );
}

var resolveEditorMediaIsFinite2: Dynamic;

var EditorMediaMessage: string;

function isEditorMediaDrag(event?: Dynamic, ..._extraArguments: unknown[]) {
  if (
    !event.target?.closest?.(`.lfile-video-start,.lfile-video-bar`) ||
    event.type.startsWith(`drag`) ||
    event.type === `drop`
  )
    return false;
  let event2: Dynamic = event;
  return !(
    event.type.startsWith(`key`) &&
    (event2.metaKey || event2.ctrlKey) &&
    !event2.altKey &&
    /^[zy]$/i.test(event2.key ?? ``)
  );
}

function isEditorMediaArrowLeft(
  document2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let element: Dynamic = document2.createElement(`span`);
  element.className = `lfile-video`;
  element.dataset.state = `rest`;
  options.setAttribute(`aria-label`, context ? `Video: ${context}` : `Video`);
  let setAttribute: Dynamic = (
    editorMediaArrowLeft?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element5: Dynamic = document2.createElement(`button`);
    element5.type = `button`;
    element5.className = editorMediaArrowLeft;
    element5.setAttribute(`aria-label`, options2);
    return element5;
  };
  let label = context ? `: ${context}` : ``;
  let setAttribute2: Dynamic = setAttribute(
    `lfile-video-start`,
    `Play video${label}`,
  );
  setAttribute2.append(
    resolveEditorAnchorsAndMentionsGrid2(document2, EditorMediaMaster163, 18),
  );
  let element2: Dynamic = document2.createElement(`span`);
  element2.className = `lfile-video-bar`;
  element2.setAttribute(`role`, `toolbar`);
  element2.setAttribute(`aria-label`, `Video controls${label}`);
  let setAttribute3: Dynamic = setAttribute(`lfile-video-btn`, `Play`);
  let element3: Dynamic = document2.createElement(`input`);
  element3.type = `range`;
  element3.className = `lfile-video-seek`;
  element3.min = `0`;
  element3.step = `any`;
  element3.setAttribute(`aria-label`, `Video position`);
  let element4: Dynamic = document2.createElement(`span`);
  element4.className = `lfile-video-time`;
  element4.setAttribute(`aria-hidden`, `true`);
  let setAttribute4: Dynamic = setAttribute(`lfile-video-btn`, `Mute`);
  setAttribute4.append(
    resolveEditorAnchorsAndMentionsGrid2(document2, EditorMediaMaster164, 16),
  );
  element2.append(setAttribute3, element3, element4, setAttribute4);
  let items: Dynamic = [setAttribute3, element3, setAttribute4];
  let isEditorMediaArrowLeftHandler = (
    editorMediaArrowLeft?: Dynamic,
    ..._extraArguments: unknown[]
  ) => editorMediaArrowLeft.disabled === true;
  let focus = (
    editorMediaArrowLeft?: Dynamic,
    options2: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!isEditorMediaArrowLeftHandler(editorMediaArrowLeft)) {
      for (let isEditorMediaArrowLeftResult2 of items as Dynamic)
        isEditorMediaArrowLeftResult2.tabIndex =
          isEditorMediaArrowLeftResult2 === editorMediaArrowLeft ? 0 : -1;
      if (options2) {
        editorMediaArrowLeft.focus();
      }
    }
  };
  let isEditorMediaArrowLeftHandler2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.find(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        item.tabIndex === 0 && !isEditorMediaArrowLeftHandler(item),
    ) ?? setAttribute3;
  let readItemItem: Dynamic = (
    editorMediaArrowLeft?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filteredItems: Dynamic = items.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        !isEditorMediaArrowLeftHandler(item),
    );
    if (Math.abs(options2) > 1)
      return options2 < 0
        ? filteredItems[0]
        : filteredItems[filteredItems.length - 1];
    for (
      let total: Dynamic = editorMediaArrowLeft + options2;
      total >= 0 && total < items.length;
      total += options2
    )
      if (!isEditorMediaArrowLeftHandler(items[total])) return items[total];
  };
  focus(setAttribute3);
  element2.addEventListener(
    `focusin`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let item: Dynamic = items.find(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          item2 === event.target,
      );
      if (item) {
        focus(item);
      }
    },
  );
  let isFinite2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    Number.isFinite(options.duration) && options.duration > 0
      ? options.duration
      : 0;
  let isEditorMediaArrowLeftResult: Dynamic = null;
  let enabled = false;
  let setAttribute5 = (
    editorMediaArrowLeft: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    let enabled2 = !options.paused && !options.ended;
    if (element.dataset.state !== `rest`) {
      element.dataset.state = enabled2 ? `playing` : `paused`;
    }
    if (enabled2 !== isEditorMediaArrowLeftResult) {
      isEditorMediaArrowLeftResult = enabled2;
      setAttribute3.setAttribute(`aria-label`, enabled2 ? `Pause` : `Play`);
      setAttribute3.replaceChildren(
        resolveEditorAnchorsAndMentionsGrid2(
          document2,
          enabled2 ? EditorMediaMaster162 : EditorMediaMaster163,
          16,
        ),
      );
    }
    let isFinite3: Dynamic = isFinite2();
    let min = Math.min(options.currentTime || 0, isFinite3 || 1 / 0);
    element3.disabled = isFinite3 === 0;
    if (element3.disabled && element3.tabIndex === 0) {
      focus(setAttribute3);
    }
    element3.max = String(isFinite3 > 0 ? isFinite3 : 1);
    let enabled3 = enabled && !editorMediaArrowLeft;
    if (!enabled3) {
      element3.value = String(isFinite3 > 0 ? min : 0);
    }
    let editorMediaIsFinite2: Dynamic = resolveEditorMediaIsFinite2(
      min,
      isFinite3,
    );
    if (
      (editorMediaArrowLeft ||
        !enabled2 ||
        document2.activeElement !== element3) &&
      element3.getAttribute(`aria-valuetext`) !== editorMediaIsFinite2
    ) {
      element3.setAttribute(`aria-valuetext`, editorMediaIsFinite2);
    }
    if (!enabled3) {
      element3.style.setProperty(
        `--lfile-video-at`,
        String(isFinite3 > 0 ? min / isFinite3 : 0),
      );
    }
    element4.textContent =
      isFinite3 > 0
        ? `${resolveEditorMediaIsFinite(min)} / ${resolveEditorMediaIsFinite(isFinite3)}`
        : resolveEditorMediaIsFinite(min);
    if (setAttribute4.dataset.muted !== String(options.muted)) {
      setAttribute4.setAttribute(
        `aria-label`,
        options.muted ? `Unmute` : `Mute`,
      );
      setAttribute4.dataset.muted = String(options.muted);
    }
  };
  let play = (..._extraArguments: unknown[]): undefined => {
    Promise.resolve(options.play()).catch(
      (..._extraArguments: unknown[]): undefined => {},
    );
  };
  let focus2 = (..._extraArguments: unknown[]): undefined => {
    element.dataset.state = `paused`;
    play();
    setAttribute5();
    focus(setAttribute3, true);
  };
  let pause = (..._extraArguments: unknown[]): undefined => {
    if (element.dataset.state === `rest`) {
      focus2();
    } else {
      if (options.paused || options.ended) {
        play();
      } else {
        options.pause();
      }
    }
  };
  setAttribute2.addEventListener(`click`, focus2);
  element.addEventListener(
    `mousedown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let target: Dynamic =
        event.target instanceof (document2.defaultView.Element as Dynamic)
          ? event.target
          : null;
      let closest: Dynamic = target?.closest(`button,input`) ?? null;
      if (
        target?.closest(`.lfile-video-start,.lfile-video-bar`) &&
        (closest === null || isEditorMediaArrowLeftHandler(closest))
      ) {
        event.preventDefault();
      }
    },
  );
  element3.addEventListener(
    `pointerdown`,
    (..._extraArguments: unknown[]): undefined => void (enabled = true),
  );
  for (let isEditorMediaArrowLeftResult2 of [
    `pointerup`,
    `pointercancel`,
    `change`,
    `blur`,
  ] as Dynamic)
    element3.addEventListener(
      isEditorMediaArrowLeftResult2,
      (..._extraArguments: unknown[]): undefined => void (enabled = false),
    );
  setAttribute3.addEventListener(`click`, pause);
  setAttribute4.addEventListener(
    `click`,
    (..._extraArguments: unknown[]): undefined => {
      options.muted = !options.muted;
      setAttribute5();
    },
  );
  element3.addEventListener(
    `input`,
    (..._extraArguments: unknown[]): undefined => {
      options.currentTime = Number(element3.value);
      setAttribute5(true);
    },
  );
  for (let isEditorMediaArrowLeftResult2 of [
    `play`,
    `pause`,
    `ended`,
    `timeupdate`,
    `durationchange`,
    `loadedmetadata`,
    `volumechange`,
  ] as Dynamic)
    options.addEventListener(
      isEditorMediaArrowLeftResult2,
      (..._extraArguments: unknown[]) => setAttribute5(),
    );
  element.addEventListener(
    `keydown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          event.target instanceof (document2.defaultView.Element as Dynamic) &&
          event.target.closest(`.lfile-video-start,.lfile-video-bar`)
        )
      )
        return;
      let matchesEditable = dependencies?.editable() === true;
      if (
        (event.key === `Enter` ||
          event.key === ` ` ||
          event.key === `k` ||
          event.key === `m`) &&
        event.repeat
      ) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (resolveEditorAnchorsAndMentionsEscape(event)) {
        if (!matchesEditable) return;
        event.preventDefault();
        resolveEditorAnchorsAndMentionsValue3(event);
        dependencies.leave();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      let itemIndex: Dynamic = items.indexOf(event.target);
      let count = event.key === `Tab` ? (event.shiftKey ? -1 : 1) : 0;
      let count2: Dynamic =
        event.target === element3
          ? 0
          : ((
              {
                ArrowLeft: -1,
                ArrowRight: 1,
                Home: -9,
                End: 9,
              } as Dynamic
            )[event.key] ?? 0);
      let matchesTarget: Dynamic =
        ((event.target === element3 || matchesEditable) && count) || count2;
      let itemItem: Dynamic =
        itemIndex >= 0 && matchesTarget !== 0
          ? readItemItem(itemIndex, matchesTarget)
          : undefined;
      if (itemItem && itemItem !== event.target) {
        event.preventDefault();
        event.stopPropagation();
        focus(itemItem, true);
        return;
      }
      if (count !== 0 && matchesEditable) {
        event.preventDefault();
        event.stopPropagation();
        dependencies.leave();
        return;
      }
      let PageUp = isFinite2() / 10 || 5;
      let recordItem: Dynamic =
        event.target === element3
          ? (
              {
                ArrowLeft: -5,
                ArrowDown: -5,
                ArrowRight: 5,
                ArrowUp: 5,
                PageDown: -PageUp,
                PageUp: PageUp,
              } as Dynamic
            )[event.key]
          : undefined;
      if (recordItem === undefined) {
        if (event.key === `k`) {
          event.preventDefault();
          event.stopPropagation();
          pause();
        } else {
          if (event.key === `m`) {
            event.preventDefault();
            event.stopPropagation();
            setAttribute4.click();
          }
        }
      } else {
        event.preventDefault();
        event.stopPropagation();
        options.currentTime = Math.max(
          0,
          Math.min(
            isFinite2() || 1 / 0,
            (options.currentTime || 0) + recordItem,
          ),
        );
        setAttribute5(true);
      }
    },
  );
  element.addEventListener(
    `pointerdown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let closest: Dynamic =
        event.target instanceof (document2.defaultView.Element as Dynamic)
          ? event.target.closest(EditorMediaMessage)
          : null;
      if (closest) {
        let closest3: Dynamic = event.target.closest(`button,input`);
        let matchesClosest =
          closest3 !== null && !isEditorMediaArrowLeftHandler(closest3);
        if (!matchesClosest) {
          event.preventDefault();
        }
        (matchesClosest
          ? closest3
          : element.dataset.state === `rest`
            ? setAttribute2
            : isEditorMediaArrowLeftHandler2()
        ).focus({
          preventScroll: true,
        });
      }
      let closest2: Dynamic = closest
        ? element.closest(`[draggable="true"]`)
        : null;
      if (!closest2) return;
      closest2.draggable = false;
      let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
        closest2.draggable = true;
        document2.removeEventListener(`pointerup`, removeEventListener2, true);
        document2.removeEventListener(
          `pointercancel`,
          removeEventListener2,
          true,
        );
      };
      document2.addEventListener(`pointerup`, removeEventListener2, true);
      document2.addEventListener(`pointercancel`, removeEventListener2, true);
    },
  );
  setAttribute5();
  element.append(options, setAttribute2, element2);
  return element;
}

var resolveEditorMediaIsFinite3: Dynamic;

var resolveEditorMediaDecode: Dynamic;

var EditorMediaDataLfileMediaFluid: string;

var resolveEditorMediaSafeParse: Dynamic;

var resolveEditorMediaTest: Dynamic;

var resolveEditorMediaTest2: Dynamic;

var resolveEditorMediaValue3: Dynamic;

var resolveEditorMediaWidth: Dynamic;

var resolveEditorMediaValue4: Dynamic;

var isEditorMediaEvery: Dynamic;

var resolveEditorMediaWrapper: Dynamic;

var editorMediaPositionLeftTopWidthValues: string[];

var resolveEditorMediaLfilePmMediaCropped: (editorMediaLfilePmMediaCropped?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var editorMediaWeakMap2: Dynamic;

var editorMediaWeakMap3: Dynamic;

var editorMediaWeakMap4: Dynamic;

var isEditorMediaCurrentSrc: Dynamic;

var EditorMediaMessage2: string;

var EditorMediaMessage3: string;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorMedia1Step1(): void {
  (editorMediaValue_1 = false);
  (resolveEditorMediaValue = (
    editorMediaValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    editorMediaValue_1 = editorMediaValue;
  });
  (TableBlockDropGuardExtension = Extension.create({
    name: `tableBlockDropGuard`,
    extendNodeSchema(..._extraArguments: unknown[]): Dynamic {
      return {
        disableDropCursor: (
          tableBlockDropGuardExtension?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (isEditorMediaTable(tableBlockDropGuardExtension) &&
            isEditorMediaTable2(
              tableBlockDropGuardExtension.state,
              options.pos,
            )) ||
          resolveEditorTableControlsDragging(
            tableBlockDropGuardExtension,
            options.pos,
          ),
      };
    },
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`tableBlockDropGuard`),
          props: {
            handleDrop(
              tableBlockDropGuardExtension?: Dynamic,
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ) {
              if (!isEditorMediaTable(tableBlockDropGuardExtension)) return false;
              let posAtCoords: Dynamic = tableBlockDropGuardExtension.posAtCoords(
                {
                  left: event.clientX,
                  top: event.clientY,
                },
              );
              return !posAtCoords ||
                !isEditorMediaTable2(
                  tableBlockDropGuardExtension.state,
                  posAtCoords.pos,
                )
                ? false
                : (event.preventDefault(), true);
            },
          },
        }),
      ];
    },
  }));
  (TableColumnResizeFocusPluginKey = new (PluginKey as Dynamic)(
    `tableColumnResizeFocus`,
  ));
  (resolveEditorMediaScrollWidth = (
    editorMediaScrollWidth?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorMediaScrollWidth.scrollWidth - editorMediaScrollWidth.clientWidth);
  (EditorMediaWidth = class extends EditorTableControlsTableWrapper {
    [key: string]: Dynamic;
    update(editorMediaWidth?: Dynamic, ..._extraArguments: unknown[]) {
      let editorMediaFirstChild: Dynamic = resolveEditorMediaFirstChild(
        this.node,
      );
      if (!super.update(editorMediaWidth)) return false;
      let editorMediaFirstChild2: Dynamic =
        resolveEditorMediaFirstChild(editorMediaWidth);
      let firstElementChild: Dynamic = this.colgroup.firstElementChild;
      for (
        let index = 0;
        firstElementChild && index < editorMediaFirstChild2.length;
        index++, firstElementChild = firstElementChild.nextElementSibling
      )
        if (editorMediaFirstChild[index] && !editorMediaFirstChild2[index]) {
          firstElementChild.style.removeProperty(`width`);
        }
      return true;
    }
  });
  (EditorMediaTabindex = [
    [`tabindex`, `0`],
    [`role`, `group`],
    [`aria-label`, `Scrollable table`],
  ]);
  (editorMediaMouseupDragstartContextmenuValues = [
    `mouseup`,
    `dragstart`,
    `contextmenu`,
  ]);
  (isEditorMediaColwidth = (
    editorMediaColwidth?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let selection: Dynamic = editorMediaColwidth.selection;
    let isEditorMediaColwidthResult: Dynamic;
    if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
      if (selection.$anchorCell.pos !== selection.$headCell.pos) return false;
      isEditorMediaColwidthResult = selection.$anchorCell.pos;
    } else {
      let editorSelectionAndTablesDepth: Dynamic =
        resolveEditorSelectionAndTablesDepth(selection.$from);
      if (!editorSelectionAndTablesDepth) return false;
      isEditorMediaColwidthResult = editorSelectionAndTablesDepth.pos;
    }
    let nodeAt: Dynamic = editorMediaColwidth.doc.nodeAt(
      isEditorMediaColwidthResult,
    );
    if (!nodeAt) return false;
    let attrs: Dynamic = nodeAt.attrs;
    if (attrs.colspan === 1 && attrs.rowspan === 1) return false;
    if (options) {
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorMediaColwidth);
      let difference: Dynamic =
        editorSelectionAndTablesTableStart.right -
        editorSelectionAndTablesTableStart.left;
      let { colwidth: attrs2 }: Dynamic = attrs;
      let isEditorMediaColwidthHandler: Dynamic = (
        editorMediaColwidth2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        ...attrs,
        colspan: 1,
        rowspan: 1,
        ...(attrs2
          ? {
              colwidth: attrs2[editorMediaColwidth2]
                ? [attrs2[editorMediaColwidth2]]
                : null,
            }
          : {}),
      });
      let createAndFill: Dynamic = (
        editorMediaColwidth2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let {
          bid: isEditorMediaColwidthHandler2,
          ...isEditorMediaColwidthHandler3
        }: Dynamic = isEditorMediaColwidthHandler(editorMediaColwidth2);
        return nodeAt.type.createAndFill(isEditorMediaColwidthHandler3);
      };
      let tr2: Dynamic = editorMediaColwidth.tr;
      let isEditorMediaColwidthResult2: Dynamic = null;
      for (
        let top: Dynamic = editorSelectionAndTablesTableStart.top;
        top < editorSelectionAndTablesTableStart.bottom;
        top++
      ) {
        let isEditorMediaColwidthResult3 = +(
          top === editorSelectionAndTablesTableStart.top
        );
        let items: Dynamic = [];
        for (
          let isEditorMediaColwidthResult4 = isEditorMediaColwidthResult3;
          isEditorMediaColwidthResult4 < difference;
          isEditorMediaColwidthResult4++
        )
          items.push(createAndFill(isEditorMediaColwidthResult4));
        if (!items.length) continue;
        let positionAt: Dynamic =
          editorSelectionAndTablesTableStart.map.positionAt(
            top,
            editorSelectionAndTablesTableStart.left,
            editorSelectionAndTablesTableStart.table,
          );
        if (top === editorSelectionAndTablesTableStart.top) {
          positionAt += nodeAt.nodeSize;
        }
        let mappedMapping: Dynamic = tr2.mapping.map(
          positionAt + editorSelectionAndTablesTableStart.tableStart,
          1,
        );
        tr2.insert(mappedMapping, Fragment.from(items));
        isEditorMediaColwidthResult2 =
          mappedMapping +
          items
            .slice(0, -1)
            .reduce(
              (
                accumulator?: Dynamic,
                node?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + node.nodeSize,
              0,
            );
      }
      tr2.setNodeMarkup(
        isEditorMediaColwidthResult,
        nodeAt.type,
        isEditorMediaColwidthHandler(0),
      );
      if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
        tr2.setSelection(
          new (EditorSelectionAndTablesRowspan as Dynamic)(
            tr2.doc.resolve(selection.$anchorCell.pos),
            isEditorMediaColwidthResult2 === null
              ? undefined
              : tr2.doc.resolve(isEditorMediaColwidthResult2),
          ),
        );
      }
      options(tr2);
    }
    return true;
  });
  Extension.create({
    name: `tableTypingLock`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`tableTypingLock`),
          view: (..._extraArguments: unknown[]): Dynamic => {
            let localResult: Dynamic = null;
            let localResult2: Dynamic = -1;
            let localResult3: Dynamic = -1;
            let items: Dynamic = [];
            let items2: Dynamic = [];
            let uniqueItems: Dynamic = new (Set as Dynamic)();
            let localResult4: Dynamic = null;
            let localResult5: Dynamic = null;
            let round: Dynamic = (
              callback?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let items3: Dynamic = [];
              for (let localResult6 of Array.from<Dynamic>(
                callback.rows[0].cells,
              ) as Dynamic) {
                let colSpan: Dynamic = localResult6.colSpan || 1;
                for (let index = 0; index < colSpan; index++)
                  items3.push(
                    Math.max(48, Math.round(localResult6.offsetWidth / colSpan)),
                  );
              }
              return items3;
            };
            let removeProperty = (..._extraArguments: unknown[]): undefined => {
              if (localResult?.isConnected) {
                let matchedElements: Dynamic =
                  localResult.querySelectorAll(`colgroup > col`);
                for (let localResult6 of uniqueItems as Dynamic)
                  matchedElements[localResult6]?.style.removeProperty(`width`);
              }
              uniqueItems.clear();
            };
            let removeEventListener2 = (
              ..._extraArguments: unknown[]
            ): undefined => {
              if (localResult4) {
                localResult5?.removeEventListener(`mousemove`, localResult4);
              }
              localResult4 = null;
              localResult5 = null;
            };
            let destroy = (..._extraArguments: unknown[]): undefined => {
              removeEventListener2();
              removeProperty();
              localResult = null;
              localResult2 = localResult3 = -1;
              items = [];
              items2 = [];
            };
            return {
              update(callback?: Dynamic, ..._extraArguments: unknown[]) {
                let { state: callback2 }: Dynamic = callback;
                let TableColumnResizingPluginKeyState: Dynamic =
                  TableColumnResizingPluginKey.getState(callback2);
                if (TableColumnResizingPluginKeyState?.dragging) {
                  if (localResult4) {
                    let localResult7: Dynamic = localResult;
                    if (
                      !localResult7?.isConnected ||
                      TableColumnResizingPluginKeyState.activeHandle < 0
                    )
                      return;
                    let editorMediaFirstChild: Dynamic =
                      resolveEditorMediaFirstChild(
                        callback2.doc
                          .resolve(TableColumnResizingPluginKeyState.activeHandle)
                          .node(-1),
                      );
                    let matchedElements2: Dynamic =
                      localResult7.querySelectorAll(`colgroup > col`);
                    let items5: Dynamic = [];
                    for (
                      let index2 = 0;
                      index2 < editorMediaFirstChild.length;
                      index2++
                    ) {
                      let matchedElementItem: Dynamic = matchedElements2[index2];
                      if (editorMediaFirstChild[index2]) {
                        uniqueItems.delete(index2);
                      } else {
                        if (items2[index2]) {
                          items[index2] = 0;
                          matchedElementItem?.style.removeProperty(`width`);
                          uniqueItems.delete(index2);
                          items5.push(index2);
                        }
                      }
                      items2[index2] = !!editorMediaFirstChild[index2];
                    }
                    items2.length = editorMediaFirstChild.length;
                    if (items5.length) {
                      let round2: Dynamic = round(localResult7);
                      for (let localResult8 of items5 as Dynamic) {
                        let matchedElementItem: Dynamic =
                          matchedElements2[localResult8];
                        items[localResult8] = round2[localResult8] ?? 0;
                        if (!(!matchedElementItem || !items[localResult8])) {
                          matchedElementItem.style.width = `${items[localResult8]}px`;
                          uniqueItems.add(localResult8);
                        }
                      }
                    }
                    return;
                  }
                  let node2: Dynamic = callback.domAtPos(
                    TableColumnResizingPluginKeyState.activeHandle,
                  ).node;
                  for (; node2 && node2.nodeName !== `TABLE`; )
                    node2 = node2.parentNode;
                  let node3: Dynamic = node2;
                  if (!node3?.rows.length) return;
                  if (node3 !== localResult) {
                    removeProperty();
                  }
                  items = round(node3);
                  items2 = resolveEditorMediaFirstChild(
                    callback2.doc
                      .resolve(TableColumnResizingPluginKeyState.activeHandle)
                      .node(-1),
                  ).map(Boolean);
                  localResult = node3;
                  localResult2 = localResult3 = -1;
                  let items4: Dynamic = items;
                  localResult4 = (..._extraArguments: unknown[]): undefined => {
                    if (!node3.isConnected) return;
                    let matchedElements2: Dynamic =
                      node3.querySelectorAll(`colgroup > col`);
                    for (let index2 = 0; index2 < items4.length; index2++) {
                      let matchedElementItem: Dynamic = matchedElements2[index2];
                      if (
                        matchedElementItem &&
                        !matchedElementItem.style.width &&
                        items4[index2]
                      ) {
                        matchedElementItem.style.width = `${items4[index2]}px`;
                        uniqueItems.add(index2);
                      }
                    }
                  };
                  localResult5 = callback.dom.ownerDocument.defaultView ?? window;
                  let localResult6: Dynamic = localResult5;
                  queueMicrotask((..._extraArguments: unknown[]): undefined => {
                    if (localResult4) {
                      localResult4();
                      localResult6.addEventListener(`mousemove`, localResult4);
                    }
                  });
                  return;
                }
                if (localResult4) {
                  removeEventListener2();
                }
                let $from: Dynamic = callback2.selection.$from;
                let count: Dynamic = 0;
                let count2: Dynamic = 0;
                for (let depth: Dynamic = $from.depth; depth > 0; depth--) {
                  let node2: Dynamic = $from.node(depth);
                  if (
                    !count2 &&
                    (node2.type.name === `tableCell` ||
                      node2.type.name === `tableHeader`)
                  ) {
                    count2 = depth;
                  }
                  if (node2.type.name === `table`) {
                    count = depth;
                    break;
                  }
                }
                if (!count || !count2) return destroy();
                let nodeDOM: Dynamic = callback.nodeDOM($from.before(count));
                let nodeDOM2: Dynamic =
                  nodeDOM instanceof (HTMLTableElement as Dynamic)
                    ? nodeDOM
                    : (nodeDOM?.querySelector?.(`table`) ?? null);
                if (!nodeDOM2?.rows.length) return destroy();
                let node: Dynamic = $from.node(count);
                let findCell: Dynamic = EditorSelectionAndTablesLeft.get(
                  node,
                ).findCell($from.before(count2) - $from.start(count));
                if (
                  nodeDOM2 !== localResult ||
                  findCell.left !== localResult2 ||
                  findCell.right !== localResult3
                ) {
                  let round2: Dynamic = round(nodeDOM2);
                  if (nodeDOM2 !== localResult) {
                    removeProperty();
                  }
                  items = round2;
                  items2 = [];
                  localResult = nodeDOM2;
                  localResult2 = findCell.left;
                  localResult3 = findCell.right;
                }
                let matchedElements: Dynamic =
                  nodeDOM2.querySelectorAll(`colgroup > col`);
                let child: Dynamic = node.child(0);
                let items3: Dynamic = [];
                let index = 0;
                for (let index2 = 0; index2 < child.childCount; index2++) {
                  let child2: Dynamic = child.child(index2);
                  let colspan: Dynamic = child2.attrs.colspan || 1;
                  let colwidth: Dynamic = child2.attrs.colwidth;
                  for (let index3 = 0; index3 < colspan; index3++, index++) {
                    let enabled = !!colwidth?.[index3];
                    let itemItem: Dynamic = items2[index];
                    items2[index] = enabled;
                    let matchedElementItem: Dynamic = matchedElements[index];
                    if (matchedElementItem) {
                      if (enabled) {
                        uniqueItems.delete(index);
                      } else {
                        if (itemItem) {
                          matchedElementItem.style.removeProperty(`width`);
                          uniqueItems.delete(index);
                          items3.push(index);
                        } else {
                          if (items[index]) {
                            matchedElementItem.style.width = `${items[index]}px`;
                            uniqueItems.add(index);
                          }
                        }
                      }
                    }
                  }
                }
                items2.length = index;
                if (items3.length) {
                  let round2: Dynamic = round(nodeDOM2);
                  for (let localResult6 of items3 as Dynamic) {
                    items[localResult6] = round2[localResult6];
                    if (round2[localResult6]) {
                      matchedElements[localResult6].style.width =
                        `${round2[localResult6]}px`;
                      uniqueItems.add(localResult6);
                    }
                  }
                }
              },
              destroy: destroy,
            };
          },
        }),
      ];
    },
  });
  (resolveEditorMediaAppendedTransaction = (
    editorMediaAppendedTransaction?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaAppendedTransaction.getMeta(`history$`) !== undefined ||
    editorMediaAppendedTransaction
      .getMeta(`appendedTransaction`)
      ?.getMeta(`history$`) !== undefined);
  (resolveEditorMediaAppendTransaction = (
    editorMediaAppendTransaction?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let appendTransaction: Dynamic =
      editorMediaAppendTransaction.spec.appendTransaction;
    if (appendTransaction) {
      editorMediaAppendTransaction.spec.appendTransaction = function (
        this: Dynamic,
        editorMediaAppendTransaction2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let call: Dynamic = appendTransaction.call(
          this,
          editorMediaAppendTransaction2,
          options,
          context,
        );
        return call &&
          call.docChanged &&
          editorMediaAppendTransaction2.some(
            resolveEditorMediaAppendedTransaction,
          )
          ? undefined
          : call;
      };
    }
    return editorMediaAppendTransaction;
  });
  (collectEditorMediaTable = (
    collectEditorMediaTable2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    collectEditorMediaTable2.descendants(
      (node?: Dynamic, ..._extraArguments: unknown[]) => (
        node.type.spec.tableRole === `table` &&
          items.push(
            node.content.content
              .map(
                (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  content.childCount,
              )
              .join(`.`),
          ),
        true
      ),
    );
    return items.join(`|`);
  });
  (isEditorMediaAppendedTransaction = (
    editorMediaAppendedTransaction?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let appendTransaction: Dynamic =
      editorMediaAppendedTransaction.spec.appendTransaction;
    if (appendTransaction) {
      editorMediaAppendedTransaction.spec.appendTransaction = function (
        this: Dynamic,
        editorMediaAppendedTransaction2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let call: Dynamic = appendTransaction.call(
          this,
          editorMediaAppendedTransaction2,
          options2,
          context,
        );
        if (!call || !call.docChanged) return call;
        let editorMediaAppendedTransactionItem: Dynamic =
          editorMediaAppendedTransaction2[0];
        let meta: Dynamic =
          editorMediaAppendedTransactionItem?.getMeta(`appendedTransaction`) ??
          editorMediaAppendedTransactionItem;
        return !meta ||
          resolveEditorMediaAppendedTransaction(meta) ||
          options(meta) ||
          collectEditorMediaTable(context.doc) ===
            collectEditorMediaTable(call.doc)
          ? call
          : undefined;
      };
    }
    return editorMediaAppendedTransaction;
  });
  (EditorMediaDefault = {
    default: null,
    parseHTML: (element?: Dynamic, ..._extraArguments: unknown[]) => {
      let isEditorExtensionsTrim3 = isEditorExtensionsTrim(
        element.getAttribute(`data-colwidth`) ?? element.getAttribute(`colwidth`),
      );
      return isEditorExtensionsTrim3 &&
        isEditorExtensionsTrim3.length ===
          resolveEditorExtensionsIsInteger(
            element.getAttribute(`colspan`),
            2 ** 53 - 1,
          )
        ? isEditorExtensionsTrim3
        : null;
    },
    renderHTML: (element?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let isEditorExtensionsTrim3: Dynamic = collectEditorExtensionsSlice(
        element.colwidth,
      );
      return isEditorExtensionsTrim3
        ? resolveEditorExtensionsDataColwidth(isEditorExtensionsTrim3)
        : {};
    },
  });
  (ThScopePluginKey = new (PluginKey as Dynamic)(`th-scope`));
  (IntraCellSelectionGuardPluginKey = new (PluginKey as Dynamic)(
    `intraCellSelectionGuard`,
  ));
  (ReadOnlyTableViewPluginKey = new (PluginKey as Dynamic)(
    `readOnlyTableView`,
  ));
  (TableClipEdgePluginKey = new (PluginKey as Dynamic)(
    `tableClipEdge`,
  ));
  (resolveEditorMediaFrom = (
    editorMedia?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.from<Dynamic>(editorMedia.querySelectorAll(`:scope > .tableWrapper`)));
  (EditorMediaDraggable = TableNode.extend({
    content: `tableRow*`,
    draggable: true,
    addProseMirrorPlugins(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let View: Dynamic = this.options.View ?? EditorMediaWidth;
      return [
        ...(this.options.resizable && this.editor.isEditable
          ? []
          : [
              new (Plugin as Dynamic)({
                key: ReadOnlyTableViewPluginKey,
                props: {
                  nodeViews: {
                    [this.name]: (
                      editorMediaDraggable?: Dynamic,
                      options?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      resolveEditorMediaNodeType(
                        new (View as Dynamic)(
                          editorMediaDraggable,
                          this.options.cellMinWidth,
                          options,
                        ),
                        (..._extraArguments: unknown[]): Dynamic =>
                          options.editable,
                      ),
                  },
                },
              }),
            ]),
        resolveEditorTableControlsKey(),
        resolveEditorTableControlsKey2(),
        ...(this.parent?.() ?? []).map(resolveEditorMediaAppendTransaction),
        getEditorTableControlsKey(),
        getEditorMediaKey(),
        isEditorMediaMove(),
        getEditorTableControlsKey2(this.editor),
        isEditorTableControlsKey2(this.editor),
        updateEditorMediaKey(),
      ];
    },
    addCommands(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        ...this.parent?.(),
        insertTable:
          (
            {
              rows: editorMediaDraggable = 3,
              cols: editorMediaDraggable2 = 3,
              withHeaderRow: editorMediaDraggable3 = true,
            }: Dynamic = {},
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { tr: tr2, dispatch: dispatch, editor: editor }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let { schema: editor2 }: Dynamic = editor;
            let isEditorExtensionsFloor2 = isEditorExtensionsFloor(
              editor.view?.dom.clientWidth || 0,
              editorMediaDraggable2,
            );
            let createAndFill: Dynamic = (
              editorMediaDraggable4?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              editor2.nodes[
                editorMediaDraggable4 ? `tableHeader` : `tableCell`
              ].createAndFill({
                colwidth: [isEditorExtensionsFloor2],
              });
            let items: Dynamic = [];
            for (let index = 0; index < editorMediaDraggable; index++) {
              let items2: Dynamic = [];
              for (let index2 = 0; index2 < editorMediaDraggable2; index2++)
                items2.push(createAndFill(editorMediaDraggable3 && index === 0));
              items.push(editor2.nodes.tableRow.createChecked(null, items2));
            }
            let checked: Dynamic = editor2.nodes.table.createChecked(null, items);
            if (dispatch) {
              let total: Dynamic = tr2.selection.from + 1;
              tr2
                .replaceSelectionWith(checked)
                .scrollIntoView()
                .setSelection(TextSelection.near(tr2.doc.resolve(total)));
            }
            return true;
          },
        splitCell:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorMediaColwidth(state, dispatch),
        mergeCells:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            isEditorTableControlsMap(state, dispatch),
        mergeOrSplit:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            isEditorTableControlsMap(state, dispatch) ||
            isEditorMediaColwidth(state, dispatch),
      };
    },
    addKeyboardShortcuts(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let View: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
        if (
          !(
            this.editor.state.selection instanceof
            (EditorSelectionAndTablesRowspan as Dynamic)
          )
        )
          return false;
        let editorSelectionAndTablesTableStart: Dynamic =
          getEditorSelectionAndTablesTableStart(this.editor.state);
        let matchesLeft =
          editorSelectionAndTablesTableStart.left === 0 &&
          editorSelectionAndTablesTableStart.right ===
            editorSelectionAndTablesTableStart.map.width;
        let matchesTop =
          editorSelectionAndTablesTableStart.top === 0 &&
          editorSelectionAndTablesTableStart.bottom ===
            editorSelectionAndTablesTableStart.map.height;
        return matchesLeft && matchesTop
          ? this.editor.commands.deleteTable()
          : matchesLeft
            ? this.editor.commands.deleteRow()
            : matchesTop
              ? this.editor.commands.deleteColumn()
              : false;
      };
      let editorMediaDraggableHandler: Dynamic =
        (
          editorMediaDraggable?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (..._extraArguments: unknown[]) => {
          let { view: editor }: Dynamic = this.editor;
          let editorTableControlsHead: Dynamic = getEditorTableControlsHead(
            editor,
            editorMediaDraggable,
            options,
          );
          if (editorTableControlsHead) {
            editor.dispatch(
              editor.state.tr
                .setSelection(editorTableControlsHead)
                .scrollIntoView(),
            );
          }
          return editorTableControlsHead !== null;
        };
      return {
        ...this.parent?.(),
        Backspace: View,
        "Mod-Backspace": View,
        Delete: View,
        "Mod-Delete": View,
        "Shift-ArrowDown": (..._extraArguments: unknown[]) =>
          isEditorTableControlsState2(this.editor.view, 1),
        "Shift-ArrowUp": (..._extraArguments: unknown[]) =>
          isEditorTableControlsState2(this.editor.view, -1),
        ArrowLeft: editorMediaDraggableHandler(`horiz`, -1),
        ArrowRight: editorMediaDraggableHandler(`horiz`, 1),
        ArrowUp: editorMediaDraggableHandler(`vert`, -1),
        ArrowDown: editorMediaDraggableHandler(`vert`, 1),
      };
    },
  }).configure({
    resizable: true,
    lastColumnResizable: true,
    cellMinWidth: 48,
    View: EditorMediaWidth,
  }));
  (resolveEditorMediaAddAttributes = (
    editorMediaAdd: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic =>
    TableCellNode.extend({
      addAttributes(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        return {
          ...this.parent?.(),
          colwidth: EditorMediaDefault,
          ...editorMediaAdd,
        };
      },
    }));
  (EditorMediaOpReminted = `op-reminted`);
  (editorMediaSet = new (Set as Dynamic)([
    `ops`,
    `need`,
    `presence`,
    `view`,
    `pending`,
    `rescue`,
    `words`,
    `hold`,
    `unhold`,
    `gated`,
    `painted`,
    `decide`,
    `dump`,
  ]));
  (resolveEditorMediaValue2 = (
    editorMediaValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => resolveEditorMediaNode(editorMediaValue2, editorMediaSet));
  (EditorMediaOpSnapshot = `op-snapshot`);
  (resolveEditorMediaOpRemote = (
    editorMediaOpRemote?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaOpRemote.getMeta(`op-remote`) !== undefined ||
    editorMediaOpRemote.getMeta(`op-snapshot`) !== undefined ||
    editorMediaOpRemote.getMeta(`op$`) !== undefined);
  (resolveEditorMediaAppendedTransaction2 = (
    editorMediaAppendedTransaction2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let meta: Dynamic =
      editorMediaAppendedTransaction2.getMeta(`appendedTransaction`);
    return (
      meta !== undefined &&
      meta !== editorMediaAppendedTransaction2 &&
      resolveEditorMediaOpRemote(meta)
    );
  });
  (resolveEditorMediaHeaderCell = (
    editorMediaHeaderCell?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorMediaHeaderCell.type.spec.tableRole === `header_cell` ||
    editorMediaHeaderCell.attrs.header === true);
  (isEditorMediaLeft = (
    editorMediaLeft?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorSelectionAndTablesHead(editorMediaLeft)) return false;
    if (options) {
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorMediaLeft);
      options(
        collectEditorMediaMap(
          editorMediaLeft.tr,
          editorSelectionAndTablesTableStart,
          editorSelectionAndTablesTableStart.left,
        ),
      );
    }
    return true;
  });
  (isEditorMediaRight = (
    editorMediaRight?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorSelectionAndTablesHead(editorMediaRight)) return false;
    if (options) {
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorMediaRight);
      options(
        collectEditorMediaMap(
          editorMediaRight.tr,
          editorSelectionAndTablesTableStart,
          editorSelectionAndTablesTableStart.right,
        ),
      );
    }
    return true;
  });
  (isEditorMediaValue = (
    editorMediaValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorSelectionAndTablesHead(editorMediaValue)) return false;
    if (options) {
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorMediaValue);
      options(
        resolveEditorMediaMap(
          editorMediaValue.tr,
          editorSelectionAndTablesTableStart,
          editorSelectionAndTablesTableStart.top,
        ),
      );
    }
    return true;
  });
  (isEditorMediaBottom = (
    editorMediaBottom?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorSelectionAndTablesHead(editorMediaBottom)) return false;
    if (options) {
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorMediaBottom);
      options(
        resolveEditorMediaMap(
          editorMediaBottom.tr,
          editorSelectionAndTablesTableStart,
          editorSelectionAndTablesTableStart.bottom,
        ),
      );
    }
    return true;
  });
  (editorMediaWeakSet = new (WeakSet as Dynamic)());
  (EditorMediaStyles = `a,button,input,select,textarea,summary,[contenteditable=true]`);
  (editorMediaWeakMap = new (WeakMap as Dynamic)());
  (EditorMediaGroup = isEditorMediaGroup({
    name: `embed`,
    group: `block`,
    inline: false,
    tag: `div`,
  }));
  isEditorMediaGroup({
    name: `embedInline`,
    group: `inline`,
    inline: true,
    tag: `span`,
  });
  (EditorMediaMaster16 = {
    name: `Download`,
    master16: [
      {
        points: [
          [3.5, 9.5],
          [3.5, 12.5],
          [12.5, 12.5],
          [12.5, 9.5],
        ],
        rx: 0.75,
      },
      {
        d: `M8 3.5L8 9.5L5.5 7M10.5 7L8 9.5`,
      },
    ],
    master20: [
      {
        d: `M10 3.5L10 13.5L14 9.5M6 9.5L10 13.5`,
      },
      {
        points: [
          [3.5, 13.5],
          [3.5, 16.5],
          [16.5, 16.5],
          [16.5, 13.5],
        ],
        rx: 1,
      },
    ],
  });
  (EditorMediaMaster162 = {
    name: `Pause`,
    master16: [
      {
        d: `M3.5 4.25L3.5 11.75C3.5 12.164 3.836 12.5 4.25 12.5L5.75 12.5C6.164 12.5 6.5 12.164 6.5 11.75L6.5 4.25C6.5 3.836 6.164 3.5 5.75 3.5L4.25 3.5C3.836 3.5 3.5 3.836 3.5 4.25Z`,
      },
      {
        d: `M9.5 4.25L9.5 11.75C9.5 12.164 9.836 12.5 10.25 12.5L11.75 12.5C12.164 12.5 12.5 12.164 12.5 11.75L12.5 4.25C12.5 3.836 12.164 3.5 11.75 3.5L10.25 3.5C9.836 3.5 9.5 3.836 9.5 4.25Z`,
      },
    ],
    master20: [
      {
        x: 11.5,
        y: 3.5,
        width: 5,
        height: 13,
        rx: 1,
        fixedCorners: true,
      },
      {
        x: 3.5,
        y: 3.5,
        width: 5,
        height: 13,
        rx: 1,
        fixedCorners: true,
      },
    ],
  });
  (EditorMediaMaster163 = {
    name: `PlayFilled`,
    master16: [
      {
        d: `M6.44 3.682L11.59 6.765C12.022 7.024 12.286 7.497 12.286 8C12.286 8.503 12.022 8.976 11.59 9.235L6.44 12.318C6.241 12.437 6.014 12.5 5.782 12.5C5.074 12.5 4.5 11.926 4.5 11.218L4.5 4.782C4.5 4.074 5.074 3.5 5.782 3.5C6.014 3.5 6.241 3.563 6.44 3.682Z`,
        filled: true,
      },
    ],
    master20: [
      {
        d: `M3.5 15.539L3.5 4.461C3.5 3.378 4.378 2.5 5.461 2.5C5.814 2.5 6.16 2.595 6.463 2.776L15.523 8.168C16.129 8.529 16.5 9.182 16.5 9.887L16.5 10.113C16.5 10.818 16.129 11.471 15.523 11.832L6.463 17.224C6.16 17.405 5.814 17.5 5.461 17.5C4.378 17.5 3.5 16.622 3.5 15.539Z`,
        filled: true,
      },
    ],
  });
  (EditorMediaMaster164 = {
    name: `Speaker`,
    master16: [
      {
        d: `M12.9 5.5C13.284 6.25 13.5 7.1 13.5 8C13.5 8.9 13.284 9.75 12.9 10.5`,
      },
      {
        d: `M10.599 6.5C10.854 6.941 11 7.454 11 8C11 8.546 10.854 9.059 10.599 9.5`,
      },
      {
        d: `M3.5 5.5L4.124 5.5C4.366 5.5 4.6 5.412 4.783 5.253L7.671 2.726C8 2.443 8.5 2.672 8.5 3.102L8.5 12.899C8.5 13.328 8 13.558 7.671 13.275L4.783 10.748C4.6 10.588 4.367 10.5 4.124 10.5L3.5 10.5C2.948 10.5 2.5 10.053 2.5 9.5L2.5 6.5C2.5 5.948 2.948 5.5 3.5 5.5Z`,
      },
    ],
    master20: [
      {
        d: `M16.635 6.5C17.187 7.545 17.5 8.736 17.5 10C17.5 11.264 17.187 12.455 16.635 13.5`,
      },
      {
        d: `M14 12.064C14.094 11.883 14.175 11.694 14.244 11.5C14.41 11.031 14.5 10.526 14.5 10C14.5 9.474 14.41 8.969 14.244 8.5C14.175 8.306 14.094 8.118 14 7.937`,
      },
      {
        d: `M3.5 6.5L5.143 6.5C5.374 6.5 5.598 6.42 5.776 6.274L10.183 2.668C10.411 2.485 10.756 2.533 10.919 2.78C10.969 2.854 11 2.947 11 3.055L11 16.945C11 17.238 10.74 17.473 10.448 17.444C10.359 17.435 10.268 17.401 10.183 17.332L5.776 13.726C5.598 13.58 5.374 13.5 5.143 13.5L3.5 13.5C2.948 13.5 2.5 13.053 2.5 12.5L2.5 7.5C2.5 6.948 2.948 6.5 3.5 6.5Z`,
      },
    ],
  });
  (resolveEditorMediaIsFinite2 = (
    editorMediaIsFinite2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Number.isFinite(options) && options > 0
      ? `${filterEditorMediaHour(editorMediaIsFinite2)} of ${filterEditorMediaHour(options)}`
      : filterEditorMediaHour(editorMediaIsFinite2));
  (EditorMediaMessage = `.lfile-video-start,.lfile-video-bar`);
  (resolveEditorMediaIsFinite3 = (
    editorMediaIsFinite3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let number2 = Number(editorMediaIsFinite3);
    return Number.isFinite(number2) && number2 > 0
      ? Math.min(1e5, Math.round(number2))
      : 0;
  });
  (resolveEditorMediaDecode = (
    editorMediaDecode?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let decode = new TextDecoder().decode(editorMediaDecode.subarray(0, 2048));
    return /<svg[\s/>:]/i.test(decode);
  });
  (EditorMediaDataLfileMediaFluid = `data-lfile-media-fluid`);
  (resolveEditorMediaSafeParse = (
    editorMediaSafeParse?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let safeParse: Dynamic = EditorHostKind2.safeParse(editorMediaSafeParse);
    return safeParse.success ? safeParse.data : null;
  });
  (resolveEditorMediaTest = (
    editorMediaTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorMediaTest == `string` && editorHostPattern3.test(editorMediaTest)
      ? editorMediaTest
      : null);
  (resolveEditorMediaTest2 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string` &&
    /^[\w.+-]+\/[\w.+-]+$/.test(items) &&
    items.length <= 255
      ? items
      : null);
  (resolveEditorMediaValue3 = (
    editorMediaValue3?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof editorMediaValue3 != `object` || !editorMediaValue3) return null;
    let editorMediaValue32: Dynamic = editorMediaValue3;
    let editorMediaIsFinite3: Dynamic = resolveEditorMediaIsFinite3(
      editorMediaValue32.w,
    );
    let editorMediaIsFinite32: Dynamic = resolveEditorMediaIsFinite3(
      editorMediaValue32.h,
    );
    return editorMediaIsFinite3 > 0 && editorMediaIsFinite32 > 0
      ? {
          w: editorMediaIsFinite3,
          h: editorMediaIsFinite32,
        }
      : null;
  });
  (resolveEditorMediaWidth = (
    editorMediaWidth?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorMediaIsFinite3(editorMediaWidth.width) ||
    (resolveEditorMediaValue3(editorMediaWidth.dims)?.w ?? 0));
  (resolveEditorMediaValue4 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof items != `string` || !items) return null;
    if (items.length <= 2048) return items;
    let label: Dynamic = ``;
    for (let items2 of items as Dynamic) {
      if (label.length + items2.length > 2048) break;
      label += items2;
    }
    return label;
  });
  (isEditorMediaEvery = (
    editorMediaEvery?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof editorMediaEvery != `object` || !editorMediaEvery) return null;
    let editorMediaEvery2: Dynamic = editorMediaEvery;
    let number2 = Number(editorMediaEvery2.x);
    let number3 = Number(editorMediaEvery2.y);
    let number4 = Number(editorMediaEvery2.w);
    let number5 = Number(editorMediaEvery2.h);
    return ![number2, number3, number4, number5].every(Number.isFinite) ||
      number2 < 0 ||
      number3 < 0 ||
      number4 < 0.01 ||
      number5 < 0.01 ||
      number4 > 1 ||
      number5 > 1 ||
      number2 + number4 > 1.0001 ||
      number3 + number5 > 1.0001 ||
      (number4 >= 1 && number5 >= 1)
      ? null
      : {
          x: number2,
          y: number3,
          w: number4,
          h: number5,
        };
  });
  (resolveEditorMediaWrapper = (
    editorMediaWrapper?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let isEditorMediaEvery2: Dynamic = isEditorMediaEvery(
      editorMediaWrapper.crop,
    );
    let editorMediaValue3: Dynamic = resolveEditorMediaValue3(
      editorMediaWrapper.dims,
    );
    if (!isEditorMediaEvery2 || !editorMediaValue3) return null;
    let round = (editorMediaWrapper2?: Dynamic, ..._extraArguments: unknown[]) =>
      `${Math.round(editorMediaWrapper2 * 1e4) / 100}%`;
    return {
      wrapper: {
        aspectRatio: `${editorMediaValue3.w} / ${editorMediaValue3.h}`,
      },
      img: {
        position: `absolute`,
        left: round(-isEditorMediaEvery2.x / isEditorMediaEvery2.w),
        top: round(-isEditorMediaEvery2.y / isEditorMediaEvery2.h),
        width: round(1 / isEditorMediaEvery2.w),
        height: round(1 / isEditorMediaEvery2.h),
        maxWidth: `none`,
      },
    };
  });
  (editorMediaPositionLeftTopWidthValues = [
    `position`,
    `left`,
    `top`,
    `width`,
    `height`,
    `max-width`,
  ]);
  (resolveEditorMediaLfilePmMediaCropped = (
    editorMediaLfilePmMediaCropped?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let editorMediaWrapper: Dynamic = options
      ? resolveEditorMediaWrapper(context)
      : null;
    if (editorMediaWrapper) {
      editorMediaLfilePmMediaCropped.style.aspectRatio =
        editorMediaWrapper.wrapper.aspectRatio;
      editorMediaLfilePmMediaCropped.classList.add(`lfile-pm-media-cropped`);
    } else {
      editorMediaLfilePmMediaCropped.style.removeProperty(`aspect-ratio`);
      editorMediaLfilePmMediaCropped.classList.remove(`lfile-pm-media-cropped`);
    }
    if (options)
      if (editorMediaWrapper)
        Object.assign(options.style, editorMediaWrapper.img);
      else
        for (let resolveEditorMediaLfilePmMediaCroppedResult of editorMediaPositionLeftTopWidthValues as Dynamic)
          options.style.removeProperty(
            resolveEditorMediaLfilePmMediaCroppedResult,
          );
  });
  (editorMediaWeakMap2 = new (WeakMap as Dynamic)());
  (editorMediaWeakMap3 = new (WeakMap as Dynamic)());
  (editorMediaWeakMap4 = new (WeakMap as Dynamic)());
  (isEditorMediaCurrentSrc = (
    editorMediaCurrentSrc?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorMediaWeakMap4Entry: Dynamic = editorMediaWeakMap4.get(
      editorMediaCurrentSrc,
    );
    if (
      editorMediaWeakMap4Entry === undefined ||
      typeof HTMLImageElement === "undefined"
    )
      return false;
    try {
      let prototype = HTMLImageElement.prototype;
      let get2 = Object.getOwnPropertyDescriptor(prototype, `currentSrc`)?.get;
      let get3 = Object.getOwnPropertyDescriptor(prototype, `src`)?.get;
      if (
        !get2 ||
        !get3 ||
        Reflect.apply(Element.prototype.getAttribute, editorMediaCurrentSrc, [
          `srcset`,
        ]) !== null
      )
        return false;
      let apply: Dynamic = Reflect.apply(get2, editorMediaCurrentSrc, []);
      return (
        apply === editorMediaWeakMap4Entry ||
        (apply === `` &&
          Reflect.apply(get3, editorMediaCurrentSrc, []) ===
            editorMediaWeakMap4Entry)
      );
    } catch {
      return false;
    }
  });
  (EditorMediaMessage2 = `This image isn't available any more`);
  (EditorMediaMessage3 = `This video isn't available any more`);
}

export {
  EditorMediaDataLfileMediaFluid,
  EditorMediaDraggable,
  EditorMediaGroup,
  EditorMediaMaster16,
  EditorMediaMessage2,
  EditorMediaMessage3,
  EditorMediaOpReminted,
  EditorMediaOpSnapshot,
  TableBlockDropGuardExtension,
  editorMediaWeakMap2,
  editorMediaWeakMap3,
  editorMediaWeakMap4,
  isEditorMediaAppendedTransaction,
  isEditorMediaArrowLeft,
  isEditorMediaBottom,
  isEditorMediaClosest,
  isEditorMediaCurrentSrc,
  isEditorMediaDrag,
  isEditorMediaEvery,
  isEditorMediaLeft,
  isEditorMediaRight,
  isEditorMediaValue,
  resolveEditorMediaAddAttributes,
  resolveEditorMediaAppendedTransaction2,
  resolveEditorMediaDecode,
  resolveEditorMediaIsFinite3,
  resolveEditorMediaLfilePmMediaCropped,
  resolveEditorMediaOpRemote,
  resolveEditorMediaSafeParse,
  resolveEditorMediaScope,
  resolveEditorMediaTest,
  resolveEditorMediaTest2,
  resolveEditorMediaValue,
  resolveEditorMediaValue2,
  resolveEditorMediaValue3,
  resolveEditorMediaValue4,
  resolveEditorMediaWidth,
};

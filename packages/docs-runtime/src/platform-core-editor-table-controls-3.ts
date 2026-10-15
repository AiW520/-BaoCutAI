/** BaoCut: editor table controls from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Decoration,
  DecorationSet,
  Plugin,
  PluginKey,
  TextSelection,
} from "./platform-core-dependencies";
import {
  resolveEditorAnchorsAndMentionsEscape,
  resolveEditorAnchorsAndMentionsValue3,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  EditorSelectionAndTablesLeft,
} from "./platform-core-editor-selection-and-tables-1";
import {
  EditorSelectionAndTablesRowspan,
  TableColumnResizingPluginKey,
} from "./platform-core-editor-selection-and-tables-2";
import {
  EditorTableControlsState3,
  getEditorTableControlsValue,
  getEditorTableControlsValue2,
  getEditorTableControlsValue3,
  isEditorTableControlsHeight,
  isEditorTableControlsHeight2,
  isEditorTableControlsWidth,
  isEditorTableControlsWidth2,
  resolveEditorTableControlsValue8,
  updateEditorTableControlsEditor,
} from "./platform-core-editor-table-controls-2";
import {
  resolveEditorMediaValue,
} from "./platform-core-editor-media-1";

function resolveEditorTableControlsOff(
  editorTableControls?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  editorTableControls.forEach(
    (node?: Dynamic, off?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      items.push({
        off: off,
        node: node,
      }),
  );
  return items;
}

function clearEditorTableControlsHeight(
  clearEditorTableControlsHeight2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(options);
  let total: Dynamic = context + 1;
  let editorTableControlsOff: Dynamic = resolveEditorTableControlsOff(options);
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.height;
    index++
  ) {
    if (editorTableControlsOff[index].node.childCount === 1) continue;
    let mapItem: Dynamic =
      EditorSelectionAndTablesLeftEntry.map[
        index * EditorSelectionAndTablesLeftEntry.width + dependencies
      ];
    let nodeAt: Dynamic = options.nodeAt(mapItem);
    let difference: Dynamic =
      editorTableControlsOff[index].off +
      editorTableControlsOff[index].node.nodeSize -
      1;
    for (
      let argument2: Dynamic = argument;
      argument2 < EditorSelectionAndTablesLeftEntry.width;
      argument2++
    ) {
      let mapItem2: Dynamic =
        EditorSelectionAndTablesLeftEntry.map[
          index * EditorSelectionAndTablesLeftEntry.width + argument2
        ];
      let findCell: Dynamic =
        EditorSelectionAndTablesLeftEntry.findCell(mapItem2);
      if (findCell.top === index && findCell.left === argument2) {
        difference = mapItem2;
        break;
      }
    }
    let mappedMapping: Dynamic = clearEditorTableControlsHeight2.mapping.map(
      total + mapItem,
    );
    clearEditorTableControlsHeight2.delete(
      mappedMapping,
      mappedMapping + nodeAt.nodeSize,
    );
    clearEditorTableControlsHeight2.insert(
      clearEditorTableControlsHeight2.mapping.map(total + difference, -1),
      nodeAt,
    );
  }
  return clearEditorTableControlsHeight2;
}

function clearEditorTableControlsSize(
  clearEditorTableControlsSize2?: Dynamic,
  node?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let total: Dynamic = context + 1;
  let editorTableControlsOff: Dynamic = resolveEditorTableControlsOff(node);
  let editorTableControlsOffItem: Dynamic =
    editorTableControlsOff[dependencies];
  let contentCount: Dynamic =
    argument >= editorTableControlsOff.length
      ? node.content.size
      : editorTableControlsOff[argument].off;
  let mappedMapping: Dynamic = clearEditorTableControlsSize2.mapping.map(
    total + editorTableControlsOffItem.off,
  );
  clearEditorTableControlsSize2.delete(
    mappedMapping,
    mappedMapping + editorTableControlsOffItem.node.nodeSize,
  );
  clearEditorTableControlsSize2.insert(
    clearEditorTableControlsSize2.mapping.map(total + contentCount, -1),
    editorTableControlsOffItem.node,
  );
  return clearEditorTableControlsSize2;
}

var TableReorderPluginKey: Dynamic;

function getEditorTableControlsKind(
  editorTableControlsKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (options) {
    let nodeAt: Dynamic = editorTableControlsKind.doc.nodeAt(options.tablePos);
    if (nodeAt?.type.spec.tableRole === `table`) {
      let EditorSelectionAndTablesLeftEntry: Dynamic =
        EditorSelectionAndTablesLeft.get(nodeAt);
      let { kind: options2, idx: options3 }: Dynamic = options;
      if (
        options3 >= 0 &&
        options3 <
          (options2 === `col`
            ? EditorSelectionAndTablesLeftEntry.width
            : EditorSelectionAndTablesLeftEntry.height)
      ) {
        let uniqueItems: Dynamic = new (Set as Dynamic)();
        let height: Dynamic =
          options2 === `col`
            ? EditorSelectionAndTablesLeftEntry.height
            : EditorSelectionAndTablesLeftEntry.width;
        for (let index = 0; index < height; index++)
          uniqueItems.add(
            EditorSelectionAndTablesLeftEntry.map[
              options2 === `col`
                ? index * EditorSelectionAndTablesLeftEntry.width + options3
                : options3 * EditorSelectionAndTablesLeftEntry.width + index
            ],
          );
        for (let getEditorTableControlsKindResult of uniqueItems as Dynamic) {
          let total: Dynamic =
            options.tablePos + 1 + getEditorTableControlsKindResult;
          let nodeAt2: Dynamic = editorTableControlsKind.doc.nodeAt(total);
          if (nodeAt2) {
            items.push(
              Decoration.node(total, total + nodeAt2.nodeSize, {
                class: options.cls,
              }),
            );
          }
        }
      }
    }
  }
  return DecorationSet.create(editorTableControlsKind.doc, items);
}

function getEditorTableControlsTablePos(
  editorTableControlsTablePos?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(options instanceof Element)) return null;
  let cellDom: Dynamic = options.closest(`td,th`);
  if (!cellDom || !editorTableControlsTablePos.dom.contains(cellDom))
    return null;
  let posAtDOM: Dynamic = editorTableControlsTablePos.posAtDOM(cellDom, 0);
  if (posAtDOM < 0) return null;
  let resolve: Dynamic =
    editorTableControlsTablePos.state.doc.resolve(posAtDOM);
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--) {
    let table: Dynamic = resolve.node(depth);
    if (table.type.spec.tableRole === `table`) {
      let tablePos: Dynamic = resolve.before(depth);
      let map: Dynamic = EditorSelectionAndTablesLeft.get(table);
      let getEditorTableControlsTablePosResult: Dynamic = -1;
      for (let depth2: Dynamic = resolve.depth; depth2 > depth; depth2--) {
        let tableRole: Dynamic = resolve.node(depth2).type.spec.tableRole;
        if (tableRole === `cell` || tableRole === `header_cell`) {
          getEditorTableControlsTablePosResult = resolve.before(depth2);
        }
      }
      if (getEditorTableControlsTablePosResult < 0) return null;
      let findCell: Dynamic = map.findCell(
        getEditorTableControlsTablePosResult - tablePos - 1,
      );
      return {
        tablePos: tablePos,
        table: table,
        map: map,
        col: findCell.left,
        row: findCell.top,
        cellDom: cellDom,
      };
    }
  }
  return null;
}

function isEditorTableControlsTableWrapper(
  editorTableControlsTableWrapper?: Dynamic,
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (event.button !== 0) return false;
  let target: Dynamic = event.target;
  if (
    !target?.classList?.contains(`tableWrapper`) ||
    !editorTableControlsTableWrapper.dom.contains(target) ||
    editorTableControlsTableWrapper.dom.classList.contains(`resize-cursor`)
  )
    return false;
  let TableColumnResizingPluginKeyState: Dynamic =
    TableColumnResizingPluginKey.getState(
      editorTableControlsTableWrapper.state,
    );
  return !(
    TableColumnResizingPluginKeyState &&
    ((TableColumnResizingPluginKeyState.activeHandle ?? -1) > -1 ||
      TableColumnResizingPluginKeyState.dragging)
  );
}

function getEditorTableControlsKey2(
  editor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Plugin as Dynamic)({
    key: TableReorderPluginKey,
    state: {
      init: (..._extraArguments: unknown[]): Dynamic => ({
        cells: null,
        set: DecorationSet.empty,
      }),
      apply(
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        context?: unknown,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let meta: Dynamic = editorTableControlsKey2.getMeta(
          TableReorderPluginKey,
        );
        if (!meta && !editorTableControlsKey2.docChanged) return options;
        let cells: Dynamic = meta
          ? meta.cells
          : editorTableControlsKey2.docChanged
            ? null
            : options.cells;
        return {
          cells: cells,
          set: getEditorTableControlsKind(dependencies, cells),
        };
      },
    },
    props: {
      decorations: (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        TableReorderPluginKey.getState(editorTableControlsKey2)?.set,
      handleDOMEvents: {
        mousedown: (
          editorTableControlsKey2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          isEditorTableControlsTableWrapper(editorTableControlsKey2, options),
      },
    },
    view(view?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let ownerDocument2: Dynamic = view.dom.ownerDocument;
      let updateContentEditable: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let element2: Dynamic = ownerDocument2.createElement(`button`);
        element2.type = `button`;
        element2.tabIndex = -1;
        element2.className = editorTableControlsKey2;
        element2.contentEditable = `false`;
        return element2;
      };
      let updateContentEditable2: Dynamic = updateContentEditable(
        `ldoc-tgrip ldoc-tgrip-col`,
      );
      let updateContentEditable3: Dynamic = updateContentEditable(
        `ldoc-tgrip ldoc-tgrip-row`,
      );
      updateContentEditable2.setAttribute(
        `aria-label`,
        editor ? `Column options` : `Drag to move column`,
      );
      updateContentEditable3.setAttribute(
        `aria-label`,
        editor ? `Row options` : `Drag to move row`,
      );
      if (editor)
        for (let [
          getEditorTableControlsKey2Result2,
          getEditorTableControlsKey2Result3,
        ] of [
          [updateContentEditable2, `column`],
          [updateContentEditable3, `row`],
        ] as Dynamic) {
          getEditorTableControlsKey2Result2.setAttribute(
            `aria-haspopup`,
            `menu`,
          );
          getEditorTableControlsKey2Result2.dataset.tip = `Click for ${getEditorTableControlsKey2Result3} options · drag to move`;
        }
      let updateContentEditable4: Dynamic =
        updateContentEditable(`ldoc-thandle`);
      updateContentEditable4.setAttribute(`aria-label`, `Drag to move table`);
      updateContentEditable4.draggable = true;
      let element: Dynamic = ownerDocument2.createElement(`div`);
      element.className = `ldoc-tdrop`;
      let getEditorTableControlsKey2Result: Dynamic = null;
      let entry: Dynamic = null;
      let dispatch: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        view.dispatch(
          view.state.tr.setMeta(TableReorderPluginKey, editorTableControlsKey2),
        );
      let closest: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => editorTableControlsKey2.closest(`.tableWrapper`);
      let getEditorTableControlsKey2Handler: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        [
          updateContentEditable2,
          updateContentEditable3,
          updateContentEditable4,
        ].some(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item === editorTableControlsKey2 ||
            item.contains(editorTableControlsKey2),
        );
      let remove = (..._extraArguments: unknown[]): undefined => {
        updateContentEditable2.remove();
        updateContentEditable3.remove();
        updateContentEditable4.remove();
        getEditorTableControlsKey2Result = null;
      };
      let getBoundingClientRect: Dynamic = (
        element2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let matchedElement: Dynamic = element2.querySelector(`table`);
        if (!matchedElement) return null;
        let elementBounds: Dynamic = element2.getBoundingClientRect();
        let tRect: Dynamic = matchedElement.getBoundingClientRect();
        let scrollLeft: Dynamic = element2.scrollLeft;
        return {
          x: (
            editorTableControlsKey2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorTableControlsKey2 - elementBounds.left + scrollLeft,
          y: (
            editorTableControlsKey2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => editorTableControlsKey2 - elementBounds.top,
          tRect: tRect,
        };
      };
      let append = (
        editorTableControlsKey2?: Dynamic,
        wrapper?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let elementBounds: Dynamic = getBoundingClientRect(wrapper);
        if (!elementBounds) return;
        let cellDomBounds: Dynamic =
          editorTableControlsKey2.cellDom.getBoundingClientRect();
        updateContentEditable4.style.left = `${elementBounds.x(elementBounds.tRect.left) - 44}px`;
        updateContentEditable4.style.top = `${elementBounds.y(elementBounds.tRect.top)}px`;
        updateContentEditable2.style.left = `${elementBounds.x(cellDomBounds.left) + cellDomBounds.width / 2 - 12}px`;
        updateContentEditable2.style.top = `${elementBounds.y(elementBounds.tRect.top) - 7}px`;
        updateContentEditable3.style.left = `${elementBounds.x(elementBounds.tRect.left) - 7}px`;
        updateContentEditable3.style.top = `${elementBounds.y(cellDomBounds.top) + cellDomBounds.height / 2 - 12}px`;
        wrapper.append(
          updateContentEditable4,
          updateContentEditable2,
          updateContentEditable3,
        );
        getEditorTableControlsKey2Result = {
          tablePos: editorTableControlsKey2.tablePos,
          col: editorTableControlsKey2.col,
          row: editorTableControlsKey2.row,
          wrapper: wrapper,
          cellDom: editorTableControlsKey2.cellDom,
        };
      };
      let getEditorTableControlsValue22 = (..._extraArguments: unknown[]) =>
        getEditorTableControlsValue2(view) !== null;
      let closest2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (entry || getEditorTableControlsValue22() || !view.editable) return;
        let target: Dynamic = event.target;
        if (
          (target && getEditorTableControlsKey2Handler(target)) ||
          (getEditorTableControlsKey2Result &&
            target instanceof Element &&
            target.closest(`td,th`) ===
              getEditorTableControlsKey2Result.cellDom)
        )
          return;
        let editorTableControlsTablePos: Dynamic =
          getEditorTableControlsTablePos(view, target);
        if (!editorTableControlsTablePos) {
          if (
            !(target instanceof Element) ||
            !closest(target) ||
            closest(target) !== getEditorTableControlsKey2Result?.wrapper
          ) {
            remove();
          }
          return;
        }
        let closest3: Dynamic = closest(editorTableControlsTablePos.cellDom);
        if (closest3) {
          if (
            !(
              getEditorTableControlsKey2Result &&
              getEditorTableControlsKey2Result.tablePos ===
                editorTableControlsTablePos.tablePos &&
              getEditorTableControlsKey2Result.col ===
                editorTableControlsTablePos.col &&
              getEditorTableControlsKey2Result.row ===
                editorTableControlsTablePos.row &&
              getEditorTableControlsKey2Result.wrapper === closest3
            )
          ) {
            append(editorTableControlsTablePos, closest3);
          }
        }
      };
      let remove2 = (..._extraArguments: unknown[]): undefined => {
        if (!entry && !getEditorTableControlsValue22()) {
          remove();
        }
      };
      let contains2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          !(
            !(event.button === 2 || (event.button === 0 && event.ctrlKey)) ||
            !view.editable
          )
        ) {
          if (
            view.state.selection instanceof
              (EditorSelectionAndTablesRowspan as Dynamic) &&
            event.target?.closest?.(`td,th`)?.classList.contains(`selectedCell`)
          ) {
            event.preventDefault();
          }
        }
      };
      let getEditorTableControlsKey2Handler2: Dynamic =
        (
          kind?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (event.button !== 0 || !view.editable) return;
          let options2: Dynamic = options();
          if (!options2) return;
          event.preventDefault();
          event.stopPropagation();
          let gripEl: Dynamic = event.currentTarget;
          entry = {
            kind: kind,
            idx: options2.idx,
            tablePos: options2.tablePos,
            wrapper: options2.wrapper,
            cellDom: options2.cellDom,
            gripEl: gripEl,
            x: event.clientX,
            y: event.clientY,
            moved: false,
            boundary: null,
            lastX: event.clientX,
            lastY: event.clientY,
            bounds: [],
            tableEl: null,
            tableRect: new (DOMRect as Dynamic)(),
            wrapLeft: 0,
            wrapTop: 0,
            scrollLeft: 0,
            pressLeft: gripEl.style.left,
            pressTop: gripEl.style.top,
          };
          ownerDocument2.addEventListener(`pointermove`, hypot);
          ownerDocument2.addEventListener(`pointerup`, dispatch2);
          ownerDocument2.addEventListener(`pointercancel`, helloYImport2);
          ownerDocument2.addEventListener(`keydown`, helloYImport3, true);
          ownerDocument2.addEventListener(`scroll`, append2, true);
        };
      let helloYImport2: Dynamic = (..._extraArguments: unknown[]) => remove5();
      let helloYImport3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(!resolveEditorAnchorsAndMentionsEscape(event) || !entry)) {
          event.preventDefault();
          event.stopPropagation();
          resolveEditorAnchorsAndMentionsValue3(event);
          remove5();
        }
      };
      let getBoundingClientRect2: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let EditorSelectionAndTablesLeftEntry: Dynamic =
          EditorSelectionAndTablesLeft.get(options);
        let width: Dynamic =
          editorTableControlsKey2 === `col`
            ? EditorSelectionAndTablesLeftEntry.width
            : EditorSelectionAndTablesLeftEntry.height;
        let items: Dynamic = [];
        for (let index = 0; index <= width; index++) {
          if (
            !(editorTableControlsKey2 === `col`
              ? isEditorTableControlsWidth2(options, index)
              : isEditorTableControlsHeight2(options, index))
          ) {
            items.push(null);
            continue;
          }
          if (index === width) {
            items.push(
              editorTableControlsKey2 === `col`
                ? entry.tableRect.right
                : entry.tableRect.bottom,
            );
            continue;
          }
          let getEditorTableControlsKey2Result2: Dynamic = -1;
          let height: Dynamic =
            editorTableControlsKey2 === `col`
              ? EditorSelectionAndTablesLeftEntry.height
              : EditorSelectionAndTablesLeftEntry.width;
          for (let index2 = 0; index2 < height; index2++) {
            let mapItem: Dynamic =
              EditorSelectionAndTablesLeftEntry.map[
                editorTableControlsKey2 === `col`
                  ? index2 * EditorSelectionAndTablesLeftEntry.width + index
                  : index * EditorSelectionAndTablesLeftEntry.width + index2
              ];
            let findCell: Dynamic =
              EditorSelectionAndTablesLeftEntry.findCell(mapItem);
            if (
              (editorTableControlsKey2 === `col`
                ? findCell.left
                : findCell.top) === index
            ) {
              getEditorTableControlsKey2Result2 = context + 1 + mapItem;
              break;
            }
          }
          if (getEditorTableControlsKey2Result2 < 0) {
            items.push(null);
            continue;
          }
          let nodeDOM: Dynamic = view.nodeDOM(
            getEditorTableControlsKey2Result2,
          );
          items.push(
            nodeDOM instanceof HTMLElement
              ? editorTableControlsKey2 === `col`
                ? nodeDOM.getBoundingClientRect().left
                : nodeDOM.getBoundingClientRect().top
              : null,
          );
        }
        return items;
      };
      let remove3: Dynamic = (..._extraArguments: unknown[]) => {
        if (!entry) return;
        let nodeAt: Dynamic = view.state.doc.nodeAt(entry.tablePos);
        if (
          !nodeAt ||
          !(entry.kind === `col`
            ? isEditorTableControlsHeight(nodeAt, entry.idx)
            : isEditorTableControlsWidth(nodeAt, entry.idx))
        )
          return remove5();
        getEditorTableControlsValue3(view);
        entry.moved = true;
        let matchedElement: Dynamic = entry.wrapper.querySelector(`table`);
        if (!matchedElement) return remove5();
        entry.tableEl = matchedElement;
        entry.tableRect = matchedElement.getBoundingClientRect();
        let wrapperBounds: Dynamic = entry.wrapper.getBoundingClientRect();
        entry.wrapLeft = wrapperBounds.left;
        entry.wrapTop = wrapperBounds.top;
        entry.scrollLeft = entry.wrapper.scrollLeft;
        entry.bounds = getBoundingClientRect2(
          entry.kind,
          nodeAt,
          entry.tablePos,
        );
        let setMeta: Dynamic = view.state.tr.setMeta(TableReorderPluginKey, {
          cells: {
            tablePos: entry.tablePos,
            kind: entry.kind,
            idx: entry.idx,
            cls: `ldoc-tdim`,
          },
        });
        let selection: Dynamic = view.state.selection;
        if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
          setMeta.setSelection(TextSelection.near(selection.$anchorCell));
        }
        view.dispatch(setMeta);
        let updateContentEditable5: Dynamic =
          entry.kind === `col`
            ? updateContentEditable2
            : updateContentEditable3;
        updateContentEditable5.style.left = entry.pressLeft;
        updateContentEditable5.style.top = entry.pressTop;
        updateContentEditable5.classList.add(`ldoc-tgrip-drag`);
        entry.wrapper.append(updateContentEditable5);
        ownerDocument2.body.style.cursor = `grabbing`;
        remove4(entry.kind);
        updateContentEditable4.remove();
      };
      let remove4: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        (editorTableControlsKey2 === `col`
          ? updateContentEditable3
          : updateContentEditable2
        ).remove();
      let remove5 = (..._extraArguments: unknown[]): undefined => {
        updateContentEditable2.classList.remove(`ldoc-tgrip-drag`);
        updateContentEditable3.classList.remove(`ldoc-tgrip-drag`);
        ownerDocument2.removeEventListener(`pointermove`, hypot);
        ownerDocument2.removeEventListener(`pointerup`, dispatch2);
        ownerDocument2.removeEventListener(`pointercancel`, helloYImport2);
        ownerDocument2.removeEventListener(`keydown`, helloYImport3, true);
        ownerDocument2.removeEventListener(`scroll`, append2, true);
        ownerDocument2.body.style.cursor = ``;
        element.remove();
        let moved: Dynamic = entry?.moved;
        if (moved) {
          dispatch({
            cells: null,
          });
        }
        entry = null;
        if (moved) {
          remove();
        }
      };
      let hypot: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (entry) {
          if (!(editorTableControlsKey2.buttons & 1)) return helloYImport2();
          if (
            !(
              !entry.moved &&
              (Math.hypot(
                editorTableControlsKey2.clientX - entry.x,
                editorTableControlsKey2.clientY - entry.y,
              ) <= 5 ||
                (remove3(), !entry || !entry.moved))
            )
          ) {
            entry.lastX = editorTableControlsKey2.clientX;
            entry.lastY = editorTableControlsKey2.clientY;
            append2();
          }
        }
      };
      let append2 = (..._extraArguments: unknown[]): undefined => {
        if (!entry?.moved) return;
        let tableElBounds: Dynamic = entry.tableEl?.isConnected
          ? entry.tableEl.getBoundingClientRect()
          : entry.tableRect;
        let difference =
          entry.kind === `col`
            ? entry.lastX - (tableElBounds.left - entry.tableRect.left)
            : entry.lastY - (tableElBounds.top - entry.tableRect.top);
        let getEditorTableControlsKey2Result2: Dynamic = null;
        let amount = 1 / 0;
        entry.bounds.forEach(
          (
            bound?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (bound == null) return;
            let abs = Math.abs(difference - bound);
            if (abs < amount) {
              amount = abs;
              getEditorTableControlsKey2Result2 = index;
            }
          },
        );
        if (
          getEditorTableControlsKey2Result2 === entry.boundary &&
          (getEditorTableControlsKey2Result2 == null || element.isConnected)
        )
          return;
        entry.boundary = getEditorTableControlsKey2Result2;
        if (getEditorTableControlsKey2Result2 == null) {
          element.remove();
          return;
        }
        let record2: Dynamic = {
          left: entry.wrapLeft,
          top: entry.wrapTop,
        };
        let scrollLeft: Dynamic = entry.scrollLeft;
        let tableRect: Dynamic = entry.tableRect;
        let boundItem: Dynamic =
          entry.bounds[getEditorTableControlsKey2Result2];
        if (entry.kind === `col`) {
          element.style.left = `${boundItem - record2.left + scrollLeft - 2}px`;
          element.style.top = `${tableRect.top - record2.top}px`;
          element.style.width = `4px`;
          element.style.height = `${tableRect.height}px`;
        } else {
          element.style.left = `${tableRect.left - record2.left + scrollLeft}px`;
          element.style.top = `${boundItem - record2.top - 2}px`;
          element.style.width = `${tableRect.width}px`;
          element.style.height = `4px`;
        }
        entry.wrapper.append(element);
      };
      let dispatch2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
        if (!entry) return;
        let entry2: Dynamic = entry;
        remove5();
        if (!entry2.moved) {
          if (getEditorTableControlsValue2(view) === entry2.gripEl)
            return getEditorTableControlsValue3(view);
          let nodeAt2: Dynamic = view.state.doc.nodeAt(entry2.tablePos);
          if (!nodeAt2 || nodeAt2.type.spec.tableRole !== `table`) return;
          let EditorSelectionAndTablesLeftEntry: Dynamic =
            EditorSelectionAndTablesLeft.get(nodeAt2);
          let mapItem: Dynamic =
            entry2.kind === `col`
              ? EditorSelectionAndTablesLeftEntry.map[entry2.idx]
              : EditorSelectionAndTablesLeftEntry.map[
                  entry2.idx * EditorSelectionAndTablesLeftEntry.width
                ];
          let resolve: Dynamic = view.state.doc.resolve(
            entry2.tablePos + 1 + mapItem,
          );
          let colSelection: Dynamic =
            entry2.kind === `col`
              ? EditorSelectionAndTablesRowspan.colSelection(resolve)
              : EditorSelectionAndTablesRowspan.rowSelection(resolve);
          view.dispatch(view.state.tr.setSelection(colSelection));
          view.focus();
          if (editor) {
            updateEditorTableControlsEditor({
              editor: editor,
              view: view,
              kind: entry2.kind,
              anchor: entry2.gripEl,
              cellEl: entry2.cellDom,
              onClose: (..._extraArguments: unknown[]): undefined => {
                if (!view.dom.matches(`:hover`)) {
                  remove();
                }
              },
            });
          }
          return;
        }
        dispatch({
          cells: null,
        });
        if (
          entry2.boundary == null ||
          resolveEditorTableControlsValue8(entry2.idx, entry2.boundary)
        )
          return;
        let nodeAt: Dynamic = view.state.doc.nodeAt(entry2.tablePos);
        if (
          !nodeAt ||
          nodeAt.type.spec.tableRole !== `table` ||
          !(entry2.kind === `col`
            ? isEditorTableControlsHeight(nodeAt, entry2.idx) &&
              isEditorTableControlsWidth2(nodeAt, entry2.boundary)
            : isEditorTableControlsWidth(nodeAt, entry2.idx) &&
              isEditorTableControlsHeight2(nodeAt, entry2.boundary)) ||
          (entry2.kind === `row` &&
            EditorTableControlsState3?.(view.state, entry2.tablePos) &&
            getEditorTableControlsValue(
              view,
              `unsupported`,
              `structure:unnamed`,
            ))
        )
          return;
        let tr2: Dynamic = view.state.tr;
        if (entry2.kind === `col`) {
          clearEditorTableControlsHeight(
            tr2,
            nodeAt,
            entry2.tablePos,
            entry2.idx,
            entry2.boundary,
          );
        } else {
          clearEditorTableControlsSize(
            tr2,
            nodeAt,
            entry2.tablePos,
            entry2.idx,
            entry2.boundary,
          );
        }
        view.dispatch(tr2);
      };
      let getEditorTableControlsKey2Handler3: Dynamic =
        (kind?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (..._extraArguments: unknown[]): undefined => {
          if (!(!getEditorTableControlsKey2Result || entry)) {
            dispatch({
              cells: {
                tablePos: getEditorTableControlsKey2Result.tablePos,
                kind: kind,
                idx:
                  kind === `col`
                    ? getEditorTableControlsKey2Result.col
                    : getEditorTableControlsKey2Result.row,
                cls: kind === `col` ? `ldoc-ttint-col` : `ldoc-ttint-row`,
              },
            });
          }
        };
      let dispatch3 = (..._extraArguments: unknown[]): undefined => {
        if (!entry) {
          dispatch({
            cells: null,
          });
        }
      };
      let contains3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.target?.classList?.contains(`tableWrapper`)) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      updateContentEditable4.addEventListener(
        `pointerdown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (event.button === 0) {
            event.stopPropagation();
          }
        },
      );
      updateContentEditable4.addEventListener(
        `mousedown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (event.button !== 0) return;
          event.stopPropagation();
          let selection: Dynamic = view.state.selection;
          if (
            selection instanceof (EditorSelectionAndTablesRowspan as Dynamic) &&
            getEditorTableControlsKey2Result
          ) {
            let nodeAt: Dynamic = view.state.doc.nodeAt(
              getEditorTableControlsKey2Result.tablePos,
            );
            if (
              nodeAt &&
              selection.$anchorCell.pos >
                getEditorTableControlsKey2Result.tablePos &&
              selection.$anchorCell.pos <
                getEditorTableControlsKey2Result.tablePos + nodeAt.nodeSize
            ) {
              view.dispatch(
                view.state.tr.setSelection(
                  TextSelection.near(selection.$anchorCell),
                ),
              );
            }
          }
        },
      );
      updateContentEditable4.addEventListener(
        `dragstart`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let matchedElement: Dynamic =
            getEditorTableControlsKey2Result?.wrapper.querySelector(`table`);
          if (matchedElement && event.dataTransfer) {
            event.dataTransfer.setDragImage(matchedElement, 24, 24);
          }
          updateContentEditable4.classList.add(`ldoc-tgrip-drag`);
          resolveEditorMediaValue(true);
        },
      );
      updateContentEditable4.addEventListener(
        `dragend`,
        (..._extraArguments: unknown[]): undefined => {
          updateContentEditable4.classList.remove(`ldoc-tgrip-drag`);
          resolveEditorMediaValue(false);
          remove();
        },
      );
      updateContentEditable4.addEventListener(
        `click`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          event.stopPropagation();
          if (!getEditorTableControlsKey2Result || !view.editable) return;
          let nodeAt: Dynamic = view.state.doc.nodeAt(
            getEditorTableControlsKey2Result.tablePos,
          );
          if (!nodeAt) return;
          let EditorSelectionAndTablesLeftEntry: Dynamic =
            EditorSelectionAndTablesLeft.get(nodeAt);
          let resolve: Dynamic = view.state.doc.resolve(
            getEditorTableControlsKey2Result.tablePos +
              1 +
              EditorSelectionAndTablesLeftEntry.map[0],
          );
          let resolve2: Dynamic = view.state.doc.resolve(
            getEditorTableControlsKey2Result.tablePos +
              1 +
              EditorSelectionAndTablesLeftEntry.map[
                EditorSelectionAndTablesLeftEntry.width *
                  EditorSelectionAndTablesLeftEntry.height -
                  1
              ],
          );
          view.dispatch(
            view.state.tr.setSelection(
              new (EditorSelectionAndTablesRowspan as Dynamic)(
                resolve,
                resolve2,
              ),
            ),
          );
          view.focus();
        },
      );
      updateContentEditable2.addEventListener(
        `pointerdown`,
        getEditorTableControlsKey2Handler2(
          `col`,
          (..._extraArguments: unknown[]): Dynamic =>
            getEditorTableControlsKey2Result
              ? {
                  tablePos: getEditorTableControlsKey2Result.tablePos,
                  idx: getEditorTableControlsKey2Result.col,
                  wrapper: getEditorTableControlsKey2Result.wrapper,
                  cellDom: getEditorTableControlsKey2Result.cellDom,
                }
              : null,
        ),
      );
      updateContentEditable3.addEventListener(
        `pointerdown`,
        getEditorTableControlsKey2Handler2(
          `row`,
          (..._extraArguments: unknown[]): Dynamic =>
            getEditorTableControlsKey2Result
              ? {
                  tablePos: getEditorTableControlsKey2Result.tablePos,
                  idx: getEditorTableControlsKey2Result.row,
                  wrapper: getEditorTableControlsKey2Result.wrapper,
                  cellDom: getEditorTableControlsKey2Result.cellDom,
                }
              : null,
        ),
      );
      updateContentEditable2.addEventListener(
        `pointerenter`,
        getEditorTableControlsKey2Handler3(`col`),
      );
      updateContentEditable3.addEventListener(
        `pointerenter`,
        getEditorTableControlsKey2Handler3(`row`),
      );
      updateContentEditable2.addEventListener(`pointerleave`, dispatch3);
      updateContentEditable3.addEventListener(`pointerleave`, dispatch3);
      view.dom.addEventListener(`mousemove`, closest2);
      view.dom.addEventListener(`mouseleave`, remove2);
      view.dom.addEventListener(`mousedown`, contains2, true);
      view.dom.addEventListener(`dragstart`, contains3, true);
      return {
        update(
          editorTableControlsKey2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          if (!editorTableControlsKey2.editable) {
            if (
              getEditorTableControlsValue22() ||
              getEditorTableControlsKey2Result
            ) {
              getEditorTableControlsValue3(editorTableControlsKey2);
              remove();
            }
            return;
          }
          if (
            options.doc !== editorTableControlsKey2.state.doc &&
            getEditorTableControlsKey2Result &&
            !entry
          ) {
            let editorTableControlsTablePos: Dynamic =
              getEditorTableControlsKey2Result.cellDom.isConnected
                ? getEditorTableControlsTablePos(
                    editorTableControlsKey2,
                    getEditorTableControlsKey2Result.cellDom,
                  )
                : null;
            let closest3: Dynamic = editorTableControlsTablePos
              ? closest(editorTableControlsTablePos.cellDom)
              : null;
            if (editorTableControlsTablePos && closest3) {
              append(editorTableControlsTablePos, closest3);
            } else {
              if (!getEditorTableControlsValue22()) {
                remove();
              }
            }
          }
        },
        destroy(..._extraArguments: unknown[]): undefined {
          getEditorTableControlsValue3(view);
          view.dom.removeEventListener(`mousemove`, closest2);
          view.dom.removeEventListener(`mouseleave`, remove2);
          view.dom.removeEventListener(`mousedown`, contains2, true);
          view.dom.removeEventListener(`dragstart`, contains3, true);
          ownerDocument2.removeEventListener(`pointermove`, hypot);
          ownerDocument2.removeEventListener(`pointerup`, dispatch2);
          ownerDocument2.removeEventListener(`pointercancel`, helloYImport2);
          ownerDocument2.removeEventListener(`keydown`, helloYImport3, true);
          ownerDocument2.removeEventListener(`scroll`, append2, true);
          ownerDocument2.body.style.cursor = ``;
          updateContentEditable2.remove();
          updateContentEditable3.remove();
          updateContentEditable4.remove();
          element.remove();
        },
      };
    },
  });
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorTableControls3Step1(): void {
  (TableReorderPluginKey = new (PluginKey as Dynamic)(`tableReorder`));
}

export {
  getEditorTableControlsKey2,
};

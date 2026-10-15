/** BaoCut: editor table controls from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Extension,
  Fragment,
  Node2,
  Plugin,
  PluginKey,
  Selection,
  TextSelection,
  callOrReturn,
  closeHistory,
  getExtensionField,
  mergeAttributes,
} from "../../platform/dependencies";
import {
  editorExtensionsValue4000,
} from "./extensions-2";
import {
  resolveEditorAnchorsAndMentionsEscape,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsValue3,
} from "./anchors-and-mentions-1";
import {
  resolvePlatformKeyboardAndSaveStatusNavigator,
} from "../../platform/services/keyboard-and-save-status";
import {
  resolvePlatformAnnouncementsValue,
} from "../../platform/services/announcements";
import {
  resolveEditorHostDocumentElement2,
} from "./host-1";
import {
  resolveDataOperationControlDetail,
} from "../../platform/data/operation-control-5";
import {
  EditorSelectionAndTablesLeft,
  resolveEditorSelectionAndTablesDepth,
} from "./selection-and-tables-1";
import {
  EditorSelectionAndTablesRowspan,
  EditorSelectionAndTablesUseDeprecatedLogic,
  TableColumnResizingPluginKey,
  getEditorSelectionAndTablesTableStart,
  isEditorSelectionAndTablesAttrs,
  isEditorSelectionAndTablesBottom,
  isEditorSelectionAndTablesLeft,
  isEditorSelectionAndTablesMap,
  isEditorSelectionAndTablesNoTableFound,
  isEditorSelectionAndTablesNoTableFound2,
  isEditorSelectionAndTablesResolve,
  isEditorSelectionAndTablesRight,
  isEditorSelectionAndTablesTable,
  isEditorSelectionAndTablesUseDeprecatedLogic,
  isEditorSelectionAndTablesValue,
  resolveEditorSelectionAndTablesNode2,
  resolveEditorSelectionAndTablesTable,
} from "./selection-and-tables-2";
import {
  EditorSelectionAndTablesMaster16,
  resolveEditorSelectionAndTablesAllowTableNodeSelection,
  resolveEditorSelectionAndTablesHandleWidth,
} from "./selection-and-tables-3";
import {
  EditorTableControlsState,
  EditorTableControlsTableWrapper,
  TableCellNode,
  TableHeaderNode,
  TableRowNode,
  isEditorTableControlsEditor,
  resolveEditorTableControlsCell3,
  resolveEditorTableControlsColspan2,
  resolveEditorTableControlsLeft,
} from "./table-controls-1";

var TableNode: Dynamic;

var TableAppendPluginKey: Dynamic;

function resolveEditorTableControlsTable2(
  editorTableControlsTable2?: Dynamic,
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchedElement: Dynamic = element.querySelector(`table`);
  if (
    !matchedElement ||
    !editorTableControlsTable2.dom.contains(matchedElement)
  )
    return null;
  let matchedElement2: Dynamic =
    matchedElement.querySelector(`td,th`) ?? matchedElement;
  let resolveEditorTableControlsTable2Result: Dynamic;
  try {
    resolveEditorTableControlsTable2Result = editorTableControlsTable2.posAtDOM(
      matchedElement2,
      0,
    );
  } catch {
    return null;
  }
  if (resolveEditorTableControlsTable2Result < 0) return null;
  let resolve: Dynamic = editorTableControlsTable2.state.doc.resolve(
    Math.min(
      resolveEditorTableControlsTable2Result,
      editorTableControlsTable2.state.doc.content.size,
    ),
  );
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--) {
    let table: Dynamic = resolve.node(depth);
    if (table.type.spec.tableRole === `table`)
      return {
        table: table,
        tablePos: resolve.before(depth),
      };
  }
  return null;
}

function getEditorTableControlsRect(
  node?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options < 0 || options > node.content.size) return null;
  let editorSelectionAndTablesDepth: Dynamic =
    resolveEditorSelectionAndTablesDepth(node.resolve(options));
  if (
    !editorSelectionAndTablesDepth ||
    (context !== undefined &&
      editorSelectionAndTablesDepth.start(-1) - 1 !== context)
  )
    return null;
  try {
    let map: Dynamic = EditorSelectionAndTablesLeft.get(
      editorSelectionAndTablesDepth.node(-1),
    );
    return {
      rect: map.findCell(
        editorSelectionAndTablesDepth.pos -
          editorSelectionAndTablesDepth.start(-1),
      ),
      cellPos: editorSelectionAndTablesDepth.pos,
      map: map,
    };
  } catch {
    return null;
  }
}

function resolveEditorTableControlsLastRow(
  editorTableControlsLastRow?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveEditorTableControlsLastRowResult: Dynamic;
  try {
    resolveEditorTableControlsLastRowResult =
      editorTableControlsLastRow.posAtDOM(options, 0);
  } catch {
    return null;
  }
  let editorTableControlsRect: Dynamic = getEditorTableControlsRect(
    editorTableControlsLastRow.state.doc,
    resolveEditorTableControlsLastRowResult,
  );
  return editorTableControlsRect
    ? {
        lastRow:
          editorTableControlsRect.rect.bottom ===
          editorTableControlsRect.map.height,
        lastCol:
          editorTableControlsRect.rect.right ===
          editorTableControlsRect.map.width,
      }
    : null;
}

function getEditorTableControlsWidth(
  editorTableControlsWidth?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorTableControlsWidth);
  if (
    !EditorSelectionAndTablesLeftEntry.width ||
    !EditorSelectionAndTablesLeftEntry.height
  )
    return -1;
  let isFinite2: Dynamic = (
    editorTableControlsWidth2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.max(
      0,
      Math.min(
        Number.isFinite(editorTableControlsWidth2)
          ? editorTableControlsWidth2
          : 0,
        options2 - 1,
      ),
    );
  let difference: Dynamic =
    context === `row`
      ? EditorSelectionAndTablesLeftEntry.height - 1
      : isFinite2(dependencies, EditorSelectionAndTablesLeftEntry.height);
  let difference2: Dynamic =
    context === `col`
      ? EditorSelectionAndTablesLeftEntry.width - 1
      : isFinite2(dependencies, EditorSelectionAndTablesLeftEntry.width);
  return (
    options +
    1 +
    EditorSelectionAndTablesLeftEntry.map[
      difference * EditorSelectionAndTablesLeftEntry.width + difference2
    ] +
    1
  );
}

function isEditorTableControlsTablePos(
  editorTableControlsTablePos?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let view: Dynamic = editorTableControlsTablePos.view;
  if (!view.editable) return false;
  let editorTableControlsTable2: Dynamic = resolveEditorTableControlsTable2(
    view,
    options,
  );
  if (!editorTableControlsTable2) return false;
  let { tablePos: editorTableControlsTable22 }: Dynamic =
    editorTableControlsTable2;
  let editorTableControlsWidth: Dynamic = getEditorTableControlsWidth(
    editorTableControlsTable2.table,
    editorTableControlsTable22,
    context,
    dependencies,
  );
  if (editorTableControlsWidth < 0) return false;
  let near: Dynamic = (
    editorTableControlsTablePos2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Selection.near(editorTableControlsTablePos2.resolve(options2), 1);
  let setTextSelection: Dynamic = editorTableControlsTablePos
    .chain()
    .command(
      ({ tr: tr2 }: Dynamic, ..._extraArguments: unknown[]) => (
        closeHistory(tr2),
        true
      ),
    )
    .focus()
    .setTextSelection(near(view.state.doc, editorTableControlsWidth).from);
  return (
    context === `row`
      ? setTextSelection.addRowAfter()
      : setTextSelection.addColumnAfter()
  )
    .command(({ tr: tr2 }: Dynamic, ..._extraArguments: unknown[]) => {
      let nodeAt: Dynamic = tr2.doc.nodeAt(editorTableControlsTable22);
      let editorTableControlsWidth2: Dynamic =
        nodeAt?.type.spec.tableRole === `table`
          ? getEditorTableControlsWidth(
              nodeAt,
              editorTableControlsTable22,
              context,
              dependencies,
            )
          : -1;
      if (editorTableControlsWidth2 >= 0) {
        tr2.setSelection(near(tr2.doc, editorTableControlsWidth2));
      }
      return true;
    })
    .scrollIntoView()
    .run();
}

function resolveEditorTableControlsRight(
  editorTableControlsRight?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let difference: number =
    editorTableControlsRight.right - editorTableControlsRight.left;
  if (difference <= 1 || !options || options.width <= 0)
    return editorTableControlsRight.left;
  let floor = Math.floor(
    ((context - options.left) / options.width) * difference,
  );
  return (
    editorTableControlsRight.left + Math.max(0, Math.min(difference - 1, floor))
  );
}

function isEditorTableControlsKey2(
  editorTableControlsKey2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Plugin as Dynamic)({
    key: TableAppendPluginKey,
    view(
      editorTableControlsKey22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let ownerDocument2: Dynamic = editorTableControlsKey22.dom.ownerDocument;
      let defaultView: Dynamic = ownerDocument2.defaultView;
      let append: Dynamic = (
        editorTableControlsKey23?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let element2: Dynamic = ownerDocument2.createElement(`button`);
        element2.type = `button`;
        element2.tabIndex = -1;
        element2.className = `ldoc-tadd ldoc-tadd-${editorTableControlsKey23}`;
        element2.contentEditable = `false`;
        element2.setAttribute(`aria-label`, options);
        element2.dataset.tip = options;
        element2.append(
          resolveEditorAnchorsAndMentionsGrid2(
            ownerDocument2,
            EditorSelectionAndTablesMaster16,
            12,
          ),
        );
        return element2;
      };
      let append2: Dynamic = append(`row`, `Add row`);
      let append3: Dynamic = append(`col`, `Add column`);
      let element: Dynamic = null;
      let enabled: boolean = false;
      let enabled2: boolean = false;
      let isEditorTableControlsKey2Result: Dynamic = null;
      let resizeObserver: Dynamic = defaultView.ResizeObserver
        ? new (defaultView.ResizeObserver as Dynamic)(
            (..._extraArguments: unknown[]): Dynamic =>
              requestAnimationFrame2(),
          )
        : null;
      let count: number = 0;
      let isEditorTableControlsKey2Result2 = -1;
      let getState = (..._extraArguments: unknown[]) =>
        !!TableColumnResizingPluginKey.getState(editorTableControlsKey22.state)
          ?.dragging;
      let remove = (..._extraArguments: unknown[]): undefined => {
        if (element) {
          element.removeEventListener(`scroll`, remove2);
        }
        resizeObserver?.disconnect();
        if (count) {
          defaultView.cancelAnimationFrame(count);
        }
        count = 0;
        append2.remove();
        append3.remove();
        element = null;
        enabled = enabled2 = false;
        isEditorTableControlsKey2Result2 = -1;
      };
      let append4: Dynamic = (..._extraArguments: unknown[]) => {
        if (count) {
          defaultView.cancelAnimationFrame(count);
        }
        count = 0;
        if (!element) return;
        let matchedElement: Dynamic = element.querySelector(`table`);
        if (!matchedElement || !element.isConnected) return remove();
        if (enabled) {
          let offsetLeft: Dynamic = matchedElement.offsetLeft;
          let offsetWidth: Dynamic = matchedElement.offsetWidth;
          append2.style.left = `${offsetLeft}px`;
          append2.style.width = `${offsetWidth}px`;
          let max = Math.max(offsetLeft, element.scrollLeft);
          let min = Math.min(
            offsetLeft + offsetWidth,
            element.scrollLeft + element.clientWidth,
          );
          append2.style.paddingLeft = `${Math.max(0, max - offsetLeft)}px`;
          append2.style.paddingRight = `${Math.max(0, offsetLeft + offsetWidth - Math.max(max, min))}px`;
          if (append2.parentNode !== element) {
            element.append(append2);
          }
        } else append2.remove();
        let matchedElementBounds: Dynamic =
          matchedElement.getBoundingClientRect();
        let elementBounds: Dynamic = element.getBoundingClientRect();
        let matchesWidth =
          matchedElementBounds.width > 0 &&
          matchedElementBounds.right <= elementBounds.right + 0.5 &&
          matchedElementBounds.right >= elementBounds.left;
        if (!enabled2 || !matchesWidth) return void append3.remove();
        append3.style.left = `${matchedElementBounds.right + defaultView.scrollX}px`;
        append3.style.top = `${matchedElementBounds.top + defaultView.scrollY}px`;
        append3.style.height = `${matchedElementBounds.height}px`;
        if (!append3.isConnected) {
          ownerDocument2.body.append(append3);
        }
      };
      let requestAnimationFrame2: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (!(!element || count)) {
          if (typeof defaultView.requestAnimationFrame != `function`)
            return append4();
          count = defaultView.requestAnimationFrame(append4);
        }
      };
      let remove2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
        if (
          element &&
          Math.abs(element.scrollLeft - isEditorTableControlsKey2Result2) < 1
        ) {
          isEditorTableControlsKey2Result2 = -1;
          return append4();
        }
        remove();
      };
      let observe = (
        element2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        remove();
        element = element2;
        element2.addEventListener(`scroll`, remove2, {
          passive: true,
        });
        let matchedElement: Dynamic = element2.querySelector(`table`);
        if (matchedElement) {
          resizeObserver?.observe(matchedElement);
        }
      };
      let contains2: Dynamic = (
        editorTableControlsKey23?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorTableControlsKey23 instanceof (defaultView.Node as Dynamic) &&
        (append2.contains(editorTableControlsKey23) ||
          append3.contains(editorTableControlsKey23));
      let closest: Dynamic = (
        editorTableControlsKey23?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (
          !(
            editorTableControlsKey23 instanceof (defaultView.Element as Dynamic)
          )
        )
          return null;
        let closest2: Dynamic =
          editorTableControlsKey23.closest(`.tableWrapper`);
        return closest2 &&
          closest2.closest(`.ProseMirror`) === editorTableControlsKey22.dom
          ? closest2
          : null;
      };
      let contains3: Dynamic = (
        editorTableControlsKey23?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let closest2: Dynamic =
          options instanceof (defaultView.Element as Dynamic)
            ? options.closest(`td,th`)
            : null;
        return closest2 && editorTableControlsKey23.contains(closest2)
          ? closest2
          : null;
      };
      let append5: Dynamic = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (contains2(event.target)) return;
        if (!editorTableControlsKey22.editable || event.buttons & 1)
          return void (element && remove());
        let closest2: Dynamic = closest(event.target);
        if (!closest2) return void (element && remove());
        let cell: Dynamic = contains3(closest2, event.target);
        if (!cell)
          return closest2 === element
            ? requestAnimationFrame2()
            : void (element && remove());
        if (isEditorTableControlsKey2Result?.cell !== cell) {
          isEditorTableControlsKey2Result = {
            cell: cell,
            edges: resolveEditorTableControlsLastRow(
              editorTableControlsKey22,
              cell,
            ),
          };
        }
        let { edges: isEditorTableControlsKey2Result3 }: Dynamic =
          isEditorTableControlsKey2Result;
        if (
          !isEditorTableControlsKey2Result3 ||
          (!isEditorTableControlsKey2Result3.lastRow &&
            !isEditorTableControlsKey2Result3.lastCol)
        )
          return void (element && remove());
        if (
          closest2 === element &&
          enabled === isEditorTableControlsKey2Result3.lastRow &&
          enabled2 === isEditorTableControlsKey2Result3.lastCol
        )
          return requestAnimationFrame2();
        if (closest2 !== element) {
          observe(closest2);
        }
        enabled = isEditorTableControlsKey2Result3.lastRow;
        enabled2 = isEditorTableControlsKey2Result3.lastCol;
        append4();
      };
      let isEditorTableControlsKey2Handler: Dynamic =
        (
          editorTableControlsKey23?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (..._extraArguments: unknown[]): undefined => {
          if (editorTableControlsKey23 === `row` && enabled2) {
            enabled2 = false;
            append3.remove();
          } else {
            if (editorTableControlsKey23 === `col` && enabled) {
              enabled = false;
              append2.remove();
            }
          }
        };
      let remove3 = (
        editorTableControlsKey23?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!contains2(editorTableControlsKey23.relatedTarget)) {
          remove();
        }
      };
      let remove4 = (
        editorTableControlsKey23?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          !contains2(editorTableControlsKey23.relatedTarget) &&
          closest(editorTableControlsKey23.relatedTarget) !== element
        ) {
          remove();
        }
      };
      let getBoundingClientRect: Dynamic = (
        editorTableControlsKey23?: Dynamic,
        left?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let rows: Dynamic = element?.querySelector(`table`)?.rows;
        if (!element || !rows?.length) return 0;
        if (editorTableControlsKey23 === `col`) {
          for (let index = 0; index < rows.length; index++)
            if (context < rows[index].getBoundingClientRect().bottom)
              return index;
          return rows.length - 1;
        }
        let editorTableControlsTable2: Dynamic =
          resolveEditorTableControlsTable2(editorTableControlsKey22, element);
        if (!editorTableControlsTable2) return 0;
        let EditorSelectionAndTablesLeftEntry: Dynamic =
          EditorSelectionAndTablesLeft.get(editorTableControlsTable2.table);
        let rowItemBounds: Dynamic =
          rows[rows.length - 1].getBoundingClientRect();
        let posAtCoords: Dynamic = editorTableControlsKey22.posAtCoords({
          left: left,
          top: rowItemBounds.top + rowItemBounds.height / 2,
        });
        let posAtCoords2: Dynamic =
          posAtCoords &&
          getEditorTableControlsRect(
            editorTableControlsKey22.state.doc,
            posAtCoords.pos,
            editorTableControlsTable2.tablePos,
          );
        if (!posAtCoords2) return EditorSelectionAndTablesLeftEntry.width - 1;
        let nodeDOMBounds: Dynamic = editorTableControlsKey22
          .nodeDOM(posAtCoords2.cellPos)
          ?.getBoundingClientRect();
        return resolveEditorTableControlsRight(
          posAtCoords2.rect,
          nodeDOMBounds,
          left,
        );
      };
      let isEditorTableControlsKey2Handler2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        event.preventDefault();
        event.stopPropagation();
      };
      let isEditorTableControlsKey2Handler3: Dynamic =
        (
          editorTableControlsKey23?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          event.preventDefault();
          event.stopPropagation();
          if (
            event.button !== 0 ||
            !editorTableControlsKey22.editable ||
            getState() ||
            !element
          )
            return;
          let element2: Dynamic = element;
          if (
            !(
              !isEditorTableControlsTablePos(
                editorTableControlsKey2,
                element2,
                editorTableControlsKey23,
                getBoundingClientRect(
                  editorTableControlsKey23,
                  event.clientX,
                  event.clientY,
                ),
              ) || element !== element2
            )
          ) {
            if (
              editorTableControlsKey23 === `col` &&
              element2.scrollWidth > element2.clientWidth
            ) {
              isEditorTableControlsKey2Result2 =
                element2.scrollWidth - element2.clientWidth;
              element2.scrollLeft = isEditorTableControlsKey2Result2;
            }
            append4();
          }
        };
      for (let [
        isEditorTableControlsKey2Result3,
        isEditorTableControlsKey2Result4,
      ] of [
        [append2, `row`],
        [append3, `col`],
      ] as Dynamic) {
        isEditorTableControlsKey2Result3.addEventListener(
          `mousedown`,
          isEditorTableControlsKey2Handler2,
        );
        isEditorTableControlsKey2Result3.addEventListener(
          `click`,
          isEditorTableControlsKey2Handler3(isEditorTableControlsKey2Result4),
        );
        isEditorTableControlsKey2Result3.addEventListener(
          `mouseenter`,
          isEditorTableControlsKey2Handler(isEditorTableControlsKey2Result4),
        );
        isEditorTableControlsKey2Result3.addEventListener(
          `mouseleave`,
          remove4,
        );
      }
      editorTableControlsKey22.dom.addEventListener(`mousemove`, append5);
      editorTableControlsKey22.dom.addEventListener(`mouseleave`, remove3);
      editorTableControlsKey22.dom.addEventListener(`dragstart`, remove);
      defaultView.addEventListener(`resize`, remove);
      return {
        update(
          editorTableControlsKey23?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ) {
          if (element) {
            if (
              !editorTableControlsKey23.editable ||
              getState() ||
              !element.isConnected
            )
              return remove();
            if (options.doc !== editorTableControlsKey23.state.doc) {
              isEditorTableControlsKey2Result = null;
              requestAnimationFrame2();
            }
          }
        },
        destroy(..._extraArguments: unknown[]): undefined {
          editorTableControlsKey22.dom.removeEventListener(
            `mousemove`,
            append5,
          );
          editorTableControlsKey22.dom.removeEventListener(
            `mouseleave`,
            remove3,
          );
          editorTableControlsKey22.dom.removeEventListener(`dragstart`, remove);
          defaultView.removeEventListener(`resize`, remove);
          remove();
        },
      };
    },
  });
}

var editorTableControlsValue24: number;

var editorTableControlsValue16: number;

var editorTableControlsValue8: number;

var EditorTableControlsState2: number;

function resolveEditorTableControlsRound(
  editorTableControlsRound?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let round: Dynamic = (
    editorTableControlsRound2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.round(
      2 +
        14 *
          Math.min(1, editorTableControlsRound2 / editorTableControlsValue24),
    );
  return editorTableControlsRound >= context &&
    editorTableControlsRound - argument >= editorTableControlsValue8
    ? round(editorTableControlsRound - context)
    : dependencies &&
        editorTableControlsRound <= options &&
        argument - editorTableControlsRound >= editorTableControlsValue8
      ? -round(options - editorTableControlsRound)
      : 0;
}

var TableColumnResizeAutoScrollPluginKey: Dynamic;

function getEditorTableControlsKey(..._extraArguments: unknown[]): Dynamic {
  return new (Plugin as Dynamic)({
    key: TableColumnResizeAutoScrollPluginKey,
    view(
      editorTableControlsKey?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (!TableColumnResizingPluginKey.get(editorTableControlsKey.state))
        return {};
      let defaultView: Dynamic =
        editorTableControlsKey.dom.ownerDocument.defaultView ?? window;
      let documentElement: Dynamic = defaultView.document.documentElement;
      let count: number = 0;
      let count2: number = 0;
      let getEditorTableControlsKeyResult: Dynamic = null;
      let count3: number = 0;
      let count4: number = 0;
      let count5 = 0;
      let weakSet: Dynamic = new (WeakSet as Dynamic)();
      let getEditorTableControlsKeyResult2: Dynamic = null;
      let getState: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        TableColumnResizingPluginKey.getState(editorTableControlsKey.state)
          ?.dragging || null;
      let contains2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
        let TableColumnResizingPluginKeyState: Dynamic =
          TableColumnResizingPluginKey.getState(editorTableControlsKey.state);
        if (
          !TableColumnResizingPluginKeyState ||
          TableColumnResizingPluginKeyState.activeHandle < 0
        )
          return null;
        let getEditorTableControlsKeyResult3: Dynamic;
        try {
          getEditorTableControlsKeyResult3 = editorTableControlsKey.domAtPos(
            editorTableControlsKey.state.doc
              .resolve(TableColumnResizingPluginKeyState.activeHandle)
              .start(-1),
          ).node;
        } catch {
          return null;
        }
        for (
          ;
          getEditorTableControlsKeyResult3 &&
          getEditorTableControlsKeyResult3.nodeName !== `TABLE`;

        )
          getEditorTableControlsKeyResult3 =
            getEditorTableControlsKeyResult3.parentNode;
        let parentNode: Dynamic = getEditorTableControlsKeyResult3?.parentNode;
        return parentNode instanceof (defaultView.HTMLElement as Dynamic) &&
          parentNode.classList.contains(`tableWrapper`)
          ? parentNode
          : null;
      };
      let getBoundingClientRect: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let TableColumnResizingPluginKeyState: Dynamic =
          TableColumnResizingPluginKey.getState(editorTableControlsKey.state);
        let nodeDOM: Dynamic =
          TableColumnResizingPluginKeyState &&
          TableColumnResizingPluginKeyState.activeHandle >= 0
            ? editorTableControlsKey.nodeDOM(
                TableColumnResizingPluginKeyState.activeHandle,
              )
            : null;
        if (!(nodeDOM instanceof (defaultView.HTMLElement as Dynamic)))
          return null;
        let nodeDOMBounds: Dynamic = nodeDOM.getBoundingClientRect();
        return nodeDOMBounds.width > 0 ? nodeDOMBounds.right : null;
      };
      let cancelAnimationFrame2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (count) {
          defaultView.cancelAnimationFrame(count);
        }
        count = 0;
      };
      let dispatchEvent2 = (..._extraArguments: unknown[]): undefined => {
        if (!getEditorTableControlsKeyResult) return;
        let mouseEvent: Dynamic = new (defaultView.MouseEvent as Dynamic)(
          `mousemove`,
          {
            bubbles: true,
            cancelable: true,
            clientX: getEditorTableControlsKeyResult.x + count4,
            clientY: getEditorTableControlsKeyResult.y,
            button: 0,
            buttons: 1,
          },
        );
        Object.defineProperty(mouseEvent, "which", {
          value: 1,
        });
        weakSet.add(mouseEvent);
        defaultView.dispatchEvent(mouseEvent);
      };
      let dispatch = (..._extraArguments: unknown[]): undefined => {
        let storeState: Dynamic = getState();
        if (!(!storeState || count4 === 0)) {
          editorTableControlsKey.dispatch(
            editorTableControlsKey.state.tr.setMeta(
              TableColumnResizingPluginKey,
              {
                setDragging: {
                  startX: storeState.startX - count4,
                  startWidth: storeState.startWidth,
                },
              },
            ),
          );
          count4 = 0;
        }
      };
      let getBoundingClientRect2: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let wrapper: Dynamic = contains2();
        if (!wrapper) return null;
        let wrapperBounds: Dynamic = wrapper.getBoundingClientRect();
        return {
          wrapper: wrapper,
          left: Math.max(wrapperBounds.left, editorTableControlsValue16),
          right: Math.min(
            wrapperBounds.right,
            documentElement.clientWidth - editorTableControlsValue16,
          ),
          canScrollLeft: wrapper.scrollLeft > 0,
        };
      };
      let resolveEditorTableControlsRound2: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveEditorTableControlsRound(
          editorTableControlsKey2,
          options.left,
          options.right,
          options.canScrollLeft,
          count3,
        );
      let requestAnimationFrame2 = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        count = 0;
        let storeState: Dynamic = getState();
        let elementBounds: Dynamic = getBoundingClientRect2();
        if (!storeState || !elementBounds || !getEditorTableControlsKeyResult)
          return;
        let min = count2
          ? Math.min(
              2,
              (editorTableControlsKey2 - count2) / EditorTableControlsState2,
            )
          : 1;
        count2 = editorTableControlsKey2;
        let {
          wrapper: elementBounds2,
          left: elementBounds3,
          right: elementBounds4,
        }: Dynamic = elementBounds;
        let editorTableControlsRound: Dynamic =
          resolveEditorTableControlsRound2(
            getEditorTableControlsKeyResult.x,
            elementBounds,
          );
        if (editorTableControlsRound === 0) return;
        editorTableControlsRound =
          Math.sign(editorTableControlsRound) *
          Math.max(1, Math.round(Math.abs(editorTableControlsRound) * min));
        let total: Dynamic =
          storeState.startWidth +
          (getEditorTableControlsKeyResult.x + count4 - storeState.startX);
        let difference =
          editorTableControlsRound > 0
            ? editorExtensionsValue4000 - total
            : total - 48;
        if (difference <= 0) {
          count5 = 0;
          return;
        }
        editorTableControlsRound =
          editorTableControlsRound > 0
            ? Math.min(editorTableControlsRound, difference)
            : -Math.min(-editorTableControlsRound, difference);
        count4 += editorTableControlsRound;
        count5 = Math.round(
          editorTableControlsRound > 0
            ? getEditorTableControlsKeyResult.x - elementBounds4
            : getEditorTableControlsKeyResult.x - elementBounds3,
        );
        dispatchEvent2();
        let elementBounds5: Dynamic = getBoundingClientRect();
        elementBounds2.scrollLeft +=
          elementBounds5 === null
            ? editorTableControlsRound
            : editorTableControlsRound > 0
              ? Math.max(0, elementBounds5 - elementBounds4)
              : Math.min(0, elementBounds5 - elementBounds3);
        count = defaultView.requestAnimationFrame(requestAnimationFrame2);
      };
      let requestAnimationFrame3: Dynamic = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (weakSet.has(editorTableControlsKey2)) return;
        let storeState: Dynamic = getState();
        if (storeState) {
          if (!getEditorTableControlsKeyResult) {
            count3 = storeState.startX;
            getEditorTableControlsKeyResult2 = (
              editorTableControlsKey3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                !weakSet.has(editorTableControlsKey3) &&
                count4 !== 0 &&
                getState()
              ) {
                dispatchEvent2();
              }
            };
            defaultView.addEventListener(
              `mousemove`,
              getEditorTableControlsKeyResult2,
            );
          }
          getEditorTableControlsKeyResult = {
            x: editorTableControlsKey2.clientX,
            y: editorTableControlsKey2.clientY,
          };
          if (!(editorTableControlsKey2.buttons & 1)) {
            dispatch();
            return cancelAnimationFrame2();
          }
          if (count5 !== 0) {
            let elementBounds: Dynamic = getBoundingClientRect2();
            if (
              !elementBounds ||
              resolveEditorTableControlsRound2(
                editorTableControlsKey2.clientX,
                elementBounds,
              ) === 0
            ) {
              let total: Dynamic =
                storeState.startWidth +
                (editorTableControlsKey2.clientX + count4 - storeState.startX);
              count4 += Math.max(
                48 - total,
                Math.min(editorExtensionsValue4000 - total, count5),
              );
              count5 = 0;
            }
          }
          count ||=
            ((count2 = 0),
            defaultView.requestAnimationFrame(requestAnimationFrame2));
        }
      };
      let cancelAnimationFrame3 = (
        editorTableControlsKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!weakSet.has(editorTableControlsKey2)) {
          dispatch();
          cancelAnimationFrame2();
        }
      };
      defaultView.addEventListener(`mousemove`, requestAnimationFrame3, true);
      defaultView.addEventListener(`mouseup`, cancelAnimationFrame3, true);
      defaultView.addEventListener(`pointerup`, cancelAnimationFrame2, true);
      defaultView.addEventListener(
        `pointercancel`,
        cancelAnimationFrame2,
        true,
      );
      documentElement.addEventListener(
        `lostpointercapture`,
        cancelAnimationFrame2,
      );
      defaultView.addEventListener(`blur`, cancelAnimationFrame2);
      defaultView.document.addEventListener(
        `visibilitychange`,
        cancelAnimationFrame2,
      );
      return {
        update(
          editorTableControlsKey2?: unknown,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          if (
            !getState() &&
            TableColumnResizingPluginKey.getState(options)?.dragging
          ) {
            getEditorTableControlsKeyResult = null;
            count4 = 0;
            count5 = 0;
            if (getEditorTableControlsKeyResult2) {
              defaultView.removeEventListener(
                `mousemove`,
                getEditorTableControlsKeyResult2,
              );
            }
            getEditorTableControlsKeyResult2 = null;
            cancelAnimationFrame2();
          }
        },
        destroy(..._extraArguments: unknown[]): undefined {
          cancelAnimationFrame2();
          if (getEditorTableControlsKeyResult2) {
            defaultView.removeEventListener(
              `mousemove`,
              getEditorTableControlsKeyResult2,
            );
          }
          defaultView.removeEventListener(
            `mousemove`,
            requestAnimationFrame3,
            true,
          );
          defaultView.removeEventListener(
            `mouseup`,
            cancelAnimationFrame3,
            true,
          );
          defaultView.removeEventListener(
            `pointerup`,
            cancelAnimationFrame2,
            true,
          );
          defaultView.removeEventListener(
            `pointercancel`,
            cancelAnimationFrame2,
            true,
          );
          documentElement.removeEventListener(
            `lostpointercapture`,
            cancelAnimationFrame2,
          );
          defaultView.removeEventListener(`blur`, cancelAnimationFrame2);
          defaultView.document.removeEventListener(
            `visibilitychange`,
            cancelAnimationFrame2,
          );
        },
      };
    },
  });
}

function resolveEditorTableControlsTable3(
  editorTableControlsTable3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let depth: Dynamic = editorTableControlsTable3.depth; depth > 0; depth--)
    if (editorTableControlsTable3.node(depth).type.name === `table`)
      return depth;
  return 0;
}

function resolveEditorTableControlsResolve2(
  editorTableControlsResolve2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolve: Dynamic = editorTableControlsResolve2.resolve(options);
  for (let index = 0; index < 100; index++) {
    let findFrom: Dynamic = Selection.findFrom(resolve, context, true);
    if (!findFrom) return null;
    let editorTableControlsTable3: Dynamic = resolveEditorTableControlsTable3(
      findFrom.$head,
    );
    if (!editorTableControlsTable3) return findFrom.$head;
    resolve = editorTableControlsResolve2.resolve(
      context > 0
        ? findFrom.$head.after(editorTableControlsTable3)
        : findFrom.$head.before(editorTableControlsTable3),
    );
  }
  return null;
}

function resolveEditorTableControlsKey(..._extraArguments: unknown[]): Dynamic {
  return new (Plugin as Dynamic)({
    key: new (PluginKey as Dynamic)(`crossTableSelection`),
    props: {
      createSelectionBetween(
        editorTableControlsKey?: unknown,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return options.pos === context.pos ||
          resolveEditorTableControlsTable3(options) ||
          !resolveEditorTableControlsTable3(context)
          ? null
          : TextSelection.between(
              options,
              context,
              context.pos > options.pos ? 1 : -1,
            );
      },
    },
  });
}

function isEditorTableControlsState2(
  editorTableControlsState2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let { state: editorTableControlsState22 }: Dynamic =
    editorTableControlsState2;
  let selection: Dynamic = editorTableControlsState22.selection;
  if (
    selection instanceof (EditorSelectionAndTablesRowspan as Dynamic) ||
    !(selection instanceof (TextSelection as Dynamic)) ||
    !selection.$head.parent.isTextblock
  )
    return false;
  let { $head: selection2 }: Dynamic = selection;
  if (resolveEditorTableControlsTable3(selection2)) return false;
  for (let depth: Dynamic = selection2.depth; depth > 0; depth--) {
    let node: Dynamic = selection2.node(depth - 1);
    let indexAfter: Dynamic =
      options > 0
        ? selection2.indexAfter(depth - 1)
        : selection2.index(depth - 1) - 1;
    if (indexAfter < 0 || indexAfter >= node.childCount) continue;
    let maybeChild: Dynamic = node.maybeChild(indexAfter);
    if (!maybeChild) continue;
    if (
      maybeChild.type.name !== `table` ||
      !editorTableControlsState2.endOfTextblock(options > 0 ? `down` : `up`)
    )
      return false;
    let after: Dynamic =
      options > 0
        ? selection2.after(depth)
        : selection2.before(depth) - maybeChild.nodeSize;
    let editorTableControlsResolve2: Dynamic =
      resolveEditorTableControlsResolve2(
        editorTableControlsState22.doc,
        options > 0 ? after + maybeChild.nodeSize : after,
        options,
      );
    if (editorTableControlsResolve2) {
      editorTableControlsState2.dispatch(
        editorTableControlsState22.tr
          .setSelection(
            TextSelection.create(
              editorTableControlsState22.doc,
              selection.anchor,
              editorTableControlsResolve2.pos,
            ),
          )
          .scrollIntoView(),
      );
      return true;
    }
    if (!selection.empty) return false;
    let EditorSelectionAndTablesLeftEntry: Dynamic =
      EditorSelectionAndTablesLeft.get(maybeChild);
    if (EditorSelectionAndTablesLeftEntry.map.length === 0) return false;
    let total: Dynamic = after + 1 + EditorSelectionAndTablesLeftEntry.map[0];
    let total2: Dynamic =
      after +
      1 +
      EditorSelectionAndTablesLeftEntry.map[
        EditorSelectionAndTablesLeftEntry.map.length - 1
      ];
    editorTableControlsState2.dispatch(
      editorTableControlsState22.tr.setSelection(
        EditorSelectionAndTablesRowspan.create(
          editorTableControlsState22.doc,
          options > 0 ? total : total2,
          options > 0 ? total2 : total,
        ),
      ),
    );
    return true;
  }
  return false;
}

function resolveEditorTableControlsForEachCell(
  editorTableControls?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let amount: number = 1 / 0;
  let amount2: number = -1 / 0;
  editorTableControls.forEachCell(
    (
      editorTableControls2?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (options < amount) {
        amount = options;
      }
      if (options > amount2) {
        amount2 = options;
      }
    },
  );
  if (!Number.isFinite(amount) || editorTableControls.$headCell.pos === amount)
    return editorTableControls;
  let node: Dynamic = editorTableControls.$headCell.node(0);
  return new (EditorSelectionAndTablesRowspan as Dynamic)(
    node.resolve(amount2),
    node.resolve(amount),
  );
}

function isEditorTableControlsSelection2(
  editorTableControlsSelection2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorTableControlsSelection2.selection;
  return !(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) ||
    options === ``
    ? null
    : editorTableControlsSelection2.tr
        .setSelection(resolveEditorTableControlsForEachCell(selection))
        .insertText(options);
}

function resolveEditorTableControlsSelection2(
  editorTableControlsSelection2?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorTableControlsSelection2.selection;
  if (!(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)))
    return null;
  let enabled = false;
  node.content.descendants(
    (
      editorTableControlsSelection22?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (
      editorTableControlsSelection22.type.spec.tableRole !== undefined &&
        (enabled = true),
      !enabled
    ),
  );
  return enabled
    ? null
    : editorTableControlsSelection2.tr
        .setSelection(resolveEditorTableControlsForEachCell(selection))
        .replaceSelection(node);
}

var CellSelectionFirstCellPluginKey: Dynamic;

function resolveEditorTableControlsKey2(
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Plugin as Dynamic)({
    key: CellSelectionFirstCellPluginKey,
    props: {
      handleTextInput(
        editorTableControlsKey2?: Dynamic,
        options?: unknown,
        context?: unknown,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let isEditorTableControlsSelection22: Dynamic =
          isEditorTableControlsSelection2(
            editorTableControlsKey2.state,
            dependencies,
          );
        return isEditorTableControlsSelection22 === null
          ? false
          : (editorTableControlsKey2.dispatch(
              isEditorTableControlsSelection22.scrollIntoView(),
            ),
            true);
      },
      handlePaste(
        editorTableControlsKey2?: Dynamic,
        options?: unknown,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let editorTableControlsSelection2: Dynamic =
          resolveEditorTableControlsSelection2(
            editorTableControlsKey2.state,
            context,
          );
        return editorTableControlsSelection2 === null
          ? false
          : (editorTableControlsKey2.dispatch(
              editorTableControlsSelection2
                .scrollIntoView()
                .setMeta(`paste`, true)
                .setMeta(`uiEvent`, `paste`),
            ),
            true);
      },
    },
  });
}

var resolveEditorTableControlsChildCount: Dynamic;

function resolveEditorTableControlsMap(
  editorTableControlsMap?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    map: editorTableControlsMap2,
    top: editorTableControlsMap3,
    bottom: editorTableControlsMap4,
    left: editorTableControlsMap5,
    right: editorTableControlsMap6,
  }: Dynamic = editorTableControlsMap;
  let items: Dynamic = [];
  for (
    let total: Dynamic = editorTableControlsMap3 + 1;
    total < editorTableControlsMap4;
    total++
  ) {
    let index = 0;
    let index2 = 0;
    for (let index3 = 0; index3 < editorTableControlsMap2.width; index3++) {
      let mapItem: Dynamic =
        editorTableControlsMap2.map[
          total * editorTableControlsMap2.width + index3
        ];
      if (
        editorTableControlsMap2.map[
          (total - 1) * editorTableControlsMap2.width + index3
        ] !== mapItem
      ) {
        if (
          !(
            index3 > 0 &&
            editorTableControlsMap2.map[
              total * editorTableControlsMap2.width + index3 - 1
            ] === mapItem
          )
        ) {
          index++;
          if (
            index3 < editorTableControlsMap5 ||
            index3 >= editorTableControlsMap6
          ) {
            index2++;
          }
        }
      }
    }
    if (index > 0 && index2 === 0) {
      items.push(total);
    }
  }
  return items;
}

var isEditorTableControlsMap: Dynamic;

function resolveEditorTableControlsMap2(
  editorTableControlsMap2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    map: editorTableControlsMap22,
    table: editorTableControlsMap23,
  }: Dynamic = editorTableControlsMap2;
  let record2: Dynamic = Array.from<Dynamic, Dynamic>(
    {
      length: editorTableControlsMap22.width,
    },
    (..._extraArguments: unknown[]) => null,
  );
  let record3: Dynamic = Array.from<Dynamic, Dynamic>(
    {
      length: editorTableControlsMap22.width,
    },
    (..._extraArguments: unknown[]) => 0,
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let index = 0; index < editorTableControlsMap22.height; index++)
    if (!options.includes(index))
      for (let index2 = 0; index2 < editorTableControlsMap22.width; index2++) {
        let mapItem: Dynamic =
          editorTableControlsMap22.map[
            index * editorTableControlsMap22.width + index2
          ];
        if (uniqueItems.has(mapItem)) continue;
        uniqueItems.add(mapItem);
        let attrs: Dynamic = editorTableControlsMap23.nodeAt(mapItem).attrs;
        let colCount: Dynamic = editorTableControlsMap22.colCount(mapItem);
        for (let index3 = 0; index3 < attrs.rowspan; index3++)
          for (let index4 = 0; index4 < attrs.colspan; index4++) {
            let colwidthItem: Dynamic = attrs.colwidth?.[index4];
            if (!colwidthItem) continue;
            let total: Dynamic = colCount + index4;
            if (
              record2[total] === null ||
              (record2[total] !== colwidthItem && record3[total] === 1)
            ) {
              record2[total] = colwidthItem;
              record3[total] = 1;
            } else {
              if (record2[total] === colwidthItem) {
                record3[total]++;
              }
            }
          }
      }
  return record2;
}

function clearEditorTableControlsMap(
  clearEditorTableControlsMap2?: Dynamic,
  options?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    map: options2,
    table: options3,
    tableStart: options4,
    top: options5,
    bottom: options6,
    left: options7,
    right: options8,
  }: Dynamic = options;
  let mapItem: Dynamic = options2.map[options5 * options2.width + options7];
  let nodeAt: Dynamic = options3.nodeAt(mapItem);
  let empty: Dynamic = Fragment.empty;
  let uniqueItems: Dynamic = new (Set as Dynamic)([mapItem]);
  let items2: Dynamic = [];
  for (let options9: Dynamic = options5; options9 < options6; options9++)
    for (let options10: Dynamic = options7; options10 < options8; options10++) {
      let mapItem2: Dynamic =
        options2.map[options9 * options2.width + options10];
      if (uniqueItems.has(mapItem2)) continue;
      uniqueItems.add(mapItem2);
      let nodeAt2: Dynamic = options3.nodeAt(mapItem2);
      if (!resolveEditorTableControlsChildCount(nodeAt2)) {
        empty = empty.append(nodeAt2.content);
      }
      if (options9 === options5) {
        items2.push(mapItem2);
      }
    }
  let child: Dynamic = (
    clearEditorTableControlsMap3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let options9: Dynamic = options4;
    for (let index = 0; index < clearEditorTableControlsMap3; index++)
      options9 += options3.child(index).nodeSize;
    return options9;
  };
  let [items3, setItems]: Dynamic = [items[0], items[items.length - 1]];
  clearEditorTableControlsMap2.delete(
    child(items3),
    child(setItems) + options3.child(setItems).nodeSize,
  );
  if (items2.length > 0) {
    let itemItem: Dynamic = items2[items2.length - 1];
    clearEditorTableControlsMap2.delete(
      clearEditorTableControlsMap2.mapping.map(options4 + items2[0]),
      clearEditorTableControlsMap2.mapping.map(
        options4 + itemItem + options3.nodeAt(itemItem).nodeSize,
      ),
    );
  }
  let attrs: Dynamic = nodeAt.attrs;
  let colspan: number = options8 - options7;
  let rowspan = options6 - options5 - (setItems - items3 + 1);
  let editorTableControlsMap2Slice: Dynamic = resolveEditorTableControlsMap2(
    options,
    items,
  ).slice(options7, options8);
  let colwidth: Dynamic = editorTableControlsMap2Slice.some(
    (editorTableControlsMap2Slice2?: Dynamic, ..._extraArguments: unknown[]) =>
      editorTableControlsMap2Slice2 !== null,
  )
    ? editorTableControlsMap2Slice.map(
        (
          editorTableControlsMap2Slice2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => editorTableControlsMap2Slice2 ?? 0,
      )
    : null;
  if (
    attrs.colspan !== colspan ||
    attrs.rowspan !== rowspan ||
    !((
      items4?: Dynamic,
      items5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      items4 === items5 ||
      (!!items4 &&
        !!items5 &&
        items4.length === items5.length &&
        items4.every(
          (
            rolldownNImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => rolldownNImport2 === items5[index],
        )))(attrs.colwidth, colwidth)
  ) {
    clearEditorTableControlsMap2.setNodeMarkup(
      clearEditorTableControlsMap2.mapping.map(options4 + mapItem),
      null,
      {
        ...attrs,
        colspan: colspan,
        rowspan: rowspan,
        colwidth: colwidth,
      },
    );
  }
  if (empty.size > 0) {
    let total: Dynamic = mapItem + 1 + nodeAt.content.size;
    let total2: Dynamic = resolveEditorTableControlsChildCount(nodeAt)
      ? mapItem + 1
      : total;
    clearEditorTableControlsMap2.replaceWith(
      clearEditorTableControlsMap2.mapping.map(options4 + total2),
      clearEditorTableControlsMap2.mapping.map(options4 + total),
      empty,
    );
  }
  clearEditorTableControlsMap2.setSelection(
    new (EditorSelectionAndTablesRowspan as Dynamic)(
      clearEditorTableControlsMap2.doc.resolve(
        clearEditorTableControlsMap2.mapping.map(options4 + mapItem),
      ),
    ),
  );
  return clearEditorTableControlsMap2;
}

var editorTableControlsWeakMap: Dynamic;

function updateEditorTableControlsPush(
  updateEditorTableControlsPush2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (updateEditorTableControlsPush2 == null) return context();
  let editorTableControlsWeakMapEntry: Dynamic =
    editorTableControlsWeakMap.get(updateEditorTableControlsPush2) ?? [];
  editorTableControlsWeakMap.set(
    updateEditorTableControlsPush2,
    editorTableControlsWeakMapEntry,
  );
  editorTableControlsWeakMapEntry.push(options);
  try {
    return context();
  } finally {
    editorTableControlsWeakMapEntry.pop();
  }
}

var EditorTableControlsMaster16: {
    name: string;
    master16: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
        tone: string;
    } | {
        d?: undefined;
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
        tone: string;
    } | {
        d?: undefined;
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorTableControlsMaster162: {
    name: string;
    master16: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorTableControlsMaster163: {
    name: string;
    master16: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorTableControlsMaster164: {
    name: string;
    master16: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
        tone: string;
    } | {
        d?: undefined;
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
        tone: string;
    } | {
        d?: undefined;
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorTableControlsMaster165: {
    name: string;
    master16: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorTableControlsMaster166: {
    name: string;
    master16: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        tone: string;
    } | {
        tone?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var editorTableControlsWeakMap2: Dynamic;

var getEditorTableControlsValue: (editorTableControlsValue?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var EditorTableControlsAddRowBefore: Dynamic;

var EditorTableControlsTableMenu: string;

var resolveEditorTableControlsKey3: Dynamic;

var resolveEditorTableControlsDeleteRow: Dynamic;

var EditorTableControlsRowAbove: {
    rowAbove: {
        name: string;
        master16: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
    rowBelow: {
        name: string;
        master16: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
    colLeft: {
        name: string;
        master16: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
    colRight: {
        name: string;
        master16: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
    rowDel: {
        name: string;
        master16: ({
            d?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            d: string;
            tone: string;
        } | {
            d?: undefined;
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            d?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            d: string;
            tone: string;
        } | {
            d?: undefined;
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
    colDel: {
        name: string;
        master16: ({
            d?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            d: string;
            tone: string;
        } | {
            d?: undefined;
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
        master20: ({
            d?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            tone: string;
        } | {
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            d: string;
            tone: string;
        } | {
            d?: undefined;
            tone?: undefined;
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        })[];
    };
};

var EditorTableControlsRow: Dynamic;

var editorTableControlsSet3: Dynamic;

var editorTableControlsValue162: number;

var resolveEditorTableControlsValue7: Dynamic;

function isEditorTableControlsPos(
  editorTableControlsPos?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorTableControlsPosResult: Dynamic = null;
  editorTableControlsPos.descendants(
    (node?: Dynamic, pos?: Dynamic, ..._extraArguments: unknown[]) => {
      if (isEditorTableControlsPosResult) return false;
      let tableRole: Dynamic = node.type.spec.tableRole;
      if (
        (tableRole === `cell` || tableRole === `header_cell`) &&
        node.attrs.bid === options
      ) {
        isEditorTableControlsPosResult = {
          pos: pos,
          node: node,
        };
      }
      return !isEditorTableControlsPosResult;
    },
  );
  return isEditorTableControlsPosResult;
}

function resolveEditorTableControlsPos(
  editorTableControlsPos?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!options.isConnected || !editorTableControlsPos.dom.contains(options))
    return null;
  let resolveEditorTableControlsPosResult: Dynamic;
  try {
    resolveEditorTableControlsPosResult = editorTableControlsPos.posAtDOM(
      options,
      0,
    );
  } catch {
    return null;
  }
  if (
    resolveEditorTableControlsPosResult < 0 ||
    resolveEditorTableControlsPosResult >
      editorTableControlsPos.state.doc.content.size
  )
    return null;
  let editorSelectionAndTablesDepth: Dynamic =
    resolveEditorSelectionAndTablesDepth(
      editorTableControlsPos.state.doc.resolve(
        resolveEditorTableControlsPosResult,
      ),
    );
  return editorSelectionAndTablesDepth?.nodeAfter
    ? {
        pos: editorSelectionAndTablesDepth.pos,
        node: editorSelectionAndTablesDepth.nodeAfter,
      }
    : null;
}

var resolveEditorTableControlsNodeAt: Dynamic;

function resolveEditorTableControlsLeft2(
  editorTableControlsLeft2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = 8,
  ..._extraArguments: unknown[]
) {
  let total: Dynamic = editorTableControlsLeft2.bottom + 4;
  let total2: Dynamic =
    total + options.height <= dependencies - argument
      ? total
      : Math.max(argument, editorTableControlsLeft2.top - 4 - options.height);
  let max = Math.max(
    argument,
    Math.min(editorTableControlsLeft2.left, context - options.width - argument),
  );
  return {
    left: Math.round(max),
    top: Math.round(total2),
  };
}

var editorTableControlsWeakMap3: Dynamic;

var getEditorTableControlsValue2: Dynamic;

var getEditorTableControlsValue3: Dynamic;

function updateEditorTableControlsEditor(
  updateEditorTableControlsEditor2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let {
    editor: updateEditorTableControlsEditor3,
    view: updateEditorTableControlsEditor4,
    kind: updateEditorTableControlsEditor5,
    anchor: anchor,
    cellEl: updateEditorTableControlsEditor6,
  }: Dynamic = updateEditorTableControlsEditor2;
  getEditorTableControlsValue3(updateEditorTableControlsEditor4);
  if (!updateEditorTableControlsEditor4.editable) return;
  let editorTableControlsPos: Dynamic = resolveEditorTableControlsPos(
    updateEditorTableControlsEditor4,
    updateEditorTableControlsEditor6,
  );
  if (!editorTableControlsPos) return;
  let bid: Dynamic =
    typeof editorTableControlsPos.node.attrs.bid == `string` &&
    editorTableControlsPos.node.attrs.bid !== ``
      ? editorTableControlsPos.node.attrs.bid
      : null;
  let isEditorTableControlsPos2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    bid === null
      ? resolveEditorTableControlsPos(
          updateEditorTableControlsEditor4,
          updateEditorTableControlsEditor6,
        )
      : isEditorTableControlsPos(
          updateEditorTableControlsEditor4.state.doc,
          bid,
        );
  let ownerDocument2: Dynamic =
    updateEditorTableControlsEditor4.dom.ownerDocument;
  let defaultView: Dynamic = ownerDocument2.defaultView;
  let element: Dynamic = ownerDocument2.createElement(`div`);
  element.className = `ldoc-floatmenu ldoc-elmenu ldoc-gripmenu`;
  element.setAttribute(`role`, `menu`);
  element.setAttribute(
    `aria-label`,
    updateEditorTableControlsEditor5 === `row`
      ? `Row actions`
      : `Column actions`,
  );
  element.tabIndex = -1;
  let enabled = false;
  let items: Dynamic = [];
  let nodeAt = (
    updateEditorTableControlsEditor7?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled || (close(false), !updateEditorTableControlsEditor4.editable))
      return;
    let isEditorTableControlsPos3: Dynamic = isEditorTableControlsPos2();
    if (!isEditorTableControlsPos3) {
      getEditorTableControlsValue(
        updateEditorTableControlsEditor4,
        `cell_gone`,
      );
      if (updateEditorTableControlsEditor4.dom.isConnected) {
        updateEditorTableControlsEditor4.focus();
      }
      return;
    }
    editorTableControlsSet3.has(updateEditorTableControlsEditor7);
    let doc: Dynamic = updateEditorTableControlsEditor4.state.doc;
    let resolve: Dynamic = doc.resolve(isEditorTableControlsPos3.pos);
    let node: Dynamic = resolve.node(-1);
    let difference2 = resolve.start(-1) - 1;
    let setTextSelection: Dynamic = updateEditorTableControlsEditor3
      .chain()
      .focus()
      .setTextSelection(
        resolveEditorTableControlsNodeAt(
          updateEditorTableControlsEditor4.state.doc,
          isEditorTableControlsPos3.pos,
        ),
      );
    if (
      !updateEditorTableControlsPush(
        updateEditorTableControlsEditor4,
        `table_ui`,
        (..._extraArguments: unknown[]): Dynamic =>
          setTextSelection[updateEditorTableControlsEditor7]().run(),
      )
    ) {
      getEditorTableControlsValue(
        updateEditorTableControlsEditor4,
        `table_refused`,
      );
    }
    if (options && updateEditorTableControlsEditor4.state.doc !== doc) {
      let nodeAt2: Dynamic =
        updateEditorTableControlsEditor4.state.doc.nodeAt(difference2);
      resolveEditorTableControlsKey3(
        updateEditorTableControlsEditor4,
        resolveEditorTableControlsDeleteRow(
          updateEditorTableControlsEditor7,
          nodeAt2?.type === node.type
            ? updateEditorTableControlsEditor7 === `deleteRow`
              ? node.childCount - nodeAt2.childCount
              : updateEditorTableControlsEditor7 === `deleteColumn`
                ? EditorSelectionAndTablesLeft.get(node).width -
                  EditorSelectionAndTablesLeft.get(nodeAt2).width
                : 1
            : 1,
        ),
      );
    }
  };
  for (let updateEditorTableControlsEditorResult2 of EditorTableControlsRow[
    updateEditorTableControlsEditor5
  ] as Dynamic) {
    let element2: Dynamic = ownerDocument2.createElement(`button`);
    element2.type = `button`;
    element2.setAttribute(`role`, `menuitem`);
    element2.tabIndex = -1;
    element2.dataset.cmd = updateEditorTableControlsEditorResult2.cmd;
    element2.append(
      resolveEditorTableControlsValue7(
        ownerDocument2,
        updateEditorTableControlsEditorResult2.icon,
      ),
    );
    element2.append(
      ownerDocument2.createTextNode(
        updateEditorTableControlsEditorResult2.label,
      ),
    );
    element2.addEventListener(
      `mousedown`,
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        event.preventDefault(),
    );
    element2.addEventListener(
      `click`,
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        nodeAt(
          updateEditorTableControlsEditorResult2.cmd,
          resolveDataOperationControlDetail(event) === true,
        ),
    );
    items.push(element2);
    element.append(element2);
  }
  element.addEventListener(
    `mousedown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        event.button === 2 ||
        (event.button === 0 &&
          event.ctrlKey &&
          resolvePlatformKeyboardAndSaveStatusNavigator())
      ) {
        event.preventDefault();
        close(true);
      }
    },
  );
  element.addEventListener(
    `contextmenu`,
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      event.preventDefault(),
  );
  ownerDocument2.body.append(element);
  let elementBounds: Dynamic = element.getBoundingClientRect();
  let difference: number =
    ownerDocument2.documentElement.clientWidth -
    resolveEditorHostDocumentElement2(ownerDocument2);
  let editorTableControlsLeft2 = resolveEditorTableControlsLeft2(
    anchor.getBoundingClientRect(),
    elementBounds,
    difference || defaultView.innerWidth,
    defaultView.innerHeight,
  );
  element.style.left = `${editorTableControlsLeft2.left}px`;
  element.style.top = `${editorTableControlsLeft2.top}px`;
  anchor.setAttribute(`aria-expanded`, `true`);
  let updateEditorTableControlsEditorResult = -1;
  let focus = (
    updateEditorTableControlsEditor7?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    updateEditorTableControlsEditorResult =
      (updateEditorTableControlsEditor7 + items.length) % items.length;
    items[updateEditorTableControlsEditorResult].focus({
      preventScroll: true,
    });
  };
  let contains2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let target: Dynamic = event.target;
    if (
      !element.contains(target) &&
      target !== anchor &&
      !anchor.contains(target)
    ) {
      close(false);
    }
  };
  let contains3 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (resolveEditorAnchorsAndMentionsEscape(event)) {
      resolveEditorAnchorsAndMentionsValue3(event);
      event.preventDefault();
      event.stopPropagation();
      close(true);
      return;
    }
    if (!element.contains(event.target)) return;
    let key: Dynamic = event.key;
    if (
      key === `ArrowDown` ||
      key === `ArrowUp` ||
      key === `Home` ||
      key === `End`
    ) {
      event.preventDefault();
      event.stopPropagation();
      let difference2 = items.length - 1;
      focus(
        updateEditorTableControlsEditorResult < 0
          ? key === `ArrowDown` || key === `Home`
            ? 0
            : difference2
          : key === `ArrowDown`
            ? updateEditorTableControlsEditorResult + 1
            : key === `ArrowUp`
              ? updateEditorTableControlsEditorResult - 1
              : key === `Home`
                ? 0
                : difference2,
      );
    } else if (key === `Enter` || key === ` `) {
      event.preventDefault();
      event.stopPropagation();
      if (updateEditorTableControlsEditorResult >= 0) {
        nodeAt(
          EditorTableControlsRow[updateEditorTableControlsEditor5][
            updateEditorTableControlsEditorResult
          ].cmd,
          true,
        );
      }
    } else {
      if (key === `Tab`) {
        event.preventDefault();
        event.stopPropagation();
        close(true);
      }
    }
  };
  function close(
    updateEditorTableControlsEditor7?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    if (!enabled) {
      enabled = true;
      element.remove();
      anchor.removeAttribute(`aria-expanded`);
      ownerDocument2.removeEventListener(`mousedown`, contains2, true);
      ownerDocument2.removeEventListener(`keydown`, contains3, true);
      defaultView.removeEventListener(`scroll`, close2, true);
      defaultView.removeEventListener(`resize`, close2);
      defaultView.removeEventListener(`blur`, close2);
      if (
        editorTableControlsWeakMap3.get(updateEditorTableControlsEditor4)
          ?.close === close
      ) {
        editorTableControlsWeakMap3.delete(updateEditorTableControlsEditor4);
      }
      updateEditorTableControlsEditor2.onClose?.();
      if (
        updateEditorTableControlsEditor7 &&
        updateEditorTableControlsEditor4.dom.isConnected
      ) {
        updateEditorTableControlsEditor4.focus();
      }
    }
  }
  let close2: Dynamic = (..._extraArguments: unknown[]) => close(false);
  editorTableControlsWeakMap3.set(updateEditorTableControlsEditor4, {
    close: close,
    anchor: anchor,
  });
  ownerDocument2.addEventListener(`mousedown`, contains2, true);
  ownerDocument2.addEventListener(`keydown`, contains3, true);
  defaultView.addEventListener(`scroll`, close2, true);
  defaultView.addEventListener(`resize`, close2);
  defaultView.addEventListener(`blur`, close2);
  element.focus({
    preventScroll: true,
  });
}

function isEditorTableControlsHeight(
  editorTableControlsHeight?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorTableControlsHeight);
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.height;
    index++
  ) {
    let mapItem: Dynamic =
      EditorSelectionAndTablesLeftEntry.map[
        index * EditorSelectionAndTablesLeftEntry.width + options
      ];
    let findCell: Dynamic = EditorSelectionAndTablesLeftEntry.findCell(mapItem);
    if (
      findCell.right - findCell.left !== 1 ||
      findCell.bottom - findCell.top !== 1
    )
      return false;
  }
  return true;
}

function isEditorTableControlsWidth(
  editorTableControlsWidth?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorTableControlsWidth);
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.width;
    index++
  ) {
    let findCell: Dynamic = EditorSelectionAndTablesLeftEntry.findCell(
      EditorSelectionAndTablesLeftEntry.map[
        options * EditorSelectionAndTablesLeftEntry.width + index
      ],
    );
    if (findCell.bottom - findCell.top !== 1) return false;
  }
  return true;
}

function isEditorTableControlsWidth2(
  editorTableControlsWidth2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorTableControlsWidth2);
  if (options <= 0 || options >= EditorSelectionAndTablesLeftEntry.width)
    return options === 0 || options === EditorSelectionAndTablesLeftEntry.width;
  for (let index = 0; index < EditorSelectionAndTablesLeftEntry.height; index++)
    if (
      EditorSelectionAndTablesLeftEntry.findCell(
        EditorSelectionAndTablesLeftEntry.map[
          index * EditorSelectionAndTablesLeftEntry.width + options
        ],
      ).left < options
    )
      return false;
  return true;
}

function isEditorTableControlsHeight2(
  editorTableControlsHeight2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorTableControlsHeight2);
  if (options <= 0 || options >= EditorSelectionAndTablesLeftEntry.height)
    return (
      options === 0 || options === EditorSelectionAndTablesLeftEntry.height
    );
  for (let index = 0; index < EditorSelectionAndTablesLeftEntry.width; index++)
    if (
      EditorSelectionAndTablesLeftEntry.findCell(
        EditorSelectionAndTablesLeftEntry.map[
          options * EditorSelectionAndTablesLeftEntry.width + index
        ],
      ).top < options
    )
      return false;
  return true;
}

var resolveEditorTableControlsValue8: Dynamic;

var EditorTableControlsState3: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorTableControls2Step1(): void {
  (TableNode = Node2.create({
    name: `table`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
        resizable: false,
        renderWrapper: false,
        handleWidth: 5,
        cellMinWidth: 25,
        View: EditorTableControlsTableWrapper,
        lastColumnResizable: true,
        allowTableNodeSelection: false,
      };
    },
    content: `tableRow+`,
    tableRole: `table`,
    isolating: true,
    group: `block`,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `table`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let {
        colgroup: editorTableControlsColspan2,
        tableWidth: editorTableControlsColspan22,
        tableMinWidth: editorTableControlsColspan23,
      }: Dynamic = resolveEditorTableControlsColspan2(
        node,
        this.options.cellMinWidth,
      );
      let style: Dynamic = HTMLAttributes.style;
      function tableNodeHandler(..._extraArguments: unknown[]): Dynamic {
        return (
          style ||
          (editorTableControlsColspan22
            ? `width: ${editorTableControlsColspan22}`
            : `min-width: ${editorTableControlsColspan23}`)
        );
      }
      let items: Dynamic = [
        `table`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: tableNodeHandler(),
        }),
        editorTableControlsColspan2,
        [`tbody`, 0],
      ];
      return this.options.renderWrapper
        ? [
            `div`,
            {
              class: `tableWrapper`,
            },
            items,
          ]
        : items;
    },
    parseMarkdown: (
      node?: Dynamic,
      HTMLAttributes?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let editorTableControlsColspan2: Dynamic = [];
      let editorTableControlsColspan22: Dynamic = Array.isArray(node.align)
        ? node.align
        : [];
      if (node.header) {
        let items: Dynamic = [];
        node.header.forEach(
          (
            header?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let align: Dynamic = resolveEditorTableControlsLeft(
              editorTableControlsColspan22[index] ?? header.align,
            );
            let record2: Dynamic = align
              ? {
                  align: align,
                }
              : {};
            items.push(
              HTMLAttributes.createNode(`tableHeader`, record2, [
                {
                  type: `paragraph`,
                  content: HTMLAttributes.parseInline(header.tokens),
                },
              ]),
            );
          },
        );
        editorTableControlsColspan2.push(
          HTMLAttributes.createNode(`tableRow`, {}, items),
        );
      }
      if (node.rows) {
        node.rows.forEach(
          (row?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let items: Dynamic = [];
            row.forEach(
              (
                rolldownNImport2?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let align: Dynamic = resolveEditorTableControlsLeft(
                  editorTableControlsColspan22[index] ?? rolldownNImport2.align,
                );
                let record2: Dynamic = align
                  ? {
                      align: align,
                    }
                  : {};
                items.push(
                  HTMLAttributes.createNode(`tableCell`, record2, [
                    {
                      type: `paragraph`,
                      content: HTMLAttributes.parseInline(
                        rolldownNImport2.tokens,
                      ),
                    },
                  ]),
                );
              },
            );
            editorTableControlsColspan2.push(
              HTMLAttributes.createNode(`tableRow`, {}, items),
            );
          },
        );
      }
      return HTMLAttributes.createNode(
        `table`,
        undefined,
        editorTableControlsColspan2,
      );
    },
    renderMarkdown: (
      node?: Dynamic,
      HTMLAttributes?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => EditorTableControlsState(node, HTMLAttributes),
    addCommands(..._extraArguments: unknown[]): Dynamic {
      return {
        insertTable:
          (
            {
              rows: tableNode = 3,
              cols: tableNode2 = 3,
              withHeaderRow: tableNode3 = true,
            }: Dynamic = {},
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { tr: tr2, dispatch: dispatch, editor: editor }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let editorTableControlsCell3: Dynamic =
              resolveEditorTableControlsCell3(
                editor.schema,
                tableNode,
                tableNode2,
                tableNode3,
              );
            if (dispatch) {
              let total: Dynamic = tr2.selection.from + 1;
              tr2
                .replaceSelectionWith(editorTableControlsCell3)
                .scrollIntoView()
                .setSelection(TextSelection.near(tr2.doc.resolve(total)));
            }
            return true;
          },
        addColumnBefore:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesLeft(state, dispatch),
        addColumnAfter:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesRight(state, dispatch),
        deleteColumn:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesNoTableFound(state, dispatch),
        addRowBefore:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesValue(state, dispatch),
        addRowAfter:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesBottom(state, dispatch),
        deleteRow:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesNoTableFound2(state, dispatch),
        deleteTable:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesTable(state, dispatch),
        mergeCells:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            isEditorSelectionAndTablesMap(state, dispatch),
        splitCell:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            resolveEditorSelectionAndTablesNode2(state, dispatch),
        toggleHeaderColumn:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesUseDeprecatedLogic(`column`)(
              state,
              dispatch,
            ),
        toggleHeaderRow:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesUseDeprecatedLogic(`row`)(state, dispatch),
        toggleHeaderCell:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            EditorSelectionAndTablesUseDeprecatedLogic(state, dispatch),
        mergeOrSplit:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesMap(state, dispatch)
              ? true
              : resolveEditorSelectionAndTablesNode2(state, dispatch),
        setCellAttribute:
          (
            tableNode?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesAttrs(tableNode, options)(state, dispatch),
        goToNextCell:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesResolve(1)(state, dispatch),
        goToPreviousCell:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ): boolean =>
            isEditorSelectionAndTablesResolve(-1)(state, dispatch),
        fixTables:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => (dispatch && resolveEditorSelectionAndTablesTable(state), true),
        setCellSelection:
          (tableNode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (
            { tr: tr2, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            if (dispatch) {
              let create2: Dynamic = EditorSelectionAndTablesRowspan.create(
                tr2.doc,
                tableNode.anchorCell,
                tableNode.headCell,
              );
              tr2.setSelection(create2);
            }
            return true;
          },
      };
    },
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        Tab: (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.goToNextCell()
            ? true
            : this.editor.can().addRowAfter()
              ? this.editor.chain().addRowAfter().goToNextCell().run()
              : false,
        "Shift-Tab": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.goToPreviousCell(),
        Backspace: isEditorTableControlsEditor,
        "Mod-Backspace": isEditorTableControlsEditor,
        Delete: isEditorTableControlsEditor,
        "Mod-Delete": isEditorTableControlsEditor,
      };
    },
    addProseMirrorPlugins(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return [
        ...(this.options.resizable && this.editor.isEditable
          ? [
              resolveEditorSelectionAndTablesHandleWidth({
                handleWidth: this.options.handleWidth,
                cellMinWidth: this.options.cellMinWidth,
                defaultCellMinWidth: this.options.cellMinWidth,
                View: this.options.View,
                lastColumnResizable: this.options.lastColumnResizable,
              }),
            ]
          : []),
        resolveEditorSelectionAndTablesAllowTableNodeSelection({
          allowTableNodeSelection: this.options.allowTableNodeSelection,
        }),
      ];
    },
    extendNodeSchema(node?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return {
        tableRole: callOrReturn(
          getExtensionField(node, `tableRole`, {
            name: node.name,
            options: node.options,
            storage: node.storage,
          }),
        ),
      };
    },
  }));
  Extension.create({
    name: `tableKit`,
    addExtensions(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let items: Dynamic = [];
      if (this.options.table !== false) {
        items.push(TableNode.configure(this.options.table));
      }
      if (this.options.tableCell !== false) {
        items.push(TableCellNode.configure(this.options.tableCell));
      }
      if (this.options.tableHeader !== false) {
        items.push(TableHeaderNode.configure(this.options.tableHeader));
      }
      if (this.options.tableRow !== false) {
        items.push(TableRowNode.configure(this.options.tableRow));
      }
      return items;
    },
  });
  (TableAppendPluginKey = new (PluginKey as Dynamic)(`tableAppend`));
  (editorTableControlsValue24 = 24);
  (editorTableControlsValue16 = 16);
  (editorTableControlsValue8 = 8);
  (EditorTableControlsState2 = 1e3 / 60);
  (TableColumnResizeAutoScrollPluginKey = new (PluginKey as Dynamic)(
    `tableColumnResizeAutoScroll`,
  ));
  (CellSelectionFirstCellPluginKey = new (PluginKey as Dynamic)(
    `cellSelectionFirstCell`,
  ));
  (resolveEditorTableControlsChildCount = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    node.content.childCount === 1 &&
    node.child(0).isTextblock &&
    node.child(0).childCount === 0);
  (isEditorTableControlsMap = (
    editorTableControlsMap?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!isEditorSelectionAndTablesMap(editorTableControlsMap)) return false;
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(editorTableControlsMap);
    let editorTableControlsMap2: Dynamic = resolveEditorTableControlsMap(
      editorSelectionAndTablesTableStart,
    );
    if (editorTableControlsMap2.length === 0)
      return isEditorSelectionAndTablesMap(editorTableControlsMap, options);
    let {
      map: editorSelectionAndTablesTableStart2,
      table: editorSelectionAndTablesTableStart3,
      top: editorSelectionAndTablesTableStart4,
      left: editorSelectionAndTablesTableStart5,
      right: editorSelectionAndTablesTableStart6,
    }: Dynamic = editorSelectionAndTablesTableStart;
    if (
      editorSelectionAndTablesTableStart5 > 0 ||
      editorSelectionAndTablesTableStart6 <
        editorSelectionAndTablesTableStart2.width
    )
      return false;
    for (
      let index = 0;
      index < editorSelectionAndTablesTableStart2.width;
      index++
    ) {
      let nodeAt: Dynamic = editorSelectionAndTablesTableStart3.nodeAt(
        editorSelectionAndTablesTableStart2.map[
          editorSelectionAndTablesTableStart4 *
            editorSelectionAndTablesTableStart2.width +
            index
        ],
      );
      if (nodeAt && nodeAt.attrs.rowspan > 1) return false;
    }
    if (options) {
      options(
        clearEditorTableControlsMap(
          editorTableControlsMap.tr,
          editorSelectionAndTablesTableStart,
          editorTableControlsMap2,
        ),
      );
    }
    return true;
  });
  (editorTableControlsWeakMap = new (WeakMap as Dynamic)());
  (EditorTableControlsMaster16 = {
    name: `TableColumnDelete`,
    master16: [
      {
        x1: 2.5,
        y1: 3.5,
        x2: 2.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        d: `M8 3.5L8 5M8 12.5L8 11`,
        tone: `secondary`,
      },
      {
        x1: 13.5,
        y1: 3.5,
        x2: 13.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 6.5,
        y1: 6.5,
        x2: 9.5,
        y2: 9.5,
      },
      {
        x1: 9.5,
        y1: 6.5,
        x2: 6.5,
        y2: 9.5,
      },
    ],
    master20: [
      {
        x1: 17.5,
        y1: 3.5,
        x2: 17.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        d: `M10 3.5L10 6.5M10 13.5L10 16.5`,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 3.5,
        x2: 2.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 12,
        y1: 12,
        x2: 8,
        y2: 8,
      },
      {
        x1: 8,
        y1: 12,
        x2: 12,
        y2: 8,
      },
    ],
  });
  (EditorTableControlsMaster162 = {
    name: `TableColumnInsertLeft`,
    master16: [
      {
        x1: 13.5,
        y1: 3.5,
        x2: 13.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 9.5,
        y1: 3.5,
        x2: 9.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 6,
        y1: 8,
        x2: 2.5,
        y2: 8,
      },
      {
        x1: 4.245,
        y1: 6.255,
        x2: 4.245,
        y2: 9.755,
      },
    ],
    master20: [
      {
        x1: 10.5,
        y1: 3.5,
        x2: 10.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 14,
        y1: 3.5,
        x2: 14,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 17.5,
        y1: 3.5,
        x2: 17.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 10,
        x2: 7.5,
        y2: 10,
      },
      {
        x1: 5,
        y1: 12.5,
        x2: 5,
        y2: 7.5,
      },
    ],
  });
  (EditorTableControlsMaster163 = {
    name: `TableColumnInsertRight`,
    master16: [
      {
        x1: 2.5,
        y1: 3.5,
        x2: 2.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 6.5,
        y1: 3.5,
        x2: 6.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 10,
        y1: 8,
        x2: 13.5,
        y2: 8,
      },
      {
        x1: 11.755,
        y1: 6.255,
        x2: 11.755,
        y2: 9.755,
      },
    ],
    master20: [
      {
        x1: 9.5,
        y1: 3.5,
        x2: 9.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 6,
        y1: 3.5,
        x2: 6,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 3.5,
        x2: 2.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 17.5,
        y1: 10,
        x2: 12.5,
        y2: 10,
      },
      {
        x1: 15,
        y1: 12.5,
        x2: 15,
        y2: 7.5,
      },
    ],
  });
  (EditorTableControlsMaster164 = {
    name: `TableRowDelete`,
    master16: [
      {
        x1: 2.5,
        y1: 12.5,
        x2: 13.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        d: `M2.5 8L5 8M11 8L13.5 8`,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 3.5,
        x2: 13.5,
        y2: 3.5,
        tone: `secondary`,
      },
      {
        x1: 6.5,
        y1: 9.5,
        x2: 9.5,
        y2: 6.5,
      },
      {
        x1: 6.5,
        y1: 6.5,
        x2: 9.5,
        y2: 9.5,
      },
    ],
    master20: [
      {
        x1: 17.5,
        y1: 16.5,
        x2: 2.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        d: `M17.5 10L13.5 10M2.5 10L6.5 10`,
        tone: `secondary`,
      },
      {
        x1: 17.5,
        y1: 3.5,
        x2: 2.5,
        y2: 3.5,
        tone: `secondary`,
      },
      {
        x1: 8,
        y1: 12,
        x2: 12,
        y2: 8,
      },
      {
        x1: 8,
        y1: 8,
        x2: 12,
        y2: 12,
      },
    ],
  });
  (EditorTableControlsMaster165 = {
    name: `TableRowInsertAbove`,
    master16: [
      {
        x1: 2.5,
        y1: 12.5,
        x2: 13.5,
        y2: 12.5,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 9.5,
        x2: 13.5,
        y2: 9.5,
        tone: `secondary`,
      },
      {
        x1: 8,
        y1: 7,
        x2: 8,
        y2: 3.5,
      },
      {
        x1: 9.755,
        y1: 5.255,
        x2: 6.255,
        y2: 5.255,
      },
    ],
    master20: [
      {
        x1: 2.5,
        y1: 10,
        x2: 17.5,
        y2: 10,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 13.25,
        x2: 17.5,
        y2: 13.25,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 16.5,
        x2: 17.5,
        y2: 16.5,
        tone: `secondary`,
      },
      {
        x1: 10,
        y1: 2.5,
        x2: 10,
        y2: 7.5,
      },
      {
        x1: 12.5,
        y1: 5,
        x2: 7.5,
        y2: 5,
      },
    ],
  });
  (EditorTableControlsMaster166 = {
    name: `TableRowInsertBelow`,
    master16: [
      {
        x1: 2.5,
        y1: 3.5,
        x2: 13.5,
        y2: 3.5,
        tone: `secondary`,
      },
      {
        x1: 2.5,
        y1: 6.5,
        x2: 13.5,
        y2: 6.5,
        tone: `secondary`,
      },
      {
        x1: 8,
        y1: 9,
        x2: 8,
        y2: 12.5,
      },
      {
        x1: 9.755,
        y1: 10.745,
        x2: 6.255,
        y2: 10.745,
      },
    ],
    master20: [
      {
        x1: 17.5,
        y1: 10,
        x2: 2.5,
        y2: 10,
        tone: `secondary`,
      },
      {
        x1: 17.5,
        y1: 6.75,
        x2: 2.5,
        y2: 6.75,
        tone: `secondary`,
      },
      {
        x1: 17.5,
        y1: 3.5,
        x2: 2.5,
        y2: 3.5,
        tone: `secondary`,
      },
      {
        x1: 10,
        y1: 17.5,
        x2: 10,
        y2: 12.5,
      },
      {
        x1: 7.5,
        y1: 15,
        x2: 12.5,
        y2: 15,
      },
    ],
  });
  (editorTableControlsWeakMap2 = new (WeakMap as Dynamic)());
  (getEditorTableControlsValue = (
    editorTableControlsValue?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorTableControlsWeakMap2Entry: Dynamic =
      editorTableControlsWeakMap2.get(editorTableControlsValue);
    editorTableControlsWeakMap2Entry?.(options, context);
    return editorTableControlsWeakMap2Entry !== undefined;
  });
  (EditorTableControlsAddRowBefore = {
    addRowBefore: `Row inserted above`,
    addRowAfter: `Row inserted below`,
    addColumnBefore: `Column inserted left`,
    addColumnAfter: `Column inserted right`,
    deleteRow: `Row deleted`,
    deleteRows: `Rows deleted`,
    deleteColumn: `Column deleted`,
    deleteColumns: `Columns deleted`,
    sortAsc: `Column sorted ascending`,
    sortDesc: `Column sorted descending`,
    alignLeft: `Aligned left`,
    alignCenter: `Aligned center`,
    alignRight: `Aligned right`,
    colorPrefix: `Cell color`,
    colorNone: `Cell color removed`,
    merge: `Cells merged`,
    split: `Cell split`,
    headerOn: `Header row on`,
    headerOff: `Header row off`,
  });
  (EditorTableControlsTableMenu = `table-menu`);
  (resolveEditorTableControlsKey3 = (
    editorTableControlsKey3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformAnnouncementsValue(
      editorTableControlsKey3.dom.ownerDocument,
      options,
      {
        key: EditorTableControlsTableMenu,
      },
    ));
  (resolveEditorTableControlsDeleteRow = (
    editorTableControlsDeleteRow?: Dynamic,
    options: Dynamic = 1,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorTableControlsDeleteRow === `deleteRow`
      ? options > 1
        ? EditorTableControlsAddRowBefore.deleteRows
        : EditorTableControlsAddRowBefore.deleteRow
      : editorTableControlsDeleteRow === `deleteColumn`
        ? options > 1
          ? EditorTableControlsAddRowBefore.deleteColumns
          : EditorTableControlsAddRowBefore.deleteColumn
        : EditorTableControlsAddRowBefore[editorTableControlsDeleteRow]);
  (EditorTableControlsRowAbove = {
    rowAbove: EditorTableControlsMaster165,
    rowBelow: EditorTableControlsMaster166,
    colLeft: EditorTableControlsMaster162,
    colRight: EditorTableControlsMaster163,
    rowDel: EditorTableControlsMaster164,
    colDel: EditorTableControlsMaster16,
  });
  (EditorTableControlsRow = {
    row: [
      {
        label: `Insert row above`,
        cmd: `addRowBefore`,
        icon: EditorTableControlsRowAbove.rowAbove,
      },
      {
        label: `Insert row below`,
        cmd: `addRowAfter`,
        icon: EditorTableControlsRowAbove.rowBelow,
      },
      {
        label: `Delete row`,
        cmd: `deleteRow`,
        icon: EditorTableControlsRowAbove.rowDel,
      },
    ],
    col: [
      {
        label: `Insert column left`,
        cmd: `addColumnBefore`,
        icon: EditorTableControlsRowAbove.colLeft,
      },
      {
        label: `Insert column right`,
        cmd: `addColumnAfter`,
        icon: EditorTableControlsRowAbove.colRight,
      },
      {
        label: `Delete column`,
        cmd: `deleteColumn`,
        icon: EditorTableControlsRowAbove.colDel,
      },
    ],
  });
  (editorTableControlsSet3 = new (Set as Dynamic)([
    `addRowBefore`,
    `addRowAfter`,
    `addColumnBefore`,
    `addColumnAfter`,
  ]));
  (editorTableControlsValue162 = 16);
  (resolveEditorTableControlsValue7 = (
    editorTableControlsValue7?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorAnchorsAndMentionsGrid2(
      editorTableControlsValue7,
      options,
      editorTableControlsValue162,
    ));
  (resolveEditorTableControlsNodeAt = (
    editorTableControlsNode?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let nodeAt: Dynamic = editorTableControlsNode.nodeAt(options);
    let from: Dynamic = Selection.near(
      editorTableControlsNode.resolve(options + 1),
      1,
    ).from;
    return nodeAt && from > options && from < options + nodeAt.nodeSize
      ? from
      : options + 1;
  });
  (editorTableControlsWeakMap3 = new (WeakMap as Dynamic)());
  (getEditorTableControlsValue2 = (
    editorTableControlsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorTableControlsWeakMap3.get(editorTableControlsValue2)?.anchor ?? null);
  (getEditorTableControlsValue3 = (
    editorTableControlsValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorTableControlsWeakMap3.get(editorTableControlsValue3)?.close(false));
  (resolveEditorTableControlsValue8 = (
    editorTableControlsValue82?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options === editorTableControlsValue82 ||
    options === editorTableControlsValue82 + 1);
  (EditorTableControlsState3 = null);
}

export {
  EditorTableControlsState3,
  TableNode,
  getEditorTableControlsKey,
  getEditorTableControlsValue,
  getEditorTableControlsValue2,
  getEditorTableControlsValue3,
  isEditorTableControlsHeight,
  isEditorTableControlsHeight2,
  isEditorTableControlsKey2,
  isEditorTableControlsMap,
  isEditorTableControlsState2,
  isEditorTableControlsWidth,
  isEditorTableControlsWidth2,
  resolveEditorTableControlsKey,
  resolveEditorTableControlsKey2,
  resolveEditorTableControlsValue8,
  updateEditorTableControlsEditor,
};

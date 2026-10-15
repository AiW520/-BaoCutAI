/** BaoCut: editor selection and tables from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Decoration,
  DecorationSet,
  Plugin,
} from "../../platform/dependencies";
import {
  EditorSelectionAndTablesLeft,
  SelectingCellsPluginKey,
  resolveEditorSelectionAndTablesDepth,
  resolveEditorSelectionAndTablesTableNodeTypes,
  resolveEditorSelectionAndTablesTableRole,
} from "./selection-and-tables-1";
import {
  EditorSelectionAndTablesArrowLeft,
  EditorSelectionAndTablesTableWrapper,
  TableColumnResizingPluginKey,
  getEditorSelectionAndTablesCell,
  installEditorSelectionAndTablesMouseup,
  isEditorSelectionAndTablesWidth3,
  resolveEditorSelectionAndTablesClass,
  resolveEditorSelectionAndTablesColspan4,
  resolveEditorSelectionAndTablesState,
  resolveEditorSelectionAndTablesTable,
} from "./selection-and-tables-2";

function resolveEditorSelectionAndTablesHandleWidth(
  {
    handleWidth: editorSelectionAndTablesHandleWidth = 5,
    cellMinWidth: editorSelectionAndTablesHandleWidth2 = 25,
    defaultCellMinWidth: editorSelectionAndTablesHandleWidth3 = 100,
    View: editorSelectionAndTablesHandleWidth4 = EditorSelectionAndTablesTableWrapper,
    lastColumnResizable: editorSelectionAndTablesHandleWidth5 = true,
  }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let plugin: Dynamic = new (Plugin as Dynamic)({
    key: TableColumnResizingPluginKey,
    state: {
      init(
        editorSelectionAndTablesHandleWidth6?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        var resolveEditorSelectionAndTablesHandleWidthResult: Dynamic;
        let nodeViews: Dynamic =
          (resolveEditorSelectionAndTablesHandleWidthResult = plugin.spec) ==
            null ||
          (resolveEditorSelectionAndTablesHandleWidthResult =
            resolveEditorSelectionAndTablesHandleWidthResult.props) == null
            ? undefined
            : resolveEditorSelectionAndTablesHandleWidthResult.nodeViews;
        let name: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
          options.schema,
        ).table.name;
        if (editorSelectionAndTablesHandleWidth4 && nodeViews) {
          nodeViews[name] = (
            editorSelectionAndTablesHandleWidth7?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            new (editorSelectionAndTablesHandleWidth4 as Dynamic)(
              editorSelectionAndTablesHandleWidth7,
              editorSelectionAndTablesHandleWidth3,
              options2,
            );
        }
        return new (EditorSelectionAndTablesActiveHandle as Dynamic)(-1, false);
      },
      apply(
        editorSelectionAndTablesHandleWidth6?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return options.apply(editorSelectionAndTablesHandleWidth6);
      },
    },
    props: {
      attributes: (
        editorSelectionAndTablesHandleWidth6?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let TableColumnResizingPluginKeyState: Dynamic =
          TableColumnResizingPluginKey.getState(
            editorSelectionAndTablesHandleWidth6,
          );
        return TableColumnResizingPluginKeyState &&
          TableColumnResizingPluginKeyState.activeHandle > -1
          ? {
              class: `resize-cursor`,
            }
          : {};
      },
      handleDOMEvents: {
        mousemove: (
          editorSelectionAndTablesHandleWidth6?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          getEditorSelectionAndTablesLeft(
            editorSelectionAndTablesHandleWidth6,
            options,
            editorSelectionAndTablesHandleWidth,
            editorSelectionAndTablesHandleWidth5,
          );
        },
        mouseleave: (
          editorSelectionAndTablesHandleWidth6?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          resolveEditorSelectionAndTablesEditable(
            editorSelectionAndTablesHandleWidth6,
          );
        },
        mousedown: (
          editorSelectionAndTablesHandleWidth6?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          isEditorSelectionAndTablesSetDragging(
            editorSelectionAndTablesHandleWidth6,
            options,
            editorSelectionAndTablesHandleWidth2,
            editorSelectionAndTablesHandleWidth3,
          );
        },
      },
      decorations: (
        editorSelectionAndTablesHandleWidth6?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let TableColumnResizingPluginKeyState: Dynamic =
          TableColumnResizingPluginKey.getState(
            editorSelectionAndTablesHandleWidth6,
          );
        if (
          TableColumnResizingPluginKeyState &&
          TableColumnResizingPluginKeyState.activeHandle > -1
        )
          return getEditorSelectionAndTablesClass(
            editorSelectionAndTablesHandleWidth6,
            TableColumnResizingPluginKeyState.activeHandle,
          );
      },
      nodeViews: {},
    },
  });
  return plugin;
}

var EditorSelectionAndTablesActiveHandle: Dynamic;

function getEditorSelectionAndTablesLeft(
  editorSelectionAndTablesLeft?: Dynamic,
  event?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!editorSelectionAndTablesLeft.editable) return;
  let TableColumnResizingPluginKeyState: Dynamic =
    TableColumnResizingPluginKey.getState(editorSelectionAndTablesLeft.state);
  if (
    TableColumnResizingPluginKeyState &&
    !TableColumnResizingPluginKeyState.dragging
  ) {
    let editorSelectionAndTablesProseMirror: Dynamic =
      resolveEditorSelectionAndTablesProseMirror(event.target);
    let getEditorSelectionAndTablesLeftResult: number = -1;
    if (editorSelectionAndTablesProseMirror) {
      let {
        left: editorSelectionAndTablesProseMirrorBounds,
        right: editorSelectionAndTablesProseMirrorBounds2,
      }: Dynamic = editorSelectionAndTablesProseMirror.getBoundingClientRect();
      if (
        event.clientX - editorSelectionAndTablesProseMirrorBounds <=
        context
      ) {
        getEditorSelectionAndTablesLeftResult =
          getEditorSelectionAndTablesLeft2(
            editorSelectionAndTablesLeft,
            event,
            `left`,
            context,
          );
      } else {
        if (
          editorSelectionAndTablesProseMirrorBounds2 - event.clientX <=
          context
        ) {
          getEditorSelectionAndTablesLeftResult =
            getEditorSelectionAndTablesLeft2(
              editorSelectionAndTablesLeft,
              event,
              `right`,
              context,
            );
        }
      }
    }
    if (
      getEditorSelectionAndTablesLeftResult !=
      TableColumnResizingPluginKeyState.activeHandle
    ) {
      if (!dependencies && getEditorSelectionAndTablesLeftResult !== -1) {
        let resolve: Dynamic = editorSelectionAndTablesLeft.state.doc.resolve(
          getEditorSelectionAndTablesLeftResult,
        );
        let node: Dynamic = resolve.node(-1);
        let EditorSelectionAndTablesLeftEntry: Dynamic =
          EditorSelectionAndTablesLeft.get(node);
        let start: Dynamic = resolve.start(-1);
        if (
          EditorSelectionAndTablesLeftEntry.colCount(resolve.pos - start) +
            resolve.nodeAfter.attrs.colspan -
            1 ==
          EditorSelectionAndTablesLeftEntry.width - 1
        )
          return;
      }
      resolveEditorSelectionAndTablesSetHandle(
        editorSelectionAndTablesLeft,
        getEditorSelectionAndTablesLeftResult,
      );
    }
  }
}

function resolveEditorSelectionAndTablesEditable(
  editorSelectionAndTablesEditable?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!editorSelectionAndTablesEditable.editable) return;
  let TableColumnResizingPluginKeyState: Dynamic =
    TableColumnResizingPluginKey.getState(
      editorSelectionAndTablesEditable.state,
    );
  if (
    TableColumnResizingPluginKeyState &&
    TableColumnResizingPluginKeyState.activeHandle > -1 &&
    !TableColumnResizingPluginKeyState.dragging
  ) {
    resolveEditorSelectionAndTablesSetHandle(
      editorSelectionAndTablesEditable,
      -1,
    );
  }
}

function isEditorSelectionAndTablesSetDragging(
  editorSelectionAndTablesSetDragging?: Dynamic,
  event?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!editorSelectionAndTablesSetDragging.editable) return false;
  let defaultView: Dynamic =
    editorSelectionAndTablesSetDragging.dom.ownerDocument.defaultView ?? window;
  let TableColumnResizingPluginKeyState: Dynamic =
    TableColumnResizingPluginKey.getState(
      editorSelectionAndTablesSetDragging.state,
    );
  if (
    !TableColumnResizingPluginKeyState ||
    TableColumnResizingPluginKeyState.activeHandle == -1 ||
    TableColumnResizingPluginKeyState.dragging
  )
    return false;
  let nodeAt: Dynamic = editorSelectionAndTablesSetDragging.state.doc.nodeAt(
    TableColumnResizingPluginKeyState.activeHandle,
  );
  let startWidth: Dynamic = resolveEditorSelectionAndTablesColspan5(
    editorSelectionAndTablesSetDragging,
    TableColumnResizingPluginKeyState.activeHandle,
    nodeAt.attrs,
  );
  editorSelectionAndTablesSetDragging.dispatch(
    editorSelectionAndTablesSetDragging.state.tr.setMeta(
      TableColumnResizingPluginKey,
      {
        setDragging: {
          startX: event.clientX,
          startWidth: startWidth,
        },
      },
    ),
  );
  function isEditorSelectionAndTablesSetDraggingHandler(
    editorSelectionAndTablesSetDragging2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    defaultView.removeEventListener(
      `mouseup`,
      isEditorSelectionAndTablesSetDraggingHandler,
    );
    defaultView.removeEventListener(
      `mousemove`,
      isEditorSelectionAndTablesSetDraggingHandler2,
    );
    let TableColumnResizingPluginKeyState2: Dynamic =
      TableColumnResizingPluginKey.getState(
        editorSelectionAndTablesSetDragging.state,
      );
    if (TableColumnResizingPluginKeyState2?.dragging) {
      getEditorSelectionAndTablesColwidth(
        editorSelectionAndTablesSetDragging,
        TableColumnResizingPluginKeyState2.activeHandle,
        resolveEditorSelectionAndTablesClientX(
          TableColumnResizingPluginKeyState2.dragging,
          editorSelectionAndTablesSetDragging2,
          context,
        ),
      );
      editorSelectionAndTablesSetDragging.dispatch(
        editorSelectionAndTablesSetDragging.state.tr.setMeta(
          TableColumnResizingPluginKey,
          {
            setDragging: null,
          },
        ),
      );
    }
  }
  function isEditorSelectionAndTablesSetDraggingHandler2(
    editorSelectionAndTablesSetDragging2?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!editorSelectionAndTablesSetDragging2.which)
      return isEditorSelectionAndTablesSetDraggingHandler(
        editorSelectionAndTablesSetDragging2,
      );
    let TableColumnResizingPluginKeyState2: Dynamic =
      TableColumnResizingPluginKey.getState(
        editorSelectionAndTablesSetDragging.state,
      );
    if (
      TableColumnResizingPluginKeyState2 &&
      TableColumnResizingPluginKeyState2.dragging
    ) {
      let editorSelectionAndTablesClientX =
        resolveEditorSelectionAndTablesClientX(
          TableColumnResizingPluginKeyState2.dragging,
          editorSelectionAndTablesSetDragging2,
          context,
        );
      getEditorSelectionAndTablesTABLE(
        editorSelectionAndTablesSetDragging,
        TableColumnResizingPluginKeyState2.activeHandle,
        editorSelectionAndTablesClientX,
        dependencies,
      );
    }
  }
  getEditorSelectionAndTablesTABLE(
    editorSelectionAndTablesSetDragging,
    TableColumnResizingPluginKeyState.activeHandle,
    startWidth,
    dependencies,
  );
  defaultView.addEventListener(
    `mouseup`,
    isEditorSelectionAndTablesSetDraggingHandler,
  );
  defaultView.addEventListener(
    `mousemove`,
    isEditorSelectionAndTablesSetDraggingHandler2,
  );
  event.preventDefault();
  return true;
}

function resolveEditorSelectionAndTablesColspan5(
  editorSelectionAndTablesColspan5: Dynamic,
  options: Dynamic,
  { colspan: colspan, colwidth: colwidth }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let colwidth2: Dynamic = colwidth && colwidth[colwidth.length - 1];
  if (colwidth2) return colwidth2;
  let domAtPos: Dynamic = editorSelectionAndTablesColspan5.domAtPos(options);
  let offsetWidth: Dynamic =
    domAtPos.node.childNodes[domAtPos.offset].offsetWidth;
  let colspan2: Dynamic = colspan;
  if (colwidth)
    for (let index = 0; index < colspan; index++)
      if (colwidth[index]) {
        offsetWidth -= colwidth[index];
        colspan2--;
      }
  return offsetWidth / colspan2;
}

function resolveEditorSelectionAndTablesProseMirror(
  editorSelectionAndTablesProseMirror?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    ;
    editorSelectionAndTablesProseMirror &&
    editorSelectionAndTablesProseMirror.nodeName != `TD` &&
    editorSelectionAndTablesProseMirror.nodeName != `TH`;

  )
    editorSelectionAndTablesProseMirror =
      editorSelectionAndTablesProseMirror.classList &&
      editorSelectionAndTablesProseMirror.classList.contains(`ProseMirror`)
        ? null
        : editorSelectionAndTablesProseMirror.parentNode;
  return editorSelectionAndTablesProseMirror;
}

function getEditorSelectionAndTablesLeft2(
  editorSelectionAndTablesLeft2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dependencies2: Dynamic =
    context == `right` ? -dependencies : dependencies;
  let posAtCoords: Dynamic = editorSelectionAndTablesLeft2.posAtCoords({
    left: options.clientX + dependencies2,
    top: options.clientY,
  });
  if (!posAtCoords) return -1;
  let { pos: posAtCoords2 }: Dynamic = posAtCoords;
  let editorSelectionAndTablesDepth: Dynamic =
    resolveEditorSelectionAndTablesDepth(
      editorSelectionAndTablesLeft2.state.doc.resolve(posAtCoords2),
    );
  if (!editorSelectionAndTablesDepth) return -1;
  if (context == `right`) return editorSelectionAndTablesDepth.pos;
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(editorSelectionAndTablesDepth.node(-1));
  let start: Dynamic = editorSelectionAndTablesDepth.start(-1);
  let mapIndex: Dynamic = EditorSelectionAndTablesLeftEntry.map.indexOf(
    editorSelectionAndTablesDepth.pos - start,
  );
  return mapIndex % EditorSelectionAndTablesLeftEntry.width == 0
    ? -1
    : start + EditorSelectionAndTablesLeftEntry.map[mapIndex - 1];
}

function resolveEditorSelectionAndTablesClientX(
  editorSelectionAndTablesClientX?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let difference: number =
    options.clientX - editorSelectionAndTablesClientX.startX;
  return Math.max(
    context,
    editorSelectionAndTablesClientX.startWidth + difference,
  );
}

function resolveEditorSelectionAndTablesSetHandle(
  editorSelectionAndTablesSetHandle?: Dynamic,
  setHandle?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorSelectionAndTablesSetHandle.dispatch(
    editorSelectionAndTablesSetHandle.state.tr.setMeta(
      TableColumnResizingPluginKey,
      {
        setHandle: setHandle,
      },
    ),
  );
}

function getEditorSelectionAndTablesColwidth(
  editorSelectionAndTablesColwidth?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let resolve: Dynamic =
    editorSelectionAndTablesColwidth.state.doc.resolve(options);
  let node: Dynamic = resolve.node(-1);
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(node);
  let start: Dynamic = resolve.start(-1);
  let difference =
    EditorSelectionAndTablesLeftEntry.colCount(resolve.pos - start) +
    resolve.nodeAfter.attrs.colspan -
    1;
  let tr2: Dynamic = editorSelectionAndTablesColwidth.state.tr;
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.height;
    index++
  ) {
    let total = index * EditorSelectionAndTablesLeftEntry.width + difference;
    if (
      index &&
      EditorSelectionAndTablesLeftEntry.map[total] ==
        EditorSelectionAndTablesLeftEntry.map[
          total - EditorSelectionAndTablesLeftEntry.width
        ]
    )
      continue;
    let mapItem: Dynamic = EditorSelectionAndTablesLeftEntry.map[total];
    let attrs: Dynamic = node.nodeAt(mapItem).attrs;
    let count: number =
      attrs.colspan == 1
        ? 0
        : difference - EditorSelectionAndTablesLeftEntry.colCount(mapItem);
    if (attrs.colwidth && attrs.colwidth[count] == context) continue;
    let colwidth: Dynamic = attrs.colwidth
      ? attrs.colwidth.slice()
      : resolveEditorSelectionAndTablesFill(attrs.colspan);
    colwidth[count] = context;
    tr2.setNodeMarkup(start + mapItem, null, {
      ...attrs,
      colwidth: colwidth,
    });
  }
  if (tr2.docChanged) {
    editorSelectionAndTablesColwidth.dispatch(tr2);
  }
}

function getEditorSelectionAndTablesTABLE(
  editorSelectionAndTablesTABLE?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let resolve: Dynamic =
    editorSelectionAndTablesTABLE.state.doc.resolve(options);
  let node: Dynamic = resolve.node(-1);
  let start: Dynamic = resolve.start(-1);
  let difference =
    EditorSelectionAndTablesLeft.get(node).colCount(resolve.pos - start) +
    resolve.nodeAfter.attrs.colspan -
    1;
  let node2: Dynamic = editorSelectionAndTablesTABLE.domAtPos(
    resolve.start(-1),
  ).node;
  for (; node2 && node2.nodeName != `TABLE`; ) node2 = node2.parentNode;
  if (node2) {
    resolveEditorSelectionAndTablesColspan4(
      node,
      node2.firstChild,
      node2,
      dependencies,
      difference,
      context,
    );
  }
}

function resolveEditorSelectionAndTablesFill(
  editorSelectionAndTablesFill?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Array(editorSelectionAndTablesFill).fill(0);
}

function getEditorSelectionAndTablesClass(
  editorSelectionAndTablesClass?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let resolve: Dynamic = editorSelectionAndTablesClass.doc.resolve(options);
  let node: Dynamic = resolve.node(-1);
  if (!node) return DecorationSet.empty;
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(node);
  let start: Dynamic = resolve.start(-1);
  let difference =
    EditorSelectionAndTablesLeftEntry.colCount(resolve.pos - start) +
    resolve.nodeAfter.attrs.colspan -
    1;
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.height;
    index++
  ) {
    let total = difference + index * EditorSelectionAndTablesLeftEntry.width;
    if (
      (difference == EditorSelectionAndTablesLeftEntry.width - 1 ||
        EditorSelectionAndTablesLeftEntry.map[total] !=
          EditorSelectionAndTablesLeftEntry.map[total + 1]) &&
      (index == 0 ||
        EditorSelectionAndTablesLeftEntry.map[total] !=
          EditorSelectionAndTablesLeftEntry.map[
            total - EditorSelectionAndTablesLeftEntry.width
          ])
    ) {
      let mapItem: Dynamic = EditorSelectionAndTablesLeftEntry.map[total];
      let difference2 = start + mapItem + node.nodeAt(mapItem).nodeSize - 1;
      let element = document.createElement(`div`);
      element.className = `column-resize-handle`;
      if (
        TableColumnResizingPluginKey.getState(editorSelectionAndTablesClass)
          ?.dragging
      ) {
        items.push(
          Decoration.node(
            start + mapItem,
            start + mapItem + node.nodeAt(mapItem).nodeSize,
            {
              class: `column-resize-dragging`,
            },
          ),
        );
      }
      items.push(Decoration.widget(difference2, element));
    }
  }
  return DecorationSet.create(editorSelectionAndTablesClass.doc, items);
}

function resolveEditorSelectionAndTablesAllowTableNodeSelection(
  {
    allowTableNodeSelection:
      editorSelectionAndTablesAllowTableNodeSelection = false,
  }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Plugin as Dynamic)({
    key: SelectingCellsPluginKey,
    state: {
      init(..._extraArguments: unknown[]) {
        return null;
      },
      apply(
        editorSelectionAndTablesAllowTableNodeSelection2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let meta: Dynamic =
          editorSelectionAndTablesAllowTableNodeSelection2.getMeta(
            SelectingCellsPluginKey,
          );
        if (meta != null) return meta == -1 ? null : meta;
        if (
          options == null ||
          !editorSelectionAndTablesAllowTableNodeSelection2.docChanged
        )
          return options;
        let { deleted: mapResult, pos: mapResult2 }: Dynamic =
          editorSelectionAndTablesAllowTableNodeSelection2.mapping.mapResult(
            options,
          );
        return mapResult ? null : mapResult2;
      },
    },
    props: {
      decorations: resolveEditorSelectionAndTablesClass,
      handleDOMEvents: {
        mousedown: installEditorSelectionAndTablesMouseup,
      },
      createSelectionBetween(
        editorSelectionAndTablesAllowTableNodeSelection2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return SelectingCellsPluginKey.getState(
          editorSelectionAndTablesAllowTableNodeSelection2.state,
        ) == null
          ? null
          : editorSelectionAndTablesAllowTableNodeSelection2.state.selection;
      },
      handleTripleClick: resolveEditorSelectionAndTablesState,
      handleKeyDown: EditorSelectionAndTablesArrowLeft,
      handlePaste: isEditorSelectionAndTablesWidth3,
    },
    appendTransaction(
      editorSelectionAndTablesAllowTableNodeSelection2?: unknown,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return getEditorSelectionAndTablesCell(
        context,
        resolveEditorSelectionAndTablesTable(context, options),
        editorSelectionAndTablesAllowTableNodeSelection,
      );
    },
  });
}

var EditorSelectionAndTablesMaster16: {
    name: string;
    master16: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
    master20: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
};

var EditorSelectionAndTablesMaster162: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorSelectionAndTablesMaster163: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorSelectionAndTablesMaster164: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorSelectionAndTablesMaster165: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorSelectionAndTablesMaster166: {
    name: string;
    master16: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorSelectionAndTablesMaster167: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorSelectionAndTablesMaster168: {
    name: string;
    master16: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
};

var EditorSelectionAndTablesMaster169: {
    name: string;
    master16: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
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
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorSelectionAndTablesMaster1610: {
    name: string;
    master16: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorSelectionAndTablesMaster1611: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorSelectionAndTablesMaster1612: {
    name: string;
    master16: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorChipsAndNodeViewsMaster16: {
    name: string;
    master16: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
};

var EditorChipsAndNodeViewsMaster162: {
    name: string;
    master16: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
    master20: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorChipsAndNodeViewsMaster163: {
    name: string;
    master16: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
        filled?: undefined;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
        filled?: undefined;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
        filled: string;
    })[];
};

var EditorChipsAndNodeViewsMaster164: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorChipsAndNodeViewsMaster165: {
    name: string;
    master16: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
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
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorChipsAndNodeViewsMaster166: {
    name: string;
    master16: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    } | {
        d?: undefined;
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
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorChipsAndNodeViewsMaster167: {
    name: string;
    master16: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
    master20: ({
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    })[];
};

var EditorChipsAndNodeViewsMaster168: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: ({
        d?: undefined;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    } | {
        x1?: undefined;
        y1?: undefined;
        x2?: undefined;
        y2?: undefined;
        d: string;
    })[];
};

var EditorChipsAndNodeViewsMaster169: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorChipsAndNodeViewsMaster1610: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var EditorChipsAndNodeViewsMaster1611: {
    name: string;
    master16: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
    master20: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
};

var EditorChipsAndNodeViewsDataLfileContainer: string;

var EditorChipsAndNodeViewsDataLfileCopiedImage: string;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorSelectionAndTables3Step1(): void {
  (EditorSelectionAndTablesActiveHandle = class editorSelectionAndTablesActiveHandleResult {
    [key: string]: Dynamic;
    constructor(
      editorSelectionAndTablesActiveHandle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.activeHandle = editorSelectionAndTablesActiveHandle;
      this.dragging = options;
    }
    apply(options?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let instance: Dynamic = this;
      let meta: Dynamic = options.getMeta(TableColumnResizingPluginKey);
      if (meta && meta.setHandle != null)
        return new (editorSelectionAndTablesActiveHandleResult as Dynamic)(
          meta.setHandle,
          false,
        );
      if (meta && meta.setDragging !== undefined)
        return new (editorSelectionAndTablesActiveHandleResult as Dynamic)(
          instance.activeHandle,
          meta.setDragging,
        );
      if (instance.activeHandle > -1 && options.docChanged) {
        let mappedMapping: Dynamic = options.mapping.map(
          instance.activeHandle,
          -1,
        );
        if (
          !resolveEditorSelectionAndTablesTableRole(
            options.doc.resolve(mappedMapping),
          )
        ) {
          mappedMapping = -1;
        }
        return new (editorSelectionAndTablesActiveHandleResult as Dynamic)(
          mappedMapping,
          instance.dragging,
        );
      }
      return instance;
    }
  });
  (EditorSelectionAndTablesMaster16 = {
    name: `Add`,
    master16: [
      {
        x1: 8,
        y1: 3.5,
        x2: 8,
        y2: 12.5,
      },
      {
        x1: 12.5,
        y1: 8,
        x2: 3.5,
        y2: 8,
      },
    ],
    master20: [
      {
        x1: 10,
        y1: 4,
        x2: 10,
        y2: 16,
      },
      {
        x1: 16,
        y1: 10,
        x2: 4,
        y2: 10,
      },
    ],
  });
  (EditorSelectionAndTablesMaster162 = {
    name: `ArrowLeft`,
    master16: [
      {
        d: `M12.5 8L3.5 8L7.5 4M7.5 12L3.5 8`,
      },
    ],
    master20: [
      {
        d: `M15.5 10L4.5 10L9.5 5M9.5 15L4.5 10`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster163 = {
    name: `Calendar`,
    master16: [
      {
        d: `M10.5 1.5L10.5 3.5L12.5 3.5C13.052 3.5 13.5 3.948 13.5 4.5L13.5 11.5C13.5 12.052 13.052 12.5 12.5 12.5L3.5 12.5C2.948 12.5 2.5 12.052 2.5 11.5L2.5 4.5C2.5 3.948 2.948 3.5 3.5 3.5L5.5 3.5L10.5 3.5L10.5 4.5M5.5 1.5L5.5 3.5L5.5 4.5`,
      },
    ],
    master20: [
      {
        x1: 3.5,
        y1: 8.5,
        x2: 16.5,
        y2: 8.5,
      },
      {
        x1: 6.5,
        y1: 3,
        x2: 6.5,
        y2: 6,
      },
      {
        x1: 13.5,
        y1: 3,
        x2: 13.5,
        y2: 6,
      },
      {
        d: `M3.5 5.5L3.5 15.5C3.5 16.052 3.948 16.5 4.5 16.5L15.5 16.5C16.052 16.5 16.5 16.052 16.5 15.5L16.5 5.5C16.5 4.947 16.052 4.5 15.5 4.5L4.5 4.5C3.948 4.5 3.5 4.947 3.5 5.5Z`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster164 = {
    name: `CaretDown`,
    master16: [
      {
        d: `M3.5 6L8 10.5L12.5 6`,
      },
    ],
    master20: [
      {
        d: `M16.5 7L10 13.5L3.5 7`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster165 = {
    name: `CaretLeft`,
    master16: [
      {
        d: `M10 3.5L5.5 8L10 12.5`,
      },
    ],
    master20: [
      {
        d: `M13 16.499L6.5 10L13 3.499`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster166 = {
    name: `Chart`,
    master16: [
      {
        x1: 8.5,
        y1: 3.5,
        x2: 8.5,
        y2: 9.5,
      },
      {
        x1: 5.5,
        y1: 7.5,
        x2: 5.5,
        y2: 9.5,
      },
      {
        x1: 11.5,
        y1: 5.5,
        x2: 11.5,
        y2: 9.5,
      },
      {
        d: `M2.5 3.5L2.5 12.5L13.5 12.5`,
      },
    ],
    master20: [
      {
        x1: 3.5,
        y1: 16.5,
        x2: 16.5,
        y2: 16.5,
      },
      {
        d: `M3.5 14L3.5 9C3.5 8.724 3.724 8.5 4 8.5L6 8.5C6.276 8.5 6.5 8.724 6.5 9L6.5 14C6.5 14.276 6.276 14.5 6 14.5L4 14.5C3.724 14.5 3.5 14.276 3.5 14Z`,
      },
      {
        d: `M8.5 14L8.5 4C8.5 3.724 8.724 3.5 9 3.5L11 3.5C11.276 3.5 11.5 3.724 11.5 4L11.5 14C11.5 14.276 11.276 14.5 11 14.5L9 14.5C8.724 14.5 8.5 14.276 8.5 14Z`,
      },
      {
        d: `M13.5 14L13.5 6C13.5 5.724 13.724 5.5 14 5.5L16 5.5C16.276 5.5 16.5 5.724 16.5 6L16.5 14C16.5 14.276 16.276 14.5 16 14.5L14 14.5C13.724 14.5 13.5 14.276 13.5 14Z`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster167 = {
    name: `Check`,
    master16: [
      {
        d: `M3.5 7.5L6.5 10.5L12.5 4.5`,
      },
    ],
    master20: [
      {
        d: `M3.75 9.5L8 13.75L16.5 5.25`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster168 = {
    name: `CheckCircle`,
    master16: [
      {
        cx: 8,
        cy: 8,
        r: 5.5,
      },
      {
        d: `M5.5 8.25L7 9.75L10.5 6.25`,
      },
    ],
    master20: [
      {
        cx: 10,
        cy: 10,
        r: 7,
      },
      {
        d: `M7 10.25L9 12.25L13.25 8`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster169 = {
    name: `Checklist`,
    master16: [
      {
        d: `M2.5 5.25L4 6.75L7.25 3.5`,
      },
      {
        x1: 8.5,
        y1: 5.5,
        x2: 13.5,
        y2: 5.5,
      },
      {
        d: `M2.5 11.25L4 12.75L7.25 9.5`,
      },
      {
        x1: 8.5,
        y1: 11.5,
        x2: 13.5,
        y2: 11.5,
      },
    ],
    master20: [
      {
        x1: 8.5,
        y1: 15.5,
        x2: 16.5,
        y2: 15.5,
      },
      {
        x1: 8.5,
        y1: 10,
        x2: 16.5,
        y2: 10,
      },
      {
        x1: 8.5,
        y1: 4.5,
        x2: 16.5,
        y2: 4.5,
      },
      {
        d: `M3.283 4.75L4.283 5.75L6.533 3.5`,
      },
      {
        d: `M3.282 10.25L4.282 11.25L6.532 9`,
      },
      {
        d: `M3.282 15.75L4.282 16.75L6.532 14.5`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster1610 = {
    name: `Code`,
    master16: [
      {
        d: `M11 5.5L13.5 8L11 10.5`,
      },
      {
        d: `M5 5.5L2.5 8L5 10.5`,
      },
      {
        x1: 7,
        y1: 12.5,
        x2: 9,
        y2: 3.5,
      },
    ],
    master20: [
      {
        d: `M13.75 13.5L17.25 10L13.75 6.5`,
      },
      {
        x1: 9,
        y1: 16,
        x2: 11,
        y2: 4,
      },
      {
        d: `M6.25 13.5L2.75 10L6.25 6.5`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster1611 = {
    name: `Dropdown`,
    master16: [
      {
        d: `M12.75 3.5L3.25 3.5C2.836 3.5 2.5 3.836 2.5 4.25L2.5 11.75C2.5 12.164 2.836 12.5 3.25 12.5L12.75 12.5C13.164 12.5 13.5 12.164 13.5 11.75L13.5 4.25C13.5 3.836 13.164 3.5 12.75 3.5Z`,
      },
      {
        d: `M11 7.25L9 9.25L7 7.25`,
      },
    ],
    master20: [
      {
        d: `M16.5 4.5L3.5 4.5C2.948 4.5 2.5 4.948 2.5 5.5L2.5 14.5C2.5 15.052 2.948 15.5 3.5 15.5L16.5 15.5C17.052 15.5 17.5 15.052 17.5 14.5L17.5 5.5C17.5 4.948 17.052 4.5 16.5 4.5Z`,
      },
      {
        d: `M14.5 9L12 11.5L9.5 9`,
      },
    ],
  });
  (EditorSelectionAndTablesMaster1612 = {
    name: `Edit`,
    master16: [
      {
        x1: 8.469,
        y1: 4.469,
        x2: 11.531,
        y2: 7.531,
      },
      {
        d: `M11.264 2.764L13.236 4.735C13.52 5.019 13.52 5.48 13.236 5.764L6.643 12.357C6.549 12.451 6.433 12.517 6.305 12.549L2.794 13.426C2.661 13.46 2.54 13.339 2.574 13.206L3.451 9.695C3.483 9.567 3.549 9.45 3.643 9.357L10.236 2.764C10.52 2.48 10.98 2.48 11.264 2.764Z`,
      },
    ],
    master20: [
      {
        x1: 10.957,
        y1: 4.957,
        x2: 15.043,
        y2: 9.043,
      },
      {
        d: `M14.207 3.207L16.793 5.793C17.183 6.184 17.183 6.817 16.793 7.207L8.214 15.786C8.074 15.926 7.897 16.021 7.703 16.059L3.368 16.926C3.193 16.961 3.038 16.807 3.073 16.632L3.941 12.297C3.979 12.103 4.074 11.926 4.214 11.786L12.793 3.207C13.183 2.817 13.817 2.817 14.207 3.207Z`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster16 = {
    name: `Eye`,
    master16: [
      {
        cx: 8,
        cy: 8,
        r: 2,
      },
      {
        d: `M2.136 7.319C2.924 6.062 4.908 3.5 8 3.5C11.092 3.5 13.076 6.062 13.864 7.319C14.127 7.74 14.127 8.26 13.864 8.681C13.076 9.938 11.092 12.5 8 12.5C4.908 12.5 2.924 9.938 2.136 8.681C1.873 8.26 1.873 7.74 2.136 7.319Z`,
      },
    ],
    master20: [
      {
        cx: 10,
        cy: 10,
        r: 2.5,
      },
      {
        d: `M2.759 9.139C3.767 7.592 6.251 4.5 10 4.5C13.749 4.5 16.233 7.592 17.241 9.139C17.585 9.667 17.585 10.333 17.241 10.861C16.233 12.408 13.749 15.5 10 15.5C6.251 15.5 3.767 12.408 2.759 10.861C2.415 10.333 2.415 9.667 2.759 9.139Z`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster162 = {
    name: `EyeSlash`,
    master16: [
      {
        x1: 2.5,
        y1: 2.5,
        x2: 13.5,
        y2: 13.5,
      },
      {
        d: `M3 6.132C2.631 6.571 2.343 7 2.136 7.319C1.873 7.739 1.873 8.261 2.136 8.681C2.924 9.939 4.908 12.5 8 12.5C8.533 12.5 9.033 12.424 9.5 12.292M6.5 3.709C6.967 3.576 7.467 3.5 8 3.5C11.092 3.5 13.076 6.062 13.864 7.32C14.127 7.74 14.127 8.261 13.864 8.682C13.657 9.011 13.369 9.43 13 9.868`,
      },
    ],
    master20: [
      {
        d: `M10.5 7.55C11.48 7.749 12.251 8.52 12.45 9.5M9.5 12.45C8.52 12.251 7.749 11.479 7.55 10.5`,
      },
      {
        x1: 2.5,
        y1: 2.5,
        x2: 17.5,
        y2: 17.5,
      },
      {
        d: `M4.018 7.5C3.475 8.101 3.054 8.687 2.759 9.14C2.415 9.667 2.415 10.333 2.759 10.861C3.767 12.408 6.251 15.5 10 15.5C10.713 15.5 11.38 15.388 12 15.197M8 4.804C8.62 4.612 9.287 4.5 10 4.5C13.749 4.5 16.233 7.592 17.241 9.14C17.585 9.667 17.585 10.333 17.241 10.861C16.946 11.313 16.525 11.899 15.982 12.5`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster163 = {
    name: `Info`,
    master16: [
      {
        cx: 8,
        cy: 8,
        r: 5.5,
      },
      {
        d: `M7 7.5L8 7.5L8 10.5L6.5 10.5M9.5 10.5L8 10.5`,
      },
      {
        cx: 8,
        cy: 5.301,
        r: 0.25,
      },
    ],
    master20: [
      {
        cx: 10,
        cy: 10,
        r: 7,
      },
      {
        d: `M8.5 9.5L10 9.5L10 13L8.5 13M11.5 13L10 13`,
      },
      {
        d: `M10.75 7.25C10.75 7.664 10.414 8 10 8C9.586 8 9.25 7.664 9.25 7.25C9.25 6.836 9.586 6.5 10 6.5C10.414 6.5 10.75 6.836 10.75 7.25Z`,
        filled: `only`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster164 = {
    name: `Lightning`,
    master16: [
      {
        d: `M9.403 3.454L8.5 6.5L11.696 6.5C12.324 6.5 12.674 7.226 12.283 7.717L7.904 13.227C7.77 13.394 7.611 13.478 7.452 13.505C7.123 13.562 6.77 13.378 6.628 13.076C6.559 12.931 6.537 12.752 6.597 12.547L7.5 9.5L4.304 9.5C3.676 9.5 3.326 8.775 3.717 8.284L8.096 2.774C8.23 2.607 8.389 2.523 8.548 2.495C8.876 2.44 9.229 2.623 9.372 2.924C9.441 3.07 9.463 3.249 9.403 3.454Z`,
      },
    ],
    master20: [
      {
        d: `M11.546 3.794L10.75 7.5L15.27 7.5C16.09 7.5 16.562 8.433 16.075 9.093L10.236 17C9.597 17.876 8.227 17.259 8.454 16.206L9.25 12.5L4.73 12.5C3.91 12.5 3.438 11.566 3.925 10.906L9.764 3C10.403 2.124 11.773 2.741 11.546 3.794Z`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster165 = {
    name: `ListBullet`,
    master16: [
      {
        d: `M3 7.5C3.276 7.5 3.5 7.724 3.5 8C3.5 8.276 3.276 8.5 3 8.5C2.724 8.5 2.5 8.276 2.5 8C2.5 7.737 2.703 7.522 2.96 7.502`,
      },
      {
        d: `M3 12C3.276 12 3.5 12.224 3.5 12.5C3.5 12.776 3.276 13 3 13C2.724 13 2.5 12.776 2.5 12.5C2.5 12.237 2.703 12.022 2.96 12`,
      },
      {
        d: `M3 3C3.276 3 3.5 3.224 3.5 3.5C3.5 3.776 3.276 4 3 4C2.724 4 2.5 3.776 2.5 3.5C2.5 3.237 2.703 3.022 2.96 3`,
      },
      {
        x1: 6.5,
        y1: 8,
        x2: 13.5,
        y2: 8,
      },
      {
        x1: 6.5,
        y1: 12.5,
        x2: 13.5,
        y2: 12.5,
      },
      {
        x1: 6.5,
        y1: 3.5,
        x2: 13.5,
        y2: 3.5,
      },
    ],
    master20: [
      {
        x1: 8.5,
        y1: 4.5,
        x2: 16.5,
        y2: 4.5,
      },
      {
        x1: 8.5,
        y1: 10,
        x2: 16.5,
        y2: 10,
      },
      {
        x1: 8.5,
        y1: 15.5,
        x2: 16.5,
        y2: 15.5,
      },
      {
        d: `M4 9.5C4.276 9.5 4.5 9.724 4.5 10C4.5 10.276 4.276 10.5 4 10.5C3.724 10.5 3.5 10.276 3.5 10C3.5 9.737 3.703 9.522 3.96 9.502`,
      },
      {
        d: `M4 15C4.276 15 4.5 15.224 4.5 15.5C4.5 15.776 4.276 16 4 16C3.724 16 3.5 15.776 3.5 15.5C3.5 15.237 3.703 15.022 3.96 15`,
      },
      {
        d: `M4 4C4.276 4 4.5 4.224 4.5 4.5C4.5 4.776 4.276 5 4 5C3.724 5 3.5 4.776 3.5 4.5C3.5 4.237 3.703 4.022 3.96 4`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster166 = {
    name: `ListNumbered`,
    master16: [
      {
        d: `M2.5 3.75L3.5 3L3.5 6.5L2.5 6.5M4.5 6.5L3.5 6.5`,
      },
      {
        d: `M4.5 12.5L2.5 12.5C2.5 12.167 2.7 11.55 3.5 11.15C3.95 10.9 4.2 10.675 4.338 10.481C4.475 10.287 4.5 10.125 4.5 10C4.5 9.35 4 9 3.5 9C3.25 9 3.025 9.063 2.85 9.188C2.675 9.312 2.55 9.5 2.5 9.75`,
      },
      {
        x1: 6.5,
        y1: 8,
        x2: 13.5,
        y2: 8,
      },
      {
        x1: 6.5,
        y1: 12.5,
        x2: 13.5,
        y2: 12.5,
      },
      {
        x1: 6.5,
        y1: 3.5,
        x2: 13.5,
        y2: 3.5,
      },
    ],
    master20: [
      {
        x1: 16.5,
        y1: 10,
        x2: 9.5,
        y2: 10,
      },
      {
        x1: 16.5,
        y1: 15.5,
        x2: 9.5,
        y2: 15.5,
      },
      {
        x1: 16.5,
        y1: 4.5,
        x2: 9.5,
        y2: 4.5,
      },
      {
        d: `M3.5 4.5L5 3.5L5 8.5L3.5 8.5M6.5 8.5L5 8.5`,
      },
      {
        d: `M3.5 16.5L5.5 16.5L6.5 16.5`,
      },
      {
        d: `M3.5 16.5C3.531 15.875 3.719 15.449 3.986 15.137C4.254 14.824 4.602 14.625 4.953 14.453C5.305 14.281 5.66 14.137 5.943 13.934C6.227 13.73 6.437 13.469 6.5 13.062C6.619 12.286 6.036 11.5 5 11.5C4.609 11.5 4.299 11.611 4.065 11.791C3.831 11.972 3.673 12.222 3.585 12.5`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster167 = {
    name: `Search`,
    master16: [
      {
        cx: 7,
        cy: 7,
        r: 4.5,
      },
      {
        x1: 10.5,
        y1: 10.5,
        x2: 13.5,
        y2: 13.5,
      },
    ],
    master20: [
      {
        cx: 8.5,
        cy: 8.5,
        r: 6,
      },
      {
        x1: 12.75,
        y1: 12.75,
        x2: 17.5,
        y2: 17.5,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster168 = {
    name: `Spreadsheet`,
    master16: [
      {
        d: `M3.25 3.5L5.5 3.5L12.75 3.5C13.164 3.5 13.5 3.836 13.5 4.25L13.5 6.5L5.5 6.5L5.5 3.5M12.75 12.5L5.5 12.5L3.25 12.5C2.836 12.5 2.5 12.164 2.5 11.75L2.5 6.5L2.5 4.25C2.5 3.836 2.836 3.5 3.25 3.5M2.5 6.5L5.5 6.5L5.5 12.5M12.75 12.5C13.164 12.5 13.5 12.164 13.5 11.75L13.5 6.5`,
      },
    ],
    master20: [
      {
        x1: 2.5,
        y1: 8.5,
        x2: 17.5,
        y2: 8.5,
      },
      {
        x1: 6,
        y1: 4.5,
        x2: 6,
        y2: 15.5,
      },
      {
        d: `M2.5 14.5L2.5 5.5C2.5 4.948 2.948 4.5 3.5 4.5L16.5 4.5C17.052 4.5 17.5 4.948 17.5 5.5L17.5 14.5C17.5 15.052 17.052 15.5 16.5 15.5L3.5 15.5C2.948 15.5 2.5 15.052 2.5 14.5Z`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster169 = {
    name: `Trash`,
    master16: [
      {
        d: `M13.5 5.5L12.212 5.5L11.097 12.862C11.041 13.229 10.726 13.5 10.355 13.5L5.645 13.5C5.274 13.5 4.959 13.229 4.903 12.862L3.788 5.5L2.5 5.5M6.804 2.5L9.196 2.5C9.525 2.5 9.816 2.715 9.913 3.029L10.673 5.5L5.327 5.5L6.087 3.029C6.184 2.715 6.475 2.5 6.804 2.5ZM10.673 5.5L12.212 5.5M3.788 5.5L5.327 5.5`,
      },
    ],
    master20: [
      {
        d: `M2.5 4.5L4.274 4.5L5.415 16.594C5.463 17.108 5.894 17.5 6.41 17.5L13.59 17.5C14.106 17.5 14.537 17.108 14.586 16.594L15.726 4.5L13.136 4.5L12.266 2.586C12.104 2.229 11.748 2 11.356 2L8.644 2C8.252 2 7.896 2.229 7.734 2.586L6.864 4.5L13.136 4.5M17.5 4.5L15.726 4.5M8.5 8.5L8.5 13.5M11.5 8.5L11.5 13.5M4.274 4.5L6.864 4.5`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster1610 = {
    name: `Warning`,
    master16: [
      {
        d: `M8.25 5.5L8 7.75L7.75 5.5L8.23 5.5`,
      },
      {
        d: `M7.976 9.5C7.78 9.512 7.625 9.675 7.625 9.874C7.625 10.081 7.793 10.249 8 10.249C8.207 10.249 8.375 10.081 8.375 9.874C8.375 9.675 8.22 9.512 8.024 9.5L8 9.874`,
      },
      {
        d: `M11.75 12.5L4.25 12.5C3.283 12.5 2.5 11.716 2.5 10.75L2.5 10.485C2.5 10.168 2.586 9.856 2.749 9.584L6.49 3.35C6.806 2.823 7.385 2.5 8 2.5C8.615 2.5 9.193 2.823 9.51 3.35L13.251 9.584C13.414 9.856 13.5 10.168 13.5 10.485L13.5 10.75C13.5 11.716 12.716 12.5 11.75 12.5Z`,
      },
    ],
    master20: [
      {
        d: `M10.4 7.6L10 10.4L9.6 7.6L10.38 7.6`,
      },
      {
        d: `M9.968 12.5C9.707 12.516 9.5 12.734 9.5 13C9.5 13.276 9.724 13.5 10 13.5C10.276 13.5 10.5 13.276 10.5 13C10.5 12.734 10.293 12.516 10.032 12.5L10 13`,
      },
      {
        d: `M15.25 16.501L4.75 16.501C3.507 16.501 2.5 15.493 2.5 14.251L2.5 14.146C2.5 13.724 2.619 13.311 2.842 12.953L8.162 4.441C8.528 3.856 9.169 3.501 9.858 3.501L10.141 3.501C10.831 3.501 11.472 3.856 11.837 4.441L17.158 12.953C17.381 13.311 17.5 13.724 17.5 14.146L17.5 14.251C17.5 15.493 16.493 16.501 15.25 16.501Z`,
      },
    ],
  });
  (EditorChipsAndNodeViewsMaster1611 = {
    name: `X`,
    master16: [
      {
        x1: 4.5,
        y1: 4.5,
        x2: 11.5,
        y2: 11.5,
      },
      {
        x1: 11.5,
        y1: 4.5,
        x2: 4.5,
        y2: 11.5,
      },
    ],
    master20: [
      {
        x1: 14.5,
        y1: 5.5,
        x2: 5.5,
        y2: 14.5,
      },
      {
        x1: 14.5,
        y1: 14.5,
        x2: 5.5,
        y2: 5.5,
      },
    ],
  });
  (EditorChipsAndNodeViewsDataLfileContainer = `data-lfile-container`);
  (EditorChipsAndNodeViewsDataLfileCopiedImage = `data-lfile-copied-image`);
}

export {
  EditorChipsAndNodeViewsDataLfileContainer,
  EditorChipsAndNodeViewsDataLfileCopiedImage,
  EditorChipsAndNodeViewsMaster16,
  EditorChipsAndNodeViewsMaster1610,
  EditorChipsAndNodeViewsMaster1611,
  EditorChipsAndNodeViewsMaster162,
  EditorChipsAndNodeViewsMaster163,
  EditorChipsAndNodeViewsMaster164,
  EditorChipsAndNodeViewsMaster165,
  EditorChipsAndNodeViewsMaster166,
  EditorChipsAndNodeViewsMaster167,
  EditorChipsAndNodeViewsMaster168,
  EditorChipsAndNodeViewsMaster169,
  EditorSelectionAndTablesMaster16,
  EditorSelectionAndTablesMaster1610,
  EditorSelectionAndTablesMaster1611,
  EditorSelectionAndTablesMaster1612,
  EditorSelectionAndTablesMaster162,
  EditorSelectionAndTablesMaster163,
  EditorSelectionAndTablesMaster164,
  EditorSelectionAndTablesMaster165,
  EditorSelectionAndTablesMaster166,
  EditorSelectionAndTablesMaster167,
  EditorSelectionAndTablesMaster168,
  EditorSelectionAndTablesMaster169,
  resolveEditorSelectionAndTablesAllowTableNodeSelection,
  resolveEditorSelectionAndTablesHandleWidth,
};

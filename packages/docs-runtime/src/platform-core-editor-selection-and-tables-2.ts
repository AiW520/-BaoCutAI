/** BaoCut: editor selection and tables from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Decoration,
  DecorationSet,
  Fragment,
  NodeSelection,
  PluginKey,
  Selection,
  SelectionRange,
  Slice,
  TextSelection,
  Transform,
  keydownHandler,
} from "./platform-core-dependencies";
import {
  EditorSelectionAndTablesLeft,
  SelectingCellsPluginKey,
  getEditorSelectionAndTablesNode,
  isEditorSelectionAndTablesHead,
  resolveEditorSelectionAndTablesCell,
  resolveEditorSelectionAndTablesColspan2,
  resolveEditorSelectionAndTablesColspan3,
  resolveEditorSelectionAndTablesDepth,
  resolveEditorSelectionAndTablesDepth2,
  resolveEditorSelectionAndTablesNode,
  resolveEditorSelectionAndTablesResolve,
  resolveEditorSelectionAndTablesTableNodeTypes,
  resolveEditorSelectionAndTablesTableRole,
} from "./platform-core-editor-selection-and-tables-1";

function isEditorSelectionAndTablesHeaderCell(
  editorSelectionAndTablesHeaderCell?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let headerCell: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
    options.type.schema,
  ).header_cell;
  for (
    let index = 0;
    index < editorSelectionAndTablesHeaderCell.height;
    index++
  )
    if (
      options.nodeAt(
        editorSelectionAndTablesHeaderCell.map[
          context + index * editorSelectionAndTablesHeaderCell.width
        ],
      ).type != headerCell
    )
      return false;
  return true;
}

var EditorSelectionAndTablesRowspan: Dynamic;

var EditorSelectionAndTablesAnchor: Dynamic;

function resolveEditorSelectionAndTablesClass(
  editorSelectionAndTablesClass?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      editorSelectionAndTablesClass.selection instanceof
      (EditorSelectionAndTablesRowspan as Dynamic)
    )
  )
    return null;
  let items: Dynamic = [];
  editorSelectionAndTablesClass.selection.forEachCell(
    (
      node?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      items.push(
        Decoration.node(options, options + node.nodeSize, {
          class: `selectedCell`,
        }),
      );
    },
  );
  return DecorationSet.create(editorSelectionAndTablesClass.doc, items);
}

function isEditorSelectionAndTablesFrom(
  { $from: $from, $to: $to }: Dynamic,
  ..._extraArguments: unknown[]
) {
  if ($from.pos == $to.pos || $from.pos < $to.pos - 6) return false;
  let pos: Dynamic = $from.pos;
  let pos2: Dynamic = $to.pos;
  let depth: Dynamic = $from.depth;
  for (
    ;
    depth >= 0 && !($from.after(depth + 1) < $from.end(depth));
    depth--, pos++
  );
  for (
    let depth2: Dynamic = $to.depth;
    depth2 >= 0 && !($to.before(depth2 + 1) > $to.start(depth2));
    depth2--, pos2--
  );
  return pos == pos2 && /row|table/.test($from.node(depth).type.spec.tableRole);
}

function resolveEditorSelectionAndTablesFrom(
  { $from: $from, $to: $to }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveEditorSelectionAndTablesFromResult: Dynamic;
  let resolveEditorSelectionAndTablesFromResult2: Dynamic;
  for (let depth: Dynamic = $from.depth; depth > 0; depth--) {
    let node: Dynamic = $from.node(depth);
    if (
      node.type.spec.tableRole === `cell` ||
      node.type.spec.tableRole === `header_cell`
    ) {
      resolveEditorSelectionAndTablesFromResult = node;
      break;
    }
  }
  for (let depth: Dynamic = $to.depth; depth > 0; depth--) {
    let node: Dynamic = $to.node(depth);
    if (
      node.type.spec.tableRole === `cell` ||
      node.type.spec.tableRole === `header_cell`
    ) {
      resolveEditorSelectionAndTablesFromResult2 = node;
      break;
    }
  }
  return (
    resolveEditorSelectionAndTablesFromResult !==
      resolveEditorSelectionAndTablesFromResult2 && $to.parentOffset === 0
  );
}

function getEditorSelectionAndTablesCell(
  editorSelectionAndTablesCell?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = (options || editorSelectionAndTablesCell).selection;
  let doc: Dynamic = (options || editorSelectionAndTablesCell).doc;
  let getEditorSelectionAndTablesCellResult: Dynamic;
  let getEditorSelectionAndTablesCellResult2: Dynamic;
  if (
    selection instanceof (NodeSelection as Dynamic) &&
    (getEditorSelectionAndTablesCellResult2 =
      selection.node.type.spec.tableRole)
  ) {
    if (
      getEditorSelectionAndTablesCellResult2 == `cell` ||
      getEditorSelectionAndTablesCellResult2 == `header_cell`
    )
      getEditorSelectionAndTablesCellResult =
        EditorSelectionAndTablesRowspan.create(doc, selection.from);
    else if (getEditorSelectionAndTablesCellResult2 == `row`) {
      let resolve: Dynamic = doc.resolve(selection.from + 1);
      getEditorSelectionAndTablesCellResult =
        EditorSelectionAndTablesRowspan.rowSelection(resolve, resolve);
    } else if (!context) {
      let EditorSelectionAndTablesLeftEntry: Dynamic =
        EditorSelectionAndTablesLeft.get(selection.node);
      let total: Dynamic = selection.from + 1;
      let total2: Dynamic =
        total +
        EditorSelectionAndTablesLeftEntry.map[
          EditorSelectionAndTablesLeftEntry.width *
            EditorSelectionAndTablesLeftEntry.height -
            1
        ];
      getEditorSelectionAndTablesCellResult =
        EditorSelectionAndTablesRowspan.create(doc, total + 1, total2);
    }
  } else if (
    selection instanceof (TextSelection as Dynamic) &&
    isEditorSelectionAndTablesFrom(selection)
  ) {
    getEditorSelectionAndTablesCellResult = TextSelection.create(
      doc,
      selection.from,
    );
  } else {
    if (
      selection instanceof (TextSelection as Dynamic) &&
      resolveEditorSelectionAndTablesFrom(selection)
    ) {
      getEditorSelectionAndTablesCellResult = TextSelection.create(
        doc,
        selection.$from.start(),
        selection.$from.end(),
      );
    }
  }
  if (getEditorSelectionAndTablesCellResult) {
    (options ||= editorSelectionAndTablesCell.tr).setSelection(
      getEditorSelectionAndTablesCellResult,
    );
  }
  return options;
}

var FixTablesPluginKey: Dynamic;

function resolveEditorSelectionAndTablesChildCount2(
  editorSelectionAndTablesChildCount2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let childCount: Dynamic = editorSelectionAndTablesChildCount2.childCount;
  let childCount2: Dynamic = options.childCount;
  outer: for (let index = 0, count: Dynamic = 0; index < childCount2; index++) {
    let child: Dynamic = options.child(index);
    for (
      let count2: Dynamic = count, min = Math.min(childCount, index + 3);
      count2 < min;
      count2++
    )
      if (editorSelectionAndTablesChildCount2.child(count2) == child) {
        count = count2 + 1;
        context += child.nodeSize;
        continue outer;
      }
    dependencies(child, context);
    if (
      count < childCount &&
      editorSelectionAndTablesChildCount2.child(count).sameMarkup(child)
    ) {
      resolveEditorSelectionAndTablesChildCount2(
        editorSelectionAndTablesChildCount2.child(count),
        child,
        context + 1,
        dependencies,
      );
    } else {
      child.nodesBetween(0, child.content.size, dependencies, context + 1);
    }
    context += child.nodeSize;
  }
}

function resolveEditorSelectionAndTablesTable(
  editorSelectionAndTablesTable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveEditorSelectionAndTablesTableResult: Dynamic;
  let clearEditorSelectionAndTablesRowspan2 = (
    editorSelectionAndTablesTable2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (editorSelectionAndTablesTable2.type.spec.tableRole == `table`) {
      resolveEditorSelectionAndTablesTableResult =
        clearEditorSelectionAndTablesRowspan(
          editorSelectionAndTablesTable,
          editorSelectionAndTablesTable2,
          options2,
          resolveEditorSelectionAndTablesTableResult,
        );
    }
  };
  if (options) {
    if (options.doc != editorSelectionAndTablesTable.doc) {
      resolveEditorSelectionAndTablesChildCount2(
        options.doc,
        editorSelectionAndTablesTable.doc,
        0,
        clearEditorSelectionAndTablesRowspan2,
      );
    }
  } else {
    editorSelectionAndTablesTable.doc.descendants(
      clearEditorSelectionAndTablesRowspan2,
    );
  }
  return resolveEditorSelectionAndTablesTableResult;
}

function clearEditorSelectionAndTablesRowspan(
  clearEditorSelectionAndTablesRowspan2?: Dynamic,
  node?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(node);
  if (!EditorSelectionAndTablesLeftEntry.problems) return dependencies;
  dependencies ||= clearEditorSelectionAndTablesRowspan2.tr;
  let items: Dynamic = [];
  for (let index = 0; index < EditorSelectionAndTablesLeftEntry.height; index++)
    items.push(0);
  for (
    let index = 0;
    index < EditorSelectionAndTablesLeftEntry.problems.length;
    index++
  ) {
    let problemItem: Dynamic =
      EditorSelectionAndTablesLeftEntry.problems[index];
    if (problemItem.type == `collision`) {
      let nodeAt: Dynamic = node.nodeAt(problemItem.pos);
      if (!nodeAt) continue;
      let attrs: Dynamic = nodeAt.attrs;
      for (let index2 = 0; index2 < attrs.rowspan; index2++)
        items[problemItem.row + index2] += problemItem.n;
      dependencies.setNodeMarkup(
        dependencies.mapping.map(context + 1 + problemItem.pos),
        null,
        resolveEditorSelectionAndTablesColspan2(
          attrs,
          attrs.colspan - problemItem.n,
          problemItem.n,
        ),
      );
    } else if (problemItem.type == `missing`)
      items[problemItem.row] += problemItem.n;
    else if (problemItem.type == `overlong_rowspan`) {
      let nodeAt: Dynamic = node.nodeAt(problemItem.pos);
      if (!nodeAt) continue;
      dependencies.setNodeMarkup(
        dependencies.mapping.map(context + 1 + problemItem.pos),
        null,
        {
          ...nodeAt.attrs,
          rowspan: nodeAt.attrs.rowspan - problemItem.n,
        },
      );
    } else if (problemItem.type == `colwidth mismatch`) {
      let nodeAt: Dynamic = node.nodeAt(problemItem.pos);
      if (!nodeAt) continue;
      dependencies.setNodeMarkup(
        dependencies.mapping.map(context + 1 + problemItem.pos),
        null,
        {
          ...nodeAt.attrs,
          colwidth: problemItem.colwidth,
        },
      );
    } else if (problemItem.type == `zero_sized`) {
      let mappedMapping: Dynamic = dependencies.mapping.map(context);
      dependencies.delete(mappedMapping, mappedMapping + node.nodeSize);
    }
  }
  let clearEditorSelectionAndTablesRowspanResult: Dynamic;
  let clearEditorSelectionAndTablesRowspanResult2: Dynamic;
  for (let index = 0; index < items.length; index++)
    if (items[index]) {
      clearEditorSelectionAndTablesRowspanResult ??= index;
      clearEditorSelectionAndTablesRowspanResult2 = index;
    }
  for (
    let index = 0, total: Dynamic = context + 1;
    index < EditorSelectionAndTablesLeftEntry.height;
    index++
  ) {
    let child: Dynamic = node.child(index);
    let total2: Dynamic = total + child.nodeSize;
    let itemItem: Dynamic = items[index];
    if (itemItem > 0) {
      let label: Dynamic = `cell`;
      if (child.firstChild) {
        label = child.firstChild.type.spec.tableRole;
      }
      let items2: Dynamic = [];
      for (let index2 = 0; index2 < itemItem; index2++) {
        let andFill: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
          clearEditorSelectionAndTablesRowspan2.schema,
        )[label].createAndFill();
        if (andFill) {
          items2.push(andFill);
        }
      }
      let total3: Dynamic =
        (index == 0 ||
          clearEditorSelectionAndTablesRowspanResult == index - 1) &&
        clearEditorSelectionAndTablesRowspanResult2 == index
          ? total + 1
          : total2 - 1;
      dependencies.insert(dependencies.mapping.map(total3), items2);
    }
    total = total2;
  }
  return dependencies.setMeta(FixTablesPluginKey, {
    fixTables: true,
  });
}

function getEditorSelectionAndTablesTableStart(
  editorSelectionAndTablesTableStart?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorSelectionAndTablesTableStart.selection;
  let editorSelectionAndTablesNode: Dynamic =
    resolveEditorSelectionAndTablesNode(editorSelectionAndTablesTableStart);
  let table: Dynamic = editorSelectionAndTablesNode.node(-1);
  let tableStart: Dynamic = editorSelectionAndTablesNode.start(-1);
  let map: Dynamic = EditorSelectionAndTablesLeft.get(table);
  return {
    ...(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)
      ? map.rectBetween(
          selection.$anchorCell.pos - tableStart,
          selection.$headCell.pos - tableStart,
        )
      : map.findCell(editorSelectionAndTablesNode.pos - tableStart)),
    tableStart: tableStart,
    map: map,
    table: table,
  };
}

function collectEditorSelectionAndTablesMap(
  collectEditorSelectionAndTablesMap2: Dynamic,
  { map: map, tableStart: tableStart, table: table }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic = context > 0 ? -1 : 0;
  if (isEditorSelectionAndTablesHeaderCell(map, table, context + count)) {
    count = context == 0 || context == map.width ? null : 0;
  }
  for (let index: Dynamic = 0; index < map.height; index++) {
    let total: Dynamic = index * map.width + context;
    if (
      context > 0 &&
      context < map.width &&
      map.map[total - 1] == map.map[total]
    ) {
      let mapItem: Dynamic = map.map[total];
      let nodeAt: Dynamic = table.nodeAt(mapItem);
      collectEditorSelectionAndTablesMap2.setNodeMarkup(
        collectEditorSelectionAndTablesMap2.mapping.map(tableStart + mapItem),
        null,
        resolveEditorSelectionAndTablesColspan3(
          nodeAt.attrs,
          context - map.colCount(mapItem),
        ),
      );
      index += nodeAt.attrs.rowspan - 1;
    } else {
      let cell: Dynamic =
        count == null
          ? resolveEditorSelectionAndTablesTableNodeTypes(table.type.schema)
              .cell
          : table.nodeAt(map.map[total + count]).type;
      let positionAt: Dynamic = map.positionAt(index, context, table);
      collectEditorSelectionAndTablesMap2.insert(
        collectEditorSelectionAndTablesMap2.mapping.map(
          tableStart + positionAt,
        ),
        cell.createAndFill(),
      );
    }
  }
  return collectEditorSelectionAndTablesMap2;
}

function isEditorSelectionAndTablesLeft(
  editorSelectionAndTablesLeft?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesLeft))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(editorSelectionAndTablesLeft);
    options(
      collectEditorSelectionAndTablesMap(
        editorSelectionAndTablesLeft.tr,
        editorSelectionAndTablesTableStart,
        editorSelectionAndTablesTableStart.left,
      ),
    );
  }
  return true;
}

function isEditorSelectionAndTablesRight(
  editorSelectionAndTablesRight?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesRight))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(editorSelectionAndTablesRight);
    options(
      collectEditorSelectionAndTablesMap(
        editorSelectionAndTablesRight.tr,
        editorSelectionAndTablesTableStart,
        editorSelectionAndTablesTableStart.right,
      ),
    );
  }
  return true;
}

function clearEditorSelectionAndTablesMap(
  clearEditorSelectionAndTablesMap3: Dynamic,
  { map: map, table: table, tableStart: tableStart }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let mapsCount: Dynamic =
    clearEditorSelectionAndTablesMap3.mapping.maps.length;
  for (let count: Dynamic = 0; count < map.height; ) {
    let total: Dynamic = count * map.width + context;
    let mapItem: Dynamic = map.map[total];
    let nodeAt: Dynamic = table.nodeAt(mapItem);
    let attrs: Dynamic = nodeAt.attrs;
    if (
      (context > 0 && map.map[total - 1] == mapItem) ||
      (context < map.width - 1 && map.map[total + 1] == mapItem)
    )
      clearEditorSelectionAndTablesMap3.setNodeMarkup(
        clearEditorSelectionAndTablesMap3.mapping
          .slice(mapsCount)
          .map(tableStart + mapItem),
        null,
        resolveEditorSelectionAndTablesColspan2(
          attrs,
          context - map.colCount(mapItem),
        ),
      );
    else {
      let mappedMappingSlice: Dynamic =
        clearEditorSelectionAndTablesMap3.mapping
          .slice(mapsCount)
          .map(tableStart + mapItem);
      clearEditorSelectionAndTablesMap3.delete(
        mappedMappingSlice,
        mappedMappingSlice + nodeAt.nodeSize,
      );
    }
    count += attrs.rowspan;
  }
}

function isEditorSelectionAndTablesNoTableFound(
  editorSelectionAndTablesNoTableFound?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesNoTableFound))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(
        editorSelectionAndTablesNoTableFound,
      );
    let tr2: Dynamic = editorSelectionAndTablesNoTableFound.tr;
    if (
      editorSelectionAndTablesTableStart.left == 0 &&
      editorSelectionAndTablesTableStart.right ==
        editorSelectionAndTablesTableStart.map.width
    )
      return false;
    for (
      let difference = editorSelectionAndTablesTableStart.right - 1;
      clearEditorSelectionAndTablesMap(
        tr2,
        editorSelectionAndTablesTableStart,
        difference,
      ),
        difference != editorSelectionAndTablesTableStart.left;
      difference--
    ) {
      let nodeAt: Dynamic = editorSelectionAndTablesTableStart.tableStart
        ? tr2.doc.nodeAt(editorSelectionAndTablesTableStart.tableStart - 1)
        : tr2.doc;
      if (!nodeAt) throw RangeError(`No table found`);
      editorSelectionAndTablesTableStart.table = nodeAt;
      editorSelectionAndTablesTableStart.map =
        EditorSelectionAndTablesLeft.get(nodeAt);
    }
    options(tr2);
  }
  return true;
}

function isEditorSelectionAndTablesHeaderCell2(
  editorSelectionAndTablesHeaderCell2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let headerCell: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
    options.type.schema,
  ).header_cell;
  for (
    let index = 0;
    index < editorSelectionAndTablesHeaderCell2.width;
    index++
  )
    if (
      options.nodeAt(
        editorSelectionAndTablesHeaderCell2.map[
          index + context * editorSelectionAndTablesHeaderCell2.width
        ],
      )?.type != headerCell
    )
      return false;
  return true;
}

function resolveEditorSelectionAndTablesMap(
  editorSelectionAndTablesMap: Dynamic,
  { map: map, tableStart: tableStart, table: table }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let tableStart2: Dynamic = tableStart;
  for (let index = 0; index < context; index++)
    tableStart2 += table.child(index).nodeSize;
  let items: Dynamic = [];
  let count: Dynamic = context > 0 ? -1 : 0;
  if (isEditorSelectionAndTablesHeaderCell2(map, table, context + count)) {
    count = context == 0 || context == map.height ? null : 0;
  }
  for (
    let index: Dynamic = 0, amount: Dynamic = map.width * context;
    index < map.width;
    index++, amount++
  )
    if (
      context > 0 &&
      context < map.height &&
      map.map[amount] == map.map[amount - map.width]
    ) {
      let mapItem: Dynamic = map.map[amount];
      let attrs: Dynamic = table.nodeAt(mapItem).attrs;
      editorSelectionAndTablesMap.setNodeMarkup(tableStart + mapItem, null, {
        ...attrs,
        rowspan: attrs.rowspan + 1,
      });
      index += attrs.colspan - 1;
    } else {
      let andFill: Dynamic = (
        count == null
          ? resolveEditorSelectionAndTablesTableNodeTypes(table.type.schema)
              .cell
          : table.nodeAt(map.map[amount + count * map.width])?.type
      )?.createAndFill();
      if (andFill) {
        items.push(andFill);
      }
    }
  editorSelectionAndTablesMap.insert(
    tableStart2,
    resolveEditorSelectionAndTablesTableNodeTypes(table.type.schema).row.create(
      null,
      items,
    ),
  );
  return editorSelectionAndTablesMap;
}

function isEditorSelectionAndTablesValue(
  editorSelectionAndTablesValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesValue))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(editorSelectionAndTablesValue);
    options(
      resolveEditorSelectionAndTablesMap(
        editorSelectionAndTablesValue.tr,
        editorSelectionAndTablesTableStart,
        editorSelectionAndTablesTableStart.top,
      ),
    );
  }
  return true;
}

function isEditorSelectionAndTablesBottom(
  editorSelectionAndTablesBottom?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesBottom))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(editorSelectionAndTablesBottom);
    options(
      resolveEditorSelectionAndTablesMap(
        editorSelectionAndTablesBottom.tr,
        editorSelectionAndTablesTableStart,
        editorSelectionAndTablesTableStart.bottom,
      ),
    );
  }
  return true;
}

function clearEditorSelectionAndTablesMap2(
  clearEditorSelectionAndTablesMap22: Dynamic,
  { map: map, table: table, tableStart: tableStart }: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let count: Dynamic = 0;
  for (let index = 0; index < context; index++)
    count += table.child(index).nodeSize;
  let total: Dynamic = count + table.child(context).nodeSize;
  let mapsCount: Dynamic =
    clearEditorSelectionAndTablesMap22.mapping.maps.length;
  clearEditorSelectionAndTablesMap22.delete(
    count + tableStart,
    total + tableStart,
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (
    let index: Dynamic = 0, amount: Dynamic = context * map.width;
    index < map.width;
    index++, amount++
  ) {
    let mapItem: Dynamic = map.map[amount];
    if (!uniqueItems.has(mapItem)) {
      uniqueItems.add(mapItem);
      if (context > 0 && mapItem == map.map[amount - map.width]) {
        let attrs: Dynamic = table.nodeAt(mapItem).attrs;
        clearEditorSelectionAndTablesMap22.setNodeMarkup(
          clearEditorSelectionAndTablesMap22.mapping
            .slice(mapsCount)
            .map(mapItem + tableStart),
          null,
          {
            ...attrs,
            rowspan: attrs.rowspan - 1,
          },
        );
        index += attrs.colspan - 1;
      } else if (
        context < map.height &&
        mapItem == map.map[amount + map.width]
      ) {
        let nodeAt: Dynamic = table.nodeAt(mapItem);
        let attrs: Dynamic = nodeAt.attrs;
        let create2: Dynamic = nodeAt.type.create(
          {
            ...attrs,
            rowspan: nodeAt.attrs.rowspan - 1,
          },
          nodeAt.content,
        );
        let positionAt: Dynamic = map.positionAt(context + 1, index, table);
        clearEditorSelectionAndTablesMap22.insert(
          clearEditorSelectionAndTablesMap22.mapping
            .slice(mapsCount)
            .map(tableStart + positionAt),
          create2,
        );
        index += attrs.colspan - 1;
      }
    }
  }
}

function isEditorSelectionAndTablesNoTableFound2(
  editorSelectionAndTablesNoTableFound2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesNoTableFound2))
    return false;
  if (options) {
    let editorSelectionAndTablesTableStart: Dynamic =
      getEditorSelectionAndTablesTableStart(
        editorSelectionAndTablesNoTableFound2,
      );
    let tr2: Dynamic = editorSelectionAndTablesNoTableFound2.tr;
    if (
      editorSelectionAndTablesTableStart.top == 0 &&
      editorSelectionAndTablesTableStart.bottom ==
        editorSelectionAndTablesTableStart.map.height
    )
      return false;
    for (
      let difference = editorSelectionAndTablesTableStart.bottom - 1;
      clearEditorSelectionAndTablesMap2(
        tr2,
        editorSelectionAndTablesTableStart,
        difference,
      ),
        difference != editorSelectionAndTablesTableStart.top;
      difference--
    ) {
      let nodeAt: Dynamic = editorSelectionAndTablesTableStart.tableStart
        ? tr2.doc.nodeAt(editorSelectionAndTablesTableStart.tableStart - 1)
        : tr2.doc;
      if (!nodeAt) throw RangeError(`No table found`);
      editorSelectionAndTablesTableStart.table = nodeAt;
      editorSelectionAndTablesTableStart.map = EditorSelectionAndTablesLeft.get(
        editorSelectionAndTablesTableStart.table,
      );
    }
    options(tr2);
  }
  return true;
}

function resolveEditorSelectionAndTablesContent(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let content: Dynamic = node.content;
  return (
    content.childCount == 1 &&
    content.child(0).isTextblock &&
    content.child(0).childCount == 0
  );
}

function isEditorSelectionAndTablesWidth(
  { width: width, height: height, map: map }: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let total: Dynamic = options.top * width + options.left;
  let total2: Dynamic = total;
  let total3: Dynamic = (options.bottom - 1) * width + options.left;
  let total4: Dynamic = total + (options.right - options.left - 1);
  for (let top: Dynamic = options.top; top < options.bottom; top++) {
    if (
      (options.left > 0 && map[total2] == map[total2 - 1]) ||
      (options.right < width && map[total4] == map[total4 + 1])
    )
      return true;
    total2 += width;
    total4 += width;
  }
  for (let left: Dynamic = options.left; left < options.right; left++) {
    if (
      (options.top > 0 && map[total] == map[total - width]) ||
      (options.bottom < height && map[total3] == map[total3 + width])
    )
      return true;
    total++;
    total3++;
  }
  return false;
}

function isEditorSelectionAndTablesMap(
  editorSelectionAndTablesMap?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let selection: Dynamic = editorSelectionAndTablesMap.selection;
  if (
    !(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) ||
    selection.$anchorCell.pos == selection.$headCell.pos
  )
    return false;
  let editorSelectionAndTablesTableStart: Dynamic =
    getEditorSelectionAndTablesTableStart(editorSelectionAndTablesMap);
  let { map: editorSelectionAndTablesTableStart2 }: Dynamic =
    editorSelectionAndTablesTableStart;
  if (
    isEditorSelectionAndTablesWidth(
      editorSelectionAndTablesTableStart2,
      editorSelectionAndTablesTableStart,
    )
  )
    return false;
  if (options) {
    let tr2: Dynamic = editorSelectionAndTablesMap.tr;
    let record2: Dynamic = {};
    let empty: Dynamic = Fragment.empty;
    let isEditorSelectionAndTablesMapResult: Dynamic;
    let node: Dynamic;
    for (
      let top: Dynamic = editorSelectionAndTablesTableStart.top;
      top < editorSelectionAndTablesTableStart.bottom;
      top++
    )
      for (
        let left: Dynamic = editorSelectionAndTablesTableStart.left;
        left < editorSelectionAndTablesTableStart.right;
        left++
      ) {
        let mapItem: Dynamic =
          editorSelectionAndTablesTableStart2.map[
            top * editorSelectionAndTablesTableStart2.width + left
          ];
        let nodeAt: Dynamic =
          editorSelectionAndTablesTableStart.table.nodeAt(mapItem);
        if (!(record2[mapItem] || !nodeAt))
          if (
            ((record2[mapItem] = true),
            isEditorSelectionAndTablesMapResult == null)
          ) {
            isEditorSelectionAndTablesMapResult = mapItem;
            node = nodeAt;
          } else {
            if (!resolveEditorSelectionAndTablesContent(nodeAt)) {
              empty = empty.append(nodeAt.content);
            }
            let mappedMapping: Dynamic = tr2.mapping.map(
              mapItem + editorSelectionAndTablesTableStart.tableStart,
            );
            tr2.delete(mappedMapping, mappedMapping + nodeAt.nodeSize);
          }
      }
    if (isEditorSelectionAndTablesMapResult == null || node == null)
      return true;
    tr2.setNodeMarkup(
      isEditorSelectionAndTablesMapResult +
        editorSelectionAndTablesTableStart.tableStart,
      null,
      {
        ...resolveEditorSelectionAndTablesColspan3(
          node.attrs,
          node.attrs.colspan,
          editorSelectionAndTablesTableStart.right -
            editorSelectionAndTablesTableStart.left -
            node.attrs.colspan,
        ),
        rowspan:
          editorSelectionAndTablesTableStart.bottom -
          editorSelectionAndTablesTableStart.top,
      },
    );
    if (empty.size > 0) {
      let total: Dynamic =
        isEditorSelectionAndTablesMapResult + 1 + node.content.size;
      let total2: Dynamic = resolveEditorSelectionAndTablesContent(node)
        ? isEditorSelectionAndTablesMapResult + 1
        : total;
      tr2.replaceWith(
        total2 + editorSelectionAndTablesTableStart.tableStart,
        total + editorSelectionAndTablesTableStart.tableStart,
        empty,
      );
    }
    tr2.setSelection(
      new (EditorSelectionAndTablesRowspan as Dynamic)(
        tr2.doc.resolve(
          isEditorSelectionAndTablesMapResult +
            editorSelectionAndTablesTableStart.tableStart,
        ),
      ),
    );
    options(tr2);
  }
  return true;
}

function resolveEditorSelectionAndTablesNode2(
  editorSelectionAndTablesNode2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesTableNodeTypes: Dynamic =
    resolveEditorSelectionAndTablesTableNodeTypes(
      editorSelectionAndTablesNode2.schema,
    );
  return isEditorSelectionAndTablesRowspan(
    ({ node: node }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      editorSelectionAndTablesTableNodeTypes[node.type.spec.tableRole],
  )(editorSelectionAndTablesNode2, options);
}

function isEditorSelectionAndTablesRowspan(
  editorSelectionAndTablesRowspan?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    editorSelectionAndTablesRowspan2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let selection: Dynamic = editorSelectionAndTablesRowspan2.selection;
    let node: Dynamic;
    let isEditorSelectionAndTablesRowspanResult: Dynamic;
    if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
      if (selection.$anchorCell.pos != selection.$headCell.pos) return false;
      node = selection.$anchorCell.nodeAfter;
      isEditorSelectionAndTablesRowspanResult = selection.$anchorCell.pos;
    } else {
      node = resolveEditorSelectionAndTablesCell(selection.$from);
      if (!node) return false;
      isEditorSelectionAndTablesRowspanResult =
        resolveEditorSelectionAndTablesDepth(selection.$from)?.pos;
    }
    if (
      node == null ||
      isEditorSelectionAndTablesRowspanResult == null ||
      (node.attrs.colspan == 1 && node.attrs.rowspan == 1)
    )
      return false;
    if (options) {
      let attrs: Dynamic = node.attrs;
      let items: Dynamic = [];
      let colwidth: Dynamic = attrs.colwidth;
      if (attrs.rowspan > 1) {
        attrs = {
          ...attrs,
          rowspan: 1,
        };
      }
      if (attrs.colspan > 1) {
        attrs = {
          ...attrs,
          colspan: 1,
        };
      }
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorSelectionAndTablesRowspan2);
      let tr2: Dynamic = editorSelectionAndTablesRowspan2.tr;
      for (
        let index = 0;
        index <
        editorSelectionAndTablesTableStart.right -
          editorSelectionAndTablesTableStart.left;
        index++
      )
        items.push(
          colwidth
            ? {
                ...attrs,
                colwidth:
                  colwidth && colwidth[index] ? [colwidth[index]] : null,
              }
            : attrs,
        );
      let isEditorSelectionAndTablesRowspanResult2: Dynamic;
      for (
        let row: Dynamic = editorSelectionAndTablesTableStart.top;
        row < editorSelectionAndTablesTableStart.bottom;
        row++
      ) {
        let positionAt: Dynamic =
          editorSelectionAndTablesTableStart.map.positionAt(
            row,
            editorSelectionAndTablesTableStart.left,
            editorSelectionAndTablesTableStart.table,
          );
        if (row == editorSelectionAndTablesTableStart.top) {
          positionAt += node.nodeSize;
        }
        for (
          let col: Dynamic = editorSelectionAndTablesTableStart.left, index = 0;
          col < editorSelectionAndTablesTableStart.right;
          col++, index++
        )
          if (
            !(
              col == editorSelectionAndTablesTableStart.left &&
              row == editorSelectionAndTablesTableStart.top
            )
          ) {
            tr2.insert(
              (isEditorSelectionAndTablesRowspanResult2 = tr2.mapping.map(
                positionAt + editorSelectionAndTablesTableStart.tableStart,
                1,
              )),
              editorSelectionAndTablesRowspan({
                node: node,
                row: row,
                col: col,
              }).createAndFill(items[index]),
            );
          }
      }
      tr2.setNodeMarkup(
        isEditorSelectionAndTablesRowspanResult,
        editorSelectionAndTablesRowspan({
          node: node,
          row: editorSelectionAndTablesTableStart.top,
          col: editorSelectionAndTablesTableStart.left,
        }),
        items[0],
      );
      if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
        tr2.setSelection(
          new (EditorSelectionAndTablesRowspan as Dynamic)(
            tr2.doc.resolve(selection.$anchorCell.pos),
            isEditorSelectionAndTablesRowspanResult2
              ? tr2.doc.resolve(isEditorSelectionAndTablesRowspanResult2)
              : undefined,
          ),
        );
      }
      options(tr2);
    }
    return true;
  };
}

function isEditorSelectionAndTablesAttrs(
  editorSelectionAndTables?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return function (
    editorSelectionAndTables2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!isEditorSelectionAndTablesHead(editorSelectionAndTables2))
      return false;
    let editorSelectionAndTablesNode: Dynamic =
      resolveEditorSelectionAndTablesNode(editorSelectionAndTables2);
    if (
      editorSelectionAndTablesNode.nodeAfter.attrs[editorSelectionAndTables] ===
      options
    )
      return false;
    if (options2) {
      let tr2: Dynamic = editorSelectionAndTables2.tr;
      if (
        editorSelectionAndTables2.selection instanceof
        (EditorSelectionAndTablesRowspan as Dynamic)
      ) {
        editorSelectionAndTables2.selection.forEachCell(
          (
            editorSelectionAndTables3?: Dynamic,
            options3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              editorSelectionAndTables3.attrs[editorSelectionAndTables] !==
              options
            ) {
              tr2.setNodeMarkup(options3, null, {
                ...editorSelectionAndTables3.attrs,
                [editorSelectionAndTables]: options,
              });
            }
          },
        );
      } else {
        tr2.setNodeMarkup(editorSelectionAndTablesNode.pos, null, {
          ...editorSelectionAndTablesNode.nodeAfter.attrs,
          [editorSelectionAndTables]: options,
        });
      }
      options2(tr2);
    }
    return true;
  };
}

function isEditorSelectionAndTablesLeft2(
  editorSelectionAndTablesLeft2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return function (
    editorSelectionAndTablesLeft22?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesLeft22))
      return false;
    if (options) {
      let editorSelectionAndTablesTableNodeTypes: Dynamic =
        resolveEditorSelectionAndTablesTableNodeTypes(
          editorSelectionAndTablesLeft22.schema,
        );
      let editorSelectionAndTablesTableStart: Dynamic =
        getEditorSelectionAndTablesTableStart(editorSelectionAndTablesLeft22);
      let tr2: Dynamic = editorSelectionAndTablesLeft22.tr;
      let cellsInRect: Dynamic =
        editorSelectionAndTablesTableStart.map.cellsInRect(
          editorSelectionAndTablesLeft2 == `column`
            ? {
                left: editorSelectionAndTablesTableStart.left,
                top: 0,
                right: editorSelectionAndTablesTableStart.right,
                bottom: editorSelectionAndTablesTableStart.map.height,
              }
            : editorSelectionAndTablesLeft2 == `row`
              ? {
                  left: 0,
                  top: editorSelectionAndTablesTableStart.top,
                  right: editorSelectionAndTablesTableStart.map.width,
                  bottom: editorSelectionAndTablesTableStart.bottom,
                }
              : editorSelectionAndTablesTableStart,
        );
      let mappedCellsInRect: Dynamic = cellsInRect.map(
        (cellsInRect2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          editorSelectionAndTablesTableStart.table.nodeAt(cellsInRect2),
      );
      for (let index = 0; index < cellsInRect.length; index++)
        if (
          mappedCellsInRect[index].type ==
          editorSelectionAndTablesTableNodeTypes.header_cell
        ) {
          tr2.setNodeMarkup(
            editorSelectionAndTablesTableStart.tableStart + cellsInRect[index],
            editorSelectionAndTablesTableNodeTypes.cell,
            mappedCellsInRect[index].attrs,
          );
        }
      if (tr2.steps.length === 0)
        for (let index = 0; index < cellsInRect.length; index++)
          tr2.setNodeMarkup(
            editorSelectionAndTablesTableStart.tableStart + cellsInRect[index],
            editorSelectionAndTablesTableNodeTypes.header_cell,
            mappedCellsInRect[index].attrs,
          );
      options(tr2);
    }
    return true;
  };
}

function isEditorSelectionAndTablesLeft3(
  editorSelectionAndTablesLeft3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let cellsInRect: Dynamic = options.map.cellsInRect({
    left: 0,
    top: 0,
    right: editorSelectionAndTablesLeft3 == `row` ? options.map.width : 1,
    bottom: editorSelectionAndTablesLeft3 == `column` ? options.map.height : 1,
  });
  for (let index = 0; index < cellsInRect.length; index++) {
    let nodeAt: Dynamic = options.table.nodeAt(cellsInRect[index]);
    if (nodeAt && nodeAt.type !== context.header_cell) return false;
  }
  return true;
}

function isEditorSelectionAndTablesUseDeprecatedLogic(
  editorSelectionAndTablesUseDeprecatedLogic?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  options ||= {
    useDeprecatedLogic: false,
  };
  return options.useDeprecatedLogic
    ? isEditorSelectionAndTablesLeft2(
        editorSelectionAndTablesUseDeprecatedLogic,
      )
    : function (
        editorSelectionAndTablesUseDeprecatedLogic2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        if (
          !isEditorSelectionAndTablesHead(
            editorSelectionAndTablesUseDeprecatedLogic2,
          )
        )
          return false;
        if (options2) {
          let editorSelectionAndTablesTableNodeTypes: Dynamic =
            resolveEditorSelectionAndTablesTableNodeTypes(
              editorSelectionAndTablesUseDeprecatedLogic2.schema,
            );
          let editorSelectionAndTablesTableStart: Dynamic =
            getEditorSelectionAndTablesTableStart(
              editorSelectionAndTablesUseDeprecatedLogic2,
            );
          let tr2: Dynamic = editorSelectionAndTablesUseDeprecatedLogic2.tr;
          let isEditorSelectionAndTablesLeft32 =
            isEditorSelectionAndTablesLeft3(
              `row`,
              editorSelectionAndTablesTableStart,
              editorSelectionAndTablesTableNodeTypes,
            );
          let isEditorSelectionAndTablesLeft33 =
            isEditorSelectionAndTablesLeft3(
              `column`,
              editorSelectionAndTablesTableStart,
              editorSelectionAndTablesTableNodeTypes,
            );
          let top = (
            editorSelectionAndTablesUseDeprecatedLogic === `column`
              ? isEditorSelectionAndTablesLeft32
              : editorSelectionAndTablesUseDeprecatedLogic === `row` &&
                isEditorSelectionAndTablesLeft33
          )
            ? 1
            : 0;
          let record2: Dynamic =
            editorSelectionAndTablesUseDeprecatedLogic == `column`
              ? {
                  left: 0,
                  top: top,
                  right: 1,
                  bottom: editorSelectionAndTablesTableStart.map.height,
                }
              : editorSelectionAndTablesUseDeprecatedLogic == `row`
                ? {
                    left: top,
                    top: 0,
                    right: editorSelectionAndTablesTableStart.map.width,
                    bottom: 1,
                  }
                : editorSelectionAndTablesTableStart;
          let cell: Dynamic =
            editorSelectionAndTablesUseDeprecatedLogic == `column`
              ? isEditorSelectionAndTablesLeft33
                ? editorSelectionAndTablesTableNodeTypes.cell
                : editorSelectionAndTablesTableNodeTypes.header_cell
              : editorSelectionAndTablesUseDeprecatedLogic == `row`
                ? isEditorSelectionAndTablesLeft32
                  ? editorSelectionAndTablesTableNodeTypes.cell
                  : editorSelectionAndTablesTableNodeTypes.header_cell
                : editorSelectionAndTablesTableNodeTypes.cell;
          editorSelectionAndTablesTableStart.map
            .cellsInRect(record2)
            .forEach(
              (
                cellsInRect?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let total: Dynamic =
                  cellsInRect + editorSelectionAndTablesTableStart.tableStart;
                let nodeAt: Dynamic = tr2.doc.nodeAt(total);
                if (nodeAt) {
                  tr2.setNodeMarkup(total, cell, nodeAt.attrs);
                }
              },
            );
          options2(tr2);
        }
        return true;
      };
}

var EditorSelectionAndTablesUseDeprecatedLogic: Dynamic;

function resolveEditorSelectionAndTablesNodeBefore(
  editorSelectionAndTablesNodeBefore?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options < 0) {
    let nodeBefore: Dynamic = editorSelectionAndTablesNodeBefore.nodeBefore;
    if (nodeBefore)
      return editorSelectionAndTablesNodeBefore.pos - nodeBefore.nodeSize;
    for (
      let difference = editorSelectionAndTablesNodeBefore.index(-1) - 1,
        before: Dynamic = editorSelectionAndTablesNodeBefore.before();
      difference >= 0;
      difference--
    ) {
      let child: Dynamic = editorSelectionAndTablesNodeBefore
        .node(-1)
        .child(difference);
      let lastChild: Dynamic = child.lastChild;
      if (lastChild) return before - 1 - lastChild.nodeSize;
      before -= child.nodeSize;
    }
  } else {
    if (
      editorSelectionAndTablesNodeBefore.index() <
      editorSelectionAndTablesNodeBefore.parent.childCount - 1
    )
      return (
        editorSelectionAndTablesNodeBefore.pos +
        editorSelectionAndTablesNodeBefore.nodeAfter.nodeSize
      );
    let node: Dynamic = editorSelectionAndTablesNodeBefore.node(-1);
    for (
      let indexAfter: Dynamic =
          editorSelectionAndTablesNodeBefore.indexAfter(-1),
        after: Dynamic = editorSelectionAndTablesNodeBefore.after();
      indexAfter < node.childCount;
      indexAfter++
    ) {
      let child: Dynamic = node.child(indexAfter);
      if (child.childCount) return after + 1;
      after += child.nodeSize;
    }
  }
  return null;
}

function isEditorSelectionAndTablesResolve(
  editorSelectionAndTablesResolve?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return function (
    editorSelectionAndTablesResolve2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesResolve2))
      return false;
    let editorSelectionAndTablesNodeBefore: Dynamic =
      resolveEditorSelectionAndTablesNodeBefore(
        resolveEditorSelectionAndTablesNode(editorSelectionAndTablesResolve2),
        editorSelectionAndTablesResolve,
      );
    if (editorSelectionAndTablesNodeBefore == null) return false;
    if (options) {
      let resolve: Dynamic = editorSelectionAndTablesResolve2.doc.resolve(
        editorSelectionAndTablesNodeBefore,
      );
      options(
        editorSelectionAndTablesResolve2.tr
          .setSelection(
            TextSelection.between(
              resolve,
              resolveEditorSelectionAndTablesResolve(resolve),
            ),
          )
          .scrollIntoView(),
      );
    }
    return true;
  };
}

function isEditorSelectionAndTablesTable(
  editorSelectionAndTablesTable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let $anchor: Dynamic = editorSelectionAndTablesTable.selection.$anchor;
  for (let depth: Dynamic = $anchor.depth; depth > 0; depth--)
    if ($anchor.node(depth).type.spec.tableRole == `table`) {
      if (options) {
        options(
          editorSelectionAndTablesTable.tr
            .delete($anchor.before(depth), $anchor.after(depth))
            .scrollIntoView(),
        );
      }
      return true;
    }
  return false;
}

function isEditorSelectionAndTablesSelection(
  editorSelectionAndTablesSelection?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let selection: Dynamic = editorSelectionAndTablesSelection.selection;
  if (!(selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)))
    return false;
  if (options) {
    let tr2: Dynamic = editorSelectionAndTablesSelection.tr;
    let content: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
      editorSelectionAndTablesSelection.schema,
    ).cell.createAndFill().content;
    selection.forEachCell(
      (
        node?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!node.content.eq(content)) {
          tr2.replace(
            tr2.mapping.map(options2 + 1),
            tr2.mapping.map(options2 + node.nodeSize - 1),
            new (Slice as Dynamic)(content, 0, 0),
          );
        }
      },
    );
    if (tr2.docChanged) {
      options(tr2);
    }
  }
  return true;
}

function resolveEditorSelectionAndTablesOpenStart(
  editorSelectionAndTablesOpenStart?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorSelectionAndTablesOpenStart.size === 0) return null;
  let {
    content: editorSelectionAndTablesOpenStart2,
    openStart: editorSelectionAndTablesOpenStart3,
    openEnd: editorSelectionAndTablesOpenStart4,
  }: Dynamic = editorSelectionAndTablesOpenStart;
  for (
    ;
    editorSelectionAndTablesOpenStart2.childCount == 1 &&
    ((editorSelectionAndTablesOpenStart3 > 0 &&
      editorSelectionAndTablesOpenStart4 > 0) ||
      editorSelectionAndTablesOpenStart2.child(0).type.spec.tableRole ==
        `table`);

  ) {
    editorSelectionAndTablesOpenStart3--;
    editorSelectionAndTablesOpenStart4--;
    editorSelectionAndTablesOpenStart2 =
      editorSelectionAndTablesOpenStart2.child(0).content;
  }
  let child: Dynamic = editorSelectionAndTablesOpenStart2.child(0);
  let tableRole: Dynamic = child.type.spec.tableRole;
  let schema: Dynamic = child.type.schema;
  let items: Dynamic = [];
  if (tableRole == `row`)
    for (
      let index = 0;
      index < editorSelectionAndTablesOpenStart2.childCount;
      index++
    ) {
      let content: Dynamic =
        editorSelectionAndTablesOpenStart2.child(index).content;
      let count = index
        ? 0
        : Math.max(0, editorSelectionAndTablesOpenStart3 - 1);
      let count2 =
        index < editorSelectionAndTablesOpenStart2.childCount - 1
          ? 0
          : Math.max(0, editorSelectionAndTablesOpenStart4 - 1);
      if (count || count2) {
        content = resolveEditorSelectionAndTablesCreateAndFill(
          resolveEditorSelectionAndTablesTableNodeTypes(schema).row,
          new (Slice as Dynamic)(content, count, count2),
        ).content;
      }
      items.push(content);
    }
  else if (tableRole == `cell` || tableRole == `header_cell`)
    items.push(
      editorSelectionAndTablesOpenStart3 || editorSelectionAndTablesOpenStart4
        ? resolveEditorSelectionAndTablesCreateAndFill(
            resolveEditorSelectionAndTablesTableNodeTypes(schema).row,
            new (Slice as Dynamic)(
              editorSelectionAndTablesOpenStart2,
              editorSelectionAndTablesOpenStart3,
              editorSelectionAndTablesOpenStart4,
            ),
          ).content
        : editorSelectionAndTablesOpenStart2,
    );
  else return null;
  return resolveEditorSelectionAndTablesRowspan(schema, items);
}

function resolveEditorSelectionAndTablesRowspan(
  editorSelectionAndTablesRowspan?: Dynamic,
  rows?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let index = 0; index < rows.length; index++) {
    let rowItem: Dynamic = rows[index];
    for (
      let difference = rowItem.childCount - 1;
      difference >= 0;
      difference--
    ) {
      let { rowspan: attrs, colspan: attrs2 }: Dynamic =
        rowItem.child(difference).attrs;
      for (let index2 = index; index2 < index + attrs; index2++)
        items[index2] = (items[index2] || 0) + attrs2;
    }
  }
  let width = 0;
  for (let index = 0; index < items.length; index++)
    width = Math.max(width, items[index]);
  for (let index = 0; index < items.length; index++)
    if (
      (index >= rows.length && rows.push(Fragment.empty), items[index] < width)
    ) {
      let andFill: Dynamic = resolveEditorSelectionAndTablesTableNodeTypes(
        editorSelectionAndTablesRowspan,
      ).cell.createAndFill();
      let items2: Dynamic = [];
      for (let itemItem: Dynamic = items[index]; itemItem < width; itemItem++)
        items2.push(andFill);
      rows[index] = rows[index].append(Fragment.from(items2));
    }
  return {
    height: rows.length,
    width: width,
    rows: rows,
  };
}

function resolveEditorSelectionAndTablesCreateAndFill(
  editorSelectionAndTablesCreateAndFill?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let andFill: Dynamic = editorSelectionAndTablesCreateAndFill.createAndFill();
  return new (Transform as Dynamic)(andFill).replace(
    0,
    andFill.content.size,
    options,
  ).doc;
}

function resolveEditorSelectionAndTablesWidth(
  { width: width, height: height, rows: rows }: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (width != options) {
    let items: Dynamic = [];
    let items2: Dynamic = [];
    for (let index = 0; index < rows.length; index++) {
      let rowItem: Dynamic = rows[index];
      let items3: Dynamic = [];
      for (
        let itemItem: Dynamic = items[index] || 0, index2 = 0;
        itemItem < options;
        index2++
      ) {
        let child: Dynamic = rowItem.child(index2 % rowItem.childCount);
        if (itemItem + child.attrs.colspan > options) {
          child = child.type.createChecked(
            resolveEditorSelectionAndTablesColspan2(
              child.attrs,
              child.attrs.colspan,
              itemItem + child.attrs.colspan - options,
            ),
            child.content,
          );
        }
        items3.push(child);
        itemItem += child.attrs.colspan;
        for (let count = 1; count < child.attrs.rowspan; count++)
          items[index + count] =
            (items[index + count] || 0) + child.attrs.colspan;
      }
      items2.push(Fragment.from(items3));
    }
    rows = items2;
    width = options;
  }
  if (height != context) {
    let items: Dynamic = [];
    for (let index = 0, index2 = 0; index < context; index++, index2++) {
      let items2: Dynamic = [];
      let rowItem: Dynamic = rows[index2 % height];
      for (let index3 = 0; index3 < rowItem.childCount; index3++) {
        let child: Dynamic = rowItem.child(index3);
        if (index + child.attrs.rowspan > context) {
          child = child.type.create(
            {
              ...child.attrs,
              rowspan: Math.max(1, context - child.attrs.rowspan),
            },
            child.content,
          );
        }
        items2.push(child);
      }
      items.push(Fragment.from(items2));
    }
    rows = items;
    height = context;
  }
  return {
    width: width,
    height: height,
    rows: rows,
  };
}

function isEditorSelectionAndTablesSchema(
  editorSelectionAndTablesSchema?: Dynamic,
  options?: Dynamic,
  node?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let schema: Dynamic = editorSelectionAndTablesSchema.doc.type.schema;
  let editorSelectionAndTablesTableNodeTypes: Dynamic =
    resolveEditorSelectionAndTablesTableNodeTypes(schema);
  let isEditorSelectionAndTablesSchemaResult: Dynamic;
  let isEditorSelectionAndTablesSchemaResult2: Dynamic;
  if (argument > options.width)
    for (let index = 0, count: Dynamic = 0; index < options.height; index++) {
      let child: Dynamic = node.child(index);
      count += child.nodeSize;
      let items: Dynamic = [];
      let isEditorSelectionAndTablesSchemaResult3: Dynamic;
      isEditorSelectionAndTablesSchemaResult3 =
        child.lastChild == null ||
        child.lastChild.type == editorSelectionAndTablesTableNodeTypes.cell
          ? (isEditorSelectionAndTablesSchemaResult ||=
              editorSelectionAndTablesTableNodeTypes.cell.createAndFill())
          : (isEditorSelectionAndTablesSchemaResult2 ||=
              editorSelectionAndTablesTableNodeTypes.header_cell.createAndFill());
      for (let width: Dynamic = options.width; width < argument; width++)
        items.push(isEditorSelectionAndTablesSchemaResult3);
      editorSelectionAndTablesSchema.insert(
        editorSelectionAndTablesSchema.mapping
          .slice(argument3)
          .map(count - 1 + dependencies),
        items,
      );
    }
  if (argument2 > options.height) {
    let items: Dynamic = [];
    for (
      let index = 0, amount = (options.height - 1) * options.width;
      index < Math.max(options.width, argument);
      index++
    ) {
      let enabled =
        index >= options.width
          ? false
          : node.nodeAt(options.map[amount + index]).type ==
            editorSelectionAndTablesTableNodeTypes.header_cell;
      items.push(
        enabled
          ? (isEditorSelectionAndTablesSchemaResult2 ||=
              editorSelectionAndTablesTableNodeTypes.header_cell.createAndFill())
          : (isEditorSelectionAndTablesSchemaResult ||=
              editorSelectionAndTablesTableNodeTypes.cell.createAndFill()),
      );
    }
    let create2: Dynamic = editorSelectionAndTablesTableNodeTypes.row.create(
      null,
      Fragment.from(items),
    );
    let items2: Dynamic = [];
    for (let height: Dynamic = options.height; height < argument2; height++)
      items2.push(create2);
    editorSelectionAndTablesSchema.insert(
      editorSelectionAndTablesSchema.mapping
        .slice(argument3)
        .map(dependencies + node.nodeSize - 2),
      items2,
    );
  }
  return !!(
    isEditorSelectionAndTablesSchemaResult ||
    isEditorSelectionAndTablesSchemaResult2
  );
}

function isEditorSelectionAndTablesTop(
  editorSelectionAndTables?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  argument4?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (argument3 == 0 || argument3 == options.height) return false;
  let enabled = false;
  for (let argument5: Dynamic = argument; argument5 < argument2; argument5++) {
    let total: Dynamic = argument3 * options.width + argument5;
    let mapItem: Dynamic = options.map[total];
    if (options.map[total - options.width] == mapItem) {
      enabled = true;
      let nodeAt: Dynamic = context.nodeAt(mapItem);
      let { top: findCell, left: findCell2 }: Dynamic =
        options.findCell(mapItem);
      editorSelectionAndTables.setNodeMarkup(
        editorSelectionAndTables.mapping
          .slice(argument4)
          .map(mapItem + dependencies),
        null,
        {
          ...nodeAt.attrs,
          rowspan: argument3 - findCell,
        },
      );
      editorSelectionAndTables.insert(
        editorSelectionAndTables.mapping
          .slice(argument4)
          .map(options.positionAt(argument3, findCell2, context)),
        nodeAt.type.createAndFill({
          ...nodeAt.attrs,
          rowspan: findCell + nodeAt.attrs.rowspan - argument3,
        }),
      );
      argument5 += nodeAt.attrs.colspan - 1;
    }
  }
  return enabled;
}

function isEditorSelectionAndTablesWidth2(
  editorSelectionAndTablesWidth2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  argument4?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (argument3 == 0 || argument3 == options.width) return false;
  let enabled = false;
  for (let argument5: Dynamic = argument; argument5 < argument2; argument5++) {
    let total: Dynamic = argument5 * options.width + argument3;
    let mapItem: Dynamic = options.map[total];
    if (options.map[total - 1] == mapItem) {
      enabled = true;
      let nodeAt: Dynamic = context.nodeAt(mapItem);
      let colCount: Dynamic = options.colCount(mapItem);
      let mappedMappingSlice: Dynamic = editorSelectionAndTablesWidth2.mapping
        .slice(argument4)
        .map(mapItem + dependencies);
      editorSelectionAndTablesWidth2.setNodeMarkup(
        mappedMappingSlice,
        null,
        resolveEditorSelectionAndTablesColspan2(
          nodeAt.attrs,
          argument3 - colCount,
          nodeAt.attrs.colspan - (argument3 - colCount),
        ),
      );
      editorSelectionAndTablesWidth2.insert(
        mappedMappingSlice + nodeAt.nodeSize,
        nodeAt.type.createAndFill(
          resolveEditorSelectionAndTablesColspan2(
            nodeAt.attrs,
            0,
            argument3 - colCount,
          ),
        ),
      );
      argument5 += nodeAt.attrs.rowspan - 1;
    }
  }
  return enabled;
}

function getEditorSelectionAndTablesTop(
  editorSelectionAndTables?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let nodeAt: Dynamic = context
    ? editorSelectionAndTables.doc.nodeAt(context - 1)
    : editorSelectionAndTables.doc;
  if (!nodeAt) throw Error(`No table found`);
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(nodeAt);
  let { top: dependencies2, left: dependencies3 }: Dynamic = dependencies;
  let total: Dynamic = dependencies3 + argument.width;
  let total2: Dynamic = dependencies2 + argument.height;
  let tr2: Dynamic = editorSelectionAndTables.tr;
  let count: Dynamic = 0;
  function getEditorSelectionAndTablesTopHandler(
    ..._extraArguments: unknown[]
  ): undefined {
    nodeAt = context ? tr2.doc.nodeAt(context - 1) : tr2.doc;
    if (!nodeAt) throw Error(`No table found`);
    EditorSelectionAndTablesLeftEntry =
      EditorSelectionAndTablesLeft.get(nodeAt);
    count = tr2.mapping.maps.length;
  }
  if (
    isEditorSelectionAndTablesSchema(
      tr2,
      EditorSelectionAndTablesLeftEntry,
      nodeAt,
      context,
      total,
      total2,
      count,
    )
  ) {
    getEditorSelectionAndTablesTopHandler();
  }
  if (
    isEditorSelectionAndTablesTop(
      tr2,
      EditorSelectionAndTablesLeftEntry,
      nodeAt,
      context,
      dependencies3,
      total,
      dependencies2,
      count,
    )
  ) {
    getEditorSelectionAndTablesTopHandler();
  }
  if (
    isEditorSelectionAndTablesTop(
      tr2,
      EditorSelectionAndTablesLeftEntry,
      nodeAt,
      context,
      dependencies3,
      total,
      total2,
      count,
    )
  ) {
    getEditorSelectionAndTablesTopHandler();
  }
  if (
    isEditorSelectionAndTablesWidth2(
      tr2,
      EditorSelectionAndTablesLeftEntry,
      nodeAt,
      context,
      dependencies2,
      total2,
      dependencies3,
      count,
    )
  ) {
    getEditorSelectionAndTablesTopHandler();
  }
  if (
    isEditorSelectionAndTablesWidth2(
      tr2,
      EditorSelectionAndTablesLeftEntry,
      nodeAt,
      context,
      dependencies2,
      total2,
      total,
      count,
    )
  ) {
    getEditorSelectionAndTablesTopHandler();
  }
  for (
    let dependencies4: Dynamic = dependencies2;
    dependencies4 < total2;
    dependencies4++
  ) {
    let positionAt: Dynamic = EditorSelectionAndTablesLeftEntry.positionAt(
      dependencies4,
      dependencies3,
      nodeAt,
    );
    let positionAt2: Dynamic = EditorSelectionAndTablesLeftEntry.positionAt(
      dependencies4,
      total,
      nodeAt,
    );
    tr2.replace(
      tr2.mapping.slice(count).map(positionAt + context),
      tr2.mapping.slice(count).map(positionAt2 + context),
      new (Slice as Dynamic)(
        argument.rows[dependencies4 - dependencies2],
        0,
        0,
      ),
    );
  }
  getEditorSelectionAndTablesTopHandler();
  tr2.setSelection(
    new (EditorSelectionAndTablesRowspan as Dynamic)(
      tr2.doc.resolve(
        context +
          EditorSelectionAndTablesLeftEntry.positionAt(
            dependencies2,
            dependencies3,
            nodeAt,
          ),
      ),
      tr2.doc.resolve(
        context +
          EditorSelectionAndTablesLeftEntry.positionAt(
            total2 - 1,
            total - 1,
            nodeAt,
          ),
      ),
    ),
  );
  options(tr2);
}

var EditorSelectionAndTablesArrowLeft: Dynamic;

function resolveEditorSelectionAndTablesSelection(
  editorSelectionAndTablesSelection?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return context.eq(editorSelectionAndTablesSelection.selection)
    ? false
    : (options &&
        options(
          editorSelectionAndTablesSelection.tr
            .setSelection(context)
            .scrollIntoView(),
        ),
      true);
}

function isEditorSelectionAndTablesHoriz(
  editorSelectionAndTablesHoriz?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    editorSelectionAndTablesHoriz2?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!context) return false;
    let selection: Dynamic = editorSelectionAndTablesHoriz2.selection;
    if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic))
      return resolveEditorSelectionAndTablesSelection(
        editorSelectionAndTablesHoriz2,
        options2,
        Selection.near(selection.$headCell, options),
      );
    if (editorSelectionAndTablesHoriz != `horiz` && !selection.empty)
      return false;
    let editorSelectionAndTablesHead: Dynamic =
      resolveEditorSelectionAndTablesHead(
        context,
        editorSelectionAndTablesHoriz,
        options,
      );
    if (editorSelectionAndTablesHead == null) return false;
    if (editorSelectionAndTablesHoriz == `horiz`)
      return resolveEditorSelectionAndTablesSelection(
        editorSelectionAndTablesHoriz2,
        options2,
        Selection.near(
          editorSelectionAndTablesHoriz2.doc.resolve(selection.head + options),
          options,
        ),
      );
    {
      let resolve: Dynamic = editorSelectionAndTablesHoriz2.doc.resolve(
        editorSelectionAndTablesHead,
      );
      let editorSelectionAndTablesNode: Dynamic =
        getEditorSelectionAndTablesNode(
          resolve,
          editorSelectionAndTablesHoriz,
          options,
        );
      let isEditorSelectionAndTablesHorizResult: Dynamic;
      isEditorSelectionAndTablesHorizResult = editorSelectionAndTablesNode
        ? Selection.near(editorSelectionAndTablesNode, 1)
        : options < 0
          ? Selection.near(
              editorSelectionAndTablesHoriz2.doc.resolve(resolve.before(-1)),
              -1,
            )
          : Selection.near(
              editorSelectionAndTablesHoriz2.doc.resolve(resolve.after(-1)),
              1,
            );
      return resolveEditorSelectionAndTablesSelection(
        editorSelectionAndTablesHoriz2,
        options2,
        isEditorSelectionAndTablesHorizResult,
      );
    }
  };
}

function isEditorSelectionAndTablesSelection2(
  editorSelectionAndTablesSelection2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    editorSelectionAndTablesSelection22?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!context) return false;
    let selection: Dynamic = editorSelectionAndTablesSelection22.selection;
    let isEditorSelectionAndTablesSelection2Result: Dynamic;
    if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic))
      isEditorSelectionAndTablesSelection2Result = selection;
    else {
      let editorSelectionAndTablesHead: Dynamic =
        resolveEditorSelectionAndTablesHead(
          context,
          editorSelectionAndTablesSelection2,
          options,
        );
      if (editorSelectionAndTablesHead == null) return false;
      isEditorSelectionAndTablesSelection2Result =
        new (EditorSelectionAndTablesRowspan as Dynamic)(
          editorSelectionAndTablesSelection22.doc.resolve(
            editorSelectionAndTablesHead,
          ),
        );
    }
    let editorSelectionAndTablesNode: Dynamic = getEditorSelectionAndTablesNode(
      isEditorSelectionAndTablesSelection2Result.$headCell,
      editorSelectionAndTablesSelection2,
      options,
    );
    return editorSelectionAndTablesNode
      ? resolveEditorSelectionAndTablesSelection(
          editorSelectionAndTablesSelection22,
          options2,
          new (EditorSelectionAndTablesRowspan as Dynamic)(
            isEditorSelectionAndTablesSelection2Result.$anchorCell,
            editorSelectionAndTablesNode,
          ),
        )
      : false;
  };
}

function resolveEditorSelectionAndTablesState(
  editorSelectionAndTablesState3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let doc: Dynamic = editorSelectionAndTablesState3.state.doc;
  let editorSelectionAndTablesDepth: Dynamic =
    resolveEditorSelectionAndTablesDepth(doc.resolve(options));
  return editorSelectionAndTablesDepth
    ? (editorSelectionAndTablesState3.dispatch(
        editorSelectionAndTablesState3.state.tr.setSelection(
          new (EditorSelectionAndTablesRowspan as Dynamic)(
            editorSelectionAndTablesDepth,
          ),
        ),
      ),
      true)
    : false;
}

function isEditorSelectionAndTablesWidth3(
  editorSelectionAndTablesWidth3?: Dynamic,
  options?: unknown,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorSelectionAndTablesHead(editorSelectionAndTablesWidth3.state))
    return false;
  let editorSelectionAndTablesOpenStart: Dynamic =
    resolveEditorSelectionAndTablesOpenStart(context);
  let selection: Dynamic = editorSelectionAndTablesWidth3.state.selection;
  if (selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)) {
    editorSelectionAndTablesOpenStart ||= {
      width: 1,
      height: 1,
      rows: [
        Fragment.from(
          resolveEditorSelectionAndTablesCreateAndFill(
            resolveEditorSelectionAndTablesTableNodeTypes(
              editorSelectionAndTablesWidth3.state.schema,
            ).cell,
            context,
          ),
        ),
      ],
    };
    let node: Dynamic = selection.$anchorCell.node(-1);
    let start: Dynamic = selection.$anchorCell.start(-1);
    let rectBetween: Dynamic = EditorSelectionAndTablesLeft.get(
      node,
    ).rectBetween(
      selection.$anchorCell.pos - start,
      selection.$headCell.pos - start,
    );
    editorSelectionAndTablesOpenStart = resolveEditorSelectionAndTablesWidth(
      editorSelectionAndTablesOpenStart,
      rectBetween.right - rectBetween.left,
      rectBetween.bottom - rectBetween.top,
    );
    getEditorSelectionAndTablesTop(
      editorSelectionAndTablesWidth3.state,
      editorSelectionAndTablesWidth3.dispatch,
      start,
      rectBetween,
      editorSelectionAndTablesOpenStart,
    );
    return true;
  } else if (editorSelectionAndTablesOpenStart) {
    let editorSelectionAndTablesNode: Dynamic =
      resolveEditorSelectionAndTablesNode(editorSelectionAndTablesWidth3.state);
    let start: Dynamic = editorSelectionAndTablesNode.start(-1);
    getEditorSelectionAndTablesTop(
      editorSelectionAndTablesWidth3.state,
      editorSelectionAndTablesWidth3.dispatch,
      start,
      EditorSelectionAndTablesLeft.get(
        editorSelectionAndTablesNode.node(-1),
      ).findCell(editorSelectionAndTablesNode.pos - start),
      editorSelectionAndTablesOpenStart,
    );
    return true;
  } else return false;
}

function installEditorSelectionAndTablesMouseup(
  file?: Dynamic,
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (event.button != 0 || event.ctrlKey || event.metaKey) return;
  let editorSelectionAndTablesParentNode: Dynamic =
    resolveEditorSelectionAndTablesParentNode(file, event.target);
  let installEditorSelectionAndTablesMouseupResult: Dynamic;
  if (
    event.shiftKey &&
    file.state.selection instanceof (EditorSelectionAndTablesRowspan as Dynamic)
  ) {
    installEditorSelectionAndTablesMouseupHandler(
      file.state.selection.$anchorCell,
      event,
    );
    event.preventDefault();
  } else if (
    event.shiftKey &&
    editorSelectionAndTablesParentNode &&
    (installEditorSelectionAndTablesMouseupResult =
      resolveEditorSelectionAndTablesDepth(file.state.selection.$anchor)) !=
      null &&
    resolveEditorSelectionAndTablesLeft(file, event)?.pos !=
      installEditorSelectionAndTablesMouseupResult.pos
  ) {
    installEditorSelectionAndTablesMouseupHandler(
      installEditorSelectionAndTablesMouseupResult,
      event,
    );
    event.preventDefault();
  } else if (!editorSelectionAndTablesParentNode) return;
  function installEditorSelectionAndTablesMouseupHandler(
    installEditorSelectionAndTablesMouseup2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let editorSelectionAndTablesLeft: Dynamic =
      resolveEditorSelectionAndTablesLeft(file, options);
    let matchesSelectingCellsPluginKeyState =
      SelectingCellsPluginKey.getState(file.state) == null;
    if (
      !editorSelectionAndTablesLeft ||
      !resolveEditorSelectionAndTablesDepth2(
        installEditorSelectionAndTablesMouseup2,
        editorSelectionAndTablesLeft,
      )
    )
      if (matchesSelectingCellsPluginKeyState)
        editorSelectionAndTablesLeft = installEditorSelectionAndTablesMouseup2;
      else return;
    let editorSelectionAndTablesRowspan: Dynamic =
      new (EditorSelectionAndTablesRowspan as Dynamic)(
        installEditorSelectionAndTablesMouseup2,
        editorSelectionAndTablesLeft,
      );
    if (
      matchesSelectingCellsPluginKeyState ||
      !file.state.selection.eq(editorSelectionAndTablesRowspan)
    ) {
      let setSelection: Dynamic = file.state.tr.setSelection(
        editorSelectionAndTablesRowspan,
      );
      if (matchesSelectingCellsPluginKeyState) {
        setSelection.setMeta(
          SelectingCellsPluginKey,
          installEditorSelectionAndTablesMouseup2.pos,
        );
      }
      file.dispatch(setSelection);
    }
  }
  function installEditorSelectionAndTablesMouseupHandler2(
    ..._extraArguments: unknown[]
  ): undefined {
    file.root.removeEventListener(
      `mouseup`,
      installEditorSelectionAndTablesMouseupHandler2,
    );
    file.root.removeEventListener(
      `dragstart`,
      installEditorSelectionAndTablesMouseupHandler2,
    );
    file.root.removeEventListener(
      `mousemove`,
      installEditorSelectionAndTablesMouseupHandler3,
    );
    if (SelectingCellsPluginKey.getState(file.state) != null) {
      file.dispatch(file.state.tr.setMeta(SelectingCellsPluginKey, -1));
    }
  }
  function installEditorSelectionAndTablesMouseupHandler3(
    installEditorSelectionAndTablesMouseup2?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let installEditorSelectionAndTablesMouseup3: Dynamic =
      installEditorSelectionAndTablesMouseup2;
    let SelectingCellsPluginKeyState: Dynamic =
      SelectingCellsPluginKey.getState(file.state);
    let installEditorSelectionAndTablesMouseupResult2: Dynamic;
    if (SelectingCellsPluginKeyState != null)
      installEditorSelectionAndTablesMouseupResult2 = file.state.doc.resolve(
        SelectingCellsPluginKeyState,
      );
    else if (
      resolveEditorSelectionAndTablesParentNode(
        file,
        installEditorSelectionAndTablesMouseup3.target,
      ) != editorSelectionAndTablesParentNode &&
      ((installEditorSelectionAndTablesMouseupResult2 =
        resolveEditorSelectionAndTablesLeft(file, event)),
      !installEditorSelectionAndTablesMouseupResult2)
    )
      return installEditorSelectionAndTablesMouseupHandler2();
    if (installEditorSelectionAndTablesMouseupResult2) {
      installEditorSelectionAndTablesMouseupHandler(
        installEditorSelectionAndTablesMouseupResult2,
        installEditorSelectionAndTablesMouseup3,
      );
    }
  }
  file.root.addEventListener(
    `mouseup`,
    installEditorSelectionAndTablesMouseupHandler2,
  );
  file.root.addEventListener(
    `dragstart`,
    installEditorSelectionAndTablesMouseupHandler2,
  );
  file.root.addEventListener(
    `mousemove`,
    installEditorSelectionAndTablesMouseupHandler3,
  );
}

function resolveEditorSelectionAndTablesHead(
  editorSelectionAndTablesHead?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      editorSelectionAndTablesHead.state.selection instanceof
      (TextSelection as Dynamic)
    )
  )
    return null;
  let { $head: selection }: Dynamic =
    editorSelectionAndTablesHead.state.selection;
  for (let difference = selection.depth - 1; difference >= 0; difference--) {
    let node: Dynamic = selection.node(difference);
    if (
      (context < 0
        ? selection.index(difference)
        : selection.indexAfter(difference)) !=
      (context < 0 ? 0 : node.childCount)
    )
      return null;
    if (
      node.type.spec.tableRole == `cell` ||
      node.type.spec.tableRole == `header_cell`
    ) {
      let before: Dynamic = selection.before(difference);
      let label =
        options == `vert`
          ? context > 0
            ? `down`
            : `up`
          : context > 0
            ? `right`
            : `left`;
      return editorSelectionAndTablesHead.endOfTextblock(label) ? before : null;
    }
  }
  return null;
}

function resolveEditorSelectionAndTablesParentNode(
  editorSelectionAndTablesParentNode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    ;
    options && options != editorSelectionAndTablesParentNode.dom;
    options = options.parentNode
  )
    if (options.nodeName == `TD` || options.nodeName == `TH`) return options;
  return null;
}

function resolveEditorSelectionAndTablesLeft(
  editorSelectionAndTablesLeft?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let posAtCoords: Dynamic = editorSelectionAndTablesLeft.posAtCoords({
    left: options.clientX,
    top: options.clientY,
  });
  if (!posAtCoords) return null;
  let { inside: posAtCoords2, pos: posAtCoords3 }: Dynamic = posAtCoords;
  return (
    (posAtCoords2 >= 0 &&
      resolveEditorSelectionAndTablesDepth(
        editorSelectionAndTablesLeft.state.doc.resolve(posAtCoords2),
      )) ||
    resolveEditorSelectionAndTablesDepth(
      editorSelectionAndTablesLeft.state.doc.resolve(posAtCoords3),
    )
  );
}

var EditorSelectionAndTablesTableWrapper: Dynamic;

function resolveEditorSelectionAndTablesColspan4(
  editorSelectionAndTablesColspan4?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let count: Dynamic = 0;
  let enabled = true;
  let firstChild: Dynamic = options.firstChild;
  let firstChild2: Dynamic = editorSelectionAndTablesColspan4.firstChild;
  if (firstChild2) {
    for (let index = 0, index2 = 0; index < firstChild2.childCount; index++) {
      let { colspan: attrs, colwidth: attrs2 }: Dynamic =
        firstChild2.child(index).attrs;
      for (let index3 = 0; index3 < attrs; index3++, index2++) {
        let argument3: Dynamic =
          argument == index2 ? argument2 : attrs2 && attrs2[index3];
        let total = argument3 ? argument3 + `px` : ``;
        count += argument3 || dependencies;
        if (!argument3) {
          enabled = false;
        }
        if (firstChild) {
          if (firstChild.style.width != total) {
            firstChild.style.width = total;
          }
          firstChild = firstChild.nextSibling;
        } else {
          let element = document.createElement(`col`);
          element.style.width = total;
          options.appendChild(element);
        }
      }
    }
    for (; firstChild; ) {
      var resolveEditorSelectionAndTablesColspan4Result: Dynamic;
      let nextSibling: Dynamic = firstChild.nextSibling;
      if (
        !(
          (resolveEditorSelectionAndTablesColspan4Result =
            firstChild.parentNode) == null
        )
      ) {
        resolveEditorSelectionAndTablesColspan4Result.removeChild(firstChild);
      }
      firstChild = nextSibling;
    }
    if (enabled) {
      context.style.width = count + `px`;
      context.style.minWidth = ``;
    } else {
      context.style.width = ``;
      context.style.minWidth = count + `px`;
    }
  }
}

var TableColumnResizingPluginKey: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorSelectionAndTables2Step1(): void {
  (EditorSelectionAndTablesRowspan = class editorSelectionAndTablesRowspanResult extends Selection {
    [key: string]: Dynamic;
    constructor(
      editorSelectionAndTablesRowspan?: Dynamic,
      options: Dynamic = editorSelectionAndTablesRowspan,
      ..._extraArguments: unknown[]
    ) {
      let node: Dynamic = editorSelectionAndTablesRowspan.node(-1);
      let EditorSelectionAndTablesLeftEntry: Dynamic =
        EditorSelectionAndTablesLeft.get(node);
      let start: Dynamic = editorSelectionAndTablesRowspan.start(-1);
      let rectBetween: Dynamic = EditorSelectionAndTablesLeftEntry.rectBetween(
        editorSelectionAndTablesRowspan.pos - start,
        options.pos - start,
      );
      let node2: Dynamic = editorSelectionAndTablesRowspan.node(0);
      let filteredCellsInRect: Dynamic =
        EditorSelectionAndTablesLeftEntry.cellsInRect(rectBetween).filter(
          (cellsInRect?: Dynamic, ..._extraArguments: unknown[]) =>
            cellsInRect != options.pos - start,
        );
      filteredCellsInRect.unshift(options.pos - start);
      let mappedFilteredCellsInRect: Dynamic = filteredCellsInRect.map(
        (
          filteredCellsInRect2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let nodeAt: Dynamic = node.nodeAt(filteredCellsInRect2);
          if (!nodeAt)
            throw RangeError(`No cell with offset ${filteredCellsInRect2} found`);
          let total: Dynamic = start + filteredCellsInRect2 + 1;
          return new (SelectionRange as Dynamic)(
            node2.resolve(total),
            node2.resolve(total + nodeAt.content.size),
          );
        },
      );
      super(
        mappedFilteredCellsInRect[0].$from,
        mappedFilteredCellsInRect[0].$to,
        mappedFilteredCellsInRect,
      );
      this.$anchorCell = editorSelectionAndTablesRowspan;
      this.$headCell = options;
    }
    map(
      options?: Dynamic,
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let EditorSelectionAndTablesLeftEntry: Dynamic = options.resolve(
        node.map(this.$anchorCell.pos),
      );
      let start: Dynamic = options.resolve(node.map(this.$headCell.pos));
      if (
        resolveEditorSelectionAndTablesTableRole(
          EditorSelectionAndTablesLeftEntry,
        ) &&
        resolveEditorSelectionAndTablesTableRole(start) &&
        resolveEditorSelectionAndTablesDepth2(
          EditorSelectionAndTablesLeftEntry,
          start,
        )
      ) {
        let matchesNode =
          this.$anchorCell.node(-1) != EditorSelectionAndTablesLeftEntry.node(-1);
        return matchesNode && this.isRowSelection()
          ? editorSelectionAndTablesRowspanResult.rowSelection(
              EditorSelectionAndTablesLeftEntry,
              start,
            )
          : matchesNode && this.isColSelection()
            ? editorSelectionAndTablesRowspanResult.colSelection(
                EditorSelectionAndTablesLeftEntry,
                start,
              )
            : new (editorSelectionAndTablesRowspanResult as Dynamic)(
                EditorSelectionAndTablesLeftEntry,
                start,
              );
      }
      return TextSelection.between(EditorSelectionAndTablesLeftEntry, start);
    }
    content(..._extraArguments: unknown[]): Dynamic {
      let editorSelectionAndTablesRowspan: Dynamic = this.$anchorCell.node(-1);
      let options: Dynamic = EditorSelectionAndTablesLeft.get(
        editorSelectionAndTablesRowspan,
      );
      let node: Dynamic = this.$anchorCell.start(-1);
      let EditorSelectionAndTablesLeftEntry: Dynamic = options.rectBetween(
        this.$anchorCell.pos - node,
        this.$headCell.pos - node,
      );
      let start: Dynamic = {};
      let rectBetween: Dynamic = [];
      for (
        let top: Dynamic = EditorSelectionAndTablesLeftEntry.top;
        top < EditorSelectionAndTablesLeftEntry.bottom;
        top++
      ) {
        let items: Dynamic = [];
        for (
          let total: Dynamic =
              top * options.width + EditorSelectionAndTablesLeftEntry.left,
            left: Dynamic = EditorSelectionAndTablesLeftEntry.left;
          left < EditorSelectionAndTablesLeftEntry.right;
          left++, total++
        ) {
          let mapItem: Dynamic = options.map[total];
          if (start[mapItem]) continue;
          start[mapItem] = true;
          let findCell: Dynamic = options.findCell(mapItem);
          let nodeAt: Dynamic = editorSelectionAndTablesRowspan.nodeAt(mapItem);
          if (!nodeAt) throw RangeError(`No cell with offset ${mapItem} found`);
          let difference: Dynamic =
            EditorSelectionAndTablesLeftEntry.left - findCell.left;
          let difference2: Dynamic =
            findCell.right - EditorSelectionAndTablesLeftEntry.right;
          if (difference > 0 || difference2 > 0) {
            let attrs: Dynamic = nodeAt.attrs;
            if (difference > 0) {
              attrs = resolveEditorSelectionAndTablesColspan2(
                attrs,
                0,
                difference,
              );
            }
            if (difference2 > 0) {
              attrs = resolveEditorSelectionAndTablesColspan2(
                attrs,
                attrs.colspan - difference2,
                difference2,
              );
            }
            if (findCell.left < EditorSelectionAndTablesLeftEntry.left) {
              nodeAt = nodeAt.type.createAndFill(attrs);
              if (!nodeAt)
                throw RangeError(
                  `Could not create cell with attrs ${JSON.stringify(attrs)}`,
                );
            } else nodeAt = nodeAt.type.create(attrs, nodeAt.content);
          }
          if (
            findCell.top < EditorSelectionAndTablesLeftEntry.top ||
            findCell.bottom > EditorSelectionAndTablesLeftEntry.bottom
          ) {
            let record2: Dynamic = {
              ...nodeAt.attrs,
              rowspan:
                Math.min(
                  findCell.bottom,
                  EditorSelectionAndTablesLeftEntry.bottom,
                ) - Math.max(findCell.top, EditorSelectionAndTablesLeftEntry.top),
            };
            nodeAt =
              findCell.top < EditorSelectionAndTablesLeftEntry.top
                ? nodeAt.type.createAndFill(record2)
                : nodeAt.type.create(record2, nodeAt.content);
          }
          items.push(nodeAt);
        }
        rectBetween.push(
          editorSelectionAndTablesRowspan.child(top).copy(Fragment.from(items)),
        );
      }
      let node2: Dynamic =
        this.isColSelection() && this.isRowSelection()
          ? editorSelectionAndTablesRowspan
          : rectBetween;
      return new (Slice as Dynamic)(Fragment.from(node2), 1, 1);
    }
    replace(
      editorSelectionAndTablesRowspan?: Dynamic,
      options: Dynamic = Slice.empty,
      ..._extraArguments: unknown[]
    ): undefined {
      let node: Dynamic = editorSelectionAndTablesRowspan.steps.length;
      let EditorSelectionAndTablesLeftEntry: Dynamic = this.ranges;
      for (
        let index = 0;
        index < EditorSelectionAndTablesLeftEntry.length;
        index++
      ) {
        let {
          $from: EditorSelectionAndTablesLeftEntryItem,
          $to: EditorSelectionAndTablesLeftEntryItem2,
        }: Dynamic = EditorSelectionAndTablesLeftEntry[index];
        let mappingSlice: Dynamic =
          editorSelectionAndTablesRowspan.mapping.slice(node);
        editorSelectionAndTablesRowspan.replace(
          mappingSlice.map(EditorSelectionAndTablesLeftEntryItem.pos),
          mappingSlice.map(EditorSelectionAndTablesLeftEntryItem2.pos),
          index ? Slice.empty : options,
        );
      }
      let start: Dynamic = Selection.findFrom(
        editorSelectionAndTablesRowspan.doc.resolve(
          editorSelectionAndTablesRowspan.mapping.slice(node).map(this.to),
        ),
        -1,
      );
      if (start) {
        editorSelectionAndTablesRowspan.setSelection(start);
      }
    }
    replaceWith(
      editorSelectionAndTablesRowspan?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.replace(
        editorSelectionAndTablesRowspan,
        new (Slice as Dynamic)(Fragment.from(options), 0, 0),
      );
    }
    forEachCell(
      editorSelectionAndTablesRowspan?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let options: Dynamic = this.$anchorCell.node(-1);
      let node: Dynamic = EditorSelectionAndTablesLeft.get(options);
      let EditorSelectionAndTablesLeftEntry: Dynamic = this.$anchorCell.start(-1);
      let start: Dynamic = node.cellsInRect(
        node.rectBetween(
          this.$anchorCell.pos - EditorSelectionAndTablesLeftEntry,
          this.$headCell.pos - EditorSelectionAndTablesLeftEntry,
        ),
      );
      for (let index = 0; index < start.length; index++)
        editorSelectionAndTablesRowspan(
          options.nodeAt(start[index]),
          EditorSelectionAndTablesLeftEntry + start[index],
        );
    }
    isColSelection(..._extraArguments: unknown[]) {
      let editorSelectionAndTablesRowspan: Dynamic = this.$anchorCell.index(-1);
      let options: Dynamic = this.$headCell.index(-1);
      if (Math.min(editorSelectionAndTablesRowspan, options) > 0) return false;
      let node: Dynamic =
        editorSelectionAndTablesRowspan +
        this.$anchorCell.nodeAfter.attrs.rowspan;
      let EditorSelectionAndTablesLeftEntry: Dynamic =
        options + this.$headCell.nodeAfter.attrs.rowspan;
      return (
        Math.max(node, EditorSelectionAndTablesLeftEntry) ==
        this.$headCell.node(-1).childCount
      );
    }
    static colSelection(
      options?: Dynamic,
      node: Dynamic = options,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let EditorSelectionAndTablesLeftEntry: Dynamic = options.node(-1);
      let start: Dynamic = EditorSelectionAndTablesLeft.get(
        EditorSelectionAndTablesLeftEntry,
      );
      let rectBetween: Dynamic = options.start(-1);
      let node2: Dynamic = start.findCell(options.pos - rectBetween);
      let filteredCellsInRect: Dynamic = start.findCell(node.pos - rectBetween);
      let mappedFilteredCellsInRect: Dynamic = options.node(0);
      if (node2.top <= filteredCellsInRect.top) {
        if (node2.top > 0) {
          options = mappedFilteredCellsInRect.resolve(
            rectBetween + start.map[node2.left],
          );
        }
        if (filteredCellsInRect.bottom < start.height) {
          node = mappedFilteredCellsInRect.resolve(
            rectBetween +
              start.map[
                start.width * (start.height - 1) + filteredCellsInRect.right - 1
              ],
          );
        }
      } else {
        if (filteredCellsInRect.top > 0) {
          node = mappedFilteredCellsInRect.resolve(
            rectBetween + start.map[filteredCellsInRect.left],
          );
        }
        if (node2.bottom < start.height) {
          options = mappedFilteredCellsInRect.resolve(
            rectBetween +
              start.map[start.width * (start.height - 1) + node2.right - 1],
          );
        }
      }
      return new (editorSelectionAndTablesRowspanResult as Dynamic)(
        options,
        node,
      );
    }
    isRowSelection(..._extraArguments: unknown[]) {
      let editorSelectionAndTablesRowspan: Dynamic = this.$anchorCell.node(-1);
      let options: Dynamic = EditorSelectionAndTablesLeft.get(
        editorSelectionAndTablesRowspan,
      );
      let node: Dynamic = this.$anchorCell.start(-1);
      let EditorSelectionAndTablesLeftEntry: Dynamic = options.colCount(
        this.$anchorCell.pos - node,
      );
      let start: Dynamic = options.colCount(this.$headCell.pos - node);
      if (Math.min(EditorSelectionAndTablesLeftEntry, start) > 0) return false;
      let rectBetween: Dynamic =
        EditorSelectionAndTablesLeftEntry +
        this.$anchorCell.nodeAfter.attrs.colspan;
      let node2: Dynamic = start + this.$headCell.nodeAfter.attrs.colspan;
      return Math.max(rectBetween, node2) == options.width;
    }
    eq(options?: Dynamic, ..._extraArguments: unknown[]) {
      return (
        options instanceof (editorSelectionAndTablesRowspanResult as Dynamic) &&
        options.$anchorCell.pos == this.$anchorCell.pos &&
        options.$headCell.pos == this.$headCell.pos
      );
    }
    static rowSelection(
      options?: Dynamic,
      node: Dynamic = options,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let EditorSelectionAndTablesLeftEntry: Dynamic = options.node(-1);
      let start: Dynamic = EditorSelectionAndTablesLeft.get(
        EditorSelectionAndTablesLeftEntry,
      );
      let rectBetween: Dynamic = options.start(-1);
      let node2: Dynamic = start.findCell(options.pos - rectBetween);
      let filteredCellsInRect: Dynamic = start.findCell(node.pos - rectBetween);
      let mappedFilteredCellsInRect: Dynamic = options.node(0);
      if (node2.left <= filteredCellsInRect.left) {
        if (node2.left > 0) {
          options = mappedFilteredCellsInRect.resolve(
            rectBetween + start.map[node2.top * start.width],
          );
        }
        if (filteredCellsInRect.right < start.width) {
          node = mappedFilteredCellsInRect.resolve(
            rectBetween +
              start.map[start.width * (filteredCellsInRect.top + 1) - 1],
          );
        }
      } else {
        if (filteredCellsInRect.left > 0) {
          node = mappedFilteredCellsInRect.resolve(
            rectBetween + start.map[filteredCellsInRect.top * start.width],
          );
        }
        if (node2.right < start.width) {
          options = mappedFilteredCellsInRect.resolve(
            rectBetween + start.map[start.width * (node2.top + 1) - 1],
          );
        }
      }
      return new (editorSelectionAndTablesRowspanResult as Dynamic)(
        options,
        node,
      );
    }
    toJSON(..._extraArguments: unknown[]): Dynamic {
      return {
        type: `cell`,
        anchor: this.$anchorCell.pos,
        head: this.$headCell.pos,
      };
    }
    static fromJSON(
      options?: Dynamic,
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (editorSelectionAndTablesRowspanResult as Dynamic)(
        options.resolve(node.anchor),
        options.resolve(node.head),
      );
    }
    static create(
      options?: Dynamic,
      node?: Dynamic,
      EditorSelectionAndTablesLeftEntry: Dynamic = node,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (editorSelectionAndTablesRowspanResult as Dynamic)(
        options.resolve(node),
        options.resolve(EditorSelectionAndTablesLeftEntry),
      );
    }
    getBookmark(..._extraArguments: unknown[]): Dynamic {
      return new (EditorSelectionAndTablesAnchor as Dynamic)(
        this.$anchorCell.pos,
        this.$headCell.pos,
      );
    }
  });
  EditorSelectionAndTablesRowspan.prototype.visible = false;
  Selection.jsonID(`cell`, EditorSelectionAndTablesRowspan);
  (EditorSelectionAndTablesAnchor = class editorSelectionAndTablesAnchorResult {
    [key: string]: Dynamic;
    constructor(
      editorSelectionAndTablesAnchor?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.anchor = editorSelectionAndTablesAnchor;
      this.head = options;
    }
    map(options?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return new (editorSelectionAndTablesAnchorResult as Dynamic)(
        options.map(this.anchor),
        options.map(this.head),
      );
    }
    resolve(
      editorSelectionAndTablesAnchor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let options: Dynamic = editorSelectionAndTablesAnchor.resolve(this.anchor);
      let resolve: Dynamic = editorSelectionAndTablesAnchor.resolve(this.head);
      return options.parent.type.spec.tableRole == `row` &&
        resolve.parent.type.spec.tableRole == `row` &&
        options.index() < options.parent.childCount &&
        resolve.index() < resolve.parent.childCount &&
        resolveEditorSelectionAndTablesDepth2(options, resolve)
        ? new (EditorSelectionAndTablesRowspan as Dynamic)(options, resolve)
        : Selection.near(resolve, 1);
    }
  });
  (FixTablesPluginKey = new (PluginKey as Dynamic)(`fix-tables`));
  isEditorSelectionAndTablesUseDeprecatedLogic(`row`, {
    useDeprecatedLogic: true,
  });
  isEditorSelectionAndTablesUseDeprecatedLogic(`column`, {
    useDeprecatedLogic: true,
  });
  (EditorSelectionAndTablesUseDeprecatedLogic = isEditorSelectionAndTablesUseDeprecatedLogic(`cell`, {
      useDeprecatedLogic: true,
    }));
  (EditorSelectionAndTablesArrowLeft = keydownHandler({
    ArrowLeft: isEditorSelectionAndTablesHoriz(`horiz`, -1),
    ArrowRight: isEditorSelectionAndTablesHoriz(`horiz`, 1),
    ArrowUp: isEditorSelectionAndTablesHoriz(`vert`, -1),
    ArrowDown: isEditorSelectionAndTablesHoriz(`vert`, 1),
    "Shift-ArrowLeft": isEditorSelectionAndTablesSelection2(`horiz`, -1),
    "Shift-ArrowRight": isEditorSelectionAndTablesSelection2(`horiz`, 1),
    "Shift-ArrowUp": isEditorSelectionAndTablesSelection2(`vert`, -1),
    "Shift-ArrowDown": isEditorSelectionAndTablesSelection2(`vert`, 1),
    Backspace: isEditorSelectionAndTablesSelection,
    "Mod-Backspace": isEditorSelectionAndTablesSelection,
    Delete: isEditorSelectionAndTablesSelection,
    "Mod-Delete": isEditorSelectionAndTablesSelection,
  }));
  (EditorSelectionAndTablesTableWrapper = class {
    [key: string]: Dynamic;
    constructor(
      editorSelectionAndTablesTableWrapper?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.node = editorSelectionAndTablesTableWrapper;
      this.defaultCellMinWidth = options;
      this.dom = document.createElement(`div`);
      this.dom.className = `tableWrapper`;
      this.table = this.dom.appendChild(document.createElement(`table`));
      this.table.style.setProperty(`--default-cell-min-width`, `${options}px`);
      this.colgroup = this.table.appendChild(document.createElement(`colgroup`));
      resolveEditorSelectionAndTablesColspan4(
        editorSelectionAndTablesTableWrapper,
        this.colgroup,
        this.table,
        options,
      );
      this.contentDOM = this.table.appendChild(document.createElement(`tbody`));
    }
    update(
      editorSelectionAndTablesTableWrapper?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return editorSelectionAndTablesTableWrapper.type == this.node.type
        ? ((this.node = editorSelectionAndTablesTableWrapper),
          resolveEditorSelectionAndTablesColspan4(
            editorSelectionAndTablesTableWrapper,
            this.colgroup,
            this.table,
            this.defaultCellMinWidth,
          ),
          true)
        : false;
    }
    ignoreMutation(
      editorSelectionAndTablesTableWrapper?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (
        editorSelectionAndTablesTableWrapper.type == `attributes` &&
        (editorSelectionAndTablesTableWrapper.target == this.table ||
          this.colgroup.contains(editorSelectionAndTablesTableWrapper.target))
      );
    }
  });
  (TableColumnResizingPluginKey = new (PluginKey as Dynamic)(
    `tableColumnResizing`,
  ));
}

export {
  EditorSelectionAndTablesArrowLeft,
  EditorSelectionAndTablesRowspan,
  EditorSelectionAndTablesTableWrapper,
  EditorSelectionAndTablesUseDeprecatedLogic,
  TableColumnResizingPluginKey,
  getEditorSelectionAndTablesCell,
  getEditorSelectionAndTablesTableStart,
  installEditorSelectionAndTablesMouseup,
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
  isEditorSelectionAndTablesWidth3,
  resolveEditorSelectionAndTablesClass,
  resolveEditorSelectionAndTablesColspan4,
  resolveEditorSelectionAndTablesNode2,
  resolveEditorSelectionAndTablesState,
  resolveEditorSelectionAndTablesTable,
};

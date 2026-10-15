/** BaoCut: editor table controls from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  EditorState,
  Extension,
  Fragment,
  GapCursor,
  Mapping,
  Node2,
  NodeSelection,
  Plugin,
  PluginKey,
  ReplaceAroundStep,
  ReplaceStep,
  Slice,
  TextSelection,
  closeHistory,
  dropPoint,
  findParentNodeClosestToPos,
  isAndroid,
  isiOS,
  mergeAttributes,
} from "../../platform/dependencies";
import {
  resolvePlatformSessionAndSourcesStartsWith2,
  resolvePlatformSessionAndSourcesValue10,
} from "../../platform/services/session-and-sources-1";
import {
  resolveEditorExtensionsCheck,
} from "./extensions-1";
import {
  resolveEditorAnchorsAndMentionsBoundaryMarker,
} from "./anchors-and-mentions-1";
import {
  resolvePlatformKeyboardAndSaveStatusNavigator,
} from "../../platform/services/keyboard-and-save-status";
import {
  dataModelSchemasPattern21,
  resolveDataModelSchemasDepth,
  resolveDataModelSchemasDepth2,
  resolveDataModelSchemasDepth3,
  resolveDataModelSchemasError,
  resolveDataModelSchemasTest8,
} from "../../platform/data/model-schemas-4";
import {
  resolveEditorHostIsInteger,
} from "./host-1";
import {
  EditorSelectionAndTablesLeft,
  isEditorSelectionAndTablesHead,
} from "./selection-and-tables-1";
import {
  EditorSelectionAndTablesRowspan,
  resolveEditorSelectionAndTablesTable,
} from "./selection-and-tables-2";
import {
  isEditorChipsAndNodeViewsFrom,
  isEditorChipsAndNodeViewsState,
  resolveEditorChipsAndNodeViewsChildCount,
} from "./chips-and-node-views-1";
import {
  editorChipsAndNodeViewsSet10,
  editorChipsAndNodeViewsSet9,
  resolveEditorTableControlsBuiltin,
} from "./chips-and-node-views-3";

var isEditorTableControlsValue: (..._extraArguments: unknown[]) => boolean;

function isEditorTableControlsState(
  editorTableControlsState?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  let {
    state: editorTableControlsState2,
    view: editorTableControlsState3,
  }: Dynamic = editorTableControlsState;
  let {
    list: nodes,
    listItem: nodes2,
    paragraph: nodes3,
  }: Dynamic = editorTableControlsState2.schema.nodes;
  if (
    !nodes ||
    !nodes2 ||
    !editorTableControlsState.isEditable ||
    editorTableControlsState3.composing
  )
    return false;
  let {
    $from: selection,
    $to: selection2,
    empty: selection3,
  }: Dynamic = editorTableControlsState2.selection;
  let parent: Dynamic = selection.parent;
  if (
    parent.type !== nodes3 ||
    resolveEditorHostIsInteger(parent.attrs.heading) !== null ||
    !selection.sameParent(selection2) ||
    (options === `start` && !(selection3 && selection.parentOffset === 0))
  )
    return false;
  for (let difference = selection.depth - 1; difference > 0; difference--) {
    let tableRole: Dynamic = selection.node(difference).type.spec.tableRole;
    if (tableRole === `cell` || tableRole === `header_cell`) break;
    if (selection.node(difference).type.name !== `blockquote`) return false;
  }
  let nodeDOM: Dynamic =
    selection.depth === 1
      ? editorTableControlsState3.nodeDOM(selection.before())
      : null;
  if (
    nodeDOM?.classList?.contains(`lfile-ask-waiting-line`) ||
    nodeDOM?.nextElementSibling?.classList.contains(`lfile-inline-ask`) ||
    (selection.depth === 1 && isEditorTableControlsValue(parent)) ||
    editorTableControlsState3.dom.hasAttribute(`aria-activedescendant`)
  )
    return false;
  let [items, setItems, items2, items3]: Dynamic = [
    selection.node(-1),
    selection.index(-1),
    selection.before(),
    selection.after(),
  ];
  let child: Dynamic =
    setItems > 0 && items.child(setItems - 1).type === nodes
      ? items.child(setItems - 1)
      : null;
  let child2: Dynamic =
    setItems + 1 < items.childCount && items.child(setItems + 1).type === nodes
      ? items.child(setItems + 1)
      : null;
  if (
    (!child && (child2 || !context)) ||
    (child?.attrs.kind === `ordered` && child2?.attrs.kind === `ordered`)
  )
    return false;
  let copy: Dynamic = (child ?? nodes.create()).copy(
    Fragment.from(
      nodes2.create(
        child?.attrs.kind === `check`
          ? {
              checked: false,
            }
          : null,
      ),
    ),
  );
  let replaceAroundStep: Dynamic = child
    ? new (ReplaceAroundStep as Dynamic)(
        items2 - 1,
        items3,
        items2,
        items3,
        new (Slice as Dynamic)(Fragment.from(copy), 1, 0),
        1,
        true,
      )
    : new (ReplaceAroundStep as Dynamic)(
        items2,
        items3,
        items2,
        items3,
        new (Slice as Dynamic)(Fragment.from(copy), 0, 0),
        2,
        true,
      );
  let closeHistory2: Dynamic = closeHistory(editorTableControlsState2.tr);
  return closeHistory2.maybeStep(replaceAroundStep).failed
    ? false
    : (editorTableControlsState3.dispatch(closeHistory2.scrollIntoView()),
      editorTableControlsState3.state.doc !== editorTableControlsState2.doc &&
        editorTableControlsState3.dispatch(
          closeHistory(editorTableControlsState3.state.tr),
        ),
      true);
}

var editorTableControlsSet: Dynamic;

var resolveEditorTableControlsTableRole: Dynamic;

var resolveEditorTableControlsCell: Dynamic;

function isEditorTableControlsFrom(
  editorTableControls?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let { $from: selection, $to: selection2 }: Dynamic =
    editorTableControls.selection;
  let isEditorTableControlsFromResult = +(
    selection.nodeAfter?.type.name === `listItem`
  );
  let isEditorTableControlsFromResult2: number = -1;
  for (let depth: Dynamic = selection.depth; depth > 0; depth--) {
    let node: Dynamic = selection.node(depth);
    if (resolveEditorTableControlsCell(node)) {
      isEditorTableControlsFromResult2 = depth;
      break;
    }
    if (
      editorTableControlsSet.has(
        resolveEditorTableControlsTableRole(node) ?? ``,
      )
    )
      break;
    if (node.type.name === `listItem`) {
      isEditorTableControlsFromResult++;
    }
  }
  if (isEditorTableControlsFromResult < options) return false;
  if (!isEditorSelectionAndTablesHead(editorTableControls)) return true;
  if (isEditorTableControlsFromResult2 < 0) return false;
  let isEditorTableControlsFromResult3: number = -1;
  for (let depth: Dynamic = selection2.depth; depth > 0; depth--) {
    let node: Dynamic = selection2.node(depth);
    if (resolveEditorTableControlsCell(node)) {
      isEditorTableControlsFromResult3 = depth;
      break;
    }
    if (
      editorTableControlsSet.has(
        resolveEditorTableControlsTableRole(node) ?? ``,
      )
    )
      break;
  }
  if (
    isEditorTableControlsFromResult3 < 0 ||
    selection2.start(isEditorTableControlsFromResult3) !==
      selection.start(isEditorTableControlsFromResult2)
  )
    return false;
  let listItem: Dynamic = editorTableControls.schema.nodes.listItem;
  if (!listItem) return false;
  let blockRange: Dynamic = selection.blockRange(
    selection2,
    resolveEditorChipsAndNodeViewsChildCount(listItem),
  );
  return (
    blockRange != null && blockRange.depth > isEditorTableControlsFromResult2
  );
}

function isEditorTableControlsSelection(
  editorTableControlsSelection?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isEditorTableControlsFrom(editorTableControlsSelection, 1)) return false;
  let {
    selection: editorTableControlsSelection2,
    doc: editorTableControlsSelection3,
  }: Dynamic = editorTableControlsSelection;
  if (!(editorTableControlsSelection2 instanceof (TextSelection as Dynamic)))
    return true;
  let { $from: editorTableControlsSelection4 }: Dynamic =
    editorTableControlsSelection2;
  for (
    let depth: Dynamic = editorTableControlsSelection4.depth;
    depth > 0;
    depth--
  ) {
    if (
      !resolveEditorTableControlsCell(editorTableControlsSelection4.node(depth))
    )
      continue;
    let between: Dynamic = TextSelection.between(
      editorTableControlsSelection3.resolve(
        editorTableControlsSelection4.before(depth),
      ),
      editorTableControlsSelection3.resolve(
        editorTableControlsSelection4.after(depth),
      ),
    );
    return (
      between.from !== editorTableControlsSelection2.from ||
      between.to !== editorTableControlsSelection2.to
    );
  }
  return true;
}

var editorTableControlsPattern: RegExp;

var editorTableControlsPattern2: RegExp;

var editorTableControlsPattern3: RegExp;

var resolveEditorTableControlsTrim: Dynamic;

var resolveEditorTableControlsValue: Dynamic;

var resolveEditorTableControlsValue2: Dynamic;

function filterEditorTableControlsBulletList(
  file?: Dynamic,
  items?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length > 2e3 * 4096) return null;
  let itemsParts: Dynamic = items.split(/\r?\n/);
  if (
    itemsParts.length > 2e3 ||
    itemsParts.filter((itemsPart?: Dynamic, ..._extraArguments: unknown[]) =>
      dataModelSchemasPattern21.test(itemsPart),
    ).length < 2
  )
    return null;
  let editorTableControlsValue2: Dynamic = resolveEditorTableControlsValue2(
    context.baseDepth ?? 0,
    context.baseLists ?? 0,
  );
  if (editorTableControlsValue2 < 1) return null;
  let {
    bulletList: nodes,
    orderedList: nodes2,
    list: nodes3,
    listItem: nodes4,
    paragraph: nodes5,
  }: Dynamic = file.nodes;
  if (!nodes4 || !nodes5 || !(nodes3 || (nodes && nodes2))) return null;
  let create2: Dynamic = (
    filterEditorTableControlsBulletList2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    nodes3
      ? nodes3.create(
          {
            kind: filterEditorTableControlsBulletList2 ? `ordered` : `bullet`,
          },
          options,
        )
      : (filterEditorTableControlsBulletList2 ? nodes2 : nodes).create(
          null,
          options,
        );
  let items2: Dynamic = [];
  let items3: Dynamic = [];
  let create3 = (
    filterEditorTableControlsBulletList2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    filterEditorTableControlsBulletList2.tail &&=
      (filterEditorTableControlsBulletList2.items.push(
        nodes4.create(null, [
          filterEditorTableControlsBulletList2.tail.line,
          ...filterEditorTableControlsBulletList2.tail.sub,
        ]),
      ),
      null);
  };
  let create4 = (
    filterEditorTableControlsBulletList2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (; items3.length > filterEditorTableControlsBulletList2; ) {
      let pop: Dynamic = items3.pop();
      create3(pop);
      if (!pop.items.length) continue;
      let create5: Dynamic = create2(pop.ordered, pop.items);
      let itemItem: Dynamic = items3[items3.length - 1];
      if (itemItem?.tail) {
        itemItem.tail.sub.push(create5);
      } else {
        items2.push(create5);
      }
    }
  };
  let readItemItem: Dynamic = (
    filterEditorTableControlsBulletList2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let difference = items3.length - 1; difference >= 0; difference--)
      if (items3[difference].indent <= filterEditorTableControlsBulletList2)
        return items3[difference];
  };
  for (let filterEditorTableControlsBulletListResult of itemsParts as Dynamic) {
    let match = editorTableControlsPattern.exec(
      filterEditorTableControlsBulletListResult,
    );
    let match2 = match
      ? null
      : (editorTableControlsPattern2.exec(
          filterEditorTableControlsBulletListResult,
        ) ??
        (readItemItem(
          resolveEditorTableControlsValue(
            filterEditorTableControlsBulletListResult,
          ),
        )?.ordered
          ? editorTableControlsPattern3.exec(
              filterEditorTableControlsBulletListResult,
            )
          : null));
    if (!match && !match2) {
      create4(0);
      if (filterEditorTableControlsBulletListResult.trim()) {
        items2.push(
          nodes5.create(
            null,
            resolveEditorTableControlsHref(
              file,
              filterEditorTableControlsBulletListResult,
            ),
          ),
        );
      }
      continue;
    }
    let ordered = !!match2;
    let editorTableControlsTrim: Dynamic = resolveEditorTableControlsTrim(
      filterEditorTableControlsBulletListResult,
      match ?? match2,
    );
    let indent: Dynamic = resolveEditorTableControlsValue(
      filterEditorTableControlsBulletListResult,
    );
    let index = 0;
    for (; index < items3.length && items3[index].indent < indent; ) index++;
    if (index < items3.length && items3[index].indent === indent) {
      index++;
    }
    create4(index);
    let itemItem: Dynamic = items3[items3.length - 1];
    if (
      !itemItem ||
      (itemItem.indent < indent && items3.length < editorTableControlsValue2)
    ) {
      itemItem = {
        ordered: ordered,
        indent: indent,
        items: [],
        tail: null,
      };
      items3.push(itemItem);
    } else {
      if (itemItem.ordered !== ordered) {
        create4(items3.length - 1);
        itemItem = {
          ordered: ordered,
          indent: indent,
          items: [],
          tail: null,
        };
        items3.push(itemItem);
      }
    }
    create3(itemItem);
    itemItem.tail = {
      line: nodes5.create(
        null,
        editorTableControlsTrim
          ? resolveEditorTableControlsHref(file, editorTableControlsTrim)
          : undefined,
      ),
      sub: [],
    };
  }
  create4(0);
  return items2.length
    ? new (Slice as Dynamic)(Fragment.from(items2), 0, 0)
    : null;
}

var editorTableControlsUrlPattern: RegExp;

var editorTableControlsSet2: Dynamic;

var resolveEditorTableControlsSlice: Dynamic;

function resolveEditorTableControlsHref(
  editorTableControlsHref?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  let text = (
    editorTableControlsHref2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let dataModelSchemasTest8: Dynamic = resolveDataModelSchemasTest8(
      editorTableControlsHref2,
    );
    if (dataModelSchemasTest8) {
      items2.push(editorTableControlsHref.text(dataModelSchemasTest8));
    }
  };
  let link: Dynamic = editorTableControlsHref.marks.link;
  if (!link) {
    text(items);
    return items2;
  }
  let count: number = 0;
  for (let resolveEditorTableControlsHrefResult of items.matchAll(
    editorTableControlsUrlPattern,
  ) as Dynamic) {
    let editorTableControlsSlice: Dynamic = resolveEditorTableControlsSlice(
      resolveEditorTableControlsHrefResult[0],
    );
    let dataModelSchemasTest8: Dynamic = resolveDataModelSchemasTest8(
      editorTableControlsSlice,
    );
    let href: Dynamic = resolvePlatformSessionAndSourcesStartsWith2(
      dataModelSchemasTest8,
    );
    if (resolveEditorTableControlsHrefResult.index > count) {
      text(items.slice(count, resolveEditorTableControlsHrefResult.index));
    }
    items2.push(
      !href || resolvePlatformSessionAndSourcesValue10(href)
        ? editorTableControlsHref.text(dataModelSchemasTest8)
        : editorTableControlsHref.text(dataModelSchemasTest8, [
            link.create({
              href: href,
            }),
          ]),
    );
    count =
      resolveEditorTableControlsHrefResult.index +
      editorTableControlsSlice.length;
  }
  if (count < items.length) {
    text(items.slice(count));
  }
  return items2;
}

var resolveEditorTableControlsListItem: Dynamic;

function resolveEditorTableControlsState(
  editorTableControlsState?: Dynamic,
  options: Dynamic = resolveEditorTableControlsListItem,
  ..._extraArguments: unknown[]
): Dynamic {
  let { state: editorTableControlsState2 }: Dynamic = editorTableControlsState;
  return (
    (!isEditorSelectionAndTablesHead(editorTableControlsState2) ||
      isEditorTableControlsSelection(editorTableControlsState2)) &&
    isEditorChipsAndNodeViewsState(editorTableControlsState, options)
  );
}

function resolveEditorTableControlsState2(
  editorTableControlsState2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { state: editorTableControlsState22 }: Dynamic =
    editorTableControlsState2;
  return isEditorSelectionAndTablesHead(editorTableControlsState22) &&
    !(
      isEditorTableControlsSelection(editorTableControlsState22) &&
      isEditorTableControlsFrom(editorTableControlsState22, 2)
    )
    ? false
    : editorTableControlsState2.commands.liftListItem(`listItem`);
}

var resolveEditorTableControlsValue3: Dynamic;

var ListBehaviorExtension: Dynamic;

var resolveEditorTableControlsCell2: Dynamic;

function resolveEditorTableControlsResolve(
  editorTableControlsResolve?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolve: Dynamic = editorTableControlsResolve.resolve(options);
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--)
    if (resolveEditorTableControlsCell2(resolve.node(depth)))
      return resolve.before(depth);
  return null;
}

function isEditorTableControlsSize(
  node?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !(options < context) || options < 0 || context > node.content.size
    ? false
    : resolveEditorTableControlsResolve(node, options) !==
        resolveEditorTableControlsResolve(node, context);
}

function resolveEditorTableControlsIsTextblock(
  node?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let resolveEditorTableControlsIsTextblockHandler = (
    node2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (node2.isTextblock) {
      if (node2.content.size > 0) {
        context.push([options2 + 1, options2 + 1 + node2.content.size]);
      }
      return;
    }
    node2.forEach(
      (
        rolldownNImport2?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          !rolldownNImport2.isInline &&
          resolveEditorTableControlsIsTextblockHandler(
            rolldownNImport2,
            options2 + 1 + index,
          )
        ),
    );
  };
  let firstChild: Dynamic = node.firstChild;
  if (firstChild) {
    resolveEditorTableControlsIsTextblockHandler(firstChild, options + 1);
    if (node.childCount > 1) {
      context.push([
        options + 1 + firstChild.nodeSize,
        options + node.nodeSize - 1,
      ]);
    }
  }
}

function isEditorTableControlsTable(
  editorTableControlsTable?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isEditorTableControlsSize(editorTableControlsTable, options, context))
    return null;
  let items: Dynamic = [];
  let node = (
    editorTableControlsTable2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let resolve: Dynamic = editorTableControlsTable.resolve(
      editorTableControlsTable2,
    );
    for (let depth: Dynamic = resolve.depth; depth > 0; depth--)
      if (resolve.node(depth).type.spec.tableRole !== undefined) return true;
    return false;
  };
  editorTableControlsTable.nodesBetween(
    options,
    context,
    (
      node2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (node2.isInline) return false;
      let total: Dynamic = options2 + node2.nodeSize;
      let matchesOptions = options2 >= options && total <= context;
      let tableRole: Dynamic = node2.type.spec.tableRole;
      if (
        matchesOptions &&
        (tableRole === undefined || tableRole === `table`) &&
        !node(options2)
      ) {
        items.push([options2, total]);
        return false;
      }
      if (matchesOptions && resolveEditorTableControlsCell2(node2)) {
        resolveEditorTableControlsIsTextblock(node2, options2, items);
        return false;
      }
      if (
        matchesOptions &&
        context2 &&
        resolveEditorTableControlsCell2(context2)
      ) {
        items.push([options2, total]);
        return false;
      }
      if (node2.isTextblock) {
        let max = Math.max(options, options2 + 1);
        let min = Math.min(context, total - 1);
        if (min > max) {
          items.push([max, min]);
        }
        return false;
      }
      return true;
    },
  );
  return items.length ? items : null;
}

var TableEdgePluginKey: Dynamic;

var EditorTableControlsMessage: string;

var editorTableControlsWeakSet: Dynamic;

var EditorTableControlsKey: ({
    key: string;
    says: string;
    at: string;
} | {
    at?: undefined;
    key: string;
    says: string;
})[];

var resolveEditorTableControlsMeta: Dynamic;

function resolveEditorTableControlsKeys(
  editorTableControlsKeys?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let resolveEditorTableControlsKeysResult of Object.keys(
    editorTableControlsKeys,
  ) as Dynamic)
    options.setMeta(
      resolveEditorTableControlsKeysResult,
      editorTableControlsKeys[resolveEditorTableControlsKeysResult],
    );
  return options;
}

var resolveEditorTableControlsFind: Dynamic;

var resolveEditorTableControlsSome: Dynamic;

function resolveEditorTableControlsPaste(
  editorTableControlsPaste?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic =
    node.openStart === 0 && node.openEnd === 0 && node.content.childCount === 1
      ? node.content.firstChild
      : null;
  let input: Dynamic = editorTableControlsPaste.input;
  return (
    firstChild
      ? editorTableControlsPaste.state.tr.replaceSelectionWith(
          firstChild,
          !!input?.shiftKey && input.lastKeyCode !== 45,
        )
      : editorTableControlsPaste.state.tr.replaceSelection(node)
  )
    .scrollIntoView()
    .setMeta(`paste`, true)
    .setMeta(`uiEvent`, `paste`);
}

var resolveEditorTableControlsComposition: Dynamic;

function collectEditorTableControlsBefore(
  collectEditorTableControlsBefore2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options[0]?.before !== collectEditorTableControlsBefore2.before)
    return null;
  let mapping: Dynamic = new (Mapping as Dynamic)();
  for (
    let difference = collectEditorTableControlsBefore2.steps.length - 1;
    difference >= 0;
    difference--
  )
    mapping.appendMap(
      collectEditorTableControlsBefore2.steps[difference].getMap().invert(),
    );
  for (let collectEditorTableControlsBeforeResult of options as Dynamic)
    mapping.appendMapping(collectEditorTableControlsBeforeResult.mapping);
  for (
    let index = 0,
      stepsCount: Dynamic = collectEditorTableControlsBefore2.steps.length;
    index < collectEditorTableControlsBefore2.steps.length;
    index++
  ) {
    let mappedStepItem: Dynamic = collectEditorTableControlsBefore2.steps[
      index
    ].map(mapping.slice(stepsCount--));
    if (!mappedStepItem || context.maybeStep(mappedStepItem).failed)
      return null;
    mapping.appendMap(mappedStepItem.getMap(), stepsCount);
  }
  if (collectEditorTableControlsBefore2.selectionSet) {
    context.setSelection(
      collectEditorTableControlsBefore2.selection.map(context.doc, mapping),
    );
  }
  if (collectEditorTableControlsBefore2.storedMarksSet) {
    context.setStoredMarks(collectEditorTableControlsBefore2.storedMarks);
  }
  if (collectEditorTableControlsBefore2.scrolledIntoView) {
    context.scrollIntoView();
  }
  let collectEditorTableControlsBeforeHandler: Dynamic = (
    collectEditorTableControlsBefore3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof collectEditorTableControlsBefore3 == `number`
      ? mapping.map(collectEditorTableControlsBefore3)
      : typeof collectEditorTableControlsBefore3?.map == `function`
        ? collectEditorTableControlsBefore3.map(mapping)
        : collectEditorTableControlsBefore3;
  let editorTableControlsMeta: Dynamic = resolveEditorTableControlsMeta(
    collectEditorTableControlsBefore2,
  );
  for (let collectEditorTableControlsBeforeResult of Object.keys(
    editorTableControlsMeta,
  ) as Dynamic) {
    let [items, setItems]: Dynamic = [
      resolveEditorTableControlsFind(collectEditorTableControlsBeforeResult),
      editorTableControlsMeta[collectEditorTableControlsBeforeResult],
    ];
    let setItemItem: Dynamic =
      items && setItems?.[items.says] != null
        ? setItems[items.says]
        : undefined;
    context.setMeta(
      collectEditorTableControlsBeforeResult,
      setItemItem === undefined || !items
        ? editorTableControlsMeta[collectEditorTableControlsBeforeResult]
        : {
            ...setItems,
            [items.says]: items.at
              ? {
                  ...setItemItem,
                  [items.at]: collectEditorTableControlsBeforeHandler(
                    setItemItem[items.at],
                  ),
                }
              : collectEditorTableControlsBeforeHandler(setItemItem),
          },
    );
  }
  return context;
}

function isEditorTableControlsDoc(
  editorTableControlsDoc?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let selection: Dynamic = editorTableControlsDoc.state.selection;
  let [items, setItems, items2, items3]: Dynamic = [
    editorTableControlsDoc.state,
    editorTableControlsDoc.state,
    editorTableControlsDoc.props.dispatchTransaction,
    false,
  ];
  let updateDispatchTransaction = (
    ..._extraArguments: unknown[]
  ): undefined => {
    items3 = false;
    editorTableControlsWeakSet.delete(setItems);
    editorTableControlsDoc.state = items;
    editorTableControlsDoc.props.dispatchTransaction = items2;
  };
  let create2 = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        editorTableControlsDoc.state.doc !== dependencies.before ||
        !editorTableControlsDoc.state.selection.eq(selection)
      )
    ) {
      [items, items2, items3] = [
        editorTableControlsDoc.state,
        editorTableControlsDoc.props.dispatchTransaction,
        true,
      ];
      setItems = Object.create(items, {
        doc: {
          value: dependencies.doc,
        },
        selection: {
          value: dependencies.selection,
        },
      });
      editorTableControlsWeakSet.add(setItems);
      editorTableControlsDoc.state = setItems;
      editorTableControlsDoc.props.dispatchTransaction = dispatch;
    }
  };
  let dispatch = (
    editorTableControlsDoc2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let editorTableControlsMeta: Dynamic = resolveEditorTableControlsMeta(
      editorTableControlsDoc2,
    );
    let docChanged: Dynamic =
      editorTableControlsDoc2.docChanged ||
      resolveEditorTableControlsSome(editorTableControlsMeta);
    if (
      !(
        editorTableControlsDoc2.before === setItems.doc &&
        !docChanged &&
        (editorTableControlsMeta.uiEvent === `paste` ||
          !Object.keys(editorTableControlsMeta).length)
      )
    ) {
      updateDispatchTransaction();
      if (editorTableControlsDoc2.before !== setItems.doc)
        editorTableControlsDoc.dispatch(editorTableControlsDoc2);
      else if (docChanged) {
        let argument3: Dynamic = argument2(
          closeHistory(dependencies).setMeta(
            `composition`,
            EditorTableControlsMessage,
          ),
        );
        if (argument3) {
          editorTableControlsDoc.dispatch(
            editorTableControlsDoc.state.doc.eq(editorTableControlsDoc2.before)
              ? editorTableControlsDoc2
              : (collectEditorTableControlsBefore(
                  editorTableControlsDoc2,
                  argument3,
                  editorTableControlsDoc.state.tr,
                ) ??
                  resolveEditorTableControlsComposition(
                    editorTableControlsDoc,
                    context,
                  )),
          );
        }
      } else
        editorTableControlsDoc.dispatch(
          resolveEditorTableControlsKeys(
            editorTableControlsMeta,
            editorTableControlsDoc.state.tr,
          ),
        );
      create2();
    }
  };
  let defaultView: Dynamic =
    editorTableControlsDoc.dom.ownerDocument.defaultView;
  let updateDispatchTransaction2 = (..._extraArguments: unknown[]): undefined =>
    void (items3 && updateDispatchTransaction());
  try {
    defaultView?.addEventListener(`error`, updateDispatchTransaction2, true);
    create2();
    let enabled = false;
    if (
      !editorTableControlsDoc.someProp(
        `handlePaste`,
        (
          editorTableControlsDoc2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          editorTableControlsDoc2 === argument
            ? ((enabled = true), false)
            : enabled &&
              editorTableControlsDoc2(editorTableControlsDoc, options, context),
      ) &&
      context.size
    ) {
      editorTableControlsDoc.dispatch(
        resolveEditorTableControlsPaste(editorTableControlsDoc, context),
      );
    }
  } catch (isEditorTableControlsDocResult: Dynamic) {
    if (items3) {
      updateDispatchTransaction();
    }
    resolveDataModelSchemasError(
      editorTableControlsDoc.dom.ownerDocument.defaultView,
      isEditorTableControlsDocResult,
      `PasteRoadError`,
      `paste road threw`,
    );
  } finally {
    if (items3) {
      updateDispatchTransaction();
    }
    defaultView?.removeEventListener(`error`, updateDispatchTransaction2, true);
  }
  return true;
}

function clearEditorTableControlsDelete(
  clearEditorTableControlsDelete2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  items: Dynamic = null,
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorTableControlsTable2: Dynamic = isEditorTableControlsTable(
    clearEditorTableControlsDelete2.doc,
    options,
    context,
  );
  if (!isEditorTableControlsTable2) return null;
  let tr2: Dynamic = clearEditorTableControlsDelete2.tr;
  for (
    let difference = isEditorTableControlsTable2.length - 1;
    difference >= 0;
    difference--
  )
    tr2.delete(
      isEditorTableControlsTable2[difference][0],
      isEditorTableControlsTable2[difference][1],
    );
  let min: number = Math.min(
    tr2.mapping.map(options, -1),
    tr2.doc.content.size,
  );
  if (items) {
    tr2.insertText(items, min);
    min += items.length;
  }
  tr2.setSelection(TextSelection.near(tr2.doc.resolve(min), -1));
  return tr2.setMeta(TableEdgePluginKey, true).scrollIntoView();
}

function isEditorTableControlsResolve(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolve: Dynamic = node.resolve(
    Math.max(0, Math.min(options, node.content.size)),
  );
  for (let depth: Dynamic = resolve.depth; depth > 0; depth--)
    if (resolve.node(depth).type.spec.tableRole !== undefined) return true;
  return false;
}

function resolveEditorTableControlsNode(
  editorTableControlsNode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  editorTableControlsNode.descendants(
    (node?: Dynamic, pos?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void (
        node.type.spec.tableRole === `table` &&
        items.push({
          node: node,
          pos: pos,
        })
      ),
  );
  return items;
}

var isEditorTableControlsColwidthMismatch: (editorTableControlsColwidthMismatch?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveEditorTableControlsHeader(
  editorTableControlsHeader?: Dynamic,
  atStart?: Dynamic,
  length2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic = atStart
    ? editorTableControlsHeader.firstChild
    : editorTableControlsHeader.lastChild;
  let andFill: Dynamic = firstChild?.type.createAndFill({
    header: firstChild.attrs.header,
  });
  return {
    atStart: atStart,
    cells: andFill
      ? Array.from<Dynamic, Dynamic>(
          {
            length: length2,
          },
          (..._extraArguments: unknown[]): Dynamic => andFill,
        )
      : [],
  };
}

function getEditorTableControlsNode(
  editorTableControlsNode?: Dynamic,
  doc?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    resolveEditorTableControlsNode(doc).map(
      (
        editorTableControlsNode2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => editorTableControlsNode2.node,
    ),
  );
  let items: Dynamic = [];
  for (let {
    node: getEditorTableControlsNodeResult,
    pos: getEditorTableControlsNodeResult2,
  } of resolveEditorTableControlsNode(editorTableControlsNode.doc) as Dynamic)
    if (!uniqueItems.has(getEditorTableControlsNodeResult))
      for (let getEditorTableControlsNodeResult3 of (EditorSelectionAndTablesLeft.get(
        getEditorTableControlsNodeResult,
      ).problems ?? []) as Dynamic) {
        if (getEditorTableControlsNodeResult3.type !== `missing`) continue;
        let total: Dynamic = getEditorTableControlsNodeResult2 + 1;
        for (
          let index = 0;
          index < getEditorTableControlsNodeResult3.row;
          index++
        )
          total += getEditorTableControlsNodeResult.child(index).nodeSize;
        let child: Dynamic = getEditorTableControlsNodeResult.child(
          getEditorTableControlsNodeResult3.row,
        );
        let editorTableControlsHeader: Dynamic =
          resolveEditorTableControlsHeader(
            child,
            getEditorTableControlsNodeResult3.row === 0,
            getEditorTableControlsNodeResult3.n,
          );
        if (editorTableControlsHeader.cells.length) {
          items.push([
            editorTableControlsHeader.atStart
              ? total + 1
              : total + child.nodeSize - 1,
            editorTableControlsHeader.cells,
          ]);
        }
      }
  items.sort(
    (item?: Dynamic, item2?: Dynamic, ..._extraArguments: unknown[]): number =>
      item2[0] - item[0],
  );
  for (let [
    getEditorTableControlsNodeResult,
    getEditorTableControlsNodeResult2,
  ] of items as Dynamic)
    editorTableControlsNode.insert(
      getEditorTableControlsNodeResult,
      getEditorTableControlsNodeResult2,
    );
  let editorSelectionAndTablesTable: Dynamic =
    resolveEditorSelectionAndTablesTable(
      EditorState.create({
        doc: editorTableControlsNode.doc,
      }),
      EditorState.create({
        doc: doc,
      }),
    );
  if (editorSelectionAndTablesTable)
    for (let getEditorTableControlsNodeResult of editorSelectionAndTablesTable.steps as Dynamic)
      editorTableControlsNode.step(getEditorTableControlsNodeResult);
}

function isEditorTableControlsNode(
  editorTableControlsNode?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let {
    node: node,
    pos: isEditorTableControlsNodeResult,
  } of resolveEditorTableControlsNode(editorTableControlsNode) as Dynamic) {
    if (
      context.some(
        ([context2, context3]: Dynamic, ..._extraArguments: unknown[]) =>
          context2 <= isEditorTableControlsNodeResult &&
          isEditorTableControlsNodeResult + node.nodeSize <= context3,
      )
    )
      continue;
    let mappedMapping: Dynamic = options.mapping.map(
      isEditorTableControlsNodeResult,
      1,
    );
    let nodeAt: Dynamic =
      mappedMapping < options.doc.content.size
        ? options.doc.nodeAt(mappedMapping)
        : null;
    if (
      !nodeAt ||
      nodeAt.type !== node.type ||
      nodeAt.childCount !== node.childCount
    )
      return false;
    for (let index = 0; index < node.childCount; index++)
      if (nodeAt.child(index).childCount !== node.child(index).childCount)
        return false;
    uniqueItems.add(nodeAt);
  }
  return resolveEditorTableControlsNode(options.doc).every(
    ({ node: node }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      uniqueItems.has(node) || isEditorTableControlsColwidthMismatch(node),
  );
}

function resolveEditorTableControlsNode2(
  editorTableControlsNode2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorTableControlsNode22: Dynamic = editorTableControlsNode2;
  if (
    !editorTableControlsNode22.$anchorCell ||
    typeof editorTableControlsNode22.forEachCell != `function`
  )
    return null;
  let items: Dynamic = [];
  editorTableControlsNode22.forEachCell(
    (node?: Dynamic, pos?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void items.push({
        node: node,
        pos: pos,
      }),
  );
  let cells: Dynamic = items.toSorted(
    (item?: Dynamic, item2?: Dynamic, ..._extraArguments: unknown[]): number =>
      item.pos - item2.pos,
  );
  let table: Dynamic = editorTableControlsNode22.$anchorCell.node(-1);
  let count: number = 0;
  table.forEach(
    (table2?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void (count += table2.childCount),
  );
  return {
    cells: cells,
    table: table,
    tablePos: editorTableControlsNode22.$anchorCell.before(-1),
    all: cells.length > 0 && cells.length === count,
  };
}

function collectEditorTableControlsFrom(
  collectEditorTableControls?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    isEditorTableControlsResolve(collectEditorTableControls.doc, dependencies)
  )
    return null;
  let dropPoint2: Dynamic =
    dropPoint(
      collectEditorTableControls.doc,
      dependencies,
      new (Slice as Dynamic)(Fragment.from(options), 0, 0),
    ) ?? dependencies;
  if (isEditorTableControlsResolve(collectEditorTableControls.doc, dropPoint2))
    return null;
  let tr2: Dynamic = collectEditorTableControls.tr;
  NodeSelection.create(collectEditorTableControls.doc, context).replace(tr2);
  let mappedMapping: Dynamic = tr2.mapping.map(dropPoint2);
  tr2.replaceRangeWith(mappedMapping, mappedMapping, options);
  if (tr2.doc.eq(collectEditorTableControls.doc)) return null;
  let resolve: Dynamic = tr2.doc.resolve(mappedMapping);
  if (
    NodeSelection.isSelectable(options) &&
    resolve.nodeAfter?.sameMarkup(options)
  ) {
    tr2.setSelection(new (NodeSelection as Dynamic)(resolve));
  } else {
    tr2.setSelection(TextSelection.near(resolve, 1));
  }
  return tr2.setMeta(TableEdgePluginKey, true);
}

function clearEditorTableControlsFrom(
  clearEditorTableControls?: Dynamic,
  node?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let { from: selection, to: selection2 }: Dynamic =
    clearEditorTableControls.selection;
  let editorTableControlsNode2: Dynamic = resolveEditorTableControlsNode2(
    clearEditorTableControls.selection,
  );
  if (editorTableControlsNode2?.all && !argument)
    return collectEditorTableControlsFrom(
      clearEditorTableControls,
      editorTableControlsNode2.table,
      editorTableControlsNode2.tablePos,
      context,
    );
  let items: Dynamic = null;
  if (argument)
    items =
      editorTableControlsNode2 ||
      isEditorTableControlsSize(
        clearEditorTableControls.doc,
        selection,
        selection2,
      )
        ? []
        : null;
  else if (editorTableControlsNode2) {
    items = [];
    for (let {
      node: clearEditorTableControlsFromResult,
      pos: clearEditorTableControlsFromResult2,
    } of editorTableControlsNode2.cells as Dynamic)
      resolveEditorTableControlsIsTextblock(
        clearEditorTableControlsFromResult,
        clearEditorTableControlsFromResult2,
        items,
      );
    if (!items.length) {
      items = null;
    }
  } else
    items = isEditorTableControlsTable(
      clearEditorTableControls.doc,
      selection,
      selection2,
    );
  if (
    !items ||
    !node.size ||
    (!argument &&
      !editorTableControlsNode2 &&
      context >= selection &&
      context <= selection2) ||
    isEditorTableControlsResolve(clearEditorTableControls.doc, context)
  )
    return null;
  let dropPoint2: Dynamic =
    dropPoint(clearEditorTableControls.doc, context, node) ?? context;
  if (isEditorTableControlsResolve(clearEditorTableControls.doc, dropPoint2))
    return null;
  let tr2: Dynamic = clearEditorTableControls.tr;
  for (let difference = items.length - 1; difference >= 0; difference--)
    tr2.delete(items[difference][0], items[difference][1]);
  let doc: Dynamic = tr2.doc;
  let mappedMapping: Dynamic = tr2.mapping.map(dropPoint2);
  let firstChild: Dynamic =
    node.openStart === 0 && node.openEnd === 0 && node.content.childCount === 1
      ? node.content.firstChild
      : null;
  if (firstChild) {
    tr2.replaceRangeWith(mappedMapping, mappedMapping, firstChild);
  } else {
    tr2.replaceRange(mappedMapping, mappedMapping, node);
  }
  if (tr2.doc.eq(doc)) return null;
  let mappedMapping2: Dynamic = mappedMapping;
  tr2.mapping.maps[tr2.mapping.maps.length - 1].forEach(
    (
      mapItem?: unknown,
      index?: unknown,
      mapItem2?: unknown,
      mapItem3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void (mappedMapping2 = mapItem3),
  );
  let [items2, setItems]: Dynamic = [
    tr2.doc.resolve(mappedMapping),
    tr2.doc.resolve(mappedMapping2),
  ];
  let dependencies2: Dynamic =
    dependencies?.(items2, setItems) ?? TextSelection.between(items2, setItems);
  let stepsCount: Dynamic = tr2.steps.length;
  getEditorTableControlsNode(tr2, doc);
  return isEditorTableControlsNode(clearEditorTableControls.doc, tr2, items)
    ? (tr2.setSelection(
        dependencies2.map(tr2.doc, tr2.mapping.slice(stepsCount)),
      ),
      tr2.setMeta(TableEdgePluginKey, true))
    : null;
}

var resolveEditorTableControlsValue4: Dynamic;

function resolveEditorTableControlsTable(
  editorTableControlsTable?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let tableRole: Dynamic = editorTableControlsTable.resolve(
    resolveEditorTableControlsValue4(
      editorTableControlsTable,
      options,
      context,
    ),
  ).parent.type.spec.tableRole;
  return tableRole === `row` || tableRole === `table`;
}

var editorTableControlsWeakSet2: Dynamic;

function resolveEditorTableControlsDragging(
  editorTableControlsDragging?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dragging: Dynamic = editorTableControlsDragging.dragging;
  return (
    editorTableControlsWeakSet2.has(editorTableControlsDragging) &&
    !!dragging &&
    resolveEditorTableControlsTable(
      editorTableControlsDragging.state.doc,
      options,
      dragging.slice,
    )
  );
}

function isEditorTableControlsFrom2(
  editorTableControls?: Dynamic,
  node?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorTableControlsValue4: Dynamic = resolveEditorTableControlsValue4(
    editorTableControls.doc,
    context,
    node,
  );
  if (
    !node.size ||
    !isEditorTableControlsResolve(
      editorTableControls.doc,
      editorTableControlsValue4,
    )
  )
    return false;
  let { from: selection, to: selection2 }: Dynamic =
    editorTableControls.selection;
  let tr2: Dynamic = editorTableControls.tr;
  if (dependencies) {
    tr2.deleteSelection();
  }
  let mappedMapping: Dynamic = tr2.mapping.map(editorTableControlsValue4);
  let firstChild: Dynamic =
    node.openStart === 0 && node.openEnd === 0 && node.content.childCount === 1
      ? node.content.firstChild
      : null;
  if (firstChild) {
    tr2.replaceRangeWith(mappedMapping, mappedMapping, firstChild);
  } else {
    tr2.replaceRange(mappedMapping, mappedMapping, node);
  }
  return !isEditorTableControlsNode(
    editorTableControls.doc,
    tr2,
    dependencies ? [[selection, selection2]] : [],
  );
}

function isEditorTableControlsAddToHistory(
  editorTableControlsAdd?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let selection: Dynamic = editorTableControlsAdd.selection;
  if (
    selection.empty ||
    !(selection instanceof (TextSelection as Dynamic)) ||
    !options.docChanged ||
    options.getMeta(TableEdgePluginKey) !== undefined ||
    options.getMeta(`history$`) !== undefined ||
    options.getMeta(`addToHistory`) === false ||
    options.getMeta(`appendedTransaction`) !== undefined ||
    options.steps.length !== 1
  )
    return false;
  let stepItem: Dynamic = options.steps[0];
  if (
    !(
      stepItem instanceof (ReplaceStep as Dynamic) ||
      stepItem instanceof (ReplaceAroundStep as Dynamic)
    )
  )
    return false;
  let stepItem2: Dynamic = stepItem;
  if (
    stepItem2.from > selection.from ||
    stepItem2.to < selection.to ||
    (stepItem2.slice &&
      stepItem2.slice.content.textBetween(
        0,
        stepItem2.slice.content.size,
        ``,
        ``,
      ) !== ``)
  )
    return false;
  let textBetween: Dynamic = (
    node?: Dynamic,
    options2: Dynamic = 0,
    context: Dynamic = node.content.size,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    node.textBetween(
      options2,
      context,
      `
`,
      `
`,
    );
  return (
    textBetween(editorTableControlsAdd.doc).length -
      textBetween(options.doc).length ===
    textBetween(editorTableControlsAdd.doc, selection.from, selection.to).length
  );
}

function isEditorTableControlsUiEvent(
  editorTableControlsUiEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let selection: Dynamic = editorTableControlsUiEvent.selection;
  if (
    selection.empty ||
    !(selection instanceof (TextSelection as Dynamic)) ||
    !options.docChanged ||
    options.getMeta(`uiEvent`) !== `paste` ||
    options.getMeta(TableEdgePluginKey) !== undefined ||
    options.getMeta(`history$`) !== undefined ||
    options.getMeta(`addToHistory`) === false ||
    options.getMeta(`appendedTransaction`) !== undefined
  )
    return false;
  let stepItem: Dynamic = options.steps.length === 1 ? options.steps[0] : null;
  return (
    (stepItem instanceof (ReplaceStep as Dynamic) ||
      stepItem instanceof (ReplaceAroundStep as Dynamic)) &&
    stepItem.from <= selection.from &&
    stepItem.to >= selection.to &&
    stepItem.slice.size > 0
  );
}

function resolveEditorTableControlsEmpty(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [items, setItems, items2]: Dynamic = [Fragment.empty, 0, 0];
  node.content.descendants(
    (node2?: Dynamic, ..._extraArguments: unknown[]) => (
      node2.isTextblock && node2.content.size > 0
        ? ([items, setItems] = [node2.content, setItems + 1])
        : node2.isInline
          ? ([items, setItems] = [items.addToEnd(node2), Math.max(setItems, 1)])
          : node2.isLeaf && items2++,
      !node2.isTextblock && !node2.isInline
    ),
  );
  return setItems === 1 && items2 === 0 ? items : null;
}

var resolveEditorTableControlsEnter: Dynamic;

var resolveEditorTableControlsEnter2: Dynamic;

var resolveEditorTableControlsTest: Dynamic;

function resolveEditorTableControlsSelection(
  editorTableControlsSelection?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorTableControlsSelection.selection;
  return selection.empty || !(selection instanceof (TextSelection as Dynamic))
    ? null
    : clearEditorTableControlsDelete(
        editorTableControlsSelection,
        selection.from,
        selection.to,
      );
}

function isEditorTableControlsKey(
  editorTableControlsKey: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorTableControlsKeyResult: Dynamic = null;
  let isEditorTableControlsKeyResult2: Dynamic = null;
  let unshift: Dynamic = (
    editorTableControlsKey2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let [items, setItems]: Dynamic = [
      editorTableControlsKey2.state,
      (isEditorTableControlsKeyResult2 = []),
    ];
    try {
      editorTableControlsKey2.dispatch(options);
    } finally {
      isEditorTableControlsKeyResult2 = null;
    }
    if (editorTableControlsKey2.state === items) return null;
    let items2: Dynamic = [];
    for (let isEditorTableControlsKeyResult3 of setItems
      .slice(setItems.indexOf(options) + 1)
      .toReversed() as Dynamic)
      if (
        isEditorTableControlsKeyResult3.doc ===
        (items2[0]?.before ?? editorTableControlsKey2.state.doc)
      ) {
        items2.unshift(isEditorTableControlsKeyResult3);
      }
    return items2;
  };
  let plugin: Dynamic = new (Plugin as Dynamic)({
    key: TableEdgePluginKey,
    appendTransaction: (
      editorTableControlsKey2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void isEditorTableControlsKeyResult2?.push(...editorTableControlsKey2),
    view(
      editorTableControlsKey2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      isEditorTableControlsKeyResult = editorTableControlsKey2;
      let dispatchEvent2 = (
        editorTableControlsKey3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let dragging: Dynamic = editorTableControlsKey2.dragging;
        let Event2: Dynamic =
          editorTableControlsKey2.dom.ownerDocument.defaultView?.Event;
        if (!dragging || !Event2 || editorTableControlsKey2.isDestroyed) return;
        let posAtCoords: Dynamic = editorTableControlsKey2.posAtCoords({
          left: editorTableControlsKey3.clientX,
          top: editorTableControlsKey3.clientY,
        });
        if (
          posAtCoords &&
          resolveEditorTableControlsTable(
            editorTableControlsKey2.state.doc,
            posAtCoords.pos,
            dragging.slice,
          )
        ) {
          editorTableControlsKey2.dom.dispatchEvent(
            new (Event2 as Dynamic)(`dragleave`),
          );
        }
      };
      if (editorTableControlsKey.drop) {
        editorTableControlsWeakSet2.add(editorTableControlsKey2);
        editorTableControlsKey2.dom.addEventListener(
          `dragover`,
          dispatchEvent2,
        );
      }
      return {
        destroy: (..._extraArguments: unknown[]): undefined => {
          if (isEditorTableControlsKeyResult === editorTableControlsKey2) {
            isEditorTableControlsKeyResult = null;
          }
          editorTableControlsWeakSet2.delete(editorTableControlsKey2);
          editorTableControlsKey2.dom.removeEventListener(
            `dragover`,
            dispatchEvent2,
          );
        },
      };
    },
    props: {
      handleDOMEvents: {
        keydown(
          editorTableControlsKey2?: Dynamic,
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ) {
          if (
            !resolveEditorTableControlsEnter2(
              event,
              editorTableControlsKey2.state,
            ) ||
            event.isComposing ||
            editorTableControlsKey2.composing ||
            !editorTableControlsKey2.editable ||
            resolveEditorTableControlsTest()
          )
            return false;
          let editorTableControlsSelection: Dynamic =
            resolveEditorTableControlsSelection(editorTableControlsKey2.state);
          return editorTableControlsSelection
            ? (event.preventDefault(),
              editorTableControlsKey2.dispatch(editorTableControlsSelection),
              true)
            : false;
        },
      },
      handleKeyDown(
        editorTableControlsKey2?: Dynamic,
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        if (
          (event.key !== `Backspace` &&
            event.key !== `Delete` &&
            !resolveEditorTableControlsEnter2(
              event,
              editorTableControlsKey2.state,
            )) ||
          event.isComposing
        )
          return false;
        let editorTableControlsSelection: Dynamic =
          resolveEditorTableControlsSelection(editorTableControlsKey2.state);
        return editorTableControlsSelection
          ? (editorTableControlsKey2.dispatch(editorTableControlsSelection),
            true)
          : false;
      },
      handleTextInput(
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        if (options >= context || editorTableControlsKey2.composing)
          return false;
        let clearEditorTableControlsDelete2: Dynamic =
          clearEditorTableControlsDelete(
            editorTableControlsKey2.state,
            options,
            context,
            dependencies,
          );
        return clearEditorTableControlsDelete2
          ? (editorTableControlsKey2.dispatch(clearEditorTableControlsDelete2),
            true)
          : false;
      },
      handlePaste(
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let editorTableControlsSelection: Dynamic =
          resolveEditorTableControlsSelection(editorTableControlsKey2.state);
        if (!editorTableControlsSelection) return false;
        let clipboardData: Dynamic = options.clipboardData;
        return context &&
          !context.size &&
          !clipboardData?.getData(`text/html`) &&
          !clipboardData?.getData(`text/plain`)
          ? false
          : isEditorTableControlsDoc(
              editorTableControlsKey2,
              options,
              context ?? Slice.empty,
              editorTableControlsSelection,
              plugin.props.handlePaste,
              (
                editorTableControlsKey3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                unshift(editorTableControlsKey2, editorTableControlsKey3),
            );
      },
      handleDrop(
        editorTableControlsKey2?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let dragging: Dynamic = editorTableControlsKey2.dragging;
        if (!editorTableControlsKey.drop || !dragging) return false;
        try {
          let posAtCoords: Dynamic = editorTableControlsKey2.posAtCoords({
            left: options.clientX,
            top: options.clientY,
          });
          if (
            posAtCoords &&
            resolveEditorTableControlsTable(
              editorTableControlsKey2.state.doc,
              posAtCoords.pos,
              context,
            )
          )
            return true;
          if (dragging.node) return false;
          let selection: Dynamic = editorTableControlsKey2.state.selection;
          if (
            !resolveEditorTableControlsNode2(selection) &&
            (selection.empty ||
              !(selection instanceof (TextSelection as Dynamic)) ||
              !isEditorTableControlsSize(
                editorTableControlsKey2.state.doc,
                selection.from,
                selection.to,
              ))
          )
            return (
              !!posAtCoords &&
              isEditorTableControlsFrom2(
                editorTableControlsKey2.state,
                context,
                posAtCoords.pos,
                dependencies,
              )
            );
          let posAtCoords2: Dynamic =
            posAtCoords &&
            clearEditorTableControlsFrom(
              editorTableControlsKey2.state,
              context,
              posAtCoords.pos,
              (
                editorTableControlsKey3?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                editorTableControlsKey2.someProp(
                  `createSelectionBetween`,
                  (
                    editorTableControlsKey4?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    editorTableControlsKey4(
                      editorTableControlsKey2,
                      editorTableControlsKey3,
                      options2,
                    ),
                ),
              !dependencies,
            );
          if (posAtCoords2) {
            editorTableControlsKey2.focus();
            editorTableControlsKey2.dispatch(
              posAtCoords2.setMeta(`uiEvent`, `drop`),
            );
          }
        } catch (isEditorTableControlsKeyResult3: Dynamic) {
          resolveDataModelSchemasError(
            editorTableControlsKey2.dom.ownerDocument.defaultView,
            isEditorTableControlsKeyResult3,
            `DropRoadError`,
            `drop road threw`,
          );
        }
        return true;
      },
    },
    filterTransaction(
      editorTableControlsKey2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let isEditorTableControlsKeyResult3: Dynamic =
        isEditorTableControlsKeyResult;
      let { from: selection, to: selection2 }: Dynamic = options.selection;
      if (
        !isEditorTableControlsKeyResult3 ||
        !isEditorTableControlsSize(options.doc, selection, selection2)
      )
        return true;
      let isEditorTableControlsAddToHistory2 =
        isEditorTableControlsAddToHistory(options, editorTableControlsKey2);
      let isEditorTableControlsUiEvent2 = isEditorTableControlsUiEvent(
        options,
        editorTableControlsKey2,
      );
      if (!isEditorTableControlsAddToHistory2 && !isEditorTableControlsUiEvent2)
        return true;
      let meta: Dynamic = editorTableControlsKey2.getMeta(`uiEvent`);
      if (isEditorTableControlsAddToHistory2 && meta === `paste`) return false;
      let editorTableControlsEmpty: Dynamic = isEditorTableControlsUiEvent2
        ? resolveEditorTableControlsEmpty(
            editorTableControlsKey2.steps[0].slice,
          )
        : null;
      if (!(isEditorTableControlsUiEvent2 && !editorTableControlsEmpty)) {
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          if (
            isEditorTableControlsKeyResult3.isDestroyed ||
            !isEditorTableControlsKeyResult3.state.doc.eq(options.doc)
          )
            return;
          let clearEditorTableControlsDelete2: Dynamic =
            clearEditorTableControlsDelete(
              isEditorTableControlsKeyResult3.state,
              selection,
              selection2,
            );
          if (clearEditorTableControlsDelete2) {
            if (editorTableControlsEmpty) {
              let [items, setItems]: Dynamic = [
                clearEditorTableControlsDelete2.selection.from,
                clearEditorTableControlsDelete2.steps.length,
              ];
              clearEditorTableControlsDelete2.replaceRange(
                items,
                items,
                new (Slice as Dynamic)(editorTableControlsEmpty, 0, 0),
              );
              closeHistory(clearEditorTableControlsDelete2)
                .setSelection(
                  TextSelection.near(
                    clearEditorTableControlsDelete2.doc.resolve(
                      clearEditorTableControlsDelete2.mapping
                        .slice(setItems)
                        .map(items, 1),
                    ),
                    -1,
                  ),
                )
                .setMeta(`paste`, true);
            }
            if (meta !== undefined) {
              clearEditorTableControlsDelete2.setMeta(`uiEvent`, meta);
            }
            isEditorTableControlsKeyResult3.dispatch(
              clearEditorTableControlsDelete2,
            );
          }
        });
      }
      return false;
    },
  });
  return plugin;
}

function getEditorTableControlsHead(
  editorTableControlsHead?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorTableControlsHead.state.selection;
  if (!(selection instanceof (TextSelection as Dynamic)) || !selection.empty)
    return null;
  let { $head: selection2 }: Dynamic = selection;
  let node = (
    editorTableControlsHead2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    context < 0
      ? selection2.index(editorTableControlsHead2) === 0
      : selection2.indexAfter(editorTableControlsHead2) ===
        selection2.node(editorTableControlsHead2).childCount;
  let difference = selection2.depth - 1;
  for (; difference > 0; difference--) {
    if (!node(difference)) return null;
    if (resolveEditorTableControlsCell2(selection2.node(difference))) break;
  }
  if (difference < 3) return null;
  let node2: Dynamic = selection2.node(difference - 2);
  if (node2.type.spec.tableRole !== `table`) return null;
  let resolve: Dynamic = editorTableControlsHead.state.doc.resolve(
    context < 0
      ? selection2.before(difference - 2)
      : selection2.after(difference - 2),
  );
  if (
    (context < 0 ? resolve.nodeBefore : resolve.nodeAfter)?.type.spec
      .tableRole !== `table`
  )
    return null;
  if (options === `vert`) {
    if (
      EditorSelectionAndTablesLeft.get(node2).nextCell(
        selection2.before(difference) - selection2.start(difference - 2),
        `vert`,
        context,
      ) !== null
    )
      return null;
  } else if (
    !node(difference - 1) ||
    !node(difference - 2) ||
    selection2.parentOffset !==
      (context < 0 ? 0 : selection2.parent.content.size)
  )
    return null;
  if (
    !editorTableControlsHead.endOfTextblock(
      options === `vert`
        ? context > 0
          ? `down`
          : `up`
        : context > 0
          ? `right`
          : `left`,
    )
  )
    return null;
  let someProp: Dynamic = editorTableControlsHead.someProp(
    `createSelectionBetween`,
    (
      editorTableControlsHead2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      editorTableControlsHead2(editorTableControlsHead, resolve, resolve),
  );
  return someProp instanceof (GapCursor as Dynamic) ? someProp : null;
}

var TableEdgeExtension: Dynamic;

var EditorTableControlsBoundaryMarker: Dynamic;

function resolveEditorTableControlsLeft(
  editorTableControlsLeft?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorTableControlsLeft === `left` ||
    editorTableControlsLeft === `right` ||
    editorTableControlsLeft === `center`
    ? editorTableControlsLeft
    : null;
}

function resolveEditorTableControlsAlign(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let normalizedTrimmedTextAlign: Dynamic = (element.style.textAlign || ``)
    .trim()
    .toLowerCase();
  let normalizedTrimmedAttribute: Dynamic = (
    element.getAttribute(`align`) || ``
  )
    .trim()
    .toLowerCase();
  return resolveEditorTableControlsLeft(
    normalizedTrimmedTextAlign || normalizedTrimmedAttribute,
  );
}

function resolveEditorTableControlsValue5(
  editorTableControlsValue5?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveEditorTableControlsLeft(editorTableControlsValue5?.align);
}

function resolveEditorTableControlsDefault(
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    default: null,
    parseHTML: (
      editorTableControlsDefault?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => resolveEditorTableControlsAlign(editorTableControlsDefault),
    renderHTML: (
      editorTableControlsDefault?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      editorTableControlsDefault.align
        ? {
            style: `text-align: ${editorTableControlsDefault.align}`,
          }
        : {},
  };
}

var TableCellNode: Dynamic;

var TableHeaderNode: Dynamic;

var TableRowNode: Dynamic;

function resolveEditorTableControlsWidth(
  editorTableControlsWidth?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return options
    ? [`width`, `${Math.max(options, editorTableControlsWidth)}px`]
    : [`min-width`, `${editorTableControlsWidth}px`];
}

function resolveEditorTableControlsColspan(
  editorTableControlsColspan?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  var resolveEditorTableControlsColspanResult: Dynamic;
  let count: number = 0;
  let enabled = true;
  let firstChild: Dynamic = options.firstChild;
  let firstChild2: Dynamic = editorTableControlsColspan.firstChild;
  if (firstChild2 !== null)
    for (
      let count2: number = 0, count3: number = 0;
      count2 < firstChild2.childCount;
      count2 += 1
    ) {
      let { colspan: attrs, colwidth: attrs2 }: Dynamic =
        firstChild2.child(count2).attrs;
      for (let count4: number = 0; count4 < attrs; count4 += 1, count3 += 1) {
        let argument3: Dynamic =
          argument === count3 ? argument2 : attrs2 && attrs2[count4];
        let label = argument3 ? `${argument3}px` : ``;
        count += argument3 || dependencies;
        if (!argument3) {
          enabled = false;
        }
        if (firstChild) {
          if (firstChild.style.width !== label) {
            let [
              editorTableControlsWidth,
              setEditorTableControlsWidth,
            ]: Dynamic = resolveEditorTableControlsWidth(
              dependencies,
              argument3,
            );
            firstChild.style.setProperty(
              editorTableControlsWidth,
              setEditorTableControlsWidth,
            );
          }
          firstChild = firstChild.nextSibling;
        } else {
          let element = document.createElement(`col`);
          let [editorTableControlsWidth, setEditorTableControlsWidth]: Dynamic =
            resolveEditorTableControlsWidth(dependencies, argument3);
          element.style.setProperty(
            editorTableControlsWidth,
            setEditorTableControlsWidth,
          );
          options.appendChild(element);
        }
      }
    }
  for (; firstChild; ) {
    let nextSibling: Dynamic = firstChild.nextSibling;
    if (
      !(
        (resolveEditorTableControlsColspanResult = firstChild.parentNode) ==
        null
      )
    ) {
      resolveEditorTableControlsColspanResult.removeChild(firstChild);
    }
    firstChild = nextSibling;
  }
  let style: Dynamic =
    editorTableControlsColspan.attrs.style &&
    typeof editorTableControlsColspan.attrs.style == `string` &&
    /\bwidth\s*:/i.test(editorTableControlsColspan.attrs.style);
  if (enabled && !style) {
    context.style.width = `${count}px`;
    context.style.minWidth = ``;
  } else {
    context.style.width = ``;
    context.style.minWidth = `${count}px`;
  }
}

var EditorTableControlsTableWrapper: Dynamic;

function resolveEditorTableControlsColspan2(
  editorTableControlsColspan2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: number = 0;
  let enabled = true;
  let items: Dynamic = [];
  let firstChild: Dynamic = editorTableControlsColspan2.firstChild;
  if (!firstChild) return {};
  for (
    let count2: number = 0, count3: number = 0;
    count2 < firstChild.childCount;
    count2 += 1
  ) {
    let { colspan: attrs, colwidth: attrs2 }: Dynamic =
      firstChild.child(count2).attrs;
    for (let count4: number = 0; count4 < attrs; count4 += 1, count3 += 1) {
      let dependencies2: Dynamic =
        context === count3 ? dependencies : attrs2 && attrs2[count4];
      count += dependencies2 || options;
      if (!dependencies2) {
        enabled = false;
      }
      let [editorTableControlsWidth, setEditorTableControlsWidth]: Dynamic =
        resolveEditorTableControlsWidth(options, dependencies2);
      items.push([
        `col`,
        {
          style: `${editorTableControlsWidth}: ${setEditorTableControlsWidth}`,
        },
      ]);
    }
  }
  let tableWidth = enabled ? `${count}px` : ``;
  let tableMinWidth = enabled ? `` : `${count}px`;
  return {
    colgroup: [`colgroup`, {}, ...items],
    tableWidth: tableWidth,
    tableMinWidth: tableMinWidth,
  };
}

function resolveEditorTableControlsCreateChecked(
  editorTableControlsCreateChecked?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options
    ? editorTableControlsCreateChecked.createChecked(null, options)
    : editorTableControlsCreateChecked.createAndFill();
}

function resolveEditorTableControlsTableNodeTypes(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (file.cached.tableNodeTypes) return file.cached.tableNodeTypes;
  let record2: Dynamic = {};
  Object.keys(file.nodes).forEach(
    (nodesKey?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let nodeItem: Dynamic = file.nodes[nodesKey];
      if (nodeItem.spec.tableRole) {
        record2[nodeItem.spec.tableRole] = nodeItem;
      }
    },
  );
  file.cached.tableNodeTypes = record2;
  return record2;
}

function resolveEditorTableControlsCell3(
  editorTableControlsCell3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorTableControlsTableNodeTypes: Dynamic =
    resolveEditorTableControlsTableNodeTypes(editorTableControlsCell3);
  let items: Dynamic = [];
  let items2: Dynamic = [];
  for (let count: number = 0; count < context; count += 1) {
    let editorTableControlsCreateChecked: Dynamic =
      resolveEditorTableControlsCreateChecked(
        editorTableControlsTableNodeTypes.cell,
        argument,
      );
    if (editorTableControlsCreateChecked) {
      items2.push(editorTableControlsCreateChecked);
    }
    if (dependencies) {
      let editorTableControlsCreateChecked2: Dynamic =
        resolveEditorTableControlsCreateChecked(
          editorTableControlsTableNodeTypes.header_cell,
          argument,
        );
      if (editorTableControlsCreateChecked2) {
        items.push(editorTableControlsCreateChecked2);
      }
    }
  }
  let items3: Dynamic = [];
  for (let count: number = 0; count < options; count += 1)
    items3.push(
      editorTableControlsTableNodeTypes.row.createChecked(
        null,
        dependencies && count === 0 ? items : items2,
      ),
    );
  return editorTableControlsTableNodeTypes.table.createChecked(null, items3);
}

function resolveEditorTableControlsValue6(
  editorTableControlsValue6?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    editorTableControlsValue6 instanceof
    (EditorSelectionAndTablesRowspan as Dynamic)
  );
}

var isEditorTableControlsEditor: Dynamic;

function resolveEditorTableControlsTrim2(
  editorTableControlsTrim2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (editorTableControlsTrim2 || ``).replace(/\s+/g, ` `).trim();
}

function collectEditorTableControlsText(
  node?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): string {
  let cellLineSeparator: Dynamic = context.cellLineSeparator ?? ``;
  if (!node || !node.content || node.content.length === 0) return ``;
  let items: Dynamic = [];
  node.content.forEach(
    (node2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let items2: Dynamic = [];
      if (node2.content) {
        node2.content.forEach(
          (node3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let label2: string = ``;
            label2 =
              node3.content &&
              Array.isArray(node3.content) &&
              node3.content.length > 1
                ? node3.content
                    .map(
                      (
                        content?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => options.renderChildren(content),
                    )
                    .join(cellLineSeparator)
                : node3.content
                  ? options.renderChildren(node3.content)
                  : ``;
            let text: Dynamic = resolveEditorTableControlsTrim2(label2);
            let isHeader = node3.type === `tableHeader`;
            let align: Dynamic = resolveEditorTableControlsValue5(node3.attrs);
            items2.push({
              text: text,
              isHeader: isHeader,
              align: align,
            });
          },
        );
      }
      items.push(items2);
    },
  );
  let reduce: Dynamic = items.reduce(
    (accumulator?: Dynamic, items2?: Dynamic, ..._extraArguments: unknown[]) =>
      Math.max(accumulator, items2.length),
    0,
  );
  if (reduce === 0) return ``;
  let fill: Dynamic = Array(reduce).fill(0);
  items.forEach((item?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    for (let count: number = 0; count < reduce; count += 1) {
      let textCount: Dynamic = (item[count]?.text || ``).length;
      if (textCount > fill[count]) {
        fill[count] = textCount;
      }
      if (fill[count] < 3) {
        fill[count] = 3;
      }
    }
  });
  let repeat: Dynamic = (
    items2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => items2 + ` `.repeat(Math.max(0, options2 - items2.length));
  let itemItem: Dynamic = items[0];
  let some: Dynamic = itemItem.some(
    (itemItem2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      itemItem2.isHeader,
  );
  let fill2: Dynamic = Array(reduce).fill(null);
  items.forEach((item?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    for (let count: number = 0; count < reduce; count += 1)
      if (!fill2[count] && item[count]?.align) {
        fill2[count] = item[count].align;
      }
  });
  let label: string = `
`;
  let mappedFill: Dynamic = Array(reduce)
    .fill(0)
    .map(
      (
        fill3?: unknown,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (some && itemItem[index] && itemItem[index].text) || ``,
    );
  label += `| ${mappedFill.map((mappedFill2?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]): Dynamic => repeat(mappedFill2, fill[index])).join(` | `)} |
`;
  label += `| ${fill
    .map((fill3?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => {
      let max = Math.max(3, fill3);
      let fillItem: Dynamic = fill2[index];
      return fillItem === `left`
        ? `:${`-`.repeat(max)}`
        : fillItem === `right`
          ? `${`-`.repeat(max)}:`
          : fillItem === `center`
            ? `:${`-`.repeat(max)}:`
            : `-`.repeat(max);
    })
    .join(` | `)} |
`;
  (some ? items.slice(1) : items).forEach(
    (itemsSlice?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      label += `| ${Array(reduce)
        .fill(0)
        .map(
          (
            fill3?: unknown,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            repeat(
              (itemsSlice[index] && itemsSlice[index].text) || ``,
              fill[index],
            ),
        )
        .join(` | `)} |
`;
    },
  );
  return label;
}

var EditorTableControlsState: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorTableControls1Step1(): void {
  Extension.create({
    name: `chipContinuation`,
    priority: 200,
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        Enter: (..._extraArguments: unknown[]): Dynamic => {
          let { state: editor }: Dynamic = this.editor;
          let { $from: selection, empty: selection2 }: Dynamic = editor.selection;
          if (!selection2) return false;
          let parent: Dynamic = selection.parent;
          if (parent.type.name !== `paragraph`) return false;
          if (selection.node(-1)?.type.name === `listItem`)
            return isEditorChipsAndNodeViewsFrom(this.editor);
          let firstChild: Dynamic = parent.firstChild;
          let editorTableControlsBuiltin: Dynamic =
            resolveEditorTableControlsBuiltin(firstChild);
          let matchesFirstChild: Dynamic =
            firstChild !== null &&
            (editorChipsAndNodeViewsSet9.has(firstChild.type.name) ||
              editorTableControlsBuiltin === `checkbox`);
          if (
            !firstChild ||
            !matchesFirstChild ||
            selection.parentOffset < firstChild.nodeSize
          )
            return false;
          let focus: Dynamic = this.editor.chain().focus();
          if (
            !parent
              .textBetween(
                firstChild.nodeSize,
                parent.content.size,
                undefined,
                `￼`,
              )
              .trim()
          )
            return focus
              .deleteRange({
                from: selection.start(),
                to: selection.end(),
              })
              .run();
          let localResult: Dynamic;
          localResult =
            editorTableControlsBuiltin === `checkbox`
              ? [
                  {
                    type: `builtin`,
                    attrs: {
                      builtin: {
                        kind: `checkbox`,
                        checked: false,
                      },
                    },
                  },
                ]
              : firstChild.type.name === `chipCheckbox`
                ? [
                    {
                      type: `chipCheckbox`,
                      attrs: {
                        checked: false,
                      },
                    },
                  ]
                : [
                    {
                      type: firstChild.type.name,
                      attrs: {
                        checked: false,
                        label: `Task`,
                      },
                    },
                    {
                      type: `text`,
                      text: ` `,
                    },
                  ];
          return focus.splitBlock().insertContent(localResult).run();
        },
        Backspace: (..._extraArguments: unknown[]) => {
          let { state: editor }: Dynamic = this.editor;
          let { $from: selection, empty: selection2 }: Dynamic = editor.selection;
          if (!selection2) return false;
          let parent: Dynamic = selection.parent;
          if (
            parent.type.name !== `paragraph` ||
            selection.node(-1)?.type.name === `listItem`
          )
            return false;
          let firstChild: Dynamic = parent.firstChild;
          let editorTableControlsBuiltin: Dynamic =
            resolveEditorTableControlsBuiltin(firstChild);
          let matchesFirstChild: Dynamic =
            firstChild !== null &&
            (editorChipsAndNodeViewsSet10.has(firstChild.type.name) ||
              editorTableControlsBuiltin === `checkbox` ||
              editorTableControlsBuiltin === `date`);
          return !firstChild ||
            !matchesFirstChild ||
            (firstChild.type.name === `chipDate` &&
              String(firstChild.attrs?.value ?? ``)) ||
            (editorTableControlsBuiltin === `date` &&
              typeof firstChild.attrs.builtin?.ts == `string`) ||
            selection.parentOffset < firstChild.nodeSize ||
            parent
              .textBetween(
                firstChild.nodeSize,
                parent.content.size,
                undefined,
                `￼`,
              )
              .trim()
            ? false
            : (this.editor
                .chain()
                .focus()
                .deleteRange({
                  from: selection.start(),
                  to: selection.end(),
                })
                .joinBackward()
                .run(),
              true);
        },
      };
    },
  });
  (isEditorTableControlsValue = (..._extraArguments: unknown[]) => false);
  (editorTableControlsSet = new (Set as Dynamic)([
    `cell`,
    `header_cell`,
    `row`,
    `table`,
  ]));
  (resolveEditorTableControlsTableRole = (
    editorTableControlsTableRole?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorTableControlsTableRole.type.spec.tableRole);
  (resolveEditorTableControlsCell = (
    editorTableControlsCell?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorTableControlsTableRole: Dynamic =
      resolveEditorTableControlsTableRole(editorTableControlsCell);
    return (
      editorTableControlsTableRole === `cell` ||
      editorTableControlsTableRole === `header_cell`
    );
  });
  (editorTableControlsPattern = /^[\s ]*(?:[•◦▪‣·*+-])[\uFE0E\uFE0F]?[\s ]+/);
  (editorTableControlsPattern2 = /^[\s ]*(\d+)[.)][\s ]+/);
  (editorTableControlsPattern3 = /^[\s ]+([a-z]|[ivx]{2,6})[.)][\s ]+/);
  (resolveEditorTableControlsTrim = (
    editorTableControlsTrim?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorTableControlsTrim.slice(options[0].length).trim());
  (resolveEditorTableControlsValue = (
    editorTableControlsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): number => {
    let count: number = 0;
    for (let resolveEditorTableControlsValueResult of editorTableControlsValue as Dynamic)
      if (resolveEditorTableControlsValueResult === `	`) count += 4;
      else if (
        resolveEditorTableControlsValueResult === ` ` ||
        resolveEditorTableControlsValueResult === `\xA0`
      )
        count += 1;
      else break;
    return count;
  });
  (resolveEditorTableControlsValue2 = (
    editorTableControlsValue2: Dynamic = 0,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ): Dynamic => resolveDataModelSchemasDepth3(editorTableControlsValue2, options));
  (editorTableControlsUrlPattern = /\bhttps?:\/\/\S+/g);
  (editorTableControlsSet2 = new (Set as Dynamic)([
    `.`,
    `,`,
    `;`,
    `:`,
    `!`,
    `?`,
    `​`,
    `⁠`,
  ]));
  (resolveEditorTableControlsSlice = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let itemsCount: Dynamic = items.length;
    for (; itemsCount > 0 && editorTableControlsSet2.has(items[itemsCount - 1]); )
      itemsCount--;
    return itemsCount === items.length ? items : items.slice(0, itemsCount);
  });
  (resolveEditorTableControlsListItem = (
    editorTableControlsListItem?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorTableControlsListItem.sinkListItem(`listItem`));
  (resolveEditorTableControlsValue3 = (
    editorTableControlsValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => isEditorTableControlsFrom(editorTableControlsValue3, 1));
  (ListBehaviorExtension = Extension.create({
    name: `listBehavior`,
    priority: 200,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        sink: resolveEditorTableControlsListItem,
      };
    },
    addKeyboardShortcuts(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let editor: Dynamic = this.editor;
      let { sink: options }: Dynamic = this.options;
      return {
        Tab: (..._extraArguments: unknown[]): Dynamic =>
          isEditorSelectionAndTablesHead(editor.state) &&
          !isEditorTableControlsSelection(editor.state)
            ? editor.commands.goToNextCell() ||
              editor.chain().addRowAfter().goToNextCell().run() ||
              true
            : resolveEditorTableControlsState(editor, options) ||
              isEditorTableControlsState(editor, `start`) ||
              true,
        "Shift-Tab": (..._extraArguments: unknown[]): Dynamic =>
          isEditorSelectionAndTablesHead(editor.state) &&
          !isEditorTableControlsSelection(editor.state)
            ? editor.commands.goToPreviousCell() || true
            : resolveEditorTableControlsState2(editor) || true,
        "Mod-]": (..._extraArguments: unknown[]): Dynamic =>
          resolveEditorTableControlsState(editor, options) ||
          isEditorTableControlsState(editor, `anywhere`) ||
          resolveEditorTableControlsValue3(editor.state),
        "Mod-[": (..._extraArguments: unknown[]): Dynamic =>
          resolveEditorTableControlsState2(editor) ||
          resolveEditorTableControlsValue3(editor.state),
      };
    },
    addProseMirrorPlugins(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let { schema: editor }: Dynamic = this.editor;
      return [
        new (Plugin as Dynamic)({
          props: {
            clipboardTextParser: (
              listBehaviorExtension?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let max = options ? Math.max(0, options.depth - 1) : 0;
              return filterEditorTableControlsBulletList(
                editor,
                listBehaviorExtension,
                options
                  ? {
                      baseDepth: resolveDataModelSchemasDepth(options, max),
                      baseLists: resolveDataModelSchemasDepth2(options, max),
                    }
                  : {},
              );
            },
          },
        }),
      ];
    },
  }));
  (resolveEditorTableControlsCell2 = (
    editorTableControlsCell2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorTableControlsCell2.type.spec.tableRole === `cell` ||
    editorTableControlsCell2.type.spec.tableRole === `header_cell`);
  (TableEdgePluginKey = new (PluginKey as Dynamic)(`tableEdge`));
  (EditorTableControlsMessage = `tableEdge$paste`);
  (editorTableControlsWeakSet = new (WeakSet as Dynamic)());
  (EditorTableControlsKey = [
    {
      key: `opPaste`,
      says: `hold`,
      at: `at`,
    },
    {
      key: `lfileDropIndicator`,
      says: `pendingPos`,
    },
  ]);
  (resolveEditorTableControlsMeta = (
    editorTableControlsMeta?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorTableControlsMeta.meta);
  (resolveEditorTableControlsFind = (
    editorTableControlsFind?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    EditorTableControlsKey.find(
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        editorTableControlsFind.startsWith(`${event.key}$`) &&
        /^\d*$/.test(editorTableControlsFind.slice(event.key.length + 1)),
    ));
  (resolveEditorTableControlsSome = (
    editorTableControlsSome?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.keys(editorTableControlsSome).some(
      (editorTableControlsSomeKey?: Dynamic, ..._extraArguments: unknown[]) =>
        editorTableControlsSome[editorTableControlsSomeKey]?.[
          resolveEditorTableControlsFind(editorTableControlsSomeKey)?.says ?? ``
        ] != null,
    ));
  (resolveEditorTableControlsComposition = (
    editorTableControlsComposition?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorTableControlsPaste(
      editorTableControlsComposition,
      options,
    ).setMeta(`composition`, EditorTableControlsMessage));
  (isEditorTableControlsColwidthMismatch = (
    editorTableControlsColwidthMismatch?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !(
      EditorSelectionAndTablesLeft.get(editorTableControlsColwidthMismatch)
        .problems ?? []
    ).some(
      (problem?: Dynamic, ..._extraArguments: unknown[]) =>
        problem.type !== `colwidth mismatch`,
    ));
  (resolveEditorTableControlsValue4 = (
    editorTableControlsValue4?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (context ? dropPoint(editorTableControlsValue4, options, context) : null) ??
    options);
  (editorTableControlsWeakSet2 = new (WeakSet as Dynamic)());
  (resolveEditorTableControlsEnter = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    event.key === `Enter` &&
    !event.shiftKey &&
    !event.altKey &&
    event.metaKey !== event.ctrlKey &&
    (resolvePlatformKeyboardAndSaveStatusNavigator()
      ? event.metaKey
      : event.ctrlKey));
  (resolveEditorTableControlsEnter2 = (
    event?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    event.key === `Enter` &&
    !event.altKey &&
    !(
      resolveEditorTableControlsEnter(event) &&
      resolveEditorExtensionsCheck(options.selection.$from)
    ));
  (resolveEditorTableControlsTest = (
    ..._extraArguments: unknown[]
  ): Dynamic => isiOS() || (isAndroid() && /Chrome\//.test(navigator.userAgent)));
  (TableEdgeExtension = Extension.create({
    name: `tableEdge`,
    priority: 1001,
    addProseMirrorPlugins: (..._extraArguments: unknown[]): Dynamic => [
      isEditorTableControlsKey({
        drop: true,
      }),
    ],
  }));
  (EditorTableControlsBoundaryMarker = resolveEditorAnchorsAndMentionsBoundaryMarker(`ldoc-mention`, {
      boundaryMarker: false,
    }));
  new (PluginKey as Dynamic)(`mentionRepick`);
  (TableCellNode = Node2.create({
    name: `tableCell`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
      };
    },
    content: `block+`,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        colspan: {
          default: 1,
        },
        rowspan: {
          default: 1,
        },
        colwidth: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let attribute: Dynamic = element.getAttribute(`colwidth`);
            let mappedAttributeParts: Dynamic = attribute
              ? attribute
                  .split(`,`)
                  .map((attributePart?: Dynamic, ..._extraArguments: unknown[]) =>
                    parseInt(attributePart, 10),
                  )
              : null;
            if (!mappedAttributeParts) {
              let matchedElements: Dynamic = element
                .closest(`table`)
                ?.querySelectorAll(`colgroup > col`);
              let childrenIndex = Array.from<Dynamic>(
                element.parentElement?.children || [],
              ).indexOf(element);
              if (
                childrenIndex &&
                childrenIndex > -1 &&
                matchedElements &&
                matchedElements[childrenIndex]
              ) {
                let attribute2: Dynamic =
                  matchedElements[childrenIndex].getAttribute(`width`);
                return attribute2 ? [parseInt(attribute2, 10)] : null;
              }
            }
            return mappedAttributeParts;
          },
        },
        align: resolveEditorTableControlsDefault(),
      };
    },
    tableRole: `cell`,
    isolating: true,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `td`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        `td`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },
  }));
  (TableHeaderNode = Node2.create({
    name: `tableHeader`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
      };
    },
    content: `block+`,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        colspan: {
          default: 1,
        },
        rowspan: {
          default: 1,
        },
        colwidth: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let attribute: Dynamic = element.getAttribute(`colwidth`);
            return attribute
              ? attribute
                  .split(`,`)
                  .map((attributePart?: Dynamic, ..._extraArguments: unknown[]) =>
                    parseInt(attributePart, 10),
                  )
              : null;
          },
        },
        align: resolveEditorTableControlsDefault(),
      };
    },
    tableRole: `header_cell`,
    isolating: true,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `th`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        `th`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },
  }));
  (TableRowNode = Node2.create({
    name: `tableRow`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
      };
    },
    content: `(tableCell | tableHeader)*`,
    tableRole: `row`,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `tr`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        `tr`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },
  }));
  (EditorTableControlsTableWrapper = class {
    [key: string]: Dynamic;
    constructor(
      editorTableControlsTableWrapper?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.node = editorTableControlsTableWrapper;
      this.cellMinWidth = options;
      this.dom = document.createElement(`div`);
      this.dom.className = `tableWrapper`;
      this.table = this.dom.appendChild(document.createElement(`table`));
      if (editorTableControlsTableWrapper.attrs.style) {
        this.table.style.cssText = editorTableControlsTableWrapper.attrs.style;
      }
      this.colgroup = this.table.appendChild(document.createElement(`colgroup`));
      resolveEditorTableControlsColspan(
        editorTableControlsTableWrapper,
        this.colgroup,
        this.table,
        options,
      );
      this.contentDOM = this.table.appendChild(document.createElement(`tbody`));
    }
    update(
      editorTableControlsTableWrapper?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return editorTableControlsTableWrapper.type === this.node.type
        ? ((this.node = editorTableControlsTableWrapper),
          resolveEditorTableControlsColspan(
            editorTableControlsTableWrapper,
            this.colgroup,
            this.table,
            this.cellMinWidth,
          ),
          true)
        : false;
    }
    ignoreMutation(
      editorTableControlsTableWrapper?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let options: Dynamic = editorTableControlsTableWrapper.target;
      let contains2: Dynamic = this.dom.contains(options);
      let contains3: Dynamic = this.contentDOM.contains(options);
      return !!(
        contains2 &&
        !contains3 &&
        (editorTableControlsTableWrapper.type === `attributes` ||
          editorTableControlsTableWrapper.type === `childList` ||
          editorTableControlsTableWrapper.type === `characterData`)
      );
    }
  });
  (isEditorTableControlsEditor = (
    { editor: editor }: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let { selection: state }: Dynamic = editor.state;
    if (!resolveEditorTableControlsValue6(state)) return false;
    let count: number = 0;
    findParentNodeClosestToPos(
      state.ranges[0].$from,
      (editorTableControlsEditor?: Dynamic, ..._extraArguments: unknown[]) =>
        editorTableControlsEditor.type.name === `table`,
    )?.node.descendants(
      (editorTableControlsEditor?: Dynamic, ..._extraArguments: unknown[]) => {
        if (editorTableControlsEditor.type.name === `table`) return false;
        if (
          [`tableCell`, `tableHeader`].includes(
            editorTableControlsEditor.type.name,
          )
        ) {
          count += 1;
        }
      },
    );
    return count === state.ranges.length
      ? (editor.commands.deleteTable(), true)
      : false;
  });
  (EditorTableControlsState = collectEditorTableControlsText);
}

export {
  EditorTableControlsBoundaryMarker,
  EditorTableControlsState,
  EditorTableControlsTableWrapper,
  ListBehaviorExtension,
  TableCellNode,
  TableEdgeExtension,
  TableHeaderNode,
  TableRowNode,
  getEditorTableControlsHead,
  isEditorTableControlsEditor,
  isEditorTableControlsSize,
  resolveEditorTableControlsCell3,
  resolveEditorTableControlsColspan2,
  resolveEditorTableControlsDragging,
  resolveEditorTableControlsLeft,
};

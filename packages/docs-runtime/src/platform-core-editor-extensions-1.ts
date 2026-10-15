/** BaoCut: editor extensions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  AddMarkStep,
  EditorState,
  Extension,
  Fragment,
  InputRule,
  Node2,
  NodeRange,
  NodeSelection,
  Plugin,
  PluginKey,
  RemoveMarkStep,
  ReplaceAroundStep,
  ReplaceStep,
  Selection,
  Slice,
  Step,
  StepResult,
  TextSelection,
  Transform,
  canJoin,
  canSplit,
  findParentNode,
  findWrapping,
  getSplittedAttributes,
  isMacOS,
  isiOS,
  liftTarget,
  mergeAttributes,
  wrapInList,
  wrapRangeInList,
  wrappingInputRule,
} from "./platform-core-dependencies";

var resolveEditorExtensionsLift: (editorExtensionsLift?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function isEditorExtensionsFrom(
  editorExtensions?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let enabled = false;
  for (let {
    $from: isEditorExtensionsFromResult,
    $to: isEditorExtensionsFromResult2,
  } of options.ranges as Dynamic)
    editorExtensions.nodesBetween(
      isEditorExtensionsFromResult.pos,
      isEditorExtensionsFromResult2.pos,
      (node?: Dynamic, options2?: Dynamic, ..._extraArguments: unknown[]) => {
        if (enabled) return false;
        let tableRole: Dynamic = node.type.spec.tableRole;
        let total: Dynamic = options2 + node.nodeSize;
        if (tableRole === `table`) {
          if (
            options2 < isEditorExtensionsFromResult.pos &&
            isEditorExtensionsFromResult2.pos < total
          )
            return true;
          let matchesPos =
            isEditorExtensionsFromResult.pos <= options2 &&
            options2 + 1 + Selection.atEnd(node).to <=
              isEditorExtensionsFromResult2.pos;
          let enabled2: Dynamic = false;
          if (matchesPos) {
            node.descendants(
              (editorExtensions2?: Dynamic, ..._extraArguments: unknown[]) => {
                let tableRole2: Dynamic = editorExtensions2.type.spec.tableRole;
                return tableRole2 !== `cell` && tableRole2 !== `header_cell`
                  ? !enabled2
                  : (editorExtensions2.forEach(
                      (
                        rolldownNImport2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined =>
                        void (enabled2 ||= !rolldownNImport2.isTextblock),
                    ),
                    false);
              },
            );
          }
          if (!matchesPos || enabled2) {
            enabled = true;
          }
          return false;
        }
        return (tableRole !== `cell` && tableRole !== `header_cell`) ||
          (options2 < isEditorExtensionsFromResult.pos &&
            isEditorExtensionsFromResult2.pos < total)
          ? true
          : ((enabled = true), false);
      },
    );
  return enabled;
}

function resolveEditorExtensionsChildCount(
  editorExtensionsChildCount?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [items, setItems]: Dynamic = [0, 0];
  for (
    ;
    items < editorExtensionsChildCount.childCount &&
    setItems + editorExtensionsChildCount.child(items).nodeSize <= options;

  )
    setItems += editorExtensionsChildCount.child(items++).nodeSize;
  let maybeChild: Dynamic = editorExtensionsChildCount.maybeChild(items);
  return setItems === options || !maybeChild || maybeChild.isText
    ? editorExtensionsChildCount
        .cut(0, options)
        .append(context)
        .append(editorExtensionsChildCount.cut(options))
    : editorExtensionsChildCount.replaceChild(
        items,
        maybeChild.copy(
          resolveEditorExtensionsChildCount(
            maybeChild.content,
            options - setItems - 1,
            context,
          ),
        ),
      );
}

function isEditorExtensionsResolve(
  editorExtensionsResolve?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolve: Dynamic = editorExtensionsResolve.resolve(options);
  let [items, setItems]: Dynamic = [context - options, resolve.depth];
  for (
    ;
    items > 0 &&
    setItems > 0 &&
    resolve.indexAfter(setItems) === resolve.node(setItems).childCount;

  ) {
    setItems--;
    items--;
  }
  if (items > 0) {
    let maybeChild: Dynamic = resolve
      .node(setItems)
      .maybeChild(resolve.indexAfter(setItems));
    for (; items > 0; ) {
      if (!maybeChild || maybeChild.isLeaf) return true;
      maybeChild = maybeChild.firstChild;
      items--;
    }
  }
  return false;
}

var resolveEditorExtensionsStructure: (editorExtensionsStructure?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveEditorExtensionsFrom: Dynamic;

var resolveEditorExtensionsFromJSON: Dynamic;

var EditorExtensionsStepType: Dynamic;

var EditorExtensionsStepType2: Dynamic;

function isEditorExtensionsFailed(
  editorExtensionsFailed?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsFailed.map(
    (
      rolldownNImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !(rolldownNImport2 instanceof (ReplaceAroundStep as Dynamic)) ||
      rolldownNImport2 instanceof (EditorExtensionsStepType2 as Dynamic)
        ? rolldownNImport2
        : new (Transform as Dynamic)(options[index + 1] ?? context).maybeStep(
              rolldownNImport2.invert(options[index]),
            ).failed
          ? new (EditorExtensionsStepType2 as Dynamic)(
              ...resolveEditorExtensionsFrom(rolldownNImport2),
            )
          : rolldownNImport2,
  );
}

function collectEditorExtensionsFrom(
  collectEditorExtensions?: Dynamic,
  options: Dynamic = resolveEditorExtensionsLift,
  ..._extraArguments: unknown[]
): undefined {
  let doc: Dynamic = collectEditorExtensions.doc;
  let min: Dynamic = (Math.min as Dynamic)(
    ...collectEditorExtensions.selection.ranges.map(
      (range?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        range.$from.pos,
    ),
  );
  let reduce: Dynamic = collectEditorExtensions.selection.ranges.reduce(
    (
      accumulator?: Dynamic,
      range?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (range.$to.pos > accumulator.pos ? range.$to : accumulator),
    collectEditorExtensions.selection.$to,
  );
  let open: Dynamic =
    reduce.parent.isTextblock &&
    reduce.parentOffset < reduce.parent.content.size;
  for (let {
    $from: collectEditorExtensionsFromResult,
    $to: collectEditorExtensionsFromResult2,
  } of collectEditorExtensions.selection.ranges as Dynamic)
    doc.nodesBetween(
      collectEditorExtensionsFromResult.pos,
      collectEditorExtensionsFromResult2.pos,
      (
        node?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (node.isText) return;
        let resolve: Dynamic = collectEditorExtensions.doc.resolve(
          collectEditorExtensions.mapping.map(options2),
        );
        let resolve2: Dynamic = collectEditorExtensions.doc.resolve(
          collectEditorExtensions.mapping.map(options2 + node.nodeSize),
        );
        let blockRange: Dynamic = resolve.blockRange(resolve2);
        if (!blockRange) return;
        let liftTarget2: Dynamic = liftTarget(blockRange);
        if (node.isTextblock) {
          collectEditorExtensions.setNodeMarkup(
            blockRange.start,
            resolve.parent.contentMatchAt(resolve.index()).defaultType ??
              undefined,
          );
        }
        if (liftTarget2 || liftTarget2 === 0) {
          options(collectEditorExtensions, blockRange, liftTarget2, {
            from: collectEditorExtensions.mapping.map(min, 1),
            to: collectEditorExtensions.mapping.map(reduce.pos, -1),
            open: open,
          });
        }
      },
    );
}

function resolveEditorExtensionsDoc(
  doc?: Dynamic,
  selection?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = resolveEditorExtensionsLift,
  ..._extraArguments: unknown[]
): Dynamic {
  if (isEditorExtensionsFrom(doc, selection)) return null;
  let tr2: Dynamic = EditorState.create({
    doc: doc,
    selection: selection,
  }).tr;
  collectEditorExtensionsFrom(tr2, dependencies);
  let [items, scrolled]: Dynamic = [false, false];
  context(
    EditorState.create({
      doc: tr2.doc,
      selection: tr2.selection,
    }),
    (
      editorExtensionsDoc?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let resolveEditorExtensionsDocResult of editorExtensionsDoc.steps as Dynamic)
        tr2.step(resolveEditorExtensionsDocResult);
      tr2.setSelection(
        Selection.fromJSON(tr2.doc, editorExtensionsDoc.selection.toJSON()),
      );
      [items, scrolled] = [true, editorExtensionsDoc.scrolledIntoView];
    },
  );
  return items
    ? {
        steps:
          selection.ranges.length === 1 &&
          selection.$from.sameParent(selection.$to)
            ? isEditorExtensionsFailed(tr2.steps, tr2.docs, tr2.doc)
            : tr2.steps,
        selection: tr2.selection,
        scrolled: scrolled,
      }
    : null;
}

function resolveEditorExtensionsSteps(
  editorExtensionsSteps?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveEditorExtensionsStepsResult of options.steps as Dynamic)
    editorExtensionsSteps.step(resolveEditorExtensionsStepsResult);
  let fromJSON: Dynamic = Selection.fromJSON(
    editorExtensionsSteps.doc,
    options.selection.toJSON(),
  );
  if (!editorExtensionsSteps.selection.eq(fromJSON)) {
    editorExtensionsSteps.setSelection(fromJSON);
  }
  if (options.scrolled) {
    editorExtensionsSteps.scrollIntoView();
  }
}

var EditorExtensionsLdocTickedNow: string;

var EditorExtensionsLdocStrikeDrawing: string;

var EditorExtensionsLdocStrike: string;

var editorExtensionsWeakMap: Dynamic;

function updateEditorExtensionsDelete(
  updateEditorExtensionsDelete2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  editorExtensionsWeakMap.set(updateEditorExtensionsDelete2, options);
  try {
    return context();
  } finally {
    editorExtensionsWeakMap.delete(updateEditorExtensionsDelete2);
  }
}

var clearEditorExtensionsDelete: Dynamic;

var isEditorExtensionsMatchMedia: (editorExtensionsMatchMedia?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveEditorExtensionsExec: Dynamic;

var collectEditorExtensionsExec: Dynamic;

var resolveEditorExtensionsValue: Dynamic;

function filterEditorExtensionsOffset(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let ownerDocument2: Dynamic = element.ownerDocument;
  element.querySelector(`:scope>.${EditorExtensionsLdocStrike}`)?.remove();
  element.classList.remove(EditorExtensionsLdocStrikeDrawing);
  if (
    typeof element.animate != `function` ||
    !isEditorExtensionsMatchMedia(ownerDocument2)
  )
    return;
  let range: Dynamic = ownerDocument2.createRange();
  range.selectNodeContents(options);
  let filteredClientRects: Dynamic =
    typeof range.getClientRects == `function`
      ? Array.from<Dynamic>(range.getClientRects()).filter(
          (clientRect?: Dynamic, ..._extraArguments: unknown[]) =>
            clientRect.width > 0 && clientRect.height > 0,
        )
      : [];
  if (filteredClientRects.length === 0) return;
  let items: Dynamic = [];
  for (let filterEditorExtensionsOffsetResult of filteredClientRects.toSorted(
    (
      filteredClientRect?: Dynamic,
      filteredClientRect2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      filteredClientRect.top - filteredClientRect2.top ||
      filteredClientRect.left - filteredClientRect2.left,
  ) as Dynamic) {
    let amount =
      (filterEditorExtensionsOffsetResult.top +
        filterEditorExtensionsOffsetResult.bottom) /
      2;
    let item: Dynamic = items.find(
      (item2?: Dynamic, ..._extraArguments: unknown[]) =>
        amount > item2.t && amount < item2.b,
    );
    if (item) {
      item.l = Math.min(item.l, filterEditorExtensionsOffsetResult.left);
      item.r = Math.max(item.r, filterEditorExtensionsOffsetResult.right);
    } else {
      items.push({
        l: filterEditorExtensionsOffsetResult.left,
        r: filterEditorExtensionsOffsetResult.right,
        t: filterEditorExtensionsOffsetResult.top,
        b: filterEditorExtensionsOffsetResult.bottom,
      });
    }
  }
  let elementBounds: Dynamic = element.getBoundingClientRect();
  let computedStyle = getComputedStyle(options);
  let matchesDirection = computedStyle.direction === `rtl`;
  let number2 = parseFloat(computedStyle.fontSize);
  let max = Math.max(
    1,
    Math.round((Number.isFinite(number2) ? number2 : 16) / 16),
  );
  let element2: Dynamic = ownerDocument2.createElement(`span`);
  element2.className = EditorExtensionsLdocStrike;
  element2.setAttribute(`aria-hidden`, `true`);
  let reduce: Dynamic = items.reduce(
    (
      accumulator?: Dynamic,
      item?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => accumulator + (item.r - item.l),
    0,
  );
  let duration: Dynamic = context
    ? resolveEditorExtensionsExec(element, `--cds-dur-sheet`, 300)
    : resolveEditorExtensionsExec(element, `--cds-dur-snap`, 120);
  let collectEditorExtensionsExec2: Dynamic = context
    ? collectEditorExtensionsExec(
        element,
        `--cds-ease-snap`,
        [0.32, 0.72, 0, 1],
      )
    : collectEditorExtensionsExec(
        element,
        `--cds-ease-out`,
        [0.165, 0.84, 0.44, 1],
      );
  let items2: Dynamic = [];
  let count: Dynamic = 0;
  for (let filterEditorExtensionsOffsetResult of items as Dynamic) {
    let element3: Dynamic = ownerDocument2.createElement(`i`);
    element3.style.cssText = `left:${filterEditorExtensionsOffsetResult.l - elementBounds.left}px;top:${filterEditorExtensionsOffsetResult.t + (filterEditorExtensionsOffsetResult.b - filterEditorExtensionsOffsetResult.t) * 0.54 - max / 2 - elementBounds.top}px;width:${filterEditorExtensionsOffsetResult.r - filterEditorExtensionsOffsetResult.l}px;height:${max}px${matchesDirection ? `;transform-origin:100% 50%` : ``}`;
    element2.append(element3);
    let amount: Dynamic = count / reduce;
    let amount2: Dynamic =
      (count +
        (filterEditorExtensionsOffsetResult.r -
          filterEditorExtensionsOffsetResult.l)) /
      reduce;
    count +=
      filterEditorExtensionsOffsetResult.r -
      filterEditorExtensionsOffsetResult.l;
    let items3: Dynamic = [];
    for (let index = 0; index <= 16; index++) {
      let editorExtensionsValue: Dynamic = resolveEditorExtensionsValue(
        collectEditorExtensionsExec2,
        index / 16,
      );
      let editorExtensionsValue2: Dynamic = context
        ? editorExtensionsValue
        : 1 - editorExtensionsValue;
      items3.push({
        offset: index / 16,
        transform: `scaleX(${Math.min(1, Math.max(0, (editorExtensionsValue2 - amount) / (amount2 - amount)))})`,
      });
    }
    items2.push(
      element3.animate(items3, {
        duration: duration,
        fill: `forwards`,
      }).finished,
    );
  }
  element.append(element2);
  if (context) {
    element.classList.add(EditorExtensionsLdocStrikeDrawing);
  }
  let animate = (..._extraArguments: unknown[]): undefined => {
    if (element2.isConnected) {
      element.classList.remove(EditorExtensionsLdocStrikeDrawing);
      if (!context) return void element2.remove();
      element2
        .animate(
          [
            {
              opacity: 0.65,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 160,
            fill: `forwards`,
          },
        )
        .finished.then(
          (..._extraArguments: unknown[]): Dynamic => element2.remove(),
          (..._extraArguments: unknown[]): Dynamic => element2.remove(),
        );
    }
  };
  Promise.all(items2).then(animate, animate);
}

function isEditorExtensionsFrom2(
  editorExtensions?: Dynamic,
  options: Dynamic = EditorExtensionsListItem,
  ..._extraArguments: unknown[]
) {
  let $from: Dynamic = editorExtensions.selection.$from;
  for (let depth: Dynamic = $from.depth; depth > 0; depth--)
    if ($from.node(depth).type.name === options)
      return $from.index(depth) === 0 && depth + 1 === $from.depth;
  return false;
}

function resolveEditorExtensionsFrom2(
  editorExtensions?: Dynamic,
  options: Dynamic = EditorExtensionsListItem,
  ..._extraArguments: unknown[]
): Dynamic {
  let { $from: selection, empty: selection2 }: Dynamic =
    editorExtensions.selection;
  return (
    selection2 &&
    editorExtensions.selection instanceof (TextSelection as Dynamic) &&
    selection.parentOffset === 0 &&
    selection.depth >= 3 &&
    selection.parent.type.name === `paragraph` &&
    selection.node(-1).type.name === options &&
    selection.index(-1) > 0
  );
}

function isEditorExtensionsFrom3(
  editorExtensions?: Dynamic,
  options: Dynamic = EditorExtensionsListItem,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveEditorExtensionsFrom2(editorExtensions, options)) return false;
  let { $from: selection }: Dynamic = editorExtensions.selection;
  return (
    selection.parent.content.size > 0 &&
    canSplit(editorExtensions.doc, selection.before(), 1, [
      {
        type: selection.node(-1).type,
      },
    ])
  );
}

function resolveEditorExtensionsCheck(
  editorExtensionsCheck?: Dynamic,
  options: Dynamic = EditorExtensionsListItem,
  ..._extraArguments: unknown[]
) {
  return (
    editorExtensionsCheck.depth >= 2 &&
    !editorExtensionsCheck.parent.type.spec.code &&
    editorExtensionsCheck.node(-1).type.name === options &&
    resolveEditorExtensionsList(editorExtensionsCheck.node(-2)) === `check`
  );
}

var EditorExtensionsList: string;

var EditorExtensionsListItem: string;

var editorExtensionsBulletOrderedCheckValues: string[];

var editorExtensionsAAIIValues: string[];

var resolveEditorExtensionsIncludes: Dynamic;

var EditorExtensionsLowerAlpha: Dynamic;

var resolveEditorExtensionsIncludes2: Dynamic;

function resolveEditorExtensionsList(
  editorExtensionsList?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsList.type.name === `list`
    ? resolveEditorExtensionsIncludes2(editorExtensionsList.attrs.kind)
      ? editorExtensionsList.attrs.kind
      : `bullet`
    : null;
}

var editorExtensionsSet: Dynamic;

function resolveEditorExtensionsFirstChild(
  editorExtensionsFirstChild?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic = editorExtensionsFirstChild.firstChild;
  for (let count: Dynamic = 0; firstChild !== null && count < 8; )
    if (firstChild.nodeType === 3) {
      if ((firstChild.nodeValue ?? ``).trim()) return firstChild;
      firstChild = firstChild.nextSibling;
    } else if (
      firstChild.nodeType !== 1 ||
      !editorExtensionsSet.has(firstChild.tagName)
    ) {
      if (firstChild.nodeType === 1) return firstChild;
      firstChild = firstChild.nextSibling;
    } else {
      firstChild = firstChild.firstChild;
      count += 1;
    }
  return null;
}

function resolveEditorExtensionsINPUT(
  editorExtensionsINPUT?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsFirstChild: Dynamic = resolveEditorExtensionsFirstChild(
    editorExtensionsINPUT,
  );
  if (!editorExtensionsFirstChild || editorExtensionsFirstChild.nodeType !== 1)
    return null;
  let editorExtensionsFirstChild2: Dynamic = editorExtensionsFirstChild;
  return editorExtensionsFirstChild2.tagName === `INPUT` &&
    (editorExtensionsFirstChild2.getAttribute(`type`) ?? ``).toLowerCase() ===
      `checkbox`
    ? editorExtensionsFirstChild2
    : null;
}

var editorExtensionsPattern: RegExp;

var editorExtensionsPattern2: RegExp;

var editorExtensionsPattern3: RegExp;

function resolveEditorExtensionsDataPmSlice(
  editorExtensionsDataPmSlice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !editorExtensionsDataPmSlice.includes(`<li`) ||
    !editorExtensionsPattern2.test(editorExtensionsDataPmSlice) ||
    editorExtensionsDataPmSlice.includes(`data-pm-slice`) ||
    editorExtensionsPattern3.test(editorExtensionsDataPmSlice) ||
    typeof DOMParser === "undefined"
  )
    return editorExtensionsDataPmSlice;
  try {
    let fromString2 = new DOMParser().parseFromString(
      editorExtensionsDataPmSlice,
      `text/html`,
    );
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    for (let resolveEditorExtensionsDataPmSliceResult of Array.from<Dynamic>(
      fromString2.body.querySelectorAll(`ul > li`),
    ) as Dynamic) {
      let parentElement: Dynamic =
        resolveEditorExtensionsDataPmSliceResult.parentElement;
      if (
        !parentElement ||
        parentElement.hasAttribute(`data-kind`) ||
        resolveEditorExtensionsDataPmSliceResult.hasAttribute(`data-checked`)
      )
        continue;
      let editorExtensionsFirstChild: Dynamic =
        resolveEditorExtensionsFirstChild(
          resolveEditorExtensionsDataPmSliceResult,
        );
      let match =
        editorExtensionsFirstChild && editorExtensionsFirstChild.nodeType === 3
          ? editorExtensionsPattern.exec(
              editorExtensionsFirstChild.nodeValue ?? ``,
            )
          : null;
      if (!(!editorExtensionsFirstChild || !match)) {
        editorExtensionsFirstChild.nodeValue = (
          editorExtensionsFirstChild.nodeValue ?? ``
        ).slice(match[0].length);
        resolveEditorExtensionsDataPmSliceResult.setAttribute(
          `data-checked`,
          (match[1] ?? ``).toLowerCase() === `x` ? `true` : `false`,
        );
        uniqueItems.add(parentElement);
      }
    }
    if (uniqueItems.size === 0) return editorExtensionsDataPmSlice;
    for (let resolveEditorExtensionsDataPmSliceResult of uniqueItems as Dynamic)
      resolveEditorExtensionsDataPmSliceResult.setAttribute(
        `data-kind`,
        `check`,
      );
    return fromString2.body.innerHTML;
  } catch {
    return editorExtensionsDataPmSlice;
  }
}

function isEditorExtensionsChecked(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsINPUT: Dynamic = resolveEditorExtensionsINPUT(element);
  if (editorExtensionsINPUT)
    return editorExtensionsINPUT.hasAttribute(`checked`);
  if (element.classList.contains(`task-list-item`)) return false;
  if (
    element.getAttribute(`role`) === `checkbox` ||
    element.hasAttribute(`aria-checked`)
  )
    return element.getAttribute(`aria-checked`) === `true`;
}

function resolveEditorExtensionsDataKind(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    element.getAttribute(`data-kind`) === `check` ||
    element.classList.contains(`contains-task-list`)
  )
    return `check`;
  for (let resolveEditorExtensionsDataKindResult of Array.from<Dynamic>(
    element.children,
  ) as Dynamic)
    if (
      resolveEditorExtensionsDataKindResult.tagName === `LI` &&
      isEditorExtensionsChecked(resolveEditorExtensionsDataKindResult) !==
        undefined
    )
      return `check`;
  return element.tagName === `OL` ? `ordered` : `bullet`;
}

var editorExtensionsSet2: Dynamic;

var ProseListPasteMarkersPluginKey: Dynamic;

var editorExtensionsPattern4: RegExp;

var editorExtensionsPattern5: RegExp;

var editorExtensionsPattern6: RegExp;

function resolveEditorExtensionsPos(
  editorExtensionsPos?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let difference: Dynamic = editorExtensionsPos.parent.isTextblock
    ? editorExtensionsPos.depth - 1
    : editorExtensionsPos.depth;
  return difference < 1 ||
    editorExtensionsPos.node(difference).type.name !== `listItem`
    ? null
    : {
        pos: editorExtensionsPos.before(difference - 1),
        node: editorExtensionsPos.node(difference - 1),
        depth: difference - 1,
      };
}

var editorExtensionsValue_1: boolean;

var resolveEditorExtensionsValue2: Dynamic;

function isEditorExtensionsFrom4(
  editorExtensions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    $from: selection,
    from: selection2,
    to: selection3,
  }: Dynamic = editorExtensions.selection;
  let depth: Dynamic = selection.sharedDepth(selection3);
  let isEditorExtensionsFrom4Handler: Dynamic = (
    editorExtensions2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensions2.isTextblock ||
    editorExtensions2.type.name === `list` ||
    editorExtensions2.type.name === `listItem`;
  for (; depth > 0 && isEditorExtensionsFrom4Handler(selection.node(depth)); )
    --depth;
  let node: Dynamic = selection.node(depth);
  let lookup: Dynamic = new (Map as Dynamic)();
  let loose: Dynamic = [];
  let isEditorExtensionsFrom4Result: Dynamic = -1;
  let isEditorExtensionsFrom4Handler2: Dynamic = (
    editorExtensions2?: Dynamic,
    node2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    selection2 === selection3
      ? editorExtensions2 < selection2 &&
        selection2 < editorExtensions2 + node2.nodeSize
      : editorExtensions2 + 1 < selection3;
  editorExtensions.doc.nodesBetween(
    selection2,
    selection3,
    (
      node2?: Dynamic,
      from?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (!node2.isBlock) return false;
      let total: Dynamic = editorExtensions.doc.resolve(from).depth + 1;
      if (total <= depth) return true;
      if (total === depth + 1 && context === node)
        return node2.type.name === `list`
          ? true
          : (resolveEditorExtensionsValue2(node2) &&
              isEditorExtensionsFrom4Handler2(from, node2) &&
              (isEditorExtensionsFrom4Result === from
                ? (loose[loose.length - 1].to = from + node2.nodeSize)
                : loose.push({
                    from: from,
                    to: from + node2.nodeSize,
                  }),
              (isEditorExtensionsFrom4Result = from + node2.nodeSize)),
            false);
      if (node2.type.name === `list` || node2.type.name === `listItem`)
        return true;
      if (
        context?.type.name === `listItem` &&
        node2.isTextblock &&
        isEditorExtensionsFrom4Handler2(from, node2)
      ) {
        let editorExtensionsPos: Dynamic = resolveEditorExtensionsPos(
          editorExtensions.doc.resolve(from + 1),
        );
        if (editorExtensionsPos) {
          lookup.set(editorExtensionsPos.pos, editorExtensionsPos);
        }
      }
      return false;
    },
  );
  let lists: Dynamic = [...lookup.values()].toSorted(
    (item?: Dynamic, item2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      item.pos - item2.pos,
  );
  if (selection2 < selection3) {
    let max: Dynamic = (Math.max as Dynamic)(
      -1,
      ...lists.map(
        (list?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          list.pos + list.node.nodeSize,
      ),
    );
    let min: Dynamic = (Math.min as Dynamic)(
      2 ** 53 - 1,
      ...lists.map(
        (list?: Dynamic, ..._extraArguments: unknown[]): Dynamic => list.pos,
      ),
    );
    for (
      let looseItem: Dynamic = loose[loose.length - 1];
      looseItem && looseItem.to > max;
      looseItem = loose[loose.length - 1]
    ) {
      let nodeBefore: Dynamic = editorExtensions.doc.resolve(
        looseItem.to,
      ).nodeBefore;
      if (!nodeBefore || nodeBefore.content.size > 0) break;
      looseItem.to -= nodeBefore.nodeSize;
      if (looseItem.to <= looseItem.from) {
        loose.pop();
      }
    }
    for (
      let looseItem: Dynamic = loose[0];
      looseItem && looseItem.from < min;
      looseItem = loose[0]
    ) {
      let nodeAt: Dynamic = editorExtensions.doc.nodeAt(looseItem.from);
      if (!nodeAt || nodeAt.content.size > 0) break;
      looseItem.from += nodeAt.nodeSize;
      if (looseItem.to <= looseItem.from) {
        loose.shift();
      }
    }
  }
  return {
    flow: {
      depth: depth,
      start: depth === 0 ? 0 : selection.start(depth),
    },
    lists: lists,
    loose: loose,
  };
}

function resolveEditorExtensionsKind(
  kind?: Dynamic,
  options: Dynamic = {},
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let context2: Dynamic =
    kind === `ordered`
      ? (context ?? (typeof options.start == `number` ? options.start : null))
      : null;
  return {
    ...options,
    kind: kind,
    start: typeof context2 == `number` && context2 > 1 ? context2 : null,
    numbering:
      kind === `ordered`
        ? resolveEditorExtensionsIncludes(options.numbering)
        : null,
  };
}

var EditorExtensionsMessage: string;

function isEditorExtensionsSteps(
  editorExtensionsSteps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let doc: Dynamic = editorExtensionsSteps.doc;
    for (
      let difference = editorExtensionsSteps.steps.length - 1;
      difference >= 0;
      difference--
    ) {
      let apply: Dynamic = editorExtensionsSteps.steps[difference]
        .invert(editorExtensionsSteps.docs[difference])
        .apply(doc);
      if (apply.failed !== null || apply.doc === null) return false;
      doc = apply.doc;
    }
    return doc.eq(editorExtensionsSteps.before);
  } catch {
    return false;
  }
}

function resolveEditorExtensionsFrom3(
  editorExtensions?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let { $from: options2, $to: options3, depth: options4 }: Dynamic = options;
  let before: Dynamic = options2.before(options4 + 1);
  let after: Dynamic = options3.after(options4 + 1);
  let before2: Dynamic = before;
  let after2: Dynamic = after;
  let empty: Dynamic = Fragment.empty;
  let index = 0;
  for (
    let options5: Dynamic = options4, enabled = false;
    options5 > context;
    options5--
  )
    if (enabled || options2.index(options5) > 0) {
      enabled = true;
      empty = Fragment.from(options2.node(options5).copy(empty));
      index++;
    } else {
      before2--;
    }
  let empty2: Dynamic = Fragment.empty;
  let index2 = 0;
  for (
    let options5: Dynamic = options4, enabled = false;
    options5 > context;
    options5--
  )
    if (enabled || options3.after(options5 + 1) < options3.end(options5)) {
      enabled = true;
      empty2 = Fragment.from(options3.node(options5).copy(empty2));
      index2++;
    } else {
      after2++;
    }
  let slice: Dynamic = new (Slice as Dynamic)(
    empty.append(Fragment.from(dependencies)).append(empty2),
    index,
    index2,
  );
  editorExtensions.step(
    new (ReplaceAroundStep as Dynamic)(
      before2,
      after2,
      before,
      after,
      slice,
      empty.size - index + 1,
      true,
    ),
  );
}

function collectEditorExtensionsList(
  collectEditorExtensionsList2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let parent: Dynamic = options.parent;
  let maybeChild: Dynamic = parent.maybeChild(options.startIndex);
  let depth: Dynamic = options.depth;
  if (
    options.endIndex - options.startIndex !== 1 ||
    !maybeChild ||
    maybeChild.type.name !== `list` ||
    parent.type.name !== `listItem` ||
    depth < 2 ||
    context > depth - 2 ||
    options.$from.node(depth - 1).type.name !== `list`
  )
    return null;
  let [items, setItems]: Dynamic = [
    options.start + 1,
    options.start + maybeChild.nodeSize - 1,
  ];
  let transform: Dynamic = new (Transform as Dynamic)(
    collectEditorExtensionsList2,
  );
  try {
    transform.lift(
      new (NodeRange as Dynamic)(
        collectEditorExtensionsList2.resolve(items),
        collectEditorExtensionsList2.resolve(setItems),
        depth + 1,
      ),
      depth - 1,
    );
    resolveEditorExtensionsFrom3(
      transform,
      new (NodeRange as Dynamic)(
        transform.doc.resolve(transform.mapping.map(items)),
        transform.doc.resolve(transform.mapping.map(setItems)),
        depth - 1,
      ),
      context,
      maybeChild.copy(),
    );
  } catch {
    return null;
  }
  return transform;
}

function resolveEditorExtensionsFrom4(
  editorExtensions?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  post?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let matchesFrom = post.from > options.start;
  let matchesTo = post.to > options.$from.end(options.depth);
  if (matchesFrom && !(matchesTo && post.open)) {
    let lift2: Dynamic = new (Transform as Dynamic)(editorExtensions.doc).lift(
      options,
      context,
    );
    if (!isEditorExtensionsSteps(lift2)) {
      let collectEditorExtensionsList2: Dynamic = collectEditorExtensionsList(
        editorExtensions.doc,
        options,
        context,
      );
      if (
        collectEditorExtensionsList2 &&
        collectEditorExtensionsList2.doc.eq(lift2.doc) &&
        isEditorExtensionsSteps(collectEditorExtensionsList2)
      )
        return void collectEditorExtensionsList2.steps.forEach(
          (step?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            editorExtensions.step(step),
        );
    }
  }
  editorExtensions.lift(options, context);
}

var EditorExtensionsGroup: Dynamic;

function clearEditorExtensionsFind(
  clearEditorExtensionsFind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (InputRule as Dynamic)({
    find: editorExtensionsPattern6,
    handler: (
      { state: state, range: range, match: match }: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let checked = (match[1] ?? ``).toLowerCase() === `x`;
      let nodeItem: Dynamic = state.schema.nodes[EditorExtensionsListItem];
      let result: Dynamic = state.tr.delete(range.from, range.to);
      let resolve: Dynamic = result.doc.resolve(range.from);
      if (
        resolve.depth >= 2 &&
        resolve.node(-1).type === nodeItem &&
        resolve.index(-1) === 0 &&
        resolve.node(-2).type === clearEditorExtensionsFind2
      ) {
        let editorExtensionsList: Dynamic = resolveEditorExtensionsList(
          resolve.node(-2),
        );
        if (
          editorExtensionsList === `ordered` ||
          (editorExtensionsList === `check` &&
            resolve.node(-1).attrs.checked === checked)
        )
          return null;
        result.setNodeMarkup(
          resolve.before(-2),
          undefined,
          resolveEditorExtensionsKind(`check`, resolve.node(-2).attrs),
        );
        result.setNodeMarkup(resolve.before(-1), undefined, {
          ...resolve.node(-1).attrs,
          checked: checked,
        });
        return;
      }
      let blockRange: Dynamic = resolve.blockRange();
      let blockRange2: Dynamic =
        blockRange &&
        findWrapping(
          blockRange,
          clearEditorExtensionsFind2,
          resolveEditorExtensionsKind(`check`),
        );
      if (!blockRange2) return null;
      result.wrap(blockRange, blockRange2);
      if (!checked) return;
      let resolve2: Dynamic = result.doc.resolve(
        result.mapping.map(range.from),
      );
      for (let depth: Dynamic = resolve2.depth; depth > 0; --depth)
        if (resolve2.node(depth).type === nodeItem) {
          result.setNodeMarkup(resolve2.before(depth), undefined, {
            ...resolve2.node(depth).attrs,
            checked: checked,
          });
          break;
        }
    },
  });
}

var ProseListItemViewsPluginKey: Dynamic;

var EditorExtensionsChecklistItem: string;

var editorExtensionsValue200: number;

var resolveEditorExtensionsNode: Dynamic;

function resolveEditorExtensionsFirstChild2(
  editorExtensionsFirstChild2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic = editorExtensionsFirstChild2.firstChild;
  let trimmedReplace: Dynamic = (
    firstChild
      ? firstChild.textBetween(
          0,
          firstChild.content.size,
          ` `,
          resolveEditorExtensionsNode,
        )
      : ``
  )
    .replace(/[\u200B\u2060\uFEFF]/g, ``)
    .replace(/\s+/g, ` `)
    .trim();
  if (!trimmedReplace) return EditorExtensionsChecklistItem;
  let trimmedReplace2: Dynamic = Array.from<Dynamic>(trimmedReplace);
  return trimmedReplace2.length > editorExtensionsValue200
    ? trimmedReplace2.slice(0, editorExtensionsValue200 - 1).join(``) + `…`
    : trimmedReplace;
}

var EditorExtensionsDefining: Dynamic;

var resolveEditorExtensionsOpRemote: Dynamic;

var resolveEditorExtensionsStart: Dynamic;

function isEditorExtensionsOrdered(
  editorExtensionsOrdered?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let invert: Dynamic = editorExtensionsOrdered.mapping.invert();
  editorExtensionsOrdered.doc.descendants(
    (
      editorExtensionsOrdered2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (editorExtensionsOrdered2.isTextblock) return false;
      if (resolveEditorExtensionsList(editorExtensionsOrdered2) !== `ordered`)
        return true;
      let mappedInvert: Dynamic = invert.map(options, 1);
      if (
        mappedInvert <= 0 ||
        mappedInvert >= editorExtensionsOrdered.before.content.size ||
        editorExtensionsOrdered.before.nodeAt(mappedInvert)?.type ===
          editorExtensionsOrdered2.type
      )
        return true;
      let resolve: Dynamic =
        editorExtensionsOrdered.before.resolve(mappedInvert);
      for (let depth: Dynamic = resolve.depth; depth > 0; --depth) {
        let node: Dynamic = resolve.node(depth);
        if (node.type.name !== `list`) continue;
        let before: Dynamic = resolve.before(depth);
        if (
          resolveEditorExtensionsList(node) !== `ordered` ||
          mappedInvert <= before + 1
        )
          break;
        let mappedMapping: Dynamic = editorExtensionsOrdered.mapping.map(
          before,
          -1,
        );
        let nodeAt: Dynamic =
          mappedMapping < options
            ? editorExtensionsOrdered.doc.nodeAt(mappedMapping)
            : null;
        if (
          !nodeAt ||
          resolveEditorExtensionsList(nodeAt) !== `ordered` ||
          mappedMapping + nodeAt.nodeSize > options
        )
          break;
        let total: Dynamic = editorExtensionsOrdered.doc
          .resolve(mappedMapping)
          .sameParent(editorExtensionsOrdered.doc.resolve(options))
          ? resolveEditorExtensionsStart(nodeAt) + nodeAt.childCount
          : 1;
        if (resolveEditorExtensionsStart(editorExtensionsOrdered2) !== total) {
          items.push([options, total]);
        }
        break;
      }
      return true;
    },
  );
  return items;
}

function resolveEditorExtensionsFrom5(
  editorExtensions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { $from: selection, empty: selection2 }: Dynamic =
    editorExtensions.selection;
  if (
    !selection2 ||
    selection.depth < 1 ||
    selection.parent.type.name !== `paragraph` ||
    selection.parent.content.size > 0
  )
    return null;
  let node: Dynamic = selection.node(-1);
  let index: Dynamic = selection.index(-1);
  if (index < 1 || index + 1 >= node.childCount) return null;
  let [items, setItems]: Dynamic = [
    node.child(index - 1),
    node.child(index + 1),
  ];
  let editorExtensionsList: Dynamic = resolveEditorExtensionsList(items);
  return editorExtensionsList === null ||
    resolveEditorExtensionsList(setItems) !== editorExtensionsList
    ? null
    : {
        from: selection.before(),
        to: selection.after(),
      };
}

function isEditorExtensionsEvery(
  editorExtensionsEvery?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsEvery.steps.every(
    (
      post?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        post instanceof (AddMarkStep as Dynamic) ||
        post instanceof (RemoveMarkStep as Dynamic)
      )
        return true;
      if (
        !(post instanceof (ReplaceStep as Dynamic)) ||
        post.slice.openStart !== 0 ||
        post.slice.openEnd !== 0
      )
        return false;
      let docItem: Dynamic = editorExtensionsEvery.docs[index];
      let resolve: Dynamic = docItem.resolve(post.from);
      if (
        !resolve.parent.isTextblock ||
        !resolve.sameParent(docItem.resolve(post.to))
      )
        return false;
      let enabled: Dynamic = true;
      post.slice.content.forEach(
        (content?: Dynamic, ..._extraArguments: unknown[]): undefined =>
          void (enabled &&= content.isInline),
      );
      return enabled;
    },
  );
}

var resolveEditorExtensionsSome: Dynamic;

function resolveEditorExtensionsForEach(
  editorExtensions?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let resolveEditorExtensionsForEachHandler = (
    editorExtensions2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let resolveEditorExtensionsForEachResult: Dynamic = null;
    editorExtensions2.forEach(
      (
        editorExtension?: Dynamic,
        index?: Dynamic,
        editorExtension2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveEditorExtensionsForEachResult) {
          options(
            resolveEditorExtensionsForEachResult,
            editorExtension,
            options2 + index,
            editorExtensions2,
            editorExtension2,
          );
        }
        if (!editorExtension.isTextblock && !editorExtension.isLeaf) {
          resolveEditorExtensionsForEachHandler(
            editorExtension,
            options2 + index + 1,
          );
        }
        resolveEditorExtensionsForEachResult = editorExtension;
      },
    );
  };
  resolveEditorExtensionsForEachHandler(editorExtensions, 0);
}

function resolveEditorExtensionsOrdered(
  editorExtensionsOrdered?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  resolveEditorExtensionsForEach(
    editorExtensionsOrdered,
    (
      editorExtensionsOrdered2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (
        resolveEditorExtensionsList(editorExtensionsOrdered2) === `ordered` &&
        resolveEditorExtensionsList(options) === `ordered` &&
        items.push(context)
      ),
  );
  return items;
}

function resolveEditorExtensionsOrdered2(
  editorExtensionsOrdered2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let difference = options - 1; difference >= 0; --difference)
    if (
      resolveEditorExtensionsList(
        editorExtensionsOrdered2.child(difference),
      ) === `ordered`
    )
      return editorExtensionsOrdered2.child(difference);
  return null;
}

function resolveEditorExtensionsPos2(
  editorExtensionsPos2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  resolveEditorExtensionsForEach(
    editorExtensionsPos2,
    (
      editorExtensionsPos22?: unknown,
      options?: Dynamic,
      pos?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        resolveEditorExtensionsList(options) !== `ordered` ||
        typeof options.attrs.start != `number`
      )
        return;
      let editorExtensionsOrdered2: Dynamic = resolveEditorExtensionsOrdered2(
        dependencies,
        argument,
      );
      if (
        editorExtensionsOrdered2 &&
        options.attrs.start ===
          resolveEditorExtensionsStart(editorExtensionsOrdered2) +
            editorExtensionsOrdered2.childCount
      ) {
        items.push({
          pos: pos,
          bid: options.attrs.bid ?? null,
        });
      }
    },
  );
  return items;
}

var ProseListNumberingExtension: Dynamic;

var editorExtensionsYellowGreenBluePinkValues: string[];

var EditorExtensionsYellow: string;

var editorExtensionsSet3: Dynamic;

var resolveEditorExtensionsValue3: Dynamic;

var EditorExtensionsYellow2: Dynamic;

var resolveEditorExtensionsToken: (editorExtensions?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveEditorExtensionsYellow(
  editorExtensionsYellow?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label: Dynamic = ``;
  for (let resolveEditorExtensionsYellowResult of editorExtensionsYellowGreenBluePinkValues as Dynamic)
    if (resolveEditorExtensionsYellowResult !== `yellow`) {
      label += `${editorExtensionsYellow} mark[data-color=${resolveEditorExtensionsYellowResult}]{background:${resolveEditorExtensionsToken(resolveEditorExtensionsYellowResult)}}`;
    }
  return label;
}

var resolveEditorExtensionsYellow2: Dynamic;

var resolveEditorExtensionsYellow3: Dynamic;

var editorExtensionsValue_12: boolean;

var resolveEditorExtensionsValue4: Dynamic;

var EditorExtensionsAttr: string;

function resolveEditorExtensionsColor(
  editorExtensionsColor?: Dynamic,
  options: Dynamic = EditorExtensionsAttr,
  ..._extraArguments: unknown[]
): Dynamic {
  let color: Dynamic = resolveEditorExtensionsYellow2(editorExtensionsColor);
  return color === null
    ? {
        type: `highlight`,
      }
    : options === `attr`
      ? {
          type: `highlight`,
          color: color,
        }
      : {
          type: `highlight-${color}`,
        };
}

function resolveEditorExtensionsColor2(
  editorExtensionsColor2?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof editorExtensionsColor2 != `string`) return null;
  if (editorExtensionsColor2 === `highlight`) {
    let color: Dynamic =
      options?.attrs && typeof options.attrs == `object`
        ? options.attrs.color
        : undefined;
    return {
      color: resolveEditorExtensionsYellow2(options?.color ?? color),
    };
  }
  return editorExtensionsColor2.startsWith(`highlight-`)
    ? {
        color: resolveEditorExtensionsYellow2(editorExtensionsColor2.slice(10)),
      }
    : null;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorExtensions1Step1(): void {
  (resolveEditorExtensionsLift = (
    editorExtensionsLift?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => void editorExtensionsLift.lift(options, context));
  (resolveEditorExtensionsStructure = (
    editorExtensionsStructure?: Dynamic,
    ..._extraArguments: unknown[]
  ) => editorExtensionsStructure.structure === true);
  (resolveEditorExtensionsFrom = (
    post?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    post.from,
    post.to,
    post.gapFrom,
    post.gapTo,
    post.slice,
    post.insert,
    resolveEditorExtensionsStructure(post),
  ]);
  (resolveEditorExtensionsFromJSON = (
    editorExtensions?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsFrom(
      ReplaceAroundStep.fromJSON(editorExtensions, options),
    ));
  (EditorExtensionsStepType = class editorExtensionsStepTypeResult extends ReplaceAroundStep {
    [key: string]: Dynamic;
    apply(
      editorExtensionsStepType?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      try {
        if (
          resolveEditorExtensionsStructure(this) &&
          (isEditorExtensionsResolve(
            editorExtensionsStepType,
            this.from,
            this.gapFrom,
          ) ||
            isEditorExtensionsResolve(
              editorExtensionsStepType,
              this.gapTo,
              this.to,
            ))
        )
          return StepResult.fail(`Structure gap-replace would overwrite content`);
        let editorExtensionsStepTypeSlice: Dynamic =
          editorExtensionsStepType.slice(this.gapFrom, this.gapTo);
        if (
          editorExtensionsStepTypeSlice.openStart ||
          editorExtensionsStepTypeSlice.openEnd
        )
          return StepResult.fail(`Gap is not a flat range`);
        let slice: Dynamic = new (Slice as Dynamic)(
          resolveEditorExtensionsChildCount(
            this.slice.content,
            this.insert + this.slice.openStart,
            editorExtensionsStepTypeSlice.content,
          ),
          this.slice.openStart,
          this.slice.openEnd,
        );
        let fromReplace: Dynamic = StepResult.fromReplace(
          editorExtensionsStepType,
          this.from,
          this.to,
          slice,
        );
        if (fromReplace.doc) {
          fromReplace.doc.check();
        }
        return fromReplace;
      } catch (error: Dynamic) {
        return StepResult.fail(
          `the block does not fit back: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
    invert(
      editorExtensionsStepType?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (EditorExtensionsStepType2 as Dynamic)(
        ...resolveEditorExtensionsFrom(super.invert(editorExtensionsStepType)),
      );
    }
    map(
      editorExtensionsStepType?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let mappedItems: Dynamic = super.map(editorExtensionsStepType);
      return (
        mappedItems &&
        new (editorExtensionsStepTypeResult as Dynamic)(
          ...resolveEditorExtensionsFrom(mappedItems),
        )
      );
    }
    toJSON(..._extraArguments: unknown[]): Dynamic {
      return {
        ...super.toJSON(),
        stepType: `putBack`,
      };
    }
    static fromJSON(
      editorExtensionsStepType?: Dynamic,
      mappedItems?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (editorExtensionsStepTypeResult as Dynamic)(
        ...resolveEditorExtensionsFromJSON(editorExtensionsStepType, mappedItems),
      );
    }
  });
  (EditorExtensionsStepType2 = class editorExtensionsStepType2Result extends ReplaceAroundStep {
    [key: string]: Dynamic;
    invert(
      editorExtensionsStepType2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (EditorExtensionsStepType as Dynamic)(
        ...resolveEditorExtensionsFrom(super.invert(editorExtensionsStepType2)),
      );
    }
    map(
      editorExtensionsStepType2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let mappedItems: Dynamic = super.map(editorExtensionsStepType2);
      return (
        mappedItems &&
        new (editorExtensionsStepType2Result as Dynamic)(
          ...resolveEditorExtensionsFrom(mappedItems),
        )
      );
    }
    toJSON(..._extraArguments: unknown[]): Dynamic {
      return {
        ...super.toJSON(),
        stepType: `liftOut`,
      };
    }
    static fromJSON(
      editorExtensionsStepType2?: Dynamic,
      mappedItems?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return new (editorExtensionsStepType2Result as Dynamic)(
        ...resolveEditorExtensionsFromJSON(
          editorExtensionsStepType2,
          mappedItems,
        ),
      );
    }
  });
  for (let [localResult, localResult2] of [
    [`liftOut`, EditorExtensionsStepType2],
    [`putBack`, EditorExtensionsStepType],
  ] as Dynamic)
    try {
      Step.jsonID(localResult, localResult2);
    } catch {}
  (EditorExtensionsLdocTickedNow = `ldoc-ticked-now`);
  (EditorExtensionsLdocStrikeDrawing = `ldoc-strike-drawing`);
  (EditorExtensionsLdocStrike = `ldoc-strike`);
  (editorExtensionsWeakMap = new (WeakMap as Dynamic)());
  (clearEditorExtensionsDelete = (
    clearEditorExtensionsDelete2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let matchesOptions =
      options !== undefined &&
      editorExtensionsWeakMap.get(clearEditorExtensionsDelete2) === options;
    if (matchesOptions) {
      editorExtensionsWeakMap.delete(clearEditorExtensionsDelete2);
    }
    return matchesOptions;
  });
  (isEditorExtensionsMatchMedia = (
    editorExtensionsMatchMedia?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let defaultView: Dynamic = editorExtensionsMatchMedia.defaultView;
    return !(
      defaultView &&
      typeof defaultView.matchMedia == `function` &&
      defaultView.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    );
  });
  (resolveEditorExtensionsExec = (
    editorExtensionsExec?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = /^([\d.]+)(ms|s)$/.exec(
      getComputedStyle(editorExtensionsExec).getPropertyValue(options).trim(),
    );
    return match ? Number(match[1]) * (match[2] === `s` ? 1e3 : 1) : context;
  });
  (collectEditorExtensionsExec = (
    collectEditorExtensionsExec2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = /cubic-bezier\(([^)]+)\)/.exec(
      getComputedStyle(collectEditorExtensionsExec2).getPropertyValue(options),
    );
    let mappedMatchItemParts = match ? match[1].split(`,`).map(Number) : [];
    return mappedMatchItemParts.length === 4 &&
      mappedMatchItemParts.every(Number.isFinite)
      ? mappedMatchItemParts
      : context;
  });
  (resolveEditorExtensionsValue = (
    [
      editorExtensionsValue,
      editorExtensionsValue2,
      editorExtensionsValue3,
      editorExtensionsValue4,
    ]: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let resolveEditorExtensionsValueHandler: Dynamic = (
      editorExtensionsValue5?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      3 * (1 - context) * (1 - context) * context * editorExtensionsValue5 +
      3 * (1 - context) * context * context * options2 +
      context * context * context;
    if (options <= 0) return 0;
    if (options >= 1) return 1;
    let count = 0;
    let count2 = 1;
    for (let index = 0; index < 20; index++) {
      let amount = (count + count2) / 2;
      if (
        resolveEditorExtensionsValueHandler(
          editorExtensionsValue,
          editorExtensionsValue3,
          amount,
        ) < options
      ) {
        count = amount;
      } else {
        count2 = amount;
      }
    }
    return resolveEditorExtensionsValueHandler(
      editorExtensionsValue2,
      editorExtensionsValue4,
      (count + count2) / 2,
    );
  });
  (EditorExtensionsList = `list`);
  (EditorExtensionsListItem = `listItem`);
  (editorExtensionsBulletOrderedCheckValues = [`bullet`, `ordered`, `check`]);
  (editorExtensionsAAIIValues = [`a`, `A`, `i`, `I`]);
  (resolveEditorExtensionsIncludes = (
    editorExtensionsIncludes?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsIncludes == `string` &&
    editorExtensionsAAIIValues.includes(editorExtensionsIncludes)
      ? editorExtensionsIncludes
      : null);
  (EditorExtensionsLowerAlpha = {
    a: `lower-alpha`,
    A: `upper-alpha`,
    i: `lower-roman`,
    I: `upper-roman`,
  });
  (resolveEditorExtensionsIncludes2 = (
    editorExtensionsIncludes2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsIncludes2 == `string` &&
    editorExtensionsBulletOrderedCheckValues.includes(editorExtensionsIncludes2));
  (editorExtensionsSet = new (Set as Dynamic)([
    `P`,
    `DIV`,
    `SPAN`,
    `LABEL`,
  ]));
  (editorExtensionsPattern = /^\s*\[([ xX]?)\]\s+/);
  (editorExtensionsPattern2 = /\[[ xX]?\]\s/);
  (editorExtensionsPattern3 = /^(?:\s*<meta\s[^>]*>)*\s*<(?:thead|tbody|tfoot|caption|colgroup|col|tr|td|th)[\s/>]/i);
  (editorExtensionsSet2 = new (Set as Dynamic)());
  (ProseListPasteMarkersPluginKey = new (PluginKey as Dynamic)(
    `proseListPasteMarkers`,
  ));
  (editorExtensionsPattern4 = /^\s*([-+*])\s$/);
  (editorExtensionsPattern5 = /^(\d+)\.\s$/);
  (editorExtensionsPattern6 = /^\s*\[([ xX]?)\]\s$/);
  (editorExtensionsValue_1 = false);
  (resolveEditorExtensionsValue2 = (
    editorExtensionsValue2?: unknown,
    ..._extraArguments: unknown[]
  ) => editorExtensionsValue_1);
  (EditorExtensionsMessage = `listKindPick$`);
  (EditorExtensionsGroup = Node2.create({
    name: EditorExtensionsList,
    group: `block`,
    content: `${EditorExtensionsListItem}+`,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        kind: {
          default: `bullet`,
          parseHTML: (
            editorExtensionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ) => resolveEditorExtensionsDataKind(editorExtensionsGroup),
          renderHTML: (
            entry?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            entry.kind === `check`
              ? {
                  "data-kind": `check`,
                }
              : {},
        },
        start: {
          default: null,
          parseHTML: (element?: Dynamic, ..._extraArguments: unknown[]) => {
            let number2 =
              resolveEditorExtensionsDataKind(element) === `ordered`
                ? Number.parseInt(element.getAttribute(`start`) ?? `1`, 10)
                : 1;
            return Number.isFinite(number2) && number2 > 1 ? number2 : null;
          },
          renderHTML: (
            entry?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            entry.kind === `ordered` &&
            typeof entry.start == `number` &&
            entry.start > 1
              ? {
                  start: entry.start,
                }
              : {},
        },
        numbering: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorExtensionsDataKind(element) === `ordered`
              ? resolveEditorExtensionsIncludes(element.getAttribute(`type`))
              : null,
          renderHTML: (
            entry?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let type: Dynamic =
              entry.kind === `ordered`
                ? resolveEditorExtensionsIncludes(entry.numbering)
                : null;
            return type
              ? {
                  type: type,
                  style: `list-style-type:${EditorExtensionsLowerAlpha[type]}`,
                }
              : {};
          },
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `ul`,
        },
        {
          tag: `ol`,
        },
      ];
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        resolveEditorExtensionsList(node) === `ordered` ? `ol` : `ul`,
        mergeAttributes(HTMLAttributes),
        0,
      ];
    },
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: ProseListPasteMarkersPluginKey,
          props: {
            transformPastedHTML: resolveEditorExtensionsDataPmSlice,
          },
        }),
      ];
    },
    addCommands(..._extraArguments: unknown[]): Dynamic {
      let node: Dynamic = (
        editorExtensionsGroup?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        findParentNode(
          (editorExtensionsGroup2?: Dynamic, ..._extraArguments: unknown[]) =>
            editorExtensionsGroup2.type === this.type,
        )(editorExtensionsGroup.selection);
      let HTMLAttributes: Dynamic = (
        editorExtensionsGroup?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        for (let {
          pos: editorExtensionsGroupResult,
          node: editorExtensionsGroupResult2,
        } of context as Dynamic)
          editorExtensionsGroup.setNodeMarkup(
            editorExtensionsGroupResult,
            undefined,
            resolveEditorExtensionsKind(
              options,
              editorExtensionsGroupResult2.attrs,
            ),
          );
        return editorExtensionsGroup;
      };
      return {
        clearNodes:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { tr: tr2, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => (
            dispatch &&
              collectEditorExtensionsFrom(tr2, resolveEditorExtensionsFrom4),
            true
          ),
        setListKind:
          (
            editorExtensionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { tr: tr2, state: state, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let node2: Dynamic = resolveEditorExtensionsIncludes2(
              editorExtensionsGroup,
            )
              ? node(state)
              : undefined;
            return node2
              ? (dispatch &&
                  HTMLAttributes(
                    tr2.setMeta(EditorExtensionsMessage, true),
                    editorExtensionsGroup,
                    [node2],
                  ),
                true)
              : false;
          },
        toggleListKind:
          (
            editorExtensionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { state: state, tr: tr2, dispatch: dispatch, chain: chain }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (!resolveEditorExtensionsIncludes2(editorExtensionsGroup))
              return false;
            if (dispatch) {
              tr2
                .setMeta(EditorExtensionsMessage, true)
                .setMeta(`gesture$`, `list_tog`);
            }
            let selection: Dynamic = state.selection;
            let {
              $to: selection2,
              from: from,
              to: selection3,
            }: Dynamic = selection;
            let nodeItem: Dynamic = state.schema.nodes[EditorExtensionsListItem];
            let isEditorExtensionsFrom42: Dynamic =
              isEditorExtensionsFrom4(state);
            let filteredLists: Dynamic = isEditorExtensionsFrom42.lists.filter(
              (list?: Dynamic, ..._extraArguments: unknown[]) =>
                resolveEditorExtensionsList(list.node) !== editorExtensionsGroup,
            );
            if (
              isEditorExtensionsFrom42.loose.length === 0 &&
              isEditorExtensionsFrom42.lists.length > 0 &&
              filteredLists.length === 0
            ) {
              let filteredLists2: Dynamic = isEditorExtensionsFrom42.lists.filter(
                (list?: Dynamic, ..._extraArguments: unknown[]) =>
                  !isEditorExtensionsFrom42.lists.some(
                    (list2?: Dynamic, ..._extraArguments: unknown[]) =>
                      list2 !== list &&
                      list2.pos < list.pos &&
                      list.pos + list.node.nodeSize <=
                        list2.pos + list2.node.nodeSize,
                  ),
              );
              let to: Dynamic =
                from < selection3 && selection2.parentOffset === 0
                  ? (Selection.findFrom(
                      state.doc.resolve(selection2.before()),
                      -1,
                      true,
                    )?.to ?? selection3)
                  : selection3;
              let chain2: Dynamic = chain();
              for (let editorExtensionsGroupResult of filteredLists2.toReversed() as Dynamic) {
                let difference =
                  editorExtensionsGroupResult.pos +
                  editorExtensionsGroupResult.node.nodeSize -
                  1;
                let findFrom2: Dynamic =
                  from > editorExtensionsGroupResult.pos
                    ? null
                    : Selection.findFrom(
                        state.doc.resolve(editorExtensionsGroupResult.pos),
                        1,
                        true,
                      );
                let findFrom3: Dynamic =
                  to > difference
                    ? Selection.findFrom(state.doc.resolve(difference), -1, true)
                    : null;
                let from2: Dynamic = findFrom2?.from ?? from;
                let max = Math.max(from2, findFrom3?.to ?? to);
                chain2 = chain2
                  .command(
                    ({ tr: tr3 }: Dynamic, ..._extraArguments: unknown[]) => (
                      tr3.setSelection(TextSelection.create(tr3.doc, from2, max)),
                      true
                    ),
                  )
                  .liftListItem(nodeItem);
              }
              return chain2.run();
            }
            if (
              isEditorExtensionsFrom42.lists.length > 0 ||
              isEditorExtensionsFrom42.loose.length > 0
            ) {
              if (!dispatch) return true;
              HTMLAttributes(tr2, editorExtensionsGroup, filteredLists);
              let editorExtensionsKind: Dynamic = resolveEditorExtensionsKind(
                editorExtensionsGroup,
              );
              let count: Dynamic = 0;
              for (let post of isEditorExtensionsFrom42.loose.toReversed() as Dynamic) {
                let blockRange: Dynamic = tr2.doc
                  .resolve(post.from + 1)
                  .blockRange(tr2.doc.resolve(post.to - 1));
                if (
                  blockRange &&
                  wrapRangeInList(
                    tr2,
                    blockRange,
                    this.type,
                    editorExtensionsKind,
                  )
                ) {
                  count += 1;
                }
              }
              if (count === 0 && filteredLists.length === 0) return false;
              let mappedMapping: Dynamic = tr2.mapping.map(
                (Math.min as Dynamic)(
                  ...isEditorExtensionsFrom42.lists.map(
                    (list?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      list.pos,
                  ),
                  ...isEditorExtensionsFrom42.loose.map(
                    (loose?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      loose.from,
                  ),
                ),
                -1,
              );
              let mappedMapping2: Dynamic = tr2.mapping.map(
                (Math.max as Dynamic)(
                  ...isEditorExtensionsFrom42.lists.map(
                    (list?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      list.pos + list.node.nodeSize,
                  ),
                  ...isEditorExtensionsFrom42.loose.map(
                    (post?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      post.to,
                  ),
                ),
                1,
              );
              let resolve: Dynamic = tr2.doc.resolve(
                isEditorExtensionsFrom42.flow.depth === 0
                  ? 0
                  : tr2.mapping.map(isEditorExtensionsFrom42.flow.start, -1),
              );
              let doc: Dynamic =
                isEditorExtensionsFrom42.flow.depth === 0
                  ? tr2.doc
                  : resolve.node(isEditorExtensionsFrom42.flow.depth);
              let items: Dynamic = [];
              let count2: Dynamic =
                isEditorExtensionsFrom42.flow.depth === 0
                  ? 0
                  : resolve.start(isEditorExtensionsFrom42.flow.depth);
              for (let index = 0; index < doc.childCount; index++) {
                let child: Dynamic = doc.child(index);
                let child2: Dynamic =
                  index + 1 < doc.childCount ? doc.child(index + 1) : null;
                let total: Dynamic = count2 + child.nodeSize;
                if (
                  child2 &&
                  count2 >= mappedMapping &&
                  total + child2.nodeSize <= mappedMapping2 &&
                  resolveEditorExtensionsList(child) === editorExtensionsGroup &&
                  resolveEditorExtensionsList(child2) === editorExtensionsGroup
                ) {
                  items.push(total);
                }
                count2 = total;
              }
              for (let editorExtensionsGroupResult of items.toReversed() as Dynamic)
                if (canJoin(tr2.doc, editorExtensionsGroupResult)) {
                  tr2.join(editorExtensionsGroupResult);
                }
              if (
                selection instanceof (NodeSelection as Dynamic) &&
                filteredLists.some(
                  (filteredList?: Dynamic, ..._extraArguments: unknown[]) =>
                    filteredList.pos === from,
                ) &&
                items.length === 0
              ) {
                tr2.setSelection(NodeSelection.create(tr2.doc, from));
              }
              tr2.scrollIntoView();
              return true;
            }
            let findFrom: Dynamic =
              from < selection3 && selection2.parentOffset === 0
                ? Selection.findFrom(
                    state.doc.resolve(selection2.before()),
                    -1,
                    true,
                  )
                : null;
            let wrapInList2: Dynamic = wrapInList(
              this.type,
              resolveEditorExtensionsKind(editorExtensionsGroup),
            );
            return (
              findFrom && findFrom.from > from
                ? chain().setTextSelection({
                    from: from,
                    to: findFrom.from,
                  })
                : chain()
            )
              .command(
                (
                  { state: state2, tr: tr3, dispatch: dispatch2 }: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  if (wrapInList2(state2)) return wrapInList2(state2, dispatch2);
                  let editorExtensionsDoc: Dynamic = resolveEditorExtensionsDoc(
                    tr3.doc,
                    tr3.selection,
                    wrapInList2,
                    resolveEditorExtensionsFrom4,
                  );
                  return editorExtensionsDoc
                    ? (dispatch2 &&
                        resolveEditorExtensionsSteps(tr3, editorExtensionsDoc),
                      true)
                    : false;
                },
              )
              .run();
          },
      };
    },
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        "Mod-Shift-7": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.toggleListKind(`ordered`),
        "Mod-Shift-8": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.toggleListKind(`bullet`),
        "Mod-Shift-9": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.toggleListKind(`check`),
      };
    },
    addInputRules(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let node: Dynamic = this.type;
      return [
        wrappingInputRule({
          find: editorExtensionsPattern4,
          type: node,
          getAttributes: (..._extraArguments: unknown[]): Dynamic =>
            resolveEditorExtensionsKind(`bullet`),
          joinPredicate: (
            editorExtensionsGroup?: unknown,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ) => resolveEditorExtensionsList(options) === `bullet`,
        }),
        wrappingInputRule({
          find: editorExtensionsPattern5,
          type: node,
          getAttributes: (
            editorExtensionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveEditorExtensionsKind(`ordered`, {}, +editorExtensionsGroup[1]),
          joinPredicate: (
            editorExtensionsGroup?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            resolveEditorExtensionsList(options) === `ordered` &&
            options.childCount +
              (typeof options.attrs.start == `number`
                ? options.attrs.start
                : 1) ===
              +editorExtensionsGroup[1],
        }),
        clearEditorExtensionsFind(node),
      ];
    },
  }));
  (ProseListItemViewsPluginKey = new (PluginKey as Dynamic)(
    `proseListItemViews`,
  ));
  (EditorExtensionsChecklistItem = `Checklist item`);
  (editorExtensionsValue200 = 200);
  (resolveEditorExtensionsNode = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let spec: Dynamic = node.type.spec;
    return (
      spec.leafText?.(node) ??
      (spec.toText?.({
        node: node,
      }) ||
        ` `)
    );
  });
  (EditorExtensionsDefining = Node2.create({
    name: EditorExtensionsListItem,
    content: `paragraph block*`,
    defining: true,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        checked: {
          default: null,
          keepOnSplit: false,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let attribute: Dynamic = element.getAttribute(`data-checked`);
            return attribute === `true`
              ? true
              : attribute === `false`
                ? false
                : (isEditorExtensionsChecked(element) ?? null);
          },
          renderHTML: (
            editorExtensionsDefining?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            typeof editorExtensionsDefining.checked == `boolean`
              ? {
                  "data-checked": editorExtensionsDefining.checked
                    ? `true`
                    : `false`,
                }
              : {},
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `li`,
        },
      ];
    },
    renderHTML(
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [`li`, mergeAttributes(HTMLAttributes), 0];
    },
    addNodeView(..._extraArguments: unknown[]): Dynamic {
      return (
        { node: node, getPos: getPos, editor: editor }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let dom = document.createElement(`li`);
        let contentDOM = document.createElement(`div`);
        dom.append(contentDOM);
        let element: Dynamic = null;
        let element2: Dynamic = null;
        let matchesChecked = node.attrs.checked === true;
        let node2: Dynamic = node;
        let getPos2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
          try {
            return typeof getPos == `function` ? getPos() : undefined;
          } catch {
            return;
          }
        };
        let append: Dynamic = (..._extraArguments: unknown[]) => {
          let element3 = document.createElement(`label`);
          element3.className = `ldoc-check`;
          element3.setAttribute(`contenteditable`, `false`);
          element3.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (editor.isEditable) {
                event.preventDefault();
              }
            },
          );
          element3.addEventListener(
            `click`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!(event.target === element2 || element2?.disabled)) {
                event.preventDefault();
                element2?.click();
              }
            },
          );
          element2 = document.createElement(`input`);
          element2.type = `checkbox`;
          element2.dataset.testid = `ldoc-check`;
          element2.tabIndex = -1;
          element2.checked = matchesChecked;
          element2.setAttribute(
            `aria-label`,
            resolveEditorExtensionsFirstChild2(node2),
          );
          element2.setAttribute(
            `aria-keyshortcuts`,
            isMacOS() || isiOS() ? `Meta+Enter` : `Control+Enter`,
          );
          element2.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              event.preventDefault(),
          );
          element3.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (element2?.disabled) {
                event.preventDefault();
              }
            },
          );
          element2.addEventListener(
            `change`,
            (..._extraArguments: unknown[]): undefined => {
              let pos: Dynamic = getPos2();
              let nodeAt: Dynamic =
                pos === undefined ? null : editor.state.doc.nodeAt(pos);
              if (
                !editor.isEditable ||
                !nodeAt ||
                nodeAt.type.name !== `listItem` ||
                !element2
              ) {
                if (element2) {
                  element2.checked = matchesChecked;
                }
                return;
              }
              let checked: Dynamic = element2.checked;
              updateEditorExtensionsDelete(
                editor,
                pos,
                (..._extraArguments: unknown[]): Dynamic =>
                  editor.view.dispatch(
                    editor.state.tr
                      .setNodeAttribute(pos, `checked`, checked)
                      .setMeta(`gesture$`, `tick`),
                  ),
              );
            },
          );
          let remove3 = (
            editorExtensionsDefining?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (editorExtensionsDefining.animationName === `ldoc-check-ring`) {
              element3.classList.remove(EditorExtensionsLdocTickedNow);
            }
          };
          element3.addEventListener(`animationend`, remove3);
          element3.addEventListener(`animationcancel`, remove3);
          element3.append(element2);
          return element3;
        };
        let remove = (..._extraArguments: unknown[]): undefined => {
          let pos: Dynamic = getPos2();
          if (pos === undefined || pos < 0 || pos > editor.state.doc.content.size)
            return;
          let matchesEditorExtensionsList =
            resolveEditorExtensionsList(editor.state.doc.resolve(pos).parent) ===
            `check`;
          if (matchesEditorExtensionsList && !element) {
            element = append();
            dom.prepend(element);
          } else {
            if (!matchesEditorExtensionsList && element) {
              element.remove();
              element = element2 = null;
            }
          }
          if (element2) {
            element2.disabled = !editor.isEditable;
          }
        };
        let remove2 = (..._extraArguments: unknown[]): undefined => {
          element?.classList.remove(
            EditorExtensionsLdocTickedNow,
            EditorExtensionsLdocStrikeDrawing,
          );
          element
            ?.querySelector(`:scope>.${EditorExtensionsLdocStrike}`)
            ?.remove();
        };
        let querySelector = (
          editorExtensionsDefining?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let enabled =
            !editorExtensionsDefining &&
            !!element?.querySelector(`:scope>.ldoc-strike`);
          remove2();
          if (
            !(
              !element ||
              enabled ||
              !isEditorExtensionsMatchMedia(dom.ownerDocument)
            )
          )
            try {
              if (editorExtensionsDefining) {
                element.offsetWidth;
                element.classList.add(EditorExtensionsLdocTickedNow);
              }
              let matchedElement: Dynamic = contentDOM.querySelector(
                `:scope>p:first-child,:scope>.lfile-gap:first-child+p`,
              );
              if (matchedElement) {
                filterEditorExtensionsOffset(
                  element,
                  matchedElement,
                  editorExtensionsDefining,
                );
              }
            } catch {
              remove2();
            }
        };
        let setAttribute = (
          editorExtensionsDefining?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          node2 = editorExtensionsDefining;
          let matchesChecked2 = matchesChecked;
          matchesChecked = editorExtensionsDefining.attrs.checked === true;
          if (typeof editorExtensionsDefining.attrs.checked == `boolean`) {
            dom.dataset.checked = String(editorExtensionsDefining.attrs.checked);
          } else {
            delete dom.dataset.checked;
          }
          if (element2) {
            element2.checked = matchesChecked;
            let editorExtensionsFirstChild2: Dynamic =
              resolveEditorExtensionsFirstChild2(editorExtensionsDefining);
            if (
              element2.getAttribute(`aria-label`) !== editorExtensionsFirstChild2
            ) {
              element2.setAttribute(`aria-label`, editorExtensionsFirstChild2);
            }
          }
          if (matchesChecked2 !== matchesChecked) {
            if (clearEditorExtensionsDelete(editor, getPos2())) {
              querySelector(matchesChecked);
            } else {
              remove2();
            }
          }
        };
        setAttribute(node);
        remove();
        editorExtensionsSet2.add(remove);
        return {
          dom: dom,
          contentDOM: contentDOM,
          ignoreMutation: (event?: Dynamic, ..._extraArguments: unknown[]) => {
            if (element !== null && element.contains(event.target)) return true;
            if (event.type !== `childList` || event.target !== dom) return false;
            let contains2: Dynamic = (
              editorExtensionsDefining?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              editorExtensionsDefining === element ||
              (editorExtensionsDefining.nodeType === 1 &&
                editorExtensionsDefining.classList.contains(`ldoc-check`));
            return (
              Array.from<Dynamic>(event.addedNodes).every(contains2) &&
              Array.from<Dynamic>(event.removedNodes).every(contains2)
            );
          },
          update: (
            editorExtensionsDefining?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            editorExtensionsDefining.type.name === `listItem` &&
            (setAttribute(editorExtensionsDefining), remove(), true),
          destroy: (..._extraArguments: unknown[]): undefined =>
            void editorExtensionsSet2.delete(remove),
        };
      };
    },
    addCommands(..._extraArguments: unknown[]): Dynamic {
      let HTMLAttributes: Dynamic = (
        editorExtensionsDefining?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        findParentNode(
          (editorExtensionsDefining2?: Dynamic, ..._extraArguments: unknown[]) =>
            editorExtensionsDefining2.type === this.type,
        )(editorExtensionsDefining);
      return {
        toggleChecked:
          (
            editorExtensionsDefining?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            { state: state, tr: tr2, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let HTMLAttributes2: Dynamic = HTMLAttributes(state.selection);
            if (
              !HTMLAttributes2 ||
              resolveEditorExtensionsList(
                state.doc.resolve(HTMLAttributes2.pos).parent,
              ) !== `check`
            )
              return false;
            let checked: Dynamic =
              editorExtensionsDefining ??
              HTMLAttributes2.node.attrs.checked !== true;
            if (dispatch) {
              tr2
                .setNodeMarkup(HTMLAttributes2.pos, undefined, {
                  ...HTMLAttributes2.node.attrs,
                  checked: checked,
                })
                .setMeta(`gesture$`, `tick`);
            }
            return true;
          },
        sinkListItemSameKind:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { state: state, chain: chain }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let nodeItem: Dynamic = state.schema.nodes[EditorExtensionsList];
            let { $from: selection, $to: selection2 }: Dynamic = state.selection;
            let blockRange: Dynamic = selection.blockRange(
              selection2,
              (
                editorExtensionsDefining?: Dynamic,
                ..._extraArguments: unknown[]
              ) => editorExtensionsDefining.type === nodeItem,
            );
            let lastChild: Dynamic =
              blockRange && blockRange.startIndex > 0
                ? blockRange.parent.child(blockRange.startIndex - 1).lastChild
                : null;
            let editorExtensionsList: Dynamic =
              blockRange && lastChild?.type !== nodeItem
                ? resolveEditorExtensionsList(blockRange.parent)
                : null;
            return chain()
              .sinkListItem(this.type)
              .command(({ tr: tr2 }: Dynamic, ..._extraArguments: unknown[]) => {
                let HTMLAttributes2: Dynamic =
                  editorExtensionsList === null
                    ? undefined
                    : HTMLAttributes(tr2.selection);
                let resolve: Dynamic = HTMLAttributes2
                  ? tr2.doc.resolve(HTMLAttributes2.pos)
                  : null;
                if (
                  resolve &&
                  resolve.parent.type === nodeItem &&
                  resolveEditorExtensionsList(resolve.parent) !==
                    editorExtensionsList
                ) {
                  tr2.setNodeMarkup(
                    resolve.before(),
                    undefined,
                    resolveEditorExtensionsKind(
                      editorExtensionsList,
                      resolve.parent.attrs,
                    ),
                  );
                }
                return true;
              })
              .run();
          },
      };
    },
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      let HTMLAttributes: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        this.editor.commands.command(
          (
            { state: state, tr: tr2, dispatch: dispatch }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let { $from: selection }: Dynamic = state.selection;
            let node: Dynamic = selection.node(-1);
            let items: Dynamic = [
              {
                type: node.type,
                attrs: getSplittedAttributes(
                  this.editor.extensionManager.attributes,
                  node.type.name,
                  node.attrs,
                ),
              },
            ];
            return canSplit(state.doc, selection.before(), 1, items)
              ? (dispatch &&
                  tr2.split(selection.before(), 1, items).scrollIntoView(),
                true)
              : false;
          },
        );
      return {
        Enter: (..._extraArguments: unknown[]): Dynamic =>
          isEditorExtensionsFrom2(this.editor.state, this.name)
            ? this.editor.commands.splitListItem(this.name)
            : isEditorExtensionsFrom3(this.editor.state, this.name) &&
              HTMLAttributes(),
        "Mod-Enter": (..._extraArguments: unknown[]): Dynamic => {
          if (
            !resolveEditorExtensionsCheck(
              this.editor.state.selection.$from,
              this.name,
            ) ||
            !this.editor.isEditable
          )
            return false;
          let findParentNode2: Dynamic = findParentNode(
            (editorExtensionsDefining?: Dynamic, ..._extraArguments: unknown[]) =>
              editorExtensionsDefining.type === this.type,
          )(this.editor.state.selection);
          return (
            !!findParentNode2 &&
            updateEditorExtensionsDelete(
              this.editor,
              findParentNode2.pos,
              (..._extraArguments: unknown[]): Dynamic =>
                this.editor.commands.toggleChecked(),
            )
          );
        },
        Tab: (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.sinkListItemSameKind(),
        "Shift-Tab": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.liftListItem(this.name),
      };
    },
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: ProseListItemViewsPluginKey,
          view: (
            editorExtensionsDefining?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editable: Dynamic = editorExtensionsDefining.editable;
            return {
              update: (
                editorExtensionsDefining2?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  !(
                    editorExtensionsDefining2.state.doc === options.doc &&
                    editorExtensionsDefining2.editable === editable
                  )
                ) {
                  editable = editorExtensionsDefining2.editable;
                  for (let editorExtensionsDefiningResult of editorExtensionsSet2 as Dynamic)
                    editorExtensionsDefiningResult();
                }
              },
            };
          },
        }),
      ];
    },
  }));
  (resolveEditorExtensionsOpRemote = (
    editorExtensionsOpRemote?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsOpRemote.docChanged &&
    !editorExtensionsOpRemote.getMeta(`op-remote`) &&
    editorExtensionsOpRemote.getMeta(`addToHistory`) !== false &&
    editorExtensionsOpRemote.getMeta(`history$`) === undefined &&
    editorExtensionsOpRemote
      .getMeta(`appendedTransaction`)
      ?.getMeta(`history$`) === undefined);
  (resolveEditorExtensionsStart = (
    editorExtensionsStart?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof editorExtensionsStart.attrs.start == `number`
      ? editorExtensionsStart.attrs.start
      : 1);
  (resolveEditorExtensionsSome = (
    editorExtensionsSome?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsSome.steps.some(
      (post?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        post instanceof (ReplaceStep as Dynamic) &&
        post.from === 0 &&
        post.to === editorExtensionsSome.docs[index].content.size,
    ));
  (ProseListNumberingExtension = Extension.create({
    name: `proseListNumbering`,
    priority: 150,
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      let proseListNumberingExtensionHandler: Dynamic =
        (
          proseListNumberingExtension?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (..._extraArguments: unknown[]) => {
          let { state: editor, view: editor2 }: Dynamic = this.editor;
          let editorExtensionsFrom5: Dynamic =
            resolveEditorExtensionsFrom5(editor);
          if (!editorExtensionsFrom5 || !this.editor.isEditable) return false;
          let result: Dynamic = editor.tr.delete(
            editorExtensionsFrom5.from,
            editorExtensionsFrom5.to,
          );
          if (!canJoin(result.doc, editorExtensionsFrom5.from)) return false;
          let findFrom: Dynamic = Selection.findFrom(
            result.doc.resolve(editorExtensionsFrom5.from),
            proseListNumberingExtension,
            true,
          );
          result.join(editorExtensionsFrom5.from);
          if (findFrom) {
            result.setSelection(
              Selection.near(
                result.doc.resolve(
                  result.mapping
                    .slice(result.steps.length - 1)
                    .map(findFrom.from),
                ),
                proseListNumberingExtension,
              ),
            );
          }
          editor2.dispatch(result.scrollIntoView());
          return true;
        };
      return {
        Backspace: proseListNumberingExtensionHandler(-1),
        Delete: proseListNumberingExtensionHandler(1),
      };
    },
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`proseListNumbering`),
          appendTransaction: (
            proseListNumberingExtension?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let filteredProseListNumberingExtension: Dynamic =
              proseListNumberingExtension.filter(
                (
                  rolldownNImport2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => rolldownNImport2.docChanged,
              );
            let matchesFilteredProseListNumberingExtensionCount: Dynamic =
              filteredProseListNumberingExtension.length > 0 &&
              filteredProseListNumberingExtension.every(
                resolveEditorExtensionsOpRemote,
              ) &&
              !filteredProseListNumberingExtension.every(
                isEditorExtensionsEvery,
              ) &&
              !filteredProseListNumberingExtension.some(
                resolveEditorExtensionsSome,
              );
            let toReversed: Dynamic =
              matchesFilteredProseListNumberingExtensionCount
                ? proseListNumberingExtension
                    .map(
                      (
                        rolldownNImport2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => rolldownNImport2.mapping.invert(),
                    )
                    .toReversed()
                : [];
            let resolveEditorExtensionsList2: Dynamic = (
              proseListNumberingExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let [items2, setItems]: Dynamic = [
                proseListNumberingExtension2,
                proseListNumberingExtension2,
              ];
              for (let proseListNumberingExtensionResult of toReversed as Dynamic)
                [items2, setItems] = [
                  proseListNumberingExtensionResult.map(items2, -1),
                  proseListNumberingExtensionResult.map(setItems, 1),
                ];
              if (items2 !== setItems) return false;
              let resolve: Dynamic = options.doc.resolve(setItems);
              return (
                !!resolve.nodeBefore &&
                !!resolve.nodeAfter &&
                resolveEditorExtensionsList(resolve.nodeBefore) === `ordered` &&
                resolveEditorExtensionsList(resolve.nodeAfter) === `ordered`
              );
            };
            let getMeta: Dynamic = (
              proseListNumberingExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let meta: Dynamic =
                proseListNumberingExtension2.getMeta(`appendedTransaction`) ??
                proseListNumberingExtension2;
              return (
                meta.getMeta(`uiEvent`) === `paste` ||
                meta.getMeta(`uiEvent`) === `drop` ||
                meta.getMeta(`paste`) === true ||
                meta.getMeta(`listKindPick$`) === true
              );
            };
            let node: Dynamic = (
              proseListNumberingExtension2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let count: Dynamic = 0;
              for (
                let depth: Dynamic = proseListNumberingExtension2.depth;
                depth > 0;
                --depth
              )
                if (
                  proseListNumberingExtension2.node(depth).type.name ===
                  `listItem`
                ) {
                  count += 1;
                }
              return count;
            };
            let descendants: Dynamic = (..._extraArguments: unknown[]) => {
              let enabled = false;
              context.doc.descendants(
                (
                  proseListNumberingExtension2?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => {
                  if (enabled) return false;
                  if (!proseListNumberingExtension2.isTextblock) return true;
                  let total: Dynamic = options2 + 1;
                  for (let proseListNumberingExtensionResult of toReversed as Dynamic)
                    total = proseListNumberingExtensionResult.map(total, 1);
                  if (
                    total > 0 &&
                    total <= options.doc.content.size &&
                    node(options.doc.resolve(total)) >
                      node(context.doc.resolve(options2 + 1))
                  ) {
                    enabled = true;
                  }
                  return false;
                },
              );
              return enabled;
            };
            let filteredEditorExtensionsOrdered: Dynamic =
              matchesFilteredProseListNumberingExtensionCount &&
              !filteredProseListNumberingExtension.some(getMeta)
                ? resolveEditorExtensionsOrdered(context.doc).filter(
                    (
                      editorExtensionsOrdered?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => !resolveEditorExtensionsList2(editorExtensionsOrdered),
                  )
                : [];
            let filteredEditorExtensionsOrdered2: Dynamic =
              filteredEditorExtensionsOrdered.length > 0 && !descendants()
                ? filteredEditorExtensionsOrdered
                : [];
            let items: Dynamic = [];
            proseListNumberingExtension.forEach(
              (
                proseListNumberingExtension2?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (resolveEditorExtensionsOpRemote(proseListNumberingExtension2))
                  for (let [
                    proseListNumberingExtensionResult,
                    proseListNumberingExtensionResult2,
                  ] of isEditorExtensionsOrdered(
                    proseListNumberingExtension2,
                  ) as Dynamic) {
                    let proseListNumberingExtensionResult3: Dynamic =
                      proseListNumberingExtensionResult;
                    for (let proseListNumberingExtensionResult4 of proseListNumberingExtension.slice(
                      index + 1,
                    ) as Dynamic)
                      proseListNumberingExtensionResult3 =
                        proseListNumberingExtensionResult4.mapping.map(
                          proseListNumberingExtensionResult3,
                          1,
                        );
                    items.push([
                      proseListNumberingExtensionResult3,
                      proseListNumberingExtensionResult2,
                    ]);
                  }
              },
            );
            let tr2: Dynamic = context.tr;
            for (let [
              proseListNumberingExtensionResult,
              proseListNumberingExtensionResult2,
            ] of items as Dynamic) {
              if (
                filteredEditorExtensionsOrdered2.includes(
                  proseListNumberingExtensionResult,
                )
              )
                continue;
              let nodeAt: Dynamic = tr2.doc.nodeAt(
                proseListNumberingExtensionResult,
              );
              if (
                nodeAt &&
                resolveEditorExtensionsList(nodeAt) === `ordered` &&
                resolveEditorExtensionsStart(nodeAt) !==
                  proseListNumberingExtensionResult2
              ) {
                tr2.setNodeAttribute(
                  proseListNumberingExtensionResult,
                  `start`,
                  proseListNumberingExtensionResult2 > 1
                    ? proseListNumberingExtensionResult2
                    : null,
                );
              }
            }
            if (matchesFilteredProseListNumberingExtensionCount) {
              for (let proseListNumberingExtensionResult of filteredEditorExtensionsOrdered2.toReversed() as Dynamic)
                if (canJoin(tr2.doc, proseListNumberingExtensionResult)) {
                  tr2.join(proseListNumberingExtensionResult);
                }
              for (let ask of resolveEditorExtensionsPos2(
                options.doc,
              ) as Dynamic) {
                let pos: Dynamic = ask.pos;
                let enabled: Dynamic = false;
                for (let proseListNumberingExtensionResult of [
                  ...proseListNumberingExtension.map(
                    (
                      rolldownNImport2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => rolldownNImport2.mapping,
                  ),
                  tr2.mapping,
                ] as Dynamic) {
                  let mapResult: Dynamic =
                    proseListNumberingExtensionResult.mapResult(pos, 1);
                  enabled ||= mapResult.deletedAfter;
                  pos = mapResult.pos;
                }
                if (enabled) continue;
                let resolve: Dynamic = tr2.doc.resolve(pos);
                let nodeAfter: Dynamic = resolve.nodeAfter;
                if (
                  !nodeAfter ||
                  resolveEditorExtensionsList(nodeAfter) !== `ordered` ||
                  (ask.bid !== null && nodeAfter.attrs.bid !== ask.bid)
                )
                  continue;
                let editorExtensionsOrdered2: Dynamic =
                  resolveEditorExtensionsOrdered2(
                    resolve.parent,
                    resolve.index(),
                  );
                if (!editorExtensionsOrdered2) continue;
                let total: Dynamic =
                  resolveEditorExtensionsStart(editorExtensionsOrdered2) +
                  editorExtensionsOrdered2.childCount;
                if (resolveEditorExtensionsStart(nodeAfter) !== total) {
                  tr2.setNodeAttribute(pos, `start`, total > 1 ? total : null);
                }
              }
            }
            return tr2.docChanged ? tr2 : null;
          },
        }),
      ];
    },
  }));
  (editorExtensionsYellowGreenBluePinkValues = [
    `yellow`,
    `green`,
    `blue`,
    `pink`,
    `purple`,
    `grey`,
  ]);
  (EditorExtensionsYellow = `yellow`);
  (editorExtensionsSet3 = new (Set as Dynamic)(
    editorExtensionsYellowGreenBluePinkValues,
  ));
  (resolveEditorExtensionsValue3 = (
    editorExtensionsValue3?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof editorExtensionsValue3 == `string` &&
    editorExtensionsSet3.has(editorExtensionsValue3));
  (EditorExtensionsYellow2 = {
    yellow: {
      label: `Yellow`,
      token: `--cds-bg-editor-highlight-yellow`,
      base: `#fab219`,
    },
    green: {
      label: `Green`,
      token: `--cds-bg-editor-highlight-green`,
      base: `#55bf50`,
    },
    blue: {
      label: `Blue`,
      token: `--cds-bg-editor-highlight-blue`,
      base: `#6da7ec`,
    },
    pink: {
      label: `Pink`,
      token: `--cds-bg-editor-highlight-magenta`,
      base: `#e87ba4`,
    },
    purple: {
      label: `Purple`,
      token: `--cds-bg-editor-highlight-violet`,
      base: `#a096eb`,
    },
    grey: {
      label: `Grey`,
      token: `--cds-bg-editor-highlight-gray`,
      base: `#a5a49a`,
    },
  });
  (resolveEditorExtensionsToken = (
    editorExtensions?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let {
      token: EditorExtensionsYellow2Item,
      base: EditorExtensionsYellow2Item2,
    }: Dynamic = EditorExtensionsYellow2[editorExtensions];
    return `var(${EditorExtensionsYellow2Item},color-mix(in srgb,${EditorExtensionsYellow2Item2} 33%,transparent))`;
  });
  (resolveEditorExtensionsYellow2 = (
    editorExtensionsYellow2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsValue3(editorExtensionsYellow2) &&
    editorExtensionsYellow2 !== `yellow`
      ? editorExtensionsYellow2
      : null);
  (resolveEditorExtensionsYellow3 = (
    editorExtensionsYellow3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsYellow2(editorExtensionsYellow3) ?? `yellow`);
  (editorExtensionsValue_12 = false);
  (resolveEditorExtensionsValue4 = (..._extraArguments: unknown[]) =>
    editorExtensionsValue_12);
  (EditorExtensionsAttr = `attr`);
}

export {
  EditorExtensionsDefining,
  EditorExtensionsGroup,
  EditorExtensionsYellow,
  ProseListNumberingExtension,
  resolveEditorExtensionsCheck,
  resolveEditorExtensionsColor,
  resolveEditorExtensionsColor2,
  resolveEditorExtensionsDoc,
  resolveEditorExtensionsFrom4,
  resolveEditorExtensionsIncludes,
  resolveEditorExtensionsSteps,
  resolveEditorExtensionsToken,
  resolveEditorExtensionsValue3,
  resolveEditorExtensionsValue4,
  resolveEditorExtensionsYellow,
  resolveEditorExtensionsYellow2,
  resolveEditorExtensionsYellow3,
};

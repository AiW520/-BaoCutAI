/** BaoCut: editor chips and node views from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Extension,
  Node2,
  NodeSelection,
  Plugin,
  PluginKey,
  canJoin,
  liftTarget,
  mergeAttributes,
} from "./platform-core-dependencies";
import {
  collectEditorExtensionsAuto,
  editorExtensionsGraySkyMineralOliveValues,
  resolveEditorExtensionsFind,
  resolveEditorExtensionsJoin,
  resolveEditorExtensionsReplace,
  resolveEditorExtensionsToLowerCase,
  resolveEditorExtensionsValue12,
  resolveEditorExtensionsValue13,
  resolveEditorExtensionsValue14,
  resolveEditorExtensionsValue15,
} from "./platform-core-editor-extensions-2";
import {
  EditorAnchorsAndMentionsMaster16,
  editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsPlatform,
  resolveEditorAnchorsAndMentionsValue,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  DataModelSchemasMessage,
} from "./platform-core-data-model-schemas-4";
import {
  resolvePlatformAnnouncementsValue,
} from "./platform-core-platform-announcements";
import {
  resolveEditorHostMention,
} from "./platform-core-platform-runtime-and-chat-3";
import {
  resolveCommentsActionsAndSelectionNoun,
} from "./platform-core-comments-actions-and-selection";
import {
  EditorChipsAndNodeViewsDataLfileContainer,
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
} from "./platform-core-editor-selection-and-tables-3";
import {
  clearEditorChipsAndNodeViewsEscape,
  editorChipsAndNodeViewsWeakMap6,
  editorChipsAndNodeViewsWeakMap7,
  editorChipsAndNodeViewsWeakMap8,
} from "./platform-core-editor-chips-and-node-views-2";

function resolveEditorChipsAndNodeViewsFirstElementChild(
  editorChipsAndNodeViewsFirstElementChild?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options) {
    editorChipsAndNodeViewsFirstElementChild.firstElementChild?.setAttribute(
      EditorChipsAndNodeViewsDataLfileContainer,
      options,
    );
  }
}

var EditorChipsAndNodeViewsDataLfileEnums: string;

var editorChipsAndNodeViewsValue80: number;

var editorChipsAndNodeViewsValue64: number;

var EditorChipsAndNodeViewsState: RegExp;

var editorChipsAndNodeViewsValue120: number;

var resolveEditorChipsAndNodeViewsIncludes: Dynamic;

var resolveEditorChipsAndNodeViewsDataEnum: Dynamic;

function resolveEditorChipsAndNodeViewsOrder(
  editorChipsAndNodeViewsOrder?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof editorChipsAndNodeViewsOrder != `object` ||
    !editorChipsAndNodeViewsOrder ||
    Array.isArray(editorChipsAndNodeViewsOrder)
  )
    return null;
  let editorChipsAndNodeViewsOrder2: Dynamic = editorChipsAndNodeViewsOrder;
  if (
    typeof editorChipsAndNodeViewsOrder2.name != `string` ||
    !Array.isArray(editorChipsAndNodeViewsOrder2.options)
  )
    return null;
  let name: Dynamic = editorChipsAndNodeViewsOrder2.name.trim();
  if (!resolveEditorChipsAndNodeViewsIncludes(name)) return null;
  let options: Dynamic = [];
  for (let resolveEditorChipsAndNodeViewsOrderResult of editorChipsAndNodeViewsOrder2.options as Dynamic) {
    if (
      typeof resolveEditorChipsAndNodeViewsOrderResult != `object` ||
      !resolveEditorChipsAndNodeViewsOrderResult
    )
      return null;
    let resolveEditorChipsAndNodeViewsOrderResult2: Dynamic =
      resolveEditorChipsAndNodeViewsOrderResult;
    if (
      typeof resolveEditorChipsAndNodeViewsOrderResult2.name != `string` ||
      typeof resolveEditorChipsAndNodeViewsOrderResult2.order != `number` ||
      !Number.isFinite(resolveEditorChipsAndNodeViewsOrderResult2.order)
    )
      return null;
    let name2: Dynamic = resolveEditorChipsAndNodeViewsOrderResult2.name.trim();
    if (!resolveEditorChipsAndNodeViewsIncludes(name2)) return null;
    let record2: Dynamic = {
      name: name2,
      order: resolveEditorChipsAndNodeViewsOrderResult2.order,
    };
    if (resolveEditorChipsAndNodeViewsOrderResult2.disabled === true) {
      record2.disabled = true;
    }
    let editorExtensionsToLowerCase: Dynamic =
      resolveEditorExtensionsToLowerCase(
        resolveEditorChipsAndNodeViewsOrderResult2.color,
      );
    if (editorExtensionsToLowerCase !== undefined) {
      record2.color = editorExtensionsToLowerCase;
    }
    options.push(record2);
  }
  return options.length === 0 || options.length > editorChipsAndNodeViewsValue64
    ? null
    : {
        name: name,
        options: options,
      };
}

function resolveEditorChipsAndNodeViewsFirstElementChild2(
  editorChipsAndNodeViewsFirstElementChild2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let firstElementChild: Dynamic =
    editorChipsAndNodeViewsFirstElementChild2.firstElementChild;
  if (!firstElementChild) return;
  let create2: Dynamic = Object.create(null);
  let enabled = false;
  for (let resolveEditorChipsAndNodeViewsFirstElementChild2Result of editorChipsAndNodeViewsFirstElementChild2.querySelectorAll(
    `span[data-chip="dropdown"]`,
  ) as Dynamic) {
    let editorChipsAndNodeViewsDataEnum: Dynamic =
      resolveEditorChipsAndNodeViewsDataEnum(
        resolveEditorChipsAndNodeViewsFirstElementChild2Result,
      );
    if (
      editorChipsAndNodeViewsDataEnum === null ||
      Object.hasOwn(create2, editorChipsAndNodeViewsDataEnum)
    )
      continue;
    let editorChipsAndNodeViewsOrder: Dynamic =
      resolveEditorChipsAndNodeViewsOrder(
        options(editorChipsAndNodeViewsDataEnum) ?? null,
      );
    if (editorChipsAndNodeViewsOrder !== null) {
      create2[editorChipsAndNodeViewsDataEnum] = editorChipsAndNodeViewsOrder;
      enabled = true;
    }
  }
  if (!enabled) return;
  let stringify = JSON.stringify(create2);
  if (stringify.length <= 16384) {
    firstElementChild.setAttribute(
      EditorChipsAndNodeViewsDataLfileEnums,
      stringify,
    );
  }
}

var editorChipsAndNodeViewsSet: Dynamic;

var resolveEditorChipsAndNodeViewsChildCount: Dynamic;

function resolveEditorChipsAndNodeViewsTo(
  editorChipsAndNodeViews?: Dynamic,
  start?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let { $to: selection }: Dynamic = editorChipsAndNodeViews.state.selection;
  if (selection.depth === 0) return;
  let after: Dynamic = selection.after(selection.depth);
  let nodeAt: Dynamic = editorChipsAndNodeViews.state.doc.nodeAt(after);
  if (
    nodeAt?.type.name === `orderedList` &&
    (nodeAt.attrs.start ?? 1) !== start
  ) {
    editorChipsAndNodeViews.commands.command(
      ({ tr: tr2 }: Dynamic, ..._extraArguments: unknown[]) => (
        tr2.setNodeMarkup(after, undefined, {
          ...nodeAt.attrs,
          start: start,
        }),
        true
      ),
    );
  }
}

function isEditorChipsAndNodeViewsFrom(
  editorChipsAndNodeViews?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let { $from: selection, empty: selection2 }: Dynamic =
    editorChipsAndNodeViews.state.selection;
  if (!selection2) return false;
  let parent: Dynamic = selection.parent;
  if (
    parent.type.name !== `paragraph` ||
    parent.content.size !== 0 ||
    selection.depth < 3
  )
    return false;
  let node: Dynamic = selection.node(-1);
  if (node.type.name !== `listItem` || node.childCount !== 1) return false;
  let node2: Dynamic = selection.node(-2);
  if (
    node2.type.name !== `orderedList` ||
    (selection.depth >= 4 && selection.node(-3).type.name === `listItem`)
  )
    return false;
  let index: Dynamic = selection.index(-2);
  if (index === 0 || index >= node2.childCount - 1) return false;
  let total: Dynamic = (node2.attrs.start ?? 1) + index;
  return editorChipsAndNodeViews.commands.liftEmptyBlock()
    ? (resolveEditorChipsAndNodeViewsTo(editorChipsAndNodeViews, total), true)
    : false;
}

function isEditorChipsAndNodeViewsState(
  editorChipsAndNodeViewsState7?: Dynamic,
  options: Dynamic = (
    editorChipsAndNodeViewsState9?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorChipsAndNodeViewsState9.sinkListItem(`listItem`),
  ..._extraArguments: unknown[]
): Dynamic {
  let { state: editorChipsAndNodeViewsState8 }: Dynamic =
    editorChipsAndNodeViewsState7;
  let listItem: Dynamic = editorChipsAndNodeViewsState8.schema.nodes.listItem;
  if (!listItem) return false;
  let { $from: selection, $to: selection2 }: Dynamic =
    editorChipsAndNodeViewsState8.selection;
  let editorChipsAndNodeViewsChildCount: Dynamic =
    resolveEditorChipsAndNodeViewsChildCount(listItem);
  let blockRange: Dynamic = selection.blockRange(
    selection2,
    editorChipsAndNodeViewsChildCount,
  );
  if (!blockRange) return false;
  let matchesDifference = blockRange.endIndex - blockRange.startIndex === 1;
  let child: Dynamic = blockRange.parent.child(blockRange.startIndex);
  let count: Dynamic = 0;
  for (let index = 0; index < child.childCount; index++) {
    let child2: Dynamic = child.child(index);
    if (editorChipsAndNodeViewsChildCount(child2)) break;
    count += child2.nodeSize;
  }
  let total: Dynamic = blockRange.start + 1 + count;
  return matchesDifference &&
    child.childCount > 1 &&
    child.lastChild &&
    editorChipsAndNodeViewsChildCount(child.lastChild) &&
    (selection.nodeAfter === child || selection2.pos <= total)
    ? editorChipsAndNodeViewsState7.can().sinkListItem(`listItem`)
      ? options(editorChipsAndNodeViewsState7.chain())
          .command(
            (
              { tr: tr2, dispatch: dispatch }: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let enabled = false;
              for (let index = 0; index < 16; index++) {
                let $from: Dynamic = tr2.selection.$from;
                let node: Dynamic = null;
                let isEditorChipsAndNodeViewsStateResult: Dynamic = -1;
                if ($from.nodeAfter?.type === listItem) {
                  node = $from.nodeAfter;
                  isEditorChipsAndNodeViewsStateResult = $from.pos;
                } else
                  for (let depth: Dynamic = $from.depth; depth > 0; depth--)
                    if ($from.node(depth).type === listItem) {
                      node = $from.node(depth);
                      isEditorChipsAndNodeViewsStateResult =
                        $from.before(depth);
                      break;
                    }
                if (!node || isEditorChipsAndNodeViewsStateResult < 0)
                  return enabled;
                let lastChild: Dynamic = node.lastChild;
                if (!lastChild || !editorChipsAndNodeViewsChildCount(lastChild))
                  break;
                let total2: Dynamic =
                  isEditorChipsAndNodeViewsStateResult +
                  1 +
                  (node.content.size - lastChild.nodeSize);
                let blockRange2: Dynamic = (
                  editorChipsAndNodeViewsState9?: Dynamic,
                  node2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  editorChipsAndNodeViewsState9
                    .resolve(total2 + 2)
                    .blockRange(
                      editorChipsAndNodeViewsState9.resolve(
                        total2 + node2.nodeSize - 2,
                      ),
                      editorChipsAndNodeViewsChildCount,
                    );
                let blockRange3: Dynamic = blockRange2(tr2.doc, lastChild);
                if (!blockRange3) return enabled;
                let liftTarget2: Dynamic = liftTarget(blockRange3);
                if (liftTarget2 == null) return enabled;
                if (!dispatch) return true;
                let parent: Dynamic = tr2.doc.resolve(
                  isEditorChipsAndNodeViewsStateResult,
                ).parent;
                if (
                  (lastChild.type !== parent.type ||
                    lastChild.attrs.kind !== parent.attrs.kind) &&
                  parent.type.validContent(lastChild.content)
                ) {
                  tr2.setNodeMarkup(
                    total2,
                    parent.type,
                    lastChild.type === parent.type
                      ? {
                          ...lastChild.attrs,
                          kind: parent.attrs.kind,
                        }
                      : null,
                  );
                  lastChild = tr2.doc.nodeAt(total2);
                  blockRange3 = blockRange2(tr2.doc, lastChild);
                }
                tr2.lift(blockRange3, liftTarget2);
                enabled = true;
              }
              return enabled;
            },
          )
          .run()
      : false
    : options(editorChipsAndNodeViewsState7.chain()).run();
}

function filterEditorChipsAndNodeViewsOnce(
  filterEditorChipsAndNodeViewsOnce2?: Dynamic,
  actor?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let element: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`div`);
  element.className = `ldoc-person-card`;
  let element2: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`div`);
  element2.className = `head`;
  let element3: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`span`);
  element3.className = `av`;
  let principal: Dynamic = actor.principal || actor.label;
  element3.style.background =
    resolveEditorAnchorsAndMentionsValue(actor.principal, actor.label) ??
    editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values[0];
  element3.textContent = (actor.label[0] ?? principal[0] ?? `?`).toUpperCase();
  if (actor.photoUrl) {
    let element7: Dynamic =
      filterEditorChipsAndNodeViewsOnce2.createElement(`img`);
    element7.src = actor.photoUrl;
    element7.alt = ``;
    element7.referrerPolicy = `no-referrer`;
    element7.addEventListener(
      `error`,
      (..._extraArguments: unknown[]): Dynamic => element7.remove(),
      {
        once: true,
      },
    );
    element3.append(element7);
  }
  let element4: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`span`);
  element4.className = `who`;
  let element5: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`span`);
  element5.className = `nm`;
  element5.textContent = actor.label;
  element4.append(element5);
  let email: Dynamic = actor.email;
  if (email) {
    let element7: Dynamic =
      filterEditorChipsAndNodeViewsOnce2.createElement(`span`);
    element7.className = `em`;
    element7.textContent = email;
    element4.append(element7);
  }
  element2.append(element3, element4);
  element.append(element2);
  let element6: Dynamic =
    filterEditorChipsAndNodeViewsOnce2.createElement(`div`);
  element6.className = `actions`;
  if (context.onCopy && email) {
    let element7: Dynamic =
      filterEditorChipsAndNodeViewsOnce2.createElement(`button`);
    element7.type = `button`;
    element7.className = `cp`;
    element7.textContent = `Copy email`;
    element7.addEventListener(
      `click`,
      (..._extraArguments: unknown[]): Dynamic => context.onCopy?.(email),
    );
    element6.append(element7);
  }
  if (element6.childElementCount > 0) {
    element.append(element6);
  }
  let filteredItems: Dynamic = [actor.role, actor.desk, actor.local].filter(
    (item?: unknown, ..._extraArguments: unknown[]) =>
      typeof item == `string` && item !== ``,
  );
  if (filteredItems.length > 0) {
    let element7: Dynamic =
      filterEditorChipsAndNodeViewsOnce2.createElement(`div`);
    element7.className = `ants`;
    for (let filterEditorChipsAndNodeViewsOnceResult of filteredItems as Dynamic) {
      let element8: Dynamic =
        filterEditorChipsAndNodeViewsOnce2.createElement(`div`);
      element8.className = `fact`;
      element8.textContent = filterEditorChipsAndNodeViewsOnceResult;
      element7.append(element8);
    }
    element.append(element7);
  }
  return element;
}

var EditorChipsAndNodeViewsState2: {
    on: boolean;
};

var resolveEditorChipsAndNodeViewsIsTrusted: Dynamic;

var resolveEditorChipsAndNodeViewsButton: Dynamic;

var resolveEditorChipsAndNodeViewsButton2: Dynamic;

function clearEditorChipsAndNodeViewsPassive(
  clearEditorChipsAndNodeViewsPassive2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let pop = document.createElement(`div`);
  pop.className = `ldoc-chip-pop` + (context.cls ? ` ${context.cls}` : ``);
  let held: Dynamic = new (Set as Dynamic)();
  pop.addEventListener(
    `keydown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void (event.repeat || held.add(event.key)),
    true,
  );
  pop.addEventListener(
    `keyup`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined =>
      void held.delete(event.key),
    true,
  );
  if (!context.bare) {
    let element = document.createElement(`div`);
    element.className = `hdr`;
    element.textContent = resolveEditorExtensionsJoin(options);
    pop.append(element);
  }
  document.body.append(pop);
  let updateMaxHeight = (..._extraArguments: unknown[]): undefined => {
    let clearEditorChipsAndNodeViewsPassiveBounds2: Dynamic =
      clearEditorChipsAndNodeViewsPassive2.getBoundingClientRect();
    let innerWidth = window.innerWidth || 0;
    let innerHeight = window.innerHeight || 0;
    let max = Math.max(
      4,
      Math.min(
        clearEditorChipsAndNodeViewsPassiveBounds2.left,
        innerWidth - pop.offsetWidth - 4,
      ),
    );
    pop.style.left = `${max}px`;
    let difference =
      innerHeight - clearEditorChipsAndNodeViewsPassiveBounds2.bottom - 8;
    let difference2 = clearEditorChipsAndNodeViewsPassiveBounds2.top - 8;
    let offsetHeight = pop.offsetHeight;
    if (offsetHeight <= difference || difference >= difference2) {
      pop.style.top = `${clearEditorChipsAndNodeViewsPassiveBounds2.bottom + 4}px`;
      pop.style.maxHeight = `${Math.max(80, difference)}px`;
    } else {
      pop.style.top = `${Math.max(4, clearEditorChipsAndNodeViewsPassiveBounds2.top - Math.min(offsetHeight, difference2) - 4)}px`;
      pop.style.maxHeight = `${Math.max(80, difference2)}px`;
    }
  };
  let clearEditorChipsAndNodeViewsPassiveBounds: Dynamic =
    clearEditorChipsAndNodeViewsPassive2.getBoundingClientRect();
  pop.style.left = `${Math.max(4, Math.min(clearEditorChipsAndNodeViewsPassiveBounds.left, (window.innerWidth || 0) - pop.offsetWidth - 4))}px`;
  pop.style.top = `${clearEditorChipsAndNodeViewsPassiveBounds.bottom + 4}px`;
  requestAnimationFrame(updateMaxHeight);
  document.addEventListener(`scroll`, updateMaxHeight, {
    passive: true,
    capture: true,
  });
  let enabled = false;
  let close = (
    clearEditorChipsAndNodeViewsPassive3: Dynamic = `caller`,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      enabled = true;
      context.onClose?.(clearEditorChipsAndNodeViewsPassive3);
      pop.remove();
      document.removeEventListener(`scroll`, updateMaxHeight, true);
      document.removeEventListener(`mousedown`, contains2, true);
      document.removeEventListener(`keydown`, close2, true);
    }
  };
  let contains2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let target: Dynamic = event.target;
    if (
      !(
        pop.contains(target) ||
        (context.anchorToggle &&
          clearEditorChipsAndNodeViewsPassive2.contains(target))
      )
    ) {
      close(`outside`);
    }
  };
  let close2 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (event.key === `Escape` && !event.isComposing) {
      event.stopPropagation();
      close(`escape`);
    }
  };
  resolveEditorExtensionsValue12().schedule(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        document.addEventListener(`mousedown`, contains2, true);
        document.addEventListener(`keydown`, close2, true);
      }
    },
    0,
  );
  return {
    pop: pop,
    close: close,
    held: held,
  };
}

var editorChipsAndNodeViewsMap: Dynamic;

var updateEditorChipsAndNodeViewsTimeZone: Dynamic;

var resolveEditorChipsAndNodeViewsPickDate: Dynamic;

var resolveEditorChipsAndNodeViewsDate: Dynamic;

var resolveEditorChipsAndNodeViewsTimeZone: Dynamic;

var resolveEditorChipsAndNodeViewsTimeZone2: Dynamic;

var resolveEditorChipsAndNodeViewsDate2: Dynamic;

var resolveEditorChipsAndNodeViewsTimeZone3: Dynamic;

var resolveEditorChipsAndNodeViewsPadStart: (editorChipsAndNodeViewsPadStart?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorChipsAndNodeViewsSetDate: Dynamic;

var EditorChipsAndNodeViewsState3: Dynamic;

var resolveEditorChipsAndNodeViewsTimeZone4: Dynamic;

var resolveEditorChipsAndNodeViewsValue: (editorChipsAndNodeViewsValue?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorChipsAndNodeViewsState4: Dynamic;

var resolveEditorChipsAndNodeViewsLocale: Dynamic;

var EditorChipsAndNodeViewsState5: Dynamic;

var resolveEditorChipsAndNodeViewsLocale2: Dynamic;

var editorChipsAndNodeViewsValue0: number;

function collectEditorChipsAndNodeViewsFocusVisible(
  collectEditorChipsAndNodeViewsFocusVisible2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let root = document.createElement(`div`);
  root.className = `ldoc-chip-cal`;
  let editorChipsAndNodeViewsPadStart =
    resolveEditorChipsAndNodeViewsPadStart();
  let matchesCollectEditorChipsAndNodeViewsFocusVisible =
    collectEditorChipsAndNodeViewsFocusVisible2 !== `` &&
    !Number.isNaN(
      +new Date(`${collectEditorChipsAndNodeViewsFocusVisible2}T00:00:00`),
    );
  let date2: Dynamic = matchesCollectEditorChipsAndNodeViewsFocusVisible
    ? new Date(`${collectEditorChipsAndNodeViewsFocusVisible2}T00:00:00`)
    : resolveEditorChipsAndNodeViewsTimeZone3();
  let fullYear: Dynamic = date2.getFullYear();
  let month: Dynamic = date2.getMonth();
  let editorChipsAndNodeViewsPadStart2 =
    matchesCollectEditorChipsAndNodeViewsFocusVisible
      ? resolveEditorChipsAndNodeViewsPadStart(date2)
      : ``;
  let editorChipsAndNodeViewsPadStart3: Dynamic =
    matchesCollectEditorChipsAndNodeViewsFocusVisible
      ? editorChipsAndNodeViewsPadStart2
      : editorChipsAndNodeViewsPadStart;
  let enabled = false;
  let element = document.createElement(`div`);
  element.className = `nav`;
  let element2 = document.createElement(`button`);
  element2.type = `button`;
  element2.append(resolveEditorChipsAndNodeViewsValue2(`caretLeft`, 14));
  element2.setAttribute(`aria-label`, `Previous month`);
  let element3 = document.createElement(`button`);
  element3.type = `button`;
  element3.append(resolveEditorChipsAndNodeViewsValue2(`caretRight`, 14));
  element3.setAttribute(`aria-label`, `Next month`);
  let element4 = document.createElement(`span`);
  element4.className = `m`;
  element4.id = `ldoc-chip-cal-title-${++editorChipsAndNodeViewsValue0}`;
  element.append(element2, element4, element3);
  let element5 = document.createElement(`div`);
  element5.className = `grid`;
  element5.setAttribute(`role`, `grid`);
  element5.setAttribute(`aria-labelledby`, element4.id);
  root.append(element, element5);
  let querySelector: Dynamic = (
    collectEditorChipsAndNodeViewsFocusVisible3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    element5.querySelector(
      `.d[data-iso="${collectEditorChipsAndNodeViewsFocusVisible3}"]:not(.out)`,
    );
  let append = (..._extraArguments: unknown[]): undefined => {
    element4.textContent = resolveEditorChipsAndNodeViewsLocale(
      fullYear,
      month,
    );
    element5.textContent = ``;
    let element6 = document.createElement(`div`);
    element6.setAttribute(`role`, `row`);
    element6.setAttribute(`aria-hidden`, `true`);
    for (let collectEditorChipsAndNodeViewsFocusVisibleResult3 of resolveEditorChipsAndNodeViewsTimeZone4(
      resolveEditorExtensionsValue12().locale,
    ) as Dynamic) {
      let element7 = document.createElement(`div`);
      element7.className = `dow`;
      element7.setAttribute(`role`, `columnheader`);
      element7.textContent = collectEditorChipsAndNodeViewsFocusVisibleResult3;
      element6.append(element7);
    }
    element5.append(element6);
    let date3 = new Date(fullYear, month, 1);
    let editorChipsAndNodeViewsSetDate: Dynamic =
      resolveEditorChipsAndNodeViewsSetDate(date3, -date3.getDay());
    let collectEditorChipsAndNodeViewsFocusVisibleResult2: Dynamic = null;
    for (let index = 0; index < 42; index++) {
      if (index % 7 == 0) {
        collectEditorChipsAndNodeViewsFocusVisibleResult2 =
          document.createElement(`div`);
        collectEditorChipsAndNodeViewsFocusVisibleResult2.setAttribute(
          `role`,
          `row`,
        );
        element5.append(collectEditorChipsAndNodeViewsFocusVisibleResult2);
      }
      let editorChipsAndNodeViewsPadStart4 =
        resolveEditorChipsAndNodeViewsPadStart(editorChipsAndNodeViewsSetDate);
      let element7 = document.createElement(`div`);
      element7.className = `d`;
      element7.dataset.iso = editorChipsAndNodeViewsPadStart4;
      element7.setAttribute(`role`, `gridcell`);
      element7.textContent = String(editorChipsAndNodeViewsSetDate.getDate());
      element7.setAttribute(
        `aria-label`,
        resolveEditorChipsAndNodeViewsLocale2(
          editorChipsAndNodeViewsSetDate,
          element7.textContent,
        ),
      );
      if (editorChipsAndNodeViewsSetDate.getMonth() === month) {
        element7.tabIndex =
          editorChipsAndNodeViewsPadStart4 === editorChipsAndNodeViewsPadStart3
            ? 0
            : -1;
        if (
          editorChipsAndNodeViewsPadStart4 === editorChipsAndNodeViewsPadStart2
        ) {
          element7.setAttribute(`aria-selected`, `true`);
        }
      } else {
        element7.classList.add(`out`);
      }
      if (
        editorChipsAndNodeViewsPadStart4 === editorChipsAndNodeViewsPadStart
      ) {
        element7.classList.add(`today`);
        element7.setAttribute(`aria-current`, `date`);
      }
      if (
        editorChipsAndNodeViewsPadStart4 === editorChipsAndNodeViewsPadStart2
      ) {
        element7.classList.add(`sel`);
      }
      element7.addEventListener(
        `mousedown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          event.preventDefault();
          enabled = true;
          options.pick(
            editorChipsAndNodeViewsPadStart4,
            resolveEditorChipsAndNodeViewsButton(event) ? `key` : `pointer`,
          );
        },
      );
      element7.addEventListener(
        `click`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let enabled3 = enabled;
          enabled = false;
          if (event.detail === 0 && element7.isConnected && !enabled3) {
            options.pick(editorChipsAndNodeViewsPadStart4, `key`);
          }
        },
      );
      collectEditorChipsAndNodeViewsFocusVisibleResult2.append(element7);
      editorChipsAndNodeViewsSetDate = resolveEditorChipsAndNodeViewsSetDate(
        editorChipsAndNodeViewsSetDate,
        1,
      );
    }
  };
  let focus: Dynamic = (
    collectEditorChipsAndNodeViewsFocusVisible3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let [
      mappedCollectEditorChipsAndNodeViewsFocusVisibleParts,
      setMappedCollectEditorChipsAndNodeViewsFocusVisibleParts,
    ]: Dynamic = collectEditorChipsAndNodeViewsFocusVisible3
      .split(`-`)
      .map(Number);
    editorChipsAndNodeViewsPadStart3 =
      collectEditorChipsAndNodeViewsFocusVisible3;
    if (
      mappedCollectEditorChipsAndNodeViewsFocusVisibleParts !== fullYear ||
      setMappedCollectEditorChipsAndNodeViewsFocusVisibleParts - 1 !== month
    ) {
      fullYear = mappedCollectEditorChipsAndNodeViewsFocusVisibleParts;
      month = setMappedCollectEditorChipsAndNodeViewsFocusVisibleParts - 1;
      append();
    } else
      for (let collectEditorChipsAndNodeViewsFocusVisibleResult2 of element5.querySelectorAll(
        `.d[tabindex]`,
      ) as Dynamic)
        collectEditorChipsAndNodeViewsFocusVisibleResult2.tabIndex =
          collectEditorChipsAndNodeViewsFocusVisibleResult2.dataset.iso ===
          collectEditorChipsAndNodeViewsFocusVisible3
            ? 0
            : -1;
    let matchedElement: Dynamic = querySelector(
      collectEditorChipsAndNodeViewsFocusVisible3,
    );
    matchedElement?.focus({
      focusVisible: true,
      preventScroll: true,
    });
    return (
      matchedElement !== null &&
      matchedElement.ownerDocument.activeElement === matchedElement
    );
  };
  let getDate: Dynamic = (
    collectEditorChipsAndNodeViewsFocusVisible3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let date3 = new Date(
      collectEditorChipsAndNodeViewsFocusVisible3.getFullYear(),
      collectEditorChipsAndNodeViewsFocusVisible3.getMonth() + options2 + 1,
      0,
    ).getDate();
    return new Date(
      collectEditorChipsAndNodeViewsFocusVisible3.getFullYear(),
      collectEditorChipsAndNodeViewsFocusVisible3.getMonth() + options2,
      Math.min(collectEditorChipsAndNodeViewsFocusVisible3.getDate(), date3),
    );
  };
  let enabled2 = false;
  let getMonth = (
    collectEditorChipsAndNodeViewsFocusVisible3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let ownerDocument2 = root.ownerDocument;
    let activeElement2 = ownerDocument2.activeElement;
    let contains2 =
      element5.contains(activeElement2) ||
      (enabled2 &&
        (activeElement2 === null || activeElement2 === ownerDocument2.body));
    enabled2 = false;
    let date3: Dynamic = getDate(
      new Date(fullYear, month, 1),
      collectEditorChipsAndNodeViewsFocusVisible3,
    );
    fullYear = date3.getFullYear();
    month = date3.getMonth();
    editorChipsAndNodeViewsPadStart3 = resolveEditorChipsAndNodeViewsPadStart(
      getDate(
        new Date(`${editorChipsAndNodeViewsPadStart3}T00:00:00`),
        collectEditorChipsAndNodeViewsFocusVisible3,
      ),
    );
    append();
    if (contains2) {
      focus(editorChipsAndNodeViewsPadStart3);
    } else {
      resolvePlatformAnnouncementsValue(
        root.ownerDocument,
        element4.textContent ?? ``,
        {
          key: `chip-calendar-month`,
        },
      );
    }
  };
  for (let collectEditorChipsAndNodeViewsFocusVisibleResult2 of [
    element2,
    element3,
  ] as Dynamic)
    collectEditorChipsAndNodeViewsFocusVisibleResult2.addEventListener(
      `mousedown`,
      (..._extraArguments: unknown[]): undefined => {
        enabled2 = element5.contains(root.ownerDocument.activeElement);
      },
    );
  element2.addEventListener(`click`, (..._extraArguments: unknown[]) =>
    getMonth(-1),
  );
  element3.addEventListener(`click`, (..._extraArguments: unknown[]) =>
    getMonth(1),
  );
  let collectEditorChipsAndNodeViewsFocusVisibleResult: Dynamic = null;
  root.addEventListener(
    `keydown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        event.isComposing ||
        event.keyCode === 229 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      let target: Dynamic =
        event.target instanceof HTMLElement ? event.target : null;
      let matchesTarget: Dynamic =
        target !== null &&
        element5.contains(target) &&
        target.classList.contains(`d`) &&
        !target.classList.contains(`out`);
      if (event.key === `Tab`) {
        if (
          !options.byKey() ||
          !(event.shiftKey ? target === element2 : matchesTarget)
        )
          return;
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) {
          collectEditorChipsAndNodeViewsFocusVisibleResult = `leave`;
        }
        return;
      }
      if (!matchesTarget) return;
      if (event.key === `Enter` || event.key === ` `) {
        event.preventDefault();
        if (
          !event.repeat &&
          !event.shiftKey &&
          resolveEditorChipsAndNodeViewsIsTrusted(event)
        ) {
          collectEditorChipsAndNodeViewsFocusVisibleResult = `pick`;
        }
        return;
      }
      let date3 = new Date(`${editorChipsAndNodeViewsPadStart3}T00:00:00`);
      let matchesKey = event.key === `PageUp` || event.key === `PageDown`;
      if (event.shiftKey && !matchesKey) return;
      let editorChipsAndNodeViewsSetDate: Dynamic =
        event.key === `ArrowLeft`
          ? resolveEditorChipsAndNodeViewsSetDate(date3, -1)
          : event.key === `ArrowRight`
            ? resolveEditorChipsAndNodeViewsSetDate(date3, 1)
            : event.key === `ArrowUp`
              ? resolveEditorChipsAndNodeViewsSetDate(date3, -7)
              : event.key === `ArrowDown`
                ? resolveEditorChipsAndNodeViewsSetDate(date3, 7)
                : matchesKey
                  ? getDate(
                      date3,
                      (event.key === `PageUp` ? -1 : 1) *
                        (event.shiftKey ? 12 : 1),
                    )
                  : event.key === `Home`
                    ? new Date(date3.getFullYear(), date3.getMonth(), 1)
                    : event.key === `End`
                      ? new Date(date3.getFullYear(), date3.getMonth() + 1, 0)
                      : null;
      if (editorChipsAndNodeViewsSetDate !== null) {
        event.preventDefault();
        focus(
          resolveEditorChipsAndNodeViewsPadStart(
            editorChipsAndNodeViewsSetDate,
          ),
        );
      }
    },
  );
  root.addEventListener(
    `keyup`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        collectEditorChipsAndNodeViewsFocusVisibleResult === `pick` &&
        (event.key === `Enter` || event.key === ` `)
      ) {
        collectEditorChipsAndNodeViewsFocusVisibleResult = null;
        event.preventDefault();
        if (resolveEditorChipsAndNodeViewsIsTrusted(event)) {
          options.pick(editorChipsAndNodeViewsPadStart3, `key`);
        }
      } else {
        if (
          collectEditorChipsAndNodeViewsFocusVisibleResult === `leave` &&
          event.key === `Tab`
        ) {
          collectEditorChipsAndNodeViewsFocusVisibleResult = null;
          options.leave();
        }
      }
    },
  );
  root.addEventListener(
    `focusout`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          event.relatedTarget instanceof
            ((globalThis as Dynamic).Node as Dynamic) &&
          root.contains(event.relatedTarget)
        )
      ) {
        collectEditorChipsAndNodeViewsFocusVisibleResult = null;
      }
    },
  );
  append();
  return {
    root: root,
    focusDay: (..._extraArguments: unknown[]): Dynamic =>
      focus(editorChipsAndNodeViewsPadStart3),
  };
}

var isEditorChipsAndNodeViewsKeys: (editorChipsAndNodeViewsKeys?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function collectEditorChipsAndNodeViewsInline(
  collectEditorChipsAndNodeViewsInline2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataChip: Dynamic = collectEditorChipsAndNodeViewsInline2.name
    .replace(/^chip/, ``)
    .toLowerCase();
  let copyText: Dynamic =
    collectEditorChipsAndNodeViewsInline2.copyText &&
    ((
      collectEditorChipsAndNodeViewsInline3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolveEditorExtensionsJoin(
        collectEditorChipsAndNodeViewsInline2.copyText(
          collectEditorChipsAndNodeViewsInline3,
        ),
      ));
  return Node2.create({
    name: collectEditorChipsAndNodeViewsInline2.name,
    inline: true,
    atom: true,
    group: `inline`,
    selectable: true,
    addAttributes(..._extraArguments: unknown[]) {
      return Object.fromEntries(
        Object.entries(collectEditorChipsAndNodeViewsInline2.attrs).map(
          (
            [attrsEntry, attrsEntry2]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => [
            attrsEntry,
            {
              default: attrsEntry2.default,
              parseHTML: (
                element?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let attribute: Dynamic = element.getAttribute(
                  `data-${attrsEntry}`,
                );
                if (attribute == null) return attrsEntry2.default;
                try {
                  return JSON.parse(attribute);
                } catch {
                  return attribute;
                }
              },
              renderHTML: (
                collectEditorChipsAndNodeViewsInline3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                [`data-${attrsEntry}`]: JSON.stringify(
                  collectEditorChipsAndNodeViewsInline3[attrsEntry],
                ),
              }),
            },
          ],
        ),
      );
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `span[data-chip="${dataChip}"]`,
        },
      ];
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let mergeAttributes2: Dynamic = mergeAttributes(HTMLAttributes, {
        "data-chip": dataChip,
        class: `ldoc-chip`,
      });
      let copyText2: Dynamic = copyText?.(node.attrs) ?? ``;
      return copyText2
        ? [`span`, mergeAttributes2, copyText2]
        : [`span`, mergeAttributes2];
    },
    ...(copyText && {
      renderText(
        { node: node }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return copyText(node.attrs);
      },
    }),
    addNodeView(..._extraArguments: unknown[]): Dynamic {
      return updateEditorChipsAndNodeViewsNode(
        collectEditorChipsAndNodeViewsInline2.name,
        (..._extraArguments: unknown[]): Dynamic => dataChip,
        collectEditorChipsAndNodeViewsInline2.render,
      );
    },
  });
}

function updateEditorChipsAndNodeViewsNode(
  updateEditorChipsAndNodeViewsNode2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    { node: node, editor: editor, getPos: getPos }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dom = document.createElement(`span`);
    dom.className = `ldoc-chip`;
    dom.contentEditable = `false`;
    let items: Dynamic = [];
    let updateEditorChipsAndNodeViewsNodeResult: Dynamic = null;
    let popover: Dynamic = (
      updateEditorChipsAndNodeViewsNode4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      updateEditorChipsAndNodeViewsNodeResult?.(`reopen`);
      let ownerDocument2 = dom.ownerDocument;
      let editorChipsAndNodeViewsWeakMap8Entry: Dynamic = options2?.keyboardHome
        ? editorChipsAndNodeViewsWeakMap8.get(ownerDocument2)
        : undefined;
      if (
        editorChipsAndNodeViewsWeakMap8Entry &&
        editorChipsAndNodeViewsWeakMap8Entry !==
          updateEditorChipsAndNodeViewsNodeResult
      ) {
        editorChipsAndNodeViewsWeakMap8Entry(`outside`);
      }
      let clearEditorChipsAndNodeViewsPassive2: Dynamic =
        clearEditorChipsAndNodeViewsPassive(
          dom,
          updateEditorChipsAndNodeViewsNode4,
          {
            ...options2,
            onClose: (
              updateEditorChipsAndNodeViewsNode5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let contains2: Dynamic =
                clearEditorChipsAndNodeViewsPassive2.pop.contains(
                  ownerDocument2.activeElement,
                );
              options2?.onClose?.(updateEditorChipsAndNodeViewsNode5);
              if (
                updateEditorChipsAndNodeViewsNodeResult ===
                clearEditorChipsAndNodeViewsPassive2.close
              ) {
                updateEditorChipsAndNodeViewsNodeResult = null;
              }
              if (
                editorChipsAndNodeViewsWeakMap8.get(ownerDocument2) ===
                clearEditorChipsAndNodeViewsPassive2.close
              ) {
                editorChipsAndNodeViewsWeakMap8.delete(ownerDocument2);
              }
              if (options2?.keyboardHome && contains2) {
                focus(
                  updateEditorChipsAndNodeViewsNode5,
                  options2.keyboardHome(),
                  clearEditorChipsAndNodeViewsPassive2.held,
                );
              }
            },
          },
        );
      updateEditorChipsAndNodeViewsNodeResult =
        clearEditorChipsAndNodeViewsPassive2.close;
      if (options2?.keyboardHome) {
        editorChipsAndNodeViewsWeakMap8.set(
          ownerDocument2,
          clearEditorChipsAndNodeViewsPassive2.close,
        );
      }
      return clearEditorChipsAndNodeViewsPassive2;
    };
    let updateEditorChipsAndNodeViewsNode3 = (
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let updateEditorChipsAndNodeViewsNodeResult2 of items as Dynamic)
        updateEditorChipsAndNodeViewsNodeResult2();
      items = [];
    };
    let focus: Dynamic = (
      updateEditorChipsAndNodeViewsNode4?: Dynamic,
      options2?: Dynamic,
      context4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let ownerDocument2 = dom.ownerDocument;
      if (
        updateEditorChipsAndNodeViewsNode4 === `removed` ||
        (options2 &&
          (updateEditorChipsAndNodeViewsNode4 === `pointer` ||
            updateEditorChipsAndNodeViewsNode4 === `outside`))
      ) {
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          if (
            editor.isDestroyed ||
            !editor.isEditable ||
            !ownerDocument2.hasFocus()
          )
            return;
          let activeElement2 = ownerDocument2.activeElement;
          if (
            activeElement2 === null ||
            activeElement2 === ownerDocument2.body ||
            !activeElement2.isConnected
          ) {
            editor.view.focus();
          }
        });
        return;
      }
      if (
        (updateEditorChipsAndNodeViewsNode4 !== `escape` &&
          updateEditorChipsAndNodeViewsNode4 !== `key`) ||
        editor.isDestroyed ||
        !ownerDocument2.hasFocus()
      )
        return;
      let view: Dynamic = editor.view;
      if (!options2) return view.focus();
      let pos2: Dynamic = pos();
      let selection: Dynamic = view.state.selection;
      if (
        pos2 !== null &&
        !(
          selection instanceof (NodeSelection as Dynamic) &&
          selection.from === pos2
        )
      ) {
        view.dispatch(
          view.state.tr.setSelection(
            NodeSelection.create(view.state.doc, pos2),
          ),
        );
      }
      view.focus();
      clearEditorChipsAndNodeViewsEscape(view.dom, context4);
    };
    let pos: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let pos2: Dynamic = getPos();
      return pos2 != null &&
        editor.state.doc.nodeAt(pos2)?.type.name ===
          updateEditorChipsAndNodeViewsNode2
        ? pos2
        : null;
    };
    let setAttrs = (
      updateEditorChipsAndNodeViewsNode4?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!editor.isEditable) return;
      let pos2: Dynamic = getPos();
      if (pos2 == null) return;
      let nodeAt: Dynamic = editor.state.doc.nodeAt(pos2);
      let record2: Dynamic = {
        ...nodeAt?.attrs,
        ...updateEditorChipsAndNodeViewsNode4,
      };
      if (!(nodeAt && isEditorChipsAndNodeViewsKeys(record2, nodeAt.attrs))) {
        editor.view.dispatch(
          editor.state.tr.setNodeMarkup(pos2, undefined, record2),
        );
      }
    };
    let context2 = (
      attrs2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      updateEditorChipsAndNodeViewsNode3();
      dom.textContent = ``;
      if (editor.isEditable) {
        delete dom.dataset.readonly;
      } else {
        dom.dataset.readonly = `true`;
      }
      let addEventListener3 = (
        updateEditorChipsAndNodeViewsNode4?: Dynamic,
        options3?: Dynamic,
        context5?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        updateEditorChipsAndNodeViewsNode4.addEventListener(options3, context5);
        items.push(
          (..._extraArguments: unknown[]): Dynamic =>
            updateEditorChipsAndNodeViewsNode4.removeEventListener(
              options3,
              context5,
            ),
        );
      };
      let options2: Dynamic = options(attrs2);
      if (dom.dataset.chip !== undefined && dom.dataset.chip !== options2) {
        updateEditorChipsAndNodeViewsNodeResult?.(`removed`);
      }
      dom.dataset.chip = options2;
      let context4: Dynamic = context({
        dom: dom,
        attrs: attrs2,
        setAttrs: setAttrs,
        editor: editor,
        on: addEventListener3,
        popover: popover,
        pos: pos,
      });
      if (context4) {
        items.push(context4);
      }
    };
    let attrs: Dynamic = node.attrs;
    context2(attrs);
    let isEditable: Dynamic = editor.isEditable;
    let context3 = (..._extraArguments: unknown[]): undefined => {
      if (editor.isEditable !== isEditable) {
        isEditable = editor.isEditable;
        context2(attrs);
      }
    };
    editor.on(`update`, context3);
    return {
      dom: dom,
      update(
        updateEditorChipsAndNodeViewsNode4?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        return updateEditorChipsAndNodeViewsNode4.type.name ===
          updateEditorChipsAndNodeViewsNode2
          ? (isEditorChipsAndNodeViewsKeys(
              updateEditorChipsAndNodeViewsNode4.attrs,
              attrs,
            ) || context2((attrs = updateEditorChipsAndNodeViewsNode4.attrs)),
            true)
          : false;
      },
      stopEvent: (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        event.type === `mousedown` ||
        event.type === `click` ||
        (event.target === dom && event.type.startsWith(`key`)),
      destroy(..._extraArguments: unknown[]): undefined {
        editor.off(`update`, context3);
        updateEditorChipsAndNodeViewsNode3();
        updateEditorChipsAndNodeViewsNodeResult?.(`removed`);
      },
    };
  };
}

var resolveEditorChipsAndNodeViewsSpan: (editorChipsAndNodeViewsSpan?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolveEditorChipsAndNodeViewsSpan2: Dynamic;

var EditorChipsAndNodeViewsNeutral: Dynamic;

var resolveEditorChipsAndNodeViewsSpan3: Dynamic;

var EditorChipsAndNodeViewsGray: Dynamic;

var resolveEditorChipsAndNodeViewsNeutral: Dynamic;

var EditorChipsAndNodeViewsGray2: (string | RegExp)[][];

function resolveEditorChipsAndNodeViewsGray(
  editorChipsAndNodeViewsGray?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let [
    resolveEditorChipsAndNodeViewsGrayResult,
    resolveEditorChipsAndNodeViewsGrayResult2,
  ] of EditorChipsAndNodeViewsGray2 as Dynamic)
    if (
      resolveEditorChipsAndNodeViewsGrayResult.test(
        editorChipsAndNodeViewsGray,
      ) &&
      !items.includes(resolveEditorChipsAndNodeViewsGrayResult2)
    )
      return resolveEditorChipsAndNodeViewsGrayResult2;
  for (let resolveEditorChipsAndNodeViewsGrayResult of editorExtensionsGraySkyMineralOliveValues as Dynamic)
    if (
      resolveEditorChipsAndNodeViewsGrayResult !== `gray` &&
      !items.includes(resolveEditorChipsAndNodeViewsGrayResult)
    )
      return resolveEditorChipsAndNodeViewsGrayResult;
  return editorExtensionsGraySkyMineralOliveValues[
    (items.length + 1) % editorExtensionsGraySkyMineralOliveValues.length
  ];
}

function resolveEditorChipsAndNodeViewsCalpop(
  editorChipsAndNodeViewsCalpop?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorChipsAndNodeViewsDate: Dynamic =
    resolveEditorChipsAndNodeViewsDate(options);
  editorChipsAndNodeViewsCalpop.classList.add(`dd`, `calpop`);
  let editorChipsAndNodeViewsClassName: Dynamic =
    resolveEditorChipsAndNodeViewsClassName(`ls cal`);
  let collectEditorChipsAndNodeViewsFocusVisible2: Dynamic =
    collectEditorChipsAndNodeViewsFocusVisible(
      editorChipsAndNodeViewsDate.date,
      context,
    );
  editorChipsAndNodeViewsClassName.append(
    collectEditorChipsAndNodeViewsFocusVisible2.root,
  );
  editorChipsAndNodeViewsCalpop.append(editorChipsAndNodeViewsClassName);
  return collectEditorChipsAndNodeViewsFocusVisible2;
}

function updateEditorChipsAndNodeViewsDom(
  { dom: dom, on: on2, popover: popover, editor: editor }: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  resolveEditorChipsAndNodeViewsSpan(
    dom,
    resolveEditorChipsAndNodeViewsValue2(`calendar`, 16),
  );
  resolveEditorChipsAndNodeViewsSpan2(
    dom,
    resolveEditorChipsAndNodeViewsDate2(options),
  );
  let helloDImport2: Dynamic = (
    updateEditorChipsAndNodeViewsDom3: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorChipsAndNodeViewsWeakMapEntry: Dynamic =
      editorChipsAndNodeViewsWeakMap.get(dom);
    if (editorChipsAndNodeViewsWeakMapEntry) {
      editorChipsAndNodeViewsWeakMapEntry();
      return false;
    }
    let enabled = false;
    let { pop: popover2, close: popover3 }: Dynamic = popover(``, {
      bare: true,
      anchorToggle: true,
      keyboardHome: (..._extraArguments: unknown[]) => enabled,
      onClose: (..._extraArguments: unknown[]): undefined => {
        if (editorChipsAndNodeViewsWeakMap.get(dom) === popover3) {
          editorChipsAndNodeViewsWeakMap.delete(dom);
        }
        if (editorChipsAndNodeViewsWeakMap7.get(dom) === focusDay) {
          editorChipsAndNodeViewsWeakMap7.delete(dom);
        }
      },
    });
    editorChipsAndNodeViewsWeakMap.set(dom, popover3);
    let editorChipsAndNodeViewsCalpop: Dynamic =
      resolveEditorChipsAndNodeViewsCalpop(popover2, options, {
        pick: (
          updateEditorChipsAndNodeViewsDom4?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          context(updateEditorChipsAndNodeViewsDom4);
          popover3(options2);
        },
        leave: (..._extraArguments: unknown[]): Dynamic => popover3(`key`),
        byKey: (..._extraArguments: unknown[]) => enabled,
      });
    let focusDay: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let focusDay2: Dynamic = editorChipsAndNodeViewsCalpop.focusDay();
      if (focusDay2) {
        enabled = true;
      }
      return focusDay2;
    };
    editorChipsAndNodeViewsWeakMap7.set(dom, focusDay);
    return updateEditorChipsAndNodeViewsDom3 ? focusDay() : true;
  };
  on2(
    dom,
    `click`,
    (
      updateEditorChipsAndNodeViewsDom3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void helloDImport2(
        resolveEditorChipsAndNodeViewsButton2(
          updateEditorChipsAndNodeViewsDom3,
        ),
      ),
  );
  if (
    EditorChipsAndNodeViewsState8 !== null &&
    Date.parse(resolveEditorExtensionsValue12().now()) -
      EditorChipsAndNodeViewsState8 <
      1e3
  ) {
    EditorChipsAndNodeViewsState8 = null;
    resolveEditorExtensionsValue12().schedule(
      (..._extraArguments: unknown[]): undefined => void helloDImport2(),
      0,
    );
  } else {
    EditorChipsAndNodeViewsState8 = null;
  }
  let record2: Dynamic = {
    open: (..._extraArguments: unknown[]): Dynamic => {
      let editorChipsAndNodeViewsWeakMap7Entry: Dynamic =
        editorChipsAndNodeViewsWeakMap7.get(dom);
      return editorChipsAndNodeViewsWeakMap7Entry
        ? editorChipsAndNodeViewsWeakMap7Entry()
        : editorChipsAndNodeViewsWeakMap.get(dom) || !editor.isEditable
          ? false
          : helloDImport2(true);
    },
    canOpen: (..._extraArguments: unknown[]): Dynamic => editor.isEditable,
  };
  editorChipsAndNodeViewsWeakMap6.set(dom, record2);
  return (..._extraArguments: unknown[]): undefined => {
    if (editorChipsAndNodeViewsWeakMap6.get(dom) === record2) {
      editorChipsAndNodeViewsWeakMap6.delete(dom);
    }
  };
}

function resolveEditorChipsAndNodeViewsDom(
  { dom: dom, on: on2, editor: editor }: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  dom.dataset.checked = String(options);
  let element = document.createElement(`input`);
  element.type = `checkbox`;
  element.checked = options;
  element.disabled = !editor.isEditable;
  on2(
    element,
    `change`,
    (..._extraArguments: unknown[]): Dynamic => context(element.checked),
  );
  dom.append(element);
}

var EditorChipsAndNodeViewsCode: Dynamic;

var resolveEditorChipsAndNodeViewsValue2: Dynamic;

var resolveEditorChipsAndNodeViewsCaretDown: Dynamic;

var editorChipsAndNodeViewsState: Dynamic;

var resolveEditorChipsAndNodeViewsWatch: Dynamic;

var editorChipsAndNodeViewsState2: Dynamic;

var resolveEditorChipsAndNodeViewsValue3: Dynamic;

var editorChipsAndNodeViewsState3: Dynamic;

var editorChipsAndNodeViewsMap2: Dynamic;

var editorChipsAndNodeViewsMap3: Dynamic;

var editorChipsAndNodeViewsMap4: Dynamic;

var editorChipsAndNodeViewsMap5: Dynamic;

var EditorChipsAndNodeViewsResolve: Promise<string>;

var resolveEditorChipsAndNodeViewsValue4: Dynamic;

function updateEditorChipsAndNodeViewsDelete(
  updateEditorChipsAndNodeViewsDelete2?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      !resolveEditorAnchorsAndMentionsPlatform(
        updateEditorChipsAndNodeViewsDelete2,
      ) || items.length === 0
    )
  ) {
    editorChipsAndNodeViewsMap2.set(
      updateEditorChipsAndNodeViewsDelete2,
      items,
    );
    editorChipsAndNodeViewsMap3.delete(updateEditorChipsAndNodeViewsDelete2);
  }
}

var getEditorChipsAndNodeViewsValue: Dynamic;

function updateEditorChipsAndNodeViewsResolve(
  updateEditorChipsAndNodeViewsResolve2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorChipsAndNodeViewsMap2Entry: Dynamic =
    editorChipsAndNodeViewsMap2.get(updateEditorChipsAndNodeViewsResolve2);
  if (editorChipsAndNodeViewsMap2Entry !== undefined)
    return Promise.resolve(editorChipsAndNodeViewsMap2Entry);
  if (
    !resolveEditorAnchorsAndMentionsPlatform(
      updateEditorChipsAndNodeViewsResolve2,
    )
  )
    return EditorChipsAndNodeViewsResolve;
  if (!editorChipsAndNodeViewsState3) {
    editorChipsAndNodeViewsMap3.set(
      updateEditorChipsAndNodeViewsResolve2,
      resolveEditorChipsAndNodeViewsValue4(),
    );
    return EditorChipsAndNodeViewsResolve;
  }
  let editorChipsAndNodeViewsMap4Entry: Dynamic =
    editorChipsAndNodeViewsMap4.get(updateEditorChipsAndNodeViewsResolve2);
  if (editorChipsAndNodeViewsMap4Entry) return editorChipsAndNodeViewsMap4Entry;
  let editorChipsAndNodeViewsMap3Entry: Dynamic =
    editorChipsAndNodeViewsMap3.get(updateEditorChipsAndNodeViewsResolve2);
  if (
    editorChipsAndNodeViewsMap3Entry !== undefined &&
    resolveEditorChipsAndNodeViewsValue4() - editorChipsAndNodeViewsMap3Entry <
      3e4
  )
    return EditorChipsAndNodeViewsResolve;
  let then: Dynamic = new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (editorChipsAndNodeViewsMap5.size === 0) {
        Promise.resolve().then(collectEditorChipsAndNodeViewsClear);
      }
      editorChipsAndNodeViewsMap5.set(
        updateEditorChipsAndNodeViewsResolve2,
        resolve,
      );
    },
  ).then(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      editorChipsAndNodeViewsMap4.delete(updateEditorChipsAndNodeViewsResolve2),
      result
        ? updateEditorChipsAndNodeViewsDelete(
            updateEditorChipsAndNodeViewsResolve2,
            result,
          )
        : result === `` &&
          !editorChipsAndNodeViewsMap2.has(
            updateEditorChipsAndNodeViewsResolve2,
          ) &&
          editorChipsAndNodeViewsMap3.set(
            updateEditorChipsAndNodeViewsResolve2,
            resolveEditorChipsAndNodeViewsValue4(),
          ),
      editorChipsAndNodeViewsMap2.get(updateEditorChipsAndNodeViewsResolve2) ??
        ``
    ),
  );
  editorChipsAndNodeViewsMap4.set(updateEditorChipsAndNodeViewsResolve2, then);
  return then;
}

var editorChipsAndNodeViewsSet2: Dynamic;

function clearEditorChipsAndNodeViewsDelete(
  clearEditorChipsAndNodeViewsDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  editorChipsAndNodeViewsSet2.add(clearEditorChipsAndNodeViewsDelete2);
  return (..._extraArguments: unknown[]): undefined =>
    void editorChipsAndNodeViewsSet2.delete(
      clearEditorChipsAndNodeViewsDelete2,
    );
}

function collectEditorChipsAndNodeViewsClear(
  ..._extraArguments: unknown[]
): undefined {
  let editorChipsAndNodeViewsState32: Dynamic = editorChipsAndNodeViewsState3;
  let items: Dynamic = [...editorChipsAndNodeViewsMap5];
  editorChipsAndNodeViewsMap5.clear();
  for (let count: Dynamic = 0; count < items.length; count += 50) {
    let itemsSlice: Dynamic = items.slice(count, count + 50);
    let mappedItemsSlice: Dynamic = itemsSlice.map(
      ([itemsSlice2]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        itemsSlice2,
    );
    Promise.resolve()
      .then(
        (..._extraArguments: unknown[]): Dynamic =>
          editorChipsAndNodeViewsState32
            ? editorChipsAndNodeViewsState32(mappedItemsSlice)
            : {},
      )
      .then(
        (result?: unknown, ..._extraArguments: unknown[]) =>
          result && typeof result == `object` ? result : {},
        (..._extraArguments: unknown[]): Dynamic => ({}),
      )
      .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        for (let [
          collectEditorChipsAndNodeViewsClearResult,
          collectEditorChipsAndNodeViewsClearResult2,
        ] of itemsSlice as Dynamic) {
          let resultItem: Dynamic = Object.hasOwn(
            result,
            collectEditorChipsAndNodeViewsClearResult,
          )
            ? result[collectEditorChipsAndNodeViewsClearResult]
            : undefined;
          collectEditorChipsAndNodeViewsClearResult2(
            typeof resultItem == `string` ? resultItem : undefined,
          );
        }
      });
  }
}

var editorChipsAndNodeViewsState4: Dynamic;

var editorChipsAndNodeViewsMap6: Dynamic;

var resolveEditorChipsAndNodeViewsValue5: Dynamic;

var updateEditorChipsAndNodeViewsKind: Dynamic;

var editorChipsAndNodeViewsState5: Dynamic;

var editorChipsAndNodeViewsState6: Dynamic;

var resolveEditorChipsAndNodeViewsValue6: Dynamic;

var EditorChipsAndNodeViewsState6: Dynamic;

var resolveEditorChipsAndNodeViewsValue7: Dynamic;

var EditorChipsAndNodeViewsState7: Dynamic;

var resolveEditorChipsAndNodeViewsValue8: Dynamic;

var EditorChipsAndNodeViewsState8: Dynamic;

var editorChipsAndNodeViewsMap7: Dynamic;

var editorChipsAndNodeViewsMap8: Dynamic;

function updateEditorChipsAndNodeViewsRestricted(
  updateEditorChipsAndNodeViewsRestricted2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let updateEditorChipsAndNodeViewsRestricted3: Dynamic =
    updateEditorChipsAndNodeViewsRestricted2;
  let editorChipsAndNodeViewsMap7Entry: Dynamic =
    editorChipsAndNodeViewsMap7.get(updateEditorChipsAndNodeViewsRestricted3);
  if (editorChipsAndNodeViewsMap7Entry) return editorChipsAndNodeViewsMap7Entry;
  let result: Dynamic = (
    editorChipsAndNodeViewsState5
      ? editorChipsAndNodeViewsState5(updateEditorChipsAndNodeViewsRestricted2)
      : Promise.resolve(null)
  ).catch((..._extraArguments: unknown[]) => null);
  editorChipsAndNodeViewsMap7.set(
    updateEditorChipsAndNodeViewsRestricted3,
    result,
  );
  result.then((result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (result2 === null) {
      editorChipsAndNodeViewsMap7.delete(
        updateEditorChipsAndNodeViewsRestricted3,
      );
    } else {
      if (
        editorChipsAndNodeViewsMap7.get(
          updateEditorChipsAndNodeViewsRestricted3,
        ) === result &&
        !(`restricted` in result2) &&
        typeof result2.label == `string` &&
        result2.label.length > 0
      ) {
        editorChipsAndNodeViewsMap8.set(
          updateEditorChipsAndNodeViewsRestricted3,
          result2.label,
        );
      }
    }
  });
  return result;
}

var getEditorChipsAndNodeViewsValue2: Dynamic;

var editorChipsAndNodeViewsMap9: Dynamic;

var editorChipsAndNodeViewsSet3: Dynamic;

var editorChipsAndNodeViewsValue_1: boolean;

var editorChipsAndNodeViewsSet4: Dynamic;

var resolveEditorChipsAndNodeViewsSize: Dynamic;

var EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable: string;

function resolveEditorChipsAndNodeViewsFile(
  editorChipsAndNodeViewsFile?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionNoun: Dynamic =
    resolveCommentsActionsAndSelectionNoun(editorChipsAndNodeViewsFile);
  return commentsActionsAndSelectionNoun === null ||
    commentsActionsAndSelectionNoun.noun !== `file` ||
    (commentsActionsAndSelectionNoun.container !== undefined &&
      commentsActionsAndSelectionNoun.container !==
        EditorChipsAndNodeViewsState7)
    ? null
    : commentsActionsAndSelectionNoun.id;
}

function getEditorChipsAndNodeViewsValue3(
  editorChipsAndNodeViewsValue3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorChipsAndNodeViewsFile: Dynamic = resolveEditorChipsAndNodeViewsFile(
    editorChipsAndNodeViewsValue3,
  );
  return editorChipsAndNodeViewsFile === null
    ? undefined
    : editorChipsAndNodeViewsMap9.get(editorChipsAndNodeViewsFile);
}

function collectEditorChipsAndNodeViewsXDisplay(
  collectEditorChipsAndNodeViewsXDisplay2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectEditorChipsAndNodeViewsXDisplayItem: Dynamic =
    collectEditorChipsAndNodeViewsXDisplay2[`x-display`] ?? {};
  return collectEditorChipsAndNodeViewsXDisplay2.enum.map(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveEditorChipsAndNodeViewsNeutral(
        result,
        collectEditorChipsAndNodeViewsXDisplayItem[result]?.color,
      ),
  );
}

var resolveEditorChipsAndNodeViewsClassName: Dynamic;

var resolveEditorChipsAndNodeViewsButton3: Dynamic;

var resolveEditorChipsAndNodeViewsSpan4: Dynamic;

var editorChipsAndNodeViewsWeakMap: Dynamic;

function collectEditorChipsAndNodeViewsOptions(
  collectEditorChipsAndNodeViewsOptions2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let items: Dynamic = [];
  collectEditorChipsAndNodeViewsOptions2.state.doc.descendants(
    (
      collectEditorChipsAndNodeViewsOptions3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (collectEditorChipsAndNodeViewsOptions3.type.name !== `chipDropdown`)
        return;
      let options: Dynamic = collectEditorExtensionsAuto(
        collectEditorChipsAndNodeViewsOptions3.attrs?.options,
      );
      if (!options.length) return;
      let stringify = JSON.stringify(
        options.map(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
            option.l,
            option.c,
          ],
        ),
      );
      if (!uniqueItems.has(stringify)) {
        uniqueItems.add(stringify);
        items.push({
          name:
            typeof collectEditorChipsAndNodeViewsOptions3.attrs?.name ==
            `string`
              ? collectEditorChipsAndNodeViewsOptions3.attrs.name
              : ``,
          options: options,
        });
      }
    },
  );
  return items;
}

var editorChipsAndNodeViewsValue02: number;

var resolveEditorChipsAndNodeViewsValue9: Dynamic;

function updateEditorChipsAndNodeViewsDom2(
  updateEditorChipsAndNodeViewsDom22?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let {
    dom: updateEditorChipsAndNodeViewsDom23,
    attrs: updateEditorChipsAndNodeViewsDom24,
    setAttrs: updateEditorChipsAndNodeViewsDom25,
    editor: updateEditorChipsAndNodeViewsDom26,
    popover: updateEditorChipsAndNodeViewsDom27,
  }: Dynamic = updateEditorChipsAndNodeViewsDom22;
  if (!updateEditorChipsAndNodeViewsDom26.isEditable) return;
  let enabled = !!options;
  let options2: Dynamic = options ?? {
    name:
      typeof updateEditorChipsAndNodeViewsDom24.name == `string`
        ? updateEditorChipsAndNodeViewsDom24.name
        : ``,
    options: collectEditorExtensionsAuto(
      updateEditorChipsAndNodeViewsDom24.options,
    ),
    value:
      typeof updateEditorChipsAndNodeViewsDom24.value == `string`
        ? updateEditorChipsAndNodeViewsDom24.value
        : null,
  };
  options2.value =
    resolveEditorExtensionsFind(options2.options, options2.value)?.id ?? null;
  let {
    pop: updateEditorChipsAndNodeViewsDom28,
    close: updateEditorChipsAndNodeViewsDom29,
  }: Dynamic = updateEditorChipsAndNodeViewsDom27(``, {
    bare: true,
    cls: `dd`,
    anchorToggle: true,
    onClose: (..._extraArguments: unknown[]): undefined => {
      delete updateEditorChipsAndNodeViewsDom23.dataset.open;
      editorChipsAndNodeViewsWeakMap.delete(updateEditorChipsAndNodeViewsDom23);
    },
  });
  updateEditorChipsAndNodeViewsDom23.dataset.open = `true`;
  editorChipsAndNodeViewsWeakMap.set(
    updateEditorChipsAndNodeViewsDom23,
    updateEditorChipsAndNodeViewsDom29,
  );
  let slice: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    updateEditorChipsAndNodeViewsDom25({
      typeRef: null,
      name: options2.name.slice(0, 80),
      options: resolveEditorExtensionsValue15(options2.options),
      value: options2.value,
    });
  let matchesCondition =
    typeof updateEditorChipsAndNodeViewsDom24.options == `string` &&
    updateEditorChipsAndNodeViewsDom24.options ===
      resolveEditorExtensionsValue15(options2.options);
  let updateEditorChipsAndNodeViewsDom210: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    enabled || !matchesCondition
      ? slice()
      : updateEditorChipsAndNodeViewsDom25({
          value: options2.value,
        });
  let updateEditorChipsAndNodeViewsDom2Handler: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options2.options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => option.c,
    );
  let updateEditorChipsAndNodeViewsDom2Result: Dynamic = null;
  let focus = (..._extraArguments: unknown[]): undefined => {
    updateEditorChipsAndNodeViewsDom28.textContent = ``;
    let editorChipsAndNodeViewsClassName: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`hd`);
    editorChipsAndNodeViewsClassName.append(
      resolveEditorChipsAndNodeViewsValue2(`search`, 16),
    );
    let element = document.createElement(`input`);
    element.type = `text`;
    element.placeholder = `Find or add an option…`;
    element.autocomplete = `off`;
    editorChipsAndNodeViewsClassName.append(element);
    let editorChipsAndNodeViewsClassName2: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`ls`);
    let updateEditorChipsAndNodeViewsDom211 = (
      updateEditorChipsAndNodeViewsDom212?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      options2.value =
        options2.value === updateEditorChipsAndNodeViewsDom212.id
          ? null
          : updateEditorChipsAndNodeViewsDom212.id;
      updateEditorChipsAndNodeViewsDom210();
      updateEditorChipsAndNodeViewsDom29();
    };
    let slice2 = (..._extraArguments: unknown[]): undefined => {
      let trimmedValueSlice = element.value.trim().slice(0, 80);
      if (!trimmedValueSlice) return;
      let record2: Dynamic = {
        id: resolveEditorExtensionsValue14(),
        l: trimmedValueSlice,
        c: resolveEditorChipsAndNodeViewsGray(
          trimmedValueSlice,
          updateEditorChipsAndNodeViewsDom2Handler(),
        ),
        auto: true,
      };
      options2.options.push(record2);
      options2.value = record2.id;
      slice();
      updateEditorChipsAndNodeViewsDom29();
    };
    let append = (..._extraArguments: unknown[]): undefined => {
      editorChipsAndNodeViewsClassName2.textContent = ``;
      let trimmedValue = element.value.trim();
      let normalizedTrimmedValue = trimmedValue.toLowerCase();
      for (let updateEditorChipsAndNodeViewsDom2Result2 of options2.options as Dynamic) {
        if (
          trimmedValue &&
          !updateEditorChipsAndNodeViewsDom2Result2.l
            .toLowerCase()
            .includes(normalizedTrimmedValue)
        )
          continue;
        let editorChipsAndNodeViewsClassName3: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(
            `row` +
              (updateEditorChipsAndNodeViewsDom2Result2.id === options2.value
                ? ` is-sel`
                : ``),
          );
        editorChipsAndNodeViewsClassName3.append(
          resolveEditorChipsAndNodeViewsSpan4(
            updateEditorChipsAndNodeViewsDom2Result2.c,
          ),
        );
        resolveEditorChipsAndNodeViewsSpan2(
          editorChipsAndNodeViewsClassName3,
          updateEditorChipsAndNodeViewsDom2Result2.l,
          `lbl`,
        );
        if (updateEditorChipsAndNodeViewsDom2Result2.id === options2.value) {
          editorChipsAndNodeViewsClassName3.append(
            resolveEditorChipsAndNodeViewsValue2(`check`, 16),
          );
        }
        editorChipsAndNodeViewsClassName3.addEventListener(
          `mousedown`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.preventDefault();
            updateEditorChipsAndNodeViewsDom211(
              updateEditorChipsAndNodeViewsDom2Result2,
            );
          },
        );
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsClassName3,
        );
      }
      if (
        trimmedValue &&
        !options2.options.some(
          (option?: Dynamic, ..._extraArguments: unknown[]) =>
            option.l.toLowerCase() === normalizedTrimmedValue,
        )
      ) {
        let editorChipsAndNodeViewsButton3: Dynamic =
          resolveEditorChipsAndNodeViewsButton3(`crt`);
        editorChipsAndNodeViewsButton3.append(
          resolveEditorChipsAndNodeViewsValue2(`plus`, 16),
        );
        resolveEditorChipsAndNodeViewsSpan2(
          editorChipsAndNodeViewsButton3,
          `Create`,
          ``,
        );
        let element2 = document.createElement(`span`);
        element2.className = `pv`;
        element2.append(
          resolveEditorChipsAndNodeViewsSpan4(
            resolveEditorChipsAndNodeViewsGray(
              trimmedValue,
              updateEditorChipsAndNodeViewsDom2Handler(),
            ),
          ),
        );
        resolveEditorChipsAndNodeViewsSpan2(element2, trimmedValue, `lbl`);
        editorChipsAndNodeViewsButton3.append(element2);
        editorChipsAndNodeViewsButton3.addEventListener(
          `mousedown`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.preventDefault();
            slice2();
          },
        );
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsButton3,
        );
      }
      if (!trimmedValue && !options2.options.length) {
        let editorChipsAndNodeViewsClassName3: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(`emp`);
        editorChipsAndNodeViewsClassName3.textContent = `No options yet — type to add one.`;
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsClassName3,
        );
        let collectEditorChipsAndNodeViewsOptionsSlice: Dynamic =
          collectEditorChipsAndNodeViewsOptions(
            updateEditorChipsAndNodeViewsDom26,
          ).slice(0, 5);
        if (collectEditorChipsAndNodeViewsOptionsSlice.length) {
          let editorChipsAndNodeViewsClassName4: Dynamic =
            resolveEditorChipsAndNodeViewsClassName(`tplhd`);
          editorChipsAndNodeViewsClassName4.textContent = `Or start from`;
          editorChipsAndNodeViewsClassName2.append(
            editorChipsAndNodeViewsClassName4,
          );
          for (let updateEditorChipsAndNodeViewsDom2Result2 of collectEditorChipsAndNodeViewsOptionsSlice as Dynamic) {
            let editorChipsAndNodeViewsButton3: Dynamic =
              resolveEditorChipsAndNodeViewsButton3(`tplrow`);
            let element2 = document.createElement(`span`);
            element2.className = `dots`;
            for (let updateEditorChipsAndNodeViewsDom2Result3 of updateEditorChipsAndNodeViewsDom2Result2.options.slice(
              0,
              3,
            ) as Dynamic)
              element2.append(
                resolveEditorChipsAndNodeViewsSpan4(
                  updateEditorChipsAndNodeViewsDom2Result3.c,
                ),
              );
            editorChipsAndNodeViewsButton3.append(element2);
            resolveEditorChipsAndNodeViewsSpan2(
              editorChipsAndNodeViewsButton3,
              updateEditorChipsAndNodeViewsDom2Result2.name ||
                updateEditorChipsAndNodeViewsDom2Result2.options
                  .map(
                    (
                      option?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => option.l,
                  )
                  .filter(Boolean)
                  .join(` · `),
              `lbl`,
            );
            editorChipsAndNodeViewsButton3.addEventListener(
              `mousedown`,
              (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                event.preventDefault();
                options2.options =
                  updateEditorChipsAndNodeViewsDom2Result2.options.map(
                    (
                      option?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => ({
                      ...option,
                      id: resolveEditorExtensionsValue14(),
                    }),
                  );
                options2.name ||= updateEditorChipsAndNodeViewsDom2Result2.name;
                slice();
                focus();
              },
            );
            editorChipsAndNodeViewsClassName2.append(
              editorChipsAndNodeViewsButton3,
            );
          }
        }
      }
    };
    element.addEventListener(`input`, append);
    element.addEventListener(
      `keydown`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (event.key !== `Enter`) return;
        let trimmedValue = element.value.trim();
        if (!trimmedValue) return;
        let option: Dynamic = options2.options.find(
          (option2?: Dynamic, ..._extraArguments: unknown[]) =>
            option2.l.toLowerCase() === trimmedValue.toLowerCase(),
        );
        if (option) {
          options2.value = option.id;
          updateEditorChipsAndNodeViewsDom210();
          updateEditorChipsAndNodeViewsDom29();
        } else {
          slice2();
        }
      },
    );
    append();
    updateEditorChipsAndNodeViewsDom28.append(
      editorChipsAndNodeViewsClassName,
      editorChipsAndNodeViewsClassName2,
    );
    if (options2.options.length) {
      let editorChipsAndNodeViewsClassName3: Dynamic =
        resolveEditorChipsAndNodeViewsClassName(`ft`);
      let editorChipsAndNodeViewsButton3: Dynamic =
        resolveEditorChipsAndNodeViewsButton3(`ftbtn`);
      editorChipsAndNodeViewsButton3.append(
        resolveEditorChipsAndNodeViewsValue2(`pencil`, 16),
      );
      resolveEditorChipsAndNodeViewsSpan2(
        editorChipsAndNodeViewsButton3,
        `Edit options`,
        ``,
      );
      editorChipsAndNodeViewsButton3.addEventListener(
        `click`,
        (..._extraArguments: unknown[]): undefined => {
          updateEditorChipsAndNodeViewsDom2Result = null;
          focus2();
        },
      );
      editorChipsAndNodeViewsClassName3.append(editorChipsAndNodeViewsButton3);
      updateEditorChipsAndNodeViewsDom28.append(
        editorChipsAndNodeViewsClassName3,
      );
    }
    element.focus({
      preventScroll: true,
    });
  };
  let focus2 = (..._extraArguments: unknown[]): undefined => {
    updateEditorChipsAndNodeViewsDom28.textContent = ``;
    let editorChipsAndNodeViewsClassName: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`hd2`);
    let editorChipsAndNodeViewsButton3: Dynamic =
      resolveEditorChipsAndNodeViewsButton3(`backbtn`);
    editorChipsAndNodeViewsButton3.setAttribute(`aria-label`, `Back to select`);
    editorChipsAndNodeViewsButton3.append(
      resolveEditorChipsAndNodeViewsValue2(`arrowLeft`, 16),
    );
    editorChipsAndNodeViewsButton3.addEventListener(`click`, focus);
    let element = document.createElement(`input`);
    element.type = `text`;
    element.placeholder = `Type name`;
    element.autocomplete = `off`;
    element.value = options2.name;
    element.addEventListener(
      `input`,
      (..._extraArguments: unknown[]): undefined => {
        options2.name = element.value;
        slice();
      },
    );
    editorChipsAndNodeViewsClassName.append(
      editorChipsAndNodeViewsButton3,
      element,
    );
    let editorChipsAndNodeViewsClassName2: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`ls2`);
    let focus3 = (
      updateEditorChipsAndNodeViewsDom211?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      editorChipsAndNodeViewsClassName2.textContent = ``;
      let updateEditorChipsAndNodeViewsDom2Result2: Dynamic = null;
      for (let updateEditorChipsAndNodeViewsDom2Result3 of options2.options as Dynamic) {
        let editorChipsAndNodeViewsClassName4: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(``);
        let editorChipsAndNodeViewsClassName5: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(`orow`);
        let editorChipsAndNodeViewsButton34: Dynamic =
          resolveEditorChipsAndNodeViewsButton3(`dotbtn`);
        editorChipsAndNodeViewsButton34.dataset.tip = `Change color`;
        editorChipsAndNodeViewsButton34.setAttribute(
          `aria-label`,
          `Change color`,
        );
        let editorChipsAndNodeViewsSpan4: Dynamic =
          resolveEditorChipsAndNodeViewsSpan4(
            updateEditorChipsAndNodeViewsDom2Result3.c,
          );
        editorChipsAndNodeViewsButton34.append(editorChipsAndNodeViewsSpan4);
        editorChipsAndNodeViewsButton34.addEventListener(
          `click`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.stopPropagation();
            updateEditorChipsAndNodeViewsDom2Result =
              updateEditorChipsAndNodeViewsDom2Result ===
              updateEditorChipsAndNodeViewsDom2Result3.id
                ? null
                : updateEditorChipsAndNodeViewsDom2Result3.id;
            focus3();
          },
        );
        let element2 = document.createElement(`input`);
        element2.type = `text`;
        element2.placeholder = `Option name`;
        element2.autocomplete = `off`;
        element2.value = updateEditorChipsAndNodeViewsDom2Result3.l;
        if (
          updateEditorChipsAndNodeViewsDom2Result3.id ===
          updateEditorChipsAndNodeViewsDom211
        ) {
          updateEditorChipsAndNodeViewsDom2Result2 = element2;
        }
        element2.addEventListener(
          `input`,
          (..._extraArguments: unknown[]): undefined => {
            updateEditorChipsAndNodeViewsDom2Result3.l = element2.value.slice(
              0,
              80,
            );
            if (updateEditorChipsAndNodeViewsDom2Result3.auto) {
              let mappedFilteredOptions: Dynamic = options2.options
                .filter(
                  (option?: Dynamic, ..._extraArguments: unknown[]) =>
                    option.id !== updateEditorChipsAndNodeViewsDom2Result3.id,
                )
                .map(
                  (
                    filteredOption?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => filteredOption.c,
                );
              let editorChipsAndNodeViewsGray: Dynamic =
                resolveEditorChipsAndNodeViewsGray(
                  updateEditorChipsAndNodeViewsDom2Result3.l,
                  mappedFilteredOptions,
                );
              if (
                editorChipsAndNodeViewsGray !==
                updateEditorChipsAndNodeViewsDom2Result3.c
              ) {
                updateEditorChipsAndNodeViewsDom2Result3.c =
                  editorChipsAndNodeViewsGray;
                editorChipsAndNodeViewsSpan4.className = `dd-dot dd-c-${editorChipsAndNodeViewsGray}`;
              }
            }
            slice();
          },
        );
        let editorChipsAndNodeViewsButton35: Dynamic =
          resolveEditorChipsAndNodeViewsButton3(`delbtn`);
        editorChipsAndNodeViewsButton35.setAttribute(
          `aria-label`,
          `Delete option`,
        );
        editorChipsAndNodeViewsButton35.append(
          resolveEditorChipsAndNodeViewsValue2(`x`, 14),
        );
        editorChipsAndNodeViewsButton35.addEventListener(
          `click`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.stopPropagation();
            options2.options = options2.options.filter(
              (option?: Dynamic, ..._extraArguments: unknown[]) =>
                option.id !== updateEditorChipsAndNodeViewsDom2Result3.id,
            );
            if (
              options2.value === updateEditorChipsAndNodeViewsDom2Result3.id
            ) {
              options2.value = null;
            }
            if (
              updateEditorChipsAndNodeViewsDom2Result ===
              updateEditorChipsAndNodeViewsDom2Result3.id
            ) {
              updateEditorChipsAndNodeViewsDom2Result = null;
            }
            slice();
            focus3();
          },
        );
        editorChipsAndNodeViewsClassName5.append(
          editorChipsAndNodeViewsButton34,
          element2,
          editorChipsAndNodeViewsButton35,
        );
        editorChipsAndNodeViewsClassName4.append(
          editorChipsAndNodeViewsClassName5,
        );
        if (
          updateEditorChipsAndNodeViewsDom2Result ===
          updateEditorChipsAndNodeViewsDom2Result3.id
        ) {
          let editorChipsAndNodeViewsClassName6: Dynamic =
            resolveEditorChipsAndNodeViewsClassName(`strip`);
          for (let updateEditorChipsAndNodeViewsDom2Result4 of editorExtensionsGraySkyMineralOliveValues as Dynamic) {
            let editorChipsAndNodeViewsButton36: Dynamic =
              resolveEditorChipsAndNodeViewsButton3(
                `swb dd-c-${updateEditorChipsAndNodeViewsDom2Result4}` +
                  (updateEditorChipsAndNodeViewsDom2Result4 ===
                  updateEditorChipsAndNodeViewsDom2Result3.c
                    ? ` is-sel`
                    : ``),
              );
            editorChipsAndNodeViewsButton36.dataset.tip =
              updateEditorChipsAndNodeViewsDom2Result4;
            editorChipsAndNodeViewsButton36.setAttribute(
              `aria-label`,
              updateEditorChipsAndNodeViewsDom2Result4,
            );
            let element3 = document.createElement(`span`);
            element3.className = `dd-dot`;
            editorChipsAndNodeViewsButton36.append(element3);
            editorChipsAndNodeViewsButton36.addEventListener(
              `click`,
              (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                event.stopPropagation();
                updateEditorChipsAndNodeViewsDom2Result3.c =
                  updateEditorChipsAndNodeViewsDom2Result4;
                updateEditorChipsAndNodeViewsDom2Result3.auto = false;
                updateEditorChipsAndNodeViewsDom2Result = null;
                slice();
                focus3();
              },
            );
            editorChipsAndNodeViewsClassName6.append(
              editorChipsAndNodeViewsButton36,
            );
          }
          editorChipsAndNodeViewsClassName4.append(
            editorChipsAndNodeViewsClassName6,
          );
        }
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsClassName4,
        );
      }
      let editorChipsAndNodeViewsButton33: Dynamic =
        resolveEditorChipsAndNodeViewsButton3(`addbtn`);
      editorChipsAndNodeViewsButton33.append(
        resolveEditorChipsAndNodeViewsValue2(`plus`, 16),
      );
      resolveEditorChipsAndNodeViewsSpan2(
        editorChipsAndNodeViewsButton33,
        `Add option`,
        ``,
      );
      editorChipsAndNodeViewsButton33.addEventListener(
        `click`,
        (..._extraArguments: unknown[]): undefined => {
          let record2: Dynamic = {
            id: resolveEditorExtensionsValue14(),
            l: ``,
            c: resolveEditorChipsAndNodeViewsGray(
              ``,
              updateEditorChipsAndNodeViewsDom2Handler(),
            ),
            auto: true,
          };
          options2.options.push(record2);
          slice();
          focus3(record2.id);
        },
      );
      editorChipsAndNodeViewsClassName2.append(editorChipsAndNodeViewsButton33);
      updateEditorChipsAndNodeViewsDom2Result2?.focus({
        preventScroll: true,
      });
    };
    focus3();
    let editorChipsAndNodeViewsClassName3: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`ft2`);
    let editorChipsAndNodeViewsButton32: Dynamic =
      resolveEditorChipsAndNodeViewsButton3(`donebtn`);
    editorChipsAndNodeViewsButton32.textContent = `Done`;
    editorChipsAndNodeViewsButton32.addEventListener(`click`, focus);
    editorChipsAndNodeViewsClassName3.append(editorChipsAndNodeViewsButton32);
    updateEditorChipsAndNodeViewsDom28.append(
      editorChipsAndNodeViewsClassName,
      editorChipsAndNodeViewsClassName2,
      editorChipsAndNodeViewsClassName3,
    );
    element.focus({
      preventScroll: true,
    });
  };
  focus();
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorChipsAndNodeViews1Step1(): void {
  RegExp(
    `<[a-zA-Z](?:[^<>"']|"[^"]*"|'[^']*')*\\s${EditorChipsAndNodeViewsDataLfileContainer}="([^"]*)"`,
  );
  (EditorChipsAndNodeViewsDataLfileEnums = `data-lfile-enums`);
  (editorChipsAndNodeViewsValue80 = 80);
  (editorChipsAndNodeViewsValue64 = 64);
  (EditorChipsAndNodeViewsState = RegExp(
    `[\\u0000-\\u001F\\u007F-\\u009F\\u00AD\\u2028\\u2029\\u202A-\\u202E\\u2066-\\u2069${DataModelSchemasMessage}]`,
  ));
  (editorChipsAndNodeViewsValue120 = 120);
  (resolveEditorChipsAndNodeViewsIncludes = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    items !== `` &&
    !items.includes(`|`) &&
    !EditorChipsAndNodeViewsState.test(items) &&
    Array.from<Dynamic>(items).length <= editorChipsAndNodeViewsValue80 &&
    items.length <= editorChipsAndNodeViewsValue120);
  (resolveEditorChipsAndNodeViewsDataEnum = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let attribute: Dynamic = element.getAttribute(`data-enum`);
    if (attribute == null) return null;
    try {
      let parse: Dynamic = JSON.parse(attribute);
      return typeof parse == `string` && parse !== `` ? parse : null;
    } catch {
      return attribute === `` ? null : attribute;
    }
  });
  (editorChipsAndNodeViewsSet = new (Set as Dynamic)([
    `bulletList`,
    `orderedList`,
  ]));
  (resolveEditorChipsAndNodeViewsChildCount = (
      editorChipsAndNodeViewsChildCount?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      editorChipsAndNodeViewsChildCount2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      editorChipsAndNodeViewsChildCount2.childCount > 0 &&
      editorChipsAndNodeViewsChildCount2.firstChild.type ===
        editorChipsAndNodeViewsChildCount);
  Extension.create({
    name: `listJoin`,
    addProseMirrorPlugins(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let editor: Dynamic = this.editor;
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`listJoin`),
          appendTransaction(
            callback?: Dynamic,
            options?: unknown,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic {
            if (
              !editor.isEditable ||
              !callback.some(
                (callback2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  callback2.docChanged,
              )
            )
              return null;
            let tr2: Dynamic = context.tr;
            let enabled = false;
            for (let index = 0; index < 64; index++) {
              let localResult: Dynamic = -1;
              tr2.doc.descendants(
                (
                  callback2?: Dynamic,
                  options2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => {
                  if (localResult >= 0) return false;
                  if (!editorChipsAndNodeViewsSet.has(callback2.type.name))
                    return true;
                  let nodeBefore: Dynamic = tr2.doc.resolve(options2).nodeBefore;
                  return nodeBefore &&
                    nodeBefore.type === callback2.type &&
                    canJoin(tr2.doc, options2)
                    ? ((localResult = options2), false)
                    : true;
                },
              );
              if (localResult < 0) break;
              tr2.join(localResult);
              enabled = true;
            }
            return enabled ? tr2 : null;
          },
        }),
      ];
    },
  });
  (EditorChipsAndNodeViewsState2 = {
    on: false,
  });
  (resolveEditorChipsAndNodeViewsIsTrusted = (
    editorChipsAndNodeViewsIsTrusted?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorChipsAndNodeViewsIsTrusted.isTrusted ||
    (typeof __LFILE_RUNTIME_BUNDLE__ === "undefined" &&
      EditorChipsAndNodeViewsState2.on));
  (resolveEditorChipsAndNodeViewsButton = (
    editorChipsAndNodeViewsButton?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorChipsAndNodeViewsButton.button === 0 &&
    editorChipsAndNodeViewsButton.detail === 0);
  (resolveEditorChipsAndNodeViewsButton2 = (
    editorChipsAndNodeViewsButton2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorChipsAndNodeViewsButton2.button === 0 &&
    editorChipsAndNodeViewsButton2.detail === 0 &&
    resolveEditorChipsAndNodeViewsIsTrusted(editorChipsAndNodeViewsButton2));
  (editorChipsAndNodeViewsMap = new (Map as Dynamic)());
  (updateEditorChipsAndNodeViewsTimeZone = (
    updateEditorChipsAndNodeViewsTimeZone2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorChipsAndNodeViewsMapEntry: Dynamic = editorChipsAndNodeViewsMap.get(
      updateEditorChipsAndNodeViewsTimeZone2,
    );
    if (editorChipsAndNodeViewsMapEntry === undefined) {
      editorChipsAndNodeViewsMapEntry = new (Intl.DateTimeFormat as Dynamic)(
        updateEditorChipsAndNodeViewsTimeZone2,
        {
          timeZone: `UTC`,
          month: `short`,
          day: `numeric`,
          year: `numeric`,
        },
      );
      editorChipsAndNodeViewsMap.set(
        updateEditorChipsAndNodeViewsTimeZone2,
        editorChipsAndNodeViewsMapEntry,
      );
    }
    return editorChipsAndNodeViewsMapEntry;
  });
  (resolveEditorChipsAndNodeViewsPickDate = (
    editorChipsAndNodeViewsPickDate?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!editorChipsAndNodeViewsPickDate) return `Pick date`;
    let date2 = new Date(`${editorChipsAndNodeViewsPickDate}T00:00:00Z`);
    return Number.isNaN(+date2) || date2.getUTCFullYear() < 1
      ? editorChipsAndNodeViewsPickDate
      : updateEditorChipsAndNodeViewsTimeZone(
          resolveEditorExtensionsValue12().locale,
        ).format(date2);
  });
  (resolveEditorChipsAndNodeViewsDate = (
    editorChipsAndNodeViewsDate?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2})(?:\[([^\]]+)\])?)?$/.exec(
      editorChipsAndNodeViewsDate,
    );
    return match
      ? {
          date: match[1],
          time: match[2],
          zone: match[3],
        }
      : {
          date: editorChipsAndNodeViewsDate.slice(0, 10),
        };
  });
  (resolveEditorChipsAndNodeViewsTimeZone = (
    editorChipsAndNodeViewsTimeZone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let date2 = new Date(`2000-01-01T${editorChipsAndNodeViewsTimeZone}:00Z`);
    return Number.isNaN(+date2)
      ? editorChipsAndNodeViewsTimeZone
      : date2.toLocaleTimeString(resolveEditorExtensionsValue12().locale, {
          timeZone: `UTC`,
          hour: `numeric`,
          minute: `2-digit`,
        });
  });
  (resolveEditorChipsAndNodeViewsTimeZone2 = (
    timeZone?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return (
        new (Intl.DateTimeFormat as Dynamic)(`en-US`, {
          timeZone: timeZone,
          timeZoneName: `short`,
        })
          .formatToParts(new Date(`${options}T12:00:00Z`))
          .find(
            (toPart?: Dynamic, ..._extraArguments: unknown[]) =>
              toPart.type === `timeZoneName`,
          )?.value ?? null
      );
    } catch {
      return null;
    }
  });
  (resolveEditorChipsAndNodeViewsDate2 = (
    editorChipsAndNodeViewsDate2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!editorChipsAndNodeViewsDate2)
      return resolveEditorChipsAndNodeViewsPickDate(``);
    let {
      date: editorChipsAndNodeViewsDate,
      time: editorChipsAndNodeViewsDate3,
      zone: editorChipsAndNodeViewsDate4,
    }: Dynamic = resolveEditorChipsAndNodeViewsDate(editorChipsAndNodeViewsDate2);
    let editorChipsAndNodeViewsPickDate: Dynamic =
      resolveEditorChipsAndNodeViewsPickDate(editorChipsAndNodeViewsDate);
    if (editorChipsAndNodeViewsDate3 === undefined)
      return editorChipsAndNodeViewsPickDate;
    let editorChipsAndNodeViewsTimeZone: Dynamic =
      resolveEditorChipsAndNodeViewsTimeZone(editorChipsAndNodeViewsDate3);
    if (editorChipsAndNodeViewsDate4 === undefined)
      return `${editorChipsAndNodeViewsPickDate} ${editorChipsAndNodeViewsTimeZone}`;
    let editorChipsAndNodeViewsTimeZone2: Dynamic =
      resolveEditorChipsAndNodeViewsTimeZone2(
        editorChipsAndNodeViewsDate4,
        editorChipsAndNodeViewsDate,
      );
    return editorChipsAndNodeViewsTimeZone2 === null
      ? `${editorChipsAndNodeViewsPickDate} ${editorChipsAndNodeViewsTimeZone}`
      : `${editorChipsAndNodeViewsPickDate} ${editorChipsAndNodeViewsTimeZone} ${editorChipsAndNodeViewsTimeZone2}`;
  });
  (resolveEditorChipsAndNodeViewsTimeZone3 = (
    ..._extraArguments: unknown[]
  ) => {
    let editorExtensionsValue12: Dynamic = resolveEditorExtensionsValue12();
    let date2 = new Date(editorExtensionsValue12.now());
    if (!editorExtensionsValue12.timeZone) return date2;
    let toParts: Dynamic = new (Intl.DateTimeFormat as Dynamic)(`en-CA`, {
      timeZone: editorExtensionsValue12.timeZone,
      year: `numeric`,
      month: `2-digit`,
      day: `2-digit`,
    }).formatToParts(date2);
    let Number2: Dynamic = (
      editorChipsAndNodeViewsTimeZone3?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Number(
        toParts.find(
          (toPart?: Dynamic, ..._extraArguments: unknown[]) =>
            toPart.type === editorChipsAndNodeViewsTimeZone3,
        )?.value,
      );
    return new Date(Number2(`year`), Number2(`month`) - 1, Number2(`day`), 12);
  });
  (resolveEditorChipsAndNodeViewsPadStart = (
    editorChipsAndNodeViewsPadStart?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorChipsAndNodeViewsPadStart2: Dynamic =
      editorChipsAndNodeViewsPadStart ??
      resolveEditorChipsAndNodeViewsTimeZone3();
    let padStart: Dynamic = (
      editorChipsAndNodeViewsPadStart3?: Dynamic,
      ..._extraArguments: unknown[]
    ) => String(editorChipsAndNodeViewsPadStart3).padStart(2, `0`);
    return `${editorChipsAndNodeViewsPadStart2.getFullYear()}-${padStart(editorChipsAndNodeViewsPadStart2.getMonth() + 1)}-${padStart(editorChipsAndNodeViewsPadStart2.getDate())}`;
  });
  (resolveEditorChipsAndNodeViewsSetDate = (
    editorChipsAndNodeViewsSetDate?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let date2 = new Date(editorChipsAndNodeViewsSetDate);
    date2.setDate(date2.getDate() + options);
    return date2;
  });
  (EditorChipsAndNodeViewsState3 = null);
  (resolveEditorChipsAndNodeViewsTimeZone4 = (
    editorChipsAndNodeViewsTimeZone4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let locale: Dynamic = editorChipsAndNodeViewsTimeZone4 ?? ``;
    if (EditorChipsAndNodeViewsState3?.locale === locale)
      return EditorChipsAndNodeViewsState3.labels;
    let dateTimeFormat: Dynamic = new (Intl.DateTimeFormat as Dynamic)(
      editorChipsAndNodeViewsTimeZone4,
      {
        timeZone: `UTC`,
        weekday: `short`,
      },
    );
    let labels: Dynamic = Array.from<Dynamic, Dynamic>(
      {
        length: 7,
      },
      (
        editorChipsAndNodeViewsTimeZone42?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dateTimeFormat.format(new Date(Date.UTC(1970, 0, 4 + options))),
    );
    EditorChipsAndNodeViewsState3 = {
      locale: locale,
      labels: labels,
    };
    return labels;
  });
  (resolveEditorChipsAndNodeViewsValue = (
    editorChipsAndNodeViewsValue?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${editorChipsAndNodeViewsValue}, ${options}, ${context}`);
  (EditorChipsAndNodeViewsState4 = null);
  (resolveEditorChipsAndNodeViewsLocale = (
    editorChipsAndNodeViewsLocale?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let locale: Dynamic = resolveEditorExtensionsValue12().locale;
    let locale2: Dynamic = locale ?? ``;
    if (EditorChipsAndNodeViewsState4?.locale !== locale2) {
      EditorChipsAndNodeViewsState4 = {
        locale: locale2,
        fmt: new (Intl.DateTimeFormat as Dynamic)(locale, {
          timeZone: `UTC`,
          month: `long`,
          year: `numeric`,
        }),
      };
    }
    return EditorChipsAndNodeViewsState4.fmt.format(
      new Date(Date.UTC(editorChipsAndNodeViewsLocale, options, 1)),
    );
  });
  (EditorChipsAndNodeViewsState5 = null);
  (resolveEditorChipsAndNodeViewsLocale2 = (
    editorChipsAndNodeViewsLocale2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let locale: Dynamic = resolveEditorExtensionsValue12().locale;
    let locale2: Dynamic = locale ?? ``;
    if (EditorChipsAndNodeViewsState5?.locale !== locale2) {
      EditorChipsAndNodeViewsState5 = {
        locale: locale2,
        fmt: new (Intl.DateTimeFormat as Dynamic)(locale, {
          timeZone: `UTC`,
          weekday: `long`,
        }),
      };
    }
    return resolveEditorChipsAndNodeViewsValue(
      options,
      EditorChipsAndNodeViewsState5.fmt.format(
        new Date(
          Date.UTC(
            editorChipsAndNodeViewsLocale2.getFullYear(),
            editorChipsAndNodeViewsLocale2.getMonth(),
            editorChipsAndNodeViewsLocale2.getDate(),
          ),
        ),
      ),
      resolveEditorChipsAndNodeViewsLocale(
        editorChipsAndNodeViewsLocale2.getFullYear(),
        editorChipsAndNodeViewsLocale2.getMonth(),
      ),
    );
  });
  (editorChipsAndNodeViewsValue0 = 0);
  (isEditorChipsAndNodeViewsKeys = (
    editorChipsAndNodeViewsKeys?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorChipsAndNodeViewsKeysKeys = Object.keys(
      editorChipsAndNodeViewsKeys,
    );
    if (editorChipsAndNodeViewsKeysKeys.length !== Object.keys(options).length)
      return false;
    for (let isEditorChipsAndNodeViewsKeysResult of editorChipsAndNodeViewsKeysKeys as Dynamic)
      if (
        editorChipsAndNodeViewsKeys[isEditorChipsAndNodeViewsKeysResult] !==
        options[isEditorChipsAndNodeViewsKeysResult]
      )
        return false;
    return true;
  });
  (resolveEditorChipsAndNodeViewsSpan = (
    editorChipsAndNodeViewsSpan?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let element = document.createElement(`span`);
    element.className = `i`;
    element.append(options);
    editorChipsAndNodeViewsSpan.append(element);
  });
  (resolveEditorChipsAndNodeViewsSpan2 = (
    editorChipsAndNodeViewsSpan2?: Dynamic,
    options?: Dynamic,
    context: Dynamic = `t`,
    ..._extraArguments: unknown[]
  ) => {
    let element = document.createElement(`span`);
    element.className = context;
    element.textContent = resolveEditorExtensionsReplace(options);
    editorChipsAndNodeViewsSpan2.append(element);
    return element;
  });
  (EditorChipsAndNodeViewsNeutral = {
    neutral: `var(--cds-text-muted, #8a8882)`,
    accent: `var(--cds-fill-accent, #2a78d6)`,
    success: `var(--cds-fill-success, #009300)`,
    warning: `var(--cds-fill-warning, #fab219)`,
    danger: `var(--cds-fill-danger, #d03b3b)`,
    pro: `var(--cds-fill-pro, #7161e0)`,
  });
  (resolveEditorChipsAndNodeViewsSpan3 = (
    editorChipsAndNodeViewsSpan3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element: Dynamic = (document as Dynamic).createElement(`span`);
    element.className = `sw`;
    element.style.background =
      EditorChipsAndNodeViewsNeutral[editorChipsAndNodeViewsSpan3] ??
      EditorChipsAndNodeViewsNeutral.neutral;
    return element;
  });
  (EditorChipsAndNodeViewsGray = {
    gray: `neutral`,
    sky: `accent`,
    mineral: `success`,
    olive: `success`,
    pencil: `warning`,
    poppy: `danger`,
    fig: `danger`,
    plum: `pro`,
  });
  (resolveEditorChipsAndNodeViewsNeutral = (
    editorChipsAndNodeViewsNeutral?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let text: Dynamic = String(options ?? `neutral`);
    if (!Object.hasOwn(EditorChipsAndNodeViewsNeutral, text)) {
      text = Object.hasOwn(EditorChipsAndNodeViewsGray, text)
        ? EditorChipsAndNodeViewsGray[text]
        : `neutral`;
    }
    return {
      l: [...String(editorChipsAndNodeViewsNeutral ?? ``)].slice(0, 80).join(``),
      c: text,
    };
  });
  (EditorChipsAndNodeViewsGray2 = [
    [
      /not started|not-started|backlog|todo|to do|icebox|idea|unassigned|none/i,
      `gray`,
    ],
    [/done|complete|completed|shipped|approved|resolved|live|launched/i, `olive`],
    [/progress|doing|active|building|drafting|underway|started/i, `sky`],
    [/blocked|bug|failed|urgent|critical|risk|high/i, `poppy`],
    [/review|pending|waiting|qa|needs input|proposed/i, `plum`],
    [/low|nice to have|someday/i, `mineral`],
    [/medium|normal|planned|next|scheduled/i, `pencil`],
    [/cancelled|canceled|archived|dropped|on hold|paused/i, `fig`],
  ]);
  collectEditorChipsAndNodeViewsInline({
    name: `chipDate`,
    attrs: {
      value: {
        default: ``,
      },
    },
    copyText: (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveEditorChipsAndNodeViewsPickDate(String(callback.value ?? ``)),
    render: (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      updateEditorChipsAndNodeViewsDom(
        callback,
        String(callback.attrs.value ?? ``),
        (callback2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          callback.setAttrs({
            value: callback2,
          }),
      ),
  });
  collectEditorChipsAndNodeViewsInline({
    name: `chipCheckbox`,
    attrs: {
      checked: {
        default: false,
      },
    },
    render: (callback?: Dynamic, ..._extraArguments: unknown[]) =>
      resolveEditorChipsAndNodeViewsDom(
        callback,
        !!callback.attrs.checked,
        (checked?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          callback.setAttrs({
            checked: checked,
          }),
      ),
  });
  (EditorChipsAndNodeViewsCode = {
    code: EditorSelectionAndTablesMaster1610,
    search: EditorChipsAndNodeViewsMaster167,
    check: EditorSelectionAndTablesMaster167,
    plus: EditorSelectionAndTablesMaster16,
    trash: EditorChipsAndNodeViewsMaster169,
    pencil: EditorSelectionAndTablesMaster1612,
    arrowLeft: EditorSelectionAndTablesMaster162,
    x: EditorChipsAndNodeViewsMaster1611,
    info: EditorChipsAndNodeViewsMaster163,
    checkCircle: EditorSelectionAndTablesMaster168,
    warning: EditorChipsAndNodeViewsMaster1610,
    caretLeft: EditorSelectionAndTablesMaster165,
    caretRight: EditorAnchorsAndMentionsMaster16,
    caretDown: EditorSelectionAndTablesMaster164,
    dropdown: EditorSelectionAndTablesMaster1611,
    eye: EditorChipsAndNodeViewsMaster16,
    eyeOff: EditorChipsAndNodeViewsMaster162,
    checklist: EditorSelectionAndTablesMaster169,
    spreadsheet: EditorChipsAndNodeViewsMaster168,
    listBullet: EditorChipsAndNodeViewsMaster165,
    listNumbered: EditorChipsAndNodeViewsMaster166,
    calendar: EditorSelectionAndTablesMaster163,
    chart: EditorSelectionAndTablesMaster166,
    lightning: EditorChipsAndNodeViewsMaster164,
  });
  (resolveEditorChipsAndNodeViewsValue2 = (
    editorChipsAndNodeViewsValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorAnchorsAndMentionsGrid2(
      document,
      EditorChipsAndNodeViewsCode[editorChipsAndNodeViewsValue2],
      options,
    ));
  (resolveEditorChipsAndNodeViewsCaretDown = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorChipsAndNodeViewsValue2: Dynamic =
      resolveEditorChipsAndNodeViewsValue2(`caretDown`, 14);
    editorChipsAndNodeViewsValue2.setAttribute(`class`, `i`);
    return editorChipsAndNodeViewsValue2;
  });
  (resolveEditorChipsAndNodeViewsWatch = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorChipsAndNodeViewsState
      ? {
          watch: editorChipsAndNodeViewsState,
        }
      : undefined);
  (resolveEditorChipsAndNodeViewsValue3 = (
    ..._extraArguments: unknown[]
  ): Dynamic => editorChipsAndNodeViewsState2);
  (editorChipsAndNodeViewsMap2 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsMap3 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsMap4 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsMap5 = new (Map as Dynamic)());
  (EditorChipsAndNodeViewsResolve = Promise.resolve(``));
  (resolveEditorChipsAndNodeViewsValue4 = (
    ..._extraArguments: unknown[]
  ) => {
    let editorExtensionsValue13: Dynamic = resolveEditorExtensionsValue13();
    return editorExtensionsValue13
      ? Date.parse(editorExtensionsValue13.now())
      : NaN;
  });
  (getEditorChipsAndNodeViewsValue = (
    editorChipsAndNodeViewsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorChipsAndNodeViewsMap2.get(editorChipsAndNodeViewsValue) ??
    (editorChipsAndNodeViewsMap3.has(editorChipsAndNodeViewsValue)
      ? null
      : undefined));
  (editorChipsAndNodeViewsSet2 = new (Set as Dynamic)());
  (editorChipsAndNodeViewsMap6 = new (Map as Dynamic)());
  (resolveEditorChipsAndNodeViewsValue5 = (
    editorChipsAndNodeViewsValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => updateEditorChipsAndNodeViewsKind(editorChipsAndNodeViewsValue5));
  (updateEditorChipsAndNodeViewsKind = (
    principal?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let normalizedPrincipal: Dynamic = principal.toLowerCase();
    let editorChipsAndNodeViewsMap6Entry: Dynamic =
      editorChipsAndNodeViewsMap6.get(normalizedPrincipal);
    if (editorChipsAndNodeViewsMap6Entry) return editorChipsAndNodeViewsMap6Entry;
    let result: Dynamic = (
      editorChipsAndNodeViewsState4
        ? editorChipsAndNodeViewsState4(normalizedPrincipal)
        : Promise.resolve(null)
    )
      .then((result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let trimmedLabel: Dynamic = result2?.label?.trim();
        let normalizedEditorHostMention: Dynamic = resolveEditorHostMention({
          kind: `mention`,
          principal: principal,
        }).toLowerCase();
        return trimmedLabel &&
          trimmedLabel.toLowerCase() !== normalizedEditorHostMention
          ? trimmedLabel
          : null;
      })
      .catch((..._extraArguments: unknown[]) => null);
    editorChipsAndNodeViewsMap6.set(normalizedPrincipal, result);
    result.then((result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        result2 === null &&
        editorChipsAndNodeViewsMap6.get(normalizedPrincipal) === result
      ) {
        editorChipsAndNodeViewsMap6.delete(normalizedPrincipal);
      }
    });
    return result;
  });
  (resolveEditorChipsAndNodeViewsValue6 = (
    editorChipsAndNodeViewsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorChipsAndNodeViewsState6?.(editorChipsAndNodeViewsValue6));
  (EditorChipsAndNodeViewsState6 = null);
  (resolveEditorChipsAndNodeViewsValue7 = (
    ..._extraArguments: unknown[]
  ): Dynamic => EditorChipsAndNodeViewsState6);
  (EditorChipsAndNodeViewsState7 = null);
  (resolveEditorChipsAndNodeViewsValue8 = (
    ..._extraArguments: unknown[]
  ): Dynamic => EditorChipsAndNodeViewsState7);
  (EditorChipsAndNodeViewsState8 = null);
  (editorChipsAndNodeViewsMap7 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsMap8 = new (Map as Dynamic)());
  (getEditorChipsAndNodeViewsValue2 = (
    editorChipsAndNodeViewsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorChipsAndNodeViewsMap8.get(editorChipsAndNodeViewsValue2));
  (editorChipsAndNodeViewsMap9 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsSet3 = new (Set as Dynamic)());
  (editorChipsAndNodeViewsValue_1 = false);
  (editorChipsAndNodeViewsSet4 = new (Set as Dynamic)());
  (resolveEditorChipsAndNodeViewsSize = (
    editorChipsAndNodeViewsSize?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorChipsAndNodeViewsValue_1 &&
    editorChipsAndNodeViewsSet3.size > 0 &&
    !editorChipsAndNodeViewsSet3.has(editorChipsAndNodeViewsSize));
  (EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable = `This tab has been deleted or is no longer available.`);
  (resolveEditorChipsAndNodeViewsClassName = (
    editorChipsAndNodeViewsClassName?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let element = document.createElement(`div`);
    if (editorChipsAndNodeViewsClassName) {
      element.className = editorChipsAndNodeViewsClassName;
    }
    return element;
  });
  (resolveEditorChipsAndNodeViewsButton3 = (
    editorChipsAndNodeViewsButton3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let element = document.createElement(`button`);
    element.type = `button`;
    if (editorChipsAndNodeViewsButton3) {
      element.className = editorChipsAndNodeViewsButton3;
    }
    return element;
  });
  (resolveEditorChipsAndNodeViewsSpan4 = (
    editorChipsAndNodeViewsSpan4?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let element = document.createElement(`span`);
    element.className = `dd-dot dd-c-${editorChipsAndNodeViewsSpan4}`;
    return element;
  });
  (editorChipsAndNodeViewsWeakMap = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsValue02 = 0);
  (resolveEditorChipsAndNodeViewsValue9 = (
    ..._extraArguments: unknown[]
  ) => {
    let matchesDifference =
      Date.parse(resolveEditorExtensionsValue12().now()) -
        editorChipsAndNodeViewsValue02 <
      1e3;
    editorChipsAndNodeViewsValue02 = 0;
    return matchesDifference;
  });
}

export {
  EditorChipsAndNodeViewsCode,
  EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable,
  clearEditorChipsAndNodeViewsDelete,
  collectEditorChipsAndNodeViewsInline,
  collectEditorChipsAndNodeViewsXDisplay,
  editorChipsAndNodeViewsMap9,
  editorChipsAndNodeViewsSet3,
  editorChipsAndNodeViewsSet4,
  editorChipsAndNodeViewsState2,
  editorChipsAndNodeViewsState6,
  editorChipsAndNodeViewsWeakMap,
  filterEditorChipsAndNodeViewsOnce,
  getEditorChipsAndNodeViewsValue,
  getEditorChipsAndNodeViewsValue2,
  getEditorChipsAndNodeViewsValue3,
  isEditorChipsAndNodeViewsFrom,
  isEditorChipsAndNodeViewsState,
  resolveEditorChipsAndNodeViewsButton,
  resolveEditorChipsAndNodeViewsButton2,
  resolveEditorChipsAndNodeViewsButton3,
  resolveEditorChipsAndNodeViewsCaretDown,
  resolveEditorChipsAndNodeViewsChildCount,
  resolveEditorChipsAndNodeViewsClassName,
  resolveEditorChipsAndNodeViewsDate2,
  resolveEditorChipsAndNodeViewsDom,
  resolveEditorChipsAndNodeViewsFile,
  resolveEditorChipsAndNodeViewsFirstElementChild,
  resolveEditorChipsAndNodeViewsFirstElementChild2,
  resolveEditorChipsAndNodeViewsIsTrusted,
  resolveEditorChipsAndNodeViewsPickDate,
  resolveEditorChipsAndNodeViewsSize,
  resolveEditorChipsAndNodeViewsSpan,
  resolveEditorChipsAndNodeViewsSpan2,
  resolveEditorChipsAndNodeViewsSpan3,
  resolveEditorChipsAndNodeViewsSpan4,
  resolveEditorChipsAndNodeViewsValue2,
  resolveEditorChipsAndNodeViewsValue3,
  resolveEditorChipsAndNodeViewsValue5,
  resolveEditorChipsAndNodeViewsValue6,
  resolveEditorChipsAndNodeViewsValue7,
  resolveEditorChipsAndNodeViewsValue8,
  resolveEditorChipsAndNodeViewsValue9,
  resolveEditorChipsAndNodeViewsWatch,
  updateEditorChipsAndNodeViewsDom,
  updateEditorChipsAndNodeViewsDom2,
  updateEditorChipsAndNodeViewsKind,
  updateEditorChipsAndNodeViewsNode,
  updateEditorChipsAndNodeViewsResolve,
  updateEditorChipsAndNodeViewsRestricted,
};

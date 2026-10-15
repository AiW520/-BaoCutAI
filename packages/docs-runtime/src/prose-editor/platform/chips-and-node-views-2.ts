/** BaoCut: editor chips and node views from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  NodeSelection,
} from "../../platform/dependencies";
import {
  EditorExtensionsStrong,
  collectEditorExtensionsAuto,
  editorExtensionsGraySkyMineralOliveValues,
  resolveEditorExtensionsFind,
  resolveEditorExtensionsGray,
  resolveEditorExtensionsJoin,
  resolveEditorExtensionsMintId,
  resolveEditorExtensionsReplace,
  resolveEditorExtensionsToLowerCase,
  resolveEditorExtensionsValue12,
  resolveEditorExtensionsValue14,
  resolveEditorExtensionsValue16,
  resolveEditorExtensionsValue9,
} from "./extensions-2";
import {
  installEditorAnchorsAndMentionsOnce,
  resolveEditorAnchorsAndMentionsEmail2,
  resolveEditorAnchorsAndMentionsPlatform,
} from "./anchors-and-mentions-1";
import {
  PlatformAnnouncementsObject,
  resolvePlatformAnnouncementsValue,
  resolvePlatformAnnouncementsValue2,
} from "../../platform/services/announcements";
import {
  resolveEditorHostMention,
} from "../../platform/services/runtime-and-chat-3";
import {
  EditorHostState5,
} from "./host-1";
import {
  resolveCommentsActionsAndSelectionKind4,
  resolveCommentsActionsAndSelectionRef2,
  resolveCommentsActionsAndSelectionValue7,
} from "../../comments/store/actions-and-selection";
import {
  EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable,
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
  resolveEditorChipsAndNodeViewsButton,
  resolveEditorChipsAndNodeViewsButton2,
  resolveEditorChipsAndNodeViewsButton3,
  resolveEditorChipsAndNodeViewsCaretDown,
  resolveEditorChipsAndNodeViewsClassName,
  resolveEditorChipsAndNodeViewsDom,
  resolveEditorChipsAndNodeViewsFile,
  resolveEditorChipsAndNodeViewsIsTrusted,
  resolveEditorChipsAndNodeViewsSize,
  resolveEditorChipsAndNodeViewsSpan,
  resolveEditorChipsAndNodeViewsSpan2,
  resolveEditorChipsAndNodeViewsSpan3,
  resolveEditorChipsAndNodeViewsSpan4,
  resolveEditorChipsAndNodeViewsValue2,
  resolveEditorChipsAndNodeViewsValue6,
  resolveEditorChipsAndNodeViewsValue7,
  resolveEditorChipsAndNodeViewsValue8,
  resolveEditorChipsAndNodeViewsValue9,
  resolveEditorChipsAndNodeViewsWatch,
  updateEditorChipsAndNodeViewsDom,
  updateEditorChipsAndNodeViewsDom2,
  updateEditorChipsAndNodeViewsKind,
  updateEditorChipsAndNodeViewsRestricted,
} from "./chips-and-node-views-1";

var resolveEditorChipsAndNodeViewsAnon: Dynamic;

var filterEditorChipsAndNodeViewsVoters: Dynamic;

var editorChipsAndNodeViewsMap10: Dynamic;

var editorChipsAndNodeViewsSet5: Dynamic;

var EditorChipsAndNodeViewsHits: Dynamic;

var updateEditorChipsAndNodeViewsKind2: Dynamic;

var editorChipsAndNodeViewsValue280: number;

var editorChipsAndNodeViewsValue220: number;

var EditorChipsAndNodeViewsSlice: string[];

var resolveEditorChipsAndNodeViewsValue10: Dynamic;

var resolveEditorChipsAndNodeViewsStrong: Dynamic;

var resolveEditorChipsAndNodeViewsColor: Dynamic;

var resolveEditorChipsAndNodeViewsStrong2: Dynamic;

var EditorChipsAndNodeViewsState9: Dynamic;

var EditorChipsAndNodeViewsState10: Dynamic;

var editorChipsAndNodeViewsValues: Dynamic;

var resolveEditorChipsAndNodeViewsFind: Dynamic;

var resolveEditorChipsAndNodeViewsValue11: (..._extraArguments: unknown[]) => undefined;

var resolveEditorChipsAndNodeViewsNoEnumOpsWired: Dynamic;

var resolveEditorChipsAndNodeViewsValue12: (..._extraArguments: unknown[]) => undefined;

var editorChipsAndNodeViewsSet6: Dynamic;

var loadEditorChipsAndNodeViewsFind: Dynamic;

var resolveEditorChipsAndNodeViewsFind2: Dynamic;

var editorChipsAndNodeViewsSet7: Dynamic;

var resolveEditorChipsAndNodeViewsValue13: Dynamic;

function collectEditorChipsAndNodeViewsArrIdx(
  collectEditorChipsAndNodeViewsArrIdx2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectEditorChipsAndNodeViewsArrIdxResult: Dynamic = null;
  let collectEditorChipsAndNodeViewsArrIdxResult2: Dynamic = null;
  let editorChipsAndNodeViewsClassName: Dynamic =
    resolveEditorChipsAndNodeViewsClassName(`ls2`);
  let toSorted = (
    collectEditorChipsAndNodeViewsArrIdx3?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let mappedToSorted: Dynamic = collectEditorChipsAndNodeViewsArrIdx2.options
      .map(
        (
          option?: Dynamic,
          arrIdx?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          o: option,
          arrIdx: arrIdx,
        }),
      )
      .toSorted(
        (
          mappedOption?: Dynamic,
          mappedOption2?: Dynamic,
          ..._extraArguments: unknown[]
        ): number => mappedOption.o.order - mappedOption2.o.order,
      )
      .map(
        (toSorted2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          toSorted2.o,
      );
    let [splice]: Dynamic = mappedToSorted.splice(
      collectEditorChipsAndNodeViewsArrIdx3,
      1,
    );
    let total: Dynamic = options2 + +!context;
    if (collectEditorChipsAndNodeViewsArrIdx3 < options2 + +!context) {
      --total;
    }
    mappedToSorted.splice(total, 0, splice);
    for (let [
      collectEditorChipsAndNodeViewsArrIdxResult3,
      collectEditorChipsAndNodeViewsArrIdxResult4,
    ] of mappedToSorted.entries() as Dynamic)
      collectEditorChipsAndNodeViewsArrIdxResult4.order =
        collectEditorChipsAndNodeViewsArrIdxResult3;
  };
  let append = (..._extraArguments: unknown[]): undefined => {
    editorChipsAndNodeViewsClassName.textContent = ``;
    let toSorted2: Dynamic = collectEditorChipsAndNodeViewsArrIdx2.options
      .map(
        (
          option?: Dynamic,
          arrIdx?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          o: option,
          arrIdx: arrIdx,
        }),
      )
      .toSorted(
        (
          mappedOption?: Dynamic,
          mappedOption2?: Dynamic,
          ..._extraArguments: unknown[]
        ): number => mappedOption.o.order - mappedOption2.o.order,
      );
    for (let [
      collectEditorChipsAndNodeViewsArrIdxResult3,
      {
        o: collectEditorChipsAndNodeViewsArrIdxResult4,
        arrIdx: collectEditorChipsAndNodeViewsArrIdxResult5,
      },
    ] of toSorted2.entries() as Dynamic) {
      let editorChipsAndNodeViewsClassName2: Dynamic =
        resolveEditorChipsAndNodeViewsClassName(`orow`);
      editorChipsAndNodeViewsClassName2.style.borderTop = `2px solid transparent`;
      editorChipsAndNodeViewsClassName2.style.borderBottom = `2px solid transparent`;
      let element = document.createElement(`span`);
      element.style.cssText = `cursor:grab;flex:none;width:8px;height:12px;user-select:none;touch-action:none;${EditorHostState5};`;
      element.dataset.tip = `Drag to reorder`;
      element.addEventListener(
        `mousedown`,
        (..._extraArguments: unknown[]): undefined => {
          editorChipsAndNodeViewsClassName2.draggable = true;
          document.addEventListener(
            `mouseup`,
            (..._extraArguments: unknown[]): undefined => {
              editorChipsAndNodeViewsClassName2.draggable = false;
            },
            {
              once: true,
            },
          );
        },
      );
      editorChipsAndNodeViewsClassName2.addEventListener(
        `dragstart`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          collectEditorChipsAndNodeViewsArrIdxResult2 =
            collectEditorChipsAndNodeViewsArrIdxResult3;
          event.dataTransfer?.setData(`text/plain`, ``);
          if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = `move`;
          }
        },
      );
      editorChipsAndNodeViewsClassName2.addEventListener(
        `dragend`,
        (..._extraArguments: unknown[]): undefined => {
          editorChipsAndNodeViewsClassName2.draggable = false;
          collectEditorChipsAndNodeViewsArrIdxResult2 = null;
          append();
        },
      );
      editorChipsAndNodeViewsClassName2.addEventListener(
        `dragover`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            collectEditorChipsAndNodeViewsArrIdxResult2 === null ||
            collectEditorChipsAndNodeViewsArrIdxResult2 ===
              collectEditorChipsAndNodeViewsArrIdxResult3
          )
            return;
          event.preventDefault();
          let editorChipsAndNodeViewsClassNameBounds: Dynamic =
            editorChipsAndNodeViewsClassName2.getBoundingClientRect();
          let matchesClientY =
            event.clientY <
            editorChipsAndNodeViewsClassNameBounds.top +
              editorChipsAndNodeViewsClassNameBounds.height / 2;
          editorChipsAndNodeViewsClassName2.style.borderTopColor =
            matchesClientY ? `currentColor` : `transparent`;
          editorChipsAndNodeViewsClassName2.style.borderBottomColor =
            matchesClientY ? `transparent` : `currentColor`;
        },
      );
      editorChipsAndNodeViewsClassName2.addEventListener(
        `dragleave`,
        (..._extraArguments: unknown[]): undefined => {
          editorChipsAndNodeViewsClassName2.style.borderTopColor = `transparent`;
          editorChipsAndNodeViewsClassName2.style.borderBottomColor = `transparent`;
        },
      );
      editorChipsAndNodeViewsClassName2.addEventListener(
        `drop`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            collectEditorChipsAndNodeViewsArrIdxResult2 === null ||
            collectEditorChipsAndNodeViewsArrIdxResult2 ===
              collectEditorChipsAndNodeViewsArrIdxResult3
          )
            return;
          event.preventDefault();
          let editorChipsAndNodeViewsClassNameBounds: Dynamic =
            editorChipsAndNodeViewsClassName2.getBoundingClientRect();
          toSorted(
            collectEditorChipsAndNodeViewsArrIdxResult2,
            collectEditorChipsAndNodeViewsArrIdxResult3,
            event.clientY <
              editorChipsAndNodeViewsClassNameBounds.top +
                editorChipsAndNodeViewsClassNameBounds.height / 2,
          );
          collectEditorChipsAndNodeViewsArrIdxResult2 = null;
          append();
        },
      );
      element.addEventListener(
        `touchmove`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let toucheItem: Dynamic = event.touches[0];
          if (!toucheItem) return;
          event.preventDefault();
          for (let collectEditorChipsAndNodeViewsArrIdxResult6 of editorChipsAndNodeViewsClassName.querySelectorAll(
            `.orow`,
          ) as Dynamic) {
            collectEditorChipsAndNodeViewsArrIdxResult6.style.borderTopColor = `transparent`;
            collectEditorChipsAndNodeViewsArrIdxResult6.style.borderBottomColor = `transparent`;
          }
          let closest: Dynamic = document
            .elementFromPoint(toucheItem.clientX, toucheItem.clientY)
            ?.closest(`.orow`);
          if (
            !(closest instanceof HTMLElement) ||
            closest === editorChipsAndNodeViewsClassName2
          )
            return;
          let closestBounds = closest.getBoundingClientRect();
          let matchesClientY =
            toucheItem.clientY < closestBounds.top + closestBounds.height / 2;
          closest.style.borderTopColor = matchesClientY
            ? `currentColor`
            : `transparent`;
          closest.style.borderBottomColor = matchesClientY
            ? `transparent`
            : `currentColor`;
        },
      );
      element.addEventListener(
        `touchend`,
        (event?: Dynamic, ..._extraArguments: unknown[]) => {
          let changedToucheItem: Dynamic = event.changedTouches[0];
          if (!changedToucheItem) return;
          let closest: Dynamic = document
            .elementFromPoint(
              changedToucheItem.clientX,
              changedToucheItem.clientY,
            )
            ?.closest(`.orow`);
          if (
            !(closest instanceof HTMLElement) ||
            closest === editorChipsAndNodeViewsClassName2
          )
            return append();
          let matchedElementIndex = Array.from<Dynamic>(
            editorChipsAndNodeViewsClassName.querySelectorAll(`.orow`),
          ).indexOf(closest);
          if (matchedElementIndex < 0) return append();
          let closestBounds = closest.getBoundingClientRect();
          toSorted(
            collectEditorChipsAndNodeViewsArrIdxResult3,
            matchedElementIndex,
            changedToucheItem.clientY <
              closestBounds.top + closestBounds.height / 2,
          );
          append();
        },
      );
      let editorChipsAndNodeViewsButton32: Dynamic =
        resolveEditorChipsAndNodeViewsButton3(`dotbtn`);
      editorChipsAndNodeViewsButton32.dataset.tip = `Pick color`;
      editorChipsAndNodeViewsButton32.setAttribute(`aria-label`, `Pick color`);
      let editorChipsAndNodeViewsClassName3: Dynamic =
        resolveEditorChipsAndNodeViewsClassName(`dd-dot`);
      editorChipsAndNodeViewsClassName3.style.setProperty(
        `--dd`,
        resolveEditorChipsAndNodeViewsStrong2(
          collectEditorChipsAndNodeViewsArrIdxResult4,
          collectEditorChipsAndNodeViewsArrIdxResult5,
        ),
      );
      editorChipsAndNodeViewsButton32.append(editorChipsAndNodeViewsClassName3);
      editorChipsAndNodeViewsButton32.addEventListener(
        `click`,
        (..._extraArguments: unknown[]): undefined => {
          collectEditorChipsAndNodeViewsArrIdxResult =
            collectEditorChipsAndNodeViewsArrIdxResult ===
            collectEditorChipsAndNodeViewsArrIdxResult5
              ? null
              : collectEditorChipsAndNodeViewsArrIdxResult5;
          append();
        },
      );
      let element2 = document.createElement(`input`);
      element2.type = `text`;
      element2.value = collectEditorChipsAndNodeViewsArrIdxResult4.name;
      element2.maxLength = 120;
      if (collectEditorChipsAndNodeViewsArrIdxResult4.disabled) {
        element2.style.cssText = `opacity:.45;text-decoration:line-through;`;
      }
      element2.addEventListener(
        `input`,
        (..._extraArguments: unknown[]): undefined => {
          collectEditorChipsAndNodeViewsArrIdxResult4.name = element2.value;
        },
      );
      element2.addEventListener(
        `keydown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (event.key !== `Enter`) return;
          event.preventDefault();
          let items: Dynamic = [
            ...editorChipsAndNodeViewsClassName.querySelectorAll(`input`),
          ];
          let itemIndex: Dynamic = items.indexOf(element2);
          if (itemIndex < items.length - 1) {
            items[itemIndex + 1].focus();
            return;
          }
          if (element2.value.trim() === ``) return;
          let reduce: Dynamic =
            collectEditorChipsAndNodeViewsArrIdx2.options.reduce(
              (
                accumulator?: Dynamic,
                option?: Dynamic,
                ..._extraArguments: unknown[]
              ) => Math.max(accumulator, option.order),
              -1,
            );
          collectEditorChipsAndNodeViewsArrIdx2.options.push({
            name: ``,
            order: reduce + 1,
            disabled: false,
          });
          append();
          let matchedElements: Dynamic =
            editorChipsAndNodeViewsClassName.querySelectorAll(`input`);
          matchedElements[matchedElements.length - 1]?.focus();
        },
      );
      let editorChipsAndNodeViewsButton33: Dynamic =
        resolveEditorChipsAndNodeViewsButton3(`delbtn`);
      let matchesCollectEditorChipsAndNodeViewsArrIdxResult =
        collectEditorChipsAndNodeViewsArrIdxResult5 >= options;
      editorChipsAndNodeViewsButton33.dataset.tip =
        matchesCollectEditorChipsAndNodeViewsArrIdxResult
          ? `Remove (not saved yet)`
          : collectEditorChipsAndNodeViewsArrIdxResult4.disabled
            ? `Hidden from picker — click to show`
            : `Hide from picker`;
      editorChipsAndNodeViewsButton33.setAttribute(
        `aria-label`,
        editorChipsAndNodeViewsButton33.dataset.tip,
      );
      editorChipsAndNodeViewsButton33.append(
        resolveEditorChipsAndNodeViewsValue2(
          matchesCollectEditorChipsAndNodeViewsArrIdxResult
            ? `trash`
            : collectEditorChipsAndNodeViewsArrIdxResult4.disabled
              ? `eyeOff`
              : `eye`,
          14,
        ),
      );
      if (
        !matchesCollectEditorChipsAndNodeViewsArrIdxResult &&
        collectEditorChipsAndNodeViewsArrIdxResult4.disabled
      ) {
        editorChipsAndNodeViewsButton33.dataset.state = `hidden`;
      }
      editorChipsAndNodeViewsButton33.addEventListener(
        `click`,
        (..._extraArguments: unknown[]): undefined => {
          if (matchesCollectEditorChipsAndNodeViewsArrIdxResult) {
            collectEditorChipsAndNodeViewsArrIdx2.options.splice(
              collectEditorChipsAndNodeViewsArrIdxResult5,
              1,
            );
            collectEditorChipsAndNodeViewsArrIdxResult = null;
          } else {
            collectEditorChipsAndNodeViewsArrIdxResult4.disabled =
              !collectEditorChipsAndNodeViewsArrIdxResult4.disabled;
          }
          append();
        },
      );
      editorChipsAndNodeViewsClassName2.append(
        element,
        editorChipsAndNodeViewsButton32,
        element2,
        editorChipsAndNodeViewsButton33,
      );
      editorChipsAndNodeViewsClassName.append(
        editorChipsAndNodeViewsClassName2,
      );
      if (
        collectEditorChipsAndNodeViewsArrIdxResult ===
        collectEditorChipsAndNodeViewsArrIdxResult5
      ) {
        let editorChipsAndNodeViewsClassName4: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(`strip`);
        let editorExtensionsToLowerCase: Dynamic =
          resolveEditorExtensionsToLowerCase(
            collectEditorChipsAndNodeViewsArrIdxResult4.color,
          );
        for (let collectEditorChipsAndNodeViewsArrIdxResult6 of editorExtensionsGraySkyMineralOliveValues as Dynamic) {
          let editorChipsAndNodeViewsButton34: Dynamic =
            resolveEditorChipsAndNodeViewsButton3(
              `swb` +
                (editorExtensionsToLowerCase ===
                collectEditorChipsAndNodeViewsArrIdxResult6
                  ? ` is-sel`
                  : ``),
            );
          editorChipsAndNodeViewsButton34.dataset.tip =
            collectEditorChipsAndNodeViewsArrIdxResult6;
          editorChipsAndNodeViewsButton34.setAttribute(
            `aria-label`,
            collectEditorChipsAndNodeViewsArrIdxResult6,
          );
          let editorChipsAndNodeViewsClassName5: Dynamic =
            resolveEditorChipsAndNodeViewsClassName(`dd-dot`);
          editorChipsAndNodeViewsClassName5.style.setProperty(
            `--dd`,
            EditorExtensionsStrong[collectEditorChipsAndNodeViewsArrIdxResult6]
              .strong,
          );
          editorChipsAndNodeViewsButton34.style.setProperty(
            `--dd`,
            EditorExtensionsStrong[collectEditorChipsAndNodeViewsArrIdxResult6]
              .strong,
          );
          editorChipsAndNodeViewsButton34.append(
            editorChipsAndNodeViewsClassName5,
          );
          editorChipsAndNodeViewsButton34.addEventListener(
            `click`,
            (..._extraArguments: unknown[]): undefined => {
              collectEditorChipsAndNodeViewsArrIdxResult4.color =
                editorExtensionsToLowerCase ===
                collectEditorChipsAndNodeViewsArrIdxResult6
                  ? undefined
                  : collectEditorChipsAndNodeViewsArrIdxResult6;
              collectEditorChipsAndNodeViewsArrIdxResult = null;
              append();
            },
          );
          editorChipsAndNodeViewsClassName4.append(
            editorChipsAndNodeViewsButton34,
          );
        }
        editorChipsAndNodeViewsClassName.append(
          editorChipsAndNodeViewsClassName4,
        );
      }
    }
    let editorChipsAndNodeViewsButton3: Dynamic =
      resolveEditorChipsAndNodeViewsButton3(`addbtn`);
    editorChipsAndNodeViewsButton3.append(
      resolveEditorChipsAndNodeViewsValue2(`plus`, 13),
    );
    editorChipsAndNodeViewsButton3.append(`Add option`);
    editorChipsAndNodeViewsButton3.addEventListener(
      `click`,
      (..._extraArguments: unknown[]): undefined => {
        let reduce: Dynamic =
          collectEditorChipsAndNodeViewsArrIdx2.options.reduce(
            (
              accumulator?: Dynamic,
              option?: Dynamic,
              ..._extraArguments: unknown[]
            ) => Math.max(accumulator, option.order),
            -1,
          );
        collectEditorChipsAndNodeViewsArrIdx2.options.push({
          name: ``,
          order: reduce + 1,
          disabled: false,
        });
        append();
        let matchedElements: Dynamic =
          editorChipsAndNodeViewsClassName.querySelectorAll(`input`);
        matchedElements[matchedElements.length - 1]?.focus();
      },
    );
    editorChipsAndNodeViewsClassName.append(editorChipsAndNodeViewsButton3);
  };
  append();
  return editorChipsAndNodeViewsClassName;
}

function clearEditorChipsAndNodeViewsPop(
  clearEditorChipsAndNodeViewsPop2?: Dynamic,
  principal?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsValue12: Dynamic = resolveEditorExtensionsValue12();
  let clearEditorChipsAndNodeViewsPopResult: Dynamic = null;
  let clearEditorChipsAndNodeViewsPopResult2: Dynamic = null;
  let clearEditorChipsAndNodeViewsPopResult3: Dynamic = null;
  let schedule = (..._extraArguments: unknown[]): undefined => {
    editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult2);
    clearEditorChipsAndNodeViewsPopResult2 = editorExtensionsValue12.schedule(
      (..._extraArguments: unknown[]): Dynamic =>
        clearEditorChipsAndNodeViewsPopResult3?.(),
      editorChipsAndNodeViewsValue220,
    );
  };
  let append = (..._extraArguments: unknown[]): undefined => {
    if (
      clearEditorChipsAndNodeViewsPopResult3 ||
      !(resolveEditorAnchorsAndMentionsPlatform(principal)
        ? getEditorChipsAndNodeViewsValue(principal)
        : resolveEditorAnchorsAndMentionsEmail2(principal) !== null)
    )
      return;
    let clearEditorChipsAndNodeViewsPopHandler = (
      ..._extraArguments: unknown[]
    ): undefined => {};
    let clearEditorChipsAndNodeViewsPopResult4: Dynamic = null;
    let { pop: dependencies2, close: dependencies3 }: Dynamic = dependencies(
      ``,
      {
        bare: true,
        cls: `person`,
        onClose: (..._extraArguments: unknown[]): undefined => {
          editorChipsAndNodeViewsSet5.delete(
            clearEditorChipsAndNodeViewsPopHandler,
          );
          editorExtensionsValue12.cancel(
            clearEditorChipsAndNodeViewsPopResult4,
          );
          clearEditorChipsAndNodeViewsPopResult3 = null;
        },
      },
    );
    clearEditorChipsAndNodeViewsPopResult3 = dependencies3;
    dependencies2.addEventListener(
      `mouseenter`,
      (..._extraArguments: unknown[]): Dynamic =>
        editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult2),
    );
    dependencies2.addEventListener(`mouseleave`, schedule);
    let editorHostMention: Dynamic = resolveEditorHostMention({
      kind: `mention`,
      principal: principal,
    });
    let replaceWith: Dynamic = (
      clearEditorChipsAndNodeViewsPop3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let dir: Dynamic = clearEditorChipsAndNodeViewsPop3?.dir;
      let role = dir
        ? [dir.title, dir.team, dir.org].filter(Boolean).join(` · `)
        : ``;
      let desk = dir
        ? [dir.building, dir.floor ? `Floor ${dir.floor}` : ``]
            .filter(Boolean)
            .join(` · `)
        : ``;
      let local = ``;
      if (dir?.tz)
        try {
          local = `${new (Intl.DateTimeFormat as Dynamic)(
            resolveEditorExtensionsValue12().locale,
            {
              hour: `numeric`,
              minute: `2-digit`,
              timeZone: dir.tz,
              timeZoneName: `short`,
            },
          ).format(new Date(resolveEditorExtensionsValue12().now()))} local`;
        } catch {}
      let editorAnchorsAndMentionsPlatform: Dynamic =
        resolveEditorAnchorsAndMentionsPlatform(principal);
      let label: Dynamic =
        clearEditorChipsAndNodeViewsPop3?.label ||
        (editorAnchorsAndMentionsPlatform
          ? getEditorChipsAndNodeViewsValue(principal) || `Someone`
          : editorHostMention);
      let filterEditorChipsAndNodeViewsOnce2: Dynamic =
        filterEditorChipsAndNodeViewsOnce(
          document,
          {
            label: label,
            principal: editorAnchorsAndMentionsPlatform ? undefined : principal,
            email:
              resolveEditorAnchorsAndMentionsEmail2(principal) ?? undefined,
            role: role,
            desk: desk,
            local: local,
          },
          {
            onCopy: (
              clearEditorChipsAndNodeViewsPop4?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let activeElement2 = document.activeElement;
              let element = document.createElement(`textarea`);
              element.value = clearEditorChipsAndNodeViewsPop4;
              element.readOnly = true;
              element.style.position = `fixed`;
              element.style.top = `0`;
              element.style.left = `-9999px`;
              document.body.append(element);
              element.select();
              let enabled = false;
              try {
                enabled = document.execCommand(`copy`);
              } catch {
                enabled = false;
              }
              element.remove();
              if (activeElement2 instanceof HTMLElement) {
                activeElement2.focus({
                  preventScroll: true,
                });
              }
              let matchedElement: Dynamic =
                filterEditorChipsAndNodeViewsOnce2.querySelector(`button.cp`);
              if (matchedElement) {
                matchedElement.textContent = enabled ? `Copied` : `Copy failed`;
                editorExtensionsValue12.cancel(
                  clearEditorChipsAndNodeViewsPopResult4,
                );
                clearEditorChipsAndNodeViewsPopResult4 =
                  editorExtensionsValue12.schedule(
                    (..._extraArguments: unknown[]) =>
                      (matchedElement.textContent = `Copy email`),
                    1200,
                  );
              }
            },
          },
        );
      filterEditorChipsAndNodeViewsOnce2.querySelector(`.av`)?.replaceWith(
        installEditorAnchorsAndMentionsOnce({
          id: principal,
          label: label,
          photoData: clearEditorChipsAndNodeViewsPop3?.photoData,
        }),
      );
      return filterEditorChipsAndNodeViewsOnce2;
    };
    let replaceWith2: Dynamic = replaceWith(null);
    dependencies2.append(replaceWith2);
    let replaceWith3 = (
      clearEditorChipsAndNodeViewsPop3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!clearEditorChipsAndNodeViewsPop3) return;
      let replaceWith4: Dynamic = replaceWith(clearEditorChipsAndNodeViewsPop3);
      replaceWith2.replaceWith(replaceWith4);
      replaceWith2 = replaceWith4;
    };
    clearEditorChipsAndNodeViewsPopHandler = (
      ..._extraArguments: unknown[]
    ): undefined =>
      void updateEditorChipsAndNodeViewsKind2(principal).then(replaceWith3);
    editorChipsAndNodeViewsSet5.add(clearEditorChipsAndNodeViewsPopHandler);
    clearEditorChipsAndNodeViewsPopHandler();
  };
  context(
    clearEditorChipsAndNodeViewsPop2,
    `mouseenter`,
    (..._extraArguments: unknown[]): undefined => {
      editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult2);
      editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult);
      clearEditorChipsAndNodeViewsPopResult = editorExtensionsValue12.schedule(
        append,
        editorChipsAndNodeViewsValue280,
      );
    },
  );
  context(
    clearEditorChipsAndNodeViewsPop2,
    `mouseleave`,
    (..._extraArguments: unknown[]): undefined => {
      editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult);
      if (clearEditorChipsAndNodeViewsPopResult3) {
        schedule();
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult);
    editorExtensionsValue12.cancel(clearEditorChipsAndNodeViewsPopResult2);
    clearEditorChipsAndNodeViewsPopResult3?.();
  };
}

var EditorChipsAndNodeViewsMessage: string;

var editorChipsAndNodeViewsWeakMap2: Dynamic;

function updateEditorChipsAndNodeViewsSpan(
  updateEditorChipsAndNodeViewsSpan2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorChipsAndNodeViewsWeakMap2Entry: Dynamic =
    editorChipsAndNodeViewsWeakMap2.get(updateEditorChipsAndNodeViewsSpan2);
  if (!editorChipsAndNodeViewsWeakMap2Entry) {
    editorChipsAndNodeViewsWeakMap2.set(
      updateEditorChipsAndNodeViewsSpan2,
      (editorChipsAndNodeViewsWeakMap2Entry = new (Map as Dynamic)()),
    );
  }
  let editorChipsAndNodeViewsWeakMap2EntryEntry: Dynamic =
    editorChipsAndNodeViewsWeakMap2Entry.get(options);
  if (!editorChipsAndNodeViewsWeakMap2EntryEntry) {
    editorChipsAndNodeViewsWeakMap2EntryEntry =
      updateEditorChipsAndNodeViewsSpan2.createElement(`span`);
    editorChipsAndNodeViewsWeakMap2EntryEntry.id = `ldoc-ref-hint-${resolveEditorExtensionsMintId()}`;
    editorChipsAndNodeViewsWeakMap2EntryEntry.hidden = true;
    editorChipsAndNodeViewsWeakMap2EntryEntry.style.setProperty(
      `display`,
      `none`,
      `important`,
    );
    editorChipsAndNodeViewsWeakMap2Entry.set(
      options,
      editorChipsAndNodeViewsWeakMap2EntryEntry,
    );
  }
  editorChipsAndNodeViewsWeakMap2EntryEntry.replaceChildren(options);
  if (
    updateEditorChipsAndNodeViewsSpan2.body.firstElementChild !==
    editorChipsAndNodeViewsWeakMap2EntryEntry
  ) {
    updateEditorChipsAndNodeViewsSpan2.body.prepend(
      editorChipsAndNodeViewsWeakMap2EntryEntry,
    );
  }
  return editorChipsAndNodeViewsWeakMap2EntryEntry.id;
}

function updateEditorChipsAndNodeViewsLabel(
  element?: Dynamic,
  items?: unknown,
  context?: Dynamic,
  label: Dynamic = null,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionRef2: Dynamic =
    typeof items == `string`
      ? resolveCommentsActionsAndSelectionRef2(items)
      : null;
  if (!commentsActionsAndSelectionRef2) {
    let resolveEditorChipsAndNodeViewsSpan22 = (
      ..._extraArguments: unknown[]
    ): undefined => {
      element.textContent = ``;
      resolveEditorChipsAndNodeViewsSpan2(
        element,
        typeof items == `string` && items.length > 0
          ? resolveEditorExtensionsValue9(`ref`)
          : `◌`,
      );
    };
    resolveEditorChipsAndNodeViewsSpan22();
    if (!resolveEditorChipsAndNodeViewsTabindex(element)) {
      context(
        element,
        `blur`,
        (..._extraArguments: unknown[]): undefined =>
          void (
            resolveEditorChipsAndNodeViewsTabindex(element) &&
            resolveEditorChipsAndNodeViewsSpan22()
          ),
      );
    }
    editorChipsAndNodeViewsWeakMap4.get(element)?.();
    delete element.dataset.restricted;
    delete element.dataset.deleted;
    delete element.dataset.tip;
    element.removeAttribute(`aria-describedby`);
    return;
  }
  let commentsActionsAndSelectionValue7 =
    resolveCommentsActionsAndSelectionValue7(
      commentsActionsAndSelectionRef2.ref,
      resolveEditorChipsAndNodeViewsValue8() ?? undefined,
    );
  let editorChipsAndNodeViewsFile: Dynamic = resolveEditorChipsAndNodeViewsFile(
    commentsActionsAndSelectionRef2.ref,
  );
  let label2: Dynamic =
    editorChipsAndNodeViewsFile === null
      ? undefined
      : editorChipsAndNodeViewsMap9.get(editorChipsAndNodeViewsFile);
  let matchesLabel =
    label === null &&
    label2 === undefined &&
    !(
      editorChipsAndNodeViewsFile !== null &&
      resolveEditorChipsAndNodeViewsSize(editorChipsAndNodeViewsFile)
    ) &&
    (commentsActionsAndSelectionRef2.kind === `project` ||
      commentsActionsAndSelectionRef2.kind === `file`);
  let label3: Dynamic =
    label2 === undefined
      ? label === null
        ? matchesLabel
          ? `loading`
          : null
        : {
            label: label,
          }
      : {
          label: label2,
        };
  let canOpen: Dynamic = (..._extraArguments: unknown[]) =>
    commentsActionsAndSelectionValue7 !== null &&
    editorChipsAndNodeViewsState6 !== undefined &&
    !(label3 !== `loading` && label3 !== null && `restricted` in label3);
  let helloRImport2: Dynamic = (
    updateEditorChipsAndNodeViewsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let defaultView: Dynamic = element.ownerDocument.defaultView;
    if (defaultView) {
      editorChipsAndNodeViewsWeakMap3.get(defaultView)?.();
    }
    return commentsActionsAndSelectionValue7 === null || !canOpen()
      ? false
      : (resolveEditorChipsAndNodeViewsValue6(
          commentsActionsAndSelectionValue7,
        ),
        updateEditorChipsAndNodeViewsLabel2 !== undefined &&
          element.dataset.readonly === `true` &&
          addEventListener3(updateEditorChipsAndNodeViewsLabel2 === `key`),
        true);
  };
  let record2: Dynamic = {
    open: (..._extraArguments: unknown[]): Dynamic => helloRImport2(),
    canOpen: canOpen,
  };
  editorChipsAndNodeViewsWeakMap5.set(element, record2);
  let append = (
    updateEditorChipsAndNodeViewsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    element.append(
      document.createTextNode(updateEditorChipsAndNodeViewsLabel2),
    );
  };
  let enabled: boolean = false;
  let setAttribute = (..._extraArguments: unknown[]): undefined => {
    element.textContent = ``;
    delete element.dataset.restricted;
    delete element.dataset.deleted;
    delete element.dataset.tip;
    element.removeAttribute(`aria-describedby`);
    enabled =
      editorChipsAndNodeViewsFile !== null &&
      resolveEditorChipsAndNodeViewsSize(editorChipsAndNodeViewsFile);
    if (enabled) {
      element.dataset.deleted = `true`;
      element.dataset.tip =
        EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable;
      element.setAttribute(
        `aria-describedby`,
        updateEditorChipsAndNodeViewsSpan(
          element.ownerDocument,
          EditorChipsAndNodeViewsThisTabHasBeenDeletedOrIsNoLongerAvailable,
        ),
      );
      let label4: Dynamic =
        label ??
        (label3 !== null && label3 !== `loading` && !(`restricted` in label3)
          ? label3.label
          : getEditorChipsAndNodeViewsValue2(
              commentsActionsAndSelectionRef2.ref,
            ));
      append(
        label4 === undefined
          ? resolveEditorExtensionsValue9(commentsActionsAndSelectionRef2.kind)
          : resolveEditorExtensionsJoin(label4),
      );
      return;
    }
    if (label3 === `loading`) {
      resolveEditorChipsAndNodeViewsSpan2(element, `…`);
      return;
    }
    if (label3 === null) {
      append(
        resolveEditorExtensionsValue9(commentsActionsAndSelectionRef2.kind),
      );
      return;
    }
    if (`restricted` in label3) {
      element.dataset.restricted = `true`;
      element.dataset.tip = EditorChipsAndNodeViewsMessage;
      element.setAttribute(
        `aria-describedby`,
        updateEditorChipsAndNodeViewsSpan(
          element.ownerDocument,
          EditorChipsAndNodeViewsMessage,
        ),
      );
      resolveEditorChipsAndNodeViewsSpan2(element, `Restricted`);
      return;
    }
    append(resolveEditorExtensionsJoin(label3.label));
  };
  let enabled2 = false;
  let setAttribute2 = (..._extraArguments: unknown[]): undefined => {
    setAttribute();
    if (element.dataset.readonly === `true` && canOpen()) {
      element.setAttribute(`tabindex`, `0`);
    } else {
      if (!resolveEditorChipsAndNodeViewsTabindex(element) && !enabled2) {
        enabled2 = true;
        context(element, `blur`, setAttribute2);
      }
    }
  };
  setAttribute2();
  let enabled3 = false;
  if (matchesLabel) {
    updateEditorChipsAndNodeViewsRestricted(
      commentsActionsAndSelectionRef2.ref,
    ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          enabled3 ||
          (editorChipsAndNodeViewsFile !== null &&
            editorChipsAndNodeViewsMap9.has(editorChipsAndNodeViewsFile))
        )
      ) {
        label3 = result;
        setAttribute2();
      }
    });
  }
  let setAttribute3 = (..._extraArguments: unknown[]): undefined => {
    if (enabled3 || editorChipsAndNodeViewsFile === null) return;
    let label4: Dynamic = editorChipsAndNodeViewsMap9.get(
      editorChipsAndNodeViewsFile,
    );
    if (label4 !== undefined) {
      if (
        !enabled &&
        label3 !== null &&
        label3 !== `loading` &&
        !(`restricted` in label3) &&
        label3.label === label4
      )
        return;
      label3 = {
        label: label4,
      };
      setAttribute2();
      return;
    }
    if (
      editorChipsAndNodeViewsSet3.size !== 0 &&
      enabled !==
        resolveEditorChipsAndNodeViewsSize(editorChipsAndNodeViewsFile)
    ) {
      setAttribute2();
    }
  };
  if (editorChipsAndNodeViewsFile !== null) {
    editorChipsAndNodeViewsSet4.add(setAttribute3);
  }
  context(
    element,
    `click`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      event.preventDefault();
      helloRImport2(`click`);
    },
  );
  let addEventListener3 = (
    updateEditorChipsAndNodeViewsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let defaultView: Dynamic = element.ownerDocument.defaultView;
    if (!defaultView) return;
    editorChipsAndNodeViewsWeakMap3.get(defaultView)?.();
    let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
      defaultView.removeEventListener(`focus`, focus);
      for (let updateEditorChipsAndNodeViewsLabelResult of editorChipsAndNodeViewsKeydownPointerdownMousedownTouchstartValues as Dynamic)
        defaultView.removeEventListener(
          updateEditorChipsAndNodeViewsLabelResult,
          removeEventListener3,
          {
            capture: true,
          },
        );
      if (
        editorChipsAndNodeViewsWeakMap3.get(defaultView) ===
        removeEventListener2
      ) {
        editorChipsAndNodeViewsWeakMap3.delete(defaultView);
      }
      if (
        editorChipsAndNodeViewsWeakMap4.get(element) === removeEventListener2
      ) {
        editorChipsAndNodeViewsWeakMap4.delete(element);
      }
    };
    let focus = (..._extraArguments: unknown[]): undefined => {
      removeEventListener2();
      let ownerDocument2: Dynamic = element.ownerDocument;
      if (
        !(
          ownerDocument2.activeElement !== ownerDocument2.body ||
          !element.isConnected ||
          element.getAttribute(`tabindex`) !== `0`
        )
      ) {
        element.focus({
          ...(updateEditorChipsAndNodeViewsLabel2
            ? {
                focusVisible: true,
              }
            : {}),
          preventScroll: true,
        });
      }
    };
    let removeEventListener3 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          event.type === `keydown` &&
          (event.repeat || editorChipsAndNodeViewsSet8.has(event.key))
        )
      ) {
        removeEventListener2();
      }
    };
    defaultView.addEventListener(`focus`, focus);
    for (let updateEditorChipsAndNodeViewsLabelResult of editorChipsAndNodeViewsKeydownPointerdownMousedownTouchstartValues as Dynamic)
      defaultView.addEventListener(
        updateEditorChipsAndNodeViewsLabelResult,
        removeEventListener3,
        {
          capture: true,
          passive: true,
        },
      );
    editorChipsAndNodeViewsWeakMap3.set(defaultView, removeEventListener2);
    editorChipsAndNodeViewsWeakMap4.set(element, removeEventListener2);
  };
  context(
    element,
    `keydown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          event.target !== element ||
          element.dataset.readonly !== `true` ||
          event.key !== `Enter` ||
          event.shiftKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.isComposing ||
          event.repeat
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (!helloRImport2(`key`) && element.dataset.restricted === `true`) {
          resolvePlatformAnnouncementsValue(
            element.ownerDocument,
            EditorChipsAndNodeViewsMessage,
            {
              key: `reference`,
            },
          );
        }
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    enabled3 = true;
    editorChipsAndNodeViewsSet4.delete(setAttribute3);
    queueMicrotask((..._extraArguments: unknown[]): undefined => {
      if (!element.isConnected) {
        editorChipsAndNodeViewsWeakMap4.get(element)?.();
      }
    });
    if (editorChipsAndNodeViewsWeakMap5.get(element) === record2) {
      editorChipsAndNodeViewsWeakMap5.delete(element);
    }
  };
}

var editorChipsAndNodeViewsWeakMap3: Dynamic;

var editorChipsAndNodeViewsKeydownPointerdownMousedownTouchstartValues: string[];

var editorChipsAndNodeViewsSet8: Dynamic;

var editorChipsAndNodeViewsWeakMap4: Dynamic;

function resolveEditorChipsAndNodeViewsTabindex(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return element.ownerDocument.activeElement === element &&
    element.hasAttribute(`tabindex`)
    ? false
    : (element.removeAttribute(`tabindex`), true);
}

var editorChipsAndNodeViewsWeakMap5: Dynamic;

var editorChipsAndNodeViewsWeakMap6: Dynamic;

var editorChipsAndNodeViewsWeakMap7: Dynamic;

var editorChipsAndNodeViewsWeakMap8: Dynamic;

function clearEditorChipsAndNodeViewsEscape(
  clearEditorChipsAndNodeViewsEscape2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    [...options].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item !== `Escape`,
    ),
  );
  if (uniqueItems.size === 0) return;
  let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
    clearEditorChipsAndNodeViewsEscape2.removeEventListener(
      `keydown`,
      stopImmediatePropagation,
      true,
    );
    clearEditorChipsAndNodeViewsEscape2.removeEventListener(
      `keyup`,
      removeEventListener3,
      true,
    );
  };
  let stopImmediatePropagation: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!event.repeat) return removeEventListener2();
    if (uniqueItems.has(event.key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  let removeEventListener3 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    uniqueItems.delete(event.key);
    if (uniqueItems.size === 0) {
      removeEventListener2();
    }
  };
  clearEditorChipsAndNodeViewsEscape2.addEventListener(
    `keydown`,
    stopImmediatePropagation,
    true,
  );
  clearEditorChipsAndNodeViewsEscape2.addEventListener(
    `keyup`,
    removeEventListener3,
    true,
  );
}

var editorChipsAndNodeViewsWeakSet: Dynamic;

var editorChipsAndNodeViewsValue03: number;

function resolveEditorChipsAndNodeViewsKind(
  items?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsValue16: Dynamic =
    resolveEditorExtensionsValue16(options);
  let commentsActionsAndSelectionRef2: Dynamic =
    typeof items == `string`
      ? resolveCommentsActionsAndSelectionRef2(items)
      : null;
  if (!commentsActionsAndSelectionRef2)
    return (
      editorExtensionsValue16 ??
      (typeof items == `string` && items.length > 0
        ? resolveEditorExtensionsValue9(`ref`)
        : ``)
    );
  let editorChipsAndNodeViewsValue3: Dynamic = getEditorChipsAndNodeViewsValue3(
    commentsActionsAndSelectionRef2.ref,
  );
  if (editorChipsAndNodeViewsValue3 !== undefined)
    return resolveEditorExtensionsJoin(editorChipsAndNodeViewsValue3);
  if (editorExtensionsValue16 !== null) return editorExtensionsValue16;
  let editorChipsAndNodeViewsValue2: Dynamic = getEditorChipsAndNodeViewsValue2(
    commentsActionsAndSelectionRef2.ref,
  );
  return editorChipsAndNodeViewsValue2 === undefined
    ? resolveEditorExtensionsValue9(commentsActionsAndSelectionRef2.kind)
    : resolveEditorExtensionsJoin(editorChipsAndNodeViewsValue2);
}

function resolveEditorChipsAndNodeViewsValue14(
  editorChipsAndNodeViewsValue14?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionRef2: Dynamic =
    typeof editorChipsAndNodeViewsValue14 == `string`
      ? resolveCommentsActionsAndSelectionRef2(editorChipsAndNodeViewsValue14)
      : null;
  if (!commentsActionsAndSelectionRef2) return ``;
  let commentsActionsAndSelectionKind4 =
    resolveCommentsActionsAndSelectionKind4(
      commentsActionsAndSelectionRef2.ref,
      resolveEditorChipsAndNodeViewsValue8() ?? undefined,
    );
  return commentsActionsAndSelectionKind4 === null
    ? commentsActionsAndSelectionRef2.ref
    : `${resolveEditorChipsAndNodeViewsValue7() ?? ``}${commentsActionsAndSelectionKind4}`;
}

var resolveEditorChipsAndNodeViewsDom2: Dynamic;

var EditorChipsAndNodeViewsDropdownCleared: string;

function loadEditorChipsAndNodeViewsDom(
  editorChipsAndNodeViewsDom?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    dom: editorChipsAndNodeViewsDom2,
    on: editorChipsAndNodeViewsDom3,
    popover: editorChipsAndNodeViewsDom4,
    editor: editorChipsAndNodeViewsDom5,
    pos: editorChipsAndNodeViewsDom6,
  }: Dynamic = editorChipsAndNodeViewsDom;
  let dispatch: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let editorChipsAndNodeViewsDom7: Dynamic = editorChipsAndNodeViewsDom6();
    if (editorChipsAndNodeViewsDom7 === null) return null;
    let selection: Dynamic = editorChipsAndNodeViewsDom5.state.selection;
    if (
      !(
        selection instanceof (NodeSelection as Dynamic) &&
        selection.from === editorChipsAndNodeViewsDom7
      )
    ) {
      editorChipsAndNodeViewsDom5.view.dispatch(
        editorChipsAndNodeViewsDom5.state.tr.setSelection(
          NodeSelection.create(
            editorChipsAndNodeViewsDom5.state.doc,
            editorChipsAndNodeViewsDom7,
          ),
        ),
      );
    }
    return editorChipsAndNodeViewsDom7;
  };
  let nodeAt: Dynamic = (..._extraArguments: unknown[]) => {
    let editorChipsAndNodeViewsDom7: Dynamic = editorChipsAndNodeViewsDom6();
    let attrs: Dynamic =
      editorChipsAndNodeViewsDom7 === null
        ? undefined
        : editorChipsAndNodeViewsDom5.state.doc.nodeAt(
            editorChipsAndNodeViewsDom7,
          )?.attrs;
    if (attrs === undefined) return;
    let index: Dynamic = attrs.index;
    let index2: Dynamic = attrs.builtin?.index;
    return typeof index == `number`
      ? index
      : typeof index2 == `number`
        ? index2
        : null;
  };
  resolveEditorChipsAndNodeViewsValue11();
  let enabled = true;
  let loadEditorChipsAndNodeViewsFind2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    loadEditorChipsAndNodeViewsFind(options).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!enabled) return;
        editorChipsAndNodeViewsDom2.textContent = ``;
        delete editorChipsAndNodeViewsDom2.dataset.set;
        delete editorChipsAndNodeViewsDom2.dataset.disabledOpt;
        for (let loadEditorChipsAndNodeViewsDomResult of Array.from<Dynamic>(
          editorChipsAndNodeViewsDom2.classList,
        ) as Dynamic)
          if (loadEditorChipsAndNodeViewsDomResult.startsWith(`dd-c-`)) {
            editorChipsAndNodeViewsDom2.classList.remove(
              loadEditorChipsAndNodeViewsDomResult,
            );
          }
        if (result === null) {
          resolveEditorChipsAndNodeViewsSpan2(editorChipsAndNodeViewsDom2, `▾`);
          return;
        }
        if (context === null) {
          let element2 = document.createElement(`span`);
          element2.className = `t`;
          element2.textContent = result.name || `Select`;
          element2.style.opacity = `0.55`;
          editorChipsAndNodeViewsDom2.append(element2);
        } else {
          let optionItem: Dynamic = result.options[context];
          if (optionItem && !optionItem.disabled) {
            editorChipsAndNodeViewsDom2.dataset.set = `true`;
            editorChipsAndNodeViewsDom2.classList.add(
              `dd-c-${resolveEditorChipsAndNodeViewsColor(optionItem, context)}`,
            );
          }
          if (optionItem?.disabled) {
            editorChipsAndNodeViewsDom2.dataset.disabledOpt = `true`;
            let element2 = document.createElement(`span`);
            element2.className = `t`;
            element2.style.opacity = `0.55`;
            let element3 = document.createElement(`span`);
            element3.textContent = `${result.name} \u00b7 `;
            let element4 = document.createElement(`span`);
            element4.textContent = optionItem.name;
            element4.style.textDecoration = `line-through`;
            element2.append(element3, element4);
            editorChipsAndNodeViewsDom2.append(element2);
          } else {
            let element2 = document.createElement(`span`);
            element2.className = `t`;
            element2.textContent = optionItem ? optionItem.name : `—`;
            editorChipsAndNodeViewsDom2.append(element2);
          }
        }
        let element = document.createElement(`span`);
        element.className = `car`;
        element.textContent = `▾`;
        editorChipsAndNodeViewsDom2.append(element);
      },
    );
  };
  loadEditorChipsAndNodeViewsFind2();
  editorChipsAndNodeViewsSet7.add(loadEditorChipsAndNodeViewsFind2);
  let focus: Dynamic = (
    editorChipsAndNodeViewsDom7?: Dynamic,
    options2: Dynamic = false,
    ..._extraArguments: unknown[]
  ) => {
    let result: Dynamic =
      editorChipsAndNodeViewsWeakSet.delete(editorChipsAndNodeViewsDom2) ||
      options2;
    let enabled2 = false;
    let {
      pop: editorChipsAndNodeViewsDom8,
      close: editorChipsAndNodeViewsDom9,
    }: Dynamic = editorChipsAndNodeViewsDom4(``, {
      bare: true,
      cls: `dd`,
      anchorToggle: true,
      keyboardHome: (..._extraArguments: unknown[]): Dynamic => result,
      onClose: (..._extraArguments: unknown[]): undefined => {
        if (
          editorChipsAndNodeViewsWeakMap.get(editorChipsAndNodeViewsDom2) ===
          editorChipsAndNodeViewsDom9
        ) {
          delete editorChipsAndNodeViewsDom2.dataset.open;
          editorChipsAndNodeViewsWeakMap.delete(editorChipsAndNodeViewsDom2);
        }
        if (
          editorChipsAndNodeViewsWeakMap7.get(editorChipsAndNodeViewsDom2) ===
          focus2
        ) {
          editorChipsAndNodeViewsWeakMap7.delete(editorChipsAndNodeViewsDom2);
        }
        document.removeEventListener(
          `keydown`,
          editorChipsAndNodeViewsDom11,
          true,
        );
      },
    });
    editorChipsAndNodeViewsWeakMap.set(
      editorChipsAndNodeViewsDom2,
      editorChipsAndNodeViewsDom9,
    );
    editorChipsAndNodeViewsDom2.dataset.open = `true`;
    let editorChipsAndNodeViewsDom10: Dynamic = (
      editorChipsAndNodeViewsDom12: Dynamic = `key`,
      ..._extraArguments: unknown[]
    ): Dynamic => editorChipsAndNodeViewsDom9(editorChipsAndNodeViewsDom12);
    let editorChipsAndNodeViewsDom11 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          event.key !== `Escape` ||
          event.isComposing ||
          document.activeElement !== element
        )
      ) {
        event.stopPropagation();
        editorChipsAndNodeViewsDom10(`escape`);
      }
    };
    document.addEventListener(`keydown`, editorChipsAndNodeViewsDom11, true);
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
    editorChipsAndNodeViewsDom8.append(editorChipsAndNodeViewsClassName);
    element.addEventListener(
      `copy`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          element.selectionStart !== element.selectionEnd ||
          !event.clipboardData
        )
          return;
        let editorChipsAndNodeViewsDom12: Dynamic =
          editorChipsAndNodeViewsDom6();
        if (editorChipsAndNodeViewsDom12 === null) return;
        let selection: Dynamic = editorChipsAndNodeViewsDom5.state.selection;
        let enabled5 =
          !selection.empty &&
          !(
            selection instanceof (NodeSelection as Dynamic) &&
            selection.from === editorChipsAndNodeViewsDom12
          );
        if (!enabled5) {
          dispatch();
        }
        let content: Dynamic = enabled5
          ? selection.content()
          : NodeSelection.create(
              editorChipsAndNodeViewsDom5.state.doc,
              editorChipsAndNodeViewsDom12,
            ).content();
        let { dom: forClipboard, text: forClipboard2 }: Dynamic =
          editorChipsAndNodeViewsDom5.view.serializeForClipboard(content);
        event.preventDefault();
        event.clipboardData.clearData();
        event.clipboardData.setData(`text/html`, forClipboard.innerHTML);
        event.clipboardData.setData(`text/plain`, forClipboard2);
      },
    );
    element.addEventListener(
      `beforecopy`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (element.selectionStart === element.selectionEnd) {
          event.preventDefault();
        }
      },
    );
    let editorChipsAndNodeViewsClassName2: Dynamic =
      resolveEditorChipsAndNodeViewsClassName(`ls`);
    editorChipsAndNodeViewsDom8.append(editorChipsAndNodeViewsClassName2);
    let label = `ldoc-chip-list-${++editorChipsAndNodeViewsValue03}`;
    editorChipsAndNodeViewsClassName2.id = label;
    editorChipsAndNodeViewsClassName2.setAttribute(`role`, `listbox`);
    if (editorChipsAndNodeViewsDom7.name) {
      editorChipsAndNodeViewsClassName2.setAttribute(
        `aria-label`,
        editorChipsAndNodeViewsDom7.name,
      );
    }
    element.setAttribute(`role`, `combobox`);
    element.setAttribute(`aria-expanded`, `true`);
    element.setAttribute(`aria-controls`, label);
    element.setAttribute(`aria-autocomplete`, `list`);
    let lookup: Dynamic = new (Map as Dynamic)();
    let enabled3 = false;
    let loadEditorChipsAndNodeViewsDomResult: Dynamic = null;
    let getBoundingClientRect: Dynamic = (
      editorChipsAndNodeViewsDom12?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (loadEditorChipsAndNodeViewsDomResult) {
        loadEditorChipsAndNodeViewsDomResult.classList.remove(`is-active`);
        loadEditorChipsAndNodeViewsDomResult.setAttribute(
          `aria-selected`,
          `false`,
        );
      }
      loadEditorChipsAndNodeViewsDomResult = editorChipsAndNodeViewsDom12;
      editorChipsAndNodeViewsClassName2.classList.toggle(
        `has-active`,
        editorChipsAndNodeViewsDom12 !== null,
      );
      if (editorChipsAndNodeViewsDom12 === null)
        return element.removeAttribute(`aria-activedescendant`);
      editorChipsAndNodeViewsDom12.classList.add(`is-active`);
      editorChipsAndNodeViewsDom12.setAttribute(`aria-selected`, `true`);
      element.setAttribute(
        `aria-activedescendant`,
        editorChipsAndNodeViewsDom12.id,
      );
      let editorChipsAndNodeViewsDomBounds: Dynamic =
        editorChipsAndNodeViewsDom12.getBoundingClientRect();
      let total: Dynamic =
        editorChipsAndNodeViewsClassName2.getBoundingClientRect().top +
        editorChipsAndNodeViewsClassName2.clientTop;
      let total2: Dynamic =
        total + editorChipsAndNodeViewsClassName2.clientHeight;
      if (editorChipsAndNodeViewsDomBounds.top < total) {
        editorChipsAndNodeViewsClassName2.scrollTop -=
          total - editorChipsAndNodeViewsDomBounds.top;
      } else {
        if (editorChipsAndNodeViewsDomBounds.bottom > total2) {
          editorChipsAndNodeViewsClassName2.scrollTop +=
            editorChipsAndNodeViewsDomBounds.bottom - total2;
        }
      }
    };
    let indexOf = (
      editorChipsAndNodeViewsDom12?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let items: Dynamic = [...lookup.keys()];
      if (items.length === 0) return;
      let itemIndex: Dynamic =
        loadEditorChipsAndNodeViewsDomResult === null
          ? -1
          : items.indexOf(loadEditorChipsAndNodeViewsDomResult);
      getBoundingClientRect(
        items[
          itemIndex < 0
            ? editorChipsAndNodeViewsDom12 === 1
              ? 0
              : items.length - 1
            : (itemIndex + editorChipsAndNodeViewsDom12 + items.length) %
              items.length
        ],
      );
    };
    let resolvePlatformAnnouncementsValue11 = (
      editorChipsAndNodeViewsDom12?: Dynamic,
      options3: Dynamic = `pointer`,
      ..._extraArguments: unknown[]
    ): undefined => {
      let matchesEditorChipsAndNodeViewsDom =
        editorChipsAndNodeViewsDom12 === context;
      dependencies(
        matchesEditorChipsAndNodeViewsDom ? null : editorChipsAndNodeViewsDom12,
      );
      if (options3 === `key`) {
        editorChipsAndNodeViewsDom10();
      } else {
        editorChipsAndNodeViewsDom9(`pointer`);
      }
      if (
        matchesEditorChipsAndNodeViewsDom &&
        options3 === `key` &&
        result &&
        nodeAt() === null
      ) {
        resolvePlatformAnnouncementsValue2(
          editorChipsAndNodeViewsDom2.ownerDocument,
          PlatformAnnouncementsObject,
        );
        resolvePlatformAnnouncementsValue(
          editorChipsAndNodeViewsDom2.ownerDocument,
          EditorChipsAndNodeViewsDropdownCleared,
          {
            key: PlatformAnnouncementsObject,
          },
        );
      }
    };
    let enabled4 = false;
    let result2 = (
      editorChipsAndNodeViewsDom12: Dynamic = `pointer`,
      ..._extraArguments: unknown[]
    ): undefined => {
      let editorChipsAndNodeViewsDom13: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorChipsAndNodeViewsDom12 === `key`
          ? editorChipsAndNodeViewsDom10()
          : editorChipsAndNodeViewsDom9(`pointer`);
      let name = element.value.trim().slice(0, 80);
      let EditorChipsAndNodeViewsState92: Dynamic =
        EditorChipsAndNodeViewsState9;
      if (name === `` || EditorChipsAndNodeViewsState92 === null || enabled4)
        return;
      let loadEditorChipsAndNodeViewsDomHandler2 = (
        ..._extraArguments: unknown[]
      ) =>
        editorChipsAndNodeViewsWeakMap.get(editorChipsAndNodeViewsDom2) ===
        editorChipsAndNodeViewsDom9;
      enabled4 = true;
      (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        resolveEditorChipsAndNodeViewsValue12();
        let editorChipsAndNodeViewsNoEnumOpsWired: Dynamic = (
          await resolveEditorChipsAndNodeViewsNoEnumOpsWired()
        ).find(
          (
            editorChipsAndNodeViewsNoEnumOpsWired2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => editorChipsAndNodeViewsNoEnumOpsWired2.id === options,
        );
        if (
          !loadEditorChipsAndNodeViewsDomHandler2() ||
          editorChipsAndNodeViewsNoEnumOpsWired === undefined
        )
          return;
        let toLowerCase2 = (
          editorChipsAndNodeViewsDom14?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          editorChipsAndNodeViewsDom14.name.trim().toLowerCase() ===
          name.toLowerCase();
        let optionIndex: Dynamic =
          editorChipsAndNodeViewsNoEnumOpsWired.options.findIndex(
            (option?: Dynamic, ..._extraArguments: unknown[]) =>
              !option.disabled && toLowerCase2(option),
          );
        let optionIndex2: Dynamic =
          optionIndex >= 0
            ? optionIndex
            : editorChipsAndNodeViewsNoEnumOpsWired.options.findIndex(
                toLowerCase2,
              );
        if (optionIndex2 >= 0)
          return editorChipsAndNodeViewsNoEnumOpsWired.options[optionIndex2]
            .disabled
            ? undefined
            : (optionIndex2 !== context && dependencies(optionIndex2),
              editorChipsAndNodeViewsDom13());
        let expectLen: Dynamic =
          editorChipsAndNodeViewsNoEnumOpsWired.options.length;
        let order: Dynamic =
          editorChipsAndNodeViewsNoEnumOpsWired.options.reduce(
            (
              accumulator?: Dynamic,
              option?: Dynamic,
              ..._extraArguments: unknown[]
            ) => Math.max(accumulator, option.order),
            -1,
          ) + 1;
        let record3: Dynamic = {
          name: editorChipsAndNodeViewsNoEnumOpsWired.name,
          options: [
            ...editorChipsAndNodeViewsNoEnumOpsWired.options,
            {
              name: name,
              order: order,
              disabled: false,
            },
          ],
        };
        let base: Dynamic = {
          name: editorChipsAndNodeViewsNoEnumOpsWired.name,
          options: editorChipsAndNodeViewsNoEnumOpsWired.options,
        };
        if (
          await EditorChipsAndNodeViewsState92.update(options, {
            kind: `replace`,
            value: record3,
            expectLen: expectLen,
            base: base,
            keepIndex: true,
          })
        ) {
          resolveEditorChipsAndNodeViewsValue13();
          if (loadEditorChipsAndNodeViewsDomHandler2()) {
            dependencies(expectLen);
            editorChipsAndNodeViewsDom13();
          }
        }
      })().finally((..._extraArguments: unknown[]): undefined => {
        enabled4 = false;
      });
    };
    let append = (..._extraArguments: unknown[]): undefined => {
      editorChipsAndNodeViewsClassName2.textContent = ``;
      lookup.clear();
      getBoundingClientRect(null);
      let trimmedValue = element.value.trim();
      let normalizedTrimmedValue = trimmedValue.toLowerCase();
      let toSorted: Dynamic = editorChipsAndNodeViewsDom7.options
        .map(
          (
            opt2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            opt: opt2,
            i: index,
          }),
        )
        .toSorted(
          (
            mappedOption?: Dynamic,
            mappedOption2?: Dynamic,
            ..._extraArguments: unknown[]
          ): number =>
            mappedOption.opt.order - mappedOption2.opt.order ||
            mappedOption.i - mappedOption2.i,
        );
      for (let {
        opt: loadEditorChipsAndNodeViewsDomResult3,
        i: loadEditorChipsAndNodeViewsDomResult4,
      } of toSorted as Dynamic) {
        if (
          (loadEditorChipsAndNodeViewsDomResult3.disabled &&
            loadEditorChipsAndNodeViewsDomResult4 !== context) ||
          (trimmedValue &&
            !loadEditorChipsAndNodeViewsDomResult3.name
              .toLowerCase()
              .includes(normalizedTrimmedValue))
        )
          continue;
        let editorChipsAndNodeViewsClassName3: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(
            `row` +
              (loadEditorChipsAndNodeViewsDomResult4 === context
                ? ` is-sel`
                : ``),
          );
        editorChipsAndNodeViewsClassName3.id = `${label}-opt-${loadEditorChipsAndNodeViewsDomResult4}`;
        editorChipsAndNodeViewsClassName3.setAttribute(`role`, `option`);
        editorChipsAndNodeViewsClassName3.setAttribute(
          `aria-selected`,
          `false`,
        );
        if (loadEditorChipsAndNodeViewsDomResult4 === context) {
          editorChipsAndNodeViewsClassName3.setAttribute(
            `aria-checked`,
            `true`,
          );
        }
        let element2 = document.createElement(`span`);
        element2.className = `dd-dot`;
        element2.style.setProperty(
          `--dd`,
          resolveEditorChipsAndNodeViewsStrong2(
            loadEditorChipsAndNodeViewsDomResult3,
            loadEditorChipsAndNodeViewsDomResult4,
          ),
        );
        editorChipsAndNodeViewsClassName3.append(element2);
        let element3 = document.createElement(`span`);
        element3.className = `lbl`;
        element3.textContent = loadEditorChipsAndNodeViewsDomResult3.name;
        editorChipsAndNodeViewsClassName3.append(element3);
        if (loadEditorChipsAndNodeViewsDomResult4 === context) {
          editorChipsAndNodeViewsClassName3.append(
            resolveEditorChipsAndNodeViewsValue2(`check`, 16),
          );
        }
        if (loadEditorChipsAndNodeViewsDomResult3.disabled) {
          editorChipsAndNodeViewsClassName3.style.opacity = `0.5`;
          editorChipsAndNodeViewsClassName3.setAttribute(
            `aria-disabled`,
            `true`,
          );
        } else {
          editorChipsAndNodeViewsClassName3.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              event.preventDefault();
              enabled3 = true;
              resolvePlatformAnnouncementsValue11(
                loadEditorChipsAndNodeViewsDomResult4,
                resolveEditorChipsAndNodeViewsButton(event) ? `key` : `pointer`,
              );
            },
          );
          editorChipsAndNodeViewsClassName3.addEventListener(
            `click`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let enabled5 = enabled3;
              enabled3 = false;
              if (
                event.detail === 0 &&
                editorChipsAndNodeViewsClassName3.isConnected &&
                !enabled5
              ) {
                resolvePlatformAnnouncementsValue11(
                  loadEditorChipsAndNodeViewsDomResult4,
                  `key`,
                );
              }
            },
          );
          lookup.set(
            editorChipsAndNodeViewsClassName3,
            (..._extraArguments: unknown[]) =>
              resolvePlatformAnnouncementsValue11(
                loadEditorChipsAndNodeViewsDomResult4,
                `key`,
              ),
          );
        }
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsClassName3,
        );
      }
      if (
        trimmedValue &&
        EditorChipsAndNodeViewsState9 !== null &&
        !editorChipsAndNodeViewsDom7.options.some(
          (option?: Dynamic, ..._extraArguments: unknown[]) =>
            option.name.toLowerCase() === normalizedTrimmedValue,
        )
      ) {
        let editorChipsAndNodeViewsButton3: Dynamic =
          resolveEditorChipsAndNodeViewsButton3(`crt`);
        editorChipsAndNodeViewsButton3.append(
          resolveEditorChipsAndNodeViewsValue2(`plus`, 16),
        );
        let element2 = document.createElement(`span`);
        element2.textContent = `Create`;
        editorChipsAndNodeViewsButton3.append(element2);
        let element3 = document.createElement(`span`);
        element3.className = `pv`;
        let element4 = document.createElement(`span`);
        element4.className = `dd-dot`;
        element4.style.setProperty(
          `--dd`,
          resolveEditorChipsAndNodeViewsStrong(
            editorChipsAndNodeViewsDom7.options.length,
          ),
        );
        element3.append(element4);
        let element5 = document.createElement(`span`);
        element5.className = `lbl`;
        element5.textContent = trimmedValue;
        element3.append(element5);
        editorChipsAndNodeViewsButton3.append(element3);
        editorChipsAndNodeViewsButton3.addEventListener(
          `mousedown`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            event.preventDefault();
            enabled3 = true;
            result2(
              resolveEditorChipsAndNodeViewsButton(event) ? `key` : `pointer`,
            );
          },
        );
        editorChipsAndNodeViewsButton3.addEventListener(
          `click`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let enabled5 = enabled3;
            enabled3 = false;
            if (
              event.detail === 0 &&
              editorChipsAndNodeViewsButton3.isConnected &&
              !enabled5
            ) {
              result2(`key`);
            }
          },
        );
        editorChipsAndNodeViewsButton3.id = `${label}-create`;
        editorChipsAndNodeViewsButton3.setAttribute(`role`, `option`);
        editorChipsAndNodeViewsButton3.setAttribute(`aria-selected`, `false`);
        editorChipsAndNodeViewsButton3.tabIndex = -1;
        lookup.set(
          editorChipsAndNodeViewsButton3,
          (..._extraArguments: unknown[]) => result2(`key`),
        );
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsButton3,
        );
      }
      if (!trimmedValue && editorChipsAndNodeViewsDom7.options.length === 0) {
        let editorChipsAndNodeViewsClassName3: Dynamic =
          resolveEditorChipsAndNodeViewsClassName(`emp`);
        editorChipsAndNodeViewsClassName3.textContent = `No options yet — type to add one.`;
        editorChipsAndNodeViewsClassName3.id = `${label}-empty`;
        editorChipsAndNodeViewsClassName3.setAttribute(`role`, `option`);
        editorChipsAndNodeViewsClassName3.setAttribute(`aria-disabled`, `true`);
        editorChipsAndNodeViewsClassName2.append(
          editorChipsAndNodeViewsClassName3,
        );
      }
    };
    element.addEventListener(`input`, append);
    let loadEditorChipsAndNodeViewsDomResult2: Dynamic = null;
    let loadEditorChipsAndNodeViewsDomHandler: Dynamic = (
      editorChipsAndNodeViewsDom12?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      !editorChipsAndNodeViewsDom12.altKey &&
      !editorChipsAndNodeViewsDom12.ctrlKey &&
      !editorChipsAndNodeViewsDom12.metaKey;
    let observabilityTelemetrySet29: Dynamic = (
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (loadEditorChipsAndNodeViewsDomResult !== null)
        return lookup.get(loadEditorChipsAndNodeViewsDomResult)?.();
      toLowerCase();
    };
    element.addEventListener(
      `keydown`,
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!(event.isComposing || event.keyCode === 229)) {
          if (event.key === `Enter`) {
            event.preventDefault();
            if (event.repeat || !resolveEditorChipsAndNodeViewsIsTrusted(event))
              return;
            if (event.metaKey) return observabilityTelemetrySet29();
            loadEditorChipsAndNodeViewsDomResult2 = `enter`;
            return;
          }
          if (
            (event.key === `ArrowDown` || event.key === `ArrowUp`) &&
            loadEditorChipsAndNodeViewsDomHandler(event) &&
            !event.shiftKey
          ) {
            event.preventDefault();
            indexOf(event.key === `ArrowDown` ? 1 : -1);
            return;
          }
          if (event.key === `Home` || event.key === `End`)
            return getBoundingClientRect(null);
          if (
            event.key === `Tab` &&
            result &&
            loadEditorChipsAndNodeViewsDomHandler(event) &&
            (event.shiftKey ||
              editorChipsAndNodeViewsDom8.querySelector(`.ftbtn`) === null)
          ) {
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat) {
              loadEditorChipsAndNodeViewsDomResult2 = event.shiftKey
                ? `shiftTab`
                : `tab`;
            }
          }
        }
      },
    );
    element.addEventListener(
      `keyup`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          loadEditorChipsAndNodeViewsDomResult2 === `enter` &&
          event.key === `Enter`
        ) {
          loadEditorChipsAndNodeViewsDomResult2 = null;
          event.preventDefault();
          if (resolveEditorChipsAndNodeViewsIsTrusted(event)) {
            observabilityTelemetrySet29();
          }
        } else {
          if (
            (loadEditorChipsAndNodeViewsDomResult2 === `tab` ||
              loadEditorChipsAndNodeViewsDomResult2 === `shiftTab`) &&
            event.key === `Tab`
          ) {
            loadEditorChipsAndNodeViewsDomResult2 = null;
            editorChipsAndNodeViewsDom10();
          }
        }
      },
    );
    element.addEventListener(
      `blur`,
      (..._extraArguments: unknown[]): undefined => {
        loadEditorChipsAndNodeViewsDomResult2 = null;
      },
    );
    let toLowerCase = (..._extraArguments: unknown[]): undefined => {
      let normalizedTrimmedValue = element.value.trim().toLowerCase();
      let optionIndex: Dynamic =
        normalizedTrimmedValue === ``
          ? -1
          : editorChipsAndNodeViewsDom7.options.findIndex(
              (option?: Dynamic, ..._extraArguments: unknown[]) =>
                option.name.toLowerCase() === normalizedTrimmedValue,
            );
      if (optionIndex >= 0) {
        if (!editorChipsAndNodeViewsDom7.options[optionIndex].disabled) {
          if (optionIndex !== context) {
            dependencies(optionIndex);
          }
          editorChipsAndNodeViewsDom10();
        }
        return;
      }
      result2(`key`);
    };
    append();
    if (
      EditorChipsAndNodeViewsState9 !== null &&
      editorChipsAndNodeViewsDom7.options.length > 0
    ) {
      let editorChipsAndNodeViewsClassName3: Dynamic =
        resolveEditorChipsAndNodeViewsClassName(`ft`);
      let editorChipsAndNodeViewsButton3: Dynamic =
        resolveEditorChipsAndNodeViewsButton3(`ftbtn`);
      editorChipsAndNodeViewsButton3.append(
        resolveEditorChipsAndNodeViewsValue2(`pencil`, 16),
      );
      let element2 = document.createElement(`span`);
      element2.textContent = `Edit options`;
      editorChipsAndNodeViewsButton3.append(element2);
      editorChipsAndNodeViewsClassName3.append(editorChipsAndNodeViewsButton3);
      editorChipsAndNodeViewsDom8.append(editorChipsAndNodeViewsClassName3);
      let enabled5 = false;
      editorChipsAndNodeViewsButton3.addEventListener(
        `keydown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            !(
              event.key !== `Tab` ||
              event.shiftKey ||
              !result ||
              !loadEditorChipsAndNodeViewsDomHandler(event)
            )
          ) {
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat) {
              enabled5 = true;
            }
          }
        },
      );
      editorChipsAndNodeViewsButton3.addEventListener(
        `keyup`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!(!enabled5 || event.key !== `Tab`)) {
            enabled5 = false;
            editorChipsAndNodeViewsDom10();
          }
        },
      );
      editorChipsAndNodeViewsButton3.addEventListener(
        `blur`,
        (..._extraArguments: unknown[]): undefined => {
          enabled5 = false;
        },
      );
      editorChipsAndNodeViewsButton3.addEventListener(
        `click`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          enabled2 = true;
          editorChipsAndNodeViewsDom8.textContent = ``;
          let optionsCount: Dynamic =
            editorChipsAndNodeViewsDom7.options.length;
          let lookup2: Dynamic = new (Map as Dynamic)(
            editorChipsAndNodeViewsDom7.options
              .map(
                (
                  option?: Dynamic,
                  index?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  o: option,
                  i: index,
                }),
              )
              .toSorted(
                (
                  mappedOption?: Dynamic,
                  mappedOption2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): number =>
                  mappedOption.o.order - mappedOption2.o.order ||
                  mappedOption.i - mappedOption2.i,
              )
              .map(
                (
                  { i: i10 }: Dynamic,
                  index?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => [i10, index],
              ),
          );
          let record3: Dynamic = {
            name: editorChipsAndNodeViewsDom7.name,
            options: editorChipsAndNodeViewsDom7.options.map(
              (
                option?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                ...option,
                order: lookup2.get(index),
              }),
            ),
          };
          let editorChipsAndNodeViewsClassName4: Dynamic =
            resolveEditorChipsAndNodeViewsClassName(`hd2`);
          let editorChipsAndNodeViewsButton32: Dynamic =
            resolveEditorChipsAndNodeViewsButton3(`backbtn`);
          editorChipsAndNodeViewsButton32.append(
            resolveEditorChipsAndNodeViewsValue2(`arrowLeft`, 16),
          );
          editorChipsAndNodeViewsButton32.dataset.tip = `Back`;
          editorChipsAndNodeViewsButton32.setAttribute(`aria-label`, `Back`);
          editorChipsAndNodeViewsButton32.addEventListener(
            `click`,
            (..._extraArguments: unknown[]): undefined => {
              if (result) {
                editorChipsAndNodeViewsWeakSet.add(editorChipsAndNodeViewsDom2);
              }
              editorChipsAndNodeViewsDom9(`reopen`);
              editorChipsAndNodeViewsDom2.click();
            },
          );
          let element3 = document.createElement(`input`);
          element3.type = `text`;
          element3.value = record3.name;
          element3.placeholder = `Dropdown name`;
          element3.maxLength = 120;
          element3.addEventListener(
            `input`,
            (..._extraArguments: unknown[]): undefined => {
              record3.name = element3.value;
            },
          );
          editorChipsAndNodeViewsClassName4.append(
            editorChipsAndNodeViewsButton32,
            element3,
          );
          editorChipsAndNodeViewsDom8.append(editorChipsAndNodeViewsClassName4);
          let collectEditorChipsAndNodeViewsArrIdx2: Dynamic =
            collectEditorChipsAndNodeViewsArrIdx(record3, optionsCount);
          editorChipsAndNodeViewsDom8.append(
            collectEditorChipsAndNodeViewsArrIdx2,
          );
          let editorChipsAndNodeViewsClassName5: Dynamic =
            resolveEditorChipsAndNodeViewsClassName(`ft2`);
          let editorChipsAndNodeViewsButton33: Dynamic =
            resolveEditorChipsAndNodeViewsButton3(`donebtn`);
          editorChipsAndNodeViewsButton33.textContent = `Save`;
          let enabled6 = false;
          let enabled7 = false;
          editorChipsAndNodeViewsButton33.addEventListener(
            `keydown`,
            (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (
                !(
                  (event2.key !== `Enter` && event2.key !== ` `) ||
                  !loadEditorChipsAndNodeViewsDomHandler(event2) ||
                  event2.isComposing
                )
              ) {
                event2.preventDefault();
                if (
                  !event2.repeat &&
                  resolveEditorChipsAndNodeViewsIsTrusted(event2)
                ) {
                  enabled7 = true;
                }
              }
            },
          );
          editorChipsAndNodeViewsButton33.addEventListener(
            `keyup`,
            (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (
                !(!enabled7 || (event2.key !== `Enter` && event2.key !== ` `))
              ) {
                enabled7 = false;
                event2.preventDefault();
                if (resolveEditorChipsAndNodeViewsIsTrusted(event2)) {
                  result3(`key`);
                }
              }
            },
          );
          editorChipsAndNodeViewsButton33.addEventListener(
            `blur`,
            (..._extraArguments: unknown[]): undefined => {
              enabled7 = false;
            },
          );
          editorChipsAndNodeViewsButton33.addEventListener(
            `click`,
            (event2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result3(event2.detail === 0 ? `key` : `pointer`),
          );
          let result3: Dynamic = (
            editorChipsAndNodeViewsDom12?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editorChipsAndNodeViewsDom13: Dynamic = (
              ..._extraArguments: unknown[]
            ): Dynamic =>
              editorChipsAndNodeViewsDom12 === `key`
                ? editorChipsAndNodeViewsDom10()
                : editorChipsAndNodeViewsDom9(`pointer`);
            if (enabled6) return;
            let expectLen: Dynamic = optionsCount;
            let options3: Dynamic = record3.options
              .map(
                (
                  option?: Dynamic,
                  index?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  ...option,
                  name:
                    option.name.trim() ||
                    (index < expectLen
                      ? editorChipsAndNodeViewsDom7.options[index].name
                      : ``),
                  ...(index >= expectLen && option.color === undefined
                    ? {
                        color: resolveEditorChipsAndNodeViewsColor(
                          option,
                          index,
                        ),
                      }
                    : {}),
                }),
              )
              .filter(
                (
                  mappedOption?: Dynamic,
                  index?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => index < expectLen || mappedOption.name !== ``,
              );
            let lookup3: Dynamic = new (Map as Dynamic)(
              options3
                .map(
                  (
                    option?: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    o: option,
                    i: index,
                  }),
                )
                .toSorted(
                  (
                    mappedOption?: Dynamic,
                    mappedOption2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): number =>
                    mappedOption.o.order - mappedOption2.o.order ||
                    mappedOption.i - mappedOption2.i,
                )
                .map(
                  (
                    { o: o10 }: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => [o10, index],
                ),
            );
            for (let [
              loadEditorChipsAndNodeViewsDomResult3,
              loadEditorChipsAndNodeViewsDomResult4,
            ] of lookup3 as Dynamic)
              loadEditorChipsAndNodeViewsDomResult3.order =
                loadEditorChipsAndNodeViewsDomResult4;
            let record4: Dynamic = {
              name: record3.name.trim() || editorChipsAndNodeViewsDom7.name,
              options: options3,
            };
            if (EditorChipsAndNodeViewsState9 === null)
              return editorChipsAndNodeViewsDom13();
            enabled6 = true;
            (async (..._extraArguments: unknown[]): Promise<undefined> => {
              if (
                await EditorChipsAndNodeViewsState9.update(options, {
                  kind: `replace`,
                  value: record4,
                  expectLen: expectLen,
                  base: {
                    name: editorChipsAndNodeViewsDom7.name,
                    options: editorChipsAndNodeViewsDom7.options,
                  },
                })
              ) {
                resolveEditorChipsAndNodeViewsValue12();
                resolveEditorChipsAndNodeViewsValue13();
                editorChipsAndNodeViewsDom13();
                return;
              }
              resolveEditorChipsAndNodeViewsValue12();
              editorChipsAndNodeViewsButton33.textContent = `Save failed — retry`;
            })().finally((..._extraArguments: unknown[]): undefined => {
              enabled6 = false;
            });
          };
          editorChipsAndNodeViewsClassName5.append(
            editorChipsAndNodeViewsButton33,
          );
          editorChipsAndNodeViewsDom8.append(editorChipsAndNodeViewsClassName5);
          if (event.detail === 0) {
            element3.focus({
              preventScroll: true,
            });
          }
        },
      );
    }
    editorChipsAndNodeViewsDom8.addEventListener(
      `keydown`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          !enabled2 ||
          !result ||
          event.key !== `Tab` ||
          !loadEditorChipsAndNodeViewsDomHandler(event)
        )
          return;
        let filteredItems: Dynamic = [
          ...editorChipsAndNodeViewsDom8.querySelectorAll(`button, input`),
        ].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            !item.disabled &&
            item.tabIndex >= 0 &&
            item.getClientRects().length > 0,
        );
        let filteredItemItem: Dynamic = filteredItems[0];
        let at2: Dynamic = filteredItems.at(-1);
        if (!filteredItemItem || !at2) return;
        let activeElement2 = document.activeElement;
        if (
          !(event.shiftKey
            ? activeElement2 !== filteredItemItem
            : activeElement2 !== at2)
        ) {
          event.preventDefault();
          (event.shiftKey ? at2 : filteredItemItem).focus({
            preventScroll: true,
          });
        }
      },
    );
    let focus2: Dynamic = (..._extraArguments: unknown[]) => {
      let element2: Dynamic = element.isConnected
        ? element
        : editorChipsAndNodeViewsDom8.querySelector(`.hd2 input`);
      element2?.focus({
        preventScroll: true,
      });
      let matchesElement =
        element2 !== null && element2.ownerDocument.activeElement === element2;
      if (matchesElement) {
        result = true;
      }
      return matchesElement;
    };
    editorChipsAndNodeViewsWeakMap7.set(editorChipsAndNodeViewsDom2, focus2);
    element.focus({
      preventScroll: true,
    });
    return element;
  };
  editorChipsAndNodeViewsDom3(
    editorChipsAndNodeViewsDom2,
    `click`,
    (
      editorChipsAndNodeViewsDom7?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        editorChipsAndNodeViewsDom7.button === 0 &&
        editorChipsAndNodeViewsDom7.detail <= 1 &&
        !editorChipsAndNodeViewsDom7.shiftKey &&
        !editorChipsAndNodeViewsDom7.metaKey &&
        !editorChipsAndNodeViewsDom7.ctrlKey &&
        !editorChipsAndNodeViewsDom7.altKey
      ) {
        dispatch();
      }
      let editorChipsAndNodeViewsWeakMapEntry: Dynamic =
        editorChipsAndNodeViewsWeakMap.get(editorChipsAndNodeViewsDom2);
      if (editorChipsAndNodeViewsWeakMapEntry)
        return editorChipsAndNodeViewsWeakMapEntry();
      let editorChipsAndNodeViewsButton2: Dynamic =
        resolveEditorChipsAndNodeViewsButton2(editorChipsAndNodeViewsDom7);
      loadEditorChipsAndNodeViewsFind(options).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            !enabled ||
            result === null ||
            editorChipsAndNodeViewsWeakMap.get(editorChipsAndNodeViewsDom2)
          ) {
            editorChipsAndNodeViewsWeakSet.delete(editorChipsAndNodeViewsDom2);
            return;
          }
          focus(result, editorChipsAndNodeViewsButton2);
        },
      );
    },
  );
  let record2: Dynamic = {
    open: (..._extraArguments: unknown[]): Dynamic => {
      let editorChipsAndNodeViewsWeakMap7Entry: Dynamic =
        editorChipsAndNodeViewsWeakMap7.get(editorChipsAndNodeViewsDom2);
      if (editorChipsAndNodeViewsWeakMap7Entry)
        return editorChipsAndNodeViewsWeakMap7Entry();
      if (editorChipsAndNodeViewsWeakMap.get(editorChipsAndNodeViewsDom2))
        return false;
      let editorChipsAndNodeViewsFind2: Dynamic =
        resolveEditorChipsAndNodeViewsFind2(options);
      if (
        !enabled ||
        !editorChipsAndNodeViewsDom5.isEditable ||
        editorChipsAndNodeViewsFind2 === null
      )
        return false;
      let focus2: Dynamic = focus(editorChipsAndNodeViewsFind2, true);
      return focus2.ownerDocument.activeElement === focus2;
    },
    canOpen: (..._extraArguments: unknown[]): Dynamic =>
      enabled &&
      editorChipsAndNodeViewsDom5.isEditable &&
      resolveEditorChipsAndNodeViewsFind2(options) !== null,
  };
  editorChipsAndNodeViewsWeakMap6.set(editorChipsAndNodeViewsDom2, record2);
  return (..._extraArguments: unknown[]): undefined => {
    enabled = false;
    editorChipsAndNodeViewsSet7.delete(loadEditorChipsAndNodeViewsFind2);
    if (
      editorChipsAndNodeViewsWeakMap6.get(editorChipsAndNodeViewsDom2) ===
      record2
    ) {
      editorChipsAndNodeViewsWeakMap6.delete(editorChipsAndNodeViewsDom2);
    }
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorChipsAndNodeViews2Step1(): void {
  collectEditorChipsAndNodeViewsInline({
    name: `chipDropdown`,
    attrs: {
      typeRef: {
        default: null,
      },
      value: {
        default: null,
      },
      name: {
        default: ``,
      },
      options: {
        default: `[]`,
      },
    },
    render(callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let {
        dom: callback2,
        attrs: callback3,
        editor: callback4,
        on: callback5,
      }: Dynamic = callback;
      let name: Dynamic =
        typeof callback3.typeRef == `string` ? callback3.typeRef : null;
      let collectEditorExtensionsAuto2: Dynamic = collectEditorExtensionsAuto(
        callback3.options,
      );
      if (name && !collectEditorExtensionsAuto2.length) {
        delete callback2.dataset.dd;
        delete callback2.dataset.empty;
        let editorChipsAndNodeViewsWatch: Dynamic =
          resolveEditorChipsAndNodeViewsWatch();
        if (typeof editorChipsAndNodeViewsWatch?.watch != `function`) {
          resolveEditorChipsAndNodeViewsSpan2(callback2, `⚠ ${name}`);
          callback2.append(resolveEditorChipsAndNodeViewsCaretDown());
          return;
        }
        let items: Dynamic = [];
        let enabled = false;
        let enabled2 = false;
        let append = (..._extraArguments: unknown[]): undefined => {
          callback2.textContent = ``;
          if (enabled2) {
            resolveEditorChipsAndNodeViewsSpan2(callback2, `⚠ ${name}`);
            callback2.append(resolveEditorChipsAndNodeViewsCaretDown());
            return;
          }
          let item: Dynamic =
            items.find(
              (item2?: Dynamic, ..._extraArguments: unknown[]) =>
                item2.l === callback3.value,
            ) ?? items[0];
          if (item) {
            callback2.append(resolveEditorChipsAndNodeViewsSpan3(item.c));
          }
          resolveEditorChipsAndNodeViewsSpan2(callback2, item?.l ?? `…`);
          callback2.append(resolveEditorChipsAndNodeViewsCaretDown());
        };
        resolveEditorChipsAndNodeViewsSpan2(callback2, `…`);
        callback2.append(resolveEditorChipsAndNodeViewsCaretDown());
        let watch: Dynamic = editorChipsAndNodeViewsWatch.watch(
          `type:${name}`,
          (callback6?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (
              callback6 &&
              typeof callback6 == `object` &&
              Array.isArray(callback6.enum)
            ) {
              items = collectEditorChipsAndNodeViewsXDisplay(callback6);
              enabled2 = false;
            } else {
              items = [];
              enabled2 = true;
            }
            enabled = true;
            append();
          },
        );
        callback5(
          callback2,
          `click`,
          (..._extraArguments: unknown[]): Dynamic => {
            if (!callback4.isEditable || !enabled) return;
            let editorChipsAndNodeViewsWeakMapEntry: Dynamic =
              editorChipsAndNodeViewsWeakMap.get(callback2);
            if (editorChipsAndNodeViewsWeakMapEntry)
              return editorChipsAndNodeViewsWeakMapEntry();
            let options: Dynamic = items.map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                id: resolveEditorExtensionsValue14(),
                l: item.l,
                c: resolveEditorExtensionsGray(item.c),
                auto: false,
              }),
            );
            updateEditorChipsAndNodeViewsDom2(callback, {
              name: name,
              options: options,
              value:
                options.find(
                  (option?: Dynamic, ..._extraArguments: unknown[]) =>
                    option.l === callback3.value,
                )?.id ?? null,
            });
          },
        );
        return watch;
      }
      callback2.dataset.dd = `true`;
      let editorExtensionsFind: Dynamic = resolveEditorExtensionsFind(
        collectEditorExtensionsAuto2,
        callback3.value,
      );
      if (editorExtensionsFind) {
        delete callback2.dataset.empty;
        callback2.append(
          resolveEditorChipsAndNodeViewsSpan4(editorExtensionsFind.c),
        );
        resolveEditorChipsAndNodeViewsSpan2(
          callback2,
          editorExtensionsFind.l || `…`,
        );
      } else {
        callback2.dataset.empty = `true`;
        let element = document.createElement(`span`);
        element.className = `dd-ring`;
        callback2.append(element);
        resolveEditorChipsAndNodeViewsSpan2(
          callback2,
          collectEditorExtensionsAuto2.length ? `Empty` : `Select`,
        );
      }
      callback2.append(resolveEditorChipsAndNodeViewsCaretDown());
      callback5(callback2, `click`, (..._extraArguments: unknown[]): Dynamic => {
        let editorChipsAndNodeViewsWeakMapEntry: Dynamic =
          editorChipsAndNodeViewsWeakMap.get(callback2);
        if (editorChipsAndNodeViewsWeakMapEntry)
          return editorChipsAndNodeViewsWeakMapEntry();
        updateEditorChipsAndNodeViewsDom2(callback);
      });
      if (
        callback4.isEditable &&
        !collectEditorExtensionsAuto2.length &&
        callback3.value == null &&
        !callback3.name &&
        resolveEditorChipsAndNodeViewsValue9()
      ) {
        resolveEditorExtensionsValue12().schedule(
          (..._extraArguments: unknown[]): Dynamic =>
            callback2.isConnected && callback2.click(),
          0,
        );
      }
    },
  });
  (resolveEditorChipsAndNodeViewsAnon = (
    ..._extraArguments: unknown[]
  ) => {
    let globalThis2: Dynamic = globalThis;
    let LfileViewer: Dynamic =
      globalThis2.__lfileViewer ??
      globalThis2.claude?.ctx?.user?.email ??
      globalThis2.claude?.ctx?.user?.name;
    return typeof LfileViewer == `string` && LfileViewer && LfileViewer !== `anon`
      ? LfileViewer
      : null;
  });
  (filterEditorChipsAndNodeViewsVoters = (
    filterEditorChipsAndNodeViewsVoters2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(filterEditorChipsAndNodeViewsVoters2.voters)
      ? filterEditorChipsAndNodeViewsVoters2.voters.filter(
          (voter?: unknown, ..._extraArguments: unknown[]) =>
            typeof voter == `string`,
        )
      : []);
  collectEditorChipsAndNodeViewsInline({
    name: `chipVote`,
    attrs: {
      voters: {
        default: [],
      },
    },
    render(
      { dom: dom, attrs: attrs, setAttrs: setAttrs, on: on2 }: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let filterEditorChipsAndNodeViewsVoters2: Dynamic =
        filterEditorChipsAndNodeViewsVoters(attrs);
      let editorChipsAndNodeViewsAnon: Dynamic =
        resolveEditorChipsAndNodeViewsAnon();
      dom.dataset.voted = String(
        editorChipsAndNodeViewsAnon !== null &&
          filterEditorChipsAndNodeViewsVoters2.includes(
            editorChipsAndNodeViewsAnon,
          ),
      );
      resolveEditorChipsAndNodeViewsSpan(dom, `👍`);
      resolveEditorChipsAndNodeViewsSpan2(
        dom,
        String(filterEditorChipsAndNodeViewsVoters2.length),
        `n`,
      );
      dom.dataset.tip =
        editorChipsAndNodeViewsAnon !== null &&
        filterEditorChipsAndNodeViewsVoters2.includes(editorChipsAndNodeViewsAnon)
          ? `You voted — click to remove your vote`
          : `Vote`;
      on2(dom, `click`, (..._extraArguments: unknown[]): undefined => {
        let editorChipsAndNodeViewsAnon2: Dynamic =
          resolveEditorChipsAndNodeViewsAnon();
        if (editorChipsAndNodeViewsAnon2 !== null) {
          setAttrs({
            voters: filterEditorChipsAndNodeViewsVoters2.includes(
              editorChipsAndNodeViewsAnon2,
            )
              ? filterEditorChipsAndNodeViewsVoters2.filter(
                  (
                    filterEditorChipsAndNodeViewsVoter?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) =>
                    filterEditorChipsAndNodeViewsVoter !==
                    editorChipsAndNodeViewsAnon2,
                )
              : [
                  ...filterEditorChipsAndNodeViewsVoters2,
                  editorChipsAndNodeViewsAnon2,
                ],
          });
        }
      });
    },
  });
  (editorChipsAndNodeViewsMap10 = new (Map as Dynamic)());
  (editorChipsAndNodeViewsSet5 = new (Set as Dynamic)());
  (EditorChipsAndNodeViewsHits = Promise.resolve({
    hits: [],
  }));
  (updateEditorChipsAndNodeViewsKind2 = (
    principal?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorChipsAndNodeViewsMap10Entry: Dynamic =
      editorChipsAndNodeViewsMap10.get(principal);
    if (editorChipsAndNodeViewsMap10Entry)
      return editorChipsAndNodeViewsMap10Entry;
    let result: Dynamic = (
      editorChipsAndNodeViewsState2
        ? editorChipsAndNodeViewsState2(
            resolveEditorHostMention({
              kind: `mention`,
              principal: principal,
            }),
          )
        : EditorChipsAndNodeViewsHits
    )
      .then(
        ({ hits: hits }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          hits.find(
            (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownRImport2.id.toLowerCase() === principal.toLowerCase(),
          ) ?? null,
      )
      .catch((..._extraArguments: unknown[]) => null);
    editorChipsAndNodeViewsMap10.set(principal, result);
    result.then((result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!result2) {
        editorChipsAndNodeViewsMap10.delete(principal);
      }
    });
    return result;
  });
  (editorChipsAndNodeViewsValue280 = 280);
  (editorChipsAndNodeViewsValue220 = 220);
  (EditorChipsAndNodeViewsSlice = editorExtensionsGraySkyMineralOliveValues.slice(1));
  (resolveEditorChipsAndNodeViewsValue10 = (
    editorChipsAndNodeViewsValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    EditorChipsAndNodeViewsSlice[
      editorChipsAndNodeViewsValue10 % EditorChipsAndNodeViewsSlice.length
    ]);
  (resolveEditorChipsAndNodeViewsStrong = (
    editorChipsAndNodeViewsStrong?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    EditorExtensionsStrong[
      resolveEditorChipsAndNodeViewsValue10(editorChipsAndNodeViewsStrong)
    ].strong);
  (resolveEditorChipsAndNodeViewsColor = (
    editorChipsAndNodeViewsColor?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsToLowerCase(editorChipsAndNodeViewsColor.color) ??
    resolveEditorChipsAndNodeViewsValue10(options));
  (resolveEditorChipsAndNodeViewsStrong2 = (
    editorChipsAndNodeViewsStrong2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    EditorExtensionsStrong[
      resolveEditorChipsAndNodeViewsColor(editorChipsAndNodeViewsStrong2, options)
    ].strong);
  (EditorChipsAndNodeViewsState9 = null);
  (EditorChipsAndNodeViewsState10 = null);
  (editorChipsAndNodeViewsValues = []);
  (resolveEditorChipsAndNodeViewsFind = (
    editorChipsAndNodeViewsFind?: unknown,
    options?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof options != `number` ||
      typeof editorChipsAndNodeViewsFind != `string`
    )
      return ``;
    let name: Dynamic = editorChipsAndNodeViewsValues.find(
      (editorChipsAndNodeViewsValue?: Dynamic, ..._extraArguments: unknown[]) =>
        editorChipsAndNodeViewsValue.id === editorChipsAndNodeViewsFind,
    )?.options[options]?.name;
    return name ? resolveEditorExtensionsJoin(name) : ``;
  });
  (resolveEditorChipsAndNodeViewsValue11 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolveEditorChipsAndNodeViewsNoEnumOpsWired();
  });
  (resolveEditorChipsAndNodeViewsNoEnumOpsWired = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (EditorChipsAndNodeViewsState10) return EditorChipsAndNodeViewsState10;
    let then: Dynamic = (
      EditorChipsAndNodeViewsState9
        ? EditorChipsAndNodeViewsState9.list()
        : Promise.reject(Error(`no enum ops wired`))
    ).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (EditorChipsAndNodeViewsState10 === then) {
          editorChipsAndNodeViewsValues = result;
          for (let resolveEditorChipsAndNodeViewsNoEnumOpsWiredResult of editorChipsAndNodeViewsSet7 as Dynamic)
            resolveEditorChipsAndNodeViewsNoEnumOpsWiredResult();
        }
        return result;
      },
      (..._extraArguments: unknown[]): Dynamic => (
        EditorChipsAndNodeViewsState10 === then &&
          (EditorChipsAndNodeViewsState10 = null),
        []
      ),
    );
    return (EditorChipsAndNodeViewsState10 = then);
  });
  (resolveEditorChipsAndNodeViewsValue12 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    EditorChipsAndNodeViewsState10 = null;
    resolveEditorChipsAndNodeViewsValue11();
  });
  (editorChipsAndNodeViewsSet6 = new (Set as Dynamic)());
  (loadEditorChipsAndNodeViewsFind = async (
    editorChipsAndNodeViewsFind?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let editorChipsAndNodeViewsNoEnumOpsWired: Dynamic =
      resolveEditorChipsAndNodeViewsNoEnumOpsWired();
    let editorChipsAndNodeViewsNoEnumOpsWired2: Dynamic = (
      await editorChipsAndNodeViewsNoEnumOpsWired
    ).find(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownRImport2.id === editorChipsAndNodeViewsFind,
    );
    return editorChipsAndNodeViewsNoEnumOpsWired2 !== undefined ||
      editorChipsAndNodeViewsFind === ``
      ? (editorChipsAndNodeViewsNoEnumOpsWired2 ?? null)
      : (editorChipsAndNodeViewsSet6.has(editorChipsAndNodeViewsFind) ||
          (editorChipsAndNodeViewsSet6.add(editorChipsAndNodeViewsFind),
          EditorChipsAndNodeViewsState10 ===
            editorChipsAndNodeViewsNoEnumOpsWired &&
            resolveEditorChipsAndNodeViewsValue12()),
        (await resolveEditorChipsAndNodeViewsNoEnumOpsWired()).find(
          (
            editorChipsAndNodeViewsNoEnumOpsWired3?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            editorChipsAndNodeViewsNoEnumOpsWired3.id ===
            editorChipsAndNodeViewsFind,
        ) ?? null);
  });
  (resolveEditorChipsAndNodeViewsFind2 = (
    editorChipsAndNodeViewsFind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorChipsAndNodeViewsValues.find(
      (editorChipsAndNodeViewsValue?: Dynamic, ..._extraArguments: unknown[]) =>
        editorChipsAndNodeViewsValue.id === editorChipsAndNodeViewsFind2,
    ) ?? null);
  (editorChipsAndNodeViewsSet7 = new (Set as Dynamic)());
  (resolveEditorChipsAndNodeViewsValue13 = (
    ..._extraArguments: unknown[]
  ) => resolveEditorChipsAndNodeViewsValue12());
  (EditorChipsAndNodeViewsMessage = `You don’t have access to this document.`);
  (editorChipsAndNodeViewsWeakMap2 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakMap3 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsKeydownPointerdownMousedownTouchstartValues = [
    `keydown`,
    `pointerdown`,
    `mousedown`,
    `touchstart`,
  ]);
  (editorChipsAndNodeViewsSet8 = new (Set as Dynamic)([
    `Control`,
    `Shift`,
    `Alt`,
    `Meta`,
  ]));
  (editorChipsAndNodeViewsWeakMap4 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakMap5 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakMap6 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakMap7 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakMap8 = new (WeakMap as Dynamic)());
  (editorChipsAndNodeViewsWeakSet = new (WeakSet as Dynamic)());
  (editorChipsAndNodeViewsValue03 = 0);
  (resolveEditorChipsAndNodeViewsDom2 = (
    editorChipsAndNodeViewsDom2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let {
      dom: editorChipsAndNodeViewsDom22,
      attrs: editorChipsAndNodeViewsDom23,
      setAttrs: editorChipsAndNodeViewsDom24,
      on: editorChipsAndNodeViewsDom25,
      popover: editorChipsAndNodeViewsDom26,
    }: Dynamic = editorChipsAndNodeViewsDom2;
    let builtin: Dynamic = editorChipsAndNodeViewsDom23.builtin ?? null;
    switch (
      (editorChipsAndNodeViewsDom22.classList.add(`ldoc-chip`),
      editorChipsAndNodeViewsDom22.classList.remove(`ldoc-mention`),
      delete editorChipsAndNodeViewsDom22.dataset.checked,
      delete editorChipsAndNodeViewsDom22.dataset.mentionId,
      delete editorChipsAndNodeViewsDom22.dataset.restricted,
      builtin?.kind !== `ref` &&
        editorChipsAndNodeViewsDom22.removeAttribute(`tabindex`),
      (editorChipsAndNodeViewsDom22.dataset.builtin = JSON.stringify(
        builtin ?? null,
      )),
      builtin?.kind)
    ) {
      case `checkbox`:
        return resolveEditorChipsAndNodeViewsDom(
          editorChipsAndNodeViewsDom2,
          builtin.checked === true,
          (checked?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            editorChipsAndNodeViewsDom24({
              builtin: {
                ...builtin,
                checked: checked,
              },
            }),
        );
      case `date`:
        return updateEditorChipsAndNodeViewsDom(
          editorChipsAndNodeViewsDom2,
          typeof builtin.ts == `string` ? builtin.ts : ``,
          (
            editorChipsAndNodeViewsDom27?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorChipsAndNodeViewsDom24({
              builtin: {
                ...builtin,
                ts: editorChipsAndNodeViewsDom27,
              },
            }),
        );
      case `mention`: {
        let principal: Dynamic =
          typeof builtin.principal == `string` ? builtin.principal : ``;
        editorChipsAndNodeViewsDom22.classList.remove(`ldoc-chip`);
        editorChipsAndNodeViewsDom22.classList.add(`ldoc-mention`);
        if (principal) {
          editorChipsAndNodeViewsDom22.dataset.mentionId = principal;
        }
        let editorChipsAndNodeViewsSpan2: Dynamic =
          resolveEditorChipsAndNodeViewsSpan2(
            editorChipsAndNodeViewsDom22,
            resolveEditorHostMention(builtin),
          );
        if (principal) {
          updateEditorChipsAndNodeViewsKind(principal).then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (
                result !== null &&
                editorChipsAndNodeViewsSpan2.parentNode ===
                  editorChipsAndNodeViewsDom22
              ) {
                editorChipsAndNodeViewsSpan2.textContent =
                  resolveEditorExtensionsReplace(result);
              }
            },
          );
        }
        return clearEditorChipsAndNodeViewsPop(
          editorChipsAndNodeViewsDom22,
          principal,
          editorChipsAndNodeViewsDom25,
          editorChipsAndNodeViewsDom26,
        );
      }
      case `ref`:
        return updateEditorChipsAndNodeViewsLabel(
          editorChipsAndNodeViewsDom22,
          builtin.ref,
          editorChipsAndNodeViewsDom25,
        );
      case `enum`:
        return loadEditorChipsAndNodeViewsDom(
          editorChipsAndNodeViewsDom2,
          typeof builtin.enum == `string` ? builtin.enum : ``,
          typeof builtin.index == `number` ? builtin.index : null,
          (index?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let { index: builtin2, ...builtin3 }: Dynamic = builtin;
            editorChipsAndNodeViewsDom24({
              builtin:
                index === null
                  ? builtin3
                  : {
                      ...builtin3,
                      index: index,
                    },
            });
          },
        );
      default:
        resolveEditorChipsAndNodeViewsSpan2(editorChipsAndNodeViewsDom22, `◌`);
    }
  });
  (EditorChipsAndNodeViewsDropdownCleared = `Dropdown cleared`);
}

export {
  clearEditorChipsAndNodeViewsEscape,
  editorChipsAndNodeViewsWeakMap6,
  editorChipsAndNodeViewsWeakMap7,
  editorChipsAndNodeViewsWeakMap8,
  loadEditorChipsAndNodeViewsDom,
  resolveEditorChipsAndNodeViewsColor,
  resolveEditorChipsAndNodeViewsDom2,
  resolveEditorChipsAndNodeViewsFind,
  resolveEditorChipsAndNodeViewsFind2,
  resolveEditorChipsAndNodeViewsKind,
  resolveEditorChipsAndNodeViewsValue14,
  updateEditorChipsAndNodeViewsLabel,
};

/** BaoCut: editor anchors and mentions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  PluginKey,
  helloLImport,
} from "../../platform/dependencies";
import {
  resolveEditorExtensionsValue12,
} from "./extensions-2";
import {
  resolveEditorExtensionsChar,
} from "./extensions-5";
import {
  EditorAnchorsAndMentionsLabel,
  EditorAnchorsAndMentionsLabel2,
  EditorAnchorsAndMentionsMaster16,
  installEditorAnchorsAndMentionsMousedown,
  isEditorAnchorsAndMentionsBottom,
  isEditorAnchorsAndMentionsKey,
  resolveEditorAnchorsAndMentionsEscape,
  resolveEditorAnchorsAndMentionsExit,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsSpan,
  resolveEditorAnchorsAndMentionsTest,
  resolveEditorAnchorsAndMentionsValue3,
  resolveEditorAnchorsAndMentionsValue4,
  resolveEditorAnchorsAndMentionsValue5,
  updateEditorAnchorsAndMentionsCapture,
} from "./anchors-and-mentions-1";

function isEditorAnchorsAndMentionsLabel(
  editorAnchorsAndMentionsLabel?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let element = document.createElement(`div`);
  element.className = editorAnchorsAndMentionsLabel;
  let updateDensity = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (options?.density) {
      editorAnchorsAndMentionsLabel2.classList.add(`cds-root`);
      editorAnchorsAndMentionsLabel2.dataset.density = options.density;
    }
  };
  updateDensity(element);
  element.style.display = `none`;
  let count: number = 0;
  let items: Dynamic = [];
  let enabled = false;
  let enabled2 = false;
  let enabled3 = false;
  let enabled4 = false;
  let label: string = ``;
  let enabled5 = false;
  let enabled6 = false;
  let isEditorAnchorsAndMentionsLabelResult: Dynamic = null;
  let element2: Dynamic = null;
  let querySelector = (..._extraArguments: unknown[]): undefined => {
    let matchedElement: Dynamic =
      (items2?.length && !enabled7 ? element3 : element).querySelector(
        `[role=option][aria-selected="true"]`,
      ) ?? element.querySelector(`[role=option][aria-disabled]`);
    updateEditorAnchorsAndMentionsCapture6(element2, matchedElement);
  };
  let querySelector2 = (..._extraArguments: unknown[]): undefined => {
    enabled5 = true;
    cancel();
    removeEventListener2();
    element.style.display = `none`;
    items = [];
    enabled = enabled2 = enabled3 = false;
    updateEditorAnchorsAndMentionsCapture2(false);
    querySelector();
  };
  let isEditorAnchorsAndMentionsLabelResult2 = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (editorAnchorsAndMentionsLabel2 !== undefined) {
      querySelector2();
      isEditorAnchorsAndMentionsLabelResult?.(editorAnchorsAndMentionsLabel2);
    }
  };
  let renderRow: Dynamic =
    options?.renderRow ?? resolveEditorAnchorsAndMentionsSpan;
  let sectionOf: Dynamic = options?.sectionOf;
  let items2: Dynamic = null;
  let count2 = 0;
  let isEditorAnchorsAndMentionsLabelResult3: Dynamic = null;
  let enabled7: boolean = false;
  let isEditorAnchorsAndMentionsLabelResult4: Dynamic = null;
  let isEditorAnchorsAndMentionsLabelResult5: Dynamic = null;
  let isEditorAnchorsAndMentionsLabelResult6: Dynamic = null;
  let isEditorAnchorsAndMentionsLabelResult7: Dynamic = null;
  let items3: Dynamic = [];
  let isEditorAnchorsAndMentionsLabelResult8: number = -1;
  let element3 = document.createElement(`div`);
  element3.className = `${editorAnchorsAndMentionsLabel} submenu`;
  updateDensity(element3);
  element3.setAttribute(`role`, `listbox`);
  element3.style.display = `none`;
  let label2 = `more`;
  let updateScrollTop = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let offsetTop: Dynamic = options2.offsetTop;
    let total: Dynamic = offsetTop + options2.offsetHeight;
    if (offsetTop < editorAnchorsAndMentionsLabel2.scrollTop) {
      editorAnchorsAndMentionsLabel2.scrollTop = offsetTop;
    } else {
      if (
        total >
        editorAnchorsAndMentionsLabel2.scrollTop +
          editorAnchorsAndMentionsLabel2.clientHeight
      ) {
        editorAnchorsAndMentionsLabel2.scrollTop =
          total - editorAnchorsAndMentionsLabel2.clientHeight;
      }
    }
  };
  let sectionOf2: Dynamic = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    label: editorAnchorsAndMentionsLabel2.label,
    section: sectionOf?.(editorAnchorsAndMentionsLabel2) ?? null,
  });
  let cancel = (..._extraArguments: unknown[]): undefined => {
    if (isEditorAnchorsAndMentionsLabelResult4 !== null) {
      resolveEditorExtensionsValue12().cancel(
        isEditorAnchorsAndMentionsLabelResult4,
      );
    }
    isEditorAnchorsAndMentionsLabelResult4 = null;
    isEditorAnchorsAndMentionsLabelResult5 = null;
  };
  let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
    items2 = null;
    isEditorAnchorsAndMentionsLabelResult3 = null;
    enabled7 = false;
    isEditorAnchorsAndMentionsLabelResult7 = null;
    element3.style.display = `none`;
    element.querySelector(`.row.is-open`)?.classList.remove(`is-open`);
    element.ownerDocument.removeEventListener(`pointermove`, contains2, true);
  };
  let indexOf = (..._extraArguments: unknown[]): undefined => {
    cancel();
    enabled7 = false;
    count2 = 0;
    let submenu3: Dynamic =
      isEditorAnchorsAndMentionsLabelResult3 === null
        ? null
        : submenu(isEditorAnchorsAndMentionsLabelResult3);
    if (submenu3 !== null) {
      count = items.indexOf(submenu3.it);
    }
    append();
  };
  let querySelector3 = (..._extraArguments: unknown[]): undefined => {
    element3.textContent = ``;
    let isEditorAnchorsAndMentionsLabelResult11: Dynamic;
    (items2 ?? []).forEach(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let element4 = document.createElement(`div`);
        element4.className = `row` + (index === count2 ? ` is-sel` : ``);
        element4.id = updateEditorAnchorsAndMentionsCapture5(
          index,
          item.label,
          label2,
        );
        element4.setAttribute(`role`, `option`);
        element4.setAttribute(`aria-selected`, String(index === count2));
        if (index === count2) {
          isEditorAnchorsAndMentionsLabelResult11 = element4;
        }
        element4.addEventListener(
          `mousedown`,
          (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            event.preventDefault(),
        );
        renderRow(item, element4);
        element3.append(element4);
      },
    );
    if (isEditorAnchorsAndMentionsLabelResult11) {
      updateScrollTop(element3, isEditorAnchorsAndMentionsLabelResult11);
    }
    querySelector();
  };
  let getBoundingClientRect = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    dependencies: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (items2 === options2) {
      if (enabled7 && !dependencies) {
        indexOf();
      }
      return;
    }
    removeEventListener2();
    items2 = options2;
    enabled7 = dependencies;
    count2 = dependencies ? -1 : 0;
    isEditorAnchorsAndMentionsLabelResult3 = sectionOf2(
      editorAnchorsAndMentionsLabel2,
    );
    context.classList.add(`is-open`);
    if (dependencies) {
      element.ownerDocument.addEventListener(`pointermove`, contains2, true);
    }
    isEditorAnchorsAndMentionsLabelResult7 =
      dependencies && isEditorAnchorsAndMentionsLabelResult6
        ? {
            ax: isEditorAnchorsAndMentionsLabelResult6.x,
            ay: isEditorAnchorsAndMentionsLabelResult6.y,
            x: isEditorAnchorsAndMentionsLabelResult6.x,
          }
        : null;
    element3.setAttribute(
      `aria-label`,
      isEditorAnchorsAndMentionsLabelResult3.section ??
        editorAnchorsAndMentionsLabel2.label,
    );
    if (!element3.isConnected) {
      document.body.append(element3);
    }
    querySelector3();
    element3.style.visibility = `hidden`;
    element3.style.display = `block`;
    let innerWidth = window.innerWidth || 0;
    let innerHeight = window.innerHeight || 0;
    let elementBounds = element.getBoundingClientRect();
    let contextBounds: Dynamic = context.getBoundingClientRect();
    let total = elementBounds.right + 2;
    if (total + element3.offsetWidth > innerWidth - 4) {
      total = Math.max(4, elementBounds.left - element3.offsetWidth - 2);
    }
    let max = Math.max(
      4,
      Math.min(contextBounds.top - 4, innerHeight - 4 - element3.offsetHeight),
    );
    element3.style.left = `${total}px`;
    element3.style.top = `${max}px`;
    element3.style.visibility = ``;
  };
  let querySelector4: Dynamic = (..._extraArguments: unknown[]) => {
    let submenu3: Dynamic = options?.submenu?.(items[count]) ?? null;
    let matchedElement: Dynamic = element.querySelector(`.row.is-sel`);
    return !submenu3?.length || !matchedElement
      ? false
      : (cancel(),
        getBoundingClientRect(items[count], submenu3, matchedElement),
        true);
  };
  let submenu: Dynamic = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let index = 0; index < items.length; index++) {
      let items4: Dynamic = options?.submenu?.(items[index]) ?? null;
      let row: Dynamic = items3[index];
      if (!items4?.length || row === undefined) continue;
      let sectionOf4: Dynamic = sectionOf2(items[index]);
      if (
        sectionOf4.label === editorAnchorsAndMentionsLabel2.label &&
        sectionOf4.section === editorAnchorsAndMentionsLabel2.section
      )
        return {
          it: items[index],
          items: items4,
          row: row,
        };
    }
    return null;
  };
  let isEditorAnchorsAndMentionsLabelHandler: Dynamic = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (editorAnchorsAndMentionsLabel2.pointerType === `touch`) return false;
    let isEditorAnchorsAndMentionsLabelResult11: Dynamic =
      isEditorAnchorsAndMentionsLabelResult6;
    isEditorAnchorsAndMentionsLabelResult6 = {
      x: editorAnchorsAndMentionsLabel2.clientX,
      y: editorAnchorsAndMentionsLabel2.clientY,
    };
    return (
      isEditorAnchorsAndMentionsLabelResult11 !== null &&
      (isEditorAnchorsAndMentionsLabelResult11.x !==
        isEditorAnchorsAndMentionsLabelResult6.x ||
        isEditorAnchorsAndMentionsLabelResult11.y !==
          isEditorAnchorsAndMentionsLabelResult6.y)
    );
  };
  let getBoundingClientRect2: Dynamic = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (isEditorAnchorsAndMentionsLabelResult7 === null || !items2?.length)
      return false;
    let elementBounds = element3.getBoundingClientRect();
    let matchesLeft =
      elementBounds.left >= element.getBoundingClientRect().left;
    let isEditorAnchorsAndMentionsBottom2 =
      isEditorAnchorsAndMentionsBottom(
        {
          x: editorAnchorsAndMentionsLabel2.clientX,
          y: editorAnchorsAndMentionsLabel2.clientY,
        },
        {
          x: isEditorAnchorsAndMentionsLabelResult7.ax,
          y: isEditorAnchorsAndMentionsLabelResult7.ay,
        },
        {
          x: matchesLeft ? elementBounds.left : elementBounds.right,
          top: elementBounds.top,
          bottom: elementBounds.bottom,
        },
      ) &&
      (editorAnchorsAndMentionsLabel2.clientX -
        isEditorAnchorsAndMentionsLabelResult7.x) *
        (matchesLeft ? 1 : -1) >=
        -2;
    if (isEditorAnchorsAndMentionsBottom2) {
      isEditorAnchorsAndMentionsLabelResult7.x = matchesLeft
        ? Math.max(
            isEditorAnchorsAndMentionsLabelResult7.x,
            editorAnchorsAndMentionsLabel2.clientX,
          )
        : Math.min(
            isEditorAnchorsAndMentionsLabelResult7.x,
            editorAnchorsAndMentionsLabel2.clientX,
          );
    } else {
      isEditorAnchorsAndMentionsLabelResult7 = null;
    }
    return isEditorAnchorsAndMentionsBottom2;
  };
  let schedule = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let sectionOf4: Dynamic = sectionOf2(editorAnchorsAndMentionsLabel2);
    if (
      !(
        isEditorAnchorsAndMentionsLabelResult4 !== null &&
        isEditorAnchorsAndMentionsLabelResult5?.label === sectionOf4.label &&
        isEditorAnchorsAndMentionsLabelResult5.section === sectionOf4.section
      )
    ) {
      cancel();
      isEditorAnchorsAndMentionsLabelResult5 = sectionOf4;
      isEditorAnchorsAndMentionsLabelResult4 =
        resolveEditorExtensionsValue12().schedule(
          (..._extraArguments: unknown[]): undefined => {
            let isEditorAnchorsAndMentionsLabelResult11: Dynamic =
              isEditorAnchorsAndMentionsLabelResult5;
            isEditorAnchorsAndMentionsLabelResult4 = null;
            isEditorAnchorsAndMentionsLabelResult5 = null;
            if (
              isEditorAnchorsAndMentionsLabelResult11 === null ||
              enabled5 ||
              element.style.display === `none`
            )
              return;
            let submenu3: Dynamic = submenu(
              isEditorAnchorsAndMentionsLabelResult11,
            );
            if (!(submenu3 === null || items2 === submenu3.items)) {
              getBoundingClientRect(
                submenu3.it,
                submenu3.items,
                submenu3.row,
                true,
              );
            }
          },
          100,
        );
    }
  };
  let submenu2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let closest: Dynamic = event.target?.closest?.(`.row`) ?? null;
    let itemIndex: Dynamic = closest === null ? -1 : items3.indexOf(closest);
    let matchesIsEditorAnchorsAndMentionsLabelResult =
      isEditorAnchorsAndMentionsLabelResult8 !== -2 &&
      itemIndex !== isEditorAnchorsAndMentionsLabelResult8;
    isEditorAnchorsAndMentionsLabelResult8 = itemIndex;
    if (!isEditorAnchorsAndMentionsLabelHandler(event)) return;
    let itemItem: Dynamic = itemIndex < 0 ? undefined : items[itemIndex];
    let submenu3: Dynamic =
      itemItem === undefined ? null : (options?.submenu?.(itemItem) ?? null);
    if (itemItem !== undefined && submenu3?.length) {
      if (items2 === submenu3) {
        cancel();
        isEditorAnchorsAndMentionsLabelResult7 = {
          ax: event.clientX,
          ay: event.clientY,
          x: event.clientX,
        };
        return;
      }
      schedule(itemItem);
      return;
    }
    cancel();
    if (
      !(!items2?.length || getBoundingClientRect2(event)) &&
      (enabled7 ||
        (itemIndex >= 0 && matchesIsEditorAnchorsAndMentionsLabelResult))
    ) {
      removeEventListener2();
      querySelector();
    }
  };
  let contains2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let target: Dynamic = event.target;
    if (
      !(
        (target !== null &&
          (element.contains(target) || element3.contains(target))) ||
        !isEditorAnchorsAndMentionsLabelHandler(event) ||
        getBoundingClientRect2(event)
      )
    ) {
      removeEventListener2();
      querySelector();
    }
  };
  let contains3 = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let relatedTarget: Dynamic = editorAnchorsAndMentionsLabel2.relatedTarget;
    if (
      !(
        relatedTarget !== null &&
        (element.contains(relatedTarget) || element3.contains(relatedTarget))
      )
    ) {
      cancel();
      isEditorAnchorsAndMentionsLabelResult6 = null;
      isEditorAnchorsAndMentionsLabelResult8 = -1;
      if (relatedTarget === null && enabled7) {
        removeEventListener2();
        querySelector();
      }
    }
  };
  element.addEventListener(`pointermove`, submenu2);
  element.addEventListener(`pointerleave`, contains3);
  element3.addEventListener(
    `pointermove`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (isEditorAnchorsAndMentionsLabelHandler(event)) {
        isEditorAnchorsAndMentionsLabelResult7 = null;
        cancel();
      }
    },
  );
  element3.addEventListener(`pointerleave`, contains3);
  let append = (..._extraArguments: unknown[]): undefined => {
    let isEditorAnchorsAndMentionsLabelResult11: Dynamic =
      isEditorAnchorsAndMentionsLabelResult3;
    let count4 = count2;
    let enabled8: Dynamic = enabled7;
    let isEditorAnchorsAndMentionsLabelResult12: Dynamic =
      isEditorAnchorsAndMentionsLabelResult7;
    removeEventListener2();
    element.textContent = ``;
    items3 = [];
    if (isEditorAnchorsAndMentionsLabelResult8 >= 0) {
      isEditorAnchorsAndMentionsLabelResult8 = -2;
    }
    let isEditorAnchorsAndMentionsLabelResult13: Dynamic = null;
    let isEditorAnchorsAndMentionsLabelResult14: Dynamic = null;
    let element4: Dynamic = element;
    let index = 0;
    let isEditorAnchorsAndMentionsLabelResult15: Dynamic;
    items.forEach(
      (
        helloTImport2?: Dynamic,
        index2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let sectionOf4: Dynamic = sectionOf?.(helloTImport2) ?? null;
        if (
          sectionOf &&
          sectionOf4 !== isEditorAnchorsAndMentionsLabelResult14
        ) {
          let element5 = document.createElement(`div`);
          element5.className = `hdr`;
          element5.setAttribute(`role`, `presentation`);
          element5.textContent = sectionOf4 ?? ``;
          element5.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              event.preventDefault(),
          );
          isEditorAnchorsAndMentionsLabelResult14 = sectionOf4;
          if (sectionOf4) {
            let element6 = document.createElement(`div`);
            element6.className = `grp`;
            element6.setAttribute(`role`, `group`);
            element5.id = `${updateEditorAnchorsAndMentionsCapture4}-title-${index++}`;
            element6.setAttribute(`aria-labelledby`, element5.id);
            element6.append(element5);
            element.append(element6);
            element4 = element6;
          } else {
            element.append(element5);
            element4 = element;
          }
        }
        let row = document.createElement(`div`);
        row.className = `row` + (index2 === count ? ` is-sel` : ``);
        row.id = updateEditorAnchorsAndMentionsCapture5(
          index2,
          helloTImport2.label,
        );
        row.setAttribute(`role`, `option`);
        row.setAttribute(`aria-selected`, String(index2 === count));
        if (index2 === count) {
          isEditorAnchorsAndMentionsLabelResult15 = row;
        }
        items3.push(row);
        let items4: Dynamic = options?.submenu?.(helloTImport2) ?? null;
        if (items4?.length) {
          row.classList.add(`more`);
          row.setAttribute(`aria-haspopup`, `listbox`);
          row.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              event.preventDefault();
              cancel();
              getBoundingClientRect(helloTImport2, items4, row);
              isEditorAnchorsAndMentionsLabelResult7 = {
                ax: event.clientX,
                ay: event.clientY,
                x: event.clientX,
              };
            },
          );
        } else {
          row.addEventListener(
            `mousedown`,
            (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              event.preventDefault(),
          );
        }
        renderRow(helloTImport2, row);
        if (items4?.length) {
          let element5 = document.createElement(`span`);
          element5.className = `sub`;
          element5.append(
            resolveEditorAnchorsAndMentionsGrid2(
              document,
              EditorAnchorsAndMentionsMaster16,
              16,
            ),
          );
          row.append(element5);
          if (
            isEditorAnchorsAndMentionsLabelResult11 !== null &&
            helloTImport2.label ===
              isEditorAnchorsAndMentionsLabelResult11.label &&
            (sectionOf?.(helloTImport2) ?? null) ===
              isEditorAnchorsAndMentionsLabelResult11.section
          ) {
            isEditorAnchorsAndMentionsLabelResult13 = {
              it: helloTImport2,
              items: items4,
              row: row,
            };
          }
        }
        element4.append(row);
      },
    );
    let isEditorAnchorsAndMentionsLabelResult16: Dynamic =
      isEditorAnchorsAndMentionsLabelResult13;
    if (isEditorAnchorsAndMentionsLabelResult16 !== null) {
      getBoundingClientRect(
        isEditorAnchorsAndMentionsLabelResult16.it,
        isEditorAnchorsAndMentionsLabelResult16.items,
        isEditorAnchorsAndMentionsLabelResult16.row,
        enabled8,
      );
      count2 = enabled8
        ? -1
        : Math.min(
            count4,
            isEditorAnchorsAndMentionsLabelResult16.items.length - 1,
          );
      isEditorAnchorsAndMentionsLabelResult7 =
        isEditorAnchorsAndMentionsLabelResult12;
      querySelector3();
    }
    if (enabled) {
      let element5 = document.createElement(`div`);
      element5.className = `loading`;
      element5.id = updateEditorAnchorsAndMentionsCapture5(items.length);
      element5.setAttribute(`role`, `option`);
      element5.setAttribute(`aria-disabled`, `true`);
      element5.textContent = `Searching…`;
      if (enabled3) {
        element5.dataset.holdsEnter = ``;
      }
      element5.addEventListener(
        `mousedown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          event.preventDefault(),
      );
      element.append(element5);
    } else if (enabled2) {
      let element5 = document.createElement(`div`);
      element5.className = `empty`;
      element5.id = updateEditorAnchorsAndMentionsCapture5(0, `empty`);
      element5.setAttribute(`role`, `option`);
      element5.setAttribute(`aria-disabled`, `true`);
      element5.textContent =
        typeof options?.emptyLabel == `function`
          ? options.emptyLabel()
          : (options?.emptyLabel ?? ``);
      if (enabled3) {
        element5.dataset.holdsEnter = ``;
      }
      element5.addEventListener(
        `mousedown`,
        (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          event.preventDefault(),
      );
      element.append(element5);
    }
    if (isEditorAnchorsAndMentionsLabelResult15) {
      updateScrollTop(element, isEditorAnchorsAndMentionsLabelResult15);
    }
    querySelector();
  };
  let count3: number = 0;
  let isEditorAnchorsAndMentionsLabelResult9: Dynamic = null;
  let updateTop = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    options2: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!editorAnchorsAndMentionsLabel2) return;
    count3 ||= parseFloat(getComputedStyle(element).maxHeight) || 1 / 0;
    let innerWidth = window.innerWidth || 0;
    let innerHeight = window.innerHeight || 0;
    let min = Math.min(
      editorAnchorsAndMentionsLabel2.left,
      innerWidth - element.offsetWidth - 4,
    );
    element.style.left = `${Math.max(4, min)}px`;
    let difference =
      innerHeight - (editorAnchorsAndMentionsLabel2.bottom + 4) - 4;
    let difference2 = editorAnchorsAndMentionsLabel2.top - 4 - 4;
    let min2 = Math.min(element.scrollHeight, count3);
    let enabled8 =
      options2 && isEditorAnchorsAndMentionsLabelResult9 !== null
        ? !isEditorAnchorsAndMentionsLabelResult9
        : difference >= min2 || difference >= difference2;
    isEditorAnchorsAndMentionsLabelResult9 = !enabled8;
    element.style.maxHeight = `${Math.min(count3, Math.max(40, enabled8 ? difference : difference2))}px`;
    element.style.top = enabled8
      ? `${editorAnchorsAndMentionsLabel2.bottom + 4}px`
      : `${Math.max(4, editorAnchorsAndMentionsLabel2.top - 4 - element.offsetHeight)}px`;
  };
  let isEditorAnchorsAndMentionsLabelResult10: Dynamic = null;
  let {
    signal: updateEditorAnchorsAndMentionsCapture2,
    detach: updateEditorAnchorsAndMentionsCapture3,
    listId: updateEditorAnchorsAndMentionsCapture4,
    optionId: updateEditorAnchorsAndMentionsCapture5,
    expose: updateEditorAnchorsAndMentionsCapture6,
  }: Dynamic = updateEditorAnchorsAndMentionsCapture({
    el: element,
    label: options?.label ?? `Mention`,
    place: (..._extraArguments: unknown[]): undefined => {
      if (isEditorAnchorsAndMentionsLabelResult10) {
        updateTop(isEditorAnchorsAndMentionsLabelResult10());
      }
    },
    anchor: (..._extraArguments: unknown[]): Dynamic =>
      isEditorAnchorsAndMentionsLabelResult10?.() ?? null,
    isOpen: (..._extraArguments: unknown[]) =>
      !enabled5 && element.style.display !== `none`,
  });
  element3.id = `${updateEditorAnchorsAndMentionsCapture4}-${label2}`;
  let sectionOf3: Dynamic = (
    editorAnchorsAndMentionsLabel2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let id: Dynamic = editorAnchorsAndMentionsLabel2.id;
    return JSON.stringify([
      options2,
      sectionOf?.(editorAnchorsAndMentionsLabel2) ?? null,
      editorAnchorsAndMentionsLabel2.label,
      typeof id == `string` ? id : null,
    ]);
  };
  let isEditorAnchorsAndMentionsKey2: Dynamic = isEditorAnchorsAndMentionsKey({
    panels: [element, element3],
    rowAt: (
      editorAnchorsAndMentionsLabel2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let row: Dynamic = editorAnchorsAndMentionsLabel2.closest(`.row`);
      if (row === null) return null;
      let itemIndex: Dynamic = items3.indexOf(row);
      if (itemIndex >= 0) {
        let itemItem2: Dynamic = items[itemIndex];
        return itemItem2 === undefined || options?.submenu?.(itemItem2)?.length
          ? null
          : {
              key: sectionOf3(itemItem2, false),
              row: row,
              pick: (..._extraArguments: unknown[]) =>
                isEditorAnchorsAndMentionsLabelResult2(itemItem2),
            };
      }
      let itemItem: Dynamic =
        items2?.[Array.prototype.indexOf.call(element3.children, row)];
      return itemItem === undefined
        ? null
        : {
            key: sectionOf3(itemItem, true),
            row: row,
            pick: (..._extraArguments: unknown[]): Dynamic =>
              isEditorAnchorsAndMentionsLabelResult?.(itemItem),
          };
    },
  });
  let test = (
    activity?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (options2 !== undefined) {
      label = options2;
    }
    let at2: Dynamic = activity.at(-1);
    let matchesAt = at2 === EditorAnchorsAndMentionsLabel2;
    enabled = at2 === EditorAnchorsAndMentionsLabel;
    items = enabled || matchesAt ? activity.slice(0, -1) : activity;
    if (count >= items.length) {
      count = 0;
    }
    let now: Dynamic = options?.emptyKeepsKeys?.now();
    enabled2 =
      !!options?.emptyLabel &&
      enabled4 &&
      items.length === 0 &&
      !enabled &&
      !matchesAt &&
      label !== `` &&
      !/\s/.test(label) &&
      now !== false;
    enabled3 =
      now === true &&
      enabled4 &&
      label !== `` &&
      !/\s/.test(label) &&
      items.length === 0 &&
      (enabled2 || enabled);
    let matchesDisplay = element.style.display === `none`;
    element.style.display =
      items.length || enabled || enabled2 ? `block` : `none`;
    if (element.style.display === `none`) {
      cancel();
    } else {
      if (matchesDisplay) {
        isEditorAnchorsAndMentionsLabelResult6 = null;
      }
    }
    if (element.style.display !== `none`) {
      enabled6 = true;
    }
    updateEditorAnchorsAndMentionsCapture2(element.style.display !== `none`);
  };
  return {
    el: element,
    panels: [element, element3],
    update(
      editorAnchorsAndMentionsLabel2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      isEditorAnchorsAndMentionsLabelResult =
        editorAnchorsAndMentionsLabel2.command;
      element2 = editorAnchorsAndMentionsLabel2.editor?.view.dom ?? null;
      isEditorAnchorsAndMentionsLabelResult10 =
        editorAnchorsAndMentionsLabel2.clientRect
          ? (..._extraArguments: unknown[]): Dynamic =>
              editorAnchorsAndMentionsLabel2.clientRect?.() ?? null
          : null;
      if (!enabled5) {
        if ((editorAnchorsAndMentionsLabel2.query ?? ``) !== label) {
          cancel();
          if (enabled7) {
            removeEventListener2();
          }
        }
        test(
          editorAnchorsAndMentionsLabel2.items,
          editorAnchorsAndMentionsLabel2.query ?? ``,
        );
        append();
        updateTop(editorAnchorsAndMentionsLabel2.clientRect?.() ?? null);
      }
    },
    typing(..._extraArguments: unknown[]): undefined {
      enabled4 = true;
      cancel();
      if (enabled7) {
        removeEventListener2();
        querySelector();
      }
    },
    push(
      editorAnchorsAndMentionsLabel2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled5) {
        test(editorAnchorsAndMentionsLabel2, options2);
        append();
        updateTop(isEditorAnchorsAndMentionsLabelResult10?.() ?? null, true);
      }
    },
    key(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (items2?.length && !enabled7) {
        cancel();
        if (event.key === `Escape` || event.key === `ArrowLeft`) {
          removeEventListener2();
          querySelector();
          return true;
        }
        if (event.key === `ArrowDown`) {
          count2 = (count2 + 1) % items2.length;
          querySelector3();
          return true;
        }
        if (event.key === `ArrowUp`) {
          count2 = (count2 - 1 + items2.length) % items2.length;
          querySelector3();
          return true;
        }
        if (!event.shiftKey && (event.key === `Enter` || event.key === `Tab`)) {
          isEditorAnchorsAndMentionsLabelResult?.(items2[count2]);
          return true;
        }
        if (event.key === `ArrowRight`) return true;
      }
      if (
        resolveEditorAnchorsAndMentionsEscape(event) &&
        !enabled5 &&
        (element.style.display !== `none` || enabled6)
      ) {
        resolveEditorAnchorsAndMentionsValue3(event);
        querySelector2();
        return true;
      }
      if (!items.length) {
        let emptyKeepsKeys: Dynamic = options?.emptyKeepsKeys;
        let enabled8 =
          !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey;
        let attribute: Dynamic = element2?.getAttribute(
          `aria-activedescendant`,
        );
        let enabled9 =
          !!attribute &&
          element.contains(element.ownerDocument.getElementById(attribute));
        if (
          enabled3 &&
          !enabled5 &&
          enabled8 &&
          enabled9 &&
          emptyKeepsKeys?.now()
        ) {
          if (
            event.key === `ArrowDown` ||
            event.key === `ArrowUp` ||
            event.key === `Tab`
          )
            return true;
          if (event.key === `Enter`) {
            querySelector2();
            if (emptyKeepsKeys.endMatch()) {
              resolveEditorAnchorsAndMentionsValue5();
            }
            return true;
          }
        }
        return (
          !!options?.swallowLoading &&
          enabled &&
          !event.shiftKey &&
          (event.key === `Enter` || event.key === `Tab`)
        );
      }
      return event.key === `ArrowDown` || event.key === `ArrowUp`
        ? (cancel(),
          enabled7 && removeEventListener2(),
          (count =
            (count + (event.key === `ArrowDown` ? 1 : items.length - 1)) %
            items.length),
          append(),
          true)
        : event.key === `ArrowRight`
          ? enabled7
            ? (indexOf(), true)
            : querySelector4()
          : !event.shiftKey && (event.key === `Enter` || event.key === `Tab`)
            ? querySelector4()
              ? (resolveEditorAnchorsAndMentionsValue5(), true)
              : (isEditorAnchorsAndMentionsLabelResult2(items[count]), true)
            : false;
    },
    isShowing(..._extraArguments: unknown[]) {
      return items.length > 0;
    },
    ownsEnter(..._extraArguments: unknown[]) {
      return !enabled5 && (items.length > 0 || enabled);
    },
    isVisible(..._extraArguments: unknown[]) {
      return !enabled5 && element.style.display !== `none`;
    },
    destroy(..._extraArguments: unknown[]): undefined {
      cancel();
      removeEventListener2();
      isEditorAnchorsAndMentionsKey2();
      updateEditorAnchorsAndMentionsCapture3();
      element3.remove();
      element.remove();
    },
  };
}

var isEditorAnchorsAndMentionsTest: Dynamic;

function resolveEditorAnchorsAndMentionsLabel2(
  editorAnchorsAndMentionsLabel2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorAnchorsAndMentionsLabel2
    .chain()
    .focus()
    .insertContentAt(options, [
      {
        type: `mention`,
        attrs: {
          id: context.id,
          label: context.label,
        },
      },
      {
        type: `text`,
        text: ` `,
      },
    ])
    .run();
}

function resolveEditorAnchorsAndMentionsState(
  { state: state, range: range }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolve: Dynamic = state.doc.resolve(range.from);
  return resolve.parent.type.spec.code
    ? false
    : !resolve
        .marks()
        .some(
          (mark?: Dynamic, ..._extraArguments: unknown[]) =>
            mark.type.name === `code`,
        );
}

function isEditorAnchorsAndMentionsSuggestion(
  editorAnchorsAndMentionsSuggestion?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorAnchorsAndMentionsSuggestionResult: Dynamic = null;
  let emptyKeepsKeys: Dynamic =
    editorAnchorsAndMentionsSuggestion.emptyKeepsKeys;
  let repaint = (..._extraArguments: unknown[]): undefined => {
    let isEditorAnchorsAndMentionsSuggestionResult2: Dynamic =
      isEditorAnchorsAndMentionsSuggestionResult;
    if (
      !isEditorAnchorsAndMentionsSuggestionResult2 ||
      !isEditorAnchorsAndMentionsTest(
        isEditorAnchorsAndMentionsSuggestionResult2.q,
      )
    )
      return;
    let q10: Dynamic = isEditorAnchorsAndMentionsSuggestionResult2.q;
    Promise.resolve(editorAnchorsAndMentionsSuggestion.search(q10)).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isEditorAnchorsAndMentionsSuggestionResult ===
          isEditorAnchorsAndMentionsSuggestionResult2 &&
        isEditorAnchorsAndMentionsSuggestionResult2.q === q10 &&
        isEditorAnchorsAndMentionsSuggestionResult2.push(result, q10),
      (..._extraArguments: unknown[]): undefined => {},
    );
  };
  let command: Dynamic =
    editorAnchorsAndMentionsSuggestion.command ??
    resolveEditorAnchorsAndMentionsLabel2;
  let pluginKey: Dynamic = new (PluginKey as Dynamic)(
    editorAnchorsAndMentionsSuggestion.pluginKeyName ?? `mention`,
  );
  return {
    suggestion: {
      pluginKey: pluginKey,
      char: editorAnchorsAndMentionsSuggestion.char ?? `@`,
      allowSpaces: editorAnchorsAndMentionsSuggestion.allowSpaces ?? true,
      allowedPrefixes:
        editorAnchorsAndMentionsSuggestion.allowedPrefixes === undefined
          ? null
          : editorAnchorsAndMentionsSuggestion.allowedPrefixes,
      allow:
        editorAnchorsAndMentionsSuggestion.allow ??
        resolveEditorAnchorsAndMentionsState,
      ...(editorAnchorsAndMentionsSuggestion.findSuggestionMatch && {
        findSuggestionMatch: (
          editorAnchorsAndMentionsSuggestion2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          editorAnchorsAndMentionsSuggestion.findSuggestionMatch(
            editorAnchorsAndMentionsSuggestion2,
          ) ?? resolveEditorExtensionsChar(editorAnchorsAndMentionsSuggestion2),
      }),
      ...(editorAnchorsAndMentionsSuggestion.shouldResetDismissed && {
        shouldResetDismissed:
          editorAnchorsAndMentionsSuggestion.shouldResetDismissed,
      }),
      items: (
        editorAnchorsAndMentionsSuggestion2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        isEditorAnchorsAndMentionsTest(
          editorAnchorsAndMentionsSuggestion2.query,
        )
          ? (editorAnchorsAndMentionsSuggestion.items?.(
              editorAnchorsAndMentionsSuggestion2,
            ) ?? [])
          : [EditorAnchorsAndMentionsLabel2],
      command: (
        { editor: editor, props: props }: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let pluginKeyState: Dynamic = pluginKey.getState(editor.state);
        if (!(!pluginKeyState?.active || !pluginKeyState.range)) {
          editorAnchorsAndMentionsSuggestion.onCommit?.(props);
          command(editor, pluginKeyState.range, props);
        }
      },
      render: (..._extraArguments: unknown[]): Dynamic => {
        let event: Dynamic = null;
        let label: string = ``;
        let isEditorAnchorsAndMentionsSuggestionResult2: Dynamic = null;
        let enabled = false;
        let isEditorAnchorsAndMentionsSuggestionResult3: Dynamic = null;
        let isEditorAnchorsAndMentionsSuggestionResult4: Dynamic = null;
        let getState: Dynamic = (
          editorAnchorsAndMentionsSuggestion2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          !editorAnchorsAndMentionsSuggestion2.isDestroyed &&
          pluginKey.getState(editorAnchorsAndMentionsSuggestion2.state)
            ?.active === true;
        let destroy = (..._extraArguments: unknown[]): undefined => {
          isEditorAnchorsAndMentionsSuggestionResult4?.();
          isEditorAnchorsAndMentionsSuggestionResult4 = null;
          event?.destroy();
          event = null;
          if (
            isEditorAnchorsAndMentionsSuggestionResult ===
            isEditorAnchorsAndMentionsSuggestionResult3
          ) {
            isEditorAnchorsAndMentionsSuggestionResult = null;
          }
          isEditorAnchorsAndMentionsSuggestionResult3 = null;
        };
        return {
          onBeforeStart(
            editorAnchorsAndMentionsSuggestion2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined {
            label = editorAnchorsAndMentionsSuggestion2.query;
            isEditorAnchorsAndMentionsSuggestionResult2 =
              editorAnchorsAndMentionsSuggestion2.editor.state.doc;
            enabled = false;
            if (event) {
              destroy();
            }
          },
          onStart(
            editorAnchorsAndMentionsSuggestion2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined {
            let editor: Dynamic = editorAnchorsAndMentionsSuggestion2.editor;
            if (!getState(editor)) return;
            destroy();
            let isEditorAnchorsAndMentionsLabel2: Dynamic =
              isEditorAnchorsAndMentionsLabel(
                editorAnchorsAndMentionsSuggestion.menuClass,
                {
                  renderRow: editorAnchorsAndMentionsSuggestion.renderRow,
                  sectionOf: editorAnchorsAndMentionsSuggestion.sectionOf,
                  swallowLoading:
                    editorAnchorsAndMentionsSuggestion.swallowLoading,
                  submenu: editorAnchorsAndMentionsSuggestion.submenu,
                  label: editorAnchorsAndMentionsSuggestion.label,
                  emptyLabel: editorAnchorsAndMentionsSuggestion.emptyLabel,
                  density: editorAnchorsAndMentionsSuggestion.density,
                  ...(emptyKeepsKeys && {
                    emptyKeepsKeys: {
                      now: (..._extraArguments: unknown[]): Dynamic => {
                        let pluginKeyState: Dynamic = pluginKey.getState(
                          editor.state,
                        );
                        return (
                          pluginKeyState?.active === true &&
                          !!pluginKeyState.query &&
                          !/\s/.test(pluginKeyState.query) &&
                          emptyKeepsKeys(editor, pluginKeyState.range)
                        );
                      },
                      endMatch: (..._extraArguments: unknown[]) => {
                        try {
                          editorAnchorsAndMentionsSuggestion.onEmptyEnter?.(
                            editor,
                          );
                          if (getState(editor)) {
                            resolveEditorAnchorsAndMentionsExit(
                              editor.view,
                              pluginKey,
                            );
                          }
                        } finally {
                          destroy();
                        }
                        return !getState(editor);
                      },
                    },
                  }),
                },
              );
            event = isEditorAnchorsAndMentionsLabel2;
            (
              editor.view.dom.closest(`[data-bottom-sheet]`) ?? document.body
            ).append(event.el);
            isEditorAnchorsAndMentionsSuggestionResult4 =
              installEditorAnchorsAndMentionsMousedown({
                panels: isEditorAnchorsAndMentionsLabel2.panels,
                owner: editor.view.dom,
                isShown: (..._extraArguments: unknown[]): Dynamic =>
                  isEditorAnchorsAndMentionsLabel2.isVisible(),
                editorCanClose: (..._extraArguments: unknown[]): Dynamic =>
                  getState(editor) && editor.isEditable,
                close: (..._extraArguments: unknown[]): undefined => {
                  try {
                    if (getState(editor)) {
                      resolveEditorAnchorsAndMentionsExit(
                        editor.view,
                        pluginKey,
                      );
                    }
                  } finally {
                    destroy();
                  }
                },
              });
            isEditorAnchorsAndMentionsSuggestionResult =
              isEditorAnchorsAndMentionsSuggestionResult3 = {
                q: editorAnchorsAndMentionsSuggestion2.query,
                push: (
                  editorAnchorsAndMentionsSuggestion3?: Dynamic,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  getState(editor)
                    ? event?.push(editorAnchorsAndMentionsSuggestion3, options)
                    : destroy(),
                showing: (..._extraArguments: unknown[]): Dynamic =>
                  event?.isShowing() ?? false,
                visible: (..._extraArguments: unknown[]): Dynamic =>
                  event?.isVisible() ?? false,
                ownsEnter: (..._extraArguments: unknown[]): Dynamic =>
                  event?.ownsEnter() ?? false,
              };
            if (enabled) {
              event.typing();
            }
            event.update(editorAnchorsAndMentionsSuggestion2);
          },
          onBeforeUpdate(
            editorAnchorsAndMentionsSuggestion2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined {
            let doc: Dynamic =
              editorAnchorsAndMentionsSuggestion2.editor.state.doc;
            if (
              editorAnchorsAndMentionsSuggestion2.query !== label &&
              doc !== isEditorAnchorsAndMentionsSuggestionResult2
            ) {
              enabled = true;
              event?.typing();
            }
            label = editorAnchorsAndMentionsSuggestion2.query;
            isEditorAnchorsAndMentionsSuggestionResult2 = doc;
            if (isEditorAnchorsAndMentionsSuggestionResult) {
              isEditorAnchorsAndMentionsSuggestionResult.q =
                editorAnchorsAndMentionsSuggestion2.query;
            }
          },
          onUpdate(
            editorAnchorsAndMentionsSuggestion2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined {
            if (isEditorAnchorsAndMentionsSuggestionResult) {
              isEditorAnchorsAndMentionsSuggestionResult.q =
                editorAnchorsAndMentionsSuggestion2.query;
            }
            event?.update(editorAnchorsAndMentionsSuggestion2);
          },
          onKeyDown(
            { event: event2, view: view }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic {
            return resolveEditorAnchorsAndMentionsValue4(
              view,
              (..._extraArguments: unknown[]): Dynamic =>
                event?.key(event2) ?? false,
            );
          },
          onExit(..._extraArguments: unknown[]): undefined {
            destroy();
            editorAnchorsAndMentionsSuggestion.onExit?.();
          },
        };
      },
    },
    repaint: repaint,
    isOpen: (..._extraArguments: unknown[]): Dynamic =>
      isEditorAnchorsAndMentionsSuggestionResult?.showing() ?? false,
    isVisible: (..._extraArguments: unknown[]): Dynamic =>
      isEditorAnchorsAndMentionsSuggestionResult?.visible() ?? false,
    ownsEnter: (..._extraArguments: unknown[]): Dynamic =>
      isEditorAnchorsAndMentionsSuggestionResult?.ownsEnter() ?? false,
  };
}

var EditorAnchorsAndMentionsFrameMentioned: string;

function resolveEditorAnchorsAndMentionsIncludes2(
  editorAnchorsAndMentionsIncludes2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveEditorAnchorsAndMentionsIncludes2Result of (editorAnchorsAndMentionsIncludes2 ??
    []) as Dynamic) {
    if (items.length >= 32) break;
    if (
      !(
        !resolveEditorAnchorsAndMentionsTest(
          resolveEditorAnchorsAndMentionsIncludes2Result,
        ) ||
        resolveEditorAnchorsAndMentionsIncludes2Result === options ||
        items.includes(resolveEditorAnchorsAndMentionsIncludes2Result)
      )
    ) {
      items.push(resolveEditorAnchorsAndMentionsIncludes2Result);
    }
  }
  return items;
}

function resolveEditorAnchorsAndMentionsPost(
  editorAnchorsAndMentionsPost?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    post(
      request?: Dynamic,
      reason?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let helloLImport2: Dynamic = helloLImport(editorAnchorsAndMentionsPost);
      if (editorAnchorsAndMentionsPost === null || helloLImport2 === null)
        return;
      let ids: Dynamic = resolveEditorAnchorsAndMentionsIncludes2(
        request,
        reason,
      );
      if (ids.length !== 0)
        try {
          editorAnchorsAndMentionsPost.parent.postMessage(
            {
              [EditorAnchorsAndMentionsFrameMentioned]: true,
              ids: ids,
            },
            helloLImport2,
          );
        } catch {}
    },
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorAnchorsAndMentions2Step1(): void {
  (isEditorAnchorsAndMentionsTest = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !/^\s/.test(items) &&
    items.length <= 60 &&
    items.trim().split(/\s+/).length <= 5);
  (EditorAnchorsAndMentionsFrameMentioned = `__frame_mentioned`);
}

export {
  isEditorAnchorsAndMentionsSuggestion,
  resolveEditorAnchorsAndMentionsLabel2,
  resolveEditorAnchorsAndMentionsPost,
  resolveEditorAnchorsAndMentionsState,
};

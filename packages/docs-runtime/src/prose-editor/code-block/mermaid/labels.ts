import type { DiagramLabel } from "./label-source";
const flowchartIdPattern = /(?:^|-)flowchart-(.+)-\d+$/;
const stateIdPattern = /(?:^|-)state-(.+?)(?:----\w+)?-\d+$/;
const renderedIdPattern = /^cw-mm-\d+-(.+)$/;
function diagramSourceId(id: string): string | null {
  const nodeMatch = flowchartIdPattern.exec(id) ?? stateIdPattern.exec(id);
  if (nodeMatch) return /^root_(?:start|end)$/.test(nodeMatch[1]) ? null : nodeMatch[1];
  const renderedMatch = renderedIdPattern.exec(id);
  return renderedMatch ? renderedMatch[1] : null;
}
const editableLabelSelector = "g.node, g.edgeLabel, g.cluster";
const labelTextSelector = "text, foreignObject";
const shapeSelector = "rect, circle, ellipse, polygon, polyline, path, line, use, image";
function groupSequenceMessages(root: Element): void {
  const svgs = root.localName === "svg" ? [root] : [...root.querySelectorAll("svg")];
  for (const value2 of svgs)
    for (const value3 of value2.querySelectorAll(":scope > text.messageText")) {
      if (value3.parentNode !== value2) continue;
      const items: Element[] = [value3];
      let nextElementSibling = value3.nextElementSibling;
      while (
        nextElementSibling &&
        nextElementSibling.localName === "text" &&
        nextElementSibling.classList.contains("messageText")
      ) {
        items.push(nextElementSibling);
        nextElementSibling = nextElementSibling.nextElementSibling;
      }
      const value4 = value2.ownerDocument.createElementNS(
        "http://www.w3.org/2000/svg",
        "g",
      );
      value4.setAttribute("class", "cw-mm-msg");
      value2.insertBefore(value4, value3);
      for (const value5 of items) value4.appendChild(value5);
    }
}
function diagramLabelText(element: Element): string | null {
  const textElements =
    element.localName === "text" ? [] : [...element.querySelectorAll("text")];
  return (
    (textElements.length > 1
      ? textElements.map((input2) => (input2.textContent ?? "").trim()).join(" ")
      : (element.textContent ?? "")
    )
      .replace(/\s+/g, " ")
      .trim() || null
  );
}
function diagramLabelContainer(element: Element, root: Element): Element {
  const parentElement = element.parentElement;
  if (parentElement?.matches("g.cw-mm-msg")) return parentElement;
  if (
    parentElement &&
    parentElement !== root &&
    parentElement.localName === "g" &&
    !parentElement.matches(editableLabelSelector) &&
    parentElement.querySelectorAll(labelTextSelector).length === 1 &&
    parentElement.children.length <= 8 &&
    parentElement.querySelector(":scope > g > text, :scope > g > g") == null
  )
    return parentElement;
  return element;
}
function unwrapDiagramLabel(element: Element): Element | null {
  let group = element.localName === "g" ? element : element.parentElement;
  for (let index = 0; group && index < 3; index++) {
    const filtered = [...group.children].filter((input2) =>
      (input2.textContent ?? "").trim(),
    );
    if (
      filtered.length === 1 &&
      filtered[0].localName === "g" &&
      !filtered[0].matches(".cw-mm-person")
    )
      group = filtered[0];
    else break;
  }
  return group;
}
function namedDiagramLabel(element: Element): DiagramLabel | null {
  const label = diagramLabelText(element);
  if (!label) return null;
  const id =
    (element.matches("[name]") ? element : element.querySelector("[name]"))
      ?.getAttribute("name")
      ?.trim() || null;
  return {
    el: element,
    id,
    label,
  };
}
function isEditableDiagramLabel(element: Element): boolean {
  return element.matches(editableLabelSelector);
}
function closestDiagramLabel(element: Element | null | undefined): DiagramLabel | null {
  const svg = element?.closest?.("svg");
  if (!element || !svg) return null;
  let labelContainer = element.closest("g.cw-mm-msg");
  const named = labelContainer ? null : element.closest("[name]");
  if (named && svg.contains(named) && named !== svg)
    labelContainer = unwrapDiagramLabel(named);
  if (!labelContainer || !(labelContainer.textContent ?? "").trim()) {
    const value4 = element.closest(labelTextSelector);
    if (value4 && svg.contains(value4))
      labelContainer = diagramLabelContainer(value4, svg);
    else if (element.matches(shapeSelector) || element.closest(".cw-mm-person")) {
      let value5: Element | null =
        element.closest(".cw-mm-person")?.parentElement ?? element.parentElement;
      for (
        let index = 0;
        value5 && value5 !== svg && index < 3;
        index++, value5 = value5.parentElement
      ) {
        if (value5.localName !== "g" || value5.matches(editableLabelSelector)) break;
        const value6 = value5.querySelectorAll(labelTextSelector);
        if (value6.length === 1) {
          labelContainer =
            diagramLabelContainer(value6[0], svg) === value5 ? value5 : null;
          break;
        }
        if (value6.length > 1) break;
      }
    }
  }
  if (
    !labelContainer ||
    labelContainer === svg ||
    labelContainer.closest(editableLabelSelector)
  )
    return null;
  return namedDiagramLabel(labelContainer);
}
function collectDiagramLabels(root: Element): DiagramLabel[] {
  const labels = [...root.querySelectorAll(editableLabelSelector)].map((input2) => ({
    el: input2,
    id: diagramSourceId(input2.id),
    label: input2.textContent?.trim() || null,
  }));
  const seen = new Set(labels.map((input2) => input2.el));
  for (const value of root.localName === "svg" ? [root] : root.querySelectorAll("svg"))
    for (const value2 of value.querySelectorAll("text")) {
      if (value2.closest(editableLabelSelector) || value2.closest("defs, marker, symbol"))
        continue;
      const value3 = closestDiagramLabel(value2);
      if (!value3 || seen.has(value3.el)) continue;
      seen.add(value3.el);
      labels.push(value3);
    }
  return labels;
}
function diagramLabelAt(element: Element | null | undefined): DiagramLabel | null {
  const group = element?.closest?.(editableLabelSelector);
  if (!group) return closestDiagramLabel(element);
  return {
    el: group,
    id: diagramSourceId(group.id),
    label: group.textContent?.trim() || null,
  };
}
export {
  collectDiagramLabels,
  diagramLabelAt,
  groupSequenceMessages,
  isEditableDiagramLabel,
};

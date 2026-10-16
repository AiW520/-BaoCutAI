/** SVG methods may come from a different document realm or a partial DOM implementation. */
export function hasSvgCharacterExtents(
  element: Element,
): element is Element & Pick<SVGTextContentElement, "getExtentOfChar"> {
  return "getExtentOfChar" in element && typeof element.getExtentOfChar === "function";
}

export function hasSvgBoundingBox(
  element: Element,
): element is Element & Pick<SVGGraphicsElement, "getBBox"> {
  return "getBBox" in element && typeof element.getBBox === "function";
}

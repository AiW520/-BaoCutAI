// @vitest-environment happy-dom
import { Schema } from "prosemirror-model";
import { afterEach, describe, expect, it, vi } from "vitest";
import { addCodeCommentId } from "../comment-ids";
import { MermaidAnnotations } from "./annotations";
import { collectDiagramLabels, diagramLabelAt, groupSequenceMessages } from "./labels";
import { MermaidTextHighlights } from "./text-highlights";

afterEach(() => {
  document.body.replaceChildren();
});
function diagram() {
  const pane = document.createElement("div");
  pane.innerHTML =
    '<svg><g class="node" id="flowchart-A-0"><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">  First Label</div></foreignObject></g><g class="node" id="flowchart-B-1"><text>End</text></g></svg>';
  document.body.appendChild(pane);
  return pane;
}

describe("Mermaid SVG labels and highlights", () => {
  it("finds node ids and groups adjacent sequence messages without including marker text", () => {
    const pane = diagram();
    expect(collectDiagramLabels(pane).map(({ id, label }) => ({ id, label }))).toEqual([
      { id: "A", label: "First Label" },
      { id: "B", label: "End" },
    ]);
    const text = pane.querySelector("text");
    expect(diagramLabelAt(text)?.id).toBe("B");
    pane.innerHTML =
      '<svg><text class="messageText">First</text><text class="messageText">message</text><defs><text>hidden</text></defs></svg>';
    groupSequenceMessages(pane);
    groupSequenceMessages(pane);
    expect(pane.querySelectorAll("g.cw-mm-msg")).toHaveLength(1);
    expect(collectDiagramLabels(pane).map(({ label }) => label)).toEqual([
      "First message",
    ]);
  });

  it("restores original text node identities after partial HTML-label highlighting", () => {
    const pane = diagram();
    const label = pane.querySelector("g");
    const content = pane.querySelector("foreignObject > div");
    const original = content?.firstChild;
    if (!label || !content || !original) throw new Error("Missing label fixture");
    const highlights = new MermaidTextHighlights();
    expect(highlights.splitAt(label, 1, 4, "cw-mm-txt-hl")).toBe(true);
    expect(label.querySelector(".cw-mm-txt-hl")?.textContent).toBe("irs");
    highlights.clear();
    highlights.clear();
    expect(content.firstChild).toBe(original);
    expect(content.textContent).toBe("  First Label");
    expect(label.querySelector(".cw-mm-txt-hl")).toBeNull();
  });

  it("paints overlapping source selections/comments and clears obsolete flags on repaint", () => {
    const source = "flowchart TD\n A[First Label] --> B[End]";
    const schema = new Schema({
      nodes: { doc: { content: "text*" }, text: {} },
      marks: {},
    });
    const pane = diagram();
    const dom = document.createElement("div");
    dom.append(pane);
    document.body.append(dom);
    const from = source.indexOf("First Label");
    const applyActive = vi.fn();
    let comments = [
      { from, to: from + 5, threadId: "one" },
      { from, to: from + 11, threadId: "two" },
    ];
    const host: ConstructorParameters<typeof MermaidAnnotations>[0] = {
      dom,
      render: pane,
      node: schema.node("doc", null, schema.text(source)),
      srcOpen: true,
      inPlace: null,
      selRange: { from: from + 1, to: from + 4 },
      splitCommentRanges: () => comments,
      applyActivePaneHighlight: applyActive,
    };
    const painter = new MermaidAnnotations(host, {
      isResolved: (thread) => thread === "one",
    });
    painter.paintMermaid();
    const label = pane.querySelector("g.node");
    if (!label) throw new Error("Missing painted label");
    expect(label.classList.contains("cw-mm-sel")).toBe(true);
    expect(label.classList.contains("cw-mm-part-sel")).toBe(true);
    expect(label.getAttribute("data-comment-id")).toBe("one");
    expect(label.getAttribute("data-comment-ids")).toBe("two");
    expect(label.classList.contains("cw-res")).toBe(false);
    comments = [];
    painter.paintMermaid();
    expect(label.getAttribute("data-comment-id")).toBeNull();
    expect(label.classList.contains("cw-mm-hl")).toBe(false);
    expect(label.textContent).toBe("  First Label");
    expect(applyActive).toHaveBeenCalledTimes(2);
  });

  it("measures native SVG character runs, synchronizes background flags and restores text", () => {
    const span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    const svgTextPrototype: object = Object.getPrototypeOf(span);
    const descriptor = Object.getOwnPropertyDescriptor(
      svgTextPrototype,
      "getExtentOfChar",
    );
    Object.defineProperty(svgTextPrototype, "getExtentOfChar", {
      configurable: true,
      value(index: number): DOMRect {
        return new DOMRect(index * 8, 1, 8, 12);
      },
    });
    try {
      const pane = diagram();
      pane.innerHTML =
        '<svg><g class="node"><text transform="translate(2 3)">First Label</text></g></svg>';
      const unit = pane.querySelector("g");
      const text = pane.querySelector("text");
      const original = text?.firstChild;
      if (!unit || !text || !original) throw new Error("Missing SVG fixture");
      const highlights = new MermaidTextHighlights();
      highlights.splitAt(unit, 1, 4, "cw-mm-txt-hl");
      const rect = pane.querySelector("rect");
      expect(rect?.getAttribute("width")).toBe("26");
      expect(rect?.getAttribute("transform")).toBe("translate(2 3)");
      unit.classList.add("cw-on", "cw-res");
      highlights.syncFlags();
      expect(rect?.classList.contains("cw-on")).toBe(true);
      expect(rect?.classList.contains("cw-res")).toBe(true);
      highlights.clear();
      expect(text.firstChild).toBe(original);
      expect(pane.querySelector("rect")).toBeNull();
    } finally {
      if (descriptor)
        Object.defineProperty(svgTextPrototype, "getExtentOfChar", descriptor);
      else Reflect.deleteProperty(svgTextPrototype, "getExtentOfChar");
    }
  });

  it("retains the first comment face and deduplicates additional thread ids", () => {
    const element = document.createElement("span");
    expect(addCodeCommentId(element, "one")).toBe(true);
    expect(addCodeCommentId(element, "one")).toBe(false);
    expect(addCodeCommentId(element, "two")).toBe(false);
    expect(addCodeCommentId(element, "two")).toBe(false);
    expect(element.getAttribute("data-comment-id")).toBe("one");
    expect(element.getAttribute("data-comment-ids")).toBe("two");
  });
});

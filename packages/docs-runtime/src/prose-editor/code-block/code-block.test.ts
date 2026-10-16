// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView, Decoration, DecorationSet } from "prosemirror-view";
import {
  codeThreadRange,
  decoratedCodeCommentRanges,
  markedCodeCommentRanges,
  partitionCodeComments,
} from "./comment-ranges";
import { CodeBlockLayout } from "./layout";
import { observeDocumentLayout } from "./layout-observer";
import {
  measuredCodeWidth,
  naturalTableWidth,
  paneClippedOnRight,
} from "./text-measurement";

const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: { group: "block", content: "text*", toDOM: () => ["p", 0] },
    codeBlock: {
      group: "block",
      content: "text*",
      code: true,
      toDOM: () => ["pre", ["code", 0]],
    },
    text: {},
  },
  marks: { commentAnchor: { attrs: { threadId: {} } } },
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});

describe("code block comments", () => {
  it("combines marks and clipped decorations in stable order using UTF-16 positions", () => {
    const block = schema.node("codeBlock", null, [
      schema.text("😀", [schema.mark("commentAnchor", { threadId: "marked" })]),
      schema.text("abc"),
    ]);
    expect(markedCodeCommentRanges(block)).toEqual([
      { from: 0, to: 2, threadId: "marked" },
    ]);
    const decorations = DecorationSet.create(block, [
      Decoration.inline(1, 4, {}, { thread: "z" }),
      Decoration.inline(1, 4, {}, { thread: "a" }),
      Decoration.inline(2, 5, {}, { thread: "cell", cell: true }),
      Decoration.inline(1, 5, {}, { thread: 3 }),
    ]);
    expect(decoratedCodeCommentRanges(decorations, 3)).toEqual([
      { from: 1, to: 3, threadId: "a" },
      { from: 1, to: 3, threadId: "z" },
    ]);
  });

  it("merges disjoint thread spans and keeps whitespace-only comments inline", () => {
    const ranges = [
      { from: 1, to: 3, threadId: "whole" },
      { from: 3, to: 5, threadId: "whole" },
      { from: 2, to: 3, threadId: "inline" },
      { from: 0, to: 6, threadId: "excluded" },
    ];
    const result = partitionCodeComments(" abcd ", ranges, new Set(["excluded"]));
    expect([...result.whole]).toEqual(["whole"]);
    expect(result.inline).toEqual([{ from: 2, to: 3, threadId: "inline" }]);
    expect(codeThreadRange(ranges, "whole")).toEqual({ from: 1, to: 5 });
    expect(codeThreadRange(ranges, null)).toBeNull();
    expect(
      partitionCodeComments("   ", [{ from: 0, to: 3, threadId: "blank" }], new Set())
        .inline,
    ).toEqual([{ from: 0, to: 3, threadId: "blank" }]);
  });
});

describe("code measurements", () => {
  it("keeps tab expansion, long-line cutoff and empty-source fallback", () => {
    const measure = vi.fn((line: string) => line.length * 10);
    expect(measuredCodeWidth("a\tb\nxy", measure, 4, 3)).toBe(64);
    expect(measuredCodeWidth("", measure, 0, 3)).toBeNull();
    expect(measuredCodeWidth("\t", measure, 0, 0)).toBe(81);
    expect(measuredCodeWidth("x".repeat(5000), measure, 4, 0)).toBe(20032);
    const shortcut = vi.fn((line: string) => line.length * 10);
    measuredCodeWidth("x".repeat(900) + "\ny".repeat(100), shortcut, 4, 0);
    expect(shortcut).toHaveBeenCalledTimes(1);
  });

  it("temporarily measures table width and restores its inline style", () => {
    const table = document.createElement("table");
    table.style.width = "80px";
    vi.spyOn(table, "getBoundingClientRect").mockReturnValue(
      new DOMRect(0, 0, 123.5, 30),
    );
    expect(naturalTableWidth(table)).toBe(123.5);
    expect(table.style.width).toBe("80px");
    table.style.removeProperty("width");
    expect(naturalTableWidth(table)).toBe(123.5);
    expect(table.style.width).toBe("");
    const pane = document.createElement("div");
    Object.defineProperties(pane, {
      scrollWidth: { value: 200 },
      clientWidth: { value: 100 },
      scrollLeft: { value: 99, configurable: true },
    });
    expect(paneClippedOnRight(pane)).toBe(false);
    Object.defineProperty(pane, "scrollLeft", { value: 98 });
    expect(paneClippedOnRight(pane)).toBe(true);
  });
});

describe("document layout subscription lifecycle", () => {
  it("coalesces frames and disconnects only after the final subscriber leaves", () => {
    class Observer extends MutationObserver {
      static instances: Observer[] = [];
      readonly callback: MutationCallback;
      constructor(callback: MutationCallback) {
        super(callback);
        this.callback = callback;
        Observer.instances.push(this);
      }
      override observe = vi.fn();
      override disconnect = vi.fn();
    }
    vi.stubGlobal("MutationObserver", Observer);
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.push(callback);
      return frames.length;
    });
    const cancel = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    const first = vi.fn();
    const second = vi.fn();
    const stopFirst = observeDocumentLayout(document, first);
    const stopSecond = observeDocumentLayout(document, second);
    expect(Observer.instances).toHaveLength(1);
    const observer = Observer.instances[0];
    observer.callback([], observer);
    observer.callback([], observer);
    expect(frames).toHaveLength(1);
    stopFirst();
    frames[0](0);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    observer.callback([], observer);
    stopSecond();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledWith(2);
    stopSecond();
    const stopNew = observeDocumentLayout(document, first);
    stopFirst();
    expect(Observer.instances).toHaveLength(2);
    expect(Observer.instances[1].disconnect).not.toHaveBeenCalled();
    stopNew();
  });

  it("does nothing for detached documents without a window", () => {
    const notify = vi.fn();
    observeDocumentLayout(document.implementation.createHTMLDocument(), notify)();
    expect(notify).not.toHaveBeenCalled();
  });
});

describe("code block layout", () => {
  it("stops stale pane observers, ignores replaced panes and clears clipping on disposal", () => {
    const observed: Element[] = [];
    const disconnected = vi.fn();
    const resizes: ResizeObserverCallback[] = [];
    class Observer implements ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        resizes.push(callback);
      }
      observe(element: Element): void {
        observed.push(element);
      }
      disconnect(): void {
        disconnected();
      }
      unobserve(): void {}
    }
    vi.stubGlobal("ResizeObserver", Observer);
    const block = schema.node("codeBlock", null, schema.text("a,b\nc,d"));
    const view = new EditorView(document.body, {
      state: EditorState.create({ doc: schema.node("doc", null, [block]) }),
    });
    const dom = document.createElement("div");
    const contentDOM = document.createElement("code");
    const pre = document.createElement("pre");
    const pane = document.createElement("div");
    const table = document.createElement("table");
    pane.appendChild(table);
    dom.append(pane, pre);
    pre.append(contentDOM);
    document.body.append(dom);
    Object.defineProperties(pane, {
      scrollWidth: { value: 300 },
      clientWidth: { value: 100 },
      scrollLeft: { value: 0 },
    });
    vi.spyOn(table, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 150, 20));
    const syncSeat = vi.fn();
    const host = {
      dom,
      contentDOM,
      pre,
      view,
      node: block,
      destroyed: false,
      render: pane,
      getPos: () => 0,
      syncSeat,
    };
    const layout = new CodeBlockLayout(host, {
      borderWidth: 1.5,
      clipAttribute: "data-clip",
      documentGutter: () => 0,
      hasMenuSpace: () => true,
      peers: (): CodeBlockLayout[] => [layout],
    });
    layout.watchCsvFit(pane);
    expect(dom.style.getPropertyValue("--cw-fit")).toBe("153px");
    expect(observed).toContain(table);
    pane.dispatchEvent(new Event("scroll"));
    expect(dom.getAttribute("data-clip")).toBe("right");
    host.render = document.createElement("div");
    dom.style.setProperty("--cw-fit", "77px");
    // Stale callbacks must read the current pane rather than a captured host snapshot.
    const callback = resizes[0];
    callback([], new Observer(() => {}));
    expect(dom.style.getPropertyValue("--cw-fit")).toBe("77px");
    layout.dropFitWidth();
    expect(disconnected).toHaveBeenCalledTimes(2);
    expect(dom.getAttribute("data-clip")).toBeNull();
    expect(dom.style.getPropertyValue("--cw-fit")).toBe("");
    layout.unwatchCsvFit();
    layout.unwatchPaneCut();
    expect(disconnected).toHaveBeenCalledTimes(2);
    view.destroy();
  });
});

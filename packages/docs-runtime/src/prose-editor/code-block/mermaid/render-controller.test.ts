// @vitest-environment happy-dom
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { MermaidRenderResult } from "./render";
import { MermaidRenderController } from "./render-controller";

const schema = new Schema({
  nodes: {
    doc: { content: "codeBlock" },
    codeBlock: { content: "text*", toDOM: () => ["pre", ["code", 0]] },
    text: {},
  },
  marks: {},
});
const views: EditorView[] = [];
afterEach(() => {
  for (const view of views.splice(0)) view.destroy();
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

function deferredRender() {
  let settle: ((result: MermaidRenderResult) => void) | undefined;
  const promise = new Promise<MermaidRenderResult>((resolve) => {
    settle = resolve;
  });
  return {
    promise,
    resolve(result: MermaidRenderResult): void {
      if (!settle) throw new Error("Missing resolver");
      settle(result);
    },
  };
}

function fixture() {
  let node = schema.node("codeBlock", null, schema.text("first"));
  const view = new EditorView(document.body, {
    state: EditorState.create({ doc: schema.node("doc", null, [node]) }),
  });
  views.push(view);
  const dom = document.createElement("div");
  let pane = document.createElement("div");
  dom.append(pane);
  document.body.append(dom);
  let destroyed = false,
    pending = false,
    sourceOpen = false,
    theme = "light",
    mermaid = true;
  const requests: {
    source: string;
    theme: string;
    deferred: ReturnType<typeof deferredRender>;
  }[] = [];
  const paint = vi.fn(),
    position = vi.fn(),
    arrival = vi.fn(),
    held = vi.fn(),
    status = vi.fn(),
    sync = vi.fn();
  const host: ConstructorParameters<typeof MermaidRenderController>[0] = {
    dom,
    view,
    get node() {
      return node;
    },
    get render() {
      return pane;
    },
    get destroyed() {
      return destroyed;
    },
    get srcOpen() {
      return sourceOpen;
    },
    editor: null,
    lastPane: null,
    lastGood: null,
    lastOk: null,
    lastErr: null,
    isSyncPending: () => pending,
    caretInside: () => true,
    firstWait: () => true,
    measureWaiting: () => ({
      blockH: 30,
      blockW: 100,
      blockX: 0,
      fill: "white",
      stripHidden: false,
    }),
    playArrival: arrival,
    setHeld: held,
    setStatus: status,
    sync,
    mountMermaidSvg: (target, svg) => {
      target.innerHTML = svg;
    },
  };
  const controller = new MermaidRenderController(host, {
    theme: () => theme,
    ready: () => true,
    requestRenderer: () => {},
    unavailable: () => false,
    unavailableMessage: "unavailable",
    load: (source, theme) => {
      const deferred = deferredRender();
      requests.push({ source, theme, deferred });
      return deferred.promise;
    },
    isMermaid: () => mermaid,
    isRenderableMermaid: () => mermaid,
    paint,
    positionEditor: position,
    clearHover: () => {},
    stampFitWidth: () => {},
  });
  return {
    host,
    controller,
    requests,
    paint,
    position,
    arrival,
    held,
    status,
    sync,
    setSource(source: string) {
      node = schema.node("codeBlock", null, schema.text(source));
    },
    setTheme(value: string) {
      theme = value;
    },
    setPending(value: boolean) {
      pending = value;
    },
    openSource() {
      sourceOpen = true;
      vi.spyOn(view, "hasFocus").mockReturnValue(true);
    },
    replacePane() {
      pane = document.createElement("div");
      dom.replaceChildren(pane);
    },
    destroy() {
      destroyed = true;
    },
    leaveMermaid() {
      mermaid = false;
    },
  };
}

describe("Mermaid rendering lifecycle", () => {
  it("deduplicates in-flight requests and rejects stale results resolved out of order", async () => {
    const f = fixture();
    f.controller.syncMermaid("first");
    f.controller.syncMermaid("first");
    expect(f.requests).toHaveLength(1);
    f.setSource("second");
    f.controller.syncMermaid("second");
    f.requests[1].deferred.resolve({ ok: true, html: '<svg id="second"></svg>' });
    await Promise.resolve();
    expect(f.host.lastPane?.src).toBe("second");
    f.requests[0].deferred.resolve({ ok: true, html: '<svg id="first"></svg>' });
    await Promise.resolve();
    expect(f.host.lastPane?.src).toBe("second");
    expect(f.host.render?.querySelector("#second")).not.toBeNull();
    expect(f.controller.inflight).toBeNull();
    expect(f.arrival).toHaveBeenCalledTimes(1);
  });

  it("leaves pending sync alone and reuses a cached source/theme", async () => {
    const f = fixture();
    f.setPending(true);
    f.controller.syncMermaid("first");
    expect(f.requests).toHaveLength(0);
    f.setPending(false);
    f.controller.syncMermaid("first");
    f.requests[0].deferred.resolve({ ok: true, html: "<svg></svg>" });
    await Promise.resolve();
    f.controller.syncMermaid("first");
    expect(f.requests).toHaveLength(1);
    f.setTheme("dark");
    f.controller.syncMermaid("first");
    expect(f.requests).toHaveLength(2);
    expect(f.requests[1].theme).toBe("dark");
  });

  it("ignores results after destruction, pane replacement or leaving Mermaid", async () => {
    for (const reason of ["destroy", "replace", "language"]) {
      const f = fixture();
      f.controller.syncMermaid("first");
      if (reason === "destroy") f.destroy();
      else if (reason === "replace") f.replacePane();
      else f.leaveMermaid();
      f.requests[0].deferred.resolve({ ok: true, html: "<svg></svg>" });
      await Promise.resolve();
      expect(f.host.lastPane).toBeNull();
      expect(f.position).not.toHaveBeenCalled();
    }
  });

  it("holds the last valid diagram while the source editor has focus and reports the error location", async () => {
    const f = fixture();
    f.controller.syncMermaid("first");
    f.requests[0].deferred.resolve({ ok: true, html: '<svg id="good"></svg>' });
    await Promise.resolve();
    f.openSource();
    f.setSource("broken");
    f.controller.syncMermaid("broken");
    f.requests[1].deferred.resolve({
      ok: false,
      html: "error",
      error: "invalid",
      at: { position: 2, length: 1 },
    });
    await Promise.resolve();
    expect(f.held).toHaveBeenCalledWith("invalid", { position: 2, length: 1 });
    expect(f.host.lastPane).toBeNull();
    expect(f.host.lastErr).toEqual({ lang: "mermaid", src: "broken" });
    expect(f.host.render?.querySelector("#good")).not.toBeNull();
  });

  it("rethemes the last good diagram after an error and keeps its stale state", async () => {
    const f = fixture();
    f.controller.syncMermaid("first");
    f.requests[0].deferred.resolve({ ok: true, html: '<svg id="light"></svg>' });
    await Promise.resolve();
    f.setSource("broken");
    f.controller.syncMermaid("broken");
    f.requests[1].deferred.resolve({ ok: false, html: "error", error: "invalid" });
    await Promise.resolve();
    f.setTheme("dark");
    f.controller.rethemeMermaid();
    expect(f.requests.at(-1)?.source).toBe("first");
    f.requests.at(-1)?.deferred.resolve({ ok: true, html: '<svg id="dark"></svg>' });
    await Promise.resolve();
    expect(f.host.lastGood?.theme).toBe("dark");
    expect(f.host.dom.classList.contains("cw-stale")).toBe(true);
    expect(f.host.render?.querySelector("#dark")).not.toBeNull();
  });
});

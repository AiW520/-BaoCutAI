import type { Node } from "prosemirror-model";
import type { EditorView } from "prosemirror-view";
import type { LabelEditorSession } from "../label-editor/session";
import type {
  DiagramErrorPosition,
  DiagramSnapshot,
  DiagramWaitingBox,
  MermaidRenderResult,
} from "./render";
interface MermaidRenderHost {
  readonly dom: HTMLDivElement;
  readonly node: Node;
  readonly render: HTMLDivElement | null;
  readonly destroyed: boolean;
  readonly srcOpen: boolean;
  readonly editor: LabelEditorSession | null;
  readonly view: EditorView;
  lastPane: DiagramSnapshot | null;
  lastGood: DiagramSnapshot | null;
  lastOk: {
    src: string;
    html: string;
    theme: string;
  } | null;
  lastErr: {
    lang: string;
    src: string;
  } | null;
  isSyncPending(): boolean;
  caretInside(): boolean;
  firstWait(): boolean;
  measureWaiting(pane: HTMLDivElement): DiagramWaitingBox | null;
  playArrival(pane: HTMLDivElement, box: DiagramWaitingBox, kind: "diagram"): void;
  mountMermaidSvg(pane: HTMLDivElement, svg: string): void;
  setHeld(error: string, at?: DiagramErrorPosition): void;
  setStatus(
    error: string | null,
    good?: DiagramSnapshot,
    at?: DiagramErrorPosition,
  ): void;
  sync(): void;
}
interface MermaidRenderOptions {
  theme(): string;
  ready(): boolean;
  requestRenderer(): void;
  unavailable(): boolean;
  unavailableMessage: string;
  load(source: string, theme: string, host: HTMLDivElement): Promise<MermaidRenderResult>;
  isMermaid(): boolean;
  isRenderableMermaid(): boolean;
  paint(): void;
  positionEditor(): void;
  clearHover(): void;
  stampFitWidth(pane: HTMLDivElement, width: number | null): void;
}
export class MermaidRenderController {
  private readonly host: MermaidRenderHost;
  private readonly options: MermaidRenderOptions;
  private sequence = 0;
  inflight: {
    src: string;
    theme: string;
  } | null = null;
  constructor(host: MermaidRenderHost, options: MermaidRenderOptions) {
    this.host = host;
    this.options = options;
  }
  abandonMermaidRender() {
    this.sequence++;
    this.inflight = null;
  }
  isLiveKick(sequence: number, pane: HTMLDivElement | null) {
    return (
      !this.host.destroyed && sequence === this.sequence && this.host.render === pane
    );
  }
  syncMermaid(source: string) {
    const pane = this.host.render;
    if (!pane) return;
    if (this.host.isSyncPending()) {
      this.options.paint();
      return;
    }
    const theme = this.options.theme();
    if (
      this.host.lastPane?.lang === "mermaid" &&
      this.host.lastPane.src === source &&
      this.host.lastPane.theme === theme
    ) {
      if (this.inflight) {
        this.abandonMermaidRender();
        this.host.dom.classList.remove("cw-stale");
      }
      this.options.paint();
      return;
    }
    if (this.inflight?.src === source && this.inflight.theme === theme) {
      this.options.paint();
      return;
    }
    const sequence = ++this.sequence;
    this.inflight = {
      src: source,
      theme,
    };
    this.options.clearHover();
    if (!this.options.ready()) this.options.requestRenderer();
    if (this.host.lastPane?.lang === "mermaid" || this.host.lastGood?.lang === "mermaid")
      this.host.dom.classList.add("cw-stale");
    else {
      pane.textContent = this.options.ready()
        ? "Rendering diagram…"
        : this.options.unavailable()
          ? this.options.unavailableMessage
          : "Loading diagram renderer…";
      pane.classList.add("cw-mm-loading");
      pane.classList.toggle("cw-wait-box", this.host.firstWait());
      this.options.stampFitWidth(pane, null);
      this.host.lastPane = null;
      this.host.lastErr = null;
    }
    this.options.load(source, theme, this.host.dom).then((input2) => {
      if (!this.isLiveKick(sequence, pane)) return;
      if (this.host.node.textContent !== source || !this.options.isMermaid()) {
        this.inflight = null;
        return;
      }
      this.inflight = null;
      const value3 = pane.classList.contains("cw-wait-box")
        ? this.host.measureWaiting(pane)
        : null;
      pane.classList.remove("cw-mm-loading", "cw-wait-box");
      if (!input2.ok) {
        this.host.lastErr = {
          lang: "mermaid",
          src: source,
        };
        const value4 =
          (this.host.editor != null ||
            (this.host.srcOpen &&
              this.host.view.hasFocus() &&
              this.host.caretInside())) &&
          this.host.lastOk?.theme === theme
            ? this.host.lastOk
            : null;
        if (value4) {
          if (this.host.lastPane?.html !== value4.html)
            this.host.mountMermaidSvg(pane, value4.html);
          this.host.lastPane = null;
          this.host.dom.classList.remove("cw-stale");
          this.host.setHeld(input2.error, input2.at);
          this.options.paint();
          this.options.positionEditor();
          return;
        }
        this.host.lastPane = null;
        this.host.dom.classList.remove("cw-mm-held");
        const value5 = this.host.lastGood?.lang === "mermaid" ? this.host.lastGood : null;
        if (value5) this.host.mountMermaidSvg(pane, value5.html);
        else {
          pane.innerHTML = input2.html;
          this.options.stampFitWidth(pane, null);
        }
        this.host.dom.classList.toggle("cw-stale", value5 != null);
        this.host.setStatus(input2.error, value5 ?? undefined, input2.at);
        this.options.paint();
        this.regreyMermaid(this.options.theme());
        return;
      }
      if (!this.host.srcOpen || this.host.lastGood?.lang !== "mermaid")
        this.host.lastGood = {
          lang: "mermaid",
          src: source,
          html: input2.html,
          theme,
        };
      this.host.lastPane = {
        lang: "mermaid",
        src: source,
        html: input2.html,
        theme,
      };
      this.host.lastOk = {
        src: source,
        html: input2.html,
        theme,
      };
      this.host.lastErr = null;
      this.host.mountMermaidSvg(pane, input2.html);
      this.host.dom.classList.remove("cw-stale", "cw-mm-held");
      if (value3) this.host.playArrival(pane, value3, "diagram");
      this.host.setStatus(null);
      this.options.paint();
      this.options.positionEditor();
    });
  }
  rethemeMermaid() {
    if (!this.host.render || !this.options.isRenderableMermaid()) return;
    if (
      this.host.lastErr?.lang === "mermaid" &&
      this.host.lastErr.src === this.host.node.textContent &&
      !this.inflight
    ) {
      this.regreyMermaid(this.options.theme());
      return;
    }
    this.host.sync();
  }
  regreyMermaid(theme: string) {
    const pane = this.host.render;
    const previous = this.host.lastGood;
    if (!pane || previous?.lang !== "mermaid" || previous.theme === theme) return;
    const sequence = ++this.sequence;
    this.options.load(previous.src, theme, this.host.dom).then((input2) => {
      if (
        !this.isLiveKick(sequence, pane) ||
        this.host.lastErr?.lang !== "mermaid" ||
        !input2.ok
      )
        return;
      this.host.lastGood = {
        lang: "mermaid",
        src: previous.src,
        html: input2.html,
        theme,
      };
      this.host.mountMermaidSvg(pane, input2.html);
      this.host.dom.classList.add("cw-stale");
      this.options.paint();
    });
  }
}

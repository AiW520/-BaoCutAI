import type { Node } from "prosemirror-model";
import type { EditorView } from "prosemirror-view";
import { observeDocumentLayout, observeElementSize } from "./layout-observer";
import {
  codeFont,
  codeMeasurementContext,
  measuredCodeWidth,
  naturalTableWidth,
  paneClippedOnRight,
} from "./text-measurement";

interface CodeBlockLayoutHost {
  readonly dom: HTMLDivElement;
  readonly contentDOM: HTMLElement;
  readonly pre: HTMLPreElement;
  readonly view: EditorView;
  readonly node: Node;
  readonly destroyed: boolean;
  readonly render: HTMLDivElement | null;
  getPos(): number | undefined;
  syncSeat(): void;
}

interface CodeBlockLayoutOptions {
  borderWidth: number;
  clipAttribute: string;
  documentGutter(document: Document): number;
  hasMenuSpace(width: number, right: number, coarse: boolean): boolean;
  peers(): Iterable<CodeBlockLayout>;
}

const fontSubscriptions = new WeakSet<Document>();

/** Per-node measurements and listeners; the host's changing state is always read live. */
export class CodeBlockLayout {
  seatCrowded = false;
  private font = "";
  private readonly advances = new Map<string, number>();
  private stopCsvFit: (() => void) | null = null;
  private stopSeat: (() => void) | null = null;
  private stopPaneCut: (() => void) | null = null;
  private watchedPaneChild: Element | null = null;

  private readonly host: CodeBlockLayoutHost;
  private readonly options: CodeBlockLayoutOptions;

  constructor(host: CodeBlockLayoutHost, options: CodeBlockLayoutOptions) {
    this.host = host;
    this.options = options;
  }

  stampFitWidth(pane: HTMLDivElement, width: number | null | undefined): void {
    if (width == null || !(width > 0)) return this.dropFitWidth();
    const style = this.host.dom.ownerDocument.defaultView?.getComputedStyle(pane);
    const padding =
      (Number.parseFloat(style?.paddingLeft ?? "") || 0) +
      (Number.parseFloat(style?.paddingRight ?? "") || 0);
    this.host.dom.style.setProperty(
      "--cw-fit",
      `${Math.ceil(width + padding + 2 * this.options.borderWidth)}px`,
    );
    this.watchPaneCut(pane);
  }

  dropFitWidth(): void {
    this.host.dom.style.removeProperty("--cw-fit");
    this.unwatchCsvFit();
    this.unwatchPaneCut();
  }

  watchCsvFit(pane: HTMLDivElement): void {
    this.unwatchCsvFit();
    const table = pane.querySelector<HTMLTableElement>(":scope > table");
    if (!table) return this.stampFitWidth(pane, null);
    const measure = (): void => {
      if (this.host.destroyed || this.host.render !== pane || table.parentNode !== pane)
        return;
      const width = naturalTableWidth(table);
      if (width != null) this.stampFitWidth(pane, width);
    };
    const observer = observeElementSize(pane.ownerDocument, [table], measure);
    if (observer) this.stopCsvFit = () => observer.disconnect();
    measure();
  }

  unwatchCsvFit(): void {
    const stop = this.stopCsvFit;
    this.stopCsvFit = null;
    stop?.();
  }

  private outsideSeatCrowded(): boolean {
    const bounds = this.host.dom.getBoundingClientRect();
    if (!(bounds.width > 0)) return false;
    const document = this.host.dom.ownerDocument;
    const window = document.defaultView;
    const width =
      (document.documentElement.clientWidth || window?.innerWidth || 0) -
      this.options.documentGutter(document);
    const coarse =
      typeof window?.matchMedia === "function" &&
      window.matchMedia("(pointer:coarse)").matches;
    return !this.options.hasMenuSpace(width, bounds.right, coarse);
  }

  stampCodeFit(): void {
    const position = this.host.getPos();
    if (position != null && this.host.view.state.doc.resolve(position).depth > 0) {
      this.host.dom.style.removeProperty("--cw-fit");
      this.dropCodeSeat();
      return;
    }
    this.watchCodeSeat();
    const document = this.host.dom.ownerDocument;
    const window = document.defaultView;
    const context = codeMeasurementContext(document);
    if (!this.host.dom.isConnected) {
      this.host.dom.style.removeProperty("--cw-fit");
      queueMicrotask(() => {
        if (
          !this.host.destroyed &&
          this.host.dom.isConnected &&
          !this.host.dom.hasAttribute("data-live")
        )
          this.stampCodeFit();
      });
      return;
    }
    const pixels = (value: string): number => Number.parseFloat(value ?? "") || 0;
    const contentStyle = window?.getComputedStyle(this.host.contentDOM);
    const preStyle = window?.getComputedStyle(this.host.pre);
    let width: number | null = null;
    if (context && contentStyle && preStyle) {
      context.font = "10px sans-serif";
      const font = codeFont(contentStyle);
      if (font !== this.font || this.advances.size > 4096) this.advances.clear();
      this.font = font;
      context.font = font;
      if (context.font !== "10px sans-serif") {
        const padding =
          pixels(preStyle.paddingLeft) +
          pixels(preStyle.paddingRight) +
          pixels(preStyle.borderLeftWidth) +
          pixels(preStyle.borderRightWidth);
        const measure = (line: string): number => {
          let advance = this.advances.get(line);
          if (advance === undefined)
            this.advances.set(line, (advance = context.measureText(line).width));
          return advance;
        };
        width = measuredCodeWidth(
          this.host.node.textContent,
          measure,
          Number.parseInt(preStyle.tabSize, 10),
          padding + 1,
        );
      }
    }
    if (width === null) this.host.dom.style.removeProperty("--cw-fit");
    else this.host.dom.style.setProperty("--cw-fit", `${width}px`);
    if (document.fonts && !fontSubscriptions.has(document)) {
      fontSubscriptions.add(document);
      document.fonts.addEventListener("loadingdone", () => {
        for (const peer of this.options.peers()) {
          if (
            peer.host.destroyed ||
            peer.host.dom.ownerDocument !== document ||
            peer.host.dom.hasAttribute("data-live")
          )
            continue;
          peer.advances.clear();
          peer.stampCodeFit();
        }
      });
    }
  }

  private currentFont(): string {
    return codeFont(
      this.host.dom.ownerDocument.defaultView?.getComputedStyle(this.host.contentDOM),
    );
  }

  private watchCodeSeat(): void {
    if (this.stopSeat) return;
    const document = this.host.dom.ownerDocument;
    const judge = (): void => this.judgeCodeSeat();
    const observer = observeElementSize(document, [this.host.dom], judge);
    const window = document.defaultView;
    window?.addEventListener("resize", judge, { passive: true });
    const stopLayout = observeDocumentLayout(document, judge);
    this.stopSeat = () => {
      observer?.disconnect();
      window?.removeEventListener("resize", judge);
      stopLayout();
    };
    if (!observer) judge();
  }

  private judgeCodeSeat(): void {
    if (this.host.destroyed) return;
    if (this.currentFont() !== this.font) this.stampCodeFit();
    const crowded = this.outsideSeatCrowded();
    if (crowded === this.seatCrowded) return;
    this.seatCrowded = crowded;
    this.host.syncSeat();
  }

  dropCodeSeat(): void {
    if (!this.stopSeat) return;
    this.stopSeat();
    this.stopSeat = null;
    this.font = "";
    this.advances.clear();
    if (!this.seatCrowded) return;
    this.seatCrowded = false;
    this.host.syncSeat();
  }

  private watchPaneCut(pane: HTMLDivElement): void {
    const child =
      pane.querySelector(":scope > svg") ?? pane.querySelector(":scope > table");
    if (this.stopPaneCut && this.watchedPaneChild === child) return;
    this.unwatchPaneCut();
    const live = (): boolean => !this.host.destroyed && this.host.render === pane;
    const scroll = (): void => {
      if (!live()) return;
      const clipped = paneClippedOnRight(pane);
      if (
        clipped !==
        (this.host.dom.getAttribute(this.options.clipAttribute) === "right")
      ) {
        if (clipped) this.host.dom.setAttribute(this.options.clipAttribute, "right");
        else this.host.dom.removeAttribute(this.options.clipAttribute);
      }
    };
    const resize = (): void => {
      if (!live()) return;
      scroll();
      const crowded = this.outsideSeatCrowded();
      if (crowded !== this.seatCrowded) {
        this.seatCrowded = crowded;
        this.host.syncSeat();
      }
    };
    const elements = child
      ? [pane, child, this.host.view.dom]
      : [pane, this.host.view.dom];
    const observer = observeElementSize(pane.ownerDocument, elements, resize);
    const stopLayout = observeDocumentLayout(pane.ownerDocument, resize);
    pane.addEventListener("scroll", scroll, { passive: true });
    this.watchedPaneChild = child;
    this.stopPaneCut = () => {
      observer?.disconnect();
      stopLayout();
      pane.removeEventListener("scroll", scroll);
      this.host.dom.removeAttribute(this.options.clipAttribute);
      this.watchedPaneChild = null;
      this.seatCrowded = false;
      this.host.syncSeat();
    };
    if (!observer) resize();
  }

  unwatchPaneCut(): void {
    const stop = this.stopPaneCut;
    this.stopPaneCut = null;
    stop?.();
  }
}

import type { Node } from "prosemirror-model";
import { addCodeCommentId, codeCommentIdsAttribute } from "../comment-ids";
import type { CodeCommentRange } from "../comment-ranges";
import { bareIdentifierOffsets } from "./bare-identifiers";
import { labelOverlap, locateLabelSource } from "./label-location";
import type {
  DiagramLabel,
  HeldDiagramLabel,
  LabelSource,
  SourceRange,
} from "./label-source";
import { collectDiagramLabels, groupSequenceMessages } from "./labels";
import { MermaidTextHighlights } from "./text-highlights";
interface MermaidAnnotationHost {
  readonly render: HTMLDivElement | null;
  readonly dom: HTMLDivElement;
  readonly node: Node;
  readonly srcOpen: boolean;
  readonly inPlace: HeldDiagramLabel | null;
  readonly selRange: SourceRange | null;
  splitCommentRanges(): CodeCommentRange[];
  applyActivePaneHighlight(): void;
}
interface MermaidAnnotationOptions {
  isResolved(threadId: string): boolean;
}
export class MermaidAnnotations {
  private readonly host: MermaidAnnotationHost;
  private readonly options: MermaidAnnotationOptions;
  private readonly tagged: Element[] = [];
  private readonly highlights = new MermaidTextHighlights();
  constructor(host: MermaidAnnotationHost, options: MermaidAnnotationOptions) {
    this.host = host;
    this.options = options;
  }
  forgetTags(): void {
    this.tagged.length = 0;
  }
  syncFlags(): void {
    this.highlights.syncFlags();
  }
  paintMermaid() {
    const pane = this.host.render;
    if (!pane) return;
    groupSequenceMessages(pane);
    this.highlights.clear();
    for (const value of this.tagged) {
      value.classList.remove(
        "cw-mm-hl",
        "cw-mm-sel",
        "cw-mm-part-sel",
        "cw-mm-inplace",
        "cw-mm-part-hl",
        "cw-on",
        "cw-res",
      );
      value.removeAttribute("data-comment-id");
      value.removeAttribute(codeCommentIdsAttribute);
    }
    this.tagged.length = 0;
    if (!this.host.dom.classList.contains("cw-broken")) {
      const value = this.host.splitCommentRanges();
      const selRange = this.host.selRange;
      if (value.length || selRange) {
        const textContent = this.host.node.textContent;
        const value2 = collectDiagramLabels(pane);
        const value3 = !this.host.srcOpen ? this.host.inPlace : null;
        if (selRange && value3) {
          let value6 =
            value3.el.isConnected && pane.contains(value3.el) ? value3.el : null;
          if (!value6) {
            const value7 =
              value2.find(
                (input) => input.id === value3.id && input.label === value3.label,
              ) ??
              (value3.label != null
                ? value2.find((input) => input.label === value3.label)
                : undefined);
            if (value7) value3.el = value6 = value7.el;
          }
          if (value6) {
            value6.classList.add("cw-mm-sel", "cw-mm-inplace");
            this.tagged.push(value6);
            const value7 = value3.to - value3.from;
            const value8 = selRange.from <= value3.from && selRange.to >= value3.to;
            if (value3.exact && !value8) {
              if (
                this.highlights.splitAt(
                  value6,
                  selRange.from - value3.from,
                  selRange.to - value3.from,
                  "cw-mm-txt-sel",
                )
              )
                value6.classList.add("cw-mm-part-sel");
            } else if (value3.exact)
              this.highlights.splitAt(value6, 0, value7, "cw-mm-txt-sel");
            else
              this.highlights.splitAt(
                value6,
                0,
                (value6.textContent ?? "").trim().length,
                "cw-mm-txt-sel",
              );
          }
        }
        const entries = new Map<Element, LabelSource | null>();
        const value4 = (input: DiagramLabel) => {
          let entry = entries.get(input.el);
          if (entry === undefined)
            entries.set(
              input.el,
              (entry = locateLabelSource(textContent, input.id, input.label)),
            );
          return entry;
        };
        const value5 = (input: number, options: number) =>
          value2.flatMap((input2) => {
            const value6 = value4(input2);
            return value6 && Math.min(options, value6.to) > Math.max(input, value6.from)
              ? [
                  {
                    n: input2,
                    d: value6,
                  },
                ]
              : [];
          });
        if (selRange && !value3) {
          const value6 = (input: DiagramLabel, options: LabelSource) => {
            input.el.classList.add("cw-mm-sel");
            const value7 = labelOverlap(options, selRange.from, selRange.to);
            if (
              value7 &&
              !value7.whole &&
              this.highlights.splitAt(input.el, value7.start, value7.end, "cw-mm-txt-sel")
            )
              input.el.classList.add("cw-mm-part-sel");
            else if (input.label)
              this.highlights.splitAt(input.el, 0, input.label.length, "cw-mm-txt-sel");
            this.tagged.push(input.el);
          };
          for (let { n: n3, d: d7 } of value5(selRange.from, selRange.to)) value6(n3, d7);
          for (const value7 of value2) {
            if (value7.id == null || value7.el.classList.contains("cw-mm-sel")) continue;
            const length = value7.id.length;
            const match = bareIdentifierOffsets(textContent, value7.id).find(
              (input) =>
                Math.min(selRange.to, input + length) > Math.max(selRange.from, input),
            );
            if (match == null) continue;
            const value8 =
              value7.label === value7.id
                ? {
                    from: match,
                    to: match + length,
                  }
                : null;
            value6(value7, {
              from: match,
              to: match + length,
              label: value8,
            });
          }
        }
        for (const value6 of value)
          for (let { n: n3, d: d7 } of value5(value6.from, value6.to)) {
            const el = n3.el;
            el.classList.add("cw-mm-hl");
            const value7 = addCodeCommentId(el, value6.threadId);
            if (value7) {
              el.classList.toggle("cw-res", this.options.isResolved(value6.threadId));
              this.tagged.push(el);
            } else if (!this.options.isResolved(value6.threadId))
              el.classList.remove("cw-res");
            const value8 = value7 ? labelOverlap(d7, value6.from, value6.to) : null;
            if (
              value8 &&
              !value8.whole &&
              this.highlights.splitAt(el, value8.start, value8.end, "cw-mm-txt-hl")
            )
              el.classList.add("cw-mm-part-hl");
            else if (value7 && n3.label)
              this.highlights.splitAt(el, 0, n3.label.length, "cw-mm-txt-hl");
          }
      }
    }
    this.host.applyActivePaneHighlight();
  }
}

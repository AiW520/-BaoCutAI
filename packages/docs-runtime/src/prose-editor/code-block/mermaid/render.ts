export interface DiagramSnapshot {
  lang: string;
  src: string;
  html: string;
  theme?: string;
}
export interface DiagramErrorPosition {
  position: number;
  length: number;
}
export interface DiagramWaitingBox {
  blockH: number;
  blockW: number;
  blockX: number;
  fill: string;
  stripHidden: boolean;
}
export type MermaidRenderResult =
  | {
      ok: true;
      html: string;
    }
  | {
      ok: false;
      html: string;
      error: string;
      at?: DiagramErrorPosition;
    };

/** The installed renderer's public operations used by the iframe. */
export interface MermaidLibrary {
  initialize(configuration: Record<string, unknown>): void;
  parse(source: string): Promise<unknown>;
  render(
    id: string,
    source: string,
  ): Promise<{
    svg: string;
  }>;
}
declare global {
  var mermaid: MermaidLibrary | undefined;
}

/** Dynamic subtitle DTOs. Rust caption-scene owns semantic validation and evaluation. */
export type CaptionValueType = 'scalar' | 'integer' | 'length' | 'time' | 'angle' | 'bool' | 'color';
export type CaptionUnit = 'cue' | 'page' | 'line' | 'word' | 'grapheme';
export type CaptionWordState = 'active' | 'read' | 'unread';
export type CaptionValue = number | boolean | string;
export type CaptionExpression =
  | { op: 'literal'; type: CaptionValueType; value: CaptionValue }
  | { op: 'read'; path: string }
  | { op: 'call'; function: string; args: CaptionExpression[] }
  | { op: 'if'; condition: CaptionExpression; then: CaptionExpression; else: CaptionExpression };
export interface CaptionClock {
  unit: CaptionUnit;
  origin: 'start' | 'end';
  offset?: { ticks: number; timescale: number };
  stagger?: { ticks: number; timescale: number };
  repeat?: { iterations: number; mode: 'loop' | 'yoyo' } | null;
  duration: { kind: 'fixed'; ticks: number; timescale: number } | { kind: 'unit-span' };
}
export type CaptionDynamicValue =
  | { kind: 'constant'; value: CaptionValue }
  | { kind: 'expression'; expression: CaptionExpression }
  | { kind: 'keyframes'; clock: CaptionClock; keys: { at: number; value: CaptionValue }[];
      interpolation?: 'linear' | 'step' | 'ease-out-quad' | { 'cubic-bezier': { x1: number; y1: number; x2: number; y2: number } }; fill?: { before?: 'none' | 'hold'; after?: 'none' | 'hold' } };
export interface CaptionLength { value: number; parameter?: string | null; basis: 'absolute' | 'canvasWidth' | 'canvasHeight' | 'canvasShortEdge'; offset?: number }
export type CaptionFilter =
  | { kind: 'all' }
  | { kind: 'state'; value: CaptionWordState }
  | { kind: 'tag'; value: string }
  | { kind: 'range'; start: number; end: number }
  | { kind: 'parity'; odd: boolean }
  | { kind: 'and' | 'or'; filters: CaptionFilter[] }
  | { kind: 'not'; filter: CaptionFilter };
export interface CaptionSceneNode {
  id: string;
  type: 'group' | 'text' | 'shape' | 'image' | 'repeat';
  resourceId?: string | null;
  fit?: 'contain' | 'cover' | 'stretch';
  zIndex?: number;
  children?: CaptionSceneNode[];
  selectorId?: string | null;
  /** Omit to bind the cue; a string is a static text layer. */
  text?: { source: 'cue' } | { source: 'static'; text: string } | null;
  style?: {
    fontFamily?: string; fontSize?: CaptionLength; fontWeight?: number; italic?: boolean;
    letterSpacing?: number; lineHeight?: number; fill?: string;
    stroke?: { width: number; color: string } | null;
    paints?: { id: string; strokeWidth?: number; offset?: [number, number]; paint:
      | { kind: 'solid'; color: string }
      | { kind: 'linear'; from: [number, number]; to: [number, number]; stops: { at: number; color: string }[] }
    }[];
  };
  stateStyles?: { unit?: 'word'; active?: { fill: string } | null; read?: { fill: string } | null; unread?: { fill: string } | null };
  properties?: Record<string, CaptionDynamicValue>;
}
export interface CaptionScene {
  schema: 'baocut.caption-scene/1';
  materials?: CaptionMaterial[];
  evaluationVersion: 1;
  requiredCapabilities?: string[];
  resources?: { id: string; assetRef: { id: string; revision: string }; contentHash: string }[];
  parameters?: { id: string; type: CaptionValueType; default: CaptionValue; min?: number | null; max?: number | null }[];
  layout: {
    width: CaptionLength; x: CaptionLength; y: CaptionLength; maxLines?: number;
    layoutEvaluation?: 'static' | 'per-sample'; overflow?: 'error' | 'visible';
    bindings?: { nodeId?: string | null; property: 'width' | 'x' | 'y' | 'fontSize' | 'letterSpacing' | 'lineHeight'; value: CaptionDynamicValue }[]; pagination?: { unit?: 'word'; maxUnitsPerPage?: number | null }; align?: 'left' | 'center' | 'right'; leadingGap?: 'show' | 'hide';
  };
  speechState?: { gapPolicy?: 'none' | 'hold-previous'; tailPolicy?: 'none' | 'hold-last'; timingPolicy?: 'require-word-timing' | 'estimated' };
  nodes: CaptionSceneNode[];
  selectors?: { id: string; nodeId: string; unit: CaptionUnit; filter?: CaptionFilter }[];
  functions?: { id: string; arguments: { name: string; type: CaptionValueType }[]; returns: CaptionValueType; body: CaptionExpression }[];
  animations?: { id: string; target: { nodeId: string; selectorId?: string | null }; property: string;
    value: CaptionDynamicValue; composite: 'replace' | 'add' | 'multiply'; priority?: number }[];
}
export interface CaptionSceneStyleBody {
  schema: 'baocut.caption-scene-style/1';
  scene: { kind: 'inline'; value: CaptionScene };
  parameters?: Record<string, CaptionValue>;
}
export interface CaptionPresentation {
  parameters?: Record<string, CaptionValue>;
  cueOverrides?: { cueId: string; occurrenceId?: string | null; parameters: Record<string, CaptionValue> }[];
  wordTags?: Record<string, string[]>;
  /** 16 hexadecimal digits; omitted values resolve to zero. */
  seed?: string;
}

/** Ordered cue-local materials. Feedback evaluates finite past samples of the preceding stack. */
export type CaptionMaterial =
  | { kind: 'blur'; id: string; radius: CaptionDynamicValue; passes?: number }
  | { kind: 'feedback'; id: string; samples: number; step: { ticks: number; timescale: number }; decay: number; offset?: [number, number] };

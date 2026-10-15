import type { Node as ProseMirrorNode } from "prosemirror-model";
import type { Transaction as ProseMirrorTransaction } from "prosemirror-state";

export interface CharacterIdParts {
  sess: string;
  i: number;
}

/** A compact, consecutive interval of code-point identifiers from one session. */
export interface CharacterSpan {
  sess: string;
  start: number;
  len: number;
}

export interface CharacterRunView {
  id: string;
  len: number;
}

export interface BlockCharacterRuns {
  bid: string;
  runs: CharacterRunView[];
  opaque?: boolean;
}

export type CharacterOffsetIndex =
  | { plain: true; size: number }
  | { plain: false; starts: Uint32Array; ends: Uint32Array };

export interface ProseBlockPosition {
  pos: number;
  node: ProseMirrorNode;
}

export interface TextBlockPosition {
  node: ProseMirrorNode;
  bid: string | null;
  start: number;
  offset: number;
}

/** Transaction positions and the identifiers allocated for newly inserted text. */
export interface InsertedCharacterRun {
  from: number;
  firstId: string;
  len: number;
  over?: boolean;
}

export interface CharacterRunTable {
  spans: CharacterSpan[];
  opaque: boolean;
  readonly length: number;
  push(span: CharacterSpan): void;
  keyAt(index: number): string | null;
  offsetOf(id: string): number;
  range(index: number, length: number): [string, string] | null;
  cut(index: number): number;
  mergeAround(index: number): void;
  insert(index: number, session: string, start: number, length: number): void;
  remove(index: number, length: number): string[];
  renameAt(index: number, id: string): void;
  toView(): CharacterRunView[];
}

export interface CharacterLedger {
  readonly generation: number;
  readonly drifted: string | null;
  readonly doubted: ReadonlyMap<string, string>;
  runsOf(blockId: string): CharacterRunTable | undefined;
  doubt(blockId: string, reason: string): boolean;
  save(): () => void;
  idAt(position: number): string | null;
  posOf(id: string, useHolderCache?: boolean): number | null;
  holdersOf(id: string): string[];
  holderOf(id: string): string | null;
  idsIn(from: number, to: number): string[];
  blockAt(position: number): { bid: string; start: number; end: number } | null;
  posOfBlock(id: string): number | null;
  predict(length: number): string;
  atLeast(counter: number): void;
  counter(counter?: number): number;
  taught(counter: number): void;
  floor(): number;
  mapThrough(
    transaction: ProseMirrorTransaction,
    inserted: readonly InsertedCharacterRun[],
    joined?: readonly (readonly string[])[],
    allowDoubt?: boolean,
  ): void;
  salvageDrift(): string | null;
  settle(renames: Iterable<readonly [string, string]>): void;
  load(
    blocks: readonly BlockCharacterRuns[],
    merge?: boolean,
    allowDoubt?: boolean,
  ): void;
  dump(): BlockCharacterRuns[];
}

/** ProseMirror text nodes always carry a string, although Node.text is optional. */
function isProseTextNode(
  node: ProseMirrorNode,
): node is ProseMirrorNode & { readonly text: string } {
  return node.isText;
}
var codePointUTF16Width = (
  input: string,
  options: number,
  ..._extraArguments: unknown[]
) => {
  let value = input.charCodeAt(options);
  let value2 = input.charCodeAt(options + 1);
  return value >= 55296 && value <= 56319 && value2 >= 56320 && value2 <= 57343
    ? 2
    : 1;
};
export function codePointCount(input: string, ..._extraArguments: unknown[]) {
  let index = 0;
  for (
    let index2: number = 0;
    index2 < input.length;
    index2 += codePointUTF16Width(input, index2)
  )
    index++;
  return index;
}
export function* pmCharacterOffsets(
  input: ProseMirrorNode,
  ..._extraArguments: unknown[]
): Generator<[number, number], void, unknown> {
  let index: number = 0;
  for (let index2 = 0; index2 < input.childCount; index2++) {
    let value = input.child(index2);
    let value2 = isProseTextNode(value) ? value.text : null;
    if (value2 === null) yield [index, index + value.nodeSize];
    else
      for (
        let index3: number = 0;
        index3 < value2.length;
        index3 += codePointUTF16Width(value2, index3)
      )
        yield [
          index + index3,
          index + index3 + codePointUTF16Width(value2, index3),
        ];
    index += value.nodeSize;
  }
}
function* pmCharacterStarts(
  input: ProseMirrorNode,
  ..._extraArguments: unknown[]
): Generator<number, void, unknown> {
  for (let [value] of pmCharacterOffsets(input)) yield value;
}
var pmCharacterOffsetCache = new WeakMap<ProseMirrorNode, CharacterOffsetIndex>();
export function indexPMCharacterOffsets(
  documentNode: ProseMirrorNode,
  ..._extraArguments: unknown[]
): CharacterOffsetIndex {
  let entry = pmCharacterOffsetCache.get(documentNode);
  if (entry) return entry;
  let value: boolean = true;
  for (let index = 0; value && index < documentNode.childCount; index++) {
    let value2 = documentNode.child(index);
    value = isProseTextNode(value2) && codePointCount(value2.text) === value2.text.length;
  }
  if (value)
    entry = {
      plain: true,
      size: documentNode.content.size,
    };
  else {
    let items = [];
    let items2 = [];
    for (let [value2, value3] of pmCharacterOffsets(documentNode)) {
      items.push(value2);
      items2.push(value3);
    }
    entry = {
      plain: false,
      starts: Uint32Array.from(items),
      ends: Uint32Array.from(items2),
    };
  }
  pmCharacterOffsetCache.set(documentNode, entry);
  return entry;
}
export function utf16OffsetToCharacterIndex(
  input: ProseMirrorNode,
  options: number,
  ..._extraArguments: unknown[]
) {
  let value = indexPMCharacterOffsets(input);
  if (value.plain)
    return Math.max(0, Math.min(Math.floor(options), value.size));
  let index = 0;
  let length = value.ends.length;
  while (index < length) {
    let value2 = (index + length) >>> 1;
    if (value.ends[value2] <= options) index = value2 + 1;
    else length = value2;
  }
  return index;
}
export function characterIndexToUTF16Offset(
  input: ProseMirrorNode,
  options: number,
  ..._extraArguments: unknown[]
) {
  let value = indexPMCharacterOffsets(input);
  if (value.plain) return Math.max(0, Math.min(options, value.size));
  let length = value.starts.length;
  if (length === 0) return input.content.size;
  return options <= 0
    ? value.starts[0]
    : options < length
      ? value.starts[options]
      : input.content.size;
}
var pmCharacterCountCache = new WeakMap<ProseMirrorNode, number>();
export var pmCharacterCount = (
  input: ProseMirrorNode,
  ..._extraArguments: unknown[]
): number => {
  let entry = pmCharacterCountCache.get(input);
  if (entry !== undefined) return entry;
  entry = 0;
  for (let index = 0; index < input.childCount; index++) {
    let value = input.child(index);
    entry += isProseTextNode(value) ? codePointCount(value.text) : 1;
  }
  pmCharacterCountCache.set(input, entry);
  return entry;
};
export var characterId = (
  input: string,
  options: number,
  ..._extraArguments: unknown[]
) => `${input}.${options}`;
export function parseCharacterId(
  input: string,
  ..._extraArguments: unknown[]
): CharacterIdParts | null {
  let value = input.lastIndexOf(".");
  let value2 = Number(input.slice(value + 1));
  return value > 0 && Number.isInteger(value2) && value2 >= 0
    ? {
        sess: input.slice(0, value),
        i: value2,
      }
    : null;
}
/** Keep the prior TypeError when an address expected to be valid cannot be parsed. */
export function requireCharacterIdParts(id: string): CharacterIdParts {
  const parts = parseCharacterId(id);
  if (parts === null) {
    // i18n-ignore: Preserve the previous JavaScript exception for an invalid internal ID.
    throw new TypeError("Cannot read properties of null (reading 'i')");
  }
  return parts;
}
var characterRunsAreAdjacent = (
  input: CharacterSpan,
  options: CharacterSpan,
  ..._extraArguments: unknown[]
) => input.sess === options.sess && input.start + input.len === options.start;
export class CharacterRunSpans implements CharacterRunTable {
  spans: CharacterSpan[] = [];
  opaque: boolean = false;
  static fromView(
    input: readonly CharacterRunView[],
    options: boolean = false,
    ..._extraArguments: unknown[]
  ) {
    let value = new (CharacterRunSpans)();
    value.opaque = options;
    if (!options)
      for (let { id: id2, len: len } of input) {
        let value2 = parseCharacterId(id2);
        if (!value2) {
          value.opaque = true;
          value.spans = [];
          break;
        }
        value.push({
          sess: value2.sess,
          start: value2.i,
          len: len,
        });
      }
    return value;
  }
  get length() {
    return this.spans.reduce(
      (
        input,
        options,
        ..._extraArguments: unknown[]
      ) => input + options.len,
      0,
    );
  }
  push(input: CharacterSpan, ..._extraArguments: unknown[]): undefined {
    let value = this.spans.at(-1);
    if (value && characterRunsAreAdjacent(value, input)) value.len += input.len;
    else if (input.len > 0)
      this.spans.push({
        ...input,
      });
  }
  keyAt(input: number, ..._extraArguments: unknown[]) {
    for (let value of this.spans) {
      if (input >= 0 && input < value.len)
        return characterId(value.sess, value.start + input);
      input -= value.len;
    }
    return null;
  }
  offsetOf(input: string, ..._extraArguments: unknown[]): number {
    let value = parseCharacterId(input);
    let index: number = 0;
    for (let value2 of this.spans) {
      if (
        value?.sess === value2.sess &&
        value.i >= value2.start &&
        value.i < value2.start + value2.len
      )
        return index + value.i - value2.start;
      index += value2.len;
    }
    return -1;
  }
  range(
    input: number,
    options: number,
    ..._extraArguments: unknown[]
  ): [string, string] | null {
    let value = options > 0 ? this.keyAt(input) : null;
    let value2 = options > 0 ? this.keyAt(input + options - 1) : null;
    return value !== null && value2 !== null ? [value, value2] : null;
  }
  cut(input: number, ..._extraArguments: unknown[]) {
    let index = 0;
    for (
      ;
      index < this.spans.length && input > 0;
      input -= this.spans[index++].len
    ) {
      let value = this.spans[index];
      if (input >= value.len) continue;
      this.spans[index] = {
        ...value,
        len: input,
      };
      this.spans.splice(index + 1, 0, {
        ...value,
        start: value.start + input,
        len: value.len - input,
      });
      return index + 1;
    }
    if (input > 0) throw RangeError("runTable: offset past the end");
    return index;
  }
  mergeAround(input: number, ..._extraArguments: unknown[]): undefined {
    for (
      let value = Math.max(0, input - 1);
      value < Math.min(this.spans.length - 1, input + 1);

    ) {
      let value2 = this.spans[value];
      if (characterRunsAreAdjacent(value2, this.spans[value + 1]))
        this.spans.splice(value, 2, {
          ...value2,
          len: value2.len + this.spans[value + 1].len,
        });
      else value++;
    }
  }
  insert(
    input: number,
    options: string,
    context: number,
    value: number,
    ..._extraArguments: unknown[]
  ): undefined {
    if (value <= 0) return;
    let value2 = this.cut(input);
    this.spans.splice(value2, 0, {
      sess: options,
      start: context,
      len: value,
    });
    this.mergeAround(value2);
  }
  remove(
    input: number,
    options: number,
    ..._extraArguments: unknown[]
  ) {
    if (options <= 0) return [];
    let value = this.cut(input);
    let value2 = this.spans.splice(
      value,
      this.cut(input + options) - value,
    );
    this.mergeAround(value);
    return value2.flatMap(
      (input2, ..._extraArguments: unknown[]) =>
        Array.from(
          {
            length: input2.len,
          },
          (
            input3: unknown,
            options2: number,
            ..._extraArguments: unknown[]
          ) => characterId(input2.sess, input2.start + options2),
        ),
    );
  }
  renameAt(
    input: number,
    options: string,
    ..._extraArguments: unknown[]
  ): undefined {
    let value = parseCharacterId(options);
    if (!value || input < 0 || input >= this.length) return;
    this.remove(input, 1);
    this.insert(input, value.sess, value.i, 1);
  }
  toView(..._extraArguments: unknown[]) {
    return this.spans.map(
      (input, ..._extraArguments: unknown[]) => ({
        id: characterId(input.sess, input.start),
        len: input.len,
      }),
    );
  }
}
var proseBlockId = (
  input: ProseMirrorNode,
  ..._extraArguments: unknown[]
): string | null =>
  typeof input.attrs.bid === "string" && input.attrs.bid
    ? input.attrs.bid
    : null;
function indexProseBlocks(
  documentNode: ProseMirrorNode,
  ..._extraArguments: unknown[]
): Map<string, ProseBlockPosition> {
  let entries = new Map<string, ProseBlockPosition>();
  documentNode.descendants(
    (input, options, ..._extraArguments: unknown[]) => {
      let value = proseBlockId(input);
      if (value !== null && !entries.has(value))
        entries.set(value, {
          pos: options,
          node: input,
        });
      return !input.isTextblock;
    },
  );
  return entries;
}
function textBlockAtPosition(
  input: ProseMirrorNode,
  options: number,
  ..._extraArguments: unknown[]
): TextBlockPosition | null {
  let value =
    options >= 0 && options <= input.content.size
      ? input.resolve(options)
      : null;
  if (!value?.parent.isTextblock) return null;
  return {
    node: value.parent,
    bid: proseBlockId(value.parent),
    start: value.start(),
    offset: value.parentOffset,
  };
}
export var classifyBlockLedgerDrift = (
  input: string,
  ..._extraArguments: unknown[]
) =>
  input === "a textblock without a block id"
    ? "idless"
    : input.startsWith("two blocks carry the id ")
      ? "dup_id"
      : /^block \S+: /.test(input)
        ? "drift"
        : "other";
export function createCharacterLedger(
  input: () => ProseMirrorNode,
  options: () => string | null | undefined,
  ..._extraArguments: unknown[]
): CharacterLedger {
  let entries = new Map<string, CharacterRunSpans>();
  let entries2 = new Map<string, string>();
  let count = 1024;
  let index: number = 0;
  let value: {
    doc: ProseMirrorNode;
    gen: number;
    at: Map<string, number | null>;
  } | null = null;
  let count2 = 4096;
  let value2: number = -1;
  let value3: number = -1;
  let text: string = "";
  let value4: string | null = null;
  let entries3 = new Map<string, string>();
  let value5 = (..._extraArguments: unknown[]) => {
    let value13 = new (CharacterRunSpans)();
    value13.opaque = true;
    return value13;
  };
  let value6: {
    doc: ProseMirrorNode;
    at: Map<string, ProseBlockPosition>;
  } | null = null;
  let value7 = (..._extraArguments: unknown[]) =>
    options() || "_";
  let value8 = (
    input2: string,
    options2: number,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (input2 === value7() && options2 > value2) value2 = options2;
  };
  let value9 = (input2: string, ..._extraArguments: unknown[]): undefined => {
    let value13 = value7();
    if (
      input2.length <= value13.length ||
      input2.charCodeAt(value13.length) !== 46 ||
      !input2.startsWith(value13)
    )
      return;
    let value14 = parseCharacterId(input2);
    if (value14) value8(value14.sess, value14.i);
  };
  let value10 = (input2: string, ..._extraArguments: unknown[]) => (
    (value4 ??= input2),
    false
  );
  let value11 = (
    input2: ProseMirrorNode,
    ..._extraArguments: unknown[]
  ) =>
    (value6?.doc === input2
      ? value6
      : (value6 = {
          doc: input2,
          at: indexProseBlocks(input2),
        })
    ).at;
  let value12 = (
    input2: ProseMirrorTransaction,
    options2: readonly InsertedCharacterRun[],
    context: readonly (readonly string[])[],
    value13: boolean,
    ..._extraArguments: unknown[]
  ): undefined => {
    let value14 = input2.docs[0] ?? input2.doc;
    let value15 = value11(value14);
    let value16 = input2.mapping.invert();
    let value17: TextBlockPosition | null = null;
    let value18 = (
      input3: number,
      ..._extraArguments: unknown[]
    ) => {
      if (
        value17 &&
        input3 >= value17.start &&
        input3 <= value17.start + value17.node.content.size
      )
        return {
          node: value17.node,
          bid: value17.bid,
          start: value17.start,
          offset: input3 - value17.start,
        };
      let value22 = textBlockAtPosition(value14, input3);
      if (value22) value17 = value22;
      return value22;
    };
    let value19 = (
      input3: number,
      ..._extraArguments: unknown[]
    ) => {
      let value22 = value16.mapResult(input3, 1);
      let value23 = value22.deleted ? null : value18(value22.pos);
      if (
        !value23 ||
        value23.bid === null ||
        value23.offset >= value23.node.content.size
      )
        return null;
      return (
        entries
          .get(value23.bid)
          ?.keyAt(utf16OffsetToCharacterIndex(value23.node, value23.offset)) ??
        null
      );
    };
    let value20 = (
      input3: string,
      options3: number,
      ..._extraArguments: unknown[]
    ) => {
      let match = context.find(
        (input4, ..._extraArguments: unknown[]) =>
          input4.includes(input3),
      );
      let value22 = match ? match.indexOf(input3) : -1;
      return match && match.length > value22 + options3
        ? match.slice(value22 + 1, value22 + 1 + options3)
        : null;
    };
    let entries4 = new Map<string, CharacterRunSpans>();
    let value21 = (
      input3: string,
      options3: string,
      ..._extraArguments: unknown[]
    ) => {
      if (!value13) return value10(options3);
      if (!entries3.has(input3)) entries3.set(input3, options3);
      entries4.set(input3, value5());
      return false;
    };
    input2.doc.descendants(
      (
        input3,
        options3,
        ..._extraArguments: unknown[]
      ) => {
        if (value4) return false;
        let value22 = proseBlockId(input3);
        if (value22 !== null) value9(value22);
        if (!input3.isTextblock) return true;
        if (value22 === null) return value10("a textblock without a block id");
        if (entries4.has(value22))
          return value10(`two blocks carry the id ${value22}`);
        let value23 = pmCharacterCount(input3);
        let entry = entries.get(value22);
        let value24 = entry
          ? (value15.get(value22)?.node ?? null)
          : null;
        if (
          entry && value24 &&
          (value24 === input3 || value24.content === input3.content) &&
          entry && entry.length === value23
        ) {
          entries4.set(value22, entry);
          return false;
        }
        const doubtReason = entries3.get(value22);
        if (entry?.opaque && doubtReason !== undefined)
          return value21(value22, doubtReason);
        let value25 = options3 + 1;
        let mapped = options2
          .filter(
            (input4, ..._extraArguments: unknown[]) =>
              input4.from >= value25 &&
              input4.from <= value25 + input3.content.size,
          )
          .map(
            (input4, ..._extraArguments: unknown[]) => ({
              k: parseCharacterId(input4.firstId),
              at: utf16OffsetToCharacterIndex(input3, input4.from - value25),
              len: input4.len,
              over: input4.over === true,
            }),
          );
        let value26 = entry ? null : value20(value22, value23);
        let value27 = new (CharacterRunSpans)();
        let index2 = 0;
        for (let value28 of pmCharacterStarts(input3)) {
          let match = mapped.find(
            (input4, ..._extraArguments: unknown[]): input4 is typeof input4 & { k: CharacterIdParts } =>
              input4.k !== null &&
              index2 >= input4.at &&
              index2 < input4.at + input4.len,
          );
          let value29 = value19(value25 + value28);
          if (match && value29 !== null && !match.over)
            return value21(
              value22,
              `block ${value22}: an inserted run overlaps a kept char`,
            );
          let value30 = match
            ? characterId(match.k.sess, match.k.i + index2 - match.at)
            : (value26?.[index2] ?? value29);
          let value31 = value30 ? parseCharacterId(value30) : null;
          if (!value30 || !value31)
            return value21(
              value22,
              `block ${value22}: no id for position ${value28}`,
            );
          value27.push({
            sess: value31.sess,
            start: value31.i,
            len: 1,
          });
          value9(value30);
          index2++;
        }
        entries4.set(value22, value27);
        entries3.delete(value22);
        return false;
      },
    );
    if (value4) return;
    index += 1;
    entries.clear();
    for (let [value22, value23] of entries4)
      entries.set(value22, value23);
    for (let value22 of entries3.keys())
      if (!entries4.has(value22)) entries3.delete(value22);
  };
  return {
    get generation(): number {
      return index;
    },
    get drifted() {
      return value4;
    },
    get doubted() {
      return entries3;
    },
    runsOf: (input2: string, ..._extraArguments: unknown[]) =>
      entries.get(input2),
    doubt(input2: string, options2: string, ..._extraArguments: unknown[]) {
      if (value4 || !value11(input()).get(input2)?.node.isTextblock)
        return false;
      if (!entries3.has(input2))
        entries3.set(input2, `block ${input2}: ${options2}`);
      index += 1;
      entries.set(input2, value5());
      return true;
    },
    save(..._extraArguments: unknown[]) {
      let state = {
        runs: [...entries].map(
          (
            [input2, characterRuns],
            ..._extraArguments: unknown[]
          ): [string, CharacterRunSpans] => [
            input2,
            Object.assign(new (CharacterRunSpans)(), {
              spans: characterRuns.spans.map(
                (input3, ..._extraArguments: unknown[]) => ({
                  ...input3,
                }),
              ),
              opaque: characterRuns.opaque,
            }),
          ],
        ),
        doubts: [...entries3],
        drifted: value4,
        hwm: value2,
      };
      return (..._extraArguments: unknown[]): undefined => {
        index += 1;
        entries.clear();
        for (let [value13, value14] of state.runs)
          entries.set(value13, value14);
        entries3.clear();
        for (let [value13, value14] of state.doubts)
          entries3.set(value13, value14);
        value4 = state.drifted;
        value2 = Math.max(value2, state.hwm);
        value6 = null;
      };
    },
    idAt(input2: number, ..._extraArguments: unknown[]) {
      let value13 = textBlockAtPosition(input(), input2);
      if (
        !value13 ||
        value13.bid === null ||
        value13.offset >= value13.node.content.size
      )
        return null;
      return (
        entries
          .get(value13.bid)
          ?.keyAt(utf16OffsetToCharacterIndex(value13.node, value13.offset)) ??
        null
      );
    },
    posOf(
      input2: string,
      options2: boolean | undefined,
      ..._extraArguments: unknown[]
    ) {
      let value13 = input();
      if (value === null || value.doc !== value13 || value.gen !== index)
        value = {
          doc: value13,
          gen: index,
          at: new Map<string, number | null>(),
        };
      else if (value.at.has(input2)) return value.at.get(input2) ?? null;
      let at = value.at;
      if (options2 === true) {
        let entry = entries2.get(input2);
        if (entry !== undefined) {
          let entry2 = entries.get(entry);
          let value14 =
            entry2 === undefined ? -1 : entry2.offsetOf(input2);
          let value15 =
            value14 < 0 ? undefined : value11(value13).get(entry);
          if (value15)
            return (
              value15.pos +
              1 +
              characterIndexToUTF16Offset(value15.node, value14)
            );
          entries2.delete(input2);
        }
      }
      for (let [value14, value15] of entries) {
        let value16 = value15.offsetOf(input2);
        if (value16 < 0) continue;
        let entry = value11(value13).get(value14);
        if (options2 === true && entry) {
          if (entries2.size >= 1024) entries2.clear();
          entries2.set(input2, value14);
        }
        let value17 = entry
          ? entry.pos + 1 + characterIndexToUTF16Offset(entry.node, value16)
          : null;
        if (at.size >= count2) at.clear();
        at.set(input2, value17);
        return value17;
      }
      if (options2 !== true) {
        if (at.size >= count2) at.clear();
        at.set(input2, null);
      }
      return null;
    },
    holdersOf: (input2: string, ..._extraArguments: unknown[]) =>
      [...entries]
        .filter(
          ([, input3], ..._extraArguments: unknown[]) =>
            input3.offsetOf(input2) >= 0,
        )
        .map(
          ([input3], ..._extraArguments: unknown[]) => input3,
        ),
    holderOf(input2: string, ..._extraArguments: unknown[]) {
      let value13 = parseCharacterId(input2);
      if (!value13) return null;
      let value14 = value11(input());
      for (let [value15, value16] of entries)
        if (
          value14.has(value15) &&
          value16.spans.some(
            (input3, ..._extraArguments: unknown[]) =>
              input3.sess === value13.sess &&
              value13.i >= input3.start &&
              value13.i < input3.start + input3.len,
          )
        )
          return value15;
      return null;
    },
    idsIn(
      input2: number,
      options2: number,
      ..._extraArguments: unknown[]
    ) {
      let value13 = textBlockAtPosition(input(), input2);
      let value14 =
        value13?.bid == null ? null : entries.get(value13.bid);
      if (
        !value13 ||
        !value14 ||
        options2 < input2 ||
        options2 > value13.start + value13.node.content.size
      )
        return [];
      let value15 = utf16OffsetToCharacterIndex(value13.node, value13.offset);
      let value16 = Array.from(
        {
          length:
            utf16OffsetToCharacterIndex(
              value13.node,
              value13.offset + options2 - input2,
            ) - value15,
        },
        (
          input3: unknown,
          options3: number,
          ..._extraArguments: unknown[]
        ) => value14.keyAt(value15 + options3),
      );
      return value16.every((id): id is string => id !== null) ? value16 : [];
    },
    blockAt(input2: number, ..._extraArguments: unknown[]) {
      let value13 = textBlockAtPosition(input(), input2);
      return value13?.bid == null
        ? null
        : {
            bid: value13.bid,
            start: value13.start,
            end: value13.start + value13.node.content.size,
          };
    },
    posOfBlock: (input2, ..._extraArguments: unknown[]) =>
      value11(input()).get(input2)?.pos ?? null,
    predict(input2: number, ..._extraArguments: unknown[]) {
      let value13 = characterId(value7(), value2 + 1);
      value2 += Math.max(0, input2);
      return value13;
    },
    atLeast(input2: number, ..._extraArguments: unknown[]): undefined {
      if (Number.isInteger(input2) && input2 > value2) value2 = input2;
    },
    counter: (input2, ..._extraArguments: unknown[]): number =>
      (value2 =
        input2 !== undefined && Number.isInteger(input2)
          ? Math.max(input2, text === value7() ? value3 : -1)
          : value2),
    taught(input2: number, ..._extraArguments: unknown[]): undefined {
      if (!Number.isInteger(input2)) return;
      if (text !== value7()) {
        text = value7();
        value3 = -1;
      }
      if (input2 > value3) value3 = input2;
      if (input2 > value2) value2 = input2;
    },
    floor: (..._extraArguments: unknown[]): number =>
      text === value7() ? value3 : -1,
    mapThrough(
      input2: ProseMirrorTransaction,
      options2: readonly InsertedCharacterRun[],
      context: readonly (readonly string[])[] = [],
      value13: boolean = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!value4 && input2.docChanged)
        value12(input2, options2, context, value13);
    },
    salvageDrift(..._extraArguments: unknown[]) {
      if (value4 === null) return null;
      let value13 = /^block (\S+): /.exec(value4);
      if (!value13) return null;
      let value14 = value13[1];
      if (!entries3.has(value14)) entries3.set(value14, value4);
      value4 = null;
      return value14;
    },
    settle(input2: Iterable<readonly [string, string]>, ..._extraArguments: unknown[]): undefined {
      let items: { runs: CharacterRunSpans; off: number; key: string }[] = [];
      for (let [value13, value14] of input2) {
        value9(value14);
        if (value13 === value14) continue;
        for (let value15 of entries.values()) {
          let value16 = value15.offsetOf(value13);
          if (value16 < 0) continue;
          items.push({
            runs: value15,
            off: value16,
            key: value14,
          });
          break;
        }
      }
      if (items.length > 0) index += 1;
      for (let { runs: runs, off: off, key: key } of items)
        runs.renameAt(off, key);
    },
    load(
      input2: readonly BlockCharacterRuns[],
      options2: boolean | undefined,
      context: boolean = false,
      ..._extraArguments: unknown[]
    ): undefined {
      index += 1;
      if (!options2) entries.clear();
      if (!options2) value4 = null;
      if (!options2) entries3.clear();
      value6 = null;
      let index2: number = 0;
      for (let { bid: bid, runs: runs, opaque: opaque } of input2) {
        let value13 = (CharacterRunSpans).fromView(
          runs,
          opaque,
        );
        entries.set(bid, value13);
        if (!value13.opaque) entries3.delete(bid);
        if (value13.opaque) index2 += 1;
        else
          for (let value14 of runs) {
            let value15 = requireCharacterIdParts(value14.id);
            value8(value15.sess, value15.i + value14.len - 1);
          }
      }
      if (index2)
        console.warn(
          `runTable: ${index2} block(s) carry ids that cannot be read; shown, not addressable`,
        );
      let values = new Set<string>();
      input().descendants(
        (input3, ..._extraArguments: unknown[]) => {
          let value13 = proseBlockId(input3);
          if (value13 !== null) value9(value13);
          if (!input3.isTextblock) return true;
          if (value13 === null)
            return value10("a textblock without a block id");
          if (values.size === values.add(value13).size)
            return value10(`two blocks carry the id ${value13}`);
          let entry = entries.get(value13);
          if (entry === undefined) {
            entry = new CharacterRunSpans();
            entries.set(value13, entry);
          }
          if (!entry.opaque && entry.length !== pmCharacterCount(input3)) {
            if (!context) return value10(`block ${value13}: runs ≠ content`);
            if (!entries3.has(value13))
              entries3.set(value13, `block ${value13}: runs ≠ content`);
            entries.set(value13, value5());
          }
          return false;
        },
      );
    },
    dump(..._extraArguments: unknown[]) {
      let items: BlockCharacterRuns[] = [];
      let values = new Set<string>();
      input().descendants((input2, ..._extraArguments: unknown[]) => {
        let value13 = input2.isTextblock ? proseBlockId(input2) : null;
        let value14 =
          value13 === null || values.has(value13) ? null : entries.get(value13);
        if (value13 === null || !value14) return !input2.isTextblock;
        items.push({
          bid: value13,
          runs: value14.toView(),
          ...(value14.opaque
            ? {
                opaque: true,
              }
            : {}),
        });
        values.add(value13);
        return false;
      });
      return items;
    },
  };
}

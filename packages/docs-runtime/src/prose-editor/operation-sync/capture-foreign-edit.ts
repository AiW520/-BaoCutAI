import type { Node } from "prosemirror-model";
import type { Transaction } from "prosemirror-state";
import {
  Mapping,
  ReplaceAroundStep,
  ReplaceStep,
  type Step,
} from "prosemirror-transform";
import {
  parseCharacterId,
  type CharacterIdParts,
  type CharacterLedger,
} from "../character-ledger";
import type { ForeignEditHistory } from "./foreign-edit-history";
import type { KnownCharacters } from "./known-characters";
import {
  isBlockShellReplacement,
  isInlineLeafReplacement,
  isSameTypeBlockShellReplacement,
  replacementTextEdges,
} from "./step-classification";

interface ForeignEditCapture {
  readonly document: Node | null;
  readonly region: boolean;
  readonly ledger: CharacterLedger;
  readonly known: KnownCharacters;
  readonly history: ForeignEditHistory;
  pendingSteps(): readonly Step[];
  isForeignSession(session: string): boolean;
  ownsBlock(blockId: string): boolean;
}

/** Record foreign characters/blocks taken by a local transaction for later undo. */
export function captureForeignEdit(
  transaction: Transaction,
  context: ForeignEditCapture,
): void {
  if (!context.document || transaction.steps.length === 0) return;
  let beforeMapping: Mapping | null | undefined;
  const mapBefore = (): Mapping | null => {
    if (beforeMapping !== undefined) return beforeMapping;
    beforeMapping = null;
    const document = context.document;
    if (context.region || !document) return null;
    const pending = context.pendingSteps();
    if (
      pending.length === 0 &&
      !(document === transaction.before || document.eq(transaction.before))
    )
      return null;
    let size = document.content.size;
    for (const step of pending)
      step.getMap().forEach((from, to, newFrom, newTo) => {
        size += newTo - newFrom - (to - from);
      });
    if (size !== transaction.before.content.size) return null;
    const mapping = new Mapping();
    for (let index = pending.length - 1; index >= 0; index--)
      mapping.appendMap(pending[index].getMap().invert());
    return (beforeMapping = mapping);
  };
  const blocks = new Set<string>();
  const characters: CharacterIdParts[] = [];
  let survivingBlocks: Set<string> | null = null;
  const survives = (blockId: string): boolean => {
    if (survivingBlocks === null) {
      const ids = new Set<string>();
      transaction.doc.descendants((node) => {
        if (node.isInline) return false;
        if (typeof node.attrs.bid === "string" && node.attrs.bid) ids.add(node.attrs.bid);
        return true;
      });
      survivingBlocks = ids;
    }
    return survivingBlocks.has(blockId);
  };
  transaction.steps.forEach((step, stepIndex) => {
    if (!(step instanceof ReplaceStep) && !(step instanceof ReplaceAroundStep)) return;
    const document = transaction.docs[stepIndex];
    if (
      isSameTypeBlockShellReplacement(step, document) ||
      isBlockShellReplacement(step, document) ||
      isInlineLeafReplacement(step, document)
    )
      return;
    const edges = replacementTextEdges(step, document);
    let previousMapping: Mapping | null = null;
    const mapPrevious = (): Mapping => {
      if (previousMapping === null) {
        previousMapping = new Mapping();
        for (let index = stepIndex - 1; index >= 0; index--)
          previousMapping.appendMap(transaction.steps[index].getMap().invert());
      }
      return previousMapping;
    };
    const characterAt = (position: number): CharacterIdParts | null => {
      const previous = mapPrevious().mapResult(position, 1);
      if (previous.deleted) return null;
      const mapping = mapBefore();
      if (mapping === null) return null;
      const mapped = mapping.mapResult(previous.pos, 1);
      if (mapped.deleted) return null;
      const id = context.ledger.idAt(mapped.pos);
      return id === null ? null : parseCharacterId(id);
    };
    const takeCharacters = (from: number, to: number): void => {
      for (let position = from; position < to; position++) {
        const character = characterAt(position);
        if (
          character !== null &&
          context.isForeignSession(character.sess) &&
          !context.known.contains(character.sess, character.i)
        )
          characters.push(character);
      }
    };
    const takeBlock = (node: Node): void => {
      const blockId: string = typeof node.attrs.bid === "string" ? node.attrs.bid : "";
      if (blockId && !context.ownsBlock(blockId) && !context.known.blocks.has(blockId))
        blocks.add(blockId);
    };
    step.getMap().forEach((from, to) => {
      if (from > document.content.size || to > document.content.size) return;
      const start = from + edges.head;
      const end = to - edges.tail;
      if (end > start)
        document.nodesBetween(start, end, (node, position) => {
          if (node.isInline) return false;
          const fullyTaken = position >= start;
          if (
            fullyTaken &&
            typeof node.attrs.bid === "string" &&
            node.attrs.bid &&
            survives(node.attrs.bid)
          )
            return false;
          if (fullyTaken) takeBlock(node);
          if (node.isTextblock) {
            takeCharacters(
              fullyTaken ? position + 1 : Math.max(start, position + 1),
              fullyTaken
                ? position + 1 + node.content.size
                : Math.min(end, position + 1 + node.content.size),
            );
            return false;
          }
          return true;
        });
      else if (
        to === from &&
        step instanceof ReplaceStep &&
        step.slice.openStart > 0 &&
        step.slice.openEnd > 0
      ) {
        const resolved = document.resolve(start);
        for (
          let depth = resolved.depth, open = step.slice.openStart;
          depth > 0 && open > 0;
          depth--, open--
        )
          takeBlock(resolved.node(depth));
      }
    });
  });
  context.history.record(blocks, characters, () => mapBefore() !== null, context.region);
}

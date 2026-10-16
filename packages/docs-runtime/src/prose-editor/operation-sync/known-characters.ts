import type { Node } from "prosemirror-model";
import { parseCharacterId, type BlockCharacterRuns } from "../character-ledger";

/** Characters and blocks present when this bridge first learns a document. */
export class KnownCharacters {
  readonly blocks = new Set<string>();
  private readonly intervals = new Map<string, [number, number][]>();

  learn(document: Node, blocks: readonly BlockCharacterRuns[]): void {
    document.descendants((node) => {
      if (node.isInline) return false;
      if (typeof node.attrs.bid === "string" && node.attrs.bid)
        this.blocks.add(node.attrs.bid);
      return true;
    });
    for (const block of blocks) {
      this.blocks.add(block.bid);
      for (const run of block.runs) {
        const first = parseCharacterId(run.id);
        if (first === null || run.len <= 0) continue;
        const interval: [number, number] = [first.i, first.i + run.len - 1];
        const intervals = this.intervals.get(first.sess);
        if (intervals) intervals.push(interval);
        else this.intervals.set(first.sess, [interval]);
      }
    }
    for (const [session, intervals] of this.intervals) {
      intervals.sort((left, right) => left[0] - right[0]);
      const merged: [number, number][] = [];
      for (const interval of intervals) {
        const previous = merged.at(-1);
        if (previous && interval[0] <= previous[1] + 1)
          previous[1] = Math.max(previous[1], interval[1]);
        else merged.push([interval[0], interval[1]]);
      }
      this.intervals.set(session, merged);
    }
  }

  contains(session: string, counter: number): boolean {
    const intervals = this.intervals.get(session);
    if (!intervals) return false;
    let low = 0;
    let high = intervals.length - 1;
    while (low <= high) {
      const middle = (low + high) >> 1;
      if (counter < intervals[middle][0]) high = middle - 1;
      else if (counter > intervals[middle][1]) low = middle + 1;
      else return true;
    }
    return false;
  }
}

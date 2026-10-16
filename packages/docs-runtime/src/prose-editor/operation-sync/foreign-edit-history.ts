import type { CharacterIdParts } from "../character-ledger";

export interface ForeignCharacterRun {
  sess: string;
  lo: number;
  hi: number;
}
export interface ForeignTaking {
  blocks: Set<string>;
  runs: ForeignCharacterRun[];
  born: number;
  ended: number | null;
}

type ForeignEditEvent =
  | { name: "undo.foreign.took.blind"; details: { region: boolean } }
  | { name: "undo.foreign.took.full"; details: { takings: number } }
  | { name: "undo.foreign.took"; details: { blocks: number; runs: number } }
  | {
      name: "undo.foreign.took.ended";
      details: { takings: number; owed: boolean; why: string };
    };

/** Bounded foreign-edit ownership history, including the window used during undo. */
export class ForeignEditHistory {
  private readonly takings: ForeignTaking[] = [];
  revision = 0;
  window: { lo: number; hi: number } | null = null;
  private readonly hasPendingUndo: () => boolean;
  private readonly report: (event: ForeignEditEvent) => void;

  constructor(hasPendingUndo: () => boolean, report: (event: ForeignEditEvent) => void) {
    this.hasPendingUndo = hasPendingUndo;
    this.report = report;
  }

  get size(): number {
    return this.takings.length;
  }
  get hasActive(): boolean {
    return this.takings.some((taking) => taking.ended === null);
  }

  private visible(taking: ForeignTaking): boolean {
    return this.window === null
      ? taking.ended === null
      : taking.born <= this.window.lo &&
          (taking.ended === null || taking.ended > this.window.hi);
  }

  containsBlock(block: string): boolean {
    return this.takings.some(
      (taking) => taking.blocks.has(block) && this.visible(taking),
    );
  }

  containsCharacter(session: string, counter: number): boolean {
    return this.takings.some(
      (taking) =>
        taking.runs.some(
          (run) => run.sess === session && counter >= run.lo && counter <= run.hi,
        ) && this.visible(taking),
    );
  }

  private makeRoom(): boolean {
    if (this.takings.length < 64) return true;
    if (this.hasPendingUndo()) return false;
    for (let index = this.takings.length - 1; index >= 0; index--)
      if (this.takings[index].ended !== null) this.takings.splice(index, 1);
    while (this.takings.length >= 64) this.takings.shift();
    return true;
  }

  record(
    blocks: Set<string>,
    characters: CharacterIdParts[],
    mappingAvailable: () => boolean,
    region: boolean,
  ): void {
    if (blocks.size === 0 && characters.length === 0) return;
    if (!mappingAvailable()) {
      this.report({ name: "undo.foreign.took.blind", details: { region } });
      return;
    }
    characters.sort((left, right) =>
      left.sess < right.sess ? -1 : left.sess > right.sess ? 1 : left.i - right.i,
    );
    const runs: ForeignCharacterRun[] = [];
    for (const character of characters) {
      const previous = runs.at(-1);
      if (previous && previous.sess === character.sess && character.i <= previous.hi + 1)
        previous.hi = Math.max(previous.hi, character.i);
      else runs.push({ sess: character.sess, lo: character.i, hi: character.i });
    }
    if (!this.makeRoom()) {
      this.report({
        name: "undo.foreign.took.full",
        details: { takings: this.takings.length },
      });
      return;
    }
    this.takings.push({ blocks, runs, born: ++this.revision, ended: null });
    this.report({
      name: "undo.foreign.took",
      details: { blocks: blocks.size, runs: runs.length },
    });
  }

  endWhere(matches: (taking: ForeignTaking) => boolean, reason: string): void {
    let count = 0;
    for (const taking of this.takings)
      if (taking.ended === null && matches(taking)) {
        taking.ended = this.revision + 1;
        count++;
      }
    if (count === 0) return;
    this.revision++;
    this.report({
      name: "undo.foreign.took.ended",
      details: { takings: count, owed: this.hasPendingUndo(), why: reason },
    });
  }

  endAll(reason: string): void {
    this.endWhere(() => true, reason);
  }
}

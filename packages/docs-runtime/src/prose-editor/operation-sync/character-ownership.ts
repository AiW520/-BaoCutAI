import type { Node } from "prosemirror-model";
import {
  characterId,
  pmCharacterOffsets,
  type CharacterRunTable,
  type CharacterSpan,
} from "../character-ledger";

export interface OwnedCharacterSegment {
  at: number;
  len: number;
  mine: boolean;
}

export function splitCharacterOwnership(
  span: CharacterSpan,
  ownsSession: (session: string) => boolean,
  ownsCharacter: (session: string, counter: number) => boolean,
): OwnedCharacterSegment[] {
  if (ownsSession(span.sess))
    return span.len > 0 ? [{ at: 0, len: span.len, mine: true }] : [];
  const segments: OwnedCharacterSegment[] = [];
  for (let at = 0; at < span.len; at++) {
    const mine = ownsCharacter(span.sess, span.start + at);
    const previous = segments.at(-1);
    if (previous && previous.mine === mine) previous.len++;
    else segments.push({ at, len: 1, mine });
  }
  return segments;
}

export function foreignCharacterRanges(
  runs: CharacterRunTable | undefined,
  node: Node,
  splitOwnership: (span: CharacterSpan) => readonly OwnedCharacterSegment[],
): [number, number][] | null {
  if (
    !runs ||
    runs.opaque ||
    !runs.spans.some((span) => !splitOwnership(span).every((segment) => segment.mine))
  )
    return null;
  const offsets = [...pmCharacterOffsets(node)];
  if (offsets.length !== runs.length) return [];
  const ranges: [number, number][] = [];
  let offset = 0;
  for (const span of runs.spans) {
    for (const segment of splitOwnership(span)) {
      if (segment.mine) continue;
      const from = offsets[offset + segment.at][0];
      const to = offsets[offset + segment.at + segment.len - 1][1];
      const previous = ranges.at(-1);
      if (previous && previous[1] === from) previous[1] = to;
      else ranges.push([from, to]);
    }
    offset += span.len;
  }
  return ranges;
}

export function characterIdsForBlock(
  runs: CharacterRunTable | undefined,
  node: Node,
): string[] | null {
  if (!runs || runs.opaque) return null;
  const offsets = [...pmCharacterOffsets(node)];
  if (offsets.length !== runs.length) return null;
  const ids: string[] = [];
  for (const span of runs.spans)
    for (let index = 0; index < span.len; index++)
      ids.push(characterId(span.sess, span.start + index));
  return ids.length === offsets.length ? ids : null;
}

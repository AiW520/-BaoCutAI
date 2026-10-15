import { gemoji } from 'gemoji';

/** All GitHub short names and aliases; the original artifact contains this exact 1,913-entry dataset. */
export const nameToEmoji: Record<string, string> = Object.fromEntries(
  gemoji.flatMap(({ names, emoji }) => names.map((name) => [name, emoji])),
);

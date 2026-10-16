import type { RefusalPolicy, RetryCounts } from "./contracts";
const faceOf = (policy: RefusalPolicy): string => {
  switch (policy.k) {
    case `page_terminal`:
    case `link_terminal`:
      return `${policy.k}/${policy.face}`;
    case `op_terminal`:
      return `${policy.k}/${policy.custody}`;
    case `reread_once`:
      return `${policy.k}/${policy.after}`;
    case `counter`:
      return `counter`;
    case `rehandshake`:
      return `rehandshake(${policy.max})→${faceOf(policy.after)}`;
    case `bounded`:
      return `bounded(${policy.max}${policy.floorMs ? `,${policy.floorMs}ms` : ``}${policy.redial ? `,redial` : ``})→${faceOf(policy.after)}`;
    case `transient`:
      return `transient(${policy.max}${policy.redial ? `,redial` : ``})`;
    case `lost`:
      return `lost(${policy.max})`;
  }
};
const retryInfoOf = (
  policy: RefusalPolicy,
): {
  retry: string;
  retryMax: number;
  after: string;
} => {
  switch (policy.k) {
    case `page_terminal`:
    case `link_terminal`:
    case `op_terminal`:
      return {
        retry: `never`,
        retryMax: 0,
        after: ``,
      };
    case `reread_once`:
      return {
        retry: `reread`,
        retryMax: 1,
        after: `assert`,
      };
    case `counter`:
      return {
        retry: `counter`,
        retryMax: 1,
        after: ``,
      };
    case `rehandshake`:
    case `bounded`:
      return {
        retry: policy.k,
        retryMax: policy.max,
        after: faceOf(policy.after),
      };
    case `transient`:
    case `lost`:
      return {
        retry: policy.k,
        retryMax: policy.max,
        after: `link_down/unreached`,
      };
  }
};
const hashRefusalLabel = (label: string): string => {
  let count: number = 2166136261;
  for (let index: number = 0; index < label.length; index++)
    count = Math.imul(count ^ label.charCodeAt(index), 16777619) >>> 0;
  return count.toString(16).padStart(8, `0`);
};
const wireWordPattern = /^[a-z0-9_:.-]{1,40}$/i;
const WIRE_WORD_UNROWED: string = `unrowed`;
function rowKeySlug(key: string) {
  return key
    .toLowerCase()
    .replace(/ \| /g, `:`)
    .replace(/\*/g, `any`)
    .replace(/[^a-z0-9_:.-]+/g, `.`)
    .replace(/^\.+|\.+$/g, ``)
    .slice(0, 48);
}
const retryCountFields = (input: RetryCounts | undefined) =>
  input === undefined
    ? {}
    : {
        nTransient: input.transient,
        nLost: input.lost,
        nBounded: input.bounded,
        nRehandshake: input.rehandshake,
      };
export {
  faceOf,
  hashRefusalLabel,
  retryCountFields,
  retryInfoOf,
  rowKeySlug,
  WIRE_WORD_UNROWED,
  wireWordPattern,
};

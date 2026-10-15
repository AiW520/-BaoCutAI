/** style-write-chain: restored from styleWriteChain-BFpAAufR.js. */
import type {
  StyleRecord,
  StyleChange,
  StylePatch,
  StyleWriteResult,
  StyleRoad,
  StyleWrite,
  StyleJob,
  StyleChain,
} from "./style-contracts";
import type { UnknownRecord } from "../serialization/value-contracts";
import {
  DISPLAY_PROPERTY,
  getDocumentFontGeneration,
} from "../document-app/index";
var stylePatchOps = (change: StyleChange): StylePatch[] =>
  Object.entries(change).map(([objectEntry, objectEntryEntry]) =>
    objectEntryEntry === undefined
      ? {
          op: `delete`,
          path: [DISPLAY_PROPERTY, objectEntry],
        }
      : {
          op: `set`,
          path: [DISPLAY_PROPERTY, objectEntry],
          value: objectEntryEntry,
        },
  );
var styleWriteChains: Map<string, StyleChain> = new Map();
function pruneStyleChain(pid: string, chain: StyleChain): void {
  if (
    chain.unread !== null &&
    chain.unread.visit !==
      (getDocumentFontGeneration as (pid: string) => number)(pid)
  ) {
    chain.unread = null;
  }
  if (
    chain.waiting.length === 0 &&
    chain.out === null &&
    chain.unread === null &&
    styleWriteChains.get(pid) === chain
  ) {
    styleWriteChains.delete(pid);
  }
}
async function confirmStyleWritten(road: StyleRoad): Promise<boolean> {
  try {
    return (await road.onWritten()) === true;
  } catch {
    return false;
  }
}
var isRecord = (candidate: unknown): candidate is UnknownRecord =>
  typeof candidate == `object` && !!candidate && !Array.isArray(candidate);
function isUnsupportedStylePath(
  response: import("./style-contracts").StyleReply | undefined,
): boolean {
  if (
    response?.verdict !== `deny` ||
    response.reason !== `bad_request` ||
    !isRecord(response.data)
  )
    return false;
  let { problem: problem, at: at, expected: expected } = response.data;
  if (problem !== `unknown_key` || !Array.isArray(at) || !isRecord(expected))
    return false;
  let { path: path } = expected;
  return (
    at.at(-2) === `path` &&
    at.at(-1) === 1 &&
    Object.keys(expected).length === 1 &&
    Array.isArray(path) &&
    path.length === 1 &&
    path[0] === `display`
  );
}
function mergeStyleChange(
  style: StyleRecord | null,
  change: StyleChange,
): StyleRecord {
  let mergedStyle: Record<string, import("../serialization/value-contracts").JsonValue> =
    isRecord(style)
      ? {
          ...style,
        }
      : {};
  for (let [mergeStyleChangeResult, mergeStyleChangeResult2] of Object.entries(
    change,
  ))
    if (mergeStyleChangeResult2 === undefined) {
      delete mergedStyle[mergeStyleChangeResult];
    } else {
      mergedStyle[mergeStyleChangeResult] = mergeStyleChangeResult2;
    }
  return mergedStyle;
}
var wholeStylePatchOps = (style: StyleRecord): StylePatch[] =>
  Object.keys(style).length === 0
    ? [
        {
          op: `delete`,
          path: [DISPLAY_PROPERTY],
        },
      ]
    : [
        {
          op: `set`,
          path: [DISPLAY_PROPERTY],
          value: style,
        },
      ];
async function readStyleBeforeWrite(
  pid: string,
  chain: StyleChain,
  job: StyleJob,
  road: StyleRoad,
  change: StyleChange,
): Promise<StyleWriteResult> {
  if (job.visit !== (getDocumentFontGeneration as (pid: string) => number)(pid))
    return `left`;
  let style = road.latestStyle();
  if (chain.unread !== null && chain.unread.visit === job.visit) {
    let confirmStyleWritten2 = await confirmStyleWritten(road);
    if (
      job.visit !== (getDocumentFontGeneration as (pid: string) => number)(pid)
    )
      return `left`;
    let latestStyle = road.latestStyle();
    if (confirmStyleWritten2 || road.styleReads() !== chain.unread.reads) {
      if (latestStyle === undefined) return `notSent`;
      chain.unread = null;
      style = latestStyle;
    } else style = chain.unread.wrote;
  }
  if (style === undefined) return `notSent`;
  let nextStyle = mergeStyleChange(style, change);
  if ((await road.post?.(wholeStylePatchOps(nextStyle)))?.verdict !== `allow`)
    return `refused`;
  let styleReadCount = road.styleReads();
  chain.unread = (await confirmStyleWritten(road))
    ? null
    : {
        wrote: nextStyle,
        reads: styleReadCount,
        visit: job.visit,
      };
  return `allowed`;
}
async function performStyleWrite(
  pid: string,
  chain: StyleChain,
  job: StyleJob,
): Promise<void> {
  chain.waiting.splice(chain.waiting.indexOf(job), 1);
  let result: StyleWriteResult = `notSent`;
  try {
    if (
      job.visit !== (getDocumentFontGeneration as (pid: string) => number)(pid)
    ) {
      result = `left`;
      return;
    }
    let uniqueItems = new Set(
      chain.waiting.flatMap((waiting) => Object.keys(waiting.w.change)),
    );
    let fromEntries = Object.fromEntries(
      Object.entries(job.w.change).filter(
        ([changeEntry]) => !uniqueItems.has(changeEntry),
      ),
    );
    if (Object.keys(fromEntries).length === 0) {
      result = `superseded`;
      return;
    }
    let road = job.w.road();
    chain.out = job;
    let post = await road.post?.(stylePatchOps(fromEntries));
    if (isUnsupportedStylePath(post)) {
      result = await readStyleBeforeWrite(pid, chain, job, road, fromEntries);
      return;
    }
    result = post?.verdict === `allow` ? `allowed` : `refused`;
    if (result !== `allowed`) return;
    chain.unread = null;
    await confirmStyleWritten(road);
  } catch {
    result = `notSent`;
  } finally {
    if (chain.out === job) {
      chain.out = null;
    }
    pruneStyleChain(pid, chain);
    job.settle(result);
  }
}
function enqueueStyleWrite(
  pid: string,
  write: StyleWrite,
): Promise<StyleWriteResult> {
  let visit = (getDocumentFontGeneration as (pid: string) => number)(pid);
  for (let [
    enqueueStyleWriteResult,
    enqueueStyleWriteResult2,
  ] of styleWriteChains)
    if (enqueueStyleWriteResult !== pid) {
      pruneStyleChain(enqueueStyleWriteResult, enqueueStyleWriteResult2);
    }
  let existingChain = styleWriteChains.get(pid);
  if (
    existingChain !== undefined &&
    existingChain.out !== null &&
    existingChain.out.visit !== visit
  ) {
    existingChain = undefined;
  }
  if (existingChain === undefined) {
    existingChain = {
      tail: Promise.resolve(),
      waiting: [],
      out: null,
      unread: null,
    };
    styleWriteChains.set(pid, existingChain);
  }
  let chain = existingChain;
  return new Promise((resolve) => {
    let record: StyleJob = {
      w: write,
      visit: visit,
      settle: resolve,
    };
    chain.waiting.push(record);
    chain.tail = chain.tail.then(() => performStyleWrite(pid, chain, record));
  });
}
export { enqueueStyleWrite };

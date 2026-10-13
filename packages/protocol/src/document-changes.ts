import type { DocumentChange, DocumentPath, EditOperation } from './video.ts';

const object = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

/** 将已有正文的修改编译成字段差异；带 ID 的数组按 ID 更新、插删和移动。没有可用 ID 的数组按字段替换。 */
export function documentChanges(before: unknown, after: unknown): DocumentChange[] {
  const changes: DocumentChange[] = [];
  const walk = (previous: unknown, next: unknown, path: DocumentPath): void => {
    if (previous === next) return;
    if (object(previous) && object(next)) {
      for (const key of Object.keys(previous)) {
        if (!Object.hasOwn(next, key) || next[key] === undefined) changes.push({ path: [...path, key], remove: true });
      }
      for (const key of Object.keys(next)) {
        if (next[key] === undefined) continue;
        if (!Object.hasOwn(previous, key)) changes.push({ path: [...path, key], value: next[key] });
        else walk(previous[key], next[key], [...path, key]);
      }
      return;
    }
    if (Array.isArray(previous) && Array.isArray(next)) {
      const idsOf = (entries: unknown[]) => entries.map((entry) => object(entry) && typeof entry.id === 'string' ? entry.id : null);
      const oldIds = idsOf(previous), nextIds = idsOf(next);
      if (oldIds.every((id) => id !== null) && nextIds.every((id) => id !== null) && new Set(oldIds).size === oldIds.length && new Set(nextIds).size === nextIds.length) {
        const oldEntries = new Map(oldIds.map((id, i) => [id!, previous[i]]));
        const nextSet = new Set(nextIds);
        const order = oldIds.filter((id) => nextSet.has(id)) as string[];
        for (const id of oldIds) if (!nextSet.has(id)) changes.push({ path: [...path, { id: id! }], remove: true });
        const retained = nextIds.filter((id) => oldEntries.has(id!));
        // 日常词校订与插删保持已有条目的相对次序，线性处理，不对每个词扫描整个数组。
        if (retained.every((id, i) => id === order[i])) {
          for (let i = next.length - 1; i >= 0; i--) {
            const id = nextIds[i]!;
            if (oldEntries.has(id)) walk(oldEntries.get(id), next[i], [...path, { id }]);
            else changes.push({ path: [...path, { id }], value: next[i], beforeId: nextIds[i + 1] ?? null });
          }
          return;
        }
        for (let i = next.length - 1; i >= 0; i--) {
          const id = nextIds[i]!, beforeId = nextIds[i + 1] ?? null;
          const index = order.indexOf(id);
          if (index === -1) {
            changes.push({ path: [...path, { id }], value: next[i], beforeId });
          } else {
            walk(oldEntries.get(id), next[i], [...path, { id }]);
            if ((order[index + 1] ?? null) === beforeId) continue;
            changes.push({ path: [...path, { id }], moveBefore: beforeId });
            order.splice(index, 1);
          }
          order.splice(beforeId === null ? order.length : order.indexOf(beforeId), 0, id);
        }
        return;
      }
    }
    if (JSON.stringify(previous) !== JSON.stringify(next)) changes.push({ path, value: next });
  };
  walk(before, after, []);
  return changes;
}

/** 更新已有正文时只传差异；新建或同时改变文档元信息仍使用完整写入。 */
export function localDocumentOperation(operation: EditOperation, before: unknown): EditOperation {
  if (operation.type !== 'putDocument' || !operation.documentId || !object(before) || !object(operation.body)) return operation;
  if (operation.name !== undefined || operation.language !== undefined || operation.sourceAsset !== undefined || operation.sourceDocument !== undefined || operation.extensions !== undefined || operation.ref !== undefined) return operation;
  const changes = documentChanges(before, operation.body);
  // 空差异仍传一个同值字段，保留幂等回执；引擎不会产生新正文版本。
  if (!changes.length) {
    const key = Object.keys(before)[0];
    if (key === undefined) return operation;
    changes.push({ path: [key], value: before[key] });
  }
  return { type: 'patchDocument', documentId: operation.documentId, changes, ...(operation.summary !== undefined ? { summary: operation.summary } : {}) };
}

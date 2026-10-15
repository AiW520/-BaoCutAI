// i18n-ignore-file: 拒绝与错误的说明给智能体与运行日志看（编辑器按 code 显示自己的文字）
/** 项目值（版式、字体、标签页的名称 / 顺序 / 嵌套）的 JSON patch：按 path 设值或删键。 */
export type JsonPath = (string | number)[];

export type JsonPatchOp = { op: 'set'; path: JsonPath; value: unknown } | { op: 'delete'; path: JsonPath };

export type JsonObject = Record<string, unknown>;

export class JsonPatchError extends Error {}

/** 不能作为键的名字：写进去会改到原型上。 */
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** 把 patch 应用到 value 的副本上并返回副本；set 沿途缺的层级补成空对象，delete 不存在的路径什么也不做。 */
export function applyJsonPatch<T extends JsonObject>(value: T, patch: readonly JsonPatchOp[]): T {
  const result = structuredClone(value);
  for (const op of patch) {
    if (!isObject(op) || !Array.isArray(op.path) || op.path.length === 0) throw new JsonPatchError('patch 缺少 path');
    if (op.op !== 'set' && op.op !== 'delete') throw new JsonPatchError(`不支持的 patch 操作 ${String((op as { op: unknown }).op)}`);
    const keys = op.path.map((segment) => {
      if (typeof segment !== 'string' && typeof segment !== 'number') throw new JsonPatchError('path 只能由字符串与数字组成');
      const key = String(segment);
      if (FORBIDDEN_KEYS.has(key)) throw new JsonPatchError(`path 不能含 ${key}`);
      return key;
    });
    const key = keys.at(-1)!;
    let parent: JsonObject | undefined = result;
    for (const segment of keys.slice(0, -1)) {
      const child: unknown = parent[segment];
      if (isObject(child)) parent = child;
      else if (op.op === 'set' && child === undefined) parent = parent[segment] = {};
      else if (op.op === 'delete') {
        parent = undefined;
        break;
      } else throw new JsonPatchError(`path ${keys.join('.')} 经过的不是对象`);
    }
    if (!parent) continue;
    if (op.op === 'set') parent[key] = structuredClone(op.value);
    else delete parent[key];
  }
  return result;
}

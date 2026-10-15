/** comment-outbox-backing: restored from commentOutboxBacking-pPMYRE75.js. */
import type { Dynamic } from "./types";
import {
  Hv as frameViewer,
  by as resolveObservabilityBrowserAndOperationEventsIsFinite2,
  vg as PlatformApiAndAuthUser,
  yy as resolveObservabilityBrowserAndOperationEventsIndexedDB,
} from "./platform-core";
import { S as isFrameArtifact } from "./hello-early";
var OUTBOX_SCOPE_TIMEOUT_MS: Dynamic = 3e3;
function resolveOutboxScope(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options.scope) return options.scope(pid);
  if (isFrameArtifact())
    return Promise.race([
      frameViewer().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          result.id ?? ``,
      ),
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          setTimeout(
            (..._extraArguments: unknown[]): Dynamic => resolve(``),
            OUTBOX_SCOPE_TIMEOUT_MS,
          ),
      ),
    ]).then((result?: Dynamic, ..._extraArguments: unknown[]) =>
      result === `` ? `` : `frame:${result}|${pid}`,
    );
  let email: Dynamic = PlatformApiAndAuthUser.getState().user?.email ?? ``;
  return Promise.resolve(email === `` ? `` : `${email}|${pid}`);
}
var hasReportedOutboxFailure: Dynamic = false;
function openScopedOutbox(
  pid?: Dynamic,
  options: Dynamic = {},
  container: Dynamic = ``,
  ..._extraArguments: unknown[]
): Dynamic {
  return createDeferredScopedOutbox(
    resolveOutboxScope(pid, options).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        result === `` &&
          !hasReportedOutboxFailure &&
          ((hasReportedOutboxFailure = true),
          (console as Dynamic).warn(
            `comments: nobody is signed in yet on this page life — unsent comments are kept in memory only`,
          )),
        result === `` ? result : result + container
      ),
    ),
    options.open ??
      ((openScopedOutbox2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        createIndexedDbOutbox(
          resolveObservabilityBrowserAndOperationEventsIndexedDB() ?? undefined,
          openScopedOutbox2,
          (
            openScopedOutbox3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            (console as Dynamic).warn(
              `comments: the outbox could not use IndexedDB (${openScopedOutbox3}) — unsent comments are kept in memory only`,
            ),
          (..._extraArguments: unknown[]): Dynamic => Date.now(),
        )),
  );
}
function createMemoryOutbox(..._extraArguments: unknown[]): Dynamic {
  let entries: Dynamic = new (Map as Dynamic)();
  return {
    backing: `memory`,
    load: (..._extraArguments: unknown[]): Dynamic =>
      Promise.resolve(
        [...entries.values()]
          .map(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              ...item,
            }),
          )
          .toSorted(
            (
              mappedItem?: Dynamic,
              mappedItem2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              mappedItem.createdAt.localeCompare(mappedItem2.createdAt),
          ),
      ),
    put: (memoryOutbox?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let { refusedCopy: memoryOutbox2, ...memoryOutbox3 }: Dynamic =
        memoryOutbox;
      entries.set(memoryOutbox.opId, memoryOutbox3);
      return Promise.resolve();
    },
    del: (memoryOutbox?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      entries.delete(memoryOutbox),
      Promise.resolve()
    ),
    has: (memoryOutbox?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      Promise.resolve(entries.has(memoryOutbox)),
    get: (memoryOutbox?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let entryEntry: Dynamic = entries.get(memoryOutbox);
      return Promise.resolve(
        entryEntry === undefined
          ? null
          : {
              ...entryEntry,
            },
      );
    },
  };
}
function createDeferredScopedOutbox(
  scopePromise?: Dynamic,
  openBacking?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let backing: Dynamic = null;
  let memory: Dynamic = createMemoryOutbox();
  let ready: Dynamic = scopePromise
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        result === `` ? createMemoryOutbox() : openBacking(result),
    )
    .catch((..._extraArguments: unknown[]): Dynamic => createMemoryOutbox())
    .then(
      async (
        result?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        backing = result;
        for (let createDeferredScopedOutboxResult of (await memory.load()) as Dynamic)
          await result.put(createDeferredScopedOutboxResult);
        return result;
      },
    );
  return {
    get backing(): Dynamic {
      return backing?.backing ?? `pending`;
    },
    load: (..._extraArguments: unknown[]): Dynamic =>
      ready.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          result.load(),
      ),
    put: (
      deferredScopedOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      backing
        ? backing.put(deferredScopedOutbox)
        : memory
            .put(deferredScopedOutbox)
            .then(
              (..._extraArguments: unknown[]): Dynamic =>
                ready.then((..._extraArguments: unknown[]): undefined => {}),
            ),
    del: (
      deferredScopedOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      memory
        .del(deferredScopedOutbox)
        .then(
          (..._extraArguments: unknown[]): Dynamic =>
            ready.then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.del(deferredScopedOutbox),
            ),
        ),
    has: (
      deferredScopedOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      ready.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          result.has(deferredScopedOutbox),
      ),
    get: (
      deferredScopedOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      ready.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          result.get(deferredScopedOutbox),
      ),
  };
}
var OUTBOX_DB_SCHEMA: Dynamic = {
  name: `bongo.comment-outbox`,
  version: 1,
  store: `outbox`,
  keyPath: [`scope`, `opId`],
};
var OUTBOX_DB_NAME: Dynamic = OUTBOX_DB_SCHEMA.name;
var OUTBOX_STORE_NAME: Dynamic = OUTBOX_DB_SCHEMA.store;
function openOutboxDatabase(
  indexedDb?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let open: Dynamic = indexedDb.open(
        OUTBOX_DB_NAME,
        OUTBOX_DB_SCHEMA.version,
      );
      open.addEventListener(
        `upgradeneeded`,
        (..._extraArguments: unknown[]): undefined => {
          if (!open.result.objectStoreNames.contains(OUTBOX_STORE_NAME)) {
            open.result.createObjectStore(OUTBOX_STORE_NAME, {
              keyPath: [...OUTBOX_DB_SCHEMA.keyPath],
            });
          }
        },
      );
      open.addEventListener(
        `success`,
        (..._extraArguments: unknown[]): undefined => {
          open.result.addEventListener(
            `versionchange`,
            (..._extraArguments: unknown[]): Dynamic => open.result.close(),
          );
          resolve(open.result);
        },
      );
      open.addEventListener(
        `error`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(open.error ?? Error(`comment outbox: open failed`)),
      );
      open.addEventListener(
        `blocked`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(Error(`comment outbox: open blocked`)),
      );
    },
  );
}
function transactionDone(
  transaction?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      transaction.addEventListener(
        `complete`,
        (..._extraArguments: unknown[]): Dynamic => resolve(),
      );
      transaction.addEventListener(
        `abort`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(transaction.error ?? Error(`comment outbox: tx aborted`)),
      );
      transaction.addEventListener(
        `error`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(transaction.error ?? Error(`comment outbox: tx failed`)),
      );
    },
  );
}
function createIndexedDbOutbox(
  indexedDb?: Dynamic,
  scope?: Dynamic,
  onFailure: Dynamic = (..._extraArguments: unknown[]): undefined => {},
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (scope === `` || indexedDb === undefined) return createMemoryOutbox();
  let memory: Dynamic = createMemoryOutbox();
  let backingKind: Dynamic = `pending`;
  let databasePromise: Dynamic = null;
  let database: Dynamic = (..._extraArguments: unknown[]): Dynamic => (
    (databasePromise ??= openOutboxDatabase(indexedDb).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        (backingKind = `idb`),
        result
      ),
      (..._extraArguments: unknown[]): Dynamic => (
        (backingKind = `memory`),
        onFailure(`open`),
        null
      ),
    )),
    databasePromise
  );
  let fallbackToMemory = (
    indexedDbOutbox?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (backingKind !== `memory`) {
      onFailure(indexedDbOutbox);
    }
    backingKind = `memory`;
    databasePromise = Promise.resolve(null);
  };
  return {
    get backing(): Dynamic {
      return backingKind;
    },
    async load(..._extraArguments: unknown[]): Promise<Dynamic> {
      let database2: Dynamic = await database();
      if (database2 === null) return memory.load();
      try {
        let all: Dynamic = database2
          .transaction(OUTBOX_STORE_NAME, `readonly`)
          .objectStore(OUTBOX_STORE_NAME)
          .getAll(IDBKeyRange.bound([scope, ``], [scope, `￿`]));
        let promise: Dynamic = await new (Promise as Dynamic)(
          (
            resolve?: Dynamic,
            reject?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            all.addEventListener(
              `success`,
              (..._extraArguments: unknown[]): Dynamic => resolve(all.result),
            );
            all.addEventListener(
              `error`,
              (..._extraArguments: unknown[]): Dynamic =>
                reject(all.error ?? Error(`comment outbox: load failed`)),
            );
          },
        );
        let items: Dynamic = [];
        for (let createIndexedDbOutboxResult of promise as Dynamic) {
          let storedOutboxEntry: Dynamic = parseStoredOutboxEntry(
            createIndexedDbOutboxResult,
            scope,
          );
          if (
            storedOutboxEntry !== null &&
            (pid === undefined ||
              !resolveObservabilityBrowserAndOperationEventsIsFinite2(
                Date.parse(String(createIndexedDbOutboxResult.createdAt)),
                pid(),
              ))
          ) {
            items.push(storedOutboxEntry);
          }
        }
        for (let createIndexedDbOutboxResult of (await memory.load()) as Dynamic)
          if (
            !items.some(
              (item?: Dynamic, ..._extraArguments: unknown[]) =>
                item.opId === createIndexedDbOutboxResult.opId,
            )
          ) {
            items.push(createIndexedDbOutboxResult);
          }
        return items.toSorted(
          (
            item?: Dynamic,
            item2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => item.createdAt.localeCompare(item2.createdAt),
        );
      } catch {
        fallbackToMemory(`load`);
        return memory.load();
      }
    },
    async put(
      entry?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      await memory.put(entry);
      let database2: Dynamic = await database();
      if (database2 !== null)
        try {
          let transaction: Dynamic = database2.transaction(
            OUTBOX_STORE_NAME,
            `readwrite`,
          );
          let { refusedCopy: entry2, ...entry3 }: Dynamic = entry;
          transaction.objectStore(OUTBOX_STORE_NAME).put({
            ...entry3,
            scope: scope,
          });
          await transactionDone(transaction);
        } catch {
          fallbackToMemory(`put`);
        }
    },
    async del(
      indexedDbOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      await memory.del(indexedDbOutbox);
      let database2: Dynamic = await database();
      if (database2 !== null)
        try {
          let transaction: Dynamic = database2.transaction(
            OUTBOX_STORE_NAME,
            `readwrite`,
          );
          transaction
            .objectStore(OUTBOX_STORE_NAME)
            .delete([scope, indexedDbOutbox]);
          await transactionDone(transaction);
        } catch {
          fallbackToMemory(`del`);
        }
    },
    async has(
      indexedDbOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let database2: Dynamic = await database();
      if (database2 === null) return true;
      try {
        let count: Dynamic = database2
          .transaction(OUTBOX_STORE_NAME, `readonly`)
          .objectStore(OUTBOX_STORE_NAME)
          .count([scope, indexedDbOutbox]);
        return await new (Promise as Dynamic)(
          (
            resolve?: Dynamic,
            reject?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            count.addEventListener(
              `success`,
              (..._extraArguments: unknown[]): Dynamic =>
                resolve(count.result > 0),
            );
            count.addEventListener(
              `error`,
              (..._extraArguments: unknown[]): Dynamic =>
                reject(count.error ?? Error(`comment outbox: has failed`)),
            );
          },
        );
      } catch {
        fallbackToMemory(`has`);
        return true;
      }
    },
    async get(
      indexedDbOutbox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let database2: Dynamic = await database();
      if (database2 === null) return `standing`;
      try {
        let objectStoreEntry: Dynamic = database2
          .transaction(OUTBOX_STORE_NAME, `readonly`)
          .objectStore(OUTBOX_STORE_NAME)
          .get([scope, indexedDbOutbox]);
        let promise: Dynamic = await new (Promise as Dynamic)(
          (
            resolve?: Dynamic,
            reject?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            objectStoreEntry.addEventListener(
              `success`,
              (..._extraArguments: unknown[]): Dynamic =>
                resolve(objectStoreEntry.result),
            );
            objectStoreEntry.addEventListener(
              `error`,
              (..._extraArguments: unknown[]): Dynamic =>
                reject(
                  objectStoreEntry.error ?? Error(`comment outbox: get failed`),
                ),
            );
          },
        );
        return promise === undefined
          ? null
          : (parseStoredOutboxEntry(promise, scope) ?? `standing`);
      } catch {
        fallbackToMemory(`get`);
        return `standing`;
      }
    },
  };
}
function parseStoredOutboxEntry(
  stored?: Dynamic,
  scope?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof stored != `object` || !stored) return null;
  let entry: Dynamic = stored;
  if (
    entry.scope !== scope ||
    typeof entry.opId != `string` ||
    typeof entry.pid != `string` ||
    typeof entry.container != `string` ||
    typeof entry.pageId != `string` ||
    typeof entry.tmpId != `string` ||
    typeof entry.body != `string` ||
    (entry.kind !== `create` && entry.kind !== `reply`) ||
    (entry.kind === `reply` && typeof entry.parent != `string`)
  )
    return null;
  let refused: Dynamic =
    typeof entry.refused == `object` && entry.refused !== null
      ? entry.refused
      : null;
  let refusal: Dynamic =
    refused !== null && typeof refused.copy == `string`
      ? {
          ...(typeof refused.reason == `string` && {
            reason: refused.reason,
          }),
          copy: refused.copy,
        }
      : null;
  return {
    opId: entry.opId,
    pid: entry.pid,
    container: entry.container,
    pageId: entry.pageId,
    tmpId: entry.tmpId,
    kind: entry.kind,
    ...(typeof entry.parent == `string` && {
      parent: entry.parent,
    }),
    value: entry.value,
    ...(entry.cells === true && {
      cells: true,
    }),
    body: entry.body,
    ...(Array.isArray(entry.to) && {
      to: entry.to.filter(
        (to?: Dynamic, ..._extraArguments: unknown[]) => typeof to == `string`,
      ),
    }),
    ...(typeof entry.target == `object` &&
      entry.target !== null && {
        target: entry.target,
      }),
    ...(refusal !== null && {
      refused: refusal,
    }),
    createdAt:
      typeof entry.createdAt == `string`
        ? entry.createdAt
        : new (Date as Dynamic)(0).toISOString(),
    attempts: typeof entry.attempts == `number` ? entry.attempts : 0,
    ...((typeof entry.author == `string` || entry.author === null) && {
      author: entry.author,
    }),
  };
}
export { openScopedOutbox };

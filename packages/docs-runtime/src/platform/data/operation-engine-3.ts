/** BaoCut: data operation engine from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  lazyZod,
} from "./lazy-zod";
import {
  DataContentAndReferencesHasHeader,
  dataContentAndReferencesDescribeSchema,
  dataContentAndReferencesDescribeSchema5,
  dataContentAndReferencesKindSchema,
} from "./content-and-references";
import {
  editorExtensionsKindSchema4,
} from "../../prose-editor/platform/extensions-3";
import {
  collectDataModelSchemasSplit,
} from "./model-schemas-3";
import {
  EngineRefuse,
  dataOperationEngineLineSchema,
  dataOperationEngineParentSchema,
  dataOperationEngineSheetIdSchema,
  resolveDataOperationEngineCreate,
  resolveDataOperationEngineValue6,
  resolveDataOperationEngineValue8,
} from "./operation-engine-1";
import {
  dataOperationEngineCodeSchema,
  dataOperationEngineDescribeSchema11,
  dataOperationEngineDescribeSchema17,
  dataOperationEngineDescribeSchema29,
  dataOperationEngineEngineSchema10,
  dataOperationEngineEngineSchema11,
  dataOperationEngineEngineSchema8,
  dataOperationEngineEngineSchema9,
  dataOperationEngineKindSchema12,
  dataOperationEngineKindSchema2,
  dataOperationEngineKindSchema6,
  dataOperationEngineKindSchema8,
  dataOperationEngineMessageSchema,
  dataOperationEngineMessageSchema4,
  dataOperationEngineMimeSchema,
  dataOperationEngineOptionsSchema,
  dataOperationEngineOwnerSchema,
  dataOperationEnginePathSchema3,
  dataOperationEngineProjectFileNodeRunValues2,
  dataOperationEngineRunSchema,
  dataOperationEngineSourceSchema,
  dataOperationEngineSourceSchema2,
  dataOperationEngineStatusSchema2,
  resolveDataOperationEngineLdoc,
  resolveDataOperationEngineNoun,
  resolveDataOperationEnginePatch2,
  resolveDataOperationEngineValue15,
  resolveDataOperationEngineValue16,
  resolveDataOperationEngineValue17,
} from "./operation-engine-2";

var dataOperationEngineNounSchema: Dynamic;

var DataOperationEngineVerbs3: Dynamic;

var resolveDataOperationEngineValue18: Dynamic;

var resolveDataOperationEngineValue19: Dynamic;

var DataOperationEngineCreate2: Dynamic;

var dataOperationEngineParentSchema4: Dynamic;

var dataOperationEngineEngineSchema12: Dynamic;

var resolveDataOperationEngineParent2: Dynamic;

var dataOperationEngineValueSchema: Dynamic;

var DataOperationEngineVerbs4: Dynamic;

var DataOperationEngineCreate3: Dynamic;

var dataOperationEngineKeySchema: Dynamic;

var dataOperationEngineColumnsSchema2: Dynamic;

var dataOperationEngineDescribeSchema30: Dynamic;

var dataOperationEngineSourceSchema3: Dynamic;

var dataOperationEngineCodeSchema2: Dynamic;

var dataOperationEngineUnsetSchema: Dynamic;

var dataOperationEngineSha256Schema: Dynamic;

var dataOperationEngineDatabaseSchema: Dynamic;

var dataOperationEngineEngineSchema13: Dynamic;

var dataOperationEngineEngineSchema14: Dynamic;

var dataOperationEngineEngineSchema15: Dynamic;

var dataOperationEngineEngineSchema16: Dynamic;

var dataOperationEngineEngineSchema17: Dynamic;

var dataOperationEngineKindSchema14: Dynamic;

var resolveDataOperationEngineValue20: Dynamic;

var resolveDataOperationEngineValue21: Dynamic;

var resolveDataOperationEngineValue22: Dynamic;

var dataOperationEngineEngineSchema18: Dynamic;

var dataOperationEngineEngineSchema19: Dynamic;

var dataOperationEngineCreateSchema2: Dynamic;

var DataOperationEngineVerbs5: Dynamic;

var resolveDataOperationEngineState: Dynamic;

var resolveDataOperationEngineState2: Dynamic;

var DataOperationEngineCreate4: Dynamic;

var DataOperationEngineStrictObject: Dynamic;

var DataOperationEngineTuple: Dynamic;

var DataOperationEngineProperty: Dynamic;

var DataOperationEngineMissing: Dynamic;

var DataOperationEngineRef: Dynamic;

function isDataOperationEnginePush(
  dataOperationEnginePush?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let items: Dynamic = [
    {
      v: dataOperationEnginePush,
      d: 0,
    },
  ];
  for (; items.length > 0; ) {
    let { v: pop, d: pop2 }: Dynamic = items.pop();
    if (pop2 > options) return false;
    if (Array.isArray(pop))
      for (let isDataOperationEnginePushResult of pop as Dynamic)
        items.push({
          v: isDataOperationEnginePushResult,
          d: pop2 + 1,
        });
    else if (typeof pop == `object` && pop)
      for (let isDataOperationEnginePushResult of Object.values(pop) as Dynamic)
        items.push({
          v: isDataOperationEnginePushResult,
          d: pop2 + 1,
        });
  }
  return true;
}

var DataOperationEnginePath3: Dynamic;

var DataOperationEnginePath4: Dynamic;

var DataOperationEngineUnion: Dynamic;

var DataOperationEngineState8: Dynamic;

var DataOperationEngineMessage: Dynamic;

var dataOperationEngineValue1000: number;

var DataOperationEnginePath5: Dynamic;

var DataOperationEngineMessage2: Dynamic;

var dataOperationEngineEngineSchema20: Dynamic;

var dataOperationEngineSha256Schema2: Dynamic;

var dataOperationEngineDescribeSchema31: Dynamic;

var dataOperationEngineEngineSchema21: Dynamic;

var dataOperationEngineValue10485763: number;

var dataOperationEngineEngineSchema22: Dynamic;

function resolveDataOperationEngineValue23(
  dataOperationEngineValue23?: unknown,
  options?: unknown,
  ..._extraArguments: unknown[]
): undefined {}

function resolveDataOperationEngineCreate3(
  dataOperationEngineCreate3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataOperationEngineCreate3 !== `create`) return [];
  let id: Dynamic = options?.id;
  return typeof id == `string` ? [id] : [];
}

var DataOperationEngineCreate5: Dynamic;

var dataOperationEngineVerbsSchema: Dynamic;

var resolveDataOperationEngineValue24: Dynamic;

var DataOperationEngineCreate6: Dynamic;

var dataOperationEngineTableFileRoutineRunValues: string[];

var resolveDataOperationEngineToLowerCase: Dynamic;

var resolveDataOperationEngineStartsWith2: Dynamic;

var dataOperationEnginePattern3: RegExp;

var DataOperationEngineStyles2: string;

var dataOperationEnginePattern4: RegExp;

function resolveDataOperationEngineMsg(
  dataOperationEngineMsg?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataOperationEngineMsg.includes(`#`))
    return {
      ok: false,
      msg: `refs don't carry '#' fragments — read the whole object and select inside the component`,
    };
  let dataOperationEngineMsgParts: Dynamic = dataOperationEngineMsg.split(`/`);
  if (dataOperationEngineMsgParts.length !== 2)
    return {
      ok: false,
      msg: `a ref is <noun>/<id> — one of table/<id>, file/<id>, routine/<id>, run/<id>, blob/<id>, database/<id>`,
    };
  let [noun, setNoun]: Dynamic = dataOperationEngineMsgParts;
  if (!dataOperationEngineTableFileRoutineRunValues.includes(noun))
    return {
      ok: false,
      msg: `a ref names table/<id>, file/<id>, routine/<id>, run/<id> (pinned), blob/<id>, or database/<id> — nothing else has a projection`,
    };
  if (setNoun.startsWith(`$`)) {
    if (!setNoun.startsWith(`$lid:`))
      return {
        ok: false,
        msg: `a batch-local alias ref is spelled ${DataOperationEngineStyles2}<alias> (exact lowercase prefix) — nothing else starts with '$'`,
      };
    let lidAlias: Dynamic = setNoun.slice(5);
    return dataOperationEnginePattern4.test(lidAlias)
      ? {
          ok: true,
          noun: noun,
          id: setNoun,
          canonical: `${noun}/${setNoun}`,
          lidAlias: lidAlias,
        }
      : {
          ok: false,
          msg: `the alias in ${DataOperationEngineStyles2}<alias> must match [A-Za-z0-9_-]{1,128} — the ref spelling is narrower than the batch declaration grammar`,
        };
  }
  return dataOperationEnginePattern3.test(setNoun)
    ? {
        ok: true,
        noun: noun,
        id: setNoun,
        canonical: `${noun}/${setNoun}`,
      }
    : {
        ok: false,
        msg: `the id must match [A-Za-z0-9_-]{1,128}`,
      };
}

function resolveDataOperationEngineMsg2(
  dataOperationEngineMsg2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationEngineMsg: Dynamic = resolveDataOperationEngineMsg(
    dataOperationEngineMsg2,
  );
  return dataOperationEngineMsg.ok &&
    dataOperationEngineMsg.lidAlias !== undefined
    ? {
        ok: false,
        msg: `the id must match [A-Za-z0-9_-]{1,128}`,
      }
    : dataOperationEngineMsg;
}

var DataOperationEngineCode: Dynamic;

var dataOperationEnginePattern5: RegExp;

var DataOperationEngineMessage3: Dynamic;

var DataOperationEngineMessage4: Dynamic;

var DataOperationEngineCode2: Dynamic;

var DataOperationEngineError: Dynamic;

var DataOperationEnginePipe: Dynamic;

var DataOperationEngineKind: Dynamic;

var resolveDataOperationEngineAdapter: Dynamic;

var DataOperationEngineState9: Dynamic;

var DataOperationEnginePreprocess: Dynamic;

var resolveDataOperationEngineError: Dynamic;

var updateDataOperationEngineCode: (updateDataOperationEngineCode2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveDataOperationEngineEvery(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    Array.isArray(items) &&
    items.length >= 1 &&
    items.length <= 16 &&
    items.every(
      (items2?: unknown, ..._extraArguments: unknown[]) =>
        typeof items2 == `string` && items2.length >= 1 && items2.length <= 256,
    )
  );
}

var dataOperationEnginePattern6: RegExp;

var resolveDataOperationEngineReplaceAll: Dynamic;

function collectDataOperationEngineJoin(
  collectDataOperationEngineJoin2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveDataOperationEngineEvery(collectDataOperationEngineJoin2)
    ? `/` +
        collectDataOperationEngineJoin2
          .map(resolveDataOperationEngineReplaceAll)
          .join(`/`)
    : null;
}

function resolveDataOperationEngineValue25(
  dataOperationEngineValue25?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectDataOperationEngineJoin2 = collectDataOperationEngineJoin(options);
  return collectDataOperationEngineJoin2 === null
    ? undefined
    : collectDataModelSchemasSplit(
        dataOperationEngineValue25,
        collectDataOperationEngineJoin2,
      );
}

function resolveDataOperationEngineCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 2166136261;
  let resolveDataOperationEngineCharCodeAtResult = -567674544;
  for (let index = 0; index < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(index);
    count = Math.imul(count ^ charCodeAt, 16777619);
    resolveDataOperationEngineCharCodeAtResult = Math.imul(
      resolveDataOperationEngineCharCodeAtResult ^ charCodeAt,
      16777619,
    );
  }
  return (
    (count >>> 0).toString(16).padStart(8, `0`) +
    (resolveDataOperationEngineCharCodeAtResult >>> 16)
      .toString(16)
      .padStart(4, `0`)
  );
}

function isDataOperationEngineCharCodeAt2(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let index = 0; index < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(index);
    if (charCodeAt === 0) return false;
    if (charCodeAt >= 55296 && charCodeAt <= 56319) {
      let charCodeAt2: Dynamic = items.charCodeAt(index + 1);
      if (!(charCodeAt2 >= 56320 && charCodeAt2 <= 57343)) return false;
      index++;
    } else if (charCodeAt >= 56320 && charCodeAt <= 57343) return false;
  }
  return true;
}

var resolveDataOperationEngineMessage2: Dynamic;

var dataOperationEngineDelSchema: Dynamic;

function resolveDataOperationEngineTextSpliceOrder(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let label: string = ``;
  let count: number = 0;
  for (let activity of options as Dynamic) {
    if (activity.at < count)
      throw new (EngineRefuse as Dynamic)(`text-splice-order`);
    let total: Dynamic = activity.at + activity.del.length;
    if (total > items.length)
      throw new (EngineRefuse as Dynamic)(`text-splice-bounds`);
    if (items.slice(activity.at, total) !== activity.del)
      throw new (EngineRefuse as Dynamic)(`text-splice-del`);
    label += items.slice(count, activity.at) + activity.ins;
    count = total;
  }
  return label + items.slice(count);
}

var dataOperationEngineEngineSchema23: Dynamic;

var dataOperationEngineEngineSchema24: Dynamic;

function resolveDataOperationEngineBirthName(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolveDataOperationEngineLdoc(node.birthName) !== `text`)
    throw new (EngineRefuse as Dynamic)(`text-route`);
  return {
    birthName: node.birthName,
    content: node.content,
  };
}

function resolveDataOperationEngineKind(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (node === undefined) throw new (EngineRefuse as Dynamic)(`text-absent`);
  let content: Dynamic = node.content ?? {
    kind: `text`,
    text: ``,
  };
  if (content.kind !== `text`)
    throw new (EngineRefuse as Dynamic)(`text-spilled`);
  if (options.base !== resolveDataOperationEngineCharCodeAt(content.text))
    throw new (EngineRefuse as Dynamic)(`text-stale`);
  let count: number = 0;
  for (let resolveDataOperationEngineKindResult of options.splices as Dynamic)
    count +=
      resolveDataOperationEngineKindResult.ins.length -
      resolveDataOperationEngineKindResult.del.length;
  if (content.text.length + count > 2e6)
    throw new (EngineRefuse as Dynamic)(`text-oversize`);
  let text: Dynamic = resolveDataOperationEngineTextSpliceOrder(
    content.text,
    options.splices,
  );
  if (text.length > 2e6) throw new (EngineRefuse as Dynamic)(`text-oversize`);
  if (!isDataOperationEngineCharCodeAt2(text))
    throw new (EngineRefuse as Dynamic)(`text-encoding`);
  return {
    ...node,
    content: {
      kind: `text`,
      text: text,
    },
  };
}

var DataOperationEngineValue2: Dynamic;

var DataOperationEngineVerbs6: Dynamic;

var DataOperationEngineCreate7: Dynamic;

var DataOperationEngineState10: number;

var dataOperationEngineValue2048: number;

var dataOperationEnginePattern7: RegExp;

var dataOperationEngineValue10243: number;

var resolveDataOperationEngineMessage3: Dynamic;

var DataOperationEngineState11: Dynamic;

var DataOperationEngineRegex3: Dynamic;

var DataOperationEngineState12: Dynamic;

var DataOperationEngineRegex4: Dynamic;

var DataOperationEngineState13: Dynamic;

var DataOperationEngineExact: Dynamic;

var DataOperationEngineQuote: Dynamic;

var DataOperationEngineCode3: Dynamic;

var DataOperationEngineStyles3: string;

var DataOperationEngineCode4: Dynamic;

var DataOperationEngineEngine: Dynamic;

var dataOperationEngineValue10244: number;

var dataOperationEngineParentSchema5: Dynamic;

var DataOperationEngineStrictObject2: Dynamic;

var dataOperationEnginePathSchema4: Dynamic;

var dataOperationEngineValue32: number;

var dataOperationEngineKindSchema15: Dynamic;

var DataOperationEngineKind2: Dynamic;

var DataOperationEngineKind3: Dynamic;

var DataOperationEngineKind4: Dynamic;

var DataOperationEngineKind5: Dynamic;

var DataOperationEngineKind6: Dynamic;

var DataOperationEngineKind7: Dynamic;

var dataOperationEngineKindSchema16: Dynamic;

var dataOperationEngineKindSchema17: Dynamic;

function resolveDataOperationEngineAction(
  dataOperationEngineAction?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof dataOperationEngineAction != `object` ||
    !dataOperationEngineAction ||
    Array.isArray(dataOperationEngineAction)
  )
    return dataOperationEngineAction;
  let dataOperationEngineAction2: Dynamic = dataOperationEngineAction;
  if (
    `kind` in dataOperationEngineAction2 ||
    typeof dataOperationEngineAction2.action != `string`
  )
    return dataOperationEngineAction;
  let { action: kind, ...dataOperationEngineAction3 }: Dynamic =
    dataOperationEngineAction2;
  return {
    ...dataOperationEngineAction3,
    kind: kind,
  };
}

function resolveDataOperationEngineKind2(
  dataOperationEngineKind2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof dataOperationEngineKind2 != `object` ||
    !dataOperationEngineKind2 ||
    Array.isArray(dataOperationEngineKind2)
  )
    return;
  let dataOperationEngineKind22: Dynamic = dataOperationEngineKind2;
  let kind: Dynamic =
    typeof dataOperationEngineKind22.kind == `string`
      ? dataOperationEngineKind22.kind
      : undefined;
  let action: Dynamic =
    typeof dataOperationEngineKind22.action == `string`
      ? dataOperationEngineKind22.action
      : undefined;
  if (!(kind !== undefined && action !== undefined && kind !== action))
    return kind ?? action;
}

var resolveDataOperationEnginePreprocess: Dynamic;

var DataOperationEngineKind8: Dynamic;

var DataOperationEnginePreprocess2: Dynamic;

var DataOperationEngineState14: Dynamic;

var dataOperationEngineDescribeSchema32: Dynamic;

var dataOperationEngineDatabaseSchema2: Dynamic;

var dataOperationEngineDescribeSchema33: Dynamic;

var dataOperationEngineDescribeSchema34: Dynamic;

var dataOperationEngineAdapterSchema: Dynamic;

var dataOperationEngineDescribeSchema35: Dynamic;

var dataOperationEngineMessageSchema6: Dynamic;

var dataOperationEngineDescribeSchema36: Dynamic;

var DataOperationEngineKind9: Dynamic;

var DataOperationEnginePath6: Dynamic;

var DataOperationEngineKind10: Dynamic;

var dataOperationEngineCodeSchema3: Dynamic;

var dataOperationEngineKindSchema18: Dynamic;

var resolveDataOperationEngineSafeParse: Dynamic;

var resolveDataOperationEngineDraft: (dataOperationEngineDraft?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string | null;

function resolveDataOperationEngineAfter2(
  dataOperationEngineAfter2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options.verb === `create`) {
    let payload: Dynamic = options.payload;
    if (payload.code === undefined || payload.code === ``)
      return {
        after: {
          code: ``,
          pub: 0,
        },
      };
    let code: Dynamic = payload.materialized ?? payload.code;
    if (payload.landed === `live`)
      return {
        after: {
          code: code,
          pub: 1,
        },
        outcome: `published`,
      };
    if (payload.landed === `draft`)
      return {
        after: {
          code: ``,
          pub: 0,
          draft: {
            code: code,
            basePub: 0,
          },
        },
        outcome:
          payload.diagnostic === undefined ? `staged` : `staged-with-errors`,
      };
    throw Error(
      `widget engine: create row carries code but no gate-stamped landing — a recorded row no longer matches its gate (corrupted ledger?)`,
    );
  }
  if (options.verb === `delete`)
    return {
      after: undefined,
    };
  if (options.verb !== `update`)
    throw Error(`widget engine: unexpected verb ${options.verb}`);
  let dataOperationEngineSafeParse: Dynamic =
    resolveDataOperationEngineSafeParse(dataOperationEngineAfter2);
  let dataOperationEngineAction: Dynamic = resolveDataOperationEngineAction(
    options.payload,
  );
  let Error2 = (
    dataOperationEngineAfter22?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    throw Error(
      `widget engine: ${dataOperationEngineAfter22} — a recorded row no longer matches its stored value (corrupted ledger?)`,
    );
  };
  switch (dataOperationEngineAction.kind) {
    case `draft`: {
      let code: Dynamic =
        dataOperationEngineAction.materialized ??
        dataOperationEngineAction.code;
      return dataOperationEngineAction.landed === `live`
        ? {
            after: {
              code: code,
              pub: dataOperationEngineSafeParse.pub + 1,
            },
            outcome: `published`,
          }
        : {
            after: {
              code: dataOperationEngineSafeParse.code,
              pub: dataOperationEngineSafeParse.pub,
              draft: {
                code: code,
                basePub: dataOperationEngineAction.basePub,
              },
            },
            ...(dataOperationEngineAction.landed === `draft`
              ? {
                  outcome:
                    dataOperationEngineAction.diagnostic === undefined
                      ? `staged`
                      : `staged-with-errors`,
                }
              : {}),
          };
    }
    case `publish`:
      if (!dataOperationEngineSafeParse.draft) {
        Error2(`publish with no draft`);
      }
      return {
        after: {
          code: dataOperationEngineSafeParse.draft.code,
          pub: dataOperationEngineSafeParse.pub + 1,
        },
        outcome: `published`,
      };
    case `revert`:
      if (!dataOperationEngineSafeParse.draft) {
        Error2(`revert with no draft`);
      }
      return {
        after: {
          code: dataOperationEngineSafeParse.code,
          pub: dataOperationEngineSafeParse.pub,
        },
        outcome: `reverted`,
      };
    case `text`:
      if (dataOperationEngineAction.spliced === undefined) {
        Error2(`text row without its gate-stamped spliced source`);
      }
      return {
        after: {
          code: dataOperationEngineAction.spliced,
          pub: dataOperationEngineSafeParse.pub + 1,
          ...(dataOperationEngineAction.splicedDraft === undefined
            ? {}
            : {
                draft: {
                  code: dataOperationEngineAction.splicedDraft,
                  basePub: dataOperationEngineSafeParse.pub + 1,
                },
              }),
        },
        outcome: `published`,
      };
    case `chart-title`:
      if (dataOperationEngineAction.spliced === undefined) {
        Error2(`chart-title row without its gate-stamped spliced source`);
      }
      return {
        after: {
          code: dataOperationEngineAction.spliced,
          pub: dataOperationEngineSafeParse.pub + 1,
          ...(dataOperationEngineAction.splicedDraft === undefined
            ? {}
            : {
                draft: {
                  code: dataOperationEngineAction.splicedDraft,
                  basePub: dataOperationEngineSafeParse.pub + 1,
                },
              }),
        },
        outcome: `published`,
      };
    case `text-draft`:
      if (!dataOperationEngineSafeParse.draft) {
        Error2(`text-draft with no draft`);
      }
      if (dataOperationEngineAction.spliced === undefined) {
        Error2(`text-draft row without its gate-stamped spliced source`);
      }
      return {
        after: {
          code: dataOperationEngineSafeParse.code,
          pub: dataOperationEngineSafeParse.pub,
          draft: {
            code: dataOperationEngineAction.spliced,
            basePub: dataOperationEngineSafeParse.draft.basePub,
          },
        },
      };
    case `chart-title-draft`:
      if (!dataOperationEngineSafeParse.draft) {
        Error2(`chart-title-draft with no draft`);
      }
      if (dataOperationEngineAction.spliced === undefined) {
        Error2(`chart-title-draft row without its gate-stamped spliced source`);
      }
      return {
        after: {
          code: dataOperationEngineSafeParse.code,
          pub: dataOperationEngineSafeParse.pub,
          draft: {
            code: dataOperationEngineAction.spliced,
            basePub: dataOperationEngineSafeParse.draft.basePub,
          },
        },
      };
    case `draft-edit`:
      if (dataOperationEngineAction.edited === undefined) {
        Error2(`draft-edit row without its gate-stamped edited source`);
      }
      if (
        !dataOperationEngineSafeParse.draft &&
        dataOperationEngineSafeParse.pub === 0
      ) {
        Error2(`draft-edit row on a never-published, draftless value`);
      }
      return {
        after: {
          code: dataOperationEngineSafeParse.code,
          pub: dataOperationEngineSafeParse.pub,
          draft: {
            code: dataOperationEngineAction.edited,
            basePub:
              dataOperationEngineSafeParse.draft?.basePub ??
              dataOperationEngineSafeParse.pub,
          },
        },
      };
    case `spec-patch`:
      if (dataOperationEngineAction.spliced === undefined) {
        Error2(`spec-patch row without its gate-stamped spliced source`);
      }
      return {
        after: {
          code: dataOperationEngineAction.spliced,
          pub: dataOperationEngineSafeParse.pub + 1,
          ...(dataOperationEngineAction.splicedDraft === undefined
            ? {}
            : {
                draft: {
                  code: dataOperationEngineAction.splicedDraft,
                  basePub: dataOperationEngineSafeParse.pub + 1,
                },
              }),
        },
        outcome: `published`,
      };
    default:
      throw Error(
        `widget engine: unrecognized update arm ${JSON.stringify(dataOperationEngineAction.kind)}`,
      );
  }
}

var resolveDataOperationEngineVerb2: Dynamic;

var resolveDataOperationEngineVerb3: Dynamic;

var resolveDataOperationEngineParent3: Dynamic;

var DataOperationEngineCreate8: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationEngine3Step1(): void {
  (dataOperationEngineNounSchema = lazyZod
    .discriminatedUnion(`noun`, [
      resolveDataOperationEngineNoun(
        `project`,
        dataOperationEngineSourceSchema,
        `loose object (catchall z.json) + the root proto-safety refine — enforced at the LIVE DOOR first (projectPlaneShapeDeny) and FOLD-STRICT since the Aug-2 grandfather-kill gavel (jsonShapes.project — landed with a validation sweep of the reachable committed corpus; NOUN-VALUES.DONE.md). Root noun; parent edge inert by shape.`,
      ),
      resolveDataOperationEngineNoun(
        `file`,
        dataOperationEngineMimeSchema,
        `preprocess(the legacy mime→birthName shim) → strict + refines. FOLD-STRICT (jsonShapes.file). ⚠️ SHARED WITH THE TEXT ENGINE — text×file mounts on the FILE row (F3 routing): this is the SAME live object (objects/file.ts zFileValue) the text engine registers as its read.value and its fileValue grammar — never a copy; a change there hits two engines at once (a past incident lived exactly on this seam). The sweep test should assert reference-equality of the two registrations.`,
      ),
      resolveDataOperationEngineNoun(
        `node`,
        dataOperationEngineDescribeSchema11,
        `node — json data nodes (batch-lane $lid journeys): ANY JSON, unwrapped — free-form BY DESIGN (load-bearing for the batch lane's injection defense; objects/node.ts is the ruling's home). node KEEPS the json grant (a proposal to drop json from nodes was withdrawn). Registered in jsonShapes (total shape — fold-strict vacuously); parent-edge door law remains the named open gap.`,
      ),
      resolveDataOperationEngineNoun(
        `run`,
        dataOperationEngineStatusSchema2,
        `union of strictObjects (deliberately NOT dU — arms share mechanism kinds; disambiguation is required-field STRUCTURE). FOLD-STRICT since the Aug-2 reshape ruling (jsonShapes.run — verified-empty prod population; the interim tolerant union is retired). THE MEMBER IS THE FOLD CONTRACT (zRunValueFoldRead — zRunValue's arms with the READ status vocabulary: retired 'cancelled' is HELD by history, never re-entered), keeping valueFor ≡ grammar; the LIVE-WRITE vocabulary is zRunValue, enforced first at the door by evalPlaneShapeDeny + the write enums. Staged cargo law (ops → zEmbeddedOp) is DOOR law in stageLane.ts, not this shape. result is LIFTED to result/<runId> — run.result in a booted room is always undefined.`,
      ),
      resolveDataOperationEngineNoun(
        `utterance`,
        editorExtensionsKindSchema4,
        `dU(kind): message (kind OPTIONAL — the absent-discriminator default arm) | reaction | resolve. FOLD-STRICT (jsonShapes.utterance). Structurally authorless/timeless — envelope carries who/when.`,
      ),
      resolveDataOperationEngineNoun(
        `routine`,
        dataOperationEngineSourceSchema2,
        `strictObject. FOLD-STRICT (jsonShapes.routine) — the rollback-note class: additive keys brick pre-adoption binaries at fold; roll-forward posture. Consent plane = runnable/outputs/crondef/defaults (door law).`,
      ),
      resolveDataOperationEngineNoun(
        `enum`,
        dataOperationEngineOptionsSchema,
        `strict {name, options[]} — APPEND-ONLY (door reason append-only); cells and chips store option INDEX. FOLD-STRICT (jsonShapes.enum).`,
      ),
      resolveDataOperationEngineNoun(
        `spec`,
        dataOperationEngineCodeSchema,
        `strict {name?, code} — a spec IS its code. FOLD-STRICT since the Aug-2 reshape ruling (jsonShapes.spec — verified-empty prod population; evalPlaneShapeDeny still enforces first at the live door).`,
      ),
      resolveDataOperationEngineNoun(
        `suite`,
        dataOperationEngineRunSchema,
        `strictObject {name?≤256, adhoc?, access?(pre-lift stamp, doc-only)} — typed FROM REALITY (objects/suite.ts: the lobby birth whitelist, the ad-hoc lane's patch, the birth-stamp judged pre-lift). FOLD-STRICT since the Aug-2 reshape ruling (jsonShapes.suite — verified-empty prod population; the noun's FIRST shape law: unknown keys refuse value-shape at the door and at replay).`,
      ),
    ])
    .describe(
      `The json lane's noun-value GRAMMAR: which committed-value (and checkpoint-value) shape each json-speaking noun folds to — exactly the catalog's json-granted nouns. Every member wraps a LIVE typed def, and every noun is FOLD-STRICT via the ONE jsonShapes registry (the Aug-2 grandfather-kill gavel; run's member is the fold-read union, node is total z.json). The noun key mirrors address.ref.object. Facet values (access/result) and deleted vocabulary (table/row) are NOT members — the catalog purge; see grammars accessValue/runResultSeat and the fold policy.`,
    ));
  (DataOperationEngineVerbs3 = {
    name: `json`,
    verbs: {
      create: {
        value: {
          objectTypes: dataOperationEngineProjectFileNodeRunValues2,
          payload: dataOperationEngineEngineSchema11,
          effects: dataOperationEngineDescribeSchema29,
          description: `Birth an object on the json lane (the default lane) — ONE spelling: {engine, value}, the birth value. The noun is the ADDRESSED object (birth-defines-type), never re-declared in the payload — a payload carrying its own objectType refuses at parse (strict cell). The value's per-noun shape is enforced by valueFor against the addressed noun; omitting the birth value denies value-shape downstream. effects: typed z.never() from the Aug-1 ground-truth census — no lane records any; see zJsonEffects.`,
        },
      },
      update: {
        value: {
          objectTypes: dataOperationEngineProjectFileNodeRunValues2,
          payload: dataOperationEngineEngineSchema8,
          description: `Whole-value LWW update: {kind:'value', value?} replaces the object's ENTIRE value; an update omitting value parses and is a recorded no-op. The new whole must satisfy the noun's grammar (valueFor → jsonNounValue) or denies value-shape. Noun-level walls ride the DOOR, not this shape: enum is append-only, project's shape is live-door-only (projectPlaneShapeDeny), blob never speaks this lane (WALL_ONLY).`,
        },
        patch: {
          objectTypes: dataOperationEngineProjectFileNodeRunValues2,
          payload: dataOperationEngineEngineSchema9,
          description: `Path-patch update: edit paths INSIDE the current folded value without restating the rest — disjoint-path patches commute (the rebase facet proves-or-refuses exactly that). set auto-creates missing intermediates; delete is 'ensure absent'. The patched WHOLE must still satisfy the noun's grammar or denies value-shape. Segment refusals (patch-path / reserved-key / host-testimony) are engine law — laneRefusesSegment is the one question a writer asks.`,
        },
        take: {
          objectTypes: [`run`],
          payload: dataOperationEngineEngineSchema10,
          effects: dataOperationEngineDescribeSchema29,
          description: `Take-lane update on a run: the ledger records one run-interior row ({kind, step} spine + encoder-respelled payload, catchall z.json — the ROW STRUCTURE is JSON by construction; the VOCABULARY split stays open, owned by the fold's consumption contract in src/lib/takeFold.ts and enforced by the encoder src/spec/landTake.ts, never closed here — the room-wiring fence forbids it). The folded value NEVER moves (testimony, not state — apply is a no-op by law). Executor-gated: room.ts's take-lane gate is the writer wall. Read-side decode assigns seq from the ENVELOPE (2·ledger-seq); embedded seq/at are encoder-internal and untrusted. effects: typed z.never() from the Aug-1 ground-truth census — no lane records any (see zJsonEffects).`,
        },
      },
      read: {
        value: {
          objectTypes: dataOperationEngineProjectFileNodeRunValues2,
          payload: dataOperationEngineNounSchema,
          description: `The committed value (what reads return / checkpoints snapshot): the jsonNounValue GRAMMAR — a dU of the noun value shapes, each a named member importing the live def, exactly the catalog's json-granted nouns. The noun key mirrors address.ref.object (rows never carry it). Facet values (access/result) are shared definitions, not members (catalog purge); table/row are deleted vocabulary riding the generic fold policy.`,
        },
      },
    },
    grammars: {
      jsonNounValue: {
        group: `Values`,
        schema: dataOperationEngineNounSchema,
        description: `The noun-value grammar (SAME object as json.read.value's schema — the emitter collapses the double registration into one $def + $ref).`,
      },
      jsonPatchEntry: {
        group: `Json engine grammars`,
        schema: dataOperationEnginePathSchema3,
        description: `One patch entry — set writes a path, delete removes it (the update.patch arm's element vocabulary).`,
      },
      takeLaneRow: {
        group: `Execution`,
        schema: dataOperationEngineKindSchema12,
        description: `One run-interior row — (kind, step) spine required, remaining fields the encoder's respelled payload: any JSON (catchall z.json — structure typed, vocabulary stays takeFold's contract; see json.update.take).`,
      },
      accessValue: {
        group: `Values`,
        schema: dataOperationEngineOwnerSchema,
        description: `The access/<cid> FACET's value — {owner, grants}: written ONLY by the access VERB's room lane (physics.access.*, never a json op); gate-owned, fail-closed safeParse per consult (room.ts zAccessValue consults at the gate and at boot's access-row replay). Survives the catalog purge as a definition — access is not an object type.`,
      },
      runResultSeat: {
        group: `Values`,
        schema: dataOperationEngineDescribeSchema17,
        description: `The result/<runId> FACET's value — a settled run's OUTPUT (run output is result's true home: worker.ts records path:["result"] on run/<id> at settle; liftOwnRefs lifts it to the result facet; serve routes dereference by name under their own ACL). Opaque JSON BY DESIGN — the eval-lib lane owns its interior grammar. Survives the catalog purge as a definition — result is not an object type.`,
      },
      runnable: {
        group: `Execution`,
        schema: dataOperationEngineKindSchema6,
        description: `WHAT to run — the runnable union, discriminated on kind: prompt (instructions) | toolCall ({connector?, tool}) | code (source), each with declared params. The ROUTINABLE subset (src/room/runnable.ts ROUTINABLE_KINDS) — what a routine may keep; house arms (suite, fileOp) are a future seam and join only by ruling. The routine value's runnable seat is THIS live object.`,
      },
    },
  });
  (resolveDataOperationEngineValue18 = (
    dataOperationEngineValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineValue18);
  (resolveDataOperationEngineValue19 = (
    dataOperationEngineValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineValue19);
  (DataOperationEngineCreate2 = {
    create: {
      value: {
        admit: resolveDataOperationEngineValue8,
        apply: (
          dataOperationEngineCreate2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineValue18(
            resolveDataOperationEngineValue17(
              resolveDataOperationEngineValue19(dataOperationEngineCreate2),
            ),
          ),
        }),
      },
    },
    update: {
      value: {
        admit: resolveDataOperationEngineValue8,
        apply: (
          dataOperationEngineCreate2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineValue18(
            resolveDataOperationEnginePatch2(
              dataOperationEngineCreate2,
              resolveDataOperationEngineValue19(options),
            ),
          ),
        }),
      },
      patch: {
        admit: resolveDataOperationEngineValue8,
        apply: (
          dataOperationEngineCreate2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineValue18(
            resolveDataOperationEngineValue15(
              dataOperationEngineCreate2,
              resolveDataOperationEngineValue19(options),
            ),
          ),
        }),
      },
      take: {
        admit: resolveDataOperationEngineValue8,
        apply: (
          dataOperationEngineCreate2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineValue18(
            resolveDataOperationEngineValue16(
              dataOperationEngineCreate2,
              resolveDataOperationEngineValue19(options),
            ),
          ),
        }),
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate2,
      },
    },
  });
  (dataOperationEngineParentSchema4 = lazyZod
    .object({
      parent: dataContentAndReferencesDescribeSchema5
        .optional()
        .describe(`Optional universal parent edge — the object this blob backs.`),
      sha256: lazyZod
        .string()
        .regex(/^[0-9a-f]{64}$/)
        .describe(
          `The content address: lowercase hex sha-256 of the bytes. The store keys on this; the room never sees the bytes.`,
        ),
      bytes: lazyZod
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe(
          `Byte length. OPTIONAL — the store already knows it, and a declared length that disagrees with the stored object is a second truth nobody adjudicates. Still carried by records born before the sha-only ruling.`,
        ),
      mime: lazyZod
        .string()
        .optional()
        .describe(
          `MIME type. OPTIONAL, and the one field still worth declaring: the bytes do not carry it and magic-byte sniffing cannot recover a text type (text/csv and text/plain are the same bytes). Consumers that branch on it — the widget mount's json-vs-text arm — read absence as text.`,
        ),
    })
    .describe(
      `A blob: THE CONTENT ADDRESS, plus optional testimony about it — never the bytes, never any upload URL. The bytes must ALREADY be in the store when the record is born. IMMUTABLE: update is denied by the blob engine; delete is allowed.`,
    ));
  (dataOperationEngineEngineSchema12 = lazyZod.strictObject({
    engine: lazyZod.literal(`blob`).default(`blob`),
    parent: dataContentAndReferencesDescribeSchema5
      .optional()
      .describe(`Optional universal parent edge — the object this blob backs.`),
    sha256: lazyZod
      .string()
      .regex(/^[0-9a-f]{64}$/)
      .describe(
        `Content address: lowercase hex sha-256 of the bytes. THE ONLY REQUIRED FIELD, and the bytes it names must ALREADY be in the store: upload them first over https (POST /api/blob returns the sha it computed server-side), then record that address here. A record naming bytes that were never uploaded is not a half-born blob to be completed later — it is simply unreadable.`,
      ),
    bytes: lazyZod
      .number()
      .int()
      .nonnegative()
      .optional()
      .describe(`Byte length. Optional — the store already knows it.`),
    mime: lazyZod
      .string()
      .optional()
      .describe(
        `MIME type. Optional, but worth declaring for anything whose type the bytes do not carry: text/csv and text/plain are identical bytes, and a consumer that branches on mime reads absence as text.`,
      ),
  }));
  (resolveDataOperationEngineParent2 = (
    dataOperationEngineParent2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...(dataOperationEngineParent2.parent === undefined
      ? {}
      : {
          parent: dataOperationEngineParent2.parent,
        }),
    sha256: dataOperationEngineParent2.sha256,
    ...(dataOperationEngineParent2.bytes === undefined
      ? {}
      : {
          bytes: dataOperationEngineParent2.bytes,
        }),
    ...(dataOperationEngineParent2.mime === undefined
      ? {}
      : {
          mime: dataOperationEngineParent2.mime,
        }),
  }));
  (dataOperationEngineValueSchema = {
    ...resolveDataOperationEngineCreate(`blob`),
    value: dataOperationEngineParentSchema4,
    create: dataOperationEngineEngineSchema12,
    update: lazyZod
      .never()
      .describe(
        `BLOBS ARE IMMUTABLE: there is no legal update payload — every update fails the lattice parse (deny shape). Replace a blob by creating a new one and repointing the referrer; delete the old record.`,
      ),
    apply: resolveDataOperationEngineValue6(
      (..._extraArguments: unknown[]): Dynamic => [
        DataOperationEngineVerbs4,
        DataOperationEngineCreate3,
      ],
    ),
  });
  (DataOperationEngineVerbs4 = {
    name: `blob`,
    verbs: {
      create: {
        upload: {
          objectTypes: [`blob`],
          payload: dataOperationEngineEngineSchema12,
          description: `Admit an immutable blob record: the content ADDRESS (lowercase hex sha-256) of bytes ALREADY in the store — bytes-first law: bytes ride https FIRST (POST /api/blob computes the sha server-side), then the door records that address; no upload URL ever rides an ack. ≥256KiB envelope payloads spill here (envelope.ts spillIfOversize births blobs on the same plane). STRICT cell: a typo'd optional key (parnet-for-parent) is a shape error, never a silently-stripped orphaned parent edge.`,
        },
      },
      read: {
        value: {
          objectTypes: [`blob`],
          payload: dataOperationEngineParentSchema4,
          description: `The blob's committed value (what reads return / checkpoints snapshot): THE CONTENT ADDRESS plus optional testimony (parent edge, byte length, mime) — never the bytes, never any upload URL. Bytes resolve against the blob plane at the serving edge, under the READER's authorization, never through the room. NON-STRICT where the create cell is strict, deliberately: rules tighten at the door; history (pre-sha-only-ruling records) stands at the fold.`,
        },
      },
    },
  });
  (DataOperationEngineCreate3 = {
    create: {
      upload: {
        admit: (
          dataOperationEngineCreate3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationEngineCreate3 === undefined
            ? {}
            : {
                deny: `blob-exists`,
              },
        apply: (
          (
            dataOperationEngineCreate3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (
            dataOperationEngineCreate32?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            state: dataOperationEngineCreate3(dataOperationEngineCreate32),
          })
        )(resolveDataOperationEngineParent2),
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate3,
      },
    },
  });
  (dataOperationEngineKeySchema = lazyZod
    .strictObject({
      key: dataOperationEngineMessageSchema4,
      type: dataOperationEngineKindSchema8,
      required: lazyZod
        .literal(true)
        .optional()
        .describe(
          `Presence = every row must carry this cell (door-enforced, column-required). To turn off, omit the flag.`,
        ),
      unique: lazyZod
        .literal(true)
        .optional()
        .describe(
          `Presence = this column is THE declared unique key: the fold collapses rows by its value (last writer wins, whole row — §4). At most one per database; literal kind only; implies required. To turn off, omit the flag.`,
        ),
      editable: lazyZod
        .literal(true)
        .optional()
        .describe(
          `Presence = manual row edits (kind:"update") may write this cell — the annotation overlay: manual beats source, survives re-sync (§4). Never combined with required or unique. To turn off, omit the flag.`,
        ),
    })
    .describe(
      `One database column: key, kind, and the presence-grammar flags (required/unique/editable — absence = off).`,
    ));
  (dataOperationEngineColumnsSchema2 = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .describe(
          `Display handle — UNIQUE per container across data sources (database + routine), compared case- and whitespace-insensitively (name-taken — door law, room.ts dataSourceNameDeny). A create or rename onto a name a sibling data source already uses refuses, so a human is shown ONE chip per name and clicks the right one. STILL DISPLAY-ONLY, NOT a resolution key — uniqueness and resolvability are DIFFERENT things (not used for any reference, only for clicking): the id-only gavel is untouched, everything is still referenced by minted id everywhere, a name where an id belongs still answers the uniform 404, and there is deliberately NO name→id lane. The obvious next inference — 'it is unique, so I may look it up by name' — is exactly the mistake this note blocks. Frozen once any insert op exists (name-freeze — a DIFFERENT door law: the name cannot change at all after the first insert).`,
        ),
      columns: lazyZod
        .array(dataOperationEngineKeySchema)
        .superRefine(
          (
            dataOperationEngineColumnsSchema22?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let uniqueItems: Dynamic = new (Set as Dynamic)();
            for (let event of dataOperationEngineColumnsSchema22 as Dynamic) {
              if (uniqueItems.has(event.key)) {
                options.addIssue({
                  code: `custom`,
                  message: `duplicate column key: ` + event.key,
                });
              }
              uniqueItems.add(event.key);
            }
          },
        )
        .describe(
          `The declared columns. APPEND-ONLY once any insert op exists (columns-append-only — door law; likewise name-freeze and unique-freeze). Schema evolution rides the {kind:"value"} whole-value arm — no bespoke restate payload.`,
        ),
    })
    .describe(
      `A database: display name + typed columns. The SCHEMA is the committed value; the ROWS are a fold over the database's own insert/update/delete ops (ledger-anchored — §4), never part of this value.`,
    ));
  (dataOperationEngineDescribeSchema30 = lazyZod
    .string()
    .regex(
      /^(?:run\/[^/\s]+|file\/[^/\s]+|blob\/[^/\s]+|op\/(?:0|[1-9][0-9]*))$/,
      `pk source: run/<id> | file/<id> | blob/<id> | op/<seq>`,
    )
    .describe(
      `Where the row came from: run/<id> | file/<id> | blob/<id> (by-ref) or op/<seq> (by-value; per-database op ordinal).`,
    ));
  (dataOperationEngineSourceSchema3 = lazyZod
    .strictObject({
      source: dataOperationEngineDescribeSchema30,
      index: lazyZod
        .int()
        .nonnegative()
        .describe(`Row index within the source's decoded contribution.`),
    })
    .describe(
      `The row's pk = (source, index) — a LOCATOR, echoed verbatim from a read, never constructed by the caller (§2).`,
    ));
  (dataOperationEngineCodeSchema2 = lazyZod
    .record(dataOperationEngineMessageSchema4, lazyZod.json())
    .superRefine(
      (
        dataOperationEngineCodeSchema22?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (let [
          dataOperationEngineCodeSchema2Result,
          dataOperationEngineCodeSchema2Result2,
        ] of Object.entries(dataOperationEngineCodeSchema22) as Dynamic)
          if (dataOperationEngineCodeSchema2Result2 === null) {
            options.addIssue({
              code: `custom`,
              message: `cell '${dataOperationEngineCodeSchema2Result}': null is the revert-to-source gesture, legal only inside kind:"update" — omit the cell instead`,
            });
          } else {
            if (
              typeof dataOperationEngineCodeSchema2Result2 == `object` &&
              !Array.isArray(dataOperationEngineCodeSchema2Result2) &&
              dataOperationEngineCodeSchema2Result2.unset === true
            ) {
              options.addIssue({
                code: `custom`,
                message: `cell '${dataOperationEngineCodeSchema2Result}': {unset:true} is the blank gesture, legal only inside kind:"update" — omit the cell instead`,
              });
            }
          }
      },
    )
    .describe(
      `One inserted row: column key → cell value (enum cells carry the option index). No null / {unset:true} here — those are update-overlay grammar.`,
    ));
  (dataOperationEngineUnsetSchema = lazyZod
    .record(
      dataOperationEngineMessageSchema4,
      lazyZod.union([
        lazyZod
          .strictObject({
            unset: lazyZod.literal(true),
          })
          .describe(
            `Tagged blank — empty the cell (refused on required columns).`,
          ),
        lazyZod
          .json()
          .describe(
            `Write this value (null = revert-to-source — the distinct gesture, ⚖️5).`,
          ),
      ]),
    )
    .describe(
      `Column key → overlay gesture: value | null (revert) | {unset:true} (blank). Editable columns only (door law column-not-editable).`,
    ));
  (dataOperationEngineSha256Schema = lazyZod
    .strictObject({
      object: lazyZod
        .enum([`run`, `file`, `blob`])
        .describe(
          `The source's noun — a run's sealed result, a file's content, or a blob's bytes (Jul 23: blob joins the ref set; a blob's sha IS its content identity, stamped from the blob value at admission).`,
        ),
      id: dataContentAndReferencesDescribeSchema.describe(
        `The source's MINTED id — structured {object, id}, never a 'run/<id>' string ($lid substitution is whole-field-only, a ruled security property; ["payload","source","id"] joins LID_POSITIONS so a batch can mint a file/run and insert from it same-batch).`,
      ),
      sha256: lazyZod
        .string()
        .optional()
        .describe(
          `Room-stamped content pin: the digest of the source's raw answer as of admission (a blob-homed source pins the blob's own content address). Replay-deterministic — recorded on the op row; later source edits change nothing (§3).`,
        ),
      fingerprint: lazyZod
        .strictObject({
          rows: lazyZod
            .int()
            .nonnegative()
            .describe(`How many rows the declared lens decoded at admission.`),
          bytes: lazyZod
            .int()
            .nonnegative()
            .describe(
              `Canonical byte size of the decoded rows — the cap law's EXACT per-source charge (never a row-count proxy that could under-count wide rows into a silent over-admit).`,
            ),
          digest: lazyZod
            .string()
            .describe(`Digest of the decoded rows (canonical form).`),
        })
        .optional()
        .describe(
          `Room-stamped decode fingerprint (§2): what the lens produced at admission, so a future codec change that would shift indices is DETECTED — mismatch at consumption serves this source's pks as dangling marks, never silently retargeting overlays. Absent when the raw could not be decoded at admission (blob-homed content, unresolvable lens) — consumption then judges conformance from scratch via marks.`,
        ),
      rawBytes: lazyZod
        .int()
        .nonnegative()
        .optional()
        .describe(
          `Room-stamped RAW size of an admission-undecodable source (blob byte length, inline text length) — the cap law's conservative OVER-counting charge for sources the door could not decode (the folded subset of a raw answer cannot meaningfully exceed it; a source with neither fingerprint nor rawBytes charges the full cap, fail-closed).`,
        ),
      decoderV: lazyZod
        .int()
        .min(1)
        .optional()
        .describe(
          `Room-stamped decoder version (D7 — 'stamp now, serve latest'): the DECODER_VERSION (lib/adapterLens.ts) that was live when this source was admitted. Admission-time PROVENANCE only — serves always apply the CURRENT decoder, never a per-row pin; a decoder bump uses the stamp to diff exactly the affected rows. Absent = admitted before the stamp existed (pre-stamp era) — legal forever, never backfilled.`,
        ),
    })
    .describe(
      `A by-ref insert's source: {object:'run'|'file'|'blob', id}. Must exist and be born in the database's own container (door law; one anti-oracle refusal word with absent/masked).`,
    ));
  (dataOperationEngineDatabaseSchema = lazyZod
    .literal(`database`)
    .default(`database`)
    .describe(
      `Pinned discriminator — the database lane speaks for exactly this engine.`,
    ));
  (dataOperationEngineEngineSchema13 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      kind: lazyZod.literal(`value`),
      value: dataOperationEngineColumnsSchema2,
    })
    .describe(
      `Whole-value schema restate (the inherited door-wide arm — for a database the value IS the schema). Judged by the evolution laws once any insert op exists: columns-append-only, name-freeze, unique-freeze (door law).`,
    ));
  (dataOperationEngineEngineSchema14 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      kind: lazyZod.literal(`insert`),
      by: lazyZod.literal(`rows`),
      rows: lazyZod
        .array(dataOperationEngineCodeSchema2)
        .min(1)
        .describe(
          `The inserted rows, door-validated against the columns: column-unknown / column-required / column-type / enum-index.`,
        ),
    })
    .describe(
      `Insert by value: rows carried in the op. pk source = op/<seq>. Oversized by-value inserts refuse toward the by-ref lane (door byte caps stand).`,
    ));
  (dataOperationEngineEngineSchema15 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      kind: lazyZod.literal(`insert`),
      by: lazyZod.literal(`source`),
      source: dataOperationEngineSha256Schema,
      adapter: DataContentAndReferencesHasHeader.optional().describe(
        `The declared lens (the adapter union, lib/adapter.ts via the externals door — the room stores only the DECLARATION; the lens applies at consumption). Absent on a run source: the sealed run's own adapter. Absent on a file or blob source: content must be a bare JSON row array (a blob has no producing routine, so its lens can ONLY ride here). Explicit always wins; adapters SHADOW, never chain (§2). Correction = a new insert-source op.`,
      ),
    })
    .describe(
      `Insert by reference: the routine-feeds-database path. sha + decode fingerprint stamped server-side at admission (§2/§3); row conformance is judged at consumption and surfaces as marks, never a retroactive op failure.`,
    ));
  (dataOperationEngineEngineSchema16 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      kind: lazyZod.literal(`update`),
      key: dataOperationEngineSourceSchema3,
      cells: dataOperationEngineUnsetSchema,
      keyAt: lazyZod
        .string()
        .optional()
        .describe(
          `Room-stamped canonical unique-key VALUE the pk resolved to at admission (keyed databases, by-source pks). The overlay follows the KEY, never the (source, index) position — a by-source refresh that reorders rows must not silently retarget a manual edit onto whatever row now sits at that index (§4's survives-re-sync guarantee). A wire-claimed keyAt refuses "row-stamped" (the source-stamp's audit argument).`,
        ),
    })
    .describe(
      `Manual row edit — editable columns only, whole-cell writes; folds per (unique-key value, column), latest seq wins; manual beats source (§4).`,
    ));
  (dataOperationEngineEngineSchema17 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      kind: lazyZod.literal(`delete`),
      key: dataOperationEngineSourceSchema3,
      keyAt: lazyZod
        .string()
        .optional()
        .describe(
          `Room-stamped canonical unique-key VALUE the pk resolved to at admission (keyed databases, by-source pks). The tombstone follows the KEY, never the position. A wire-claimed keyAt refuses "row-stamped".`,
        ),
    })
    .describe(
      `Tombstone one row in the fold (works on source-inserted rows). Overlay carry-forward terminates at the tombstone (⚖️2a barrier); a later insert of the same key resurrects clean.`,
    ));
  (dataOperationEngineKindSchema14 = lazyZod
    .discriminatedUnion(`kind`, [
      dataOperationEngineEngineSchema13,
      lazyZod.discriminatedUnion(`by`, [
        dataOperationEngineEngineSchema14,
        dataOperationEngineEngineSchema15,
      ]),
      dataOperationEngineEngineSchema16,
      dataOperationEngineEngineSchema17,
    ])
    .describe(
      `The database update-op grammar: kind = pure verb (value | insert | update | delete); only insert carries by: rows | source. Strict objects, nested unions (§2, gaveled).`,
    ));
  (resolveDataOperationEngineValue20 = (
    dataOperationEngineValue20?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineValue20.value);
  (resolveDataOperationEngineValue21 = (
    dataOperationEngineValue21?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => options.value);
  (resolveDataOperationEngineValue22 = (
    dataOperationEngineValue22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineValue22);
  (dataOperationEngineEngineSchema18 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema,
      value: dataOperationEngineColumnsSchema2,
    })
    .describe(
      `The database create payload: {value} — the schema ({name, columns}).`,
    ));
  (dataOperationEngineEngineSchema19 = lazyZod
    .strictObject({
      engine: dataOperationEngineDatabaseSchema.optional(),
      key: lazyZod
        .strictObject({
          source: lazyZod.string(),
          index: lazyZod.int().nonnegative(),
        })
        .optional()
        .describe(
          `PK POINT READ (§2): answer ONE row — default current (as-spawned + overlay + superseded-check); a marked pk answers its mark, never 404. The pk is echoed from a prior read, never caller-built.`,
        ),
      asSpawned: lazyZod
        .literal(true)
        .optional()
        .describe(
          `With key: serve the raw contribution — no overlay, no supersession (what provenance/pins want).`,
        ),
    })
    .describe(
      `The database read probe — the ack carries the schema value; rows ride the getter/point-read/code-lane surfaces (databaseServe.ts).`,
    ));
  (dataOperationEngineCreateSchema2 = {
    ...resolveDataOperationEngineCreate(`database`),
    create: dataOperationEngineEngineSchema18,
    read: dataOperationEngineEngineSchema19,
    update: dataOperationEngineKindSchema14,
    value: dataOperationEngineColumnsSchema2.describe(
      `The database's committed value — the SCHEMA ONLY; rows are ledger-derived (§4).`,
    ),
    valueFor: (
      dataOperationEngineCreateSchema22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationEngineCreateSchema22 === `database`
        ? dataOperationEngineColumnsSchema2
        : lazyZod
            .never()
            .describe(
              dataOperationEngineCreateSchema22 +
                ` does not speak the database lane (ObjectEngines walls this engine to the database noun)`,
            ),
    apply: resolveDataOperationEngineValue6(
      (..._extraArguments: unknown[]): Dynamic => [
        DataOperationEngineVerbs5,
        DataOperationEngineCreate4,
      ],
    ),
  });
  (DataOperationEngineVerbs5 = {
    name: `database`,
    verbs: {
      create: {
        schema: {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema18,
          description: `Birth a database: {value} — the SCHEMA ({name, columns}; presence-grammar flags required/unique/editable, absence = off). Strict (Jul-6 S1: a typo'd key is a shape error, never a silent no-op). Rows NEVER ride the value: they enter as insert EVENTS on the update verb; the schema is the whole committed value.`,
        },
      },
      update: {
        value: {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema13,
          description: `Whole-value schema restate (the inherited door-wide arm — for a database the value IS the schema). Judged by the evolution freezes once any insert op exists: columns-append-only, name-freeze, unique-freeze (door law).`,
        },
        "insert-rows": {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema14,
          description: `Insert by value: rows carried in the op, door-validated against the columns (column-unknown / column-required / column-type / enum-index). pk source = op/<seq> (per-database op ordinal, 0-based replay order — never the container ledger seq). Oversized by-value inserts refuse toward the by-ref lane (door byte caps stand). No null / {unset:true} cells — those are update-overlay grammar.`,
        },
        "insert-source": {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema15,
          description: `Insert by reference — the routine-feeds-database path: {object:'run'|'file'|'blob', id} + optional adapter lens (explicit wins; adapters SHADOW, never chain; correction = a new insert-source op). sha256 + decode fingerprint are ROOM-STAMPED at admission; a wire claim refuses 'source-stamped' (door law, room.ts). decoderV (bongo#4191, OPEN — not in this base): if it lands a decoder-version field on this arm, the LIVE import carries it automatically; nothing here enumerates keys.`,
        },
        update: {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema16,
          description: `Manual row edit — the annotation overlay: editable columns only, whole-cell gestures (value | null = revert-to-source | {unset:true} = blank). Folds per (unique-key value, column), latest seq wins; manual beats source, survives re-sync (keyAt is room-stamped; a wire claim refuses 'row-stamped').`,
        },
        delete: {
          objectTypes: [`database`],
          payload: dataOperationEngineEngineSchema17,
          description: `Tombstone ONE ROW in the fold (works on source-inserted rows) — the update ARM, not the framework's object delete. Overlay carry-forward terminates at the tombstone (⚖️2a barrier); a later insert of the same key resurrects clean.`,
        },
      },
      read: {
        value: {
          objectTypes: [`database`],
          payload: dataOperationEngineColumnsSchema2,
          description: `The committed value — the SCHEMA ONLY ({name, columns}); also what checkpoints snapshot (checkpoints seed only the schema; the rows fold, the per-database op ordinal, and the cap aggregates all rebuild from the ledger on any boot). Rows ride the serve surfaces, never this value.`,
        },
      },
    },
    grammars: {
      databasePk: {
        group: `Database`,
        schema: dataOperationEngineSourceSchema3,
        description: `The row pk = (source, index) — a LOCATOR, echoed verbatim from a read, never caller-built. source: run/<id> | file/<id> | blob/<id> (by-ref) or op/<seq> (by-value; per-database op ordinal). Cross-engine: the update/delete arms key on it and the widget pin's identity address rides the same object.`,
      },
      databaseSource: {
        group: `Database`,
        schema: dataOperationEngineSha256Schema,
        description: `A by-ref insert's source: {object:'run'|'file'|'blob', id (minted, whole-field $lid)} plus the ROOM-STAMPED admission testimony (sha256, decode fingerprint, rawBytes — never caller-passed; the cap law's and the overlay-retargeting guarantee's inputs).`,
      },
      adapter: {
        group: `Execution`,
        schema: dataContentAndReferencesKindSchema,
        description:
          "The declared decode lens (lib/adapter.ts via the externals door) — the AUTHORING contract, strict: a new {kind:'csv'} without hasHeader refuses at the live door ('adapter' deny, judged on the raw payload). A CLOSED, DECLARATIVE union (json-rows | json-columnar | xml-rows | csv | xlsx-values) — adapters are parameterized builtin lenses, never authored code; the lens algebra lives in lib/adapterLens.ts (zero imports, DECODER_VERSION stamps admissions). SEATS: a run's own meta.adapter (read FIRST), else the producing routine's declared adapter (objects/routine.ts `adapter?` — the three-tier runAdapterOf precedence, api/routes/widgetRoutineRead.ts), else none; database insert-by-source rows seat storedAdapter at fold.",
      },
      storedAdapter: {
        group: `Execution`,
        schema: DataContentAndReferencesHasHeader,
        description: `adapter's fold-tolerant twin (z.preprocess filling exactly one legacy absent field) — seated at fold-strict positions (this engine's insert-source arm) so a pre-#4044 committed op replays at bootRoom instead of bricking the room. Rules tighten at the door; history stands.`,
      },
    },
  });
  (resolveDataOperationEngineState = (
      dataOperationEngineState?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      dataOperationEngineState2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      state: dataOperationEngineState(dataOperationEngineState2),
    }));
  (resolveDataOperationEngineState2 = (
      dataOperationEngineState2?: Dynamic,
      outcome?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      dataOperationEngineState22?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      state: dataOperationEngineState2(dataOperationEngineState22, options),
      outcome: outcome,
    }));
  (DataOperationEngineCreate4 = {
    create: {
      schema: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState(resolveDataOperationEngineValue20),
      },
    },
    update: {
      value: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState2(
          resolveDataOperationEngineValue21,
          `schema-restate`,
        ),
      },
      "insert-rows": {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState2(
          resolveDataOperationEngineValue22,
          `row-insert`,
        ),
      },
      "insert-source": {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState2(
          resolveDataOperationEngineValue22,
          `row-insert`,
        ),
      },
      update: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState2(
          resolveDataOperationEngineValue22,
          `row-update`,
        ),
      },
      delete: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineState2(
          resolveDataOperationEngineValue22,
          `row-delete`,
        ),
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate4,
      },
    },
  });
  (DataOperationEngineStrictObject = lazyZod.strictObject({
    r1: lazyZod.number().int(),
    r2: lazyZod.number().int(),
    c1: lazyZod.number().int(),
    c2: lazyZod.number().int(),
  }));
  (DataOperationEngineTuple = lazyZod.tuple([
    lazyZod.number().int(),
    lazyZod.number().int(),
  ]));
  (DataOperationEngineProperty = lazyZod.union([
    lazyZod.strictObject({
      property: lazyZod.string(),
    }),
    lazyZod.strictObject({
      sheetId: lazyZod.number().int(),
    }),
    lazyZod.strictObject({
      range: DataOperationEngineStrictObject,
    }),
    lazyZod.strictObject({
      rows: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      cols: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      id: lazyZod.number().int(),
    }),
    lazyZod.strictObject({
      name: lazyZod.string(),
    }),
    lazyZod.strictObject({
      index: lazyZod.number().int(),
    }),
    lazyZod.strictObject({
      enum: lazyZod.number().int(),
    }),
    lazyZod.strictObject({
      story: lazyZod.string(),
    }),
    lazyZod.strictObject({
      block: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      trow: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      tcol: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      chars: DataOperationEngineTuple,
    }),
    lazyZod.strictObject({
      slideId: lazyZod.number().int(),
    }),
  ]));
  (DataOperationEngineMissing = lazyZod.lazy(
    (..._extraArguments: unknown[]): Dynamic =>
      lazyZod.union([
        lazyZod.null(),
        lazyZod.boolean(),
        lazyZod.number(),
        lazyZod.string(),
        lazyZod.strictObject({
          missing: lazyZod.literal(true),
        }),
        lazyZod.strictObject({
          nothing: lazyZod.literal(true),
        }),
        lazyZod.strictObject({
          err: lazyZod.number().int(),
        }),
        lazyZod.strictObject({
          date: lazyZod.number(),
        }),
        lazyZod.strictObject({
          array: lazyZod.strictObject({
            dims: lazyZod.array(DataOperationEngineTuple).min(1),
            data: lazyZod.array(DataOperationEngineMissing),
          }),
        }),
        lazyZod.strictObject({
          range: lazyZod.strictObject({
            doc: lazyZod.string().optional(),
            sheet: lazyZod.number().int(),
            r1: lazyZod.number().int(),
            c1: lazyZod.number().int(),
            r2: lazyZod.number().int(),
            c2: lazyZod.number().int(),
          }),
        }),
        lazyZod.strictObject({
          ref: lazyZod.strictObject({
            doc: lazyZod.string().optional(),
            path: lazyZod.array(DataOperationEngineProperty),
          }),
        }),
        lazyZod.strictObject({
          blob: lazyZod.strictObject({
            sha: lazyZod.string().regex(/^[0-9a-f]{64}$/),
            mime: lazyZod.string().optional(),
          }),
        }),
        lazyZod.strictObject({
          ast: DataOperationEngineRef,
        }),
        lazyZod.strictObject({
          raw: lazyZod.string(),
        }),
        lazyZod.strictObject({
          media: lazyZod.strictObject({
            sha: lazyZod.union([
              lazyZod.literal(``),
              lazyZod.string().regex(/^[0-9a-f]{64}$/),
            ]),
            mime: lazyZod.string(),
            bytesB64: lazyZod.string().optional(),
          }),
        }),
      ]),
  ));
  (DataOperationEngineRef = lazyZod.lazy(
    (..._extraArguments: unknown[]): Dynamic =>
      lazyZod.union([
        lazyZod.strictObject({
          ref: lazyZod.strictObject({
            sheet: lazyZod.number().int().optional(),
            r: lazyZod.number().int(),
            c: lazyZod.number().int(),
            absR: lazyZod.boolean(),
            absC: lazyZod.boolean(),
          }),
        }),
        lazyZod.strictObject({
          range: lazyZod.strictObject({
            from: DataOperationEngineRef,
            to: DataOperationEngineRef,
          }),
        }),
        lazyZod.strictObject({
          ref3d: lazyZod.strictObject({
            sheetFrom: lazyZod.number().int(),
            sheetTo: lazyZod.number().int(),
            r: lazyZod.number().int(),
            c: lazyZod.number().int(),
            absR: lazyZod.boolean(),
            absC: lazyZod.boolean(),
          }),
        }),
        lazyZod.strictObject({
          structRef: lazyZod.strictObject({
            table: lazyZod.string(),
            spec: lazyZod.string(),
          }),
        }),
        lazyZod.strictObject({
          fn: lazyZod.strictObject({
            name: lazyZod.string(),
            args: lazyZod.array(DataOperationEngineRef),
          }),
        }),
        lazyZod.strictObject({
          op: lazyZod.strictObject({
            op: lazyZod.string(),
            lhs: DataOperationEngineRef,
            rhs: DataOperationEngineRef,
          }),
        }),
        lazyZod.strictObject({
          unary: lazyZod.strictObject({
            op: lazyZod.string(),
            arg: DataOperationEngineRef,
          }),
        }),
        lazyZod.strictObject({
          paren: DataOperationEngineRef,
        }),
        lazyZod.strictObject({
          leaf: lazyZod.string(),
        }),
      ]),
  ));
  (DataOperationEnginePath3 = lazyZod.strictObject({
    path: lazyZod.array(DataOperationEngineProperty),
    set: lazyZod.string(),
    args: lazyZod.array(DataOperationEngineMissing).optional(),
    v: DataOperationEngineMissing,
  }));
  (DataOperationEnginePath4 = lazyZod.strictObject({
    path: lazyZod.array(DataOperationEngineProperty),
    call: lazyZod.string(),
    args: lazyZod.array(DataOperationEngineMissing).optional(),
  }));
  (DataOperationEngineUnion = lazyZod.union([
    DataOperationEnginePath3,
    DataOperationEnginePath4,
  ]));
  (DataOperationEngineState8 = DataOperationEngineUnion);
  (DataOperationEngineMessage = lazyZod
    .unknown()
    .refine(
      (dataOperationEngineMessage?: Dynamic, ..._extraArguments: unknown[]) =>
        isDataOperationEnginePush(dataOperationEngineMessage, 256),
      {
        message: `iron op payload exceeds the nesting-depth bound`,
      },
    )
    .pipe(DataOperationEngineUnion));
  (dataOperationEngineValue1000 = 1e3);
  (DataOperationEnginePath5 = lazyZod.strictObject({
    path: lazyZod.array(DataOperationEngineProperty),
    get: lazyZod.string(),
    args: lazyZod.array(DataOperationEngineMissing).optional(),
  }));
  (DataOperationEngineMessage2 = lazyZod
    .unknown()
    .refine(
      (dataOperationEngineMessage2?: Dynamic, ..._extraArguments: unknown[]) =>
        isDataOperationEnginePush(dataOperationEngineMessage2, 256),
      {
        message: `iron query payload exceeds the nesting-depth bound`,
      },
    )
    .pipe(DataOperationEnginePath5));
  (dataOperationEngineEngineSchema20 = lazyZod
    .strictObject({
      engine: lazyZod.literal(`iron`).default(`iron`),
      queries: lazyZod
        .array(DataOperationEngineMessage2)
        .min(1)
        .max(64)
        .optional()
        .describe(
          "The read-query batch (iron.read.get, ≤64) — each element {path, get: <OM member>, args?}. Present → the ack carries `answers` (one {ok}|{err} per query) beside the committed value; absent → the bare pin (value only).",
        ),
    })
    .refine(
      (
        dataOperationEngineEngineSchema202?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineEngineSchema202.queries === undefined ||
        new TextEncoder().encode(
          JSON.stringify(dataOperationEngineEngineSchema202.queries),
        ).length <= 1048576,
      {
        message: `iron read payload exceeds the serialized byte cap`,
      },
    )
    .describe(
      "The iron read op — bare pin {engine} serves the committed content address; add `queries` for the cell-value read lane (answers ride the ack, never a ledger diff).",
    ));
  (dataOperationEngineSha256Schema2 = lazyZod.strictObject({
    sha256: lazyZod
      .string()
      .regex(/^[0-9a-f]{64}$/)
      .describe(
        `Content address: lowercase hex sha-256 of the canonical toBytes() serialization.`,
      ),
    bytes: lazyZod
      .number()
      .int()
      .nonnegative()
      .describe(`Byte length of that serialization.`),
  }));
  (dataOperationEngineDescribeSchema31 = lazyZod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .describe(
      `ROOM-STAMPED op instant (ISO-8601 UTC, ms) — the recorded source of volatile {seed, now}; clients never choose it.`,
    ));
  (dataOperationEngineEngineSchema21 = lazyZod.strictObject({
    engine: lazyZod.literal(`iron`).default(`iron`),
    at: dataOperationEngineDescribeSchema31,
    parent: dataContentAndReferencesDescribeSchema5
      .optional()
      .describe(
        `The universal parent edge — the file this content node backs (the containment law's requirement, room.ts). Rides the committed value verbatim; iron never inspects it.`,
      ),
  }));
  (dataOperationEngineValue10485763 = 1048576);
  (dataOperationEngineEngineSchema22 = lazyZod
    .strictObject({
      engine: lazyZod.literal(`iron`).default(`iron`),
      at: dataOperationEngineDescribeSchema31,
      ops: lazyZod
        .array(DataOperationEngineMessage)
        .min(1)
        .max(dataOperationEngineValue1000)
        .describe(
          `The iron op batch, applied atomically in order inside one room commit.`,
        ),
    })
    .refine(
      (
        dataOperationEngineEngineSchema222?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        new TextEncoder().encode(
          JSON.stringify(dataOperationEngineEngineSchema222.ops),
        ).length <= dataOperationEngineValue10485763,
      {
        message: `iron update payload exceeds the serialized byte cap`,
      },
    ));
  (DataOperationEngineCreate5 = {
    ...resolveDataOperationEngineCreate(`iron`),
    create: lazyZod.union([
      dataOperationEngineEngineSchema21,
      dataOperationEngineParentSchema,
    ]),
    read: dataOperationEngineEngineSchema20,
    serveRead: async (
      dataOperationEngineCreate5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let queries: Dynamic = dataOperationEngineCreate5?.queries;
      if (!(!Array.isArray(queries) || queries.length === 0))
        throw new (EngineRefuse as Dynamic)(`iron-no-runtime`);
    },
    update: dataOperationEngineEngineSchema22,
    value: dataOperationEngineSha256Schema2,
    cursor: dataOperationEngineSheetIdSchema,
    valueFor: (
      dataOperationEngineCreate5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationEngineCreate5 === `node`
        ? dataOperationEngineSha256Schema2.extend({
            parent: dataContentAndReferencesDescribeSchema5.optional(),
          })
        : dataOperationEngineSha256Schema2,
    testimony: resolveDataOperationEngineValue23,
    sourceBlobs: resolveDataOperationEngineCreate3,
  });
  (dataOperationEngineVerbsSchema = {
    name: `iron`,
    verbs: {
      create: {
        workbook: {
          objectTypes: [`node`],
          payload: dataOperationEngineEngineSchema21,
          description:
            "Birth a BLANK office-format model, born deterministically from the room-stamped `at` (the one source of volatile {seed, now}) via vendor/iron's Model.newAt (D-2). Seeding from uploaded bytes is the create.blob arm.",
        },
        blob: {
          objectTypes: [`node`],
          payload: dataOperationEngineParentSchema,
          description: `Birth an office-format model by seeding from a blob's bytes (id: blob/<id> — uploaded xlsx), decoded engine-specifically (vendor/iron); the file this content backs is the parent edge. Door execution pending FoldCtx.blob wiring (disclosed gap).`,
        },
      },
      update: {
        set: {
          objectTypes: [`node`],
          payload: lazyZod.strictObject({
            engine: lazyZod.literal(`iron`).default(`iron`),
            at: dataOperationEngineDescribeSchema31,
            ops: lazyZod
              .array(DataOperationEnginePath3)
              .min(1)
              .max(dataOperationEngineValue1000)
              .describe(
                `The homogeneous set batch — idempotent LWW property writes, applied atomically in order inside one room commit.`,
              ),
          }),
          description: `A property-write batch: {at, ops[]} of set elements ({path, set: <OM member>, args?, v}) — idempotent LWW, applied atomically in order. set ≡ COM DISPATCH_PROPERTYPUT (the isomorphism to the wrapped Office ABI). (Homogeneity gate pending — formatOps' atomic clear+restyle mixed gesture is flagged for a ruling.)`,
        },
        call: {
          objectTypes: [`node`],
          payload: lazyZod.strictObject({
            engine: lazyZod.literal(`iron`).default(`iron`),
            at: dataOperationEngineDescribeSchema31,
            ops: lazyZod
              .array(DataOperationEnginePath4)
              .min(1)
              .max(dataOperationEngineValue1000)
              .describe(
                `The homogeneous call batch — effectful method invocations, applied atomically in order inside one room commit.`,
              ),
          }),
          description: `A method-invocation batch: {at, ops[]} of call elements ({path, call: <OM member>, args?} — Worksheets.Add, Undo, ...), applied atomically in order. call ≡ COM DISPATCH_METHOD (the isomorphism to the wrapped Office ABI). (Homogeneity gate pending — see the set arm's note.)`,
        },
      },
      read: {
        get: {
          objectTypes: [`node`],
          payload: lazyZod
            .array(DataOperationEnginePath5)
            .min(1)
            .max(64)
            .describe(
              "The query batch (≤64) — each element an ironQuery. Rides the wire read cell's `queries` field; answers ride the ack as `answers`, one {ok}|{err} per query.",
            ),
          description:
            "A read-query batch: array of {path, get: <OM member>, args?} (≤64) — the read sibling of the set/call batches; never advances the claimed chain. Rides the wire read op's `queries` field (the read cell extends the bare pin); the ack carries `answers` beside the committed value. get ≡ COM DISPATCH_PROPERTYGET (the isomorphism to the wrapped Office ABI).",
        },
        value: {
          objectTypes: [`node`],
          payload: dataOperationEngineSha256Schema2.extend({
            parent: dataContentAndReferencesDescribeSchema5.optional(),
          }),
          description: `The committed value: content address of the canonical serialization (what reads return / checkpoints snapshot), plus the parent edge.`,
        },
      },
    },
    grammars: {
      ironOp: {
        group: `Iron`,
        schema: DataOperationEngineState8,
        description: `LEGACY union (set | call) — the parse for HISTORICAL mixed ops[] rows only (dual-read: folds tolerate, new writes refuse iron-mixed-ops and ride the homogeneous set/call arms). Member names are the Office OM.`,
      },
      ironOpSet: {
        group: `Iron`,
        schema: DataOperationEnginePath3,
        description: `The set member of ironOp — idempotent LWW property write.`,
      },
      ironOpCall: {
        group: `Iron`,
        schema: DataOperationEnginePath4,
        description: `The call member of ironOp — effectful method invocation (Worksheets.Add, Undo, ...).`,
      },
      ironQuery: {
        group: `Iron`,
        schema: DataOperationEnginePath5,
        description: `One read-query element: {path, get: <OM member>, args?} — the read arm's batch vocabulary.`,
      },
      ironSeg: {
        group: `Iron`,
        schema: DataOperationEngineProperty,
        description: `One op-path hop — externally-tagged single-key object (property/sheetId/range/story/slideId/...). Mirrors ironOp.ts Seg; Rust op.rs is the authority.`,
      },
      ironValue: {
        group: `Iron`,
        schema: DataOperationEngineMissing,
        description: `COM VARIANT-shaped value: bare JSON primitive or single-key tagged object; recursive (array/ref/ast/media arms).`,
      },
      ironWireAst: {
        group: `Iron`,
        schema: DataOperationEngineRef,
        description: `Wire-format formula AST (9 variants, recursive) — set:"Formula" payloads carry it via ironValue's ast arm.`,
      },
    },
  });
  (resolveDataOperationEngineValue24 = (
      dataOperationEngineValue24?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (..._extraArguments: unknown[]): undefined => {
      throw Error(
        `iron ${dataOperationEngineValue24}: host-composed — makeIronEngine wires the live runtime`,
      );
    });
  (DataOperationEngineCreate6 = {
    create: {
      workbook: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineValue24(`create.workbook`),
      },
      blob: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineValue24(`create.blob`),
      },
    },
    update: {
      set: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineValue24(`update.set`),
      },
      call: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineValue24(`update.call`),
      },
    },
    read: {
      get: {
        serve: resolveDataOperationEngineValue24(`read.get`),
      },
      value: {
        serve: (
          dataOperationEngineCreate6?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate6,
      },
    },
  });
  (dataOperationEngineTableFileRoutineRunValues = [
    `table`,
    `file`,
    `routine`,
    `run`,
    `blob`,
    `database`,
  ]);
  (resolveDataOperationEngineToLowerCase = (
    dataOperationEngine?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngine.toLowerCase());
  (resolveDataOperationEngineStartsWith2 = (
    dataOperationEngineStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationEngineToLowerCase(dataOperationEngineStarts).startsWith(
      `__charts`,
    ));
  (dataOperationEnginePattern3 = /^[A-Za-z0-9_-]{1,128}$/);
  RegExp(`^\\$lid:` + dataOperationEnginePattern3.source.slice(1, -1) + `$`);
  (DataOperationEngineStyles2 = `$lid:`);
  (dataOperationEnginePattern4 = /^[A-Za-z0-9_-]{1,128}$/);
  (DataOperationEngineCode = lazyZod
    .string()
    .superRefine(
      (
        dataOperationEngineCode?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let dataOperationEngineMsg: Dynamic = resolveDataOperationEngineMsg(
          dataOperationEngineCode,
        );
        if (!dataOperationEngineMsg.ok) {
          options.addIssue({
            code: `custom`,
            message: dataOperationEngineMsg.msg,
          });
        }
      },
    ));
  (dataOperationEnginePattern5 = /^[A-Za-z_][A-Za-z0-9_]{0,127}$/);
  (DataOperationEngineMessage3 = lazyZod
    .string()
    .regex(
      dataOperationEnginePattern5,
      `a source key is a SQL identifier — letters, digits, underscore, not starting with a digit, at most 128 characters ([A-Za-z_][A-Za-z0-9_]{0,127}), e.g. "rev" or "q3_sales"`,
    )
    .refine(
      (dataOperationEngineMessage3?: Dynamic, ..._extraArguments: unknown[]) =>
        !resolveDataOperationEngineStartsWith2(dataOperationEngineMessage3),
      {
        message: `source names starting with "__charts" (any casing) are reserved — the chart engine's internal namespace; its catalog folds case, so __Charts or __charts_rowid would collide with engine internals; pick another name`,
      },
    ));
  (DataOperationEngineMessage4 = DataOperationEngineMessage3.refine(
    (dataOperationEngineMessage4?: Dynamic, ..._extraArguments: unknown[]) =>
      dataOperationEngineMessage4 !== `constructor` &&
      dataOperationEngineMessage4 !== `prototype`,
    {
      message: `source names "constructor" and "prototype" are refused — they name the prototype machinery, and the widget runtime's belt refuses them at render (a gate that accepted them would publish a widget the serve road cards — the darkening class); pick another name`,
    },
  ));
  (DataOperationEngineCode2 = lazyZod
    .unknown()
    .superRefine(
      (
        dataOperationEngineCode2?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          typeof dataOperationEngineCode2 == `object` &&
          dataOperationEngineCode2 &&
          !Array.isArray(dataOperationEngineCode2) &&
          Object.getOwnPropertyNames(dataOperationEngineCode2).includes(
            `__proto__`,
          )
        ) {
          options.addIssue({
            code: `custom`,
            message: `"__proto__" cannot be a source key — it would validate and then silently vanish from the parsed map; pick an ordinary SQL-identifier name`,
          });
        }
      },
    ));
  (DataOperationEngineError = lazyZod.union(
    [
      lazyZod.string(),
      lazyZod.number().finite(),
      lazyZod.boolean(),
      lazyZod.null(),
    ],
    {
      error: (..._extraArguments: unknown[]) =>
        `an inline row's cell must be a JSON scalar — a string, finite number, boolean, or null; nested objects and arrays don't survive datum-pin identity (pins match cells by value)`,
    },
  ));
  (DataOperationEnginePipe = DataOperationEngineCode2.pipe(
    lazyZod.record(lazyZod.string().min(1).max(256), DataOperationEngineError),
  ));
  (DataOperationEngineKind = lazyZod.discriminatedUnion(
    `kind`,
    [
      lazyZod.strictObject(
        {
          kind: lazyZod.literal(`ref`),
          ref: DataOperationEngineCode,
          adapter: dataContentAndReferencesKindSchema.optional(),
        },
        {
          error: (error?: Dynamic, ..._extraArguments: unknown[]) =>
            error.code === `unrecognized_keys`
              ? `a {kind:"ref"} entry is exactly {kind:"ref", ref: "<noun>/<id>", adapter?} — unrecognized ${error.keys.length === 1 ? `key` : `keys`} ${error.keys.map((key?: Dynamic, ..._extraArguments: unknown[]) => JSON.stringify(key)).join(`, `)} (inline rows belong on the {kind:"data"} arm)`
              : undefined,
        },
      ),
      lazyZod.strictObject(
        {
          kind: lazyZod.literal(`data`),
          data: lazyZod.array(DataOperationEnginePipe),
        },
        {
          error: (error?: Dynamic, ..._extraArguments: unknown[]) =>
            error.code === `unrecognized_keys`
              ? `a {kind:"data"} entry is exactly {kind:"data", data: [rows]} — unrecognized ${error.keys.length === 1 ? `key` : `keys`} ${error.keys.map((key?: Dynamic, ..._extraArguments: unknown[]) => JSON.stringify(key)).join(`, `)} (a table/run/routine read belongs on the {kind:"ref"} arm)`
              : undefined,
        },
      ),
    ],
    {
      error: (error?: Dynamic, ..._extraArguments: unknown[]) =>
        error.code === `invalid_union`
          ? `a sources entry needs a kind — a bare {ref} is the pre-union spelling: respell it {kind:"ref", ref: "…"} (one edit); entries are {kind:"ref", ref:"<noun>/<id>"} (a governed read) or {kind:"data", data:[{…}]} (inline scaffolding rows, to be replaced with a ref)`
          : undefined,
    },
  ));
  (resolveDataOperationEngineAdapter = (
    dataOperationEngineAdapter?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof dataOperationEngineAdapter != `object` ||
      !dataOperationEngineAdapter ||
      Array.isArray(dataOperationEngineAdapter)
    )
      return dataOperationEngineAdapter;
    let dataOperationEngineAdapter2: Dynamic = dataOperationEngineAdapter;
    if (dataOperationEngineAdapter2.kind === `ref`) {
      let adapter: Dynamic = dataOperationEngineAdapter2.adapter;
      return typeof adapter == `object` &&
        adapter &&
        !Array.isArray(adapter) &&
        adapter.kind === `csv` &&
        !(`hasHeader` in adapter)
        ? {
            ...dataOperationEngineAdapter2,
            adapter: {
              ...adapter,
              hasHeader: true,
            },
          }
        : dataOperationEngineAdapter;
    }
    let ownPropertyNames: Dynamic = Object.getOwnPropertyNames(
      dataOperationEngineAdapter,
    );
    if (ownPropertyNames.length !== 1 || ownPropertyNames[0] !== `ref`)
      return dataOperationEngineAdapter;
    let ref: Dynamic = dataOperationEngineAdapter.ref;
    return typeof ref == `string`
      ? {
          kind: `ref`,
          ref: ref,
        }
      : dataOperationEngineAdapter;
  });
  (DataOperationEngineState9 = DataOperationEngineKind);
  (DataOperationEnginePreprocess = lazyZod.preprocess(
    resolveDataOperationEngineAdapter,
    DataOperationEngineKind,
  ));
  (resolveDataOperationEngineError = (
    dataOperationEngineError?: Dynamic,
    options: Dynamic = DataOperationEngineMessage3,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    lazyZod.record(options, dataOperationEngineError, {
      error: (error?: Dynamic, ..._extraArguments: unknown[]) =>
        error.code === `invalid_key`
          ? `source key ${JSON.stringify(String(error.path?.at(-1) ?? ``))}: ${error.issues?.[0]?.message ?? `not a legal key`}`
          : undefined,
    }));
  (updateDataOperationEngineCode = (
    updateDataOperationEngineCode2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let updateDataOperationEngineCodeResult of Object.keys(
      updateDataOperationEngineCode2,
    ) as Dynamic) {
      let dataOperationEngineToLowerCase: Dynamic =
        resolveDataOperationEngineToLowerCase(
          updateDataOperationEngineCodeResult,
        );
      let lookupEntry: Dynamic = lookup.get(dataOperationEngineToLowerCase);
      if (lookupEntry) {
        lookupEntry.push(updateDataOperationEngineCodeResult);
      } else {
        lookup.set(dataOperationEngineToLowerCase, [
          updateDataOperationEngineCodeResult,
        ]);
      }
    }
    for (let items of lookup.values() as Dynamic)
      if (items.length > 1) {
        options.addIssue({
          code: `custom`,
          message: `source names must be unique ignoring case — the chart engine's catalog treats ${items.map((rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) => JSON.stringify(rolldownNImport2)).join(` and `)} as the SAME relation, and the later one would silently overwrite the earlier one's data; rename all but one`,
        });
      }
  });
  DataOperationEngineCode2.pipe(
    resolveDataOperationEngineError(DataOperationEnginePreprocess),
  ).superRefine(updateDataOperationEngineCode);
  DataOperationEngineCode2.pipe(
    resolveDataOperationEngineError(
      DataOperationEngineState9,
      DataOperationEngineMessage4,
    ).superRefine(
      (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (let [localResult, localResult2] of Object.entries(
          callback,
        ) as Dynamic) {
          let localResult3: Dynamic = localResult2;
          if (
            !(localResult3?.kind !== `data` || !Array.isArray(localResult3.data))
          ) {
            for (let [
              localResult4,
              localResult5,
            ] of localResult3.data.entries() as Dynamic)
              if (typeof localResult5 == `object` && localResult5)
                for (let localResult6 of Object.keys(localResult5) as Dynamic)
                  if (
                    localResult6 === `constructor` ||
                    localResult6 === `prototype`
                  ) {
                    options.addIssue({
                      code: `custom`,
                      path: [localResult, `data`, localResult4, localResult6],
                      message: `"${localResult6}" cannot be a column name — it names the prototype machinery, and the widget runtime refuses it; pick an ordinary column name`,
                    });
                  }
          }
        }
      },
    ),
  ).superRefine(updateDataOperationEngineCode);
  (dataOperationEnginePattern6 = /^(0|[1-9][0-9]*)$/);
  (resolveDataOperationEngineReplaceAll = (
    dataOperationEngineReplaceAll?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineReplaceAll.replaceAll(`~`, `~0`).replaceAll(`/`, `~1`));
  (resolveDataOperationEngineMessage2 = (
    dataOperationEngineMessage2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineMessage2.refine(isDataOperationEngineCharCodeAt2, {
      message: `text-encoding: \\u0000 and unpaired surrogates cannot be stored`,
    }));
  (dataOperationEngineDelSchema = lazyZod
    .strictObject({
      at: lazyZod
        .number()
        .int()
        .nonnegative()
        .describe(
          "UTF-16 code-unit offset into the BASE text — the text whose textHash equals the op's `base` — NEVER into the text after earlier splices in the same op. All of one op's splices are computed from one snapshot (what a diff produces); the engine applies them in one pass.",
        ),
      del: resolveDataOperationEngineMessage2(lazyZod.string()).describe(
        "The text REMOVED at `at` — the deleted text ITSELF, not a count. The base text at [at, at+del.length) must equal it exactly or the whole op refuses: a per-splice CAS under the op-level base hash, and what makes every ledger row legible standalone ('replaced X with Y') and invertible (undo = {at, del: ins, ins: del}). Empty string = pure insert.",
      ),
      ins: resolveDataOperationEngineMessage2(lazyZod.string()).describe(
        "The text inserted at `at`, replacing `del`. Empty string = pure delete.",
      ),
    })
    .describe(
      "One text splice in BASE coordinates. COORDINATE UNIT PINNED (island law, Jul 6): offsets and lengths are UTF-16 CODE UNITS — JavaScript string indices, exactly what String.prototype.slice and CodeMirror changesets speak — never code points, never grapheme clusters, never bytes. The unit is baked into every persisted op; changing it would re-address history. An update op carries an ORDERED array: ascending, non-overlapping — each splice's `at` must be ≥ the previous splice's `at` + `del.length` (co-located pure inserts are legal and land in array order). Applied atomically: any out-of-order, overlapping, out-of-bounds, or del-mismatched splice refuses the WHOLE op — all or none.",
    ));
  (dataOperationEngineEngineSchema23 = lazyZod
    .strictObject({
      engine: lazyZod.literal(`text`).default(`text`),
      birthName: dataOperationEngineMessageSchema.describe(
        `The born file's immutable name, extension included — REQUIRED (a file without a name is not a file), and it must ROUTE text (routeForName's else arm): an ldoc or office name refuses text-route, because a cross-route birth would bind the wrong engine for life (the door's birth-engine binding).`,
      ),
      content: dataOperationEngineKindSchema2
        .default({
          kind: `text`,
          text: ``,
        })
        .describe(
          `The initial content — inline {kind:'text'} under the spill threshold, {kind:'blob'} above (the spill is HOST machinery and happens before commit; the cell admits both arms so committed history never re-gates on a moved threshold). Absent births an empty document.`,
        ),
    })
    .superRefine(
      (
        node?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (node.content.kind === `text`) {
          if (node.content.text.length > 2e6) {
            options.addIssue({
              code: `custom`,
              message: `text-oversize`,
              path: [`content`, `text`],
            });
          }
          if (!isDataOperationEngineCharCodeAt2(node.content.text)) {
            options.addIssue({
              code: `custom`,
              message: `text-encoding`,
              path: [`content`, `text`],
            });
          }
        }
      },
    )
    .describe(
      `Birth of a text-family FILE: birthName + initial content, NOTHING else — no placement name (placement maps), no lock (the lock law's own arm). The strict posture is the file noun's (objects/file.ts): an unknown key refuses, never silently strips.`,
    ));
  (dataOperationEngineEngineSchema24 = lazyZod
    .strictObject({
      engine: lazyZod.literal(`text`).default(`text`),
      base: lazyZod
        .string()
        .length(12)
        .describe(
          "textHash of the text the splices were computed against — the text CAS. Mismatch with the live text → the whole op refuses text-stale: agents re-read and recompute; editors rebase their splices over the winner's. The per-splice `del` strings are a SECOND CAS layer under this hash.",
        ),
      splices: lazyZod
        .array(dataOperationEngineDelSchema)
        .min(1)
        .describe(
          `Ordered splices in BASE coordinates (see zTextSplice) — applied atomically, all or none.`,
        ),
    })
    .describe(
      "The ONE update spelling: splices + base (insert/delete string deltas — the ruled minimal vocabulary). STRICT today; designed to GROW BY OPTIONAL KEYS (the `path` FYI in the file header): absent-key semantics are pinned forever, so every persisted row replays identically as arms are added.",
    ));
  (DataOperationEngineValue2 = {
    ...resolveDataOperationEngineCreate(`text`),
    value: dataOperationEngineMimeSchema,
    create: dataOperationEngineEngineSchema23,
    update: dataOperationEngineEngineSchema24,
    cursor: dataOperationEngineLineSchema,
    apply: resolveDataOperationEngineValue6(
      (..._extraArguments: unknown[]): Dynamic => [
        DataOperationEngineVerbs6,
        DataOperationEngineCreate7,
      ],
    ),
  });
  (DataOperationEngineVerbs6 = {
    name: `text`,
    verbs: {
      create: {
        file: {
          objectTypes: [`file`],
          payload: dataOperationEngineEngineSchema23,
          description: `Birth a text-family FILE (routeForName's else arm). birthName is REQUIRED, immutable, and MUST route text: an ldoc or office name refuses text-route — an APPLY law, not cell shape (the cell parse ADMITS 'Doc.ldoc'; textBirth refuses it — a manifest reader must not read the compiled schema as the whole law). Cross-route birth would bind the wrong engine for life (the door's birth-engine binding). content defaults to {kind:'text', text:''}; the blob arm admits pre-spilled content (host machinery spills BEFORE commit). FOLD-INVARIANT: apply re-judges routeForName at fold, so moving an extension between routes after text rows exist is a RULED MIGRATION.`,
        },
      },
      update: {
        splice: {
          objectTypes: [`file`],
          payload: dataOperationEngineEngineSchema24,
          description:
            "Splice the file's inline text — the ONE update spelling. Update-as-event under a DOUBLE CAS: `base` is the 12-hex textHash of the text the splices were computed against (mismatch refuses text-stale, whole op); each splice's `del` is the deleted text ITSELF — a second per-splice CAS that makes every row legible standalone ('replaced X with Y') and invertible (undo = {at, del: ins, ins: del}). Offsets are UTF-16 CODE UNITS in BASE coordinates, ascending, non-overlapping, applied atomically — all or none. Spilled content refuses splices (text-spilled); a candidate past TEXT_MAX_CHARS refuses text-oversize; an unstorable candidate refuses text-encoding (jsonb: no NUL, no unpaired surrogates). GROWTH LAW: strict today, grows by OPTIONAL KEYS only (the `path` FYI) — absent-key semantics are pinned forever. RETIREMENT PROPOSED (D9) — stamped: stays for now.",
        },
      },
      read: {
        value: {
          objectTypes: [`file`],
          payload: dataOperationEngineMimeSchema,
          description: `The text-born file's committed value — zFileValue, THE SHARED FILE SHAPE (same live object the json lane fold-registers for the file noun; the two birth-capable engines agree byte-for-byte on what a file row holds). {birthName (immutable, extension = type authority), content? ({kind:'text'} inline | {kind:'blob'} spilled | {kind:'node'} — the node arm is the json/ldoc lane's, never text-born), locked?, styleSheet?}. Also the shape of a file checkpoint row's value. Refine-borne laws elided from the compiled schema: the Q14 fence (office-named file with inline text refuses) and the #3975 preprocess shim (legacy {mime} rows re-parse as {birthName} — a permanent read-side upcaster).`,
        },
      },
    },
    grammars: {
      fileValue: {
        group: `Values`,
        schema: dataOperationEngineMimeSchema,
        description: `The shared file-row value shape (objects/file.ts) — SAME live object as text.read.value's schema and the json grammar's file member; the #3813 two-engine seam, registered by reference.`,
      },
      textSplice: {
        group: `Text`,
        schema: dataOperationEngineDelSchema,
        description: `One text splice in BASE coordinates (UTF-16 code units, pinned) — the update.splice arm's element vocabulary.`,
      },
    },
  });
  (DataOperationEngineCreate7 = {
    create: {
      file: {
        admit: (
          dataOperationEngineCreate7?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationEngineCreate7 === undefined
            ? {}
            : {
                deny: `text-exists`,
              },
        apply: (
          dataOperationEngineCreate7?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineBirthName(dataOperationEngineCreate7),
        }),
      },
    },
    update: {
      splice: {
        admit: resolveDataOperationEngineValue8,
        apply: (
          dataOperationEngineCreate7?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineKind(
            dataOperationEngineCreate7,
            options,
          ),
        }),
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate7?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate7,
      },
    },
  });
  (DataOperationEngineState10 = 1024 * 1024);
  (dataOperationEngineValue2048 = 2048);
  (dataOperationEnginePattern7 = /^[A-Za-z0-9_-]{1,128}$/);
  (dataOperationEngineValue10243 = 1024);
  (resolveDataOperationEngineMessage3 = (
    dataOperationEngineMessage3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineMessage3.refine(isDataOperationEngineCharCodeAt2, {
      message: `text-encoding: \\u0000 and unpaired surrogates cannot be stored`,
    }));
  (DataOperationEngineState11 = resolveDataOperationEngineMessage3(
    lazyZod
      .string()
      .max(
        DataOperationEngineState10,
        `widget code is capped at ${DataOperationEngineState10} units — if inline {kind:"data"} rows are the bulk of it, move them to a table and swap the arm to {kind:"ref", ref:"table/…"} (inline tables count against this cap)`,
      ),
  ));
  (DataOperationEngineRegex3 = lazyZod
    .string()
    .regex(dataOperationEnginePattern7));
  (DataOperationEngineState12 = resolveDataOperationEngineMessage3(
    lazyZod.string().max(dataOperationEngineValue2048),
  ));
  (DataOperationEngineRegex4 = lazyZod
    .string()
    .regex(/^[A-Za-z0-9_-]{1,128}$/));
  (DataOperationEngineState13 = resolveDataOperationEngineMessage3(
    lazyZod.string().max(500),
  ));
  (DataOperationEngineExact = lazyZod.strictObject({
    exact: resolveDataOperationEngineMessage3(
      lazyZod
        .string()
        .min(1, `quote.exact must be non-empty — quote the exact text to replace`)
        .max(DataOperationEngineState10),
    ),
    prefix: resolveDataOperationEngineMessage3(
      lazyZod.string().max(dataOperationEngineValue10243, {
        message: `prefix is a disambiguation pin — at most ${dataOperationEngineValue10243} units; put the content in exact`,
      }),
    ).optional(),
    suffix: resolveDataOperationEngineMessage3(
      lazyZod.string().max(dataOperationEngineValue10243, {
        message: `suffix is a disambiguation pin — at most ${dataOperationEngineValue10243} units; put the content in exact`,
      }),
    ).optional(),
  }));
  (DataOperationEngineQuote = lazyZod.strictObject({
    quote: DataOperationEngineExact,
    replacement: DataOperationEngineState11,
  }));
  (DataOperationEngineCode3 = lazyZod.strictObject({
    code: DataOperationEngineState11,
    basePub: lazyZod.number().int().nonnegative(),
  }));
  (DataOperationEngineStyles3 = `The node-birth edge {object:'file', id} — the tab's file this widget is a member of. A birth fact: required on create (door law), carried unchanged by every update, never re-pointed.`);
  (DataOperationEngineCode4 = lazyZod.strictObject({
    code: DataOperationEngineState11,
    pub: lazyZod.number().int().nonnegative(),
    draft: DataOperationEngineCode3.optional(),
    parent: dataContentAndReferencesDescribeSchema5
      .optional()
      .describe(DataOperationEngineStyles3),
  }));
  (DataOperationEngineEngine = {
    engine: lazyZod.literal(`widget`).default(`widget`),
  });
  (dataOperationEngineValue10244 = 1024);
  (dataOperationEngineParentSchema5 = lazyZod
    .strictObject({
      ...DataOperationEngineEngine,
      parent: dataContentAndReferencesDescribeSchema5
        .optional()
        .describe(DataOperationEngineStyles3),
      code: DataOperationEngineState11.optional(),
      state: lazyZod
        .enum([`publish`, `draft`])
        .default(`publish`)
        .describe(
          `"publish" (default — omit for the common case): validate inline; valid code publishes at birth, invalid code stages with the diagnostic. "draft": skip validate, stage as-is.`,
        ),
      lidSubstitutions: lazyZod
        .record(
          lazyZod
            .string()
            .regex(
              /^src$/,
              `a substitution path is "src" (the claude.Embed src prop; the Visualize arm follows the vocabulary change)`,
            ),
          lazyZod
            .string()
            .regex(
              /^\$lid:[A-Za-z0-9_-]{1,128}$/,
              `a substitution value is the exact "$lid:<alias>" token`,
            ),
        )
        .optional(),
      landed: lazyZod.enum([`live`, `draft`]).optional(),
      materialized: DataOperationEngineState11.optional(),
      diagnostic: resolveDataOperationEngineMessage3(
        lazyZod.string().max(dataOperationEngineValue10244),
      ).optional(),
    })
    .describe(
      "Births { code: '', pub: 0 } when `code` is absent or empty (v1 law: creation mints an empty node). Non-empty code with state 'publish' (the default) is judged ONCE at accept: valid code publishes at birth ({ code, pub: 1 }); invalid code soft-lands to the draft with the node still created (outcome 'staged-with-errors'; the teaching message is recorded on the row) — never a deny. state 'draft' stages the code without validating (outcome 'staged'). After birth, all non-empty code moves through the draft road: there is no direct-write arm.",
    ));
  (DataOperationEngineStrictObject2 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
  }));
  (dataOperationEnginePathSchema4 = lazyZod.strictObject({
    path: lazyZod.string().min(1).max(256),
    op: lazyZod.enum([`set`, `remove`]),
    value: lazyZod
      .json()
      .optional()
      .describe(
        `The value a set carries — ANY JSON; absent on remove (set-requires-presence and remove-forbids-value are the parser's refusals, lib/lfile/widgetSpecPatch.ts). Semantics are judged by the post-patch re-validate of the WHOLE spliced spec, never here.`,
      ),
  }));
  (dataOperationEngineValue32 = 32);
  (dataOperationEngineKindSchema15 = lazyZod
    .strictObject({
      ...DataOperationEngineEngine,
      kind: lazyZod.literal(`draft`),
      code: DataOperationEngineState11,
      basePub: lazyZod.number().int().nonnegative(),
      lidSubstitutions: lazyZod
        .record(
          lazyZod
            .string()
            .regex(
              /^src$/,
              `a substitution path is "src" (the claude.Embed src prop; the Visualize arm follows the vocabulary change)`,
            ),
          lazyZod
            .string()
            .regex(
              /^\$lid:[A-Za-z0-9_-]{1,128}$/,
              `a substitution value is the exact "$lid:<alias>" token`,
            ),
        )
        .optional(),
      state: lazyZod
        .enum([`publish`, `draft`])
        .default(`publish`)
        .describe(
          `"publish" (default — omit for the common case): validate inline; valid code publishes in this call, invalid code stages with the diagnostic. "draft": skip validate, stage as-is.`,
        ),
      materialized: DataOperationEngineState11.optional(),
      landed: lazyZod.enum([`live`, `draft`]).optional(),
      diagnostic: resolveDataOperationEngineMessage3(
        lazyZod.string().max(dataOperationEngineValue10244),
      ).optional(),
      confirmOrphans: lazyZod.number().int().nonnegative().optional(),
      confirmSourceOrphans: lazyZod.number().int().nonnegative().optional(),
    })
    .describe(
      `Stage the draft — and, under the default state 'publish', validate and publish it in the SAME call (valid → pub advances, outcome 'published'; invalid → staged with the diagnostic, outcome 'staged-with-errors'). Send state 'draft' to stage without validating (v1 law: drafts may be broken mid-edit). basePub names the publish generation the draft was computed against; a stale one refuses (the prose coarse lane's rule: every write names the exact state it read, or is denied).`,
    ));
  (DataOperationEngineKind2 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`publish`),
    confirmOrphans: lazyZod.number().int().nonnegative().optional(),
    confirmSourceOrphans: lazyZod.number().int().nonnegative().optional(),
  }));
  (DataOperationEngineKind3 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`revert`),
  }));
  (DataOperationEngineKind4 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`text`),
    id: DataOperationEngineRegex3,
    value: DataOperationEngineState12,
    spliced: DataOperationEngineState11.optional(),
    splicedDraft: DataOperationEngineState11.optional(),
  }));
  (DataOperationEngineKind5 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`chart-title`),
    chartId: DataOperationEngineRegex4,
    value: DataOperationEngineState13,
    spliced: DataOperationEngineState11.optional(),
    splicedDraft: DataOperationEngineState11.optional(),
  }));
  (DataOperationEngineKind6 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`text-draft`),
    id: DataOperationEngineRegex3,
    value: DataOperationEngineState12,
    spliced: DataOperationEngineState11.optional(),
  }));
  (DataOperationEngineKind7 = lazyZod.strictObject({
    ...DataOperationEngineEngine,
    kind: lazyZod.literal(`chart-title-draft`),
    chartId: DataOperationEngineRegex4,
    value: DataOperationEngineState13,
    spliced: DataOperationEngineState11.optional(),
  }));
  (dataOperationEngineKindSchema16 = lazyZod
    .strictObject({
      ...DataOperationEngineEngine,
      kind: lazyZod.literal(`draft-edit`),
      edits: lazyZod.array(DataOperationEngineQuote).min(1).max(64),
      edited: DataOperationEngineState11.optional(),
    })
    .describe(
      `Quote/replace edits against the CURRENT draft (v1's proven grammar, ported): each edit's quote must match exactly once — prefix/suffix pin an ambiguous quote — and edits apply SEQUENTIALLY on a working copy, ATOMICALLY: the first failure refuses the whole op and nothing is written. AUTO-FORK (v1 law): no draft → the draft forks from the published source first. The validator is NOT consulted — drafts may be broken mid-edit (the draft arm's own law); the hard gate stays at publish. Deliberately NO content CAS on this arm: quote-not-found is the staleness signal.`,
    ));
  (dataOperationEngineKindSchema17 = lazyZod
    .strictObject({
      ...DataOperationEngineEngine,
      kind: lazyZod.literal(`spec-patch`),
      patches: lazyZod
        .array(dataOperationEnginePathSchema4)
        .min(1)
        .max(dataOperationEngineValue32),
      confirmSourceOrphans: lazyZod.number().int().nonnegative().optional(),
      spliced: DataOperationEngineState11.optional(),
      splicedDraft: DataOperationEngineState11.optional(),
    })
    .describe(
      `ONE atomic patch verb across definition AND sources (patch paths rooted at either — the realistic port swaps a source arm AND fixes the definition's field references together; two verbs would leave a validate-rejected intermediate state). Applies to the PUBLISHED spec and re-validates the whole result (validate-or-reject, no partial landing). Nothing in sources is display-only, so sources patches never ride the serve-posture lane; definition patches keep the per-field tier.`,
    ));
  (resolveDataOperationEnginePreprocess = (
    dataOperationEnginePreprocess?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    lazyZod.preprocess(
      resolveDataOperationEngineAction,
      dataOperationEnginePreprocess,
    ));
  (DataOperationEngineKind8 = lazyZod.discriminatedUnion(`kind`, [
    dataOperationEngineKindSchema15,
    DataOperationEngineKind2,
    DataOperationEngineKind3,
    DataOperationEngineKind4,
    DataOperationEngineKind5,
    DataOperationEngineKind6,
    DataOperationEngineKind7,
    dataOperationEngineKindSchema16,
    dataOperationEngineKindSchema17,
  ]));
  (DataOperationEnginePreprocess2 = lazyZod.preprocess(
    resolveDataOperationEngineAction,
    DataOperationEngineKind8,
  ));
  new (Set as Dynamic)(
    DataOperationEngineKind8.options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        option.shape.kind.value,
    ),
  );
  (DataOperationEngineState14 = lazyZod.object({}));
  (dataOperationEngineDescribeSchema32 = lazyZod
    .array(lazyZod.string().min(1).max(256))
    .min(1)
    .max(16)
    .describe(
      `Tokens into the cited source's resolved value — stored as an array, never a joined string.`,
    ));
  (dataOperationEngineDatabaseSchema2 = lazyZod
    .enum([`run`, `database`, `blob`, `routine`, `file`, `node`])
    .describe(
      `The nouns a pin can name. NODE (a data source is a data source: no judgment based on whether its data is inline): a widget's OWN inline rows — a sources entry written as {kind:'data'} into its code — cite as node/<the widget node itself>: source {name, object:'node', id:<node>} resolved {object:'node', id:<the same node>, path?}, the frozen-noun POSITIONAL mode (path; never pk/column), the door requiring both ids to equal the comment's own parent node (a pin may not claim another widget's rows). Known gap, deliberately out of this rung: the rows live in the node's code, which a later publish may rewrite — the pin's datum key (resolved by value first) is what keeps it on its datum; pub is neither stamped nor checked on the Rust door today, and materializing inline rows at publish as a frozen object is the drift-proof future option. A SOURCE may name any of them; a RESOLUTION never says routine OR file — both are SOURCE-ONLY, because resolving each produces a DIFFERENT frozen noun (a routine resolves to a run; a file resolves to the blob its content pointer named). FILE IS CITABLE ONLY ON ITS SPILLED LANE (xlsx as a source, tracked back to the file). A file's content is a discriminated union (src/room/objects/file.ts): kind:'blob' SPILLED content is a frozen, content-addressed blob, so file/<id> resolves to that blob honestly — the same source→frozen-materialization shape as routine→run. The other two lanes stay UNSPELLABLE, deliberately, because no honest resolution exists yet: kind:'text' INLINE bytes live on the mutable file value and would need the ledger seq they were read at (no read lane reports it, and zPinResolved retired the version member in favour of frozen positional/identity addresses); kind:'node' OFFICE/LDOC content (an xlsx is node-rooted) is a LIVE child node with no frozen materialization to point at. A file whose content is inline or node has no blob to resolve to, so the pin cannot be minted — the gap is unspellable, not silent. (An xlsx is citable a different way: upload its bytes as a blob and cite blob/<id> with an xlsx decode — see the xlsx lens; that road resolves to a frozen blob, this file-source road does not touch the live node.)`,
    ));
  (dataOperationEngineDescribeSchema33 = lazyZod
    .string()
    .regex(
      /^[A-Za-z0-9_-]{1,128}$/,
      `an id speaks the ref id charset — [A-Za-z0-9_-], at most 128 chars`,
    )
    .describe(`The named object's minted id.`));
  (dataOperationEngineDescribeSchema34 = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .min(1)
        .max(128)
        .describe(
          `The sources-map key — the widget's own vocabulary for this input.`,
        ),
      object: dataOperationEngineDatabaseSchema2,
      id: dataOperationEngineDescribeSchema33,
    })
    .describe(`What the author NAMED in sources — the question the pin asked.`));
  (dataOperationEngineAdapterSchema = lazyZod
    .strictObject({
      object: dataOperationEngineDatabaseSchema2.exclude([`routine`, `file`]),
      id: dataOperationEngineDescribeSchema33,
      adapter: dataContentAndReferencesKindSchema
        .optional()
        .describe(
          "The LENS that turned the resolved bytes into rows — required to make a citation reproducible when the object is not already rows. A blob is the plain case: cite `blob/<id>` with an address and, without this, a reader holds BYTES and cannot tell which row 2 is; the rows only exist once the csv lens has run (otherwise it is a blob with no known interpretation). Absent when the resolution is already rows (a run's result, a database's fold). STORED rather than re-derived from the widget's code at `pub`, for the reason `value` is stored: a pin must resolve without depending on the widget still existing, or still declaring that source the same way.",
        ),
      path: dataOperationEngineDescribeSchema32
        .optional()
        .describe(
          `POSITIONAL address — [rowIndex, column] — for the FROZEN nouns (run, blob) and a widget's own inline rows (node). Honest there precisely because the thing cannot move: row 2 of a sealed run, or of a content-addressed blob, is row 2 forever; a node's inline rows can be rewritten by a later publish, which is why the pin's datum key beside the path is what re-finds the datum (see zPinObject's node note).`,
        ),
      pk: dataOperationEngineSourceSchema3
        .optional()
        .describe(
          "IDENTITY address, database only — the row's own pk, echoed verbatim from the read. A database's rows are a FOLD over its ledger, so a position is not an identity: insert a row from another source and index 2 is a different row, which would silently re-point every pin above it. The pk cannot move — it is (blob/<id>, i) for a by-source insert (a blob is content-addressed, so that pair names the same CSV line forever) or (op/<seq>, i) for a by-rows one (a ledger seq). The database stores pk, column and value, and the pk never changes. This is what retired the `version` member: a stable identity needs no as-of.",
        ),
      column: lazyZod
        .string()
        .min(1)
        .max(256)
        .optional()
        .describe(
          "The column, beside `pk`. OPTIONAL: a `pk` alone pins the ROW, which is a legal grain of its own (just the current row, and optionally the column); adding the column narrows it to one cell.",
        ),
    })
    .superRefine(
      (
        dataOperationEngineAdapterSchema2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let matchesObject =
          dataOperationEngineAdapterSchema2.object === `database`;
        if (
          matchesObject &&
          dataOperationEngineAdapterSchema2.path !== undefined
        ) {
          options.addIssue({
            code: `custom`,
            path: [`path`],
            message:
              "a database row has no stable POSITION — its rows are a fold over the ledger, so address it by `pk` + `column`, never by row index",
          });
        }
        if (
          !matchesObject &&
          (dataOperationEngineAdapterSchema2.pk !== undefined ||
            dataOperationEngineAdapterSchema2.column !== undefined)
        ) {
          options.addIssue({
            code: `custom`,
            path: [`pk`],
            message:
              "`pk`/`column` are the DATABASE address — a run or blob is frozen, so its rows are addressed positionally by `path`",
          });
        }
        if (
          dataOperationEngineAdapterSchema2.column !== undefined &&
          dataOperationEngineAdapterSchema2.pk === undefined
        ) {
          options.addIssue({
            code: `custom`,
            path: [`pk`],
            message: "a `column` needs the `pk` of the row it sits in",
          });
        }
      },
    )
    .describe(
      `What the source RESOLVED to, and where inside it — the answer's address.`,
    ));
  (dataOperationEngineDescribeSchema35 = lazyZod
    .union([
      lazyZod.string().max(512),
      lazyZod.number(),
      lazyZod.boolean(),
      lazyZod.null(),
    ])
    .describe(
      `What was at that address when the pin was made — orphan-readout testimony, never an address.`,
    ));
  (dataOperationEngineMessageSchema6 = lazyZod
    .record(
      lazyZod
        .string()
        .min(1)
        .max(256)
        .refine(
          (
            dataOperationEngineMessageSchema62?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            ![`__proto__`, `constructor`, `prototype`].includes(
              dataOperationEngineMessageSchema62,
            ),
          {
            message: `a datum key column must not be a prototype-shaped name`,
          },
        ),
      dataOperationEngineDescribeSchema35,
    )
    .refine(
      (
        dataOperationEngineMessageSchema62?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        Object.keys(dataOperationEngineMessageSchema62).length >= 1 &&
        Object.keys(dataOperationEngineMessageSchema62).length <= 8,
      {
        message: `a datum key names 1..8 columns — the mark's x and, when split, its color`,
      },
    )
    .describe(
      `The pinned datum's VALUE-BASED identity — the mark's defining channel values in the data frame (column → scalar: its x value and, when the mark splits by a color column, that value). Re-resolution key beside the cell address, never instead of it.`,
    ));
  (dataOperationEngineDescribeSchema36 = lazyZod
    .number()
    .int()
    .nonnegative()
    .describe(
      `The widget node's publish generation at pin time — room-stamped, never client-sent.`,
    ));
  (DataOperationEngineKind9 = lazyZod.strictObject({
    kind: lazyZod.literal(`anchor`),
    anchor: lazyZod.string().regex(dataOperationEnginePattern7),
  }));
  (DataOperationEnginePath6 = lazyZod.strictObject({
    path: lazyZod
      .array(
        lazyZod
          .string()
          .min(1)
          .max(256)
          .refine(
            (dataOperationEnginePath6?: Dynamic, ..._extraArguments: unknown[]) =>
              !dataOperationEnginePath6.includes(`.`),
            `a token holds no dot`,
          )
          .refine(
            (dataOperationEnginePath6?: Dynamic, ..._extraArguments: unknown[]) =>
              dataOperationEnginePath6 !== `__proto__` &&
              dataOperationEnginePath6 !== `constructor` &&
              dataOperationEnginePath6 !== `prototype`,
            `a token is no prototype-shaped name`,
          ),
      )
      .min(1)
      .max(16),
    quote: lazyZod.strictObject({
      prefix: lazyZod.string().max(64),
      exact: lazyZod.string().min(1).max(2e3),
      suffix: lazyZod.string().max(64),
    }),
    range: lazyZod
      .tuple([
        lazyZod.number().int().min(0),
        lazyZod
          .number()
          .int()
          .max(16 * 1024),
      ])
      .refine(
        (
          [dataOperationEnginePath6, dataOperationEnginePath62]: Dynamic,
          ..._extraArguments: unknown[]
        ) => dataOperationEnginePath6 < dataOperationEnginePath62,
        `a range runs forward`,
      )
      .optional(),
  }));
  (DataOperationEngineKind10 = lazyZod.strictObject({
    kind: lazyZod.literal(`component`),
    component: lazyZod.string().regex(dataOperationEnginePattern7),
    source: dataOperationEngineDescribeSchema34.optional(),
    resolved: dataOperationEngineAdapterSchema.optional(),
    value: dataOperationEngineDescribeSchema35.optional(),
    datum: dataOperationEngineMessageSchema6.optional(),
    pub: dataOperationEngineDescribeSchema36.optional(),
    origin: DataOperationEnginePath6.optional(),
  }));
  (dataOperationEngineCodeSchema3 = DataOperationEngineKind10.superRefine(
      (
        dataOperationEngineCodeSchema32?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          dataOperationEngineCodeSchema32.source !== undefined &&
          dataOperationEngineCodeSchema32.resolved === undefined
        ) {
          options.addIssue({
            code: `custom`,
            path: [`resolved`],
            message:
              "a `source` without a `resolved` cites a question with no answer — record what it resolved to",
          });
        }
        if (
          dataOperationEngineCodeSchema32.resolved !== undefined &&
          dataOperationEngineCodeSchema32.source === undefined
        ) {
          options.addIssue({
            code: `custom`,
            path: [`source`],
            message:
              "a `resolved` without a `source` loses what was asked — re-resolution ('the same datum in the latest run') needs the source",
          });
        }
        let matchesPath =
          dataOperationEngineCodeSchema32.resolved?.path !== undefined ||
          dataOperationEngineCodeSchema32.resolved?.column !== undefined;
        if (dataOperationEngineCodeSchema32.value !== undefined && !matchesPath) {
          options.addIssue({
            code: `custom`,
            path: [`value`],
            message:
              "a `value` is what was AT an address — it needs a cell address: `resolved.path` on a frozen noun, or `resolved.pk` + `resolved.column` on a database (a source-grain pin has no single value)",
          });
        }
        let matchesResolved =
          dataOperationEngineCodeSchema32.resolved !== undefined &&
          dataOperationEngineCodeSchema32.resolved.path === undefined &&
          dataOperationEngineCodeSchema32.resolved.pk === undefined &&
          dataOperationEngineCodeSchema32.resolved.column === undefined;
        if (
          (dataOperationEngineCodeSchema32.source?.object === `node` ||
            dataOperationEngineCodeSchema32.resolved?.object === `node`) &&
          (dataOperationEngineCodeSchema32.source?.object !== `node` ||
            dataOperationEngineCodeSchema32.resolved?.object !== `node` ||
            dataOperationEngineCodeSchema32.source.id !==
              dataOperationEngineCodeSchema32.resolved.id)
        ) {
          options.addIssue({
            code: `custom`,
            path: [`resolved`, `id`],
            message: `a widget's inline rows resolve to themselves — source and resolved both say node/<the same id>`,
          });
        }
        if (
          dataOperationEngineCodeSchema32.origin !== undefined &&
          (dataOperationEngineCodeSchema32.source?.object !== `blob` ||
            dataOperationEngineCodeSchema32.resolved?.object !== `blob` ||
            dataOperationEngineCodeSchema32.source.id !==
              dataOperationEngineCodeSchema32.resolved.id ||
            !matchesResolved ||
            dataOperationEngineCodeSchema32.value !== undefined ||
            dataOperationEngineCodeSchema32.datum !== undefined)
        ) {
          options.addIssue({
            code: `custom`,
            path: [`origin`],
            message:
              "`origin` cites words of the tool call behind a blob: it rides beside a `source` and a `resolved` that both name that one blob, with no path / pk / column, no `value` and no `datum`",
          });
        }
        if (
          dataOperationEngineCodeSchema32.datum !== undefined &&
          !matchesPath &&
          !matchesResolved
        ) {
          options.addIssue({
            code: `custom`,
            path: [`datum`],
            message:
              "a `datum` key rides beside a cell address (`resolved.path`, or `resolved.pk` + `resolved.column`) or at the bare source grain (`resolved` with no path / pk / column — every row matching the key), never alone and never beside a lone database row",
          });
        }
      },
    ).describe(
      `A COMPONENT pin: data-claude-component identity, optionally refined to one of its sources (source + resolved) and then EITHER to one cell of it (resolved.path, with the value that was there and the datum key — the cell's value-based identity, its x and series values — that re-resolves it on a later run) OR to a group of its rows by value (the datum key at source grain: every row whose named columns equal the key — a chart's x position).`,
    ));
  (dataOperationEngineKindSchema18 = lazyZod
    .discriminatedUnion(`kind`, [
      dataOperationEngineCodeSchema3,
      DataOperationEngineKind9,
    ])
    .describe(
      `What a widget comment is pinned to, tagged by the markup attribute that carries the identity: kind:'anchor' (data-claude-anchor, a plain element) | kind:'component' (data-claude-component, refined by a source citation and then a path into it).`,
    ));
  new (Set as Dynamic)([
    ...Object.keys(DataOperationEngineKind10.shape),
    ...Object.keys(DataOperationEngineKind9.shape),
  ]);
  new (Set as Dynamic)(
    Object.keys(DataOperationEngineKind10.shape).filter(
      (shapeKey?: Dynamic, ..._extraArguments: unknown[]) =>
        !Object.hasOwn(DataOperationEngineKind9.shape, shapeKey),
    ),
  );
  (resolveDataOperationEngineSafeParse = (
    dataOperationEngineSafeParse?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let safeParse: Dynamic = DataOperationEngineCode4.safeParse(
      dataOperationEngineSafeParse,
    );
    if (!safeParse.success)
      throw Error(
        `widget engine: stored value does not parse — corrupted ledger?`,
      );
    return safeParse.data;
  });
  (resolveDataOperationEngineDraft = (
    dataOperationEngineDraft?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationEngineDraft.draft
      ? null
      : `widget-no-draft: there is no draft to edit — this ${options} edit stops at the draft`);
  (resolveDataOperationEngineVerb2 = (
    payload?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationEngineAfter2: Dynamic = resolveDataOperationEngineAfter2(
      undefined,
      {
        verb: `create`,
        payload: payload,
      },
    );
    return {
      state: resolveDataOperationEngineParent3(
        dataOperationEngineAfter2.after,
        payload.parent,
      ),
      ...(dataOperationEngineAfter2.outcome === undefined
        ? {}
        : {
            outcome: dataOperationEngineAfter2.outcome,
          }),
    };
  });
  (resolveDataOperationEngineVerb3 = (
    dataOperationEngineVerb3?: Dynamic,
    payload?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationEngineAfter2: Dynamic = resolveDataOperationEngineAfter2(
      dataOperationEngineVerb3,
      {
        verb: `update`,
        payload: payload,
      },
    );
    return {
      state: resolveDataOperationEngineParent3(
        dataOperationEngineAfter2.after,
        resolveDataOperationEngineSafeParse(dataOperationEngineVerb3).parent,
      ),
      ...(dataOperationEngineAfter2.outcome === undefined
        ? {}
        : {
            outcome: dataOperationEngineAfter2.outcome,
          }),
    };
  });
  (resolveDataOperationEngineParent3 = (
    dataOperationEngineParent3?: Dynamic,
    parent?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let {
      parent: dataOperationEngineParent32,
      ...dataOperationEngineParent33
    }: Dynamic = dataOperationEngineParent3;
    return parent === undefined
      ? dataOperationEngineParent33
      : {
          ...dataOperationEngineParent33,
          parent: parent,
        };
  });
  (DataOperationEngineCreate8 = {
    create: dataOperationEngineParentSchema5,
    read: DataOperationEngineStrictObject2,
    update: DataOperationEnginePreprocess2,
    delete: DataOperationEngineState14,
    value: DataOperationEngineCode4,
    target: dataOperationEngineKindSchema18,
    apply: (..._extraArguments: unknown[]): undefined => {
      throw Error(
        `widget engine: no runtime wired — compose it into the engine set (makeWidgetEngine)`,
      );
    },
  });
}

export {
  DataOperationEngineCode4,
  DataOperationEngineCreate2,
  DataOperationEngineCreate3,
  DataOperationEngineCreate4,
  DataOperationEngineCreate5,
  DataOperationEngineCreate6,
  DataOperationEngineCreate7,
  DataOperationEngineCreate8,
  DataOperationEngineKind2,
  DataOperationEngineKind3,
  DataOperationEngineKind4,
  DataOperationEngineKind5,
  DataOperationEngineKind6,
  DataOperationEngineKind7,
  DataOperationEngineValue2,
  DataOperationEngineVerbs3,
  DataOperationEngineVerbs4,
  DataOperationEngineVerbs5,
  DataOperationEngineVerbs6,
  collectDataOperationEngineJoin,
  dataOperationEngineCodeSchema3,
  dataOperationEngineCreateSchema2,
  dataOperationEngineKindSchema15,
  dataOperationEngineKindSchema16,
  dataOperationEngineKindSchema17,
  dataOperationEngineKindSchema18,
  dataOperationEngineParentSchema5,
  dataOperationEnginePattern5,
  dataOperationEnginePattern6,
  dataOperationEngineValueSchema,
  dataOperationEngineVerbsSchema,
  resolveDataOperationEngineDraft,
  resolveDataOperationEngineEvery,
  resolveDataOperationEngineKind2,
  resolveDataOperationEngineMsg,
  resolveDataOperationEngineMsg2,
  resolveDataOperationEnginePreprocess,
  resolveDataOperationEngineValue25,
  resolveDataOperationEngineVerb2,
  resolveDataOperationEngineVerb3,
};

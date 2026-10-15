/** BaoCut: data operation engine from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  atom,
  createStore,
  rolldownNImport,
} from "../dependencies";
import {
  dataEnumsAndValidationSuiteProjectValues,
} from "./enums-and-validation";
import {
  DataOperationEngineJson,
  DataOperationEngineProject,
  DataOperationEngineVerbs,
  collectDataOperationEngineKeys,
  dataOperationEngineProjectFileNodeRunValues,
  resolveDataOperationEngineIncludes,
  resolveDataOperationEngineValue7,
  resolveDataOperationEngineValue8,
} from "./operation-engine-1";
import {
  DataOperationEngineCreate,
  DataOperationEngineValue,
  DataOperationEngineVerbs2,
  dataOperationEngineCreateSchema,
} from "./operation-engine-2";
import {
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
  dataOperationEngineCreateSchema2,
  dataOperationEngineKindSchema15,
  dataOperationEngineKindSchema16,
  dataOperationEngineKindSchema17,
  dataOperationEngineKindSchema18,
  dataOperationEngineParentSchema5,
  dataOperationEngineValueSchema,
  dataOperationEngineVerbsSchema,
  resolveDataOperationEngineDraft,
  resolveDataOperationEnginePreprocess,
  resolveDataOperationEngineVerb2,
  resolveDataOperationEngineVerb3,
} from "./operation-engine-3";
import {
  _resetFold,
  applyFrame,
} from "../../comments/store/store-1";
import {
  _onFoldReset,
} from "../../comments/store/store-2";

var DataOperationEngineFamilyMeta: Dynamic;

var resolveDataOperationEngineDeny3: Dynamic;

var DataOperationEngineCreate9: Dynamic;

var resolveDataOperationEngineEngine: Dynamic;

var DataOperationEngineState15: Dynamic;

var DataOperationEngineJson2: Dynamic;

var dataOperationEngineJsonBlobDatabaseProseValues: string[];

var DataOperationEngineIron: Dynamic;

var DataOperationEngineFOLDLAZYENGINES: Dynamic;

var FOLD_LAZY_ENGINES: string[];

var FOLD_REPLAY_SKIP_ENGINES: string[];

var foldStore: Dynamic;

function createRefAtomFamily(
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let atom2: Dynamic = (
    ref2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookupEntry: Dynamic = lookup.get(ref2);
    if (!lookupEntry) {
      lookup.set(ref2, (lookupEntry = atom(ref)));
    }
    return lookupEntry;
  };
  atom2.remove = (ref2?: Dynamic, ..._extraArguments: unknown[]): undefined =>
    void lookup.delete(ref2);
  atom2.keys = (..._extraArguments: unknown[]): Dynamic => lookup.keys();
  return atom2;
}

var refAtom: Dynamic;

var refIndexAtom: Dynamic;

function foldParentOf(
  foldParent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(typeof foldParent != `object` || !foldParent))
    return resolveDataOperationEngineValue26(foldParent.parent);
}

var dataOperationEngineSet12: Dynamic;

function isRootRef(rootRef?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return dataOperationEngineSet12.has(rootRef.split(`/`)[0]);
}

function resolveDataOperationEngineValue26(
  dataOperationEngineValue26?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof dataOperationEngineValue26 != `object` ||
    !dataOperationEngineValue26 ||
    Array.isArray(dataOperationEngineValue26)
  )
    return;
  let { object: object2, id: dataOperationEngineValue262 }: Dynamic =
    dataOperationEngineValue26;
  if (
    !(
      typeof object2 != `string` ||
      typeof dataOperationEngineValue262 != `string`
    )
  )
    return {
      object: object2,
      id: dataOperationEngineValue262,
    };
}

function resolveDataOperationEngineEngine2(
  dataOperationEngineEngine2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return dataOperationEngineEngine2 === undefined || options === undefined
    ? dataOperationEngineEngine2 === options
    : dataOperationEngineEngine2.engine === options.engine
      ? dataOperationEngineEngine2.parent === undefined ||
        options.parent === undefined
        ? dataOperationEngineEngine2.parent === options.parent
        : dataOperationEngineEngine2.parent.object === options.parent.object &&
          dataOperationEngineEngine2.parent.id === options.parent.id
      : false;
}

var bornAtom: Dynamic;

var foldSyncedAtom: Dynamic;

var overlayAtom: Dynamic;

function _setFoldIntend(
  SetFoldIntend?: unknown,
  ..._extraArguments: unknown[]
): undefined {}

function updateDataOperationEnginePending(
  updateDataOperationEnginePending2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let foldStoreEntry: Dynamic = foldStore.get(overlayAtom);
  let updateDataOperationEnginePendingResult: Dynamic;
  for (let [
    updateDataOperationEnginePendingResult2,
    response,
  ] of Object.entries(foldStoreEntry) as Dynamic)
    if (
      !(
        response.status !== `pending` ||
        response.ref !== updateDataOperationEnginePending2 ||
        (response.minted !== undefined &&
          options !== undefined &&
          response.minted !== options)
      )
    ) {
      if (updateDataOperationEnginePendingResult === undefined) {
        updateDataOperationEnginePendingResult = {
          ...foldStoreEntry,
        };
      }
      delete updateDataOperationEnginePendingResult[
        updateDataOperationEnginePendingResult2
      ];
    }
  if (updateDataOperationEnginePendingResult !== undefined) {
    foldStore.set(overlayAtom, updateDataOperationEnginePendingResult);
  }
}

var fileIdsAtom: Dynamic;

var browserEngines: Dynamic;

var dataOperationEngineMap2: Dynamic;

var DataOperationEngineAssign: Dynamic;

var resolveDataOperationEngineValue27: Dynamic;

function bumpDamaged(
  bumpDamaged2?: Dynamic,
  options: Dynamic = 1,
  ..._extraArguments: unknown[]
): undefined {
  bumpDamaged2.store.set(
    bumpDamaged2.foldDamagedAtom,
    (bumpDamaged2.store.get(bumpDamaged2.foldDamagedAtom) ?? 0) + options,
  );
}

var liveScope: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationEngine4Step1(): void {
  (DataOperationEngineFamilyMeta = {
    name: `widget`,
    familyMeta: {
      update: {
        discriminator: `kind`,
        legacyDiscriminators: [`action`],
      },
    },
    verbs: {
      create: {
        block: {
          objectTypes: [`node`],
          payload: dataOperationEngineParentSchema5,
          description:
            "Birth a widget block in a tab: `parent` {object:'file', id} names the tab's file (door law requires it on every node birth and never lets it move). Absent/empty `code` births { code: '', pub: 0 } (v1 law: creation mints an empty node). Non-empty code under the default state 'publish' is judged ONCE at accept: valid publishes AT birth (landed:'live', pub 1); invalid soft-lands to the draft with the node STILL BORN (landed:'draft', teaching diagnostic) — never a deny (one bad code field in a batch must not roll back the rest). state 'draft' stages without validating. landed/materialized/diagnostic are ENGINE-STAMPED (the gate strips client-sent values); lidSubstitutions declares the ONE legal $lid position ('src', the claude.Embed src prop) — recorded code keeps the $lid intent, the stamp carries the minted-id value.",
        },
      },
      update: {
        draft: {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(
            dataOperationEngineKindSchema15,
          ),
          description: `Stage the ONE collaborative draft — and, under the default state 'publish', validate and publish in the SAME call (valid → pub advances, landed:'live'; invalid → staged with the stamped diagnostic). basePub names the publish generation the draft was computed against; a stale one refuses widget-draft-stale (every write names the exact state it read, or is denied). Carries the W6 lidSubstitutions/materialized pair (create parity) and the W7 confirmOrphans/confirmSourceOrphans acks — a live landing IS a publish, so the orphan laws bind identically.`,
        },
        publish: {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind2),
          description: `Promote the STORED draft to the published source (publish is an UPDATE by the verb law; carries no content). Refuses widget-no-draft, publish-conflict (stale basePub CAS), widget-invalid (the dialect gate), and lid-unresolvable ($lid-bearing drafts publish only through the batch accept road). confirmOrphans / confirmSourceOrphans are the W7 warn/confirm acks, content-addressed to the CURRENT publish generation — each confirmed publish advances pub, staling every prior confirm.`,
        },
        revert: {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind3),
          description: `Discard the open draft — the block returns to serving the published source alone (publish's mirror: both act on the stored draft, no content). Refuses widget-no-draft when there is nothing to discard.`,
        },
        text: {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind4),
          description:
            "Island edit on the PUBLISHED source: splice `value` (≤2048 units) into the claude-text-id island named `id`. W5: the splice flows into BOTH published code AND the open draft (the draft re-bases — it never goes stale from an island edit; a draft-leg failure refuses text-draft-desync). spliced/splicedDraft are ENGINE-STAMPED accepted bytes: fold replays them, host.textEdit never re-runs on history (validate-once).",
        },
        "chart-title": {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind5),
          description:
            "Splice chart `chartId`'s metadata.title string literal (≤500 units) in the PUBLISHED source — the text arm's W5 two-leg law and engine-stamp pattern, chart-chrome flavored (the validator proves the span).",
        },
        "text-draft": {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind6),
          description:
            "Island edit on the DRAFT only — never touches published code, so the publish gate stays the only wall. NO auto-fork (that is draft-edit's law): no open draft refuses widget-no-draft. ONE engine-stamped result (`spliced`, the post-splice draft source) — no splicedDraft twin, there is no second leg.",
        },
        "chart-title-draft": {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(DataOperationEngineKind7),
          description:
            "Chart-title splice on the DRAFT only — text-draft's exact mirror: no auto-fork (widget-no-draft), no re-validate (drafts may be legally mid-work), one engine-stamped `spliced`.",
        },
        "draft-edit": {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(
            dataOperationEngineKindSchema16,
          ),
          description:
            "Quote/replace edits (1..64) against the CURRENT draft (v1's proven grammar): each quote.exact must match exactly once — prefix/suffix pins (≤1024) disambiguate — applied SEQUENTIALLY on a working copy, ATOMICALLY (first failure refuses the whole op). AUTO-FORK: no draft → forks from the published source first. The validator is NOT consulted (the hard gate stays at publish); deliberately NO content CAS — quote-not-found IS the staleness signal. `edited` is the engine-stamped post-edit source.",
        },
        "spec-patch": {
          objectTypes: [`node`],
          payload: resolveDataOperationEnginePreprocess(
            dataOperationEngineKindSchema17,
          ),
          description: `ONE atomic patch verb across definition AND sources: patches (1..32) of {path ≤256, op: set|remove, value?} against the PUBLISHED spec, re-validating the WHOLE result (validate-or-reject, no partial landing). confirmSourceOrphans is the source-orphan removal ceremony's generation-addressed ack. patches[].value is z.json() — typed FROM the ONE parser's reality (lib/lfile/widgetSpecPatch.ts: any JSON; set-requires-presence, prototype-machinery key refusals and depth ≤32 are parser law; printJsxExpr's JSON.stringify round-trip means non-JSON cannot land), and a set's value SEMANTICS are judged by the post-patch re-validate — a narrower zod here would be a second spelling of zSources/zChartDefinition.`,
        },
      },
      read: {
        value: {
          objectTypes: [`node`],
          payload: DataOperationEngineCode4,
          description:
            "The committed value: { code, pub, draft?, parent? }. `code` is the published SOURCE — canonical value is the source; the compiled bundle is NOT stored, it derives deterministically at the serving edge. `pub` is the monotonic publish generation (the CAS token every draft/publish names). `draft` is the ONE collaborative draft (v1 law), forked from publish generation `basePub`. `parent` is the node-birth edge {object:'file', id} — the tab the widget is a member of (absent on nodes born before the seat). Also the shape a widget checkpoint row's value carries.",
        },
      },
    },
    grammars: {
      widgetTarget: {
        group: `Widget`,
        schema: dataOperationEngineKindSchema18,
        description:
          "What a widget comment is pinned to (the Jul-24 pin-target gavels + the Aug-21 datum key), tagged by the markup attribute carrying the identity: kind:'anchor' (data-claude-anchor — a plain element) | kind:'component' (data-claude-component — a FLAT refinement ladder: whole chart → +source+resolved (one of its sources) → one cell via resolved.path on frozen nouns or resolved.pk+column on a database, with the scalar `value` (≤512) as orphan-readout testimony, the `datum` key (column → scalar: the cell's x and series values — its value-based identity, what re-resolves it on a later run; bounded 1..8 columns) and the ROOM-STAMPED `pub`). superRefine laws a compiled schema can't show: source⇔resolved travel TOGETHER; a `value` or a `datum` needs a cell address (the noun decides the addressing mode — the key never stands alone); a resolution never says routine/file (both SOURCE-ONLY). Not an op payload — it rides an utterance's anchor seat under the door's WIDGET_TARGET_KEYS strict-parse guard, which is exactly why it registers as a grammar and not a kind.",
      },
    },
  });
  (resolveDataOperationEngineDeny3 = (
      dataOperationEngineDeny3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      dataOperationEngineDeny32?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let deny = resolveDataOperationEngineDraft(
        dataOperationEngineDeny32,
        dataOperationEngineDeny3,
      );
      return deny === null
        ? {}
        : {
            deny: deny,
          };
    });
  (DataOperationEngineCreate9 = {
    create: {
      block: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb2,
      },
    },
    update: {
      draft: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      publish: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      revert: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      text: {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      "chart-title": {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      "text-draft": {
        admit: resolveDataOperationEngineDeny3(`island`),
        apply: resolveDataOperationEngineVerb3,
      },
      "chart-title-draft": {
        admit: resolveDataOperationEngineDeny3(`chart-title`),
        apply: resolveDataOperationEngineVerb3,
      },
      "draft-edit": {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
      "spec-patch": {
        admit: resolveDataOperationEngineValue8,
        apply: resolveDataOperationEngineVerb3,
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate9?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate9,
      },
    },
  });
  (resolveDataOperationEngineEngine = (
    engine?: Dynamic,
    methods?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    engine: engine,
    methods: methods,
  }));
  (DataOperationEngineState15 = [
    resolveDataOperationEngineEngine(
      DataOperationEngineVerbs3,
      DataOperationEngineCreate2,
    ),
    resolveDataOperationEngineEngine(
      DataOperationEngineVerbs4,
      DataOperationEngineCreate3,
    ),
    resolveDataOperationEngineEngine(
      DataOperationEngineVerbs6,
      DataOperationEngineCreate7,
    ),
    resolveDataOperationEngineEngine(
      DataOperationEngineVerbs2,
      DataOperationEngineCreate,
    ),
    resolveDataOperationEngineEngine(
      dataOperationEngineVerbsSchema,
      DataOperationEngineCreate6,
    ),
    resolveDataOperationEngineEngine(
      DataOperationEngineFamilyMeta,
      DataOperationEngineCreate9,
    ),
    resolveDataOperationEngineEngine(
      DataOperationEngineVerbs5,
      DataOperationEngineCreate4,
    ),
  ]);
  for (let {
    engine: localResult,
    methods: localResult2,
  } of DataOperationEngineState15 as Dynamic) {
    DataOperationEngineVerbs.parse(localResult);
    if (localResult.name === `blob` && localResult.verbs.update !== undefined)
      throw Error(
        `kind registry: blob declares an update verb — read-only engine law`,
      );
    let index = 0;
    for (let localResult3 of [`create`, `update`, `read`] as Dynamic) {
      let verbItem: Dynamic = localResult.verbs[localResult3];
      if (verbItem === undefined) continue;
      let items = localResult3 === `read` ? [`serve`] : [`admit`, `apply`];
      for (let localResult4 of Object.keys(verbItem) as Dynamic)
        for (let localResult5 of items as Dynamic) {
          let localResultItemItemItem: Dynamic =
            localResult2[localResult3]?.[localResult4]?.[localResult5];
          if (typeof localResultItemItemItem != `function`)
            throw Error(
              `kind registry: ${localResult.name}.${localResult3}.${localResult4} is missing ${localResult5} — all methods are required`,
            );
          if (
            localResult5 === `admit` &&
            localResultItemItemItem === resolveDataOperationEngineValue8
          ) {
            index++;
          }
        }
    }
    let DataOperationEngineJsonItem: Dynamic =
      DataOperationEngineJson[localResult.name];
    if (
      DataOperationEngineJsonItem === undefined ||
      index > DataOperationEngineJsonItem
    )
      throw Error(
        `kind registry: ${localResult.name} has ${index} noExtraLaw admits (ceiling ${DataOperationEngineJsonItem ?? `unset`}) — the ratchet only shrinks (kind.ts NO_EXTRA_LAW_CEILING)`,
      );
  }
  DataOperationEngineState15.flatMap(
    (
      DataOperationEngineState152?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      collectDataOperationEngineKeys(DataOperationEngineState152.engine),
  );
  (DataOperationEngineJson2 = {
    json: dataOperationEngineCreateSchema,
    blob: dataOperationEngineValueSchema,
    database: dataOperationEngineCreateSchema2,
    prose: DataOperationEngineValue,
    iron: DataOperationEngineCreate5,
    text: DataOperationEngineValue2,
    widget: DataOperationEngineCreate8,
  });
  (dataOperationEngineJsonBlobDatabaseProseValues = [
    `json`,
    `blob`,
    `database`,
    `prose`,
    `text`,
  ]);
  (DataOperationEngineIron = {
    iron: `host-composed async transport (makeIronEngine) — methods are fail-loud stubs pending a composition ruling`,
    widget: `routed at composition (makeWidgetEngine); EngineOps.widget stays the fail-loud pin — apply without the stamping gate must never run`,
  });
  for (let localResult of Object.keys(DataOperationEngineJson2) as Dynamic) {
    let dataOperationEngineValue7: Dynamic = resolveDataOperationEngineValue7(
      DataOperationEngineJson2[localResult].apply,
    );
    let matchesDataOperationEngineIronItem: boolean =
      DataOperationEngineIron[localResult] !== undefined;
    let includes =
      dataOperationEngineJsonBlobDatabaseProseValues.includes(localResult);
    if (includes && !dataOperationEngineValue7)
      throw Error(
        `kind registry: ${localResult}.apply is not registry-routed — the routing ratchet only grows (wrap it with routedApply or move it to REGISTRY_UNROUTED_ENGINES with a ruling)`,
      );
    if (!includes && !matchesDataOperationEngineIronItem)
      throw Error(
        `kind registry: ${localResult} is neither registry-routed nor an excused exception — new engines route through the registry (dispatch.ts)`,
      );
    if (includes && matchesDataOperationEngineIronItem)
      throw Error(
        `kind registry: ${localResult} is both routed and excused — pick one`,
      );
  }
  ((..._extraArguments: unknown[]): Dynamic => {
    let fromEntries: Dynamic = Object.fromEntries(
      dataOperationEngineProjectFileNodeRunValues.map(
        (
          dataOperationEngineProjectFileNodeRunValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [dataOperationEngineProjectFileNodeRunValue, []],
      ),
    );
    for (let { engine: localResult } of DataOperationEngineState15 as Dynamic)
      for (let localResult2 of [`create`, `update`, `read`] as Dynamic)
        for (let localResult3 of Object.values(
          localResult.verbs[localResult2] ?? {},
        ) as Dynamic)
          for (let localResult4 of localResult3.objectTypes as Dynamic) {
            if (!resolveDataOperationEngineIncludes(localResult4))
              throw Error(
                `kind registry: ${localResult.name} declares uncataloged noun ${localResult4} — the catalog (kind.ts CATALOG_OBJECT_TYPES) is the exhaustive object-type list`,
              );
            let fromEntryItem: Dynamic = fromEntries[localResult4];
            if (!fromEntryItem.includes(localResult.name)) {
              fromEntryItem.push(localResult.name);
            }
          }
    for (let [localResult, items] of Object.entries(fromEntries) as Dynamic) {
      let DataOperationEngineProjectItem: Dynamic =
        DataOperationEngineProject[localResult];
      if (items.length === 0)
        throw Error(
          `kind registry: ${localResult} has default engine ${DataOperationEngineProjectItem} but derives no grants — add the arm objectTypes`,
        );
      if (items[0] !== DataOperationEngineProjectItem)
        throw Error(
          `kind registry: ${localResult} derives [${items.join(`, `)}] but its default engine is ${DataOperationEngineProjectItem} — fix the declaring engine's objectTypes or NOUN_DEFAULTS`,
        );
    }
    return fromEntries;
  })();
  (DataOperationEngineFOLDLAZYENGINES = rolldownNImport({
    FOLD_LAZY_ENGINES: (..._extraArguments: unknown[]) => FOLD_LAZY_ENGINES,
    FOLD_MUX_V: (..._extraArguments: unknown[]) => 1,
    FOLD_REPLAY_SKIP_ENGINES: (..._extraArguments: unknown[]) =>
      FOLD_REPLAY_SKIP_ENGINES,
    _onFoldReset: (..._extraArguments: unknown[]): Dynamic => _onFoldReset,
    _resetFold: (..._extraArguments: unknown[]): Dynamic => _resetFold,
    _setFoldIntend: (..._extraArguments: unknown[]): Dynamic => _setFoldIntend,
    applyFrame: (..._extraArguments: unknown[]): Dynamic => applyFrame,
    bornAtom: (..._extraArguments: unknown[]): Dynamic => bornAtom,
    browserEngines: (..._extraArguments: unknown[]): Dynamic => browserEngines,
    bumpDamaged: (..._extraArguments: unknown[]): Dynamic => bumpDamaged,
    fileIdsAtom: (..._extraArguments: unknown[]): Dynamic => fileIdsAtom,
    foldParentOf: (..._extraArguments: unknown[]): Dynamic => foldParentOf,
    foldStore: (..._extraArguments: unknown[]): Dynamic => foldStore,
    foldSyncedAtom: (..._extraArguments: unknown[]): Dynamic => foldSyncedAtom,
    isRootRef: (..._extraArguments: unknown[]): Dynamic => isRootRef,
    liveScope: (..._extraArguments: unknown[]): Dynamic => liveScope,
    overlayAtom: (..._extraArguments: unknown[]): Dynamic => overlayAtom,
    refAtom: (..._extraArguments: unknown[]): Dynamic => refAtom,
    refIndexAtom: (..._extraArguments: unknown[]): Dynamic => refIndexAtom,
  }));
  (FOLD_LAZY_ENGINES = [`prose`, `iron`, `widget`]);
  (FOLD_REPLAY_SKIP_ENGINES = [`iron`, `widget`]);
  (foldStore = createStore());
  (refAtom = createRefAtomFamily(undefined));
  (refIndexAtom = atom(new (Map as Dynamic)()));
  (dataOperationEngineSet12 = new (Set as Dynamic)(
    dataEnumsAndValidationSuiteProjectValues,
  ));
  (bornAtom = createRefAtomFamily(undefined));
  (foldSyncedAtom = atom(false));
  (overlayAtom = atom({}));
  (fileIdsAtom = ((
    fileIds?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    atom((fileIds2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let items: Dynamic = [];
      for (let fileIdsAtomResult of fileIds2(fileIds).keys() as Dynamic)
        if (fileIdsAtomResult.startsWith(`file/`)) {
          items.push(fileIdsAtomResult.slice(5));
        }
      return items;
    }))(refIndexAtom));
  (browserEngines = DataOperationEngineJson2);
  (dataOperationEngineMap2 = new (Map as Dynamic)());
  (DataOperationEngineAssign = Object.assign(
    Object.create(null),
    browserEngines,
  ));
  (resolveDataOperationEngineValue27 = (
    dataOperationEngineValue27?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => DataOperationEngineAssign[dataOperationEngineValue27]);
  (liveScope = {
    store: foldStore,
    refAtom: refAtom,
    refIndexAtom: refIndexAtom,
    bornAtom: bornAtom,
    foldSyncedAtom: foldSyncedAtom,
    foldDamagedAtom: atom(0),
    fileIdsAtom: fileIdsAtom,
    proseDocs: dataOperationEngineMap2,
  });
}

export {
  DataOperationEngineFOLDLAZYENGINES,
  FOLD_LAZY_ENGINES,
  FOLD_REPLAY_SKIP_ENGINES,
  bornAtom,
  bumpDamaged,
  dataOperationEngineMap2,
  foldParentOf,
  foldStore,
  foldSyncedAtom,
  isRootRef,
  liveScope,
  overlayAtom,
  refAtom,
  refIndexAtom,
  resolveDataOperationEngineEngine2,
  resolveDataOperationEngineValue26,
  resolveDataOperationEngineValue27,
  updateDataOperationEnginePending,
};

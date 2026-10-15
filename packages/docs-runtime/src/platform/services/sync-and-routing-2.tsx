/** BaoCut: platform sync and routing from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  inFrame,
} from "../dependencies";
import {
  resolvePlatformFeatureFlagsEnabled2,
  usePlatformFeatureFlagsUseSyncExternalStore,
} from "./feature-flags";
import {
  resolvePlatformSessionAndSourcesUnavailable,
} from "./session-and-sources-2";
import {
  resolveEditorExtensionsColor,
  resolveEditorExtensionsYellow2,
} from "../../prose-editor/platform/extensions-1";
import {
  collectEditorExtensionsSlice,
  resolveEditorExtensionsClaude,
  resolveEditorExtensionsIsInteger,
} from "../../prose-editor/platform/extensions-2";
import {
  UiOverlaysAndIconsCustomIcon,
} from "../ui/overlays-and-icons";
import {
  frameViewerCan,
} from "../observability/browser-and-operation-events-3";
import {
  PlatformApiAndAuthState2,
  api,
  resolvePlatformApiAndAuthDispatch,
  resolvePlatformApiAndAuthState3,
  resolvePlatformApiAndAuthState4,
  updatePlatformApiAndAuthDeps,
} from "./api-and-auth-1";
import {
  collectPlatformApiAndAuthVerb,
} from "./api-and-auth-2";
import {
  resolvePlatformApiAndAuthAssistant2,
  resolvePlatformApiAndAuthHuman,
} from "./api-and-auth-5";

function resolvePlatformSyncAndRoutingLid(
  birthName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    $lid: `f`,
    object: `file`,
    verb: `create`,
    engine: `json`,
    payload: {
      value: {
        birthName: birthName,
      },
    },
  };
}

function resolvePlatformSyncAndRoutingRef(
  birthName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ref: {
      object: `file`,
      id: `$lid:f`,
    },
    verb: `update`,
    engine: `json`,
    payload: {
      engine: `json`,
      kind: `value`,
      value: {
        birthName: birthName,
        content: {
          kind: `node`,
          id: `$lid:n`,
        },
      },
    },
  };
}

function resolvePlatformSyncAndRoutingRef2(
  platformSyncAndRoutingRef2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ref: {
      object: `project`,
      id: platformSyncAndRoutingRef2,
    },
    verb: `update`,
    engine: `json`,
    payload: {
      engine: `json`,
      kind: `patch`,
      patch: [
        {
          op: `set`,
          path: [`tabs`, `$lid:f`],
          value: options ?? {},
        },
      ],
    },
  };
}

var resolvePlatformSyncAndRoutingValue17: Dynamic;

var resolvePlatformSyncAndRoutingHeading: Dynamic;

function resolvePlatformSyncAndRoutingText(
  platformSyncAndRoutingText?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSyncAndRoutingValue17: Dynamic =
    resolvePlatformSyncAndRoutingValue17(platformSyncAndRoutingText);
  let type: Dynamic =
    typeof platformSyncAndRoutingValue17.type == `string`
      ? platformSyncAndRoutingValue17.type
      : undefined;
  return type === `text`
    ? typeof platformSyncAndRoutingValue17.text == `string` &&
        platformSyncAndRoutingValue17.text !== ``
    : type !== undefined &&
        type !== `doc` &&
        type !== `paragraph` &&
        type !== `heading`
      ? true
      : Array.isArray(platformSyncAndRoutingValue17.content) &&
        platformSyncAndRoutingValue17.content.some(
          resolvePlatformSyncAndRoutingText,
        );
}

var platformSyncAndRoutingSet6: Dynamic;

var platformSyncAndRoutingSet7: Dynamic;

function resolvePlatformSyncAndRoutingEntries(
  platformSyncAndRoutingEntries?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  for (let [
    resolvePlatformSyncAndRoutingEntriesResult,
    resolvePlatformSyncAndRoutingEntriesResult2,
  ] of Object.entries(
    resolvePlatformSyncAndRoutingValue17(platformSyncAndRoutingEntries),
  ) as Dynamic)
    if (
      !(
        platformSyncAndRoutingSet6.has(
          resolvePlatformSyncAndRoutingEntriesResult,
        ) || resolvePlatformSyncAndRoutingEntriesResult2 == null
      )
    ) {
      record2[resolvePlatformSyncAndRoutingEntriesResult] =
        resolvePlatformSyncAndRoutingEntriesResult2;
    }
  return record2;
}

function collectPlatformSyncAndRoutingText(
  collectPlatformSyncAndRoutingText2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSyncAndRoutingValue17: Dynamic =
    resolvePlatformSyncAndRoutingValue17(collectPlatformSyncAndRoutingText2);
  let type: Dynamic =
    typeof platformSyncAndRoutingValue17.type == `string`
      ? platformSyncAndRoutingValue17.type
      : ``;
  if (type === `text`) {
    let record3: Dynamic = {
      type: type,
      text: platformSyncAndRoutingValue17.text,
    };
    if (
      Array.isArray(platformSyncAndRoutingValue17.marks) &&
      platformSyncAndRoutingValue17.marks.length > 0
    ) {
      record3.marks = platformSyncAndRoutingValue17.marks.map(
        (mark?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let {
            attrs: platformSyncAndRoutingValue172,
            ...platformSyncAndRoutingValue173
          }: Dynamic = resolvePlatformSyncAndRoutingValue17(mark);
          return platformSyncAndRoutingValue173.type === `highlight`
            ? options.highlightColour === true
              ? resolveEditorExtensionsColor(
                  resolveEditorExtensionsYellow2(
                    resolvePlatformSyncAndRoutingValue17(
                      platformSyncAndRoutingValue172,
                    ).color ?? platformSyncAndRoutingValue173.color,
                  ),
                )
              : {
                  type: `highlight`,
                }
            : {
                ...resolvePlatformSyncAndRoutingEntries(
                  platformSyncAndRoutingValue173,
                ),
                ...resolvePlatformSyncAndRoutingEntries(
                  platformSyncAndRoutingValue172,
                ),
                type: resolvePlatformSyncAndRoutingValue17(mark).type,
              };
        },
      );
    }
    return record3;
  }
  let platformSyncAndRoutingEntries: Dynamic =
    resolvePlatformSyncAndRoutingEntries(platformSyncAndRoutingValue17.attrs);
  let type2: Dynamic = type;
  if (
    type === `mention` &&
    !(platformSyncAndRoutingEntries.principal === undefined &&
    platformSyncAndRoutingEntries.ref !== undefined
      ? options.mentionLabel === true
      : options.personLabel === true &&
        resolveEditorExtensionsClaude(platformSyncAndRoutingEntries))
  ) {
    delete platformSyncAndRoutingEntries.label;
  }
  if (type === `heading`) {
    type2 = `paragraph`;
    let { level: heading, ...platformSyncAndRoutingEntries2 }: Dynamic =
      platformSyncAndRoutingEntries;
    platformSyncAndRoutingEntries =
      heading === 1 || heading === 2 || heading === 3
        ? {
            ...platformSyncAndRoutingEntries2,
            heading: heading,
          }
        : platformSyncAndRoutingEntries2;
  }
  if (platformSyncAndRoutingSet7.has(type)) {
    if (platformSyncAndRoutingEntries.header !== true) {
      delete platformSyncAndRoutingEntries.header;
    }
    let collectEditorExtensionsSlice2: Dynamic = collectEditorExtensionsSlice(
      platformSyncAndRoutingEntries.colwidth,
    );
    if (collectEditorExtensionsSlice2) {
      platformSyncAndRoutingEntries.colwidth = Array.from<Dynamic, Dynamic>(
        {
          length: resolveEditorExtensionsIsInteger(
            platformSyncAndRoutingEntries.colspan,
            1e3,
          ),
        },
        (
          collectPlatformSyncAndRoutingText3?: unknown,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => collectEditorExtensionsSlice2[options2] ?? 0,
      );
    } else {
      delete platformSyncAndRoutingEntries.colwidth;
    }
  }
  let record2: Dynamic = {
    type: type2,
  };
  if (Object.keys(platformSyncAndRoutingEntries).length > 0) {
    record2.attrs = platformSyncAndRoutingEntries;
  }
  if (typeof platformSyncAndRoutingValue17.text == `string`) {
    record2.text = platformSyncAndRoutingValue17.text;
  }
  if (
    Array.isArray(platformSyncAndRoutingValue17.content) &&
    platformSyncAndRoutingValue17.content.length > 0
  ) {
    record2.content = platformSyncAndRoutingValue17.content.map(
      (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        collectPlatformSyncAndRoutingText(content, options),
    );
  }
  return record2;
}

function collectPlatformSyncAndRoutingEngine(
  collectPlatformSyncAndRoutingEngine2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { engine: platformSyncAndRoutingValue17, ...payload }: Dynamic =
    resolvePlatformSyncAndRoutingValue17(
      collectPlatformSyncAndRoutingEngine2.payload,
    );
  if (collectPlatformSyncAndRoutingEngine2.verb !== `create`) {
    let {
      engine: collectPlatformSyncAndRoutingEngine3,
      ...collectPlatformSyncAndRoutingEngine4
    }: Dynamic = collectPlatformSyncAndRoutingEngine2;
    return {
      ...collectPlatformSyncAndRoutingEngine4,
      payload: payload,
    };
  }
  if (
    collectPlatformSyncAndRoutingEngine2.object !== `node` ||
    resolvePlatformSyncAndRoutingValue17(payload.source).from !== undefined
  )
    return {
      ...collectPlatformSyncAndRoutingEngine2,
      payload: payload,
    };
  let { doc: payload2, value: payload3, ...payload4 }: Dynamic = payload;
  let platformSyncAndRoutingValue172: Dynamic =
    resolvePlatformSyncAndRoutingValue17(payload3);
  let matchesCondition =
    typeof platformSyncAndRoutingValue172.format == `string` &&
    typeof platformSyncAndRoutingValue172.content == `string`;
  if (
    !matchesCondition &&
    payload2 === undefined &&
    collectPlatformSyncAndRoutingEngine2.engine !== `prose`
  )
    return {
      ...collectPlatformSyncAndRoutingEngine2,
      payload: payload,
    };
  let content: Dynamic =
    Array.isArray(resolvePlatformSyncAndRoutingValue17(payload2).content) &&
    resolvePlatformSyncAndRoutingText(payload2)
      ? resolvePlatformSyncAndRoutingValue17(payload2).content
      : undefined;
  let source: Dynamic = matchesCondition
    ? {
        from: {
          kind: `inline`,
          content:
            platformSyncAndRoutingValue172.content === ``
              ? `
`
              : platformSyncAndRoutingValue172.content,
        },
        as: platformSyncAndRoutingValue172.format,
      }
    : content === undefined
      ? {
          from: {
            kind: `inline`,
            content: resolvePlatformSyncAndRoutingHeading(),
          },
          as: `blocks`,
        }
      : {
          from: {
            kind: `inline`,
            content: content.map(
              (content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                collectPlatformSyncAndRoutingText(content2),
            ),
          },
          as: `blocks`,
        };
  return {
    ...collectPlatformSyncAndRoutingEngine2,
    payload: {
      ...payload4,
      source: source,
    },
  };
}

var resolvePlatformSyncAndRoutingDeny: Dynamic;

async function loadPlatformSyncAndRoutingFinal(
  platformSyncAndRoutingFinal?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let dialect: Dynamic = context.dialect ?? context.peekDialect?.();
  let batch: Dynamic = (
    platformSyncAndRoutingFinal2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSyncAndRoutingFinal.batch(
      platformSyncAndRoutingFinal2 === `final`
        ? options.map(collectPlatformSyncAndRoutingEngine)
        : options,
    );
  let dialect2: Dynamic = dialect ?? `final`;
  let batch2: Dynamic = await batch(dialect2);
  if (
    batch2.verdict === `allow` ||
    dialect !== undefined ||
    !resolvePlatformSyncAndRoutingDeny(batch2)
  ) {
    if (batch2.verdict === `allow` && dialect === undefined) {
      context.learn?.(dialect2);
    }
    return batch2;
  }
  let label = dialect2 === `final` ? `legacy` : `final`;
  let batch3: Dynamic = await batch(label);
  if (batch3.verdict === `allow`) {
    context.learn?.(label);
  }
  return batch3;
}

var resolvePlatformSyncAndRoutingSpreadsheet: (platformSyncAndRoutingSpreadsheet?: Dynamic, ..._extraArguments: unknown[]) => "spreadsheet" | "tab";

function resolvePlatformSyncAndRoutingEngineUnavailable(
  platformSyncAndRoutingEngineUnavailable?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  if (
    platformSyncAndRoutingEngineUnavailable.reason === `engine-unavailable` ||
    (platformSyncAndRoutingEngineUnavailable.reason === `unavailable` &&
      resolvePlatformSyncAndRoutingValue17(
        platformSyncAndRoutingEngineUnavailable.data,
      ).why === `engine`)
  )
    return `${options === `spreadsheet` ? `Spreadsheets` : context ? `Documents` : `New tabs`} are not available on this server yet.`;
}

function resolvePlatformSyncAndRoutingUnavailable(
  platformSyncAndRoutingUnavailable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSyncAndRoutingEngineUnavailable =
    resolvePlatformSyncAndRoutingEngineUnavailable(
      platformSyncAndRoutingUnavailable,
      options,
    );
  return platformSyncAndRoutingEngineUnavailable === undefined
    ? platformSyncAndRoutingUnavailable.reason === `unavailable`
      ? `Could not create the ${resolvePlatformSyncAndRoutingSpreadsheet(options)} — the server is busy right now. Try again in a moment.`
      : platformSyncAndRoutingUnavailable.reason === `unknown_id`
        ? `Could not create the ${resolvePlatformSyncAndRoutingSpreadsheet(options)} — it refers to something that has since been deleted (an embedded widget, an image or a tab).`
        : `Could not create the ${resolvePlatformSyncAndRoutingSpreadsheet(options)} — ${resolvePlatformSessionAndSourcesUnavailable(typeof platformSyncAndRoutingUnavailable.reason == `string` ? platformSyncAndRoutingUnavailable.reason : `denied`)}`
    : platformSyncAndRoutingEngineUnavailable;
}

var PlatformSyncAndRoutingBirthRefused: Dynamic;

var resolvePlatformSyncAndRoutingIndexOf: Dynamic;

function resolvePlatformSyncAndRoutingClaude(
  actor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformApiAndAuthAssistant2(actor)
    ? `Claude`
    : resolvePlatformApiAndAuthHuman(actor) === `executor`
      ? `scheduler`
      : resolvePlatformSyncAndRoutingIndexOf(actor.principal);
}

function resolvePlatformSyncAndRoutingScheduled(
  platformSyncAndRoutingScheduled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSyncAndRoutingScheduled.mode === `scheduled`
    ? platformSyncAndRoutingScheduled.approvedBy === undefined
      ? `scheduler`
      : resolvePlatformSyncAndRoutingIndexOf(
          platformSyncAndRoutingScheduled.approvedBy,
        )
    : platformSyncAndRoutingScheduled.byVia === `assistant` ||
        platformSyncAndRoutingScheduled.byVia === `host`
      ? `Claude`
      : platformSyncAndRoutingScheduled.by === ``
        ? `—`
        : resolvePlatformSyncAndRoutingIndexOf(
            platformSyncAndRoutingScheduled.by,
          );
}

function resolvePlatformSyncAndRoutingScheduled2(
  platformSyncAndRoutingScheduled2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSyncAndRoutingScheduled2.mode === `scheduled`
    ? (platformSyncAndRoutingScheduled2.approvedBy ?? ``)
    : platformSyncAndRoutingScheduled2.by;
}

function resolvePlatformSyncAndRoutingScheduled3(
  platformSyncAndRoutingScheduled3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label =
    platformSyncAndRoutingScheduled3.mode !== `scheduled` &&
    platformSyncAndRoutingScheduled3.approvedBy !== undefined
      ? `, approved by ${resolvePlatformSyncAndRoutingIndexOf(platformSyncAndRoutingScheduled3.approvedBy)}`
      : ``;
  return `${resolvePlatformSyncAndRoutingScheduled(platformSyncAndRoutingScheduled3)} · ${platformSyncAndRoutingScheduled3.mode}${label}`;
}

var resolvePlatformSyncAndRoutingValue18: Dynamic;

var resolvePlatformSyncAndRoutingValue19: Dynamic;

var platformSyncAndRoutingWeakMap2: Dynamic;

function isPlatformSyncAndRoutingMatchMedia(
  platformSyncAndRoutingMatchMedia: Dynamic = typeof window === "undefined"
    ? undefined
    : window,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!platformSyncAndRoutingMatchMedia) return false;
  let platformSyncAndRoutingWeakMap2Entry: Dynamic =
    platformSyncAndRoutingWeakMap2.get(platformSyncAndRoutingMatchMedia);
  if (platformSyncAndRoutingWeakMap2Entry !== undefined)
    return platformSyncAndRoutingWeakMap2Entry;
  let enabled = false;
  try {
    let matchesCondition =
      typeof platformSyncAndRoutingMatchMedia.matchMedia == `function` &&
      platformSyncAndRoutingMatchMedia.matchMedia(`(pointer:coarse)`)
        .matches === true;
    let number2 = Number(platformSyncAndRoutingMatchMedia.screen?.width) || 0;
    let number3 = Number(platformSyncAndRoutingMatchMedia.screen?.height) || 0;
    let min = Math.min(number2, number3);
    enabled = matchesCondition && min > 0 && min <= 480;
  } catch {
    enabled = false;
  }
  platformSyncAndRoutingWeakMap2.set(platformSyncAndRoutingMatchMedia, enabled);
  return enabled;
}

function resolvePlatformSyncAndRoutingValue20(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      inFrame() && isPlatformSyncAndRoutingMatchMedia(),
    [],
  );
}

var platformSyncAndRoutingFilesWriteDataWriteValues: string[];

function resolvePlatformSyncAndRoutingIncludes(
  platformSyncAndRoutingIncludes?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSyncAndRoutingIncludes.includes(true)
    ? true
    : platformSyncAndRoutingIncludes.every(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            rolldownNImport2 === null,
        )
      ? null
      : false;
}

function resolvePlatformSyncAndRoutingPhone(
  platformSyncAndRoutingPhone?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSyncAndRoutingPhone.phone
    ? platformSyncAndRoutingPhone.canWrite === null
      ? true
      : !platformSyncAndRoutingPhone.canWrite
    : false;
}

var PlatformSyncAndRoutingState6: Dynamic;

var platformSyncAndRoutingValue_15: boolean;

var platformSyncAndRoutingValue0: number;

var platformSyncAndRoutingSet8: Dynamic;

var clearPlatformSyncAndRoutingDelete: Dynamic;

var resolvePlatformSyncAndRoutingValue21: Dynamic;

async function loadPlatformSyncAndRoutingValue(
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (platformSyncAndRoutingValue_15) return;
  platformSyncAndRoutingValue_15 = true;
  let platformSyncAndRoutingValue02 = platformSyncAndRoutingValue0;
  let platformSyncAndRoutingIncludes = resolvePlatformSyncAndRoutingIncludes(
    await Promise.all(
      platformSyncAndRoutingFilesWriteDataWriteValues.map(frameViewerCan),
    ),
  );
  if (
    !(
      platformSyncAndRoutingValue02 !== platformSyncAndRoutingValue0 ||
      platformSyncAndRoutingIncludes === PlatformSyncAndRoutingState6
    )
  ) {
    PlatformSyncAndRoutingState6 = platformSyncAndRoutingIncludes;
    for (let loadPlatformSyncAndRoutingValueResult of platformSyncAndRoutingSet8 as Dynamic)
      loadPlatformSyncAndRoutingValueResult();
  }
}

function usePlatformSyncAndRoutingPhone(..._extraArguments: unknown[]) {
  let phone: Dynamic = resolvePlatformSyncAndRoutingValue20();
  let canWrite: Dynamic = (0, React.useSyncExternalStore)(
    clearPlatformSyncAndRoutingDelete,
    resolvePlatformSyncAndRoutingValue21,
    resolvePlatformSyncAndRoutingValue21,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (phone) {
        loadPlatformSyncAndRoutingValue();
      }
    },
    [phone],
  );
  return resolvePlatformSyncAndRoutingPhone({
    phone: phone,
    canWrite: canWrite,
  });
}

var resolvePlatformSyncAndRoutingFeedback: Dynamic;

function FrameUnavailable(
  { what: what }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`frame-unavailable`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`CloudSlash`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {what}
        {` doesn’t open here`}
      </div>
      <div
        className={`text-secondary text-footnote max-w-md text-center`}
      >{`This kind of tab can’t be shown in this view yet.`}</div>
    </div>
  );
}

var PlatformSyncAndRoutingVersionHistoryV2: string;

function resolvePlatformSyncAndRoutingValue22(
  ..._extraArguments: unknown[]
): Dynamic {
  return usePlatformFeatureFlagsUseSyncExternalStore(
    PlatformSyncAndRoutingVersionHistoryV2,
  );
}

function resolvePlatformSyncAndRoutingValue23(
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformFeatureFlagsEnabled2(
    PlatformSyncAndRoutingVersionHistoryV2,
  );
}

function resolvePlatformSyncAndRoutingValue24(
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue22() && inFrame();
}

function resolvePlatformSyncAndRoutingValue25(
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue23() && inFrame();
}

var PlatformSyncAndRoutingVersionRedlineLegacy: string;

function resolvePlatformSyncAndRoutingValue26(
  ..._extraArguments: unknown[]
): Dynamic {
  return usePlatformFeatureFlagsUseSyncExternalStore(
    PlatformSyncAndRoutingVersionRedlineLegacy,
  );
}

var PlatformSyncAndRoutingSet: Dynamic;

var PlatformSyncAndRoutingPreview: Dynamic;

var PlatformSyncAndRoutingAssign2: ((platformSyncAndRoutingAssign2?: Dynamic, ..._extraArguments: unknown[]) => Dynamic) & {
    getState: (..._extraArguments: unknown[]) => Dynamic;
};

function resolvePlatformSyncAndRoutingIsFinite3(
  platformSyncAndRoutingIsFinite3?: unknown,
  ..._extraArguments: unknown[]
) {
  let max =
    typeof platformSyncAndRoutingIsFinite3 == `number` &&
    Number.isFinite(platformSyncAndRoutingIsFinite3)
      ? Math.max(0, Math.round(platformSyncAndRoutingIsFinite3))
      : 0;
  return max === 0 ? `` : `${max} embed${max === 1 ? `` : `s`} not compared`;
}

var PlatformSyncAndRoutingCompareMode: {
    compareMode: string;
    showChanges: boolean;
    stats: null;
    restoreOffers: number;
    phoneView: string;
    caption: null;
    stepOffers: number;
    stepAsk: {
        seq: number;
        dir: number;
    };
    restoreAsk: number;
    copyOffers: number;
    copyAsk: number;
    stackOffers: number;
    preparing: boolean;
    headEpoch: number;
    headDrivenId: null;
    headEmbedNodes: null;
    pick: number;
};

var PlatformSyncAndRoutingState7: Dynamic;

var resolvePlatformSyncAndRoutingCompareMode: Dynamic;

var resolvePlatformSyncAndRoutingShowChanges: Dynamic;

function updatePlatformSyncAndRoutingCompareMode(
  compareMode?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState({
    compareMode: compareMode,
  });
}

function updatePlatformSyncAndRoutingShowChanges(
  showChanges?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState({
    showChanges: showChanges,
  });
}

function updatePlatformSyncAndRoutingPreparing(
  preparing?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformSyncAndRoutingState7.getState().preparing !== preparing) {
    PlatformSyncAndRoutingState7.setState({
      preparing: preparing,
    });
  }
}

var resolvePlatformSyncAndRoutingPreparing: Dynamic;

function updatePlatformSyncAndRoutingHeadEpoch(
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingHeadEpoch2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      headEpoch: updatePlatformSyncAndRoutingHeadEpoch2.headEpoch + 1,
    }),
  );
}

var resolvePlatformSyncAndRoutingHeadEpoch: Dynamic;

function updatePlatformSyncAndRoutingHeadDrivenId(
  headDrivenId?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformSyncAndRoutingState7.getState().headDrivenId !== headDrivenId) {
    PlatformSyncAndRoutingState7.setState({
      headDrivenId: headDrivenId,
    });
  }
}

var resolvePlatformSyncAndRoutingHeadDrivenId: Dynamic;

function updatePlatformSyncAndRoutingPick(
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingPick2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      pick: updatePlatformSyncAndRoutingPick2.pick + 1,
      headDrivenId: null,
    }),
  );
}

var resolvePlatformSyncAndRoutingPick: Dynamic;

function updatePlatformSyncAndRoutingHeadEmbedNodes(
  page?: Dynamic,
  nodes?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let headEmbedNodes: Dynamic =
    PlatformSyncAndRoutingState7.getState().headEmbedNodes;
  if (nodes === null) {
    if (headEmbedNodes !== null && headEmbedNodes.page === page) {
      PlatformSyncAndRoutingState7.setState({
        headEmbedNodes: null,
      });
    }
    return;
  }
  if (
    headEmbedNodes === null ||
    headEmbedNodes.page !== page ||
    headEmbedNodes.nodes !== nodes
  ) {
    PlatformSyncAndRoutingState7.setState({
      headEmbedNodes: {
        page: page,
        nodes: nodes,
      },
    });
  }
}

var resolvePlatformSyncAndRoutingHeadEmbedNodes: Dynamic;

function updatePlatformSyncAndRoutingStats(
  stats?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (stats === null) {
    PlatformSyncAndRoutingState7.setState({
      stats: null,
    });
    return;
  }
  let id: Dynamic = PlatformSyncAndRoutingAssign2.getState().preview?.id;
  if (!(id === undefined || (options !== undefined && options !== id))) {
    PlatformSyncAndRoutingState7.setState({
      stats: {
        id: id,
        stats: stats,
      },
    });
  }
}

var resolvePlatformSyncAndRoutingStats: Dynamic;

function resolvePlatformSyncAndRoutingPreview(
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSyncAndRoutingAssign22: Dynamic = PlatformSyncAndRoutingAssign2(
    (
      platformSyncAndRoutingPreview?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingPreview.preview?.id ?? null,
  );
  return resolvePlatformSyncAndRoutingStats(
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingPreview?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingPreview.stats,
    ),
    PlatformSyncAndRoutingAssign22,
  );
}

function updatePlatformSyncAndRoutingValue(
  updatePlatformSyncAndRoutingValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingValue3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      [updatePlatformSyncAndRoutingValue2]:
        updatePlatformSyncAndRoutingValue3[updatePlatformSyncAndRoutingValue2] +
        1,
    }),
  );
  let enabled = false;
  return (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      PlatformSyncAndRoutingState7.setState(
        (
          updatePlatformSyncAndRoutingValue3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          [updatePlatformSyncAndRoutingValue2]: Math.max(
            0,
            updatePlatformSyncAndRoutingValue3[
              updatePlatformSyncAndRoutingValue2
            ] - 1,
          ),
        }),
      );
    }
  };
}

function resolvePlatformSyncAndRoutingRestoreOffers(
  ..._extraArguments: unknown[]
): Dynamic {
  return updatePlatformSyncAndRoutingValue(`restoreOffers`);
}

function resolvePlatformSyncAndRoutingCopyOffers(
  ..._extraArguments: unknown[]
): Dynamic {
  return updatePlatformSyncAndRoutingValue(`copyOffers`);
}

function resolvePlatformSyncAndRoutingStackOffers(
  ..._extraArguments: unknown[]
): Dynamic {
  return updatePlatformSyncAndRoutingValue(`stackOffers`);
}

var resolvePlatformSyncAndRoutingStackOffers2: Dynamic;

function updatePlatformSyncAndRoutingPhoneView(
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformSyncAndRoutingState7.getState().phoneView !== `list`) {
    PlatformSyncAndRoutingState7.setState({
      phoneView: `list`,
    });
  }
}

function updatePlatformSyncAndRoutingPhoneView2(
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState({
    phoneView: `preview`,
  });
}

function resolvePlatformSyncAndRoutingList(
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSyncAndRoutingAssign22: Dynamic = PlatformSyncAndRoutingAssign2(
    (platformSyncAndRoutingList?: Dynamic, ..._extraArguments: unknown[]) =>
      platformSyncAndRoutingList.preview !== null,
  );
  let PlatformSyncAndRoutingState72: Dynamic = PlatformSyncAndRoutingState7(
    (
      platformSyncAndRoutingList?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingList.phoneView,
  );
  return PlatformSyncAndRoutingAssign22
    ? PlatformSyncAndRoutingState72
    : `list`;
}

function updatePlatformSyncAndRoutingCaption(
  updatePlatformSyncAndRoutingCaption2?: Dynamic,
  who?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState({
    caption: {
      id: updatePlatformSyncAndRoutingCaption2,
      who: who,
    },
  });
}

function resolvePlatformSyncAndRoutingPreview2(
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSyncAndRoutingAssign22: Dynamic = PlatformSyncAndRoutingAssign2(
    (
      platformSyncAndRoutingPreview2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingPreview2.preview?.id ?? null,
  );
  let PlatformSyncAndRoutingState72: Dynamic = PlatformSyncAndRoutingState7(
    (
      platformSyncAndRoutingPreview2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingPreview2.caption,
  );
  return PlatformSyncAndRoutingState72 !== null &&
    PlatformSyncAndRoutingState72.id === PlatformSyncAndRoutingAssign22
    ? PlatformSyncAndRoutingState72.who
    : null;
}

function resolvePlatformSyncAndRoutingStepOffers(
  ..._extraArguments: unknown[]
): Dynamic {
  return updatePlatformSyncAndRoutingValue(`stepOffers`);
}

var resolvePlatformSyncAndRoutingStepOffers2: Dynamic;

function updatePlatformSyncAndRoutingStepAsk(
  dir?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingStepAsk2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      stepAsk: {
        seq: updatePlatformSyncAndRoutingStepAsk2.stepAsk.seq + 1,
        dir: dir,
      },
    }),
  );
}

var resolvePlatformSyncAndRoutingStepAsk: Dynamic;

var resolvePlatformSyncAndRoutingStepAsk2: Dynamic;

function updatePlatformSyncAndRoutingRestoreAsk(
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingRestoreAsk2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      restoreAsk: updatePlatformSyncAndRoutingRestoreAsk2.restoreAsk + 1,
    }),
  );
}

var resolvePlatformSyncAndRoutingRestoreAsk: Dynamic;

function updatePlatformSyncAndRoutingCopyAsk(
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingState7.setState(
    (
      updatePlatformSyncAndRoutingCopyAsk2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      copyAsk: updatePlatformSyncAndRoutingCopyAsk2.copyAsk + 1,
    }),
  );
}

var resolvePlatformSyncAndRoutingCopyAsk: Dynamic;

var resolvePlatformSyncAndRoutingCopyOffers2: Dynamic;

var resolvePlatformSyncAndRoutingRestoreOffers2: Dynamic;

var PlatformSyncAndRoutingCanRename: Dynamic;

var PlatformSyncAndRoutingState8: symbol;

var PlatformSyncAndRoutingCreateContext: Dynamic;

var resolvePlatformSyncAndRoutingValue27: (..._extraArguments: unknown[]) => undefined;

var PlatformSyncAndRoutingBatch: typeof resolvePlatformSyncAndRoutingValue27 & {
    batch: typeof resolvePlatformSyncAndRoutingValue27;
};

function PlatformSyncAndRoutingDoor(
  { door: door, ambient: ambient, children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let collectPlatformApiAndAuthVerb2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      door === undefined
        ? PlatformSyncAndRoutingState8
        : collectPlatformApiAndAuthVerb(door, ambient),
    [door, ambient],
  );
  return (
    <PlatformSyncAndRoutingCreateContext.Provider
      value={collectPlatformApiAndAuthVerb2}
    >
      {children}
    </PlatformSyncAndRoutingCreateContext.Provider>
  );
}

function resolvePlatformSyncAndRoutingUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(
    PlatformSyncAndRoutingCreateContext,
  );
  if (useContext === undefined)
    throw Error(
      `useIntend: no <IntendProvider> above this component — mount one at the page root (httpDoor for the live mount, takeDoor for a filmed one)`,
    );
  return useContext === PlatformSyncAndRoutingState8
    ? PlatformSyncAndRoutingBatch
    : useContext;
}

function resolvePlatformSyncAndRoutingUseContext2(
  ..._extraArguments: unknown[]
) {
  let useContext: Dynamic = (0, React.useContext)(
    PlatformSyncAndRoutingCreateContext,
  );
  if (useContext === undefined)
    throw Error(
      `useIntendReady: no <IntendProvider> above this component — mount one at the page root (httpDoor for the live mount, takeDoor for a filmed one)`,
    );
  return useContext !== PlatformSyncAndRoutingState8;
}

function PlatformSyncAndRoutingLabel(
  { label: label }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`text-muted text-footnote flex h-full items-center justify-center p-6`}
    >
      {label ?? `Loading…`}
    </div>
  );
}

function PlatformSyncAndRoutingLabel2(
  { label = `Loading workbook…` }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return <PlatformSyncAndRoutingLabel label={label} />;
}

var PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz: string;

var PlatformSyncAndRoutingState9: string;

var PlatformSyncAndRoutingState10: string;

var PlatformSyncAndRoutingState11: string;

var resolvePlatformSyncAndRoutingIndexOf2: Dynamic;

function resolvePlatformSyncAndRoutingSlice(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let index = 0;
  for (
    ;
    index < items.length &&
    index < items2.length &&
    items[index] === items2[index];

  )
    index++;
  if (index > 0)
    return (
      items.slice(0, index) +
      resolvePlatformSyncAndRoutingSlice(
        items.slice(index),
        items2.slice(index),
      )
    );
  let platformSyncAndRoutingIndexOf2: Dynamic = items.length
    ? resolvePlatformSyncAndRoutingIndexOf2(items[0])
    : 0;
  let platformSyncAndRoutingIndexOf22: Dynamic = items2.length
    ? resolvePlatformSyncAndRoutingIndexOf2(items2[0])
    : 62;
  return platformSyncAndRoutingIndexOf22 - platformSyncAndRoutingIndexOf2 > 1
    ? PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[
        Math.floor(
          (platformSyncAndRoutingIndexOf2 + platformSyncAndRoutingIndexOf22) /
            2,
        )
      ]
    : items.length
      ? items[0] + resolvePlatformSyncAndRoutingSlice(items.slice(1), ``)
      : PlatformSyncAndRoutingState9 +
        resolvePlatformSyncAndRoutingSlice(``, items2.slice(1));
}

function resolvePlatformSyncAndRoutingEndsWith(
  platformSyncAndRoutingEnds?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    platformSyncAndRoutingEnds !== null &&
    options !== null &&
    platformSyncAndRoutingEnds >= options
  )
    throw Error(`fracIndex: ${platformSyncAndRoutingEnds} >= ${options}`);
  if (platformSyncAndRoutingEnds === null && options === null)
    return PlatformSyncAndRoutingState10;
  if (platformSyncAndRoutingEnds === null) {
    let platformSyncAndRoutingSlice2: Dynamic =
      resolvePlatformSyncAndRoutingSlice(``, options);
    return platformSyncAndRoutingSlice2.endsWith(PlatformSyncAndRoutingState9)
      ? platformSyncAndRoutingSlice2 + PlatformSyncAndRoutingState10
      : platformSyncAndRoutingSlice2;
  }
  if (options === null) {
    if (platformSyncAndRoutingEnds < PlatformSyncAndRoutingState11) {
      let platformSyncAndRoutingSlice2: Dynamic =
        resolvePlatformSyncAndRoutingSlice(
          platformSyncAndRoutingEnds,
          PlatformSyncAndRoutingState11,
        );
      return platformSyncAndRoutingSlice2.endsWith(PlatformSyncAndRoutingState9)
        ? platformSyncAndRoutingSlice2 + PlatformSyncAndRoutingState10
        : platformSyncAndRoutingSlice2;
    }
    return platformSyncAndRoutingEnds + PlatformSyncAndRoutingState10;
  }
  let platformSyncAndRoutingSlice: Dynamic = resolvePlatformSyncAndRoutingSlice(
    platformSyncAndRoutingEnds,
    options,
  );
  return platformSyncAndRoutingSlice.endsWith(PlatformSyncAndRoutingState9)
    ? platformSyncAndRoutingSlice + PlatformSyncAndRoutingState10
    : platformSyncAndRoutingSlice;
}

function resolvePlatformSyncAndRoutingValue28(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0)
    return resolvePlatformSyncAndRoutingEndsWith(null, null);
  let itemItem: Dynamic = items[0];
  for (let resolvePlatformSyncAndRoutingValue28Result of items as Dynamic)
    if (resolvePlatformSyncAndRoutingValue28Result > itemItem) {
      itemItem = resolvePlatformSyncAndRoutingValue28Result;
    }
  return resolvePlatformSyncAndRoutingEndsWith(itemItem, null);
}

var resolvePlatformSyncAndRoutingPath: Dynamic;

var resolvePlatformSyncAndRoutingPath2: Dynamic;

var updatePlatformSyncAndRoutingSubtabOf: Dynamic;

function updatePlatformSyncAndRoutingDirectory(
  updatePlatformSyncAndRoutingDirectory2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof updatePlatformSyncAndRoutingDirectory2 != `object` ||
    !updatePlatformSyncAndRoutingDirectory2
  )
    return new (Map as Dynamic)();
  let updatePlatformSyncAndRoutingDirectory3: Dynamic =
    updatePlatformSyncAndRoutingDirectory2;
  let updatePlatformSyncAndRoutingSubtabOf2: Dynamic =
    updatePlatformSyncAndRoutingSubtabOf(
      updatePlatformSyncAndRoutingDirectory3.directory,
    );
  for (let [
    updatePlatformSyncAndRoutingDirectoryResult,
    updatePlatformSyncAndRoutingDirectoryResult2,
  ] of updatePlatformSyncAndRoutingSubtabOf(
    updatePlatformSyncAndRoutingDirectory3.tabs,
  ) as Dynamic)
    updatePlatformSyncAndRoutingSubtabOf2.set(
      updatePlatformSyncAndRoutingDirectoryResult,
      updatePlatformSyncAndRoutingDirectoryResult2,
    );
  return updatePlatformSyncAndRoutingSubtabOf2;
}

var PlatformSyncAndRoutingRoot: symbol;

var getPlatformSyncAndRoutingValue: Dynamic;

var resolvePlatformSyncAndRoutingOrder: (platformSyncAndRoutingOrder?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => number;

var updatePlatformSyncAndRoutingKeys: Dynamic;

function updatePlatformSyncAndRoutingEntry(
  updatePlatformSyncAndRoutingEntry2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    updatePlatformSyncAndRoutingEntryResult,
    entry,
  ] of updatePlatformSyncAndRoutingEntry2 as Dynamic)
    lookup.set(updatePlatformSyncAndRoutingEntryResult, {
      id: updatePlatformSyncAndRoutingEntryResult,
      entry: entry,
      children: [],
    });
  let items: Dynamic = [];
  for (let [
    updatePlatformSyncAndRoutingEntryResult,
    updatePlatformSyncAndRoutingEntryResult2,
  ] of updatePlatformSyncAndRoutingKeys(
    updatePlatformSyncAndRoutingEntry2,
  ) as Dynamic) {
    let mappedUpdatePlatformSyncAndRoutingEntryResult: Dynamic =
      updatePlatformSyncAndRoutingEntryResult2.map(
        (
          updatePlatformSyncAndRoutingEntryResult3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => lookup.get(updatePlatformSyncAndRoutingEntryResult3),
      );
    mappedUpdatePlatformSyncAndRoutingEntryResult.sort(
      resolvePlatformSyncAndRoutingOrder,
    );
    if (
      updatePlatformSyncAndRoutingEntryResult === PlatformSyncAndRoutingRoot
    ) {
      (items.push as Dynamic)(...mappedUpdatePlatformSyncAndRoutingEntryResult);
    } else {
      lookup.get(updatePlatformSyncAndRoutingEntryResult).children =
        mappedUpdatePlatformSyncAndRoutingEntryResult;
    }
  }
  return items;
}

function getPlatformSyncAndRoutingValue2(
  platformSyncAndRoutingValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let subtabOf: Dynamic = options.get(platformSyncAndRoutingValue2)?.subtabOf;
  for (
    ;
    subtabOf !== undefined &&
    options.has(subtabOf) &&
    !uniqueItems.has(subtabOf);

  ) {
    uniqueItems.add(subtabOf);
    subtabOf = options.get(subtabOf)?.subtabOf;
  }
  return uniqueItems;
}

function resolvePlatformSyncAndRoutingPush2(
  platformSyncAndRoutingPush2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)([
    platformSyncAndRoutingPush2,
  ]);
  let platformSyncAndRoutingValue: Dynamic = getPlatformSyncAndRoutingValue(
    platformSyncAndRoutingPush2,
    options,
  );
  for (
    ;
    platformSyncAndRoutingValue !== undefined &&
    !uniqueItems.has(platformSyncAndRoutingValue);

  ) {
    uniqueItems.add(platformSyncAndRoutingValue);
    items.push(platformSyncAndRoutingValue);
    platformSyncAndRoutingValue = getPlatformSyncAndRoutingValue(
      platformSyncAndRoutingValue,
      options,
    );
  }
  return items;
}

var resolvePlatformSyncAndRoutingPath3: Dynamic;

var resolvePlatformSyncAndRoutingVerb3: Dynamic;

var resolvePlatformSyncAndRoutingPath4: Dynamic;

var resolvePlatformSyncAndRoutingName: Dynamic;

var resolvePlatformSyncAndRoutingValue29: Dynamic;

var PlatformSyncAndRoutingUntitled: string;

var resolvePlatformSyncAndRoutingUntitled: Dynamic;

var platformSyncAndRoutingPattern11: RegExp;

var resolvePlatformSyncAndRoutingTest2: Dynamic;

function resolvePlatformSyncAndRoutingTab(
  platformSyncAndRoutingTab?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count: number = 0;
  let enabled = false;
  for (let resolvePlatformSyncAndRoutingTabResult of platformSyncAndRoutingTab.values() as Dynamic) {
    let match = platformSyncAndRoutingPattern11.exec(
      resolvePlatformSyncAndRoutingTabResult.name ?? ``,
    );
    if (match !== null && Number(match[1]) > count) {
      count = Number(match[1]);
    }
    if (
      resolvePlatformSyncAndRoutingUntitled(
        resolvePlatformSyncAndRoutingTabResult.name,
      )
    ) {
      enabled = true;
    }
  }
  let total: Dynamic =
    platformSyncAndRoutingTab.size + (options === undefined ? 0 : 1);
  if (enabled && total > count) {
    count = total;
  }
  return `Tab ` + String(count + 1);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformSyncAndRouting2Step1(): void {
  (resolvePlatformSyncAndRoutingValue17 = (
    platformSyncAndRoutingValue17?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSyncAndRoutingValue17 == `object` &&
    platformSyncAndRoutingValue17 &&
    !Array.isArray(platformSyncAndRoutingValue17)
      ? platformSyncAndRoutingValue17
      : {});
  (resolvePlatformSyncAndRoutingHeading = (
    ..._extraArguments: unknown[]
  ) => [
    {
      type: `paragraph`,
      attrs: {
        heading: 1,
      },
    },
    {
      type: `paragraph`,
    },
  ]);
  (platformSyncAndRoutingSet6 = new (Set as Dynamic)([
    `bid`,
    `id`,
    `commentIds`,
    `uploading`,
    `selected`,
    `width`,
    `background`,
    `backgroundColor`,
    `align`,
  ]));
  (platformSyncAndRoutingSet7 = new (Set as Dynamic)([
    `cell`,
    `tableCell`,
    `tableHeader`,
  ]));
  (resolvePlatformSyncAndRoutingDeny = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    response.verdict === `deny` &&
    (response.reason === `bad_request` || response.reason === `intent-shape`));
  (resolvePlatformSyncAndRoutingSpreadsheet = (
    platformSyncAndRoutingSpreadsheet?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformSyncAndRoutingSpreadsheet === `spreadsheet` ? `spreadsheet` : `tab`);
  (PlatformSyncAndRoutingBirthRefused = class extends Error {
    [key: string]: Dynamic;
    reason: Dynamic;
    why: Dynamic;
    object: Dynamic;
    constructor(
      platformSyncAndRoutingBirthRefused?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        resolvePlatformSyncAndRoutingUnavailable(
          platformSyncAndRoutingBirthRefused,
          options,
        ),
      );
      this.name = `BirthRefused`;
      this.reason =
        typeof platformSyncAndRoutingBirthRefused.reason == `string`
          ? platformSyncAndRoutingBirthRefused.reason
          : undefined;
      let platformSyncAndRoutingValue17: Dynamic =
        resolvePlatformSyncAndRoutingValue17(
          platformSyncAndRoutingBirthRefused.data,
        );
      let why: Dynamic = platformSyncAndRoutingValue17.why;
      this.why = typeof why == `string` ? why : undefined;
      let object2: Dynamic =
        typeof platformSyncAndRoutingValue17.object == `string`
          ? platformSyncAndRoutingValue17.object
          : platformSyncAndRoutingValue17.kind === `blob`
            ? `blob`
            : resolvePlatformSyncAndRoutingValue17(
                platformSyncAndRoutingValue17.ref,
              ).object;
      this.object = typeof object2 == `string` ? object2 : undefined;
    }
  });
  (resolvePlatformSyncAndRoutingIndexOf = (
    platformSyncAndRoutingIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformSyncAndRoutingIndexIndex: Dynamic =
      platformSyncAndRoutingIndex.indexOf(`@`);
    return platformSyncAndRoutingIndexIndex > 0
      ? platformSyncAndRoutingIndex.slice(0, platformSyncAndRoutingIndexIndex)
      : platformSyncAndRoutingIndex;
  });
  (resolvePlatformSyncAndRoutingValue18 = (
    ..._extraArguments: [
      props?: Readonly<Record<string, unknown>>,
      ...ignored: unknown[],
    ]
  ) => null);
  (resolvePlatformSyncAndRoutingValue19 = (
    ..._extraArguments: [
      props?: Readonly<Record<string, unknown>>,
      ...ignored: unknown[],
    ]
  ) => null);
  (platformSyncAndRoutingWeakMap2 = new (WeakMap as Dynamic)());
  (platformSyncAndRoutingFilesWriteDataWriteValues = [
    `files.write`,
    `data.write`,
  ]);
  (PlatformSyncAndRoutingState6 = null);
  (platformSyncAndRoutingValue_15 = false);
  (platformSyncAndRoutingValue0 = 0);
  (platformSyncAndRoutingSet8 = new (Set as Dynamic)());
  (clearPlatformSyncAndRoutingDelete = (
    clearPlatformSyncAndRoutingDelete2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    platformSyncAndRoutingSet8.add(clearPlatformSyncAndRoutingDelete2),
    (..._extraArguments: unknown[]): undefined => {
      platformSyncAndRoutingSet8.delete(clearPlatformSyncAndRoutingDelete2);
    }
  ));
  (resolvePlatformSyncAndRoutingValue21 = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformSyncAndRoutingState6);
  (resolvePlatformSyncAndRoutingFeedback = (
    platformSyncAndRoutingFeedback?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => api.feedback(platformSyncAndRoutingFeedback));
  (PlatformSyncAndRoutingVersionHistoryV2 = `versionHistoryV2`);
  (PlatformSyncAndRoutingVersionRedlineLegacy = `versionRedlineLegacy`);
  (PlatformSyncAndRoutingSet = {
    set: (preview?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      updatePlatformSyncAndRoutingPick();
      resolvePlatformApiAndAuthDispatch({
        type: `history-preview`,
        preview: preview,
      });
    },
    reissue: (preview?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      resolvePlatformApiAndAuthDispatch({
        type: `history-preview`,
        preview: preview,
      });
    },
    clear: (..._extraArguments: unknown[]): undefined => {
      updatePlatformSyncAndRoutingPick();
      updatePlatformSyncAndRoutingPhoneView();
      resolvePlatformApiAndAuthDispatch({
        type: `history-preview-clear`,
      });
    },
  });
  (PlatformSyncAndRoutingPreview = updatePlatformApiAndAuthDeps(
    (
      platformSyncAndRoutingPreview?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [platformSyncAndRoutingPreview.historyPreview],
    (
      platformSyncAndRoutingPreview?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      preview: platformSyncAndRoutingPreview.historyPreview,
      ...PlatformSyncAndRoutingSet,
    }),
  ));
  (PlatformSyncAndRoutingAssign2 = Object.assign(
    function (
      platformSyncAndRoutingAssign2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolvePlatformApiAndAuthState3(
        PlatformSyncAndRoutingPreview,
        platformSyncAndRoutingAssign2,
      );
    },
    {
      getState: (..._extraArguments: unknown[]): Dynamic =>
        PlatformSyncAndRoutingPreview(
          resolvePlatformApiAndAuthState4(),
          PlatformApiAndAuthState2,
        ),
    },
  ));
  (PlatformSyncAndRoutingCompareMode = {
    compareMode: `previous`,
    showChanges: true,
    stats: null,
    restoreOffers: 0,
    phoneView: `list`,
    caption: null,
    stepOffers: 0,
    stepAsk: {
      seq: 0,
      dir: 1,
    },
    restoreAsk: 0,
    copyOffers: 0,
    copyAsk: 0,
    stackOffers: 0,
    preparing: false,
    headEpoch: 0,
    headDrivenId: null,
    headEmbedNodes: null,
    pick: 0,
  });
  (PlatformSyncAndRoutingState7 = create(
    (..._extraArguments: unknown[]) => ({
      ...PlatformSyncAndRoutingCompareMode,
    }),
  ));
  (resolvePlatformSyncAndRoutingCompareMode = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingCompareMode?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingCompareMode.compareMode,
    ));
  (resolvePlatformSyncAndRoutingShowChanges = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingShowChanges?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingShowChanges.showChanges,
    ));
  (resolvePlatformSyncAndRoutingPreparing = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingPreparing?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingPreparing.preparing,
    ));
  (resolvePlatformSyncAndRoutingHeadEpoch = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingHeadEpoch?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingHeadEpoch.headEpoch,
    ));
  (resolvePlatformSyncAndRoutingHeadDrivenId = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingHeadDrivenId?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingHeadDrivenId.headDrivenId,
    ));
  (resolvePlatformSyncAndRoutingPick = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingPick?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingPick.pick,
    ));
  (resolvePlatformSyncAndRoutingHeadEmbedNodes = (
    platformSyncAndRoutingHeadEmbedNodes?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingHeadEmbedNodes2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformSyncAndRoutingHeadEmbedNodes2.headEmbedNodes !== null &&
        platformSyncAndRoutingHeadEmbedNodes2.headEmbedNodes.page ===
          platformSyncAndRoutingHeadEmbedNodes
          ? platformSyncAndRoutingHeadEmbedNodes2.headEmbedNodes.nodes
          : null,
    ));
  (resolvePlatformSyncAndRoutingStats = (
    platformSyncAndRoutingStats?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSyncAndRoutingStats !== null &&
    platformSyncAndRoutingStats.id === options
      ? platformSyncAndRoutingStats.stats
      : null);
  (resolvePlatformSyncAndRoutingStackOffers2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (platformSyncAndRoutingStack?: Dynamic, ..._extraArguments: unknown[]) =>
        platformSyncAndRoutingStack.stackOffers > 0,
    ));
  (resolvePlatformSyncAndRoutingStepOffers2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (platformSyncAndRoutingStep?: Dynamic, ..._extraArguments: unknown[]) =>
        platformSyncAndRoutingStep.stepOffers > 0,
    ));
  (resolvePlatformSyncAndRoutingStepAsk = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingStepAsk?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingStepAsk.stepAsk,
    ));
  (resolvePlatformSyncAndRoutingStepAsk2 = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformSyncAndRoutingState7.getState().stepAsk);
  (resolvePlatformSyncAndRoutingRestoreAsk = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingRestoreAsk?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingRestoreAsk.restoreAsk,
    ));
  (resolvePlatformSyncAndRoutingCopyAsk = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (
        platformSyncAndRoutingCopyAsk?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingCopyAsk.copyAsk,
    ));
  (resolvePlatformSyncAndRoutingCopyOffers2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (platformSyncAndRoutingCopy?: Dynamic, ..._extraArguments: unknown[]) =>
        platformSyncAndRoutingCopy.copyOffers > 0,
    ));
  (resolvePlatformSyncAndRoutingRestoreOffers2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingState7(
      (platformSyncAndRoutingRestore?: Dynamic, ..._extraArguments: unknown[]) =>
        platformSyncAndRoutingRestore.restoreOffers > 0,
    ));
  (PlatformSyncAndRoutingCanRename = create(
    (
      platformSyncAndRoutingCanRename?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      onLeft: false,
      canRename: false,
      panelHeadings: false,
      set: (
        { onLeft: onLeft, canRename = false, panelHeadings = false }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformSyncAndRoutingCanRename(
          (
            platformSyncAndRoutingCanRename2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            platformSyncAndRoutingCanRename2.onLeft === onLeft &&
            platformSyncAndRoutingCanRename2.canRename === canRename &&
            platformSyncAndRoutingCanRename2.panelHeadings === panelHeadings
              ? platformSyncAndRoutingCanRename2
              : {
                  onLeft: onLeft,
                  canRename: canRename,
                  panelHeadings: panelHeadings,
                },
        ),
    }),
  ));
  (PlatformSyncAndRoutingState8 = Symbol(`intend: doorless mount`));
  (PlatformSyncAndRoutingCreateContext = (0, React.createContext)(
    undefined,
  ));
  (resolvePlatformSyncAndRoutingValue27 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    throw Error(
      `intend: door not ready — the page's project row is still loading, or this is not a project write surface; there is no room to write to (and deliberately no default door to guess one). Gate the affordance on useIntendReady() to avoid this window`,
    );
  });
  (PlatformSyncAndRoutingBatch = Object.assign(
    resolvePlatformSyncAndRoutingValue27,
    {
      batch: resolvePlatformSyncAndRoutingValue27,
    },
  ));
  (PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`);
  (PlatformSyncAndRoutingState9 = PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[0]);
  (PlatformSyncAndRoutingState10 = PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[31]);
  (PlatformSyncAndRoutingState11 = PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[61]);
  (resolvePlatformSyncAndRoutingIndexOf2 = (
    platformSyncAndRoutingIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzIndex =
      PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.indexOf(
        platformSyncAndRoutingIndex,
      );
    if (
      PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzIndex <
      0
    )
      throw Error(
        `fracIndex: invalid digit ${JSON.stringify(platformSyncAndRoutingIndex)}`,
      );
    return PlatformSyncAndRouting0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzIndex;
  });
  (resolvePlatformSyncAndRoutingPath = (
    platformSyncAndRoutingPath?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    op: `delete`,
    path: [`directory`, platformSyncAndRoutingPath],
  }));
  (resolvePlatformSyncAndRoutingPath2 = (
    platformSyncAndRoutingPath2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    {
      op: `delete`,
      path: [`tabs`, platformSyncAndRoutingPath2],
    },
    resolvePlatformSyncAndRoutingPath(platformSyncAndRoutingPath2),
  ]);
  (updatePlatformSyncAndRoutingSubtabOf = (
    updatePlatformSyncAndRoutingSubtab?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)();
    if (
      typeof updatePlatformSyncAndRoutingSubtab != `object` ||
      !updatePlatformSyncAndRoutingSubtab
    )
      return lookup;
    for (let [
      updatePlatformSyncAndRoutingSubtabOfResult,
      updatePlatformSyncAndRoutingSubtabOfResult2,
    ] of Object.entries(updatePlatformSyncAndRoutingSubtab) as Dynamic) {
      if (
        typeof updatePlatformSyncAndRoutingSubtabOfResult2 != `object` ||
        !updatePlatformSyncAndRoutingSubtabOfResult2
      )
        continue;
      let {
        name: updatePlatformSyncAndRoutingSubtabOfResult3,
        subtabOf: updatePlatformSyncAndRoutingSubtabOfResult4,
        dir: updatePlatformSyncAndRoutingSubtabOfResult5,
        order: updatePlatformSyncAndRoutingSubtabOfResult6,
      }: Dynamic = updatePlatformSyncAndRoutingSubtabOfResult2;
      let record2: Dynamic = {};
      if (updatePlatformSyncAndRoutingSubtabOfResult3 !== undefined) {
        if (
          typeof updatePlatformSyncAndRoutingSubtabOfResult3 != `string` ||
          updatePlatformSyncAndRoutingSubtabOfResult3.length === 0
        )
          continue;
        record2.name = updatePlatformSyncAndRoutingSubtabOfResult3;
      }
      let updatePlatformSyncAndRoutingSubtabOfResult7 =
        typeof updatePlatformSyncAndRoutingSubtabOfResult4 == `string` &&
        updatePlatformSyncAndRoutingSubtabOfResult4.length > 0
          ? updatePlatformSyncAndRoutingSubtabOfResult4
          : typeof updatePlatformSyncAndRoutingSubtabOfResult5 == `string` &&
              updatePlatformSyncAndRoutingSubtabOfResult5.length > 0
            ? updatePlatformSyncAndRoutingSubtabOfResult5
            : undefined;
      if (updatePlatformSyncAndRoutingSubtabOfResult7 !== undefined) {
        record2.subtabOf = updatePlatformSyncAndRoutingSubtabOfResult7;
      }
      if (
        typeof updatePlatformSyncAndRoutingSubtabOfResult6 == `string` &&
        updatePlatformSyncAndRoutingSubtabOfResult6.length > 0
      ) {
        record2.order = updatePlatformSyncAndRoutingSubtabOfResult6;
      }
      lookup.set(updatePlatformSyncAndRoutingSubtabOfResult, record2);
    }
    return lookup;
  });
  (PlatformSyncAndRoutingRoot = Symbol(`root`));
  (getPlatformSyncAndRoutingValue = (
    platformSyncAndRoutingValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let subtabOf: Dynamic = options.get(platformSyncAndRoutingValue)?.subtabOf;
    if (subtabOf === undefined || !options.has(subtabOf)) return;
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let subtabOf2: Dynamic = subtabOf;
    for (; subtabOf2 !== undefined && options.has(subtabOf2); ) {
      if (subtabOf2 === platformSyncAndRoutingValue) return;
      if (uniqueItems.has(subtabOf2)) return subtabOf;
      uniqueItems.add(subtabOf2);
      subtabOf2 = options.get(subtabOf2)?.subtabOf;
    }
    return subtabOf;
  });
  (resolvePlatformSyncAndRoutingOrder = (
    platformSyncAndRoutingOrder?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let order: Dynamic = platformSyncAndRoutingOrder.entry.order;
    let order2: Dynamic = options.entry.order;
    return order !== undefined && order2 !== undefined
      ? order < order2
        ? -1
        : order > order2
          ? 1
          : platformSyncAndRoutingOrder.id < options.id
            ? -1
            : +(platformSyncAndRoutingOrder.id > options.id)
      : order === undefined
        ? order2 === undefined
          ? platformSyncAndRoutingOrder.id < options.id
            ? -1
            : +(platformSyncAndRoutingOrder.id > options.id)
          : 1
        : -1;
  });
  (updatePlatformSyncAndRoutingKeys = (
    updatePlatformSyncAndRoutingKeys2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let updatePlatformSyncAndRoutingKeysResult of updatePlatformSyncAndRoutingKeys2.keys() as Dynamic) {
      let platformSyncAndRoutingValue: Dynamic =
        getPlatformSyncAndRoutingValue(
          updatePlatformSyncAndRoutingKeysResult,
          updatePlatformSyncAndRoutingKeys2,
        ) ?? PlatformSyncAndRoutingRoot;
      let lookupEntry: Dynamic = lookup.get(platformSyncAndRoutingValue);
      if (lookupEntry === undefined) {
        lookup.set(platformSyncAndRoutingValue, [
          updatePlatformSyncAndRoutingKeysResult,
        ]);
      } else {
        lookupEntry.push(updatePlatformSyncAndRoutingKeysResult);
      }
    }
    return lookup;
  });
  (resolvePlatformSyncAndRoutingPath3 = (
    platformSyncAndRoutingPath3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    {
      op: `set`,
      path: [`tabs`, platformSyncAndRoutingPath3],
      value: options,
    },
    resolvePlatformSyncAndRoutingPath(platformSyncAndRoutingPath3),
  ]);
  (resolvePlatformSyncAndRoutingVerb3 = (
    platformSyncAndRoutingVerb3?: Dynamic,
    patch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `update`,
    engine: `json`,
    ref: {
      object: `project`,
      id: platformSyncAndRoutingVerb3,
    },
    payload: {
      engine: `json`,
      kind: `patch`,
      patch: patch,
    },
  }));
  (resolvePlatformSyncAndRoutingPath4 = (
    platformSyncAndRoutingPath4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    {
      op: `set`,
      path: [`name`],
      value: platformSyncAndRoutingPath4,
    },
  ]);
  (resolvePlatformSyncAndRoutingName = (
    platformSyncAndRoutingName?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {};
    record2.name = options;
    if (platformSyncAndRoutingName.subtabOf !== undefined) {
      record2.subtabOf = platformSyncAndRoutingName.subtabOf;
    }
    if (platformSyncAndRoutingName.order !== undefined) {
      record2.order = platformSyncAndRoutingName.order;
    }
    return record2;
  });
  (resolvePlatformSyncAndRoutingValue29 = (
    platformSyncAndRoutingValue29?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => resolvePlatformSyncAndRoutingPath2(platformSyncAndRoutingValue29));
  (PlatformSyncAndRoutingUntitled = `Untitled`);
  (resolvePlatformSyncAndRoutingUntitled = (
    platformSyncAndRoutingUntitled?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let trimmedPlatformSyncAndRoutingUntitled: Dynamic = (
      platformSyncAndRoutingUntitled ?? ``
    ).trim();
    return (
      trimmedPlatformSyncAndRoutingUntitled === `` ||
      trimmedPlatformSyncAndRoutingUntitled === `Untitled`
    );
  });
  (platformSyncAndRoutingPattern11 = /^Tab ([1-9][0-9]*)$/);
  (resolvePlatformSyncAndRoutingTest2 = (
    platformSyncAndRoutingTest2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSyncAndRoutingUntitled(platformSyncAndRoutingTest2) ||
    platformSyncAndRoutingPattern11.test(
      (platformSyncAndRoutingTest2 ?? ``).trim(),
    ));
}

export {
  FrameUnavailable,
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingBirthRefused,
  PlatformSyncAndRoutingCanRename,
  PlatformSyncAndRoutingDoor,
  PlatformSyncAndRoutingLabel2,
  PlatformSyncAndRoutingRoot,
  PlatformSyncAndRoutingUntitled,
  collectPlatformSyncAndRoutingEngine,
  collectPlatformSyncAndRoutingText,
  getPlatformSyncAndRoutingValue,
  getPlatformSyncAndRoutingValue2,
  loadPlatformSyncAndRoutingFinal,
  resolvePlatformSyncAndRoutingClaude,
  resolvePlatformSyncAndRoutingCompareMode,
  resolvePlatformSyncAndRoutingCopyAsk,
  resolvePlatformSyncAndRoutingCopyOffers,
  resolvePlatformSyncAndRoutingCopyOffers2,
  resolvePlatformSyncAndRoutingEndsWith,
  resolvePlatformSyncAndRoutingFeedback,
  resolvePlatformSyncAndRoutingHeadDrivenId,
  resolvePlatformSyncAndRoutingHeadEmbedNodes,
  resolvePlatformSyncAndRoutingHeadEpoch,
  resolvePlatformSyncAndRoutingIndexOf,
  resolvePlatformSyncAndRoutingIsFinite3,
  resolvePlatformSyncAndRoutingLid,
  resolvePlatformSyncAndRoutingList,
  resolvePlatformSyncAndRoutingName,
  resolvePlatformSyncAndRoutingOrder,
  resolvePlatformSyncAndRoutingPath3,
  resolvePlatformSyncAndRoutingPath4,
  resolvePlatformSyncAndRoutingPick,
  resolvePlatformSyncAndRoutingPreparing,
  resolvePlatformSyncAndRoutingPreview,
  resolvePlatformSyncAndRoutingPreview2,
  resolvePlatformSyncAndRoutingPush2,
  resolvePlatformSyncAndRoutingRef,
  resolvePlatformSyncAndRoutingRef2,
  resolvePlatformSyncAndRoutingRestoreAsk,
  resolvePlatformSyncAndRoutingRestoreOffers,
  resolvePlatformSyncAndRoutingRestoreOffers2,
  resolvePlatformSyncAndRoutingScheduled,
  resolvePlatformSyncAndRoutingScheduled2,
  resolvePlatformSyncAndRoutingScheduled3,
  resolvePlatformSyncAndRoutingShowChanges,
  resolvePlatformSyncAndRoutingStackOffers,
  resolvePlatformSyncAndRoutingStackOffers2,
  resolvePlatformSyncAndRoutingStepAsk,
  resolvePlatformSyncAndRoutingStepAsk2,
  resolvePlatformSyncAndRoutingStepOffers,
  resolvePlatformSyncAndRoutingStepOffers2,
  resolvePlatformSyncAndRoutingTab,
  resolvePlatformSyncAndRoutingTest2,
  resolvePlatformSyncAndRoutingUnavailable,
  resolvePlatformSyncAndRoutingUntitled,
  resolvePlatformSyncAndRoutingUseContext,
  resolvePlatformSyncAndRoutingUseContext2,
  resolvePlatformSyncAndRoutingValue18,
  resolvePlatformSyncAndRoutingValue19,
  resolvePlatformSyncAndRoutingValue20,
  resolvePlatformSyncAndRoutingValue22,
  resolvePlatformSyncAndRoutingValue23,
  resolvePlatformSyncAndRoutingValue24,
  resolvePlatformSyncAndRoutingValue25,
  resolvePlatformSyncAndRoutingValue26,
  resolvePlatformSyncAndRoutingValue28,
  resolvePlatformSyncAndRoutingValue29,
  resolvePlatformSyncAndRoutingVerb3,
  updatePlatformSyncAndRoutingCaption,
  updatePlatformSyncAndRoutingCompareMode,
  updatePlatformSyncAndRoutingCopyAsk,
  updatePlatformSyncAndRoutingDirectory,
  updatePlatformSyncAndRoutingEntry,
  updatePlatformSyncAndRoutingHeadDrivenId,
  updatePlatformSyncAndRoutingHeadEmbedNodes,
  updatePlatformSyncAndRoutingHeadEpoch,
  updatePlatformSyncAndRoutingKeys,
  updatePlatformSyncAndRoutingPhoneView,
  updatePlatformSyncAndRoutingPhoneView2,
  updatePlatformSyncAndRoutingPreparing,
  updatePlatformSyncAndRoutingRestoreAsk,
  updatePlatformSyncAndRoutingShowChanges,
  updatePlatformSyncAndRoutingStats,
  updatePlatformSyncAndRoutingStepAsk,
  usePlatformSyncAndRoutingPhone,
};

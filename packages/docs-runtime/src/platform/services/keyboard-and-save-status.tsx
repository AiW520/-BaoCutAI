/** BaoCut: platform keyboard and save status from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  clsx,
} from "../dependencies";
import {
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
} from "../ui/design-system";
import type * as ReactComponentTypes from "react";

export const DropZone_Overlay: ReactComponentTypes.FC<Dynamic> = ({
  dragState: dragState,
  className: className,
  ...dropZoneOverlay
}) => {
  return (
    <div
      {...dropZoneOverlay}
      aria-hidden={true}
      data-cds={`DropZone`}
      {...resolvePlatformKeyboardAndSaveStatusDataDragOver(dragState)}
      className={resolveUiDesignSystemValue2(
        `pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 shadow-drop-ring`,
        `outline-2 -outline-offset-2 outline-transparent`,
        `transition-opacity duration-snap ease-out motion-reduce:transition-none`,
        `data-[drag-over]:opacity-100`,
        `data-[drag-rejected]:shadow-drop-ring-danger`,
        className,
      )}
    >
      {
        <div
          className={resolveUiDesignSystemValue2(
            `absolute inset-0 rounded-[inherit] opacity-0 shadow-drop-glow`,
            `transition-opacity duration-slow ease-out motion-reduce:transition-none`,
            `[[data-drag-over]>&]:opacity-100`,
            `[[data-drag-over]>&]:delay-[100ms]`,
            `[[data-drag-rejected]>&]:shadow-drop-glow-danger`,
          )}
        />
      }
    </div>
  );
};

function resolvePlatformKeyboardAndSaveStatusDataDragOver(
  platformKeyboardAndSaveStatusDataDragOver?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return {
    "data-drag-over":
      platformKeyboardAndSaveStatusDataDragOver === `on-target` ||
      platformKeyboardAndSaveStatusDataDragOver === `rejected` ||
      undefined,
    "data-drag-rejected":
      platformKeyboardAndSaveStatusDataDragOver === `rejected` || undefined,
  };
}

var platformKeyboardAndSaveStatusValue3: number;

var platformKeyboardAndSaveStatusValue8: number;

var platformKeyboardAndSaveStatusValue32: number;

var PlatformKeyboardAndSaveStatusInlineStart: Dynamic;

var PlatformKeyboardAndSaveStatusOrientation: Dynamic;

var platformKeyboardAndSaveStatusValue2500: number;

var PlatformKeyboardAndSaveStatusState: Dynamic;

var platformKeyboardAndSaveStatusSet: Dynamic;

var resolvePlatformKeyboardAndSaveStatusValue: Dynamic;

function resolvePlatformKeyboardAndSaveStatusValue2(
  ..._extraArguments: unknown[]
): undefined {
  PlatformKeyboardAndSaveStatusState =
    resolvePlatformKeyboardAndSaveStatusValue();
  for (let resolvePlatformKeyboardAndSaveStatusValue2Result of platformKeyboardAndSaveStatusSet as Dynamic)
    resolvePlatformKeyboardAndSaveStatusValue2Result();
}

function resolvePlatformKeyboardAndSaveStatusValue3(
  ..._extraArguments: unknown[]
): number {
  return (
    resolvePlatformKeyboardAndSaveStatusValue() -
    PlatformKeyboardAndSaveStatusState
  );
}

function clearPlatformKeyboardAndSaveStatusDelete(
  clearPlatformKeyboardAndSaveStatusDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformKeyboardAndSaveStatusSet.add(
    clearPlatformKeyboardAndSaveStatusDelete2,
  );
  return (..._extraArguments: unknown[]): undefined => {
    platformKeyboardAndSaveStatusSet.delete(
      clearPlatformKeyboardAndSaveStatusDelete2,
    );
  };
}

var PlatformKeyboardAndSaveStatusKey: ({
    id: string;
    key: string;
    also: string[];
    label: string;
    scope: string;
    group: string;
    only?: undefined;
} | {
    id: string;
    key: string;
    label: string;
    scope: string;
    group: string;
    also?: undefined;
    only?: undefined;
} | {
    id: string;
    key: string;
    label: string;
    scope: string;
    group: string;
    only: string;
    also?: undefined;
} | {
    id: string;
    key: string;
    also: string[];
    label: string;
    scope: string;
    group: string;
    only: string;
})[];

function resolvePlatformKeyboardAndSaveStatusFind(
  platformKeyboardAndSaveStatusFind?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let PlatformKeyboardAndSaveStatusKey2 = PlatformKeyboardAndSaveStatusKey.find(
    (
      PlatformKeyboardAndSaveStatusKey3?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      PlatformKeyboardAndSaveStatusKey3.id ===
      platformKeyboardAndSaveStatusFind,
  );
  if (!PlatformKeyboardAndSaveStatusKey2)
    throw Error(`keymap: no chord "${platformKeyboardAndSaveStatusFind}"`);
  return PlatformKeyboardAndSaveStatusKey2;
}

function resolvePlatformKeyboardAndSaveStatusNavigator(
  platformKeyboardAndSaveStatusNavigator: Dynamic = (globalThis as Dynamic)
    .navigator,
  ..._extraArguments: unknown[]
) {
  return platformKeyboardAndSaveStatusNavigator
    ? /Mac|iPhone|iPad|iPod/.test(
        platformKeyboardAndSaveStatusNavigator.platform ?? ``,
      ) ||
        /Mac OS X/.test(platformKeyboardAndSaveStatusNavigator.userAgent ?? ``)
    : false;
}

var platformKeyboardAndSaveStatusModCtrlControlAltValues: string[];

function filterPlatformKeyboardAndSaveStatusMods(
  filterPlatformKeyboardAndSaveStatusMods3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filterPlatformKeyboardAndSaveStatusModsParts: Dynamic =
    filterPlatformKeyboardAndSaveStatusMods3.split(/-(?!$)/);
  let key: Dynamic =
    filterPlatformKeyboardAndSaveStatusModsParts[
      filterPlatformKeyboardAndSaveStatusModsParts.length - 1
    ] ?? ``;
  if (key === `Space`) {
    key = ` `;
  }
  return {
    mods: filterPlatformKeyboardAndSaveStatusModsParts
      .slice(0, -1)
      .filter(
        (
          filterPlatformKeyboardAndSaveStatusModsPartsSlice?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          platformKeyboardAndSaveStatusModCtrlControlAltValues.includes(
            filterPlatformKeyboardAndSaveStatusModsPartsSlice,
          ),
      ),
    key: key,
  };
}

var PlatformKeyboardAndSaveStatusEsc: Dynamic;

function filterPlatformKeyboardAndSaveStatusMods2(
  filterPlatformKeyboardAndSaveStatusMods22?: Dynamic,
  options: Dynamic = resolvePlatformKeyboardAndSaveStatusNavigator(),
  ..._extraArguments: unknown[]
): string {
  let {
    mods: filterPlatformKeyboardAndSaveStatusMods3,
    key: filterPlatformKeyboardAndSaveStatusMods4,
  }: Dynamic = filterPlatformKeyboardAndSaveStatusMods(
    filterPlatformKeyboardAndSaveStatusMods22,
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let filterPlatformKeyboardAndSaveStatusMods2Result of filterPlatformKeyboardAndSaveStatusMods3 as Dynamic)
    if (filterPlatformKeyboardAndSaveStatusMods2Result === `Mod`) {
      uniqueItems.add(options ? `Meta` : `Control`);
    } else {
      if (
        filterPlatformKeyboardAndSaveStatusMods2Result === `Ctrl` ||
        filterPlatformKeyboardAndSaveStatusMods2Result === `Control`
      ) {
        uniqueItems.add(`Control`);
      } else {
        if (
          filterPlatformKeyboardAndSaveStatusMods2Result === `Cmd` ||
          filterPlatformKeyboardAndSaveStatusMods2Result === `Meta`
        ) {
          uniqueItems.add(`Meta`);
        } else {
          uniqueItems.add(filterPlatformKeyboardAndSaveStatusMods2Result);
        }
      }
    }
  let filteredItems: Dynamic = [`Control`, `Alt`, `Shift`, `Meta`].filter(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      uniqueItems.has(item),
  );
  let PlatformKeyboardAndSaveStatusEscItem: Dynamic = Object.hasOwn(
    PlatformKeyboardAndSaveStatusEsc,
    filterPlatformKeyboardAndSaveStatusMods4,
  )
    ? PlatformKeyboardAndSaveStatusEsc[filterPlatformKeyboardAndSaveStatusMods4]
    : filterPlatformKeyboardAndSaveStatusMods4.length === 1
      ? filterPlatformKeyboardAndSaveStatusMods4.toLowerCase()
      : filterPlatformKeyboardAndSaveStatusMods4;
  return [...filteredItems, PlatformKeyboardAndSaveStatusEscItem].join(`+`);
}

function collectPlatformKeyboardAndSaveStatusJoin(
  collectPlatformKeyboardAndSaveStatusJoin2?: Dynamic,
  options: Dynamic = resolvePlatformKeyboardAndSaveStatusNavigator(),
  ..._extraArguments: unknown[]
) {
  let platformKeyboardAndSaveStatusFind =
    resolvePlatformKeyboardAndSaveStatusFind(
      collectPlatformKeyboardAndSaveStatusJoin2,
    );
  return [
    platformKeyboardAndSaveStatusFind.key,
    ...(platformKeyboardAndSaveStatusFind.also ?? []),
  ]
    .map(
      (item?: Dynamic, ..._extraArguments: unknown[]): string =>
        filterPlatformKeyboardAndSaveStatusMods2(item, options),
    )
    .join(` `);
}

var PlatformKeyboardAndSaveStatusEsc2: Dynamic;

function collectPlatformKeyboardAndSaveStatusMods(
  collectPlatformKeyboardAndSaveStatusMods2?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let {
    mods: filterPlatformKeyboardAndSaveStatusMods3,
    key: filterPlatformKeyboardAndSaveStatusMods4,
  }: Dynamic = filterPlatformKeyboardAndSaveStatusMods(
    collectPlatformKeyboardAndSaveStatusMods2,
  );
  let toLowerCase: Dynamic = (
    collectPlatformKeyboardAndSaveStatusMods3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectPlatformKeyboardAndSaveStatusMods3 === `Mod` ||
    collectPlatformKeyboardAndSaveStatusMods3 === `Cmd` ||
    collectPlatformKeyboardAndSaveStatusMods3 === `Meta`
      ? `cmd`
      : collectPlatformKeyboardAndSaveStatusMods3 === `Ctrl` ||
          collectPlatformKeyboardAndSaveStatusMods3 === `Control`
        ? `ctrl`
        : collectPlatformKeyboardAndSaveStatusMods3.toLowerCase();
  let PlatformKeyboardAndSaveStatusEsc2Item: Dynamic = Object.hasOwn(
    PlatformKeyboardAndSaveStatusEsc2,
    filterPlatformKeyboardAndSaveStatusMods4,
  )
    ? PlatformKeyboardAndSaveStatusEsc2[
        filterPlatformKeyboardAndSaveStatusMods4
      ]
    : filterPlatformKeyboardAndSaveStatusMods4.toLowerCase();
  return [
    ...filterPlatformKeyboardAndSaveStatusMods3.map(toLowerCase),
    PlatformKeyboardAndSaveStatusEsc2Item,
  ].join(`+`);
}

var PlatformKeyboardAndSaveStatusInTheTabsList: string;

var PlatformKeyboardAndSaveStatusGroup: {
    group: string;
    title: string;
}[];

var PlatformKeyboardAndSaveStatusText: Dynamic;

function resolvePlatformKeyboardAndSaveStatusToggle(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (event.repeat || event.composing || event.altKey) return null;
  let metaKey: Dynamic =
    (event.apple ?? resolvePlatformKeyboardAndSaveStatusNavigator())
      ? event.metaKey && !event.ctrlKey
      : event.ctrlKey && !event.metaKey;
  return event.key === `/` && metaKey && !event.shiftKey
    ? `toggle`
    : event.key === `?` && !event.metaKey && !event.ctrlKey && !event.inTextBox
      ? `open`
      : null;
}

function resolvePlatformKeyboardAndSaveStatusShiftKey(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return event.key === `F6`
    ? !event.shiftKey && !event.altKey
    : event.code === `F10` && event.altKey;
}

function isPlatformKeyboardAndSaveStatusKeyCode(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !event.altKey || event.shiftKey || !(event.metaKey || event.ctrlKey)
    ? null
    : event.key === `m` || event.key === `M`
      ? `m`
      : event.keyCode === 77
        ? `keyCode`
        : null;
}

function resolvePlatformKeyboardAndSaveStatusRepeat(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return event.repeat ||
    !event.altKey ||
    !event.shiftKey ||
    event.metaKey ||
    event.ctrlKey
    ? false
    : event.key === `c` || event.key === `C` || event.keyCode === 67;
}

var platformKeyboardAndSaveStatusValue1000000: number;

function resolvePlatformKeyboardAndSaveStatusText(
  text?: Dynamic,
  options: Dynamic = platformKeyboardAndSaveStatusValue1000000,
  ..._extraArguments: unknown[]
): Dynamic {
  if (text.length <= options)
    return {
      text: text,
    };
  let kept =
    options > 0 && (text.charCodeAt(options) & 64512) == 56320
      ? options - 1
      : Math.max(0, options);
  return {
    text: text.slice(0, kept),
    cut: {
      kept: kept,
      whole: text.length,
    },
  };
}

function resolvePlatformKeyboardAndSaveStatusTest(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!/[\uD800-\uDFFF]/.test(items)) return items;
  let label: string = ``;
  for (let index = 0; index < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(index);
    if ((charCodeAt & 64512) == 55296) {
      if (
        index + 1 < items.length &&
        (items.charCodeAt(index + 1) & 64512) == 56320
      ) {
        label += items[index] + items[++index];
      }
    } else {
      if ((charCodeAt & 64512) != 56320) {
        label += items[index];
      }
    }
  }
  return label;
}

function isPlatformKeyboardAndSaveStatusCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let index = 0; index < items.length; index++) {
    let amount = items.charCodeAt(index) & 64512;
    if (
      amount === 56320 ||
      (amount === 55296 &&
        (++index >= items.length || (items.charCodeAt(index) & 64512) != 56320))
    )
      return true;
  }
  return false;
}

function resolvePlatformKeyboardAndSaveStatusKept(
  platformKeyboardAndSaveStatusKept?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof platformKeyboardAndSaveStatusKept != `object` ||
    !platformKeyboardAndSaveStatusKept
  )
    return;
  let { kept: kept, whole: whole }: Dynamic = platformKeyboardAndSaveStatusKept;
  return typeof kept == `number` &&
    typeof whole == `number` &&
    Number.isInteger(kept) &&
    Number.isInteger(whole) &&
    kept >= 0 &&
    kept < whole
    ? {
        kept: kept,
        whole: whole,
      }
    : undefined;
}

var platformKeyboardAndSaveStatusValue1500: number;

var PlatformKeyboardAndSaveStatusState2: number;

var platformKeyboardAndSaveStatusValue9000: number;

var platformKeyboardAndSaveStatusValue20000: number;

var PlatformKeyboardAndSaveStatusOpening: Dynamic;

function resolvePlatformKeyboardAndSaveStatusSaved(
  platformKeyboardAndSaveStatusSaved?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformKeyboardAndSaveStatusSaved.linkWords === null
    ? platformKeyboardAndSaveStatusSaved.named
      ? `${PlatformKeyboardAndSaveStatusOpening[platformKeyboardAndSaveStatusSaved.word]} — ${platformKeyboardAndSaveStatusSaved.named}`
      : (platformKeyboardAndSaveStatusSaved.quiet === `saved` ||
            platformKeyboardAndSaveStatusSaved.word === `saved`) &&
          platformKeyboardAndSaveStatusSaved.kept > 0
        ? PlatformKeyboardAndSaveStatusOpening.trayed
        : platformKeyboardAndSaveStatusSaved.turned === true
          ? PlatformKeyboardAndSaveStatusOpening.unsaved
          : PlatformKeyboardAndSaveStatusOpening[
              platformKeyboardAndSaveStatusSaved.quiet
            ]
    : platformKeyboardAndSaveStatusSaved.linkWords;
}

var resolvePlatformKeyboardAndSaveStatusSaving: Dynamic;

function resolvePlatformKeyboardAndSaveStatusOpening(
  platformKeyboardAndSaveStatusOpening?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformKeyboardAndSaveStatusOpening.error ||
    platformKeyboardAndSaveStatusOpening.iframeError ||
    platformKeyboardAndSaveStatusOpening.loud
    ? true
    : platformKeyboardAndSaveStatusOpening.hasState
      ? !platformKeyboardAndSaveStatusOpening.room ||
        !platformKeyboardAndSaveStatusOpening.bound
        ? true
        : platformKeyboardAndSaveStatusOpening.saveWord !== null &&
          platformKeyboardAndSaveStatusOpening.saveWord !== `opening`
      : false;
}

function resolvePlatformKeyboardAndSaveStatusWhy(
  platformKeyboardAndSaveStatusWhy?: Dynamic,
  why?: Dynamic,
  since?: Dynamic,
  heardAt?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return why
    ? platformKeyboardAndSaveStatusWhy !== null &&
      platformKeyboardAndSaveStatusWhy.why === why &&
      platformKeyboardAndSaveStatusWhy.since === since
      ? platformKeyboardAndSaveStatusWhy
      : {
          why: why,
          since: since,
          heardAt: heardAt,
        }
    : null;
}

function resolvePlatformKeyboardAndSaveStatusPending(
  platformKeyboardAndSaveStatusPending?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    pending: platformKeyboardAndSaveStatusPending2,
    denied: platformKeyboardAndSaveStatusPending3,
    waiting: platformKeyboardAndSaveStatusPending4,
    waitingSince: platformKeyboardAndSaveStatusPending5,
    now: platformKeyboardAndSaveStatusPending6,
  }: Dynamic = platformKeyboardAndSaveStatusPending;
  let total: Dynamic =
    platformKeyboardAndSaveStatusPending.stale +
    (platformKeyboardAndSaveStatusPending.unsynced ?? 0);
  if (platformKeyboardAndSaveStatusPending.halted)
    return {
      word: `readonly`,
      banner: `none`,
    };
  if (
    platformKeyboardAndSaveStatusPending4 === `mount` &&
    !platformKeyboardAndSaveStatusPending.openFailed
  )
    return {
      word: `opening`,
      banner: `none`,
    };
  let difference =
    platformKeyboardAndSaveStatusPending4 &&
    typeof platformKeyboardAndSaveStatusPending5 == `number`
      ? platformKeyboardAndSaveStatusPending6 -
        platformKeyboardAndSaveStatusPending5
      : 1 / 0;
  let enabled = !!platformKeyboardAndSaveStatusPending4 && difference < 1500;
  if (
    platformKeyboardAndSaveStatusPending4 === `mount` &&
    platformKeyboardAndSaveStatusPending2 === 0 &&
    total === 0 &&
    platformKeyboardAndSaveStatusPending.linkUnsaved !== true &&
    platformKeyboardAndSaveStatusPending.linkSaving !== true
  )
    return {
      word: enabled ? `syncing` : `waiting`,
      banner: `none`,
    };
  let word = platformKeyboardAndSaveStatusPending4
    ? enabled
      ? `syncing`
      : `waiting`
    : total > 0
      ? `unsaved`
      : platformKeyboardAndSaveStatusPending.linkUnsaved === true
        ? `trayed`
        : platformKeyboardAndSaveStatusPending2 > 0 ||
            platformKeyboardAndSaveStatusPending.linkSaving === true
          ? `saving`
          : `saved`;
  if (word === `saved`)
    return {
      word: word,
      banner: `clear`,
    };
  if (
    platformKeyboardAndSaveStatusPending4 &&
    !enabled &&
    platformKeyboardAndSaveStatusPending2 === 0 &&
    total === 0 &&
    platformKeyboardAndSaveStatusPending.linkUnsaved !== true &&
    platformKeyboardAndSaveStatusPending.linkSaving !== true
  )
    return {
      word: word,
      banner: `none`,
    };
  if (
    (word === `unsaved` && platformKeyboardAndSaveStatusPending3 > 0) ||
    word === `trayed` ||
    (platformKeyboardAndSaveStatusPending4 && !enabled)
  )
    return {
      word: word,
      banner: `now`,
    };
  if (
    platformKeyboardAndSaveStatusPending.composingOnly === true &&
    word === `saving` &&
    platformKeyboardAndSaveStatusPending.linkSaving !== true &&
    platformKeyboardAndSaveStatusPending3 === 0
  )
    return {
      word: word,
      banner: `clear`,
    };
  if (
    platformKeyboardAndSaveStatusPending.linkBusy === true &&
    platformKeyboardAndSaveStatusPending.linkBusyUnknown !== true &&
    word === `saving`
  ) {
    let max =
      typeof platformKeyboardAndSaveStatusPending.busySince == `number`
        ? Math.max(
            0,
            platformKeyboardAndSaveStatusPending6 -
              platformKeyboardAndSaveStatusPending.busySince,
          )
        : 0;
    let word2 = max >= 9e3 ? `busy` : `saving`;
    return max >= 2e4
      ? {
          word: word2,
          banner: `busy`,
        }
      : {
          word: word2,
          banner: {
            after: Math.max(
              50,
              (max >= 9e3
                ? platformKeyboardAndSaveStatusValue20000
                : platformKeyboardAndSaveStatusValue9000) - max,
            ),
            recheck: true,
          },
        };
  }
  return enabled
    ? {
        word: word,
        banner: {
          after: Math.max(
            50,
            platformKeyboardAndSaveStatusValue1500 - difference,
          ),
          recheck: true,
        },
      }
    : {
        word: word,
        banner: {
          after: PlatformKeyboardAndSaveStatusState2,
          recheck: false,
        },
      };
}

function resolvePlatformKeyboardAndSaveStatusJudge(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformKeyboardAndSaveStatusJudgeResult: Dynamic = null;
  let resolvePlatformKeyboardAndSaveStatusJudgeResult2: Dynamic = null;
  let enabled: boolean = false;
  let resolvePlatformKeyboardAndSaveStatusJudgeResult3: Dynamic = null;
  let enabled2 = false;
  let said: Dynamic = (
    platformKeyboardAndSaveStatusJudge?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean => (
    enabled &&
    resolvePlatformKeyboardAndSaveStatusJudgeResult3 !== null &&
    platformKeyboardAndSaveStatusJudge -
      resolvePlatformKeyboardAndSaveStatusJudgeResult3 >=
      2e3
      ? ((enabled = false),
        (resolvePlatformKeyboardAndSaveStatusJudgeResult = null),
        (resolvePlatformKeyboardAndSaveStatusJudgeResult2 = null))
      : !enabled &&
        resolvePlatformKeyboardAndSaveStatusJudgeResult !== null &&
        (platformKeyboardAndSaveStatusJudge -
          resolvePlatformKeyboardAndSaveStatusJudgeResult >=
          5e3 ||
          (resolvePlatformKeyboardAndSaveStatusJudgeResult2 !== null &&
            platformKeyboardAndSaveStatusJudge -
              resolvePlatformKeyboardAndSaveStatusJudgeResult2 >=
              2e3)) &&
        (enabled = true),
    enabled || (resolvePlatformKeyboardAndSaveStatusJudgeResult3 = null),
    enabled
  );
  return {
    judge(
      platformKeyboardAndSaveStatusJudge?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let matchesWord =
        platformKeyboardAndSaveStatusJudge.word === `saving` ||
        platformKeyboardAndSaveStatusJudge.word === `syncing`;
      let enabled3 =
        !platformKeyboardAndSaveStatusJudge.readOnly &&
        platformKeyboardAndSaveStatusJudge.pending > 0 &&
        platformKeyboardAndSaveStatusJudge.word === `saving` &&
        !platformKeyboardAndSaveStatusJudge.linkSaving;
      if (
        platformKeyboardAndSaveStatusJudge.linkSaving &&
        !platformKeyboardAndSaveStatusJudge.composingOnly
      ) {
        enabled2 = true;
      }
      if (enabled3 && platformKeyboardAndSaveStatusJudge.composingOnly) {
        if (enabled2) {
          [
            enabled,
            resolvePlatformKeyboardAndSaveStatusJudgeResult,
            resolvePlatformKeyboardAndSaveStatusJudgeResult2,
          ] = [false, null, null];
        }
        enabled2 = false;
      }
      if (
        enabled &&
        (platformKeyboardAndSaveStatusJudge.readOnly || !matchesWord)
      ) {
        enabled = false;
      }
      return enabled &&
        ((resolvePlatformKeyboardAndSaveStatusJudgeResult3 =
          platformKeyboardAndSaveStatusJudge.pending > 0
            ? null
            : (resolvePlatformKeyboardAndSaveStatusJudgeResult3 ?? options)),
        said(options))
        ? true
        : ((resolvePlatformKeyboardAndSaveStatusJudgeResult = enabled3
            ? (resolvePlatformKeyboardAndSaveStatusJudgeResult ?? options)
            : null),
          (resolvePlatformKeyboardAndSaveStatusJudgeResult2 =
            enabled3 && !platformKeyboardAndSaveStatusJudge.composingOnly
              ? (resolvePlatformKeyboardAndSaveStatusJudgeResult2 ?? options)
              : null),
          said(options));
    },
    said: said,
  };
}

function isPlatformKeyboardAndSaveStatusSilent(
  platformKeyboardAndSaveStatusSilent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformKeyboardAndSaveStatusSilent.name === `pages.write.integrity_end`)
    return `end`;
  if (
    platformKeyboardAndSaveStatusSilent.name !== `pages.write.integrity_gap` ||
    (platformKeyboardAndSaveStatusSilent.fields.told !== `silent` &&
      platformKeyboardAndSaveStatusSilent.fields.told !== `warned`)
  )
    return null;
  let isFinite2: Dynamic = (
    platformKeyboardAndSaveStatusSilent2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformKeyboardAndSaveStatusSilent2 == `number` &&
    Number.isFinite(platformKeyboardAndSaveStatusSilent2) &&
    platformKeyboardAndSaveStatusSilent2 >= 30;
  return !isFinite2(platformKeyboardAndSaveStatusSilent.fields.upS) ||
    !isFinite2(platformKeyboardAndSaveStatusSilent.fields.dirtyS)
    ? null
    : platformKeyboardAndSaveStatusSilent.fields.told === `silent`
      ? `rise`
      : `owed`;
}

var resolvePlatformKeyboardAndSaveStatusRise: Dynamic;

function resolvePlatformKeyboardAndSaveStatusBar(
  platformKeyboardAndSaveStatusBar?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = `silent`,
  ..._extraArguments: unknown[]
): Dynamic {
  let byGap: Dynamic =
    !context &&
    (options === `owed`
      ? platformKeyboardAndSaveStatusBar === null && dependencies === `silent`
      : options &&
        (platformKeyboardAndSaveStatusBar === null ||
          platformKeyboardAndSaveStatusBar === `busy`));
  return {
    bar: byGap ? `unsaved` : platformKeyboardAndSaveStatusBar,
    byGap: byGap,
  };
}

function resolvePlatformKeyboardAndSaveStatusValue4(
  platformKeyboardAndSaveStatusValue4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformKeyboardAndSaveStatusValue42?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let isPlatformKeyboardAndSaveStatusSilent2 =
        isPlatformKeyboardAndSaveStatusSilent(
          platformKeyboardAndSaveStatusValue42,
        );
      if (isPlatformKeyboardAndSaveStatusSilent2 !== null) {
        options(isPlatformKeyboardAndSaveStatusSilent2);
      }
    } catch {}
    return platformKeyboardAndSaveStatusValue4(
      platformKeyboardAndSaveStatusValue42,
    );
  };
}

var isPlatformKeyboardAndSaveStatusClear: Dynamic;

var platformKeyboardAndSaveStatusSet2: Dynamic;

function isPlatformKeyboardAndSaveStatusSaved(
  platformKeyboardAndSaveStatusSaved?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let linkSaving: Dynamic =
    platformKeyboardAndSaveStatusSaved.linkSaving ||
    platformKeyboardAndSaveStatusSaved.linkUnsaved;
  return !platformKeyboardAndSaveStatusSaved.barUp &&
    !linkSaving &&
    !(platformKeyboardAndSaveStatusSaved.unsynced > 0) &&
    !(platformKeyboardAndSaveStatusSaved.stale > 0) &&
    !(platformKeyboardAndSaveStatusSaved.pending > 0) &&
    !platformKeyboardAndSaveStatusSet2.has(
      platformKeyboardAndSaveStatusSaved.word,
    )
    ? `saved`
    : platformKeyboardAndSaveStatusSaved.barUp
      ? `bar`
      : linkSaving
        ? `link`
        : platformKeyboardAndSaveStatusSaved.unsynced > 0
          ? `unsynced`
          : platformKeyboardAndSaveStatusSaved.denied > 0
            ? `denied`
            : platformKeyboardAndSaveStatusSaved.stale > 0
              ? `stale`
              : platformKeyboardAndSaveStatusSaved.pending > 0
                ? `pending`
                : platformKeyboardAndSaveStatusSaved.word === `trayed`
                  ? `link`
                  : platformKeyboardAndSaveStatusSaved.word === `unsaved`
                    ? `stale`
                    : `pending`;
}

function resolvePlatformKeyboardAndSaveStatusLink(
  platformKeyboardAndSaveStatusLink?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformKeyboardAndSaveStatusLink.barUp
    ? `bar`
    : platformKeyboardAndSaveStatusLink.linkUnsaved
      ? `link`
      : platformKeyboardAndSaveStatusLink.leave.unsaved
        ? platformKeyboardAndSaveStatusLink.linkSaving ||
          platformKeyboardAndSaveStatusLink.word === `trayed`
          ? `link`
          : platformKeyboardAndSaveStatusLink.word === `unsaved`
            ? `stale`
            : `pending`
        : `saved`;
}

var PlatformKeyboardAndSaveStatusBusy: {
    busy: boolean;
    since: undefined;
};

function resolvePlatformKeyboardAndSaveStatusMoved(
  platformKeyboardAndSaveStatusMoved?: Dynamic,
  options?: Dynamic,
  since?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesState = platformKeyboardAndSaveStatusMoved.state === `saving`;
  if (platformKeyboardAndSaveStatusMoved.pageBusy === true && matchesState) {
    let matchesUnknown = platformKeyboardAndSaveStatusMoved.unknown === true;
    return options.busy
      ? (options.unknown === true) === matchesUnknown
        ? {
            ...options,
            moved: false,
          }
        : {
            busy: true,
            since: options.since,
            ...(matchesUnknown
              ? {
                  unknown: true,
                }
              : {}),
            moved: true,
          }
      : {
          busy: true,
          since: since,
          ...(matchesUnknown
            ? {
                unknown: true,
              }
            : {}),
          moved: true,
        };
  }
  return options.busy &&
    (platformKeyboardAndSaveStatusMoved.pageBusy === false || !matchesState)
    ? {
        ...PlatformKeyboardAndSaveStatusBusy,
        moved: true,
      }
    : {
        ...options,
        moved: false,
      };
}

var resolvePlatformKeyboardAndSaveStatusBusy: Dynamic;

function filterPlatformKeyboardAndSaveStatusJudge(
  ..._extraArguments: unknown[]
): Dynamic {
  let filterPlatformKeyboardAndSaveStatusJudgeResult: Dynamic = null;
  let filterPlatformKeyboardAndSaveStatusJudgeResult2: Dynamic = null;
  let floor: Dynamic = (
    filterPlatformKeyboardAndSaveStatusJudge2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Number.isFinite(filterPlatformKeyboardAndSaveStatusJudge2) &&
    filterPlatformKeyboardAndSaveStatusJudge2 > 0
      ? Math.min(999, Math.floor(filterPlatformKeyboardAndSaveStatusJudge2))
      : 0;
  return {
    judge(
      {
        now: now,
        word: word,
        pending: pending,
        linkSaving: linkSaving,
        inputs: inputs,
      }: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        !(
          (word === `unsaved` || word === `trayed`) &&
          pending === 0 &&
          !linkSaving
        )
      ) {
        if (word !== `unsaved` && word !== `trayed` && word !== `saving`) {
          [
            filterPlatformKeyboardAndSaveStatusJudgeResult,
            filterPlatformKeyboardAndSaveStatusJudgeResult2,
          ] = [null, null];
        }
        return null;
      }
      filterPlatformKeyboardAndSaveStatusJudgeResult ??= now;
      if (now - filterPlatformKeyboardAndSaveStatusJudgeResult < 3e4)
        return null;
      let [items, setItems, items2, items3, items4]: Dynamic = [
        floor(inputs.unsynced),
        floor(inputs.stale),
        floor(inputs.tray),
        floor(inputs.shortRevived),
        floor(inputs.shortRevivedAcked),
      ];
      let component =
        [
          items > 0 ? `unsynced` : ``,
          setItems > 0 ? `stale` : ``,
          items2 > 0 ? `tray` : ``,
          items3 > 0 ? `short` : ``,
        ]
          .filter(Boolean)
          .join(`_`) || `none`;
      return component === filterPlatformKeyboardAndSaveStatusJudgeResult2
        ? null
        : ((filterPlatformKeyboardAndSaveStatusJudgeResult2 = component),
          {
            component: component,
            seconds: Math.min(
              65535,
              Math.floor(
                (now - filterPlatformKeyboardAndSaveStatusJudgeResult) / 1e3,
              ),
            ),
            counts: `u${items}.s${setItems}.t${items2}.r${items3}.a${items4}`,
          });
    },
  };
}

function resolvePlatformKeyboardAndSaveStatusDrop(
  timers?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformKeyboardAndSaveStatusDropResult: Dynamic;
  let resolvePlatformKeyboardAndSaveStatusDropResult2: Dynamic = null;
  let enabled: boolean = false;
  let resolvePlatformKeyboardAndSaveStatusDropResult3: Dynamic = null;
  let drop = (..._extraArguments: unknown[]): undefined => {
    if (resolvePlatformKeyboardAndSaveStatusDropResult !== undefined) {
      timers.clearTimeout(resolvePlatformKeyboardAndSaveStatusDropResult);
    }
    resolvePlatformKeyboardAndSaveStatusDropResult = undefined;
    resolvePlatformKeyboardAndSaveStatusDropResult2 = null;
    resolvePlatformKeyboardAndSaveStatusDropResult3 = null;
  };
  return {
    drop: drop,
    hold(
      platformKeyboardAndSaveStatusDrop?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      enabled = platformKeyboardAndSaveStatusDrop;
      if (enabled || resolvePlatformKeyboardAndSaveStatusDropResult3 === null)
        return;
      let resolvePlatformKeyboardAndSaveStatusDropResult4: Dynamic =
        resolvePlatformKeyboardAndSaveStatusDropResult3;
      resolvePlatformKeyboardAndSaveStatusDropResult3 = null;
      resolvePlatformKeyboardAndSaveStatusDropResult4();
    },
    report(
      platformKeyboardAndSaveStatusDrop?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (typeof platformKeyboardAndSaveStatusDrop != `object`) return drop();
      if (
        !platformKeyboardAndSaveStatusDrop.recheck &&
        resolvePlatformKeyboardAndSaveStatusDropResult2 === options
      )
        return;
      drop();
      if (!platformKeyboardAndSaveStatusDrop.recheck) {
        resolvePlatformKeyboardAndSaveStatusDropResult2 = options;
      }
      let recheck: Dynamic = platformKeyboardAndSaveStatusDrop.recheck;
      resolvePlatformKeyboardAndSaveStatusDropResult = timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          resolvePlatformKeyboardAndSaveStatusDropResult = undefined;
          if (enabled && !recheck) {
            resolvePlatformKeyboardAndSaveStatusDropResult3 = context;
          } else {
            context();
          }
        },
        platformKeyboardAndSaveStatusDrop.after,
      );
    },
  };
}

function resolvePlatformKeyboardAndSaveStatusUnsaved(
  platformKeyboardAndSaveStatusUnsaved?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformKeyboardAndSaveStatusUnsaved.linkSaving ||
    platformKeyboardAndSaveStatusUnsaved.word === `unsaved` ||
    platformKeyboardAndSaveStatusUnsaved.word === `trayed` ||
    platformKeyboardAndSaveStatusUnsaved.pending > 0
  );
}

var platformKeyboardAndSaveStatusSet3: Dynamic;

function resolvePlatformKeyboardAndSaveStatusUnsaved2(
  platformKeyboardAndSaveStatusUnsaved2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let unsaved: Dynamic = resolvePlatformKeyboardAndSaveStatusUnsaved(
    platformKeyboardAndSaveStatusUnsaved2,
  );
  let linkSaving: Dynamic =
    platformKeyboardAndSaveStatusUnsaved2.linkSaving ||
    platformKeyboardAndSaveStatusUnsaved2.pending > 0;
  return {
    unsaved: unsaved,
    draining:
      unsaved &&
      linkSaving &&
      !platformKeyboardAndSaveStatusUnsaved2.stopped &&
      !(
        platformKeyboardAndSaveStatusUnsaved2.word !== undefined &&
        platformKeyboardAndSaveStatusSet3.has(
          platformKeyboardAndSaveStatusUnsaved2.word,
        )
      ),
    settled: platformKeyboardAndSaveStatusUnsaved2.settled ?? 0,
  };
}

var PlatformKeyboardAndSaveStatusHalted: {
    halted: boolean;
    retrying: boolean;
    haltWords: null;
};

var PlatformKeyboardAndSaveStatusYourUnsavedChangesAreKeptBelow: string;

function resolvePlatformKeyboardAndSaveStatusValue5(
  platformKeyboardAndSaveStatusValue5?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformKeyboardAndSaveStatusValue5 === null ||
    !options ||
    context <= 0
    ? platformKeyboardAndSaveStatusValue5
    : `${platformKeyboardAndSaveStatusValue5} ${PlatformKeyboardAndSaveStatusYourUnsavedChangesAreKeptBelow}`;
}

function resolvePlatformKeyboardAndSaveStatusDeleted(
  platformKeyboardAndSaveStatusDeleted?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformKeyboardAndSaveStatusDeleted.pageGoneWhy === `deleted`
    ? `document`
    : platformKeyboardAndSaveStatusDeleted.tabGone ||
        platformKeyboardAndSaveStatusDeleted.nodeGone
      ? `tab`
      : null;
}

function resolvePlatformKeyboardAndSaveStatusFace(
  face?: Dynamic,
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let haltWords: Dynamic =
    typeof request.words == `string` ? request.words : face.haltWords;
  return request.halt === true
    ? {
        face: {
          halted: true,
          retrying: false,
          haltWords: haltWords,
        },
        cleared: false,
      }
    : request.retrying === true
      ? {
          face: {
            ...face,
            retrying: true,
            haltWords: haltWords,
          },
          cleared: false,
        }
      : face.retrying && !face.halted && request.landed === true
        ? {
            face: PlatformKeyboardAndSaveStatusHalted,
            cleared: true,
          }
        : {
            face: face,
            cleared: false,
          };
}

function resolvePlatformKeyboardAndSaveStatusNotice(
  request?: Dynamic,
  linkNotice?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return request.linkDown === true
    ? typeof request.words == `string` &&
      !context.halted &&
      !context.retrying &&
      context.viewer !== true
      ? {
          notice: request.words,
          linkNotice: true,
        }
      : {
          linkNotice: linkNotice,
        }
    : request.linkDown === false
      ? linkNotice
        ? {
            notice: context.standing,
            linkNotice: context.standing !== null,
          }
        : {
            linkNotice: linkNotice,
          }
      : context.linkDown === true && linkNotice
        ? {
            linkNotice: linkNotice,
          }
        : request.readsRefused === false
          ? linkNotice
            ? {
                notice: context.standing,
                linkNotice: context.standing !== null,
              }
            : {
                linkNotice: linkNotice,
              }
          : request.state === `readonly` &&
              typeof request.words == `string` &&
              request.words.includes(` `) &&
              request.viewOnly !== true &&
              request.openBusy !== true &&
              !context.halted &&
              !context.retrying
            ? {
                notice: request.words,
                linkNotice: true,
              }
            : linkNotice && request.state !== `readonly`
              ? {
                  notice: null,
                  linkNotice: false,
                }
              : request.waiting === false &&
                  linkNotice &&
                  !context.halted &&
                  !context.retrying
                ? {
                    notice: context.standing,
                    linkNotice: context.standing !== null,
                  }
                : request.landed === true &&
                    !context.halted &&
                    !context.retrying
                  ? context.standing !== null && request.state === `readonly`
                    ? {
                        notice: context.standing,
                        linkNotice: true,
                      }
                    : {
                        notice: null,
                        linkNotice: false,
                      }
                  : {
                      linkNotice: linkNotice,
                    };
}

function resolvePlatformKeyboardAndSaveStatusWhy2(
  platformKeyboardAndSaveStatusWhy2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformKeyboardAndSaveStatusWhy2 != `object` ||
    !platformKeyboardAndSaveStatusWhy2
  )
    return platformKeyboardAndSaveStatusWhy2;
  let platformKeyboardAndSaveStatusWhy22: Dynamic =
    platformKeyboardAndSaveStatusWhy2;
  let record2: Dynamic =
    platformKeyboardAndSaveStatusWhy22.given === true
      ? {
          ...platformKeyboardAndSaveStatusWhy22,
          why: `given`,
        }
      : platformKeyboardAndSaveStatusWhy22;
  if (record2.need !== `foreign`)
    return record2 === platformKeyboardAndSaveStatusWhy22
      ? platformKeyboardAndSaveStatusWhy2
      : record2;
  let { need: record3, ...record4 }: Dynamic = record2;
  return record4;
}

function resolvePlatformKeyboardAndSaveStatusBid(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let cut2 = resolvePlatformKeyboardAndSaveStatusKept(ask.cut);
  return {
    bid: ask.bid,
    afterId: ask.afterId ?? null,
    text: ask.text,
    ...(ask.only === true
      ? {
          only: true,
        }
      : {}),
    ...(ask.owed === true
      ? {
          owed: true,
        }
      : {}),
    ...(ask.real === true
      ? {
          real: true,
        }
      : {}),
    ...(ask.tray === true
      ? {
          tray: true,
        }
      : {}),
    ...(ask.quiet === true
      ? {
          quiet: true,
        }
      : {}),
    ...(cut2
      ? {
          cut: cut2,
        }
      : {}),
  };
}

function resolvePlatformKeyboardAndSaveStatusShow(
  last?: Dynamic,
  words?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 1500,
  ..._extraArguments: unknown[]
): Dynamic {
  return last !== null &&
    last.words === words &&
    context - last.at < dependencies
    ? {
        show: false,
        last: last,
      }
    : {
        show: true,
        last: {
          words: words,
          at: context,
        },
      };
}

function resolvePlatformKeyboardAndSaveStatusText2(
  ask?: Dynamic,
  options?: Dynamic,
  context: Dynamic = true,
  ..._extraArguments: unknown[]
): Dynamic {
  let { text: text }: Dynamic = ask;
  let cut2 = resolvePlatformKeyboardAndSaveStatusKept(ask.cut);
  let record2: Dynamic = cut2
    ? {
        cut: cut2,
      }
    : {};
  if (typeof ask.bid != `string` || ask.bid === ``)
    return {
      id: options,
      bid: ask.bid ?? ``,
      text: text,
      ...record2,
    };
  let afterId: Dynamic = typeof ask.afterId == `string` ? ask.afterId : null;
  return ask.staged === true && ask.penOff === true
    ? {
        id: options,
        bid: ask.bid,
        text: text,
        afterId: afterId,
        staged: true,
        penOff: true,
        ...record2,
      }
    : ask.staged === true
      ? context
        ? {
            id: options,
            bid: ask.bid,
            text: text,
            afterId: afterId,
            drops: true,
            ...record2,
          }
        : {
            id: options,
            bid: ask.bid,
            text: text,
            afterId: afterId,
            drops: true,
            stands: true,
            ...record2,
          }
      : ask.keyed === true
        ? {
            id: options,
            bid: ask.bid,
            text: text,
            afterId: afterId,
            keyed: true,
            ...record2,
          }
        : {
            id: options,
            bid: ask.bid,
            text: text,
            ...record2,
          };
}

var resolvePlatformKeyboardAndSaveStatusUnknownId: Dynamic;

function isPlatformKeyboardAndSaveStatusBadRequest(
  platformKeyboardAndSaveStatusBadRequest?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
): boolean {
  if (platformKeyboardAndSaveStatusBadRequest !== `bad_request`) return false;
  let options2: Dynamic = typeof options == `object` && options ? options : {};
  let isPlatformKeyboardAndSaveStatusBadRequestHandler: Dynamic = (
    platformKeyboardAndSaveStatusBadRequest2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Array.isArray(platformKeyboardAndSaveStatusBadRequest2) &&
    platformKeyboardAndSaveStatusBadRequest2.some(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2 === `add` ||
        rolldownNImport2 === `remove` ||
        rolldownNImport2 === `marks`,
    );
  return isPlatformKeyboardAndSaveStatusBadRequestHandler(options2.at) ||
    (Array.isArray(options2.issues) &&
      options2.issues.some(
        (issue?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isPlatformKeyboardAndSaveStatusBadRequestHandler(issue?.path),
      ))
    ? true
    : typeof options2.detail == `string` &&
        /\b(?:add|remove|marks)\[\d+\]/.test(options2.detail);
}

function resolvePlatformKeyboardAndSaveStatusAssert(
  platformKeyboardAndSaveStatusAssert?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let zeroError: Dynamic =
    typeof platformKeyboardAndSaveStatusAssert == `object` &&
    platformKeyboardAndSaveStatusAssert
      ? platformKeyboardAndSaveStatusAssert.zero_error
      : undefined;
  return zeroError === `assert` || zeroError === `unsynced` ? zeroError : null;
}

var platformKeyboardAndSaveStatusSet4: Dynamic;

function resolvePlatformKeyboardAndSaveStatusCount(
  platformKeyboardAndSaveStatusCount?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformKeyboardAndSaveStatusAssert: Dynamic =
    resolvePlatformKeyboardAndSaveStatusAssert(options);
  if (platformKeyboardAndSaveStatusAssert === null) return null;
  let options2: Dynamic = options;
  let matchesPlatformKeyboardAndSaveStatusAssert =
    platformKeyboardAndSaveStatusAssert === `unsynced`;
  let matchesPlatformKeyboardAndSaveStatusAssert2: Dynamic =
    matchesPlatformKeyboardAndSaveStatusAssert &&
    options2.law === true &&
    !options2.assert &&
    !options2.orphan_node &&
    !options2.local &&
    options2.landed === undefined &&
    platformKeyboardAndSaveStatusSet4.has(platformKeyboardAndSaveStatusCount) &&
    dependencies !== true;
  let bar =
    matchesPlatformKeyboardAndSaveStatusAssert &&
    !context &&
    !matchesPlatformKeyboardAndSaveStatusAssert2;
  return platformKeyboardAndSaveStatusCount === `limit`
    ? {
        count: true,
        bar: bar,
        say: {
          word: `limit`,
          refine: resolvePlatformKeyboardAndSaveStatusWhy2(options),
          quiet: false,
        },
      }
    : matchesPlatformKeyboardAndSaveStatusAssert2
      ? {
          count: true,
          bar: bar,
          say: {
            word: `too_many`,
            refine: options2.dim === `source` ? `source` : undefined,
            quiet: false,
          },
        }
      : {
          count: true,
          bar: bar,
          say: null,
        };
}

function isPlatformKeyboardAndSaveStatusDown(
  platformKeyboardAndSaveStatusDown: Dynamic = 64,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let isPlatformKeyboardAndSaveStatusDownHandler: Dynamic = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof items == `string` && items.length > 0 && items.length <= 128;
  return {
    up: (
      platformKeyboardAndSaveStatusDown2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        platformKeyboardAndSaveStatusDown2.t === `need` &&
        platformKeyboardAndSaveStatusDown2.why === `mount`
      ) {
        uniqueItems.clear();
        return;
      }
      if (
        !(
          platformKeyboardAndSaveStatusDown2.t !== `ops` ||
          platformKeyboardAndSaveStatusDown2.undo !== true ||
          !isPlatformKeyboardAndSaveStatusDownHandler(
            platformKeyboardAndSaveStatusDown2.opId,
          )
        )
      )
        for (
          uniqueItems.delete(platformKeyboardAndSaveStatusDown2.opId),
            uniqueItems.add(platformKeyboardAndSaveStatusDown2.opId);
          uniqueItems.size > platformKeyboardAndSaveStatusDown;

        )
          uniqueItems.delete(uniqueItems.values().next().value);
    },
    down: (
      platformKeyboardAndSaveStatusDown2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !isPlatformKeyboardAndSaveStatusDownHandler(
        platformKeyboardAndSaveStatusDown2.opId,
      ) ||
      (platformKeyboardAndSaveStatusDown2.t !== `deny` &&
        (platformKeyboardAndSaveStatusDown2.t !== `ack` ||
          platformKeyboardAndSaveStatusDown2.provisional === true))
        ? false
        : uniqueItems.delete(platformKeyboardAndSaveStatusDown2.opId) &&
          platformKeyboardAndSaveStatusDown2.t === `deny`,
    clear: (..._extraArguments: unknown[]): Dynamic => uniqueItems.clear(),
    size: (..._extraArguments: unknown[]): Dynamic => uniqueItems.size,
  };
}

function isPlatformKeyboardAndSaveStatusLimit(
  platformKeyboardAndSaveStatusLimit?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (resolvePlatformKeyboardAndSaveStatusAssert(options) !== null)
    return platformKeyboardAndSaveStatusLimit === `limit`;
  if (
    isPlatformKeyboardAndSaveStatusBadRequest(
      platformKeyboardAndSaveStatusLimit,
      options,
    ) ||
    (typeof options == `object` && options && options.recount === true)
  )
    return false;
  if (platformKeyboardAndSaveStatusLimit === `block_changed`) {
    let options4: Dynamic =
      typeof options == `object` && options ? options : {};
    if (
      options4.why === `unproven` &&
      options4.need !== `earlier_life` &&
      options4.room !== `earlier_life`
    )
      return false;
  }
  let options2: Dynamic = typeof options == `object` && options ? options : {};
  if (options2.self === true || options2.why === `already`) return false;
  if (
    !resolvePlatformKeyboardAndSaveStatusUnknownId(
      platformKeyboardAndSaveStatusLimit,
    )
  )
    return true;
  if (resolvePlatformKeyboardAndSaveStatusBid2(options).length > 0)
    return false;
  let options3: Dynamic = typeof options == `object` && options ? options : {};
  return !(
    options3.given === true &&
    options3.need !== `earlier_life` &&
    options3.room !== `earlier_life`
  );
}

function resolvePlatformKeyboardAndSaveStatusKeptAsText(
  platformKeyboardAndSaveStatusKeptAsText?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  if (!Array.isArray(platformKeyboardAndSaveStatusKeptAsText)) return 0;
  let count: number = 0;
  for (let resolvePlatformKeyboardAndSaveStatusKeptAsTextResult of platformKeyboardAndSaveStatusKeptAsText as Dynamic) {
    if (
      typeof resolvePlatformKeyboardAndSaveStatusKeptAsTextResult != `object` ||
      !resolvePlatformKeyboardAndSaveStatusKeptAsTextResult
    )
      continue;
    let resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2: Dynamic =
      resolvePlatformKeyboardAndSaveStatusKeptAsTextResult;
    if (
      resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2.code ===
        `kept_as_text` &&
      resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2.what === `image`
    ) {
      count +=
        typeof resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2.count ==
          `number` &&
        resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2.count > 0
          ? resolvePlatformKeyboardAndSaveStatusKeptAsTextResult2.count
          : 1;
    }
  }
  return count;
}

function resolvePlatformKeyboardAndSaveStatusBid2(
  platformKeyboardAndSaveStatusBid2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let rescue: Dynamic =
    typeof platformKeyboardAndSaveStatusBid2 == `object` &&
    platformKeyboardAndSaveStatusBid2
      ? platformKeyboardAndSaveStatusBid2.rescue
      : undefined;
  if (!Array.isArray(rescue)) return [];
  let items: Dynamic = [];
  for (let resolvePlatformKeyboardAndSaveStatusBid2Result of rescue as Dynamic) {
    if (
      typeof resolvePlatformKeyboardAndSaveStatusBid2Result != `object` ||
      !resolvePlatformKeyboardAndSaveStatusBid2Result
    )
      continue;
    let resolvePlatformKeyboardAndSaveStatusBid2Result2: Dynamic =
      resolvePlatformKeyboardAndSaveStatusBid2Result;
    if (
      !(
        typeof resolvePlatformKeyboardAndSaveStatusBid2Result2.bid ==
          `string` ||
        resolvePlatformKeyboardAndSaveStatusBid2Result2.bid === null
      ) ||
      typeof resolvePlatformKeyboardAndSaveStatusBid2Result2.text != `string`
    )
      continue;
    let ask: Dynamic = {
      bid: resolvePlatformKeyboardAndSaveStatusBid2Result2.bid,
      text: resolvePlatformKeyboardAndSaveStatusBid2Result2.text,
    };
    if (
      typeof resolvePlatformKeyboardAndSaveStatusBid2Result2.afterId ==
        `string` ||
      resolvePlatformKeyboardAndSaveStatusBid2Result2.afterId === null
    ) {
      ask.afterId = resolvePlatformKeyboardAndSaveStatusBid2Result2.afterId;
    }
    if (resolvePlatformKeyboardAndSaveStatusBid2Result2.staged === true) {
      ask.staged = true;
    }
    let platformKeyboardAndSaveStatusKept: Dynamic =
      resolvePlatformKeyboardAndSaveStatusKept(
        resolvePlatformKeyboardAndSaveStatusBid2Result2.cut,
      );
    if (platformKeyboardAndSaveStatusKept) {
      ask.cut = platformKeyboardAndSaveStatusKept;
    }
    if (Array.isArray(resolvePlatformKeyboardAndSaveStatusBid2Result2.folds)) {
      let items2: Dynamic = [];
      for (let ask2 of resolvePlatformKeyboardAndSaveStatusBid2Result2.folds as Dynamic)
        if (typeof ask2 == `object` && ask2 && typeof ask2.bid == `string`) {
          items2.push({
            bid: ask2.bid,
            afterId: typeof ask2.afterId == `string` ? ask2.afterId : null,
          });
        }
      if (items2.length > 0) {
        ask.folds = items2;
      }
    }
    items.push(ask);
  }
  return items;
}

function isPlatformKeyboardAndSaveStatusSome(
  platformKeyboardAndSaveStatusSome?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!items || items.length === 0) return platformKeyboardAndSaveStatusSome;
  let resolvePlatformKeyboardAndSaveStatusBid32: Dynamic = (
    platformKeyboardAndSaveStatusSome2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformKeyboardAndSaveStatusBid3: Dynamic =
      resolvePlatformKeyboardAndSaveStatusBid3(
        platformKeyboardAndSaveStatusSome2,
      );
    return (
      platformKeyboardAndSaveStatusBid3 !== null &&
      items.some(
        (ask?: Dynamic, ..._extraArguments: unknown[]) =>
          ask.bid === platformKeyboardAndSaveStatusBid3.bid &&
          ask.afterId === platformKeyboardAndSaveStatusBid3.afterId,
      )
    );
  };
  return platformKeyboardAndSaveStatusSome.some(
    resolvePlatformKeyboardAndSaveStatusBid32,
  )
    ? platformKeyboardAndSaveStatusSome.filter(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          !resolvePlatformKeyboardAndSaveStatusBid32(rolldownNImport2),
      )
    : platformKeyboardAndSaveStatusSome;
}

function resolvePlatformKeyboardAndSaveStatusBid3(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return ask && (ask.staged || ask.drops || ask.keyed) && ask.bid
    ? {
        bid: ask.bid,
        afterId: ask.afterId ?? null,
      }
    : null;
}

function resolvePlatformKeyboardAndSaveStatusFolds(
  platformKeyboardAndSaveStatusFolds?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return [
    ...isPlatformKeyboardAndSaveStatusSome(
      platformKeyboardAndSaveStatusFolds,
      options.folds,
    ),
    resolvePlatformKeyboardAndSaveStatusText2(options, context, dependencies),
  ];
}

function isPlatformKeyboardAndSaveStatusPenOff(
  platformKeyboardAndSaveStatusPen?: Dynamic,
  ask?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return [
    ...(ask.penOff === true && ask.staged === true
      ? platformKeyboardAndSaveStatusPen.filter(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            !(
              ask2.staged === true &&
              ask2.penOff !== true &&
              ask2.bid === ask.bid &&
              (ask2.afterId ?? null) === (ask.afterId ?? null)
            ),
        )
      : platformKeyboardAndSaveStatusPen),
    resolvePlatformKeyboardAndSaveStatusText2(
      ask,
      context,
      ask.staged !== true,
    ),
  ];
}

var resolvePlatformKeyboardAndSaveStatusCharCodeAt: Dynamic;

function isPlatformKeyboardAndSaveStatusFilter(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    options
      .filter(
        (ask?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          typeof ask == `object` &&
          !!ask &&
          typeof ask.bid == `string` &&
          ask.live !== true,
      )
      .map(
        (ask?: Dynamic, ..._extraArguments: unknown[]) =>
          `${ask.bid}\u0000${typeof ask.afterId == `string` ? ask.afterId : ``}`,
      ),
  );
  if (uniqueItems.size === 0) return items;
  let filteredItems: Dynamic = items.filter(
    (ask?: Dynamic, ..._extraArguments: unknown[]) =>
      !(
        ask.penOff === true &&
        uniqueItems.has(`${ask.bid}\u0000${ask.afterId ?? ``}`)
      ),
  );
  return filteredItems.length === items.length ? items : filteredItems;
}

function isPlatformKeyboardAndSaveStatusText(
  platformKeyboardAndSaveStatusText?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredPlatformKeyboardAndSaveStatusText: Dynamic =
    platformKeyboardAndSaveStatusText.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        !rolldownNImport2.staged || rolldownNImport2.penOff,
    );
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    filteredPlatformKeyboardAndSaveStatusText
      .filter(
        (
          filteredPlatformKeyboardAndSaveStatusText2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => filteredPlatformKeyboardAndSaveStatusText2.penOff === true,
      )
      .map(
        (ask?: Dynamic, ..._extraArguments: unknown[]) =>
          `${ask.bid}\u0000${ask.afterId ?? ``}`,
      ),
  );
  let mappedFilteredMappedOptionsSlice: Dynamic = options
    .map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        ...option,
        text: resolvePlatformKeyboardAndSaveStatusCharCodeAt(option.text),
      }),
    )
    .filter(
      (ask?: Dynamic, ..._extraArguments: unknown[]) =>
        ask.text.trim() !== `` &&
        !uniqueItems.has(`${ask.bid}\u0000${ask.afterId ?? ``}`),
    )
    .slice(-20)
    .map((ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let ask2: Dynamic = {
        id: context(),
        bid: ask.bid,
        afterId: ask.afterId ?? null,
        text: ask.text,
        staged: true,
      };
      let platformKeyboardAndSaveStatusKept =
        resolvePlatformKeyboardAndSaveStatusKept(ask.cut);
      if (platformKeyboardAndSaveStatusKept) {
        ask2.cut = platformKeyboardAndSaveStatusKept;
      }
      return ask2;
    });
  return [
    ...filteredPlatformKeyboardAndSaveStatusText,
    ...mappedFilteredMappedOptionsSlice,
  ];
}

function resolvePlatformKeyboardAndSaveStatusKey(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return event.metaKey ||
    event.ctrlKey ||
    event.isComposing ||
    resolvePlatformKeyboardAndSaveStatusToggle({
      key: event.key,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey ?? false,
      repeat: false,
      composing: event.isComposing,
      inTextBox: false,
    }) !== null
    ? false
    : event.key === `Enter` ||
        event.key === `Backspace` ||
        event.key === `Delete`
      ? true
      : event.key.length === 1 && !event.altKey;
}

var platformKeyboardAndSaveStatusValue5000: number;

var platformKeyboardAndSaveStatusValue10000: number;

var PlatformKeyboardAndSaveStatusKeys: Dynamic;

var PlatformKeyboardAndSaveStatusKeys2: Dynamic;

var resolvePlatformKeyboardAndSaveStatusValue6: Dynamic;

var resolvePlatformKeyboardAndSaveStatusKeys: Dynamic;

function filterPlatformKeyboardAndSaveStatusNext(
  filterPlatformKeyboardAndSaveStatusNext2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesDifference =
    options - filterPlatformKeyboardAndSaveStatusNext2.saidAt >
    platformKeyboardAndSaveStatusValue10000;
  if (filterPlatformKeyboardAndSaveStatusNext2.swapBorn === true && !context)
    return {
      next: {
        keys: [],
        saidAt: matchesDifference
          ? options
          : filterPlatformKeyboardAndSaveStatusNext2.saidAt,
      },
      refocus: true,
      say: matchesDifference ? `refocus:swap` : null,
    };
  let record2: Dynamic =
    filterPlatformKeyboardAndSaveStatusNext2.swapBorn === true
      ? {
          swapBorn: true,
        }
      : {};
  let keys: Dynamic = [
    ...filterPlatformKeyboardAndSaveStatusNext2.keys.filter(
      (key?: Dynamic, ..._extraArguments: unknown[]) =>
        options - key <= platformKeyboardAndSaveStatusValue5000,
    ),
    options,
  ];
  return keys.length < 3
    ? {
        next: {
          keys: keys,
          saidAt: filterPlatformKeyboardAndSaveStatusNext2.saidAt,
          ...record2,
        },
        refocus: false,
        say: null,
      }
    : {
        next: {
          keys: [],
          saidAt: matchesDifference
            ? options
            : filterPlatformKeyboardAndSaveStatusNext2.saidAt,
          ...record2,
        },
        refocus: !context,
        say: matchesDifference ? (context ? `leaving` : `refocus`) : null,
      };
}

var PlatformKeyboardAndSaveStatusStyles: string;

var PlatformKeyboardAndSaveStatusStyles2: string;

var resolvePlatformKeyboardAndSaveStatusEnter: Dynamic;

var PlatformKeyboardAndSaveStatusStyles3: string;

function resolvePlatformKeyboardAndSaveStatusBody(
  platformKeyboardAndSaveStatusBody?: Dynamic,
  element?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return element.querySelector(PlatformKeyboardAndSaveStatusStyles3) === null
    ? !(
        platformKeyboardAndSaveStatusBody instanceof
        ((element.defaultView?.Element ?? Element) as Dynamic)
      ) ||
      platformKeyboardAndSaveStatusBody === element.body ||
      platformKeyboardAndSaveStatusBody === element.documentElement
      ? true
      : platformKeyboardAndSaveStatusBody.isContentEditable ||
          platformKeyboardAndSaveStatusBody.closest(
            PlatformKeyboardAndSaveStatusStyles,
          ) !== null
        ? false
        : platformKeyboardAndSaveStatusBody.closest(
              PlatformKeyboardAndSaveStatusStyles2,
            ) === null
          ? true
          : !resolvePlatformKeyboardAndSaveStatusEnter(context)
    : false;
}

var PlatformKeyboardAndSaveStatusState3: Dynamic;

function resolvePlatformKeyboardAndSaveStatusValue7(
  platformKeyboardAndSaveStatusValue7?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformKeyboardAndSaveStatusState3 = platformKeyboardAndSaveStatusValue7;
}

function resolvePlatformKeyboardAndSaveStatusValue8(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return PlatformKeyboardAndSaveStatusState3?.() ?? undefined;
  } catch {
    return;
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformKeyboardAndSaveStatusStep1(): void {
  (DropZone_Overlay as Dynamic).displayName = `DropZone.Overlay`;
  (platformKeyboardAndSaveStatusValue3 = 3);
  (platformKeyboardAndSaveStatusValue8 = 8);
  (platformKeyboardAndSaveStatusValue32 = 32);
  (PlatformKeyboardAndSaveStatusInlineStart = {
    "inline-start": `inset-y-0 start-[calc(-6px_-_(var(--cds-ring-outer,0px)_-_var(--cds-ring-inner,0px))_/_2)]`,
    "inline-end": `inset-y-0 end-[calc(-6px_-_(var(--cds-ring-outer,0px)_-_var(--cds-ring-inner,0px))_/_2)]`,
    top: `inset-x-0 top-[calc(-6px_-_(var(--cds-ring-outer,0px)_-_var(--cds-ring-inner,0px))_/_2)]`,
    bottom: `inset-x-0 bottom-[calc(-6px_-_(var(--cds-ring-outer,0px)_-_var(--cds-ring-inner,0px))_/_2)]`,
  });
  (PlatformKeyboardAndSaveStatusOrientation = (0, React.forwardRef)(
    function (
      {
        orientation = `vertical`,
        side: side,
        onResize: onResize,
        onResizeStart: onResizeStart,
        onResizeEnd: onResizeEnd,
        onMouseDown: onMouseDown,
        onKeyDown: onKeyDown,
        className: className,
        ...platformKeyboardAndSaveStatusOrientation
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let matchesOrientation: boolean =
        side === undefined
          ? orientation === `vertical`
          : side === `inline-start` || side === `inline-end`;
      let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
      let elementRef: Dynamic = (0, React.useRef)(null);
      let onResizeRef: Dynamic = (0, React.useRef)(onResize);
      let onResizeStartRef: Dynamic = (0, React.useRef)(onResizeStart);
      let onResizeEndRef: Dynamic = (0, React.useRef)(onResizeEnd);
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          onResizeRef.current = onResize;
          onResizeStartRef.current = onResizeStart;
          onResizeEndRef.current = onResizeEnd;
        },
        [onResize, onResizeStart, onResizeEnd],
      );
      let countRef: Dynamic = (0, React.useRef)(0);
      let enabledRef: Dynamic = (0, React.useRef)(false);
      let enabledRef2: Dynamic = (0, React.useRef)(true);
      let onResizeEnd2: Dynamic = (0, React.useCallback)(
        (..._extraArguments: unknown[]): undefined => {
          if (!enabledRef2.current) {
            enabledRef2.current = true;
            setEnabledState(false);
            onResizeEndRef.current?.(enabledRef.current);
          }
        },
        [],
      );
      (0, React.useEffect)(
        (..._extraArguments: unknown[]): Dynamic => {
          let element: Dynamic = elementRef.current;
          if (!enabledState || element === null) return;
          let onResize2 = (
            platformKeyboardAndSaveStatusOrientation2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let difference: number =
              (matchesOrientation
                ? platformKeyboardAndSaveStatusOrientation2.clientX
                : platformKeyboardAndSaveStatusOrientation2.clientY) -
              countRef.current;
            if (Math.abs(difference) > platformKeyboardAndSaveStatusValue3) {
              enabledRef.current = true;
            }
            onResizeRef.current(difference);
          };
          let style: Dynamic = element.body.style;
          style.cursor = matchesOrientation ? `col-resize` : `row-resize`;
          style.userSelect = `none`;
          element.addEventListener(`mousemove`, onResize2);
          element.addEventListener(`mouseup`, onResizeEnd2);
          return (..._extraArguments: unknown[]): undefined => {
            element.removeEventListener(`mousemove`, onResize2);
            element.removeEventListener(`mouseup`, onResizeEnd2);
            style.cursor = ``;
            style.userSelect = ``;
          };
        },
        [enabledState, matchesOrientation, onResizeEnd2],
      );
      (0, React.useEffect)(
        (..._extraArguments: unknown[]): Dynamic => onResizeEnd2,
        [onResizeEnd2],
      );
      let onMouseDown2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.button === 0) {
          event.preventDefault();
          countRef.current = matchesOrientation ? event.clientX : event.clientY;
          enabledRef.current = false;
          enabledRef2.current = false;
          elementRef.current = event.currentTarget.ownerDocument;
          setEnabledState(true);
          onResizeStartRef.current?.();
        }
        onMouseDown?.(event);
      };
      let onResizeEnd3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          !enabledRef2.current
        )
          return;
        if ((event.key === `Enter` || event.key === ` `) && !event.shiftKey) {
          event.preventDefault();
          if (event.repeat) return;
          onResizeStartRef.current?.();
          onResizeEndRef.current?.(false);
          return;
        }
        let platformKeyboardAndSaveStatusValue322: number = event.shiftKey
          ? platformKeyboardAndSaveStatusValue32
          : platformKeyboardAndSaveStatusValue8;
        let [items, setItems]: Dynamic = matchesOrientation
          ? [`ArrowLeft`, `ArrowRight`]
          : [`ArrowUp`, `ArrowDown`];
        let platformKeyboardAndSaveStatusValue323: Dynamic =
          event.key === items
            ? -platformKeyboardAndSaveStatusValue322
            : event.key === setItems
              ? platformKeyboardAndSaveStatusValue322
              : 0;
        if (platformKeyboardAndSaveStatusValue323 !== 0) {
          event.preventDefault();
          onResizeStartRef.current?.();
          onResizeRef.current(platformKeyboardAndSaveStatusValue323);
          onResizeEndRef.current?.(true);
        }
      };
      let onKeyDown2 = (
        platformKeyboardAndSaveStatusOrientation2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        onResizeEnd3(platformKeyboardAndSaveStatusOrientation2);
        onKeyDown?.(platformKeyboardAndSaveStatusOrientation2);
      };
      return (
        <div
          {...platformKeyboardAndSaveStatusOrientation}
          ref={options}
          data-cds={`ResizeHandle`}
          role={`separator`}
          aria-orientation={matchesOrientation ? `vertical` : `horizontal`}
          tabIndex={0}
          data-dragging={enabledState ? `` : undefined}
          onMouseDown={onMouseDown2}
          onKeyDown={onKeyDown2}
          className={resolveUiDesignSystemValue2(`cds-reset group/resize outline-none focus-visible:outline-hidden`, matchesOrientation ? `w-3 cursor-col-resize` : `h-3 cursor-row-resize`, side === undefined ? [`relative`, matchesOrientation ? `h-full` : `w-full`] : [`absolute`, PlatformKeyboardAndSaveStatusInlineStart[side]], className)}
        >{<div
          aria-hidden={true}
          className={clsx(`absolute rounded-full transition-shadow duration-fast group-focus-visible/resize:shadow-focus`, matchesOrientation ? `inset-y-0 left-1/2 w-3 -translate-x-1/2 cursor-col-resize` : `inset-x-0 top-1/2 h-3 -translate-y-1/2 cursor-row-resize`)}
        />}{<div
          aria-hidden={true}
          data-cds-part={`resize-pill`}
          className={clsx(`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-[opacity,color,background-color]`, matchesOrientation ? `h-full max-h-12 w-[3px] group-focus-visible/resize:max-h-none` : `h-[3px] w-full max-w-12 group-focus-visible/resize:max-w-none`, enabledState ? `text-secondary opacity-100 duration-snap` : `text-muted opacity-[var(--cds-resize-pill-force,0)] delay-200 duration-base group-hover/resize:opacity-100`, `group-focus-visible/resize:bg-fill-accent group-focus-visible/resize:opacity-100 group-focus-visible/resize:delay-0`)}
        />}</div>
      );
    },
  ));
  (platformKeyboardAndSaveStatusValue2500 = 2500);
  (PlatformKeyboardAndSaveStatusState = -1 / 0);
  (platformKeyboardAndSaveStatusSet = new (Set as Dynamic)());
  (resolvePlatformKeyboardAndSaveStatusValue = (
    ..._extraArguments: unknown[]
  ) => (typeof performance !== "undefined" ? performance.now() : Date.now()));
  (PlatformKeyboardAndSaveStatusKey = [
    {
      id: `shortcutSheet`,
      key: `Mod-/`,
      also: [`?`],
      label: `Keyboard shortcuts`,
      scope: `page`,
      group: `general`,
    },
    {
      id: `bold`,
      key: `Mod-b`,
      label: `Bold`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `italic`,
      key: `Mod-i`,
      label: `Italic`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `underline`,
      key: `Mod-u`,
      label: `Underline`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `strike`,
      key: `Mod-Shift-s`,
      also: [`Mod-Shift-x`],
      label: `Strikethrough`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `code`,
      key: `Mod-e`,
      label: `Code`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `link`,
      key: `Mod-k`,
      label: `Link`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `openLink`,
      key: `Alt-Enter`,
      label: `Open the link`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `openReference`,
      key: `Alt-Enter`,
      label: `Open a mentioned tab or document`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `formatToolbar`,
      key: `F6`,
      also: [`Mod-F6`, `Alt-F10`],
      label: `Move to the formatting toolbar or the actions of the block the cursor is in`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `comment`,
      key: `Mod-Alt-m`,
      label: `Comment on the selection, or open the comment at the cursor`,
      scope: `text`,
      group: `comments`,
    },
    {
      id: `selectAll`,
      key: `Mod-a`,
      label: `Select all`,
      scope: `text`,
      group: `text`,
    },
    {
      id: `leaveText`,
      key: `Escape`,
      label: `Leave the document`,
      scope: `page`,
      group: `general`,
    },
    {
      id: `openComment`,
      key: `Enter`,
      also: [`Space`],
      label: `Open the comment`,
      scope: `page`,
      group: `comments`,
    },
    {
      id: `closeComment`,
      key: `Escape`,
      label: `Close the comment`,
      scope: `page`,
      group: `comments`,
    },
    {
      id: `nextComment`,
      key: `ArrowDown`,
      label: `Next comment`,
      scope: `page`,
      group: `comments`,
    },
    {
      id: `previousComment`,
      key: `ArrowUp`,
      label: `Previous comment`,
      scope: `page`,
      group: `comments`,
    },
    {
      id: `paragraph`,
      key: `Mod-Alt-0`,
      label: `Normal text`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading1`,
      key: `Mod-Alt-1`,
      label: `Heading 1`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading2`,
      key: `Mod-Alt-2`,
      label: `Heading 2`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading3`,
      key: `Mod-Alt-3`,
      label: `Heading 3`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading4`,
      key: `Mod-Alt-4`,
      label: `Heading 4`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading5`,
      key: `Mod-Alt-5`,
      label: `Heading 5`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `heading6`,
      key: `Mod-Alt-6`,
      label: `Heading 6`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `toggleSection`,
      key: `Mod-Alt-Enter`,
      label: `Collapse or expand the heading's section`,
      scope: `text`,
      group: `blocks`,
      only: `docDisplay`,
    },
    {
      id: `orderedList`,
      key: `Mod-Shift-7`,
      label: `Numbered list`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `bulletList`,
      key: `Mod-Shift-8`,
      label: `Bulleted list`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `checkList`,
      key: `Mod-Shift-9`,
      label: `Checklist`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `toggleChecked`,
      key: `Mod-Enter`,
      label: `Check or uncheck the item`,
      scope: `check`,
      group: `blocks`,
    },
    {
      id: `blockquote`,
      key: `Mod-Shift-b`,
      label: `Quote`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `codeBlock`,
      key: `Mod-Alt-c`,
      label: `Code block`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `lineBreak`,
      key: `Shift-Enter`,
      label: `New line in the same block`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `enterObject`,
      key: `Enter`,
      label: `Move into the selected object’s controls`,
      scope: `text`,
      group: `blocks`,
    },
    {
      id: `deletePlaceholder`,
      key: `Backspace`,
      label: `Delete the placeholder`,
      scope: `placeholder`,
      group: `blocks`,
    },
    {
      id: `placeholderNewLine`,
      key: `Enter`,
      label: `New line below the placeholder`,
      scope: `placeholder`,
      group: `blocks`,
    },
    {
      id: `undo`,
      key: `Mod-z`,
      label: `Undo`,
      scope: `text`,
      group: `general`,
    },
    {
      id: `redo`,
      key: `Mod-Shift-z`,
      also: [`Mod-y`],
      label: `Redo`,
      scope: `text`,
      group: `general`,
    },
    {
      id: `titleToBody`,
      key: `Tab`,
      also: [`Shift-Tab`],
      label: `Move between the title and the body`,
      scope: `text`,
      group: `general`,
    },
    {
      id: `indent`,
      key: `Tab`,
      also: [`Mod-]`],
      label: `Indent`,
      scope: `list`,
      group: `blocks`,
    },
    {
      id: `outdent`,
      key: `Shift-Tab`,
      also: [`Mod-[`],
      label: `Outdent`,
      scope: `list`,
      group: `blocks`,
    },
    {
      id: `nextCell`,
      key: `Tab`,
      label: `Next cell`,
      scope: `table`,
      group: `blocks`,
    },
    {
      id: `previousCell`,
      key: `Shift-Tab`,
      label: `Previous cell`,
      scope: `table`,
      group: `blocks`,
    },
    {
      id: `repeatTableAction`,
      key: `Mod-y`,
      label: `Repeat the last table action`,
      scope: `table`,
      group: `blocks`,
    },
    {
      id: `slashMenu`,
      key: `/`,
      label: `Insert a block — table, code block, checkbox, date…`,
      scope: `text`,
      group: `insert`,
    },
    {
      id: `mention`,
      key: `@`,
      label: `Mention a person, a date, a tab or another document`,
      scope: `text`,
      group: `insert`,
    },
    {
      id: `emoji`,
      key: `:`,
      label: `Emoji, by name`,
      scope: `text`,
      group: `insert`,
    },
    {
      id: `hideComments`,
      key: `Alt-Shift-c`,
      label: `Hide or show comments`,
      scope: `chrome`,
      group: `comments`,
    },
    {
      id: `postComment`,
      key: `Enter`,
      label: `Post the comment`,
      scope: `comment`,
      group: `comments`,
    },
    {
      id: `commentLineBreak`,
      key: `Shift-Enter`,
      label: `New line`,
      scope: `comment`,
      group: `comments`,
    },
    {
      id: `commentMention`,
      key: `@`,
      label: `Mention someone`,
      scope: `comment`,
      group: `comments`,
    },
    {
      id: `leaveComment`,
      key: `Escape`,
      label: `Discard the draft or leave the box`,
      scope: `comment`,
      group: `comments`,
    },
    {
      id: `resizePanel`,
      key: `ArrowLeft`,
      also: [`ArrowRight`],
      label: `Resize a panel`,
      scope: `edge`,
      group: `general`,
    },
    {
      id: `tabsMove`,
      key: `ArrowDown`,
      also: [`ArrowUp`],
      label: `Next or previous row`,
      scope: `tabs`,
      group: `tabs`,
    },
    {
      id: `tabsEnds`,
      key: `Home`,
      also: [`End`],
      label: `First or last row`,
      scope: `tabs`,
      group: `tabs`,
    },
    {
      id: `tabsExpand`,
      key: `ArrowRight`,
      also: [`ArrowLeft`],
      label: `Show or hide the rows under a tab`,
      scope: `tabs`,
      group: `tabs`,
    },
    {
      id: `tabsPick`,
      key: `Enter`,
      also: [`Space`],
      label: `Open the tab and move into it`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsPanelNoHeadings`,
    },
    {
      id: `tabsPickOrHeading`,
      key: `Enter`,
      also: [`Space`],
      label: `Open the tab, or go to the heading`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsPanelHeadings`,
    },
    {
      id: `tabsClose`,
      key: `Escape`,
      label: `Close the panel`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsInPanel`,
    },
    {
      id: `tabsListStep`,
      key: `ArrowRight`,
      also: [`ArrowLeft`],
      label: `Go to a subtab or the parent tab`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsOnLeft`,
    },
    {
      id: `tabsListPick`,
      key: `Enter`,
      also: [`Space`],
      label: `Open the tab, or go to the heading`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsOnLeft`,
    },
    {
      id: `tabsListHeadings`,
      key: `Enter`,
      also: [`Space`],
      label: `Show or hide the open tab's headings`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsOnLeft`,
    },
    {
      id: `tabsListRename`,
      key: `F2`,
      label: `Rename the tab`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsOnLeftRename`,
    },
    {
      id: `tabsListMenu`,
      key: `Shift-F10`,
      label: `Open the tab's menu`,
      scope: `tabs`,
      group: `tabs`,
      only: `tabsOnLeft`,
    },
    {
      id: `historyMove`,
      key: `ArrowDown`,
      also: [`ArrowUp`],
      label: `Next or previous version`,
      scope: `history`,
      group: `history`,
      only: `versionHistoryV2`,
    },
    {
      id: `historySelect`,
      key: `Enter`,
      also: [`Space`],
      label: `Select the version`,
      scope: `history`,
      group: `history`,
      only: `versionHistoryV2`,
    },
    {
      id: `historyRestore`,
      key: `Enter`,
      label: `Restore the selected version`,
      scope: `history`,
      group: `history`,
      only: `versionHistoryRestore`,
    },
    {
      id: `historyClose`,
      key: `Escape`,
      label: `Close the version preview`,
      scope: `history`,
      group: `history`,
      only: `versionHistoryV2`,
    },
  ]);
  (platformKeyboardAndSaveStatusModCtrlControlAltValues = [
    `Mod`,
    `Ctrl`,
    `Control`,
    `Alt`,
    `Shift`,
    `Meta`,
    `Cmd`,
  ]);
  (PlatformKeyboardAndSaveStatusEsc = {
    " ": `Space`,
    Esc: `Escape`,
    Up: `ArrowUp`,
    Down: `ArrowDown`,
    Left: `ArrowLeft`,
    Right: `ArrowRight`,
    Del: `Delete`,
  });
  (PlatformKeyboardAndSaveStatusEsc2 = {
    " ": `space`,
    Esc: `escape`,
    ArrowUp: `up`,
    ArrowDown: `down`,
    ArrowLeft: `left`,
    ArrowRight: `right`,
    Up: `up`,
    Down: `down`,
    Left: `left`,
    Right: `right`,
    Del: `delete`,
  });
  (PlatformKeyboardAndSaveStatusInTheTabsList = `In the tabs list`);
  (PlatformKeyboardAndSaveStatusGroup = [
    {
      group: `general`,
      title: `General`,
    },
    {
      group: `text`,
      title: `Text`,
    },
    {
      group: `blocks`,
      title: `Blocks`,
    },
    {
      group: `insert`,
      title: `Insert`,
    },
    {
      group: `comments`,
      title: `Comments`,
    },
    {
      group: `tabs`,
      title: `In the tabs panel`,
    },
    {
      group: `history`,
      title: `In version history`,
    },
  ]);
  (PlatformKeyboardAndSaveStatusText = {
    text: undefined,
    page: undefined,
    chrome: `with focus outside the document`,
    list: `on a list line`,
    table: `in a table cell`,
    check: `on a checklist line`,
    tabs: undefined,
    comment: `in a comment box`,
    edge: `with focus on its edge`,
    history: undefined,
    placeholder: `with a placeholder selected`,
  });
  (platformKeyboardAndSaveStatusValue1000000 = 1e6);
  (platformKeyboardAndSaveStatusValue1500 = 1500);
  (PlatformKeyboardAndSaveStatusState2 = 2.5 * 12e3);
  (platformKeyboardAndSaveStatusValue9000 = 9e3);
  (platformKeyboardAndSaveStatusValue20000 = 2e4);
  (PlatformKeyboardAndSaveStatusOpening = {
    opening: `Opening…`,
    saving: `Saving…`,
    busy: `This document is busy. Keep this page open and your edits will save shortly.`,
    syncing: `Syncing…`,
    unsaved: `Not saved — your text is still on screen`,
    trayed: `Some text isn’t saved`,
    waiting: `Reconnecting… — catching up with the document`,
    saved: `Saved`,
    readonly: `Read-only`,
  });
  (resolvePlatformKeyboardAndSaveStatusSaving = (
    platformKeyboardAndSaveStatusSaving?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformKeyboardAndSaveStatusSaving.held &&
    !platformKeyboardAndSaveStatusSaving.readOnly &&
    !platformKeyboardAndSaveStatusSaving.covered &&
    platformKeyboardAndSaveStatusSaving.quiet === `saving` &&
    platformKeyboardAndSaveStatusSaving.judged !== `saved`);
  (resolvePlatformKeyboardAndSaveStatusRise = (
    platformKeyboardAndSaveStatusRise?: Dynamic,
    options: Dynamic = false,
    context: Dynamic = false,
    dependencies: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformKeyboardAndSaveStatusRise === `rise`
      ? true
      : platformKeyboardAndSaveStatusRise === `owed`
        ? options === true || context || (dependencies ? options : `owed`)
        : false);
  (isPlatformKeyboardAndSaveStatusClear = (
    platformKeyboardAndSaveStatusClear?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !context &&
    (dependencies ||
      platformKeyboardAndSaveStatusClear === `now` ||
      (platformKeyboardAndSaveStatusClear !== `clear` && options)));
  (platformKeyboardAndSaveStatusSet2 = new (Set as Dynamic)([
    `saving`,
    `busy`,
    `unsaved`,
    `trayed`,
  ]));
  (PlatformKeyboardAndSaveStatusBusy = {
    busy: false,
    since: undefined,
  });
  (resolvePlatformKeyboardAndSaveStatusBusy = (
    platformKeyboardAndSaveStatusBusy?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformKeyboardAndSaveStatusBusy.busy &&
    platformKeyboardAndSaveStatusBusy.unknown !== true);
  (platformKeyboardAndSaveStatusSet3 = new (Set as Dynamic)([
    `waiting`,
    `readonly`,
  ]));
  (PlatformKeyboardAndSaveStatusHalted = {
    halted: false,
    retrying: false,
    haltWords: null,
  });
  (PlatformKeyboardAndSaveStatusYourUnsavedChangesAreKeptBelow = `Your unsaved changes are kept below.`);
  (resolvePlatformKeyboardAndSaveStatusUnknownId = (
    platformKeyboardAndSaveStatusUnknownId?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformKeyboardAndSaveStatusUnknownId === `unknown_id` ||
    platformKeyboardAndSaveStatusUnknownId === `unknown_block` ||
    platformKeyboardAndSaveStatusUnknownId === `block_gone`);
  (platformKeyboardAndSaveStatusSet4 = new (Set as Dynamic)([
    `too_many`,
    `row_too_large`,
    `find_too_many`,
  ]));
  (resolvePlatformKeyboardAndSaveStatusCharCodeAt = (
    platformKeyboardAndSaveStatusCharCode?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let index = 0;
    for (; platformKeyboardAndSaveStatusCharCode.charCodeAt(index) === 8; )
      index++;
    return platformKeyboardAndSaveStatusCharCode.slice(index);
  });
  (platformKeyboardAndSaveStatusValue5000 = 5e3);
  (platformKeyboardAndSaveStatusValue10000 = 1e4);
  (PlatformKeyboardAndSaveStatusKeys = {
    keys: [],
    saidAt: 0,
  });
  (PlatformKeyboardAndSaveStatusKeys2 = {
    keys: [],
    saidAt: 0,
    swapBorn: true,
  });
  (resolvePlatformKeyboardAndSaveStatusValue6 = (
    platformKeyboardAndSaveStatusValue6?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformKeyboardAndSaveStatusValue6 && !options
      ? PlatformKeyboardAndSaveStatusKeys2
      : PlatformKeyboardAndSaveStatusKeys);
  (resolvePlatformKeyboardAndSaveStatusKeys = (
    platformKeyboardAndSaveStatusKeys?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformKeyboardAndSaveStatusKeys.swapBorn === true
      ? {
          keys: platformKeyboardAndSaveStatusKeys.keys,
          saidAt: platformKeyboardAndSaveStatusKeys.saidAt,
        }
      : platformKeyboardAndSaveStatusKeys);
  (PlatformKeyboardAndSaveStatusStyles = `input, textarea, select, iframe, [contenteditable=true], [contenteditable=''], [contenteditable=plaintext-only], dialog, [role=dialog], [role=alertdialog], [role=textbox], [role=searchbox], [role=combobox], [role=spinbutton], [role=listbox], [role=menu], [role=menubar], [role=tree], [role=grid], [role=treegrid], [role=tablist], [role=radiogroup], [role=toolbar]`);
  (PlatformKeyboardAndSaveStatusStyles2 = `button, a[href], summary, [tabindex]:not([tabindex^='-']), [role=button], [role=link], [role=checkbox], [role=radio], [role=switch], [role=tab], [role=menuitem], [role=menuitemcheckbox], [role=menuitemradio], [role=option], [role=treeitem], [role=gridcell], [role=slider]`);
  (resolvePlatformKeyboardAndSaveStatusEnter = (
    platformKeyboardAndSaveStatusEnter?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformKeyboardAndSaveStatusEnter === ` ` ||
    platformKeyboardAndSaveStatusEnter === `Enter` ||
    platformKeyboardAndSaveStatusEnter === `Spacebar`);
  (PlatformKeyboardAndSaveStatusStyles3 = `[data-inline-ask][data-face] [role="textbox"][aria-readonly="true"]`);
  (PlatformKeyboardAndSaveStatusState3 = null);
}

export { PlatformKeyboardAndSaveStatusBusy, PlatformKeyboardAndSaveStatusGroup, PlatformKeyboardAndSaveStatusInTheTabsList, PlatformKeyboardAndSaveStatusKey, PlatformKeyboardAndSaveStatusOrientation, PlatformKeyboardAndSaveStatusText, PlatformKeyboardAndSaveStatusYourUnsavedChangesAreKeptBelow, clearPlatformKeyboardAndSaveStatusDelete, collectPlatformKeyboardAndSaveStatusJoin, collectPlatformKeyboardAndSaveStatusMods, filterPlatformKeyboardAndSaveStatusJudge, filterPlatformKeyboardAndSaveStatusNext, isPlatformKeyboardAndSaveStatusCharCodeAt, isPlatformKeyboardAndSaveStatusClear, isPlatformKeyboardAndSaveStatusDown, isPlatformKeyboardAndSaveStatusFilter, isPlatformKeyboardAndSaveStatusKeyCode, isPlatformKeyboardAndSaveStatusLimit, isPlatformKeyboardAndSaveStatusPenOff, isPlatformKeyboardAndSaveStatusSaved, isPlatformKeyboardAndSaveStatusText, platformKeyboardAndSaveStatusValue1000000, platformKeyboardAndSaveStatusValue2500, resolvePlatformKeyboardAndSaveStatusAssert, resolvePlatformKeyboardAndSaveStatusBar, resolvePlatformKeyboardAndSaveStatusBid, resolvePlatformKeyboardAndSaveStatusBid2, resolvePlatformKeyboardAndSaveStatusBid3, resolvePlatformKeyboardAndSaveStatusBody, resolvePlatformKeyboardAndSaveStatusBusy, resolvePlatformKeyboardAndSaveStatusCount, resolvePlatformKeyboardAndSaveStatusDeleted, resolvePlatformKeyboardAndSaveStatusDrop, resolvePlatformKeyboardAndSaveStatusFace, resolvePlatformKeyboardAndSaveStatusFind, resolvePlatformKeyboardAndSaveStatusFolds, resolvePlatformKeyboardAndSaveStatusJudge, resolvePlatformKeyboardAndSaveStatusKept, resolvePlatformKeyboardAndSaveStatusKeptAsText, resolvePlatformKeyboardAndSaveStatusKey, resolvePlatformKeyboardAndSaveStatusKeys, resolvePlatformKeyboardAndSaveStatusLink, resolvePlatformKeyboardAndSaveStatusMoved, resolvePlatformKeyboardAndSaveStatusNavigator, resolvePlatformKeyboardAndSaveStatusNotice, resolvePlatformKeyboardAndSaveStatusOpening, resolvePlatformKeyboardAndSaveStatusPending, resolvePlatformKeyboardAndSaveStatusRepeat, resolvePlatformKeyboardAndSaveStatusRise, resolvePlatformKeyboardAndSaveStatusSaved, resolvePlatformKeyboardAndSaveStatusSaving, resolvePlatformKeyboardAndSaveStatusShiftKey, resolvePlatformKeyboardAndSaveStatusShow, resolvePlatformKeyboardAndSaveStatusTest, resolvePlatformKeyboardAndSaveStatusText, resolvePlatformKeyboardAndSaveStatusToggle, resolvePlatformKeyboardAndSaveStatusUnknownId, resolvePlatformKeyboardAndSaveStatusUnsaved2, resolvePlatformKeyboardAndSaveStatusValue2, resolvePlatformKeyboardAndSaveStatusValue3, resolvePlatformKeyboardAndSaveStatusValue4, resolvePlatformKeyboardAndSaveStatusValue5, resolvePlatformKeyboardAndSaveStatusValue6, resolvePlatformKeyboardAndSaveStatusValue7, resolvePlatformKeyboardAndSaveStatusValue8, resolvePlatformKeyboardAndSaveStatusWhy, resolvePlatformKeyboardAndSaveStatusWhy2 };

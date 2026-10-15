/** BaoCut: editor extensions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  resolvePlatformSessionAndSourcesTest9,
} from "./platform-core-platform-session-and-sources-1";
import {
  EditorExtensionsYellow,
  resolveEditorExtensionsColor2,
  resolveEditorExtensionsValue3,
} from "./platform-core-editor-extensions-1";

var editorExtensionsMap: Dynamic;

var editorExtensionsValue64: number;

function getEditorExtensionsToLowerCase(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items.length > editorExtensionsValue64 * 4)
    return null;
  let normalizedTrimmedItems = items.trim().toLowerCase();
  if (
    !normalizedTrimmedItems ||
    normalizedTrimmedItems.length > editorExtensionsValue64
  )
    return null;
  let editorExtensionsMapEntry: Dynamic = editorExtensionsMap.get(
    normalizedTrimmedItems,
  );
  if (editorExtensionsMapEntry !== undefined)
    return editorExtensionsMapEntry
      ? getEditorExtensionsToLowerCase(editorExtensionsMapEntry)
      : {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        };
  let match: Dynamic = /^#([0-9a-f]{3,8})$/.exec(normalizedTrimmedItems);
  if (match) {
    let matchItem: Dynamic = match[1];
    if (matchItem.length === 3 || matchItem.length === 4) {
      let [mappedItems, setMappedItems, mappedItems2, mappedItems3]: Dynamic = [
        ...matchItem,
      ].map((item?: Dynamic, ..._extraArguments: unknown[]) =>
        parseInt(item + item, 16),
      );
      return {
        r: mappedItems,
        g: setMappedItems,
        b: mappedItems2,
        a: mappedItems3 === undefined ? 1 : mappedItems3 / 255,
      };
    }
    if (matchItem.length === 6 || matchItem.length === 8) {
      let slice: Dynamic = (
        editorExtensions?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        parseInt(matchItem.slice(editorExtensions, editorExtensions + 2), 16);
      return {
        r: slice(0),
        g: slice(2),
        b: slice(4),
        a: matchItem.length === 8 ? slice(6) / 255 : 1,
      };
    }
    return null;
  }
  match =
    /^rgba?\(\s*([\d.]+)(%?)(?:\s*,\s*|\s+)([\d.]+)(%?)(?:\s*,\s*|\s+)([\d.]+)(%?)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/.exec(
      normalizedTrimmedItems,
    );
  if (match) {
    let parseFloat2: Dynamic = (
      editorExtensions?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Math.max(
        0,
        Math.min(
          255,
          options
            ? (parseFloat(editorExtensions) * 255) / 100
            : parseFloat(editorExtensions),
        ),
      );
    let count =
      match[7] === undefined
        ? 1
        : match[8]
          ? parseFloat(match[7]) / 100
          : parseFloat(match[7]);
    return {
      r: parseFloat2(match[1], match[2]),
      g: parseFloat2(match[3], match[4]),
      b: parseFloat2(match[5], match[6]),
      a: Math.max(0, Math.min(1, count)),
    };
  }
  match =
    /^hsla?\(\s*([\d.]+)(?:deg)?(?:\s*,\s*|\s+)([\d.]+)%(?:\s*,\s*|\s+)([\d.]+)%(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/.exec(
      normalizedTrimmedItems,
    );
  if (match) {
    let [items2, setItems, items3]: Dynamic = [
      ((parseFloat(match[1]) % 360) + 360) % 360,
      parseFloat(match[2]) / 100,
      parseFloat(match[3]) / 100,
    ];
    let count =
      match[4] === undefined
        ? 1
        : match[5]
          ? parseFloat(match[4]) / 100
          : parseFloat(match[4]);
    let getEditorExtensionsToLowerCaseHandler = (
      editorExtensions?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (editorExtensions + items2 / 30) % 12;
    let getEditorExtensionsToLowerCaseHandler2: Dynamic = (
      editorExtensions?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      items3 -
      setItems *
        Math.min(items3, 1 - items3) *
        Math.max(
          -1,
          Math.min(
            getEditorExtensionsToLowerCaseHandler(editorExtensions) - 3,
            9 - getEditorExtensionsToLowerCaseHandler(editorExtensions),
            1,
          ),
        );
    return {
      r: getEditorExtensionsToLowerCaseHandler2(0) * 255,
      g: getEditorExtensionsToLowerCaseHandler2(8) * 255,
      b: getEditorExtensionsToLowerCaseHandler2(4) * 255,
      a: Math.max(0, Math.min(1, count)),
    };
  }
  match =
    /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/.exec(
      normalizedTrimmedItems,
    );
  if (match) {
    let parseFloat2: Dynamic = (
      editorExtensions?: Dynamic,
      ..._extraArguments: unknown[]
    ) => Math.max(0, Math.min(255, parseFloat(editorExtensions) * 255));
    let count =
      match[4] === undefined
        ? 1
        : match[5]
          ? parseFloat(match[4]) / 100
          : parseFloat(match[4]);
    return {
      r: parseFloat2(match[1]),
      g: parseFloat2(match[2]),
      b: parseFloat2(match[3]),
      a: Math.max(0, Math.min(1, count)),
    };
  }
  return null;
}

var resolveEditorExtensionsValue5: Dynamic;

var EditorExtensionsYellow3: (string | number)[][];

var EditorExtensionsState: number;

function resolveEditorExtensionsGrey(
  editorExtensionsGrey?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsToLowerCase: Dynamic =
    getEditorExtensionsToLowerCase(editorExtensionsGrey);
  if (
    !editorExtensionsToLowerCase ||
    editorExtensionsToLowerCase.a < EditorExtensionsState
  )
    return null;
  let {
    h: editorExtensionsValue5,
    s: editorExtensionsValue52,
    l: editorExtensionsValue53,
  }: Dynamic = resolveEditorExtensionsValue5(editorExtensionsToLowerCase);
  if (editorExtensionsValue53 >= 0.95 || editorExtensionsValue53 <= 0.22)
    return null;
  if (editorExtensionsValue52 < 0.18) return `grey`;
  if (editorExtensionsValue5 >= 286 && editorExtensionsValue5 <= 314)
    return editorExtensionsValue53 >= 0.4 ? `pink` : `purple`;
  let EditorExtensionsYellow4: Dynamic = EditorExtensionsYellow;
  let amount: Dynamic = 1 / 0;
  for (let [
    resolveEditorExtensionsGreyResult,
    resolveEditorExtensionsGreyResult2,
  ] of EditorExtensionsYellow3 as Dynamic) {
    let min = Math.min(
      Math.abs(editorExtensionsValue5 - resolveEditorExtensionsGreyResult2),
      360 -
        Math.abs(editorExtensionsValue5 - resolveEditorExtensionsGreyResult2),
    );
    if (min < amount) {
      [EditorExtensionsYellow4, amount] = [
        resolveEditorExtensionsGreyResult,
        min,
      ];
    }
  }
  return EditorExtensionsYellow4;
}

function resolveEditorExtensionsBackground(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!items || items.length > 4096) return null;
  let items2: Dynamic = null;
  for (let resolveEditorExtensionsBackgroundResult of items.split(
    `;`,
  ) as Dynamic) {
    let resolveEditorExtensionsBackgroundResultIndex: Dynamic =
      resolveEditorExtensionsBackgroundResult.indexOf(`:`);
    if (resolveEditorExtensionsBackgroundResultIndex < 0) continue;
    let normalizedTrimmedResolveEditorExtensionsBackgroundResultSlice: Dynamic =
      resolveEditorExtensionsBackgroundResult
        .slice(0, resolveEditorExtensionsBackgroundResultIndex)
        .trim()
        .toLowerCase();
    if (
      normalizedTrimmedResolveEditorExtensionsBackgroundResultSlice !==
        `background` &&
      normalizedTrimmedResolveEditorExtensionsBackgroundResultSlice !==
        `background-color`
    )
      continue;
    let trimmedResolveEditorExtensionsBackgroundResultSlice: Dynamic =
      resolveEditorExtensionsBackgroundResult
        .slice(resolveEditorExtensionsBackgroundResultIndex + 1)
        .trim();
    if (
      trimmedResolveEditorExtensionsBackgroundResultSlice
        .toLowerCase()
        .endsWith(`!important`)
    ) {
      trimmedResolveEditorExtensionsBackgroundResultSlice =
        trimmedResolveEditorExtensionsBackgroundResultSlice
          .slice(0, -10)
          .trim();
    }
    items2 = trimmedResolveEditorExtensionsBackgroundResultSlice;
  }
  if (items2 === null || items2.length > 512) return null;
  for (let resolveEditorExtensionsBackgroundResult of (items2.match(
    /[a-z-]+\([^)]{0,64}\)|#[0-9a-f]+|[a-z]+/gi,
  ) ?? []) as Dynamic)
    if (
      getEditorExtensionsToLowerCase(
        resolveEditorExtensionsBackgroundResult,
      ) !== null
    )
      return resolveEditorExtensionsGrey(
        resolveEditorExtensionsBackgroundResult,
      );
  return null;
}

function resolveEditorExtensionsDataColor(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let attribute: Dynamic = element.getAttribute(`data-color`);
  if (resolveEditorExtensionsValue3(attribute)) return attribute;
  let matchItem = /(?:^|\s)ldoc-hl-([a-z]+)(?:\s|$)/.exec(
    element.getAttribute(`class`) ?? ``,
  )?.[1];
  return resolveEditorExtensionsValue3(matchItem)
    ? matchItem
    : (resolveEditorExtensionsBackground(element.getAttribute(`style`)) ??
        (attribute === null ? null : resolveEditorExtensionsGrey(attribute)) ??
        `yellow`);
}

var EditorExtensionsAskClaude: Dynamic;

var editorExtensionsAskClaudeCommentReactValues: string[];

var resolveEditorExtensionsValue6: (editorExtensionsValue6?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorExtensionsMoreActions: string;

var EditorExtensionsImage: Dynamic;

var resolveEditorExtensionsDelete: (editorExtensionsDelete?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorExtensionsNoun: (editorExtensionsNoun?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorExtensionsNoun2: (editorExtensionsNoun2?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorExtensionsChart: (editorExtensionsChart?: Dynamic, ..._extraArguments: unknown[]) => "chart" | "widget";

var resolveEditorExtensionsValue7: (editorExtensionsValue7?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorExtensionsStyles: string;

var resolveEditorExtensionsValue8: (editorExtensionsValue8?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorExtensionsPlaceholder: string;

var resolveEditorExtensionsRole: Dynamic;

var EditorExtensionsProject: Dynamic;

var EditorExtensionsKeys: string[];

var resolveEditorExtensionsValue9: Dynamic;

var EditorExtensionsGray: Dynamic;

var editorExtensionsGraySkyMineralOliveValues: string[];

var EditorExtensionsBlue: Dynamic;

var resolveEditorExtensionsValue10: (editorExtensionsValue10?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorExtensionsYellow4: (editorExtensionsYellow4?: Dynamic, ..._extraArguments: unknown[]) => 200 | 450;

var EditorExtensionsStrong: Dynamic;

var EditorExtensionsAccent: Dynamic;

var resolveEditorExtensionsToLowerCase: Dynamic;

var EditorExtensionsLight: Dynamic;

var resolveEditorExtensionsValue11: (editorExtensionsValue11?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorExtensionsNeutral: Dynamic;

var collectEditorExtensionsLight: (collectEditorExtensionsLight2?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var collectEditorExtensionsJoin: Dynamic;

var EditorExtensionsBlue2: string;

var editorExtensionsState: Dynamic;

function resolveEditorExtensionsPlatform(
  editorExtensionsPlatform?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorExtensionsState = Object.freeze({
    platform: undefined,
    ...editorExtensionsPlatform,
  });
}

function resolveEditorExtensionsValue12(
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorExtensionsState)
    throw Error(
      `proseWorld unset — this bundle's entry must call setProseWorld() before prose gesture/render code runs (see src/lib/prose/proseWorld.ts header)`,
    );
  return editorExtensionsState;
}

var resolveEditorExtensionsValue13: Dynamic;

var editorExtensionsValue0: number;

function resolveEditorExtensionsMintId(..._extraArguments: unknown[]): Dynamic {
  return editorExtensionsState
    ? editorExtensionsState.mintId()
    : `u${(++editorExtensionsValue0).toString(36)}`;
}

var resolveEditorExtensionsValue14: Dynamic;

var resolveEditorExtensionsGray: Dynamic;

function collectEditorExtensionsAuto(
  collectEditorExtensionsAuto2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let parse: Dynamic = JSON.parse(String(collectEditorExtensionsAuto2));
    if (!Array.isArray(parse)) return [];
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    return parse.map(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let text: Dynamic = String(rolldownRImport2?.id ?? ``);
        for (let index = 0; !text || uniqueItems.has(text); index++)
          text =
            index === 0
              ? resolveEditorExtensionsValue14()
              : `${resolveEditorExtensionsValue14()}.${index}`;
        uniqueItems.add(text);
        return {
          id: text,
          l: [...String(rolldownRImport2?.l ?? ``)].slice(0, 80).join(``),
          c: resolveEditorExtensionsGray(rolldownRImport2?.c),
          auto: rolldownRImport2?.auto === true,
        };
      },
    );
  } catch {
    return [];
  }
}

var resolveEditorExtensionsValue15: Dynamic;

var resolveEditorExtensionsFind: Dynamic;

function resolveEditorExtensionsOpt(
  editorExtensionsOpt?: Dynamic,
  options?: unknown,
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectEditorExtensionsAuto2: Dynamic =
    collectEditorExtensionsAuto(editorExtensionsOpt);
  let opt2: Dynamic = resolveEditorExtensionsFind(
    collectEditorExtensionsAuto2,
    options,
  );
  let owned = collectEditorExtensionsAuto2.length > 0;
  let legacy = !owned && typeof items == `string` && items.length > 0;
  return {
    opt: opt2,
    owned: owned,
    legacy: legacy,
    label: opt2 ? opt2.l : legacy && typeof options == `string` ? options : ``,
  };
}

var editorExtensionsPattern7: RegExp;

var editorExtensionsPattern8: RegExp;

var resolveEditorExtensionsJoin: Dynamic;

var resolveEditorExtensionsReplace: Dynamic;

var editorExtensionsPattern9: RegExp;

var editorExtensionsPattern10: RegExp;

var editorExtensionsPattern11: RegExp;

function resolveEditorExtensionsTrim(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof items != `string` || items.length === 0) return null;
  let trimmedReplace = (items.length > 1600 ? items.slice(0, 1600) : items)
    .replace(editorExtensionsPattern11, ` `)
    .replace(editorExtensionsPattern9, ` `)
    .replace(editorExtensionsPattern10, ``)
    .replace(/\s+/g, ` `)
    .trim();
  if (trimmedReplace.length === 0) return null;
  let items2 = [...trimmedReplace];
  return (
    (items2.length > 200 ? items2.slice(0, 200) : items2).join(``).trim() ||
    null
  );
}

function resolveEditorExtensionsValue16(
  editorExtensionsValue16?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsTrim = resolveEditorExtensionsTrim(
    editorExtensionsValue16,
  );
  return editorExtensionsTrim === null
    ? null
    : resolveEditorExtensionsJoin(editorExtensionsTrim) || null;
}

var EditorExtensionsClaude: string;

var resolveEditorExtensionsClaude: Dynamic;

var resolveEditorExtensionsLabel: Dynamic;

function isEditorExtensionsFloor(
  editorExtensionsFloor?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !(editorExtensionsFloor > 0) || !(options > 0)
    ? 160
    : Math.max(48, Math.floor(Math.min(editorExtensionsFloor, 672) / options));
}

var editorExtensionsValue1000: number;

var editorExtensionsValue4000: number;

function collectEditorExtensionsSlice(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(items) || items.length === 0) return null;
  let mappedItemsSlice = items
    .slice(0, editorExtensionsValue1000)
    .map((rolldownNImportSlice?: Dynamic, ..._extraArguments: unknown[]) => {
      let trunc = Math.trunc(Number(rolldownNImportSlice));
      return Number.isFinite(trunc)
        ? Math.min(Math.max(0, trunc), editorExtensionsValue4000)
        : null;
    });
  return mappedItemsSlice.every(
    (mappedItemsSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
      mappedItemsSlice2 === null,
  )
    ? null
    : mappedItemsSlice.map(
        (mappedItemsSlice2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          mappedItemsSlice2 ?? 0,
      );
}

function isEditorExtensionsTrim(
  editorExtensionsTrim?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof editorExtensionsTrim != `string`) return null;
  let trimmedReplace = editorExtensionsTrim
    .trim()
    .replace(/^\[|\]$/g, ``)
    .trim();
  if (!trimmedReplace) return null;
  let mappedTrimmedReplaceParts = trimmedReplace
    .split(`,`)
    .map((trimmedReplacePart?: Dynamic, ..._extraArguments: unknown[]) =>
      trimmedReplacePart.trim() === ``
        ? NaN
        : Math.trunc(Number(trimmedReplacePart)),
    );
  return !mappedTrimmedReplaceParts.every(Number.isFinite) ||
    mappedTrimmedReplaceParts.length > editorExtensionsValue1000
    ? null
    : mappedTrimmedReplaceParts.map(
        (mappedTrimmedReplacePart?: Dynamic, ..._extraArguments: unknown[]) =>
          Math.min(
            Math.max(0, mappedTrimmedReplacePart),
            editorExtensionsValue4000,
          ),
      );
}

function resolveEditorExtensionsIsInteger(
  editorExtensionsIsInteger?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let number2 = Number(editorExtensionsIsInteger);
  return Number.isInteger(number2) && number2 >= 1
    ? Math.min(number2, options)
    : 1;
}

function resolveEditorExtensionsDataColwidth(
  editorExtensionsDataColwidth?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    "data-colwidth": editorExtensionsDataColwidth.join(`,`),
    style: `max-width:${editorExtensionsDataColwidth.reduce((accumulator?: Dynamic, accumulator2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => accumulator + accumulator2, 0)}px`,
  };
}

var EditorExtensionsProseBlockMapUnreadable: Dynamic;

var editorExtensionsValue1024: number;

var editorExtensionsValue10002: number;

var editorExtensionsSet4: Dynamic;

var editorExtensionsSet5: Dynamic;

var resolveEditorExtensionsValue17: Dynamic;

var resolveEditorExtensionsTrim2: Dynamic;

var resolveEditorExtensionsTrue: (editorExtensionsTrue?: Dynamic, ..._extraArguments: unknown[]) => boolean | null;

var resolveEditorExtensionsValue18: Dynamic;

function resolveEditorExtensionsAttrs(
  editorExtensions?: Dynamic,
  options: Dynamic = editorExtensionsSet4,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  if (resolveEditorExtensionsValue17(editorExtensions.attrs))
    for (let [
      resolveEditorExtensionsAttrsResult,
      resolveEditorExtensionsAttrsResult2,
    ] of Object.entries(editorExtensions.attrs) as Dynamic)
      if (resolveEditorExtensionsAttrsResult2 != null) {
        record2[resolveEditorExtensionsAttrsResult] =
          resolveEditorExtensionsAttrsResult2;
      }
  for (let [
    resolveEditorExtensionsAttrsResult,
    resolveEditorExtensionsAttrsResult2,
  ] of Object.entries(editorExtensions) as Dynamic)
    if (
      !options.has(resolveEditorExtensionsAttrsResult) &&
      resolveEditorExtensionsAttrsResult2 != null
    ) {
      record2[resolveEditorExtensionsAttrsResult] =
        resolveEditorExtensionsAttrsResult2;
    }
  return record2;
}

function isEditorExtensionsRoot(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveEditorExtensionsValue17(file) || typeof file.type == `string`)
    return false;
  let root: Dynamic = file.root;
  return resolveEditorExtensionsValue17(root) && root.type === `root`;
}

var resolveEditorExtensionsDropped: (editorExtensionsDropped?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolveEditorExtensionsValue19: (editorExtensionsValue19?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveEditorExtensionsSpilled(
  editorExtensionsSpilled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsSpilled == null
    ? []
    : Array.isArray(editorExtensionsSpilled)
      ? editorExtensionsSpilled
      : resolveEditorExtensionsValue19(
          resolveEditorExtensionsValue17(editorExtensionsSpilled)
            ? `spilled`
            : `content-shape`,
        );
}

function resolveEditorExtensionsContentShape(
  node?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let entry of resolveEditorExtensionsSpilled(node.content) as Dynamic) {
    if (!resolveEditorExtensionsValue17(entry))
      return resolveEditorExtensionsValue19(`content-shape`);
    if (entry.kind === `gap`) return resolveEditorExtensionsValue19(`partial`);
    if (entry.kind !== `block` || typeof entry.id != `string`)
      return resolveEditorExtensionsValue19(`content-shape`);
    let mapItem: Dynamic = options.map[entry.id];
    if (
      !resolveEditorExtensionsValue17(mapItem) ||
      typeof mapItem.type != `string`
    )
      return resolveEditorExtensionsValue19(`dangling-ref`);
    if (options.seen.has(entry.id))
      return resolveEditorExtensionsValue19(`shared-child`);
    options.seen.add(entry.id);
    if (mapItem.truncated === true)
      return resolveEditorExtensionsValue19(`partial`);
    if (context + 1 > editorExtensionsValue1024)
      return resolveEditorExtensionsValue19(`too-deep`);
    items.push(mapItem);
  }
  return items;
}

function resolveEditorExtensionsHref(
  editorExtensionsHref?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let type: Dynamic = editorExtensionsHref.type;
  if (
    type === `bold` ||
    type === `italic` ||
    type === `strike` ||
    type === `code`
  )
    return {
      type: type,
    };
  if (type === `link`) {
    let href: Dynamic =
      resolveEditorExtensionsValue18(editorExtensionsHref.href) ??
      resolveEditorExtensionsValue18(
        resolveEditorExtensionsValue17(editorExtensionsHref.attrs)
          ? editorExtensionsHref.attrs.href
          : null,
      );
    return href === null
      ? null
      : {
          type: `link`,
          href: href,
        };
  }
  return null;
}

var resolveEditorExtensionsValue20: (editorExtensionsValue20?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveEditorExtensionsAtom(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!resolveEditorExtensionsValue17(entry) || entry.kind !== `atom`)
    return null;
  let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
    entry,
    editorExtensionsSet5,
  );
  return entry.type === `checkbox`
    ? (resolveEditorExtensionsTrue(editorExtensionsAttrs.checked) ?? false)
    : entry.type !== `builtin` ||
        !resolveEditorExtensionsValue17(editorExtensionsAttrs.builtin) ||
        editorExtensionsAttrs.builtin.kind !== `checkbox`
      ? null
      : (resolveEditorExtensionsTrue(editorExtensionsAttrs.builtin.checked) ??
        false);
}

function resolveEditorExtensionsLabel2(
  editorExtensionsLabel2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  let editorExtensionsTrim = resolveEditorExtensionsTrim(
    editorExtensionsLabel2.label,
  );
  return editorExtensionsTrim === null
    ? null
    : (context ? options.personLabel : options.mentionLabel)
      ? editorExtensionsTrim
      : (resolveEditorExtensionsDropped(options, `mention:label`), null);
}

function resolveEditorExtensionsPrincipal(
  editorExtensionsPrincipal?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let type: Dynamic =
    typeof editorExtensionsPrincipal.type == `string`
      ? editorExtensionsPrincipal.type
      : ``;
  let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
    editorExtensionsPrincipal,
    editorExtensionsSet5,
  );
  let updateOptionItem: Dynamic = (
    editorExtensionsPrincipal2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {};
    for (let [
      resolveEditorExtensionsPrincipalResult,
      resolveEditorExtensionsPrincipalResult2,
    ] of Object.entries(editorExtensionsPrincipal2) as Dynamic)
      if (
        !editorExtensionsSet5.has(resolveEditorExtensionsPrincipalResult) &&
        resolveEditorExtensionsPrincipalResult2 != null
      ) {
        record2[resolveEditorExtensionsPrincipalResult] =
          resolveEditorExtensionsPrincipalResult2;
      }
    return record2;
  };
  let resolveEditorExtensionsPrincipalHandler: Dynamic = (
    type2?: Dynamic,
    attrs?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Object.keys(attrs).length > 0
      ? {
          type: type2,
          attrs: attrs,
        }
      : {
          type: type2,
        };
  if (type === `hardBreak` || type === `br`)
    return {
      type: `hardBreak`,
    };
  if (type === `media`)
    return resolveEditorExtensionsPrincipalHandler(
      `media`,
      updateOptionItem(editorExtensionsAttrs),
    );
  if (type === `builtin`) {
    let builtin: Dynamic = resolveEditorExtensionsValue17(
      editorExtensionsAttrs.builtin,
    )
      ? editorExtensionsAttrs.builtin
      : {};
    let updateOptionItem2: Dynamic = updateOptionItem(builtin);
    switch (builtin.kind) {
      case `mention`: {
        if (
          resolveEditorExtensionsValue18(updateOptionItem2.principal) === null
        )
          return resolveEditorExtensionsPrincipalHandler(`mention`, {});
        let label = resolveEditorExtensionsClaude(updateOptionItem2)
          ? resolveEditorExtensionsLabel2(updateOptionItem2, options, true)
          : null;
        return resolveEditorExtensionsPrincipalHandler(`mention`, {
          principal: updateOptionItem2.principal,
          ...(label === null
            ? {}
            : {
                label: label,
              }),
        });
      }
      case `ref`:
      case `container`: {
        let label = resolveEditorExtensionsLabel2(updateOptionItem2, options);
        return resolveEditorExtensionsPrincipalHandler(
          `mention`,
          resolveEditorExtensionsValue18(updateOptionItem2.ref) === null
            ? {}
            : {
                ref: updateOptionItem2.ref,
                ...(label === null
                  ? {}
                  : {
                      label: label,
                    }),
              },
        );
      }
      case `date`:
        return resolveEditorExtensionsPrincipalHandler(
          `date`,
          updateOptionItem2.ts == null
            ? {}
            : {
                ts: updateOptionItem2.ts,
              },
        );
      case `enum`: {
        let record2: Dynamic = {};
        if (updateOptionItem2.enum != null) {
          record2.enum = updateOptionItem2.enum;
        }
        if (updateOptionItem2.index != null) {
          record2.index = updateOptionItem2.index;
        }
        return resolveEditorExtensionsPrincipalHandler(`dropdown`, record2);
      }
      case `checkbox`:
        resolveEditorExtensionsDropped(options, `checkbox`);
        return null;
      default:
        resolveEditorExtensionsDropped(options, `atom:opaque`);
        return null;
    }
  }
  if (type === `mention`) {
    let updateOptionItem2: Dynamic = updateOptionItem(editorExtensionsAttrs);
    let editorExtensionsLabel2 =
      resolveEditorExtensionsValue18(updateOptionItem2.ref) !== null &&
      resolveEditorExtensionsValue18(updateOptionItem2.principal) === null
        ? resolveEditorExtensionsLabel2(updateOptionItem2, options)
        : resolveEditorExtensionsClaude(updateOptionItem2)
          ? resolveEditorExtensionsLabel2(updateOptionItem2, options, true)
          : null;
    if (editorExtensionsLabel2 === null) {
      delete updateOptionItem2.label;
    } else {
      updateOptionItem2.label = editorExtensionsLabel2;
    }
    return resolveEditorExtensionsPrincipalHandler(type, updateOptionItem2);
  }
  return type === `date` || type === `dropdown`
    ? resolveEditorExtensionsPrincipalHandler(
        type,
        updateOptionItem(editorExtensionsAttrs),
      )
    : type === `checkbox`
      ? (resolveEditorExtensionsDropped(options, `checkbox`), null)
      : (resolveEditorExtensionsDropped(
          options,
          `atom:${type === `` ? `unknown` : type}`,
        ),
        null);
}

function resolveEditorExtensionsText(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let inline: Dynamic = [];
  let leadChecked: Dynamic = null;
  let resolveEditorExtensionsValue202 = (
    text?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let marks: Dynamic = [];
    for (let resolveEditorExtensionsTextResult of items as Dynamic)
      if (
        resolveEditorExtensionsTextResult.mark !== null &&
        !marks.some(
          (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            rolldownRImport2.type ===
            resolveEditorExtensionsTextResult.mark?.type,
        )
      ) {
        marks.push(resolveEditorExtensionsTextResult.mark);
      }
    let at2: Dynamic = inline.at(-1);
    if (
      at2?.type === `text` &&
      resolveEditorExtensionsValue20(
        at2.marks,
        marks.length > 0 ? marks : undefined,
      )
    ) {
      at2.text += text;
    } else {
      inline.push(
        marks.length > 0
          ? {
              type: `text`,
              text: text,
              marks: marks,
            }
          : {
              type: `text`,
              text: text,
            },
      );
    }
  };
  let findLastIndex = (
    editorExtensionsText?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let type: Dynamic =
      typeof editorExtensionsText.type == `string`
        ? editorExtensionsText.type
        : ``;
    let editorExtensionsValue18: Dynamic = resolveEditorExtensionsValue18(
      editorExtensionsText.id,
    );
    if (editorExtensionsText.edge === `begin`) {
      let mark: Dynamic = resolveEditorExtensionsHref(editorExtensionsText);
      if (mark === null) {
        resolveEditorExtensionsDropped(
          options,
          `mark:${type === `` ? `unknown` : type}`,
        );
      }
      items.push({
        id: editorExtensionsValue18,
        type: type,
        mark: mark,
      });
    } else if (editorExtensionsText.edge === `end`) {
      let findLastIndex2: Dynamic =
        editorExtensionsValue18 === null
          ? -1
          : items.findLastIndex(
              (
                editorExtensionsText2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => editorExtensionsText2.id === editorExtensionsValue18,
            );
      if (findLastIndex2 < 0 && type !== ``) {
        findLastIndex2 = items.findLastIndex(
          (editorExtensionsText2?: Dynamic, ..._extraArguments: unknown[]) =>
            editorExtensionsText2.type === type,
        );
      }
      if (findLastIndex2 >= 0) {
        items.splice(findLastIndex2, 1);
      }
    }
  };
  for (let [
    resolveEditorExtensionsTextResult,
    entry,
  ] of resolveEditorExtensionsSpilled(node.content).entries() as Dynamic) {
    if (!resolveEditorExtensionsValue17(entry))
      return resolveEditorExtensionsValue19(`content-shape`);
    switch (entry.kind) {
      case `text`:
        if (typeof entry.text != `string`)
          return resolveEditorExtensionsValue19(
            resolveEditorExtensionsValue17(entry.text)
              ? `spilled`
              : `content-shape`,
          );
        if (entry.text !== ``) {
          resolveEditorExtensionsValue202(entry.text);
        }
        break;
      case `marks`:
        for (let resolveEditorExtensionsTextResult2 of resolveEditorExtensionsSpilled(
          entry.items,
        ) as Dynamic) {
          if (
            !resolveEditorExtensionsValue17(resolveEditorExtensionsTextResult2)
          )
            return resolveEditorExtensionsValue19(`content-shape`);
          findLastIndex(resolveEditorExtensionsTextResult2);
        }
        break;
      case `atom`: {
        let editorExtensionsAtom =
          resolveEditorExtensionsTextResult === 0
            ? resolveEditorExtensionsAtom(entry)
            : null;
        if (editorExtensionsAtom !== null) {
          leadChecked = editorExtensionsAtom;
          break;
        }
        let editorExtensionsPrincipal: Dynamic =
          resolveEditorExtensionsPrincipal(entry, options);
        if (editorExtensionsPrincipal !== null) {
          inline.push(editorExtensionsPrincipal);
        }
        break;
      }
      case `gap`:
        return resolveEditorExtensionsValue19(`partial`);
      default:
        return resolveEditorExtensionsValue19(`content-shape`);
    }
  }
  return {
    inline: inline,
    leadChecked: leadChecked,
  };
}

var editorExtensionsSet6: Dynamic;

var editorExtensionsSet7: Dynamic;

var editorExtensionsSet8: Dynamic;

function resolveEditorExtensionsInline(
  editorExtensionsInline?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
    editorExtensionsInline,
  );
  let heading: Dynamic =
    editorExtensionsInline.type === `heading`
      ? (resolveEditorExtensionsTrim2(editorExtensionsAttrs.level) ?? 1)
      : resolveEditorExtensionsTrim2(editorExtensionsAttrs.heading);
  let { inline: editorExtensionsText, leadChecked: leadChecked }: Dynamic =
    resolveEditorExtensionsText(editorExtensionsInline, options);
  let block: Dynamic = {
    type: `paragraph`,
  };
  if (heading !== null) {
    block.attrs = {
      heading: heading,
    };
  }
  if (editorExtensionsText.length > 0) {
    block.content = editorExtensionsText;
  }
  return {
    block: block,
    leadChecked: leadChecked,
  };
}

function resolveEditorExtensionsChecked(
  editorExtensionsChecked?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsTrue = resolveEditorExtensionsTrue(
    resolveEditorExtensionsAttrs(editorExtensionsChecked).checked,
  );
  let editorExtensionsTrue2 =
    options === null
      ? null
      : resolveEditorExtensionsTrue(
          resolveEditorExtensionsAttrs(options).checked,
        );
  return editorExtensionsTrue ?? editorExtensionsTrue2 ?? context;
}

function isEditorExtensionsChecked2(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorExtensionsTrue = resolveEditorExtensionsTrue(
    resolveEditorExtensionsAttrs(node).checked,
  );
  if (editorExtensionsTrue !== null) return editorExtensionsTrue;
  let editorExtensionsSpilledItem: Dynamic = resolveEditorExtensionsSpilled(
    node.content,
  )[0];
  let mapItem: Dynamic =
    resolveEditorExtensionsValue17(editorExtensionsSpilledItem) &&
    typeof editorExtensionsSpilledItem.id == `string`
      ? options.map[editorExtensionsSpilledItem.id]
      : undefined;
  return !resolveEditorExtensionsValue17(mapItem) ||
    typeof mapItem.type != `string` ||
    !editorExtensionsSet7.has(mapItem.type)
    ? null
    : (resolveEditorExtensionsTrue(
        resolveEditorExtensionsAttrs(mapItem).checked,
      ) ??
        resolveEditorExtensionsAtom(
          resolveEditorExtensionsSpilled(mapItem.content)[0],
        ));
}

function resolveEditorExtensionsChecked2(
  editorExtensionsChecked2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorExtensionsChecked2.type !== `listItem`)
    return {
      type: `listItem`,
      content: [
        collectEditorExtensionsInline(
          editorExtensionsChecked2,
          context,
          dependencies,
        ),
      ],
    };
  let editorExtensionsContentShape: Dynamic =
    resolveEditorExtensionsContentShape(
      editorExtensionsChecked2,
      context,
      dependencies,
    );
  let editorExtensionsContentShapeItem: Dynamic =
    editorExtensionsContentShape[0];
  let editorExtensionsContentShapeItem2: Dynamic =
    editorExtensionsContentShapeItem !== undefined &&
    editorExtensionsSet7.has(editorExtensionsContentShapeItem.type)
      ? editorExtensionsContentShapeItem
      : null;
  let editorExtensionsInline: Dynamic =
    editorExtensionsContentShapeItem2 === null
      ? null
      : resolveEditorExtensionsInline(
          editorExtensionsContentShapeItem2,
          context,
        );
  let content: Dynamic =
    editorExtensionsInline === null ? [] : [editorExtensionsInline.block];
  for (let resolveEditorExtensionsChecked2Result of editorExtensionsContentShape.slice(
    editorExtensionsContentShapeItem2 === null ? 0 : 1,
  ) as Dynamic)
    content.push(
      collectEditorExtensionsInline(
        resolveEditorExtensionsChecked2Result,
        context,
        dependencies + 1,
      ),
    );
  if (content.length === 0) {
    content.push({
      type: `paragraph`,
    });
  }
  let record2: Dynamic = {
    type: `listItem`,
    content: content,
  };
  if (options) {
    record2.attrs = {
      checked:
        resolveEditorExtensionsChecked(
          editorExtensionsChecked2,
          editorExtensionsContentShapeItem2,
          editorExtensionsInline?.leadChecked ?? null,
        ) ?? false,
    };
  }
  return record2;
}

function collectEditorExtensionsKind(
  collectEditorExtensionsKind2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
    collectEditorExtensionsKind2,
  );
  let editorExtensionsContentShape: Dynamic =
    resolveEditorExtensionsContentShape(
      collectEditorExtensionsKind2,
      options,
      context,
    );
  let matchesKind: Dynamic =
    editorExtensionsAttrs.kind === `check` ||
    resolveEditorExtensionsTrue(editorExtensionsAttrs.task) === true ||
    editorExtensionsContentShape.some(
      (
        editorExtensionsContentShape2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorExtensionsContentShape2.type === `listItem` &&
        isEditorExtensionsChecked2(editorExtensionsContentShape2, options) !==
          null,
    );
  let matchesType =
    collectEditorExtensionsKind2.type === `orderedList` ||
    editorExtensionsAttrs.kind === `ordered`;
  let kind = matchesKind ? `check` : matchesType ? `ordered` : `bullet`;
  let attrs: Dynamic = {
    kind: kind,
  };
  let editorExtensionsTrim2: Dynamic = resolveEditorExtensionsTrim2(
    editorExtensionsAttrs.start,
  );
  if (
    kind === `ordered` &&
    editorExtensionsTrim2 !== null &&
    editorExtensionsTrim2 !== 1
  ) {
    attrs.start = editorExtensionsTrim2;
  }
  return {
    type: `list`,
    attrs: attrs,
    content: editorExtensionsContentShape.map(
      (
        editorExtensionsContentShape2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveEditorExtensionsChecked2(
          editorExtensionsContentShape2,
          matchesKind,
          options,
          context + 1,
        ),
    ),
  };
}

function collectEditorExtensionsContentShape(
  collectEditorExtensionsContentShape2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorExtensionsSet8.has(collectEditorExtensionsContentShape2.type))
    return resolveEditorExtensionsValue19(`content-shape`);
  let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
    collectEditorExtensionsContentShape2,
  );
  let record2: Dynamic = {};
  if (
    collectEditorExtensionsContentShape2.type === `tableHeader` ||
    resolveEditorExtensionsTrue(editorExtensionsAttrs.header) === true
  ) {
    record2.header = true;
  }
  let editorExtensionsTrim2: Dynamic = resolveEditorExtensionsTrim2(
    editorExtensionsAttrs.colspan,
  );
  let editorExtensionsTrim22: Dynamic = resolveEditorExtensionsTrim2(
    editorExtensionsAttrs.rowspan,
  );
  if (editorExtensionsTrim2 !== null) {
    record2.colspan = editorExtensionsTrim2;
  }
  if (editorExtensionsTrim22 !== null) {
    record2.rowspan = editorExtensionsTrim22;
  }
  let collectEditorExtensionsSlice2: Dynamic = collectEditorExtensionsSlice(
    editorExtensionsAttrs.colwidth,
  );
  if (collectEditorExtensionsSlice2) {
    let length2: Dynamic = resolveEditorExtensionsIsInteger(
      editorExtensionsTrim2 ?? 1,
      editorExtensionsValue10002,
    );
    record2.colwidth = Array.from<Dynamic, Dynamic>(
      {
        length: length2,
      },
      (
        collectEditorExtensionsContentShape3?: unknown,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => collectEditorExtensionsSlice2[options2] ?? 0,
    );
  }
  let mappedEditorExtensionsContentShape: Dynamic =
    resolveEditorExtensionsContentShape(
      collectEditorExtensionsContentShape2,
      options,
      context,
    ).map(
      (
        editorExtensionsContentShape?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        collectEditorExtensionsInline(
          editorExtensionsContentShape,
          options,
          context + 1,
        ),
    );
  let record3: Dynamic = {
    type: `cell`,
  };
  if (Object.keys(record2).length > 0) {
    record3.attrs = record2;
  }
  if (mappedEditorExtensionsContentShape.length > 0) {
    record3.content = mappedEditorExtensionsContentShape;
  }
  return record3;
}

function collectEditorExtensionsTable(
  collectEditorExtensionsTable2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    type: `table`,
    content: resolveEditorExtensionsContentShape(
      collectEditorExtensionsTable2,
      options,
      context,
    ).map(
      (
        editorExtensionsContentShape?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorExtensionsContentShape.type === `tableRow`
          ? {
              type: `tableRow`,
              content: resolveEditorExtensionsContentShape(
                editorExtensionsContentShape,
                options,
                context + 1,
              ).map(
                (
                  editorExtensionsContentShape2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  collectEditorExtensionsContentShape(
                    editorExtensionsContentShape2,
                    options,
                    context + 2,
                  ),
              ),
            }
          : resolveEditorExtensionsValue19(`content-shape`),
    ),
  };
}

function collectEditorExtensionsInline(
  collectEditorExtensionsInline2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let type: Dynamic = collectEditorExtensionsInline2.type;
  if (editorExtensionsSet7.has(type)) {
    let editorExtensionsInline: Dynamic = resolveEditorExtensionsInline(
      collectEditorExtensionsInline2,
      options,
    );
    if (editorExtensionsInline.leadChecked !== null) {
      resolveEditorExtensionsDropped(options, `checkbox`);
    }
    return editorExtensionsInline.block;
  }
  if (editorExtensionsSet6.has(type))
    return collectEditorExtensionsKind(
      collectEditorExtensionsInline2,
      options,
      context,
    );
  switch (type) {
    case `codeBlock`: {
      let language: Dynamic = resolveEditorExtensionsValue18(
        resolveEditorExtensionsAttrs(collectEditorExtensionsInline2).language,
      );
      let { inline: editorExtensionsText }: Dynamic =
        resolveEditorExtensionsText(collectEditorExtensionsInline2, options);
      let record2: Dynamic = {
        type: `codeBlock`,
      };
      if (language !== null) {
        record2.attrs = {
          language: language,
        };
      }
      if (editorExtensionsText.length > 0) {
        record2.content = editorExtensionsText;
      }
      return record2;
    }
    case `blockquote`:
      return {
        type: `blockquote`,
        content: resolveEditorExtensionsContentShape(
          collectEditorExtensionsInline2,
          options,
          context,
        ).map(
          (
            editorExtensionsContentShape?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            collectEditorExtensionsInline(
              editorExtensionsContentShape,
              options,
              context + 1,
            ),
        ),
      };
    case `table`:
      return collectEditorExtensionsTable(
        collectEditorExtensionsInline2,
        options,
        context,
      );
    case `horizontalRule`:
      return {
        type: `horizontalRule`,
      };
    case `embed`: {
      let editorExtensionsAttrs: Dynamic = resolveEditorExtensionsAttrs(
        collectEditorExtensionsInline2,
      );
      let editorExtensionsValue18: Dynamic = resolveEditorExtensionsValue18(
        editorExtensionsAttrs.ref,
      );
      return editorExtensionsValue18 === null
        ? resolveEditorExtensionsValue19(`content-shape`)
        : ([`width`, `align`, `caption`].some(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              editorExtensionsAttrs[item] != null,
          ) && resolveEditorExtensionsDropped(options, `embed attrs`),
          {
            type: `embed`,
            attrs: {
              ref: editorExtensionsValue18,
            },
          });
    }
    default:
      return resolveEditorExtensionsValue19(
        type === `listItem` ||
          type === `tableRow` ||
          editorExtensionsSet8.has(type)
          ? `content-shape`
          : `unknown-block`,
      );
  }
}

function filterEditorExtensionsMap(
  filterEditorExtensionsMap2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let map: Dynamic = filterEditorExtensionsMap2;
  let root: Dynamic = map.root;
  if (!resolveEditorExtensionsValue17(root) || root.type !== `root`)
    return resolveEditorExtensionsValue19(`no-root`);
  if (root.truncated === true) return resolveEditorExtensionsValue19(`partial`);
  let record2: Dynamic = {
    map: map,
    seen: new (Set as Dynamic)([`root`]),
    dropped: {},
    mentionLabel: options.mentionLabel === true,
    personLabel: options.personLabel === true,
  };
  return {
    blocks: resolveEditorExtensionsContentShape(root, record2, 0)
      .filter(
        (
          editorExtensionsContentShape?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          editorExtensionsContentShape.type === `pending`
            ? (resolveEditorExtensionsDropped(record2, `pending`), false)
            : true,
      )
      .map(
        (
          filteredEditorExtensionsContentShape?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          collectEditorExtensionsInline(
            filteredEditorExtensionsContentShape,
            record2,
            1,
          ),
      ),
    dropped: record2.dropped,
  };
}

var resolveEditorExtensionsCharCodeAt: (editorExtensionsCharCode?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => 1 | 2;

function resolveEditorExtensionsValue21(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let index = 0;
  for (
    let count: Dynamic = 0;
    count < items.length;
    count += resolveEditorExtensionsCharCodeAt(items, count)
  )
    index++;
  return index;
}

var resolveEditorExtensionsValue22: (editorExtensionsValue22?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveEditorExtensionsSess(
  editorExtensionsSess?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic = editorExtensionsSess.lastIndexOf(`.`);
  let number2 = Number(editorExtensionsSess.slice(lastIndexOf + 1));
  return lastIndexOf > 0 && Number.isInteger(number2) && number2 >= 0
    ? {
        sess: editorExtensionsSess.slice(0, lastIndexOf),
        i: number2,
      }
    : null;
}

var editorExtensionsValue4096: number;

function resolveEditorExtensionsTrunc(
  editorExtensionsTrunc?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let trunc = Math.trunc(Number(editorExtensionsTrunc));
  return Number.isFinite(trunc) && trunc >= 1
    ? Math.min(trunc, editorExtensionsValue4096)
    : null;
}

var resolveEditorExtensionsCenter: Dynamic;

function resolveEditorExtensionsTrim3(
  editorExtensionsTrim3?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof editorExtensionsTrim3 != `string`) return null;
  let trimmedEditorExtensionsTrim3 = editorExtensionsTrim3.trim();
  return trimmedEditorExtensionsTrim3 &&
    new TextEncoder().encode(trimmedEditorExtensionsTrim3).length <= 1024
    ? trimmedEditorExtensionsTrim3
    : null;
}

var EditorExtensionsCellAlias: {
    cellAlias: boolean;
    rowSlots: boolean;
    mentionLabel: boolean;
    hrefFragment: boolean;
};

var editorExtensionsBoldItalicStrikeUnderlineValues: string[];

var resolveEditorExtensionsTest: Dynamic;

var resolveEditorExtensionsHrefFragment: Dynamic;

var editorExtensionsValue0_01: number;

var editorExtensionsValue1_0001: number;

function isEditorExtensionsTrim2(
  editorExtensionsTrim2?: unknown,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof editorExtensionsTrim2 != `string`) return null;
  let trimmedEditorExtensionsTrim2 = editorExtensionsTrim2.trim();
  if (trimmedEditorExtensionsTrim2 === ``) return null;
  let items2: Dynamic;
  if (trimmedEditorExtensionsTrim2.startsWith(`{`)) {
    let isEditorExtensionsTrim2Result: Dynamic;
    try {
      isEditorExtensionsTrim2Result = JSON.parse(trimmedEditorExtensionsTrim2);
    } catch {
      return null;
    }
    if (
      typeof isEditorExtensionsTrim2Result != `object` ||
      !isEditorExtensionsTrim2Result ||
      Array.isArray(isEditorExtensionsTrim2Result)
    )
      return null;
    let isEditorExtensionsTrim2Result2: Dynamic = isEditorExtensionsTrim2Result;
    if (
      Object.keys(isEditorExtensionsTrim2Result2).some(
        (
          isEditorExtensionsTrim2ResultKey?: Dynamic,
          ..._extraArguments: unknown[]
        ) => !items.includes(isEditorExtensionsTrim2ResultKey),
      )
    )
      return null;
    items2 = items.map(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isEditorExtensionsTrim2Result2[item],
    );
  } else
    items2 = trimmedEditorExtensionsTrim2
      .split(`,`)
      .map(
        (
          trimmedEditorExtensionsTrim2Part?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          trimmedEditorExtensionsTrim2Part.trim() === ``
            ? NaN
            : Number(trimmedEditorExtensionsTrim2Part),
      );
  if (items2.length !== items.length) return null;
  let mappedItems: Dynamic = items2.map(
    (item?: unknown, ..._extraArguments: unknown[]) =>
      typeof item == `number` ? item : NaN,
  );
  return mappedItems.every(Number.isFinite) ? mappedItems : null;
}

function resolveEditorExtensionsEvery(
  editorExtensionsEvery?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorExtensionsTrim22: Dynamic = isEditorExtensionsTrim2(
    editorExtensionsEvery,
    [`w`, `h`],
  );
  if (
    !isEditorExtensionsTrim22 ||
    !isEditorExtensionsTrim22.every(
      (isEditorExtensionsTrim24?: Dynamic, ..._extraArguments: unknown[]) =>
        Number.isInteger(isEditorExtensionsTrim24) &&
        isEditorExtensionsTrim24 >= 1 &&
        isEditorExtensionsTrim24 <= 1e5,
    )
  )
    return null;
  let [isEditorExtensionsTrim23, setIsEditorExtensionsTrim2]: Dynamic =
    isEditorExtensionsTrim22;
  return {
    w: isEditorExtensionsTrim23,
    h: setIsEditorExtensionsTrim2,
  };
}

function resolveEditorExtensionsValue23(
  editorExtensionsValue23?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isEditorExtensionsTrim22: Dynamic = isEditorExtensionsTrim2(
    editorExtensionsValue23,
    [`x`, `y`, `w`, `h`],
  );
  if (!isEditorExtensionsTrim22) return null;
  let [
    isEditorExtensionsTrim23,
    setIsEditorExtensionsTrim2,
    isEditorExtensionsTrim24,
    isEditorExtensionsTrim25,
  ]: Dynamic = isEditorExtensionsTrim22;
  return isEditorExtensionsTrim23 < 0 ||
    isEditorExtensionsTrim23 > 1 ||
    setIsEditorExtensionsTrim2 < 0 ||
    setIsEditorExtensionsTrim2 > 1 ||
    isEditorExtensionsTrim24 < editorExtensionsValue0_01 ||
    isEditorExtensionsTrim24 > 1 ||
    isEditorExtensionsTrim25 < editorExtensionsValue0_01 ||
    isEditorExtensionsTrim25 > 1 ||
    isEditorExtensionsTrim23 + isEditorExtensionsTrim24 >
      editorExtensionsValue1_0001 ||
    setIsEditorExtensionsTrim2 + isEditorExtensionsTrim25 >
      editorExtensionsValue1_0001
    ? null
    : {
        x: isEditorExtensionsTrim23,
        y: setIsEditorExtensionsTrim2,
        w: isEditorExtensionsTrim24,
        h: isEditorExtensionsTrim25,
      };
}

var resolveEditorExtensionsSplit: Dynamic;

var collectEditorExtensionsSplit: Dynamic;

var EditorExtensionsState2: Dynamic;

var resolveEditorExtensionsIndexOf: Dynamic;

function resolveEditorExtensionsExec2(
  editorExtensionsExec2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = /^([A-Za-z_][\w:.-]*)/.exec(editorExtensionsExec2);
  if (!match) return null;
  let attrs: Dynamic = {};
  let resolveEditorExtensionsExec2Result =
    /([A-Za-z_][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g;
  resolveEditorExtensionsExec2Result.lastIndex = match[1].length;
  for (
    let match2: Dynamic = resolveEditorExtensionsExec2Result.exec(
      editorExtensionsExec2,
    );
    match2?.[1];
    match2 = resolveEditorExtensionsExec2Result.exec(editorExtensionsExec2)
  )
    attrs[match2[1]] = resolveEditorExtensionsIndexOf(
      match2[2] ?? match2[3] ?? match2[4] ?? ``,
    );
  return {
    name: match[1],
    attrs: attrs,
    children: [],
  };
}

function resolveEditorExtensionsChildren(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    name: `#root`,
    attrs: {},
    children: [],
  };
  let items2: Dynamic = [record2];
  let updateRecordItem = (
    editorExtensionsChildren?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let children: Dynamic = items2[items2.length - 1].children;
    if (
      editorExtensionsChildren &&
      typeof children[children.length - 1] == `string`
    ) {
      children[children.length - 1] += editorExtensionsChildren;
    } else {
      if (editorExtensionsChildren) {
        children.push(editorExtensionsChildren);
      }
    }
  };
  let count: Dynamic = 0;
  for (; count < items.length; ) {
    let itemIndex: Dynamic = items.indexOf(`<`, count);
    if (itemIndex < 0 || itemIndex > count) {
      updateRecordItem(
        resolveEditorExtensionsIndexOf(
          items.slice(count, itemIndex < 0 ? undefined : itemIndex),
        ),
      );
    }
    if (itemIndex < 0) break;
    if (items[itemIndex + 1] === `?` || items[itemIndex + 1] === `!`) {
      let itemIndex2: Dynamic = items.indexOf(
        items.startsWith(`<!--`, itemIndex) ? `-->` : `>`,
        itemIndex,
      );
      count =
        itemIndex2 < 0 ? items.length : items.indexOf(`>`, itemIndex2) + 1;
      continue;
    }
    let resolveEditorExtensionsChildrenResult: Dynamic = -1;
    for (
      let total: Dynamic = itemIndex + 1, label2: Dynamic = ``;
      total < items.length && resolveEditorExtensionsChildrenResult < 0;
      total++
    ) {
      let itemItem: Dynamic = items[total];
      if (label2) label2 = itemItem === label2 ? `` : label2;
      else if (itemItem === `"` || itemItem === `'`) label2 = itemItem;
      else if (itemItem === `>`) resolveEditorExtensionsChildrenResult = total;
      else if (itemItem === `<`) break;
    }
    let label: Dynamic =
      resolveEditorExtensionsChildrenResult < 0
        ? ``
        : items.slice(itemIndex + 1, resolveEditorExtensionsChildrenResult);
    count =
      resolveEditorExtensionsChildrenResult < 0
        ? itemIndex + 1
        : resolveEditorExtensionsChildrenResult + 1;
    if (resolveEditorExtensionsChildrenResult < 0) updateRecordItem(`<`);
    else if (label[0] === `/`) {
      let trimmedLabelSlice: Dynamic = label.slice(1).trim();
      let difference = items2.length - 1;
      for (; difference >= 0 && items2[difference].name !== trimmedLabelSlice; )
        difference--;
      if (difference > 0) {
        items2.length = difference;
      }
    } else {
      let editorExtensionsExec2: Dynamic = resolveEditorExtensionsExec2(
        label.endsWith(`/`) ? label.slice(0, -1) : label,
      );
      if (editorExtensionsExec2) {
        items2[items2.length - 1].children.push(editorExtensionsExec2);
        if (
          !label.endsWith(`/`) &&
          !EditorExtensionsBrHrHardBreakHorizontalRuleGapGoneHit.has(
            editorExtensionsExec2.name,
          )
        ) {
          items2.push(editorExtensionsExec2);
        }
      } else {
        updateRecordItem(resolveEditorExtensionsIndexOf(`<${label}>`));
      }
    }
  }
  return record2.children;
}

var EditorExtensionsBrHrHardBreakHorizontalRuleGapGoneHit: Dynamic;

var EditorExtensionsDocRootViewDocument: Dynamic;

var EditorExtensionsState3: Dynamic;

var editorExtensionsSet9: Dynamic;

var EditorExtensionsParagraphCodeBlock: Dynamic;

var resolveEditorExtensionsPush: Dynamic;

var EditorExtensionsHorizontalRuleEmbed: Dynamic;

var EditorExtensionsState4: Dynamic;

var EditorExtensionsState5: Dynamic;

var EditorExtensionsState6: Dynamic;

var EditorExtensionsCommentUtteranceAnchor: Dynamic;

var resolveEditorExtensionsObjectId: Dynamic;

var EditorExtensionsGapGoneHitHitsNotice: Dynamic;

var EditorExtensionsIdHRevSeqByKindCompleteSinceSinceRevSessType: Dynamic;

var resolveEditorExtensionsName: Dynamic;

function resolveEditorExtensionsBlock(
  editorExtensionsBlock?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return EditorExtensionsState3[editorExtensionsBlock.name]
    ? `block`
    : EditorExtensionsState6.has(editorExtensionsBlock.name)
      ? `run`
      : EditorExtensionsCommentUtteranceAnchor.has(editorExtensionsBlock.name)
        ? `span`
        : EditorExtensionsGapGoneHitHitsNotice.has(editorExtensionsBlock.name)
          ? `skip`
          : EditorExtensionsState5[editorExtensionsBlock.name]
            ? `mark`
            : EditorExtensionsState4[editorExtensionsBlock.name] ||
                editorExtensionsBlock.name === `atom`
              ? `atom`
              : `other`;
}

var resolveEditorExtensionsExec3: Dynamic;

function resolveEditorExtensionsReg(
  editorExtensionsReg?: Dynamic,
  reg?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let bad: Dynamic = 0;
  for (let node of editorExtensionsReg as Dynamic) {
    if (typeof node == `string`) continue;
    let label =
      node.attrs.id === undefined
        ? node.attrs.by === undefined
          ? null
          : `by`
        : `id`;
    if (label && node.attrs[label].startsWith(`.`)) {
      if (reg === null) {
        bad += 1;
      } else {
        node.attrs[label] = reg + node.attrs[label];
      }
    }
    let editorExtensionsExec3: Dynamic = label
      ? resolveEditorExtensionsExec3(node.attrs[label])
      : null;
    let editorExtensionsReg2: Dynamic = resolveEditorExtensionsReg(
      node.children,
      editorExtensionsExec3 ?? reg,
    );
    reg = editorExtensionsExec3 ?? editorExtensionsReg2.reg;
    bad += editorExtensionsReg2.bad;
  }
  return {
    reg: reg,
    bad: bad,
  };
}

var EditorExtensionsState7: Dynamic;

var resolveEditorExtensionsIsInteger2: Dynamic;

var resolveEditorExtensionsTrue2: (editorExtensionsTrue2?: Dynamic, ..._extraArguments: unknown[]) => boolean | null;

var resolveEditorExtensionsSess2: Dynamic;

var resolveEditorExtensionsSess3: Dynamic;

var resolveEditorExtensionsValue24: Dynamic;

var resolveEditorExtensionsSome2: Dynamic;

var resolveEditorExtensionsHref2: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorExtensions2Step1(): void {
  (editorExtensionsMap = new (Map as Dynamic)(
    Object.entries({
      yellow: `#ffff00`,
      gold: `#ffd700`,
      orange: `#ffa500`,
      khaki: `#f0e68c`,
      lime: `#00ff00`,
      green: `#008000`,
      lightgreen: `#90ee90`,
      olive: `#808000`,
      aqua: `#00ffff`,
      cyan: `#00ffff`,
      turquoise: `#40e0d0`,
      teal: `#008080`,
      blue: `#0000ff`,
      navy: `#000080`,
      lightblue: `#add8e6`,
      skyblue: `#87ceeb`,
      fuchsia: `#ff00ff`,
      magenta: `#ff00ff`,
      pink: `#ffc0cb`,
      hotpink: `#ff69b4`,
      red: `#ff0000`,
      maroon: `#800000`,
      purple: `#800080`,
      violet: `#ee82ee`,
      plum: `#dda0dd`,
      lavender: `#e6e6fa`,
      silver: `#c0c0c0`,
      gray: `#808080`,
      grey: `#808080`,
      lightgray: `#d3d3d3`,
      lightgrey: `#d3d3d3`,
      darkgray: `#a9a9a9`,
      darkgrey: `#a9a9a9`,
      gainsboro: `#dcdcdc`,
      black: `#000000`,
      white: `#ffffff`,
      transparent: ``,
    }),
  ));
  (editorExtensionsValue64 = 64);
  (resolveEditorExtensionsValue5 = (
    { r: r10, g: g6, b: b10 }: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let [items, setItems, items2]: Dynamic = [r10 / 255, g6 / 255, b10 / 255];
    let max = Math.max(items, setItems, items2);
    let min = Math.min(items, setItems, items2);
    let amount = (max + min) / 2;
    if (max === min)
      return {
        h: 0,
        s: 0,
        l: amount,
      };
    let difference: Dynamic = max - min;
    let amount2: Dynamic =
      amount > 0.5 ? difference / (2 - max - min) : difference / (max + min);
    return {
      h:
        max === items
          ? ((setItems - items2) / difference + (setItems < items2 ? 6 : 0)) * 60
          : max === setItems
            ? ((items2 - items) / difference + 2) * 60
            : ((items - setItems) / difference + 4) * 60,
      s: amount2,
      l: amount,
    };
  });
  (EditorExtensionsYellow3 = [
    [`yellow`, 55],
    [`green`, 125],
    [`blue`, 215],
    [`purple`, 272],
    [`pink`, 335],
  ]);
  (EditorExtensionsState = 32.5 / 100);
  (EditorExtensionsAskClaude = {
    askClaude: {
      label: `Ask Agent`,
    },
    comment: {
      label: `Comment`,
    },
    react: {
      label: `Add reaction`,
    },
  });
  (editorExtensionsAskClaudeCommentReactValues = [
    `askClaude`,
    `comment`,
    `react`,
  ]);
  (resolveEditorExtensionsValue6 = (
    editorExtensionsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `React with ${editorExtensionsValue6}`);
  (EditorExtensionsMoreActions = `More actions`);
  (EditorExtensionsImage = {
    image: {
      noun: `image`,
    },
    video: {
      noun: `video`,
    },
    file: {
      noun: `file`,
    },
    codeBlock: {
      noun: `code block`,
    },
    diagram: {
      noun: `diagram`,
    },
    liveBlock: {
      noun: `block`,
    },
    callout: {
      noun: `panel`,
      bare: true,
    },
    table: {
      noun: `table`,
    },
    chart: {
      noun: `chart`,
    },
    widget: {
      noun: `widget`,
    },
    chip: {
      noun: `chip`,
      bare: true,
    },
    comment: {
      noun: `comment`,
    },
    tab: {
      noun: `tab`,
    },
    divider: {
      noun: `divider`,
    },
  });
  (resolveEditorExtensionsDelete = (
    editorExtensionsDelete?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let EditorExtensionsImageItem: Dynamic =
      EditorExtensionsImage[editorExtensionsDelete];
    return EditorExtensionsImageItem.bare
      ? `Delete`
      : `Delete ${EditorExtensionsImageItem.noun}`;
  });
  (resolveEditorExtensionsNoun = (
    editorExtensionsNoun?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `Delete ${EditorExtensionsImage[editorExtensionsNoun].noun}`);
  (resolveEditorExtensionsNoun2 = (
    editorExtensionsNoun2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let { noun: EditorExtensionsImageItem }: Dynamic =
      EditorExtensionsImage[editorExtensionsNoun2];
    return `${EditorExtensionsImageItem.charAt(0).toUpperCase()}${EditorExtensionsImageItem.slice(1)} deleted`;
  });
  (resolveEditorExtensionsChart = (
    editorExtensionsChart?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (editorExtensionsChart === `chart` ? `chart` : `widget`));
  (resolveEditorExtensionsValue7 = (
    editorExtensionsValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `@media (pointer:coarse){${editorExtensionsValue7}{min-height:40px}}`);
  (EditorExtensionsStyles = `background:var(--cds-fill-danger,#d03b3b);color:var(--cds-on-danger,#ffffff)`);
  (resolveEditorExtensionsValue8 = (
    editorExtensionsValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${editorExtensionsValue8} button.danger{color:var(--cds-text-danger,#8e2626)}${editorExtensionsValue8} button.danger:focus-visible{${EditorExtensionsStyles}}@media (hover:hover){${editorExtensionsValue8} button.danger:hover{${EditorExtensionsStyles}}}`);
  (EditorExtensionsPlaceholder = `placeholder`);
  (resolveEditorExtensionsRole = (
    ariaLabel?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ariaLabel.trim() === ``
      ? {
          role: `group`,
          "aria-label": `Placeholder`,
        }
      : {
          role: `group`,
          "aria-label": ariaLabel,
          "aria-roledescription": EditorExtensionsPlaceholder,
        });
  (EditorExtensionsProject = {
    project: `Document`,
    file: `Tab`,
    database: `Database`,
    run: `Run`,
    routine: `Routine`,
    table: `Table`,
    ref: `Ref`,
  });
  (EditorExtensionsKeys = Object.keys(EditorExtensionsProject));
  (resolveEditorExtensionsValue9 = (
    editorExtensionsValue9?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => EditorExtensionsProject[editorExtensionsValue9] ?? `Ref`);
  (EditorExtensionsGray = {
    gray: `neutral`,
    sky: `blue`,
    mineral: `aqua`,
    olive: `green`,
    pencil: `yellow`,
    poppy: `red`,
    fig: `magenta`,
    plum: `violet`,
  });
  (editorExtensionsGraySkyMineralOliveValues = [
    `gray`,
    `sky`,
    `mineral`,
    `olive`,
    `pencil`,
    `poppy`,
    `fig`,
    `plum`,
  ]);
  (EditorExtensionsBlue = {
    blue: {
      100: `#cde2fb`,
      150: `#b7d3f6`,
      200: `#9ec5f4`,
      300: `#6da7ec`,
      450: `#2a78d6`,
      600: `#184f95`,
      750: `#062b57`,
      800: `#032042`,
    },
    aqua: {
      100: `#bfebdb`,
      150: `#a0e1c9`,
      200: `#7ad7b4`,
      300: `#3bbd8c`,
      450: `#138e65`,
      600: `#065f49`,
      750: `#02342b`,
      800: `#022720`,
    },
    green: {
      100: `#caeac7`,
      150: `#aee0a9`,
      200: `#91d68b`,
      300: `#55bf50`,
      450: `#009300`,
      600: `#006300`,
      750: `#0f350d`,
      800: `#11260f`,
    },
    yellow: {
      100: `#f9dca4`,
      150: `#f9c868`,
      200: `#fab219`,
      300: `#db9300`,
      450: `#a66a00`,
      600: `#734500`,
      750: `#412400`,
      800: `#311a00`,
    },
    red: {
      100: `#fad6d6`,
      150: `#f7c1c1`,
      200: `#f4abab`,
      300: `#ec7e7e`,
      450: `#d03b3b`,
      600: `#8e2626`,
      750: `#511212`,
      800: `#3c0e0e`,
    },
    magenta: {
      100: `#f9d4e2`,
      150: `#f3c0d3`,
      200: `#f3a8c3`,
      300: `#e87ba4`,
      450: `#c04873`,
      600: `#862a4c`,
      750: `#4c1429`,
      800: `#390f1f`,
    },
    violet: {
      100: `#dfdbfd`,
      150: `#cfcafb`,
      200: `#bfb9f5`,
      300: `#a096eb`,
      450: `#7161e0`,
      600: `#4a3aa7`,
      750: `#271e60`,
      800: `#1d1649`,
    },
  });
  (resolveEditorExtensionsValue10 = (
    editorExtensionsValue10?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `var(--cds-${editorExtensionsValue10}-${options},${EditorExtensionsBlue[editorExtensionsValue10][options]})`);
  (resolveEditorExtensionsYellow4 = (
    editorExtensionsYellow4?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (editorExtensionsYellow4 === `yellow` ? 200 : 450));
  (EditorExtensionsStrong = Object.fromEntries(
    editorExtensionsGraySkyMineralOliveValues.map(
      (
        editorExtensionsGraySkyMineralOliveValue?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let EditorExtensionsGrayItem: Dynamic =
          EditorExtensionsGray[editorExtensionsGraySkyMineralOliveValue];
        return [
          editorExtensionsGraySkyMineralOliveValue,
          {
            strong:
              EditorExtensionsGrayItem === `neutral`
                ? `var(--cds-gray-450,#7b7974)`
                : resolveEditorExtensionsValue10(
                    EditorExtensionsGrayItem,
                    resolveEditorExtensionsYellow4(EditorExtensionsGrayItem),
                  ),
          },
        ];
      },
    ),
  ));
  (EditorExtensionsAccent = {
    ...Object.fromEntries(
      editorExtensionsGraySkyMineralOliveValues.map(
        (
          editorExtensionsGraySkyMineralOliveValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          editorExtensionsGraySkyMineralOliveValue,
          editorExtensionsGraySkyMineralOliveValue,
        ],
      ),
    ),
    ...Object.fromEntries(
      editorExtensionsGraySkyMineralOliveValues.map(
        (
          editorExtensionsGraySkyMineralOliveValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          EditorExtensionsGray[editorExtensionsGraySkyMineralOliveValue],
          editorExtensionsGraySkyMineralOliveValue,
        ],
      ),
    ),
    accent: `sky`,
    success: `olive`,
    warning: `pencil`,
    danger: `poppy`,
    pro: `plum`,
    grey: `gray`,
    silver: `gray`,
    navy: `sky`,
    teal: `mineral`,
    cyan: `mineral`,
    turquoise: `mineral`,
    lime: `olive`,
    amber: `pencil`,
    gold: `pencil`,
    orange: `pencil`,
    crimson: `poppy`,
    pink: `fig`,
    rose: `fig`,
    purple: `plum`,
    indigo: `plum`,
    lavender: `plum`,
  });
  (resolveEditorExtensionsToLowerCase = (
    editorExtensions?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof editorExtensions != `string`) return;
    let normalizedTrimmedEditorExtensions: Dynamic = editorExtensions
      .trim()
      .toLowerCase();
    return Object.hasOwn(
      EditorExtensionsAccent,
      normalizedTrimmedEditorExtensions,
    )
      ? EditorExtensionsAccent[normalizedTrimmedEditorExtensions]
      : undefined;
  });
  (EditorExtensionsLight = {
    light: [100, 600, 150],
    dark: [800, 300, 750],
  });
  (resolveEditorExtensionsValue11 = (
    editorExtensionsValue11?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let [
      EditorExtensionsLightItem,
      setEditorExtensionsLightItem,
      EditorExtensionsLightItem2,
    ]: Dynamic = EditorExtensionsLight[options];
    return `--${context}bg:${resolveEditorExtensionsValue10(editorExtensionsValue11, EditorExtensionsLightItem)};--${context}fg:${resolveEditorExtensionsValue10(editorExtensionsValue11, setEditorExtensionsLightItem)};--${context}bg-hover:${resolveEditorExtensionsValue10(editorExtensionsValue11, EditorExtensionsLightItem2)}`;
  });
  (EditorExtensionsNeutral = editorExtensionsGraySkyMineralOliveValues.map(
      (
        editorExtensionsGraySkyMineralOliveValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let EditorExtensionsGrayItem: Dynamic =
          EditorExtensionsGray[editorExtensionsGraySkyMineralOliveValue];
        return EditorExtensionsGrayItem === `neutral`
          ? `.dd-c-${editorExtensionsGraySkyMineralOliveValue}{--dd:${EditorExtensionsStrong[editorExtensionsGraySkyMineralOliveValue].strong};--dd-bg:var(--cds-bg-neutral,rgba(11,11,11,.05));--dd-fg:var(--cds-text-secondary,#52514e);--dd-bg-hover:var(--cds-bg-neutral-hover,rgba(11,11,11,.1))}`
          : `.dd-c-${editorExtensionsGraySkyMineralOliveValue}{--dd:${EditorExtensionsStrong[editorExtensionsGraySkyMineralOliveValue].strong};${resolveEditorExtensionsValue11(EditorExtensionsGrayItem, `light`, `dd-`)}}\n[data-mode=dark] .dd-c-${editorExtensionsGraySkyMineralOliveValue}{${resolveEditorExtensionsValue11(EditorExtensionsGrayItem, `dark`, `dd-`)}}`;
      },
    ).join(`
`));
  (collectEditorExtensionsLight = (
    collectEditorExtensionsLight2?: Dynamic,
    options?: Dynamic,
    context: Dynamic = ``,
    ..._extraArguments: unknown[]
  ) =>
    `${collectEditorExtensionsLight2.join(`,`)}{${resolveEditorExtensionsValue11(options, `light`, ``)}${context}}\n${collectEditorExtensionsLight2.map((rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) => `[data-mode=dark] ${rolldownNImport2}`).join(`,`)}{${resolveEditorExtensionsValue11(options, `dark`, ``)}}`);
  (collectEditorExtensionsJoin = (
    collectEditorExtensionsJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    EditorExtensionsKeys.map(
      (EditorExtensionsKey?: Dynamic, ..._extraArguments: unknown[]) =>
        `.ldoc-chip[data-chip="${EditorExtensionsKey}"]${collectEditorExtensionsJoin2}`,
    ).join(`,`));
  (EditorExtensionsBlue2 = `
/* The pill family's type is the UI sans (CDS footnote, weight 500), never
   the surrounding text's face: a chip inside an h1–h3 would otherwise
   inherit the heading's serif voice and read as a second typeface dropped
   into the title. Named family, not inherit, on every pill
   face — .ldoc-mention / a[data-ref-chip] in registry.ts are the siblings.
   In body prose the two resolve to the same family, so nothing moves there.
   No user-select:none here: chips must join the native selection — with it,
   the browser skips the pill when painting a text selection's highlight and
   drops it from Tier-0 static-render copies. Click/drag handling doesn't
   need it: the NodeView is contenteditable=false, so the pill selects
   atomically and its click handlers own the pointer. */
.ldoc-chip{--fg:var(--cds-text-primary,#1f1e1d);--bg:var(--cds-neutral-50,#f5f4ed);--bg-hover:var(--cds-neutral-100,#e1e0d9);display:inline-flex;align-items:center;gap:0;padding:0 8px;margin:0 1px;border-radius:999px;background:var(--bg);color:var(--fg);font-family:var(--font-body,var(--cds-font-sans,ui-sans-serif)),system-ui;font-weight:500;font-size:var(--cds-font-size-footnote,13px);line-height:1.5;white-space:nowrap;box-sizing:border-box;max-width:calc(100% - 2px);overflow:clip;vertical-align:baseline;cursor:pointer;transition:background-color .12s}
.ldoc-chip::before{content:"\\200B";width:0;flex:none}
/* The cap is the line's width MINUS the pill's own 1px side margins
   (border-box, spelled out so the arithmetic holds in a mount without the
   *{box-sizing:border-box} preflight): at max-width:100% a capped pill's margin box
   was 2px wider than its line, so in a narrow table cell the zero-width
   ProseMirror separator + trailing break that follow a line-final atom
   wrapped to a second, empty line and every such row rendered two lines
   tall. Kept the margins and shrank the cap rather than the reverse: the
   1px breathing room between adjacent pills and text is the family's look
   everywhere, the cap only bites in a cell already too narrow for the label.
   @tiptap/core's injected base sheet ships
   .ProseMirror [contenteditable=false]{white-space:normal}
   (0,2,0) which beats the base rule above — in a narrow table cell the pill's
   label wrapped mid-word and the fixed-height dd pill clipped the second line.
   0,3,0 so the chip's nowrap wins regardless of stylesheet order.
   (The base containment is overflow:CLIP, not hidden: hidden makes the
   inline-flex chip a scroll container, whose baseline engines may synthesize
   from the bottom edge instead of the ZWSP strut; clip contains paint
   identically with no scroll-container semantics.) */
.ProseMirror .ldoc-chip[data-chip]{white-space:nowrap}
.ldoc-chip:hover{background:var(--bg-hover)}
/* Dark: neutral-50/100 DO flip, but to gray-850/800 — a #151515 pill on the
   #0d0d0d page (≈1.06:1), so the neutral pills (date, ref, unset dropdown,
   and the .ldoc-mention / a[data-ref-chip] siblings in registry.ts) vanished
   into the doc. In dark the family fill is --cds-fill-control (CDS's layer-4
   neutral-fill alias over alpha-2: a 10% wash of the ink, so it separates
   from whatever surface it sits on; hover = fill-control-hover, alpha-3) —
   re-pointed through the two custom properties so no kind-specific
   background rule below has to know about modes. Light keeps the
   existing neutral-50 fill (and neutral-100 hover) untouched. */
[data-mode=dark] .ldoc-chip{--bg:var(--cds-fill-control,rgba(255,255,255,.1));--bg-hover:var(--cds-fill-control-hover,rgba(255,255,255,.2))}
.ldoc-chip[data-readonly="true"]{pointer-events:none;cursor:default}
.ldoc-chip .i{opacity:.7;flex:none;display:inline-flex;align-items:center;margin-right:4px}
.ldoc-chip .i:last-child{margin-right:0}
/* Optical padding: a leading glyph's visual edge sits inside its box, so the
   8px text inset reads as a gutter — 6px re-centers icon-led pills (the
   f594e45f0 hover-card rule, restored with chip icons back on). */
.ldoc-chip:has(>svg:first-child),.ldoc-chip:has(>.dd-dot:first-child){padding-left:6px}
/* Date pill: the Anthropicon is a thin outline, so it reads faint at the
   generic .i 70% next to a semibold label — full ink + a regular label
   weight land the two at one visual weight. */
.ldoc-chip[data-chip="date"] .i{opacity:1;margin-right:3px}
.ldoc-chip[data-chip="date"] .i svg{width:13px;height:13px}
.ldoc-chip[data-chip="task"] input{margin:0 6px 0 0;cursor:pointer;accent-color:var(--fg)}
.ldoc-chip[data-chip="task"][data-checked="true"] .t{text-decoration:line-through;opacity:.55}
.ldoc-chip[data-chip="task"] .meta{margin-left:6px}
.ldoc-chip[data-chip="checkbox"]{background:none;padding:0;margin:0 .4em 0 0;font-weight:inherit}
.ldoc-chip[data-chip="checkbox"]:hover{background:none}
.ldoc-chip[data-chip="checkbox"] input{margin:0;cursor:pointer;vertical-align:middle}
/* Checkbox line = bullet-like hanging indent (cxl Jul 11): the checkbox
   lives in the negative text-indent overhang, so wrapped continuation lines
   align under the TEXT, not back at the margin. The ldoc-checklist class
   is stamped by the ChecklistIndent decoration plugin (chipNodes.ts) on
   paragraphs whose true FIRST node is a checkbox — CSS :first-child cannot
   see leading text nodes, so 'buy [x] milk' would false-match.
   text-indent INHERITS: every pill on the line (mention / date / dropdown /
   ref — inline-block or inline-flex, i.e. a fresh block container) would
   re-apply the -1.5em to ITS OWN first line, dragging its label out of the
   pill and over the checkbox (and clipping it under .t's overflow:hidden).
   The children reset stops the inheritance one level down; the paragraph's
   own first-line overhang is unaffected (it reads the p's value). */
.ProseMirror p.ldoc-checklist{padding-left:1.5em;text-indent:-1.5em}
.ProseMirror p.ldoc-checklist>*{text-indent:0}
.ProseMirror :is(p,h1,h2,h3,h4,h5,h6):has([data-chip="checkbox"][data-checked="true"]){text-decoration:line-through;color:var(--cds-text-muted,#8a8882)}
.ldoc-chip[data-chip="vote"] .n{min-width:1ch;text-align:right}
/* Voted = the blue (sky) categorical pill + the accent role's hairline
   (--cds-border-accent flips on its own): your own vote reads as the one
   tinted pill in the row, in both themes. */
${collectEditorExtensionsLight([`.ldoc-chip[data-chip="vote"][data-voted="true"]`], `blue`, `;box-shadow:inset 0 0 0 1px var(--cds-border-accent,#86b6ef)`)}
.ldoc-chip[data-chip="timer"],.ldoc-chip[data-chip="stopwatch"]{font-variant-numeric:tabular-nums}
/* Running = the yellow (pencil / warning-hue) categorical pill, so a live
   timer keeps its "active" tint in dark instead of a cream yellow-50 pill
   (ramp stops don't flip) and hovers within its hue. */
${collectEditorExtensionsLight([`.ldoc-chip[data-chip="timer"][data-running="true"]`, `.ldoc-chip[data-chip="stopwatch"][data-running="true"]`], `yellow`)}
.ldoc-chip[data-chip="variable"]{font-family:var(--cds-font-mono,ui-monospace,monospace)}
/* v3 set-backed chip (data-set="true") — the COLORED FAMILY PILL: the
   dd-c-<name> class on this same element carries the CDS recipe as
   --dd-bg / --dd-fg / --dd-bg-hover (mode-aware, see DD_COLOR_CSS), and the
   pill feeds them into the family's own --bg / --fg / --bg-hover channels,
   so the base .ldoc-chip rules paint it and no per-mode pill rule exists.
   Fallback when the class is somehow absent = the neutral Badge face.
   A soft-deleted pick (data-disabled-opt, no data-set) keeps the neutral
   fill and mutes the ink. */
.ldoc-chip[data-chip="dropdown"][data-set="true"]{--bg:var(--dd-bg,var(--cds-bg-neutral,rgba(11,11,11,.05)));--bg-hover:var(--dd-bg-hover,var(--cds-bg-neutral-hover,rgba(11,11,11,.1)));--fg:var(--dd-fg,var(--cds-text-secondary,#52514e))}
.ldoc-chip[data-chip="dropdown"][data-disabled-opt="true"]{--fg:var(--cds-text-muted,#898781)}
.ldoc-chip[data-chip="dropdown"] svg.i{margin-left:6px;margin-right:0}
.ldoc-chip[data-chip="dropdown"] .sw{display:inline-block;width:7px;height:7px;border-radius:2px;margin-right:6px}
.ldoc-chip[data-chip="dropdown"][data-dd]{background:transparent;height:26px;padding:0 6px 0 4px;gap:7px;border-radius:6px;font-family:var(--cds-font-sans,var(--font-body,ui-sans-serif)),system-ui;font-size:var(--cds-font-size-body,14px);font-weight:430;line-height:1;color:var(--cds-text-primary,#141413)}
.ldoc-chip[data-chip="dropdown"][data-dd]:hover{box-shadow:none;background:var(--cds-fill-ghost-hover,rgba(0,0,0,.04))}
.ldoc-chip[data-chip="dropdown"][data-dd][data-empty="true"]{box-shadow:inset 0 0 0 .5px var(--cds-border,rgba(11,11,11,.1));color:var(--cds-text-muted,#898781)}
.ldoc-chip[data-chip="dropdown"][data-dd] svg.i{color:var(--cds-text-muted,#A3A29C);opacity:1;margin-left:0}
/* Label spans truncate with ellipsis when the max-width cap bites (narrow
   table cells) — every chip kind, not just the dd pill; bare-text chips fall
   back to the base overflow:clip containment. */
.ldoc-chip .t{min-width:0;overflow:hidden;text-overflow:ellipsis}
/* Ring extent must stay ≤4px: table-cell paragraphs x-clip at a 4px-padded
   edge (tableCss.ts) — a wider ring gets sliced in cells. */
.ldoc-chip[data-chip="dropdown"][data-dd][data-open="true"]{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.1));box-shadow:0 0 0 1.5px var(--cds-surface-0,#fff),0 0 0 3px var(--cds-fill-accent,#2A78D6)}
.dd-dot{display:inline-block;width:9px;height:9px;border-radius:50%;flex:none;background:var(--dd,var(--cds-gray-450,#7b7974))}
.dd-ring{display:inline-block;width:9px;height:9px;border-radius:50%;border:1.25px dashed var(--cds-border-strong,rgba(11,11,11,.2));box-sizing:border-box;flex:none}
${EditorExtensionsNeutral}
.ldoc-chip .meta{opacity:.65;font-weight:400;font-size:.92em}
/* Inside a heading (h1–h3: the levels the page schema renders and the
   prelude styles) the text pills scale with the heading instead of keeping
   the fixed footnote size: .8125em is the body ratio (13/16), so a pill
   keeps the proportion it has in prose (26px in a 32px H1). The 13px-tuned
   px insets and date glyph are respelled in em at their 13px equivalents
   (8px→.615em, 13px→1em, 3px→.23em) so the pill keeps its shape as it
   grows, and line-height drops 1.5→1.3 so it still fits the heading's
   1.2–1.35 line box. Excluded: the bare checkbox (padding:0) and the
   [data-dd] form-control dropdown face (fixed 26px control; ChipDropdown
   and the Tier-0 resolved face) — the page editor's own dropdown is a plain
   text pill without data-dd and scales like the rest. Outside headings
   nothing here matches. Tier-0's static walk mounts the same .ProseMirror
   root, so wherever it emits <h1>–<h6> the rule applies there too. Sibling rules
   for .ldoc-mention / a[data-ref-chip]: registry.ts LFILE_SUGGESTION_CSS. */
.ProseMirror :is(h1,h2,h3,h4,h5,h6) .ldoc-chip:not([data-chip="checkbox"],[data-dd]){font-size:.8125em;line-height:1.3;padding:0 .615em}
.ProseMirror :is(h1,h2,h3,h4,h5,h6) .ldoc-chip[data-chip="date"] .i{margin-right:.23em}
.ProseMirror :is(h1,h2,h3,h4,h5,h6) .ldoc-chip[data-chip="date"] .i svg{width:1em;height:1em}
/* Base shell wears the same card language as .dd / the ref hover card
   (surface-popover + .5px border + 12px radius) — tokens carry the dark
   values, so no [data-mode=dark] re-spelling of this rule exists. */
.ldoc-chip-pop{position:fixed;z-index:2147483646;min-width:200px;max-width:280px;overflow:auto;background:var(--cds-surface-popover,#fff);border:.5px solid var(--cds-border,rgba(31,30,29,.15));border-radius:12px;box-shadow:var(--cds-shadow-popover,0 4px 16px rgba(0,0,0,.12));font:13px/1.4 var(--font-body,ui-sans-serif),system-ui;color:var(--cds-text-primary,#3d3929);padding:6px}
/* Legacy titled popover (editors/ldoc/chips.ts: Timer / Task / the .html
   dropdown's Select + Edit options): captions text-muted, outline buttons
   on surface-1 with the strong hairline, primary button fill-primary /
   on-primary, rows and button hover = the ghost wash the .dd picker uses,
   dividers = the CDS hairline — all mode-aware, so no [data-mode=dark]
   re-spelling of these rules exists (one used to re-point .hdr/.lbl to
   text-muted in dark and, tying specificity with .dd .lbl below, dimmed
   the Pages picker's option labels in dark). */
.ldoc-chip-pop .hdr{font-size:11px;font-weight:600;color:var(--cds-text-muted,#898781);padding:2px 4px 6px;text-transform:uppercase;letter-spacing:.03em}
.ldoc-chip-pop .lbl{font-size:11px;color:var(--cds-text-muted,#898781);padding:4px 4px 2px}
.ldoc-chip-pop:not(.dd) input[type="text"],.ldoc-chip-pop:not(.dd) input[type="number"],.ldoc-chip-pop:not(.dd) input[type="date"]{width:100%;box-sizing:border-box;height:var(--cds-h-control,32px);padding:0 10px;border:.5px solid var(--cds-border,rgba(31,30,29,.15));border-radius:var(--cds-radius-lg,8px);background:var(--cds-surface-1,#FAF9F5);font:inherit;font-size:var(--cds-font-size-body,14px);color:var(--cds-text-primary,#141413);margin-bottom:6px}
/* :not(.dd) — the dropdown popover carries its own complete input chrome
   (borderless header search, 26px type-name field); the CDS text-field
   height/focus-glow here would leak onto it (0,2,1 beats the height-less
   .dd .hd input, and no dd rule overrides :focus box-shadow). The
   ::placeholder color stays UNscoped — the dd inputs want it too. */
.ldoc-chip-pop input::placeholder{color:var(--cds-text-muted,#A3A29C)}
.ldoc-chip-pop:not(.dd) input:focus{outline:none;box-shadow:var(--cds-focus-shadow,0 0 0 1px var(--cds-fill-accent,#2A78D6),0 0 6px 1px rgba(42,120,214,.35))}
.ldoc-chip-pop .row{display:flex;gap:6px;align-items:center}
.ldoc-chip-pop button{padding:4px 8px;border:1px solid var(--cds-border-strong,rgba(11,11,11,.2));border-radius:4px;background:var(--cds-surface-1,#fcfcfb);font:inherit;color:inherit;cursor:pointer}
.ldoc-chip-pop button:hover{background:var(--cds-fill-ghost-hover,rgba(11,11,11,.05))}
.ldoc-chip-pop button.pri{flex:1;background:var(--cds-fill-primary,#0b0b0b);color:var(--cds-on-primary,#fff);border-color:var(--cds-fill-primary,#0b0b0b)}
.ldoc-chip-pop button.pri:hover{background:var(--cds-fill-primary-hover,#2c2c2a)}
.ldoc-chip-pop .opt{display:flex;align-items:center;gap:8px;padding:4px 8px;border-radius:4px;cursor:pointer}
.ldoc-chip-pop .opt:hover{background:var(--cds-fill-ghost-hover,rgba(11,11,11,.05))}
.ldoc-chip-pop .opt.is-sel{background:var(--cds-fill-ghost-hover,rgba(11,11,11,.05));font-weight:600}
.ldoc-chip-pop .opt .sw{width:8px;height:8px;border-radius:2px;flex:none}
.ldoc-chip-pop .sep{height:1px;background:var(--cds-border,rgba(11,11,11,.1));margin:6px -6px}
.ldoc-chip-pop .hint{font-size:11px;color:var(--cds-text-muted,#898781);padding:0 4px 4px}
.ldoc-chip-pop .optedit{display:flex;align-items:center;gap:4px;margin-bottom:4px}
.ldoc-chip-pop:not(.dd) .optedit input{flex:1;margin:0}
.ldoc-chip-pop .optedit .del{padding:2px 6px;cursor:pointer;color:var(--cds-text-muted,#898781);border:none;background:none}
.ldoc-chip-pop .optedit .del:hover{color:var(--cds-text-danger,#8e2626);background:none}
.ldoc-chip-pop .swatches{display:flex;gap:5px;flex:none;padding:2px}
.ldoc-chip-pop .swatches .sw{width:14px;height:14px;border-radius:3px;cursor:pointer;box-sizing:border-box;position:relative}
.ldoc-chip-pop .swatches .sw:hover{transform:scale(1.15)}
/* Selected swatch: a gap in the popover's own surface, then the blue
   selection ring (the sheet's selection-state ring, as on the open
   [data-dd] chip above) — was a dark-ink ring; the ✓ is on-accent ink. */
.ldoc-chip-pop .swatches .sw.is-sel{box-shadow:0 0 0 1px var(--cds-surface-popover,#fff),0 0 0 2px var(--cds-fill-accent,#2a78d6)}
.ldoc-chip-pop .swatches .sw.is-sel::after{content:"✓";position:absolute;inset:0;color:var(--cds-on-accent,#fff);font-size:10px;line-height:14px;text-align:center;font-weight:700;text-shadow:0 0 1px rgba(0,0,0,.4)}
@keyframes ddrise{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:none}}
.ldoc-chip-pop.dd{width:288px;min-width:288px;max-width:288px;padding:0;background:var(--cds-surface-popover,rgba(255,255,255,.98));backdrop-filter:blur(24px);border:.5px solid var(--cds-border,rgba(11,11,11,.1));border-radius:12px;box-shadow:var(--cds-shadow-popover,0 2px 8px rgba(0,0,0,.08));color:var(--cds-text-primary,#141413);font-family:var(--cds-font-sans,var(--font-body,ui-sans-serif)),system-ui;font-size:var(--cds-font-size-body,14px);overflow:hidden;display:flex;flex-direction:column;animation:ddrise .09s ease-out}
.ldoc-chip-pop.dd .hd{flex:none;display:flex;align-items:center;gap:var(--cds-gap-sm,8px);padding:var(--cds-pad-sm,8px) var(--cds-pad-md,12px);border-bottom:.5px solid var(--cds-border,rgba(11,11,11,.1));color:var(--cds-text-muted,#898781)}
.ldoc-chip-pop.dd .hd input{flex:1;min-width:0;margin:0;padding:0;border:none;outline:none;background:transparent;font:inherit;font-weight:430;color:var(--cds-text-primary,#141413)}
.ldoc-chip-pop.dd .ls{flex:1;min-height:0;max-height:300px;overflow-y:auto;padding:var(--cds-pad-sm,8px)}
/* No max-height (a month grid is a fixed six-row shape), but KEEP the
   scroll fallback: place() clamps the shell in short viewports, and
   overflow:visible there would clip the bottom weeks unrecoverably. */
.ldoc-chip-pop.dd .ls.cal{max-height:none;overflow-y:auto;padding:8px 8px 10px}
.ldoc-chip-pop.dd .row{display:flex;align-items:center;gap:var(--cds-gap-sm,8px);min-height:var(--cds-h-control,32px);padding:0 var(--cds-pad-sm,8px);border-radius:6px;cursor:pointer}
.ldoc-chip-pop.dd .row:hover,.ldoc-chip-pop.dd .row.is-sel,.ldoc-chip-pop.dd .row.is-active{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-pop.dd .lbl{font-size:var(--cds-font-size-body,14px);font-weight:400;color:var(--cds-text-primary,#141413);padding:0}
.ldoc-chip-pop.dd .row .lbl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ldoc-chip-pop.dd .row svg{color:var(--cds-text-secondary,#73726C);flex:none}
.ldoc-chip-pop.dd .crt{display:flex;align-items:center;gap:8px;width:100%;min-height:32px;padding:0 8px;background:transparent;border:none;border-radius:6px;cursor:pointer;text-align:left;font:inherit;font-weight:430;color:var(--cds-text-secondary,#73726C)}
.ldoc-chip-pop.dd .crt:hover,.ldoc-chip-pop.dd .crt.is-active{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
/* The keyboard highlight (.is-active, moved by ↓ / ↑ in the search box) uses the hover background, above, as
   menuSurface.ts does. Forced-colours themes drop backgrounds, so there it gets an outline. While a highlight shows,
   the current value's row keeps its check but not its background, so apart from a row under the mouse, only the
   keyboard's row is shaded. */
@media (forced-colors: active){.ldoc-chip-pop.dd .row.is-active,.ldoc-chip-pop.dd .crt.is-active{outline:2px solid transparent;outline-offset:-2px}}
.ldoc-chip-pop.dd .ls.has-active .row.is-sel:not(.is-active):not(:hover){background:transparent}
.ldoc-chip-pop.dd .crt .pv{display:inline-flex;align-items:center;gap:7px;min-width:0;height:22px;color:var(--cds-text-primary,#141413)}
.ldoc-chip-pop.dd .crt .pv .lbl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ldoc-chip-pop.dd .emp{padding:10px 8px 6px;font-size:var(--cds-font-size-footnote,13px);color:var(--cds-text-muted,#A3A29C)}
.ldoc-chip-pop.dd .tplhd{padding:8px 8px 2px;font-size:var(--cds-font-size-footnote,13px);color:var(--cds-text-muted,#A3A29C)}
.ldoc-chip-pop.dd .tplrow{display:flex;align-items:center;gap:8px;width:100%;min-height:32px;padding:0 8px;background:transparent;border:none;border-radius:6px;cursor:pointer;text-align:left;font:inherit}
.ldoc-chip-pop.dd .tplrow:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-pop.dd .tplrow .dots{display:inline-flex;gap:3px;flex:none}
.ldoc-chip-pop.dd .tplrow .dd-dot{width:7px;height:7px}
.ldoc-chip-pop.dd .tplrow .lbl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ldoc-chip-pop.dd .ft{flex:none;padding:6px;border-top:.5px solid var(--cds-border,rgba(11,11,11,.1));background:var(--cds-surface-1,rgba(250,249,245,.7))}
.ldoc-chip-pop.dd .ftbtn{display:flex;align-items:center;gap:8px;width:100%;min-height:30px;padding:0 8px;background:transparent;border:none;border-radius:6px;cursor:pointer;text-align:left;font:inherit;font-size:var(--cds-font-size-body,14px);font-weight:400;color:var(--cds-text-primary,#141413)}
.ldoc-chip-pop.dd .ftbtn:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-pop.dd .hd2{flex:none;display:flex;align-items:center;gap:var(--cds-gap-xs,6px);padding:var(--cds-pad-sm,8px);border-bottom:.5px solid var(--cds-border,rgba(11,11,11,.1))}
.ldoc-chip-pop.dd .backbtn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none;padding:0;background:transparent;border:none;border-radius:6px;color:var(--cds-text-secondary,#73726C);cursor:pointer}
.ldoc-chip-pop.dd .backbtn:hover{background:var(--cds-fill-ghost-hover,rgba(0,0,0,.04))}
.ldoc-chip-pop.dd .hd2 input{flex:1;min-width:0;height:26px;margin:0;padding:0 6px;border:none;outline:none;border-radius:6px;background:transparent;font:inherit;font-weight:500;color:var(--cds-text-primary,#141413)}
.ldoc-chip-pop.dd .hd2 input:focus{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-pop.dd .ls2{flex:1;min-height:0;max-height:340px;overflow-y:auto;padding:var(--cds-pad-sm,8px)}
.ldoc-chip-pop.dd .orow{display:flex;align-items:center;gap:var(--cds-gap-xs,6px);min-height:var(--cds-h-control,32px);padding:0 var(--cds-pad-sm,8px);border-radius:6px}
.ldoc-chip-pop.dd .orow:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.06))}
.ldoc-chip-pop.dd .dotbtn{display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;padding:0;border:none;border-radius:6px;background:transparent;cursor:pointer}
.ldoc-chip-pop.dd .dotbtn:hover{background:var(--cds-fill-ghost-hover,rgba(0,0,0,.06))}
.ldoc-chip-pop.dd .dotbtn .dd-dot{width:10px;height:10px}
.ldoc-chip-pop.dd .orow input{flex:1;min-width:0;height:26px;margin:0;padding:0 6px;border:none;outline:none;border-radius:6px;background:transparent;font:inherit;font-weight:430;color:var(--cds-text-primary,#141413)}
.ldoc-chip-pop.dd .orow input:focus{background:var(--cds-surface-0,#fff);box-shadow:inset 0 0 0 .5px var(--cds-border-strong,rgba(11,11,11,.2))}
/* Hover-reveal (AN Aug 11): the hide/remove affordance stays quiet until
   the row is hovered or the button holds focus — EXCEPT a hidden row's
   crossed eye, which is STATE and must read at rest. */
.ldoc-chip-pop.dd .delbtn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none;padding:0;background:transparent;border:none;border-radius:6px;color:var(--cds-text-muted,#A3A29C);cursor:pointer;opacity:0;transition:opacity .1s}
.ldoc-chip-pop.dd .orow:hover .delbtn,.ldoc-chip-pop.dd .delbtn:focus-visible,.ldoc-chip-pop.dd .delbtn[data-state="hidden"]{opacity:1}
@media (hover:none){.ldoc-chip-pop.dd .delbtn{opacity:1}}
.ldoc-chip-pop.dd .delbtn:hover{background:rgba(222,98,98,.1);color:var(--cds-text-danger,#BF4D4D)}
.ldoc-chip-pop.dd .strip{display:flex;align-items:center;gap:4px;margin:2px 0 6px 6px;padding:6px;border-radius:8px;background:var(--cds-surface-1,#FAF9F5);border:.5px solid var(--cds-border,rgba(11,11,11,.1));animation:ddrise .09s ease-out}
.ldoc-chip-pop.dd .swb{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none;padding:0;border:none;border-radius:50%;background:transparent;cursor:pointer}
.ldoc-chip-pop.dd .swb .dd-dot{width:14px;height:14px}
.ldoc-chip-pop.dd .swb.is-sel{box-shadow:inset 0 0 0 1.5px var(--dd)}
.ldoc-chip-pop.dd .addbtn{display:flex;align-items:center;gap:var(--cds-gap-sm,8px);width:100%;min-height:var(--cds-h-control,32px);margin-top:2px;padding:0 var(--cds-pad-sm,8px);background:transparent;border:none;border-radius:6px;cursor:pointer;text-align:left;font:inherit;font-weight:430;color:var(--cds-text-secondary,#73726C)}
.ldoc-chip-pop.dd .addbtn:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-pop.dd .ft2{flex:none;display:flex;align-items:center;justify-content:flex-end;gap:var(--cds-gap-sm,8px);padding:var(--cds-pad-sm,8px);border-top:.5px solid var(--cds-border,rgba(11,11,11,.1));background:var(--cds-surface-1,rgba(250,249,245,.7))}
.ldoc-chip-pop.dd .donebtn{flex:none;height:28px;padding:0 12px;background:var(--cds-fill-primary,#141413);border:none;border-radius:6px;font:inherit;font-size:var(--cds-font-size-footnote,13px);font-weight:430;color:var(--cds-surface-0,#FAF9F5);cursor:pointer}
.ldoc-chip-pop.dd .donebtn:hover{background:var(--cds-fill-primary-hover,#2C2B29)}
.ldoc-chip-pop.dd .donebtn:disabled{opacity:.5;cursor:default}
/* The CDS Calendar recipe (claude-ds docs/calendar — the cds-calendar skin
   in @ant/cds/dist/calendar.css), ported class-for-class onto the
   hand-rolled grid since React can't run in this iframe: nav with a
   bottom hairline + centered body/500 label, 32px (h-control) tile grid
   at gap-xs centered in the shell, radius-6 square tiles, ghost hover,
   semibold text-accent today (CDS Calendar date/grid.js; the skin's surface-2
   wash is the popover's own white in CDS 5; no dark twin — the token
   re-points), fill-primary selected, muted neighboring month, today too. */
/* Compact density (AN Aug 11 "looks really large"): 28px tiles / 2px gap /
   footnote digits — the CDS compact-density read of the same recipe — and
   the calpop shell shrink-wraps the grid instead of holding dd's 288px.
   28px is a density literal on purpose (iframe carries no density scale). */
.ldoc-chip-pop.dd.calpop{width:auto;min-width:0;max-width:none}
.ldoc-chip-cal{user-select:none}
.ldoc-chip-cal .nav{display:flex;align-items:center;padding:0 2px var(--cds-pad-xs,6px);border-bottom:.5px solid var(--cds-border,rgba(31,30,29,.15));margin-bottom:var(--cds-pad-xs,6px)}
.ldoc-chip-cal .nav .m{flex:1;text-align:center;font-weight:500;font-size:var(--cds-font-size-footnote,13px);color:var(--cds-text-primary,#141413)}
.ldoc-chip-cal .nav button{display:inline-flex;align-items:center;justify-content:center;width:var(--cds-h-control-nested,24px);height:var(--cds-h-control-nested,24px);padding:0;border:none;border-radius:var(--cds-radius,6px);background:transparent;color:var(--cds-text-primary,#141413)}
.ldoc-chip-cal .nav button:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-cal .grid{display:flex;flex-direction:column;gap:2px}
.ldoc-chip-cal .grid>[role=row]{display:grid;grid-template-columns:repeat(7,28px);gap:2px;justify-content:center}
.ldoc-chip-cal .dow{font-size:var(--cds-font-size-caption,11px);font-weight:400;color:var(--cds-text-muted,#A3A29C);text-align:center;padding:4px 0;text-transform:capitalize}
.ldoc-chip-cal .d{display:flex;align-items:center;justify-content:center;font-size:var(--cds-font-size-footnote,13px);width:28px;height:28px;padding:0;border-radius:var(--cds-radius,6px);cursor:pointer;color:var(--cds-text-primary,#141413)}
.ldoc-chip-cal .d:hover{background:var(--cds-fill-ghost-hover,rgba(115,114,108,.08))}
.ldoc-chip-cal .d.out{color:var(--cds-text-muted,#A3A29C)}
.ldoc-chip-cal .d.today:not(.sel):not(.out){font-weight:600;color:var(--cds-text-accent,#184f95)}
.ldoc-chip-cal .d.sel{background:var(--cds-fill-primary,#141413);color:var(--cds-on-primary,#fff)}
.ldoc-chip-cal .d.sel:hover{background:var(--cds-fill-primary-hover,#2C2B29)}
[data-mode=dark] .ldoc-chip-pop:not(.dd) input[type="text"],[data-mode=dark] .ldoc-chip-pop:not(.dd) input[type="number"],[data-mode=dark] .ldoc-chip-pop:not(.dd) input[type="date"]{border-color:var(--cds-border);background:var(--cds-surface-1);color:inherit}
[data-mode=dark] .ldoc-chip-pop:not(.dd) input:focus{border-color:var(--cds-border-stronger)}
[data-mode=dark] .ldoc-chip-cal .d:hover{background:var(--cds-fill-ghost-hover)}
[data-mode=dark] .ldoc-chip-cal .d.out{color:var(--cds-text-disabled)}
[data-mode=dark] .ldoc-chip-cal .d.sel{background:var(--cds-fill-primary);color:var(--cds-on-primary)}
.ldoc-chip-pop.person{padding:12px 14px}
/* Card internals key off .ldoc-person-card — the shared builder's root
   (personCardDom.ts) — so the host React mount of the SAME builder wears
   identical styling with no popover wrapper around it. */
.ldoc-person-card{display:flex;flex-direction:column;gap:10px;min-width:240px}
.ldoc-person-card .head{display:flex;align-items:center;gap:10px}
.ldoc-person-card .actions{display:flex;gap:6px}
.ldoc-person-card .actions button{border:1px solid var(--cds-border,rgba(11,11,11,.1));background:var(--cds-surface-2,#f7f6f4);border-radius:99px;padding:3px 12px;font-size:var(--cds-font-size-footnote,13px);font-weight:500;font-variation-settings:normal;color:var(--cds-text-primary,#1f1e1d);cursor:pointer}
.ldoc-person-card .actions button:hover{background:var(--cds-fill-ghost-hover,rgba(0,0,0,.06))}
/* Directory lines, bare (no box, no "Anthropic" badge). */
.ldoc-person-card .ants{display:flex;flex-direction:column;gap:3px}
.ldoc-person-card .ants .fact{font-size:var(--cds-font-size-footnote,13px);line-height:var(--cds-leading-footnote,17px);color:var(--cds-text-secondary,#5e5d59)}
.ldoc-person-card .av{position:relative;flex:none;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;overflow:hidden;color:#fff;font-weight:600;font-variation-settings:normal;font-size:15px}
.ldoc-person-card .av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
/* mentionAvatar's Claude/agent face (.av.claude): the same 40px disc,
   brand-filled, its spark knocked out in the .av's white ink — the Claude
   face claude.ai draws, as the @ menu rows carry it. */
.ldoc-person-card .av.claude{background:var(--cds-fill-brand,#c6613f)}
.ldoc-person-card .who{display:flex;flex-direction:column;min-width:0}
.ldoc-person-card .nm{font-weight:550;font-variation-settings:normal;color:var(--cds-text-primary,#1f1e1d);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ldoc-person-card .em{font-size:var(--cds-font-size-footnote,13px);color:var(--cds-text-muted,#8a8882);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ldoc-chip[data-chip="dropdown"] .car{margin-left:4px;opacity:.55;font-size:.85em}
.ldoc-chip-pop.enum-menu{display:flex;flex-direction:column;gap:2px;min-width:180px;padding:6px}
.ldoc-chip-pop.enum-menu .row{display:flex;align-items:center;gap:6px;border:0;background:none;text-align:left;padding:5px 8px;border-radius:6px;font-size:var(--cds-font-size-body,14px);color:var(--cds-text-primary,#1f1e1d);cursor:pointer}
.ldoc-chip-pop.enum-menu .row:hover{background:var(--cds-fill-ghost-hover,rgba(0,0,0,.06))}
.ldoc-chip-pop.enum-menu .row.off{opacity:.45;cursor:default}
.ldoc-chip-pop.enum-menu .row .tick{width:16px;display:inline-flex;flex:none}
/* Same CDS control recipe as the :not(.dd) typed-input rule — restated at
   this specificity so an untyped enum input can't fall back to a hand-roll. */
.ldoc-chip-pop.enum-menu input,.ldoc-chip-pop.enum-insert:not(.creating) input{width:100%;box-sizing:border-box;height:var(--cds-h-control,32px);border:.5px solid var(--cds-border,rgba(31,30,29,.15));border-radius:var(--cds-radius-lg,8px);padding:0 10px;background:var(--cds-surface-1,#FAF9F5);font:inherit;font-size:var(--cds-font-size-body,14px);color:var(--cds-text-primary,#141413);margin-top:4px;outline:none}
.ldoc-chip-pop.enum-insert{display:flex;flex-direction:column;gap:4px;min-width:220px;padding:var(--cds-pad-sm,8px)}
/* New-dropdown view (AN Aug 11): the shell drops its card padding so the
   shared editor's .hd2/.ft2 sections run edge-to-edge, dd-editor style. */
.ldoc-chip-pop.enum-insert.creating{padding:0;gap:0}
.ldoc-chip-pop.enum-insert .sect{font-size:var(--cds-font-size-footnote,12px);font-weight:500;color:var(--cds-text-muted,#898781);padding:2px 4px}
.ldoc-chip-pop.enum-insert .div{border-top:.5px solid var(--cds-border,rgba(11,11,11,.1));margin:4px 0}
.ldoc-chip-pop.enum-insert .row{display:flex;align-items:center;gap:8px;border:0;background:none;text-align:left;padding:6px 8px;border-radius:6px;font-size:var(--cds-font-size-body,14px);color:var(--cds-text-primary,#1f1e1d);cursor:pointer}
.ldoc-chip-pop.enum-insert .row:hover{background:var(--cds-fill-ghost-hover,rgba(0,0,0,.06))}
.ldoc-chip-pop.enum-insert .row .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ldoc-chip-pop.enum-insert .row .ct{font-size:var(--cds-font-size-footnote,12px);color:var(--cds-text-muted,#898781)}
/* Ghost action rows (New dropdown / Add option): the family's muted-plus
   voice, never link blue (AN Aug 11, #4313 port). */
.ldoc-chip-pop.enum-insert .row.new{color:var(--cds-text-secondary,#5e5d59);font-weight:430}
.ldoc-chip-pop.enum-insert .row.new svg{flex:none}
/* Confirm buttons speak the .donebtn language (dark primary, 6px radius,
   28px) — one vocabulary across the dd edit view, enum-insert and the date
   popover; the accent-blue 999px pill is retired. */
.ldoc-chip-pop.enum-insert .create{margin-top:6px;height:28px;border:0;border-radius:6px;background:var(--cds-fill-primary,#141413);color:var(--cds-surface-0,#FAF9F5);font-weight:430;font-size:var(--cds-font-size-footnote,13px);cursor:pointer}
.ldoc-chip-pop.enum-insert .create:hover:not(:disabled){background:var(--cds-fill-primary-hover,#2C2B29)}
.ldoc-chip-pop.enum-insert .create:disabled{opacity:.6;cursor:default}
/* (No bare .today rule here on purpose: an old one collided with the
   calendar's .d.today DAY CELL, blowing today's cell up to a 30px
   full-width square whenever the viewed month contained today.) */
/* Ref pills (face word = CLASSIFIED kind — project/file/database/run/
   routine, neutral "ref" when unclassifiable): a link-family chip that rides
   the neutral base-pill treatment — tighter padding is its only divergence.
   Restricted is a DEFINITIVE ACL answer, not a loading/error state: muted +
   no hover ring communicates "not a live control" rather than "broken".
   Deleted (a tab OF THIS PAGE the host's tab-names push no longer names —
   chipNodes ownTabDeleted) is the tab's last words, muted and struck through;
   the title says why. It stays a clickable pill (pointer, hover ring): the
   click goes to the host, which says the tab is deleted instead of opening it. */
${collectEditorExtensionsJoin(``)}{padding:1px 7px}
${collectEditorExtensionsJoin(`[data-restricted="true"]`)},${collectEditorExtensionsJoin(`[data-deleted="true"]`)}{--fg:var(--cds-text-muted,#898781)}
${collectEditorExtensionsJoin(`[data-restricted="true"]`)}{cursor:default}
${collectEditorExtensionsJoin(`[data-deleted="true"]`)}{text-decoration:line-through}
${collectEditorExtensionsJoin(`[data-restricted="true"]:hover`)}{background:var(--bg)}
/* Read-only viewers still get click-through nav (the pill is a navigation
   control, not an edit control) — override the base readonly
   pointer-events:none for this kind alone. Higher specificity
   ([data-chip="project"][data-readonly] vs [data-readonly] alone) wins
   regardless of stylesheet order. */
${collectEditorExtensionsJoin(`[data-readonly="true"]`)}{pointer-events:auto}
/* Hover card: thumb + title + "in <parent>"/meta line. Whole card is a
   click target (renderProjectHover wires the click on the popover itself),
   so it wears a pointer cursor unlike the bare-info .person card. */
.ldoc-chip-pop.project{padding:10px 12px;display:flex;flex-direction:column;gap:6px;cursor:pointer;max-width:260px;background:var(--cds-surface-popover,#fff);border:.5px solid var(--cds-border,rgba(31,30,29,.15));border-radius:var(--cds-radius-lg,8px);box-shadow:var(--cds-shadow-popover,0 4px 16px rgba(0,0,0,.12))}
.ldoc-chip-pop.project .who{display:flex;flex-direction:column;gap:2px;min-width:0}
.ldoc-chip-pop.project .nm{font-size:var(--cds-font-size-body,14px);font-weight:550;color:var(--cds-text-primary,#141413);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ldoc-chip-pop.project .em{font-size:var(--cds-font-size-footnote,13px);color:var(--cds-text-muted,#A3A29C);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${resolveEditorExtensionsValue7(`.ldoc-chip-pop.dd :is(.row,.crt,.tplrow,.ftbtn,.orow,.addbtn),.ldoc-chip-pop.enum-insert .row`)}`);
  (resolveEditorExtensionsValue13 = (
    ..._extraArguments: unknown[]
  ): Dynamic => editorExtensionsState);
  (editorExtensionsValue0 = 0);
  (resolveEditorExtensionsValue14 = (
    ..._extraArguments: unknown[]
  ): Dynamic => resolveEditorExtensionsMintId());
  (resolveEditorExtensionsGray = (
    editorExtensionsGray?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsToLowerCase(editorExtensionsGray) ?? `gray`);
  (resolveEditorExtensionsValue15 = (
    editorExtensionsValue15?: Dynamic,
    ..._extraArguments: unknown[]
  ) => JSON.stringify(editorExtensionsValue15));
  (resolveEditorExtensionsFind = (
    editorExtensionsFind?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof options != `string` || !options
      ? null
      : (editorExtensionsFind.find(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            rolldownNImport2.id === options,
        ) ??
        editorExtensionsFind.find(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            rolldownNImport2.l === options,
        ) ??
        null));
  (editorExtensionsPattern7 = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g);
  (editorExtensionsPattern8 = /(?![\u200c-\u200f\ufe0e-\ufe0f\u180b-\u180d])[\p{Cf}\p{Default_Ignorable_Code_Point}\ud800-\udfff]/gu);
  (resolveEditorExtensionsJoin = (
    editorExtensionsJoin?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    [
      ...String(editorExtensionsJoin)
        .replace(editorExtensionsPattern7, ` `)
        .replace(editorExtensionsPattern8, ``),
    ]
      .slice(0, 80)
      .join(``));
  (resolveEditorExtensionsReplace = (
    editorExtensionsReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let items = [
      ...String(editorExtensionsReplace)
        .replace(editorExtensionsPattern7, ` `)
        .replace(editorExtensionsPattern8, ``),
    ];
    return items.length > 80 ? items.slice(0, 80).join(``) + `…` : items.join(``);
  });
  (editorExtensionsPattern9 = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g);
  (editorExtensionsPattern10 = /(?![\u200c-\u200f\ufe0e-\ufe0f\u180b-\u180d])[\p{Cf}\p{Default_Ignorable_Code_Point}\ud800-\udfff]/gu);
  (editorExtensionsPattern11 = /<[^>]*>?/g);
  (EditorExtensionsClaude = `claude`);
  (resolveEditorExtensionsClaude = (
    actor?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof actor.principal == `string` &&
    actor.principal.length > 0 &&
    typeof actor.ref != `string` &&
    actor.principal !== `claude`);
  (resolveEditorExtensionsLabel = (
    editorExtensionsLabel?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveEditorExtensionsClaude(editorExtensionsLabel)
      ? resolveEditorExtensionsTrim(editorExtensionsLabel.label)
      : null);
  (editorExtensionsValue1000 = 1e3);
  (editorExtensionsValue4000 = 4e3);
  (EditorExtensionsProseBlockMapUnreadable = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic;
    constructor(
      editorExtensionsProseBlockMapUnreadable?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `prose block map is not copyable: ${editorExtensionsProseBlockMapUnreadable}`,
      );
      this.name = `ProseBlockMapUnreadable`;
      this.code = editorExtensionsProseBlockMapUnreadable;
    }
  });
  (editorExtensionsValue1024 = 1024);
  (editorExtensionsValue10002 = 1e3);
  (editorExtensionsSet4 = new (Set as Dynamic)([
    `type`,
    `id`,
    `attrs`,
    `content`,
    `text`,
    `marks`,
    `items`,
    `rev`,
    `selfRev`,
    `createdRev`,
    `h`,
    `runs`,
    `epoch`,
    `truncated`,
    `parent`,
    `attrsOpaque`,
    `quarantined`,
    `by`,
    `atom`,
  ]));
  (editorExtensionsSet5 = new (Set as Dynamic)([
    ...editorExtensionsSet4,
    `kind`,
  ]));
  (resolveEditorExtensionsValue17 = (
    editorExtensionsValue17?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsValue17 == `object` &&
    !!editorExtensionsValue17 &&
    !Array.isArray(editorExtensionsValue17));
  (resolveEditorExtensionsTrim2 = (
    editorExtensionsTrim2?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    let number2: Dynamic =
      typeof editorExtensionsTrim2 == `string` &&
      editorExtensionsTrim2.trim() !== ``
        ? Number(editorExtensionsTrim2)
        : editorExtensionsTrim2;
    return typeof number2 == `number` && Number.isInteger(number2)
      ? number2
      : null;
  });
  (resolveEditorExtensionsTrue = (
    editorExtensionsTrue?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorExtensionsTrue === true ||
    editorExtensionsTrue === 1 ||
    editorExtensionsTrue === `true` ||
    editorExtensionsTrue === `1`
      ? true
      : editorExtensionsTrue === false ||
          editorExtensionsTrue === 0 ||
          editorExtensionsTrue === `false` ||
          editorExtensionsTrue === `0`
        ? false
        : null);
  (resolveEditorExtensionsValue18 = (
    editorExtensionsValue18?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsValue18 == `string` && editorExtensionsValue18 !== ``
      ? editorExtensionsValue18
      : null);
  (resolveEditorExtensionsDropped = (
    editorExtensionsDropped?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    editorExtensionsDropped.dropped[options] =
      (editorExtensionsDropped.dropped[options] ?? 0) + 1;
  });
  (resolveEditorExtensionsValue19 = (
    editorExtensionsValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    throw new (EditorExtensionsProseBlockMapUnreadable as Dynamic)(
      editorExtensionsValue19,
    );
  });
  (resolveEditorExtensionsValue20 = (
    editorExtensionsValue20?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    JSON.stringify(editorExtensionsValue20 ?? []) ===
    JSON.stringify(options ?? []));
  (editorExtensionsSet6 = new (Set as Dynamic)([
    `bulletList`,
    `orderedList`,
    `list`,
  ]));
  (editorExtensionsSet7 = new (Set as Dynamic)([
    `paragraph`,
    `heading`,
  ]));
  (editorExtensionsSet8 = new (Set as Dynamic)([
    `tableCell`,
    `tableHeader`,
    `cell`,
  ]));
  (resolveEditorExtensionsCharCodeAt = (
    editorExtensionsCharCode?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let charCodeAt: Dynamic = editorExtensionsCharCode.charCodeAt(options);
    let charCodeAt2: Dynamic = editorExtensionsCharCode.charCodeAt(options + 1);
    return charCodeAt >= 55296 &&
      charCodeAt <= 56319 &&
      charCodeAt2 >= 56320 &&
      charCodeAt2 <= 57343
      ? 2
      : 1;
  });
  (resolveEditorExtensionsValue22 = (
    editorExtensionsValue22?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${editorExtensionsValue22}.${options}`);
  (editorExtensionsValue4096 = 4096);
  (resolveEditorExtensionsCenter = (
    editorExtensionsCenter?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsCenter === `center` || editorExtensionsCenter === `right`
      ? editorExtensionsCenter
      : null);
  (EditorExtensionsCellAlias = {
    cellAlias: false,
    rowSlots: true,
    mentionLabel: false,
    hrefFragment: false,
  });
  (editorExtensionsBoldItalicStrikeUnderlineValues = [
    `bold`,
    `italic`,
    `strike`,
    `underline`,
    `highlight`,
    `link`,
  ]);
  (resolveEditorExtensionsTest = (
    editorExtensionsTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsTest == `string` &&
    /^(https?:|mailto:)/i.test(editorExtensionsTest.trim()));
  (resolveEditorExtensionsHrefFragment = (
    editorExtensionsHrefFragment?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsTest(editorExtensionsHrefFragment) ||
    (EditorExtensionsCellAlias.hrefFragment &&
      resolvePlatformSessionAndSourcesTest9(editorExtensionsHrefFragment)));
  (editorExtensionsValue0_01 = 0.01);
  (editorExtensionsValue1_0001 = 1.0001);
  (resolveEditorExtensionsSplit = (
    editorExtensionsSplit?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => new (Set as Dynamic)(editorExtensionsSplit.split(` `)));
  (collectEditorExtensionsSplit = (
    collectEditorExtensionsSplit2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.fromEntries(
      collectEditorExtensionsSplit2
        .split(` `)
        .map(
          (
            rolldownNImportPart?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => rolldownNImportPart.split(`:`),
        ),
    ));
  (EditorExtensionsState2 = collectEditorExtensionsSplit(
    `lt:< gt:> amp:& quot:" apos:' nbsp:\xA0`,
  ));
  (resolveEditorExtensionsIndexOf = (
    editorExtensionsIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsIndex.indexOf(`&`) < 0
      ? editorExtensionsIndex
      : editorExtensionsIndex.replace(
          /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
          (
            editorExtensionsIndex2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (options[0] !== `#`)
              return (
                EditorExtensionsState2[options.toLowerCase()] ??
                editorExtensionsIndex2
              );
            let number2 =
              options[1] === `x` || options[1] === `X`
                ? parseInt(options.slice(2), 16)
                : Number(options.slice(1));
            return number2 >= 0 && number2 <= 1114111
              ? String.fromCodePoint(number2)
              : editorExtensionsIndex2;
          },
        ));
  (EditorExtensionsBrHrHardBreakHorizontalRuleGapGoneHit = resolveEditorExtensionsSplit(`br hr hardBreak horizontalRule gap gone hit`));
  (EditorExtensionsDocRootViewDocument = resolveEditorExtensionsSplit(
    `doc root view document`,
  ));
  (EditorExtensionsState3 = collectEditorExtensionsSplit(
    `p:paragraph paragraph:paragraph heading:paragraph ul:list ol:list list:list bulletList:list orderedList:list taskList:list li:listItem listItem:listItem taskItem:listItem blockquote:blockquote pre:codeBlock codeBlock:codeBlock hr:horizontalRule horizontalRule:horizontalRule table:table tr:tableRow tableRow:tableRow td:cell th:cell cell:cell tableCell:cell tableHeader:cell embed:embed pending:pending`,
  ));
  (editorExtensionsSet9 = new (Set as Dynamic)(
    Object.values(EditorExtensionsState3),
  ));
  (EditorExtensionsParagraphCodeBlock = resolveEditorExtensionsSplit(`paragraph codeBlock`));
  (resolveEditorExtensionsPush = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    let rolldownTImport2 = (
      editorExtensionsPush?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let node2 of editorExtensionsPush as Dynamic)
        if (typeof node2 == `string`) {
          items.push(node2);
        } else {
          rolldownTImport2(node2.children);
        }
    };
    rolldownTImport2(node.children);
    return items.join(``).trim() ? [items.join(``)] : [];
  });
  (EditorExtensionsHorizontalRuleEmbed = resolveEditorExtensionsSplit(`horizontalRule embed`));
  (EditorExtensionsState4 = collectEditorExtensionsSplit(
    `br:hardBreak hardBreak:hardBreak mention:mention date:date dropdown:dropdown media:media image:media img:media`,
  ));
  (EditorExtensionsState5 = collectEditorExtensionsSplit(
    `b:bold strong:bold bold:bold i:italic em:italic italic:italic s:strike strike:strike del:strike code:code a:link link:link u:underline underline:underline mark:highlight highlight:highlight`,
  ));
  (EditorExtensionsState6 = resolveEditorExtensionsSplit(`t`));
  (EditorExtensionsCommentUtteranceAnchor = resolveEditorExtensionsSplit(`comment utterance anchor`));
  (resolveEditorExtensionsObjectId = (
    editorExtensionsObjectId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsObjectId.thread ??
    editorExtensionsObjectId[`object-id`] ??
    editorExtensionsObjectId.object?.replace(/^utterance\//, ``) ??
    editorExtensionsObjectId.id ??
    ``);
  (EditorExtensionsGapGoneHitHitsNotice = resolveEditorExtensionsSplit(`gap gone hit hits notice`));
  (EditorExtensionsIdHRevSeqByKindCompleteSinceSinceRevSessType = resolveEditorExtensionsSplit(
      `id h rev seq by kind complete since sinceRev sess type`,
    ));
  (resolveEditorExtensionsName = (
    editorExtensionsName?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof editorExtensionsName == `string` ||
    (!EditorExtensionsState3[editorExtensionsName.name] &&
      !!(
        EditorExtensionsState4[editorExtensionsName.name] ||
        EditorExtensionsState6.has(editorExtensionsName.name) ||
        EditorExtensionsState5[editorExtensionsName.name] ||
        EditorExtensionsCommentUtteranceAnchor.has(editorExtensionsName.name)
      )));
  (resolveEditorExtensionsExec3 = (
    editorExtensionsExec3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => /^(.+)\.\d+$/.exec(editorExtensionsExec3 ?? ``)?.[1] ?? null);
  (EditorExtensionsState7 = resolveEditorExtensionsValue21);
  (resolveEditorExtensionsIsInteger2 = (
    editorExtensionsIsInteger2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorExtensionsIsInteger2 !== undefined &&
    editorExtensionsIsInteger2 !== `` &&
    Number.isInteger(Number(editorExtensionsIsInteger2))
      ? Number(editorExtensionsIsInteger2)
      : null);
  (resolveEditorExtensionsTrue2 = (
    editorExtensionsTrue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorExtensionsTrue2 === undefined
      ? null
      : [``, `true`, `1`, `checked`].includes(editorExtensionsTrue2)
        ? true
        : editorExtensionsTrue2 === `false` || editorExtensionsTrue2 === `0`
          ? false
          : null);
  (resolveEditorExtensionsSess2 = (
    raw?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = /^(.*)\.(\d+)$/.exec(raw);
    return {
      sess: match ? match[1] : null,
      i: match ? Number(match[2]) : 0,
      raw: raw,
      off: 0,
      open: null,
    };
  });
  (resolveEditorExtensionsSess3 = (
    editorExtensionsSess3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsSess3.sess === null
      ? editorExtensionsSess3.off
        ? ``
        : editorExtensionsSess3.raw
      : `${editorExtensionsSess3.sess}.${editorExtensionsSess3.i + editorExtensionsSess3.off}`);
  (resolveEditorExtensionsValue24 = (
    editorExtensionsValue24?: Dynamic,
    marks?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    marks.length
      ? {
          ...editorExtensionsValue24,
          marks: marks,
        }
      : editorExtensionsValue24);
  (resolveEditorExtensionsSome2 = (
    editorExtensionsSome2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsSome2.some(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.type === options.type,
    )
      ? editorExtensionsSome2
      : [...editorExtensionsSome2, options]);
  (resolveEditorExtensionsHref2 = (
    editorExtensionsHref2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let type: Dynamic =
      EditorExtensionsState5[editorExtensionsHref2] ?? editorExtensionsHref2;
    if (type === `link`)
      return {
        type: `link`,
        attrs: {
          href: options.href ?? ``,
        },
      };
    let editorExtensionsColor2: Dynamic = resolveEditorExtensionsColor2(
      type,
      options,
    );
    return editorExtensionsColor2
      ? editorExtensionsColor2.color === null
        ? {
            type: `highlight`,
          }
        : {
            type: `highlight`,
            attrs: {
              color: editorExtensionsColor2.color,
            },
          }
      : {
          type: type,
        };
  });
}

export {
  EditorExtensionsAskClaude,
  EditorExtensionsBlue2,
  EditorExtensionsClaude,
  EditorExtensionsCommentUtteranceAnchor,
  EditorExtensionsDocRootViewDocument,
  EditorExtensionsGapGoneHitHitsNotice,
  EditorExtensionsHorizontalRuleEmbed,
  EditorExtensionsIdHRevSeqByKindCompleteSinceSinceRevSessType,
  EditorExtensionsMoreActions,
  EditorExtensionsParagraphCodeBlock,
  EditorExtensionsProseBlockMapUnreadable,
  EditorExtensionsState3,
  EditorExtensionsState4,
  EditorExtensionsState5,
  EditorExtensionsState6,
  EditorExtensionsState7,
  EditorExtensionsStrong,
  collectEditorExtensionsAuto,
  collectEditorExtensionsSlice,
  editorExtensionsAskClaudeCommentReactValues,
  editorExtensionsBoldItalicStrikeUnderlineValues,
  editorExtensionsGraySkyMineralOliveValues,
  editorExtensionsSet9,
  editorExtensionsValue4000,
  filterEditorExtensionsMap,
  isEditorExtensionsFloor,
  isEditorExtensionsRoot,
  isEditorExtensionsTrim,
  resolveEditorExtensionsBackground,
  resolveEditorExtensionsBlock,
  resolveEditorExtensionsCenter,
  resolveEditorExtensionsChart,
  resolveEditorExtensionsChildren,
  resolveEditorExtensionsClaude,
  resolveEditorExtensionsDataColor,
  resolveEditorExtensionsDataColwidth,
  resolveEditorExtensionsDelete,
  resolveEditorExtensionsEvery,
  resolveEditorExtensionsFind,
  resolveEditorExtensionsGray,
  resolveEditorExtensionsHref2,
  resolveEditorExtensionsHrefFragment,
  resolveEditorExtensionsIsInteger,
  resolveEditorExtensionsIsInteger2,
  resolveEditorExtensionsJoin,
  resolveEditorExtensionsLabel,
  resolveEditorExtensionsMintId,
  resolveEditorExtensionsName,
  resolveEditorExtensionsNoun,
  resolveEditorExtensionsNoun2,
  resolveEditorExtensionsObjectId,
  resolveEditorExtensionsOpt,
  resolveEditorExtensionsPlatform,
  resolveEditorExtensionsPush,
  resolveEditorExtensionsReg,
  resolveEditorExtensionsReplace,
  resolveEditorExtensionsRole,
  resolveEditorExtensionsSess,
  resolveEditorExtensionsSess2,
  resolveEditorExtensionsSess3,
  resolveEditorExtensionsSome2,
  resolveEditorExtensionsTest,
  resolveEditorExtensionsToLowerCase,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsTrim3,
  resolveEditorExtensionsTrue2,
  resolveEditorExtensionsTrunc,
  resolveEditorExtensionsValue12,
  resolveEditorExtensionsValue13,
  resolveEditorExtensionsValue14,
  resolveEditorExtensionsValue15,
  resolveEditorExtensionsValue16,
  resolveEditorExtensionsValue21,
  resolveEditorExtensionsValue22,
  resolveEditorExtensionsValue23,
  resolveEditorExtensionsValue24,
  resolveEditorExtensionsValue6,
  resolveEditorExtensionsValue7,
  resolveEditorExtensionsValue8,
  resolveEditorExtensionsValue9,
};

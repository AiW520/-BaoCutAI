/** BaoCut: editor anchors and mentions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Node2,
  mergeAttributes,
} from "../../platform/dependencies";
import {
  resolvePlatformSessionAndSourcesNode,
  resolvePlatformSessionAndSourcesValue,
} from "../../platform/services/session-and-sources-1";
import {
  resolveEditorExtensionsJoin,
} from "./extensions-2";
import {
  SuggestionPluginKey,
} from "./extensions-5";

function resolveEditorAnchorsAndMentionsExit(
  editorAnchorsAndMentionsExit?: Dynamic,
  options: Dynamic = SuggestionPluginKey,
  ..._extraArguments: unknown[]
): undefined {
  let setMeta: Dynamic = editorAnchorsAndMentionsExit.state.tr.setMeta(
    options,
    {
      exit: true,
    },
  );
  editorAnchorsAndMentionsExit.dispatch(setMeta);
}

var EditorAnchorsAndMentionsMaster16: {
    name: string;
    master16: {
        d: string;
    }[];
    master20: {
        d: string;
    }[];
};

var editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values: string[];

function resolveEditorAnchorsAndMentionsAnon(
  editorAnchorsAndMentionsAnon?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let normalizedTrimmedEditorAnchorsAndMentionsAnon: Dynamic =
    editorAnchorsAndMentionsAnon?.trim().toLowerCase();
  return normalizedTrimmedEditorAnchorsAndMentionsAnon &&
    normalizedTrimmedEditorAnchorsAndMentionsAnon !== `anon`
    ? normalizedTrimmedEditorAnchorsAndMentionsAnon
    : (options?.trim().toLowerCase().replace(/\s+/g, ` `) ?? ``);
}

function resolveEditorAnchorsAndMentionsCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count: number = 2166136261;
  for (let index = 0; index < items.length; index++) {
    count ^= items.charCodeAt(index);
    count = Math.imul(count, 16777619);
  }
  return editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values[
    (count >>> 0) %
      editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values.length
  ];
}

function resolveEditorAnchorsAndMentionsValue(
  editorAnchorsAndMentionsValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorAnchorsAndMentionsAnon: Dynamic =
    resolveEditorAnchorsAndMentionsAnon(editorAnchorsAndMentionsValue, options);
  return editorAnchorsAndMentionsAnon
    ? resolveEditorAnchorsAndMentionsCharCodeAt(editorAnchorsAndMentionsAnon)
    : undefined;
}

var EditorAnchorsAndMentionsHttpWwwW3Org2000Svg: string;

var editorAnchorsAndMentionsValue0_4: number;

var EditorAnchorsAndMentionsDataAnthropiconLayer: string;

var EditorAnchorsAndMentionsAnthropiconLayerCss: string;

var EditorAnchorsAndMentionsState: string;

var filterEditorAnchorsAndMentionsSecondary: Dynamic;

var EditorAnchorsAndMentionsState2: number[][];

function resolveEditorAnchorsAndMentionsGrid(
  editorAnchorsAndMentionsGrid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let grid = options <= 18 ? 16 : 20;
  if (
    (grid === 16
      ? editorAnchorsAndMentionsGrid.master16
      : editorAnchorsAndMentionsGrid.master20
    ).length === 0
  ) {
    grid = grid === 16 ? 20 : 16;
  }
  let stroke: number = EditorAnchorsAndMentionsState2[0][1];
  let amount = 1 / 0;
  for (let [
    resolveEditorAnchorsAndMentionsGridResult,
    resolveEditorAnchorsAndMentionsGridResult2,
  ] of EditorAnchorsAndMentionsState2 as Dynamic) {
    let abs = Math.abs(resolveEditorAnchorsAndMentionsGridResult - options);
    if (abs <= amount) {
      amount = abs;
      stroke = resolveEditorAnchorsAndMentionsGridResult2;
    }
  }
  return {
    grid: grid,
    stroke: stroke,
  };
}

function resolveEditorAnchorsAndMentionsCreateElementNS(
  editorAnchorsAndMentionsCreateElementNS?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementNS: Dynamic =
    editorAnchorsAndMentionsCreateElementNS.createElementNS(
      EditorAnchorsAndMentionsHttpWwwW3Org2000Svg,
      options,
    );
  for (let [
    resolveEditorAnchorsAndMentionsCreateElementNSResult,
    resolveEditorAnchorsAndMentionsCreateElementNSResult2,
  ] of Object.entries(context) as Dynamic)
    elementNS.setAttribute(
      resolveEditorAnchorsAndMentionsCreateElementNSResult,
      String(resolveEditorAnchorsAndMentionsCreateElementNSResult2),
    );
  return elementNS;
}

function collectEditorAnchorsAndMentionsToString(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let toString: Dynamic = (
    collectEditorAnchorsAndMentions?: Dynamic,
    ..._extraArguments: unknown[]
  ) => parseFloat(collectEditorAnchorsAndMentions.toFixed(5)).toString();
  if (items.length === 0) return ``;
  if (options <= 0 || items.length < 3)
    return items
      .map(
        (
          [rolldownNImport2, rolldownNImport3]: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          `${index === 0 ? `M` : `L`}${toString(rolldownNImport2)} ${toString(rolldownNImport3)}`,
      )
      .join(``);
  let label: string = `M${toString(items[0][0])} ${toString(items[0][1])}`;
  let difference = items.length - 1;
  for (let count = 1; count < difference; count++) {
    let [itemItem, setItemItem]: Dynamic = items[count - 1];
    let [itemItem2, setItemItem2]: Dynamic = items[count];
    let [itemItem3, setItemItem3]: Dynamic = items[count + 1];
    let hypot = Math.hypot(itemItem2 - itemItem, setItemItem2 - setItemItem);
    let hypot2 = Math.hypot(itemItem3 - itemItem2, setItemItem3 - setItemItem2);
    let amount =
      ((itemItem - itemItem2) * (itemItem3 - itemItem2) +
        (setItemItem - setItemItem2) * (setItemItem3 - setItemItem2)) /
      (hypot * hypot2 || 1);
    let tan = Math.tan(Math.acos(Math.max(-1, Math.min(1, amount))) / 2);
    let hypot3 = count - 1 == 0 ? hypot : hypot / 2;
    let hypot4 = count + 1 === difference ? hypot2 : hypot2 / 2;
    let min = tan > 1e-6 ? Math.min(options / tan, hypot3, hypot4) : 0;
    let amount2: number = min * tan;
    label += `L${toString(itemItem2 + ((itemItem - itemItem2) / hypot) * min)} ${toString(setItemItem2 + ((setItemItem - setItemItem2) / hypot) * min)}`;
    let collectEditorAnchorsAndMentionsToStringResult = +(
      (itemItem2 - itemItem) * (setItemItem3 - setItemItem2) -
        (setItemItem2 - setItemItem) * (itemItem3 - itemItem2) >
      0
    );
    label += `A${toString(amount2)} ${toString(amount2)} 0 0 ${collectEditorAnchorsAndMentionsToStringResult} ${toString(itemItem2 + ((itemItem3 - itemItem2) / hypot2) * min)} ${toString(setItemItem2 + ((setItemItem3 - setItemItem2) / hypot2) * min)}`;
  }
  label += `L${toString(items[difference][0])} ${toString(items[difference][1])}`;
  return label;
}

function collectEditorAnchorsAndMentionsSecondary(
  collectEditorAnchorsAndMentionsSecondary2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 20,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    secondary: filterEditorAnchorsAndMentionsSecondary2,
    main: filterEditorAnchorsAndMentionsSecondary3,
  }: Dynamic = filterEditorAnchorsAndMentionsSecondary(
    dependencies === 16 ? options.master16 : options.master20,
  );
  let mappedFilterEditorAnchorsAndMentionsSecondary: Dynamic =
    filterEditorAnchorsAndMentionsSecondary3.map(
      (
        filterEditorAnchorsAndMentionsSecondary4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        collectEditorAnchorsAndMentionsVectorEffect(
          collectEditorAnchorsAndMentionsSecondary2,
          filterEditorAnchorsAndMentionsSecondary4,
          context,
        ),
    );
  if (filterEditorAnchorsAndMentionsSecondary2.length === 0)
    return mappedFilterEditorAnchorsAndMentionsSecondary;
  if (
    !collectEditorAnchorsAndMentionsSecondary2.getElementById(
      EditorAnchorsAndMentionsAnthropiconLayerCss,
    )
  ) {
    let element: Dynamic =
      collectEditorAnchorsAndMentionsSecondary2.createElement(`style`);
    element.id = EditorAnchorsAndMentionsAnthropiconLayerCss;
    element.textContent = EditorAnchorsAndMentionsState;
    (
      collectEditorAnchorsAndMentionsSecondary2.head ??
      collectEditorAnchorsAndMentionsSecondary2.documentElement
    ).append(element);
  }
  let editorAnchorsAndMentionsCreateElementNS: Dynamic =
    resolveEditorAnchorsAndMentionsCreateElementNS(
      collectEditorAnchorsAndMentionsSecondary2,
      `g`,
      {
        [EditorAnchorsAndMentionsDataAnthropiconLayer]: `secondary`,
        opacity: editorAnchorsAndMentionsValue0_4,
      },
    );
  (editorAnchorsAndMentionsCreateElementNS.append as Dynamic)(
    ...filterEditorAnchorsAndMentionsSecondary2.map(
      (
        filterEditorAnchorsAndMentionsSecondary4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        collectEditorAnchorsAndMentionsVectorEffect(
          collectEditorAnchorsAndMentionsSecondary2,
          filterEditorAnchorsAndMentionsSecondary4,
          context,
        ),
    ),
  );
  return [
    editorAnchorsAndMentionsCreateElementNS,
    ...mappedFilterEditorAnchorsAndMentionsSecondary,
  ];
}

function collectEditorAnchorsAndMentionsVectorEffect(
  collectEditorAnchorsAndMentionsVectorEffect2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    "vector-effect": `non-scaling-stroke`,
  };
  if (context) {
    record2.class = context;
  }
  if (options.filled) {
    record2[`data-fill`] = options.filled === `only` ? `only` : `both`;
  }
  if (options.dashes) {
    record2[`stroke-dasharray`] = options.dashes.join(` `);
  }
  return `d` in options
    ? resolveEditorAnchorsAndMentionsCreateElementNS(
        collectEditorAnchorsAndMentionsVectorEffect2,
        `path`,
        {
          d: options.d,
          ...record2,
        },
      )
    : `points` in options
      ? options.rx
        ? resolveEditorAnchorsAndMentionsCreateElementNS(
            collectEditorAnchorsAndMentionsVectorEffect2,
            `path`,
            {
              d: collectEditorAnchorsAndMentionsToString(
                options.points,
                options.rx,
              ),
              ...record2,
            },
          )
        : resolveEditorAnchorsAndMentionsCreateElementNS(
            collectEditorAnchorsAndMentionsVectorEffect2,
            `polyline`,
            {
              points: options.points
                .map(
                  ([point, point2]: Dynamic, ..._extraArguments: unknown[]) =>
                    `${point},${point2}`,
                )
                .join(` `),
              ...record2,
            },
          )
      : `x1` in options
        ? resolveEditorAnchorsAndMentionsCreateElementNS(
            collectEditorAnchorsAndMentionsVectorEffect2,
            `line`,
            {
              x1: options.x1,
              y1: options.y1,
              x2: options.x2,
              y2: options.y2,
              ...record2,
            },
          )
        : `width` in options
          ? resolveEditorAnchorsAndMentionsCreateElementNS(
              collectEditorAnchorsAndMentionsVectorEffect2,
              `rect`,
              {
                x: options.x,
                y: options.y,
                width: options.width,
                height: options.height,
                rx: options.rx ?? 0,
                ...record2,
              },
            )
          : `rx` in options
            ? resolveEditorAnchorsAndMentionsCreateElementNS(
                collectEditorAnchorsAndMentionsVectorEffect2,
                `ellipse`,
                {
                  cx: options.cx,
                  cy: options.cy,
                  rx: options.rx,
                  ry: options.ry,
                  ...record2,
                },
              )
            : resolveEditorAnchorsAndMentionsCreateElementNS(
                collectEditorAnchorsAndMentionsVectorEffect2,
                `circle`,
                {
                  cx: options.cx,
                  cy: options.cy,
                  r: options.r,
                  ...record2,
                },
              );
}

function collectEditorAnchorsAndMentionsGrid(
  collectEditorAnchorsAndMentionsGrid2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    grid: editorAnchorsAndMentionsGrid,
    stroke: editorAnchorsAndMentionsGrid2,
  }: Dynamic = resolveEditorAnchorsAndMentionsGrid(
    collectEditorAnchorsAndMentionsGrid2,
    options,
  );
  let amount =
    Math.round(
      (((argument ?? editorAnchorsAndMentionsGrid2) *
        editorAnchorsAndMentionsGrid) /
        options) *
        1e3,
    ) / 1e3;
  let collectEditorAnchorsAndMentionsGridHandler: Dynamic = (
    collectEditorAnchorsAndMentionsGrid3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `x1` in collectEditorAnchorsAndMentionsGrid3 ||
    `points` in collectEditorAnchorsAndMentionsGrid3;
  let join = (
    collectEditorAnchorsAndMentionsGrid3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let total =
      (collectEditorAnchorsAndMentionsGrid3.filled
        ? ` fill='${context}'${collectEditorAnchorsAndMentionsGrid3.filled === `only` ? ` stroke='none'` : ``}`
        : dependencies &&
            !collectEditorAnchorsAndMentionsGridHandler(
              collectEditorAnchorsAndMentionsGrid3,
            )
          ? ` fill='${dependencies}'`
          : ``) +
      (collectEditorAnchorsAndMentionsGrid3.dashes
        ? ` stroke-dasharray='${collectEditorAnchorsAndMentionsGrid3.dashes.join(` `)}'${collectEditorAnchorsAndMentionsGrid3.dashoffset ? ` stroke-dashoffset='${collectEditorAnchorsAndMentionsGrid3.dashoffset}'` : ``}`
        : ``);
    return `d` in collectEditorAnchorsAndMentionsGrid3
      ? `<path d='${collectEditorAnchorsAndMentionsGrid3.d}'${total}/>`
      : `points` in collectEditorAnchorsAndMentionsGrid3
        ? collectEditorAnchorsAndMentionsGrid3.rx
          ? `<path d='${collectEditorAnchorsAndMentionsToString(collectEditorAnchorsAndMentionsGrid3.points, collectEditorAnchorsAndMentionsGrid3.rx)}'${total}/>`
          : `<polyline points='${collectEditorAnchorsAndMentionsGrid3.points.map(([point, point2]: Dynamic, ..._extraArguments: unknown[]) => `${point},${point2}`).join(` `)}'${total}/>`
        : `x1` in collectEditorAnchorsAndMentionsGrid3
          ? `<line x1='${collectEditorAnchorsAndMentionsGrid3.x1}' y1='${collectEditorAnchorsAndMentionsGrid3.y1}' x2='${collectEditorAnchorsAndMentionsGrid3.x2}' y2='${collectEditorAnchorsAndMentionsGrid3.y2}'${total}/>`
          : `width` in collectEditorAnchorsAndMentionsGrid3
            ? `<rect x='${collectEditorAnchorsAndMentionsGrid3.x}' y='${collectEditorAnchorsAndMentionsGrid3.y}' width='${collectEditorAnchorsAndMentionsGrid3.width}' height='${collectEditorAnchorsAndMentionsGrid3.height}' rx='${collectEditorAnchorsAndMentionsGrid3.rx ?? 0}'${total}/>`
            : `rx` in collectEditorAnchorsAndMentionsGrid3
              ? `<ellipse cx='${collectEditorAnchorsAndMentionsGrid3.cx}' cy='${collectEditorAnchorsAndMentionsGrid3.cy}' rx='${collectEditorAnchorsAndMentionsGrid3.rx}' ry='${collectEditorAnchorsAndMentionsGrid3.ry}'${total}/>`
              : `<circle cx='${collectEditorAnchorsAndMentionsGrid3.cx}' cy='${collectEditorAnchorsAndMentionsGrid3.cy}' r='${collectEditorAnchorsAndMentionsGrid3.r}'${total}/>`;
  };
  let join2: Dynamic = (
    collectEditorAnchorsAndMentionsGrid3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [...collectEditorAnchorsAndMentionsGrid3];
    if (dependencies) {
      items.sort(
        (
          rolldownRImport2?: Dynamic,
          rolldownRImport3?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          Number(collectEditorAnchorsAndMentionsGridHandler(rolldownRImport2)) -
          Number(collectEditorAnchorsAndMentionsGridHandler(rolldownRImport3)),
      );
    }
    return items.map(join).join(``);
  };
  let {
    secondary: filterEditorAnchorsAndMentionsSecondary2,
    main: filterEditorAnchorsAndMentionsSecondary3,
  }: Dynamic = filterEditorAnchorsAndMentionsSecondary(
    editorAnchorsAndMentionsGrid === 16
      ? collectEditorAnchorsAndMentionsGrid2.master16
      : collectEditorAnchorsAndMentionsGrid2.master20,
  );
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${options}' height='${options}' viewBox='0 0 ${editorAnchorsAndMentionsGrid} ${editorAnchorsAndMentionsGrid}' fill='none' stroke='${context}' stroke-width='${amount}' stroke-linecap='round' stroke-linejoin='round'>${filterEditorAnchorsAndMentionsSecondary2.length > 0 ? `<g opacity='${editorAnchorsAndMentionsValue0_4}'>${join2(filterEditorAnchorsAndMentionsSecondary2)}</g>` : ``}${join2(filterEditorAnchorsAndMentionsSecondary3)}</svg>`;
}

function resolveEditorAnchorsAndMentionsValue2(
  editorAnchorsAndMentionsValue2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `url("data:image/svg+xml,${encodeURIComponent(collectEditorAnchorsAndMentionsGrid(editorAnchorsAndMentionsValue2, options, context, dependencies, argument))}")`;
}

function resolveEditorAnchorsAndMentionsGrid2(
  editorAnchorsAndMentionsGrid2?: Dynamic,
  options?: Dynamic,
  width: Dynamic = 16,
  ..._extraArguments: unknown[]
): Dynamic {
  let { grid: editorAnchorsAndMentionsGrid, stroke: strokeWidth }: Dynamic =
    resolveEditorAnchorsAndMentionsGrid(options, width);
  let editorAnchorsAndMentionsCreateElementNS: Dynamic =
    resolveEditorAnchorsAndMentionsCreateElementNS(
      editorAnchorsAndMentionsGrid2,
      `svg`,
      {
        width: width,
        height: width,
        viewBox:
          editorAnchorsAndMentionsGrid === 16 ? `0 0 16 16` : `0 0 20 20`,
        fill: `none`,
        stroke: `currentColor`,
        "stroke-width": strokeWidth,
        "stroke-linecap": `round`,
        "stroke-linejoin": `round`,
        "aria-hidden": `true`,
        focusable: `false`,
        "data-icon": options.name,
      },
    );
  (editorAnchorsAndMentionsCreateElementNS.append as Dynamic)(
    ...collectEditorAnchorsAndMentionsSecondary(
      editorAnchorsAndMentionsGrid2,
      options,
      undefined,
      editorAnchorsAndMentionsGrid,
    ),
  );
  for (let element of editorAnchorsAndMentionsCreateElementNS.querySelectorAll(
    `[data-fill]`,
  ) as Dynamic) {
    element.setAttribute(`fill`, `currentColor`);
    if (element.getAttribute(`data-fill`) === `only`) {
      element.setAttribute(`stroke`, `none`);
    }
  }
  return editorAnchorsAndMentionsCreateElementNS;
}

var editorAnchorsAndMentionsWeakSet: Dynamic;

var EditorAnchorsAndMentionsApply: typeof Reflect.apply;

var EditorAnchorsAndMentionsPrototype: (value: WeakKey) => WeakSet<WeakKey>;

var EditorAnchorsAndMentionsGetOwnPropertyDescriptor: (() => unknown) | undefined;

function resolveEditorAnchorsAndMentionsEscape(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (EditorAnchorsAndMentionsGetOwnPropertyDescriptor)
    try {
      return (
        EditorAnchorsAndMentionsApply(
          EditorAnchorsAndMentionsGetOwnPropertyDescriptor,
          event,
          [],
        ) === `Escape`
      );
    } catch {}
  return event.key === `Escape`;
}

function resolveEditorAnchorsAndMentionsValue3(
  editorAnchorsAndMentionsValue3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  EditorAnchorsAndMentionsApply(
    EditorAnchorsAndMentionsPrototype,
    editorAnchorsAndMentionsWeakSet,
    [editorAnchorsAndMentionsValue3],
  );
}

var editorAnchorsAndMentionsWeakMap: Dynamic;

function getEditorAnchorsAndMentionsValue(
  editorAnchorsAndMentionsValue?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (editorAnchorsAndMentionsValue != null)
    try {
      editorAnchorsAndMentionsWeakMap.get(editorAnchorsAndMentionsValue)?.();
    } catch {}
}

var EditorAnchorsAndMentionsState3: Dynamic;

function resolveEditorAnchorsAndMentionsValue4(
  editorAnchorsAndMentionsValue43?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let EditorAnchorsAndMentionsState32: Dynamic = EditorAnchorsAndMentionsState3;
  EditorAnchorsAndMentionsState3 = editorAnchorsAndMentionsValue43 ?? null;
  try {
    return options();
  } finally {
    EditorAnchorsAndMentionsState3 = EditorAnchorsAndMentionsState32;
  }
}

function resolveEditorAnchorsAndMentionsValue5(
  ..._extraArguments: unknown[]
): undefined {
  getEditorAnchorsAndMentionsValue(EditorAnchorsAndMentionsState3);
}

function resolveEditorAnchorsAndMentionsDocumentElement(
  editorAnchorsAndMentionsDocumentElement?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentElement: Dynamic =
    editorAnchorsAndMentionsDocumentElement.documentElement;
  return (
    (documentElement.clientWidth > 0 &&
      options >= documentElement.clientWidth) ||
    (documentElement.clientHeight > 0 &&
      context >= documentElement.clientHeight)
  );
}

var EditorAnchorsAndMentionsLfileTypeahead: string;

var editorAnchorsAndMentionsValue0: number;

var editorAnchorsAndMentionsValue4: number;

var editorAnchorsAndMentionsValue42: number;

var editorAnchorsAndMentionsValue40: number;

function resolveEditorAnchorsAndMentionsValue6(
  editorAnchorsAndMentionsValue6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    vw: editorAnchorsAndMentionsValue6?.innerWidth || 0,
    vh: editorAnchorsAndMentionsValue6?.innerHeight || 0,
  };
}

function resolveEditorAnchorsAndMentionsLeft(
  editorAnchorsAndMentionsLeft?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let difference =
    context.vh -
    (editorAnchorsAndMentionsLeft.bottom + editorAnchorsAndMentionsValue4) -
    editorAnchorsAndMentionsValue42;
  let difference2 =
    editorAnchorsAndMentionsLeft.top -
    editorAnchorsAndMentionsValue4 -
    editorAnchorsAndMentionsValue42;
  let difference3 = dependencies?.above ? difference2 : difference;
  let difference4 = dependencies?.above ? difference : difference2;
  let dependencies2: Dynamic =
    dependencies &&
    (difference3 >= editorAnchorsAndMentionsValue40 ||
      difference4 <= difference3)
      ? dependencies
      : null;
  let enabled = dependencies2
    ? !dependencies2.above
    : difference >= options.natural || difference >= difference2;
  let maxHeight = Math.min(
    options.maxH,
    Math.max(
      editorAnchorsAndMentionsValue40,
      enabled ? difference : difference2,
    ),
  );
  let min = Math.min(options.natural, maxHeight);
  let top: Dynamic = enabled
    ? editorAnchorsAndMentionsLeft.bottom + editorAnchorsAndMentionsValue4
    : Math.max(
        editorAnchorsAndMentionsValue42,
        editorAnchorsAndMentionsLeft.top - editorAnchorsAndMentionsValue4 - min,
      );
  return {
    left: Math.max(
      editorAnchorsAndMentionsValue42,
      Math.min(
        editorAnchorsAndMentionsLeft.left,
        context.vw - options.width - editorAnchorsAndMentionsValue42,
      ),
    ),
    top: top,
    maxHeight: maxHeight,
    above: !enabled,
  };
}

function resolveEditorAnchorsAndMentionsOwnerDocument(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView) return 0;
  let maxHeight: Dynamic = element.style.maxHeight;
  element.style.maxHeight = ``;
  let number2 = parseFloat(defaultView.getComputedStyle(element).maxHeight);
  element.style.maxHeight = maxHeight;
  return Number.isFinite(number2) && number2 > 0 ? number2 : 0;
}

var editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValues: string[];

var editorAnchorsAndMentionsWeakMap2: Dynamic;

function resolveEditorAnchorsAndMentionsAriaHaspopup(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let setAttribute = (
    editorAnchorsAndMentionsAriaHaspopup?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      element.getAttribute(editorAnchorsAndMentionsAriaHaspopup) !== options2
    ) {
      if (options2 === null) {
        element.removeAttribute(editorAnchorsAndMentionsAriaHaspopup);
      } else {
        element.setAttribute(editorAnchorsAndMentionsAriaHaspopup, options2);
      }
    }
  };
  setAttribute(`aria-haspopup`, `listbox`);
  setAttribute(`aria-autocomplete`, `list`);
  setAttribute(`aria-controls`, options.controls);
  setAttribute(`aria-activedescendant`, options.active);
}

var resolveEditorAnchorsAndMentionsJoin: Dynamic;

function updateEditorAnchorsAndMentionsCapture(
  updateEditorAnchorsAndMentionsCapture2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic =
    updateEditorAnchorsAndMentionsCapture2.el.ownerDocument;
  let defaultView: Dynamic = ownerDocument2.defaultView;
  let count: number = 0;
  let enabled = false;
  let updateEditorAnchorsAndMentionsCaptureResult: Dynamic = null;
  let requestAnimationFrame2 = (..._extraArguments: unknown[]): undefined => {
    if (
      count === 0 &&
      defaultView?.requestAnimationFrame &&
      updateEditorAnchorsAndMentionsCapture2.isOpen()
    ) {
      count = defaultView.requestAnimationFrame(place);
    }
  };
  let cancelAnimationFrame2 = (..._extraArguments: unknown[]): undefined => {
    if (count !== 0) {
      defaultView?.cancelAnimationFrame(count);
    }
    count = 0;
    enabled = false;
    updateEditorAnchorsAndMentionsCaptureResult = null;
  };
  let place: Dynamic = (..._extraArguments: unknown[]) => {
    count = 0;
    if (!updateEditorAnchorsAndMentionsCapture2.isOpen())
      return cancelAnimationFrame2();
    let anchor: Dynamic =
      updateEditorAnchorsAndMentionsCapture2.anchor?.() ?? null;
    let matchesAnchor =
      anchor !== null &&
      updateEditorAnchorsAndMentionsCaptureResult !== null &&
      (Math.abs(anchor.top - updateEditorAnchorsAndMentionsCaptureResult.top) >
        0.5 ||
        Math.abs(
          anchor.left - updateEditorAnchorsAndMentionsCaptureResult.left,
        ) > 0.5);
    let enabled3 = enabled || matchesAnchor;
    enabled = false;
    if (enabled3) {
      updateEditorAnchorsAndMentionsCapture2.place();
    }
    if (enabled3 || updateEditorAnchorsAndMentionsCaptureResult === null) {
      updateEditorAnchorsAndMentionsCaptureResult = anchor;
    }
    if (updateEditorAnchorsAndMentionsCapture2.anchor) {
      requestAnimationFrame2();
    }
  };
  let isOpen = (..._extraArguments: unknown[]): undefined => {
    if (updateEditorAnchorsAndMentionsCapture2.isOpen()) {
      enabled = true;
      requestAnimationFrame2();
    }
  };
  ownerDocument2.addEventListener(`scroll`, isOpen, {
    capture: true,
    passive: true,
  });
  defaultView?.addEventListener(`resize`, isOpen);
  let label = `tk${++editorAnchorsAndMentionsValue0}`;
  let listId = `lfile-typeahead-${editorAnchorsAndMentionsValue0}`;
  updateEditorAnchorsAndMentionsCapture2.el.id = listId;
  updateEditorAnchorsAndMentionsCapture2.el.setAttribute(`role`, `listbox`);
  updateEditorAnchorsAndMentionsCapture2.el.setAttribute(
    `aria-label`,
    updateEditorAnchorsAndMentionsCapture2.label,
  );
  let optionId = (
    updateEditorAnchorsAndMentionsCapture3?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${listId}${context ? `-${context}` : ``}-option-${updateEditorAnchorsAndMentionsCapture3}${options ? `-${resolveEditorAnchorsAndMentionsJoin(options)}` : ``}`;
  let Symbol2 = Symbol(label);
  let updateEditorAnchorsAndMentionsCaptureResult2: Dynamic = null;
  let resolveEditorAnchorsAndMentionsAriaHaspopup2: Dynamic = (
    ..._extraArguments: unknown[]
  ) => {
    if (!updateEditorAnchorsAndMentionsCaptureResult2) return;
    let updateEditorAnchorsAndMentionsCaptureResult3: Dynamic =
      updateEditorAnchorsAndMentionsCaptureResult2;
    updateEditorAnchorsAndMentionsCaptureResult2 = null;
    let editorAnchorsAndMentionsWeakMap2Entry: Dynamic =
      editorAnchorsAndMentionsWeakMap2.get(
        updateEditorAnchorsAndMentionsCaptureResult3,
      );
    if (!editorAnchorsAndMentionsWeakMap2Entry) return;
    editorAnchorsAndMentionsWeakMap2Entry.holders.delete(Symbol2);
    let at2: Dynamic = [
      ...editorAnchorsAndMentionsWeakMap2Entry.holders.values(),
    ].at(-1);
    if (at2)
      return resolveEditorAnchorsAndMentionsAriaHaspopup(
        updateEditorAnchorsAndMentionsCaptureResult3,
        at2,
      );
    editorAnchorsAndMentionsWeakMap2.delete(
      updateEditorAnchorsAndMentionsCaptureResult3,
    );
    editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValues.forEach(
      (
        editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValue?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let priorItem: Dynamic =
          editorAnchorsAndMentionsWeakMap2Entry.prior[index];
        if (priorItem === null) {
          updateEditorAnchorsAndMentionsCaptureResult3.removeAttribute(
            editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValue,
          );
        } else {
          updateEditorAnchorsAndMentionsCaptureResult3.setAttribute(
            editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValue,
            priorItem,
          );
        }
      },
    );
  };
  let expose: Dynamic = (
    element?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!element || !updateEditorAnchorsAndMentionsCapture2.isOpen())
      return resolveEditorAnchorsAndMentionsAriaHaspopup2();
    if (
      updateEditorAnchorsAndMentionsCaptureResult2 &&
      updateEditorAnchorsAndMentionsCaptureResult2 !== element
    ) {
      resolveEditorAnchorsAndMentionsAriaHaspopup2();
    }
    updateEditorAnchorsAndMentionsCaptureResult2 = element;
    let editorAnchorsAndMentionsWeakMap2Entry: Dynamic =
      editorAnchorsAndMentionsWeakMap2.get(element);
    if (!editorAnchorsAndMentionsWeakMap2Entry) {
      editorAnchorsAndMentionsWeakMap2Entry = {
        prior:
          editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValues.map(
            (
              editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValue?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              element.getAttribute(
                editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValue,
              ),
          ),
        holders: new (Map as Dynamic)(),
      };
      editorAnchorsAndMentionsWeakMap2.set(
        element,
        editorAnchorsAndMentionsWeakMap2Entry,
      );
    }
    let closest: Dynamic =
      options?.closest(`[role=listbox]`) ??
      updateEditorAnchorsAndMentionsCapture2.el;
    let record2: Dynamic = {
      controls:
        closest === updateEditorAnchorsAndMentionsCapture2.el
          ? listId
          : `${listId} ${closest.id}`,
      active: options?.id || null,
    };
    editorAnchorsAndMentionsWeakMap2Entry.holders.set(Symbol2, record2);
    if (
      [...editorAnchorsAndMentionsWeakMap2Entry.holders.keys()].at(-1) ===
      Symbol2
    ) {
      resolveEditorAnchorsAndMentionsAriaHaspopup(element, record2);
    }
  };
  let enabled2: boolean = false;
  let signal = (open?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (open) {
      if (updateEditorAnchorsAndMentionsCapture2.anchor) {
        updateEditorAnchorsAndMentionsCaptureResult = null;
        requestAnimationFrame2();
      }
    } else {
      cancelAnimationFrame2();
    }
    if (open === enabled2) return;
    enabled2 = open;
    let CustomEvent2: Dynamic =
      ownerDocument2.defaultView?.CustomEvent ?? CustomEvent;
    ownerDocument2.dispatchEvent(
      new (CustomEvent2 as Dynamic)(EditorAnchorsAndMentionsLfileTypeahead, {
        detail: {
          id: label,
          open: open,
        },
      }),
    );
  };
  return {
    signal: signal,
    detach: (..._extraArguments: unknown[]): undefined => {
      ownerDocument2.removeEventListener(`scroll`, isOpen, {
        capture: true,
      });
      defaultView?.removeEventListener(`resize`, isOpen);
      signal(false);
      resolveEditorAnchorsAndMentionsAriaHaspopup2();
    },
    listId: listId,
    optionId: optionId,
    expose: expose,
  };
}

function installEditorAnchorsAndMentionsMousedown(
  installEditorAnchorsAndMentionsMousedown2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic =
    installEditorAnchorsAndMentionsMousedown2.owner.ownerDocument;
  let contains2: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    installEditorAnchorsAndMentionsMousedown2.editorCanClose() &&
    installEditorAnchorsAndMentionsMousedown2.owner.contains(event.target);
  let close = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let target: Dynamic = event.target;
    if (
      !(
        event.button !== 0 ||
        !installEditorAnchorsAndMentionsMousedown2.isShown() ||
        installEditorAnchorsAndMentionsMousedown2.panels.some(
          (panel?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            panel.contains(target),
        ) ||
        resolveEditorAnchorsAndMentionsDocumentElement(
          ownerDocument2,
          event.clientX,
          event.clientY,
        ) ||
        contains2(event)
      )
    ) {
      installEditorAnchorsAndMentionsMousedown2.close();
    }
  };
  let close2 = (
    installEditorAnchorsAndMentionsMousedown3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        !resolveEditorAnchorsAndMentionsEscape(
          installEditorAnchorsAndMentionsMousedown3,
        ) ||
        !installEditorAnchorsAndMentionsMousedown2.isShown() ||
        contains2(installEditorAnchorsAndMentionsMousedown3)
      )
    ) {
      resolveEditorAnchorsAndMentionsValue3(
        installEditorAnchorsAndMentionsMousedown3,
      );
      installEditorAnchorsAndMentionsMousedown2.close();
    }
  };
  ownerDocument2.addEventListener(`mousedown`, close, true);
  ownerDocument2.addEventListener(`keydown`, close2);
  return (..._extraArguments: unknown[]): undefined => {
    ownerDocument2.removeEventListener(`mousedown`, close, true);
    ownerDocument2.removeEventListener(`keydown`, close2);
  };
}

function isEditorAnchorsAndMentionsKey(
  editorAnchorsAndMentionsKey?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic =
    editorAnchorsAndMentionsKey.panels[0]?.ownerDocument;
  if (!ownerDocument2) return (..._extraArguments: unknown[]): undefined => {};
  let isEditorAnchorsAndMentionsKeyResult: Dynamic = null;
  let rowAt: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let target: Dynamic = event.target;
    let target2: Dynamic =
      target === null
        ? null
        : target.nodeType === 1
          ? target
          : target.parentElement;
    return target2 === null ? null : editorAnchorsAndMentionsKey.rowAt(target2);
  };
  let getBoundingClientRect = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      !event.row.isConnected ||
      editorAnchorsAndMentionsKey.rowAt(event.row)?.key !== event.key
    )
      return true;
    let rowBounds: Dynamic = event.row.getBoundingClientRect();
    let isEditorAnchorsAndMentionsKeyHandler2 = (
      editorAnchorsAndMentionsKey2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Math.abs(
        rowBounds[editorAnchorsAndMentionsKey2] -
          event.box[editorAnchorsAndMentionsKey2],
      ) < 0.5;
    return !(
      isEditorAnchorsAndMentionsKeyHandler2(`top`) &&
      isEditorAnchorsAndMentionsKeyHandler2(`left`) &&
      isEditorAnchorsAndMentionsKeyHandler2(`width`) &&
      isEditorAnchorsAndMentionsKeyHandler2(`height`)
    );
  };
  let getBoundingClientRect2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let rowAt2: Dynamic = rowAt(event);
    if (!rowAt2 || (event.preventDefault(), event.button !== 0)) return;
    if (event.detail === 0 || !(event.buttons & 1)) {
      isEditorAnchorsAndMentionsKeyResult = null;
      rowAt2.pick();
      return;
    }
    let box: Dynamic = rowAt2.row.getBoundingClientRect();
    isEditorAnchorsAndMentionsKeyResult = {
      key: rowAt2.key,
      pick: rowAt2.pick,
      x: event.clientX,
      y: event.clientY,
      row: rowAt2.row,
      box: box,
      panel: event.currentTarget,
    };
  };
  let pick = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let isEditorAnchorsAndMentionsKeyResult2: Dynamic =
      isEditorAnchorsAndMentionsKeyResult;
    isEditorAnchorsAndMentionsKeyResult = null;
    if (isEditorAnchorsAndMentionsKeyResult2 === null || event.button !== 0)
      return;
    let rowAt2: Dynamic = rowAt(event);
    let { clientX: event2, clientY: event3 }: Dynamic = event;
    let matchesHypot =
      Math.hypot(
        event2 - isEditorAnchorsAndMentionsKeyResult2.x,
        event3 - isEditorAnchorsAndMentionsKeyResult2.y,
      ) <= 4;
    let matchesEvent =
      event2 >= isEditorAnchorsAndMentionsKeyResult2.box.left &&
      event2 <= isEditorAnchorsAndMentionsKeyResult2.box.right &&
      event3 >= isEditorAnchorsAndMentionsKeyResult2.box.top &&
      event3 <= isEditorAnchorsAndMentionsKeyResult2.box.bottom;
    let matchesCurrentTarget =
      event.currentTarget === isEditorAnchorsAndMentionsKeyResult2.panel;
    if (
      rowAt2 !== null &&
      rowAt2.key === isEditorAnchorsAndMentionsKeyResult2.key
    ) {
      rowAt2.pick();
    } else {
      if (matchesHypot || matchesEvent) {
        isEditorAnchorsAndMentionsKeyResult2.pick();
      } else {
        if (
          matchesCurrentTarget &&
          !getBoundingClientRect(isEditorAnchorsAndMentionsKeyResult2)
        ) {
          rowAt2?.pick();
        }
      }
    }
  };
  let isEditorAnchorsAndMentionsKeyHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    isEditorAnchorsAndMentionsKeyResult = null;
  };
  for (let isEditorAnchorsAndMentionsKeyResult2 of editorAnchorsAndMentionsKey.panels as Dynamic) {
    isEditorAnchorsAndMentionsKeyResult2.addEventListener(
      `mousedown`,
      getBoundingClientRect2,
    );
    isEditorAnchorsAndMentionsKeyResult2.addEventListener(`mouseup`, pick);
  }
  let defaultView: Dynamic = ownerDocument2.defaultView;
  ownerDocument2.addEventListener(
    `mousedown`,
    isEditorAnchorsAndMentionsKeyHandler,
    true,
  );
  ownerDocument2.addEventListener(
    `mouseup`,
    isEditorAnchorsAndMentionsKeyHandler,
  );
  defaultView?.addEventListener(`blur`, isEditorAnchorsAndMentionsKeyHandler);
  return (..._extraArguments: unknown[]): undefined => {
    for (let isEditorAnchorsAndMentionsKeyResult2 of editorAnchorsAndMentionsKey.panels as Dynamic) {
      isEditorAnchorsAndMentionsKeyResult2.removeEventListener(
        `mousedown`,
        getBoundingClientRect2,
      );
      isEditorAnchorsAndMentionsKeyResult2.removeEventListener(`mouseup`, pick);
    }
    ownerDocument2.removeEventListener(
      `mousedown`,
      isEditorAnchorsAndMentionsKeyHandler,
      true,
    );
    ownerDocument2.removeEventListener(
      `mouseup`,
      isEditorAnchorsAndMentionsKeyHandler,
    );
    defaultView?.removeEventListener(
      `blur`,
      isEditorAnchorsAndMentionsKeyHandler,
    );
  };
}

function resolveEditorAnchorsAndMentionsStyle(
  editorAnchorsAndMentionsStyle?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (editorAnchorsAndMentionsStyle.getElementById(options)) return;
  let element: Dynamic = editorAnchorsAndMentionsStyle.createElement(`style`);
  element.id = options;
  element.textContent = context;
  editorAnchorsAndMentionsStyle.head.appendChild(element);
}

function resolveEditorAnchorsAndMentionsReads(
  editorAnchorsAndMentionsReads?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let uniqueItems3: Dynamic = new (Set as Dynamic)();
  let uniqueItems4: Dynamic = new (Set as Dynamic)();
  for (let resolveEditorAnchorsAndMentionsReadsResult of (editorAnchorsAndMentionsReads ??
    []) as Dynamic) {
    let argItem: Dynamic = resolveEditorAnchorsAndMentionsReadsResult.args?.[0];
    if (
      !argItem ||
      !(`lit` in argItem) ||
      resolveEditorAnchorsAndMentionsReadsResult.method === `chart` ||
      resolveEditorAnchorsAndMentionsReadsResult.method !== `sources`
    )
      continue;
    let lit2: Dynamic = argItem.lit;
    if (!(!lit2 || typeof lit2 != `object`)) {
      if (lit2.type === `read` && typeof lit2.ref == `string`) {
        uniqueItems.add(lit2.ref);
      }
    }
  }
  return {
    reads: [...uniqueItems],
    writes: [...uniqueItems2],
    creates: [...uniqueItems3],
    libs: [...uniqueItems4],
  };
}

function resolveEditorAnchorsAndMentionsValue7(
  editorAnchorsAndMentionsValue7?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return [];
}

function resolveEditorAnchorsAndMentionsMetadata(
  editorAnchorsAndMentionsMetadata?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveEditorAnchorsAndMentionsMetadataResult of (editorAnchorsAndMentionsMetadata ??
    []) as Dynamic) {
    if (resolveEditorAnchorsAndMentionsMetadataResult.method !== `chart`)
      continue;
    let [args, setArgs]: Dynamic =
      resolveEditorAnchorsAndMentionsMetadataResult.args ?? [];
    if (
      !(
        !args ||
        !(`lit` in args) ||
        typeof args.lit != `string` ||
        !setArgs ||
        !(`lit` in setArgs) ||
        !setArgs.lit ||
        typeof setArgs.lit != `object`
      )
    ) {
      items.push({
        id: args.lit,
        metadata: setArgs.lit,
      });
    }
  }
  return items;
}

function resolveEditorAnchorsAndMentionsKind(
  editorAnchorsAndMentionsKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorAnchorsAndMentionsKindParts: Dynamic =
    editorAnchorsAndMentionsKind.split(`#`);
  if (
    editorAnchorsAndMentionsKindParts.length > 2 ||
    (editorAnchorsAndMentionsKindParts.length === 2 &&
      !editorAnchorsAndMentionsKindParts[1])
  )
    return null;
  let editorAnchorsAndMentionsKindPartItemParts: Dynamic =
    editorAnchorsAndMentionsKindParts[0].split(`/`);
  if (
    editorAnchorsAndMentionsKindPartItemParts.length < 2 ||
    !editorAnchorsAndMentionsKindPartItemParts.every(
      (
        editorAnchorsAndMentionsKindPartItemPart?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        /^[A-Za-z0-9_-]{1,128}$/.test(editorAnchorsAndMentionsKindPartItemPart),
    )
  )
    return null;
  let frag: Dynamic = editorAnchorsAndMentionsKindParts[1] ?? null;
  return frag !== null &&
    !frag
      .split(`/`)
      .every((fragPart?: Dynamic, ..._extraArguments: unknown[]) =>
        /^[A-Za-z0-9_-]{1,128}$/.test(fragPart),
      )
    ? null
    : {
        kind: editorAnchorsAndMentionsKindPartItemParts[0],
        id: editorAnchorsAndMentionsKindPartItemParts.slice(1).join(`/`),
        frag: frag,
      };
}

var resolveEditorAnchorsAndMentionsSplit: Dynamic;

var editorAnchorsAndMentionsPattern: RegExp;

var EditorAnchorsAndMentionsStyles: string;

var EditorAnchorsAndMentionsSlice: string;

var EditorAnchorsAndMentionsState4: RegExp;

var EditorAnchorsAndMentionsState5: RegExp;

var EditorAnchorsAndMentionsState6: RegExp;

var EditorAnchorsAndMentionsState7: RegExp;

var EditorAnchorsAndMentionsState8: RegExp;

var EditorAnchorsAndMentionsState9: RegExp;

function resolveEditorAnchorsAndMentionsRoutines(
  editorAnchorsAndMentionsRoutines?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorAnchorsAndMentionsRoutines) return null;
  if (EditorAnchorsAndMentionsState4.test(editorAnchorsAndMentionsRoutines))
    return editorAnchorsAndMentionsRoutines;
  if (EditorAnchorsAndMentionsState5.test(editorAnchorsAndMentionsRoutines))
    return `run:${editorAnchorsAndMentionsRoutines}`;
  let match = EditorAnchorsAndMentionsState6.exec(
    editorAnchorsAndMentionsRoutines,
  );
  if (match) return `run:${match[1]}`;
  let match2 = EditorAnchorsAndMentionsState7.exec(
    editorAnchorsAndMentionsRoutines,
  );
  if (match2) return `routine:${match2[1]}`;
  let editorAnchorsAndMentionsKind: Dynamic =
    resolveEditorAnchorsAndMentionsKind(editorAnchorsAndMentionsRoutines);
  return editorAnchorsAndMentionsKind &&
    (editorAnchorsAndMentionsKind.kind === `routines` ||
      editorAnchorsAndMentionsKind.kind === `routine`) &&
    EditorAnchorsAndMentionsState8.test(editorAnchorsAndMentionsKind.id)
    ? `routine:${editorAnchorsAndMentionsKind.id}`
    : editorAnchorsAndMentionsKind &&
        (editorAnchorsAndMentionsKind.kind === `tables` ||
          editorAnchorsAndMentionsKind.kind === `table` ||
          editorAnchorsAndMentionsKind.kind === `topics`) &&
        EditorAnchorsAndMentionsState8.test(editorAnchorsAndMentionsKind.id)
      ? `table:${editorAnchorsAndMentionsKind.id}`
      : EditorAnchorsAndMentionsState9.test(editorAnchorsAndMentionsRoutines)
        ? editorAnchorsAndMentionsRoutines
        : null;
}

var editorAnchorsAndMentionsPattern2: RegExp;

var editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValues: string[];

function resolveEditorAnchorsAndMentionsNames(
  editorAnchorsAndMentionsNames?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  for (let resolveEditorAnchorsAndMentionsNamesResult of (editorAnchorsAndMentionsNames ??
    []) as Dynamic)
    if (
      (resolveEditorAnchorsAndMentionsNamesResult.dynamic
        ? uniqueItems2.add(resolveEditorAnchorsAndMentionsNamesResult.static)
        : uniqueItems.add(resolveEditorAnchorsAndMentionsNamesResult.static),
      uniqueItems.size + uniqueItems2.size >= 512)
    )
      break;
  return {
    names: [...uniqueItems],
    prefixes: [...uniqueItems2],
  };
}

function resolveEditorAnchorsAndMentionsIncludes(
  editorAnchorsAndMentionsIncludes?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    editorAnchorsAndMentionsIncludes.names.includes(options) ||
    editorAnchorsAndMentionsIncludes.prefixes.some(
      (prefixe?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        options.startsWith(prefixe),
    )
  );
}

var EditorAnchorsAndMentionsSlice2: RegExp;

function resolveEditorAnchorsAndMentionsNode(
  editorAnchorsAndMentionsNode?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = EditorAnchorsAndMentionsSlice2.exec(editorAnchorsAndMentionsNode);
  return match
    ? {
        node: match[1],
        element: match[2],
      }
    : null;
}

function resolveEditorAnchorsAndMentionsValue8(
  editorAnchorsAndMentionsValue8?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${editorAnchorsAndMentionsValue8}.${options}`;
}

var editorAnchorsAndMentionsPattern3: RegExp;

function resolveEditorAnchorsAndMentionsValue9(
  values?: Dynamic,
  note?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    value: {
      values: values,
      ...(note
        ? {
            note: note,
          }
        : {}),
    },
    columns: null,
    run: null,
    at: null,
  };
}

var editorAnchorsAndMentionsPattern4: RegExp;

var EditorAnchorsAndMentionsState10: string;

var EditorAnchorsAndMentionsState11: RegExp;

function isEditorAnchorsAndMentionsKind(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || !items || items.length > 512) return null;
  let match = editorAnchorsAndMentionsPattern4.exec(items);
  if (match)
    return {
      kind: `node`,
      id: match[1],
    };
  let platformSessionAndSourcesNode: Dynamic =
    resolvePlatformSessionAndSourcesNode(items);
  if (platformSessionAndSourcesNode !== undefined)
    return {
      kind: `node`,
      id: platformSessionAndSourcesNode,
    };
  let editorAnchorsAndMentionsKind: Dynamic =
    resolveEditorAnchorsAndMentionsKind(
      items.includes(`:`) ? items.slice(0, items.lastIndexOf(`:`)) : items,
    );
  if (!editorAnchorsAndMentionsKind) return null;
  if (editorAnchorsAndMentionsKind.kind === `tables`)
    return editorAnchorsAndMentionsKind.frag !== null ||
      editorAnchorsAndMentionsKind.id.includes(`/`)
      ? null
      : {
          kind: `table`,
          ref: items,
          id: editorAnchorsAndMentionsKind.id,
        };
  if (editorAnchorsAndMentionsKind.kind === `files`) {
    let itemsPartItem = items.split(`#`)[1] ?? ``;
    let match2 = EditorAnchorsAndMentionsState11.exec(itemsPartItem);
    return !match2 || editorAnchorsAndMentionsKind.id.includes(`/`)
      ? null
      : {
          kind: `xlsx`,
          ref: items,
          fileId: editorAnchorsAndMentionsKind.id,
          sheet: match2[1],
          range: match2[2],
        };
  }
  return null;
}

var EditorAnchorsAndMentionsState12: string;

var editorAnchorsAndMentionsPattern5: RegExp;

var editorAnchorsAndMentionsPattern6: RegExp;

var editorAnchorsAndMentionsPattern7: RegExp;

function resolveEditorAnchorsAndMentionsOther(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof items != `string` || items.length === 0
    ? `other`
    : editorAnchorsAndMentionsPattern5.test(items)
      ? `platform`
      : editorAnchorsAndMentionsPattern7.test(items)
        ? `account`
        : editorAnchorsAndMentionsPattern6.test(items)
          ? `pseudonym`
          : items.includes(`@`) &&
              !items.startsWith(`@`) &&
              !items.endsWith(`@`)
            ? `email`
            : `other`;
}

var EditorAnchorsAndMentionsSomeone: string;

var EditorAnchorsAndMentionsMessage: string;

var resolveEditorAnchorsAndMentionsPlatform: Dynamic;

function resolveEditorAnchorsAndMentionsEmail(
  editorAnchorsAndMentionsEmail?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (resolveEditorAnchorsAndMentionsOther(editorAnchorsAndMentionsEmail)) {
    case `email`:
      return resolvePlatformSessionAndSourcesValue(
        editorAnchorsAndMentionsEmail,
      );
    case `platform`:
    case `account`:
      return options !== undefined && options !== ``
        ? options
        : EditorAnchorsAndMentionsSomeone;
    case `pseudonym`:
    case `other`:
      return EditorAnchorsAndMentionsSomeone;
  }
}

var resolveEditorAnchorsAndMentionsEmail2: Dynamic;

var EditorAnchorsAndMentionsSlice3: string;

var EditorAnchorsAndMentionsStyles2: string;

var EditorAnchorsAndMentionsStyles3: string;

var EditorAnchorsAndMentionsStyles4: string;

var EditorAnchorsAndMentionsStyles5: string;

var EditorAnchorsAndMentionsState13: string;

var EditorAnchorsAndMentionsJoin: string;

var EditorAnchorsAndMentionsState14: string;

var EditorAnchorsAndMentionsState15: RegExp;

var EditorAnchorsAndMentionsState16: RegExp;

var EditorAnchorsAndMentionsState17: RegExp;

var EditorAnchorsAndMentionsState18: RegExp;

var EditorAnchorsAndMentionsState19: RegExp;

var EditorAnchorsAndMentionsState20: RegExp;

var editorAnchorsAndMentionsPattern8: RegExp;

var EditorAnchorsAndMentionsState21: RegExp;

var EditorAnchorsAndMentionsState22: RegExp;

var EditorAnchorsAndMentionsState23: RegExp;

function resolveEditorAnchorsAndMentionsRef(
  editorAnchorsAndMentionsRef?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = EditorAnchorsAndMentionsState16.exec(editorAnchorsAndMentionsRef);
  if (match)
    return {
      ref: `run/${match[1]}`,
      kind: `run`,
    };
  let match2 = EditorAnchorsAndMentionsState17.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match2)
    return {
      ref: `table/${match2[1] ?? match2[2] ?? match2[3]}`,
      kind: `table`,
    };
  let match3 = EditorAnchorsAndMentionsState18.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match3)
    return {
      ref: `routine/${match3[1] ?? match3[2] ?? match3[3]}`,
      kind: `routine`,
    };
  if (EditorAnchorsAndMentionsState19.test(editorAnchorsAndMentionsRef))
    return {
      ref: editorAnchorsAndMentionsRef,
      kind: `user`,
    };
  let match4 = EditorAnchorsAndMentionsState20.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match4)
    return {
      ref: `file/${match4[1]}${match4[2] ?? ``}`,
      kind: `file`,
    };
  if (editorAnchorsAndMentionsPattern8.test(editorAnchorsAndMentionsRef))
    return {
      ref: editorAnchorsAndMentionsRef,
      kind: `node`,
    };
  let match5 = EditorAnchorsAndMentionsState21.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match5)
    return {
      ref: `database/${match5[1]}`,
      kind: `database`,
    };
  let match6 = EditorAnchorsAndMentionsState22.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match6)
    return {
      ref: `project/${match6[1]}`,
      kind: `project`,
    };
  let match7 = EditorAnchorsAndMentionsState23.exec(
    editorAnchorsAndMentionsRef,
  );
  if (match7) {
    let [
      ,
      setMatch,
      match8,
      match9,
      match10,
      match11,
      match12,
      match13,
    ]: Dynamic = match7;
    return match8
      ? {
          ref: `project/${setMatch}/file/${match8}${match9 ?? ``}`,
          kind: `file`,
        }
      : match10
        ? {
            ref: `project/${setMatch}/run/${match10}`,
            kind: `run`,
          }
        : match11
          ? {
              ref: `project/${setMatch}/table/${match11}`,
              kind: `table`,
            }
          : match13
            ? {
                ref: `project/${setMatch}/database/${match13}`,
                kind: `database`,
              }
            : {
                ref: `project/${setMatch}/routine/${match12}`,
                kind: `routine`,
              };
  }
  return null;
}

function resolveEditorAnchorsAndMentionsStartsWith(
  editorAnchorsAndMentionsStarts?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options === undefined || options === ``)
    return editorAnchorsAndMentionsStarts;
  let label = `project/${options}/`;
  return editorAnchorsAndMentionsStarts.startsWith(label)
    ? editorAnchorsAndMentionsStarts.slice(label.length)
    : editorAnchorsAndMentionsStarts;
}

function resolveEditorAnchorsAndMentionsProject(
  editorAnchorsAndMentionsProject?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorAnchorsAndMentionsRef: Dynamic = resolveEditorAnchorsAndMentionsRef(
    editorAnchorsAndMentionsProject,
  );
  return editorAnchorsAndMentionsRef === null
    ? null
    : editorAnchorsAndMentionsRef.kind === `project`
      ? `<container:${editorAnchorsAndMentionsRef.ref}>`
      : `<ref:${editorAnchorsAndMentionsRef.ref}>`;
}

function resolveEditorAnchorsAndMentionsValue10(
  editorAnchorsAndMentionsValue10?: Dynamic,
  ..._extraArguments: unknown[]
): null | string {
  return (
    resolveEditorAnchorsAndMentionsRef(editorAnchorsAndMentionsValue10)?.kind ??
    null
  );
}

var EditorAnchorsAndMentionsRun: Dynamic;

var EditorAnchorsAndMentionsState24: RegExp;

var EditorAnchorsAndMentionsState25: RegExp;

function resolveEditorAnchorsAndMentionsRef2(
  editorAnchorsAndMentionsRef2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorAnchorsAndMentionsRef2Index: Dynamic =
    editorAnchorsAndMentionsRef2.indexOf(`#`);
  let editorAnchorsAndMentionsRef2Slice: Dynamic =
    editorAnchorsAndMentionsRef2Index >= 0
      ? editorAnchorsAndMentionsRef2.slice(0, editorAnchorsAndMentionsRef2Index)
      : editorAnchorsAndMentionsRef2;
  let editorAnchorsAndMentionsRef2Slice2: Dynamic =
    editorAnchorsAndMentionsRef2Index >= 0
      ? editorAnchorsAndMentionsRef2.slice(
          editorAnchorsAndMentionsRef2Index + 1,
        )
      : undefined;
  if (editorAnchorsAndMentionsRef2Slice2 === ``) return null;
  let editorAnchorsAndMentionsRef2SliceParts: Dynamic =
    editorAnchorsAndMentionsRef2Slice.split(`/`);
  if (editorAnchorsAndMentionsRef2SliceParts.length === 2) {
    let [
      editorAnchorsAndMentionsRef2SliceParts5,
      setEditorAnchorsAndMentionsRef2SliceParts2,
    ]: Dynamic = editorAnchorsAndMentionsRef2SliceParts;
    if (editorAnchorsAndMentionsRef2SliceParts5 === `project`) {
      if (editorAnchorsAndMentionsRef2Slice2 !== undefined) return null;
      let setEditorAnchorsAndMentionsRef2SlicePartsSlice2: Dynamic =
        setEditorAnchorsAndMentionsRef2SliceParts2.includes(`@`)
          ? setEditorAnchorsAndMentionsRef2SliceParts2.slice(
              0,
              setEditorAnchorsAndMentionsRef2SliceParts2.indexOf(`@`),
            )
          : setEditorAnchorsAndMentionsRef2SliceParts2;
      return EditorAnchorsAndMentionsState24.test(
        setEditorAnchorsAndMentionsRef2SlicePartsSlice2,
      )
        ? {
            ref: `project/${setEditorAnchorsAndMentionsRef2SlicePartsSlice2}`,
            kind: `project`,
          }
        : null;
    }
    return editorAnchorsAndMentionsRef2SliceParts5 === `suite`
      ? null
      : resolveEditorAnchorsAndMentionsRef(editorAnchorsAndMentionsRef2);
  }
  if (editorAnchorsAndMentionsRef2SliceParts.length !== 4) return null;
  let [
    editorAnchorsAndMentionsRef2SliceParts2,
    setEditorAnchorsAndMentionsRef2SliceParts,
    editorAnchorsAndMentionsRef2SliceParts3,
    editorAnchorsAndMentionsRef2SliceParts4,
  ]: Dynamic = editorAnchorsAndMentionsRef2SliceParts;
  if (
    (editorAnchorsAndMentionsRef2SliceParts2 !== `project` &&
      editorAnchorsAndMentionsRef2SliceParts2 !== `suite`) ||
    setEditorAnchorsAndMentionsRef2SliceParts === `` ||
    editorAnchorsAndMentionsRef2SliceParts4 === ``
  )
    return null;
  let kind: Dynamic = Object.hasOwn(
    EditorAnchorsAndMentionsRun,
    editorAnchorsAndMentionsRef2SliceParts3,
  )
    ? EditorAnchorsAndMentionsRun[editorAnchorsAndMentionsRef2SliceParts3]
    : undefined;
  if (kind === undefined) return null;
  let setEditorAnchorsAndMentionsRef2SlicePartsSlice: Dynamic =
    setEditorAnchorsAndMentionsRef2SliceParts.includes(`@`)
      ? setEditorAnchorsAndMentionsRef2SliceParts.slice(
          0,
          setEditorAnchorsAndMentionsRef2SliceParts.indexOf(`@`),
        )
      : setEditorAnchorsAndMentionsRef2SliceParts;
  let label: string =
    editorAnchorsAndMentionsRef2SliceParts2 === `project` &&
    EditorAnchorsAndMentionsState24.test(
      setEditorAnchorsAndMentionsRef2SlicePartsSlice,
    )
      ? `project/${setEditorAnchorsAndMentionsRef2SlicePartsSlice}/`
      : ``;
  return editorAnchorsAndMentionsRef2SliceParts2 === `project` && label === ``
    ? null
    : kind === `run`
      ? editorAnchorsAndMentionsPattern.test(
          editorAnchorsAndMentionsRef2SliceParts4,
        )
        ? {
            ref: `${label}run/${editorAnchorsAndMentionsRef2SliceParts4}`,
            kind: kind,
          }
        : null
      : EditorAnchorsAndMentionsState24.test(
            editorAnchorsAndMentionsRef2SliceParts4,
          )
        ? kind === `file` &&
          editorAnchorsAndMentionsRef2Slice2 !== undefined &&
          EditorAnchorsAndMentionsState25.test(
            editorAnchorsAndMentionsRef2Slice2,
          )
          ? {
              ref: `${label}file/${editorAnchorsAndMentionsRef2SliceParts4}#${editorAnchorsAndMentionsRef2Slice2}`,
              kind: kind,
            }
          : {
              ref: `${label}${kind}/${editorAnchorsAndMentionsRef2SliceParts4}`,
              kind: kind,
            }
        : null;
}

function resolveEditorAnchorsAndMentionsRef3(
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let count: number = 0;
  EditorAnchorsAndMentionsState15.lastIndex = 0;
  for (
    let match: Dynamic = EditorAnchorsAndMentionsState15.exec(text);
    match;
    match = EditorAnchorsAndMentionsState15.exec(text)
  ) {
    let [match2, setMatch, match3, match4, match5, match6]: Dynamic = match;
    let resolveEditorAnchorsAndMentionsRef3Result: Dynamic;
    if (setMatch === `mention` && match3)
      resolveEditorAnchorsAndMentionsRef3Result = {
        type: `chip`,
        ref: `users/${match3}`,
        label: resolveEditorAnchorsAndMentionsPlatform(match3)
          ? null
          : (match3.split(`@`)[0] ?? null),
        kind: `user`,
      };
    else if ((setMatch === `claude` || setMatch === `ref`) && match3) {
      let editorAnchorsAndMentionsRef2: Dynamic =
        resolveEditorAnchorsAndMentionsRef2(match3);
      if (editorAnchorsAndMentionsRef2) {
        resolveEditorAnchorsAndMentionsRef3Result = {
          type: `chip`,
          ...editorAnchorsAndMentionsRef2,
          label: null,
        };
      }
    } else if (setMatch === `container` && match3) {
      let editorAnchorsAndMentionsRef: Dynamic =
        resolveEditorAnchorsAndMentionsRef(match3);
      if (
        editorAnchorsAndMentionsRef &&
        editorAnchorsAndMentionsRef.kind === `project` &&
        !match3.includes(`#`)
      ) {
        resolveEditorAnchorsAndMentionsRef3Result = {
          type: `chip`,
          ref: editorAnchorsAndMentionsRef.ref,
          label: null,
          kind: `project`,
        };
      }
    } else {
      let match7: Dynamic = match4 ?? match6;
      let editorAnchorsAndMentionsRef: Dynamic = match7
        ? resolveEditorAnchorsAndMentionsRef(match7)
        : null;
      if (editorAnchorsAndMentionsRef) {
        resolveEditorAnchorsAndMentionsRef3Result = {
          type: `chip`,
          ref: editorAnchorsAndMentionsRef.ref,
          label: match4 ? (match5 ?? null) : null,
          kind: editorAnchorsAndMentionsRef.kind,
        };
      }
    }
    if (resolveEditorAnchorsAndMentionsRef3Result) {
      if (match.index > count) {
        items.push({
          type: `text`,
          text: text.slice(count, match.index),
        });
      }
      items.push(resolveEditorAnchorsAndMentionsRef3Result);
      count = match.index + match2.length;
    }
  }
  if (count < text.length) {
    items.push({
      type: `text`,
      text: text.slice(count),
    });
  }
  return items.length
    ? items
    : [
        {
          type: `text`,
          text: text,
        },
      ];
}

function resolveEditorAnchorsAndMentionsText(
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let count: number = 0;
  EditorAnchorsAndMentionsState15.lastIndex = 0;
  for (
    let match: Dynamic = EditorAnchorsAndMentionsState15.exec(text);
    match;
    match = EditorAnchorsAndMentionsState15.exec(text)
  ) {
    let [match2, setMatch, match3]: Dynamic = match;
    if ((setMatch !== `ref` && setMatch !== `container`) || !match3) continue;
    let kind: Dynamic = resolveEditorAnchorsAndMentionsValue10(match3);
    if (!(kind !== `file` && kind !== `project`)) {
      if (resolveEditorAnchorsAndMentionsProject(match3) === match2) {
        if (match.index > count) {
          items.push({
            type: `text`,
            text: text.slice(count, match.index),
          });
        }
        items.push({
          type: `ref`,
          ref: match3,
          kind: kind,
        });
        count = match.index + match2.length;
      }
    }
  }
  if (count < text.length) {
    items.push({
      type: `text`,
      text: text.slice(count),
    });
  }
  return items.length
    ? items
    : [
        {
          type: `text`,
          text: text,
        },
      ];
}

var EditorAnchorsAndMentions00100100: string;

var EditorAnchorsAndMentionsMessage2: string;

var resolveEditorAnchorsAndMentionsReplaceAll: Dynamic;

var isEditorAnchorsAndMentionsTextPlain: Dynamic;

var EditorAnchorsAndMentionsState26: string;

function installEditorAnchorsAndMentionsOnce(
  contributor?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let element = document.createElement(`span`);
  element.className = `av`;
  element.setAttribute(`aria-hidden`, `true`);
  if (contributor.id === `claude` || contributor.id.startsWith(`cw:`)) {
    element.classList.add(`claude`);
    element.innerHTML = EditorAnchorsAndMentionsState26;
    return element;
  }
  let handle: Dynamic = contributor.handle ?? contributor.id;
  element.style.background =
    resolveEditorAnchorsAndMentionsValue(
      contributor.email,
      handle || contributor.label,
    ) ?? editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values[0];
  element.textContent = (
    contributor.label[0] ??
    handle[0] ??
    `?`
  ).toUpperCase();
  let photoData: Dynamic = contributor.photoData ?? contributor.photoUrl;
  if (photoData) {
    let element2 = document.createElement(`img`);
    element2.src = photoData;
    element2.alt = ``;
    element2.loading = `lazy`;
    element2.referrerPolicy = `no-referrer`;
    element2.addEventListener(
      `error`,
      (..._extraArguments: unknown[]) => element2.remove(),
      {
        once: true,
      },
    );
    element.append(element2);
  }
  return element;
}

var resolveEditorAnchorsAndMentionsLabel: (editorAnchorsAndMentionsLabel?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var editorAnchorsAndMentionsPattern9: RegExp;

var resolveEditorAnchorsAndMentionsTest: Dynamic;

var resolveEditorAnchorsAndMentionsValue11: (editorAnchorsAndMentionsValue11?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveEditorAnchorsAndMentionsValue12(
  editorAnchorsAndMentionsValue12?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return options &&
    resolveEditorAnchorsAndMentionsTest(editorAnchorsAndMentionsValue12.id)
    ? resolveEditorAnchorsAndMentionsValue11(editorAnchorsAndMentionsValue12.id)
    : resolveEditorAnchorsAndMentionsLabel(editorAnchorsAndMentionsValue12);
}

var editorAnchorsAndMentionsPattern10: RegExp;

function collectEditorAnchorsAndMentionsText(
  collectEditorAnchorsAndMentionsText2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dependencies2: Dynamic = (
    collectEditorAnchorsAndMentionsText3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    let slice = (text?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!options)
        return void items.push({
          type: `text`,
          text: text,
        });
      let count: number = 0;
      for (let collectEditorAnchorsAndMentionsTextResult of text.matchAll(
        editorAnchorsAndMentionsPattern10,
      ) as Dynamic) {
        if (collectEditorAnchorsAndMentionsTextResult.index > count) {
          items.push({
            type: `text`,
            text: text.slice(
              count,
              collectEditorAnchorsAndMentionsTextResult.index,
            ),
          });
        }
        let collectEditorAnchorsAndMentionsTextResultItem: Dynamic =
          collectEditorAnchorsAndMentionsTextResult[1];
        items.push({
          type: `mention`,
          attrs: {
            id: collectEditorAnchorsAndMentionsTextResultItem,
            label: context(collectEditorAnchorsAndMentionsTextResultItem),
          },
        });
        count =
          collectEditorAnchorsAndMentionsTextResult.index +
          collectEditorAnchorsAndMentionsTextResult[0].length;
      }
      if (count < text.length) {
        items.push({
          type: `text`,
          text: text.slice(count),
        });
      }
    };
    for (let entry of resolveEditorAnchorsAndMentionsText(
      collectEditorAnchorsAndMentionsText3,
    ) as Dynamic)
      if (entry.type === `text`) {
        slice(entry.text);
      } else {
        items.push({
          type: EditorAnchorsAndMentionsRefchip,
          attrs: {
            ref: entry.ref,
            label: dependencies(entry.ref, entry.kind),
          },
        });
      }
    return items;
  };
  return {
    type: `doc`,
    content: collectEditorAnchorsAndMentionsText2
      .split(
        `
`,
      )
      .map(
        (
          rolldownNImportPart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          rolldownNImportPart
            ? {
                type: `paragraph`,
                content: dependencies2(rolldownNImportPart),
              }
            : {
                type: `paragraph`,
              },
      ),
  };
}

function resolveEditorAnchorsAndMentionsBoundaryMarker(
  result?: Dynamic,
  options: Dynamic = {
    boundaryMarker: true,
  },
  ..._extraArguments: unknown[]
): Dynamic {
  return Node2.create({
    name: `mention`,
    group: `inline`,
    inline: true,
    atom: true,
    selectable: false,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        id: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => element.getAttribute(`data-mention-id`),
          renderHTML: (
            editorAnchorsAndMentionsBoundaryMarker?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorAnchorsAndMentionsBoundaryMarker.id
              ? {
                  "data-mention-id": editorAnchorsAndMentionsBoundaryMarker.id,
                }
              : {},
        },
        label: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => element.getAttribute(`data-mention-label`),
          renderHTML: (
            editorAnchorsAndMentionsBoundaryMarker?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorAnchorsAndMentionsBoundaryMarker.label
              ? {
                  "data-mention-label":
                    editorAnchorsAndMentionsBoundaryMarker.label,
                }
              : {},
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `span.${result}[data-mention-id]`,
        },
      ];
    },
    renderText({ node: node }: Dynamic, ..._extraArguments: unknown[]) {
      return resolveEditorAnchorsAndMentionsLabel(
        node.attrs,
        options.boundaryMarker,
      );
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        `span`,
        mergeAttributes(HTMLAttributes, {
          class: result,
        }),
        `@${resolveEditorExtensionsJoin(String(node.attrs.label ?? node.attrs.id))}`,
      ];
    },
  });
}

var EditorAnchorsAndMentionsRefchip: string;

var resolveEditorAnchorsAndMentionsValue13: Dynamic;

function resolveEditorAnchorsAndMentionsGroup(
  result?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Node2.create({
    name: EditorAnchorsAndMentionsRefchip,
    group: `inline`,
    inline: true,
    atom: true,
    selectable: false,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        ref: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => element.getAttribute(`data-ref`),
          renderHTML: (
            editorAnchorsAndMentionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorAnchorsAndMentionsGroup.ref
              ? {
                  "data-ref": editorAnchorsAndMentionsGroup.ref,
                }
              : {},
        },
        label: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => element.getAttribute(`data-ref-label`),
          renderHTML: (
            editorAnchorsAndMentionsGroup?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorAnchorsAndMentionsGroup.label
              ? {
                  "data-ref-label": editorAnchorsAndMentionsGroup.label,
                }
              : {},
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]): Dynamic {
      return [
        {
          tag: `span.${result}[data-ref]`,
          getAttrs: (element?: Dynamic, ..._extraArguments: unknown[]) =>
            resolveEditorAnchorsAndMentionsValue10(
              element.getAttribute(`data-ref`) ?? ``,
            ) === null
              ? false
              : null,
        },
      ];
    },
    renderText(
      { node: node }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolveEditorAnchorsAndMentionsValue13(node.attrs);
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let text = String(node.attrs.ref ?? ``);
      return [
        `span`,
        mergeAttributes(HTMLAttributes, {
          class: result,
          "data-ref-chip": resolveEditorAnchorsAndMentionsValue10(text) ?? ``,
        }),
        resolveEditorExtensionsJoin(String(node.attrs.label ?? text)),
      ];
    },
  });
}

var EditorAnchorsAndMentionsLabel: {
    id: string;
    label: string;
};

var EditorAnchorsAndMentionsLabel2: {
    id: string;
    label: string;
};

var resolveEditorAnchorsAndMentionsSpan: (contributor?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function isEditorAnchorsAndMentionsBottom(
  editorAnchorsAndMentionsBottom?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let isEditorAnchorsAndMentionsBottomHandler: Dynamic = (
    editorAnchorsAndMentionsBottom2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (context2 - editorAnchorsAndMentionsBottom2) *
      (editorAnchorsAndMentionsBottom.y - options2) -
    (dependencies - options2) *
      (editorAnchorsAndMentionsBottom.x - editorAnchorsAndMentionsBottom2);
  let isEditorAnchorsAndMentionsBottomHandler2: Dynamic =
    isEditorAnchorsAndMentionsBottomHandler(
      options.x,
      options.y,
      context.x,
      context.top,
    );
  let isEditorAnchorsAndMentionsBottomHandler3: Dynamic =
    isEditorAnchorsAndMentionsBottomHandler(
      context.x,
      context.top,
      context.x,
      context.bottom,
    );
  let isEditorAnchorsAndMentionsBottomHandler4: Dynamic =
    isEditorAnchorsAndMentionsBottomHandler(
      context.x,
      context.bottom,
      options.x,
      options.y,
    );
  return !(
    (isEditorAnchorsAndMentionsBottomHandler2 < 0 ||
      isEditorAnchorsAndMentionsBottomHandler3 < 0 ||
      isEditorAnchorsAndMentionsBottomHandler4 < 0) &&
    (isEditorAnchorsAndMentionsBottomHandler2 > 0 ||
      isEditorAnchorsAndMentionsBottomHandler3 > 0 ||
      isEditorAnchorsAndMentionsBottomHandler4 > 0)
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorAnchorsAndMentions1Step1(): void {
  (EditorAnchorsAndMentionsMaster16 = {
    name: `CaretRight`,
    master16: [
      {
        d: `M6 3.5L10.5 8L6 12.5`,
      },
    ],
    master20: [
      {
        d: `M7 16.499L13.5 10L7 3.499`,
      },
    ],
  });
  (editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values = [
    `#D97757`,
    `#6A9BCC`,
    `#788C5D`,
    `#C46686`,
    `#B8A23F`,
    `#7D6BB3`,
  ]);
  (EditorAnchorsAndMentionsHttpWwwW3Org2000Svg = `http://www.w3.org/2000/svg`);
  (editorAnchorsAndMentionsValue0_4 = 0.4);
  (EditorAnchorsAndMentionsDataAnthropiconLayer = `data-anthropicon-layer`);
  (EditorAnchorsAndMentionsAnthropiconLayerCss = `anthropicon-layer-css`);
  (EditorAnchorsAndMentionsState = `[${EditorAnchorsAndMentionsDataAnthropiconLayer}=secondary]{opacity:var(--cds-opacity-icon-secondary,${editorAnchorsAndMentionsValue0_4})}@media (forced-colors:active){[${EditorAnchorsAndMentionsDataAnthropiconLayer}=secondary]{opacity:1}}`);
  (filterEditorAnchorsAndMentionsSecondary = (
    filterEditorAnchorsAndMentionsSecondary2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    secondary: filterEditorAnchorsAndMentionsSecondary2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.tone === `secondary`,
    ),
    main: filterEditorAnchorsAndMentionsSecondary2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.tone !== `secondary`,
    ),
  }));
  (EditorAnchorsAndMentionsState2 = [
    [12, 0.8],
    [16, 1],
    [20, 1.2],
    [24, 1.4],
    [28, 1.6],
    [32, 1.8],
  ]);
  (editorAnchorsAndMentionsWeakSet = new (WeakSet as Dynamic)());
  (EditorAnchorsAndMentionsApply = Reflect.apply);
  (EditorAnchorsAndMentionsPrototype = WeakSet.prototype.add);
  WeakSet.prototype.has;
  (EditorAnchorsAndMentionsGetOwnPropertyDescriptor = typeof KeyboardEvent === "undefined"
      ? undefined
      : Object.getOwnPropertyDescriptor(KeyboardEvent.prototype, `key`)?.get);
  (editorAnchorsAndMentionsWeakMap = new (WeakMap as Dynamic)());
  (EditorAnchorsAndMentionsState3 = null);
  (EditorAnchorsAndMentionsLfileTypeahead = `lfile-typeahead`);
  (editorAnchorsAndMentionsValue0 = 0);
  (editorAnchorsAndMentionsValue4 = 4);
  (editorAnchorsAndMentionsValue42 = 4);
  (editorAnchorsAndMentionsValue40 = 40);
  (editorAnchorsAndMentionsAriaActivedescendantAriaControlsAriaHaspopupAriaAutocompleteValues = [
      `aria-activedescendant`,
      `aria-controls`,
      `aria-haspopup`,
      `aria-autocomplete`,
    ]);
  (editorAnchorsAndMentionsWeakMap2 = new (WeakMap as Dynamic)());
  (resolveEditorAnchorsAndMentionsJoin = (
    editorAnchorsAndMentionsJoin?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Array.from<Dynamic>(
      editorAnchorsAndMentionsJoin.replace(/[^\p{L}\p{N}_-]/gu, `_`),
    )
      .slice(0, 40)
      .join(``));
  (resolveEditorAnchorsAndMentionsSplit = (
    editorAnchorsAndMentionsSplit?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorAnchorsAndMentionsSplitPartItemParts: Dynamic =
      editorAnchorsAndMentionsSplit.split(`#`)[0].split(`/`);
    return (
      editorAnchorsAndMentionsSplitPartItemParts[0] === `run` &&
      editorAnchorsAndMentionsSplitPartItemParts.length === 2
    );
  });
  (editorAnchorsAndMentionsPattern = /^r-[a-z0-9]+-[a-z0-9]{4,32}$/);
  (EditorAnchorsAndMentionsStyles = `[a-z0-9][a-z0-9-_]{0,63}`);
  (EditorAnchorsAndMentionsSlice = editorAnchorsAndMentionsPattern.source.slice(1, -1));
  (EditorAnchorsAndMentionsState4 = RegExp(
    `^run:${EditorAnchorsAndMentionsSlice}$`,
  ));
  (EditorAnchorsAndMentionsState5 = RegExp(
    `^${EditorAnchorsAndMentionsSlice}$`,
  ));
  (EditorAnchorsAndMentionsState6 = RegExp(
    `^runs?/(${EditorAnchorsAndMentionsSlice})$`,
  ));
  (EditorAnchorsAndMentionsState7 = RegExp(
    `^routine:(${EditorAnchorsAndMentionsStyles})$`,
  ));
  (EditorAnchorsAndMentionsState8 = RegExp(
    `^${EditorAnchorsAndMentionsStyles}$`,
  ));
  (EditorAnchorsAndMentionsState9 = RegExp(
    `^table:${EditorAnchorsAndMentionsStyles}$`,
  ));
  (editorAnchorsAndMentionsPattern2 = /^[A-Za-z0-9_-]{1,128}$/);
  (editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValues = [
      `data-claude-anchor`,
      `data-claude-text-id`,
      `data-claude-component`,
      `claude-segment`,
      `claude-anchor`,
      `claude-text-id`,
    ]);
  editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValues
    .map(
      (
        editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        `[${editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue}]`,
    )
    .join(`,`);
  editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValues
    .map(
      (
        editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue ===
        `data-claude-anchor`
          ? `[${editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue}]:not([${editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue}^="{"])`
          : `[${editorAnchorsAndMentionsDataClaudeAnchorDataClaudeTextIdDataClaudeComponentClaudeSegmentValue}]`,
    )
    .join(`,`);
  [`data-claude-text-id`, `claude-text-id`]
    .map((item?: Dynamic, ..._extraArguments: unknown[]) => `[${item}]`)
    .join(`,`);
  (EditorAnchorsAndMentionsSlice2 = RegExp(
    `^(${editorAnchorsAndMentionsPattern2.source.slice(1, -1)})\\.(${editorAnchorsAndMentionsPattern2.source.slice(1, -1)})$`,
  ));
  (editorAnchorsAndMentionsPattern3 = /^[A-Za-z0-9._~-]+$/);
  (editorAnchorsAndMentionsPattern4 = /^#(ln-[A-Za-z0-9_-]{1,64})$/);
  (EditorAnchorsAndMentionsState10 = String.raw`[A-Z]{1,3}[1-9][0-9]{0,6}`);
  (EditorAnchorsAndMentionsState11 = RegExp(
    `^([A-Za-z0-9_-]{1,64})\\/(${EditorAnchorsAndMentionsState10}(?::${EditorAnchorsAndMentionsState10})?)$`,
  ));
  (EditorAnchorsAndMentionsState12 = String.raw`(?!\.+(?:\/|$))[A-Za-z0-9_.-]{1,128}`);
  RegExp(
    `^\\/?${EditorAnchorsAndMentionsState12}(\\/${EditorAnchorsAndMentionsState12})*$`,
  );
  (editorAnchorsAndMentionsPattern5 = /^u_[A-Za-z0-9_-]{1,126}$/);
  (editorAnchorsAndMentionsPattern6 = /^p_[A-Za-z0-9_-]{22}$/);
  (editorAnchorsAndMentionsPattern7 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  (EditorAnchorsAndMentionsSomeone = `Someone`);
  (EditorAnchorsAndMentionsMessage = `This person can’t be shown here yet`);
  (resolveEditorAnchorsAndMentionsPlatform = (
    editorAnchorsAndMentionsPlatform?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let editorAnchorsAndMentionsOther = resolveEditorAnchorsAndMentionsOther(
      editorAnchorsAndMentionsPlatform,
    );
    return (
      editorAnchorsAndMentionsOther === `platform` ||
      editorAnchorsAndMentionsOther === `account`
    );
  });
  (resolveEditorAnchorsAndMentionsEmail2 = (
    editorAnchorsAndMentionsEmail2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorAnchorsAndMentionsOther(editorAnchorsAndMentionsEmail2) ===
    `email`
      ? editorAnchorsAndMentionsEmail2
      : null);
  (EditorAnchorsAndMentionsSlice3 = editorAnchorsAndMentionsPattern.source.slice(1, -1));
  (EditorAnchorsAndMentionsStyles2 = `[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?`);
  (EditorAnchorsAndMentionsStyles3 = `[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?`);
  (EditorAnchorsAndMentionsStyles4 = `[A-Za-z0-9_-]{1,64}`);
  (EditorAnchorsAndMentionsStyles5 = `[A-Za-z0-9_/:.-]{1,128}`);
  (EditorAnchorsAndMentionsState13 = String.raw`[A-Za-z0-9._%+-]{1,64}(?:@[A-Za-z0-9.-]{1,255})?`);
  (EditorAnchorsAndMentionsJoin = [
    `runs?/${EditorAnchorsAndMentionsSlice3}`,
    `run:${EditorAnchorsAndMentionsSlice3}`,
    `routines/${EditorAnchorsAndMentionsStyles2}`,
    `routine/${EditorAnchorsAndMentionsStyles3}`,
    `routine:${EditorAnchorsAndMentionsStyles2}`,
    `tables/${EditorAnchorsAndMentionsStyles2}`,
    `table/${EditorAnchorsAndMentionsStyles3}`,
    `table:${EditorAnchorsAndMentionsStyles2}`,
    `users/${EditorAnchorsAndMentionsState13}`,
    `files?/${EditorAnchorsAndMentionsStyles4}(?:#${EditorAnchorsAndMentionsStyles5})?`,
    `database/${EditorAnchorsAndMentionsStyles3}`,
    `#ln-[A-Za-z0-9_-]{1,64}`,
  ].join(`|`));
  (EditorAnchorsAndMentionsState14 = `${EditorAnchorsAndMentionsJoin}|${`project/${EditorAnchorsAndMentionsStyles3}(?:/(?:file/${EditorAnchorsAndMentionsStyles4}(?:#${EditorAnchorsAndMentionsStyles5})?|run/${EditorAnchorsAndMentionsSlice3}|table/${EditorAnchorsAndMentionsStyles3}|routine/${EditorAnchorsAndMentionsStyles3}|database/${EditorAnchorsAndMentionsStyles3}))?`}`);
  (EditorAnchorsAndMentionsState15 = RegExp(
    `<(mention|claude|ref|container):([^<>\\s]+)>|<(${EditorAnchorsAndMentionsState14})\\|([^<>|\\n]{1,80})>|(?<![\\w/#-])(${EditorAnchorsAndMentionsJoin})(?![\\w/#:-])`,
    `g`,
  ));
  (EditorAnchorsAndMentionsState16 = RegExp(
    `^(?:runs?/|run:)(${EditorAnchorsAndMentionsSlice3})$`,
  ));
  (EditorAnchorsAndMentionsState17 = RegExp(
    `^(?:tables/(${EditorAnchorsAndMentionsStyles2})|table/(${EditorAnchorsAndMentionsStyles3})|table:(${EditorAnchorsAndMentionsStyles2}))$`,
  ));
  (EditorAnchorsAndMentionsState18 = RegExp(
    `^(?:routines/(${EditorAnchorsAndMentionsStyles2})|routine/(${EditorAnchorsAndMentionsStyles3})|routine:(${EditorAnchorsAndMentionsStyles2}))$`,
  ));
  (EditorAnchorsAndMentionsState19 = RegExp(
    `^users/(${EditorAnchorsAndMentionsState13})$`,
  ));
  (EditorAnchorsAndMentionsState20 = RegExp(
    `^files?/(${EditorAnchorsAndMentionsStyles4})(#${EditorAnchorsAndMentionsStyles5})?$`,
  ));
  (editorAnchorsAndMentionsPattern8 = /^#ln-[A-Za-z0-9_-]{1,64}$/);
  (EditorAnchorsAndMentionsState21 = RegExp(
    `^database/(${EditorAnchorsAndMentionsStyles3})$`,
  ));
  (EditorAnchorsAndMentionsState22 = RegExp(
    `^project/(${EditorAnchorsAndMentionsStyles3})$`,
  ));
  (EditorAnchorsAndMentionsState23 = RegExp(
    `^project/(${EditorAnchorsAndMentionsStyles3})/(?:file/(${EditorAnchorsAndMentionsStyles4})(#${EditorAnchorsAndMentionsStyles5})?|run/(${EditorAnchorsAndMentionsSlice3})|table/(${EditorAnchorsAndMentionsStyles3})|routine/(${EditorAnchorsAndMentionsStyles3})|database/(${EditorAnchorsAndMentionsStyles3}))$`,
  ));
  (EditorAnchorsAndMentionsRun = {
    run: `run`,
    table: `table`,
    routine: `routine`,
    file: `file`,
    database: `database`,
  });
  (EditorAnchorsAndMentionsState24 = RegExp(
    `^${EditorAnchorsAndMentionsStyles3}$`,
  ));
  (EditorAnchorsAndMentionsState25 = RegExp(
    `^${EditorAnchorsAndMentionsStyles5}$`,
  ));
  (EditorAnchorsAndMentions00100100 = `0 0 100 100`);
  (EditorAnchorsAndMentionsMessage2 = `m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z`);
  (resolveEditorAnchorsAndMentionsReplaceAll = (
    editorAnchorsAndMentionsReplaceAll?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorAnchorsAndMentionsReplaceAll.replaceAll(`⁠`, ``));
  (isEditorAnchorsAndMentionsTextPlain = (
    editorAnchorsAndMentionsTextPlain?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let data: Dynamic = editorAnchorsAndMentionsTextPlain?.getData(`text/plain`);
    return !data?.includes(`⁠`) ||
      (editorAnchorsAndMentionsTextPlain?.getData(`text/html`) ?? ``).includes(
        `data-mention-id=`,
      )
      ? null
      : resolveEditorAnchorsAndMentionsReplaceAll(data);
  });
  (EditorAnchorsAndMentionsState26 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${EditorAnchorsAndMentions00100100}" width="60%" height="60%" fill="currentColor"><path d="${EditorAnchorsAndMentionsMessage2}"/></svg>`);
  (resolveEditorAnchorsAndMentionsLabel = (
    editorAnchorsAndMentionsLabel?: Dynamic,
    options: Dynamic = true,
    ..._extraArguments: unknown[]
  ) =>
    `@${resolveEditorExtensionsJoin(String(editorAnchorsAndMentionsLabel.label ?? editorAnchorsAndMentionsLabel.id))}${options ? `⁠` : ``}`);
  (editorAnchorsAndMentionsPattern9 = /^u_[A-Za-z0-9_]{22}$/);
  (resolveEditorAnchorsAndMentionsTest = (
    editorAnchorsAndMentionsTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorAnchorsAndMentionsTest == `string` &&
    editorAnchorsAndMentionsPattern9.test(editorAnchorsAndMentionsTest));
  (resolveEditorAnchorsAndMentionsValue11 = (
    editorAnchorsAndMentionsValue11?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `<mention:${editorAnchorsAndMentionsValue11}>`);
  (editorAnchorsAndMentionsPattern10 = /<mention:(u_[A-Za-z0-9_]{22})>/g);
  (EditorAnchorsAndMentionsRefchip = `refchip`);
  (resolveEditorAnchorsAndMentionsValue13 = (
    editorAnchorsAndMentionsValue13?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let text = String(editorAnchorsAndMentionsValue13.ref ?? ``);
    return resolveEditorAnchorsAndMentionsProject(text) ?? `<ref:${text}>`;
  });
  (EditorAnchorsAndMentionsLabel = {
    id: `__priming`,
    label: ``,
  });
  (EditorAnchorsAndMentionsLabel2 = {
    id: `__skipped`,
    label: ``,
  });
  (resolveEditorAnchorsAndMentionsSpan = (
    contributor?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    options.append(installEditorAnchorsAndMentionsOnce(contributor));
    let element = document.createElement(`span`);
    element.className = `t`;
    element.textContent = contributor.label;
    options.append(element);
    let email: Dynamic =
      contributor.guest && contributor.email
        ? contributor.email
        : contributor.handle
          ? `@${contributor.handle}`
          : undefined;
    if (email) {
      let element2 = document.createElement(`span`);
      element2.className = `h`;
      element2.textContent = email;
      options.append(element2);
    }
    if (contributor.guest) {
      let element2 = document.createElement(`span`);
      element2.className = `guest`;
      element2.textContent = `Guest`;
      options.append(element2);
    }
  });
}

export {
  EditorAnchorsAndMentions00100100,
  EditorAnchorsAndMentionsLabel,
  EditorAnchorsAndMentionsLabel2,
  EditorAnchorsAndMentionsLfileTypeahead,
  EditorAnchorsAndMentionsMaster16,
  EditorAnchorsAndMentionsMessage,
  EditorAnchorsAndMentionsMessage2,
  EditorAnchorsAndMentionsRefchip,
  EditorAnchorsAndMentionsSomeone,
  EditorAnchorsAndMentionsStyles,
  collectEditorAnchorsAndMentionsText,
  editorAnchorsAndMentionsD977576A9BCC788C5DC46686Values,
  editorAnchorsAndMentionsPattern,
  editorAnchorsAndMentionsPattern2,
  editorAnchorsAndMentionsPattern3,
  getEditorAnchorsAndMentionsValue,
  installEditorAnchorsAndMentionsMousedown,
  installEditorAnchorsAndMentionsOnce,
  isEditorAnchorsAndMentionsBottom,
  isEditorAnchorsAndMentionsKey,
  isEditorAnchorsAndMentionsKind,
  isEditorAnchorsAndMentionsTextPlain,
  resolveEditorAnchorsAndMentionsBoundaryMarker,
  resolveEditorAnchorsAndMentionsEmail,
  resolveEditorAnchorsAndMentionsEmail2,
  resolveEditorAnchorsAndMentionsEscape,
  resolveEditorAnchorsAndMentionsExit,
  resolveEditorAnchorsAndMentionsGrid2,
  resolveEditorAnchorsAndMentionsGroup,
  resolveEditorAnchorsAndMentionsIncludes,
  resolveEditorAnchorsAndMentionsKind,
  resolveEditorAnchorsAndMentionsLabel,
  resolveEditorAnchorsAndMentionsLeft,
  resolveEditorAnchorsAndMentionsMetadata,
  resolveEditorAnchorsAndMentionsNames,
  resolveEditorAnchorsAndMentionsNode,
  resolveEditorAnchorsAndMentionsOther,
  resolveEditorAnchorsAndMentionsOwnerDocument,
  resolveEditorAnchorsAndMentionsPlatform,
  resolveEditorAnchorsAndMentionsReads,
  resolveEditorAnchorsAndMentionsRef,
  resolveEditorAnchorsAndMentionsRef3,
  resolveEditorAnchorsAndMentionsReplaceAll,
  resolveEditorAnchorsAndMentionsRoutines,
  resolveEditorAnchorsAndMentionsSpan,
  resolveEditorAnchorsAndMentionsSplit,
  resolveEditorAnchorsAndMentionsStartsWith,
  resolveEditorAnchorsAndMentionsStyle,
  resolveEditorAnchorsAndMentionsTest,
  resolveEditorAnchorsAndMentionsValue,
  resolveEditorAnchorsAndMentionsValue10,
  resolveEditorAnchorsAndMentionsValue12,
  resolveEditorAnchorsAndMentionsValue13,
  resolveEditorAnchorsAndMentionsValue2,
  resolveEditorAnchorsAndMentionsValue3,
  resolveEditorAnchorsAndMentionsValue4,
  resolveEditorAnchorsAndMentionsValue5,
  resolveEditorAnchorsAndMentionsValue6,
  resolveEditorAnchorsAndMentionsValue7,
  resolveEditorAnchorsAndMentionsValue8,
  resolveEditorAnchorsAndMentionsValue9,
  updateEditorAnchorsAndMentionsCapture,
};

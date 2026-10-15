/** BaoCut: ui design system from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  clsx,
  extendTailwindMerge,
  validators,
} from "./platform-core-dependencies";

var UiDesignSystemUseLayoutEffect: Dynamic;

var resolveUiDesignSystemTheme: Dynamic;

function resolveUiDesignSystemResolve(
  uiDesignSystemResolve?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return uiDesignSystemResolve.resolve?.(uiDesignSystemResolve.theme);
  } catch (error: Dynamic) {
    resolveUiDesignSystemError(
      `<CdsRoot experimental.theme> could not resolve the theme "` +
        String(uiDesignSystemResolve.theme.id) +
        `", so useTokenValue returns unthemed values. ` +
        (error instanceof Error ? error.message : String(error)),
    );
    return;
  }
}

function clearUiDesignSystemSubscribe(
  clearUiDesignSystemSubscribe2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uiDesignSystemTheme: Dynamic = resolveUiDesignSystemTheme(
    clearUiDesignSystemSubscribe2,
  );
  let uiDesignSystemTheme2: Dynamic = uiDesignSystemTheme;
  let clearUiDesignSystemSubscribe3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let clearUiDesignSystemSubscribeResult of uniqueItems as Dynamic)
      clearUiDesignSystemSubscribeResult();
  };
  return {
    subscribe: (
      clearUiDesignSystemSubscribe4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      uniqueItems.add(clearUiDesignSystemSubscribe4),
      (..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.delete(clearUiDesignSystemSubscribe4)
    ),
    getSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      uiDesignSystemTheme,
    getServerSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      uiDesignSystemTheme2,
    getId: (..._extraArguments: unknown[]): Dynamic =>
      uiDesignSystemTheme?.theme.id,
    set: (
      clearUiDesignSystemSubscribe4?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let uiDesignSystemTheme3: Dynamic = resolveUiDesignSystemTheme(
        clearUiDesignSystemSubscribe4,
        uiDesignSystemTheme,
      );
      if (uiDesignSystemTheme3 !== uiDesignSystemTheme) {
        uiDesignSystemTheme = uiDesignSystemTheme3;
        clearUiDesignSystemSubscribe3();
      }
    },
  };
}

var UiDesignSystemCreateContext: Dynamic;

var UiDesignSystemState: Dynamic;

function useUiDesignSystemUseContext(..._extraArguments: unknown[]): Dynamic {
  let useContext: Dynamic =
    (0, React.useContext)(UiDesignSystemCreateContext) ?? UiDesignSystemState;
  return (0, React.useSyncExternalStore)(
    useContext.subscribe,
    useContext.getId,
    (..._extraArguments: unknown[]): Dynamic =>
      useContext.getServerSnapshot()?.theme.id,
  );
}

var uiDesignSystemSet: Dynamic;

function resolveUiDesignSystemError(
  uiDesignSystemError?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!uiDesignSystemSet.has(uiDesignSystemError)) {
    uiDesignSystemSet.add(uiDesignSystemError);
    console.error(`cds: ` + uiDesignSystemError);
  }
}

function resolveUiDesignSystemMessage(
  uiDesignSystemMessage?: Dynamic,
  error?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveUiDesignSystemError(
    `<CdsRoot experimental.theme> could not put the theme "` +
      uiDesignSystemMessage +
      `" on the page, so the page keeps what it had (no theme, or the previous one) while useTokenValue and useCdsTheme answer for "` +
      uiDesignSystemMessage +
      `". ` +
      (error instanceof Error ? error.message : String(error)),
  );
}

function resolveUiDesignSystemCurrent(
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let ref2: Dynamic = ref.current;
  ref.current = undefined;
  try {
    ref2?.();
  } catch {}
}

function useUiDesignSystemTheme(
  uiDesignSystemTheme?: Dynamic,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(UiDesignSystemCreateContext);
  let [clearUiDesignSystemSubscribeState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      useContext === undefined
        ? clearUiDesignSystemSubscribe(uiDesignSystemTheme)
        : UiDesignSystemState,
  );
  let matchesUseContext = useContext === undefined;
  let theme: Dynamic = uiDesignSystemTheme?.theme ?? undefined;
  let resolve: Dynamic = uiDesignSystemTheme?.resolve;
  let apply: Dynamic = uiDesignSystemTheme?.apply;
  let applyRef: Dynamic = (0, React.useRef)(apply);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      applyRef.current = apply;
    },
    [apply],
  );
  let matchesApply = apply !== undefined;
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (matchesUseContext) {
        clearUiDesignSystemSubscribeState.set(
          theme === undefined
            ? undefined
            : {
                theme: theme,
                resolve: resolve,
              },
        );
      }
    },
    [matchesUseContext, clearUiDesignSystemSubscribeState, theme, resolve],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      let target: Dynamic = ref.current;
      let apply2: Dynamic = applyRef.current;
      if (
        matchesUseContext &&
        theme !== undefined &&
        apply2 !== undefined &&
        target !== null
      )
        try {
          elementRef.current = apply2(theme, {
            target: target,
          });
        } catch (useUiDesignSystemThemeResult: Dynamic) {
          resolveUiDesignSystemMessage(theme.id, useUiDesignSystemThemeResult);
        }
      else resolveUiDesignSystemCurrent(elementRef);
    },
    [matchesUseContext, theme, matchesApply, ref],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]) =>
        resolveUiDesignSystemCurrent(elementRef),
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [uiDesignSystemTheme === null, theme, matchesApply, useContext, ref],
  );
  return useContext ?? clearUiDesignSystemSubscribeState;
}

var UiDesignSystemSchema: {
    $schema: string;
    TYPE_SCALE: string[];
    TYPE_WEIGHT_NAMES: string[];
    themeKeys: {
        borderRadius: string[];
        boxShadow: string[];
        cursor: string[];
        fontFamily: string[];
        fontWeight: string[];
        gap: string[];
        height: string[];
        margin: string[];
        minHeight: string[];
        opacity: string[];
        padding: string[];
        size: string[];
        transitionDuration: string[];
        transitionTimingFunction: string[];
        width: string[];
        zIndex: string[];
    };
};

var uiDesignSystemState: any;
var uiDesignSystemState2: any;
var uiDesignSystemState3: any;

var resolveUiDesignSystemValue: Dynamic;

var UiDesignSystemPadding: Dynamic;

var UiDesignSystemMargin: Dynamic;

var UiDesignSystemState2: Dynamic;

var collectUiDesignSystemValue: Dynamic;

var UiDesignSystemState3: Dynamic;

var UiDesignSystemFlatMap: Dynamic;

var mergeDesignSystemClasses: Dynamic;

function resolveUiDesignSystemValue2(
  ...uiDesignSystemValue2: Dynamic[]
): Dynamic {
  return mergeDesignSystemClasses(clsx(uiDesignSystemValue2));
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiDesignSystemStep1(): void {
  (UiDesignSystemUseLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect);
  (resolveUiDesignSystemTheme = (
    uiDesignSystemTheme?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      uiDesignSystemTheme == null ||
      uiDesignSystemTheme.theme === undefined ||
      uiDesignSystemTheme.theme === null
    )
      return;
    let resolved: Dynamic = resolveUiDesignSystemResolve(uiDesignSystemTheme);
    return options !== undefined &&
      options.theme === uiDesignSystemTheme.theme &&
      options.resolved === resolved
      ? options
      : {
          theme: uiDesignSystemTheme.theme,
          resolved: resolved,
        };
  });
  (UiDesignSystemCreateContext = (0, React.createContext)(undefined));
  (UiDesignSystemState = clearUiDesignSystemSubscribe(undefined));
  (uiDesignSystemSet = new (Set as Dynamic)());
  (UiDesignSystemSchema = {
    $schema:
      "GENERATED by `yarn gen:tokens` from tokens/theme.ts (key names of theme-extend.json sections, for src/utils/cn.ts)",
    TYPE_SCALE: [
      `caption`,
      `footnote`,
      `code`,
      `body`,
      `prose`,
      `heading`,
      `title`,
    ],
    TYPE_WEIGHT_NAMES: [`regular`, `medium`, `semibold`, `bold`],
    themeKeys: {
      borderRadius: [`composer`, `card`, `chip`],
      boxShadow:
        `sm.md.lg.popover.drop-ring.drop-ring-danger.drop-glow.drop-glow-danger.focus.focus-danger.field.field-pressed.field-drop.field-ring.field-hover.field-invalid.panel.panel-sm.panel-md.panel-lg.card-ring.composer.composer-hover.composer-focus.ring-accent.ring-pro.ring-warning.ring-danger.ring-success`.split(
          `.`,
        ),
      cursor: [`interactive`],
      fontFamily: [`mono`, `mono-ui`, `sans`, `sans-display`, `voice`],
      fontWeight: [`medium`, `semibold`, `bold`, `normal`],
      gap: [`xs`, `sm`, `md`, `lg`, `xl`],
      height: [`control`, `control-nested`, `icon`],
      margin: [
        `pad-xs`,
        `pad-sm`,
        `pad-md`,
        `pad-lg`,
        `pad-xl`,
        `xs`,
        `sm`,
        `md`,
        `lg`,
        `xl`,
      ],
      minHeight: [`control`],
      opacity: [`disabled`, `icon-secondary`],
      padding: [`xs`, `sm`, `md`, `lg`, `xl`],
      size: [`control`, `control-nested`, `icon`],
      transitionDuration: [`fast`, `snap`, `base`, `sheet`, `slow`],
      transitionTimingFunction: [`out`, `snap`, `overshoot`],
      width: [`control`, `control-nested`, `icon`],
      zIndex: [`modal`, `coachmark`, `popover`, `tooltip`, `toast`],
    },
  });
  ({
    themeKeys: uiDesignSystemState,
    TYPE_SCALE: uiDesignSystemState2,
    TYPE_WEIGHT_NAMES: uiDesignSystemState3,
  } = UiDesignSystemSchema);
  (resolveUiDesignSystemValue = (
    uiDesignSystemValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => uiDesignSystemState[uiDesignSystemValue]);
  (UiDesignSystemPadding = resolveUiDesignSystemValue(`padding`));
  (UiDesignSystemMargin = resolveUiDesignSystemValue(`margin`));
  (UiDesignSystemState2 = resolveUiDesignSystemValue(`gap`));
  (collectUiDesignSystemValue = (
    collectUiDesignSystemValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.fromEntries(
      [``, `x`, `y`, `s`, `e`, `t`, `r`, `b`, `l`].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          `${collectUiDesignSystemValue2}${item}`,
          [
            {
              [`${collectUiDesignSystemValue2}${item}`]: options,
            },
          ],
        ],
      ),
    ));
  (UiDesignSystemState3 = uiDesignSystemState2);
  (UiDesignSystemFlatMap = uiDesignSystemState2.flatMap(
    (uiDesignSystemState22?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      uiDesignSystemState3.map(
        (uiDesignSystemState32?: Dynamic, ..._extraArguments: unknown[]) =>
          `${uiDesignSystemState22}-${uiDesignSystemState32}`,
      ),
  ));
  (mergeDesignSystemClasses = extendTailwindMerge({
    extend: {
      conflictingClassGroups: {
        "font-size-weight": [`font-size`, `font-weight`, `leading`],
        "font-size": [`font-size-weight`],
      },
      theme: {
        radius: resolveUiDesignSystemValue(`borderRadius`),
      },
      classGroups: {
        "font-size": [
          {
            text: UiDesignSystemState3,
          },
        ],
        "font-size-weight": [
          {
            text: UiDesignSystemFlatMap,
          },
        ],
        "font-family": [
          {
            font: [...resolveUiDesignSystemValue(`fontFamily`), `inherit`],
          },
        ],
        "font-weight": [
          {
            font: resolveUiDesignSystemValue(`fontWeight`),
          },
        ],
        grade: [
          {
            grad: [
              `semibold`,
              `bold`,
              validators.isInteger,
              validators.isArbitraryValue,
            ],
          },
        ],
        h: [
          {
            h: resolveUiDesignSystemValue(`height`),
          },
        ],
        w: [
          {
            w: [...resolveUiDesignSystemValue(`width`), `stretch`],
          },
        ],
        size: [
          {
            size: resolveUiDesignSystemValue(`size`),
          },
        ],
        "min-h": [
          {
            "min-h": resolveUiDesignSystemValue(`minHeight`),
          },
        ],
        "max-h": [
          {
            "max-h": [`none`],
          },
        ],
        shadow: [
          {
            shadow: resolveUiDesignSystemValue(`boxShadow`),
          },
        ],
        duration: [
          {
            duration: resolveUiDesignSystemValue(`transitionDuration`),
          },
        ],
        ease: [
          {
            ease: resolveUiDesignSystemValue(`transitionTimingFunction`),
          },
        ],
        cursor: [
          {
            cursor: resolveUiDesignSystemValue(`cursor`),
          },
        ],
        z: [
          {
            z: resolveUiDesignSystemValue(`zIndex`),
          },
        ],
        opacity: [
          {
            opacity: resolveUiDesignSystemValue(`opacity`),
          },
        ],
        ...collectUiDesignSystemValue(`p`, UiDesignSystemPadding),
        ...collectUiDesignSystemValue(`m`, [...UiDesignSystemMargin, `outset`]),
        gap: [
          {
            gap: UiDesignSystemState2,
          },
        ],
        "gap-x": [
          {
            "gap-x": UiDesignSystemState2,
          },
        ],
        "gap-y": [
          {
            "gap-y": UiDesignSystemState2,
          },
        ],
      },
    },
  }));
}

export {
  UiDesignSystemCreateContext,
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
  useUiDesignSystemTheme,
  useUiDesignSystemUseContext,
};

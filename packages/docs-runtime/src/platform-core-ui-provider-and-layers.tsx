/** BaoCut: ui provider and layers from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  useRender,
} from "./platform-core-dependencies";
import {
  UiDesignSystemCreateContext,
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
  useUiDesignSystemTheme,
} from "./platform-core-ui-design-system";
import {
  UiLinksAndFoundationCreateContext,
  UiLinksAndFoundationCreateContext2,
  UiLinksAndFoundationCreateContext3,
  createSafeMutationObserver,
  isUiLinksAndFoundationSource,
  resolveUiLinksAndFoundationDesktop,
  resolveUiLinksAndFoundationJoin,
  resolveUiLinksAndFoundationUseContext,
  resolveUiLinksAndFoundationWindow,
  uiLinksAndFoundationRedOrangeYellowGreenValues,
  updateUiLinksAndFoundationObservedInput,
  useUiLinksAndFoundationState,
  useUiLinksAndFoundationUseSyncExternalStore2,
} from "./platform-core-ui-links-and-foundation";
import {
  isUiVendorAdaptersValue,
  resolveUiVendorAdaptersValue,
  resolveUiVendorAdaptersValue2,
  resolveUiVendorAdaptersValue3,
} from "./platform-core-ui-vendor-adapters";

function resolveUiProviderAndLayersDataSize(
  dataSize?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataSize && dataSize !== `base`
    ? {
        "data-size": dataSize,
      }
    : {};
}

var UiProviderAndLayersCompact: Dynamic;

var UiProviderAndLayersBase: Dynamic;

function resolveUiProviderAndLayersBase(
  uiProviderAndLayersBase?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let total: Dynamic =
    UiProviderAndLayersCompact[uiProviderAndLayersBase] +
    UiProviderAndLayersBase[options ?? `base`];
  return total < 1 ? 1 : total > 5 ? 5 : total;
}

var UiProviderAndLayersComfortable: Dynamic;

var UiProviderAndLayersState: Dynamic;

var UiProviderAndLayersCreateContext: Dynamic;

var UiProviderAndLayersSetElement: Dynamic;

var UiProviderAndLayersStyles: string;

var resolveUiProviderAndLayersDark: Dynamic;

function clearUiProviderAndLayersAttributes(
  clearUiProviderAndLayers?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let clearUiProviderAndLayersAttributesResult: Dynamic = null;
  let attribute: Dynamic =
    clearUiProviderAndLayers === undefined && typeof document !== "undefined"
      ? document.documentElement.getAttribute(`data-mode`)
      : null;
  let resolveUiProviderAndLayersDark2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    clearUiProviderAndLayers ?? resolveUiProviderAndLayersDark(attribute);
  let clearUiProviderAndLayersAttributesHandler = (
    clearUiProviderAndLayers2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (clearUiProviderAndLayers2 ? `dark` : `light`);
  let clearUiProviderAndLayersAttributesResult2: Dynamic;
  let clearUiProviderAndLayersAttributesResult3: Dynamic;
  let enabled = false;
  let matchMedia = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      clearUiProviderAndLayersAttributesResult2 =
        clearUiProviderAndLayers !== `light` &&
        clearUiProviderAndLayers !== `dark` &&
        typeof window !== "undefined" &&
        typeof window.matchMedia == `function`
          ? window.matchMedia(UiProviderAndLayersStyles)
          : undefined;
      clearUiProviderAndLayersAttributesResult3 =
        clearUiProviderAndLayersAttributesResult2
          ? clearUiProviderAndLayersAttributesHandler(
              clearUiProviderAndLayersAttributesResult2.matches,
            )
          : undefined;
    }
  };
  let getAttribute = (..._extraArguments: unknown[]): undefined => {
    if (clearUiProviderAndLayersAttributesResult) {
      attribute =
        clearUiProviderAndLayersAttributesResult
          .closest(`[data-mode]`)
          ?.getAttribute(`data-mode`) ??
        (clearUiProviderAndLayersAttributesResult.isConnected
          ? null
          : document.documentElement.getAttribute(`data-mode`));
    }
  };
  let clearUiProviderAndLayersAttributesHandler2: Dynamic = (
    clearUiProviderAndLayers2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    clearUiProviderAndLayers2 === `light` ||
    clearUiProviderAndLayers2 === `dark`
      ? clearUiProviderAndLayers2
      : undefined;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let clearUiProviderAndLayersAttributesHandler3: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    uniqueItems.forEach(
      (uniqueItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        uniqueItem(),
    );
  let enabled2 = false;
  let observe: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let items: Dynamic = [];
    matchMedia();
    let clearUiProviderAndLayersAttributesResult5: Dynamic =
      clearUiProviderAndLayersAttributesResult2;
    if (clearUiProviderAndLayersAttributesResult5) {
      let clearUiProviderAndLayersAttributesHandler4 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        clearUiProviderAndLayersAttributesResult3 =
          clearUiProviderAndLayersAttributesHandler(
            clearUiProviderAndLayersAttributesResult5.matches,
          );
        clearUiProviderAndLayersAttributesHandler3();
      };
      clearUiProviderAndLayersAttributesResult5.addEventListener(
        `change`,
        clearUiProviderAndLayersAttributesHandler4,
      );
      items.push(
        (..._extraArguments: unknown[]): Dynamic =>
          clearUiProviderAndLayersAttributesResult5.removeEventListener(
            `change`,
            clearUiProviderAndLayersAttributesHandler4,
          ),
      );
      let clearUiProviderAndLayersAttributesHandler5 =
        clearUiProviderAndLayersAttributesHandler(
          clearUiProviderAndLayersAttributesResult5.matches,
        );
      if (
        clearUiProviderAndLayersAttributesHandler5 !==
        clearUiProviderAndLayersAttributesResult3
      ) {
        clearUiProviderAndLayersAttributesResult3 =
          clearUiProviderAndLayersAttributesHandler5;
        enabled2 = true;
      }
    }
    if (
      clearUiProviderAndLayers === undefined &&
      typeof MutationObserver !== "undefined"
    ) {
      let attribute2: Dynamic = attribute;
      getAttribute();
      if (attribute !== attribute2) {
        enabled2 = true;
      }
      let safeMutationObserver: Dynamic = createSafeMutationObserver(
        MutationObserver,
        (..._extraArguments: unknown[]): undefined => {
          let attribute3: Dynamic = attribute;
          getAttribute();
          if (attribute !== attribute3) {
            clearUiProviderAndLayersAttributesHandler3();
          }
        },
      );
      safeMutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [`data-mode`],
        subtree: true,
      });
      items.push(
        (..._extraArguments: unknown[]): Dynamic =>
          safeMutationObserver.disconnect(),
      );
    }
    if (enabled2) {
      enabled2 = false;
      queueMicrotask(clearUiProviderAndLayersAttributesHandler3);
    }
    return (..._extraArguments: unknown[]): Dynamic =>
      items.forEach(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item(),
      );
  };
  let clearUiProviderAndLayersAttributesResult4: Dynamic;
  return {
    setElement: (
      clearUiProviderAndLayers2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      clearUiProviderAndLayersAttributesResult = clearUiProviderAndLayers2;
      if (
        clearUiProviderAndLayers === undefined &&
        clearUiProviderAndLayers2 !== null
      ) {
        let attribute2: Dynamic = attribute;
        getAttribute();
        if (attribute !== attribute2 && uniqueItems.size === 0) {
          enabled2 = true;
        }
        clearUiProviderAndLayersAttributesHandler3();
      }
    },
    subscribe: (
      clearUiProviderAndLayers2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      uniqueItems.size === 0 &&
        (clearUiProviderAndLayersAttributesResult4 = observe()),
      uniqueItems.add(clearUiProviderAndLayers2),
      (..._extraArguments: unknown[]): undefined => {
        uniqueItems.delete(clearUiProviderAndLayers2);
        if (uniqueItems.size === 0) {
          clearUiProviderAndLayersAttributesResult4?.();
          clearUiProviderAndLayersAttributesResult4 = undefined;
        }
      }
    ),
    getSnapshot: (..._extraArguments: unknown[]): Dynamic => (
      matchMedia(),
      clearUiProviderAndLayersAttributesHandler2(
        resolveUiProviderAndLayersDark2(),
      ) ?? clearUiProviderAndLayersAttributesResult3
    ),
    getServerSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      clearUiProviderAndLayersAttributesHandler2(clearUiProviderAndLayers),
    getAttrSnapshot: (..._extraArguments: unknown[]): Dynamic => (
      matchMedia(),
      clearUiProviderAndLayers === undefined
        ? undefined
        : (clearUiProviderAndLayersAttributesHandler2(
            clearUiProviderAndLayers,
          ) ??
          clearUiProviderAndLayersAttributesResult3 ??
          clearUiProviderAndLayers)
    ),
    getServerAttrSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      clearUiProviderAndLayers,
    getSettingSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      resolveUiProviderAndLayersDark2(),
    getServerSettingSnapshot: (..._extraArguments: unknown[]): Dynamic =>
      clearUiProviderAndLayers,
  };
}

var UiProviderAndLayersCreateContext2: Dynamic;

var UiProviderAndLayersCreateContext3: Dynamic;

var UiProviderAndLayersCreateContext4: Dynamic;

var UiProviderAndLayersCreateContext5: Dynamic;

function resolveUiProviderAndLayersUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext5);
}

var UiProviderAndLayersCreateContext6: Dynamic;

var UiProviderAndLayersCreateContext7: Dynamic;

var UiProviderAndLayersCreateContext8: Dynamic;

var UiProviderAndLayersCreateContext9: Dynamic;

var UiProviderAndLayersCreateContext10: Dynamic;

var UiProviderAndLayersCreateContext11: Dynamic;

var UiProviderAndLayersCreateContext12: Dynamic;

function resolveUiProviderAndLayersUseContext2(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersComfortable);
}

function useUiProviderAndLayersComfortable(
  uiProviderAndLayersComfortable?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(
    UiProviderAndLayersComfortable,
  );
  let useContext2: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext7,
  );
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    resolveUiVendorAdaptersValue3,
    isUiLinksAndFoundationSource,
    isUiVendorAdaptersValue,
  );
  return (
    useContext2 ??
    (useSyncExternalStore
      ? `comfortable`
      : (uiProviderAndLayersComfortable ?? useContext))
  );
}

function resolveUiProviderAndLayersLight(
  ..._extraArguments: unknown[]
): Dynamic {
  return useUiProviderAndLayersUseContext() ?? `light`;
}

function useUiProviderAndLayersUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic =
    (0, React.useContext)(UiProviderAndLayersCreateContext) ??
    UiProviderAndLayersSetElement;
  return (0, React.useSyncExternalStore)(
    useContext.subscribe,
    useContext.getSnapshot,
    useContext.getServerSnapshot,
  );
}

function resolveUiProviderAndLayersUseContext3(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext2) ?? `web`;
}

function resolveUiProviderAndLayersUseContext4(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext3);
}

function resolveUiProviderAndLayersUseContext5(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext4);
}

function resolveUiProviderAndLayersCdsFontMonoOverride(
  uiProviderAndLayersCdsFontMonoOverride?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (uiProviderAndLayersCdsFontMonoOverride === null)
    return {
      "--cds-font-mono-override": `initial`,
    };
  let trimmedUiProviderAndLayersCdsFontMonoOverride: Dynamic =
    uiProviderAndLayersCdsFontMonoOverride?.trim();
  return trimmedUiProviderAndLayersCdsFontMonoOverride
    ? {
        "--cds-font-mono-override": `"${trimmedUiProviderAndLayersCdsFontMonoOverride
          .replaceAll(/[\u0000-\u001f\u007f]/g, ``)
          .replaceAll(`\\`, `\\\\`)
          .replaceAll(`"`, `\\"`)}",`,
      }
    : {};
}

function resolveUiProviderAndLayersUseContext6(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext8);
}

function resolveUiProviderAndLayersCdsPageBg(
  uiProviderAndLayersCdsPageBg?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return uiProviderAndLayersCdsPageBg
    ? {
        "--cds-page-bg": resolveUiProviderAndLayersValue(
          uiProviderAndLayersCdsPageBg,
        )
          ? `var(--cds-${uiProviderAndLayersCdsPageBg})`
          : resolveUiProviderAndLayersReplaceAll(uiProviderAndLayersCdsPageBg),
        ...(resolveUiProviderAndLayersFill(uiProviderAndLayersCdsPageBg)
          ? UiProviderAndLayersState2
          : {}),
      }
    : {};
}

function resolveUiProviderAndLayersFill(
  uiProviderAndLayersFill?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveUiProviderAndLayersValue(uiProviderAndLayersFill) &&
    uiProviderAndLayersFill.startsWith(`fill-`)
  );
}

var UiProviderAndLayersState2: {
    [k: string]: string;
};

function resolveUiProviderAndLayersReplaceAll(
  uiProviderAndLayersReplaceAll?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return uiProviderAndLayersReplaceAll.replaceAll(
    /[\u0000-\u001f\u007f;{}*]/g,
    ``,
  );
}

var uiProviderAndLayersSet: Dynamic;

function resolveUiProviderAndLayersValue(
  uiProviderAndLayersValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return uiProviderAndLayersSet.has(uiProviderAndLayersValue);
}

function resolveUiProviderAndLayersUseContext7(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext9);
}

function resolveUiProviderAndLayersUseContext8(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiProviderAndLayersCreateContext10);
}

function resolveUiProviderAndLayersUseContext9(
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext10,
  );
  let useContext2: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext11,
  );
  let useContext3: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext12,
  );
  return useContext ?? (useContext3 ? undefined : useContext2);
}

function resolveUiProviderAndLayersUseContext10(
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveUiLinksAndFoundationWindow(
    (0, React.useContext)(UiProviderAndLayersCreateContext10),
  );
}

function UiProviderAndLayersDensity(
  {
    density: density,
    mode: mode,
    platform: platform,
    font: font,
    fontMono: fontMono,
    pageBackground: pageBackground,
    locale: locale,
    router: router,
    labels: labels,
    experimental: experimental,
    render: render,
    className: className,
    children: children,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let inheritedDensity: Dynamic = (0, React.useContext)(
    UiProviderAndLayersComfortable,
  );
  let inheritedPlatform: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext2,
  );
  let inheritedFont: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext3,
  );
  let inheritedPageBackground: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext5,
  );
  let inheritedRouter: Dynamic = resolveUiLinksAndFoundationUseContext();
  let inheritedLabels: Dynamic = (0, React.useContext)(
    UiLinksAndFoundationCreateContext3,
  );
  let inheritedDensityOverride: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext7,
  );
  let densityOverride: Dynamic =
    experimental?.densityOverride ?? inheritedDensityOverride;
  let coarsePointer: Dynamic = (0, React.useSyncExternalStore)(
    resolveUiVendorAdaptersValue3,
    isUiLinksAndFoundationSource,
    isUiVendorAdaptersValue,
  );
  let resolvedDensity: Dynamic =
    densityOverride ??
    (coarsePointer ? `comfortable` : (density ?? inheritedDensity));
  let resolvedRouter: Dynamic = router ?? inheritedRouter;
  let resolvedLabels: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      labels && inheritedLabels
        ? (
            uiProviderAndLayersDensity?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            labels(uiProviderAndLayersDensity, options, context) ||
            inheritedLabels(uiProviderAndLayersDensity, options, context)
        : (labels ?? inheritedLabels),
    [labels, inheritedLabels],
  );
  let inheritedImageTiles: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext6,
  );
  let naturalImageTiles: Dynamic =
    experimental?.naturalImageTiles ?? inheritedImageTiles;
  let fizzyLakeParts: Dynamic = resolveUiLinksAndFoundationJoin(
    (0, React.useContext)(UiLinksAndFoundationCreateContext2),
    experimental?.fizzyLake?.parts,
  );
  useUiLinksAndFoundationState(
    inheritedFont === undefined,
    resolveUiProviderAndLayersUseContext10(),
  );
  let inheritedMonoFont: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext4,
  );
  let resolvedMonoFont: Dynamic =
    fontMono === null
      ? null
      : ((fontMono?.trim() ? fontMono.trim() : undefined) ?? inheritedMonoFont);
  let resolvedPageBackground: Dynamic =
    pageBackground ?? inheritedPageBackground;
  let inheritedSurfaceBackground: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext8,
  );
  let resolvedSurfaceBackground: Dynamic =
    pageBackground ?? inheritedSurfaceBackground;
  let inheritedLocale: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext9,
  );
  let explicitLocale: Dynamic = locale?.trim() ? locale.trim() : undefined;
  let resolvedLocale: Dynamic = explicitLocale ?? inheritedLocale;
  let detectedPlatform: Dynamic = (0, React.useSyncExternalStore)(
    resolveUiVendorAdaptersValue,
    resolveUiLinksAndFoundationDesktop,
    resolveUiVendorAdaptersValue2,
  );
  let resolvedPlatform: Dynamic =
    platform ?? inheritedPlatform ?? detectedPlatform;
  let rootRef: Dynamic = (0, React.useRef)(null);
  let inheritedTheme: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext,
  );
  let ownThemeScope = mode !== undefined || inheritedTheme === undefined;
  let [themeState, setThemeState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      ownThemeScope
        ? {
            mode: mode,
            scope: clearUiProviderAndLayersAttributes(mode),
          }
        : null,
  );
  let parentTheme: Dynamic = ownThemeScope ? undefined : inheritedTheme;
  let themeStore: Dynamic;
  if (parentTheme === undefined) {
    if (themeState !== null && themeState.mode === mode) {
      themeStore = themeState.scope;
    } else {
      themeStore = clearUiProviderAndLayersAttributes(mode);
      setThemeState({
        mode: mode,
        scope: themeStore,
      });
    }
  } else {
    themeStore = parentTheme;
  }
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): undefined => {
    updateUiLinksAndFoundationObservedInput(rootRef.current?.ownerDocument);
  }, []);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic => {
      if (ownThemeScope) {
        themeStore.setElement(rootRef.current);
        return (..._extraArguments: unknown[]): Dynamic =>
          themeStore.setElement(null);
      }
    },
    [ownThemeScope, themeStore],
  );
  let themeOverrides: Dynamic = useUiDesignSystemTheme(
    experimental?.theme,
    rootRef,
  );
  let themeMode: Dynamic = (0, React.useSyncExternalStore)(
    themeStore.subscribe,
    ownThemeScope ? themeStore.getAttrSnapshot : themeStore.getSnapshot,
    ownThemeScope
      ? themeStore.getServerAttrSnapshot
      : themeStore.getServerSnapshot,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [explicitLocale],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [false],
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {}, []);
  let renderElement: Dynamic = render;
  if (
    typeof renderElement == `object` &&
    renderElement &&
    renderElement.$$typeof === Symbol.for(`react.lazy`)
  ) {
    renderElement = React.Children.toArray(renderElement)[0];
  }
  let isHtmlRoot: Dynamic =
    (0, React.isValidElement)(renderElement) && renderElement.type === `html`;
  let defaultFont: Dynamic = useUiLinksAndFoundationUseSyncExternalStore2(
    font === undefined && inheritedFont === undefined && !isHtmlRoot,
  );
  let resolvedFont: Dynamic =
    font ?? inheritedFont ?? defaultFont ?? `anthropic`;
  let providerElement: Dynamic = useRender({
    render: renderElement,
    defaultTagName: `div`,
    ref: rootRef,
    props: {
      className: resolveUiDesignSystemValue2(
        `cds-root text-primary`,
        className,
      ),
      "data-density": resolvedDensity,
      "data-mode": themeMode,
      "data-platform": resolvedPlatform,
      "data-font": resolvedFont,
      "data-cds-fizzy-lake": fizzyLakeParts,
      "data-page-bg": resolvedPageBackground,
      style: {
        ...(!isHtmlRoot && {
          fontSize: `var(--cds-font-size-body)`,
        }),
        ...resolveUiProviderAndLayersCdsPageBg(resolvedSurfaceBackground),
        ...resolveUiProviderAndLayersCdsFontMonoOverride(resolvedMonoFont),
      },
      children: children,
    },
  });
  return (
    <UiProviderAndLayersComfortable.Provider value={resolvedDensity}>
      <UiProviderAndLayersCreateContext.Provider value={themeStore}>
        <UiProviderAndLayersCreateContext2.Provider value={resolvedPlatform}>
          <UiProviderAndLayersCreateContext3.Provider value={resolvedFont}>
            <UiProviderAndLayersCreateContext4.Provider
              value={resolvedMonoFont}
            >
              <UiProviderAndLayersCreateContext5.Provider
                value={resolvedPageBackground}
              >
                <UiProviderAndLayersCreateContext8.Provider
                  value={resolvedSurfaceBackground}
                >
                  <UiProviderAndLayersCreateContext9.Provider
                    value={resolvedLocale}
                  >
                    <UiLinksAndFoundationCreateContext.Provider
                      value={resolvedRouter}
                    >
                      <UiLinksAndFoundationCreateContext3.Provider
                        value={resolvedLabels}
                      >
                        <UiProviderAndLayersCreateContext6.Provider
                          value={naturalImageTiles}
                        >
                          <UiProviderAndLayersCreateContext7.Provider
                            value={densityOverride}
                          >
                            <UiDesignSystemCreateContext.Provider
                              value={themeOverrides}
                            >
                              <UiLinksAndFoundationCreateContext2.Provider
                                value={fizzyLakeParts}
                              >
                                {providerElement}
                              </UiLinksAndFoundationCreateContext2.Provider>
                            </UiDesignSystemCreateContext.Provider>
                          </UiProviderAndLayersCreateContext7.Provider>
                        </UiProviderAndLayersCreateContext6.Provider>
                      </UiLinksAndFoundationCreateContext3.Provider>
                    </UiLinksAndFoundationCreateContext.Provider>
                  </UiProviderAndLayersCreateContext9.Provider>
                </UiProviderAndLayersCreateContext8.Provider>
              </UiProviderAndLayersCreateContext5.Provider>
            </UiProviderAndLayersCreateContext4.Provider>
          </UiProviderAndLayersCreateContext3.Provider>
        </UiProviderAndLayersCreateContext2.Provider>
      </UiProviderAndLayersCreateContext.Provider>
    </UiProviderAndLayersComfortable.Provider>
  );
}

function resolveUiProviderAndLayersValue2(
  uiProviderAndLayersValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return uiProviderAndLayersValue2?.nodeType === 1
    ? uiProviderAndLayersValue2
    : null;
}

var uiProviderAndLayersValue100: number;

var uiProviderAndLayersValue9000: number;

var UiProviderAndLayersCreateContext13: Dynamic;

function CdsLayer(
  { children: children, base: base, render: render }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let useContext: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext13,
  );
  let zIndex: Dynamic = base ?? useContext + uiProviderAndLayersValue100;
  let cloneElement: Dynamic =
    render === undefined
      ? null
      : (0, React.cloneElement)(
          render,
          {
            "data-cds": render.props[`data-cds`] ?? `CdsLayer`,
            style: {
              ...render.props.style,
              zIndex: zIndex,
              "--cds-layer-base": zIndex,
            },
          },
          children,
        );
  return (
    <UiProviderAndLayersCreateContext13.Provider value={zIndex}>
      {cloneElement ?? children}
    </UiProviderAndLayersCreateContext13.Provider>
  );
}

var UiProviderAndLayersModal: Dynamic;

var UiProviderAndLayersStyles2: string;

function warnInvalidLayerOffset(
  warnInvalidLayer?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    Number.isInteger(options) &&
    options >= 0 &&
    options < uiProviderAndLayersValue100
  )
    return;
  let label = `cds: ${warnInvalidLayer} — value must be an integer in [0, ${uiProviderAndLayersValue100}). A non-integer is silently invalid as a z-index (the declaration is dropped and the element falls to z-auto); anything outside the range escapes its band and stacks unpredictably against other overlays.`;
  console.warn(label);
}

function resolveUiProviderAndLayersValue3(
  uiProviderAndLayersValue3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveUiProviderAndLayersBase2(uiProviderAndLayersValue3);
}

function resolveUiProviderAndLayersBase2(
  uiProviderAndLayersBase2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let base: Dynamic = (0, React.useContext)(UiProviderAndLayersCreateContext13);
  if (options === undefined) {
    let base2: Dynamic = base + uiProviderAndLayersValue100;
    let zIndex2: Dynamic =
      base2 + UiProviderAndLayersModal[uiProviderAndLayersBase2];
    return {
      base: base2,
      style: {
        zIndex: zIndex2,
        "--cds-layer-base": base2,
      },
      portalProps: {
        className: UiProviderAndLayersStyles2,
        style: {
          "--cds-portal-z": zIndex2,
          "--cds-layer-base": base2,
        },
      },
    };
  }
  warnInvalidLayerOffset(`layerOffset=${options}`, options);
  let zIndex: Dynamic = base + options;
  return {
    base: base,
    style: {
      zIndex: zIndex,
      "--cds-layer-base": base,
    },
    portalProps: {
      className: UiProviderAndLayersStyles2,
      style: {
        "--cds-portal-z": zIndex,
        "--cds-layer-base": base,
      },
    },
  };
}

function resolveUiProviderAndLayersUseContext11(
  uiProviderAndLayersUseContext11?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext13,
  );
  warnInvalidLayerOffset(
    `useCdsLayerAwareZIndex(${uiProviderAndLayersUseContext11})`,
    uiProviderAndLayersUseContext11,
  );
  return useContext + uiProviderAndLayersUseContext11;
}

function CdsLayerVarBridge(
  { children: children, className: className }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let cdsLayerBase: Dynamic = (0, React.useContext)(
    UiProviderAndLayersCreateContext13,
  );
  return (
    <div
      className={resolveUiDesignSystemValue2(`contents`, className)}
      data-cds={`CdsLayerVarBridge`}
      data-cds-layer-var-bridge={``}
      style={{
        "--cds-layer-base": cdsLayerBase,
      }}
    >
      {children}
    </div>
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiProviderAndLayersStep1(): void {
  (UiProviderAndLayersCompact = {
    compact: 2,
    comfortable: 4,
  });
  (UiProviderAndLayersBase = {
    xs: -2,
    sm: -1,
    base: 0,
    lg: 1,
  });
  (UiProviderAndLayersComfortable = (0, React.createContext)(
    `comfortable`,
  ));
  (UiProviderAndLayersState = UiProviderAndLayersComfortable);
  (UiProviderAndLayersCreateContext = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersSetElement = {
    setElement: (..._extraArguments: unknown[]): undefined => undefined,
    subscribe:
      (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined =>
        undefined,
    getSnapshot: (..._extraArguments: unknown[]): undefined => undefined,
    getServerSnapshot: (..._extraArguments: unknown[]): undefined => undefined,
    getAttrSnapshot: (..._extraArguments: unknown[]): undefined => undefined,
    getServerAttrSnapshot: (..._extraArguments: unknown[]): undefined =>
      undefined,
    getSettingSnapshot: (..._extraArguments: unknown[]): undefined => undefined,
    getServerSettingSnapshot: (..._extraArguments: unknown[]): undefined =>
      undefined,
  });
  (UiProviderAndLayersStyles = `(prefers-color-scheme: dark)`);
  (resolveUiProviderAndLayersDark = (
    uiProviderAndLayersDark?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    uiProviderAndLayersDark === `dark` || uiProviderAndLayersDark === `light`
      ? uiProviderAndLayersDark
      : uiProviderAndLayersDark === `auto` || uiProviderAndLayersDark === `system`
        ? `system`
        : undefined);
  (UiProviderAndLayersCreateContext2 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext3 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext4 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext5 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext6 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext7 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext8 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext9 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext10 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext11 = (0, React.createContext)(
    undefined,
  ));
  (UiProviderAndLayersCreateContext12 = (0, React.createContext)(
    false,
  ));
  (UiProviderAndLayersState2 = Object.fromEntries(
    uiLinksAndFoundationRedOrangeYellowGreenValues.map(
      (
        uiLinksAndFoundationRedOrangeYellowGreenValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) => [
        `--cds-bg-tint-${uiLinksAndFoundationRedOrangeYellowGreenValue}`,
        `var(--cds-bg-tint-${uiLinksAndFoundationRedOrangeYellowGreenValue}-opaque)`,
      ],
    ),
  ));
  (uiProviderAndLayersSet = new (Set as Dynamic)([
    `surface-0`,
    `surface-1`,
    `surface-2`,
    `surface-3`,
    `fill-accent`,
  ]));
  (uiProviderAndLayersValue100 = 100);
  (uiProviderAndLayersValue9000 = 9e3);
  (UiProviderAndLayersCreateContext13 = (0, React.createContext)(0));
  (CdsLayer as Dynamic).displayName = `CdsLayer`;
  (UiProviderAndLayersModal = {
    modal: 40,
    tooltip: 30,
    contextmenu: 30,
    popover: 20,
    menu: 20,
    combobox: 20,
    coachmark: 10,
  });
  (UiProviderAndLayersStyles2 = `[&>*]:z-[var(--cds-portal-z)]`);
  (CdsLayerVarBridge as Dynamic).displayName = `CdsLayerVarBridge`;
}

export {
  CdsLayer,
  UiProviderAndLayersCreateContext12,
  UiProviderAndLayersCreateContext13,
  UiProviderAndLayersCreateContext8,
  UiProviderAndLayersDensity,
  UiProviderAndLayersState,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersCdsFontMonoOverride,
  resolveUiProviderAndLayersCdsPageBg,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersLight,
  resolveUiProviderAndLayersUseContext,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext11,
  resolveUiProviderAndLayersUseContext2,
  resolveUiProviderAndLayersUseContext3,
  resolveUiProviderAndLayersUseContext4,
  resolveUiProviderAndLayersUseContext5,
  resolveUiProviderAndLayersUseContext6,
  resolveUiProviderAndLayersUseContext7,
  resolveUiProviderAndLayersUseContext8,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiProviderAndLayersValue3,
  uiProviderAndLayersValue9000,
  useUiProviderAndLayersComfortable,
  useUiProviderAndLayersUseContext,
};

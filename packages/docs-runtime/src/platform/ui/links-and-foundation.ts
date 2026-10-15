/** BaoCut: ui links and foundation from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  preloadTImport,
} from "../dependencies";
import {
  collectObservabilityTelemetryValue,
} from "../observability/telemetry-1";
import {
  resolvePlatformLoadingAndStatusResolve,
} from "../services/loading-and-status";

var uiLinksAndFoundationPattern: RegExp;

function resolveUiLinksAndFoundationDesktop(..._extraArguments: unknown[]) {
  return typeof navigator === "undefined"
    ? `web`
    : uiLinksAndFoundationPattern.test(navigator.userAgent)
      ? `desktop`
      : `web`;
}

var uiLinksAndFoundationPattern2: RegExp;

function resolveUiLinksAndFoundationReplace(
  uiLinksAndFoundationReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = uiLinksAndFoundationReplace.replace(
    uiLinksAndFoundationPattern2,
    ``,
  );
  let index = 0;
  let replaceCount: Dynamic = replace.length;
  for (; index < replaceCount && replace.charCodeAt(index) <= 32; ) index++;
  for (; replaceCount > index && replace.charCodeAt(replaceCount - 1) <= 32; )
    replaceCount--;
  return index === 0 && replaceCount === replace.length
    ? replace
    : replace.slice(index, replaceCount);
}

function resolveUiLinksAndFoundationValue(
  uiLinksAndFoundationValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    options === `#` &&
    uiLinksAndFoundationValue !== undefined &&
    resolveUiLinksAndFoundationReplace(uiLinksAndFoundationValue) !== `#`
  );
}

var uiLinksAndFoundationSet: Dynamic;

var uiLinksAndFoundationPattern3: RegExp;

function isUiLinksAndFoundationToLowerCase(
  uiLinksAndFoundation?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    !!uiLinksAndFoundation &&
    !uiLinksAndFoundationSet.has(uiLinksAndFoundation.toLowerCase())
  );
}

function filterUiLinksAndFoundationOpener(
  filterUiLinksAndFoundationOpener2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isUiLinksAndFoundationToLowerCase(filterUiLinksAndFoundationOpener2))
    return options ?? undefined;
  if (options == null) return context();
  let filteredOptionsParts: Dynamic = options
    .split(/\s+/)
    .filter(
      (optionsPart?: Dynamic, ..._extraArguments: unknown[]) =>
        optionsPart !== `` && optionsPart.toLowerCase() !== `opener`,
    );
  if (
    !filteredOptionsParts.some(
      (filteredOptionsPart?: Dynamic, ..._extraArguments: unknown[]) =>
        uiLinksAndFoundationPattern3.test(filteredOptionsPart),
    )
  ) {
    filteredOptionsParts.push(`noopener`);
  }
  return filteredOptionsParts.join(` `);
}

var UiLinksAndFoundationCreateContext: Dynamic;

function resolveUiLinksAndFoundationUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiLinksAndFoundationCreateContext);
}

function resolveUiLinksAndFoundationItContainsAControlCharacter(
  uiLinksAndFoundationItContainsAControlCharacter?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!uiLinksAndFoundationItContainsAControlCharacter)
    return uiLinksAndFoundationItContainsAControlCharacter;
  let uiLinksAndFoundationReplace: Dynamic = resolveUiLinksAndFoundationReplace(
    uiLinksAndFoundationItContainsAControlCharacter,
  );
  return uiLinksAndFoundationPattern4.test(uiLinksAndFoundationReplace)
    ? resolveUiLinksAndFoundationValue2(
        uiLinksAndFoundationReplace,
        `it contains a control character`,
      )
    : uiLinksAndFoundationPattern5.test(uiLinksAndFoundationReplace)
      ? resolveUiLinksAndFoundationValue2(
          uiLinksAndFoundationReplace,
          `it starts with whitespace the browser keeps`,
        )
      : uiLinksAndFoundationPattern15.test(uiLinksAndFoundationReplace)
        ? uiLinksAndFoundationReplace.startsWith(`//`)
          ? uiLinksAndFoundationReplace
          : uiLinksAndFoundationPattern12.test(uiLinksAndFoundationReplace)
            ? isUiLinksAndFoundationPackage(uiLinksAndFoundationReplace)
              ? uiLinksAndFoundationReplace
              : resolveUiLinksAndFoundationValue2(
                  uiLinksAndFoundationReplace,
                  `only an Anthropic Android app's own sign-in intent: shape is followed`,
                )
            : uiLinksAndFoundationPattern13.test(uiLinksAndFoundationReplace)
              ? resolveUiLinksAndFoundationTest(uiLinksAndFoundationReplace)
                ? uiLinksAndFoundationReplace
                : resolveUiLinksAndFoundationValue2(
                    uiLinksAndFoundationReplace,
                    `only an Anthropic extension's marketplace page or a VS Code settings link is followed`,
                  )
              : uiLinksAndFoundationUrlPattern.test(uiLinksAndFoundationReplace)
                ? uiLinksAndFoundationReplace
                : resolveUiLinksAndFoundationValue2(
                    uiLinksAndFoundationReplace,
                    `its scheme is not one CDS links navigate`,
                  )
        : collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse(
            uiLinksAndFoundationReplace,
          );
}

function resolveUiLinksAndFoundationValue2(
  uiLinksAndFoundationValue2?: unknown,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  return `#`;
}

function collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse(
  collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let test = uiLinksAndFoundationPattern6.test(
    collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
  );
  try {
    let url = new URL(
      collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
      UiLinksAndFoundationHttpsCdsRelativeHrefInvalid,
    );
    let total = url.pathname.replace(/^\/{2,}/, `/`) + url.search + url.hash;
    if (
      test ||
      url.origin !== UiLinksAndFoundationHttpsCdsRelativeHrefInvalid ||
      url.pathname.startsWith(`//`)
    ) {
      if (!test) {
        url.origin;
      }
      return total;
    }
    if (
      isUiLinksAndFoundationTest(
        collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
      )
    )
      return total;
    let uiLinksAndFoundationSearch: Dynamic = resolveUiLinksAndFoundationSearch(
      collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
    );
    if (
      uiLinksAndFoundationPattern8.test(
        collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
      ) &&
      uiLinksAndFoundationPattern11.test(uiLinksAndFoundationSearch) &&
      !url.pathname.startsWith(`//`)
    ) {
      let mappedReplaceAllPartsText: Dynamic = uiLinksAndFoundationSearch
        .replaceAll(`\\`, `/`)
        .split(`/`)
        .map(
          (replaceAllPart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uiLinksAndFoundationPattern10.test(replaceAllPart)
              ? replaceAllPart.replace(/%2e/gi, `.`)
              : replaceAllPart,
        )
        .join(`/`);
      if (mappedReplaceAllPartsText !== uiLinksAndFoundationSearch)
        return (
          mappedReplaceAllPartsText +
          collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2.slice(
            uiLinksAndFoundationSearch.length,
          )
        );
    }
  } catch {
    if (test)
      return resolveUiLinksAndFoundationValue2(
        collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2,
        `it names a host this URL parser cannot parse`,
      );
  }
  return collectUiLinksAndFoundationItNamesAHostThisURLParserCannotParse2;
}

var uiLinksAndFoundationPattern4: RegExp;

var uiLinksAndFoundationPattern5: RegExp;

var uiLinksAndFoundationPattern6: RegExp;

var uiLinksAndFoundationPattern7: RegExp;

var uiLinksAndFoundationPattern8: RegExp;

var uiLinksAndFoundationPattern9: RegExp;

var uiLinksAndFoundationPattern10: RegExp;

var uiLinksAndFoundationPattern11: RegExp;

function isUiLinksAndFoundationTest(
  uiLinksAndFoundationTest?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!uiLinksAndFoundationPattern7.test(uiLinksAndFoundationTest))
    return false;
  let uiLinksAndFoundationSearch: Dynamic = resolveUiLinksAndFoundationSearch(
    uiLinksAndFoundationTest,
  );
  return (
    uiLinksAndFoundationSearch.includes(`\\`) ||
    uiLinksAndFoundationPattern9.test(uiLinksAndFoundationSearch)
  );
}

function resolveUiLinksAndFoundationSearch(
  uiLinksAndFoundationSearch?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let search: Dynamic = uiLinksAndFoundationSearch.search(/[?#]/);
  return search < 0
    ? uiLinksAndFoundationSearch
    : uiLinksAndFoundationSearch.slice(0, search);
}

var uiLinksAndFoundationUrlPattern: RegExp;

var uiLinksAndFoundationPattern12: RegExp;

var uiLinksAndFoundationPattern13: RegExp;

var uiLinksAndFoundationPattern14: RegExp;

function resolveUiLinksAndFoundationTest(
  uiLinksAndFoundationTest?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return uiLinksAndFoundationPattern14.test(
    uiLinksAndFoundationTest.replace(
      uiLinksAndFoundationPattern13,
      (
        uiLinksAndFoundationTest2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => uiLinksAndFoundationTest2.toLowerCase(),
    ),
  );
}

var uiLinksAndFoundationSet2: Dynamic;

function isUiLinksAndFoundationPackage(
  uiLinksAndFoundationPackage?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!uiLinksAndFoundationPattern12.test(uiLinksAndFoundationPackage))
    return false;
  let uiLinksAndFoundationPackageIndex: Dynamic =
    uiLinksAndFoundationPackage.indexOf(`#`);
  if (
    uiLinksAndFoundationPackageIndex < 0 ||
    uiLinksAndFoundationPackage.indexOf(
      `#`,
      uiLinksAndFoundationPackageIndex + 1,
    ) >= 0
  )
    return false;
  let uiLinksAndFoundationPackageSlice: Dynamic =
    uiLinksAndFoundationPackage.slice(uiLinksAndFoundationPackageIndex + 1);
  if (
    !uiLinksAndFoundationPackageSlice.startsWith(`Intent;`) ||
    !uiLinksAndFoundationPackageSlice.endsWith(`;end`)
  )
    return false;
  let uiLinksAndFoundationPackageSliceSlice: Dynamic =
    uiLinksAndFoundationPackageSlice.slice(7, -4);
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let isUiLinksAndFoundationPackageResult of uiLinksAndFoundationPackageSliceSlice.split(
    `;`,
  ) as Dynamic) {
    let isUiLinksAndFoundationPackageResultIndex: Dynamic =
      isUiLinksAndFoundationPackageResult.indexOf(`=`);
    if (isUiLinksAndFoundationPackageResultIndex <= 0) return false;
    let isUiLinksAndFoundationPackageResultSlice: Dynamic =
      isUiLinksAndFoundationPackageResult.slice(
        0,
        isUiLinksAndFoundationPackageResultIndex,
      );
    if (
      lookup.has(isUiLinksAndFoundationPackageResultSlice) ||
      !uiLinksAndFoundationSet2.has(isUiLinksAndFoundationPackageResultSlice)
    )
      return false;
    lookup.set(
      isUiLinksAndFoundationPackageResultSlice,
      isUiLinksAndFoundationPackageResult.slice(
        isUiLinksAndFoundationPackageResultIndex + 1,
      ),
    );
  }
  let lookupEntry: Dynamic = lookup.get(`package`);
  if (
    lookupEntry === undefined ||
    !uiLinksAndFoundationSet3.has(lookupEntry) ||
    lookup.get(`scheme`) !== `https`
  )
    return false;
  let lookupEntry2: Dynamic = lookup.get(`S.browser_fallback_url`);
  if (lookupEntry2 === undefined) return true;
  try {
    return new URL(decodeURIComponent(lookupEntry2)).protocol === `https:`;
  } catch {
    return false;
  }
}

var uiLinksAndFoundationPattern15: RegExp;

var uiLinksAndFoundationClaudeAiClaudeComAnthropicComValues: string[];

var uiLinksAndFoundationSet3: Dynamic;

var UiLinksAndFoundationHttpsCdsRelativeHrefInvalid: string;

var UiLinksAndFoundationHttpCdsRelativeHrefInvalid: string;

function resolveUiLinksAndFoundationOther(
  uiLinksAndFoundationOther?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveUiLinksAndFoundationOtherResult: Dynamic;
  try {
    resolveUiLinksAndFoundationOtherResult = new URL(
      uiLinksAndFoundationOther,
      options,
    );
  } catch {
    return `other`;
  }
  if (resolveUiLinksAndFoundationOtherResult.origin === options)
    return `relative`;
  if (
    resolveUiLinksAndFoundationOtherResult.protocol !== `https:` &&
    resolveUiLinksAndFoundationOtherResult.protocol !== `http:`
  )
    return `other`;
  let hostname: Dynamic = resolveUiLinksAndFoundationOtherResult.hostname;
  return uiLinksAndFoundationClaudeAiClaudeComAnthropicComValues.some(
    (
      uiLinksAndFoundationClaudeAiClaudeComAnthropicComValue?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      hostname === uiLinksAndFoundationClaudeAiClaudeComAnthropicComValue ||
      hostname.endsWith(
        `.` + uiLinksAndFoundationClaudeAiClaudeComAnthropicComValue,
      ),
  )
    ? `first-party`
    : `other`;
}

function isUiLinksAndFoundationOther(
  uiLinksAndFoundationOther?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!uiLinksAndFoundationOther) return false;
  let uiLinksAndFoundationOther2 = resolveUiLinksAndFoundationOther(
    uiLinksAndFoundationOther,
    UiLinksAndFoundationHttpsCdsRelativeHrefInvalid,
  );
  return (
    uiLinksAndFoundationOther2 !== `other` &&
    uiLinksAndFoundationOther2 ===
      resolveUiLinksAndFoundationOther(
        uiLinksAndFoundationOther,
        UiLinksAndFoundationHttpCdsRelativeHrefInvalid,
      )
  );
}

function resolveUiLinksAndFoundationNoopener(
  uiLinksAndFoundationNoopener?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return isUiLinksAndFoundationOther(uiLinksAndFoundationNoopener)
    ? `noopener`
    : `noopener noreferrer`;
}

function resolveUiLinksAndFoundationNoreferrer(
  uiLinksAndFoundationNoreferrer?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let uiLinksAndFoundationItContainsAControlCharacter: Dynamic =
    resolveUiLinksAndFoundationItContainsAControlCharacter(
      uiLinksAndFoundationNoreferrer,
    );
  return isUiLinksAndFoundationToLowerCase(options)
    ? resolveUiLinksAndFoundationNoopener(
        uiLinksAndFoundationItContainsAControlCharacter,
      )
    : isUiLinksAndFoundationOther(
          uiLinksAndFoundationItContainsAControlCharacter,
        )
      ? undefined
      : `noreferrer`;
}

function isUiLinksAndFoundationNull(
  uiLinksAndFoundationNull?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (typeof window === "undefined") return false;
  try {
    let url = new URL(uiLinksAndFoundationNull, window.location.href);
    return (
      url.origin !== `null` &&
      url.protocol === window.location.protocol &&
      url.origin === window.location.origin
    );
  } catch {
    return false;
  }
}

function isUiLinksAndFoundationRouter(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !event.router ||
    !event.href ||
    event.href.startsWith(`#`) ||
    (event.target && event.target.toLowerCase() !== `_self`) ||
    (event.download !== null &&
      event.download !== undefined &&
      event.download !== false)
    ? false
    : isUiLinksAndFoundationNull(event.href);
}

function resolveUiLinksAndFoundationTest2(
  uiLinksAndFoundationTest2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!uiLinksAndFoundationPattern15.test(uiLinksAndFoundationTest2))
    return uiLinksAndFoundationTest2;
  let url = new URL(uiLinksAndFoundationTest2, window.location.href);
  return url.pathname.replace(/^\/{2,}/, `/`) + url.search + url.hash;
}

function resolveUiLinksAndFoundationDefaultPrevented(
  uiLinksAndFoundationDefaultPrevented?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    uiLinksAndFoundationDefaultPrevented.defaultPrevented ||
    uiLinksAndFoundationDefaultPrevented.button !== 0 ||
    uiLinksAndFoundationDefaultPrevented.metaKey ||
    uiLinksAndFoundationDefaultPrevented.ctrlKey ||
    uiLinksAndFoundationDefaultPrevented.shiftKey ||
    uiLinksAndFoundationDefaultPrevented.altKey
  );
}

var uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues: string[];

function resolveUiLinksAndFoundationValue3(
  uiLinksAndFoundationValue3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiLinksAndFoundationValue32: Dynamic = uiLinksAndFoundationValue3;
  let record2: Dynamic = {};
  for (let resolveUiLinksAndFoundationValue3Result of uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues as Dynamic)
    if (
      uiLinksAndFoundationValue32[resolveUiLinksAndFoundationValue3Result] !==
      undefined
    ) {
      record2[resolveUiLinksAndFoundationValue3Result] =
        uiLinksAndFoundationValue32[resolveUiLinksAndFoundationValue3Result];
    }
  return record2;
}

function resolveUiLinksAndFoundationValue4(
  uiLinksAndFoundationValue4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    ...uiLinksAndFoundationValue4,
  };
  for (let resolveUiLinksAndFoundationValue4Result of uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues as Dynamic)
    delete record2[resolveUiLinksAndFoundationValue4Result];
  return record2;
}

var UiLinksAndFoundationState: Dynamic;

var UiLinksAndFoundationKeys: string[];

function resolveUiLinksAndFoundationDefaultPrevented2(
  uiLinksAndFoundationDefaultPrevented2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options
    ? (
        uiLinksAndFoundationDefaultPrevented22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        uiLinksAndFoundationDefaultPrevented2?.(
          uiLinksAndFoundationDefaultPrevented22,
        );
        if (
          !context ||
          !uiLinksAndFoundationDefaultPrevented22.defaultPrevented
        ) {
          options(uiLinksAndFoundationDefaultPrevented22);
        }
      }
    : uiLinksAndFoundationDefaultPrevented2;
}

function resolveUiLinksAndFoundationHref(
  {
    href: href,
    routerOptions: routerOptions,
    target: target,
    rel: rel,
    download: download,
    onClick: onClick,
    onPointerEnter: onPointerEnter,
    onPointerLeave: onPointerLeave,
    onPointerDown: onPointerDown,
    onFocus: onFocus,
    onBlur: onBlur,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  "use no memo";
  let uiLinksAndFoundationUseContext: Dynamic =
    resolveUiLinksAndFoundationUseContext();
  let href2: Dynamic =
    resolveUiLinksAndFoundationItContainsAControlCharacter(href);
  let uiLinksAndFoundationValue = resolveUiLinksAndFoundationValue(href, href2);
  let target2: Dynamic = uiLinksAndFoundationValue ? undefined : target;
  let download2: Dynamic = uiLinksAndFoundationValue ? undefined : download;
  let href3: Dynamic =
    uiLinksAndFoundationUseContext?.resolveHref &&
    href2 &&
    !href2.startsWith(`#`) &&
    !uiLinksAndFoundationPattern15.test(href2)
      ? uiLinksAndFoundationUseContext.resolveHref(href2)
      : href2;
  let router = uiLinksAndFoundationUseContext !== undefined;
  let resolveUiLinksAndFoundationTest22: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let record2: Dynamic = {
        href: href2,
        target: target2,
        download: download2,
        router: router,
      };
      return isUiLinksAndFoundationRouter(record2)
        ? resolveUiLinksAndFoundationTest2(record2.href)
        : undefined;
    },
    [href2, target2, download2, router],
  );
  let onClick2: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      onClick?.(event);
      if (
        !(
          resolveUiLinksAndFoundationDefaultPrevented(event) ||
          resolveUiLinksAndFoundationTest22 === undefined ||
          !uiLinksAndFoundationUseContext
        )
      ) {
        event.preventDefault();
        uiLinksAndFoundationUseContext.navigate(
          resolveUiLinksAndFoundationTest22,
          routerOptions,
        );
      }
    },
    [
      onClick,
      resolveUiLinksAndFoundationTest22,
      uiLinksAndFoundationUseContext,
      routerOptions,
    ],
  );
  let intentHandlers: Dynamic = uiLinksAndFoundationUseContext?.intentHandlers;
  let intentHandlers2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      intentHandlers && resolveUiLinksAndFoundationTest22 !== undefined
        ? intentHandlers(resolveUiLinksAndFoundationTest22)
        : undefined,
    [intentHandlers, resolveUiLinksAndFoundationTest22],
  );
  let resolveUiLinksAndFoundationDefaultPrevented22: Dynamic = (0,
  React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let record2: Dynamic = {
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave,
        onPointerDown: onPointerDown,
        onFocus: onFocus,
        onBlur: onBlur,
      };
      let record3: Dynamic = {};
      for (let resolveUiLinksAndFoundationHrefResult of UiLinksAndFoundationKeys as Dynamic) {
        let uiLinksAndFoundationDefaultPrevented2: Dynamic =
          resolveUiLinksAndFoundationDefaultPrevented2(
            record2[resolveUiLinksAndFoundationHrefResult],
            intentHandlers2?.[resolveUiLinksAndFoundationHrefResult],
            UiLinksAndFoundationState[resolveUiLinksAndFoundationHrefResult],
          );
        if (uiLinksAndFoundationDefaultPrevented2) {
          record3[resolveUiLinksAndFoundationHrefResult] =
            uiLinksAndFoundationDefaultPrevented2;
        }
      }
      return record3;
    },
    [
      intentHandlers2,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onFocus,
      onBlur,
    ],
  );
  return {
    href: href3,
    target: target2,
    rel: filterUiLinksAndFoundationOpener(
      target2,
      rel,
      (..._extraArguments: unknown[]) =>
        resolveUiLinksAndFoundationNoopener(href3),
    ),
    download: download2,
    onClick: onClick2,
    ...resolveUiLinksAndFoundationDefaultPrevented22,
  };
}

function resolveUiLinksAndFoundationWindow(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return element?.ownerDocument.defaultView ?? (globalThis as Dynamic).window;
}

function resolveUiLinksAndFoundationIsConnected(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    element !== undefined &&
    (!element.isConnected || element.ownerDocument.defaultView === null)
  );
}

function resolveUiLinksAndFoundationValue5(
  uiLinksAndFoundationValue5?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveUiLinksAndFoundationIsConnected(uiLinksAndFoundationValue5))
    return resolveUiLinksAndFoundationWindow(uiLinksAndFoundationValue5);
}

var uiLinksAndFoundationRedOrangeYellowGreenValues: string[];

var UiLinksAndFoundationStyles: string;

var uiLinksAndFoundationWeakMap: Dynamic;

function updateUiLinksAndFoundationSubscribe(
  updateUiLinksAndFoundationSubscribe2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof updateUiLinksAndFoundationSubscribe2.matchMedia != `function`)
    return null;
  let uiLinksAndFoundationWeakMapEntry: Dynamic =
    uiLinksAndFoundationWeakMap.get(updateUiLinksAndFoundationSubscribe2);
  if (uiLinksAndFoundationWeakMapEntry === undefined) {
    uiLinksAndFoundationWeakMapEntry = new (Map as Dynamic)();
    uiLinksAndFoundationWeakMap.set(
      updateUiLinksAndFoundationSubscribe2,
      uiLinksAndFoundationWeakMapEntry,
    );
  }
  let uiLinksAndFoundationWeakMapEntryEntry: Dynamic =
    uiLinksAndFoundationWeakMapEntry.get(options);
  if (uiLinksAndFoundationWeakMapEntryEntry === undefined) {
    let matchMedia: Dynamic =
      updateUiLinksAndFoundationSubscribe2.matchMedia(options);
    uiLinksAndFoundationWeakMapEntryEntry = {
      subscribe: (
        updateUiLinksAndFoundationSubscribe3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (
        matchMedia.addEventListener(
          `change`,
          updateUiLinksAndFoundationSubscribe3,
        ),
        (..._extraArguments: unknown[]): Dynamic =>
          matchMedia.removeEventListener(
            `change`,
            updateUiLinksAndFoundationSubscribe3,
          )
      ),
      getSnapshot: (..._extraArguments: unknown[]): Dynamic =>
        matchMedia.matches,
    };
    uiLinksAndFoundationWeakMapEntry.set(
      options,
      uiLinksAndFoundationWeakMapEntryEntry,
    );
  }
  return uiLinksAndFoundationWeakMapEntryEntry;
}

var resolveUiLinksAndFoundationValue6: Dynamic;

var isUiLinksAndFoundationValue: (..._extraArguments: unknown[]) => boolean;

function useUiLinksAndFoundationUseSyncExternalStore(
  uiLinksAndFoundationUseSyncExternalStore?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let updateUiLinksAndFoundationSubscribe2: Dynamic =
    uiLinksAndFoundationUseSyncExternalStore == null
      ? null
      : updateUiLinksAndFoundationSubscribe(
          uiLinksAndFoundationUseSyncExternalStore,
          options,
        );
  return (0, React.useSyncExternalStore)(
    updateUiLinksAndFoundationSubscribe2 === null
      ? resolveUiLinksAndFoundationValue6
      : updateUiLinksAndFoundationSubscribe2.subscribe,
    updateUiLinksAndFoundationSubscribe2 === null
      ? isUiLinksAndFoundationValue
      : updateUiLinksAndFoundationSubscribe2.getSnapshot,
    isUiLinksAndFoundationValue,
  );
}

var UiLinksAndFoundationStyles2: string;

function resolveUiLinksAndFoundationValue7(
  uiLinksAndFoundationValue7?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    uiLinksAndFoundationValue7 ??
    (typeof window === "undefined" ? undefined : window)
  );
}

var uiLinksAndFoundationWeakMap2: Dynamic;

function installUiLinksAndFoundationChange(
  installUiLinksAndFoundationChange2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  installUiLinksAndFoundationChange2.addEventListener?.(`change`, options);
}

function resolveUiLinksAndFoundationChange(
  uiLinksAndFoundationChange?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  uiLinksAndFoundationChange.removeEventListener?.(`change`, options);
}

function resolveUiLinksAndFoundationFrom(
  uiLinksAndFoundation?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let items: Dynamic = [];
  for (let resolveUiLinksAndFoundationFromResult of Array.from<Dynamic>(
    uiLinksAndFoundation,
  ) as Dynamic)
    try {
      if (uiLinksAndFoundation.has(resolveUiLinksAndFoundationFromResult)) {
        resolveUiLinksAndFoundationFromResult();
      }
    } catch (resolveUiLinksAndFoundationFromResult2: Dynamic) {
      items.push(resolveUiLinksAndFoundationFromResult2);
    }
  if (items.length > 0) throw items[0];
}

function updateUiLinksAndFoundationSource(
  updateUiLinksAndFoundationSource2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let subscribers: Dynamic = options?.subscribers ?? new (Set as Dynamic)();
  let list: Dynamic = updateUiLinksAndFoundationSource2.matchMedia(
    UiLinksAndFoundationStyles2,
  );
  let record2: Dynamic = {
    source: updateUiLinksAndFoundationSource2.matchMedia,
    list: list,
    coarse: list.matches,
    subscribers: subscribers,
    onListChange: (..._extraArguments: unknown[]): undefined => {
      record2.coarse = list.matches;
      resolveUiLinksAndFoundationFrom(subscribers);
    },
  };
  if (subscribers.size > 0) {
    if (options !== undefined) {
      resolveUiLinksAndFoundationChange(options.list, options.onListChange);
    }
    installUiLinksAndFoundationChange(list, record2.onListChange);
    if (options !== undefined && options.coarse !== record2.coarse) {
      queueMicrotask((..._extraArguments: unknown[]) =>
        resolveUiLinksAndFoundationFrom(subscribers),
      );
    }
  } else {
    queueMicrotask((..._extraArguments: unknown[]): undefined => {
      if (
        subscribers.size === 0 &&
        uiLinksAndFoundationWeakMap2.get(updateUiLinksAndFoundationSource2) ===
          record2
      ) {
        uiLinksAndFoundationWeakMap2.delete(updateUiLinksAndFoundationSource2);
      }
    });
  }
  uiLinksAndFoundationWeakMap2.set(updateUiLinksAndFoundationSource2, record2);
  return record2;
}

function isUiLinksAndFoundationSource(
  uiLinksAndFoundationSource?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiLinksAndFoundationValue7: Dynamic = resolveUiLinksAndFoundationValue7(
    uiLinksAndFoundationSource,
  );
  if (typeof uiLinksAndFoundationValue7?.matchMedia != `function`) return false;
  let uiLinksAndFoundationWeakMap2Entry: Dynamic =
    uiLinksAndFoundationWeakMap2.get(uiLinksAndFoundationValue7);
  return uiLinksAndFoundationWeakMap2Entry === undefined ||
    uiLinksAndFoundationWeakMap2Entry.source !==
      uiLinksAndFoundationValue7.matchMedia
    ? updateUiLinksAndFoundationSource(
        uiLinksAndFoundationValue7,
        uiLinksAndFoundationWeakMap2Entry,
      ).coarse
    : (uiLinksAndFoundationWeakMap2Entry.subscribers.size === 0 &&
        (uiLinksAndFoundationWeakMap2Entry.coarse =
          uiLinksAndFoundationWeakMap2Entry.list.matches),
      uiLinksAndFoundationWeakMap2Entry.coarse);
}

function clearUiLinksAndFoundationSubscribers(
  clearUiLinksAndFoundationSubscribers2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiLinksAndFoundationValue7: Dynamic =
    resolveUiLinksAndFoundationValue7(options);
  if (typeof uiLinksAndFoundationValue7?.matchMedia != `function`)
    return (..._extraArguments: unknown[]): undefined => undefined;
  let uiLinksAndFoundationWeakMap2Entry: Dynamic =
    uiLinksAndFoundationWeakMap2.get(uiLinksAndFoundationValue7);
  let uiLinksAndFoundationWeakMap2Entry2: Dynamic =
    uiLinksAndFoundationWeakMap2Entry !== undefined &&
    uiLinksAndFoundationWeakMap2Entry.source ===
      uiLinksAndFoundationValue7.matchMedia
      ? uiLinksAndFoundationWeakMap2Entry
      : updateUiLinksAndFoundationSource(
          uiLinksAndFoundationValue7,
          uiLinksAndFoundationWeakMap2Entry,
        );
  let { subscribers: uiLinksAndFoundationWeakMap2Entry3 }: Dynamic =
    uiLinksAndFoundationWeakMap2Entry2;
  if (uiLinksAndFoundationWeakMap2Entry3.size === 0) {
    installUiLinksAndFoundationChange(
      uiLinksAndFoundationWeakMap2Entry2.list,
      uiLinksAndFoundationWeakMap2Entry2.onListChange,
    );
    uiLinksAndFoundationWeakMap2Entry2.coarse =
      uiLinksAndFoundationWeakMap2Entry2.list.matches;
  }
  let clearUiLinksAndFoundationSubscribers3: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => clearUiLinksAndFoundationSubscribers2();
  uiLinksAndFoundationWeakMap2Entry3.add(clearUiLinksAndFoundationSubscribers3);
  return (..._extraArguments: unknown[]): undefined => {
    if (
      !uiLinksAndFoundationWeakMap2Entry3.delete(
        clearUiLinksAndFoundationSubscribers3,
      ) ||
      uiLinksAndFoundationWeakMap2Entry3.size > 0
    )
      return;
    let uiLinksAndFoundationWeakMap2Entry4: Dynamic =
      uiLinksAndFoundationWeakMap2.get(uiLinksAndFoundationValue7);
    if (
      uiLinksAndFoundationWeakMap2Entry4?.subscribers ===
      uiLinksAndFoundationWeakMap2Entry3
    ) {
      resolveUiLinksAndFoundationChange(
        uiLinksAndFoundationWeakMap2Entry4.list,
        uiLinksAndFoundationWeakMap2Entry4.onListChange,
      );
      uiLinksAndFoundationWeakMap2.delete(uiLinksAndFoundationValue7);
    }
  };
}

function resolveUiLinksAndFoundationValue8(
  uiLinksAndFoundationValue8?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof reportError == `function`) {
    reportError(uiLinksAndFoundationValue8);
  } else {
    queueMicrotask((..._extraArguments: unknown[]): undefined => {
      throw uiLinksAndFoundationValue8;
    });
  }
}

function resolveUiLinksAndFoundationValue9(
  uiLinksAndFoundationValue9?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    uiLinksAndFoundationValue9();
  } catch (resolveUiLinksAndFoundationValue9Result: Dynamic) {
    resolveUiLinksAndFoundationValue8(resolveUiLinksAndFoundationValue9Result);
  }
}

function isUiLinksAndFoundationObserver(
  uiLinksAndFoundationObserver?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let resolveUiLinksAndFoundationValue82 = (
    uiLinksAndFoundationObserver2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      enabled = true;
      resolveUiLinksAndFoundationValue8(uiLinksAndFoundationObserver2);
    }
  };
  let observer: Dynamic = null;
  try {
    observer = uiLinksAndFoundationObserver();
  } catch (isUiLinksAndFoundationObserverResult: Dynamic) {
    resolveUiLinksAndFoundationValue82(isUiLinksAndFoundationObserverResult);
  }
  return {
    observer: observer,
    attempt(
      uiLinksAndFoundationObserver2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (observer === null) return false;
      try {
        uiLinksAndFoundationObserver2(observer);
        return true;
      } catch (isUiLinksAndFoundationObserverResult: Dynamic) {
        resolveUiLinksAndFoundationValue82(
          isUiLinksAndFoundationObserverResult,
        );
        return false;
      }
    },
  };
}

function createSafeResizeObserver(
  safeResizeObserver?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isUiLinksAndFoundationObserver2: Dynamic = isUiLinksAndFoundationObserver(
    (..._extraArguments: unknown[]): Dynamic =>
      new (safeResizeObserver as Dynamic)(options),
  );
  return {
    observe: (
      safeResizeObserver2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isUiLinksAndFoundationObserver2.attempt(
        (
          safeResizeObserver3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          options2 === undefined
            ? safeResizeObserver3.observe(safeResizeObserver2)
            : safeResizeObserver3.observe(safeResizeObserver2, options2),
      ),
    unobserve: (
      safeResizeObserver2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isUiLinksAndFoundationObserver2.observer?.unobserve(safeResizeObserver2),
    disconnect: (..._extraArguments: unknown[]): Dynamic =>
      isUiLinksAndFoundationObserver2.observer?.disconnect(),
  };
}

function createSafeMutationObserver(
  safeMutationObserver?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isUiLinksAndFoundationObserver2: Dynamic = isUiLinksAndFoundationObserver(
    (..._extraArguments: unknown[]): Dynamic =>
      new (safeMutationObserver as Dynamic)(options),
  );
  return {
    observe: (
      safeMutationObserver2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isUiLinksAndFoundationObserver2.attempt(
        (
          safeMutationObserver3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          safeMutationObserver3.observe(safeMutationObserver2, options2),
      ),
    disconnect: (..._extraArguments: unknown[]): Dynamic =>
      isUiLinksAndFoundationObserver2.observer?.disconnect(),
    takeRecords: (..._extraArguments: unknown[]): Dynamic =>
      isUiLinksAndFoundationObserver2.observer?.takeRecords() ?? [],
  };
}

var UiLinksAndFoundationAnthropic: {
    anthropic: boolean;
    system: boolean;
};

var resolveUiLinksAndFoundationHasOwn: Dynamic;

var resolveUiLinksAndFoundationDataFont: Dynamic;

function resolveUiLinksAndFoundationSubscribe(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveUiLinksAndFoundationSubscribeResult: Dynamic;
  let enabled = false;
  let resolveUiLinksAndFoundationDataFont2 = (
    ..._extraArguments: unknown[]
  ) => {
    let resolveUiLinksAndFoundationSubscribeResult2: Dynamic =
      resolveUiLinksAndFoundationSubscribeResult;
    resolveUiLinksAndFoundationSubscribeResult =
      resolveUiLinksAndFoundationDataFont();
    enabled = true;
    return (
      resolveUiLinksAndFoundationSubscribeResult !==
      resolveUiLinksAndFoundationSubscribeResult2
    );
  };
  return {
    subscribe: (
      uiLinksAndFoundationSubscribe?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (typeof MutationObserver === "undefined")
        return (..._extraArguments: unknown[]): undefined => undefined;
      let safeMutationObserver: Dynamic = createSafeMutationObserver(
        MutationObserver,
        (..._extraArguments: unknown[]): undefined => {
          if (resolveUiLinksAndFoundationDataFont2()) {
            uiLinksAndFoundationSubscribe();
          }
        },
      );
      safeMutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [`data-font`],
      });
      if (resolveUiLinksAndFoundationDataFont2()) {
        queueMicrotask(uiLinksAndFoundationSubscribe);
      }
      return (..._extraArguments: unknown[]): undefined => {
        safeMutationObserver.disconnect();
        enabled = false;
      };
    },
    getSnapshot: (..._extraArguments: unknown[]): Dynamic => (
      enabled || resolveUiLinksAndFoundationDataFont2(),
      resolveUiLinksAndFoundationSubscribeResult
    ),
  };
}

var resolveUiLinksAndFoundationValue10: Dynamic;

var resolveUiLinksAndFoundationValue11: (..._extraArguments: unknown[]) => undefined;

function useUiLinksAndFoundationUseSyncExternalStore2(
  uiLinksAndFoundationUseSyncExternalStore2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [resolveUiLinksAndFoundationSubscribeState]: Dynamic = (0,
  React.useState)(resolveUiLinksAndFoundationSubscribe);
  return (0, React.useSyncExternalStore)(
    uiLinksAndFoundationUseSyncExternalStore2
      ? resolveUiLinksAndFoundationSubscribeState.subscribe
      : resolveUiLinksAndFoundationValue10,
    uiLinksAndFoundationUseSyncExternalStore2
      ? resolveUiLinksAndFoundationSubscribeState.getSnapshot
      : resolveUiLinksAndFoundationValue11,
    resolveUiLinksAndFoundationValue11,
  );
}

var UiLinksAndFoundationCreateContext2: Dynamic;

function resolveUiLinksAndFoundationUseContext2(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiLinksAndFoundationCreateContext2);
}

function resolveUiLinksAndFoundationJoin(
  uiLinksAndFoundationJoin?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!items?.length) return uiLinksAndFoundationJoin;
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    uiLinksAndFoundationJoin?.split(` `),
  );
  for (let resolveUiLinksAndFoundationJoinResult of items as Dynamic)
    uniqueItems.add(resolveUiLinksAndFoundationJoinResult);
  return [...uniqueItems].sort().join(` `);
}

var uiLinksAndFoundationWeakMap3: Dynamic;

var uiLinksAndFoundationSet4: Dynamic;

function updateUiLinksAndFoundationObservedInput(
  updateUiLinksAndFoundationObservedInput2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    updateUiLinksAndFoundationObservedInput2 === undefined ||
    uiLinksAndFoundationWeakMap3.has(updateUiLinksAndFoundationObservedInput2)
  )
    return;
  let record2 = {
    observedInput: false,
    lastInputDismissing: false,
  };
  uiLinksAndFoundationWeakMap3.set(
    updateUiLinksAndFoundationObservedInput2,
    record2,
  );
  let defaultView: Dynamic =
    updateUiLinksAndFoundationObservedInput2.defaultView ??
    updateUiLinksAndFoundationObservedInput2;
  defaultView.addEventListener(
    `keydown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (event.isTrusted) {
        record2.observedInput = true;
        record2.lastInputDismissing =
          !event.isComposing && uiLinksAndFoundationSet4.has(event.key);
      }
    },
    true,
  );
  defaultView.addEventListener(
    `pointerdown`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (event.isTrusted) {
        record2.observedInput = true;
        record2.lastInputDismissing = true;
      }
    },
    true,
  );
  updateUiLinksAndFoundationObservedInput2.defaultView?.addEventListener(
    `blur`,
    (..._extraArguments: unknown[]): undefined => {
      record2.observedInput = false;
      record2.lastInputDismissing = false;
    },
  );
}

function resolveUiLinksAndFoundationValue12(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  updateUiLinksAndFoundationObservedInput(element?.ownerDocument);
}

function isUiLinksAndFoundationRelatedTarget(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (event.relatedTarget !== null && event.relatedTarget !== undefined)
    return false;
  let ownerDocument2: Dynamic = event.target?.ownerDocument ?? undefined;
  let uiLinksAndFoundationWeakMap3Entry: Dynamic =
    ownerDocument2 == null
      ? undefined
      : uiLinksAndFoundationWeakMap3.get(ownerDocument2);
  return uiLinksAndFoundationWeakMap3Entry === undefined ||
    !uiLinksAndFoundationWeakMap3Entry.observedInput
    ? false
    : uiLinksAndFoundationWeakMap3Entry.lastInputDismissing;
}

var UiLinksAndFoundationState2: Dynamic;

var uiLinksAndFoundationValue_1: boolean;

var uiLinksAndFoundationValue0: Dynamic;

var uiLinksAndFoundationValue02: number;

var UiLinksAndFoundationState3: Dynamic;

var uiLinksAndFoundationSet5: Dynamic;

function clearUiLinksAndFoundationDelete(
  clearUiLinksAndFoundationDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  uiLinksAndFoundationSet5.add(clearUiLinksAndFoundationDelete2);
  return (..._extraArguments: unknown[]): undefined => {
    uiLinksAndFoundationSet5.delete(clearUiLinksAndFoundationDelete2);
  };
}

var resolveUiLinksAndFoundationValue13: Dynamic;

var resolveUiLinksAndFoundationValue14: (..._extraArguments: unknown[]) => boolean;

var resolveUiLinksAndFoundationValue15: Dynamic;

var resolveUiLinksAndFoundationValue16: (..._extraArguments: unknown[]) => null;

var isUiLinksAndFoundationValue2: (..._extraArguments: unknown[]) => boolean;

function resolveUiLinksAndFoundationCdsMobileSheets(
  ..._extraArguments: unknown[]
): Dynamic {
  let uiLinksAndFoundationValue022 = uiLinksAndFoundationValue02;
  UiLinksAndFoundationState3 ??= resolvePlatformLoadingAndStatusResolve(
    `cds_mobile_sheets`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadTImport(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../design-system/index").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.t,
          ),
        collectObservabilityTelemetryValue([0, 1, 2]),
        import.meta.url,
      ),
  )
    .then(
      (result?: unknown, ..._extraArguments: unknown[]) =>
        typeof result == `object` && result && `SheetPopupHost` in result
          ? result
          : null,
      (..._extraArguments: unknown[]) => null,
    )
    .then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (uiLinksAndFoundationValue022 !== uiLinksAndFoundationValue02)
        return result;
      if (result === null) {
        uiLinksAndFoundationValue_1 = true;
      } else {
        UiLinksAndFoundationState2 = result;
      }
      for (let resolveUiLinksAndFoundationCdsMobileSheetsResult of uiLinksAndFoundationSet5 as Dynamic)
        resolveUiLinksAndFoundationCdsMobileSheetsResult();
      return result;
    });
  return UiLinksAndFoundationState3;
}

function resolveUiLinksAndFoundationValue17(
  ..._extraArguments: unknown[]
): undefined {
  if (!(UiLinksAndFoundationState2 !== null || uiLinksAndFoundationValue_1)) {
    uiLinksAndFoundationValue0 += 1;
    resolveUiLinksAndFoundationCdsMobileSheets();
  }
}

function resolveUiLinksAndFoundationValue18(..._extraArguments: unknown[]) {
  return UiLinksAndFoundationState2 !== null;
}

function useUiLinksAndFoundationUseSyncExternalStore3(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearUiLinksAndFoundationDelete,
    resolveUiLinksAndFoundationValue14,
    isUiLinksAndFoundationValue2,
  );
}

function useUiLinksAndFoundationUseSyncExternalStore4(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearUiLinksAndFoundationDelete,
    resolveUiLinksAndFoundationValue15,
    isUiLinksAndFoundationValue2,
  );
}

function useUiLinksAndFoundationUseSyncExternalStore5(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearUiLinksAndFoundationDelete,
    resolveUiLinksAndFoundationValue13,
    resolveUiLinksAndFoundationValue16,
  );
}

function useUiLinksAndFoundationState(
  uiLinksAndFoundationState?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let useUiLinksAndFoundationUseSyncExternalStore6: Dynamic =
    useUiLinksAndFoundationUseSyncExternalStore(
      uiLinksAndFoundationState ? options : undefined,
      UiLinksAndFoundationStyles2,
    );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        uiLinksAndFoundationState &&
        useUiLinksAndFoundationUseSyncExternalStore6
      ) {
        resolveUiLinksAndFoundationValue17();
      }
    },
    [uiLinksAndFoundationState, useUiLinksAndFoundationUseSyncExternalStore6],
  );
}

var UiLinksAndFoundationCreateContext3: Dynamic;

function resolveUiLinksAndFoundationReplace2(
  uiLinksAndFoundationReplace2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options
    ? uiLinksAndFoundationReplace2.replace(
        /\{(\w+)\}/g,
        (
          uiLinksAndFoundationReplace22?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          options2 in options
            ? String(options[options2])
            : uiLinksAndFoundationReplace22,
      )
    : uiLinksAndFoundationReplace2;
}

function resolveUiLinksAndFoundationValue19(
  uiLinksAndFoundationValue19?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    uiLinksAndFoundationValue19?.(options, context, dependencies) ||
    resolveUiLinksAndFoundationReplace2(context, dependencies)
  );
}

function resolveUiLinksAndFoundationUseContext3(
  uiLinksAndFoundationUseContext3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveUiLinksAndFoundationValue19(
    (0, React.useContext)(UiLinksAndFoundationCreateContext3),
    uiLinksAndFoundationUseContext3,
    options,
    context,
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiLinksAndFoundationStep1(): void {
  (uiLinksAndFoundationPattern = /\b(?:Claude(?:Nest|Gov)?|Electron)\//i);
  (uiLinksAndFoundationPattern2 = /[\t\n\r]/g);
  (uiLinksAndFoundationSet = new (Set as Dynamic)([
    `_self`,
    `_parent`,
    `_top`,
  ]));
  (uiLinksAndFoundationPattern3 = /^no(?:opener|referrer)$/i);
  (UiLinksAndFoundationCreateContext = (0, React.createContext)(
    undefined,
  ));
  (uiLinksAndFoundationPattern4 = /[\x00-\x1f\x7f-\x9f]/);
  (uiLinksAndFoundationPattern5 = /^\s/);
  (uiLinksAndFoundationPattern6 = /^[/\\]{2}/);
  (uiLinksAndFoundationPattern7 = /^[/\\](?![/\\])/);
  (uiLinksAndFoundationPattern8 = /^[^/\\]/);
  (uiLinksAndFoundationPattern9 = /\/(?:\.|%2e){1,2}(?:\/|$)/i);
  (uiLinksAndFoundationPattern10 = /^(?:\.|%2e){1,2}$/i);
  (uiLinksAndFoundationPattern11 = /\\|%2e/i);
  (uiLinksAndFoundationUrlPattern = /^(?:https?|mailto|tel|claude|claude-cli|claude-nest|slack|blob):/i);
  (uiLinksAndFoundationPattern12 = /^intent:/i);
  (uiLinksAndFoundationPattern13 = /^(?:vscode|cursor):/i);
  (uiLinksAndFoundationPattern14 = /^(?:(?:vscode|cursor):extension\/anthropic\.[A-Za-z0-9][A-Za-z0-9_-]*|vscode:\/\/settings\/[A-Za-z0-9][A-Za-z0-9_.-]*)$/);
  (uiLinksAndFoundationSet2 = new (Set as Dynamic)([
    `scheme`,
    `package`,
    `S.browser_fallback_url`,
  ]));
  (uiLinksAndFoundationPattern15 = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i);
  (uiLinksAndFoundationClaudeAiClaudeComAnthropicComValues = [
    `claude.ai`,
    `claude.com`,
    `anthropic.com`,
  ]);
  (uiLinksAndFoundationSet3 = new (Set as Dynamic)([
    `com.anthropic.claude`,
    `com.anthropic.aibo`,
  ]));
  (UiLinksAndFoundationHttpsCdsRelativeHrefInvalid = `https://cds-relative-href.invalid`);
  (UiLinksAndFoundationHttpCdsRelativeHrefInvalid = `http://cds-relative-href.invalid`);
  (uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues = [
      `onClick`,
      `onPointerEnter`,
      `onPointerLeave`,
      `onPointerDown`,
      `onFocus`,
      `onBlur`,
    ]);
  (UiLinksAndFoundationState = {
    onPointerEnter: true,
    onPointerLeave: false,
    onPointerDown: true,
    onFocus: true,
    onBlur: false,
  });
  (UiLinksAndFoundationKeys = Object.keys(UiLinksAndFoundationState));
  (uiLinksAndFoundationRedOrangeYellowGreenValues = [
    `red`,
    `orange`,
    `yellow`,
    `green`,
    `aqua`,
    `blue`,
    `violet`,
    `magenta`,
  ]);
  (UiLinksAndFoundationStyles = `(pointer: coarse) and (max-width: 639.98px)`);
  (uiLinksAndFoundationWeakMap = new (WeakMap as Dynamic)());
  (resolveUiLinksAndFoundationValue6 = (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined =>
      undefined);
  (isUiLinksAndFoundationValue = (..._extraArguments: unknown[]) => false);
  (UiLinksAndFoundationStyles2 = `(pointer: coarse)`);
  (uiLinksAndFoundationWeakMap2 = new (WeakMap as Dynamic)());
  (UiLinksAndFoundationAnthropic = {
    anthropic: true,
    system: true,
  });
  (resolveUiLinksAndFoundationHasOwn = (
    uiLinksAndFoundationHasOwn?: Dynamic,
    ..._extraArguments: unknown[]
  ) => Object.hasOwn(UiLinksAndFoundationAnthropic, uiLinksAndFoundationHasOwn));
  (resolveUiLinksAndFoundationDataFont = (
    ..._extraArguments: unknown[]
  ) => {
    if (typeof document === "undefined") return;
    let attribute = document.documentElement.getAttribute(`data-font`);
    return attribute !== null && resolveUiLinksAndFoundationHasOwn(attribute)
      ? attribute
      : undefined;
  });
  (resolveUiLinksAndFoundationValue10 = (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined =>
      undefined);
  (resolveUiLinksAndFoundationValue11 = (
    ..._extraArguments: unknown[]
  ): undefined => undefined);
  (UiLinksAndFoundationCreateContext2 = (0, React.createContext)(
    undefined,
  ));
  (uiLinksAndFoundationWeakMap3 = new (WeakMap as Dynamic)());
  (uiLinksAndFoundationSet4 = new (Set as Dynamic)([
    `Escape`,
    `Enter`,
    ` `,
  ]));
  (UiLinksAndFoundationState2 = null);
  (uiLinksAndFoundationValue_1 = false);
  (uiLinksAndFoundationValue0 = 0);
  (uiLinksAndFoundationValue02 = 0);
  (UiLinksAndFoundationState3 = null);
  (uiLinksAndFoundationSet5 = new (Set as Dynamic)());
  (resolveUiLinksAndFoundationValue13 = (
    ..._extraArguments: unknown[]
  ): Dynamic => UiLinksAndFoundationState2);
  (resolveUiLinksAndFoundationValue14 = (..._extraArguments: unknown[]) =>
    UiLinksAndFoundationState2 !== null);
  (resolveUiLinksAndFoundationValue15 = (
    ..._extraArguments: unknown[]
  ) => uiLinksAndFoundationValue_1);
  (resolveUiLinksAndFoundationValue16 = (..._extraArguments: unknown[]) =>
    null);
  (isUiLinksAndFoundationValue2 = (..._extraArguments: unknown[]) => false);
  (UiLinksAndFoundationCreateContext3 = (0, React.createContext)(
    undefined,
  ));
}

export {
  UiLinksAndFoundationCreateContext,
  UiLinksAndFoundationCreateContext2,
  UiLinksAndFoundationCreateContext3,
  UiLinksAndFoundationStyles,
  UiLinksAndFoundationStyles2,
  clearUiLinksAndFoundationSubscribers,
  createSafeMutationObserver,
  createSafeResizeObserver,
  isUiLinksAndFoundationRelatedTarget,
  isUiLinksAndFoundationSource,
  isUiLinksAndFoundationToLowerCase,
  isUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationDesktop,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationItContainsAControlCharacter,
  resolveUiLinksAndFoundationJoin,
  resolveUiLinksAndFoundationNoreferrer,
  resolveUiLinksAndFoundationUseContext,
  resolveUiLinksAndFoundationUseContext2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationValue12,
  resolveUiLinksAndFoundationValue17,
  resolveUiLinksAndFoundationValue18,
  resolveUiLinksAndFoundationValue19,
  resolveUiLinksAndFoundationValue3,
  resolveUiLinksAndFoundationValue4,
  resolveUiLinksAndFoundationValue5,
  resolveUiLinksAndFoundationValue6,
  resolveUiLinksAndFoundationValue9,
  resolveUiLinksAndFoundationWindow,
  uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues,
  uiLinksAndFoundationRedOrangeYellowGreenValues,
  updateUiLinksAndFoundationObservedInput,
  updateUiLinksAndFoundationSubscribe,
  useUiLinksAndFoundationState,
  useUiLinksAndFoundationUseSyncExternalStore,
  useUiLinksAndFoundationUseSyncExternalStore2,
  useUiLinksAndFoundationUseSyncExternalStore3,
  useUiLinksAndFoundationUseSyncExternalStore4,
  useUiLinksAndFoundationUseSyncExternalStore5,
};

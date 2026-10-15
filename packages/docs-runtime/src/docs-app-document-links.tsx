/** BaoCut: document links from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  Button,
  CopyLinkFallbackUrl,
  LabeledTextInput,
  Surface,
  Tooltip,
  TooltipGroup,
  UiOverlaysAndIconsCustomIcon,
  frameOpenExternal,
  isFrameArtifact,
  isObservabilityBrowserAndOperationEventsIncludes,
  isPlatformSessionAndSourcesToLowerCase2,
  menuItemVariants,
  originalJsxProps,
  platformSessionAndSourcesPattern12,
  platformSessionAndSourcesPattern20,
  resolveDataModelSchemasMain,
  resolveDataModelSchemasPathname,
  resolveDataModelSchemasValue6,
  resolveEditorExtensionsHrefFragment,
  resolvePlatformSessionAndSourcesBid3,
  resolvePlatformSessionAndSourcesOpen,
  resolvePlatformSessionAndSourcesRest,
  resolvePlatformSessionAndSourcesRest2,
  resolvePlatformSessionAndSourcesStartsWith,
  resolvePlatformSessionAndSourcesStartsWith2,
  resolvePlatformSessionAndSourcesTest12,
  resolvePlatformSessionAndSourcesTest8,
  resolvePlatformSessionAndSourcesTextHtml,
  resolvePlatformSessionAndSourcesValue10,
  resolveUiDesignSystemValue2,
  resolveUiTooltipsAndControlsValue3,
  toast,
} from "./docs-app-dependencies";
import {
  React,
  jsxRuntime,
} from "./docs-app-bootstrap";
import {
  ReactDom,
} from "./docs-app-connection-and-errors-connector-permission-dialog";
import {
  clampPopoverArrow,
} from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import {
  DocumentLinks_Message,
  DocumentLinks_ThatSectionNoLongerExistsInThisDocument,
} from "./docs-app-document-frame-use-document-frame-key";
import {
  LinkPopoverIconButton,
} from "./docs-app-document-uploads";

function resolveDocumentLinksSlice(
  documentLinksSlice?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof documentLinksSlice != `string`) return null;
  if (
    resolvePlatformSessionAndSourcesRest(documentLinksSlice.slice(0, 512)) !==
    null
  )
    return DocumentLinks_Message;
  if (
    !isPlatformSessionAndSourcesToLowerCase2(documentLinksSlice.slice(0, 512))
  )
    return null;
  let documentLinksSliceSlice = documentLinksSlice.slice(0, 512);
  try {
    documentLinksSliceSlice = decodeURIComponent(documentLinksSliceSlice);
  } catch {}
  if (resolvePlatformSessionAndSourcesBid3(documentLinksSliceSlice) !== null)
    return DocumentLinks_ThatSectionNoLongerExistsInThisDocument;
  let trimmedReplaceSlice = documentLinksSliceSlice
    .replace(/[^\p{L}\p{N}\-_. ]+/gu, ` `)
    .replace(/\s+/g, ` `)
    .trim()
    .slice(0, 48);
  return trimmedReplaceSlice
    ? `No heading called “${trimmedReplaceSlice}” in this document`
    : null;
}

function resolveDocumentLinksLevel(
  documentLinksLevel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let headings: Dynamic = documentLinksLevel?.headings;
  if (!Array.isArray(headings)) return [];
  let items: Dynamic = [];
  for (let resolveDocumentLinksLevelResult of headings.slice(
    0,
    200,
  ) as Dynamic) {
    if (
      !resolveDocumentLinksLevelResult ||
      typeof resolveDocumentLinksLevelResult != `object`
    )
      continue;
    let {
      level: resolveDocumentLinksLevelResult2,
      text: resolveDocumentLinksLevelResult3,
      slug: resolveDocumentLinksLevelResult4,
      bid: bid,
    }: Dynamic = resolveDocumentLinksLevelResult;
    if (
      typeof resolveDocumentLinksLevelResult3 != `string` ||
      typeof resolveDocumentLinksLevelResult4 != `string`
    )
      continue;
    let slug = resolveDocumentLinksLevelResult4
      .replace(platformSessionAndSourcesPattern12, ``)
      .trim()
      .slice(0, 120);
    if (!slug || slug !== resolveDocumentLinksLevelResult4) continue;
    let ask: Dynamic =
      typeof bid == `string` && platformSessionAndSourcesPattern20.test(bid)
        ? {
            bid: bid,
          }
        : {};
    if (
      ask.bid === undefined &&
      resolvePlatformSessionAndSourcesStartsWith(slug) === null
    )
      continue;
    let text = resolveDocumentLinksLevelResult3
      .replace(platformSessionAndSourcesPattern12, ``)
      .trim()
      .slice(0, 120);
    if (!text) continue;
    let level =
      typeof resolveDocumentLinksLevelResult2 == `number` &&
      Number.isInteger(resolveDocumentLinksLevelResult2) &&
      resolveDocumentLinksLevelResult2 >= 1 &&
      resolveDocumentLinksLevelResult2 <= 6
        ? resolveDocumentLinksLevelResult2
        : 1;
    items.push({
      level: level,
      text: text,
      slug: slug,
      ...ask,
    });
  }
  return items;
}

function resolveDocumentLinksToLowerCase(
  documentLinks?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let normalizedOptions: Dynamic = (options ?? ``).toLowerCase();
  let items: Dynamic = [];
  for (let [resolveDocumentLinksToLowerCaseResult, name] of Object.entries(
    documentLinks ?? {},
  ) as Dynamic)
    if (
      !(
        name === `` ||
        resolveDocumentLinksToLowerCaseResult.toLowerCase() ===
          normalizedOptions ||
        resolvePlatformSessionAndSourcesTest8(
          resolveDocumentLinksToLowerCaseResult,
        ) === null
      )
    ) {
      items.push({
        id: resolveDocumentLinksToLowerCaseResult,
        name: name,
      });
    }
  return items;
}

var documentLinksLimit420: number;

var documentLinksLimit44: number;

var documentLinksLimit204: number;

var documentLinksLimit26: number;

var documentLinksLimit360: number;

var DocumentLinksState: string;

var DocumentLinks_TextMutedTextFootnotePy1FontMediumCompactPx2ComfortablePx25: string;

var documentLinksLimit4: number;

var documentLinksPattern: RegExp;

var documentLinksLimit72: number;

var documentLinksLimit250: number;

var DocumentLinks_Styles: string;

function resolveDocumentLinksOpen(
  documentLinksOpen?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(isFrameArtifact() && frameOpenExternal(documentLinksOpen) === `clicked`)
  ) {
    window.open(documentLinksOpen, `_blank`, `noopener,noreferrer`);
  }
}

function getDocumentLinksKind(
  documentLinksKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = documentLinksKind.replace(
    platformSessionAndSourcesPattern12,
    ``,
  );
  if (!replace || replace.length > 2048 || replace.startsWith(`#`)) return null;
  let replace2: Dynamic = (
    documentLinksKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      (documentLinksKind2.protocol !== `http:` &&
        documentLinksKind2.protocol !== `https:`) ||
      documentLinksKind2.origin !== location.origin ||
      documentLinksKind2.username ||
      documentLinksKind2.password ||
      documentLinksKind2.pathname.startsWith(`//`)
    )
      return null;
    let searchParamEntry: Dynamic = documentLinksKind2.searchParams.get(`path`);
    if (
      searchParamEntry != null &&
      isObservabilityBrowserAndOperationEventsIncludes(searchParamEntry)
    )
      return null;
    let route: Dynamic =
      documentLinksKind2.pathname +
      documentLinksKind2.search +
      documentLinksKind2.hash;
    let findLast: Dynamic =
      (searchParamEntry
        ? searchParamEntry.split(`/`).findLast(Boolean)
        : undefined) ??
      documentLinksKind2.pathname.split(`/`).findLast(Boolean) ??
      route;
    return {
      kind: `internal`,
      route: route,
      abs: documentLinksKind2.href,
      disp: resolveDataModelSchemasValue6(findLast).replace(
        platformSessionAndSourcesPattern12,
        ``,
      ),
    };
  };
  if (replace.startsWith(`claude://`)) {
    let getDocumentLinksKindResult2: Dynamic =
      resolveDataModelSchemasMain(replace);
    return getDocumentLinksKindResult2
      ? replace2(getDocumentLinksKindResult2)
      : null;
  }
  let getDocumentLinksKindResult: Dynamic;
  try {
    getDocumentLinksKindResult = new URL(replace, location.origin);
  } catch {
    return null;
  }
  return getDocumentLinksKindResult.origin === location.origin
    ? replace2(getDocumentLinksKindResult)
    : null;
}

function DocumentLinkPopoverForm(
  documentLinkPopover?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div data-testid={`ldoc-linkpop-form`} className={`gap-md flex flex-col`}>
      <LabeledTextInput
        label={`Text`}
        aria-label={`Link text`}
        value={documentLinkPopover.text}
        onChange={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentLinkPopover.onText(event.target.value)
        }
        onKeyDown={documentLinkPopover.onTextKeyDown}
        maxLength={400}
        disabled={documentLinkPopover.textLocked === `disabled`}
        readOnly={documentLinkPopover.textLocked === `readOnly`}
        hint={documentLinkPopover.textHint}
        autoComplete={`off`}
      />
      <div className={`relative flex flex-col`}>
        <LabeledTextInput
          ref={documentLinkPopover.urlRef}
          label={`Link`}
          aria-label={`Link URL`}
          value={documentLinkPopover.url}
          onChange={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            documentLinkPopover.onUrl(event.target.value)
          }
          onKeyDown={documentLinkPopover.onUrlKeyDown}
          onPaste={(
            documentLinkPopover2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            documentLinkPopover.onUrlPaste(
              documentLinkPopover2,
              documentLinkPopover.onUrl,
            )
          }
          placeholder={documentLinkPopover.urlPlaceholder}
          role={documentLinkPopover.canList ? `combobox` : undefined}
          aria-autocomplete={documentLinkPopover.canList ? `list` : undefined}
          aria-expanded={
            documentLinkPopover.canList
              ? documentLinkPopover.menuShown
              : undefined
          }
          aria-controls={
            documentLinkPopover.menuOpen
              ? `ldoc-linkpop-headings`
              : documentLinkPopover.menuShown
                ? `ldoc-linkpop-nomatch`
                : undefined
          }
          aria-activedescendant={documentLinkPopover.activeId}
          hint={documentLinkPopover.urlHint}
          error={documentLinkPopover.error}
          autoComplete={`off`}
          spellCheck={false}
        />
        {documentLinkPopover.menu}
      </div>
      <div className={`gap-sm flex justify-end`}>
        <Button onClick={documentLinkPopover.onCancel}>{`Cancel`}</Button>
        <Button
          variant={`primary`}
          disabled={!documentLinkPopover.canSave}
          onClick={documentLinkPopover.onSave}
        >{`Save`}</Button>
      </div>
    </div>
  );
}

function DocumentLinkPopover(
  {
    pop: pop,
    iframeEl: iframeEl,
    readOnly: readOnly,
    onClose: onClose,
    onCancel: onCancel,
    onEdit: onEdit,
    onCommit: onCommit,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let urlRef: Dynamic = (0, React.useRef)(null);
  let countRef: Dynamic = (0, React.useRef)(0);
  let [url, setUrl]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      pop.href.replace(platformSessionAndSourcesPattern12, ``),
  );
  let [textState, onText]: Dynamic = (0, React.useState)(pop.text);
  let [ariaExpanded, setAriaExpanded]: Dynamic = (0, React.useState)(false);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let [documentLinkPopoverState, setDocumentLinkPopoverState]: Dynamic = (0,
  React.useState)(-1);
  let [documentLinkPopoverState2, setDocumentLinkPopoverState2]: Dynamic = (0,
  React.useState)(-1);
  let [enabledState3, setEnabledState3]: Dynamic = (0, React.useState)(false);
  let [enabledState4, setEnabledState4]: Dynamic = (0, React.useState)(false);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setUrl(pop.href.replace(platformSessionAndSourcesPattern12, ``));
      onText(pop.text);
      setAriaExpanded(false);
      setEnabledState(false);
      setEnabledState2(false);
      setDocumentLinkPopoverState(-1);
      setDocumentLinkPopoverState2(-1);
      setEnabledState3(false);
      setEnabledState4(false);
    },
    [pop.href, pop.text, pop.nodeId, pop.from, pop.to],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let closest = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!elementRef.current?.contains(event.target)) {
          if (
            event.target?.closest?.(
              `input, textarea, select, button, a[href], [contenteditable], [tabindex]`,
            )
          ) {
            onClose();
          } else {
            onCancel();
          }
        }
      };
      let onCancel3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key === `Escape`) {
          event.preventDefault();
          if (enabledRef.current) {
            setEnabledState4(true);
            setDocumentLinkPopoverState2(-1);
          } else {
            onCancel();
          }
        }
      };
      document.addEventListener(`mousedown`, closest, true);
      document.addEventListener(`keydown`, onCancel3, true);
      if (pop.mode === `actions`) {
        window.addEventListener(`resize`, onClose);
      }
      return (..._extraArguments: unknown[]): undefined => {
        document.removeEventListener(`mousedown`, closest, true);
        document.removeEventListener(`keydown`, onCancel3, true);
        window.removeEventListener(`resize`, onClose);
      };
    },
    [onClose, onCancel, pop.mode],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (pop.mode === `edit`) {
        urlRef.current?.focus();
        urlRef.current?.select();
      }
    },
    [pop.mode],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (pop.mode !== `actions` || !pop.kbd) return;
      let element: Dynamic = elementRef.current;
      if (element) {
        (
          element.querySelector(`[data-testid="ldoc-linkpop-longwarn"]`) ??
          element.querySelector(
            `button[aria-label="Open link"]${DocumentLinks_Styles}`,
          ) ??
          element.querySelector(`button${DocumentLinks_Styles}`)
        )?.focus();
      }
    },
    [pop.mode, pop.kbd, pop.nodeId, pop.from, pop.to, pop.href],
  );
  let onKeyDownCapture = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      event.repeat &&
      (event.key === `Enter` ||
        (event.key === ` ` && event.target instanceof HTMLButtonElement))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  let onKeyDown = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (pop.mode === `edit`) {
      if (event.key !== `Tab` || event.ctrlKey || event.metaKey) return;
      let matchedElements2: Dynamic = Array.from<Dynamic>(
        elementRef.current?.querySelectorAll(
          `input:not([disabled]), button${DocumentLinks_Styles}:not([tabindex="-1"])`,
        ) ?? [],
      );
      if (matchedElements2.length === 0) return;
      let matchedElementIndex2: Dynamic = matchedElements2.indexOf(
        document.activeElement,
      );
      let count: Dynamic =
        matchedElementIndex2 < 0
          ? 0
          : (matchedElementIndex2 +
              (event.shiftKey ? -1 : 1) +
              matchedElements2.length) %
            matchedElements2.length;
      event.preventDefault();
      matchedElements2[count]?.focus();
      return;
    }
    if (
      pop.mode !== `actions` ||
      event.ctrlKey ||
      event.metaKey ||
      (event.altKey && event.key !== `Tab`) ||
      ![`Tab`, `ArrowRight`, `ArrowLeft`, `Home`, `End`].includes(event.key)
    )
      return;
    let matchedElements: Dynamic = Array.from<Dynamic>(
      elementRef.current?.querySelectorAll(`button${DocumentLinks_Styles}`) ??
        [],
    );
    if (matchedElements.length === 0) return;
    let matchedElementIndex: Dynamic = matchedElements.indexOf(
      document.activeElement,
    );
    let documentLinkPopoverResult2: Dynamic;
    if (event.key === `Home`) documentLinkPopoverResult2 = 0;
    else if (event.key === `End`)
      documentLinkPopoverResult2 = matchedElements.length - 1;
    else {
      let matchesKey: Dynamic =
        event.key === `ArrowLeft` || (event.key === `Tab` && event.shiftKey);
      documentLinkPopoverResult2 =
        matchedElementIndex < 0
          ? 0
          : (matchedElementIndex +
              (matchesKey ? -1 : 1) +
              matchedElements.length) %
            matchedElements.length;
    }
    event.preventDefault();
    matchedElements[documentLinkPopoverResult2]?.focus();
    countRef.current = Date.now();
  };
  let trimmedReplace: Dynamic = pop.href
    .replace(platformSessionAndSourcesPattern12, ``)
    .trim();
  let enabled = !enabledState3 && url.trim() !== trimmedReplace;
  let canList =
    (pop.headings?.length ?? 0) + (pop.tabs?.length ?? 0) > 0 &&
    pop.from !== pop.to;
  let matchesMode =
    pop.mode === `edit` &&
    canList &&
    enabled &&
    !enabledState4 &&
    documentLinksPattern.test(url.trim());
  let ariaLabel = pop.tabs?.length ? `Headings in this tab` : `Headings`;
  let toLowerCase: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!matchesMode) return [];
      let headings: Dynamic = pop.headings ?? [];
      let normalizedTrimmedUrlSlice: Dynamic = url
        .trim()
        .slice(1)
        .toLowerCase();
      return normalizedTrimmedUrlSlice
        ? headings.filter(
            (heading?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              heading.slug.startsWith(normalizedTrimmedUrlSlice) ||
              heading.text.toLowerCase().includes(normalizedTrimmedUrlSlice),
          )
        : headings;
    },
    [matchesMode, pop.headings, url],
  );
  let toLowerCase2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!matchesMode) return [];
      let tabs: Dynamic = pop.tabs ?? [];
      let normalizedTrimmedUrlSlice: Dynamic = url
        .trim()
        .slice(1)
        .toLowerCase();
      return normalizedTrimmedUrlSlice
        ? tabs.filter(
            (tab?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              tab.name.toLowerCase().includes(normalizedTrimmedUrlSlice),
          )
        : tabs;
    },
    [matchesMode, pop.tabs, url],
  );
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => [
      ...toLowerCase.map(
        (toLowerCase3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          kind: `heading`,
          h: toLowerCase3,
        }),
      ),
      ...toLowerCase2.map(
        (toLowerCase3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          kind: `tab`,
          t: toLowerCase3,
        }),
      ),
    ],
    [toLowerCase, toLowerCase2],
  );
  let toLowerCaseIndex: Dynamic = toLowerCase.findIndex(
    (toLowerCase3?: Dynamic, ..._extraArguments: unknown[]) =>
      toLowerCase3.slug === url.trim().slice(1).toLowerCase(),
  );
  let documentLinkPopoverState3: Dynamic =
    documentLinkPopoverState >= 0 && documentLinkPopoverState < memoized.length
      ? documentLinkPopoverState
      : toLowerCaseIndex >= 0
        ? toLowerCaseIndex
        : memoized.length
          ? 0
          : -1;
  let documentLinkPopoverState4: Dynamic =
    documentLinkPopoverState2 >= 0 &&
    documentLinkPopoverState2 < memoized.length
      ? documentLinkPopoverState2
      : documentLinkPopoverState3;
  let menuShown = matchesMode && canList;
  let menuShown2 = menuShown && memoized.length === 0;
  enabledRef.current = menuShown;
  let matchesMode2: Dynamic =
    pop.mode === `edit` && canList && enabled && url.trim().startsWith(`/`);
  let documentLinkPopoverResult: Dynamic = resolvePlatformSessionAndSourcesOpen(
    pop.href,
  );
  let enabled2 =
    !!documentLinkPopoverResult &&
    resolvePlatformSessionAndSourcesRest2(documentLinkPopoverResult);
  let startsWith: Dynamic = url.trim().startsWith(`#`);
  let startsWith2: Dynamic =
    startsWith && resolvePlatformSessionAndSourcesRest(url.trim()) !== null;
  let textCapped: Dynamic =
    pop.textCapped ||
    pop.href
      .replace(platformSessionAndSourcesPattern12, ``)
      .trim()
      .startsWith(`#`);
  let total =
    pop.mode === `edit`
      ? documentLinksLimit204 + (textCapped ? documentLinksLimit26 : 0)
      : enabled2
        ? documentLinksLimit72
        : documentLinksLimit44;
  let iframeElBounds: Dynamic = iframeEl?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    height: 0,
  };
  let clientWidth = document.documentElement.clientWidth;
  let left = clampPopoverArrow(
    iframeElBounds.left + pop.rect.left + pop.rect.width / 2,
    Math.min(documentLinksLimit420, clientWidth - 16),
    clientWidth,
    8,
  );
  let total2: Dynamic = iframeElBounds.top + pop.rect.top;
  let matchesTop = pop.rect.top < total + 8;
  let top = matchesTop
    ? Math.max(
        iframeElBounds.top,
        Math.min(
          iframeElBounds.top + pop.rect.top + pop.rect.height + 8,
          iframeElBounds.top + iframeElBounds.height - total,
        ),
      )
    : Math.max(0, total2 - 8);
  let maxHeight = matchesTop ? 160 : Math.max(48, Math.min(160, top - total));
  let documentLinksKind: Dynamic = getDocumentLinksKind(pop.href);
  let onCancel2 = (..._extraArguments: unknown[]): undefined => {
    if (documentLinksKind)
      resolveDataModelSchemasPathname(documentLinksKind.route);
    else if (documentLinkPopoverResult)
      resolveDocumentLinksOpen(documentLinkPopoverResult.open);
    else return;
    onCancel();
  };
  let abs: Dynamic = documentLinksKind
    ? documentLinksKind.abs
    : documentLinkPopoverResult?.open;
  let host: Dynamic = documentLinkPopoverResult?.host ?? ``;
  let matchesHostCount = host.length > 30;
  let total3: Dynamic = documentLinkPopoverResult
    ? documentLinkPopoverResult.origin.slice(
        0,
        documentLinkPopoverResult.origin.length - host.length,
      ) + (matchesHostCount ? `…${host.slice(-27)}` : host)
    : ``;
  let disabled: Dynamic = readOnly || !pop.editable;
  let documentLinkPopoverHandler = (..._extraArguments: unknown[]) =>
    Date.now() - Math.max(pop.openedAt, countRef.current) <
    documentLinksLimit250;
  let trim: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let text: Dynamic = textState.trim();
    return text && text !== pop.text.trim()
      ? {
          text: text,
        }
      : {};
  };
  let onSave = (..._extraArguments: unknown[]): undefined => {
    if (documentLinkPopoverHandler()) return;
    let memoizedItem: Dynamic =
      documentLinkPopoverState3 >= 0
        ? memoized[documentLinkPopoverState3]
        : undefined;
    if (memoizedItem) {
      focus(memoizedItem);
      return;
    }
    if (matchesMode2) return;
    let href: Dynamic = resolvePlatformSessionAndSourcesStartsWith2(url);
    if (!href && url.trim()) {
      setEnabledState(true);
      return;
    }
    let href2: Dynamic = null;
    if (
      href?.startsWith(`#`) &&
      ((href2 = pop.headings
        ? resolvePlatformSessionAndSourcesStartsWith(href)
        : null),
      href2 === null)
    ) {
      if (pop.headings) {
        setEnabledState(true);
      } else {
        setEnabledState2(true);
      }
      return;
    }
    if (href && !href2 && !resolveEditorExtensionsHrefFragment(href)) {
      setEnabledState(true);
      return;
    }
    if (href && resolvePlatformSessionAndSourcesValue10(href)) {
      toast.warning(`Link too long`);
      return;
    }
    let record: Dynamic = {
      nodeId: pop.nodeId,
      from: pop.from,
      to: pop.to,
    };
    if (href2) {
      onCommit({
        type: `link-set`,
        ...record,
        href: href2,
      });
    } else {
      if (href) {
        onCommit({
          type: `link-set`,
          ...record,
          href: href,
          ...trim(),
        });
      } else {
        urlRef.current?.focus();
      }
    }
  };
  let documentLinkPopoverHandler2: Dynamic = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (entry.kind === `tab`)
      return resolvePlatformSessionAndSourcesTest8(entry.t.id);
    let documentLinkPopoverResult2: Dynamic =
      resolvePlatformSessionAndSourcesTest12(entry.h.bid, entry.h.slug);
    return documentLinkPopoverResult2 === null
      ? resolvePlatformSessionAndSourcesStartsWith(entry.h.slug)
      : `#${documentLinkPopoverResult2}`;
  };
  let focus = (
    documentLinkPopover?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (documentLinkPopoverHandler()) return;
    let href: Dynamic = documentLinkPopoverHandler2(documentLinkPopover);
    if (href) {
      if (trim().text && !startsWith) {
        setUrl(href);
        setEnabledState3(true);
        onText(pop.text);
        setDocumentLinkPopoverState(-1);
        setDocumentLinkPopoverState2(-1);
        setEnabledState4(false);
        urlRef.current?.focus();
        return;
      }
      onCommit({
        type: `link-set`,
        nodeId: pop.nodeId,
        from: pop.from,
        to: pop.to,
        href: href,
      });
    }
  };
  let onTextKeyDown = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.key !== `Enter` || event.nativeEvent.isComposing) return;
    event.preventDefault();
    let memoizedItem: Dynamic =
      event.currentTarget === urlRef.current && documentLinkPopoverState4 >= 0
        ? memoized[documentLinkPopoverState4]
        : undefined;
    if (memoizedItem) {
      focus(memoizedItem);
    } else {
      onSave();
    }
  };
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let [enabledState5, setEnabledState5]: Dynamic = (0, React.useState)(false);
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({
    below: 0,
    above: 0,
  });
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef3.current;
      let url2: Dynamic = urlRef.current;
      if (!element || !url2 || !menuShown) {
        if (enabledState5) {
          setEnabledState5(false);
        }
        return;
      }
      let offsetParent: Dynamic = element.offsetParent;
      if (offsetParent) {
        let offsetParentBounds: Dynamic = offsetParent.getBoundingClientRect();
        let urlBounds: Dynamic = url2.getBoundingClientRect();
        let below =
          Math.round(urlBounds.bottom - offsetParentBounds.top) +
          documentLinksLimit4;
        let above =
          Math.round(offsetParentBounds.bottom - urlBounds.top) +
          documentLinksLimit4;
        if (below !== recordState.below || above !== recordState.above) {
          setRecordState({
            below: below,
            above: above,
          });
        }
      }
      if (enabledState5) return;
      let elementBounds: Dynamic = element.getBoundingClientRect();
      let matchesDifference =
        url2.getBoundingClientRect().top -
          documentLinksLimit4 -
          elementBounds.height >
        8;
      if (elementBounds.bottom > window.innerHeight - 8 && matchesDifference) {
        setEnabledState5(true);
      }
    },
    [
      menuShown,
      memoized.length,
      enabledState5,
      recordState.below,
      recordState.above,
      top,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(documentLinkPopoverState3 < 0)) {
        elementRef2.current
          ?.querySelector(`[data-hidx="${documentLinkPopoverState3}"]`)
          ?.scrollIntoView?.({
            block: `nearest`,
          });
      }
    },
    [documentLinkPopoverState3],
  );
  return (0, ReactDom.createPortal)(
    <Surface
      elevation={`popover`}
      ref={elementRef}
      data-testid={`ldoc-linkpop`}
      role={`dialog`}
      aria-label={`Link`}
      onKeyDownCapture={onKeyDownCapture}
      onKeyDown={onKeyDown}
      className={resolveUiDesignSystemValue2(
        `text-primary fixed z-50 flex flex-col`,
        pop.mode === `edit` ? `p-lg` : `p-1.5`,
      )}
      style={{
        left: left,
        top: top,
        width:
          pop.mode === `edit`
            ? Math.min(documentLinksLimit360, clientWidth - 16)
            : undefined,
        maxWidth: Math.min(documentLinksLimit420, clientWidth - 16),
        transform: `translate(-50%, ${matchesTop ? `0` : `-100%`})`,
      }}
    >
      {pop.mode === `edit` ? (
        <DocumentLinkPopoverForm
          text={startsWith ? pop.text : textState}
          onText={onText}
          textLocked={
            pop.textCapped ? `disabled` : startsWith ? `readOnly` : undefined
          }
          textHint={
            pop.textCapped
              ? `This link's text is too long to edit here.`
              : startsWith
                ? pop.text
                  ? `A link to a ${startsWith2 ? `tab` : `heading`} can't be renamed here.`
                  : `A link to a ${startsWith2 ? `tab` : `heading`} needs existing text.`
                : undefined
          }
          onTextKeyDown={onTextKeyDown}
          url={url}
          urlRef={urlRef}
          onUrl={(
            documentLinkPopover?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            setUrl(documentLinkPopover);
            setEnabledState3(false);
            setEnabledState(false);
            setEnabledState2(false);
            setDocumentLinkPopoverState(-1);
            setDocumentLinkPopoverState2(-1);
            setEnabledState4(false);
          }}
          onUrlKeyDown={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              enabledState4 &&
              documentLinksPattern.test(url.trim()) &&
              (event.key === `ArrowDown` ||
                event.key === `ArrowUp` ||
                (event.key === `Enter` && url.trim().startsWith(`/`)))
            ) {
              event.preventDefault();
              setEnabledState4(false);
              setEnabledState(false);
              return;
            }
            if (
              memoized.length &&
              (event.key === `ArrowDown` || event.key === `ArrowUp`)
            ) {
              event.preventDefault();
              let memoizedCount: Dynamic = memoized.length;
              let documentLinkPopoverState5: Dynamic =
                documentLinkPopoverState4;
              setDocumentLinkPopoverState(
                event.key === `ArrowDown`
                  ? (documentLinkPopoverState5 + 1) % memoizedCount
                  : documentLinkPopoverState5 <= 0
                    ? memoizedCount - 1
                    : documentLinkPopoverState5 - 1,
              );
              setDocumentLinkPopoverState2(-1);
              return;
            }
            onTextKeyDown(event);
          }}
          onUrlPaste={(
            event?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let documentLinkPopoverResult2: Dynamic =
              resolvePlatformSessionAndSourcesTextHtml(event.clipboardData);
            if (documentLinkPopoverResult2) {
              event.preventDefault();
              options(documentLinkPopoverResult2);
              setEnabledState3(true);
            }
          }}
          urlPlaceholder={
            canList
              ? pop.tabs?.length
                ? `Paste a link, or type / for a heading or tab`
                : `Paste a link, or type / for a heading`
              : `Paste a link`
          }
          canList={canList}
          menuOpen={memoized.length > 0}
          menuShown={menuShown}
          activeId={
            documentLinkPopoverState4 >= 0
              ? `ldoc-linkpop-h-${documentLinkPopoverState4}`
              : undefined
          }
          error={
            enabledState ? (
              <span
                data-testid={`ldoc-linkpop-err`}
                role={`alert`}
              >{`That doesn't look like a link`}</span>
            ) : enabledState2 ? (
              <span
                data-testid={`ldoc-linkpop-noanchors`}
                role={`alert`}
              >{`Links to headings aren't available in this document yet`}</span>
            ) : undefined
          }
          urlHint={
            menuShown2 ? (
              <span
                id={`ldoc-linkpop-nomatch`}
                data-testid={`ldoc-linkpop-nomatch`}
                role={`status`}
              >
                {pop.tabs?.length
                  ? `No heading or tab matches`
                  : `No heading matches`}
              </span>
            ) : undefined
          }
          menu={
            menuShown && !menuShown2 ? (
              <div
                ref={elementRef3}
                data-testid={`ldoc-linkpop-headings-menu`}
                className={DocumentLinksState}
                style={
                  enabledState5
                    ? {
                        bottom: recordState.above,
                      }
                    : {
                        top: recordState.below,
                      }
                }
              >
                <div
                  ref={elementRef2}
                  id={`ldoc-linkpop-headings`}
                  data-testid={`ldoc-linkpop-headings`}
                  role={`listbox`}
                  aria-label={
                    pop.tabs?.length ? `Headings and tabs` : `Headings`
                  }
                  className={`max-h-44 overflow-y-auto`}
                  onMouseLeave={(..._extraArguments: unknown[]): Dynamic =>
                    setDocumentLinkPopoverState2(-1)
                  }
                >
                  {toLowerCase.length > 0 && (
                    <div role={`group`} aria-label={ariaLabel}>
                      <div
                        className={
                          DocumentLinks_TextMutedTextFootnotePy1FontMediumCompactPx2ComfortablePx25
                        }
                        aria-hidden={`true`}
                      >
                        {ariaLabel}
                      </div>
                      {toLowerCase.map(
                        (
                          toLowerCase3?: Dynamic,
                          dataHidx?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) => (
                          <button
                            {...originalJsxProps(
                              {
                                type: `button`,
                                tabIndex: -1,
                                id: `ldoc-linkpop-h-${dataHidx}`,
                                "data-hidx": dataHidx,
                                role: `option`,
                                "aria-selected":
                                  dataHidx === documentLinkPopoverState4,
                                "data-highlighted":
                                  dataHidx === documentLinkPopoverState4
                                    ? ``
                                    : undefined,
                                onMouseEnter: (
                                  ..._extraArguments: unknown[]
                                ): Dynamic =>
                                  setDocumentLinkPopoverState2(dataHidx),
                                onMouseDown: (
                                  event?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): Dynamic => event.preventDefault(),
                                onClick: (..._extraArguments: unknown[]) =>
                                  focus({
                                    kind: `heading`,
                                    h: toLowerCase3,
                                  }),
                                className: resolveUiDesignSystemValue2(
                                  menuItemVariants(),
                                  `cursor-pointer`,
                                ),
                                children: (
                                  <span
                                    className={`min-w-0 flex-1 truncate text-left`}
                                    style={{
                                      marginLeft: (toLowerCase3.level - 1) * 12,
                                    }}
                                  >
                                    {toLowerCase3.text}
                                  </span>
                                ),
                              },
                              `${toLowerCase3.slug}`,
                            )}
                          />
                        ),
                      )}
                    </div>
                  )}
                  {toLowerCase2.length > 0 && (
                    <div
                      role={`group`}
                      aria-label={`Tabs`}
                      data-testid={`ldoc-linkpop-tabs`}
                    >
                      <div
                        className={
                          DocumentLinks_TextMutedTextFootnotePy1FontMediumCompactPx2ComfortablePx25
                        }
                        aria-hidden={`true`}
                      >{`Tabs`}</div>
                      {toLowerCase2.map(
                        (
                          toLowerCase3?: Dynamic,
                          index?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) => {
                          let dataHidx: Dynamic = toLowerCase.length + index;
                          return (
                            <button
                              {...originalJsxProps(
                                {
                                  type: `button`,
                                  tabIndex: -1,
                                  id: `ldoc-linkpop-h-${dataHidx}`,
                                  "data-hidx": dataHidx,
                                  "data-kind": `tab`,
                                  role: `option`,
                                  "aria-selected":
                                    dataHidx === documentLinkPopoverState4,
                                  "data-highlighted":
                                    dataHidx === documentLinkPopoverState4
                                      ? ``
                                      : undefined,
                                  onMouseEnter: (
                                    ..._extraArguments: unknown[]
                                  ): Dynamic =>
                                    setDocumentLinkPopoverState2(dataHidx),
                                  onMouseDown: (
                                    event?: Dynamic,
                                    ..._extraArguments: unknown[]
                                  ): Dynamic => event.preventDefault(),
                                  onClick: (..._extraArguments: unknown[]) =>
                                    focus({
                                      kind: `tab`,
                                      t: toLowerCase3,
                                    }),
                                  className: resolveUiDesignSystemValue2(
                                    menuItemVariants(),
                                    `cursor-pointer`,
                                  ),
                                  children: (
                                    <span
                                      className={`min-w-0 flex-1 truncate text-left`}
                                    >
                                      {toLowerCase3.name}
                                    </span>
                                  ),
                                },
                                toLowerCase3.id,
                              )}
                            />
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null
          }
          canSave={
            url.trim() !== `` &&
            !(matchesMode2 && documentLinkPopoverState3 < 0)
          }
          onCancel={onCancel}
          onSave={onSave}
        />
      ) : (
        <div
          className={`rounded-card flex flex-col overflow-hidden text-[13px]`}
        >
          <div
            className={
              enabled2
                ? `flex flex-wrap items-center gap-1`
                : `flex items-center gap-1`
            }
          >
            {documentLinksKind ? (
              <Tooltip
                content={documentLinksKind.abs}
                multiline={true}
                className={`wrap-anywhere`}
              >
                <button
                  type={`button`}
                  data-testid={`ldoc-linkpop-url`}
                  onClick={(..._extraArguments: unknown[]): undefined => {
                    if (!documentLinkPopoverHandler()) {
                      onCancel2();
                    }
                  }}
                  className={`group hover:bg-alpha-1 flex min-w-0 ${enabled2 ? `basis-full` : `flex-1`} cursor-pointer items-baseline gap-1 rounded px-2 py-0.5 text-left [unicode-bidi:plaintext]`}
                >
                  <UiOverlaysAndIconsCustomIcon
                    name={`ArrowRight`}
                    size={`xs`}
                    className={`text-secondary shrink-0 self-center`}
                  />
                  <span
                    className={`text-primary truncate group-hover:underline`}
                  >
                    {documentLinksKind.disp}
                  </span>
                </button>
              </Tooltip>
            ) : documentLinkPopoverResult ? (
              <Tooltip
                content={documentLinkPopoverResult.open}
                multiline={true}
                className={`wrap-anywhere`}
              >
                <button
                  type={`button`}
                  data-testid={`ldoc-linkpop-url`}
                  onClick={(..._extraArguments: unknown[]): undefined => {
                    if (!documentLinkPopoverHandler()) {
                      onCancel2();
                    }
                  }}
                  className={`hover:bg-alpha-1 flex min-w-0 ${enabled2 ? `basis-full` : `flex-1`} cursor-pointer items-baseline rounded px-2 py-0.5 text-left [unicode-bidi:plaintext] hover:underline`}
                >
                  <span className={`text-primary shrink-0 whitespace-nowrap`}>
                    {total3}
                  </span>
                  <span className={`text-secondary truncate`}>
                    {documentLinkPopoverResult.rest.length > 28
                      ? `${documentLinkPopoverResult.rest.slice(0, 16)}…${documentLinkPopoverResult.rest.slice(-8)}`
                      : documentLinkPopoverResult.rest}
                  </span>
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                content={pop.href.replace(
                  platformSessionAndSourcesPattern12,
                  ``,
                )}
                multiline={true}
                className={`wrap-anywhere`}
              >
                <span
                  data-testid={`ldoc-linkpop-url`}
                  className={`text-secondary max-w-[260px] truncate px-2`}
                >
                  {pop.href.replace(platformSessionAndSourcesPattern12, ``)}
                </span>
              </Tooltip>
            )}
            {enabled2 && (
              <Button
                size={`xs`}
                variant={`ghost`}
                data-testid={`ldoc-linkpop-longwarn`}
                aria-expanded={ariaExpanded}
                icon={
                  <UiOverlaysAndIconsCustomIcon
                    name={ariaExpanded ? `CaretUp` : `CaretDown`}
                    size={`xs`}
                  />
                }
                onClick={(..._extraArguments: unknown[]): Dynamic =>
                  setAriaExpanded(
                    (
                      documentLinkPopover?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => !documentLinkPopover,
                  )
                }
                className={`text-secondary`}
              >{`Full URL`}</Button>
            )}
            <span className={`border-strong mx-0.5 h-[18px] border-l`} />
            <TooltipGroup>
              <LinkPopoverIconButton
                label={`Open link`}
                icon={`ArrowOutSquare`}
                disabled={!documentLinksKind && !documentLinkPopoverResult}
                onClick={(..._extraArguments: unknown[]): undefined => {
                  if (!documentLinkPopoverHandler()) {
                    onCancel2();
                  }
                }}
              />
              <LinkPopoverIconButton
                label={`Copy link`}
                icon={`Copy`}
                disabled={!abs}
                onClick={(..._extraArguments: unknown[]): undefined => {
                  if (!(documentLinkPopoverHandler() || !abs)) {
                    CopyLinkFallbackUrl(abs)
                      .finally(onCancel)
                      .catch((..._extraArguments: unknown[]): undefined => {});
                  }
                }}
              />
              {!readOnly && (
                <jsxRuntime.Fragment>
                  <LinkPopoverIconButton
                    label={`Edit link`}
                    icon={`Edit`}
                    disabled={disabled}
                    onClick={(..._extraArguments: unknown[]): undefined => {
                      if (!documentLinkPopoverHandler()) {
                        onEdit();
                      }
                    }}
                  />
                  <LinkPopoverIconButton
                    label={`Remove link`}
                    icon={`Disconnect`}
                    disabled={disabled}
                    onClick={(..._extraArguments: unknown[]): undefined => {
                      if (!documentLinkPopoverHandler()) {
                        onCommit({
                          type: `link-unlink`,
                          nodeId: pop.nodeId,
                          from: pop.from,
                          to: pop.to,
                        });
                      }
                    }}
                  />
                </jsxRuntime.Fragment>
              )}
            </TooltipGroup>
          </div>
          {ariaExpanded && documentLinkPopoverResult && (
            <div
              data-testid={`ldoc-linkpop-full`}
              style={{
                maxHeight: maxHeight,
              }}
              className={`border-strong text-secondary mt-1.5 overflow-y-auto border-t px-2 pt-1.5 text-[12px] break-all select-text [unicode-bidi:plaintext]`}
            >
              {documentLinkPopoverResult.open}
            </div>
          )}
        </div>
      )}
    </Surface>,
    document.body,
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentLinksStep1(): void {
  (documentLinksLimit420 = 420);
  (documentLinksLimit44 = 44);
  (documentLinksLimit204 = 204);
  (documentLinksLimit26 = 26);
  (documentLinksLimit360 = 360);
  (DocumentLinksState = `${resolveUiTooltipsAndControlsValue3(`popover`)} absolute inset-x-0 z-10 p-1`);
  (DocumentLinks_TextMutedTextFootnotePy1FontMediumCompactPx2ComfortablePx25 = `text-muted text-footnote py-1 font-medium compact:px-2 comfortable:px-2.5`);
  (documentLinksLimit4 = 4);
  (documentLinksPattern = /^[/#]/);
  (documentLinksLimit72 = 72);
  (documentLinksLimit250 = 250);
  (DocumentLinks_Styles = `:not([disabled]):not([aria-disabled="true"])`);
}

export {
  DocumentLinkPopover,
  getDocumentLinksKind,
  resolveDocumentLinksLevel,
  resolveDocumentLinksOpen,
  resolveDocumentLinksSlice,
  resolveDocumentLinksToLowerCase,
};

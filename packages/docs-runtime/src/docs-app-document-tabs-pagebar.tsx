/** BaoCut: document tabs from index-CX4IZqzA.js. */
import type { JSX } from "./jsx-runtime";
import type { CapturedProps as CapturedJsxProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
type JsxElementType = JSX.ElementType;
import {
  Button,
  DataModelSchemasDragging,
  EditorHostState31,
  EditorHostStyles12,
  Menu,
  Tooltip,
  TooltipGroup,
  UiOverlaysAndIconsCustomIcon,
  UiProviderAndLayersDensity,
  originalJsxProps,
  originalJsxsProps,
  preloadModule,
  resolveEditorHostValue20,
  resolvePlatformChunkLoadingLazy3,
  resolvePlatformLiveDocumentAndHistoryComponent,
  resolvePlatformLiveDocumentAndHistoryRail,
  resolveUiProviderAndLayersUseContext2,
  useRovingToolbar,
  useUiProviderAndLayersComfortable,
} from "./docs-app-dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "./docs-app-bootstrap";
import {
  TabCaretIcon,
  TabRailButton,
  disabledTabActionAccessibility,
  joinClasses,
  tabActionTooltip,
  tabRailContext,
  tabRailDisabledContext,
} from "./docs-app-document-context-actions-duplicate-document-tab";
import {
  DocumentSelectionLabel3,
  DocumentSelectionLabel4,
  DocumentSelectionState,
  DocumentSelection_ClickIntoTheDocumentFirst,
  DocumentSelection_Message,
  DocumentSelection_NotAvailableAtTheCursor,
} from "./docs-app-document-selection-create-heading-normalization-plugin";

var DocumentTabs_Styles: string;

function PagebarSeparator(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <span
      aria-hidden={`true`}
      className={`bg-border mx-0.5 h-4.5 w-px shrink-0 self-center`}
    />
  );
}

function PagebarMenuSection(
  {
    label: label,
    leading: leading,
    children: children,
    trailing: trailing,
    density = `compact`,
    readOnly = false,
    rule = true,
    "data-testid": dataTestid,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let {
    ref: pagebarMenuSectionResult,
    onKeyDown: onKeyDown,
    onFocus: onFocus,
  }: Dynamic = useRovingToolbar();
  let pagebarMenuSectionResult2: Dynamic = (0, React.useCallback)(
    (
      pagebarMenuSection?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      elementRef.current = pagebarMenuSection;
      pagebarMenuSectionResult(pagebarMenuSection);
    },
    [pagebarMenuSectionResult],
  );
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef.current;
    if (!element) return;
    let querySelector: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      setEnabledState(element.querySelector(DocumentTabs_Styles) === null);
    querySelector();
    if (typeof MutationObserver === "undefined") return;
    let mutationObserver = new MutationObserver(querySelector);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    });
    return (..._extraArguments: unknown[]) => mutationObserver.disconnect();
  }, []);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef.current;
    if (!element) return;
    let setEnabledState3 = (..._extraArguments: unknown[]): undefined => {
      let computedStyle = getComputedStyle(element);
      let difference =
        element.clientWidth -
        parseFloat(computedStyle.paddingLeft || `0`) -
        parseFloat(computedStyle.paddingRight || `0`);
      setEnabledState2(element.clientWidth > 0 && difference <= 1e3);
    };
    setEnabledState3();
    if (typeof ResizeObserver === "undefined") return;
    let resizeObserver = new ResizeObserver(setEnabledState3);
    resizeObserver.observe(element);
    return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
  }, []);
  return (
    <UiProviderAndLayersDensity
      density={density}
      render={
        <header
          {...originalJsxProps({
            ref: pagebarMenuSectionResult2,
            role: `toolbar`,
            "aria-label": label,
            tabIndex: -1,
            ...(enabledState
              ? {
                  role: `none`,
                  "aria-label": undefined,
                  tabIndex: undefined,
                }
              : null),
            onKeyDown: onKeyDown,
            onFocus: onFocus,
            "data-testid": dataTestid,
            "data-collapsed": enabledState2 ? `` : undefined,
            "data-rule": rule ? `` : undefined,
            className: `tb-root flex h-10 shrink-0 items-center gap-1 px-1 pointer-coarse:h-12 pointer-coarse:gap-1.5 pointer-coarse:px-2`,
          })}
        />
      }
    >
      <TooltipGroup>
        <tabRailContext.Provider value={enabledState2}>
          <tabRailDisabledContext.Provider value={readOnly}>
            <div
              className={`flex min-w-0 flex-1 items-center gap-1 self-stretch pointer-coarse:gap-1.5`}
            >
              {leading == null ? null : (
                <span
                  data-tb-cluster={``}
                  className={`flex shrink-0 items-center gap-1 pointer-coarse:gap-1.5`}
                >
                  {leading}
                </span>
              )}
              {children}
            </div>
            {trailing == null ? null : (
              <span
                data-tb-cluster={``}
                className={`flex shrink-0 items-center gap-1 pointer-coarse:gap-1.5`}
              >
                {trailing}
              </span>
            )}
          </tabRailDisabledContext.Provider>
        </tabRailContext.Provider>
      </TooltipGroup>
    </UiProviderAndLayersDensity>
  );
}

function canClosePagebarOnFocusLeave(
  ref?: Dynamic,
  ref2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (..._extraArguments: unknown[]) => {
    let ownerDocument: Dynamic = ref.current?.ownerDocument ?? document;
    let activeElement: Dynamic = ownerDocument.activeElement;
    return !(
      activeElement !== null &&
      activeElement !== ownerDocument.body &&
      !(ref.current?.contains(activeElement) ?? false) &&
      !(ref2?.current?.contains(activeElement) ?? false)
    );
  };
}

function PagebarMenuTrigger(
  pagebarMenuTrigger?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    label: ariaLabel,
    tip: tip,
    shortcut: pagebarMenuTrigger2,
    children: pagebarMenuTrigger3,
    align = `start`,
    side = `bottom`,
    open: pagebarMenuTrigger4,
    onOpenChange: pagebarMenuTrigger5,
    disabled = false,
    disabledTip: disabledTip,
    finalFocus: pagebarMenuTrigger6,
    className: pagebarMenuTrigger7,
    footer: footer,
    "data-testid": dataTestid,
  }: Dynamic = pagebarMenuTrigger;
  let useContext: Dynamic = (0, React.useContext)(tabRailContext);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let pagebarMenuTrigger8: Dynamic = pagebarMenuTrigger4 ?? enabledState;
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let canClosePagebarOnFocusLeave2: Dynamic =
    pagebarMenuTrigger6 === undefined || pagebarMenuTrigger6 === true
      ? canClosePagebarOnFocusLeave(elementRef2, elementRef)
      : pagebarMenuTrigger6;
  let finalFocus: Dynamic =
    typeof canClosePagebarOnFocusLeave2 == `function`
      ? (..._extraArguments: unknown[]): Dynamic => {
          let canClosePagebarOnFocusLeave3: Dynamic =
            canClosePagebarOnFocusLeave2();
          if (canClosePagebarOnFocusLeave3 && !disabled) {
            setEnabledState2(true);
          }
          return canClosePagebarOnFocusLeave3;
        }
      : canClosePagebarOnFocusLeave2;
  let icon: Dynamic = pagebarMenuTrigger.icon ?? pagebarMenuTrigger.glyph;
  let name: Dynamic =
    pagebarMenuTrigger.readout === undefined ||
    pagebarMenuTrigger.readout === ``
      ? ariaLabel
      : pagebarMenuTrigger.readout + `, ` + ariaLabel;
  let disabledTabActionAccessibility2: Dynamic = disabledTabActionAccessibility(
    {
      disabled: disabled,
      name: name,
      reason: disabledTip ?? tip,
      expanded: false,
      hasPopup: `menu`,
    },
  );
  let jsx =
    pagebarMenuTrigger.readout === undefined ? (
      <Menu.Trigger
        render={
          (useContext || pagebarMenuTrigger.iconOnly === true) &&
          pagebarMenuTrigger.caret !== true ? (
            <Button
              {...originalJsxProps({
                iconOnly: true,
                variant: `ghost`,
                icon: icon,
                disabled: disabled,
                "aria-label": ariaLabel,
                ...disabledTabActionAccessibility2.inner,
                "data-testid": dataTestid,
                className: `shrink-0`,
              })}
            />
          ) : (
            <Button
              {...originalJsxsProps({
                variant: `ghost`,
                icon: icon,
                disabled: disabled,
                "aria-label": ariaLabel,
                ...disabledTabActionAccessibility2.inner,
                "data-testid": dataTestid,
                className: `shrink-0`,
                children: [
                  useContext || pagebarMenuTrigger.iconOnly === true
                    ? null
                    : ariaLabel,
                  pagebarMenuTrigger.caret === true ? <TabCaretIcon /> : null,
                ],
              })}
            />
          )
        }
      />
    ) : (
      <Menu.Trigger
        render={
          <Button
            {...originalJsxsProps({
              variant: `ghost`,
              disabled: disabled,
              "aria-label": name,
              ...disabledTabActionAccessibility2.inner,
              "data-testid": dataTestid,
              className: `shrink-0 tabular-nums`,
              children: [pagebarMenuTrigger.readout, <TabCaretIcon />],
            })}
          />
        }
      />
    );
  let className = joinClasses(
    `relative inline-flex shrink-0 rounded align-top outline-none focus-visible:shadow-focus`,
    pagebarMenuTrigger7,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (disabled && pagebarMenuTrigger8) {
        if (pagebarMenuTrigger4 === undefined) {
          setEnabledState(false);
        }
        pagebarMenuTrigger5?.(false);
      }
      if (disabled) {
        setEnabledState2(false);
      }
    },
    [disabled],
  );
  return (
    <Menu.Root
      open={disabled ? false : pagebarMenuTrigger8}
      disabled={disabled}
      onOpenChange={(
        pagebarMenuTrigger9?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (pagebarMenuTrigger4 === undefined) {
          setEnabledState(pagebarMenuTrigger9);
        }
        pagebarMenuTrigger5?.(pagebarMenuTrigger9);
      }}
    >
      <Tooltip
        content={
          tabActionTooltip({
            label: ariaLabel,
            tip: tip,
            disabledTip: disabledTip,
            disabled: disabled,
          }).content
        }
        shortcut={disabled ? undefined : pagebarMenuTrigger2}
        side={side}
        hoverable={false}
        open={
          !disabled && (pagebarMenuTrigger8 || enabledState2)
            ? false
            : undefined
        }
      >
        <span
          {...originalJsxsProps({
            ref: elementRef,
            tabIndex: disabled ? 0 : undefined,
            ...disabledTabActionAccessibility2.props,
            onPointerEnter: enabledState2
              ? (..._extraArguments: unknown[]): Dynamic =>
                  setEnabledState2(false)
              : undefined,
            onBlur: enabledState2
              ? (..._extraArguments: unknown[]): Dynamic =>
                  setEnabledState2(false)
              : undefined,
            onFocus: enabledState2
              ? (
                  pagebarMenuTrigger9?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let relatedTarget: Dynamic =
                    pagebarMenuTrigger9.relatedTarget;
                  if (
                    relatedTarget &&
                    relatedTarget.isConnected &&
                    !elementRef2.current?.contains(relatedTarget) &&
                    !elementRef.current?.contains(relatedTarget)
                  ) {
                    setEnabledState2(false);
                  }
                }
              : undefined,
            "data-tb-icon":
              pagebarMenuTrigger.readout === undefined &&
              pagebarMenuTrigger.caret !== true &&
              (useContext || pagebarMenuTrigger.iconOnly === true)
                ? ``
                : undefined,
            "data-tb-readout":
              pagebarMenuTrigger.readout === undefined ? undefined : ``,
            className: className,
            children: [jsx, disabledTabActionAccessibility2.mirror],
          })}
        />
      </Tooltip>
      <Menu.Popup
        ref={elementRef2}
        side={side}
        align={align}
        finalFocus={finalFocus}
        footer={footer}
      >
        {pagebarMenuTrigger3}
      </Menu.Popup>
    </Menu.Root>
  );
}

var DocumentTabsTable: Dynamic;

function resolveDocumentTabsValue(
  documentTabsValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let DocumentTabsTableItem: Dynamic = DocumentTabsTable[documentTabsValue];
  if (DocumentTabsTableItem === undefined)
    throw Error(`menuGlyphs: no glyph for catalog row "${documentTabsValue}"`);
  return DocumentTabsTableItem;
}

var resolveDocumentTabsValue2: Dynamic;

var DocumentTabsState: Dynamic;

function resolveDocumentTabsReduce(
  items?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  dependencies: Dynamic = DocumentTabsState,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    items.reduce(
      (
        accumulator?: Dynamic,
        accumulator2?: Dynamic,
        accumulator3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => accumulator + accumulator2.width + (accumulator3 ? 6 : 0),
      0,
    ) +
      (context && items.length > 0 ? dependencies : 0) <=
    options
  )
    return items.length;
  let resolveDocumentTabsReduceHandler = (
    documentTabsReduce?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let dependencies2: Dynamic = dependencies;
    let enabled = true;
    items.forEach(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (index < documentTabsReduce || item.pin) {
          dependencies2 += item.width + (enabled ? 0 : 6);
          enabled = false;
        }
      },
    );
    return dependencies2 <= options;
  };
  let itemsCount: Dynamic = items.length;
  for (; itemsCount > 0 && !resolveDocumentTabsReduceHandler(itemsCount); )
    itemsCount--;
  return itemsCount;
}

function filterDocumentTabsShown(
  filterDocumentTabsShown2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let folded: Dynamic = filterDocumentTabsShown2.filter(
    (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
      index >= options && !item.pin && !item.sep,
  );
  let shown: Dynamic = [];
  for (
    filterDocumentTabsShown2.forEach(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(index < options || item.pin === true)) {
          if (shown.length && shown[shown.length - 1].sep) {
            shown.pop();
          }
          return;
        }
        if (!(item.sep && shown.length === 0)) {
          shown.push(item);
        }
      },
    );
    shown.length && shown[shown.length - 1].sep;

  )
    shown.pop();
  return {
    shown: shown,
    folded: folded,
  };
}

function PagebarStrip(
  {
    items: items,
    moreLabel = `More`,
    footer = null,
    onMenuClose: onMenuClose,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let [amountState, setAmountState]: Dynamic = (0, React.useState)(1 / 0);
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef.current;
    if (!element) return;
    let setAmountState2 = (..._extraArguments: unknown[]): undefined => {
      setAmountState(element.clientWidth > 0 ? element.clientWidth : 1 / 0);
    };
    setAmountState2();
    if (typeof ResizeObserver === "undefined") return;
    let resizeObserver = new ResizeObserver(setAmountState2);
    resizeObserver.observe(element);
    return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
  }, []);
  let matchesFooter = footer != null && footer !== false;
  let documentTabsValue2: Dynamic = resolveDocumentTabsValue2(
    resolveUiProviderAndLayersUseContext2() === `comfortable`,
  );
  let resolveDocumentTabsReduce2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveDocumentTabsReduce(
        items,
        amountState,
        matchesFooter,
        documentTabsValue2,
      ),
    [items, amountState, matchesFooter, documentTabsValue2],
  );
  let {
    shown: filterDocumentTabsShown2,
    folded: filterDocumentTabsShown3,
  }: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      filterDocumentTabsShown(items, resolveDocumentTabsReduce2),
    [items, resolveDocumentTabsReduce2],
  );
  return (
    <div
      ref={elementRef}
      className={`relative flex min-w-0 flex-1 items-center gap-1 self-stretch overflow-x-clip pointer-coarse:gap-1.5`}
      data-testid={`pagebar-strip`}
      data-folded={filterDocumentTabsShown3.length || undefined}
    >
      {filterDocumentTabsShown2.map(
        (event?: Dynamic, ..._extraArguments: unknown[]) => (
          <span
            {...originalJsxProps(
              {
                className: `contents`,
                children: event.node,
              },
              event.key,
            )}
          />
        ),
      )}
      {filterDocumentTabsShown3.length > 0 || matchesFooter ? (
        <span
          className={`contents`}
          onPointerDownCapture={(..._extraArguments: unknown[]): undefined => {
            enabledRef.current = true;
          }}
          onKeyDownCapture={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (event.currentTarget.contains(event.target)) {
              enabledRef.current = false;
            }
          }}
        >
          <PagebarMenuTrigger
            icon={`DotsHorizontal`}
            label={moreLabel}
            iconOnly={true}
            tip={moreLabel}
            align={`end`}
            data-testid={`pagebar-more`}
            onOpenChange={(
              pagebarStrip?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (!pagebarStrip && enabledRef.current) {
                onMenuClose?.();
              }
            }}
          >
            {filterDocumentTabsShown3.map(
              (event?: Dynamic, ..._extraArguments: unknown[]) => (
                <span
                  {...originalJsxProps(
                    {
                      className: `contents`,
                      children: event.row,
                    },
                    event.key,
                  )}
                />
              ),
            )}
            {filterDocumentTabsShown3.length > 0 && matchesFooter ? (
              <Menu.Separator />
            ) : null}
            {matchesFooter ? footer : null}
          </PagebarMenuTrigger>
        </span>
      ) : null}
    </div>
  );
}

function PagebarCommandItem(
  {
    icon: icon,
    label: label,
    shortcut: shortcut,
    pressed: pressed,
    disabled: disabled,
    description: description,
    onClick: onClick,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <Menu.Item
      icon={icon}
      shortcut={shortcut}
      checked={pressed}
      checkedRole={pressed === undefined ? undefined : `checkbox`}
      disabled={disabled}
      description={description}
      onClick={onClick}
    >
      {label}
    </Menu.Item>
  );
}

function resolveDocumentTabsValue3(
  documentTabsValue3?: unknown,
  ..._extraArguments: unknown[]
) {
  return null;
}

var DocumentTabsDefault: Dynamic;

function UseDocumentTabsFallbackComponent(
  documentTabsFallback?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [useDocumentTabsFallbackState]: Dynamic = (0, React.useState)(
    resolvePlatformLiveDocumentAndHistoryComponent,
  );
  return (
    <React.Suspense fallback={null}>
      {((
        RenderedComponent3: JsxElementType,
        CapturedProps3: CapturedJsxProps,
      ) => (
        <RenderedComponent3 {...CapturedProps3} />
      ))(
        useDocumentTabsFallbackState ?? DocumentTabsDefault,
        originalJsxProps({
          ...documentTabsFallback,
        }),
      )}
    </React.Suspense>
  );
}

function resolveDocumentTabsPreview(
  documentTabsPreview?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentTabsPreview.preview
    ? true
    : documentTabsPreview.surface === undefined
      ? false
      : documentTabsPreview.surface === `prose`
        ? documentTabsPreview.scrolled || documentTabsPreview.panel
        : true;
}

function resolveDocumentTabsEditable(
  documentTabsEditable?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentTabsEditable === null
    ? DocumentSelection_ClickIntoTheDocumentFirst
    : documentTabsEditable.editable
      ? documentTabsEditable.formattable
        ? null
        : DocumentSelection_NotAvailableAtTheCursor
      : DocumentSelection_Message;
}

function resolveDocumentTabsIncludes(
  documentTabsIncludes?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentTabsIncludes.k === `insert`
    ? options.inserts.includes(documentTabsIncludes.id)
    : documentTabsIncludes.k === `style`
      ? documentTabsIncludes.level === 0 || options.headings
      : true;
}

var DocumentTabs_TypeInTheDocumentForMore: string;

var resolveDocumentTabsPreventDefault: Dynamic;

function useDocumentTabsVia(..._extraArguments: unknown[]): Dynamic {
  let labelRef: Dynamic = (0, React.useRef)(`pointer`);
  let elementRef: Dynamic = (0, React.useRef)(null);
  return {
    via: (..._extraArguments: unknown[]): Dynamic => labelRef.current,
    keySeat: (..._extraArguments: unknown[]): Dynamic =>
      labelRef.current === `key` ? elementRef.current : null,
    props: {
      onPointerDownCapture: (..._extraArguments: unknown[]): undefined => {
        labelRef.current = `pointer`;
        elementRef.current = null;
      },
      onKeyDownCapture: (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.currentTarget.contains(event.target)) {
          labelRef.current = `key`;
          elementRef.current =
            event.target.closest(`button, [role='button']`) ?? event.target;
        }
      },
    },
  };
}

function Pagebar(
  {
    tabs: tabs,
    pageSkill: pageSkill,
    docFont: docFont,
    docLayout: docLayout,
    status: status,
    posture: posture,
    surface: surface,
    preview: preview,
    image: image,
    format: format,
    onCommand: onCommand,
    onMenuClose: onMenuClose,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let scrolled: Dynamic = DocumentSelectionState(
    (pagebar?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      pagebar.scrolled,
  );
  let panel: Dynamic = DocumentSelectionState(
    (pagebar?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      pagebar.panel,
  );
  let documentTabsEditable = resolveDocumentTabsEditable(format);
  let matchesDocumentTabsEditable = documentTabsEditable === null;
  let rail: Dynamic = resolvePlatformLiveDocumentAndHistoryRail();
  let useDocumentTabsVia2: Dynamic = useDocumentTabsVia();
  let matchesCondition =
    useUiProviderAndLayersComfortable(`compact`) === `comfortable`;
  let width = matchesCondition ? 32 : 24;
  let width2 = matchesCondition ? 52 : 40;
  let keySeat: Dynamic = (
    pagebar?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    onCommand(
      pagebar,
      useDocumentTabsVia2.via(),
      useDocumentTabsVia2.keySeat(),
    );
  let record: Dynamic = {
    onOpenChange: (
      pagebar?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!pagebar && useDocumentTabsVia2.via() === `pointer`) {
        onMenuClose();
      }
    },
  };
  let pagebarHandler: Dynamic = (
    pagebar?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !matchesDocumentTabsEditable || format === null
      ? {
          disabled: true,
          tip: documentTabsEditable ?? undefined,
        }
      : format.inserts.includes(pagebar)
        ? {
            disabled: false,
            tip: undefined,
          }
        : {
            disabled: true,
            tip: DocumentSelection_NotAvailableAtTheCursor,
          };
  let pagebarHandler2: Dynamic = (
    pagebar?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    pagebar.k === `insert`
      ? pagebarHandler(pagebar.id)
      : {
          disabled: !matchesDocumentTabsEditable,
          tip: documentTabsEditable ?? undefined,
        };
  let resolveDocumentTabsValue7: Dynamic = (
    key?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let DocumentSelectionLabel42: Dynamic = DocumentSelectionLabel4.find(
      (DocumentSelectionLabel43?: Dynamic, ..._extraArguments: unknown[]) =>
        DocumentSelectionLabel43.id === key,
    );
    let pagebarHandler5: Dynamic = pagebarHandler2(
      DocumentSelectionLabel42.cmd,
    );
    let onClick: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      keySeat(DocumentSelectionLabel42.cmd);
    let glyph: Dynamic = resolveDocumentTabsValue(key);
    return {
      key: key,
      width: width,
      node: (
        <TabRailButton
          iconOnly={true}
          glyph={glyph}
          label={DocumentSelectionLabel42.label}
          disabled={pagebarHandler5.disabled}
          disabledTip={pagebarHandler5.tip}
          onMouseDown={resolveDocumentTabsPreventDefault}
          onClick={onClick}
          data-testid={`pagebar-${key}`}
        />
      ),
      row: (
        <PagebarCommandItem
          icon={glyph}
          label={DocumentSelectionLabel42.label}
          disabled={pagebarHandler5.disabled}
          description={pagebarHandler5.tip}
          onClick={onClick}
        />
      ),
    };
  };
  let pagebarHandler3: Dynamic = (..._extraArguments: unknown[]) => {
    if (image === undefined) return null;
    let documentTabsEditable2: Dynamic =
      documentTabsEditable ??
      (format !== null && !format.caret
        ? `Not available at the cursor`
        : image.whyNot);
    let disabled = documentTabsEditable2 !== null;
    return {
      key: `image`,
      width: width,
      node: (
        <TabRailButton
          iconOnly={true}
          icon={`Image`}
          label={`Image`}
          disabled={disabled}
          disabledTip={documentTabsEditable2 ?? undefined}
          onMouseDown={resolveDocumentTabsPreventDefault}
          onClick={image.onPick}
          data-testid={`pagebar-image`}
        />
      ),
      row: (
        <PagebarCommandItem
          icon={`Image`}
          label={`Image`}
          disabled={disabled}
          description={documentTabsEditable2 ?? undefined}
          onClick={image.onPick}
        />
      ),
    };
  };
  let node = (
    <PagebarMenuTrigger
      {...originalJsxProps({
        icon: `Add`,
        label: `Insert`,
        iconOnly: true,
        caret: true,
        shortcut: `/`,
        disabled: !matchesDocumentTabsEditable,
        disabledTip: documentTabsEditable ?? undefined,
        "data-testid": `pagebar-insert`,
        footer: (
          <div
            className={`text-footnote text-muted border-border border-t px-3 py-1.5`}
            data-testid={`pagebar-insert-hint`}
          >
            {DocumentTabs_TypeInTheDocumentForMore}
          </div>
        ),
        ...record,
        children: (
          <Menu.Group>
            {DocumentSelectionLabel3.flatMap(
              (
                DocumentSelectionLabel32?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (
                  matchesDocumentTabsEditable &&
                  format !== null &&
                  !resolveDocumentTabsIncludes(
                    DocumentSelectionLabel32.cmd,
                    format,
                  )
                )
                  return [];
                let pagebarHandler5: Dynamic = pagebarHandler2(
                  DocumentSelectionLabel32.cmd,
                );
                return [
                  <Menu.Item
                    {...originalJsxProps(
                      {
                        icon: resolveDocumentTabsValue(
                          DocumentSelectionLabel32.id,
                        ),
                        disabled: pagebarHandler5.disabled,
                        description: pagebarHandler5.tip,
                        onClick: (..._extraArguments: unknown[]): Dynamic =>
                          keySeat(DocumentSelectionLabel32.cmd),
                        "data-testid": `pagebar-insert-${DocumentSelectionLabel32.id}`,
                        children: DocumentSelectionLabel32.label,
                      },
                      DocumentSelectionLabel32.id,
                    )}
                  />,
                ];
              },
            )}
          </Menu.Group>
        ),
      })}
    />
  );
  let pagebarHandler4: Dynamic = posture === `none` ? null : pagebarHandler3();
  let items: Dynamic =
    posture === `none`
      ? []
      : [
          resolveDocumentTabsValue7(`table`),
          ...(pagebarHandler4 ? [pagebarHandler4] : []),
          resolveDocumentTabsValue7(`checkbox`),
          {
            key: `insert`,
            width: width2,
            node: node,
            row: null,
            pin: true,
          },
        ];
  return (
    <PagebarMenuSection
      label={`Document actions`}
      data-testid={`page-action-bar`}
      rule={resolveDocumentTabsPreview({
        surface: surface,
        preview: preview,
        scrolled: scrolled,
        panel: panel,
      })}
      leading={
        <jsxRuntime.Fragment>
          {tabs == null ? null : (
            <span className={`ml-0.5 inline-flex`}>{tabs}</span>
          )}
          {tabs != null && !preview ? pageSkill : null}
          {tabs != null && !preview ? docFont : null}
          {tabs != null && !preview ? docLayout : null}
          {tabs == null ? null : status}
          {tabs != null && items.length > 0 ? <PagebarSeparator /> : null}
        </jsxRuntime.Fragment>
      }
    >
      {preview && rail !== null ? (
        <UseDocumentTabsFallbackComponent
          rail={rail}
          divided={tabs != null}
          onLeave={onMenuClose}
        />
      ) : items.length > 0 ? (
        <div
          {...originalJsxProps({
            className: `contents`,
            ...useDocumentTabsVia2.props,
            children: <PagebarStrip items={items} onMenuClose={onMenuClose} />,
          })}
        />
      ) : null}
    </PagebarMenuSection>
  );
}

function PagebarImageInput(
  { inputRef: inputRef, focusTarget: focusTarget }: Dynamic,
  ..._extraArguments: unknown[]
) {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let showPicker = (
        pagebarImageInput: Dynamic = false,
        ..._extraArguments: unknown[]
      ) => {
        let input: Dynamic = inputRef.current;
        if (input === null) return false;
        if (!pagebarImageInput) {
          input.click();
          return true;
        }
        if (typeof input.showPicker != `function`) return false;
        try {
          input.showPicker();
          return true;
        } catch {
          return false;
        }
      };
      DataModelSchemasDragging.getState().setImagePicker(showPicker);
      return (..._extraArguments: unknown[]): undefined => {
        if (DataModelSchemasDragging.getState().imagePicker === showPicker) {
          DataModelSchemasDragging.getState().setImagePicker(null);
        }
      };
    },
    [inputRef],
  );
  return (
    <input
      ref={inputRef}
      type={`file`}
      accept={`image/*,video/mp4,video/webm`}
      multiple={true}
      hidden={true}
      data-testid={`pagebar-image-input`}
      onChange={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let items: Dynamic = [...(event.currentTarget.files ?? [])];
        event.currentTarget.value = ``;
        let onPick: Dynamic =
          DataModelSchemasDragging.getState().intercept?.onPick;
        if (!(items.length === 0 || onPick === undefined)) {
          focusTarget();
          onPick(items);
        }
      }}
    />
  );
}

var DocumentTabsState2: Dynamic;

function installDocumentTabsAddEventListener(
  installDocumentTabsAddEventListener2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return DocumentTabsState2
    ? (DocumentTabsState2.addEventListener(
        `change`,
        installDocumentTabsAddEventListener2,
      ),
      (..._extraArguments: unknown[]): Dynamic =>
        DocumentTabsState2.removeEventListener(
          `change`,
          installDocumentTabsAddEventListener2,
        ))
    : (..._extraArguments: unknown[]): undefined => undefined;
}

var resolveDocumentTabsValue4: (..._extraArguments: unknown[]) => boolean;

function useDocumentTabsUseSyncExternalStore(
  documentTabsUseSyncExternalStore?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    installDocumentTabsAddEventListener,
    resolveDocumentTabsValue4,
    (..._extraArguments: unknown[]) => false,
  );
  return documentTabsUseSyncExternalStore && !useSyncExternalStore;
}

function PagebarMenuFit(
  { value: value, onPick: onPick, testid: testid }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <Menu.Group>
      <Menu.Item
        checkedRole={`radio`}
        checked={value === `fit`}
        onClick={(..._extraArguments: unknown[]): Dynamic => onPick(`fit`)}
        data-testid={`${testid}-fit`}
      >
        {resolveEditorHostValue20(`fit`)}
      </Menu.Item>
      <Menu.Separator />
      {EditorHostState31.map(
        (item?: Dynamic, ..._extraArguments: unknown[]) => (
          <Menu.Item
            {...originalJsxProps(
              {
                checkedRole: `radio`,
                checked: value === item,
                onClick: (..._extraArguments: unknown[]): Dynamic =>
                  onPick(item),
                "data-testid": `${testid}-${item}`,
                children: (
                  <span className={`tabular-nums`}>
                    {resolveEditorHostValue20(item)}
                  </span>
                ),
              },
              item,
            )}
          />
        ),
      )}
    </Menu.Group>
  );
}

var resolveDocumentTabsSend: Dynamic;

var resolveDocumentTabsFocus: Dynamic;

var DocumentTabsState3: Dynamic;

var DocumentTabsState4: Dynamic;

var DocumentTabsState5: Dynamic;

var DocumentTabsState6: Dynamic;

function resolveDocumentTabsCanUndo(..._extraArguments: unknown[]): Dynamic {
  return {
    canUndo: DocumentSelectionState(DocumentTabsState3),
    canRedo: DocumentSelectionState(DocumentTabsState4),
    undo: DocumentTabsState5,
    redo: DocumentTabsState6,
  };
}

function resolveDocumentTabsFormat(..._extraArguments: unknown[]): Dynamic {
  let format: Dynamic = DocumentSelectionState(
    (documentTabs?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentTabs.state,
  );
  let DocumentSelectionState7: Dynamic = DocumentSelectionState(
    (documentTabs?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentTabs.send,
  );
  let DocumentSelectionState8: Dynamic = DocumentSelectionState(
    (documentTabs?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentTabs.focusDoc,
  );
  return {
    format: format,
    run: (0, React.useCallback)(
      (
        documentTabs?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!DocumentSelectionState7) return;
        if (options === `pointer` || documentTabs.k === `insert`) {
          DocumentSelectionState8?.();
          DocumentSelectionState7(documentTabs);
          return;
        }
        let context2: Dynamic =
          context ??
          (typeof document !== "undefined" ? document.activeElement : null);
        DocumentSelectionState7(documentTabs);
        let focus = (..._extraArguments: unknown[]): undefined => {
          if (
            context2 &&
            context2.isConnected &&
            document.activeElement instanceof HTMLIFrameElement
          ) {
            context2.focus();
          }
        };
        let index = 0;
        let enabled = false;
        let requestAnimationFrame2 = (
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!enabled) {
            enabled = true;
            subscribe();
            focus();
            requestAnimationFrame(focus);
          }
        };
        let subscribe: Dynamic = DocumentSelectionState.subscribe(
          (
            documentTabs2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (documentTabs2.state !== options2.state) {
              requestAnimationFrame2();
            }
          },
        );
        let subscribe2 = (..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            if (index === 0) {
              focus();
            }
            if (++index < 12) {
              requestAnimationFrame(subscribe2);
            } else {
              enabled = true;
              subscribe();
            }
          }
        };
        requestAnimationFrame(subscribe2);
      },
      [DocumentSelectionState7, DocumentSelectionState8],
    ),
    refocusEditor: (0, React.useCallback)(
      (..._extraArguments: unknown[]): undefined => {
        let getAttribute = (..._extraArguments: unknown[]): undefined => {
          let activeElement =
            typeof document !== "undefined" ? document.activeElement : null;
          if (
            activeElement === null ||
            activeElement === document.body ||
            activeElement instanceof HTMLIFrameElement ||
            (activeElement instanceof Element &&
              (activeElement.closest(`[role="menu"]`) !== null ||
                (activeElement.closest(`[data-testid="page-action-bar"]`) !==
                  null &&
                  activeElement.getAttribute(`aria-haspopup`) === `menu`)))
          ) {
            DocumentSelectionState8?.();
            DocumentSelectionState7?.({
              k: `refocus`,
            });
          }
        };
        getAttribute();
        requestAnimationFrame(getAttribute);
      },
      [DocumentSelectionState7, DocumentSelectionState8],
    ),
    focusTarget: (0, React.useCallback)(
      (..._extraArguments: unknown[]): undefined => {
        DocumentSelectionState8?.();
        DocumentSelectionState7?.({
          k: `refocus`,
        });
      },
      [DocumentSelectionState7, DocumentSelectionState8],
    ),
  };
}

function resolveDocumentTabsValue5(
  element?: Dynamic,
  element2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    element.querySelector(`button[data-page-chrome-entry]`) ??
    element2?.querySelector(`[role="treeitem"][tabindex="0"]`) ??
    null
  );
}

function useDocumentTabsFocusVisible(
  documentTabsFocusVisible?: Dynamic,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  if (documentTabsFocusVisible && !enabledRef.current) {
    enabledRef2.current =
      document.activeElement?.closest(
        `button[data-page-chrome-entry], [data-testid="tab-rail-panel"]`,
      ) != null;
  }
  enabledRef.current = documentTabsFocusVisible;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(!documentTabsFocusVisible || !enabledRef2.current)) {
        enabledRef2.current = false;
        resolveDocumentTabsValue5(document, ref.current)?.focus({
          focusVisible: true,
          preventScroll: true,
        });
      }
    },
    [documentTabsFocusVisible, ref],
  );
}

function useDocumentTabsPreventScroll(
  documentTabsPreventScroll?: Dynamic,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  if (!documentTabsPreventScroll && enabledRef.current) {
    let ref2: Dynamic = ref.current;
    let activeElement = document.activeElement;
    enabledRef2.current =
      ref2 !== null &&
      activeElement !== null &&
      (ref2.contains(activeElement) ||
        (activeElement.closest(`[role="menu"]`) !== null &&
          ref2.querySelector(`[data-tab-menu][data-popup-open]`) !== null));
  }
  enabledRef.current = documentTabsPreventScroll;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (documentTabsPreventScroll || !enabledRef2.current) return;
      enabledRef2.current = false;
      let focus = (..._extraArguments: unknown[]): undefined => {
        let activeElement: Dynamic = (document as Dynamic).activeElement;
        if (
          !(
            activeElement !== null &&
            activeElement !== (document as Dynamic).body &&
            !(ref.current?.contains(activeElement) ?? false)
          )
        ) {
          (document as Dynamic)
            .querySelector(`button[data-page-chrome-entry]`)
            ?.focus({
              preventScroll: true,
            });
        }
      };
      if (document.hasFocus()) {
        focus();
        return;
      }
      let enabled = false;
      let useDocumentTabsPreventScrollResult: Dynamic;
      let useDocumentTabsPreventScrollResult2: Dynamic;
      let items = [`pointerdown`, `mousedown`, `touchstart`];
      let useDocumentTabsPreventScrollHandler = (
        ..._extraArguments: unknown[]
      ): undefined => {
        enabled = true;
        if (useDocumentTabsPreventScrollResult !== undefined) {
          clearTimeout(useDocumentTabsPreventScrollResult);
        }
        useDocumentTabsPreventScrollResult = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            enabled = false;
          },
          0,
        );
      };
      let removeEventListener = (..._extraArguments: unknown[]): undefined => {
        for (let useDocumentTabsPreventScrollResult3 of items as Dynamic)
          document.removeEventListener(
            useDocumentTabsPreventScrollResult3,
            useDocumentTabsPreventScrollHandler,
            true,
          );
      };
      let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          removeEventListener();
          return;
        }
        useDocumentTabsPreventScrollResult2 = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            removeEventListener();
            if (!enabled && document.hasFocus()) {
              focus();
            }
          },
          0,
        );
      };
      for (let useDocumentTabsPreventScrollResult3 of items as Dynamic)
        document.addEventListener(
          useDocumentTabsPreventScrollResult3,
          useDocumentTabsPreventScrollHandler,
          {
            capture: true,
            passive: true,
          },
        );
      window.addEventListener(`focus`, removeEventListener2, {
        once: true,
      });
      return (..._extraArguments: unknown[]): undefined => {
        removeEventListener();
        window.removeEventListener(`focus`, removeEventListener2);
        if (useDocumentTabsPreventScrollResult2 !== undefined) {
          clearTimeout(useDocumentTabsPreventScrollResult2);
        }
        if (useDocumentTabsPreventScrollResult !== undefined) {
          clearTimeout(useDocumentTabsPreventScrollResult);
        }
      };
    },
    [documentTabsPreventScroll, ref],
  );
}

var DocumentTabsDocx: {
    docx: string;
    pdf: string;
    markdown: string;
    googleDocs: string;
    notion: string;
};

var DocumentTabsCheck: {
    check: string;
    show: string;
    hide: string;
    autocorrectOn: string;
    autocorrectOff: string;
};

var DocumentTabsUndo: {
    undo: string;
    redo: string;
};

function resolveDocumentTabsProseOpen(
  documentTabsProseOpen?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentTabsProseOpen.proseOpen &&
    !documentTabsProseOpen.previewUp &&
    documentTabsProseOpen.posture === `edit`
  );
}

var DocumentTabs_SetLanguage: string;

var DocumentTabs_VersionHistory: string;

function resolveDocumentTabsValue6(
  documentTabsValue6?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentTabsValue6 && options === `edit`;
}

function resolveDocumentTabsShell(
  documentTabsShell?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentTabsShell.shell &&
    !documentTabsShell.denied &&
    !documentTabsShell.failed
  );
}

function resolveDocumentTabsPhone(
  documentTabsPhone?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentTabsPhone.phone &&
    documentTabsPhone.frameCommentable &&
    !documentTabsPhone.frameWritable
  );
}

function resolveDocumentTabsCommentSelectionDisabled(
  documentTabsCommentSelectionDisabled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveDocumentTabsPhone(documentTabsCommentSelectionDisabled) &&
    !documentTabsCommentSelectionDisabled.commentSelectionDisabled
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentTabsPagebarStep1(): void {
  (DocumentTabs_Styles = `button, [role="button"], a[href], input, select, textarea, [tabindex]`);
  (DocumentTabsTable = {
    h1: <UiOverlaysAndIconsCustomIcon name={`Heading1`} size={`sm`} />,
    h2: <UiOverlaysAndIconsCustomIcon name={`Heading2`} size={`sm`} />,
    h3: <UiOverlaysAndIconsCustomIcon name={`Heading3`} size={`sm`} />,
    table: <UiOverlaysAndIconsCustomIcon name={`Table`} size={`sm`} />,
    dropdown: <UiOverlaysAndIconsCustomIcon name={`Dropdown`} size={`sm`} />,
    code: <UiOverlaysAndIconsCustomIcon name={`Code`} size={`sm`} />,
    date: <UiOverlaysAndIconsCustomIcon name={`Calendar`} size={`sm`} />,
    divider: <UiOverlaysAndIconsCustomIcon name={`Minus`} size={`sm`} />,
    quote: <UiOverlaysAndIconsCustomIcon name={`Quote`} size={`sm`} />,
    "bullet-list": (
      <UiOverlaysAndIconsCustomIcon name={`ListBullet`} size={`sm`} />
    ),
    "ordered-list": (
      <UiOverlaysAndIconsCustomIcon name={`ListNumbered`} size={`sm`} />
    ),
    checkbox: <UiOverlaysAndIconsCustomIcon name={`Checklist`} size={`sm`} />,
  });
  (resolveDocumentTabsValue2 = (
    documentTabsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (documentTabsValue2 ? 32 : 24) + 6);
  (DocumentTabsState = resolveDocumentTabsValue2(false));
  (DocumentTabsDefault = resolvePlatformChunkLoadingLazy3(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic => import("./version-bar"),
        mapPreloadDependencies([36, 1, 6, 2, 0, 3]),
        import.meta.url,
      ),
    (documentTabsDefault?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentTabsDefault.default,
    resolveDocumentTabsValue3,
  ));
  (DocumentTabs_TypeInTheDocumentForMore = `Type / in the document for more`);
  (resolveDocumentTabsPreventDefault = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => event.preventDefault());
  (DocumentTabsState2 = typeof matchMedia == `function` ? matchMedia(EditorHostStyles12) : null);
  (resolveDocumentTabsValue4 = (..._extraArguments: unknown[]) =>
    DocumentTabsState2?.matches === true);
  (resolveDocumentTabsSend = (documentTabsSend?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (documentTabsSend2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      documentTabsSend2.send !== null &&
      documentTabsSend2.state !== null &&
      documentTabsSend2.state.editable &&
      (documentTabsSend === `undo`
        ? documentTabsSend2.state.canUndo
        : documentTabsSend2.state.canRedo));
  (resolveDocumentTabsFocus = (documentTabsFocus?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): Dynamic =>
      DocumentSelectionState.getState().send?.({
        k: documentTabsFocus,
        focus: false,
      }));
  (DocumentTabsState3 = resolveDocumentTabsSend(`undo`));
  (DocumentTabsState4 = resolveDocumentTabsSend(`redo`));
  (DocumentTabsState5 = resolveDocumentTabsFocus(`undo`));
  (DocumentTabsState6 = resolveDocumentTabsFocus(`redo`));
  (DocumentTabsDocx = {
    docx: `export_docx`,
    pdf: `export_pdf`,
    markdown: `export_markdown`,
    googleDocs: `export_google_docs`,
    notion: `export_notion`,
  });
  (DocumentTabsCheck = {
    check: `check_spelling`,
    show: `show_spelling_errors`,
    hide: `hide_spelling_errors`,
    autocorrectOn: `enable_autocorrect`,
    autocorrectOff: `disable_autocorrect`,
  });
  (DocumentTabsUndo = {
    undo: `undo`,
    redo: `redo`,
  });
  (DocumentTabs_SetLanguage = `set_language`);
  (DocumentTabs_VersionHistory = `version_history`);
}

export {
  DocumentTabsCheck,
  DocumentTabsDocx,
  DocumentTabsUndo,
  DocumentTabs_SetLanguage,
  DocumentTabs_VersionHistory,
  Pagebar,
  PagebarCommandItem,
  PagebarImageInput,
  PagebarMenuFit,
  PagebarMenuTrigger,
  PagebarSeparator,
  PagebarStrip,
  canClosePagebarOnFocusLeave,
  resolveDocumentTabsCanUndo,
  resolveDocumentTabsCommentSelectionDisabled,
  resolveDocumentTabsFormat,
  resolveDocumentTabsPhone,
  resolveDocumentTabsProseOpen,
  resolveDocumentTabsShell,
  resolveDocumentTabsValue5,
  resolveDocumentTabsValue6,
  useDocumentTabsFocusVisible,
  useDocumentTabsPreventScroll,
  useDocumentTabsUseSyncExternalStore,
};

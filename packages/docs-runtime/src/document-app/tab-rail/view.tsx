// BaoCut: extracted tab rail view callbacks; state stays with the component.
import type { Dynamic } from "../../interop/legacy-dynamic";

export interface RenderTabRailViewContext {
  BOXED_HOME_BUTTON_CLASS: Dynamic;
  Button: Dynamic;
  Checkbox: Dynamic;
  DISABLED_TAB_CLASS: Dynamic;
  EditorHostBadge: Dynamic;
  EditorHostGlyph: Dynamic;
  IconButton: Dynamic;
  Menu: Dynamic;
  PaneResizeHandle: Dynamic;
  PhoneConfirmationDialog: Dynamic;
  PhoneDialogPopup: Dynamic;
  Popover: Dynamic;
  TABS_MENU_ICON_STYLE: Dynamic;
  TABS_MENU_LABEL: Dynamic;
  TAB_DRAG_MIME_TYPE: Dynamic;
  TAB_OUTLINE_REFRESH_MS: Dynamic;
  TabCaretIcon: Dynamic;
  TabTreeRows: Dynamic;
  TabsPlaceRowGate: Dynamic;
  Tooltip: Dynamic;
  UiDialogsRoot: Dynamic;
  UiOverlaysAndIconsCustomIcon: Dynamic;
  activeId: Dynamic;
  activeIdRef: Dynamic;
  canCreateSpreadsheetTabs: Dynamic;
  canRestoreTabMenuFocus: Dynamic;
  clearPendingTabRename: Dynamic;
  closest: Dynamic;
  contains: Dynamic;
  copyLink: Dynamic;
  deny: Dynamic;
  disabled: Dynamic;
  disabled2: Dynamic;
  displayNameEntry: Dynamic;
  displayNames: Dynamic;
  dragging: Dynamic;
  editing: Dynamic;
  elementRef: Dynamic;
  elementRef12: Dynamic;
  elementRef16: Dynamic;
  elementRef2: Dynamic;
  elementRef3: Dynamic;
  elementRef4: Dynamic;
  elementRef5: Dynamic;
  elementRef6: Dynamic;
  elementRef7: Dynamic;
  enabledRef2: Dynamic;
  enabledRef4: Dynamic;
  enabledRef7: Dynamic;
  enabledState: Dynamic;
  enabledState2: Dynamic;
  enabledState3: Dynamic;
  enabledState6: Dynamic;
  enabledState7: Dynamic;
  error: Dynamic;
  expanded: Dynamic;
  focus: Dynamic;
  focus3: Dynamic;
  headings: Dynamic;
  hint: Dynamic;
  isTabDropBelowLabel: Dynamic;
  jsxRuntime: Dynamic;
  kinds: Dynamic;
  lookupRef: Dynamic;
  matchesTabRailState: Dynamic;
  moveSavingIds: Dynamic;
  onClick: Dynamic;
  onClick2: Dynamic;
  onJumpHeading: Dynamic;
  onKeyDown: Dynamic;
  onKeyUp: Dynamic;
  onMouseDown: Dynamic;
  onOpen: Dynamic;
  onToggle: Dynamic;
  originalJsxProps: Dynamic;
  pid: Dynamic;
  presenceBy: Dynamic;
  probeKind: Dynamic;
  querySelector: Dynamic;
  readOnly: Dynamic;
  recordRef2: Dynamic;
  releaseActiveTabRename: Dynamic;
  requestTabRename: Dynamic;
  room: Dynamic;
  roots: Dynamic;
  seat: Dynamic;
  setDisabled2: Dynamic;
  setDisabled3: Dynamic;
  setDragging: Dynamic;
  setEditing: Dynamic;
  setEnabledState2: Dynamic;
  setEnabledState3: Dynamic;
  setEnabledState4: Dynamic;
  setEnabledState5: Dynamic;
  setHint: Dynamic;
  setTabRailState2: Dynamic;
  splashTs: Dynamic;
  tabRailResult: Dynamic;
  tabRailResult2: Dynamic;
  tabRailResult3: Dynamic;
  tabRailState: Dynamic;
  tabRailState2: Dynamic;
  tabsOnPage: Dynamic;
  tabsPlace: Dynamic;
  tabsPlaceOffered3: Dynamic;
  tabsPlaceOffered4: Dynamic;
  tabsPlaceOffered5: Dynamic;
  take2: Dynamic;
  timers: Dynamic;
  triggerChrome: Dynamic;
  triggerHidden: Dynamic;
  updateElement4: Dynamic;
  updateElement5: Dynamic;
  updateWait: Dynamic;
  why: Dynamic;
}

export function renderTabRailView(tabRailLiveContext: RenderTabRailViewContext): Dynamic {
  return (<tabRailLiveContext.jsxRuntime.Fragment>
      <tabRailLiveContext.Popover.Root
        open={tabRailLiveContext.enabledState2 && !tabRailLiveContext.triggerHidden}
        onOpenChange={(
          tabRail?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          switch (
            (tabRail &&
              ((tabRailLiveContext.elementRef4.current = null),
              (0, tabRailLiveContext.setEnabledState2)(),
              (tabRailLiveContext.enabledRef2.current = false),
              tabRailLiveContext.elementRef6.current !== null &&
                ((0, tabRailLiveContext.clearPendingTabRename)(`room:${tabRailLiveContext.pid}/${tabRailLiveContext.elementRef6.current}`),
                (tabRailLiveContext.elementRef6.current = null)),
              (tabRailLiveContext.enabledRef4.current = (0, tabRailLiveContext.releaseActiveTabRename)(`room:${tabRailLiveContext.pid}/`))),
            options.reason)
          ) {
            case `trigger-press`:
              (0, tabRailLiveContext.setEnabledState3)(tabRail);
              break;
            case `outside-press`:
            case `focus-out`:
              if (tabRailLiveContext.tabRailState2 === null) {
                (0, tabRailLiveContext.setEnabledState3)(tabRail);
              }
              break;
            case `escape-key`:
              if (tabRailLiveContext.tabRailState2 === null && tabRailLiveContext.editing === null) {
                (0, tabRailLiveContext.setEnabledState3)(tabRail);
              }
              break;
            default:
              break;
          }
          if (
            !tabRail &&
            options.reason === `focus-out` &&
            tabRailLiveContext.tabRailState2 === null
          ) {
            tabRailLiveContext.enabledRef2.current = (0, tabRailLiveContext.canRestoreTabMenuFocus)(
              document.activeElement,
              tabRailLiveContext.elementRef2.current,
              tabRailLiveContext.elementRef3.current,
            );
          }
        }}
        onOpenChangeComplete={(
          tabRail?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (tabRail) {
            tabRailLiveContext.elementRef4.current = null;
            (0, tabRailLiveContext.setEnabledState2)();
            tabRailLiveContext.enabledRef2.current = false;
            (0, tabRailLiveContext.updateWait)();
            tabRailLiveContext.recordRef2.current.top = null;
            if (tabRailLiveContext.enabledState7 && tabRailLiveContext.timers !== undefined) {
              tabRailLiveContext.recordRef2.current.armed = true;
              tabRailLiveContext.recordRef2.current.wait = tabRailLiveContext.timers.set(
                tabRailLiveContext.updateWait,
                tabRailLiveContext.TAB_OUTLINE_REFRESH_MS,
              );
            }
            (0, tabRailLiveContext.contains)();
            return;
          }
          (0, tabRailLiveContext.updateWait)();
          (0, tabRailLiveContext.setEnabledState5)(false);
          if (tabRailLiveContext.enabledRef2.current) {
            tabRailLiveContext.enabledRef2.current = false;
            if (
              (0, tabRailLiveContext.canRestoreTabMenuFocus)(
                document.activeElement,
                tabRailLiveContext.elementRef2.current,
                tabRailLiveContext.elementRef3.current,
              )
            ) {
              tabRailLiveContext.elementRef3.current?.focus();
            }
          }
          let element: Dynamic = tabRailLiveContext.elementRef4.current;
          tabRailLiveContext.elementRef4.current = null;
          tabRailLiveContext.elementRef6.current =
            element !== null && !(0, tabRailLiveContext.requestTabRename)(`room:${tabRailLiveContext.pid}/${element}`)
              ? element
              : null;
          let element2: Dynamic = tabRailLiveContext.elementRef5.current;
          (0, tabRailLiveContext.setEnabledState2)();
          if (element2 !== null && element2.tab === tabRailLiveContext.activeIdRef.current) {
            (0, tabRailLiveContext.onJumpHeading)?.(element2.h, true);
          }
        }}
      >
        {tabRailLiveContext.triggerHidden ? null : (
          <tabRailLiveContext.Tooltip content={`Document tabs`}>
            <tabRailLiveContext.Popover.Trigger
              ref={tabRailLiveContext.elementRef3}
              render={
                tabRailLiveContext.triggerChrome === `readout` ? (
                  <tabRailLiveContext.Button
                    variant={`ghost`}
                    icon={
                      <tabRailLiveContext.UiOverlaysAndIconsCustomIcon
                        name={`File`}
                        size={tabRailLiveContext.tabRailResult2 ? `md` : `sm`}
                        style={
                          tabRailLiveContext.tabRailResult2 ? tabRailLiveContext.TABS_MENU_ICON_STYLE : undefined
                        }
                      />
                    }
                    aria-label={
                      tabRailLiveContext.displayNameEntry === undefined
                        ? tabRailLiveContext.TABS_MENU_LABEL
                        : `${tabRailLiveContext.displayNameEntry}, tabs`
                    }
                    data-testid={`tab-rail-trigger`}
                    data-page-chrome-entry={``}
                    className={tabRailLiveContext.tabRailResult2 ? `min-w-0 shrink` : `shrink-0`}
                  >
                    <span
                      className={
                        tabRailLiveContext.tabRailResult2
                          ? `text-heading max-w-40 min-w-0 truncate`
                          : `max-w-40 min-w-0 truncate`
                      }
                    >
                      {tabRailLiveContext.displayNameEntry ?? tabRailLiveContext.TABS_MENU_LABEL}
                    </span>
                    <tabRailLiveContext.TabCaretIcon />
                  </tabRailLiveContext.Button>
                ) : tabRailLiveContext.triggerChrome === `button` ? (
                  <tabRailLiveContext.IconButton
                    aria-label={`Document tabs`}
                    data-testid={`tab-rail-trigger`}
                    data-page-chrome-entry={``}
                    variant={`default`}
                    size={
                      tabRailLiveContext.tabRailResult2
                        ? tabRailLiveContext.EditorHostBadge.size
                        : tabRailLiveContext.EditorHostGlyph.size
                    }
                    icon={
                      tabRailLiveContext.tabRailResult2 ? (
                        `File`
                      ) : (
                        <tabRailLiveContext.UiOverlaysAndIconsCustomIcon
                          name={`File`}
                          customSize={tabRailLiveContext.EditorHostGlyph.glyph}
                        />
                      )
                    }
                  />
                ) : (
                  <button
                    type={`button`}
                    aria-label={`Document tabs`}
                    data-testid={`tab-rail-trigger`}
                    data-page-chrome-entry={``}
                    className={tabRailLiveContext.BOXED_HOME_BUTTON_CLASS}
                  >
                    <tabRailLiveContext.UiOverlaysAndIconsCustomIcon
                      name={`File`}
                      customSize={15}
                      className={`-mt-px`}
                    />
                  </button>
                )
              }
            />
          </tabRailLiveContext.Tooltip>
        )}
        <tabRailLiveContext.Popover.Popup
          ref={tabRailLiveContext.elementRef}
          side={`bottom`}
          align={`start`}
          sideOffset={4}
          finalFocus={tabRailLiveContext.enabledState ? false : undefined}
          className={`!max-w-none`}
          style={{
            width: tabRailLiveContext.tabRailResult3.size,
          }}
          scrollFade={false}
          initialFocus={tabRailLiveContext.tabsPlaceOffered3 ? tabRailLiveContext.querySelector : tabRailLiveContext.closest}
        >
          <div
            data-testid={`tab-rail-panel`}
            ref={tabRailLiveContext.elementRef2}
            tabIndex={-1}
            role={`group`}
            aria-label={`Tabs panel`}
            className={
              tabRailLiveContext.tabsPlaceOffered5 || tabRailLiveContext.roots.length === 0
                ? `focus-ring-fades outline-none`
                : `outline-none`
            }
            onFocus={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (event.target instanceof HTMLElement) {
                tabRailLiveContext.elementRef7.current = event.target;
              }
            }}
            onKeyDownCapture={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                !(
                  event.key !== `Escape` ||
                  event.nativeEvent.isComposing ||
                  tabRailLiveContext.editing !== null ||
                  tabRailLiveContext.tabRailState2 !== null ||
                  !(event.target instanceof Node) ||
                  !tabRailLiveContext.elementRef2.current?.contains(event.target)
                )
              ) {
                event.preventDefault();
                (0, tabRailLiveContext.setEnabledState3)(false);
              }
            }}
          >
            {tabRailLiveContext.tabsPlaceOffered4 ? (
              <div
                className={`compact:px-2 comfortable:px-2.5 ${tabRailLiveContext.tabsPlaceOffered5 ? `` : `pb-1`}`}
                data-testid={`tab-rail-place`}
              >
                <tabRailLiveContext.TabsPlaceRowGate seat={tabRailLiveContext.seat} shown={tabRailLiveContext.tabsPlace} why={tabRailLiveContext.why} />
              </div>
            ) : null}
            {tabRailLiveContext.tabsPlaceOffered4 && !tabRailLiveContext.tabsPlaceOffered5 ? (
              <div role={`separator`} className={`bg-border mx-2 mb-1 h-px`} />
            ) : null}
            <div
              className={
                tabRailLiveContext.tabsPlaceOffered3
                  ? `hidden`
                  : `compact:pl-2 comfortable:pl-2.5 flex min-h-8 items-center justify-between pb-1`
              }
            >
              <tabRailLiveContext.Popover.Title
                className={`text-footnote text-secondary font-medium`}
              >{`Tabs`}</tabRailLiveContext.Popover.Title>
              {!tabRailLiveContext.readOnly && !(0, tabRailLiveContext.canCreateSpreadsheetTabs)() && (
                <tabRailLiveContext.Button
                  iconOnly={true}
                  variant={`ghost`}
                  size={(0, tabRailLiveContext.tabRailResult)(`sm`)}
                  icon={
                    <tabRailLiveContext.UiOverlaysAndIconsCustomIcon name={`Add`} size={`auto`} />
                  }
                  aria-label={`New tab`}
                  data-testid={`tab-rail-new-doc`}
                  className={tabRailLiveContext.DISABLED_TAB_CLASS}
                  onClick={tabRailLiveContext.onClick2}
                  aria-disabled={tabRailLiveContext.disabled || undefined}
                  disabled={!tabRailLiveContext.room || tabRailLiveContext.tabRailState === null}
                />
              )}
              {!tabRailLiveContext.readOnly && (0, tabRailLiveContext.canCreateSpreadsheetTabs)() && (
                <tabRailLiveContext.Menu
                  align={`end`}
                  renderTrigger={
                    <tabRailLiveContext.Button
                      iconOnly={true}
                      variant={`ghost`}
                      size={(0, tabRailLiveContext.tabRailResult)(`sm`)}
                      icon={
                        <tabRailLiveContext.UiOverlaysAndIconsCustomIcon
                          name={`Add`}
                          size={`auto`}
                        />
                      }
                      aria-label={`Add tab`}
                      data-testid={`tab-rail-new-doc`}
                    />
                  }
                  items={[
                    {
                      label: `Document`,
                      icon: `File`,
                      disabled: tabRailLiveContext.disabled,
                      onSelect: (..._extraArguments: unknown[]): undefined =>
                        void (0, tabRailLiveContext.focus)(`doc`),
                    },
                    {
                      label: `Spreadsheet`,
                      icon: `Spreadsheet`,
                      disabled: tabRailLiveContext.disabled,
                      onSelect: (..._extraArguments: unknown[]): undefined =>
                        void (0, tabRailLiveContext.focus)(`sheet`),
                    },
                  ]}
                  disabled={!tabRailLiveContext.room || tabRailLiveContext.tabRailState === null}
                />
              )}
            </div>
            {tabRailLiveContext.error !== null && (
              <div
                className={`gap-xs flex items-center pl-2`}
                data-testid={`tab-rail-error`}
              >
                <span
                  {...(0, tabRailLiveContext.originalJsxProps)(
                    {
                      role: tabRailLiveContext.tabsOnPage ? undefined : `alert`,
                      className: `text-footnote text-danger min-w-0 flex-1`,
                      children: tabRailLiveContext.error,
                    },
                    (tabRailLiveContext.tabsOnPage ? `quiet:` : `alert:`) + tabRailLiveContext.error,
                  )}
                />
                <tabRailLiveContext.Button
                  size={(0, tabRailLiveContext.tabRailResult)(`sm`)}
                  variant={`ghost`}
                  onClick={(..._extraArguments: unknown[]): undefined =>
                    void (0, tabRailLiveContext.take2)(true)
                  }
                  data-testid={`tab-rail-retry`}
                >{`Retry`}</tabRailLiveContext.Button>
              </div>
            )}
            {tabRailLiveContext.tabsPlaceOffered5 ? null : tabRailLiveContext.tabRailState === null ? (
              <span
                className={`text-footnote text-secondary block px-2 py-1`}
              >{`reading the room…`}</span>
            ) : tabRailLiveContext.roots.length === 0 ? (
              <span
                className={`text-footnote text-secondary block px-2 py-1`}
              >{`No tabs yet.`}</span>
            ) : (
              <div
                role={`tree`}
                aria-label={`Tabs`}
                onKeyDown={tabRailLiveContext.onKeyDown}
                onKeyUp={tabRailLiveContext.onKeyUp}
                onMouseDown={tabRailLiveContext.onMouseDown}
                onClick={tabRailLiveContext.onClick}
                className={`-mx-1 -mt-1 max-h-[60vh] min-h-0 overflow-y-auto rounded-md px-1 pt-1 pb-2 forced-colors:scroll-py-1 ${tabRailLiveContext.hint !== null && tabRailLiveContext.hint.id === `` ? `ring-strong/60 ring-1` : ``}`}
                onDragOver={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (
                    !(
                      !event.dataTransfer.types.includes(tabRailLiveContext.TAB_DRAG_MIME_TYPE) ||
                      tabRailLiveContext.dragging === null ||
                      tabRailLiveContext.disabled ||
                      tabRailLiveContext.editing !== null
                    )
                  ) {
                    if (!(0, tabRailLiveContext.isTabDropBelowLabel)(event)) {
                      if (tabRailLiveContext.hint !== null && tabRailLiveContext.hint.id === ``) {
                        (0, tabRailLiveContext.setHint)(null);
                      }
                      return;
                    }
                    event.preventDefault();
                    event.dataTransfer.dropEffect = `move`;
                    if (tabRailLiveContext.hint === null || tabRailLiveContext.hint.id !== ``) {
                      (0, tabRailLiveContext.setHint)({
                        id: ``,
                        zone: `after`,
                      });
                    }
                  }
                }}
                onDragLeave={(..._extraArguments: unknown[]): undefined => {
                  if (tabRailLiveContext.hint !== null && tabRailLiveContext.hint.id === ``) {
                    (0, tabRailLiveContext.setHint)(null);
                  }
                }}
                onDrop={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (!event.dataTransfer.types.includes(tabRailLiveContext.TAB_DRAG_MIME_TYPE))
                    return;
                  event.preventDefault();
                  (0, tabRailLiveContext.setHint)(null);
                  let data: Dynamic =
                    event.dataTransfer.getData(tabRailLiveContext.TAB_DRAG_MIME_TYPE) || tabRailLiveContext.dragging;
                  (0, tabRailLiveContext.setDragging)(null);
                  if (
                    !(
                      tabRailLiveContext.disabled ||
                      tabRailLiveContext.editing !== null ||
                      !(0, tabRailLiveContext.isTabDropBelowLabel)(event)
                    ) &&
                    data !== null &&
                    data.length > 0
                  ) {
                    (0, tabRailLiveContext.updateElement5)(data, undefined);
                  }
                }}
              >
                <tabRailLiveContext.TabTreeRows
                  nodes={tabRailLiveContext.roots}
                  displayNames={tabRailLiveContext.displayNames}
                  activeId={tabRailLiveContext.activeId}
                  expanded={tabRailLiveContext.expanded}
                  headings={tabRailLiveContext.headings}
                  presenceBy={tabRailLiveContext.presenceBy}
                  splashTs={tabRailLiveContext.splashTs}
                  splashPlayed={tabRailLiveContext.lookupRef.current}
                  gutter={
                    tabRailLiveContext.roots.some(
                      (node?: Dynamic, ..._extraArguments: unknown[]) =>
                        node.children.length > 0,
                    ) ||
                    tabRailLiveContext.headings !== null ||
                    tabRailLiveContext.enabledState6
                  }
                  busy={tabRailLiveContext.disabled || !tabRailLiveContext.room}
                  readOnly={tabRailLiveContext.readOnly}
                  editing={tabRailLiveContext.editing}
                  onDraft={(
                    draft?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    (0, tabRailLiveContext.setEditing)(
                      (
                        tabRail?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        tabRail === null
                          ? tabRail
                          : {
                              ...tabRail,
                              draft: draft,
                            },
                    )
                  }
                  onRenameCommit={(
                    tabRail?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (tabRail === `key`) {
                      tabRailLiveContext.enabledRef7.current = true;
                      tabRailLiveContext.elementRef12.current = tabRailLiveContext.editing?.id ?? null;
                    }
                    (0, tabRailLiveContext.updateElement4)();
                  }}
                  onRenameCancel={(
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    tabRailLiveContext.enabledRef7.current = true;
                    tabRailLiveContext.elementRef12.current = tabRailLiveContext.editing?.id ?? null;
                    (0, tabRailLiveContext.setEditing)(null);
                  }}
                  onToggle={tabRailLiveContext.onToggle}
                  onOpen={tabRailLiveContext.onOpen}
                  onRenameStart={(
                    tabRail?: Dynamic,
                    draft?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (!tabRailLiveContext.moveSavingIds?.has(tabRail)) {
                      if (tabRailLiveContext.editing !== null && tabRailLiveContext.editing.id !== tabRail) {
                        (0, tabRailLiveContext.updateElement4)();
                      }
                      (0, tabRailLiveContext.setEditing)({
                        id: tabRail,
                        draft: draft,
                        seed: draft,
                      });
                    }
                  }}
                  onNewSubtab={(
                    tabRail?: Dynamic,
                    options?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => void (0, tabRailLiveContext.focus)(options, tabRail)}
                  kinds={tabRailLiveContext.kinds}
                  onMenuOpen={tabRailLiveContext.probeKind}
                  onCopyLink={tabRailLiveContext.copyLink}
                  onDuplicate={(
                    tabRail?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => void (0, tabRailLiveContext.setDisabled2)(tabRail)}
                  onDelete={(
                    tabRail?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => tabRailLiveContext.elementRef16.current.requestDelete(tabRail)}
                  onMoveStep={(
                    tabRail?: Dynamic,
                    options?: Dynamic,
                    context?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => void (0, tabRailLiveContext.focus3)(tabRail, options, context)}
                  moveSavingIds={tabRailLiveContext.moveSavingIds}
                  dnd={{
                    dragging: tabRailLiveContext.dragging,
                    deny: tabRailLiveContext.deny,
                    hint: tabRailLiveContext.hint,
                    setDragging: tabRailLiveContext.setDragging,
                    setHint: tabRailLiveContext.setHint,
                    onMove: (
                      tabRail?: Dynamic,
                      options?: Dynamic,
                      context?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined =>
                      void (0, tabRailLiveContext.updateElement5)(tabRail, options, context),
                  }}
                />
              </div>
            )}
            {tabRailLiveContext.tabsPlaceOffered3 &&
            !tabRailLiveContext.tabsPlaceOffered5 &&
            tabRailLiveContext.tabRailState !== null ? (
              <tabRailLiveContext.Button
                variant={`ghost`}
                size={(0, tabRailLiveContext.tabRailResult)(`sm`)}
                className={`text-muted w-full justify-start ${tabRailLiveContext.DISABLED_TAB_CLASS}`}
                icon={
                  <tabRailLiveContext.UiOverlaysAndIconsCustomIcon name={`Add`} size={`auto`} />
                }
                data-testid={`tab-rail-new-row`}
                onClick={tabRailLiveContext.onClick2}
                aria-disabled={tabRailLiveContext.disabled || undefined}
                disabled={!tabRailLiveContext.room}
              >{`New tab`}</tabRailLiveContext.Button>
            ) : null}
            <tabRailLiveContext.PaneResizeHandle
              {...(0, tabRailLiveContext.originalJsxProps)({
                ...tabRailLiveContext.tabRailResult3.handleProps,
                side: `right`,
                label: `Resize tabs`,
              })}
            />
          </div>
        </tabRailLiveContext.Popover.Popup>
      </tabRailLiveContext.Popover.Root>
      {tabRailLiveContext.tabRailState2 !== null && tabRailLiveContext.matchesTabRailState && (
        <tabRailLiveContext.UiDialogsRoot.Root
          open={true}
          onOpenChange={(
            tabRail?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => !tabRail && (0, tabRailLiveContext.setTabRailState2)(null)}
        >
          <tabRailLiveContext.PhoneDialogPopup size={`sm`} data-testid={`tab-rail-delete-dialog`}>
            <tabRailLiveContext.UiDialogsRoot.Header
              description={
                tabRailLiveContext.enabledState3 || tabRailLiveContext.disabled2
                  ? `This tab and its content will be deleted; its subtabs will move up one level and be kept`
                  : `This tab and all its content, including subtabs, will be deleted`
              }
            >
              {tabRailLiveContext.enabledState3 || tabRailLiveContext.disabled2
                ? `Delete this tab?`
                : `Delete this tab and all subtabs?`}
            </tabRailLiveContext.UiDialogsRoot.Header>
            <tabRailLiveContext.Checkbox
              label={`Delete this tab but keep all subtabs`}
              checked={tabRailLiveContext.enabledState3 || tabRailLiveContext.disabled2}
              disabled={tabRailLiveContext.disabled2}
              description={
                tabRailLiveContext.disabled2
                  ? `A document needs at least one tab — the subtabs will be kept`
                  : undefined
              }
              onCheckedChange={(
                tabRail?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => (0, tabRailLiveContext.setEnabledState4)(tabRailLiveContext.disabled2 || tabRail === true)}
              data-testid={`tab-rail-delete-keep-subtabs`}
            />
            <tabRailLiveContext.UiDialogsRoot.Footer align={`end`}>
              <tabRailLiveContext.UiDialogsRoot.Close render={<tabRailLiveContext.Button>{`Cancel`}</tabRailLiveContext.Button>} />
              <tabRailLiveContext.Button
                variant={`danger`}
                onClick={(..._extraArguments: unknown[]): undefined =>
                  void (0, tabRailLiveContext.setDisabled3)()
                }
                data-testid={`tab-rail-delete-confirm`}
              >{`Delete`}</tabRailLiveContext.Button>
            </tabRailLiveContext.UiDialogsRoot.Footer>
          </tabRailLiveContext.PhoneDialogPopup>
        </tabRailLiveContext.UiDialogsRoot.Root>
      )}
      {tabRailLiveContext.tabRailState2 !== null && !tabRailLiveContext.matchesTabRailState && (
        <tabRailLiveContext.PhoneConfirmationDialog
          open={true}
          onOpenChange={(
            tabRail?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!tabRail) {
              (0, tabRailLiveContext.setTabRailState2)(null);
            }
          }}
          title={`Delete this tab?`}
          description={`This tab and all its content will be deleted`}
          confirmLabel={`Delete`}
          confirmVariant={`danger`}
          initialFocus={`cancel`}
          onConfirm={(..._extraArguments: unknown[]): undefined =>
            void (0, tabRailLiveContext.setDisabled3)()
          }
        />
      )}
    </tabRailLiveContext.jsxRuntime.Fragment>);
}

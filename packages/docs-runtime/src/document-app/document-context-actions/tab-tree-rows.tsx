/** BaoCut: document context actions from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  EditorExtensionsMoreActions,
  Menu,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  isObservabilityBrowserAndOperationEventsRelatedTarget,
  isPlatformApiAndAuthColor,
  resolveDataOperationControlByKey,
  resolveEditorExtensionsDelete,
  resolvePlatformSyncAndRoutingUntitled,
  updateCommentsActionsAndSelectionValue,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  IconButton,
} from "../run-review";
import {
  PresenceDots,
  TabsHeadingRow,
  presenceNames,
  tabOutlineToggleLabel,
} from "../presence-and-chat";
import {
  IN_THIS_TAB_LABEL,
  TAB_DRAG_MIME_TYPE,
  canCreateSpreadsheetTabs,
  tabDropPosition,
} from "./duplicate-document-tab";
import {
  LAST_TAB_DELETE_MESSAGE,
  MOVE_TAB_LABEL,
  TAB_MOVE_DIRECTIONS,
  TAB_MOVE_LABELS,
  TAB_PRESENCE_ANIMATION_DURATION,
  TAB_PRESENCE_ANIMATION_MIN,
  TabPresenceSplash,
  TabRail,
  TabRenameInput,
  moveIntoTabLabel,
} from "./tab-rail";
import type * as ReactComponentTypes from "react";

export const TabTreeRows: ReactComponentTypes.FC<Dynamic> = ({
  nodes: nodes,
  displayNames: displayNames,
  depth = 0,
  parentId: parentId,
  activeId: activeId,
  expanded: expanded,
  headings = null,
  posShift = 0,
  presenceBy: presenceBy,
  splashTs: splashTs,
  splashPlayed: splashPlayed,
  busy: busy,
  readOnly = false,
  editing: editing,
  onDraft: onDraft,
  onRenameCommit: onRenameCommit,
  onRenameCancel: onRenameCancel,
  onToggle: onToggle,
  onOpen: onOpen,
  onRenameStart: onRenameStart,
  onNewSubtab: onNewSubtab,
  kinds: kinds,
  onMenuOpen: onMenuOpen,
  onCopyLink: onCopyLink,
  onDuplicate: onDuplicate,
  onDelete: onDelete,
  onMoveStep: onMoveStep,
  moveSavingIds: moveSavingIds,
  dnd: dnd,
  gutter: gutter,
}) => {
  let controlId: Dynamic = (0, React.useId)();
  let elementRef: Dynamic = (0, React.useRef)(null);
  elementRef.current ??= {};
  let actions: Dynamic = Object.assign(elementRef.current, {
    onDraft: onDraft,
    onRenameCommit: onRenameCommit,
    onRenameCancel: onRenameCancel,
    onToggle: onToggle,
    onOpen: onOpen,
    onRenameStart: onRenameStart,
    onNewSubtab: onNewSubtab,
    onMenuOpen: onMenuOpen,
    onCopyLink: onCopyLink,
    onDuplicate: onDuplicate,
    onDelete: onDelete,
    onMoveStep: onMoveStep,
    dnd: dnd,
  });
  return (
    <ul className={`flex flex-col gap-px`} role={depth > 0 ? `group` : `none`}>
      {nodes.map((node?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => {
        let label: Dynamic = node.entry.name ?? ``;
        let shown: Dynamic = displayNames.get(node.id) ?? label;
        let headings2: Dynamic =
          headings !== null && headings.tabId === node.id ? headings : null;
        let posShift2: Dynamic =
          headings2 === null
            ? 0
            : headings2.rows.filter(
                (row?: Dynamic, ..._extraArguments: unknown[]) => row.indent === 0,
              ).length;
        let caret = node.children.length > 0 || headings2 !== null;
        let isEditingRow = editing !== null && editing.id === node.id;
        let isExpanded: Dynamic = expanded.has(node.id);
        let dropOk =
          dnd.dragging !== null &&
          !busy &&
          editing === null &&
          !(dnd.deny?.has(node.id) ?? false);
        let hint: Dynamic =
          dnd.hint !== null && dnd.hint.id === node.id ? dnd.hint.zone : null;
        return (
          <li role={`none`} key={node.id}>
            {
              <TabTreeRow
                id={node.id}
                label={label}
                shown={shown}
                depth={depth}
                index={index}
                count={nodes.length}
                ariaShift={posShift}
                under={
                  headings2 === null
                    ? `subtabs`
                    : node.children.length > 0
                      ? `both`
                      : `headings`
                }
                gutter={gutter}
                parentId={parentId}
                firstChildId={node.children[0]?.id}
                nextSiblingId={nodes[index + 1]?.id}
                caret={caret}
                active={node.id === activeId}
                isExpanded={isExpanded}
                isEditingRow={isEditingRow}
                draft={isEditingRow ? editing.draft : null}
                dropOk={dropOk}
                hint={hint}
                rowPresence={presenceBy?.get(node.id)}
                rowSplash={splashTs?.get(node.id)}
                splashPlayed={splashPlayed}
                busy={busy}
                readOnly={readOnly}
                onlyTab={depth === 0 && nodes.length === 1 && node.children.length === 0}
                kind={kinds.get(node.id)}
                moving={moveSavingIds !== null}
                moveSaving={moveSavingIds?.has(node.id) ?? false}
                intoName={
                  index > 0
                    ? (displayNames.get(nodes[index - 1].id) ??
                      nodes[index - 1].entry.name ??
                      ``)
                    : undefined
                }
                actions={actions}
              />
            }
            {expanded.has(node.id) && headings2 !== null ? (
              <TabsHeadingRow
                id={controlId}
                tabName={shown}
                rows={headings2.rows}
                places={headings2.places}
                marked={headings2.marked}
                stop={null}
                level={depth + 2}
                indentRem={
                  (depth + 1) * TAB_PRESENCE_ANIMATION_DURATION +
                  TAB_PRESENCE_ANIMATION_MIN -
                  0.5
                }
                cap={null}
                testid={`tab-rail-heading`}
                onPick={(
                  tabTreeRows?: Dynamic,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => headings2.onPick(tabTreeRows, options)}
                onRowFocus={headings2.onRowFocus}
                onRowBlur={headings2.onRowBlur}
              />
            ) : null}
            {expanded.has(node.id) && node.children.length > 0 && (
              <TabTreeRows
                nodes={node.children}
                displayNames={displayNames}
                depth={depth + 1}
                parentId={node.id}
                activeId={activeId}
                expanded={expanded}
                headings={headings}
                posShift={posShift2}
                presenceBy={presenceBy}
                splashTs={splashTs}
                splashPlayed={splashPlayed}
                busy={busy}
                readOnly={readOnly}
                editing={editing}
                onDraft={onDraft}
                onRenameCommit={onRenameCommit}
                onRenameCancel={onRenameCancel}
                onToggle={onToggle}
                onOpen={onOpen}
                onRenameStart={onRenameStart}
                onNewSubtab={onNewSubtab}
                kinds={kinds}
                onMenuOpen={onMenuOpen}
                onCopyLink={onCopyLink}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
                onMoveStep={onMoveStep}
                moveSavingIds={moveSavingIds}
                dnd={dnd}
                gutter={gutter}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

var TAB_MOVE_OUTCOME_LABELS: Dynamic;

var TAB_MOVE_CHANGES_LEVEL: Dynamic;

var tabMoveAnnouncement: (tabMoveAnnouncement2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var tabOpenedAnnouncement: (tabOpenedAnnouncement2?: Dynamic, ..._extraArguments: unknown[]) => string;

var tabMoveAvailability: Dynamic;

function tabRowMenuItems(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let canCreateSpreadsheetTabs2: Dynamic = canCreateSpreadsheetTabs(
    entry.spreadsheetTabs,
  );
  let record: Dynamic = {
    label: (
      <span data-testid={`tab-rail-copy-link-${entry.id}`}>{`Copy link`}</span>
    ),
    onSelect: entry.onCopyLink,
  };
  return entry.readOnly
    ? [record]
    : [
        {
          label: `Rename`,
          disabled: entry.busy || entry.moveSaving === true,
          onSelect: entry.onRename,
        },
        ...(entry.kind === `other`
          ? []
          : [
              {
                label: `Duplicate`,
                disabled: entry.busy || entry.kind !== `doc`,
                onSelect: entry.onDuplicate,
              },
            ]),
        canCreateSpreadsheetTabs2
          ? {
              label: `Add subtab`,
              disabled: entry.busy || entry.moveSaving === true,
              items: [
                {
                  label: `Document`,
                  icon: `File`,
                  disabled: entry.busy || entry.moveSaving === true,
                  onSelect: (..._extraArguments: unknown[]): Dynamic =>
                    entry.onNewSubtab(`doc`),
                },
                {
                  label: `Spreadsheet`,
                  icon: `Spreadsheet`,
                  disabled: entry.busy || entry.moveSaving === true,
                  onSelect: (..._extraArguments: unknown[]): Dynamic =>
                    entry.onNewSubtab(`sheet`),
                },
              ],
            }
          : {
              label: `Add subtab`,
              disabled: entry.busy || entry.moveSaving === true,
              onSelect: (..._extraArguments: unknown[]): Dynamic =>
                entry.onNewSubtab(`doc`),
            },
        record,
        {
          label: MOVE_TAB_LABEL,
          disabled:
            entry.busy ||
            !TAB_MOVE_DIRECTIONS.some(
              (
                TABMOVEDIRECTIONS?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => entry.moves[TABMOVEDIRECTIONS],
            ),
          items: TAB_MOVE_DIRECTIONS.map(
            (
              TABMOVEDIRECTIONS?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              label:
                TABMOVEDIRECTIONS === `into`
                  ? moveIntoTabLabel(entry.intoName)
                  : TAB_MOVE_LABELS[TABMOVEDIRECTIONS],
              disabled: entry.busy || !entry.moves[TABMOVEDIRECTIONS],
              onSelect: (
                tabRowMenuItems2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => entry.onMove(TABMOVEDIRECTIONS, tabRowMenuItems2),
            }),
          ),
        },
        `separator`,
        {
          label: resolveEditorExtensionsDelete(`tab`),
          variant: `danger`,
          disabled: entry.busy || entry.onlyTab === true,
          ...(entry.onlyTab === true
            ? {
                description: LAST_TAB_DELETE_MESSAGE,
              }
            : {}),
          onSelect: entry.onDelete,
        },
      ];
}

function equalTabTreeRowProps(
  equalTabTreeRowProps2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let equalTabTreeRowPropsResult of Object.keys(options) as Dynamic)
    if (equalTabTreeRowPropsResult === `rowPresence`) {
      if (
        !isPlatformApiAndAuthColor(
          equalTabTreeRowProps2.rowPresence,
          options.rowPresence,
        )
      )
        return false;
    } else if (
      !Object.is(
        equalTabTreeRowProps2[equalTabTreeRowPropsResult],
        options[equalTabTreeRowPropsResult],
      )
    )
      return false;
  return true;
}

var TabTreeRow: Dynamic;

var MemoizedTabRail: Dynamic;

var TAB_NAVIGATION_DEBOUNCE_MS: number;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentContextActionsTabTreeRowsStep1(): void {
  (TAB_MOVE_OUTCOME_LABELS = {
    up: `Moved up`,
    down: `Moved down`,
    into: `Moved in one level`,
    out: `Moved out one level`,
  });
  (TAB_MOVE_CHANGES_LEVEL = {
    up: false,
    down: false,
    into: true,
    out: true,
  });
  (tabMoveAnnouncement = (
    tabMoveAnnouncement2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let label: string = TAB_MOVE_CHANGES_LEVEL[tabMoveAnnouncement2]
      ? options.parentId === undefined
        ? `tab `
        : `subtab `
      : ``;
    return `${TAB_MOVE_OUTCOME_LABELS[tabMoveAnnouncement2]}, ${label}${options.pos} of ${options.size}`;
  });
  (tabOpenedAnnouncement = (
    tabOpenedAnnouncement2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `Opened, ${tabOpenedAnnouncement2.parentId === undefined ? `tab` : `subtab`} ${tabOpenedAnnouncement2.pos} of ${tabOpenedAnnouncement2.size}`);
  (tabMoveAvailability = (
    tabMoveAvailability2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ({
    up: !dependencies && tabMoveAvailability2 > 1,
    down: !dependencies && tabMoveAvailability2 < options,
    into: !dependencies && tabMoveAvailability2 > 1,
    out: !dependencies && context > 0,
  }));
  (TabTreeRow = (0, React.memo)(function (
    {
      id: id2,
      label: label,
      shown: shown,
      depth: depth,
      index: index,
      count: count,
      ariaShift: ariaShift,
      under: under,
      gutter: gutter,
      parentId: parentId,
      firstChildId: firstChildId,
      nextSiblingId: nextSiblingId,
      caret: caret,
      active: active,
      isExpanded: isExpanded,
      isEditingRow: isEditingRow,
      draft: draft,
      dropOk: dropOk,
      hint: hint,
      rowPresence: rowPresence,
      rowSplash: rowSplash,
      splashPlayed: splashPlayed,
      busy: busy,
      readOnly: readOnly,
      onlyTab: onlyTab,
      kind: kind,
      moving: moving,
      moveSaving: moveSaving,
      intoName: intoName,
      actions: actions,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    updateCommentsActionsAndSelectionValue(`TabRail.row`);
    let elementRef: Dynamic = (0, React.useRef)(null);
    let content: Dynamic = (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic => {
        let matchedElement: Dynamic =
          elementRef.current?.querySelector(`[data-tab-label]`);
        return matchedElement != null &&
          matchedElement.scrollWidth > matchedElement.clientWidth
          ? shown
          : undefined;
      },
      [shown],
    );
    let controlId: Dynamic = (0, React.useId)();
    let total =
      rowPresence !== undefined && rowPresence.length > 0
        ? IN_THIS_TAB_LABEL + presenceNames(rowPresence)
        : ``;
    return (
      <Tooltip lazy={true} content={content} side={`right`} sideOffset={20}>
      <div
          ref={elementRef}
          role={`treeitem`}
          tabIndex={isEditingRow ? -1 : 0}
          aria-label={shown}
          aria-describedby={total === `` ? undefined : controlId}
          aria-selected={active}
          aria-expanded={caret ? isExpanded : undefined}
          aria-level={depth + 1}
          aria-setsize={count + ariaShift}
          aria-posinset={index + 1 + ariaShift}
          data-tab-id={id2}
          data-testid={`tab-rail-row-${id2}`}
          className={`group/row focus-visible:ring-fill-accent has-[[data-tab-name]:focus-visible]:ring-fill-accent relative flex items-center rounded-md focus-visible:ring-1 focus-visible:outline-hidden focus-visible:ring-inset has-[[data-tab-name]:focus-visible]:ring-1 has-[[data-tab-name]:focus-visible]:ring-inset ${isEditingRow ? `` : active ? `bg-fill-ghost-selected` : `hover:bg-fill-ghost-hover`} ${hint === `into` ? `ring-strong/60 ring-1` : ``}`}
          style={
            depth > 0
              ? {
                  paddingLeft: `${depth * TAB_PRESENCE_ANIMATION_DURATION}rem`,
                }
              : undefined
          }
          draggable={!readOnly && !isEditingRow && !busy}
          onDragStart={(
            tabTreeRow?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            tabTreeRow.dataTransfer.setData(TAB_DRAG_MIME_TYPE, id2);
            tabTreeRow.dataTransfer.effectAllowed = `move`;
            actions.dnd.setDragging(id2);
          }}
          onDragEnd={(..._extraArguments: unknown[]): undefined => {
            actions.dnd.setDragging(null);
            actions.dnd.setHint(null);
          }}
          onDragOver={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              !event.dataTransfer.types.includes(TAB_DRAG_MIME_TYPE) ||
              actions.dnd.dragging === null
            )
              return;
            event.preventDefault();
            event.stopPropagation();
            if (!dropOk) {
              event.dataTransfer.dropEffect = `none`;
              if (actions.dnd.hint !== null && actions.dnd.hint.id === id2) {
                actions.dnd.setHint(null);
              }
              return;
            }
            event.dataTransfer.dropEffect = `move`;
            let zone = tabDropPosition(event);
            if (
              actions.dnd.hint === null ||
              actions.dnd.hint.id !== id2 ||
              actions.dnd.hint.zone !== zone
            ) {
              actions.dnd.setHint({
                id: id2,
                zone: zone,
              });
            }
          }}
          onDragLeave={(
            tabTreeRow?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              isObservabilityBrowserAndOperationEventsRelatedTarget(tabTreeRow) &&
              actions.dnd.hint !== null &&
              actions.dnd.hint.id === id2
            ) {
              actions.dnd.setHint(null);
            }
          }}
          onDrop={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!event.dataTransfer.types.includes(TAB_DRAG_MIME_TYPE)) return;
            event.preventDefault();
            event.stopPropagation();
            if (!dropOk) {
              actions.dnd.setHint(null);
              actions.dnd.setDragging(null);
              return;
            }
            let tabDropPosition2 = tabDropPosition(event);
            actions.dnd.setHint(null);
            actions.dnd.setDragging(null);
            let data: Dynamic = event.dataTransfer.getData(TAB_DRAG_MIME_TYPE);
            if (data.length !== 0) {
              if (tabDropPosition2 === `into`) {
                actions.dnd.onMove(data, id2);
              } else {
                if (tabDropPosition2 === `before`) {
                  actions.dnd.onMove(data, parentId, id2);
                } else {
                  if (isExpanded && firstChildId !== undefined) {
                    actions.dnd.onMove(data, id2, firstChildId);
                  } else {
                    actions.dnd.onMove(data, parentId, nextSiblingId);
                  }
                }
              }
            }
          }}
        >
        {rowSplash !== undefined && splashPlayed !== undefined && (
            <TabPresenceSplash rowId={id2} ts={rowSplash} played={splashPlayed} />
          )}
        {(hint === `before` || hint === `after`) && (
            <span
              data-testid={`tab-rail-insertion-line`}
              className={`bg-fill-primary pointer-events-none absolute inset-x-1 z-10 h-0.5 rounded-full ${hint === `before` ? `-top-px` : `-bottom-px`}`}
            />
          )}
        {gutter && (
            <span
              className={`flex shrink-0 items-center justify-center`}
              style={{
                width: `${TAB_PRESENCE_ANIMATION_MIN}rem`,
              }}
              data-testid={`tab-rail-gutter`}
            >
            {caret && (
                <button
                  type={`button`}
                  aria-label={tabOutlineToggleLabel(under, isExpanded, shown)}
                  aria-expanded={isExpanded}
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    actions.onToggle(id2)
                  }
                  data-testid={`tab-rail-caret-${id2}`}
                  className={`text-secondary compact:after:-inset-y-1 comfortable:after:-inset-y-2 relative flex size-4 items-center justify-center after:absolute after:right-0 after:-left-2 after:content-['']`}
                >
                <UiOverlaysAndIconsCustomIcon
                    name={isExpanded ? `CaretDown` : `CaretRight`}
                    customSize={12}
                  />
              </button>
              )}
          </span>
          )}
        {draft === null ? (
            <button
              type={`button`}
              tabIndex={-1}
              data-tab-name={``}
              onClick={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                event.currentTarget.closest(`[role=treeitem]`)?.focus();
                if (!active) {
                  actions.onOpen(id2);
                }
              }}
              onDoubleClick={(..._extraArguments: unknown[]): undefined => {
                if (!readOnly && !busy && !moveSaving) {
                  actions.onRenameStart(
                    id2,
                    resolvePlatformSyncAndRoutingUntitled(label) ? shown : label,
                  );
                }
              }}
              data-testid={`tab-rail-tab-${id2}`}
              className={`gap-sm text-body min-h-control compact:px-2 comfortable:px-2.5 flex min-w-0 flex-1 items-center rounded-md text-left focus-visible:outline-none ${active ? `text-primary font-medium` : `text-secondary`}`}
            >
            <span
                data-tab-label={``}
                className={`-my-0.5 min-w-0 flex-1 truncate py-0.5`}
              >
              {shown}
            </span>
            {rowPresence && <PresenceDots dots={rowPresence} />}
          </button>
          ) : (
            <label
              className={`gap-sm text-body bg-surface-popover text-primary ring-fill-accent min-h-control compact:px-2 comfortable:px-2.5 flex min-w-0 flex-1 cursor-text items-center rounded-md ring-1 ring-inset ${active ? `font-medium` : ``}`}
              onMouseDown={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (!(event.target instanceof HTMLInputElement)) {
                  event.preventDefault();
                }
              }}
            >
            <TabRenameInput
                aria-label={`Tab name`}
                value={draft}
                onChange={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => actions.onDraft(event.target.value)}
                onBlur={(..._extraArguments: unknown[]): Dynamic =>
                  actions.onRenameCommit(`blur`)
                }
                onKeyDown={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (!event.nativeEvent.isComposing) {
                    if (event.key === `Enter`) {
                      actions.onRenameCommit(`key`);
                    } else {
                      if (event.key === `Escape`) {
                        event.stopPropagation();
                        actions.onRenameCancel();
                      }
                    }
                  }
                }}
                data-testid={`tab-rail-rename-input-${id2}`}
              />
          </label>
          )}
        {total !== `` && (
            <span id={controlId} className={`sr-only`}>
            {total}
          </span>
          )}
        <Menu
            align={`start`}
            renderTrigger={
              <IconButton
                icon={
                  <UiOverlaysAndIconsCustomIcon
                    name={`DotsVertical`}
                    size={`xs`}
                  />
                }
                size={22}
                aria-label={EditorExtensionsMoreActions}
                data-testid={`tab-rail-menu-${id2}`}
                className={`opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 data-[popup-open]:opacity-100 ${isEditingRow ? `!hidden` : ``}`}
              />
            }
            onOpenChange={(
              tabTreeRow?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (tabTreeRow && !readOnly) {
                actions.onMenuOpen(id2);
              }
            }}
            items={tabRowMenuItems({
              id: id2,
              readOnly: readOnly,
              busy: busy,
              kind: kind,
              onRename: (..._extraArguments: unknown[]): Dynamic =>
                actions.onRenameStart(
                  id2,
                  resolvePlatformSyncAndRoutingUntitled(label) ? shown : label,
                ),
              onDuplicate: (..._extraArguments: unknown[]): Dynamic =>
                actions.onDuplicate(id2),
              onNewSubtab: (
                tabTreeRow?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => actions.onNewSubtab(id2, tabTreeRow),
              onCopyLink: (..._extraArguments: unknown[]): Dynamic =>
                actions.onCopyLink(id2),
              onDelete: (..._extraArguments: unknown[]): Dynamic =>
                actions.onDelete(id2),
              onlyTab: onlyTab,
              moves: tabMoveAvailability(index + 1, count, depth, moving),
              intoName: intoName,
              moveSaving: moveSaving,
              onMove: (
                tabTreeRow?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                actions.onMoveStep(
                  id2,
                  tabTreeRow,
                  resolveDataOperationControlByKey(document, options),
                ),
            })}
          />
      </div>
    </Tooltip>
    );
  }, equalTabTreeRowProps));
  (MemoizedTabRail = (0, React.memo)(TabRail));
  (TAB_NAVIGATION_DEBOUNCE_MS = 120);
}

export { MemoizedTabRail, TAB_NAVIGATION_DEBOUNCE_MS, tabMoveAnnouncement, tabMoveAvailability, tabOpenedAnnouncement, tabRowMenuItems };

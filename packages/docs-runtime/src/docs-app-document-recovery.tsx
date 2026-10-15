/** BaoCut: document recovery from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  Alert,
  Button,
  Checkbox,
  UiDialogsOpen,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  create,
  installCommentsStoreState,
  isCommentsStoreValue3,
  liveSupportCode,
  loadPlatformSyncAndRoutingClipboard,
  originalJsxProps,
  resolveCommentsStoreValue24,
  resolveObservabilityBootEntries,
  resolvePlatformSyncAndRoutingCompact,
  useCommentsStoreUseSyncExternalStore,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";
import {
  SupportCodeCopyButton,
} from "./docs-app-connection-and-errors-connector-permission-dialog";
import {
  PhoneConfirmationDialog,
  isDocumentFocusedElsewhere,
} from "./docs-app-phone-overlays-export-progress-dialog";

function classifyFocusLocation(
  classifyFocusLocation2?: Dynamic,
  document2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (isDocumentFocusedElsewhere(document2)) return `elsewhere`;
  let activeElement: Dynamic = document2?.activeElement ?? null;
  return activeElement === null ||
    activeElement === document2?.body ||
    activeElement === document2?.documentElement
    ? `nothing`
    : classifyFocusLocation2 === null
      ? `elsewhere`
      : classifyFocusLocation2.contains(activeElement)
        ? `box`
        : activeElement.contains(classifyFocusLocation2)
          ? `nothing`
          : `elsewhere`;
}

var canRestoreFocus: Dynamic;

var SYNC_LOSS_MESSAGES: Dynamic;

function SyncLossBanner(
  { state: state, onReport: onReport, supportCode: supportCode }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let syncLossBannerResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let matchesState: Dynamic = state === `busy`;
  return (
    <div
      role={matchesState ? `status` : `alert`}
      data-testid={`sync-loss-banner`}
      data-sync={state}
      className={`pointer-events-none`}
    >
      <Alert
        variant={matchesState ? `neutral` : `warning`}
        className={`pointer-events-auto`}
        action={
          onReport || supportCode ? (
            <span className={`gap-sm flex items-center`}>
              {supportCode ? (
                <SupportCodeCopyButton code={supportCode} />
              ) : null}
              {onReport ? (
                <Button
                  variant={`secondary`}
                  size={syncLossBannerResult(`sm`)}
                  data-testid={`sync-loss-report`}
                  onClick={onReport}
                >{`Debug report`}</Button>
              ) : null}
            </span>
          ) : undefined
        }
      >
        {SYNC_LOSS_MESSAGES[state]}
      </Alert>
    </div>
  );
}

function SyncLossReportActions(
  { words: words, supportCode: supportCode, onReport: onReport }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let syncLossReportActionsResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let action =
    onReport || supportCode ? (
      <span className={`gap-sm flex items-center`}>
        {supportCode ? <SupportCodeCopyButton code={supportCode} /> : null}
        {onReport ? (
          <Button
            variant={`secondary`}
            size={syncLossReportActionsResult(`sm`)}
            data-testid={`sync-loss-report`}
            onClick={onReport}
          >{`Debug report`}</Button>
        ) : null}
      </span>
    ) : undefined;
  return (
    <div
      role={`alert`}
      data-testid={`ldoc-notice-banner`}
      className={`pointer-events-none`}
    >
      {action ? (
        <Alert
          variant={`warning`}
          className={`pointer-events-auto`}
          action={action}
        >
          {words}
        </Alert>
      ) : (
        <Alert variant={`warning`} className={`pointer-events-auto`}>
          {words}
        </Alert>
      )}
    </div>
  );
}

function DocumentOpeningBanner(
  { words: words, stage: stage, onReload: onReload }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentOpeningBannerResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let action =
    stage === `slow` && onReload ? (
      <Button
        variant={`secondary`}
        size={documentOpeningBannerResult(`sm`)}
        data-testid={`ldoc-opening-reload`}
        onClick={onReload}
      >{`Reload`}</Button>
    ) : undefined;
  let icon = (
    <UiOverlaysAndIconsCustomIcon
      name={`Spinner`}
      size={`xs`}
      className={`text-secondary motion-safe:animate-spin`}
    />
  );
  return (
    <div
      role={`status`}
      aria-live={`polite`}
      data-testid={`ldoc-opening-banner`}
      data-stage={stage}
      className={`pointer-events-none`}
    >
      {action ? (
        <Alert
          variant={`neutral`}
          role={`none`}
          icon={icon}
          className={`pointer-events-auto`}
          action={action}
        >
          {words}
        </Alert>
      ) : (
        <Alert
          variant={`neutral`}
          role={`none`}
          icon={icon}
          className={`pointer-events-auto`}
        >
          {words}
        </Alert>
      )}
    </div>
  );
}

var PHONE_DOCUMENT_OPENING_PADDING: string;

function DocumentOpeningSkeleton(
  { frameChrome = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      aria-hidden={`true`}
      data-testid={`ldoc-opening-skeleton`}
      className={`pointer-events-none mx-auto flex w-full max-w-prose flex-col gap-3 px-6 pt-16 ${frameChrome ? PHONE_DOCUMENT_OPENING_PADDING : ``}`}
    >
      {[
        [`title`, `mb-4 h-6 w-2/5`],
        [`l1`, `h-3 w-11/12`],
        [`l2`, `h-3 w-5/6`],
        [`l3`, `h-3 w-3/4`],
        [`l4`, `h-3 w-11/12`],
        [`l5`, `h-3 w-4/5`],
        [`l6`, `h-3 w-2/3`],
        [`l7`, `h-3 w-11/12`],
        [`l8`, `h-3 w-5/6`],
        [`l9`, `h-3 w-1/2`],
      ].map(([item, item2]: Dynamic, ..._extraArguments: unknown[]) => (
        <div
          {...originalJsxProps(
            {
              className: `bg-alpha-1 ${item2} rounded motion-safe:animate-pulse`,
            },
            item,
          )}
        />
      ))}
    </div>
  );
}

var quoteRecoveryPreview: (items?: Dynamic, ..._extraArguments: unknown[]) => string;

var limitRecoveryItems: Dynamic;

var RECOVERY_PREVIEW_CHARACTERS: number;

var formatRecoverySize: (recoverySize?: Dynamic, ..._extraArguments: unknown[]) => string;

var utf8ByteLength: Dynamic;

function describeRecoveryRetention(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!options) return null;
  let matchesItemsCount = items.length < options.whole;
  let matchesItemsCount2 = items.length > options.kept;
  let label = matchesItemsCount
    ? `…cut to ${formatRecoverySize(utf8ByteLength(items))} — only the first part could be kept`
    : null;
  let label2 = matchesItemsCount2
    ? options.kept <= 0
      ? `A reload keeps none of this — copy it now to keep it`
      : `A reload keeps only the first ${formatRecoverySize(utf8ByteLength(items.slice(0, options.kept)))} of this — copy it now to keep it${matchesItemsCount ? `` : ` all`}`
    : null;
  return label !== null && label2 !== null
    ? `${label}. ${label2}`
    : (label ?? label2);
}

function truncateRecoveryPreview(
  shown?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let more = describeRecoveryRetention(shown, options);
  if (shown.length <= 8e3)
    return {
      shown: shown,
      more: more,
    };
  let charCodeAt: Dynamic = shown.charCodeAt(RECOVERY_PREVIEW_CHARACTERS - 1);
  let difference =
    charCodeAt >= 55296 && charCodeAt <= 56319
      ? RECOVERY_PREVIEW_CHARACTERS - 1
      : RECOVERY_PREVIEW_CHARACTERS;
  let label = `…and ${formatRecoverySize(utf8ByteLength(shown.slice(difference)))} more — `;
  return more === null
    ? {
        shown: shown.slice(0, difference),
        more: `${label}Copy gets all of it`,
      }
    : {
        shown: shown.slice(0, difference),
        more:
          shown.length >= options.whole
            ? `${label}Copy gets all of it. ${more}`
            : `${label}Copy gets all that is kept here (${more.slice(1)})`,
      };
}

function RecoveryCopyButton(
  { text: text, textRef: textRef, onManual: onManual }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let recoveryCopyButtonResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`idle`);
  let [countState, setCountState]: Dynamic = (0, React.useState)(0);
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]) =>
        clearTimeout(elementRef.current),
    [],
  );
  let setCountState2 = async (
    recoveryCopyButton?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (
      await loadPlatformSyncAndRoutingClipboard(
        text,
        undefined,
        recoveryCopyButton,
      )
    ) {
      setLabelState(`copied`);
      clearTimeout(elementRef.current);
      elementRef.current = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setLabelState(`idle`),
        1500,
      );
      return;
    }
    onManual?.();
    setLabelState(`manual`);
    setCountState(
      (recoveryCopyButton2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        recoveryCopyButton2 + 1,
    );
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (countState === 0) return;
      let text2: Dynamic = textRef.current;
      let selection: Dynamic = text2?.ownerDocument.getSelection();
      if (text2 && selection) {
        let range: Dynamic = text2.ownerDocument.createRange();
        range.selectNodeContents(text2);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    [countState, textRef],
  );
  return (
    <Button
      variant={`secondary`}
      size={recoveryCopyButtonResult(`sm`)}
      onClick={(event?: Dynamic, ..._extraArguments: unknown[]): undefined =>
        void setCountState2(event.currentTarget)
      }
    >
      {labelState === `copied`
        ? `Copied`
        : labelState === `manual`
          ? `Press ⌘C`
          : `Copy`}
    </Button>
  );
}

var RECOVERY_WAITING_FOR_EDIT_MESSAGE: string;

var RECOVERY_WAITING_FOR_DOCUMENT_MESSAGE: string;

var RECOVERY_VIEW_ONLY_MESSAGE: string;

var RECOVERY_PASTE_ELSEWHERE_MESSAGE: string;

var RECOVERY_CANNOT_RESTORE_MESSAGE: string;

var RECOVERY_UNCONFIRMED_MESSAGE: string;

var RECOVERY_TAB_GONE_MESSAGE: string;

var RECOVERY_DOCUMENT_GONE_MESSAGE: string;

function describeRecoveryState(
  describeRecoveryState2?: Dynamic,
  options: Dynamic = false,
  context: Dynamic = null,
  dependencies: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  return describeRecoveryState2.noDocument
    ? {
        tone: `warning`,
        words: RECOVERY_CANNOT_RESTORE_MESSAGE,
      }
    : describeRecoveryState2.staged
      ? context === `tab`
        ? {
            tone: `neutral`,
            words: RECOVERY_TAB_GONE_MESSAGE,
          }
        : context === `document`
          ? {
              tone: `neutral`,
              words: RECOVERY_DOCUMENT_GONE_MESSAGE,
            }
          : dependencies
            ? {
                tone: `neutral`,
                words: RECOVERY_CANNOT_RESTORE_MESSAGE,
              }
            : {
                tone: `neutral`,
                words: describeRecoveryState2.penOff
                  ? RECOVERY_WAITING_FOR_EDIT_MESSAGE
                  : RECOVERY_WAITING_FOR_DOCUMENT_MESSAGE,
              }
      : describeRecoveryState2.drops
        ? {
            tone: `warning`,
            words: dependencies
              ? RECOVERY_CANNOT_RESTORE_MESSAGE
              : options
                ? RECOVERY_VIEW_ONLY_MESSAGE
                : RECOVERY_PASTE_ELSEWHERE_MESSAGE,
          }
        : {
            tone: `neutral`,
            words: RECOVERY_UNCONFIRMED_MESSAGE,
          };
}

var WHITESPACE_LABELS: {
    space: string;
    spaces: string;
    tab: string;
    tabs: string;
    and: string;
    paragraphBreak: string;
};

var formatWhitespaceCount: Dynamic;

function describeWhitespace(items?: Dynamic, ..._extraArguments: unknown[]) {
  if (
    items ===
    `
`
  )
    return WHITESPACE_LABELS.paragraphBreak;
  if (!/^[ \t]+$/.test(items)) return null;
  let difference = items.split(`	`).length - 1;
  let difference2: Dynamic = items.length - difference;
  return [
    ...(difference2 === 0
      ? []
      : [
          difference2 === 1
            ? WHITESPACE_LABELS.space
            : `${formatWhitespaceCount(difference2)} ${WHITESPACE_LABELS.spaces}`,
        ]),
    ...(difference === 0
      ? []
      : [
          difference === 1
            ? WHITESPACE_LABELS.tab
            : `${formatWhitespaceCount(difference)} ${WHITESPACE_LABELS.tabs}`,
        ]),
  ].join(` ${WHITESPACE_LABELS.and} `);
}

function allowRecoveryDeletion(
  allowRecoveryDeletion2?: unknown,
  ..._extraArguments: unknown[]
) {
  return true;
}

var DELETE_RECOVERY_COPY: {
    button: string;
    title: string;
    body: string;
    cancel: string;
};

var RECOVERY_ASK_EVENT: string;

var recoveryItemIdentity: (ask?: Dynamic, ..._extraArguments: unknown[]) => string;

function findRecoveryItem(
  findRecoveryItem2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options === null) return null;
  let findRecoveryItem3: Dynamic = findRecoveryItem2.find(
    (item?: Dynamic, ..._extraArguments: unknown[]) => item.id === options.id,
  );
  if (findRecoveryItem3) return findRecoveryItem3;
  if (options.ident.startsWith(`k|`)) return null;
  let filteredFindRecoveryItem: Dynamic = findRecoveryItem2.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      recoveryItemIdentity(item) === options.ident,
  );
  return filteredFindRecoveryItem.length === 1
    ? filteredFindRecoveryItem[0]
    : null;
}

function RecoveryTextItem(
  {
    r: r5,
    onDismiss: onDismiss,
    onAsk: onAsk,
    restRef: restRef,
    asks: asks,
    scrolls: scrolls,
    viewOnly: viewOnly,
    gone: gone,
    errorFace: errorFace,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let recoveryTextItemResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let textRef: Dynamic = (0, React.useRef)(null);
  let { words: describeRecoveryState2, tone: variant }: Dynamic =
    describeRecoveryState(r5, viewOnly, gone, errorFace);
  let ariaLabelledby: Dynamic = (0, React.useId)();
  let restRef2: Dynamic = (0, React.useCallback)(
    (recoveryTextItem?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      textRef.current = recoveryTextItem;
      restRef(r5.id, recoveryTextItem);
    },
    [restRef, r5.id],
  );
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let { shown: record, more: record2 }: Dynamic = enabledState
    ? {
        shown: r5.text,
        more: describeRecoveryRetention(r5.text, r5.cut),
      }
    : truncateRecoveryPreview(r5.text, r5.cut);
  let describeWhitespace2 = describeWhitespace(r5.text);
  let describeWhitespace3 = enabledState ? null : describeWhitespace2;
  return (
    <Alert
      variant={variant}
      className={`pointer-events-auto`}
      data-testid={
        variant === `warning` ? `rescue-line-warning` : `rescue-line`
      }
    >
      <div className={`gap-sm flex items-start`}>
        <div className={`min-w-0 flex-1`}>
          <div id={ariaLabelledby}>{describeRecoveryState2}</div>
          <div
            ref={restRef2}
            data-testid={`rescue-text`}
            data-top-stack={`rest`}
            tabIndex={scrolls ? 0 : -1}
            role={`group`}
            aria-labelledby={ariaLabelledby}
            className={`${describeWhitespace3 === null ? `text-code ` : ``}mt-xs wrap-break-word max-h-[max(30vh,6rem)] overflow-y-auto whitespace-pre-wrap`}
          >
            {describeWhitespace3 === null ? (
              <span
                data-rescue-words={true}
                className={`pointer-events-auto`}
                aria-hidden={
                  enabledState && describeWhitespace2 !== null
                    ? true
                    : undefined
                }
              >
                {record}
              </span>
            ) : (
              <span
                data-rescue-label={true}
                className={`text-secondary pointer-events-auto select-none`}
              >
                <span aria-hidden={`true`}>{`(`}</span>
                {describeWhitespace3}
                <span aria-hidden={`true`}>{`)`}</span>
              </span>
            )}
          </div>
          {record2 && (
            <div className={`text-muted mt-xs`} data-testid={`rescue-more`}>
              {record2}
            </div>
          )}
        </div>
        <RecoveryCopyButton
          text={r5.text}
          textRef={textRef}
          onManual={(..._extraArguments: unknown[]): Dynamic =>
            setEnabledState(true)
          }
        />
        <Button
          {...originalJsxProps(
            {
              variant: `ghost`,
              size: recoveryTextItemResult(`sm`),
              onClick: (..._extraArguments: unknown[]): Dynamic =>
                allowRecoveryDeletion(r5) ? onAsk(r5) : onDismiss(r5.id),
              children: DELETE_RECOVERY_COPY.button,
            },
            asks,
          )}
        />
      </div>
    </Alert>
  );
}

function RecoveryTextPanel(
  {
    items: items,
    onDismiss: onDismiss,
    onCopyReport: onCopyReport,
    viewOnly: viewOnly,
    gone: gone,
    errorFace: errorFace,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let recoveryTextPanelResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let restRef: Dynamic = (0, React.useCallback)(
    (
      recoveryTextPanel?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (options === null
        ? lookupRef.current.delete(recoveryTextPanel)
        : lookupRef.current.set(recoveryTextPanel, options)),
    [],
  );
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`,`);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef.current;
      if (element === null) {
        setEnabledState2(false);
        return;
      }
      let join = (..._extraArguments: unknown[]): undefined => {
        setEnabledState2(element.scrollHeight > element.clientHeight + 1);
        setLabelState(
          `,${[...lookupRef.current].flatMap(([item, item2]: Dynamic, ..._extraArguments: unknown[]) => (item2.scrollHeight > item2.clientHeight + 1 ? [`${item},`] : [])).join(``)}`,
        );
      };
      join();
      if (typeof ResizeObserver === "undefined") return;
      let resizeObserver = new ResizeObserver(join);
      resizeObserver.observe(element);
      for (let recoveryTextPanelResult2 of element.children as Dynamic)
        resizeObserver.observe(recoveryTextPanelResult2);
      return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
    },
    [items, enabledState, onCopyReport !== undefined],
  );
  let [recoveryTextPanelState, setRecoveryTextPanelState]: Dynamic = (0,
  React.useState)(null);
  let findRecoveryItem2: Dynamic = findRecoveryItem(
    items,
    recoveryTextPanelState,
  );
  let [asks, setAsks]: Dynamic = (0, React.useState)(0);
  let itemsRef: Dynamic = (0, React.useRef)(items);
  itemsRef.current = limitRecoveryItems(items, enabledState);
  let countRef: Dynamic = (0, React.useRef)(0);
  if (findRecoveryItem2 !== null) {
    countRef.current = items.indexOf(findRecoveryItem2);
  }
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let dispatchEvent: Dynamic = (0, React.useCallback)(
    (detail?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      elementRef3.current = detail;
      let element: Dynamic = elementRef.current;
      let CustomEvent2: Dynamic =
        element?.ownerDocument.defaultView?.CustomEvent;
      if (detail !== null && element !== null && CustomEvent2 !== undefined) {
        element.dispatchEvent(
          new (CustomEvent2 as Dynamic)(RECOVERY_ASK_EVENT, {
            bubbles: true,
            detail: detail,
          }),
        );
      }
    },
    [],
  );
  let [enabledState3, setEnabledState3]: Dynamic = (0, React.useState)(false);
  let open = findRecoveryItem2 !== null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open || enabledState3) return;
      let setInterval2 = setInterval(
        (..._extraArguments: unknown[]): undefined =>
          void (elementRef3.current === null && setEnabledState3(true)),
        400,
      );
      return (..._extraArguments: unknown[]) => clearInterval(setInterval2);
    },
    [open, enabledState3],
  );
  let PhoneConfirmationDialog2: Dynamic = enabledState3
    ? UiDialogsOpen
    : PhoneConfirmationDialog;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(recoveryTextPanelState === null || findRecoveryItem2 !== null)) {
        elementRef2.current = {
          id: recoveryTextPanelState.id,
          at: countRef.current,
        };
        setRecoveryTextPanelState(null);
        setAsks(
          (
            recoveryTextPanel?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => recoveryTextPanel + 1,
        );
      }
    },
    [recoveryTextPanelState, findRecoveryItem2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef2.current;
      if (recoveryTextPanelState !== null || element === null) return;
      elementRef2.current = null;
      let count = 12;
      let recoveryTextPanelResult2: Dynamic;
      let focus = (..._extraArguments: unknown[]): undefined => {
        let ownerDocument: Dynamic = elementRef.current?.ownerDocument;
        if (!ownerDocument) return;
        let activeElement: Dynamic = ownerDocument.activeElement;
        if (
          activeElement !== null &&
          activeElement.closest(`[role="alertdialog"]`) !== null
        )
          return void (
            --count > 0 && (recoveryTextPanelResult2 = setTimeout(focus, 50))
          );
        if (
          (activeElement !== null &&
            activeElement !== ownerDocument.body &&
            activeElement !== ownerDocument.documentElement &&
            activeElement.isConnected) ||
          isDocumentFocusedElsewhere(ownerDocument)
        )
          return;
        let items2: Dynamic = itemsRef.current;
        let item: Dynamic =
          items2.find(
            (item2?: Dynamic, ..._extraArguments: unknown[]) =>
              item2.id === element.id,
          ) ?? items2[Math.min(element.at, items2.length - 1)];
        if (item !== undefined) {
          lookupRef.current.get(item.id)?.focus({
            preventScroll: true,
          });
        }
      };
      recoveryTextPanelResult2 = setTimeout(focus, 0);
      return (..._extraArguments: unknown[]) =>
        clearTimeout(recoveryTextPanelResult2);
    },
    [recoveryTextPanelState],
  );
  if (items.length === 0) return null;
  let limitRecoveryItems2: Dynamic = limitRecoveryItems(items, enabledState);
  let difference: Dynamic = items.length - limitRecoveryItems2.length;
  return (
    <div
      ref={elementRef}
      role={
        items.some(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            describeRecoveryState(item).tone === `warning`,
        )
          ? `alert`
          : `status`
      }
      data-testid={`rescue-tray`}
      className={`gap-xs ${enabledState2 ? `pointer-events-auto` : `pointer-events-none`} -m-px flex max-h-[max(50vh,14rem)] flex-col overflow-y-auto p-px`}
    >
      {limitRecoveryItems2.map(
        (limitRecoveryItem?: Dynamic, ..._extraArguments: unknown[]) => (
          <RecoveryTextItem
            {...originalJsxProps(
              {
                r: limitRecoveryItem,
                onDismiss: onDismiss,
                onAsk: (
                  recoveryTextPanel?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  setRecoveryTextPanelState(
                    (
                      recoveryTextPanel2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      recoveryTextPanel2 ?? {
                        id: recoveryTextPanel.id,
                        ident: recoveryItemIdentity(recoveryTextPanel),
                      },
                  ),
                restRef: restRef,
                asks: asks,
                scrolls: labelState.includes(`,${limitRecoveryItem.id},`),
                viewOnly: viewOnly,
                gone: gone,
                errorFace: errorFace,
              },
              limitRecoveryItem.id,
            )}
          />
        ),
      )}
      {difference > 0 && (
        <Alert variant={`neutral`} className={`pointer-events-auto`}>
          <div className={`gap-sm flex items-center`}>
            <div className={`min-w-0 flex-1`} data-testid={`rescue-folded`}>
              {difference === 1
                ? `1 more snippet is`
                : `${difference} more snippets are`}
              {` kept here — nothing is dropped.`}
            </div>
            <Button
              variant={`ghost`}
              size={recoveryTextPanelResult(`sm`)}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setEnabledState(true)
              }
            >{`Show all`}</Button>
          </div>
        </Alert>
      )}
      {enabledState && items.length > 3 && (
        <Alert variant={`neutral`} className={`pointer-events-auto`}>
          <div className={`gap-sm flex items-center justify-end`}>
            <Button
              variant={`ghost`}
              size={recoveryTextPanelResult(`sm`)}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setEnabledState(false)
              }
            >{`Show fewer`}</Button>
          </div>
        </Alert>
      )}
      {onCopyReport && (
        <div className={`pointer-events-none flex justify-end`}>
          <Button
            variant={`ghost`}
            size={recoveryTextPanelResult(`sm`)}
            className={`pointer-events-auto`}
            data-testid={`copy-debug-report`}
            onClick={onCopyReport}
          >{`Copy debug report`}</Button>
        </div>
      )}
      <PhoneConfirmationDialog2
        open={open}
        onOpenChange={(
          recoveryTextPanel?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!(recoveryTextPanel || recoveryTextPanelState === null)) {
            elementRef2.current = {
              id: findRecoveryItem2?.id ?? recoveryTextPanelState.id,
              at: countRef.current,
            };
            setRecoveryTextPanelState(null);
            setAsks(
              (
                recoveryTextPanel2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => recoveryTextPanel2 + 1,
            );
          }
        }}
        title={DELETE_RECOVERY_COPY.title}
        description={DELETE_RECOVERY_COPY.body}
        confirmLabel={DELETE_RECOVERY_COPY.button}
        cancelLabel={DELETE_RECOVERY_COPY.cancel}
        confirmVariant={`danger`}
        initialFocus={`cancel`}
        closeOnConfirm={true}
        onConfirm={(..._extraArguments: unknown[]): undefined => {
          if (findRecoveryItem2 !== null) {
            onDismiss(findRecoveryItem2.id);
          }
        }}
      >
        {open ? (
          <span ref={dispatchEvent} hidden={true} data-top-stack={`confirm`} />
        ) : null}
      </PhoneConfirmationDialog2>
    </div>
  );
}

var useDebugReportDialogStore: Dynamic;

var openDebugReportDialog: (..._extraArguments: unknown[]) => undefined;

function DebugReportDialog(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let debugReportDialogResult: Dynamic = useCommentsStoreUseSyncExternalStore();
  let open: Dynamic = useDebugReportDialogStore(
    (debugReportDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      debugReportDialog.open,
  );
  let onOpenChange: Dynamic = useDebugReportDialogStore(
    (debugReportDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      debugReportDialog.set,
  );
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(``);
  let [labelState2, setLabelState2]: Dynamic = (0, React.useState)(`idle`);
  let [checked, setChecked]: Dynamic = (0, React.useState)(false);
  let initialFocus: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!debugReportDialogResult) {
        onOpenChange(false);
      }
    },
    [debugReportDialogResult, onOpenChange],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]) => installCommentsStoreState(),
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!open) return;
      let includeDocText = isCommentsStoreValue3();
      setChecked(includeDocText);
      setLabelState(
        resolveObservabilityBootEntries({
          includeDocText: includeDocText,
        }),
      );
      setLabelState2(`idle`);
    },
    [open],
  );
  let onCheckedChange = (
    debugReportDialog?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let includeDocText = debugReportDialog === true;
    setChecked(includeDocText);
    setLabelState(
      resolveObservabilityBootEntries({
        includeDocText: includeDocText,
      }),
    );
    setLabelState2(`idle`);
  };
  let addRange = (..._extraArguments: unknown[]): undefined => {
    let initialFocus2: Dynamic = initialFocus.current;
    let selection: Dynamic = initialFocus2?.ownerDocument.getSelection();
    if (!initialFocus2 || !selection) return;
    let range: Dynamic = initialFocus2.ownerDocument.createRange();
    range.selectNodeContents(initialFocus2);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open || labelState === ``) return;
      let requestAnimationFrame2 = requestAnimationFrame(addRange);
      let setTimeout2 = setTimeout(addRange, 150);
      return (..._extraArguments: unknown[]): undefined => {
        cancelAnimationFrame(requestAnimationFrame2);
        clearTimeout(setTimeout2);
      };
    },
    [open, labelState],
  );
  let setLabelState3 = async (
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (await loadPlatformSyncAndRoutingClipboard(labelState)) {
      setLabelState2(`copied`);
    } else {
      addRange();
      setLabelState2(`manual`);
    }
  };
  return debugReportDialogResult ? (
    <UiDialogsRoot.Root open={open} onOpenChange={onOpenChange}>
      <UiDialogsRoot.Popup size={`lg`} initialFocus={initialFocus}>
        <UiDialogsRoot.Header
          showClose={true}
        >{`Debug report`}</UiDialogsRoot.Header>
        <div className={`flex min-h-0 flex-col gap-2`}>
          <SupportCodeCopyButton code={liveSupportCode()} />
          <p
            className={`text-muted text-footnote`}
          >{`Every operation this page saw, the last refusal first. The report is selected: copy it and paste into the report thread.`}</p>
          <div className={`flex items-baseline gap-2`}>
            <Checkbox
              data-testid={`op-debug-include-doc`}
              label={`Include document text`}
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
            <span
              className={`text-muted text-footnote`}
            >{`includes the full document (all collaborators’ text) — share carefully`}</span>
          </div>
          <pre
            ref={initialFocus}
            data-testid={`op-debug-report-text`}
            tabIndex={0}
            className={`text-code bg-alpha-1 max-h-[50vh] min-h-0 overflow-auto rounded p-3 whitespace-pre select-text`}
          >
            {labelState}
          </pre>
          {labelState2 === `manual` && (
            <p
              data-testid={`op-debug-copy-manual`}
              className={`text-warning text-footnote`}
              role={`status`}
            >{`Copying is blocked in this view — the report is selected: press ⌘C (Ctrl-C) to copy it.`}</p>
          )}
        </div>
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close render={<Button>{`Close`}</Button>} />
          <Button
            variant={`primary`}
            data-testid={`op-debug-copy`}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void setLabelState3()
            }
          >
            {labelState2 === `copied` ? `Copied` : `Copy`}
          </Button>
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  ) : null;
}

var ClaudeLogo: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentRecoveryStep1(): void {
  (canRestoreFocus = (
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ) => activity.at === `box` || activity.at === `nothing`);
  (SYNC_LOSS_MESSAGES = {
    offline: `Connection lost. Keep this tab open to sync changes when you go online.`,
    draining: `The server is restarting. Keep this tab open to sync changes when it's back.`,
    unsaved: `Some edits aren’t saved. They’re only on this page, so keep it open.`,
    moving: `Reconnecting to the server. Edits from the last few seconds may not have saved — keep this tab open.`,
    busy: `This document is busy. Keep this page open and your edits will save shortly.`,
  });
  (PHONE_DOCUMENT_OPENING_PADDING = `[@media(max-width:480px)_and_(pointer:coarse)_and_(max-device-width:480px)]:pt-5`);
  (quoteRecoveryPreview = (items?: Dynamic, ..._extraArguments: unknown[]) =>
    items.length > 24 ? `“${items.slice(0, 24).trimEnd()}…”` : `“${items}”`);
  (limitRecoveryItems = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (options || items.length <= 3 ? items : items.slice(0, 3)));
  (RECOVERY_PREVIEW_CHARACTERS = 6e3);
  (formatRecoverySize = (
    recoverySize?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    recoverySize < 1024 * 1024
      ? `${Math.max(1, Math.round(recoverySize / 1024))} KB`
      : `${(recoverySize / (1024 * 1024)).toFixed(1)} MB`);
  (utf8ByteLength = (
    utf8ByteLength2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => new TextEncoder().encode(utf8ByteLength2).length);
  (RECOVERY_WAITING_FOR_EDIT_MESSAGE = `This text is waiting until you can edit. Then reload the page to put it back. Copy it if you need it now:`);
  (RECOVERY_WAITING_FOR_DOCUMENT_MESSAGE = `This text is waiting to be put back when the document opens for editing. Copy it if you need it now:`);
  (RECOVERY_VIEW_ONLY_MESSAGE = `This text couldn’t be put back. You can only view this page now, so copy it to keep it:`);
  (RECOVERY_PASTE_ELSEWHERE_MESSAGE = `This text couldn’t be put back. Copy it and paste it where you want it:`);
  (RECOVERY_CANNOT_RESTORE_MESSAGE = `This text can’t be put back from here. Copy it to keep it:`);
  (RECOVERY_UNCONFIRMED_MESSAGE = `This text is kept here for now. The document may not have it. Copy it if you need it:`);
  (RECOVERY_TAB_GONE_MESSAGE = `This text can’t be put back because the tab it was in is no longer available. Copy it to keep it:`);
  (RECOVERY_DOCUMENT_GONE_MESSAGE = RECOVERY_CANNOT_RESTORE_MESSAGE);
  (WHITESPACE_LABELS = {
    space: `a space`,
    spaces: `spaces`,
    tab: `a tab`,
    tabs: `tabs`,
    and: `and`,
    paragraphBreak: `a paragraph break`,
  });
  (formatWhitespaceCount = (
    whitespaceCount?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    whitespaceCount < 1e5
      ? String(whitespaceCount)
      : String(whitespaceCount).replace(/\B(?=(\d{3})+$)/g, `,`));
  (DELETE_RECOVERY_COPY = {
    button: `Delete text`,
    title: `Delete this text?`,
    body: `This cannot be undone.`,
    cancel: `Cancel`,
  });
  (RECOVERY_ASK_EVENT = `top-stack:asked`);
  (recoveryItemIdentity = (ask?: Dynamic, ..._extraArguments: unknown[]) =>
    `${ask.armed === true ? `a` : ask.staged === true ? `s` : `k`}|${ask.bid}|${ask.afterId ?? ``}`);
  (useDebugReportDialogStore = create(
    (
      debugReportDialogStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      open: false,
      set: (open?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        debugReportDialogStore({
          open: open,
        }),
    }),
  ));
  (openDebugReportDialog = (..._extraArguments: unknown[]): undefined => {
    if (resolveCommentsStoreValue24()) {
      useDebugReportDialogStore.getState().set(true);
    }
  });
  (ClaudeLogo = (
    claudeLogo?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    <svg
      {...originalJsxProps({
        xmlns: `http://www.w3.org/2000/svg`,
        width: 94,
        height: 94,
        viewBox: `0 0 94 94`,
        fill: `none`,
        ...claudeLogo,
        children: (
          <path
            d={`M18.3658 62.2435L36.7823 51.9165L37.0858 51.012L36.7823 50.5083H35.8716L32.7853 50.3206L22.2616 50.0389L13.1546 49.6634L4.30054 49.194L2.07438 48.7246L0 45.9551L0.202378 44.5938L2.07438 43.3264L4.75589 43.5611L10.6755 43.9836L19.5801 44.5938L26.0056 44.9693L35.568 45.9551H37.0858L37.2882 45.3448L36.7823 44.9693L36.3775 44.5938L27.1693 38.3507L17.2022 31.7789L11.9909 27.9767L9.20822 26.0522L7.79157 24.2684L7.18443 20.3254L9.71416 17.5089L13.1546 17.7436L14.0147 17.9783L17.5057 20.654L24.9431 26.4277L34.6573 33.5627L36.0739 34.7362L36.6444 34.3512L36.7317 34.079L36.0739 32.9994L30.8121 23.4704L25.1961 13.7537L22.6664 9.71675L22.0086 7.32277C21.7539 6.31812 21.6039 5.48695 21.6039 4.45938L24.4878 0.516349L26.1068 0L30.0026 0.516349L31.6216 1.92457L34.0502 7.46359L37.9459 16.1476L44.0173 27.9767L45.7881 31.4973L46.7494 34.7362L47.1036 35.722H47.7107V35.1587L48.2166 28.4931L49.1274 20.3254L50.0381 9.81063L50.3416 6.85336L51.8089 3.28586L54.7434 1.36128L57.0201 2.44092L58.8921 5.11655L58.6391 6.85336L57.5261 14.0822L55.3505 25.395L53.9338 32.9994H54.7434L55.7047 32.0136L59.5498 26.944L65.9753 18.8702L68.8086 15.6782L72.1479 12.1577L74.2729 10.4678H78.3204L81.2549 14.8802L79.9395 19.4335L75.7907 24.6909L72.3503 29.1503L67.4173 35.7593L64.3563 41.0732L64.6308 41.5116L65.3682 41.4487L76.499 39.0548L82.5198 37.9751L89.7042 36.7547L92.9423 38.2568L93.2964 39.8058L92.0316 42.9509L84.3412 44.8285L75.3354 46.6592L61.9245 49.8162L61.776 49.9356L61.9513 50.1956L67.9991 50.743L70.5795 50.8839H76.9038L88.6923 51.7757L91.7786 53.7942L93.6 56.282L93.2964 58.2066L88.5405 60.6006L82.1656 59.0985L67.2402 55.531L62.1302 54.2636H61.4218V54.6861L65.6718 58.8638L73.514 65.9049L83.2787 75.0114L83.7846 77.2646L82.5198 79.0483L81.2043 78.8606L72.6032 72.3827L69.264 69.4724L61.776 63.1354H61.2701V63.7926L62.9903 66.3274L72.1479 80.081L72.6032 84.3057L71.9455 85.667L69.5676 86.5119L66.9872 86.0425L61.5736 78.4851L56.0588 70.0357L51.6065 62.4313L51.0687 62.7708L48.419 91.0652L47.2048 92.5204L44.3715 93.6L41.9935 91.8162L40.7286 88.9059L41.9935 83.1322L43.5114 75.6217L44.7256 69.6602L45.8387 62.2435L46.5185 59.7659L46.4584 59.6001L45.9153 59.6914L40.3239 67.3601L31.824 78.8606L25.0949 86.0425L23.4759 86.6997L20.6932 85.2445L20.9462 82.6628L22.5146 80.3627L31.824 68.5336L37.44 61.1639L41.0595 56.9335L41.0243 56.3216L40.8245 56.3046L16.0891 72.4297L11.6874 72.993L9.76476 71.2092L10.0177 68.2989L10.9284 67.3601L18.3658 62.2435Z`}
            fill={`#D97757`}
          />
        ),
      })}
    />
  ));
}

export {
  ClaudeLogo,
  DebugReportDialog,
  DocumentOpeningBanner,
  DocumentOpeningSkeleton,
  RecoveryTextPanel,
  SyncLossBanner,
  SyncLossReportActions,
  canRestoreFocus,
  classifyFocusLocation,
  openDebugReportDialog,
  quoteRecoveryPreview,
};

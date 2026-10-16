/** BaoCut: widget bridge from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  PlatformLiveDocumentAndHistoryEntries,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  platformSessionAndSourcesPattern9,
  resolveDataModelSchemasRail,
  resolveDataModelSchemasTarget,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformImagesAndBlobsLabel,
  resolvePlatformSessionAndSourcesNode,
  resolvePlatformSyncAndRoutingCompact,
  updateDataModelSchemasPath,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  useKeyboardHelpStore,
} from "../document-display";
import {
  FrameGesturesEmit,
  frameGesturesSet9,
  isFrameGesturesValue,
  resolveFrameGesturesCls,
} from "../frame/gestures-state-2";
import type * as ReactComponentTypes from "react";

export const FunctionRunDialog: ReactComponentTypes.FC<Dynamic> = ({
  container: container,
  runRef: runRef,
  onClose: onClose,
}) => {
  let runRefSlice: Dynamic = runRef.startsWith(`run:`) ? runRef.slice(4) : runRef;
  let functionRunDialogResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let controlId: Dynamic = (0, React.useId)();
  let functionRunDialogResult2: Dynamic = PlatformLiveDocumentAndHistoryEntries(
    (functionRunDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      functionRunDialog.entries[controlId]?.run ?? null,
  );
  let functionRunDialogResult3: Dynamic = PlatformLiveDocumentAndHistoryEntries(
    (functionRunDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      functionRunDialog.entries[controlId]?.fn ?? null,
  );
  let functionRunDialogResult4: Dynamic = PlatformLiveDocumentAndHistoryEntries(
    (functionRunDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      functionRunDialog.entries[controlId]?.err ?? null,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      PlatformLiveDocumentAndHistoryEntries.getState().load(
        controlId,
        container,
        runRefSlice,
      );
    },
    [controlId, container, runRefSlice],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        PlatformLiveDocumentAndHistoryEntries.getState().release(controlId),
    [controlId],
  );
  let onClick = (..._extraArguments: unknown[]): undefined => {
    let id2: Dynamic =
      functionRunDialogResult3 === null
        ? undefined
        : (functionRunDialogResult3.id ?? functionRunDialogResult2?.runner.name);
    if (id2) {
      updateDataModelSchemasPath({
        file: `.function/${id2}`,
      });
    }
    onClose();
  };
  let configurationEntry: Dynamic = functionRunDialogResult2
    ? Object.entries(functionRunDialogResult2.configuration).find(
        ([, items]: Dynamic, ..._extraArguments: unknown[]) =>
          typeof items == `string` &&
          items.length >= 24 &&
          /\b(select|from)\b/i.test(items),
      )
    : undefined;
  let widgetBridgeIcon: Dynamic = functionRunDialogResult3
    ? resolveWidgetBridgeIcon(functionRunDialogResult3)
    : [];
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        functionRunDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !functionRunDialog && onClose()}
    >
      <UiDialogsRoot.Popup size={`md`}>
        <UiDialogsRoot.Header showClose={true}>{`Sources`}</UiDialogsRoot.Header>
        <div className={`px-lg pb-md flex flex-col gap-3`}>
          {functionRunDialogResult4 ? (
            <p className={`text-muted text-body`}>{`No run found for this card.`}</p>
          ) : functionRunDialogResult2 ? (
            <jsxRuntime.Fragment>
              <UseWidgetBridgeLabelComponent label={`Run`}>
                <UseWidgetBridgeIconComponent icon={`Play`} onClick={onClick}>
                  {`run/`}
                  {runRefSlice.slice(0, 4)}
                  {`/`}
                  {resolveWidgetBridgeIsNaN(
                    functionRunDialogResult2.timing.endedAt,
                    functionRunDialogResult.locale,
                    functionRunDialogResult.timeZone,
                  )}
                </UseWidgetBridgeIconComponent>
              </UseWidgetBridgeLabelComponent>
              <UseWidgetBridgeLabelComponent label={`Inputs`}>
                {widgetBridgeIcon.map(
                  (widgetBridgeIcon2?: Dynamic, ..._extraArguments: unknown[]) => (
                    <UseWidgetBridgeIconComponent
                      icon={widgetBridgeIcon2.icon}
                      key={widgetBridgeIcon2.label}
                    >
                      {widgetBridgeIcon2.label}
                    </UseWidgetBridgeIconComponent>
                  ),
                )}
                {widgetBridgeIcon.length === 0 && (
                  <span className={`text-muted text-[11px]`}>{`—`}</span>
                )}
              </UseWidgetBridgeLabelComponent>
              {configurationEntry && (
                <UseWidgetBridgeLabelComponent label={`Query (SQL)`}>
                  <div className={`flex min-w-0 flex-col gap-2`}>
                    <pre
                      className={`text-secondary max-h-40 overflow-auto font-mono whitespace-pre-wrap`}
                    >
                      {String(configurationEntry[1])}
                    </pre>
                    <div>
                      <UseWidgetBridgeIconComponent icon={`CodeBrackets`}>
                        {`args.`}
                        {configurationEntry[0]}
                      </UseWidgetBridgeIconComponent>
                    </div>
                  </div>
                </UseWidgetBridgeLabelComponent>
              )}
            </jsxRuntime.Fragment>
          ) : (
            <p className={`text-muted text-body`}>{`Loading…`}</p>
          )}
        </div>
        <UiDialogsRoot.Footer align={`end`}>
          <Button
            variant={`secondary`}
            disabled={!functionRunDialogResult2}
            onClick={onClick}
          >{`See run`}</Button>
          <UiDialogsRoot.Close render={<Button variant={`primary`}>{`Close`}</Button>} />
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
};

export const WidgetSampleProblems: ReactComponentTypes.FC<Dynamic> = (
  widgetSampleProblems,
) => {
  let problemsSlice: Dynamic = widgetSampleProblems.problems.slice(0, 12);
  let total: Dynamic =
    widgetSampleProblems.problems.length -
    problemsSlice.length +
    widgetSampleProblems.more;
  return (
    <ul
      data-testid={`widget-sample-problems`}
      className={`text-secondary mt-1 max-h-[20vh] list-disc overflow-auto pl-5 font-mono leading-snug`}
    >
      {problemsSlice.map(
        (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => (
          <li key={index}>{resolveWidgetBridgeRule(item)}</li>
        ),
      )}
      {total > 0 && (
        <li>
          {`+`}
          {total}
          {` more`}
        </li>
      )}
    </ul>
  );
};

export const UseWidgetBridgeLabelComponent: ReactComponentTypes.FC<Dynamic> = ({
  label: label,
  children: children,
}) => {
  return (
    <div className={`flex items-start gap-4`}>
      <div className={`text-muted text-body w-24 shrink-0 pt-0.5`}>{label}</div>
      <div className={`flex min-w-0 flex-1 flex-wrap items-start gap-1.5`}>
        {children}
      </div>
    </div>
  );
};

export const UseWidgetBridgeIconComponent: ReactComponentTypes.FC<Dynamic> = ({
  icon: icon,
  onClick: onClick,
  children: children,
}) => {
  let className = `bg-surface-0 text-muted inline-flex items-center gap-1 rounded border px-1 py-0.5 text-[10px]`;
  return onClick ? (
    <button
      type={`button`}
      onClick={onClick}
      className={`${className} hover:text-secondary`}
    >
      <UiOverlaysAndIconsCustomIcon name={icon} customSize={10} />
      {children}
    </button>
  ) : (
    <span className={className}>
      <UiOverlaysAndIconsCustomIcon name={icon} customSize={10} />
      {children}
    </span>
  );
};

export const WidgetSampleCard: ReactComponentTypes.FC<Dynamic> = (widgetSampleCard) => {
  let widgetSampleCardResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let { view: widgetSampleCard2 }: Dynamic = widgetSampleCard;
  let matchesPhase =
    widgetSampleCard2.phase === `proposal` ||
    widgetSampleCard2.phase === `inserting` ||
    widgetSampleCard2.phase === `refused`;
  let sourcePartsCount: Dynamic = matchesPhase
    ? widgetSampleCard2.source.split(`
`).length
    : 0;
  let total: Dynamic =
    widgetSampleCard2.phase === `refused`
      ? widgetSampleCard2.problems.length + widgetSampleCard2.more
      : 0;
  return (
    <div
      data-testid={`widget-sample-card`}
      data-phase={widgetSampleCard2.phase}
      role={`dialog`}
      aria-label={`Widget proposal`}
      className={`border-strong bg-surface-popover text-primary fixed right-4 bottom-4 z-50 flex w-[min(560px,calc(100vw-2rem))] flex-col gap-2 rounded-lg border p-3 shadow-lg`}
    >
      <div className={`text-footnote text-secondary flex items-center gap-2`}>
        <span className={`font-medium`}>{`/widget`}</span>
        <Tooltip content={widgetSampleCard2.request} multiline={true}>
          <span className={`truncate`}>{widgetSampleCard2.request}</span>
        </Tooltip>
        {widgetSampleCard2.attempt > 1 && (
          <span>
            {`· attempt `}
            {widgetSampleCard2.attempt}
          </span>
        )}
      </div>
      {widgetSampleCard2.phase === `generating` && (
        <div
          data-testid={`widget-sample-generating`}
          className={`text-body py-2`}
        >{`Claude is writing the widget…`}</div>
      )}
      {widgetSampleCard2.phase === `inserting` && (
        <div
          data-testid={`widget-sample-inserting`}
          className={`text-body py-2`}
        >{`Inserting…`}</div>
      )}
      {matchesPhase && (
        <pre
          data-testid={`widget-sample-source`}
          className={`bg-fill-secondary text-caption max-h-[40vh] overflow-auto rounded p-2 font-mono leading-snug`}
        >
          {widgetSampleCard2.source}
        </pre>
      )}
      {widgetSampleCard2.phase === `proposal` && (
        <div className={`text-footnote text-secondary`}>
          {sourcePartsCount}
          {` lines`}
          {widgetSampleCard2.truncated
            ? ` · the reply hit the length limit — Try again may do better`
            : ``}
          {`. Nothing is added to the document until you press Insert; the document checks the code when you do.`}
          {widgetSampleCard2.note ? (
            <div className={`text-warning mt-1`}>{widgetSampleCard2.note}</div>
          ) : null}
          {widgetSampleCard2.problems && widgetSampleCard2.problems.length > 0 ? (
            <div data-testid={`widget-sample-preflight`} className={`text-warning mt-1`}>
              {`The document's checks will likely refuse this source as written (Insert still lets the document decide):`}
              <WidgetSampleProblems problems={widgetSampleCard2.problems} more={0} />
            </div>
          ) : null}
        </div>
      )}
      {widgetSampleCard2.phase === `refused` && (
        <div data-testid={`widget-sample-refused`} className={`text-footnote`}>
          <div className={`text-warning`}>
            {total === 0
              ? `The document's checks did not accept Claude's code (no details were given), so it was not inserted.`
              : total === 1
                ? `The document's checks found a problem in Claude's code, so it was not inserted:`
                : `The document's checks found ${total} problems in Claude's code, so it was not inserted:`}
          </div>
          {total > 0 && (
            <WidgetSampleProblems
              problems={widgetSampleCard2.problems}
              more={widgetSampleCard2.more}
            />
          )}
          {widgetSampleCard2.note ? (
            <div className={`text-warning mt-1`}>{widgetSampleCard2.note}</div>
          ) : null}
          <div className={`text-secondary mt-1`}>
            {widgetSampleCard2.canRetry
              ? `Try again shows Claude this code and the problems and asks for a corrected version. `
              : ``}
            {`Insert as draft keeps this code (`}
            {sourcePartsCount}
            {` `}
            {sourcePartsCount === 1 ? `line` : `lines`}
            {`) in the document as an unpublished draft.`}
          </div>
        </div>
      )}
      {widgetSampleCard2.phase === `failed` && (
        <div data-testid={`widget-sample-failed`} className={`text-body py-2`}>
          {widgetSampleCard2.words}
        </div>
      )}
      <div className={`flex justify-end gap-2`}>
        <Button
          variant={`ghost`}
          size={widgetSampleCardResult(`sm`)}
          onClick={widgetSampleCard.onDiscard}
          disabled={widgetSampleCard2.phase === `inserting`}
        >
          {widgetSampleCard2.phase === `refused` ? `Dismiss` : `Discard`}
        </Button>
        {widgetSampleCard2.phase === `refused` && (
          <Button
            variant={`secondary`}
            size={widgetSampleCardResult(`sm`)}
            onClick={widgetSampleCard.onInsertDraft}
            data-testid={`widget-sample-insert-draft`}
          >{`Insert as draft`}</Button>
        )}
        {(widgetSampleCard2.phase === `proposal` ||
          widgetSampleCard2.phase === `failed` ||
          widgetSampleCard2.phase === `refused`) &&
          widgetSampleCard2.canRetry && (
            <Button
              variant={`secondary`}
              size={widgetSampleCardResult(`sm`)}
              onClick={widgetSampleCard.onRetry}
            >{`Try again`}</Button>
          )}
        {widgetSampleCard2.phase === `proposal` && (
          <Button
            variant={`primary`}
            size={widgetSampleCardResult(`sm`)}
            onClick={widgetSampleCard.onInsert}
            data-testid={`widget-sample-insert`}
          >{`Insert`}</Button>
        )}
      </div>
    </div>
  );
};

function isWidgetBridgeWhere(
  widgetBridgeWhere?: unknown,
  options?: Dynamic,
  context: Dynamic = FrameGesturesEmit,
  ..._extraArguments: unknown[]
) {
  if (
    typeof widgetBridgeWhere != `object` ||
    !widgetBridgeWhere ||
    !isFrameGesturesValue(options)
  )
    return false;
  let { where: widgetBridgeWhere2, cls: widgetBridgeWhere3 }: Dynamic =
    widgetBridgeWhere;
  resolveFrameGesturesCls(
    {
      where:
        typeof widgetBridgeWhere2 == `string` &&
        frameGesturesSet9.has(widgetBridgeWhere2)
          ? widgetBridgeWhere2
          : `boot`,
      cls: typeof widgetBridgeWhere3 == `string` ? widgetBridgeWhere3 : ``,
      road: `iframe`,
    },
    context,
  );
  return true;
}

function resolveWidgetBridgeRailH(
  widgetBridgeRailH?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let difference = Math.max(8, widgetBridgeRailH.y) - 12;
  let difference2: number =
    widgetBridgeRailH.railH + 12 - widgetBridgeRailH.stackH;
  return Math.max(8, Math.min(difference, difference2));
}

function resolveWidgetBridgeRailH2(
  widgetBridgeRailH2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return Math.max(0, widgetBridgeRailH2.railH + 12 - widgetBridgeRailH2.top);
}

function resolveWidgetBridgeClickX(
  widgetBridgeClickX?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return widgetBridgeClickX.clickX < widgetBridgeClickX.bandLeft
    ? 0
    : Math.max(
        0,
        widgetBridgeClickX.lineBottom - widgetBridgeClickX.anchorTop,
      ) + 8;
}

function resolveWidgetBridgeFlatMap(
  widgetBridgeFlatMap?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return widgetBridgeFlatMap.flatMap(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.ids,
  );
}

function resolveWidgetBridgeValue(
  items?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) return null;
  if (options < 0) return context > 0 ? items[0] : items[items.length - 1];
  let total: Dynamic = options + context;
  return total < 0 || total >= items.length ? null : items[total];
}

function resolveWidgetBridgeSlack(
  widgetBridgeSlack?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let slack: Dynamic = widgetBridgeSlack.slack ?? 24;
  let difference = widgetBridgeSlack.anchorY - 72;
  return Math.abs(difference) <= slack
    ? 0
    : Math.round(
        Math.max(-Math.max(0, widgetBridgeSlack.docScrollY), difference),
      ) || 0;
}

var widgetBridgeLimit10000: number;

var widgetBridgeLimit1000: number;

function isWidgetBridgeLastDocPos(
  widgetBridgeLastDocPos?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (widgetBridgeLastDocPos.lastDocPos === null) return true;
  let difference: number =
    widgetBridgeLastDocPos.docPos - widgetBridgeLastDocPos.lastDocPos;
  return widgetBridgeLastDocPos.ownScroll &&
    Math.abs(difference - widgetBridgeLastDocPos.ownScroll) <= 1
    ? false
    : Math.abs(difference) > 1;
}

function resolveWidgetBridgeLineY(
  widgetBridgeLineY?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return widgetBridgeLineY.lineY > widgetBridgeLineY.bandBottom
    ? Math.round(widgetBridgeLineY.lineY - widgetBridgeLineY.bandBottom) || 0
    : (widgetBridgeLineY.lineY < 72 &&
        widgetBridgeLineY.bandBottom >= 72 &&
        Math.round(
          Math.max(
            -Math.max(0, widgetBridgeLineY.docScrollY),
            widgetBridgeLineY.lineY - 72,
          ),
        )) ||
        0;
}

function useWidgetBridgeCurrent(
  widgetBridgeCurrent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let recordRef: Dynamic = (0, React.useRef)({
    on: false,
    v: widgetBridgeCurrent,
  });
  if (options && !recordRef.current.on) {
    recordRef.current = {
      on: true,
      v: widgetBridgeCurrent,
    };
  } else {
    if (!options && recordRef.current.on) {
      recordRef.current = {
        on: false,
        v: widgetBridgeCurrent,
      };
    }
  }
  return options ? recordRef.current.v : widgetBridgeCurrent;
}

function useWidgetBridgeStickPx(
  { stickPx: stickPx, footPx: footPx, nudgePx: nudgePx }: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let docTopRef: Dynamic = (0, React.useRef)(null);
  let yRef: Dynamic = (0, React.useRef)(options);
  let boxRef: Dynamic = (0, React.useRef)({
    top: 0,
    height: 0,
  });
  let elementRef: Dynamic = (0, React.useRef)(null);
  let labelRef: Dynamic = (0, React.useRef)(``);
  let paint: Dynamic = (0, React.useCallback)(
    (
      widgetBridgeStickPx?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      yRef.current = widgetBridgeStickPx;
      let element: Dynamic = elementRef.current;
      let docTop: Dynamic = docTopRef.current;
      if (!element || docTop === null) return;
      let max = Math.max(stickPx, Math.round(docTop + nudgePx));
      let round = Math.round(boxRef.current.top + max);
      let max2 = Math.max(0, Math.round(boxRef.current.height - max - footPx));
      let total = round + `|` + max2;
      if (total !== labelRef.current) {
        labelRef.current = total;
        element.style.top = round + `px`;
        element.style.maxHeight = max2 + `px`;
      }
    },
    [stickPx, footPx, nudgePx],
  );
  let seat: Dynamic = (0, React.useCallback)(
    (
      widgetBridgeStickPx?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      elementRef.current = widgetBridgeStickPx;
      labelRef.current = ``;
      if (widgetBridgeStickPx) {
        paint(yRef.current);
      }
    },
    [paint],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      docTopRef: docTopRef,
      yRef: yRef,
      boxRef: boxRef,
      paint: paint,
      seat: seat,
    }),
    [paint, seat],
  );
}

var widgetBridgeLimit0_5: number;

var widgetBridgeLimit2: number;

var isWidgetBridgeValue: (widgetBridgeValue?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function isWidgetBridgeWidgetTops(
  widgetBridgeWidget?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    widgetBridgeWidget === null ||
    widgetBridgeWidget.widgetTops !== null ||
    options.widgetTops !== null ||
    !Number.isFinite(widgetBridgeWidget.scrollY) ||
    !Number.isFinite(options.scrollY)
  )
    return false;
  let difference: number = widgetBridgeWidget.scrollY - options.scrollY;
  let docExtent: Dynamic = widgetBridgeWidget.docExtent;
  let docExtent2: Dynamic = options.docExtent;
  if (
    (docExtent === null) != (docExtent2 === null) ||
    (docExtent &&
      docExtent2 &&
      !(
        Math.abs(docExtent2.top - (docExtent.top + difference)) <=
          widgetBridgeLimit0_5 &&
        Math.abs(docExtent2.bottom - (docExtent.bottom + difference)) <=
          widgetBridgeLimit0_5
      )) ||
    !isWidgetBridgeValue(widgetBridgeWidget.rects, options.rects)
  )
    return false;
  for (let isWidgetBridgeWidgetTopsResult in options.rects)
    if (
      !(
        Math.abs(
          options.rects[isWidgetBridgeWidgetTopsResult] -
            (widgetBridgeWidget.rects[isWidgetBridgeWidgetTopsResult] +
              difference),
        ) <= widgetBridgeLimit0_5
      )
    )
      return false;
  if (widgetBridgeWidget.present.length !== options.present.length)
    return false;
  if (widgetBridgeWidget.present !== options.present) {
    let uniqueItems: Dynamic = new (Set as Dynamic)(widgetBridgeWidget.present);
    for (let isWidgetBridgeWidgetTopsResult of options.present as Dynamic)
      if (!uniqueItems.has(isWidgetBridgeWidgetTopsResult)) return false;
  }
  return true;
}

var WidgetBridgeHost: Dynamic;

var widgetBridgeLimit20000: number;

var resolveWidgetBridgeIsFinite: Dynamic;

var WidgetBridgeNonce: Dynamic;

function resolveWidgetBridgeTarget(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveWidgetBridgeTargetResult = resolveDataModelSchemasRail(
    event.target,
    options,
    dependencies,
  );
  return resolveWidgetBridgeTargetResult === null ||
    (resolveWidgetBridgeTargetResult === `doc` && argument3)
    ? null
    : resolveDataModelSchemasTarget(
        event,
        options,
        context,
        dependencies,
        argument,
        argument2,
      );
}

function installWidgetBridgeResume(
  installWidgetBridgeResume2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let subscribe: Dynamic = useKeyboardHelpStore.subscribe(
    (
      installWidgetBridgeResume3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (installWidgetBridgeResume3.open || enabled) return;
      subscribe2();
      let iframe: Dynamic = installWidgetBridgeResume2.iframe();
      if (!iframe || !installWidgetBridgeResume2.alive()) return;
      let post = (..._extraArguments: unknown[]): undefined => {
        if (
          !(
            !installWidgetBridgeResume2.alive() ||
            iframe.ownerDocument.activeElement !== iframe
          )
        ) {
          installWidgetBridgeResume2.post({
            type: `caret-focus`,
            resume: true,
          });
        }
      };
      iframe.addEventListener(`focus`, post, {
        once: true,
      });
      (iframe.ownerDocument.defaultView ?? window).setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          iframe.removeEventListener(`focus`, post);
          post();
        },
        installWidgetBridgeResume2.settleMs ?? 400,
      );
    },
  );
  let subscribe2 = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      subscribe();
    }
  };
  return subscribe2;
}

function resolveWidgetBridgeIcon(
  widgetBridgeIcon?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (widgetBridgeIcon.config.type === `tool_call`) {
    items.push({
      icon: `CodeBrackets`,
      label: widgetBridgeIcon.config.call.tool,
    });
  } else {
    if (widgetBridgeIcon.config.type === `prompt`) {
      items.push({
        icon: `Chat`,
        label: `prompt`,
      });
    } else {
      items.push({
        icon: `Code`,
        label: `code`,
      });
    }
  }
  for (let resolveWidgetBridgeIconResult of (widgetBridgeIcon.refs ??
    []) as Dynamic)
    items.push({
      icon: `Play`,
      label: `routine:${resolveWidgetBridgeIconResult}`,
    });
  return items;
}

var WidgetBridgeHour: {
    hour: string;
    minute: string;
    second: string;
    hourCycle: string;
};

var widgetBridgeInstance: Dynamic;

var widgetBridgeMap: Dynamic;

var updateWidgetBridgeTimeZone: Dynamic;

function resolveWidgetBridgeIsNaN(
  widgetBridgeIsNaN?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let date = new Date(widgetBridgeIsNaN);
  if (Number.isNaN(date.getTime())) return widgetBridgeIsNaN;
  let toParts: Dynamic = updateWidgetBridgeTimeZone(
    options,
    context,
  ).formatToParts(date);
  let resolveWidgetBridgeIsNaNHandler: Dynamic = (
    widgetBridgeIsNaN2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    toParts.find(
      (toPart?: Dynamic, ..._extraArguments: unknown[]) =>
        toPart.type === widgetBridgeIsNaN2,
    )?.value ?? `00`;
  return `${resolveWidgetBridgeIsNaNHandler(`hour`)}${resolveWidgetBridgeIsNaNHandler(`minute`)}:${resolveWidgetBridgeIsNaNHandler(`second`)}`;
}

function resolveWidgetBridgeValue2(
  widgetBridgeValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `Upload failed: too many files (${widgetBridgeValue2} > ${options})`;
}

var resolveWidgetBridgeValue3: Dynamic;

var WidgetBridgeCode: Readonly<{
    code: "";
    draftPresent: false;
    gone: true;
}>;

var widgetBridgeLimit0: number;

var resolveWidgetBridgeCode: Dynamic;

var resolveWidgetBridgeCode2: Dynamic;

var resolveWidgetBridgeValue4: (widgetBridgeValue4?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var updateWidgetBridgeDelete: (updateWidgetBridgeDelete2?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolveWidgetBridgeJson: Dynamic;

function resolveWidgetBridgeJson2(
  file?: Dynamic,
  file2?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nodes: Dynamic = {
    ...file.nodes,
  };
  for (let [
    resolveWidgetBridgeJson2Result,
    resolveWidgetBridgeJson2Result2,
  ] of context as Dynamic) {
    if (file.nodes[resolveWidgetBridgeJson2Result] !== undefined) continue;
    let nodeItem: Dynamic = file2?.nodes[resolveWidgetBridgeJson2Result];
    if (
      nodeItem &&
      nodeItem.type === `prose` &&
      nodeItem.ydoc === resolveWidgetBridgeJson2Result2.ydoc
    ) {
      nodes[resolveWidgetBridgeJson2Result] = nodeItem;
    } else {
      nodes[resolveWidgetBridgeJson2Result] = {
        type: `prose`,
        json: resolveWidgetBridgeJson2Result2.json,
        ydoc: resolveWidgetBridgeJson2Result2.ydoc,
      };
    }
  }
  return {
    ...file,
    nodes: nodes,
  };
}

function resolveWidgetBridgeCode3(
  file?: Dynamic,
  file2?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nodes: Dynamic = {
    ...file.nodes,
  };
  for (let [resolveWidgetBridgeCode3Result, error] of context as Dynamic) {
    if (file.nodes[resolveWidgetBridgeCode3Result] !== undefined) continue;
    let nodeItem: Dynamic = file2?.nodes[resolveWidgetBridgeCode3Result];
    if (
      nodeItem &&
      nodeItem.type === `widget` &&
      nodeItem.code === error.code &&
      (nodeItem.draft != null) === error.draftPresent &&
      (nodeItem.gone === true) == (error.gone === true) &&
      (nodeItem.stalled === true) == (error.stalled === true) &&
      nodeItem.stallGen === error.stallGen &&
      nodeItem.pub === error.pub
    ) {
      nodes[resolveWidgetBridgeCode3Result] = nodeItem;
    } else {
      nodes[resolveWidgetBridgeCode3Result] = {
        type: `widget`,
        code: error.code,
        ...(error.pub === undefined
          ? {}
          : {
              pub: error.pub,
            }),
        ...(error.draftPresent
          ? {
              draft: {
                code: null,
                baseV: {
                  code: null,
                },
              },
            }
          : {}),
        ...(error.gone
          ? {
              gone: true,
            }
          : {}),
        ...(error.stalled
          ? {
              stalled: true,
              stallGen: error.stallGen,
            }
          : {}),
      };
    }
  }
  return {
    ...file,
    nodes: nodes,
  };
}

var resolveWidgetBridgeTest: Dynamic;

function loadWidgetBridgeEnsure(..._extraArguments: unknown[]): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let lookup3: Dynamic = new (Map as Dynamic)();
  return {
    ensure: (
      widgetBridgeEnsure?: Dynamic,
      options?: Dynamic,
      context: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let lookupEntry: Dynamic = lookup2.get(widgetBridgeEnsure);
      if (!context.force) {
        let lookupEntry2: Dynamic = lookup.get(widgetBridgeEnsure);
        if (lookupEntry2) return Promise.resolve(lookupEntry2);
        if (lookupEntry) return lookupEntry.p;
      } else if (lookupEntry?.forced) return lookupEntry.p;
      let total: Dynamic = (lookup3.get(widgetBridgeEnsure) ?? 0) + 1;
      lookup3.set(widgetBridgeEnsure, total);
      let loadWidgetBridgeEnsureResult: Dynamic = (async (
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        try {
          let options2: Dynamic = await options();
          if (options2.pending)
            return {
              token: options2.token,
              grants: new (Set as Dynamic)(options2.grants),
              pending: true,
            };
          let record: Dynamic = {
            token: options2.token,
            grants: new (Set as Dynamic)(options2.grants),
          };
          if (
            lookup3.get(widgetBridgeEnsure) === total &&
            (context.live?.() ?? true)
          ) {
            lookup.set(widgetBridgeEnsure, record);
          }
          return record;
        } catch {
          return null;
        }
      })();
      loadWidgetBridgeEnsureResult.finally(
        (..._extraArguments: unknown[]): undefined => {
          if (
            lookup2.get(widgetBridgeEnsure)?.p === loadWidgetBridgeEnsureResult
          ) {
            lookup2.delete(widgetBridgeEnsure);
          }
        },
      );
      lookup2.set(widgetBridgeEnsure, {
        p: loadWidgetBridgeEnsureResult,
        forced: context.force === true,
      });
      return loadWidgetBridgeEnsureResult;
    },
    granted: (widgetBridgeEnsure?: Dynamic, ..._extraArguments: unknown[]) => {
      for (let loadWidgetBridgeEnsureResult of lookup.values() as Dynamic)
        if (loadWidgetBridgeEnsureResult.grants.has(widgetBridgeEnsure))
          return true;
      return false;
    },
    clear: (..._extraArguments: unknown[]): undefined => {
      lookup.clear();
      lookup2.clear();
      lookup3.clear();
    },
  };
}

function resolveWidgetBridgeEntries(
  widgetBridgeEntries?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {};
  if (!widgetBridgeEntries) return record;
  for (let [
    resolveWidgetBridgeEntriesResult,
    resolveWidgetBridgeEntriesResult2,
  ] of Object.entries(widgetBridgeEntries) as Dynamic)
    if (
      platformSessionAndSourcesPattern9.test(resolveWidgetBridgeEntriesResult)
    ) {
      record[resolveWidgetBridgeEntriesResult] =
        resolveWidgetBridgeEntriesResult2;
    }
  return record;
}

function resolveWidgetBridgeEntries2(
  widgetBridgeEntries2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  if (!widgetBridgeEntries2) return uniqueItems;
  for (let [
    resolveWidgetBridgeEntries2Result,
    resolveWidgetBridgeEntries2Result2,
  ] of Object.entries(widgetBridgeEntries2) as Dynamic)
    if (
      resolveWidgetBridgeEntries2Result2?.type === `widget` &&
      platformSessionAndSourcesPattern9.test(resolveWidgetBridgeEntries2Result)
    ) {
      uniqueItems.add(resolveWidgetBridgeEntries2Result);
    }
  return uniqueItems;
}

function updateWidgetBridgeTop(
  updateWidgetBridge?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(updateWidgetBridge)) return [];
  let lookup: Dynamic = new (Map as Dynamic)();
  let items: Dynamic = [];
  for (let updateWidgetBridgeTopResult of updateWidgetBridge as Dynamic) {
    if (
      !updateWidgetBridgeTopResult ||
      typeof updateWidgetBridgeTopResult != `object` ||
      typeof updateWidgetBridgeTopResult.id != `string` ||
      !options(updateWidgetBridgeTopResult.id)
    )
      continue;
    let {
      top: top,
      left: left,
      width: width,
      height: height,
    }: Dynamic = updateWidgetBridgeTopResult;
    if (
      typeof top != `number` ||
      !Number.isFinite(top) ||
      typeof left != `number` ||
      !Number.isFinite(left) ||
      typeof width != `number` ||
      !Number.isFinite(width) ||
      typeof height != `number` ||
      !Number.isFinite(height)
    )
      continue;
    let lookupEntry: Dynamic = lookup.get(updateWidgetBridgeTopResult.id) ?? 0;
    lookup.set(updateWidgetBridgeTopResult.id, lookupEntry + 1);
    if (updateWidgetBridgeTopResult.state === `stale`) {
      items.push({
        key: `${updateWidgetBridgeTopResult.id}#${lookupEntry}`,
        id: updateWidgetBridgeTopResult.id,
        top: top,
        left: left,
        width: width,
        height: height,
      });
    }
  }
  return items;
}

function resolveWidgetBridgeRule(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    error.rule +
    (error.line === undefined
      ? ``
      : ` at ` + error.line + `:` + (error.col ?? 0)) +
    ` — ` +
    error.message +
    (error.fix ? ` — fix: ` + error.fix.slice(0, 200) : ``)
  );
}

function updateWidgetBridgeRef(
  updateWidgetBridgeRef2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let event of updateWidgetBridgeRef2 as Dynamic) {
    if (event.resolved || event.deleted) continue;
    let pin: Dynamic = event.target?.pin;
    let origin: Dynamic = pin?.origin;
    let resolved: Dynamic = pin?.resolved;
    let range: Dynamic = origin?.range;
    if (!pin || !origin || !range || resolved?.object !== `blob`) continue;
    let node: Dynamic = pin.node || event.target?.pageId || ``;
    if (!node) continue;
    let label = `blob/${resolved.id}`;
    let path: Dynamic = origin.path.join(`.`);
    let lookupEntry: Dynamic = lookup.get(node);
    if (lookupEntry === undefined) {
      lookup.set(node, (lookupEntry = new (Map as Dynamic)()));
    }
    let label2 = `${label}\u0000${path}\u0000${range[0]}-${range[1]}`;
    let lookupEntryEntry: Dynamic = lookupEntry.get(label2);
    if (lookupEntryEntry) {
      lookupEntryEntry.ids.push(event.id);
    } else {
      lookupEntry.set(label2, {
        ref: label,
        path: path,
        range: [range[0], range[1]],
        exact: origin.quote.exact,
        ids: [event.id],
      });
    }
  }
  return Object.fromEntries(
    [...lookup].map(
      ([item, item2]: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        item,
        [...item2.values()],
      ],
    ),
  );
}

var widgetBridgeLimit10002: number;

function resolveWidgetBridgeLabel(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let exact: Dynamic = event.target?.pin?.origin?.quote?.exact;
  if (typeof exact != `string`) return;
  let {
    label: resolveWidgetBridgeLabelResult,
    cut: resolveWidgetBridgeLabelResult2,
  }: Dynamic = resolvePlatformImagesAndBlobsLabel(exact);
  if (resolveWidgetBridgeLabelResult !== ``)
    return resolveWidgetBridgeLabelResult2
      ? `${Array.from<Dynamic>(resolveWidgetBridgeLabelResult).slice(0, -1).join(``).trimEnd()}…`
      : resolveWidgetBridgeLabelResult;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeWidgetBridgeWidgetSampleCardStep1(): void {
  (widgetBridgeLimit10000 = 1e4);
  (widgetBridgeLimit1000 = 1e3);
  (widgetBridgeLimit0_5 = 0.5);
  (widgetBridgeLimit2 = 2);
  (isWidgetBridgeValue = (
    widgetBridgeValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let index = 0;
    for (let isWidgetBridgeValueResult in widgetBridgeValue) {
      if (!(isWidgetBridgeValueResult in options)) return false;
      index++;
    }
    for (let isWidgetBridgeValueResult in options) index--;
    return index === 0;
  });
  (WidgetBridgeHost = class {
    [key: string]: Dynamic;
    host: Dynamic;
    constructor(widgetBridgeHost: Dynamic = {}, ..._extraArguments: unknown[]) {
      this.host = widgetBridgeHost;
    }
    layoutY: Dynamic = null;
    y: Dynamic = null;
    held: Dynamic = 0;
    last: Dynamic = null;
    els: Dynamic = new (Set as Dynamic)();
    deferrable: Dynamic = true;
    register(widgetBridgeHost?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      this.els.add(widgetBridgeHost);
      this.paint(widgetBridgeHost);
      return (..._extraArguments: unknown[]): undefined => {
        this.els.delete(widgetBridgeHost);
        widgetBridgeHost.style.transform = ``;
        delete widgetBridgeHost.dataset.railY;
      };
    }
    scroll(widgetBridgeHost?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (!(!Number.isFinite(widgetBridgeHost) || widgetBridgeHost < 0)) {
        if (widgetBridgeHost !== this.y) {
          this.y = widgetBridgeHost;
          this.paintAll();
        }
      }
    }
    classify(widgetBridgeHost?: Dynamic, ..._extraArguments: unknown[]) {
      return this.held > 0 ||
        !this.deferrable ||
        !isWidgetBridgeWidgetTops(this.last, widgetBridgeHost)
        ? `apply`
        : `defer`;
    }
    applied(
      widgetBridgeHost?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.last = widgetBridgeHost;
      this.layoutY = Number.isFinite(widgetBridgeHost.scrollY)
        ? widgetBridgeHost.scrollY
        : this.layoutY;
      if (this.y === null) {
        this.y = this.layoutY;
      }
      if (this.held > 0) {
        this.held--;
      }
      this.paintAll();
    }
    predict(
      widgetBridgeHost?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(!Number.isFinite(widgetBridgeHost) || widgetBridgeHost === 0)) {
        if (this.layoutY !== null) {
          this.layoutY += widgetBridgeHost;
        }
        if (this.y !== null) {
          this.y = Math.max(0, this.y + widgetBridgeHost);
        }
        this.last = null;
        this.host.dropPending?.();
        this.paintAll();
      }
    }
    hold(..._extraArguments: unknown[]): undefined {
      this.held = widgetBridgeLimit2;
      this.last = null;
      this.host.dropPending?.();
      this.paintAll();
    }
    holding(..._extraArguments: unknown[]) {
      return this.held > 0;
    }
    reset(..._extraArguments: unknown[]): undefined {
      this.layoutY = null;
      this.y = null;
      this.held = 0;
      this.last = null;
      this.host.dropPending?.();
      this.paintAll();
    }
    flush(..._extraArguments: unknown[]): undefined {
      this.host.flushPending?.();
    }
    docY(..._extraArguments: unknown[]): Dynamic {
      return this.y;
    }
    offset(..._extraArguments: unknown[]): number {
      return this.held > 0 || this.layoutY === null || this.y === null
        ? 0
        : this.layoutY - this.y;
    }
    drawnY(..._extraArguments: unknown[]): null | number {
      return this.layoutY === null ? null : this.layoutY - this.offset();
    }
    paint(widgetBridgeHost?: Dynamic, ..._extraArguments: unknown[]): undefined {
      widgetBridgeHost.style.transform = `translateY(${this.offset()}px)`;
      let drawnY: Dynamic = this.drawnY();
      if (drawnY === null) {
        delete widgetBridgeHost.dataset.railY;
      } else {
        widgetBridgeHost.dataset.railY = String(Math.round(drawnY));
      }
    }
    paintAll(..._extraArguments: unknown[]): undefined {
      for (let widgetBridgeHostResult of this.els as Dynamic)
        this.paint(widgetBridgeHostResult);
    }
  });
  (widgetBridgeLimit20000 = 2e4);
  (resolveWidgetBridgeIsFinite = (
    widgetBridgeIsFinite?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof widgetBridgeIsFinite == `number` &&
    Number.isFinite(widgetBridgeIsFinite));
  (WidgetBridgeNonce = class {
    [key: string]: Dynamic;
    pinned: Dynamic;
    y: Dynamic = null;
    at: Dynamic = null;
    laid: Dynamic = null;
    els: Dynamic = new (Set as Dynamic)();
    constructor(
      widgetBridgeNonce: Dynamic = (..._extraArguments: unknown[]) => false,
      ..._extraArguments: unknown[]
    ) {
      this.pinned = widgetBridgeNonce;
    }
    register(
      widgetBridgeNonce?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.els.add(widgetBridgeNonce);
      this.paint(widgetBridgeNonce);
      return (..._extraArguments: unknown[]): undefined => {
        this.els.delete(widgetBridgeNonce);
        widgetBridgeNonce.style.transform = ``;
        delete widgetBridgeNonce.dataset.askDy;
      };
    }
    scroll(
      widgetBridgeNonce?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          !resolveWidgetBridgeIsFinite(widgetBridgeNonce) ||
          widgetBridgeNonce < 0 ||
          widgetBridgeNonce === this.y
        )
      ) {
        this.y = widgetBridgeNonce;
        this.paintAll();
      }
    }
    measured(
      widgetBridgeNonce?: Dynamic,
      top?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !resolveWidgetBridgeIsFinite(widgetBridgeNonce) ||
        !resolveWidgetBridgeIsFinite(top)
      )
        return;
      let context2: Dynamic =
        resolveWidgetBridgeIsFinite(context) && context >= 0 ? context : null;
      if (
        !(
          context2 === null &&
          this.laid !== null &&
          this.laid.nonce !== widgetBridgeNonce
        )
      ) {
        this.at = {
          nonce: widgetBridgeNonce,
          top: top,
          y: context2,
        };
        this.paintAll();
      }
    }
    unmeasured(..._extraArguments: unknown[]): undefined {
      if (this.at !== null) {
        this.at = null;
        this.paintAll();
      }
    }
    drawn(
      widgetBridgeNonce?: Dynamic,
      top?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.laid =
        resolveWidgetBridgeIsFinite(widgetBridgeNonce) &&
        resolveWidgetBridgeIsFinite(top)
          ? {
              nonce: widgetBridgeNonce,
              top: top,
            }
          : null;
      this.paintAll();
    }
    reset(..._extraArguments: unknown[]): undefined {
      this.y = null;
      this.at = null;
      this.paintAll();
    }
    offset(..._extraArguments: unknown[]) {
      let { at: widgetBridgeNonce, laid: top, y: context }: Dynamic = this;
      if (
        !widgetBridgeNonce ||
        !top ||
        widgetBridgeNonce.nonce !== top.nonce ||
        widgetBridgeNonce.y === null ||
        context === null ||
        this.pinned()
      )
        return 0;
      let context2: number =
        widgetBridgeNonce.top + (widgetBridgeNonce.y - context) - top.top;
      return Number.isFinite(context2)
        ? Math.max(-2e4, Math.min(widgetBridgeLimit20000, context2))
        : 0;
    }
    paint(widgetBridgeNonce?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let top = this.offset();
      let context = top === 0 ? `` : `translateY(` + top + `px)`;
      if (widgetBridgeNonce.style.transform !== context) {
        widgetBridgeNonce.style.transform = context;
        if (top === 0) {
          delete widgetBridgeNonce.dataset.askDy;
        } else {
          widgetBridgeNonce.dataset.askDy = String(Math.round(top));
        }
      }
    }
    paintAll(..._extraArguments: unknown[]): undefined {
      for (let widgetBridgeNonceResult of this.els as Dynamic)
        this.paint(widgetBridgeNonceResult);
    }
  });
  (WidgetBridgeHour = {
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`,
    hourCycle: `h23`,
  });
  (widgetBridgeInstance = new (Intl.DateTimeFormat as Dynamic)(
    undefined,
    WidgetBridgeHour,
  ));
  (widgetBridgeMap = new (Map as Dynamic)());
  (updateWidgetBridgeTimeZone = (
    updateWidgetBridgeTimeZone2?: Dynamic,
    timeZone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!updateWidgetBridgeTimeZone2 && !timeZone) return widgetBridgeInstance;
    let label = `${updateWidgetBridgeTimeZone2 ?? ``}|${timeZone ?? ``}`;
    let widgetBridgeMapEntry: Dynamic = widgetBridgeMap.get(label);
    if (!widgetBridgeMapEntry) {
      widgetBridgeMapEntry = new (Intl.DateTimeFormat as Dynamic)(
        updateWidgetBridgeTimeZone2,
        {
          ...WidgetBridgeHour,
          timeZone: timeZone,
        },
      );
      widgetBridgeMap.set(label, widgetBridgeMapEntry);
    }
    return widgetBridgeMapEntry;
  });
  (resolveWidgetBridgeValue3 = (
    widgetBridgeValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => resolvePlatformSessionAndSourcesNode(widgetBridgeValue3));
  (WidgetBridgeCode = Object.freeze({
    code: ``,
    draftPresent: false,
    gone: true,
  }));
  (widgetBridgeLimit0 = 0);
  (resolveWidgetBridgeCode = (..._extraArguments: unknown[]) =>
    Object.freeze({
      code: ``,
      draftPresent: false,
      stalled: true,
      stallGen: ++widgetBridgeLimit0,
    }));
  (resolveWidgetBridgeCode2 = (
    widgetBridgeCode2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let widgetBridgeCode22: Dynamic = widgetBridgeCode2;
    if (
      !(
        !widgetBridgeCode22 ||
        typeof widgetBridgeCode22 != `object` ||
        typeof widgetBridgeCode22.code != `string`
      )
    )
      return {
        code: widgetBridgeCode22.code,
        draftPresent: widgetBridgeCode22.draft != null,
        ...(typeof widgetBridgeCode22.pub == `number`
          ? {
              pub: widgetBridgeCode22.pub,
            }
          : {}),
      };
  });
  (resolveWidgetBridgeValue4 = (
    widgetBridgeValue4?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${widgetBridgeValue4 ?? options ?? ``}#${context}`);
  (updateWidgetBridgeDelete = (
    updateWidgetBridgeDelete2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (dependencies === undefined) {
      updateWidgetBridgeDelete2.delete(context);
    } else {
      if (options.has(context)) {
        updateWidgetBridgeDelete2.set(context, dependencies);
      }
    }
  });
  (resolveWidgetBridgeJson = (
    widgetBridgeJson?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let widgetBridgeJson2: Dynamic = widgetBridgeJson;
    if (
      !(
        !widgetBridgeJson2 ||
        typeof widgetBridgeJson2 != `object` ||
        typeof widgetBridgeJson2.ydoc != `string`
      ) &&
      !(!widgetBridgeJson2.doc || typeof widgetBridgeJson2.doc != `object`)
    )
      return {
        json: widgetBridgeJson2.doc,
        ydoc: widgetBridgeJson2.ydoc,
      };
  });
  (resolveWidgetBridgeTest = (
    widgetBridgeTest?: unknown,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof widgetBridgeTest == `string`
      ? options
        ? platformSessionAndSourcesPattern9.test(widgetBridgeTest) &&
          context.has(widgetBridgeTest)
          ? widgetBridgeTest
          : ``
        : widgetBridgeTest
      : ``);
  (widgetBridgeLimit10002 = 1e3);
}

export { WidgetBridgeCode, WidgetBridgeHost, WidgetBridgeNonce, installWidgetBridgeResume, isWidgetBridgeLastDocPos, isWidgetBridgeWhere, loadWidgetBridgeEnsure, resolveWidgetBridgeClickX, resolveWidgetBridgeCode, resolveWidgetBridgeCode2, resolveWidgetBridgeCode3, resolveWidgetBridgeEntries, resolveWidgetBridgeEntries2, resolveWidgetBridgeFlatMap, resolveWidgetBridgeJson, resolveWidgetBridgeJson2, resolveWidgetBridgeLabel, resolveWidgetBridgeLineY, resolveWidgetBridgeRailH, resolveWidgetBridgeRailH2, resolveWidgetBridgeRule, resolveWidgetBridgeSlack, resolveWidgetBridgeTarget, resolveWidgetBridgeTest, resolveWidgetBridgeValue, resolveWidgetBridgeValue2, resolveWidgetBridgeValue3, resolveWidgetBridgeValue4, updateWidgetBridgeDelete, updateWidgetBridgeRef, updateWidgetBridgeTop, useWidgetBridgeCurrent, useWidgetBridgeStickPx, widgetBridgeLimit1000, widgetBridgeLimit10000, widgetBridgeLimit10002, widgetBridgeLimit20000 };

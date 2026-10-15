/** BaoCut: connection and errors from index-CX4IZqzA.js. */
import type { ErrorDetails } from "../../interop/recovered-contracts";
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  CommentsStoreBigQuery,
  CommentsStoreHealth,
  EditorHostStyles12,
  ObservabilityBrowserAndOperationEventsHref,
  PlatformApiAndAuthUser,
  PlatformSyncAndRoutingAssign,
  PlatformSyncAndRoutingPrompt,
  Tooltip,
  TooltipGroup,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  _setToastApi,
  emitTelemetryEvent,
  liveSupportCode,
  loadPlatformApiAndAuthFiles,
  loadPlatformSyncAndRoutingClipboard,
  loadReactDom,
  originalJsxsProps,
  preloadModule,
  resolveCommentsStoreReauthDismiss,
  resolveCommentsStoreValue24,
  resolveDataModelSchemasUnknown,
  resolveObservabilityTelemetryJoin,
  resolveObservabilityTelemetryKind2,
  resolveObservabilityTelemetryMsgKind,
  resolveObservabilityTelemetrySlice2,
  resolveObservabilityTelemetryThrown,
  resolvePlatformChunkLoadingDescription2,
  resolvePlatformChunkLoadingStale,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingFeBuild,
  resolvePlatformSyncAndRoutingOrigins,
  useCommentsStoreUseSyncExternalStore,
  useToast,
  watchToastStack,
  weather,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";

function ConnectorAuthenticationDialog(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let connectorAuthenticationDialogResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let error: Dynamic = CommentsStoreHealth(
    (
      connectorAuthenticationDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorAuthenticationDialog.authPrompt,
  );
  let connectorAuthenticationDialogResult2: Dynamic = CommentsStoreHealth(
    (
      connectorAuthenticationDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorAuthenticationDialog.dismissPrompt,
  );
  let connectorAuthenticationDialogResult3: Dynamic = CommentsStoreHealth(
    (
      connectorAuthenticationDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorAuthenticationDialog.clearPrompt,
  );
  let connectorAuthenticationDialogResult4: Dynamic = CommentsStoreHealth(
    (
      connectorAuthenticationDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorAuthenticationDialog.reconnect,
  );
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setDisabled(false);
    },
    [error],
  );
  if (!error) return null;
  let slug: Dynamic = error.slug;
  let slug2: Dynamic = (slug && CommentsStoreBigQuery[slug]) || error.name;
  let connectorAuthenticationDialogResult5 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolveCommentsStoreReauthDismiss(error.slug ?? `_`).catch(
      (..._extraArguments: unknown[]): undefined => {},
    );
    connectorAuthenticationDialogResult2();
  };
  let getState = async (..._extraArguments: unknown[]): Promise<undefined> => {
    let error2: Dynamic = error;
    setDisabled(true);
    try {
      if (slug) {
        if (
          (await connectorAuthenticationDialogResult4(slug)) &&
          CommentsStoreHealth.getState().authPrompt === error2
        ) {
          connectorAuthenticationDialogResult3();
        }
      } else {
        window.open(`https://claude.ai/customize/connectors`, `_blank`);
        if (CommentsStoreHealth.getState().authPrompt === error2) {
          connectorAuthenticationDialogResult3();
        }
      }
    } finally {
      if (CommentsStoreHealth.getState().authPrompt === error2) {
        setDisabled(false);
      }
    }
  };
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        connectorAuthenticationDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        !connectorAuthenticationDialog && connectorAuthenticationDialogResult5()
      }
    >
      <UiDialogsRoot.Popup
        size={`sm`}
        data-testid={`connector-reconnect-modal`}
      >
        <div className={`mb-2 flex items-center gap-2`}>
          <UiOverlaysAndIconsCustomIcon
            name={`Connectors`}
            customSize={18}
            className={`text-secondary`}
          />
          <UiDialogsRoot.Title
            className={`text-primary flex-1 text-[15px] leading-[var(--cds-leading-title)] font-semibold`}
          >
            {`Reconnect `}
            {slug2}
          </UiDialogsRoot.Title>
          <UiDialogsRoot.Close
            render={
              <button
                type={`button`}
                aria-label={`Close`}
                className={`text-secondary hover:text-primary cursor-pointer p-1`}
              >
                <UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />
              </button>
            }
          />
        </div>
        <UiDialogsRoot.Description
          className={`text-secondary mb-4 text-xs leading-relaxed`}
        >
          {`Your `}
          {slug2}
          {` connection has expired, so the last request couldn't run. Reconnect to continue — it opens in a new window.`}
        </UiDialogsRoot.Description>
        <div className={`flex items-center justify-end gap-2`}>
          <UiDialogsRoot.Close
            render={
              <button
                type={`button`}
                className={`text-secondary hover:text-primary h-8 cursor-pointer rounded px-3 text-[12px] font-medium`}
              >{`Not now`}</button>
            }
          />
          <Button
            variant={`brand`}
            size={connectorAuthenticationDialogResult(`sm`)}
            disabled={disabled}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void getState()
            }
            data-testid={`connector-reconnect-cta`}
          >
            {disabled ? `Waiting…` : `Reconnect ${slug2}`}
          </Button>
        </div>
        <div
          className={`text-muted mt-3 text-[11px]`}
          data-testid={`connector-reconnect-code`}
        >
          {error.code}
        </div>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}

function SupportCodeCopyButton(
  { code: code }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let supportCodeCopyButtonResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`idle`);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let codePartsSliceText: Dynamic = code.split(`-`).slice(0, 3).join(`-`);
  let addRange = async (
    supportCodeCopyButton?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (
      await loadPlatformSyncAndRoutingClipboard(
        code,
        undefined,
        supportCodeCopyButton,
      )
    ) {
      setLabelState(`copied`);
      return;
    }
    let element: Dynamic = elementRef.current;
    let selection: Dynamic = element?.ownerDocument.getSelection();
    if (element && selection) {
      let range: Dynamic = element.ownerDocument.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setLabelState(`manual`);
  };
  return (
    <span className={`gap-xs flex items-center`} data-testid={`support-code`}>
      <span className={`text-footnote`}>
        {`Support code:`}
        {` `}
        <code
          ref={elementRef}
          className={`text-code select-text`}
          data-testid={`support-code-value`}
          title={code}
        >
          {labelState === `manual` ? code : codePartsSliceText}
        </code>
      </span>
      <Button
        variant={`ghost`}
        size={supportCodeCopyButtonResult(`sm`)}
        data-testid={`support-code-copy`}
        onClick={(event?: Dynamic, ..._extraArguments: unknown[]): undefined =>
          void addRange(event.currentTarget)
        }
      >
        {labelState === `copied`
          ? `Copied`
          : labelState === `manual`
            ? `Press ⌘C`
            : `Copy`}
      </Button>
    </span>
  );
}

var EMPTY_ERROR_ORIGINS: Dynamic;

function extractErrorDetails(
  extractErrorDetails2?: unknown,
  ..._extraArguments: unknown[]
): ErrorDetails {
  let record = {
    isError: false,
    message: ``,
    stack: ``,
    text: ``,
  };
  try {
    record.isError = extractErrorDetails2 instanceof Error;
    let extractErrorDetails3:
      | { message?: unknown; stack?: unknown }
      | undefined = (
      typeof extractErrorDetails2 == `object` && extractErrorDetails2
        ? extractErrorDetails2
        : undefined
    ) as { message?: unknown; stack?: unknown } | undefined;
    if (typeof extractErrorDetails3?.message == `string`) {
      record.message = extractErrorDetails3.message;
    }
    if (typeof extractErrorDetails3?.stack == `string`) {
      record.stack = extractErrorDetails3.stack;
    }
    record.text = String(extractErrorDetails2);
  } catch {}
  return record;
}

function createErrorEnvironmentProbe(
  errorEnvironmentProbe?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let tierAtCatch = (..._extraArguments: unknown[]) => {
    try {
      let matches: Dynamic =
        errorEnvironmentProbe().matchMedia(EditorHostStyles12).matches;
      return matches === true ? `p` : matches === false ? `w` : undefined;
    } catch {
      return;
    }
  };
  let tierAtCatch2 = tierAtCatch();
  return {
    tierAtBoot: (..._extraArguments: unknown[]) => tierAtCatch2,
    tierAtCatch: tierAtCatch,
    sightAtCatch: (..._extraArguments: unknown[]) => {
      try {
        let visibilityState: Dynamic = options().visibilityState;
        return typeof visibilityState == `string`
          ? visibilityState === `hidden`
            ? `h`
            : `v`
          : undefined;
      } catch {
        return;
      }
    },
  };
}

var routeErrorReporter: Dynamic;

var RouteErrorBoundary: Dynamic;

function RouteErrorFallback(
  { message: message, stack: stack, internal: internal }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let internal2: Dynamic = useCommentsStoreUseSyncExternalStore() || internal;
  let code: Dynamic = liveSupportCode();
  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-4 p-8 text-center`}
      role={`alert`}
      data-testid={
        internal2 ? `error-boundary-internal` : `error-boundary-external`
      }
    >
      <UiOverlaysAndIconsCustomIcon
        name={`Warning`}
        size={`xxl`}
        className={`text-warning`}
      />
      <div>
        <div
          className={`text-primary font-medium`}
        >{`Something went wrong loading this page.`}</div>
        {internal2 ? (
          <div className={`text-muted mt-1 max-w-md text-sm`}>{message}</div>
        ) : null}
      </div>
      <SupportCodeCopyButton code={code} />
      {internal2 ? (
        <pre
          className={`bg-alpha-2 text-muted max-h-40 max-w-2xl overflow-auto rounded p-3 text-left text-[11px]`}
          data-testid={`error-boundary-stack`}
        >
          {stack}
        </pre>
      ) : null}
      <div className={`flex gap-2`}>
        <button
          type={`button`}
          onClick={(..._extraArguments: unknown[]) => location.reload()}
          className={`bg-fill-primary hover:bg-fill-primary-hover text-on-primary flex items-center gap-1.5 rounded px-3 py-1.5 text-sm`}
        >
          <UiOverlaysAndIconsCustomIcon
            name={`ArrowClockwise`}
            customSize={14}
          />
          {` Refresh`}
        </button>
        {internal2 ? (
          <button
            type={`button`}
            onClick={(..._extraArguments: unknown[]) =>
              navigator.clipboard.writeText(stack)
            }
            className={`border-strong hover:bg-alpha-2 flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm`}
          >
            <UiOverlaysAndIconsCustomIcon name={`Copy`} customSize={14} />
            {` Copy stack`}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ConnectorPermissionDialog(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let connectorPermissionDialogResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let connectorPermissionDialogResult2: Dynamic = PlatformSyncAndRoutingPrompt(
    (
      connectorPermissionDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorPermissionDialog.prompt,
  );
  let connectorPermissionDialogResult3: Dynamic = PlatformSyncAndRoutingPrompt(
    (
      connectorPermissionDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorPermissionDialog.decide,
  );
  let connectorPermissionDialogResult4: Dynamic = CommentsStoreHealth(
    (
      connectorPermissionDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorPermissionDialog.health,
  );
  let connectorPermissionDialogResult5: Dynamic = CommentsStoreHealth(
    (
      connectorPermissionDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorPermissionDialog.load,
  );
  let connectorPermissionDialogResult6: Dynamic = CommentsStoreHealth(
    (
      connectorPermissionDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => connectorPermissionDialog.reconnect,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (connectorPermissionDialogResult2?.uses.length) {
        connectorPermissionDialogResult5(connectorPermissionDialogResult2.uses);
      }
    },
    [connectorPermissionDialogResult2, connectorPermissionDialogResult5],
  );
  if (!connectorPermissionDialogResult2) return null;
  let replace: Dynamic = connectorPermissionDialogResult2.owner.replace(
    /@.*/,
    ``,
  );
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        connectorPermissionDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        !connectorPermissionDialog && connectorPermissionDialogResult3(`cancel`)
      }
    >
      <UiDialogsRoot.Popup size={`md`}>
        <div className={`mb-3 flex items-start`}>
          <div className={`flex-1`}>
            <UiDialogsRoot.Title className={`text-primary`}>
              {`Run `}
              <code className={`text-[13px]`}>
                {connectorPermissionDialogResult2.agentId}
              </code>
              {`?`}
            </UiDialogsRoot.Title>
            <UiDialogsRoot.Description className={`text-secondary text-[11px]`}>
              {`This routine belongs to `}
              <b>{replace}</b>
              {`. Running it will use `}
              <b>{`your`}</b>
              {` `}
              {`connectors.`}
            </UiDialogsRoot.Description>
          </div>
          <UiDialogsRoot.Close
            render={
              <button
                type={`button`}
                className={`text-secondary hover:text-primary p-1`}
              >
                <UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />
              </button>
            }
          />
        </div>
        <div className={`border-strong rounded border px-2 py-1.5`}>
          <div
            className={`text-muted text-[10px] font-semibold tracking-[0.6px] uppercase`}
          >{`Uses`}</div>
          {connectorPermissionDialogResult2.uses.length === 0 ? (
            <div
              className={`text-secondary py-1 text-[11px]`}
            >{`none observed yet — first run may use connectors`}</div>
          ) : (
            connectorPermissionDialogResult2.uses.map(
              (use?: Dynamic, ..._extraArguments: unknown[]) => {
                let matchesConnected =
                  connectorPermissionDialogResult4[use]?.connected === true;
                return (
                  <div
                    {...originalJsxsProps(
                      {
                        className: `flex items-center gap-2 py-1 text-[12px]`,
                        children: [
                          <UiOverlaysAndIconsCustomIcon
                            name={`Connectors`}
                            size={`xs`}
                            className={`text-secondary shrink-0`}
                          />,
                          <span className={`text-primary flex-1`}>
                            {CommentsStoreBigQuery[use] ?? use}
                          </span>,
                          matchesConnected ? (
                            <span
                              className={`text-success flex items-center gap-1 text-[10px]`}
                            >
                              <UiOverlaysAndIconsCustomIcon
                                name={`CheckCircleFilled`}
                                customSize={11}
                              />
                              {` connected`}
                            </span>
                          ) : (
                            <Button
                              size={connectorPermissionDialogResult(`xs`)}
                              variant={`secondary`}
                              onClick={(
                                ..._extraArguments: unknown[]
                              ): undefined =>
                                void connectorPermissionDialogResult6(use)
                              }
                            >{`Connect`}</Button>
                          ),
                        ],
                      },
                      use,
                    )}
                  />
                );
              },
            )
          )}
        </div>
        <div className={`mt-4 flex justify-end gap-2`}>
          <Button
            size={connectorPermissionDialogResult(`xs`)}
            variant={`secondary`}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              connectorPermissionDialogResult3(`cancel`)
            }
          >{`Cancel`}</Button>
          <Button
            size={connectorPermissionDialogResult(`xs`)}
            variant={`secondary`}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              connectorPermissionDialogResult3(`allow`)
            }
          >{`Allow`}</Button>
        </div>
        <div
          className={`text-muted mt-2 text-[10px]`}
        >{`You won't be asked again for this routine.`}</div>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}

function AccessDeniedPage(
  accessDeniedPage?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let accessDeniedPageResult: Dynamic = PlatformApiAndAuthUser(
    (accessDeniedPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      accessDeniedPage2.user?.email,
  );
  if (accessDeniedPage.denied && accessDeniedPage.name)
    return (
      <div
        data-testid={`access-denied`}
        className={`bg-surface-0 flex h-full flex-col items-center justify-center gap-3 px-6`}
      >
        <div
          className={`text-primary text-lg font-medium`}
        >{`You don’t have access to this project`}</div>
        <div
          className={`text-muted max-w-md text-center text-sm`}
        >{`"${accessDeniedPage.name}" hasn’t been shared with you (or doesn’t exist). Ask the person who sent you the link to add you.`}</div>
        {accessDeniedPageResult && (
          <div className={`text-muted text-xs`}>
            {`Signed in as `}
            <span className={`text-secondary font-medium`}>
              {accessDeniedPageResult}
            </span>
          </div>
        )}
        <ObservabilityBrowserAndOperationEventsHref
          href={`/`}
          className={`bg-fill-primary hover:bg-fill-primary-hover text-on-primary mt-2 rounded-md px-4 py-1.5 text-sm`}
        >{`Back to home`}</ObservabilityBrowserAndOperationEventsHref>
        {false}
      </div>
    );
  let label = accessDeniedPage.name
    ? accessDeniedPage.missing
      ? `It doesn’t exist — it may have been deleted, or the link may be wrong.`
      : `Something went wrong loading it. Try again in a moment.`
    : `The page you’re looking for doesn’t exist.`;
  return (
    <div
      className={`bg-surface-0 flex h-full flex-col items-center justify-center gap-3 px-6`}
    >
      <div className={`text-primary text-lg font-medium`}>
        {accessDeniedPage.name
          ? `Can’t open ${accessDeniedPage.name}`
          : `Page not found`}
      </div>
      <div className={`text-muted max-w-md text-center text-sm`}>{label}</div>
      <ObservabilityBrowserAndOperationEventsHref
        href={`/`}
        className={`bg-fill-primary hover:bg-fill-primary-hover text-on-primary mt-2 rounded-md px-4 py-1.5 text-sm`}
      >{`Back to home`}</ObservabilityBrowserAndOperationEventsHref>
      {false}
    </div>
  );
}

function MarkdownViewerUnavailable(
  markdownViewerUnavailable?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`text-muted p-4 text-xs`}
      data-testid={`peek-markdown-unavailable`}
    >{`Couldn’t load the markdown viewer — refresh to try again.`}</div>
  );
}

var LazyMarkdownRenderer: Dynamic;

function FilePeekDialog(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let {
    target: filePeekDialogResult,
    open: filePeekDialogResult2,
    close: onClick,
  }: Dynamic = PlatformSyncAndRoutingAssign();
  let [files, setFiles]: Dynamic = (0, React.useState)([]);
  let match: Dynamic = filePeekDialogResult?.path.match(
    /^((projects|skills|users)\/[^/]+)(?:\/versions\/([^/]+))?\/(.+)$/,
  );
  let matchItem: Dynamic = match?.[1] ?? ``;
  let matchesMatchItem = match?.[2] === `users`;
  let matchItem2: Dynamic = match?.[3] ?? `main`;
  let active: Dynamic = match?.[4] ?? ``;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (matchItem && !matchesMatchItem) {
        loadPlatformApiAndAuthFiles(matchItem, matchItem2).then(
          setFiles,
          (..._extraArguments: unknown[]): Dynamic => setFiles([]),
        );
      } else {
        setFiles([]);
      }
    },
    [matchItem, matchesMatchItem, matchItem2],
  );
  if (!filePeekDialogResult) return null;
  let pop: Dynamic = filePeekDialogResult.path.split(`.`).pop() ?? ``;
  return (
    <div
      className={`bg-backdrop fixed inset-0 z-50 flex items-center justify-center`}
      onClick={onClick}
      data-testid={`peek-modal`}
    >
      <div
        className={`bg-surface-popover flex h-[85vh] w-[min(1280px,94vw)] flex-col rounded-lg shadow-xl`}
        onClick={(
          filePeekDialog?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => filePeekDialog.stopPropagation()}
      >
        <div className={`flex items-center gap-2 border-b px-3 py-2 text-xs`}>
          <span className={`text-secondary flex-1 truncate font-mono`}>
            {matchItem}
            {`/`}
            {active}
          </span>
          <TooltipGroup>
            <Tooltip content={`Open`}>
              <button
                type={`button`}
                onClick={(..._extraArguments: unknown[]): undefined => {
                  onClick();
                  if (match) {
                    window.open(
                      `/${matchItem}?path=${encodeURIComponent(active)}${matchesMatchItem ? `` : `&target=${matchItem2}`}`,
                      `_blank`,
                      `noopener`,
                    );
                  }
                }}
                aria-label={`Open`}
                className={`text-secondary hover:text-primary cursor-pointer p-1`}
              >
                <UiOverlaysAndIconsCustomIcon
                  name={`ArrowOutSquare`}
                  customSize={14}
                />
              </button>
            </Tooltip>
            <Tooltip content={`Close`}>
              <button
                type={`button`}
                data-testid={`peek-modal-close`}
                onClick={onClick}
                aria-label={`Close`}
                className={`text-secondary hover:text-primary cursor-pointer p-1`}
              >
                <UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />
              </button>
            </Tooltip>
          </TooltipGroup>
        </div>
        <div className={`flex min-h-0 flex-1`}>
          <aside className={`w-52 shrink-0 overflow-y-auto border-r p-1.5`}>
            <PeekFileTree
              files={files}
              active={active}
              onOpen={(
                filePeekDialog?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                filePeekDialogResult2(
                  matchesMatchItem
                    ? `${matchItem}/${filePeekDialog}`
                    : `${matchItem}/versions/${matchItem2}/${filePeekDialog}`,
                )
              }
            />
          </aside>
          <div className={`flex-1 overflow-auto`}>
            {pop === `md` ? (
              <React.Suspense
                fallback={
                  <div className={`text-muted p-4 text-xs`}>{`Loading…`}</div>
                }
              >
                <LazyMarkdownRenderer
                  path={filePeekDialogResult.path}
                  selection={filePeekDialogResult.hash}
                />
              </React.Suspense>
            ) : (
              <div className={`text-secondary p-4 text-xs`}>
                {`Preview not available for .`}
                {pop}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PeekFileTree(peekFileTree?: Dynamic, ..._extraArguments: unknown[]) {
  let items: Dynamic = [];
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let peekFileTreeResult of peekFileTree.files as Dynamic) {
    let peekFileTreeResultIndex: Dynamic = peekFileTreeResult.indexOf(`/`);
    if (peekFileTreeResultIndex < 0) {
      items.push(peekFileTreeResult);
    } else {
      (
        lookup.get(peekFileTreeResult.slice(0, peekFileTreeResultIndex)) ??
        lookup
          .set(peekFileTreeResult.slice(0, peekFileTreeResultIndex), [])
          .get(peekFileTreeResult.slice(0, peekFileTreeResultIndex))
      ).push(peekFileTreeResult);
    }
  }
  let split: Dynamic = (
    peekFileTree2?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ) => (
    <div
      {...originalJsxsProps(
        {
          onClick: (..._extraArguments: unknown[]): Dynamic =>
            peekFileTree.onOpen(peekFileTree2),
          className: `flex cursor-pointer items-center gap-1.5 rounded py-[3px] pr-2 text-[11px] ${options ? `pl-5` : `pl-2`} ${peekFileTree.active === peekFileTree2 ? `bg-alpha-2 text-primary` : `text-primary`}`,
          children: [
            <UiOverlaysAndIconsCustomIcon
              name={`File`}
              size={`xs`}
              className={`text-muted`}
            />,
            <span className={`flex-1 truncate`}>
              {peekFileTree2.split(`/`).pop()}
            </span>,
          ],
        },
        peekFileTree2,
      )}
    />
  );
  return (
    <jsxRuntime.Fragment>
      {items.map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => split(item),
      )}
      {[...lookup].map(
        ([item, item2]: Dynamic, ..._extraArguments: unknown[]) => (
          <details
            {...originalJsxsProps(
              {
                open: peekFileTree.active.startsWith(`${item}/`),
                children: [
                  <summary
                    className={`text-primary flex cursor-pointer items-center gap-1.5 rounded py-[3px] pr-2 pl-2 text-[11px]`}
                  >
                    <UiOverlaysAndIconsCustomIcon
                      name={`Folder`}
                      size={`xs`}
                      className={`text-muted`}
                    />
                    <span className={`flex-1 truncate`}>{item}</span>
                  </summary>,
                  item2.map(
                    (item3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      split(item3, true),
                  ),
                ],
              },
              item,
            )}
          />
        ),
      )}
    </jsxRuntime.Fragment>
  );
}

function DocumentContextMenuInstaller(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let { add: add, close: close }: Dynamic = useToast();
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      _setToastApi({
        add: add,
        close: close,
      }),
      (..._extraArguments: unknown[]) => _setToastApi(null)
    ),
    [add, close],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => watchToastStack(document),
    [],
  );
  return null;
}

var ReactDom: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeConnectionAndErrorsConnectorPermissionDialogStep1(): void {
  (EMPTY_ERROR_ORIGINS = {
    origins: [],
  });
  (routeErrorReporter = {
    bundleDir: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformSyncAndRoutingOrigins().dir,
    ...createErrorEnvironmentProbe(
      (..._extraArguments: unknown[]) => window,
      (..._extraArguments: unknown[]) => document,
    ),
    report(
      routeErrorReporter2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = {},
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        let enabled = false;
        try {
          enabled = resolvePlatformLoadingAndStatusName(routeErrorReporter2);
        } catch {}
        if (enabled)
          resolvePlatformChunkLoadingStale(
            emitTelemetryEvent,
            undefined,
            routeErrorReporter2,
          );
        else {
          let cls: string = `unknown`;
          try {
            cls = resolveDataModelSchemasUnknown(routeErrorReporter2);
          } catch {}
          let component: Dynamic = context.component ?? `route`;
          let record: Dynamic = {
            ...resolveObservabilityTelemetryKind2(routeErrorReporter2, cls),
            ...resolveObservabilityTelemetryMsgKind(routeErrorReporter2, cls),
            ...(cls === `unknown`
              ? resolveObservabilityTelemetryThrown(
                  routeErrorReporter2,
                  cls,
                  undefined,
                  EMPTY_ERROR_ORIGINS,
                )
              : {}),
          };
          if (record.msgKind !== undefined) {
            let routeErrorReporterResult: Dynamic;
            try {
              routeErrorReporterResult = resolveObservabilityTelemetrySlice2(
                options,
                routeErrorReporter.bundleDir(),
              );
            } catch {}
            let items: Dynamic = [];
            try {
              items = [
                routeErrorReporter.tierAtBoot(),
                routeErrorReporter.tierAtCatch(),
                routeErrorReporter.sightAtCatch(),
              ];
            } catch {}
            record.msgKind = resolveObservabilityTelemetryJoin(
              record.msgKind,
              routeErrorReporterResult,
              items,
            );
          }
          emitTelemetryEvent({
            name: `pages.render_error`,
            key: [component, cls, record.msgKind, record.thrown]
              .filter(
                (item?: Dynamic, ..._extraArguments: unknown[]) =>
                  item !== undefined,
              )
              .join(`:`),
            fields: {
              cls: cls,
              component: component,
              road: `host`,
              ...record,
            },
          });
        }
      } catch {}
      let extractErrorDetails2 = extractErrorDetails(routeErrorReporter2);
      let message = extractErrorDetails2.isError
        ? extractErrorDetails2.message
        : extractErrorDetails2.text;
      let stack = extractErrorDetails2.isError ? extractErrorDetails2.stack : ``;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { logError: logError2 }: Dynamic = await import(
            "../../platform/index"
          ).then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.PlatformApiAndAuthLogError,
          );
          return {
            logError: logError2,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { logError: logError2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            logError2({
              source: `boundary`,
              message: message,
              detail: stack
                .split(
                  `
`,
                )
                .slice(0, 5).join(`
`),
            }),
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { reportBoundaryError: reportBoundaryError }: Dynamic =
            await import("../../platform/index").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.ObservabilityTelemetrySENTRYDSNSERVER,
            );
          return {
            reportBoundaryError: reportBoundaryError,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { reportBoundaryError: reportBoundaryError }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => reportBoundaryError(routeErrorReporter2, context),
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
    },
  });
  (RouteErrorBoundary = class extends React.Component {
    [key: string]: Dynamic;
    state: Dynamic = {
      caught: false,
      message: ``,
      stack: ``,
      internal: false,
    };
    static getDerivedStateFromError(
      routeErrorBoundary?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let extractErrorDetails2 = extractErrorDetails(routeErrorBoundary);
      return {
        caught: true,
        message: extractErrorDetails2.message,
        stack: extractErrorDetails2.stack || extractErrorDetails2.text,
        internal: resolveCommentsStoreValue24(),
        pid: resolvePlatformSyncAndRoutingFeBuild().pid,
      };
    }
    pidAtCatch(..._extraArguments: unknown[]): Dynamic {
      let routeErrorBoundary: Dynamic =
        typeof this.props.resetKey == `string` ? this.props.resetKey : ``;
      let extractErrorDetails2 =
        /^\/project\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:[@/]|$)/i.exec(
          routeErrorBoundary,
        );
      return extractErrorDetails2
        ? extractErrorDetails2[1].toLowerCase()
        : this.state.pid;
    }
    static getDerivedStateFromProps(
      routeErrorBoundary?: Dynamic,
      extractErrorDetails2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return routeErrorBoundary.resetKey === extractErrorDetails2.lastResetKey
        ? null
        : {
            lastResetKey: routeErrorBoundary.resetKey,
            caught: false,
            message: ``,
            stack: ``,
            internal: false,
            pid: undefined,
          };
    }
    componentDidCatch(
      routeErrorBoundary?: Dynamic,
      extractErrorDetails2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let componentStack: Dynamic =
        typeof extractErrorDetails2.componentStack == `string`
          ? extractErrorDetails2.componentStack
          : ``;
      let extractErrorDetails3 = extractErrorDetails(routeErrorBoundary);
      this.setState({
        stack: `${extractErrorDetails3.stack || extractErrorDetails3.text}\n${componentStack}`,
      });
      try {
        routeErrorReporter.report(routeErrorBoundary, componentStack, {
          pid: this.pidAtCatch(),
          component: this.props.component,
        });
      } catch {}
    }
    render(..._extraArguments: unknown[]): Dynamic {
      let {
        caught: routeErrorBoundary,
        message: extractErrorDetails2,
        stack: componentStack,
        internal: extractErrorDetails3,
      }: Dynamic = this.state;
      return routeErrorBoundary ? (
        this.props.fallback === undefined ? (
          <RouteErrorFallback
            message={extractErrorDetails2}
            stack={componentStack}
            internal={extractErrorDetails3}
          />
        ) : (
          this.props.fallback
        )
      ) : (
        this.props.children
      );
    }
  });
  (LazyMarkdownRenderer = (0, React.lazy)(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../markdown/renderer").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.MarkdownRenderer,
            }),
          ),
        mapPreloadDependencies([4, 1, 0, 2, 3, 5, 6, 7, 8, 9, 10]),
        import.meta.url,
      ).catch((error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!resolvePlatformLoadingAndStatusName(error)) throw error;
        resolvePlatformChunkLoadingDescription2(error);
        return {
          default: MarkdownViewerUnavailable,
        };
      }),
  ));
  (ReactDom = weather(loadReactDom(), 1));
}

export {
  AccessDeniedPage,
  ConnectorAuthenticationDialog,
  ConnectorPermissionDialog,
  DocumentContextMenuInstaller,
  FilePeekDialog,
  ReactDom,
  RouteErrorBoundary,
  SupportCodeCopyButton,
  extractErrorDetails,
};

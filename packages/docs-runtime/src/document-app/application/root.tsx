/** BaoCut: application root from index-CX4IZqzA.js. */
import { createRoot } from "../dependencies";
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  CommentsStoreClaude,
  Debug,
  DebugOverlay,
  EditorSelectionAndTablesPrefs,
  EditorSelectionAndTablesState2,
  HiddenScreenshotter,
  PlatformApiAndAuthBONGOBASE,
  PlatformApiAndAuthUser,
  PlatformSyncAndRoutingSystem,
  ResolveObservabilityBrowserAndOperationEventsLocationComponent,
  ResolveObservabilityBrowserAndOperationEventsPathComponent,
  ResolvePlatformApiAndAuthHrefComponent,
  ResolvePlatformSyncAndRoutingValue12Component,
  ResolvePlatformSyncAndRoutingValue13Component,
  ToastProvider,
  UiProviderAndLayersDensity,
  UseObservabilityBrowserAndOperationEventsValueComponent,
  api,
  clearPlatformApiAndAuthDelete,
  clearPlatformApiAndAuthDelete2,
  clearPlatformSyncAndRoutingDispose,
  emitTelemetryEvent,
  frameBootContainer,
  getLazySchemaStats,
  installFrameClaudeActivity,
  installFrameFetchTripwire,
  installFrameHostChromeWitness,
  installFrameHostViewport,
  installFrameHot,
  installPlatformChunkLoadingAddEventListener2,
  installPlatformLoadingAndStatusVisible,
  installPlatformSyncAndRoutingOrigins,
  isFrameArtifact,
  loadPlatformLiveDocumentAndHistorySheet,
  loadPlatformSyncAndRoutingLevel,
  memoryLocation,
  onFrameShellLog,
  preloadModule,
  recordFramePhase,
  resolveCommentsStoreWhat2,
  resolveDataContentAndReferencesKind2,
  resolveDataModelSchemasValue4,
  resolveDataModelSchemasValue5,
  resolveEditorExtensionsPlatform,
  resolveObservabilityBootComplete2,
  resolveObservabilityBrowserAndOperationEventsKey,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthPathOverride,
  resolvePlatformApiAndAuthState5,
  resolvePlatformChunkLoadingDescription2,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformSessionAndSourcesValue2,
  resolvePlatformSyncAndRoutingContext,
  resolvePlatformSyncAndRoutingEmit2,
  resolvePlatformSyncAndRoutingFramed,
  resolvePlatformSyncAndRoutingMeta,
  resolvePlatformSyncAndRoutingValue10,
  useActivity,
  useChatStore,
  useCommentsStoreUseSyncExternalStore,
  usePlatformSyncAndRoutingNavigate,
  usePlatformSyncAndRoutingSystem,
} from "../dependencies";
import {
  PHONE_TOAST_POSITION_CLASS,
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  AccessDeniedPage,
  ConnectorAuthenticationDialog,
  ConnectorPermissionDialog,
  DocumentContextMenuInstaller,
  FilePeekDialog,
  RouteErrorBoundary,
} from "../connection-and-errors/connector-permission-dialog";
import {
  ExportProgressDialog,
} from "../phone-overlays/export-progress-dialog";
import {
  DebugReportDialog,
} from "../document-recovery";
import {
  ConnectionPage,
  SignInRequiredPage,
} from "../connection-pages";
import {
  RoomViewEmbedPage,
} from "../session-navigation/room-view-embed-page";
import { TranscriptDebugPage, FilmedMountDebugPage, HeroDesignPage, FeedbackDesignPage, CodePaneDebugPage } from "./debug-pages";

function UseApplicationRootModeComponent(
  { mode: mode, children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <UiProviderAndLayersDensity
      mode={mode}
      density={
        resolvePlatformSyncAndRoutingValue10() ? `comfortable` : `compact`
      }
      className={`contents`}
    >
      {children}
    </UiProviderAndLayersDensity>
  );
}

function useApplicationRootMode2(
  { mode: mode, children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <UseApplicationRootModeComponent mode={mode}>
      {children}
    </UseApplicationRootModeComponent>
  );
}

var ApplicationRootDefault3: Dynamic;

var ApplicationRootDefault4: Dynamic;

var ApplicationRootDefault5: Dynamic;

var ApplicationRootDefault6: Dynamic;

var ApplicationRootDefault7: Dynamic;

var ApplicationRootDefault8: Dynamic;

var ApplicationRootDefault9: Dynamic;

var ApplicationRootDefault10: Dynamic;

var ApplicationRootDefault11: Dynamic;

var ApplicationRootDefault12: Dynamic;

var ApplicationRootDefault13: Dynamic;

function useApplicationRootReplace(..._extraArguments: unknown[]) {
  let useApplicationRootReplaceResult: Dynamic = PlatformApiAndAuthUser(
    (
      applicationRootReplace?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => applicationRootReplace.user?.email,
  );
  if (!useApplicationRootReplaceResult) return null;
  let useApplicationRootReplaceResult2: Dynamic =
    resolvePlatformSessionAndSourcesValue2(useApplicationRootReplaceResult);
  return useApplicationRootReplaceResult2 ? (
    <ResolvePlatformApiAndAuthHrefComponent
      to={`/users/${useApplicationRootReplaceResult2}${location.search}${location.hash}`}
      replace={true}
    />
  ) : null;
}

function FrameEntryUnlinked(..._extraArguments: unknown[]) {
  let frameEntryUnlinkedResult: Dynamic = frameBootContainer();
  return frameEntryUnlinkedResult ? (
    <ResolvePlatformApiAndAuthHrefComponent
      to={resolveDataContentAndReferencesKind2(frameEntryUnlinkedResult)}
      replace={true}
    />
  ) : (
    <div
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`frame-entry-unlinked`}
    >
      <div
        className={`text-primary text-body font-medium`}
      >{`This artifact isn’t linked to a document yet`}</div>
      <div
        className={`text-secondary text-footnote max-w-md text-center`}
      >{`It was published without a document address. Re-create the artifact, or open the document in Claude Docs.`}</div>
    </div>
  );
}

function ApplicationRoot(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    recordFramePhase(`app`);
    CommentsStoreClaude.getState().load();
    PlatformApiAndAuthUser.getState().load();
    EditorSelectionAndTablesPrefs.getState().load();
  }, []);
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    resolveCommentsStoreWhat2({
      onLaneLog: (
        applicationRoot?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        onFrameShellLog(
          (
            applicationRoot2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            applicationRoot(applicationRoot2);
            let applicationRootResult4: Dynamic =
              resolveObservabilityBrowserAndOperationEventsKey(
                applicationRoot2,
              );
            if (applicationRootResult4 !== null) {
              emitTelemetryEvent(applicationRootResult4);
            }
            resolvePlatformSyncAndRoutingEmit2(applicationRoot2);
          },
        ),
      onMuxState: clearPlatformApiAndAuthDelete2,
      onMuxRow: clearPlatformApiAndAuthDelete,
      muxStats: resolvePlatformApiAndAuthState5,
    });
  }, []);
  useActivity();
  usePlatformSyncAndRoutingNavigate();
  let mode: Dynamic = usePlatformSyncAndRoutingSystem();
  let applicationRootResult: Dynamic = useCommentsStoreUseSyncExternalStore();
  let enabled = !isFrameArtifact();
  let enabled2: Dynamic = enabled && applicationRootResult;
  let [resetKey, setResetKey]: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue48();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          let path: Dynamic = resolvePlatformApiAndAuthPathOverride();
          let matchItemSlice = /^\/(projects|skills|users)\/[^/]+/
            .exec(path)?.[0]
            ?.slice(1);
          api.event({
            kind: `page_visited`,
            container: matchItemSlice ?? ``,
            path: path,
          });
        },
        1500,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [resetKey],
  );
  let startsWith: Dynamic =
    resetKey.startsWith(`/design`) ||
    resetKey.startsWith(`/debug`) ||
    resetKey.startsWith(`/sessions`) ||
    resetKey === `/auth/done` ||
    isFrameArtifact();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!startsWith) return useChatStore.getState().connect();
    },
    [startsWith],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      resolveDataModelSchemasValue4(
        ({ file: file }: Dynamic, ..._extraArguments: unknown[]): undefined => {
          throw Error(
            `navigate("${file}") with no handler — link has no project context. Pass herePath to handleClaudeHref or ensure Workspace registered setNavHandler.`,
          );
        },
      );
      resolveDataModelSchemasValue5(setResetKey);
    },
    [setResetKey],
  );
  let applicationRootResult2: Dynamic = CommentsStoreClaude(
    (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      response.status,
  );
  let applicationRootResult3: Dynamic = CommentsStoreClaude(
    (applicationRoot?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      applicationRoot.claude,
  );
  if (enabled && resetKey.startsWith(`/design/hero`))
    return (
      <React.Suspense fallback={null}>
        <HeroDesignPage />
      </React.Suspense>
    );
  if (enabled && resetKey.startsWith(`/design/feedback`))
    return (
      <React.Suspense fallback={null}>
        <FeedbackDesignPage />
      </React.Suspense>
    );
  if (resetKey === `/auth/done`)
    return (
      <UiProviderAndLayersDensity mode={mode} className={`contents`}>
        <SignInRequiredPage />
      </UiProviderAndLayersDensity>
    );
  {
    let match =
      /^\/manifest\/replay(?:\/([^/?]+)(?:\/([^/?]+))?)?\/?(?:\?.*)?$/.exec(
        resetKey,
      );
    if (match) {
      let decodeURIComponent2: Dynamic = (
        applicationRoot?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (applicationRoot !== undefined)
          try {
            return decodeURIComponent(applicationRoot);
          } catch {
            return applicationRoot;
          }
      };
      return (
        <UiProviderAndLayersDensity mode={mode} className={`contents`}>
          <div className={`flex h-screen flex-col`}>
            <React.Suspense fallback={null}>
              <ApplicationRootDefault9
                suite={decodeURIComponent2(match[1])}
                spec={decodeURIComponent2(match[2])}
              />
            </React.Suspense>
          </div>
        </UiProviderAndLayersDensity>
      );
    }
  }
  if (applicationRootResult2 === `idle` || applicationRootResult2 === `loading`)
    return null;
  if (!applicationRootResult3?.connected)
    return (
      <UiProviderAndLayersDensity mode={mode} className={`contents`}>
        <ConnectionPage />
      </UiProviderAndLayersDensity>
    );
  let jsxs = (
    <ToastProvider viewportClassName={PHONE_TOAST_POSITION_CLASS}>
      <DocumentContextMenuInstaller />
      <div className={`flex h-screen flex-col`}>
        <ResolvePlatformSyncAndRoutingValue13Component />
        <ResolvePlatformSyncAndRoutingValue12Component />
        <div className={`flex min-h-0 flex-1`}>
          <div className={`min-w-0 flex-1 overflow-y-auto`}>
            <RouteErrorBoundary resetKey={resetKey} key={resetKey.split(`/`)[1] || `/`}>{<React.Suspense fallback={null}>
                      <ResolveObservabilityBrowserAndOperationEventsLocationComponent>
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent
                          path={`/`}
                          component={isFrameArtifact() ? FrameEntryUnlinked : ApplicationRootDefault4}
                        />
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/project/:pid`} component={RoomViewEmbedPage} />
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/project/:pid/file/:fileId`} component={RoomViewEmbedPage} />
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/project/:pid/routine/:rid`} component={RoomViewEmbedPage} />
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/runs/:id?`} component={ApplicationRootDefault7} />}
                        {enabled2 && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/debug/suites`} component={ApplicationRootDefault13} />}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/suite/:sid/run/:rid`} component={ApplicationRootDefault8} />}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/sessions/:id?`} component={ApplicationRootDefault10} />}
                        {enabled2 && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/debug/code-pane`}>
                            <React.Suspense fallback={null}>
                              <CodePaneDebugPage />
                            </React.Suspense>
                          </ResolveObservabilityBrowserAndOperationEventsPathComponent>}
                        {enabled2 && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/debug/transcript-fold`}>
                            <React.Suspense fallback={null}>
                              <TranscriptDebugPage />
                            </React.Suspense>
                          </ResolveObservabilityBrowserAndOperationEventsPathComponent>}
                        {enabled2 && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/debug/filmed-mount`}>
                            <React.Suspense fallback={null}>
                              <FilmedMountDebugPage />
                            </React.Suspense>
                          </ResolveObservabilityBrowserAndOperationEventsPathComponent>}
                        {enabled2 && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/debug/:id?`} component={Debug} />}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/actions/:id?`} component={ApplicationRootDefault12} />}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/settings`} component={ApplicationRootDefault11} />}
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/projects/*`}>
                          {(applicationRoot?: Dynamic, ..._extraArguments: unknown[]) => <ApplicationRootDefault6 key={`projects/${(applicationRoot[`*`] ?? ``).split(`/`)[0]}`} />}
                        </ResolveObservabilityBrowserAndOperationEventsPathComponent>
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/skills/*?`}>
                            {(applicationRoot?: Dynamic, ..._extraArguments: unknown[]) => <ApplicationRootDefault5 key={`skills/${(applicationRoot[`*`] ?? ``).split(`/`)[0]}`} />}
                          </ResolveObservabilityBrowserAndOperationEventsPathComponent>}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/users/*`}>
                            {(applicationRoot?: Dynamic, ..._extraArguments: unknown[]) => <ApplicationRootDefault5 key={`users/${(applicationRoot[`*`] ?? ``).split(`/`)[0]}`} />}
                          </ResolveObservabilityBrowserAndOperationEventsPathComponent>}
                        {enabled && <ResolveObservabilityBrowserAndOperationEventsPathComponent path={`/me`} component={useApplicationRootReplace} />}
                        <ResolveObservabilityBrowserAndOperationEventsPathComponent>
                          <AccessDeniedPage />
                        </ResolveObservabilityBrowserAndOperationEventsPathComponent>
                      </ResolveObservabilityBrowserAndOperationEventsLocationComponent>
                    </React.Suspense>}</RouteErrorBoundary>
          </div>
        </div>
      </div>
      <HiddenScreenshotter />
      {false}
      <DebugReportDialog />
      {applicationRootResult && <DebugOverlay />}
      <FilePeekDialog />
      <ConnectorAuthenticationDialog />
      <ExportProgressDialog />
      <ConnectorPermissionDialog />
    </ToastProvider>
  );
  return (
    <UiProviderAndLayersDensity mode={mode} className={`contents`}>
      {isFrameArtifact() ? (
        <UseApplicationRootModeComponent mode={mode}>
          {jsxs}
        </UseApplicationRootModeComponent>
      ) : (
        <React.Suspense fallback={null}>
          <ApplicationRootDefault3 mode={mode}>{jsxs}</ApplicationRootDefault3>
        </React.Suspense>
      )}
    </UiProviderAndLayersDensity>
  );
}

var ApplicationRootState: Dynamic;

var ApplicationRootPath: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeApplicationRootStep1(): void {
  (ApplicationRootDefault3 = (0, React.lazy)(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.ironScopeModule,
          ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ).catch((error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!resolvePlatformLoadingAndStatusName(error)) throw error;
        resolvePlatformChunkLoadingDescription2(error);
        return {
          default: useApplicationRootMode2,
        };
      }),
  ));
  (ApplicationRootDefault4 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.Home,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault5 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.Workspace,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault6 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../navigation/projects-route-gate").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.ProjectsRouteGate,
            }),
          ),
        mapPreloadDependencies([48, 1, 0, 2, 3, 10]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault7 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.Runs,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault8 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.SuiteRun,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault9 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.ManifestReplay,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault10 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.Sessions,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault11 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.Settings,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault12 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.ActionsPage,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault13 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.unavailablePagesModule,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.SuiteRunsHome,
              }),
            ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootState = getLazySchemaStats());
  recordFramePhase(`entry`, {
    schemasAtEntry: ApplicationRootState.built,
    schemaMsAtEntry: ApplicationRootState.buildMs,
  });
  resolveObservabilityBootComplete2();
  loadPlatformSyncAndRoutingLevel();
  resolvePlatformSyncAndRoutingContext();
  installPlatformSyncAndRoutingOrigins();
  installPlatformChunkLoadingAddEventListener2(window);
  installPlatformLoadingAndStatusVisible({
    win: window,
    vis: clearPlatformSyncAndRoutingDispose(document, {
      setTimeout: (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => setTimeout(callback, options),
      clearTimeout: (callback?: Dynamic, ..._extraArguments: unknown[]) =>
        clearTimeout(callback),
    }),
    now: (..._extraArguments: unknown[]) => Date.now(),
  });
  if (isFrameArtifact()) {
    installFrameFetchTripwire();
  }
  if (isFrameArtifact()) {
    installFrameHostViewport();
  }
  if (isFrameArtifact()) {
    installFrameHostChromeWitness();
  }
  if (isFrameArtifact()) {
    installFrameClaudeActivity();
  }
  if (isFrameArtifact()) {
    installFrameHot();
  }
  (ApplicationRootPath = isFrameArtifact()
    ? memoryLocation({
        path: `/`,
      })
    : null);
  resolveEditorExtensionsPlatform({
    now: (..._extraArguments: unknown[]) => new Date().toISOString(),
    locale: undefined,
    timeZone: undefined,
    mintId: (..._extraArguments: unknown[]) =>
      Math.random().toString(36).slice(2, 10),
    schedule: (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(callback, options),
    cancel: (callback?: Dynamic, ..._extraArguments: unknown[]) =>
      clearTimeout(callback),
  });
  preloadModule(
    (..._extraArguments: unknown[]): Dynamic =>
      import("../../platform/index")
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformApiAndAuthMUTATORS,
        )
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result.ensureDraftLayer(),
        ),
    mapPreloadDependencies([0, 1, 2, 3]),
    import.meta.url,
  ).catch((..._extraArguments: unknown[]): undefined => {});
  if (!isFrameArtifact()) {
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../platform/lazy").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.ironScopeModule,
        ),
      mapPreloadDependencies([10, 1, 2, 0, 3]),
      import.meta.url,
    ).catch((..._extraArguments: unknown[]): undefined => {});
  }
  document.body.classList.add(`cds-root`);
  document.body.dataset.density = `comfortable`;
  document.body.dataset.platform = `web`;
  loadPlatformLiveDocumentAndHistorySheet();
  {
    let element = document.createElement(`style`);
    element.dataset.hostPrint = ``;
    element.textContent = EditorSelectionAndTablesState2;
    document.head.appendChild(element);
  }
  resolvePlatformSyncAndRoutingMeta(
    resolvePlatformSyncAndRoutingFramed(
      PlatformSyncAndRoutingSystem.getState().value,
    ),
  );
  createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
    {ApplicationRootPath ? (
        <UseObservabilityBrowserAndOperationEventsValueComponent
          hook={ApplicationRootPath.hook}
        >
        <ApplicationRoot />
      </UseObservabilityBrowserAndOperationEventsValueComponent>
      ) : (
        <UseObservabilityBrowserAndOperationEventsValueComponent
          base={PlatformApiAndAuthBONGOBASE}
        >
        <ApplicationRoot />
      </UseObservabilityBrowserAndOperationEventsValueComponent>
      )}
  </React.StrictMode>,
  );
}

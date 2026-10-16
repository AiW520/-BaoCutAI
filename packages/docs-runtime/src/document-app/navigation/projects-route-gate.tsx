/** projects-route-gate: restored from ProjectsRouteGate-B778uiNW.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { toModuleNamespace } from "../../boot/module-runtime";
import {
  loadJsxRuntime,
  loadReact,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveObservabilityBrowserAndOperationEventsUseContext2,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthStartsWith,
  resolvePlatformApiAndAuthValue,
  resolvePlatformSessionAndSourcesValue19,
  UiOverlaysAndIconsCustomIcon,
  useContainerStore,
} from "../../platform/index";
import { Workspace } from "../../platform/lazy";
import type * as ReactComponentTypes from "react";

export const ProjectsRouteGate: ReactComponentTypes.FC<
  Readonly<Record<string, unknown>>
> = () => {
  let routeProject: Dynamic =
    (resolveObservabilityBrowserAndOperationEventsUseContext2()[`*`] ?? ``).split(
      `/`,
    )[0] ?? ``;
  let isCanonicalId: Dynamic = FULL_UUID_PATTERN.test(routeProject);
  let [, navigate]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  let [showProjectsRoute, setShowProjectsRoute]: Dynamic = (0, React.useState)(
    !isCanonicalId,
  );
  let [previousRouteProject, setPreviousRouteProject]: Dynamic = (0, React.useState)(
    routeProject,
  );
  if (previousRouteProject !== routeProject) {
    setPreviousRouteProject(routeProject);
    setShowProjectsRoute(!isCanonicalId);
  }
  let projectDestination: Dynamic = (
    projectId?: Dynamic,
    ..._extraArguments: unknown[]
  ): string => {
    let query: Dynamic = new (URLSearchParams as Dynamic)(location.search);
    let path: Dynamic = query.get(`path`);
    let isFileId: Dynamic = path !== null && SHORT_UUID_PATTERN.test(path);
    let forwardedQuery: Dynamic = new (URLSearchParams as Dynamic)();
    if (path && !isFileId) {
      forwardedQuery.set(`path`, path);
    }
    if (query.get(`chrome`) === `embed`) {
      forwardedQuery.set(`chrome`, `embed`);
    }
    let queryString: Dynamic = forwardedQuery.toString();
    let projectContainer: Dynamic = {
      kind: `project`,
      id: projectId,
    };
    return (
      (isFileId
        ? resolveDataContentAndReferencesKind({
            container: projectContainer,
            ref: {
              noun: `file`,
              id: path,
            },
          })
        : resolveDataContentAndReferencesKind2(projectContainer)) +
      (queryString ? `?${queryString}` : ``)
    );
  };
  let legacyProjectId: Dynamic = useContainerStore(
    (projectsRouteGate?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      !isCanonicalId &&
      projectsRouteGate.project?.roomBorn === true &&
      projectsRouteGate.project.name === `projects/${routeProject}`
        ? projectsRouteGate.project.id
        : undefined,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (legacyProjectId === undefined) return;
      let pathParts: Dynamic = resolvePlatformApiAndAuthStartsWith(
        location.pathname,
      ).split(`/`);
      let projectPart: Dynamic = pathParts[2] ?? ``;
      try {
        projectPart = decodeURI(projectPart);
      } catch {}
      if (!(pathParts[1]?.toLowerCase() !== `projects` || projectPart !== routeProject)) {
        navigate(projectDestination(legacyProjectId), {
          replace: true,
        });
      }
    },
    [legacyProjectId, routeProject, navigate],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      setShowProjectsRoute(!isCanonicalId);
      if (!isCanonicalId) return;
      let cancelled: boolean = false;
      let canonicalId: Dynamic = routeProject.toLowerCase();
      let redirectToProject = (..._extraArguments: unknown[]): undefined => {
        let pathParts: Dynamic = resolvePlatformApiAndAuthStartsWith(
          location.pathname,
        ).split(`/`);
        let projectPart: Dynamic = pathParts[2] ?? ``;
        try {
          projectPart = decodeURI(projectPart);
        } catch {}
        if (
          !(pathParts[1]?.toLowerCase() !== `projects` || projectPart !== routeProject)
        ) {
          navigate(projectDestination(canonicalId), {
            replace: true,
          });
        }
      };
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        for (let index: number = 0; index < 3; index++) {
          if (index > 0) {
            let PROJECTGATERETRYMSItem: Dynamic =
              PROJECT_GATE_RETRY_MS[index - 1] ??
              PROJECT_GATE_RETRY_MS[PROJECT_GATE_RETRY_MS.length - 1];
            await new (Promise as Dynamic)(
              (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                setTimeout(resolve, PROJECTGATERETRYMSItem),
            );
            if (cancelled) return;
          }
          try {
            let response: Dynamic = await fetch(
              resolvePlatformApiAndAuthValue(
                resolvePlatformSessionAndSourcesValue19(canonicalId),
              ),
              {
                signal: AbortSignal.timeout(4e3),
              },
            );
            response.body?.cancel();
            if (cancelled) return;
            if (response.ok) {
              redirectToProject();
              return;
            }
            if (response.status === 404) {
              setShowProjectsRoute(true);
              return;
            }
            if (response.status === 401) {
              redirectToProject();
              return;
            }
          } catch {
            if (cancelled) return;
          }
        }
        if (!cancelled) {
          redirectToProject();
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        cancelled = true;
      };
    },
    [isCanonicalId, routeProject, navigate],
  );
  return showProjectsRoute ? (
    <Workspace />
  ) : (
    <div className={`text-muted flex h-full flex-col items-center justify-center`}>
      <UiOverlaysAndIconsCustomIcon
        name={`Spinner`}
        size={`md`}
        bold={true}
        className={`animate-spin`}
      />
    </div>
  );
};

var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var FULL_UUID_PATTERN: Dynamic =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var SHORT_UUID_PATTERN: Dynamic = /^[0-9a-f]{8}-[0-9a-f]{4}$/;
var PROJECT_GATE_RETRY_MS: Dynamic = [250, 750];

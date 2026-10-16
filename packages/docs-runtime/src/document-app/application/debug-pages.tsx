import type { ComponentType } from "react";
import { mapPreloadDependencies } from "../bootstrap";
import { preloadModule, resolvePlatformChunkLoadingLazy } from "../dependencies";
interface DebugPageModule {
  default: ComponentType;
  TranscriptFoldDebug: ComponentType;
  FilmedMountDebug: ComponentType;
}
function loadDebugPages(): Promise<DebugPageModule | undefined> {
  return preloadModule(
    () =>
      import("../../platform/index").then(
        (module): DebugPageModule => module.PlatformSyncAndRoutingActionsPage,
      ),
    mapPreloadDependencies([0, 1, 2, 3]),
    import.meta.url,
  );
}
export let HeroDesignPage: ComponentType;
export let FeedbackDesignPage: ComponentType;
export let TranscriptDebugPage: ComponentType;
export let CodePaneDebugPage: ComponentType;
export let FilmedMountDebugPage: ComponentType;

/** Keep lazy component creation in the recovered application initialization order. */
export function initializeApplicationDebugPages(): void {
  HeroDesignPage = resolvePlatformChunkLoadingLazy(loadDebugPages);
  FeedbackDesignPage = resolvePlatformChunkLoadingLazy(loadDebugPages);
  TranscriptDebugPage = resolvePlatformChunkLoadingLazy(() =>
    loadDebugPages().then((module) => selectDebugPage(module, "TranscriptFoldDebug")),
  );
  CodePaneDebugPage = resolvePlatformChunkLoadingLazy(loadDebugPages);
  FilmedMountDebugPage = resolvePlatformChunkLoadingLazy(() =>
    loadDebugPages().then((module) => selectDebugPage(module, "FilmedMountDebug")),
  );
}
function selectDebugPage(
  pages: DebugPageModule | undefined,
  name: "TranscriptFoldDebug" | "FilmedMountDebug",
) {
  // i18n-ignore: Preserve the previous JavaScript exception if preloading was cancelled.
  if (pages === undefined)
    throw new TypeError(`Cannot read properties of undefined (reading '${name}')`);
  return {
    default: pages[name],
  };
}

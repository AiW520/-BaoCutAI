/** version-bar: restored from VersionBar-BaNSAcfT.js. */
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  HM as loadReact,
  IE as resolveUiProviderAndLayersUseContext2,
  Sc as resolvePlatformSyncAndRoutingShowChanges,
  UE as loadJsxRuntime,
  Vs as updatePlatformSyncAndRoutingRestoreAsk,
  fc as PlatformSyncAndRoutingAssign2,
  hC as Button,
  i as updatePlatformLiveDocumentAndHistoryBars,
  n as updatePlatformLiveDocumentAndHistoryCompareAsk,
  s as resolvePlatformLiveDocumentAndHistoryPane,
  tc as updatePlatformSyncAndRoutingShowChanges,
} from "./platform-core";
import { j as Menu } from "./cds";
import {
  W as TabRailButton,
  a as PagebarSeparator,
  n as PagebarStrip,
  r as PagebarMenuTrigger,
  t as PagebarCommandItem,
} from "./docs-app";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var W_COMPARE: Dynamic = 164;
var W_COMPARE_COMFORTABLE: Dynamic = 181;
var NARROW_BAR_PX: Dynamic = 600;
var COMPARE_READOUT: Dynamic = {
  previous: `vs previous version`,
  restored: `vs restored version`,
};
function VersionBar(
  { rail: rail, divided = false, onLeave: onLeave }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      updatePlatformLiveDocumentAndHistoryBars(),
    [],
  );
  let previewState: Dynamic = resolvePlatformLiveDocumentAndHistoryPane();
  let showChanges: Dynamic = resolvePlatformSyncAndRoutingShowChanges();
  let comfortable: Dynamic =
    resolveUiProviderAndLayersUseContext2() === `comfortable`;
  let measureRef: Dynamic = (0, React.useRef)(null);
  let [barWidth, setBarWidth]: Dynamic = (0, React.useState)(1 / 0);
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let closest: Dynamic = measureRef.current?.closest(
      `[data-testid="page-action-bar"]`,
    );
    if (!closest) return;
    let versionBarHandler: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      setBarWidth(closest.clientWidth > 0 ? closest.clientWidth : 1 / 0);
    versionBarHandler();
    if (typeof ResizeObserver === "undefined") return;
    let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
      versionBarHandler,
    );
    resizeObserver.observe(closest);
    return (..._extraArguments: unknown[]): Dynamic =>
      resizeObserver.disconnect();
  }, []);
  let narrow: Dynamic = barWidth < 600;
  let leavePreview: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    PlatformSyncAndRoutingAssign2.getState().clear();
  let containerRef: Dynamic = (0, React.useRef)(null);
  let onLeaveRef: Dynamic = (0, React.useRef)(onLeave);
  onLeaveRef.current = onLeave;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        let activeElement: Dynamic = (document as Dynamic).activeElement;
        if (
          !(activeElement instanceof (HTMLElement as Dynamic)) ||
          !containerRef.current?.contains(activeElement)
        )
          return;
        let onLeave2: Dynamic = onLeaveRef.current;
        activeElement.blur();
        onLeave2?.();
        requestAnimationFrame((..._extraArguments: unknown[]): undefined => {
          let activeElement2: Dynamic = (document as Dynamic).activeElement;
          if (
            !(
              !(activeElement2 instanceof (HTMLElement as Dynamic)) ||
              activeElement2.closest(`[data-testid="page-action-bar"]`) === null
            )
          ) {
            if (activeElement2.getAttribute(`aria-haspopup`) !== `menu`) {
              activeElement2.blur();
              onLeave2?.();
            }
          }
        });
      },
    [],
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let container: Dynamic = containerRef.current;
    if (!container) return;
    let versionBarHandler = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!(event.key !== `Escape` || event.defaultPrevented)) {
        event.preventDefault();
        event.stopPropagation();
        leavePreview();
      }
    };
    container.addEventListener(`keydown`, versionBarHandler);
    return (..._extraArguments: unknown[]): Dynamic =>
      container.removeEventListener(`keydown`, versionBarHandler);
  }, []);
  let compare: Dynamic = previewState?.compare ?? null;
  let compareItems: Dynamic =
    compare === null
      ? []
      : [
          {
            key: `compare`,
            width: comfortable ? 181 : 164,
            node: (
              <PagebarMenuTrigger
                label={`compare`}
                readout={COMPARE_READOUT[compare.base]}
                tip={`Previous version: shows what this restore changed. Restored version: checks this version against the one it brought back${compare.source === null ? `` : ` (from ${compare.source})`}; the two should match.`}
                data-testid={`versionbar-compare`}
              >
                <Menu.Group>
                  <Menu.Item
                    checked={compare.base === `previous`}
                    checkedRole={`radio`}
                    onClick={(..._extraArguments: unknown[]): Dynamic =>
                      updatePlatformLiveDocumentAndHistoryCompareAsk(`previous`)
                    }
                    description={`The one before this restore`}
                    data-testid={`versionbar-compare-previous`}
                  >{`Previous version`}</Menu.Item>
                  <Menu.Item
                    checked={compare.base === `restored`}
                    checkedRole={`radio`}
                    onClick={(..._extraArguments: unknown[]): Dynamic =>
                      updatePlatformLiveDocumentAndHistoryCompareAsk(`restored`)
                    }
                    description={`The one it brought back${compare.source === null ? `` : ` (${compare.source})`}`}
                    data-testid={`versionbar-compare-restored`}
                  >{`Restored version`}</Menu.Item>
                </Menu.Group>
              </PagebarMenuTrigger>
            ),
            row: (
              <PagebarCommandItem
                icon={`ArrowSplitRight`}
                label={
                  compare.base === `previous`
                    ? `Compare with restored version`
                    : `Compare with previous version`
                }
                onClick={(..._extraArguments: unknown[]): Dynamic =>
                  updatePlatformLiveDocumentAndHistoryCompareAsk(
                    compare.base === `previous` ? `restored` : `previous`,
                  )
                }
              />
            ),
          },
        ];
  return (
    <div ref={containerRef} className={`contents`} data-testid={`version-bar`}>
      <span ref={measureRef} hidden={true} />
      {divided && compareItems.length > 0 ? <PagebarSeparator /> : null}
      <PagebarStrip items={compareItems} />
      <TabRailButton
        iconOnly={true}
        icon={`Eye`}
        label={`Show changes`}
        tip={showChanges ? `Hide changes` : `Show changes`}
        pressed={showChanges}
        onClick={(..._extraArguments: unknown[]): Dynamic =>
          updatePlatformSyncAndRoutingShowChanges(!showChanges)
        }
        data-testid={`versionbar-changes`}
      />
      {rail.canRestore ? (
        <Button
          disabled={rail.restoring}
          onClick={(..._extraArguments: unknown[]): Dynamic =>
            updatePlatformSyncAndRoutingRestoreAsk()
          }
          data-testid={`versionbar-restore`}
        >
          {rail.restoring
            ? `Restoring…`
            : narrow
              ? `Restore`
              : `Restore this version`}
        </Button>
      ) : rail.isCurrent ? (
        <Button
          onClick={leavePreview}
          data-testid={`versionbar-back`}
        >{`Back to editing`}</Button>
      ) : null}
    </div>
  );
}
export {
  NARROW_BAR_PX,
  W_COMPARE,
  W_COMPARE_COMFORTABLE,
  VersionBar as default,
};
export { VersionBar };

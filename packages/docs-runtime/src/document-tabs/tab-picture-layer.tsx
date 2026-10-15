/** tab-picture-layer: restored from TabPictureLayer-FmEx-jWa.js. */

import type { Dynamic } from "../interop/legacy-dynamic";
const mapPreloadDependencies: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => [];
import { toModuleNamespace } from "../boot/module-runtime";
import {
  EditorHostReplace3,
  EditorSelectionAndTablesDataPagesPrintSkip,
  getPlatformLiveDocumentAndHistoryValues,
  loadJsxRuntime,
  loadReact,
  resolvePlatformLiveDocumentAndHistoryUpdate,
  resolveUiProviderAndLayersUseContext11,
} from "../platform/index";
import { isFrameArtifact } from "../boot/environment";
import { preloadModule } from "../boot/preload";
import { watchReferenceChanges } from "../document-app/references/chips";
import {
  DOCUMENT_PREVIEW_POPOVER_CLASS,
  documentFrameStyleAttributes,
  useDocumentDisplay,
  useDocumentFonts,
} from "../document-app/index";
import {
  fetchProjectEnums,
  versionBlobReader,
} from "../platform/lazy";
import { LFileSnapshotView } from "../document-history/snapshot-view";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function pictureOffsetFromFrame(
  layer?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frame: Dynamic = layer.parentElement?.querySelector(
    `[data-testid="ldoc-iframe"]`,
  );
  if (!frame) return null;
  let layerRect: Dynamic = layer.getBoundingClientRect();
  let frameRect: Dynamic = frame.getBoundingClientRect();
  return frameRect.width <= 0 || frameRect.height <= 0
    ? null
    : {
        left: frameRect.left - layerRect.left,
        top: frameRect.top - layerRect.top,
        width: frameRect.width,
        height: frameRect.height,
      };
}
function TabPictureLayer(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { pid: props2, picture: props3, drawn: props4 }: Dynamic = props;
  let layerRef: Dynamic = (0, React.useRef)(null);
  let loadTimeout: Dynamic = resolveUiProviderAndLayersUseContext11(10);
  let [offset, setOffset]: Dynamic = (0, React.useState)(null);
  let measureOffset: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let pictureOffsetFromFrame2: Dynamic = layerRef.current
        ? pictureOffsetFromFrame(layerRef.current)
        : null;
      if (pictureOffsetFromFrame2 !== null) {
        setOffset(
          (
            tabPictureLayer?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            tabPictureLayer &&
            tabPictureLayer.left === pictureOffsetFromFrame2.left &&
            tabPictureLayer.top === pictureOffsetFromFrame2.top &&
            tabPictureLayer.width === pictureOffsetFromFrame2.width &&
            tabPictureLayer.height === pictureOffsetFromFrame2.height
              ? tabPictureLayer
              : pictureOffsetFromFrame2,
        );
      }
    },
    [],
  );
  (0, React.useLayoutEffect)(measureOffset, [
    measureOffset,
    props.measureKey,
    props4,
  ]);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let layer: Dynamic = layerRef.current;
      if (!layer) return;
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        (..._extraArguments: unknown[]): Dynamic => measureOffset(),
      );
      resizeObserver.observe(layer);
      return (..._extraArguments: unknown[]): Dynamic =>
        resizeObserver.disconnect();
    },
    [measureOffset],
  );
  let typography: Dynamic = useDocumentFonts(props2);
  let style: Dynamic = useDocumentDisplay(props2);
  let drawnRef: Dynamic = (0, React.useRef)(props4);
  drawnRef.current = props4;
  let [html, setHtml]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (props3 !== null) {
        setHtml(
          (
            tabPictureLayer?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            tabPictureLayer?.pic.file === props3.file
              ? tabPictureLayer
              : {
                  pic: props3,
                  swap: resolvePlatformLiveDocumentAndHistoryUpdate(
                    tabPictureLayer?.pic ?? null,
                    props3,
                    drawnRef.current,
                  ),
                },
        );
      }
    },
    [props3],
  );
  let loadedPictureRef: Dynamic = (0, React.useRef)(null);
  loadedPictureRef.current = html?.pic.key ?? null;
  let renderTaskRef: Dynamic = (0, React.useRef)(null);
  let propsRef: Dynamic = (0, React.useRef)(props);
  propsRef.current = props;
  let [renderer]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      documentFrameStyleAttributes(
        EditorHostReplace3,
        undefined,
        undefined,
        isFrameArtifact(),
      ),
  );
  let fontLoader: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => versionBlobReader(props2),
  )[0];
  let fontCss: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => fetchProjectEnums(props2),
    [props2],
  );
  let [refreshTick, setRefreshTick]: Dynamic = (0, React.useState)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: boolean = true;
      let tabPictureLayerResult: Dynamic;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: then }: Dynamic = await import(
            "../platform/index"
          ).then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.PlatformApiAndAuthFEEDTOPIC,
          );
          return {
            subscribeProjectFeed: then,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { subscribeProjectFeed: subscribeProjectFeed }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (enabled)
              try {
                tabPictureLayerResult = watchReferenceChanges(
                  (
                    tabPictureLayer?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => subscribeProjectFeed(props2, tabPictureLayer),
                  (..._extraArguments: unknown[]): Dynamic =>
                    setRefreshTick(
                      (
                        tabPictureLayer?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => tabPictureLayer + 1,
                    ),
                );
              } catch {}
          },
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        tabPictureLayerResult?.();
      };
    },
    [props2],
  );
  let visible: Dynamic = props4 && offset !== null;
  return (
    <div ref={layerRef} className={`${visible ? DOCUMENT_PREVIEW_POPOVER_CLASS : ``} absolute inset-0`} style={{
  zIndex: loadTimeout,
  opacity: +!!visible,
  pointerEvents: visible ? `auto` : `none`
}} aria-hidden={true} data-testid={`tab-picture-layer`} data-drawn={visible ? `1` : undefined} {...{
  [EditorSelectionAndTablesDataPagesPrintSkip]: ``
}}>{offset !== null && <div className={`pointer-events-none absolute`} style={{
    left: offset.left,
    top: offset.top,
    width: offset.width,
    height: offset.height
  }} inert={true}>
            <LFileSnapshotView file={html?.pic.file ?? null} title={`Document`} label={`picture`} swap={html?.swap ?? `remount`} placeEveryMount={true} scrollY={(..._extraArguments: unknown[]): Dynamic => loadedPictureRef.current === null ? undefined : propsRef.current.scrollYOf(loadedPictureRef.current)} hostLayout={(..._extraArguments: unknown[]): Dynamic => loadedPictureRef.current === null ? [] : getPlatformLiveDocumentAndHistoryValues(loadedPictureRef.current)} container={props.container} typography={typography} display={style} parked={!visible} requestBlob={fontLoader} requestEnums={fontCss} enumsChanged={refreshTick} srcDoc={renderer} frameClassName={``} onPosted={(tabPictureLayer?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      renderTaskRef.current = tabPictureLayer;
      propsRef.current.onPosted(tabPictureLayer);
    }} onPainted={(tabPictureLayer?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (tabPictureLayer === renderTaskRef.current) {
        propsRef.current.onPainted(tabPictureLayer);
      }
    }} onError={(..._extraArguments: unknown[]): Dynamic => propsRef.current.onError()} />
          </div>}</div>
  );
}
export { TabPictureLayer };

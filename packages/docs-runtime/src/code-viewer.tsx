/** code-viewer: restored from CodeViewer-CSHj0FLC.js. */
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  Ay as isObservabilityBrowserAndOperationEventsImage,
  HM as loadReact,
  Oy as resolveObservabilityBrowserAndOperationEventsXlsx,
  UE as loadJsxRuntime,
  jy as resolveObservabilityBrowserAndOperationEventsImagePng,
  ky as resolveObservabilityBrowserAndOperationEventsToFixed,
  ld as PlatformRuntimeAndChatXlsx,
  qg as loadPlatformApiAndAuthValue,
} from "./platform-core";
import { n as codeToHtml } from "./shiki-core";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var languageByExtension: Dynamic = {
  py: `python`,
  ipynb: `json`,
  ts: `typescript`,
  tsx: `tsx`,
  js: `javascript`,
  jsx: `jsx`,
  json: `json`,
  md: `markdown`,
  yaml: `yaml`,
  yml: `yaml`,
  toml: `toml`,
  sh: `shellscript`,
  sql: `sql`,
  html: `html`,
  css: `css`,
  feed: `csv`,
  csv: `csv`,
};
function languageForFile(
  fileName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    languageByExtension[fileName.split(`.`).pop()?.toLowerCase() ?? ``] ??
    `text`
  );
}
function useCodeFilePreview(
  path?: Dynamic,
  fileName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [loaded, setLoaded]: Dynamic = (0, React.useState)(null);
  let [error, setError]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: Dynamic = false;
      let useCodeFilePreviewResult: Dynamic;
      setLoaded(null);
      setError(null);
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let useCodeFilePreviewResult2: Dynamic =
          await loadPlatformApiAndAuthValue(path);
        if (enabled) return;
        let useCodeFilePreviewResult3: Dynamic =
          resolveObservabilityBrowserAndOperationEventsImagePng(
            new (Uint8Array as Dynamic)(
              useCodeFilePreviewResult2,
              0,
              Math.min(12, useCodeFilePreviewResult2.byteLength),
            ),
          );
        if (
          resolveObservabilityBrowserAndOperationEventsXlsx(fileName) ===
            `image` ||
          useCodeFilePreviewResult3
        ) {
          useCodeFilePreviewResult = URL.createObjectURL(
            new (Blob as Dynamic)(
              [useCodeFilePreviewResult2],
              useCodeFilePreviewResult3
                ? {
                    type: useCodeFilePreviewResult3,
                  }
                : undefined,
            ),
          );
          setLoaded({
            kind: `image`,
            url: useCodeFilePreviewResult,
          });
          return;
        }
        if (
          isObservabilityBrowserAndOperationEventsImage(
            fileName,
            useCodeFilePreviewResult2,
          )
        ) {
          setLoaded({
            kind: `binary`,
            bytes: useCodeFilePreviewResult2.byteLength,
          });
          return;
        }
        let useCodeFilePreviewResult4: Dynamic = await codeToHtml(
          new (TextDecoder as Dynamic)().decode(useCodeFilePreviewResult2),
          {
            lang: languageForFile(fileName),
            theme: `vitesse-light`,
          },
        );
        if (!enabled) {
          setLoaded({
            kind: `html`,
            html: useCodeFilePreviewResult4,
          });
        }
      })().catch(
        (error2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !enabled && setError(String(error2)),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
        if (useCodeFilePreviewResult) {
          URL.revokeObjectURL(useCodeFilePreviewResult);
        }
      };
    },
    [path, fileName],
  );
  return {
    loaded: loaded,
    error: error,
  };
}
var jsxRuntime: Dynamic = loadJsxRuntime();
function CodeViewer(
  { path: path, name: fileName }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { loaded: loaded, error: error }: Dynamic = useCodeFilePreview(
    path,
    fileName,
  );
  if (error)
    return (
      <div className={`p-4 font-mono text-xs text-danger`}>
        {`Failed to load `}
        {path}
        {`: `}
        {error}
      </div>
    );
  if (loaded == null)
    return <div className={`bg-alpha-0 h-full animate-pulse`} />;
  if (loaded.kind === `image`)
    return (
      <div
        className={`bg-alpha-0 flex h-full items-center justify-center overflow-auto p-4`}
      >
        <img
          src={loaded.url}
          alt={fileName}
          className={`max-h-full max-w-full object-contain`}
        />
      </div>
    );
  if (loaded.kind === `binary`) {
    let Item: Dynamic =
      PlatformRuntimeAndChatXlsx[
        resolveObservabilityBrowserAndOperationEventsXlsx(fileName)
      ];
    return (
      <div
        className={`text-secondary flex h-full flex-col items-center justify-center gap-2`}
      >
        <Item size={32} />
        <div className={`text-xs`}>{fileName}</div>
        <div className={`text-[10px]`}>
          {resolveObservabilityBrowserAndOperationEventsToFixed(loaded.bytes)}
        </div>
      </div>
    );
  }
  return (
    <div
      data-code-viewer={true}
      className={`h-full overflow-auto font-mono text-xs leading-[1.6]`}
      dangerouslySetInnerHTML={{
        __html: loaded.html,
      }}
    />
  );
}
export { CodeViewer };

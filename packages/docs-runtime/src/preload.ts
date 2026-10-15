/** preload: restored from preload-JwdpM2S5.js. */
import type { Dynamic } from "./types";
var MODULE_PRELOAD_REL: Dynamic = `modulepreload`;
var resolvePreloadUrl: Dynamic = function (
  dependency?: Dynamic,
  importerUrl?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (URL as Dynamic)(dependency, importerUrl).href;
};
var preloadedDependencies: Dynamic = {};
var preloadModule: Dynamic = function (
  importModule?: Dynamic,
  dependencies?: Dynamic,
  importerUrl?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let preloadPromise: Dynamic = Promise.resolve();
  if (dependencies && dependencies.length > 0) {
    let preloadModuleHandler: Dynamic = function (
      preloadModule2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return Promise.all(
        preloadModule2.map(
          (
            MODULEPRELOADREL?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            Promise.resolve(MODULEPRELOADREL).then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                status: `fulfilled`,
                value: result,
              }),
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                status: `rejected`,
                reason: result,
              }),
            ),
        ),
      );
    };
    let elementsByTagName: Dynamic = (document as Dynamic).getElementsByTagName(
      `link`,
    );
    let matchedElement: Dynamic = (document as Dynamic).querySelector(
      `meta[property=csp-nonce]`,
    );
    let nonce: Dynamic =
      matchedElement?.nonce || matchedElement?.getAttribute(`nonce`);
    preloadPromise = preloadModuleHandler(
      dependencies.map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          item = resolvePreloadUrl(item, importerUrl);
          if (item in preloadedDependencies) return;
          preloadedDependencies[item] = true;
          let endsWith: Dynamic = item.endsWith(`.css`);
          let label: Dynamic = endsWith ? `[rel="stylesheet"]` : ``;
          if (importerUrl)
            for (
              let difference: Dynamic = elementsByTagName.length - 1;
              difference >= 0;
              difference--
            ) {
              let elementsByTagNameItem: Dynamic =
                elementsByTagName[difference];
              if (
                elementsByTagNameItem.href === item &&
                (!endsWith || elementsByTagNameItem.rel === `stylesheet`)
              )
                return;
            }
          else if (
            (document as Dynamic).querySelector(`link[href="${item}"]${label}`)
          )
            return;
          let element: Dynamic = (document as Dynamic).createElement(`link`);
          element.rel = endsWith ? `stylesheet` : MODULE_PRELOAD_REL;
          if (!endsWith) {
            element.as = `script`;
          }
          element.crossOrigin = ``;
          element.href = item;
          if (nonce) {
            element.setAttribute(`nonce`, nonce);
          }
          (document as Dynamic).head.appendChild(element);
          if (endsWith)
            return new (Promise as Dynamic)(
              (
                resolve?: Dynamic,
                reject?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                element.addEventListener(`load`, resolve);
                element.addEventListener(
                  `error`,
                  (..._extraArguments: unknown[]): Dynamic =>
                    reject(Error(`Unable to preload CSS for ${item}`)),
                );
              },
            );
        },
      ),
    );
  }
  function handlePreloadError(
    preloadModule2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let event: Dynamic = new (Event as Dynamic)(`vite:preloadError`, {
      cancelable: true,
    });
    event.payload = preloadModule2;
    (window as Dynamic).dispatchEvent(event);
    if (!event.defaultPrevented) throw preloadModule2;
  }
  return preloadPromise.then(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      for (let response of (result || []) as Dynamic)
        if (response.status === `rejected`) {
          handlePreloadError(response.reason);
        }
      return importModule().catch(handlePreloadError);
    },
  );
};
export { preloadModule as t };
export { preloadModule };

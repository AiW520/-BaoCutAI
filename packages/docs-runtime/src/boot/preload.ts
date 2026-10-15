/** preload: restored from preload-JwdpM2S5.js. */
type PreloadResult =
  | { status: "fulfilled"; value: Event | undefined }
  | { status: "rejected"; reason: unknown };
interface PreloadErrorEvent extends Event { payload?: unknown }
var MODULE_PRELOAD_REL: string = `modulepreload`;
var resolvePreloadUrl = function (
  dependency: string,
  importerUrl?: string,
  ..._extraArguments: unknown[]
): string {
  return new URL(dependency, importerUrl).href;
};
var preloadedDependencies: Record<string, true> = {};
var preloadModule = function <Module> (
  importModule: () => Promise<Module>,
  dependencies?: readonly string[],
  importerUrl?: string,
  ..._extraArguments: unknown[]
): Promise<Module | undefined> {
  let preloadPromise: Promise<PreloadResult[] | void> = Promise.resolve();
  if (dependencies && dependencies.length > 0) {
    let preloadModuleHandler = function (
      preloadModule2: readonly (Promise<Event> | undefined)[],
      ..._extraArguments: unknown[]
    ): Promise<PreloadResult[]> {
      return Promise.all(
        preloadModule2.map(
          (
            MODULEPRELOADREL: Promise<Event> | undefined,
            ..._extraArguments: unknown[]
          ): Promise<PreloadResult> =>
            Promise.resolve(MODULEPRELOADREL).then(
              (result: Event | undefined, ..._extraArguments: unknown[]): PreloadResult => ({
                status: `fulfilled`,
                value: result,
              }),
              (result: unknown, ..._extraArguments: unknown[]): PreloadResult => ({
                status: `rejected`,
                reason: result,
              }),
            ),
        ),
      );
    };
    let elementsByTagName = document.getElementsByTagName(
      `link`,
    );
    let matchedElement = document.querySelector<HTMLMetaElement>(
      `meta[property=csp-nonce]`,
    );
    let nonce =
      matchedElement?.nonce || matchedElement?.getAttribute(`nonce`);
    preloadPromise = preloadModuleHandler(
      dependencies.map(
        (item: string, ..._extraArguments: unknown[]): Promise<Event> | undefined => {
          item = resolvePreloadUrl(item, importerUrl);
          if (item in preloadedDependencies) return;
          preloadedDependencies[item] = true;
          let endsWith = item.endsWith(`.css`);
          let label: string = endsWith ? `[rel="stylesheet"]` : ``;
          if (importerUrl)
            for (
              let difference: number = elementsByTagName.length - 1;
              difference >= 0;
              difference--
            ) {
              let elementsByTagNameItem =
                elementsByTagName[difference];
              if (
                elementsByTagNameItem.href === item &&
                (!endsWith || elementsByTagNameItem.rel === `stylesheet`)
              )
                return;
            }
          else if (
            document.querySelector(`link[href="${item}"]${label}`)
          )
            return;
          let element = document.createElement(`link`);
          element.rel = endsWith ? `stylesheet` : MODULE_PRELOAD_REL;
          if (!endsWith) {
            element.as = `script`;
          }
          element.crossOrigin = ``;
          element.href = item;
          if (nonce) {
            element.setAttribute(`nonce`, nonce);
          }
          document.head.appendChild(element);
          if (endsWith)
            return new Promise<Event>(
              (
                resolve: (value: Event | PromiseLike<Event>) => void,
                reject: (reason?: unknown) => void,
                ..._extraArguments: unknown[]
              ): undefined => {
                element.addEventListener(`load`, resolve);
                element.addEventListener(
                  `error`,
                  (..._extraArguments: unknown[]): void =>
                    reject(Error(`Unable to preload CSS for ${item}`)),
                );
              },
            );
        },
      ),
    );
  }
  function handlePreloadError(
    preloadModule2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined {
    let event: PreloadErrorEvent = new Event(`vite:preloadError`, {
      cancelable: true,
    });
    event.payload = preloadModule2;
    window.dispatchEvent(event);
    if (!event.defaultPrevented) throw preloadModule2;
  }
  return preloadPromise.then(
    (result: PreloadResult[] | void, ..._extraArguments: unknown[]): Promise<Module | undefined> => {
      for (let response of (result || []))
        if (response.status === `rejected`) {
          handlePreloadError(response.reason);
        }
      return importModule().catch(handlePreloadError);
    },
  );
};
export { preloadModule };

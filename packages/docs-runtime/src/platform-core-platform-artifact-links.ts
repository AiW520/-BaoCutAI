/** BaoCut: platform artifact links from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloIImport,
} from "./platform-core-dependencies";

var platformArtifactLinksPattern: RegExp;

var platformArtifactLinksPattern2: RegExp;

var platformArtifactLinksPattern3: RegExp;

function resolvePlatformArtifactLinksIncludes(
  platformArtifactLinksIncludes?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolvePlatformArtifactLinksIncludesResult: Dynamic;
  try {
    resolvePlatformArtifactLinksIncludesResult = new URL(
      platformArtifactLinksIncludes,
    );
  } catch {
    return null;
  }
  if (
    !options.includes(resolvePlatformArtifactLinksIncludesResult.origin) ||
    resolvePlatformArtifactLinksIncludesResult.username !== `` ||
    resolvePlatformArtifactLinksIncludesResult.password !== ``
  )
    return null;
  let match = platformArtifactLinksPattern.exec(
    resolvePlatformArtifactLinksIncludesResult.pathname,
  );
  if (match === null) return null;
  let matchesMatchItem = match[1] !== undefined;
  if (resolvePlatformArtifactLinksIncludesResult.search.length > 128)
    return null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let [
    resolvePlatformArtifactLinksIncludesResult2,
    resolvePlatformArtifactLinksIncludesResult3,
  ] of resolvePlatformArtifactLinksIncludesResult.searchParams as Dynamic)
    if (
      uniqueItems.has(resolvePlatformArtifactLinksIncludesResult2) ||
      (uniqueItems.add(resolvePlatformArtifactLinksIncludesResult2),
      !(resolvePlatformArtifactLinksIncludesResult2 === `org`
        ? platformArtifactLinksPattern3.test(
            resolvePlatformArtifactLinksIncludesResult3,
          )
        : resolvePlatformArtifactLinksIncludesResult2 === `sk` &&
          !matchesMatchItem &&
          platformArtifactLinksPattern2.test(
            resolvePlatformArtifactLinksIncludesResult3,
          )))
    )
      return null;
  return matchesMatchItem ? match[1].slice(0, -1) : ``;
}

var PlatformArtifactLinksCodeArtifact: string;

var platformArtifactLinksPattern4: RegExp;

var PlatformArtifactLinks123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz: string;

function resolvePlatformArtifactLinksReplaceAll(
  platformArtifactLinksReplaceAll?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!resolvePlatformArtifactLinksTest2(platformArtifactLinksReplaceAll))
    return null;
  let BigInt2: Dynamic = BigInt(
    `0x${platformArtifactLinksReplaceAll.replaceAll(`-`, ``)}`,
  );
  let label = ``;
  for (let index = 0; index < 22; index++) {
    label =
      PlatformArtifactLinks123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz[
        Number(BigInt2 % 58n)
      ] + label;
    BigInt2 /= 58n;
  }
  return label;
}

function resolvePlatformArtifactLinksValue(
  platformArtifactLinksValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformArtifactLinksReplaceAll = resolvePlatformArtifactLinksReplaceAll(
    platformArtifactLinksValue,
  );
  return platformArtifactLinksReplaceAll === null
    ? null
    : `/artifact/${platformArtifactLinksReplaceAll}`;
}

var PlatformArtifactLinksHttpsPreviewClaudeAi: Dynamic;

var resolvePlatformArtifactLinksSplit: Dynamic;

var resolvePlatformArtifactLinksTest: Dynamic;

function resolvePlatformArtifactLinksHostname(
  platformArtifactLinksHostname?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolvePlatformArtifactLinksSplit(platformArtifactLinksHostname.hostname) ??
    resolvePlatformArtifactLinksTest(platformArtifactLinksHostname.containerId)
  );
}

function resolvePlatformArtifactLinksIncludes2(
  platformArtifactLinksIncludes2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof platformArtifactLinksIncludes2 != `string` ||
    !helloIImport.includes(platformArtifactLinksIncludes2)
    ? null
    : (PlatformArtifactLinksHttpsPreviewClaudeAi[
        platformArtifactLinksIncludes2
      ] ?? platformArtifactLinksIncludes2);
}

function resolvePlatformArtifactLinksShellOrigin(
  platformArtifactLinksShellOrigin?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformArtifactLinksIncludes2: Dynamic =
    resolvePlatformArtifactLinksIncludes2(
      platformArtifactLinksShellOrigin.shellOrigin,
    );
  let platformArtifactLinksValue = resolvePlatformArtifactLinksValue(
    resolvePlatformArtifactLinksHostname(platformArtifactLinksShellOrigin),
  );
  return platformArtifactLinksIncludes2 !== null &&
    platformArtifactLinksValue !== null
    ? `${platformArtifactLinksIncludes2}${platformArtifactLinksValue}`
    : null;
}

var resolvePlatformArtifactLinksTest2: Dynamic;

function resolvePlatformArtifactLinksValue2(
  platformArtifactLinksValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolvePlatformArtifactLinksTest2(options)
    ? `${resolvePlatformArtifactLinksIncludes2(platformArtifactLinksValue2) ?? `https://claude.ai`}${PlatformArtifactLinksCodeArtifact}${encodeURIComponent(options)}`
    : null;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformArtifactLinksStep1(): void {
  (platformArtifactLinksPattern = /^\/(?:code\/)?artifact\/([a-z0-9][a-z0-9-]{0,59}-)?(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[1-9A-HJ-NP-Za-km-z]{22})$/);
  (platformArtifactLinksPattern2 = /^[A-Za-z0-9_-]{16,64}$/);
  (platformArtifactLinksPattern3 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  (PlatformArtifactLinksCodeArtifact = `/code/artifact/`);
  (platformArtifactLinksPattern4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  (PlatformArtifactLinks123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz = `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`);
  (PlatformArtifactLinksHttpsPreviewClaudeAi = {
    "https://preview.claude.ai": `https://claude.ai`,
    "https://ion-preview.claude.ai": `https://claude.ai`,
  });
  (resolvePlatformArtifactLinksSplit = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof items != `string` || items.length === 0 || items.length > 253)
      return null;
    let normalizedItemsParts = items.toLowerCase().split(`.`);
    if (normalizedItemsParts.length < 3) return null;
    let normalizedItemsPartItem = normalizedItemsParts[0];
    return platformArtifactLinksPattern4.test(normalizedItemsPartItem)
      ? normalizedItemsPartItem
      : null;
  });
  (resolvePlatformArtifactLinksTest = (
    platformArtifactLinksTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformArtifactLinksTest == `string` &&
    platformArtifactLinksPattern4.test(platformArtifactLinksTest)
      ? platformArtifactLinksTest
      : null);
  (resolvePlatformArtifactLinksTest2 = (
    platformArtifactLinksTest2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformArtifactLinksTest2 == `string` &&
    platformArtifactLinksPattern4.test(platformArtifactLinksTest2));
}

export {
  PlatformArtifactLinksCodeArtifact,
  resolvePlatformArtifactLinksHostname,
  resolvePlatformArtifactLinksIncludes,
  resolvePlatformArtifactLinksIncludes2,
  resolvePlatformArtifactLinksShellOrigin,
  resolvePlatformArtifactLinksTest2,
  resolvePlatformArtifactLinksValue2,
};

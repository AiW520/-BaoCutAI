/** version-copy: restored from versionCopy-BGTTG3cn.js. */
import type { Dynamic } from "./types";
import {
  NA as pageBusyThrownOf,
  Rc as PlatformSyncAndRoutingBirthRefused,
  jA as PAGE_BUSY_TRY_AGAIN,
  vx as toast,
} from "./platform-core";
import {
  J as DuplicateUnsupported,
  K as DuplicateStructureInvalid,
  Y as duplicateVersionTab,
  q as DuplicateTooLarge,
} from "./docs-app";
import { Xt as fetchVersionXml } from "./platform-lazy";
function formatCopiedVersionDate(
  at?: Dynamic,
  locale?: Dynamic,
  timeZone?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Date as Dynamic)(at).toLocaleString(locale, {
    month: `short`,
    day: `numeric`,
    year: `numeric`,
    hour: `numeric`,
    minute: `2-digit`,
    timeZone: timeZone,
  });
}
var COPY_CREATED_MESSAGE: Dynamic = `Copy created`;
var copySuccessMessage: Dynamic = (
  group?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  group === undefined
    ? COPY_CREATED_MESSAGE
    : `Copied the newest of ${group.count} versions`;
var COPY_FAILED_MESSAGE: Dynamic = `Couldn't make a copy of this version. Try again.`;
var COPY_DELETED_EMBED_MESSAGE: Dynamic = `This version embeds something that has since been deleted, so it can't be copied.`;
var COPY_DELETED_MEDIA_MESSAGE: Dynamic = `This version shows an image or file that has since been deleted, so it can't be copied.`;
var COPY_DELETED_REFERENCE_MESSAGE: Dynamic = `This version refers to something that has since been deleted, such as an embedded widget or an image, so it can't be copied.`;
function copyFailureMessage(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return error instanceof (DuplicateTooLarge as Dynamic) ||
    (error instanceof (PlatformSyncAndRoutingBirthRefused as Dynamic) &&
      error.reason === `row_too_large`)
    ? `This version is too large to copy.`
    : error instanceof (DuplicateStructureInvalid as Dynamic)
      ? `This version can't be copied — its content isn't in a copyable shape.`
      : error instanceof (DuplicateUnsupported as Dynamic)
        ? `This kind of tab can't be copied yet.`
        : pageBusyThrownOf(error) === null
          ? error instanceof (PlatformSyncAndRoutingBirthRefused as Dynamic) &&
            error.reason === `unknown_id`
            ? error.object === `node`
              ? COPY_DELETED_EMBED_MESSAGE
              : error.object === `blob`
                ? COPY_DELETED_MEDIA_MESSAGE
                : COPY_DELETED_REFERENCE_MESSAGE
            : COPY_FAILED_MESSAGE
          : PAGE_BUSY_TRY_AGAIN;
}
async function copyVersionToTab(
  request?: Dynamic,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<undefined> {
  let fetchXml: Dynamic = dependencies.fetchXml ?? fetchVersionXml;
  let duplicate: Dynamic = dependencies.duplicate ?? duplicateVersionTab;
  let notify: Dynamic = dependencies.notify ?? toast;
  try {
    if (request.preview.upto === undefined)
      throw Error(`version history: the row names no version`);
    let fetchXml2: Dynamic = await fetchXml(
      request.pid,
      request.fileId,
      request.preview.upto,
    );
    let copiedVersionDate: Dynamic = formatCopiedVersionDate(
      request.preview.at,
      request.locale,
      request.timeZone,
    );
    let { fileId: duplicate2 }: Dynamic = await duplicate(
      request.room,
      request.view,
      request.fileId,
      {
        xml: fetchXml2,
        when: copiedVersionDate,
      },
    );
    notify(copySuccessMessage(request.preview.group), {
      action: {
        label: `Open`,
        onClick: (..._extraArguments: unknown[]): Dynamic =>
          request.open(duplicate2),
      },
    });
  } catch (copyVersionToTabResult: Dynamic) {
    notify.error(copyFailureMessage(copyVersionToTabResult));
  }
}
export { copyVersionToTab };

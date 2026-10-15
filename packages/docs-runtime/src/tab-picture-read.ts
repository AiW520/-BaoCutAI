/** tab-picture-read: restored from tabPictureRead-D-9b_UlT.js. */
import type {
  SnapshotHttpReply,
  SnapshotView,
  PictureNode,
  PictureReader,
  ResolvedPictureReader,
  PictureResult,
  PictureLane,
  TabNode,
  PreviewParser,
} from "./type-models/snapshot";
import type { UnknownRecord } from "./type-models/common";
import type { EditorNodeJSON } from "./types";
import {
  i_ as liveDoor,
  ln as resolvePlatformLiveDocumentAndHistoryNode2,
} from "./platform-core";
import {
  R as prefetchDocumentViewWithComments,
  c as documentPreviewKey,
} from "./docs-app";
import {
  gt as parseVersionPreviewFace,
  pt as collectEmbedReferences,
} from "./platform-lazy";
function viewOfReply(response: SnapshotHttpReply): SnapshotView | null {
  if (response.status < 200 || response.status >= 300) return null;
  const body = response.body;
  if (
    typeof body !== "object" ||
    !body ||
    !("verdict" in body) ||
    body.verdict !== "allow"
  )
    return null;
  const record = body as UnknownRecord;
  const data =
    typeof record.data === "object" && record.data !== null
      ? (record.data as UnknownRecord)
      : record;
  const xml = data.doc;
  if (
    typeof xml !== "string" ||
    data.complete === false ||
    data.complete === 0 ||
    /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(xml)
  )
    return null;
  const revMatch = /^<doc\b[^>]*\srev="(\d+)"/.exec(xml);
  const revision = [
    record.rev,
    data.rev,
    revMatch ? Number(revMatch[1]) : undefined,
  ].find(
    (item): item is number =>
      typeof item === "number" && Number.isInteger(item) && item >= 0,
  );
  return revision === undefined
    ? null
    : {
        xml,
        rev: revision,
      };
}
var PICTURE_NODE_TYPES = new Set([
  `blockquote`,
  `cell`,
  `codeBlock`,
  `date`,
  `doc`,
  `dropdown`,
  `hardBreak`,
  `horizontalRule`,
  `list`,
  `listItem`,
  `media`,
  `mention`,
  `paragraph`,
  `pending`,
  `table`,
  `tableRow`,
  `text`,
]);
var PICTURE_MARK_TYPES = new Set([
  `bold`,
  `code`,
  `highlight`,
  `italic`,
  `link`,
  `strike`,
  `underline`,
]);
var PICTURE_KEPT_OUT_NODE_TYPES = new Set([`embed`, `embedInline`, `atom`]);
var PICTURE_KEPT_OUT_MARK_TYPES = new Set([]);
function onlyPictureTypes(
  documentJson: EditorNodeJSON,
): documentJson is PictureNode {
  let validNode: (node: EditorNodeJSON) => boolean = (node) => {
    if (typeof node.type != `string` || !PICTURE_NODE_TYPES.has(node.type))
      return false;
    if (Array.isArray(node.marks)) {
      for (let onlyPictureTypesResult of node.marks)
        if (
          typeof onlyPictureTypesResult?.type != `string` ||
          !PICTURE_MARK_TYPES.has(onlyPictureTypesResult.type)
        )
          return false;
    }
    if (Array.isArray(node.content)) {
      for (let onlyPictureTypesResult of node.content)
        if (!validNode(onlyPictureTypesResult)) return false;
    }
    return true;
  };
  return validNode(documentJson);
}
function tabOf(lane: PictureLane, fileId: string): TabNode | undefined {
  const content = lane.read({
    object: "file",
    id: fileId,
  })?.content;
  if (
    typeof content === "object" &&
    content !== null &&
    "kind" in content &&
    content.kind === "node"
  ) {
    const record = content as UnknownRecord;
    if (typeof record.id === "string" && record.id.length > 0)
      return {
        nodeId: record.id,
        ...(typeof record.localId === "string"
          ? {
              bodyLid: record.localId,
            }
          : {}),
      };
  }
}
function plainCodeBlocks(node: EditorNodeJSON): EditorNodeJSON {
  let content = Array.isArray(node.content)
    ? node.content.map(plainCodeBlocks)
    : node.content;
  let attrs =
    node.type === `codeBlock`
      ? {
          ...node.attrs,
          language: `plain`,
        }
      : node.attrs;
  return {
    ...node,
    ...(attrs === undefined
      ? {}
      : {
          attrs: attrs,
        }),
    ...(content === undefined
      ? {}
      : {
          content: content,
        }),
  };
}
function pictureFromReply(
  response: SnapshotHttpReply,
  reader: ResolvedPictureReader,
): PictureResult {
  try {
    let viewOfReply2 = viewOfReply(response);
    if (viewOfReply2 === null) {
      let body = response.body;
      return typeof body == `object` &&
        body &&
        (body as UnknownRecord).verdict === `allow`
        ? `paged`
        : `refused`;
    }
    let pictureFromReplyResult = (
      resolvePlatformLiveDocumentAndHistoryNode2 as (
        read: PictureLane["read"],
        nodeId: string,
      ) => number | undefined
    )(reader.lane.read.bind(reader.lane), reader.nodeId);
    if (
      pictureFromReplyResult !== undefined &&
      viewOfReply2.rev < pictureFromReplyResult
    )
      return `behind`;
    let pictureFromReplyResult2 = (parseVersionPreviewFace as PreviewParser)(
      viewOfReply2.xml,
      0,
      {
        rev: viewOfReply2.rev,
        bodyLid: reader.bodyLid,
      },
    );
    if (
      (collectEmbedReferences as (doc: EditorNodeJSON) => readonly unknown[])(
        pictureFromReplyResult2.doc,
      ).length > 0
    )
      return `embeds`;
    if (!onlyPictureTypes(pictureFromReplyResult2.doc)) return `unknown`;
    let file: unknown = (parseVersionPreviewFace as PreviewParser)(
      {
        doc: plainCodeBlocks(pictureFromReplyResult2.doc),
      },
      0,
      {
        rev: viewOfReply2.rev,
        bodyLid: reader.bodyLid,
      },
    ).file;
    return {
      key: (documentPreviewKey as (pid: string, fileId: string) => string)(
        reader.pid,
        reader.fileId,
      ),
      pid: reader.pid,
      fileId: reader.fileId,
      nodeId: reader.nodeId,
      rev: viewOfReply2.rev,
      readFrom: reader.readFrom,
      file: file,
    };
  } catch {
    return `threw`;
  }
}
async function readTabPicture(reader: PictureReader): Promise<PictureResult> {
  try {
    let tabOf2 = tabOf(reader.lane, reader.fileId);
    return tabOf2 === undefined
      ? `no-node`
      : pictureFromReply(
          await (
            reader.read ??
            ((tabPicture) =>
              (
                prefetchDocumentViewWithComments as (
                  door: unknown,
                  nodeId: string,
                  container: {
                    kind: "project";
                    id: string;
                  },
                ) => Promise<SnapshotHttpReply>
              )(
                (
                  liveDoor as (
                    pid: string,
                    options: {
                      container: PictureReader["container"];
                    },
                  ) => unknown
                )(reader.pid, {
                  container: reader.container,
                }),
                tabPicture,
                {
                  kind: `project`,
                  id: reader.pid,
                },
              ))
          )(tabOf2.nodeId),
          {
            ...reader,
            ...tabOf2,
          },
        );
  } catch {
    return `threw`;
  }
}
export {
  PICTURE_KEPT_OUT_MARK_TYPES,
  PICTURE_KEPT_OUT_NODE_TYPES,
  PICTURE_MARK_TYPES,
  PICTURE_NODE_TYPES,
  onlyPictureTypes,
  pictureFromReply,
  readTabPicture,
  tabOf,
  viewOfReply,
};

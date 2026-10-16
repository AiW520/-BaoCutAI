import { isDataOperationControlDeny2 } from "../../platform/index";
import type {
  PageTerminalFace,
  RefusalClassification,
  RefusalContext,
  RefusalReply,
  RefusalSource,
} from "./contracts";
import {
  isNodeGoneReply,
  ledgerConflictDetail,
  pageGoneCertainty,
  stringOrUndefined,
} from "./reply-facts";
import {
  adaptClassificationToRoad,
  attachRefusalMetadata,
  classifyRetryContract,
} from "./retry-policy";
import {
  getReasonMatch,
  LOST_RETRY_MAX,
  reasonSubreasonKey,
  refusalRowsByReason,
} from "./row-index";
export function classifyAvailability(
  reply: RefusalReply,
  data: Record<string, unknown>,
  context: RefusalContext,
  reason: string,
  layer: string | undefined,
): RefusalClassification | null {
  const road = context.road;
  const gone = pageGoneCertainty(reply);
  if (gone !== null) {
    const value7: boolean = context.seated === true;
    if (gone.sure || value7) {
      const value8: boolean =
        (reply.reason === `gone` || data.code === `gone`) && data.object === `project`;
      const value9: PageTerminalFace = data.why === `unreached` ? `unreached` : `deleted`;
      const value10 = value8
        ? getReasonMatch(`gone`, `project`)
        : (refusalRowsByReason.get(reasonSubreasonKey(`page_gone`, value9)) ??
          getReasonMatch(`page_gone`, `*`));
      return attachRefusalMetadata(
        adaptClassificationToRoad(
          {
            k: `page_terminal`,
            face: value9,
          },
          `page`,
          road,
          `page_gone`,
        ),
        value10?.row ?? null,
        value8 ? `gone` : `page_gone`,
        value8 ? `table` : `local`,
        value8 ? `project` : stringOrUndefined(data.why),
      );
    }
    const entry = getReasonMatch(`page_gone`, `unborn`);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract(entry.row),
        `page`,
        road,
        `page_gone`,
      ),
      entry.row,
      `page_gone`,
      `local`,
      `unborn`,
    );
  }
  if (isNodeGoneReply(reply, context.node)) {
    const entry = getReasonMatch(`gone`, `node`);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        {
          k: `link_terminal`,
          face: `node_gone`,
        },
        `node`,
        road,
        `gone`,
      ),
      entry.row,
      `gone`,
      `table`,
      `node`,
    );
  }
  if (data.terminal === true && (reason === `busy` || data.room === `ledger-busy`)) {
    const entry = getReasonMatch(`busy`, `ledger-busy`);
    return attachRefusalMetadata(
      adaptClassificationToRoad(classifyRetryContract(entry.row), `op`, road, `busy`),
      entry.row,
      `busy`,
      `local`,
      `terminal`,
    );
  }
  if (ledgerConflictDetail(reply) !== null) {
    const entry = getReasonMatch(`conflict`, `*`);
    const value7: RefusalSource =
      layer === `relay` ? `relay` : layer === `http` ? `http` : `table`;
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract(entry.row),
        `op`,
        road,
        `conflict`,
        value7,
      ),
      entry.row,
      `conflict`,
      value7,
      `ledger-busy`,
    );
  }
  if (reason === `conflict`) {
    const entry = getReasonMatch(`conflict`, `*`);
    return isDataOperationControlDeny2(reply) || reply.status === 409
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `lost`,
              max: LOST_RETRY_MAX,
            },
            `link`,
            road,
            `conflict`,
          ),
          {
            scope: `link`,
            words: null,
            surfaces: `quiet`,
          },
          `conflict`,
          `table`,
          `unknown`,
        )
      : attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `reread_once`,
              after: `assert`,
            },
            `op`,
            road,
            `conflict`,
          ),
          {
            ...entry.row,
            words: null,
            surfaces: `generic`,
          },
          `conflict`,
          `table`,
          `other`,
        );
  }
  return null;
}

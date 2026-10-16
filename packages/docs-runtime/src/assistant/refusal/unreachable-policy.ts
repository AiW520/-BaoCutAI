import type { RefusalClassification, RefusalContext, RefusalReply } from "./contracts";
import { adaptClassificationToRoad, attachRefusalMetadata } from "./retry-policy";
import { LOST_RETRY_MAX, TRANSIENT_RETRY_MAX } from "./row-index";
export function classifyUnreachable(
  reply: RefusalReply,
  context: RefusalContext,
): RefusalClassification {
  const road = context.road;
  const reason: string = `unreachable`;
  return reply.reopens === true
    ? attachRefusalMetadata(
        adaptClassificationToRoad(
          {
            k: `transient`,
            max: TRANSIENT_RETRY_MAX,
            redial: false,
          },
          `link`,
          road,
          reason,
        ),
        {
          scope: `link`,
          words: `offline`,
          surfaces: `quiet`,
        },
        reason,
        `local`,
        `reopens`,
      )
    : reply.hung === true || reply.lost === true
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `lost`,
              max: LOST_RETRY_MAX,
            },
            `link`,
            road,
            reason,
          ),
          {
            scope: `link`,
            words: `offline`,
            surfaces: `quiet`,
          },
          reason,
          `local`,
          reply.hung === true ? `hung` : `lost`,
        )
      : attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `transient`,
              max: TRANSIENT_RETRY_MAX,
              redial: false,
            },
            `link`,
            road,
            reason,
          ),
          {
            scope: `link`,
            words: `offline`,
            surfaces: `quiet`,
          },
          reason,
          `local`,
        );
}

import {
  collectPlatformLiveDocumentAndHistoryAutoLift,
  resolvePlatformLiveDocumentAndHistoryCell,
  resolvePlatformLiveDocumentAndHistoryGesture,
  resolvePlatformLiveDocumentAndHistoryValue8,
  resolvePlatformLiveDocumentAndHistoryValue9,
} from "../../platform/index";
import type {
  BirthBook,
  OperationBirth,
  RefusalReply,
  RefusalRequest,
} from "./contracts";
import { refusalNeedWords } from "./wire-vocabulary";
const operationSuffixPattern = /:\d+-\d+$/;
const bookKeyOf = (opId: string) =>
  opId.replace(operationSuffixPattern, ``).replace(/~1$/, ``);
function operationShadowFields(
  request: RefusalRequest,
  reply: RefusalReply,
  births: BirthBook | undefined,
  payload: readonly unknown[] = [],
  overrideNeed?: string,
) {
  if (request.road !== `write` && request.road !== `stream`) return {};
  let birth: OperationBirth | undefined;
  try {
    birth =
      request.replayed === true
        ? {
            g: `replay`,
          }
        : request.opId === undefined
          ? undefined
          : resolvePlatformLiveDocumentAndHistoryCell(
              births?.get(bookKeyOf(request.opId)),
            );
  } catch {
    birth = undefined;
  }
  const gesture: string =
    collectPlatformLiveDocumentAndHistoryAutoLift(payload, birth?.g ?? `other`) ??
    birth?.g ??
    `other`;
  const need: string =
    overrideNeed ??
    (reply.verdict === `deny`
      ? resolvePlatformLiveDocumentAndHistoryValue9(
          reply.data,
          refusalNeedWords(),
          reply.detail,
        )
      : `unsaid`);
  const operationCount: number =
    typeof request.ops == `number` && Number.isFinite(request.ops)
      ? Math.min(99, Math.max(1, Math.round(request.ops)))
      : 1;
  const [cellSelected, crossed] = [birth?.cell === true, birth?.cross === true];
  return {
    component: resolvePlatformLiveDocumentAndHistoryGesture({
      gesture: gesture,
      need: need,
      ops: operationCount,
      cell: resolvePlatformLiveDocumentAndHistoryValue8(birth),
      cross: crossed,
    }),
    gesture: gesture,
    need: need,
    nOps: operationCount,
    cellSel: cellSelected,
    crossed: crossed,
  };
}
export { bookKeyOf, operationShadowFields, operationSuffixPattern };

import type {
  RefusalClassification,
  RefusalObserverState,
  RefusalReply,
  RefusalRequest,
  RetryCounts,
} from "./contracts";
import { BREAKER_N, TRANSIENT_RETRY_MAX } from "./row-index";
export function createRetryState() {
  const state: RefusalObserverState = {
    down: null,
    trips: 0,
    strikes: 0,
    readsUnanswered: 0,
    createFails: 0,
    rows: 0,
    page: `live`,
    nodesGone: 0,
    emitted: 0,
    weathered: 0,
  };
  const counts = new Map<string, RetryCounts>();
  const goneNodes = new Set<string>();
  const trip = (reason: NonNullable<RefusalObserverState["down"]>): boolean =>
    state.down === null ? ((state.down = reason), (state.trips += 1), true) : false;
  const recover = (): undefined => {
    state.down = null;
    counts.clear();
    state.rows = 0;
    state.readsUnanswered = 0;
    state.createFails = 0;
  };
  const recordRefusal = (
    policy: RefusalClassification,
    context: RefusalRequest,
    reply: RefusalReply,
  ) => {
    if (policy.k === `page_terminal`) {
      state.page = policy.face;
      return false;
    }
    if (policy.k === `link_terminal` && policy.face === `node_gone`) {
      goneNodes.add(context.node ?? ``);
      state.nodesGone = goneNodes.size;
      return false;
    }
    if (context.road === `read`)
      return reply.verdict === `deny`
        ? false
        : ((state.readsUnanswered += 1),
          state.readsUnanswered >= TRANSIENT_RETRY_MAX && trip(`unreached`));
    if (context.road === `mint`)
      return policy.k === `transient`
        ? ((state.createFails += 1),
          state.createFails >= TRANSIENT_RETRY_MAX && trip(`unreached`))
        : false;
    const opId = context.opId ?? ``;
    const countsForOperation = counts.get(opId) ?? emptyRetryCounts();
    counts.set(opId, countsForOperation);
    state.rows = counts.size;
    switch (policy.k) {
      case `transient`:
        countsForOperation.transient += 1;
        return countsForOperation.transient >= policy.max && trip(`unreached`);
      case `lost`:
        countsForOperation.lost += 1;
        return countsForOperation.lost >= 1 + policy.max && trip(`unreached`);
      case `rehandshake`:
        countsForOperation.rehandshake += 1;
        return countsForOperation.rehandshake < 1 + policy.max
          ? false
          : policy.after.k === `link_terminal` &&
              policy.after.face === `session` &&
              trip(`signed_out`);
      case `bounded`:
        countsForOperation.bounded += 1;
        return countsForOperation.bounded === 1 + policy.max
          ? policy.after.k === `page_terminal`
            ? ((state.page = policy.after.face), false)
            : ((state.strikes += 1), state.strikes >= BREAKER_N && trip(`refusing`))
          : false;
      default:
        return false;
    }
  };
  return {
    state,
    trip,
    recover,
    recordRefusal,
    countsFor: (opId: string | undefined) =>
      opId === undefined ? undefined : counts.get(opId),
    clearCounts: () => counts.clear(),
  };
}
const emptyRetryCounts = (): RetryCounts => ({
  transient: 0,
  lost: 0,
  bounded: 0,
  rehandshake: 0,
});

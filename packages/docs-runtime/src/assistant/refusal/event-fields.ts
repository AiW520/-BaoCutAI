import type {
  RefusalObserverEnvironment,
  RefusalObserverState,
  RefusalRequest,
} from "./contracts";

export function refusalRequestFields(
  environment: RefusalObserverEnvironment,
  context: RefusalRequest,
  state: Readonly<RefusalObserverState>,
) {
  return {
    surface: environment.surface,
    page: environment.page,
    sess: environment.session?.() ?? ``,
    sc: environment.supportCode ?? ``,
    feBuild: environment.feBuild,
    doorBuild: environment.doorBuild?.() ?? ``,
    road: context.road,
    verb: context.verb,
    ...(context.opId === undefined
      ? {}
      : {
          opId: context.opId,
        }),
    ...(context.node === undefined
      ? {}
      : {
          node: context.node,
        }),
    ...(context.stream === true
      ? {
          stream: true,
        }
      : {}),
    ...(context.burst === undefined
      ? {}
      : {
          burst: context.burst,
        }),
    ...(context.replayed === true
      ? {
          replayed: true,
        }
      : {}),
    ...(context.lost === true
      ? {
          lost: true,
        }
      : {}),
    ...(context.tries === undefined
      ? {}
      : {
          tries: context.tries,
        }),
    ...(context.vis === undefined
      ? {}
      : {
          vis: context.vis,
        }),
    ...(typeof context.feedUp == `boolean`
      ? {
          feedUp: context.feedUp,
        }
      : {}),
    ...(context.gap === true
      ? {
          gap: true,
        }
      : {}),
    weathered: state.weathered,
    shadow: state.down === null ? `live` : `down`,
    down: state.down ?? ``,
    trips: state.trips,
    strikes: state.strikes,
    readsUnanswered: state.readsUnanswered,
    createFails: state.createFails,
    pageFace: state.page,
  };
}

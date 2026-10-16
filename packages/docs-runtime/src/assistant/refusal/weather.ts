import { observabilityTelemetrySet18 } from "../../platform/index";
import type {
  RefusalObserverEnvironment,
  RefusalReply,
  RefusalRequest,
  TransportRefusal,
  WeatherConditions,
} from "./contracts";
function transportCode(
  transport: TransportRefusal | null | undefined,
  reply: RefusalReply,
) {
  if (transport?.relay !== undefined && transport.relay !== `unrowed`) {
    const value = transport.relay.startsWith(`DEAD:`)
      ? `dead`
      : transport.relay.toLowerCase();
    return observabilityTelemetrySet18.has(value) ? value : `unknown`;
  }
  return transport?.http === undefined
    ? transport?.relay === `unrowed`
      ? `unknown`
      : reply.hung === true || reply.lost === true
        ? `timeout`
        : reply.reopens === true
          ? `reset`
          : `network`
    : transport.http >= 500
      ? `http_5xx`
      : transport.http >= 400
        ? `http_4xx`
        : `network`;
}
function weatherOf(
  request: RefusalRequest,
  readWeather: RefusalObserverEnvironment["weather"],
) {
  let weather: WeatherConditions = {};
  try {
    weather = readWeather?.() ?? {};
  } catch {}
  const fields = {
    ...(typeof weather.online == `boolean`
      ? {
          online: weather.online,
        }
      : {}),
    ...(typeof weather.laneOpen == `boolean`
      ? {
          laneOpen: weather.laneOpen,
        }
      : {}),
  };
  return {
    foul:
      request.vis === `hidden` ||
      request.vis === `idle` ||
      request.feedUp === false ||
      weather.online === false ||
      weather.laneOpen === false,
    fields,
  };
}
export { transportCode, weatherOf };

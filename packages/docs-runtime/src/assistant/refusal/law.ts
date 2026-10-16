import { classifyRefusal } from "./classification";
import {
  BREAKER_N,
  LOST_RETRY_MAX,
  REDIAL_AT,
  TRANSIENT_RETRY_MAX,
  UNKNOWN_RETRY_MAX,
} from "./row-index";
import { classifyTransportThrow } from "./transport";
const LAW = {
  classify: classifyRefusal,
  ofThrow: (input: unknown, options?: string) => {
    const value = classifyTransportThrow(input, options);
    return value.relay === `unrowed` &&
      !(input instanceof Error && input.name === `FrameSendError`)
      ? null
      : value.rep;
  },
  BREAKER_N,
  REDIAL_AT,
  TRANSIENT_RETRY_MAX,
  LOST_RETRY_MAX,
  UNKNOWN_RETRY_MAX,
};
export { LAW };

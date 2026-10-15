/** stamped-addresses-host: restored from stampedAddressesHost-csrBySP9.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import { cj as resolvePlatformSessionAndSourcesTest4 } from "../platform/index";
import { b as parseCensusReport, w as useCensusStore } from "../platform/lazy";
function takeStampedAddresses(
  fileId?: Dynamic,
  snapshot?: Dynamic,
  addressOf?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let stamp: Dynamic = parseCensusReport(
    snapshot,
    (stampedAddresses?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformSessionAndSourcesTest4(stampedAddresses, addressOf),
  );
  if (stamp !== null) {
    useCensusStore.getState().set(fileId, stamp.nodeId, stamp.census);
  }
}
function forgetStampedAddresses(
  fileId?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  useCensusStore.getState().clearFile(fileId);
}
export { forgetStampedAddresses, takeStampedAddresses };

/** BaoCut: document export from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  observabilityBrowserAndOperationEventsPattern,
} from "../dependencies";
import {
  exportToolTelemetryLabel,
} from "../ask-cards/document-posture-badge";

function documentExportTelemetryEvent(
  documentExportTelemetryEvent2?: Dynamic,
  fileId?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dims: Dynamic = {
    format: documentExportTelemetryEvent2.format,
    road: documentExportTelemetryEvent2.road,
    outcome: documentExportTelemetryEvent2.outcome,
    renderMs: documentExportTelemetryEvent2.renderMs,
    simplified: documentExportTelemetryEvent2.simplified,
  };
  if (documentExportTelemetryEvent2.reason !== undefined) {
    dims.reason = documentExportTelemetryEvent2.reason;
  }
  if (documentExportTelemetryEvent2.deliverMs !== undefined) {
    dims.deliverMs = documentExportTelemetryEvent2.deliverMs;
  }
  if (documentExportTelemetryEvent2.bytes !== undefined) {
    dims.bytes = documentExportTelemetryEvent2.bytes;
  }
  if (documentExportTelemetryEvent2.relayFit !== undefined) {
    dims.relayFit = documentExportTelemetryEvent2.relayFit;
  }
  let plat: Dynamic =
    context !== undefined &&
    observabilityBrowserAndOperationEventsPattern.test(context)
      ? context
      : undefined;
  let rowKey: Dynamic = exportToolTelemetryLabel(documentExportTelemetryEvent2);
  let fields: Dynamic = {
    ...dims,
    exportStage: documentExportTelemetryEvent2.stage,
    ...(documentExportTelemetryEvent2.rawCode !== undefined && {
      exportCode: documentExportTelemetryEvent2.rawCode,
    }),
    ...(documentExportTelemetryEvent2.tool !== undefined && {
      driveTool: documentExportTelemetryEvent2.tool,
    }),
    ...(documentExportTelemetryEvent2.shape !== undefined && {
      driveShape: documentExportTelemetryEvent2.shape,
    }),
    ...(documentExportTelemetryEvent2.failClass !== undefined && {
      driveClass: documentExportTelemetryEvent2.failClass,
    }),
    ...(fileId !== undefined && {
      fileId: fileId,
    }),
    ...(plat !== undefined && {
      plat: plat,
    }),
  };
  let wire: Dynamic = {
    ...(plat !== undefined && {
      word: plat,
    }),
    ...(rowKey !== undefined && {
      rowKey: rowKey,
    }),
  };
  return {
    name: `pages.export.settled`,
    fields: fields,
    key: `${documentExportTelemetryEvent2.format}:${documentExportTelemetryEvent2.road}:${documentExportTelemetryEvent2.outcome}`,
    dims: dims,
    ...(Object.keys(wire).length > 0 && {
      wire: wire,
    }),
  };
}

export { documentExportTelemetryEvent };

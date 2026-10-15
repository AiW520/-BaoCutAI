/** BaoCut: room document page from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  widgetBridgeLimit20000,
} from "../widget-bridge/widget-sample-card";

var documentSourcePromptMap: Dynamic;

function updateDocumentSourcePromptDelete(
  updateDocumentSourcePromptDelete2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(updateDocumentSourcePromptDelete2 === undefined || options === undefined)
  ) {
    documentSourcePromptMap.delete(updateDocumentSourcePromptDelete2);
    documentSourcePromptMap.set(updateDocumentSourcePromptDelete2, options);
    if (documentSourcePromptMap.size > 16) {
      documentSourcePromptMap.delete(
        documentSourcePromptMap.keys().next().value,
      );
    }
  }
}

function clearDocumentSourcePromptPressedAt(
  clearDocumentSourcePromptPressed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pressedAt: Dynamic = documentSourcePromptMap.get(
    clearDocumentSourcePromptPressed,
  );
  documentSourcePromptMap.delete(clearDocumentSourcePromptPressed);
  return pressedAt === undefined
    ? {}
    : {
        pressedAt: pressedAt,
      };
}

function resolveDocumentSourcePromptTop(
  documentSourcePrompt?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!documentSourcePrompt || typeof documentSourcePrompt != `object`)
    return null;
  let documentSourcePrompt2: Dynamic = documentSourcePrompt;
  let isFinite2: Dynamic = (
    documentSourcePrompt3?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof documentSourcePrompt3 == `number` &&
    Number.isFinite(documentSourcePrompt3)
      ? Math.max(
          -widgetBridgeLimit20000,
          Math.min(widgetBridgeLimit20000, documentSourcePrompt3),
        )
      : null;
  let top: Dynamic = isFinite2(documentSourcePrompt2.top);
  let left: Dynamic = isFinite2(documentSourcePrompt2.left);
  let isFinite3: Dynamic = isFinite2(documentSourcePrompt2.width);
  let isFinite4: Dynamic = isFinite2(documentSourcePrompt2.height);
  if (top === null || left === null || isFinite3 === null || isFinite4 === null)
    return null;
  let line: Dynamic = isFinite2(documentSourcePrompt2.line);
  return {
    top: top,
    left: left,
    width: Math.max(0, isFinite3),
    height: Math.max(0, isFinite4),
    ...(line !== null && {
      line: line,
    }),
  };
}

var documentSourcePromptLimit400: number;

var documentSourcePromptLimit250: number;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeRoomDocumentPageState3Step1(): void {
  (documentSourcePromptMap = new (Map as Dynamic)());
  (documentSourcePromptLimit400 = 400);
  (documentSourcePromptLimit250 = 250);
}

export {
  clearDocumentSourcePromptPressedAt,
  documentSourcePromptLimit250,
  documentSourcePromptLimit400,
  resolveDocumentSourcePromptTop,
  updateDocumentSourcePromptDelete,
};

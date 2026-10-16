/** BaoCut: room document page from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  filterCommentsStoreTargetWords,
  resolveCommentsStoreNode,
} from "../dependencies";
import {
  ChartLineSwatch,
} from "../comment-components/comment-editor";
import type * as React from "react";

export const LdocCommentDraftClamped: React.FC<
  Readonly<Record<string, unknown>>
> = () => {
  return (
    <div
      className={`text-muted text-caption mb-2`}
      data-testid={`ldoc-comment-draft-clamped`}
    >
      {DocumentSourcePrompt_Message}
    </div>
  );
};

export const UseDocumentSourcePromptDraftComponent: React.FC<Dynamic> = ({
  draft: draft,
}) => {
  let useDocumentSourcePromptDraftResult: Dynamic = filterCommentsStoreTargetWords(
    draft.words,
  );
  let text: Dynamic = resolveDocumentSourcePromptComponent(
    draft,
    useDocumentSourcePromptDraftResult,
  );
  return text ? (
    <ChartLineSwatch
      line={{
        text: text,
        color:
          useDocumentSourcePromptDraftResult === null
            ? undefined
            : draft.words?.row?.color,
      }}
      testid={`draft-datum-readout`}
    />
  ) : null;
};

var DocumentSourcePrompt_Message: string;

function resolveDocumentSourcePromptComponent(
  request?: Dynamic,
  options: Dynamic = filterCommentsStoreTargetWords(request.words),
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    options ??
    resolveCommentsStoreNode({
      component: request.segment,
      ...(request.citation !== null && typeof request.citation == `object`
        ? request.citation
        : {}),
    }) ??
    null
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeRoomDocumentPageUseDocumentSourcePromptDraftComponentStep1(): void {
  (DocumentSourcePrompt_Message = `Long selection — your comment will attach to the beginning of it.`);
}

export { resolveDocumentSourcePromptComponent };

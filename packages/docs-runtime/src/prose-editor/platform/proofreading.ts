/** BaoCut: editor proofreading from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  lazyZod,
} from "../../platform/data/lazy-zod";

var editorProofreadingBodyCellItemHeadingValues: string[];

var resolveEditorProofreadingIncludes: Dynamic;

var editorProofreadingPattern: RegExp;

var editorProofreadingPattern2: RegExp;

var editorProofreadingPattern3: RegExp;

var resolveEditorProofreadingReplace: Dynamic;

function resolveEditorProofreadingIndexOf(
  items?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let index = 0;
  let count: number = 0;
  for (; count < items.length; ) {
    let itemIndex: Dynamic = items.indexOf(options, count);
    if (itemIndex === -1) return -1;
    index++;
    if (index === context) return itemIndex;
    count = itemIndex + 1;
  }
  return -1;
}

function resolveEditorProofreadingValue(
  editorProofreadingValue?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorProofreadingIndexOf: Dynamic = resolveEditorProofreadingIndexOf(
    editorProofreadingValue,
    options,
    context,
  );
  return editorProofreadingIndexOf === -1 && context > 1
    ? resolveEditorProofreadingIndexOf(editorProofreadingValue, options, 1)
    : editorProofreadingIndexOf;
}

function resolveEditorProofreadingBody(
  editorProofreadingBody?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    editorProofreadingBody !== undefined &&
    editorProofreadingBody !== `body` &&
    !editorProofreadingPattern2.test(options)
  );
}

function isEditorProofreadingFragment(
  editorProofreadingFragment?: Dynamic,
  entry?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!resolveEditorProofreadingBody(editorProofreadingFragment, context))
    return false;
  if (entry.kind === `fragment`) return true;
  let editorProofreadingValue: Dynamic = resolveEditorProofreadingValue(
    context,
    entry.quote,
    entry.occurrence,
  );
  if (editorProofreadingValue === -1) return false;
  let matchesTrimmedContextSlice =
    context.slice(0, editorProofreadingValue).trim() === ``;
  let matchesTrimmedContextSlice2 =
    context.slice(editorProofreadingValue + entry.quote.length).trim() === ``;
  let charAt: Dynamic = entry.quote.charAt(0);
  let matchesTrimmedContextSlice3 =
    matchesTrimmedContextSlice &&
    entry.replacement.charAt(0) === charAt.toUpperCase() &&
    !editorProofreadingPattern3.test(
      /^[a-z'’]+/iu.exec(entry.quote)?.[0] ?? ``,
    );
  let quote: Dynamic = entry.quote;
  let total: Dynamic = matchesTrimmedContextSlice3
    ? charAt + entry.replacement.slice(1)
    : entry.replacement;
  return (
    quote === total ||
    (matchesTrimmedContextSlice2 &&
      (resolveEditorProofreadingReplace(total) === quote ||
        resolveEditorProofreadingReplace(quote) === total))
  );
}

var EditorProofreadingBody: Dynamic;

var EditorProofreadingParagraphId: Dynamic;

var EditorProofreadingMessage: string;

function collectEditorProofreadingBody(
  collectEditorProofreadingBody2?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = items.length
    ? `\nDo not flag these user-dictionary words (any casing): ${items.join(`, `)}`
    : ``;
  return `Proofread the paragraphs below. Report ONLY objective issues: misspellings (contextual — "their/there" counts), grammar errors, and sentence fragments. Never rewrite for style, tone, clarity, or concision. Mark confidence "certain" only when the fix is unambiguous (a typo with one correct form); anything a competent writer might have intended is "unsure". For each issue give the exact quote as it appears, the occurrence number of that exact quote string within its paragraph (1 for the first time that quote appears in the paragraph, 2 only if the same quote appears again later — usually 1), and the full replacement text. The replacement is ONLY the corrected text that takes the quote's place in the sentence — never advice, instructions, examples, questions, or commentary about the text; if no direct replacement exists, do not report the issue. Sentence fragments are NEVER "certain" (completing one requires guessing intent) — report them as "unsure" with your best completion.${collectEditorProofreadingBody2.some((rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) => rolldownNImport2.role !== undefined && rolldownNImport2.role !== `body`) ? EditorProofreadingMessage : ``}${label}\n\n${collectEditorProofreadingBody2.map(
    (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
      `<paragraph id="${rolldownNImport2.id}"${EditorProofreadingBody[rolldownNImport2.role ?? `body`]}>\n${rolldownNImport2.text}\n</paragraph>`,
  ).join(`
`)}`;
}

var EditorProofreadingStyles: string;

function resolveEditorProofreadingValue2(
  editorProofreadingValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    collectEditorProofreadingBody(editorProofreadingValue2, options) +
    EditorProofreadingStyles
  );
}

function getEditorProofreadingIssues(
  editorProofreadingIssues?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let safeParse: Dynamic = lazyZod
    .object({
      issues: lazyZod.array(lazyZod.unknown()),
    })
    .safeParse(editorProofreadingIssues);
  if (!safeParse.success) return [];
  let lookup: Dynamic = new (Map as Dynamic)(
    options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        option.id,
        option,
      ],
    ),
  );
  let items: Dynamic = [];
  for (let getEditorProofreadingIssuesResult of safeParse.data
    .issues as Dynamic) {
    let safeParse2: Dynamic = EditorProofreadingParagraphId.safeParse(
      getEditorProofreadingIssuesResult,
    );
    if (!safeParse2.success) continue;
    let lookupEntry: Dynamic = lookup.get(safeParse2.data.paragraphId);
    if (
      lookupEntry === undefined ||
      safeParse2.data.quote === safeParse2.data.replacement ||
      isEditorProofreadingFragment(
        lookupEntry.role,
        safeParse2.data,
        lookupEntry.text,
      )
    )
      continue;
    let record2: Dynamic = {
      ...safeParse2.data,
    };
    if (
      record2.confidence === `certain` &&
      (record2.kind === `fragment` ||
        record2.replacement.length > record2.quote.length * 3 + 12)
    ) {
      record2.confidence = `unsure`;
    }
    items.push(record2);
  }
  return items;
}

function resolveEditorProofreadingExec(
  editorProofreadingExec?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = /```(?:json)?\s*([\s\S]*?)```/i.exec(editorProofreadingExec);
  let trimmedMatchItem: Dynamic = (
    match ? match[1] : editorProofreadingExec
  ).trim();
  let trimmedMatchItemIndex: Dynamic = trimmedMatchItem.indexOf(`{`);
  let lastIndexOf: Dynamic = trimmedMatchItem.lastIndexOf(`}`);
  if (trimmedMatchItemIndex < 0 || lastIndexOf <= trimmedMatchItemIndex)
    return null;
  try {
    return JSON.parse(
      trimmedMatchItem.slice(trimmedMatchItemIndex, lastIndexOf + 1),
    );
  } catch {
    return null;
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorProofreadingStep1(): void {
  (editorProofreadingBodyCellItemHeadingValues = [
    `body`,
    `cell`,
    `item`,
    `heading`,
  ]);
  (resolveEditorProofreadingIncludes = (
    editorProofreadingIncludes?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorProofreadingIncludes == `string` &&
    editorProofreadingBodyCellItemHeadingValues.includes(
      editorProofreadingIncludes,
    )
      ? editorProofreadingIncludes
      : undefined);
  (editorProofreadingPattern = /[\s.!?…:;。]+$/u);
  (editorProofreadingPattern2 = /[.!?…。][)"'’”»\]]*\s*$/u);
  (editorProofreadingPattern3 = /^i(?:['’][a-z]+)?$/u);
  (resolveEditorProofreadingReplace = (
    editorProofreadingReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorProofreadingReplace.replace(editorProofreadingPattern, ``));
  (EditorProofreadingBody = {
    body: ``,
    cell: ` role="table-cell"`,
    item: ` role="list-item"`,
    heading: ` role="heading"`,
  });
  (EditorProofreadingParagraphId = lazyZod.object({
    paragraphId: lazyZod.string().min(1),
    quote: lazyZod.string().min(1).max(500),
    occurrence: lazyZod.number().int().min(1),
    kind: lazyZod.enum([`spelling`, `grammar`, `fragment`]),
    replacement: lazyZod.string().max(1e3),
    confidence: lazyZod.enum([`certain`, `unsure`]),
    note: lazyZod.string().max(300).optional(),
  }));
  (EditorProofreadingMessage = ` A paragraph whose tag carries a role attribute (table-cell, list-item, heading) is a label, note, or heading rather than running prose. If it is not written as a full sentence (it does not already end in a period, question mark, or exclamation mark), then missing end punctuation, a missing subject or verb, or a lowercase start is NOT an issue there — never report it as a fragment, never add end punctuation to it, and never sentence-case it. Still report misspellings and genuine grammar errors inside every paragraph.`);
  (EditorProofreadingStyles = `

Respond with ONLY a JSON object and nothing else — no prose, no code fence. Shape: {"issues": [{"paragraphId": "<id from the paragraph tag>", "quote": "<exact text>", "occurrence": <1-based integer>, "kind": "spelling" | "grammar" | "fragment", "replacement": "<corrected text>", "confidence": "certain" | "unsure", "note": "<optional short reason>"}]}. No issues: {"issues": []}.`);
}

export {
  getEditorProofreadingIssues,
  resolveEditorProofreadingExec,
  resolveEditorProofreadingIncludes,
  resolveEditorProofreadingValue2,
};

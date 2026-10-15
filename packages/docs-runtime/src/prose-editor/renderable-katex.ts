/** renderable-katex: restored from renderableKatex-D77CCXnD.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import * as npmDependency0 from "katex";
const renderToString = (npmDependency0).renderToString;
import { Lu as resolveEditorHostReplace } from "../platform/index";
var allowedMathClassPattern: Dynamic = /^bongo-(hl|eq)-[a-z0-9-]+$/;
var allowedEquationIdPattern: Dynamic = /^bongo-eq-[a-z0-9-]+$/;
function isTrustedMathHtmlCommand(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.command === `\\htmlClass`
    ? allowedMathClassPattern.test(input.class ?? ``)
    : input.command === `\\htmlId`
      ? allowedEquationIdPattern.test(input.id ?? ``)
      : false;
}
var trustedMathRenderOptions: Dynamic = {
  displayMode: true,
  output: `htmlAndMathml`,
  trust: isTrustedMathHtmlCommand,
  strict: (..._extraArguments: unknown[]) => `ignore`,
  throwOnError: true,
};
function renderMathError(input?: Dynamic, ..._extraArguments: unknown[]) {
  return `<span class="katex-error">${resolveEditorHostReplace(input)}</span>`;
}
function renderLatexMathml(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return renderToString(input, {
      ...trustedMathRenderOptions,
      output: `mathml`,
      trust: (..._extraArguments: unknown[]) => false,
    });
  } catch {
    return renderMathError(input);
  }
}
export { renderLatexMathml };

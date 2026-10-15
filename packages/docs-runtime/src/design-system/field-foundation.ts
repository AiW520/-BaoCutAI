/** BaoCut: field foundation from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiTooltipsAndControlsPanel,
  resolveUiDesignSystemValue2,
  resolveUiProviderAndLayersUseContext6,
  resolveUiTooltipsAndControlsValue3,
} from "./dependencies";

var fieldSurfaceClasses: Dynamic;

var fieldHoverClasses: Dynamic;

var FieldStylesState: Dynamic;

var FieldStylesStyles: Dynamic;

var textAreaSurfaceClasses: Dynamic;

var FieldStylesState2: Dynamic;

var FieldStylesParseInt: Dynamic;

var FieldStylesIsFinite: Dynamic;

function inertProps(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return input
    ? {
        inert: FieldStylesIsFinite ? true : ``,
      }
    : {};
}

var CommentCardContext: Dynamic;

function useCommentCardContext(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(CommentCardContext);
}

function commentCardSurfaceClasses(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveUiDesignSystemValue2(
    resolveUiTooltipsAndControlsValue3(`panel`),
    input && `shadow-panel`,
  );
}

function isElevatedSurface(..._extraArguments: unknown[]): boolean {
  let value: Dynamic = resolveUiProviderAndLayersUseContext6();
  return (
    value === UiTooltipsAndControlsPanel.panel ||
    value === UiTooltipsAndControlsPanel.popover
  );
}

var FieldStylesCreateContext: Dynamic;

function isFieldStylesIsValidElement(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (!(0, React.isValidElement)(input)) return false;
  let displayName: Dynamic = input.type.displayName;
  return (
    input.type === options ||
    (displayName !== undefined && displayName === options.displayName)
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeFieldFoundationStep1(): void {
  fieldSurfaceClasses = `bg-fill-field shadow-field-ring data-[invalid]:shadow-field-invalid`;
  fieldHoverClasses = `[&:hover:not(:focus-visible):not(:has(:focus-visible)):not([data-invalid]):not([data-disabled])]:shadow-field-hover`;
  FieldStylesState = `h-control pl-md rounded ${fieldSurfaceClasses} font-sans text-body font-normal text-primary transition duration-fast`;
  FieldStylesStyles = `cds-input cds-reset min-w-0 flex-1 h-full bg-transparent border-0 p-0 outline-none focus-visible:outline-hidden text-body font-normal text-primary focus-visible:shadow-none placeholder:text-muted disabled:opacity-disabled`;
  textAreaSurfaceClasses = `rounded ${fieldSurfaceClasses} px-md py-sm transition duration-fast`;
  FieldStylesState2 = `${textAreaSurfaceClasses} [&:hover:not(:focus-within):not([data-invalid]):not([data-disabled])]:shadow-field-hover focus-within:shadow-focus data-[invalid]:focus-within:shadow-focus-danger font-sans text-body text-primary`;
  FieldStylesParseInt = Number.parseInt(React.version, 10);
  FieldStylesIsFinite =
    !Number.isFinite(FieldStylesParseInt) ||
    FieldStylesParseInt === 0 ||
    FieldStylesParseInt >= 19;
  CommentCardContext = (0, React.createContext)({
    expanded: false,
    readOnly: false,
    touch: false,
  });
  FieldStylesCreateContext = (0, React.createContext)(false);
}

export {
  CommentCardContext,
  FieldStylesCreateContext,
  FieldStylesState,
  FieldStylesState2,
  FieldStylesStyles,
  commentCardSurfaceClasses,
  fieldHoverClasses,
  fieldSurfaceClasses,
  inertProps,
  isElevatedSurface,
  isFieldStylesIsValidElement,
  textAreaSurfaceClasses,
  useCommentCardContext,
};

import {
  jsx as reactJsx,
  jsxs as reactJsxs,
  Fragment,
} from "react/jsx-runtime";
import type { JSX as ReactJSX, ElementType, Key } from "react";
import type { UnknownRecord } from "../serialization/value-contracts";
export { Fragment };
const invocation = Symbol("original React invocation");
type CapturedCall =
  | { family: "jsx"; config: unknown; key: unknown; many: boolean }
  | { family: "classic"; config: unknown; children: readonly unknown[] };
export interface CapturedProps {
  readonly [invocation]: CapturedCall;
}
export function originalJsxProps(
  config: unknown,
  key?: unknown,
): CapturedProps {
  return { [invocation]: { family: "jsx", config, key, many: false } };
}
export function originalJsxsProps(
  config: unknown,
  key?: unknown,
): CapturedProps {
  return { [invocation]: { family: "jsx", config, key, many: true } };
}
export function originalElementProps(
  config: unknown,
  ...children: unknown[]
): CapturedProps {
  return { [invocation]: { family: "classic", config, children } };
}
/** Compatibility data only: application components still render ordinary JSX. */
function classicProps(
  type: ReactJSX.ElementType,
  config: unknown,
  children: readonly unknown[],
) {
  const props: Record<string, unknown> = {};
  let key: unknown = undefined;
  if (config != null) {
    const source = config as UnknownRecord;
    const development = process.env.NODE_ENV !== "production";
    const getter = Object.getOwnPropertyDescriptor(source, "key")?.get as
      | (Function & { isReactWarning?: boolean })
      | undefined;
    if (!(development && getter?.isReactWarning) && source.key !== undefined) {
      if (development) {
        void ("" + source.key);
      }
      key = "" + source.key;
    }
    for (const name in source)
      if (
        Object.prototype.hasOwnProperty.call(source, name) &&
        !["key", "__self", "__source"].includes(name)
      )
        props[name] = source[name];
  }
  if (children.length === 1) props.children = children[0];
  else if (children.length > 1) props.children = [...children];
  const component = type as { defaultProps?: UnknownRecord };
  if (type && component.defaultProps) {
    const defaults = component.defaultProps;
    for (const name in defaults)
      if (props[name] === undefined) props[name] = defaults[name];
  }
  return { props, key };
}
function render(
  type: ReactJSX.ElementType,
  config: unknown,
  key: unknown,
  many: boolean,
): ReactJSX.Element {
  const captured =
    config && typeof config === "object"
      ? (config as Partial<CapturedProps>)[invocation]
      : undefined;
  const factory = many ? reactJsxs : reactJsx;
  if (!captured)
    return factory(type as ElementType, config, key as Key | undefined);
  if (captured.family === "jsx")
    return (captured.many ? reactJsxs : reactJsx)(
      type as ElementType,
      captured.config,
      captured.key as Key | undefined,
    );
  const normalized = classicProps(type, captured.config, captured.children);
  const classicFactory = captured.children.length > 1 ? reactJsxs : reactJsx;
  if (!Object.hasOwn(normalized.props, "key"))
    return classicFactory(
      type as ElementType,
      normalized.props,
      normalized.key as Key | undefined,
    );
  // Legacy defaultProps may add a props.key independently of the element's own key.
  const renderProps = { ...normalized.props };
  delete renderProps.key;
  const element = classicFactory(
    type as ElementType,
    renderProps,
    normalized.key as Key | undefined,
  );
  const descriptors = Object.getOwnPropertyDescriptors(element);
  descriptors.props = { ...descriptors.props, value: normalized.props };
  const result = Object.defineProperties(
    Object.create(Object.getPrototypeOf(element)),
    descriptors,
  ) as ReactJSX.Element;
  if (Object.isFrozen(element)) {
    Object.freeze(normalized.props);
    Object.freeze(result);
  }
  return result;
}
export function jsx(
  type: ReactJSX.ElementType,
  props: unknown,
  key?: unknown,
): ReactJSX.Element {
  return render(type, props, key, false);
}
export function jsxs(
  type: ReactJSX.ElementType,
  props: unknown,
  key?: unknown,
): ReactJSX.Element {
  return render(type, props, key, true);
}
export function jsxDEV(
  type: ReactJSX.ElementType,
  props: unknown,
  key?: unknown,
  staticChildren = false,
): ReactJSX.Element {
  return render(type, props, key, staticChildren);
}
export namespace JSX {
  export type Element = ReactJSX.Element;
  export type ElementType = ReactJSX.ElementType;
  export type ElementClass = ReactJSX.ElementClass;
  export type ElementAttributesProperty = ReactJSX.ElementAttributesProperty;
  export type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute;
  export type LibraryManagedAttributes<C, P> =
    | ReactJSX.LibraryManagedAttributes<C, P>
    | CapturedProps;
  export interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {
    readonly [invocation]?: CapturedCall;
  }
  export type IntrinsicClassAttributes<T> =
    ReactJSX.IntrinsicClassAttributes<T>;
  export type IntrinsicElements = {
    [Tag in keyof ReactJSX.IntrinsicElements]:
      | ReactJSX.IntrinsicElements[Tag]
      | CapturedProps;
  };
}

declare module "react" {
  interface CSSProperties {
    [name: `--${string}`]: string | number | undefined;
  }
}

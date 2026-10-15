/** rolldown-runtime: restored from rolldown-runtime-QTnfLwEv.js. */
import type {
  CommonJsState,
  CommonJsInitializer,
  LiveNamespace,
  ModuleNamespace,
  LiveDescriptor,
} from "./module-contracts";
import type { UnknownRecord } from "../serialization/value-contracts";
var createObject: (prototype: object | null) => UnknownRecord = Object.create;
var defineProperty: <Target extends object>(
  target: Target,
  key: PropertyKey,
  descriptor: LiveDescriptor,
) => Target = Object.defineProperty;
var getOwnPropertyDescriptor: (
  object: unknown,
  key: PropertyKey,
) => LiveDescriptor | undefined = Object.getOwnPropertyDescriptor;
var getOwnPropertyNames: (object: unknown) => string[] =
  Object.getOwnPropertyNames;
var getPrototypeOf: (object: unknown) => object | null = Object.getPrototypeOf;
var hasOwnProperty: (this: unknown, key: PropertyKey) => boolean =
  Object.prototype.hasOwnProperty;
var initializeCommonJS =
  <Exports extends object = UnknownRecord>(
    input: CommonJsInitializer<Exports> | null,
    options?: CommonJsState<Exports>,
  ): (() => Partial<Exports>) =>
  () => (
    options ||
      (input!(
        (options = {
          exports: {} as Partial<Exports>,
        }).exports,
        options,
      ),
      (input = null)),
    options.exports
  );
var createLiveModuleNamespace = <Getters extends Record<string, () => unknown>>(
  input: Getters,
  options?: boolean | 0 | 1,
): LiveNamespace<Getters> => {
  let state: UnknownRecord = {};
  for (var value in input)
    defineProperty(state, value, {
      get: input[value],
      enumerable: true,
    });
  if (!options) {
    defineProperty(state, Symbol.toStringTag, {
      value: `Module`,
    });
  }
  return state as LiveNamespace<Getters>;
};
var copyLiveProperties = <Target extends object>(
  input: Target,
  options: unknown,
  context?: PropertyKey,
  value?: LiveDescriptor,
): Target => {
  if ((options && typeof options == `object`) || typeof options == `function`)
    for (
      var value2 = getOwnPropertyNames(options),
        index = 0,
        length = value2.length,
        value3: string;
      index < length;
      index++
    ) {
      value3 = value2[index];
      if (!hasOwnProperty.call(input, value3) && value3 !== context) {
        defineProperty(input, value3, {
          get: ((input2: string) => (options as UnknownRecord)[input2]).bind(
            null,
            value3,
          ),
          enumerable:
            !(value = getOwnPropertyDescriptor(options, value3)) ||
            value.enumerable,
        });
      }
    }
  return input;
};
var toModuleNamespace = <
  Value,
  Node extends boolean | 0 | 1 | undefined = undefined,
>(
  input: Value,
  options?: Node,
  context?: UnknownRecord,
): ModuleNamespace<Value, Node> =>
  ((context = input == null ? {} : createObject(getPrototypeOf(input))),
  copyLiveProperties(
    options ||
      !input ||
      !(
        input as {
          __esModule?: unknown;
        }
      ).__esModule
      ? defineProperty(context, `default`, {
          value: input,
          enumerable: true,
        })
      : context,
    input,
  )) as ModuleNamespace<Value, Node>;
export { createLiveModuleNamespace, toModuleNamespace, initializeCommonJS };

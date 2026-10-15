import type { UnknownRecord } from "./common";
export interface CommonJsState<Exports extends object> {
  exports: Partial<Exports>;
}
export type CommonJsInitializer<Exports extends object> = (
  exports: Partial<Exports>,
  module: CommonJsState<Exports>,
) => void;
export type LiveNamespace<Getters extends Record<string, () => unknown>> = {
  readonly [Key in keyof Getters as Key extends string | number
    ? Key
    : never]: ReturnType<Getters[Key]>;
};
export type ForcedNamespace<Value> = Value extends object
  ? Readonly<Omit<Value, "default">> & { readonly default: Value }
  : { readonly default: Value };
export type ModuleNamespace<
  Value,
  Node extends boolean | 0 | 1 | undefined,
> = Node extends true | 1
  ? ForcedNamespace<Value>
  : unknown extends Value
    ? Readonly<UnknownRecord>
    : Value extends { __esModule: true }
      ? Readonly<Value>
      : "__esModule" extends keyof Value
        ? Readonly<Value> | ForcedNamespace<Value>
        : ForcedNamespace<Value>;
export interface LiveDescriptor {
  value?: unknown;
  get?: () => unknown;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

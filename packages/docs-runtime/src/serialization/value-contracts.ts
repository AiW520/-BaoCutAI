/** Values crossing the document/storage boundary must be serializable. */
export type JsonValue = null | boolean | number | string | JsonObject | readonly JsonValue[];
export interface JsonObject { readonly [key: string]: JsonValue }
export type UnknownRecord = Record<string, unknown>;

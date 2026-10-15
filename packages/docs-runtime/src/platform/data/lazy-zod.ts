/** BaoCut: data lazy zod from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BITS29,
  XmlElement,
  XmlText,
  array,
  boolean,
  custom,
  date,
  discriminatedUnion,
  int,
  iso,
  json,
  lazy,
  literal,
  looseObject,
  never,
  number,
  object,
  partialRecord,
  preprocess,
  record,
  strictObject,
  string,
  templateLiteral,
  tuple,
  unexpectedCase,
  union,
  unknown,
  value_enum,
  value_null,
} from "../dependencies";
import {
  DataEnumsAndValidationStatus,
} from "./enums-and-validation";

var LAZY_ZOD_REAL_SYMBOL: Dynamic;

var lazySchemaRecordedCount: number;

var lazySchemaBuiltCount: number;

var lazySchemaBuildMilliseconds: Dynamic;

var lazySchemaBuildDepth: number;

var lazySchemaEagerMode: boolean;

var schemaPerformanceNow: Dynamic;

function resolveLazyZodSchema(
  lazyZodSchema?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (lazyZodSchema.real !== null) return lazyZodSchema.real;
  if (lazyZodSchema.building)
    throw Error(
      `lazyZod: a schema's definition reached itself while it was being built — use z.lazy(() => …)`,
    );
  let build: Dynamic = lazyZodSchema.build;
  lazyZodSchema.building = true;
  let schemaPerformanceNow2: Dynamic =
    lazySchemaBuildDepth === 0 ? schemaPerformanceNow() : 0;
  lazySchemaBuildDepth++;
  try {
    lazyZodSchema.real = build();
    lazyZodSchema.build = null;
    lazySchemaBuiltCount++;
  } finally {
    lazySchemaBuildDepth--;
    lazyZodSchema.building = false;
    if (lazySchemaBuildDepth === 0) {
      lazySchemaBuildMilliseconds +=
        schemaPerformanceNow() - schemaPerformanceNow2;
    }
  }
  return lazyZodSchema.real;
}

var dataLazyZodSet: Dynamic;

var dataLazyZodSet2: Dynamic;

var DataLazyZodGet: Dynamic;

function createLazyZodSchema(
  build?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return lazySchemaEagerMode
    ? build()
    : (lazySchemaRecordedCount++,
      new (Proxy as Dynamic)(
        {
          build: build,
          real: null,
          building: false,
        },
        DataLazyZodGet,
      ));
}

function isLazyZodSchema(
  lazyZodSchema?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof lazyZodSchema != `object` || !lazyZodSchema) return false;
  try {
    return LAZY_ZOD_REAL_SYMBOL in lazyZodSchema;
  } catch {
    return false;
  }
}

function unwrapLazyZodSchema(
  unwrapLazyZodSchema2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return isLazyZodSchema(unwrapLazyZodSchema2)
    ? unwrapLazyZodSchema2[LAZY_ZOD_REAL_SYMBOL]
    : unwrapLazyZodSchema2;
}

var resolveDataLazyZodGetPrototypeOf: Dynamic;

function resolveLazySchemaArguments(
  lazySchemaArguments?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof lazySchemaArguments != `object` || !lazySchemaArguments)
    return lazySchemaArguments;
  if (isLazyZodSchema(lazySchemaArguments))
    return unwrapLazyZodSchema(lazySchemaArguments);
  if (Array.isArray(lazySchemaArguments)) {
    if (options?.has(lazySchemaArguments)) return lazySchemaArguments;
    let add2: Dynamic = (options ??= new (Set as Dynamic)()).add(
      lazySchemaArguments,
    );
    return lazySchemaArguments.map(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveLazySchemaArguments(rolldownNImport2, add2),
    );
  }
  if (
    !resolveDataLazyZodGetPrototypeOf(lazySchemaArguments) ||
    options?.has(lazySchemaArguments)
  )
    return lazySchemaArguments;
  let add: Dynamic = (options ??= new (Set as Dynamic)()).add(
    lazySchemaArguments,
  );
  let create2: Dynamic = Object.create(
    Object.getPrototypeOf(lazySchemaArguments),
  );
  for (let resolveLazySchemaArgumentsResult of Reflect.ownKeys(
    lazySchemaArguments,
  ) as Dynamic) {
    let ownPropertyDescriptor: Dynamic = Object.getOwnPropertyDescriptor(
      lazySchemaArguments,
      resolveLazySchemaArgumentsResult,
    );
    if (`value` in ownPropertyDescriptor)
      ownPropertyDescriptor.value = resolveLazySchemaArguments(
        ownPropertyDescriptor.value,
        add,
      );
    else if (ownPropertyDescriptor.get !== undefined) {
      let get2: Dynamic = ownPropertyDescriptor.get;
      ownPropertyDescriptor.get = function (
        this: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return resolveLazySchemaArguments(get2.call(this));
      };
    }
    Object.defineProperty(
      create2,
      resolveLazySchemaArgumentsResult,
      ownPropertyDescriptor,
    );
  }
  return create2;
}

var wrapLazyZodFactory: Dynamic;

var lazyZodConstructors: Dynamic;

var lazyZodStatics: Dynamic;

var lazyZod: Dynamic;

var getLazySchemaStats: Dynamic;

var resolveDataLazyZodValue: (dataLazyZodValue?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => number;

var resolveDataLazyZodValue2: Dynamic;

var resolveDataLazyZodValue3: Dynamic;

var resolveDataLazyZodValue4: (dataLazyZodValue4?: Dynamic, ..._extraArguments: unknown[]) => number;

var resolveDataLazyZodValue5: (dataLazyZodValue5?: Dynamic, ..._extraArguments: unknown[]) => number;

var dataLazyZodUint32Array: Uint32Array<ArrayBuffer>;

var dataLazyZodUint32Array2: Uint32Array<ArrayBuffer>;

var DataLazyZodFill: Dynamic;

var resolveDataLazyZodDigest: Dynamic;

var dataLazyZodPattern: RegExp;

var resolveDataLazyZodExec: Dynamic;

function collectDataLazyZodText(
  collectDataLazyZodText2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let toArray: Dynamic = collectDataLazyZodText2.toArray();
  let flat: Dynamic = (
    collectDataLazyZodText3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let node: Dynamic;
    if (collectDataLazyZodText3 instanceof (XmlText as Dynamic))
      node = collectDataLazyZodText3
        .toDelta()
        .map((toDelta?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let record2: Dynamic = {
            type: `text`,
            text: toDelta.insert,
          };
          if (toDelta.attributes) {
            record2.marks = Object.keys(toDelta.attributes).map(
              (
                attributesKey?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let attributeItem: Dynamic = toDelta.attributes[attributesKey];
                let record3: Dynamic = {
                  type: resolveDataLazyZodExec(attributesKey),
                };
                if (Object.keys(attributeItem)) {
                  record3.attrs = attributeItem;
                }
                return record3;
              },
            );
          }
          return record2;
        });
    else if (collectDataLazyZodText3 instanceof (XmlElement as Dynamic)) {
      node = {
        type: collectDataLazyZodText3.nodeName,
      };
      let attributes: Dynamic = collectDataLazyZodText3.getAttributes();
      if (Object.keys(attributes).length) {
        node.attrs = attributes;
      }
      let toArray2: Dynamic = collectDataLazyZodText3.toArray();
      if (toArray2.length) {
        node.content = toArray2.map(flat).flat();
      }
    } else unexpectedCase();
    return node;
  };
  return {
    type: `doc`,
    content: toArray.map(flat),
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataLazyZodStep1(): void {
  (LAZY_ZOD_REAL_SYMBOL = Symbol(`lazyZod.real`));
  (lazySchemaRecordedCount = 0);
  (lazySchemaBuiltCount = 0);
  (lazySchemaBuildMilliseconds = 0);
  (lazySchemaBuildDepth = 0);
  (lazySchemaEagerMode = false);
  (schemaPerformanceNow = (..._extraArguments: unknown[]) =>
    typeof performance == `object` &&
    performance !== null &&
    typeof performance.now == `function`
      ? performance.now()
      : 0);
  (dataLazyZodSet = new (Set as Dynamic)(
    `optional.nullable.nullish.default.prefault.catch.describe.meta.array.readonly.brand.or.and.pipe.transform.refine.superRefine.check.overwrite.min.max.int.positive.nonnegative.negative.nonpositive.finite.multipleOf.gt.gte.lt.lte.regex.startsWith.endsWith.includes.trim.toLowerCase.toUpperCase.nonempty.email.url.uuid.strict.strip.loose.passthrough.catchall.extend.safeExtend.omit.pick.partial.required.exclude.extract`.split(
      `.`,
    ),
  ));
  (dataLazyZodSet2 = new (Set as Dynamic)([
    `_zod`,
    `_def`,
    `def`,
    `type`,
    `~standard`,
    `parse`,
    `safeParse`,
  ]));
  (DataLazyZodGet = {
    get(
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (options === LAZY_ZOD_REAL_SYMBOL)
        return resolveLazyZodSchema(dataLazyZodGet);
      if (typeof options == `string` && dataLazyZodSet.has(options)) {
        let lazyZodSchemaItem: Dynamic = (
          dataLazyZodGet2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (resolveLazyZodSchema(dataLazyZodGet)[options] as Dynamic)(
            ...dataLazyZodGet2.map(
              (
                dataLazyZodGet3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => resolveLazySchemaArguments(dataLazyZodGet3),
            ),
          );
        if (dataLazyZodGet.real === null)
          return (...items: Dynamic[]): Dynamic =>
            options === `meta` && items.length === 0
              ? resolveLazyZodSchema(dataLazyZodGet).meta()
              : createLazyZodSchema(
                  (..._extraArguments: unknown[]): Dynamic =>
                    lazyZodSchemaItem(items),
                );
        if (typeof dataLazyZodGet.real[options] == `function`)
          return (...dataLazyZodGet2: Dynamic[]): Dynamic =>
            lazyZodSchemaItem(dataLazyZodGet2);
      }
      let lazyZodSchema: Dynamic = resolveLazyZodSchema(dataLazyZodGet);
      return Reflect.get(lazyZodSchema, options, lazyZodSchema);
    },
    has: (
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      options === LAZY_ZOD_REAL_SYMBOL ||
      (dataLazyZodGet.real === null &&
        typeof options == `string` &&
        dataLazyZodSet2.has(options)) ||
      Reflect.has(resolveLazyZodSchema(dataLazyZodGet), options),
    set(
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      lazyZodSchema?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let lazyZodSchema2: Dynamic = resolveLazyZodSchema(dataLazyZodGet);
      return Reflect.set(lazyZodSchema2, options, lazyZodSchema, lazyZodSchema2);
    },
    deleteProperty: (
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => Reflect.deleteProperty(resolveLazyZodSchema(dataLazyZodGet), options),
    defineProperty: (
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      lazyZodSchema?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Reflect.defineProperty(
        resolveLazyZodSchema(dataLazyZodGet),
        options,
        lazyZodSchema,
      ),
    ownKeys: (dataLazyZodGet?: Dynamic, ..._extraArguments: unknown[]) =>
      Reflect.ownKeys(resolveLazyZodSchema(dataLazyZodGet)),
    getOwnPropertyDescriptor(
      dataLazyZodGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lazyZodSchema: Dynamic = Reflect.getOwnPropertyDescriptor(
        resolveLazyZodSchema(dataLazyZodGet),
        options,
      );
      return lazyZodSchema === undefined
        ? undefined
        : {
            ...lazyZodSchema,
            configurable: true,
          };
    },
    getPrototypeOf: (dataLazyZodGet?: Dynamic, ..._extraArguments: unknown[]) =>
      Reflect.getPrototypeOf(resolveLazyZodSchema(dataLazyZodGet)),
  });
  (resolveDataLazyZodGetPrototypeOf = (
    dataLazyZodGetPrototype?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let prototypeOf: Dynamic = Object.getPrototypeOf(dataLazyZodGetPrototype);
    return prototypeOf === Object.prototype || prototypeOf === null;
  });
  (wrapLazyZodFactory = (wrapLazyZodFactory2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (...wrapLazyZodFactory3: Dynamic[]): Dynamic =>
      createLazyZodSchema(
        (..._extraArguments: unknown[]): Dynamic =>
          (wrapLazyZodFactory2 as Dynamic)(
            ...wrapLazyZodFactory3.map(
              (
                wrapLazyZodFactory4?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => resolveLazySchemaArguments(wrapLazyZodFactory4),
            ),
          ),
      ));
  (lazyZodConstructors = {
    array: wrapLazyZodFactory(array),
    boolean: wrapLazyZodFactory(boolean),
    custom: wrapLazyZodFactory(custom),
    date: wrapLazyZodFactory(date),
    discriminatedUnion: wrapLazyZodFactory(discriminatedUnion),
    enum: wrapLazyZodFactory(value_enum),
    int: wrapLazyZodFactory(int),
    json: wrapLazyZodFactory(json),
    literal: wrapLazyZodFactory(literal),
    looseObject: wrapLazyZodFactory(looseObject),
    never: wrapLazyZodFactory(never),
    null: wrapLazyZodFactory(value_null),
    number: wrapLazyZodFactory(number),
    object: wrapLazyZodFactory(object),
    partialRecord: wrapLazyZodFactory(partialRecord),
    preprocess: wrapLazyZodFactory(preprocess),
    record: wrapLazyZodFactory(record),
    strictObject: wrapLazyZodFactory(strictObject),
    string: wrapLazyZodFactory(string),
    templateLiteral: wrapLazyZodFactory(templateLiteral),
    tuple: wrapLazyZodFactory(tuple),
    union: wrapLazyZodFactory(union),
    unknown: wrapLazyZodFactory(unknown),
    lazy: (
      lazyZodConstructors2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      createLazyZodSchema(
        (..._extraArguments: unknown[]): Dynamic =>
          lazy(
            (..._extraArguments: unknown[]): Dynamic =>
              unwrapLazyZodSchema(lazyZodConstructors2()),
          ),
      ),
  });
  (lazyZodStatics = {
    NEVER: DataEnumsAndValidationStatus,
    iso: iso,
  });
  (lazyZod = Object.freeze({
    ...lazyZodConstructors,
    ...lazyZodStatics,
  }));
  (getLazySchemaStats = (..._extraArguments: unknown[]) => ({
    recorded: lazySchemaRecordedCount,
    built: lazySchemaBuiltCount,
    buildMs: Math.round(lazySchemaBuildMilliseconds),
  }));
  (resolveDataLazyZodValue = (
    dataLazyZodValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (dataLazyZodValue >>> options) | (dataLazyZodValue << (32 - options)));
  (resolveDataLazyZodValue2 = (
    dataLazyZodValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataLazyZodValue(dataLazyZodValue2, 2) ^
    resolveDataLazyZodValue(dataLazyZodValue2, 13) ^
    resolveDataLazyZodValue(dataLazyZodValue2, 22));
  (resolveDataLazyZodValue3 = (
    dataLazyZodValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataLazyZodValue(dataLazyZodValue3, 6) ^
    resolveDataLazyZodValue(dataLazyZodValue3, 11) ^
    resolveDataLazyZodValue(dataLazyZodValue3, 25));
  (resolveDataLazyZodValue4 = (
    dataLazyZodValue4?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataLazyZodValue(dataLazyZodValue4, 7) ^
    resolveDataLazyZodValue(dataLazyZodValue4, 18) ^
    (dataLazyZodValue4 >>> 3));
  (resolveDataLazyZodValue5 = (
    dataLazyZodValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataLazyZodValue(dataLazyZodValue5, 17) ^
    resolveDataLazyZodValue(dataLazyZodValue5, 19) ^
    (dataLazyZodValue5 >>> 10));
  (dataLazyZodUint32Array = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063,
    1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
    2756734187, 3204031479, 3329325298,
  ]));
  (dataLazyZodUint32Array2 = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]));
  (DataLazyZodFill = class {
    [key: string]: Dynamic;
    constructor(..._extraArguments: unknown[]) {
      let arrayBuffer = new ArrayBuffer(320);
      this._H = new Uint32Array(arrayBuffer, 0, 8);
      this._H.set(dataLazyZodUint32Array2);
      this._W = new Uint32Array(arrayBuffer, 64, 64);
    }
    _updateHash(..._extraArguments: unknown[]): undefined {
      let arrayBuffer: Dynamic = this._H;
      let W10: Dynamic = this._W;
      for (let count = 16; count < 64; count++)
        W10[count] =
          resolveDataLazyZodValue5(W10[count - 2]) +
          W10[count - 7] +
          resolveDataLazyZodValue4(W10[count - 15]) +
          W10[count - 16];
      let arrayBufferItem: Dynamic = arrayBuffer[0];
      let arrayBufferItem2: Dynamic = arrayBuffer[1];
      let arrayBufferItem3: Dynamic = arrayBuffer[2];
      let arrayBufferItem4: Dynamic = arrayBuffer[3];
      let arrayBufferItem5: Dynamic = arrayBuffer[4];
      let arrayBufferItem6: Dynamic = arrayBuffer[5];
      let arrayBufferItem7: Dynamic = arrayBuffer[6];
      let arrayBufferItem8: Dynamic = arrayBuffer[7];
      for (
        let index = 0,
          dataLazyZodFillResult: Dynamic,
          dataLazyZodFillResult2: Dynamic;
        index < 64;
        index++
      ) {
        dataLazyZodFillResult =
          (arrayBufferItem8 +
            resolveDataLazyZodValue3(arrayBufferItem5) +
            ((arrayBufferItem5 & arrayBufferItem6) ^
              (~arrayBufferItem5 & arrayBufferItem7)) +
            dataLazyZodUint32Array[index] +
            W10[index]) >>>
          0;
        dataLazyZodFillResult2 =
          (resolveDataLazyZodValue2(arrayBufferItem) +
            ((arrayBufferItem & arrayBufferItem2) ^
              (arrayBufferItem & arrayBufferItem3) ^
              (arrayBufferItem2 & arrayBufferItem3))) >>>
          0;
        arrayBufferItem8 = arrayBufferItem7;
        arrayBufferItem7 = arrayBufferItem6;
        arrayBufferItem6 = arrayBufferItem5;
        arrayBufferItem5 = (arrayBufferItem4 + dataLazyZodFillResult) >>> 0;
        arrayBufferItem4 = arrayBufferItem3;
        arrayBufferItem3 = arrayBufferItem2;
        arrayBufferItem2 = arrayBufferItem;
        arrayBufferItem = (dataLazyZodFillResult + dataLazyZodFillResult2) >>> 0;
      }
      arrayBuffer[0] += arrayBufferItem;
      arrayBuffer[1] += arrayBufferItem2;
      arrayBuffer[2] += arrayBufferItem3;
      arrayBuffer[3] += arrayBufferItem4;
      arrayBuffer[4] += arrayBufferItem5;
      arrayBuffer[5] += arrayBufferItem6;
      arrayBuffer[6] += arrayBufferItem7;
      arrayBuffer[7] += arrayBufferItem8;
    }
    digest(arrayBuffer?: Dynamic, ..._extraArguments: unknown[]) {
      let W10 = 0;
      for (; W10 + 56 <= arrayBuffer.length; ) {
        let index = 0;
        for (; index < 16 && W10 + 3 < arrayBuffer.length; index++)
          this._W[index] =
            (arrayBuffer[W10++] << 24) |
            (arrayBuffer[W10++] << 16) |
            (arrayBuffer[W10++] << 8) |
            arrayBuffer[W10++];
        if (W10 % 64 != 0) {
          for (this._W.fill(0, index, 16); W10 < arrayBuffer.length; ) {
            this._W[index] |= arrayBuffer[W10] << ((3 - (W10 % 4)) * 8);
            W10++;
          }
          this._W[index] |= 128 << ((3 - (W10 % 4)) * 8);
        }
        this._updateHash();
      }
      let arrayBufferItem = W10 % 64 != 0;
      this._W.fill(0, 0, 16);
      let arrayBufferItem2 = 0;
      for (; W10 < arrayBuffer.length; arrayBufferItem2++)
        for (let count = 3; count >= 0 && W10 < arrayBuffer.length; count--)
          this._W[arrayBufferItem2] |= arrayBuffer[W10++] << (count * 8);
      if (!arrayBufferItem) {
        this._W[arrayBufferItem2 - (W10 % 4 == 0 ? 0 : 1)] |=
          128 << ((3 - (W10 % 4)) * 8);
      }
      this._W[14] = arrayBuffer.byteLength / BITS29;
      this._W[15] = arrayBuffer.byteLength * 8;
      this._updateHash();
      let arrayBufferItem3 = new Uint8Array(32);
      for (let index = 0; index < this._H.length; index++)
        for (let index2 = 0; index2 < 4; index2++)
          arrayBufferItem3[index * 4 + index2] =
            this._H[index] >>> ((3 - index2) * 8);
      return arrayBufferItem3;
    }
  });
  (resolveDataLazyZodDigest = (
    dataLazyZodDigest?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => new (DataLazyZodFill as Dynamic)().digest(dataLazyZodDigest));
  (dataLazyZodPattern = /(.*)(--[a-zA-Z0-9+/=]{8})$/);
  (resolveDataLazyZodExec = (
    dataLazyZodExec?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataLazyZodPattern.exec(dataLazyZodExec)?.[1] ?? dataLazyZodExec);
}

export { collectDataLazyZodText, getLazySchemaStats, lazyZod, resolveDataLazyZodDigest, unwrapLazyZodSchema };

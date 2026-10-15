/** diff-worker: restored from diffWorker-Dnf0Jf6P.js. */
import type { Dynamic } from "./types";
(function (this: Dynamic, ..._extraArguments: unknown[]): undefined {
  /* Subsystem: sequence-alignment */
  function stableJSONStringify(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return JSON.stringify(sortObjectKeysDeep(input));
  }
  function sortObjectKeysDeep(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (Array.isArray(input)) return input.map(sortObjectKeysDeep);
    if (typeof input == `object` && input) {
      let state: Dynamic = {};
      for (let value of Object.keys(input).toSorted() as Dynamic)
        Object.defineProperty(state, value, {
          value: sortObjectKeysDeep(input[value]),
          enumerable: true,
          writable: true,
          configurable: true,
        });
      return state;
    }
    return input;
  }
  let DIFF_MARK_TYPES: Dynamic = {
    ins: `diffIns`,
    del: `diffDel`,
    fmt: `diffFmt`,
  };
  let MAX_TABLE_COLUMNS: Dynamic = 1e3;
  let DIFF_ATTRIBUTES: Dynamic = {
    kind: `diff`,
    id: `diffId`,
    summary: `diffSummary`,
    before: `diffBefore`,
    ghost: `diffGhost`,
    moveTo: `diffMoveTo`,
    pair: `diffPair`,
    unchecked: `diffUnchecked`,
    face: `diffFace`,
  };
  var DiffBudgetExceededError: Dynamic = class extends Error {
    [key: string]: Dynamic;
    constructor(..._extraArguments: unknown[]) {
      super(`version diff step budget exceeded`);
    }
  };
  function sequenceLCS(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    collectSequenceMatches(
      input,
      options,
      0,
      input.length,
      0,
      options.length,
      items,
      context,
    );
    return items;
  }
  function collectSequenceMatches(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    argument2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value2: Dynamic = context;
    let value3: Dynamic = extra;
    for (
      ;
      value2 < value && value3 < detail && input[value2] === options[value3];

    ) {
      argument.push(value2, value3);
      value2++;
      value3++;
    }
    let index: Dynamic = 0;
    for (
      ;
      value2 < value - index &&
      value3 < detail - index &&
      input[value - 1 - index] === options[detail - 1 - index];

    )
      index++;
    let value4: Dynamic = value - index;
    let value5: Dynamic = detail - index;
    if (value2 < value4 && value3 < value5) {
      let value6: Dynamic = bisectSequenceMatch(
        input,
        options,
        value2,
        value4,
        value3,
        value5,
        argument2,
      );
      if (
        value6 !== null &&
        !(value6[0] === value2 && value6[1] === value3) &&
        !(value6[0] === value4 && value6[1] === value5)
      ) {
        collectSequenceMatches(
          input,
          options,
          value2,
          value6[0],
          value3,
          value6[1],
          argument,
          argument2,
        );
        collectSequenceMatches(
          input,
          options,
          value6[0],
          value4,
          value6[1],
          value5,
          argument,
          argument2,
        );
      }
    }
    for (let index2: Dynamic = 0; index2 < index; index2++)
      argument.push(value4 + index2, value5 + index2);
  }
  function bisectSequenceMatch(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = value - context;
    let value3: Dynamic = detail - extra;
    let value4: Dynamic = Math.ceil((value2 + value3) / 2);
    let value5: Dynamic = value4;
    let value6: Dynamic = 2 * value4 + 2;
    let value7: Dynamic = new (Int32Array as Dynamic)(value6).fill(-1);
    let value8: Dynamic = new (Int32Array as Dynamic)(value6).fill(-1);
    value7[value5 + 1] = 0;
    value8[value5 + 1] = 0;
    let value9: Dynamic = value2 - value3;
    let value10: Dynamic = value9 % 2 != 0;
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    let index4: Dynamic = 0;
    let index5: Dynamic = 0;
    for (let index6: Dynamic = 0; index6 < value4; index6++) {
      for (
        let value11: Dynamic = -index6 + index;
        value11 <= index6 - index2;
        value11 += 2
      ) {
        let value12: Dynamic = value5 + value11;
        let value13: Dynamic =
          value11 === -index6 ||
          (value11 !== index6 && value7[value12 - 1] < value7[value12 + 1])
            ? value7[value12 + 1]
            : value7[value12 - 1] + 1;
        let value14: Dynamic = value13 - value11;
        for (
          ;
          value13 < value2 &&
          value14 < value3 &&
          input[context + value13] === options[extra + value14];

        ) {
          value13++;
          value14++;
          index5++;
        }
        index5++;
        value7[value12] = value13;
        if (value13 > value2) index2 += 2;
        else if (value14 > value3) index += 2;
        else if (value10) {
          let value15: Dynamic = value5 + value9 - value11;
          if (
            value15 >= 0 &&
            value15 < value6 &&
            value8[value15] !== -1 &&
            value13 >= value2 - value8[value15]
          )
            return [context + value13, extra + value14];
        }
      }
      for (
        let value11: Dynamic = -index6 + index3;
        value11 <= index6 - index4;
        value11 += 2
      ) {
        let value12: Dynamic = value5 + value11;
        let value13: Dynamic =
          value11 === -index6 ||
          (value11 !== index6 && value8[value12 - 1] < value8[value12 + 1])
            ? value8[value12 + 1]
            : value8[value12 - 1] + 1;
        let value14: Dynamic = value13 - value11;
        for (
          ;
          value13 < value2 &&
          value14 < value3 &&
          input[value - 1 - value13] === options[detail - 1 - value14];

        ) {
          value13++;
          value14++;
          index5++;
        }
        index5++;
        value8[value12] = value13;
        if (value13 > value2) index4 += 2;
        else if (value14 > value3) index3 += 2;
        else if (!value10) {
          let value15: Dynamic = value5 + value9 - value11;
          if (value15 >= 0 && value15 < value6 && value7[value15] !== -1) {
            let value16: Dynamic = value7[value15];
            let value17: Dynamic = value5 + value16 - value15;
            if (value16 >= value2 - value13)
              return [context + value16, extra + value17];
          }
        }
      }
      argument.left -= index5;
      index5 = 0;
      if (argument.left < 0) throw new (DiffBudgetExceededError as Dynamic)();
    }
    return null;
  }
  function longestIncreasingSubsequence(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let value: Dynamic = new (Int32Array as Dynamic)(input.length).fill(-1);
    for (let index: Dynamic = 0; index < input.length; index++) {
      let value2: Dynamic = input[index];
      let index2: Dynamic = 0;
      let length: Dynamic = items.length;
      for (; index2 < length; ) {
        let value3: Dynamic = (index2 + length) >> 1;
        if (input[items[value3]] < value2) {
          index2 = value3 + 1;
        } else {
          length = value3;
        }
      }
      if (index2 > 0) {
        value[index] = items[index2 - 1];
      }
      items[index2] = index;
    }
    let items2: Dynamic = [];
    for (
      let value2: Dynamic = items.length ? items[items.length - 1] : -1;
      value2 >= 0;
      value2 = value[value2]
    )
      items2.push(value2);
    return items2.toReversed();
  }
  function weightedIncreasingSubsequence(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let length: Dynamic = input.length;
    if (length === 0) return [];
    let value: Dynamic = Array.from<Dynamic, Dynamic>(
      {
        length: length,
      },
      (
        input2?: unknown,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => options2,
    ).toSorted(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => input[input2] - input[options2],
    );
    let value2: Dynamic = new (Int32Array as Dynamic)(length);
    let index: Dynamic = 0;
    for (let index3: Dynamic = 0; index3 < length; index3++) {
      if (index3 === 0 || input[value[index3]] !== input[value[index3 - 1]]) {
        index++;
      }
      value2[value[index3]] = index;
    }
    let value3: Dynamic = new (Int32Array as Dynamic)(index + 1);
    let value4: Dynamic = new (Float64Array as Dynamic)(index + 1);
    let value5: Dynamic = new (Int32Array as Dynamic)(index + 1).fill(-1);
    let value6: Dynamic = new (Int32Array as Dynamic)(length);
    let value7: Dynamic = new (Float64Array as Dynamic)(length);
    let value8: Dynamic = new (Int32Array as Dynamic)(length).fill(-1);
    let value9: Dynamic = (
      input2?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      value10?: Dynamic,
      extra?: Dynamic,
      detail?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      input2 > value10 ||
      (input2 === value10 &&
        (options2 > extra || (options2 === extra && context < detail)));
    for (let index3: Dynamic = 0; index3 < length; index3++) {
      let index4: Dynamic = 0;
      let index5: Dynamic = 0;
      let value10: Dynamic = -1;
      for (
        let value11: Dynamic = value2[index3] - 1;
        value11 > 0;
        value11 -= value11 & -value11
      ) {
        let value12: Dynamic = value5[value11];
        if (
          value12 >= 0 &&
          (value10 < 0 ||
            value9(
              value3[value11],
              value4[value11],
              value12,
              index4,
              index5,
              value10,
            ))
        ) {
          index4 = value3[value11];
          index5 = value4[value11];
          value10 = value12;
        }
      }
      value6[index3] = value10 < 0 ? 1 : index4 + 1;
      value7[index3] = value10 < 0 ? options[index3] : index5 + options[index3];
      value8[index3] = value10;
      for (
        let value11: Dynamic = value2[index3];
        value11 <= index;
        value11 += value11 & -value11
      ) {
        let value12: Dynamic = value5[value11];
        if (
          value12 < 0 ||
          value9(
            value6[index3],
            value7[index3],
            index3,
            value3[value11],
            value4[value11],
            value12,
          )
        ) {
          value3[value11] = value6[index3];
          value4[value11] = value7[index3];
          value5[value11] = index3;
        }
      }
    }
    let index2: Dynamic = 0;
    for (let count: Dynamic = 1; count < length; count++)
      if (
        value6[count] > value6[index2] ||
        (value6[count] === value6[index2] && value7[count] > value7[index2])
      ) {
        index2 = count;
      }
    let items: Dynamic = [];
    for (let value10: Dynamic = index2; value10 >= 0; value10 = value8[value10])
      items.push(value10);
    return items.toReversed();
  }
  function weightedPairAlignment(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = new (Int32Array as Dynamic)(input * options);
    for (let index3: Dynamic = 0; index3 < input; index3++)
      for (let index4: Dynamic = 0; index4 < options; index4++)
        value[index3 * options + index4] = context(index3, index4);
    let value2: Dynamic = options + 1;
    let value3: Dynamic = new (Int32Array as Dynamic)((input + 1) * value2);
    for (let value4: Dynamic = input - 1; value4 >= 0; value4--)
      for (let value5: Dynamic = options - 1; value5 >= 0; value5--) {
        let value6: Dynamic = Math.max(
          value3[(value4 + 1) * value2 + value5],
          value3[value4 * value2 + value5 + 1],
        );
        let value7: Dynamic = value[value4 * options + value5];
        value3[value4 * value2 + value5] =
          value7 > 0
            ? Math.max(
                value6,
                value7 + value3[(value4 + 1) * value2 + value5 + 1],
              )
            : value6;
      }
    let items: Dynamic = [];
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (; index < input && index2 < options; ) {
      let value4: Dynamic = value[index * options + index2];
      if (
        value4 > 0 &&
        value3[index * value2 + index2] ===
          value4 + value3[(index + 1) * value2 + index2 + 1]
      ) {
        items.push({
          op: `pair`,
          i: index++,
          j: index2++,
        });
      } else {
        if (
          value3[(index + 1) * value2 + index2] >=
          value3[index * value2 + index2 + 1]
        ) {
          items.push({
            op: `del`,
            i: index++,
          });
        } else {
          items.push({
            op: `ins`,
            j: index2++,
          });
        }
      }
    }
    for (; index < input; )
      items.push({
        op: `del`,
        i: index++,
      });
    for (; index2 < options; )
      items.push({
        op: `ins`,
        j: index2++,
      });
    return items;
  }
  let headingLevel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input == `number` &&
    Number.isInteger(input) &&
    input >= 1 &&
    input <= 6
      ? input
      : null;
  let highlightColors: Dynamic = new (Set as Dynamic)([
    `yellow`,
    `green`,
    `blue`,
    `pink`,
    `purple`,
    `grey`,
  ]);
  let isHighlightColor: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => typeof input == `string` && highlightColors.has(input);
  let nondefaultHighlightColor: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (isHighlightColor(input) && input !== `yellow` ? input : null);
  let normalizedHighlightColor: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => nondefaultHighlightColor(input) ?? `yellow`;
  /* Subsystem: change-summaries */
  new (Map as Dynamic)(
    Object.entries({
      yellow: `#ffff00`,
      gold: `#ffd700`,
      orange: `#ffa500`,
      khaki: `#f0e68c`,
      lime: `#00ff00`,
      green: `#008000`,
      lightgreen: `#90ee90`,
      olive: `#808000`,
      aqua: `#00ffff`,
      cyan: `#00ffff`,
      turquoise: `#40e0d0`,
      teal: `#008080`,
      blue: `#0000ff`,
      navy: `#000080`,
      lightblue: `#add8e6`,
      skyblue: `#87ceeb`,
      fuchsia: `#ff00ff`,
      magenta: `#ff00ff`,
      pink: `#ffc0cb`,
      hotpink: `#ff69b4`,
      red: `#ff0000`,
      maroon: `#800000`,
      purple: `#800080`,
      violet: `#ee82ee`,
      plum: `#dda0dd`,
      lavender: `#e6e6fa`,
      silver: `#c0c0c0`,
      gray: `#808080`,
      grey: `#808080`,
      lightgray: `#d3d3d3`,
      lightgrey: `#d3d3d3`,
      darkgray: `#a9a9a9`,
      darkgrey: `#a9a9a9`,
      gainsboro: `#dcdcdc`,
      black: `#000000`,
      white: `#ffffff`,
      transparent: ``,
    }),
  );
  let referenceTypeLabels: Dynamic = {
    project: `Document`,
    file: `Tab`,
    database: `Database`,
    run: `Run`,
    routine: `Routine`,
    table: `Table`,
    ref: `Ref`,
  };
  let referenceTypeLabel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => referenceTypeLabels[input] ?? `Ref`;
  let ownAttribute: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof options == `string` && Object.hasOwn(input, options)
      ? input[options]
      : undefined;
  let paragraphKindLabel = (input?: Dynamic, ..._extraArguments: unknown[]) => {
    let value: Dynamic = headingLevel(input);
    return value === null ? `Paragraph` : `Heading ${value}`;
  };
  let listKindLabels: Dynamic = {
    bullet: `Bulleted list`,
    ordered: `Numbered list`,
    check: `Checklist`,
  };
  let listKindLabel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ownAttribute(listKindLabels, typeof input == `string` ? input : `bullet`) ??
    `List`;
  let calloutLabels: Dynamic = {
    info: `Info callout`,
    success: `Success callout`,
    warning: `Warning callout`,
  };
  let calloutEmojiPattern: Dynamic = /^(ℹ️|✅️?|⚠️)/u;
  let calloutKindByEmoji: Dynamic = {
    ℹ: `info`,
    "✅": `success`,
    "⚠": `warning`,
  };
  function calloutKind(node?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
    if (node.type !== `blockquote`) return null;
    let value: Dynamic = node.content?.[0];
    if (value?.type !== `paragraph`) return null;
    let value2: Dynamic = value.content?.[0];
    if (value2?.type !== `text` || typeof value2.text != `string`) return null;
    let value3: Dynamic = calloutEmojiPattern.exec(value2.text);
    return value3
      ? (ownAttribute(calloutKindByEmoji, value3[1].replace(/️/g, ``)) ?? null)
      : null;
  }
  let calloutLabel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (input === null ? `Quote` : calloutLabels[input]);
  let nodeTypeLabels: Dynamic = {
    listItem: `List item`,
    codeBlock: `Code block`,
    horizontalRule: `Divider`,
    embed: `Embed`,
    table: `Table`,
    tableRow: `Row`,
    cell: `Cell`,
    frozenBlock: `Block`,
    pending: `Placeholder`,
    text: `Text`,
    hardBreak: `Line break`,
    mention: `Mention`,
    media: `Image`,
    date: `Date`,
    dropdown: `Dropdown`,
  };
  function nodeLabel(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
    return input.type === `paragraph`
      ? paragraphKindLabel(input.attrs?.heading)
      : input.type === `list`
        ? listKindLabel(input.attrs?.kind)
        : input.type === `blockquote`
          ? calloutLabel(calloutKind(input))
          : (ownAttribute(nodeTypeLabels, input.type) ??
            `Unknown block (${input.type})`);
  }
  let isOnlyCalloutEmoji: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => /^(?:ℹ️|✅️?|⚠️)?\s*$/u.test(input);
  let insertionSummary = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    `${nodeLabel(input)} added`;
  let deletionSummary = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    `${nodeLabel(input)} deleted`;
  function calloutChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = calloutKind(input);
    let value2: Dynamic = calloutKind(options);
    return value === value2
      ? null
      : `${calloutLabel(value)} → ${calloutLabel(value2)}`;
  }
  let normalizedAlignment: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (typeof input == `string` && input !== `` ? input : `left`);
  let normalizedNumbering: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (typeof input == `string` && input !== `` ? input : `1`);
  let normalizedListStart: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (typeof input == `number` ? String(input) : `1`);
  let normalizedLanguage: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (typeof input == `string` && input !== `` ? input : `plain`);
  let normalizedBackground: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (typeof input == `string` && input !== `` ? input : `none`);
  let cellArea: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (typeof input2 == `number` && input2 > 0 ? input2 : 1);
    return value(input.colspan) * value(input.rowspan);
  };
  function attributeChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => value.includes(input2);
    let items: Dynamic = [];
    let value3 = (
      input2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (value2(context2)) {
        items.push(
          `${input2}${options2(ownAttribute(options, context2))} → ${options2(ownAttribute(context, context2))}`,
        );
      }
    };
    switch (input) {
      case `paragraph`:
        value3(``, paragraphKindLabel, `heading`);
        break;
      case `list`:
        value3(``, listKindLabel, `kind`);
        value3(`Numbering: `, normalizedNumbering, `numbering`);
        value3(`Start: `, normalizedListStart, `start`);
        break;
      case `listItem`:
        if (value2(`checked`)) {
          items.push(
            context.checked === true
              ? `Checked`
              : context.checked === false
                ? `Unchecked`
                : `Checkbox removed`,
          );
        }
        break;
      case `cell`:
        if (value2(`header`)) {
          items.push(
            context.header === true ? `Made header cell` : `Made body cell`,
          );
        }
        if (value2(`colspan`) || value2(`rowspan`)) {
          items.push(
            cellArea(context) > cellArea(options)
              ? `Merged cells`
              : `Split cells`,
          );
        }
        value3(`Cell background: `, normalizedBackground, `background`);
        value3(`Cell alignment: `, normalizedAlignment, `align`);
        if (value2(`colwidth`)) {
          items.push(`Column resized`);
        }
        break;
      case `codeBlock`:
        value3(`Code language: `, normalizedLanguage, `language`);
        break;
      case `embed`:
        if (value2(`ref`)) {
          items.push(`Embed changed`);
        }
        if (value2(`width`)) {
          items.push(
            `Embed resized ${dimensionLabel(options.width)} → ${dimensionLabel(context.width)} px`,
          );
        }
        value3(`Embed alignment: `, normalizedAlignment, `align`);
        if (value2(`caption`)) {
          items.push(`Caption changed`);
        }
        break;
      case `media`:
        if (value2(`blob`)) {
          items.push(`Image replaced`);
        }
        if (value2(`dims`) || value2(`width`) || value2(`height`)) {
          items.push(imageResizeSummary(options, context));
        }
        if (value2(`crop`)) {
          items.push(context.crop == null ? `Crop removed` : `Image cropped`);
        }
        if (value2(`alt`)) {
          items.push(`Alt text changed`);
        }
        value3(`Image alignment: `, normalizedAlignment, `align`);
        if (value2(`mime`)) {
          items.push(`Image type changed`);
        }
        break;
      case `mention`:
        items.push(mentionChangeSummary(options, context, value));
        break;
      case `date`:
        if (value2(`ts`)) {
          items.push(dateChangeSummary(options.ts, context.ts));
        }
        break;
      case `dropdown`:
        if (value2(`index`) || value2(`enum`)) {
          items.push(dropdownChangeSummary(options, context, extra));
        }
        break;
      default:
        break;
    }
    return items.length
      ? items.join(`; `)
      : `${nodeLabel({
          type: input,
          attrs: context,
        })} changed`;
  }
  let truncateCodePoints: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = Array.from<Dynamic>(input);
    return value.length > options
      ? `${value.slice(0, options - 1).join(``)}…`
      : input;
  };
  function textChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = Array.from<Dynamic>(input);
    let value2: Dynamic = Array.from<Dynamic>(options);
    let index: Dynamic = 0;
    if (value.length > 40 || value2.length > 40) {
      let index2: Dynamic = 0;
      for (
        ;
        index2 < value.length &&
        index2 < value2.length &&
        value[index2] === value2[index2];

      )
        index2++;
      if (index2 > 28) {
        index = index2 - 12;
        for (let value4: Dynamic = index; value4 > index - 12; value4--)
          if (value[value4 - 1] === ` `) {
            index = value4;
            break;
          }
      }
    }
    let value3: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      index > 0
        ? `…${truncateCodePoints(input2.slice(index).join(``), 39)}`
        : truncateCodePoints(input2.join(``), 40);
    return `${value3(value)} → ${value3(value2)}`;
  }
  let normalizedLabel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input == `string` && input.trim() !== ``
      ? input.trim().replace(/\s+/g, ` `)
      : null;
  let UNNAMED_LABEL: Dynamic = `unnamed`;
  let labelOrUnnamed: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => normalizedLabel(input) ?? UNNAMED_LABEL;
  let isReferenceMention: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input.ref == `string` && typeof input.principal != `string`;
  function mentionReferenceType(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (typeof input != `string`) return referenceTypeLabel(`ref`);
    let parts: Dynamic = input.split(`/`);
    return referenceTypeLabel(
      (parts[0] === `project` && parts.length >= 4 ? parts[2] : parts[0]) ??
        `ref`,
    );
  }
  function mentionLabel(
    input?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = normalizedLabel(input.label);
    if (value !== null) return value;
    if (isReferenceMention(input)) return null;
    let principal: Dynamic = input.principal;
    if (typeof principal != `string` || principal === ``) return null;
    if (principal === `claude`) return `Claude`;
    let value2: Dynamic = principal.indexOf(`@`);
    return value2 > 0 && value2 < principal.length - 1
      ? options
        ? principal
        : principal.slice(0, value2)
      : null;
  }
  let mentionLabelOrFallback: Dynamic = (
    input?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    mentionLabel(input, options) ??
    (isReferenceMention(input) ? UNNAMED_LABEL : `Someone`);
  function mentionChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = isReferenceMention(options)
      ? mentionReferenceType(options.ref)
      : `Mention`;
    if (context.length === 1 && context[0] === `label`)
      return `${value} renamed: ${textChangeSummary(labelOrUnnamed(input.label), labelOrUnnamed(options.label))}`;
    if (mentionLabel(input) === null && mentionLabel(options) === null)
      return `${value} changed`;
    let [items, items2]: Dynamic = [
      mentionLabelOrFallback(input),
      mentionLabelOrFallback(options),
    ];
    if (items === items2) {
      [items, items2] = [
        mentionLabelOrFallback(input, true),
        mentionLabelOrFallback(options, true),
      ];
    }
    return items === items2
      ? `${value} changed`
      : `${value}: ${textChangeSummary(items, items2)}`;
  }
  function shortLinkLabel(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (typeof input != `string` || input.trim() === ``) return null;
    let value: Dynamic = input.trim().replace(/\s+/g, ` `);
    let value2: Dynamic;
    try {
      value2 = new (URL as Dynamic)(value);
    } catch {
      return truncateCodePoints(value.split(/[?#]/)[0], 40) || null;
    }
    return value2.protocol === `http:` || value2.protocol === `https:`
      ? `${value2.protocol}//${value2.host}${value2.pathname === `/` ? `` : truncateCodePoints(value2.pathname, 40)}`
      : value2.protocol === `mailto:` || value2.protocol === `tel:`
        ? `${value2.protocol}${truncateCodePoints(value2.pathname, 40)}`
        : value2.protocol;
  }
  let dimensionLabel: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input == `number` && Number.isFinite(input)
      ? String(Math.round(input))
      : `auto`;
  function imageResizeSummary(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value6: Dynamic =
        input2.dims !== null && typeof input2.dims == `object`
          ? input2.dims
          : {};
      return {
        w: ownAttribute(input2, `width`) ?? ownAttribute(value6, `w`),
        h: ownAttribute(input2, `height`) ?? ownAttribute(value6, `h`),
      };
    };
    let value2: Dynamic = value(input);
    let value3: Dynamic = value(options);
    let value4: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => typeof input2 == `number` && Number.isFinite(input2);
    let filtered: Dynamic = [`w`, `h`].filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        value4(value2[input2]) || value4(value3[input2]),
    );
    if (!filtered.length) return `Image resized`;
    let value5: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      filtered.some(
        (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          value4(input2[input3]),
      )
        ? filtered
            .map(
              (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                dimensionLabel(input2[input3]),
            )
            .join(`×`)
        : `auto`;
    return `Image resized ${value5(value2)} → ${value5(value3)}`;
  }
  let MONTH_NAMES: Dynamic = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ];
  let datePattern: Dynamic =
    /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?:\[([^\]]+)\])?)?/;
  function dateLabel(
    input?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (typeof input != `string` || input === ``) return `unset`;
    let value: Dynamic = datePattern.exec(input);
    let value2: Dynamic = value ? MONTH_NAMES[Number(value[2]) - 1] : undefined;
    if (!value || value2 === undefined) return input;
    let value3: Dynamic = `${value2} ${Number(value[3])}`;
    if (options) {
      value3 += `, ${value[1]}`;
    }
    if (value[4] !== undefined) {
      let value4: Dynamic = Number(value[4]);
      value3 += ` ${value4 % 12 || 12}:${value[5]} ${value4 < 12 ? `AM` : `PM`}`;
      if (value[6] !== undefined) {
        value3 += ` ${value[6]}`;
      }
    }
    return value3;
  }
  let dateYear: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input == `string` ? (datePattern.exec(input)?.[1] ?? null) : null;
  function dateChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = dateYear(input);
    let value2: Dynamic = dateYear(options);
    let value3: Dynamic = value !== null && value2 !== null && value !== value2;
    return `Date: ${dateLabel(input, value3)} → ${dateLabel(options, value3)}`;
  }
  function resolveEnumDefinition(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (typeof input != `string` || !options?.resolveEnum) return null;
    try {
      return options.resolveEnum(input) ?? null;
    } catch {
      return null;
    }
  }
  function dropdownLabel(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = resolveEnumDefinition(input.enum, options);
    if (value === null) return null;
    let index: Dynamic = input.index;
    if (typeof index != `number` || !Number.isInteger(index) || index < 0)
      return typeof value.name == `string` && value.name !== ``
        ? value.name
        : null;
    let value2: Dynamic = Array.isArray(value.options)
      ? value.options[index]
      : undefined;
    return typeof value2 == `string` && value2 !== `` ? value2 : null;
  }
  function dropdownChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = resolveEnumDefinition(options.enum, context);
    let value2: Dynamic =
      typeof value?.name == `string` && value.name !== ``
        ? value.name
        : `Dropdown`;
    let value3: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (typeof input2 != `number` || !Number.isInteger(input2) || input2 < 0)
        return `unset`;
      let value4: Dynamic = Array.isArray(value?.options)
        ? value.options[input2]
        : undefined;
      return typeof value4 == `string` && value4 !== ``
        ? value4
        : `option ${input2 + 1}`;
    };
    return `${value2}: ${value3(input.index)} → ${value3(options.index)}`;
  }
  let markSortOrder: Dynamic = [
    `bold`,
    `italic`,
    `underline`,
    `strike`,
    `code`,
    `link`,
    `highlight`,
  ];
  let markLabels: Dynamic = {
    bold: `Bold`,
    italic: `Italic`,
    underline: `Underline`,
    strike: `Strikethrough`,
    code: `Code`,
    link: `Link`,
    highlight: `Highlight`,
  };
  let markPriority: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = markSortOrder.indexOf(input);
    return value === -1 ? markSortOrder.length : value;
  };
  let markAttributesKey: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entries: Dynamic = new (Map as Dynamic)();
    for (let [value, value2] of Object.entries(input.attrs ?? {}) as Dynamic)
      if (value2 != null) {
        entries.set(value, value2);
      }
    return stableJSONStringify(Object.fromEntries(entries));
  };
  function markChangeSummary(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)(
      input.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          input2.type,
          input2,
        ],
      ),
    );
    let entries2: Dynamic = new (Map as Dynamic)(
      options.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          input2.type,
          input2,
        ],
      ),
    );
    let value: Dynamic = [
      ...new (Set as Dynamic)([...entries.keys(), ...entries2.keys()]),
    ].toSorted(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        markPriority(input2) - markPriority(options2) ||
        (input2 < options2 ? -1 : +(input2 > options2)),
    );
    let items: Dynamic = [];
    for (let value2 of value as Dynamic) {
      let value3: Dynamic =
        ownAttribute(markLabels, value2) ??
        nodeLabel({
          type: value2,
        });
      let entry: Dynamic = entries.get(value2);
      let entry2: Dynamic = entries2.get(value2);
      let value4 = (input2?: Dynamic, ..._extraArguments: unknown[]) => {
        let value7: Dynamic = normalizedHighlightColor(input2.attrs?.color);
        return `${value7.charAt(0).toUpperCase()}${value7.slice(1)} highlight`;
      };
      let value5: Dynamic = (
        input2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        value2 === `link` ? shortLinkLabel(input2.attrs?.href) : null;
      let value6: Dynamic = (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value7: Dynamic = value5(options2);
        return value7 === null ? input2 : `${input2}: ${value7}`;
      };
      if (entry === undefined)
        items.push(
          value2 === `highlight`
            ? `${value4(entry2)} added`
            : value6(`${value3} added`, entry2),
        );
      else if (entry2 === undefined)
        items.push(
          value2 === `highlight`
            ? `${value4(entry)} removed`
            : value6(`${value3} removed`, entry),
        );
      else if (markAttributesKey(entry) !== markAttributesKey(entry2)) {
        let value7: Dynamic = value5(entry);
        let value8: Dynamic = value5(entry2);
        items.push(
          value2 === `highlight`
            ? `Highlight ${normalizedHighlightColor(entry.attrs?.color)} → ${normalizedHighlightColor(entry2.attrs?.color)}`
            : value7 !== null && value8 !== null && value7 !== value8
              ? `${value3} changed: ${value7} → ${value8}`
              : `${value3} changed`,
        );
      }
    }
    return items.length ? items.join(`, `) : null;
  }
  let DIFF_WORK_LIMITS: Dynamic = {
    sequenceSteps: 25e6,
    totalSteps: 6e7,
    pairCells: 4e4,
    convertOps: 2e6,
    convertOpsPerDiff: 4e6,
    linePairChars: 16e6,
  };
  let MIN_CONTENT_SIMILARITY: Dynamic = 0.2;
  let REPLACEMENT_CHANGE_RATIO: Dynamic = 0.6;
  let MAX_TOKEN_PARSE_CHARS: Dynamic = 4096;
  let MAX_PAIR_TOKEN_CHARS: Dynamic = 4 * MAX_TOKEN_PARSE_CHARS;
  let NEAR_MATCH_SIMILARITY: Dynamic = 0.7;
  let defineOwnValue = (
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    Object.defineProperty(input, options, {
      value: context,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  };
  let ignoredNodeAttributes: Dynamic = new (Set as Dynamic)([
    `bid`,
    `h`,
    `frozen`,
    `unknownType`,
  ]);
  let diffAttributeNames: Dynamic = new (Set as Dynamic)(
    Object.values(DIFF_ATTRIBUTES),
  );
  let diffMarkNames: Dynamic = new (Set as Dynamic)(
    Object.values(DIFF_MARK_TYPES),
  );
  let defaultNodeAttributes: Dynamic = {
    paragraph: {
      heading: null,
    },
    list: {
      kind: `bullet`,
      start: null,
      numbering: null,
    },
    listItem: {
      checked: null,
    },
    codeBlock: {
      language: null,
    },
    embed: {
      ref: null,
      width: null,
      align: null,
      caption: null,
    },
    cell: {
      header: false,
      colspan: 1,
      rowspan: 1,
      colwidth: null,
      align: null,
      background: null,
    },
    frozenBlock: {
      label: null,
      rows: null,
    },
    mention: {
      principal: null,
      ref: null,
    },
    media: {
      blob: null,
      mime: null,
      alt: null,
      dims: null,
      crop: null,
      align: null,
    },
    date: {
      ts: null,
    },
    dropdown: {
      enum: null,
      index: null,
    },
    pending: {
      intent: ``,
    },
  };
  let containerNodeTypes: Dynamic = new (Set as Dynamic)([
    `doc`,
    `blockquote`,
    `list`,
    `listItem`,
    `cell`,
  ]);
  let textBlockNodeTypes: Dynamic = new (Set as Dynamic)([
    `paragraph`,
    `codeBlock`,
  ]);
  let pairableNodeTypes: Dynamic = new (Set as Dynamic)([
    ...containerNodeTypes,
    `paragraph`,
    `codeBlock`,
    `table`,
    `tableRow`,
    `embed`,
    `horizontalRule`,
  ]);
  let convertibleNodeTypes: Dynamic = new (Set as Dynamic)([
    `list`,
    `table`,
    `blockquote`,
    `codeBlock`,
    `embed`,
  ]);
  let convertibleContainerTypes: Dynamic = new (Set as Dynamic)([
    `list`,
    `blockquote`,
    `table`,
  ]);
  let inlineNodeTypes: Dynamic = new (Set as Dynamic)([
    `text`,
    `hardBreak`,
    `mention`,
    `media`,
    `date`,
    `dropdown`,
  ]);
  let immovableNodeTypes: Dynamic = new (Set as Dynamic)([`cell`, `doc`]);
  let wordPattern: Dynamic = /\S+/g;
  let whitespacePattern: Dynamic = /^\s+$/;
  let whitespaceCharacterPattern: Dynamic = /\s/;
  let emojiGraphemePattern: Dynamic = String.raw`\p{Regional_Indicator}{2}|\p{Extended_Pictographic}[\p{M}\p{Emoji_Modifier}]*(?:‍\p{Extended_Pictographic}[\p{M}\p{Emoji_Modifier}]*)*`;
  let complexScriptPattern: Dynamic = String.raw`[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}]`;
  let wordCharacterPattern: Dynamic = String.raw`(?:(?!${complexScriptPattern})[\p{L}\p{N}_]\p{M}*)`;
  let wordTokenPattern: Dynamic = new (RegExp as Dynamic)(
    String.raw`${emojiGraphemePattern}|${complexScriptPattern}\p{M}*|\p{N}+(?:[.,:]\p{N}+)*%|${wordCharacterPattern}+(?:[.,:'’]${wordCharacterPattern}+)*|[\s\S]\p{M}*`,
    `gu`,
  );
  let fallbackGraphemePattern: Dynamic = new (RegExp as Dynamic)(
    String.raw`${emojiGraphemePattern}|\r\n|[\s\S]\p{M}*`,
    `gu`,
  );
  let graphemeSegmenter: Dynamic =
    typeof Intl == `object` && typeof Intl.Segmenter == `function`
      ? new (Intl.Segmenter as Dynamic)(`und`, {
          granularity: `grapheme`,
        })
      : null;
  /* Subsystem: document-diff */
  function appendBoundedTextChunks(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    for (let index: Dynamic = 0; index < input.length; ) {
      let value: Dynamic = Math.min(input.length, index + 256);
      let value2: Dynamic = input.charCodeAt(value);
      if (value < input.length && value2 >= 56320 && value2 <= 57343) {
        value++;
      }
      options.push(input.slice(index, value));
      index = value;
    }
  }
  function tokenizeWords(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    for (let index: Dynamic = 0; index < input.length; ) {
      let value: Dynamic = whitespaceCharacterPattern.test(input[index]);
      let value2: Dynamic = index + 1;
      for (
        ;
        value2 < input.length &&
        whitespaceCharacterPattern.test(input[value2]) === value;

      )
        value2++;
      let slice: Dynamic = input.slice(index, value2);
      if (value) items.push(slice);
      else {
        let value3: Dynamic =
          slice.length <= MAX_TOKEN_PARSE_CHARS
            ? slice.match(wordTokenPattern)
            : null;
        if (value3 !== null && value3.join(``) === slice)
          for (let value4 of value3 as Dynamic) items.push(value4);
        else appendBoundedTextChunks(slice, items);
      }
      index = value2;
    }
    return items;
  }
  function tokenizeGraphemes(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = graphemeSegmenter
      ? Array.from<Dynamic, Dynamic>(
          graphemeSegmenter.segment(input),
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.segment,
        )
      : input.match(fallbackGraphemePattern);
    return value !== null && value.join(``) === input
      ? value
      : Array.from<Dynamic>(input);
  }
  let createChange: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: input,
    nodeType: options,
    summary: context,
    alias: null,
    id: null,
    path: null,
  });
  let resolveChangeAlias: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = input;
    for (; value.alias !== null; ) value = value.alias;
    return value;
  };
  var DiffContext: Dynamic = class {
    [key: string]: Dynamic;
    prev: Dynamic;
    curr: Dynamic;
    opts: Dynamic;
    totalLeft: Dynamic = DIFF_WORK_LIMITS.totalSteps;
    stepAllowance: Dynamic = this.totalLeft;
    nodeCh: Dynamic = new (WeakMap as Dynamic)();
    markCh: Dynamic = new (WeakMap as Dynamic)();
    primary: Dynamic = new (WeakSet as Dynamic)();
    ghosts: Dynamic = new (WeakSet as Dynamic)();
    settled: Dynamic = new (WeakSet as Dynamic)();
    regionRoots: Dynamic = new (WeakMap as Dynamic)();
    source: Dynamic = new (WeakMap as Dynamic)();
    origin: Dynamic = new (WeakMap as Dynamic)();
    husks: Dynamic = new (WeakMap as Dynamic)();
    moves: Dynamic = new (Map as Dynamic)();
    rowPerm: Dynamic = new (WeakMap as Dynamic)();
    keys: Dynamic = new (WeakMap as Dynamic)();
    keyLens: Dynamic = new (WeakMap as Dynamic)();
    keyIds: Dynamic = new (Map as Dynamic)();
    bags: Dynamic = new (WeakMap as Dynamic)();
    wordCounts: Dynamic = new (WeakMap as Dynamic)();
    tokBags: Dynamic = new (WeakMap as Dynamic)();
    tokenBounds: Dynamic = new (WeakMap as Dynamic)();
    contentKeys: Dynamic = new (WeakMap as Dynamic)();
    attrWeights: Dynamic = new (WeakMap as Dynamic)();
    convert: Dynamic = {
      left: DIFF_WORK_LIMITS.convertOpsPerDiff,
    };
    convertAllowance: Dynamic = this.convert.left;
    words: Dynamic = new (Map as Dynamic)();
    common: Dynamic = new (Set as Dynamic)();
    prevRuns: Dynamic;
    nextRuns: Dynamic;
    scopes: Dynamic = [];
    scopeStack: Dynamic = [];
    unkeyable: Dynamic = 0;
    counts: Dynamic = null;
    twins: Dynamic = null;
    constructor(
      input?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.prev = input;
      this.curr = options;
      this.opts = context;
      let value: Dynamic = collectBlockIds(input);
      let value2: Dynamic = collectBlockIds(options);
      for (let [value3, value4] of value as Dynamic) {
        let entry: Dynamic = value2.get(value3);
        if (
          value4.count === 1 &&
          entry?.count === 1 &&
          value4.type === entry.type
        ) {
          this.common.add(value3);
        }
      }
      this.prevRuns = runsByBlockId(context.prevRuns);
      this.nextRuns = runsByBlockId(context.nextRuns);
    }
    convertSpent(..._extraArguments: unknown[]): Dynamic {
      return this.convertAllowance - this.convert.left;
    }
    stepsSpent(..._extraArguments: unknown[]): Dynamic {
      return this.stepAllowance - this.totalLeft;
    }
    degrade(
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let value: Dynamic =
        options ?? this.scopeStack[this.scopeStack.length - 1] ?? this.curr;
      if (
        !this.scopes.some(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.reason === input && input2.node === value,
        )
      ) {
        this.scopes.push({
          reason: input,
          node: value,
        });
      }
    }
    hashCounts(..._extraArguments: unknown[]): Dynamic {
      if (this.counts === null) {
        let value: Dynamic = (
          input?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let entries: Dynamic = new (Map as Dynamic)();
          let value2 = (
            input2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let value3: Dynamic = nodeContentKey(input2, this);
            entries.set(value3, (entries.get(value3) ?? 0) + 1);
            if (!textBlockNodeTypes.has(input2.type))
              for (let value4 of nodeChildren(input2) as Dynamic)
                value2(value4);
          };
          for (let value3 of nodeChildren(input) as Dynamic) value2(value3);
          return entries;
        };
        this.counts = {
          prev: value(this.prev),
          curr: value(this.curr),
        };
      }
      return this.counts;
    }
    nearTwins(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (this.twins === null) {
        let { prev: prev, curr: curr }: Dynamic = this.hashCounts();
        let value: Dynamic = (
          input2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let items: Dynamic = [];
          let value2 = (
            input3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (input3.type === `codeBlock`) {
              let value3: Dynamic = nodeContentKey(input3, this);
              if (
                !(prev.get(value3) === 1 && curr.get(value3) === 1) &&
                commonBlockId(input3, this) === null &&
                nodeWordCount(input3) >= 6
              ) {
                items.push(input3);
              }
              return;
            }
            if (!textBlockNodeTypes.has(input3.type))
              for (let value3 of nodeChildren(input3) as Dynamic)
                value2(value3);
          };
          value2(input2);
          return items;
        };
        this.twins = {
          prev: value(this.prev),
          curr: value(this.curr),
        };
      }
      return this.twins[input];
    }
  };
  let isPMRecord: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => typeof input == `object` && !!input && !Array.isArray(input);
  function sanitizeAttributes(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input === undefined)
      return {
        attrs: undefined,
        bad: false,
      };
    if (!isPMRecord(input))
      return {
        attrs: undefined,
        bad: true,
      };
    let state: Dynamic = {};
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let [value, value2] of Object.entries(input) as Dynamic)
      if (options.has(value)) {
        index2++;
      } else {
        defineOwnValue(state, value, value2);
        index++;
      }
    return {
      attrs: index > 0 || index2 === 0 ? state : undefined,
      bad: false,
    };
  }
  function sanitizeNodeShallow(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (
      !isPMRecord(input) ||
      typeof input.type != `string` ||
      (input.type === `text` && typeof input.text != `string`)
    )
      return null;
    let state: Dynamic = {
      type: input.type,
    };
    let value: Dynamic = false;
    if (input.type === `text`) {
      state.text = input.text;
    }
    let value2: Dynamic = sanitizeAttributes(input.attrs, diffAttributeNames);
    value ||= value2.bad;
    if (value2.attrs !== undefined) {
      state.attrs = value2.attrs;
    }
    if (input.marks !== undefined)
      if (!Array.isArray(input.marks)) value = true;
      else {
        let items: Dynamic = [];
        let index: Dynamic = 0;
        for (let value3 of input.marks as Dynamic) {
          if (!isPMRecord(value3) || typeof value3.type != `string`) {
            value = true;
            continue;
          }
          if (diffMarkNames.has(value3.type)) {
            index++;
            continue;
          }
          let value4: Dynamic = sanitizeAttributes(
            value3.attrs,
            new (Set as Dynamic)(),
          );
          value ||= value4.bad;
          items.push(
            value4.attrs === undefined
              ? {
                  type: value3.type,
                }
              : {
                  type: value3.type,
                  attrs: value4.attrs,
                },
          );
        }
        if (items.length > 0 || index === 0) {
          state.marks = items;
        }
      }
    return {
      node: state,
      bad: value,
    };
  }
  function sanitizePMDocument(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      doc: null,
      malformed: true,
      deep: new (Set as Dynamic)(),
      tooDeep: false,
    };
    let value: Dynamic = sanitizeNodeShallow(input);
    if (value === null) return state;
    let bad: Dynamic = value.bad;
    let count: Dynamic = 1;
    let values: Dynamic = new (Set as Dynamic)();
    let items: Dynamic = [];
    let value2 = (
      input2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      value3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let content: Dynamic = input2.content;
      if (content !== undefined) {
        if (!Array.isArray(content)) {
          bad = true;
          return;
        }
        options.content = [];
        items.push({
          src: content,
          dst: options,
          depth: context,
          topIndex: value3,
        });
      }
    };
    for (value2(input, value.node, 0, -1); items.length; ) {
      let {
        src: src,
        dst: dst,
        depth: depth,
        topIndex: topIndex,
      }: Dynamic = items.pop();
      for (let value3 of src as Dynamic) {
        let value4: Dynamic = sanitizeNodeShallow(value3);
        if (value4 === null) {
          bad = true;
          continue;
        }
        bad ||= value4.bad;
        if (++count > 4e6) return state;
        dst.content.push(value4.node);
        let value5: Dynamic =
          topIndex === -1 ? dst.content.length - 1 : topIndex;
        if (depth + 1 > 1e3) {
          values.add(value5);
        }
        value2(value3, value4.node, depth + 1, value5);
      }
    }
    return {
      doc: value.node,
      malformed: bad,
      deep: values,
      tooDeep: values.size > 0,
    };
  }
  function safelySanitizePMDocument(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    try {
      return sanitizePMDocument(input);
    } catch {
      return {
        doc: null,
        malformed: true,
        deep: new (Set as Dynamic)(),
        tooDeep: false,
      };
    }
  }
  let emptyDiffStats: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
    ins: 0,
    del: 0,
    chg: 0,
    fmt: 0,
    move: 0,
    replace: 0,
  });
  let degradedReasonPriority: Dynamic = new (Map as Dynamic)([
    [`budget`, 0],
    [`unreadable`, 1],
    [`exception`, 2],
  ]);
  let emptyPMDocument: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
    type: `doc`,
    content: [],
  });
  function degradedDiffResult(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      reason: options,
      nodeType: input.type,
      bid: null,
      path: [],
    };
    return {
      doc: input,
      changes: [],
      stats: emptyDiffStats(),
      degraded: true,
      degradedReason: options,
      degradedScopes: [state],
    };
  }
  function diffDocuments(
    input?: Dynamic,
    options?: Dynamic,
    context: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic {
    return diffDocumentsWithWork(input, options, context).result;
  }
  let emptyWorkStats: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
    convertOps: 0,
    steps: 0,
  });
  let usedWorkStats: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    convertOps: input.convertSpent(),
    steps: input.stepsSpent(),
  });
  function diffDocumentsWithWork(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = safelySanitizePMDocument(options);
    if (value.doc === null)
      return {
        result: degradedDiffResult(emptyPMDocument(), `unreadable`),
        work: emptyWorkStats(),
      };
    if (input == null)
      return {
        result: value.malformed
          ? degradedDiffResult(value.doc, `unreadable`)
          : {
              doc: value.doc,
              changes: [],
              stats: emptyDiffStats(),
              degraded: false,
            },
        work: emptyWorkStats(),
      };
    let value2: Dynamic = safelySanitizePMDocument(input);
    if (value2.doc === null)
      return {
        result: degradedDiffResult(value.doc, `unreadable`),
        work: emptyWorkStats(),
      };
    if (value2.tooDeep || value.tooDeep)
      return {
        result: deeplyNestedDiffResult(value),
        work: emptyWorkStats(),
      };
    let doc: Dynamic = value2.doc;
    let doc2: Dynamic = value.doc;
    let value3: Dynamic = doc.type !== doc2.type;
    if (value3) {
      doc = wrapDocumentRoot(doc);
      doc2 = wrapDocumentRoot(doc2);
    }
    let value4: Dynamic = new (DiffContext as Dynamic)(doc, doc2, context);
    if (value2.malformed || value.malformed || value3) {
      value4.degrade(`unreadable`, doc2);
    }
    let value5: Dynamic;
    let value6: Dynamic = emptyWorkStats();
    try {
      value5 = diffDocumentRoots(doc, doc2, value4);
      resolveMovedNodes(value5, value4);
      absorbParentMoveChanges(value5, value4);
      mergeAdjacentMoveChanges(value5, value4);
      removeRedundantMoveGhosts(value5, value4);
    } catch {
      let filtered: Dynamic = value4.scopes.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.reason === `unreadable`,
      );
      value6 = usedWorkStats(value4);
      value4 = new (DiffContext as Dynamic)(doc, doc2, context);
      for (let value9 of filtered as Dynamic) value4.scopes.push(value9);
      value4.degrade(`exception`, doc2);
      value5 = replaceUnreadableContent(doc, doc2, value4);
    }
    let value7: Dynamic = usedWorkStats(value4);
    let state: Dynamic = {
      convertOps: value6.convertOps + value7.convertOps,
      steps: value6.steps + value7.steps,
    };
    let value8: Dynamic;
    try {
      value8 = finalizeDiffResult(value5, value4);
    } catch {
      return {
        result: degradedDiffResult(doc2, `exception`),
        work: state,
      };
    }
    let { changes: changes, stats: stats, scopes: scopes }: Dynamic = value8;
    let state2: Dynamic = {
      doc: value5,
      changes: changes,
      stats: stats,
      degraded: scopes.length > 0,
    };
    if (scopes.length) {
      state2.degradedReason = scopes.reduce(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (degradedReasonPriority.get(options2.reason) ?? 0) >
          (degradedReasonPriority.get(input2) ?? 0)
            ? options2.reason
            : input2,
        scopes[0].reason,
      );
      state2.degradedScopes = scopes;
    }
    return {
      result: state2,
      work: state,
    };
  }
  let wrapDocumentRoot: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.type === `doc`
      ? input
      : inlineNodeTypes.has(input.type)
        ? {
            type: `doc`,
            content: [
              {
                type: `paragraph`,
                content: [input],
              },
            ],
          }
        : {
            type: `doc`,
            content: [input],
          };
  function deeplyNestedDiffResult(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let doc: Dynamic = input.doc;
    let value: Dynamic = `Not compared: nested too deeply`;
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let items3: Dynamic = [];
    nodeChildren(doc).forEach(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!input.deep.has(options)) {
          items3.push(input2);
          return;
        }
        let value3: Dynamic = `c${items.length + 1}`;
        items.push({
          id: value3,
          kind: `chg`,
          nodeType: input2.type,
          summary: value,
          path: [options],
        });
        items2.push({
          reason: `unreadable`,
          nodeType: input2.type,
          bid: nodeBlockId(input2),
          path: [options],
        });
        let state: Dynamic = {
          ...input2.attrs,
          [DIFF_ATTRIBUTES.kind]: `chg`,
          [DIFF_ATTRIBUTES.id]: value3,
          [DIFF_ATTRIBUTES.summary]: value,
        };
        items3.push({
          ...input2,
          attrs: state,
        });
      },
    );
    if (!items2.length) {
      items2.push({
        reason: `unreadable`,
        nodeType: doc.type,
        bid: null,
        path: [],
      });
    }
    let value2: Dynamic = emptyDiffStats();
    value2.chg = items.length;
    return {
      doc: {
        ...doc,
        content: items3,
      },
      changes: items,
      stats: value2,
      degraded: true,
      degradedReason: `unreadable`,
      degradedScopes: items2,
    };
  }
  function diffDocumentRoots(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return nodeContentKey(input, context) ===
      nodeContentKey(options, context) &&
      !hasNestedRunIdentityChanges(input, options, context)
      ? options
      : input.type === options.type && pairableNodeTypes.has(options.type)
        ? diffNode(input, options, context)
        : (context.degrade(`unreadable`, options),
          replaceUnreadableContent(input, options, context));
  }
  function replaceUnreadableContent(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    try {
      let items: Dynamic = [
        ...nodeChildren(input).map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            markSubtreeChange(
              input2,
              `del`,
              createChange(`del`, input2.type, deletionSummary(input2)),
              context,
            ),
        ),
        ...nodeChildren(options).map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            markSubtreeChange(
              input2,
              `ins`,
              createChange(`ins`, input2.type, insertionSummary(input2)),
              context,
            ),
        ),
      ];
      return {
        ...options,
        content: items,
      };
    } catch {
      return options;
    }
  }
  let nodeChildren: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (Array.isArray(input.content) ? input.content : []);
  let nodeAttributes: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.attrs !== null && typeof input.attrs == `object` ? input.attrs : {};
  let nodeAttribute: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ownAttribute(nodeAttributes(input), options);
  let nodeBlockId: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = nodeAttribute(input, `bid`);
    return typeof value == `string` && value !== `` ? value : null;
  };
  let commonBlockId: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = nodeBlockId(input);
    return value !== null && options.common.has(value) ? value : null;
  };
  let internKey: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entry: Dynamic = input.get(options);
    if (entry === undefined) {
      entry = input.size;
      input.set(options, entry);
    }
    return entry;
  };
  let withNodeContent: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let state: Dynamic = {
      ...input,
    };
    if (options.length || input.content !== undefined) {
      state.content = options;
    } else {
      delete state.content;
    }
    return state;
  };
  function collectBlockIds(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value2: Dynamic = nodeBlockId(input2);
      if (value2 !== null) {
        let entry: Dynamic = entries.get(value2);
        if (entry) {
          entry.count++;
        } else {
          entries.set(value2, {
            type: input2.type,
            count: 1,
          });
        }
      }
      if (!textBlockNodeTypes.has(input2.type))
        for (let value3 of nodeChildren(input2) as Dynamic) value(value3);
    };
    value(input);
    return entries;
  }
  function runsByBlockId(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    for (let value of (Array.isArray(input) ? input : []) as Dynamic)
      if (typeof value?.bid == `string`) {
        entries.set(value.bid, value);
      }
    return entries;
  }
  let typeAttributeDefaults: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ownAttribute(defaultNodeAttributes, input) ?? {};
  let defaultAttributeValue: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ownAttribute(typeAttributeDefaults(input), options) ?? null;
  let effectiveNodeAttribute: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    nodeAttribute(input, options) ?? defaultAttributeValue(input.type, options);
  let attributeValuesEqual: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input === options ||
    stableJSONStringify(input) === stableJSONStringify(options);
  let isComparableAttribute: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !ignoredNodeAttributes.has(input) && !diffAttributeNames.has(input);
  function changedAttributeNames(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let values: Dynamic = new (Set as Dynamic)([
      ...Object.keys(nodeAttributes(input)),
      ...Object.keys(nodeAttributes(options)),
    ]);
    let items: Dynamic = [];
    for (let value of values as Dynamic)
      if (
        isComparableAttribute(value) &&
        !attributeValuesEqual(
          effectiveNodeAttribute(input, value),
          effectiveNodeAttribute(options, value),
        )
      ) {
        items.push(value);
      }
    return items;
  }
  function normalizedNodeAttributes(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      ...typeAttributeDefaults(input.type),
    };
    for (let [value, value2] of Object.entries(
      nodeAttributes(input),
    ) as Dynamic)
      if (isComparableAttribute(value) && value2 != null) {
        defineOwnValue(state, value, value2);
      }
    return state;
  }
  function nodeAttributeDelta(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value: Dynamic = changedAttributeNames(input, options),
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (!value.length) return null;
    let state: Dynamic = {};
    for (let value2 of value as Dynamic)
      defineOwnValue(state, value2, effectiveNodeAttribute(input, value2));
    return {
      summary: attributeChangeSummary(
        options.type,
        normalizedNodeAttributes(input),
        normalizedNodeAttributes(options),
        value,
        context.opts,
      ),
      before: state,
    };
  }
  let nonnullAttributes: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let state: Dynamic = {};
    for (let [value, value2] of Object.entries(input ?? {}) as Dynamic)
      if (value2 != null) {
        defineOwnValue(state, value, value2);
      }
    return state;
  };
  let markKey: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.type + stableJSONStringify(nonnullAttributes(input.attrs));
  let marksKey: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => input.map(markKey).toSorted().join(`|`);
  function nodeContentKey(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entry: Dynamic = options.keys.get(input);
    if (entry !== undefined) return entry;
    let value: Dynamic;
    let value2: Dynamic;
    try {
      let value3: Dynamic = JSON.stringify(input.type);
      let value4: Dynamic = nodeAttributes(input);
      for (let value6 of Object.keys(value4).toSorted() as Dynamic) {
        if (!isComparableAttribute(value6)) continue;
        let value7: Dynamic = effectiveNodeAttribute(input, value6);
        if (
          !attributeValuesEqual(
            value7,
            defaultAttributeValue(input.type, value6),
          )
        ) {
          value3 += `${JSON.stringify(value6)}=${stableJSONStringify(value7)};`;
        }
      }
      if (input.type === `text`) {
        value3 += `|${JSON.stringify(typeof input.text == `string` ? input.text : ``)}`;
      }
      if (input.marks?.length) {
        value3 += `|m${JSON.stringify(marksKey(input.marks))}`;
      }
      value2 = value3.length;
      let value5: Dynamic = nodeChildren(input);
      if (value5.length) {
        value3 += `[${value5.map((input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => nodeContentKey(input2, options)).join(`,`)}]`;
        value2 += value5.length + 1;
        for (let value6 of value5 as Dynamic)
          value2 += options.keyLens.get(value6);
      }
      value = `#${internKey(options.keyIds, value3)}`;
    } catch {
      value = `!unkeyable${options.unkeyable++}`;
      value2 = value.length;
    }
    options.keys.set(input, value);
    options.keyLens.set(input, value2);
    return value;
  }
  function nodeKeyLength(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    nodeContentKey(input, options);
    return options.keyLens.get(input);
  }
  function nodeWordBag(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entry: Dynamic = options.bags.get(input);
    if (entry !== undefined) return entry;
    let items: Dynamic = [];
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (input2.type === `text`) {
        for (let value3 of ((typeof input2.text == `string`
          ? input2.text
          : ``
        ).match(wordPattern) ?? []) as Dynamic)
          items.push(internKey(options.words, value3));
        return;
      }
      if (inlineNodeTypes.has(input2.type)) {
        items.push(internKey(options.words, `atom ${input2.type}`));
      }
      for (let value3 of nodeChildren(input2) as Dynamic) value(value3);
    };
    value(input);
    let value2: Dynamic = Int32Array.from(items).toSorted();
    options.bags.set(input, value2);
    return value2;
  }
  function textWordBag(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return Int32Array.from(
      (input.match(wordPattern) ?? []).map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          internKey(options.words, input2),
      ),
    ).toSorted();
  }
  function bagSimilarity(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!input.length || !options.length)
      return +(input.length === options.length);
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    for (; index < input.length && index2 < options.length; )
      if (input[index] === options[index2]) {
        index3++;
        index++;
        index2++;
      } else {
        if (input[index] < options[index2]) {
          index++;
        } else {
          index2++;
        }
      }
    return (2 * index3) / (input.length + options.length);
  }
  let nodeTokenBound: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entry: Dynamic = options.tokenBounds.get(input);
    if (entry !== undefined) return entry;
    let value: Dynamic =
      input.type === `text`
        ? typeof input.text == `string`
          ? input.text.length
          : 0
        : 1;
    for (let value2 of nodeChildren(input) as Dynamic)
      value += nodeTokenBound(value2, options);
    options.tokenBounds.set(input, value);
    return value;
  };
  let childTokenBound = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => nodeTokenBound(input, options) - 1;
  let nodeAttributeWeight: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entry: Dynamic = options.attrWeights.get(input);
    if (entry !== undefined) return entry;
    let index: Dynamic = 0;
    for (let value of Object.keys(nodeAttributes(input)) as Dynamic) {
      if (!isComparableAttribute(value)) continue;
      index += 1;
      let value2: Dynamic = effectiveNodeAttribute(input, value);
      if (typeof value2 == `string`) index += value2.length;
      else if (typeof value2 == `object` && value2)
        try {
          index += stableJSONStringify(value2).length;
        } catch {
          index += MAX_PAIR_TOKEN_CHARS;
        }
    }
    options.attrWeights.set(input, index);
    return index;
  };
  let nodeWordCount: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = options?.wordCounts.get(input);
    if (value !== undefined) return value;
    let index: Dynamic = 0;
    if (input.type !== `text`)
      for (let value2 of nodeChildren(input) as Dynamic)
        index += nodeWordCount(value2, options);
    else
      index =
        (typeof input.text == `string` ? input.text : ``).match(wordPattern)
          ?.length ?? 0;
    options?.wordCounts.set(input, index);
    return index;
  };
  let inlinePlainText: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    nodeChildren(input)
      .map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.type === `text` && typeof input2.text == `string`
            ? input2.text
            : ``,
      )
      .join(``);
  function nodesCanPair(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return input.type !== options.type || !pairableNodeTypes.has(input.type)
      ? false
      : input.type !== `embed` ||
          attributeValuesEqual(
            effectiveNodeAttribute(input, `ref`),
            effectiveNodeAttribute(options, `ref`),
          );
  }
  function nodesCanConvertToTextBlock(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic =
      input.type === `paragraph` && options.type === `codeBlock`;
    return (
      (input.type === `codeBlock` && options.type === `paragraph`) ||
      (value &&
        nodeChildren(input).every(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.type === `text` || input2.type === `hardBreak`,
        ))
    );
  }
  function nodesAreNearPair(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return nodesCanPair(input, options)
      ? true
      : nodesCanConvertToTextBlock(input, options) &&
          bagSimilarity(
            nodeWordBag(input, context),
            nodeWordBag(options, context),
          ) >= NEAR_MATCH_SIMILARITY;
  }
  function preferredIncreasingSubsequence(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let length: Dynamic = input.length;
    let value: Dynamic = Array.from<Dynamic, Dynamic>(
      {
        length: length + 1,
      },
      (..._extraArguments: unknown[]) => 1 / 0,
    );
    for (let value4: Dynamic = length - 1; value4 >= 0; value4--)
      value[value4] = Math.min(input[value4], value[value4 + 1]);
    let entries: Dynamic = new (Map as Dynamic)();
    input
      .toSorted(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => input2 - options2,
      )
      .forEach(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => entries.set(input2, options2),
      );
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let value2 = (..._extraArguments: unknown[]): undefined => {
      if (items2.length)
        for (let value4 of chooseWeightedSubsequence(
          items2,
          input,
          options,
          entries,
        ) as Dynamic)
          items.push(value4);
      items2 = [];
    };
    let value3: Dynamic = -1 / 0;
    for (let index: Dynamic = 0; index < length; index++) {
      if (input[index] > value3 && input[index] < value[index + 1]) {
        value2();
        items.push(index);
      } else {
        items2.push(index);
      }
      value3 = Math.max(value3, input[index]);
    }
    value2();
    return items;
  }
  function chooseWeightedSubsequence(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.length > 2e3)
      return longestIncreasingSubsequence(
        input.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            options[input2],
        ),
      ).map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input[input2],
      );
    let mapped: Dynamic = input.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let value2: Dynamic = context[options[input2]];
        let value3: Dynamic =
          value2.type === `paragraph` &&
          effectiveNodeAttribute(value2, `heading`) === null &&
          /\S/.test(inlinePlainText(value2));
        let entry: Dynamic = value.get(options[input2]);
        return (
          (value3 ? 1e6 : 0) -
          Math.min(Math.abs(entry - input2), 999) * 1e3 +
          +(entry > input2)
        );
      },
    );
    return weightedIncreasingSubsequence(
      input.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          options[input2],
      ),
      mapped,
    ).map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input[input2],
    );
  }
  function buildParentIndex(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      nodeChildren(input2).forEach(
        (
          input3?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          entries.set(input3, {
            parent: input2,
            i: options,
          });
          value(input3);
        },
      );
    };
    value(input);
    return entries;
  }
  function attachNodeChange(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    diffContext?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    input.attrs = {
      ...input.attrs,
      [DIFF_ATTRIBUTES.kind]: options,
      [DIFF_ATTRIBUTES.id]: ``,
      ...extra,
    };
    diffContext.nodeCh.set(input, context);
  }
  function recordNodeAttributeChange(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = createChange(`chg`, input.type, options.summary);
    attachNodeChange(input, `chg`, value, context, {
      [DIFF_ATTRIBUTES.summary]: options.summary,
      [DIFF_ATTRIBUTES.before]: options.before,
    });
    return value;
  }
  let deletedDropdownFace: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (options !== `del` || input.type !== `dropdown`) return;
    let value: Dynamic = dropdownLabel(nodeAttributes(input), context.opts);
    return value === null
      ? undefined
      : {
          [DIFF_ATTRIBUTES.face]: truncateCodePoints(value, 48),
        };
  };
  function createDiffMark(
    input?: Dynamic,
    options?: Dynamic,
    diffContext?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      type: input,
      attrs:
        value === undefined
          ? {
              id: ``,
            }
          : {
              id: ``,
              summary: value,
            },
    };
    diffContext.markCh.set(state, options);
    return state;
  }
  let shouldMarkSubtreeNode: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    textBlockNodeTypes.has(input.type) ||
    (!pairableNodeTypes.has(input.type) && inlineNodeTypes.has(options.type));
  function markSubtreeChange(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = createDiffMark(
      options === `ins` ? DIFF_MARK_TYPES.ins : DIFF_MARK_TYPES.del,
      context,
      value,
    );
    let value3: Dynamic = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (input2.type === `text`)
        return {
          ...input2,
          marks: [...(input2.marks ?? []), value2],
        };
      let state: Dynamic = {
        ...input2,
      };
      if (options2) {
        attachNodeChange(
          state,
          options,
          context,
          value,
          deletedDropdownFace(input2, options, value),
        );
        return state;
      }
      let value5: Dynamic = nodeChildren(input2);
      if (value5.length) {
        state.content = value5.map(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            value3(input3, shouldMarkSubtreeNode(input2, input3)),
        );
      }
      value.source.set(state, input2);
      return state;
    };
    let value4: Dynamic = value3(input, false);
    attachNodeChange(value4, options, context, value);
    value.regionRoots.set(value4, options);
    return value4;
  }
  let lowercaseFirstLetter = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    `${input.charAt(0).toLowerCase()}${input.slice(1)}`;
  let replacementSummary = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    input.type === options.type
      ? `${nodeLabel(options)} replaced`
      : `${nodeLabel(input)} replaced with ${lowercaseFirstLetter(nodeLabel(options))}`;
  function replacementNodePair(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = createChange(
      `replace`,
      options.type,
      replacementSummary(input, options),
    );
    let value2: Dynamic = markSubtreeChange(input, `del`, value, context);
    let value3: Dynamic = markSubtreeChange(options, `ins`, value, context);
    value2.attrs = {
      ...value2.attrs,
      [DIFF_ATTRIBUTES.pair]: `old`,
    };
    value3.attrs = {
      ...value3.attrs,
      [DIFF_ATTRIBUTES.pair]: `new`,
    };
    context.settled.add(value2);
    context.settled.add(value3);
    return [value2, value3];
  }
  let emptyReorderState: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    reordered: false,
    moved: new (Set as Dynamic)(),
    hoisted: [],
  });
  function alignChildNodes(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let entries: Dynamic = new (Map as Dynamic)();
    options.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value3: Dynamic = commonBlockId(input2, context);
        if (value3 !== null) {
          entries.set(value3, options2);
        }
      },
    );
    let items2: Dynamic = [];
    let items3: Dynamic = [];
    input.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value3: Dynamic = commonBlockId(input2, context);
        let value4: Dynamic = value3 === null ? undefined : entries.get(value3);
        if (value4 !== undefined) {
          items2.push(options2);
          items3.push(value4);
        }
      },
    );
    let value2: Dynamic = preferredIncreasingSubsequence(items3, options);
    if (value !== undefined) {
      let value3: Dynamic = detectMajorReorder(
        input,
        options,
        items2,
        items3,
        value2,
        context,
        value,
      );
      if (value3 !== null) return value3;
    }
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let value3 of value2 as Dynamic) {
      let value4: Dynamic = items2[value3];
      let value5: Dynamic = items3[value3];
      alignUnidentifiedRanges(
        input,
        index,
        value4,
        options,
        index2,
        value5,
        context,
        items,
      );
      let value6: Dynamic = input[value4];
      let value7: Dynamic = options[value5];
      if (nodeContentKey(value6, context) === nodeContentKey(value7, context)) {
        items.push({
          t: `keep`,
          a: value6,
          b: value7,
        });
      } else {
        if (
          nodesCanPair(value6, value7) ||
          nodesCanConvertToTextBlock(value6, value7)
        ) {
          items.push({
            t: `pair`,
            a: value6,
            b: value7,
          });
        } else {
          items.push(
            {
              t: `del`,
              a: value6,
            },
            {
              t: `ins`,
              b: value7,
            },
          );
        }
      }
      index = value4 + 1;
      index2 = value5 + 1;
    }
    alignUnidentifiedRanges(
      input,
      index,
      input.length,
      options,
      index2,
      options.length,
      context,
      items,
    );
    return items;
  }
  function detectMajorReorder(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = context;
    let value3: Dynamic = value;
    if (!value2.length) {
      let value6: Dynamic = (
        input2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let entries3: Dynamic = new (Map as Dynamic)();
        input2.forEach(
          (
            input3?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let value9: Dynamic = nodeContentKey(input3, detail);
            entries3.set(value9, entries3.has(value9) ? -1 : options2);
          },
        );
        return entries3;
      };
      let value7: Dynamic = value6(input);
      let value8: Dynamic = value6(options);
      let items2: Dynamic = [];
      for (let [value9, value10] of value7 as Dynamic) {
        let entry: Dynamic = value8.get(value9);
        if (value10 >= 0 && entry !== undefined && entry >= 0) {
          items2.push([value10, entry]);
        }
      }
      items2.sort(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => input2[0] - options2[0],
      );
      value2 = items2.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2[0],
      );
      value3 = items2.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2[1],
      );
    }
    let values: Dynamic = new (Set as Dynamic)(
      value2 === context
        ? extra
        : preferredIncreasingSubsequence(value3, options),
    );
    let value4: Dynamic = value2.length - values.size;
    if (value4 < 2 || value4 <= 0.5 * options.length) return null;
    argument.reordered = true;
    value3.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!values.has(options2)) {
          argument.moved.add(options[input2]);
        }
      },
    );
    let entries: Dynamic = new (Map as Dynamic)();
    value2.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => entries.set(value3[options2], input2),
    );
    let values2: Dynamic = new (Set as Dynamic)(value2);
    let entries2: Dynamic = new (Map as Dynamic)();
    let value5: Dynamic = -1;
    for (let index: Dynamic = 0; index < input.length; index++) {
      if (values2.has(index)) {
        value5 = index;
        continue;
      }
      let entry: Dynamic = entries2.get(value5);
      if (entry === undefined) {
        entries2.set(value5, (entry = []));
      }
      entry.push({
        t: `del`,
        a: input[index],
      });
    }
    let items: Dynamic = [...(entries2.get(-1) ?? [])];
    options.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let entry: Dynamic = entries.get(options2);
        if (entry === undefined) {
          items.push({
            t: `ins`,
            b: input2,
          });
          return;
        }
        let value6: Dynamic = input[entry];
        if (nodeContentKey(value6, detail) === nodeContentKey(input2, detail)) {
          items.push({
            t: `keep`,
            a: value6,
            b: input2,
          });
        } else {
          if (
            nodesCanPair(value6, input2) ||
            nodesCanConvertToTextBlock(value6, input2)
          ) {
            items.push({
              t: `pair`,
              a: value6,
              b: input2,
            });
          } else {
            items.push(
              {
                t: `del`,
                a: value6,
              },
              {
                t: `ins`,
                b: input2,
              },
            );
          }
        }
        for (let value7 of (entries2.get(entry) ?? []) as Dynamic)
          items.push(value7);
      },
    );
    return items;
  }
  function alignUnidentifiedRanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    argument2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value2: Dynamic = context - options;
    let value3: Dynamic = detail - extra;
    if (value2 === 0 || value3 === 0) {
      pairUnmatchedRanges(
        input,
        options,
        context,
        value,
        extra,
        detail,
        argument,
        argument2,
      );
      return;
    }
    let entries: Dynamic = new (Map as Dynamic)();
    let value4: Dynamic = new (Int32Array as Dynamic)(value2);
    let value5: Dynamic = new (Int32Array as Dynamic)(value3);
    for (let index3: Dynamic = 0; index3 < value2; index3++) {
      let value7: Dynamic = input[options + index3];
      value4[index3] =
        commonBlockId(value7, argument) === null
          ? internKey(entries, nodeContentKey(value7, argument))
          : -1 - 2 * index3;
    }
    for (let index3: Dynamic = 0; index3 < value3; index3++) {
      let value7: Dynamic = value[extra + index3];
      value5[index3] =
        commonBlockId(value7, argument) === null
          ? internKey(entries, nodeContentKey(value7, argument))
          : -2 - 2 * index3;
    }
    let value6: Dynamic = sequenceMatchesWithinBudget(value4, value5, argument);
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let index3: Dynamic = 0; index3 < value6.length; index3 += 2) {
      let value7: Dynamic = value6[index3];
      let value8: Dynamic = value6[index3 + 1];
      pairUnmatchedRanges(
        input,
        options + index,
        options + value7,
        value,
        extra + index2,
        extra + value8,
        argument,
        argument2,
      );
      argument2.push({
        t: `keep`,
        a: input[options + value7],
        b: value[extra + value8],
      });
      index = value7 + 1;
      index2 = value8 + 1;
    }
    pairUnmatchedRanges(
      input,
      options + index,
      context,
      value,
      extra + index2,
      detail,
      argument,
      argument2,
    );
  }
  function pairUnmatchedRanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    argument2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let items: Dynamic = [];
    let items2: Dynamic = [];
    for (let value7: Dynamic = options; value7 < context; value7++)
      if (commonBlockId(input[value7], argument) === null) {
        items.push(value7);
      }
    for (let value7: Dynamic = extra; value7 < detail; value7++)
      if (commonBlockId(value[value7], argument) === null) {
        items2.push(value7);
      }
    let value2: Dynamic = options;
    let value3: Dynamic = extra;
    let value4 = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (; value2 < input2; value2++)
        argument2.push({
          t: `del`,
          a: input[value2],
        });
    };
    let value5 = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (; value3 < input2; value3++)
        argument2.push({
          t: `ins`,
          b: value[value3],
        });
    };
    let value6 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      value4(input2);
      value5(options2);
      argument2.push({
        t: `pair`,
        a: input[input2],
        b: value[options2],
      });
      value2 = input2 + 1;
      value3 = options2 + 1;
    };
    let length: Dynamic = items.length;
    let length2: Dynamic = items2.length;
    if (
      length === 1 &&
      length2 === 1 &&
      nodesAreNearPair(input[items[0]], value[items2[0]], argument)
    )
      value6(items[0], items2[0]);
    else if (
      length > 0 &&
      length2 > 0 &&
      length * length2 > DIFF_WORK_LIMITS.pairCells
    ) {
      let value7: Dynamic = length === length2;
      for (let index: Dynamic = 0; value7 && index < length; index++)
        value7 = nodesCanPair(input[items[index]], value[items2[index]]);
      if (value7)
        for (let index: Dynamic = 0; index < length; index++)
          value6(items[index], items2[index]);
      else argument.degrade(`budget`);
    } else if (length > 0 && length2 > 0) {
      let value7: Dynamic = linePairWithinBudget(
        input,
        items,
        value,
        items2,
        argument,
      )
        ? createSemanticTokenIndex()
        : null;
      let value8: Dynamic = (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value9: Dynamic = input[items[input2]];
        let value10: Dynamic = value[items2[options2]];
        let value11: Dynamic = nodesCanPair(value9, value10);
        if (!value11 && !nodesCanConvertToTextBlock(value9, value10)) return 0;
        let value12: Dynamic = bagSimilarity(
          nodeWordBag(value9, argument),
          nodeWordBag(value10, argument),
        );
        return value12 <
          (value11 ? MIN_CONTENT_SIMILARITY : NEAR_MATCH_SIMILARITY) ||
          (value11 &&
            value7 &&
            isParagraphSlot(value9) &&
            isParagraphSlot(value10) &&
            !canPairSemanticContent(value9, value10, value7, argument))
          ? 0
          : 1 + Math.round(value12 * 100);
      };
      for (let value9 of weightedPairAlignment(
        length,
        length2,
        value8,
      ) as Dynamic)
        if (value9.op === `pair`) {
          value6(items[value9.i], items2[value9.j]);
        } else {
          if (value9.op === `del`) {
            value4(items[value9.i] + 1);
          } else {
            value5(items2[value9.j] + 1);
          }
        }
    }
    value4(context);
    value5(detail);
  }
  function linePairWithinBudget(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    let index4: Dynamic = 0;
    for (let value2 of options as Dynamic)
      if (isParagraphSlot(input[value2])) {
        index++;
        index3 += nodeTokenBound(input[value2], extra);
      }
    for (let value2 of value as Dynamic)
      if (isParagraphSlot(context[value2])) {
        index2++;
        index4 += nodeTokenBound(context[value2], extra);
      }
    return index3 * index2 + index4 * index <= DIFF_WORK_LIMITS.linePairChars;
  }
  function sequenceMatchesWithinBudget(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      left: Math.min(DIFF_WORK_LIMITS.sequenceSteps, context.totalLeft),
    };
    let left: Dynamic = state.left;
    try {
      return sequenceLCS(input, options, state);
    } catch (value: Dynamic) {
      if (!(value instanceof (DiffBudgetExceededError as Dynamic))) throw value;
      context.degrade(`budget`);
      return prefixSuffixMatches(input, options);
    } finally {
      context.totalLeft -= left - Math.max(state.left, 0);
    }
  }
  function prefixSuffixMatches(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (
      ;
      index < input.length &&
      index < options.length &&
      input[index] === options[index];

    ) {
      items.push(index, index);
      index++;
    }
    let index2: Dynamic = 0;
    for (
      ;
      index2 < input.length - index &&
      index2 < options.length - index &&
      input[input.length - 1 - index2] === options[options.length - 1 - index2];

    )
      index2++;
    for (let value: Dynamic = index2; value > 0; value--)
      items.push(input.length - value, options.length - value);
    return items;
  }
  function diffChildNodes(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value: Dynamic = {},
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = alignChildNodes(input, options, context, extra);
    let value3: Dynamic = detectContainerReplacements(value2, context);
    let value4: Dynamic = detectContainerConversions(value2, value3, context);
    let items: Dynamic = [];
    for (let index: Dynamic = 0; index < value2.length; index++) {
      let entry: Dynamic = value3.get(index);
      if (entry !== undefined) {
        items.push(entry);
        continue;
      }
      let entry2: Dynamic = value4.get(index);
      if (entry2 !== undefined) {
        for (let value6 of entry2 as Dynamic) items.push(value6);
        continue;
      }
      let value5: Dynamic =
        index + 1 < value2.length &&
        !value3.has(index + 1) &&
        !value4.has(index + 1)
          ? detectAdjacentSplitOrJoin(
              value2[index],
              value2[index + 1],
              context,
              value,
            )
          : null;
      if (value5 !== null) {
        for (let value6 of value5 as Dynamic) items.push(value6);
        index++;
        continue;
      }
      for (let value6 of renderAlignedNodeOperation(
        value2[index],
        context,
        value,
      ) as Dynamic)
        items.push(value6);
    }
    return items;
  }
  function detectContainerReplacements(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let index: Dynamic = 0;
    for (let index2: Dynamic = 0; index2 <= input.length; index2++) {
      let value: Dynamic = input[index2];
      if (value !== undefined && (value.t === `del` || value.t === `ins`))
        continue;
      let value2: Dynamic = -1;
      let value3: Dynamic = -1;
      let index3: Dynamic = 0;
      let index4: Dynamic = 0;
      for (let value7: Dynamic = index; value7 < index2; value7++) {
        let value8: Dynamic = input[value7];
        if (value8.t === `del` && convertibleNodeTypes.has(value8.a.type)) {
          index3++;
          value2 = value7;
        } else {
          if (value8.t === `ins` && convertibleNodeTypes.has(value8.b.type)) {
            index4++;
            value3 = value7;
          }
        }
      }
      index = index2 + 1;
      if (index3 !== 1 || index4 !== 1) continue;
      let a2: Dynamic = input[value2].a;
      let b2: Dynamic = input[value3].b;
      if (
        a2.type === b2.type ||
        nodeHasUniqueIdentity(a2, options) ||
        nodeHasUniqueIdentity(b2, options) ||
        containsIndependentIdentity(a2, b2, options) ||
        containsIndependentIdentity(b2, a2, options) ||
        hasNearCodeTwin(a2, b2, `curr`, options) ||
        hasNearCodeTwin(b2, a2, `prev`, options)
      )
        continue;
      let [value4, value5]: Dynamic = replacementNodePair(a2, b2, options);
      let value6: Dynamic = lowercaseFirstLetter(nodeLabel(b2));
      value5.attrs = {
        ...value5.attrs,
        [DIFF_ATTRIBUTES.summary]: replacementSummary(a2, b2),
      };
      value4.attrs = {
        ...value4.attrs,
        [DIFF_ATTRIBUTES.summary]: `Replaced by the ${value6} ${value2 < value3 ? `below` : `above`}`,
      };
      entries.set(value2, value4);
      entries.set(value3, value5);
    }
    return entries;
  }
  function flattenParagraphSlots(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value2: Dynamic = nodeChildren(input2);
      return value2.length === 1 && value2[0].type === `paragraph`
        ? value2[0]
        : null;
    };
    let items: Dynamic = [];
    if (input.type === `blockquote`)
      for (let value2 of nodeChildren(input) as Dynamic) {
        if (value2.type !== `paragraph`) return null;
        items.push(value2);
      }
    else if (input.type === `list`)
      for (let value2 of nodeChildren(input) as Dynamic) {
        let value3: Dynamic = value2.type === `listItem` ? value(value2) : null;
        if (value3 === null) return null;
        items.push(value3);
      }
    else if (input.type === `table`)
      for (let value2 of nodeChildren(input) as Dynamic) {
        if (value2.type !== `tableRow`) return null;
        for (let value3 of nodeChildren(value2) as Dynamic) {
          let value4: Dynamic = value3.type === `cell` ? value(value3) : null;
          if (value4 === null) return null;
          items.push(value4);
        }
      }
    else return null;
    return items.length ? items : null;
  }
  function paragraphMatchKind(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (input.type !== `paragraph` || options.type !== `paragraph`) return null;
    let value2: Dynamic = commonBlockId(input, context);
    let value3: Dynamic = commonBlockId(options, context);
    if (value2 !== null || value3 !== null)
      return value2 !== null && value2 === value3 ? `bid` : null;
    let value4: Dynamic = nodeChildren(input);
    let value5: Dynamic = nodeChildren(options);
    if (value4.length === value5.length) {
      if (value && spendConversionBudget(value, value4.length + value5.length))
        return null;
      if (
        paragraphContentKey(input, context) ===
        paragraphContentKey(options, context)
      )
        return `content`;
    }
    let length: Dynamic = nodeWordBag(input, context).length;
    let length2: Dynamic = nodeWordBag(options, context).length;
    return 2 * Math.min(length, length2) <
      NEAR_MATCH_SIMILARITY * (length + length2) ||
      (value && spendConversionBudget(value, length + length2))
      ? null
      : nodeWordCount(input, context) >= 6 &&
          nodeWordCount(options, context) >= 6 &&
          bagSimilarity(
            nodeWordBag(input, context),
            nodeWordBag(options, context),
          ) >= NEAR_MATCH_SIMILARITY
        ? `near`
        : null;
  }
  function applyNodeReplacements(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entry: Dynamic = options.get(input);
    if (entry !== undefined) return entry;
    let value: Dynamic = nodeChildren(input);
    let mapped: Dynamic = value.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        applyNodeReplacements(input2, options),
    );
    return mapped.every(
      (input2?: Dynamic, options2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2 === value[options2],
    )
      ? input
      : {
          ...input,
          content: mapped,
        };
  }
  let indefiniteArticle = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    /^[aeiou]/i.test(input) ? `an` : `a`;
  let uppercaseFirstLetter = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
  let spendConversionBudget: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    (input.left -= options),
    input.ceiling === undefined
      ? input.left < 0
      : ((input.ceiling.left -= options),
        input.left < 0 || input.ceiling.left < 0)
  );
  function tableColumnSlots(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = nodeChildren(input);
    if (
      !value.length ||
      value.some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.type !== `tableRow`,
      )
    )
      return [];
    let length: Dynamic = nodeChildren(value[0]).length;
    if (length < 2 || length > 64) return [];
    for (let value3 of value as Dynamic) {
      let value4: Dynamic = nodeChildren(value3);
      if (value4.length !== length) return [];
      for (let value5 of value4 as Dynamic)
        if (
          value5.type !== `cell` ||
          effectiveNodeAttribute(value5, `colspan`) !== 1 ||
          effectiveNodeAttribute(value5, `rowspan`) !== 1
        )
          return [];
    }
    let value2: Dynamic =
      value.length > 1 &&
      nodeChildren(value[0]).every(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          effectiveNodeAttribute(input2, `header`) === true,
      )
        ? value.slice(1)
        : value;
    let items: Dynamic = [];
    for (let index: Dynamic = 0; index < length; index++) {
      let items2: Dynamic = [];
      let items3: Dynamic = [];
      for (let value3 of value2 as Dynamic) {
        let value4: Dynamic = nodeChildren(value3)[index];
        let value5: Dynamic = nodeChildren(value4);
        if (value5.length !== 1 || value5[0].type !== `paragraph`) break;
        items2.push(value5[0]);
        items3.push(value4);
      }
      if (items2.length === value2.length) {
        items.push({
          slots: items2,
          slotCells: items3,
        });
      }
    }
    return items;
  }
  function tableCellsOutsideSlots(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let values: Dynamic = new (Set as Dynamic)(options.slotCells);
    let items: Dynamic = [];
    for (let value of nodeChildren(input) as Dynamic)
      for (let value2 of nodeChildren(value) as Dynamic)
        if (!values.has(value2)) {
          items.push(value2);
        }
    return items;
  }
  let paragraphContentKey: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entry: Dynamic = options.contentKeys.get(input);
    if (entry !== undefined) return entry;
    let value: Dynamic = `p:${nodeChildren(input)
      .map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          nodeContentKey(input2, options),
      )
      .join(`,`)}`;
    options.contentKeys.set(input, value);
    return value;
  };
  function tableCellMatchIndex(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {
      unclean: 0,
      uncleanCell: new (WeakSet as Dynamic)(),
      keyCount: new (Map as Dynamic)(),
      cellKeys: new (WeakMap as Dynamic)(),
    };
    for (let value of nodeChildren(input) as Dynamic)
      for (let value2 of nodeChildren(value) as Dynamic) {
        let value3: Dynamic = true;
        let items: Dynamic = [];
        let value4 = (
          input2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!(!value3 || input2.type === `text`))
            if (
              (spendConversionBudget(context, 1),
              commonBlockId(input2, options) !== null)
            )
              value3 = false;
            else if (
              textBlockNodeTypes.has(input2.type) &&
              nodeHasUniqueIdentity(input2, options)
            )
              value3 = false;
            else {
              if (input2.type === `paragraph`) {
                items.push(paragraphContentKey(input2, options));
              }
              for (let value5 of nodeChildren(input2) as Dynamic)
                value4(value5);
            }
        };
        for (let value5 of nodeChildren(value2) as Dynamic) value4(value5);
        if (!value3) {
          state.unclean++;
          state.uncleanCell.add(value2);
        }
        state.cellKeys.set(value2, items);
        for (let value5 of items as Dynamic)
          state.keyCount.set(value5, (state.keyCount.get(value5) ?? 0) + 1);
      }
    return state;
  }
  function tableSlotsCanConvert(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let index: Dynamic = 0;
    let entries: Dynamic = new (Map as Dynamic)();
    for (let value2 of input.slotCells as Dynamic) {
      if (context.uncleanCell.has(value2)) {
        index++;
      }
      for (let value3 of (context.cellKeys.get(value2) ?? []) as Dynamic)
        entries.set(value3, (entries.get(value3) ?? 0) + 1);
    }
    if (context.unclean - index > 0) return false;
    for (let value2 of options as Dynamic) {
      if (nodeWordBag(value2, value).length === 0) continue;
      let value3: Dynamic = paragraphContentKey(value2, value);
      if ((context.keyCount.get(value3) ?? 0) - (entries.get(value3) ?? 0) > 0)
        return false;
    }
    return true;
  }
  function detectContainerConversions(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let index: Dynamic = 0;
    for (let index2: Dynamic = 0; index2 <= input.length; index2++) {
      let value: Dynamic = input[index2];
      if (!(value !== undefined && (value.t === `del` || value.t === `ins`))) {
        if (index2 > index) {
          matchContainerConversion(
            input,
            index,
            index2,
            options,
            context,
            entries,
          );
        }
        index = index2 + 1;
      }
    }
    return entries;
  }
  function matchContainerConversion(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value2: Dynamic = -1;
    for (let value18: Dynamic = options; value18 < context; value18++) {
      if (value.has(value18)) return;
      let value19: Dynamic = input[value18];
      let value20: Dynamic =
        value19.t === `del`
          ? value19.a
          : value19.t === `ins`
            ? value19.b
            : null;
      if (!(value20 === null || !convertibleNodeTypes.has(value20.type))) {
        if (value2 >= 0) return;
        value2 = value18;
      }
    }
    if (value2 < 0) return;
    let value3: Dynamic = input[value2];
    let value4: Dynamic =
      value3.t === `del` ? value3.a : value3.t === `ins` ? value3.b : null;
    if (
      value4 === null ||
      !convertibleContainerTypes.has(value4.type) ||
      nodeHasUniqueIdentity(value4, extra)
    )
      return;
    let value5: Dynamic = value3.t === `del` ? `del` : `ins`;
    let value6: Dynamic = value5 === `del` ? `ins` : `del`;
    if (extra.convert.left < 0) return;
    let items: Dynamic = [];
    let value7: Dynamic = flattenParagraphSlots(value4);
    if (value7 !== null) {
      items.push([
        {
          slots: value7,
          slotCells: [],
        },
      ]);
    }
    if (value5 === `ins` && value4.type === `table`) {
      items.push(tableColumnSlots(value4));
    }
    if (
      !items.some(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.length,
      )
    )
      return;
    let items2: Dynamic = [];
    let state: Dynamic = {
      lines: [],
      idx: [],
    };
    let value8 = (..._extraArguments: unknown[]): undefined => {
      if (state.lines.length) {
        items2.push(state);
      }
      state = {
        lines: [],
        idx: [],
      };
    };
    for (let value18: Dynamic = options; value18 < context; value18++) {
      let value19: Dynamic = input[value18];
      let value20: Dynamic =
        value19.t === `del`
          ? value19.a
          : value19.t === `ins`
            ? value19.b
            : null;
      if (!(value20 === null || value19.t !== value6)) {
        if (value20.type === `paragraph`) {
          state.lines.push(value20);
          state.idx.push(value18);
        } else {
          value8();
        }
      }
    }
    value8();
    let value9: Dynamic = items2.reduce(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => Math.max(input2, options2.lines.length),
      0,
    );
    let value10 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (input2 - options2 + 1) * options2 <= DIFF_WORK_LIMITS.pairCells;
    let entries: Dynamic = new (Map as Dynamic)();
    let value11: Dynamic = null;
    for (let value18 of items as Dynamic) {
      if (value11 !== null) break;
      let state3: Dynamic = {
        left: DIFF_WORK_LIMITS.convertOps,
        ceiling: extra.convert,
      };
      let value19: Dynamic = null;
      for (let value20 of value18 as Dynamic) {
        let { slots: slots2 }: Dynamic = value20;
        let length2: Dynamic = slots2.length;
        if (length2 > value9) continue;
        let index: Dynamic = 0;
        for (let value22 of items2 as Dynamic) {
          let length3: Dynamic = value22.lines.length;
          if (length3 === length2) {
            index += 1;
          } else {
            if (length3 > length2) {
              index += value10(length3, length2) ? length3 - length2 + 1 : 2;
            }
          }
        }
        if (spendConversionBudget(state3, 256 * (1 + items2.length) + index))
          return;
        let entry: Dynamic = entries.get(length2);
        if (entry === undefined) {
          let items5: Dynamic = [];
          for (let [value22, value23] of items2.entries() as Dynamic) {
            let length3: Dynamic = value23.lines.length;
            if (length3 === length2)
              items5.push({
                run: value22,
                at: 0,
                cut: false,
              });
            else if (length3 > length2)
              for (
                let index2: Dynamic = 0;
                index2 + length2 <= length3;
                index2 += value10(length3, length2) ? 1 : length3 - length2
              )
                items5.push({
                  run: value22,
                  at: index2,
                  cut: true,
                });
          }
          entry = items5;
          entries.set(length2, entry);
        }
        let values: Dynamic = new (Set as Dynamic)();
        let values2: Dynamic = new (Set as Dynamic)();
        let value21: Dynamic = false;
        for (let value22 of slots2 as Dynamic) {
          values.add(paragraphContentKey(value22, extra));
          let value23: Dynamic = commonBlockId(value22, extra);
          if (value23 !== null) {
            values2.add(value23);
          }
          if (nodeWordBag(value22, extra).length === 0) {
            value21 = true;
          }
        }
        let items4: Dynamic = [];
        for (let value22 of items2 as Dynamic) {
          let length3: Dynamic = value22.lines.length;
          if (length3 <= length2 || !value10(length3, length2)) {
            items4.push(null);
            continue;
          }
          if (spendConversionBudget(state3, length2 + length3)) return;
          let value23: Dynamic = new (Uint32Array as Dynamic)(length3 + 1);
          value22.lines.forEach(
            (
              input2?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let value24: Dynamic = commonBlockId(input2, extra);
              let value25: Dynamic =
                values.has(paragraphContentKey(input2, extra)) ||
                (value24 !== null && values2.has(value24)) ||
                (value21 && nodeWordBag(input2, extra).length === 0);
              value23[options2 + 1] = value23[options2] + +!!value25;
            },
          );
          items4.push(value23);
        }
        for (let value22 of entry as Dynamic) {
          let value23: Dynamic = items4[value22.run];
          if (
            value22.cut &&
            value23 &&
            value23[value22.at + length2] - value23[value22.at] < length2
          )
            continue;
          let { lines: lines2, idx: idx2 }: Dynamic = items2[value22.run];
          let value24: Dynamic = matchParagraphSlots(
            lines2,
            value22.at,
            slots2,
            value5,
            extra,
            value22.cut,
            state3,
          );
          if (spendConversionBudget(state3, 0)) return;
          if (value24 === null) continue;
          let value25: Dynamic = value22.cut
            ? lines2.slice(value22.at, value22.at + length2)
            : lines2;
          if (value20.slotCells.length > 0) {
            value19 ??= tableCellMatchIndex(value4, extra, state3);
            if (spendConversionBudget(state3, 2 * length2)) return;
            if (!tableSlotsCanConvert(value20, value25, value19, extra))
              continue;
          }
          if (value11 !== null) return;
          value11 = {
            lines: value25,
            idx: value22.cut
              ? idx2.slice(value22.at, value22.at + length2)
              : idx2,
            fit: value24,
            layout: value20,
          };
        }
      }
    }
    if (value11 === null) return;
    let { lines: lines, idx: idx, fit: fit, layout: layout }: Dynamic = value11;
    let { slots: slots }: Dynamic = layout;
    let value12: Dynamic =
      layout.slotCells.length > 0 ? tableCellsOutsideSlots(value4, layout) : [];
    let length: Dynamic = slots.length;
    let value13: Dynamic = fit.headings ? `heading` : `paragraph`;
    let value14: Dynamic = length === 1 ? value13 : `${length} ${value13}s`;
    let state2: Dynamic = {
      impliedHeading: true,
    };
    let value15: Dynamic;
    if (value5 === `ins`) {
      let value18: Dynamic = lowercaseFirstLetter(nodeLabel(value4));
      let value19: Dynamic = `${length === 1 ? uppercaseFirstLetter(value14) : value14} turned into ${indefiniteArticle(value18)} ${value18}`;
      let value20: Dynamic = createChange(`chg`, value4.type, value19);
      let entries2: Dynamic = new (Map as Dynamic)();
      for (let index: Dynamic = 0; index < length; index++)
        entries2.set(
          slots[index],
          diffNode(lines[index], slots[index], extra, state2),
        );
      for (let value22 of value12 as Dynamic) {
        let value23: Dynamic = markSubtreeChange(
          value22,
          `ins`,
          value20,
          extra,
        );
        extra.settled.add(value23);
        entries2.set(value22, value23);
      }
      let value21: Dynamic = applyNodeReplacements(value4, entries2);
      extra.origin.set(value21, value4);
      attachNodeChange(value21, `chg`, value20, extra, {
        [DIFF_ATTRIBUTES.summary]: value19,
        [DIFF_ATTRIBUTES.before]: {
          type: `paragraph`,
        },
      });
      value15 = [value21];
    } else {
      let value18: Dynamic = `${nodeLabel(value4)} turned into ${length === 1 ? `${indefiniteArticle(value14)} ${value14}` : value14}`;
      let value19: Dynamic = createChange(`chg`, `paragraph`, value18);
      let state3: Dynamic = {
        type: value4.type,
      };
      if (value4.type === `list`) {
        defineOwnValue(state3, `kind`, effectiveNodeAttribute(value4, `kind`));
      }
      value15 = [];
      for (let index: Dynamic = 0; index < length; index++) {
        let value20: Dynamic = diffNode(
          slots[index],
          lines[index],
          extra,
          state2,
        );
        attachNodeChange(value20, `chg`, value19, extra, {
          [DIFF_ATTRIBUTES.summary]: value18,
          ...(index === 0
            ? {
                [DIFF_ATTRIBUTES.before]: state3,
              }
            : {}),
        });
        value15.push(value20);
      }
    }
    let value16: Dynamic = value5 === `ins` ? value2 : idx[length - 1];
    let value17: Dynamic = value5 === `ins` ? idx[length - 1] : value2;
    let items3: Dynamic = [];
    for (let value18: Dynamic = value17 + 1; value18 < value16; value18++) {
      let value19: Dynamic = input[value18];
      if (value19.t === `del`) {
        (items3.push as Dynamic)(...renderAlignedNodeOperation(value19, extra));
        detail.set(value18, []);
      }
    }
    if (value5 === `ins`) {
      for (let value18 of idx as Dynamic) detail.set(value18, []);
      detail.set(value2, [...value15, ...items3]);
    } else {
      detail.set(value2, []);
      idx.forEach(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          detail.set(
            input2,
            options2 === length - 1
              ? [value15[options2], ...items3]
              : [value15[options2]],
          ),
      );
    }
  }
  function matchParagraphSlots(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let length: Dynamic = context.length;
    if (spendConversionBudget(argument, 256 + length)) return null;
    let index: Dynamic = 0;
    for (let index4: Dynamic = 0; index4 < length; index4++)
      if (effectiveNodeAttribute(input[options + index4], `heading`) !== null) {
        index++;
      }
    if (index !== 0 && index !== length) return null;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    let items: Dynamic = [];
    for (let index4: Dynamic = 0; index4 < length; index4++) {
      if (2 * (index2 + (length - index4)) <= length - index3) return null;
      let value2: Dynamic = context[index4];
      let value3: Dynamic = input[options + index4];
      if (
        spendConversionBudget(
          argument,
          256 +
            nodeAttributeWeight(value2, extra) +
            nodeAttributeWeight(value3, extra),
        )
      )
        return null;
      let value4: Dynamic = effectiveNodeAttribute(value2, `heading`);
      if (
        (value4 !== null &&
          !attributeValuesEqual(
            value4,
            effectiveNodeAttribute(value3, `heading`),
          )) ||
        changedAttributeNames(value2, value3).some(
          (input2?: Dynamic, ..._extraArguments: unknown[]) =>
            input2 !== `heading`,
        )
      )
        return null;
      let value5: Dynamic = value === `ins` ? value3 : value2;
      let value6: Dynamic = value === `ins` ? value2 : value3;
      if (
        nodeWordBag(value5, extra).length === 0 &&
        nodeWordBag(value6, extra).length === 0
      ) {
        index3++;
        continue;
      }
      let value7: Dynamic = paragraphMatchKind(value5, value6, extra, argument);
      if (value7 === `bid` || value7 === `content`) {
        index2++;
        continue;
      }
      if (
        nodeHasUniqueIdentity(value5, extra) ||
        nodeHasUniqueIdentity(value6, extra) ||
        detail
      )
        return null;
      if (value7 === `near`) {
        index2++;
        continue;
      }
      items.push([value5, value6]);
    }
    if (2 * index2 <= length - index3) return null;
    for (let [value2, value3] of items as Dynamic) {
      if (
        childTokenBound(value2, extra) + childTokenBound(value3, extra) >
        MAX_PAIR_TOKEN_CHARS
      )
        return null;
      let value4: Dynamic = paragraphTokenBag(value2, extra, argument);
      let value5: Dynamic = paragraphTokenBag(value3, extra, argument);
      if (
        spendConversionBudget(argument, value4.length + value5.length) ||
        hasHeavyTokenReplacement(value4, value5)
      )
        return null;
    }
    return {
      headings: index === length,
    };
  }
  function paragraphTokenBag(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entry: Dynamic = options.tokBags.get(input);
    if (entry !== undefined) return entry;
    spendConversionBudget(context, childTokenBound(input, options));
    let mapped: Dynamic = inlineTokens(nodeChildren(input), options)
      .filter(isSubstantiveToken)
      .map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.key,
      );
    options.tokBags.set(input, mapped);
    return mapped;
  }
  function hasHeavyTokenReplacement(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    for (let value4 of input as Dynamic)
      entries.set(value4, (entries.get(value4) ?? 0) + 1);
    let index: Dynamic = 0;
    for (let value4 of options as Dynamic) {
      let value5: Dynamic = entries.get(value4) ?? 0;
      if (value5 > 0) {
        entries.set(value4, value5 - 1);
        index++;
      }
    }
    let value: Dynamic = input.length - index;
    let value2: Dynamic = options.length - index;
    let value3: Dynamic = input.length + options.length;
    return (
      value > 0 &&
      value2 > 0 &&
      value3 > 0 &&
      (value + value2) / value3 > REPLACEMENT_CHANGE_RATIO
    );
  }
  function isParagraphSlot(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.type === `paragraph`) return true;
    if (input.type !== `listItem`) return false;
    let value: Dynamic = nodeChildren(input);
    return value.length === 1 && value[0].type === `paragraph`;
  }
  let substantiveTokenPattern: Dynamic =
    /[\p{L}\p{N}\p{Extended_Pictographic}\p{Regional_Indicator}]/u;
  let createSemanticTokenIndex: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    words: new (Map as Dynamic)(),
    atoms: new (Map as Dynamic)(),
    heavyKeys: new (Map as Dynamic)(),
    bags: new (Map as Dynamic)(),
  });
  let lowercaseablePattern: Dynamic = /\p{Changes_When_Lowercased}/u;
  function semanticNodeTokenBag(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entry: Dynamic = options.bags.get(input);
    if (entry !== undefined) return entry;
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let index: Dynamic = 0;
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!textBlockNodeTypes.has(input2.type)) {
        for (let value6 of nodeChildren(input2) as Dynamic) value(value6);
        return;
      }
      let value4: Dynamic = ``;
      let value5 = (..._extraArguments: unknown[]): undefined => {
        for (let value6 of tokenizeWords(value4) as Dynamic)
          if (!whitespacePattern.test(value6)) {
            items2.push(internKey(options.heavyKeys, `t${value6}`));
            if (substantiveTokenPattern.test(value6)) {
              items.push(
                internKey(
                  options.words,
                  lowercaseablePattern.test(value6)
                    ? value6.toLowerCase()
                    : value6,
                ),
              );
              index++;
            }
          }
        value4 = ``;
      };
      for (let value6 of nodeChildren(input2) as Dynamic)
        if (value6.type === `text`) {
          value4 += typeof value6.text == `string` ? value6.text : ``;
        } else {
          value5();
          items2.push(
            internKey(
              options.heavyKeys,
              `a${atomTokenIdentity(value6, context)}`,
            ),
          );
          if (value6.type !== `hardBreak`) {
            items.push(
              -1 - internKey(options.atoms, nodeContentKey(value6, context)),
            );
          }
        }
      value5();
    };
    value(input);
    let value2: Dynamic = items.length > 0 ? items[0] : 0;
    let value3: Dynamic = items.length > 0 ? items[items.length - 1] : 0;
    let state: Dynamic = {
      ids: Int32Array.from(items).toSorted(),
      words: index,
      first: value2,
      last: value3,
      heavy: Int32Array.from(items2).toSorted(),
    };
    options.bags.set(input, state);
    return state;
  }
  function sortedBagIntersectionCount(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    for (; index < input.length && index2 < options.length; )
      if (input[index] === options[index2]) {
        index3++;
        index++;
        index2++;
      } else {
        if (input[index] < options[index2]) {
          index++;
        } else {
          index2++;
        }
      }
    return index3;
  }
  function heavyTokenBagsDiffer(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.length < 5 || options.length < 5) return false;
    let value: Dynamic = sortedBagIntersectionCount(input, options);
    let value2: Dynamic = input.length - value;
    let value3: Dynamic = options.length - value;
    return (
      value2 > 0 &&
      value3 > 0 &&
      (value2 + value3) / (input.length + options.length) >
        REPLACEMENT_CHANGE_RATIO
    );
  }
  function canPairSemanticContent(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (
      childTokenBound(input, value) + childTokenBound(options, value) >
      MAX_PAIR_TOKEN_CHARS
    )
      return true;
    let value2: Dynamic = semanticNodeTokenBag(input, context, value);
    let value3: Dynamic = semanticNodeTokenBag(options, context, value);
    if (
      value2.words === 0 &&
      value3.words === 0 &&
      value2.ids.length > 0 &&
      value3.ids.length > 0
    )
      return true;
    let value4: Dynamic = sortedBagIntersectionCount(value2.ids, value3.ids);
    let value5: Dynamic = value2.ids.length + value3.ids.length;
    return value4 === value2.ids.length ||
      value4 === value3.ids.length ||
      (value5 <= 6 &&
        (value2.first === value3.first || value2.last === value3.last))
      ? true
      : heavyTokenBagsDiffer(value2.heavy, value3.heavy)
        ? false
        : value4 >= 2 || 4 * value4 >= value5;
  }
  function nodeHasUniqueIdentity(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (commonBlockId(input, options) !== null) return true;
    if (nodeWordBag(input, options).length === 0) return false;
    let value: Dynamic = nodeContentKey(input, options);
    let { prev: prev, curr: curr }: Dynamic = options.hashCounts();
    return prev.get(value) === 1 && curr.get(value) === 1;
  }
  function hasNearCodeTwin(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (
      input.type !== `codeBlock` ||
      commonBlockId(input, value) !== null ||
      nodeWordCount(input) < 6
    )
      return false;
    let value2: Dynamic = nodeWordBag(input, value);
    let values: Dynamic = new (Set as Dynamic)(collectTextBlocks(options));
    return value
      .nearTwins(context)
      .some(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !values.has(input2) &&
          bagSimilarity(value2, nodeWordBag(input2, value)) >=
            NEAR_MATCH_SIMILARITY,
      );
  }
  function collectTextBlocks(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (textBlockNodeTypes.has(input2.type)) items.push(input2);
      else for (let value2 of nodeChildren(input2) as Dynamic) value(value2);
    };
    value(input);
    return items;
  }
  function containsIndependentIdentity(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let filtered: Dynamic = collectTextBlocks(input).filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        nodeWordBag(input2, context).length > 0,
    );
    if (filtered.length === 0) return false;
    let values: Dynamic = new (Set as Dynamic)();
    for (let value of collectTextBlocks(options) as Dynamic) {
      let value2: Dynamic = nodeBlockId(value);
      if (value2 !== null) {
        values.add(`b:${value2}`);
      }
      values.add(`h:${nodeContentKey(value, context)}`);
    }
    let { prev: prev, curr: curr }: Dynamic = context.hashCounts();
    let index: Dynamic = 0;
    for (let value of filtered as Dynamic) {
      let value2: Dynamic = commonBlockId(value, context);
      let value3: Dynamic = nodeContentKey(value, context);
      if (
        value2 === null
          ? prev.get(value3) === 1 &&
            curr.get(value3) === 1 &&
            !values.has(`h:${value3}`)
          : !values.has(`b:${value2}`)
      ) {
        index++;
      }
    }
    return 2 * index >= filtered.length;
  }
  function renderAlignedNodeOperation(
    input?: Dynamic,
    options?: Dynamic,
    context: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic {
    switch (input.t) {
      case `keep`:
        return hasNestedRunIdentityChanges(input.a, input.b, options)
          ? renderAlignedNodeOperation(
              {
                t: `pair`,
                a: input.a,
                b: input.b,
              },
              options,
              context,
            )
          : [input.b];
      case `pair`:
        try {
          return diffPairedNodes(input.a, input.b, options, context);
        } catch {
          options.degrade(`exception`, input.b);
          return replacementNodePair(input.a, input.b, options);
        }
      case `del`:
        return [
          markSubtreeChange(
            input.a,
            `del`,
            createChange(`del`, input.a.type, deletionSummary(input.a)),
            options,
          ),
        ];
      case `ins`:
        return [
          markSubtreeChange(
            input.b,
            `ins`,
            createChange(`ins`, input.b.type, insertionSummary(input.b)),
            options,
          ),
        ];
    }
  }
  function diffPairedNodes(
    input?: Dynamic,
    options?: Dynamic,
    diffContext?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.type !== options.type)
      return convertTextBlock(input, options, diffContext);
    if (!textBlockNodeTypes.has(options.type))
      return [diffNode(input, options, diffContext, value)];
    diffContext.scopeStack.push(options);
    let value2: Dynamic;
    try {
      value2 = diffTextBlockTokens(input, options, diffContext);
      if (
        value2 !== null &&
        isHeavyInlineReplacement(
          value2.runs
            ? diffInlineSequence(input, options, diffContext)
            : value2.ops,
        )
      )
        return replacementNodePair(input, options, diffContext);
    } finally {
      diffContext.scopeStack.pop();
    }
    let value3: Dynamic = diffNode(input, options, diffContext, value, value2);
    if (textBlockBecameEmpty(input, options)) {
      diffContext.husks.set(value3, input);
    }
    return [value3];
  }
  function convertTextBlock(
    input?: Dynamic,
    options?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic =
      options.type === `codeBlock`
        ? nodeChildren(input).map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input2.type === `hardBreak`
                ? {
                    type: `text`,
                    text: `
`,
                  }
                : input2,
          )
        : nodeChildren(input);
    diffContext.scopeStack.push(options);
    let value2: Dynamic;
    try {
      value2 = orderDeletionsBeforeInsertions(
        alignInlineTokens(
          inlineTokens(value, diffContext),
          inlineTokens(nodeChildren(options), diffContext),
          diffContext,
        ),
      );
    } finally {
      diffContext.scopeStack.pop();
    }
    if (isHeavyInlineReplacement(value2))
      return replacementNodePair(input, options, diffContext);
    let value3: Dynamic = renderInlineDiff(value2, diffContext);
    let value4: Dynamic = withNodeContent(
      {
        ...options,
      },
      options.type === `codeBlock`
        ? mergeAdjacentTextNodes(value3.map(stripNonDiffMarks), diffContext)
        : value3,
    );
    diffContext.origin.set(value4, options);
    recordNodeAttributeChange(
      value4,
      {
        summary: `${nodeLabel(input)} → ${nodeLabel(options)}`,
        before: {
          type: input.type,
        },
      },
      diffContext,
    );
    return [value4];
  }
  function stripNonDiffMarks(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.type !== `text` || input.marks === undefined) return input;
    let filtered: Dynamic = input.marks.filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        diffMarkNames.has(input2.type),
    );
    if (filtered.length === input.marks.length) return input;
    let { marks: marks, ...value }: Dynamic = input;
    return filtered.length
      ? {
          ...value,
          marks: filtered,
        }
      : value;
  }
  let textBlockBecameEmpty: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    nodeChildren(options).every(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.type === `text` && !input2.text,
    ) && /\S/.test(inlinePlainText(input));
  function diffNode(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value: Dynamic = {},
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = diffNodeDetails(
      input,
      options,
      context,
      value,
      extra,
    );
    if (value2.summary !== null) {
      absorbNestedChanges(
        value2,
        recordNodeAttributeChange(
          value2.node,
          {
            summary: value2.summary,
            before: value2.before,
          },
          context,
        ),
        context,
      );
    }
    return value2.node;
  }
  let unchangedNodeDelta: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    node: input,
    summary: null,
    before: {},
    absorbed: [],
    moved: [],
  });
  function absorbNestedChanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    for (let value of input.absorbed as Dynamic) value.alias = options;
    for (let value of input.moved as Dynamic)
      attachNodeChange(value, `move`, options, context, {
        [DIFF_ATTRIBUTES.summary]: `Reordered`,
      });
  }
  function diffNodeDetails(
    input?: Dynamic,
    node?: Dynamic,
    diffContext?: Dynamic,
    value: Dynamic = {},
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let value2: Dynamic = nodeAttributeDelta(
      input,
      node,
      diffContext,
      explicitChangedAttributes(input, node, value),
    );
    let value3: Dynamic = value2?.before ?? {};
    if (value2 !== null) {
      items.push(value2.summary);
    }
    let value4: Dynamic =
      node.type === `blockquote` ? calloutChangeSummary(input, node) : null;
    if (value4 !== null) {
      items.push(value4);
      value3.callout = calloutKind(input);
    }
    let value5: Dynamic = emptyReorderState();
    let value6: Dynamic;
    diffContext.scopeStack.push(node);
    try {
      if (textBlockNodeTypes.has(node.type)) {
        let value8: Dynamic =
          extra === undefined
            ? diffTextBlockTokens(input, node, diffContext)
            : extra;
        value6 =
          value8 === null
            ? nodeChildren(node)
            : renderInlineDiff(value8.ops, diffContext);
      } else if (node.type === `table`)
        value6 = diffTableRows(
          nodeChildren(input),
          nodeChildren(node),
          diffContext,
          value5,
        );
      else if (node.type === `list`) {
        let value8: Dynamic =
          (effectiveNodeAttribute(input, `kind`) === `check`) !=
          (effectiveNodeAttribute(node, `kind`) === `check`);
        value6 = diffChildNodes(
          nodeChildren(input),
          nodeChildren(node),
          diffContext,
          {
            impliedChecked: value8,
          },
          value5,
        );
      } else if (
        node.type === `tableRow` ||
        containerNodeTypes.has(node.type)
      ) {
        value6 = diffChildNodes(
          nodeChildren(input),
          nodeChildren(node),
          diffContext,
          {},
          value5,
        );
      }
    } finally {
      diffContext.scopeStack.pop();
    }
    let items2: Dynamic = [];
    if (value5.reordered) {
      items.push(`Reordered`);
      value6 = value6?.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let value8: Dynamic = diffContext.origin.get(input2) ?? input2;
          if (!value5.moved.has(value8) || diffContext.nodeCh.has(input2))
            return input2;
          let state2: Dynamic = {
            ...input2,
          };
          diffContext.origin.set(state2, value8);
          items2.push(state2);
          return state2;
        },
      );
    }
    let state: Dynamic = {
      ...node,
    };
    if (
      value6 !== undefined &&
      (value6.length > 0 || node.content !== undefined)
    ) {
      state.content = value6;
    }
    diffContext.origin.set(state, node);
    let value7: Dynamic =
      value4 === null
        ? []
        : leadingCalloutEmojiChanges(value6?.[0], diffContext);
    for (let value8 of value5.hoisted as Dynamic) {
      items.push(value8.summary);
      value7.push(value8);
    }
    return {
      node: state,
      summary: items.length ? items.join(`; `) : null,
      before: value3,
      absorbed: value7,
      moved: items2,
    };
  }
  let isImpliedCheckboxChange: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (input === null && options === false) || options === null;
  function explicitChangedAttributes(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = changedAttributeNames(input, options);
    if (context.impliedChecked && options.type === `listItem`) {
      value = value.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2 !== `checked` ||
          !isImpliedCheckboxChange(
            effectiveNodeAttribute(input, input2),
            effectiveNodeAttribute(options, input2),
          ),
      );
    }
    if (context.impliedHeading && options.type === `paragraph`) {
      value = value.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2 !== `heading`,
      );
    }
    return value;
  }
  function leadingCalloutEmojiChanges(
    input?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input?.type !== `paragraph`) return [];
    let values: Dynamic = new (Set as Dynamic)();
    let entries: Dynamic = new (Map as Dynamic)([
      [DIFF_MARK_TYPES.ins, ``],
      [DIFF_MARK_TYPES.del, ``],
    ]);
    let value: Dynamic = true;
    for (let value2 of nodeChildren(input) as Dynamic) {
      let value3: Dynamic =
        value2.type === `text`
          ? value2.marks?.find(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                diffContext.markCh.has(input2),
            )
          : undefined;
      if (value && value3 !== undefined && entries.has(value3.type)) {
        values.add(diffContext.markCh.get(value3));
        entries.set(
          value3.type,
          entries.get(value3.type) + (value2.text ?? ``),
        );
        continue;
      }
      value = false;
      let value4: Dynamic =
        value2.type === `text`
          ? value2.marks?.find(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                diffContext.markCh.has(input2),
            )
          : undefined;
      if (
        (value4 !== undefined && values.has(diffContext.markCh.get(value4))) ||
        (diffContext.nodeCh.has(value2) &&
          values.has(diffContext.nodeCh.get(value2)))
      )
        return [];
    }
    return values.size === 1 &&
      isOnlyCalloutEmoji(entries.get(DIFF_MARK_TYPES.ins)) &&
      isOnlyCalloutEmoji(entries.get(DIFF_MARK_TYPES.del))
      ? [...values]
      : [];
  }
  let isWhitespaceToken: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => input.text !== null && whitespacePattern.test(input.text);
  let isSubstantiveToken = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    !isWhitespaceToken(input);
  function matchParagraphSplitTokens(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = inlineTokens(nodeChildren(options), extra);
    let value3: Dynamic = inlineTokens(nodeChildren(context), extra);
    let value4: Dynamic = inlineTokens(nodeChildren(input), extra);
    let items: Dynamic = [...value2, ...value3];
    let value5: Dynamic = value
      ? alignInlineTokens(value4, items, extra)
      : alignInlineTokens(items, value4, extra);
    let values: Dynamic = new (Set as Dynamic)(value3);
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let value6 of value5 as Dynamic) {
      if (value6.k !== `keep`) continue;
      let value7: Dynamic = value ? value6.b : value6.a;
      if (isSubstantiveToken(value7)) {
        if (values.has(value7)) {
          index2++;
        } else {
          index++;
        }
      }
    }
    let length: Dynamic = value2.filter(isSubstantiveToken).length;
    let length2: Dynamic = value3.filter(isSubstantiveToken).length;
    return length > 0 &&
      length2 > 0 &&
      index * 2 >= length &&
      index2 * 2 >= length2
      ? {
          ops: value5,
          tail: values,
        }
      : null;
  }
  function splitParagraphContent(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = matchParagraphSplitTokens(
      input,
      options,
      context,
      true,
      value,
    );
    if (value2 === null) return null;
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let value3: Dynamic = false;
    for (let value4 of value2.ops as Dynamic) {
      if (value4.k !== `del` && value2.tail.has(value4.b)) {
        value3 = true;
      }
      (value3 ? items2 : items).push(value4);
    }
    for (
      let value4: Dynamic = items[items.length - 1];
      value4?.k === `del` && isWhitespaceToken(value4.a);
      value4 = items[items.length - 1]
    )
      items.pop();
    return {
      head: renderInlineDiff(orderDeletionsBeforeInsertions(items), value),
      tail: renderInlineDiff(orderDeletionsBeforeInsertions(items2), value),
    };
  }
  function joinParagraphContent(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = matchParagraphSplitTokens(
      context,
      input,
      options,
      false,
      value,
    );
    if (value2 === null) return null;
    let slice: Dynamic = value2.ops.slice();
    let index: Dynamic = slice.findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.k !== `ins` && value2.tail.has(input2.a),
    );
    for (let value3: Dynamic = index - 1; value3 >= 0; value3--) {
      let value4: Dynamic = slice[value3];
      if (value4.k !== `ins`) break;
      if (isWhitespaceToken(value4.b)) {
        slice[value3] = {
          k: `keep`,
          a: value4.b,
          b: value4.b,
        };
      }
    }
    return renderInlineDiff(orderDeletionsBeforeInsertions(slice), value);
  }
  function detectAdjacentSplitOrJoin(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return input.t === `pair` && options.t === `ins`
      ? renderParagraphSplit(input.a, input.b, options.b, true, context, value)
      : input.t === `ins` && options.t === `pair`
        ? renderParagraphSplit(
            options.a,
            input.b,
            options.b,
            false,
            context,
            value,
          )
        : input.t === `pair` && options.t === `del`
          ? renderParagraphJoin(input.a, options.a, input.b, context, value)
          : input.t === `del` && options.t === `pair`
            ? renderParagraphJoin(input.a, options.a, options.b, context, value)
            : null;
  }
  let firstParagraphs: Dynamic = (...input: Dynamic[]): Dynamic => {
    let mapped: Dynamic = input.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        nodeChildren(input2)[0],
    );
    return mapped.every(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2?.type === `paragraph`,
    )
      ? mapped
      : null;
  };
  function renderParagraphSplit(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    detail?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.type !== options.type || input.type !== context.type) return null;
    let value2: Dynamic;
    let value3: Dynamic;
    let value4: Dynamic;
    if (input.type === `paragraph`) {
      let value7: Dynamic = splitParagraphContent(
        input,
        options,
        context,
        extra,
      );
      if (value7 === null) return null;
      value2 = withNodeContent(options, value7.head);
      value3 = withNodeContent(context, value7.tail);
      value4 = `Paragraph split`;
    } else if (input.type === `listItem`) {
      let value7: Dynamic = firstParagraphs(input, options, context);
      if (value7 === null) return null;
      let [value8, value9, value10]: Dynamic = value7;
      let value11: Dynamic = splitParagraphContent(
        value8,
        value9,
        value10,
        extra,
      );
      if (value11 === null) return null;
      let value12: Dynamic = diffChildNodes(
        nodeChildren(input).slice(1),
        nodeChildren(value ? options : context).slice(1),
        extra,
      );
      let mapped: Dynamic = nodeChildren(value ? context : options)
        .slice(1)
        .map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            markSubtreeChange(
              input2,
              `ins`,
              createChange(`ins`, input2.type, insertionSummary(input2)),
              extra,
            ),
        );
      value2 = {
        ...options,
        content: [
          withNodeContent(value9, value11.head),
          ...(value ? value12 : mapped),
        ],
      };
      value3 = {
        ...context,
        content: [
          withNodeContent(value10, value11.tail),
          ...(value ? mapped : value12),
        ],
      };
      value4 = `List item split`;
    } else return null;
    let value5: Dynamic = value ? options : context;
    let value6: Dynamic = nodeAttributeDelta(
      input,
      value5,
      extra,
      explicitChangedAttributes(input, value5, detail),
    );
    if (value6 !== null) {
      recordNodeAttributeChange(value ? value2 : value3, value6, extra);
    }
    attachNodeChange(
      value ? value3 : value2,
      `ins`,
      createChange(`ins`, input.type, value4),
      extra,
      {
        [DIFF_ATTRIBUTES.summary]: value4,
      },
    );
    extra.origin.set(value2, options);
    extra.origin.set(value3, context);
    return [value2, value3];
  }
  function renderParagraphJoin(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.type !== context.type || options.type !== context.type)
      return null;
    let value2: Dynamic;
    let value3: Dynamic;
    if (context.type === `paragraph`) {
      let value8: Dynamic = joinParagraphContent(
        input,
        options,
        context,
        value,
      );
      if (value8 === null) return null;
      value2 = withNodeContent(context, value8);
      value3 = `Paragraphs joined`;
    } else if (context.type === `listItem`) {
      let value8: Dynamic = firstParagraphs(input, options, context);
      if (value8 === null) return null;
      let [value9, value10, value11]: Dynamic = value8;
      let value12: Dynamic = joinParagraphContent(
        value9,
        value10,
        value11,
        value,
      );
      if (value12 === null) return null;
      let value13: Dynamic = diffChildNodes(
        [...nodeChildren(input).slice(1), ...nodeChildren(options).slice(1)],
        nodeChildren(context).slice(1),
        value,
      );
      value2 = {
        ...context,
        content: [withNodeContent(value11, value12), ...value13],
      };
      value3 = `List items joined`;
    } else return null;
    let value4: Dynamic = nodeBlockId(context);
    let value5: Dynamic =
      value4 !== null &&
      nodeBlockId(options) === value4 &&
      nodeBlockId(input) !== value4
        ? options
        : input;
    let value6: Dynamic = nodeAttributeDelta(
      value5,
      context,
      value,
      explicitChangedAttributes(value5, context, extra),
    );
    let value7: Dynamic =
      value6 === null ? value3 : `${value6.summary}; ${value3}`;
    attachNodeChange(
      value2,
      `chg`,
      createChange(`chg`, context.type, value7),
      value,
      {
        [DIFF_ATTRIBUTES.summary]: value7,
        ...(value6 === null
          ? {}
          : {
              [DIFF_ATTRIBUTES.before]: value6.before,
            }),
      },
    );
    value.origin.set(value2, context);
    return [value2];
  }
  function diffTableRows(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = alignChildNodes(input, options, context, value);
    let value3: Dynamic = sharedColumnPermutation(value2, context);
    let value4: Dynamic =
      value3 === null
        ? diffTableRowsAndColumns(value2, context)
        : renderColumnPermutation(value2, value3, context);
    let value5: Dynamic = hoistTableChanges(value4, context);
    if (value !== undefined) {
      value.hoisted = value5;
    }
    return value4;
  }
  let rowColumnSpan: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.reduce(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value: Dynamic = nodeAttribute(options, `colspan`);
        return input2 + (typeof value == `number` && value > 0 ? value : 1);
      },
      0,
    );
  let isUnitSpanCell: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    effectiveNodeAttribute(input, `colspan`) === 1 &&
    effectiveNodeAttribute(input, `rowspan`) === 1;
  function cellPermutation(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let mapped: Dynamic = input.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        commonBlockId(input2, context),
    );
    let mapped2: Dynamic = options.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        commonBlockId(input2, context),
    );
    let value: Dynamic = mapped;
    let value2: Dynamic = mapped2;
    if (
      (!mapped.every(
        (input2?: Dynamic, ..._extraArguments: unknown[]) => input2 !== null,
      ) ||
        !mapped2.every(
          (input2?: Dynamic, ..._extraArguments: unknown[]) => input2 !== null,
        )) &&
      ((value = input.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          nodeContentKey(input2, context),
      )),
      (value2 = options.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          nodeContentKey(input2, context),
      )),
      new (Set as Dynamic)(value).size !== value.length ||
        new (Set as Dynamic)(value2).size !== value2.length)
    )
      return null;
    let entries: Dynamic = new (Map as Dynamic)(
      value2.map(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [input2, options2],
      ),
    );
    let mapped3: Dynamic = value.map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        entries.get(input2) ?? -1,
    );
    return mapped3.includes(-1) ? null : mapped3;
  }
  function rowMatchesPermutation(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = nodeChildren(input);
    let value3: Dynamic = nodeChildren(options);
    if (
      value2.length !== context.length ||
      value3.length !== context.length ||
      !value2.every(isUnitSpanCell) ||
      !value3.every(isUnitSpanCell)
    )
      return false;
    let value4: Dynamic = cellPermutation(value2, value3, value);
    return value4 === null
      ? value2.every(
          (
            input2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            nodeContentKey(input2, value) ===
            nodeContentKey(value3[context[options2]], value),
        )
      : value4.every(
          (
            input2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => input2 === context[options2],
        );
  }
  function sharedColumnPermutation(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    for (let value3 of input as Dynamic)
      if (value3.t === `pair` || value3.t === `keep`) {
        items.push(value3);
      }
    let value: Dynamic = null;
    for (let value3 of items as Dynamic) {
      let value4: Dynamic = nodeChildren(value3.a);
      let value5: Dynamic = nodeChildren(value3.b);
      if (
        value4.length < 2 ||
        value4.length !== value5.length ||
        !value4.every(isUnitSpanCell) ||
        !value5.every(isUnitSpanCell)
      )
        continue;
      let value6: Dynamic = cellPermutation(value4, value5, options);
      if (
        value6 !== null &&
        value6.some(
          (
            input2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => input2 !== options2,
        )
      ) {
        value = value6;
        break;
      }
    }
    if (value === null) return null;
    let value2: Dynamic = value;
    return items.every(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        rowMatchesPermutation(input2.a, input2.b, value2, options),
    )
      ? value2
      : null;
  }
  function renderColumnPermutation(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = options.flatMap(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (input2 === options2 ? [options2] : []),
    );
    let value2: Dynamic = longestIncreasingSubsequence(options);
    let values: Dynamic = new (Set as Dynamic)(
      value.length >= value2.length ? value : value2,
    );
    let entries: Dynamic = new (Map as Dynamic)();
    options.forEach(
      (
        input2?: unknown,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!values.has(options2)) {
          entries.set(options2, createChange(`move`, `cell`, `Column moved`));
        }
      },
    );
    let value3: Dynamic = Array.from<Dynamic, Dynamic>(
      {
        length: options.length,
      },
      (..._extraArguments: unknown[]) => 0,
    );
    options.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        value3[input2] = options2;
      },
    );
    let state: Dynamic = {
      pi: options,
      inv: value3,
      moved: entries,
    };
    for (let value4 of input as Dynamic)
      if (value4.t !== `del`) {
        context.rowPerm.set(value4.b, state);
      }
    return input.flatMap(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.t === `pair` || input2.t === `keep`
          ? [diffPermutedRow(input2.a, input2.b, state, context)]
          : renderAlignedNodeOperation(input2, context),
    );
  }
  function diffPermutedRow(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value2: Dynamic = nodeChildren(input);
    let mapped: Dynamic = nodeChildren(options).map(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value3: Dynamic = context.inv[options2];
        let value4: Dynamic = value2[value3];
        let value5: Dynamic =
          nodeContentKey(value4, value) === nodeContentKey(input2, value);
        let entry: Dynamic = context.moved.get(value3);
        if (entry === undefined)
          return value5 ? input2 : diffNode(value4, input2, value);
        let value6: Dynamic = value5
          ? unchangedNodeDelta({
              ...input2,
            })
          : diffNodeDetails(value4, input2, value);
        attachNodeChange(value6.node, `move`, entry, value, {
          [DIFF_ATTRIBUTES.summary]:
            value6.summary === null
              ? `Column moved`
              : `Column moved; ${value6.summary}`,
          ...(value6.summary === null
            ? {}
            : {
                [DIFF_ATTRIBUTES.before]: value6.before,
              }),
        });
        absorbNestedChanges(value6, entry, value);
        return value6.node;
      },
    );
    let state: Dynamic = {
      ...options,
      content: mapped,
    };
    value.origin.set(state, options);
    return state;
  }
  function diffTableRowsAndColumns(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let value: Dynamic = null;
    let value2: Dynamic = null;
    let value3: Dynamic = true;
    for (let value4 of input as Dynamic) {
      if (value4.t === `keep`) {
        value3 = false;
      }
      if (value4.t !== `pair`) continue;
      let value5: Dynamic = alignChildNodes(
        nodeChildren(value4.a),
        nodeChildren(value4.b),
        options,
      );
      entries.set(value4, value5);
      if (
        rowColumnSpan(nodeChildren(value4.a)) ===
        rowColumnSpan(nodeChildren(value4.b))
      ) {
        value3 = false;
      }
      let items: Dynamic = [];
      let items2: Dynamic = [];
      let index: Dynamic = 0;
      let index2: Dynamic = 0;
      for (let value6 of value5 as Dynamic)
        if (value6.t === `ins`) {
          items.push(index2++);
        } else {
          if (value6.t === `del`) {
            items2.push(index++);
          } else {
            index++;
            index2++;
          }
        }
      let text: Dynamic = items.join(`,`);
      let text2: Dynamic = items2.join(`,`);
      if (value === null) {
        value = text;
        value2 = text2;
      } else {
        if (value !== text || value2 !== text2) {
          value3 = false;
        }
      }
    }
    value3 &&= value !== null && (value !== `` || value2 !== ``);
    let entries2: Dynamic = new (Map as Dynamic)();
    let entries3: Dynamic = new (Map as Dynamic)();
    if (value3) {
      for (let value4 of (value ?? ``).split(`,`).filter(Boolean) as Dynamic)
        entries2.set(
          Number(value4),
          createChange(`ins`, `cell`, `Column added`),
        );
      for (let value4 of (value2 ?? ``).split(`,`).filter(Boolean) as Dynamic)
        entries3.set(
          Number(value4),
          createChange(`del`, `cell`, `Column deleted`),
        );
    }
    return input.flatMap(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let entry: Dynamic = entries.get(input2);
        if (input2.t !== `pair` || entry === undefined)
          return renderAlignedNodeOperation(input2, options);
        let items: Dynamic = [];
        let index: Dynamic = 0;
        let index2: Dynamic = 0;
        for (let value4 of entry as Dynamic)
          if (value4.t === `ins`)
            items.push(
              markSubtreeChange(
                value4.b,
                `ins`,
                entries2.get(index2++) ??
                  createChange(`ins`, `cell`, insertionSummary(value4.b)),
                options,
              ),
            );
          else if (value4.t === `del`)
            items.push(
              markSubtreeChange(
                value4.a,
                `del`,
                entries3.get(index++) ??
                  createChange(`del`, `cell`, deletionSummary(value4.a)),
                options,
              ),
            );
          else {
            for (let value5 of renderAlignedNodeOperation(
              value4,
              options,
            ) as Dynamic)
              items.push(value5);
            index++;
            index2++;
          }
        let state: Dynamic = {
          ...input2.b,
          content: items,
        };
        options.origin.set(state, input2.b);
        return [state];
      },
    );
  }
  let headerChangeSummaries: Dynamic = new (Set as Dynamic)([
    `Made header cell`,
    `Made body cell`,
  ]);
  let headerChangeLabel: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input === `Made header cell`
      ? `Header ${options} added`
      : input === `Made body cell`
        ? `Header ${options} removed`
        : input;
  function hoistTableChanges(
    input?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = computeCellGridColumns(input);
    let items: Dynamic = [];
    let items2: Dynamic = [];
    input.forEach(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (input2.attrs?.[DIFF_ATTRIBUTES.kind] === undefined) {
          nodeChildren(input2).forEach(
            (
              input3?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (input3.type !== `cell` || isDeletedNode(input3)) return;
              let value5: Dynamic = value.get(input3) ?? options2;
              let value6: Dynamic = nodeAttribute(input3, `header`) === true;
              let value7: Dynamic = nodeAttribute(
                input3,
                DIFF_ATTRIBUTES.before,
              );
              let value8: Dynamic =
                typeof value7 == `object` &&
                !!value7 &&
                ownAttribute(value7, `header`) === true;
              let value9: Dynamic =
                !value6 &&
                !value8 &&
                nodeAttribute(input3, DIFF_ATTRIBUTES.kind) !== `ins`;
              items2.push({
                r: options,
                c: options2,
                g: value5,
                header: value6,
                body: value9,
              });
              let entry: Dynamic = diffContext.nodeCh.get(input3);
              if (entry?.kind === `chg`) {
                items.push({
                  r: options,
                  c: options2,
                  g: value5,
                  ch: entry,
                  cell: input3,
                });
              }
            },
          );
        }
      },
    );
    for (let value5 of items as Dynamic) {
      let parts: Dynamic = value5.ch.summary.split(`; `);
      if (
        parts.length < 2 ||
        !parts.includes(`Column resized`) ||
        resolveChangeAlias(value5.ch) !== value5.ch
      )
        continue;
      let text: Dynamic = parts
        .filter(
          (input2?: Dynamic, ..._extraArguments: unknown[]) =>
            input2 !== `Column resized`,
        )
        .join(`; `);
      value5.ch.summary = text;
      value5.cell.attrs = {
        ...value5.cell.attrs,
        [DIFF_ATTRIBUTES.summary]: text,
      };
    }
    let items3: Dynamic = [];
    let entries: Dynamic = new (Map as Dynamic)();
    let values: Dynamic = new (Set as Dynamic)();
    let value2: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      input2
        .split(`; `)
        .find(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            headerChangeSummaries.has(input3),
        ) ?? null;
    let value3 = (
      input2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value5: Dynamic =
        input2 === `row`
          ? (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input3.r
          : (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input3.g;
      let entries2: Dynamic = new (Map as Dynamic)();
      let entries3: Dynamic = new (Map as Dynamic)();
      let entries4: Dynamic = new (Map as Dynamic)();
      for (let value6 of items2 as Dynamic) {
        entries2.set(value5(value6), (entries2.get(value5(value6)) ?? 0) + 1);
        if (value6.header) {
          entries3.set(value5(value6), (entries3.get(value5(value6)) ?? 0) + 1);
        }
        if (value6.body) {
          entries4.set(value5(value6), (entries4.get(value5(value6)) ?? 0) + 1);
        }
      }
      let entries5: Dynamic = new (Map as Dynamic)();
      for (let value6 of items as Dynamic) {
        if (values.has(value6.ch)) continue;
        let value7: Dynamic = value2(value6.ch.summary);
        let value8: Dynamic = `${options(value6)}\n${value7 ?? value6.ch.summary}`;
        let entry: Dynamic = entries5.get(value8);
        if (entry === undefined) {
          entries5.set(value8, (entry = []));
        }
        entry.push(value6);
      }
      for (let value6 of entries5.values() as Dynamic) {
        if (value6.length < 2) continue;
        let value7: Dynamic = value2(value6[0].ch.summary);
        let value8: Dynamic = value5(value6[0]);
        let value9: Dynamic = value7 === `Made header cell`;
        let value10: Dynamic =
          value7 !== null &&
          value6.every(
            (input3?: Dynamic, ..._extraArguments: unknown[]) =>
              value5(input3) === value8,
          ) &&
          (value9
            ? (entries3.get(value8) ?? 0) === entries2.get(value8)
            : (entries3.get(value8) ?? 0) === 0 &&
              (entries4.get(value8) ?? 0) === 0);
        if (context && !value10) continue;
        if (!value10) {
          let entries6: Dynamic = new (Map as Dynamic)();
          for (let value12 of value6 as Dynamic) {
            let entry: Dynamic = entries6.get(value12.ch.summary);
            if (entry === undefined) {
              entries6.set(value12.ch.summary, (entry = []));
            }
            entry.push(value12);
          }
          for (let value12 of entries6.values() as Dynamic)
            if (!(value12.length < 2))
              for (let value13 of value12 as Dynamic) {
                values.add(value13.ch);
                if (value13.ch !== value12[0].ch) {
                  value13.ch.alias = value12[0].ch;
                }
              }
          continue;
        }
        let values2: Dynamic = new (Set as Dynamic)(
          value6
            .filter(
              (input3?: Dynamic, ..._extraArguments: unknown[]) =>
                input3.ch.summary === value7,
            )
            .map(
              (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                input3.ch,
            ),
        );
        let value11: Dynamic =
          value6.find(
            (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              values2.has(input3.ch),
          )?.ch ?? createChange(`chg`, `table`, value7);
        value11.summary = headerChangeLabel(value7, input2);
        let match: Dynamic = items3.find(
          (input3?: Dynamic, ..._extraArguments: unknown[]) =>
            input3.summary === value11.summary,
        );
        if (match === undefined) {
          items3.push(value11);
          entries.set(value11, {
            made: value9,
            axis: input2,
            lines: 1,
            cells: value6.length,
          });
        } else {
          let entry: Dynamic = entries.get(match);
          entry.lines += 1;
          entry.cells += value6.length;
          value11.alias = match;
          value11 = match;
        }
        for (let value12 of value6 as Dynamic)
          if (values2.has(value12.ch)) {
            values.add(value12.ch);
            if (value12.ch !== value11) {
              value12.ch.alias = value11;
            }
            let { [DIFF_ATTRIBUTES.summary]: value13, ...value14 }: Dynamic =
              value12.cell.attrs ?? {};
            value12.cell.attrs = value14;
          } else {
            let text: Dynamic = value12.ch.summary
              .split(`; `)
              .filter(
                (input3?: Dynamic, ..._extraArguments: unknown[]) =>
                  input3 !== value7,
              )
              .join(`; `);
            value12.ch.summary = text;
            value12.cell.attrs = {
              ...value12.cell.attrs,
              [DIFF_ATTRIBUTES.summary]: text,
            };
          }
      }
    };
    value3(
      `column`,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.g,
      true,
    );
    value3(
      `row`,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.r,
      true,
    );
    value3(
      `column`,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.g,
      false,
    );
    value3(
      `row`,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.r,
      false,
    );
    for (let [value5, value6] of entries as Dynamic)
      if (value6.lines > 1 && value6.cells === items2.length) {
        value5.summary = value6.made
          ? `Every cell made a header cell`
          : `Every header cell made a body cell`;
      } else {
        if (value6.lines > 1) {
          value5.summary = `Header ${value6.axis}s ${value6.made ? `added` : `removed`}`;
        }
      }
    let value4: Dynamic = hoistColumnWidthChanges(items, input, value);
    if (value4 !== null) {
      items3.push(value4);
    }
    return items3;
  }
  let visibleDiffText: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input.attrs?.[DIFF_ATTRIBUTES.kind] === `del`
      ? ``
      : input.type === `text`
        ? (input.marks ?? []).some(
            (input2?: Dynamic, ..._extraArguments: unknown[]) =>
              input2.type === DIFF_MARK_TYPES.del,
          )
          ? ``
          : (input.text ?? ``)
        : input.type === `hardBreak`
          ? ` `
          : nodeChildren(input)
              .map(visibleDiffText)
              .join(textBlockNodeTypes.has(input.type) ? `` : ` `);
  let isDeletedNode = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    input.attrs?.[DIFF_ATTRIBUTES.kind] === `del`;
  let normalizedCellSpan: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof input == `number` && Number.isFinite(input)
      ? Math.min(1e3, Math.max(1, Math.trunc(input)))
      : 1;
  function computeCellGridColumns(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let cache: Dynamic = new (WeakMap as Dynamic)();
    let items: Dynamic = [];
    for (let value of input as Dynamic) {
      if (isDeletedNode(value)) continue;
      let mapped: Dynamic = items.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]) => input2 > 0,
      );
      for (
        items = items.map((input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2 > 0 ? input2 - 1 : 0,
        );
        items.length > 0 && !(items[items.length - 1] > 0);

      )
        items.pop();
      let index: Dynamic = 0;
      for (let value2 of nodeChildren(value) as Dynamic) {
        if (isDeletedNode(value2)) continue;
        for (; index < 1e3 && mapped[index]; ) index++;
        if (index >= 1e3) break;
        cache.set(value2, index);
        let value3: Dynamic = Math.min(
          normalizedCellSpan(nodeAttribute(value2, `colspan`)),
          MAX_TABLE_COLUMNS - index,
        );
        let value4: Dynamic = normalizedCellSpan(
          nodeAttribute(value2, `rowspan`),
        );
        for (let index2: Dynamic = 0; index2 < value3; index2++) {
          mapped[index + index2] = true;
          if (value4 > 1) {
            items[index + index2] = Math.max(
              items[index + index2] ?? 0,
              value4 - 1,
            );
          }
        }
        index += value3;
      }
    }
    return cache;
  }
  function hoistColumnWidthChanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value9: Dynamic = nodeAttribute(input2, DIFF_ATTRIBUTES.before);
      return typeof value9 == `object` && value9 ? value9 : null;
    };
    let filtered: Dynamic = input.filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let value9: Dynamic = value(input2.cell);
        return (
          value9 !== null &&
          Object.hasOwn(value9, `colwidth`) &&
          !Object.hasOwn(value9, `colspan`)
        );
      },
    );
    if (!filtered.length) return null;
    let value2: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      Array.isArray(input2) &&
      input2.length > 0 &&
      input2.every(
        (input3?: Dynamic, ..._extraArguments: unknown[]) =>
          typeof input3 == `number`,
      )
        ? input2
        : null;
    let value3: Dynamic = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value9: Dynamic = input2?.[options2];
      return value9 === undefined || value9 <= 0 ? null : value9;
    };
    let value4 = (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      nodeAttribute(input2, `header`) === true;
    let items: Dynamic = [];
    for (let value9 of options as Dynamic) {
      if (isDeletedNode(value9)) continue;
      let filtered3: Dynamic = nodeChildren(value9).filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          !isDeletedNode(input2),
      );
      if (
        !(
          filtered3.length > 0 &&
          (filtered3.every(value4) ||
            filtered3.some(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                value4(input2) && (context.get(input2) ?? 0) > 0,
            ))
        )
      )
        break;
      items.push(filtered3);
    }
    let value5: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value9: Dynamic = ``;
      for (let value10 of items as Dynamic) {
        let match: Dynamic = value10.find(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let value11: Dynamic = context.get(input3) ?? -1;
            return (
              value11 <= input2 &&
              input2 <
                value11 + normalizedCellSpan(nodeAttribute(input3, `colspan`))
            );
          },
        );
        if (match === undefined || !value4(match)) break;
        if (normalizedCellSpan(nodeAttribute(match, `colspan`)) === 1) {
          value9 = visibleDiffText(match).replace(/\s+/g, ` `).trim();
          break;
        }
      }
      return value9 === ``
        ? `column ${input2 + 1}`
        : truncateCodePoints(value9, 24);
    };
    let value6 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let value9 = (
        input3?: Dynamic,
        options3?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        input3 === null
          ? `auto`
          : `${input3.join(`+`)}${options3 ? ` px` : ``}`;
      return input2 !== null && options2 !== null
        ? `${value9(input2, false)} → ${value9(options2, true)}`
        : `${value9(input2, true)} → ${value9(options2, true)}`;
    };
    let value7 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      input2 !== null && options2 !== null
        ? `${input2} → ${options2} px`
        : `${input2 === null ? `auto` : `${input2} px`} → ${options2 === null ? `auto` : `${options2} px`}`;
    let entries: Dynamic = new (Map as Dynamic)();
    for (let value9 of filtered as Dynamic) {
      let entry: Dynamic = context.get(value9.cell);
      if (entry === undefined) continue;
      let value10: Dynamic = nodeAttribute(value9.cell, DIFF_ATTRIBUTES.before);
      let value11: Dynamic = value2(
        typeof value10 == `object` && value10
          ? ownAttribute(value10, `colwidth`)
          : undefined,
      );
      let value12: Dynamic = value2(nodeAttribute(value9.cell, `colwidth`));
      let value13: Dynamic = Math.min(
        normalizedCellSpan(nodeAttribute(value9.cell, `colspan`)),
        MAX_TABLE_COLUMNS - entry,
      );
      let value14: Dynamic = false;
      for (let index: Dynamic = 0; index < value13; index++) {
        let [items2, items3]: Dynamic = [
          value3(value11, index),
          value3(value12, index),
        ];
        if (items2 !== items3) {
          value14 = true;
          if (!entries.has(entry + index)) {
            entries.set(
              entry + index,
              `${value5(entry + index)} ${value7(items2, items3)}`,
            );
          }
        }
      }
      if (!value14 && !entries.has(entry)) {
        entries.set(entry, `${value5(entry)} ${value6(value11, value12)}`);
      }
    }
    let filtered2: Dynamic = filtered.filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveChangeAlias(input2.ch).summary === `Column resized`,
    );
    let value8: Dynamic =
      filtered2.length > 0
        ? resolveChangeAlias(filtered2[0].ch)
        : createChange(`chg`, `table`, ``);
    value8.summary =
      entries.size === 0
        ? `Column resized`
        : `${entries.size > 1 ? `Columns resized` : `Column resized`}: ${[
            ...entries.keys(),
          ]
            .toSorted(
              (
                input2?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => input2 - options2,
            )
            .map(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                entries.get(input2),
            )
            .join(`, `)}`;
    for (let value9 of filtered2 as Dynamic) {
      let value10: Dynamic = resolveChangeAlias(value9.ch);
      if (value10 !== value8) {
        value10.alias = value8;
      }
      let { [DIFF_ATTRIBUTES.summary]: value11, ...value12 }: Dynamic =
        value9.cell.attrs ?? {};
      value9.cell.attrs = value12;
    }
    return value8;
  }
  let plainTextToken: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    text: input,
    segs: [
      {
        text: input,
        marks: [],
      },
    ],
    node: null,
    key: `t${input}`,
    ident: null,
  });
  /* Subsystem: inline-diff */
  function atomTokenIdentity(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    switch (input.type) {
      case `mention`:
        return typeof nodeAttribute(input, `principal`) == `string`
          ? `mention:person`
          : typeof nodeAttribute(input, `ref`) == `string`
            ? `mention:ref`
            : `mention`;
      case `date`:
        return `date`;
      case `dropdown`:
        return `dropdown:${stableJSONStringify(nodeAttribute(input, `enum`) ?? null)}`;
      case `media`: {
        let value: Dynamic = nodeAttribute(input, `blob`);
        if (typeof value == `string`) return `media:${value}`;
        break;
      }
      case `hardBreak`:
        return `hardBreak`;
      default:
        break;
    }
    return `x:${nodeContentKey(input, options)}`;
  }
  function inlineTokens(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (; index < input.length; ) {
      let value: Dynamic = input[index];
      if (value.type !== `text`) {
        items.push({
          text: null,
          segs: [],
          node: value,
          key: `a${nodeContentKey(value, options)}`,
          ident: atomTokenIdentity(value, options),
        });
        index++;
        continue;
      }
      let items2: Dynamic = [];
      let value2: Dynamic = ``;
      for (; index < input.length && input[index].type === `text`; index++) {
        let value3: Dynamic = input[index];
        let value4: Dynamic = typeof value3.text == `string` ? value3.text : ``;
        items2.push({
          start: value2.length,
          end: value2.length + value4.length,
          marks: value3.marks ?? [],
        });
        value2 += value4;
      }
      let index2: Dynamic = 0;
      let index3: Dynamic = 0;
      for (let value3 of tokenizeWords(value2) as Dynamic) {
        let value4: Dynamic = index3 + value3.length;
        for (; items2[index2].end <= index3; ) index2++;
        let items3: Dynamic = [];
        for (
          let value5: Dynamic = index2;
          value5 < items2.length && items2[value5].start < value4;
          value5++
        ) {
          let value6: Dynamic = items2[value5];
          let value7: Dynamic = Math.max(index3, value6.start);
          let value8: Dynamic = Math.min(value4, value6.end);
          if (value8 > value7) {
            items3.push({
              text: value2.slice(value7, value8),
              marks: value6.marks,
            });
          }
        }
        items.push({
          text: value3,
          segs: items3,
          node: null,
          key: `t${value3}`,
          ident: null,
        });
        index3 = value4;
      }
    }
    return items;
  }
  function alignInlineTokens(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    let items: Dynamic = [];
    let items2: Dynamic = [];
    input.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!isWhitespaceToken(input2)) {
          items.push(options2);
        }
      },
    );
    options.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!isWhitespaceToken(input2)) {
          items2.push(options2);
        }
      },
    );
    let value: Dynamic = sequenceMatchesWithinBudget(
      Int32Array.from(
        items,
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          internKey(entries, input[input2].key),
      ),
      Int32Array.from(
        items2,
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          internKey(entries, options[input2].key),
      ),
      context,
    );
    let items3: Dynamic = [];
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let value2 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        index < input2 &&
        index2 < options2 &&
        input2 - index + (options2 - index2) <= 512
      ) {
        let value3: Dynamic = index;
        let value4: Dynamic = index2;
        let value5: Dynamic = sequenceMatchesWithinBudget(
          Int32Array.from(
            {
              length: input2 - value3,
            },
            (
              input3?: unknown,
              options3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => internKey(entries, input[value3 + options3].key),
          ),
          Int32Array.from(
            {
              length: options2 - value4,
            },
            (
              input3?: unknown,
              options3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => internKey(entries, options[value4 + options3].key),
          ),
          context,
        );
        for (let index3: Dynamic = 0; index3 < value5.length; index3 += 2) {
          let value6: Dynamic = value3 + value5[index3];
          let value7: Dynamic = value4 + value5[index3 + 1];
          for (; index < value6; )
            items3.push({
              k: `del`,
              a: input[index++],
            });
          for (; index2 < value7; )
            items3.push({
              k: `ins`,
              b: options[index2++],
            });
          items3.push({
            k: `keep`,
            a: input[index++],
            b: options[index2++],
          });
        }
      }
      for (; index < input2; )
        items3.push({
          k: `del`,
          a: input[index++],
        });
      for (; index2 < options2; )
        items3.push({
          k: `ins`,
          b: options[index2++],
        });
    };
    for (let index3: Dynamic = 0; index3 < value.length; index3 += 2) {
      value2(items[value[index3]], items2[value[index3 + 1]]);
      items3.push({
        k: `keep`,
        a: input[index++],
        b: options[index2++],
      });
    }
    value2(input.length, options.length);
    return recoverTextAndWhitespaceMatches(
      trimFormattedTokenRuns(
        splitWhitespaceBetweenChanges(pairChangedAtoms(items3)),
      ),
    );
  }
  function pairChangedAtoms(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (; index < input.length; ) {
      if (input[index].k === `keep`) {
        items.push(input[index++]);
        continue;
      }
      let value: Dynamic = index;
      for (; value < input.length && input[value].k !== `keep`; ) value++;
      let slice: Dynamic = input.slice(index, value);
      index = value;
      let value2: Dynamic = slice.flatMap(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.k === `del` ? [input2] : [],
      );
      let values: Dynamic = new (Set as Dynamic)();
      let entries: Dynamic = new (Map as Dynamic)();
      for (let value4 of slice as Dynamic) {
        if (value4.k !== `ins` || value4.b.ident === null) continue;
        let index3: Dynamic = value2.findIndex(
          (
            input2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !values.has(options) && input2.a.ident === value4.b.ident,
        );
        if (!(index3 < 0)) {
          values.add(index3);
          entries.set(value4, index3);
        }
      }
      if (entries.size === 0) {
        for (let value4 of slice as Dynamic) items.push(value4);
        continue;
      }
      let index2: Dynamic = 0;
      let items2: Dynamic = [];
      let value3 = (
        input2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (; index2 < input2; index2++)
          if (!values.has(index2)) {
            items.push(value2[index2]);
          }
        for (let value4 of items2 as Dynamic) items.push(value4);
        items2 = [];
      };
      for (let value4 of slice as Dynamic) {
        if (value4.k !== `ins`) continue;
        let entry: Dynamic = entries.get(value4);
        if (entry === undefined) {
          items2.push(value4);
        } else {
          value3(entry);
          items.push({
            k: `keep`,
            a: value2[entry].a,
            b: value4.b,
          });
        }
      }
      value3(value2.length);
    }
    return items;
  }
  function splitWhitespaceBetweenChanges(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    for (let index: Dynamic = 0; index < input.length; index++) {
      let value: Dynamic = input[index];
      if (
        value.k === `keep` &&
        isWhitespaceToken(value.b) &&
        index > 0 &&
        index < input.length - 1 &&
        input[index - 1].k !== `keep` &&
        input[index + 1].k !== `keep` &&
        value.k === `keep`
      ) {
        items.push(
          {
            k: `del`,
            a: value.a,
          },
          {
            k: `ins`,
            b: value.b,
          },
        );
      } else {
        items.push(value);
      }
    }
    return items;
  }
  function uniformTokenMarks(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let values: Dynamic = new (Set as Dynamic)(
      input.segs.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          marksKey(input2.marks),
      ),
    );
    return values.size === 1 ? Array.from<Dynamic>(values)[0] : null;
  }
  function trimFormattedTokenRuns(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (
      input2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      for (
        let value2: Dynamic = input2;
        value2 >= 0 && value2 < input.length && input[value2].k !== `keep`;
        value2 += options
      ) {
        let value3: Dynamic = input[value2];
        if (
          value3.k === `del` &&
          value3.a.text !== null &&
          isSubstantiveToken(value3.a)
        )
          return value3.a;
      }
    };
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (; index < input.length; ) {
      if (input[index].k !== `keep`) {
        items.push(input[index++]);
        continue;
      }
      let value2: Dynamic = index;
      for (; value2 < input.length && input[value2].k === `keep`; ) value2++;
      let slice: Dynamic = input.slice(index, value2);
      let value3: Dynamic = index > 0 && value2 < input.length;
      let value4: Dynamic;
      let index2: Dynamic = 0;
      for (let value5 of slice as Dynamic) {
        if (!value3) break;
        if (value5.k !== `keep` || value5.b.text === null) value3 = false;
        else if (isSubstantiveToken(value5.b)) {
          index2++;
          let value6: Dynamic = uniformTokenMarks(value5.a);
          if (value4 === undefined) {
            value4 = value6;
          }
          value3 =
            value6 !== null &&
            value6 !== `` &&
            value6 === value4 &&
            markedTextSegments(value5.a, value5.b).some(
              (input2?: Dynamic, ..._extraArguments: unknown[]) =>
                input2.delta !== null,
            );
        }
      }
      if (value3 && index2 > 0 && index2 <= 2) {
        let value5: Dynamic = value(index - 1, -1);
        let value6: Dynamic = value(value2, 1);
        value3 =
          value5 !== undefined &&
          value6 !== undefined &&
          uniformTokenMarks(value5) === value4 &&
          uniformTokenMarks(value6) === value4;
      } else value3 = false;
      for (let value5 of slice as Dynamic)
        if (value3 && value5.k === `keep`) {
          items.push(
            {
              k: `del`,
              a: value5.a,
            },
            {
              k: `ins`,
              b: value5.b,
            },
          );
        } else {
          items.push(value5);
        }
      index = value2;
    }
    return items;
  }
  function sliceTextToken(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let slice: Dynamic = (input.text ?? ``).slice(options, context);
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (let value of input.segs as Dynamic) {
      let value2: Dynamic = Math.max(options, index);
      let value3: Dynamic = Math.min(context, index + value.text.length);
      if (value3 > value2) {
        items.push({
          text: value.text.slice(value2 - index, value3 - index),
          marks: value.marks,
        });
      }
      index += value.text.length;
    }
    return {
      text: slice,
      segs: items,
      node: null,
      key: `t${slice}`,
      ident: null,
    };
  }
  function alignEqualTextLength(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let index3: Dynamic = 0;
    let index4: Dynamic = 0;
    let index5: Dynamic = 0;
    for (; index < input.length || index2 < options.length; ) {
      let value: Dynamic = input[index];
      let value2: Dynamic = options[index2];
      if (value !== undefined && value.text === null) {
        items.push({
          k: `del`,
          a: value,
        });
        index++;
      } else if (value2 !== undefined && value2.text === null) {
        items.push({
          k: `ins`,
          b: value2,
        });
        index2++;
      } else if (
        index5 < context &&
        value !== undefined &&
        value2 !== undefined
      ) {
        let length: Dynamic = (value.text ?? ``).length;
        let length2: Dynamic = (value2.text ?? ``).length;
        let value3: Dynamic = Math.min(
          length - index3,
          length2 - index4,
          context - index5,
        );
        items.push({
          k: `keep`,
          a: sliceTextToken(value, index3, index3 + value3),
          b: sliceTextToken(value2, index4, index4 + value3),
        });
        index5 += value3;
        index3 += value3;
        index4 += value3;
        if (index3 === length) {
          [index, index3] = [index + 1, 0];
        }
        if (index4 === length2) {
          [index2, index4] = [index2 + 1, 0];
        }
      } else if (value === undefined) {
        if (value2 !== undefined) {
          items.push({
            k: `ins`,
            b: index4
              ? sliceTextToken(value2, index4, (value2.text ?? ``).length)
              : value2,
          });
          [index2, index4] = [index2 + 1, 0];
        }
      } else {
        items.push({
          k: `del`,
          a: index3
            ? sliceTextToken(value, index3, (value.text ?? ``).length)
            : value,
        });
        [index, index3] = [index + 1, 0];
      }
    }
    return items;
  }
  function recoverTextAndWhitespaceMatches(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (; index < input.length; ) {
      if (input[index].k === `keep`) {
        items.push(input[index++]);
        continue;
      }
      let value: Dynamic = index;
      for (; value < input.length && input[value].k !== `keep`; ) value++;
      let slice: Dynamic = input.slice(index, value);
      index = value;
      let items2: Dynamic = [];
      let items3: Dynamic = [];
      for (let value4 of slice as Dynamic)
        if (value4.k === `del`) {
          items2.push(value4.a);
        } else {
          if (value4.k === `ins`) {
            items3.push(value4.b);
          }
        }
      let text: Dynamic = items2
        .map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.text ?? ``,
        )
        .join(``);
      let text2: Dynamic = items3
        .map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.text ?? ``,
        )
        .join(``);
      let value2: Dynamic =
        items2.some(
          (input2?: Dynamic, ..._extraArguments: unknown[]) =>
            input2.text === null,
        ) ||
        items3.some(
          (input2?: Dynamic, ..._extraArguments: unknown[]) =>
            input2.text === null,
        );
      let value3: Dynamic = -1;
      if (value2 && text !== `` && text === text2) value3 = text.length;
      else if (
        !value2 &&
        whitespacePattern.test(text) &&
        whitespacePattern.test(text2)
      ) {
        let index2: Dynamic = 0;
        for (
          ;
          index2 < text.length &&
          index2 < text2.length &&
          text[index2] === text2[index2];

        )
          index2++;
        if (index2 > 0) {
          value3 = index2;
        }
      }
      for (let value4 of (value3 < 0
        ? slice
        : alignEqualTextLength(items2, items3, value3)) as Dynamic)
        items.push(value4);
    }
    return items;
  }
  function orderDeletionsBeforeInsertions(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let value = (..._extraArguments: unknown[]): undefined => {
      for (let value2 of items2 as Dynamic) items.push(value2);
      items2 = [];
    };
    for (let value2 of input as Dynamic)
      if (value2.k === `ins`) {
        items2.push(value2);
      } else {
        if (value2.k === `keep`) {
          value();
        }
        items.push(value2);
      }
    value();
    return items;
  }
  function diffInlineSequence(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return options.type === `codeBlock`
      ? orderDeletionsBeforeInsertions(diffCodeLines(input, options, context))
      : orderDeletionsBeforeInsertions(
          alignInlineTokens(
            inlineTokens(nodeChildren(input), context),
            inlineTokens(nodeChildren(options), context),
            context,
          ),
        );
  }
  function diffTextBlockTokens(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = nodeChildren(input);
    let value2: Dynamic = nodeChildren(options);
    if (
      value.length === value2.length &&
      value.every(
        (input2?: Dynamic, options2?: Dynamic, ..._extraArguments: unknown[]) =>
          nodeContentKey(input2, context) ===
          nodeContentKey(value2[options2], context),
      )
    ) {
      let value4: Dynamic = detectAtomRunIdentityChanges(
        input,
        options,
        context,
      );
      return value4 === null
        ? null
        : {
            ops: value4,
            runs: true,
          };
    }
    let value3: Dynamic = alignTokensByRunId(input, options, context);
    return value3 === null
      ? {
          ops: diffInlineSequence(input, options, context),
          runs: false,
        }
      : {
          ops: orderDeletionsBeforeInsertions(value3),
          runs: true,
        };
  }
  function detectAtomRunIdentityChanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (
      !nodeChildren(options).some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.type !== `text`,
      )
    )
      return null;
    let value: Dynamic = nodeBlockId(input);
    let value2: Dynamic = nodeBlockId(options);
    let value3: Dynamic =
      value === null ? undefined : context.prevRuns.get(value);
    let value4: Dynamic =
      value2 === null ? undefined : context.nextRuns.get(value2);
    if (value3 === undefined || value4 === undefined) return null;
    let value5: Dynamic = tokensWithRunIds(
      nodeChildren(input),
      value3,
      context,
    );
    let value6: Dynamic = tokensWithRunIds(
      nodeChildren(options),
      value4,
      context,
    );
    if (value5 === null || value6 === null || value5.length !== value6.length)
      return null;
    let items: Dynamic = [];
    let value7: Dynamic = false;
    value5.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value8: Dynamic = value6[options2];
        if (
          input2.tok.text === null &&
          value8.tok.text === null &&
          input2.id !== value8.id
        ) {
          items.push(
            {
              k: `del`,
              a: input2.tok,
            },
            {
              k: `ins`,
              b: value8.tok,
            },
          );
          value7 = true;
        } else {
          items.push({
            k: `keep`,
            a: input2.tok,
            b: value8.tok,
          });
        }
      },
    );
    return value7 ? items : null;
  }
  function hasNestedRunIdentityChanges(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (context.prevRuns.size === 0 || context.nextRuns.size === 0)
      return false;
    if (textBlockNodeTypes.has(options.type))
      return detectAtomRunIdentityChanges(input, options, context) !== null;
    let value: Dynamic = nodeChildren(input);
    let value2: Dynamic = nodeChildren(options);
    return (
      value.length === value2.length &&
      value.some(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          hasNestedRunIdentityChanges(input2, value2[options2], context),
      )
    );
  }
  function isHeavyInlineReplacement(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    let value: Dynamic = false;
    let value2: Dynamic = false;
    let index3: Dynamic = 0;
    let index4: Dynamic = 0;
    for (let value3 of input as Dynamic)
      if (isSubstantiveToken(value3.k === `del` ? value3.a : value3.b)) {
        if (value3.k !== `ins`) {
          index3++;
        }
        if (value3.k !== `del`) {
          index4++;
        }
        if (value3.k === `keep`) {
          index2 += 2;
        } else {
          index++;
          index2++;
          if (value3.k === `del`) {
            value = true;
          } else {
            value2 = true;
          }
        }
      }
    return (
      value &&
      value2 &&
      index3 >= 5 &&
      index4 >= 5 &&
      index2 > 0 &&
      index / index2 > REPLACEMENT_CHANGE_RATIO
    );
  }
  function tokensWithRunIds(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (options.opaque || !Array.isArray(options.runs)) return null;
    let items: Dynamic = [];
    for (let value2 of options.runs as Dynamic) {
      if (typeof value2?.id != `string`) return null;
      let value3: Dynamic = value2.id.lastIndexOf(`.`);
      let value4: Dynamic = Number(value2.id.slice(value3 + 1));
      if (value3 <= 0 || !Number.isInteger(value4) || !(value2.len >= 0))
        return null;
      let slice: Dynamic = value2.id.slice(0, value3);
      for (let index2: Dynamic = 0; index2 < value2.len; index2++)
        items.push(`${slice}.${value4 + index2}`);
    }
    let items2: Dynamic = [];
    let index: Dynamic = 0;
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (index + input2 > items.length) return null;
      let text: Dynamic = items.slice(index, index + input2).join(`+`);
      index += input2;
      return text;
    };
    for (let value2 of input as Dynamic)
      if (value2.type === `text`) {
        let value3: Dynamic = value2.marks ?? [];
        for (let value4 of tokenizeGraphemes(
          typeof value2.text == `string` ? value2.text : ``,
        ) as Dynamic) {
          let value5: Dynamic = value([...value4].length);
          if (value5 === null) return null;
          items2.push({
            id: value5,
            tok: {
              text: value4,
              segs: [
                {
                  text: value4,
                  marks: value3,
                },
              ],
              node: null,
              key: `t${value4}`,
              ident: null,
            },
          });
        }
      } else {
        let value3: Dynamic = value(1);
        if (value3 === null) return null;
        items2.push({
          id: value3,
          tok: {
            text: null,
            segs: [],
            node: value2,
            key: `a${nodeContentKey(value2, context)}`,
            ident: atomTokenIdentity(value2, context),
          },
        });
      }
    return index === items.length ? items2 : null;
  }
  function alignTokensByRunId(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = nodeBlockId(input);
    let value2: Dynamic = nodeBlockId(options);
    let value3: Dynamic =
      value === null ? undefined : context.prevRuns.get(value);
    let value4: Dynamic =
      value2 === null ? undefined : context.nextRuns.get(value2);
    if (value3 === undefined || value4 === undefined) return null;
    let value5: Dynamic = tokensWithRunIds(
      nodeChildren(input),
      value3,
      context,
    );
    let value6: Dynamic = tokensWithRunIds(
      nodeChildren(options),
      value4,
      context,
    );
    if (value5 === null || value6 === null) return null;
    let entries: Dynamic = new (Map as Dynamic)();
    value6.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => entries.set(input2.id, options2),
    );
    if (
      entries.size !== value6.length ||
      new (Set as Dynamic)(
        value5.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.id,
        ),
      ).size !== value5.length
    )
      return null;
    let items: Dynamic = [];
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let value8 of value5 as Dynamic) {
      let entry: Dynamic = entries.get(value8.id);
      if (entry === undefined) {
        items.push({
          k: `del`,
          a: value8.tok,
        });
        continue;
      }
      if (entry < index) return null;
      for (; index < entry; )
        items.push({
          k: `ins`,
          b: value6[index++].tok,
        });
      let tok: Dynamic = value6[index++].tok;
      if (
        !(value8.tok.text === null
          ? tok.text === null && value8.tok.node.type === tok.node.type
          : value8.tok.text === tok.text)
      )
        return null;
      items.push({
        k: `keep`,
        a: value8.tok,
        b: tok,
      });
      if (isSubstantiveToken(tok)) {
        index2++;
      }
    }
    for (; index < value6.length; )
      items.push({
        k: `ins`,
        b: value6[index++].tok,
      });
    let value7: Dynamic =
      value5.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isSubstantiveToken(input2.tok),
      ).length +
      value6.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isSubstantiveToken(input2.tok),
      ).length;
    return value7 > 0 && (2 * index2) / value7 < 0.3
      ? null
      : groupNumericTokenChanges(items);
  }
  let numericCharacterPattern: Dynamic = /^[\p{N}%]$/u;
  let numericSeparatorPattern: Dynamic = /^[.,:]$/;
  function groupNumericTokenChanges(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      input2 === undefined
        ? null
        : (input2.k === `del` ? input2.a : input2.b).text;
    let value2: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value3: Dynamic = value(input[input2]);
      return value3 === null
        ? false
        : numericCharacterPattern.test(value3) ||
            (numericSeparatorPattern.test(value3) &&
              numericCharacterPattern.test(value(input[input2 + 1]) ?? ``));
    };
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (; index < input.length; ) {
      if (!numericCharacterPattern.test(value(input[index]) ?? ``)) {
        items.push(input[index++]);
        continue;
      }
      let value3: Dynamic = index;
      for (; value3 < input.length && value2(value3); ) value3++;
      let slice: Dynamic = input.slice(index, value3);
      index = value3;
      let value4: Dynamic = slice.some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.k !== `keep`,
      );
      for (let value5 of slice as Dynamic)
        if (value4 && value5.k === `keep`) {
          items.push(
            {
              k: `del`,
              a: value5.a,
            },
            {
              k: `ins`,
              b: value5.b,
            },
          );
        } else {
          items.push(value5);
        }
    }
    return items;
  }
  let splitCodeLines: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (input === `` ? [] : input.split(/(?<=\n)/));
  function diffCodeLines(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = splitCodeLines(inlinePlainText(input));
    let value2: Dynamic = splitCodeLines(inlinePlainText(options));
    let entries: Dynamic = new (Map as Dynamic)();
    let value3: Dynamic = sequenceMatchesWithinBudget(
      Int32Array.from(
        value,
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          internKey(entries, input2),
      ),
      Int32Array.from(
        value2,
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          internKey(entries, input2),
      ),
      context,
    );
    let items: Dynamic = [];
    let value4: Dynamic = (
      input2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      value5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value6: Dynamic = options2 - input2;
      let value7: Dynamic = value5 - context2;
      let value8 = (..._extraArguments: unknown[]): undefined => {
        for (let value13: Dynamic = input2; value13 < options2; value13++)
          items.push({
            k: `del`,
            a: plainTextToken(value[value13]),
          });
        for (let value13: Dynamic = context2; value13 < value5; value13++)
          items.push({
            k: `ins`,
            b: plainTextToken(value2[value13]),
          });
      };
      if (value6 === 0 || value7 === 0) return value8();
      if (value6 * value7 > DIFF_WORK_LIMITS.pairCells) {
        context.degrade(`budget`);
        return value8();
      }
      let value9: Dynamic = (
        input3?: Dynamic,
        options3?: Dynamic,
        context3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        input3
          .slice(options3, context3)
          .map(
            (input4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              textWordBag(input4, context),
          );
      let value10: Dynamic = value9(value, input2, options2);
      let value11: Dynamic = value9(value2, context2, value5);
      let value12: Dynamic = (
        input3?: Dynamic,
        options3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value13: Dynamic = bagSimilarity(
          value10[input3],
          value11[options3],
        );
        return value6 * value7 === 1 || value13 >= MIN_CONTENT_SIMILARITY
          ? 1 + Math.round(value13 * 100)
          : 0;
      };
      for (let value13 of weightedPairAlignment(
        value6,
        value7,
        value12,
      ) as Dynamic)
        if (value13.op === `pair`) {
          let mapped: Dynamic = tokenizeWords(value[input2 + value13.i]).map(
            plainTextToken,
          );
          let mapped2: Dynamic = tokenizeWords(
            value2[context2 + value13.j],
          ).map(plainTextToken);
          for (let value14 of alignInlineTokens(
            mapped,
            mapped2,
            context,
          ) as Dynamic)
            items.push(value14);
        } else if (value13.op === `del`) {
          items.push({
            k: `del`,
            a: plainTextToken(value[input2 + value13.i]),
          });
        } else {
          items.push({
            k: `ins`,
            b: plainTextToken(value2[context2 + value13.j]),
          });
        }
    };
    let index: Dynamic = 0;
    let index2: Dynamic = 0;
    for (let index3: Dynamic = 0; index3 < value3.length; index3 += 2) {
      let value5: Dynamic = value3[index3];
      let value6: Dynamic = value3[index3 + 1];
      value4(index, value5, index2, value6);
      items.push({
        k: `keep`,
        a: plainTextToken(value[value5]),
        b: plainTextToken(value2[value6]),
      });
      index = value5 + 1;
      index2 = value6 + 1;
    }
    value4(index, value.length, index2, value2.length);
    return items;
  }
  let textNodeWithMarks: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.length
      ? {
          type: `text`,
          text: input,
          marks: options,
        }
      : {
          type: `text`,
          text: input,
        };
  let tokenMarkDelta: Dynamic = (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input === options || marksKey(input) === marksKey(options)
      ? null
      : markChangeSummary(input, options);
  function markedTextSegments(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.segs.length === 1 && options.segs.length === 1)
      return [
        {
          text: options.text ?? ``,
          marks: options.segs[0].marks,
          delta: tokenMarkDelta(input.segs[0].marks, options.segs[0].marks),
        },
      ];
    let items: Dynamic = [];
    let index: Dynamic = 0;
    let value: Dynamic = input.segs[0]?.text.length ?? 0;
    let index2: Dynamic = 0;
    for (let value2 of options.segs as Dynamic) {
      let index3: Dynamic = 0;
      for (; index3 < value2.text.length; ) {
        for (; index < input.segs.length - 1 && value <= index2; )
          value += input.segs[++index].text.length;
        let value3: Dynamic = Math.max(
          1,
          Math.min(value2.text.length - index3, value - index2),
        );
        items.push({
          text: value2.text.slice(index3, index3 + value3),
          marks: value2.marks,
          delta: tokenMarkDelta(input.segs[index]?.marks ?? [], value2.marks),
        });
        index3 += value3;
        index2 += value3;
      }
    }
    return items;
  }
  function finalizeTextChangeSummary(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value: Dynamic =
      input.sides.size === 2
        ? `replace`
        : input.sides.has(`ins`)
          ? `ins`
          : `del`;
    let value2: Dynamic =
      value === `replace` ? `replaced` : value === `ins` ? `added` : `deleted`;
    let value3: Dynamic = `Text`;
    let value4: Dynamic = `text`;
    let atoms: Dynamic = input.atoms;
    if (!input.text && atoms.length) {
      let type: Dynamic = atoms[0].type;
      let value5: Dynamic = atoms.every(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          input2.type === type,
      );
      let value6: Dynamic =
        value === `replace` ? atoms.length === 2 : atoms.length === 1;
      value3 =
        value5 && value6 ? nodeLabel(atoms[atoms.length - 1]) : `Content`;
      value4 = type;
    }
    input.ch.kind = value;
    input.ch.nodeType = value4;
    input.ch.summary = `${value3} ${value2}`;
  }
  function renderInlineDiff(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let value: Dynamic = null;
    let value2: Dynamic = null;
    let value3 = (..._extraArguments: unknown[]): undefined => {
      if (value !== null) {
        finalizeTextChangeSummary(value);
      }
      value = null;
    };
    for (let value4 of input as Dynamic) {
      if (value4.k === `keep`) {
        let { a: a2, b: b2 }: Dynamic = value4;
        if (b2.text === null) {
          value3();
          value2 = null;
          items.push(diffInlineAtom(a2.node, b2.node, options));
          continue;
        }
        if (!whitespacePattern.test(b2.text)) {
          value3();
        }
        for (let value7 of markedTextSegments(a2, b2) as Dynamic)
          if (value7.delta === null) {
            if (!(value2 !== null && whitespacePattern.test(value7.text))) {
              value2 = null;
            }
            items.push(textNodeWithMarks(value7.text, value7.marks));
          } else {
            if (value2 === null || value2.summary !== value7.delta) {
              let value8: Dynamic = createChange(`fmt`, `text`, value7.delta);
              value2 = {
                summary: value7.delta,
                mark: createDiffMark(
                  DIFF_MARK_TYPES.fmt,
                  value8,
                  options,
                  value7.delta,
                ),
              };
            }
            items.push(
              textNodeWithMarks(value7.text, [...value7.marks, value2.mark]),
            );
          }
        continue;
      }
      value2 = null;
      let k2: Dynamic = value4.k;
      let value5: Dynamic = value4.k === `del` ? value4.a : value4.b;
      let value6: Dynamic = value ?? {
        ch: createChange(k2, `text`, ``),
        del: null,
        ins: null,
        text: false,
        atoms: [],
        sides: new (Set as Dynamic)(),
      };
      value = value6;
      value6.sides.add(k2);
      if (value5.text !== null) {
        value6.text = true;
        let value7: Dynamic = (value6[k2] ??= createDiffMark(
          k2 === `ins` ? DIFF_MARK_TYPES.ins : DIFF_MARK_TYPES.del,
          value6.ch,
          options,
        ));
        for (let value8 of value5.segs as Dynamic)
          items.push(textNodeWithMarks(value8.text, [...value8.marks, value7]));
      } else {
        value6.atoms.push(value5.node);
        let state: Dynamic = {
          ...value5.node,
        };
        attachNodeChange(
          state,
          k2,
          value6.ch,
          options,
          deletedDropdownFace(state, k2, options),
        );
        items.push(state);
      }
    }
    value3();
    return mergeAdjacentTextNodes(items, options);
  }
  function isInitialMentionLabel(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (
      options.type !== `mention` ||
      context.length !== 1 ||
      context[0] !== `label`
    )
      return false;
    let value: Dynamic = effectiveNodeAttribute(input, `label`);
    return value === null || (typeof value == `string` && value.trim() === ``);
  }
  function diffInlineAtom(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (nodeContentKey(input, context) === nodeContentKey(options, context))
      return options;
    let items: Dynamic = [];
    let value: Dynamic = changedAttributeNames(input, options);
    let value2: Dynamic = isInitialMentionLabel(input, options, value)
      ? null
      : nodeAttributeDelta(input, options, context, value);
    if (value2 !== null) {
      items.push(value2.summary);
    }
    let value3: Dynamic = markChangeSummary(
      input.marks ?? [],
      options.marks ?? [],
    );
    if (value3 !== null) {
      items.push(value3);
    }
    if (!items.length) return options;
    let text: Dynamic = items.join(`; `);
    let state: Dynamic = {
      ...options,
    };
    attachNodeChange(
      state,
      `chg`,
      createChange(`chg`, options.type, text),
      context,
      {
        [DIFF_ATTRIBUTES.summary]: text,
        ...(value2 === null
          ? {}
          : {
              [DIFF_ATTRIBUTES.before]: value2.before,
            }),
      },
    );
    return state;
  }
  function marksCanMerge(
    input?: Dynamic,
    options?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (input === options) return true;
    let value: Dynamic = input ?? [];
    let value2: Dynamic = options ?? [];
    if (value.length !== value2.length) return false;
    for (let index: Dynamic = 0; index < value.length; index++) {
      let value3: Dynamic = value[index];
      let value4: Dynamic = value2[index];
      if (
        value3 !== value4 &&
        (diffContext.markCh.has(value3) ||
          diffContext.markCh.has(value4) ||
          markKey(value3) !== markKey(value4))
      )
        return false;
    }
    return true;
  }
  function mergeAdjacentTextNodes(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    for (let value of input as Dynamic) {
      let value2: Dynamic = items[items.length - 1];
      if (
        value.type === `text` &&
        value2?.type === `text` &&
        marksCanMerge(value2.marks, value.marks, options)
      ) {
        value2.text = (value2.text ?? ``) + (value.text ?? ``);
      } else {
        items.push(value);
      }
    }
    return items;
  }
  /* Subsystem: moves-and-worker */
  function collectMoveCandidates(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let value = (
      input2?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      value3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      items.push({
        out: input2,
        src: options2,
        side: context,
        husk: value3,
        ancestors: items2.slice(),
        listDepth: items2.filter(
          (input3?: Dynamic, ..._extraArguments: unknown[]) =>
            input3.type === `list`,
        ).length,
      });
    };
    let value2 = (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        options.ghosts.has(input2) ||
        options.settled.has(input2) ||
        input2.type === `text`
      )
        return;
      let value3: Dynamic = options.regionRoots.get(input2) ?? options2;
      let value4: Dynamic =
        value3 === null ? undefined : options.source.get(input2);
      if (
        value3 !== null &&
        value4 !== undefined &&
        !immovableNodeTypes.has(input2.type)
      ) {
        value(input2, value4, value3, false);
      }
      let value5: Dynamic =
        value3 === null ? options.husks.get(input2) : undefined;
      if (value5 !== undefined) {
        value(input2, value5, `del`, true);
      }
      if (!textBlockNodeTypes.has(input2.type)) {
        items2.push(input2);
        for (let value6 of nodeChildren(input2) as Dynamic)
          value2(value6, value3);
        items2.pop();
      }
    };
    value2(input, null);
    return items;
  }
  function moveCandidateIdentity(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let value: Dynamic = input.husk ? null : commonBlockId(input.src, options);
    if (value !== null) return `b:${value}`;
    if (nodeWordBag(input.src, options).length === 0) return null;
    let value2: Dynamic = nodeContentKey(input.src, options);
    let { prev: prev, curr: curr }: Dynamic = options.hashCounts();
    return prev.get(value2) === 1 && curr.get(value2) === 1
      ? `h:${value2}`
      : null;
  }
  function moveRegionRoot(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (options.regionRoots.get(input.out) === input.side) return input.out;
    for (let value: Dynamic = input.ancestors.length - 1; value >= 0; value--) {
      let value2: Dynamic = input.ancestors[value];
      if (options.regionRoots.get(value2) === input.side) return value2;
    }
    return null;
  }
  function isNestedSmallMoveCandidate(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    if (input.husk || commonBlockId(input.src, context) !== null) return false;
    let value = (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      moveRegionRoot(input2, context) !== input2.out;
    return (
      value(input) &&
      value(options) &&
      nodeWordBag(input.src, context).length < 4
    );
  }
  function pairSimilarMovedTextBlocks(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !options.has(input2) &&
      !input2.husk &&
      context.regionRoots.get(input2.out) === input2.side &&
      commonBlockId(input2.src, context) === null &&
      (input2.src.type === `codeBlock` ||
        (input2.src.type === `paragraph` &&
          effectiveNodeAttribute(input2.src, `heading`) === null)) &&
      nodeWordCount(input2.src) >= 6;
    let filtered: Dynamic = input.filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.side === `del` && value(input2),
    );
    let filtered2: Dynamic = input.filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.side === `ins` && value(input2),
    );
    if (!filtered.length || !filtered2.length) return [];
    let entries: Dynamic = new (Map as Dynamic)();
    filtered2.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (let value3 of new (Set as Dynamic)(
          nodeWordBag(input2.src, context),
        ) as Dynamic) {
          let entry: Dynamic = entries.get(value3);
          if (entry === undefined) {
            entries.set(value3, (entry = []));
          }
          entry.push(options2);
        }
      },
    );
    let entries2: Dynamic = new (Map as Dynamic)();
    let entries3: Dynamic = new (Map as Dynamic)();
    let value2 = (
      input2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      value3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let entry: Dynamic = input2.get(options2);
      if (entry === undefined) {
        input2.set(options2, {
          other: context2,
          sim: value3,
          second: -1,
        });
      } else {
        if (value3 > entry.sim) {
          input2.set(options2, {
            other: context2,
            sim: value3,
            second: entry.sim,
          });
        } else {
          if (value3 > entry.second) {
            entry.second = value3;
          }
        }
      }
    };
    filtered.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value3: Dynamic = nodeWordBag(input2.src, context);
        let values: Dynamic = new (Set as Dynamic)();
        for (let value4 of new (Set as Dynamic)(value3) as Dynamic) {
          let entry: Dynamic = entries.get(value4);
          if (!(entry === undefined || entry.length > 32))
            for (let value5 of entry as Dynamic) {
              if (
                values.has(value5) ||
                filtered2[value5].src.type !== input2.src.type
              )
                continue;
              values.add(value5);
              let value6: Dynamic = bagSimilarity(
                value3,
                nodeWordBag(filtered2[value5].src, context),
              );
              value2(entries2, options2, value5, value6);
              value2(entries3, value5, options2, value6);
            }
        }
      },
    );
    let items: Dynamic = [];
    for (let [value3, value4] of entries2 as Dynamic) {
      let entry: Dynamic = entries3.get(value4.other);
      if (
        value4.sim >= NEAR_MATCH_SIMILARITY &&
        value4.sim > value4.second &&
        entry?.other === value3 &&
        entry.sim > entry.second
      ) {
        items.push([filtered[value3], filtered2[value4.other]]);
      }
    }
    return items;
  }
  function collectAdjacentMoveRuns(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)([
      [`del`, []],
      [`ins`, []],
    ]);
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (input2.type === `text` || textBlockNodeTypes.has(input2.type)) return;
      let items: Dynamic = [];
      for (let value2 of nodeChildren(input2) as Dynamic) {
        let entry: Dynamic = options.get(value2);
        let value3: Dynamic =
          entry !== undefined &&
          (entry.husk || context.regionRoots.get(value2) === entry.side)
            ? entry
            : null;
        if (
          items.length &&
          (value3 === null || value3.side !== items[0].side)
        ) {
          entries.get(items[0].side).push(items);
          items = [];
        }
        if (value3 !== null) {
          items.push(value3);
        }
      }
      if (items.length) {
        entries.get(items[0].side).push(items);
      }
      for (let value2 of nodeChildren(input2) as Dynamic) value(value2);
    };
    value(input);
    return entries;
  }
  function movedNodesCanPair(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let src: Dynamic = input.src;
    let src2: Dynamic = options.src;
    if (
      commonBlockId(src2, context) !== null ||
      (!input.husk && commonBlockId(src, context) !== null) ||
      src.type !== src2.type ||
      (nodeContentKey(src, context) !== nodeContentKey(src2, context) &&
        !nodesCanPair(src, src2))
    )
      return false;
    let value: Dynamic = nodeWordBag(src, context);
    let value2: Dynamic = nodeWordBag(src2, context);
    return (
      !value.length ||
      !value2.length ||
      bagSimilarity(value, value2) >= MIN_CONTENT_SIMILARITY
    );
  }
  function extendMoveRunPairs(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value?: Dynamic,
    extra?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let entries: Dynamic = new (Map as Dynamic)();
    for (let value3 of options as Dynamic)
      if (!entries.has(value3.out)) {
        entries.set(value3.out, value3);
      }
    let value2: Dynamic = collectAdjacentMoveRuns(input, entries, extra);
    let entry: Dynamic = value2.get(`ins`);
    let entries2: Dynamic = new (Map as Dynamic)();
    entry.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        input2.forEach(
          (
            input3?: Dynamic,
            options3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            entries2.set(input3, {
              run: options2,
              pos: options3,
            }),
        ),
    );
    let entries3: Dynamic = new (Map as Dynamic)(
      context.map(
        ([input2, input3]: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          input2,
          input3,
        ],
      ),
    );
    let items: Dynamic = [];
    for (let value3 of value2.get(`del`) as Dynamic) {
      let entries4: Dynamic = new (Map as Dynamic)();
      value3.forEach(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let entry2: Dynamic = entries3.get(input2);
          let value6: Dynamic =
            entry2 === undefined ? undefined : entries2.get(entry2);
          if (value6 === undefined) return;
          let entry3: Dynamic = entries4.get(value6.run);
          if (entry3 === undefined) {
            entries4.set(value6.run, (entry3 = []));
          }
          entry3.push({
            dpos: options2,
            ipos: value6.pos,
          });
        },
      );
      let value4: Dynamic = -1;
      let items2: Dynamic = [];
      for (let [value6, value7] of entries4 as Dynamic)
        if (!(value7.length <= items2.length)) {
          value4 = value6;
          items2 = value7;
        }
      let mapped: Dynamic = longestIncreasingSubsequence(
        items2.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.ipos,
        ),
      ).map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          items2[input2],
      );
      if (mapped.length < 2 || mapped.length * 2 <= value3.length) continue;
      let value5: Dynamic = entry[value4];
      let items3: Dynamic = [
        {
          dpos: -1,
          ipos: -1,
        },
        ...mapped,
        {
          dpos: value3.length,
          ipos: value5.length,
        },
      ];
      for (let index: Dynamic = 0; index + 1 < items3.length; index++) {
        let value6: Dynamic = items3[index].dpos + 1;
        let value7: Dynamic = items3[index].ipos + 1;
        let value8: Dynamic = items3[index + 1].dpos - value6;
        if (value8 === items3[index + 1].ipos - value7)
          for (let index2: Dynamic = 0; index2 < value8; index2++) {
            let value9: Dynamic = value3[value6 + index2];
            let value10: Dynamic = value5[value7 + index2];
            if (
              !(
                value.has(value9) ||
                value.has(value10) ||
                !movedNodesCanPair(value9, value10, extra)
              )
            ) {
              value.add(value9);
              value.add(value10);
              items.push([value9, value10]);
            }
          }
      }
    }
    return items;
  }
  function resolveMovedNodes(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    for (let index: Dynamic = 0; index < 8; index++) {
      let value: Dynamic = collectMoveCandidates(input, options);
      let entries: Dynamic = new (Map as Dynamic)();
      for (let value4 of value as Dynamic) {
        let value5: Dynamic = moveCandidateIdentity(value4, options);
        if (value5 === null) continue;
        let entry: Dynamic = entries.get(value5);
        if (entry === undefined) {
          entries.set(
            value5,
            (entry = {
              del: [],
              ins: [],
            }),
          );
        }
        (value4.side === `del` ? entry.del : entry.ins).push(value4);
      }
      let items: Dynamic = [];
      let values: Dynamic = new (Set as Dynamic)();
      let value2 = (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        items.push([input2, options2]);
        values.add(input2);
        values.add(options2);
      };
      let items2: Dynamic = [];
      for (let value4 of entries.values() as Dynamic)
        if (!(value4.del.length !== 1 || value4.ins.length !== 1)) {
          if (
            isNestedSmallMoveCandidate(value4.del[0], value4.ins[0], options)
          ) {
            items2.push([value4.del[0], value4.ins[0]]);
          } else {
            value2(value4.del[0], value4.ins[0]);
          }
        }
      if (items2.length) {
        let entries2: Dynamic = new (Map as Dynamic)();
        for (let [value4, value5] of items as Dynamic) {
          let value6: Dynamic = moveRegionRoot(value4, options);
          let value7: Dynamic = moveRegionRoot(value5, options);
          if (
            value6 === null ||
            value7 === null ||
            value6 === value4.out ||
            value7 === value5.out
          )
            continue;
          let entry: Dynamic = entries2.get(value6);
          if (entry === undefined) {
            entries2.set(value6, (entry = new (Set as Dynamic)()));
          }
          entry.add(value7);
        }
        for (let [value4, value5] of items2 as Dynamic) {
          let value6: Dynamic = moveRegionRoot(value4, options);
          let value7: Dynamic = moveRegionRoot(value5, options);
          if (
            value6 !== null &&
            value7 !== null &&
            entries2.get(value6)?.has(value7)
          ) {
            value2(value4, value5);
          }
        }
      }
      for (let [value4, value5] of pairSimilarMovedTextBlocks(
        value,
        values,
        options,
      ) as Dynamic)
        value2(value4, value5);
      for (let value4 of extendMoveRunPairs(
        input,
        value,
        items,
        values,
        options,
      ) as Dynamic)
        items.push(value4);
      if (!items.length) return;
      items.sort(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          nodeKeyLength(options2[1].src, options) -
          nodeKeyLength(input2[1].src, options),
      );
      let values2: Dynamic = new (Set as Dynamic)();
      let values3: Dynamic = new (Set as Dynamic)();
      let value3: Dynamic = false;
      for (let [value4, value5] of items as Dynamic)
        if (
          !(
            values3.has(value4.out) ||
            values3.has(value5.out) ||
            value4.ancestors.some(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                values2.has(input2),
            ) ||
            value5.ancestors.some(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                values2.has(input2),
            ) ||
            !applyMovePair(value4, value5, options)
          )
        ) {
          value3 = true;
          values2.add(value4.out);
          values2.add(value5.out);
          for (let value6 of value4.ancestors as Dynamic) values3.add(value6);
          for (let value6 of value5.ancestors as Dynamic) values3.add(value6);
        }
      if (!value3) return;
    }
  }
  let emptyParagraph: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
    type: `paragraph`,
  });
  function emptyCellForMove(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let state: Dynamic = {};
    for (let value of [`colspan`, `rowspan`] as Dynamic) {
      let value2: Dynamic =
        input === undefined ? undefined : nodeAttribute(input, value);
      if (typeof value2 == `number` && value2 > 1) {
        state[value] = value2;
      }
    }
    return Object.keys(state).length
      ? {
          type: `cell`,
          attrs: state,
          content: [emptyParagraph()],
        }
      : {
          type: `cell`,
          content: [emptyParagraph()],
        };
  }
  let placeholderContentByType: Dynamic = new (Map as Dynamic)([
    [
      `blockquote`,
      (..._extraArguments: unknown[]): Dynamic => [emptyParagraph()],
    ],
    [
      `listItem`,
      (..._extraArguments: unknown[]): Dynamic => [emptyParagraph()],
    ],
    [`cell`, (..._extraArguments: unknown[]): Dynamic => [emptyParagraph()]],
    [
      `list`,
      (..._extraArguments: unknown[]): Dynamic => [
        {
          type: `listItem`,
          content: [emptyParagraph()],
        },
      ],
    ],
    [
      `tableRow`,
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        nodeChildren(input).length
          ? nodeChildren(input).map(emptyCellForMove)
          : [emptyCellForMove()],
    ],
    [
      `table`,
      (..._extraArguments: unknown[]): Dynamic => [
        {
          type: `tableRow`,
          content: [emptyCellForMove()],
        },
      ],
    ],
  ]);
  function createMovePlaceholder(
    input?: Dynamic,
    options: Dynamic = true,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = options ? nodeBlockId(input) : null;
    let state: Dynamic = {
      type: input.type,
      ...(value === null
        ? {}
        : {
            attrs: {
              bid: value,
            },
          }),
    };
    let value2: Dynamic = placeholderContentByType.get(input.type)?.(input);
    if (value2 !== undefined) {
      state.content = value2;
    }
    return state;
  }
  function applyMovePair(
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let src: Dynamic = input.src;
    let src2: Dynamic = options.src;
    let value: Dynamic =
      nodeContentKey(src, context) === nodeContentKey(src2, context);
    if (src.type !== src2.type || (!value && !nodesCanPair(src, src2)))
      return false;
    if (input.husk) {
      let value9: Dynamic = input.ancestors[input.ancestors.length - 1];
      let value10: Dynamic = value9 === undefined ? [] : nodeChildren(value9);
      let value11: Dynamic = value10.indexOf(input.out);
      let entry: Dynamic = context.origin.get(input.out);
      if (value11 < 0 || entry === undefined) return false;
      value10.splice(value11, 0, {
        ...entry,
      });
    }
    let value2: Dynamic =
      src2.type === `tableRow` ? context.rowPerm.get(src2) : undefined;
    let value3: Dynamic =
      value2 !== undefined &&
      rowMatchesPermutation(src, src2, value2.pi, context)
        ? unchangedNodeDelta(diffPermutedRow(src, src2, value2, context))
        : value
          ? unchangedNodeDelta({
              ...src2,
            })
          : diffNodeDetails(src, src2, context);
    let value4: Dynamic =
      src2.type === `listItem` && options.listDepth !== input.listDepth
        ? options.listDepth > input.listDepth
          ? `Indented`
          : `Outdented`
        : `Moved`;
    let value5: Dynamic =
      value3.summary === null ? value4 : `${value4}; ${value3.summary}`;
    let value6: Dynamic = createChange(`move`, src2.type, value5);
    attachNodeChange(value3.node, `move`, value6, context, {
      [DIFF_ATTRIBUTES.summary]: value5,
      ...(value3.summary === null
        ? {}
        : {
            [DIFF_ATTRIBUTES.before]: value3.before,
          }),
    });
    absorbNestedChanges(value3, value6, context);
    context.primary.add(value3.node);
    replaceNodeAndMetadata(options.out, value3.node, context);
    let value7: Dynamic = createChange(`del`, src.type, `Moved`);
    value7.alias = value6;
    let value8: Dynamic = createMovePlaceholder(src, !input.husk);
    attachNodeChange(value8, `del`, value7, context, {
      [DIFF_ATTRIBUTES.summary]: `Moved`,
      [DIFF_ATTRIBUTES.ghost]: `move`,
      [DIFF_ATTRIBUTES.moveTo]: ``,
    });
    context.ghosts.add(value8);
    replaceNodeAndMetadata(input.out, value8, context);
    context.moves.set(value6, {
      move: options.out,
      ghost: input.out,
      src: src2,
    });
    return true;
  }
  function replaceNodeAndMetadata(
    input?: Dynamic,
    options?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value: Dynamic = input;
    for (let value2 of Object.keys(value) as Dynamic) delete value[value2];
    Object.assign(input, options);
    let entry: Dynamic = diffContext.nodeCh.get(options);
    if (entry) {
      diffContext.nodeCh.set(input, entry);
    } else {
      diffContext.nodeCh.delete(input);
    }
    if (diffContext.primary.has(options)) {
      diffContext.primary.add(input);
    } else {
      diffContext.primary.delete(input);
    }
    if (diffContext.ghosts.has(options)) {
      diffContext.ghosts.add(input);
    } else {
      diffContext.ghosts.delete(input);
    }
    let entry2: Dynamic = diffContext.regionRoots.get(options);
    if (entry2) {
      diffContext.regionRoots.set(input, entry2);
    } else {
      diffContext.regionRoots.delete(input);
    }
    let entry3: Dynamic = diffContext.source.get(options);
    if (entry3) {
      diffContext.source.set(input, entry3);
    } else {
      diffContext.source.delete(input);
    }
  }
  function soleChangedDescendant(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic = null;
    let value2: Dynamic = false;
    let value3 = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (value2) return;
      if (
        input2 !== input &&
        (options.primary.has(input2) || options.ghosts.has(input2))
      ) {
        value ??= input2;
        return;
      }
      let value4: Dynamic = nodeChildren(input2);
      if (
        textBlockNodeTypes.has(input2.type) ||
        input2.type === `text` ||
        inlineNodeTypes.has(input2.type) ||
        (value4.length === 0 && input2 !== input)
      ) {
        value2 = true;
        return;
      }
      for (let value5 of value4 as Dynamic) value3(value5);
    };
    value3(input);
    return value2 ? null : value;
  }
  function absorbParentMoveChanges(
    input?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let entry: Dynamic = diffContext.regionRoots.get(input2);
      if (
        entry !== undefined &&
        !diffContext.ghosts.has(input2) &&
        !diffContext.settled.has(input2)
      ) {
        let value2: Dynamic = soleChangedDescendant(input2, diffContext);
        let entry2: Dynamic = diffContext.nodeCh.get(input2);
        let value3: Dynamic =
          value2 === null ? undefined : diffContext.nodeCh.get(value2);
        if (entry2 !== undefined && value3 !== undefined) {
          let value4: Dynamic = resolveChangeAlias(value3);
          if (resolveChangeAlias(entry2) !== value4) {
            let value5: Dynamic = createChange(
              entry2.kind,
              entry2.nodeType,
              entry2.summary,
            );
            value5.alias = value4;
            diffContext.nodeCh.set(input2, value5);
            let entry3: Dynamic = diffContext.moves.get(value4);
            if (entry3 !== undefined && value4.summary === `Moved`) {
              value4.summary =
                entry === `ins`
                  ? `${nodeLabel(entry3.src)} → ${nodeLabel(input2)}`
                  : `${nodeLabel(input2)} → ${nodeLabel(entry3.src)}`;
              entry3.move.attrs = {
                ...entry3.move.attrs,
                [DIFF_ATTRIBUTES.summary]: value4.summary,
              };
            }
          }
        }
        return;
      }
      for (let value2 of nodeChildren(input2) as Dynamic) value(value2);
    };
    value(input);
  }
  function mergeAdjacentMoveChanges(
    input?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    if (!diffContext.moves.size) return;
    let value: Dynamic = buildParentIndex(input);
    let value2: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value4: Dynamic = diffContext.primary.has(input2)
        ? diffContext.nodeCh.get(input2)
        : undefined;
      return value4?.kind === `move` && diffContext.moves.has(value4)
        ? value4
        : undefined;
    };
    let value3 = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value4: Dynamic = nodeChildren(input2);
      for (let index: Dynamic = 0; index + 1 < value4.length; index++) {
        let value5: Dynamic = value2(value4[index]);
        let value6: Dynamic = value2(value4[index + 1]);
        if (value5 === undefined || value6 === undefined) continue;
        let entry: Dynamic = value.get(diffContext.moves.get(value5).ghost);
        let entry2: Dynamic = value.get(diffContext.moves.get(value6).ghost);
        if (
          entry === undefined ||
          entry2 === undefined ||
          entry.parent !== entry2.parent ||
          entry2.i !== entry.i + 1
        )
          continue;
        let value7: Dynamic = resolveChangeAlias(value5);
        if (resolveChangeAlias(value6) !== value7) {
          value6.alias = value7;
        }
      }
      for (let value5 of value4 as Dynamic) value3(value5);
    };
    value3(input);
  }
  function removeRedundantMoveGhosts(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined {
    if (!options.moves.size) return;
    let value: Dynamic = buildParentIndex(input);
    let values: Dynamic = new (Set as Dynamic)();
    for (let [value3, value4] of options.moves as Dynamic) {
      let entry: Dynamic = value.get(value4.ghost);
      if (entry === undefined) continue;
      let value5: Dynamic = false;
      let entry2: Dynamic = value.get(value4.move);
      for (; entry2 !== undefined && entry2.parent !== entry.parent; ) {
        if (options.regionRoots.get(entry2.parent) === `ins`) {
          value5 = true;
        }
        entry2 = value.get(entry2.parent);
      }
      if (
        entry2 === undefined ||
        (!value5 &&
          !/^(Indented|Outdented)/.test(resolveChangeAlias(value3).summary)) ||
        (entry.parent.type === `listItem` && entry.i === 0)
      )
        continue;
      let value6: Dynamic = nodeChildren(entry.parent);
      let value7: Dynamic = true;
      for (
        let value8: Dynamic = Math.min(entry2.i, entry.i) + 1;
        value7 && value8 < Math.max(entry2.i, entry.i);
        value8++
      )
        value7 = options.ghosts.has(value6[value8]);
      if (value7) {
        values.add(value4.ghost);
      }
    }
    if (!values.size) return;
    let value2 = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value3: Dynamic = nodeChildren(input2);
      if (
        value3.some(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            values.has(input3),
        )
      ) {
        input2.content = value3.filter(
          (input3?: Dynamic, ..._extraArguments: unknown[]) =>
            !values.has(input3),
        );
      }
      for (let value4 of nodeChildren(input2) as Dynamic) value2(value4);
    };
    value2(input);
  }
  function finalizeDiffResult(
    input?: Dynamic,
    diffContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let items: Dynamic = [];
    let items2: Dynamic = [];
    let entries: Dynamic = new (Map as Dynamic)();
    let values: Dynamic = new (Set as Dynamic)(
      diffContext.scopes.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.node,
      ),
    );
    let values2: Dynamic = new (Set as Dynamic)();
    let value: Dynamic = (
      input2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value4: Dynamic = resolveChangeAlias(input2);
      if (value4.id === null) {
        value4.id = `c${items.length + 1}`;
        value4.path = items2.slice();
        items.push(value4);
        if (options) {
          values2.add(value4);
        }
      } else {
        if (options && !values2.has(value4)) {
          value4.path = items2.slice();
          values2.add(value4);
        }
      }
      return value4.id;
    };
    let value2 = (node?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let value4: Dynamic =
        diffContext.origin.get(node) ?? diffContext.source.get(node) ?? node;
      if (values.has(value4) && !entries.has(value4)) {
        entries.set(value4, items2.slice());
      }
      let entry: Dynamic = diffContext.nodeCh.get(node);
      if (entry) {
        let value5: Dynamic = value(entry, diffContext.primary.has(node));
        node.attrs = {
          ...node.attrs,
          [DIFF_ATTRIBUTES.id]: value5,
          ...(diffContext.ghosts.has(node)
            ? {
                [DIFF_ATTRIBUTES.moveTo]: value5,
              }
            : {}),
        };
      }
      if (
        node.type === `text` &&
        node.marks?.some(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            diffContext.markCh.has(input2),
        )
      ) {
        node.marks = node.marks.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let entry2: Dynamic = diffContext.markCh.get(input2);
            return entry2
              ? {
                  type: input2.type,
                  attrs: {
                    ...input2.attrs,
                    id: value(entry2, false),
                  },
                }
              : input2;
          },
        );
      }
      let content: Dynamic = node.content;
      if (Array.isArray(content))
        for (let index: Dynamic = 0; index < content.length; index++) {
          items2.push(index);
          value2(content[index]);
          items2.pop();
        }
    };
    value2(input);
    let value3: Dynamic = emptyDiffStats();
    for (let value4 of items as Dynamic) value3[value4.kind]++;
    return {
      changes: items.map(
        (element?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          id: element.id,
          kind: element.kind,
          nodeType: element.nodeType,
          summary: element.summary,
          path: element.path ?? [],
        }),
      ),
      stats: value3,
      scopes: diffContext.scopes.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          reason: input2.reason,
          nodeType: input2.node.type,
          bid: nodeBlockId(input2.node),
          path: entries.get(input2.node) ?? null,
        }),
      ),
    };
  }
  function deserializeDiffOptions(
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let value: Dynamic =
      input.enums === undefined ? null : new (Map as Dynamic)(input.enums);
    return {
      ...(input.prevRuns
        ? {
            prevRuns: input.prevRuns,
          }
        : {}),
      ...(input.nextRuns
        ? {
            nextRuns: input.nextRuns,
          }
        : {}),
      ...(value
        ? {
            resolveEnum: (
              input2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => value.get(input2) ?? null,
          }
        : {}),
    };
  }
  let workerScope: Dynamic = globalThis;
  workerScope.addEventListener(
    `message`,
    (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let { id: id, prev: prev, curr: curr, opts: opts }: Dynamic = input.data;
      let value: Dynamic;
      try {
        let value2: Dynamic = diffDocuments(
          prev === null ? null : JSON.parse(prev),
          JSON.parse(curr),
          deserializeDiffOptions(JSON.parse(opts)),
        );
        value = {
          id: id,
          ok: true,
          result: JSON.stringify(value2),
        };
      } catch (value2: Dynamic) {
        value = {
          id: id,
          ok: false,
          error:
            value2 instanceof (Error as Dynamic) ? value2.name : typeof value2,
        };
      }
      workerScope.postMessage(value);
    },
  );
})();

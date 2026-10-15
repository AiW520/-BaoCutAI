/** BaoCut: editor host from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  resolvePlatformArtifactLinksIncludes,
} from "../../platform/services/artifact-links";
import {
  lazyZod,
} from "../../platform/data/lazy-zod";
import {
  PlatformSessionAndSourcesState7,
  isPlatformSessionAndSourcesTest,
  platformSessionAndSourcesPattern10,
  platformSessionAndSourcesPattern9,
  resolvePlatformSessionAndSourcesCharCodeAt2,
  resolvePlatformSessionAndSourcesTest9,
  resolvePlatformSessionAndSourcesValue10,
} from "../../platform/services/session-and-sources-1";
import {
  resolveEditorExtensionsYellow2,
} from "./extensions-1";
import {
  collectEditorExtensionsSlice,
  resolveEditorExtensionsDataColwidth,
  resolveEditorExtensionsIsInteger,
  resolveEditorExtensionsJoin,
  resolveEditorExtensionsOpt,
  resolveEditorExtensionsRole,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsValue16,
  resolveEditorExtensionsValue7,
  resolveEditorExtensionsValue8,
  resolveEditorExtensionsValue9,
} from "./extensions-2";
import {
  resolveEditorAnchorsAndMentionsValue10,
  resolveEditorAnchorsAndMentionsValue2,
} from "./anchors-and-mentions-1";
import {
  resolvePlatformApiAndAuthValue28,
} from "../../platform/services/api-and-auth-5";
import {
  resolveDataModelSchemasEmptyRef,
  resolveDataModelSchemasKind2,
} from "../../platform/data/model-schemas-2";
import {
  PlatformAnnouncementsState2,
} from "../../platform/services/announcements";
import {
  EditorHostFade,
  resolveEditorHostEnum,
  resolveEditorHostMention,
  resolveEditorHostValue,
} from "../../platform/services/runtime-and-chat-3";

var EditorHostStyles: string;

var resolveEditorHostValue2: (editorHostValue22?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostState4: string;

var EditorHostState5: string;

var EditorHostMessage2: string;

var EditorHostStyles2: string;

var EditorHostMessage3: string;

var EditorHostState6: string;

var EditorHostDataLdocClip: string;

var EditorHostMermaid: string[];

var EditorHostJoin: string;

var EditorHostMessage4: string;

var EditorHostStyles3: string;

var editorHostGrayRedOrangeYellowValues: string[];

var EditorHostRed: {
    red: number;
    orange: number;
    yellow: number;
    green: number;
    aqua: number;
    blue: number;
    violet: number;
    magenta: number;
};

var editorHostValue0_035: number;

var editorHostValue0_3: number;

function resolveEditorHostGray(
  editorHostGray?: unknown,
  ..._extraArguments: unknown[]
): null | string {
  if (
    typeof editorHostGray != `string` ||
    !/^#[0-9a-fA-F]{6}$/.test(editorHostGray)
  )
    return null;
  let amount = parseInt(editorHostGray.slice(1, 3), 16) / 255;
  let amount2 = parseInt(editorHostGray.slice(3, 5), 16) / 255;
  let amount3 = parseInt(editorHostGray.slice(5, 7), 16) / 255;
  let max = Math.max(amount, amount2, amount3);
  let min = Math.min(amount, amount2, amount3);
  let difference: number = max - min;
  if (
    difference < editorHostValue0_035 ||
    difference / (1 - Math.abs(max + min - 1)) < editorHostValue0_3
  )
    return `gray`;
  let amount4 =
    ((max === amount
      ? (amount2 - amount3) / difference
      : max === amount2
        ? (amount3 - amount) / difference + 2
        : (amount - amount2) / difference + 4) *
      60 +
      360) %
    360;
  let label: string = `gray`;
  let amount5 = 1 / 0;
  for (let [
    resolveEditorHostGrayResult,
    resolveEditorHostGrayResult2,
  ] of Object.entries(EditorHostRed) as Dynamic) {
    let abs = Math.abs(amount4 - resolveEditorHostGrayResult2);
    let min2 = Math.min(abs, 360 - abs);
    if (min2 < amount5) {
      amount5 = min2;
      label = resolveEditorHostGrayResult;
    }
  }
  return label;
}

var EditorHostGray: Dynamic;

var resolveEditorHostValue3: (editorHostValue3?: Dynamic, ..._extraArguments: unknown[]) => string;

var collectEditorHostJoin: Dynamic;

var EditorHostState7: Dynamic;

var EditorHostState8: Dynamic;

var EditorHostState9: string;

var EditorHostState10: string;

var EditorHostState11: number[];

var resolveEditorHostIsInteger: Dynamic;

var EditorHostState12: number[];

var EditorHostOwnLevel: string;

var EditorHostDataOwnLevel: string;

var EditorHostFrom: Dynamic;

var resolveEditorHostIsInteger2: Dynamic;

var resolveEditorHostValue4: Dynamic;

var EditorHostKey: ({
    key: string;
    label: string;
    aliases: string[];
    slashOnly: string[];
    live: string;
} | {
    slashOnly?: undefined;
    key: string;
    label: string;
    aliases: string[];
    live: string;
} | {
    slashOnly?: undefined;
    live?: undefined;
    key: string;
    label: string;
    aliases: string[];
})[];

var EditorHostAliases: Dynamic;

function getEditorHostToLowerCase(
  editorHost?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorHost
    ? (EditorHostAliases.get(editorHost.toLowerCase()) ?? null)
    : null;
}

function resolveEditorHostValue5(
  editorHostValue5?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return getEditorHostToLowerCase(editorHostValue5)?.key ?? null;
}

function resolveEditorHostValue6(
  editorHostValue6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return getEditorHostToLowerCase(editorHostValue6)?.live ?? null;
}

function resolveEditorHostValue7(
  editorHostValue7?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorHostValue7) return null;
  for (let event of EditorHostKey as Dynamic)
    if (event.key === editorHostValue7) return event;
  return null;
}

function resolveEditorHostValue8(
  editorHostValue8?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveEditorHostValue7(editorHostValue8)?.live ?? null;
}

var EditorHostState13: Dynamic;

function resolveEditorHostReplace(
  editorHostReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorHostReplace
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`);
}

var editorHostUrlPattern: RegExp;

function resolveEditorHostReplace2(
  editorHostReplace2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  return editorHostReplace2
    .replace(
      /`([^`]+)`/g,
      (
        editorHostReplace22?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => (
        items.push(`<code>${options}</code>`),
        `\uE000${items.length - 1}\uE000`
      ),
    )
    .replace(/~~([^~]+)~~/g, `<s>$1</s>`)
    .replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`)
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, `$1<em>$2</em>`)
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (
        editorHostReplace22?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolvePlatformSessionAndSourcesTest9(context)
          ? `<a href="${context}">${options}</a>`
          : !editorHostUrlPattern.test(context) ||
              !isPlatformSessionAndSourcesTest(context)
            ? editorHostReplace22
            : `<a href="${resolvePlatformSessionAndSourcesCharCodeAt2(context)}" rel="noopener noreferrer" target="_blank">${options}</a>`,
    )
    .replace(
      /\uE000(\d+)\uE000/g,
      (
        editorHostReplace22?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => items[Number(options)] ?? ``,
    );
}

function collectEditorHostTag(
  collectEditorHostTag2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorHostReplaceParts: Dynamic = resolveEditorHostReplace(
    collectEditorHostTag2,
  ).split(`
`);
  let items: Dynamic = [];
  let items2: Dynamic = [];
  let items3: Dynamic = [];
  let collectEditorHostTagHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    for (; items2.length; ) {
      let pop: Dynamic = items2.pop();
      items.push(`</li></${pop.tag}>`);
    }
  };
  let replace: Dynamic = (
    collectEditorHostTag3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => collectEditorHostTag3.replace(/\t/g, `    `).length;
  let join = (..._extraArguments: unknown[]): undefined => {
    if (items3.length) {
      items.push(
        `<p>${items3.map(resolveEditorHostReplace2).join(`<br>`)}</p>`,
      );
    }
    items3 = [];
  };
  let test: Dynamic = (
    collectEditorHostTag3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => /^\s*\|.*\|\s*$/.test(collectEditorHostTag3);
  let test2: Dynamic = (
    collectEditorHostTag3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(
      collectEditorHostTag3,
    );
  let split: Dynamic = (
    collectEditorHostTag3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectEditorHostTag3
      .replace(/\\\|/g, ``)
      .trim()
      .replace(/^\|/, ``)
      .replace(/\|$/, ``)
      .split(`|`)
      .map(
        (replacePart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          replacePart.trim().replaceAll(``, `|`),
      );
  for (let index = 0; index < editorHostReplaceParts.length; index++) {
    let editorHostReplacePartItem: Dynamic = editorHostReplaceParts[index];
    if (
      test(editorHostReplacePartItem) &&
      index + 1 < editorHostReplaceParts.length &&
      test2(editorHostReplaceParts[index + 1])
    ) {
      join();
      collectEditorHostTagHandler();
      let textParts: Dynamic = split(editorHostReplacePartItem);
      let mappedTextParts: Dynamic = split(
        editorHostReplaceParts[index + 1],
      ).map((textPart?: Dynamic, ..._extraArguments: unknown[]) =>
        /^:-+:$/.test(textPart)
          ? `center`
          : /^-+:$/.test(textPart)
            ? `right`
            : /^:-+$/.test(textPart)
              ? `left`
              : null,
      );
      let join2 = (
        collectEditorHostTag3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        `<tr>${textParts
          .map(
            (
              helloCImport3?: unknown,
              index2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => {
              let mappedTextPartItem: Dynamic = mappedTextParts[index2];
              return `<${options}${mappedTextPartItem ? ` style="text-align:${mappedTextPartItem}"` : ``}>${resolveEditorHostReplace2(collectEditorHostTag3[index2] ?? ``)}</${options}>`;
            },
          )
          .join(``)}</tr>`;
      let items4: Dynamic = [];
      let total = index + 2;
      for (
        ;
        total < editorHostReplaceParts.length &&
        test(editorHostReplaceParts[total]);
        total++
      )
        items4.push(join2(split(editorHostReplaceParts[total]), `td`));
      items.push(
        `<table><thead>${join2(textParts, `th`)}</thead>${items4.length ? `<tbody>${items4.join(``)}</tbody>` : ``}</table>`,
      );
      index = total - 1;
      continue;
    }
    let match: Dynamic = editorHostReplacePartItem.match(
      /^ {0,3}(#{1,6})\s+(.*)$/,
    );
    let match2: Dynamic = editorHostReplacePartItem.match(/^(\s*)[-*]\s+(.*)$/);
    let match3: Dynamic = editorHostReplacePartItem.match(
      /^(\s*)\d+[.)]\s+(.*)$/,
    );
    if (match) {
      join();
      collectEditorHostTagHandler();
      items.push(
        `<h${match[1].length}>${resolveEditorHostReplace2(match[2])}</h${match[1].length}>`,
      );
    } else if (/^\s*(-{3,}|\*{3,})\s*$/.test(editorHostReplacePartItem)) {
      join();
      collectEditorHostTagHandler();
      items.push(`<hr>`);
    } else if (editorHostReplacePartItem.startsWith(`&gt;`)) {
      join();
      collectEditorHostTagHandler();
      items.push(
        `<blockquote>${resolveEditorHostReplace2(editorHostReplacePartItem.replace(/^&gt;\s?/, ``))}</blockquote>`,
      );
    } else if (match2 || match3) {
      join();
      let tag = match2 ? `ul` : `ol`;
      let indent: Dynamic = replace((match2 ?? match3)[1]);
      for (; items2.length && indent < items2[items2.length - 1].indent - 1; ) {
        let pop: Dynamic = items2.pop();
        items.push(`</li></${pop.tag}>`);
      }
      let itemItem: Dynamic = items2[items2.length - 1];
      if (itemItem && indent < itemItem.indent + 2) {
        if (itemItem.tag === tag) {
          items.push(`</li>`);
        } else {
          items2.pop();
          items2.push({
            tag: tag,
            indent: itemItem.indent,
          });
          items.push(`</li></${itemItem.tag}><${tag}>`);
        }
      } else {
        items2.push({
          tag: tag,
          indent: indent,
        });
        items.push(`<${tag}>`);
      }
      let matchItem: Dynamic = (match2 ?? match3)[2];
      let match4: Dynamic = match2
        ? matchItem.match(/^\[( |x|X)\]\s+(.*)$/)
        : null;
      items.push(
        match4
          ? `<li class="cw-md-task"><input type="checkbox" disabled${match4[1] === ` ` ? `` : ` checked`}>${resolveEditorHostReplace2(match4[2])}`
          : `<li>${resolveEditorHostReplace2(matchItem)}`,
      );
    } else if (editorHostReplacePartItem.trim()) {
      collectEditorHostTagHandler();
      items3.push(editorHostReplacePartItem);
    } else {
      join();
      collectEditorHostTagHandler();
    }
  }
  join();
  collectEditorHostTagHandler();
  return items.join(``);
}

var EditorHostState14: Dynamic;

var editorHostSet: Dynamic;

function resolveEditorHostValue9(
  editorHostValue9?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  EditorHostState14 = editorHostValue9;
  for (let resolveEditorHostValue9Result of editorHostSet as Dynamic)
    resolveEditorHostValue9Result();
}

function resolveEditorHostValue10(
  editorHostValue10?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return EditorHostState14 ? EditorHostState14(editorHostValue10) : null;
}

var resolveEditorHostValue11: (..._extraArguments: unknown[]) => boolean;

function clearEditorHostDelete(
  clearEditorHostDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  editorHostSet.add(clearEditorHostDelete2);
  return (..._extraArguments: unknown[]): undefined => {
    editorHostSet.delete(clearEditorHostDelete2);
  };
}

function resolveEditorHostText(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  let items3: Dynamic = [];
  let text: string = ``;
  let from: number = 0;
  let enabled = false;
  let resolveEditorHostTextHandler = (
    editorHostText?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    items3.push({
      text: text,
      from: from,
      to: editorHostText,
    });
    text = ``;
    from = editorHostText + 1;
  };
  for (let index = 0; index < items.length; index++) {
    let itemItem: Dynamic = items[index];
    if (enabled) {
      if (itemItem === `"` && items[index + 1] === `"`) {
        text += `"`;
        index++;
      } else {
        if (itemItem === `"`) {
          enabled = false;
        } else {
          text += itemItem;
        }
      }
    } else if (itemItem === `"`) enabled = true;
    else if (itemItem === `,`) resolveEditorHostTextHandler(index);
    else if (
      itemItem ===
        `
` ||
      itemItem === `\r`
    ) {
      let index2 = index;
      if (
        itemItem === `\r` &&
        items[index + 1] ===
          `
`
      ) {
        index++;
      }
      resolveEditorHostTextHandler(index2);
      from = index + 1;
      items2.push(items3);
      items3 = [];
    } else text += itemItem;
  }
  resolveEditorHostTextHandler(items.length);
  if (items3.length > 1 || items3[0].text !== ``) {
    items2.push(items3);
  }
  return items2;
}

function collectEditorHostText(
  collectEditorHostText2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let mappedEditorHostText: Dynamic = resolveEditorHostText(
    collectEditorHostText2,
  ).map(
    (editorHostText?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      editorHostText.map(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          rolldownNImport2.text,
      ),
  );
  if (!mappedEditorHostText.length) return ``;
  let length2: Dynamic = (Math.max as Dynamic)(
    ...mappedEditorHostText.map(
      (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic => items.length,
    ),
  );
  let join = (
    collectEditorHostText3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `<tr>${Array.from<Dynamic, Dynamic>(
      {
        length: length2,
      },
      (
        collectEditorHostText4?: unknown,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        `<${options}>${resolveEditorHostReplace(collectEditorHostText3[options2] ?? ``)}</${options}>`,
    ).join(``)}</tr>`;
  let [mappedEditorHostText2, ...setMappedEditorHostText]: Dynamic =
    mappedEditorHostText;
  return `<table><thead>${join(mappedEditorHostText2, `th`)}</thead><tbody>${setMappedEditorHostText.map((setMappedEditorHostText2?: Dynamic, ..._extraArguments: unknown[]) => join(setMappedEditorHostText2, `td`)).join(``)}</tbody></table>`;
}

var EditorHostMaster16: {
    name: string;
    master16: ({
        cx: number;
        cy: number;
        r: number;
        d?: undefined;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
    master20: ({
        d?: undefined;
        cx: number;
        cy: number;
        r: number;
    } | {
        cx?: undefined;
        cy?: undefined;
        r?: undefined;
        d: string;
    })[];
};

var EditorHostFreeze: readonly string[];

var EditorHostLdocArtifactLink: string;

var EditorHostLdocArtifactLinkRaw: string;

var EditorHostLdocArtifactLinkLabel: string;

var EditorHostLdocArtifactLinkSelected: string;

var EditorHostLdocArtifactLinkTitled: string;

var EditorHostMessage5: string;

var resolveEditorHostArtifact: Dynamic;

var filterEditorHostJoin: Dynamic;

function resolveEditorHostArtifact2(
  editorHostArtifact2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof editorHostArtifact2 != `string` ||
    resolvePlatformSessionAndSourcesValue10(editorHostArtifact2) ||
    !editorHostArtifact2.includes(`artifact/`)
  )
    return null;
  let platformArtifactLinksIncludes = resolvePlatformArtifactLinksIncludes(
    resolvePlatformSessionAndSourcesCharCodeAt2(editorHostArtifact2),
    EditorHostFreeze,
  );
  return platformArtifactLinksIncludes === null
    ? null
    : filterEditorHostJoin(platformArtifactLinksIncludes) || `Artifact`;
}

var isEditorHostValue: Dynamic;

var editorHostUrlPattern2: RegExp;

var isEditorHostTest: Dynamic;

var EditorHostRun: Dynamic;

function resolveEditorHostExec(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items.length > 2048) return null;
  let platformSessionAndSourcesCharCodeAt2: Dynamic =
    resolvePlatformSessionAndSourcesCharCodeAt2(items);
  let match: Dynamic = /^claude:(?:\/\/)?([^\s"'<>]{1,2048})$/.exec(
    platformSessionAndSourcesCharCodeAt2,
  );
  if (match === null) return null;
  let matchItem: Dynamic = match[1];
  let editorAnchorsAndMentionsValue10: Dynamic =
    resolveEditorAnchorsAndMentionsValue10(matchItem);
  if (editorAnchorsAndMentionsValue10 !== null)
    return editorAnchorsAndMentionsValue10;
  let matchItemIndex: Dynamic = matchItem.indexOf(`/`);
  if (matchItemIndex <= 0 || matchItemIndex === matchItem.length - 1)
    return null;
  let matchItemSlice: Dynamic = matchItem.slice(0, matchItemIndex);
  return Object.hasOwn(EditorHostRun, matchItemSlice)
    ? EditorHostRun[matchItemSlice]
    : null;
}

var EditorHostDataLfileEmbedHover: string;

var EditorHostDataLfileEmbedGrip: string;

var EditorHostDataLfileEmbedGripNub: string;

var EditorHostDataLfileEmbedGripDrag: string;

var EditorHostDataLfileEmbedCaption: string;

var EditorHostDataLfileWidget: string;

var editorHostValue8000: number;

var editorHostValue1300: number;

var EditorHostMessage6: string;

var editorHostValue1450: number;

var EditorHostToFixed: string;

var EditorHostToFixed2: string;

var EditorHostFloor: number;

var EditorHostStyles4: string;

var EditorHostState15: string;

var resolveEditorHostValue12: (editorHostValue12?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostLfileEmbedReveal: string;

var editorHostWrapperDockToolbarBarValues: string[];

var resolveEditorHostValue13: (editorHostValue13?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var editorHostMap: Dynamic;

var editorHostMap2: Dynamic;

var editorHostMap3: Dynamic;

var editorHostSet2: Dynamic;

var editorHostSet3: Dynamic;

var editorHostSet4: Dynamic;

var editorHostValue0: number;

var resolveEditorHostValue14: (..._extraArguments: unknown[]) => undefined;

var editorHostValue250: number;

var editorHostSet5: Dynamic;

var EditorHostTell: Dynamic;

var EditorHostHover: Dynamic;

var EditorHostQuote: {
    quote: string;
    cell: string;
    element: string;
};

var editorHostPattern: RegExp;

var editorHostPattern2: RegExp;

function resolveEditorHostKind(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (entry.kind) {
    case `quote`:
      return {
        kind: `quote`,
        exact: entry.exact,
      };
    case `cell`:
      return entry;
    case `element`:
      return {
        kind: `element`,
        dataClaudeId: entry.id,
      };
  }
}

function resolveEditorHostKind2(
  fragment?: Dynamic,
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (fragment.length === 0) return `empty target after #`;
  let target: Dynamic = event.target ?? ``;
  if (
    PlatformSessionAndSourcesState7.test(target) ||
    platformSessionAndSourcesPattern9.test(target)
  ) {
    let field: Dynamic = event.fields ?? [];
    for (let resolveEditorHostKind2Result of field as Dynamic)
      if (!editorHostPattern2.test(resolveEditorHostKind2Result))
        return `field segment "${resolveEditorHostKind2Result}" is not a valid key`;
    let selector: Dynamic;
    if (event.sub !== undefined) {
      let dataModelSchemasKind2: Dynamic = resolveDataModelSchemasKind2(
        event.sub,
      );
      if (resolvePlatformApiAndAuthValue28(dataModelSchemasKind2))
        return dataModelSchemasKind2.why;
      selector = resolveEditorHostKind(dataModelSchemasKind2);
    }
    return {
      kind: `node`,
      id: target,
      ...(field.length
        ? {
            field: field,
          }
        : {}),
      ...(selector
        ? {
            selector: selector,
          }
        : {}),
    };
  }
  let lastIndexOf: Dynamic = fragment.lastIndexOf(`!`);
  if (lastIndexOf > 0) {
    let sheet: Dynamic = fragment.slice(0, lastIndexOf);
    let range: Dynamic = fragment.slice(lastIndexOf + 1);
    if (editorHostPattern.test(range))
      return {
        kind: `grid`,
        sheet: sheet,
        range: range,
      };
  }
  return {
    kind: `legacy`,
    fragment: fragment,
  };
}

function resolveEditorHostError(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items.length === 0)
    return {
      ok: false,
      error: `empty ref`,
    };
  let dataModelSchemasEmptyRef: Dynamic =
    resolveDataModelSchemasEmptyRef(items);
  if (resolvePlatformApiAndAuthValue28(dataModelSchemasEmptyRef))
    return {
      ok: false,
      error: dataModelSchemasEmptyRef.why,
    };
  if (dataModelSchemasEmptyRef.length > 1)
    return {
      ok: false,
      error: `>> chains are not valid lfile targets`,
    };
  let dataModelSchemasEmptyRefItem: Dynamic = dataModelSchemasEmptyRef[0];
  let itemIndex = items.indexOf(`#`);
  let matchesItemIndex = itemIndex >= 0;
  let resource: Dynamic = dataModelSchemasEmptyRefItem.resource;
  if (resource !== undefined && resource.kind !== `file`) {
    let target = matchesItemIndex ? items.slice(itemIndex + 1) : undefined;
    return {
      ok: true,
      ref: {
        target: {
          kind: `entity`,
          scheme: resource.kind,
          name: resource.id,
          ...(target !== undefined && {
            target: target,
          }),
        },
        resolved: true,
      },
    };
  }
  let file: Dynamic;
  if (resource !== undefined) {
    file = matchesItemIndex ? items.slice(0, itemIndex) : items;
  }
  let resolved: Dynamic =
    file === undefined ||
    platformSessionAndSourcesPattern10.test(file) ||
    (file.startsWith(`f-`) &&
      platformSessionAndSourcesPattern9.test(file.slice(2)));
  if (!matchesItemIndex) {
    let match = file === undefined ? null : /^\[([^\]]+)\](.+)$/.exec(file);
    if (match) {
      let slice: Dynamic = (
        items2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (items2.length > 80 ? `${items2.slice(0, 80)}…` : items2);
      return {
        ok: false,
        error: `chat-embed ref spelling — did you mean "${slice(match[1])}#${slice(match[2])}"?`,
      };
    }
    return {
      ok: true,
      ref: {
        file: file,
        target: {
          kind: `file`,
        },
        resolved: resolved,
      },
    };
  }
  if (file !== undefined) {
    let match = /^\[([^\]]+)\]$/.exec(file);
    if (match) {
      let slice: Dynamic = (
        items2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (items2.length > 80 ? `${items2.slice(0, 80)}…` : items2);
      return {
        ok: false,
        error: `chat-embed ref spelling — did you mean "${slice(match[1])}#${slice(items.slice(itemIndex + 1))}"?`,
      };
    }
  }
  let error: Dynamic = resolveEditorHostKind2(
    items.slice(itemIndex + 1),
    dataModelSchemasEmptyRefItem,
  );
  return typeof error == `string`
    ? {
        ok: false,
        error: error,
      }
    : file === undefined &&
        error.kind === `legacy` &&
        error.fragment.startsWith(`ln-`)
      ? {
          ok: false,
          error: `node id "${error.fragment}" is not a valid LocalId (ln- + 1–9 chars from [0-9A-Za-z-], first and last alphanumeric)`,
        }
      : {
          ok: true,
          ref: {
            ...(file !== undefined && {
              file: file,
            }),
            target: error,
            resolved: resolved,
          },
        };
}

function resolveEditorHostFile(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let file: Dynamic = event.file ?? ``;
  let resolveEditorHostFileResult: Dynamic;
  switch (event.target.kind) {
    case `file`:
      return file;
    case `entity`:
      return `${event.target.scheme}:${event.target.name}${event.target.target === undefined ? `` : `#${event.target.target}`}`;
    case `grid`:
      resolveEditorHostFileResult = `${event.target.sheet}!${event.target.range}`;
      break;
    case `legacy`:
      resolveEditorHostFileResult = event.target.fragment;
      break;
    case `node`: {
      resolveEditorHostFileResult = event.target.id;
      if (event.target.field?.length) {
        resolveEditorHostFileResult += `.` + event.target.field.join(`.`);
      }
      let selector: Dynamic = event.target.selector;
      if (selector)
        if (selector.kind === `quote`) {
          let replace: Dynamic = selector.exact
            .replace(/\\/g, `\\\\`)
            .replace(/"/g, `\\"`);
          resolveEditorHostFileResult += `~${EditorHostQuote.quote}:"${replace}"`;
        } else if (selector.kind === `cell`) {
          let label = selector.table === undefined ? `` : `${selector.table}/`;
          resolveEditorHostFileResult += `~${EditorHostQuote.cell}:${label}${selector.row},${selector.col}`;
          if (selector.toRow !== undefined) {
            resolveEditorHostFileResult += `:${selector.toRow},${selector.toCol}`;
          }
        } else
          resolveEditorHostFileResult += `~${EditorHostQuote.element}:${selector.dataClaudeId}`;
      break;
    }
  }
  return `${file}#${resolveEditorHostFileResult}`;
}

var EditorHostKind: Dynamic;

var EditorHostStaged: Dynamic;

var EditorHostRecord: Dynamic;

var EditorHostActor: Dynamic;

var EditorHostRegex: Dynamic;

var EditorHostPositive: Dynamic;

var EditorHostRegex2: Dynamic;

var EditorHostState16: Dynamic;

var EditorHostUnparseableRef: Dynamic;

function filterEditorHostSlice(
  filterEditorHostSlice2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Array.isArray(filterEditorHostSlice2)
    ? filterEditorHostSlice2
        .filter(
          (items?: unknown, ..._extraArguments: unknown[]) =>
            typeof items == `string` &&
            items.length <= 128 &&
            /^[\w-]+$/.test(items),
        )
        .slice(0, 20)
    : [];
}

function resolveEditorHostCenter(
  editorHostCenter?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorHostCenter === `center` || editorHostCenter === `right`
    ? editorHostCenter
    : null;
}

function resolveEditorHostTrim(
  editorHostTrim?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof editorHostTrim != `string`) return null;
  let trimmedEditorHostTrim = editorHostTrim.trim();
  return trimmedEditorHostTrim !== `` &&
    new TextEncoder().encode(trimmedEditorHostTrim).length <= 1024
    ? trimmedEditorHostTrim
    : null;
}

function resolveEditorHostTest(
  editorHostTest?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorHostTrim = resolveEditorHostTrim(editorHostTest);
  return editorHostTrim !== null &&
    /[^\p{Cf}\p{Z}\s\u034F\u115F\u1160\u17B4\u17B5\u180B-\u180E\u3164\uFFA0]/u.test(
      editorHostTrim,
    )
    ? editorHostTrim
    : null;
}

var EditorHostText: Dynamic;

var EditorHostRefine: Dynamic;

var EditorHostJson: Dynamic;

var EditorHostBody: Dynamic;

var EditorHostAspectRatio: Dynamic;

var EditorHostOrder: Dynamic;

var EditorHostSlide: Dynamic;

var EditorHostState17: number;

var EditorHostRegex3: Dynamic;

var EditorHostCeil: number;

var editorHostPattern3: RegExp;

var EditorHostKind2: Dynamic;

var EditorHostState18: number;

var EditorHostState19: Dynamic;

var EditorHostCode: Dynamic;

var EditorHostCode2: Dynamic;

function isEditorHostCode(
  editorHostCode?: unknown,
  ..._extraArguments: unknown[]
) {
  if (!editorHostCode || typeof editorHostCode != `object`) return false;
  let enabled = false;
  for (let isEditorHostCodeResult of Object.values(editorHostCode) as Dynamic) {
    let isEditorHostCodeResult2: Dynamic = isEditorHostCodeResult;
    if (
      isEditorHostCodeResult2 &&
      typeof isEditorHostCodeResult2 == `object` &&
      isEditorHostCodeResult2.type === `code` &&
      typeof isEditorHostCodeResult2.code == `string`
    ) {
      isEditorHostCodeResult2.type = `widget`;
      enabled = true;
    }
  }
  return enabled;
}

var EditorHostStyles5: string;

function isEditorHostKind(
  editorHostKind?: unknown,
  ..._extraArguments: unknown[]
): boolean {
  if (!editorHostKind || typeof editorHostKind != `object`) return false;
  let enabled = false;
  let replace = (
    editorHostKind2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!editorHostKind2 || typeof editorHostKind2 != `object`) return;
    let editorHostKind3: Dynamic = editorHostKind2;
    if (editorHostKind3.type === `image`) {
      let attrs: Dynamic = editorHostKind3.attrs ?? {};
      let url: Dynamic = typeof attrs.src == `string` ? attrs.src : ``;
      let src: Dynamic;
      if (/^data:/i.test(url) && url.length <= EditorHostCeil)
        src = {
          kind: `data`,
          url: url,
        };
      else {
        let label: string = ``;
        try {
          label = url ? new URL(url).protocol.replace(/:$/, ``) : ``;
        } catch {
          label = `unparseable`;
        }
        src = {
          kind: `data`,
          url: EditorHostStyles5,
        };
        attrs.name =
          attrs.name ||
          (label ? `[unrenderable ${label} image]` : `[unrenderable image]`);
      }
      editorHostKind3.type = `media`;
      editorHostKind3.attrs = {
        src: src,
        name: typeof attrs.name == `string` ? attrs.name : ``,
        alt: typeof attrs.alt == `string` ? attrs.alt : null,
        width: attrs.width ?? null,
        commentIds: attrs.commentIds ?? null,
        align: attrs.align ?? null,
      };
      enabled = true;
    }
    if (Array.isArray(editorHostKind3.content))
      for (let isEditorHostKindResult of editorHostKind3.content as Dynamic)
        replace(isEditorHostKindResult);
  };
  replace(editorHostKind);
  return enabled;
}

function isEditorHostProse(
  editorHostProse?: unknown,
  ..._extraArguments: unknown[]
) {
  if (!editorHostProse || typeof editorHostProse != `object`) return false;
  let enabled = false;
  for (let isEditorHostProseResult of Object.values(
    editorHostProse,
  ) as Dynamic) {
    let isEditorHostProseResult2: Dynamic = isEditorHostProseResult;
    if (
      isEditorHostProseResult2 &&
      typeof isEditorHostProseResult2 == `object` &&
      isEditorHostProseResult2.type === `prose` &&
      isEditorHostKind(isEditorHostProseResult2.json)
    ) {
      enabled = true;
    }
  }
  return enabled;
}

var EditorHostAfter: Dynamic;

var EditorHostProse: Dynamic;

var EditorHostWidget: Dynamic;

function resolveEditorHostHasOwn(
  editorHostHasOwn?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return Object.hasOwn(EditorHostProse, editorHostHasOwn);
}

var EditorHostCode3: Dynamic;

var EditorHostKind3: Dynamic;

var EditorHostKind4: Dynamic;

var EditorHostKind5: Dynamic;

var EditorHostKind6: Dynamic;

var EditorHostState20: Dynamic;

var escapeHtml: Dynamic;

function resolveEditorHostValue15(
  editorHostValue15?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let text = String(editorHostValue15 ?? `#`);
  return isPlatformSessionAndSourcesTest(text)
    ? resolvePlatformSessionAndSourcesCharCodeAt2(text)
    : `#`;
}

function resolveEditorHostIsFinite(
  editorHostIsFinite?: unknown,
  options: Dynamic = 1e5,
  ..._extraArguments: unknown[]
) {
  let editorHostIsFinite2 =
    typeof editorHostIsFinite == `number`
      ? editorHostIsFinite
      : Number(editorHostIsFinite);
  return Number.isFinite(editorHostIsFinite2)
    ? Math.round(Math.max(-options, Math.min(options, editorHostIsFinite2)))
    : 0;
}

function resolveEditorHostTrim2(
  editorHostTrim2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let trimmedText = String(editorHostTrim2 ?? ``).trim();
  return trimmedText === ``
    ? ``
    : /^#[0-9a-fA-F]{3,8}$/.test(trimmedText) ||
        /^[a-zA-Z]{1,32}$/.test(trimmedText) ||
        /^(?:rgb|hsl)a?\(\s*[0-9.%,\s/]{1,64}\)$/.test(trimmedText)
      ? trimmedText
      : ``;
}

var resolveEditorHostValue16: (editorHostValue162?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostMessage7: string;

var EditorHostRest: {
    rest: number;
    open: number;
    openDark: number;
};

var resolveEditorHostValue17: (editorHostValue17?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostRest2: {
    rest: string;
    on: string;
    res: string;
    resOn: string;
};

var EditorHostMessage8: string;

var EditorHostMessage9: string;

var EditorHostRest3: {
    rest: string;
    soft: string;
};

var EditorHostDataLfileDatumThreads: string;

var EditorHostDataLfileDatumDraft: string;

var EditorHostState21: string;

var EditorHostState22: string;

var EditorHostRest4: string;

var EditorHostRest5: string;

var editorHostValue100: number;

var editorHostValue65534: number;

var editorHostValue5000: number;

var editorHostPattern4: RegExp;

function filterEditorHostDataColwidth(
  filterEditorHostDataColwidth2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let attrs: Dynamic = filterEditorHostDataColwidth2.attrs;
  let editorExtensionsIsInteger = resolveEditorExtensionsIsInteger(
    attrs?.colspan,
    editorHostValue100,
  );
  let editorExtensionsIsInteger2 = resolveEditorExtensionsIsInteger(
    attrs?.rowspan,
    editorHostValue65534,
  );
  let collectEditorExtensionsSlice2: Dynamic = collectEditorExtensionsSlice(
    attrs?.colwidth,
  );
  let editorExtensionsDataColwidth: Dynamic = collectEditorExtensionsSlice2
    ? resolveEditorExtensionsDataColwidth(collectEditorExtensionsSlice2)
    : undefined;
  let background: Dynamic =
    typeof attrs?.background == `string` &&
    editorHostPattern4.test(attrs.background)
      ? attrs.background
      : null;
  let editorHostGray: Dynamic = background
    ? resolveEditorHostGray(background)
    : null;
  let filteredItemsText = [
    editorExtensionsDataColwidth?.style,
    background ? `background-color:${background}` : null,
  ]
    .filter(Boolean)
    .join(`;`);
  return (
    (editorExtensionsIsInteger > 1
      ? ` colspan="${editorExtensionsIsInteger}"`
      : ``) +
    (editorExtensionsIsInteger2 > 1
      ? ` rowspan="${editorExtensionsIsInteger2}"`
      : ``) +
    (editorExtensionsDataColwidth
      ? ` data-colwidth="${editorExtensionsDataColwidth[`data-colwidth`]}"`
      : ``) +
    (background ? ` data-bg="${background}"` : ``) +
    (editorHostGray ? ` data-bg-hue="${editorHostGray}"` : ``) +
    (filteredItemsText ? ` style="${filteredItemsText}"` : ``)
  );
}

function resolveEditorHostCols(
  editorHostCols?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return collectEditorHostOpt(editorHostCols, options, context, {
    cols: 0,
  });
}

var resolveEditorHostLink: Dynamic;

function collectEditorHostOpt(
  node?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = [undefined, undefined],
  ..._extraArguments: unknown[]
): Dynamic {
  let join: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    (node.content ?? [])
      .map(
        (
          content?: Dynamic,
          index?: Dynamic,
          content2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          collectEditorHostOpt(content, options, context, dependencies, [
            content2[index - 1],
            content2[index + 1],
          ]),
      )
      .join(``);
  let escapeHtml2: Dynamic = (
    collectEditorHostOpt2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let collectEditorHostOpt3: Dynamic = collectEditorHostOpt2;
    for (let collectEditorHostOptResult of (node.marks ?? []) as Dynamic)
      if (collectEditorHostOptResult.type === `bold`)
        collectEditorHostOpt3 = `<strong>${collectEditorHostOpt3}</strong>`;
      else if (collectEditorHostOptResult.type === `italic`)
        collectEditorHostOpt3 = `<em>${collectEditorHostOpt3}</em>`;
      else if (collectEditorHostOptResult.type === `code`)
        collectEditorHostOpt3 = `<code>${collectEditorHostOpt3}</code>`;
      else if (collectEditorHostOptResult.type === `strike`)
        collectEditorHostOpt3 = `<s>${collectEditorHostOpt3}</s>`;
      else if (collectEditorHostOptResult.type === `underline`)
        collectEditorHostOpt3 = `<u>${collectEditorHostOpt3}</u>`;
      else if (collectEditorHostOptResult.type === `highlight`) {
        let editorExtensionsYellow2: Dynamic = resolveEditorExtensionsYellow2(
          collectEditorHostOptResult.attrs?.color,
        );
        collectEditorHostOpt3 =
          editorExtensionsYellow2 === null
            ? `<mark>${collectEditorHostOpt3}</mark>`
            : `<mark data-color="${editorExtensionsYellow2}" class="ldoc-hl-${editorExtensionsYellow2}">${collectEditorHostOpt3}</mark>`;
      } else if (collectEditorHostOptResult.type === `suggestion`)
        collectEditorHostOpt3 = `<span data-suggestion-kind="${collectEditorHostOptResult.attrs?.kind === `delete` ? `delete` : `insert`}" data-suggestion-id="${escapeHtml(typeof collectEditorHostOptResult.attrs?.id == `string` ? collectEditorHostOptResult.attrs.id : ``)}">${collectEditorHostOpt3}</span>`;
      else if (collectEditorHostOptResult.type === `commentAnchor`)
        collectEditorHostOpt3 = `<span class="lfile-comment-anchor" data-comment-id="${escapeHtml(typeof collectEditorHostOptResult.attrs?.threadId == `string` ? collectEditorHostOptResult.attrs.threadId : ``)}">${collectEditorHostOpt3}</span>`;
      else if (collectEditorHostOptResult.type === `link`) {
        let editorHostValue15: Dynamic = resolveEditorHostValue15(
          collectEditorHostOptResult.attrs?.href,
        );
        let editorHostExec: Dynamic =
          editorHostValue15 === `#`
            ? null
            : resolveEditorHostExec(collectEditorHostOptResult.attrs?.href);
        let label =
          editorHostExec === null ? `` : ` data-ref-chip="${editorHostExec}"`;
        collectEditorHostOpt3 = `<a href="${escapeHtml(editorHostValue15)}"${label} rel="noopener noreferrer">${collectEditorHostOpt3}</a>`;
      }
    return collectEditorHostOpt3;
  };
  switch (node.type) {
    case `doc`:
      return `<div class="ProseMirror">${join()}</div>`;
    case `text`: {
      let editorHostLink: Dynamic = resolveEditorHostLink(node);
      let editorHostArtifact2: Dynamic =
        context?.artifactLinkChips !== true || editorHostLink === undefined
          ? null
          : resolveEditorHostArtifact2(editorHostLink);
      return escapeHtml2(
        editorHostArtifact2 !== null &&
          isEditorHostValue(
            editorHostArtifact2,
            node.text,
            resolveEditorHostLink(argument[0]) === editorHostLink ||
              resolveEditorHostLink(argument[1]) === editorHostLink,
          )
          ? `<span class="${resolveEditorHostArtifact(node.text ?? ``)}">${escapeHtml(node.text ?? ``)}</span>`
          : escapeHtml(node.text ?? ``),
      );
    }
    case `paragraph`: {
      let contentItem: Dynamic = node.content?.[0];
      let matchesType =
        contentItem?.type === `chipCheckbox` ||
        (contentItem?.type === `builtin` &&
          contentItem.attrs?.builtin?.kind === `checkbox`);
      let editorHostIsInteger: Dynamic = resolveEditorHostIsInteger(
        node.attrs?.heading,
      );
      return editorHostIsInteger === null
        ? matchesType
          ? `<p class="ldoc-checklist">${join()}</p>`
          : `<p>${join()}</p>`
        : `<h${editorHostIsInteger}>${join()}</h${editorHostIsInteger}>`;
    }
    case `heading`: {
      let number2 = Number(node.attrs?.level);
      let number3 =
        Number.isInteger(number2) && number2 >= 1 && number2 <= 6 ? number2 : 1;
      return `<h${number3}>${join()}</h${number3}>`;
    }
    case `bulletList`:
      return `<ul>${join()}</ul>`;
    case `orderedList`: {
      let number2 = Number(node.attrs?.start);
      return Number.isFinite(number2) && number2 > 1
        ? `<ol start="${number2}">${join()}</ol>`
        : `<ol>${join()}</ol>`;
    }
    case `listItem`: {
      let editorHostValue4: Dynamic = resolveEditorHostValue4(
        node.attrs?.[EditorHostOwnLevel],
      );
      return editorHostValue4
        ? `<li ${EditorHostDataOwnLevel}="${editorHostValue4}">${join()}</li>`
        : `<li>${join()}</li>`;
    }
    case `codeBlock`: {
      let editorHostValue8: Dynamic = resolveEditorHostValue8(
        typeof node.attrs?.language == `string` ? node.attrs.language : null,
      );
      let label = ``;
      if (editorHostValue8 === `csv`)
        label = `<div class="t0-md">${collectEditorHostText((node.content ?? []).map((content?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (typeof content.text == `string` ? content.text : ``)).join(``))}</div>`;
      else if (editorHostValue8 === `markdown`)
        label = `<div class="t0-md">${collectEditorHostTag((node.content ?? []).map((content?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (typeof content.text == `string` ? content.text : ``)).join(``))}</div>`;
      else if (editorHostValue8 === `latex`) {
        let editorHostValue10: Dynamic = resolveEditorHostValue10(
          (node.content ?? [])
            .map(
              (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                typeof content.text == `string` ? content.text : ``,
            )
            .join(``),
        );
        if (editorHostValue10) {
          label = `<div class="t0-math">${editorHostValue10}</div>`;
        }
      }
      return `${label}<pre><code>${join()}</code></pre>`;
    }
    case `blockquote`:
      return `<blockquote>${join()}</blockquote>`;
    case `hardBreak`:
      return `<br>`;
    case `horizontalRule`:
      return `<hr>`;
    case `pending`: {
      let intent: Dynamic =
        typeof node.attrs?.intent == `string` ? node.attrs.intent : ``;
      let mappedEditorExtensionsRoleEntriesText = Object.entries(
        resolveEditorExtensionsRole(intent),
      )
        .map(
          (
            [editorExtensionsRoleEntry, editorExtensionsRoleEntry2]: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            ` ${editorExtensionsRoleEntry}="${escapeHtml(editorExtensionsRoleEntry2)}"`,
        )
        .join(``);
      return `<div data-ldoc-pending="" data-intent="${escapeHtml(intent)}"${mappedEditorExtensionsRoleEntriesText}>${join()}</div>`;
    }
    case `table`: {
      let contentItem: Dynamic = (node.content ?? [])[0];
      let items: Dynamic = [];
      let count: number = 0;
      let enabled = true;
      for (let collectEditorHostOptResult of (contentItem?.content ??
        []) as Dynamic) {
        if (dependencies.cols >= editorHostValue5000) break;
        let collectEditorExtensionsSlice2: Dynamic =
          collectEditorExtensionsSlice(
            collectEditorHostOptResult.attrs?.colwidth,
          );
        let editorExtensionsIsInteger = resolveEditorExtensionsIsInteger(
          collectEditorHostOptResult.attrs?.colspan,
          editorHostValue100,
        );
        for (
          let index = 0;
          index < editorExtensionsIsInteger &&
          dependencies.cols < editorHostValue5000;
          index++, dependencies.cols++
        ) {
          let collectEditorExtensionsSliceItem: Dynamic =
            collectEditorExtensionsSlice2?.[index];
          if (collectEditorExtensionsSliceItem) {
            items.push(
              `<col style="width:${Math.max(collectEditorExtensionsSliceItem, 48)}px">`,
            );
            count += collectEditorExtensionsSliceItem;
          } else {
            items.push(`<col style="min-width:48px">`);
            count += 48;
            enabled = false;
          }
        }
      }
      let label = ``;
      let label2 = ``;
      if (items.length > 0) {
        label = ` style="${enabled ? `width` : `min-width`}:${count}px"`;
        label2 = `<colgroup>${items.join(``)}</colgroup>`;
      }
      return `<div class="tableWrapper"><table${label}>${label2}${join()}</table></div>`;
    }
    case `tableRow`: {
      let content: Dynamic = node.content ?? [];
      let label = content.every(
        (content2?: Dynamic, ..._extraArguments: unknown[]) =>
          content2.type === `tableHeader`,
      )
        ? `col`
        : `row`;
      return `<tr>${content.map((node2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (node2.type === `tableHeader` ? `<th scope="${label}"${filterEditorHostDataColwidth(node2)}>${(node2.content ?? []).map((content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => collectEditorHostOpt(content2, options, context, dependencies)).join(``)}</th>` : collectEditorHostOpt(node2, options, context, dependencies))).join(``)}</tr>`;
    }
    case `tableHeader`:
      return `<th${filterEditorHostDataColwidth(node)}>${join()}</th>`;
    case `tableCell`:
      return `<td${filterEditorHostDataColwidth(node)}>${join()}</td>`;
    case `image`: {
      let text = String(node.attrs?.alt ?? ``);
      let label = `<span data-lfile-pm="image" title="${escapeHtml(String(node.attrs?.title ?? ``))}">[image${text ? `: ${escapeHtml(resolveEditorExtensionsJoin(text))}` : ``}]</span>`;
      for (let collectEditorHostOptResult of filterEditorHostSlice(
        node.attrs?.commentIds,
      ) as Dynamic)
        label = `<span class="lfile-comment-anchor" data-comment-id="${escapeHtml(collectEditorHostOptResult)}">${label}</span>`;
      return label;
    }
    case `media`: {
      let text = String(node.attrs?.alt ?? ``);
      let text2 = String(node.attrs?.name ?? ``);
      let label = `<span data-lfile-pm="media">[media${text2 ? `: ${escapeHtml(resolveEditorExtensionsJoin(text2))}` : ``}${text && text !== text2 ? ` — ${escapeHtml(resolveEditorExtensionsJoin(text))}` : ``}]</span>`;
      for (let collectEditorHostOptResult of filterEditorHostSlice(
        node.attrs?.commentIds,
      ) as Dynamic)
        label = `<span class="lfile-comment-anchor" data-comment-id="${escapeHtml(collectEditorHostOptResult)}">${label}</span>`;
      return label;
    }
    case `embed`:
    case `embedInline`: {
      let text = String(node.attrs?.ref ?? ``);
      let label = node.type === `embed` ? `div` : `span`;
      let label2: string = `[embed: ${escapeHtml(resolveEditorExtensionsJoin(text))}]`;
      if (options && node.type === `embed`) {
        let editorHostError: Dynamic = resolveEditorHostError(text);
        let target: Dynamic = editorHostError.ok
          ? editorHostError.ref.target
          : undefined;
        if (
          editorHostError.ok &&
          editorHostError.ref.file === undefined &&
          target?.kind === `node` &&
          !target.field &&
          !target.selector
        ) {
          label2 = options.renderChild(target.id);
        }
      }
      let number2 = Number(node.attrs?.width);
      let label3 =
        node.type === `embed` && Number.isFinite(number2) && number2 > 0
          ? ` data-width="${Math.round(number2)}" data-lfile-embed-sized="" style="width:${Math.round(number2)}px;--embed-w:${Math.round(number2)}px"`
          : ``;
      let editorHostCenter: Dynamic =
        node.type === `embed`
          ? resolveEditorHostCenter(node.attrs?.align)
          : null;
      let label4 = editorHostCenter ? ` data-align="${editorHostCenter}"` : ``;
      let editorHostTrim =
        node.type === `embed`
          ? resolveEditorHostTrim(node.attrs?.caption)
          : null;
      let label5 = editorHostTrim
        ? ` caption="${escapeHtml(editorHostTrim)}"`
        : ``;
      let label6: string = ``;
      if (node.type === `embed`)
        for (let collectEditorHostOptResult of filterEditorHostSlice(
          node.attrs?.commentIds,
        ) as Dynamic)
          label6 += `<span class="lfile-embed-anchor" data-comment-id="${escapeHtml(collectEditorHostOptResult)}"></span>`;
      return `<${label} data-lfile-embed="${escapeHtml(text)}"${label3}${label4}${label5}>${label2}${label6}</${label}>`;
    }
    case `pill`: {
      let text = String(node.attrs?.ref ?? ``);
      return `<span data-lfile-pill="${escapeHtml(text)}">[${escapeHtml(resolveEditorExtensionsJoin(text))}]</span>`;
    }
    case `mention`: {
      if (typeof node.attrs?.ref == `string` && node.attrs.ref !== ``) {
        let editorAnchorsAndMentionsValue10: Dynamic =
          resolveEditorAnchorsAndMentionsValue10(node.attrs.ref) ?? `ref`;
        let editorExtensionsValue16: Dynamic = resolveEditorExtensionsValue16(
          node.attrs.label,
        );
        let label =
          editorExtensionsValue16 === null
            ? ``
            : ` data-label="${escapeHtml(resolveEditorExtensionsTrim(node.attrs.label) ?? ``)}"`;
        return `<span class="ldoc-chip" data-chip="${escapeHtml(editorAnchorsAndMentionsValue10)}" data-ref="${escapeHtml(node.attrs.ref)}"${label}>${escapeHtml(editorExtensionsValue16 ?? resolveEditorExtensionsValue9(editorAnchorsAndMentionsValue10))}</span>`;
      }
      if (
        typeof node.attrs?.principal == `string` &&
        node.attrs.principal !== ``
      ) {
        let principal: Dynamic = node.attrs.principal;
        let editorExtensionsValue16: Dynamic =
          principal === `claude`
            ? null
            : resolveEditorExtensionsValue16(node.attrs.label);
        let label: Dynamic =
          principal === `claude`
            ? `Claude`
            : (editorExtensionsValue16 ??
              (principal.includes(`@`)
                ? principal.slice(0, principal.indexOf(`@`))
                : principal));
        return `<span class="ldoc-mention" data-principal="${escapeHtml(principal)}">@${escapeHtml(resolveEditorExtensionsJoin(label))}</span>`;
      }
      let text = String(node.attrs?.id ?? ``);
      let text2 = String(node.attrs?.label ?? node.attrs?.id ?? ``);
      return `<span class="ldoc-mention" data-mention-id="${escapeHtml(text)}" data-mention-label="${escapeHtml(text2)}">${escapeHtml(resolveEditorExtensionsJoin(text2))}</span>`;
    }
    case `chipCheckbox`: {
      let matchesChecked = node.attrs?.checked === true;
      return `<span class="ldoc-chip" data-chip="checkbox" data-checked="${matchesChecked}">${matchesChecked ? `☑` : `☐`}</span>`;
    }
    case `chipDate`:
      return `<span class="ldoc-chip" data-chip="date">${escapeHtml(resolveEditorExtensionsJoin(String(node.attrs?.value ?? ``)) || `—`)}</span>`;
    case `chipDropdown`: {
      let {
        opt: editorExtensionsOpt,
        owned: editorExtensionsOpt2,
        legacy: editorExtensionsOpt3,
        label: editorExtensionsOpt4,
      }: Dynamic = resolveEditorExtensionsOpt(
        node.attrs?.options,
        node.attrs?.value,
        node.attrs?.typeRef,
      );
      return editorExtensionsOpt
        ? `<span class="ldoc-chip" data-chip="dropdown" data-dd="true"><span class="dd-dot dd-c-${editorExtensionsOpt.c}"></span><span class="t">${escapeHtml(resolveEditorExtensionsJoin(editorExtensionsOpt.l) || `—`)}</span></span>`
        : editorExtensionsOpt3
          ? `<span class="ldoc-chip" data-chip="dropdown">▾ <span class="t">${escapeHtml(resolveEditorExtensionsJoin(editorExtensionsOpt4) || `—`)}</span></span>`
          : `<span class="ldoc-chip" data-chip="dropdown" data-dd="true" data-empty="true"><span class="dd-ring"></span><span class="t">${editorExtensionsOpt2 ? `Empty` : `Select`}</span></span>`;
    }
    case `chipVote`: {
      let voters: Dynamic = node.attrs?.voters;
      return `<span class="ldoc-chip" data-chip="vote">👍 <span class="n">${Array.isArray(voters) ? voters.length : 0}</span></span>`;
    }
    case `builtin`: {
      let builtin: Dynamic = node.attrs?.builtin;
      let label = builtin
        ? ` data-builtin="${escapeHtml(JSON.stringify(builtin))}"`
        : ``;
      switch (builtin?.kind) {
        case `mention`:
          return `<span${label} class="ldoc-mention" data-mention-id="${escapeHtml(typeof builtin.principal == `string` ? builtin.principal : ``)}">${escapeHtml(resolveEditorHostMention(builtin))}</span>`;
        case `checkbox`: {
          let matchesChecked = builtin.checked === true;
          return `<span${label} class="ldoc-chip" data-chip="checkbox" data-checked="${matchesChecked}">${matchesChecked ? `☑` : `☐`}</span>`;
        }
        case `date`: {
          let ts2: Dynamic = typeof builtin.ts == `string` ? builtin.ts : ``;
          let test = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(\[[^\]]+\])?)?$/.test(
            ts2,
          );
          return `<span${label} class="ldoc-chip" data-chip="date">${escapeHtml(resolveEditorExtensionsJoin(ts2 === `` ? `—` : test ? ts2 : ts2.slice(0, 10)) || `—`)}</span>`;
        }
        case `enum`: {
          let result: Dynamic =
            typeof builtin.enum == `string` ? builtin.enum : ``;
          let index: Dynamic =
            typeof builtin.index == `number` &&
            Number.isInteger(builtin.index) &&
            builtin.index >= 0
              ? builtin.index
              : null;
          let result2: Dynamic =
            result !== `` && context?.resolveEnum
              ? context.resolveEnum(result)
              : undefined;
          let resultItem: Dynamic =
            result2 !== undefined && index !== null && index < result2.length
              ? result2[index]
              : null;
          return resultItem === null
            ? `<span${label} class="ldoc-chip" data-chip="dropdown">▾</span>`
            : `<span${label} class="ldoc-chip" data-chip="dropdown" data-dd="true"><span class="t">${escapeHtml(resolveEditorExtensionsJoin(resultItem) || `—`)}</span></span>`;
        }
        case `ref`: {
          let editorHostEnum: Dynamic = resolveEditorHostEnum(builtin);
          return `<span${label} class="ldoc-chip" data-chip="${escapeHtml(editorHostEnum)}">${escapeHtml(resolveEditorExtensionsValue9(editorHostEnum))}</span>`;
        }
        default:
          return `<span class="ldoc-chip">◌</span>`;
      }
    }
    default:
      return `<div data-lfile-pm="${escapeHtml(node.type)}">${join()}</div>`;
  }
}

var EditorHostRenderStatic: Dynamic;

var EditorHostRenderStatic2: Dynamic;

var editorHostMap4: Dynamic;

function updateEditorHostHasOwn(
  updateEditorHostHasOwn2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!Object.hasOwn(EditorHostProse, updateEditorHostHasOwn2))
    throw Error(
      `register: "${updateEditorHostHasOwn2}" is not a known node type`,
    );
  editorHostMap4.set(updateEditorHostHasOwn2, options);
}

function getEditorHostCharCodeAt(
  editorHostCharCode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorHostMap4Entry: Dynamic = editorHostMap4.get(editorHostCharCode);
  if (editorHostMap4Entry) return editorHostMap4Entry;
  let count = 5381;
  let text = String(editorHostCharCode);
  for (let index = 0; index < text.length; index++)
    count = ((count << 5) + count + text.charCodeAt(index)) | 0;
  console.error(
    `rendererFor: no renderer registered for a node type outside KNOWN_NODE_SCHEMAS (type-hash ${(count >>> 0).toString(16)}, len ${text.length})`,
  );
  return EditorHostRenderStatic2;
}

function updateEditorHostTier(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let count: number = 0;
  let slides: Dynamic = Object.entries(file.nodes)
    .filter(
      ([, nodesEntry]: Dynamic, ..._extraArguments: unknown[]) =>
        nodesEntry?.type === `slide`,
    )
    .toSorted(
      (
        [, filteredNodesEntry]: Dynamic,
        [, filteredNodesEntry2]: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        filteredNodesEntry.type === `slide` &&
        filteredNodesEntry2.type === `slide`
          ? filteredNodesEntry.order < filteredNodesEntry2.order
            ? -1
            : 1
          : 0,
    )
    .map(
      ([toSorted]: Dynamic, ..._extraArguments: unknown[]): Dynamic => toSorted,
    );
  let placementsBySlide: Dynamic = new (Map as Dynamic)();
  for (let [
    updateEditorHostTierResult,
    updateEditorHostTierResult2,
  ] of Object.entries(file.nodes) as Dynamic) {
    if (updateEditorHostTierResult2?.type !== `placement`) continue;
    let placementsBySlideEntry: Dynamic =
      placementsBySlide.get(updateEditorHostTierResult2.slide) ?? [];
    placementsBySlideEntry.push(updateEditorHostTierResult);
    placementsBySlide.set(
      updateEditorHostTierResult2.slide,
      placementsBySlideEntry,
    );
  }
  for (let updateEditorHostTierResult of placementsBySlide.values() as Dynamic)
    updateEditorHostTierResult.sort(
      (
        rolldownRImport2?: Dynamic,
        rolldownRImport3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let nodeItem: Dynamic = file.nodes[rolldownRImport2];
        let nodeItem2: Dynamic = file.nodes[rolldownRImport3];
        return nodeItem.type === `placement` && nodeItem2.type === `placement`
          ? nodeItem.z < nodeItem2.z
            ? -1
            : 1
          : 0;
      },
    );
  let record2: Dynamic = {
    tier: 0,
    readonly: true,
    slides: slides,
    placementsBySlide: placementsBySlide,
    currentId: file.root,
    resolve: (
      updateEditorHostTier2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => file.nodes[updateEditorHostTier2],
    renderChild: (
      updateEditorHostTier2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (count > 2e6)
        return `<div data-lfile-truncated="${escapeHtml(updateEditorHostTier2)}"></div>`;
      let lookupEntry: Dynamic = lookup.get(updateEditorHostTier2);
      if (lookupEntry !== undefined) {
        count += lookupEntry.length;
        return lookupEntry;
      }
      let nodeItem: Dynamic = file.nodes[updateEditorHostTier2];
      if (!nodeItem)
        return `<div data-lfile-missing="${escapeHtml(updateEditorHostTier2)}">[missing: ${escapeHtml(updateEditorHostTier2)}]</div>`;
      if (uniqueItems.has(updateEditorHostTier2))
        return `<div data-lfile-cycle="${escapeHtml(updateEditorHostTier2)}"></div>`;
      uniqueItems.add(updateEditorHostTier2);
      let currentId: Dynamic = record2.currentId;
      record2.currentId = updateEditorHostTier2;
      let items: Dynamic;
      try {
        items = getEditorHostCharCodeAt(nodeItem.type).render_static(
          nodeItem,
          record2,
        );
      } catch (error: Dynamic) {
        items = `<div data-lfile-error="${escapeHtml(updateEditorHostTier2)}">[render error: ${escapeHtml(resolveEditorExtensionsJoin(String(error?.message ?? ``)))}]</div>`;
      }
      record2.currentId = currentId;
      uniqueItems.delete(updateEditorHostTier2);
      lookup.set(updateEditorHostTier2, items);
      count += items.length;
      return items;
    },
  };
  return record2.renderChild(file.root);
}

var EditorHostStyles6: string;

var EditorHostDataPrintKeep: string;

var EditorHostStyles7: string;

var EditorHostState23: string;

var EditorHostState24: string;

var EditorHostState25: string;

var EditorHostDataLfileInSelection: string;

var EditorHostStyles8: string;

var EditorHostState26: string[];

var EditorHostState27: string;

var EditorHostJoin2: string;

var EditorHostState28: string;

var EditorHostStyles9: string;

var EditorHostStyles10: string;

var EditorHostStyles11: string;

var resolveEditorHostValue18: (editorHostValue18?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostRest6: string;

var EditorHostMessage10: string;

var EditorHostState29: string;

var EditorHostRailKeepout: string;

var EditorHostLayoutMax: string;

function resolveEditorHostDocumentElement(
  editorHostDocumentElement?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let number2 = parseFloat(
    editorHostDocumentElement.defaultView
      ?.getComputedStyle(editorHostDocumentElement.documentElement)
      .getPropertyValue(`--layout-max`) ?? ``,
  );
  return Number.isFinite(number2) && number2 > 0
    ? Math.max(
        0,
        ((editorHostDocumentElement.defaultView?.innerWidth ?? 0) - number2) /
          2,
      )
    : 0;
}

function resolveEditorHostDocumentElement2(
  editorHostDocumentElement2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentElement: Dynamic = editorHostDocumentElement2.documentElement;
  let propertyValue: Dynamic =
    editorHostDocumentElement2.defaultView
      ?.getComputedStyle(documentElement)
      .getPropertyValue(`--rail-keepout`) ?? ``;
  let number2 = parseFloat(propertyValue);
  return Number.isFinite(number2) && number2 > 0
    ? number2 + resolveEditorHostDocumentElement(editorHostDocumentElement2)
    : 0;
}

var EditorHostEdgeMinLeft: string;

function resolveEditorHostGetPropertyValue(
  editorHostGetPropertyValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let propertyValue: Dynamic =
    editorHostGetPropertyValue.documentElement.style.getPropertyValue(
      EditorHostEdgeMinLeft,
    );
  let number2 = parseFloat(propertyValue);
  return Number.isFinite(number2) && number2 > 52 && number2 <= 400
    ? number2 -
        48 +
        resolveEditorHostDocumentElement(editorHostGetPropertyValue)
    : 0;
}

function resolveEditorHostTabs(
  editorHostTabs?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    tabs: editorHostTabs.frame && editorHostTabs.bar !== true,
    menu: false,
    comments: false,
    presence: false,
  };
}

var EditorHostGlyph: {
    size: number;
    glyph: number;
};

var EditorHostBadge: {
    size: number;
    badge: undefined;
};

function resolveEditorHostTabs2(
  editorHostTabs2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let max = Math.max(1, +!!editorHostTabs2.tabs);
  return 12 + max * EditorHostGlyph.size + (max - 1) * 6 + 12;
}

var EditorHostLfileOrphanRemount: string;

var EditorHostTrayBoot: string;

function installEditorHostCapture(
  installEditorHostCapture2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  var count = 64;
  var count2 = 3e3;
  var count3 = 1e4;
  var trusted: Dynamic =
    options && options.trusted
      ? options.trusted
      : function (
          installEditorHostCapture3?: Dynamic,
          ..._extraArguments: unknown[]
        ) {
          return installEditorHostCapture3.isTrusted === true;
        };
  var now: Dynamic =
    options && options.now
      ? options.now
      : function (..._extraArguments: unknown[]): Dynamic {
          return installEditorHostCapture2.performance.now();
        };
  var claim: Dynamic = options && options.claim ? options.claim : null;
  var now2: Dynamic = claim ? now() : 0;
  var document2: Dynamic = installEditorHostCapture2.document;
  var label: string = ``;
  var count4: number = 0;
  var enabled = false;
  var enabled2 = false;
  var enabled3 = true;
  var installEditorHostCaptureHandler = function (
    ..._extraArguments: unknown[]
  ): undefined {
    label = ``;
    count4 = 0;
    enabled2 = false;
  };
  var slice: Dynamic = function (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    if (!(claim && now() - now2 > count3) && !(!enabled3 || !trusted(event))) {
      var target: Dynamic = event.target;
      if (
        !(
          target !== document2.body &&
          target !== document2.documentElement &&
          target !== document2 &&
          target !== installEditorHostCapture2
        )
      ) {
        if (claim) {
          var matchedElement: Dynamic = document2.querySelector(
            `dialog[open], [role=dialog]`,
          );
          if (matchedElement && matchedElement.offsetParent != null) return;
        }
        if (!(enabled || event.isComposing === true || event.keyCode === 229)) {
          var key: Dynamic = typeof event.key == `string` ? event.key : ``;
          if (key === `Dead`) {
            enabled2 = true;
            return;
          }
          if (
            !(
              key === `Control` ||
              key === `Meta` ||
              key === `Alt` ||
              key === `AltGraph` ||
              key === `Shift` ||
              key === `OS`
            )
          ) {
            var matchesCondition =
              typeof event.getModifierState == `function` &&
              event.getModifierState(`AltGraph`) === true;
            if (
              !matchesCondition &&
              (event.ctrlKey === true || event.metaKey === true)
            )
              return installEditorHostCaptureHandler();
            if (!matchesCondition && event.altKey === true) {
              enabled2 = false;
              return;
            }
            if (key === `Backspace`) {
              enabled2 = false;
              if (
                claim &&
                (label === `` ||
                  label.length >= count ||
                  now() - count4 > count2)
              )
                return;
              if (claim) {
                claim(event);
              }
              label = label.slice(0, -1);
              return;
            }
            var key2: Dynamic =
              key.length === 1
                ? key
                : key === `Enter`
                  ? `
`
                  : ``;
            if (key2 !== ``) {
              if (enabled2) {
                enabled2 = false;
                return;
              }
              var now3: Dynamic = now();
              if (label === ``) {
                count4 = now3;
              }
              if (!(label.length >= count || now3 - count4 > count2)) {
                label += key2;
                if (claim) {
                  claim(event);
                }
              }
            }
          }
        }
      }
    }
  };
  var installEditorHostCaptureHandler2 = function (
    ..._extraArguments: unknown[]
  ): undefined {
    if (enabled3) {
      installEditorHostCaptureHandler();
    }
  };
  var installEditorHostCaptureHandler3 = function (
    ..._extraArguments: unknown[]
  ): undefined {
    if (enabled3) {
      enabled = true;
      installEditorHostCaptureHandler();
    }
  };
  var installEditorHostCaptureHandler4 = function (
    ..._extraArguments: unknown[]
  ): undefined {
    enabled = false;
  };
  var record2 = {
    capture: true,
    passive: true,
  };
  var record3 = {
    capture: true,
    passive: !claim,
  };
  var items = [`pointerdown`, `mousedown`, `touchstart`, `paste`];
  installEditorHostCapture2.addEventListener(`keydown`, slice, record3);
  for (var index = 0; index < items.length; index++)
    installEditorHostCapture2.addEventListener(
      items[index],
      installEditorHostCaptureHandler2,
      record2,
    );
  installEditorHostCapture2.addEventListener(
    `compositionstart`,
    installEditorHostCaptureHandler3,
    record2,
  );
  installEditorHostCapture2.addEventListener(
    `compositionend`,
    installEditorHostCaptureHandler4,
    record2,
  );
  installEditorHostCapture2.__lfileBootKeys = {
    take: function (..._extraArguments: unknown[]): Dynamic {
      enabled3 = false;
      installEditorHostCapture2.removeEventListener(`keydown`, slice, record3);
      for (var index2 = 0; index2 < items.length; index2++)
        installEditorHostCapture2.removeEventListener(
          items[index2],
          installEditorHostCaptureHandler2,
          record2,
        );
      installEditorHostCapture2.removeEventListener(
        `compositionstart`,
        installEditorHostCaptureHandler3,
        record2,
      );
      installEditorHostCapture2.removeEventListener(
        `compositionend`,
        installEditorHostCaptureHandler4,
        record2,
      );
      var label2: Dynamic = label;
      label = ``;
      return label2;
    },
  };
}

function installEditorHostPerformance(
  installEditorHostPerformance2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    document: installEditorHostPerformance2.document,
    performance: installEditorHostPerformance2.performance,
    addEventListener: (
      installEditorHostPerformance3?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      installEditorHostPerformance2.addEventListener(
        installEditorHostPerformance3,
        options2,
        context,
      ),
    removeEventListener: (
      installEditorHostPerformance3?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      installEditorHostPerformance2.removeEventListener(
        installEditorHostPerformance3,
        options2,
        context,
      ),
  };
  installEditorHostCapture(record2, {
    ...options,
    claim: (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      event.preventDefault();
      event.stopPropagation();
    },
  });
  let LfileBootKeys: Dynamic = record2.__lfileBootKeys ?? null;
  return {
    take(..._extraArguments: unknown[]): Dynamic {
      let LfileBootKeys2: Dynamic = LfileBootKeys;
      LfileBootKeys = null;
      return LfileBootKeys2 === null ? `` : LfileBootKeys2.take().slice(0, 64);
    },
  };
}

function resolveEditorHostArm(
  editorHostArm?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveEditorHostArmResult: Dynamic = null;
  let drop = (..._extraArguments: unknown[]): undefined => {
    let resolveEditorHostArmResult2: Dynamic = resolveEditorHostArmResult;
    resolveEditorHostArmResult = null;
    resolveEditorHostArmResult2?.take();
  };
  return {
    arm(..._extraArguments: unknown[]): undefined {
      drop();
      resolveEditorHostArmResult = editorHostArm.arm();
    },
    take(..._extraArguments: unknown[]): Dynamic {
      let resolveEditorHostArmResult2: Dynamic = resolveEditorHostArmResult;
      resolveEditorHostArmResult = null;
      let take: Dynamic = resolveEditorHostArmResult2?.take() ?? ``;
      if (take !== ``) {
        try {
          editorHostArm.say(resolveEditorHostValue19(take.length));
        } catch {}
        return take;
      }
    },
    drop: drop,
  };
}

var resolveEditorHostValue19: (editorHostValue19?: Dynamic, ..._extraArguments: unknown[]) => "1" | "2_5" | "6_plus";

var EditorHostLfileClaudeAskInk: string;

var EditorHostMessage11: string;

var COWORKER_WRITING_STYLE_CLASSES: {
    placeholder: string;
    shimmer: string;
    dissolve: string;
    chipOff: string;
    wait: string;
    word: string;
    caret: string;
    writing: string;
    tag: string;
    stop: string;
    simBadge: string;
    idle: string;
    idleHint: string;
    cue: string;
    cueEnter: string;
};

var EditorHostAngle: {
    angle: string;
    stops: string[];
    peakMix: string;
    size: string;
    ms: number;
    from: string;
    to: string;
    holdUntil: string;
    moveUntil: string;
    easing: string;
};

var EditorHostDataCwCuesOff: string;

var EditorHostState30: string;

var EditorHostProseMirror: string;

var EditorHostDocZoom: string;

var EditorHostMeasureBase: string;

var EditorHostState31: number[];

function resolveEditorHostIsFinite2(
  editorHostIsFinite2?: unknown,
  ..._extraArguments: unknown[]
) {
  return editorHostIsFinite2 === `fit`
    ? `fit`
    : typeof editorHostIsFinite2 != `number` ||
        !Number.isFinite(editorHostIsFinite2)
      ? 100
      : Math.min(200, Math.max(50, Math.round(editorHostIsFinite2)));
}

function resolveEditorHostIsFinite3(
  editorHostIsFinite3?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let options2: Dynamic =
    editorHostIsFinite3 === `fit`
      ? options
        ? options()
        : null
      : typeof editorHostIsFinite3 == `number`
        ? editorHostIsFinite3 / 100
        : null;
  return options2 === null ||
    !Number.isFinite(options2) ||
    Math.abs(options2 - 1) < 1e-4
    ? ``
    : String(Math.round(options2 * 1e4) / 1e4);
}

var resolveEditorHostValue20: (editorHostValue20?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorHostDisplay: string;

var resolveEditorHostKind3: Dynamic;

var EditorHostLfileFigure: string;

var editorHostValue1200: number;

var EditorHostTitle: string;

var EditorHostMessage12: string;

var EditorHostStartTyping: string;

var EditorHostDataGhostAlone: string;

var EditorHostLfileAskGhosted: string;

var EditorHostLfileAskGhostedUnder: string;

var EditorHostDataLdocFree: string;

function resolveEditorHostTop(
  editorHost?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveEditorHostTopResult of editorHost.order as Dynamic) {
    let topItem: Dynamic = editorHost.tops[resolveEditorHostTopResult];
    if (topItem === undefined || !Number.isFinite(topItem)) continue;
    let top = Math.max(0, Math.round(topItem + editorHost.docScrollY));
    let max = Math.max(
      1,
      Math.round(
        editorHost.heights[resolveEditorHostTopResult] ?? editorHost.estH,
      ),
    );
    items.push({
      top: top,
      bottom: Math.max(
        top + 1,
        Math.round(topItem + editorHost.docScrollY) + max,
      ),
    });
  }
  items.sort(
    (
      rolldownRImport2?: Dynamic,
      rolldownRImport3?: Dynamic,
      ..._extraArguments: unknown[]
    ): number => rolldownRImport2.top - rolldownRImport3.top,
  );
  let items2: Dynamic = [];
  for (let resolveEditorHostTopResult of items as Dynamic) {
    let at2: Dynamic = items2.at(-1);
    if (
      at2 &&
      (resolveEditorHostTopResult.top - at2.bottom <= 16 ||
        items2.length === 64)
    ) {
      at2.bottom = Math.max(at2.bottom, resolveEditorHostTopResult.bottom);
    } else {
      items2.push({
        ...resolveEditorHostTopResult,
      });
    }
  }
  return items2;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorHost1Step1(): void {
  `${resolveEditorHostValue(`.ldoc-menu .row.is-sel`)}`;
  (EditorHostStyles = `background:transparent;box-shadow:none`);
  (resolveEditorHostValue2 = (
    editorHostValue22?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `background-image:radial-gradient(${editorHostValue22} .75px,transparent .85px);background-size:4px 4px`);
  (EditorHostState4 = resolveEditorHostValue2(`rgba(31,30,29,.55)`));
  (EditorHostState5 = resolveEditorHostValue2(
    `var(--cds-text-muted,rgba(31,30,29,.45))`,
  ));
  (EditorHostMessage2 = `#f5f4ed`);
  (EditorHostStyles2 = `background-image:radial-gradient(var(--cds-text-muted) .75px,transparent .85px)`);
  (EditorHostMessage3 = `var(--cds-surface-3)`);
  (EditorHostState6 = `.ldoc-tgrip,.ldoc-thandle{position:absolute;z-index:3;display:flex;align-items:center;justify-content:center;border:0;padding:0;${EditorHostStyles};cursor:grab}.ldoc-thandle{transition:background-color 100ms ease}.ldoc-tgrip::after,.ldoc-thandle::after{content:"";display:block;${EditorHostState4}}.ldoc-tgrip-col{width:24px;height:14px;border-radius:7px}.ldoc-tgrip-col::after{width:12px;height:8px}.ldoc-tgrip-row{width:14px;height:24px;border-radius:7px}.ldoc-tgrip-row::after{width:8px;height:12px}.ldoc-tgrip:not(:hover):not(.ldoc-tgrip-drag):not([aria-expanded=true])::after{display:none}.ldoc-tgrip::before{content:"";position:absolute;inset:0;margin:auto;border-radius:999px;background:rgba(31,30,29,.32)}[data-mode=dark] .ldoc-tgrip::before{background:rgba(250,249,245,.28)}.ldoc-tgrip-col::before{width:24px;height:4px}.ldoc-tgrip-row::before{width:4px;height:24px}.ldoc-tgrip:is(:hover,.ldoc-tgrip-drag,[aria-expanded=true])::before{display:none}.ldoc-thandle{width:26px;height:26px;border-radius:8px}.ldoc-thandle::after{width:8px;height:12px}.ldoc-thandle:is(:hover,.ldoc-tgrip-drag,[aria-expanded=true]){background:${EditorHostMessage2}}.ldoc-tgrip:is(:hover,.ldoc-tgrip-drag,[aria-expanded=true]){background:rgba(31,30,29,.2)}.ldoc-tdrop{position:absolute;z-index:4;border-radius:999px;background:color-mix(in srgb,var(--cds-fill-accent,#2a78d6) 50%,transparent);pointer-events:none}.prosemirror-dropcursor-block{border-radius:999px}.ProseMirror td.ldoc-ttint-col{background-color:rgba(115,114,108,.055)}.ProseMirror td.ldoc-ttint-row{background-color:rgba(115,114,108,.04)}.ProseMirror th.ldoc-ttint-col,.ProseMirror th.ldoc-ttint-row{background:#f0eee6}.ProseMirror td.ldoc-tdim,.ProseMirror th.ldoc-tdim{opacity:.4;transition:opacity 100ms ease}`);
  (EditorHostDataLdocClip = `data-ldoc-clip`);
  (EditorHostMermaid = [`mermaid`, `csv`].map(
    (item?: Dynamic, ..._extraArguments: unknown[]) => `[data-live="${item}"]`,
  ));
  (EditorHostJoin = `:is(${EditorHostMermaid.join(`,`)})`);
  (EditorHostMessage4 = `#e8e5dc`);
  (EditorHostStyles3 = `.ldoc-tadd{position:absolute;z-index:3;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border:0;padding:0;margin:0;background:transparent;color:var(--cds-text-muted,#73726c);cursor:pointer}.ldoc-tadd::before{content:"";position:absolute;inset:0;border-radius:4px;background:var(--cds-fill-ghost-hover,rgba(31,30,29,.05));transition:background-color 100ms ease}.ldoc-tadd:hover::before{background:var(--cds-alpha-2,rgba(31,30,29,.1))}.ldoc-tadd:active::before{background:var(--cds-alpha-3,rgba(31,30,29,.2))}.ldoc-tadd svg{position:relative;display:block;pointer-events:none}.ldoc-tadd-row{height:18px;bottom:0;padding-top:4px}.ldoc-tadd-row::before{top:4px}.ldoc-tadd-col{width:18px;padding-left:4px}.ldoc-tadd-col::before{left:4px}`);
  (editorHostGrayRedOrangeYellowValues = [
    `gray`,
    `red`,
    `orange`,
    `yellow`,
    `green`,
    `aqua`,
    `blue`,
    `violet`,
    `magenta`,
  ]);
  (EditorHostRed = {
    red: 0,
    orange: 20,
    yellow: 46,
    green: 125,
    aqua: 168,
    blue: 215,
    violet: 258,
    magenta: 335,
  });
  (editorHostValue0_035 = 0.035);
  (editorHostValue0_3 = 0.3);
  (EditorHostGray = {
    gray: `#20201f`,
    red: `#3c0e0e`,
    orange: `#371407`,
    yellow: `#311a00`,
    green: `#11260f`,
    aqua: `#022720`,
    blue: `#032042`,
    violet: `#1d1649`,
    magenta: `#390f1f`,
  });
  (resolveEditorHostValue3 = (
    editorHostValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `var(--cds-${editorHostValue3}-800,${EditorHostGray[editorHostValue3]})`);
  (collectEditorHostJoin = (
    collectEditorHostJoin3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorHostGrayRedOrangeYellowValues
      .map(
        (
          editorHostGrayRedOrangeYellowValue?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          `[data-mode=dark] ${collectEditorHostJoin3}[data-bg-hue=${editorHostGrayRedOrangeYellowValue}]{background-image:linear-gradient(${resolveEditorHostValue3(editorHostGrayRedOrangeYellowValue)},${resolveEditorHostValue3(editorHostGrayRedOrangeYellowValue)})}`,
      )
      .join(``));
  (EditorHostState7 = collectEditorHostJoin(
    `.ProseMirror :is(td,th)`,
  ));
  (EditorHostState8 = collectEditorHostJoin(`.ldoc-elmenu .swatch`));
  (EditorHostState9 = `@layer base{.ProseMirror .tableWrapper{position:relative;margin:2px -10px -8px -48px;padding:16px 10px 18px 48px;overflow-x:auto}.ProseMirror table{border-collapse:collapse;width:max-content;font-size:.94em;line-height:1.45}.ProseMirror th,.ProseMirror td{position:relative;border:1px solid ${EditorHostMessage4};padding:6px 10px;vertical-align:top;box-sizing:border-box;min-width:48px}.ProseMirror th{background:#f5f3ed;font-weight:600;text-align:left}.ProseMirror .tableWrapper th{font-size:inherit;font-weight:inherit;text-transform:inherit;letter-spacing:inherit}.ProseMirror .tableWrapper tbody tr:hover{background:none}.ProseMirror th>p,.ProseMirror td>p{margin:0}.ProseMirror td p,.ProseMirror th p{overflow-x:clip;overflow-wrap:anywhere}.ProseMirror td:not([data-colwidth]),.ProseMirror th:not([data-colwidth]){max-width:42ch}.ProseMirror .selectedCell::after{content:"";position:absolute;inset:0;background:color-mix(in srgb,var(--cds-fill-accent,#2a78d6) 10%,transparent);pointer-events:none}.ProseMirror .column-resize-handle{position:absolute;right:-1px;top:-1px;bottom:-1px;width:2px;z-index:2;background:color-mix(in srgb,var(--cds-fill-accent,#2a78d6) 40%,transparent);pointer-events:none}.resize-cursor{cursor:col-resize}` +
    EditorHostState6 +
    EditorHostStyles3 +
    `[data-mode=dark] .ProseMirror th,[data-mode=dark] .ProseMirror td{border-color:var(--cds-border)}[data-mode=dark] .ProseMirror th{background:var(--cds-surface-1)}[data-mode=dark] .ldoc-tgrip::after,[data-mode=dark] .ldoc-thandle::after{${EditorHostStyles2}}[data-mode=dark] .ldoc-thandle:is(:hover,.ldoc-tgrip-drag,[aria-expanded=true]){background:${EditorHostMessage3}}[data-mode=dark] .ldoc-tgrip:is(:hover,.ldoc-tgrip-drag,[aria-expanded=true]){background:rgba(250,249,245,.2)}[data-mode=dark] .ProseMirror th.ldoc-ttint-col,[data-mode=dark] .ProseMirror th.ldoc-ttint-row{background:var(--cds-surface-2)}` +
    EditorHostState7 +
    `}`);
  (EditorHostState10 = `@keyframes ldoc-menu-pop{from{opacity:.6}to{opacity:1}}.ldoc-floatmenu{position:fixed;z-index:52;padding:4px;min-width:128px;max-width:320px;background:var(--cds-surface-3,#fff);border-radius:12px;box-shadow:0 0 0 1px var(--cds-alpha-2,rgba(15,12,8,.1)),0 8px 24px rgba(0,0,0,.12),0 2px 6px rgba(0,0,0,.08);user-select:none;animation:ldoc-menu-pop .12s ease-out;transform:none}.ldoc-floatmenu[hidden]{display:none}.ldoc-floatmenu button:is(:hover,:focus-visible){background:var(--cds-fill-ghost-hover,rgba(31,30,29,.05))}.ldoc-floatmenu:focus{outline:0}.ldoc-floatmenu button:not(.swatch):focus{outline:0;box-shadow:none}.ldoc-elmenu{font:14px/20px var(--font-body,ui-sans-serif),system-ui;color:var(--cds-text-primary,#1a1915);max-height:calc(100vh - 16px);overflow-y:auto}.ldoc-elmenu button{display:flex;align-items:center;gap:8px;width:100%;min-height:32px;border:0;background:transparent;color:inherit;font:inherit;padding:6px 10px;border-radius:8px;cursor:pointer;text-align:left}.ldoc-elmenu .div{height:1px;background:var(--cds-alpha-2,rgba(15,12,8,.1));margin:4px 10px}` +
    resolveEditorExtensionsValue8(`.ldoc-elmenu`) +
    `.ldoc-elmenu .gs{display:inline-block;flex:none;width:16px;height:1px}.ldoc-gripmenu{min-width:188px}.ldoc-elmenu .swatches{display:flex;gap:6px;padding:6px 10px}.ldoc-elmenu .swatches .swatch{width:20px;height:20px;min-height:20px;padding:0;border-radius:50%;border:1px solid var(--cds-alpha-2,rgba(15,12,8,.15));flex:0 0 auto}.ldoc-elmenu .swatches .swatch:is(:hover,:focus-visible){transform:scale(1.15);background-clip:padding-box}.ldoc-elmenu .swatches .swatch.none{background:linear-gradient(135deg,transparent 45%,var(--cds-fill-danger,#d33) 45%,var(--cds-fill-danger,#d33) 55%,transparent 55%)}` +
    EditorHostState8 +
    resolveEditorExtensionsValue7(`.ldoc-elmenu button`) +
    `@media (forced-colors:active){.ldoc-floatmenu,.ldoc-floatmenu:focus{outline:1px solid transparent}.ldoc-floatmenu .swatches .swatch{forced-color-adjust:none;border-color:CanvasText}.ldoc-floatmenu .swatches .swatch:focus-visible{outline:2px solid Highlight;outline-offset:2px;box-shadow:none}}` +
    resolveEditorHostValue(`.ldoc-floatmenu button:not(.swatch):focus-visible`));
  (EditorHostState11 = [1, 2, 3, 4, 5, 6]);
  (resolveEditorHostIsInteger = (
    editorHostIsInteger?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorHostIsInteger == `number` &&
    Number.isInteger(editorHostIsInteger) &&
    editorHostIsInteger >= 1 &&
    editorHostIsInteger <= 6
      ? editorHostIsInteger
      : null);
  (EditorHostState12 = [1, 2, 3]);
  (EditorHostOwnLevel = `ownLevel`);
  (EditorHostDataOwnLevel = `data-own-level`);
  (EditorHostFrom = Array.from<Dynamic, Dynamic>(
    {
      length: 11,
    },
    (
      editorHost?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => options + 1,
  ));
  (resolveEditorHostIsInteger2 = (
    editorHostIsInteger2?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorHostIsInteger2 == `number` &&
    Number.isInteger(editorHostIsInteger2) &&
    editorHostIsInteger2 >= 1 &&
    editorHostIsInteger2 <= options
      ? editorHostIsInteger2
      : 0);
  (resolveEditorHostValue4 = (
    editorHostValue4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => resolveEditorHostIsInteger2(editorHostValue4, 11));
  (EditorHostKey = [
    {
      key: `csv`,
      label: `CSV`,
      aliases: [],
      live: `csv`,
    },
    {
      key: `latex`,
      label: `LaTeX`,
      aliases: [`tex`, `katex`],
      slashOnly: [`math`, `formula`, `equation`],
      live: `latex`,
    },
    {
      key: `markdown`,
      label: `Markdown`,
      aliases: [`md`],
      live: `markdown`,
    },
    {
      key: `mermaid`,
      label: `Mermaid`,
      aliases: [`mmd`],
      slashOnly: [`diagram`, `flowchart`, `graph`],
      live: `mermaid`,
    },
    {
      key: `plain`,
      label: `Plain Text`,
      aliases: [`text`, `txt`, `plaintext`, `none`],
    },
    {
      key: `bash`,
      label: `Bash`,
      aliases: [`sh`, `shell`, `zsh`],
    },
    {
      key: `css`,
      label: `CSS`,
      aliases: [],
    },
    {
      key: `html`,
      label: `HTML`,
      aliases: [],
    },
    {
      key: `javascript`,
      label: `JavaScript`,
      aliases: [`js`, `jsx`],
    },
    {
      key: `json`,
      label: `JSON`,
      aliases: [],
    },
    {
      key: `lean`,
      label: `Lean`,
      aliases: [`lean4`],
    },
    {
      key: `python`,
      label: `Python`,
      aliases: [`py`],
    },
    {
      key: `sql`,
      label: `SQL`,
      aliases: [],
    },
    {
      key: `typescript`,
      label: `TypeScript`,
      aliases: [`ts`, `tsx`],
    },
    {
      key: `xml`,
      label: `XML`,
      aliases: [],
    },
    {
      key: `yaml`,
      label: `YAML`,
      aliases: [`yml`],
    },
  ]);
  (EditorHostAliases = ((..._extraArguments: unknown[]): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let event of EditorHostKey as Dynamic) {
      lookup.set(event.key, event);
      for (let editorHostAliasesResult of event.aliases as Dynamic)
        lookup.set(editorHostAliasesResult, event);
    }
    return lookup;
  })());
  (EditorHostState13 = EditorHostKey.map(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => event.key,
  ));
  (editorHostUrlPattern = /^(https?:\/\/|mailto:)/i);
  (EditorHostState14 = null);
  (editorHostSet = new (Set as Dynamic)());
  (resolveEditorHostValue11 = (..._extraArguments: unknown[]) =>
    EditorHostState14 !== null);
  (EditorHostMaster16 = {
    name: `Artifacts`,
    master16: [
      {
        cx: 4.5,
        cy: 10.5,
        r: 2,
      },
      {
        d: `M5.469 8.232C4.986 7.395 4.756 6.373 4.891 5.419C5.026 4.465 5.526 3.58 6.5 3.018C7.474 2.455 8.49 2.465 9.384 2.825C10.277 3.185 11.048 3.895 11.531 4.732L5.469 8.232Z`,
      },
      {
        d: `M13 12.5L10 12.5C9.724 12.5 9.5 12.276 9.5 12L9.5 7C9.5 6.724 9.724 6.5 10 6.5L13 6.5C13.276 6.5 13.5 6.724 13.5 7L13.5 12C13.5 12.276 13.276 12.5 13 12.5Z`,
      },
    ],
    master20: [
      {
        cx: 5.671,
        cy: 13.329,
        r: 3.171,
      },
      {
        d: `M12.029 8.5L16.971 8.5C17.263 8.5 17.5 8.737 17.5 9.029L17.5 15.972C17.5 16.263 17.263 16.5 16.971 16.5L12.029 16.5C11.737 16.5 11.5 16.263 11.5 15.972L11.5 9.029C11.5 8.737 11.737 8.5 12.029 8.5Z`,
      },
      {
        d: `M7.061 10C5.97 7.588 6.69 4.803 8.809 3.583C10.929 2.362 13.699 3.136 15.243 5.294C15.432 5.556 15.326 5.921 15.053 6.077L7.834 10.235C7.659 10.335 7.438 10.34 7.263 10.237C7.18 10.187 7.108 10.11 7.061 10Z`,
      },
    ],
  });
  (EditorHostFreeze = Object.freeze([
    `https://claude.ai`,
    `https://preview.claude.ai`,
    `https://ion-preview.claude.ai`,
    `https://claude-ai.staging.ant.dev`,
  ]));
  (EditorHostLdocArtifactLink = `ldoc-artifact-link`);
  (EditorHostLdocArtifactLinkRaw = `ldoc-artifact-link-raw`);
  (EditorHostLdocArtifactLinkLabel = `ldoc-artifact-link-label`);
  (EditorHostLdocArtifactLinkSelected = `ldoc-artifact-link-selected`);
  (EditorHostLdocArtifactLinkTitled = `ldoc-artifact-link-titled`);
  (EditorHostMessage5 = `, artifact`);
  (resolveEditorHostArtifact = (
    editorHostArtifact?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorHostArtifact === `Artifact`
      ? EditorHostLdocArtifactLink
      : `${EditorHostLdocArtifactLink} ${EditorHostLdocArtifactLinkTitled}`);
  (filterEditorHostJoin = (
    filterEditorHostJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filteredFilterEditorHostJoinPartsText: Dynamic = filterEditorHostJoin2
      .split(`-`)
      .filter(
        (items?: Dynamic, ..._extraArguments: unknown[]) => items.length > 0,
      )
      .join(` `);
    return filteredFilterEditorHostJoinPartsText.length === 0
      ? ``
      : filteredFilterEditorHostJoinPartsText[0].toUpperCase() +
          filteredFilterEditorHostJoinPartsText.slice(1);
  });
  (isEditorHostValue = (
    editorHostValue?: Dynamic,
    options?: unknown,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => !context && typeof options == `string` && options === editorHostValue);
  (editorHostUrlPattern2 = /^https:\/\/[a-z0-9.-]+\/(?:code\/)?artifact\/[A-Za-z0-9-]+(?:\?[A-Za-z0-9_=&-]*)?(?:#[A-Za-z0-9._~-]*)?$/);
  (isEditorHostTest = (
    editorHostTest?: unknown,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !context &&
    typeof editorHostTest == `string` &&
    options === editorHostTest &&
    editorHostUrlPattern2.test(editorHostTest));
  (EditorHostRun = {
    run: `run`,
    table: `table`,
    routine: `routine`,
    file: `file`,
    user: `user`,
    fn: `routine`,
    db: `table`,
  });
  (EditorHostDataLfileEmbedHover = `data-lfile-embed-hover`);
  (EditorHostDataLfileEmbedGrip = `data-lfile-embed-grip`);
  (EditorHostDataLfileEmbedGripNub = `data-lfile-embed-grip-nub`);
  (EditorHostDataLfileEmbedGripDrag = `data-lfile-embed-grip-drag`);
  (EditorHostDataLfileEmbedCaption = `data-lfile-embed-caption`);
  (EditorHostDataLfileWidget = `data-lfile-widget`);
  `${EditorHostDataLfileWidget}`;
  (editorHostValue8000 = 8e3);
  (editorHostValue1300 = 1300);
  (EditorHostMessage6 = `cubic-bezier(0.37,0,0.63,1)`);
  (editorHostValue1450 = 1450);
  (EditorHostToFixed = `${((150 / 2 / editorHostValue1450) * 100).toFixed(3)}%`);
  (EditorHostToFixed2 = `${(100 - (150 / 2 / editorHostValue1450) * 100).toFixed(3)}%`);
  (EditorHostFloor = Math.floor(
    (editorHostValue8000 - 500 - 150) / editorHostValue1450,
  ));
  (EditorHostStyles4 = `content:"Loading…";display:flex;align-items:center;padding:12px 14px;font-family:var(--cds-font-sans,var(--font-body,ui-sans-serif)),system-ui;font-size:var(--cds-font-size-body,14px);line-height:var(--cds-leading-body,20px);`);
  (EditorHostState15 = `@keyframes lfile-wait-in{from{opacity:0}to{opacity:1}}@keyframes lfile-wait-late{to{color:var(--cds-text-muted,#6b6a65)}}@keyframes lfile-wait-sheen{0%,${EditorHostToFixed}{background-position:100% 0;animation-timing-function:${EditorHostMessage6}}${EditorHostToFixed2},100%{background-position:0% 0}}`);
  (resolveEditorHostValue12 = (
    editorHostValue12?: Dynamic,
    options: Dynamic = ``,
    ..._extraArguments: unknown[]
  ) => {
    let label = `var(--lfile-wait-hold,500ms)`;
    let resolveEditorHostValue12Handler = (
      editorHostValue122?: Dynamic,
      ..._extraArguments: unknown[]
    ) => `lfile-wait-in ${editorHostValue122}ms ease-out ${label} backwards`;
    let label2 = `lfile-wait-late 1ms linear ${editorHostValue8000}ms forwards`;
    return `${editorHostValue12}{display:block;box-sizing:border-box;min-height:72px;margin:8px 0;border-radius:4px;pointer-events:none;user-select:none;color:transparent;background-color:var(--cds-skeleton-base,rgb(0 0 0/.05));background-image:linear-gradient(90deg,transparent 33.333%,var(--cds-skeleton-sheen,rgb(0 0 0/.05)) 50%,transparent 66.667%);background-size:300% 100%;background-repeat:no-repeat;background-position:100% 0;animation:${resolveEditorHostValue12Handler(150)},lfile-wait-sheen ${editorHostValue1450}ms linear calc(${label} + 150ms) ${EditorHostFloor},${label2};${options}}@media (prefers-reduced-motion:reduce){${editorHostValue12}{background-image:none;animation:${resolveEditorHostValue12Handler(1)},${label2}}}`;
  });
  (EditorHostLfileEmbedReveal = `lfile-embed-reveal`);
  (editorHostWrapperDockToolbarBarValues = [
    `wrapper`,
    `dock`,
    `toolbar`,
    `bar`,
  ]);
  (resolveEditorHostValue13 = (
    editorHostValue13?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${editorHostValue13}\u0000${options}`);
  (editorHostMap = new (Map as Dynamic)());
  (editorHostMap2 = new (Map as Dynamic)());
  (editorHostMap3 = new (Map as Dynamic)());
  (editorHostSet2 = new (Set as Dynamic)());
  (editorHostSet3 = new (Set as Dynamic)());
  (editorHostSet4 = new (Set as Dynamic)());
  (editorHostValue0 = 0);
  (resolveEditorHostValue14 = (..._extraArguments: unknown[]): undefined => {
    editorHostValue0++;
    for (let resolveEditorHostValue14Result of editorHostSet4 as Dynamic)
      resolveEditorHostValue14Result();
  });
  (editorHostValue250 = 250);
  (editorHostSet5 = new (Set as Dynamic)());
  (EditorHostTell = {
    tell(editorHostTell?: Dynamic, ..._extraArguments: unknown[]): undefined {
      for (let editorHostTellResult of editorHostSet5 as Dynamic)
        editorHostTellResult(editorHostTell);
    },
    subscribe(editorHostTell?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      editorHostSet5.add(editorHostTell);
      return (..._extraArguments: unknown[]): undefined => {
        editorHostSet5.delete(editorHostTell);
      };
    },
  });
  (EditorHostHover = {
    hover(
      editorHostHover?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let editorHostValue13 = resolveEditorHostValue13(context, editorHostHover);
      if (options) {
        let editorHostMapEntry: Dynamic =
          editorHostMap.get(editorHostValue13) ?? 0;
        editorHostMap.set(editorHostValue13, editorHostMapEntry + 1);
        if (editorHostMapEntry === 0) {
          resolveEditorHostValue14();
        }
      } else {
        if (
          (editorHostMap.get(editorHostValue13) ?? 0) -
            (editorHostMap2.get(editorHostValue13) ?? 0) <=
          0
        )
          return;
        editorHostMap2.set(
          editorHostValue13,
          (editorHostMap2.get(editorHostValue13) ?? 0) + 1,
        );
        let editorHostMap3Entry: Dynamic =
          editorHostMap3.get(editorHostValue13) ?? 0;
        setTimeout((..._extraArguments: unknown[]): undefined => {
          if (
            (editorHostMap3.get(editorHostValue13) ?? 0) !== editorHostMap3Entry
          )
            return;
          let difference = (editorHostMap2.get(editorHostValue13) ?? 1) - 1;
          if (difference <= 0) {
            editorHostMap2.delete(editorHostValue13);
          } else {
            editorHostMap2.set(editorHostValue13, difference);
          }
          let difference2 = (editorHostMap.get(editorHostValue13) ?? 0) - 1;
          if (difference2 <= 0) {
            if (editorHostMap.delete(editorHostValue13)) {
              resolveEditorHostValue14();
            }
          } else {
            editorHostMap.set(editorHostValue13, difference2);
          }
        }, editorHostValue250);
      }
    },
    select(
      editorHostHover?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (options !== editorHostSet2.has(editorHostHover)) {
        if (options) {
          editorHostSet2.add(editorHostHover);
        } else {
          editorHostSet2.delete(editorHostHover);
        }
        resolveEditorHostValue14();
      }
    },
    focus(
      editorHostHover?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (options !== editorHostSet3.has(editorHostHover)) {
        if (options) {
          editorHostSet3.add(editorHostHover);
        } else {
          editorHostSet3.delete(editorHostHover);
        }
        resolveEditorHostValue14();
      }
    },
    clear(editorHostHover?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let options = false;
      for (let editorHostHoverResult of editorHostWrapperDockToolbarBarValues as Dynamic) {
        let editorHostValue13 = resolveEditorHostValue13(
          editorHostHoverResult,
          editorHostHover,
        );
        editorHostMap3.set(
          editorHostValue13,
          (editorHostMap3.get(editorHostValue13) ?? 0) + 1,
        );
        editorHostMap2.delete(editorHostValue13);
        if (editorHostMap.delete(editorHostValue13)) {
          options = true;
        }
      }
      if (editorHostSet2.delete(editorHostHover)) {
        options = true;
      }
      if (editorHostSet3.delete(editorHostHover)) {
        options = true;
      }
      if (options) {
        resolveEditorHostValue14();
      }
    },
    revealed(editorHostHover?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return (
        editorHostWrapperDockToolbarBarValues.some(
          (
            editorHostWrapperDockToolbarBarValue?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            (editorHostMap.get(
              resolveEditorHostValue13(
                editorHostWrapperDockToolbarBarValue,
                editorHostHover,
              ),
            ) ?? 0) > 0,
        ) ||
        editorHostSet2.has(editorHostHover) ||
        editorHostSet3.has(editorHostHover)
      );
    },
    snapshot(..._extraArguments: unknown[]) {
      return editorHostValue0;
    },
    subscribe(editorHostHover?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      editorHostSet4.add(editorHostHover);
      return (..._extraArguments: unknown[]): undefined => {
        editorHostSet4.delete(editorHostHover);
      };
    },
  });
  (EditorHostQuote = {
    quote: `q`,
    cell: `cell`,
    element: `el`,
  });
  (editorHostPattern = /^[A-Za-z]{1,3}[1-9][0-9]*(?::[A-Za-z]{1,3}[1-9][0-9]*)?$/);
  (editorHostPattern2 = /^[A-Za-z_][A-Za-z0-9_]*$/);
  (EditorHostKind = lazyZod.union([
    lazyZod.object({
      kind: lazyZod.literal(`user`),
      id: lazyZod.string(),
    }),
    lazyZod.object({
      kind: lazyZod.literal(`claude`),
      turn: lazyZod.string(),
    }),
  ]));
  (EditorHostStaged = lazyZod.enum([
    `staged`,
    `queued`,
    `running`,
    `done`,
    `error`,
    `dismissed`,
    `cancelled`,
    `reverted`,
  ]));
  (EditorHostRecord = lazyZod.record(
    lazyZod.string(),
    lazyZod.unknown(),
  ));
  (EditorHostActor = lazyZod.object({
    id: lazyZod.string(),
    at: lazyZod.union([lazyZod.string(), lazyZod.date()]),
    actor: lazyZod.union([lazyZod.string(), EditorHostKind]),
    tool: lazyZod.string(),
    target: lazyZod.string(),
    params: lazyZod.unknown().optional(),
    mutation: lazyZod.unknown().optional(),
    status: EditorHostStaged.optional(),
    result: lazyZod.unknown().optional(),
    meta: EditorHostRecord.optional(),
  }));
  (EditorHostRegex = lazyZod
    .string()
    .regex(
      PlatformSessionAndSourcesState7,
      `ln- + 1–9 chars from [0-9A-Za-z-], first and last alphanumeric`,
    ));
  lazyZod.string().regex(platformSessionAndSourcesPattern10, `f-<uuid7>`);
  (EditorHostPositive = lazyZod.number().int().positive());
  (EditorHostRegex2 = lazyZod.string().regex(/^[0-9a-f]{6,40}$/));
  (EditorHostState16 = lazyZod.string().min(1));
  (EditorHostUnparseableRef = lazyZod
    .string()
    .min(1)
    .refine(
      (
        editorHostUnparseableRef?: Dynamic,
        ..._extraArguments: unknown[]
      ): boolean => resolveEditorHostError(editorHostUnparseableRef).ok,
      `unparseable ref`,
    ));
  (EditorHostText = lazyZod.lazy(
    (..._extraArguments: unknown[]): Dynamic =>
      lazyZod.object({
        type: lazyZod.string(),
        attrs: lazyZod.record(lazyZod.string(), lazyZod.unknown()).optional(),
        content: lazyZod.array(EditorHostText).optional(),
        marks: lazyZod
          .array(
            lazyZod.object({
              type: lazyZod.string(),
              attrs: lazyZod
                .record(lazyZod.string(), lazyZod.unknown())
                .optional(),
            }),
          )
          .optional(),
        text: lazyZod.string().optional(),
      }),
  ));
  (EditorHostRefine = EditorHostText.refine(
    (editorHostRefine?: Dynamic, ..._extraArguments: unknown[]) =>
      editorHostRefine.type === `doc`,
    `PM root must be type "doc"`,
  ));
  (EditorHostJson = lazyZod.object({
    type: lazyZod.literal(`prose`),
    json: EditorHostRefine,
  }));
  (EditorHostBody = lazyZod.object({
    type: lazyZod.literal(`document`),
    body: EditorHostRegex,
  }));
  (EditorHostAspectRatio = lazyZod.object({
    type: lazyZod.literal(`deck`),
    aspectRatio: lazyZod.enum([`16/9`, `4/3`]),
  }));
  (EditorHostOrder = lazyZod.object({
    type: lazyZod.literal(`slide`),
    order: EditorHostState16,
    background: lazyZod.string().optional(),
    notesId: EditorHostRegex.optional(),
  }));
  (EditorHostSlide = lazyZod.object({
    type: lazyZod.literal(`placement`),
    slide: EditorHostRegex,
    child: EditorHostRegex,
    x: lazyZod.number(),
    y: lazyZod.number(),
    width: lazyZod.number(),
    height: lazyZod.number(),
    z: EditorHostState16,
  }));
  (EditorHostState17 = 256 * 1024);
  (EditorHostRegex3 = lazyZod
    .string()
    .regex(/^[\w.+-]+\/[\w.+-]+$/)
    .max(255));
  (EditorHostCeil = Math.ceil((EditorHostState17 * 4) / 3) + 2048);
  (editorHostPattern3 = /^blob\/[A-Za-z0-9_-]{1,64}$/);
  (EditorHostKind2 = lazyZod.discriminatedUnion(`kind`, [
    lazyZod.object({
      kind: lazyZod.literal(`blob`),
      sha: lazyZod.string().regex(/^[0-9a-f]{64}$/),
      size: lazyZod.number().int().nonnegative(),
      mime: EditorHostRegex3,
    }),
    lazyZod.object({
      kind: lazyZod.literal(`data`),
      url: lazyZod
        .string()
        .max(EditorHostCeil)
        .regex(/^data:/i, `media data src must be a data: URL`),
    }),
  ]));
  (EditorHostState18 = 1024 * 1024);
  (EditorHostState19 = lazyZod
    .string()
    .max(EditorHostState18, `code exceeds ${EditorHostState18} bytes`));
  (EditorHostCode = lazyZod.object({
    type: lazyZod.literal(`widget`),
    code: lazyZod.literal(``),
  }));
  (EditorHostCode2 = lazyZod.object({
    type: lazyZod.literal(`widget`),
    code: EditorHostState19,
    draft: lazyZod
      .object({
        code: EditorHostState19.nullable(),
        baseV: lazyZod.object({
          code: lazyZod.string().nullable(),
        }),
      })
      .optional(),
  }));
  (EditorHostStyles5 = `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`);
  (EditorHostAfter = lazyZod.union([
    lazyZod.object({
      after: EditorHostRegex,
    }),
    lazyZod.object({
      before: EditorHostRegex,
    }),
    lazyZod.object({
      between: lazyZod.tuple([EditorHostRegex, EditorHostRegex]),
    }),
    lazyZod.literal(`end`),
  ]));
  (EditorHostProse = {
    prose: EditorHostJson,
    document: EditorHostBody,
    deck: EditorHostAspectRatio,
    slide: EditorHostOrder,
    placement: EditorHostSlide,
    widget: EditorHostCode2,
  });
  (EditorHostWidget = {
    ...EditorHostProse,
    widget: EditorHostCode,
  });
  lazyZod.enum([`16/9`, `4/3`]);
  lazyZod.union([EditorHostState16, EditorHostAfter]);
  lazyZod.string();
  lazyZod.number();
  lazyZod.number();
  lazyZod.number();
  lazyZod.number();
  lazyZod.union([EditorHostState16, EditorHostAfter]);
  (EditorHostCode3 = lazyZod
    .custom((..._extraArguments: unknown[]) => true)
    .superRefine(
      (
        editorHostCode3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          typeof editorHostCode3 != `object` ||
          !editorHostCode3 ||
          typeof editorHostCode3.type != `string`
        ) {
          options.addIssue({
            code: `custom`,
            message: "node must be an object with a string `type`",
          });
          return;
        }
        let type: Dynamic = editorHostCode3.type;
        if (!resolveEditorHostHasOwn(type)) {
          options.addIssue({
            code: `custom`,
            message:
              `unknown node type "${type}" — v3 documents admit only: ` +
              Object.keys(EditorHostProse).join(`, `),
            path: [`type`],
          });
          return;
        }
        let safeParse: Dynamic = EditorHostProse[type].safeParse(editorHostCode3);
        if (!safeParse.success)
          for (let error of safeParse.error.issues as Dynamic)
            options.addIssue({
              code: `custom`,
              message: error.message,
              path: error.path,
            });
      },
    ));
  lazyZod.union(Object.values(EditorHostWidget));
  lazyZod
    .object({
      version: EditorHostPositive,
      sha: EditorHostRegex2,
      root: EditorHostRegex,
      nodes: lazyZod.record(EditorHostRegex, EditorHostCode3),
      styleSheet: lazyZod.string().optional(),
    })
    .extend({
      nodes: lazyZod.record(EditorHostRegex, lazyZod.unknown()),
    });
  (EditorHostKind3 = lazyZod.object({
    kind: lazyZod.literal(`quote`),
    exact: lazyZod.string().min(1),
    prefix: lazyZod.string().optional(),
    suffix: lazyZod.string().optional(),
    line: lazyZod.number().int().optional(),
  }));
  (EditorHostKind4 = lazyZod.object({
    kind: lazyZod.literal(`cell`),
    row: lazyZod.number().int().nonnegative(),
    col: lazyZod.number().int().nonnegative(),
    table: lazyZod.number().int().nonnegative().optional(),
    toRow: lazyZod.number().int().nonnegative().optional(),
    toCol: lazyZod.number().int().nonnegative().optional(),
  }));
  (EditorHostKind5 = lazyZod.object({
    kind: lazyZod.literal(`element`),
    dataClaudeId: lazyZod.string().optional(),
    path: lazyZod.string().optional(),
  }));
  (EditorHostKind6 = lazyZod.object({
    kind: lazyZod.literal(`childSet`),
    ids: lazyZod.array(EditorHostRegex).min(1),
  }));
  lazyZod.object({
    nodeId: EditorHostRegex,
    selector: lazyZod
      .discriminatedUnion(`kind`, [
        EditorHostKind3,
        EditorHostKind4,
        EditorHostKind5,
        EditorHostKind6,
      ])
      .optional(),
  });
  EditorHostActor.extend({
    target: EditorHostUnparseableRef,
  });
  lazyZod.object({
    actor: EditorHostKind,
    kind: lazyZod.enum([`editing`, `dragging`, `resizing`]),
    nodeId: EditorHostRegex,
    at: lazyZod.string().optional(),
  });
  (EditorHostState20 = {
    "&": `&amp;`,
    "<": `&lt;`,
    ">": `&gt;`,
    '"': `&quot;`,
    "'": `&#39;`,
  });
  (escapeHtml = (
    escapeHtml2?: Dynamic,
    ..._extraArguments: unknown[]
  ): string =>
    String(escapeHtml2 ?? ``).replace(
      /[&<>"']/g,
      (escapeHtml3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        EditorHostState20[escapeHtml3],
    ));
  (resolveEditorHostValue16 = (
    editorHostValue162?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `color-mix(in srgb,var(--cds-gray-450,#87867f) ${editorHostValue162}%,transparent)`);
  (EditorHostMessage7 = `var(--cds-border-editor-comment-target,#a66a00)`);
  (EditorHostRest = {
    rest: 20,
    open: 66,
    openDark: 45,
  });
  (resolveEditorHostValue17 = (
    editorHostValue17?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `color-mix(in srgb,var(--cds-fill-warning,#fab219) ${editorHostValue17},transparent)`);
  (EditorHostRest2 = {
    rest: `var(--cds-bg-editor-comment,${resolveEditorHostValue17(`${EditorHostRest.rest}%`)})`,
    on: `var(--cds-bg-editor-comment-active,${resolveEditorHostValue17(`var(--lfile-comment-open-pct,${EditorHostRest.open}%)`)})`,
    res: resolveEditorHostValue16(18),
    resOn: resolveEditorHostValue16(32),
  });
  (EditorHostMessage8 = `var(--cds-dur-base,200ms) var(--cds-ease-out,cubic-bezier(.165,.84,.44,1))`);
  (EditorHostMessage9 = `var(--cds-border-editor-comment,#b77700)`);
  (EditorHostRest3 = {
    rest: EditorHostMessage9,
    soft: `color-mix(in srgb,${EditorHostMessage9} 40%,transparent)`,
  });
  (EditorHostDataLfileDatumThreads = `data-lfile-datum-threads`);
  (EditorHostDataLfileDatumDraft = `data-lfile-datum-draft`);
  (EditorHostState21 = `a:has(.${EditorHostLdocArtifactLink})`);
  (EditorHostState22 = `a:has(.${EditorHostLdocArtifactLinkRaw})`);
  (EditorHostRest4 = `${EditorHostState21}{display:inline-block;box-sizing:border-box;max-width:100%;padding-block:1px;padding-inline:6px 0;font-family:var(--font-body,var(--cds-font-sans,ui-sans-serif)),system-ui;font-size:var(--cds-font-size-footnote,13px);line-height:1.5;white-space:pre;text-overflow:ellipsis;overflow-x:hidden;overflow-x:clip;overflow-y:visible;vertical-align:baseline;border-radius:999px;--ldoc-artifact-fill:var(--cds-neutral-50,#f5f4ed);background:var(--ldoc-artifact-fill);color:var(--cds-text-primary,#1f1e1d);font-weight:500;text-decoration:none;transition:background-color .12s;--ldoc-artifact-icon:${resolveEditorAnchorsAndMentionsValue2(EditorHostMaster16, 13, `#000`)}}:is([data-lfile-doc] .ProseMirror,html) ${EditorHostState21}:is(a,:hover){color:var(--cds-text-primary,#1f1e1d);text-decoration:none}${EditorHostState21}::before{content:"\\200B";display:inline-block;width:1em;height:1em;margin-inline-end:.3em;vertical-align:-.15em;background:currentColor;-webkit-mask:var(--ldoc-artifact-icon) center/1em 1em no-repeat;mask:var(--ldoc-artifact-icon) center/1em 1em no-repeat}a:has(.${EditorHostLdocArtifactLinkTitled})::after{content:"${EditorHostMessage5}";${PlatformAnnouncementsState2}}${EditorHostState21}>:last-child{padding-inline-end:8px}${EditorHostState21}:hover{background:var(--cds-neutral-100,#e1e0d9)}[data-mode=dark] ${EditorHostState21}{--ldoc-artifact-fill:var(--cds-fill-control,rgba(255,255,255,.1));background:var(--ldoc-artifact-fill)}[data-mode=dark] ${EditorHostState21}:hover{background:var(--cds-fill-control-hover,rgba(255,255,255,.2))}.ProseMirror :is(h1,h2,h3,h4,h5,h6) ${EditorHostState21}{font-size:.8125em;line-height:1.3;padding-block:0;padding-inline-start:.46em}.ProseMirror :is(h1,h2,h3,h4,h5,h6) ${EditorHostState21}>:last-child{padding-inline-end:.615em}.${EditorHostLdocArtifactLinkRaw}{font-size:0}.ldoc-artifact-caret-stop{user-select:none;-webkit-user-select:none}${EditorHostState22}{white-space:nowrap}${EditorHostState22}::before{display:inline-block;width:0;height:1em;margin:0;background:none;-webkit-mask:none;mask:none;vertical-align:-.15em}${EditorHostState22} .${EditorHostLdocArtifactLinkLabel}::before{content:"\\200B";display:inline-block;width:1em;height:1em;margin-inline-end:.3em;vertical-align:-.15em;background:currentColor;-webkit-mask:var(--ldoc-artifact-icon) center/1em 1em no-repeat;mask:var(--ldoc-artifact-icon) center/1em 1em no-repeat}${EditorHostState22}>:last-child{padding-inline-end:0}${EditorHostState22} .${EditorHostLdocArtifactLinkLabel}{padding-inline-end:8px;white-space:nowrap;pointer-events:none;user-select:none;-webkit-user-select:none}.ProseMirror :is(h1,h2,h3,h4,h5,h6) ${EditorHostState22} .${EditorHostLdocArtifactLinkLabel}{padding-inline-end:.615em}@media not print{:is([data-lfile-doc] .ProseMirror,html) ${EditorHostState22}:has(.lfile-comment-anchor):not(:has(.${EditorHostLdocArtifactLinkSelected})):is(a,:hover){background:${EditorHostRest2.rest}}}:is([data-lfile-doc] .ProseMirror,html) ${EditorHostState22}:has(.${EditorHostLdocArtifactLinkSelected}):is(a,:hover){background:var(--cds-bg-accent,#cde2fb);color:var(--cds-text-accent,#184f95)}[data-mode=dark] :is([data-lfile-doc] .ProseMirror,html) ${EditorHostState22}:has(.${EditorHostLdocArtifactLinkSelected}):is(a,:hover){background:var(--cds-bg-accent,#032042);color:var(--cds-text-accent,#6da7ec)}`);
  (EditorHostRest5 = `.misspelled{--spell-squiggle:var(--cds-text-danger,#c65949);text-decoration:underline wavy var(--spell-squiggle);text-decoration-thickness:1px;text-underline-offset:2px}@supports (color:color-mix(in srgb,red 1%,transparent)){.misspelled{text-decoration-color:color-mix(in srgb,var(--spell-squiggle) 60%,transparent)}}.proofread{text-decoration:underline wavy var(--cds-text-info,#4a7ab5);text-decoration-thickness:1px;text-underline-offset:2px}.proofread-fixed{background-image:linear-gradient(var(--cds-text-info,#4a7ab5),var(--cds-text-info,#4a7ab5));background-repeat:no-repeat;background-size:100% 1.5px;background-position:0% 100%}.proofread-fixed-in{animation:pfFixIn .3s ease both}@keyframes pfFixIn{from{background-size:0% 1.5px}to{background-size:100% 1.5px}}.proofread-fixed-out{background-position:100% 100%;animation:pfFixOut .35s ease both}@keyframes pfFixOut{from{background-size:100% 1.5px}to{background-size:0% 1.5px}}@media (prefers-reduced-motion:reduce){.proofread-fixed-in{animation:none}.proofread-fixed-out{animation:none;background-size:0% 1.5px}}.autocorrected{text-decoration-line:underline;text-decoration-style:dashed;text-decoration-thickness:1px;text-underline-offset:3px;text-decoration-color:var(--cds-text-muted,#898781);transition:text-decoration-color .35s ease}.autocorrected-in{text-decoration-color:transparent}.autocorrected-out{text-decoration-color:transparent}@media (prefers-reduced-motion:reduce){.autocorrected{transition:none}}[data-suggestion-kind=delete]{text-decoration:line-through;opacity:.6}[data-suggestion-kind=insert]{background-color:color-mix(in srgb,var(--moss,#788c5d) 18%,transparent)}.t0-math{text-align:center;padding:var(--cds-space-sm,8px) 0}.t0-md{padding:var(--cds-space-xs,4px) 0}.t0-md :is(h1,h2,h3,h4,h5,h6){margin:.5em 0 .25em;line-height:1.25}.t0-md :is(h5,h6){font-size:1em}.t0-md p{margin:.25em 0}.t0-md .cw-md-task input[type=checkbox]{margin-right:6px;vertical-align:baseline}.t0-md table{border-collapse:collapse;margin:.4em 0}.t0-md :is(th,td){border:1px solid var(--cds-border,#d8d5cc);padding:3px 8px;text-align:left}.t0-md th{background:var(--cds-surface-2,#f2f0ea);font-weight:600}.lfile-comment-anchor{background:${EditorHostRest2.rest}}@media (prefers-reduced-motion:no-preference){.lfile-comment-anchor{transition:background-color ${EditorHostMessage8}}.lfile-comment-anchor.autocorrected{transition:background-color ${EditorHostMessage8},text-decoration-color .35s ease}}.lfile-comment-anchor>img{outline:2px solid ${EditorHostRest3.rest};outline-offset:-2px}span.lfile-comment-anchor .lfile-pm-media{outline:2px solid ${EditorHostRest3.rest};outline-offset:3px;border-radius:4px}.lfile-comment-anchor.lfile-commented-table[data-comment-id]{background:transparent;animation:none;text-decoration:none}.lfile-commented-table>table{outline:2px solid ${EditorHostRest3.rest};outline-offset:0}.ldoc-mention{display:inline-flex;align-items:center;box-sizing:border-box;max-width:100%;padding:0 8px;font-family:var(--font-body,var(--cds-font-sans,ui-sans-serif)),system-ui;font-size:var(--cds-font-size-footnote,13px);line-height:1.5;white-space:nowrap;overflow:clip;vertical-align:baseline;border-radius:999px;background:var(--cds-neutral-50,#f5f4ed);color:var(--cds-text-primary,#1f1e1d);font-weight:500;transition:background-color .12s}.ldoc-mention::before{content:"\\200B";width:0;flex:none}.ldoc-mention .t{min-width:0;overflow:hidden;text-overflow:ellipsis}.ProseMirror span.ldoc-mention{white-space:nowrap}.ProseMirror[contenteditable=true] span.ldoc-mention{cursor:pointer}.ldoc-mention:hover{background:var(--cds-neutral-100,#e1e0d9)}.ldoc-mention[data-unnamed]{color:var(--cds-text-secondary,#6b6a68);font-weight:400}.ProseMirror[contenteditable=true] span.ldoc-mention[data-principal="claude"]{cursor:default}a[href^="claude:"]{padding:0 3px;border-radius:3px;font-weight:500;background:color-mix(in oklch,var(--cds-blue-450,#6a9bcc) 14%,transparent)}a[data-ref-chip]{display:inline-block;padding:1px 7px;font-size:var(--cds-font-size-footnote,13px);line-height:1.5;vertical-align:baseline;border-radius:999px;background:var(--cds-neutral-50,#f5f4ed);color:var(--cds-text-primary,#1f1e1d);font-weight:500;text-decoration:none;font-family:var(--font-body,var(--cds-font-sans,ui-sans-serif)),system-ui;transition:background-color .12s}a[data-ref-chip]:hover{background:var(--cds-neutral-100,#e1e0d9)}[data-mode=dark] .ldoc-mention,[data-mode=dark] a[data-ref-chip]{background:var(--cds-fill-control,rgba(255,255,255,.1))}[data-mode=dark] .ldoc-mention:hover,[data-mode=dark] a[data-ref-chip]:hover{background:var(--cds-fill-control-hover,rgba(255,255,255,.2))}.ProseMirror :is(h1,h2,h3,h4,h5,h6) .ldoc-mention{font-size:.8125em;line-height:1.3;padding:0 .615em}.ProseMirror :is(h1,h2,h3,h4,h5,h6) a[data-ref-chip]{font-size:.8125em;line-height:1.3;padding:0 .54em}` +
    EditorHostRest4 +
    `[data-lfile-embed]{position:relative}.lfile-embed-anchor{position:absolute;inset:0;pointer-events:none;border-radius:4px;box-shadow:inset 0 0 0 2px ${EditorHostRest3.rest}}.lfile-embed-anchor.is-resolved{box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cds-gray-450,#87867f) 45%,transparent)}.lfile-embed-anchor.is-active.is-resolved{box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cds-gray-450,#87867f) 80%,transparent)}.lfile-embed-anchor.is-muted{box-shadow:none}[data-mode=dark]{--lfile-anchor-gold:var(--cds-yellow-600);--lfile-comment-open-pct:${EditorHostRest.openDark}%;--lfile-comment-open-line:#fab219}`);
  EditorHostFade.fade + EditorHostFade.exit;
  (editorHostValue100 = 100);
  (editorHostValue65534 = 65534);
  (editorHostValue5000 = 5e3);
  (editorHostPattern4 = /^#[0-9a-fA-F]{6}$/);
  (resolveEditorHostLink = (
    editorHostLink?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (editorHostLink?.marks ?? []).find(
      (mark?: Dynamic, ..._extraArguments: unknown[]) => mark.type === `link`,
    )?.attrs?.href);
  (EditorHostRenderStatic = {
    document: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorHostRenderStatic.type === `document`
          ? `<article data-lfile-doc>${options.renderChild(editorHostRenderStatic.body)}</article>`
          : ``,
    },
    prose: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorHostRenderStatic.type === `prose`
          ? resolveEditorHostCols(editorHostRenderStatic.json, options)
          : ``,
    },
    deck: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorHostRenderStatic.type === `deck`
          ? `<div data-lfile-deck data-aspect="${escapeHtml(editorHostRenderStatic.aspectRatio)}">${options.slides.map((slide?: Dynamic, ..._extraArguments: unknown[]): Dynamic => options.renderChild(slide)).join(``)}</div>`
          : ``,
    },
    slide: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (editorHostRenderStatic.type !== `slide`) return ``;
        let options2: Dynamic = options;
        let mappedPlacementsBySlideEntryText: Dynamic = (
          options2.placementsBySlide.get(options2.currentId) ?? []
        )
          .map(
            (
              placementsBySlideEntry?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => options.renderChild(placementsBySlideEntry),
          )
          .join(``);
        return `<section data-lfile-slide style="background:${resolveEditorHostTrim2(editorHostRenderStatic.background)}">${mappedPlacementsBySlideEntryText}</section>`;
      },
    },
    placement: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorHostRenderStatic.type === `placement`
          ? `<div data-lfile-placement style="left:${resolveEditorHostIsFinite(editorHostRenderStatic.x)}px;top:${resolveEditorHostIsFinite(editorHostRenderStatic.y)}px;width:${resolveEditorHostIsFinite(editorHostRenderStatic.width)}px;height:${resolveEditorHostIsFinite(editorHostRenderStatic.height)}px">${options.renderChild(editorHostRenderStatic.child)}</div>`
          : ``,
    },
    widget: {
      render_static: (
        editorHostRenderStatic?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        editorHostRenderStatic.type === `widget`
          ? `<div data-lfile-widget-static>${editorHostRenderStatic.code ? `[widget — open the document to run it]` : `[widget]`}</div>`
          : ``,
    },
  });
  (EditorHostRenderStatic2 = {
    render_static: (..._extraArguments: unknown[]) => ``,
  });
  (editorHostMap4 = new (Map as Dynamic)(
    Object.entries(EditorHostRenderStatic),
  ));
  (EditorHostStyles6 = `@page{margin:18mm 16mm 20mm 16mm}`);
  (EditorHostDataPrintKeep = `data-print-keep`);
  (EditorHostStyles7 = `[data-lfile-doc]`);
  (EditorHostState23 = `${EditorHostStyles7} .ProseMirror`);
  (EditorHostState24 = `html,body{background:#fff!important;overflow:visible!important;height:auto!important}html{padding:0!important}html.lfile-rail{--rail:0px!important}body>:not(${EditorHostStyles7}){display:none!important}${EditorHostStyles7}{margin:0!important;padding:0!important;max-width:none!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}${EditorHostStyles7}{--edge-d:0px!important}${EditorHostState23}[contenteditable]{min-height:0!important}${EditorHostState23}{orphans:3;widows:3}${EditorHostState23}{overflow-wrap:break-word!important}${EditorHostState23} :is(h1,h2,h3){font-feature-settings:"liga" 0!important}${EditorHostState23} :is(h1,h2,h3,h4,h5,h6){break-after:avoid;page-break-after:avoid;break-inside:avoid}${EditorHostState23} :is(tr,th,td,img,svg,video,figure,span.lfile-pm-media,div[data-lfile-embed],blockquote,[${EditorHostDataPrintKeep}]){break-inside:avoid;page-break-inside:avoid}${EditorHostState23} thead{display:table-header-group}${EditorHostState23} pre{orphans:4;widows:4;white-space:pre-wrap!important;overflow-wrap:anywhere;overflow:visible!important}${EditorHostState23} .tableWrapper{overflow:visible!important}${EditorHostState23} table{max-width:100%!important;min-width:0!important}${EditorHostState23} .tableWrapper::before{flex-shrink:1!important}${EditorHostState23} :is(td,th) p{overflow-wrap:break-word!important;word-break:normal!important}${EditorHostState23} table:has(tr:first-child>:nth-child(6)){font-size:.82em!important}${EditorHostState23} table:has(tr:first-child>:nth-child(6)) :is(td,th){padding:4px 6px!important}${EditorHostState23} a[href]{text-decoration:underline!important;text-decoration-thickness:.05em;text-underline-offset:.15em}${EditorHostState23} .ldoc-artifact-link-raw{font-size:inherit!important}${EditorHostState23} :is(.ldoc-artifact-link-label,.ldoc-artifact-caret-stop){display:none!important}${EditorHostState23} a:has(.ldoc-artifact-link){display:inline!important;max-width:none!important;padding:0!important;border-radius:0!important;white-space:inherit!important;overflow-x:visible!important;overflow-y:visible!important;background:none!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;color:var(--cds-blue-500,#256abf)!important}${EditorHostState23} a:has(.ldoc-artifact-link)::before{content:none!important}${EditorHostState23} a:has(.ldoc-artifact-link)>:last-child{padding-inline-end:0!important}${EditorHostState23} :is(.ProseMirror-yjs-cursor,.op-peer-caret,.op-peer-caret-label,.op-peer-flag,.ProseMirror-gapcursor,.lfile-ghost-caret,.lfile-dropcursor,.lfile-pending,.lfile-pending-box,.lfile-pending-box-line,.lfile-video-start,.lfile-video-bar,.prosemirror-dropcursor-block,.column-resize-handle),${EditorHostStyles7} :is(.ldoc-thandle,.ldoc-tgrip,.ldoc-tadd,.ldoc-tdrop,.ldoc-tdim,.ldoc-floatmenu,.ldoc-elmenu,.ldoc-gripmenu,[${EditorHostDataLfileEmbedGrip}],.cw-head,.cw-pick,.cw-srcbtn,.ldoc-more,.ldoc-callout-x),${EditorHostState23} :is(.op-kept-hint,.lfile-widget-fresh-hint,.lfile-ask-ghost),${EditorHostStyles7} :is(.lfile-widget-stalerow,.lfile-widget-pstrip,[data-lfile-widget-origin]),${EditorHostState23} [data-suggestion-kind=insert]{display:none!important}${EditorHostState23} [data-suggestion-kind=delete]{text-decoration:none!important;opacity:1!important}${EditorHostState23} .is-empty::before,${EditorHostStyles7}>.ProseMirror>:is(h1,p).is-empty:only-child::after,${EditorHostState23} :is(.op-peer-cell,.op-peer-block)::before,[${EditorHostDataLfileWidget}]::before{content:none!important}${EditorHostState23} :is(.op-peer-selection,.ProseMirror-yjs-selection){background:transparent!important;background-image:none!important}${EditorHostState23} .selectedCell::after{display:none!important}${EditorHostState23} span.lfile-pm-media.lfile-media-arriving{background-color:transparent!important}${EditorHostState23} span.lfile-pm-media.lfile-media-arriving::before{display:none!important}${EditorHostStyles7} .lfile-comment-anchor{background:transparent!important;animation:none!important}${EditorHostStyles7} .lfile-comment-anchor>img,${EditorHostStyles7} .lfile-comment-anchor .lfile-pm-media,${EditorHostStyles7} .lfile-commented-table>table,${EditorHostState23} .ProseMirror-selectednode,${EditorHostStyles7} [${EditorHostDataLfileWidget}],${EditorHostStyles7} [${EditorHostDataLfileWidget}] :is([data-widget-comment-target],[data-place-target],[data-place-hover],[data-comment-id],[data-lfile-datum-threads],[data-lfile-datum-draft]){outline:none!important;box-shadow:none!important}${EditorHostStyles7} div[data-lfile-embed],${EditorHostState23} .ldoc-chip,${EditorHostState23} .ldoc-mention{box-shadow:none!important}${EditorHostStyles7} [${EditorHostDataLfileWidget}][data-widget-draft]{background:transparent!important}${EditorHostState23} :is(.misspelled,.proofread){text-decoration:none!important}${EditorHostState23} .proofread-fixed{background-image:none!important}${EditorHostState23} :is(.ldoc-agent-word,.ldoc-agent-block,.ldoc-agent-atom),${EditorHostState23} tr.ldoc-agent-block>:is(td,th){animation:none!important;opacity:1!important}${EditorHostState23} ul[data-kind=check]>li>label.ldoc-check>input{opacity:1!important}${EditorHostStyles7} :is(iframe,video,audio){border:0}${EditorHostStyles7} video::-webkit-media-controls{display:none!important}`);
  EditorHostStyles6 + EditorHostState24;
  (EditorHostState25 = `${EditorHostStyles6}@media print{${EditorHostState24}}`);
  (EditorHostDataLfileInSelection = `data-lfile-in-selection`);
  (EditorHostStyles8 = `.ldoc-chip[data-chip]`);
  (EditorHostState26 = [EditorHostStyles8, `.ldoc-mention`]);
  (EditorHostState27 = `[${EditorHostDataLfileInSelection}]`);
  (EditorHostJoin2 = `:is(${EditorHostState26.flatMap((EditorHostState262?: Dynamic, ..._extraArguments: unknown[]) => [`${EditorHostState262}${EditorHostState27}`, `${EditorHostState27} ${EditorHostState262}`]).join(`,`)})`);
  (EditorHostState28 = `:is(${EditorHostStyles8}${EditorHostState27},${EditorHostState27} ${EditorHostStyles8}) .i`);
  (EditorHostStyles9 = `:is(html:not([data-lfile-composing]),.ProseMirror-focused)`);
  (EditorHostStyles10 = `:is(html[data-mode=dark]:not([data-lfile-composing]),[data-mode=dark] .ProseMirror-focused)`);
  (EditorHostStyles11 = `[data-lfile-composing] [data-lfile-doc] .ProseMirror:not(.ProseMirror-focused)`);
  (resolveEditorHostValue18 = (
    editorHostValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `{background-image:linear-gradient(${editorHostValue18},${editorHostValue18})}`);
  (EditorHostRest6 = `@media not print{${EditorHostStyles9} ${EditorHostJoin2}${resolveEditorHostValue18(`var(--cds-bg-accent,#cde2fb)`)}${EditorHostStyles10} ${EditorHostJoin2}${resolveEditorHostValue18(`var(--cds-bg-accent,#032042)`)}${EditorHostStyles9} ${EditorHostState28}{color:var(--cds-text-accent,#184f95)}${EditorHostStyles10} ${EditorHostState28}{color:var(--cds-text-accent,#6da7ec)}${EditorHostStyles11} ${EditorHostJoin2}{background:${EditorHostRest2.rest}}${[EditorHostStyles9, EditorHostStyles11].flatMap((item?: Dynamic, ..._extraArguments: unknown[]) => [`${item} ${EditorHostJoin2}::selection`, `${item} ${EditorHostJoin2} ::selection`]).join(`,`)}{background-color:transparent}}`);
  (EditorHostMessage10 = `"Anthropic Mono",ui-monospace,SF Mono,Menlo,monospace`);
  (EditorHostState29 = `
.ProseMirror pre{background:#f8f8f6;border-radius:6px;padding:.75rem .9rem;overflow-x:auto;font:.875em/1.5 ${EditorHostMessage10};color:#393a34;margin:.6em 0}
.ProseMirror pre code{background:none;padding:0;font:inherit}
.ProseMirror :not(pre)>code{background:var(--panel,#f3f1ec);border-radius:3px;padding:.1em .3em;font-size:.9em;font-family:${EditorHostMessage10}}
.hljs-comment,.hljs-quote{color:#a0ada0;font-style:italic}
.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag{color:#1e754f}
.hljs-string,.hljs-regexp,.hljs-symbol,.hljs-bullet{color:#b56959}
.hljs-number,.hljs-literal{color:#2f798a}
.hljs-title,.hljs-section,.hljs-title.function_,.hljs-title.class_{color:#59873a}
.hljs-attr,.hljs-attribute,.hljs-property,.hljs-meta{color:#998418}
.hljs-type,.hljs-built_in{color:#2e8f82}
.hljs-variable,.hljs-template-variable,.hljs-params{color:#b07d48}
.hljs-operator,.hljs-selector-attr,.hljs-selector-pseudo{color:#ab5959}
.hljs-punctuation{color:#999}
.hljs-deletion{color:#b31d28}
.hljs-addition{color:#1c6b48}
[data-mode=dark] .ProseMirror pre{background:var(--cds-surface-1);color:#c0c0b8}
[data-mode=dark] .ProseMirror :not(pre)>code{background:var(--cds-alpha-2)}
[data-mode=dark] .hljs-comment,[data-mode=dark] .hljs-quote{color:#6a8372}
[data-mode=dark] .hljs-keyword,[data-mode=dark] .hljs-selector-tag,[data-mode=dark] .hljs-name,[data-mode=dark] .hljs-tag{color:#4d9375}
[data-mode=dark] .hljs-string,[data-mode=dark] .hljs-regexp,[data-mode=dark] .hljs-symbol,[data-mode=dark] .hljs-bullet{color:#c98a7d}
[data-mode=dark] .hljs-number,[data-mode=dark] .hljs-literal{color:#6394bf}
[data-mode=dark] .hljs-title,[data-mode=dark] .hljs-section,[data-mode=dark] .hljs-title.function_,[data-mode=dark] .hljs-title.class_{color:#80a665}
[data-mode=dark] .hljs-attr,[data-mode=dark] .hljs-attribute,[data-mode=dark] .hljs-property,[data-mode=dark] .hljs-meta{color:#bd976a}
[data-mode=dark] .hljs-type,[data-mode=dark] .hljs-built_in{color:#5da994}
[data-mode=dark] .hljs-variable,[data-mode=dark] .hljs-template-variable,[data-mode=dark] .hljs-params{color:#c99076}
[data-mode=dark] .hljs-operator,[data-mode=dark] .hljs-selector-attr,[data-mode=dark] .hljs-selector-pseudo{color:#cb7676}
[data-mode=dark] .hljs-punctuation{color:#777}
[data-mode=dark] .hljs-deletion{color:#e06c75}
[data-mode=dark] .hljs-addition{color:#4d9375}
`);
  (EditorHostRailKeepout = `--rail-keepout`);
  (EditorHostLayoutMax = `--layout-max`);
  (EditorHostEdgeMinLeft = `--edge-min-left`);
  (EditorHostGlyph = {
    size: 28,
    glyph: 14,
  });
  (EditorHostBadge = {
    size: 22,
    badge: undefined,
  });
  (EditorHostLfileOrphanRemount = `lfile-orphan-remount`);
  (EditorHostTrayBoot = `tray:boot.`);
  (resolveEditorHostValue19 = (
    editorHostValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (editorHostValue19 <= 1 ? `1` : editorHostValue19 <= 5 ? `2_5` : `6_plus`));
  (EditorHostLfileClaudeAskInk = `--lfile-claude-ask-ink`);
  (EditorHostMessage11 = `var(--cds-neutral-500,#6d6b67)`);
  (COWORKER_WRITING_STYLE_CLASSES = {
    placeholder: `lfile-cw-ph`,
    shimmer: `lfile-cw-shimmer`,
    dissolve: `lfile-cw-dissolve`,
    chipOff: `lfile-cw-chip-off`,
    wait: `lfile-cw-wait`,
    word: `lfile-cw-word`,
    caret: `lfile-cw-caret`,
    writing: `lfile-cw-writing`,
    tag: `lfile-cw-tag`,
    stop: `lfile-cw-stop`,
    simBadge: `lfile-cw-sim`,
    idle: `lfile-cw-idle`,
    idleHint: `lfile-cw-idle-hint`,
    cue: `lfile-cw-cue`,
    cueEnter: `lfile-cw-cue-enter`,
  });
  (EditorHostAngle = {
    angle: `120deg`,
    stops: [`37.5%`, `50%`, `62.5%`],
    peakMix: `30%`,
    size: `400% 100%`,
    ms: 3e3,
    from: `83.333% 0`,
    to: `16.667% 0`,
    holdUntil: `15%`,
    moveUntil: `85%`,
    easing: `cubic-bezier(0.714, 0.121, 0.211, 0.888)`,
  });
  (EditorHostDataCwCuesOff = `data-cw-cues-off`);
  (EditorHostState30 = `var(${EditorHostLfileClaudeAskInk})`);
  (EditorHostProseMirror = `.ProseMirror`);
  `${EditorHostProseMirror}${EditorHostLfileClaudeAskInk}${EditorHostMessage11}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.cue}${EditorHostState30}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.cue}${COWORKER_WRITING_STYLE_CLASSES.cueEnter}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.cue}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.idleHint}${EditorHostDataCwCuesOff}${COWORKER_WRITING_STYLE_CLASSES.cue}${EditorHostDataCwCuesOff}${COWORKER_WRITING_STYLE_CLASSES.idleHint}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.cue}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.idleHint}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${EditorHostState30}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.chipOff}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${COWORKER_WRITING_STYLE_CLASSES.shimmer}${EditorHostAngle.angle}${EditorHostState30}${EditorHostAngle.stops[0]}${EditorHostState30}${EditorHostAngle.peakMix}${EditorHostAngle.stops[1]}${EditorHostState30}${EditorHostAngle.stops[2]}${EditorHostAngle.size}${EditorHostAngle.from}${EditorHostAngle.ms}${EditorHostAngle.holdUntil}${EditorHostAngle.from}${EditorHostAngle.easing}${EditorHostAngle.moveUntil}${EditorHostAngle.to}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${COWORKER_WRITING_STYLE_CLASSES.dissolve}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.wait}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.word}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.caret}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.caret}${COWORKER_WRITING_STYLE_CLASSES.writing}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.tag}${COWORKER_WRITING_STYLE_CLASSES.stop}${COWORKER_WRITING_STYLE_CLASSES.simBadge}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${COWORKER_WRITING_STYLE_CLASSES.shimmer}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.word}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.caret}${EditorHostProseMirror}${COWORKER_WRITING_STYLE_CLASSES.placeholder}${COWORKER_WRITING_STYLE_CLASSES.shimmer}`;
  (EditorHostDocZoom = `--doc-zoom`);
  (EditorHostMeasureBase = `--measure-base`);
  (EditorHostState31 = [50, 75, 90, 100, 125, 150, 200]);
  (resolveEditorHostValue20 = (
    editorHostValue20?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (editorHostValue20 === `fit` ? `Fit` : `${editorHostValue20}%`));
  (EditorHostDisplay = `display`);
  (resolveEditorHostKind3 = (
    editorHostKind3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...editorHostKind3,
    type: `doc`,
    kind: EditorHostDisplay,
  }));
  (EditorHostLfileFigure = `lfile-figure`);
  (editorHostValue1200 = 1200);
  (EditorHostTitle = `Title`);
  (EditorHostMessage12 = `Start typing, or ask the agent to…`);
  (EditorHostStartTyping = `Start typing`);
  (EditorHostDataGhostAlone = `data-ghost-alone`);
  (EditorHostLfileAskGhosted = `lfile-ask-ghosted`);
  (EditorHostLfileAskGhostedUnder = `lfile-ask-ghosted-under`);
  (EditorHostDataLdocFree = `data-ldoc-free`);
}

export {
  EditorHostAngle,
  EditorHostBadge,
  EditorHostCeil,
  EditorHostDataGhostAlone,
  EditorHostDataLdocClip,
  EditorHostDataLdocFree,
  EditorHostDataLfileDatumDraft,
  EditorHostDataLfileDatumThreads,
  EditorHostDataLfileEmbedCaption,
  EditorHostDataLfileEmbedGrip,
  EditorHostDataLfileEmbedGripDrag,
  EditorHostDataLfileEmbedGripNub,
  EditorHostDataLfileEmbedHover,
  EditorHostDataLfileInSelection,
  EditorHostDataLfileWidget,
  EditorHostDataOwnLevel,
  EditorHostDisplay,
  EditorHostDocZoom,
  EditorHostFrom,
  EditorHostGlyph,
  EditorHostHover,
  EditorHostJoin,
  EditorHostKind2,
  EditorHostLayoutMax,
  EditorHostLdocArtifactLinkLabel,
  EditorHostLdocArtifactLinkRaw,
  EditorHostLdocArtifactLinkSelected,
  EditorHostLfileAskGhosted,
  EditorHostLfileAskGhostedUnder,
  EditorHostLfileEmbedReveal,
  EditorHostLfileFigure,
  EditorHostLfileOrphanRemount,
  EditorHostMeasureBase,
  EditorHostMermaid,
  EditorHostMessage10,
  EditorHostMessage12,
  EditorHostMessage2,
  EditorHostMessage3,
  EditorHostMessage4,
  EditorHostMessage6,
  EditorHostMessage7,
  EditorHostRailKeepout,
  EditorHostRest2,
  EditorHostRest5,
  EditorHostRest6,
  EditorHostStartTyping,
  EditorHostState10,
  EditorHostState11,
  EditorHostState12,
  EditorHostState13,
  EditorHostState15,
  EditorHostState25,
  EditorHostState29,
  EditorHostState31,
  EditorHostState4,
  EditorHostState5,
  EditorHostState9,
  EditorHostStyles,
  EditorHostStyles2,
  EditorHostStyles4,
  EditorHostStyles6,
  EditorHostTell,
  EditorHostTitle,
  EditorHostTrayBoot,
  clearEditorHostDelete,
  editorHostPattern3,
  editorHostValue1200,
  editorHostValue1300,
  filterEditorHostSlice,
  getEditorHostCharCodeAt,
  installEditorHostCapture,
  installEditorHostPerformance,
  isEditorHostCode,
  isEditorHostProse,
  isEditorHostTest,
  isEditorHostValue,
  resolveEditorHostArm,
  resolveEditorHostArtifact,
  resolveEditorHostArtifact2,
  resolveEditorHostCenter,
  resolveEditorHostCols,
  resolveEditorHostDocumentElement,
  resolveEditorHostDocumentElement2,
  resolveEditorHostError,
  resolveEditorHostExec,
  resolveEditorHostFile,
  resolveEditorHostGetPropertyValue,
  resolveEditorHostGray,
  resolveEditorHostIsFinite,
  resolveEditorHostIsFinite2,
  resolveEditorHostIsFinite3,
  resolveEditorHostIsInteger,
  resolveEditorHostKind3,
  resolveEditorHostReplace,
  resolveEditorHostTabs,
  resolveEditorHostTabs2,
  resolveEditorHostTest,
  resolveEditorHostTop,
  resolveEditorHostTrim,
  resolveEditorHostValue11,
  resolveEditorHostValue12,
  resolveEditorHostValue19,
  resolveEditorHostValue20,
  resolveEditorHostValue5,
  resolveEditorHostValue6,
  resolveEditorHostValue9,
  updateEditorHostHasOwn,
  updateEditorHostTier,
};

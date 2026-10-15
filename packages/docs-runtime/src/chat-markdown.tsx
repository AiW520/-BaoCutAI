/** chat-markdown: restored from chat-markdown-DgL94P7f.js. */
import { originalJsxProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
import * as npmDependency5 from "mdast-util-find-and-replace";
const findAndReplace: Dynamic = (npmDependency5 as Dynamic).findAndReplace;
import * as npmDependency4 from "rehype-sanitize";
const rehypeSanitize: Dynamic = (npmDependency4 as Dynamic).default;
import * as npmDependency3 from "rehype-raw";
const rehypeRaw: Dynamic = (npmDependency3 as Dynamic).default;
import * as npmDependency2 from "rehype-harden";
const harden: Dynamic = (npmDependency2 as Dynamic).harden;
import * as npmDependency1 from "react/jsx-runtime";
const jsxRuntime: Dynamic = npmDependency1 as Dynamic;
import * as npmDependency0 from "streamdown";
const Streamdown: Dynamic = (npmDependency0 as Dynamic).Streamdown;
const defaultRemarkPlugins: Dynamic = (npmDependency0 as Dynamic)
  .defaultRemarkPlugins;
const __vite__mapDeps: Dynamic = (..._extraArguments: unknown[]): Dynamic => [];
import {
  n as createLiveModuleNamespace,
  r as toModuleNamespace,
  t as initializeCommonJS,
} from "./rolldown-runtime";
import {
  $h as resolveDataModelSchemasPath,
  Bh as updateDataModelSchemasHerePath,
  CD as resolveUiLinksAndFoundationItContainsAControlCharacter,
  HM as loadReact,
  OD as twMerge,
  Qh as resolveDataModelSchemasIncludes,
  Rg as resolvePlatformApiAndAuthValue28,
  UE as loadJsxRuntime,
  YM as emitTelemetryEvent,
  aO as resolveEditorAnchorsAndMentionsRef,
  bT as loadReactDom,
  cO as resolveEditorAnchorsAndMentionsRef3,
  dO as resolveEditorAnchorsAndMentionsPlatform,
  iE as UiOverlaysAndIconsCustomIcon,
  kD as clsx,
  kj as resolvePlatformSessionAndSourcesValue,
  oO as resolveEditorAnchorsAndMentionsValue10,
  xC as Tooltip,
} from "./platform-core";
import { t as preloadModule } from "./preload";
import { S as Link } from "./cds";
import {
  o as MentionName,
  r as ArtifactReferenceChip,
  t as MentionHoverAnchor,
} from "./ref-chips";
import {
  a as countCharacters,
  c as parseRawHtml,
  d as nodePosition,
  f as structuredClone,
  g as convertNodeTest,
  h as visitParents,
  i as stringifyPosition,
  l as pointEnd,
  m as SKIP,
  n as toJsxRuntime,
  o as sanitizeHast,
  p as visit,
  r as VFileMessage,
  s as defaultSanitizeSchema,
  u as pointStart,
} from "./hast";
import "./devlop";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var loadedCodePlugin: Dynamic;
var codePluginLoadPromise: Dynamic;
var codePluginSubscribers: Dynamic = new (Set as Dynamic)();
var containsCodeFence: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.includes("```") || input.includes(`~~~`);
var languageTelemetryAliases: Dynamic = {
  cpp: `cpp`,
  "c++": `cpp`,
  cc: `cpp`,
  hpp: `cpp`,
  ruby: `ruby`,
  rb: `ruby`,
  julia: `julia`,
  jl: `julia`,
  "objective-c": `objc`,
  objc: `objc`,
  objectivec: `objc`,
  matlab: `matlab`,
  fortran: `fortran`,
  erlang: `erlang`,
  erl: `erlang`,
  ocaml: `ocaml`,
  clojure: `clojure`,
  clj: `clojure`,
  groovy: `groovy`,
  nginx: `nginx`,
  apache: `apache`,
  vim: `vim`,
  viml: `vim`,
  asm: `asm`,
  nasm: `asm`,
  wasm: `wasm`,
  zig: `zig`,
  nim: `nim`,
  crystal: `crystal`,
  fsharp: `fsharp`,
  "f#": `fsharp`,
  vb: `vb`,
  solidity: `solidity`,
  prisma: `prisma`,
  nix: `nix`,
  applescript: `applescript`,
  coffee: `coffee`,
  coffeescript: `coffee`,
  pascal: `pascal`,
  lisp: `lisp`,
  scheme: `scheme`,
  racket: `racket`,
  elm: `elm`,
  purescript: `purescript`,
  reason: `reason`,
  verilog: `verilog`,
  vhdl: `vhdl`,
  cuda: `cuda`,
  glsl: `glsl`,
  wgsl: `wgsl`,
  hlsl: `hlsl`,
  gdscript: `gdscript`,
  abap: `abap`,
  cobol: `cobol`,
  ada: `ada`,
  d: `d`,
  v: `v`,
  awk: `awk`,
  fish: `fish`,
  nushell: `nushell`,
  tcl: `tcl`,
  smalltalk: `smalltalk`,
  prolog: `prolog`,
  sparql: `sparql`,
  cypher: `cypher`,
  http: `http`,
  nginxconf: `nginx`,
  dotenv: `dotenv`,
  env: `dotenv`,
  log: `log`,
  wikitext: `wikitext`,
  typst: `typst`,
  astro: `astro`,
  mdx: `mdx`,
  jinja: `jinja`,
  handlebars: `handlebars`,
  hbs: `handlebars`,
  pug: `pug`,
  haml: `haml`,
  twig: `twig`,
  liquid: `liquid`,
  razor: `razor`,
  blade: `blade`,
  erb: `erb`,
  kql: `kusto`,
  kusto: `kusto`,
  bicep: `bicep`,
  puppet: `puppet`,
  mermaid: `mermaid`,
  mmd: `mermaid`,
  math: `math`,
  katex: `math`,
  dot: `dot`,
  graphviz: `dot`,
  plantuml: `plantuml`,
};
function codeLanguageMissEvent(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic =
    languageTelemetryAliases[input.trim().toLowerCase()] ?? `unlisted`;
  return {
    name: `pages.code.lang_miss`,
    key: value,
    fields: {
      component: value,
    },
  };
}
function loadCodePlugin(..._extraArguments: unknown[]): Dynamic {
  return loadedCodePlugin === undefined
    ? ((codePluginLoadPromise ??= preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./shiki-core")
            .then(
              (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                input.t,
            )
            .then(
              (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                input.setCodeLangMissListener?.(
                  (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    emitTelemetryEvent(codeLanguageMissEvent(input2)),
                );
                loadedCodePlugin = input.code;
                for (let value of codePluginSubscribers as Dynamic) value();
                return input.code;
              },
              (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                throw ((codePluginLoadPromise = undefined), input);
              },
            ),
        __vite__mapDeps([0, 1, 2, 3, 4, 5, 6]),
        import.meta.url,
      )),
      codePluginLoadPromise)
    : Promise.resolve(loadedCodePlugin);
}
var getCodePluginSnapshot: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
  loadedCodePlugin;
var subscribeCodePlugin: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (
  codePluginSubscribers.add(input),
  (..._extraArguments: unknown[]): undefined => {
    codePluginSubscribers.delete(input);
  }
);
var EMPTY_PLUGINS: Dynamic = {};
function useMarkdownCodePlugins(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useSyncExternalStore)(
    subscribeCodePlugin,
    getCodePluginSnapshot,
    getCodePluginSnapshot,
  );
  let value2: Dynamic = value === undefined && containsCodeFence(input);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value2) {
        loadCodePlugin().catch(
          (..._extraArguments: unknown[]): undefined => {},
        );
      }
    },
    [value2],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      value === undefined
        ? EMPTY_PLUGINS
        : {
            code: value,
          },
    [value],
  );
}
var remarkHardLineBreaks: Dynamic =
  (..._extraArguments: unknown[]): Dynamic =>
  (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    findAndReplace(input, [
      /\r?\n|\r/g,
      (..._extraArguments: unknown[]): Dynamic => ({
        type: `break`,
      }),
    ]);
  };
var mentionPattern: Dynamic =
  /(?<=^|[\s(\u2060])@([A-Z][^\u2060<>&@ \n]*(?: (?!\p{Ll})[^\u2060<>&@ \n]+){0,7}\u2060|[A-Z][\w'.-]*(?: [A-Z][\w'.-]+)?)/gu;
var remarkTextMentions: Dynamic =
  (..._extraArguments: unknown[]): Dynamic =>
  (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    findAndReplace(input, [
      mentionPattern,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        type: `html`,
        value: `<span data-chat-mention>${input2}</span>`,
      }),
    ]);
  };
var escapeHtmlAttribute: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.replace(
    /[&<>"']/g,
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      `&#${input2.charCodeAt(0)};`,
  );
var remarkMentionLinks: Dynamic =
  (..._extraArguments: unknown[]): Dynamic =>
  (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let children: Dynamic = input2.children;
      if (Array.isArray(children))
        for (let index: Dynamic = 0; index < children.length; index++) {
          let value2: Dynamic = children[index];
          if (
            value2.type === `link` &&
            typeof value2.url == `string` &&
            value2.url.startsWith(`mention:`)
          ) {
            let slice: Dynamic = value2.url.slice(8);
            let value3: Dynamic = resolvePlatformSessionAndSourcesValue(slice);
            children[index] = {
              type: `html`,
              value: `<span data-chat-mention data-mention-id="${escapeHtmlAttribute(slice)}">@${escapeHtmlAttribute(value3)}</span>`,
            };
          } else value(value2);
        }
    };
    value(input);
  };
function referenceUrl(input?: Dynamic, ..._extraArguments: unknown[]) {
  if (!input.path) return ``;
  let value: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
    switch (input.selector.kind) {
      case `html`:
        return input.selector.id;
      case `cell`:
      case `range`:
        return input.selector.ref;
      case `chart`:
        return `chart:${input.selector.name}`;
      case `input`:
        return `input:${input.selector.target}`;
      default:
        return ``;
    }
  })();
  let value2: Dynamic = value ? `#${encodeURIComponent(value)}` : ``;
  return input.container
    ? `claude://${input.container}/${encodeURIComponent(input.path)}${value2}`
    : `claude://${encodeURIComponent(input.path)}${value2}`;
}
var referencePattern: Dynamic = /\[[^\]\n]{1,200}\](?:'[^'\n]*'|[^\s)])*/g;
var remarkReferenceLinks: Dynamic =
  (..._extraArguments: unknown[]): Dynamic =>
  (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    findAndReplace(input, [
      referencePattern,
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let value: Dynamic = resolveDataModelSchemasPath(input2);
        return resolvePlatformApiAndAuthValue28(value) ||
          (!resolveDataModelSchemasIncludes(value.selector.kind) &&
            !/\.[A-Za-z0-9]{1,8}(?:$|[?/])/.test(value.path))
          ? false
          : {
              type: `link`,
              url: referenceUrl(value),
              title: input2,
              children: [
                {
                  type: `text`,
                  value: value.path || input2,
                },
              ],
            };
      },
    ]);
  };
var nodeText: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof input.value == `string`
    ? input.value
    : Array.isArray(input.children)
      ? input.children
          .map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              nodeText(input2),
          )
          .join(``)
      : ``;
var referenceChipHtml = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `<span data-ref-chip="${context}" data-ref="${escapeHtmlAttribute(input)}"${options === null ? `` : ` data-ref-label="${escapeHtmlAttribute(options)}"`}>${escapeHtmlAttribute(options ?? input)}</span>`;
var remarkReferenceChips: Dynamic =
  (..._extraArguments: unknown[]): Dynamic =>
  (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let value = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let children: Dynamic = input2.children;
      if (Array.isArray(children))
        for (let value2: Dynamic = children.length - 1; value2 >= 0; value2--) {
          let value3: Dynamic = children[value2];
          if (value3.type === `link` && typeof value3.url == `string`) {
            if (
              value3.url.startsWith(`claude:`) ||
              value3.url.startsWith(`ref:`) ||
              value3.url.startsWith(`container:`)
            ) {
              let value5: Dynamic = resolveEditorAnchorsAndMentionsRef3(
                `<${value3.url}>`,
              );
              let value6: Dynamic =
                value5.length === 1 && value5[0]?.type === `chip`
                  ? value5[0]
                  : null;
              if (value6) {
                let value7: Dynamic = nodeText(value3);
                let value8: Dynamic =
                  value7 !== `` && value7 !== value3.url
                    ? value7
                    : value6.label;
                children[value2] = {
                  type: `html`,
                  value: referenceChipHtml(value6.ref, value8, value6.kind),
                };
                continue;
              }
            }
            let [parts, ...parts2]: Dynamic = value3.url.split(`|`);
            let value4: Dynamic =
              parts === undefined
                ? null
                : resolveEditorAnchorsAndMentionsRef(parts);
            if (value4) {
              let value5: Dynamic = nodeText(value3);
              let value6: Dynamic =
                value5 !== `` && value5 !== value3.url
                  ? value5
                  : parts2.length > 0
                    ? parts2.join(`|`)
                    : null;
              children[value2] = {
                type: `html`,
                value: referenceChipHtml(value4.ref, value6, value4.kind),
              };
            }
            continue;
          }
          if (value3.type === `text` && typeof value3.value == `string`) {
            let value4: Dynamic = resolveEditorAnchorsAndMentionsRef3(
              value3.value,
            );
            if (
              value4.some(
                (input3?: Dynamic, ..._extraArguments: unknown[]) =>
                  input3.type === `chip`,
              )
            ) {
              (children.splice as Dynamic)(
                value2,
                1,
                ...value4.map(
                  (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    entry.type === `text`
                      ? {
                          type: `text`,
                          value: entry.text,
                        }
                      : {
                          type: `html`,
                          value: referenceChipHtml(
                            entry.ref,
                            entry.label,
                            entry.kind,
                          ),
                        },
                ),
              );
            }
            continue;
          }
          value(value3);
        }
    };
    value(input);
  };
var chatRemarkPlugins: Dynamic = [
  ...Object.values(defaultRemarkPlugins),
  remarkHardLineBreaks,
  remarkTextMentions,
  remarkMentionLinks,
  remarkReferenceLinks,
];
var chatRehypePlugins: Dynamic = [
  rehypeRaw,
  [
    rehypeSanitize,
    {
      ...defaultSanitizeSchema,
      protocols: {
        ...defaultSanitizeSchema.protocols,
        href: [
          ...(defaultSanitizeSchema.protocols?.href ?? []),
          `tel`,
          `claude`,
          `ref`,
        ],
      },
      attributes: {
        ...defaultSanitizeSchema.attributes,
        code: [...(defaultSanitizeSchema.attributes?.code ?? []), `metastring`],
        span: [...(defaultSanitizeSchema.attributes?.span ?? []), `data*`],
      },
    },
  ],
  [
    harden,
    {
      allowedImagePrefixes: [`*`],
      allowedLinkPrefixes: [`*`],
      allowedProtocols: [`*`],
      allowDataImages: true,
    },
  ],
];
function createReferenceSpanRenderer(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let value: Dynamic = (
      input3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value5: Dynamic = input2[input3];
      return typeof value5 == `string` ? value5 : undefined;
    };
    let value2: Dynamic = value(`data-ref`);
    let value3: Dynamic = value(`data-mention-id`);
    if (value3 !== undefined) {
      let { node: value5, children: value6, ...value7 }: Dynamic = input2;
      return (
        <MentionHoverAnchor principal={value3}>
          <span
            {...originalJsxProps({
              ...value7,
              children: resolveEditorAnchorsAndMentionsPlatform(value3) ? (
                <MentionName principal={value3} />
              ) : (
                value6
              ),
            })}
          />
        </MentionHoverAnchor>
      );
    }
    let value4: Dynamic =
      value2 !== undefined && value(`data-ref-chip`) !== undefined
        ? resolveEditorAnchorsAndMentionsValue10(value2)
        : null;
    if (!value4 || value2 === undefined) {
      let { node: value5, children: value6, ...value7 }: Dynamic = input2;
      return (
        <span
          {...originalJsxProps({
            ...value7,
            children: value6,
          })}
        />
      );
    }
    return (
      <ArtifactReferenceChip
        refStr={value2}
        label={value(`data-ref-label`) ?? null}
        kind={value4}
        onDrillRun={input}
        container={options}
      />
    );
  };
}
var chatMarkdownModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => ChatMarkdown,
});
var isHashLinkWithText: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  resolveUiLinksAndFoundationItContainsAControlCharacter(input) === `#` &&
  input.trim() !== `#`;
var chatMarkdownComponents: Dynamic = {
  a: (
    { href: input, children: input2 }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input?.startsWith(`claude://`) ? (
      <Tooltip content={input} multiline={true}>
        <button
          type={`button`}
          onClick={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            event.preventDefault();
            event.stopPropagation();
            updateDataModelSchemasHerePath(input, {
              sameTab: true,
            });
          }}
          className={`border-strong text-secondary hover:border-stronger hover:text-primary bg-alpha-1 mx-0.5 inline-flex max-w-[180px] items-center gap-1 rounded-full border px-1.5 py-0.5 align-middle text-[10px] transition-colors`}
        >
          <UiOverlaysAndIconsCustomIcon
            name={`File`}
            customSize={9}
            className={`shrink-0 opacity-60`}
          />
          <span className={`truncate`}>{input2}</span>
        </button>
      </Tooltip>
    ) : input === undefined || isHashLinkWithText(input) ? (
      <span>{input2}</span>
    ) : (
      <Link
        href={input}
        external={true}
        rel={`noreferrer`}
        onClick={(input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input3.stopPropagation()
        }
      >
        {input2}
      </Link>
    ),
  p: ({ children: input }: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
    <p className={`mt-2 mb-0 first:mt-0`}>{input}</p>
  ),
};
var referenceRemarkPlugins: Dynamic = [
  ...chatRemarkPlugins,
  remarkReferenceChips,
];
var defaultReferenceComponents: Dynamic = {
  ...chatMarkdownComponents,
  span: createReferenceSpanRenderer(),
};
var componentsByContainer: Dynamic = new (Map as Dynamic)();
var referenceComponents: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (!input) return defaultReferenceComponents;
  let entry: Dynamic = componentsByContainer.get(input);
  if (!entry) {
    entry = {
      ...chatMarkdownComponents,
      span: createReferenceSpanRenderer(undefined, input),
    };
    componentsByContainer.set(input, entry);
  }
  return entry;
};
function ChatMarkdown(
  { container: input, children: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <Streamdown
      remarkPlugins={referenceRemarkPlugins}
      rehypePlugins={chatRehypePlugins}
      components={referenceComponents(input)}
    >
      {input2}
    </Streamdown>
  );
}
export {
  Streamdown as i,
  chatRehypePlugins as n,
  useMarkdownCodePlugins as r,
  chatMarkdownModule as t,
};
export {
  Streamdown,
  chatRehypePlugins,
  useMarkdownCodePlugins,
  chatMarkdownModule,
};

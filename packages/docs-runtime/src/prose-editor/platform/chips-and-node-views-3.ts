/** BaoCut: editor chips and node views from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Decoration,
  DecorationSet,
  Extension,
  InputRule,
  Node2,
  Plugin,
  PluginKey,
  mergeAttributes,
} from "../../platform/dependencies";
import {
  resolveEditorExtensionsJoin,
  resolveEditorExtensionsValue13,
  resolveEditorExtensionsValue9,
} from "./extensions-2";
import {
  resolveEditorHostEnum,
  resolveEditorHostMention,
} from "../../platform/services/runtime-and-chat-3";
import {
  resolveEditorChipsAndNodeViewsDate2,
  updateEditorChipsAndNodeViewsNode,
} from "./chips-and-node-views-1";
import {
  resolveEditorChipsAndNodeViewsDom2,
  resolveEditorChipsAndNodeViewsFind,
  resolveEditorChipsAndNodeViewsValue14,
} from "./chips-and-node-views-2";

var editorChipsAndNodeViewsSet9: Dynamic;

var editorChipsAndNodeViewsSet10: Dynamic;

var resolveEditorTableControlsBuiltin: Dynamic;

var resolveEditorTableControlsChipCheckbox: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorChipsAndNodeViews3Step1(): void {
  Node2.create({
    name: `builtin`,
    inline: true,
    atom: true,
    group: `inline`,
    selectable: true,
    addAttributes(..._extraArguments: unknown[]): Dynamic {
      return {
        builtin: {
          default: null,
          parseHTML: (
            element?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let attribute: Dynamic = element.getAttribute(`data-builtin`);
            try {
              return attribute == null ? null : JSON.parse(attribute);
            } catch {
              return null;
            }
          },
          renderHTML: (callback?: Dynamic, ..._extraArguments: unknown[]) => ({
            "data-builtin": JSON.stringify(callback.builtin ?? null),
          }),
        },
      };
    },
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `span[data-builtin]`,
          priority: 60,
        },
      ];
    },
    renderText({ node: node }: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      let builtin: Dynamic = node.attrs.builtin;
      if (builtin?.kind === `mention`)
        return `@${resolveEditorHostMention(builtin)}`;
      if (builtin?.kind === `date`) {
        let ts2: Dynamic = typeof builtin.ts == `string` ? builtin.ts : ``;
        return ts2
          ? resolveEditorExtensionsJoin(
              resolveEditorExtensionsValue13()
                ? resolveEditorChipsAndNodeViewsDate2(ts2)
                : ts2,
            )
          : ``;
      }
      return builtin?.kind === `enum`
        ? resolveEditorChipsAndNodeViewsFind(builtin.enum, builtin.index)
        : builtin?.kind === `ref`
          ? resolveEditorChipsAndNodeViewsValue14(builtin.ref)
          : ``;
    },
    addNodeView(..._extraArguments: unknown[]): Dynamic {
      return updateEditorChipsAndNodeViewsNode(
        `builtin`,
        (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveEditorHostEnum(callback.builtin),
        resolveEditorChipsAndNodeViewsDom2,
      );
    },
    renderHTML(
      { node: node, HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let builtin: Dynamic = node.attrs.builtin;
      switch (builtin?.kind) {
        case `mention`:
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-mention`,
              "data-mention-id":
                typeof builtin.principal == `string` ? builtin.principal : ``,
            }),
            resolveEditorHostMention(builtin),
          ];
        case `checkbox`: {
          let matchesChecked = builtin.checked === true;
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-chip`,
              "data-chip": `checkbox`,
              "data-checked": String(matchesChecked),
            }),
            matchesChecked ? `☑` : `☐`,
          ];
        }
        case `date`: {
          let editorExtensionsJoin: Dynamic =
            resolveEditorExtensionsJoin(
              typeof builtin.ts == `string`
                ? resolveEditorChipsAndNodeViewsDate2(builtin.ts)
                : `—`,
            ) || `—`;
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-chip`,
              "data-chip": `date`,
            }),
            editorExtensionsJoin,
          ];
        }
        case `enum`:
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-chip`,
              "data-chip": `dropdown`,
            }),
            `▾`,
          ];
        case `ref`: {
          let dataChip: Dynamic = resolveEditorHostEnum(builtin);
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-chip`,
              "data-chip": dataChip,
            }),
            resolveEditorExtensionsValue9(dataChip),
          ];
        }
        default:
          return [
            `span`,
            mergeAttributes(HTMLAttributes, {
              class: `ldoc-chip`,
            }),
            `◌`,
          ];
      }
    },
  });
  Extension.create({
    name: `chipCheckboxInputRule`,
    addInputRules(..._extraArguments: unknown[]): Dynamic {
      return [
        new (InputRule as Dynamic)({
          find: /(^|\s)\[ ?\]$/,
          handler: (
            { state: state, range: range, match: match }: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let builtin: Dynamic = state.schema.nodes.builtin;
            let chipCheckbox: Dynamic = state.schema.nodes.chipCheckbox;
            let create2: Dynamic = builtin
              ? builtin.create({
                  builtin: {
                    kind: `checkbox`,
                    checked: false,
                  },
                })
              : chipCheckbox?.create();
            if (!create2) return null;
            let total: Dynamic = range.from + match[1].length;
            state.tr.replaceRangeWith(total, range.to, create2);
          },
        }),
      ];
    },
  });
  Extension.create({
    name: `checklistIndent`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      let create2: Dynamic = (
        callback?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let items: Dynamic = [];
        callback.descendants(
          (node?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) =>
            node.type.name === `paragraph`
              ? (resolveEditorTableControlsChipCheckbox(node.firstChild) &&
                  items.push(
                    Decoration.node(options, options + node.nodeSize, {
                      class: `ldoc-checklist`,
                    }),
                  ),
                false)
              : true,
        );
        return DecorationSet.create(callback, items);
      };
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`ldocChecklistIndent`),
          state: {
            init: (
              callback: unknown,
              { doc: doc }: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => create2(doc),
            apply: (
              callback?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (callback.docChanged ? create2(callback.doc) : options),
          },
          props: {
            decorations(
              this: Dynamic,
              callback?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic {
              return this.getState(callback);
            },
          },
        }),
      ];
    },
  });
  (editorChipsAndNodeViewsSet9 = new (Set as Dynamic)([
    `chipCheckbox`,
    `chipTask`,
  ]));
  (editorChipsAndNodeViewsSet10 = new (Set as Dynamic)([
    ...editorChipsAndNodeViewsSet9,
    `chipDate`,
  ]));
  (resolveEditorTableControlsBuiltin = (
    editorTableControlsBuiltin?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorTableControlsBuiltin?.type.name === `builtin`
      ? editorTableControlsBuiltin.attrs?.builtin?.kind
      : undefined);
  (resolveEditorTableControlsChipCheckbox = (
    editorTableControlsChipCheckbox?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorTableControlsChipCheckbox?.type.name === `chipCheckbox` ||
    resolveEditorTableControlsBuiltin(editorTableControlsChipCheckbox) ===
      `checkbox`);
}

export {
  editorChipsAndNodeViewsSet10,
  editorChipsAndNodeViewsSet9,
  resolveEditorTableControlsBuiltin,
};

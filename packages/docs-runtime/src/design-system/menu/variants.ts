/** BaoCut: menu variants from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { appTImport2 } from "../dependencies";

var menuItemVariants: Dynamic;

var TextInputStyles4: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuVariantsStep1(): void {
  menuItemVariants = appTImport2(
    `cds-reset flex w-full items-center gap-xs compact:px-2 comfortable:px-2.5 py-[calc((var(--cds-h-control)-var(--cds-leading-body))/2)] rounded text-body font-normal [--cds-shortcut-cap-ink:var(--cds-text-muted)] select-none outline-none focus-visible:outline-hidden data-[disabled]:opacity-disabled data-[disabled]:pointer-events-none`,
    {
      variants: {
        variant: {
          default: `text-primary data-[highlighted]:bg-fill-ghost-hover`,
          danger: `group/menu-danger text-danger data-[highlighted]:bg-fill-danger data-[highlighted]:text-on-danger data-[highlighted]:[--cds-shortcut-cap-ink:currentColor]`,
        },
      },
      defaultVariants: {
        variant: `default`,
      },
    },
  );
  TextInputStyles4 = `pb-[calc((var(--cds-h-control)-var(--cds-font-size-body)-var(--cds-leading-footnote)+var(--cds-font-size-footnote))/2)]`;
}

export { TextInputStyles4, menuItemVariants };

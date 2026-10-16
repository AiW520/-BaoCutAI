/** property-row: restored from PropertyRow-B1BaUMKB.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import { loadJsxRuntime } from "../platform/index";
import type * as React from "react";

export const PropertyRow: React.FC<Dynamic> = ({ label: label, children: children }) => {
  return (
    <div
      className={`gap-x-sm grid min-w-0 ${PROPERTY_ROW_HEIGHT_CLASS} grid-cols-[80px_minmax(0,1fr)] items-center py-px`}
      data-property-row={``}
    >
      <span className={`text-footnote text-muted min-w-0 truncate select-none`}>
        {label}
      </span>
      <div className={`flex min-w-0 items-center gap-2`}>{children}</div>
    </div>
  );
};

var jsxRuntime: Dynamic = loadJsxRuntime();
var PROPERTY_ROW_HEIGHT_CLASS: string = `min-h-8 pointer-coarse:min-h-10`;

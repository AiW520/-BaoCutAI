import type { ReactNode } from "react";
import { UiDialogsRoot } from "../dependencies";
import { useApplicationRoutesAriaLabel } from "./routes-routines-dialog";
import type * as React from "react";

export const DetailMessage: React.FC<{ text: ReactNode }> = ({ text }) => {
  return (
    <div className={`flex min-h-0 flex-1 flex-col`}>
      <div className={`flex items-start justify-end`}>
        <UiDialogsRoot.Close render={useApplicationRoutesAriaLabel()} />
      </div>
      <div className={`text-muted text-footnote flex flex-1 items-center justify-center`}>
        {text}
      </div>
    </div>
  );
};

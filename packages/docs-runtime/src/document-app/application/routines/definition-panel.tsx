import { useState } from "react";
import { resolveDataContentAndReferencesReplace2 } from "../../dependencies";
import type { LoadState, RoutineDefinition, RoutineRun } from "../project-contracts";
import { RoutineRunHistory } from "./run-history";
import type * as React from "react";

export const RoutineDefinitionPanel: React.FC<{
  definition: LoadState<RoutineDefinition>;
  runs: readonly RoutineRun[];
}> = ({ definition, runs }) => {
  const [selectedTab, setSelectedTab] = useState<"instructions" | "output">(
    "instructions",
  );
  const routineDetailTabs: readonly ("instructions" | "output")[] = [
    "instructions",
    "output",
  ];
  return (
    <>
      <div className={`border-strong mt-5 flex items-center gap-4 border-b`}>
        {routineDetailTabs.map((item) => (
          <button
            type={`button`}
            data-testid={`routine-tab-${item}`}
            onClick={() => setSelectedTab(item)}
            className={`text-footnote -mb-px border-b-2 pb-1.5 font-medium transition-colors ${selectedTab === item ? `border-accent text-primary` : `text-secondary hover:text-primary border-transparent`}`}
            key={item}
          >
            {item === `instructions` ? `Instructions` : `Output`}
          </button>
        ))}
      </div>
      <div className={`pt-3`}>
        {selectedTab === `instructions` ? (
          definition === `loading` ? (
            <div className={`text-muted text-footnote`}>{`loading…`}</div>
          ) : definition === `err` ? (
            <div
              className={`text-secondary text-footnote`}
            >{`Couldn't load this routine's definition.`}</div>
          ) : definition.config.type === `prompt` ? (
            <div className={`text-primary text-footnote whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(definition.config.prompt)}
            </div>
          ) : definition.config.type === `code` ? (
            <pre className={`text-code overflow-x-auto whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(definition.config.code)}
            </pre>
          ) : (
            <pre className={`text-code overflow-x-auto whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(
                `${definition.config.call.tool}(${JSON.stringify(definition.config.call.args, null, 2)})`,
              )}
            </pre>
          )
        ) : (
          <RoutineRunHistory runs={runs} />
        )}
      </div>
    </>
  );
};

import { z } from "zod";
const runOutputSchema = z.looseObject({
  kind: z.string(),
  name: z.string(),
  bytes: z.number(),
});
export const routineRunSchema = z.looseObject({
  id: z.string(),
  status: z.string(),
  startedAt: z.string(),
  settledAt: z.string(),
  progress: z.array(z.string()).optional(),
  error: z.string().optional(),
  summary: z.string().nullish(),
  outputs: z.array(runOutputSchema).optional(),
});
export const routineRowSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().nullish(),
  summary: z.string().nullish(),
  paused: z.boolean().optional(),
  consentLive: z.boolean().optional(),
  runs: z.array(routineRunSchema).nullish(),
  lastRun: z
    .object({
      timing: z.looseObject({
        endedAt: z.string().nullish(),
        startedAt: z.string().nullish(),
      }),
    })
    .nullish(),
  schedule: z
    .object({
      recurrence: z.looseObject({
        rrule: z.string(),
        tz: z.string(),
      }),
    })
    .optional(),
});
export const routineListSchema = z.looseObject({
  slug: z.string().optional(),
  rows: z.array(routineRowSchema),
});
export const routineDefinitionSchema = z.looseObject({
  refs: z.array(z.string()).nullish(),
  config: z.union([
    z.looseObject({
      type: z.literal("prompt"),
      prompt: z.string(),
    }),
    z.looseObject({
      type: z.literal("code"),
      code: z.string(),
    }),
    z
      .object({
        type: z.string(),
        call: z.looseObject({
          tool: z.string(),
          args: z.unknown(),
        }),
      })
      .transform(
        (
          config,
        ): {
          type: "call";
          call: typeof config.call;
        } => ({
          type: "call",
          call: config.call,
        }),
      ),
  ]),
});
const databaseColumnSchema = z.looseObject({
  key: z.string(),
  type: z.looseObject({
    kind: z.string(),
    type: z.string().optional(),
  }),
  unique: z.boolean().optional(),
  required: z.boolean().optional(),
});
export const databaseSummarySchema = z.looseObject({
  id: z.string(),
  name: z.string(),
});
export const databaseDetailSchema = z.looseObject({
  name: z.string(),
  columns: z.array(databaseColumnSchema),
  totalRows: z.number(),
  truncated: z.boolean().optional(),
  servedRows: z.number().optional(),
  rowsNote: z.string().optional(),
  marks: z.array(
    z.looseObject({
      source: z.string(),
      kind: z.string(),
      count: z.number(),
    }),
  ),
  rows: z.array(
    z.looseObject({
      pk: z.looseObject({
        source: z.string(),
        index: z.number(),
      }),
      cells: z.record(z.string(), z.unknown()),
    }),
  ),
});
export const duplicateProjectSchema = z.looseObject({
  pid: z.string(),
  name: z.string(),
  skipped: z.array(z.unknown()).optional(),
});
export type RoutineRun = z.infer<typeof routineRunSchema>;
export type RoutineRow = z.infer<typeof routineRowSchema>;
export type RoutineDefinition = z.infer<typeof routineDefinitionSchema>;
export type RoutineList = z.infer<typeof routineListSchema>;
export type DatabaseDetailData = z.infer<typeof databaseDetailSchema>;
export type DatabaseColumn = z.infer<typeof databaseColumnSchema>;
export type DuplicateProjectResult = z.infer<typeof duplicateProjectSchema>;
export type LoadState<Value> = "loading" | "err" | Value;
export interface ProjectFeedEvent {
  kind: string;
  envelope?: {
    outcome?: unknown;
    diff: readonly {
      address?: {
        ref?: {
          object?: string;
        };
      };
    }[];
  };
}
export interface DocumentChipTarget {
  file: string;
  hash?: string;
}
export type VisualizeRoutine = (prompt: string) => void;
export type RoutinePageState =
  | {
      kind: "loading";
    }
  | {
      kind: "missing";
    }
  | {
      kind: "ready";
      slug: string;
      address: string;
      displayName: string;
    };

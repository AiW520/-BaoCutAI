import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import {
  apiFetcher,
  Button,
  resolveDataContentAndReferencesKind2,
  resolveObservabilityBrowserAndOperationEventsValue48,
  TextInput,
  toast,
  UiDialogsRoot,
} from "../dependencies";
import type { DuplicateProjectResult } from "./project-contracts";
import { duplicateProjectSchema } from "./project-contracts";
interface ProjectDuplicateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pid: string;
  projectName: string;
}
function ProjectDuplicateDialog({
  open,
  onOpenChange,
  pid,
  projectName: projectName2,
}: ProjectDuplicateDialogProps) {
  const [, set]: [string, (path: string) => void] =
    resolveObservabilityBrowserAndOperationEventsValue48();
  const [name, setName] = useState(``);
  const [submitting, setSubmitting] = useState(false);
  useEffect((): undefined => {
    if (open) {
      setName(`${projectName2} (copy)`);
    }
  }, [open, projectName2]);
  const onClick = (): undefined => {
    const trimmedName = name.trim();
    if (!(!trimmedName || submitting)) {
      setSubmitting(true);
      toast.promise(
        (async () => {
          const response: Response = await apiFetcher(
            `/api/v3/project/${encodeURIComponent(pid)}/duplicate`,
            {
              method: `POST`,
              headers: {
                "content-type": `application/json`,
              },
              body: JSON.stringify({
                name: trimmedName,
              }),
            },
          );
          const body: unknown = await response.json();
          const parsed = duplicateProjectSchema.safeParse(body);
          if (!response.ok || !parsed.success) {
            const message =
              typeof body === "object" &&
              body !== null &&
              "error" in body &&
              typeof body.error === "string"
                ? body.error
                : `duplicate failed (${response.status})`;
            throw Error(message);
          }
          const json = parsed.data;
          onOpenChange(false);
          set(
            resolveDataContentAndReferencesKind2({
              kind: `project`,
              id: json.pid,
            }),
          );
          return json;
        })().finally(() => setSubmitting(false)),
        {
          loading: `Duplicating…`,
          success: (duplicateNameInput: DuplicateProjectResult) =>
            duplicateNameInput.skipped && duplicateNameInput.skipped.length > 0
              ? `Duplicated to "${duplicateNameInput.name}" (${duplicateNameInput.skipped.length} file(s) not copied)`
              : `Duplicated to "${duplicateNameInput.name}"`,
          error: (error: unknown) =>
            error instanceof Error ? error.message : `duplicate failed`,
        },
      );
    }
  };
  return (
    <UiDialogsRoot.Root
      open={open}
      onOpenChange={(duplicateNameInput: boolean) =>
        !submitting && onOpenChange(duplicateNameInput)
      }
    >
      <UiDialogsRoot.Popup size={`sm`}>
        <UiDialogsRoot.Header
          showClose={true}
        >{`Duplicate project`}</UiDialogsRoot.Header>
        <TextInput
          autoFocus={true}
          aria-label={`New project name`}
          data-testid={`duplicate-name-input`}
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setName(event.currentTarget.value)
          }
          onFocus={(event: FocusEvent<HTMLInputElement>) => event.currentTarget.select()}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>): undefined => {
            if (event.key === `Enter`) {
              onClick();
            }
          }}
        />
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close
            render={<Button disabled={submitting}>{`Cancel`}</Button>}
          />
          <Button
            variant={`primary`}
            disabled={submitting || name.trim().length === 0}
            data-testid={`duplicate-confirm`}
            onClick={onClick}
          >{`Duplicate`}</Button>
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}
export { ProjectDuplicateDialog };

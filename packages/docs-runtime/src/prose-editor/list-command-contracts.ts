import type {} from "@tiptap/core";

/** Commands installed by the restored list extensions in both editor contexts. */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    documentLists: {
      toggleListKind(kind: "ordered" | "bullet" | "check"): ReturnType;
      toggleChecked(checked?: boolean): ReturnType;
      sinkListItemSameKind(): ReturnType;
    };
  }
}

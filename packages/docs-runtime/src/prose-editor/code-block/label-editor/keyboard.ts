const usesMetaKey =
  typeof navigator !== "undefined" && /Mac|iP(hone|[oa]d)/.test(navigator.platform ?? "");
export function isLabelHistoryKey(event: KeyboardEvent): boolean {
  if (
    !(event.metaKey || event.ctrlKey) ||
    event.altKey ||
    event.isComposing ||
    event.keyCode === 229
  )
    return false;
  const key = event.key.length === 1 ? event.key.toLowerCase() : "";
  return (
    key === "z" ||
    key === "я" ||
    key === "y" ||
    event.keyCode === 90 ||
    event.keyCode === 89
  );
}
export function labelHistoryKey(document: Document, redo: boolean): KeyboardEvent {
  return new (document.defaultView ?? window).KeyboardEvent("keydown", {
    key: "z",
    code: "KeyZ",
    keyCode: 90,
    which: 90,
    shiftKey: redo,
    metaKey: usesMetaKey,
    ctrlKey: !usesMetaKey,
    bubbles: true,
    cancelable: true,
  });
}

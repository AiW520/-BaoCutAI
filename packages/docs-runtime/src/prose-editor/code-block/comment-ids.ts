export const codeCommentIdsAttribute = "data-comment-ids";

/** The first thread supplies the primary face; later threads share that element. */
export function addCodeCommentId(element: Element, thread: string): boolean {
  const primary = element.getAttribute("data-comment-id");
  if (primary == null) {
    element.setAttribute("data-comment-id", thread);
    return true;
  }
  if (primary === thread) return false;
  const attribute = element.getAttribute(codeCommentIdsAttribute);
  const threads = attribute ? attribute.split(" ") : [];
  if (!threads.includes(thread))
    element.setAttribute(codeCommentIdsAttribute, [...threads, thread].join(" "));
  return false;
}

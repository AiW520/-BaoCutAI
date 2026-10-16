interface LayoutSubscription {
  subs: Set<() => void>;
  observer: MutationObserver;
  frame: number;
}

const subscriptions = new WeakMap<Document, LayoutSubscription>();
// Keep the original captured-intrinsic access used by the iframe runtime.
const getSubscription = subscriptions.get.bind(subscriptions);
const setSubscription = subscriptions.set.bind(subscriptions);
const deleteSubscription = subscriptions.delete.bind(subscriptions);

/** One layout observer and one scheduled frame per document, shared by its views. */
export function observeDocumentLayout(
  document: Document,
  notify: () => void,
): () => void {
  const window = document.defaultView;
  const Observer = window?.MutationObserver;
  if (!window || typeof Observer !== "function") return () => {};
  let subscription = getSubscription(document);
  if (!subscription) {
    const subscribers = new Set<() => void>();
    const flush = (): void => {
      state.frame = 0;
      for (const subscriber of subscribers) subscriber();
    };
    const observer = new Observer(() => {
      if (typeof window.requestAnimationFrame !== "function") return flush();
      if (!state.frame) state.frame = window.requestAnimationFrame(flush);
    });
    const state: LayoutSubscription = { subs: subscribers, observer, frame: 0 };
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-layout", "data-page-width"],
    });
    setSubscription(document, state);
    subscription = state;
  }
  const current = subscription;
  current.subs.add(notify);
  return () => {
    if (!current.subs.delete(notify) || current.subs.size > 0) return;
    current.observer.disconnect();
    if (current.frame) window.cancelAnimationFrame(current.frame);
    if (getSubscription(document) === current) deleteSubscription(document);
  };
}

export function observeElementSize(
  document: Document,
  elements: readonly Element[],
  notify: () => void,
): ResizeObserver | null {
  const Observer = document.defaultView?.ResizeObserver ?? globalThis.ResizeObserver;
  if (typeof Observer !== "function") return null;
  const observer = new Observer(notify);
  if (typeof observer.observe !== "function" || typeof observer.disconnect !== "function")
    return null;
  for (const element of elements) observer.observe(element);
  return observer;
}

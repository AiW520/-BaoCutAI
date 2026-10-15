/**
 * 聚焦 PromptField（或包着它的元素）里的输入框，光标放到末尾，接着已有的草稿往下写。
 * 输入框是 contenteditable：TokenField 只在已聚焦时才把光标写回 DOM，程序聚焦会落在开头；
 * 所以聚焦后直接把 DOM 选区收到末尾，TokenField 会跟着 selectionchange 更新光标。
 */
export function focusPromptEnd(container: Element | null | undefined) {
  const input = container?.querySelector<HTMLElement>('[role="textbox"]');
  if (!input) return;
  input.focus();
  const selection = window.getSelection();
  selection?.selectAllChildren(input);
  selection?.collapseToEnd();
}

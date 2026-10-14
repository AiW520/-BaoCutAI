import type { Conversation } from '@baocut/protocol';
import { ActionButton, Button, ToastQueue } from '@react-spectrum/s2';
import Archive from '@react-spectrum/s2/icons/Archive';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { ARCHIVED } from './archived-copy.ts';
import { untitled } from '../copy.ts';
import { useRuntime } from '../runtime/context.tsx';
import { useShell } from '../state/shell-store.ts';

/** 原型 page-archived.css `.arc-banner`：会话线程上方一条浅灰底的提示。 */
const banner = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
  marginTop: 12,
  marginX: 16,
  paddingY: 8,
  paddingEnd: 8,
  paddingStart: 12,
  borderRadius: 'lg',
  backgroundColor: 'gray-75',
  color: 'gray-800',
  font: 'ui',
});
const text = style({ flexGrow: 1, minWidth: 0 });

/** 打开一条已归档会话时会话页顶上的横幅（产品设计 §3.1）：说明它不在侧栏里，给恢复和去已归档会话页。 */
export function ArchivedBanner({ conversation }: { conversation: Conversation }) {
  const runtime = useRuntime();
  const go = useShell((s) => s.go);
  const restore = () =>
    runtime
      .updateConversation(conversation.id, { archived: false })
      .then(() => ToastQueue.positive(ARCHIVED.restored(conversation.title || untitled()), { timeout: 4000 }))
      .catch((error: Error) => ToastQueue.negative(ARCHIVED.restoreFailed(error.message), { timeout: 5000 }));
  return (
    <div className={banner} role="status">
      <Archive />
      <span className={text}>{ARCHIVED.banner}</span>
      <ActionButton size="S" isQuiet onPress={() => go({ tab: 'archived', focus: conversation.id })}>
        {ARCHIVED.viewAll}
      </ActionButton>
      <Button size="S" variant="secondary" onPress={restore}>
        {ARCHIVED.restore}
      </Button>
    </div>
  );
}

import { useRef, useState } from 'react';
import type { FileTarget } from '@baocut/protocol';
import { ActionButton, Popover, Text } from '@react-spectrum/s2';
import Close from '@react-spectrum/s2/icons/Close';
import Comment from '@react-spectrum/s2/icons/Comment';
import { iconStyle, style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { Button as RACButton } from 'react-aria-components';
import { SLIDES } from '../model/slides-copy.ts';
import { targetKey } from '../model/workspace.ts';
import { useShell } from '../state/shell-store.ts';
import { useSlidesReveal } from '../state/slides-editor-bridge.ts';

/** composer 上方与 Space 条目的引用标签同一个样子（composer.tsx `tag`）；已发送消息里只是一行淡色的标记。 */
const token = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  maxWidth: 'full',
  height: 24,
  borderRadius: 'default',
  backgroundColor: { default: 'transparent', isDraft: 'gray-100' },
  font: 'ui-xs',
  color: { default: 'gray-600', isDraft: 'gray-800' },
  boxSizing: 'border-box',
});
/** 原型 home-slides.css `.home-slides-notes__list` 起的那几样。 */
const list = style({ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 360, margin: 0, padding: 0, overflow: 'auto', listStyleType: 'none' });
const item = style({ display: 'flex', alignItems: 'start', gap: 4 });
const jump = style({
  display: 'flex',
  alignItems: 'start',
  gap: 8,
  flexGrow: 1,
  minWidth: 0,
  padding: 8,
  borderRadius: 'lg',
  borderWidth: 0,
  backgroundColor: { default: 'transparent', isHovered: 'gray-100', isPressed: 'gray-200' },
  color: 'gray-900',
  textAlign: 'start',
  cursor: 'default',
  outlineStyle: { default: 'none', isFocusVisible: 'solid' },
  outlineColor: 'focus-ring',
  outlineWidth: 2,
});
const badge = style({
  flexShrink: 0,
  size: 20,
  borderRadius: 'full',
  backgroundColor: 'blue-900',
  color: 'gray-25',
  font: 'ui-xs',
  fontWeight: 'bold',
  lineHeight: '[20px]',
  textAlign: 'center',
});
const body = style({ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 });
const where = style({ font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const note = style({ font: 'ui-sm', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' });
const panel = style({ width: 360, maxWidth: '[calc(100vw - 32px)]' });
const closeIcon = iconStyle({ size: 'XS' });

/** 列表里的一条：草稿里的带自己的 id；已发送的用 `sentAnnotationId` 拼的 id，跳转时临时交给编辑器。 */
export interface SlideAnnotationTokenItem {
  id: string;
  deck: FileTarget;
  anchor: string;
  label: string;
  text: string;
}

/**
 * 幻灯片标注的引用标签（docs/design/slides §8.2 第 5、6 步，移植自原型 home-slides-notes.jsx `SlideNotesToken`）：
 * composer 上方与已发送的消息里都是「幻灯片标注 · N 条」。点开列出各条：位置、批注，点一条打开（或切到）那份幻灯片并跳到那一页。
 * 给了 `onRemove` 是草稿，可以逐条移除或全部移除；不给是已发送的消息，只读。
 */
export function SlideAnnotationsToken({
  items,
  onRemove,
  onClear,
}: {
  items: readonly SlideAnnotationTokenItem[];
  onRemove?: (id: string) => void;
  onClear?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  if (!items.length) return null;
  const draft = !!onRemove;
  const label = SLIDES.token(items.length);
  const reveal = (n: SlideAnnotationTokenItem) => {
    setOpen(false);
    useShell.getState().openPane({ kind: 'slides', target: n.deck });
    useSlidesReveal.getState().request(targetKey(n.deck), n.id, n.anchor);
  };
  return (
    <span ref={anchorRef} className={token({ isDraft: draft })}>
      <ActionButton isQuiet size="XS" aria-expanded={open} aria-haspopup="dialog" onPress={() => setOpen((v) => !v)}>
        <Comment />
        <Text>{label}</Text>
      </ActionButton>
      {onClear ? (
        <ActionButton isQuiet size="XS" aria-label={SLIDES.removeAll} onPress={onClear}>
          <Close styles={closeIcon} data-bc-icons="own" />
        </ActionButton>
      ) : null}
      <Popover triggerRef={anchorRef} isOpen={open} onOpenChange={setOpen} placement={draft ? 'top start' : 'bottom end'} aria-label={label}>
        <div className={panel}>
          <ol className={list}>
            {items.map((n, i) => (
              <li key={n.id} className={item}>
                <RACButton className={jump} aria-label={SLIDES.item(i + 1, n.label, n.text)} onPress={() => reveal(n)}>
                  <span className={badge}>{i + 1}</span>
                  <span className={body}>
                    <span className={where}>{n.label}</span>
                    <span className={note}>{n.text}</span>
                  </span>
                </RACButton>
                {onRemove ? (
                  <ActionButton
                    isQuiet
                    size="XS"
                    aria-label={SLIDES.removeOne(i + 1)}
                    onPress={() => {
                      if (items.length === 1) setOpen(false);
                      onRemove(n.id);
                    }}>
                    <Close styles={closeIcon} data-bc-icons="own" />
                  </ActionButton>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Popover>
    </span>
  );
}

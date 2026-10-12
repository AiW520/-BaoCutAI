import { useState } from 'react';
import { FOCAL_MAX_ZOOM, type Sequence } from '@baocut/protocol';
import { EditLabel } from '@baocut/protocol/messages/ui';
import { Button, Content, ContextualHelp, Footer, Heading, ToastQueue, type ContextualHelpProps } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { STAGE_COPY } from '../../copy.ts';
import { freeFramingOperations, type FramedVideo, type FramingHit } from '../../model/stage-framing.ts';
import type { Assets } from '../../model/stage-pose.ts';
import type { EditorActions } from './editor-context.tsx';

/**
 * 按原片取景的说明与出口（原型 stage-framing.jsx 的 `FramingWhy` / `FramingInfo` / `freeFraming`，产品设计 §5.10「画面怎么取景」）：
 * 画布小牌与属性页「取景」段的 ⓘ 弹出同一份「为什么只能放大」，弹层里与属性页上的「改成自由摆放」是同一个动作。
 */

const body = style({ display: 'flex', flexDirection: 'column', gap: 8 });
const para = style({ margin: 0 });
const hint = style({ margin: 0, font: 'ui-sm', color: 'gray-600' });

/** 拖不动、缩到铺满、放到上限时小牌上临时说的那一句。 */
export function framingHitText(hit: FramingHit): string {
  if (hit === 'locked') return STAGE_COPY.framingLocked;
  if (hit === 'min') return STAGE_COPY.framingMin;
  return STAGE_COPY.framingMax(FOCAL_MAX_ZOOM);
}

/**
 * 改成自由摆放：换成画中画，盒就是此刻画面上那幅原片（切换的那一下画面不动），一笔事务；提示里可以撤销。
 * 不知道源尺寸时什么都不做。
 */
export function freeFraming(actions: Pick<EditorActions, 'apply' | 'undo'>, sequence: Sequence, item: FramedVideo, assets: Assets | undefined): void {
  const operations = freeFramingOperations(sequence.id, item, sequence.canvas, assets);
  if (!operations.length) return;
  void actions.apply(operations, EditLabel.freePlacement()).then((receipt) => {
    if (!receipt) return;
    ToastQueue.positive(STAGE_COPY.framingFreed, {
      timeout: 5000,
      actionLabel: STAGE_COPY.undo,
      onAction: () => void actions.undo({ transaction: receipt.transactionId }),
      shouldCloseOnAction: true,
    });
  });
}

/** ⓘ 与「为什么只能放大」弹层；`onFree` 为空时（只读）不给「改成自由摆放」。 */
export function FramingInfo({ onFree, placement }: { onFree: (() => void) | null; placement: ContextualHelpProps['placement'] }) {
  const [open, setOpen] = useState(false);
  return (
    <ContextualHelp variant="info" size="S" placement={placement} aria-label={STAGE_COPY.framingWhyTitle} isOpen={open} onOpenChange={setOpen}>
      <Heading>{STAGE_COPY.framingWhyTitle}</Heading>
      <Content>
        <div className={body}>
          <p className={para}>{STAGE_COPY.framingWhy}</p>
          <p className={para}>{STAGE_COPY.framingLimits}</p>
          <p className={hint}>{STAGE_COPY.framingFreeHint}</p>
        </div>
      </Content>
      {onFree ? (
        <Footer>
          <Button
            variant="secondary"
            size="S"
            onPress={() => {
              setOpen(false);
              onFree();
            }}
          >
            {STAGE_COPY.framingFree}
          </Button>
        </Footer>
      ) : null}
    </ContextualHelp>
  );
}

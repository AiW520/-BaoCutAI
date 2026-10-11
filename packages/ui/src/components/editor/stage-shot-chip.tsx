import { useLayoutEffect, useRef, useState } from 'react';
import type { Sequence } from '@baocut/protocol';
import { ActionButton, ToastQueue, Tooltip, TooltipTrigger } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { STAGE_COPY } from '../../copy.ts';
import { applyFramingToAll, framingPieces, shotSeconds } from '../../model/stage-shots.ts';
import type { PannableVideo } from '../../model/stage-pose.ts';
import { useEditorActions } from './editor-context.tsx';
import type { FrameRect } from './stage-objects.tsx';

/**
 * 按镜头分段取景的小牌（原型 stage-objects.jsx 的 `ShotChip`，产品设计 §5.10「改一支短视频」）：选中其中一段时挂在画面左下角
 * 的外面，写「这一段 · 第 X–Y 秒」（子视频时间线上的秒），说清楚拖动只改这一段；次要操作「套到整支」把这一段现在的裁剪写到
 * 同一素材的每一段，一笔事务，提示里可以撤销。挂在画面外面：画面上方是视频工具条，画面里面会挡住要对的人。
 * 带 `data-stage-editor`，舞台的点选与框选不接它上面的指针。
 */

const chip = style({
  position: 'absolute',
  zIndex: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  paddingStart: 8,
  paddingEnd: 4,
  minHeight: 32,
  borderRadius: 'default',
  backgroundColor: 'gray-25',
  boxShadow: 'elevated',
  font: 'ui-sm',
  color: 'gray-800',
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

/** 小牌离画面下沿多远、离舞台下沿至少留多少（舞台像素）。 */
const GAP = 8;
const CHIP_H = 40;

export function StageShotChip({ item, sequence, frame }: { item: PannableVideo; sequence: Sequence; frame: FrameRect }) {
  const { apply, undo } = useEditorActions();
  const ref = useRef<HTMLDivElement>(null);
  const [areaH, setAreaH] = useState<number | null>(null);
  useLayoutEffect(() => {
    const area = ref.current?.parentElement;
    if (!area) return;
    const measure = () => setAreaH(area.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const pieces = framingPieces(sequence, item);
  const others = pieces.length - 1;
  const { from, to } = shotSeconds(item, sequence);
  const below = frame.top + frame.height + GAP;
  const top = areaH === null ? below : Math.max(0, Math.min(below, areaH - CHIP_H));

  const applyAll = () => {
    const operations = applyFramingToAll(sequence.id, item, pieces);
    const done = () => ToastQueue.positive(STAGE_COPY.appliedAll(pieces.length), { timeout: 5000 });
    if (!operations.length) return done();
    void apply(operations, STAGE_COPY.applyAll).then((receipt) => {
      if (!receipt) return;
      ToastQueue.positive(STAGE_COPY.appliedAll(pieces.length), {
        timeout: 5000,
        actionLabel: STAGE_COPY.undo,
        onAction: () => void undo({ transaction: receipt.transactionId }),
        shouldCloseOnAction: true,
      });
    });
  };

  return (
    <div ref={ref} className={chip} style={{ left: frame.left, top }} data-stage-editor data-shot-chip={item.id}>
      <span>{STAGE_COPY.shotPiece(from, to)}</span>
      {others > 0 ? (
        <TooltipTrigger placement="top">
          <ActionButton size="S" isQuiet onPress={applyAll}>
            {STAGE_COPY.applyAll}
          </ActionButton>
          <Tooltip>{STAGE_COPY.applyAllTip}</Tooltip>
        </TooltipTrigger>
      ) : null}
    </div>
  );
}

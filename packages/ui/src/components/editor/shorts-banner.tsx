import type { DocumentRecord, Id } from '@baocut/protocol';
import { Button } from '@react-spectrum/s2';
import DevicePhone from '@react-spectrum/s2/icons/DevicePhone';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { readDerivation } from '../../model/shorts-result.ts';
import { videoTargetOf } from '../../model/space.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useShell } from '../../state/shell-store.ts';
import { useSpace } from '../../state/space-store.ts';
import { setAiToolPage, setPanelLanding } from './ai-tools-nav.ts';
import { SHORTS_COPY as S } from './shorts-copy.ts';
import { focusShortsRun, latestShortsRun, useShortsRuns } from './shorts-runs.ts';

const banner = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
  paddingX: 12,
  paddingY: 4,
  minHeight: 40,
  boxSizing: 'border-box',
  backgroundColor: 'blue-100',
  borderBottomWidth: 1,
  borderTopWidth: 0,
  borderStartWidth: 0,
  borderEndWidth: 0,
  borderStyle: 'solid',
  borderColor: 'blue-200',
  font: 'ui-sm',
  color: 'gray-800',
});
const icon = style({ display: 'flex', flexShrink: 0, color: 'blue-900' });
const text = style({ flexGrow: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
const sub = style({ color: 'gray-600' });

/**
 * 子视频编辑器内容区顶上的一条（原型 shorts-source.jsx `ShortsChildBanner`，产品设计 §5.10）：它从哪部视频切出来、片段外的话怎么处理；
 * 「回到原片」打开来源视频。桌面端那一轮的结果页还在，回去时右侧落在 AI 工具 Tab 的结果页；网页没有 AI 工具 Tab，只回来源视频。
 * 来源视频不在视频库里（删了）时只写一句，没有按钮。不是子视频（没有派生来源文档）时不画。
 */
export function ShortsChildBanner({ videoId, documents }: { videoId: Id; documents: Record<Id, DocumentRecord> }) {
  const web = useRuntime().host.platform === 'web';
  const derivation = readDerivation(documents);
  const parentId = derivation?.parentVideoId ?? null;
  const parent = useSpace((s) =>
    parentId ? (s.entries.find((e) => e.kind === 'video' && !e.user.trashedAt && e.ref && 'videoId' in e.ref && e.ref.videoId === parentId) ?? null) : null,
  );
  const run = useShortsRuns((s) => (parentId ? latestShortsRun(s.runs, parentId) : null));
  if (!derivation) return null;

  const back = () => {
    if (!parent || !parentId) return;
    if (!web) {
      if (run) focusShortsRun(run.conversationId, videoId);
      setAiToolPage(parentId, { tool: 'shortscut', preset: null, phase: 'result', host: parentId });
      setPanelLanding(parentId, 'aitools');
    }
    useShell.getState().openVideo(videoTargetOf(parent));
  };

  return (
    <div className={banner} role="note">
      <span className={icon}>
        <DevicePhone />
      </span>
      <span className={text} title={parent ? `${S.bannerFrom(parent.name)} · ${S.bannerSub}` : S.bannerMissing}>
        {parent ? S.bannerFrom(parent.name) : S.bannerMissing}
        <span className={sub}>{` · ${S.bannerSub}`}</span>
      </span>
      {parent ? (
        <Button size="S" variant="secondary" onPress={back}>
          {S.bannerBack}
        </Button>
      ) : null}
    </div>
  );
}
